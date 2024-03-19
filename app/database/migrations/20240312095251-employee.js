"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "employees",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        fillPercentage: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        userId: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references: {
            model: "users",
            key: "id",
          },
          onDelete: "CASCADE",
          onUpdate: "CASCADE",
        },
        personalDetails: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: {},
        },
        contactDetails: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: {},
        },
        address: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: {},
        },
        educationalBackground: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: false,
          defaultValue: [],
        },
        experience: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: false,
          defaultValue: [],
        },
        socialMediaProfiles: {
          type: Sequelize.ARRAY(Sequelize.JSON),
          allowNull: false,
          defaultValue: [],
        },
        salary: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        skills: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
          defaultValue: [],
        },
        certificates: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
          defaultValue: [],
        },
        languages: {
          type: Sequelize.ARRAY(Sequelize.STRING),
          allowNull: false,
          defaultValue: [],
        },
        bankInfo: {
          type: Sequelize.JSON,
          allowNull: false,
          defaultValue: [],
        },
        startDate: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        createdAt: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      },
      {
        paranoid: true,
      }
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("employees");
  },
};
