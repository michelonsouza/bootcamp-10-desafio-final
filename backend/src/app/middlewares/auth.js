import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.format('Authorization header not provided', 401);
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.format('Token is not provided', 401);
  }

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);

    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.format(error, 401);
  }
};
