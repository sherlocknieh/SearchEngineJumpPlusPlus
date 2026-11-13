<script setup>
import { t } from '../assets/i18n.js';

defineProps({
  options: { type: Object, required: true },
});

const emit = defineEmits(['update-option']);
</script>

<template>
  <div class="sej-footer-options">
    <span id="xin-centerDisplay" :title="t('settings.centerTip')">
      <label
        >{{ t('settings.center')
        }}<input
          type="checkbox"
          :checked="options.center"
          @change="emit('update-option', 'center', $event.target.checked)"
      /></label>
    </span>
    <span id="xin-selectSearch">
      <label
        >{{ t('settings.selectSearch')
        }}<input
          type="checkbox"
          :checked="options.selectSearch"
          @change="emit('update-option', 'selectSearch', $event.target.checked)"
      /></label>
    </span>
    <span
      id="xin-selectSearchInInput"
      v-show="options.selectSearch"
      :title="t('settings.selectSearchInInputTip')"
    >
      <label
        >{{ t('settings.selectSearchInInput')
        }}<input
          type="checkbox"
          :checked="options.selectSearchInInput"
          @change="emit('update-option', 'selectSearchInInput', $event.target.checked)"
      /></label>
    </span>
    <span
      id="xin-selectionFollowPointer"
      v-show="options.selectSearch"
      :title="t('settings.selectionFollowPointerTip')"
    >
      <label
        >{{ t('settings.selectionFollowPointer')
        }}<input
          type="checkbox"
          :checked="options.selectionFollowPointer"
          @change="emit('update-option', 'selectionFollowPointer', $event.target.checked)"
      /></label>
    </span>
    <span
      id="xin-selectionCompact"
      v-show="options.selectSearch && options.selectionFollowPointer"
      :title="t('settings.selectionCompactTip')"
    >
      <label
        >{{ t('settings.selectionCompact')
        }}<input
          type="checkbox"
          :checked="options.selectionCompact"
          @change="emit('update-option', 'selectionCompact', $event.target.checked)"
      /></label>
    </span>
    <span
      id="xin-selectionIcon"
      v-show="options.selectSearch && options.selectionFollowPointer"
      :title="t('settings.selectionIconTip')"
    >
      <label
        >{{ t('settings.selectionIcon')
        }}<input
          type="checkbox"
          :checked="options.selectionIcon"
          @change="emit('update-option', 'selectionIcon', $event.target.checked)"
      /></label>
    </span>
    <span id="xin-defaultOpenTarget" :title="t('settings.defaultOpenTargetTip')">
      <label
        >{{ t('settings.defaultOpenTarget') }}
        <select
          class="sej-language-select"
          :value="options.defaultOpenTarget"
          @change="emit('update-option', 'defaultOpenTarget', $event.target.value)"
        >
          <option value="_blank">{{ t('settings.defaultOpenTargetBlank') }}</option>
          <option value="_self">{{ t('settings.defaultOpenTargetSelf') }}</option>
        </select>
      </label>
    </span>
  </div>
</template>
