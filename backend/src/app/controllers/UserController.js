import * as Yup from 'yup';

import User from '../models/User';

class UserController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    await schema
      .validate(req.body)
      .catch(errors => res.format({ errors }, 400));

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.format('User already exists', 401);
    }

    const { id, name, email } = await User.create(req.body);

    return res.format({ id, name, email });
  }
}

export default new UserController();
