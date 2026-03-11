import express from 'express';
import { addRedeemRequest, getRedeemGiftRequestList, getRedeemGiftRequestDetail, sendOtp, verifyOtp } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
import { asyncHandler } from '@shared/helpers/asyncHandler.js'
import { payloadCheck } from '@shared/helpers/commonHandler.js';
import { validate } from '@shared/middlewares/validate.middleware.js';
import { addRedeemRequestSchema } from './schema.js';

const router = express.Router();

router.post(
    '/add-redeem-request',
    // validate(addRedeemRequestSchema),
    verifyToken,
    payloadCheck(addRedeemRequest),
    asyncHandler(addRedeemRequest)
);

router.get(
    '/redeem-gift-request-list',
    verifyToken,
    getRedeemGiftRequestList,
    asyncHandler(getRedeemGiftRequestList)
);

router.get(
    '/redeem-gift-request-detail/:id',
    verifyToken,
    asyncHandler(getRedeemGiftRequestDetail)
);

router.get(
    '/redeem-old-gift-request-list',
    verifyToken,
    asyncHandler(getRedeemGiftRequestList)
);

router.post(
    '/redeem-send-otp',
    verifyToken,
    payloadCheck(sendOtp),
    asyncHandler(sendOtp)
);

router.post(
    '/redeem-verify-otp',
    verifyToken,
    payloadCheck(verifyOtp),
    asyncHandler(verifyOtp)
);
 
export default router;
