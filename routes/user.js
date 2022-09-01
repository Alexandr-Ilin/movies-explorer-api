const userRouter = require('express').Router();

const { getMe, updateUserProfile } = require('../controllers/user');

userRouter.get('/me', getMe);
userRouter.patch('/me', updateUserProfile);
module.exports = userRouter;

// # возвращает информацию о пользователе (email и имя)
// GET /users/me

// # обновляет информацию о пользователе (email и имя)
// PATCH /users/me
