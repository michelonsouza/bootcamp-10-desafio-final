module.exports = {
  up: queryInterface => {
    return queryInterface.bulkInsert(
      'files',
      [
        {
          name: 'fake_avatar.png',
          path: 'fake_avatar.png',
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: 'fake_signature.jpg',
          path: 'fake_signature.jpg',
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: queryInterface => {
    return queryInterface.bulkDelete('files', null, {});
  },
};
