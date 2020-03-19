import { Op } from 'sequelize';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Cache from '../../lib/Cache';

class IndexDeliveryManDeliveriesService {
  async run({ deliveryman_id, delivered, page, limit }) {
    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    const cacheKey = `deliveryman:${deliveryman_id}:deliveries:${page}`;

    const cached = await Cache.get(cacheKey);

    if (cached) {
      return cached;
    }

    if (!deliveryManExists) {
      throw new ResponseError(
        { type: 'notfound', erros: ['Delivery man not found'] },
        404
      );
    }

    const filter =
      delivered === 'true'
        ? {
            deliveryman_id,
            canceled_at: null,
            end_date: {
              [Op.ne]: null,
            },
          }
        : {
            deliveryman_id,
            canceled_at: null,
            end_date: null,
          };

    const deliveries = await Order.findAndCountAll({
      where: filter,
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'created_at',
        'status',
      ],
      offset: (page - 1) * limit,
      limit,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'number',
            'complement',
            'state',
            'city',
            'zipcode',
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
    });

    await Cache.set(cacheKey, deliveries);

    return deliveries;
  }
}

export default new IndexDeliveryManDeliveriesService();
