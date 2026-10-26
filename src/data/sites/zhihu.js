/**
 * 知乎搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
    hosts: ['www.zhihu.com'],
    fixedTop: 52,
    insertIntoDoc: {
      keyword: 'css;.Input',
      target: 'css;.Search-container',
      where: 'beforeBegin',
    },
    style: `
      margin: 10px auto 0px;
      width: 1000px !important;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,
    style_ZhihuChenglinz: `
      margin: 10px auto 0px;
      width: 654px;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,
    stylish: '.TopSearch.Card{margin:30px auto;}',
  },
];
