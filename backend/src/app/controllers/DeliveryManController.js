import { Op } from 'sequelize';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import UpdateDeliveryManService from '../services/UpdateDeliveryManService';

import Cache from '../../lib/Cache';

class DeliverymanController {
  async index(req, res) {
    const { page = 1, limit = 6, q = '' } = req.query;

    const cacheKey = 'deliverymans:index';

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.format({ ...cached, page: Number(page), limit });
    }

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

    await Cache.set(cacheKey, { ...deliveryMans, page: Number(page), limit });

    return res.format({ ...deliveryMans, page: Number(page), limit });
  }

  async store(req, res) {
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

    await Cache.invalidate('deliverymans:index');

    return res.format(deliveryMan);
  }

  async update(req, res) {
    let deliveryMan = null;

    try {
      deliveryMan = await UpdateDeliveryManService.run({
        deliveryman_id: req.params.id,
        data: req.body,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(deliveryMan);
  }

  async delete(req, res) {
    const deliveryMan = await DeliveryMan.findByPk(req.params.id);

    if (!deliveryMan) {
      return res.format(
        { type: 'notfound', errors: ['Delivery man not found'] },
        404
      );
    }

    await deliveryMan.destroy();

    await Cache.invalidate('deliverymans:index');

    return res.format(`Delivery man ${deliveryMan.name} successfully deleted`);
  }
}

export default new DeliverymanController();
