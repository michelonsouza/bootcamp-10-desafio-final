module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'delivery_mans',
      [
        {
          name: 'Mark Zukerberg',
          email: 'mark@facebook.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Bill Gates',
          email: 'bill@microsoft.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Ginni Rometty',
          email: 'ginni@ibm.com',
          avatar_id: 2,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Sundar Pichai',
          email: 'sundar@google.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Dara Khosrowshahi',
          email: 'dara@uber.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Satya Nadella ',
          email: 'satya@microsoft.com',
          avatar_id: 1,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('delivery_mans', null, {});
  },
};
