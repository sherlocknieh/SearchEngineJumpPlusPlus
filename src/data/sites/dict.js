/**
 * 海词插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/dict\.cn\/./,
    hosts: ['dict.cn'],
    insertIntoDoc: {
      keyword: 'css;#q',
      target: 'css;.main',
      where: 'afterBegin',
    },
    style: `
      z-index: 99;
      text-align: center;
    `,
  },
];
