const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthtorizedError = require('../utills/errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Поле {PATH} обязательно.'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: 'Формат почты не верен',
    },
  },

  password: {
    type: String,
    required: [true, 'Поле {PATH} обязательно.'],
    select: false,
  },

  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
  },

}, { versionKey: false });

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password') // this — это модель User
    .then((user) => {
      if (!user) {
        throw new UnauthtorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthtorizedError('Неправильные почта или пароль');
          }

          return user; // теперь user доступен
        });
    });
};

module.exports = mongoose.model('user', userSchema);
