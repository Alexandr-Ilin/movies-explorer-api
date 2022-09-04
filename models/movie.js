const mongoose = require('mongoose');
const validator = require('validator');
const { SCHEMA_VALIDATION_REQUIRED, SCHEMA_VALIDATION_URL } = require('../utills/consts');

const userSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  director: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  duration: {
    type: Number,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  year: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  description: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  image: {
    required: [true, SCHEMA_VALIDATION_REQUIRED],
    type: String,

    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
    },
  },

  trailerLink: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
    },
  },

  thumbnail: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
    validate: {
      validator: (v) => validator.isURL(v),
      message: SCHEMA_VALIDATION_URL,
    },
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },
  // id фильма, который содержится в ответе сервиса MoviesExplorer
  movieId: {
    type: Number,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  nameRU: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

  nameEN: {
    type: String,
    required: [true, SCHEMA_VALIDATION_REQUIRED],
  },

}, { versionKey: false });

module.exports = mongoose.model('movie', userSchema);
