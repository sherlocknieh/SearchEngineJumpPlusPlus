<script setup>
import {
    computed,
    nextTick,
    onBeforeUnmount,
    onMounted,
    reactive,
    ref,
    watch,
} from 'vue';
import { deleteValue, isSameValue } from '../core/storage.js';
import { mergeIntoCategories } from '../core/configMerge.js';
import { useSettings, STORAGE_KEY } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { embedFavicon, getFaviconSrc, resolveFavicon } from '../core/favicon.js';
import { closeSettingPanel, showToast, ui } from '../stores/ui.js';
import {
    localizeCategoryName,
    localizeEngineName,
    setLanguagePreference,
    t,
} from '../i18n/index.js';
import EngineEditDialog from './EngineEditDialog.vue';
import CategoryEditDialog from './CategoryEditDialog.vue';
import ConfigEditor from './ConfigEditor.vue';
const COPY =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>';
const EYE =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>';
const EYE_OFF =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>';
const PENCIL =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>';
const TRASH =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>';

const settings = useSettings();
const source = computed(() => settings.settingData);

function displayCategoryName(category) {
    if (!category) return '';
    return localizeCategoryName(category.name, category.key);
}

const OPTION_KEYS = [
    'fixedTop',
    'fixedTopUpward',
    'HideTheSameLink',
    'center',
    'transtion',
    'selectSearch',
    'language',
];

let uid = 1;
const nextId = () => uid++;

function makeDraft() {
    const raw = JSON.parse(JSON.stringify(source.value));
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

const UNDO_DURATION = 5000;
const undoStack = [];

const configText = computed(() => {
    const clean = JSON.parse(JSON.stringify(source.value));
    if (clean.engineList) delete clean.engineList.engineCategories;
    return JSON.stringify(clean, null, 4);
});

function buildEngineData() {
    const engineCategories = draft.categories.map((cat) => [
        cat.name,
        cat.key,
        cat.enabled,
    ]);
    const engineList = {};
    for (const cat of draft.categories) {
        engineList[cat.key] = cat.engines.map((engine) => {
            const item = {
                name: engine.name,
                url: engine.url,
            };
            if (engine.favicon) item.favicon = engine.favicon;
            if (engine.faviconData) item.faviconData = engine.faviconData;
            if (engine.target === '_self') item.target = '_self';
            if (engine.disable) item.disable = true;
            return item;
        });
    }
    return { engineCategories, engineList };
}

function buildResult() {
    const result = {};
    for (const key of OPTION_KEYS) result[key] = draft[key];
    Object.assign(result, buildEngineData());
    // version 由保存时刷新；这里沿用当前值，避免无改动也被判为有修改
    result.version = source.value.version;
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

// 重要编辑（增删改搜索引擎、调整排序、启停分类/引擎、开关选项）后自动保存。
// 文本输入只写入草稿，提交后才触发这里，避免逐字写入存储。
const AUTOSAVE_DELAY = 500;
let autosaveTimer = null;
let autosaveQueued = false;
let autosaveWarnedLocal = false;
let settingsChanged = false;

function cancelAutoSave() {
    autosaveQueued = false;
    clearTimeout(autosaveTimer);
    autosaveTimer = null;
}

function flushAutoSave() {
    autosaveTimer = null;
    if (!autosaveQueued || saving.value) return;
    autosaveQueued = false;

    const next = buildResult();
    if (isSameValue(next, source.value)) return;

    const backend = settings.savePartial(next);
    if (backend === 'memory') {
        showToast(t('toast.autoSaveFailed'), 5000);
        return;
    }
    settingsChanged = true;
    if (backend === 'local' && !autosaveWarnedLocal) {
        autosaveWarnedLocal = true;
        showToast(t('toast.autoSavedLocal'), 3000);
    }
}

function scheduleAutoSave() {
    if (saving.value) return;
    autosaveQueued = true;
    clearTimeout(autosaveTimer);
    autosaveTimer = setTimeout(flushAutoSave, AUTOSAVE_DELAY);
}

// 底部开关、下拉框等离散修改也自动保存；文本输入仍只在提交时写入
watch(
    () => OPTION_KEYS.map((key) => draft[key]),
    () => scheduleAutoSave(),
);

// 语言切换立即生效（仍需自动保存后才持久化）
watch(
    () => draft.language,
    (value) => setLanguagePreference(value),
);

function refreshDraft() {
    const next = makeDraft();
    for (const key of OPTION_KEYS) draft[key] = next[key];
    draft.categories.splice(0, draft.categories.length, ...next.categories);
}

// 其他页面保存后尝试同步：无本地修改时直接刷新，有冲突时提供手动同步
function trySyncFromRemote() {
    if (saving.value) return;
    const hasLocalChanges = !isSameValue(buildResult(), source.value);
    if (engineDialog.value || categoryDialog.value || configOpen.value || hasLocalChanges) {
        showToast(t('toast.remoteConflict'), 6000, {
            label: t('toast.syncAction'),
            onClick: forceSyncFromRemote,
        });
        return;
    }
    if (!settings.reload()) return;
    refreshDraft();
    remoteSynced = true;
    showToast(t('toast.synced'), 3000);
}

// 放弃面板内未提交的修改，直接采用存储中的最新设置
function forceSyncFromRemote() {
    engineDialog.value = null;
    categoryDialog.value = null;
    configOpen.value = false;
    cancelAutoSave();
    settings.reload();
    refreshDraft();
    remoteSynced = true;
    showToast(t('toast.synced'), 3000);
}

watch(() => ui.settingsRevision, trySyncFromRemote);

async function save() {
    if (saving.value) return;
    cancelAutoSave();
    saving.value = true;
    try {
        if (!isSameValue(buildResult(), source.value)) {
            const backend = settings.applySettings(buildResult());
            if (backend === 'memory') {
                showToast(t('toast.saveFailed'), 5000);
                return;
            }
            settingsChanged = true;
            if (backend === 'local') {
                showToast(t('toast.savedLocal'), 4000);
            }
        }
    } finally {
        saving.value = false;
    }
    close();
}

async function loadAllIcons() {
    if (loadingIcons.value || saving.value) return;
    const pending = remoteFaviconEngines().length;
    if (!pending) {
        showToast(t('toast.noIcons'));
        return;
    }
    loadingIcons.value = true;
    try {
        showToast(t('toast.embeddingIcons', { count: pending }), 60000);
        const { converted, failed } = await embedRemoteFavicons();
        const parts = [];
        if (converted) parts.push(t('toast.embeddedIcons', { count: converted }));
        if (!converted && !failed) parts.push(t('toast.noLoadableIcons'));
        else if (failed) parts.push(t('toast.iconsFailed', { count: failed }));
        const separator = t('toast.listSeparator');
        if (converted) {
            scheduleAutoSave();
            showToast(
                `${parts.join(separator)}${t('toast.autoSavedSuffix')}`,
                4000,
            );
        } else {
            showToast(parts.join(separator), 4000);
        }
    } finally {
        loadingIcons.value = false;
    }
}

function reset(exported = false) {
    const message = exported
        ? t('reset.confirmExported')
        : t('reset.confirm');
    if (confirm(message)) {
        cancelAutoSave();
        remoteSynced = false;
        deleteValue(STORAGE_KEY);
        location.reload();
    }
}

let closeTimer = null;
let closed = false;
// 面板内合并了其他页面写入的设置后，关闭面板时重建一次以刷新跳转条
let remoteSynced = false;

function finishClose() {
    if (closed) return;
    closed = true;
    clearTimeout(closeTimer);
    closeTimer = null;
    // 关闭前落盘尚未触发的自动保存
    if (autosaveQueued) {
        clearTimeout(autosaveTimer);
        flushAutoSave();
    }
    closeSettingPanel();
    if (remoteSynced || settingsChanged) {
        remoteSynced = false;
        settingsChanged = false;
        setTimeout(requestRestart, 0);
    }
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
    scheduleAutoSave();
    showToast(category.enabled ? t('common.enabled') : t('common.hidden'));
}

function toggleEngine(ci, ei) {
    const engine = draft.categories[ci].engines[ei];
    engine.disable = !engine.disable;
    scheduleAutoSave();
    showToast(engine.disable ? t('common.hidden') : t('common.enabled'));
}

function pushUndo(entry) {
    undoStack.push(entry);
    if (undoStack.length > 20) undoStack.shift();
}

function undoDelete() {
    if (engineDialog.value || categoryDialog.value || configOpen.value) {
        showToast(t('toast.dialogOpen'));
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
            showToast(t('toast.categoryMissing'));
            return;
        }
        const index = Math.min(entry.index, category.engines.length);
        category.engines.splice(index, 0, entry.item);
    }

    categoryDialog.value = null;
    scheduleAutoSave();
    showToast(t('toast.undoDelete', { label: entry.label }));
}

function notifyDeleted(entry, label) {
    pushUndo({ ...entry, label });
    showToast(t('toast.deleted', { label }), UNDO_DURATION, {
        label: t('common.undo'),
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
        t('category.label', { name: displayCategoryName(category) }),
    );
    draft.categories.splice(index, 1);
    scheduleAutoSave();
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
        t('engine.label', { name: localizeEngineName(engine.name) }),
    );
    category.engines.splice(ei, 1);
    scheduleAutoSave();
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
    if (consumeClickSuppression()) return;
    categoryDialog.value = { index };
}

function submitCategory(name) {
    const ctx = categoryDialog.value;
    if (!ctx) return;
    const category = draft.categories[ctx.index];
    if (category) {
        const nextName = name || t('category.emptyName');
        if (category.name !== nextName) {
            category.name = nextName;
            scheduleAutoSave();
        }
    }
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
// 拖动搜索引擎时指针所在的“加号”分类，用于复刻提示
const copyTargetCi = ref(null);
const dragAnimations = new WeakMap();
const DRAG_ANIMATION_MS = 160;
const DRAG_THRESHOLD = 4;
const DRAG_EDGE = 40;
// 触屏：长按启动拖动，轻微移动仍视为点击/滚动
const TOUCH_LONG_PRESS_MS = 280;
const TOUCH_MOVE_SLOP = 10;
let dragSnapshot = null;
let dragDropped = false;
let pressCtx = null;
let pressTimer = 0;
let ghostEl = null;
let ghostOffset = { x: 0, y: 0 };
let suppressClick = false;
let scrollFrame = 0;

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

function sourceElement(type, ci, ei) {
    if (type === 'category') return categoryCards()[ci] || null;
    const card = categoryCards()[ci];
    if (!card) return null;
    return card.querySelectorAll(':scope > .sejcon > .drag')[ei] || null;
}

// 拖动开始前先记录按下的位置，移动超过阈值才真正进入拖动，避免影响点击编辑
// 触屏则改为长按启动，避免与页面/列表滚动冲突
function onDragPointerDown(e, type, ci, ei = null) {
    // 上一次拖动可能因窗口失焦等原因没有正常结束，先清理残留状态
    resetStaleDrag();
    suppressClick = false;
    const touch = e.pointerType === 'touch';
    if (touch && e.isPrimary === false) return;
    if (!touch && e.button !== 0) return;
    if (e.target?.closest?.('.iqxin-set-toggle, .sej-hover-delete')) return;
    const sourceEl = sourceElement(type, ci, ei);
    if (!sourceEl) return;

    pressCtx = {
        type,
        ci,
        ei: type === 'engine' ? ei : null,
        sourceEl,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        x: e.clientX,
        y: e.clientY,
        touch,
        activated: !touch,
        started: false,
    };
    document.addEventListener('pointermove', onDragPointerMove);
    document.addEventListener('pointerup', onDragPointerUp);
    document.addEventListener('pointercancel', onDragPointerCancel);

    if (touch) {
        pressTimer = setTimeout(() => {
            pressTimer = 0;
            const p = pressCtx;
            if (!p || p.started) return;
            p.activated = true;
            if (beginDrag()) {
                blockTouchScroll(true);
            } else {
                finishPress();
            }
        }, TOUCH_LONG_PRESS_MS);
    }
}

function clearPressTimer() {
    if (!pressTimer) return;
    clearTimeout(pressTimer);
    pressTimer = 0;
}

// 触屏开始拖动后拦截 touchmove，阻止浏览器接管手势（滚动/缩放）导致拖动中断
function onBlockTouchMove(e) {
    if (dragCtx.value) e.preventDefault();
}

function blockTouchScroll(block) {
    document.removeEventListener('touchmove', onBlockTouchMove);
    if (block) {
        document.addEventListener('touchmove', onBlockTouchMove, {
            passive: false,
        });
    }
}

function resetStaleDrag() {
    if (!pressCtx && !ghostEl) return;
    if (dragSnapshot) {
        restoreOrder(dragSnapshot);
        dragSnapshot = null;
    }
    dragDropped = false;
    cleanupDrag();
    finishPress();
}

function onWindowBlur() {
    if (!pressCtx) return;
    if (pressCtx.started) {
        resetStaleDrag();
        suppressClick = true;
    } else {
        finishPress();
    }
}

function detachDragListeners() {
    document.removeEventListener('pointermove', onDragPointerMove);
    document.removeEventListener('pointerup', onDragPointerUp);
    document.removeEventListener('pointercancel', onDragPointerCancel);
    blockTouchScroll(false);
}

function beginDrag() {
    const p = pressCtx;
    const category = draft.categories[p.ci];
    if (!category) return false;
    const item = p.type === 'category' ? category : category.engines[p.ei];
    if (!item) return false;

    const rect = p.sourceEl.getBoundingClientRect();
    ghostOffset = { x: p.x - rect.left, y: p.y - rect.top };

    dragSnapshot = captureOrder();
    dragDropped = false;
    copyTargetCi.value = null;

    // 用整块元素做跟手副本：拖动类别时整个类别框跟随鼠标，且保持不透明
    const ghost = p.sourceEl.cloneNode(true);
    ghost.removeAttribute('id');
    ghost.removeAttribute('data-sej-drag-el');
    ghost.querySelectorAll('[data-sej-drag-el]').forEach((el) => {
        el.removeAttribute('data-sej-drag-el');
    });
    ghost.classList.remove('sej-drag-placeholder');
    ghost.classList.add('sej-drag-ghost', `sej-drag-ghost-${p.type}`);
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    // 挂在设置面板内，保证副本沿用面板与条目的样式
    (layerEl.value || p.sourceEl.getRootNode()).appendChild(ghost);
    ghostEl = ghost;

    dragCtx.value = {
        type: p.type,
        ci: p.ci,
        ei: p.ei,
        key: p.type === 'category' ? category.key : item._id,
    };
    p.started = true;
    positionGhost(p.x, p.y);
    // 触屏：轻微震动提示已进入拖动（不支持的浏览器会忽略）
    if (p.touch) {
        try {
            navigator.vibrate?.(12);
        } catch (e) {
            // ignore
        }
    }
    startAutoScroll();
    return true;
}

function positionGhost(x, y) {
    if (!ghostEl) return;
    ghostEl.style.transform = `translate3d(${x - ghostOffset.x}px, ${
        y - ghostOffset.y
    }px, 0)`;
}

function onDragPointerMove(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    p.x = e.clientX;
    p.y = e.clientY;

    if (!p.started) {
        const distance = Math.hypot(p.x - p.startX, p.y - p.startY);
        if (p.touch) {
            // 长按开始前移动超出容差：交给页面滚动，取消拖动准备
            if (!p.activated && distance > TOUCH_MOVE_SLOP) finishPress();
            return;
        }
        if (distance < DRAG_THRESHOLD) return;
        if (!beginDrag()) {
            finishPress();
            return;
        }
    }

    if (e.cancelable) e.preventDefault();
    positionGhost(p.x, p.y);
    updateDragTarget(p.x, p.y);
}

function addItemIndexAt(x, y) {
    const cards = categoryCards();
    for (let i = 0; i < cards.length; i++) {
        const add = cards[i].querySelector(':scope > .sejcon > .iqxin-additem');
        if (!add) continue;
        const rect = layoutRect(add);
        if (
            x >= rect.left &&
            x <= rect.right &&
            y >= rect.top &&
            y <= rect.bottom
        ) {
            return i;
        }
    }
    return -1;
}

function updateDragTarget(x, y) {
    const ctx = dragCtx.value;
    if (!ctx) return;
    const body = settingsBody();
    if (!body) return;

    const bodyRect = body.getBoundingClientRect();
    const inside =
        x >= bodyRect.left &&
        x <= bodyRect.right &&
        y >= bodyRect.top &&
        y <= bodyRect.bottom;
    dragDropped = inside;
    if (!inside) {
        copyTargetCi.value = null;
        return;
    }

    // 搜索引擎拖到加号上：保持原位置不动，改为提示复刻
    if (ctx.type === 'engine') {
        const copyCi = addItemIndexAt(x, y);
        if (copyCi >= 0) {
            copyTargetCi.value = copyCi;
            return;
        }
    }
    copyTargetCi.value = null;

    const ci = categoryIndexAt(x, y);
    if (ci < 0) return;

    if (ctx.type === 'category') {
        moveCategoryTo(ci);
        return;
    }

    const card = categoryCards()[ci];
    if (card) moveEngineTo(ci, engineInsertIndex(card, y));
}

function copyEngineToCategory() {
    const ctx = dragCtx.value;
    if (!ctx || ctx.type !== 'engine') return;
    const targetCi = copyTargetCi.value;
    const source = draft.categories[ctx.ci]?.engines?.[ctx.ei];
    const targetKey = draft.categories[targetCi]?.key;
    const copy = source
        ? { ...JSON.parse(JSON.stringify(source)), _id: nextId() }
        : null;
    // 途中经过其他条目时可能已临时换位，复刻时恢复原有排序
    if (dragSnapshot) {
        restoreOrder(dragSnapshot);
        dragSnapshot = null;
    }
    if (copy) {
        const target = draft.categories.find(
            (category) => category.key === targetKey,
        );
        if (target) {
            target.engines.push(copy);
            scheduleAutoSave();
            showToast(
                t('toast.copied', {
                    name: localizeEngineName(source.name),
                }),
            );
        }
    }
}

function finishDrag() {
    const snapshot = dragSnapshot;
    if (dragCtx.value?.type === 'engine' && copyTargetCi.value != null) {
        copyEngineToCategory();
    } else if (dragDropped) {
        scheduleAutoSave();
    } else if (snapshot) {
        // 未落在可排序区域：恢复拖动前的顺序
        restoreOrder(snapshot);
    }
    dragSnapshot = null;
    dragDropped = false;
    cleanupDrag();
    suppressClick = true;
    finishPress();
}

function cleanupDrag() {
    stopAutoScroll();
    if (ghostEl) {
        ghostEl.remove();
        ghostEl = null;
    }
    if (pressCtx?.sourceEl) {
        pressCtx.sourceEl.classList.remove('sej-drag-placeholder');
    }
    dragCtx.value = null;
    copyTargetCi.value = null;
}

function finishPress() {
    clearPressTimer();
    detachDragListeners();
    pressCtx = null;
}

function onDragPointerUp(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    if (!p.started) {
        finishPress();
        return;
    }
    finishDrag();
}

function onDragPointerCancel(e) {
    const p = pressCtx;
    if (!p || e.pointerId !== p.pointerId) return;
    if (p.started) {
        if (dragSnapshot) restoreOrder(dragSnapshot);
        dragSnapshot = null;
        dragDropped = false;
        cleanupDrag();
        suppressClick = true;
    }
    finishPress();
}

// 拖动结束时浏览器仍会补发 click，忽略这次点击，避免误打开编辑框
function consumeClickSuppression() {
    if (!suppressClick) return false;
    suppressClick = false;
    return true;
}

function startAutoScroll() {
    if (scrollFrame) return;
    const tick = () => {
        scrollFrame = 0;
        if (!dragCtx.value || !pressCtx) return;
        const body = settingsBody();
        if (body) {
            const rect = body.getBoundingClientRect();
            const { x, y } = pressCtx;
            let dy = 0;
            if (x >= rect.left && x <= rect.right) {
                if (y < rect.top + DRAG_EDGE && y >= rect.top - DRAG_EDGE) {
                    dy = -Math.ceil(
                        ((rect.top + DRAG_EDGE - y) / DRAG_EDGE) * 14,
                    );
                } else if (
                    y > rect.bottom - DRAG_EDGE &&
                    y <= rect.bottom + DRAG_EDGE
                ) {
                    dy = Math.ceil(
                        ((y - rect.bottom + DRAG_EDGE) / DRAG_EDGE) * 14,
                    );
                }
            }
            if (dy) {
                body.scrollTop += dy;
                updateDragTarget(x, y);
            }
        }
        if (dragCtx.value) scrollFrame = requestAnimationFrame(tick);
    };
    scrollFrame = requestAnimationFrame(tick);
}

function stopAutoScroll() {
    if (scrollFrame) cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
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

function addEngine(ci) {
    engineDialog.value = { mode: 'add', ci, initial: {} };
}

function editEngine(ci, ei) {
    if (consumeClickSuppression()) return;
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
        alert(t('engine.required'));
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
                  : '';
        const next =
            ctx.mode === 'add'
                ? { ...engine, _id: nextId() }
                : { ...existing, ...engine };
        // 保留用户填写的原始链接，内嵌结果单独存放
        next.favicon = original;
        if (embedded && embedded !== original) {
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
        scheduleAutoSave();
        // 图标在后台获取，不阻塞保存；拿到后再更新并自动保存
        const token = bumpIconToken(next._id);
        if (!next.faviconData) loadFaviconInBackground(next._id, original, token);
    } finally {
        engineSaving.value = false;
    }
}

function findEngineById(id) {
    for (const category of draft.categories) {
        const engine = category.engines.find((item) => item._id === id);
        if (engine) return engine;
    }
    return null;
}

// 每个条目的图标加载版本号，用于丢弃过期的后台结果
const iconLoadTokens = new Map();

function bumpIconToken(id) {
    const token = (iconLoadTokens.get(id) || 0) + 1;
    iconLoadTokens.set(id, token);
    return token;
}

async function loadFaviconInBackground(id, url, token) {
    if (!/^https?:\/\//i.test(url)) return;
    const { data, reason } = await resolveFavicon(url);
    if (iconLoadTokens.get(id) !== token) return;
    const engine = findEngineById(id);
    // 图标在此期间被修改或该条目已删除时丢弃结果
    if (!engine || engine.favicon !== url) return;
    if (!data) {
        console.warn(
            '[SEJ] 后台获取图标失败:',
            url,
            reason || t('favicon.backgroundFailed'),
        );
        return;
    }
    engine.faviconData = data;
    scheduleAutoSave();
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
        name: t('category.newName'),
        key: createCategoryKey(),
        enabled: true,
        engines: [],
    });
    scheduleAutoSave();
    await nextTick();
    const body = layerEl.value?.querySelector('#sej-settings-body');
    if (body) body.scrollTop = body.scrollHeight;
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
    const iconSetting = ui.iconSource;
    // 非数字时视为自定义地址模板，%s 会替换为站点地址；否则用站点自带的 /favicon.ico
    const template = isNaN(iconSetting) ? iconSetting : '';
    return (template || siteURL + '/favicon.ico').replace('%s', siteURL);
}

function openConfig() {
    configOpen.value = true;
}

// 合并导入：只把配置中的分类/引擎追加到草稿，保留当前设置与已有条目
function mergeConfig(rawText) {
    let parsed;
    try {
        parsed = JSON.parse(rawText);
    } catch (e) {
        alert(t('config.parseFailed'));
        return;
    }

    const stats = mergeIntoCategories(draft.categories, parsed, nextId);
    if (!stats) {
        alert(t('config.mergeUnrecognized'));
        return;
    }

    if (!stats.engines) {
        showToast(t('toast.mergeNothing'), 3000);
        return;
    }

    settingsChanged = true;
    configOpen.value = false;
    // 合并结果进入草稿后立即落盘，与其他重要编辑的处理方式一致
    scheduleAutoSave();
    const parts = [t('toast.mergedEngines', { count: stats.engines })];
    if (stats.categories) {
        parts.push(t('toast.mergedCategories', { count: stats.categories }));
    }
    if (stats.skipped) {
        parts.push(t('toast.mergedSkipped', { count: stats.skipped }));
    }
    showToast(
        t('toast.mergeImported', {
            summary: parts.join(t('toast.listSeparator')),
        }),
        4000,
    );
}

function saveConfig(text) {
    if (text) {
        let parsed;
        try {
            parsed = JSON.parse(text);
        } catch (e) {
            alert(t('config.parseFailed'));
            return;
        }
        cancelAutoSave();
        remoteSynced = false;
        settings.applySettings(parsed);
        setTimeout(requestRestart, 0);
    } else {
        reset();
    }
}

const dragging = ref(false);
let dragOffset = { x: 0, y: 0 };
let dragPointerId = null;

function onDragMove(e) {
    if (dragPointerId != null && e.pointerId !== dragPointerId) return;
    const el = layerEl.value;
    if (!el) return;
    // 面板绝对定位在遮罩内，需补偿遮罩自身的滚动偏移
    const mask = maskEl.value;
    const scrollLeft = mask ? mask.scrollLeft : 0;
    const scrollTop = mask ? mask.scrollTop : 0;
    // 限制面板始终留在可视区域内，避免触屏拖出屏幕后无法找回
    const maxLeft = scrollLeft + Math.max(0, window.innerWidth - el.offsetWidth);
    const maxTop = scrollTop + Math.max(0, window.innerHeight - el.offsetHeight);
    layerStyle.value = {
        left:
            Math.min(
                Math.max(e.clientX - dragOffset.x + scrollLeft, scrollLeft),
                maxLeft,
            ) + 'px',
        top:
            Math.min(
                Math.max(e.clientY - dragOffset.y + scrollTop, scrollTop),
                maxTop,
            ) + 'px',
        margin: 0,
    };
    if (e.cancelable) e.preventDefault();
}

function stopDrag(e) {
    if (dragPointerId != null && e?.pointerId !== dragPointerId) return;
    dragging.value = false;
    dragPointerId = null;
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', stopDrag);
    document.removeEventListener('pointercancel', stopDrag);
}

function startDrag(e) {
    if (e.pointerType !== 'touch' && e.button !== 0) return;
    if (e.pointerType === 'touch' && e.isPrimary === false) return;
    if (e.target?.closest?.('.sej-panel-close')) return;
    const el = layerEl.value;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    dragPointerId = e.pointerId;
    dragging.value = true;
    document.addEventListener('pointermove', onDragMove);
    document.addEventListener('pointerup', stopDrag);
    document.addEventListener('pointercancel', stopDrag);
}

onMounted(() => {
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onKeydown);
    window.addEventListener('blur', onWindowBlur);
    nextTick(() => {
        maskVisible.value = true;
    });
});

onBeforeUnmount(() => {
    // 关闭面板时立即落盘尚未触发的自动保存，避免刚完成的编辑丢失
    if (autosaveQueued) {
        clearTimeout(autosaveTimer);
        flushAutoSave();
    }
    detachDragListeners();
    clearPressTimer();
    stopAutoScroll();
    if (ghostEl) {
        ghostEl.remove();
        ghostEl = null;
    }
    dragCtx.value = null;
    copyTargetCi.value = null;
    document.body.style.overflow = 'auto';
    document.removeEventListener('keydown', onKeydown);
    window.removeEventListener('blur', onWindowBlur);
    clearTimeout(closeTimer);
    document.removeEventListener('pointermove', onDragMove);
    document.removeEventListener('pointerup', stopDrag);
    document.removeEventListener('pointercancel', stopDrag);
    // 未保存的语言选择不带到面板外
    setLanguagePreference(settings.settingData.language);
});
</script>

<template>
    <div id="settingLayerMask" ref="maskEl" :style="{ display: 'flex', opacity: maskVisible ? 1 : 0 }" @click.self="close" @transitionend="onMaskTransitionEnd">
        <div id="settingLayer" ref="layerEl" :style="layerStyle" @click.stop>
            <div class="sej-panel-header" @pointerdown="startDrag" @contextmenu.prevent>
                <span class="sej-panel-title">{{ t('settings.title') }}</span>
                <button type="button" class="sej-panel-close" :title="t('settings.close')" :aria-label="t('settings.close')"
                    @click.stop="close" @pointerdown.stop>✕</button>
            </div>
            <!-- 引擎列表管理区域；长按条目在触屏上进入拖动，禁止原生长按菜单 -->
            <div id="sej-settings-body" @dragstart.prevent @contextmenu.prevent>
                <!-- 分类列表 -->
                <div v-for="(category, ci) in draft.categories" :id="category.key" :key="category._id"
                    class="iqxin-items"
                    :class="{ 'sej-category-hidden': !category.enabled, 'sej-drag-placeholder': dragCtx?.type === 'category' && dragCtx.key === category.key }"
                    :data-sej-drag-el="'category-' + category._id">
                    <!-- 类别标题 -->
                    <div class="sejtitle drag" :data-xin="category.enabled ? 1 : -1"
                        :data-iqxintitle="category.key"
                        :title="t('settings.editCategory', { name: displayCategoryName(category) })"
                        @pointerdown="onDragPointerDown($event, 'category', ci)"
                        @click.stop="openCategoryDialog(ci)">
                        <span class="iqxin-pointer-events">{{ displayCategoryName(category) }}</span>
                        <span class="sej-hover-edit" v-html="PENCIL"></span>
                        <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': !category.enabled }"
                            :title="category.enabled ? t('common.hide') : t('common.show')" @click.stop="toggleCategory(ci)"
                            v-html="category.enabled ? EYE : EYE_OFF"></span>
                        <span class="sej-hover-delete" :title="t('settings.deleteCategory')" @pointerdown.stop
                            @click.stop="deleteCategory(ci)" v-html="TRASH"></span>
                    </div>

                    <!-- 具体条目 -->
                    <div class="sejcon" :data-sej-drag-el="'list-' + category._id">
                        <!-- 每个搜索引擎 -->
                        <span v-for="(engine, ei) in category.engines" :key="engine._id" class="drag"
                            :data-sej-drag-el="'engine-' + engine._id"
                            :class="{ 'sej-drag-placeholder': dragCtx?.type === 'engine' && dragCtx.key === engine._id }"
                            :title="t('settings.editEngine', { name: localizeEngineName(engine.name) })"
                            @pointerdown="onDragPointerDown($event, 'engine', ci, ei)"
                            @click.stop="editEngine(ci, ei)">
                            <span class="sej-engine" :data-iqxintitle="engine.name" :data-iqxinimg="engine.favicon"
                                :data-iqxinlink="engine.url" :data-iqxintarget="engine.target === '_self' ? '_self' : null"
                                :data-iqxindisabled="engine.disable ? 'true' : null">
                                <img class="sej-engine-icon" :src="getFaviconSrc(engine)" alt="" />
                                <span>{{ localizeEngineName(engine.name) }}</span>
                            </span>
                            <span class="sej-hover-edit" v-html="PENCIL"></span>
                            <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': engine.disable }"
                                :title="engine.disable ? t('common.show') : t('common.hide')" @click.stop="toggleEngine(ci, ei)"
                                v-html="engine.disable ? EYE_OFF : EYE"></span>
                            <span class="sej-hover-delete" :title="t('settings.deleteEngine')" @pointerdown.stop
                                @click.stop="deleteEngine(ci, ei)" v-html="TRASH"></span>
                        </span>
                        <!-- 添加搜索引擎按钮；拖动已有引擎悬浮时变为复制入口 -->
                        <span class="iqxin-additem" :class="{ 'sej-copy-target': copyTargetCi === ci }"
                            @click.stop="addEngine(ci)">
                            <span v-if="copyTargetCi === ci" class="sej-copy-icon" v-html="COPY"></span>
                            <template v-else>+</template>
                            <span v-if="copyTargetCi === ci" class="sej-copy-hint">{{ t('settings.copyHere') }}</span>
                        </span>
                    </div>
                </div>
                <!-- 新增分类占位卡片 -->
                <div class="iqxin-items sej-add-category-card" role="button" tabindex="0"
                    :title="t('settings.addCategory')" :aria-label="t('settings.addCategory')"
                    @click="addCategory" @keydown.enter="addCategory" @keydown.space.prevent="addCategory">
                    <span class="sej-add-category-plus">+</span>
                </div>
            </div>
            <!-- 底部设置按钮区域 -->
            <div id="btnEle">
                <div class="btnEleLayer">
                    <div class="sej-footer-options">
                        <span id="xin-HideTheSameLink" :title="t('settings.hideSameLinkTip')">
                            <label>{{ t('settings.hideSameLink') }}<input type="checkbox" v-model="draft.HideTheSameLink" /></label>
                        </span>
                        <span id="xin-selectSearch">
                            <label>{{ t('settings.selectSearch') }}<input type="checkbox" v-model="draft.selectSearch" /></label>
                        </span>
                        <span id="xin-transtion">
                            <label>{{ t('settings.transition') }}<input type="checkbox" v-model="draft.transtion" /></label>
                        </span>
                        <span id="xin-centerDisplay" :title="t('settings.centerTip')">
                            <label>{{ t('settings.center') }}<input type="checkbox" v-model="draft.center" /></label>
                        </span>
                        <span id="iqxin-fixedTopS" :title="t('settings.fixedTopTip')">
                            <label>{{ t('settings.fixedTop') }}<input type="checkbox" v-model="draft.fixedTop" /></label>
                        </span>
                        <span v-show="draft.fixedTop" id="iqxin-fixedTopUpward" :title="t('settings.fixedTopUpwardTip')">
                            <label>{{ t('settings.fixedTopUpward') }}<input type="checkbox" v-model="draft.fixedTopUpward" /></label>
                        </span>
                        <span id="xin-language">
                            <label>{{ t('settings.language') }}
                                <select v-model="draft.language" class="sej-language-select">
                                    <option value="auto">{{ t('settings.languageAuto') }}</option>
                                    <option value="zh-CN">简体中文</option>
                                    <option value="en">English</option>
                                </select>
                            </label>
                        </span>
                    </div>
                    <div class="sej-footer-bar">
                        <div class="sej-footer-selects">
                            <span id="xin-modification" @click="openConfig">{{ t('settings.editConfig') }}</span>
                            <span id="xin-loadIcons" :title="t('settings.loadIconsTip')"
                                :class="{ 'sej-loading': loadingIcons }" @click="loadAllIcons">
                                {{ loadingIcons ? t('settings.loading') : t('settings.loadIcons') }}
                            </span>
                        </div>
                        <div class="sej-footer-links">
                            <span class="feedback" :title="t('settings.feedbackGreasyFork')">
                                <a target="_blank" href="https://greasyfork.org/zh-CN/users/1238054">Greasy
                                    Fork</a>
                            </span>
                            <span class="feedback" :title="t('settings.feedbackGitHub')">
                                <a target="_blank" href="https://github.com/sherlocknieh/Monkey-Scripts">GitHub</a>
                            </span>
                        </div>
                        <div class="sej-footer-actions">
                            <span id="xin-save" :title="t('settings.close')" :class="{ 'sej-saving': saving }" @click="save">
                                {{ saving ? t('settings.saving') : t('settings.close') }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <EngineEditDialog v-if="engineDialog" :mode="engineDialog.mode" :initial="engineDialog.initial"
                :busy="engineSaving" :resolve-icon="getICON" @submit="submitEngine"
                @delete="deleteEngineFromDialog" @cancel="cancelEngineDialog" />

            <CategoryEditDialog v-if="categoryDialog"
                :name="displayCategoryName(draft.categories[categoryDialog.index]) || ''" @submit="submitCategory"
                @delete="deleteCategoryFromDialog" @cancel="cancelCategoryDialog" />

            <ConfigEditor v-if="configOpen" :initial-text="configText" @save="saveConfig" @reset="reset(true)"
                @close="configOpen = false" @copy="showToast(t('toast.copySuccess'))" @notify="showToast"
                @merge="mergeConfig" />
        </div>
    </div>
</template>
