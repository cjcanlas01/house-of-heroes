"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const configs = [
      {
        config: "PO_ACCESS_ROLE",
        value: "poaccess",
      },
      {
        config: "PO_ROLE",
        value: "Protocol Officer",
      },
      {
        config: "QUEUE_CHANNEL",
        value: "title-queue",
      },
      {
        config: "BUFF_CHANNEL",
        value: "buff-requests",
      },
      {
        config: "BANK_ROLE",
        value: "Bank",
      },
      {
        config: "DRAGON_RALLIES",
        value: "DragonRallies",
      },
      {
        config: "CAMP_RALLIES",
        value: "CampRallies",
      },
      {
        config: "BUFF_QUEUE_HEADER",
        value: "TITLE BUFF QUEUE",
      },
      {
        config: "ALLOWED_USERS",
        value: null,
      },
    ];

    return await queryInterface.bulkInsert("Configs", configs, {});
  },

  down: async (queryInterface, Sequelize) => {
    return await queryInterface.bulkDelete("Configs", null, {});
  },
};
