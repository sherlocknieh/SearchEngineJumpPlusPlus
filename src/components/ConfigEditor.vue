<script setup>
import { ref } from 'vue';
import { GM_setClipboard } from '$';
import { t } from '../i18n/index.js';

const props = defineProps({
  initialText: { type: String, default: '' },
});

const emit = defineEmits(['save', 'reset', 'close', 'copy', 'notify']);

const text = ref(props.initialText);
const fileInput = ref(null);

function copy() {
  GM_setClipboard(text.value);
  emit('copy');
}

function pickFile() {
  fileInput.value?.click();
}

async function importFile(event) {
  const file = event.target.files?.[0];
  event.target.value = '';
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    text.value = JSON.stringify(parsed, null, 4);
    emit('notify', t('config.imported', { name: file.name }));
  } catch (e) {
    alert(t('config.parseFailed'));
  }
}

function exportFile() {
  let parsed;
  try {
    parsed = JSON.parse(text.value);
  } catch (e) {
    alert(t('config.parseFailedExport'));
    return false;
  }

  const blob = new Blob([JSON.stringify(parsed, null, 4)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `SearchEngineJump.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  emit('notify', t('config.exported'));
  return true;
}

// 恢复默认属于破坏性操作，先自动导出当前配置作为备份
function reset() {
  if (!exportFile()) return;
  emit('reset');
}
</script>

<template>
  <div id="iqxin-editCodeBox">
    <p>
      <span class="iqxin-warning">! ! !</span><br />
      {{ t('config.warningLine1') }}<br />
      {{ t('config.warningLine2') }}
    </p>
    <textarea v-model="text" wrap="off" cols="45" rows="20"></textarea>
    <input ref="fileInput" class="sej-file-input" type="file" accept="application/json,.json" @change="importFile" />
    <div class="sej-dialog-actions">
      <button @click="reset">{{ t('config.reset') }}</button>
      <button @click="pickFile">{{ t('config.import') }}</button>
      <button @click="exportFile">{{ t('config.export') }}</button>
      <button @click="copy">{{ t('common.copy') }}</button>
      <button class="iqxin-closeBtn" @click="$emit('close')">{{ t('common.close') }}</button>
      <button class="iqxin-enterBtn" @click="$emit('save', text)">{{ t('common.save') }}</button>
    </div>
  </div>
</template>
