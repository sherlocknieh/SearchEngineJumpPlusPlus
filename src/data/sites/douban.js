/**
 * 豆瓣搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/www\.douban\.com\/search/i,
    hosts: ['www.douban.com'],
    insertIntoDoc: {
      keyword:
        'css;#content > div > div.article > div.mod-search > form > fieldset > div.inp > input',
      target: 'css;#content > div > div.article > div.mod-search',
      where: 'afterEnd',
    },
    style: `
      margin: -1em 0 1em 7em;
      position: sticky;
      top: 0.1em;
    `,
  },
];
