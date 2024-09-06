"use strict";

/**
 * category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::category.category",
  ({ strapi }) => ({
    getAll: async (ctx, next) => {
      const data = await strapi.entityService.findMany(
        "api::category.category",
        {
          fields: ["id", "name"],
          sort: { createdAt: "desc" },
        }
      );
      return {
        data,
      };
    },
  })
);
