const userRouter = require('express').Router();
const { getMe, updateUserProfile } = require('../controllers/user');
const { validationUpdateUserProfile } = require('../middlewares/validation');

userRouter.get('/me', getMe);
// userRouter.patch('/me', validationUpdateUserProfile, updateUserProfile);
userRouter.patch('/me', updateUserProfile);
module.exports = userRouter;
