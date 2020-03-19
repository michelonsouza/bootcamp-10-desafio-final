import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';

import Cache from '../../lib/Cache';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryManProblemController {
  async index(req, res) {
    const cacheKey = `deliveryman:${req.params.id}:problems`;
    const cached = await Cache.get(cacheKey);

    if (cached) {
      return res.format(cached);
    }

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
    });

    await Cache.set(cacheKey, problems);

    return res.format(problems);
  }

  async store(req, res) {
    const { id: delivery_id } = req.params;

    const orderExists = await Order.findByPk(delivery_id, {
      include: [
        {
          model: DeliveryMan,
          as: 'deliveryman',
          attributes: ['id'],
        },
      ],
    });

    if (!orderExists) {
      return res.format({ type: 'notfound', errors: ['Order not found'] }, 404);
    }

    const problem = await DeliveryProblem.create({
      delivery_id,
      description: req.body.description,
    });

    await Cache.invalidatePrefix(
      `deliveryman:${orderExists.deliveryman.id}:problems`
    );

    return res.format(problem);
  }
}

export default new DeliveryManProblemController();
