import IndexDeliverymanDeliveriesService from '../services/IndexDeliverymanDeliveriesService';
import StoreDeliverymanDeliveriesService from '../services/StoreDeliverymanDeliveriesService';
import UpdateDeliverymanDeliveriesService from '../services/UpdateDeliverymanDeliveriesService';

class DeliverymanDeliveries {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, limit = 6, delivered } = req.query;
    let deliveries = null;

    try {
      deliveries = await IndexDeliverymanDeliveriesService.run({
        deliveryman_id: id,
        page,
        delivered,
        limit,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format({ ...deliveries, page, limit });
  }

  async store(req, res) {
    const { id, deliveryId } = req.params;
    let deliveryUpdatted = null;

    try {
      deliveryUpdatted = await StoreDeliverymanDeliveriesService.run({
        deliveryman_id: id,
        deliveryId,
        data: req.body,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(deliveryUpdatted);
  }

  async update(req, res) {
    const { id, deliveryId } = req.params;
    let delivery = null;

    try {
      delivery = await UpdateDeliverymanDeliveriesService.run({
        deliveryman_id: id,
        deliveryId,
        data: req.body,
      });
    } catch ({ data, status }) {
      return res.format(data, status);
    }

    return res.format(delivery);
  }
}

export default new DeliverymanDeliveries();
