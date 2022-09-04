const jwt = require('jsonwebtoken');
const UnauthtorizedError = require('../utills/errors/UnauthorizedError');
const { JWT_SECRET } = require('../utills/config');

module.exports = (req, res, next) => {
  // тут будет вся авторизация
  const { jwt: token } = req.cookies;
  if (!token) {
    next(new UnauthtorizedError('Вы не авторизированы'));
    return;
  }
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    // отправим ошибку, если не получилось
    next(new UnauthtorizedError('Необходима авторизация'));
    return;
  }

  req.user = payload;
  next();
};
