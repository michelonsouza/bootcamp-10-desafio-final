import * as Yup from 'yup';

import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

class AuthDeliveryManController {
  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    await schema
      .validate(req.body)
      .catch(({ errors }) => res.format({ type: 'validation', errors }, 400));

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
