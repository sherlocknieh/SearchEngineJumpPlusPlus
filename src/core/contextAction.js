/**
 * 长按/右键页面内容（图片、链接）时复用的上下文操作条。
 *
 * 每个模式只提供两件事：命中的元素如何解析成关键词、浮层显示哪个分类。
 * 长按手势、浮层呈现与关闭时机由调用方共用，模式之间只差这两项配置。
 */
import { BUILTIN_CATEGORY_KEY, IMAGE_CATEGORY_KEY } from './configData.js';
import { resolveImageHit } from './imageSearch.js';
import { resolveLinkHit } from './linkAction.js';

/** 长按判定：按住时长与允许的手指/鼠标位移 */
export const LONG_PRESS_MS = 450;
export const LONG_PRESS_MOVE_TOLERANCE = 10;

/** 动作引擎在各情景下的悬停提示文案；text 为划词条，input 为站点内嵌条的搜索框 */
const CONTEXT_ACTION_HINTS = {
  link: {
    copyLinkText: 'action.hintCopyLinkTitle',
    copyLinkUrl: 'action.hintCopyLinkUrl',
    selectLinkText: 'action.hintSelectLinkTitle',
    open: 'action.hintOpenLink',
  },
  image: {
    copyImage: 'action.hintCopyImage',
    copyImageUrl: 'action.hintCopyImageUrl',
    open: 'action.hintOpenImage',
  },
  text: { copy: 'action.hintCopyText', open: 'action.hintOpenLink' },
  input: { copy: 'action.hintCopyText', open: 'action.hintOpenLink' },
};

/** 提示里展示目标内容的长度上限，避免长标题把悬停提示撑得过宽 */
export const HINT_TARGET_MAX = 80;

/** 动作条目的名称：当前情景有自己的说法（复制图片 / 打开链接）时优先用它 */
export function contextActionLabel(mode, action, fallback, t) {
  const key = action ? contextActionHintKey(mode, action) : '';
  return key ? t(key) : fallback || '';
}

/**
 * 动作条目的说明：出现时机与用法说明分开写，
 * 设置面板的只读表单与悬停提示都从这里取，避免两处文案不一致。
 */
const ACTION_ENGINE_INFO = {
  copy: { when: 'action.whenCopy', effect: 'action.effectCopy' },
  copyImage: { when: 'action.whenCopyImage', effect: 'action.effectCopyImage' },
  copyImageUrl: { when: 'action.whenCopyImageUrl', effect: 'action.effectCopyImageUrl' },
  copyLinkText: { when: 'action.whenCopyLinkText', effect: 'action.effectCopyLinkText' },
  copyLinkUrl: { when: 'action.whenCopyLinkUrl', effect: 'action.effectCopyLinkUrl' },
  selectLinkText: { when: 'action.whenSelectLinkText', effect: 'action.effectSelectLinkText' },
  open: { when: 'action.whenOpen', effect: 'action.effectOpen' },
};

/**
 * 动作的只读说明：什么时候会出现、具体做什么。未知动作返回 null。
 * @param {string} action 动作类型
 * @param {(key: string, params?: object) => string} t 文案函数
 */
export function actionEngineInfo(action, t) {
  const info = ACTION_ENGINE_INFO[action];
  if (!info) return null;
  return { when: t(info.when), effect: t(info.effect) };
}

/** 悬停提示用的单行说明：出现时机 + 用法 */
export function actionEngineTip(action, t) {
  const info = actionEngineInfo(action, t);
  return info ? t('action.tipLayout', info) : '';
}

/** 模式到命中解析与专属分类的映射 */
export const CONTEXT_MODES = {
  image: { categoryKey: IMAGE_CATEGORY_KEY, resolveHit: resolveImageHit },
  link: { categoryKey: BUILTIN_CATEGORY_KEY, resolveHit: resolveLinkHit },
};

/**
 * 解析命中的内容：图片与其外层链接可以同时存在。
 * 图片作为主模式交给「搜图」，外层链接另存一份供「操作」分类里的链接动作使用，两者互不覆盖。
 * @param {Element | null} target 按下事件的目标元素
 * @param {(mode: 'image' | 'link') => boolean} [hasEngines] 该模式是否有可用引擎
 * @param {{x: number, y: number} | null} [point] 按下位置，用于识别被链接/浮层盖住的图片
 * @returns {{mode: 'image' | 'link', url: string, text?: string, element: Element, link?: {url: string, text: string, element: Element} | null} | null}
 */
export function resolveContextHit(target, hasEngines = () => true, point = null) {
  const image = hasEngines('image') ? CONTEXT_MODES.image.resolveHit(target, undefined, point) : null;
  const link = hasEngines('link') ? CONTEXT_MODES.link.resolveHit(target) : null;
  if (image) {
    return {
      mode: 'image',
      ...image,
      link: link ? { url: link.url, text: link.text, element: link.element } : null,
    };
  }
  if (link) return { mode: 'link', ...link };
  return null;
}

/**
 * 图片外层链接的动作目标：复制沿用链接文字，打开使用链接地址，
 * 选中需要链接元素本身才能落到页面选区。
 * 外层链接就指向图片本身时（常见于点图看大图），链接动作与图片动作完全重复，不再提供。
 * @param {{url?: string, link?: {url?: string, text?: string, element?: Element} | null}} hit 命中内容
 * @returns {{keyword: string, url: string, element: Element | null} | null}
 */
export function contextLinkHit(hit = {}) {
  const link = hit.link;
  if (!link?.url || link.url === hit.url) return null;
  return { keyword: link.text || link.url, url: link.url, element: link.element || null };
}

/** 位移是否已超出长按允许的范围（滚动、拖拽时取消） */
export function isLongPressMove(startX, startY, x, y) {
  return Math.hypot(x - startX, y - startY) > LONG_PRESS_MOVE_TOLERANCE;
}

/** 模式的分类键名；未知模式返回空串，调用方按普通跳转条处理 */
export function contextCategoryKey(mode) {
  return CONTEXT_MODES[mode]?.categoryKey || '';
}

/** 模式对应的引擎：至少要有链接或快捷动作；全部隐藏时该模式不接管 */
export function getContextEngines(settingData, mode) {
  const list = settingData?.engineList?.[contextCategoryKey(mode)];
  if (!Array.isArray(list)) return [];
  return list.filter((engine) => !engine.disable && (engine.url || engine.action));
}

/**
 * 命中内容交给动作引擎的目标：复制文字只取文字，复制图片只取图片，
 * 链接标题、链接地址与图片地址各取对应内容；打开统一用地址；
 * 「选中链接标题」额外带上链接元素，交给动作执行方落到页面选区。
 * @param {'image' | 'link'} mode 命中类型
 * @param {string} action 动作类型
 * @param {{keyword?: string, url?: string, element?: Element | null}} hit 命中的关键词与地址
 * @returns {string | { text: string, url: string, image?: string, element?: Element | null }}
 */
export function contextActionTarget(mode, action, hit = {}) {
  const url = hit.url || '';
  const keyword = hit.keyword || url;
  if (action === 'copyLinkText' || action === 'copy') return keyword;
  if (action === 'copyLinkUrl' || action === 'copyImageUrl') return url || keyword;
  if (action === 'selectLinkText') return { text: keyword, url, element: hit.element || null };
  if (action === 'copyImage') return { text: url || keyword, url, image: url || keyword };
  return url || keyword;
}

/**
 * 动作在某个关键词来源下是否有意义：复制文字只用于划词与搜索框，复制图片只用于图片，
 * 链接标题/地址与图片地址只属于各自的目标，打开在所有情景下都可用。
 * @param {'image' | 'link' | 'text' | 'input'} mode 关键词来源
 * @param {string} [action] 动作类型
 */
export function isActionAvailableInMode(mode, action) {
  if (action === 'copy') return mode === 'text' || mode === 'input';
  if (action === 'copyImage' || action === 'copyImageUrl') return mode === 'image';
  if (action === 'copyLinkText' || action === 'copyLinkUrl' || action === 'selectLinkText') {
    return mode === 'link';
  }
  return true;
}

/**
 * 动作引擎的悬停提示键：同名动作在链接与图片情景下含义不同。
 * @param {'image' | 'link'} mode 命中类型
 * @param {string} action 动作类型
 */
export function contextActionHintKey(mode, action) {
  return CONTEXT_ACTION_HINTS[mode]?.[action] || '';
}

/** 提示里展示的目标内容：划词与搜索框都是「文字 + 可选地址」，其余沿用动作目标 */
function hintTargetText(mode, action, hit) {
  if (mode === 'text' || mode === 'input') return (action === 'copy' ? hit.keyword : hit.url) || '';
  const target = contextActionTarget(mode, action, hit);
  return typeof target === 'string' ? target : target?.text || '';
}

/** 折叠空白并截断，保证单行提示不被长标题撑开 */
function shortenHintTarget(value) {
  const text = String(value ?? '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > HINT_TARGET_MAX ? `${text.slice(0, HINT_TARGET_MAX - 1)}…` : text;
}

/**
 * 动作引擎完整的悬停提示：说明这次到底复制或打开什么内容。
 * @param {'image' | 'link' | 'text' | 'input'} mode 命中情景：text 为划词条，input 为内嵌条搜索框
 * @param {string} action 动作类型
 * @param {{keyword?: string, url?: string}} hit 命中的关键词与地址
 * @param {(key: string, params?: object) => string} t 文案函数
 */
export function actionEngineHint(mode, action, hit = {}, t) {
  const key = contextActionHintKey(mode, action);
  if (!key) return '';
  const label = t(key);
  const target = shortenHintTarget(hintTargetText(mode, action, hit));
  return target ? t('action.hintWithTarget', { action: label, target }) : label;
}

/**
 * 条目名称已经说明动作（如「复制图片」）时，悬停提示只保留目标内容，不再重复动作说明。
 * @param {'image' | 'link'} mode 命中类型
 * @param {string} action 动作类型
 * @param {{keyword?: string, url?: string}} hit 命中的关键词与地址
 */
export function actionTargetHint(mode, action, hit = {}) {
  if (!contextActionHintKey(mode, action)) return '';
  return shortenHintTarget(hintTargetText(mode, action, hit));
}

/**
 * 上下文操作条的动作条目：严格按配置里的顺序遍历「操作」分类，
 * 每个动作对当前适用的每个目标各生成一条，因此设置面板拖出的排序直接决定浮层顺序。
 * 图片模式下图片是主目标、外层链接排在它后面（同一动作同时适用时才各出一条）。
 * @param {Array} engines 「操作」分类的引擎（配置顺序）
 * @param {Array<{mode: string, hit: object}>} targets 命中的目标，图片模式为图片 + 可选的外层链接
 * @param {(key: string, params?: object) => string} t 文案函数
 */
export function contextActionEngines(engines, targets, t) {
  const list = [];
  for (const engine of engines || []) {
    if (engine.disable || !engine.action) continue;
    for (const { mode, hit } of targets) {
      if (!isActionAvailableInMode(mode, engine.action)) continue;
      // 纯图片链接没有标题：复制标题、选中标题与复制地址目标相同，省掉重复条目
      if (
        (engine.action === 'copyLinkText' || engine.action === 'selectLinkText') &&
        hit.keyword === hit.url
      ) {
        continue;
      }
      list.push({
        ...engine,
        // 复制图片时图标直接用命中的这张图，设置面板仍用动作默认图标
        ...(mode === 'image' && engine.action === 'copyImage'
          ? { favicon: hit.url, faviconData: '' }
          : {}),
        name: contextActionLabel(mode, engine.action, engine.name, t),
        contextTarget: mode,
        hint: actionTargetHint(mode, engine.action, hit),
      });
    }
  }
  return list;
}
