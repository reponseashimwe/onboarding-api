"use strict";

const bycrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bycrypt.hash("Pa$$word", 10);

    await queryInterface.bulkInsert(
      "users",
      [
        {
          name: "Super Admin",
          password,
          email: "super@admin.rw",
          phone: "0782958807",
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.delete(null, "users", { isSuperAdmin: true });
  },
};
