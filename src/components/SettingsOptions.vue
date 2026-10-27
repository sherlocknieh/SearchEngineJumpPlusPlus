<script setup>
import { t } from '../assets/i18n.js';

defineProps({
  options: { type: Object, required: true },
});

const emit = defineEmits(['update-option']);
</script>

<template>
  <div class="sej-footer-options">
    <span id="xin-HideTheSameLink" :title="t('settings.hideSameLinkTip')">
      <label
        >{{ t('settings.hideSameLink')
        }}<input
          type="checkbox"
          :checked="options.HideTheSameLink"
          @change="emit('update-option', 'HideTheSameLink', $event.target.checked)"
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
    <span id="xin-centerDisplay" :title="t('settings.centerTip')">
      <label
        >{{ t('settings.center')
        }}<input
          type="checkbox"
          :checked="options.center"
          @change="emit('update-option', 'center', $event.target.checked)"
      /></label>
    </span>
    <span id="iqxin-fixedTopS" :title="t('settings.fixedTopTip')">
      <label
        >{{ t('settings.fixedTop')
        }}<input
          type="checkbox"
          :checked="options.fixedTop"
          @change="emit('update-option', 'fixedTop', $event.target.checked)"
      /></label>
    </span>
    <span
      v-show="options.fixedTop"
      id="iqxin-fixedTopUpward"
      :title="t('settings.fixedTopUpwardTip')"
    >
      <label
        >{{ t('settings.fixedTopUpward')
        }}<input
          type="checkbox"
          :checked="options.fixedTopUpward"
          @change="emit('update-option', 'fixedTopUpward', $event.target.checked)"
      /></label>
    </span>
    <span id="xin-language">
      <label
        >{{ t('settings.language') }}
        <select
          class="sej-language-select"
          :value="options.language"
          @change="emit('update-option', 'language', $event.target.value)"
        >
          <option value="auto">{{ t('settings.languageAuto') }}</option>
          <option value="zh-CN">简体中文</option>
          <option value="en">English</option>
        </select>
      </label>
    </span>
  </div>
</template>
