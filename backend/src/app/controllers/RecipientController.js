import * as Yup from 'yup';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      state: Yup.string()
        .min(2)
        .max(2)
        .required(),
      city: Yup.string().required(),
      zipcode: Yup.string()
        .min(8)
        .max(9)
        .required(),
      complement: Yup.string(),
    });

    await schema
      .validate(req.body, { abortEarly: false })
      .catch(errors => res.format(errors.errors, 400));

    const {
      id,
      name,
      street,
      number,
      state,
      city,
      zipcode,
      complement,
    } = await Recipient.create(req.body);

    return res.format({
      id,
      name,
      street,
      number,
      state,
      city,
      zipcode,
      complement,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      state: Yup.string()
        .min(2)
        .max(2),
      city: Yup.string(),
      zipcode: Yup.string()
        .min(8)
        .max(9),
      complement: Yup.string(),
    });

    await schema
      .validate(req.body, { abortEarly: false })
      .catch(errors => res.format(errors.errors, 400));

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.format('Recipient not exists', 401);
    }

    const {
      id,
      name,
      street,
      number,
      state,
      city,
      zipcode,
      complement,
    } = await recipient.update(req.body);

    return res.format({
      id,
      name,
      street,
      number,
      state,
      city,
      zipcode,
      complement,
    });
  }
}

export default new RecipientController();
