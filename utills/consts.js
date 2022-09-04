const CREATED_STATUS = 201;
const BAD_REQUEST_STATUS = 400;
const NOT_FOUND_STATUS = 404;
const INTERNAL_SERVER_ERROR_STATUS = 500;

const SCHEMA_VALIDATION_REQUIRED = 'Поле {PATH} обязательно.';
const SCHEMA_VALIDATION_URL = 'Формат ссылки не верен.';
const SCHEMA_VALIDATION_EMAIL = 'Формат почты не верен.';
const UNAUTHORIZED_ERROR_MESSAGE = 'Неправельные почта или пароль.';
const NOT_FOUND_PAGE = 'Страница не найдена.';
const NOT_FOUND_USER = 'Пользователь с таким ID не найден.';
const NOT_FOUND_MOVIE = 'Фильм с таким ID не найден.';
const EMAIL_REGISTERED = 'Пользователь с таким Email уже зарегистрирован.';
const SUCCESSFUL_AUTHORIZACION = 'Вы успешно авторизировались.';
const NON_CORRECT_ID = 'Не корректный ID.';
const SIGN_OUT = 'Вы вышли из аккаунта.';
const SERVER_ERROR = 'На сервере произошла ошибка.';
const FORBIDDEN_ERROR_MOVIE = 'Вы можете удалять только свои фильмы.';
const MOVIE_DELETED = 'Фильм удален';
const RATE_LIMIT = 'Превышен лимит подключений с данного IP-адреса';

module.exports = {
  CREATED_STATUS,
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  SCHEMA_VALIDATION_REQUIRED,
  SCHEMA_VALIDATION_URL,
  SCHEMA_VALIDATION_EMAIL,
  UNAUTHORIZED_ERROR_MESSAGE,
  NOT_FOUND_PAGE,
  EMAIL_REGISTERED,
  SUCCESSFUL_AUTHORIZACION,
  NOT_FOUND_USER,
  NON_CORRECT_ID,
  SIGN_OUT,
  SERVER_ERROR,
  NOT_FOUND_MOVIE,
  FORBIDDEN_ERROR_MOVIE,
  MOVIE_DELETED,
  RATE_LIMIT,
};
