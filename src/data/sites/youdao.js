/**
 * 有道翻译插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/dict\.youdao\.com\/search/i,
    hosts: ["dict.youdao.com"],
    fixedTop: 94,
    insertIntoDoc: {
      keyword: "css;#query",
      target: "css;#container",
      where: "beforeBegin",
    },
    style: `
      margin: auto;
    `,
  },
];
