import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DistributorProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      include: [
        {
          model: Order,
          as: 'delivery',
          attributes: ['id', 'product', 'start_date', 'canceled_at'],
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
        },
      ],
    });

    return res.format(problems);
  }

  async delete(req, res) {
    const problem = await DeliveryProblem.findByPk(req.params.id);

    if (!problem) {
      return res.format(
        {
          type: 'notfound',
          errors: ['Delivery problem not found'],
        },
        404
      );
    }

    const order = await Order.findOne({
      where: { id: problem.delivery_id },
      include: [
        {
          model: Recipient,
          as: 'recipient',
        },
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    order.canceled_at = new Date();

    await order.save();

    await Queue.add(CancellationMail.key, { delivery: order });

    return res.format(`Delivery #${order.id} successfully canceled`);
  }
}

export default new DistributorProblemController();
