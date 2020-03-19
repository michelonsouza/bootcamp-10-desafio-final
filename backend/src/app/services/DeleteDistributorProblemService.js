import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeleteDistributorProblemController {
  async run({ id }) {
    const problem = await DeliveryProblem.findByPk(id);

    if (!problem) {
      throw new ResponseError(
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

    return order;
  }
}

export default new DeleteDistributorProblemController();
