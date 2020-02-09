module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'recipients',
      [
        {
          name: 'Bruce Dickinson',
          street: 'Avenida Paulista',
          number: 660,
          complement: 'Próximo a estção Brigadeiro do metrô',
          state: 'SP',
          city: 'São Paulo',
          zipcode: '01310100',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'James Hetfield',
          street: 'Rua Vergueiro',
          number: 1211,
          complement: null,
          state: 'SP',
          city: 'São Paulo',
          zipcode: '01504001',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Matthew Evans',
          street: 'Praça Nicola Vivilechio',
          number: 103,
          complement: null,
          state: 'SP',
          city: 'Taboão da Serra',
          zipcode: '06763490',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'Rody Walker',
          street: 'Alameda Jaú',
          number: 616,
          complement: null,
          state: 'SP',
          city: 'São Paulo',
          zipcode: '01420000',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('recipients', null, {});
  },
};
