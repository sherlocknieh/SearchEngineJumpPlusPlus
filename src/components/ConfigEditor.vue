<script setup>
import { ref, watch } from 'vue';
import { t } from '../i18n/index.js';

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
