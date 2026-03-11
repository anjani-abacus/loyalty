export const userSchema = (result, type) => {
  return {
    basicInfo: {
      mobile: result?.mobile || '',
      influencer_type_name: result?.influencer_type_name || '',
      name: result?.name || '',
      birth_date: result?.birth_date || '',
      // email: result?.email || "",
      addressInfo: {
        country: result?.country || '',
        pincode: result?.pincode || '',
        state: result?.state || '',
        district: result?.district || '',
        city: result?.city || '',
        area: result?.area || '',
      },
    },
    dealerDetails: {
      dealer_code: result?.dealer_code || '',
      dealer_name: result?.dealer_name || '',
      dealer_mobile: result?.dealer_mobile || '',
      // distributor_name: result?.distributor_name || "",
    },
    documentDetails: {
      document_no: result?.document_no || '',
      kyc_document_type: result?.kyc_document_type || 'AADHAAR',
      document_img_front: result?.document_img_front || '',
      document_img_back: result?.document_img_back || '',
      pan_no: result?.pan_no || '',
      document_pan_img: result?.document_pan_img || '',
    },
    ...(type !== 'registration' && {
      bankDetails: {
        account_holder_name: result?.account_holder_name || '',
        account_no: result?.account_no || '',
        bank_name: result?.bank_name || '',
        ifsc_code: result?.ifsc_code || '',
        upi_id: result?.upi_id || '',
        // bankImg,
      },
    }),
    referral_code: result?.referral_code || '',
  };
};
