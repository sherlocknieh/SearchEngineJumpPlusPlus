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
import { useSettings, STORAGE_KEY } from '../stores/settings.js';
import { requestRestart } from '../core/appControl.js';
import { embedFavicon, getFaviconSrc } from '../core/favicon.js';
import { closeSettingPanel, showToast, ui } from '../stores/ui.js';
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

const OPTION_KEYS = [
    'fixedTop',
    'fixedTopUpward',
    'HideTheSameLink',
    'center',
    'transtion',
    'selectSearch',
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
const online = ref(false);

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
        showToast('自动保存失败：存储不可用，请用“配置文件”复制备份', 5000);
        return;
    }
    settingsChanged = true;
    if (backend === 'local' && !autosaveWarnedLocal) {
        autosaveWarnedLocal = true;
        showToast('已自动保存（当前仅本网站生效）', 3000);
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
        showToast('其他页面已更新设置，当前有未保存修改', 6000, {
            label: '同步',
            onClick: forceSyncFromRemote,
        });
        return;
    }
    if (!settings.reload()) return;
    refreshDraft();
    remoteSynced = true;
    showToast('已同步其他页面保存的设置', 3000);
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
    showToast('已同步其他页面保存的设置', 3000);
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
                showToast('保存失败：存储不可用，请用“配置文件”复制备份', 5000);
                return;
            }
            settingsChanged = true;
            if (backend === 'local') {
                showToast(
                    '已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）',
                    4000,
                );
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
        if (converted) {
            scheduleAutoSave();
            showToast(`${parts.join('，')}，已自动保存`, 4000);
        } else {
            showToast(parts.join('，'), 4000);
        }
    } finally {
        loadingIcons.value = false;
    }
}

function reset(exported = false) {
    const message = exported
        ? '当前配置已导出为备份文件，确定要恢复默认设置吗？'
        : '将会删除用户设置！';
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
    showToast(category.enabled ? '启用' : '隐藏');
}

function toggleEngine(ci, ei) {
    const engine = draft.categories[ci].engines[ei];
    engine.disable = !engine.disable;
    scheduleAutoSave();
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
    scheduleAutoSave();
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
        `「${engine.name}」`,
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
        const nextName = name || '空';
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
let dragSnapshot = null;
let dragDropped = false;
let pressCtx = null;
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
function onDragPointerDown(e, type, ci, ei = null) {
    // 上一次拖动可能因窗口失焦等原因没有正常结束，先清理残留状态
    resetStaleDrag();
    suppressClick = false;
    if (e.button !== 0) return;
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
        started: false,
    };
    document.addEventListener('pointermove', onDragPointerMove);
    document.addEventListener('pointerup', onDragPointerUp);
    document.addEventListener('pointercancel', onDragPointerCancel);
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
        if (Math.hypot(p.x - p.startX, p.y - p.startY) < DRAG_THRESHOLD) return;
        if (!beginDrag()) {
            finishPress();
            return;
        }
    }

    e.preventDefault();
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
            showToast(`已复制「${source.name}」`);
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
        scheduleAutoSave();
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
    scheduleAutoSave();
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
    const iconSetting = ui.iconSource;
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
    window.addEventListener('blur', onWindowBlur);
    isOnline();
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
            <div id="sej-settings-body" @dragstart.prevent>
                <!-- 分类列表 -->
                <div v-for="(category, ci) in draft.categories" :id="category.key" :key="category._id"
                    class="iqxin-items"
                    :class="{ 'sej-category-hidden': !category.enabled, 'sej-drag-placeholder': dragCtx?.type === 'category' && dragCtx.key === category.key }"
                    :data-sej-drag-el="'category-' + category._id">
                    <!-- 类别标题 -->
                    <div class="sejtitle drag" :data-xin="category.enabled ? 1 : -1"
                        :data-iqxintitle="category.key"
                        :title="`编辑分类：${category.name}`"
                        @pointerdown="onDragPointerDown($event, 'category', ci)"
                        @click.stop="openCategoryDialog(ci)">
                        <span class="iqxin-pointer-events">{{ category.name }}</span>
                        <span class="sej-hover-edit" v-html="PENCIL"></span>
                        <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': !category.enabled }"
                            :title="category.enabled ? '隐藏' : '显示'" @click.stop="toggleCategory(ci)"
                            v-html="category.enabled ? EYE : EYE_OFF"></span>
                        <span class="sej-hover-delete" title="删除分类" @pointerdown.stop
                            @click.stop="deleteCategory(ci)" v-html="TRASH"></span>
                    </div>

                    <!-- 具体条目 -->
                    <div class="sejcon" :data-sej-drag-el="'list-' + category._id">
                        <!-- 每个搜索引擎 -->
                        <span v-for="(engine, ei) in category.engines" :key="engine._id" class="drag"
                            :data-sej-drag-el="'engine-' + engine._id"
                            :class="{ 'sej-drag-placeholder': dragCtx?.type === 'engine' && dragCtx.key === engine._id }"
                            :title="`编辑：${engine.name}`"
                            @pointerdown="onDragPointerDown($event, 'engine', ci, ei)"
                            @click.stop="editEngine(ci, ei)">
                            <span class="sej-engine" :data-iqxintitle="engine.name" :data-iqxinimg="engine.favicon"
                                :data-iqxinlink="engine.url" :data-iqxintarget="engine.target === '_self' ? '_self' : null"
                                :data-iqxindisabled="engine.disable ? 'true' : null">
                                <img class="sej-engine-icon" :src="getFaviconSrc(engine)" alt="" />
                                <span>{{ engine.name }}</span>
                            </span>
                            <span class="sej-hover-edit" v-html="PENCIL"></span>
                            <span class="iqxin-set-toggle" :class="{ 'iqxin-set-hidden': engine.disable }"
                                :title="engine.disable ? '显示' : '隐藏'" @click.stop="toggleEngine(ci, ei)"
                                v-html="engine.disable ? EYE_OFF : EYE"></span>
                            <span class="sej-hover-delete" title="删除引擎" @pointerdown.stop
                                @click.stop="deleteEngine(ci, ei)" v-html="TRASH"></span>
                        </span>
                        <!-- 添加搜索引擎按钮；拖动已有引擎悬浮时变为复制入口 -->
                        <span class="iqxin-additem" :class="{ 'sej-copy-target': copyTargetCi === ci }"
                            @click.stop="addEngine(ci)">
                            <span v-if="copyTargetCi === ci" class="sej-copy-icon" v-html="COPY"></span>
                            <template v-else>+</template>
                            <span v-if="copyTargetCi === ci" class="sej-copy-hint">复制一份到此栏目</span>
                        </span>
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
                        <span id="xin-HideTheSameLink" title="比如处于谷歌搜索页时，引擎列表中不再显示谷歌搜索">
                            <label>防止原地跳转<input type="checkbox" v-model="draft.HideTheSameLink" /></label>
                        </span>
                        <span id="xin-selectSearch">
                            <label>划词搜索<input type="checkbox" v-model="draft.selectSearch" /></label>
                        </span>
                        <span id="xin-transtion">
                            <label>过渡动画<input type="checkbox" v-model="draft.transtion" /></label>
                        </span>
                        <span id="xin-centerDisplay" title="搜索条始终居中显示">
                            <label>强制居中<input type="checkbox" v-model="draft.center" /></label>
                        </span>
                        <span id="iqxin-fixedTopS" title="页面下滑时搜索条固定在顶部显示">
                            <label>固顶显示<input type="checkbox" v-model="draft.fixedTop" /></label>
                        </span>
                        <span v-show="draft.fixedTop" id="iqxin-fixedTopUpward" title="仅在向上滚动页面时显示">
                            <label>下滑不显示<input type="checkbox" v-model="draft.fixedTopUpward" /></label>
                        </span>
                    </div>
                    <div class="sej-footer-bar">
                        <div class="sej-footer-selects">
                            <span id="xin-modification" @click="openConfig">编辑配置文件</span>
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
                            <span id="xin-save" title="关闭" :class="{ 'sej-saving': saving }" @click="save">
                                {{ saving ? '关闭中…' : '关闭' }}
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

            <ConfigEditor v-if="configOpen" :initial-text="configText" @save="saveConfig" @reset="reset(true)"
                @close="configOpen = false" @copy="showToast('复制成功')" @notify="showToast" />
        </div>
    </div>
</template>
