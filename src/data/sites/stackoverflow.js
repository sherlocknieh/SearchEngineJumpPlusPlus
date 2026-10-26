/**
 * StackOverflow 插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/stackoverflow\.com\/search\?/i,
    hosts: ['stackoverflow.com'],
    fixedTop: 50,
    insertIntoDoc: {
      keyword: 'css; #search > div > input',
      target: 'css;body > div.container',
      where: 'beforeBegin',
    },
    style:
      'width: min(100%, 1264px) !important;position: sticky;top: 50px;z-index:1001;margin:auto',
  },
];
