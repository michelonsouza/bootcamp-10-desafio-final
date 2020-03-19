import jwt from 'jsonwebtoken';

import User from '../models/User';

import authConfig from '../../config/auth';

class AuthController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.format('User not exists', 401);
    }

    if (!(await user.checkPassword(password))) {
      return res.format('E-mail or password is invalid', 401);
    }

    const { id, name } = user;

    return res.format({
      user: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new AuthController();
