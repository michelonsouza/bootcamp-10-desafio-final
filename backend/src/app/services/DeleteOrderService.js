import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';

import { deliveryValidator } from '../../utils/validators';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeleteOrderService {
  async run({ id }) {
    const delivery = await Order.findOne({
      where: { id },
      attributes: [
        'id',
        'product',
        'canceled_at',
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
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
        },
      ],
    });

    const invalid = deliveryValidator(delivery, ['canceled_at', 'end_date']);

    if (invalid) {
      throw new ResponseError(invalid.data, invalid.status);
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(CancellationMail.key, { delivery });

    return delivery;
  }
}

export default new DeleteOrderService();
