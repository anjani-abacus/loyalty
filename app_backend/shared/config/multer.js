import multer from 'multer';
import multerS3 from 'multer-s3';
import { S3Client } from '@aws-sdk/client-s3';
import { config } from './env.js';
import path from 'path';

const s3Client = new S3Client({
    region: 'us-east-1',
    endpoint: config.s3.endpoint,
    forcePathStyle: true,
    credentials: {
        accessKeyId: config.s3.accessKey,
        secretAccessKey: config.s3.secretKey,
    },
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: config.s3.bucketName,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: function (req, file, cb) {
            const ext = path.extname(file.originalname);   
            const baseName = path.basename(file.originalname, ext);

    
            const safeName = baseName.replace(/[^a-zA-Z0-9]/g, '_');

            cb(null, `${safeName}_${Date.now()}${ext}`);
        },
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
                originalName: file.originalname,
                uploadedAt: new Date().toISOString(),
            });
        },
    }),
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/png',
            'image/webp',
            'image/jpg',
            'application/pdf',
            'text/csv',
            'video/mp4',
            'video/webm',
            'video/ogg',
            'video/mpeg'
        ];

        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Only image, video, PDF, or CSV files are allowed!'), false);
        }
    },
    limits: {
        fileSize: 500 * 1024 * 1024, 
    },
});

export default upload;




// bucket: (req, file, cb) => {
//     let bucketName;

//     if (process.env.NODE_ENV === "production") {
//         bucketName = config.s3.prodBucket;
//     } else if (process.env.NODE_ENV === "staging") {
//         bucketName = config.s3.stagingBucket;
//     } else {
//         bucketName = config.s3.devBucket; // default for local/dev
//     }

//     cb(null, bucketName);
// },