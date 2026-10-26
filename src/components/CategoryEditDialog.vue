<script setup>
import { onMounted, ref } from 'vue';
import { t } from '../assets/i18n.js';

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
    <div class="sej-dialog-title">{{ t('category.title') }}</div>
    <label class="sej-field">
      <span>{{ t('common.name') }}</span>
      <input
        ref="input"
        v-model="value"
        :placeholder="t('common.required')"
        :disabled="busy"
        @keydown.enter="submit"
      />
    </label>
    <div class="sej-dialog-actions">
      <button
        type="button"
        class="addItemBoxBtn sej-dialog-danger"
        :disabled="busy"
        @click="$emit('delete')"
      >
        {{ t('category.delete') }}
      </button>
      <button
        type="button"
        class="addItemBoxBtn iqxin-closeBtn"
        :disabled="busy"
        @click="$emit('cancel')"
      >
        {{ t('common.cancel') }}
      </button>
      <button type="button" class="addItemBoxBtn iqxin-enterBtn" :disabled="busy" @click="submit">
        {{ t('common.confirm') }}
      </button>
    </div>
  </div>
</template>
