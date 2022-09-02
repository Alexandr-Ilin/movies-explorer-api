const movieRouter = require('express').Router();

const { createMovie, deleteMovie, getMovies } = require('../controllers/movie');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovie);
movieRouter.delete('/:movieId', deleteMovie);

module.exports = movieRouter;
