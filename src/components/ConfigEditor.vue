<script setup>
import { ref, watch } from 'vue';
import { t } from '../assets/i18n.js';

const props = defineProps({
  initialText: { type: String, default: '' },
  // 恢复默认时填入文本框的配置
  defaultText: { type: String, default: '' },
  // 从设置面板导入的文件内容；有值时优先用于覆盖/合并
  imported: { type: Object, default: null },
  // 由设置面板计算合并结果，返回合并后的配置文本（不写入设置）
  mergePreview: { type: Function, default: null },
});

const emit = defineEmits(['apply', 'cancel']);

const text = ref(props.initialText);
const textareaEl = ref(null);
const dirty = ref(false);
// 导入方式互斥选择，默认合并
const importMode = ref('merge');

// 有未应用的改动时不再同步外部配置，避免覆盖预览内容
watch(
  () => props.initialText,
  (value) => {
    if (dirty.value || document.activeElement === textareaEl.value) return;
    text.value = value;
  },
);

function previewMerge(silent = false) {
  const merged = props.mergePreview?.(props.imported, silent);
  if (!merged) return false;
  text.value = merged;
  dirty.value = true;
  return true;
}

function previewOverwrite() {
  text.value = JSON.stringify(props.imported, null, 4);
  dirty.value = true;
}

// 用单选框保证互斥，切换时更新文本框预览
watch(importMode, (mode) => {
  if (!props.imported) return;
  if (mode === 'merge') previewMerge();
  else previewOverwrite();
});

// 打开导入窗口时默认预览合并结果
if (props.imported) previewMerge(true);

// 只把默认配置填入文本框，等点击“应用”时统一生效
function reset() {
  text.value = props.defaultText;
  dirty.value = true;
}

function apply() {
  emit('apply', text.value);
}

function cancel() {
  emit('cancel');
}
</script>

<template>
  <div id="iqxin-editCodeBox">
    <p>
      <span class="iqxin-warning">! ! !</span><br />
      {{ t('config.warningLine1') }}<br />
      {{ t('config.warningLine2') }}
    </p>
    <div class="sej-config-textarea">
      <textarea ref="textareaEl" v-model="text" wrap="off" cols="45" rows="20" @input="dirty = true"></textarea>
    </div>
    <div class="sej-dialog-actions">
      <button class="sej-dialog-left" @click="reset">{{ t('config.reset') }}</button>
      <label v-if="imported" class="sej-import-mode" :title="t('config.mergeTip')">
        <input type="radio" name="sej-import-mode" value="merge" v-model="importMode" />
        {{ t('config.mergeImport') }}
      </label>
      <label v-if="imported" class="sej-import-mode">
        <input type="radio" name="sej-import-mode" value="overwrite" v-model="importMode" />
        {{ t('config.overwriteImport') }}
      </label>
      <button class="iqxin-enterBtn" :disabled="!dirty" @click="apply">{{ t('common.apply') }}</button>
      <button @click="cancel">{{ t('common.cancel') }}</button>
    </div>
  </div>
</template>

<style>
#iqxin-editCodeBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200000100;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 14px;
  box-shadow: var(--sej-shadow-menu);
  color: var(--font-color-qxin);
}

#iqxin-editCodeBox p {
  margin: 0;
}

#iqxin-editCodeBox button {
  cursor: pointer;
  background: var(--sej-btn-bg);
  border: 1px solid var(--border-color-sej);
  border-radius: 8px;
  padding: 6px 14px;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,
    color 0.12s ease-out;
}

#iqxin-editCodeBox button:hover {
  background: var(--sej-surface-hover);
}

#iqxin-editCodeBox button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

#iqxin-editCodeBox .iqxin-enterBtn {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
}

#iqxin-editCodeBox .iqxin-enterBtn:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.92;
}

#iqxin-editCodeBox .iqxin-enterBtn:disabled,
#iqxin-editCodeBox .iqxin-enterBtn:disabled:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.5;
}

#iqxin-editCodeBox .iqxin-closeBtn:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

/* 导入方式互斥勾选 */
#iqxin-editCodeBox .sej-import-mode {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--font-color-qxin);
  cursor: pointer;
  user-select: none;
}

/* 圆角裁剪滚动条，避免滚动条方角突出到圆角外 */
#iqxin-editCodeBox .sej-config-textarea {
  display: flex;
  flex: 1 1 auto;
  min-height: 240px;
  overflow: hidden;
  border: 1px solid var(--border-color-sej);
  border-radius: 10px;
  background: var(--sej-input-bg);
  transition: border-color 0.12s ease-out, box-shadow 0.12s ease-out;
}

#iqxin-editCodeBox .sej-config-textarea:focus-within {
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

#iqxin-editCodeBox textarea {
  width: 100%;
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  padding: 10px;
  overflow: auto;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--font-color-qxin);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  resize: none;
  outline: none;
}

#iqxin-editCodeBox textarea::-webkit-resizer,
#iqxin-editCodeBox textarea::-webkit-scrollbar-corner {
  background: transparent;
}

.iqxin-warning {
  color: var(--sej-danger);
  font-size: 14px;
  font-weight: 600;
}

</style>
