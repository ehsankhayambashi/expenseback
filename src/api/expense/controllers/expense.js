"use strict";

/**
 * expense controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::expense.expense", ({ strapi }) => ({
  getAll: async (ctx, next) => {
    const userId = ctx.state.user.id;

    // Retrieve pagination parameters from the query string, with defaults
    const { page = "1", pageSize = "10" } = ctx.params;
    // Convert page and pageSize to numbers
    const pageNumber = Number(page);
    const pageSizeNumber = Number(pageSize);

    // Calculate the offset index
    const offset = (pageNumber - 1) * pageSizeNumber;

    // Perform the query with pagination
    const [data, total] = await Promise.all([
      strapi.db.query("api::expense.expense").findMany({
        populate: {
          category: true,
          sub_category: true,
        },
        where: {
          users_permissions_user: {
            id: userId,
          },
        },
        offset: offset,
        limit: pageSizeNumber,
        orderBy: [{ createdAt: "desc" }],
      }),
      strapi.db.query("api::expense.expense").count({
        where: {
          users_permissions_user: {
            id: userId,
          },
        },
      }),
    ]);

    // Return the data along with pagination meta information
    return {
      data,
      meta: {
        pagination: {
          page: pageNumber,
          pageSize: pageSizeNumber,
          pageCount: Math.ceil(total / pageSizeNumber),
          total,
        },
      },
    };
  },
  chart: async (ctx, next) => {
    //@ts-ignore
    let { type, startDate, endDate } = ctx.request.body;
    const { userId } = ctx.params;
    // Execute the SQL query with the user ID
    // const result = await strapi.db.connection.raw(
    //   `
    //   SELECT
    //       c.id AS category_id,
    //       c.name AS category_name,
    //       SUM(e.price) AS total_expense
    //   FROM expenses e
    //   JOIN expenses_category_links ecl ON e.id = ecl.expense_id
    //   JOIN categories c ON ecl.category_id = c.id
    //   JOIN expenses_users_permissions_user_links eul ON e.id = eul.expense_id
    //   WHERE eul.user_id = ?
    //   GROUP BY c.id, c.name;
    // `,
    //   [userId]
    // ); // Pass userId as a parameter to the query to prevent SQL injection

    // Base SQL query
    let query = `
    SELECT 
        c.id AS category_id,
        c.name AS category_name,
        SUM(e.price) AS total_expense
    FROM expenses e
    JOIN expenses_category_links ecl ON e.id = ecl.expense_id
    JOIN categories c ON ecl.category_id = c.id
    JOIN expenses_users_permissions_user_links eul ON e.id = eul.expense_id
    WHERE eul.user_id = ?
  `;

    // Query parameters array
    const queryParams = [userId];
    let start_date = startDate;
    let end_date = endDate;
    // let start_date = "2024-08-22";
    // let end_date = "2024-09-21";
    // Add date filter if both start_date and end_date are provided
    if (start_date != "null" && end_date != "null") {
      query += ` AND e.date BETWEEN ? AND ?`;
      queryParams.push(start_date, end_date);
    }
    // Add grouping clause
    query += ` GROUP BY c.id, c.name;`;

    const result = await strapi.db.connection.raw(query, queryParams);

    const option = await strapi
      .service("api::expense.expense")
      .pieChart(result);
    ctx.send(option);
  },
}));
