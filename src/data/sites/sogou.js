/**
 * 搜狗搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
    hosts: ['www.sogou.com'],
    fixedTop: 60,
    insertIntoDoc: {
      keyword: 'css;#upquery',
      target: 'css;#wrapper',
      where: 'afterBegin',
    },
    style: `
      top: -40px;
      z-index: 99;
      left: -5px;
    `,
    stylish: '#float_uphint{display:none;}',
  },
];
