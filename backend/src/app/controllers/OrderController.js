import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class OrderController {
  async index(req, res) {
    const { page = 1, limit = 20 } = req.query;

    const orders = await Order.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes: ['id', 'product', 'canceled_at', 'start_date', 'end_date'],
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

    return res.format(orders);
  }

  async store(req, res) {
    return res.format({ ok: true });
  }

  async update(req, res) {
    return res.format({ ok: true });
  }

  async delete(req, res) {
    return res.format({ ok: true });
  }
}

export default new OrderController();
