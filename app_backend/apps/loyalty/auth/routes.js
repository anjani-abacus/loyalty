import express from 'express';
import { getUserDetail, updateUser, registerUser, verifyOtp, requestOtp, getInfluencerTypes, logout, refreshToken, checkRefrralCodeExists } from './index.js';
import {
    registrationSchema,
    verifyOtpSchema
} from './schema.js';
import { validate } from '@shared/middlewares/validate.middleware.js';
import { asyncHandler } from '@shared/helpers/asyncHandler.js'
import { payloadCheck } from '@shared/helpers/commonHandler.js';
import upload from '@shared/config/multer.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';

const router = express.Router();

router.post(
    '/refresh-token',
    refreshToken
)
router.get(
    '/influencer-types',
    asyncHandler(getInfluencerTypes)
);

router.post(
    '/request-otp',
    asyncHandler(requestOtp)
)

router.post(
    '/verify-otp',
    payloadCheck(verifyOtp),
    validate(verifyOtpSchema),
    asyncHandler(verifyOtp)
);
router.post(
    '/check-referral-code',
    asyncHandler(checkRefrralCodeExists)
);
router.post(
    '/register',
    upload.fields([
        { name: 'profile_img', maxCount: 1 },
        { name: 'document_img_front', maxCount: 1 },
        { name: 'document_img_back', maxCount: 1 },
    ]),
    payloadCheck(registerUser),
    asyncHandler(registerUser)
);

router.put(
    '/update-user',
    upload.fields([
        { name: 'profile_img', maxCount: 1 },
        { name: 'document_bank_img', maxCount: 1 },
        { name: 'document_img_front', maxCount: 1 },
        { name: 'document_img_back', maxCount: 1 },
        { name: 'document_pan_img', maxCount: 1 }
    ]),
    verifyToken,
    updateUser
);


router.get(
    '/user-detail',
    verifyToken,
    asyncHandler(getUserDetail)
);
router.post(
    '/logout',
    verifyToken,
    logout
)


export default router;
