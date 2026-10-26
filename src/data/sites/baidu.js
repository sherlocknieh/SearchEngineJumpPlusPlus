/**
 * 百度搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
    hosts: ["www.baidu.com"],
    fixedTop: 80,
    insertIntoDoc: {
      keyword: "css;input#kw",
      target: "css;#wrapper_wrapper",
      where: "afterBegin",
    },
    style: `
      margin-top: 8px;
      z-index: 101;
      margin: 0 var(--container-left-gap);
    `,
    stylish: `
      .headBlock,
      .se_common_hint {
        display: none !important;
      }
      #wrapper > .result-molecule {
        z-index: 300 !important;
      }
    `,
  },
];
