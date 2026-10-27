<script setup>
import { t } from '../assets/i18n.js';

defineProps({
  saving: { type: Boolean, default: false },
  saveFlash: { type: Boolean, default: false },
});

const emit = defineEmits(['open-config', 'pick-config-file', 'export-config', 'save']);
</script>

<template>
  <div class="sej-footer-bar">
    <div class="sej-footer-selects">
      <div id="xin-modification" class="sej-config-box">
        <button
          type="button"
          class="sej-config-open"
          :title="t('settings.editConfig')"
          @click="emit('open-config')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="3" />
            <path
              d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
            />
          </svg>
          {{ t('settings.editConfig') }}
        </button>
        <span class="sej-config-sep" aria-hidden="true"></span>
        <button
          type="button"
          class="sej-config-action"
          :title="t('config.import')"
          @click="emit('pick-config-file')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 21V9" />
            <path d="m7 14 5-5 5 5" />
            <path d="M5 3h14" />
          </svg>
          {{ t('config.import') }}
        </button>
        <span class="sej-config-sep" aria-hidden="true"></span>
        <button
          type="button"
          class="sej-config-action"
          :title="t('config.export')"
          @click="emit('export-config')"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M12 3v12" />
            <path d="m7 10 5 5 5-5" />
            <path d="M5 21h14" />
          </svg>
          {{ t('config.export') }}
        </button>
      </div>
    </div>
    <div class="sej-footer-links">
      <span class="feedback" :title="t('settings.feedbackGreasyFork')">
        <a target="_blank" href="https://greasyfork.org/zh-CN/users/1238054">Greasy Fork</a>
      </span>
      <span class="feedback" :title="t('settings.feedbackGitHub')">
        <a target="_blank" href="https://github.com/sherlocknieh/Monkey-Scripts">GitHub</a>
      </span>
    </div>
    <div class="sej-footer-actions">
      <span
        id="xin-save"
        :title="t('settings.close')"
        :class="{ 'sej-saving': saving, 'sej-save-flash': saveFlash }"
        @click="emit('save')"
      >
        <i class="sej-save-text" :class="{ 'sej-save-text-flash': saveFlash }">
          {{
            saving ? t('settings.saving') : saveFlash ? t('settings.saved') : t('settings.close')
          }}
        </i>
      </span>
    </div>
  </div>
</template>
