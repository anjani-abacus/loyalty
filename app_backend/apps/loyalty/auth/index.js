import { generateMobileOtp, storeOtp, verifyOtp as verifyOtpService } from "@shared/services/otp.service.js";
import { sendOtpSms } from "@shared/services/sms.service.js";
import { prisma } from "@shared/config/database.js";
import jwt from "jsonwebtoken";
import redisClient from "@shared/config/redis.js";
import "dotenv/config";
import { sendNotification } from "@shared/fcmToken/notificationService";
import { config } from "@shared/config/env";
import { CreatedByType, Status } from "@prisma/client";

function safeParseJSON(data) {
  if (!data) return {};
  if (typeof data === "string") {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Invalid JSON received:", data);
      return {};
    }
  }
  return data; // Already object
}
export const generateToken = async (account) => {
  await redisClient.del(`user:${account.id}:accessToken`);
  await redisClient.del(`user:${account.id}:refreshToken`);
  const payload = { ...account };

  const accessToken = jwt.sign(payload, config.jwt.secret, {
    algorithm: "HS256",
    expiresIn: 60 * 60 * 24,
  });
  const refreshToken = jwt.sign(payload, config.jwt.secret, {
    algorithm: "HS256",
    expiresIn: config.jwt.expiresIn,
  });

  await redisClient.set(`user:${account.id}:app:accessToken`, accessToken, { EX: 60 * 60 * 24 })
  await redisClient.set(`user:${account.id}:app:refreshToken`, refreshToken, { EX: 7 * 24 * 60 * 60 });

  return { accessToken, refreshToken };
};
export const refreshToken = async (req, res, next) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(400).json({ success: false, message: "No refresh token" });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.jwt.secret, { algorithms: ["HS256"] });

    const stored = await redisClient.get(`user:${decoded.id}:refreshToken`);
    if (stored !== refreshToken) {
      return res.status(401).json({ success: false, message: "Refresh token revoked" });
    }
    const { exp, iat, ...payload } = decoded;

    const accessToken = jwt.sign(
      payload,
      config.jwt.secret,
      { algorithm: "HS256", expiresIn: "1h" }
    );

    return res.json({ accessToken });
  } catch (err) {
    next(err);
  }
};

export const getInfluencerTypes = async (req, res, next) => {
  try {
    const influencerTypes = await prisma.distribution_network.findMany({
      distinct: ["module_name"],
    });

    return res.status(200).json({
      success: true,
      message: "Influencer Types",
      result: influencerTypes
      ,
    });
  } catch (error) {
    return next(error);
  }
};

export const requestOtp = async (req, res, next) => {
  const { phone } = req.body;

  if (!phone) {
    return res.status(400).json({
      success: false,
      message: "phone number are required.",
    });
  }

  try {
    if (phone === '9319180958' || phone === '+919319180958' || phone === '8860773585' || phone === '+918860773585') {
      const otp = '123456';
      await storeOtp(phone, otp, "mobile");
      return res.status(200).json({
        success: true,
        message: `OTP ${otp} sent successfully`,
      });
    }
    const otp = generateMobileOtp();
    await storeOtp(phone, otp, "mobile");

    try {
      if (config.sms.enabled) {
        await sendOtpSms(phone, otp);
      } else {
        console.log(`SMS service disabled. Fallback OTP for ${phone}: ${otp}`);
      }
    } catch (smsError) {
      console.error(`SMS sending failed for ${phone}:`, smsError.message);
      console.log(`Fallback OTP for ${phone}: ${otp}`);
    }


    return res.status(200).json({
      success: true,
      message: `OTP sent successfully`,
    });
  } catch (error) {
    next(error);
    console.error("Error in requestOtp:", error);

  }
}
export const verifyOtp = async (req, res, next) => {
  const { phone, otp, fcm_token } = req.body;

  try {
    const isValid = await verifyOtpService(phone, otp, "mobile");

    if (!isValid)
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    const existingUser = await prisma.influencer_customer.findFirst({

      where: { mobile: phone }

    })
    if (existingUser && existingUser.active_status === false) {
      return res.status(403).json({
        status: false,
        deactivated: true,
        message: "User Deactivated!",
      });
    }


    const influencer = await prisma.influencer_customer.findFirst({ where: { mobile: phone } })

    const account = influencer;


    if (account) {


      const type = influencer?.login_type || '';


      if (fcm_token) {
        if (influencer) {
          await prisma.influencer_customer.update({
            where: { id: influencer.id },


            data: { fcm_token },
          });
        }
      }

      const token = await generateToken(account);

      await sendNotification({
        title: `Welcome Back ${account.name} 👨‍💼!`,
        body: "Successfully Login 👌!",
        id: account.id
      });

      res.cookie("refreshToken", token.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      return res.status(200).json({
        success: true,
        message: "Login successful",
        fcm_token,
        type,
        isRegistered: true,
        redirect: "dashboard",
        userId: account.id,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
      });
    } else {
      return res.status(200).json({
        success: false,
        message: "ID Not Registered!",
        redirect: "registration",
        isRegistered: false,
        token: "",
        userId: "",
      });
    }
  } catch (error) {
    console.error("OTP verification error:", error);
    next(error);
  }
};
// BUG WHEN SWITCH USER TYPE BETWEEN SFA AND INFLUENCER
// export const verifyOtp = async (req, res, next) => {
//   const { phone, otp, fcm_token } = req.body;

//   try {
//     const isValid =await verifyOtpService(phone, otp, "mobile");

//     if(!isValid)
//       return res.status(400).json({
//         success: false,
//         message: "Invalid OTP",
//       });
//     const existingUser = await prisma.influencer_customer.findFirst({
//       where:{mobile:phone}
//     })
//     if (existingUser && existingUser.active_status === false) {
//       return res.status(403).json({
//         status: false,
//         deactivated: true,
//         message: "User Deactivated!",
//       });
//     }

//     const [influencer, user] = await Promise.all([
//       prisma.influencer_customer.findFirst({ where: { mobile: phone} }),
//       prisma.sfa_user.findFirst({ where: { contact_01: phone } }),
//     ]);

//     const account = influencer || user;

//     if (account) {

//       const type = influencer?.login_type || user?.login_type || '';

//       if (fcm_token) {
//         if (influencer) {
//           await prisma.influencer_customer.update({
//             where: { id: influencer.id },
//             data: { fcm_token},
//           });
//         } else if (user) {
//           await prisma.sfa_user.update({
//             where: { id: user.id },
//             data: { fcm_token },
//           });
//         }
//       }

//       const token = await generateToken(account);

//       await sendNotification({
//         title: `Welcome Back ${account.name} 👨‍💼!`,
//         body: "Successfully Login 👌!",
//         id: account.id   
//       });

//       res.cookie("refreshToken", token.refreshToken, {
//         httpOnly: true,
//         secure:true, 
//         sameSite: "strict",
//         maxAge: 7 * 24 * 60 * 60 * 1000 
//       });

//       return res.status(200).json({
//         success: true,
//         message: "Login successful",
//         fcm_token,
//         type,
//         isRegistered: true,
//         redirect: "dashboard",
//         userId: account.id,
//         accessToken: token.accessToken,   
//         refreshToken: token.refreshToken, 
//       });
//     } else {
//       return res.status(200).json({
//         success: false,
//         message: "ID Not Registered!",
//         redirect: "registration",
//         isRegistered: false,
//         token: "",
//         userId: "",
//       });
//     }
//   } catch (error) {
//     console.error("OTP verification error:", error);
//     next(error);
//   }
// };

export const checkRefrralCodeExists = async (req, res, next) => {
  const { referred_by_code } = req.body;

  try {
    const existingInfluencer = await prisma.influencer_customer.findFirst({
      where: { referral_code: referred_by_code },
    });

    if (existingInfluencer) {
      return res.status(200).json({
        success: true,
        message: "Referral code is Valid.",
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Referral code is not valid !",
      });
    }
  } catch (error) {
    return next(error);
  }

}

export const registerUser = async (req, res, next) => {
  const basicInfo = safeParseJSON(req.body?.basicInfo);
  const dealerDetails = safeParseJSON(req.body?.dealerDetails);

  const { referral_code, document_no } = req.body

  const payload = {
    ...basicInfo,
    ...dealerDetails,
    referral_code,
    document_no,
  }

  const {
    mobile,
    name,
    influencer_type_name,
    birth_date,
    dealer_id,
    dealer_code,
    dealer_name,
    dealer_mobile,
    addressInfo = {}
  } = payload || {};


  const document_img_front = req.files?.document_img_front?.[0]?.key
    ? `${config.s3.publicUrl}/${req.files.document_img_front[0].key}`
    : undefined;

  const document_img_back = req.files?.document_img_back?.[0]?.key
    ? `${config.s3.publicUrl}/${req.files.document_img_back[0].key}`
    : undefined;
  const profile_img = req.files?.profile_img?.[0]?.key
    ? `${config.s3.publicUrl}/${req.files.profile_img[0].key}`
    : undefined;
  try {
    if (!mobile) {
      return res.status(400).json({ error: "Mobile number is required." });
    }

    const existingInfluencer = await prisma.influencer_customer.findFirst({
      where: { mobile: mobile },
    });

    if (existingInfluencer) {
      return res.status(400).json({
        success: false,
        message: "Mobile number already exists.",
      });
    }

    // Format date of birth
    let formattedDateOfBirth = null;
    if (birth_date) {
      const dob = new Date(birth_date);
      if (!isNaN(dob)) {
        formattedDateOfBirth = dob.toISOString();
      }
    }

    const currentDate = new Date().toISOString();

    const newInfluencer = await prisma.influencer_customer.create({
      data: {
        date_created: currentDate,
        created_by_type: CreatedByType.SELF,
        name,
        mobile,
        ...(formattedDateOfBirth && { birth_date: formattedDateOfBirth }),
        influencer_type_name: influencer_type_name?.toUpperCase() || '',
        referral_code: `REF${Math.floor(100000 + Math.random() * 900000)}`,
        referred_by_code: referral_code || '',
        login_type: 'Loyalty',

        // Address Info
        country: addressInfo.country || 'India',
        pincode: addressInfo.pincode || '',
        state: addressInfo.state || '',
        district: addressInfo.district || '',
        city: addressInfo.city || '',
        area: addressInfo.area || '',

        // Dealer/Distributor Info
        dealer_id: Number(dealer_id) || null,
        dealer_code: dealer_code || '',
        dealer_name: dealer_name || '',
        dealer_mobile: dealer_mobile || '',

        status_of_profile: Status.PENDING,

        // Documents
        document_no: document_no ? String(document_no).trim() : '',
        ...(profile_img ? { profile_img } : {}),
        ...(document_img_front ? { document_img_front } : {}),
        ...(document_img_back ? { document_img_back } : {}),
      },
    });
    if (newInfluencer.referred_by_code) {
      const existingInfluencer = await prisma.influencer_customer.findFirst({
        where: { referral_code: newInfluencer.referred_by_code },
      });

      if (existingInfluencer) {
        const check = await prisma.point_master.findFirst({
          select: { registration_refferal: true, registration_refferal_own: true }
        })
        if (check) {
          const prevBal = await prisma.influencer_customer.findFirst({
            where: { id: Number(newInfluencer.id) },
            select: { current_wallet_balnc: true }
          });
          if (!prevBal || prevBal?.current_wallet_balnc === null || prevBal?.current_wallet_balnc === undefined) throw new Error('PREV_BALANCE_NOT_FOUND');
          await prisma.influencer_ledger.create({
            data: {
              date_created: new Date(),
              influencer_id: newInfluencer.id,
              influencer_name: newInfluencer.name,
              influencer_type: newInfluencer.influencer_type_name || '',
              transaction_type_name: 'REFFERAL',
              credit: check.registration_refferal_own,
              debit: 0,
              balance: prevBal?.current_wallet_balnc + check.registration_refferal_own,
              transaction_remark: `Referral Points Earn ${check.registration_refferal_own}`,
              type: 'credit',
            },
          });

          await prisma.influencer_customer.update({
            where: { id: Number(newInfluencer.id) },
            data: {
              current_wallet_balnc: prevBal?.current_wallet_balnc + check.registration_refferal_own,
              last_wallet_update: new Date(),
              last_scan_date: new Date()
            },
          });
        }
        const referrer = await prisma.influencer_customer.findFirst({
          where: { referral_code: newInfluencer.referred_by_code }
        })
        if (referrer) {
          const prevBal = await prisma.influencer_customer.findFirst({
            where: { id: Number(referrer.id) },
            select: { current_wallet_balnc: true }
          });
          if (!prevBal || prevBal?.current_wallet_balnc === null || prevBal?.current_wallet_balnc === undefined) throw new Error('PREV_BALANCE_NOT_FOUND');
          await prisma.influencer_ledger.create({
            data: {
              date_created: new Date(),
              influencer_id: referrer.id,
              influencer_name: referrer.name,
              influencer_type: referrer.influencer_type_name || '',
              transaction_type_name: 'REFFERAL',
              credit: check.registration_refferal,
              debit: 0,
              balance: prevBal?.current_wallet_balnc + check.registration_refferal,
              transaction_remark: `Referral Points Earn from ${newInfluencer.name} of ${check.registration_refferal}`,
              type: 'credit',
            },
          });
          await prisma.influencer_customer.update({
            where: { id: Number(referrer.id) },
            data: {
              current_wallet_balnc: prevBal?.current_wallet_balnc + check.registration_refferal,
              last_wallet_update: new Date(),
              last_scan_date: new Date()
            },
          });
        }
      }

    }

    const welcomePoint = await prisma.point_master.findFirst({
      select: { welcome_point: true }
    });

    if (welcomePoint && welcomePoint.welcome_point > 0) {
      const prevBal = await prisma.influencer_customer.findFirst({
        where: { id: Number(newInfluencer.id) },
        select: { current_wallet_balnc: true }
      });

      const currentBal = prevBal?.current_wallet_balnc || 0;
      const newBal = currentBal + welcomePoint.welcome_point;

      await prisma.influencer_ledger.create({
        data: {
          date_created: new Date(),
          influencer_id: newInfluencer.id,
          influencer_name: newInfluencer.name,
          influencer_type: newInfluencer.influencer_type_name || '',
          transaction_type_name: 'WELCOME',
          credit: welcomePoint.welcome_point,
          debit: 0,
          balance: newBal,
          transaction_remark: `Welcome Points of ${welcomePoint.welcome_point}`,
          type: 'credit',
        },
      });

      await prisma.influencer_customer.update({
        where: { id: Number(newInfluencer.id) },
        data: {
          current_wallet_balnc: newBal,
          last_wallet_update: new Date(),
        },
      });
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      result: newInfluencer.id,
      data: newInfluencer
    });
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (req, res, next) => {

  const { id } = req.user;

  const basicInfo = safeParseJSON(req.body?.basicInfo);
  const documentDetails = safeParseJSON(req.body?.documentDetails);
  const bankDetails = safeParseJSON(req.body?.bankDetails);
  const dealerDetails = safeParseJSON(req.body?.dealerDetails);


  const payload = {
    ...basicInfo, ...documentDetails, ...bankDetails, ...dealerDetails
  }
  const {
    mobile,
    name,
    birth_date,
    email,
    influencer_type_name,
    addressInfo = {},


    dealer_name,
    dealer_mobile,
    dealer_code,
    dealer_id,

    // Bank Details
    bank_name,
    ifsc_code,
    account_holder_name,
    account_no,
    upi_id,

    referral_code,

    document_no,
    kyc_document_type,
    pan_no,

  } = payload || {};

  const files = req.files || {};

  const profile_img = files?.profile_img?.[0]?.key
    ? `${config.s3.publicUrl}/${files.profile_img[0].key}`
    : undefined;

  const document_img_front = files?.document_img_front?.[0]?.key
    ? `${config.s3.publicUrl}/${files.document_img_front[0].key}`
    : undefined;

  const document_img_back = files?.document_img_back?.[0]?.key
    ? `${config.s3.publicUrl}/${files.document_img_back[0].key}`
    : undefined;

  const document_pan_img = files?.document_pan_img?.[0]?.key
    ? `${config.s3.publicUrl}/${files.document_pan_img[0].key}`
    : undefined;

  const document_bank_img = files?.document_bank_img?.[0]?.key
    ? `${config.s3.publicUrl}/${files.document_bank_img[0].key}`
    : undefined;

  try {

    // Parse and validate date
    let formattedDateOfBirth = null;
    if (birth_date) {
      const dob = new Date(birth_date);
      if (!isNaN(dob)) {
        formattedDateOfBirth = dob.toISOString();
      }
    }
    const updateDate = new Date();
    let lastUpdateOn = updateDate.toISOString();

    const updatedUser = await prisma.influencer_customer.update({
      where: { id },
      data: {
        date_created: lastUpdateOn,
        name,
        mobile,
        ...(formattedDateOfBirth ? { birth_date: formattedDateOfBirth } : {}),
        email,
        influencer_type_name,
        referral_code,
        login_type: 'Loyalty',

        // Address Info
        country: addressInfo.country || 'India',
        pincode: addressInfo.pincode,
        state: addressInfo.state,
        district: addressInfo.district,
        city: addressInfo.city,
        area: addressInfo.area,

        // Dealer/Distributor Info
        dealer_name,
        dealer_mobile,
        dealer_code,
        dealer_id,

        upi_id,

        // Bank Details
        bank_name,
        ifsc_code,
        account_holder_name,
        account_no,

        // Document Details
        kyc_document_type,
        document_no,
        pan_no,
        ...(profile_img ? { profile_img } : {}),
        ...(document_img_front ? { document_img_front } : {}),
        ...(document_img_back ? { document_img_back } : {}),
        ...(document_pan_img ? { document_pan_img } : {}),
        ...(document_bank_img ? { document_bank_img } : {}),

      },
    });

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      result: updatedUser,
    });
  } catch (error) {
    return next(error);
  }
};

export const getUserDetail = async (req, res, next) => {
  const { id } = req.user;

  try {

    const user = await prisma.influencer_customer.findFirst({
      where: { id: Number(id) },
      select: {
        id: true,
        force_logout: true,
        login_type: true,
        date_created: true,
        created_by_type: true,
        name: true,
        mobile: true,
        birth_date: true,
        active_status: true,
        email: true,
        influencer_type_name: true,
        referral_code: true,
        current_wallet_balnc: true,
        work_anniversary_date: true,
        // Address Info
        country: true,
        pincode: true,
        state: true,
        district: true,
        city: true,
        area: true,
        // KYC Info
        kyc_status: true,

        // Dealer/Distributor Info
        dealer_name: true,
        dealer_mobile: true,
        dealer_code: true,
        dealer_id: true,

        // bank Details
        document_bank_img: true,
        bank_name: true,
        ifsc_code: true,
        account_holder_name: true,
        account_no: true,

        //Document Details
        document_no: true,
        kyc_document_type: true,
        document_img_front: true,
        document_img_back: true,
        document_pan_img: true,
        pan_no: true,
        upi_id: true,
        profile_img: true,
        //d: true,
        // profile status
        status_of_profile: true,
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        result: {},
      });
    }
    // // Send notification
    // const result = await sendNotification({
    //   title: "🔥 Today’s Special Offer",
    //   body: "Get 20% off on all items! 🎉",
    //   id: user.id,
    //   type: 'both',
    //   deepLinkPath: '/LoyaltyGiftGallery',
    //   // deepLinkParams: { campaign: 'summer' }
    // });

    // const result = await sendNotification({
    //   title: "🔥 Successfully Login  !  ", 
    //   body: "Now Update Your Profile 🧑‍🏫 !",
    //   id: user.id,
    //   type: 'both',
    //   deepLinkPath: '/UpdateProfile',
    //   deepLinkParams: { formType: 'BasicInformation' }
    // });
    return res.status(200).json({
      success: true,
      message: `User Detail`,
      result: user,
      // pushData:result
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { id, login_type } = req.user;

    if (!id || !login_type) {
      return res.status(400).json({
        success: false,
        message: "Missing user information",
      });
    }


    await redisClient.del(`user:${id}:app:accessToken`);
    await redisClient.del(`user:${id}:app:refreshToken`);

    if (login_type === "Loyalty") {
      await prisma.influencer_customer.updateMany({
        where: { id: Number(id) },
        data: { fcm_token: null },
      });
    } else {
      await prisma.sfa_user.updateMany({
        where: { id: Number(id) },
        data: { fcm_token: null },
      });
    }

    return res.json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return next(error);
  }
};
