import Joi from 'joi';

export const passwordReg = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

export default {
  signup: {
    email: Joi.string().email().required(),
    vendorName: Joi.string().required(),
    password: Joi.string().regex(passwordReg).required(),
  },
};
