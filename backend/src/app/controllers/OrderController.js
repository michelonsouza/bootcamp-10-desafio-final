import { isBefore, parseISO } from 'date-fns';
import { Op } from 'sequelize';
import * as Yup from 'yup';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import { deliveryValidator } from '../../utils/validators';
import CancellationMail from '../jobs/CancellationMail';
import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

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

    const recipientExists = await Recipient.findByPk(recipient_id);

    if (!recipientExists) {
      return res.format(
        { type: 'notfound', errors: ['Recipient not found'] },
        404
      );
    }

    const deliveryManExists = await DeliveryMan.findByPk(deliveryman_id);

    if (!deliveryManExists) {
      return res.format(
        {
          type: 'notfound',
          errors: ['Delivery man not found'],
        },
        404
      );
    }

    const { id } = await Order.create(req.body);

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

    return res.format(delivery);
  }

  async update(req, res) {
    const order = await Order.findByPk(req.params.id);

    if (!order) {
      return res.format({ type: 'notfound', erros: ['Order not found'] }, 404);
    }

    const { recipient_id, deliveryman_id, start_date, end_date } = req.body;

    if (recipient_id !== order.recipient_id) {
      const recipientExists = await Recipient.findByPk(recipient_id);

      if (!recipientExists) {
        return res.format(
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
        return res.format({
          type: 'notfound',
          errors: ['Delivery man not found'],
        });
      }
    }

    if (end_date) {
      const isValid = isBefore(parseISO(start_date), parseISO(end_date));

      if (!isValid) {
        return res.format(
          {
            type: 'validation',
            erros: ['End date must be after start date'],
          },
          400
        );
      }
    }

    await order.update(req.body);

    const newOrder = await Order.findByPk(req.params.id, {
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

    return res.format(newOrder);
  }

  async delete(req, res) {
    const delivery = await Order.findOne({
      where: { id: req.params.id },
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
      return res.format(invalid.data, invalid.status);
    }

    delivery.canceled_at = new Date();

    await delivery.save();

    await Queue.add(CancellationMail.key, { delivery });

    return res.format(`Delivery #${delivery.id} successfully canceled`);
  }
}

export default new OrderController();
