/**
 * 动漫花园插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword\=/i,
    hosts: ["share.dmhy.org"],
    insertIntoDoc: {
      keyword: "css;#keyword",
      target: "css;.table.clear",
      where: "beforeBegin",
    },
    style: `
      text-align: center;
    `,
  },
];
