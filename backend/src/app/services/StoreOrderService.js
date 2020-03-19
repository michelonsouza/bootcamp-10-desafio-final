import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

class StoreOrderService {
  async run({ recipient_id, deliveryman_id, data }) {
    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      throw new ResponseError(
        { type: 'notfound', errors: ['Recipient not found'] },
        404
      );
    }

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

    const { id } = await Order.create(data);

    const delivery = await Order.findOne({
      where: { id },
      attributes: [
        'id',
        'product',
        'canceled_at',
        'start_date',
        'end_date',
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

    await Queue.add(NewDeliveryMail.key, { delivery });

    return delivery;
  }
}

export default new StoreOrderService();
