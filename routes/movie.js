const movieRouter = require('express').Router();

const { validationCreateMovie } = require('../middlewares/validation');
const { createMovie, deleteMovie, getMovies } = require('../controllers/movie');

movieRouter.get('/', getMovies);
movieRouter.post('/', validationCreateMovie, createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
