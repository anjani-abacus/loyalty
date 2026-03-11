// sections/formOptions.js
export const categoryOptions = [
  { value: "fashion", label: "Fashion & Style" },
  { value: "fitness", label: "Fitness & Health" },
  { value: "food", label: "Food & Cooking" },
  { value: "travel", label: "Travel" },
  { value: "tech", label: "Technology" },
  { value: "lifestyle", label: "Lifestyle" },
  { value: "beauty", label: "Beauty & Makeup" },
];

export const redemptionOptions = [
  {value:'UPI', label: "UPI"}, 
  {value:'BANK', label: "BANK"}
]

export const documentOption = [
  { value: "AADHAAR", label: "Aadhaar" },
  { value: "VOTERID", label: "Voter ID" },
  { value: "DRIVINGLICENSE", label: "Driving Licence" },
];

export const bankDetailOption = [
  { value: "viaBank", label: "Via Bank" },
  { value: "viaUpi", label: "Via UPI" },
];

export const socialPlatformOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "youtube", label: "YouTube" },
  { value: "tiktok", label: "TikTok" },
  { value: "twitter", label: "Twitter" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "facebook", label: "Facebook" },
];

export const INITIAL_VALUES = {
      "influencer_type_name": "",
      "name": "",
      "email": "",
      "mobile": "",
      "country": "",
      "state": "",
      "district": "",
      "city": "",
      "area": "",
      "pincode": "",
      "address": "",
      "kyc_document_type": "",
      "document_no": "",
      "pan_no": "",
      "user_redeemption_prefrence": ""
    }