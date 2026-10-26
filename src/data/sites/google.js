/**
 * Google 搜索页插件
 */
export default [
  {
    enabled: true,
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
    hosts: ["xn--flw351e.ml"],
    hostPattern: /^www\.google(?:\.[a-z]{2,3}){1,2}$/i,
    fixedTop: 56,
    insertIntoDoc: {
      target: "css;#appbar",
      keyword: "css;[name=q]",
      where: "beforeBegin",
    },
    class: "s6JM6d",
    wrapperClass: "YNk70c",
    style: `
      z-index: 100;
      margin: 2px 0 2px;
      grid-column: 2 / -2;
    `,
    stylish:
      "#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset} #sej-container-wrapper{display:grid !important}",
    patches: {
      // 窄屏下占满宽度，并按视口校正跳转条位置
      narrowFullWidth: true,
      constrainToViewport: true,
      // 网格列中的百分比 max-width 会留下较大右边距，改用像素值
      narrowMaxWidthInPixels: true,
      // 搜索框会伸出吸顶头部，改用搜索框实际底边避让
      getFixedHeaderBottom({ bottom, barLeft, barWidth, inputTarget }) {
        const inputEl =
          typeof inputTarget === "function" ? inputTarget() : inputTarget;
        const searchBox =
          inputEl instanceof Element ? inputEl.closest("form") || inputEl : null;
        if (!searchBox) return bottom;

        let insideFixed = false;
        for (
          let node = searchBox;
          node && node !== document.documentElement;
          node = node.parentElement
        ) {
          const pos = getComputedStyle(node).position;
          if (pos === "fixed" || pos === "sticky") {
            insideFixed = true;
            break;
          }
        }

        const rect = searchBox.getBoundingClientRect();
        const overlaps = rect.right > barLeft && rect.left < barLeft + barWidth;
        if (
          insideFixed &&
          overlaps &&
          rect.top < window.innerHeight * 0.5 &&
          rect.bottom > bottom &&
          rect.bottom < window.innerHeight * 0.5
        ) {
          return rect.bottom;
        }
        return bottom;
      },
    },
  },
];
