import express from 'express';
import { getProductList, getGiftGalleryList, getInfluencerLedger, getCategoryList, getSubCategoryList, getDocumentCatalogueList, getInfluencerBadgeList, getFaqQuestions, getTutorialVideoList, getContactDetail, getAboutDetail, getEarnedPoints, getStates, getDistricts, getPincodeDetails, UpcomingGifts, getBannerList, getHighLightedOffers } from './index.js';
import { verifyToken } from '@shared/middlewares/auth.middleware.js';
import { asyncHandler } from '@shared/helpers/asyncHandler.js'
import { payloadCheck } from '@shared/helpers/commonHandler.js';

const router = express.Router();

router.post(
    '/product-list',
    verifyToken,
    getProductList,
    asyncHandler(getProductList)
);

router.get(
    '/upcoming-gifts',
    verifyToken,
    asyncHandler(UpcomingGifts)
);

router.post(
    '/gift-gallery',
    verifyToken,
    getGiftGalleryList,
    asyncHandler(getGiftGalleryList)
);

router.post(
    '/influencer-ledger',
    verifyToken,
    asyncHandler(getInfluencerLedger)
);

router.post(
    '/category-list',
    verifyToken,
    payloadCheck(getCategoryList),
    asyncHandler(getCategoryList)
);

router.post(
    '/subcategory-list',
    verifyToken,
    asyncHandler(getSubCategoryList)
);

router.post(
    '/document-catalogue-list',
    verifyToken,
    payloadCheck(getDocumentCatalogueList),
    asyncHandler(getDocumentCatalogueList)
);

router.post(
    '/influencer-badge',
    verifyToken,
    payloadCheck(getInfluencerBadgeList),
    asyncHandler(getInfluencerBadgeList)
);

router.post(
    '/faq-question',
    verifyToken,
    payloadCheck(getFaqQuestions),
    asyncHandler(getFaqQuestions)
);


router.get(
    '/tutorial-video-list',
    verifyToken,
    asyncHandler(getTutorialVideoList)
);

router.post(
    '/contact-us',
    verifyToken,
    payloadCheck(getContactDetail),
    asyncHandler(getContactDetail)
);

router.post(
    '/about-us',
    verifyToken,
    payloadCheck(getAboutDetail),
    asyncHandler(getAboutDetail)
);

router.get(
    '/earn-point',
    verifyToken,
    getEarnedPoints,
    asyncHandler(getEarnedPoints)
);

router.get(
    '/state',
    asyncHandler(getStates)
);

router.post(
    '/district',
    payloadCheck(getDistricts),
    asyncHandler(getDistricts)
);

router.post(
    '/pincode-details',
    payloadCheck(getPincodeDetails),
    asyncHandler(getPincodeDetails)
);
router.get(
    '/banner_details',
    verifyToken,
    asyncHandler(getBannerList)
);
router.get(
    '/get_highlighted_offers',
    asyncHandler(getHighLightedOffers)
)
export default router;

