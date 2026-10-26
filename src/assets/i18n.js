import { computed, ref } from 'vue';
import { messages, DEFAULT_CATEGORY_NAMES, DEFAULT_ENGINE_NAMES } from './messages.js';

/** 支持的语言偏好；auto 表示跟随浏览器/系统语言 */
export const LANGUAGE_OPTIONS = ['auto', 'zh-CN', 'en'];
export const FALLBACK_LOCALE = 'zh-CN';

const preference = ref('auto');

function detectLocale() {
  if (typeof navigator === 'undefined') return FALLBACK_LOCALE;
  const language = String(navigator.languages?.[0] || navigator.language || '').toLowerCase();
  return language.startsWith('zh') ? 'zh-CN' : 'en';
}

/** 当前实际生效的语言（响应式） */
export const locale = computed(() =>
  preference.value === 'auto' ? detectLocale() : preference.value,
);

export function normalizeLanguage(value) {
  return LANGUAGE_OPTIONS.includes(value) ? value : 'auto';
}

export function setLanguagePreference(value) {
  preference.value = normalizeLanguage(value);
}

/**
 * 取一条 UI 文案。支持 {name} 形式的参数插值。
 */
export function t(key, params) {
  const dictionary = messages[locale.value] || messages[FALLBACK_LOCALE];
  let text = dictionary[key];
  if (text == null) text = messages[FALLBACK_LOCALE][key];
  if (text == null) return key;
  if (!params) return text;
  return text.replace(/\{(\w+)\}/g, (match, name) =>
    params[name] == null ? match : String(params[name]),
  );
}

/**
 * 默认分类名按当前语言显示；用户自定义的名称保持原样。
 */
export function localizeCategoryName(name, key) {
  const entry = DEFAULT_CATEGORY_NAMES[key];
  if (!entry) return name;
  if (name !== entry[FALLBACK_LOCALE] && name !== entry.en) return name;
  return entry[locale.value] || name;
}

/**
 * 默认引擎名在英文界面下显示英文别名；其他情况保持用户配置的名称。
 */
export function localizeEngineName(name) {
  if (locale.value !== 'en') return name;
  return DEFAULT_ENGINE_NAMES[name] || name;
}
