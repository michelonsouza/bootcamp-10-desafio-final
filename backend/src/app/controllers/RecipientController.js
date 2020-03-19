import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { page = 1, limit = 20, q = '' } = req.query;

    const recipients = await Recipient.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      offset: (page - 1) * limit,
      limit,
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'state',
        'city',
        'zipcode',
        'complement',
      ],
    });

    return res.format({ ...recipients, page, limit });
  }

  async store(req, res) {
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
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.format(
        { type: 'notfound', errors: ['Recipient not found'] },
        404
      );
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

  async delete(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.format(
        { type: 'notfound', errors: ['Recipient not found'] },
        404
      );
    }

    await recipient.destroy();

    return res.format(`Recipient ${recipient.name} successfull deleted`);
  }
}

export default new RecipientController();
