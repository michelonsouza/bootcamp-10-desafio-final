import { parseISO, isAfter } from 'date-fns';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';

import { deliveryValidator } from '../../utils/validators';

import Cache from '../../lib/Cache';

class UpdateDeliveryManDeliveriesService {
  async run({ deliveryman_id, deliveryId, data }) {
    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      throw new ResponseError(
        { type: 'notfound', erros: ['Delivery man not found'] },
        404
      );
    }

    const delivery = await Order.findByPk(deliveryId);

    const invalid = deliveryValidator(delivery, [
      'canceled_at',
      '!start_date',
      'end_date',
    ]);

    if (invalid) {
      throw new ResponseError(invalid.data, invalid.status);
    }

    if (isAfter(parseISO(data.end_date), new Date())) {
      throw new ResponseError(
        {
          type: 'validation',
          errors: ['The end date cannot be later than now'],
        },
        400
      );
    }

    await delivery.update(data);

    await Cache.invalidatePrefix(`deliveryman:${deliveryman_id}:deliveries`);

    return delivery;
  }
}

export default new UpdateDeliveryManDeliveriesService();
