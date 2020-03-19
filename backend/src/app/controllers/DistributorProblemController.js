import DeliveryProblem from '../models/DeliveryProblem';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import Order from '../models/Order';

import DeleteDistributorProblemService from '../services/DeleteDistributorProblemService';

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
    let order = null;

    try {
      order = await DeleteDistributorProblemService.run({ id: req.params.id });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(`Delivery #${order.id} successfully canceled`);
  }
}

export default new DistributorProblemController();
