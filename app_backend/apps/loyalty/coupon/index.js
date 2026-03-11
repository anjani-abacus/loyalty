import { prisma } from '@shared/config/database.js';
import { updateStreak } from '../streak/index.js';

export const couponCodeScan = async (req, res, next) => {


  const { coupon_code, is_mobile_manual_scan = '', lat = '', lng = '' } = req.body;
  const { id, name, state, district, mobile } = req.user;

  try {
    const result = await prisma.$transaction(async (tx) => {

      const influencerData = await tx.influencer_customer.findFirst({
        where: { id, status_of_profile: 'APPROVED', del: false },
        select: { id: true, influencer_type_name: true, mobile: true ,state: true, district: true, status_of_profile: true},
      });

      if (!influencerData) throw new Error('PROFILE_PENDING');

      const scanned = await tx.offer_coupon_scan.findFirst({ where: { coupon_code } });

      if (scanned) throw new Error('COUPON_ALREADY_SCANNED');

      const coupon = await tx.offer_coupon.findFirst({ where: { coupon_code, del: false } });

      if (!coupon) throw new Error('WRONG_QR');

      const scanLimit = await tx.scan_limit.findFirst();

      if (!scanLimit) throw new Error('SCAN_LIMIT_NOT_SET');

      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const scanCount = await tx.offer_coupon_scan.count({
        where: {
          scanned_by_name: name,
          scanned_by_mobile: mobile,
          del: false,
          scanned_date: { gte: todayStart },
        },
      });
      if (scanCount >= scanLimit.scan_limit) throw new Error('DAILY_LIMIT_EXCEEDED');

      const prod = await tx.master_product.findFirst({
        where: { id: coupon.product_id, del: false },
        select: { point_category_id: true },
      });

      const pointCategoryId = prod?.point_category_id ?? coupon.point_category_id;

      if (!pointCategoryId) throw new Error('POINT_CATEGORY_NOT_FOUND');

      const couponCategory = await tx.point_category_master.findFirst({
        where: { id: pointCategoryId, del: false },
      });

      if (!couponCategory) throw new Error('NO_PRODUCT_POINT_CATEGORY');

      let scanPoints = 0;
      if(influencerData.influencer_type_name === 'PAINTER'){
       scanPoints = couponCategory.painter_point;
      } else if (influencerData.influencer_type_name === 'CONTRACTOR'){
        scanPoints = couponCategory.contractor_point;
      }else{
        throw new Error('NO_PRODUCT_POINT_CATEGORY_ASSIGN');
      }
      const scanData = {
        scanned_date: new Date(),
        scanned_by_id: id,
        scanned_by_name: name,
        scanned_by_mobile: mobile,
        coupon_value: scanPoints,
        point_category_id: couponCategory.id,
        point_category_name: couponCategory.point_category_name,
        scanned_by_type: influencerData.influencer_type_name,
        transaction_id: `#TXN-${coupon_code}${influencerData.influencer_type_name}${id}`,
        coupon_code,
        coupon_id: coupon.id,
        is_mobile_manual_scan: is_mobile_manual_scan === '1' || is_mobile_manual_scan === true,
        state,
        district,
        region: '',
        lat,
        lng,
        product_detail: coupon.product_detail,
        influencer_type: influencerData.influencer_type_name || ''
      };

     const offer_coupon_scan = await tx.offer_coupon_scan.create({ data: scanData });

      await tx.offer_coupon.update({ where: { id: coupon.id }, data: { is_Scanned: true} });

      const prevBal = await tx.influencer_customer.findFirst({
        where: { id: Number(id) },
        select: { current_wallet_balnc: true }
      });

      if (!prevBal || prevBal.current_wallet_balnc === null || prevBal.current_wallet_balnc === undefined) throw new Error('PREV_BALANCE_NOT_FOUND');

      const walletBalance = prevBal?.current_wallet_balnc || 0;

      const now = new Date();
      const applicableBonuses = await tx.bonus_master.findMany({
        where: {
          start_date: { lte: now },
          end_date: { gte: now },
          influencer_type: influencerData.influencer_type_name ,
          del: false,
          status: true,
          AND: [
            {
              OR: [
                { state: { array_contains: influencerData.state } },
                { state: { equals: null } },
                { state: { equals: [] } },
              ],
            },
              {
              OR: [
                { district: { array_contains: influencerData.district } },
                { district: { equals: null } },
                { district: { equals: [] } },
              ],
            },
          ],
        },
        include: {
          bonus_product_point: {
            where: {
              point_category_id: couponCategory.id,
            },
            select: {
              point_category_id: true,
              point: true,
            },
          },
        },
      });

      let bonusPoints = 0;
      for (const bonus of applicableBonuses) {
        for (const categoryBonus of bonus.bonus_product_point) {
          bonusPoints += categoryBonus.point || 0;
        }
      }

      if(bonusPoints > 0) {
        await tx.offer_coupon_scan.update({
          where: { id: offer_coupon_scan.id},
          data: {
            bonus_scheme_name: applicableBonuses[0].title,
            bonus_scheme_id: applicableBonuses[0].id,
            bonus_point: bonusPoints,
          },
        });

      }
     
      let badgePoints = 0;
      const scanCountOverALL = await tx.offer_coupon_scan.count({
        where: {
          scanned_by_name: name,
          scanned_by_mobile: mobile,
          del: false,
        },
      });
      const lastBadge = await tx.user_badge_activate.findFirst({
        where: { user_id: influencerData.id },
        orderBy: { date_created: 'desc' },
      });

      const baseCount = lastBadge ? lastBadge.eligible_point : 0;
      const newEffectiveCount = scanCountOverALL - baseCount;
      const newlyEarnedBadge = await tx.influencer_badge.findFirst({
        where: {
          del: false,
          status: true,
          scan_count: { lte: newEffectiveCount},
          AND:[
            {
              OR: [
                { state: { array_contains: influencerData.state } },
                { state: { equals: null } },
                { state: { equals: [] } },
              ],
            },
              {
                OR: [
                { influencer_type: { array_contains: influencerData.influencer_type_name } },
                { influencer_type: { equals: null } },
                { influencer_type: { equals: [] } },
              ],
            },
          ],
        
          user_badge_activate: {
            none: { user_id: influencerData.id }
          },
        },
        orderBy: {
          scan_count: 'asc',
        },
      });
      if (newlyEarnedBadge) {
        badgePoints = newlyEarnedBadge.point_value;
        await tx.user_badge_activate.create({
          data: {
            user_id: influencerData.id,
            badge_id: newlyEarnedBadge.id,
            total_scan_point: scanPoints + bonusPoints + badgePoints,
            eligible_point: newlyEarnedBadge.scan_count,
            value: newlyEarnedBadge.point_value,
          },
        });
        await tx.offer_coupon_scan.update({
          where: { id: offer_coupon_scan.id },
          data: {
            badge_point: badgePoints,
            badge_scheme_name: newlyEarnedBadge.title,
            badge_scheme_id: newlyEarnedBadge.id,
          },
        });
      }

      const totalPoints = scanPoints + bonusPoints + badgePoints;
      let runningBalance = walletBalance;

      runningBalance += scanPoints;
      await tx.influencer_ledger.create({
        data: {
          date_created: new Date(),
          influencer_id: id,
          influencer_name: name,
          influencer_type: influencerData.influencer_type_name || '',
          transaction_type_name: 'SCAN',
          credit: scanPoints,
          transaction_remark: `Scan Points for coupon ${coupon_code}`,
          debit: 0,
          balance: runningBalance,
          type: 'credit',
          coupon_code,
          redeem_id: 0,
        },
      });

      if (bonusPoints > 0) {
        runningBalance += bonusPoints;
        await tx.influencer_ledger.create({
          data: {
            date_created: new Date(),
            influencer_id: id,
            influencer_name: name,
            influencer_type: influencerData.influencer_type_name || '',
            transaction_type_name: 'BONUS',
            credit: bonusPoints,
            transaction_remark: `Bonus Points from scheme ${applicableBonuses[0]?.title || ''}`,
            debit: 0,
            balance: runningBalance,
            type: 'credit',
            coupon_code,
            redeem_id: 0,
          },
        });
      }

      if (badgePoints > 0) {
        runningBalance += badgePoints;
        await tx.influencer_ledger.create({
          data: {
            date_created: new Date(),
            influencer_id: id,
            influencer_name: name,
            influencer_type: influencerData.influencer_type_name || '',
            transaction_type_name: 'BADGE',
            credit: badgePoints,
            transaction_remark: `Badge earned: ${newlyEarnedBadge?.title || ''}`,
            debit: 0,
            balance: runningBalance,
            type: 'credit',
            coupon_code,
            redeem_id: 0,
          },
        });
      }

      await tx.influencer_customer.update({
        where: { id: Number(id) },
        data: {
          current_wallet_balnc: runningBalance,
          last_wallet_update: new Date(),
          last_scan_date: new Date()
        },
      });
      await tx.offer_coupon_scan.update({
        where: { id: offer_coupon_scan.id },
        data: {
          total_point: totalPoints
        },
        
      });

      return {
        scanPoints,
        bonusPoints,
        badgePoints,
        totalPoints,
        updatedWalletBalance:runningBalance
      };
    }, {
      timeout: 15000 
    });


    const updateStreakStatus = await updateStreak(id);

    return res.status(200).json({
      success: true,
      message: 'Success',
      updateStreakStatus,
      result
    });

  } catch (err) {

    const errorMap = {
      PROFILE_PENDING: 'Your profile verification is pending.',
      COUPON_ALREADY_SCANNED: 'Coupon Code already scanned!',
      NO_PRODUCT_POINT_CATEGORY_ASSIGN: 'No product point category assigned for this influencer type.',
      WRONG_QR: 'Wrong QR',
      SCAN_LIMIT_NOT_SET: 'Scan limit is not set',
      DAILY_LIMIT_EXCEEDED: 'Daily Limit Exceeded!',
      POINT_CATEGORY_NOT_FOUND: 'Point category not found',
      NO_PRODUCT_POINT_CATEGORY: 'No Product Point Category Found.',
      PREV_BALANCE_NOT_FOUND: 'Previous balance not found!'
    };

    return res.status(400).json({
      success: false,
      message: errorMap[err.message] || 'Something went wrong',
      error: err.message
    });
  }
};

export const couponScanList = async (req, res) => {
  try {
    const { id } = req.user;

      const couponScanList = await prisma.offer_coupon_scan.findMany({
        where: {
        scanned_by_id: id,       
        },
        orderBy: {
            id: 'desc',
        },
    });

    if (couponScanList.length > 0) {
      return res.status(200).json({
        success: true,
        message: '',
        result: {
          couponScanList,
        },
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'No data Found',
        result: {
          couponScanList: [],
        },
      });
    }

  } catch (error) {
    console.error('Error in couponScanList:', error);
    return res.status(500).json({
      success: false,
      message: 'Server Error',
    });
  }
};
