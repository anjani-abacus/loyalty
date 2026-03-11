import express from 'express';
import { createBanner, deleteBanner, getAllBanners, getBannerById, updateBanner } from '../controllers/bannerControllers.js';
import upload from '@shared/middlewares/multerS3.js';

const bannerRoutes = express.Router();

bannerRoutes.post('/create_banner', upload.single('banner_image'), createBanner);
bannerRoutes.get('/get_all_banners', getAllBanners);
bannerRoutes.get('/get_banner_by_id/:id', getBannerById);
bannerRoutes.put('/update_banner/:id', upload.single('banner_image'), updateBanner);
bannerRoutes.delete('/delete_banner/:id', deleteBanner);

export default bannerRoutes;