const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const NotFoundError = require('../utills/errors/NotFoundError');
const { createUser, login, signOut } = require('../controllers/user');
const { validationCreateUser, validationLogin } = require('../middlewares/validation');
const { NOT_FOUND_PAGE } = require('../utills/consts');

router.post('/signup', validationCreateUser, createUser);

router.post('/signin', validationLogin, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.get('/signout', signOut);
router.use('*', (req, res, next) => {
  next(new NotFoundError(NOT_FOUND_PAGE));
});

module.exports = router;
// router.post('/signup', validationCreateUser, createUser);
// router.post('/signup', validationCreateUser, createUser);
