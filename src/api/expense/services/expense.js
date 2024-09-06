"use strict";

/**
 * expense service
 */

const { createCoreService } = require("@strapi/strapi").factories;

module.exports = createCoreService("api::expense.expense", ({ strapi }) => ({
  async pieChart(result) {
    const data = result.map((item) => ({
      value: item.total_expense,
      name: item.category_name,
    }));
    let option = {
      title: {
        left: "center",
      },
      tooltip: {
        trigger: "item",
      },
      legend: {
        orient: "vertical",
        left: "right",
      },
      series: [
        {
          name: "مجموع هزینه این دسته بندی",
          type: "pie",
          radius: "50%",
          data: data,
          //  [
          //   { value: 1048, name: 'Search Engine' },
          // //   { value: 735, name: 'Direct' },
          // //   { value: 580, name: 'Email' },
          // //   { value: 484, name: 'Union Ads' },
          // //   { value: 300, name: 'Video Ads' }
          // result.map((item)=>{
          //     {value:item.total_expense,name:item.category_name}
          // })
          // ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
        },
      ],
    };
    return option;
  },
}));
