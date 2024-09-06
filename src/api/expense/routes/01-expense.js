module.exports = {
  routes: [
    {
      method: "GET",
      path: "/expense/getAll/:page/:pageSize",
      handler: "expense.getAll",
    },
    {
      method: "POST",
      path: "/expense/chart/:userId",
      handler: "expense.chart",
    },
  ],
};
