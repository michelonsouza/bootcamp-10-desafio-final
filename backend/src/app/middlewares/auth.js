import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.format('Authorization header not provided', 401);
  }

  const [, token] = authorization;

  if (!token) {
    return res.format('Token is not provided', 401);
  }

  try {
    const { id } = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = id;

    return next();
  } catch (error) {
    return res.format('Token invalid', 401);
  }
};
