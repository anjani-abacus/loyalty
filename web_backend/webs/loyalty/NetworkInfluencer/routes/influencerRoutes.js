import express from 'express';
import upload from '@shared/middlewares/multerS3.js'
import { createInfluencer, getInfluencerById, getInfluencerList, softDeleteInfluencer, updateInfluencer, UpdateInfluencerActiveStatus, UpdateInfluencerKyc, UpdateInfluencerProfileStatus, UpdateInfluencerTypeName, } from '../controllers/InfluencerController.js';
import { influencerCustomerSchema } from '../joiValidators/influencerValidator.js';
import { validateParam } from '@shared/common/validateParam.js';
import { validateBody } from '@shared/common/validateBody.js';
import { idParamSchema } from '@shared/common/idParamSchema.js';


const influencerRouter = express.Router();


influencerRouter.post(
    '/create_influencer',
    upload.fields([
        { name: 'document_img_front', maxCount: 1 },
        { name: 'document_img_back', maxCount: 1 },
        { name: 'document_pan_img', maxCount: 1 },
        { name: 'document_bank_img', maxCount: 1 }
    ]),

    validateBody(influencerCustomerSchema),
    createInfluencer
);

influencerRouter.put(
    '/update_influencer/:id',
    upload.fields([
        { name: 'document_img_front', maxCount: 1 },
        { name: 'document_img_back', maxCount: 1 },
        { name: 'document_pan_img', maxCount: 1 },
        { name: 'document_bank_img', maxCount: 1 }]),

    updateInfluencer
)
influencerRouter.post(
    '/get_influencer',
    getInfluencerList
);

influencerRouter.put(
    '/update_influencer_kyc/:id',
    validateParam(idParamSchema, 'id'),
    UpdateInfluencerKyc
);

influencerRouter.put(
    '/update_influencer_profile_status/:id',
    validateParam(idParamSchema, 'id'),
    UpdateInfluencerProfileStatus
);

influencerRouter.put(
    '/update_influencer_active_status/:id',
    validateParam(idParamSchema, 'id'),

    UpdateInfluencerActiveStatus
);
influencerRouter.put(
    '/update_influencer_type_name/:id',
    validateParam(idParamSchema, 'id'),

    UpdateInfluencerTypeName
);
influencerRouter.get(
    '/get_influencer_by_id/:id',
    validateParam(idParamSchema, 'id'),

    getInfluencerById
);
influencerRouter.delete(
    '/delete_influencer/:id',
    validateParam(idParamSchema, 'id'),

    softDeleteInfluencer
);


export default influencerRouter;