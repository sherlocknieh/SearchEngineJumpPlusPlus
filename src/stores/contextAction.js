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
  // 图片外层链接：图片模式下列表额外提供链接的复制/打开，链接模式为 null
  link: null,
  // 命中的元素，跟随模式用它的矩形定位
  element: null,
});

/**
 * @param {object} input
 * @param {'image' | 'link'} input.mode 命中类型
 * @param {string} input.keyword 引擎关键词
 * @param {string} input.url 打开动作使用的地址
 * @param {Element | null} [input.element] 命中的元素，用于跟随定位
 * @param {{url: string, text: string} | null} [input.link] 图片外层链接，供链接动作使用
 */
export function openContextAction({ mode, keyword, url, element = null, link = null }) {
  contextAction.mode = mode;
  contextAction.keyword = keyword;
  contextAction.url = url;
  contextAction.link = link;
  contextAction.element = element;
  contextAction.active = true;
}

export function closeContextAction() {
  contextAction.active = false;
  contextAction.link = null;
  contextAction.element = null;
}
