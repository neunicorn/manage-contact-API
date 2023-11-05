import Joi from "joi";

export const createContactValidation = Joi.object({
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional(),
  username: Joi.string().max(100).required(),
});

export const updateContactValidation = Joi.object({
  id: Joi.number().positive().integer().required(),
  first_name: Joi.string().max(100).required(),
  last_name: Joi.string().max(100).optional(),
  email: Joi.string().max(200).email().optional(),
  phone: Joi.string().max(20).optional(),
  username: Joi.string().max(100).required(),
});

export const getContactValidation = Joi.number()
  .positive()
  .integer()
  .required();

export const searchContactValidation = Joi.object({
  page: Joi.number().min(1).positive().integer().default(1),
  size: Joi.number().min(1).positive().integer().default(10),
  name: Joi.string().max(100).optional(),
  phone: Joi.string().max(20).optional(),
  email: Joi.string().max(200).email().optional(),
});
