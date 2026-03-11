import Joi from "joi";

export const sendSpinWinPointsSchema = Joi.object({
    slab_point: Joi.number().positive().precision(2).required().messages({
        "number.base": "Slab point must be a number",
        "number.positive": "Slab point must be greater than 0",
        "any.required": "Slab point is required",
    }),
    spin_id: Joi.number().integer().positive().required().messages({
        "number.base": "Spin ID must be a number",
        "number.integer": "Spin ID must be an integer",
        "number.positive": "Spin ID must be greater than 0",
        "any.required": "Spin ID is required",
    }),
});
