<script setup>
import { onMounted, ref } from 'vue';
import { t } from '../assets/i18n.js';
import { useModalA11y } from '../composables/useModalA11y.js';

const props = defineProps({
  name: { type: String, default: '' },
  busy: { type: Boolean, default: false },
});

const emit = defineEmits(['submit', 'delete', 'cancel']);

const rootEl = ref(null);
const input = ref(null);
const value = ref(props.name);

useModalA11y({
  containerEl: rootEl,
  initialFocus: input,
  onClose: () => {
    if (!props.busy) emit('cancel');
  },
});

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
  <div
    id="sej-categoryBox"
    ref="rootEl"
    class="sej-dialog-box"
    role="dialog"
    aria-modal="true"
    aria-labelledby="sej-category-title"
  >
    <div id="sej-category-title" class="sej-dialog-title">{{ t('category.title') }}</div>
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
