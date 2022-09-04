const movieRouter = require('express').Router();

const { validationCreateMovie, validationDeleteMovie } = require('../middlewares/validation');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movie');

movieRouter.get('/', getMovies);
movieRouter.post('/', validationCreateMovie, createMovie);
movieRouter.delete('/:movieId', validationDeleteMovie, deleteMovie);

module.exports = movieRouter;
