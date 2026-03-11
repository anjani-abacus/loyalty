import { prisma } from '../config/database.js';
import fs from 'fs';
import path from 'path';
import { config } from '../config/env.js';


export const get = (path, fallback = '') => path ?? fallback;

export const payloadCheck = (fn) => {
    return (req, res, next) => {
        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: "Request payload is empty. Please provide data." });
        }
        next();
    };
};

export const getLedgerBalanceInfluencer = async (influencer_id) => {
  try {
    const lastEntry = await prisma.influencer_ledger.findFirst({
      where: {
        influencer_id: influencer_id,
      },
      orderBy: {
        id: 'desc',
      },
      select: {
        balance: true,
      },
    });

    if (lastEntry) {
      return { balance: lastEntry.balance };
    } else {
      return { balance: 0 };
    }
  } catch (error) {
    console.error('Error fetching ledger balance:', error);
    throw new Error('Failed to fetch influencer balance');
  }
};

export const saveBase64File = (base64String, fileNamePrefix = 'doc') => {

  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const extension = matches[1].split('/')[1]; // image/png → png
  const buffer = Buffer.from(matches[2], 'base64');
  const fileName = `${fileNamePrefix}_${Date.now()}.${extension}`;
  const filePath = path.join('uploads', 'influencer_doc', fileName);

  fs.writeFileSync(filePath, buffer);
  return filePath;
};

export const uploadToCustomS3 = async (base64String, folder = 'uploads') => {

  const matches = base64String.match(/^data:(.+);base64,(.+)$/);
  if (!matches || matches.length !== 3) throw new Error('Invalid base64');

  const mimeType = matches[1];
  const base64Data = matches[2];
  const buffer = Buffer.from(base64Data, 'base64');

  const extension = mimeType.split('/')[1];
  const fileName = `${folder}_${Date.now()}.${extension}`;

  const uploadParams = {
    Bucket: config.s3.bucketName,
    Key: fileName,
    Body: buffer,
    ContentEncoding: 'base64',
    ContentType: mimeType,
    ACL: 'public-read', // if allowed by server
  };

  const uploads = await s3.send(new PutObjectCommand(uploadParams));

  // construct public URL manually
  const fileUrl = `${config.s3.publicUrl}/${fileName}`;
  return fileUrl;
};

export const deleteFromCustomS3 = async (filePath) => {

  const url = new URL(filePath);
  const path = `${config.s3.endpoint}.'/'`;
  const key = url.split(path)[1];
  console.log(key);
  console.log(config.s3.bucketName);
  const params = {
    Bucket: config.s3.bucketName,
    Key: key
  };

  try {
    await s3.send(new DeleteObjectCommand(params));
    console.log(`Deleted ${key}`);
  } catch (err) {
    console.error('Error deleting file:', err);
  }
};