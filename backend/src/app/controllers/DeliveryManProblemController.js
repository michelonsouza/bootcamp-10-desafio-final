import Order from '../models/Order';
import DeliveryProblem from '../models/DeliveryProblem';

class DeliveryManProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
    });

    return res.format(problems);
  }

  async store(req, res) {
    const { id: delivery_id } = req.params;

    const orderExists = await Order.findByPk(delivery_id);

    if (!orderExists) {
      return res.format({ type: 'notfound', errors: ['Order not found'] }, 404);
    }

    const problem = await DeliveryProblem.create({
      delivery_id,
      description: req.body.description,
    });

    return res.format(problem);
  }
}

export default new DeliveryManProblemController();
