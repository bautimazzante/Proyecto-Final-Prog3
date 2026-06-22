'use strict';

const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Seeder} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const passwordHash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
      {
        name: 'Franco',
        email: 'franco@gmail.com',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Juan',
        email: 'juan@gmail.com',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Maria',
        email: 'maria@gmail.com',
        password: passwordHash,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('users', null, {});
  }
};