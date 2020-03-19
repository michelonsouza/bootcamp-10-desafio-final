import { Op } from 'sequelize';
import { startOfDay, endOfDay, parseISO, isAfter } from 'date-fns';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';

import Cache from '../../lib/Cache';

import { deliveryValidator, itsWorkTime } from '../../utils/validators';

class StoreDeliveryManDeliveriesService {
  async run({ deliveryman_id, deliveryId, data }) {
    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    const cacheKey = `deliveryman:${deliveryman_id}:deliveries`;

    if (!deliveryManExists) {
      throw new ResponseError(
        { type: 'notfound', erros: ['Delivery man not found'] },
        404
      );
    }

    if (!itsWorkTime(parseISO(data.start_date))) {
      throw new ResponseError(
        {
          type: 'unauthorized',
          errors: [
            'It is only allowed to start a delivery between 08:00 and 18:00 hours',
          ],
        },
        401
      );
    }

    const { count: deliveryCount } = await Order.findAndCountAll({
      where: {
        deliveryman_id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (deliveryCount === 5) {
      throw new ResponseError(
        {
          type: 'unauthorized',
          errors: ['The delivery man can only make 5 deliveries'],
        },
        401
      );
    }

    const delivery = await Order.findOne({
      where: { id: deliveryId },
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'status',
      ],
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
      ],
    });

    const invalid = deliveryValidator(delivery, ['canceled_at', 'start_date']);

    if (invalid) {
      throw new ResponseError(invalid.data, invalid.status);
    }

    if (isAfter(parseISO(data.start_date), new Date())) {
      throw new ResponseError(
        {
          type: 'validation',
          errors: ['The start date cannot be later than now'],
        },
        400
      );
    }

    await delivery.update(data);

    const deliveryUpdatted = await Order.findByPk(deliveryId, {
      attributes: [
        'id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
        'created_at',
        'status',
      ],
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

    await Cache.invalidatePrefix(cacheKey);

    return deliveryUpdatted;
  }
}

export default new StoreDeliveryManDeliveriesService();
