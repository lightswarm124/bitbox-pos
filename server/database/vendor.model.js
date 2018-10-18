import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import validator from 'validator';

import { passwordReg } from './vendor.validations';

const VendorSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
    validate: {
      validator(email) {
        return validator.isEmail(email);
      },
      message: '{VALUE} is not a valid email',
    }
  },
  vendorName: {
    type: String,
    unique: true,
    required: [true, 'Store name is required']
  },
  password: {
    type: String,
    unique: false,
    required: [true, 'Password is required'],
    minlength: [8, 'Password needs to be 8 characters or longer'],
    validate: {
      validator(password) {
        return passwordReg.test(password);
      },
      message: '{VALUE} is not a valid password'
    }
  }
});

export default mongoose.model('Vendor', VendorSchema);
