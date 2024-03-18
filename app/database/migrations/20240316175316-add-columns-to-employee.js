"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("employees", "professionalDetails", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    });

    await queryInterface.addColumn("employees", "documents", {
      type: Sequelize.JSON,
      allowNull: false,
      defaultValue: {},
    });

    await queryInterface.removeColumn("employees", "salary");

    await queryInterface.removeColumn("employees", "startDate");
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("employees", "professionalDetails");
    await queryInterface.removeColumn("employees", "documents");

    await queryInterface.addColumn("employees", "salary", {
      type: Sequelize.INTEGER,
      allowNull: true,
    });

    await queryInterface.addColumn("employees", "startDate", {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },
};
