import Joi from "joi";

export const createAddressValidation = Joi.object({
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(20).required(),
});

export const getAddressValidation = Joi.number()
  .positive()
  .integer()
  .required();

export const updateAddressValidation = Joi.object({
  id: Joi.number().positive().integer().required(),
  street: Joi.string().max(255).optional(),
  city: Joi.string().max(100).optional(),
  state: Joi.string().max(100).optional(),
  country: Joi.string().max(100).required(),
  postal_code: Joi.string().max(20).required(),
});
