import { reactive } from 'vue';

/**
 * 右键图片搜图浮层的运行时状态。
 * 与设置面板一样只存在于内存，不写入配置。
 */
export const imageSearch = reactive({
  open: false,
  // 右键时的视口坐标，浮层据此定位
  x: 0,
  y: 0,
  imageUrl: '',
});

export function openImageSearch({ x, y, imageUrl }) {
  imageSearch.x = x;
  imageSearch.y = y;
  imageSearch.imageUrl = imageUrl;
  imageSearch.open = true;
}

export function closeImageSearch() {
  imageSearch.open = false;
}
