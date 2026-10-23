/*
  把搜索引擎工具栏插入到指定网站的规则

  name: 字符串，要加载的网站名称，方便查找
  enabled: 布尔，是否启用
  url: 正则表达式，用于匹配网址
  engineList: 字符串，搜索引擎类型，可选值['web','music','video','image','download','shopping','translate','knowledge','sociality']
  class: 字符串，添加一个class, 用来使用目标网站的样式
  fixedTop: 数字，可选，固定在顶部的高度，单位 px
  style: CSS样式，可选，自定义样式
  style_ZhihuChenglinzhi: CSS样式，可选，自定义样式，兼容知乎排版优化脚本
  insertIntoDoc: 对象，插入文档相关
    target: 字符串，选中插入到原网页时所用的定位元素
      可以使用 xpath 匹配，如: '//*[@id="subform_ctrl"]'
      或者可以使用 css 匹配（需要加上 'css;' 的前缀），如: 'css;#subform_ctrl'
      或传入一个函数并使用返回值来选中，如: () => document.querySelector('#subform_ctrl')
    keyword: 字符串或函数，选中获取搜索框
      可以使用 xpath 选中一个 form input 元素
      或者可以使用 css 选中 input 元素（需要加上 'css;' 的前缀）
      或传入一个函数并使用返回值来选中 input 元素
    where: 字符串，插入到目标元素的位置,可选值['beforeBegin','afterBegin','beforeEnd','afterEnd']
      'beforeBegin'(插入到给定元素的前面)
      'afterBegin'(作为给定元素的第一个子元素)
      'beforeEnd' (作为给定元素的最后一个子元素)
      'afterEnd'(插入到给定元素的后面);
  stylish: CSS样式，可选，修改原网页样式以适应搜索引擎跳转工具栏
*/


// 下面的分类只是为了方便手动查找和编辑，代码实际用到时会全部解包到同一个数组

const webRules = [
  {
    name: "Google",
    enabled: true,
    url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
    engineList: "web",
    class: "s6JM6d",
    wrapperClass: "YNk70c",
    fixedTop: 56,
    style: `
      z-index: 100;
      margin-top:1px;
      margin-bottom:2px;
      grid-column: 2 / -2;
    `,
    insertIntoDoc: {
      target: "css;#appbar",
      keyword: "css;[name=q]",
      where: "beforeBegin",
    },
    stylish:
      "#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset} #sej-container-wrapper{display:grid !important}",
  },
  
  {
    name: "百度",
    url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
    enabled: true,
    engineList: "web",
    fixedTop: 80,
    fixedTop2: 88,
    fixedTopTarget: "css;#wrapper_wrapper",
    fixedTopWhere: "beforeBegin",
    style: `
      margin-top:8px;
      z-index: 101;
      margin: 0 var(--container-left-gap);
    `,
    insertIntoDoc: {
      keyword: "css;input#kw",
      target: "css;#wrapper_wrapper",
      where: "afterBegin",
    },
    stylish: `.headBlock,.se_common_hint{
        display:none !important
      }
      #wrapper>.result-molecule{
        z-index:300 !important
      }
      `,
  },

  {
    name: "必应",
    url: /^https?:\/\/[^.]*\.bing\.com\/search/,
    enabled: true,
    fixedTop: 60,
    engineList: "web",
    style: `
      margin-top:1px;
      margin-bottom:2px;
      left: 160px;
    `,
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_content",
      where: "beforeBegin",
    },
  },
  
  {
    name: "搜狗",
    url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
    enabled: true,
    engineList: "web",
    fixedTop: 60,
    style: `
      top:-46px;
      z-index:99;
      left:-5px;
    `,
    insertIntoDoc: {
      keyword: "css;#upquery",
      target: "css;#wrapper",
      where: "afterBegin",
    },
    stylish: "#float_uphint{display:none;}",
  },

  {
    name: "yandex",
    url: /^https?:\/\/yandex\.(?:com|ru)\/search/i,
    engineList: "web",
    enabled: true,
    fixedTop: 96,
    class: "main__center",
    style: `
    margin:1em 0;
    `,
    insertIntoDoc: {
      keyword: "css;.input__control",
      target: "css;.main__center",
      where: "afterBegin",
    },
    stylish: ".main .main__center{padding-top:0px}",
  },
];
const knowledgeRules = [
  {
    name: "萌娘百科",
    url: /^https?:\/\/.*\.?moegirl\.org\.cn/i,
    engineList: "knowledge",
    enabled: true,
    fixedTop: 52,
    style: `
      margin: -0.8em auto 0;
      z-index: 3;
      width: 1200px !important;
      top: 12px;
    `,
    insertIntoDoc: {
      keyword: "css;#firstHeading",
      target: "css;#moe-topbanner-container",
      where: "afterEnd",
    },
  },

  {
    name: "知乎",
    url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
    engineList: "knowledge",
    enabled: true,
    fixedTop: 52,
    style: `
      margin: 10px auto 0px;
      width:1000px !important;
      z-index:19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);  
    `,
    style_ZhihuChenglinz: `
      margin: 10px auto 0px;
      width:654px;
      z-index:19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);  
    `,
    insertIntoDoc: {
      keyword: "css;.Input",
      target: "css;.Search-container",
      where: "beforeBegin",
    },
    stylish: ".TopSearch.Card{margin:30px auto;}",
  },
  
  {
    name: "StackOverflow",
    url: /^https?:\/\/stackoverflow\.com\/search\?/i,
    enabled: true,
    engineList: "knowledge",
    fixedTop: 50,
    style:
      "width: min(100%, 1264px) !important;position: sticky;top: 50px;z-index:1001;margin:auto",
    insertIntoDoc: {
      keyword: "css; #search > div > input",
      target: "css;body > div.container",
      where: "beforeBegin",
    },
  },
];
const videoRules = [
  
  {
    name: "哔哩哔哩",
    url: /^https?:\/\/search\.bilibili\.com\/*/,
    enabled: true,
    engineList: "video",
    fixedTop: 65,
    style: `
      width:980px;
      margin:10px auto 10px;
    `,
    insertIntoDoc: {
      keyword: function () {
        if (document.querySelector("#search-keyword")) {
          return document.querySelector("#search-keyword").value;
        } else {
          return document.querySelector(".search-input-el").value;
        }
      },
      target: function () {
        if (document.querySelector(".head-contain")) {
          return document.querySelector(".head-contain");
        } else {
          return document.querySelector(".search-input");
        }
      },
      where: "afterEnd",
    },
  },
  
];
const musicRules = [
  {
    name: "一听音乐",
    url: /^https?:\/\/so\.1ting\.com\/song/i,
    enabled: true,
    engineList: "music",
    style: `
      text-align: center;
      border-bottom: 1px solid #13B310;
      border-top: 1px solid #13B310;
      margin:auto;
    `,
    insertIntoDoc: {
      keyword: "css;#keyword",
      target: "css;.nav",
      where: "beforeBegin",
    },
  },
  
  {
    name: "网易云音乐",
    url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
    enabled: true,
    engineList: "music",
    fixedTop: 0,
    style: `
      margin:auto;
      top:3px;
    `,
    insertIntoDoc: {
      keyword: function () {
        return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);
      },
      target: "css;.m-subnav.m-subnav-up.f-pr.j-tflag",
      where: "afterEnd",
    },
  },
];
const imageRules = [
  {
    name: "必应图片",
    url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
    enabled: true,
    fixedTop: 88,
    engineList: "image",
    style: `
      left:160px;
      margin-top:15px;
    `,
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_content",
      where: "afterBegin",
    },
  },
];
const downloadRules = [
  {
    name: "动漫花园",
    url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword\=/i,
    engineList: "download",
    enabled: true,
    style: `
      text-align: center;
    `,
    insertIntoDoc: {
      keyword: "css;#keyword",
      target: "css;.table.clear",
      where: "beforeBegin",
    },
  },
];
const translateRules = [
  
  {
    name: "必应词典",
    url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q\=/i,
    enabled: true,
    engineList: "translate",
    style: `
      margin-top:6px;
      left: 148px;
    `,
    insertIntoDoc: {
      keyword: "css;#sb_form_q",
      target: "css;#b_header",
      where: "beforeEnd",
    },
  },
  {
    name: "有道翻译",
    url: /^https?:\/\/dict\.youdao\.com\/search/i,
    enabled: true,
    engineList: "translate",
    fixedTop: 94,
    style: `
      margin:auto;
    `,
    insertIntoDoc: {
      keyword: "css;#query",
      target: "css;#container",
      where: "beforeBegin",
    },
  },
  
  {
    name: "海词",
    url: /^https?:\/\/dict\.cn\/./,
    enabled: true,
    engineList: "translate",
    style: `
      z-index: 99;
      text-align: center;
    `,
    insertIntoDoc: {
      keyword: "css;#q",
      target: "css;.main",
      where: "afterBegin",
    },
  },
];
const shoppingRules = [
  {
    name: "什么值得买",
    url: /^https?:\/\/search\.smzdm\.com\/\?/i,
    enabled: true,
    engineList: "shopping",
    fixedTop: 40,
    style: `
      width: 100% !important;
      margin: 0 auto 1em auto;
      position: sticky;
      top: 42px;
      z-index: 100;
    `,
    insertIntoDoc: {
      keyword: "css;#J_search_input",
      target: "css;#content > div.content-inner",
      where: "afterBegin",
    },
  },
];
const socialityRules = [
  {
    name: "豆瓣",
    url: /^https?:\/\/www\.douban\.com\/search/i,
    enabled: true,
    engineList: "sociality",
    style: `
      margin: -1em 0 1em 7em;
      position: sticky;
      top: 0.1em;
    `,
    insertIntoDoc: {
      keyword:
        "css;#content > div > div.article > div.mod-search > form > fieldset > div.inp > input",
      target: "css;#content > div > div.article > div.mod-search",
      where: "afterEnd",
    },
  },
];
const scholarRules = [
  {
    name: "万方",
    enabled: true,
    url: /^https?:\/\/s\.wanfangdata\.com\.cn\/Paper/i,
    engineList: "scholar",
    style: `
      z-index:999;
      width: 1200px !important;
      margin: 1em auto 1em;
      position:sticky;
      top: 0.1em;
      justify-content: center;
    `,
    insertIntoDoc: {
      keyword: "css;input.search-input",
      target: "css;.me-container.container-wrapper",
      where: "beforeBegin",
    },
  },
];
const codingRules = [
  {
    name: "Runoob",
    enabled: true,
    url: /^https?:.*?runoob\.com\//i,
    engineList: "mine",
    style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      position:relative;
      text-align:center;
      margin: 0 auto 2em;
    `,
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
  },
];

// 解包所有规则
const searchEngineJumpPlusRules = [
  ...webRules,
  ...knowledgeRules,
  ...videoRules,
  ...musicRules,
  ...imageRules,
  ...downloadRules,
  ...translateRules,
  ...shoppingRules,
  ...socialityRules,
  ...scholarRules,
  ...codingRules,
];

export default searchEngineJumpPlusRules;
