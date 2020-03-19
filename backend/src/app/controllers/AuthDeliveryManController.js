import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class AuthDeliveryManController {
  async store(req, res) {
    const { id } = req.body;

    const deliveryman = await DeliveryMan.findByPk(id, {
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['path', 'url'],
        },
      ],
    });

    if (!deliveryman) {
      return res.format(
        { type: 'unauthorized', errors: ['Deliveryman not exists'] },
        401
      );
    }

    return res.format(deliveryman);
  }
}

export default new AuthDeliveryManController();
