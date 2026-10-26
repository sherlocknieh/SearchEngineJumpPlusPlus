/** 测试用的内存版油猴 API */
const store = new Map();
let listenerId = 0;

export const GM_getValue = (key, defaultValue) => (store.has(key) ? store.get(key) : defaultValue);
export const GM_setValue = (key, value) => {
  store.set(key, value);
};
export const GM_deleteValue = (key) => {
  store.delete(key);
};
export const GM_addValueChangeListener = () => ++listenerId;
export const GM_removeValueChangeListener = () => {};
export const GM_addStyle = () => document.createElement('style');
export const GM_openInTab = () => ({ close() {} });
export const GM_xmlhttpRequest = () => {};
export const GM_registerMenuCommand = () => {};

export function __resetGmStore() {
  store.clear();
}
