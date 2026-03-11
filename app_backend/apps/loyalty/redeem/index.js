import { generateMobileOtp, storeOtp, verifyOtp as verifyOtpService } from '@shared/services/otp.service.js';
import { sendOtpSms } from '@shared/services/sms.service.js';
import { prisma } from '@shared/config/database.js';

import { sendNotification } from '@shared/fcmToken/notificationService.js';
import { config } from '@shared/config/env';

export const addRedeemRequest = async (req, res) => {
  const { id, name, mobile, state, district, influencer_type_name } = req.user;
  const data = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      const balance = await tx.influencer_customer.findUnique({
        where: { id },
        select: { current_wallet_balnc: true },
      });

      if (!balance || balance?.current_wallet_balnc === null || balance?.current_wallet_balnc === undefined) {
        throw new Error('PREV BALANCE NOT FOUND!');
      }

      const prevBal = balance?.current_wallet_balnc || 0;

      const gift = await tx.gift_gallery_master.findUnique({
        where: { id: Number(data.gift_id) },
      });
      if (!gift) throw new Error('GIFT_NOT_FOUND');

      const redeemPoints = gift.gift_point || Number(data.gift_point || 0);

      if (prevBal < redeemPoints) throw new Error('INSUFFICIENT_POINTS');

      if (gift.gift_type === 'CASH') {
        const requiredFields = ['gift_id', 'gift_point', 'payment_mode'];
        for (const field of requiredFields) {
          if (!data[field]) throw new Error(`${field}_REQUIRED`);
        }
        if (data.payment_mode === 'BANK') {
          const requiredBankFields = ['account_no', 'ifsc_code', 'bank_name', 'account_holder_name'];
          for (const field of requiredBankFields) {
            if (!data[field]) throw new Error(`${field}_REQUIRED_BANK`);
          }
        }
      }

      if (gift.gift_type === 'GIFT') {
        if (!data.shipping_address) throw new Error('SHIPPING_ADDRESS_REQUIRED');
      }
      // check does request for same gift is send by user or not
      const existingRequest = await tx.gift_redeem_request.findFirst({
        where: {
          user_id: id,
          gift_id: gift.id,
        },
      });
      if (existingRequest) throw new Error('ALREADY_REQUESTED');
      const giftRedeemData = {
        date_created: new Date(),
        user_id: id,
        gift_id: gift.id,
        user_mobile: mobile,
        user_name: name,
        user_type: influencer_type_name,
        state,
        district,
        influencer_type: influencer_type_name,
        gift_name: gift.title,
        redeem_type: gift.gift_type,
        gift_type: gift.gift_type,
        payment_mode: data.payment_mode,
        upi_id: data.upi_id,
        account_no: data.account_no,
        ifsc_code: data.ifsc_code,
        bank_name: data.bank_name,
        account_holder_name: data.account_holder_name,
        gift_status: 'INPROGRESS',
        shipping_address: data.shipping_address ?? null,
        shipping_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        redeem_point: redeemPoints,
        cash_point: gift.point_range_value * redeemPoints,
        point_range_value: gift.point_range_value,
        remark: data.specialInstruction ?? '',
        del: false,
      };

      const redeemRequest = await tx.gift_redeem_request.create({ data: giftRedeemData });

      const fixCode = `REQ${String(redeemRequest.id).padStart(5, '0')}`;
      await tx.gift_redeem_request.update({
        where: { id: redeemRequest.id },
        data: { req_id: fixCode },
      });

      await tx.influencer_customer.update({
        where: { id },
        data: { shipping_address: data.shipping_address },
      });

      await tx.influencer_ledger.create({
        data: {
          influencer_id: id,
          influencer_name: name,
          transaction_type_name: 'REDEEM',
          credit: 0,
          debit: redeemPoints,
          balance: prevBal - redeemPoints,
          transaction_remark: `Points redeemed against redeem request number ${fixCode}`,
          type: 'debit',
          redeem_id: redeemRequest.id,
        },
      });

      await tx.influencer_customer.update({
        where: { id },
        data: {
          current_wallet_balnc: prevBal - redeemPoints,
          last_wallet_update: new Date(),
          last_redeem_date: new Date(),
        },
      });

      return { redeemRequest, redeemPoints, newBalance: prevBal - redeemPoints };
    });

    await sendNotification({
      title: "Redeem Request",
      body: `Your redeem request of ₹${result.redeemPoints} was submitted successfully! Remaining balance: ₹${result.newBalance}`,
      id,
    });

    return res.status(200).json({
      success: true,
      message: `Your redeem request of ${result.redeemPoints} points was submitted successfully! Remaining balance: ${result.newBalance} points.`,
    });

  } catch (error) {
    console.error('Error in addRedeemRequest:', error);

    const errorMap = {
      CUSTOMER_NOT_FOUND: 'Customer not found!',
      ALREADY_REQUESTED: 'You have already requested for this gift!',
      KYC_PENDING: 'KYC Status Pending',
      GIFT_NOT_FOUND: 'Gift not found!',
      INSUFFICIENT_POINTS: 'Insufficient Points to redeem!',
      SHIPPING_ADDRESS_REQUIRED: 'Shipping address is required!',
      gift_id_REQUIRED: 'gift_id is required!',
      gift_point_REQUIRED: 'gift_point is required!',
      payment_mode_REQUIRED: 'payment_mode is required!',
      account_no_REQUIRED_BANK: 'Account number is required for BANK payment!',
      ifsc_code_REQUIRED_BANK: 'IFSC code is required for BANK payment!',
      bank_name_REQUIRED_BANK: 'Bank name is required for BANK payment!',
      account_holder_name_REQUIRED_BANK: 'Account holder name is required for BANK payment!',
    };

    return res.status(400).json({
      success: false,
      message: errorMap[error.message] || 'Internal server error',
    });
  }
};


export const getRedeemGiftRequestDetail = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Redeem Id required"
    });
  }
  try {
    let giftMasterList = await prisma.gift_redeem_request.findFirst({
      where: {
        user_id: Number(id),
        del: false
      },
      orderBy: {
        id: 'desc'
      },
      select:
      {
        id: true,
        req_id: true,
        date_created: true,
        gift_status: true,
        redeem_type: true,
        gift_name: true,
        redeem_point: true,
        cash_point: true,
        point_range_value: true,
        remark: true,
        influencer_type: true,
        shipping_address: true,
        shipping_date: true,
        influencer_customer: {
          select: {
            mobile: true,
            email: true,
            country: true,
            state: true,
            district: true,
            city: true
          }
        },
        gift_gallery_master: {
          select: {
            date_created: true,
            created_by_name: true,
            gift_type: true,
            title: true,
            gift_point: true,
            gift_img: true,
            termsNcondition: true,
            status: true,
            point_range_value: true
          }
        }
      }
    });

    if (giftMasterList) {
      return res.status(200).json({
        success: true,
        result: { giftMasterList }
      });
    } else {
      return res.status(200).json({
        success: true,
        message: 'No data found',
        result: { giftMasterList: [] }
      });
    }
  } catch (error) {
    console.error('Error fetching redeem request details:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error'
    });
  }
};

export const sendOtp = async (req, res, next) => {

  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "Phone number is required."
    });
  }

  const otp = generateMobileOtp();
  storeOtp(phone, otp, 'mobile', 'redeem');

  try {
    if (config.sms.enabled) {
      await sendOtpSms(phone, otp);
    } else {
      console.log(`Simulated OTP for ${phone}: ${otp}`);
    }

    return res.status(200).json({
      success: true,
      message: 'OTP sent successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const verifyOtp = async (req, res, next) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({
      success: false,
      message: 'Phone number and OTP are required'
    });
  }

  const isValid = await verifyOtpService(phone, otp, 'mobile', 'redeem'); // renamed below
  if (!isValid) {
    return res.status(401).json({
      success: false,
      message: 'Invalid or expired OTP'
    });
  }

  return res.status(200).json({
    success: true,
    message: 'OTP verified'
  });
};

export const getRedeemGiftRequestList = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const giftRedeem = await prisma.gift_redeem_request.findMany({
      where: {
        user_id,
        del: false,
      },
      orderBy: {
        id: 'desc',
      },
      select:
      {
        id: true,
        action_status: true,
        req_id: true,
        date_created: true,
        redeem_type: true,
        gift_name: true,
        redeem_point: true,
        cash_point: true,
        point_range_value: true,
        remark: true,
        influencer_type: true,
        // shipping details
        shipping_address: true,
        shipping_date: true,
        shipping_remark: true,
        gift_status: true,
        shipping_type: true,
        estimate_date: true,
        influencer_customer: {
          select: {
            mobile: true,
            email: true,
            country: true,
            state: true,
            district: true,
            city: true
          }
        },
        gift_gallery_master: {
          select: {
            date_created: true,
            created_by_name: true,
            gift_type: true,
            title: true,
            gift_point: true,
            gift_img: true,
            termsNcondition: true,
            status: true,
            point_range_value: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      message: 'Fetched Successfully!',
      data: giftRedeem
    });

  } catch (error) {
    console.error('Error in redeemGiftRequestList:', error);
    next(error);

  }
};

export const getOldRedeemGiftRequestList = async (req, res, next) => {
  try {
    const user_id = req.user.id;

    const giftRedeem = await prisma.gift_redeem_request.findMany({
      where: {
        user_id,
        gift_status: 'INPROGRESS',
        del: false,
      },
      orderBy: {
        date_created: 'asc',
      },
      skip: 7 // Skip the first 7 records
    });


    return res.status(200).json({
      success: true,
      message: 'Fetched Successfully!',
      Total: giftRedeem.length,
      data: giftRedeem
    });

  } catch (error) {
    console.error('Error in redeemGiftRequestList:', error);
    next(error);

  }
};

