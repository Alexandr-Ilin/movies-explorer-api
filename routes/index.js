const router = require('express').Router();
const auth = require('../middlewares/auth');
const userRouter = require('./user');
const movieRouter = require('./movie');
const {
  createUser,
  login,
} = require('../controllers/user');

router.post('/signup', createUser);
router.post('/signin', login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

router.post('/signout');

module.exports = router;

// POST /signup создаёт пользователя с переданными в теле данными;
// POST /signin возвращает JWT, если в теле запроса переданы правильные почта и пароль.
// Если вы сохраняете JWT в куках, роут /signout должен удалять
