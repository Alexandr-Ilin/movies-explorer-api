const { INTERNAL_SERVER_ERROR_STATUS, SERVER_ERROR } = require('../utills/consts');

const handleError = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = INTERNAL_SERVER_ERROR_STATUS, message } = err;
  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === INTERNAL_SERVER_ERROR_STATUS
        ? SERVER_ERROR
        : message,
    });
  next();
};

module.exports = handleError;
