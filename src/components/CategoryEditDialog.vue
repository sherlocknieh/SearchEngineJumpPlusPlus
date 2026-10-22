<script setup>
import { onMounted, ref } from 'vue';

const props = defineProps({
  name: { type: String, default: '' },
  busy: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'delete', 'cancel']);

const input = ref(null);
const value = ref(props.name);

onMounted(() => {
  input.value?.focus();
  input.value?.select();
});

function submit() {
  if (props.busy) return;
  emit('submit', value.value.trim());
}
</script>

<template>
  <div id="sej-categoryBox" class="sej-dialog-box">
    <div class="sej-dialog-title">编辑分类</div>
    <label class="sej-field">
      <span>名称</span>
      <input ref="input" v-model="value" placeholder="必填" :disabled="busy"
        @keydown.enter="submit" />
    </label>
    <div class="sej-dialog-actions">
      <button type="button" class="addItemBoxBtn sej-dialog-danger" :disabled="busy"
        @click="$emit('delete')">
        删除分类
      </button>
      <button type="button" class="addItemBoxBtn iqxin-closeBtn" :disabled="busy"
        @click="$emit('cancel')">
        取消
      </button>
      <button type="button" class="addItemBoxBtn iqxin-enterBtn" :disabled="busy"
        @click="submit">
        确定
      </button>
    </div>
  </div>
</template>
