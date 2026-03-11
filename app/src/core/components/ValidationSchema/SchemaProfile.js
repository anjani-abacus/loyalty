
import * as Yup from 'yup';

export const phoneSchema = Yup.object().shape({
  phoneNumber: Yup.string().matches(/^[6-9][0-9]{0,9}$/, 'Invalid Mobile No.'),
});

export const validationSchema = Yup.object().shape({
  otp: Yup.string().matches(/^\d+$/, 'Only Numbers Are Allowed!'),
});

export const editProfileSchema = Yup.object().shape({
  mobile_no: Yup.string().min(10, 'Minimum 10 Digits').max(10, 'Maximum 10 Digits').required('This Field Is Required').matches(/^[0-9]+$/, 'Must Be Only Digits'),
  // company_name: Yup.string().required('This Field Is Required'),
  name: Yup.string().min(3, 'Minimum 3 Words').required('This Field Is Required'),
  email: Yup.string().email('Email Is Invalid'),
  dob: Yup.string().required('This Field Is Required'),
  doa: Yup.string(),
  dealer_name: Yup.string().matches(/^\S/, 'First character cannot be a space').matches(/^[A-Za-z ]+$/, 'Only Alphabets Are Allowed'),
  dealer_mobile: Yup.string().length(10, 'Mobile no. must be 10 digits').matches(/^[6-9][0-9]{0,9}$/, 'Invalid Mobile No.'),
  distributor_name: Yup.string().matches(/^\S/, 'First character cannot be a space').matches(/^[A-Za-z ]+$/, 'Only Alphabets Are Allowed'),

  // type: Yup.string().required('This Field Is Required'),
  address: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This Field Is Required'),
  pincode: Yup.string().min(6, 'Minimum 6 Digits Required').matches(/^[0-9]+$/, 'Must be only digits').required('This Field Is Required'),
  state: Yup.string().required('This Field Is Required'),
  district: Yup.string().required('This Field Is Required'),
  document_type: Yup.string().required('This Field Is Required'),
  pan_no: Yup.string()
    .transform((value) => (value ? value.toUpperCase() : value))
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN number')
    .required('PAN number is required'),
  user_redeemption_prefrence: Yup.string().required('This Field Is Required'),
  document_no: Yup.string().when('document_type', (document_type, schema) => {
    return document_type == 'Voter Card' ?
      schema.length(10, 'Voter Card Number must be exactly 10 digits').matches(/^[A-Z]{3}[0-9]{7}$/, 'Invalid Voter Card Number').required('This Field Is Required')
      :
      (document_type == 'AADHAAR' || document_type == 'AADHAAR') ? schema.length(12, 'Aadhaar number must be exactly 12 digits').matches(/^[0-9]+$/, 'Must Be Digits Only').required('This Field Is Required') :
        document_type == 'Driving Licence' ? schema.length(15, 'Driving licence number must be exactly 15 characters').matches(/^[A-Z]{2}[0-9]{13}$/, 'Invalid Driving Licence Number').required('This Field Is Required') : schema;
  }).required('This Field Is Required'),
  bank_name: Yup.string().matches(/^\S/, 'First character cannot be a space').matches(/^[A-Za-z ]+$/, 'Only Alphabets Are Allowed').when('user_redeemption_prefrence', (user_redeemption_prefrence, schema) => {
    return user_redeemption_prefrence == 'Bank' ? schema.required('This Field Is Required') : schema;
  }),
  account_holder_name: Yup.string().matches(/^\S/, 'First character cannot be a space').matches(/^[A-Za-z ]+$/, 'Only Alphabets Are Allowed').when('user_redeemption_prefrence', (user_redeemption_prefrence, schema) => {
    return user_redeemption_prefrence == 'Bank' ? schema.required('This Field Is Required') : schema;
  }),
  account_no: Yup.string().min(9, 'Minimum 9 Digits').when('user_redeemption_prefrence', (user_redeemption_prefrence, schema) => {
    return user_redeemption_prefrence == 'Bank' ? schema.required('This Field Is Required') : schema;
  }),
  ifsc_code: Yup.string().min(11, 'Minimum 11 Digits').matches(/^[A-Z]{4}[0][A-Z0-9]{6}$/, 'Invalid IFSC Code').when('user_redeemption_prefrence', (user_redeemption_prefrence, schema) => {
    return user_redeemption_prefrence == 'Bank' ? schema.required('This Field Is Required') : schema;
  }),
  upi_id: Yup.string().matches(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+$/, 'Invalid UPI').when('user_redeemption_prefrence', (user_redeemption_prefrence, schema) => {
    return user_redeemption_prefrence != 'Bank' ? schema.required('This Field Is Required') : schema;
  }),
});

export const SiteAddValidation = Yup.object().shape({
  type: Yup.string().required('This field is required'),
  lead_source: Yup.string().matches(/^\S/, 'First character cannot be a space'),
  priority: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  ownerName: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  contact_person: Yup.string().matches(/^\S/, 'First character cannot be a space'),
  address: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  pincode: Yup.string().min(6, 'Minimum 6 Digits').max(6, 'Maximum 6 Digits').matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  state: Yup.string().required('This field is required'),
  district: Yup.string().required('This field is required'),
  city: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  assigned_to_distributor: Yup.string().required('This field is required'),
  assigned_to_dealer: Yup.string(),

  ownerMobile: Yup.string().min(10, 'Minimum 10 Digits').max(10, 'Maximum 10 Digits').required('This field is required').matches(/^[6-9][0-9]{0,9}$/, 'Must Be Only Digits'),
  contact_person_mobile: Yup.string().min(10, 'Minimum 10 Digits').max(10, 'Maximum 10 Digits').matches(/^[6-9][0-9]{0,9}$/, 'Must Be Only Digits'),
});

export const registrationInitialValues = {
  'basicInfo': {
    'mobileNumber': '',
    'userName': '',
    'userType': '',
    'referralCode': '',
    'dateOfBirth': '',
    'emailId': '',
    'addressInfo': {
      'country': '',
      'address': '',
      'pincode': '',
      'stateName': '',
      'districtName': '',
      'city': '',
      'area': '',
      'country': '',
    },
  },
  'otherDetail': {
    'dealerDetail': {
      'name': '',
      'mobile': '',
      'distributerName': '',
    },
  },
  'documentDetails': {
    'documentNo': 'string',
    'documentType': '',
    'documentImage': '',
    'documentImageBack': '',
    'panNo': '',
    'panImage': '',
  },
};

// export const createUserSchema = Yup.object().shape({
//   basicInfo: Yup.object().shape({
//     mobileNumber: Yup.string()
//       .required("Mobile number is required")
//       .matches(/^(\+91)?[0-9]{10}$/, "Invalid mobile number"),
//     userType: Yup.string().required("User type is required"),
//     userName: Yup.string().required("User name is required"),
//     // referralCode: Yup.string().nullable(),
//     dateOfBirth: Yup.date()
//       .nullable()
//       .typeError("Date of Birth must be a valid date"),
//     emailId: Yup.string()
//       .email("Invalid email format")
//       .required("Email is required"),
//     addressInfo: Yup.object().shape({
//       address: Yup.string().required("Address is required"),
//       pincode: Yup.string()
//         .matches(/^[0-9]{6}$/, "Pincode must be 6 digits")
//         .required("Pincode is required"),
//       stateName: Yup.string().required("State is required"),
//       districtName: Yup.string().required("District is required"),
//       city: Yup.string().required("City is required"),
//       area: Yup.string().required("Area is required"),
//       // country: Yup.string().required("Country is required"),
//     }),
//   }),
//   dealerDetails: Yup.object().shape({
//     dealerName: Yup.string(),
//     dealerMobile: Yup.string()
//       .matches(/^[0-9]{10}$/, "Dealer mobile must be 10 digits"),
//     distributorName: Yup.string(),
//   }),
//   referralCode: Yup.string().nullable(),
// });

export const createUserSchema = Yup.object().shape({
  basicInfo: Yup.object().shape({
    mobile: Yup.string()
      .matches(/^[6-9][0-9]{9}$/, 'Mobile number must be 10 digits and start with 6-9')
      .required('Mobile number is required'),

    influencer_type_name: Yup.string()
      .required('User type is required')
      .matches(/^[A-Za-z\s]+$/, 'User type must only contain alphabets and spaces'),

    name: Yup.string()
      .min(2, 'User name must be at least 2 characters')
      .max(50, 'User name cannot exceed 50 characters')
      .matches(/^[A-Za-z\s]+$/, 'User name must only contain alphabets and spaces')
      .required('User name is required'),

    birth_date: Yup.date()
      .required('Date of birth is required')
      .typeError('Date of Birth must be a valid date')
      .max(new Date(), 'Birth date cannot be in the future')
      .test(
        'age-limit',
        'You must be at least 18 years old',
        function (value) {
          if (!value) {return true;}
          const today = new Date();
          const age = today.getFullYear() - value.getFullYear();
          return age >= 18;
        }
      )
      .transform((value, originalValue) => (originalValue === '' ? null : value)),

    // email: Yup.string()
    //   .email("Invalid email format")
    //   .required("Email is required")
    //   .transform((value, originalValue) => (originalValue === "" ? undefined : value)),

    addressInfo: Yup.object().shape({
      country: Yup.string()
        .required('Country is required')
        .matches(/^[A-Za-z\s]+$/, 'Country must only contain alphabets'),

      pincode: Yup.string()
        .matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits')
        .required('Pincode is required'),

      state: Yup.string()
        .required('State is required')
        .matches(/^[A-Za-z\s]+$/, 'State must only contain alphabets'),

      district: Yup.string()
        .required('District is required')
        .matches(/^[A-Za-z\s]+$/, 'District must only contain alphabets'),

      city: Yup.string()
        .required('City is required')
        .matches(/^[A-Za-z\s]+$/, 'City must only contain alphabets'),

      area: Yup.string()
        .required('Area is required')
        .max(100, 'Area must not exceed 100 characters'),
    }).required('Address info is required'),
  }).required('Basic info is required'),

  // dealerDetails: Yup.object().shape({
  //   dealer_code: Yup.string()
  //     .nullable()
  //     .min(2, "Dealer code must be at least 2 characters")
  //     .max(50, "Dealer code cannot exceed 50 characters"),

  //   dealer_name: Yup.string()
  //     .nullable()
  //     .matches(/^[A-Za-z\s]+$/, "Dealer name must only contain alphabets and spaces")
  //     .min(2, "Dealer name must be at least 2 characters")
  //     .max(50, "Dealer name cannot exceed 50 characters")
  //   ,

  //   dealer_mobile: Yup.string()
  //     .nullable()
  //     .matches(/^[6-9][0-9]{9}$/, "Dealer mobile must be a valid 10-digit number starting with 6-9")
  //     .required("Dealer mobile number is required"),
  // }),

  documentDetails: Yup.object().shape({
    kyc_document_type: Yup.string().required('Document type is required'),
    document_no: Yup.string().when('kyc_document_type', (kyc_document_type, schema) => {
      return kyc_document_type == 'Voter Card' ?
        schema.length(10, 'Voter Card Number must be exactly 10 digits').matches(/^[A-Z]{3}[0-9]{7}$/, 'Invalid Voter Card Number').required('This Field Is Required')
        :
        (kyc_document_type == 'AADHAAR') ? schema.length(12, 'Aadhaar number must be exactly 12 digits').matches(/^[0-9]+$/, 'Must Be Digits Only').required('This Field Is Required') :
          kyc_document_type == 'Driving Licence' ? schema.length(15, 'Driving licence number must be exactly 15 characters').matches(/^[A-Z]{2}[0-9]{13}$/, 'Invalid Driving Licence Number').required('This Field Is Required') : schema;
    }).required('This Field Is Required'),

    // document_img_front: Yup.notRequired(),
    // document_img_back: Yup.notRequired(),

    // pan_no: Yup.string()
    //   .transform((value) => (value ? value.toUpperCase() : value))
    //   .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
    //   .required("PAN number is required"),

    // document_pan_img: Yup.notRequired(),
  }),

  referral_code: Yup.string()
    .nullable()
    .matches(/^[A-Za-z0-9\s-]*$/, 'Referral code can only contain letters, numbers, spaces, and hyphens'),
});



export const updateUserSchema = (updateType) => Yup.object().shape({
  ...(updateType == 'BasicInformation' && {
    basicInfo: Yup.object().shape({
      mobile: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, 'Mobile number must be 10 digits and start with 6-9')
        .required('Mobile number is required'),

      influencer_type_name: Yup.string()
        .required('Influencer type is required')
        .matches(/^[A-Za-z\s]+$/, 'Only alphabets are allowed in influencer type'),

      name: Yup.string()
        .required('Name is required')
        .matches(/^[A-Za-z\s]+$/, 'Name can only contain alphabets and spaces')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must be at most 50 characters'),

      referral_code: Yup.string()
        .nullable()
        .matches(/^[A-Za-z0-9\s-]*$/, 'Referral code can only contain letters, numbers, spaces, and hyphens'),

      birth_date: Yup.date()
        .nullable()
        .typeError('Birth date must be a valid date')
        .max(new Date(), 'Birth date cannot be in the future')
        .test(
          'age-limit',
          'You must be at least 18 years old',
          function (value) {
            if (!value) {return true;}
            const today = new Date();
            const age = today.getFullYear() - value.getFullYear();
            return age >= 18;
          }
        ),

      // email: Yup.string()
      //   .email("Invalid email format")
      //   .required("Email is required"),

      addressInfo: Yup.object().shape({
        country: Yup.string()
          .required('Country is required')
          .matches(/^[A-Za-z\s]+$/, 'Country can only contain alphabets'),

        pincode: Yup.string()
          .matches(/^[0-9]{6}$/, 'Pincode must be 6 digits')
          .required('Pincode is required'),

        state: Yup.string()
          .required('State is required')
          .matches(/^[A-Za-z\s]+$/, 'State can only contain alphabets'),

        district: Yup.string()
          .required('District is required')
          .matches(/^[A-Za-z\s]+$/, 'District can only contain alphabets'),

        city: Yup.string()
          .required('City is required')
          .matches(/^[A-Za-z\s]+$/, 'City can only contain alphabets'),

        area: Yup.string()
          .required('Area is required')
          .max(100, 'Area must be at most 100 characters'),
      }),
    }),
  }),

  ...(updateType == 'dealerInfo' && {
    dealerDetails: Yup.object().shape({
      dealer_name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, 'Dealer name must only contain alphabets and spaces')
        .min(2, 'Dealer name must be at least 2 characters')
        .max(50, 'Dealer name cannot exceed 50 characters')
        .required('Dealer name is required'),

      dealer_mobile: Yup.string()
        .matches(/^[6-9][0-9]{9}$/, 'Dealer mobile must be a valid 10-digit number starting with 6-9')
        .required('Dealer mobile is required'),

      // distributor_name: Yup.string()
      //   .matches(/^[A-Za-z\s]*$/, "Distributor name must only contain alphabets and spaces")
      //   .max(50, "Distributor name cannot exceed 50 characters")
      //   .nullable(),
    }),
  }),

  ...(updateType == 'documentInfo' && {
    documentDetails: Yup.object().shape({
      kyc_document_type: Yup.string().required('Document type is required'),
      document_no: Yup.string().when('kyc_document_type', (kyc_document_type, schema) => {
        return kyc_document_type == 'Voter Card' ?
          schema.length(10, 'Voter Card Number must be exactly 10 digits').matches(/^[A-Z]{3}[0-9]{7}$/, 'Invalid Voter Card Number').required('This Field Is Required')
          :
          (kyc_document_type == 'AADHAAR' || kyc_document_type == 'AADHAAR') ? schema.length(12, 'Aadhaar number must be exactly 12 digits').matches(/^[0-9]+$/, 'Must Be Digits Only').required('This Field Is Required') :
            kyc_document_type == 'Driving Licence' ? schema.length(15, 'Driving licence number must be exactly 15 characters').matches(/^[A-Z]{2}[0-9]{13}$/, 'Invalid Driving Licence Number').required('This Field Is Required') : schema;
      }).required('This Field Is Required'),

      // document_img_front: Yup.notRequired(),
      // document_img_back: Yup.notRequired(),

      // pan_no: Yup.string()
      //   .transform((value) => (value ? value.toUpperCase() : value))
      //   .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN number")
      //   .required("PAN number is required"),

      // document_pan_img: Yup.notRequired(),
    }),
  }),

  ...(updateType == 'bankInfo' && {
    bankDetails: Yup.object().shape({
      account_holder_name: Yup.string().required('Account holder name is required'),

      account_no: Yup.string()
        .matches(/^[0-9]+$/, 'Account number must be numeric')
        .when('bank_name', {
          is: (val) => !!val, // if bank_name is provided
          then: (schema) => schema.required('Account number is required'),
          otherwise: (schema) => schema.notRequired(),
        }),

      bank_name: Yup.string().when(['upi_id'], {
        is: (upi_id) => !upi_id, // if no UPI ID, bank name becomes required
        then: (schema) => schema.required('Bank name is required'),
        otherwise: (schema) => schema.notRequired(),
      }),

      ifsc_code: Yup.string()
        .matches(/^[A-Z]{4}0[A-Z0-9]{6}$/, 'Invalid IFSC code')
        .required('IFSC code is required'),

      upi_id: Yup.string()
        .matches(/^[\w.-]+@[\w.-]+$/, 'Invalid UPI ID')
        .test(
          'upi-or-bank',
          'UPI ID is required when no bank details are provided',
          function (value) {
            const { bank_name, ifsc_code } = this.parent;
            if (!bank_name && !ifsc_code) {
              return !!value; // require UPI if no bank details
            }
            return true;
          }
        )
        .nullable()
        .notRequired(),
    }),
  }),

  referral_code: Yup.string().nullable(),
});


export const PurchaseRequestAddValidation = Yup.object().shape({

  purchase_from: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  invoice_date: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  invoice_number: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  purchase_from: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  purchase_from_name: Yup.string().matches(/^\S/, 'First character cannot be a space').when('purchase_from', (purchase_from, schema) => {
    return (
      purchase_from != 'Factory' ? schema.required('This field is required') : schema
    );
  }),
  amount: Yup.string().matches(/^[0-9]{0,9}$/, 'Invalid Value').matches(/^\S/, 'First character cannot be a space').required('This field is required'),
  specification: Yup.string().matches(/^\S/, 'First character cannot be a space').required('This field is required'),

});
