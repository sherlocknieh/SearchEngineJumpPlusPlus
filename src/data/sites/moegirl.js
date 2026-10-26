/**
 * 萌娘百科插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/.*\.?moegirl\.org\.cn/i,
    hostSuffixes: ["moegirl.org.cn"],
    fixedTop: 52,
    insertIntoDoc: {
      keyword: "css;#firstHeading",
      target: "css;#moe-topbanner-container",
      where: "afterEnd",
    },
    style: `
      margin: -0.8em auto 0;
      z-index: 3;
      width: 1200px !important;
      top: 12px;
    `,
  },
];
