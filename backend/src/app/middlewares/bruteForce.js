import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
import Redis from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
  password: process.env.REDIS_ROOT_PASSWORD,
});

const bruteStore = new BruteRedis({ client });

export default new Brute(bruteStore);
