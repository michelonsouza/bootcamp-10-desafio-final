import Sequelize, { Model } from 'sequelize';

class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = 'pending';

            if (this.start_date && !this.canceled_at && !this.end_date) {
              status = 'withdrawal';
            }

            if (this.start_date && this.end_date && !this.canceled_at) {
              status = 'delivered';
            }

            if (this.canceled_at) {
              status = 'canceled';
            }

            return status;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      key: 'id',
      as: 'recipient',
    });

    this.belongsTo(models.DeliveryMan, {
      foreignKey: 'deliveryman_id',
      key: 'id',
      as: 'deliveryman',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      key: 'id',
      as: 'signature',
    });
  }
}

export default Order;
