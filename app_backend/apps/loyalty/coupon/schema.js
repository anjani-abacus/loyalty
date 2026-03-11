import Joi from "joi";

export const couponCodeScanSchema = Joi.object({
    coupon_code: Joi.string().trim().required().messages({
        "any.required": "Coupon code is required",
        "string.empty": "Coupon code cannot be empty",
    }),
    is_mobile_manual_scan: Joi.alternatives().try(Joi.number().integer().valid(0, 1), Joi.string().allow("")).optional(),
    lat: Joi.string().optional(),
    lng: Joi.string().optional(),
});
