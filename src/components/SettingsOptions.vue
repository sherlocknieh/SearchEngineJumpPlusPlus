<script setup>
import { ref } from 'vue';
import { t } from '../assets/i18n.js';

defineProps({
  options: { type: Object, required: true },
});

const emit = defineEmits(['update-option']);

// 窄屏下选项区折叠起来，把高度让给引擎列表；宽屏由样式强制展开，这个状态不参与
const expanded = ref(false);
</script>

<template>
  <div class="sej-footer-options">
    <button
      type="button"
      class="sej-options-toggle"
      aria-controls="sej-options-list"
      :aria-expanded="expanded"
      @click="expanded = !expanded"
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        aria-hidden="true"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
        <circle cx="9" cy="6" r="2" fill="currentColor" stroke="none" />
        <circle cx="15" cy="12" r="2" fill="currentColor" stroke="none" />
        <circle cx="8" cy="18" r="2" fill="currentColor" stroke="none" />
      </svg>
      {{ t('settings.options') }}
      <svg
        class="sej-options-arrow"
        :class="{ 'is-open': expanded }"
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
    <div id="sej-options-list" class="sej-options-list" :class="{ 'is-open': expanded }">
      <span id="xin-centerDisplay" :title="t('settings.centerTip')">
        <label
          >{{ t('settings.center')
          }}<input
            type="checkbox"
            :checked="options.center"
            @change="emit('update-option', 'center', $event.target.checked)"
        /></label>
      </span>
      <span
        id="xin-selectSearchInInput"
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
        id="xin-selectionBelow"
        v-show="options.selectionFollowPointer"
        :title="t('settings.selectionBelowTip')"
      >
        <label
          >{{ t('settings.selectionBelow')
          }}<input
            type="checkbox"
            :checked="options.selectionBelow"
            @change="emit('update-option', 'selectionBelow', $event.target.checked)"
        /></label>
      </span>
      <span
        id="xin-selectionCompact"
        v-show="options.selectionFollowPointer"
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
        v-show="options.selectionFollowPointer"
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
      <span
        id="xin-clickCategoryJumpFirst"
        :title="t('settings.clickCategoryJumpFirstTip')"
      >
        <label
          >{{ t('settings.clickCategoryJumpFirst')
          }}<input
            type="checkbox"
            :checked="options.clickCategoryJumpFirst"
            @change="emit('update-option', 'clickCategoryJumpFirst', $event.target.checked)"
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
            <option value="_background">{{ t('settings.defaultOpenTargetBackground') }}</option>
            <option value="_self">{{ t('settings.defaultOpenTargetSelf') }}</option>
          </select>
        </label>
      </span>
    </div>
  </div>
</template>
