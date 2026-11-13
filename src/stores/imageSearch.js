import { reactive } from 'vue';

/**
 * 长按图片搜图的运行时状态。
 * 与设置面板一样只存在于内存，不写入配置。
 */
export const imageSearch = reactive({
  active: false,
  // 长按命中的图片地址，跳转条在图片模式下用它作为关键词
  imageUrl: '',
});

export function openImageSearch(imageUrl) {
  imageSearch.imageUrl = imageUrl;
  imageSearch.active = true;
}

export function closeImageSearch() {
  imageSearch.active = false;
}
