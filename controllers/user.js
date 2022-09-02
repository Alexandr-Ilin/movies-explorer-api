// const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const {
  CREATED_STATUS,
  EMAIL_REGISTERED,
  SUCCESSFUL_AUTHORIZACION,
  NOT_FOUND_USER,
  NON_CORRECT_ID,
  SIGN_OUT,
} = require('../utills/consts');

const ConflictError = require('../utills/errors/ConflictError');
const BadRequestError = require('../utills/errors/BadRequestError');
const NotFoundError = require('../utills/errors/NotFoundError');
const { JWT_SECRET } = require('../utills/config');

const createUser = (req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((data) => {
      const token = jwt.sign({ _id: data._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        .status(CREATED_STATUS)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({
          _id: data._id,
          email: data.email,
          name: data.name,
        });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError(EMAIL_REGISTERED));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(' ')}`));
        return;
      }
      next(err);
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      res
        // .status(OK_STATUS)
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ message: SUCCESSFUL_AUTHORIZACION });
    })
    .catch(next);
};

const getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      next(err);
    });
};

const updateUserProfile = (req, res, next) => {
  const { email, name } = req.body;
  User.findByIdAndUpdate(req.user._id, { email, name }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFoundError({ message: NOT_FOUND_USER }));
        return;
      }
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(NON_CORRECT_ID));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(' ')}`));
        return;
      }

      if (err.code === 11000) {
        next(new ConflictError('EMAIL_REGISTERED'));
        return;
      }
      next(err);
    });
};

const signOut = (req, res) => {
  res.clearCookie('jwt').send({ message: SIGN_OUT });
};

module.exports = {
  createUser,
  login,
  getMe,
  updateUserProfile,
  signOut,
};
