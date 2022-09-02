const mongoose = require('mongoose');
const validator = require('validator');
const { SCHEMA_VALIDATION_REQUAIRED, SCHEMA_VALIDATION_URL } = require('../utills/consts');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  director: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  duration: {
    type: Number,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  year: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  description: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  image: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
    },
  },

  trailerLink: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
    },
  },

  thumbnail: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
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
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

  nameEN: {
    type: String,
    requaired: [true, SCHEMA_VALIDATION_REQUAIRED],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', userSchema);
