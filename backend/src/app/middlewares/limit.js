import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_ROOT_PASSWORD,
});

export default new RateLimit({
  store: new RedisStore({
    client,
  }),
  windowMs: 1000 * 60 * 15,
  max: 100,
  message: {
    message: 'Você fez muitas requisições... tente novamente mais tarde...',
  },
});
