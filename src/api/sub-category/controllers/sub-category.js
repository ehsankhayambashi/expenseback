"use strict";

/**
 * sub-category controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

// module.exports = createCoreController('api::sub-category.sub-category');

module.exports = createCoreController(
  "api::sub-category.sub-category",
  ({ strapi }) => ({
    getAll: async (ctx, next) => {
      // Retrieve pagination parameters from the query string, with defaults
      const { catId = "1" } = ctx.params;
      // Convert page and pageSize to numbers
      const categoryId = Number(catId);
      const data = await strapi.entityService.findMany(
        "api::sub-category.sub-category",
        {
          fields: ["id", "name"],
          populate: { category: true },
          filters: {
            category: {
              id: categoryId,
            },
          },
          sort: { createdAt: "asc" },
        }
      );
      console.log(categoryId);
      console.log(data);
      return {
        data,
      };
    },
  })
);
