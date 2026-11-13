import { reactive } from 'vue';

/**
 * 长按图片搜图的运行时状态。
 * 与设置面板一样只存在于内存，不写入配置。
 */
export const imageSearch = reactive({
  active: false,
  // 长按命中的图片地址，划词条在图片模式下用它作为关键词
  imageUrl: '',
  // 命中的图片元素，跟随定位时用它的右上角
  element: null,
});

/**
 * @param {string} imageUrl 图片地址
 * @param {Element | null} [element] 命中的图片元素，用于跟随定位
 */
export function openImageSearch(imageUrl, element = null) {
  imageSearch.imageUrl = imageUrl;
  imageSearch.element = element;
  imageSearch.active = true;
}

export function closeImageSearch() {
  imageSearch.active = false;
  imageSearch.element = null;
}
