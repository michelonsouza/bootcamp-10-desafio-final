import Order from '../models/Order';
import DeliveryMan from '../models/DeliveryMan';
import Recipient from '../models/Recipient';
import File from '../models/File';
import DeliveryProblem from '../models/DeliveryProblem';

class IndexOrdersWithProblems {
  async run({ page, limit }) {
    let problems = await DeliveryProblem.findAll({
      include: [
        {
          model: Order,
          as: 'delivery',
        },
      ],
    });
    problems = problems.map(problem => problem.delivery.id);

    const orders = await Order.findAndCountAll({
      where: {
        id: problems,
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

    return orders;
  }
}

export default new IndexOrdersWithProblems();
