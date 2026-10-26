/**
 * 哔哩哔哩搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/search\.bilibili\.com\/*/,
    hosts: ["search.bilibili.com"],
    fixedTop: 65,
    insertIntoDoc: {
      keyword: function () {
        if (document.querySelector("#search-keyword")) {
          return document.querySelector("#search-keyword").value;
        } else {
          return document.querySelector(".search-input-el").value;
        }
      },
      target: function () {
        if (document.querySelector(".head-contain")) {
          return document.querySelector(".head-contain");
        } else {
          return document.querySelector(".search-input");
        }
      },
      where: "afterEnd",
    },
    style: `
      width: 980px;
      margin: 10px auto 10px;
    `,
  },
];
