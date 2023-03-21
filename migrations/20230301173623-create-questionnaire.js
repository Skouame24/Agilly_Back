'use strict';

const { INTEGER } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Questionnaires', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      inputTypes: {
        type: Sequelize.STRING
      },
      label: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      formId: { 
        type: INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "Forms",
          },
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Questionnaires');
  }
};