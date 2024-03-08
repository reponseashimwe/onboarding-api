"use strict";

const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const password = await bcrypt.hash("Pa$$word", 10);

    await queryInterface.bulkInsert("users", [
      {
        name: "Super Admin",
        password,
        email: "root@sudos.rw",
        phone: "0782958807",
        isSuperAdmin: true,
        createdAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users", { isSuperAdmin: true });
  },
};
