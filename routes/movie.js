const movieRouter = require('express').Router();

movieRouter.get('/');
movieRouter.patch('/');
movieRouter.delete('/_id');
module.exports = movieRouter;

// GET /movies все сохранённые пользователем фильмы;
// POST /movies создаёт фильм с переданными в теле данными;
// DELETE /movies/_id удаляет сохранённый фильм по _id;
