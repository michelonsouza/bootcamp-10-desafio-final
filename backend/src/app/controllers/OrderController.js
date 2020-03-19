import { Op } from 'sequelize';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import StoreOrderService from '../services/StoreOrderService';
import UpdateOrderService from '../services/UpdateOrderService';
import DeleteOrderService from '../services/DeleteOrderService';

class OrderController {
  async index(req, res) {
    const { page = 1, limit = 6, q = '' } = req.query;

    const orders = await Order.findAndCountAll({
      where: {
        product: {
          [Op.iLike]: `%${q}%`,
        },
      },
      offset: (page - 1) * limit,
      limit,
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

    return res.format({ ...orders, page, limit });
  }

  async store(req, res) {
    const { recipient_id, deliveryman_id } = req.body;
    let delivery = null;

    try {
      delivery = await StoreOrderService.run({
        recipient_id,
        deliveryman_id,
        data: req.body,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(delivery);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);
    let newOrder = null;

    if (!order) {
      return res.format({ type: 'notfound', erros: ['Order not found'] }, 404);
    }

    const { recipient_id, deliveryman_id } = req.body;

    try {
      newOrder = await UpdateOrderService.run({
        deliveryman_id,
        recipient_id,
        data: req.body,
        order,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(newOrder);
  }

  async delete(req, res) {
    let delivery = null;

    try {
      delivery = await DeleteOrderService.run(req.params.id);
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(`Delivery #${delivery.id} successfully canceled`);
  }
}

export default new OrderController();
