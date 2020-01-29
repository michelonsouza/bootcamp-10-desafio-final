import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import User from '../models/User';

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

    await schema.validate(req.body).catch(errors => res.format(errors, 400));

    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

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
      token: jwt.sign({ id }, process.env.SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }),
    });
  }
}

export default new AuthController();
