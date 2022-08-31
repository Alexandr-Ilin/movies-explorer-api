const mongoose = require('mongoose');
const validator = require('validator');

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

module.exports = mongoose.model('user', userSchema);
