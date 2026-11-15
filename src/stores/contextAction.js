import { reactive } from 'vue';

/**
 * 长按/右键页面图片或链接时的运行时状态。
 * 与设置面板一样只存在于内存，不写入配置。
 */
export const contextAction = reactive({
  active: false,
  // 'image' | 'link'：决定浮层条显示哪个分类
  mode: '',
  // 引擎关键词：图片模式是图片地址，链接模式是链接文字
  keyword: '',
  // 打开动作用的地址：图片链接或链接地址
  url: '',
  // 命中图片是否带可搜索地址：内联 data: 缩略图为 false，「搜图」分类不出现
  searchable: true,
  // 图片外层链接：图片模式下列表额外提供链接的复制/选中/打开，链接模式为 null
  link: null,
  // 命中的元素，跟随模式用它的矩形定位
  element: null,
});

/**
 * @param {object} input
 * @param {'image' | 'link'} input.mode 命中类型
 * @param {string} input.keyword 引擎关键词
 * @param {string} input.url 打开动作使用的地址
 * @param {boolean} [input.searchable] 图片地址能否交给识图引擎，默认可以
 * @param {Element | null} [input.element] 命中的元素，用于跟随定位
 * @param {{url: string, text: string, element?: Element} | null} [input.link] 图片外层链接，供链接动作使用
 */
export function openContextAction({
  mode,
  keyword,
  url,
  searchable = true,
  element = null,
  link = null,
}) {
  contextAction.mode = mode;
  contextAction.keyword = keyword;
  contextAction.url = url;
  contextAction.searchable = searchable;
  contextAction.link = link;
  contextAction.element = element;
  contextAction.active = true;
}

export function closeContextAction() {
  contextAction.active = false;
  contextAction.link = null;
  contextAction.element = null;
}
