const { addMinutes } = require('date-fns');

module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'orders',
      [
        {
          product: 'Xiaomi MI 9T PRO',
          recipient_id: 1,
          deliveryman_id: 1,
          signature_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'iPhone 11 PRO MAX',
          recipient_id: 2,
          deliveryman_id: 2,
          signature_id: 2,
          start_date: addMinutes(new Date(), 3),
          end_date: addMinutes(new Date(), 4),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'TV Samsung 43"4K',
          recipient_id: 3,
          deliveryman_id: 3,
          start_date: addMinutes(new Date(), 3),
          canceled_at: addMinutes(new Date(), 6),
          signature_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Macbook PRO 16"',
          recipient_id: 4,
          deliveryman_id: 4,
          start_date: addMinutes(new Date(), 3),
          signature_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          product: 'Monitor Samsung Gamer 42" Ultrawide',
          recipient_id: 3,
          deliveryman_id: 3,
          start_date: addMinutes(new Date(), 3),
          signature_id: null,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('orders', null, {});
  },
};
