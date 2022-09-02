const Movie = require('../models/movie');

const { CREATED_STATUS } = require('../utills/consts');
const BadRequestError = require('../utills/errors/BadRequestError');
const NotFoundError = require('../utills/errors/NotFoundError');
const ForbiddenError = require('../utills/errors/ForbiddenError');

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner,
  })
    .then((movie) => {
      res.status(CREATED_STATUS).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${Object.values(err.errors).map((error) => error.message).join(' ')}`));
        return;
      }
      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError('Фильм с таким ID не найден.'));
        return;
      }
      if (movie.owner.toString() !== req.user._id) {
        next(new ForbiddenError('Вы можете удалять только свои фильмы'));
        return;
      }
      Movie.findByIdAndDelete(req.params.movieId)
        .then(() => res.send({ message: 'Фильм удален' }))
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Неверный ID фильма'));
        return;
      }
      next(err);
    });
};

const getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      const result = movies.filter((film) => req.user._id === film.owner.toString());
      res.send(result);
    })
    .catch(next);
};

module.exports = { createMovie, deleteMovie, getMovies };
