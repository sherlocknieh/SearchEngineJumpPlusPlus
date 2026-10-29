// ==UserScript==
// @name               SearchEngineJump++
// @namespace          https://github.com/sherlocknieh/
// @version            2026.10.29.1826
// @author             sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)
// @description        Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。
// @description:zh-CN  Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。
// @description:en     Fork of MUTED64's SearchEngineJumpPlus, rebuilt with Vue 3 with numerous fixes and a cleaner, faster UI.
// @license            MIT
// @icon               data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMiAzMiIgd2lkdGg9IjMyIiBoZWlnaHQ9IjMyIj4KICA8Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxNiIgZmlsbD0iI0ZGRkZGRiIvPgogIDxwYXRoIGQ9Ik0xOC44IDE4LjggMjQuMiAyNC4yIiBzdHJva2U9IiM1RjYzNjgiIHN0cm9rZS13aWR0aD0iMy4yIiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KICA8ZyBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjMuMiIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDEzLjUgMTMuNSkiPgogICAgPGNpcmNsZSBjeD0iMTMuNSIgY3k9IjEzLjUiIHI9IjcuMiIgc3Ryb2tlPSIjNDI4NUY0IiBzdHJva2UtZGFzaGFycmF5PSIxMS4zMSAzMy45MyIvPgogICAgPGNpcmNsZSBjeD0iMTMuNSIgY3k9IjEzLjUiIHI9IjcuMiIgc3Ryb2tlPSIjMzRBODUzIiBzdHJva2UtZGFzaGFycmF5PSIxMS4zMSAzMy45MyIKICAgICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ9Ii0xMS4zMSIvPgogICAgPGNpcmNsZSBjeD0iMTMuNSIgY3k9IjEzLjUiIHI9IjcuMiIgc3Ryb2tlPSIjRkJCQzA1IiBzdHJva2UtZGFzaGFycmF5PSIxMS4zMSAzMy45MyIKICAgICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ9Ii0yMi42MiIvPgogICAgPGNpcmNsZSBjeD0iMTMuNSIgY3k9IjEzLjUiIHI9IjcuMiIgc3Ryb2tlPSIjRUE0MzM1IiBzdHJva2UtZGFzaGFycmF5PSIxMS4zMSAzMy45MyIKICAgICAgICAgICAgc3Ryb2tlLWRhc2hvZmZzZXQ9Ii0zMy45MyIvPgogIDwvZz4KPC9zdmc+Cg==
// @match              *://*/*
// @connect            *
// @grant              GM.addValueChangeListener
// @grant              GM.deleteValue
// @grant              GM.getValue
// @grant              GM.removeValueChangeListener
// @grant              GM.setValue
// @grant              GM_addStyle
// @grant              GM_addValueChangeListener
// @grant              GM_deleteValue
// @grant              GM_getValue
// @grant              GM_info
// @grant              GM_openInTab
// @grant              GM_registerMenuCommand
// @grant              GM_removeValueChangeListener
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              window.onurlchange
// @noframes
// ==/UserScript==

(function() {
	"use strict";
	var __defProp = Object.defineProperty;
	var __exportAll = (all, no_symbols) => {
		let target = {};
		for (var name in all) __defProp(target, name, {
			get: all[name],
			enumerable: true
		});
		if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
		return target;
	};
	var restartHandler = null;
	function onRestartRequest(handler) {
		restartHandler = handler;
	}
	function requestRestart() {
		if (restartHandler) restartHandler();
	}
	function makeMap(str) {
		const map = Object.create(null);
		for (const key of str.split(",")) map[key] = 1;
		return (val) => val in map;
	}
	var EMPTY_OBJ = {};
	var EMPTY_ARR = [];
	var NOOP = () => {};
	var NO = () => false;
	var isOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && (key.charCodeAt(2) > 122 || key.charCodeAt(2) < 97);
	var isModelListener = (key) => key.startsWith("onUpdate:");
	var extend = Object.assign;
	var remove = (arr, el) => {
		const i = arr.indexOf(el);
		if (i > -1) arr.splice(i, 1);
	};
	var hasOwnProperty$1 = Object.prototype.hasOwnProperty;
	var hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
	var isArray = Array.isArray;
	var isMap = (val) => toTypeString(val) === "[object Map]";
	var isSet = (val) => toTypeString(val) === "[object Set]";
	var isDate = (val) => toTypeString(val) === "[object Date]";
	var isFunction = (val) => typeof val === "function";
	var isString = (val) => typeof val === "string";
	var isSymbol = (val) => typeof val === "symbol";
	var isObject = (val) => val !== null && typeof val === "object";
	var isPromise = (val) => {
		return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
	};
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var toRawType = (value) => {
		return toTypeString(value).slice(8, -1);
	};
	var isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
	var isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
	var isReservedProp = makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
	var cacheStringFunction = (fn) => {
		const cache = Object.create(null);
		return ((str) => {
			return cache[str] || (cache[str] = fn(str));
		});
	};
	var camelizeRE = /-\w/g;
	var camelize = cacheStringFunction((str) => {
		return str.replace(camelizeRE, (c) => c.slice(1).toUpperCase());
	});
	var hyphenateRE = /\B([A-Z])/g;
	var hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
	var capitalize = cacheStringFunction((str) => {
		return str.charAt(0).toUpperCase() + str.slice(1);
	});
	var toHandlerKey = cacheStringFunction((str) => {
		return str ? `on${capitalize(str)}` : ``;
	});
	var hasChanged = (value, oldValue) => !Object.is(value, oldValue);
	var invokeArrayFns = (fns, ...arg) => {
		for (let i = 0; i < fns.length; i++) fns[i](...arg);
	};
	var def = (obj, key, value, writable = false) => {
		Object.defineProperty(obj, key, {
			configurable: true,
			enumerable: false,
			writable,
			value
		});
	};
	var looseToNumber = (val) => {
		const n = parseFloat(val);
		return isNaN(n) ? val : n;
	};
	var _globalThis;
	var getGlobalThis = () => {
		return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
	};
	function normalizeStyle(value) {
		if (isArray(value)) {
			const res = {};
			for (let i = 0; i < value.length; i++) {
				const item = value[i];
				const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
				if (normalized) for (const key in normalized) res[key] = normalized[key];
			}
			return res;
		} else if (isString(value) || isObject(value)) return value;
	}
	var listDelimiterRE = /;(?![^(]*\))/g;
	var propertyDelimiterRE = /:([^]+)/;
	var styleCommentRE = /"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;
	function parseStringStyle(cssText) {
		const ret = {};
		cssText.replace(styleCommentRE, (match) => match.startsWith("/*") ? "" : match).split(listDelimiterRE).forEach((item) => {
			if (item) {
				const tmp = item.split(propertyDelimiterRE);
				tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
			}
		});
		return ret;
	}
	function normalizeClass(value) {
		let res = "";
		if (isString(value)) res = value;
		else if (isArray(value)) for (let i = 0; i < value.length; i++) {
			const normalized = normalizeClass(value[i]);
			if (normalized) res += normalized + " ";
		}
		else if (isObject(value)) {
			for (const name in value) if (value[name]) res += name + " ";
		}
		return res.trim();
	}
	var isSpecialBooleanAttr = makeMap(`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly`);
	function includeBooleanAttr(value) {
		return !!value || value === "";
	}
	function looseCompareArrays(a, b, seen) {
		if (a.length !== b.length) return false;
		let equal = true;
		for (let i = 0; equal && i < a.length; i++) equal = looseEqual(a[i], b[i], seen);
		return equal;
	}
	function looseCompareCollections(a, b, seen) {
		if (a.size !== b.size) return false;
		const candidates = Array.from(b);
		const matched = new Uint8Array(candidates.length);
		for (const item of a) {
			let index = -1;
			for (let i = 0; i < candidates.length; i++) if (!matched[i] && looseEqual(item, candidates[i], seen)) {
				index = i;
				break;
			}
			if (index < 0) return false;
			matched[index] = 1;
		}
		return true;
	}
	function looseCompareObjects(a, b, seen) {
		let aValidType = isMap(a);
		let bValidType = isMap(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
		aValidType = isSet(a);
		bValidType = isSet(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareCollections(a, b, seen) : false;
		if (Object.keys(a).length !== Object.keys(b).length) return false;
		for (const key in a) {
			const aHasKey = a.hasOwnProperty(key);
			const bHasKey = b.hasOwnProperty(key);
			if (aHasKey && !bHasKey || !aHasKey && bHasKey || !looseEqual(a[key], b[key], seen)) return false;
		}
		return String(a) === String(b);
	}
	function looseCompareNested(a, b, seen, compare) {
		if (!seen) seen = [new Map(), new Map()];
		const [seenA, seenB] = seen;
		if (seenA.has(a) || seenB.has(b)) return seenA.get(a) === b && seenB.get(b) === a;
		seenA.set(a, b);
		seenB.set(b, a);
		const equal = compare(a, b, seen);
		seenA.delete(a);
		seenB.delete(b);
		return equal;
	}
	function looseEqual(a, b, seen) {
		if (a === b) return true;
		let aValidType = isDate(a);
		let bValidType = isDate(b);
		if (aValidType || bValidType) return aValidType && bValidType ? a.getTime() === b.getTime() : false;
		aValidType = isSymbol(a);
		bValidType = isSymbol(b);
		if (aValidType || bValidType) return a === b;
		aValidType = isArray(a);
		bValidType = isArray(b);
		if (aValidType || bValidType) return aValidType && bValidType ? looseCompareNested(a, b, seen, looseCompareArrays) : false;
		aValidType = isObject(a);
		bValidType = isObject(b);
		if (aValidType || bValidType) {
			if (!aValidType || !bValidType) return false;
			return looseCompareNested(a, b, seen, looseCompareObjects);
		}
		return String(a) === String(b);
	}
	function looseIndexOf(arr, val) {
		return arr.findIndex((item) => looseEqual(item, val));
	}
	var isRef$1 = (val) => {
		return !!(val && val["__v_isRef"] === true);
	};
	var toDisplayString = (val) => {
		return isString(val) ? val : val == null ? "" : isArray(val) || isObject(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
	};
	var replacer = (_key, val) => {
		if (isRef$1(val)) return replacer(_key, val.value);
		else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
			entries[stringifySymbol(key, i) + " =>"] = val2;
			return entries;
		}, {}) };
		else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
		else if (isSymbol(val)) return stringifySymbol(val);
		else if (isObject(val) && !isArray(val) && !isPlainObject$1(val)) return String(val);
		return val;
	};
	var stringifySymbol = (v, i = "") => {
		var _a;
		return isSymbol(v) ? `Symbol(${(_a = v.description) != null ? _a : i})` : v;
	};
	var activeEffectScope;
	var EffectScope = class {
		constructor(detached = false) {
			this.detached = detached;
			this._active = true;
			this._on = 0;
			this.effects = [];
			this.cleanups = [];
			this._isPaused = false;
			this._warnOnRun = true;
			this.__v_skip = true;
			if (!detached && activeEffectScope) {
				if (activeEffectScope.active) {
					this.parent = activeEffectScope;
					this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
				} else {
					this._active = false;
					this._warnOnRun = false;
				}
			}
		}
		get active() {
			return this._active;
		}
		pause() {
			if (this._active) {
				this._isPaused = true;
				let i, l;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].pause();
				}
				for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].pause();
			}
		}
		resume() {
			if (this._active) {
				if (this._isPaused) {
					this._isPaused = false;
					let i, l;
					if (this.scopes) {
						const scopes = this.scopes.slice();
						for (i = 0, l = scopes.length; i < l; i++) scopes[i].resume();
					}
					const effects = this.effects.slice();
					for (i = 0, l = effects.length; i < l; i++) effects[i].resume();
				}
			}
		}
		run(fn) {
			if (this._active) {
				const currentEffectScope = activeEffectScope;
				try {
					activeEffectScope = this;
					return fn();
				} finally {
					activeEffectScope = currentEffectScope;
				}
			}
		}
		on() {
			if (++this._on === 1) {
				this.prevScope = activeEffectScope;
				activeEffectScope = this;
			}
		}
		off() {
			if (this._on > 0 && --this._on === 0) {
				if (activeEffectScope === this) activeEffectScope = this.prevScope;
				else {
					let current = activeEffectScope;
					while (current) {
						if (current.prevScope === this) {
							current.prevScope = this.prevScope;
							break;
						}
						current = current.prevScope;
					}
				}
				this.prevScope = void 0;
			}
		}
		stop(fromParent) {
			if (this._active) {
				this._active = false;
				let i, l;
				for (i = 0, l = this.effects.length; i < l; i++) this.effects[i].stop();
				this.effects.length = 0;
				for (i = 0, l = this.cleanups.length; i < l; i++) this.cleanups[i]();
				this.cleanups.length = 0;
				if (this.scopes) {
					const scopes = this.scopes.slice();
					for (i = 0, l = scopes.length; i < l; i++) scopes[i].stop(true);
					this.scopes.length = 0;
				}
				if (!this.detached && this.parent && !fromParent) {
					const last = this.parent.scopes.pop();
					if (last && last !== this) {
						this.parent.scopes[this.index] = last;
						last.index = this.index;
					}
				}
				this.parent = void 0;
			}
		}
	};
	function getCurrentScope() {
		return activeEffectScope;
	}
	var activeSub;
	var pausedQueueEffects = new WeakSet();
	var ReactiveEffect = class {
		constructor(fn) {
			this.fn = fn;
			this.deps = void 0;
			this.depsTail = void 0;
			this.flags = 5;
			this.next = void 0;
			this.cleanup = void 0;
			this.scheduler = void 0;
			if (activeEffectScope) {
				if (activeEffectScope.active) activeEffectScope.effects.push(this);
				else this.flags &= -2;
			}
		}
		pause() {
			this.flags |= 64;
		}
		resume() {
			if (this.flags & 64) {
				this.flags &= -65;
				if (pausedQueueEffects.has(this)) {
					pausedQueueEffects.delete(this);
					this.trigger();
				}
			}
		}
		notify() {
			if (this.flags & 2 && !(this.flags & 32)) return;
			if (!(this.flags & 8)) batch(this);
		}
		run() {
			if (!(this.flags & 1)) return this.fn();
			this.flags |= 2;
			cleanupEffect(this);
			prepareDeps(this);
			const prevEffect = activeSub;
			const prevShouldTrack = shouldTrack;
			activeSub = this;
			shouldTrack = true;
			try {
				return this.fn();
			} finally {
				cleanupDeps(this);
				activeSub = prevEffect;
				shouldTrack = prevShouldTrack;
				this.flags &= -3;
			}
		}
		stop() {
			if (this.flags & 1) {
				for (let link = this.deps; link; link = link.nextDep) removeSub(link);
				this.deps = this.depsTail = void 0;
				cleanupEffect(this);
				this.onStop && this.onStop();
				this.flags &= -2;
			}
		}
		trigger() {
			if (this.flags & 64) pausedQueueEffects.add(this);
			else if (this.scheduler) this.scheduler();
			else this.runIfDirty();
		}
		runIfDirty() {
			if (isDirty(this)) this.run();
		}
		get dirty() {
			return isDirty(this);
		}
	};
	var batchDepth = 0;
	var batchedSub;
	var batchedComputed;
	function batch(sub, isComputed = false) {
		sub.flags |= 8;
		if (isComputed) {
			sub.next = batchedComputed;
			batchedComputed = sub;
			return;
		}
		sub.next = batchedSub;
		batchedSub = sub;
	}
	function startBatch() {
		batchDepth++;
	}
	function endBatch() {
		if (--batchDepth > 0) return;
		if (batchedComputed) {
			let e = batchedComputed;
			batchedComputed = void 0;
			while (e) {
				const next = e.next;
				e.next = void 0;
				e.flags &= -9;
				e = next;
			}
		}
		let error;
		while (batchedSub) {
			let e = batchedSub;
			batchedSub = void 0;
			while (e) {
				const next = e.next;
				e.next = void 0;
				e.flags &= -9;
				if (e.flags & 1) try {
					e.trigger();
				} catch (err) {
					if (!error) error = err;
				}
				e = next;
			}
		}
		if (error) throw error;
	}
	function prepareDeps(sub) {
		for (let link = sub.deps; link; link = link.nextDep) {
			link.version = -1;
			link.prevActiveLink = link.dep.activeLink;
			link.dep.activeLink = link;
		}
	}
	function cleanupDeps(sub) {
		let head;
		let tail = sub.depsTail;
		let link = tail;
		while (link) {
			const prev = link.prevDep;
			if (link.version === -1) {
				if (link === tail) tail = prev;
				removeSub(link);
				removeDep(link);
			} else head = link;
			link.dep.activeLink = link.prevActiveLink;
			link.prevActiveLink = void 0;
			link = prev;
		}
		sub.deps = head;
		sub.depsTail = tail;
	}
	function isDirty(sub) {
		for (let link = sub.deps; link; link = link.nextDep) if (link.dep.version !== link.version || link.dep.computed && (refreshComputed(link.dep.computed) || link.dep.version !== link.version)) return true;
		if (sub._dirty) return true;
		return false;
	}
	function refreshComputed(computed) {
		if (computed.flags & 4 && !(computed.flags & 16)) return;
		computed.flags &= -17;
		if (computed.globalVersion === globalVersion) return;
		computed.globalVersion = globalVersion;
		if (!computed.isSSR && computed.flags & 128 && (!computed.deps && !computed._dirty || !isDirty(computed))) return;
		computed.flags |= 2;
		const dep = computed.dep;
		const prevSub = activeSub;
		const prevShouldTrack = shouldTrack;
		activeSub = computed;
		shouldTrack = true;
		try {
			prepareDeps(computed);
			const value = computed.fn(computed._value);
			if (dep.version === 0 || hasChanged(value, computed._value)) {
				computed.flags |= 128;
				computed._value = value;
				dep.version++;
			}
		} catch (err) {
			dep.version++;
			throw err;
		} finally {
			activeSub = prevSub;
			shouldTrack = prevShouldTrack;
			cleanupDeps(computed);
			computed.flags &= -3;
		}
	}
	function removeSub(link, soft = false) {
		const { dep, prevSub, nextSub } = link;
		if (prevSub) {
			prevSub.nextSub = nextSub;
			link.prevSub = void 0;
		}
		if (nextSub) {
			nextSub.prevSub = prevSub;
			link.nextSub = void 0;
		}
		if (dep.subs === link) {
			dep.subs = prevSub;
			if (!prevSub && dep.computed) {
				dep.computed.flags &= -5;
				for (let l = dep.computed.deps; l; l = l.nextDep) removeSub(l, true);
			}
		}
		if (!soft && !--dep.sc && dep.map) dep.map.delete(dep.key);
	}
	function removeDep(link) {
		const { prevDep, nextDep } = link;
		if (prevDep) {
			prevDep.nextDep = nextDep;
			link.prevDep = void 0;
		}
		if (nextDep) {
			nextDep.prevDep = prevDep;
			link.nextDep = void 0;
		}
	}
	var shouldTrack = true;
	var trackStack = [];
	function pauseTracking() {
		trackStack.push(shouldTrack);
		shouldTrack = false;
	}
	function resetTracking() {
		const last = trackStack.pop();
		shouldTrack = last === void 0 ? true : last;
	}
	function cleanupEffect(e) {
		const { cleanup } = e;
		e.cleanup = void 0;
		if (cleanup) {
			const prevSub = activeSub;
			activeSub = void 0;
			try {
				cleanup();
			} finally {
				activeSub = prevSub;
			}
		}
	}
	var globalVersion = 0;
	var Link = class {
		constructor(sub, dep) {
			this.sub = sub;
			this.dep = dep;
			this.version = dep.version;
			this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
		}
	};
	var Dep = class {
		constructor(computed) {
			this.computed = computed;
			this.version = 0;
			this.activeLink = void 0;
			this.subs = void 0;
			this.map = void 0;
			this.key = void 0;
			this.sc = 0;
			this.__v_skip = true;
		}
		track(debugInfo) {
			if (!activeSub || !shouldTrack || activeSub === this.computed) return;
			let link = this.activeLink;
			if (link === void 0 || link.sub !== activeSub) {
				link = this.activeLink = new Link(activeSub, this);
				if (!activeSub.deps) activeSub.deps = activeSub.depsTail = link;
				else {
					link.prevDep = activeSub.depsTail;
					activeSub.depsTail.nextDep = link;
					activeSub.depsTail = link;
				}
				addSub(link);
			} else if (link.version === -1) {
				link.version = this.version;
				if (link.nextDep) {
					const next = link.nextDep;
					next.prevDep = link.prevDep;
					if (link.prevDep) link.prevDep.nextDep = next;
					link.prevDep = activeSub.depsTail;
					link.nextDep = void 0;
					activeSub.depsTail.nextDep = link;
					activeSub.depsTail = link;
					if (activeSub.deps === link) activeSub.deps = next;
				}
			}
			return link;
		}
		trigger(debugInfo) {
			this.version++;
			globalVersion++;
			this.notify(debugInfo);
		}
		notify(debugInfo) {
			startBatch();
			try {
				for (let link = this.subs; link; link = link.prevSub) if (link.sub.notify()) link.sub.dep.notify();
			} finally {
				endBatch();
			}
		}
	};
	function addSub(link) {
		link.dep.sc++;
		if (link.sub.flags & 4) {
			const computed = link.dep.computed;
			if (computed && !link.dep.subs) {
				computed.flags |= 20;
				for (let l = computed.deps; l; l = l.nextDep) addSub(l);
			}
			const currentTail = link.dep.subs;
			if (currentTail !== link) {
				link.prevSub = currentTail;
				if (currentTail) currentTail.nextSub = link;
			}
			link.dep.subs = link;
		}
	}
	var targetMap = new WeakMap();
	var ITERATE_KEY = Symbol("");
	var MAP_KEY_ITERATE_KEY = Symbol("");
	var ARRAY_ITERATE_KEY = Symbol("");
	function track(target, type, key) {
		if (shouldTrack && activeSub) {
			let depsMap = targetMap.get(target);
			if (!depsMap) targetMap.set(target, depsMap = new Map());
			let dep = depsMap.get(key);
			if (!dep) {
				depsMap.set(key, dep = new Dep());
				dep.map = depsMap;
				dep.key = key;
			}
			dep.track();
		}
	}
	function trigger(target, type, key, newValue, oldValue, oldTarget) {
		const depsMap = targetMap.get(target);
		if (!depsMap) {
			globalVersion++;
			return;
		}
		const run = (dep) => {
			if (dep) dep.trigger();
		};
		startBatch();
		if (type === "clear") depsMap.forEach(run);
		else {
			const targetIsArray = isArray(target);
			const isArrayIndex = targetIsArray && isIntegerKey(key);
			if (targetIsArray && key === "length") {
				const newLength = Number(newValue);
				depsMap.forEach((dep, key2) => {
					if (key2 === "length" || key2 === ARRAY_ITERATE_KEY || !isSymbol(key2) && key2 >= newLength) run(dep);
				});
			} else {
				if (key !== void 0 || depsMap.has(void 0)) run(depsMap.get(key));
				if (isArrayIndex) run(depsMap.get(ARRAY_ITERATE_KEY));
				switch (type) {
					case "add":
						if (!targetIsArray) {
							run(depsMap.get(ITERATE_KEY));
							if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
						} else if (isArrayIndex) run(depsMap.get("length"));
						break;
					case "delete":
						if (!targetIsArray) {
							run(depsMap.get(ITERATE_KEY));
							if (isMap(target)) run(depsMap.get(MAP_KEY_ITERATE_KEY));
						}
						break;
					case "set": if (isMap(target)) run(depsMap.get(ITERATE_KEY));
				}
			}
		}
		endBatch();
	}
	function reactiveReadArray(array) {
		const raw = toRaw(array);
		if (raw === array) return raw;
		track(raw, "iterate", ARRAY_ITERATE_KEY);
		if (isShallow(array)) return raw;
		if (!isReadonly(array)) return raw.map(toReactive);
		return isReactive(array) ? raw.map((item) => toReadonly(toReactive(item))) : raw.map(toReadonly);
	}
	function shallowReadArray(arr) {
		track(arr = toRaw(arr), "iterate", ARRAY_ITERATE_KEY);
		return arr;
	}
	function toWrapped(target, item) {
		if (isReadonly(target)) return isReactive(target) ? toReadonly(toReactive(item)) : toReadonly(item);
		return toReactive(item);
	}
	var arrayInstrumentations = {
		__proto__: null,
		[Symbol.iterator]() {
			return iterator(this, Symbol.iterator, (item) => toWrapped(this, item));
		},
		concat(...args) {
			return reactiveReadArray(this).concat(...args.map((x) => isArray(x) ? reactiveReadArray(x) : x));
		},
		entries() {
			return iterator(this, "entries", (value) => {
				value[1] = toWrapped(this, value[1]);
				return value;
			});
		},
		every(fn, thisArg) {
			return apply(this, "every", fn, thisArg, void 0, arguments);
		},
		filter(fn, thisArg) {
			return apply(this, "filter", fn, thisArg, (v) => v.map((item) => toWrapped(this, item)), arguments);
		},
		find(fn, thisArg) {
			return apply(this, "find", fn, thisArg, (item) => toWrapped(this, item), arguments);
		},
		findIndex(fn, thisArg) {
			return apply(this, "findIndex", fn, thisArg, void 0, arguments);
		},
		findLast(fn, thisArg) {
			return apply(this, "findLast", fn, thisArg, (item) => toWrapped(this, item), arguments);
		},
		findLastIndex(fn, thisArg) {
			return apply(this, "findLastIndex", fn, thisArg, void 0, arguments);
		},
		forEach(fn, thisArg) {
			return apply(this, "forEach", fn, thisArg, void 0, arguments);
		},
		includes(...args) {
			return searchProxy(this, "includes", args);
		},
		indexOf(...args) {
			return searchProxy(this, "indexOf", args);
		},
		join(separator) {
			return reactiveReadArray(this).join(separator);
		},
		lastIndexOf(...args) {
			return searchProxy(this, "lastIndexOf", args);
		},
		map(fn, thisArg) {
			return apply(this, "map", fn, thisArg, void 0, arguments);
		},
		pop() {
			return noTracking(this, "pop");
		},
		push(...args) {
			return noTracking(this, "push", args);
		},
		reduce(fn, ...args) {
			return reduce(this, "reduce", fn, args);
		},
		reduceRight(fn, ...args) {
			return reduce(this, "reduceRight", fn, args);
		},
		shift() {
			return noTracking(this, "shift");
		},
		some(fn, thisArg) {
			return apply(this, "some", fn, thisArg, void 0, arguments);
		},
		splice(...args) {
			return noTracking(this, "splice", args);
		},
		toReversed() {
			return reactiveReadArray(this).toReversed();
		},
		toSorted(comparer) {
			return reactiveReadArray(this).toSorted(comparer);
		},
		toSpliced(...args) {
			return reactiveReadArray(this).toSpliced(...args);
		},
		unshift(...args) {
			return noTracking(this, "unshift", args);
		},
		values() {
			return iterator(this, "values", (item) => toWrapped(this, item));
		}
	};
	function iterator(self, method, wrapValue) {
		const arr = shallowReadArray(self);
		const methodFn = arr[method];
		const iter = methodFn.call(arr);
		if (arr !== self && !isShallow(self)) {
			if (iter[Symbol.toStringTag] === "Array Iterator") {
				const wrapped = Object.create(Object.getPrototypeOf(iter));
				wrapped.next = () => wrapResult(iter.next(), wrapValue);
				if (methodFn !== arrayProto[method]) Object.defineProperties(wrapped, {
					return: { get() {
						const fn = iter.return;
						return typeof fn === "function" ? fn.bind(iter) : fn;
					} },
					throw: { get() {
						const fn = iter.throw;
						return typeof fn === "function" ? fn.bind(iter) : fn;
					} }
				});
				return wrapped;
			}
			iter._next = iter.next;
			iter.next = () => wrapResult(iter._next(), wrapValue);
		}
		return iter;
	}
	function wrapResult(result, wrapValue) {
		if (!result.done) result.value = wrapValue(result.value);
		return result;
	}
	var arrayProto = Array.prototype;
	function apply(self, method, fn, thisArg, wrappedRetFn, args) {
		const arr = shallowReadArray(self);
		const needsWrap = arr !== self && !isShallow(self);
		const methodFn = arr[method];
		if (methodFn !== arrayProto[method]) {
			const result2 = methodFn.apply(self, args);
			return needsWrap ? toReactive(result2) : result2;
		}
		let wrappedFn = fn;
		if (arr !== self) {
			if (needsWrap) wrappedFn = function(item, index) {
				return fn.call(this, toWrapped(self, item), index, self);
			};
			else if (fn.length > 2) wrappedFn = function(item, index) {
				return fn.call(this, item, index, self);
			};
		}
		const result = methodFn.call(arr, wrappedFn, thisArg);
		return needsWrap && wrappedRetFn ? wrappedRetFn(result) : result;
	}
	function reduce(self, method, fn, args) {
		const arr = shallowReadArray(self);
		const needsWrap = arr !== self && !isShallow(self);
		let wrappedFn = fn;
		let wrapInitialAccumulator = false;
		if (arr !== self) {
			if (needsWrap) {
				wrapInitialAccumulator = args.length === 0;
				wrappedFn = function(acc, item, index) {
					if (wrapInitialAccumulator) {
						wrapInitialAccumulator = false;
						acc = toWrapped(self, acc);
					}
					return fn.call(this, acc, toWrapped(self, item), index, self);
				};
			} else if (fn.length > 3) wrappedFn = function(acc, item, index) {
				return fn.call(this, acc, item, index, self);
			};
		}
		const result = arr[method](wrappedFn, ...args);
		return wrapInitialAccumulator ? toWrapped(self, result) : result;
	}
	function searchProxy(self, method, args) {
		const arr = toRaw(self);
		track(arr, "iterate", ARRAY_ITERATE_KEY);
		const res = arr[method](...args);
		if ((res === -1 || res === false) && isProxy(args[0])) {
			args[0] = toRaw(args[0]);
			return arr[method](...args);
		}
		return res;
	}
	function noTracking(self, method, args = []) {
		pauseTracking();
		startBatch();
		const res = toRaw(self)[method].apply(self, args);
		endBatch();
		resetTracking();
		return res;
	}
	var isNonTrackableKeys = makeMap(`__proto__,__v_isRef,__isVue`);
	var builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol));
	function hasOwnProperty(key) {
		if (!isSymbol(key)) key = String(key);
		const obj = toRaw(this);
		track(obj, "has", key);
		return obj.hasOwnProperty(key);
	}
	var BaseReactiveHandler = class {
		constructor(_isReadonly = false, _isShallow = false) {
			this._isReadonly = _isReadonly;
			this._isShallow = _isShallow;
		}
		get(target, key, receiver) {
			if (key === "__v_skip") return target["__v_skip"];
			const isReadonly2 = this._isReadonly, isShallow2 = this._isShallow;
			if (key === "__v_isReactive") return !isReadonly2;
			else if (key === "__v_isReadonly") return isReadonly2;
			else if (key === "__v_isShallow") return isShallow2;
			else if (key === "__v_raw") {
				if (receiver === (isReadonly2 ? isShallow2 ? shallowReadonlyMap : readonlyMap : isShallow2 ? shallowReactiveMap : reactiveMap).get(target) || Object.getPrototypeOf(target) === Object.getPrototypeOf(receiver)) return target;
				return;
			}
			const targetIsArray = isArray(target);
			if (!isReadonly2) {
				let fn;
				if (targetIsArray && (fn = arrayInstrumentations[key])) return fn;
				if (key === "hasOwnProperty") return hasOwnProperty;
			}
			const res = Reflect.get(target, key, isRef(target) ? target : receiver);
			if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) return res;
			if (!isReadonly2) track(target, "get", key);
			if (isShallow2) return res;
			if (isRef(res)) {
				const value = targetIsArray && isIntegerKey(key) ? res : res.value;
				return isReadonly2 && isObject(value) ? readonly(value) : value;
			}
			if (isObject(res)) return isReadonly2 ? readonly(res) : reactive(res);
			return res;
		}
	};
	var MutableReactiveHandler = class extends BaseReactiveHandler {
		constructor(isShallow2 = false) {
			super(false, isShallow2);
		}
		set(target, key, value, receiver) {
			let oldValue = target[key];
			const isArrayWithIntegerKey = isArray(target) && isIntegerKey(key);
			if (!this._isShallow) {
				const isOldValueReadonly = isReadonly(oldValue);
				if (!isShallow(value) && !isReadonly(value)) {
					oldValue = toRaw(oldValue);
					value = toRaw(value);
				}
				if (!isArrayWithIntegerKey && isRef(oldValue) && !isRef(value)) {
					if (isOldValueReadonly) return true;
					else {
						oldValue.value = value;
						return true;
					}
				}
			}
			const hadKey = isArrayWithIntegerKey ? Number(key) < target.length : hasOwn(target, key);
			const result = Reflect.set(target, key, value, isRef(target) ? target : receiver);
			if (target === toRaw(receiver) && result) {
				if (!hadKey) trigger(target, "add", key, value);
				else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
			}
			return result;
		}
		deleteProperty(target, key) {
			const hadKey = hasOwn(target, key);
			const oldValue = target[key];
			const result = Reflect.deleteProperty(target, key);
			if (result && hadKey) trigger(target, "delete", key, void 0, oldValue);
			return result;
		}
		has(target, key) {
			const result = Reflect.has(target, key);
			if (!isSymbol(key) || !builtInSymbols.has(key)) track(target, "has", key);
			return result;
		}
		ownKeys(target) {
			track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
			return Reflect.ownKeys(target);
		}
	};
	var ReadonlyReactiveHandler = class extends BaseReactiveHandler {
		constructor(isShallow2 = false) {
			super(true, isShallow2);
		}
		set(target, key) {
			return true;
		}
		deleteProperty(target, key) {
			return true;
		}
	};
	var mutableHandlers = new MutableReactiveHandler();
	var readonlyHandlers = new ReadonlyReactiveHandler();
	var shallowReactiveHandlers = new MutableReactiveHandler(true);
	var toShallow = (value) => value;
	var getProto = (v) => Reflect.getPrototypeOf(v);
	function createIterableMethod(method, isReadonly2, isShallow2) {
		return function(...args) {
			const target = this["__v_raw"];
			const rawTarget = toRaw(target);
			const targetIsMap = isMap(rawTarget);
			const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
			const isKeyOnly = method === "keys" && targetIsMap;
			const innerIterator = target[method](...args);
			const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
			!isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
			return extend(Object.create(innerIterator), { next() {
				const { value, done } = innerIterator.next();
				return done ? {
					value,
					done
				} : {
					value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
					done
				};
			} });
		};
	}
	function createReadonlyMethod(type) {
		return function(...args) {
			return type === "delete" ? false : type === "clear" ? void 0 : this;
		};
	}
	function createInstrumentations(readonly, shallow) {
		const instrumentations = {
			get(key) {
				const target = this["__v_raw"];
				const rawTarget = toRaw(target);
				const rawKey = toRaw(key);
				if (!readonly) {
					if (hasChanged(key, rawKey)) track(rawTarget, "get", key);
					track(rawTarget, "get", rawKey);
				}
				const { has } = getProto(rawTarget);
				const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
				if (has.call(rawTarget, key)) return wrap(target.get(key));
				else if (has.call(rawTarget, rawKey)) return wrap(target.get(rawKey));
				else if (target !== rawTarget) target.get(key);
			},
			get size() {
				const target = this["__v_raw"];
				!readonly && track(toRaw(target), "iterate", ITERATE_KEY);
				return target.size;
			},
			has(key) {
				const target = this["__v_raw"];
				const rawTarget = toRaw(target);
				const rawKey = toRaw(key);
				if (!readonly) {
					if (hasChanged(key, rawKey)) track(rawTarget, "has", key);
					track(rawTarget, "has", rawKey);
				}
				return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
			},
			forEach(callback, thisArg) {
				const observed = this;
				const target = observed["__v_raw"];
				const rawTarget = toRaw(target);
				const wrap = shallow ? toShallow : readonly ? toReadonly : toReactive;
				!readonly && track(rawTarget, "iterate", ITERATE_KEY);
				return target.forEach((value, key) => {
					return callback.call(thisArg, wrap(value), wrap(key), observed);
				});
			}
		};
		extend(instrumentations, readonly ? {
			add: createReadonlyMethod("add"),
			set: createReadonlyMethod("set"),
			delete: createReadonlyMethod("delete"),
			clear: createReadonlyMethod("clear")
		} : {
			add(value) {
				const target = toRaw(this);
				const proto = getProto(target);
				const rawValue = toRaw(value);
				const valueToAdd = !shallow && !isShallow(value) && !isReadonly(value) ? rawValue : value;
				if (!(proto.has.call(target, valueToAdd) || hasChanged(value, valueToAdd) && proto.has.call(target, value) || hasChanged(rawValue, valueToAdd) && proto.has.call(target, rawValue))) {
					target.add(valueToAdd);
					trigger(target, "add", valueToAdd, valueToAdd);
				}
				return this;
			},
			set(key, value) {
				if (!shallow && !isShallow(value) && !isReadonly(value)) value = toRaw(value);
				const target = toRaw(this);
				const { has, get } = getProto(target);
				let hadKey = has.call(target, key);
				if (!hadKey) {
					key = toRaw(key);
					hadKey = has.call(target, key);
				}
				const oldValue = get.call(target, key);
				target.set(key, value);
				if (!hadKey) trigger(target, "add", key, value);
				else if (hasChanged(value, oldValue)) trigger(target, "set", key, value, oldValue);
				return this;
			},
			delete(key) {
				const target = toRaw(this);
				const { has, get } = getProto(target);
				let hadKey = has.call(target, key);
				if (!hadKey) {
					key = toRaw(key);
					hadKey = has.call(target, key);
				}
				const oldValue = get ? get.call(target, key) : void 0;
				const result = target.delete(key);
				if (hadKey) trigger(target, "delete", key, void 0, oldValue);
				return result;
			},
			clear() {
				const target = toRaw(this);
				const hadItems = target.size !== 0;
				const oldTarget = void 0;
				const result = target.clear();
				if (hadItems) trigger(target, "clear", void 0, void 0, oldTarget);
				return result;
			}
		});
		[
			"keys",
			"values",
			"entries",
			Symbol.iterator
		].forEach((method) => {
			instrumentations[method] = createIterableMethod(method, readonly, shallow);
		});
		return instrumentations;
	}
	function createInstrumentationGetter(isReadonly2, shallow) {
		const instrumentations = createInstrumentations(isReadonly2, shallow);
		return (target, key, receiver) => {
			if (key === "__v_isReactive") return !isReadonly2;
			else if (key === "__v_isReadonly") return isReadonly2;
			else if (key === "__v_isShallow") return shallow;
			else if (key === "__v_raw") return target;
			return Reflect.get(hasOwn(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
		};
	}
	var mutableCollectionHandlers = { get: createInstrumentationGetter(false, false) };
	var shallowCollectionHandlers = { get: createInstrumentationGetter(false, true) };
	var readonlyCollectionHandlers = { get: createInstrumentationGetter(true, false) };
	var reactiveMap = new WeakMap();
	var shallowReactiveMap = new WeakMap();
	var readonlyMap = new WeakMap();
	var shallowReadonlyMap = new WeakMap();
	function targetTypeMap(rawType) {
		switch (rawType) {
			case "Object":
			case "Array": return 1;
			case "Map":
			case "Set":
			case "WeakMap":
			case "WeakSet": return 2;
			default: return 0;
		}
	}
	function reactive(target) {
		if (isReadonly(target)) return target;
		return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
	}
	function shallowReactive(target) {
		return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
	}
	function readonly(target) {
		return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
	}
	function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
		if (!isObject(target)) return target;
		if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) return target;
		if (target["__v_skip"] || !Object.isExtensible(target)) return target;
		const existingProxy = proxyMap.get(target);
		if (existingProxy) return existingProxy;
		const targetType = targetTypeMap(toRawType(target));
		if (targetType === 0) return target;
		const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
		proxyMap.set(target, proxy);
		return proxy;
	}
	function isReactive(value) {
		if (isReadonly(value)) return isReactive(value["__v_raw"]);
		return !!(value && value["__v_isReactive"]);
	}
	function isReadonly(value) {
		return !!(value && value["__v_isReadonly"]);
	}
	function isShallow(value) {
		return !!(value && value["__v_isShallow"]);
	}
	function isProxy(value) {
		return value ? !!value["__v_raw"] : false;
	}
	function toRaw(observed) {
		const raw = observed && observed["__v_raw"];
		return raw ? toRaw(raw) : observed;
	}
	function markRaw(value) {
		if (!hasOwn(value, "__v_skip") && Object.isExtensible(value)) def(value, "__v_skip", true);
		return value;
	}
	var toReactive = (value) => isObject(value) ? reactive(value) : value;
	var toReadonly = (value) => isObject(value) ? readonly(value) : value;
	function isRef(r) {
		return r ? r["__v_isRef"] === true : false;
	}
	function ref(value) {
		return createRef(value, false);
	}
	function createRef(rawValue, shallow) {
		if (isRef(rawValue)) return rawValue;
		return new RefImpl(rawValue, shallow);
	}
	var RefImpl = class {
		constructor(value, isShallow2) {
			this.dep = new Dep();
			this["__v_isRef"] = true;
			this["__v_isShallow"] = false;
			this._rawValue = isShallow2 ? value : toRaw(value);
			this._value = isShallow2 ? value : toReactive(value);
			this["__v_isShallow"] = isShallow2;
		}
		get value() {
			this.dep.track();
			return this._value;
		}
		set value(newValue) {
			const oldValue = this._rawValue;
			const useDirectValue = this["__v_isShallow"] || isShallow(newValue) || isReadonly(newValue);
			newValue = useDirectValue ? newValue : toRaw(newValue);
			if (hasChanged(newValue, oldValue)) {
				this._rawValue = newValue;
				this._value = useDirectValue ? newValue : toReactive(newValue);
				this.dep.trigger();
			}
		}
	};
	function unref(ref2) {
		return isRef(ref2) ? ref2.value : ref2;
	}
	var shallowUnwrapHandlers = {
		get: (target, key, receiver) => key === "__v_raw" ? target : unref(Reflect.get(target, key, receiver)),
		set: (target, key, value, receiver) => {
			const oldValue = target[key];
			if (isRef(oldValue) && !isRef(value)) {
				oldValue.value = value;
				return true;
			} else return Reflect.set(target, key, value, receiver);
		}
	};
	function proxyRefs(objectWithRefs) {
		return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
	}
	var ComputedRefImpl = class {
		constructor(fn, setter, isSSR) {
			this.fn = fn;
			this.setter = setter;
			this._value = void 0;
			this.dep = new Dep(this);
			this.__v_isRef = true;
			this.deps = void 0;
			this.depsTail = void 0;
			this.flags = 16;
			this.globalVersion = globalVersion - 1;
			this.next = void 0;
			this.effect = this;
			this["__v_isReadonly"] = !setter;
			this.isSSR = isSSR;
		}
		notify() {
			this.flags |= 16;
			if (!(this.flags & 8) && activeSub !== this) {
				batch(this, true);
				return true;
			}
		}
		get value() {
			const link = this.dep.track();
			refreshComputed(this);
			if (link) link.version = this.dep.version;
			return this._value;
		}
		set value(newValue) {
			if (this.setter) this.setter(newValue);
		}
	};
	function computed$1(getterOrOptions, debugOptions, isSSR = false) {
		let getter;
		let setter;
		if (isFunction(getterOrOptions)) getter = getterOrOptions;
		else {
			getter = getterOrOptions.get;
			setter = getterOrOptions.set;
		}
		return new ComputedRefImpl(getter, setter, isSSR);
	}
	var INITIAL_WATCHER_VALUE = {};
	var cleanupMap = new WeakMap();
	var activeWatcher = void 0;
	function onWatcherCleanup(cleanupFn, failSilently = false, owner = activeWatcher) {
		if (owner) {
			let cleanups = cleanupMap.get(owner);
			if (!cleanups) cleanupMap.set(owner, cleanups = []);
			cleanups.push(cleanupFn);
		}
	}
	function watch$1(source, cb, options = EMPTY_OBJ) {
		const { immediate, deep, once, scheduler, augmentJob, call } = options;
		const reactiveGetter = (source2) => {
			if (deep) return source2;
			if (isShallow(source2) || deep === false || deep === 0) return traverse(source2, 1);
			return traverse(source2);
		};
		let effect;
		let getter;
		let cleanup;
		let boundCleanup;
		let forceTrigger = false;
		let isMultiSource = false;
		if (isRef(source)) {
			getter = () => source.value;
			forceTrigger = isShallow(source);
		} else if (isReactive(source)) {
			getter = () => reactiveGetter(source);
			forceTrigger = true;
		} else if (isArray(source)) {
			isMultiSource = true;
			forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
			getter = () => source.map((s) => {
				if (isRef(s)) return s.value;
				else if (isReactive(s)) return reactiveGetter(s);
				else if (isFunction(s)) return call ? call(s, 2) : s();
			});
		} else if (isFunction(source)) {
			if (cb) getter = call ? () => call(source, 2) : source;
			else getter = () => {
				if (cleanup) {
					pauseTracking();
					try {
						cleanup();
					} finally {
						resetTracking();
					}
				}
				const currentEffect = activeWatcher;
				activeWatcher = effect;
				try {
					return call ? call(source, 3, [boundCleanup]) : source(boundCleanup);
				} finally {
					activeWatcher = currentEffect;
				}
			};
		} else getter = NOOP;
		if (cb && deep) {
			const baseGetter = getter;
			const depth = deep === true ? Infinity : deep;
			getter = () => traverse(baseGetter(), depth);
		}
		const scope = getCurrentScope();
		const watchHandle = () => {
			effect.stop();
			if (scope && scope.active) remove(scope.effects, effect);
		};
		if (once && cb) {
			const _cb = cb;
			cb = (...args) => {
				try {
					return _cb(...args);
				} finally {
					watchHandle();
				}
			};
		}
		let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
		const job = (immediateFirstRun) => {
			if (!(effect.flags & 1) || !effect.dirty && !immediateFirstRun) return;
			if (cb) {
				const newValue = effect.run();
				if (immediateFirstRun || deep || forceTrigger || (isMultiSource ? newValue.some((v, i) => hasChanged(v, oldValue[i])) : hasChanged(newValue, oldValue))) {
					const currentWatcher = activeWatcher;
					pauseTracking();
					try {
						if (cleanup) cleanup();
						activeWatcher = effect;
						const args = [
							newValue,
							oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
							boundCleanup
						];
						oldValue = newValue;
						call ? call(cb, 3, args) : cb(...args);
					} finally {
						activeWatcher = currentWatcher;
						resetTracking();
					}
				}
			} else effect.run();
		};
		if (augmentJob) augmentJob(job);
		effect = new ReactiveEffect(getter);
		effect.scheduler = scheduler ? () => scheduler(job, false) : job;
		boundCleanup = (fn) => onWatcherCleanup(fn, false, effect);
		cleanup = effect.onStop = () => {
			const cleanups = cleanupMap.get(effect);
			if (cleanups) {
				if (call) call(cleanups, 4);
				else for (const cleanup2 of cleanups) cleanup2();
				cleanupMap.delete(effect);
			}
		};
		if (cb) {
			if (immediate) job(true);
			else oldValue = effect.run();
		} else if (scheduler) scheduler(job.bind(null, true), true);
		else effect.run();
		watchHandle.pause = effect.pause.bind(effect);
		watchHandle.resume = effect.resume.bind(effect);
		watchHandle.stop = watchHandle;
		return watchHandle;
	}
	function traverse(value, depth = Infinity, seen) {
		if (depth <= 0 || !isObject(value) || value["__v_skip"]) return value;
		seen = seen || new Map();
		if ((seen.get(value) || 0) >= depth) return value;
		seen.set(value, depth);
		depth--;
		if (isRef(value)) traverse(value.value, depth, seen);
		else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
		else if (isSet(value) || isMap(value)) value.forEach((v) => {
			traverse(v, depth, seen);
		});
		else if (isPlainObject$1(value)) {
			for (const key in value) traverse(value[key], depth, seen);
			for (const key of Object.getOwnPropertySymbols(value)) if (Object.prototype.propertyIsEnumerable.call(value, key)) traverse(value[key], depth, seen);
		}
		return value;
	}
	function callWithErrorHandling(fn, instance, type, args) {
		try {
			return args ? fn(...args) : fn();
		} catch (err) {
			handleError(err, instance, type);
		}
	}
	function callWithAsyncErrorHandling(fn, instance, type, args) {
		if (isFunction(fn)) {
			const res = callWithErrorHandling(fn, instance, type, args);
			if (res && isPromise(res)) res.catch((err) => {
				handleError(err, instance, type);
			});
			return res;
		}
		if (isArray(fn)) {
			const values = [];
			for (let i = 0; i < fn.length; i++) values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
			return values;
		}
	}
	function handleError(err, instance, type, throwInDev = true) {
		const contextVNode = instance ? instance.vnode : null;
		const { errorHandler, throwUnhandledErrorInProduction } = instance && instance.appContext.config || EMPTY_OBJ;
		if (instance) {
			let cur = instance.parent;
			const exposedInstance = instance.proxy;
			const errorInfo = `https://vuejs.org/error-reference/#runtime-${type}`;
			while (cur) {
				const errorCapturedHooks = cur.ec;
				if (errorCapturedHooks) {
					for (let i = 0; i < errorCapturedHooks.length; i++) if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) return;
				}
				cur = cur.parent;
			}
			if (errorHandler) {
				pauseTracking();
				callWithErrorHandling(errorHandler, null, 10, [
					err,
					exposedInstance,
					errorInfo
				]);
				resetTracking();
				return;
			}
		}
		logError(err, type, contextVNode, throwInDev, throwUnhandledErrorInProduction);
	}
	function logError(err, type, contextVNode, throwInDev = true, throwInProd = false) {
		if (throwInProd) throw err;
		else console.error(err);
	}
	var queue = [];
	var flushIndex = -1;
	var pendingPostFlushCbs = [];
	var activePostFlushCbs = null;
	var postFlushIndex = 0;
	var resolvedPromise = Promise.resolve();
	var currentFlushPromise = null;
	function nextTick(fn) {
		const p = currentFlushPromise || resolvedPromise;
		return fn ? p.then(this ? fn.bind(this) : fn) : p;
	}
	function findInsertionIndex(id) {
		let start = flushIndex + 1;
		let end = queue.length;
		while (start < end) {
			const middle = start + end >>> 1;
			const middleJob = queue[middle];
			const middleJobId = getId(middleJob);
			if (middleJobId < id || middleJobId === id && middleJob.flags & 2) start = middle + 1;
			else end = middle;
		}
		return start;
	}
	function queueJob(job) {
		if (!(job.flags & 1)) {
			const jobId = getId(job);
			const lastJob = queue[queue.length - 1];
			if (!lastJob || !(job.flags & 2) && jobId >= getId(lastJob)) queue.push(job);
			else queue.splice(findInsertionIndex(jobId), 0, job);
			job.flags |= 1;
			queueFlush();
		}
	}
	function queueFlush() {
		if (!currentFlushPromise) currentFlushPromise = resolvedPromise.then(flushJobs);
	}
	function queuePostFlushCb(cb) {
		if (!isArray(cb)) {
			if (activePostFlushCbs && cb.id === -1) activePostFlushCbs.splice(postFlushIndex + 1, 0, cb);
			else if (!(cb.flags & 1)) {
				pendingPostFlushCbs.push(cb);
				cb.flags |= 1;
			}
		} else for (let i = 0; i < cb.length; i++) pendingPostFlushCbs.push(cb[i]);
		queueFlush();
	}
	function flushPreFlushCbs(instance, minUid, seen, i = flushIndex + 1) {
		for (; i < queue.length; i++) {
			const cb = queue[i];
			if (cb && cb.flags & 2) {
				if (instance && cb.id !== instance.uid || minUid !== void 0 && !(cb.id >= minUid)) continue;
				queue.splice(i, 1);
				i = instance ? i - 1 : flushIndex;
				if (cb.flags & 4) cb.flags &= -2;
				cb();
				if (!(cb.flags & 4)) cb.flags &= -2;
			}
		}
	}
	function flushPostFlushCbs(seen, skip, minUid = 0) {
		if (pendingPostFlushCbs.length) {
			let cbs = pendingPostFlushCbs;
			let kept = 0;
			if (skip) {
				cbs = [];
				for (let i = 0; i < pendingPostFlushCbs.length; i++) {
					const cb = pendingPostFlushCbs[i];
					if (cb.i !== void 0 ? !cb.i || cb.i.uid < minUid : skip.has(cb)) pendingPostFlushCbs[kept++] = cb;
					else cbs.push(cb);
				}
			}
			const deduped = [...new Set(cbs)].sort((a, b) => getId(a) - getId(b));
			pendingPostFlushCbs.length = kept;
			if (activePostFlushCbs) {
				for (let i = 0; i < deduped.length; i++) activePostFlushCbs.push(deduped[i]);
				return;
			}
			activePostFlushCbs = deduped;
			for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
				const cb = activePostFlushCbs[postFlushIndex];
				if (cb.flags & 4) cb.flags &= -2;
				if (!(cb.flags & 8)) cb();
				cb.flags &= -2;
			}
			activePostFlushCbs = null;
			postFlushIndex = 0;
		}
	}
	var isFlushing = false;
	function flushOnAppMount(fn, minUid) {
		if (isFlushing) {
			fn();
			return;
		}
		const queued = minUid === void 0 ? void 0 : new Set(pendingPostFlushCbs);
		fn();
		isFlushing = true;
		try {
			flushPreFlushCbs(void 0, minUid);
			flushPostFlushCbs(void 0, queued, minUid);
		} finally {
			isFlushing = false;
		}
	}
	var getId = (job) => job.id == null ? job.flags & 2 ? -1 : Infinity : job.id;
	function flushJobs(seen) {
		try {
			for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
				const job = queue[flushIndex];
				if (job && !(job.flags & 8)) {
					if (job.flags & 4) job.flags &= -2;
					callWithErrorHandling(job, job.i, job.i ? 15 : 14);
					if (!(job.flags & 4)) job.flags &= -2;
				}
			}
		} finally {
			for (; flushIndex < queue.length; flushIndex++) {
				const job = queue[flushIndex];
				if (job) job.flags &= -2;
			}
			flushIndex = -1;
			queue.length = 0;
			flushPostFlushCbs(seen);
			currentFlushPromise = null;
			if (queue.length || pendingPostFlushCbs.length) flushJobs(seen);
		}
	}
	var currentRenderingInstance = null;
	var currentScopeId = null;
	function setCurrentRenderingInstance(instance) {
		const prev = currentRenderingInstance;
		currentRenderingInstance = instance;
		currentScopeId = instance && instance.type.__scopeId || null;
		return prev;
	}
	function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
		if (!ctx) return fn;
		if (fn._n) return fn;
		const renderFnWithContext = (...args) => {
			if (renderFnWithContext._d) setBlockTracking(-1);
			const prevInstance = setCurrentRenderingInstance(ctx);
			const prevStackSize = blockStack.length;
			let res;
			try {
				res = fn(...args);
			} finally {
				for (let i = blockStack.length; i > prevStackSize; i--) closeBlock();
				setCurrentRenderingInstance(prevInstance);
				if (renderFnWithContext._d) setBlockTracking(1);
			}
			return res;
		};
		renderFnWithContext._n = true;
		renderFnWithContext._c = true;
		renderFnWithContext._d = true;
		return renderFnWithContext;
	}
	function withDirectives(vnode, directives) {
		if (currentRenderingInstance === null) return vnode;
		const instance = getComponentPublicInstance(currentRenderingInstance);
		const bindings = vnode.dirs || (vnode.dirs = []);
		for (let i = 0; i < directives.length; i++) {
			let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
			if (dir) {
				if (isFunction(dir)) dir = {
					mounted: dir,
					updated: dir
				};
				if (dir.deep) traverse(value);
				bindings.push({
					dir,
					instance,
					value,
					oldValue: void 0,
					arg,
					modifiers
				});
			}
		}
		return vnode;
	}
	function invokeDirectiveHook(vnode, prevVNode, instance, name) {
		const bindings = vnode.dirs;
		const oldBindings = prevVNode && prevVNode.dirs;
		for (let i = 0; i < bindings.length; i++) {
			const binding = bindings[i];
			if (oldBindings) binding.oldValue = oldBindings[i].value;
			let hook = binding.dir[name];
			if (hook) {
				pauseTracking();
				callWithAsyncErrorHandling(hook, instance, 8, [
					vnode.el,
					binding,
					vnode,
					prevVNode
				]);
				resetTracking();
			}
		}
	}
	function provide(key, value) {
		if (currentInstance) {
			let provides = currentInstance.provides;
			const parentProvides = currentInstance.parent && currentInstance.parent.provides;
			if (parentProvides === provides) provides = currentInstance.provides = Object.create(parentProvides);
			provides[key] = value;
		}
	}
	function inject(key, defaultValue, treatDefaultAsFactory = false) {
		const instance = getCurrentInstance();
		if (instance || currentApp) {
			let provides = currentApp ? currentApp._context.provides : instance ? instance.parent == null || instance.ce ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : void 0;
			if (provides && key in provides) return provides[key];
			else if (arguments.length > 1) return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
		}
	}
	var ssrContextKey = Symbol.for("v-scx");
	var useSSRContext = () => {
		{
			const ctx = inject(ssrContextKey);
			if (!ctx) {}
			return ctx;
		}
	};
	function watch(source, cb, options) {
		return doWatch(source, cb, options);
	}
	function doWatch(source, cb, options = EMPTY_OBJ) {
		const { immediate, deep, flush, once } = options;
		const baseWatchOptions = extend({}, options);
		const runsImmediately = cb && immediate || !cb && flush !== "post";
		let ssrCleanup;
		if (isInSSRComponentSetup) {
			if (flush === "sync") {
				const ctx = useSSRContext();
				ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
			} else if (!runsImmediately) {
				const watchStopHandle = () => {};
				watchStopHandle.stop = NOOP;
				watchStopHandle.resume = NOOP;
				watchStopHandle.pause = NOOP;
				return watchStopHandle;
			}
		}
		const instance = currentInstance;
		baseWatchOptions.call = (fn, type, args) => callWithAsyncErrorHandling(fn, instance, type, args);
		let isPre = false;
		if (flush === "post") baseWatchOptions.scheduler = (job) => {
			job.i = instance;
			queuePostRenderEffect(job, instance && instance.suspense);
		};
		else if (flush !== "sync") {
			isPre = true;
			baseWatchOptions.scheduler = (job, isFirstRun) => {
				if (isFirstRun) job();
				else queueJob(job);
			};
		}
		baseWatchOptions.augmentJob = (job) => {
			if (cb) job.flags |= 4;
			if (isPre) {
				job.flags |= 2;
				if (instance) {
					job.id = instance.uid;
					job.i = instance;
				}
			}
		};
		const watchHandle = watch$1(source, cb, baseWatchOptions);
		if (isInSSRComponentSetup) {
			if (ssrCleanup) ssrCleanup.push(watchHandle);
			else if (runsImmediately) watchHandle();
		}
		return watchHandle;
	}
	function instanceWatch(source, value, options) {
		const publicThis = this.proxy;
		const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
		let cb;
		if (isFunction(value)) cb = value;
		else {
			cb = value.handler;
			options = value;
		}
		const reset = setCurrentInstance(this);
		const res = doWatch(getter, cb.bind(publicThis), options);
		reset();
		return res;
	}
	function createPathGetter(ctx, path) {
		const segments = path.split(".");
		return () => {
			let cur = ctx;
			for (let i = 0; i < segments.length && cur; i++) cur = cur[segments[i]];
			return cur;
		};
	}
	var pendingMounts = new WeakMap();
	var TeleportEndKey = Symbol("_vte");
	var isTeleport = (type) => type.__isTeleport;
	var isTeleportDisabled = (props) => props && (props.disabled || props.disabled === "");
	var isTeleportDeferred = (props) => props && (props.defer || props.defer === "");
	var isTargetSVG = (target) => typeof SVGElement !== "undefined" && target instanceof SVGElement;
	var isTargetMathML = (target) => typeof MathMLElement === "function" && target instanceof MathMLElement;
	var resolveTarget = (props, select) => {
		const targetSelector = props && props.to;
		if (isString(targetSelector)) {
			if (!select) return null;
			else return select(targetSelector);
		} else return targetSelector;
	};
	var TeleportImpl = {
		name: "Teleport",
		__isTeleport: true,
		process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals) {
			const { mc: mountChildren, pc: patchChildren, pbc: patchBlockChildren, o: { insert, querySelector, createText, createComment, parentNode } } = internals;
			const disabled = isTeleportDisabled(n2.props);
			let { dynamicChildren } = n2;
			const mount = (vnode, container2, anchor2) => {
				if (vnode.shapeFlag & 16) mountChildren(vnode.children, container2, anchor2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			};
			const mountToTarget = (vnode = n2) => {
				const disabled2 = isTeleportDisabled(vnode.props);
				const target = vnode.target = resolveTarget(vnode.props, querySelector);
				const targetAnchor = prepareAnchor(target, vnode, createText, insert);
				if (target) {
					if (namespace !== "svg" && isTargetSVG(target)) namespace = "svg";
					else if (namespace !== "mathml" && isTargetMathML(target)) namespace = "mathml";
					if (parentComponent && parentComponent.isCE) (parentComponent.ce._teleportTargets || (parentComponent.ce._teleportTargets = new Set())).add(target);
					if (!disabled2) {
						mount(vnode, target, targetAnchor);
						updateCssVars(vnode, false);
					}
				}
			};
			const queuePendingMount = (vnode) => {
				const mountJob = () => {
					if (pendingMounts.get(vnode) !== mountJob) return;
					pendingMounts.delete(vnode);
					if (isTeleportDisabled(vnode.props)) {
						const mountContainer = parentNode(vnode.el) || container;
						mount(vnode, mountContainer, vnode.anchor);
						updateCssVars(vnode, true);
					}
					mountToTarget(vnode);
				};
				pendingMounts.set(vnode, mountJob);
				queuePostRenderEffect(mountJob, parentSuspense);
			};
			if (n1 == null) {
				const placeholder = n2.el = createText("");
				const mainAnchor = n2.anchor = createText("");
				insert(placeholder, container, anchor);
				insert(mainAnchor, container, anchor);
				if (isTeleportDeferred(n2.props) || parentSuspense && parentSuspense.pendingBranch) {
					queuePendingMount(n2);
					return;
				}
				if (disabled) {
					mount(n2, container, mainAnchor);
					updateCssVars(n2, true);
				}
				mountToTarget();
			} else {
				n2.el = n1.el;
				const mainAnchor = n2.anchor = n1.anchor;
				const pendingMount = pendingMounts.get(n1);
				if (pendingMount) {
					pendingMount.flags |= 8;
					pendingMounts.delete(n1);
					queuePendingMount(n2);
					return;
				}
				n2.targetStart = n1.targetStart;
				const target = n2.target = n1.target;
				const targetAnchor = n2.targetAnchor = n1.targetAnchor;
				const wasDisabled = isTeleportDisabled(n1.props);
				const currentContainer = wasDisabled ? container : target;
				const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
				if (namespace === "svg" || isTargetSVG(target)) namespace = "svg";
				else if (namespace === "mathml" || isTargetMathML(target)) namespace = "mathml";
				if (dynamicChildren) {
					patchBlockChildren(n1.dynamicChildren, dynamicChildren, currentContainer, parentComponent, parentSuspense, namespace, slotScopeIds);
					traverseStaticChildren(n1, n2, true);
				} else if (!optimized) patchChildren(n1, n2, currentContainer, currentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, false);
				if (disabled) {
					if (!wasDisabled) moveTeleport(n2, container, mainAnchor, internals, 1);
					else if (n2.props && n1.props && n2.props.to !== n1.props.to) n2.props.to = n1.props.to;
				} else if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
					const nextTarget = resolveTarget(n2.props, querySelector);
					if (nextTarget) {
						n2.target = nextTarget;
						moveTeleport(n2, nextTarget, null, internals, 0);
					}
				} else if (wasDisabled) moveTeleport(n2, target, targetAnchor, internals, 1);
				updateCssVars(n2, disabled);
			}
		},
		remove(vnode, parentComponent, parentSuspense, { um: unmount, o: { remove: hostRemove } }, doRemove) {
			const { shapeFlag, children, anchor, targetStart, targetAnchor, target, props } = vnode;
			const disabled = isTeleportDisabled(props);
			const shouldRemove = doRemove || !disabled;
			const pendingMount = pendingMounts.get(vnode);
			if (pendingMount) {
				pendingMount.flags |= 8;
				pendingMounts.delete(vnode);
			}
			if (target) {
				hostRemove(targetStart);
				hostRemove(targetAnchor);
			}
			doRemove && hostRemove(anchor);
			if (!pendingMount && (disabled || target) && shapeFlag & 16) for (let i = 0; i < children.length; i++) {
				const child = children[i];
				unmount(child, parentComponent, parentSuspense, shouldRemove, !!child.dynamicChildren);
			}
		},
		move: moveTeleport,
		hydrate: hydrateTeleport
	};
	function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
		if (moveType === 0) {
			if (vnode.targetStart) insert(vnode.targetStart, container, parentAnchor);
			insert(vnode.targetAnchor, container, parentAnchor);
			parentAnchor = vnode.targetAnchor;
		}
		const { el, anchor, shapeFlag, children, props } = vnode;
		const isReorder = moveType === 2;
		if (isReorder) insert(el, container, parentAnchor);
		if (!pendingMounts.has(vnode) && (!isReorder || isTeleportDisabled(props))) {
			if (shapeFlag & 16) for (let i = 0; i < children.length; i++) move(children[i], container, parentAnchor, 2);
		}
		if (isReorder) insert(anchor, container, parentAnchor);
	}
	function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, { o: { nextSibling, parentNode, querySelector, insert, createText } }, hydrateChildren) {
		function hydrateAnchor(target2, targetNode) {
			let targetAnchor = targetNode;
			while (targetAnchor) {
				if (targetAnchor && targetAnchor.nodeType === 8) {
					if (targetAnchor.data === "teleport start anchor") vnode.targetStart = targetAnchor;
					else if (targetAnchor.data === "teleport anchor") {
						vnode.targetAnchor = targetAnchor;
						target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
						break;
					}
				}
				targetAnchor = nextSibling(targetAnchor);
			}
		}
		function hydrateDisabledTeleport(node2, vnode2) {
			vnode2.anchor = hydrateChildren(nextSibling(node2), vnode2, parentNode(node2), parentComponent, parentSuspense, slotScopeIds, optimized);
		}
		const target = vnode.target = resolveTarget(vnode.props, querySelector);
		const disabled = isTeleportDisabled(vnode.props);
		if (target) {
			const targetNode = target._lpa || target.firstChild;
			if (vnode.shapeFlag & 16) {
				if (disabled) {
					hydrateDisabledTeleport(node, vnode);
					hydrateAnchor(target, targetNode);
					if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert, parentNode(node) === target ? node : null);
				} else {
					vnode.anchor = nextSibling(node);
					hydrateAnchor(target, targetNode);
					if (!vnode.targetAnchor) prepareAnchor(target, vnode, createText, insert);
					hydrateChildren(targetNode && nextSibling(targetNode), vnode, target, parentComponent, parentSuspense, slotScopeIds, optimized);
				}
			}
			updateCssVars(vnode, disabled);
		} else if (disabled) {
			if (vnode.shapeFlag & 16) {
				hydrateDisabledTeleport(node, vnode);
				vnode.targetStart = node;
				vnode.targetAnchor = nextSibling(node);
			}
		}
		return vnode.anchor && nextSibling(vnode.anchor);
	}
	var Teleport = TeleportImpl;
	function updateCssVars(vnode, isDisabled) {
		const ctx = vnode.ctx;
		if (ctx && ctx.ut) {
			let node, anchor;
			if (isDisabled) {
				node = vnode.el;
				anchor = vnode.anchor;
			} else {
				node = vnode.targetStart;
				anchor = vnode.targetAnchor;
			}
			while (node && node !== anchor) {
				if (node.nodeType === 1) node.setAttribute("data-v-owner", ctx.uid);
				node = node.nextSibling;
			}
			ctx.ut();
		}
	}
	function prepareAnchor(target, vnode, createText, insert, anchor = null) {
		const targetStart = vnode.targetStart = createText("");
		const targetAnchor = vnode.targetAnchor = createText("");
		targetStart[TeleportEndKey] = targetAnchor;
		if (target) {
			insert(targetStart, target, anchor);
			insert(targetAnchor, target, anchor);
		}
		return targetAnchor;
	}
	var leaveCbKey = Symbol("_leaveCb");
	function findNonCommentChild(children) {
		let child = children[0];
		if (children.length > 1) {
			for (const c of children) if (c.type !== Comment) {
				child = c;
				break;
			}
		}
		return child;
	}
	function getInnerChild$1(vnode) {
		if (!isKeepAlive(vnode)) {
			if (isTeleport(vnode.type) && vnode.children) return findNonCommentChild(vnode.children);
			return vnode;
		}
		if (vnode.component) return vnode.component.subTree;
		const { shapeFlag, children } = vnode;
		if (children) {
			if (shapeFlag & 16) return children[0];
			if (shapeFlag & 32 && isFunction(children.default)) return children.default();
		}
	}
	function setTransitionHooks(vnode, hooks) {
		if (vnode.shapeFlag & 6 && vnode.component) {
			vnode.transition = hooks;
			const subTree = vnode.component.subTree;
			setTransitionHooks(isTeleport(subTree.type) ? getInnerChild$1(subTree) || subTree : subTree, hooks);
		} else if (vnode.shapeFlag & 128) {
			vnode.ssContent.transition = hooks.clone(vnode.ssContent);
			vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
		} else {
			vnode.transition = hooks;
			if (vnode.type === Fragment && isArray(vnode.children)) {
				const child = filterSingleRoot(vnode.children, false);
				if (child) setTransitionHooks(child, hooks);
			}
		}
	}
	function getTransitionRoot(vnode) {
		if (vnode.component) return getTransitionRoot(vnode.component.subTree);
		if (vnode.type === Fragment) {
			const child = isArray(vnode.children) && filterSingleRoot(vnode.children, false);
			return child ? getTransitionRoot(child) : void 0;
		}
		if (vnode.type !== Comment) return vnode;
	}
	function markAsyncBoundary(instance) {
		instance.ids = [
			instance.ids[0] + instance.ids[2]++ + "-",
			0,
			0
		];
	}
	function isTemplateRefKey(refs, key) {
		let desc;
		return !!((desc = Object.getOwnPropertyDescriptor(refs, key)) && !desc.configurable);
	}
	var pendingSetRefMap = new WeakMap();
	function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
		if (isArray(rawRef)) {
			rawRef.forEach((r, i) => setRef(r, oldRawRef && (isArray(oldRawRef) ? oldRawRef[i] : oldRawRef), parentSuspense, vnode, isUnmount));
			return;
		}
		if (isAsyncWrapper(vnode) && !isUnmount) {
			if (vnode.shapeFlag & 512 && vnode.type.__asyncResolved && vnode.component.subTree.component) setRef(rawRef, oldRawRef, parentSuspense, vnode.component.subTree);
			return;
		}
		const refValue = vnode.shapeFlag & 4 ? getComponentPublicInstance(vnode.component) : vnode.el;
		const value = isUnmount ? null : refValue;
		const { i: owner, r: ref } = rawRef;
		const oldRef = oldRawRef && oldRawRef.r;
		const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
		const setupState = owner.setupState;
		const rawSetupState = toRaw(setupState);
		const canSetSetupRef = setupState === EMPTY_OBJ ? NO : (key) => {
			if (isTemplateRefKey(refs, key)) return false;
			return hasOwn(rawSetupState, key);
		};
		const canSetRef = (ref2, key) => {
			if (key && isTemplateRefKey(refs, key)) return false;
			return true;
		};
		if (oldRef != null && oldRef !== ref) {
			invalidatePendingSetRef(oldRawRef);
			if (isString(oldRef)) {
				refs[oldRef] = null;
				if (canSetSetupRef(oldRef)) setupState[oldRef] = null;
			} else if (isRef(oldRef)) {
				const oldRawRefAtom = oldRawRef;
				if (canSetRef(oldRef, oldRawRefAtom.k)) oldRef.value = null;
				if (oldRawRefAtom.k) refs[oldRawRefAtom.k] = null;
			}
		}
		if (isFunction(ref)) callWithErrorHandling(ref, owner, 12, [value, refs]);
		else {
			const _isString = isString(ref);
			const _isRef = isRef(ref);
			if (_isString || _isRef) {
				const doSet = () => {
					if (rawRef.f) {
						const existing = _isString ? canSetSetupRef(ref) ? setupState[ref] : refs[ref] : canSetRef(ref) || !rawRef.k ? ref.value : refs[rawRef.k];
						if (isUnmount) isArray(existing) && remove(existing, refValue);
						else if (!isArray(existing)) {
							if (_isString) {
								refs[ref] = [refValue];
								if (canSetSetupRef(ref)) setupState[ref] = refs[ref];
							} else {
								const newVal = [refValue];
								if (canSetRef(ref, rawRef.k)) ref.value = newVal;
								if (rawRef.k) refs[rawRef.k] = newVal;
							}
						} else if (!existing.includes(refValue)) existing.push(refValue);
					} else if (_isString) {
						refs[ref] = value;
						if (canSetSetupRef(ref)) setupState[ref] = value;
					} else if (_isRef) {
						if (canSetRef(ref, rawRef.k)) ref.value = value;
						if (rawRef.k) refs[rawRef.k] = value;
					}
				};
				if (value) {
					const job = () => {
						doSet();
						pendingSetRefMap.delete(rawRef);
					};
					job.id = -1;
					pendingSetRefMap.set(rawRef, job);
					queuePostRenderEffect(job, parentSuspense);
				} else {
					invalidatePendingSetRef(rawRef);
					doSet();
				}
			}
		}
	}
	function invalidatePendingSetRef(rawRef) {
		const pendingSetRef = pendingSetRefMap.get(rawRef);
		if (pendingSetRef) {
			pendingSetRef.flags |= 8;
			pendingSetRefMap.delete(rawRef);
		}
	}
	getGlobalThis().requestIdleCallback;
	getGlobalThis().cancelIdleCallback;
	var isAsyncWrapper = (i) => !!i.type.__asyncLoader;
	var isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
	function onActivated(hook, target) {
		registerKeepAliveHook(hook, "a", target);
	}
	function onDeactivated(hook, target) {
		registerKeepAliveHook(hook, "da", target);
	}
	function registerKeepAliveHook(hook, type, target = currentInstance) {
		const wrappedHook = hook.__wdc || (hook.__wdc = () => {
			let current = target;
			while (current) {
				if (current.isDeactivated) return;
				current = current.parent;
			}
			return hook();
		});
		injectHook(type, wrappedHook, target);
		if (target) {
			let current = target.parent;
			while (current && current.parent) {
				if (isKeepAlive(current.parent.vnode)) injectToKeepAliveRoot(wrappedHook, type, target, current);
				current = current.parent;
			}
		}
	}
	function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
		const injected = injectHook(type, hook, keepAliveRoot, true);
		onUnmounted(() => {
			remove(keepAliveRoot[type], injected);
		}, target);
	}
	function injectHook(type, hook, target = currentInstance, prepend = false) {
		if (target) {
			const hooks = target[type] || (target[type] = []);
			const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
				pauseTracking();
				const reset = setCurrentInstance(target);
				const res = callWithAsyncErrorHandling(hook, target, type, args);
				reset();
				resetTracking();
				return res;
			});
			if (prepend) hooks.unshift(wrappedHook);
			else hooks.push(wrappedHook);
			return wrappedHook;
		}
	}
	var createHook = (lifecycle) => (hook, target = currentInstance) => {
		if (!isInSSRComponentSetup || lifecycle === "sp") injectHook(lifecycle, (...args) => hook(...args), target);
	};
	var onBeforeMount = createHook("bm");
	var onMounted = createHook("m");
	var onBeforeUpdate = createHook("bu");
	var onUpdated = createHook("u");
	var onBeforeUnmount = createHook("bum");
	var onUnmounted = createHook("um");
	var onServerPrefetch = createHook("sp");
	var onRenderTriggered = createHook("rtg");
	var onRenderTracked = createHook("rtc");
	function onErrorCaptured(hook, target = currentInstance) {
		injectHook("ec", hook, target);
	}
	var NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
	function renderList(source, renderItem, cache, index) {
		let ret;
		const cached = cache && cache[index];
		const sourceIsArray = isArray(source);
		if (sourceIsArray || isString(source)) {
			const sourceIsReactiveArray = sourceIsArray && isReactive(source);
			let needsWrap = false;
			let isReadonlySource = false;
			if (sourceIsReactiveArray) {
				needsWrap = !isShallow(source);
				isReadonlySource = isReadonly(source);
				source = shallowReadArray(source);
			}
			ret = new Array(source.length);
			for (let i = 0, l = source.length; i < l; i++) ret[i] = renderItem(needsWrap ? isReadonlySource ? toReadonly(toReactive(source[i])) : toReactive(source[i]) : source[i], i, void 0, cached && cached[i]);
		} else if (typeof source === "number") {
			if (!Number.isInteger(source) || source < 0) ret = [];
			else {
				ret = new Array(source);
				for (let i = 0; i < source; i++) ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
			}
		} else if (isObject(source)) {
			if (source[Symbol.iterator]) ret = Array.from(source, (item, i) => renderItem(item, i, void 0, cached && cached[i]));
			else {
				const keys = Object.keys(source);
				ret = new Array(keys.length);
				for (let i = 0, l = keys.length; i < l; i++) {
					const key = keys[i];
					ret[i] = renderItem(source[key], key, i, cached && cached[i]);
				}
			}
		} else ret = [];
		if (cache) cache[index] = ret;
		return ret;
	}
	var getPublicInstance = (i) => {
		if (!i) return null;
		if (isStatefulComponent(i)) return getComponentPublicInstance(i);
		return getPublicInstance(i.parent);
	};
	var publicPropertiesMap = extend(Object.create(null), {
		$: (i) => i,
		$el: (i) => i.vnode.el,
		$data: (i) => i.data,
		$props: (i) => i.props,
		$attrs: (i) => i.attrs,
		$slots: (i) => i.slots,
		$refs: (i) => i.refs,
		$parent: (i) => getPublicInstance(i.parent),
		$root: (i) => getPublicInstance(i.root),
		$host: (i) => i.ce,
		$emit: (i) => i.emit,
		$options: (i) => resolveMergedOptions(i),
		$forceUpdate: (i) => i.f || (i.f = () => {
			queueJob(i.update);
		}),
		$nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
		$watch: (i) => instanceWatch.bind(i)
	});
	var hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
	var PublicInstanceProxyHandlers = {
		get({ _: instance }, key) {
			if (key === "__v_skip") return true;
			const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
			if (key[0] !== "$") {
				const n = accessCache[key];
				if (n !== void 0) switch (n) {
					case 1: return setupState[key];
					case 2: return data[key];
					case 4: return ctx[key];
					case 3: return props[key];
				}
				else if (hasSetupBinding(setupState, key)) {
					accessCache[key] = 1;
					return setupState[key];
				} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
					accessCache[key] = 2;
					return data[key];
				} else if (hasOwn(props, key)) {
					accessCache[key] = 3;
					return props[key];
				} else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
					accessCache[key] = 4;
					return ctx[key];
				} else if (shouldCacheAccess) accessCache[key] = 0;
			}
			const publicGetter = publicPropertiesMap[key];
			let cssModule, globalProperties;
			if (publicGetter) {
				if (key === "$attrs") track(instance.attrs, "get", "");
				return publicGetter(instance);
			} else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) return cssModule;
			else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
				accessCache[key] = 4;
				return ctx[key];
			} else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) return globalProperties[key];
		},
		set({ _: instance }, key, value) {
			const { data, setupState, ctx } = instance;
			if (hasSetupBinding(setupState, key)) {
				setupState[key] = value;
				return true;
			} else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
				data[key] = value;
				return true;
			} else if (hasOwn(instance.props, key)) return false;
			if (key[0] === "$" && key.slice(1) in instance) return false;
			else ctx[key] = value;
			return true;
		},
		has({ _: { data, setupState, accessCache, ctx, appContext, props, type } }, key) {
			let cssModules;
			return !!(accessCache[key] || data !== EMPTY_OBJ && key[0] !== "$" && hasOwn(data, key) || hasSetupBinding(setupState, key) || hasOwn(props, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key) || (cssModules = type.__cssModules) && cssModules[key]);
		},
		defineProperty(target, key, descriptor) {
			if (descriptor.get != null) target._.accessCache[key] = 0;
			else if (hasOwn(descriptor, "value")) this.set(target, key, descriptor.value, null);
			return Reflect.defineProperty(target, key, descriptor);
		}
	};
	function normalizePropsOrEmits(props) {
		return isArray(props) ? props.reduce((normalized, p) => (normalized[p] = null, normalized), {}) : props;
	}
	var shouldCacheAccess = true;
	function applyOptions(instance) {
		const options = resolveMergedOptions(instance);
		const publicThis = instance.proxy;
		const ctx = instance.ctx;
		shouldCacheAccess = false;
		if (options.beforeCreate) callHook(options.beforeCreate, instance, "bc");
		const { data: dataOptions, computed: computedOptions, methods, watch: watchOptions, provide: provideOptions, inject: injectOptions, created, beforeMount, mounted, beforeUpdate, updated, activated, deactivated, beforeDestroy, beforeUnmount, destroyed, unmounted, render, renderTracked, renderTriggered, errorCaptured, serverPrefetch, expose, inheritAttrs, components, directives, filters } = options;
		const checkDuplicateProperties = null;
		if (injectOptions) resolveInjections(injectOptions, ctx, checkDuplicateProperties);
		if (methods) for (const key in methods) {
			const methodHandler = methods[key];
			if (isFunction(methodHandler)) ctx[key] = methodHandler.bind(publicThis);
		}
		if (dataOptions) {
			const data = dataOptions.call(publicThis, publicThis);
			if (!isObject(data)) {} else instance.data = reactive(data);
		}
		shouldCacheAccess = true;
		if (computedOptions) for (const key in computedOptions) {
			const opt = computedOptions[key];
			const c = computed({
				get: isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP,
				set: !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP
			});
			Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => c.value,
				set: (v) => c.value = v
			});
		}
		if (watchOptions) for (const key in watchOptions) createWatcher(watchOptions[key], ctx, publicThis, key);
		if (provideOptions) {
			const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
			Reflect.ownKeys(provides).forEach((key) => {
				provide(key, provides[key]);
			});
		}
		if (created) callHook(created, instance, "c");
		function registerLifecycleHook(register, hook) {
			if (isArray(hook)) hook.forEach((_hook) => register(_hook.bind(publicThis)));
			else if (hook) register(hook.bind(publicThis));
		}
		registerLifecycleHook(onBeforeMount, beforeMount);
		registerLifecycleHook(onMounted, mounted);
		registerLifecycleHook(onBeforeUpdate, beforeUpdate);
		registerLifecycleHook(onUpdated, updated);
		registerLifecycleHook(onActivated, activated);
		registerLifecycleHook(onDeactivated, deactivated);
		registerLifecycleHook(onErrorCaptured, errorCaptured);
		registerLifecycleHook(onRenderTracked, renderTracked);
		registerLifecycleHook(onRenderTriggered, renderTriggered);
		registerLifecycleHook(onBeforeUnmount, beforeUnmount);
		registerLifecycleHook(onUnmounted, unmounted);
		registerLifecycleHook(onServerPrefetch, serverPrefetch);
		if (isArray(expose)) {
			if (expose.length) {
				const exposed = instance.exposed || (instance.exposed = {});
				expose.forEach((key) => {
					Object.defineProperty(exposed, key, {
						get: () => publicThis[key],
						set: (val) => publicThis[key] = val,
						enumerable: true
					});
				});
			} else if (!instance.exposed) instance.exposed = {};
		}
		if (render && instance.render === NOOP) instance.render = render;
		if (inheritAttrs != null) instance.inheritAttrs = inheritAttrs;
		if (components) instance.components = components;
		if (directives) instance.directives = directives;
		if (serverPrefetch) markAsyncBoundary(instance);
	}
	function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
		if (isArray(injectOptions)) injectOptions = normalizeInject(injectOptions);
		for (const key in injectOptions) {
			const opt = injectOptions[key];
			let injected;
			if (isObject(opt)) {
				if ("default" in opt) injected = inject(opt.from || key, opt.default, true);
				else injected = inject(opt.from || key);
			} else injected = inject(opt);
			if (isRef(injected)) Object.defineProperty(ctx, key, {
				enumerable: true,
				configurable: true,
				get: () => injected.value,
				set: (v) => injected.value = v
			});
			else ctx[key] = injected;
		}
	}
	function callHook(hook, instance, type) {
		callWithAsyncErrorHandling(isArray(hook) ? hook.map((h) => h.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
	}
	function createWatcher(raw, ctx, publicThis, key) {
		let getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
		if (isString(raw)) {
			const handler = ctx[raw];
			if (isFunction(handler)) watch(getter, handler);
		} else if (isFunction(raw)) watch(getter, raw.bind(publicThis));
		else if (isObject(raw)) {
			if (isArray(raw)) raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
			else {
				const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
				if (isFunction(handler)) watch(getter, handler, raw);
			}
		}
	}
	function resolveMergedOptions(instance) {
		const base = instance.type;
		const { mixins, extends: extendsOptions } = base;
		const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
		const cached = cache.get(base);
		let resolved;
		if (cached) resolved = cached;
		else if (!globalMixins.length && !mixins && !extendsOptions) resolved = base;
		else {
			resolved = {};
			if (globalMixins.length) globalMixins.forEach((m) => mergeOptions(resolved, m, optionMergeStrategies, true));
			mergeOptions(resolved, base, optionMergeStrategies);
		}
		if (isObject(base)) cache.set(base, resolved);
		return resolved;
	}
	function mergeOptions(to, from, strats, asMixin = false) {
		const { mixins, extends: extendsOptions } = from;
		if (extendsOptions) mergeOptions(to, extendsOptions, strats, true);
		if (mixins) mixins.forEach((m) => mergeOptions(to, m, strats, true));
		for (const key in from) if (asMixin && key === "expose") {} else {
			const strat = internalOptionMergeStrats[key] || strats && strats[key];
			to[key] = strat ? strat(to[key], from[key]) : from[key];
		}
		return to;
	}
	var internalOptionMergeStrats = {
		data: mergeDataFn,
		props: mergeEmitsOrPropsOptions,
		emits: mergeEmitsOrPropsOptions,
		methods: mergeObjectOptions,
		computed: mergeObjectOptions,
		beforeCreate: mergeAsArray,
		created: mergeAsArray,
		beforeMount: mergeAsArray,
		mounted: mergeAsArray,
		beforeUpdate: mergeAsArray,
		updated: mergeAsArray,
		beforeDestroy: mergeAsArray,
		beforeUnmount: mergeAsArray,
		destroyed: mergeAsArray,
		unmounted: mergeAsArray,
		activated: mergeAsArray,
		deactivated: mergeAsArray,
		errorCaptured: mergeAsArray,
		serverPrefetch: mergeAsArray,
		components: mergeObjectOptions,
		directives: mergeObjectOptions,
		watch: mergeWatchOptions,
		provide: mergeDataFn,
		inject: mergeInject
	};
	function mergeDataFn(to, from) {
		if (!from) return to;
		if (!to) return from;
		return function mergedDataFn() {
			return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
		};
	}
	function mergeInject(to, from) {
		return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
	}
	function normalizeInject(raw) {
		if (isArray(raw)) {
			const res = {};
			for (let i = 0; i < raw.length; i++) res[raw[i]] = raw[i];
			return res;
		}
		return raw;
	}
	function mergeAsArray(to, from) {
		return to ? [...new Set([].concat(to, from))] : from;
	}
	function mergeObjectOptions(to, from) {
		return to ? extend(Object.create(null), to, from) : from;
	}
	function mergeEmitsOrPropsOptions(to, from) {
		if (to) {
			if (isArray(to) && isArray(from)) return [...new Set([...to, ...from])];
			return extend(Object.create(null), normalizePropsOrEmits(to), normalizePropsOrEmits(from != null ? from : {}));
		} else return from;
	}
	function mergeWatchOptions(to, from) {
		if (!to) return from;
		if (!from) return to;
		const merged = extend(Object.create(null), to);
		for (const key in from) merged[key] = mergeAsArray(to[key], from[key]);
		return merged;
	}
	function createAppContext() {
		return {
			app: null,
			config: {
				isNativeTag: NO,
				performance: false,
				globalProperties: {},
				optionMergeStrategies: {},
				errorHandler: void 0,
				warnHandler: void 0,
				compilerOptions: {}
			},
			mixins: [],
			components: {},
			directives: {},
			provides: Object.create(null),
			optionsCache: new WeakMap(),
			propsCache: new WeakMap(),
			emitsCache: new WeakMap()
		};
	}
	var uid$1 = 0;
	function createAppAPI(render, hydrate) {
		return function createApp(rootComponent, rootProps = null) {
			if (!isFunction(rootComponent)) rootComponent = extend({}, rootComponent);
			if (rootProps != null && !isObject(rootProps)) rootProps = null;
			const context = createAppContext();
			const installedPlugins = new WeakSet();
			const pluginCleanupFns = [];
			let isMounted = false;
			const app = context.app = {
				_uid: uid$1++,
				_component: rootComponent,
				_props: rootProps,
				_container: null,
				_context: context,
				_instance: null,
				version: version$1,
				get config() {
					return context.config;
				},
				set config(v) {},
				use(plugin, ...options) {
					if (installedPlugins.has(plugin)) {} else if (plugin && isFunction(plugin.install)) {
						installedPlugins.add(plugin);
						plugin.install(app, ...options);
					} else if (isFunction(plugin)) {
						installedPlugins.add(plugin);
						plugin(app, ...options);
					}
					return app;
				},
				mixin(mixin) {
					if (!context.mixins.includes(mixin)) context.mixins.push(mixin);
					return app;
				},
				component(name, component) {
					if (!component) return context.components[name];
					context.components[name] = component;
					return app;
				},
				directive(name, directive) {
					if (!directive) return context.directives[name];
					context.directives[name] = directive;
					return app;
				},
				mount(rootContainer, isHydrate, namespace) {
					if (!isMounted) {
						const vnode = app._ceVNode || createVNode(rootComponent, rootProps);
						vnode.appContext = context;
						if (namespace === true) namespace = "svg";
						else if (namespace === false) namespace = void 0;
						if (isHydrate && hydrate) hydrate(vnode, rootContainer);
						else render(vnode, rootContainer, namespace);
						isMounted = true;
						app._container = rootContainer;
						rootContainer.__vue_app__ = app;
						return getComponentPublicInstance(vnode.component);
					}
				},
				onUnmount(cleanupFn) {
					pluginCleanupFns.push(cleanupFn);
				},
				unmount() {
					if (isMounted) {
						callWithAsyncErrorHandling(pluginCleanupFns, app._instance, 16);
						render(null, app._container);
						delete app._container.__vue_app__;
					}
				},
				provide(key, value) {
					context.provides[key] = value;
					return app;
				},
				runWithContext(fn) {
					const lastApp = currentApp;
					currentApp = app;
					try {
						return fn();
					} finally {
						currentApp = lastApp;
					}
				}
			};
			return app;
		};
	}
	var currentApp = null;
	var getModelModifiers = (props, modelName) => {
		return modelName === "modelValue" || modelName === "model-value" ? props.modelModifiers : props[`${modelName}Modifiers`] || props[`${camelize(modelName)}Modifiers`] || props[`${hyphenate(modelName)}Modifiers`];
	};
	function emit(instance, event, ...rawArgs) {
		if (instance.isUnmounted) return;
		const props = instance.vnode.props || EMPTY_OBJ;
		let args = rawArgs;
		const isModelListener = event.startsWith("update:");
		const modifiers = isModelListener && getModelModifiers(props, event.slice(7));
		if (modifiers) {
			if (modifiers.trim) args = rawArgs.map((a) => isString(a) ? a.trim() : a);
			if (modifiers.number) args = args.map(looseToNumber);
		}
		let handlerName;
		let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
		if (!handler && isModelListener) handler = props[handlerName = toHandlerKey(hyphenate(event))];
		if (handler) callWithAsyncErrorHandling(handler, instance, 6, args);
		const onceHandler = props[handlerName + `Once`];
		if (onceHandler) {
			if (!instance.emitted) instance.emitted = {};
			else if (instance.emitted[handlerName]) return;
			instance.emitted[handlerName] = true;
			callWithAsyncErrorHandling(onceHandler, instance, 6, args);
		}
	}
	var mixinEmitsCache = new WeakMap();
	function normalizeEmitsOptions(comp, appContext, asMixin = false) {
		const cache = asMixin ? mixinEmitsCache : appContext.emitsCache;
		const cached = cache.get(comp);
		if (cached !== void 0) return cached;
		const raw = comp.emits;
		let normalized = {};
		let hasExtends = false;
		if (!isFunction(comp)) {
			const extendEmits = (raw2) => {
				const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
				if (normalizedFromExtend) {
					hasExtends = true;
					extend(normalized, normalizedFromExtend);
				}
			};
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendEmits);
			if (comp.extends) extendEmits(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendEmits);
		}
		if (!raw && !hasExtends) {
			if (isObject(comp)) cache.set(comp, null);
			return null;
		}
		if (isArray(raw)) raw.forEach((key) => normalized[key] = null);
		else extend(normalized, raw);
		if (isObject(comp)) cache.set(comp, normalized);
		return normalized;
	}
	function isEmitListener(options, key) {
		if (!options || !isOn(key)) return false;
		key = key.slice(2);
		key = key === "Once" ? key : key.replace(/Once$/, "");
		return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
	}
	function renderComponentRoot(instance) {
		const { type: Component, vnode, proxy, withProxy, propsOptions: [propsOptions], slots, attrs, emit, render, renderCache, props, data, setupState, ctx, inheritAttrs } = instance;
		const prev = setCurrentRenderingInstance(instance);
		let result;
		let fallthroughAttrs;
		try {
			if (vnode.shapeFlag & 4) {
				const proxyToUse = withProxy || proxy;
				const thisProxy = proxyToUse;
				result = normalizeVNode(render.call(thisProxy, proxyToUse, renderCache, props, setupState, data, ctx));
				fallthroughAttrs = attrs;
			} else {
				const render2 = Component;
				result = normalizeVNode(render2.length > 1 ? render2(props, {
					attrs,
					slots,
					emit
				}) : render2(props, null));
				fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
			}
		} catch (err) {
			blockStack.length = 0;
			handleError(err, instance, 1);
			result = createVNode(Comment);
		}
		let root = result;
		if (fallthroughAttrs && inheritAttrs !== false) {
			const keys = Object.keys(fallthroughAttrs);
			const { shapeFlag } = root;
			if (keys.length) {
				if (shapeFlag & 7) {
					if (propsOptions && keys.some(isModelListener)) fallthroughAttrs = filterModelListeners(fallthroughAttrs, propsOptions);
					root = cloneVNode(root, fallthroughAttrs, false, true);
				}
			}
		}
		if (vnode.dirs) {
			root = cloneVNode(root, null, false, true);
			root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
		}
		if (vnode.transition) setTransitionHooks(isTeleport(root.type) ? getInnerChild$1(root) || root : root, vnode.transition);
		result = root;
		setCurrentRenderingInstance(prev);
		return result;
	}
	function filterSingleRoot(children, recurse = true) {
		let singleRoot;
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (isVNode(child)) {
				if (child.type !== Comment || child.children === "v-if") {
					if (singleRoot) return;
					else singleRoot = child;
				}
			} else return;
		}
		return singleRoot;
	}
	var getFunctionalFallthrough = (attrs) => {
		let res;
		for (const key in attrs) if (key === "class" || key === "style" || isOn(key)) (res || (res = {}))[key] = attrs[key];
		return res;
	};
	var filterModelListeners = (attrs, props) => {
		const res = {};
		for (const key in attrs) if (!isModelListener(key) || !(key.slice(9) in props)) res[key] = attrs[key];
		return res;
	};
	function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
		const { props: prevProps, children: prevChildren, component } = prevVNode;
		const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
		const emits = component.emitsOptions;
		if (nextVNode.dirs || nextVNode.transition) return true;
		if (optimized && patchFlag >= 0) {
			if (patchFlag & 1024) return true;
			if (patchFlag & 16) {
				if (!prevProps) return !!nextProps;
				return hasPropsChanged(prevProps, nextProps, emits);
			} else if (patchFlag & 8) {
				const dynamicProps = nextVNode.dynamicProps;
				for (let i = 0; i < dynamicProps.length; i++) {
					const key = dynamicProps[i];
					if (hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emits, key)) return true;
				}
			}
		} else {
			if (prevChildren || nextChildren) {
				if (!nextChildren || !nextChildren.$stable) return true;
			}
			if (prevProps === nextProps) return false;
			if (!prevProps) return !!nextProps;
			if (!nextProps) return true;
			return hasPropsChanged(prevProps, nextProps, emits);
		}
		return false;
	}
	function hasPropsChanged(prevProps, nextProps, emitsOptions) {
		const nextKeys = Object.keys(nextProps);
		if (nextKeys.length !== Object.keys(prevProps).length) return true;
		for (let i = 0; i < nextKeys.length; i++) {
			const key = nextKeys[i];
			if (!hasOwn(prevProps, key) || hasPropValueChanged(nextProps, prevProps, key) && !isEmitListener(emitsOptions, key)) return true;
		}
		return false;
	}
	function hasPropValueChanged(nextProps, prevProps, key) {
		const nextProp = nextProps[key];
		const prevProp = prevProps[key];
		if (key === "style" && isObject(nextProp) && isObject(prevProp)) return !looseEqual(nextProp, prevProp);
		return nextProp !== prevProp;
	}
	function updateHOCHostEl({ vnode, parent, suspense }, el) {
		while (parent) {
			const root = parent.subTree;
			if (root.suspense && root.suspense.activeBranch === vnode) {
				root.suspense.vnode.el = root.el = el;
				vnode = root;
			}
			if (root === vnode) {
				(vnode = parent.vnode).el = el;
				parent = parent.parent;
			} else break;
		}
		if (suspense && suspense.activeBranch === vnode) suspense.vnode.el = el;
	}
	var internalObjectProto = {};
	var createInternalObject = () => Object.create(internalObjectProto);
	var isInternalObject = (obj) => Object.getPrototypeOf(obj) === internalObjectProto;
	function initProps(instance, rawProps, isStateful, isSSR = false) {
		const props = {};
		const attrs = createInternalObject();
		instance.propsDefaults = Object.create(null);
		setFullProps(instance, rawProps, props, attrs);
		for (const key in instance.propsOptions[0]) if (!(key in props)) props[key] = void 0;
		if (isStateful) instance.props = isSSR ? props : shallowReactive(props);
		else if (!instance.type.props) instance.props = attrs;
		else instance.props = props;
		instance.attrs = attrs;
	}
	function updateProps(instance, rawProps, rawPrevProps, optimized) {
		const { props, attrs, vnode: { patchFlag } } = instance;
		const rawCurrentProps = toRaw(props);
		const [options] = instance.propsOptions;
		let hasAttrsChanged = false;
		if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
			if (patchFlag & 8) {
				const propsToUpdate = instance.vnode.dynamicProps;
				for (let i = 0; i < propsToUpdate.length; i++) {
					let key = propsToUpdate[i];
					if (isEmitListener(instance.emitsOptions, key)) continue;
					const value = rawProps[key];
					if (options) {
						if (hasOwn(attrs, key)) {
							if (value !== attrs[key]) {
								attrs[key] = value;
								hasAttrsChanged = true;
							}
						} else {
							const camelizedKey = camelize(key);
							props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
						}
					} else if (value !== attrs[key]) {
						attrs[key] = value;
						hasAttrsChanged = true;
					}
				}
			}
		} else {
			if (setFullProps(instance, rawProps, props, attrs)) hasAttrsChanged = true;
			let kebabKey;
			for (const key in rawCurrentProps) if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
				if (options) {
					if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
				} else delete props[key];
			}
			if (attrs !== rawCurrentProps) {
				for (const key in attrs) if (!rawProps || !hasOwn(rawProps, key) && true) {
					delete attrs[key];
					hasAttrsChanged = true;
				}
			}
		}
		if (hasAttrsChanged) trigger(instance.attrs, "set", "");
	}
	function setFullProps(instance, rawProps, props, attrs) {
		const [options, needCastKeys] = instance.propsOptions;
		let hasAttrsChanged = false;
		let rawCastValues;
		if (rawProps) for (let key in rawProps) {
			if (isReservedProp(key)) continue;
			const value = rawProps[key];
			let camelKey;
			if (options && hasOwn(options, camelKey = camelize(key))) {
				if (!needCastKeys || !needCastKeys.includes(camelKey)) props[camelKey] = value;
				else (rawCastValues || (rawCastValues = {}))[camelKey] = value;
			} else if (!isEmitListener(instance.emitsOptions, key)) {
				if (!(key in attrs) || value !== attrs[key]) {
					attrs[key] = value;
					hasAttrsChanged = true;
				}
			}
		}
		if (needCastKeys) {
			const rawCurrentProps = toRaw(props);
			const castValues = rawCastValues || EMPTY_OBJ;
			for (let i = 0; i < needCastKeys.length; i++) {
				const key = needCastKeys[i];
				props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn(castValues, key));
			}
		}
		return hasAttrsChanged;
	}
	function resolvePropValue(options, props, key, value, instance, isAbsent) {
		const opt = options[key];
		if (opt != null) {
			const hasDefault = hasOwn(opt, "default");
			if (hasDefault && value === void 0) {
				const defaultValue = opt.default;
				if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
					const { propsDefaults } = instance;
					if (key in propsDefaults) value = propsDefaults[key];
					else {
						const reset = setCurrentInstance(instance);
						value = propsDefaults[key] = defaultValue.call(null, props);
						reset();
					}
				} else value = defaultValue;
				if (instance.ce) instance.ce._setProp(key, value);
			}
			if (opt[0]) {
				if (isAbsent && !hasDefault) value = false;
				else if (opt[1] && (value === "" || value === hyphenate(key))) value = true;
			}
		}
		return value;
	}
	var mixinPropsCache = new WeakMap();
	function normalizePropsOptions(comp, appContext, asMixin = false) {
		const cache = asMixin ? mixinPropsCache : appContext.propsCache;
		const cached = cache.get(comp);
		if (cached) return cached;
		const raw = comp.props;
		const normalized = {};
		const needCastKeys = [];
		let hasExtends = false;
		if (!isFunction(comp)) {
			const extendProps = (raw2) => {
				hasExtends = true;
				const [props, keys] = normalizePropsOptions(raw2, appContext, true);
				extend(normalized, props);
				if (keys) needCastKeys.push(...keys);
			};
			if (!asMixin && appContext.mixins.length) appContext.mixins.forEach(extendProps);
			if (comp.extends) extendProps(comp.extends);
			if (comp.mixins) comp.mixins.forEach(extendProps);
		}
		if (!raw && !hasExtends) {
			if (isObject(comp)) cache.set(comp, EMPTY_ARR);
			return EMPTY_ARR;
		}
		if (isArray(raw)) for (let i = 0; i < raw.length; i++) {
			const normalizedKey = camelize(raw[i]);
			if (validatePropName(normalizedKey)) normalized[normalizedKey] = EMPTY_OBJ;
		}
		else if (raw) for (const key in raw) {
			const normalizedKey = camelize(key);
			if (validatePropName(normalizedKey)) {
				const opt = raw[key];
				const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
				const propType = prop.type;
				let shouldCast = false;
				let shouldCastTrue = true;
				if (isArray(propType)) for (let index = 0; index < propType.length; ++index) {
					const type = propType[index];
					const typeName = isFunction(type) && type.name;
					if (typeName === "Boolean") {
						shouldCast = true;
						break;
					} else if (typeName === "String") shouldCastTrue = false;
				}
				else shouldCast = isFunction(propType) && propType.name === "Boolean";
				prop[0] = shouldCast;
				prop[1] = shouldCastTrue;
				if (shouldCast || hasOwn(prop, "default")) needCastKeys.push(normalizedKey);
			}
		}
		const res = [normalized, needCastKeys];
		if (isObject(comp)) cache.set(comp, res);
		return res;
	}
	function validatePropName(key) {
		if (key[0] !== "$" && !isReservedProp(key)) return true;
		return false;
	}
	var isInternalKey = (key) => key === "_" || key === "_ctx" || key === "$stable";
	var normalizeSlotValue = (value) => isArray(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
	var normalizeSlot = (key, rawSlot, ctx) => {
		if (rawSlot._n) return rawSlot;
		const normalized = withCtx((...args) => {
			return normalizeSlotValue(rawSlot(...args));
		}, ctx);
		normalized._c = false;
		return normalized;
	};
	var normalizeObjectSlots = (rawSlots, slots, instance) => {
		const ctx = rawSlots._ctx;
		for (const key in rawSlots) {
			if (isInternalKey(key)) continue;
			const value = rawSlots[key];
			if (isFunction(value)) slots[key] = normalizeSlot(key, value, ctx);
			else if (value != null) {
				const normalized = normalizeSlotValue(value);
				slots[key] = () => normalized;
			}
		}
	};
	var normalizeVNodeSlots = (instance, children) => {
		const normalized = normalizeSlotValue(children);
		instance.slots.default = () => normalized;
	};
	var assignSlots = (slots, children, optimized) => {
		for (const key in children) if (optimized || !isInternalKey(key)) slots[key] = children[key];
	};
	var initSlots = (instance, children, optimized) => {
		const slots = instance.slots = createInternalObject();
		if (instance.vnode.shapeFlag & 32) {
			const type = children._;
			if (type) {
				assignSlots(slots, children, optimized);
				if (optimized) def(slots, "_", type, true);
			} else normalizeObjectSlots(children, slots);
		} else if (children) normalizeVNodeSlots(instance, children);
	};
	var updateSlots = (instance, children, optimized) => {
		const { vnode, slots } = instance;
		let needDeletionCheck = true;
		let deletionComparisonTarget = EMPTY_OBJ;
		if (vnode.shapeFlag & 32) {
			const type = children._;
			if (type) {
				if (optimized && type === 1) needDeletionCheck = false;
				else assignSlots(slots, children, optimized);
			} else {
				needDeletionCheck = !children.$stable;
				normalizeObjectSlots(children, slots);
			}
			deletionComparisonTarget = children;
		} else if (children) {
			normalizeVNodeSlots(instance, children);
			deletionComparisonTarget = { default: 1 };
		}
		if (needDeletionCheck) {
			for (const key in slots) if (!isInternalKey(key) && deletionComparisonTarget[key] == null) delete slots[key];
		}
	};
	var queuePostRenderEffect = queueEffectWithSuspense;
	function createRenderer(options) {
		return baseCreateRenderer(options);
	}
	function baseCreateRenderer(options, createHydrationFns) {
		const target = getGlobalThis();
		target.__VUE__ = true;
		const { insert: hostInsert, remove: hostRemove, patchProp: hostPatchProp, createElement: hostCreateElement, createText: hostCreateText, createComment: hostCreateComment, setText: hostSetText, setElementText: hostSetElementText, parentNode: hostParentNode, nextSibling: hostNextSibling, setScopeId: hostSetScopeId = NOOP, insertStaticContent: hostInsertStaticContent } = options;
		const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, namespace = void 0, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
			if (n1 === n2) return;
			if (n1 && !isSameVNodeType(n1, n2)) {
				anchor = getNextHostNode(n1);
				unmount(n1, parentComponent, parentSuspense, true);
				n1 = null;
			}
			if (n2.patchFlag === -2) {
				optimized = false;
				n2.dynamicChildren = null;
			}
			if (n2.dynamicChildren && n1 && n1.dynamicChildren && n1.dynamicChildren.hasOnce) {
				if (n2.dynamicChildren === EMPTY_ARR) n2.dynamicChildren = [];
				n2.dynamicChildren.hasOnce = true;
			}
			const { type, ref, shapeFlag } = n2;
			switch (type) {
				case Text:
					processText(n1, n2, container, anchor);
					break;
				case Comment:
					processCommentNode(n1, n2, container, anchor);
					break;
				case Static:
					if (n1 == null) mountStaticNode(n2, container, anchor, namespace);
					break;
				case Fragment:
					processFragment(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					break;
				default: if (shapeFlag & 1) processElement(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 6) processComponent(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else if (shapeFlag & 64) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
				else if (shapeFlag & 128) type.process(n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, internals);
			}
			if (ref != null && parentComponent) setRef(ref, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
			else if (ref == null && n1 && n1.ref != null) setRef(n1.ref, null, parentSuspense, n1, true);
		};
		const processText = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateText(n2.children), container, anchor);
			else {
				const el = n2.el = n1.el;
				if (n2.children !== n1.children) hostSetText(el, n2.children);
			}
		};
		const processCommentNode = (n1, n2, container, anchor) => {
			if (n1 == null) hostInsert(n2.el = hostCreateComment(n2.children || ""), container, anchor);
			else n2.el = n1.el;
		};
		const mountStaticNode = (n2, container, anchor, namespace) => {
			[n2.el, n2.anchor] = hostInsertStaticContent(n2.children, container, anchor, namespace, n2.el, n2.anchor);
		};
		const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
			let next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostInsert(el, container, nextSibling);
				el = next;
			}
			hostInsert(anchor, container, nextSibling);
		};
		const removeStaticNode = ({ el, anchor }) => {
			let next;
			while (el && el !== anchor) {
				next = hostNextSibling(el);
				hostRemove(el);
				el = next;
			}
			hostRemove(anchor);
		};
		const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			if (n2.type === "svg") namespace = "svg";
			else if (n2.type === "math") namespace = "mathml";
			if (n1 == null) mountElement(n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			else {
				const customElement = n1.el && n1.el._isVueCE ? n1.el : null;
				try {
					if (customElement) customElement._beginPatch();
					patchElement(n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				} finally {
					if (customElement) customElement._endPatch();
				}
			}
		};
		const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			let el;
			let vnodeHook;
			const { props, shapeFlag, transition, dirs } = vnode;
			el = vnode.el = hostCreateElement(vnode.type, namespace, props && props.is, props);
			if (shapeFlag & 8) hostSetElementText(el, vnode.children);
			else if (shapeFlag & 16) mountChildren(vnode.children, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(vnode, namespace), slotScopeIds, optimized);
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "created");
			setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
			if (props) {
				for (const key in props) if (key !== "value" && !isReservedProp(key)) hostPatchProp(el, key, null, props[key], namespace, parentComponent);
				if ("value" in props) hostPatchProp(el, "value", null, props.value, namespace);
				if (vnodeHook = props.onVnodeBeforeMount) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			}
			if (dirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
			const needCallTransitionHooks = needTransition(parentSuspense, transition);
			if (needCallTransitionHooks) transition.beforeEnter(el);
			hostInsert(el, container, anchor);
			if ((vnodeHook = props && props.onVnodeMounted) || needCallTransitionHooks || dirs) queuePostRenderEffect(() => {
				try {
					vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
					needCallTransitionHooks && transition.enter(el);
					dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
				} finally {}
			}, parentSuspense);
		};
		const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
			if (scopeId) hostSetScopeId(el, scopeId);
			if (slotScopeIds) for (let i = 0; i < slotScopeIds.length; i++) hostSetScopeId(el, slotScopeIds[i]);
			if (parentComponent) {
				let subTree = parentComponent.subTree;
				if (vnode === subTree || isSuspense(subTree.type) && (subTree.ssContent === vnode || subTree.ssFallback === vnode)) {
					const parentVNode = parentComponent.vnode;
					setScopeId(el, parentVNode, parentVNode.scopeId, parentVNode.slotScopeIds, parentComponent.parent);
				}
			}
		};
		const mountChildren = (children, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, start = 0) => {
			for (let i = start; i < children.length; i++) {
				const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
				patch(null, child, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
		};
		const patchElement = (n1, n2, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			const el = n2.el = n1.el;
			let { patchFlag, dynamicChildren, dirs } = n2;
			patchFlag |= n1.patchFlag & 16;
			const oldProps = n1.props || EMPTY_OBJ;
			const newProps = n2.props || EMPTY_OBJ;
			let vnodeHook;
			parentComponent && toggleRecurse(parentComponent, false);
			if (vnodeHook = newProps.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
			if (dirs) invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
			parentComponent && toggleRecurse(parentComponent, true);
			if (dynamicChildren && (!n1.dynamicChildren || n1.dynamicChildren.length !== dynamicChildren.length)) {
				patchFlag = 0;
				optimized = false;
				dynamicChildren = null;
			}
			if (oldProps.innerHTML && newProps.innerHTML == null || oldProps.textContent && newProps.textContent == null) hostSetElementText(el, "");
			if (dynamicChildren) patchBlockChildren(n1.dynamicChildren, dynamicChildren, el, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds);
			else if (!optimized) patchChildren(n1, n2, el, null, parentComponent, parentSuspense, resolveChildrenNamespace(n2, namespace), slotScopeIds, false);
			if (patchFlag > 0) {
				if (patchFlag & 16) patchProps(el, oldProps, newProps, parentComponent, namespace);
				else {
					if (patchFlag & 2) {
						if (oldProps.class !== newProps.class) hostPatchProp(el, "class", null, newProps.class, namespace);
					}
					if (patchFlag & 4) hostPatchProp(el, "style", oldProps.style, newProps.style, namespace);
					if (patchFlag & 8) {
						const propsToUpdate = n2.dynamicProps;
						for (let i = 0; i < propsToUpdate.length; i++) {
							const key = propsToUpdate[i];
							const prev = oldProps[key];
							const next = newProps[key];
							if (next !== prev || key === "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
						}
					}
				}
				if (patchFlag & 1) {
					if (n1.children !== n2.children) hostSetElementText(el, n2.children);
				}
			} else if (!optimized && dynamicChildren == null) patchProps(el, oldProps, newProps, parentComponent, namespace);
			if ((vnodeHook = newProps.onVnodeUpdated) || dirs) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
				dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
			}, parentSuspense);
		};
		const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, namespace, slotScopeIds) => {
			for (let i = 0; i < newChildren.length; i++) {
				const oldVNode = oldChildren[i];
				const newVNode = newChildren[i];
				const oldEl = oldVNode.el || resolveAsyncComponentPlaceholder(oldVNode);
				const container = oldEl && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & 198) ? hostParentNode(oldEl) : fallbackContainer;
				patch(oldVNode, newVNode, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, true);
			}
		};
		const patchProps = (el, oldProps, newProps, parentComponent, namespace) => {
			if (oldProps !== newProps) {
				if (oldProps !== EMPTY_OBJ) {
					for (const key in oldProps) if (!isReservedProp(key) && !(key in newProps)) hostPatchProp(el, key, oldProps[key], null, namespace, parentComponent);
				}
				for (const key in newProps) {
					if (isReservedProp(key)) continue;
					const next = newProps[key];
					const prev = oldProps[key];
					if (next !== prev && key !== "value") hostPatchProp(el, key, prev, next, namespace, parentComponent);
				}
				if ("value" in newProps) hostPatchProp(el, "value", oldProps.value, newProps.value, namespace);
			}
		};
		const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
			const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
			let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
			if (fragmentSlotScopeIds) slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
			if (n1 == null) {
				hostInsert(fragmentStartAnchor, container, anchor);
				hostInsert(fragmentEndAnchor, container, anchor);
				mountChildren(n2.children || [], container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			} else if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren && n1.dynamicChildren.length === dynamicChildren.length) {
				patchBlockChildren(n1.dynamicChildren, dynamicChildren, container, parentComponent, parentSuspense, namespace, slotScopeIds);
				if (n2.key != null || parentComponent && n2 === parentComponent.subTree) traverseStaticChildren(n1, n2, true);
			} else patchChildren(n1, n2, container, fragmentEndAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
		};
		const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			n2.slotScopeIds = slotScopeIds;
			if (n1 == null) {
				if (n2.shapeFlag & 512) parentComponent.ctx.activate(n2, container, anchor, namespace, optimized);
				else mountComponent(n2, container, anchor, parentComponent, parentSuspense, namespace, optimized);
			} else updateComponent(n1, n2, optimized);
		};
		const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, namespace, optimized) => {
			const instance = initialVNode.component = createComponentInstance(initialVNode, parentComponent, parentSuspense);
			if (isKeepAlive(initialVNode)) instance.ctx.renderer = internals;
			setupComponent(instance, false, optimized);
			if (instance.asyncDep) {
				parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect, optimized, namespace);
				if (!initialVNode.el) {
					const placeholder = instance.subTree = createVNode(Comment);
					processCommentNode(null, placeholder, container, anchor);
					initialVNode.placeholder = placeholder.el;
				}
			} else setupRenderEffect(instance, initialVNode, container, anchor, parentSuspense, namespace, optimized);
		};
		const updateComponent = (n1, n2, optimized) => {
			const instance = n2.component = n1.component;
			if (shouldUpdateComponent(n1, n2, optimized)) {
				if (instance.asyncDep && !instance.asyncResolved) {
					n2.el = n1.el;
					n2.placeholder = n1.placeholder;
					updateComponentPreRender(instance, n2, optimized);
					return;
				} else {
					instance.next = n2;
					instance.update();
				}
			} else {
				n2.el = n1.el;
				n2.placeholder = n1.placeholder;
				instance.vnode = n2;
			}
		};
		const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, namespace, optimized) => {
			const componentUpdateFn = () => {
				if (!instance.isMounted) {
					let vnodeHook;
					const { el, props } = initialVNode;
					const { bm, m, parent, root, type } = instance;
					const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
					toggleRecurse(instance, false);
					if (bm) invokeArrayFns(bm);
					if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeBeforeMount)) invokeVNodeHook(vnodeHook, parent, initialVNode);
					toggleRecurse(instance, true);
					if (el && hydrateNode) {
						const hydrateSubTree = () => {
							instance.subTree = renderComponentRoot(instance);
							hydrateNode(el, instance.subTree, instance, parentSuspense, null);
						};
						if (isAsyncWrapperVNode && type.__asyncHydrate) type.__asyncHydrate(el, instance, hydrateSubTree);
						else hydrateSubTree();
					} else {
						if (root.ce && root.ce._hasShadowRoot()) root.ce._injectChildStyle(type, instance.parent ? instance.parent.type : void 0);
						const subTree = instance.subTree = renderComponentRoot(instance);
						patch(null, subTree, container, anchor, instance, parentSuspense, namespace);
						initialVNode.el = subTree.el;
					}
					if (m) queuePostRenderEffect(m, parentSuspense);
					if (!isAsyncWrapperVNode && (vnodeHook = props && props.onVnodeMounted)) {
						const scopedInitialVNode = initialVNode;
						queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode), parentSuspense);
					}
					if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) instance.a && queuePostRenderEffect(instance.a, parentSuspense);
					instance.isMounted = true;
					initialVNode = container = anchor = null;
				} else {
					let { next, bu, u, parent, vnode } = instance;
					{
						const nonHydratedAsyncRoot = locateNonHydratedAsyncRoot(instance);
						if (nonHydratedAsyncRoot) {
							if (next) {
								next.el = vnode.el;
								updateComponentPreRender(instance, next, optimized);
							}
							nonHydratedAsyncRoot.asyncDep.then(() => {
								queuePostRenderEffect(() => {
									if (!instance.isUnmounted) update();
								}, parentSuspense);
							});
							return;
						}
					}
					let originNext = next;
					let vnodeHook;
					toggleRecurse(instance, false);
					if (next) {
						next.el = vnode.el;
						updateComponentPreRender(instance, next, optimized);
					} else next = vnode;
					if (bu) invokeArrayFns(bu);
					if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) invokeVNodeHook(vnodeHook, parent, next, vnode);
					toggleRecurse(instance, true);
					const nextTree = renderComponentRoot(instance);
					const prevTree = instance.subTree;
					instance.subTree = nextTree;
					patch(prevTree, nextTree, hostParentNode(prevTree.el), getNextHostNode(prevTree), instance, parentSuspense, namespace);
					next.el = nextTree.el;
					if (originNext === null) updateHOCHostEl(instance, nextTree.el);
					if (u) queuePostRenderEffect(u, parentSuspense);
					if (vnodeHook = next.props && next.props.onVnodeUpdated) queuePostRenderEffect(() => invokeVNodeHook(vnodeHook, parent, next, vnode), parentSuspense);
				}
			};
			instance.scope.on();
			const effect = instance.effect = new ReactiveEffect(componentUpdateFn);
			instance.scope.off();
			const update = instance.update = effect.run.bind(effect);
			const job = instance.job = effect.runIfDirty.bind(effect);
			job.i = instance;
			job.id = instance.uid;
			effect.scheduler = () => queueJob(job);
			toggleRecurse(instance, true);
			update();
		};
		const updateComponentPreRender = (instance, nextVNode, optimized) => {
			nextVNode.component = instance;
			const prevProps = instance.vnode.props;
			instance.vnode = nextVNode;
			instance.next = null;
			updateProps(instance, nextVNode.props, prevProps, optimized);
			updateSlots(instance, nextVNode.children, optimized);
			pauseTracking();
			flushPreFlushCbs(instance);
			resetTracking();
		};
		const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized = false) => {
			const c1 = n1 && n1.children;
			const prevShapeFlag = n1 ? n1.shapeFlag : 0;
			const c2 = n2.children;
			const { patchFlag, shapeFlag } = n2;
			if (patchFlag > 0) {
				if (patchFlag & 128) {
					patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					return;
				} else if (patchFlag & 256) {
					patchUnkeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					return;
				}
			}
			if (shapeFlag & 8) {
				if (prevShapeFlag & 16) unmountChildren(c1, parentComponent, parentSuspense);
				if (c2 !== c1) hostSetElementText(container, c2);
			} else if (prevShapeFlag & 16) {
				if (shapeFlag & 16) patchKeyedChildren(c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else unmountChildren(c1, parentComponent, parentSuspense, true);
			} else {
				if (prevShapeFlag & 8) hostSetElementText(container, "");
				if (shapeFlag & 16) mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
		};
		const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			c1 = c1 || EMPTY_ARR;
			c2 = c2 || EMPTY_ARR;
			const oldLength = c1.length;
			const newLength = c2.length;
			const commonLength = Math.min(oldLength, newLength);
			let i = 0;
			for (; i < commonLength; i++) {
				const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				patch(c1[i], nextChild, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
			}
			if (oldLength > newLength) unmountChildren(c1, parentComponent, parentSuspense, true, false, commonLength);
			else mountChildren(c2, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized, commonLength);
		};
		const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized) => {
			let i = 0;
			const l2 = c2.length;
			let e1 = c1.length - 1;
			let e2 = l2 - 1;
			while (i <= e1 && i <= e2) {
				const n1 = c1[i];
				const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
				if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				i++;
			}
			while (i <= e1 && i <= e2) {
				const n1 = c1[e1];
				const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
				if (isSameVNodeType(n1, n2)) patch(n1, n2, container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
				else break;
				e1--;
				e2--;
			}
			if (i > e1) {
				if (i <= e2) {
					const nextPos = e2 + 1;
					const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
					while (i <= e2) {
						patch(null, c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]), container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						i++;
					}
				}
			} else if (i > e2) while (i <= e1) {
				unmount(c1[i], parentComponent, parentSuspense, true);
				i++;
			}
			else {
				const s1 = i;
				const s2 = i;
				const keyToNewIndexMap = new Map();
				for (i = s2; i <= e2; i++) {
					const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
					if (nextChild.key != null) keyToNewIndexMap.set(nextChild.key, i);
				}
				let j;
				let patched = 0;
				const toBePatched = e2 - s2 + 1;
				let moved = false;
				let maxNewIndexSoFar = 0;
				const newIndexToOldIndexMap = new Array(toBePatched);
				for (i = 0; i < toBePatched; i++) newIndexToOldIndexMap[i] = 0;
				for (i = s1; i <= e1; i++) {
					const prevChild = c1[i];
					if (patched >= toBePatched) {
						unmount(prevChild, parentComponent, parentSuspense, true);
						continue;
					}
					let newIndex;
					if (prevChild.key != null) newIndex = keyToNewIndexMap.get(prevChild.key);
					else for (j = s2; j <= e2; j++) if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
						newIndex = j;
						break;
					}
					if (newIndex === void 0) unmount(prevChild, parentComponent, parentSuspense, true);
					else {
						newIndexToOldIndexMap[newIndex - s2] = i + 1;
						if (newIndex >= maxNewIndexSoFar) maxNewIndexSoFar = newIndex;
						else moved = true;
						patch(prevChild, c2[newIndex], container, null, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
						patched++;
					}
				}
				const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
				j = increasingNewIndexSequence.length - 1;
				for (i = toBePatched - 1; i >= 0; i--) {
					const nextIndex = s2 + i;
					const nextChild = c2[nextIndex];
					const anchorVNode = c2[nextIndex + 1];
					const anchor = nextIndex + 1 < l2 ? anchorVNode.el || resolveAsyncComponentPlaceholder(anchorVNode) : parentAnchor;
					if (newIndexToOldIndexMap[i] === 0) patch(null, nextChild, container, anchor, parentComponent, parentSuspense, namespace, slotScopeIds, optimized);
					else if (moved) {
						if (j < 0 || i !== increasingNewIndexSequence[j]) move(nextChild, container, anchor, 2);
						else j--;
					}
				}
			}
		};
		const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
			const { el, type, transition, children, shapeFlag } = vnode;
			if (shapeFlag & 6) {
				move(vnode.component.subTree, container, anchor, moveType);
				return;
			}
			if (shapeFlag & 128) {
				vnode.suspense.move(container, anchor, moveType);
				return;
			}
			if (shapeFlag & 64) {
				type.move(vnode, container, anchor, internals);
				return;
			}
			if (type === Fragment) {
				hostInsert(el, container, anchor);
				for (let i = 0; i < children.length; i++) move(children[i], container, anchor, moveType);
				hostInsert(vnode.anchor, container, anchor);
				return;
			}
			if (type === Static) {
				moveStaticNode(vnode, container, anchor);
				return;
			}
			if (moveType !== 2 && shapeFlag & 1 && transition) {
				if (moveType === 0) {
					if (transition.persisted && !el[leaveCbKey]) hostInsert(el, container, anchor);
					else {
						transition.beforeEnter(el);
						hostInsert(el, container, anchor);
						queuePostRenderEffect(() => transition.enter(el), parentSuspense);
					}
				} else {
					const { leave, delayLeave, afterLeave } = transition;
					const remove2 = () => {
						if (vnode.ctx.isUnmounted) hostRemove(el);
						else hostInsert(el, container, anchor);
					};
					const performLeave = () => {
						const wasLeaving = el._isLeaving || !!el[leaveCbKey];
						if (el._isLeaving) el[leaveCbKey](true);
						if (transition.persisted && !wasLeaving) remove2();
						else leave(el, () => {
							remove2();
							afterLeave && afterLeave();
						});
					};
					if (delayLeave) delayLeave(el, remove2, performLeave);
					else performLeave();
				}
			} else hostInsert(el, container, anchor);
		};
		const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
			const { type, props, ref, children, dynamicChildren, shapeFlag, patchFlag, dirs, cacheIndex, memo } = vnode;
			if (patchFlag === -2 || dynamicChildren && dynamicChildren.hasOnce) optimized = false;
			if (ref != null) {
				pauseTracking();
				setRef(ref, null, parentSuspense, vnode, true);
				resetTracking();
			}
			if (cacheIndex != null && (!vnode.ctx || vnode.ctx === parentComponent)) parentComponent.renderCache[cacheIndex] = void 0;
			if (shapeFlag & 256) {
				parentComponent.ctx.deactivate(vnode);
				return;
			}
			const shouldInvokeDirs = shapeFlag & 1 && dirs;
			const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
			let vnodeHook;
			if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeBeforeUnmount)) invokeVNodeHook(vnodeHook, parentComponent, vnode);
			if (shapeFlag & 6) unmountComponent(vnode.component, parentSuspense, doRemove);
			else {
				if (shapeFlag & 128) {
					vnode.suspense.unmount(parentSuspense, doRemove);
					return;
				}
				if (shouldInvokeDirs) invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
				if (shapeFlag & 64) vnode.type.remove(vnode, parentComponent, parentSuspense, internals, doRemove);
				else if (dynamicChildren && !dynamicChildren.hasOnce && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) unmountChildren(dynamicChildren, parentComponent, parentSuspense, false, true);
				else if (type === Fragment && patchFlag & 384 || !optimized && shapeFlag & 16) unmountChildren(children, parentComponent, parentSuspense);
				if (doRemove) remove(vnode);
			}
			const shouldInvalidateMemo = memo != null && cacheIndex == null;
			if (shouldInvokeVnodeHook && (vnodeHook = props && props.onVnodeUnmounted) || shouldInvokeDirs || shouldInvalidateMemo) queuePostRenderEffect(() => {
				vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
				shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
				if (shouldInvalidateMemo) vnode.el = null;
			}, parentSuspense);
		};
		const remove = (vnode) => {
			const { type, el, anchor, transition } = vnode;
			const isFragment = type === Fragment;
			if (isFragment && !transition) {
				removeFragment(el, anchor);
				return;
			}
			if (type === Static) {
				removeStaticNode(vnode);
				if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
				return;
			}
			const leavingNode = isFragment ? getTransitionRoot(vnode) : vnode;
			const performRemove = () => {
				if (isFragment) {
					if (hostParentNode(el)) removeFragment(el, anchor);
				} else hostRemove(el);
				if (transition && !transition.persisted && transition.afterLeave) transition.afterLeave();
			};
			if (leavingNode && leavingNode.shapeFlag & 1 && transition && !transition.persisted) {
				const { leave, delayLeave } = transition;
				const leavingEl = leavingNode.el;
				const performLeave = () => leave(leavingEl, performRemove);
				if (delayLeave) delayLeave(leavingEl, performRemove, performLeave);
				else performLeave();
			} else performRemove();
		};
		const removeFragment = (cur, end) => {
			let next;
			while (cur !== end) {
				next = hostNextSibling(cur);
				hostRemove(cur);
				cur = next;
			}
			hostRemove(end);
		};
		const unmountComponent = (instance, parentSuspense, doRemove) => {
			const { bum, scope, job, subTree, um, m, a } = instance;
			invalidateMount(m);
			invalidateMount(a);
			if (bum) invokeArrayFns(bum);
			scope.stop();
			if (job) {
				job.flags |= 8;
				unmount(subTree, instance, parentSuspense, doRemove);
			} else if (instance.vnode.el && subTree) {
				subTree.transition = instance.vnode.transition;
				unmount(subTree, instance, parentSuspense, doRemove);
			}
			if (um) queuePostRenderEffect(um, parentSuspense);
			queuePostRenderEffect(() => {
				instance.isUnmounted = true;
			}, parentSuspense);
		};
		const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start = 0) => {
			for (let i = start; i < children.length; i++) unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
		};
		const getNextHostNode = (vnode) => {
			if (vnode.shapeFlag & 6) return getNextHostNode(vnode.component.subTree);
			if (vnode.shapeFlag & 128) return vnode.suspense.next();
			const el = hostNextSibling(vnode.anchor || vnode.el);
			const teleportEnd = el && el[TeleportEndKey];
			return teleportEnd ? hostNextSibling(teleportEnd) : el;
		};
		const render = (vnode, container, namespace) => {
			flushOnAppMount(() => {
				if (vnode == null) {
					if (container._vnode) unmount(container._vnode, null, null, true);
				} else patch(container._vnode || null, vnode, container, null, null, null, namespace);
				container._vnode = vnode;
			}, vnode && container._vnode ? void 0 : vnode && vnode.component ? vnode.component.uid : getNextUid());
		};
		const internals = {
			p: patch,
			um: unmount,
			m: move,
			r: remove,
			mt: mountComponent,
			mc: mountChildren,
			pc: patchChildren,
			pbc: patchBlockChildren,
			n: getNextHostNode,
			o: options
		};
		let hydrate;
		let hydrateNode;
		if (createHydrationFns) [hydrate, hydrateNode] = createHydrationFns(internals);
		return {
			render,
			hydrate,
			createApp: createAppAPI(render, hydrate)
		};
	}
	function resolveChildrenNamespace({ type, props }, currentNamespace) {
		return currentNamespace === "svg" && type === "foreignObject" || currentNamespace === "mathml" && type === "annotation-xml" && props && props.encoding && props.encoding.includes("html") ? void 0 : currentNamespace;
	}
	function toggleRecurse({ effect, job }, allowed) {
		if (allowed) {
			effect.flags |= 32;
			job.flags |= 4;
		} else {
			effect.flags &= -33;
			job.flags &= -5;
		}
	}
	function needTransition(parentSuspense, transition) {
		return (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
	}
	function traverseStaticChildren(n1, n2, shallow = false) {
		const ch1 = n1.children;
		const ch2 = n2.children;
		if (isArray(ch1) && isArray(ch2)) for (let i = 0; i < ch1.length; i++) {
			const c1 = ch1[i];
			let c2 = ch2[i];
			if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
				if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
					c2 = ch2[i] = cloneIfMounted(ch2[i]);
					c2.el = c1.el;
				}
				if (!shallow && c2.patchFlag !== -2) traverseStaticChildren(c1, c2);
			}
			if (c2.type === Text) {
				if (c2.patchFlag === -1) c2 = ch2[i] = cloneIfMounted(c2);
				c2.el = c1.el;
			}
			if (c2.type === Comment && !c2.el) c2.el = c1.el;
		}
	}
	function getSequence(arr) {
		const p = arr.slice();
		const result = [0];
		let i, j, u, v, c;
		const len = arr.length;
		for (i = 0; i < len; i++) {
			const arrI = arr[i];
			if (arrI !== 0) {
				j = result[result.length - 1];
				if (arr[j] < arrI) {
					p[i] = j;
					result.push(i);
					continue;
				}
				u = 0;
				v = result.length - 1;
				while (u < v) {
					c = u + v >> 1;
					if (arr[result[c]] < arrI) u = c + 1;
					else v = c;
				}
				if (arrI < arr[result[u]]) {
					if (u > 0) p[i] = result[u - 1];
					result[u] = i;
				}
			}
		}
		u = result.length;
		v = result[u - 1];
		while (u-- > 0) {
			result[u] = v;
			v = p[v];
		}
		return result;
	}
	function locateNonHydratedAsyncRoot(instance) {
		const subComponent = instance.subTree.component;
		if (subComponent) {
			if (subComponent.asyncDep && !subComponent.asyncResolved) return subComponent;
			else return locateNonHydratedAsyncRoot(subComponent);
		}
	}
	function invalidateMount(hooks) {
		if (hooks) for (let i = 0; i < hooks.length; i++) hooks[i].flags |= 8;
	}
	function resolveAsyncComponentPlaceholder(anchorVnode) {
		if (anchorVnode.placeholder) return anchorVnode.placeholder;
		const instance = anchorVnode.component;
		if (instance) return resolveAsyncComponentPlaceholder(instance.subTree);
		return null;
	}
	var isSuspense = (type) => type.__isSuspense;
	function queueEffectWithSuspense(fn, suspense) {
		if (suspense && suspense.pendingBranch) {
			if (isArray(fn)) suspense.effects.push(...fn);
			else suspense.effects.push(fn);
		} else queuePostFlushCb(fn);
	}
	var Fragment = Symbol.for("v-fgt");
	var Text = Symbol.for("v-txt");
	var Comment = Symbol.for("v-cmt");
	var Static = Symbol.for("v-stc");
	var blockStack = [];
	var currentBlock = null;
	function openBlock(disableTracking = false) {
		blockStack.push(currentBlock = disableTracking ? null : []);
	}
	function closeBlock() {
		blockStack.pop();
		currentBlock = blockStack[blockStack.length - 1] || null;
	}
	var isBlockTreeEnabled = 1;
	function setBlockTracking(value, inVOnce = false) {
		isBlockTreeEnabled += value;
		if (value < 0 && currentBlock && inVOnce) currentBlock.hasOnce = true;
	}
	function setupBlock(vnode) {
		vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
		closeBlock();
		if (isBlockTreeEnabled > 0 && currentBlock) currentBlock.push(vnode);
		return vnode;
	}
	function createElementBlock(type, props, children, patchFlag, dynamicProps, shapeFlag) {
		return setupBlock(createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, true));
	}
	function createBlock(type, props, children, patchFlag, dynamicProps) {
		return setupBlock(createVNode(type, props, children, patchFlag, dynamicProps, true));
	}
	function isVNode(value) {
		return value ? value.__v_isVNode === true : false;
	}
	function isSameVNodeType(n1, n2) {
		return n1.type === n2.type && n1.key === n2.key;
	}
	var normalizeKey = ({ key }) => key != null ? key : null;
	var normalizeRef = ({ ref, ref_key, ref_for }) => {
		if (typeof ref === "number") ref = "" + ref;
		return ref != null ? isString(ref) || isRef(ref) || isFunction(ref) ? {
			i: currentRenderingInstance,
			r: ref,
			k: ref_key,
			f: !!ref_for
		} : ref : null;
	};
	function createBaseVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
		const vnode = {
			__v_isVNode: true,
			__v_skip: true,
			type,
			props,
			key: props && normalizeKey(props),
			ref: props && normalizeRef(props),
			scopeId: currentScopeId,
			slotScopeIds: null,
			children,
			component: null,
			suspense: null,
			ssContent: null,
			ssFallback: null,
			dirs: null,
			transition: null,
			el: null,
			anchor: null,
			target: null,
			targetStart: null,
			targetAnchor: null,
			staticCount: 0,
			shapeFlag,
			patchFlag,
			dynamicProps,
			dynamicChildren: null,
			appContext: null,
			ctx: currentRenderingInstance
		};
		if (needFullChildrenNormalization) {
			normalizeChildren(vnode, children);
			if (shapeFlag & 128) type.normalize(vnode);
		} else if (children) vnode.shapeFlag |= isString(children) ? 8 : 16;
		if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) currentBlock.push(vnode);
		return vnode;
	}
	var createVNode = _createVNode;
	function _createVNode(type, props = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
		if (!type || type === NULL_DYNAMIC_COMPONENT) type = Comment;
		if (isVNode(type)) {
			const cloned = cloneVNode(type, props, true);
			if (children) normalizeChildren(cloned, children);
			if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
				if (cloned.shapeFlag & 6) currentBlock[currentBlock.indexOf(type)] = cloned;
				else currentBlock.push(cloned);
			}
			cloned.patchFlag = -2;
			return cloned;
		}
		if (isClassComponent(type)) type = type.__vccOpts;
		if (props) {
			props = guardReactiveProps(props);
			let { class: klass, style } = props;
			if (klass && !isString(klass)) props.class = normalizeClass(klass);
			if (isObject(style)) {
				if (isProxy(style) && !isArray(style)) style = extend({}, style);
				props.style = normalizeStyle(style);
			}
		}
		const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject(type) ? 4 : isFunction(type) ? 2 : 0;
		return createBaseVNode(type, props, children, patchFlag, dynamicProps, shapeFlag, isBlockNode, true);
	}
	function guardReactiveProps(props) {
		if (!props) return null;
		return isProxy(props) || isInternalObject(props) ? extend({}, props) : props;
	}
	function cloneVNode(vnode, extraProps, mergeRef = false, cloneTransition = false) {
		const { props, ref, patchFlag, children, transition } = vnode;
		const mergedProps = extraProps ? mergeProps(props || {}, extraProps) : props;
		const cloned = {
			__v_isVNode: true,
			__v_skip: true,
			type: vnode.type,
			props: mergedProps,
			key: mergedProps && normalizeKey(mergedProps),
			ref: extraProps && extraProps.ref ? mergeRef && ref ? isArray(ref) ? ref.concat(normalizeRef(extraProps)) : [ref, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref,
			scopeId: vnode.scopeId,
			slotScopeIds: vnode.slotScopeIds,
			children,
			target: vnode.target,
			targetStart: vnode.targetStart,
			targetAnchor: vnode.targetAnchor,
			staticCount: vnode.staticCount,
			shapeFlag: vnode.shapeFlag,
			patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
			dynamicProps: vnode.dynamicProps,
			dynamicChildren: vnode.dynamicChildren,
			appContext: vnode.appContext,
			dirs: vnode.dirs,
			transition,
			component: vnode.component,
			suspense: vnode.suspense,
			ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
			ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
			placeholder: vnode.placeholder,
			el: vnode.el,
			anchor: vnode.anchor,
			ctx: vnode.ctx,
			ce: vnode.ce,
			cacheIndex: vnode.cacheIndex
		};
		if (transition && cloneTransition) setTransitionHooks(cloned, transition.clone(cloned));
		return cloned;
	}
	function createTextVNode(text = " ", flag = 0) {
		return createVNode(Text, null, text, flag);
	}
	function createCommentVNode(text = "", asBlock = false) {
		return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
	}
	function normalizeVNode(child) {
		if (child == null || typeof child === "boolean") return createVNode(Comment);
		else if (isArray(child)) return createVNode(Fragment, null, child.slice());
		else if (isVNode(child)) return cloneIfMounted(child);
		else return createVNode(Text, null, String(child));
	}
	function cloneIfMounted(child) {
		return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
	}
	function normalizeChildren(vnode, children) {
		let type = 0;
		const { shapeFlag } = vnode;
		if (children == null) children = null;
		else if (isArray(children)) type = 16;
		else if (typeof children === "object") {
			if (shapeFlag & 65) {
				const slot = children.default;
				if (slot) {
					slot._c && (slot._d = false);
					normalizeChildren(vnode, slot());
					slot._c && (slot._d = true);
				}
				return;
			} else {
				type = 32;
				const slotFlag = children._;
				if (!slotFlag && !isInternalObject(children)) children._ctx = currentRenderingInstance;
				else if (slotFlag === 3 && currentRenderingInstance) {
					if (currentRenderingInstance.slots._ === 1) children._ = 1;
					else {
						children._ = 2;
						vnode.patchFlag |= 1024;
					}
				}
			}
		} else if (isFunction(children)) {
			if (shapeFlag & 65) {
				normalizeChildren(vnode, { default: children });
				return;
			}
			children = {
				default: children,
				_ctx: currentRenderingInstance
			};
			type = 32;
		} else {
			children = String(children);
			if (shapeFlag & 64) {
				type = 16;
				children = [createTextVNode(children)];
			} else type = 8;
		}
		vnode.children = children;
		vnode.shapeFlag |= type;
	}
	function mergeProps(...args) {
		const ret = {};
		for (let i = 0; i < args.length; i++) {
			const toMerge = args[i];
			for (const key in toMerge) if (key === "class") {
				if (ret.class !== toMerge.class) ret.class = normalizeClass([ret.class, toMerge.class]);
			} else if (key === "style") ret.style = normalizeStyle([ret.style, toMerge.style]);
			else if (isOn(key)) {
				const existing = ret[key];
				const incoming = toMerge[key];
				if (incoming && existing !== incoming && !(isArray(existing) && existing.includes(incoming))) ret[key] = existing ? [].concat(existing, incoming) : incoming;
				else if (incoming == null && existing == null && !isModelListener(key)) ret[key] = incoming;
			} else if (key !== "") ret[key] = toMerge[key];
		}
		return ret;
	}
	function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
		callWithAsyncErrorHandling(hook, instance, 7, [vnode, prevVNode]);
	}
	var emptyAppContext = createAppContext();
	var uid = 0;
	function getNextUid() {
		return uid;
	}
	function createComponentInstance(vnode, parent, suspense) {
		const type = vnode.type;
		const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
		const instance = {
			uid: uid++,
			vnode,
			type,
			parent,
			appContext,
			root: null,
			next: null,
			subTree: null,
			effect: null,
			update: null,
			job: null,
			scope: new EffectScope(true),
			render: null,
			proxy: null,
			exposed: null,
			exposeProxy: null,
			withProxy: null,
			provides: parent ? parent.provides : Object.create(appContext.provides),
			ids: parent ? parent.ids : [
				"",
				0,
				0
			],
			accessCache: null,
			renderCache: [],
			components: null,
			directives: null,
			propsOptions: normalizePropsOptions(type, appContext),
			emitsOptions: normalizeEmitsOptions(type, appContext),
			emit: null,
			emitted: null,
			propsDefaults: EMPTY_OBJ,
			inheritAttrs: type.inheritAttrs,
			ctx: EMPTY_OBJ,
			data: EMPTY_OBJ,
			props: EMPTY_OBJ,
			attrs: EMPTY_OBJ,
			slots: EMPTY_OBJ,
			refs: EMPTY_OBJ,
			setupState: EMPTY_OBJ,
			setupContext: null,
			suspense,
			suspenseId: suspense ? suspense.pendingId : 0,
			asyncDep: null,
			asyncResolved: false,
			isMounted: false,
			isUnmounted: false,
			isDeactivated: false,
			bc: null,
			c: null,
			bm: null,
			m: null,
			bu: null,
			u: null,
			um: null,
			bum: null,
			da: null,
			a: null,
			rtg: null,
			rtc: null,
			ec: null,
			sp: null
		};
		instance.ctx = { _: instance };
		instance.root = parent ? parent.root : instance;
		instance.emit = emit.bind(null, instance);
		if (vnode.ce) vnode.ce(instance);
		return instance;
	}
	var currentInstance = null;
	var getCurrentInstance = () => currentInstance || currentRenderingInstance;
	var internalSetCurrentInstance;
	var setInSSRSetupState;
	{
		const g = getGlobalThis();
		const registerGlobalSetter = (key, setter) => {
			let setters;
			if (!(setters = g[key])) setters = g[key] = [];
			setters.push(setter);
			return (v) => {
				if (setters.length > 1) setters.forEach((set) => set(v));
				else setters[0](v);
			};
		};
		internalSetCurrentInstance = registerGlobalSetter(`__VUE_INSTANCE_SETTERS__`, (v) => currentInstance = v);
		setInSSRSetupState = registerGlobalSetter(`__VUE_SSR_SETTERS__`, (v) => isInSSRComponentSetup = v);
	}
	var setCurrentInstance = (instance) => {
		const prev = currentInstance;
		internalSetCurrentInstance(instance);
		instance.scope.on();
		return () => {
			instance.scope.off();
			internalSetCurrentInstance(prev);
		};
	};
	var unsetCurrentInstance = () => {
		currentInstance && currentInstance.scope.off();
		internalSetCurrentInstance(null);
	};
	function isStatefulComponent(instance) {
		return instance.vnode.shapeFlag & 4;
	}
	var isInSSRComponentSetup = false;
	function setupComponent(instance, isSSR = false, optimized = false) {
		isSSR && setInSSRSetupState(isSSR);
		const { props, children } = instance.vnode;
		const isStateful = isStatefulComponent(instance);
		initProps(instance, props, isStateful, isSSR);
		initSlots(instance, children, optimized || isSSR);
		const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
		isSSR && setInSSRSetupState(false);
		return setupResult;
	}
	function setupStatefulComponent(instance, isSSR) {
		const Component = instance.type;
		instance.accessCache = Object.create(null);
		instance.proxy = new Proxy(instance.ctx, PublicInstanceProxyHandlers);
		const { setup } = Component;
		if (setup) {
			pauseTracking();
			const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
			const reset = setCurrentInstance(instance);
			const setupResult = callWithErrorHandling(setup, instance, 0, [instance.props, setupContext]);
			const isAsyncSetup = isPromise(setupResult);
			resetTracking();
			reset();
			if ((isAsyncSetup || instance.sp) && !isAsyncWrapper(instance)) markAsyncBoundary(instance);
			if (isAsyncSetup) {
				setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
				if (isSSR) return setupResult.then((resolvedResult) => {
					setInSSRSetupState(true);
					try {
						handleSetupResult(instance, resolvedResult, isSSR);
					} finally {
						setInSSRSetupState(false);
					}
				}).catch((e) => {
					handleError(e, instance, 0);
				});
				else instance.asyncDep = setupResult;
			} else handleSetupResult(instance, setupResult, isSSR);
		} else finishComponentSetup(instance, isSSR);
	}
	function handleSetupResult(instance, setupResult, isSSR) {
		if (isFunction(setupResult)) {
			if (instance.type.__ssrInlineRender) instance.ssrRender = setupResult;
			else instance.render = setupResult;
		} else if (isObject(setupResult)) instance.setupState = proxyRefs(setupResult);
		finishComponentSetup(instance, isSSR);
	}
	function finishComponentSetup(instance, isSSR, skipOptions) {
		const Component = instance.type;
		if (!instance.render) instance.render = Component.render || NOOP;
		{
			const reset = setCurrentInstance(instance);
			pauseTracking();
			try {
				applyOptions(instance);
			} finally {
				resetTracking();
				reset();
			}
		}
	}
	var attrsProxyHandlers = { get(target, key) {
		track(target, "get", "");
		return target[key];
	} };
	function createSetupContext(instance) {
		const expose = (exposed) => {
			instance.exposed = exposed || {};
		};
		return {
			attrs: new Proxy(instance.attrs, attrsProxyHandlers),
			slots: instance.slots,
			emit: instance.emit,
			expose
		};
	}
	function getComponentPublicInstance(instance) {
		if (instance.exposed) return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
			get(target, key) {
				if (key in target) return target[key];
				else if (key in publicPropertiesMap) return publicPropertiesMap[key](instance);
			},
			has(target, key) {
				return key in target || key in publicPropertiesMap;
			}
		}));
		else return instance.proxy;
	}
	function isClassComponent(value) {
		return isFunction(value) && "__vccOpts" in value;
	}
	var computed = (getterOrOptions, debugOptions) => {
		return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
	};
	var version$1 = "3.5.44";
	var policy = void 0;
	var tt = typeof window !== "undefined" && window.trustedTypes;
	if (tt) try {
		policy = tt.createPolicy("vue", { createHTML: (val) => val });
	} catch (e) {}
	var unsafeToTrustedHTML = policy ? (val) => policy.createHTML(val) : (val) => val;
	var svgNS = "http://www.w3.org/2000/svg";
	var mathmlNS = "http://www.w3.org/1998/Math/MathML";
	var doc = typeof document !== "undefined" ? document : null;
	var templateContainer = doc && doc.createElement("template");
	var nodeOps = {
		insert: (child, parent, anchor) => {
			parent.insertBefore(child, anchor || null);
		},
		remove: (child) => {
			const parent = child.parentNode;
			if (parent) parent.removeChild(child);
		},
		createElement: (tag, namespace, is, props) => {
			const el = namespace === "svg" ? doc.createElementNS(svgNS, tag) : namespace === "mathml" ? doc.createElementNS(mathmlNS, tag) : is ? doc.createElement(tag, { is }) : doc.createElement(tag);
			if (tag === "select" && props && props.multiple != null) el.setAttribute("multiple", props.multiple);
			return el;
		},
		createText: (text) => doc.createTextNode(text),
		createComment: (text) => doc.createComment(text),
		setText: (node, text) => {
			node.nodeValue = text;
		},
		setElementText: (el, text) => {
			el.textContent = text;
		},
		parentNode: (node) => node.parentNode,
		nextSibling: (node) => node.nextSibling,
		querySelector: (selector) => doc.querySelector(selector),
		setScopeId(el, id) {
			el.setAttribute(id, "");
		},
		insertStaticContent(content, parent, anchor, namespace, start, end) {
			const before = anchor ? anchor.previousSibling : parent.lastChild;
			if (start && (start === end || start.nextSibling)) while (true) {
				parent.insertBefore(start.cloneNode(true), anchor);
				if (start === end || !(start = start.nextSibling)) break;
			}
			else {
				templateContainer.innerHTML = unsafeToTrustedHTML(namespace === "svg" ? `<svg>${content}</svg>` : namespace === "mathml" ? `<math>${content}</math>` : content);
				const template = templateContainer.content;
				if (namespace === "svg" || namespace === "mathml") {
					const wrapper = template.firstChild;
					while (wrapper.firstChild) template.appendChild(wrapper.firstChild);
					template.removeChild(wrapper);
				}
				parent.insertBefore(template, anchor);
			}
			return [before ? before.nextSibling : parent.firstChild, anchor ? anchor.previousSibling : parent.lastChild];
		}
	};
	var vtcKey = Symbol("_vtc");
	function patchClass(el, value, isSVG) {
		const transitionClasses = el[vtcKey];
		if (transitionClasses) value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
		if (value == null) el.removeAttribute("class");
		else if (isSVG) el.setAttribute("class", value);
		else el.className = value;
	}
	var vShowOriginalDisplay = Symbol("_vod");
	var vShowHidden = Symbol("_vsh");
	var vShow = {
		name: "show",
		beforeMount(el, { value }, { transition }) {
			el[vShowOriginalDisplay] = el.style.display === "none" ? "" : el.style.display;
			if (transition && value) transition.beforeEnter(el);
			else setDisplay(el, value);
		},
		mounted(el, { value }, { transition }) {
			if (transition && value) transition.enter(el);
		},
		updated(el, { value, oldValue }, { transition }) {
			if (!value === !oldValue) return;
			if (transition) {
				if (value) {
					transition.beforeEnter(el);
					setDisplay(el, true);
					transition.enter(el);
				} else transition.leave(el, () => {
					setDisplay(el, false);
				});
			} else setDisplay(el, value);
		},
		beforeUnmount(el, { value }) {
			setDisplay(el, value);
		}
	};
	function setDisplay(el, value) {
		el.style.display = value ? el[vShowOriginalDisplay] : "none";
		el[vShowHidden] = !value;
	}
	var CSS_VAR_TEXT = Symbol("");
	var displayRE = /(?:^|;)\s*display\s*:/;
	function patchStyle(el, prev, next) {
		const style = el.style;
		const isCssString = isString(next);
		let hasControlledDisplay = false;
		if (next && !isCssString) {
			if (prev) {
				if (!isString(prev)) {
					for (const key in prev) if (next[key] == null) setStyle(style, key, "");
				} else for (const prevStyle of prev.split(";")) {
					const key = prevStyle.slice(0, prevStyle.indexOf(":")).trim();
					if (next[key] == null) setStyle(style, key, "");
				}
			}
			for (const key in next) {
				if (key === "display") hasControlledDisplay = true;
				const value = next[key];
				if (value != null) {
					if (!shouldPreserveTextareaResizeStyle(el, key, !isString(prev) && prev ? prev[key] : void 0, value)) setStyle(style, key, value);
				} else setStyle(style, key, "");
			}
		} else if (isCssString) {
			if (prev !== next) {
				const cssVarText = style[CSS_VAR_TEXT];
				if (cssVarText) next += ";" + cssVarText;
				style.cssText = next;
				hasControlledDisplay = displayRE.test(next);
			}
		} else if (prev) el.removeAttribute("style");
		if (vShowOriginalDisplay in el) {
			if (!isCssString || prev !== next) el[vShowOriginalDisplay] = hasControlledDisplay ? style.display : "";
			if (el[vShowHidden]) style.display = "none";
		}
	}
	var importantRE = /\s*!important$/;
	function setStyle(style, name, val) {
		if (isArray(val)) val.forEach((v) => setStyle(style, name, v));
		else {
			if (val == null) val = "";
			if (name.startsWith("--")) {
				if (importantRE.test(val)) style.setProperty(name, val.replace(importantRE, ""), "important");
				else style.setProperty(name, val);
			} else {
				const prefixed = autoPrefix(style, name);
				if (importantRE.test(val)) style.setProperty(hyphenate(prefixed), val.replace(importantRE, ""), "important");
				else style[prefixed] = val;
			}
		}
	}
	var prefixes = [
		"Webkit",
		"Moz",
		"ms"
	];
	var prefixCache = {};
	function autoPrefix(style, rawName) {
		const cached = prefixCache[rawName];
		if (cached) return cached;
		let name = camelize(rawName);
		if (name !== "filter" && name in style) return prefixCache[rawName] = name;
		name = capitalize(name);
		for (let i = 0; i < prefixes.length; i++) {
			const prefixed = prefixes[i] + name;
			if (prefixed in style) return prefixCache[rawName] = prefixed;
		}
		return rawName;
	}
	function shouldPreserveTextareaResizeStyle(el, key, prev, next) {
		return el.tagName === "TEXTAREA" && (key === "width" || key === "height") && isString(next) && prev === next;
	}
	var xlinkNS = "http://www.w3.org/1999/xlink";
	function patchAttr(el, key, value, isSVG, instance, isBoolean = isSpecialBooleanAttr(key)) {
		if (isSVG && key.startsWith("xlink:")) {
			if (value == null) el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
			else el.setAttributeNS(xlinkNS, key, value);
		} else if (value == null || isBoolean && !includeBooleanAttr(value)) el.removeAttribute(key);
		else el.setAttribute(key, isBoolean ? "" : isSymbol(value) ? String(value) : value);
	}
	function patchDOMProp(el, key, value, parentComponent, attrName) {
		if (key === "innerHTML" || key === "textContent") {
			if (value != null) el[key] = key === "innerHTML" ? unsafeToTrustedHTML(value) : value;
			return;
		}
		const tag = el.tagName;
		if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
			const oldValue = tag === "OPTION" ? el.getAttribute("value") || "" : el.value;
			const newValue = value == null ? el.type === "checkbox" ? "on" : "" : String(value);
			if (oldValue !== newValue || !("_value" in el)) el.value = newValue;
			if (value == null) el.removeAttribute(key);
			el._value = value;
			return;
		}
		let needRemove = false;
		if (value === "" || value == null) {
			const type = typeof el[key];
			if (type === "boolean") value = includeBooleanAttr(value);
			else if (value == null && type === "string") {
				value = "";
				needRemove = true;
			} else if (type === "number") {
				value = 0;
				needRemove = true;
			}
		}
		try {
			el[key] = value;
		} catch (e) {}
		needRemove && el.removeAttribute(attrName || key);
	}
	function addEventListener(el, event, handler, options) {
		el.addEventListener(event, handler, options);
	}
	function removeEventListener(el, event, handler, options) {
		el.removeEventListener(event, handler, options);
	}
	var veiKey = Symbol("_vei");
	function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
		const invokers = el[veiKey] || (el[veiKey] = {});
		const existingInvoker = invokers[rawName];
		if (nextValue && existingInvoker) existingInvoker.value = nextValue;
		else {
			const [name, options] = parseName(rawName);
			if (nextValue) addEventListener(el, name, invokers[rawName] = createInvoker(nextValue, instance), options);
			else if (existingInvoker) {
				removeEventListener(el, name, existingInvoker, options);
				invokers[rawName] = void 0;
			}
		}
	}
	var optionsModifierRE = /(Once|Passive|Capture)$/;
	var optionsModifierEventRE = /^on:?(?:Once|Passive|Capture)$/;
	function parseName(name) {
		let options;
		let m;
		while ((m = name.match(optionsModifierRE)) && !optionsModifierEventRE.test(name)) {
			if (!options) options = {};
			name = name.slice(0, name.length - m[1].length);
			options[m[1].toLowerCase()] = true;
		}
		return [name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2)), options];
	}
	var cachedNow = 0;
	var p = Promise.resolve();
	var getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
	function createInvoker(initialValue, instance) {
		const invoker = (e) => {
			if (!e._vts) e._vts = Date.now();
			else if (e._vts <= invoker.attached) return;
			const value = invoker.value;
			if (isArray(value)) {
				const originalStop = e.stopImmediatePropagation;
				e.stopImmediatePropagation = () => {
					originalStop.call(e);
					e._stopped = true;
				};
				const handlers = value.slice();
				const args = [e];
				for (let i = 0; i < handlers.length; i++) {
					if (e._stopped) break;
					const handler = handlers[i];
					if (handler) callWithAsyncErrorHandling(handler, instance, 5, args);
				}
			} else callWithAsyncErrorHandling(value, instance, 5, [e]);
		};
		invoker.value = initialValue;
		invoker.attached = getNow();
		return invoker;
	}
	var isNativeOn = (key) => key.charCodeAt(0) === 111 && key.charCodeAt(1) === 110 && key.charCodeAt(2) > 96 && key.charCodeAt(2) < 123;
	var patchProp = (el, key, prevValue, nextValue, namespace, parentComponent) => {
		const isSVG = namespace === "svg";
		if (key === "class") patchClass(el, nextValue, isSVG);
		else if (key === "style") patchStyle(el, prevValue, nextValue);
		else if (isOn(key)) {
			if (!isModelListener(key)) patchEvent(el, key, prevValue, nextValue, parentComponent);
		} else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
			patchDOMProp(el, key, nextValue);
			if (!el.tagName.includes("-") && (key === "value" || key === "checked" || key === "selected")) patchAttr(el, key, nextValue, isSVG, parentComponent, key !== "value");
		} else if (el._isVueCE && (shouldSetAsPropForVueCE(el, key) || el._def.__asyncLoader && (/[A-Z]/.test(key) || !isString(nextValue)))) patchDOMProp(el, camelize(key), nextValue, parentComponent, key);
		else {
			if (key === "true-value") el._trueValue = nextValue;
			else if (key === "false-value") el._falseValue = nextValue;
			patchAttr(el, key, nextValue, isSVG);
		}
	};
	function shouldSetAsProp(el, key, value, isSVG) {
		if (isSVG) {
			if (key === "innerHTML" || key === "textContent") return true;
			if (key in el && isNativeOn(key) && isFunction(value)) return true;
			return false;
		}
		if (key === "spellcheck" || key === "draggable" || key === "translate" || key === "autocorrect") return false;
		if (key === "sandbox" && el.tagName === "IFRAME") return false;
		if (key === "form") return false;
		if (key === "list" && el.tagName === "INPUT") return false;
		if (key === "type" && el.tagName === "TEXTAREA") return false;
		if (key === "width" || key === "height") {
			const tag = el.tagName;
			if (tag === "IMG" || tag === "VIDEO" || tag === "CANVAS" || tag === "SOURCE") return false;
		}
		if (isNativeOn(key) && isString(value)) return false;
		return key in el;
	}
	function shouldSetAsPropForVueCE(el, key) {
		const props = el._def.props;
		if (!props) return false;
		const camelKey = camelize(key);
		return Array.isArray(props) ? props.some((prop) => camelize(prop) === camelKey) : Object.keys(props).some((prop) => camelize(prop) === camelKey);
	}
	var getModelAssigner = (vnode) => {
		const fn = vnode.props["onUpdate:modelValue"] || false;
		return isArray(fn) ? (value) => invokeArrayFns(fn, value) : fn;
	};
	function onCompositionStart(e) {
		e.target.composing = true;
	}
	function onCompositionEnd(e) {
		const target = e.target;
		if (target.composing) {
			target.composing = false;
			target.dispatchEvent(new Event("input"));
		}
	}
	var assignKey = Symbol("_assign");
	var initialValueKey = Symbol("_initialValue");
	function castValue(value, trim, number) {
		if (trim) value = value.trim();
		if (number) value = looseToNumber(value);
		return value;
	}
	var vModelText = {
		created(el, { modifiers: { lazy, trim, number } }, vnode) {
			if (el.parentNode) {
				if (el.type === "text") el[initialValueKey] = el.defaultValue.replace(/[\r\n]/g, "");
				else if (el.type === "textarea") el[initialValueKey] = el.defaultValue.replace(/\r\n?/g, "\n");
			}
			el[assignKey] = getModelAssigner(vnode);
			const castToNumber = number || vnode.props && vnode.props.type === "number";
			addEventListener(el, lazy ? "change" : "input", (e) => {
				if (e.target.composing) return;
				el[assignKey](castValue(el.value, trim, castToNumber));
			});
			if (trim || castToNumber) addEventListener(el, "change", () => {
				el.value = castValue(el.value, trim, castToNumber);
			});
			if (!lazy) {
				addEventListener(el, "compositionstart", onCompositionStart);
				addEventListener(el, "compositionend", onCompositionEnd);
				addEventListener(el, "change", onCompositionEnd);
			}
		},
		mounted(el, { value, modifiers: { trim, number } }) {
			const newValue = value == null ? "" : value;
			const initialValue = el[initialValueKey];
			delete el[initialValueKey];
			if (initialValue !== void 0 && (el.type === "text" || el.type === "textarea") && el.value !== initialValue) el[assignKey](castValue(el.value, trim, number));
			else el.value = newValue;
		},
		beforeUpdate(el, { value, oldValue, modifiers: { lazy, trim, number } }, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			if (el.composing) return;
			const elValue = (number || el.type === "number") && !/^0\d/.test(el.value) ? looseToNumber(el.value) : el.value;
			const newValue = value == null ? "" : value;
			if (elValue === newValue) return;
			const rootNode = el.getRootNode();
			if ((rootNode instanceof Document || rootNode instanceof ShadowRoot) && rootNode.activeElement === el && el.type !== "range") {
				if (lazy && value === oldValue) return;
				if (trim && el.value.trim() === newValue) return;
			}
			el.value = newValue;
		}
	};
	var vModelRadio = {
		created(el, { value }, vnode) {
			el.checked = looseEqual(value, vnode.props.value);
			el[assignKey] = getModelAssigner(vnode);
			addEventListener(el, "change", () => {
				el[assignKey](getValue$1(el));
			});
		},
		beforeUpdate(el, { value, oldValue }, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			if (value !== oldValue) el.checked = looseEqual(value, vnode.props.value);
		}
	};
	var vModelSelect = {
		deep: true,
		created(el, { value, modifiers: { number } }, vnode) {
			el._modelValue = value;
			addEventListener(el, "change", () => {
				const selectedVal = Array.prototype.filter.call(el.options, (o) => o.selected).map((o) => number ? looseToNumber(getValue$1(o)) : getValue$1(o));
				const multiple = el.multiple;
				const assignedValue = multiple ? isSet(el._modelValue) ? new Set(selectedVal) : selectedVal : selectedVal[0];
				const pending = el._pendingValue = [multiple, multiple ? isArray(assignedValue) ? selectedVal.slice() : selectedVal : assignedValue];
				try {
					el[assignKey](assignedValue);
				} finally {
					nextTick(() => {
						if (el._pendingValue === pending) el._pendingValue = void 0;
					});
				}
			});
			el[assignKey] = getModelAssigner(vnode);
		},
		mounted(el, { value }) {
			setSelected(el, value);
		},
		beforeUpdate(el, { value }, vnode) {
			el._modelValue = value;
			el[assignKey] = getModelAssigner(vnode);
		},
		updated(el, { value }) {
			const pending = el._pendingValue;
			el._pendingValue = void 0;
			if (!pending || pending[0] !== el.multiple || !isSameSelectValue(value, pending[1], pending[0])) setSelected(el, value);
		}
	};
	function isSameSelectValue(value, assignedValue, multiple) {
		if (!multiple) return looseEqual(value, assignedValue);
		if (isArray(value)) return looseEqual(value, assignedValue);
		if (isSet(value)) {
			if (value.size !== assignedValue.length) return false;
			for (const item of assignedValue) if (!value.has(item)) return false;
			return true;
		}
		return false;
	}
	function setSelected(el, value) {
		const isMultiple = el.multiple;
		const isArrayValue = isArray(value);
		if (isMultiple && !isArrayValue && !isSet(value)) return;
		for (let i = 0, l = el.options.length; i < l; i++) {
			const option = el.options[i];
			const optionValue = getValue$1(option);
			if (isMultiple) {
				if (isArrayValue) {
					const optionType = typeof optionValue;
					if (optionType === "string" || optionType === "number") option.selected = value.some((v) => String(v) === String(optionValue));
					else option.selected = looseIndexOf(value, optionValue) > -1;
				} else option.selected = value.has(optionValue);
			} else if (looseEqual(getValue$1(option), value)) {
				if (el.selectedIndex !== i) el.selectedIndex = i;
				return;
			}
		}
		if (!isMultiple && el.selectedIndex !== -1) el.selectedIndex = -1;
	}
	function getValue$1(el) {
		return "_value" in el ? el._value : el.value;
	}
	var systemModifiers = [
		"ctrl",
		"shift",
		"alt",
		"meta"
	];
	var modifierGuards = {
		stop: (e) => e.stopPropagation(),
		prevent: (e) => e.preventDefault(),
		self: (e) => e.target !== e.currentTarget,
		ctrl: (e) => !e.ctrlKey,
		shift: (e) => !e.shiftKey,
		alt: (e) => !e.altKey,
		meta: (e) => !e.metaKey,
		left: (e) => "button" in e && e.button !== 0,
		middle: (e) => "button" in e && e.button !== 1,
		right: (e) => "button" in e && e.button !== 2,
		exact: (e, modifiers) => systemModifiers.some((m) => e[`${m}Key`] && !modifiers.includes(m))
	};
	var withModifiers = (fn, modifiers) => {
		if (!fn) return fn;
		const cache = fn._withMods || (fn._withMods = {});
		const cacheKey = modifiers.join(".");
		return cache[cacheKey] || (cache[cacheKey] = ((event, ...args) => {
			for (let i = 0; i < modifiers.length; i++) {
				const guard = modifierGuards[modifiers[i]];
				if (guard && guard(event, modifiers)) return;
			}
			return fn(event, ...args);
		}));
	};
	var keyNames = {
		esc: "escape",
		space: " ",
		up: "arrow-up",
		left: "arrow-left",
		right: "arrow-right",
		down: "arrow-down",
		delete: "backspace"
	};
	var withKeys = (fn, modifiers) => {
		const cache = fn._withKeys || (fn._withKeys = {});
		const cacheKey = modifiers.join(".");
		return cache[cacheKey] || (cache[cacheKey] = ((event) => {
			if (!("key" in event)) return;
			const eventKey = hyphenate(event.key);
			if (modifiers.some((k) => k === eventKey || keyNames[k] === eventKey)) return fn(event);
		}));
	};
	var rendererOptions = extend({ patchProp }, nodeOps);
	var renderer;
	function ensureRenderer() {
		return renderer || (renderer = createRenderer(rendererOptions));
	}
	var createApp = ((...args) => {
		const app = ensureRenderer().createApp(...args);
		const { mount } = app;
		app.mount = (containerOrSelector) => {
			const container = normalizeContainer(containerOrSelector);
			if (!container) return;
			const component = app._component;
			if (!isFunction(component) && !component.render && !component.template) component.template = container.innerHTML;
			if (container.nodeType === 1) container.textContent = "";
			const proxy = mount(container, false, resolveRootNamespace(container));
			if (container instanceof Element) {
				container.removeAttribute("v-cloak");
				container.setAttribute("data-v-app", "");
			}
			return proxy;
		};
		return app;
	});
	function resolveRootNamespace(container) {
		if (container instanceof SVGElement) return "svg";
		if (typeof MathMLElement === "function" && container instanceof MathMLElement) return "mathml";
	}
	function normalizeContainer(container) {
		if (isString(container)) return document.querySelector(container);
		return container;
	}
	var ui = reactive({
		categoryIcon: true,
		iconSource: 0,
		settingPanelOpen: false,
		settingsRevision: 0,
		toastText: "",
		toastVisible: false,
		toastActionLabel: ""
	});
	var toastTimer = null;
	var toastActionHandler = null;
	var toastPriority = 0;
	function hideToast() {
		ui.toastVisible = false;
		ui.toastActionLabel = "";
		toastActionHandler = null;
		toastPriority = 0;
	}
	function showToast(text, duration = 1500, action = null, { priority } = {}) {
		const nextPriority = priority ?? (action ? 1 : 0);
		if (ui.toastVisible && nextPriority < toastPriority) return;
		ui.toastText = text;
		ui.toastVisible = true;
		ui.toastActionLabel = action?.label || "";
		toastActionHandler = action?.onClick || null;
		toastPriority = nextPriority;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(hideToast, duration);
	}
	function runToastAction() {
		const handler = toastActionHandler;
		if (!handler) return;
		clearTimeout(toastTimer);
		hideToast();
		handler();
	}
	function openSettingPanel() {
		ui.settingPanelOpen = true;
	}
	function closeSettingPanel() {
		ui.settingPanelOpen = false;
	}
	var inlineStyleBlocked = null;
	var cspNonce = null;
	function isInlineStyleBlocked() {
		if (inlineStyleBlocked !== null) return inlineStyleBlocked;
		try {
			const probe = document.createElement("div");
			document.documentElement.appendChild(probe);
			probe.style.setProperty("position", "fixed");
			inlineStyleBlocked = !probe.getAttribute("style");
			probe.remove();
		} catch (e) {
			inlineStyleBlocked = false;
		}
		return inlineStyleBlocked;
	}
	function getCSPNonce() {
		if (cspNonce) return cspNonce;
		const nonceElement = document.querySelector("style[nonce], script[nonce]");
		const value = nonceElement?.nonce || nonceElement?.getAttribute("nonce") || "";
		if (value) cspNonce = value;
		return value;
	}
	function resetCSPNonce() {
		cspNonce = null;
	}
	var INSTANCE_ROLE = "prod";
	var HOST_ID = "sej-shadow-host";
	var HOST_SELECTOR = "#sej-shadow-host, #sej-shadow-host-dev";
	var ROLE_RANK = {
		prod: 0,
		dev: 1
	};
	var STACK_GAP = 8;
	var TOAST_STACK_STEP = 43;
	var shadowHost = null;
	var shadowRoot = null;
	var constructableSheets = [];
	var injectedStyles = new Set();
	function supportsConstructableStylesheets() {
		return typeof CSSStyleSheet !== "undefined" && typeof ShadowRoot !== "undefined" && "replaceSync" in CSSStyleSheet.prototype && "adoptedStyleSheets" in ShadowRoot.prototype;
	}
	function initialize() {
		if (shadowHost) return shadowRoot;
		shadowHost = document.createElement("div");
		shadowHost.id = HOST_ID;
		shadowHost.dataset.sejInstance = INSTANCE_ROLE;
		shadowRoot = shadowHost.attachShadow({ mode: "open" });
		return shadowRoot;
	}
	function getHost() {
		if (!shadowHost) initialize();
		return shadowHost;
	}
	var dropRoot = null;
	function getDropRoot() {
		if (!shadowRoot) initialize();
		if (!dropRoot) {
			dropRoot = document.createElement("div");
			dropRoot.id = "sej-drop-lists";
			shadowRoot.appendChild(dropRoot);
		}
		return dropRoot;
	}
	function insertHost(target, position = "beforeend") {
		if (!shadowHost) initialize();
		if (shadowHost.parentNode) shadowHost.parentNode.removeChild(shadowHost);
		if (position === "beforebegin") target.parentNode.insertBefore(shadowHost, target);
		else if (position === "afterbegin") {
			if (target.firstChild) target.insertBefore(shadowHost, target.firstChild);
			else target.appendChild(shadowHost);
		} else if (position === "beforeend") target.appendChild(shadowHost);
		else if (position === "afterend") {
			if (target.nextSibling) target.parentNode.insertBefore(shadowHost, target.nextSibling);
			else target.parentNode.appendChild(shadowHost);
		} else document.body.appendChild(shadowHost);
		return shadowHost;
	}
	function addStyle(cssText) {
		if (!cssText || injectedStyles.has(cssText)) return;
		injectedStyles.add(cssText);
		if (!shadowRoot) initialize();
		if (supportsConstructableStylesheets()) try {
			const sheet = new CSSStyleSheet();
			sheet.replaceSync(cssText);
			constructableSheets.push(sheet);
			shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, sheet];
			return;
		} catch (e) {
			console.warn("Constructable stylesheet 注入失败，回退到 <style> 注入", e);
		}
		const style = document.createElement("style");
		const nonce = getCSPNonce();
		if (nonce) style.setAttribute("nonce", nonce);
		style.textContent = cssText;
		shadowRoot.appendChild(style);
	}
	function reset() {
		if (shadowHost?.parentNode) shadowHost.parentNode.removeChild(shadowHost);
		shadowHost = null;
		shadowRoot = null;
		dropRoot = null;
		constructableSheets.length = 0;
		injectedStyles.clear();
		stackSheet = null;
		stackSheetText = "";
		resetCSPNonce();
	}
	function getInstanceHosts() {
		return Array.from(document.querySelectorAll(HOST_SELECTOR));
	}
	function getContainerEl(host) {
		return host.shadowRoot?.querySelector("#sej-container") || null;
	}
	function isOverlayHost(host) {
		if (host.style.position === "fixed") return true;
		const container = getContainerEl(host);
		return Boolean(container) && getComputedStyle(container).position === "fixed";
	}
	function renderedHeight(host) {
		const rect = host.getBoundingClientRect();
		if (rect.height > .5) return rect.height;
		const container = getContainerEl(host);
		return container ? container.getBoundingClientRect().height : 0;
	}
	function getStackOffset() {
		if (!shadowHost) return 0;
		const selfRank = ROLE_RANK["prod"] ?? 0;
		let offset = 0;
		for (const host of getInstanceHosts()) {
			if (host === shadowHost) continue;
			if ((ROLE_RANK[host.dataset.sejInstance] ?? 0) >= selfRank || !isOverlayHost(host)) continue;
			offset += renderedHeight(host) + STACK_GAP;
		}
		return Math.round(offset);
	}
	var stackSheet = null;
	var stackSheetText = "";
	function writeStackSheet(cssText) {
		if (cssText === stackSheetText) return;
		if (!shadowRoot) initialize();
		if (!stackSheet) {
			if (supportsConstructableStylesheets()) try {
				stackSheet = new CSSStyleSheet();
				stackSheet.replaceSync("");
				shadowRoot.adoptedStyleSheets = [...shadowRoot.adoptedStyleSheets, stackSheet];
			} catch (e) {
				stackSheet = null;
			}
			if (!stackSheet) {
				stackSheet = document.createElement("style");
				const nonce = getCSPNonce();
				if (nonce) stackSheet.setAttribute("nonce", nonce);
				shadowRoot.appendChild(stackSheet);
			}
		}
		if (typeof stackSheet.replaceSync === "function") stackSheet.replaceSync(cssText);
		else stackSheet.textContent = cssText;
		stackSheetText = cssText;
	}
	function refreshStackLayout() {
		if (!shadowRoot) return;
		const offset = getStackOffset();
		const toastOffset = getInstanceHosts().length > 1 ? TOAST_STACK_STEP : 0;
		const rules = [];
		if (offset > 0) rules.push(`#sej-container.selectSearch { top: calc(2px + ${offset}px); }`);
		if (toastOffset > 0) rules.push(`#iqixn-global-tip { bottom: calc(5% + ${toastOffset}px); }`);
		writeStackSheet(rules.join("\n"));
	}
	var _163_exports = __exportAll({ default: () => _163_default });
	var _163_default = [{
		enabled: true,
		url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
		hosts: ["music.163.com"],
		fixedTop: 0,
		insertIntoDoc: {
			keyword: function() {
				return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);
			},
			target: "css;.m-subnav.m-subnav-up.f-pr.j-tflag",
			where: "afterEnd"
		},
		style: `
      margin: auto;
      top: 3px;
    `
	}];
	var baidu_exports = __exportAll({ default: () => baidu_default });
	var baidu_default = [{
		enabled: true,
		url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
		hosts: ["www.baidu.com"],
		fixedTop: 80,
		insertIntoDoc: {
			keyword: "css;input#kw",
			target: "css;#wrapper_wrapper",
			where: "afterBegin"
		},
		style: `
      margin-top: 8px;
      z-index: 101;
      margin: 0 var(--container-left-gap);
    `,
		stylish: `
      .headBlock,
      .se_common_hint {
        display: none !important;
      }
      #wrapper > .result-molecule {
        z-index: 300 !important;
      }
    `
	}];
	var bilibili_exports = __exportAll({ default: () => bilibili_default });
	var bilibili_default = [{
		enabled: true,
		url: /^https?:\/\/search\.bilibili\.com\/*/,
		hosts: ["search.bilibili.com"],
		fixedTop: 65,
		insertIntoDoc: {
			keyword: function() {
				if (document.querySelector("#search-keyword")) return document.querySelector("#search-keyword").value;
				else return document.querySelector(".search-input-el").value;
			},
			target: function() {
				if (document.querySelector(".head-contain")) return document.querySelector(".head-contain");
				else return document.querySelector(".search-input");
			},
			where: "afterEnd"
		},
		style: `
      width: 980px;
      margin: 10px auto 10px;
    `
	}];
	var bing_exports = __exportAll({ default: () => bing_default });
	var bing_default = [
		{
			enabled: true,
			url: /^https?:\/\/[^.]*\.bing\.com\/search/,
			hostSuffixes: ["bing.com"],
			fixedTop: 60,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_content",
				where: "beforeBegin"
			},
			style: `
      margin: 2px 0 2px;
      left: 160px;
    `,
			patches: {
				narrowFullWidth: true,
				constrainToViewport: true,
				alignTo: ".b_scopebar"
			}
		},
		{
			enabled: true,
			url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
			hostSuffixes: ["bing.com"],
			fixedTop: 88,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_content",
				where: "afterBegin"
			},
			style: `
      left: 160px;
      margin-top: 15px;
    `
		},
		{
			enabled: true,
			url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i,
			hostSuffixes: ["bing.com"],
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_header",
				where: "beforeEnd"
			},
			style: `
      margin-top: 6px;
      left: 148px;
    `
		}
	];
	var dict_exports = __exportAll({ default: () => dict_default });
	var dict_default = [{
		enabled: true,
		url: /^https?:\/\/dict\.cn\/./,
		hosts: ["dict.cn"],
		insertIntoDoc: {
			keyword: "css;#q",
			target: "css;.main",
			where: "afterBegin"
		},
		style: `
      z-index: 99;
      text-align: center;
    `
	}];
	var dmhy_org_exports = __exportAll({ default: () => dmhy_org_default });
	var dmhy_org_default = [{
		enabled: true,
		url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i,
		hosts: ["share.dmhy.org"],
		insertIntoDoc: {
			keyword: "css;#keyword",
			target: "css;.table.clear",
			where: "beforeBegin"
		},
		style: `
      text-align: center;
    `
	}];
	var douban_exports = __exportAll({ default: () => douban_default });
	var douban_default = [{
		enabled: true,
		url: /^https?:\/\/www\.douban\.com\/search/i,
		hosts: ["www.douban.com"],
		insertIntoDoc: {
			keyword: "css;#content > div > div.article > div.mod-search > form > fieldset > div.inp > input",
			target: "css;#content > div > div.article > div.mod-search",
			where: "afterEnd"
		},
		style: `
      margin: -1em 0 1em 7em;
      position: sticky;
      top: 0.1em;
    `
	}];
	var google_exports = __exportAll({ default: () => google_default });
	var google_default = [{
		enabled: true,
		url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
		hosts: ["xn--flw351e.ml"],
		hostPattern: /^www\.google(?:\.[a-z]{2,3}){1,2}$/i,
		fixedTop: 56,
		insertIntoDoc: {
			target: "css;#appbar",
			keyword: "css;[name=q]",
			where: "beforeBegin"
		},
		class: "s6JM6d",
		wrapperClass: "YNk70c",
		style: `
      z-index: 100;
      margin: 2px 0 2px;
      grid-column: 2 / -2;
    `,
		stylish: "#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset} #sej-container-wrapper{display:grid !important}",
		patches: {
			narrowFullWidth: true,
			constrainToViewport: true,
			narrowMaxWidthInPixels: true,
			getFixedHeaderBottom({ bottom, barLeft, barWidth, inputTarget }) {
				const searchBox = inputTarget instanceof Element ? inputTarget.closest("form") || inputTarget : null;
				if (!searchBox) return bottom;
				let node = searchBox;
				while (node && node !== document.documentElement) {
					if (/^(fixed|sticky)$/.test(getComputedStyle(node).position)) break;
					node = node.parentElement;
				}
				if (!node || node === document.documentElement) return bottom;
				const rect = searchBox.getBoundingClientRect();
				const halfViewport = window.innerHeight * .5;
				return rect.right > barLeft && rect.left < barLeft + barWidth && rect.top < halfViewport && rect.bottom > bottom && rect.bottom < halfViewport ? rect.bottom : bottom;
			}
		}
	}];
	var moegirl_exports = __exportAll({ default: () => moegirl_default });
	var moegirl_default = [{
		enabled: true,
		url: /^https?:\/\/.*\.?moegirl\.org\.cn/i,
		hostSuffixes: ["moegirl.org.cn"],
		fixedTop: 52,
		insertIntoDoc: {
			keyword: "css;#firstHeading",
			target: "css;#moe-topbanner-container",
			where: "afterEnd"
		},
		style: `
      margin: -0.8em auto 0;
      z-index: 3;
      width: 1200px !important;
      top: 12px;
    `
	}];
	var runoob_exports = __exportAll({ default: () => runoob_default });
	var runoob_default = [{
		enabled: true,
		url: /^https?:.*?runoob\.com\//i,
		hostSuffixes: ["runoob.com"],
		insertIntoDoc: {
			keyword: function() {
				var url = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
				return decodeURIComponent(url);
			},
			target: "css;.main>.row",
			where: "afterBegin"
		},
		style: `
      border-bottom: 1px solid #E5E5E5;
      border-top: 1px solid #E5E5E5;
      position: relative;
      text-align: center;
      margin: 0 auto 2em;
    `
	}];
	var sogou_exports = __exportAll({ default: () => sogou_default });
	var sogou_default = [{
		enabled: true,
		url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
		hosts: ["www.sogou.com"],
		fixedTop: 60,
		insertIntoDoc: {
			keyword: "css;#upquery",
			target: "css;#wrapper",
			where: "afterBegin"
		},
		style: `
      top: -40px;
      z-index: 99;
      left: -5px;
    `,
		stylish: "#float_uphint{display:none;}"
	}];
	var stackoverflow_exports = __exportAll({ default: () => stackoverflow_default });
	var stackoverflow_default = [{
		enabled: true,
		url: /^https?:\/\/stackoverflow\.com\/search\?/i,
		hosts: ["stackoverflow.com"],
		fixedTop: 50,
		insertIntoDoc: {
			keyword: "css; #search > div > input",
			target: "css;body > div.container",
			where: "beforeBegin"
		},
		style: "width: min(100%, 1264px) !important;position: sticky;top: 50px;z-index:1001;margin:auto"
	}];
	var youdao_exports = __exportAll({ default: () => youdao_default });
	var youdao_default = [{
		enabled: true,
		url: /^https?:\/\/dict\.youdao\.com\/search/i,
		hosts: ["dict.youdao.com"],
		fixedTop: 94,
		insertIntoDoc: {
			keyword: "css;#query",
			target: "css;#container",
			where: "beforeBegin"
		},
		style: `
      margin: auto;
    `
	}];
	var zhihu_exports = __exportAll({ default: () => zhihu_default });
	var zhihu_default = [{
		enabled: true,
		url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
		hosts: ["www.zhihu.com"],
		fixedTop: 52,
		insertIntoDoc: {
			keyword: "css;.Input",
			target: "css;.Search-container",
			where: "beforeBegin"
		},
		style: `
      margin: 10px auto 0px;
      width: 1000px !important;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,
		style_ZhihuChenglinz: `
      margin: 10px auto 0px;
      width: 654px;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,
		stylish: ".TopSearch.Card{margin:30px auto;}"
	}];
	function createRuleMatcher(rules) {
		const exactHosts = new Map();
		const suffixHosts = [];
		const patternHosts = [];
		const fallbackRules = [];
		for (const rule of rules) {
			const hosts = rule.hosts || [];
			const suffixes = rule.hostSuffixes || [];
			for (const host of hosts) {
				const key = host.toLowerCase();
				const list = exactHosts.get(key);
				if (list) list.push(rule);
				else exactHosts.set(key, [rule]);
			}
			for (const suffix of suffixes) suffixHosts.push({
				suffix: suffix.toLowerCase(),
				rule
			});
			if (rule.hostPattern instanceof RegExp) patternHosts.push({
				pattern: rule.hostPattern,
				rule
			});
			if (!hosts.length && !suffixes.length && !(rule.hostPattern instanceof RegExp)) fallbackRules.push(rule);
		}
		suffixHosts.sort((a, b) => b.suffix.length - a.suffix.length);
		return function matchRule(href) {
			let hostname;
			try {
				hostname = new URL(href).hostname.toLowerCase();
			} catch (e) {
				return null;
			}
			const candidates = [];
			const pushAll = (list) => {
				if (list) candidates.push(...list);
			};
			pushAll(exactHosts.get(hostname));
			for (const { suffix, rule } of suffixHosts) if (hostname === suffix || hostname.endsWith(`.${suffix}`)) candidates.push(rule);
			for (const { pattern, rule } of patternHosts) {
				pattern.lastIndex = 0;
				if (pattern.test(hostname)) candidates.push(rule);
			}
			pushAll(fallbackRules);
			const seen = new Set();
			for (const rule of candidates) {
				if (seen.has(rule)) continue;
				seen.add(rule);
				rule.url.lastIndex = 0;
				if (rule.url.test(href)) return rule;
			}
			return null;
		};
	}
	var matchRule = createRuleMatcher(Object.entries(Object.assign({
		"./sites/163.js": _163_exports,
		"./sites/baidu.js": baidu_exports,
		"./sites/bilibili.js": bilibili_exports,
		"./sites/bing.js": bing_exports,
		"./sites/dict.js": dict_exports,
		"./sites/dmhy.org.js": dmhy_org_exports,
		"./sites/douban.js": douban_exports,
		"./sites/google.js": google_exports,
		"./sites/moegirl.js": moegirl_exports,
		"./sites/runoob.js": runoob_exports,
		"./sites/sogou.js": sogou_exports,
		"./sites/stackoverflow.js": stackoverflow_exports,
		"./sites/youdao.js": youdao_exports,
		"./sites/zhihu.js": zhihu_exports
	})).sort(([a], [b]) => a.localeCompare(b)).flatMap(([, mod]) => Array.isArray(mod.default) ? mod.default : [mod.default]).filter(Boolean));
	var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_info = (() => typeof GM_info != "undefined" ? GM_info : void 0)();
	var _GM_openInTab = (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
	var LOCAL_PREFIX = "sej:storage:";
	var TS_SUFFIX = ":updatedAt";
	var PROBE_KEY = "sej:probe:" + Date.now();
	var warned = false;
	function isPresent(value) {
		return value !== void 0 && value !== null;
	}
	function cloneValue(value) {
		try {
			return JSON.parse(JSON.stringify(value));
		} catch (e) {
			return value;
		}
	}
	function gmNamespace() {
		return typeof globalThis !== "undefined" ? globalThis.GM : void 0;
	}
	function hasSyncGM() {
		return typeof GM_getValue === "function" && typeof GM_setValue === "function";
	}
	function hasAsyncGM() {
		const gm = gmNamespace();
		return Boolean(gm && typeof gm["getValue"] === "function" && typeof gm["setValue"] === "function");
	}
	function readLocal(key) {
		try {
			const raw = localStorage.getItem(LOCAL_PREFIX + key);
			return raw === null ? void 0 : JSON.parse(raw);
		} catch (e) {
			return;
		}
	}
	function writeLocal(key, value) {
		try {
			localStorage.setItem(LOCAL_PREFIX + key, JSON.stringify(value));
			return true;
		} catch (e) {
			console.warn("[SEJ] localStorage 写入失败，回退内存存储", e);
			return false;
		}
	}
	function warnLocalFallback() {
		if (warned) return;
		warned = true;
		console.warn("[SEJ] 未检测到可用的脚本管理器存储（GM_getValue/GM.setValue），已改用 localStorage：配置仅在当前站点生效，跳转到其他网站会回到默认设置。");
	}
	async function probeSyncGM() {
		if (!hasSyncGM()) return false;
		try {
			const token = String(Math.random());
			GM_setValue(PROBE_KEY, token);
			return GM_getValue(PROBE_KEY) === token;
		} catch (e) {
			return false;
		} finally {
			try {
				if (typeof GM_deleteValue === "function") GM_deleteValue(PROBE_KEY);
			} catch (e) {}
		}
	}
	async function probeAsyncGM() {
		if (!hasAsyncGM()) return false;
		const gm = gmNamespace();
		try {
			const token = String(Math.random());
			await gm["setValue"](PROBE_KEY, token);
			return await gm["getValue"](PROBE_KEY) === token;
		} catch (e) {
			return false;
		} finally {
			try {
				await gm["deleteValue"]?.(PROBE_KEY);
			} catch (e) {}
		}
	}
	async function probeBackend() {
		if (await probeSyncGM()) return "gm-sync";
		if (await probeAsyncGM()) return "gm-async";
		warnLocalFallback();
		return "local";
	}
	var memoryFallback = new Map();
	var asyncCache = new Map();
	var asyncLoaded = new Set();
	var lastKnown = new Map();
	var lastKnownStamp = new Map();
	var backend = "local";
	var readyPromise = null;
	function remember(key, value, cloned = false) {
		if (isPresent(value)) lastKnown.set(key, cloned ? value : cloneValue(value));
	}
	function isSameValue(a, b) {
		try {
			return deepEqual(a, b);
		} catch (e) {
			return false;
		}
	}
	function deepEqual(a, b) {
		if (a === b) return true;
		if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
		const aIsArray = Array.isArray(a);
		if (aIsArray !== Array.isArray(b)) return false;
		if (aIsArray) {
			if (a.length !== b.length) return false;
			for (let i = 0; i < a.length; i++) if (!deepEqual(a[i], b[i])) return false;
			return true;
		}
		const keys = Object.keys(a);
		if (keys.length !== Object.keys(b).length) return false;
		for (const key of keys) {
			if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
			if (!deepEqual(a[key], b[key])) return false;
		}
		return true;
	}
	async function preloadAsync(keys) {
		const gm = gmNamespace();
		await Promise.all(keys.map(async (key) => {
			try {
				const value = await gm["getValue"](key);
				asyncLoaded.add(key);
				if (isPresent(value)) {
					asyncCache.set(key, value);
					remember(key, value);
					return;
				}
				const local = readLocal(key);
				if (isPresent(local)) {
					asyncCache.set(key, local);
					remember(key, local);
					await gm["setValue"](key, cloneValue(local));
				}
			} catch (e) {
				console.warn("[SEJ] 读取 GM 存储失败", key, e);
			}
		}));
	}
	function initStorage(keys = []) {
		if (!readyPromise) readyPromise = (async () => {
			backend = await probeBackend();
			if (backend === "gm-async") await preloadAsync(keys);
			if (backend === "gm-sync") for (const key of keys) try {
				const value = _GM_getValue(key);
				if (isPresent(value)) remember(key, value);
			} catch (e) {
				console.warn("[SEJ] 读取 GM 存储失败", key, e);
			}
			console.info(`[SEJ] 设置存储后端：${backend}`);
			return backend;
		})();
		return readyPromise;
	}
	function getValue(key, defaultValue) {
		if (backend === "gm-sync") try {
			const value = _GM_getValue(key);
			if (isPresent(value)) {
				const plain = cloneValue(value);
				remember(key, plain, true);
				return plain;
			}
			return defaultValue;
		} catch (e) {
			lastKnown.delete(key);
			console.warn("[SEJ] GM_getValue 失败，使用默认值", e);
			return defaultValue;
		}
		if (backend === "gm-async") {
			if (asyncCache.has(key)) return cloneValue(asyncCache.get(key));
			if (asyncLoaded.has(key)) return defaultValue;
		}
		if (backend === "local") {
			const local = readLocal(key);
			if (isPresent(local)) return local;
			if (memoryFallback.has(key)) return cloneValue(memoryFallback.get(key));
		}
		return defaultValue;
	}
	function setValue(key, value) {
		const updatedAt = Date.now();
		const plain = cloneValue(value);
		let stored = "memory";
		if (backend === "gm-sync") try {
			_GM_setValue(key, plain);
			_GM_setValue(key + TS_SUFFIX, updatedAt);
			stored = "gm";
		} catch (e) {
			console.warn("[SEJ] GM_setValue 失败，尝试 localStorage", e);
		}
		else if (backend === "gm-async") {
			asyncCache.set(key, plain);
			asyncLoaded.add(key);
			const gm = gmNamespace();
			try {
				Promise.resolve(gm["setValue"](key, plain)).catch((e) => {
					console.warn("[SEJ] GM.setValue 失败，退回 localStorage", e);
					writeLocal(key, plain);
					writeLocal(key + TS_SUFFIX, updatedAt);
				});
				Promise.resolve(gm["setValue"](key + TS_SUFFIX, updatedAt)).catch(() => {});
				stored = "gm";
			} catch (e) {
				console.warn("[SEJ] GM.setValue 失败", e);
			}
		}
		if (stored === "gm") lastKnownStamp.set(key, updatedAt);
		remember(key, plain, true);
		if (backend === "local" || stored === "memory") {
			if (writeLocal(key, plain)) {
				writeLocal(key + TS_SUFFIX, updatedAt);
				if (stored === "memory") stored = "local";
			} else if (stored === "memory") memoryFallback.set(key, plain);
		}
		return stored;
	}
	function watchValue(key, callback) {
		const cleanups = [];
		const gm = gmNamespace();
		const handleRemote = (newValue) => {
			if (!isPresent(newValue)) return;
			const plain = cloneValue(newValue);
			asyncCache.set(key, plain);
			asyncLoaded.add(key);
			remember(key, plain, true);
			lastKnownStamp.delete(key);
			callback(plain);
		};
		const addListener = typeof GM_addValueChangeListener === "function" ? GM_addValueChangeListener : gm && typeof gm["addValueChangeListener"] === "function" ? gm["addValueChangeListener"].bind(gm) : null;
		if (addListener) try {
			const result = addListener(key, (name, oldValue, newValue, remote) => {
				if (!remote) return;
				handleRemote(newValue);
			});
			Promise.resolve(result).then((listenerId) => {
				if (listenerId === void 0 || listenerId === null) return;
				const remove = typeof GM_removeValueChangeListener === "function" ? GM_removeValueChangeListener : gm && typeof gm["removeValueChangeListener"] === "function" ? gm["removeValueChangeListener"].bind(gm) : null;
				if (!remove) return;
				cleanups.push(() => {
					try {
						remove(listenerId);
					} catch (e) {}
				});
			}).catch(() => {});
		} catch (e) {
			console.warn("[SEJ] GM 变更监听注册失败", e);
		}
		const localKey = LOCAL_PREFIX + key;
		const onStorage = (event) => {
			if (backend !== "local") return;
			if (event.key !== localKey || event.newValue === null) return;
			try {
				callback(JSON.parse(event.newValue));
			} catch (e) {}
		};
		window.addEventListener("storage", onStorage);
		cleanups.push(() => window.removeEventListener("storage", onStorage));
		return () => {
			while (cleanups.length) cleanups.pop()();
		};
	}
	async function pullLatest(key) {
		const gm = gmNamespace();
		try {
			let value;
			let stamp;
			if (backend === "gm-async") {
				stamp = await gm["getValue"](key + TS_SUFFIX);
				if (isPresent(stamp) && lastKnownStamp.get(key) === stamp) return null;
				value = await gm["getValue"](key);
				asyncLoaded.add(key);
			} else if (backend === "gm-sync") {
				if (typeof _GM_getValue === "function") stamp = _GM_getValue(key + TS_SUFFIX);
				if (isPresent(stamp) && lastKnownStamp.get(key) === stamp) return null;
				value = _GM_getValue(key);
			} else return null;
			if (!isPresent(value)) return null;
			if (isPresent(stamp)) lastKnownStamp.set(key, stamp);
			const current = lastKnown.get(key);
			if (isPresent(current) && isSameValue(value, current)) return null;
			const plain = cloneValue(value);
			lastKnown.set(key, plain);
			asyncCache.set(key, plain);
			asyncLoaded.add(key);
			return plain;
		} catch (e) {
			console.warn("[SEJ] 拉取最新设置失败", e);
		}
		return null;
	}
	var engines_default = {
		version: "2026-10-24 08:47:49",
		fixedTop: false,
		fixedTopUpward: false,
		HideTheSameLink: true,
		selectSearch: true,
		selectSearchInInput: false,
		center: false,
		engineCategories: [
			[
				"功能",
				"actions",
				false
			],
			[
				"搜索",
				"web",
				true
			],
			[
				"AI",
				"ai",
				true
			],
			[
				"影视",
				"video",
				true
			],
			[
				"书籍",
				"books",
				true
			],
			[
				"工具",
				"tools",
				true
			],
			[
				"资源",
				"download",
				true
			],
			[
				"资源+",
				"download+",
				false
			],
			[
				"国产AI",
				"ai+",
				false
			]
		],
		engineList: JSON.parse("{\"web\":[{\"name\":\"Google\",\"url\":\"https://www.google.com/search?q=%s\",\"favicon\":\"https://www.google.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRmADAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSMcAAAABgBzbtqroDHFy+DpEgtGEnACcdNy7c6C+DHG39+/JICImAIqJUnfin8/epFtMQNAeHB6K+54ZJNK8PgJe6mEl6/8huDYUsu5D1En/sNyHsGN8if4/xNfhj+aDWANgXxkXAxg8qF0kD5xdvPQg57us1oQ19FnOmXXieSxnwhp2Wa0iK5fYc3Yx9DhtwLwwzjqAOqMMAJGN3DL0AcOR2mr4nnZktin8NtYSSw2q4dolyLkcQkCju1PZtXUIxvOtoXM6OcNWLgZFAFZQOCByAgAAMA8AnQEqIAAgAD4xFIhCoiEhGAwGACADBLYATplCQWfIPwl/FXpVdpzErqk/M/bNvFv9J3QH7Afrd2APNm/wHWAegB5ZP63fBD+2/7AezJngsUN8B2K3AGLWf6nlZ+bPYF/WDfFv2MTnS9lnHcMmol0tvH9UbqnJH+gsvv5DRRJNwAD+//kpGtbWHrB48pshMsH5gS9a8WOn7hs8RiKXnaqK43DQR58c+f9ZcWdQa5kpTqB/zIf1P7Ss/y42X1opLu6idfpLpfoE+2Mwmm3VY79nwrugs4/Q6FP4bTumE+Jdh3nznvV/c3SarOHJxQ7NNyIl3RsDmZ3WM5DH3nTdfA1WJMJR9X8XnZg40CuJxX/12GxEIOoYYy2hhH9VM1q14YXYmRP78tvs3x+dHrY874KR+BFbeilNWOQ49pYSkw/6qX//0YGP6HvoWJaeJS+Ibyd9+4ra8cX+zeDn6X03if/Ir5WGvxudsQo8pbE1jKq0FfzE8DMFzt0df/w7yUfeEwRBuQUt1nPJysblRNdzf4Pw5HTs9XjajiF2k/pjudBVDNxiKhf10TWe6tCPKL1JjfUDMrUL/ecypPJ4OvjXnuREBPHjwmAJwNfAuFPBQA6VMGzMDmFPVQpraiHxR5lgLidCmXG3v+Ez5LS4twa775m+7XimETVBCU/7//2pdL8AJ4/W6vf97kPdoD45roTltGo8bT+h70W/eo5zNy2CZLJOCL6vGJ3OazAFwi4MIOuXAzQhMe57j26/8xYoyKP1j8N+LzVMKv2G5zLRr8Le//+b823DoeaXOYd4Wx/jN/+9T8A6G/bo8ysL8fnHXUAAAAA=\"},{\"name\":\"Bing\",\"url\":\"https://www.bing.com/search?q=%s\",\"favicon\":\"https://www.bing.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRo4CAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSL8AAAABgGJt27LoXcJ3/hVgC3CyQ+WQiLAJTSRrLIXkjLSpPtnd0fiMfN/Li+aImABaUev8O7+cOIBz/7KA6tJQXdr30rALuA+zS/oCrlJLaQHAYWgJqX/AoRKjLw2+3GJNHY6VlM2AihQdGq7EVFMHtxSRyrb/heSoPML7MpKXAPAi5upCO4fipBmNEYwt4uYMyTuY5yEWvWk+wN0jfmP8PH+cgTnK0ILWCPwjFy0cHHFGZZIM3pm6Fsla5ct/3SStNgBWUDggqAEAABALAJ0BKiAAIAA+MRaIQyIhIRQFVCADBLYATplCQWfQPxV5M/VzmAygTgr+9/ZRkAPMB+wH6zey7/SesA/UDgAP1a9Jj9nfgP/Yj9hvaApUtSsd1KfokgirJLOS2D9mZhAA/vHdxmo11qFWedw8Jr8wqIlmzCnyf+n05SnYaumGtcapII/+Uhf6TKgnrFpef/m4Ipm38ePbs+2azZixVBZP4+TiGAV4/1mML//0FW4E0reWhN29bz/kAncjub92w2g5+rUS9IVYL/8dvmJikQD6p2+Rxf5htZa1wGzEj/vANqsQbQQ6VSVwTt063WPvC5Zpftw+c0ELpcOYeyOIaKn6jWVZZi4ghl6BTH5DCe9LB/xkUnw6B5u/PKnjFNf//6jr+2rYd+LXu5KunOtp4et+I20AOrn7+h+asxWej9Ko6s1gMPJmmbFUu9EhYQ27hS/1CCOZ9Hs3I4cfMU2cSA5RAKiOlzHPUtAY7CwyhgdtPW9l8LEBnVVyKu4OySQAB3/X5NsfSgQBXSxxu/dZyMYzxhn/7UMfP3u2BVZ3VCoCHvypJkmgAAA=\"}],\"ai\":[{\"name\":\"DeepSeek\",\"url\":\"https://chat.deepseek.com/?q=%s&autosend=1\",\"favicon\":\"https://www.deepseek.com/favicon.ico\"},{\"name\":\"ChatGPT\",\"url\":\"https://chatgpt.com/?q=%s \",\"favicon\":\"https://chatgpt.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRswFAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSN0AAAABcFPbthM9ggpQAAJii50/Qr4CQAMLEaAiQxsq+gyT/5121ooINW7bRlJ6bF3tPoGeVQ2W5NO6f+065TEzVXqragXtvAtz7iLv3UXnwy7YkWsvsbJtF+6W2S/wix1i6T9hFzvI4vGqpzvMVL+Q+Q6UK0TegKS3SQl3qIFitlhak81YZhbvYJMcTT6hmVY06/737wpf+NyEz20JmhifW/G5WQmwhArZPZLBI1KwvUWG96bf6G1EfglaPj1rY3qrRa/U+Cj8Ia6/6+1e1Ant7YH1SfM3WSzq3yC5GS9uBABWUDggyAQAAPAYAJ0BKkAAQAA+MRaHQyIhCgNUEAGCWkAFteqn+Bfe87f+un7h+wF+3dFbmT+tf0n8lfy99jPwB9OnoE/xX+jfkX+UPsA2gL1K+Tf5b8pf7NrF/+Q/KrmvKAH5V/3nsbftn/C+8D2WfMv+4/t343/YF/Jf6D/lf71+6v+B///1geyr0Xv2db+ECbkdam7XynrZJBy58SW7tMq36va2w9xwIDM5GuffhRQVpKmorm/6iiMV7pMVQ0GqDB1973/No7YcacdasKGukTB1Y5UXMgAA/v89hf/wNVjb75Vil57ZBun60CrHPnzF5Rha9gQuI0/H2sPCEBdNE+/zquvPZOxBqOdyNbu57n2QVER4hLk8Krcsp8HY6+HKGZGl7wx4S+oY9iHySQQL4Rr//7ezSFcjqYBZZZR34meeHTwtqjwOz/j7tH2u6KVZavyaOsYHZVxm5PQNGGev/+kxm9QJ0ocPycfjZMLf7VUv2naMtiLqsVWZ1PLI8sl5XNTvDnh4kCDJ///6yeP4xkM0xGbCHgNQpbFx07oh03M8P02vEMQm0SY2ycTXH1zl6Q6hGhWSw8C9TH1vGD4tJYmyHxGvySHdKf6Bn/8SL0YzlymlEwXYWK9BI8ewDU/JBUwRCPXaOKCG8pq0KzejeOMcSs8+RXJUVP/q9Kdh8CUM9Awtltfjg6zBPGGrAEnn+Gooy23uBAar54Am/f2OOw9nOBVCz4Gs/MsocaBDV86dj+KqHYO2bv8T7tWf/UIAn27RdNvlt4J24lg6m3l6LYPxd1qk3s16XZxf0Yu+M9oG3sINqfwAM+MVej3OXK9U/g4BaHxnNl4j/6MEyHWUjDgZz6OyS6mtZGcawn5grn7yGVgZN/iwq/oSQby2S16XP/jtJe/EXkl+zhZI6W1DrG4/zwqP+f0PzvC9Jm6R81JmEaDGSfcmJc6G1r4NAE/np2CHOENzEUL9fj3NqpnVdt/6LrFlCcIRpK8HQWERarvgQdR6gPqGHWPY8FbDJw7HBVgkbmhgZz2XFSJku7tE1Lh1PlYivGPuZPf9uNSzQQoZHQ/r+ZrBhV1z5DIj/Wi3qF+9ICniwxsIFtD1p0ncMAVl/g4wnPLRJm0tyqjYZOatzHjStu6IWSZ/X6aS4YpEyXoGxxkCH4YN/Lj3z2uOm71LddlZ9Le1tARzmx6od9outMQvcAhX+ioUDyft1wZDARHCgx9iJGmI4ECmLfR02FakR6On1HQ8nlD7YD0tzb2tG40Tuiyo648OZmtpmfHRV70Axr4ZUQcJbqfIckE7+1wAA4xnzESb9NZkIGfyNf/IXQJ7nc8uUsCoZSJYIq6vTm6/duhTl2WYlXNhTddZ7Ha3Iqjl7PaKWxXWTXV/IemhFiUq/uL6LAbpVOwX2/o14+z/pwxdiDw/b+/6uT1jbVSGTwrrkIn7cNQW7hYFH0XGGNUG22kZ2Px1JxVj/jjXvHfD4Q+LmlWHEoyZGzY55trJLGDU/L1VjsAzvEeZ4glLUNFkPn6PfPuHdEkE6Sby6LCxvMf5lHGKm1u/FrM57fWAZj/1sKv4h2qrtHwMAxAkvqtP13PiLYC0lr0BrPTR1fX71sH+Scz+c6fxxXRLhlKREcHftoUbXlEBQAAAAA==\"},{\"name\":\"Gemini\",\"url\":\"https://gemini.google.com/app?q=%s\",\"favicon\":\"https://a.favicon.im/gemini.google.com\",\"faviconData\":\"data:image/webp;base64,UklGRmoHAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSI8CAAABkGNte+I6v6Sxc7swb4CZOSUzM2yEYSO4Ad8yzMzMWDOM9Os7x5LHI/0nfUQ4cBtJkRpU27UM13BPoFQ1hmRVtSNhnz9f1DTNZp5NWk4KOgYco0IwVle9v6qUYDzKAW4Uabl4H6zFPrFQUfM1mPG6qZQUbkEIsFkKtL4Uyy0js8LQYjAQbI0IKF3cgovEPxSBgnYGj2E7GYGNBn1ijoX562Ct8+OJgJ1wmorsvhkWqLItmc3QhO/MVeL558Ss22ga+LTNVSrj6UDS+Vw1zsZcNXW2oXQ2Ny2U6KoWvSaTGWq28A81tESrSSbLiYacDcv17OyQ9PMoQ9MewaKmWjyaTEYlsrT9Lxxqq8O3LZRCGkUjTyJ4iuHESCJT9zhEO96BPZLUM97uVNT9MEqHh7H6PGCRrBa4vDI8Yl1BmMD0bDsHWO5+nzVJnN3YExGdtbUYc+QFYK3rKt7XI9kDL/ePbi+puLYeul0CzIBn9jkkvsby2uHZbcbQIo/oOJ45eC5lC8AtIFMpnm10Cp9XQnD07j+AXYd4X2npQccmo468BLzzNZ528iaVB9p6HmDfPUg9UJfvVq26AljflmzfbY3fjdr5BpZz/W5qZiwaehzgHL/bpLyx9y9sct5IzlsPUGbJWynkgDNpeTNX3i7reW+TTKa6UbRga9WNImPhaZyBE6xbRJr6PgEL1k0iQ1PL6hTiuWyfKHPfsL2actgm0HicgqvyU1Tk75uGfKnqm75EfVN22F3Vt+2iQqRvvA0X+61CK5G+dRmikLGYjFDffBku4MVoIxFYDw64VghJqeYrMONVH1Jic8sB2bmFNI0O9GjSgnPbNe+vKfX/zo2aZjmeRVp0bl6wQHzwTnfx/w0IAFZQOCC0BAAAsBkAnQEqQABAAD4xEodCoiEM/s4AEAGCWwAxnNyA3eo/jH+MHylVf+Wfcv90v8Bl1PGf+d6T3mAfpZ/seod5m/2R9arpAP2N6wr0AP2x9MH/Z+4j+1H7s/AB/HP7d/97y//AfTcyx355xAd4Dhb5jn8n/13py5qnpz9b/gB/i381/4X9z9ozqJv1ZahS/UYYUUf7sieLnASD+p0fyGDONQFyapbnUHQX9ldro4qzt1o481kZzG/y6ylRydfQRtJWxRE5K9iXY/3Fd5tIlI0jWWxV+1Y7gAD+/4+85nCr8bYnCHKguNKQOyeAMWEH/1gJexUW7uf//RuvoGPMU5DaGX9PrOIhT6eeA52hdscEIt8b+j3z17i/ua58yqk15EJC+Frc8v6dlYDUh+iSbT6tdCypAbCHaXPTpNtsxarRoNLHxk5VZGr+gVtJ6+F1ULDP4fc5ukZCdZm+dMVVoYzj7kMvfqynCru6HMBa5Q0MsDvgoVK6dvJ9ud7+maFqRsuW7SG/EMsh///ZGa5Z0VZ//sVooFpLWALDpoc7E/tfSxZq28KmVtX6bf5S8thkk2BL084nOvzvbel3ZFfDSB4YwklLLoztQGdw5NSXW6FK9q4e4fKwq92PgeIQdAsnoOwpZQjvx0XJoFaO9Z9N+8kEP3lsllHeBGc1qahiA80IdZHrN6VIVSZ5NUCWgXcm79gPGWygY6ouqz6QhxQ4zH/2SKhYSAIiC/M7Dof4SmSXBIF3ImfoAczrmNXofzztfchBJHWhrAC6oRoV9BbfesLPO8Dso9bhdsL1KcM6LghsNaUJhdm61dClfQ1OF5XIc52zWCChPq+Y6avfum53P5WpOUBpSjHcQV7cV4t7FVPhVnWOC/Ri/XldGzOUu7q8immUPs7CkSM3jem4P8pz1PNdH6ghdZ9kDNTLxil/ZZoGHCht09Fb43QV3QjOo1o66ycnRPauF8UjeU3OT3sx+0DfEYD4vDC77+UBXHqb3HTRvq0bRUwuKT4/aNCPgfkblao0+TAeRoGeXlGwyt6LIoeUzBDmoY/yQWBBKWUGbbz/C1I7t8JoeWHmOWcNKNO9pKvS5LTFBknZ0Z/JLBrRdFA9NQhLwkBZWv/udLXUV4j18yIwXFpx58n8u/ZGcND5vbv6x2J4IYRXxwyKKi3ttDRg87gxSzR4XOqwO/57bDon//Dzm512bf2tDFR5A8FJRG7WUWJlDL5bjmo5QtSv4xJkjiF4lVdRwzclrYkB9ytNpWe9kAOdXnPaBJtZD3P/p3bWu+r1DZgq20cO/+d2muNayLc4YSY5Bn7Q8nboc4j9NbV01uelgC4q4rtRgl7p3IXHT//oPS4qw9Xif0zBXf56yahm5khWXJ6btcW7EzSWe/9VFBqyxG2JgEbqqOZkB4S9sEv+Z+F+vqzf6ngLzBzaGWb1OaW0TOtLxfIaPyUvZIt51qXzG4H6wbD9cQsYsBd+F4AJbD5fwJP3c+Zhrcjlw/6E2+8X9+UF0LOZb6JEcXFeMf+gRXi/7bFl8f7KGkxROiCkF6ZkSstv+5os70ZFTvzfCxz+homH66k9Hcv7pwZ7SgaRVON+P1+R//zMFX6zcAAAAA==\"},{\"name\":\"Grok\",\"url\":\"https://grok.com/?q=%s\",\"favicon\":\"https://a.favicon.im/grok.com\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zMDRfMTExKSI+Cjxmb3JlaWduT2JqZWN0IHg9Ii0yNCIgeT0iLTIyIiB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImJhY2tkcm9wLWZpbHRlcjpibHVyKDE2cHgpO2NsaXAtcGF0aDp1cmwoI2JnYmx1cl8xXzMwNF8xMTFfY2xpcF9wYXRoKTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlIj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8zMDRfMTExKSIgZGF0YS1maWdtYS1iZy1ibHVyLXJhZGl1cz0iMzIiPgo8cGF0aCBkPSJNMCAyNTZDMCAxNjYuMzkyIDAgMTIxLjU4NyAxNy40MzkgODcuMzYxNUMzMi43Nzg3IDU3LjI1NTYgNTcuMjU1NiAzMi43Nzg3IDg3LjM2MTUgMTcuNDM5QzEyMS41ODcgMCAxNjYuMzkyIDAgMjU2IDBDMzQ1LjYwOCAwIDM5MC40MTMgMCA0MjQuNjM4IDE3LjQzOUM0NTQuNzQ0IDMyLjc3ODcgNDc5LjIyMSA1Ny4yNTU2IDQ5NC41NjEgODcuMzYxNUM1MTIgMTIxLjU4NyA1MTIgMTY2LjM5MiA1MTIgMjU2QzUxMiAzNDUuNjA4IDUxMiAzOTAuNDEzIDQ5NC41NjEgNDI0LjYzOEM0NzkuMjIxIDQ1NC43NDQgNDU0Ljc0NCA0NzkuMjIxIDQyNC42MzggNDk0LjU2MUMzOTAuNDEzIDUxMiAzNDUuNjA4IDUxMiAyNTYgNTEyQzE2Ni4zOTIgNTEyIDEyMS41ODcgNTEyIDg3LjM2MTUgNDk0LjU2MUM1Ny4yNTU2IDQ3OS4yMjEgMzIuNzc4NyA0NTQuNzQ0IDE3LjQzOSA0MjQuNjM4QzAgMzkwLjQxMyAwIDM0NS42MDggMCAyNTZaIiBmaWxsPSIjMDUwNTA1Ii8+CjxwYXRoIGQ9Ik0yNTYgMi41QzMwMC44NDUgMi41IDMzNC4zMjkgMi41MDIyOCAzNjAuODg0IDQuNjcxODhDMzg3LjQxIDYuODM5MTEgNDA2LjgwMiAxMS4xNTYgNDIzLjUwNCAxOS42NjZDNDUzLjEzOSAzNC43NjYxIDQ3Ny4yMzQgNTguODYwNyA0OTIuMzM0IDg4LjQ5NjFDNTAwLjg0NCAxMDUuMTk4IDUwNS4xNjEgMTI0LjU5IDUwNy4zMjggMTUxLjExNkM1MDkuNDk4IDE3Ny42NzEgNTA5LjUgMjExLjE1NSA1MDkuNSAyNTZDNTA5LjUgMzAwLjg0NSA1MDkuNDk4IDMzNC4zMjkgNTA3LjMyOCAzNjAuODg0QzUwNS4xNjEgMzg3LjQxIDUwMC44NDQgNDA2LjgwMiA0OTIuMzM0IDQyMy41MDRDNDc3LjIzNCA0NTMuMTM5IDQ1My4xMzkgNDc3LjIzNCA0MjMuNTA0IDQ5Mi4zMzRDNDA2LjgwMiA1MDAuODQ0IDM4Ny40MSA1MDUuMTYxIDM2MC44ODQgNTA3LjMyOEMzMzQuMzI5IDUwOS40OTggMzAwLjg0NSA1MDkuNSAyNTYgNTA5LjVDMjExLjE1NSA1MDkuNSAxNzcuNjcxIDUwOS40OTggMTUxLjExNiA1MDcuMzI4QzEyNC41OSA1MDUuMTYxIDEwNS4xOTggNTAwLjg0NCA4OC40OTYxIDQ5Mi4zMzRDNTguODYwNyA0NzcuMjM0IDM0Ljc2NjEgNDUzLjEzOSAxOS42NjYgNDIzLjUwNEMxMS4xNTYgNDA2LjgwMiA2LjgzOTExIDM4Ny40MSA0LjY3MTg4IDM2MC44ODRDMi41MDIyOCAzMzQuMzI5IDIuNSAzMDAuODQ1IDIuNSAyNTZDMi41IDIxMS4xNTUgMi41MDIyOCAxNzcuNjcxIDQuNjcxODggMTUxLjExNkM2LjgzOTExIDEyNC41OSAxMS4xNTYgMTA1LjE5OCAxOS42NjYgODguNDk2MUMzNC43NjYxIDU4Ljg2MDcgNTguODYwNyAzNC43NjYxIDg4LjQ5NjEgMTkuNjY2QzEwNS4xOTggMTEuMTU2IDEyNC41OSA2LjgzOTExIDE1MS4xMTYgNC42NzE4OEMxNzcuNjcxIDIuNTAyMjggMjExLjE1NSAyLjUgMjU2IDIuNVoiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjUiLz4KPC9nPgo8L2c+CjxtYXNrIGlkPSJwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjEwLjQ4NCAzMTIuNzU5TDM0My40NjUgMjEwLjM4M0MzNDkuOTg0IDIwNS4zNjQgMzU5LjMwMiAyMDcuMzIyIDM2Mi40MDggMjE1LjExN0MzNzguNzU4IDI1Ni4yMzEgMzcxLjQ1NCAzMDUuNjQgMzM4LjkyNSAzMzkuNTYzQzMwNi4zOTcgMzczLjQ4NyAyNjEuMTM3IDM4MC45MjcgMjE5Ljc2OCAzNjMuOTgzTDE3NC41NzcgMzg1LjgwM0MyMzkuMzk0IDQzMi4wMDggMzE4LjEwNCA0MjAuNTgxIDM2Ny4yODkgMzY5LjI1MUM0MDYuMzAzIDMyOC41NjQgNDE4LjM4NiAyNzMuMTA0IDQwNy4wODggMjIzLjA5MUw0MDcuMTkgMjIzLjE5OEMzOTAuODA3IDE0OS43MjYgNDExLjIxOCAxMjAuMzU5IDQ1My4wMyA2MC4zMDcyQzQ1NC4wMiA1OC44ODMzIDQ1NS4wMSA1Ny40NTk1IDQ1NiA1Nkw0MDAuOTc4IDExMy4zODJWMTEzLjIwNEwyMTAuNDUgMzEyLjc5NCIvPgo8cGF0aCBkPSJNMTgzLjA0MiAzMzcuNjQxQzEzNi41MTkgMjkxLjI5NCAxNDQuNTQgMjE5LjU2NyAxODQuMjM2IDE3OC4yMDNDMjEzLjU5IDE0Ny41OSAyNjEuNjgzIDEzNS4wOTYgMzAzLjY2NiAxNTMuNDY0TDM0OC43NTUgMTMxLjc1QzM0MC42MzIgMTI1LjYyNyAzMzAuMjIxIDExOS4wNDIgMzE4LjI3NSAxMTQuNDE0QzI2NC4yNzcgOTEuMjQwNyAxOTkuNjMgMTAyLjc3NCAxNTUuNzM1IDE0OC41MTZDMTEzLjUxMyAxOTIuNTQ5IDEwMC4yMzYgMjYwLjI1NCAxMjMuMDM2IDMxOC4wMjdDMTQwLjA2OSAzNjEuMjA2IDExMi4xNDggMzkxLjc0OCA4NC4wMjI5IDQyMi41NzVDNzQuMDU2MSA0MzMuNTAzIDY0LjA1NTMgNDQ0LjQzMSA1NiA0NTZMMTgzLjAwNyAzMzcuNjc3Ii8+CjwvbWFzaz4KPHBhdGggZD0iTTIxMC40ODQgMzEyLjc1OUwzNDMuNDY1IDIxMC4zODNDMzQ5Ljk4NCAyMDUuMzY0IDM1OS4zMDIgMjA3LjMyMiAzNjIuNDA4IDIxNS4xMTdDMzc4Ljc1OCAyNTYuMjMxIDM3MS40NTQgMzA1LjY0IDMzOC45MjUgMzM5LjU2M0MzMDYuMzk3IDM3My40ODcgMjYxLjEzNyAzODAuOTI3IDIxOS43NjggMzYzLjk4M0wxNzQuNTc3IDM4NS44MDNDMjM5LjM5NCA0MzIuMDA4IDMxOC4xMDQgNDIwLjU4MSAzNjcuMjg5IDM2OS4yNTFDNDA2LjMwMyAzMjguNTY0IDQxOC4zODYgMjczLjEwNCA0MDcuMDg4IDIyMy4wOTFMNDA3LjE5IDIyMy4xOThDMzkwLjgwNyAxNDkuNzI2IDQxMS4yMTggMTIwLjM1OSA0NTMuMDMgNjAuMzA3MkM0NTQuMDIgNTguODgzMyA0NTUuMDEgNTcuNDU5NSA0NTYgNTZMNDAwLjk3OCAxMTMuMzgyVjExMy4yMDRMMjEwLjQ1IDMxMi43OTQiIGZpbGw9IiNGQ0ZDRkMiLz4KPHBhdGggZD0iTTE4My4wNDIgMzM3LjY0MUMxMzYuNTE5IDI5MS4yOTQgMTQ0LjU0IDIxOS41NjcgMTg0LjIzNiAxNzguMjAzQzIxMy41OSAxNDcuNTkgMjYxLjY4MyAxMzUuMDk2IDMwMy42NjYgMTUzLjQ2NEwzNDguNzU1IDEzMS43NUMzNDAuNjMyIDEyNS42MjcgMzMwLjIyMSAxMTkuMDQyIDMxOC4yNzUgMTE0LjQxNEMyNjQuMjc3IDkxLjI0MDcgMTk5LjYzIDEwMi43NzQgMTU1LjczNSAxNDguNTE2QzExMy41MTMgMTkyLjU0OSAxMDAuMjM2IDI2MC4yNTQgMTIzLjAzNiAzMTguMDI3QzE0MC4wNjkgMzYxLjIwNiAxMTIuMTQ4IDM5MS43NDggODQuMDIyOSA0MjIuNTc1Qzc0LjA1NjEgNDMzLjUwMyA2NC4wNTUzIDQ0NC40MzEgNTYgNDU2TDE4My4wMDcgMzM3LjY3NyIgZmlsbD0iI0ZDRkNGQyIvPgo8cGF0aCBkPSJNMzQzLjQ2NSAyMTAuMzgzTDM0NC4zOCAyMTEuNTcxTDM0NC4zOCAyMTEuNTcxTDM0My40NjUgMjEwLjM4M1pNMzYyLjQwOCAyMTUuMTE3TDM2My44MDIgMjE0LjU2M0wzNjMuODAyIDIxNC41NjJMMzYyLjQwOCAyMTUuMTE3Wk0yMTkuNzY4IDM2My45ODNMMjIwLjMzNyAzNjIuNTk0TDIxOS43MTggMzYyLjM0MUwyMTkuMTE2IDM2Mi42MzJMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjkyNCAzODQuNDUzTDE3MS42NDMgMzg1LjU1NEwxNzMuNzA2IDM4Ny4wMjVMMTc0LjU3NyAzODUuODAzWk0zNjcuMjg5IDM2OS4yNTFMMzY2LjIwNyAzNjguMjEzTDM2Ni4yMDYgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDguMTcxIDIyMi4wNTNMNDA0LjQzNiAyMTguMTU3TDQwNS42MjUgMjIzLjQyMUw0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwNi4xMDggMjI0LjIzNkw0MDkuODIzIDIyOC4xMTFMNDA4LjY1NCAyMjIuODcxTDQwNy4xOSAyMjMuMTk4Wk00NTMuMDMgNjAuMzA3Mkw0NTQuMjYyIDYxLjE2NDNMNDU0LjI2MiA2MS4xNjM0TDQ1My4wMyA2MC4zMDcyWk00NTYgNTZMNDU3LjI0MSA1Ni44NDJMNDU0LjkxNyA1NC45NjE4TDQ1NiA1NlpNNDAwLjk3OCAxMTMuMzgySDM5OS40NzhWMTE3LjExM0w0MDIuMDYxIDExNC40Mkw0MDAuOTc4IDExMy4zODJaTTQwMC45NzggMTEzLjIwNEg0MDIuNDc4VjEwOS40NkwzOTkuODkzIDExMi4xNjhMNDAwLjk3OCAxMTMuMjA0Wk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOCAxNzkuMjQyTDE4NS4zMTkgMTc5LjI0MkwxODQuMjM2IDE3OC4yMDNaTTMwMy42NjYgMTUzLjQ2NEwzMDMuMDY1IDE1NC44MzhMMzAzLjY5NiAxNTUuMTE0TDMwNC4zMTcgMTU0LjgxNUwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS40MDYgMTMzLjEwMUwzNTEuNjI0IDEzMi4wMzNMMzQ5LjY1OCAxMzAuNTUyTDM0OC43NTUgMTMxLjc1Wk0zMTguMjc1IDExNC40MTRMMzE3LjY4MyAxMTUuNzkzTDMxNy43MDggMTE1LjgwM0wzMTcuNzMzIDExNS44MTNMMzE4LjI3NSAxMTQuNDE0Wk0xNTUuNzM1IDE0OC41MTZMMTU0LjY1MyAxNDcuNDc3TDE1NC42NTMgMTQ3LjQ3OEwxNTUuNzM1IDE0OC41MTZaTTEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdMMTI0LjQzMiAzMTcuNDc3TDEyMy4wMzYgMzE4LjAyN1pNODQuMDIyOSA0MjIuNTc1TDgyLjkxNDggNDIxLjU2NEw4Mi45MTQ2IDQyMS41NjRMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTQuNzY5IDQ1NS4xNDNMNTcuMDIyNSA0NTcuMDk4TDU2IDQ1NlpNMjEwLjQ4NCAzMTIuNzU5TDIxMS4zOTkgMzEzLjk0OEwzNDQuMzggMjExLjU3MUwzNDMuNDY1IDIxMC4zODNMMzQyLjU1IDIwOS4xOTRMMjA5LjU2OSAzMTEuNTdMMjEwLjQ4NCAzMTIuNzU5Wk0zNDMuNDY1IDIxMC4zODNMMzQ0LjM4IDIxMS41NzFDMzUwLjIwNCAyMDcuMDg3IDM1OC4zMiAyMDguOTA5IDM2MS4wMTUgMjE1LjY3MkwzNjIuNDA4IDIxNS4xMTdMMzYzLjgwMiAyMTQuNTYyQzM2MC4yODUgMjA1LjczNCAzNDkuNzY0IDIwMy42NCAzNDIuNTUgMjA5LjE5NEwzNDMuNDY1IDIxMC4zODNaTTM2Mi40MDggMjE1LjExN0wzNjEuMDE1IDIxNS42NzFDMzc3LjE2MyAyNTYuMjc5IDM2OS45MzYgMzA1LjA1NSAzMzcuODQyIDMzOC41MjVMMzM4LjkyNSAzMzkuNTYzTDM0MC4wMDggMzQwLjYwMUMzNzIuOTcyIDMwNi4yMjQgMzgwLjM1MyAyNTYuMTgzIDM2My44MDIgMjE0LjU2M0wzNjIuNDA4IDIxNS4xMTdaTTMzOC45MjUgMzM5LjU2M0wzMzcuODQyIDMzOC41MjVDMzA1Ljc2OSAzNzEuOTc0IDI2MS4xNzUgMzc5LjMyMSAyMjAuMzM3IDM2Mi41OTRMMjE5Ljc2OCAzNjMuOTgzTDIxOS4yIDM2NS4zNzFDMjYxLjA5OSAzODIuNTMyIDMwNy4wMjQgMzc1IDM0MC4wMDggMzQwLjYwMUwzMzguOTI1IDMzOS41NjNaTTIxOS43NjggMzYzLjk4M0wyMTkuMTE2IDM2Mi42MzJMMTczLjkyNCAzODQuNDUzTDE3NC41NzcgMzg1LjgwM0wxNzUuMjI5IDM4Ny4xNTRMMjIwLjQyIDM2NS4zMzNMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjcwNiAzODcuMDI1QzIzOS4xNSA0MzMuNjc1IDMxOC42ODkgNDIyLjE0IDM2OC4zNzIgMzcwLjI4OUwzNjcuMjg5IDM2OS4yNTFMMzY2LjIwNiAzNjguMjEzQzMxNy41MiA0MTkuMDIzIDIzOS42MzkgNDMwLjM0IDE3NS40NDcgMzg0LjU4MkwxNzQuNTc3IDM4NS44MDNaTTM2Ny4yODkgMzY5LjI1MUwzNjguMzcyIDM3MC4yODlDNDA3Ljc2NCAzMjkuMjA4IDQxOS45NSAyNzMuMjIxIDQwOC41NTEgMjIyLjc2TDQwNy4wODggMjIzLjA5MUw0MDUuNjI1IDIyMy40MjFDNDE2LjgyMiAyNzIuOTg3IDQwNC44NDIgMzI3LjkyIDM2Ni4yMDcgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDYuMDA1IDIyNC4xMjlMNDA2LjEwOCAyMjQuMjM2TDQwNy4xOSAyMjMuMTk4TDQwOC4yNzMgMjIyLjE2TDQwOC4xNzEgMjIyLjA1M0w0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwOC42NTQgMjIyLjg3MUM0MDAuNTA1IDE4Ni4zMjUgNDAxLjUzOCAxNjAuOTEgNDA5LjcwNSAxMzcuMjA5QzQxNy45MDUgMTEzLjQxNCA0MzMuMzE5IDkxLjI0MjEgNDU0LjI2MiA2MS4xNjQzTDQ1My4wMyA2MC4zMDcyTDQ1MS43OTkgNTkuNDUwMUM0MzAuOTI5IDg5LjQyMzkgNDE1LjIzMiAxMTEuOTYxIDQwNi44NjkgMTM2LjIzMUMzOTguNDczIDE2MC41OTQgMzk3LjQ5MiAxODYuNTk5IDQwNS43MjYgMjIzLjUyNEw0MDcuMTkgMjIzLjE5OFpNNDUzLjAzIDYwLjMwNzJMNDU0LjI2MiA2MS4xNjM0QzQ1NS4yNTEgNTkuNzQwNiA0NTYuMjQ2IDU4LjMwOTcgNDU3LjI0MSA1Ni44NDJMNDU2IDU2TDQ1NC43NTkgNTUuMTU4QzQ1My43NzQgNTYuNjA5MiA0NTIuNzg5IDU4LjAyNjEgNDUxLjc5OSA1OS40NTFMNDUzLjAzIDYwLjMwNzJaTTQ1NiA1Nkw0NTQuOTE3IDU0Ljk2MThMMzk5Ljg5NiAxMTIuMzQ0TDQwMC45NzggMTEzLjM4Mkw0MDIuMDYxIDExNC40Mkw0NTcuMDgzIDU3LjAzODJMNDU2IDU2Wk00MDAuOTc4IDExMy4zODJINDAyLjQ3OFYxMTMuMjA0SDQwMC45NzhIMzk5LjQ3OFYxMTMuMzgySDQwMC45NzhaTTE4My4wNDIgMzM3LjY0MUwxODQuMSAzMzYuNTc4QzEzOC4yNTUgMjkwLjkwNyAxNDYuMDg3IDIyMC4xMjEgMTg1LjMxOCAxNzkuMjQyTDE4NC4yMzYgMTc4LjIwM0wxODMuMTU0IDE3Ny4xNjVDMTQyLjk5MyAyMTkuMDEyIDEzNC43ODIgMjkxLjY4MSAxODEuOTgzIDMzOC43MDRMMTgzLjA0MiAzMzcuNjQxWk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOSAxNzkuMjQyQzIxNC4yNzUgMTQ5LjA0NCAyNjEuNzA2IDEzNi43NDMgMzAzLjA2NSAxNTQuODM4TDMwMy42NjYgMTUzLjQ2NEwzMDQuMjY3IDE1Mi4wOUMyNjEuNjYgMTMzLjQ0OSAyMTIuOTA2IDE0Ni4xMzcgMTgzLjE1NCAxNzcuMTY1TDE4NC4yMzYgMTc4LjIwM1pNMzAzLjY2NiAxNTMuNDY0TDMwNC4zMTcgMTU0LjgxNUwzNDkuNDA2IDEzMy4xMDFMMzQ4Ljc1NSAxMzEuNzVMMzQ4LjEwNSAxMzAuMzk4TDMwMy4wMTUgMTUyLjExMkwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS42NTggMTMwLjU1MkMzNDEuNDYyIDEyNC4zNzQgMzMwLjkzIDExNy43MDggMzE4LjgxNyAxMTMuMDE1TDMxOC4yNzUgMTE0LjQxNEwzMTcuNzMzIDExNS44MTNDMzI5LjUxMyAxMjAuMzc2IDMzOS44MDIgMTI2Ljg4IDM0Ny44NTMgMTMyLjk0OEwzNDguNzU1IDEzMS43NVpNMzE4LjI3NSAxMTQuNDE0TDMxOC44NjcgMTEzLjAzNkMyNjQuMjk5IDg5LjYxNzggMTk4Ljk4NCAxMDEuMjgxIDE1NC42NTMgMTQ3LjQ3N0wxNTUuNzM1IDE0OC41MTZMMTU2LjgxOCAxNDkuNTU0QzIwMC4yNzYgMTA0LjI2NyAyNjQuMjU1IDkyLjg2MzYgMzE3LjY4MyAxMTUuNzkzTDMxOC4yNzUgMTE0LjQxNFpNMTU1LjczNSAxNDguNTE2TDE1NC42NTMgMTQ3LjQ3OEMxMTIuMDIgMTkxLjkzOSA5OC42Mjc5IDI2MC4yNjUgMTIxLjY0MSAzMTguNTc4TDEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdDMTAxLjg0NCAyNjAuMjQyIDExNS4wMDYgMTkzLjE1OSAxNTYuODE4IDE0OS41NTRMMTU1LjczNSAxNDguNTE2Wk0xMjMuMDM2IDMxOC4wMjdMMTIxLjY0MSAzMTguNTc4QzEyOS45OCAzMzkuNzE3IDEyNy4zMjYgMzU3LjcwNCAxMTkuMTIgMzc0LjI2N0MxMTAuODY1IDM5MC45MjggOTcuMDEzNCA0MDYuMTExIDgyLjkxNDggNDIxLjU2NEw4NC4wMjI5IDQyMi41NzVMODUuMTMxIDQyMy41ODZDOTkuMTU3NiA0MDguMjEyIDExMy4zMjkgMzkyLjcxMSAxMjEuODA4IDM3NS41OTlDMTMwLjMzNSAzNTguMzg5IDEzMy4xMjUgMzM5LjUxNiAxMjQuNDMyIDMxNy40NzdMMTIzLjAzNiAzMTguMDI3Wk04NC4wMjI5IDQyMi41NzVMODIuOTE0NiA0MjEuNTY0QzcyLjk2MzMgNDMyLjQ3NSA2Mi44OTExIDQ0My40NzggNTQuNzY5IDQ1NS4xNDNMNTYgNDU2TDU3LjIzMSA0NTYuODU3QzY1LjIxOTUgNDQ1LjM4NCA3NS4xNDkgNDM0LjUzMSA4NS4xMzEyIDQyMy41ODZMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTcuMDIyNSA0NTcuMDk4TDE4NC4wMyAzMzguNzc0TDE4My4wMDcgMzM3LjY3N0wxODEuOTg1IDMzNi41NzlMNTQuOTc3NSA0NTQuOTAyTDU2IDQ1NlpNNDAwLjk3OCAxMTMuMjA0TDM5OS44OTMgMTEyLjE2OEwyMDkuMzY1IDMxMS43NTlMMjEwLjQ1IDMxMi43OTRMMjExLjUzNSAzMTMuODNMNDAyLjA2MyAxMTQuMjRMNDAwLjk3OCAxMTMuMjA0WiIgZmlsbD0iI0ZDRkNGQyIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSkiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8zMDRfMTExIiB4PSItMjQiIHk9Ii0yMiIgd2lkdGg9IjU2MCIgaGVpZ2h0PSI1NjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTYgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18zMDRfMTExIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzMwNF8xMTEiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iYmdibHVyXzFfMzA0XzExMV9jbGlwX3BhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDIyKSI+PHBhdGggZD0iTTAgMjU2QzAgMTY2LjM5MiAwIDEyMS41ODcgMTcuNDM5IDg3LjM2MTVDMzIuNzc4NyA1Ny4yNTU2IDU3LjI1NTYgMzIuNzc4NyA4Ny4zNjE1IDE3LjQzOUMxMjEuNTg3IDAgMTY2LjM5MiAwIDI1NiAwQzM0NS42MDggMCAzOTAuNDEzIDAgNDI0LjYzOCAxNy40MzlDNDU0Ljc0NCAzMi43Nzg3IDQ3OS4yMjEgNTcuMjU1NiA0OTQuNTYxIDg3LjM2MTVDNTEyIDEyMS41ODcgNTEyIDE2Ni4zOTIgNTEyIDI1NkM1MTIgMzQ1LjYwOCA1MTIgMzkwLjQxMyA0OTQuNTYxIDQyNC42MzhDNDc5LjIyMSA0NTQuNzQ0IDQ1NC43NDQgNDc5LjIyMSA0MjQuNjM4IDQ5NC41NjFDMzkwLjQxMyA1MTIgMzQ1LjYwOCA1MTIgMjU2IDUxMkMxNjYuMzkyIDUxMiAxMjEuNTg3IDUxMiA4Ny4zNjE1IDQ5NC41NjFDNTcuMjU1NiA0NzkuMjIxIDMyLjc3ODcgNDU0Ljc0NCAxNy40MzkgNDI0LjYzOEMwIDM5MC40MTMgMCAzNDUuNjA4IDAgMjU2WiIvPgo8L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcDBfMzA0XzExMSI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==\"}],\"video\":[{\"name\":\"B站\",\"url\":\"https://search.bilibili.com/all?keyword=%s\",\"favicon\":\"https://www.bilibili.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRo4BAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSM4AAAABgBvZttvmUeYj+0gNKwKakIsJtsSQDZAdvJF3PXA+ZEKv6Mh9h5HyiJgAGefO4mFpw+zycbETsgeoDbEK7IUcAqj1WQU4CjEKoOVvVgHUhIhVAC1/WAXQUrymP34i6dNxb0Rkek3G66mYa7LeFDMyz46BdS1J6zVw/AHUkrgG3gEkOd5xtM61vta5Ns6B8zlwcQA+gPE5GHwOhrhu2HS+bth0cWn/hw+gTlUBT8fAqkozXQHHPZn74ibPbSHT6xw3UxEx8/PnNM/ncyN/IFZQOCCaAAAAkAYAnQEqIAAgAD4xFohDIiEhFAaoIAMEswBdnMb/APxA1Qrqv4VywD+AewDMOf7d7f/RgaVn7F4EOHRHAAD+5QWfa3eOfvWuTk9JPs4H8cRcdGuAwui+d+VLQtu9fSVv/SGl2fnx3F+ggcT/iq0eknNHR9KWLEXn+d1F0Yp6D8pLcF17FziXgT44yJ6nPi+VLkT1OfE8V4AAAA==\"},{\"name\":\"Trakt\",\"url\":\"https://app.trakt.tv/search?m=media&q=%s\",\"favicon\":\"https://app.trakt.tv/favicon.svg\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMC44MCIgZmlsbD0iIzY0MzhEMCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMjQwIDYuMjQwKSBzY2FsZSgwLjU4MjMwKSI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjcuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNTYuMDAgMzguOTVBMjcuNSAyNy41IDAgMSAxIDM2LjE5IDMuMjAiLz48cGF0aCBkPSJNMTYuOTMgMjcuMTFMMzUuODIgNDIuOTZNMjkuOTIgMzQuNzVMNTMuODkgNi4xN001Ni42OSAxOC4zMUw0Mi40OSAzNS4yNE0yNi44OCAyMi40MUwyMy4zNiAxOS40NSIvPjwvZz48L2c+PC9zdmc+\"},{\"name\":\"SubHD\",\"url\":\"https://subhd.tv/search/%s\",\"favicon\":\"https://subhd.tv/public/images/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRgAFAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSG0BAAABgGRt2/HmTVLb9t8NWDux27HdLsHu1LbtdmbbNmbJ/31l8KwgIiaAlNW1FnwiUgqbe4dWRc7FlaHelsLUSF/BWpfUahdSMnUl52pUXE+XhtqrZpS088642tn7bpKRclKvSZFrmE15SZXQiTzhgCeROv9Iox445EOk9C+fUw566vOHyQyHnTH+lcZwWBoROexz4D0HotB3pI8w0itjSKxcz2aaQ8/YCNdYN4KvHEvhF8nBo5LRkgvQCmrR6jrQOobQhmbQZo7RtvfQNjbQ1k7RtufQZgbRhjrR2hvRaovQClPRUmPQYgIVWAp/4RbrRrCdxZq10atkSKxSjyI/kD4iiJwOkQ6ciCiX4bAcIiKzJZwls18UcIlyFUB/yhKfMZ4TZX+RXuIlwnWiHv0vC1himmJLgTJS2jz/8JOpj30e5puTyq7RNfN3ojrE27nqaBdSq76tZ3BcekVT1+iynHP58mhXU3l6bKCnrT4pCwBWUDggbAMAAPAVAJ0BKjAAMAA+MRiKQ6IhoRHEgCADBLYAVhygvwD8K+pojzwD8MP2x6Dvenurhmv1j7UfdX/M+cQ/qv8A/FDhAfxz+2/5T+jcIB+l/WAegB+1Xqh/439gP//8in68fq78Bn8r/vn/Zup/1AdoF40Pd/wHCDoZvyA47nhH8y/wts1mTeOj6D9gT9Wf+FwJqStGAWBMnO552kONf7uhM3vryFxE7eFJPhtQ4C6/ShLBcc5q7+DUbQAA/vVtuo0tb2S77Dyg/98l2Ncd/xJfZd4tGMiYlXSTuB5PlDp623ax8dMUw0BMiBmNXkG0wXICz9BrpUFRwigIhjlFqWP27/t0dCquqqOgY8ngCuYKqEW1z3P7CikNQae3VnyHqavueKso+fGwtgMYnbrgtHD/3UhxJvIT4sLu2UlKs+f+0CwQPM+oEF9F+jHqH7utat/6VBTS76upbmSsGiXUU+i5ZkuBhlYkjs3aI+3yMWWrXEeFVVf/0dQlHXp3bAf3Y11P3f9RwVnQx9Sv8bguO/h/QasqdPzushv2c8TF7Q6fpOkI0fw+2eePfIbdxjU3PlM5EIjf0Eq46aN2sMdHcOue0EFDqYa+OzJV3Pjxr5OBQPURGuaesR9PD3Zdb/+1LmW1+o3oaeBn+MUK5Yph+fZLE7i3gkIoJU+asA4YtEOYh1tNKp8BMG+w+XxYejw3Bh1O4hhBWv0rPXgK7MAZbzCLvUD//+TOiy6+36eYVTFQ/v/k8ABzGmyZ/VyZp/3bzn//8Swf1l08dfzWhI6iT/dT7/NgAff985Ui1tZCUQ5NMdsBjNDtGTX6QKtBjYvVV0GEqEONKCM94i9DmLe/TqTnL4vaj8nUvszgwZ4Emu/I8sz/FwWr72Oq2vfORmkKezRd4jdlegu5utECiT/CR7Ukfg7qyZPqYxkmU/YT//yXo8bwuj5sJ7xrmntIO3hPWLGiOdJgDWsOKmmgFDBB7HdK/Qre62iMzL+1b35VdIVmDMisn1YZzCQtgnXunxicnwUjsdNjFHQm+NtLR1hEMnQXJAWTzZghvIStfIDegDP0tjpG8o65nuDGBM4gZf9bbtI8JH0rvgiPwEo7ugkBr0GbtGyMRspyoLgBPxygkxHYWAxoDN0tTPzWO6Qo8IBxoK/guOK9Xt5tlZoy3OfAAA==\"},{\"name\":\"豆瓣电影\",\"url\":\"https://www.douban.com/search?cat=1002&q=%s\",\"favicon\":\"https://www.douban.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRkwCAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSB0AAAABUBIADZMP+kc4i4FGz0TEBCCdBuk4fb9ZHW8jAgBWUDggCAIAABAPAJ0BKiAAIAA+MRSIQqIhIRgMBgAgAwS2AE6ZQjpL1XiA9szALpoYKekB5gP2Q9f/0AegB/lf7N1gHoAfsd6Xvsfftz+0ftAXKXkp/V3Hk+MH8l/FWoIfyL8iqox/TfRS/VfxV9bPyr6Iv+NDMquHVbbGcHLyseTpjq9sFqSCgAD+/ESz/9U+P+mNwwMKnr9dvAQcrv6v/SgJ8GTmcb+8bLbn0ATlqjX0J5KSJ4K9wpmYUqv/4/fBTe9SW0njg3hEmf8WIxef//XwW0ma8YmeS8/ykvgh/mmszmInmjcaxnBF8qfrvkNjz6tO3z6lQ6f9IOrQrceTmu9vEDEql9TZ/2I7XpX7+P+UevwNiUtAhgsbbqf7RXexQzWpRvlnWoNqacHYRMYV/96qmhkxBByYZ3nSZh6/bPchHGm1e0Ce/1s/7synGiYDX1Q9e5+YbP5GHBkp6gQ5AoKjZKyw+H0MyIHhlSBrPt7uX/jF5ZedENxLuwl3lmfhEB4S//+m8d+T1TxhqTnQra8xPeKnpr2iS1SUykTmp3s666fZZ3PeAxWUg0VJMXwhLuF6gqyuQr+ocIM7eFq9Sww6+Ru3dxp+Lsr+OS50/59NsFq3ZlBNpuTwCWn0Yj/4aHKlipxPHEyLaIk7++/YHiZ6aFoTHBt2hQaGKpDVB/Re1Q71kPVIg/yQt7HMAAA=\"},{\"name\":\"YouTube\",\"url\":\"https://www.youtube.com/results?search_query=%s\",\"favicon\":\"https://www.youtube.com/s/desktop/f51d9955/img/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRpoCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSOIAAAABgFtt2/LkbeO6h1uZdNnAM4LrEAkOpZWREnfYINbhTvni8P0nwe1By4iYAPqfltlD2eJoZWqtvrl7xMy39/f39zfMfLS7UV+bKo8Ws0G77DXTpHQPKU2aXwiKe1gRIiK7uAcWJqLFe+hJ0nexJKXvHtyTRouNoA3U0MqraEtttNYp2hGj8SXaxf2v/xLtnNH4BO2ojdZcRVuqoZWH0QbSaDEfmtfYxZJUtIg1SWQWSMJERH6BI0L03DTdwejMW+lVpTtaKE3UZtbrW7snzHz77JaZj3c36+sz1fFSPuJS0v80VlA4IJIBAABwDACdASowADAAPjEUiEMiIQnOA2wQAYJbACzs9p/T7Z+Lv43dFSNXzAeoDxAP6r9gHcA8wH6If5n+O+//0gH+A/gHoAdYB+lfpP/5L+gfC19oHwD/o0U4Z/AeKbMwFCrWBClY9SVJ11RHQcAA/vgEIlNVKXtvStxLxv/HL7V0XisLr/Owv8qmkvRv8ivfcT1P8bX7OsFXf/NQGlBpJEatn90OLRPf1/+Gtu0zkhbt6zXs6L9mXeIo/op0xtPhobb9zPOaJk3mX5aHfsidkZN33PvCVn3/1RVMJ7BL9G8G9lXUqDxawPzJk1XFew0iOR5uPIbok3nemSiZuiM1M8OzVAkHeUTU/URRxkfr/+mvZu3BUSYSLQQVVF6dOvn3+COpBScdjJMSH/74KrW7WTsF/BP8E7walD7KDoU+zffDBSGcgFgCeTJnDUmOSUSumK3cstIf8oAH1PzFC6s/LQXT4Oo6ahS6P9+O380H8qcAeikCmgEt+klr4R7XmMt++T8KD5Wf/JDUm6iYTQuQiiFCAAA=\"}],\"books\":[{\"name\":\"Z-Library\",\"url\":\"https://zh.z-lib.sk/s/%s?\",\"favicon\":\"https://getzlib.com/logo.svg\",\"faviconData\":\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzYyMDQ3MjkyODU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTEuMTUyMjM0IDEuMTUyMjM0aDEwMjEuNjg1OTN2MTAyMS42ODU5M0gxLjE1MjIzNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE2MDEiPjwvcGF0aD48cGF0aCBkPSJNMzcyLjM3MzIzOCAxNzIuNjA0NjZsMTE5LjIyNzQxOCAzNjIuMDEyNzM0IDAuMDQ4MDEtMC4wMTkyMDQgMS41MDc1MDYgNC4zNzg0OWM1LjcwMzU1OS0yLjM2MjA4IDExLjkwNjQxOC0zLjc4MzE2OCAxOC40NTQ5NDktMy44NzkxODggNy4wMTkwMjYtMC4xMTUyMjMgMTMuNzg4NDAxIDEuMjY3NDU3IDIwLjA0ODg3MiAzLjgyMTU3NmwxLjQ0MDI5My0zLjk4NDgwOSAwLjIzMDQ0NyAwLjA3NjgxNSAxMTQuOTczNzU0LTM2Mi4zOTY4MTJoLTcuMDU3NDM0TDUyOC42MDY1NzMgNTI3LjI0MzA5Nmw3MC4xOTk4Ni0zNTQuNjM4NDM2aC02Ljg0NjE5MWwtNjguNzQwMzYzIDM0Ni4zMDM5NDMgMzIuOTE1NDg2LTM0Ni4zMDM5NDNoLTYuNzU5NzczbC0zMy41OTcyMjUgMzU2LjEwNzUzNWMtMC40ODk2OTktMC4wMjg4MDYtMC45NTA1OTMtMC4xMDU2MjEtMS40NDAyOTItMC4xMjQ4MjZsMC43MjAxNDYtMC4wMDk2MDIgMi4xMjIwMzEtMzU1Ljk2MzUwNWgtNi43NjkzNzVsLTIuMTAyODI3IDM1Ni4wNzg3MjloMC4xNjMyMzNjLTAuMjg4MDU5IDAuMDE5MjA0LTAuNTc2MTE3IDAuMDY3MjE0LTAuODczNzc3IDAuMDk2MDE5bC0yOS40NTg3ODQtMzU2LjE3NDc0OGgtNi43Nzg5NzdsMjguNzM4NjM3IDM0OS42MTY2MTYtNzUuMzg0OTEyLTM0OS42MjYyMThoLTYuODk0Mmw3My40NDUzMTggMzQwLjU0Mjc3My0xMTEuNzg1OTA2LTM0MC41NDI3NzNoLTcuMTA1NDQ0eiIgZmlsbD0iI0M4QzZDNyIgcC1pZD0iMTYwMiI+PC9wYXRoPjxwYXRoIGQ9Ik01NDguMzY3Mzg3IDg3NS4yNzUzOVY2NjAuOTExODQ4aC03NS45ODAyMzN2MjE0LjM2MzU0MmwzNy45NzU3MTMtMzkuMDk5MTQyIDM4LjAwNDUyIDM5LjA5OTE0MnoiIGZpbGw9IiM3MUE3QzUiIHAtaWQ9IjE2MDMiPjwvcGF0aD48cGF0aCBkPSJNNzU2LjA1NzU3NCAxNDguNzI0NjFsLTkwLjQwMjM2MyAyMy44ODAwNS0xMzUuMDUxNDMyIDM2NS45NTkxMzZoLTM3LjIwNzU1OEwzNTguOTExMzA0IDE3MC42NTU0NjRsLTkwLjk3ODQ4LTIxLjkzMDg1NCAxNzQuMzMzMDExIDQ3My44NDY2NSAxNDEuMjI1NDg3IDAuMTM0NDI3eiIgZmlsbD0iIzYyNjA2MiIgcC1pZD0iMTYwNCI+PC9wYXRoPjwvc3ZnPg==\"},{\"name\":\"豆瓣读书\",\"url\":\"https://www.douban.com/search?cat=1001&q=%s\",\"favicon\":\"https://www.douban.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRkwCAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSB0AAAABUBIADZMP+kc4i4FGz0TEBCCdBuk4fb9ZHW8jAgBWUDggCAIAABAPAJ0BKiAAIAA+MRSIQqIhIRgMBgAgAwS2AE6ZQjpL1XiA9szALpoYKekB5gP2Q9f/0AegB/lf7N1gHoAfsd6Xvsfftz+0ftAXKXkp/V3Hk+MH8l/FWoIfyL8iqox/TfRS/VfxV9bPyr6Iv+NDMquHVbbGcHLyseTpjq9sFqSCgAD+/ESz/9U+P+mNwwMKnr9dvAQcrv6v/SgJ8GTmcb+8bLbn0ATlqjX0J5KSJ4K9wpmYUqv/4/fBTe9SW0njg3hEmf8WIxef//XwW0ma8YmeS8/ykvgh/mmszmInmjcaxnBF8qfrvkNjz6tO3z6lQ6f9IOrQrceTmu9vEDEql9TZ/2I7XpX7+P+UevwNiUtAhgsbbqf7RXexQzWpRvlnWoNqacHYRMYV/96qmhkxBByYZ3nSZh6/bPchHGm1e0Ce/1s/7synGiYDX1Q9e5+YbP5GHBkp6gQ5AoKjZKyw+H0MyIHhlSBrPt7uX/jF5ZedENxLuwl3lmfhEB4S//+m8d+T1TxhqTnQra8xPeKnpr2iS1SUykTmp3s666fZZ3PeAxWUg0VJMXwhLuF6gqyuQr+ocIM7eFq9Sww6+Ru3dxp+Lsr+OS50/59NsFq3ZlBNpuTwCWn0Yj/4aHKlipxPHEyLaIk7++/YHiZ6aFoTHBt2hQaGKpDVB/Re1Q71kPVIg/yQt7HMAAA=\"},{\"name\":\"孔夫子旧书\",\"url\":\"https://search.kongfz.com/product_result/?key=%s&order=100\",\"favicon\":\"https://www.kongfz.com/img/pclogo.jpg\",\"faviconData\":\"data:image/webp;base64,UklGRtoDAABXRUJQVlA4IM4DAADwFQCdASpAAEAAPjEWiUKiISEYDfyAIAMEsQBllO0eh/dOUoAC8htk/MB+p/UT3kD0AP0r9Mz2Nf3I/ar2qLmT0UfZv1wzh31r+zfj3+W+oS/sH44/wDMMvkX+Z3TP0G/8B+WnMDRd/477gPip/x/Kt85/6z3A/41/PP9B/Zv3S/wnageyT+zKF+qlMTcgo4QRnRU24DfqGtyFvEaPmwYHrYXZneb3rO8pj1BohCaAwmCdWFNKZuSAAP774XvrY788AH/iQv+JC/4kL/hAgCdmwa9c8tgd4O2wnQ2u03UHD//If+7Nei2m4p/7x3hRV1dklt2CD1zrdT7DKgPZ+5uhfwz8G3ZKHxQvumn4/44jd38jVsBit6vFANpu1PjMx5XtdRyTyAPbeyCEUvviLZiRlGvvDhWXeqgmN57zrirsEe/0lU32zWRxJVRiT3UV6gRIbc8UZc5yJoRHXOHNbR4ShSnh6P04rxGC4r2OwaXyw78HPkqyZlDehvwMw6IL2A+typZIM3/z+2XeSbsX/krFjZ61q9//+S3FfYahksMj1v4zujhRV/+3qX6v5/6bwv+AlqY6bIPTcZNMNVhZhGOq3VzCm4186d0d/4Ovyf6Y5jVDNh7cMENw81HioZGn6gjSsZX0I5dGtmf/C0H8ed/8afH97fKtNB/wHx0spFtp3LanTOvfUb1wCG1jsXsBYaQpEbTJgBe/M8MDQdR6OWnLChTkgFkNIF0QI6NmVA/zLNADpHMGr/2jXu4LpNrG/hITh+T9tekgG5wqtI/74gt8Tt17sUVuGfpXztBFApITtsWYx74WX3hKzjaS36fN6B/rxQEVlCwfuS16cfr1I+Wka+GZfnsE6binSKWGG8QbMxPtvqTwm2UjnJXb9Wv//y8d8etpHjcllINn7LW7olojqO5WatHuVvkal1v+FIvC4fCS7zrEnTonfdaP0Rw8NIBdFaKowb2P3P3txQriCa29JUDpWBRcIvQrOnkho36bGuIWrOoQ3dq3Cgvyp4e5svt3aKQXoOpHlOvXOXw27m/Ol6YT+JQ1yMymKihubh5UCQi9Jz4R81h8ED0ngLueNA1ZT+K/QoZP/tpbHtwB2C3eXq6Zqq8QBe64uV2pxucjz7jzfzpYUgKFQ2IwJsTDyIv+M11hQH7pEYK7FDVxzPiPc2TYuEyws8LizurRGtKmhbpz9HgQscY/KjPEPmWUak/WkpznWtwmiOW6WRFF95y6aAqC3zYlHZB89wNi06INnR4Z/4Sv+unIreNYu3kE5BUntpN9Hx34xVN0AAAAAA==\"}],\"tools\":[{\"name\":\"金山词霸\",\"url\":\"https://www.iciba.com/word?w=%s\",\"favicon\":\"https://www.iciba.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRpICAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSC0AAAABUBrJVtMLqX+ZQz3/f2gBfRYVERPgshgo2dUH10tdzij73y51uU3t1MVA6QkAVlA4ID4CAACwDgCdASogACAAPjESh0KiIQwDABABglsAJ0yhH43gH45cm5s32WyaPkp+m/jd/Vd4O/sn4u8AD9QP1d9ivqAP2A6wD9gPYA/VX0a/2I+Bf9k/1k9mOgQMd2ubjOumlf6f8tBoJHPP10UgWGiICBgRjb8oaX32QuEO+QRVFhwA/q6hk02NOIy3v2wq/8xui3+B5x/FOBLeUX2ndfCXNtR3bE8qfp7LtApTPsIKdN0uDre/zCfeCTxp0//2ViHweVAutGDJFx7QqMlkQOOJ8jZ+/PFL6PdPTtLcLX/8jWEIm2RzL7XZwxRwjTl73WptuL+WVQ40zZMUfCUqYrwf9mar0xmV3ctWRFQx3HvfYvCHG65i07vn8Cpg5/4VZ4XBfDxyJEvGmZ6WG4UcI/5kq8Txyef5dgqK2lkz5JdexvYGgGsTYGfl0x8tM1K9lXeepH/QnqDcIxhSNJiz6jlzrCzLbLv//w0jfiBX8EU/n3jCjyQ7F/hvUPj4WT/3u7D/8drK36RdlCQb+fuT7wKZLXOqB9fOWS/te5+ux3FkkstxUtPxGgKY/OSd2FsgTvVf3zfNa59x1ftjH8IVQN9b+ZR7Tg1UxVTmNoyf/whlLt/JifJpcrFJH+D8QV8/X6buv9SqMdTLWeVy8ntA6wB4aJOpVU7W1nMRvYT7M7m+imfzP/0fqAeG0ID7E1Hi1W9Hdm6uxGSXEl0rNEAlipc9N9hbCXbfkE8kB4Rp9xCxkQCfCpSoOBY5gdJpCyE9gwAA\"},{\"name\":\"Github\",\"url\":\"https://github.com/search?q=%s\",\"favicon\":\"https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0iYiIgY3g9IjY0IiBjeT0iNjQiIHI9IjU2Ii8+CiAgICAgICAgPGZpbHRlciB4PSItNy4xJSIgeT0iLTUuNCUiIHdpZHRoPSIxMTQuMyUiIGhlaWdodD0iMTE0LjMlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJhIj4KICAgICAgICAgICAgPGZlTW9ycGhvbG9neSByYWRpdXM9IjEiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0ic2hhZG93U3ByZWFkT3V0ZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI0MDk0MjAyOSAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0iYyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRUZFRkUiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0UwRTBFMCIgb2Zmc2V0PSIxMDAlIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8Y2lyY2xlIGlkPSJkIiBjeD0iNjQiIGN5PSI2MyIgcj0iNTIiLz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjEwMCUiIHgyPSI1MCUiIHkyPSIwJSIgaWQ9ImciPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNDkyNzc5IiBvZmZzZXQ9IjAlIi8+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM4OTI3OTMiIG9mZnNldD0iMTAwJSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdGggZD0iTTEyIDY0LjAzNGMwIDIzLjAyNSAxNC44ODUgNDIuNDcyIDM1LjU1NSA0OS4zNjcgMi42LjQ1NiAzLjU3NS0xLjEwNSAzLjU3NS0yLjQ3IDAtMS4yMzctLjA2NS01LjMzNC0uMDY1LTkuNjkyQzM4IDEwMy42NDQgMzQuNjIgOTguMDUgMzMuNTggOTUuMTI0Yy0uNTg1LTEuNDk2LTMuMTItNi4xMTQtNS4zMy03LjM1LTEuODItLjk3Ni00LjQyLTMuMzgyLS4wNjUtMy40NDcgNC4wOTUtLjA2NSA3LjAyIDMuNzcyIDcuOTk1IDUuMzMzIDQuNjggNy44NyAxMi4xNTUgNS42NiAxNS4xNDUgNC4yOTMuNDU1LTMuMzgyIDEuODItNS42NiAzLjMxNS02Ljk2LTExLjU3LTEuMy0yMy42Ni01Ljc4OC0yMy42Ni0yNS42OSAwLTUuNjYgMi4wMTUtMTAuMzQzIDUuMzMtMTMuOTg1LS41Mi0xLjMtMi4zNC02LjYzNC41Mi0xMy43OSAwIDAgNC4zNTUtMS4zNjUgMTQuMyA1LjMzNCA0LjE2LTEuMTcgOC41OC0xLjc1NiAxMy0xLjc1NnM4Ljg0LjU4NiAxMyAxLjc1NmM5Ljk0NS02Ljc2NCAxNC4zLTUuMzMzIDE0LjMtNS4zMzMgMi44NiA3LjE1NCAxLjA0IDEyLjQ4Ny41MiAxMy43ODggMy4zMTUgMy42NDIgNS4zMyA4LjI2IDUuMzMgMTMuOTg0IDAgMTkuOTY4LTEyLjE1NSAyNC4zOS0yMy43MjUgMjUuNjkyIDEuODg1IDEuNjI2IDMuNTEgNC43NDggMy41MSA5LjYyNiAwIDYuOTYtLjA2NSAxMi41NTMtLjA2NSAxNC4zMSAwIDEuMzY1Ljk3NSAyLjk5IDMuNTc1IDIuNDdDMTAxLjExNSAxMDYuNTA3IDExNiA4Ni45OTUgMTE2IDY0LjAzNSAxMTYgMzUuMjg0IDkyLjczIDEyIDY0IDEyUzEyIDM1LjI4NSAxMiA2NC4wMzR6IiBpZD0iZSIvPgogICAgICAgIDxmaWx0ZXIgeD0iLS41JSIgeT0iLS41JSIgd2lkdGg9IjEwMSUiIGhlaWdodD0iMTAyJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAuNTI5Mjk2ODc1IDAiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZmlsdGVyIHg9Ii0xJSIgeT0iLTElIiB3aWR0aD0iMTAxLjklIiBoZWlnaHQ9IjEwMyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImgiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93Qmx1cklubmVyMSIvPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49InNoYWRvd0JsdXJJbm5lcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0SW5uZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC4yNTg4MjM1MjkgMCAwIDAgMCAwLjEzNzI1NDkwMiAwIDAgMCAwIDAuNDMxMzcyNTQ5IDAgMCAwIDAuNzAzNTQ5NTkyIDAiIGluPSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8dXNlIHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjQkFCQUJBIiBzdHJva2Utd2lkdGg9IjIiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8Y2lyY2xlIGZpbGw9InVybCgjYykiIGN4PSI2NCIgY3k9IjY0IiByPSI1NiIvPgogICAgICAgIDxnPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNmKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICAgICAgPHVzZSBmaWxsPSJ1cmwoI2cpIiB4bGluazpocmVmPSIjZSIvPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNoKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==\"},{\"name\":\"知乎\",\"url\":\"https://www.zhihu.com/search?type=content&q=%ss\",\"favicon\":\"https://www.zhihu.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRowDAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSMAAAAABT0AgQJnUAh6YZIKICGU8xQBqbVvTkyQLfErA4igBNTksfcx++q5lvLve7yO0ENH/Cdic3LVKwvVus39RmppvtzeRjI6E6tEnYm7K6VeQznBtriKVZwa0Eo1QjXUrDg1DDlFF0EX8u4aBkiAODS2CkDSi/g5TFxFzahAhZJRUlVZSGkIsq5ZtJ1JNBUOpA9PA+CNGp3TRRFSEIPoT0qRGUv3CsEzj6iN0ZBTq9LyWFeV4/6rSWF5tN2cv5jBc7DZWUDggpgIAAPARAJ0BKiAAIAA+MRKIQqIhIRgMBgAgAwS2AE6ZQjqDy/8Vf1V5s/Ykwd61OUDtAbaL9gPUB+p/9y4AD9SesA9AD9UPUq/0XsUft17An7GUs17X+MmTheh/jxoi/6X+NOSi/wH5M6jlpwHpNf3f8v88vzX/uPcE/iP8o/1/AZ/sqW5zL6KIwfU8/AnbD+/3p2AuDuhdDO2AAP70RBvh20zhDyYlxikmjhRo6k5MVf/wvCwLP4hKU8o04T68QJqz9HFSPEpfExvbiFZZ2S9v//4Vw/ynnKqc1oIC+uLSg4uE9lZUIbqB+ae7zp8iVbgnL6D087+f/3PCZiGtYa5vR8JYMmWdo4i2rJ6ND4b/4eHG0xn/+sSdqtbIrm90fFTCFbdQqgLbrn7P7xt0z/tT/1OpytHmg5IDv9uoJxNQczWtF/hORJfUHdW7cv3/waLFgPQ8QP/9MB3y/EzfwTzjt47fys/xcSfTv+wdIsieEf/91drWQQdCzeg3GLKYMS/qrMNZ6UJsD1/iklOih1S5NtHFgi0+JYSfPjVHiIdvJJ9ZffozNRtbkLzvI/gNS1GiZHaAbbtb7MQDD/HOwP3Erkbep7vGxrumJJUKJY+3GXK8OhK62ytfGRSIfBocWXPRdNJFYPRIpHPcSiK9tQCbk8bfyd663SQXqy5aV50TXVPxTqHgigvcxbyH8znkm8IzEW3xw83s7kz470zQ4XTu3rVHH7Uw8cDXYa1wUEr0oox8ntGoBOWqEW0J71j89Znm+i7c/y0nOb89Tjtzf5iD8dj2A4n1nXgZ/f94H+5m9ahrPJexU1yI82B8ceRGC0CAWhopJnFPaXF8Hts///ZqYymx23zZOrPN3Esqd6z7QQkXtVNLJmgxtbUnSrA20glsmB0DzAAAAA==\"},{\"name\":\"Wikipedia\",\"url\":\"https://zh.wikipedia.org/wiki/%s\",\"favicon\":\"https://zh.wikipedia.org/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRugCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSC0AAAABUOS2baP/f7p72cmxQERMAPMiyG6RXRThSZEGingC5XuJGgmgxajEXIddBeYAVlA4IJQCAADwEACdASowADAAPjEYiUOiIYjiwBABglpABbarI/7J+F/7Hdmx5nPXPpX45fkzpQ/xA/JnjCbedIJ/r348+wHEKfxz/hf2b1Q/8jycfPf+59wL+P/zD/C/mV/i/mA9bn7Hewz+tiwv4JA2Gqbmp/vEc89UqLuotwbwpIh7QAox8ypCzllbWbwFgwaEa6ojIAAA/v//0oa3P/9H/39ImtuLfoR/Lh3s8rbOlYgdbLRHzms7D/ubAd1k2ccnZWD7N1uXXPXpkP68jM+9FdkBdD4XpWCZitfB/pLo6fH95Q+S7he9EOXpMXEFJVX36VG7arMB82raf/90z80Fv4q+cDw0sMvgcbczQ+gRdjOXouV73+nwLX7eSdVMilgpRGWh40lIQHxTcc6dBy6pOVoihTxEjQ2+YOQtDL4nkP+r+Iu7WOiu2eMJS5I+G1RvRXXkv2PcS2c5S+S1oSoYCUZENdwVw3JLk+YmmV+CBe8gcu610P1RmHa9KUp7cKcwJol1J9/BPBg2ldAUKXQcCQ20pw4ixqbaM4m4r2xk2XKWfE3/oInyITzbRdieNCAqs0NnaS51m/3j//pz9Tr8x0k6ITUoWNtpsFDUTYWh2Qt9uqh1wzl+9sfvsvjqP1Oj9/RJ/4oHTUlT/fFe4E9a8m+khKytZRUWUXe77Yn8hQLoeiFne7B2JqVRAWiNSeik9oWK+IWDdHf3kOS+H5Fib8lPbWcxBsuWWXmAyxGZ+oweKEAJfGQu5Wn+qN8837ZGukjm5/C/qo50gvNhLON6YH+ax/V+zFMoPKPjy45krccRRBcjvM5ZgoXAb82diLPnw9scz1digmG983pFn4ajxDBqOqgyRkUj9ytkwr/h3oYVxZoFlNgAAAA=\"},{\"name\":\"类义词典\",\"url\":\"https://www.powerthesaurus.org/%s\",\"favicon\":\"https://www.powerthesaurus.org/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRtQCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSJEAAAABgBRJkiMpoRW0YFbQcmV1dZ54R8QESBIeokiP/x/Dbsj62KTZJs4mzsSZOBNn4lxxziPOV6gSHPVe6yshaMjMtYTGJOiwR73DCffqpH6UIxRXo97pE+75xGOWmJFgJniuLfMNz3vPBqloH3JjWWnEKY00FIbCUBgKK2WhxRk969bqTBJ0291dpeWjwN+PCfcAAFZQOCAcAgAA0A4AnQEqMAAwAD4xFIhDIiEKrVcAEAGCWwAnTLoQQ+S/hX+M3RP7AdmeKtNh0lfovxG9mf8A/ADqGNwB+oH6q+/r5EvsAf0n+zeq//h+sA8oL/d/6P4Ff3O9Hr//lQh8nXgpDdYHBAQSQQlTAHz5+zp4lwUQcOTaO684hjB7QAD+7tPf/ufS9q09vDGHug49vD//uq5Ftg9wSMupia9wRZ3d9/YJDbnA/3UpDQeXMspHXVVlZwQ4mKthce3fmzVXkRoDjTI3gRYS7tU0czqBbV9sQXcbssNvI/2Ov//Jwf/5Qe//8lDzlqz/NDtnfnk2UxTjjNFYB6B/ix08aGXo5QObwiP83XI9jLr7IS1wm1BkPcNkym4b49gSXLRkblMDAjiUMqrCL2vB0TXja5X1i/iTTOLqNhg5f15WHe79eOWEqjn6MlDQgkwZIMHz4N97v/t2JYs52xFxO3lilUlS4AmUoOcHB1fQtTb0vv47djehB41GatOTfmEcFS/kkKb2WATvikhjY/0gB6H45mzKfg1eKAdOpdxkrbMLEqLGq/9Gg13ydyrj63JvKQppmKSOjDLSi+9HkZlYo6teQUbVD8mZ02UelnlJCxGmeQz+B31d3oFwI6XyW2n7LAZvbeFysoBBQ//OSuPBu24Z4pZ4YLJ3nHD//aOjz6Zbo20ft4pT2Poz+ERGPXl+YJ2WFR1iL820nQAwTRUgAAAA\"}],\"actions\":[{\"name\":\"复制\",\"url\":\"\",\"action\":\"copy\"},{\"name\":\"打开链接\",\"url\":\"\",\"action\":\"open\"}],\"download\":[{\"name\":\"人人影视\",\"url\":\"https://yyets.click/search?keyword=%s\",\"favicon\":\"https://yyets.click/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRt4DAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSBcAAAABUNS2DcQfbVUE/V0jsIhIOOqMcHrfAQBWUDggoAMAAPAWAJ0BKkAAQAA+MRaHQqIhCwVXZhABglsAMgcQDYIuO/gh+zP+q6W/Zjuhqpeyw5gPcB/YPEA9SH+mfar3APMB/G/61/uv6B7MHqP9AD9d+sM9ADzVf9X+53wQ/td+3PtZZon/O+0atC4yBxhPALS5MY8YPzj7AX8m/pH/N4HP9dEhc07vJcX9KTisZsEMwNRfgUfTqDQMNbXypzzgzVqFtq2DF3+o+yhLeUKANS+1R5ThpTdbdqCiTldDMhPdQADs+kav3+/yDHnqdP+C9TrjbeD81+x1iBh5FHeHzU65+1vUzzn/iLSlfUOcxf/cTXFop5/hcQsQJ7CBncK/K/ZodHQQJLeCrdW5KD+eXlPa2d2+WK/5yqE1IpMVTgw3D4ysuWSCJ0F8yqjkn9Eq/oNcyK2h7UhFao+dKCQFe4zgDSIeeRP/og6o4cv3lH3Zyh1gnwdhj5WAjMR5kNO9G1Y+OyzAhev5bKy1EyHgFoq/wtNodO4mh+NWynl58uHCOQ7nadlqNN2wy6OU2w+Mk4pNV9FeTdpxwLsDTFw2OdZjRAcR0LbBmJyMEAvgeDSCL2GNzpTi8PBjGzV9P90KfZDIkaEjMB8LIZ0rbqxPpwyyQ1/SaIRzyJCtIrS35RMWL5ur0mIEZFvsE3Y7GGJYB56pzd+b0k+zz7FZneQm1PjomSzzt8Me2Xq64oMw9d6GBYuEQ5e5yQ63QDUMjDRMJAhukc0O8/7fat0mWHWyQrfwXgT0DXVytQagR/6FdSr4IuwO0uP1oJwEPp59/NKCXp1Bt09bUlVIafa4tQ7tuez/tZ8g8nCxEYpEori0Pl0mPOs0sFIRM630fPv9GT+24wyBVQo0v+qYC9HhynJeX5P1hfP1MWcZEJmkeyu/2I0NHQ/0ufLy/iZ/5z8d91f7XWk6UMXMRmNXB+Z9weJlL4oVuQvngnBOtWZSnK0H6XXmRbEIuH5a2rzoBkBLluLawzxLn4hD/+qmP/P7AcY7x+m/TwQnA/TKhxryM0f/qBAK/ygwM28supkGpM9D75PD3rjFCLmPPkCqt9XBf7BtqvhQ3nkTgN/qBUbfb5B5PeS34QcI+SgF5M4SQVxPopSXOfPcJhYHOyPf72R0KR7lwHpP5N83DPwwgnnKcY+4pbOSUiWt70MruIoZSV7tIBvju+OfwstBLrhVS4pFz7MnDo+NE0m5wLdtxy4f9Z37vPUunAr3+uGYwvw9lAAFkqAAAAA=\"},{\"name\":\"动漫花园\",\"url\":\"https://share.dmhy.org/topics/list?keyword=%s\",\"favicon\":\"https://share.dmhy.org/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRiICAABXRUJQVlA4IBYCAADwCgCdASogACAAPjESiEKiISEYDAYAIAMEsgBOmUI8z8a/FW6DtBBgNsBuJ94A3mSzBNnf2PwB76CMe/O6BZNWkgv+A2Iq1JsTPvuhewYLGP81h/xuBPc3k677o7qJzgAA/v6V1sNYli4B1uRdbdVxwSB1JF5sVn2EI8+kxqHas4JWXKn2TGtLrDkIt4TPgS282jpM2OO6HK79m3JtbeKkgf/zJHxBiBJuxx7BO5+PVpEPw//OcKnpejDDJBj/MKlyeARRH+vB1PxKa3pY67k6QjS0EauZ687k7NjE//1gd0wOhFHpIgyN/358Kjr9gP1NLzxlR3w8w9tlqpk2FjGexT4Yn0IcFivcBDQR35bFPuEhab7HhpeHMl/vyEWH4QuA5ti+1NDrsEoMfY+pHk9ue33kiv/EI2Eu8Hlw7ofJw1sZujuS53CrqfjiX/nA0VwcJmHeb5RfnZLf53DqukktNE+w+UvL88lRHzIQs/bG3ZEGd7cQGFwVmb54Wg/an22gFFPnLKgQXi4pXiEJAc+oRSs4n/jHeRrZlk7sOQzMJHzD17Pca5rpXJK3uWXzlx9ewD7OaeXvfLhX84f817cjt8A9D8VQH554yHLFV74ZAwLvOku40MUIU2zeX6FzSC/lcDjKyS14OKZtHHYBn9z8Lz/A8GsnhmJXqMM+e7HFb/6f8yhjBIoPYLQCrdn3f7Q7ammAAAA=\"},{\"name\":\"RARBG\",\"url\":\"https://rargb.to/search/?search=%s\",\"favicon\":\"https://a.favicon.im/rargb.to\",\"faviconData\":\"data:image/webp;base64,UklGRqYBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHgAAAABX8GwbSTFMZ2P8TEiIiD9UirNups2hpSUVeCU01obSQEwjCTZ1H7btnn5R/iUQkT/JwBWXlds6oANFhLehQ4gu0REjdLjqlAq8XNKpUSCe9sqFRRuR4VmQ4Uq0fdwKNF5Z/5yjjhcmQ0NZ4/gtePQ+zDLaRg7XwNWUDggCAEAABAFAJ0BKhAAEAAAwBIlsAJ0ugCTAOk28m53ufxJXZF/Ad7B7gH6O/3IzYwehorSUSAA/v/BvO3NP5V+X2GMimYuDDSjtJVGYJ14n9sXn/+MEkinL2X/IY9HJ/dv0OxDZ2eFE/l/OWWlBQwPFR/N5FiD9rjUU+ukJTtmT/+99XqNNN2YmOguB9P+f/Xv9c+580ykscWmVf5Oth/ag9/3P+lQMDo9qtM4p49LtW1LswNxQjyf1d9APsJ3ryz8VMF34X+Lz/5XXH3oufCr//HaLf4L7wC8l814HsQeAh/8zg4CicCJjfzV7WxtM1IBJRwUNUF+mUXNFYQM88VEcKXUKp9g+IL5iFYAAA==\"},{\"name\":\"1337x\",\"url\":\"https://www.1337x.to/search/%s/1/\",\"favicon\":\"https://favicon.im/1337x.to?larger=true\",\"faviconData\":\"data:image/webp;base64,UklGRmIBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSI8AAAABgFvbtqntfq7AX4aUDdhWzAL8FWD9hRghc/Mzol/5n5k7uO/9qiAiJoD8w3i/Ny4TYj3uz5uUagRcKbnrwGeEIp4XIGt6BqpcBs4ScDcAxnLCrL0HgPcMYe9S+3w27iI1F7M5XynUWER7QG8LuFMzxT6BhPEBWOBRmhkwE3M3ga8wFev1xgVCAue9WYX6awBWUDggrAAAALAFAJ0BKhAAEAAAwBIlsAJ0ugH4AfiBTgP6BtAG0AfoBvgHAAfoB1hPmAf03//gwR1TSxr0AAD6S5WGNGNrYBN6SexNld9zk8mniaFvwp9Dz+qnclRxcP979TV1E3/8/ldDgdQQgx/ib52jiX2yuT979an/aKHR+sLFl5WcuCv/uId5x5GVI2nA1I6NXMobzBVXduXNHc+LlgCzM4N/8V9ANI89WkoMP9+SAAA=\"},{\"name\":\"海盗湾\",\"url\":\"https://thepiratebay.org/search/%s\",\"favicon\":\"https://thepiratebay.org/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRgIBAABXRUJQVlA4IPYAAADwBQCdASoQABAAAMASJaQAM4E8a+WaeJc4A1zX9V/FXmQP8r7gH8V/kn9s/Nn+0miLk2t/7fncAAD+/sye/fci+/8fTBLAQjuf5lazKFFgL/+xg/pzRJNIlF2XQRRQ20QehZmA/rl1/rYX7DPGKi4Ntn//P5/Hj8LKgvPFQ9/s/qiX94v/+Ykwp//eGDcJ9v8soxi6IVkd6avPHWhh+YC//wY71Hs4z/J28nRv/4F/MmBEJ0qE3Pery/CzoJu2BB/8oBzH/Vhf/1ddSp83lYY8P0tv7rC+WhCQI49ZA5qx5qHuyNv87m+KG/bqvkTFkVP/MLWqBAA=\"}],\"download+\":[{\"name\":\"BTSearch\",\"url\":\"https://www.btsearch.love/search?keyword=%s\",\"favicon\":\"https://btsearch.love/logo.png\",\"faviconData\":\"data:image/webp;base64,UklGRs4FAABXRUJQVlA4IMIFAABQHQCdASpAAEAAPjESh0KiIQz9m1QQAYJajxNJ9c/XgX/rzQAg3Mq0T8GbeDv7zRJSuu+cV4pPSM8wH7G+q56Lf836gH9J/zPWS+gx0p/7d/tp7Udzr5Pj2Ozh31i/Dflb8mOxXas/zHy3cindRxgezN7k3+G5BCgB/Iv5v/n/6H+QHyf/7Pll+f/+r7hv8t/qH+b/OD4j+or/Xd13PXvUrHJCVHXuWpt1jJ4BjfUeEyJSGIFmC44GvV8RxVne8xXa7Dc40K8qx6qxsINTvS+jhGZDLohev8hLkxMKikhN0Y6AD3UoTTWgbby9gXfs3cBQ/mAA/v89vOsg9hs/ivnwPhMEPeaW5AMn2gK0cHwJAXIL+U188WuS2XHVAJWPF8LRWDEoudtZsmhSdMWZ2PW0yS0pjtDSCNesfVKfphrA9rsjIWur8lb/E2SGinFxfSdbK/jMtfdGp1fHeaW3p9DLPxG7GGAHtLPrcozoKajP+5jcFc/ZIH4iMJU4KoG5yXYAQKprFnfg3Ijeke+tg383ZSXYje19FEIDueYdlStosZaTtxJXrxGSVq4bYvojss+BIe0sjaNhv/8AchJSiUJE9q+r/pT1cpBps1QnrGcV1nJVP//GkqyJBLSpyd7hBf6c3bJpXehv6USPpHaKv5iPwV6POLyesoZ4jhmc+h70f2s0fiebZEU7k9b+Z1TB+7sjp6PwWiuvp0vkdgu0sHv1tFWQ2FyxwDNdWA3JEqHV683II7mOuL/fLlnu5BbTIr59U4h++sLpqOX2cJKdBeqs/aPwzr3SDZxw7tAbYKVutwlQR8mzFZ6Gf3/8YXpNXdBIVVKiPNHCfSA/9zafMRW8UPCdIPTJ/vfFZhoDIrLJ1tSZdUZkRqpMe9tmTN/NXE7PMtu5PJaws1O3P/2NoH64lm382I25ssjGjqcUj91pYGS2ZtYwESCLimejT07C4pfta3uRZFq+1cP2rMO+yXt6PTRx8kUlu3Ero6Quez7tEB3e1oye49CTy8WduzUPvvAv52XcE5Kg6WS8N0cnUb1ymjIiV3fRUdFM4sw4PC+YCj4Jy14XgRd557hsqvJzPuvRi3rUoyx7DXujiWF6vjZI3a6iMQT9Wd+8jI7jYEMPu8tY8M7oTz5ipx/xY2Hh0ZdgtfLKykMysPOr7mkXGHhmiBn/hq2WjM/L9brWbnAkGi3GJL/8Kul/cYvglk335i/WnnujE8V96ajav4Z13sznckWazj7L/KQOhhm/G8viZYJgHvVFrmheJVFnfPYROpjFthM5kMo6IQ06YnJylWl7DytKUzKU2Pj0pgpM7cV1N7ct/V+Nvmp1Ist/NCq1gNOxVjCIguOIIK8I2/5YbdfkZvOu/xFjxFrMZR/5cjUEpxX+NsAXnGvjPfSrrMoFYEg/KdBX5dSMk/hFiQdfcZyuToQyApj7ezS6th/4lXmPU/DAjsI5xXZjz9H2dMyZfjSHVkpOuaXNEz+ceS7YGXPUBH7ry70j6l/8axZ18inJmZNwCz2YqvO1BYnx5AAnyGlH59vRw8HSm9hVfGBhcsPL0xTNqICieQXOWwEch4dqyVizkR/ksPLgN9jPCZcdezIlqcm7q1RJsDbZ9ifOEWar4IymneOhn33orxmofjCFSfDv+rTA7LXlDwrg/isjpsaTw593lvDQchoHjECvkANRNlkWcAHabiYLvdRND5gIZ0MfYGpGhdlfwGKwUgSVeD/GcKrCFWSnP08fO/TWuEQ74+fHzX9Z/LdIjOXQVL7mJnH/yIxMdigHZyZeDIKZpOZ7MtLktggOo5UyaugQ7NJngBr9qvCbfnHf0ptYB84fn5GXB+6id2BAZN2fclnoZAerNgYd1Lk3+WNiijIkOM3sK7yAnP22fyGCPL4Xcl6mIbBd6x80iZ6CuzTAe6/76pjrqSbGKZPqZ2rtWeeZT+ocYAiaw4NMpB8mIvOCnYc/yAAA\"},{\"name\":\"SkrBT\",\"url\":\"https://skrbtso.top/search?keyword=%s\",\"favicon\":\"https://a.favicon.im/skrbtso.top\",\"faviconData\":\"data:image/webp;base64,UklGRv4AAABXRUJQVlA4IPIAAAAwBQCdASoQABAAAMASJYwCdAtQH9AjwP0l/wHuAfxL+U/3r8zv6xyAH6gHaQpe2DYK6AD+/sH/N/mzXqex5HZ2OdnX18CmyZdkVVdiLtkL/48Ynlx//wEDBfJIjQKux/hbSnH/6st488k8XP/q/gX/U9J/y5P/0rFSL30y667v9Pm5IPmf/4sm5fBNkV//h+/NWO8OZGFZNjGszPd+YwH/wIal//SJ+OkM9vX+qtr/+408H8T//dsbf//3jfPK79y1G3Ug6tWC3G4V+3PESSgkKgoCT25445IGhqoLftlmZZ+QfnysXwPfsKmK+ct2vcAAAA==\"},{\"name\":\"EZTV\",\"url\":\"https://eztvx.to/search/%s\",\"favicon\":\"https://eztvx.to/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRlIBAABXRUJQVlA4IEYBAAAQCACdASoQABAAAMASJbACdLoAukDYAP0A6yb9nK4BwleSCeUfi7MgGqAaa//Hedbmd+SfYA/iH8k/x35q8Zf+qp0ejeI6+XRQAP7/SA59R/6NDq3TP4WPMvlBufmuPK/3cSkzv9f91FS64b/z+yH6byfPOKCUvq6toH6f4vF6sdV+rd9kujWHix8F8L5uTBzuRUxFI3K6Bn3hwaR8dFc6gVqugqaUGiQwXpUF9sj91c/zhhbqAIswkWgxj7oj+73zt8fhPmbQX4vPnQ//FHijdXsKzLX8Hr6qdUSbaSmAsovgV/b8E06Q/f55fLKM5hHGUK88LkHZ0/u1dF//0rF2X02jf/ThW5/8jCOf0/3e3bcP5f8f6o8CfeGXUH6PRnkMqTWT//m0yf3L3P6/5sEZ/13n9wyfSLNVAmvF1Xkpk3nJ5gAAAA==\"},{\"name\":\"TorrentGalaxy\",\"url\":\"https://torrentgalaxy.hair/torrents.php?search=%s#results\",\"favicon\":\"https://torrentgalaxy.hair/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRvoBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSPUAAAANgGTbtmlnX73Ytm3bdo21pAVpgFqTmku2bdu2k6duREQAoIzLKoiBqmo6AG4S8n9kSH9s3TdeZB3Msvi9uzRZ2mzzLGy7/iemmQ4NdRVA0E5LbXbro3DPn0QlAJO06bnG22XDKHnY2goATP+u/eIWjN2hvl0EMODQ3AleT5zB8bxXihX7ezHR4ER5t/b+6+l7J8wv1R8vRr/njj5xg0uHsrVL4a++6/J7TAPLzWeeNbMwJ9xcWPzfbmQ51YcS4AH6qK2kvc39F1p5mxJAmz2zIvi9HFDibCn099V7Jw5oH2ezxzKFTlxsBQCoX8/P3yqIkSEFAABWUDgg3gAAABAEAJ0BKhAAEAAAwBIlsAJ0ugH4AKEA3iXygCmMeOjJmM0WCE9koYxgAP79NOCrWSxWoEX2XjcfTQD4DNsgIJuRyrBBuvkziaw+y43NdMlcmRsDAW/M3hDR+JpPxKS06/Z8RvbMKCZbT2YtHhw9G7kQMVFfk31D6Y/cGBjG2xgo4RQTSd/1cfDmu4kukmNfNhzx+luw/+TPUOkv/fgTX9Ln/6z1s41YhYXt9dSzkHs/W9U/3jJ3/eN1vv/G3Q/iTc9P/5oYPaOLoJdaK2DUD4QchG/xajwxrjhwyfIAAA==\"}],\"ai+\":[{\"name\":\"Kimi\",\"url\":\"https://www.kimi.com/?q=%s\",\"favicon\":\"https://www.kimi.com/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRsICAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSLsAAAABcFtbe9NIhFrVv4bm4LAOI+SZsu1l0AbEn985fLWLiFDQtg2TfQJrMah76ICi8uR2+TrYXfKYAq2ewze2njY+5Ic4eJs6a/wnQkpGFkDwmFD42CldBBRLSr7SJlkEFktidGBHAcZoA+oYCdcUTwKNKco3LFt1YSx8cgeWw7GAY5e/n9jRMP4Pnxg8LxVaR/IIrVMx1Qy9O8LrLF7H4T4B7kNefU6H8Dm1Nb56Dh1QnF9+kdDdnaro2UcpAFZQOCDgAQAAcAsAnQEqMAAwAD4xGIpDoiGhEcSAIAMEs4AO0A/ar0iqBGygys54Am2OcGf7zy6fRv/E9wP+Q/0f/Lerd1DX6qpPrNuBJlojesQZ+MeJJ7flcFH3znIuwmjgI1MskUx34GPQAAD+//61mgeqeNYRjguTXHGd//S3D/Fy/9MXzD0GSMahcozyX93/m2/8ID8d+Xrntt7Ta8U/m+dvW7/9aHe2xWhbVKe0zY6bfzQDZlWkxZ4hYzobZc9xh/9bgf4sP/PybVNn5shqay/2/7VPhhqZmkbWGEuoEMH/uX/zGfHn+rK3v/tRuFuIya0aQHcDp/+MuCcfD6Af4p/8TGT/xGSn/1xW7GxlWgSrr/YK4zQXyN9+85JS6KII6ntMMmPUKfxwt8Qd58nqSH5PgmmbbuRo8cjGCkQ+e0oTgEMvuTVImR0TzwSrKFnO9bmUQmEQ6bzHyjwHzFibYwpnUqP8E7/2If2e4OHYdYB9W/8X19ZtKg6ljO5ttMvff1zRZ9fT53/Bn3F0y7YJ2ew+QNRbt9Ibo2lAojtmREgzfJe3/+xD/6rDhp+GwJNZTHs+ia2BdIfztqOtzWXF8StCRLfj+XmVR/xXq/GD/30ad/8iv/73c7PvMPFxryz7q7B0AAAA\"},{\"name\":\"豆包\",\"url\":\"https://www.doubao.com/?q=%s\",\"favicon\":\"https://a.favicon.im/doubao.com\",\"faviconData\":\"data:image/webp;base64,UklGRt4JAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSGUCAAABkKRtkyJFf0RmcwKHAzg3aDiJs2Jshyynt93oJaBvMO7u2vQJcHerygy8JGb2EeEwANq2AVvImd2FFxCDZAFwU9f4o9LykcjRaunJVFczAbCMSMbtOFv4diARPPha6CDAUGIYoHb0j1zQhc75S3jnQicX/D3SAJhkYKDm/pKID5yPKt4FXmQ9XwskOcmCbi2IBE5i0gUi8/cINvY1DdrfXHReEtBfNM9a416SCAM7EnpJSB/KzgCI4kzQpEgoKTAUmSJED6ZMMeKshCfNVBBH7rUP5FRS46k8sBE7yfKsBJIiAymyvXFYTF3t02ynbrypQd/VPt2274avAKNp3/m04d1+8/VhzGsJJXWG8pH52kF3JBAFBjJ4RYiqVpzTgPOrlUSAQf5SdSQHA0bNtvciOrJWBbYYulQtGYElWxYnoiXlDKFTb4o4yQLjl2u95QTMD93yg5uOxOvBy2Fj16VqSve0hJoIZfyJdnlUEq8JL3Or2lg+FmUey39P/cWK9iGrc9ooPdL+3D4Z1/7eTHdrl67GQ93fjaMm1v7dMpjQ/d0cB7K6pROUKXunN8uWLEY0/7eGYBlVa1ri/XYNGAY5CbQ0DwMQVa7qiHMrVUQADAa1fMuda9aN+aOOb3ptDIAr0qzj25rA6r5R3bdG+OZi2r55li39S74dYKqYSTM3FDPEcXLLVHq5ZZJA6rkpbm5rfZ5GbnvTniC9WtC9+aS5ceEWwSbLrbX59SS5dSlXA3Di3Nww8jtubv4zWhuZm+NeEtxR+Bqd278VsgxYQgpkC4Cau6aelFaPRI6WS4/Gu5oYMTsAAFZQOCBSBwAAsCIAnQEqQABAAD4xFIlCoiEhGAoFgCADBLEATploPo/c/Mip/9v/nH6e5BY53aT+t6QG2d8wHm5+hL/LeoB/Sf8z1mHoAdJx+6f7ke1VjgHj5/cugl8k+vWci+0P6D8ueVHeKfyf/B/lF+XfJhAA/Lv5x/bPy5/tXOP9cfRN/TP9NxyVAT85f777gPjf+iPPv+Xf3v/of5X+5fIJ/Hf5//oP7X/g/+7/lP//9WHsK/ar2Uv1VZ8i6QRfqsk/mfd9nHLbmyB5VfCKQ68Qv75T0fxVdqNcdhDUNA2TrS9rNmzA8FVaqFg0AaSB7olbs60Cyaa4zcvv3eHIhY+LAblYQC8pVUzLXAmUAfL5XOzxSOcdIkDn4CkMeXF+581GgAD+/+6MF//j7z1oLP200Cq4lmW6V21W2CqlR/Lj2ILtdUdf+vNz5cHdATA6Pt+zcn//KsiL0ed5TtbOsRMUw1/Xgr71NkQx95BZXVKMBDLuS5COlMTDjwNg9q6f4uYo1Fg/e/hYn9sHjQRPRAxiy/bh8cxryBWq5rWBxS5Xxwlu9o/iX+EkwLRg8x+t/qY9daCQNbNbgdOa7zsLAj7xiivWXXnFj4/QVd83PvwAoM96NPUzbR2cx4jaGo589ESWXlDLYg/G/G89rlNQ9PFYBw4Iu3uvjtHur1NfxSGszpIKZPJFbKfd0fjLeoyep2844Nky+E5QfoBu2aolyMJSapf5r2iQUxYdrj6VUrJPf765VcJnpi3D3IfeaIDEJ1kG2rH20yyl1XVOWvFbPbFtfF1fgNUpF7+PpdLa/ZvA8TEp2f7sDeqcEQsyg2LS5OE4TAKcWig8Kh//XbZHb+yB/+p22mQD1m19jMKu+uZGv/b0cX+dptzp0aVcPQNQchmWKPEDdkoyXt3QZMMeqg6q61X2AFw8VTWYH0rJ+yBGEGT5KvwbxXkynxwn/cq4Z8Ws2X1Kvt5tTrS+uET5DM1TipdFKC65TEjIED86v8f8U+Tws5Kr9g5iy4+Q+zC6pRPvRYAyzYkpKvv6UC5famprEhSvJw5SBxw0/wJoWcC7W83TCr1/dT+erMFfFoipgH1JYbVB06335bby7RAmohdqRsRHZWsYbi/Hbp7cxUAiUi5jiSvgQFytYXjMqlCKU4mrYp+9b/I2MPKpdXg44dQM9YeeZT7DOkHXMyPY9bJN9Nwm9rlk51p7Id7u2oW3wT9AsqEQe74SpAYA+wKai5cONkWUSjhpM0gyzx3C+Hn4wahAsae+vXXecmlxqQ6z1MRyS5nDDoAEluPY8aRhh/nMQ7VZ+i8qBD1Bf/K6TDdvgvgvTI7iNhc6dMfTzEJKFXU11T3a0UZ8yDjhfIliT0JKbLgwyGsDAS2yrpNPjZvAe/qcWcLtU1etkP0AiKWO72ZyuX7Mb4+vXXTVfzwcRyW0nQGfP+OxnzQhSIorV4gwrMvwd0X+Tw2LXA82pGrjSpmge9Y4taa8UeZf5AolpYN+kqJfz4ev3UVBbxSBY2XzsHUXl/x5uP9VdC1j54P7qRkMj/fN2ZSL/PfYsXLAqdncB34YRucoFPAR45JVvhPrZ+5/cSyaK9r6w1o+lvklk0otkiOSyCCAx7KOj3Uxl424MhwLepNdLOAWUgb7Ke687oSv51HVvs79tJPI8wKdYutw/3/EDpX066YQUlT6M+0HhNFPMmi0mEZz//qJjF/VfC5nUd2cc4ewoQ7DByHxcaz548xZr96XZMs9J8RwcXm822XU+f0/3lTAa54oc261ORFidF9HOLOZVbCqe6f/nMfPfyDbhwMUYGue12+kpDXy0c0kX3J1dHJbmg4dG7U2LULwR5OuojGDTNHE90C3oBOfI8t/FD8k/Ss8pmY0nHWtdMyPAFIrDWZRhP0yiHGzmdnwhJk7fs9bH5nAp6tCa9PcS2LILbBIRL6bZXzH1E8OV5KcO+vPN3byUlrJvXqF+ar0siIGINTsp0A64vxwWLGH/vMk9FhoFgTh13zBlyZPRC23+SENDX2PXoPM/aLqgd2lf+qiHdUzlx+gg0JFpusaLOSuk4H+mN4HGhN9wPLo2P+DNqlbZwJLaxrRxJJufd3pUHc56j8AfBHIojsB2roowKx5m57eq4ok7uJAdvkQGFcn6Mt0QdsWX1tCt3+hYKYES9lQupRVGLSVrDoUZvKt1L+t2yssubQGeow0w2pS1ukxUUYSecXZVKKzkd2pEn8yKR4bqYBAH0SisZRascOQ9KGQZn9+uB40xCkBZrHutvwJobP07Pjv+NBoSPb7Ozwl6t8WY9pS+YFkXKcHlQzg/j8d9WQzMhRRAbR0ihdNEa6lsCmY5MIiyf5VSej+NNYufLszTxeI7/GB5WFwsuqj057HYR6lkSaqCxWXRkj0yNGJxMEncld7m4l6jCFU/OIBoVTg8s+MKSHbynVCs81RmJ/+DCrT597WOpfwFsHUVBwgwiE3Hp8UaR/EDRe8db8GWCff/5zXR+uF8x8krRwgNvgHwAA=\"},{\"name\":\"智谱GLM\",\"url\":\"https://chatglm.cn/?q=%s \",\"favicon\":\"https://chatglm.cn/favicon.ico\",\"faviconData\":\"data:image/webp;base64,UklGRgoHAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSIMAAAABcBXbbtw8KIIiCGYQMYoZGYIgCMKDkH3r++9ExATg2ufk8qMcs+Nx1PLjFfcsF8GyGxMXSbaLtshOJ0Yd2qEW4QQQi3QApVXwRdy7Wh9qSTUuf79Sjak2ulp3NUdpFRBaASCVCgCMOrQDQqfhvFGDgWsrhTTcjvq1Cjz2PvgrzO64BgBWUDggYAYAADAgAJ0BKkAAQAA+MRSHQqIhDAWDPhABglsALsyhIU3xHmY07+ZfdT90sqk5D/yP3X++D1AeYB+jP99/MrtbeYT9ZP9v/pve39BX+u9QD/Af4zrGvQA8rn9nvgy/YT9t/gL/Yn/y5pL2X/2v8cvEH89/XPx9zhf2k/G8L+8E/jf98/Iv8wOOC5D/Qv8Pxn6TKdK/nf+R/d/yV9pX5L/jP95/ivgK/jX9R/1X2+fMd7Lv2O9lX9Wm+2svlgtcPBzwMB7ZJuYmkywQgkPj05M+pzB6AP3xxiUJcUccyHjoOraQoCbDloOfX4l28ki9uiWR4XZAN0OwVAxmvkQxP8201BXA/3yaflqRdYQAAP7/7OAVdAaB/mM3gcN7sNu/+OrXVqJzty3tgm8vsGRC/r35PSpghuNhePnf95deyPktMV/8NX2Wq9MTYtQ7q4uKze8o2+jzuP6h/udyPUDZrYWxVyY11zWinCkJDeCwmu0k5qvcknHnOLuFA240DMYuLRpHXfFGaoi7ZXpo+sXMXbJ+/HBF9gCtA4rdUrGq4IE7KsoTXNpf/yoQyFF77uWFVto26FMbDeCa77zrHVlQhcCQwTic1mOg2ZTfDq0hMSwQRbRQd/Qyn3fJfypDHoPs56MCdtGVIXUjdckZO3o1Gi/G9Qizf2bIjSNPbTrTOZ/09A1+T4Wq4DtOUnTf/I17Uw8LG45KBD/Jo/N45HEvO4tLlBdSjurzTr53wC8W1ncCMRUD1QlG8nXlGOXGs1uzInO0E/CF+13oXqBcZaAuoI/SvbtiYGoYsXX1/qovRo4gUoNOw0N+alvI6O4VxfweeLOmNWNyvDYPH8N+XKgyRvw+6d6JlNcdFduDEvoE7oaUOP/WmYh//kadV+QtYannlhxDDelgiUQwA0+pbKh4R6QoMrAZqwip3/yp/pwEpm4uc/eO8FH7zaLXHzZ5+lwLKeYZopwVVYb5xBm+7KWZvTJA4K9juB+CJgCob5QXk86eZpPa13glFEILS0g6A6ojw7EHXbtHC/DXcLCrO5NpSG0nsBqTDbb6zBB5nxLnVytGVrCBPB1/bFesK+mCyWIunoeGmLtc/H5/xrpnLD2Fa77LlIVw9zc5bqqmZdQyE2hcev/z/kGPoAtoBDev+wQ6VFvaWqqOc2ZeePTsiRUA153u4PKahtU3FOkApBUAglq2wgp29z+4caCX/66WcGO4Nzweory//lyM3gzN+h0lZOAOMYi1GC13Xw4UHI0eAk9BPwMjo447LSS6H7J8YP85I+NS5KvrQLx0abIY+qSLdNjJYdahNfOpTADH8AocdAy4j757+OREqurudsxp0gMFdSnsOYerZ0JLmvsA4odUvtKz/nnZyP5M0tVweQ3sVWJ/WpPcRhzaukXehH0rB4aEnmN95PB2UkDSvfyCX0KWpxK97KZhzeiTCIapQDzMWeD4+GvF2lWisIJqcgz7WrA90HXQMu8oQB88FCvuNscJj67zKPcz/8qnf8JmKRFEy2IlqgZAIN15ecyf51obFd25/zq6klG0OpJf6gdJI/Hg62uj6uy2UH/BHXIBLH5B/lLQdmuLsrfqRXkAefYc7OnvZpj5nOMpEYWPHQ6BW0YawEXVVQHVzRg6uqvnJX7wwkyRDUgIZu18JX4k5jiSZgFdcO1tCiQK9Mgn80qo6Pghp/aDkBHL18O7+kANKHth3euyaApuRtAZpbbtW3KORGv1BLWNvsLmhc8HEXZ1hdnlAnU1W+eaMvR+cxJ+KICD7zufct5MJDX09J3OvpwkMuf8O4JdW4OL3NaG3esBaNswIFDAit/vg6gb0cA/rq/ioQkwKN2APdL/n9NJgu8dwXEDHHqKKQ8+Uw5w1Q6hHy3iihapAD0XY+r3OxlJgxe/ro/oP3ils/CHdX0Yg8HOYhNlBT/zzjx6Xla2v2F3ylC7QopUYiK0+P6C2VBTbs9aRqf4Sg3G9hv6++XoL+om8D3a/TfyRvRVooQF3gOwk41Np1P8zb2g6BO/5UC5PLXjpZXr64ANCUi0uV6fKh7gmlPFrhkA8WR+wVWqjcvWf/ereAnKHSnjx1JS0DWY/UCCyy8T2Mvz8LX3gaKPIaoBSUZ+SJV2srHWLtsna56jYhRLkeY+aLZr4C1Q3ELAwJ//6VkjB80mXP4tMpK3f/o+xwKdvjgAAA==\"},{\"name\":\"阿里千问\",\"url\":\"https://www.qianwen.com/?q=%s\",\"favicon\":\"https://a.favicon.im/qianwen.com\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAGDklEQVR4nO2czXXbRhDH/wNYIRJfkA7gs00G6oDqQKlAVAWSK7BUQaQKJFVgd2CmAuOZ8lnsQLjYQl4Mjg+hYopcgLOLWQB6j7/3dCGXi9FgsfO5AHbs2PGMoa4FiFOOC+AQCySm74MA2beMPrQslphOFRiN+IgZFwTEW4bOEeKgyGjehlw2dKbAKOUEJe4sfjKPQuznGeXehHIg6OzKJT5a/iJ5KPHOiywN6ESB0ZAngHnPq4OA05evOVUXqAGtKzBOOQbcV1IZ4C9FcRrTugKLBU7gsPpWGEdveKwjTXNaNSIOhsMIM7J/bmlfQ6amtLsClYwAEdIo5URjrqa0tgKjlMcOlrcawlxtKkbGId66+JntKXDId2i29/mHMCk+043NT1p5hF3dlrYhxsXSSxDjXYHLvap3DrAJBuKitHOTvCuQmrstbTOxcZO87oFabksHTIsZHUgG+l2BPYxdhYyX+/ZWvClwufeJhOgpR5JBPldg4nHuNkgkg7wpMAR6lbezhUkm/wvphFWhUwTkpiTn14yyaMRz8PNcicECf4vGbRswGPHJYMj3KHFn+itK3EdDvjPl6QLGWxfhO4cw5xe4kA2tIRrxOzDOxBdmHBS3NH0yx5A/AhiL5+gHx8WMriUDKxXo6MPNixm9ejLPGx6DFJMIviHMi89P/4c6Kh9htgxpliS/jvh09YPilqbEuHSYqxsWOLYZblyBSyfyyuX6BOSDEK9WDUucclws8KnvBoUYlw+3dLp95E+qVqBzBMFAvF49yzPKEeAAwNR1Xp8wIQfj3FZ5gGEFNll9q4QL7H/9QtnG/Ckn+N6flVgy8pd7mLvWm00K1LKa4oD8ObP5CJPa6uhV9cwXmwpkvVoDCFe2Gd7nhimUu4Ge45sUC5wCFs64B+o6wBjIKUBWZE8DAClVboxa9GBya9pkMOITMM62dYAR8GEQ4thWTrMbwzi3maQOlzqDFtGQJyRrnwMDh0WJ97bXMCpwGc9alfe2YFVn0MCxmCXORD9SGcpFIU5ZM6dHLaf3FziCW1L3nY3hq1RgnlFOpBrDWt9dV6KUE6ss0lMeDZ+I2nxgFOBCs4UClnfXmYbFLGKcSHtvahWYZ5TbZie2YHV3Xfgt5UM0LGYxEJPQ8InqwtpuDYfY99UwrtqDY0gQryMqKpULvdS8zd21Rb0HR2D4RAr89wtlmklRBg613RpPPTjj9QTxOuKy5uAFznrt1vxnOBLVOQGA6w2fWIF5RnlAehEKBHdXis8uCAbiOsNn3VwUjfhOKzWvFScPhvyegEMNmSoJ8cpk+Ow7ExTdmm13V0I05Il35QFAac7SO7W3qdd6K+6uUJb2WocNbo31CoxTjom3ZzesqLi724hG7MdwVEC0+bRYK/ChxBUTtI9bWaf/l/HuRFmOWhj4Y/0zKwV63W/IchX6cltqMHVs2a5Anympja6GKrpq3gwMOVKxAlvZb7Y4rf+jeWBHCmHOATZOzosUGKWcMPvNogDmroYNWbo6c8I4N3kK0mzMFVp8ZKIQv1c5152ceKrp2BKtQNK3urUUpdlQte22PBKW+LPqO5ECWVDV0oRo83oN0/TusjAuTT0+j8iMiGa3guRyC2wKrH3mRFCqkLS7yfbANrtMDfvNXsppWOKT4lWuixkdL/+vZP3LAMh/CTGVJDnEsXBbvc6mtjhVw0GYI9B7B43ckQ5xrJpQNXNtUN4EioaDSlxq1mOssjHRiM/AHqORtazMstH9IxRXn00DuQS7WFi/TvwTg6OqflRWsefnEet84N5rTsMQ75Ubxm+KGU1WP/BwVPa6mJFmjRuAa0I15YS+45RpM71jAwN5CNx8m22+nU09+mmQtK2j89ffmXiZcloqui0uxxekiA8btklZKoaOhDmHsnNvLnT39ra2qMiiaNHLRzhOOS5K3DeeyIPbsk4vV2CeUa7RSlKXRdGilwoEVFpJNqIaH/RWgY07ZEN9p9lEL/fAVZxaSRjnxS2deRFojf4r0DaV1oLhWKW3j/AjxS1NiYQNnstUlWeR1i75TFjGxsYEKABggem2dtwdO3bsWOMHqspioR45xrAAAAAASUVORK5CYII=\"},{\"name\":\"Minimax\",\"url\":\"https://agent.minimax.cn/?q=%s\",\"favicon\":\"https://agent.minimax.cn/assets/logo/favicon-192_v2.png?v=5\",\"faviconData\":\"data:image/webp;base64,UklGRlwEAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSAUBAAABgBzbdtvmITg2Ia00LIBqh2VwxQac20od5CryJ/B2CB9ytmcigpHbNo6kbN9js7+Ar4bG+kqtqcM6KOhsxR0O2O2HcapwHPpdwJnSs0B3cs1qr487wBYu+wePJGepcib5eLBfNBbLc1JCZKUxCHm+KBiLxQ0lUsUovMmPsXtXFKopvNrLPUAOB3yjom88gMucW72EqEkML6v0KY8zClUVnsGnrmPvgUGXwIc9mNT1dYxUNsYeLnU8cNZm5gCfYqRoIxzTTC2Y/n+wCf/NzflvO/QtcsMarn1uaZ6b2ue25rmxfW7dgNycH83cvoRt3huKe8uxRm856QDbvDe17m3Ne+MXQwAAVlA4IDADAAAQEwCdASpAAEAAPjEUiEMiISEXCSaoIAMEtgBl5+J3fW8HfbJJ+bb9V51fVL4qX2zdrbzTfs9+qvsk+sb0AP7N/VesA9AD9gPS4/cP4PP3M9JfVq/AHTwQQHKE6AWYA5E8glpdMMgtZtYlzwwSMYkurI9Xl4f8LOxhtWuj5yyXJ0bOTHPqyL7stU1ksx1/IHVq2LXOVMuu1Dul4uZQoCClwAD+/NQv//k7v//ycY///lC6E75eH7beo/4aT82/Bfl6POj92Eh+UNOS80SypP04Uo3F+ZrOxS6/8Ky6qy7DuSJqwd90tHeyb4R7d9pUJO/xrlmfn85TcNcnc6bjnXDsnO0fhtpxZbiDidsx3Pj1CO7wTY47COWyP/+mNkF/N//5GjT/Cd15h9KzMCfpr1uXGCNSCtBR3jq+qg6Vf/aM0FrSHtFue/bx8Oof/hJFlD51/8bnQ4vdvaVpxBv4gd391O76FM6Sv+voOzTaHisi6wQqR25cZhiSdZZYKebJSv01vxuDfs581ShepihQHerSdfiVFoZ4WOlV/EqB6A1ynwtS64zvXqMpaBE2LoANGCrAWfbx9C+TXCK6weQYD/zWflJW6Gko+TFsmBf3V7VtNCXklauH984Um07cFD0ggQt6kjfQ/+8avK3cfF8HofpoT27dhzgth4Hrn8+Rr9+WmCtLSX8V11+ezbJWbZ9kO96zTrsX5iCd+1uvfuAxuhK9fKjaOfO/kj0ILRrmlPw+8XAT8K70JRz1EonalPphSM9K3aDc99rNyWyXViNYLrWn6W4ljas4shyWPC3TU6Dw2HtG/pSK5jYOgQFcMMKvn8+NHmpvsDphmup928PRnNBC6w9+oAy2gJb+deU5r1XRo5kSALd3IRoR4n9I8GtvrpJR1Ai6SBrS+se3tyvP7egZaGbPTj/Dc+c72yl9N6YeXy6CR4964H+uSn4nsnyLGsqQRZnlLPxaPqX3KKKXTwKJOChGo//9PVilSpwgX7OTQ1UyImqnTHEuVJzXVlO1GsWK++GMIW7H3kwDkj28lLB2lEG2e4zBqaWOftWV+HyGYf5jhelNP//w9Ww2ESUAAAA=\"},{\"name\":\"知乎直答\",\"url\":\"https://zhida.zhihu.com/?q=%s\",\"favicon\":\"https://pic1.zhimg.com/v2-7e3856b1a6d415224ca95814132a3612.png\",\"faviconData\":\"data:image/webp;base64,UklGRt4EAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSAEBAAABgB1JkmKnY8eDF29lEYMHD6xAGSCZwf6gAQ8E/4x70y2Gm39FREwAPhqQ29uHV1QdqYfT3W4DMHxtaPYnqvl0M8O+SFgdS16xPqwoTdZhnxg2XMVVcy8qfSQACX3RFdCpERIMS3QqJF3zsJRncgV1jXPClorCFvXQuKTHcU5z111xSbUOVAVSpd1TMRJ1dB/tStEZ7h+YDHclRqLuj6Kd7qqKVOmgJTKQezdP6XGcFw30VOIUbSHlsTyKazaXDPNyxqBzCYaEDdEjODWAAUgYFBWvmxf5BgwfDesTiRXrw8ql8SoSPjfkzZlqPhk0YfjagEZ39/RBrAWvDrfbGTB8BABWUDggtgMAAHATAJ0BKkAAQAA+LRCHQqGhDX3TmAwBYloAM2xwDoQ+H+5eTn8tf4f7K94l/x26A/XLqAegB+sfWAegB+2/pWfsh8FP7Vfs97O1y35OP2A/arMTvgJlv/LHmA9kDbCS7P935UPm3/o+4P+sq0lOYU98JyHzdMa56EB48a7meFH77F3315y4Fb71NAiLOFACg6VQJjlvFkRd/oV5CDGSZb8bn1sAAP7/PVjR9iaf8vV8Mxpmwiuk5/PZ/r8F/twT4dRe/fHd5/z/oUagouUTs4aAtXcybySUBKAEYUTLqyrJsAX1oj9kTr6RlPd+7G/+2WvIB3ygUZKj97vfkABGhp7XzYjmfbY56OaO2G7zV8+H/gkDhUiXCGyQbX/BrOWM5A/G7g8mpNQgvXb59l6FHOXOqfb4kBbzeiq63SqgivzP/5K2H1YQE6nyRD4l7ypgL+i/B5DYJz//q9OMCDl4z//Z45kChZ4gr+eRZ8n+WFy+PUktlwVu9X4wd7McTSu+75fW7ctETYxRfymczLYSStjAxDjE17hIYrZTEKuEmlYLj7CQ7jdZmH1vL6P3s5R//wvNfPByqEx5jG9heIo+1Yat/R5nTFXv8dpFT/IpZRWbvetG1uK4QEKdpKy4TzihGo/EjCjFSMOg7PutFWo8W1Itwu+i45WPkYWf4XPd7h/b67xpMVWQMVj3cuOwN4Bo2Fs/kpmqwGTihT+qTHpCN+4t06MXvuwQtS0acnHnXpzl9cycA4IeY2TbE+o8Fzaf5saK/dHWXUM+XUcN/wNKZMlFHtridInjeCyvU/+dA9KfvheB0dPYX/XQRP+CSHSMgrZDk4ipS+Ctv4ni7o9bmjYZ4RIZ2qX2RR4jHhI63fdGPngPEFh/5Hq1t4xBAW8M22DUw8LhP5+J/3c0aO8XrtU9R1ydUuPwDQXx4jUv/UvkfDEvVZJMZ4zYpWGBiqroYqAxRh4kisGgu8py//PHdSVWJKoMSHuxDkFp0EuX37sOIjNaoqolBmXasKRX10Oblfg16NYv1HmWt47Cm+0d+uUCVHrnCaBgfWbJ+2gxTSyNIPyzEZwVUVvO5/0r/XqygHG0WQQ4LRyVvhlwbip0CoFPJ/JLo9Oq22FxJH86ZvFfH77HmfrZQ4HRCQfvABxiCMI9M7goPv//vkmM6k6yxbRjZvzsORIn8ga2WBdOw1Hp78cDYiix9LNqzA8qWl2pPYoxECJv//avhMQk8g4oYR+NSOC5NAwdgL+c4/6DGXgJD4s6AAAA\"}]}")
	};
	var messages = {
		"zh-CN": {
			"common.cancel": "取消",
			"common.confirm": "确定",
			"common.apply": "应用",
			"common.delete": "删除",
			"common.name": "名称",
			"common.required": "必填",
			"common.optional": "选填",
			"common.show": "显示",
			"common.hide": "隐藏",
			"common.undo": "撤销",
			"menu.settings": "设置菜单",
			"menu.settingsDev": "设置菜单（开发版）",
			"settings.title": "搜索跳转设置",
			"settings.close": "关闭",
			"settings.editCategory": "编辑分类：{name}",
			"settings.editEngine": "编辑：{name}",
			"settings.deleteCategory": "删除分类",
			"settings.deleteEngine": "删除引擎",
			"settings.copyHere": "复制一份到此栏目",
			"settings.addCategory": "添加列表",
			"settings.hideSameLink": "防止原地跳转",
			"settings.hideSameLinkTip": "比如处于谷歌搜索页时，引擎列表中不再显示谷歌搜索",
			"settings.selectSearch": "划词搜索",
			"settings.selectSearchInInput": "输入框内划词",
			"settings.selectSearchInInputTip": "在输入框内选中文字时也弹出划词条",
			"settings.center": "强制居中",
			"settings.centerTip": "搜索条始终居中显示",
			"settings.fixedTop": "固顶显示",
			"settings.fixedTopTip": "页面下滑时搜索条固定在顶部显示",
			"settings.fixedTopUpward": "下滑不显示",
			"settings.fixedTopUpwardTip": "仅在向上滚动页面时显示",
			"settings.editConfig": "配置文件",
			"settings.feedbackGreasyFork": "在 GreasyFork 进行反馈",
			"settings.feedbackGitHub": "在 Github 进行反馈",
			"settings.saving": "关闭中…",
			"settings.language": "语言",
			"settings.languageAuto": "跟随浏览器",
			"toast.autoSaveFailed": "自动保存失败：存储不可用，请用“配置文件”复制备份",
			"toast.autoSaved": "已保存",
			"toast.autoSavedLocal": "已自动保存（当前仅本网站生效）",
			"toast.remoteConflict": "其他页面已更新设置，当前有未保存修改",
			"toast.syncAction": "同步",
			"toast.synced": "已同步其他页面保存的设置",
			"toast.saveFailed": "保存失败：存储不可用，请用“配置文件”复制备份",
			"toast.savedLocal": "已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）",
			"toast.embeddedIcons": "已加载 {count} 个图标",
			"toast.iconsFailed": "{count} 个获取失败",
			"toast.autoSavedSuffix": "，已自动保存",
			"toast.listSeparator": "，",
			"toast.dialogOpen": "请先关闭当前对话框",
			"toast.categoryMissing": "无法撤销：分类已不存在",
			"toast.undoDelete": "已撤销删除{label}",
			"toast.deleted": "已删除{label}",
			"toast.copied": "已复制「{name}」",
			"toast.mergeImported": "已合并导入：{summary}",
			"toast.mergedEngines": "新增 {count} 个引擎",
			"toast.mergedCategories": "新增 {count} 个分类",
			"toast.mergedSkipped": "跳过 {count} 个重复项",
			"toast.mergeNothing": "导入内容中没有可合并的新引擎",
			"toast.syncedFromOtherPages": "SearchEngineJump: 已从其他页面同步配置",
			"category.title": "编辑分类",
			"category.delete": "删除分类",
			"category.emptyName": "空",
			"category.newName": "新分类",
			"category.label": "分类「{name}」",
			"engine.label": "「{name}」",
			"engine.addTitle": "添加搜索引擎",
			"engine.editTitle": "编辑搜索引擎",
			"engine.url": "链接",
			"engine.name": "标题",
			"engine.iconSrc": "图标来源",
			"engine.iconData": "图标数据",
			"engine.iconDataCompressed": "(已压缩)",
			"engine.iconDataPlaceholder": "选填，可粘贴 data:image/... 链接",
			"engine.fetchIcon": "获取图标",
			"engine.refetch": "重新获取",
			"engine.cancelFetch": "取消",
			"engine.fetching": "获取图标中…",
			"engine.stepPending": "等待",
			"engine.stepLoading": "获取中…",
			"engine.stepOk": "已选择",
			"engine.stepUse": "选择此图标",
			"engine.stepFailed": "不可用",
			"engine.stepCanceled": "已取消",
			"engine.tryExtractor": "↗试试在线提取工具",
			"engine.upload": "本地上传",
			"engine.uploadReplace": "本地上传（替换当前图标）",
			"engine.target": "打开方式",
			"engine.targetBlank": "新标签页打开",
			"engine.targetSelf": "当前页打开",
			"engine.selectImage": "请选择图片文件",
			"engine.readImageFailed": "读取图片失败",
			"engine.required": "标题和链接必填",
			"engine.requiredAction": "标题必填",
			"action.copied": "已复制到剪贴板",
			"action.opened": "已打开链接",
			"action.copyFailed": "没有可复制的内容",
			"action.openFailed": "当前内容不是有效链接",
			"config.warningLine1": "此处有更多的设置选项，自由度更高，",
			"config.warningLine2": "但设置错误会导致脚本无法运行",
			"config.parseFailed": "JSON 解析失败",
			"config.mergeUnrecognized": "无法识别的配置文件：没有找到引擎数据",
			"config.exported": "配置已导出",
			"config.reset": "恢复默认",
			"config.import": "导入",
			"config.overwriteImport": "覆盖导入",
			"config.mergeImport": "合并导入",
			"config.mergeTip": "把导入文件或文本框中配置的引擎追加到现有列表，保留当前设置",
			"config.export": "导出",
			"jump.searchAll": "一键搜索全部：{name}",
			"bar.scrollLeft": "向左滚动",
			"bar.scrollRight": "向右滚动",
			"favicon.noRequestApi": "缺少 GM 请求接口",
			"favicon.networkError": "网络错误",
			"favicon.timeout": "请求超时",
			"favicon.aborted": "请求已取消",
			"favicon.requestError": "请求异常：{message}",
			"favicon.requestFailed": "请求失败",
			"favicon.emptyResponse": "响应为空",
			"favicon.compressFailed": "图标过大，压缩失败",
			"favicon.notImage": "不是图片（{type}）",
			"favicon.unknownType": "未知类型",
			"favicon.convertFailed": "转换失败",
			"favicon.backgroundFailed": "未知原因"
		},
		en: {
			"common.cancel": "Cancel",
			"common.confirm": "Confirm",
			"common.apply": "Apply",
			"common.delete": "Delete",
			"common.name": "Name",
			"common.required": "Required",
			"common.optional": "Optional",
			"common.show": "Show",
			"common.hide": "Hide",
			"common.undo": "Undo",
			"menu.settings": "Settings",
			"menu.settingsDev": "Settings (dev)",
			"settings.title": "Search Jump Settings",
			"settings.close": "Close",
			"settings.editCategory": "Edit category: {name}",
			"settings.editEngine": "Edit: {name}",
			"settings.deleteCategory": "Delete category",
			"settings.deleteEngine": "Delete engine",
			"settings.copyHere": "Copy here",
			"settings.addCategory": "Add category",
			"settings.hideSameLink": "Prevent same-site jumps",
			"settings.hideSameLinkTip": "For example, Google is hidden from the engine list on a Google results page",
			"settings.selectSearch": "Selection search",
			"settings.selectSearchInInput": "Selection in inputs",
			"settings.selectSearchInInputTip": "Show the selection bar when text is selected inside an input",
			"settings.center": "Force center",
			"settings.centerTip": "Always center the jump bar",
			"settings.fixedTop": "Pin to top",
			"settings.fixedTopTip": "Keep the jump bar at the top while scrolling",
			"settings.fixedTopUpward": "Hide on scroll down",
			"settings.fixedTopUpwardTip": "Show only while scrolling up",
			"settings.editConfig": "Config file",
			"settings.feedbackGreasyFork": "Feedback on GreasyFork",
			"settings.feedbackGitHub": "Feedback on GitHub",
			"settings.saving": "Closing…",
			"settings.language": "Language",
			"settings.languageAuto": "Auto (browser)",
			"toast.autoSaveFailed": "Auto-save failed: storage unavailable. Use “Config file” to copy a backup.",
			"toast.autoSaved": "Saved",
			"toast.autoSavedLocal": "Saved automatically (this site only)",
			"toast.remoteConflict": "Settings were updated in another page and you have unsaved changes",
			"toast.syncAction": "Sync",
			"toast.synced": "Synced settings saved in another page",
			"toast.saveFailed": "Save failed: storage unavailable. Use “Config file” to copy a backup.",
			"toast.savedLocal": "Saved (this site only: your userscript manager does not provide cross-site storage)",
			"toast.embeddedIcons": "Embedded {count} icons",
			"toast.iconsFailed": "{count} failed",
			"toast.autoSavedSuffix": ", saved automatically",
			"toast.listSeparator": ", ",
			"toast.dialogOpen": "Close the current dialog first",
			"toast.categoryMissing": "Cannot undo: the category no longer exists",
			"toast.undoDelete": "Undid deletion of {label}",
			"toast.deleted": "Deleted {label}",
			"toast.copied": "Copied “{name}”",
			"toast.mergeImported": "Merged: {summary}",
			"toast.mergedEngines": "{count} engines added",
			"toast.mergedCategories": "{count} categories added",
			"toast.mergedSkipped": "{count} duplicates skipped",
			"toast.mergeNothing": "No new engines found in the imported config",
			"toast.syncedFromOtherPages": "SearchEngineJump: Settings synced from another page",
			"category.title": "Edit category",
			"category.delete": "Delete category",
			"category.emptyName": "Untitled",
			"category.newName": "New category",
			"category.label": "category “{name}”",
			"engine.label": "“{name}”",
			"engine.addTitle": "Add search engine",
			"engine.editTitle": "Edit search engine",
			"engine.url": "URL",
			"engine.name": "Title",
			"engine.iconSrc": "Icon source",
			"engine.iconData": "Icon data",
			"engine.iconDataCompressed": " (compressed)",
			"engine.iconDataPlaceholder": "Optional; paste a data:image/... URL",
			"engine.fetchIcon": "Fetch icon",
			"engine.refetch": "Fetch again",
			"engine.cancelFetch": "Cancel",
			"engine.fetching": "Fetching icon…",
			"engine.stepPending": "Waiting",
			"engine.stepLoading": "Fetching…",
			"engine.stepOk": "Fetched",
			"engine.stepUse": "Use this",
			"engine.stepFailed": "Unavailable",
			"engine.stepCanceled": "Canceled",
			"engine.tryExtractor": "↗ Try an online extractor",
			"engine.upload": "Upload",
			"engine.uploadReplace": "Upload (replace current icon)",
			"engine.target": "Open in",
			"engine.targetBlank": "New tab",
			"engine.targetSelf": "Current tab",
			"engine.selectImage": "Please select an image file",
			"engine.readImageFailed": "Failed to read the image",
			"engine.required": "Title and URL are required",
			"engine.requiredAction": "Title is required",
			"action.copied": "Copied to clipboard",
			"action.opened": "Link opened",
			"action.copyFailed": "Nothing to copy",
			"action.openFailed": "The current text is not a valid link",
			"config.warningLine1": "More advanced options are available here,",
			"config.warningLine2": "but invalid settings can break the script.",
			"config.parseFailed": "Failed to parse JSON",
			"config.mergeUnrecognized": "Unrecognized config file: no engine data found",
			"config.exported": "Configuration exported",
			"config.reset": "Restore defaults",
			"config.import": "Import",
			"config.overwriteImport": "Overwrite import",
			"config.mergeImport": "Merge import",
			"config.mergeTip": "Append engines from the imported file or the text above to the current list, keeping current settings",
			"config.export": "Export",
			"jump.searchAll": "Search all: {name}",
			"bar.scrollLeft": "Scroll left",
			"bar.scrollRight": "Scroll right",
			"favicon.noRequestApi": "GM request API unavailable",
			"favicon.networkError": "Network error",
			"favicon.timeout": "Request timed out",
			"favicon.aborted": "Request canceled",
			"favicon.requestError": "Request error: {message}",
			"favicon.requestFailed": "Request failed",
			"favicon.emptyResponse": "Empty response",
			"favicon.compressFailed": "Icon too large and compression failed",
			"favicon.notImage": "Not an image ({type})",
			"favicon.unknownType": "unknown type",
			"favicon.convertFailed": "Conversion failed",
			"favicon.backgroundFailed": "unknown reason"
		}
	};
	var DEFAULT_CATEGORY_NAMES = {
		web: {
			"zh-CN": "搜索",
			en: "Search"
		},
		user1792793062676: {
			"zh-CN": "AI",
			en: "AI"
		},
		video: {
			"zh-CN": "影视",
			en: "Video"
		},
		books: {
			"zh-CN": "书籍",
			en: "Books"
		},
		tools: {
			"zh-CN": "工具",
			en: "Tools"
		},
		actions: {
			"zh-CN": "功能",
			en: "Actions"
		},
		download: {
			"zh-CN": "资源",
			en: "Resources"
		},
		user1792802683546: {
			"zh-CN": "资源+",
			en: "Resources+"
		},
		user1792793110006: {
			"zh-CN": "国产AI",
			en: "Chinese AI"
		}
	};
	var DEFAULT_ENGINE_NAMES = {
		B站: "Bilibili",
		豆瓣电影: "Douban Movies",
		豆瓣读书: "Douban Books",
		孔夫子旧书: "Kongfuzi Used Books",
		金山词霸: "Kingsoft PowerWord",
		知乎: "Zhihu",
		类义词典: "Thesaurus",
		人人影视: "RRTV",
		动漫花园: "DMHY",
		海盗湾: "The Pirate Bay",
		豆包: "Doubao",
		智谱GLM: "Zhipu GLM",
		阿里千问: "Qwen",
		知乎直答: "Zhihu Zhida",
		复制: "Copy",
		打开链接: "Open link"
	};
	var LANGUAGE_OPTIONS = [
		"auto",
		"zh-CN",
		"en"
	];
	var FALLBACK_LOCALE = "zh-CN";
	var preference = ref("auto");
	function detectLocale() {
		if (typeof navigator === "undefined") return FALLBACK_LOCALE;
		return String(navigator.languages?.[0] || navigator.language || "").toLowerCase().startsWith("zh") ? "zh-CN" : "en";
	}
	var locale = computed(() => preference.value === "auto" ? detectLocale() : preference.value);
	function normalizeLanguage(value) {
		return LANGUAGE_OPTIONS.includes(value) ? value : "auto";
	}
	function setLanguagePreference(value) {
		preference.value = normalizeLanguage(value);
	}
	function t(key, params) {
		let text = (messages[locale.value] || messages["zh-CN"])[key];
		if (text == null) text = messages[FALLBACK_LOCALE][key];
		if (text == null) return key;
		if (!params) return text;
		return text.replace(/\{(\w+)\}/g, (match, name) => params[name] == null ? match : String(params[name]));
	}
	function localizeCategoryName(name, key) {
		const entry = DEFAULT_CATEGORY_NAMES[key];
		if (!entry) return name;
		if (name !== entry["zh-CN"] && name !== entry.en) return name;
		return entry[locale.value] || name;
	}
	function localizeEngineName(name) {
		if (locale.value !== "en") return name;
		return DEFAULT_ENGINE_NAMES[name] || name;
	}
	function isPlainObject(value) {
		return Boolean(value) && typeof value === "object" && !Array.isArray(value);
	}
	var ENGINE_ACTIONS = ["copy", "open"];
	var BUILTIN_CATEGORY_KEY = "actions";
	function isBuiltinCategory(category) {
		return category?.key === BUILTIN_CATEGORY_KEY;
	}
	function normalizeEngineAction(value) {
		return ENGINE_ACTIONS.includes(value) ? value : "";
	}
	function normalizeEngine(raw) {
		if (!isPlainObject(raw)) return null;
		const engine = {};
		for (const key of [
			"name",
			"url",
			"favicon",
			"faviconData"
		]) if (typeof raw[key] === "string") engine[key] = raw[key];
		const action = normalizeEngineAction(raw.action);
		if (action) engine.action = action;
		if (!engine.url && !action) return null;
		if (raw.target === "_self") engine.target = "_self";
		if (raw.disable === true) engine.disable = true;
		return engine;
	}
	function normalizeCategories(data) {
		const raw = Array.isArray(data.engineCategories) ? data.engineCategories : Array.isArray(data.engineDetails) ? data.engineDetails : null;
		if (!raw) return null;
		const seen = new Set();
		const categories = [];
		for (const entry of raw) {
			if (!Array.isArray(entry)) continue;
			const [name, key, enabled] = entry;
			if (typeof key !== "string" || !key || seen.has(key)) continue;
			seen.add(key);
			categories.push([
				typeof name === "string" ? name : key,
				key,
				typeof enabled === "boolean" ? enabled : true
			]);
		}
		return categories;
	}
	var OPTION_KEYS = [
		"fixedTop",
		"fixedTopUpward",
		"HideTheSameLink",
		"center",
		"selectSearch",
		"selectSearchInInput",
		"language"
	];
	function createDefaultConfig() {
		return {
			HideTheSameLink: true,
			fixedTop: false,
			fixedTopUpward: false,
			selectSearch: true,
			selectSearchInInput: false,
			center: false,
			language: "auto",
			engineCategories: engines_default.engineCategories.map((entry) => entry.slice()),
			engineList: Object.fromEntries(Object.entries(engines_default.engineList).map(([key, engines]) => [key, engines.map((engine) => ({ ...engine }))]))
		};
	}
	function normalizeConfig(raw, defaults) {
		const data = isPlainObject(raw) ? raw : {};
		const settings = {};
		settings.version = typeof data.version === "string" ? data.version : "";
		for (const key of OPTION_KEYS) {
			if (key === "language") continue;
			settings[key] = typeof data[key] === "boolean" ? data[key] : defaults[key];
		}
		settings.language = normalizeLanguage(data.language ?? defaults.language);
		const categories = normalizeCategories(data) || defaults.engineCategories.map((entry) => entry.slice());
		const rawList = isPlainObject(data.engineList) ? data.engineList : null;
		const engineList = {};
		for (const [, key] of categories) engineList[key] = (rawList ? Array.isArray(rawList[key]) ? rawList[key] : [] : defaults.engineList[key] || []).map(normalizeEngine).filter(Boolean);
		ensureBuiltinActions(categories, engineList);
		settings.engineCategories = categories;
		settings.engineList = engineList;
		return settings;
	}
	function ensureBuiltinActions(categories, engineList) {
		if (!categories.some(([, key]) => key === "actions")) {
			const defaultCategory = engines_default.engineCategories.find(([, key]) => key === BUILTIN_CATEGORY_KEY);
			categories.unshift([
				defaultCategory?.[0] || "actions",
				BUILTIN_CATEGORY_KEY,
				defaultCategory?.[2] ?? true
			]);
		}
		const engines = engineList["actions"] || [];
		const presentActions = new Set(engines.map((engine) => engine.action).filter(Boolean));
		for (const engine of engines_default.engineList["actions"] || []) if (!presentActions.has(engine.action)) engines.push({ ...engine });
		engineList[BUILTIN_CATEGORY_KEY] = engines;
	}
	function serializeEngine(raw) {
		if (!isPlainObject(raw)) return null;
		const engine = {
			name: raw.name,
			url: raw.url
		};
		const action = normalizeEngineAction(raw.action);
		if (action) engine.action = action;
		if (typeof raw.favicon === "string") engine.favicon = raw.favicon;
		if (typeof raw.faviconData === "string") engine.faviconData = raw.faviconData;
		if (raw.target === "_self") engine.target = "_self";
		if (raw.disable === true) engine.disable = true;
		return engine;
	}
	function serializeConfig({ options, categories, version = "" }) {
		const engineCategories = categories.map((category) => [
			category.name,
			category.key,
			category.enabled
		]);
		const engineList = {};
		for (const category of categories) engineList[category.key] = (category.engines || []).map(serializeEngine).filter(Boolean);
		const config = {};
		for (const key of OPTION_KEYS) config[key] = options[key];
		config.version = typeof version === "string" ? version : "";
		config.engineCategories = engineCategories;
		config.engineList = engineList;
		return config;
	}
	function configToText(config) {
		const clean = JSON.parse(JSON.stringify(config));
		if (clean.engineList) delete clean.engineList.engineCategories;
		return JSON.stringify(clean, null, 4);
	}
	function readConfig(data) {
		if (!isPlainObject(data)) return null;
		const rawList = isPlainObject(data.engineList) ? data.engineList : {};
		let categories = normalizeCategories(data) || [];
		if (!categories.length) {
			const keys = Object.keys(rawList).filter((key) => Array.isArray(rawList[key]));
			if (!keys.length) return null;
			categories = keys.map((key) => [
				key,
				key,
				true
			]);
		}
		const engineList = {};
		for (const [, key] of categories) engineList[key] = (Array.isArray(rawList[key]) ? rawList[key] : []).map(normalizeEngine).filter(Boolean);
		return {
			engineCategories: categories,
			engineList
		};
	}
	var STORAGE_KEY = "searchEngineJumpData";
	function nowText() {
		const now = new Date();
		const pad = (n) => String(n).padStart(2, "0");
		return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
	}
	var Settings = class {
		constructor() {
			this.storedSettingData = getValue(STORAGE_KEY, null);
			this.scriptSettingData = createDefaultConfig();
			this.settingData = null;
			this.activeRule = null;
			this.barMounted = false;
			this.initSettings();
			setLanguagePreference(this.settingData.language);
		}
		initSettings() {
			if (this.storedSettingData) {
				this.settingData = normalizeConfig(this.storedSettingData, this.scriptSettingData);
				if (!isSameValue(this.settingData, this.storedSettingData)) {
					this.settingData.version = nowText();
					setValue(STORAGE_KEY, this.settingData);
				}
			} else this.settingData = normalizeConfig(this.scriptSettingData, this.scriptSettingData);
		}
		applyNormalized(normalized) {
			const plain = cloneValue(normalized);
			for (const key of Object.keys(this.settingData)) if (!Object.prototype.hasOwnProperty.call(plain, key)) delete this.settingData[key];
			Object.assign(this.settingData, plain);
			setLanguagePreference(this.settingData.language);
		}
		applySettings(next) {
			this.applyNormalized(normalizeConfig(next, this.scriptSettingData));
			this.settingData.version = nowText();
			this.storedSettingData = this.settingData;
			return setValue(STORAGE_KEY, this.settingData);
		}
		savePartial(partial) {
			if (!isPlainObject(partial)) return "memory";
			const next = Object.assign({}, this.settingData, partial);
			return this.applySettings(next);
		}
		reload() {
			const stored = getValue(STORAGE_KEY, null);
			if (!isPlainObject(stored)) return false;
			const normalized = normalizeConfig(stored, this.scriptSettingData);
			if (this.settingData && isSameValue(normalized, this.settingData)) return false;
			this.applyNormalized(normalized);
			this.storedSettingData = this.settingData;
			return true;
		}
		getMatchedRule() {
			return matchRule(location.href);
		}
	};
	var instance = null;
	function useSettings() {
		if (!instance) instance = reactive(new Settings());
		return instance;
	}
	var pageStyleEl = null;
	function addPageStyle(cssText) {
		if (!cssText) return;
		if (typeof _GM_addStyle === "function") try {
			_GM_addStyle(cssText);
			return;
		} catch (e) {
			console.warn("[SEJ] GM_addStyle 注入失败，回退到 <style>", e);
		}
		if (!pageStyleEl || !pageStyleEl.isConnected) {
			pageStyleEl = document.createElement("style");
			pageStyleEl.id = "sej-page-style";
			const nonce = getCSPNonce();
			if (nonce) pageStyleEl.setAttribute("nonce", nonce);
			(document.head || document.documentElement).appendChild(pageStyleEl);
		}
		pageStyleEl.textContent += `\n${cssText}`;
	}
	function getElementBySelector(selector) {
		if (!selector) return null;
		if (selector.startsWith("css;")) return document.querySelector(selector.slice(4));
		return document.evaluate(selector, document, null, 9, null).singleNodeValue;
	}
	function getInputTarget(rule) {
		const keyword = rule?.insertIntoDoc?.keyword;
		return typeof keyword === "function" ? keyword : getElementBySelector(keyword);
	}
	function getInsertTarget(rule) {
		const target = rule?.insertIntoDoc?.target;
		return typeof target === "function" ? target() : getElementBySelector(target);
	}
	function getInsertPositionLabel(rule) {
		return rule?.insertIntoDoc?.where?.toLowerCase();
	}
	var FORCE_CENTER_STYLE = `
  grid-column: 1 / -1;
  justify-self: center;
  left: auto;
  right: auto;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;
	function resolveRuleStyle(rule, settingData) {
		if (!rule?.style) return "";
		let style = rule.style;
		const searchMain = document.getElementById("SearchMain");
		if (searchMain && searchMain.style.marginLeft == "150px") style = rule.style_ZhihuChenglinz || style;
		if (settingData.center) style += FORCE_CENTER_STYLE;
		addStyle(`#sej-container { ${style} }`);
		return style;
	}
	function applyStylish(rule) {
		if (!rule?.stylish) return;
		addPageStyle(rule.stylish);
		const scriptElementStyles = rule.stylish.match(/#sej-container(-wrapper)?\s*\{[^}]+\}/g);
		if (scriptElementStyles) scriptElementStyles.forEach((ruleText) => addStyle(ruleText));
	}
	var SECOND_LEVEL_SUFFIXES = new Set([
		"com",
		"net",
		"org",
		"gov",
		"edu",
		"co",
		"ac",
		"or",
		"ne",
		"go",
		"adm"
	]);
	function withProtocol(raw) {
		const value = String(raw ?? "").trim();
		if (!value) return "";
		return value.includes("://") ? value : `https://${value}`;
	}
	function parseHost(raw) {
		const value = withProtocol(raw);
		if (!value) return "";
		try {
			return new URL(value).hostname.toLowerCase();
		} catch {
			return "";
		}
	}
	function siteOrigin(raw) {
		const value = withProtocol(raw);
		if (!value) return "";
		try {
			return new URL(value).origin;
		} catch {
			return "";
		}
	}
	function secondLevelSuffixLength(parts) {
		const last = parts[parts.length - 1] || "";
		const secondLast = (parts[parts.length - 2] || "").toLowerCase();
		return last.length === 2 && SECOND_LEVEL_SUFFIXES.has(secondLast) ? 2 : 1;
	}
	function titleFromUrl(raw) {
		let host = parseHost(raw).replace(/^www\./, "");
		if (!host) return "";
		if (/^\d+(\.\d+){3}$/.test(host)) return host;
		if (!host.includes(".")) return "";
		const parts = host.split(".").filter(Boolean);
		const label = parts[parts.length - secondLevelSuffixLength(parts) - 1] || parts[0];
		return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
	}
	function faviconFromUrl(raw) {
		const origin = siteOrigin(raw);
		if (!origin) return "";
		try {
			if (!new URL(origin).hostname.includes(".")) return "";
		} catch {
			return "";
		}
		return `${origin}/favicon.ico`;
	}
	function registrableDomain(raw) {
		const host = String(raw || "").trim().toLowerCase().replace(/\.$/, "");
		if (!host || !host.includes(".") || /^\d+(\.\d+){3}$/.test(host)) return host;
		const parts = host.split(".").filter(Boolean);
		if (parts.length <= 2) return parts.join(".");
		return parts.slice(-(secondLevelSuffixLength(parts) + 1)).join(".");
	}
	function hostFromUrl(raw) {
		return parseHost(raw).replace(/\.$/, "").replace(/^www\./, "");
	}
	var LINK_SCHEME = /^[a-z][a-z\d+.-]*:/i;
	var SPECIAL_LINK_SCHEME = /^(mailto|tel):/i;
	function normalizeKeywordUrl(raw) {
		const value = String(raw ?? "").trim();
		if (!value || /\s/.test(value)) return "";
		const candidate = SPECIAL_LINK_SCHEME.test(value) ? value : LINK_SCHEME.test(value) ? value : `https://${value}`;
		try {
			const url = new URL(candidate);
			if (/^https?:$/.test(url.protocol)) {
				const host = url.hostname;
				if (!host.includes(".") && host !== "localhost") return "";
				return url.href;
			}
			if (/^(mailto|tel):$/.test(url.protocol)) return url.href;
		} catch (e) {
			return "";
		}
		return "";
	}
	var FALLBACK_STYLE_ID = "sej-copy-fallback-style";
	function ensureFallbackStyle() {
		if (document.getElementById(FALLBACK_STYLE_ID)) return;
		const style = document.createElement("style");
		const nonce = getCSPNonce();
		if (nonce) style.setAttribute("nonce", nonce);
		style.id = FALLBACK_STYLE_ID;
		style.textContent = ".sej-copy-fallback{position:fixed;top:-9999px;left:-9999px;opacity:0;pointer-events:none;}";
		(document.head || document.documentElement).appendChild(style);
	}
	function copyWithTextarea(value) {
		if (typeof document === "undefined") return false;
		ensureFallbackStyle();
		const area = document.createElement("textarea");
		area.className = "sej-copy-fallback";
		area.value = value;
		area.setAttribute("readonly", "");
		document.body.appendChild(area);
		const selection = document.getSelection?.();
		const savedRange = selection?.rangeCount ? selection.getRangeAt(0) : null;
		area.select();
		area.setSelectionRange?.(0, value.length);
		let ok;
		try {
			ok = document.execCommand("copy");
		} catch (e) {
			ok = false;
		}
		area.remove();
		if (savedRange && selection) {
			selection.removeAllRanges();
			selection.addRange(savedRange);
		}
		return ok;
	}
	async function copyText(text) {
		const value = String(text ?? "");
		if (!value) return false;
		try {
			if (navigator.clipboard?.writeText) {
				await navigator.clipboard.writeText(value);
				return true;
			}
		} catch (e) {}
		return copyWithTextarea(value);
	}
	function extractKeyword(inputTarget) {
		if (typeof inputTarget === "function") return inputTarget();
		if (!inputTarget) return "";
		if (inputTarget.nodeName === "INPUT") return inputTarget.value;
		return inputTarget.textContent || "";
	}
	function encodeKeyword(keyword) {
		return encodeURIComponent(keyword);
	}
	function prepareJump(engine, keyword, { hideTheSameLink }) {
		let kw = keyword;
		if (hideTheSameLink === false) kw = kw.replace(/\bsite:[^\s]+\s*/g, "").trim();
		const encoded = encodeKeyword(kw);
		const targetURL = engine.url;
		const postIndex = targetURL ? targetURL.indexOf("$post$") : -1;
		if (postIndex !== -1) return {
			type: "post",
			action: targetURL.substring(0, postIndex),
			field: targetURL.substring(postIndex + 6),
			value: decodeURIComponent(encoded)
		};
		return {
			type: "get",
			url: targetURL ? targetURL.replaceAll("%s", encoded) : targetURL
		};
	}
	function isActionEngine(engine) {
		return Boolean(normalizeEngineAction(engine?.action));
	}
	async function performEngineAction(engine, keyword) {
		const action = normalizeEngineAction(engine?.action);
		if (action === "copy") return copyText(keyword);
		if (action === "open") {
			const url = normalizeKeywordUrl(keyword);
			if (!url) return false;
			if (shouldOpenInNewTab(engine)) {
				if (!openInNewTab(url)) window.open(url, "_blank");
			} else window.location.href = url;
			return true;
		}
		return false;
	}
	function shouldOpenInNewTab(engine, forceNewTab = false) {
		return Boolean(forceNewTab || engine.target !== "_self");
	}
	function openInNewTab(url) {
		if (!url) return false;
		try {
			_GM_openInTab(url, {
				active: true,
				insert: true,
				setParent: true
			});
			return true;
		} catch (e) {
			try {
				_GM_openInTab(url);
				return true;
			} catch (err) {
				console.warn("[SEJ] GM_openInTab 打开失败，回退到页面内跳转", err);
				return false;
			}
		}
	}
	function submitPostForm(action, field, value, targetName) {
		const form = document.createElement("form");
		form.method = "post";
		form.action = action;
		form.style.cssText = "display:none;";
		const input = document.createElement("input");
		input.type = "hidden";
		input.name = field;
		input.value = value;
		form.appendChild(input);
		if (targetName) form.target = targetName;
		document.body.appendChild(form);
		form.submit();
	}
	function performJump(engine, keyword, settingData, forceNewTab = false) {
		if (isActionEngine(engine)) {
			performEngineAction(engine, keyword);
			return true;
		}
		const result = prepareJump(engine, keyword, { hideTheSameLink: settingData.HideTheSameLink });
		const newTab = shouldOpenInNewTab(engine, forceNewTab);
		if (result.type === "post") {
			submitPostForm(result.action, result.field, result.value, newTab ? "_blank" : "_top");
			return true;
		}
		if (newTab) {
			if (openInNewTab(result.url)) return true;
			window.open(result.url, "_blank");
			return true;
		}
		window.location.href = result.url;
		return true;
	}
	function openAllEngines(engines, keyword, settingData, matchedRule) {
		for (const engine of engines) {
			if (engine.disable) continue;
			if (isActionEngine(engine)) {
				if (engine.action !== "copy") performEngineAction(engine, keyword);
				continue;
			}
			if (settingData?.HideTheSameLink && matchedRule?.url?.test(engine.url)) continue;
			performJump(engine, keyword, settingData || {}, true);
		}
	}
	function isEditableElement(el) {
		if (!el || el.nodeType !== 1) return false;
		if (el.isContentEditable) return true;
		if (el.tagName === "TEXTAREA") return true;
		return el.tagName === "INPUT" && typeof el.selectionStart === "number";
	}
	function getElementSelectionText(el) {
		if (!el || !isEditableElement(el)) return "";
		if (typeof el.selectionStart !== "number" || typeof el.selectionEnd !== "number") return "";
		return String(el.value ?? "").slice(el.selectionStart, el.selectionEnd);
	}
	function isOwnUiSelection(selection) {
		const host = ((selection?.anchorNode)?.getRootNode?.())?.host;
		if (!host || typeof host.matches !== "function") return false;
		return host.matches(HOST_SELECTOR);
	}
	function getSelectedText({ includeInput = false, doc = document } = {}) {
		const active = doc.activeElement;
		if (isEditableElement(active)) {
			if (!includeInput) return "";
			const text = getElementSelectionText(active);
			if (text) return text;
		}
		const selection = typeof doc.getSelection === "function" ? doc.getSelection() : null;
		if (!selection || selection.isCollapsed) return "";
		if (isOwnUiSelection(selection)) return "";
		return selection.toString();
	}
	var FIXED_GAP = 8;
	var VIEWPORT_GAP = 4;
	var NARROW_BAR_MAX = 640;
	var HEADER_CACHE_MS = 120;
	var MOBILE_UA_RE = /Android|iPhone|iPad|iPod|Windows Phone|BlackBerry|Opera Mini|IEMobile|Mobile/i;
	function clearTimers(timers) {
		timers.forEach(clearTimeout);
		timers.length = 0;
	}
	function getViewportMetrics() {
		const vw = document.documentElement.clientWidth;
		const mobile = MOBILE_UA_RE.test(navigator.userAgent || "");
		const vv = mobile ? window.visualViewport : null;
		return {
			vw,
			narrow: vw <= NARROW_BAR_MAX || mobile,
			viewLeft: vv?.offsetLeft ?? 0,
			viewWidth: vv?.width ?? vw
		};
	}
	function clearCenterOffset(el) {
		el.style.removeProperty("translate");
		delete el.dataset.sejCentered;
	}
	function centerInViewport(el, { viewLeft, viewWidth }) {
		const rect = el.getBoundingClientRect();
		const delta = Math.round(viewLeft + viewWidth / 2 - (rect.left + rect.width / 2));
		if (Math.abs(delta) <= 1) return;
		el.style.setProperty("translate", `${delta}px 0`, "important");
		el.dataset.sejCentered = "1";
	}
	function useFixedTop({ containerEl, isSelectSearch, inlineStyleBlocked, sitePatches, matchedRule, getResolvedStyle, getHost, getStackOffset, updateScrollHints, getInsertTarget, getInputTarget, forceCenter = false }) {
		let originalContainerDistanceTop = 0;
		let headerBottomCache = null;
		let scrollRaf = 0;
		let fixedTopTimers = [];
		let constrainTimers = [];
		function getAlignLeft(alignTo) {
			if (!alignTo) return null;
			const target = typeof alignTo === "string" ? document.querySelector(alignTo) : alignTo();
			if (!(target instanceof Element)) return null;
			const rect = target.getBoundingClientRect();
			return rect.width > 0 ? rect.left : null;
		}
		function constrainBarToViewport() {
			const el = containerEl.value;
			if (!el || isSelectSearch.value) return;
			clearCenterOffset(el);
			if (getHost().style.position === "fixed") return;
			const { vw, narrow, viewLeft, viewWidth } = getViewportMetrics();
			const { constrainToViewport, narrowFullWidth, narrowMaxWidthInPixels } = sitePatches;
			const alignTo = forceCenter ? null : sitePatches.alignTo;
			el.classList.toggle("sej-mobile-centered", narrow);
			if (!narrow && !constrainToViewport && !narrowFullWidth && !alignTo) return;
			[
				"max-width",
				"margin-left",
				"width",
				"left"
			].forEach((prop) => el.style.removeProperty(prop));
			const gap = VIEWPORT_GAP;
			const available = Math.max(120, viewWidth - 8);
			if (narrow && narrowFullWidth) {
				el.style.setProperty("width", `${available}px`, "important");
				if (narrowMaxWidthInPixels) el.style.maxWidth = `${available}px`;
			}
			let rect = el.getBoundingClientRect();
			if (rect.width > available) {
				el.style.maxWidth = `${available}px`;
				rect = el.getBoundingClientRect();
			}
			if (narrow) {
				centerInViewport(el, {
					viewLeft,
					viewWidth
				});
				return;
			}
			const alignLeft = getAlignLeft(alignTo);
			if (!alignLeft && !constrainToViewport) return;
			if (!alignLeft && rect.left >= gap && rect.right <= vw - gap) return;
			el.style.left = "auto";
			rect = el.getBoundingClientRect();
			const maxLeft = Math.max(gap, vw - gap - rect.width);
			const desiredLeft = alignLeft ?? rect.left;
			el.style.marginLeft = `${Math.round(Math.min(Math.max(desiredLeft, gap), maxLeft) - rect.left)}px`;
		}
		function getFixedHeaderBottom(barLeft, barWidth) {
			let bottom = 0;
			const consider = (el) => {
				if (!el || el === getHost() || el.dataset?.sejInstance) return;
				const style = getComputedStyle(el);
				if (style.position !== "fixed" && style.position !== "sticky") return;
				const rect = el.getBoundingClientRect();
				if (!(rect.right > barLeft && rect.left < barLeft + barWidth) && rect.width < window.innerWidth * .3) return;
				if (rect.top <= FIXED_GAP && rect.bottom > bottom && rect.bottom < window.innerHeight * .5) bottom = rect.bottom;
			};
			if (document.elementsFromPoint) {
				const points = [
					barLeft + barWidth / 2,
					barLeft - 8,
					barLeft + barWidth + 8,
					window.innerWidth / 2,
					window.innerWidth - 8
				];
				for (const x of points) {
					if (x < 0 || x > window.innerWidth - 1) continue;
					document.elementsFromPoint(x, FIXED_GAP).forEach(consider);
				}
			}
			let el = getInsertTarget();
			while (el && el !== document.documentElement) {
				consider(el);
				el = el.parentElement;
			}
			const getBottom = sitePatches.getFixedHeaderBottom;
			return getBottom ? getBottom({
				bottom,
				barLeft,
				barWidth,
				inputTarget: getInputTarget()
			}) : bottom;
		}
		function getFixedHeaderBottomCached(barLeft, barWidth) {
			const key = `${Math.round(barLeft)}:${Math.round(barWidth)}`;
			const now = performance.now();
			if (headerBottomCache?.key !== key || now - headerBottomCache.at >= HEADER_CACHE_MS) headerBottomCache = {
				key,
				bottom: getFixedHeaderBottom(barLeft, barWidth),
				at: now
			};
			return headerBottomCache.bottom;
		}
		const refreshFixedTop = () => fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
		function scheduleFixedTopRefresh() {
			clearTimers(fixedTopTimers);
			fixedTopTimers = [
				80,
				250,
				600
			].map((delay) => setTimeout(() => {
				if (getHost().style.position === "fixed") refreshFixedTop();
			}, delay));
		}
		function fixedToTop(fixedTopValue, color) {
			const container = containerEl.value;
			if (!container || inlineStyleBlocked) return;
			const resolvedStyle = getResolvedStyle();
			if (resolvedStyle.includes("sticky") || resolvedStyle.includes("fixed")) return;
			const host = getHost();
			const { vw, narrow: narrowViewport } = getViewportMetrics();
			const narrow = narrowViewport && Boolean(sitePatches.narrowFullWidth);
			const gap = VIEWPORT_GAP;
			const rect = container.getBoundingClientRect();
			const left = narrow ? gap : narrowViewport && !narrow ? Math.max(0, Math.round((vw - rect.width) / 2)) : Math.max(0, parseFloat(host.dataset.originalLeft) || rect.left);
			const width = narrow ? Math.max(120, vw - 8) : parseFloat(host.dataset.originalWidth) || rect.width;
			const headerBottom = getFixedHeaderBottomCached(left, width);
			const baseTop = headerBottom > 0 ? headerBottom + FIXED_GAP : FIXED_GAP;
			const threshold = Math.max(fixedTopValue || 0, headerBottom > 0 ? baseTop : 0);
			if (originalContainerDistanceTop - window.scrollY > threshold) {
				if (host.style.position !== "fixed") return;
				host.removeAttribute("style");
				container.removeAttribute("style");
				delete host.dataset.originalLeft;
				delete host.dataset.originalWidth;
				constrainBarToViewport();
				return;
			}
			clearCenterOffset(container);
			if (host.style.position !== "fixed") {
				host.dataset.originalLeft = narrow ? gap : rect.left;
				host.dataset.originalWidth = narrow ? width : rect.width;
				scheduleFixedTopRefresh();
			}
			host.style.display = "block";
			host.style.width = width > 0 ? `${Math.ceil(width)}px` : "max-content";
			host.style.maxWidth = narrow ? `${Math.ceil(width)}px` : `calc(100vw - ${left + 12}px)`;
			host.style.position = "fixed";
			host.style.top = `${Math.round(baseTop + getStackOffset())}px`;
			host.style.left = `${left}px`;
			host.style.zIndex = "100000";
			container.style.position = "static";
			container.style.left = "0";
			container.style.top = "0";
			container.style.gridColumn = "auto";
			container.style.margin = "0";
			if (narrow) container.style.setProperty("width", `${Math.ceil(width)}px`, "important");
			container.style.backgroundColor = color;
			updateScrollHints();
		}
		function onScroll() {
			if (scrollRaf) return;
			scrollRaf = requestAnimationFrame(() => {
				scrollRaf = 0;
				refreshFixedTop();
			});
		}
		function onWheel(e) {
			if (e.wheelDelta > 0) refreshFixedTop();
		}
		function onViewportResize() {
			headerBottomCache = null;
			if (getHost().style.position === "fixed") refreshFixedTop();
			else constrainBarToViewport();
			updateScrollHints();
		}
		function captureOriginTop() {
			if (!containerEl.value) return;
			originalContainerDistanceTop = containerEl.value.getBoundingClientRect().top + window.scrollY;
		}
		function scheduleConstrainCheck(delays = [180, 400]) {
			clearTimers(constrainTimers);
			constrainTimers = delays.map((delay) => setTimeout(() => {
				constrainBarToViewport();
				updateScrollHints();
			}, delay));
		}
		function dispose() {
			clearTimers(fixedTopTimers);
			clearTimers(constrainTimers);
			if (scrollRaf) cancelAnimationFrame(scrollRaf);
			scrollRaf = 0;
		}
		return {
			constrainBarToViewport,
			fixedToTop,
			onScroll,
			onWheel,
			onViewportResize,
			captureOriginTop,
			scheduleConstrainCheck,
			dispose
		};
	}
	function useScrollDrag({ scrollEl, threshold = 6 }) {
		let dragState = null;
		let suppressClickUntil = 0;
		let hintsRaf = 0;
		function updateScrollHints() {
			const el = scrollEl.value;
			if (!el) return;
			const maxScroll = el.scrollWidth - el.clientWidth;
			el.classList.toggle("sej-scroll-more-left", el.scrollLeft > 1);
			el.classList.toggle("sej-scroll-more-right", el.scrollLeft < maxScroll - 1);
		}
		function scheduleScrollHints() {
			if (hintsRaf) return;
			hintsRaf = requestAnimationFrame(() => {
				hintsRaf = 0;
				updateScrollHints();
			});
		}
		function onScrollPointerDown(e) {
			if (e.pointerType !== "mouse" || e.button !== 0) return;
			suppressClickUntil = 0;
			const el = scrollEl.value;
			if (!el || el.scrollWidth <= el.clientWidth) return;
			el.classList.remove("sej-scroll-dragging");
			dragState = {
				pointerId: e.pointerId,
				startX: e.clientX,
				startY: e.clientY,
				startLeft: el.scrollLeft,
				moved: false
			};
		}
		function onWindowPointerMove(e) {
			const state = dragState;
			if (!state || e.pointerId !== state.pointerId) return;
			if (e.pointerType !== "touch" && e.buttons === 0) {
				endScrollDrag(e);
				return;
			}
			const el = scrollEl.value;
			if (!el) return;
			const dx = e.clientX - state.startX;
			const dy = e.clientY - state.startY;
			if (!state.moved) {
				if (Math.abs(dx) < threshold || Math.abs(dx) <= Math.abs(dy)) return;
				state.moved = true;
				el.classList.add("sej-scroll-dragging");
			}
			el.scrollLeft = state.startLeft - dx;
			scheduleScrollHints();
		}
		function endScrollDrag(e) {
			const state = dragState;
			if (!state || e && e.pointerId !== state.pointerId) return;
			if (state.moved) {
				suppressClickUntil = performance.now() + 400;
				scrollEl.value?.classList.remove("sej-scroll-dragging");
			}
			dragState = null;
		}
		function onScrollClickCapture(e) {
			if (performance.now() >= suppressClickUntil) return;
			suppressClickUntil = 0;
			e.preventDefault();
			e.stopPropagation();
		}
		function dispose() {
			dragState = null;
			scrollEl.value?.classList.remove("sej-scroll-dragging");
			if (hintsRaf) cancelAnimationFrame(hintsRaf);
			hintsRaf = 0;
		}
		return {
			updateScrollHints,
			onScrollPointerDown,
			onWindowPointerMove,
			endScrollDrag,
			onScrollClickCapture,
			dispose
		};
	}
	var STACK_SYNC_DELAYS = [
		0,
		250,
		750,
		1500,
		3e3,
		6e3
	];
	function useStackSync({ delays = STACK_SYNC_DELAYS, refresh = refreshStackLayout } = {}) {
		let timers = [];
		function stop() {
			timers.forEach(clearTimeout);
			timers = [];
			window.removeEventListener("resize", refresh);
		}
		function start() {
			stop();
			window.addEventListener("resize", refresh);
			timers = delays.map((delay, index) => setTimeout(() => {
				refresh();
				if (index === delays.length - 1) window.removeEventListener("resize", refresh);
			}, delay));
		}
		return {
			start,
			stop
		};
	}
	var ICON_TIMEOUT = 4e3;
	var MAX_ICON_BYTES = 65536;
	var COMPRESS_START_SIZE = 64;
	var COMPRESS_MIN_SIZE = 16;
	var WEBP_QUALITY = .9;
	var EXTENSION_MIME = {
		".ico": "image/x-icon",
		".png": "image/png",
		".jpg": "image/jpeg",
		".jpeg": "image/jpeg",
		".gif": "image/gif",
		".webp": "image/webp",
		".svg": "image/svg+xml",
		".bmp": "image/bmp",
		".avif": "image/avif"
	};
	function getHeader(headers, name) {
		if (!headers) return "";
		const match = headers.match(new RegExp(`^${name}:\\s*(.+)$`, "im"));
		return match ? match[1].trim() : "";
	}
	function mimeFromUrl(url) {
		const path = url.split(/[?#]/)[0].toLowerCase();
		const dot = path.lastIndexOf(".");
		if (dot === -1) return "";
		return EXTENSION_MIME[path.slice(dot)] || "";
	}
	function arrayBufferToBase64(buffer) {
		const bytes = new Uint8Array(buffer);
		const CHUNK = 32768;
		let binary = "";
		for (let i = 0; i < bytes.length; i += CHUNK) binary += String.fromCharCode.apply(null, bytes.subarray(i, i + CHUNK));
		return btoa(binary);
	}
	function dataUrlBytes(dataUrl) {
		const comma = dataUrl.indexOf(",");
		if (comma === -1) return Infinity;
		const base64 = dataUrl.slice(comma + 1);
		const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;
		return Math.floor(base64.length * 3 / 4) - padding;
	}
	function trimDecimal(value) {
		return value.toFixed(1).replace(/\.0$/, "");
	}
	function dataUrlStorageBytes(dataUrl) {
		return /^data:/i.test(dataUrl) ? dataUrl.length : Infinity;
	}
	function formatIconSize(bytes) {
		if (!Number.isFinite(bytes) || bytes <= 0) return "";
		if (bytes < 1024) return `${Math.round(bytes)} B`;
		const kb = bytes / 1024;
		if (kb < 1024) return `${trimDecimal(kb)} KB`;
		return `${trimDecimal(kb / 1024)} MB`;
	}
	function loadImageElement(blob) {
		return new Promise((resolve) => {
			const url = URL.createObjectURL(blob);
			const image = new Image();
			image.onload = () => resolve({
				image,
				release: () => URL.revokeObjectURL(url)
			});
			image.onerror = () => {
				URL.revokeObjectURL(url);
				resolve(null);
			};
			image.src = url;
		});
	}
	async function decodeIcon(buffer, mime) {
		const blob = new Blob([buffer], { type: mime || "application/octet-stream" });
		if (typeof createImageBitmap === "function") try {
			const image = await createImageBitmap(blob);
			return {
				image,
				release: () => image.close?.()
			};
		} catch (e) {}
		return loadImageElement(blob);
	}
	function supportsWebp() {
		try {
			const canvas = document.createElement("canvas");
			canvas.width = 1;
			canvas.height = 1;
			return canvas.toDataURL("image/webp").startsWith("data:image/webp");
		} catch (e) {
			return false;
		}
	}
	async function compressIcon(buffer, mime) {
		const decoded = await decodeIcon(buffer, mime);
		if (!decoded) return "";
		const { image, release } = decoded;
		try {
			const sourceWidth = image.naturalWidth || image.width || 0;
			const sourceHeight = image.naturalHeight || image.height || 0;
			const hasSize = sourceWidth > 0 && sourceHeight > 0;
			const sourceSide = hasSize ? Math.max(sourceWidth, sourceHeight) : COMPRESS_START_SIZE;
			let maxSide = Math.min(COMPRESS_START_SIZE, sourceSide);
			const webp = supportsWebp();
			while (maxSide >= COMPRESS_MIN_SIZE) {
				const scale = maxSide / sourceSide;
				const width = hasSize ? Math.max(1, Math.round(sourceWidth * scale)) : maxSide;
				const height = hasSize ? Math.max(1, Math.round(sourceHeight * scale)) : maxSide;
				const canvas = document.createElement("canvas");
				canvas.width = width;
				canvas.height = height;
				const ctx = canvas.getContext("2d");
				if (!ctx) return "";
				ctx.drawImage(image, 0, 0, width, height);
				const attempts = webp ? [
					["image/webp", .9],
					["image/webp", .7],
					["image/png", void 0]
				] : [["image/png", void 0]];
				for (const [type, quality] of attempts) {
					const dataUrl = canvas.toDataURL(type, quality);
					if (dataUrlBytes(dataUrl) <= MAX_ICON_BYTES) return dataUrl;
				}
				maxSide = Math.floor(maxSide * .75);
			}
			return "";
		} catch (e) {
			console.warn("[SEJ] 图标压缩失败:", e);
			return "";
		} finally {
			release?.();
		}
	}
	async function toWebpIcon(buffer, mime) {
		if (mime === "image/webp" || mime === "image/gif" || mime === "image/svg+xml") return "";
		if (!supportsWebp()) return "";
		const decoded = await decodeIcon(buffer, mime);
		if (!decoded) return "";
		const { image, release } = decoded;
		try {
			const width = image.naturalWidth || image.width || 0;
			const height = image.naturalHeight || image.height || 0;
			if (!width || !height) return "";
			const canvas = document.createElement("canvas");
			canvas.width = width;
			canvas.height = height;
			const ctx = canvas.getContext("2d");
			if (!ctx) return "";
			ctx.drawImage(image, 0, 0, width, height);
			const dataUrl = canvas.toDataURL("image/webp", WEBP_QUALITY);
			if (!dataUrl.startsWith("data:image/webp")) return "";
			return dataUrlBytes(dataUrl) < buffer.byteLength ? dataUrl : "";
		} catch (e) {
			console.warn("[SEJ] 图标转码失败:", e);
			return "";
		} finally {
			release?.();
		}
	}
	function getRequestFn() {
		if (typeof _GM_xmlhttpRequest === "function") return _GM_xmlhttpRequest;
		const gm = typeof globalThis !== "undefined" ? globalThis.GM : void 0;
		if (gm && typeof gm["xmlHttpRequest"] === "function") return gm["xmlHttpRequest"].bind(gm);
		return null;
	}
	function requestIcon(url) {
		return new Promise((resolve) => {
			const request = getRequestFn();
			if (!request) {
				resolve({
					response: null,
					reason: t("favicon.noRequestApi")
				});
				return;
			}
			let settled = false;
			const finish = (result) => {
				if (settled) return;
				settled = true;
				resolve(result);
			};
			try {
				request({
					method: "GET",
					url,
					responseType: "arraybuffer",
					timeout: ICON_TIMEOUT,
					headers: { Accept: "image/*,*/*;q=0.8" },
					onload: (response) => finish({ response }),
					onerror: () => finish({
						response: null,
						reason: t("favicon.networkError")
					}),
					ontimeout: () => finish({
						response: null,
						reason: t("favicon.timeout")
					}),
					onabort: () => finish({
						response: null,
						reason: t("favicon.aborted")
					})
				});
			} catch (e) {
				finish({
					response: null,
					reason: t("favicon.requestError", { message: e?.message || e })
				});
			}
		});
	}
	var ACTION_ICONS = {
		copy: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='9' y='9' width='12' height='12' rx='2'/%3E%3Cpath d='M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1'/%3E%3C/svg%3E",
		open: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23808080' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M15 3h6v6'/%3E%3Cpath d='M10 14 21 3'/%3E%3Cpath d='M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6'/%3E%3C/svg%3E"
	};
	function getFaviconSrc(engine) {
		return engine?.faviconData || engine?.favicon || ACTION_ICONS[engine?.action] || "";
	}
	async function resolveFavicon(url) {
		const source = typeof url === "string" ? url.trim() : "";
		if (!/^https?:\/\//i.test(source)) return {
			data: "",
			reason: ""
		};
		const { response, reason } = await requestIcon(source);
		if (!response) return {
			data: "",
			reason: reason || t("favicon.requestFailed")
		};
		if (response.status < 200 || response.status >= 300) return {
			data: "",
			reason: `HTTP ${response.status || 0}`
		};
		const buffer = response.response;
		if (!buffer || buffer.byteLength === 0) return {
			data: "",
			reason: t("favicon.emptyResponse")
		};
		let mime = getHeader(response.responseHeaders, "content-type").split(";")[0].trim().toLowerCase();
		if (!mime || mime === "application/octet-stream") mime = mimeFromUrl(source);
		if (!/^image\//.test(mime)) return {
			data: "",
			reason: t("favicon.notImage", { type: mime || t("favicon.unknownType") })
		};
		try {
			if (buffer.byteLength > MAX_ICON_BYTES) {
				const compressed = await compressIcon(buffer, mime);
				if (!compressed) return {
					data: "",
					reason: t("favicon.compressFailed")
				};
				return {
					data: compressed,
					reason: "",
					bytes: buffer.byteLength
				};
			}
			const original = `data:${mime};base64,${arrayBufferToBase64(buffer)}`;
			return {
				data: await toWebpIcon(buffer, mime) || original,
				reason: "",
				bytes: buffer.byteLength
			};
		} catch (e) {
			console.warn("[SEJ] 图标转换失败:", source, e);
			return {
				data: "",
				reason: t("favicon.convertFailed")
			};
		}
	}
	async function embedFavicon(url) {
		const source = typeof url === "string" ? url.trim() : "";
		const { data } = await resolveFavicon(source);
		return data || source;
	}
	var _hoisted_1$10 = ["src"];
	var _sfc_main$12 = {
		__name: "EngineItem",
		props: {
			engine: {
				type: Object,
				required: true
			},
			showIcon: {
				type: Boolean,
				default: true
			}
		},
		emits: ["jump"],
		setup(__props, { emit: __emit }) {
			addStyle("\n.sej-engine {\n  padding: 0 13px;\n  transition:\n    background-color 0.08s ease-out,\n    opacity 0.08s ease-out;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  display: inline-flex;\n  gap: 8px;\n  align-items: center;\n  height: 2.6em;\n  box-sizing: border-box;\n  text-decoration: none !important;\n  color: var(--font-color-qxin) !important;\n  cursor: pointer;\n  white-space: nowrap;\n}\n\n#sej-container > .sej-engine,\n#sej-container .sej-category > .sej-engine {\n  height: 30px;\n  padding: 0 11px;\n  gap: 6px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 500;\n}\n\n.sej-drop-list a:visited,\n.sej-drop-list a:hover,\n.sej-engine a:visited,\n.sej-engine a:hover,\n#sej-container a:link,\n#sej-container a:visited,\n#sej-container a:hover {\n  color: var(--font-color-qxin);\n}\n\n.sej-engine:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\n\n.sej-engine:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n\n#sej-container .sej-engine:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n\n.sej-engine-icon {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  object-fit: cover;\n  display: inline-block;\n  margin: 0;\n}\n\n.sej-engine-icon:not([src]) {\n  display: none;\n}\n\n.sej-engine-icon {\n  pointer-events: none;\n}\n");
			const props = __props;
			const iconSrc = computed(() => props.showIcon ? getFaviconSrc(props.engine) : "");
			const emit = __emit;
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("a", {
					class: "sej-engine",
					onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emit("jump", __props.engine), ["prevent", "stop"]))
				}, [iconSrc.value ? (openBlock(), createElementBlock("img", {
					key: 0,
					class: "sej-engine-icon",
					src: iconSrc.value,
					alt: ""
				}, null, 8, _hoisted_1$10)) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(unref(localizeEngineName)(__props.engine.name)), 1)]);
			};
		}
	};
	var moveHandlers = new Set();
	var downHandlers = new Set();
	var pendingMove = null;
	var moveFrame = 0;
	function flushMove() {
		moveFrame = 0;
		const pending = pendingMove;
		pendingMove = null;
		if (!pending) return;
		for (const handler of moveHandlers) handler(pending.event, pending.path);
	}
	function onDocumentMove(event) {
		pendingMove = {
			event,
			path: typeof event.composedPath === "function" ? event.composedPath() : null
		};
		if (moveFrame) return;
		moveFrame = requestAnimationFrame(flushMove);
	}
	function onDocumentDown(event) {
		for (const handler of downHandlers) handler(event);
	}
	function subscribePointer({ onMove, onPointerDown } = {}) {
		if (onMove) {
			moveHandlers.add(onMove);
			if (moveHandlers.size === 1) document.addEventListener("mousemove", onDocumentMove, { passive: true });
		}
		if (onPointerDown) {
			downHandlers.add(onPointerDown);
			if (downHandlers.size === 1) document.addEventListener("pointerdown", onDocumentDown);
		}
		let subscribed = true;
		return () => {
			if (!subscribed) return;
			subscribed = false;
			if (onMove) {
				moveHandlers.delete(onMove);
				if (!moveHandlers.size) {
					document.removeEventListener("mousemove", onDocumentMove);
					pendingMove = null;
					if (moveFrame) cancelAnimationFrame(moveFrame);
					moveFrame = 0;
				}
			}
			if (onPointerDown) {
				downHandlers.delete(onPointerDown);
				if (!downHandlers.size) document.removeEventListener("pointerdown", onDocumentDown);
			}
		};
	}
	var _hoisted_1$9 = [
		"aria-expanded",
		"title",
		"onKeydown"
	];
	var _hoisted_2$8 = {
		key: 0,
		class: "sej-category-icon"
	};
	var _hoisted_3$8 = {
		key: 0,
		class: "sej-category-search-icon",
		"aria-hidden": "true"
	};
	var _hoisted_4$8 = ["src"];
	var pinnedCategory = null;
	var openCategory = null;
	var anchorSeq = 0;
	var _sfc_main$11 = {
		__name: "EngineCategory",
		props: {
			name: {
				type: String,
				required: true
			},
			engines: {
				type: Array,
				required: true
			},
			showIcon: {
				type: Boolean,
				default: true
			}
		},
		emits: ["jump", "jumpAll"],
		setup(__props, { emit: __emit }) {
			addStyle("\n.sej-category {\n  display: inline-flex;\n  align-items: center;\n  position: relative;\n}\n\n/*\n * 图标槽固定 16×16、不收缩、无外边距，与原 .sej-engine-icon 占位一致。\n * 分类触发项内的尺寸在这里定义，不再依赖 EngineItem 的样式是否已注入。\n */\n.sej-category-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  flex: 0 0 auto;\n  pointer-events: none;\n}\n\n.sej-category-icon-img {\n  display: block;\n  width: 16px;\n  height: 16px;\n  margin: 0;\n  object-fit: cover;\n}\n\n/* 一键搜索图标只是状态展示，所有操作都由所在的分类触发项承担 */\n.sej-category-search-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  color: var(--font-color-qxin);\n}\n\n.sej-category-search-icon svg {\n  display: block;\n  width: 14px;\n  height: 14px;\n  margin: 0;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n\n.sej-engine.sej-drop-list-trigger-shown {\n  background-color: var(--trigger-shown-qxin);\n}\n\n.sej-drop-list > .sej-engine {\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  height: 30px;\n  padding: 0 10px;\n  gap: 8px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 400;\n}\n\n.sej-drop-list > .sej-engine + .sej-engine {\n  margin-top: 1px;\n}\n\n.sej-drop-list {\n  /* 默认 fixed；正常文档流下会切换为 absolute，相对 Shadow 宿主定位 */\n  position: fixed;\n  display: none;\n  opacity: 0.2;\n  top: -10000px;\n  left: 0;\n  min-width: 128px;\n  padding: 4px;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  box-shadow: var(\n    --sej-shadow-menu,\n    0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)\n  );\n  background-color: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  transition: opacity 0.08s ease-out;\n  animation: sej-drop-menu-in 0.1s ease-out;\n  overflow: hidden;\n  border-radius: var(--sej-radius-menu, 12px);\n  border: 1px solid var(--border-color-sej);\n  user-select: none;\n}\n\n/*\n * 支持 CSS Anchor Positioning 时，面板锚定到自己的分类触发项：\n * 位置、页面滚动跟随、横向钳制和上翻全部由浏览器计算，不走 JS 坐标。\n */\n.sej-drop-list.sej-drop-list-anchored {\n  top: anchor(bottom);\n  left: clamp(\n    calc(8px + var(--sej-half-width, 64px)),\n    anchor(center),\n    calc(100vw - 8px - var(--sej-half-width, 64px))\n  );\n  translate: -50% 0;\n  margin-top: 2px;\n  position-try-fallbacks: --sej-drop-above;\n}\n\n@position-try --sej-drop-above {\n  /* 下方空间不足时翻到触发项上方 */\n  top: auto;\n  bottom: anchor(top);\n  margin-top: 0;\n  margin-bottom: 2px;\n}\n\n@keyframes sej-drop-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.98);\n  }\n}\n");
			const props = __props;
			const emit = __emit;
			const firstIconSrc = computed(() => props.showIcon && props.engines[0] ? getFaviconSrc(props.engines[0]) : "");
			const supportsAnchorPositioning = Boolean(typeof CSS !== "undefined" && CSS.supports?.("position-anchor: --sej-anchor") && CSS.supports?.("top: anchor(bottom)"));
			anchorSeq += 1;
			const anchorId = `--sej-anchor-${anchorSeq}`;
			const dropRoot = getDropRoot();
			const triggerEl = ref(null);
			const listEl = ref(null);
			const shown = ref(false);
			const active = ref(false);
			const pinned = ref(false);
			const top = ref(supportsAnchorPositioning ? "" : "-10000px");
			const left = ref(supportsAnchorPositioning ? "" : "0px");
			const listPosition = ref("fixed");
			const halfWidth = ref("64px");
			const pointer = {
				x: -1,
				y: -1
			};
			let hoverSuppressed = false;
			function hitTest(el) {
				if (!el) return false;
				const rect = el.getBoundingClientRect();
				return rect.width > 0 && rect.height > 0 && pointer.x >= rect.left && pointer.x <= rect.right && pointer.y >= rect.top && pointer.y <= rect.bottom;
			}
			function hitTestBridge() {
				const trigger = triggerEl.value;
				const list = listEl.value;
				if (!trigger || !list) return false;
				const t = trigger.getBoundingClientRect();
				const l = list.getBoundingClientRect();
				if (!l.width || !l.height) return false;
				const gapTop = Math.min(t.bottom, l.top);
				const gapBottom = Math.max(t.bottom, l.top);
				return pointer.x >= Math.min(t.left, l.left) && pointer.x <= Math.max(t.right, l.right) && pointer.y >= gapTop && pointer.y <= gapBottom;
			}
			function isPointerInside(path) {
				const trigger = triggerEl.value;
				const list = listEl.value;
				const overTrigger = hitTest(trigger) && (!path || path.includes(trigger));
				const overList = hitTest(list) && (!path || path.includes(list));
				return overTrigger || overList || hitTestBridge();
			}
			function isPointerOverTrigger(path) {
				const trigger = triggerEl.value;
				if (!trigger || !hitTest(trigger)) return false;
				if (!path) return true;
				return path.includes(trigger);
			}
			function getPositioningMode() {
				const trigger = triggerEl.value;
				if (!trigger) return "fixed";
				const container = trigger.closest("#sej-container");
				const containerPosition = container ? getComputedStyle(container).position : "";
				if (containerPosition === "fixed" || containerPosition === "sticky") return "fixed";
				if (getComputedStyle(getHost()).position === "static") return "fixed";
				return "absolute";
			}
			function measureAndPosition() {
				const trigger = triggerEl.value;
				const list = listEl.value;
				if (!trigger || !list) return;
				if (supportsAnchorPositioning) {
					listPosition.value = "fixed";
					top.value = "";
					left.value = "";
					halfWidth.value = `${list.getBoundingClientRect().width / 2}px`;
					return;
				}
				const mode = getPositioningMode();
				listPosition.value = mode;
				if (list.style.position !== mode) list.style.position = mode;
				const rect = trigger.getBoundingClientRect();
				const listRect = list.getBoundingClientRect();
				const listWidth = listRect.width;
				const listHeight = listRect.height;
				let originLeft = 0;
				let originTop = 0;
				if (mode === "absolute") {
					const host = getHost();
					const hostRect = host.getBoundingClientRect();
					originLeft = hostRect.left + host.clientLeft;
					originTop = hostRect.top + host.clientTop;
				}
				const GAP = 2;
				let posLeft = rect.left - originLeft - (listWidth - rect.width) / 2;
				posLeft = Math.max(8 - originLeft, Math.min(posLeft, window.innerWidth - listWidth - 8 - originLeft));
				let posTop = rect.bottom - originTop + GAP;
				if (rect.bottom + GAP + listHeight > window.innerHeight - 8 && rect.top - listHeight - GAP > 8) posTop = rect.top - listHeight - GAP - originTop;
				top.value = posTop + "px";
				left.value = posLeft + "px";
			}
			let scrollEl = null;
			function onScrollArea() {
				if (shown.value) measureAndPosition();
			}
			let pageListenersOn = false;
			function onPageViewportChange(event) {
				if (!shown.value) return;
				if (supportsAnchorPositioning) {
					if (event.type === "resize") measureAndPosition();
					return;
				}
				if (event.type === "scroll" && listPosition.value === "absolute") return;
				measureAndPosition();
			}
			function setPageListeners(on) {
				if (on === pageListenersOn) return;
				pageListenersOn = on;
				if (on) {
					window.addEventListener("scroll", onPageViewportChange, { passive: true });
					window.addEventListener("resize", onPageViewportChange, { passive: true });
					return;
				}
				window.removeEventListener("scroll", onPageViewportChange);
				window.removeEventListener("resize", onPageViewportChange);
			}
			function isDragScrolling() {
				return Boolean(scrollEl?.classList.contains("sej-scroll-dragging"));
			}
			async function show() {
				if (isDragScrolling()) return;
				if (shown.value) {
					active.value = true;
					return;
				}
				if (!triggerEl.value) return;
				if (openCategory && openCategory !== hide) openCategory();
				openCategory = hide;
				shown.value = true;
				setPageListeners(true);
				await nextTick();
				if (!shown.value) return;
				measureAndPosition();
				active.value = true;
			}
			function scheduleHide(path) {
				if (pinned.value || isPointerInside(path)) return;
				hide();
			}
			function hide() {
				if (openCategory === hide) openCategory = null;
				active.value = false;
				shown.value = false;
				setPageListeners(false);
			}
			function pin() {
				if (pinnedCategory && pinnedCategory !== unpin) pinnedCategory();
				pinnedCategory = unpin;
				pinned.value = true;
				show();
			}
			function unpin() {
				if (pinnedCategory === unpin) pinnedCategory = null;
				pinned.value = false;
				hoverSuppressed = true;
				hide();
			}
			function onTriggerClick() {
				if (pinned.value) {
					onTriggerAction();
					return;
				}
				pin();
			}
			function onHoverShow() {
				if (pinnedCategory && pinnedCategory !== unpin) return;
				if (hoverSuppressed) return;
				show();
			}
			function onHoverLeave() {
				hoverSuppressed = false;
				scheduleHide();
			}
			function onTriggerAction() {
				unpin();
				emit("jumpAll");
			}
			function onTriggerKeydown() {
				onTriggerClick();
			}
			function onEngineJump(engine) {
				unpin();
				emit("jump", engine);
			}
			function onDocMouseMove(e, path) {
				pointer.x = e.clientX;
				pointer.y = e.clientY;
				if (isDragScrolling()) {
					if (shown.value) hide();
					return;
				}
				const overTrigger = isPointerOverTrigger(path);
				if (!overTrigger) hoverSuppressed = false;
				if (!shown.value) {
					if (!overTrigger || hoverSuppressed) return;
					if (pinnedCategory && pinnedCategory !== unpin) return;
					show();
					return;
				}
				if (pinned.value || isPointerInside(path)) active.value = true;
				else scheduleHide(path);
			}
			function onDocPointerDown(e) {
				if (!pinned.value) return;
				const path = e.composedPath ? e.composedPath() : [];
				if (path.includes(triggerEl.value) || path.includes(listEl.value)) return;
				unpin();
			}
			let unsubscribePointer = null;
			onMounted(() => {
				unsubscribePointer = subscribePointer({
					onMove: onDocMouseMove,
					onPointerDown: onDocPointerDown
				});
				scrollEl = triggerEl.value?.closest(".sej-scroll") || null;
				scrollEl?.addEventListener("scroll", onScrollArea, { passive: true });
			});
			onBeforeUnmount(() => {
				if (openCategory === hide) openCategory = null;
				unsubscribePointer?.();
				unsubscribePointer = null;
				scrollEl?.removeEventListener("scroll", onScrollArea);
				scrollEl = null;
				setPageListeners(false);
				if (pinnedCategory === unpin) pinnedCategory = null;
			});
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("span", {
					class: "sej-category",
					onMouseenter: onHoverShow,
					onMouseleave: onHoverLeave
				}, [createBaseVNode("a", {
					ref_key: "triggerEl",
					ref: triggerEl,
					class: normalizeClass(["sej-engine sej-drop-list-trigger", { "sej-drop-list-trigger-shown": active.value }]),
					style: normalizeStyle({ anchorName: anchorId }),
					role: "button",
					tabindex: "0",
					"aria-haspopup": "true",
					"aria-expanded": shown.value,
					title: pinned.value ? unref(t)("jump.searchAll", { name: __props.name }) : null,
					onClick: withModifiers(onTriggerClick, ["prevent", "stop"]),
					onKeydown: [withKeys(withModifiers(onTriggerKeydown, ["prevent"]), ["enter"]), withKeys(withModifiers(onTriggerKeydown, ["prevent"]), ["space"])]
				}, [__props.showIcon || pinned.value ? (openBlock(), createElementBlock("span", _hoisted_2$8, [pinned.value ? (openBlock(), createElementBlock("span", _hoisted_3$8, [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
					viewBox: "0 0 16 16",
					"aria-hidden": "true"
				}, [
					createBaseVNode("path", { d: "M6.5 3H4.3A1.3 1.3 0 0 0 3 4.3v7.4A1.3 1.3 0 0 0 4.3 13h7.4a1.3 1.3 0 0 0 1.3-1.3V9.5" }),
					createBaseVNode("path", { d: "M9.6 2.6h3.8v3.8" }),
					createBaseVNode("path", { d: "M13.4 2.6 8.6 7.4" })
				], -1)])])) : firstIconSrc.value ? (openBlock(), createElementBlock("img", {
					key: 1,
					class: "sej-category-icon-img",
					src: firstIconSrc.value,
					alt: ""
				}, null, 8, _hoisted_4$8)) : createCommentVNode("", true)])) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(__props.name), 1)], 46, _hoisted_1$9), (openBlock(), createBlock(Teleport, { to: unref(dropRoot) }, [createBaseVNode("div", {
					ref_key: "listEl",
					ref: listEl,
					class: normalizeClass(["sej-drop-list", { "sej-drop-list-anchored": unref(supportsAnchorPositioning) }]),
					style: normalizeStyle({
						display: shown.value ? "block" : "none",
						position: listPosition.value,
						positionAnchor: unref(supportsAnchorPositioning) ? anchorId : void 0,
						"--sej-half-width": halfWidth.value,
						top: top.value,
						left: left.value,
						opacity: active.value ? 1 : .2,
						pointerEvents: shown.value ? "auto" : "none",
						transition: "opacity 0s",
						animation: "none",
						zIndex: 1e8
					}),
					onMouseenter: show,
					onMouseleave: scheduleHide
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.engines, (engine) => {
					return openBlock(), createBlock(_sfc_main$12, {
						key: engine.name + engine.url,
						engine,
						onJump: onEngineJump
					}, null, 8, ["engine"]);
				}), 128))], 38)], 8, ["to"]))], 32);
			};
		}
	};
	var _hoisted_1$8 = ["title", "aria-label"];
	var SETTING = "<svg width=\"16\" height=\"16\" class=\"icon\" id=\"sej-setting-button\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z\" fill=\"none\" stroke=\"var(--font-color-qxin)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"42\"/></svg>";
	var _sfc_main$10 = {
		__name: "SettingButton",
		setup(__props) {
			addStyle("\n#setBtn {\n  transition:\n    background-color 0.08s ease-out,\n    opacity 0.08s ease-out;\n  width: 30px;\n  height: 30px;\n  flex: 0 0 auto;\n  padding: 0;\n  border-radius: 8px;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  display: flex;\n  opacity: 0.65;\n}\n\nspan#setBtn:hover {\n  opacity: 1;\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\n\nspan#setBtn:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n\n#setBtn svg {\n  width: 16px;\n  height: 16px;\n  display: block;\n}\n\n#setBtn:focus-visible {\n  opacity: 1;\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n");
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("span", {
					id: "setBtn",
					role: "button",
					tabindex: "0",
					title: unref(t)("menu.settings"),
					"aria-label": unref(t)("menu.settings"),
					onClick: _cache[0] || (_cache[0] = (...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args)),
					onKeydown: [_cache[1] || (_cache[1] = withKeys(withModifiers((...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args), ["prevent"]), ["enter"])), _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args), ["prevent"]), ["space"]))],
					innerHTML: SETTING
				}, null, 40, _hoisted_1$8);
			};
		}
	};
	var _hoisted_1$7 = ["aria-hidden"];
	var _hoisted_2$7 = { class: "sej-scroll-viewport" };
	var _hoisted_3$7 = { class: "sej-category-title" };
	var _hoisted_4$7 = ["title", "aria-label"];
	var _hoisted_5$7 = ["title", "aria-label"];
	var PAGE_STEP_RATIO = .875;
	var PAGE_SCROLL_DURATION = 150;
	var _sfc_main$9 = {
		__name: "JumpBar",
		setup(__props) {
			addStyle("\n#sej-container {\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 2;\n  padding: 2px;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  transform-origin: top center;\n  animation: sejopen 0.14s ease-out;\n  color: var(--font-color-qxin);\n  background: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  width: max-content !important;\n  max-width: min(100%, calc(100vw - 8px));\n  box-sizing: border-box;\n  border-radius: var(--sej-radius-bar, 12px);\n  border: 1px solid var(--border-color-sej);\n  overflow: hidden;\n  box-shadow: var(\n    --sej-shadow-bar,\n    0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)\n  );\n  height: fit-content;\n  flex-wrap: nowrap;\n  justify-content: center;\n  user-select: none;\n}\n\n/*\n * 移动端由 JS 标记：抵消站点规则里的 left / grid-column 等横向偏移，\n * 再由 JS 的 translate 把跳转条对齐到可视视口中心。\n */\n#sej-container.sej-mobile-centered {\n  left: auto !important;\n  right: auto !important;\n  margin-left: auto !important;\n  margin-right: auto !important;\n  grid-column: 1 / -1 !important;\n  justify-self: center !important;\n}\n\n/* 滚动区容器：内容不足时让类别和设置按钮作为整体居中，溢出时再收缩滚动 */\n#sej-container > .sej-scroll-viewport {\n  position: relative;\n  display: flex;\n  flex: 0 1 auto;\n  min-width: 0;\n}\n\n/* 类别区单行显示，超出可用宽度时横向滚动；设置按钮固定在右侧 */\n#sej-container > .sej-scroll-viewport > .sej-scroll {\n  display: flex;\n  flex-wrap: nowrap;\n  align-items: center;\n  gap: 2px;\n  flex: 0 1 auto;\n  min-width: 0;\n  overflow-x: auto;\n  overflow-y: hidden;\n  overscroll-behavior-x: contain;\n  -webkit-overflow-scrolling: touch;\n  /*\n   * 不显示滚动条：桌面端用鼠标拖动，触屏不拦截手势，\n   * 让浏览器原生处理横向滚动，保留松手后的惯性滑动。\n   */\n  scrollbar-width: none;\n  -ms-overflow-style: none;\n  touch-action: auto;\n  cursor: grab;\n}\n\n#sej-container > .sej-scroll-viewport > .sej-scroll::-webkit-scrollbar {\n  display: none;\n  width: 0;\n  height: 0;\n}\n\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging,\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging * {\n  cursor: grabbing;\n}\n\n/* 左右仍有隐藏内容时，用渐隐边缘 + 圆形箭头提示可以继续拖动 */\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left {\n  -webkit-mask-image: linear-gradient(to right, transparent, #000 28px);\n  mask-image: linear-gradient(to right, transparent, #000 28px);\n}\n\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right {\n  -webkit-mask-image: linear-gradient(to left, transparent, #000 28px);\n  mask-image: linear-gradient(to left, transparent, #000 28px);\n}\n\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left.sej-scroll-more-right {\n  -webkit-mask-image: linear-gradient(\n    to right,\n    transparent,\n    #000 28px,\n    #000 calc(100% - 28px),\n    transparent\n  );\n  mask-image: linear-gradient(\n    to right,\n    transparent,\n    #000 28px,\n    #000 calc(100% - 28px),\n    transparent\n  );\n}\n\n/*\n * 箭头滚动按钮：点击滚动一屏。\n * 按钮本身铺满滚动区高度并加宽为透明命中区，鼠标从边缘移到箭头上时\n * 不会先掠过底下的分类/引擎条目；只绘制箭头，不带圆形底座。\n */\n#sej-container .sej-scroll-hint {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  z-index: 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 10px;\n  min-width: 0;\n  min-height: 0;\n  margin-left: 4px;\n  padding: 0;\n  box-sizing: border-box;\n  appearance: none;\n  color: var(--font-color-qxin);\n  background: none;\n  border: 0;\n  font: inherit;\n  line-height: 0;\n  cursor: pointer;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 0.16s ease-out;\n}\n\n/* 箭头本体 */\n#sej-container .sej-scroll-hint::after {\n  content: '';\n  position: relative;\n  z-index: 1;\n  width: 7px;\n  height: 7px;\n  border-top: 2px solid currentColor;\n  border-right: 2px solid currentColor;\n  border-radius: 1px;\n  opacity: 0.45;\n  transition: opacity 0.12s ease-out;\n  filter: drop-shadow(0 1px 2px hsla(0, 0%, 0%, 0.2));\n}\n\n#sej-container .sej-scroll-hint-left {\n  left: 0;\n}\n\n#sej-container .sej-scroll-hint-left::after {\n  margin-left: 2px;\n  transform: rotate(-135deg);\n}\n\n#sej-container .sej-scroll-hint-right {\n  right: 0;\n}\n\n#sej-container .sej-scroll-hint-right::after {\n  margin-right: 2px;\n  transform: rotate(45deg);\n}\n\n#sej-container .sej-scroll-hint:hover::after {\n  opacity: 0.8;\n  filter: drop-shadow(0 1px 4px hsla(0, 0%, 0%, 0.4));\n}\n\n#sej-container .sej-scroll-hint:active::after {\n  opacity: 1;\n}\n\n#sej-container .sej-scroll-hint:focus-visible {\n  outline: 2px solid var(--sej-accent);\n  outline-offset: -2px;\n}\n\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left ~ .sej-scroll-hint-left,\n#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right ~ .sej-scroll-hint-right {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n}\n\n#sej-container > #setBtn {\n  flex: 0 0 auto;\n}\n\n/* 滑词搜索样式 */\n#sej-container.selectSearch {\n  position: fixed;\n  top: 2px;\n  left: 0;\n  right: 0;\n  z-index: 99999999;\n  margin: 0 auto;\n  transform: translateY(calc(-100% - 10px));\n  visibility: hidden;\n  pointer-events: none;\n  transition:\n    transform 0.3s,\n    visibility 0s linear 0.3s;\n}\n\n#sej-container.selectSearch.sej-select-visible {\n  transform: none;\n  visibility: visible;\n  pointer-events: auto;\n  transition:\n    transform 0.3s,\n    visibility 0s linear 0s;\n}\n\n.sej-category-title {\n  font-weight: 600;\n  padding: 0 12px;\n  opacity: 0.8;\n}\n\n@keyframes sejopen {\n  0% {\n    transform: translateY(-4px) scale(0.98);\n    opacity: 0;\n  }\n  100% {\n    transform: none;\n    opacity: 1;\n  }\n}\n");
			const settings = useSettings();
			const data = settings.settingData;
			const matchedRule = settings.getMatchedRule();
			settings.activeRule = matchedRule;
			settings.barMounted = false;
			const sitePatches = matchedRule?.patches ?? {};
			const inlineStyleBlocked = isInlineStyleBlocked();
			const ready = ref(false);
			const isSelectSearch = ref(false);
			const selectionText = ref("");
			const barVisible = ref(false);
			const containerEl = ref(null);
			const scrollEl = ref(null);
			const containerClass = ref("rwl-exempt");
			const { updateScrollHints, onScrollPointerDown, onWindowPointerMove, endScrollDrag, onScrollClickCapture, dispose: disposeScrollDrag } = useScrollDrag({ scrollEl });
			const { start: startStackSync, stop: stopStackSync } = useStackSync();
			const { constrainBarToViewport, onScroll, onWheel, onViewportResize, captureOriginTop, scheduleConstrainCheck, dispose: disposeFixedTop } = useFixedTop({
				containerEl,
				isSelectSearch,
				inlineStyleBlocked,
				sitePatches,
				matchedRule,
				getResolvedStyle: () => resolvedStyle,
				getHost,
				getStackOffset,
				updateScrollHints,
				getInsertTarget: () => insertTarget,
				getInputTarget: () => inputTarget,
				forceCenter: Boolean(data.center)
			});
			let inputTarget = null;
			let insertTarget = null;
			let insertPosition = "beforeend";
			let resolvedStyle = "";
			const categories = computed(() => data.engineCategories.filter(([, , enabled]) => enabled).map(([name, key]) => ({
				name: localizeCategoryName(name, key),
				key,
				engines: (data.engineList[key] || []).filter((engine) => {
					if (engine.disable) return false;
					if (engine.action) return true;
					if (data.HideTheSameLink && matchedRule?.url?.test(engine.url)) return false;
					return true;
				})
			})).filter((category) => category.engines.length));
			function getCurrentKeyword() {
				if (isSelectSearch.value) return selectionText.value;
				return extractKeyword(inputTarget);
			}
			async function onJump(engine) {
				const keyword = getCurrentKeyword();
				if (isActionEngine(engine)) {
					if (await performEngineAction(engine, keyword)) showToast(t(engine.action === "copy" ? "action.copied" : "action.opened"));
					else showToast(t(engine.action === "copy" ? "action.copyFailed" : "action.openFailed"));
					return;
				}
				performJump(engine, keyword, data);
			}
			function onJumpAll(engines) {
				openAllEngines(engines, getCurrentKeyword(), data, matchedRule);
			}
			let scrollAnimRaf = 0;
			function easeInOutQuad(t) {
				return t < .5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2;
			}
			function cancelScrollAnim() {
				if (!scrollAnimRaf) return;
				cancelAnimationFrame(scrollAnimRaf);
				scrollAnimRaf = 0;
			}
			function animateScrollTo(el, target) {
				cancelScrollAnim();
				const from = el.scrollLeft;
				const distance = target - from;
				if (!distance) return;
				const startTime = performance.now();
				const step = (now) => {
					const progress = Math.min(1, (now - startTime) / PAGE_SCROLL_DURATION);
					el.scrollLeft = from + distance * easeInOutQuad(progress);
					scrollAnimRaf = progress < 1 ? requestAnimationFrame(step) : 0;
				};
				scrollAnimRaf = requestAnimationFrame(step);
			}
			function scrollBar(direction) {
				const el = scrollEl.value;
				if (!el) return;
				const maxScroll = el.scrollWidth - el.clientWidth;
				if (maxScroll <= 0) return;
				const step = direction * el.clientWidth * PAGE_STEP_RATIO;
				const target = Math.min(maxScroll, Math.max(0, el.scrollLeft + step));
				if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) {
					cancelScrollAnim();
					el.scrollLeft = target;
					return;
				}
				animateScrollTo(el, target);
			}
			function onBarPointerDown(e) {
				cancelScrollAnim();
				onScrollPointerDown(e);
			}
			function initSelectSearch() {
				if (inlineStyleBlocked) console.warn("[SEJ] 检测到 CSP 阻止内联样式，划词条仍会尝试显示");
				isSelectSearch.value = true;
				inputTarget = () => selectionText.value;
				insertTarget = document.body;
				insertPosition = "beforeend";
				return true;
			}
			function initTargets() {
				if (data.selectSearch && matchedRule?.enabled && matchedRule.selectSearchPriority) return initSelectSearch();
				if (matchedRule?.enabled) {
					inputTarget = getInputTarget(matchedRule);
					insertTarget = getInsertTarget(matchedRule);
					insertPosition = getInsertPositionLabel(matchedRule) || "beforeend";
					if (!inputTarget || !insertTarget) {
						console.warn(`[SEJ] 未找到输入框或插入位置：\n输入框：${inputTarget}\n插入位置：${insertTarget}`);
						if (data.selectSearch) return initSelectSearch();
						return false;
					}
					return true;
				}
				if (data.selectSearch) return initSelectSearch();
				console.info("[SEJ] 未启用搜索跳转，跳过初始化");
				return false;
			}
			function injectHost() {
				if (isSelectSearch.value) {
					insertHost(document.body, "beforeend");
					return;
				}
				insertHost(insertTarget, insertPosition);
				if (!resolvedStyle.includes("sticky") && !resolvedStyle.includes("fixed") && matchedRule?.wrapperClass) getHost().className += ` ${matchedRule.wrapperClass}`;
			}
			function onSelectionChange() {
				const text = getSelectedText({ includeInput: data.selectSearchInInput });
				if (!text) {
					barVisible.value = false;
					return;
				}
				selectionText.value = text;
				barVisible.value = true;
			}
			onMounted(async () => {
				if (!initTargets()) return;
				settings.barMounted = true;
				ready.value = true;
				if (isSelectSearch.value) onSelectionChange();
				if (matchedRule) {
					applyStylish(matchedRule);
					resolvedStyle = resolveRuleStyle(matchedRule, data) || "";
					if (matchedRule.class) containerClass.value = `rwl-exempt ${matchedRule.class}`;
				}
				await nextTick();
				injectHost();
				startStackSync();
				constrainBarToViewport();
				updateScrollHints();
				scheduleConstrainCheck();
				window.addEventListener("resize", onViewportResize);
				window.addEventListener("pointermove", onWindowPointerMove, { passive: true });
				window.addEventListener("pointerup", endScrollDrag);
				window.addEventListener("pointercancel", endScrollDrag);
				if (isSelectSearch.value) {
					document.addEventListener("selectionchange", onSelectionChange);
					document.addEventListener("mouseup", onSelectionChange);
					document.addEventListener("keyup", onSelectionChange);
				}
				if (data.fixedTop && matchedRule && !inlineStyleBlocked && !isSelectSearch.value) {
					captureOriginTop();
					if (data.fixedTopUpward) window.addEventListener("wheel", onWheel);
					else window.addEventListener("scroll", onScroll);
				}
			});
			onBeforeUnmount(() => {
				document.removeEventListener("selectionchange", onSelectionChange);
				document.removeEventListener("mouseup", onSelectionChange);
				document.removeEventListener("keyup", onSelectionChange);
				window.removeEventListener("scroll", onScroll);
				window.removeEventListener("wheel", onWheel);
				window.removeEventListener("resize", onViewportResize);
				window.removeEventListener("pointermove", onWindowPointerMove);
				window.removeEventListener("pointerup", endScrollDrag);
				window.removeEventListener("pointercancel", endScrollDrag);
				cancelScrollAnim();
				disposeScrollDrag();
				disposeFixedTop();
				stopStackSync();
			});
			return (_ctx, _cache) => {
				return ready.value ? (openBlock(), createElementBlock("div", {
					key: 0,
					ref_key: "containerEl",
					ref: containerEl,
					id: "sej-container",
					class: normalizeClass([containerClass.value, {
						selectSearch: isSelectSearch.value,
						"sej-select-visible": barVisible.value
					}]),
					"aria-hidden": isSelectSearch.value && !barVisible.value ? "true" : void 0
				}, [createBaseVNode("div", _hoisted_2$7, [
					createBaseVNode("div", {
						ref_key: "scrollEl",
						ref: scrollEl,
						class: "sej-scroll",
						onPointerdown: onBarPointerDown,
						onClickCapture: _cache[0] || (_cache[0] = (...args) => unref(onScrollClickCapture) && unref(onScrollClickCapture)(...args)),
						onDragstart: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"])),
						onWheelPassive: cancelScrollAnim,
						onScrollPassive: _cache[2] || (_cache[2] = (...args) => unref(updateScrollHints) && unref(updateScrollHints)(...args))
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (category) => {
						return openBlock(), createElementBlock(Fragment, { key: category.key }, [unref(inlineStyleBlocked) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [createBaseVNode("span", _hoisted_3$7, toDisplayString(category.name), 1), (openBlock(true), createElementBlock(Fragment, null, renderList(category.engines, (engine) => {
							return openBlock(), createBlock(_sfc_main$12, {
								key: engine.url + engine.name,
								engine,
								onJump
							}, null, 8, ["engine"]);
						}), 128))], 64)) : (openBlock(), createBlock(_sfc_main$11, {
							key: 1,
							name: category.name,
							engines: category.engines,
							"show-icon": unref(ui).categoryIcon,
							onJump,
							onJumpAll: ($event) => onJumpAll(category.engines)
						}, null, 8, [
							"name",
							"engines",
							"show-icon",
							"onJumpAll"
						]))], 64);
					}), 128))], 544),
					createBaseVNode("button", {
						type: "button",
						class: "sej-scroll-hint sej-scroll-hint-left",
						title: unref(t)("bar.scrollLeft"),
						"aria-label": unref(t)("bar.scrollLeft"),
						onClick: _cache[3] || (_cache[3] = withModifiers(($event) => scrollBar(-1), ["stop"]))
					}, null, 8, _hoisted_4$7),
					createBaseVNode("button", {
						type: "button",
						class: "sej-scroll-hint sej-scroll-hint-right",
						title: unref(t)("bar.scrollRight"),
						"aria-label": unref(t)("bar.scrollRight"),
						onClick: _cache[4] || (_cache[4] = withModifiers(($event) => scrollBar(1), ["stop"]))
					}, null, 8, _hoisted_5$7)
				]), createVNode(_sfc_main$10)], 10, _hoisted_1$7)) : createCommentVNode("", true);
			};
		}
	};
	function useAutoSave({ buildResult, getCurrent, settings, delay = 500 }) {
		const saving = ref(false);
		let autosaveTimer = null;
		let autosaveQueued = false;
		let autosaveWarnedLocal = false;
		let settingsChanged = false;
		function notifySaved() {
			showToast(t("toast.autoSaved"), 1500, null, { priority: -1 });
		}
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
			if (isSameValue(next, getCurrent())) return;
			const backend = settings.savePartial(next);
			if (backend === "memory") {
				showToast(t("toast.autoSaveFailed"), 5e3);
				return;
			}
			settingsChanged = true;
			if (backend === "local" && !autosaveWarnedLocal) {
				autosaveWarnedLocal = true;
				showToast(t("toast.autoSavedLocal"), 3e3);
			} else notifySaved();
		}
		function scheduleAutoSave() {
			if (saving.value) return;
			autosaveQueued = true;
			clearTimeout(autosaveTimer);
			autosaveTimer = setTimeout(flushAutoSave, delay);
		}
		function flushPending() {
			if (!autosaveQueued) return;
			clearTimeout(autosaveTimer);
			flushAutoSave();
		}
		function saveNow() {
			if (saving.value) return false;
			cancelAutoSave();
			saving.value = true;
			try {
				if (!isSameValue(buildResult(), getCurrent())) {
					const backend = settings.applySettings(buildResult());
					if (backend === "memory") {
						showToast(t("toast.saveFailed"), 5e3);
						return false;
					}
					settingsChanged = true;
					if (backend === "local") showToast(t("toast.savedLocal"), 4e3);
				}
				return true;
			} finally {
				saving.value = false;
			}
		}
		function markSettingsChanged() {
			settingsChanged = true;
		}
		function takeSettingsChanged() {
			const changed = settingsChanged;
			settingsChanged = false;
			return changed;
		}
		function dispose() {
			cancelAutoSave();
		}
		return {
			saving,
			cancelAutoSave,
			flushAutoSave,
			scheduleAutoSave,
			flushPending,
			saveNow,
			notifySaved,
			markSettingsChanged,
			takeSettingsChanged,
			dispose
		};
	}
	var CAPTURE$1 = { capture: true };
	function usePanelDrag({ layerEl, maskEl, layerStyle }) {
		let dragOffset = {
			x: 0,
			y: 0
		};
		let dragPointerId = null;
		function onDragMove(e) {
			if (dragPointerId != null && e.pointerId !== dragPointerId) return;
			const el = layerEl.value;
			if (!el) return;
			const mask = maskEl.value;
			const scrollLeft = mask ? mask.scrollLeft : 0;
			const scrollTop = mask ? mask.scrollTop : 0;
			const viewWidth = mask ? mask.clientWidth : window.innerWidth;
			const viewHeight = mask ? mask.clientHeight : window.innerHeight;
			const maxLeft = scrollLeft + Math.max(0, viewWidth - el.offsetWidth);
			const maxTop = scrollTop + Math.max(0, viewHeight - el.offsetHeight);
			layerStyle.value = {
				left: Math.min(Math.max(e.clientX - dragOffset.x + scrollLeft, scrollLeft), maxLeft) + "px",
				top: Math.min(Math.max(e.clientY - dragOffset.y + scrollTop, scrollTop), maxTop) + "px",
				margin: 0
			};
			if (e.cancelable) e.preventDefault();
		}
		function stopDrag(e) {
			if (e && dragPointerId != null && e.pointerId !== dragPointerId) return;
			dragPointerId = null;
			document.removeEventListener("pointermove", onDragMove, CAPTURE$1);
			document.removeEventListener("pointerup", stopDrag, CAPTURE$1);
			document.removeEventListener("pointercancel", stopDrag, CAPTURE$1);
		}
		function startDrag(e) {
			if (e.pointerType !== "touch" && e.button !== 0) return;
			if (e.pointerType === "touch" && e.isPrimary === false) return;
			if (e.target?.closest?.(".sej-panel-close")) return;
			const el = layerEl.value;
			if (!el) return;
			const rect = el.getBoundingClientRect();
			dragOffset = {
				x: e.clientX - rect.left,
				y: e.clientY - rect.top
			};
			dragPointerId = e.pointerId;
			document.addEventListener("pointermove", onDragMove, CAPTURE$1);
			document.addEventListener("pointerup", stopDrag, CAPTURE$1);
			document.addEventListener("pointercancel", stopDrag, CAPTURE$1);
		}
		function dispose() {
			stopDrag();
		}
		return {
			startDrag,
			stopDrag,
			dispose
		};
	}
	var ANIMATION_MS = 160;
	function createDragAnimator({ dragElements }) {
		const animations = new WeakMap();
		function snapshotRects() {
			const rects = new Map();
			for (const el of dragElements()) rects.set(el.dataset.sejDragEl, el.getBoundingClientRect());
			return rects;
		}
		function cancel() {
			for (const el of dragElements()) {
				const animation = animations.get(el);
				if (animation) {
					animation.cancel();
					animations.delete(el);
				}
			}
		}
		async function animateReorder(mutate) {
			const mediaQuery = window.matchMedia?.("(prefers-reduced-motion: reduce)");
			const reduceMotion = Boolean(mediaQuery?.matches);
			const before = reduceMotion ? null : snapshotRects();
			mutate();
			if (reduceMotion) return;
			await nextTick();
			cancel();
			const after = snapshotRects();
			for (const el of dragElements()) {
				const key = el.dataset.sejDragEl;
				const prev = before.get(key);
				const next = after.get(key);
				if (!prev || !next) continue;
				let dx = prev.left - next.left;
				let dy = prev.top - next.top;
				if (!dx && !dy) continue;
				const parent = el.parentElement?.closest("[data-sej-drag-el]");
				if (parent) {
					const parentPrev = before.get(parent.dataset.sejDragEl);
					const parentNext = after.get(parent.dataset.sejDragEl);
					if (parentPrev && parentNext) {
						dx -= parentPrev.left - parentNext.left;
						dy -= parentPrev.top - parentNext.top;
					}
				}
				const animation = el.animate([{ transform: `translate(${dx}px, ${dy}px)` }, { transform: "translate(0, 0)" }], {
					duration: ANIMATION_MS,
					easing: "cubic-bezier(0.2, 0, 0, 1)"
				});
				animations.set(el, animation);
				animation.addEventListener("finish", () => {
					if (animations.get(el) === animation) animations.delete(el);
				});
			}
		}
		return {
			snapshotRects,
			cancel,
			animateReorder
		};
	}
	var DRAG_EDGE = 40;
	var MAX_STEP = 14;
	function createDragAutoScroll({ getBody, getPoint, isDragging, onScroll }) {
		let frame = 0;
		function tick() {
			frame = 0;
			if (!isDragging()) return;
			const body = getBody();
			const point = getPoint();
			if (body && point) {
				const rect = body.getBoundingClientRect();
				const { x, y } = point;
				let dy = 0;
				if (x >= rect.left && x <= rect.right) {
					if (y < rect.top + DRAG_EDGE && y >= rect.top - DRAG_EDGE) dy = -Math.ceil((rect.top + DRAG_EDGE - y) / DRAG_EDGE * MAX_STEP);
					else if (y > rect.bottom - DRAG_EDGE && y <= rect.bottom + DRAG_EDGE) dy = Math.ceil((y - rect.bottom + DRAG_EDGE) / DRAG_EDGE * MAX_STEP);
				}
				if (dy) {
					body.scrollTop += dy;
					onScroll(x, y);
				}
			}
			if (isDragging()) frame = requestAnimationFrame(tick);
		}
		function start() {
			if (frame) return;
			frame = requestAnimationFrame(tick);
		}
		function stop() {
			if (frame) cancelAnimationFrame(frame);
			frame = 0;
		}
		return {
			start,
			stop
		};
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
		return {
			x,
			y
		};
	}
	function layoutRect(body, el) {
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
			bottom: top + height
		};
	}
	function createDragGeometry(getRoot) {
		function settingsBody() {
			return getRoot()?.querySelector("#sej-settings-body") || null;
		}
		function dragElements() {
			const root = getRoot();
			return root ? Array.from(root.querySelectorAll("[data-sej-drag-el]")) : [];
		}
		function categoryCards() {
			const body = settingsBody();
			return body ? Array.from(body.querySelectorAll(".iqxin-items[data-sej-drag-el^=\"category-\"]")) : [];
		}
		function sourceElement(type, ci, ei) {
			if (type === "category") return categoryCards()[ci] || null;
			const card = categoryCards()[ci];
			if (!card) return null;
			return card.querySelectorAll(":scope > .sejcon > .drag")[ei] || null;
		}
		function addItemIndexAt(x, y) {
			const cards = categoryCards();
			for (let i = 0; i < cards.length; i++) {
				const add = cards[i].querySelector(":scope > .sejcon > .iqxin-additem");
				if (!add) continue;
				const rect = layoutRect(settingsBody(), add);
				if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return i;
			}
			return -1;
		}
		function categoryIndexAt(x, y) {
			const cards = categoryCards();
			for (let i = 0; i < cards.length; i++) {
				const rect = layoutRect(settingsBody(), cards[i]);
				if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return i;
			}
			return -1;
		}
		function engineInsertIndex(card, y) {
			const items = Array.from(card.querySelectorAll(":scope > .sejcon > .drag"));
			for (let i = 0; i < items.length; i++) {
				const rect = layoutRect(settingsBody(), items[i]);
				if (y < rect.top + rect.height / 2) return i;
			}
			return items.length;
		}
		return {
			settingsBody,
			dragElements,
			categoryCards,
			sourceElement,
			addItemIndexAt,
			categoryIndexAt,
			engineInsertIndex
		};
	}
	function createDragGhost({ layerEl }) {
		let ghostEl = null;
		let offset = {
			x: 0,
			y: 0
		};
		function position(x, y) {
			if (!ghostEl) return;
			ghostEl.style.transform = `translate3d(${x - offset.x}px, ${y - offset.y}px, 0)`;
		}
		function show(sourceEl, rect, x, y, type) {
			offset = {
				x: x - rect.left,
				y: y - rect.top
			};
			const ghost = sourceEl.cloneNode(true);
			ghost.removeAttribute("id");
			ghost.removeAttribute("data-sej-drag-el");
			ghost.querySelectorAll("[data-sej-drag-el]").forEach((el) => {
				el.removeAttribute("data-sej-drag-el");
			});
			ghost.classList.remove("sej-drag-placeholder");
			ghost.classList.add("sej-drag-ghost", `sej-drag-ghost-${type}`);
			ghost.style.width = `${rect.width}px`;
			ghost.style.height = `${rect.height}px`;
			(layerEl.value || sourceEl.getRootNode()).appendChild(ghost);
			ghostEl = ghost;
			position(x, y);
		}
		function remove() {
			if (!ghostEl) return;
			ghostEl.remove();
			ghostEl = null;
		}
		function hasGhost() {
			return Boolean(ghostEl);
		}
		return {
			show,
			position,
			remove,
			hasGhost
		};
	}
	function captureOrder(categories) {
		return {
			categories: categories.map((category) => category._id),
			engines: Object.fromEntries(categories.map((category) => [category._id, category.engines.map((engine) => engine._id)]))
		};
	}
	function applyOrder(categories, snapshot) {
		const categoryById = new Map(categories.map((category) => [category._id, category]));
		const engineById = new Map();
		for (const category of categories) for (const engine of category.engines) engineById.set(engine._id, engine);
		for (const category of categories) {
			const ids = snapshot.engines[category._id] || [];
			category.engines.splice(0, category.engines.length, ...ids.map((id) => engineById.get(id)).filter(Boolean));
		}
		const ordered = snapshot.categories.map((id) => categoryById.get(id)).filter(Boolean);
		categories.splice(0, categories.length, ...ordered);
	}
	var CAPTURE = { capture: true };
	var DRAG_THRESHOLD = 4;
	var TOUCH_LONG_PRESS_MS = 280;
	var TOUCH_MOVE_SLOP = 10;
	function useDragSort({ draft, layerEl, nextId, scheduleAutoSave }) {
		const dragCtx = ref(null);
		const copyTargetCi = ref(null);
		let dragSnapshot = null;
		let dragDropped = false;
		let pressCtx = null;
		let pressTimer = 0;
		let suppressClick = false;
		const { settingsBody, sourceElement, categoryCards, categoryIndexAt, addItemIndexAt, engineInsertIndex, dragElements } = createDragGeometry(() => layerEl.value);
		const animator = createDragAnimator({ dragElements });
		const ghost = createDragGhost({ layerEl });
		const autoScroll = createDragAutoScroll({
			getBody: settingsBody,
			getPoint: () => pressCtx,
			isDragging: () => Boolean(dragCtx.value && pressCtx),
			onScroll: (x, y) => updateDragTarget(x, y)
		});
		function restoreOrder(snapshot) {
			animator.animateReorder(() => applyOrder(draft.categories, snapshot));
			dragCtx.value = null;
		}
		function onDragPointerDown(e, type, ci, ei = null) {
			resetStaleDrag();
			suppressClick = false;
			const touch = e.pointerType === "touch";
			if (touch && e.isPrimary === false) return;
			if (!touch && e.button !== 0) return;
			if (e.target?.closest?.(".iqxin-set-toggle, .sej-hover-delete")) return;
			const sourceEl = sourceElement(type, ci, ei);
			if (!sourceEl) return;
			pressCtx = {
				type,
				ci,
				ei: type === "engine" ? ei : null,
				sourceEl,
				pointerId: e.pointerId,
				startX: e.clientX,
				startY: e.clientY,
				x: e.clientX,
				y: e.clientY,
				touch,
				activated: !touch,
				started: false
			};
			document.addEventListener("pointermove", onDragPointerMove, CAPTURE);
			document.addEventListener("pointerup", onDragPointerUp, CAPTURE);
			document.addEventListener("pointercancel", onDragPointerCancel, CAPTURE);
			if (touch) pressTimer = setTimeout(() => {
				pressTimer = 0;
				const p = pressCtx;
				if (!p || p.started) return;
				p.activated = true;
				if (beginDrag()) blockTouchScroll(true);
				else finishPress();
			}, TOUCH_LONG_PRESS_MS);
		}
		function clearPressTimer() {
			if (!pressTimer) return;
			clearTimeout(pressTimer);
			pressTimer = 0;
		}
		function onBlockTouchMove(e) {
			if (dragCtx.value) e.preventDefault();
		}
		function blockTouchScroll(block) {
			document.removeEventListener("touchmove", onBlockTouchMove, CAPTURE);
			if (block) document.addEventListener("touchmove", onBlockTouchMove, {
				passive: false,
				capture: true
			});
		}
		function resetStaleDrag() {
			if (!pressCtx && !ghost.hasGhost()) return;
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
			} else finishPress();
		}
		function detachDragListeners() {
			document.removeEventListener("pointermove", onDragPointerMove, CAPTURE);
			document.removeEventListener("pointerup", onDragPointerUp, CAPTURE);
			document.removeEventListener("pointercancel", onDragPointerCancel, CAPTURE);
			blockTouchScroll(false);
		}
		function beginDrag() {
			const p = pressCtx;
			const category = draft.categories[p.ci];
			if (!category) return false;
			const item = p.type === "category" ? category : category.engines[p.ei];
			if (!item) return false;
			const rect = p.sourceEl.getBoundingClientRect();
			dragSnapshot = captureOrder(draft.categories);
			dragDropped = false;
			copyTargetCi.value = null;
			ghost.show(p.sourceEl, rect, p.x, p.y, p.type);
			dragCtx.value = {
				type: p.type,
				ci: p.ci,
				ei: p.ei,
				key: p.type === "category" ? category.key : item._id
			};
			p.started = true;
			if (p.touch) try {
				navigator.vibrate?.(12);
			} catch (e) {}
			autoScroll.start();
			return true;
		}
		function onDragPointerMove(e) {
			const p = pressCtx;
			if (!p || e.pointerId !== p.pointerId) return;
			p.x = e.clientX;
			p.y = e.clientY;
			if (!p.started) {
				const distance = Math.hypot(p.x - p.startX, p.y - p.startY);
				if (p.touch) {
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
			ghost.position(p.x, p.y);
			updateDragTarget(p.x, p.y);
		}
		function updateDragTarget(x, y) {
			const ctx = dragCtx.value;
			if (!ctx) return;
			const body = settingsBody();
			if (!body) return;
			const bodyRect = body.getBoundingClientRect();
			const inside = x >= bodyRect.left && x <= bodyRect.right && y >= bodyRect.top && y <= bodyRect.bottom;
			dragDropped = inside;
			if (!inside) {
				copyTargetCi.value = null;
				return;
			}
			if (ctx.type === "engine") {
				const copyCi = addItemIndexAt(x, y);
				if (copyCi >= 0) {
					copyTargetCi.value = copyCi;
					return;
				}
			}
			copyTargetCi.value = null;
			const ci = categoryIndexAt(x, y);
			if (ci < 0) return;
			if (ctx.type === "category") {
				moveCategoryTo(ci);
				return;
			}
			const card = categoryCards()[ci];
			if (card) moveEngineTo(ci, engineInsertIndex(card, y));
		}
		function copyEngineToCategory() {
			const ctx = dragCtx.value;
			if (!ctx || ctx.type !== "engine") return;
			const targetCi = copyTargetCi.value;
			const source = draft.categories[ctx.ci]?.engines?.[ctx.ei];
			const targetKey = draft.categories[targetCi]?.key;
			const copy = source ? {
				...cloneValue(source),
				_id: nextId()
			} : null;
			if (dragSnapshot) {
				restoreOrder(dragSnapshot);
				dragSnapshot = null;
			}
			if (copy) {
				const target = draft.categories.find((category) => category.key === targetKey);
				if (target) {
					target.engines.push(copy);
					scheduleAutoSave();
					showToast(t("toast.copied", { name: localizeEngineName(source.name) }));
				}
			}
		}
		function finishDrag() {
			const snapshot = dragSnapshot;
			if (dragCtx.value?.type === "engine" && copyTargetCi.value != null) copyEngineToCategory();
			else if (dragDropped) scheduleAutoSave();
			else if (snapshot) restoreOrder(snapshot);
			dragSnapshot = null;
			dragDropped = false;
			cleanupDrag();
			suppressClick = true;
			finishPress();
		}
		function cleanupDrag() {
			autoScroll.stop();
			ghost.remove();
			if (pressCtx?.sourceEl) pressCtx.sourceEl.classList.remove("sej-drag-placeholder");
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
		function consumeClickSuppression() {
			if (!suppressClick) return false;
			suppressClick = false;
			return true;
		}
		function moveCategoryTo(index) {
			const ctx = dragCtx.value;
			if (!ctx || ctx.type !== "category" || ctx.ci === index) return;
			const category = draft.categories[ctx.ci];
			if (!category) return;
			animator.animateReorder(() => {
				draft.categories.splice(ctx.ci, 1);
				draft.categories.splice(index, 0, category);
				ctx.ci = index;
			});
		}
		function moveEngineTo(ci, insertBefore) {
			const ctx = dragCtx.value;
			if (!ctx || ctx.type !== "engine") return;
			const source = draft.categories[ctx.ci];
			const target = draft.categories[ci];
			const engine = source?.engines?.[ctx.ei];
			if (!engine || !target) return;
			const from = ctx.ei;
			let insert = Math.max(0, Math.min(insertBefore, target.engines.length));
			if (source === target) {
				if (insert === from || insert === from + 1) return;
				if (from < insert) insert -= 1;
			}
			animator.animateReorder(() => {
				source.engines.splice(from, 1);
				target.engines.splice(insert, 0, engine);
				ctx.ci = ci;
				ctx.ei = insert;
			});
		}
		function dispose() {
			detachDragListeners();
			clearPressTimer();
			autoScroll.stop();
			ghost.remove();
			dragCtx.value = null;
			copyTargetCi.value = null;
		}
		return {
			dragCtx,
			copyTargetCi,
			onDragPointerDown,
			onWindowBlur,
			consumeClickSuppression,
			dispose
		};
	}
	var FOCUSABLE_SELECTOR = [
		"a[href]",
		"button:not([disabled])",
		"input:not([disabled]):not([type=\"hidden\"])",
		"select:not([disabled])",
		"textarea:not([disabled])",
		"[tabindex]:not([tabindex=\"-1\"])"
	].join(",");
	function isVisible(el) {
		if (el.hidden || el.getAttribute("aria-hidden") === "true") return false;
		const style = getComputedStyle(el);
		return style.display !== "none" && style.visibility !== "hidden";
	}
	function useModalA11y({ containerEl, onClose, initialFocus }) {
		let container = null;
		let previousFocus = null;
		function focusableElements() {
			if (!container) return [];
			return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isVisible);
		}
		function onKeydown(e) {
			if (e.key === "Escape") {
				if (e.defaultPrevented) return;
				e.preventDefault();
				e.stopPropagation();
				onClose?.();
				return;
			}
			if (e.key !== "Tab") return;
			const items = focusableElements();
			if (!items.length) {
				e.preventDefault();
				container?.focus();
				return;
			}
			const first = items[0];
			const last = items[items.length - 1];
			const active = document.activeElement;
			const inside = container?.contains(active);
			if (e.shiftKey) {
				if (!inside || active === first) {
					e.preventDefault();
					last.focus();
				}
			} else if (!inside || active === last) {
				e.preventDefault();
				first.focus();
			}
		}
		onMounted(async () => {
			container = containerEl.value;
			previousFocus = document.activeElement;
			if (!container) return;
			if (!container.hasAttribute("tabindex")) container.setAttribute("tabindex", "-1");
			container.addEventListener("keydown", onKeydown);
			await nextTick();
			(initialFocus?.value || focusableElements()[0] || container)?.focus?.();
		});
		onBeforeUnmount(() => {
			container?.removeEventListener("keydown", onKeydown);
			if (previousFocus?.isConnected && typeof previousFocus.focus === "function") previousFocus.focus();
		});
	}
	function engineUrlKey(url) {
		const value = typeof url === "string" ? url.trim() : "";
		if (!value) return "";
		return value.replace(/^([a-z][a-z\d+.-]*:\/\/)?([^/?#]+)/i, (match, scheme = "", host) => scheme.toLowerCase() + host.toLowerCase()).replace(/\/+$/, "");
	}
	function engineKey(engine) {
		const action = normalizeEngineAction(engine?.action);
		return action ? `action:${action}` : engineUrlKey(engine?.url);
	}
	function categoryNameKey(name) {
		return typeof name === "string" ? name.trim().toLowerCase() : "";
	}
	function uniqueCategoryKey(baseKey, usedKeys) {
		let key = typeof baseKey === "string" && baseKey ? baseKey : "imported";
		if (!usedKeys.has(key)) return key;
		let index = 2;
		while (usedKeys.has(`${key}-${index}`)) index += 1;
		return `${key}-${index}`;
	}
	function mergeIntoCategories(categories, imported, createId) {
		const incoming = readConfig(imported);
		if (!incoming) return null;
		const stats = {
			engines: 0,
			categories: 0,
			skipped: 0
		};
		const usedKeys = new Set(categories.map((category) => category.key));
		for (const [name, key, enabled] of incoming.engineCategories) {
			const engines = incoming.engineList[key] || [];
			const target = categories.find((category) => category.key === key) || categories.find((category) => categoryNameKey(category.name) === categoryNameKey(name));
			const seen = new Set((target ? target.engines : []).map((engine) => engineKey(engine)).filter(Boolean));
			const additions = [];
			for (const engine of engines) {
				const urlKey = engineKey(engine);
				if (!urlKey || seen.has(urlKey)) {
					stats.skipped += 1;
					continue;
				}
				seen.add(urlKey);
				additions.push({
					...engine,
					_id: createId()
				});
			}
			if (!additions.length) continue;
			if (target) target.engines.push(...additions);
			else {
				const newKey = uniqueCategoryKey(key, usedKeys);
				usedKeys.add(newKey);
				categories.push({
					_id: createId(),
					name,
					key: newKey,
					enabled: Boolean(enabled),
					engines: additions
				});
				stats.categories += 1;
			}
			stats.engines += additions.length;
		}
		return stats;
	}
	function useConfigIO({ draft, nextId, buildResult, getCurrent, getSettings, refreshDraft, cancelAutoSave, markSettingsChanged, notifySaved, resetRemoteSynced }) {
		const configOpen = ref(false);
		const pendingImport = ref(null);
		const configFileInput = ref(null);
		const configText = computed(() => configToText(getCurrent()));
		const defaultConfigText = computed(() => configToText(getSettings().scriptSettingData));
		function openConfig() {
			pendingImport.value = null;
			configOpen.value = true;
		}
		function pickConfigFile() {
			configFileInput.value?.click();
		}
		async function importConfigFile(event) {
			const file = event.target.files?.[0];
			event.target.value = "";
			if (!file) return;
			try {
				pendingImport.value = JSON.parse(await file.text());
				configOpen.value = true;
			} catch (e) {
				alert(t("config.parseFailed"));
			}
		}
		function exportConfig() {
			const blob = new Blob([configText.value], { type: "application/json;charset=utf-8" });
			const url = URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = url;
			link.download = "SearchEngineJump.json";
			document.body.appendChild(link);
			link.click();
			link.remove();
			setTimeout(() => URL.revokeObjectURL(url), 1e3);
			showToast(t("config.exported"));
		}
		function parseConfigInput(input) {
			if (typeof input !== "string") return input;
			try {
				return JSON.parse(input);
			} catch (e) {
				alert(t("config.parseFailed"));
				return null;
			}
		}
		function mergePreview(input, silent = false) {
			const parsed = parseConfigInput(input);
			if (!parsed) return "";
			const categories = draft.categories.map((cat) => ({
				...cat,
				engines: cat.engines.map((engine) => ({ ...engine }))
			}));
			const stats = mergeIntoCategories(categories, parsed, nextId);
			if (!stats) {
				if (!silent) alert(t("config.mergeUnrecognized"));
				return "";
			}
			if (!stats.engines) {
				if (!silent) showToast(t("toast.mergeNothing"), 3e3);
			} else {
				const parts = [t("toast.mergedEngines", { count: stats.engines })];
				if (stats.categories) parts.push(t("toast.mergedCategories", { count: stats.categories }));
				if (stats.skipped) parts.push(t("toast.mergedSkipped", { count: stats.skipped }));
				if (!silent) showToast(t("toast.mergeImported", { summary: parts.join(t("toast.listSeparator")) }), 4e3);
			}
			return configToText(buildResult(categories));
		}
		function applyConfig(text) {
			const parsed = parseConfigInput(text);
			if (!parsed) return;
			cancelAutoSave();
			resetRemoteSynced();
			const backend = getSettings().applySettings(parsed);
			pendingImport.value = null;
			refreshDraft();
			if (backend === "memory") showToast(t("toast.saveFailed"), 5e3);
			else {
				markSettingsChanged();
				notifySaved();
			}
			configOpen.value = false;
		}
		function cancelConfig() {
			pendingImport.value = null;
			configOpen.value = false;
		}
		return {
			configOpen,
			pendingImport,
			configFileInput,
			configText,
			defaultConfigText,
			openConfig,
			pickConfigFile,
			importConfigFile,
			exportConfig,
			mergePreview,
			applyConfig,
			cancelConfig
		};
	}
	function useEngineIcons({ draft, scheduleAutoSave, isDisposed }) {
		const loadingIcons = ref(false);
		const iconLoadTokens = new Map();
		function findEngineById(id) {
			for (const category of draft.categories) {
				const engine = category.engines.find((item) => item._id === id);
				if (engine) return engine;
			}
			return null;
		}
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
			if (!engine || engine.favicon !== url) return;
			if (!data) {
				console.warn("[SEJ] 后台获取图标失败:", url, reason || t("favicon.backgroundFailed"));
				return;
			}
			engine.faviconData = data;
			scheduleAutoSave();
		}
		function refreshIconInBackground(engine, url) {
			if (engine.action) return;
			const token = bumpIconToken(engine._id);
			if (!engine.faviconData) loadFaviconInBackground(engine._id, url, token);
		}
		function getICON(olink) {
			const siteURL = siteOrigin(olink);
			const iconSetting = ui.iconSource;
			const template = isNaN(iconSetting) ? iconSetting : "";
			if (!template && !siteURL) return "";
			return (template || siteURL + "/favicon.ico").replace("%s", siteURL);
		}
		function remoteFaviconEngines() {
			const list = [];
			for (const category of draft.categories) for (const engine of category.engines) if (!engine.faviconData && /^https?:\/\//i.test(engine.favicon || "")) list.push(engine);
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
					} else failed++;
				}
			};
			const workers = Array.from({ length: Math.min(6, pending.length) }, () => worker());
			await Promise.all(workers);
			return {
				converted,
				failed
			};
		}
		async function loadAllIcons() {
			if (loadingIcons.value) return;
			if (!remoteFaviconEngines().length) return;
			loadingIcons.value = true;
			try {
				const { converted, failed } = await embedRemoteFavicons();
				if (isDisposed() || !converted) return;
				scheduleAutoSave();
				const parts = [t("toast.embeddedIcons", { count: converted })];
				if (failed) parts.push(t("toast.iconsFailed", { count: failed }));
				showToast(`${parts.join(t("toast.listSeparator"))}${t("toast.autoSavedSuffix")}`, 4e3);
			} finally {
				loadingIcons.value = false;
			}
		}
		return {
			loadingIcons,
			getICON,
			refreshIconInBackground,
			loadAllIcons
		};
	}
	var UNDO_DURATION = 5e3;
	function useUndoDelete({ draft, scheduleAutoSave, isDialogOpen, closeCategoryDialog }) {
		const undoStack = [];
		function displayCategoryName(category) {
			if (!category) return "";
			return localizeCategoryName(category.name, category.key);
		}
		function pushUndo(entry) {
			undoStack.push(entry);
			if (undoStack.length > 20) undoStack.shift();
		}
		function canUndo() {
			return undoStack.length > 0;
		}
		function undoDelete() {
			if (isDialogOpen()) {
				showToast(t("toast.dialogOpen"));
				return;
			}
			const entry = undoStack.pop();
			if (!entry) return;
			if (entry.type === "category") {
				const index = Math.min(entry.index, draft.categories.length);
				draft.categories.splice(index, 0, entry.item);
			} else {
				const category = draft.categories.find((item) => item.key === entry.categoryKey);
				if (!category) {
					undoStack.push(entry);
					showToast(t("toast.categoryMissing"));
					return;
				}
				const index = Math.min(entry.index, category.engines.length);
				category.engines.splice(index, 0, entry.item);
			}
			closeCategoryDialog();
			scheduleAutoSave();
			showToast(t("toast.undoDelete", { label: entry.label }));
		}
		function notifyDeleted(entry, label) {
			pushUndo({
				...entry,
				label
			});
			showToast(t("toast.deleted", { label }), UNDO_DURATION, {
				label: t("common.undo"),
				onClick: undoDelete
			});
		}
		function deleteCategory(index) {
			const category = draft.categories[index];
			if (!category || isBuiltinCategory(category)) return;
			notifyDeleted({
				type: "category",
				index,
				item: cloneValue(category)
			}, t("category.label", { name: displayCategoryName(category) }));
			draft.categories.splice(index, 1);
			scheduleAutoSave();
		}
		function deleteEngine(ci, ei) {
			const category = draft.categories[ci];
			if (!category || isBuiltinCategory(category)) return;
			const engine = category.engines?.[ei];
			if (!engine) return;
			notifyDeleted({
				type: "engine",
				categoryKey: category.key,
				index: ei,
				item: cloneValue(engine)
			}, t("engine.label", { name: localizeEngineName(engine.name) }));
			category.engines.splice(ei, 1);
			scheduleAutoSave();
		}
		return {
			deleteCategory,
			deleteEngine,
			undoDelete,
			canUndo
		};
	}
	function useSettingsDialogs({ draft, nextId, categoryDialog, engineDialog, engineSaving, scheduleAutoSave, deleteCategory, deleteEngine, refreshIconInBackground, consumeClickSuppression }) {
		function openCategoryDialog(index) {
			if (consumeClickSuppression()) return;
			categoryDialog.value = { index };
		}
		function submitCategory(name) {
			const ctx = categoryDialog.value;
			if (!ctx) return;
			const category = draft.categories[ctx.index];
			if (category) {
				const nextName = name || t("category.emptyName");
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
		function addEngine(ci) {
			engineDialog.value = {
				mode: "add",
				ci,
				initial: {}
			};
		}
		function editEngine(ci, ei) {
			if (consumeClickSuppression()) return;
			engineDialog.value = {
				mode: "edit",
				ci,
				ei,
				initial: { ...draft.categories[ci].engines[ei] }
			};
		}
		function cancelEngineDialog() {
			if (!engineSaving.value) engineDialog.value = null;
		}
		function deleteEngineFromDialog() {
			const ctx = engineDialog.value;
			if (!ctx || ctx.mode !== "edit") return;
			engineDialog.value = null;
			deleteEngine(ctx.ci, ctx.ei);
		}
		async function submitEngine(engine) {
			const ctx = engineDialog.value;
			if (!ctx || engineSaving.value) return;
			if (!engine.name || !engine.action && !engine.url) {
				alert(t(engine.action ? "engine.requiredAction" : "engine.required"));
				return;
			}
			engineSaving.value = true;
			try {
				const list = draft.categories[ctx.ci].engines;
				const existing = ctx.mode === "edit" ? list[ctx.ei] : null;
				const original = engine.favicon;
				const embedded = /^data:/i.test(engine.faviconData || "") ? engine.faviconData : existing?.faviconData && existing.favicon === original ? existing.faviconData : "";
				const next = ctx.mode === "add" ? {
					...engine,
					_id: nextId()
				} : {
					...existing,
					...engine
				};
				next.favicon = original;
				if (embedded && embedded !== original) next.faviconData = embedded;
				else delete next.faviconData;
				if (ctx.mode === "add") list.push(next);
				else list[ctx.ei] = next;
				engineDialog.value = null;
				scheduleAutoSave();
				refreshIconInBackground(next, original);
			} finally {
				engineSaving.value = false;
			}
		}
		return {
			openCategoryDialog,
			submitCategory,
			cancelCategoryDialog,
			deleteCategoryFromDialog,
			addEngine,
			editEngine,
			cancelEngineDialog,
			deleteEngineFromDialog,
			submitEngine
		};
	}
	function useSettingsDraft({ settings }) {
		const source = computed(() => settings.settingData);
		let uid = 1;
		const nextId = () => uid++;
		function makeDraft() {
			const raw = cloneValue(source.value);
			const d = {};
			for (const key of OPTION_KEYS) d[key] = raw[key];
			d.categories = raw.engineCategories.map(([name, key, enabled]) => ({
				_id: nextId(),
				name,
				key,
				enabled: Boolean(enabled),
				engines: (raw.engineList[key] || []).map((engine) => ({
					...engine,
					_id: nextId()
				}))
			}));
			return d;
		}
		const draft = reactive(makeDraft());
		function buildResult(categories = draft.categories) {
			return serializeConfig({
				options: draft,
				categories,
				version: source.value.version
			});
		}
		function refreshDraft() {
			const next = makeDraft();
			for (const key of OPTION_KEYS) draft[key] = next[key];
			draft.categories.splice(0, draft.categories.length, ...next.categories);
		}
		function displayCategoryName(category) {
			if (!category) return "";
			return localizeCategoryName(category.name, category.key);
		}
		function toggleCategory(index) {
			const category = draft.categories[index];
			category.enabled = !category.enabled;
			return category.enabled;
		}
		function toggleEngine(ci, ei) {
			const engine = draft.categories[ci].engines[ei];
			engine.disable = !engine.disable;
			return !engine.disable;
		}
		function createCategoryKey() {
			const base = "user" + Date.now();
			let key = base;
			let index = 1;
			while (draft.categories.some((category) => category.key === key)) key = `${base}-${index++}`;
			return key;
		}
		function appendCategory(name) {
			const category = {
				_id: nextId(),
				name,
				key: createCategoryKey(),
				enabled: true,
				engines: []
			};
			draft.categories.push(category);
			return category;
		}
		return {
			source,
			draft,
			nextId,
			buildResult,
			refreshDraft,
			displayCategoryName,
			toggleCategory,
			toggleEngine,
			appendCategory
		};
	}
	function useRemoteSettingsSync({ settings, source, buildResult, refreshDraft, saving, remoteSynced, isOverlayOpen, cancelAutoSave, closeOverlays }) {
		function trySyncFromRemote() {
			if (saving.value) return;
			const hasLocalChanges = !isSameValue(buildResult(), source.value);
			if (isOverlayOpen() || hasLocalChanges) {
				showToast(t("toast.remoteConflict"), 6e3, {
					label: t("toast.syncAction"),
					onClick: forceSyncFromRemote
				});
				return;
			}
			if (!settings.reload()) return;
			refreshDraft();
			remoteSynced.value = true;
			showToast(t("toast.synced"), 3e3);
		}
		function forceSyncFromRemote() {
			closeOverlays();
			cancelAutoSave();
			settings.reload();
			refreshDraft();
			remoteSynced.value = true;
			showToast(t("toast.synced"), 3e3);
		}
		watch(() => ui.settingsRevision, trySyncFromRemote);
		return {
			trySyncFromRemote,
			forceSyncFromRemote
		};
	}
	var BLOCKED_EVENTS = [
		"pointerdown",
		"pointerup",
		"mousedown",
		"mouseup",
		"click",
		"dblclick",
		"auxclick",
		"contextmenu",
		"wheel",
		"touchstart",
		"touchmove",
		"touchend",
		"keydown",
		"keyup",
		"keypress"
	];
	function stopPropagation(e) {
		e.stopPropagation();
	}
	function useEventIsolation(elRef) {
		let el = null;
		onMounted(() => {
			el = elRef.value;
			if (!el) return;
			for (const type of BLOCKED_EVENTS) el.addEventListener(type, stopPropagation);
		});
		onBeforeUnmount(() => {
			if (!el) return;
			for (const type of BLOCKED_EVENTS) el.removeEventListener(type, stopPropagation);
			el = null;
		});
	}
	var settingPanelStyles_default = [
		"#settingLayerMask {\n  --sej-mask-pad: 20px;\n  display: none;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  inset: 0;\n  /* 移动端地址栏/工具栏会压缩可视区域：遮罩贴合实际可视高度，\n     面板才能在其中居中，而不是一部分藏到浏览器界面下 */\n  bottom: auto;\n  height: 100vh;\n  height: 100dvh;\n  height: var(--sej-viewport-h, 100vh);\n  background-color: rgba(16, 18, 22, 0.42);\n  backdrop-filter: blur(12px);\n  z-index: 200000000;\n  overflow: auto;\n  font-family: var(--sej-font-family);\n  font-size: 14px;\n  transition: opacity 0.15s ease-out;\n  opacity: 0;\n  animation: sej-setting-mask-in 0.15s ease;\n  user-select: none;\n  -moz-user-select: none;\n  touch-action: manipulation;\n  padding: var(--sej-mask-pad);\n  box-sizing: border-box;\n  color: var(--font-color-qxin);\n}\n\n#settingLayer {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  --sej-panel-pad-x: 20px;\n  --sej-panel-pad-top: 16px;\n  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;\n  background-color: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 16px;\n  box-shadow: var(--sej-panel-shadow);\n  position: absolute;\n  width: auto;\n  /* 绝对定位时遮罩的内边距不参与定位，宽度/高度需自行扣掉 */\n  min-width: min(720px, calc(100% - var(--sej-mask-pad) * 2));\n  max-width: min(960px, calc(100% - var(--sej-mask-pad) * 2));\n  /* 移动端浏览器工具栏会占去部分可视高度：vh 只是最大视口，\n     依次用 dvh 与脚本测量的实际视口高度兜底，避免面板上下被裁掉 */\n  max-height: calc(100vh - var(--sej-mask-pad) * 2);\n  max-height: calc(100dvh - var(--sej-mask-pad) * 2);\n  max-height: calc(var(--sej-viewport-h, 100vh) - var(--sej-mask-pad) * 2);\n  margin: 0;\n  overflow: visible;\n  animation: sej-panel-in 0.16s ease-out;\n}\n\n@keyframes sej-panel-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px) scale(0.99);\n  }\n}\n\n.sej-panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex: 0 0 auto;\n  padding: 0 2px 12px;\n  cursor: move;\n  /* 触屏拖动标题栏时不要触发页面滚动/长按菜单 */\n  touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n\n.sej-panel-title {\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n\n.sej-panel-close {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--sej-surface-hover);\n  color: transparent;\n  font-size: 0;\n  line-height: 0;\n  cursor: pointer;\n  opacity: 1;\n  transition:\n    background-color 0.12s ease-out,\n    opacity 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n\n.sej-panel-close::before,\n.sej-panel-close::after {\n  content: '';\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 12px;\n  height: 1.5px;\n  border-radius: 2px;\n  background: var(--font-color-qxin);\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n\n.sej-panel-close::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n\n.sej-panel-close:hover {\n  background: var(--sej-active-bg);\n}\n\n.sej-panel-close:active {\n  transform: scale(0.92);\n  opacity: 0.75;\n}\n\n.iqxin-items {\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 220px;\n  width: 220px;\n  min-width: 0;\n  max-width: 220px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 6px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color-sej);\n  background: var(--sej-surface-2);\n}\n\n.sej-add-category-card {\n  align-items: center;\n  justify-content: center;\n  min-height: 140px;\n  background: transparent;\n  border: 1px dashed var(--sej-checkbox-border);\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition:\n    background-color 0.12s ease-out,\n    border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\n.sej-add-category-card:hover {\n  background: var(--sej-surface-hover);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n\n.sej-add-category-card:focus-visible {\n  background: var(--sej-surface-hover);\n  outline: 2px solid var(--sej-accent);\n  outline-offset: 2px;\n}\n\n.sej-add-category-plus {\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1;\n  opacity: 0.45;\n  transition: opacity 0.12s ease-out;\n}\n\n.sej-add-category-card:hover .sej-add-category-plus {\n  opacity: 1;\n}\n\n.sejcon {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n}\n\n.sejcon > .drag {\n  flex: 0 0 auto;\n}\n\n#settingLayer .drag {\n  display: block;\n  position: relative;\n  /* 触屏：tap 立即响应；长按由脚本接管拖动，禁用原生长按菜单 */\n  touch-action: manipulation;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n",
		"/* 列表滚动容器：内容可能很长，滚动条贴住面板内边缘 */\n#sej-settings-body {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  gap: 10px;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */\n  margin-top: 0;\n  margin-right: calc(var(--sej-panel-pad-x) * -1);\n  padding-top: 2px;\n  padding-right: var(--sej-panel-pad-x);\n  padding-bottom: 4px;\n}\n\n#sej-settings-body::-webkit-scrollbar {\n  width: 8px;\n}\n\n#sej-settings-body::-webkit-scrollbar-thumb {\n  background: var(--sej-surface-hover);\n  border-radius: 4px;\n}\n\n/* 拖动排序：源元素隐藏但保留占位，目标位置只空出空白 */\n#settingLayer .sej-drag-placeholder,\n#settingLayer .sej-drag-placeholder * {\n  visibility: hidden !important;\n}\n\n#settingLayer .sejtitle:active,\n#settingLayer .sejcon > .drag:active {\n  cursor: grabbing;\n}\n\n.sej-drag-ghost {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  margin: 0 !important;\n  z-index: 200000200;\n  opacity: 1 !important;\n  pointer-events: none;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: transform;\n}\n\n.sej-drag-ghost * {\n  pointer-events: none !important;\n}\n\n.sej-drag-ghost-engine {\n  border-radius: 8px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);\n}\n\n.sej-drag-ghost-category {\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);\n}\n\n#settingLayer .sej-engine {\n  display: inline-flex;\n  align-items: center;\n  gap: 8px;\n  padding: 0 82px 0 8px;\n  width: 100%;\n  height: 30px;\n  box-sizing: border-box;\n  border-radius: 8px;\n  font-family: var(--sej-font-family);\n  font-size: 13px;\n  color: var(--font-color-qxin);\n  text-decoration: none;\n  white-space: nowrap;\n  transition:\n    background-color 0.08s ease-out,\n    opacity 0.08s ease-out;\n  cursor: pointer;\n}\n\n#settingLayer .sej-engine > span {\n  flex: 0 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.sejtitle {\n  text-align: left;\n  /* 左侧与引擎条目对齐，右侧避开编辑/删除/显隐按钮 */\n  padding: 5px 82px 5px 8px;\n  margin-bottom: 2px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.5;\n  border-radius: 8px;\n}\n\n/* 标题下方的细分隔线，用于和引擎条目区分 */\n.sejtitle::after {\n  content: '';\n  position: absolute;\n  left: 8px;\n  right: 8px;\n  bottom: 0;\n  height: 1px;\n  background: var(--border-color-sej);\n  pointer-events: none;\n}\n\n#settingLayerMask [data-xin] {\n  margin: 1px 0;\n  border-radius: 8px;\n}\n\n.sejcon [data-xin] {\n  cursor: pointer;\n}\n\n/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */\n#settingLayerMask [data-iqxindisabled='true'],\n[data-xin^='-'] {\n  background-color: transparent;\n  color: var(--font-color-qxin);\n  transition: background-color 0.12s ease-out;\n}\n\n#settingLayerMask [data-iqxindisabled='true'] > span,\n#settingLayerMask [data-iqxindisabled='true'] .sej-engine-icon,\n[data-xin^='-'] > .iqxin-pointer-events {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n\n/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */\n.sej-category-hidden .sej-engine > span,\n.sej-category-hidden .sej-engine .sej-engine-icon,\n.sej-category-hidden .iqxin-additem {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n\n#settingLayerMask .sej-engine:hover {\n  background-color: var(--sej-surface-hover);\n}\n\n#settingLayerMask [data-iqxindisabled='true']:hover,\n[data-xin^='-']:hover {\n  background-color: transparent;\n}\n\n.sej-category-hidden .sej-engine:hover {\n  background-color: transparent;\n}\n\n#settingLayerMask label {\n  cursor: pointer;\n}\n\n#settingLayerMask .sej-engine-icon {\n  vertical-align: middle;\n}\n\n/* 窄屏下类别卡片占满可用宽度 */\n@media (max-width: 560px) {\n  .iqxin-items {\n    flex: 1 1 160px;\n    width: auto;\n    max-width: none;\n  }\n}\n\n.iqxin-pointer-events,\n#settingLayer .sej-engine * {\n  pointer-events: none;\n}\n",
		"#btnEle {\n  position: relative;\n  width: 100%;\n  margin-top: 10px;\n  background: transparent;\n  border-radius: 0;\n  flex: 0 0 auto;\n}\n\n#btnEle span {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  box-sizing: border-box;\n  min-height: 30px;\n  background: var(--sej-surface-2);\n  border: 1px solid transparent;\n  margin: 0;\n  color: var(--font-color-qxin);\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  transition:\n    background-color 0.12s ease-out,\n    border-color 0.12s ease-out,\n    color 0.12s ease-out,\n    opacity 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n\n#btnEle label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: inherit;\n}\n\n#btnEle .sej-language-select {\n  appearance: none;\n  -webkit-appearance: none;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 6px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  padding: 2px 4px;\n  margin-left: 2px;\n  cursor: pointer;\n  outline: none;\n}\n\n#btnEle .sej-language-select:focus-visible {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n\n#btnEle span:hover {\n  background: var(--sej-surface-hover);\n  color: var(--font-color-qxin);\n}\n\n#btnEle a {\n  color: var(--font-color-qxin);\n  opacity: 0.7;\n  text-decoration: none;\n  font-family: inherit;\n  transition:\n    opacity 0.12s ease-out,\n    color 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n\n#btnEle a:hover {\n  opacity: 1;\n  color: var(--sej-accent);\n}\n\n#btnEle span:active,\n#btnEle a:active {\n  transform: scale(0.96);\n  opacity: 0.8;\n}\n\n#btnEle .feedback {\n  background: transparent;\n  border-color: transparent;\n  padding: 4px 6px;\n}\n\n#btnEle .feedback:hover {\n  background: transparent;\n  border-color: transparent;\n  color: var(--sej-accent);\n}\n\n#btnEle > div {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  box-sizing: border-box;\n}\n\n#btnEle > div.btnEleLayer {\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: stretch;\n  background: transparent;\n  border-radius: 0;\n  border-top: 1px solid var(--border-color-sej);\n  padding-top: 12px;\n  gap: 8px;\n}\n\n.sej-footer-options,\n.sej-footer-bar,\n.sej-footer-selects,\n.sej-footer-links,\n.sej-footer-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n\n.sej-footer-options {\n  gap: 8px;\n}\n\n.sej-footer-bar {\n  gap: 8px 12px;\n}\n\n.sej-footer-selects {\n  gap: 8px;\n}\n\n/* 配置文件：齿轮入口与导入/导出合并为同一个容器 */\n#btnEle .sej-config-box {\n  display: inline-flex;\n  align-items: center;\n  min-height: 30px;\n  background: var(--sej-surface-2);\n  border: 1px solid transparent;\n  border-radius: 8px;\n  overflow: hidden;\n}\n\n#btnEle .sej-config-box button {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  min-height: 30px;\n  margin: 0;\n  padding: 4px 9px;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  transition:\n    background-color 0.12s ease-out,\n    color 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n\n#btnEle .sej-config-box .sej-config-open {\n  padding-left: 10px;\n}\n\n#btnEle .sej-config-box button:hover {\n  background: var(--sej-surface-hover);\n  color: var(--font-color-qxin);\n}\n\n#btnEle .sej-config-box button:active {\n  transform: scale(0.96);\n}\n\n#btnEle .sej-config-box button:focus-visible {\n  outline: 2px solid var(--sej-accent);\n  outline-offset: -2px;\n}\n\n#btnEle .sej-config-box svg {\n  flex: 0 0 auto;\n}\n\n#btnEle span.sej-config-sep {\n  flex: 0 0 auto;\n  width: 1px;\n  height: 16px;\n  min-height: 16px;\n  margin: 0;\n  padding: 0;\n  border: 0;\n  border-radius: 0;\n  background: var(--border-color-sej);\n  pointer-events: none;\n}\n\n.sej-footer-links {\n  gap: 0;\n  margin-left: auto;\n}\n\n.sej-footer-actions {\n  margin-left: 4px;\n}\n\n/* 底栏不参与内容区伸缩，并在窄屏下收紧 */\n#settingLayer #btnEle {\n  flex: 0 0 auto;\n}\n\n@media (max-width: 780px) {\n  #btnEle span {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  #btnEle .sej-config-box button {\n    font-size: 12px;\n    padding: 5px 7px;\n  }\n  #btnEle .sej-config-box .sej-config-open {\n    padding-left: 8px;\n  }\n  #settingLayerMask {\n    /* 窄屏收紧外边距，给小屏让出可用空间 */\n    --sej-mask-pad: 8px;\n  }\n  #settingLayer {\n    --sej-panel-pad-x: 12px;\n  }\n}\n",
		"#btnEle #xin-save {\n  position: relative;\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n\n#btnEle #xin-save:hover {\n  background: var(--sej-accent);\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n\n#btnEle #xin-save.sej-saving {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n\n#settingLayerMask input[type='checkbox'],\n#settingLayerMask input[type='radio'] {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: -3px;\n  margin: 0 !important;\n  padding: 0;\n  position: relative;\n  border: 1.5px solid var(--sej-checkbox-border);\n  border-radius: 5px;\n  background: var(--sej-input-bg);\n  cursor: pointer;\n  transition:\n    background-color 0.12s ease-out,\n    border-color 0.12s ease-out;\n}\n\n#settingLayerMask input[type='checkbox']:before,\n#settingLayerMask input[type='radio']:before {\n  content: none;\n}\n\n#settingLayerMask input[type='checkbox']:checked,\n#settingLayerMask input[type='radio']:checked {\n  background: var(--sej-accent);\n  border-color: var(--sej-accent);\n}\n\n#settingLayerMask input[type='checkbox']:checked:after,\n#settingLayerMask input[type='radio']:checked:after {\n  content: '';\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  width: 4px;\n  height: 8px;\n  border: solid var(--sej-accent-contrast);\n  border-width: 0 2px 2px 0;\n  background: none;\n  transform: rotate(45deg);\n}\n\n.iqxin-set-toggle {\n  opacity: 0.6;\n  position: absolute;\n  background: transparent;\n  /* 用上下外边距 auto 垂直居中，避免 transform 让按钮单独成为合成层 */\n  top: 0;\n  bottom: 0;\n  height: fit-content;\n  margin-top: auto;\n  margin-bottom: auto;\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition:\n    opacity 0.12s ease-out,\n    background-color 0.12s ease-out,\n    color 0.12s ease-out;\n  right: 6px;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n}\n\n.iqxin-set-toggle svg {\n  display: block;\n}\n\n.iqxin-set-toggle.iqxin-set-hidden {\n  opacity: 0.35;\n}\n\n.iqxin-set-toggle:hover {\n  opacity: 1;\n  background: var(--sej-surface-hover);\n}\n\n/* 悬浮操作：右侧依次为编辑、删除、显隐按钮；没有删除按钮时编辑顺位到删除的位置 */\n.sej-hover-edit,\n.sej-hover-delete {\n  position: absolute;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n  opacity: 0;\n  pointer-events: none;\n  transition:\n    opacity 0.12s ease-out,\n    background-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\n.sej-hover-edit {\n  top: 0;\n  bottom: 0;\n  right: 54px;\n  height: fit-content;\n  margin: auto 0;\n  padding: 3px;\n  border-radius: 6px;\n}\n\n.sej-hover-delete {\n  top: 0;\n  bottom: 0;\n  right: 30px;\n  height: fit-content;\n  margin: auto 0;\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n\n.sej-no-delete .sej-hover-edit {\n  right: 30px;\n}\n\n.sej-hover-edit svg,\n.sej-hover-delete svg {\n  display: block;\n}\n\n.sejtitle:hover .sej-hover-edit,\n#settingLayer .sejcon > .drag:hover > .sej-hover-edit {\n  opacity: 0.6;\n}\n\n.sejtitle:hover .sej-hover-delete,\n#settingLayer .sejcon > .drag:hover > .sej-hover-delete {\n  opacity: 0.6;\n  pointer-events: auto;\n}\n\n.sejtitle:hover .sej-hover-edit:hover,\n#settingLayer .sejcon > .drag:hover > .sej-hover-edit:hover {\n  opacity: 1;\n  background: var(--sej-surface-hover);\n}\n\n.sej-hover-delete:hover {\n  opacity: 1;\n  background: var(--sej-danger-weak, rgba(220, 53, 69, 0.12));\n  color: var(--sej-danger, #dc3545);\n}\n\nspan.iqxin-additem {\n  display: inline-block;\n  position: relative;\n  text-align: center;\n  width: 100%;\n  box-sizing: border-box;\n  margin: auto 0 2px;\n  padding: 5px 0;\n  border: 1px dashed currentColor;\n  border-radius: 8px;\n  color: var(--font-color-qxin);\n  opacity: 0.55;\n  cursor: pointer;\n  visibility: visible;\n  transition:\n    opacity 0.12s ease-out,\n    border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\nspan.iqxin-additem:hover {\n  opacity: 1;\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n\nspan.iqxin-additem.sej-copy-target {\n  opacity: 1;\n  border-style: solid;\n  border-color: var(--sej-accent);\n  background: var(--sej-accent-weak);\n  color: var(--sej-accent);\n}\n\n.sej-copy-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  line-height: 1;\n}\n\n.sej-copy-icon svg {\n  display: block;\n  width: 14px;\n  height: 14px;\n}\n\n.sej-copy-hint {\n  position: absolute;\n  left: 50%;\n  bottom: calc(100% + 6px);\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 3px 8px;\n  border-radius: 6px;\n  background: rgba(20, 22, 26, 0.82);\n  color: #fff;\n  font-size: 12px;\n  line-height: 1.5;\n  white-space: nowrap;\n  pointer-events: none;\n}\n\n@keyframes sej-setting-mask-in {\n  from {\n    opacity: 0;\n  }\n}\n",
		"/* ---------- 弹窗：引擎/分类编辑、配置编辑器 ---------- */\n\n#newSearchBox,\n.sej-dialog-box {\n  position: fixed;\n  z-index: 200000100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: min(400px, calc(100vw - 32px));\n  box-sizing: border-box;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n  margin: 0;\n  transition:\n    opacity 0.14s ease-out,\n    transform 0.14s ease-out;\n}\n\n.sej-dialog-title {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n\n.sej-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  font-size: 12px;\n}\n\n.sej-field > span {\n  opacity: 0.65;\n}\n\n.sej-field-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n\n.sej-field-row input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n\n.sej-file-input {\n  display: none;\n}\n\n.sej-dialog-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n\n#newSearchBox input,\n.sej-dialog-box input {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  border-radius: 8px;\n  outline: none;\n  color: var(--font-color-qxin);\n  background: var(--sej-input-bg);\n  font-family: inherit;\n  font-size: 13px;\n  transition:\n    border-color 0.12s ease-out,\n    box-shadow 0.12s ease-out;\n}\n\n#newSearchBox input:focus,\n.sej-dialog-box input:focus {\n  background: var(--sej-input-bg);\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n\n.addItemBoxBtn {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition:\n    background-color 0.12s ease-out,\n    border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\n.addItemBoxBtn:hover {\n  background: var(--sej-surface-hover);\n}\n\n.sej-dialog-danger {\n  margin-right: auto;\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n\n/* 单独占据操作栏左侧，其余按钮保持右对齐 */\n.sej-dialog-left {\n  margin-right: auto;\n}\n\n.sej-dialog-danger:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n\n.iqxin-closeBtn,\n.iqxin-enterBtn {\n  box-sizing: border-box;\n}\n\n.iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n\n.iqxin-enterBtn:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n\n.iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n"
	].join("");
	var STEP_STATUS_TEXT = {
		pending: "engine.stepPending",
		loading: "engine.stepLoading",
		ok: "engine.stepOk",
		failed: "engine.stepFailed",
		canceled: "engine.stepCanceled"
	};
	function useEngineIconPreview({ form, siteHost, initialFavicon, initialFaviconData, isBusy }) {
		const previewData = ref("");
		const previewUrl = ref("");
		const pickedUrl = ref("");
		const previewLoading = ref(false);
		const previewFailed = ref(false);
		const previewSteps = ref([]);
		const previewCache = new Map();
		let previewToken = 0;
		const dataEdited = ref(false);
		let internalUpdates = 0;
		const faviconFileInput = ref(null);
		const dataIconLink = computed(() => previewData.value.trim());
		const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
		const previewSize = computed(() => formatIconSize(dataUrlStorageBytes(dataIconLink.value)));
		const canPreview = computed(() => Boolean(siteHost.value) || /^(https?:\/\/|data:)/i.test(form.favicon.trim()));
		const hasFetched = computed(() => previewSteps.value.some((step) => step.status === "ok"));
		const previewLabel = computed(() => {
			if (previewLoading.value) return t("engine.cancelFetch");
			if (previewFailed.value || previewImage.value || hasFetched.value) return t("engine.refetch");
			return t("engine.fetchIcon");
		});
		const extractorUrl = computed(() => {
			const host = siteHost.value;
			if (!host) return "";
			return "https://convertico.com/favicon-extractor/?url=" + encodeURIComponent(host);
		});
		function clearSteps() {
			previewSteps.value = [];
		}
		function setPreviewData(value, sourceUrl) {
			previewData.value = value;
			previewUrl.value = value ? sourceUrl || "" : "";
			dataEdited.value = false;
		}
		function setManualPreviewData(value) {
			previewData.value = value;
			previewUrl.value = value ? "manual" : "";
			pickedUrl.value = "";
			dataEdited.value = Boolean(value);
		}
		function markDataEdited() {
			dataEdited.value = true;
			pickedUrl.value = "";
			previewUrl.value = previewData.value.trim() ? "manual" : "";
		}
		watch(() => form.favicon, (value) => {
			if (internalUpdates > 0) return;
			pickedUrl.value = "";
			previewToken++;
			const url = value.trim();
			previewLoading.value = false;
			previewFailed.value = false;
			if (dataEdited.value) return;
			if (/^data:/i.test(url)) {
				setPreviewData(url, url);
				return;
			}
			const cached = previewCache.get(url);
			if (cached) {
				setPreviewData(cached.data, url);
				return;
			}
			if (url === initialFavicon && initialFaviconData) setPreviewData(initialFaviconData, url);
		}, { immediate: true });
		function cancelPreview() {
			previewToken++;
			previewLoading.value = false;
			previewFailed.value = true;
			previewSteps.value.forEach((step) => {
				if (step.status === "loading" || step.status === "pending") step.status = "canceled";
			});
		}
		async function applyPreview(step, data) {
			step.status = "ok";
			pickedUrl.value = step.url;
			previewCache.set(step.url, {
				data,
				bytes: step.rawSize
			});
			if (form.favicon.trim() !== step.url) {
				internalUpdates++;
				form.favicon = step.url;
				await nextTick();
				internalUpdates--;
			}
			setPreviewData(data, step.url);
		}
		async function chooseStep(step) {
			if (isBusy() || step.status !== "ok" || !step.data) return;
			if (step.url === pickedUrl.value) return;
			await applyPreview(step, step.data);
		}
		async function previewIcon() {
			if (isBusy()) return;
			if (previewLoading.value) {
				cancelPreview();
				return;
			}
			const url = form.favicon.trim();
			if (/^data:/i.test(url)) {
				setPreviewData(url, url);
				previewFailed.value = false;
				clearSteps();
				return;
			}
			const candidates = [];
			const addCandidate = (value) => {
				if (!value || candidates.some((item) => item.url === value)) return;
				candidates.push({ url: value });
			};
			if (/^https?:\/\//i.test(url)) addCandidate(url);
			const host = siteHost.value;
			if (host) {
				const domain = registrableDomain(host);
				addCandidate(faviconFromUrl(host));
				if (domain !== host) addCandidate(faviconFromUrl(domain));
				addCandidate(`https://a.favicon.im/${host}`);
				if (domain !== host) addCandidate(`https://a.favicon.im/${domain}`);
			}
			if (!candidates.length) return;
			const token = ++previewToken;
			previewFailed.value = false;
			previewLoading.value = true;
			previewSteps.value = candidates.map((item) => ({
				...item,
				status: "pending",
				data: "",
				rawSize: 0,
				size: ""
			}));
			const moveTo = (step, index) => {
				const list = previewSteps.value;
				const from = list.indexOf(step);
				if (from === -1) return;
				list.splice(from, 1);
				list.splice(Math.min(index, list.length), 0, step);
			};
			const okEnd = (step) => previewSteps.value.filter((item) => item !== step && item.status === "ok").length;
			const settle = async (step) => {
				const cached = previewCache.get(step.url);
				if (cached) {
					step.data = cached.data;
					step.rawSize = cached.bytes;
					step.status = "ok";
				} else {
					step.status = "loading";
					const { data, reason, bytes } = await resolveFavicon(step.url);
					if (token !== previewToken) return;
					if (data) {
						step.data = data;
						step.rawSize = bytes || 0;
						step.status = "ok";
						previewCache.set(step.url, {
							data,
							bytes: step.rawSize
						});
					} else {
						step.reason = reason;
						step.status = "failed";
						moveTo(step, previewSteps.value.length);
						return;
					}
				}
				step.size = formatIconSize(step.rawSize);
				moveTo(step, okEnd(step));
			};
			await Promise.all(previewSteps.value.map(settle));
			if (token !== previewToken) return;
			previewLoading.value = false;
			previewFailed.value = !previewSteps.value.some((step) => step.status === "ok");
		}
		function pickFaviconFile() {
			faviconFileInput.value?.click();
		}
		function uploadFavicon(event) {
			const file = event.target.files?.[0];
			event.target.value = "";
			if (!file) return;
			if (!(file.type.startsWith("image/") || /\.(ico|png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(file.name))) {
				alert(t("engine.selectImage"));
				return;
			}
			const reader = new FileReader();
			reader.onload = () => {
				previewToken++;
				previewLoading.value = false;
				previewFailed.value = false;
				clearSteps();
				setManualPreviewData(String(reader.result || ""));
			};
			reader.onerror = () => alert(t("engine.readImageFailed"));
			reader.readAsDataURL(file);
		}
		function resolveFaviconData(favicon) {
			const data = previewData.value.trim();
			return Boolean(data) && (dataEdited.value || previewUrl.value === favicon || /^data:/i.test(favicon)) ? data : "";
		}
		onBeforeUnmount(() => {
			previewToken++;
		});
		return {
			faviconFileInput,
			previewData,
			previewUrl,
			pickedUrl,
			previewLoading,
			previewFailed,
			previewSteps,
			dataIconLink,
			previewImage,
			previewSize,
			canPreview,
			previewLabel,
			extractorUrl,
			STEP_STATUS_TEXT,
			clearSteps,
			markDataEdited,
			chooseStep,
			previewIcon,
			pickFaviconFile,
			uploadFavicon,
			resolveFaviconData
		};
	}
	var EngineEditDialog_default = ".sej-icon-preview-btn {\n  flex: 0 0 auto;\n  padding: 7px 12px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  background: var(--sej-btn-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  cursor: pointer;\n  transition:\n    border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\n.sej-icon-preview-btn:hover:not(:disabled) {\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n\n.sej-icon-preview-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n\n/* 已有图标时按钮只显示缩略图 */\n.sej-icon-preview-btn.sej-has-icon {\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n}\n\n.sej-icon-preview {\n  flex: 0 0 auto;\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  background: var(--sej-surface-hover);\n}\n\n.sej-data-line {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n\n.sej-data-line input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n\n/* 图标获取来源列表 */\n.sej-preview-steps {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 6px 8px;\n  border-radius: 8px;\n  background: var(--sej-surface-2);\n  font-size: 12px;\n}\n\n.sej-preview-step {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  line-height: 18px;\n  color: var(--font-color-qxin);\n  border-radius: 4px;\n}\n\n/* 有多条成功来源时整行可点击切换，当前采用的来源高亮 */\n.sej-preview-step.is-selectable {\n  cursor: pointer;\n}\n\n.sej-preview-step.is-selectable:hover{\n  background: var(--sej-surface-hover);\n}\n\n.sej-preview-step.is-selectable:focus-visible {\n  outline: 2px solid var(--sej-accent);\n  outline-offset: -2px;\n}\n\n/* 成功来源显示实际图标缩略图，替换默认的状态圆点 */\n.sej-preview-thumb {\n  flex: 0 0 auto;\n  width: 16px;\n  height: 16px;\n  object-fit: contain;\n}\n\n.sej-preview-dot {\n  flex: 0 0 auto;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--sej-checkbox-border);\n}\n\n.sej-preview-step.is-loading .sej-preview-dot {\n  background: var(--sej-accent);\n}\n\n.sej-preview-step.is-ok .sej-preview-dot {\n  background: #34a853;\n}\n\n.sej-preview-step.is-failed .sej-preview-dot {\n  background: var(--sej-danger);\n}\n\n.sej-preview-step.is-failed,\n.sej-preview-step.is-pending,\n.sej-preview-step.is-canceled {\n  opacity: 0.6;\n}\n\n.sej-preview-url {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  /* 链接源文本允许光标选择/复制 */\n  cursor: text;\n  -webkit-user-select: text;\n  user-select: text;\n}\n\n.sej-preview-state {\n  flex: 0 0 auto;\n  opacity: 0.7;\n}\n\n/* 获取成功后的原始下载大小，弱化显示避免抢走地址文本的注意力 */\n.sej-preview-size {\n  flex: 0 0 auto;\n  opacity: 0.55;\n  font-variant-numeric: tabular-nums;\n}\n\n/* 图标数据字段名旁的当前图标存储体积（转码后） */\n.sej-icon-size {\n  margin-left: 4px;\n  font-style: normal;\n  font-variant-numeric: tabular-nums;\n  opacity: 0.55;\n}\n\n.sej-preview-state.sej-preview-icon {\n  display: inline-flex;\n  align-items: center;\n  color: var(--sej-success);\n  opacity: 0.6;\n  transition: opacity 0.12s ease-out;\n}\n\n.sej-preview-icon svg {\n  display: block;\n}\n\n/* 未选用：绿色空心圆，中间留空，悬停时提示可点击 */\n.sej-preview-icon svg path {\n  opacity: 0;\n}\n\n.sej-preview-step.is-selectable:hover .sej-preview-icon {\n  opacity: 1;\n}\n\n/* 已选用：绿色圆圈内显示勾 */\n.sej-preview-icon.is-selected {\n  opacity: 1;\n}\n\n.sej-preview-icon.is-selected svg circle {\n  fill: currentColor;\n}\n\n.sej-preview-icon.is-selected svg path {\n  opacity: 1;\n  stroke: var(--sej-accent-contrast);\n}\n\n.sej-preview-extractor {\n  align-self: flex-start;\n  margin-top: 2px;\n  color: var(--sej-accent);\n  font-size: 12px;\n  text-decoration: none;\n}\n\n.sej-preview-extractor:hover {\n  text-decoration: underline;\n}\n\n#newSearchBox #iqxin-newTarget {\n  width: 100%;\n  border-radius: 8px;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  outline: none;\n}\n";
	var _hoisted_1$6 = {
		id: "sej-engine-title",
		class: "sej-dialog-title"
	};
	var _hoisted_2$6 = {
		key: 0,
		class: "sej-field"
	};
	var _hoisted_3$6 = ["placeholder", "disabled"];
	var _hoisted_4$6 = { class: "sej-field" };
	var _hoisted_5$6 = ["placeholder", "disabled"];
	var _hoisted_6$5 = {
		key: 1,
		class: "sej-field"
	};
	var _hoisted_7$4 = { class: "sej-field-row" };
	var _hoisted_8$3 = ["placeholder", "disabled"];
	var _hoisted_9$3 = ["disabled"];
	var _hoisted_10$3 = {
		key: 0,
		class: "sej-preview-steps"
	};
	var _hoisted_11$3 = [
		"title",
		"role",
		"tabindex",
		"onClick",
		"onKeydown"
	];
	var _hoisted_12$2 = ["src"];
	var _hoisted_13$2 = {
		key: 1,
		class: "sej-preview-dot"
	};
	var _hoisted_14$2 = { class: "sej-preview-url" };
	var _hoisted_15$2 = {
		key: 2,
		class: "sej-preview-size"
	};
	var _hoisted_16$1 = {
		key: 3,
		class: "sej-preview-state"
	};
	var _hoisted_17 = ["title"];
	var _hoisted_18 = {
		key: 5,
		class: "sej-preview-state"
	};
	var _hoisted_19 = ["href"];
	var _hoisted_20 = {
		key: 2,
		class: "sej-field"
	};
	var _hoisted_21 = {
		key: 0,
		class: "sej-icon-size"
	};
	var _hoisted_22 = { class: "sej-data-line" };
	var _hoisted_23 = ["placeholder", "disabled"];
	var _hoisted_24 = ["disabled", "title"];
	var _hoisted_25 = ["src"];
	var _hoisted_26 = {
		key: 3,
		class: "sej-field"
	};
	var _hoisted_27 = ["disabled"];
	var _hoisted_28 = { value: "_blank" };
	var _hoisted_29 = { value: "_self" };
	var _hoisted_30 = { class: "sej-dialog-actions" };
	var _hoisted_31 = ["disabled"];
	var _hoisted_32 = ["disabled"];
	var _hoisted_33 = ["disabled"];
	var ICON_SELECT = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"m8 12 3 3 5-6\"/></svg>";
	var _sfc_main$8 = {
		__name: "EngineEditDialog",
		props: {
			mode: {
				type: String,
				default: "add"
			},
			initial: {
				type: Object,
				default: () => ({})
			},
			resolveIcon: {
				type: Function,
				required: true
			},
			busy: {
				type: Boolean,
				default: false
			}
		},
		emits: [
			"submit",
			"cancel",
			"delete"
		],
		setup(__props, { emit: __emit }) {
			addStyle(EngineEditDialog_default);
			const props = __props;
			const emit = __emit;
			const initialAction = props.initial.action === "copy" || props.initial.action === "open" ? props.initial.action : "";
			const form = reactive({
				name: props.initial.name || "",
				url: props.initial.url || "",
				favicon: props.initial.favicon || "",
				target: props.initial.target === "_self" ? "_self" : "_blank"
			});
			const urlInput = ref(null);
			const rootEl = ref(null);
			useModalA11y({
				containerEl: rootEl,
				initialFocus: urlInput,
				onClose: () => {
					if (!props.busy) emit("cancel");
				}
			});
			const initialFavicon = (props.initial.favicon || "").trim();
			const { faviconFileInput, previewData, pickedUrl, previewLoading, previewSteps, previewSize, dataIconLink, previewImage, canPreview, previewLabel, extractorUrl, STEP_STATUS_TEXT, clearSteps, markDataEdited, chooseStep, previewIcon, pickFaviconFile, uploadFavicon, resolveFaviconData } = useEngineIconPreview({
				form,
				siteHost: computed(() => hostFromUrl(form.url) || hostFromUrl(form.favicon)),
				initialFavicon,
				initialFaviconData: props.initial.faviconData,
				isBusy: () => props.busy
			});
			const titleEdited = ref(Boolean((props.initial.name || "").trim()));
			const faviconEdited = ref(Boolean((props.initial.favicon || "").trim()));
			function chooseStepFromClick(step) {
				const selection = typeof window !== "undefined" ? window.getSelection() : null;
				if (selection && !selection.isCollapsed && selection.toString().trim()) return;
				chooseStep(step);
			}
			function markTitleEdited() {
				titleEdited.value = true;
			}
			function markFaviconEdited() {
				faviconEdited.value = true;
				clearSteps();
			}
			watch(() => form.url, () => {
				if (!titleEdited.value || !form.name.trim()) form.name = titleFromUrl(form.url);
				if (!faviconEdited.value || !form.favicon.trim()) form.favicon = faviconFromUrl(form.url);
				clearSteps();
			});
			onMounted(() => urlInput.value?.focus());
			function submit() {
				if (props.busy) return;
				const action = initialAction;
				const url = action ? "" : withProtocol(form.url);
				const favicon = action ? "" : form.favicon.trim() || props.resolveIcon(form.url);
				emit("submit", {
					name: form.name,
					url,
					favicon,
					faviconData: action ? "" : resolveFaviconData(favicon),
					target: form.target,
					...action ? { action } : {}
				});
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: "newSearchBox",
					ref_key: "rootEl",
					ref: rootEl,
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "sej-engine-title"
				}, [
					createBaseVNode("div", _hoisted_1$6, toDisplayString(__props.mode === "edit" ? unref(t)("engine.editTitle") : unref(t)("engine.addTitle")), 1),
					!unref(initialAction) ? (openBlock(), createElementBlock("label", _hoisted_2$6, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.url")), 1), withDirectives(createBaseVNode("input", {
						ref_key: "urlInput",
						ref: urlInput,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.url = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy
					}, null, 8, _hoisted_3$6), [[vModelText, form.url]])])) : createCommentVNode("", true),
					createBaseVNode("label", _hoisted_4$6, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.name")), 1), withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.name = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy,
						onInput: markTitleEdited
					}, null, 40, _hoisted_5$6), [[vModelText, form.name]])]),
					!unref(initialAction) ? (openBlock(), createElementBlock("div", _hoisted_6$5, [
						createBaseVNode("span", null, toDisplayString(unref(t)("engine.iconSrc")), 1),
						createBaseVNode("div", _hoisted_7$4, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.favicon = $event),
							placeholder: unref(t)("common.optional"),
							disabled: __props.busy,
							onInput: markFaviconEdited
						}, null, 40, _hoisted_8$3), [[vModelText, form.favicon]]), createBaseVNode("button", {
							type: "button",
							class: "sej-icon-preview-btn",
							disabled: __props.busy || !unref(previewLoading) && !unref(canPreview),
							onClick: _cache[3] || (_cache[3] = (...args) => unref(previewIcon) && unref(previewIcon)(...args))
						}, toDisplayString(unref(previewLabel)), 9, _hoisted_9$3)]),
						unref(previewSteps).length ? (openBlock(), createElementBlock("div", _hoisted_10$3, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(previewSteps), (step) => {
							return openBlock(), createElementBlock("div", {
								key: step.url,
								title: step.url,
								class: normalizeClass(["sej-preview-step", ["is-" + step.status, {
									"is-selectable": step.status === "ok",
									"is-active": step.status === "ok" && step.url === unref(pickedUrl)
								}]]),
								role: step.status === "ok" ? "button" : void 0,
								tabindex: step.status === "ok" ? 0 : void 0,
								onClick: ($event) => chooseStepFromClick(step),
								onKeydown: [withKeys(withModifiers(($event) => unref(chooseStep)(step), ["prevent"]), ["enter"]), withKeys(withModifiers(($event) => unref(chooseStep)(step), ["prevent"]), ["space"])]
							}, [
								step.status === "ok" && step.data ? (openBlock(), createElementBlock("img", {
									key: 0,
									class: "sej-preview-thumb",
									src: step.data,
									alt: ""
								}, null, 8, _hoisted_12$2)) : (openBlock(), createElementBlock("span", _hoisted_13$2)),
								createBaseVNode("span", _hoisted_14$2, toDisplayString(step.url), 1),
								step.status === "ok" && step.size ? (openBlock(), createElementBlock("span", _hoisted_15$2, toDisplayString(step.size), 1)) : createCommentVNode("", true),
								step.status === "failed" && step.reason ? (openBlock(), createElementBlock("span", _hoisted_16$1, toDisplayString(step.reason), 1)) : step.status === "ok" ? (openBlock(), createElementBlock("span", {
									key: 4,
									class: normalizeClass(["sej-preview-state sej-preview-icon", { "is-selected": step.url === unref(pickedUrl) }]),
									title: step.url !== unref(pickedUrl) ? unref(t)("engine.stepUse") : unref(t)("engine.stepOk"),
									innerHTML: ICON_SELECT
								}, null, 10, _hoisted_17)) : (openBlock(), createElementBlock("span", _hoisted_18, toDisplayString(unref(t)(unref(STEP_STATUS_TEXT)[step.status])), 1))
							], 42, _hoisted_11$3);
						}), 128)), unref(extractorUrl) ? (openBlock(), createElementBlock("a", {
							key: 0,
							class: "sej-preview-extractor",
							href: unref(extractorUrl),
							target: "_blank",
							rel: "noopener"
						}, toDisplayString(unref(t)("engine.tryExtractor")), 9, _hoisted_19)) : createCommentVNode("", true)])) : createCommentVNode("", true)
					])) : createCommentVNode("", true),
					!unref(initialAction) ? (openBlock(), createElementBlock("div", _hoisted_20, [
						createBaseVNode("span", null, [createTextVNode(toDisplayString(unref(t)("engine.iconData")) + " ", 1), unref(previewSize) ? (openBlock(), createElementBlock("em", _hoisted_21, toDisplayString(unref(previewSize)) + " " + toDisplayString(unref(t)("engine.iconDataCompressed")), 1)) : createCommentVNode("", true)]),
						createBaseVNode("div", _hoisted_22, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => isRef(previewData) ? previewData.value = $event : null),
							class: "sej-data-input",
							placeholder: unref(t)("engine.iconDataPlaceholder"),
							disabled: __props.busy,
							onInput: _cache[5] || (_cache[5] = (...args) => unref(markDataEdited) && unref(markDataEdited)(...args))
						}, null, 40, _hoisted_23), [[vModelText, unref(previewData)]]), createBaseVNode("button", {
							type: "button",
							class: normalizeClass(["sej-icon-preview-btn", { "sej-has-icon": unref(previewImage) }]),
							disabled: __props.busy,
							title: unref(previewImage) ? unref(t)("engine.uploadReplace") : unref(t)("engine.upload"),
							onClick: _cache[6] || (_cache[6] = (...args) => unref(pickFaviconFile) && unref(pickFaviconFile)(...args))
						}, [unref(previewImage) ? (openBlock(), createElementBlock("img", {
							key: 0,
							class: "sej-icon-preview",
							src: unref(dataIconLink),
							alt: ""
						}, null, 8, _hoisted_25)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(unref(t)("engine.upload")), 1)], 64))], 10, _hoisted_24)]),
						createBaseVNode("input", {
							ref_key: "faviconFileInput",
							ref: faviconFileInput,
							class: "sej-file-input",
							type: "file",
							accept: "image/*,.ico",
							onChange: _cache[7] || (_cache[7] = (...args) => unref(uploadFavicon) && unref(uploadFavicon)(...args))
						}, null, 544)
					])) : createCommentVNode("", true),
					!unref(initialAction) || unref(initialAction) === "open" ? (openBlock(), createElementBlock("label", _hoisted_26, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.target")), 1), withDirectives(createBaseVNode("select", {
						id: "iqxin-newTarget",
						"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => form.target = $event),
						disabled: __props.busy
					}, [createBaseVNode("option", _hoisted_28, toDisplayString(unref(t)("engine.targetBlank")), 1), createBaseVNode("option", _hoisted_29, toDisplayString(unref(t)("engine.targetSelf")), 1)], 8, _hoisted_27), [[vModelSelect, form.target]])])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_30, [
						__props.mode === "edit" ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[9] || (_cache[9] = ($event) => _ctx.$emit("delete"))
						}, toDisplayString(unref(t)("common.delete")), 9, _hoisted_31)) : createCommentVNode("", true),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[10] || (_cache[10] = ($event) => _ctx.$emit("cancel"))
						}, toDisplayString(unref(t)("common.cancel")), 9, _hoisted_32),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(__props.busy ? unref(t)("engine.fetching") : unref(t)("common.confirm")), 9, _hoisted_33)
					])
				], 512);
			};
		}
	};
	var _hoisted_1$5 = {
		id: "sej-category-title",
		class: "sej-dialog-title"
	};
	var _hoisted_2$5 = { class: "sej-field" };
	var _hoisted_3$5 = ["placeholder", "disabled"];
	var _hoisted_4$5 = { class: "sej-dialog-actions" };
	var _hoisted_5$5 = ["disabled"];
	var _hoisted_6$4 = ["disabled"];
	var _hoisted_7$3 = ["disabled"];
	var _sfc_main$7 = {
		__name: "CategoryEditDialog",
		props: {
			name: {
				type: String,
				default: ""
			},
			busy: {
				type: Boolean,
				default: false
			}
		},
		emits: [
			"submit",
			"delete",
			"cancel"
		],
		setup(__props, { emit: __emit }) {
			const props = __props;
			const emit = __emit;
			const rootEl = ref(null);
			const input = ref(null);
			const value = ref(props.name);
			useModalA11y({
				containerEl: rootEl,
				initialFocus: input,
				onClose: () => {
					if (!props.busy) emit("cancel");
				}
			});
			onMounted(() => {
				input.value?.focus();
				input.value?.select();
			});
			function submit() {
				if (props.busy) return;
				emit("submit", value.value.trim());
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: "sej-categoryBox",
					ref_key: "rootEl",
					ref: rootEl,
					class: "sej-dialog-box",
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "sej-category-title"
				}, [
					createBaseVNode("div", _hoisted_1$5, toDisplayString(unref(t)("category.title")), 1),
					createBaseVNode("label", _hoisted_2$5, [createBaseVNode("span", null, toDisplayString(unref(t)("common.name")), 1), withDirectives(createBaseVNode("input", {
						ref_key: "input",
						ref: input,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy,
						onKeydown: withKeys(submit, ["enter"])
					}, null, 40, _hoisted_3$5), [[vModelText, value.value]])]),
					createBaseVNode("div", _hoisted_4$5, [
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete"))
						}, toDisplayString(unref(t)("category.delete")), 9, _hoisted_5$5),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("cancel"))
						}, toDisplayString(unref(t)("common.cancel")), 9, _hoisted_6$4),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(unref(t)("common.confirm")), 9, _hoisted_7$3)
					])
				], 512);
			};
		}
	};
	var _hoisted_1$4 = ["aria-label"];
	var _hoisted_2$4 = { class: "sej-config-textarea" };
	var _hoisted_3$4 = { class: "sej-dialog-actions" };
	var _hoisted_4$4 = ["title"];
	var _hoisted_5$4 = {
		key: 1,
		class: "sej-import-mode"
	};
	var _hoisted_6$3 = ["disabled"];
	var _sfc_main$6 = {
		__name: "ConfigEditor",
		props: {
			initialText: {
				type: String,
				default: ""
			},
			defaultText: {
				type: String,
				default: ""
			},
			imported: {
				type: Object,
				default: null
			},
			mergePreview: {
				type: Function,
				default: null
			}
		},
		emits: ["apply", "cancel"],
		setup(__props, { emit: __emit }) {
			addStyle("\n#iqxin-editCodeBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 200000100;\n  width: min(560px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n}\n\n#iqxin-editCodeBox p {\n  margin: 0;\n}\n\n#iqxin-editCodeBox button {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition:\n    background-color 0.12s ease-out,\n    border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n\n#iqxin-editCodeBox button:hover {\n  background: var(--sej-surface-hover);\n}\n\n#iqxin-editCodeBox button:disabled {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n\n#iqxin-editCodeBox .iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n}\n\n#iqxin-editCodeBox .iqxin-enterBtn:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.92;\n}\n\n#iqxin-editCodeBox .iqxin-enterBtn:disabled,\n#iqxin-editCodeBox .iqxin-enterBtn:disabled:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.5;\n}\n\n#iqxin-editCodeBox .iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n\n/* 导入方式互斥勾选 */\n#iqxin-editCodeBox .sej-import-mode {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  font-size: 13px;\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  user-select: none;\n}\n\n/* 圆角裁剪滚动条，避免滚动条方角突出到圆角外 */\n#iqxin-editCodeBox .sej-config-textarea {\n  display: flex;\n  flex: 1 1 auto;\n  min-height: 240px;\n  overflow: hidden;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 10px;\n  background: var(--sej-input-bg);\n  transition:\n    border-color 0.12s ease-out,\n    box-shadow 0.12s ease-out;\n}\n\n#iqxin-editCodeBox .sej-config-textarea:focus-within {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n\n#iqxin-editCodeBox textarea {\n  width: 100%;\n  box-sizing: border-box;\n  flex: 1 1 auto;\n  min-height: 0;\n  padding: 10px;\n  overflow: auto;\n  border: 0;\n  border-radius: 0;\n  background: transparent;\n  color: var(--font-color-qxin);\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 12px;\n  line-height: 1.5;\n  resize: none;\n  outline: none;\n}\n\n#iqxin-editCodeBox textarea::-webkit-resizer,\n#iqxin-editCodeBox textarea::-webkit-scrollbar-corner {\n  background: transparent;\n}\n\n.iqxin-warning {\n  color: var(--sej-danger);\n  font-size: 14px;\n  font-weight: 600;\n}\n");
			const props = __props;
			const emit = __emit;
			const text = ref(props.initialText);
			const rootEl = ref(null);
			const textareaEl = ref(null);
			useModalA11y({
				containerEl: rootEl,
				initialFocus: textareaEl,
				onClose: () => emit("cancel")
			});
			const dirty = ref(false);
			const importMode = ref("merge");
			watch(() => props.initialText, (value) => {
				if (dirty.value || document.activeElement === textareaEl.value) return;
				text.value = value;
			});
			function previewMerge(silent = false) {
				const merged = props.mergePreview?.(props.imported, silent);
				if (!merged) return false;
				text.value = merged;
				dirty.value = true;
				return true;
			}
			function previewOverwrite() {
				text.value = JSON.stringify(props.imported, null, 4);
				dirty.value = true;
			}
			watch(importMode, (mode) => {
				if (!props.imported) return;
				if (mode === "merge") previewMerge();
				else previewOverwrite();
			});
			if (props.imported) previewMerge(true);
			function reset() {
				text.value = props.defaultText;
				dirty.value = true;
			}
			function apply() {
				emit("apply", text.value);
			}
			function cancel() {
				emit("cancel");
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: "iqxin-editCodeBox",
					ref_key: "rootEl",
					ref: rootEl,
					role: "dialog",
					"aria-modal": "true",
					"aria-label": unref(t)("settings.editConfig")
				}, [
					createBaseVNode("p", null, [
						_cache[4] || (_cache[4] = createBaseVNode("span", { class: "iqxin-warning" }, "! ! !", -1)),
						_cache[5] || (_cache[5] = createBaseVNode("br", null, null, -1)),
						createTextVNode(" " + toDisplayString(unref(t)("config.warningLine1")), 1),
						_cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
						createTextVNode(" " + toDisplayString(unref(t)("config.warningLine2")), 1)
					]),
					createBaseVNode("div", _hoisted_2$4, [withDirectives(createBaseVNode("textarea", {
						ref_key: "textareaEl",
						ref: textareaEl,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => text.value = $event),
						wrap: "off",
						cols: "45",
						rows: "20",
						onInput: _cache[1] || (_cache[1] = ($event) => dirty.value = true)
					}, null, 544), [[vModelText, text.value]])]),
					createBaseVNode("div", _hoisted_3$4, [
						createBaseVNode("button", {
							class: "sej-dialog-left",
							onClick: reset
						}, toDisplayString(unref(t)("config.reset")), 1),
						__props.imported ? (openBlock(), createElementBlock("label", {
							key: 0,
							class: "sej-import-mode",
							title: unref(t)("config.mergeTip")
						}, [withDirectives(createBaseVNode("input", {
							type: "radio",
							name: "sej-import-mode",
							value: "merge",
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => importMode.value = $event)
						}, null, 512), [[vModelRadio, importMode.value]]), createTextVNode(" " + toDisplayString(unref(t)("config.mergeImport")), 1)], 8, _hoisted_4$4)) : createCommentVNode("", true),
						__props.imported ? (openBlock(), createElementBlock("label", _hoisted_5$4, [withDirectives(createBaseVNode("input", {
							type: "radio",
							name: "sej-import-mode",
							value: "overwrite",
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => importMode.value = $event)
						}, null, 512), [[vModelRadio, importMode.value]]), createTextVNode(" " + toDisplayString(unref(t)("config.overwriteImport")), 1)])) : createCommentVNode("", true),
						createBaseVNode("button", {
							class: "iqxin-enterBtn",
							disabled: !dirty.value,
							onClick: apply
						}, toDisplayString(unref(t)("common.apply")), 9, _hoisted_6$3),
						createBaseVNode("button", { onClick: cancel }, toDisplayString(unref(t)("common.cancel")), 1)
					])
				], 8, _hoisted_1$4);
			};
		}
	};
	var COPY = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>";
	var EYE = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>";
	var EYE_OFF = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94\"/><path d=\"M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19\"/><path d=\"M14.12 14.12a3 3 0 1 1-4.24-4.24\"/><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/></svg>";
	var PENCIL = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z\"/></svg>";
	var TRASH = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 6h18\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/><path d=\"M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6\"/><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"/><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"/></svg>";
	var _hoisted_1$3 = ["id", "data-sej-drag-el"];
	var _hoisted_2$3 = [
		"data-xin",
		"data-iqxintitle",
		"title"
	];
	var _hoisted_3$3 = { class: "iqxin-pointer-events" };
	var _hoisted_4$3 = ["innerHTML"];
	var _hoisted_5$3 = ["title", "innerHTML"];
	var _hoisted_6$2 = ["title", "innerHTML"];
	var _hoisted_7$2 = ["data-sej-drag-el"];
	var _hoisted_8$2 = [
		"data-sej-drag-el",
		"title",
		"onPointerdown",
		"onClick"
	];
	var _hoisted_9$2 = [
		"data-iqxintitle",
		"data-iqxinimg",
		"data-iqxinlink",
		"data-iqxintarget",
		"data-iqxindisabled"
	];
	var _hoisted_10$2 = ["src"];
	var _hoisted_11$2 = ["innerHTML"];
	var _hoisted_12$1 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_13$1 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_14$1 = ["innerHTML"];
	var _hoisted_15$1 = {
		key: 2,
		class: "sej-copy-hint"
	};
	var _sfc_main$5 = {
		__name: "SettingsCategoryCard",
		props: {
			category: {
				type: Object,
				required: true
			},
			ci: {
				type: Number,
				required: true
			},
			dragCtx: {
				type: Object,
				default: null
			},
			copyTargetCi: {
				type: Number,
				default: null
			},
			displayName: {
				type: String,
				required: true
			},
			hideDelete: {
				type: Boolean,
				default: false
			}
		},
		emits: [
			"toggle-category",
			"open-category",
			"delete-category",
			"add-engine",
			"edit-engine",
			"toggle-engine",
			"delete-engine",
			"drag-start"
		],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: __props.category.key,
					class: normalizeClass(["iqxin-items", {
						"sej-category-hidden": !__props.category.enabled,
						"sej-no-delete": __props.hideDelete,
						"sej-drag-placeholder": __props.dragCtx?.type === "category" && __props.dragCtx.key === __props.category.key
					}]),
					"data-sej-drag-el": "category-" + __props.category._id
				}, [createBaseVNode("div", {
					class: "sejtitle drag",
					"data-xin": __props.category.enabled ? 1 : -1,
					"data-iqxintitle": __props.category.key,
					title: unref(t)("settings.editCategory", { name: __props.displayName }),
					onPointerdown: _cache[3] || (_cache[3] = ($event) => emit("drag-start", $event, "category", __props.ci)),
					onClick: _cache[4] || (_cache[4] = withModifiers(($event) => emit("open-category", __props.ci), ["stop"]))
				}, [
					createBaseVNode("span", _hoisted_3$3, toDisplayString(__props.displayName), 1),
					createBaseVNode("span", {
						class: "sej-hover-edit",
						innerHTML: unref(PENCIL)
					}, null, 8, _hoisted_4$3),
					createBaseVNode("span", {
						class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": !__props.category.enabled }]),
						title: __props.category.enabled ? unref(t)("common.hide") : unref(t)("common.show"),
						onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emit("toggle-category", __props.ci), ["stop"])),
						innerHTML: __props.category.enabled ? unref(EYE) : unref(EYE_OFF)
					}, null, 10, _hoisted_5$3),
					!__props.hideDelete ? (openBlock(), createElementBlock("span", {
						key: 0,
						class: "sej-hover-delete",
						title: unref(t)("settings.deleteCategory"),
						onPointerdown: _cache[1] || (_cache[1] = withModifiers(() => {}, ["stop"])),
						onClick: _cache[2] || (_cache[2] = withModifiers(($event) => emit("delete-category", __props.ci), ["stop"])),
						innerHTML: unref(TRASH)
					}, null, 40, _hoisted_6$2)) : createCommentVNode("", true)
				], 40, _hoisted_2$3), createBaseVNode("div", {
					class: "sejcon",
					"data-sej-drag-el": "list-" + __props.category._id
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(__props.category.engines, (engine, ei) => {
					return openBlock(), createElementBlock("span", {
						key: engine._id,
						class: normalizeClass(["drag", { "sej-drag-placeholder": __props.dragCtx?.type === "engine" && __props.dragCtx.key === engine._id }]),
						"data-sej-drag-el": "engine-" + engine._id,
						title: unref(t)("settings.editEngine", { name: unref(localizeEngineName)(engine.name) }),
						onPointerdown: ($event) => emit("drag-start", $event, "engine", __props.ci, ei),
						onClick: withModifiers(($event) => emit("edit-engine", __props.ci, ei), ["stop"])
					}, [
						createBaseVNode("span", {
							class: "sej-engine",
							"data-iqxintitle": engine.name,
							"data-iqxinimg": engine.favicon,
							"data-iqxinlink": engine.url,
							"data-iqxintarget": engine.target === "_self" ? "_self" : null,
							"data-iqxindisabled": engine.disable ? "true" : null
						}, [createBaseVNode("img", {
							class: "sej-engine-icon",
							src: unref(getFaviconSrc)(engine),
							alt: ""
						}, null, 8, _hoisted_10$2), createBaseVNode("span", null, toDisplayString(unref(localizeEngineName)(engine.name)), 1)], 8, _hoisted_9$2),
						createBaseVNode("span", {
							class: "sej-hover-edit",
							innerHTML: unref(PENCIL)
						}, null, 8, _hoisted_11$2),
						createBaseVNode("span", {
							class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": engine.disable }]),
							title: engine.disable ? unref(t)("common.show") : unref(t)("common.hide"),
							onClick: withModifiers(($event) => emit("toggle-engine", __props.ci, ei), ["stop"]),
							innerHTML: engine.disable ? unref(EYE_OFF) : unref(EYE)
						}, null, 10, _hoisted_12$1),
						!__props.hideDelete ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: "sej-hover-delete",
							title: unref(t)("settings.deleteEngine"),
							onPointerdown: _cache[5] || (_cache[5] = withModifiers(() => {}, ["stop"])),
							onClick: withModifiers(($event) => emit("delete-engine", __props.ci, ei), ["stop"]),
							innerHTML: unref(TRASH)
						}, null, 40, _hoisted_13$1)) : createCommentVNode("", true)
					], 42, _hoisted_8$2);
				}), 128)), createBaseVNode("span", {
					class: normalizeClass(["iqxin-additem", { "sej-copy-target": __props.copyTargetCi === __props.ci }]),
					onClick: _cache[6] || (_cache[6] = withModifiers(($event) => emit("add-engine", __props.ci), ["stop"]))
				}, [__props.copyTargetCi === __props.ci ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: "sej-copy-icon",
					innerHTML: unref(COPY)
				}, null, 8, _hoisted_14$1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode("+")], 64)), __props.copyTargetCi === __props.ci ? (openBlock(), createElementBlock("span", _hoisted_15$1, toDisplayString(unref(t)("settings.copyHere")), 1)) : createCommentVNode("", true)], 2)], 8, _hoisted_7$2)], 10, _hoisted_1$3);
			};
		}
	};
	var _hoisted_1$2 = { class: "sej-footer-bar" };
	var _hoisted_2$2 = { class: "sej-footer-selects" };
	var _hoisted_3$2 = {
		id: "xin-modification",
		class: "sej-config-box"
	};
	var _hoisted_4$2 = ["title"];
	var _hoisted_5$2 = ["title"];
	var _hoisted_6$1 = ["title"];
	var _hoisted_7$1 = { class: "sej-footer-links" };
	var _hoisted_8$1 = ["title"];
	var _hoisted_9$1 = ["title"];
	var _hoisted_10$1 = { class: "sej-footer-actions" };
	var _hoisted_11$1 = ["title"];
	var _sfc_main$4 = {
		__name: "SettingsFooter",
		props: { saving: {
			type: Boolean,
			default: false
		} },
		emits: [
			"open-config",
			"pick-config-file",
			"export-config",
			"save"
		],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$2, [
					createBaseVNode("div", _hoisted_2$2, [createBaseVNode("div", _hoisted_3$2, [
						createBaseVNode("button", {
							type: "button",
							class: "sej-config-open",
							title: unref(t)("settings.editConfig"),
							onClick: _cache[0] || (_cache[0] = ($event) => emit("open-config"))
						}, [_cache[4] || (_cache[4] = createBaseVNode("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"aria-hidden": "true"
						}, [createBaseVNode("circle", {
							cx: "12",
							cy: "12",
							r: "3"
						}), createBaseVNode("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" })], -1)), createTextVNode(" " + toDisplayString(unref(t)("settings.editConfig")), 1)], 8, _hoisted_4$2),
						_cache[7] || (_cache[7] = createBaseVNode("span", {
							class: "sej-config-sep",
							"aria-hidden": "true"
						}, null, -1)),
						createBaseVNode("button", {
							type: "button",
							class: "sej-config-action",
							title: unref(t)("config.import"),
							onClick: _cache[1] || (_cache[1] = ($event) => emit("pick-config-file"))
						}, [_cache[5] || (_cache[5] = createBaseVNode("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"aria-hidden": "true"
						}, [
							createBaseVNode("path", { d: "M12 21V9" }),
							createBaseVNode("path", { d: "m7 14 5-5 5 5" }),
							createBaseVNode("path", { d: "M5 3h14" })
						], -1)), createTextVNode(" " + toDisplayString(unref(t)("config.import")), 1)], 8, _hoisted_5$2),
						_cache[8] || (_cache[8] = createBaseVNode("span", {
							class: "sej-config-sep",
							"aria-hidden": "true"
						}, null, -1)),
						createBaseVNode("button", {
							type: "button",
							class: "sej-config-action",
							title: unref(t)("config.export"),
							onClick: _cache[2] || (_cache[2] = ($event) => emit("export-config"))
						}, [_cache[6] || (_cache[6] = createBaseVNode("svg", {
							width: "16",
							height: "16",
							viewBox: "0 0 24 24",
							fill: "none",
							stroke: "currentColor",
							"stroke-width": "2",
							"stroke-linecap": "round",
							"stroke-linejoin": "round",
							"aria-hidden": "true"
						}, [
							createBaseVNode("path", { d: "M12 3v12" }),
							createBaseVNode("path", { d: "m7 10 5 5 5-5" }),
							createBaseVNode("path", { d: "M5 21h14" })
						], -1)), createTextVNode(" " + toDisplayString(unref(t)("config.export")), 1)], 8, _hoisted_6$1)
					])]),
					createBaseVNode("div", _hoisted_7$1, [createBaseVNode("span", {
						class: "feedback",
						title: unref(t)("settings.feedbackGreasyFork")
					}, [..._cache[9] || (_cache[9] = [createBaseVNode("a", {
						target: "_blank",
						href: "https://greasyfork.org/zh-CN/users/1238054"
					}, "Greasy Fork", -1)])], 8, _hoisted_8$1), createBaseVNode("span", {
						class: "feedback",
						title: unref(t)("settings.feedbackGitHub")
					}, [..._cache[10] || (_cache[10] = [createBaseVNode("a", {
						target: "_blank",
						href: "https://github.com/sherlocknieh/Monkey-Scripts"
					}, "GitHub", -1)])], 8, _hoisted_9$1)]),
					createBaseVNode("div", _hoisted_10$1, [createBaseVNode("span", {
						id: "xin-save",
						title: unref(t)("settings.close"),
						class: normalizeClass({ "sej-saving": __props.saving }),
						onClick: _cache[3] || (_cache[3] = ($event) => emit("save"))
					}, toDisplayString(__props.saving ? unref(t)("settings.saving") : unref(t)("settings.close")), 11, _hoisted_11$1)])
				]);
			};
		}
	};
	var _hoisted_1$1 = { class: "sej-footer-options" };
	var _hoisted_2$1 = ["title"];
	var _hoisted_3$1 = ["checked"];
	var _hoisted_4$1 = { id: "xin-selectSearch" };
	var _hoisted_5$1 = ["checked"];
	var _hoisted_6 = ["title"];
	var _hoisted_7 = ["checked"];
	var _hoisted_8 = ["title"];
	var _hoisted_9 = ["checked"];
	var _hoisted_10 = ["title"];
	var _hoisted_11 = ["checked"];
	var _hoisted_12 = ["title"];
	var _hoisted_13 = ["checked"];
	var _hoisted_14 = { id: "xin-language" };
	var _hoisted_15 = ["value"];
	var _hoisted_16 = { value: "auto" };
	var _sfc_main$3 = {
		__name: "SettingsOptions",
		props: { options: {
			type: Object,
			required: true
		} },
		emits: ["update-option"],
		setup(__props, { emit: __emit }) {
			const emit = __emit;
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$1, [
					createBaseVNode("span", {
						id: "xin-HideTheSameLink",
						title: unref(t)("settings.hideSameLinkTip")
					}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.hideSameLink")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.HideTheSameLink,
						onChange: _cache[0] || (_cache[0] = ($event) => emit("update-option", "HideTheSameLink", $event.target.checked))
					}, null, 40, _hoisted_3$1)])], 8, _hoisted_2$1),
					createBaseVNode("span", _hoisted_4$1, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.selectSearch")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.selectSearch,
						onChange: _cache[1] || (_cache[1] = ($event) => emit("update-option", "selectSearch", $event.target.checked))
					}, null, 40, _hoisted_5$1)])]),
					withDirectives(createBaseVNode("span", {
						id: "xin-selectSearchInInput",
						title: unref(t)("settings.selectSearchInInputTip")
					}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.selectSearchInInput")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.selectSearchInInput,
						onChange: _cache[2] || (_cache[2] = ($event) => emit("update-option", "selectSearchInInput", $event.target.checked))
					}, null, 40, _hoisted_7)])], 8, _hoisted_6), [[vShow, __props.options.selectSearch]]),
					createBaseVNode("span", {
						id: "xin-centerDisplay",
						title: unref(t)("settings.centerTip")
					}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.center")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.center,
						onChange: _cache[3] || (_cache[3] = ($event) => emit("update-option", "center", $event.target.checked))
					}, null, 40, _hoisted_9)])], 8, _hoisted_8),
					createBaseVNode("span", {
						id: "iqxin-fixedTopS",
						title: unref(t)("settings.fixedTopTip")
					}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.fixedTop")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.fixedTop,
						onChange: _cache[4] || (_cache[4] = ($event) => emit("update-option", "fixedTop", $event.target.checked))
					}, null, 40, _hoisted_11)])], 8, _hoisted_10),
					withDirectives(createBaseVNode("span", {
						id: "iqxin-fixedTopUpward",
						title: unref(t)("settings.fixedTopUpwardTip")
					}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.fixedTopUpward")), 1), createBaseVNode("input", {
						type: "checkbox",
						checked: __props.options.fixedTopUpward,
						onChange: _cache[5] || (_cache[5] = ($event) => emit("update-option", "fixedTopUpward", $event.target.checked))
					}, null, 40, _hoisted_13)])], 8, _hoisted_12), [[vShow, __props.options.fixedTop]]),
					createBaseVNode("span", _hoisted_14, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.language")) + " ", 1), createBaseVNode("select", {
						class: "sej-language-select",
						value: __props.options.language,
						onChange: _cache[6] || (_cache[6] = ($event) => emit("update-option", "language", $event.target.value))
					}, [
						createBaseVNode("option", _hoisted_16, toDisplayString(unref(t)("settings.languageAuto")), 1),
						_cache[7] || (_cache[7] = createBaseVNode("option", { value: "zh-CN" }, "简体中文", -1)),
						_cache[8] || (_cache[8] = createBaseVNode("option", { value: "en" }, "English", -1))
					], 40, _hoisted_15)])])
				]);
			};
		}
	};
	var _hoisted_1 = {
		id: "sej-settings-title",
		class: "sej-panel-title"
	};
	var _hoisted_2 = ["title", "aria-label"];
	var _hoisted_3 = [
		"title",
		"aria-label",
		"onKeydown"
	];
	var _hoisted_4 = { id: "btnEle" };
	var _hoisted_5 = { class: "btnEleLayer" };
	var _sfc_main$2 = {
		__name: "SettingPanel",
		setup(__props) {
			addStyle(settingPanelStyles_default);
			const settings = useSettings();
			const { source, draft, nextId, buildResult, refreshDraft, displayCategoryName, toggleCategory, toggleEngine, appendCategory } = useSettingsDraft({ settings });
			const layerEl = ref(null);
			const maskEl = ref(null);
			const maskVisible = ref(false);
			const layerStyle = ref({});
			const categoryDialog = ref(null);
			const engineDialog = ref(null);
			const engineSaving = ref(false);
			const remoteSynced = ref(false);
			let closeTimer = null;
			let closed = false;
			let disposed = false;
			let viewportListenersBound = false;
			function syncPanelViewportHeight() {
				const mask = maskEl.value;
				if (!mask) return;
				const height = window.visualViewport?.height || window.innerHeight;
				if (height > 0) mask.style.setProperty("--sej-viewport-h", `${height}px`);
			}
			function bindViewportHeightListeners(bind) {
				if (bind === viewportListenersBound) return;
				viewportListenersBound = bind;
				const method = bind ? "addEventListener" : "removeEventListener";
				window[method]("resize", syncPanelViewportHeight);
				window[method]("orientationchange", syncPanelViewportHeight);
				window.visualViewport?.[method]("resize", syncPanelViewportHeight);
				window.visualViewport?.[method]("scroll", syncPanelViewportHeight);
			}
			const { saving, cancelAutoSave, scheduleAutoSave, flushPending, saveNow, notifySaved, markSettingsChanged, takeSettingsChanged, dispose: disposeAutoSave } = useAutoSave({
				buildResult,
				getCurrent: () => source.value,
				settings
			});
			const { configOpen, pendingImport, configFileInput, configText, defaultConfigText, openConfig, pickConfigFile, importConfigFile, exportConfig, mergePreview, applyConfig, cancelConfig } = useConfigIO({
				draft,
				nextId,
				buildResult,
				getCurrent: () => source.value,
				getSettings: () => settings,
				refreshDraft,
				cancelAutoSave,
				markSettingsChanged,
				notifySaved,
				resetRemoteSynced: () => {
					remoteSynced.value = false;
				}
			});
			const { deleteCategory, deleteEngine, undoDelete, canUndo } = useUndoDelete({
				draft,
				scheduleAutoSave,
				isDialogOpen: () => Boolean(engineDialog.value || categoryDialog.value || configOpen.value),
				closeCategoryDialog: () => {
					categoryDialog.value = null;
				}
			});
			const { getICON, refreshIconInBackground, loadAllIcons } = useEngineIcons({
				draft,
				scheduleAutoSave,
				isDisposed: () => disposed
			});
			watch(() => OPTION_KEYS.map((key) => draft[key]), () => scheduleAutoSave());
			watch(() => draft.language, (value) => setLanguagePreference(value));
			useRemoteSettingsSync({
				settings,
				source,
				buildResult,
				refreshDraft,
				saving,
				remoteSynced,
				isOverlayOpen: () => Boolean(engineDialog.value || categoryDialog.value || configOpen.value),
				cancelAutoSave,
				closeOverlays: () => {
					engineDialog.value = null;
					categoryDialog.value = null;
					configOpen.value = false;
				}
			});
			const { dragCtx, copyTargetCi, onDragPointerDown, onWindowBlur, consumeClickSuppression, dispose: disposeDragSort } = useDragSort({
				draft,
				layerEl,
				nextId,
				scheduleAutoSave
			});
			const { openCategoryDialog, submitCategory, cancelCategoryDialog, deleteCategoryFromDialog, addEngine, editEngine, cancelEngineDialog, deleteEngineFromDialog, submitEngine } = useSettingsDialogs({
				draft,
				nextId,
				categoryDialog,
				engineDialog,
				engineSaving,
				scheduleAutoSave,
				deleteCategory,
				deleteEngine,
				refreshIconInBackground,
				consumeClickSuppression
			});
			function onToggleCategory(ci) {
				toggleCategory(ci);
				scheduleAutoSave();
			}
			function onToggleEngine(ci, ei) {
				toggleEngine(ci, ei);
				scheduleAutoSave();
			}
			function updateOption(key, value) {
				draft[key] = value;
			}
			async function addCategory() {
				appendCategory(t("category.newName"));
				scheduleAutoSave();
				await nextTick();
				const body = layerEl.value?.querySelector("#sej-settings-body");
				if (body) body.scrollTop = body.scrollHeight;
			}
			function save() {
				if (saveNow()) close();
			}
			function finishClose() {
				if (closed) return;
				closed = true;
				clearTimeout(closeTimer);
				closeTimer = null;
				flushPending();
				closeSettingPanel();
				if (remoteSynced.value || takeSettingsChanged()) {
					remoteSynced.value = false;
					setTimeout(requestRestart, 0);
				}
			}
			function onMaskTransitionEnd(e) {
				if (e.target !== maskEl.value || e.propertyName !== "opacity") return;
				if (maskVisible.value) return;
				finishClose();
			}
			function close() {
				if (!maskVisible.value) return;
				maskVisible.value = false;
				closeTimer = setTimeout(finishClose, 400);
			}
			function onKeydown(e) {
				if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
				if (e.key.toLowerCase() !== "z") return;
				if (!canUndo()) return;
				const target = e.composedPath?.()[0] || e.target;
				if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return;
				e.preventDefault();
				undoDelete();
			}
			useModalA11y({
				containerEl: layerEl,
				onClose: close
			});
			const { startDrag, dispose: disposePanelDrag } = usePanelDrag({
				layerEl,
				maskEl,
				layerStyle
			});
			useEventIsolation(maskEl);
			onMounted(() => {
				document.body.style.overflow = "hidden";
				document.addEventListener("keydown", onKeydown, true);
				window.addEventListener("blur", onWindowBlur);
				syncPanelViewportHeight();
				bindViewportHeightListeners(true);
				nextTick(() => {
					maskVisible.value = true;
					loadAllIcons();
				});
			});
			onBeforeUnmount(() => {
				disposed = true;
				flushPending();
				disposeAutoSave();
				disposeDragSort();
				document.body.style.overflow = "auto";
				document.removeEventListener("keydown", onKeydown, true);
				window.removeEventListener("blur", onWindowBlur);
				bindViewportHeightListeners(false);
				clearTimeout(closeTimer);
				disposePanelDrag();
				setLanguagePreference(settings.settingData.language);
			});
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: "settingLayerMask",
					ref_key: "maskEl",
					ref: maskEl,
					style: normalizeStyle({
						display: "flex",
						opacity: maskVisible.value ? 1 : 0
					}),
					onClick: withModifiers(close, ["self"]),
					onTransitionend: onMaskTransitionEnd
				}, [createBaseVNode("div", {
					id: "settingLayer",
					ref_key: "layerEl",
					ref: layerEl,
					role: "dialog",
					"aria-modal": "true",
					"aria-labelledby": "sej-settings-title",
					style: normalizeStyle(layerStyle.value),
					onClick: _cache[6] || (_cache[6] = withModifiers(() => {}, ["stop"]))
				}, [
					createBaseVNode("div", {
						class: "sej-panel-header",
						onPointerdown: _cache[1] || (_cache[1] = (...args) => unref(startDrag) && unref(startDrag)(...args)),
						onContextmenu: _cache[2] || (_cache[2] = withModifiers(() => {}, ["prevent"]))
					}, [createBaseVNode("span", _hoisted_1, toDisplayString(unref(t)("settings.title")), 1), createBaseVNode("button", {
						type: "button",
						class: "sej-panel-close",
						title: unref(t)("settings.close"),
						"aria-label": unref(t)("settings.close"),
						onClick: withModifiers(close, ["stop"]),
						onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, " ✕ ", 40, _hoisted_2)], 32),
					createBaseVNode("div", {
						id: "sej-settings-body",
						onDragstart: _cache[3] || (_cache[3] = withModifiers(() => {}, ["prevent"])),
						onContextmenu: _cache[4] || (_cache[4] = withModifiers(() => {}, ["prevent"]))
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(unref(draft).categories, (category, ci) => {
						return openBlock(), createBlock(_sfc_main$5, {
							key: category._id,
							category,
							ci,
							"drag-ctx": unref(dragCtx),
							"copy-target-ci": unref(copyTargetCi),
							"display-name": unref(displayCategoryName)(category),
							"hide-delete": unref(isBuiltinCategory)(category),
							onToggleCategory,
							onOpenCategory: unref(openCategoryDialog),
							onDeleteCategory: unref(deleteCategory),
							onAddEngine: unref(addEngine),
							onEditEngine: unref(editEngine),
							onToggleEngine,
							onDeleteEngine: unref(deleteEngine),
							onDragStart: unref(onDragPointerDown)
						}, null, 8, [
							"category",
							"ci",
							"drag-ctx",
							"copy-target-ci",
							"display-name",
							"hide-delete",
							"onOpenCategory",
							"onDeleteCategory",
							"onAddEngine",
							"onEditEngine",
							"onDeleteEngine",
							"onDragStart"
						]);
					}), 128)), createBaseVNode("div", {
						class: "iqxin-items sej-add-category-card",
						role: "button",
						tabindex: "0",
						title: unref(t)("settings.addCategory"),
						"aria-label": unref(t)("settings.addCategory"),
						onClick: addCategory,
						onKeydown: [withKeys(addCategory, ["enter"]), withKeys(withModifiers(addCategory, ["prevent"]), ["space"])]
					}, [..._cache[7] || (_cache[7] = [createBaseVNode("span", { class: "sej-add-category-plus" }, "+", -1)])], 40, _hoisted_3)], 32),
					createBaseVNode("div", _hoisted_4, [createBaseVNode("div", _hoisted_5, [createVNode(_sfc_main$3, {
						options: unref(draft),
						onUpdateOption: updateOption
					}, null, 8, ["options"]), createVNode(_sfc_main$4, {
						saving: unref(saving),
						onOpenConfig: unref(openConfig),
						onPickConfigFile: unref(pickConfigFile),
						onExportConfig: unref(exportConfig),
						onSave: save
					}, null, 8, [
						"saving",
						"onOpenConfig",
						"onPickConfigFile",
						"onExportConfig"
					])]), createBaseVNode("input", {
						ref_key: "configFileInput",
						ref: configFileInput,
						class: "sej-file-input",
						type: "file",
						accept: "application/json,.json",
						onChange: _cache[5] || (_cache[5] = (...args) => unref(importConfigFile) && unref(importConfigFile)(...args))
					}, null, 544)]),
					engineDialog.value ? (openBlock(), createBlock(_sfc_main$8, {
						key: 0,
						mode: engineDialog.value.mode,
						initial: engineDialog.value.initial,
						busy: engineSaving.value,
						"resolve-icon": unref(getICON),
						onSubmit: unref(submitEngine),
						onDelete: unref(deleteEngineFromDialog),
						onCancel: unref(cancelEngineDialog)
					}, null, 8, [
						"mode",
						"initial",
						"busy",
						"resolve-icon",
						"onSubmit",
						"onDelete",
						"onCancel"
					])) : createCommentVNode("", true),
					categoryDialog.value ? (openBlock(), createBlock(_sfc_main$7, {
						key: 1,
						name: unref(displayCategoryName)(unref(draft).categories[categoryDialog.value.index]) || "",
						onSubmit: unref(submitCategory),
						onDelete: unref(deleteCategoryFromDialog),
						onCancel: unref(cancelCategoryDialog)
					}, null, 8, [
						"name",
						"onSubmit",
						"onDelete",
						"onCancel"
					])) : createCommentVNode("", true),
					unref(configOpen) ? (openBlock(), createBlock(_sfc_main$6, {
						key: 2,
						"initial-text": unref(configText),
						"default-text": unref(defaultConfigText),
						imported: unref(pendingImport),
						"merge-preview": unref(mergePreview),
						onApply: unref(applyConfig),
						onCancel: unref(cancelConfig)
					}, null, 8, [
						"initial-text",
						"default-text",
						"imported",
						"merge-preview",
						"onApply",
						"onCancel"
					])) : createCommentVNode("", true)
				], 4)], 36);
			};
		}
	};
	var _sfc_main$1 = {
		__name: "Toast",
		setup(__props) {
			addStyle("\n/* 给用户的提示 */\n#iqixn-global-tip {\n  box-sizing: content-box !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  opacity: 0;\n  height: 25px;\n  line-height: 25px;\n  letter-spacing: 1px;\n  font-size: 14px;\n  color: #fff;\n  padding: 5px 20px;\n  border-radius: 8px;\n  background-color: #666;\n  position: fixed;\n  z-index: 200000001;\n  left: 50%;\n  bottom: 5%;\n  transform: translate(-50%);\n  pointer-events: none;\n  transition: opacity 0.15s ease-out;\n}\n\n#iqixn-global-tip.sej-toast-visible {\n  pointer-events: auto;\n}\n\n#iqixn-global-tip .sej-toast-action {\n  pointer-events: auto;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 10px;\n  background: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  font: inherit;\n  letter-spacing: inherit;\n  line-height: 20px;\n  cursor: pointer;\n  transition: background-color 0.12s ease-out;\n}\n\n#iqixn-global-tip .sej-toast-action:hover {\n  background: rgba(255, 255, 255, 0.34);\n}\n");
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", {
					id: "iqixn-global-tip",
					class: normalizeClass({ "sej-toast-visible": unref(ui).toastVisible }),
					style: normalizeStyle({ opacity: unref(ui).toastVisible ? 1 : 0 })
				}, [createBaseVNode("span", null, toDisplayString(unref(ui).toastText), 1), unref(ui).toastActionLabel ? (openBlock(), createElementBlock("button", {
					key: 0,
					type: "button",
					class: "sej-toast-action",
					onClick: _cache[0] || (_cache[0] = (...args) => unref(runToastAction) && unref(runToastAction)(...args))
				}, toDisplayString(unref(ui).toastActionLabel), 1)) : createCommentVNode("", true)], 6);
			};
		}
	};
	var _sfc_main = {
		__name: "App",
		setup(__props) {
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock(Fragment, null, [
					createVNode(_sfc_main$9),
					unref(ui).settingPanelOpen ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : createCommentVNode("", true),
					createVNode(_sfc_main$1)
				], 64);
			};
		}
	};
	var global_default = "/* ==UserStyle==\n@name           SearchEngineJumpPlusGlobalStyle\n@description    Global style for SearchEngineJumpPlus\n@version        5.32.0\n@namespace      https://greasyfork.org/en/scripts/454280-searchenginejumpplus\n@license        MIT\n@author         MUTED64\n==/UserStyle== */\n\n/* 夜间模式 - 默认主题变量 */\n:host {\n  /* 作为分类下拉面板的定位上下文，使面板能用 absolute 天然跟随跳转条 */\n  position: relative;\n  --font-color-qxin: #333;\n  --background-color-qxin: #fffffff0;\n  --background-hover-color-qxin: #eaeaea;\n  --trigger-shown-qxin: #f1f3f4 !important;\n  --background-setting-qxin: #fff;\n  --border-color-sej: #e1e6ea;\n\n  /* 跳转条现代化外观 */\n  --sej-font-family:\n    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',\n    'Microsoft YaHei', sans-serif;\n  --sej-bar-bg: rgba(255, 255, 255, 0.88);\n  --sej-hover-bg: rgba(0, 0, 0, 0.055);\n  --sej-active-bg: rgba(0, 0, 0, 0.1);\n  --sej-accent: #4285f4;\n  --sej-accent-weak: rgba(66, 133, 244, 0.12);\n  --sej-radius-bar: 12px;\n  --sej-radius-item: 8px;\n  --sej-radius-menu: 12px;\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.06), 0 8px 24px -12px hsla(0, 0%, 0%, 0.35);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 16px 40px -12px hsla(0, 0%, 0%, 0.3);\n\n  /* 设置面板 */\n  --sej-surface-2: rgba(0, 0, 0, 0.025);\n  --sej-surface-hover: rgba(0, 0, 0, 0.06);\n  --sej-input-bg: #fff;\n  --sej-btn-bg: #fff;\n  --sej-checkbox-border: #cfd5dd;\n  --sej-focus-ring: rgba(66, 133, 244, 0.22);\n  --sej-accent-contrast: #fff;\n  --sej-danger: #d93025;\n  --sej-danger-weak: rgba(217, 48, 37, 0.1);\n  --sej-success: #188038;\n  --sej-success-weak: rgba(24, 128, 56, 0.14);\n  --sej-panel-shadow: 0 24px 64px -24px hsla(0, 0%, 0%, 0.45), 0 2px 8px hsla(0, 0%, 0%, 0.06);\n}\n\n/* 暗黑模式变量 - 当主文档是暗黑模式时 */\n:host([qxintheme='dark']) {\n  --font-color-qxin: #bdc1bc;\n  --background-color-qxin: #202124f0;\n  --background-hover-color-qxin: #424242;\n  --trigger-shown-qxin: #3c4043 !important;\n  --background-setting-qxin: #202124;\n  --border-color-sej: #3b4547;\n\n  --sej-bar-bg: rgba(32, 33, 36, 0.9);\n  --sej-hover-bg: rgba(255, 255, 255, 0.09);\n  --sej-active-bg: rgba(255, 255, 255, 0.14);\n  --sej-accent: #8ab4f8;\n  --sej-accent-weak: rgba(138, 180, 248, 0.18);\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5), 0 8px 24px -12px hsla(0, 0%, 0%, 0.8);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5), 0 16px 40px -12px hsla(0, 0%, 0%, 0.85);\n\n  --sej-surface-2: rgba(255, 255, 255, 0.045);\n  --sej-surface-hover: rgba(255, 255, 255, 0.09);\n  --sej-input-bg: #17181a;\n  --sej-btn-bg: rgba(255, 255, 255, 0.04);\n  --sej-checkbox-border: #4a5459;\n  --sej-focus-ring: rgba(138, 180, 248, 0.3);\n  --sej-accent-contrast: #202124;\n  --sej-danger: #f28b82;\n  --sej-danger-weak: rgba(242, 139, 130, 0.14);\n  --sej-success: #81c995;\n  --sej-success-weak: rgba(129, 201, 149, 0.16);\n  --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85), 0 2px 8px hsla(0, 0%, 0%, 0.5);\n}\n\n/* 分类下拉菜单挂载容器本身不参与布局 */\n#sej-drop-lists {\n  display: contents;\n}\n";
	var THEME_ATTRS = [
		"data-theme",
		"data-color-scheme",
		"data-color-mode",
		"theme"
	];
	var DARK_HINT = /dark|night/;
	var LIGHT_HINT = /light/;
	function indicatorHint(value) {
		if (!value) return null;
		const lower = value.toLowerCase();
		if (DARK_HINT.test(lower)) return true;
		if (LIGHT_HINT.test(lower)) return false;
		return null;
	}
	function themeHint() {
		const elements = [document.documentElement, document.body].filter(Boolean);
		for (const el of elements) for (const attr of THEME_ATTRS) {
			const hint = indicatorHint(el.getAttribute(attr));
			if (hint !== null) return hint;
		}
		for (const el of elements) {
			const hint = indicatorHint(typeof el.className === "string" ? el.className : "");
			if (hint !== null) return hint;
		}
		return null;
	}
	function isDarkColor(color) {
		const match = /^rgba?\(([^)]+)\)/.exec(color || "");
		if (!match) return null;
		const [r, g, b, a = 1] = match[1].split(/[\s,/]+/).map(Number);
		if (![
			r,
			g,
			b
		].every(Number.isFinite) || a < .5) return null;
		return (r * 299 + g * 587 + b * 114) / 1e3 < 128;
	}
	function isDarkMode() {
		const hint = themeHint();
		if (hint !== null) return hint;
		try {
			const colorScheme = getComputedStyle(document.documentElement).colorScheme;
			if (colorScheme && colorScheme.split(/\s+/).includes("dark")) return true;
		} catch (e) {}
		const start = document.querySelector("#app, main, [role=\"main\"], .app") || document.body;
		for (let el = start; el; el = el.parentElement) {
			const dark = isDarkColor(getComputedStyle(el).backgroundColor);
			if (dark !== null) return dark;
		}
		return Boolean(window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches);
	}
	function applyDarkModeIfNeeded() {
		const host = getHost();
		const dark = isDarkMode();
		if (dark === host.hasAttribute("qxintheme")) return;
		if (dark) host.setAttribute("qxintheme", "dark");
		else host.removeAttribute("qxintheme");
	}
	var darkModeWatched = false;
	var refreshTimer = null;
	function scheduleRefresh() {
		if (refreshTimer) return;
		refreshTimer = setTimeout(() => {
			refreshTimer = null;
			applyDarkModeIfNeeded();
		}, 50);
	}
	function watchDarkModeChanges() {
		if (darkModeWatched) return;
		darkModeWatched = true;
		if (window.matchMedia) {
			const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
			if (darkModeQuery.addEventListener) darkModeQuery.addEventListener("change", scheduleRefresh);
			else if (darkModeQuery.addListener) darkModeQuery.addListener(scheduleRefresh);
		}
		if (typeof MutationObserver === "function") {
			const observer = new MutationObserver(scheduleRefresh);
			const observe = (el, attributeFilter) => {
				if (el) observer.observe(el, {
					attributes: true,
					attributeFilter
				});
			};
			observe(document.documentElement, [
				"class",
				"style",
				...THEME_ATTRS
			]);
			observe(document.body, ["class", ...THEME_ATTRS]);
			document.addEventListener("DOMContentLoaded", () => {
				observe(document.body, ["class", ...THEME_ATTRS]);
				scheduleRefresh();
			});
		}
		[
			200,
			800,
			2e3
		].forEach((delay) => {
			setTimeout(applyDarkModeIfNeeded, delay);
		});
	}
	var registered = false;
	function registerMenu(beforeOpen) {
		if (registered) return;
		const gm = globalThis.GM;
		const gmMenu = typeof gm?.registerMenuCommand === "function" ? gm.registerMenuCommand.bind(gm) : null;
		const register = typeof _GM_registerMenuCommand === "function" ? _GM_registerMenuCommand : gmMenu;
		if (!register) {
			registered = true;
			console.info("[SEJ] 当前脚本管理器不支持菜单命令，可使用跳转条右侧的设置按钮");
			return;
		}
		try {
			register(t("menu.settings"), () => {
				beforeOpen?.();
				openSettingPanel();
			});
			registered = true;
		} catch (e) {
			console.warn("[SEJ] 注册菜单命令失败", e);
		}
	}
	var app = null;
	function isRunning() {
		return Boolean(document.getElementById(HOST_ID));
	}
	function teardown() {
		if (app) {
			try {
				app.unmount();
			} catch (e) {}
			app = null;
		}
		reset();
	}
	function boot({ force = false } = {}) {
		if (!force && isRunning()) return;
		teardown();
		const root = initialize();
		addStyle(global_default);
		applyDarkModeIfNeeded();
		watchDarkModeChanges();
		document.body.appendChild(getHost());
		app = createApp(_sfc_main);
		app.mount(root);
		registerMenu();
	}
	function restart() {
		closeSettingPanel();
		boot({ force: true });
	}
	function printBanner() {
		try {
			const name = _GM_info?.script?.name;
			const version = _GM_info?.script?.version;
			if (!name) return;
			console.info(`\n%c ${name} v${version} \n%c 问题反馈(GitHub):\t\thttps://github.com/MUTED64/SearchEngineJumpPlus/issues/new\t\t\t\t\t\t\t\n%c 问题反馈(GreasyFork):\thttps://greasyfork.org/scripts/454280-searchenginejumpplus-搜索引擎快捷跳转/feedback\t\n`, "color:#eee;background:#444;padding:6px 0;border-radius:6px 6px 0 0;", "color:#444;background:#eee;padding:6px 0;border-radius:0 6px 0 0", "color:#444;background:#eee;padding:6px 0;border-radius:0 0 6px 6px;");
		} catch (e) {}
	}
	var DELAY_START_PATTERNS = [
		/^https?:\/\/www\.zhihu\.com\/search\?/,
		/^https?:\/\/www\.iciba\.com\/word\?/,
		/^https?:\/\/search\.bilibili\.com\//,
		/^https?:\/\/(www\.)?baidu\.com/i
	];
	var DELAY_START_MS = 1e3;
	function shouldDelayStart(href = location.href) {
		return DELAY_START_PATTERNS.some((re) => re.test(href));
	}
	var startTimer = 0;
	var lazyListeners = null;
	async function startScript() {
		if (window.self !== window.top) return;
		printBanner();
		await initStorage([STORAGE_KEY]);
		registerMenu(requestBoot);
		armStart();
	}
	function armStart() {
		disarmLazyStart();
		const settings = useSettings();
		if (!settings.getMatchedRule()) {
			if (settings.settingData.selectSearch) armLazyStart(settings.settingData.selectSearchInInput);
			return;
		}
		scheduleBoot();
	}
	function scheduleBoot() {
		if (startTimer) return;
		if (shouldDelayStart()) startTimer = setTimeout(() => {
			startTimer = 0;
			boot();
		}, DELAY_START_MS);
		else boot();
	}
	function requestBoot() {
		disarmLazyStart();
		if (startTimer) {
			clearTimeout(startTimer);
			startTimer = 0;
		}
		boot();
	}
	function armLazyStart(includeInput) {
		const onSelectionChange = () => {
			if (!getSelectedText({ includeInput }).trim()) return;
			requestBoot();
		};
		document.addEventListener("selectionchange", onSelectionChange);
		document.addEventListener("mouseup", onSelectionChange);
		document.addEventListener("keyup", onSelectionChange);
		lazyListeners = () => {
			document.removeEventListener("selectionchange", onSelectionChange);
			document.removeEventListener("mouseup", onSelectionChange);
			document.removeEventListener("keyup", onSelectionChange);
		};
	}
	function disarmLazyStart() {
		if (lazyListeners) {
			lazyListeners();
			lazyListeners = null;
		}
	}
	function normalizeURL(urlString) {
		try {
			const url = new URL(urlString);
			if (url.hostname.includes("bilibili.com")) url.searchParams.delete("vt");
			return url.toString();
		} catch (e) {
			return urlString;
		}
	}
	function toComparable(url) {
		return normalizeURL(decodeURI(url).replaceAll(" ", "+"));
	}
	function isSameRule(a, b) {
		if (a === b) return true;
		if (!a || !b) return false;
		return a.url?.source === b.url?.source && a.url?.flags === b.url?.flags;
	}
	function needsRemount(settings) {
		if (!settings.barMounted) return true;
		return !isSameRule(settings.getMatchedRule(), settings.activeRule);
	}
	function listenUrlChange(onNavigate) {
		if (window.onurlchange !== null) return () => {};
		let lastURL = toComparable(location.href);
		let navigateTimer = 0;
		const onUrlChange = (e) => {
			const newURL = toComparable(e.url);
			if (lastURL === newURL) return;
			lastURL = newURL;
			clearTimeout(navigateTimer);
			navigateTimer = setTimeout(() => {
				navigateTimer = 0;
				if (!isRunning()) {
					teardown();
					onNavigate();
					return;
				}
				const settings = useSettings();
				if (needsRemount(settings)) {
					teardown();
					onNavigate();
					return;
				}
				settings.activeRule = settings.getMatchedRule();
			}, 100);
		};
		window.addEventListener("urlchange", onUrlChange);
		return () => {
			clearTimeout(navigateTimer);
			navigateTimer = 0;
			window.removeEventListener("urlchange", onUrlChange);
		};
	}
	var SYNC_DEBOUNCE_MS = 200;
	var SYNC_POLL_MS = 5e3;
	var started = false;
	var syncTimer = null;
	function applyRemoteSettings() {
		if (ui.settingPanelOpen) {
			ui.settingsRevision++;
			return;
		}
		if (!useSettings().reload()) return;
		if (!isRunning()) return;
		restart();
		showToast(t("toast.syncedFromOtherPages"));
	}
	function setupSettingsSync() {
		if (started) return;
		started = true;
		watchValue(STORAGE_KEY, () => {
			clearTimeout(syncTimer);
			syncTimer = setTimeout(applyRemoteSettings, SYNC_DEBOUNCE_MS);
		});
		const poll = async () => {
			if (!isRunning() || ui.settingPanelOpen || document.hidden) return;
			if (await pullLatest("searchEngineJumpData")) applyRemoteSettings();
		};
		setInterval(poll, SYNC_POLL_MS);
		document.addEventListener("visibilitychange", () => {
			if (!document.hidden) poll();
		});
		window.addEventListener("focus", poll);
	}
	onRestartRequest(restart);
	startScript();
	listenUrlChange(startScript);
	setupSettingsSync();
})();
