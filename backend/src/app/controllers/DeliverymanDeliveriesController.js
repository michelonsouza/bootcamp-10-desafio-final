import * as Yup from 'yup';
import { startOfDay, endOfDay, parseISO, isAfter } from 'date-fns';
import { Op } from 'sequelize';

import Order from '../models/Order';
import Recipient from '../models/Recipient';
import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import { deliveryValidator, itsWorkTime } from '../../utils/validators';

class DeliverymanDeliveries {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, limit = 20, delivered } = req.query;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.format(
        { type: 'notfound', erros: ['Delivery man not found'] },
        404
      );
    }

    const filter =
      delivered === 'true'
        ? {
            end_date: {
              [Op.ne]: null,
            },
          }
        : {
            deliveryman_id: id,
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

    return res.format({ ...deliveries, page, limit });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date().required(),
    });

    await schema
      .validate(req.body)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const { id, deliveryId } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.format(
        { type: 'notfound', erros: ['Delivery man not found'] },
        404
      );
    }

    const { count: deliveryCount } = await Order.findAndCountAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (deliveryCount === 5) {
      return res.format(
        {
          type: 'unauthorized',
          errors: ['The delivery man can only make 5 deliveries'],
        },
        401
      );
    }

    const delivery = await Order.findOne({
      where: { id: deliveryId },
      attributes: ['id', 'product', 'start_date', 'end_date', 'canceled_at'],
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
      return res.format(invalid.data, invalid.status);
    }

    if (!itsWorkTime(req.body.start_date)) {
      return res.format(
        {
          type: 'unauthorized',
          errors: [
            'It is only allowed to start a delivery between 08:00 and 18:00 hours',
          ],
        },
        401
      );
    }
    if (isAfter(parseISO(req.body.start_date), new Date())) {
      return res.format(
        {
          type: 'validation',
          errors: ['The start date cannot be later than now'],
        },
        400
      );
    }

    await delivery.update(req.body);

    return res.format(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number().required(),
      end_date: Yup.date().required(),
    });

    await schema
      .validate(req.body)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

    const { id, deliveryId } = req.params;

    const deliveryManExists = await DeliveryMan.findByPk(id);

    if (!deliveryManExists) {
      return res.format(
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
      return res.format(invalid.data, invalid.status);
    }

    if (isAfter(parseISO(req.body.end_date), new Date())) {
      return res.format(
        {
          type: 'validation',
          errors: ['The end date cannot be later than now'],
        },
        400
      );
    }

    await delivery.update(req.body);

    return res.format(delivery);
  }
}

export default new DeliverymanDeliveries();
