import Joi from "joi";

export const addRedeemRequestSchema = Joi.object({
    gift_id: Joi.number().integer().positive().required().messages({
        "number.base": "Gift ID must be a number",
        "number.integer": "Gift ID must be an integer",
        "number.positive": "Gift ID must be greater than 0",
        "any.required": "Gift ID is required",
    }),

    // Common optional fields
    giftPoint: Joi.number().positive().optional(),
    specialInstruction: Joi.string().allow("").optional(),

    // Payment Mode (only for Cash gifts)
    paymentMode: Joi.string()
        .valid("BANK", "UPI")
        .optional()
        .messages({
            "any.only": "Payment Mode must be either BANK or UPI",
        }),

    // --- BANK Fields ---
    account_no: Joi.alternatives().conditional("paymentMode", {
        is: "BANK",
        then: Joi.string().required().messages({
            "any.required": "Account number is required for BANK payment",
        }),
        otherwise: Joi.forbidden(),
    }),
    ifsc_code: Joi.alternatives().conditional("paymentMode", {
        is: "BANK",
        then: Joi.string().required().messages({
            "any.required": "IFSC code is required for BANK payment",
        }),
        otherwise: Joi.forbidden(),
    }),
    bank_name: Joi.alternatives().conditional("paymentMode", {
        is: "BANK",
        then: Joi.string().required().messages({
            "any.required": "Bank name is required for BANK payment",
        }),
        otherwise: Joi.forbidden(),
    }),
    account_holder_name: Joi.alternatives().conditional("paymentMode", {
        is: "BANK",
        then: Joi.string().required().messages({
            "any.required": "Account holder name is required for BANK payment",
        }),
        otherwise: Joi.forbidden(),
    }),

    // --- UPI Fields ---
    upi_id: Joi.alternatives().conditional("paymentMode", {
        is: "UPI",
        then: Joi.string().required().messages({
            "any.required": "UPI ID is required for UPI payment",
        }),
        otherwise: Joi.forbidden(),
    }),

    // --- Gift Fields ---
    shipping_address: Joi.when("paymentMode", {
        is: Joi.exist().not(), // shipping required when it's not a cash payment
        then: Joi.string().required().messages({
            "any.required": "Shipping address is required for Gift type redemption",
        }),
        otherwise: Joi.string().optional(),
    }),
});
