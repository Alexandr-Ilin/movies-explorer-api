const userRouter = require('express').Router();
const { getMe, updateUserProfile } = require('../controllers/user');

userRouter.get('/me', getMe);
userRouter.patch('/me', updateUserProfile);
module.exports = userRouter;
