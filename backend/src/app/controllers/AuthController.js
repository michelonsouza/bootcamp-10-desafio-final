import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

import authConfig from '../../config/auth';

class AuthController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    await schema
      .validate(req.body)
      .catch(errors => res.format(errors.errors, 400));

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
