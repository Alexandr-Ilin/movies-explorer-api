const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  director: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  duration: {
    type: Number,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  year: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  description: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  image: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Формат ссылки не верен',
    },
  },

  trailerLink: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Формат ссылки не верен',
    },
  },

  thumbnail: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Формат ссылки не верен',
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },

  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: String,
    required: true,
  },

  nameRU: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

  nameEN: {
    type: String,
    requaired: [true, 'Поле {PATH} обязательно.'],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', userSchema);

// image — ссылка на постер к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// trailerLink — ссылка на трейлер фильма. Обязательное поле-строка. Запишите её URL-адресом.

// eslint-disable-next-line max-len
// thumbnail — миниатюрное изображение постера к фильму. Обязательное поле-строка. Запишите её URL-адресом.
// owner — _id пользователя, который сохранил фильм. Обязательное поле.
// movieId — id фильма, который содержится в ответе сервиса MoviesExplorer. Обязательное поле.
// nameRU — название фильма на русском языке. Обязательное поле-строка.
// nameEN — название фильма на английском языке. Обязательное поле-строка.
