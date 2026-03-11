import Joi from 'joi';
import { isValidPhoneNumber, parsePhoneNumber } from 'libphonenumber-js';

const validatePhone = (value, helpers) => {
    let phone = value;

    if (/^\d{10}$/.test(value)) {
        phone = `+91${value}`;
    }

    if (!isValidPhoneNumber(phone, 'IN')) {
        return helpers.message('Phone number is not valid.');
    }
    return value;
};


export const requestOtpSchema = Joi.object({

    phone: Joi.string()
        .custom(validatePhone, 'Phone number validation')
        .required()
        .messages({
            'any.required': 'Phone number is required.',
            'string.base': 'Phone number must be a string.',
        }),
});

export const verifyOtpSchema = Joi.object({

    phone: Joi.string()
        .custom(validatePhone, 'Phone number validation')
        .required()
        .messages({
            'any.required': 'Phone number is required.',
            'string.base': 'Phone number must be a string.',
        }),
    otp: Joi.string()
        .length(6)
        .pattern(/^\d{6}$/)
        .required()
        .messages({
            'string.length': 'OTP must be exactly 6 digits.',
            'string.pattern.base': 'OTP must contain only digits.',
            'any.required': 'OTP is required.',
        }),
    fcm_token: Joi.string().optional().messages({
        'any.required': 'fcmToken is required.',
        'string.base': 'fcmToken must be a string.',
    })
});


export const registrationSchema = Joi.object({
    basicInfo: Joi.object({

        mobile: Joi.string()
            .custom(validatePhone)
            .required()
            .messages({
                'any.required': 'Mobile number is required.',
                'string.empty': 'Mobile number cannot be empty.',
            }),

        influencer_type_name: Joi.string()
            .required()
            .messages({
                'any.only': 'User type must be one of distributor, dealer, or customer.',
                'any.required': 'User type is required.',
            }),

        name: Joi.string()
            .min(2)
            .required()
            .messages({
                'string.min': 'User name must be at least 2 characters.',
                'any.required': 'User name is required.',
                'string.empty': 'User name cannot be empty.',
            }),

        birth_date: Joi.date().iso().optional(),

        // email: Joi.string().email().optional(),

        addressInfo: Joi.object({
            country: Joi.string().optional(),
            pincode: Joi.string().optional(),
            state: Joi.string().required().messages({
                'any.required': 'State is required.',
                'string.empty': 'State cannot be empty.',
            }),
            district: Joi.string().required().messages({
                'any.required': 'District is required.',
                'string.empty': 'District cannot be empty.',
            }),
            city: Joi.string().required().messages({
                'any.required': 'City is required.',
                'string.empty': 'City cannot be empty.',
            }),
            area: Joi.string().required().messages({
                'any.required': 'Area is required.',
                'string.empty': 'Area cannot be empty.',
            }),
        }).required()
    }).required(),

    dealerDetails: Joi.object({
        dealer_id: Joi.number().optional().messages({
            'any.required': 'Dealer ID is required.',
            'Integer.empty': 'Dealer ID cannot be empty.',
        }),
        dealer_code: Joi.string().optional().messages({
            'any.required': 'Dealer code is required.',
            'string.empty': 'Dealer code cannot be empty.',
        }),
        dealer_name: Joi.string().optional().messages({
            'any.required': 'Dealer name is required.',
            'string.empty': 'Dealer name cannot be empty.',
        }),
        dealer_mobile: Joi.string().custom(validatePhone).optional().messages({
            'any.required': 'Dealer mobile number is required.',
            'string.empty': 'Dealer mobile number cannot be empty.',
        }),
        // distributor_name: Joi.string().required().messages({
        //     'any.required': 'Distributor name is required.',
        //     'string.empty': 'Distributor name cannot be empty.',
        // }),
    }).optional().messages({
        'any.required': 'Dealer detail is required.',
    }),
    referral_code: Joi.string().allow('').optional(),
    document_no: Joi.string().allow('').optional()
});


