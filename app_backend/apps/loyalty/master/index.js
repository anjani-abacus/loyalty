import { prisma } from "@shared/config/database.js";
import { getLedgerBalanceInfluencer } from '@shared/helpers/commonHandler.js';
import { RateLimiterMemory } from "rate-limiter-flexible";



export const getProductList = async (req, res, next) => {
  try {
    const { product_name = "", product_id = "", category_id, sub_category_id } = req.body || {};

    const where = { del: false };

    if (product_name !== "") {
      where.product_name = { contains: product_name };
    }

    if (product_id !== "") {
      where.product_id = { contains: product_id };
    }

    if (category_id) {
      where.category_id = Number(category_id);
    }

    if (sub_category_id) {
      where.sub_category_id = Number(sub_category_id);
    }

    const rawProducts = await prisma.master_product.findMany({
      where,
      include: {
        images: {
          where: { del: false },
          select: { id: true, image: true },
        },
      },
    });

    return res.status(200).json({
      success: true,
      message: rawProducts.length ? `Product List` : `No Products Found`,
      result: rawProducts,
    });
  } catch (error) {
    return next(error);
  }
};

export const getGiftGalleryList = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const where = {};
    where.del = false;
    where.status = true;

    const giftGallery = await prisma.gift_gallery_master.findMany({
      where: where,
    });


    const current_wallet_balnc = await prisma.influencer_customer.findFirst({
      where: {
        id: userId,
      },
      select: {
        current_wallet_balnc: true,
      },
    });
    if (!giftGallery) {
      return res.status(404).json({
        success: false,
        message: "Gift not found",
        points: availablePoints,
        current_wallet_balnc: current_wallet_balnc.current_wallet_balnc,
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Gift Gallery List`,
      points: current_wallet_balnc.current_wallet_balnc,
      result: giftGallery,
    });
  } catch (error) {
    return next(error);
  }
};
export const UpcomingGifts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { balance: prevBal } = await getLedgerBalanceInfluencer(id);
    const availablePoints = prevBal?.current_wallet_balnc ?? 0;

    const giftGallery = await prisma.gift_gallery_master.findMany({
      where: {
        gift_point: {
          gte: availablePoints,
        },
        del: false,
      },
    });
    if (!giftGallery) {
      return res.status(404).json({
        success: false,
        message: "Gift not found",
        counts: availablePoints ?? 0,
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Upcoming Gift Gallery List`,
      data: giftGallery,
    });
  } catch (error) {
    return next(error);
  }
};

export const getInfluencerLedger = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { start = 0, limit = 20 } = req.params;

    const influencerData = await prisma.influencer_ledger.findMany({
      where: {
        influencer_id: id
      },
      orderBy: { id: 'desc' },
      skip: start,
      take: limit
    });

    const balancePoint = influencerData.length > 0 ? influencerData[0].balance : 0;

    const couponScanList = await prisma.offer_coupon_scan.findMany({
      where: {
        scanned_by_id: id,
      },
      orderBy: {
        id: 'desc'
      },
      skip: start,
      take: limit
    });

    return res.status(200).json({
      success: true,
      message: `Influencer Ledger List`,
      ledgerData: influencerData,
      scannedData: couponScanList,
      balancePoints: balancePoint
    });
  } catch (error) {
    return next(error);
  }
};

export const getCategoryList = async (req, res, next) => {
  try {
    const catgeoryData = await prisma.master_category.findMany({
      where: { del: false, status: true },
      select: { id: true, category: true, image: true },
    });

    return res.status(200).json({
      success: true,
      message: catgeoryData.length ? `Category List` : `No Categories Found`,
      result: catgeoryData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getSubCategoryList = async (req, res, next) => {
  try {
    const { category_id } = req.body || {};

    const where = { del: false, status: true };

    if (category_id) {
      where.master_category_id = Number(category_id);
    }

    const subCategoryData = await prisma.master_sub_category.findMany({
      where,
      select: { id: true, sub_category_name: true, image: true, master_category_id: true, master_category_name: true },
    });

    return res.status(200).json({
      success: true,
      message: subCategoryData.length ? `Subcategory List` : `No Subcategories Found`,
      result: subCategoryData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDocumentCatalogueList = async (req, res) => {
  try {
    // const { userType } = req.user;

    // // Build where condition dynamically
    // const userTypeMapping = {
    //   Primary: "Primary",
    //   Secondary: "Secondary",
    //   influencer: "Influencer",
    //   default: "sales_user",
    // };

    // const targetType = userTypeMapping[userType] || userTypeMapping.default;

    const docList = await prisma.document_catalogue_master.findMany({
      where: {
        del: false
      },
      orderBy: {
        id: "desc",
      },
    });

    if (docList.length > 0) {
      return res.status(200).json({
        status: 200,
        message: "Document List  is fetched !",
        data: docList,
      });
    } else {
      return res.status(200).json({
        status: 200,
        message: "No Data Found",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in documentCatalogueList:", error);
    return res.status(500).json({
      status: 500,
      message: "Internal Server Error",
      data: {},
    });
  }
};

export const getInfluencerBadgeList = async (req, res) => {
  const id = req.user.id;
  try {
    const influencerData = await prisma.influencer_customer.findFirst({
      where: { id: id },
      select: {
        id: true,
        influencer_type_name: true,
        mobile: true,
        current_wallet_balnc: true,
      },
    });
    if (!influencerData) {
      return res.status(404).json({
        success: false,
        message: "Influencer not found",
        result: {},
      });
    }

    const alreadyEarnedBadge = await prisma.user_badge_activate.findMany({
      where: {
        user_id: influencerData.id,
      }
    });

    const alreadyEarnedBadges = await prisma.influencer_badge.findMany({
      where: {
        id: {
          in: alreadyEarnedBadge.map(badge => badge.badge_id)
        }
      }
    });
    const scanCountOverALL = await prisma.offer_coupon_scan.count({
      where: {
        scanned_by_name: req.user.name,
        scanned_by_mobile: req.user.mobile,
        del: false,
      },
    });
    const newlyEarnedBadge = await prisma.influencer_badge.findMany({
      where: {
        del: false,
        status: true,
        state: { has: influencerData.state },
        scan_count: { lte: scanCountOverALL },
        user_badge_activate: {
          none: { user_id: influencerData.id }
        }
      },
      orderBy: {
        scan_count: 'desc',
      },
    });
    if (!newlyEarnedBadge) {
      return res.status(404).json({
        success: false,
        message: "No new badges earned",
        result: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: `Newly Earned Badge`,
      newlyEarnedBadge,
      alreadyEarnedBadges,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getFaqQuestions = async (req, res) => {

  try {
    const data = await prisma.faq.findMany({
      where: {
        del: false,
      },
      select: {
        id: true,
        date_created: true,
        question: true,
        answer: true,
      },
      orderBy: {
        id: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      data: data.length ? data : [],
      message: data.length ? undefined : "No Data Found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

export const getTutorialVideoList = async (req, res) => {

  try {
    const videoList = await prisma.tutorial_video_master.findMany({
      where: {
        del: false,
      },
      orderBy: {
        date_created: "desc",
      },
    });

    return res.status(200).json({
      success: true,
      video_list: videoList.length ? videoList : [],
      message: videoList.length ? undefined : "No Data Found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

export const getContactDetail = async (req, res) => {
  // const { userId } = req.user; // assuming org_id from auth middleware
  try {
    const contactDetail = await prisma.company_contact_master.findFirst();

    return res.status(200).json({
      success: true,
      contact_detail: contactDetail || [],
      message: contactDetail ? undefined : "No Data Found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

export const getAboutDetail = async (req, res) => {

  try {
    const aboutDetail = await prisma.company_contact_master.findFirst({
      where: {
        del: false,
      },
    });

    return res.status(200).json({
      success: true,
      about_detail: aboutDetail || [],
      message: aboutDetail ? undefined : "No Data Found",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};

export const getEarnedPoints = async (req, res) => {
  const { id } = req.user;

  try {
    const [scanPointResult, bonusPointResult, redeemPointResult, referralPointResult, welcomePointResult, walletResult] =
      await Promise.all([
        prisma.influencer_ledger.aggregate({
          _sum: { credit: true },
          where: { influencer_id: id, transaction_type_name: "SCAN" },
        }),
        prisma.influencer_ledger.aggregate({
          _sum: { credit: true },
          where: { influencer_id: id, transaction_type_name: "BONUS" },
        }),
        prisma.influencer_ledger.aggregate({
          _sum: { credit: true },
          where: { influencer_id: id, transaction_type_name: "REDEEM" },
        }),
        prisma.influencer_ledger.aggregate({
          _sum: { credit: true },
          where: { influencer_id: id, transaction_type_name: "REFFERAL" },
        }),
        prisma.influencer_ledger.aggregate({
          _sum: { credit: true },
          where: { influencer_id: id, transaction_type_name: "WELCOME" },
        }),
        prisma.influencer_customer.findFirst({
          where: { id },
          select: { current_wallet_balnc: true },
        }),
      ]);

    const scan_point = scanPointResult._sum.credit ?? 0;
    const bonus_point = bonusPointResult._sum.credit ?? 0;
    const redeem_point = redeemPointResult._sum.credit ?? 0;
    const referral_point = referralPointResult._sum.credit ?? 0;
    const welcome_point = welcomePointResult._sum.credit ?? 0;
    const total_point = walletResult?.current_wallet_balnc ?? 0;

    return res.status(200).json({
      success: true,
      scan_point,
      bonus_point,
      redeem_point,
      referral_point,
      welcome_point,
      total_point,
      message: "Points fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching points:", error);
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
  }
};


export const getStates = async (req, res, next) => {
  try {
    const where = {};
    where.del = 0;

    const stateData = await prisma.abq_postal_master.groupBy({
      by: ["state_name"],
      orderBy: {
        state_name: "asc",
      },
    });

    if (!stateData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Success`,
      result: stateData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getDistricts = async (req, res, next) => {
  const { state_name } = req.body;

  if (!state_name) {
    return res.status(400).json({
      success: false,
      message: "State_name is required",
    });
  }

  try {
    const where = {};
    where.del = 0;

    const districtData = await prisma.abq_postal_master.groupBy({
      by: ["district_name"],
      where: {
        state_name: state_name,
      },
      orderBy: {
        district_name: "asc",
      },
    });

    if (!districtData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Success`,
      result: districtData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getPincodeDetails = async (req, res, next) => {
  const { pincode } = req.body;

  if (!pincode) {
    return res.status(400).json({
      success: false,
      message: "pincode is required",
    });
  }

  try {
    const where = {};
    where.del = 0;

    const stateData = await prisma.abq_postal_master.findFirst({
      where: {
        pincode: parseInt(pincode, 10),
      },
      orderBy: {
        state_name: "asc",
      },
    });

    if (!stateData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Success`,
      result: stateData,
    });
  } catch (error) {
    return next(error);
  }
};

export const getBannerList = async (req, res, next) => {
  try {
    const bannerData = await prisma.banner_master.findMany({
      where: {
        del: false,
      },
      orderBy: {
        date_created: "desc",
      },
    });

    if (!bannerData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        result: {},
      });
    }

    return res.status(200).json({
      success: true,
      message: `Banner List`,
      result: bannerData,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Bad Request",
      error: error.message,
    });
    return next(error);
  }
};

export const getHighLightedOffers = async (req, res, next) => {
  try {
    const offerData = await prisma.gift_gallery_master.findMany({
      where: {
        del: false,
        status: true,
      },
      take: 5,
      orderBy: {
        gift_point: 'desc'
      }
    });

    if (!offerData) {
      return res.status(404).json({
        success: false,
        message: "No Data Found",
        result: {},
      });
    }
    return res.status(200).json({
      success: true,
      message: `Highlighted Offer List`,
      result: offerData,
    });
  } catch (error) {
    return next(error);
  }
};
