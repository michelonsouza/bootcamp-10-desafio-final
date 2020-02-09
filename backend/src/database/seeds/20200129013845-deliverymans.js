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
          name: 'Ryan Dahl',
          email: 'ryan@deno.com',
          avatar_id: 1,
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
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('delivery_mans', null, {});
  },
};
