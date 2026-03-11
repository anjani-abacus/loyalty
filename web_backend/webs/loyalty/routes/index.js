import express from 'express';
import authRoute from '../auth/routes/authRoutes.js';
import bonusRouter from '../Bonus/routes/bonusRoutes.js';
import couponRouter from '../GenerateQR/routes/generateCouponRoutes.js';
import giftGalleryRoutes from '../GiftGallery/routes/giftGalleryRoutes.js';
import masterRoute from '../masters/routes/masterRoutes.js';
import influencerRouter from '../NetworkInfluencer/routes/influencerRoutes.js';
import redeemRouter from '../RedeemRequest/routes/redeemRequestRoutes.js';
import uploadRouter from '../uploadCSV/routes/uploadBulkFilesRoutes.js';
import dashboardRoutes from '../Dashboard/routes/dashboardRoutes.js';
import postAndEarnRouter from '../postAndEarn/routes/postAndEarnRoutes.js';
import streakRouter from '../streaks/routes/streaksRoutes.js';
import productCSVRouter from '../masters/exportCSV/exportProducts.js';
import influencerCSVRouter from '../NetworkInfluencer/exportCSV/exportProducts.js';
import QRCouponsCSVRouter from '../GenerateQR/exportCSV/exportProducts.js';
import redeemRequestCsv from '../RedeemRequest/exportCSV/exportRedeemRequest.js';
import leaderboardRouter from '../leader/routes/leaderboardRoutes.js';
import faqRoutes from '../faq/routes/faqRoutes.js';
import companyRoutes from '../CompnayContact/routes/companyRoutes.js';
import bannerRoutes from '../bannerModule/routes/bannerRoutes.js';
import tutorialRoutes from '../tutorialMaster/routes/tutorialRoutes.js';
import reportRouter from '../Reports/routes/reportRoutes.js';
import ticketRoutes from '../Tickets/routes/ticketRoutes.js';
import { authenticateToken } from '@shared/middlewares/authenticateToken.js';
import { setUserContext } from "@shared/dbConfig/database.js";
import dealerRouter from '../NetworkInfluencer/routes/dealerRoutes.js';

const loyaltyRoutes = express.Router();

loyaltyRoutes.use('/', authRoute);
loyaltyRoutes.use('/', authenticateToken, setUserContext, bonusRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, couponRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, giftGalleryRoutes);
loyaltyRoutes.use('/', authenticateToken, setUserContext, masterRoute);
loyaltyRoutes.use('/', authenticateToken, setUserContext, influencerRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, redeemRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, dashboardRoutes);

// upload Routes
loyaltyRoutes.use('/', authenticateToken, setUserContext, uploadRouter);

// Apps Specific 
loyaltyRoutes.use('/', authenticateToken, setUserContext, postAndEarnRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, streakRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, leaderboardRouter);
loyaltyRoutes.use('/', authenticateToken, setUserContext, faqRoutes);
loyaltyRoutes.use('/', authenticateToken, setUserContext, companyRoutes);
loyaltyRoutes.use('/', authenticateToken, setUserContext, bannerRoutes);
loyaltyRoutes.use('/', authenticateToken, setUserContext, tutorialRoutes)
loyaltyRoutes.use('/', authenticateToken, setUserContext, ticketRoutes);
loyaltyRoutes.use('/', authenticateToken, setUserContext, dealerRouter);

// CSV Routes
loyaltyRoutes.use('/', authenticateToken, setUserContext, productCSVRouter)
loyaltyRoutes.use('/', authenticateToken, setUserContext, influencerCSVRouter)
loyaltyRoutes.use('/', authenticateToken, setUserContext, QRCouponsCSVRouter)
loyaltyRoutes.use('/', authenticateToken, setUserContext, redeemRequestCsv)


// Report Routes
loyaltyRoutes.use('/', authenticateToken, setUserContext, reportRouter)
export default loyaltyRoutes;
