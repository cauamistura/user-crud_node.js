'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: Sequelize.TEXT
      },
      password: {
        type: Sequelize.TEXT
      },
      email: {
        type: Sequelize.TEXT
      },
      phone:{
        type: Sequelize.TEXT
      },
      birthday:{
        type: Sequelize.DATE
      },
      create_att: {
        type: Sequelize.DATE
      },
      update_att: {
        type: Sequelize.DATE
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
