<script setup>
import { ref } from 'vue';
import { GM_setClipboard } from '$';

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
    emit('notify', `已导入 ${file.name}`);
  } catch (e) {
    alert('JSON 解析失败');
  }
}

function exportFile() {
  let parsed;
  try {
    parsed = JSON.parse(text.value);
  } catch (e) {
    alert('JSON 解析失败，无法导出');
    return;
  }
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');
  const stamp =
    `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}` +
    `-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const blob = new Blob([JSON.stringify(parsed, null, 4)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `SearchEngineJump-settings-${stamp}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  emit('notify', '配置已导出');
}
</script>

<template>
  <div id="iqxin-editCodeBox">
    <p>
      <span class="iqxin-warning">! ! !</span><br />
      此处有更多的设置选项,自由度更高,<br />
      但设置错误会导致脚本无法运行
    </p>
    <textarea v-model="text" wrap="off" cols="45" rows="20"></textarea>
    <input ref="fileInput" class="sej-file-input" type="file" accept="application/json,.json" @change="importFile" />
    <div class="sej-dialog-actions">
      <button @click="$emit('reset')">恢复默认</button>
      <button @click="pickFile">导入</button>
      <button @click="exportFile">导出</button>
      <button @click="copy">复制</button>
      <button class="iqxin-closeBtn" @click="$emit('close')">关闭</button>
      <button class="iqxin-enterBtn" @click="$emit('save', text)">保存</button>
    </div>
  </div>
</template>
