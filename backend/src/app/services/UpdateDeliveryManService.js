import DeliveryMan from '../models/DeliveryMan';
import File from '../models/File';

import Cache from '../../lib/Cache';

class UpdateDeliveryManService {
  async run({ deliveryman_id, data }) {
    const deliveryMan = await DeliveryMan.findByPk(deliveryman_id, {
      attributes: ['id', 'name', 'email'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['id', 'path', 'url'],
        },
      ],
    });

    if (!deliveryMan) {
      throw new ResponseError('delivery not found', 404);
    }

    const { email } = data;

    if (email !== deliveryMan.email) {
      const deliveryExists = await DeliveryMan.findOne({ where: { email } });

      if (deliveryExists) {
        throw new ResponseError('Delivery already exists', 401);
      }
    }

    const { id, name, avatar } = await deliveryMan.update(data);

    await Cache.invalidate('deliverymans:index');
    return { id, name, email, avatar };
  }
}

export default new UpdateDeliveryManService();
