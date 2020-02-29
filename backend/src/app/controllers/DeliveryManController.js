import * as Yup from 'yup';
import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, limit = 6, q = '' } = req.query;

    const deliveryMans = await DeliveryMan.findAndCountAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      attributes: ['id', 'name', 'email'],
      offset: (page - 1) * limit,
      limit,
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.format({ page: Number(page), limit, ...deliveryMans });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    await schema
      .validate(req.body)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const deliveryExists = await DeliveryMan.findOne({
      where: { email: req.body.email },
    });

    if (deliveryExists) {
      return res.format(
        { type: 'unauthorized', errors: ['Delivery man already exists'] },
        401
      );
    }

    const { id } = await DeliveryMan.create(req.body);

    const deliveryMan = await DeliveryMan.findByPk(id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    return res.format(deliveryMan);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    await schema
      .validate(req.body)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const deliveryMan = await DeliveryMan.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryMan) {
      return res.format('delivery not found', 404);
    }

    const { email } = req.body;

    if (email !== deliveryMan.email) {
      const deliveryExists = await DeliveryMan.findOne({ where: { email } });

      if (deliveryExists) {
        return res.format('delivery already exists', 401);
      }
    }

    const { id, name, avatar } = await deliveryMan.update(req.body);

    return res.format({ id, name, email, avatar });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number(),
    });

    await schema
      .validate(req.params)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const deliveryMan = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.format(
        { type: 'notfound', errors: ['Delivery man not found'] },
        404
      );
    }

    await deliveryMan.destroy();

    return res.format(`Delivery man ${deliveryMan.name} successfully deleted`);
  }
}

export default new DeliverymanController();
