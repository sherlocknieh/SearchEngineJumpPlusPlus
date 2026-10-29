<script setup>
import { getFaviconSrc } from '../core/favicon.js';
import { localizeEngineName, t } from '../assets/i18n.js';
import { COPY, EYE, EYE_OFF, PENCIL, TRASH } from '../assets/icons.js';

const props = defineProps({
  category: { type: Object, required: true },
  ci: { type: Number, required: true },
  dragCtx: { type: Object, default: null },
  copyTargetCi: { type: Number, default: null },
  displayName: { type: String, required: true },
  // 内置分类（快捷动作）：只能移动和隐藏，不能改名、删除或添加条目
  locked: { type: Boolean, default: false },
});

const emit = defineEmits([
  'toggle-category',
  'open-category',
  'delete-category',
  'add-engine',
  'edit-engine',
  'toggle-engine',
  'delete-engine',
  'drag-start',
]);

function openCategory() {
  if (!props.locked) emit('open-category', props.ci);
}

function openEngine(ei) {
  if (!props.locked) emit('edit-engine', props.ci, ei);
}
</script>

<template>
  <div
    :id="category.key"
    class="iqxin-items"
    :class="{
      'sej-category-hidden': !category.enabled,
      'sej-drag-placeholder': dragCtx?.type === 'category' && dragCtx.key === category.key,
    }"
    :data-sej-drag-el="'category-' + category._id"
  >
    <!-- 类别标题 -->
    <div
      class="sejtitle drag"
      :data-xin="category.enabled ? 1 : -1"
      :data-iqxintitle="category.key"
      :title="locked ? null : t('settings.editCategory', { name: displayName })"
      @pointerdown="emit('drag-start', $event, 'category', ci)"
      @click.stop="openCategory"
    >
      <span class="iqxin-pointer-events">{{ displayName }}</span>
      <span v-if="!locked" class="sej-hover-edit" v-html="PENCIL"></span>
      <span
        class="iqxin-set-toggle"
        :class="{ 'iqxin-set-hidden': !category.enabled }"
        :title="category.enabled ? t('common.hide') : t('common.show')"
        @click.stop="emit('toggle-category', ci)"
        v-html="category.enabled ? EYE : EYE_OFF"
      ></span>
      <span
        v-if="!locked"
        class="sej-hover-delete"
        :title="t('settings.deleteCategory')"
        @pointerdown.stop
        @click.stop="emit('delete-category', ci)"
        v-html="TRASH"
      ></span>
    </div>

    <!-- 具体条目 -->
    <div class="sejcon" :data-sej-drag-el="'list-' + category._id">
      <!-- 每个搜索引擎 -->
      <span
        v-for="(engine, ei) in category.engines"
        :key="engine._id"
        class="drag"
        :data-sej-drag-el="'engine-' + engine._id"
        :class="{
          'sej-drag-placeholder': dragCtx?.type === 'engine' && dragCtx.key === engine._id,
        }"
        :title="locked ? null : t('settings.editEngine', { name: localizeEngineName(engine.name) })"
        @pointerdown="emit('drag-start', $event, 'engine', ci, ei)"
        @click.stop="openEngine(ei)"
      >
        <span
          class="sej-engine"
          :data-iqxintitle="engine.name"
          :data-iqxinimg="engine.favicon"
          :data-iqxinlink="engine.url"
          :data-iqxintarget="engine.target === '_self' ? '_self' : null"
          :data-iqxindisabled="engine.disable ? 'true' : null"
        >
          <img class="sej-engine-icon" :src="getFaviconSrc(engine)" alt="" />
          <span>{{ localizeEngineName(engine.name) }}</span>
        </span>
        <span v-if="!locked" class="sej-hover-edit" v-html="PENCIL"></span>
        <span
          class="iqxin-set-toggle"
          :class="{ 'iqxin-set-hidden': engine.disable }"
          :title="engine.disable ? t('common.show') : t('common.hide')"
          @click.stop="emit('toggle-engine', ci, ei)"
          v-html="engine.disable ? EYE_OFF : EYE"
        ></span>
        <span
          v-if="!locked"
          class="sej-hover-delete"
          :title="t('settings.deleteEngine')"
          @pointerdown.stop
          @click.stop="emit('delete-engine', ci, ei)"
          v-html="TRASH"
        ></span>
      </span>
      <!-- 添加搜索引擎按钮；拖动已有引擎悬浮时变为复制入口。内置分类没有添加入口 -->
      <span
        v-if="!locked"
        class="iqxin-additem"
        :class="{ 'sej-copy-target': copyTargetCi === ci }"
        @click.stop="emit('add-engine', ci)"
      >
        <span v-if="copyTargetCi === ci" class="sej-copy-icon" v-html="COPY"></span>
        <template v-else>+</template>
        <span v-if="copyTargetCi === ci" class="sej-copy-hint">{{ t('settings.copyHere') }}</span>
      </span>
    </div>
  </div>
</template>
