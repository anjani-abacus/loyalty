import express from 'express';
import { couponCodeScan, couponScanList } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
import { asyncHandler } from '@shared/helpers/asyncHandler.js'
import { payloadCheck } from '@shared/helpers/commonHandler.js';
import { validate } from '@shared/middlewares/validate.middleware.js';
import { couponCodeScanSchema } from './schema.js';

const router = express.Router();

router.post(
    '/coupon-scan',
    verifyToken,
    validate(couponCodeScanSchema),
    payloadCheck(couponCodeScan),
    asyncHandler(couponCodeScan)
);

router.get(
    '/coupon-scan-list',
    verifyToken,
    couponScanList,
    asyncHandler(couponScanList)
);
 
export default router;
