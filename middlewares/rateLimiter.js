const rateLimit = 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Превышен лимит подключений с данного IP-адреса',
});

module.exports = limiter;
