const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../utills/errors/UnauthorizedError');
const { SCHEMA_VALIDATION_REQUIRED, SCHEMA_VALIDATION_EMAIL, UNAUTHORIZED_ERROR_MESSAGE } = require('../utills/consts');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: SCHEMA_VALIDATION_EMAIL,
    },
  },

  password: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(UNAUTHORIZED_ERROR_MESSAGE);
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
