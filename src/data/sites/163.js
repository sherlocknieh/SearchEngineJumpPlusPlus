/**
 * 网易云音乐搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
    hosts: ['music.163.com'],
    fixedTop: 0,
    insertIntoDoc: {
      keyword: function () {
        return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);
      },
      target: 'css;.m-subnav.m-subnav-up.f-pr.j-tflag',
      where: 'afterEnd',
    },
    style: `
      margin: auto;
      top: 3px;
    `,
  },
];
