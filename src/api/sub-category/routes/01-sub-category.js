module.exports = {
  routes: [
    {
      method: "GET",
      path: "/sub-category/getAll/:catId",
      handler: "sub-category.getAll",
    },
  ],
};
