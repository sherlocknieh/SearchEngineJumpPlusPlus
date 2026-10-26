/**
 * 必应域名插件（网页、图片、词典）
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/[^.]*\.bing\.com\/search/,
    hostSuffixes: ["bing.com"],
    fixedTop: 60,
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_content",
      where: "beforeBegin",
    },
    style: `
      margin: 2px 0 2px;
      left: 160px;
    `,
    patches: {
      // 页面内容容器可能比视口更宽，窄屏下占满宽度并按视口校正位置
      narrowFullWidth: true,
      constrainToViewport: true,
    },
  },
  {
    enabled: true,
    url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
    hostSuffixes: ["bing.com"],
    fixedTop: 88,
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_content",
      where: "afterBegin",
    },
    style: `
      left: 160px;
      margin-top: 15px;
    `,
  },
  {
    enabled: true,
    url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q\=/i,
    hostSuffixes: ["bing.com"],
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_header",
      where: "beforeEnd",
    },
    style: `
      margin-top: 6px;
      left: 148px;
    `,
  },
];
