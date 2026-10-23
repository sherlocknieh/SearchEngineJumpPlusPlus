<script setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
} from 'vue';
import { deleteValue } from '../core/storage.js';
import { useSettings, STORAGE_KEY } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { embedFavicon, getFaviconSrc } from '../core/favicon.js';
import { closeSettingPanel, showToast } from '../stores/ui.js';
import { EDIT, EYE, EYE_OFF } from '../data/icons.js';
import EngineEditDialog from './EngineEditDialog.vue';
import CategoryEditDialog from './CategoryEditDialog.vue';
import ConfigEditor from './ConfigEditor.vue';

const settings = useSettings();
const source = settings.settingData;

const OPTION_KEYS = [
    'status',
    'version',
    'addSearchItems',
    'modifySearchItems',
    'newtab',
    'debug',
    'fixedTop',
    'fixedTopUpward',
    'baiduOffset',
    'getIcon',
    'HideTheSameLink',
    'center',
    'icon',
    'transtion',
    'selectSearch',
];

let uid = 1;
const nextId = () => uid++;

function makeDraft() {
    const raw = JSON.parse(JSON.stringify(source));
    const d = {};
    for (const key of OPTION_KEYS) d[key] = raw[key];
    d.categories = raw.engineCategories.map(([name, key, enabled]) => ({
        _id: nextId(),
        name,
        key,
        enabled: Boolean(enabled),
        engines: (raw.engineList[key] || []).map((engine) => ({
            ...engine,
            _id: nextId(),
        })),
    }));
    return d;
}

const draft = reactive(makeDraft());
const layerEl = ref(null);
const maskEl = ref(null);
const maskVisible = ref(false);
const layerStyle = ref({});
const categoryDialog = ref(null);
const engineDialog = ref(null);
const engineSaving = ref(false);
const saving = ref(false);
const loadingIcons = ref(false);
const configOpen = ref(false);
const online = ref(false);

const UNDO_DURATION = 5000;
const undoStack = [];

const editIcon = EDIT;

const configText = computed(() => {
    const clean = JSON.parse(JSON.stringify(source));
    if (clean.engineList) delete clean.engineList.engineCategories;
    return JSON.stringify(clean, null, 4);
});

function buildResult() {
    const result = {};
    for (const key of OPTION_KEYS) result[key] = draft[key];
    result.engineCategories = draft.categories.map((cat) => [
        cat.name,
        cat.key,
        cat.enabled,
    ]);
    result.engineList = {};
    for (const cat of draft.categories) {
        result.engineList[cat.key] = cat.engines.map((engine) => {
            const item = {
                name: engine.name,
                url: engine.url,
                favicon: engine.favicon,
            };
            if (engine.faviconData) item.faviconData = engine.faviconData;
            if (engine.blank) item.blank = '_blank';
            if (engine.disable) item.disable = true;
            if (engine.gbk) item.gbk = true;
            return item;
        });
    }
    return result;
}

function remoteFaviconEngines() {
    const list = [];
    for (const category of draft.categories) {
        for (const engine of category.engines) {
            if (
                !engine.faviconData &&
                /^https?:\/\//i.test(engine.favicon || '')
            ) {
                list.push(engine);
            }
        }
    }
    return list;
}

async function embedRemoteFavicons() {
    const pending = remoteFaviconEngines();
    let converted = 0;
    let failed = 0;
    const worker = async () => {
        while (pending.length) {
            const engine = pending.shift();
            const original = engine.favicon;
            const dataUrl = await embedFavicon(original);
            if (dataUrl !== original) {
                engine.faviconData = dataUrl;
                converted++;
            } else {
                failed++;
            }
        }
    };
    const workers = Array.from(
        { length: Math.min(6, pending.length) },
        () => worker(),
    );
    await Promise.all(workers);
    return { converted, failed };
}

async function save() {
    if (saving.value) return;
    saving.value = true;
    try {
        const backend = settings.applySettings(buildResult());
        if (backend === 'memory') {
            showToast('保存失败：存储不可用，请用“配置文件”复制备份', 5000);
            return;
        }
        if (backend === 'local') {
            showToast(
                '已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）',
                4000,
            );
        } else {
            showToast('保存成功');
        }
        setTimeout(requestRestart, 0);
    } finally {
        saving.value = false;
    }
}

async function loadAllIcons() {
    if (loadingIcons.value || saving.value) return;
    const pending = remoteFaviconEngines().length;
    if (!pending) {
        showToast('没有需要加载的图标');
        return;
    }
    loadingIcons.value = true;
    try {
        showToast(`正在内嵌 ${pending} 个图标…`, 60000);
        const { converted, failed } = await embedRemoteFavicons();
        const parts = [];
        if (converted) parts.push(`已内嵌 ${converted} 个图标`);
        if (!converted && !failed) parts.push('没有可加载的图标');
        else if (failed) parts.push(`${failed} 个获取失败`);
        showToast(`${parts.join('，')}，保存后生效`, 4000);
    } finally {
        loadingIcons.value = false;
    }
}

function reset() {
    if (confirm('将会删除用户设置！')) {
        deleteValue(STORAGE_KEY);
        location.reload();
    }
}

let closeTimer = null;
let closed = false;

function finishClose() {
    if (closed) return;
    closed = true;
    clearTimeout(closeTimer);
    closeTimer = null;
    closeSettingPanel();
}

function onMaskTransitionEnd(e) {
    if (e.target !== maskEl.value || e.propertyName !== 'opacity') return;
    if (maskVisible.value) return;
    finishClose();
}

function close() {
    if (!maskVisible.value) return;
    maskVisible.value = false;
    closeTimer = setTimeout(finishClose, 400);
}

function toggleCategory(index) {
    const category = draft.categories[index];
    category.enabled = !category.enabled;
    showToast(category.enabled ? '启用' : '隐藏');
}

function toggleEngine(ci, ei) {
    const engine = draft.categories[ci].engines[ei];
    engine.disable = !engine.disable;
    showToast(engine.disable ? '隐藏' : '启用');
}

function pushUndo(entry) {
    undoStack.push(entry);
    if (undoStack.length > 20) undoStack.shift();
}

function undoDelete() {
    if (engineDialog.value || categoryDialog.value || configOpen.value) {
        showToast('请先关闭当前对话框');
        return;
    }
    const entry = undoStack.pop();
    if (!entry) return;

    if (entry.type === 'category') {
        const index = Math.min(entry.index, draft.categories.length);
        draft.categories.splice(index, 0, entry.item);
    } else {
        const category = draft.categories.find(
            (item) => item.key === entry.categoryKey,
        );
        if (!category) {
            undoStack.push(entry);
            showToast('无法撤销：分类已不存在');
            return;
        }
        const index = Math.min(entry.index, category.engines.length);
        category.engines.splice(index, 0, entry.item);
    }

    categoryDialog.value = null;
    showToast(`已撤销删除${entry.label}`);
}

function notifyDeleted(entry, label) {
    pushUndo({ ...entry, label });
    showToast(`已删除${label}`, UNDO_DURATION, {
        label: '撤销',
        onClick: undoDelete,
    });
}

function deleteCategory(index) {
    const category = draft.categories[index];
    if (!category) return;
    notifyDeleted(
        {
            type: 'category',
            index,
            item: JSON.parse(JSON.stringify(category)),
        },
        `分类「${category.name}」`,
    );
    draft.categories.splice(index, 1);
}

function deleteEngine(ci, ei) {
    const category = draft.categories[ci];
    const engine = category?.engines?.[ei];
    if (!engine) return;
    notifyDeleted(
        {
            type: 'engine',
            categoryKey: category.key,
            index: ei,
            item: JSON.parse(JSON.stringify(engine)),
        },
        `「${engine.name}」`,
    );
    category.engines.splice(ei, 1);
}

function onKeydown(e) {
    if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
    if (e.key.toLowerCase() !== 'z') return;
    if (!undoStack.length) return;

    // 事件跨 Shadow DOM 重定向，composedPath 才能拿到真实目标
    const target = e.composedPath?.()[0] || e.target;
    if (
        target?.tagName === 'INPUT' ||
        target?.tagName === 'TEXTAREA' ||
        target?.isContentEditable
    ) {
        return;
    }

    e.preventDefault();
    undoDelete();
}

function openCategoryDialog(index) {
    categoryDialog.value = { index };
}

function submitCategory(name) {
    const ctx = categoryDialog.value;
    if (!ctx) return;
    const category = draft.categories[ctx.index];
    if (category) category.name = name || '空';
    categoryDialog.value = null;
}

function cancelCategoryDialog() {
    categoryDialog.value = null;
}

function deleteCategoryFromDialog() {
    const ctx = categoryDialog.value;
    if (!ctx) return;
    categoryDialog.value = null;
    deleteCategory(ctx.index);
}

const dragCtx = ref(null);
const dragAnimations = new WeakMap();
const DRAG_ANIMATION_MS = 160;
let dragSnapshot = null;
let dragDropped = false;

function dragElements() {
    const root = layerEl.value;
    return root
        ? Array.from(root.querySelectorAll('[data-sej-drag-el]'))
        : [];
}

function snapshotRects() {
    const rects = new Map();
    for (const el of dragElements()) {
        rects.set(el.dataset.sejDragEl, el.getBoundingClientRect());
    }
    return rects;
}

function cancelDragAnimations() {
    for (const el of dragElements()) {
        const animation = dragAnimations.get(el);
        if (animation) {
            animation.cancel();
            dragAnimations.delete(el);
        }
    }
}

// FLIP：记录改动前后的位置，让被挤开的元素平滑移动到新位置
async function animateReorder(mutate) {
    const reduceMotion =
        !draft.transtion ||
        window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const before = reduceMotion ? null : snapshotRects();
    mutate();
    if (reduceMotion) return;
    await nextTick();
    cancelDragAnimations();
    const after = snapshotRects();

    for (const el of dragElements()) {
        const key = el.dataset.sejDragEl;
        const prev = before.get(key);
        const next = after.get(key);
        if (!prev || !next) continue;

        let dx = prev.left - next.left;
        let dy = prev.top - next.top;
        if (!dx && !dy) continue;

        // 嵌套元素（分类内的搜索引擎）需减去父级位移，避免重复偏移
        const parent = el.parentElement?.closest('[data-sej-drag-el]');
        if (parent) {
            const parentPrev = before.get(parent.dataset.sejDragEl);
            const parentNext = after.get(parent.dataset.sejDragEl);
            if (parentPrev && parentNext) {
                dx -= parentPrev.left - parentNext.left;
                dy -= parentPrev.top - parentNext.top;
            }
        }

        const animation = el.animate(
            [
                { transform: `translate(${dx}px, ${dy}px)` },
                { transform: 'translate(0, 0)' },
            ],
            {
                duration: DRAG_ANIMATION_MS,
                easing: 'cubic-bezier(0.2, 0, 0, 1)',
            },
        );
        dragAnimations.set(el, animation);
        animation.addEventListener('finish', () => {
            if (dragAnimations.get(el) === animation) {
                dragAnimations.delete(el);
            }
        });
    }
}

function captureOrder() {
    return {
        categories: draft.categories.map((category) => category._id),
        engines: Object.fromEntries(
            draft.categories.map((category) => [
                category._id,
                category.engines.map((engine) => engine._id),
            ]),
        ),
    };
}

function restoreOrder(snapshot) {
    const categories = new Map(
        draft.categories.map((category) => [category._id, category]),
    );
    const engines = new Map();
    for (const category of draft.categories) {
        for (const engine of category.engines) engines.set(engine._id, engine);
    }

    animateReorder(() => {
        for (const category of draft.categories) {
            const ids = snapshot.engines[category._id] || [];
            category.engines.splice(
                0,
                category.engines.length,
                ...ids.map((id) => engines.get(id)).filter(Boolean),
            );
        }
        const ordered = snapshot.categories
            .map((id) => categories.get(id))
            .filter(Boolean);
        draft.categories.splice(0, draft.categories.length, ...ordered);
    });
    dragCtx.value = null;
}

function onDragStart(e, type, ci, ei = null) {
    const category = draft.categories[ci];
    if (!category) return;
    const item = type === 'category' ? category : category.engines[ei];
    if (!item) return;

    dragSnapshot = captureOrder();
    dragDropped = false;
    dragCtx.value = {
        type,
        ci,
        ei: type === 'engine' ? ei : null,
        key: type === 'category' ? category.key : item._id,
    };

    e.dataTransfer.effectAllowed = 'move';
    // Firefox 需要写入数据才会真正开始拖动
    e.dataTransfer.setData('text/plain', '');
}

function onDragEnd() {
    const snapshot = dragSnapshot;
    dragSnapshot = null;
    if (!dragDropped && snapshot) {
        // 未落在可排序区域：恢复拖动前的顺序
        restoreOrder(snapshot);
    }
    dragDropped = false;
    dragCtx.value = null;
}

function onDrop(e) {
    if (!dragCtx.value) return;
    e.preventDefault();
    e.stopPropagation();
    dragDropped = true;
    dragCtx.value = null;
}

function moveCategoryTo(index) {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'category' || ctx.ci === index) return;
    const category = draft.categories[ctx.ci];
    if (!category) return;

    animateReorder(() => {
        draft.categories.splice(ctx.ci, 1);
        draft.categories.splice(index, 0, category);
        ctx.ci = index;
    });
}

function settingsBody() {
    return layerEl.value?.querySelector('#sej-settings-body') || null;
}

function categoryCards() {
    const body = settingsBody();
    return body
        ? Array.from(
              body.querySelectorAll('.iqxin-items[data-sej-drag-el^="category-"]'),
          )
        : [];
}

function layoutOffset(el) {
    let x = 0;
    let y = 0;
    let node = el;
    while (node) {
        x += node.offsetLeft;
        y += node.offsetTop;
        node = node.offsetParent;
    }
    return { x, y };
}

// 用布局位置（不含 FLIP transform）计算矩形：
// 动画进行中命中测试会落在过渡中的位置，导致来回抖动
function layoutRect(el) {
    const body = settingsBody();
    if (!body || !body.contains(el)) return el.getBoundingClientRect();
    const base = body.getBoundingClientRect();
    const bodyPos = layoutOffset(body);
    const elPos = layoutOffset(el);
    const width = el.offsetWidth;
    const height = el.offsetHeight;
    const left = base.left + elPos.x - bodyPos.x - body.scrollLeft;
    const top = base.top + elPos.y - bodyPos.y - body.scrollTop;
    return {
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
    };
}

function categoryIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
        const rect = layoutRect(cards[i]);
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
            return i;
        }
    }
    return -1;
}

function engineInsertIndex(card, y) {
    const items = Array.from(card.querySelectorAll(':scope > .sejcon > .drag'));
    for (let i = 0; i < items.length; i++) {
        const rect = layoutRect(items[i]);
        if (y < rect.top + rect.height / 2) return i;
    }
    return items.length;
}

function moveEngineTo(ci, insertBefore) {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'engine') return;
    const source = draft.categories[ctx.ci];
    const target = draft.categories[ci];
    const engine = source?.engines?.[ctx.ei];
    if (!engine || !target) return;

    const from = ctx.ei;
    let insert = Math.max(0, Math.min(insertBefore, target.engines.length));
    if (source === target) {
        // 落在自身原位或紧随其后时无需移动
        if (insert === from || insert === from + 1) return;
        if (from < insert) insert -= 1;
    }

    animateReorder(() => {
        source.engines.splice(from, 1);
        target.engines.splice(insert, 0, engine);
        ctx.ci = ci;
        ctx.ei = insert;
    });
}

// 统一按指针坐标 + 布局矩形判断目标位置，避免动画期间元素命中测试抖动
function onSettingsDragOver(e) {
    const ctx = dragCtx.value;
    if (!ctx) return;
    e.preventDefault();

    const ci = categoryIndexAt(e.clientX, e.clientY);
    if (ci < 0) return;

    if (ctx.type === 'category') {
        moveCategoryTo(ci);
        return;
    }

    const card = categoryCards()[ci];
    if (!card) return;
    moveEngineTo(ci, engineInsertIndex(card, e.clientY));
}

function addEngine(ci) {
    engineDialog.value = { mode: 'add', ci, initial: {} };
}

function editEngine(ci, ei) {
    engineDialog.value = {
        mode: 'edit',
        ci,
        ei,
        initial: { ...draft.categories[ci].engines[ei] },
    };
}

function cancelEngineDialog() {
    if (!engineSaving.value) engineDialog.value = null;
}

function deleteEngineFromDialog() {
    const ctx = engineDialog.value;
    if (!ctx || ctx.mode !== 'edit') return;
    engineDialog.value = null;
    deleteEngine(ctx.ci, ctx.ei);
}

async function submitEngine(engine) {
    const ctx = engineDialog.value;
    if (!ctx || engineSaving.value) return;
    if (!engine.name || !engine.url) {
        alert('标题和链接必填');
        return;
    }
    engineSaving.value = true;
    try {
        const list = draft.categories[ctx.ci].engines;
        const existing = ctx.mode === 'edit' ? list[ctx.ei] : null;
        const original = engine.favicon;
        const embedded =
            /^data:/i.test(engine.faviconData || '')
                ? engine.faviconData
                : existing?.faviconData && existing.favicon === original
                  ? existing.faviconData
                  : await embedFavicon(original);
        const next =
            ctx.mode === 'add'
                ? { ...engine, _id: nextId() }
                : { ...existing, ...engine };
        // 保留用户填写的原始链接，内嵌结果单独存放
        next.favicon = original;
        if (embedded !== original) {
            next.faviconData = embedded;
        } else {
            delete next.faviconData;
        }
        if (ctx.mode === 'add') {
            list.push(next);
        } else {
            list[ctx.ei] = next;
        }
        engineDialog.value = null;
    } finally {
        engineSaving.value = false;
    }
}

function createCategoryKey() {
    const base = 'user' + Date.now();
    let key = base;
    let index = 1;
    while (draft.categories.some((category) => category.key === key)) {
        key = `${base}-${index++}`;
    }
    return key;
}

async function addCategory() {
    draft.categories.push({
        _id: nextId(),
        name: '新分类',
        key: createCategoryKey(),
        enabled: true,
        engines: [],
    });
    await nextTick();
    const body = layerEl.value?.querySelector('#sej-settings-body');
    if (body) body.scrollTop = body.scrollHeight;
}

function isOnline() {
    if (online.value) return;
    const img = new Image();
    img.src =
        'https://www.google.com/s2/favicons?domain=www.baidu.com&' + Math.random();
    setTimeout(() => {
        if (img.width) online.value = true;
        else img.src = undefined;
    }, 2000);
}

function getICON(olink) {
    const link = olink || '';
    let protocol;
    let host;
    if (link.indexOf('://') !== -1) {
        protocol = link.split('://')[0] || 'https';
        host = link.split('://')[1].split('/')[0];
    } else {
        protocol = 'https';
        host = link.split('/')[0];
    }
    const siteURL = protocol + '://' + host;
    const iconSetting = settings.settingData.getIcon;
    let ourl;

    if (isNaN(iconSetting)) {
        ourl = iconSetting;
    } else {
        const mark = parseInt(iconSetting);
        if (mark === 1) ourl = siteURL + '/favicon.ico';
        else if (mark === 2) {
            ourl = 'https://www.google.com/s2/favicons?domain=' + siteURL;
        } else if (mark === 3) {
            ourl = 'https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=' + host;
        }
    }

    if (ourl) return ourl.replace('%s', siteURL);
    if (online.value) return 'https://www.google.com/s2/favicons?domain=' + host;
    return protocol + '://' + host + '/favicon.ico';
}

function openConfig() {
    configOpen.value = true;
}

function saveConfig(text) {
    if (text) {
        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            alert('JSON 解析失败');
            return;
        }
        settings.applySettings(parsed);
        setTimeout(requestRestart, 0);
    } else {
        reset();
    }
}

const dragging = ref(false);
let dragOffset = { x: 0, y: 0 };

function onDragMove(e) {
    layerStyle.value = {
        left: e.clientX - dragOffset.x + 'px',
        top: e.clientY - dragOffset.y + 'px',
        margin: 0,
    };
}

function stopDrag() {
    dragging.value = false;
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', stopDrag);
}

function startDrag(e) {
    const el = layerEl.value;
    dragOffset = { x: e.clientX - el.offsetLeft, y: e.clientY - el.offsetTop };
    dragging.value = true;
    document.addEventListener('mousemove', onDragMove);
    document.addEventListener('mouseup', stopDrag);
}

onMounted(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);
    isOnline();
    nextTick(() => {
        maskVisible.value = true;
    });
});

onBeforeUnmount(() => {
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', onKeydown);
    clearTimeout(closeTimer);
    document.removeEventListener('mousemove', onDragMove);
    document.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
    <div id="settingLayerMask" ref="maskEl" :style="{ display: 'flex', opacity: maskVisible ? 1 : 0 }" @click.self="close" @transitionend="onMaskTransitionEnd">
        <div id="settingLayer" ref="layerEl" :style="layerStyle" @click.stop>
            <div class="sej-panel-header" @mousedown="startDrag">
                <span class="sej-panel-title">搜索跳转设置</span>
                <button type="button" class="sej-panel-close" title="关闭" aria-label="关闭"
                    @click.stop="close" @mousedown.stop>✕</button>
            </div>
            <!-- 引擎列表管理区域 -->
            <div id="sej-settings-body" @dragover="onSettingsDragOver" @drop="onDrop">
                <!-- 分类列表 -->
                <div v-for="(category, ci) in draft.categories" :id="category.key" :key="category._id"
                    class="iqxin-items" :class="{ 'sej-category-hidden': !category.enabled }"
                    :data-sej-drag-el="'category-' + category._id">
                    <!-- 类别标题 -->
                    <div class="sejtitle drag" draggable="true" :data-xin="category.enabled ? 1 : -1"
                        :data-iqxintitle="category.key"
                        :class="{ 'sej-dragging': dragCtx?.type === 'category' && dragCtx.ci === ci }"
                        @dragstart="onDragStart($event, 'category', ci)" @dragend="onDragEnd"
                        @click.stop="toggleCategory(ci)">
                        <span class="iqxin-pointer-events">{{ category.name }}</span>
                        <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': !category.enabled }"
                            :title="category.enabled ? '隐藏' : '显示'" @click.stop="toggleCategory(ci)"
                            v-html="category.enabled ? EYE : EYE_OFF"></span>
                        <span class="iqxin-title-edit" title="设置 Settings" @click.stop="openCategoryDialog(ci)">
                            <img class="sej-engine-icon" :src="editIcon" alt="" />
                        </span>
                    </div>

                    <!-- 具体条目 -->
                    <div class="sejcon" :data-sej-drag-el="'list-' + category._id">
                        <!-- 每个搜索引擎 -->
                        <span v-for="(engine, ei) in category.engines" :key="engine._id" class="drag" draggable="true"
                            :data-sej-drag-el="'engine-' + engine._id"
                            :class="{ 'sej-dragging': dragCtx?.type === 'engine' && dragCtx.key === engine._id }"
                            @dragstart="onDragStart($event, 'engine', ci, ei)" @dragend="onDragEnd"
                            @click.stop="toggleEngine(ci, ei)">
                            <span class="sej-engine" :data-iqxintitle="engine.name" :data-iqxinimg="engine.favicon"
                                :data-iqxinlink="engine.url" :data-iqxintarget="engine.blank ? '_blank' : null"
                                :data-iqxindisabled="engine.disable ? 'true' : null"
                                :data-iqxingbk="engine.gbk ? 'true' : null">
                                <img class="sej-engine-icon" :src="getFaviconSrc(engine)" alt="" />
                                <span>{{ engine.name }}</span>
                            </span>
                            <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': engine.disable }"
                                :title="engine.disable ? '显示' : '隐藏'" @click.stop="toggleEngine(ci, ei)"
                                v-html="engine.disable ? EYE_OFF : EYE"></span>
                            <span class="iqxin-set-edit" title="设置 Settings" @click.stop="editEngine(ci, ei)">
                                <img class="sej-engine-icon" :src="editIcon" alt="" />
                            </span>
                        </span>
                        <!-- 添加搜索引擎按钮(默认隐藏) -->
                        <span class="iqxin-additem" @click.stop="addEngine(ci)">+</span>
                    </div>
                </div>
                <!-- 新增分类占位卡片 -->
                <div class="iqxin-items sej-add-category-card" role="button" tabindex="0"
                    title="添加列表" aria-label="添加列表"
                    @click="addCategory" @keydown.enter="addCategory" @keydown.space.prevent="addCategory">
                    <span class="sej-add-category-plus">+</span>
                </div>
            </div>
            <!-- 底部设置按钮区域 -->
            <div id="btnEle">
                <div class="btnEleLayer">
                    <div class="sej-footer-options">
                        <span id="xin-modification" title="配置文件" @click="openConfig">配置文件</span>
                        <span id="xin-selectSearch" title="划词搜索">
                            <label>划词搜索<input type="checkbox" v-model="draft.selectSearch" /></label>
                        </span>
                        <span id="xin-transtion" title="动画">
                            <label>动画<input type="checkbox" v-model="draft.transtion" /></label>
                        </span>
                        <span id="iqxin-fixedTopS" title="固定到顶端">
                            <label>固定到顶端<input type="checkbox" v-model="draft.fixedTop" /></label>
                        </span>
                        <span v-show="draft.fixedTop" id="iqxin-fixedTopUpward" title="仅上拉显示">
                            <label>仅上拉显示<input type="checkbox" v-model="draft.fixedTopUpward" /></label>
                        </span>
                        <span id="xin-HideTheSameLink" title="隐藏同站链接">
                            <label>隐藏同站链接<input type="checkbox" v-model="draft.HideTheSameLink" /></label>
                        </span>
                    </div>
                    <div class="sej-footer-bar">
                        <div class="sej-footer-selects">
                            <span id="xin-centerDisplay" title="居中显示">
                                居中：
                                <select v-model.number="draft.center">
                                    <option :value="0">默认</option>
                                    <option :value="1">强制</option>
                                    <option :value="2">自动</option>
                                </select>
                            </span>
                            <span id="xin-newtab" title="是否采用新标签页打开">
                                打开方式：
                                <select v-model.number="draft.newtab">
                                    <option :value="0">默认页面</option>
                                    <option :value="1">新标签页</option>
                                </select>
                            </span>
                            <span id="xin-loadIcons" title="把所有远程图标内嵌为 data 链接"
                                :class="{ 'sej-loading': loadingIcons }" @click="loadAllIcons">
                                {{ loadingIcons ? '加载中…' : '加载所有图标缓存' }}
                            </span>
                        </div>
                        <div class="sej-footer-links">
                            <span class="feedback" title="在 GreasyFork 进行反馈">
                                <a target="_blank" href="https://greasyfork.org/zh-CN/users/1238054">Greasy
                                    Fork</a>
                            </span>
                            <span class="feedback" title="在 Github 进行反馈">
                                <a target="_blank" href="https://github.com/sherlocknieh/Monkey-Scripts">GitHub</a>
                            </span>
                        </div>
                        <div class="sej-footer-actions">
                            <span id="xin-save" title="save & close" :class="{ 'sej-saving': saving }" @click="save">
                                {{ saving ? '保存中…' : '保存并关闭' }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <EngineEditDialog v-if="engineDialog" :mode="engineDialog.mode" :initial="engineDialog.initial"
                :busy="engineSaving" :resolve-icon="getICON" @submit="submitEngine"
                @delete="deleteEngineFromDialog" @cancel="cancelEngineDialog" />

            <CategoryEditDialog v-if="categoryDialog"
                :name="draft.categories[categoryDialog.index]?.name || ''" @submit="submitCategory"
                @delete="deleteCategoryFromDialog" @cancel="cancelCategoryDialog" />

            <ConfigEditor v-if="configOpen" :initial-text="configText" @save="saveConfig" @reset="reset"
                @close="configOpen = false" @copy="showToast('复制成功')" @notify="showToast" />
        </div>
    </div>
</template>
