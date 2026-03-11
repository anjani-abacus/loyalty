import express from 'express';
import upload from '@shared/middlewares/multerS3.js';
import { uploadPostalCSV }from '../controllers/uploadpostalController.js'
import { downloadTemplate, uploadInfluencerCSV } from '../controllers/uploadInfluencerController.js';
import { uploadCSVLocal } from '@shared/middlewares/multerDS.js';
import { downloadProductTemplate, uploadProductCSV } from '../controllers/uploadproductController.js';

const uploadRouter = express.Router();

uploadRouter.post('/upload_postal_csv', upload.single('file'), uploadPostalCSV);

// upload influencer routes
uploadRouter.post("/download_influencer_template", downloadTemplate);
uploadRouter.post('/upload_influencer_csv', uploadCSVLocal.single('file'),uploadInfluencerCSV);

// upload product routes
uploadRouter.post("/download_product_template", downloadProductTemplate);
uploadRouter.post('/upload_product_csv', uploadCSVLocal.single('file'), uploadProductCSV);

export default uploadRouter;
