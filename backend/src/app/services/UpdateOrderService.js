import { isBefore, parseISO } from 'date-fns';

import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';

class UpdateOrderService {
  async run({ recipient_id, deliveryman_id, data, order }) {
    const { start_date, end_date } = data;

    if (recipient_id !== order.recipient_id) {
      const recipientExists = await Recipient.findByPk(recipient_id);

      if (!recipientExists) {
        throw new ResponseError(
          {
            type: 'notfound',
            errors: ['Recipient not found'],
          },
          404
        );
      }
    }

    if (deliveryman_id !== order.deliveryman_id) {
      const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

      if (!deliveryManExists) {
        throw new ResponseError(
          {
            type: 'notfound',
            errors: ['Delivery man not found'],
          },
          404
        );
      }
    }

    if (end_date) {
      const isValid = isBefore(parseISO(start_date), parseISO(end_date));

      if (!isValid) {
        throw new ResponseError(
          {
            type: 'validation',
            erros: ['End date must be after start date'],
          },
          400
        );
      }
    }

    await order.update(data);

    const newOrder = await Order.findByPk(order.id, {
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
        {
          model: File,
          as: 'signature',
          attributes: ['path', 'url'],
        },
      ],
    });

    return newOrder;
  }
}

export default new UpdateOrderService();
