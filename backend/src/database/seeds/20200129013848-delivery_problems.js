module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'delivery_problems',
      [
        {
          delivery_id: 4,
          description: 'Cliente não encontrado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          delivery_id: 5,
          description: 'Endereço não encontrado',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          delivery_id: 3,
          description: 'Endereço errado',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('delivery_problems', null, {});
  },
};
