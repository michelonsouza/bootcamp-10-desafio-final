import IndexOrdersWithProblems from '../services/IndexOrdersWithProblems';

class OrdersWithProblemsController {
  async index(req, res) {
    const { page = 1, limit = 6 } = req.query;

    const orders = await IndexOrdersWithProblems({ page, limit });

    return res.format({ ...orders, page, limit });
  }
}

export default new OrdersWithProblemsController();
