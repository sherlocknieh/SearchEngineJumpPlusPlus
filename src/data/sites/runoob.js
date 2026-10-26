/**
 * 菜鸟教程插件
 */
export default [
  {
    enabled: true,
    url: /^https?:.*?runoob\.com\//i,
    hostSuffixes: ["runoob.com"],
    insertIntoDoc: {
      keyword: function () {
        var url = window.location.href.substring(
          window.location.href.lastIndexOf("=") + 1
        );
        return decodeURIComponent(url);
      },
      target: "css;.main>.row",
      where: "afterBegin",
    },
    style: `
      border-bottom: 1px solid #E5E5E5;
      border-top: 1px solid #E5E5E5;
      position: relative;
      text-align: center;
      margin: 0 auto 2em;
    `,
  },
];
