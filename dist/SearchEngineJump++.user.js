// ==UserScript==
// @name         SearchEngineJump++
// @namespace    https://github.com/sherlocknieh/
// @version      2026.10.22.24
// @author       sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)
// @description  Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。
// @license      MIT
// @icon         data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFSElEQVR4nMWXX4hdVxXGf2vfe89kJg61ia0DYzMTMWnoQ0FJtKmtJsFixT8DBSmYtGMLgq0PCqMEKwmxYzSGyUPBB7XRNi0FC6JtwYovgcS0klJD8SHakoExYhLQFkwn9/aeOfv7fDi3SStJ5o4muN4O7L32b33rz94H/s8WS10cvR3yVQaY++wnkESkwDK2sMy1EwXDtzRRziBhu+dGDG48smSA5kUP//wmAFIkrNwiGMOsBzYAQwTzEEeBY8BJO1fYtF+4laGPv/i/Afz1C1sAYwngZiKmsDcDI0DrHUtL4DRwMGAmUnVcCtpHPsrQbS/1DZDe+VFHblKziIjYBjwD3Iu5ARBwBjgJnAkwMAa+z+ZZqXEX8VZg0T784aUDzH3uk0DtVQvlVsMjwGpMB3gauAu8ieB2YDPwxR5gF/gQ+MeoNUFzACI4d+imvgDOp0BVRWo2AW62eRi8wvY/wNtrgGhDL+7a/gIcBLYBu4HrsPdSzr8K/JlcLk2BaCQstSxN2VptuYO93an7WES0UyORGg1Wfu0QKivyQhfb56yhn4B3Ynew1kD1oDTfJF20vi8NYBvjMVubbWHrOdtPhwaAYPVvfs8Hf1u32bJbDtXVbgFvAj4AOgTGzhPhGMdV/wCvbtmAJSyttzRiuWv7CdttAlY/f/iimwdvfQGiAfmtczg/jnOJ8/txtRbnvgAu6FSPtg1AC3wGPAvgWGRYqiSowLwC1Ru4GoFyFPc3ZM8DfGPLB1jZXlhe74sS6AAc+O6vL+tg6LaX2LP/SSA6tkpcYeee36/0D/C7Ve9BwZs97iLMEMDAE5N07z1wSQebvl/y3KkAGDIUsrHpRp8ACeDGw38kZdPMPtrILhvZ1yZ5TZJxvnwuW40GzSSaDa1vJq1oJXVbKZ9qpv5qoO6Cqr5ULB+zfNrygOX7LS+PlCgeu+eimz/1w0yWaTTScIqYTEERcDoiXovFauddAAA22CeRDyKD/Bnkbd32PNgUj09S/GwrUMt+x14hiWVFI1LEVyPidggi4hfOnuv3nr8AEGC5sj1j+4TtAcu7i4HlDwLLqRawMmtmnidn6JYLGIa7C/mbwHeAgYATQexPjVCVxcZd7SUACDCEfRyznXoMr8Sawf4lcDdwI7AKWAdss/0r2dOyr6kFpCn7hiyPRlDY5mM7z10W4F1KFT+/p6ZwDkgT2HuN19Tz3yXWG+NnJ8uR9h0FSStSRAFBwAmbpu3xbP/T9rzkp2zvtt2RzcvfG15EAaC8/8m6FkgmpWdsTyD/COtv9esnj1haZXvEtiXP2d5jc6es+3qHv8/2uO1v2d4hedA2H/n2vxZX4LwS+78E1PcDqprAOPZao9Gxs5PNkc6dXUKnIuI1Z8+lRijLo8AR2+OWqeeBS8n7bE8bd2x4Zc97FwcAaP307vqyiXi7QzBi7OyXGel8GkJEBAFUWUREIXlnL/LCvgBheZ9h2lLHyvxp5rrFAZZiG3e16zliBm3vsD0lu6i5ja0awppWrjrKmeOPjAL/UQP/rf1h11BPJHckT/dkL+vDjeXC0pRy3qGcB22x9oHZKwcAcPTh5UimzrWnexGXlrCFlAvlakq5eiiX3eLtSXnFAABe3j1c/0PgTp1z77NUKmesjHMulKuttq9X/eq+sgAAx35wTZ0OqWNrWqr2KVelqoqcF3DOL1r5dStfHQCoW03K9ApuWrnam/PCnHN+StZDRHSK1jLgCnXBpeymr/8dS+SFbmH7eiu/TkQnNRrkqmL20XVXFwBg7QOzRASSsDJFaxndssPso+uu9tH92b8BowSyPc/iZtEAAAAASUVORK5CYII=
// @match        *://*/*
// @connect      *
// @grant        GM.addValueChangeListener
// @grant        GM.deleteValue
// @grant        GM.getValue
// @grant        GM.removeValueChangeListener
// @grant        GM.setValue
// @grant        GM_addStyle
// @grant        GM_addValueChangeListener
// @grant        GM_deleteValue
// @grant        GM_getValue
// @grant        GM_info
// @grant        GM_openInTab
// @grant        GM_registerMenuCommand
// @grant        GM_removeValueChangeListener
// @grant        GM_setClipboard
// @grant        GM_setValue
// @grant        GM_xmlhttpRequest
// @grant        window.onurlchange
// @noframes
// ==/UserScript==

(function() {
	"use strict";
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
	var isObject$1 = (val) => val !== null && typeof val === "object";
	var isPromise = (val) => {
		return (isObject$1(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
	};
	var objectToString = Object.prototype.toString;
	var toTypeString = (value) => objectToString.call(value);
	var toRawType = (value) => {
		return toTypeString(value).slice(8, -1);
	};
	var isPlainObject = (val) => toTypeString(val) === "[object Object]";
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
		} else if (isString(value) || isObject$1(value)) return value;
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
		else if (isObject$1(value)) {
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
		aValidType = isObject$1(a);
		bValidType = isObject$1(b);
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
		return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? isRef$1(val) ? toDisplayString(val.value) : JSON.stringify(val, replacer, 2) : String(val);
	};
	var replacer = (_key, val) => {
		if (isRef$1(val)) return replacer(_key, val.value);
		else if (isMap(val)) return { [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2], i) => {
			entries[stringifySymbol(key, i) + " =>"] = val2;
			return entries;
		}, {}) };
		else if (isSet(val)) return { [`Set(${val.size})`]: [...val.values()].map((v) => stringifySymbol(v)) };
		else if (isSymbol(val)) return stringifySymbol(val);
		else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) return String(val);
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
				return isReadonly2 && isObject$1(value) ? readonly(value) : value;
			}
			if (isObject$1(res)) return isReadonly2 ? readonly(res) : reactive(res);
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
		if (!isObject$1(target)) return target;
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
	var toReactive = (value) => isObject$1(value) ? reactive(value) : value;
	var toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
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
		if (depth <= 0 || !isObject$1(value) || value["__v_skip"]) return value;
		seen = seen || new Map();
		if ((seen.get(value) || 0) >= depth) return value;
		seen.set(value, depth);
		depth--;
		if (isRef(value)) traverse(value.value, depth, seen);
		else if (isArray(value)) for (let i = 0; i < value.length; i++) traverse(value[i], depth, seen);
		else if (isSet(value) || isMap(value)) value.forEach((v) => {
			traverse(v, depth, seen);
		});
		else if (isPlainObject(value)) {
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
		} else if (isObject$1(source)) {
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
			if (!isObject$1(data)) {} else instance.data = reactive(data);
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
			if (isObject$1(opt)) {
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
		else if (isObject$1(raw)) {
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
		if (isObject$1(base)) cache.set(base, resolved);
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
			if (rootProps != null && !isObject$1(rootProps)) rootProps = null;
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
				version,
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
			if (isObject$1(comp)) cache.set(comp, null);
			return null;
		}
		if (isArray(raw)) raw.forEach((key) => normalized[key] = null);
		else extend(normalized, raw);
		if (isObject$1(comp)) cache.set(comp, normalized);
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
		if (key === "style" && isObject$1(nextProp) && isObject$1(prevProp)) return !looseEqual(nextProp, prevProp);
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
			if (isObject$1(comp)) cache.set(comp, EMPTY_ARR);
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
		if (isObject$1(comp)) cache.set(comp, res);
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
			if (isObject$1(style)) {
				if (isProxy(style) && !isArray(style)) style = extend({}, style);
				props.style = normalizeStyle(style);
			}
		}
		const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
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
	function createStaticVNode(content, numberOfNodes) {
		const vnode = createVNode(Static, null, content);
		vnode.staticCount = numberOfNodes;
		return vnode;
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
		} else if (isObject$1(setupResult)) instance.setupState = proxyRefs(setupResult);
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
	var version = "3.5.44";
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
	var vModelCheckbox = {
		deep: true,
		created(el, _, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			addEventListener(el, "change", () => {
				const modelValue = el._modelValue;
				const elementValue = getValue$1(el);
				const checked = el.checked;
				const assign = el[assignKey];
				if (isArray(modelValue)) {
					const index = looseIndexOf(modelValue, elementValue);
					const found = index !== -1;
					if (checked && !found) assign(modelValue.concat(elementValue));
					else if (!checked && found) {
						const filtered = [...modelValue];
						filtered.splice(index, 1);
						assign(filtered);
					}
				} else if (isSet(modelValue)) {
					const cloned = new Set(modelValue);
					if (checked) cloned.add(elementValue);
					else cloned.delete(elementValue);
					assign(cloned);
				} else assign(getCheckboxValue(el, checked));
			});
		},
		mounted: setChecked,
		beforeUpdate(el, binding, vnode) {
			el[assignKey] = getModelAssigner(vnode);
			setChecked(el, binding, vnode);
		}
	};
	function setChecked(el, { value, oldValue }, vnode) {
		el._modelValue = value;
		let checked;
		if (isArray(value)) checked = looseIndexOf(value, vnode.props.value) > -1;
		else if (isSet(value)) checked = value.has(vnode.props.value);
		else {
			if (value === oldValue) return;
			checked = looseEqual(value, getCheckboxValue(el, true));
		}
		if (el.checked !== checked) el.checked = checked;
	}
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
	function getCheckboxValue(el, checked) {
		const key = checked ? "_trueValue" : "_falseValue";
		return key in el ? el[key] : checked;
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
	var _GM_addStyle = (() => typeof GM_addStyle != "undefined" ? GM_addStyle : void 0)();
	var _GM_deleteValue = (() => typeof GM_deleteValue != "undefined" ? GM_deleteValue : void 0)();
	var _GM_getValue = (() => typeof GM_getValue != "undefined" ? GM_getValue : void 0)();
	var _GM_info = (() => typeof GM_info != "undefined" ? GM_info : void 0)();
	var _GM_openInTab = (() => typeof GM_openInTab != "undefined" ? GM_openInTab : void 0)();
	var _GM_registerMenuCommand = (() => typeof GM_registerMenuCommand != "undefined" ? GM_registerMenuCommand : void 0)();
	var _GM_setClipboard = (() => typeof GM_setClipboard != "undefined" ? GM_setClipboard : void 0)();
	var _GM_setValue = (() => typeof GM_setValue != "undefined" ? GM_setValue : void 0)();
	var _GM_xmlhttpRequest = (() => typeof GM_xmlhttpRequest != "undefined" ? GM_xmlhttpRequest : void 0)();
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
	function showToast(text, duration = 1500, action = null) {
		ui.toastText = text;
		ui.toastVisible = true;
		ui.toastActionLabel = action?.label || "";
		toastActionHandler = action?.onClick || null;
		clearTimeout(toastTimer);
		toastTimer = setTimeout(() => {
			ui.toastVisible = false;
			ui.toastActionLabel = "";
			toastActionHandler = null;
		}, duration);
	}
	function runToastAction() {
		const handler = toastActionHandler;
		if (!handler) return;
		clearTimeout(toastTimer);
		ui.toastVisible = false;
		ui.toastActionLabel = "";
		toastActionHandler = null;
		handler();
	}
	function openSettingPanel() {
		ui.settingPanelOpen = true;
	}
	function closeSettingPanel() {
		ui.settingPanelOpen = false;
	}
	var searchEngineJumpPlusEngines = {
		web: [
			{
				name: "百度",
				url: "https://www.baidu.com/s?wd=%s&ie=utf-8",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "Google",
				url: "https://www.google.com/search?q=%s&ie=utf-8&oe=utf-8",
				favicon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A"
			},
			{
				name: "必应",
				url: "https://www.bing.com/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jZ2Tv0sbYRyHX5Uzl8bLVNrSToUOHbr0T2gHqf1Baf8AvcUruNcpd5e75BK9H0Q9gptCogZKh6J2kWtDhkpxkmCwOIidijpYECoI5unQNo0QauwHnuUD78PL9/2+on9w0ItrWiSraiSNjER9w8NRTFUjuQvimhaJuKZ9ThaLJHyfGzMz3AxDRC6H7LooQYDi+50JApJhiJBVNVJ8nx7TZKhU4svhIYX1dW4XCsRsm4FstjOOg+K6fwXCMHiysMCfvKhUELp+OcHjcrkleL60hEil/l/wslKhxzAQuk6vaRLPZC5/g9dra5jVKvdnZ5FtG5FKIVkWSjeCB3NzvFpeBuD7yQnvd3YYW13lztQUsm1fLHhUKnE1n6e+v0973mxtIaXTJDKZLoY4Ps71yUneNhqt/uPuLrJlceUiwcP5ea5NTJCt1fh2fNzq321vI6XT/xacNZuUNzdpHBy0Dp41m1Tqde4Vi/RbVucZPG1bpPbU9vZ4triIlE7TZ5qdXyFmWdzyfYobG/w4PQXg69ERYysrKI6D0PXzu9Am+KAEAYrjELNthGEwVC5jVqvcDUOErv/6E45znlwOxfMQ8ujop2QYorguiueRcF16HQeRzSLl8wz87hXXPY/nkZye5icfi28JEi0cegAAAABJRU5ErkJggg=="
			},
			{
				name: "360",
				url: "https://www.so.com/s?ie=utf-8&q=%s",
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVR4nIWTvWtTURTAf+e+GpPWRFptmigIDhWELo5+DKLCMxZEJfVjEhTqok4O/geik2MdOuhUm4ogpTS6iNQoRV3sIOqQgpiX2NKEprH58B2HvMQEUnO3ezi/3/m4XKHD2fvywrCr1oirbvWPuh9XYs8znfIApPUSmR97KHAbaY8rVIBxx0487iz4ML4tsrrmCAxsVckTpRw7cbQ1ZgCiq2vLDViVSatAb8ZOSMZOiEttCFj0qh2Jzo8l2jqIJOM3BJmowxJ3Tk8/61Q9koxPCnINwHXN/mzsaRrACDzwcl5vBQM49sx1VDcARNxHLSNIqG51b/5vfgAVuV/vm+NtOwAI6sb3rgKVhTqP75+gpvTlK2SswM5ughoa9a9XQdGmYKK0pF9CKZYqi7e6CT5XF+5+63vLlcKP5UZMirODUz1GLgFsL2pQLv4qdoLLc7sPKeYTQEnN1YFR5wmA6DS+8o5wuT6jbmLMwUAsm26Ff8+GT4nhFYBCPnAm19/sAKD0InzY9JBqEspPRd8g+FE5IULIg93NcnmXz+c7aYnMqOqUAeg9m3unRofVe2eEPSJyWZBzDRjVtN+SUP/5Qt4S2efVP9D2aQBKc4PHBO6IyohCVeA9uPf8oytfW/PWk0PhoJ3NdVt81/MXwby4bACYqGIAAAAASUVORK5CYII="
			},
			{
				name: "yahoo",
				url: "https://search.yahoo.com/search;?p=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872979419' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='13466' width='32' height='32'%3E%3Cpath d='M513.216 69.568C332.224 69.568 161.216 45.76 0 0v1024c161.408-45.824 332.416-69.632 513.216-69.632 178.816 0 349.376 23.232 510.784 69.632V0c-161.408 46.4-331.776 69.568-510.784 69.568z m283.584 87.424l-6.208 9.792c-5.824 9.216-11.008 17.024-18.176 28.032-9.6 14.4-27.584 43.008-49.216 79.808-6.016 10.176-13.376 22.4-20.992 35.584l-44.032 74.368-16.384 28.608-43.392 75.584c-14.592 25.792-28.992 51.2-43.392 76.416v25.408c0 35.2 0.768 73.6 1.984 107.776 0.576 15.616 1.216 43.392 1.984 72.768 0.768 35.008 1.6 71.232 2.624 89.6l0.192 5.632v0.576l-6.016-1.6-6.976-1.792a197.952 197.952 0 0 0-22.592-3.584 172.224 172.224 0 0 0-28.416 0 195.712 195.712 0 0 0-29.568 5.376l-6.016 1.6v-0.576l0.192-5.632c0.832-18.176 1.792-54.592 2.624-89.6 0.576-29.376 1.408-57.216 1.984-72.768a2721.92 2721.92 0 0 0 1.984-107.776v-25.408L425.6 488.768c-14.208-25.024-28.992-50.624-43.2-75.584-5.632-9.6-11.008-19.2-16.384-28.608-12.8-22.208-29.376-49.984-44.032-74.368a2038.784 2038.784 0 0 1-20.992-35.584 1986.112 1986.112 0 0 0-49.216-79.808c-7.168-11.008-12.416-18.816-18.176-28.032l-6.208-9.792 11.2 3.2c14.208 4.032 28.8 6.016 44.416 6.016s30.592-1.984 44.608-6.016l3.392-1.024 1.792 3.008c27.584 49.792 101.824 171.776 146.176 244.8 15.168 25.216 27.392 44.992 33.408 55.168v-0.192 0.192l33.408-55.168c44.416-72.832 118.592-194.816 146.176-244.8l1.792-3.008 3.392 1.024c14.016 4.032 28.992 6.016 44.608 6.016s30.208-1.984 44.416-6.016l10.624-3.2z' p-id='13467' fill='%234C07A2'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "搜狗",
				url: "https://www.sogou.com/web?query=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872860655' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='11496' width='32' height='32'%3E%3Cpath d='M716.8 0c169.664 0 307.2 137.536 307.2 307.2v409.6c0 169.664-137.536 307.2-307.2 307.2H307.2C137.536 1024 0 886.464 0 716.8V307.2C0 137.536 137.536 0 307.2 0h409.6z m91.904 305.536c-18.304-22.016-176.1792-92.8384-333.8496-87.6672-157.6704 5.1712-277.568 84.3904-277.568 155.6864 0 71.3088 22.5408 161.3824 277.568 192.5632 221.4912 30.336 114.3424 113.8944 0 113.8944s-180.0832-41.1776-228.8256-41.1776c-48.7424 0-81.856 42.3808-21.2224 96.5888 55.36 49.4976 158.6304 62.1056 252.8512 69.568C571.8784 812.4544 832 794.88 832 638.8352c0-152.9088-205.8624-196.3776-294.5024-206.0416-88.6272-9.6768-131.1232-44.0064-131.1232-59.2384 0-15.5264 37.5552-54.0544 123.2512-44.096 85.696 9.9584 182.6304 44.096 221.696 44.096 39.0784 0 75.6992-46.0032 57.3824-68.0192z' fill='%23FF7D2A' p-id='11497'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "Startpage",
				url: "https://www.startpage.com/sp/search$post$query",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAA9ElEQVR4nO2WTUoDQRBGX5txIMRs/EFBAm49iEfxBN5J8AAeZwwkgmTR6e6ZHsNMDO2iFkEyibqQcVG1+aq74KvXteky9w8p0WMc9dlcARRAARRAARTgXwBk+z5jYyA/3p7zvDv/Ltp2N2/XoilBNj4Rw6sLuDyXwuRa9OxUdDz6ajoc/hwAYLUSrertnV2KmpT6XUiyvzBtGplxjPLksooA+FAB4HzZDdA0a2Ksmb2+4XzJYmFxPlBM51jr8aHCLgPOBQDqd5ntx2ZzECgbDPbWzOPTcyqmM5wvKV7mOw26zA8Z/jbMze2dLqUKoAAKoAC9xic+GmK9S0OJvAAAAABJRU5ErkJggg=="
			},
			{
				name: "Yandex",
				url: "https://yandex.com/search/?text=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872628734' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='10516' width='200' height='200'%3E%3Cpath d='M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z' p-id='10517' fill='%23FC401D'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "DDG",
				url: "https://duckduckgo.com/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADiElEQVQ4jXWTfVDTBRjHn+uyi8KAbWz7/TbeNzeUeNkLCljGS3hrspDUsC7vqivz5cI/OtQ7vSxNrpvdkQx0k10M5FYgztECgfOoM7kurs6IFx1ja7xsgMiLAySDffvDtLrs8/fz+T7PH8+X6BFIQymxOGb1WyWy8COH13LL9svCSgtEoTt4RMyj5h/CIRKfSImsMKu4NrOKZ6vZwDafz2Tbajaw9ur1wibzemHj+7Lwo0S06j9yYtgqRX0m216lFDS0FCR3Obcl3/FvFmJCFwt/0Rr0aOPGrVlsuymduVShEljDiCL+3hxCUbWZTLtBwfuqXyeZCThqsTTUj0BrPUZ2psGTE4mxQilmt8twLT/WVaUSXvgsjW8hoseJiOhYUuTpSqWw8YYmPjC6JQ5TtXqsLAYAAMu3fLj9eSk8eQw8OimmXpGjMzfWaU5nv94RvfodkoQ+se6cmm2+tDGqe1Ijxm+HXsd4IIi5+WUAQBDA6MRdePdq4c4Xw12wBlNFifginW0tTxN8Sa9Gh+02qlh7v0ayOJTNh8d4Ev7AMq4P+BAM3g/4rm8KvdVn4H6exWCOHMMaOTqzY1wGJXORDkg5H1ermZYRnQyubCEG9R/Av7CCsnOd+P3eCgCg68YCbnZ0YGyXCLf0AowfjML1PMm8UcHaqVTOO1WjFnWMFMjgyhWjZ48OC3/cPx9YRnD6POArAoZSsfT9k7jTEIHR/THoyZXerVYzLfReQvjRs0qRw7NFBmd+HH4pTMXk6Mhf/jTg4WDGRBjex4f33Th43ojHoEaG7nzJXKWSsdHLwmd2VSmE9h9flMwNaqT4NSca3mudeMCs4xDGj4fgdiUfc1YOJssF8OpkcGTF9FUomIvEIRIb0li7RSX+dqxAjt6NAgxYDA8Dpq116E+JhHdzPJxaKfpyZBjWymFQsPZPkvgWIiLancA9Up7C2K5sivd6XxCh98MS+JYmMDzvxqJ7AN2FctSVKtC9dS18LyWiXh3dZVKK257jPaV98IxPn0oWNpYlCera1cxN/55itLpt2H45A3uvbMObjiy89pMWP7ydioZk0dXyFNZWIuGW/asLoUR8fZLQenod325MlzsuXLVMHnMeRIXrLC67G4OHP8roPZ4hajI9y7YdSOB9+n+FfKw4KmLfSUlEbdPOvJ9dJv3sUnMTZmqM9yypsd+ckHLNm7ghW/8p/Alp3+8i87OHIgAAAABJRU5ErkJggg=="
			},
			{
				name: "Brave",
				url: "https://search.brave.com/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAA4pJREFUOE89U31MlXUUfs7v994LuyJLkmllrljdgjCd/BHttow+VsqkGJ8i0NCt1qQWSDaXcSNzrCG25Wo28mNmfNyLF9TV0KL8g/xDEhUHGFpAboKOj7oB3nvf9z2n3WvxbGd7zvac5+zs7CEsgAAI/D6fFixOsu1wCgxyasHtudmpsYqtW0KQu2ICQf5rolMx1NZ6VWrq2kxt0HYGPCAxNakIMyeCaAJiHTHD8U2lpRuCuLsr6hSj8Hp/NtKeDFZDqEqEW8OWfZTM+WHLNm1alHCPk5wvOBS9C+gwmMsKC3JGFjxEmHzt31cKuEZpo5xaDvfkozfZgnOlmATWCJ2bum9w7PV3ElyJxj4SlW7FyYaSjTmT0UOotTXgJsM4S8rY+so31eddJFmk9U6AnxDbBimnJWx9ooHuQ9k7rroSkzsV4fLAlQs1u+vqmL71dzZoUQ+nD1woSR1qO4Kk+wvlxSIF5SIsTQaPXQNNjrD65bsZk8QTKPg0WWnti4iZUZ6fN07+9pP9Fsue4h9fDcjMqjO06+A6VkwYn4K43ZDfLsFc7YGjsTKC0cHnfqjY1vfP3MpeFvGWFOZ2Uqv/5N+mHckqPZDfj2VpXbJt7/P09EvEl85DkpfDFgsctwhG/Zth4+b1Zz5KL+5zp60JaKV7NhXkNMYMImxmlRXlXbTz3R8wueocn51QPDwA+9YN8LMvA181wBj8aUQHp1fJ6Yn5Zl9Hh4McPUWFGxvJ136y32bes6kw1ye5j3pYUTd2NjlxZx785yiQmQU5sEPUyHCzbh8q2//5fuey5Q/2MuAtKXqtk9r8nQ0C9ZBGuDj/2C4XOzBkq/gH1HtfAI+kQurfBn7/lUnxG9p//VCLL+BRyvCZZGaU5eWNU1tbwA3DEXtjwcX1p/lq6vtis5eVKw5J94ImbzAR+rRlZX+5uX5+CeJPKKLLQ1d6a+rqPmYSEfL5T1WKohqldHlK14fnMmZm11vAXoKsYKGmUAi7j+fVW65Exz4C0sF3siPhSPhaxIxQNBi1td1G2upgtYiuIuFWtsyjT/U0Ty+dvbmiK+utUXvxknVapIpIh4WlDMJaQGeE6I+FMHm9XvXY42szlabtROQRYlORjghbiUJ6QkEOR8LBr0s3lwaP+TrWOLQ+K+BbMYP/gxEl0ThDEpJMFUkhgVODbs/NTo9VbKkIxXQSLaGW46fSDA799S9ht7upjiopCgAAAABJRU5ErkJggg=="
			}
		],
		video: [
			{
				name: "bilibili",
				url: "https://search.bilibili.com/all?keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAwElEQVQ4ja2Syw2DQAxEhwvdIHEklENFUIIN5EAftGAjigA6cA58krBZaZMwki+7nqfR7gC7zCLQUKDRBD41moCGAmaRe9mOKUgMrAsayVyzZGBdQGJox9QFmEVgbT9CXs2k9/cEncUgKcEyrQsBs+6W6CwGSMpgozslQDKDxFBr7n28s2rNN8CMg/atDt8ZwNqDtXcM53MvwJfIu3d5glBdCZi3ht2Czfs3skwAa/VzkVirZ5WPJEEzg7Vaq/ynHh0yOLrBLqn3AAAAAElFTkSuQmCC"
			},
			{
				name: "YouTube",
				url: "https://www.youtube.com/results?search_query=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872437167' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='8429' width='32' height='32'%3E%3Cpath d='M426.666667 682.666667V384l256 149.845333L426.666667 682.666667z m587.093333-355.541334s-10.026667-71.04-40.704-102.357333c-38.954667-41.088-82.602667-41.258667-102.613333-43.648C727.168 170.666667 512.213333 170.666667 512.213333 170.666667h-0.426666s-214.954667 0-358.229334 10.453333c-20.053333 2.389333-63.658667 2.56-102.656 43.648-30.677333 31.317333-40.661333 102.4-40.661333 102.4S0 410.538667 0 493.952v78.293333c0 83.456 10.24 166.912 10.24 166.912s9.984 71.04 40.661333 102.357334c38.997333 41.088 90.154667 39.765333 112.938667 44.074666C245.76 893.568 512 896 512 896s215.168-0.341333 358.442667-10.752c20.053333-2.432 63.658667-2.602667 102.613333-43.690667 30.72-31.317333 40.704-102.4 40.704-102.4s10.24-83.413333 10.24-166.869333v-78.250667c0-83.456-10.24-166.912-10.24-166.912z' fill='%23FF0000' p-id='8430'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "优酷",
				url: "http://www.soku.com/search_video/q_%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABnElEQVQ4jZ2Sv2vCUBDHv4OFYEAeRrFihjeYLl3eILRDhkcXKQg6tWAHs4W6WBAq2CWCFLe4CS7ZOhWyuHTK4uDmpKtD/4As3dOhOYk/SrGBg3fc+37u7vsCAOztPud/DXhEseoUN7cX6Qbi7/Yi3Vh1ihuqT+pZDwADAIyqzE2KKWatfEDiY/W5XVgCAGatfEBdm0K1mkK1+pI5NAF1jgWsKVSLIE2hWr92GFWZCwCUJ1ea24Xl14BHfckcAIDJFTmpZz0qUJhckX8CyINRlbnnDDw5kckVmVzB5Ip8vMo87ayw/wIUnz093AceMxkAWF8yh8z87Onh233Ov8yfCbpgckVSo7ldWMa7s1h+zjV77Gfunl0SKNcNS+t6AUqGUG8enuhMdc0e+5o99gEAqXJF6tN1pE/XEYkpz9Tajtb1AjoTgOqpckXuAJLiorsIUTLESYB9MQD8C5B/eV+SSScBNHvs70MIwFpD78CzkiEOTGStoZcEZmptZ5t3vaDoLkJ9uo4Krx+bn3lKhtjuTT9GDImfliWhW3Hs0Tdk6pGCP1WKswAAAABJRU5ErkJggg=="
			},
			{
				name: "腾讯视频",
				url: "https://v.qq.com/x/search/?q=%s",
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACNUlEQVR4nK2SS0iUYRSGn/P/42UcLCXDIoykaKhlSVCbGlu1MkgSJKE20saoyG2Q7QNpF0RIi6goXKQkLoIQhjBCNBAddFLGWw0q3ua/nxa/82eF0KID3+K7vC/Peb8DO+pKWi80p9W5mtbH/GPJzs3loUAFkOKp6GylbSR7UmLtZmDoAI06gE4P78+2nj7FvorPuB64HnieHF41tdD00c/sSqDvREHpPXF2zj24eAgRBBida2d4phORkCiEMu73peTh7wZvRQGeNJzbiu/JVYSC0EQERnIdfJm9HRmpqDN40SxHQp2BDTjgyHLcsn2aEkNcivfjOAa2E3Cytpu2M/WUmrPYruI6lKbe+0GqX4+GBM8MRaA7VYsI3Kqbj/BWvEle5htDIoGJpTbS2a5tOiHmm/UGFmBBwfax7AAliAyqY8e5eSBHmVeHZfkcqerBdn0sByxH2fDd0Rh2mJBl+wjClreKIWa4MBlf72Vxc4piNpZtIGj41aJPY1gCohTsAAE2/B+YlLDsZHk+3RKFZ3s1vB4ZRUTDFmAqc6PsTgw7jHtzrdqPlefNnonrLBbGoz5F4EPmBQtrKRDdNtQ3ufZ4M0AMJ+x374qxtVITVH5b/RoJx+Y7GVsozsI2NpLMd8QniznFsJnAkGTD0rLftzdARPg084ip/DUoCgFBX63fS7T8NYkAerdkMBuv+p5MZFqVkl8X4W3WtRLHeCDBn+LoSVRdGx4iZjggOqR+4vxuwv9WPwHg2/J5NFR2OgAAAABJRU5ErkJggg=="
			},
			{
				name: "AcFun",
				url: "https://www.acfun.cn/search/?type=complex&keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVQ4jX3MbUzUdQDA8b/1xrW1tlhrtmatF1qrVk5opajLUScgJtoIxXjQ1iobqzaV1MCWqZm2EumO8+C4Bw4OMsC8EGgeWkqi8vy/P8cBJ8cdTwccj/6u+4/79qLVy77b9+1Hcvb4Q2/oukS6SRZZ5YrItLpEpkUW71pkkVgRFO+b/xTZpjaRYXGLTKtLZJUrYpdZFhpdl6htHwpJSSVukkr7SDV5iNcqpJR5eK9S5hW74LjRyrcXCkmyTbKn0kuKsY94rUKa1cN2k4fXi3uRMiwusblYIafKS0FjgG0lCqvLwphs5/EVPk+sXZD9k4/kkl52mvspaAqwUddLvE4hy6IIKUHbKfKbAtwcmqfZO4dveoHnKiDb1EqbLpkXqyOsqoY1himGphZpH7mPdyrMSecIa87cEdLnlwbFF40BfmyZoEYOsQgMd15G+9UOFMMWhg3x1J3YSGdLHTfno/zcOcW/7atQhLTV0C2OXvHjUGbIKXcTBGZvFcEhCbX4SdA+AoclFp2HqFqE75tH/wMK6geFlGNTRFiNAnDs+hK3w9B2PgH13EOM6V5iTL+WvwofpjV/BUEV6obg+G/D2LtCHKsfFNIHdrcgusTcEuT5obPmBDN5EsEfnmBK/zKh4hcY18cy+tkDdBW9ybAKehe4/CEO/zIgpCyrIpx+ldnQGO1nXgXdMqKODSg6DSHtM8yeXo773AbUoBuqH6PxwxWw4CcgIMvqEtLRSx5xbQFqzPlwRCJ33TLWxq3nXscNVG0Mc2cfJSg3kLb3INt3ZhAtkGg8GYdjHs5e9QqpWRkXWj8cOfA23F3Jyth9SMtXoQYHWGo+yMwtI0QmiXn8aR6MWQfBWvK+/Jhv2iPc9k4KKc3YLVYXBflE7wChsL+ogafW5xIdbSI67UUdkWHOyabsU8Tt/RrCPnIvh3j2Ow/bDN1C2m2WRYK+l7fq70OfA3QfEf69HGabQa6CHjtMXyVyx86S9gD06Pm0IcBrF3ykl8n/AFvN99hT42f8j2oi1aeIdNcy0X+N8dZaxlouMqE4CSu/ol48zex1C/sdwySU+cgwuYSUWOom1eRmt9XDFtsomivzaCrHSDQMkGwLkGIbJbF0EI0tQGLDPBr7OO+YPaSX95OgdyPV3h0KbSrsEOkmWewwKiL1/y51iVSjItJNsthc1CFMN7yhvwH03PqrfJ8h8gAAAABJRU5ErkJggg=="
			},
			{
				name: "搜狐",
				url: "https://so.tv.sohu.com/mts?wd=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jW2SXUhTYRjHf2furH1vns0tc+p01YbSaRRGFGmElRWhRVR0VzeBCUkRKRQUURFBUYtMsAsvwqSLboqKii76oOjLLsKwLBLOjsM+iBEiEk8XOtCDD7zwwvv//57/+7wvWEpX1WUXqud33U1XPn+2cuHgm4bk9xeNqc+Xl1f0eiFi1c8s+wHNd6gzWpxZ7XXtrHBQMx/itR413RYPdbysXzQ80qxPnFkay8zp3jXP1V7ncPS74BbQD6ywavbGQm25lrTcXJN4OOtgS5G6L4oyDogNRYDfpdCUBN0KaYp4t+da0nJcX3AeAB+EU9gmAFGnzH8B2xlcmTElJBk8N6yQW8vjT7Lblv7zQZj1FHUVzNOAdoBruHsNRRMzlJCPkUVja7E3FQBxB6nRzbqc0MsuosKwfdpcBJOAE+Aq7l4DTQybJmY0KWagUnpw3wb8AN8aUuMvG2uGscFPUMSOIgrkC10yBQCaGASksL+Cqw/gQ13C/LKhJo8Xfi7DLo6p+JOAfVaCGesxvo/VsBhgKJ3IDzWk/rAV9XMvPtmPUw7gEmC3FfCV4EQrjo5CuhgsNPWEPK2rHqQFNWOiyQBBGUOTbjw5gIu4rxtocg//W+sPvBMKvzKXJKSzouQsXoiMEJzMKSEx0OQXmjzA/zoJej32DdYnvGLz9GVLy2SktmoSCALQifOsYQtL1rlg+r5B+UQwfw53dzOOPZso2nEC16UBAjljXolkY+VysCR4bBa5B/dtMxCX0Qpdst6YGPinp188a5BZX1S6wlq/NRkAR3Ce+l6amvixrlnGVm2U0bIayXrLxVAjYqDJsFI83urwdMxpnlH+o3bv6UclVR8GwlXmO2fUvE/g/WGcJwG3VfwfeW39pYdUeeAAAAAASUVORK5CYII="
			},
			{
				name: "niconico",
				url: "https://www.nicovideo.jp/search/%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAASUlEQVQ4jWNgoCYwMTH5b2Ji8p9ceZwKidZIsY2kYhQDSAW0MYAUg8h2AbJltA8DWGiTZQB6lJHlApK8QFFCghlCMMmSoZYgAAAvUMVwhox/egAAAABJRU5ErkJggg=="
			},
			{
				name: "爱奇艺",
				url: "https://so.iqiyi.com/so/q_%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABLAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAARJJREFUeJylk71KxFAQhb8bw7IKgbW0sxUuiPgA2ttsodhaLOwDiBDyALKNnYWBFJYiKttspUhaQRAh4GMoBDSkuRZOdHTDkrgHBs6dnzNT3ANzwkSJXQUOgPVuJ+gDFGVe29ztBEh9DDwD5z7wBPT+Nr5/5BOdW1oMdtSzL7Hly/Db8SBbbnN6lNhXYLvNTC1MGFsHHAJrwEDVJsA9cCKbUrWx4qmnBlYARsPMzFh4JPENX5Q2G1x7BewKv6uSnpzTBBeKn2mBX3DO1V4zGmbXdXxKoC2mBE5v9h/nUnx4udwLY+vC2N426TdRYh3//4k9UxH4MQsw0wvKbKkPbCBu5MsgFGWOt4A2D0WZ6wVjxI2fleZQvCOg+1AAAAAASUVORK5CYII="
			},
			{
				name: "樱花动漫",
				url: "https://www.imomoe.in/search.asp?searchword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABcAAAAXCAYAAADgKtSgAAAEZElEQVRIibVVTW9bRRQ9d2bee67tOk7qxq4TxaUJqdSQQJWqEKhAFMQCsWGDkMqKBUj8BPbwDxCb/gBYABUIgfgopQJRaNoqrUpImtAkrfPV1E6cOLHfm5mL3nPjJCQVYtErzeLd++bMveeeO4NHaRRiM/OuI0zov7sCXgtAvW0QQkCPLcJeno3+JleBOlMkT+ahlNq1n4j2BvfnKtBfjTGv1IDAQuZT4L6DRL/dZerLkMgkYJd9mMkl5koNzgtHyD1+6L/B/RsL0J/eZHEiB3mqQORJmPNTbH/8G+qdQVJPZBubAFgAwfV5mHN/sTx9mNxTh5uxEByb4OHyZ5ax9v73XLtahH3gC5dmxtqHF9gfmY2+rTWwxmztW1hF5YOf2J8uN32hiSbHzAg+/5PVS2GJ+WYGoUkAzpv9RNlko7pKDf5avRlX7Uk4AznwH3d38NvshLm+ACaCc/rIDuCofGNAXSmECdVG5hHUNbwns804P0hOFNK0JzgmSyw6UjtAQ8UEMyWILybY74iDYgpyogzqSoNv3IN+q5+Ep6AvFyEvzcIOdbIJNElH7aQFnSni+9WoSU3wuQpqw0XWCQlnWUPULEShBV7CIXVtAXp0ERvL69BXiiwHc0BxFfWPh1lX/UZTNxsahFl+dIkVC/BQJzmDeZjx+7BfjrN+Jkuy7DPtj5HxCGq0zDrtIkhJ2ne8E6o1DhIUJeafvcpocRF/o5/EJmf221uQJMGh9CZLUWM444Et4I2U2LTEyGz4LGfXWBeShKRLsZElFqNLEKKh6ajxr/USL1S3OA9uLkBfm2P33RMk2+JwQt98BXpsCTjWCpuJE+93ocaWQFaACy1whudZVjTMRIntqQJt8ivTMYiEswXOt0ssBtqh2uJNpYTKYM2w7XFSmqFu3GPuayfjyShFczJHwWSZkYqRqAcQXgMQgYExZguc4h7RRtDUqK0HCAcslJ+8OMPu9CpsPgndxRCrdfD9DdaSQIcSJB/PwJ9aBhXSkDEHQbECWNoG3t0Gc/52xH3oJingtCfg5FIwt8pkYor9nlZyRxbZ5BKw5RrkwQTks4fhCQFkt+n99yKrrobeI6pkIQ1iC3N1tiEhJSGEjILq1V7Qmf5Gx5Z98NIG+Ggbua90E12eQ+27W9E8hEqpX5gCL65DPV/YyjwEcV58jPxPrjMV0qQOxJtD5H8zzs5gnhIDeZjeDKmqD9nRAgWCn3KAH2ZZz1VhjAZXNNwzAyTjzk6dhyXVf52G/WWanZe7iTJxmJ+nmcsbcN87ScKR2Mvqn91kXqlDPN1B8mgGUjX+C2/F5viHp3jPFeCnXNIXZ9gKQGiG6DkAeghwNB93KsBQB7l92V3xPR+LkD+uBbCOQHD2CjtDBVIDO+9xW6nDnBtlUw3gvf0UyU0pbgI/7CXabv7YPQRfjzNy+6GySQoHwJTWOWysaIvBff0YSe9/PHP/Lt1UazDDc8BKnaMZT+8j2XMAIpvcdvPtBn90BuAfCZ4kdEzEwCkAAAAASUVORK5CYII=",
				disable: true
			}
		],
		music: [
			{
				name: "网易音乐",
				url: "https://music.163.com/#/search/m/?s=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666873073102' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='14673' width='200' height='200'%3E%3Cpath d='M604.71296 63.911253c-53.548373 19.667627-95.06816 77.038933-95.06816 132.222293 0 16.390827 3.822933 43.165013 8.741547 59.55584 4.911787 16.390827 7.645867 30.59712 6.557013 31.143253-0.546133 1.092267-18.03264 9.28768-38.792533 18.57536-72.669867 33.3312-124.576427 101.07904-134.956373 176.479573-18.029227 126.76096 60.101973 230.57408 173.202773 230.57408 72.666453 0 134.95296-43.165013 160.631467-110.36672 16.940373-45.89568 11.47904-104.905387-20.21376-204.89216-8.192-25.678507 54.64064 9.28768 95.617707 54.091093 50.26816 54.637227 68.297387 135.502507 46.987947 214.17984-19.124907 69.389653-77.03552 136.598187-146.428587 168.28416-184.674987 84.691627-385.737387-11.472213-440.920747-210.899627-20.763307-74.8544-13.66016-145.33632 22.401707-222.921387 27.86304-60.101973 86.326613-120.203947 146.97472-150.254933 48.626347-24.040107 58.463573-32.23552 62.83264-52.452693 3.826347-18.57536-8.741547-45.89568-25.678507-55.18336-36.061867-19.67104-118.019413 21.30944-192.8704 96.160427-68.84352 68.84352-101.625173 128.39936-119.657813 216.91392-38.792533 187.948373 57.91744 387.92192 227.84 470.429013 61.740373 30.59712 112.551253 42.06592 182.490453 42.06592 154.077867 0 289.57696-78.67392 355.689813-206.527147 32.781653-62.83264 40.977067-100.532907 37.700267-175.93344-2.73408-72.123733-10.92608-102.720853-40.98048-152.439467-49.718613-82.50368-134.406827-142.05952-216.364373-152.9856l-27.316907-3.280213-9.84064-32.781653c-13.653333-45.349547-12.56448-60.101973 4.37248-73.212587 18.029227-14.206293 37.700267-14.752427 62.286507-1.092267 46.441813 26.22464 54.64064 28.409173 73.216 22.398293 19.124907-6.007467 36.05504-30.047573 36.05504-51.357013 0-19.67104-26.76736-48.080213-63.924907-66.112853C696.507733 55.169707 639.68256 50.797227 604.71296 63.911253zM574.65856 460.032c19.12832 71.031467 20.76672 91.245227 9.291093 113.646933-18.57536 34.966187-72.666453 46.987947-99.44064 21.85216-22.401707-20.759893-29.50144-39.8848-29.50144-78.677333 0-40.434347 10.92608-67.20512 36.604587-90.699093 18.578773-17.483093 57.91744-38.2464 62.28992-33.327787C555.54048 395.014827 564.82816 425.065813 574.65856 460.032z' p-id='14674' fill='%23d81e06'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "QQ音乐",
				url: "https://y.qq.com/portal/search.html#page=1&searchid=1&remoteplace=txt.yqq.top&t=song&w=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADMklEQVQ4jY2TbVATdADG/3cBDgkNN2QyZWMhoKQwtLIyQ/DgaPvAAUVddUjU2UUdd3Z1vmR2B3VxUWhJqyBS0vAlDo7VImCWsPM4KcC0BtgYgzFjzcmY42Uovz7lnZ3n+Xx+fs+X53mEuDvJ1E+G7L5LrwjaqFmed6D8ibqaU6mdpd8s78ozLrny6M7FvUKIkDuSccrwRyy/Vg14ffUcdmt56aKcp87cR/a3S9C3rsHavcG2Pl6ScVtYs06ePePpmMXXQs/km1Q4tlDQJiOrPpw3GlR4/9JyfSwd34UH5rc8GPL0LXBoqFh11WmYXPC1sHC1lsnxfZRZNLzbloitL4fZoXwCl3TMDaXjP6/hsil6WhouEm8GfFyeU7vgbeaG+3OuT1Qwb99J9wUdr55O4FJvJtO/a/H3Z+HvS2OqW4PHFEPNW6GN//GLPMOHfPOuagLj+wmM7WFmoJhr/fkc6XmMyva1TJ3NwNuVxuSZzXg6NLgMSuwnlwaEEBFCtjQ4dW78IHP2t5m1ljBj3YH/z2K85ixGTI+zz6yh58dU3MZNuL5/iImmZJzHVYwfW4YySqQLdYxk2/TQbvyWHfgtz+MfLGDGVsKVjnRchof5uXUD77UmcPmUBufxZBxHkxitUzJaKyVJIfKFTBa80XtuO96eAqb6c7k2kIt/5FncYyX8NFDE4T+0lJoTaWuIY/TrNYzUxGOrXsXwp1JipGKbEEJI7E1b/f+0Z+ExZ+I9r8PhLmLM/xpn/36R0l+SeO6HFbx+MhLbF3EM69VYDyqwVETMCyGkQggh3i9eWe/Qr8ZaqeBcUwodzjw6HTmcHtFR99tm8uojyPwqlL4aJbYvVQx/puDQC2EtN2uUSIT6YlWsz/aRgoY6OYVGBbvaV3PAnMIHpiT2t8ZR0hzJ4LFYRo+qGNSvmI0IE+tuGVOqOiTXUrky0FUVRXbtYtKqF6HV38srJ+Tsao+m2RTLhDEBR+P9N9LWBxfeds7qqKCMznfk9u8+jOSZcglby4LY/kkYBoMSl2kt/UdUzmT1Pbo7HkoIIdkUH1xYWbTsRMteea+xLLqvujSyMT1F8rIQIuz/5n8BdBDOUVi5DnwAAAAASUVORK5CYII="
			},
			{
				name: "百度音乐",
				url: "https://music.baidu.com/search?ie=utf-8&oe=utf-8&key=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "酷我音乐",
				url: "https://sou.kuwo.cn/ws/NSearch?type=all&key=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVR4nIWTX2hbZRiHn++ck3OapMu2oG3WCm2XUJm4zihK/TN0rQ6ZcxsIq0w6hG0XE/FC2BgqInhR6o0yN8U/IBYVp2PMC91VsReheFFdt27FaknDTE66Lmt7mpwkPfnO+byoE4SpD7zwXvze5+blB7fHiIRI73iw5dt3j6VVsi06BMRvFxS3FguSsfbkwY6e3hMnDwVmulOCUiA0KtLk/E8uJ89dreSn7ONLS5XPgSqACMGRF0798LEZshBizahpgtL8NOXJT7lu6Ow48DC6JlBK8fuSjVSSX94fr9gTpVbx/ScDas4J8dFsN4mOu0ktXGAwUuCeWAiEABTvTBYYv78ZLR7FX3SIZRyG97Wz642f3zKK+TyHn01xcKdL11NH2PV4C6m4jywBmgaGzqHWEOZUmWq1yNCJJ2FwMyISJf/iKEbY0nNApykX6dqzjYmnU5z5epL9hkvLepOzWZ/hvRt4rfcBRDRG/dI4ZGeIPDNAADnt1zknACDwUIDrChK772PE02lrD3Hm9UfZ5DvUM6P4dhb5h00jW8DPfQEgtc/OZ69lphbXXqEU0pfkl4uUPAcME2FZEAQoT1IbG0cWlolslyjnKgIKxvbWcD294LHz5QzFVsFN2wPF2ug6wrLwb7oE5TrBimTd/m6EkUcYHehctjXpB/PeDZcvewRqxiC4VEYFCsVfAl3SmHNpXLHw7WacD4vI5W0IazMCPO3OqJlrVMuslivITX2Et5ymacyiMl2G1d9QCyMEhSj4ArP7DpSrWDk1hQgnWYWc8cGEPXRvk/tqX3s45q9cp27PQ/Io4doIhjmLaEoAywBsONyDMjeCFuWr72ZXAAzAeynjrO9vq42qhOpTgYQgIGhK4AcFhNVFaKuNqjYQVhcT06Xgkd1vvyLh9C0BAKO216/b556LpB47q4XXrfVAb0ZYncSPprk2X2NLeuibG05t4F8K+DfN8YeeX2p5YlCNvdevnItvqt6td80A5v8d/gMdhg340YLUf+X+BAnLRacR4gVKAAAAAElFTkSuQmCC"
			},
			{
				name: "5sing",
				url: "https://search.5sing.kugou.com/?keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAByAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAjlJREFUeJytkz9oU1EUxn8v7zW5xNekhSL+QxoUmmBxUozRxcUOgg2pgkJxrWBBqh0cdROqg5BBBaeKgkIIIkLawUFsaoUsUtLaDKUNVklKQhrb25j3rkNfYqx2EDxwl3PP9333fPccjW0RTZhngT4gAoScdBaYAlLJWHWitV5rAXYDw8CQEMI0dB2XSwfAti3qloWUsgo8AuLJWHWxVbU7mjDHL73pUlcm96lsKa1sZau6XWsey64rW9lq5utrFU2Y444ghsMxLIQY9Lg97NkVoMd/AltZfC7PUJR5iht5ANatCvOlaYQQg1LKb8Co4fQ85G5zA3B893k0TWMsc5m5Unq7RQC429xIKYeiCXPCBfQJIUxN27Kju72XwsbyjmAATdMQQphAnwFEDF1vXgY7IqzXK/QHRpq5oswzX0pTlPlmzsFEDCDUcBvAa/jwGj6igRt/KM+XP3A3cwGg8UMhY3vRs9xtVjfyFGWepbVZvIaPYOdJ+gMjBDvDnNp7kfcrL3+9BMjathXW9S2uyaUnvxGu1ytkCimW1mYZi6TpEgeArdkAsi5gqm5ZOxrWiKu9caeNaQAczJQLSEkpq0qpvwIHDt3i8Zkch/3HeLX4gLlSGqVUYypTGkA0Yd4TQtz0uD0cbD9CT0eY/sB1vIYfl6bz5XuO5wt3+LT6FoDN2iZSyvvJWHW0YWL82tGH507vHwg2lJercyyUP/Ju5QWZQgoApRS1HzWklE+BOPyHZWoStBD90zr/BDWFAshUlB4uAAAAAElFTkSuQmCC"
			},
			{
				name: "一听",
				url: "https://so.1ting.com/song?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABfUlEQVQ4jZ2RTUsCURiF/SFton27qIgoQ9skidJSF5qu2gZRtGrVan6ABJGbIqiwDz9CLSINIceKcNOoV8MpxQ9EJ2uc62nTiJUj6gt3c7nnOec9V6VSGIZQ2GLCr8MQCqX3LRFDKKysAFNUgNrLY8qdwehJEqtsCSvPn8oQhlAsP9RhZQXog1lo3ElMul7o4mEcW4EkVTufsBHNw3xXqCsCxvcib/pgFjofgeaCYMyVwOZ1Gh5SARN9h9aTgtafgzlSFjtC1mJFwXCZxtwpRydcCcyfc9RDKqh+iZQXREiSRPEzhrM4/y+BMyvilq/iOFXBAVfG33ks1sEQCoOPK3RuPZzDbqbWcmo0RAoAktSgTQByyYod2MI52G9e8UGbLddwsYH7ktjbF8oAOYHsyBCKnRp6AwSyVcjiroJOAIZQHJHKYIB2SDtAvlvaduz3DLGwQmt3Y6iMoXWHt+8kFlbAwlUes/48RmZ09r7XkUHGUBnD01rTQAAZ0q3Qb/EHnAbFqFNRAAAAAElFTkSuQmCC"
			}
		],
		image: [
			{
				name: "百度图片",
				url: "https://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "谷歌图片",
				url: "https://www.google.com/search?q=%s&tbm=isch",
				favicon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A"
			},
			{
				name: "必应图片",
				url: "https://www.bing.com/images/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jZ2Tv0sbYRyHX5Uzl8bLVNrSToUOHbr0T2gHqf1Baf8AvcUruNcpd5e75BK9H0Q9gptCogZKh6J2kWtDhkpxkmCwOIidijpYECoI5unQNo0QauwHnuUD78PL9/2+on9w0ItrWiSraiSNjER9w8NRTFUjuQvimhaJuKZ9ThaLJHyfGzMz3AxDRC6H7LooQYDi+50JApJhiJBVNVJ8nx7TZKhU4svhIYX1dW4XCsRsm4FstjOOg+K6fwXCMHiysMCfvKhUELp+OcHjcrkleL60hEil/l/wslKhxzAQuk6vaRLPZC5/g9dra5jVKvdnZ5FtG5FKIVkWSjeCB3NzvFpeBuD7yQnvd3YYW13lztQUsm1fLHhUKnE1n6e+v0973mxtIaXTJDKZLoY4Ps71yUneNhqt/uPuLrJlceUiwcP5ea5NTJCt1fh2fNzq321vI6XT/xacNZuUNzdpHBy0Dp41m1Tqde4Vi/RbVucZPG1bpPbU9vZ4triIlE7TZ5qdXyFmWdzyfYobG/w4PQXg69ERYysrKI6D0PXzu9Am+KAEAYrjELNthGEwVC5jVqvcDUOErv/6E45znlwOxfMQ8ujop2QYorguiueRcF16HQeRzSLl8wz87hXXPY/nkZye5icfi28JEi0cegAAAABJRU5ErkJggg=="
			},
			{
				name: "pixiv",
				url: "https://www.pixiv.net/search.php?word=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVQ4jY2TS0iUYRSGjwupXYsIAqFdDl13tclNd6WgZVQULZrB6ddsbhA1FwkyNQOjCMz805nxMiM6ajq/OkjZxQElLS0sK6NQI7QkCCrTnhbfmBMatXj54PDxfO97zvlERERM245IlqbLXut/StNlj7VM0kzbRdZlHBVfJ+LtQDzGgtwGci6KuKN/1ueVH0Nc9bMi+3KD4u1AnGHEHkK0IHIyiNhDLD/TQIozrGpaEHGE1D1nGHGGEF8nIpnZt8QdRaxBUh0hDvl70HtHaR4ao/XZBLHn72kcHONwoAc5XYucqkFcCYjHQGSHRRdXC8eCcQbHp3kwOsnxQBxTQRurPBHSL7Ria3jE568zdL/6wGp3REHmASv3a3rkxRTfZ+cAWHsxipyoVK/Z69RpriK9oI0fcz/pH/vEMkdIxfUYSHlFhd40Mo29aQCATZc6kNyapKxhZdlchaPlMQCW+j7EGkg0s+SqnlZ8F0u4D4DNJUsAnGEkt4b1RQYAxvAEolWrCaVmaXqKsxlngv5XQF4taedvA9D39iOSV6sAssuiiy2C618ArZqtpTEA6p+8U2N1RxHZa9XF3vQbsKG4fTHAFkLMVfj73gCQVd6tIniMxYAtpTE1BWtAKduP5FTjbR8C4Nr9l0hOddIeJAD2ZjWFh6OTlPe8xmcMYWse4HLXMIPj00x9+YYt0q/c2euSAJnZlckOdl6/w4GybrztT7lyb4TCrmEO+uOsONuoHCWvswJoleJsxZFwYCoyEHPVQgRrQOW11S1ubH4MkTUbd4tWM1MYnwAg42Yv4mpZ+gcmyxdDrDcmfgF4QGAxnLBCrgAAAABJRU5ErkJggg=="
			},
			{
				name: "flickr",
				url: "https://www.flickr.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+klEQVQ4jWNgGAUIIKBqwKCfUMSgGZXJwCklhy6twSCoW8BpUZTFaZIjz8CviCprXtbFkHX3PxynXPrGoBIQC5Ou57Fv/C/Z+B+Gf4jV/szgMs6EyMq7BqJoRjaEQ1zRmUXRFVkzsiEaDIK6DAwuE1ZgNSDr7n8Gvbj8Wfy+c7AZ8F+y8X8tl30dA4PrlNU4DdBPKFrCH7QUlwGNPE4tDAzqoclYNaff+MMgoGoQwaYdhcsAGxY5G0g4eExZh2GAUVY1LBCX8wevQNfcyevShRoTim4hDHZNMxls6yczSJjao0ejP5ta4Axe35mT+DwnO7MoupKfXoYfAABPvsL2GuU3QwAAAABJRU5ErkJggg=="
			},
			{
				name: "花瓣",
				url: "https://huaban.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1klEQVQ4jYXOyU+TeQDG8Z//gIkxXogxXky8TTIeRhMzcSEdoKW0SIFibYuJLFbZVGyxlLbQFoqoBEhEBSlbA4xxNwq9zMXMeTLO0b4vWOhGoSKBUfHrAZdEEZ/kOT6fPMJtNLVPelpD92yNobv1ttCd2vNTI5aqhx0lxpv6/ftNO3fs2LN7+/a95Qd/r75VZBgPGsyTE0ZzaMJ4MvTQXBYSU772v/nrOdx/zIeJe6wF/+Td4CjvAqOsdl/n3xNlqf+Kjellh4dVfycrrVdY8XWw2noFOnoQD5yuEE8mWQyOsxAYJdU3SKovQMJ/lZmSUiK5OiI5Bcg5BUQqqom7fcScXuJOL288lzcAAsMkr/UwXVyKpMxHyitEUuqQFBrCmbnMmMqIubzEXb4NgMEgqdtDRMqr10d5RV+BrHwkhYaXh3OYKa0g0dxG2uNHjDU0PvoCjIwT93Uga/TIGv33wB9awpkqXh5Rkqi5iORoeSM6LZbedWCCheExIpZzSOpiZE3JxoBCTfhwNvPHDIwbzCGhP3TItPb4GYtjd0jdHGDGVI6k0W8OZOaSVORxYd9vzSJj27Zd8sDwwsrdB8z33GBaX4qsPf7zBwUGBtX5j4QQQnRVWvp5OkWy6zrTRSbk/E2AI0qkbC3Js+d5cbomKYQQYndGxt7ZoZH0cm8/8o8AhYbwURWyupDZs+eIXbATr7UiPqcsW3Xmfd8QEZ0RSV2EpCokrDy23iwtsqqQV+YK5i46mLM6iNbZWKyzfQWEEMKr03WtNraQqKonUlnDq/IqIqdrma21ErO7ibl8RC+5mau3E62zkf4WEEJsadLrfcuBEd4ODJPq7iVxtZuE/xrxFj8xRwvRBuemgBBCiKxfftU+t7v++b+3n7c9N0i3dzLf3Ea8yUOswUm03k6szsbrHwGfsrX4wMGTwVOVT144XHPznnaWmttYcnp5bXezZG1izdrER/CEaFr9QFrRAAAAAElFTkSuQmCC"
			},
			{
				name: "Pinterest",
				url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACD0lEQVR4nO1WsW4UMRB9sxsECAmlpbrbRKwpKE4nk0i0/AQSogGlSInID/ABKegoEimioCC/kJYiySKCkE7aC8rtUdKgSClQyHlSBN95N/batyQVN5U9nnnvzazXNjCz/92oSVKWiPcAnlfcR3KQL16rgCwRHBKn1Ki7NPz+5coEhBJXTQ5yL350XeShubUKnQDMZ7Lo3zBdH4F4IRFntvC6TjgXsnb6B0Rz04CNcy3CXXluARWQW7fjmw97vVPXesSq0y0OvzpFUNySR70fVR7rHthPxK+qT5NnbbFhq1BRdGD6L1XMo6GNyyqAgHlzrsE+L6RPQHhpy9GWJWL8+7HCal2sU0DJmD9MhrRzMcCxHOTk+K4dPXg0zN+VxLXFrldAlqRb5lwW/WcAkLXSBxNfPj8OUPzKV8PYCEteAcz01Joc4a0dlN4EC7DCVvGA39ZIxje7ANy9UgEAts3Jbut+BwBk0V/7F6JgAbLIV8x5HEWTXQ1+7QM0N+Z+kp6UFhl7XgE20/83gdZNv+6Oywh0pySuyJeDBDDjp0vESMX3tG95eHgwyeFTs/rQSyz4KNYWchfsLYrHkcKnMtMURzFwUVEdietIzhLBl8gB2MiBBtex7sA074S6rtVuwmqiryvTknsFWADWnYENyIMEaCA5yIn+/h2+9is16oaQA02f5e10E0QvKu5Gz/KZzewcjEjYbJKZwQoAAAAASUVORK5CYII="
			},
			{
				name: "Yandex",
				url: "https://yandex.com/images/search?from=tabbar&text=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872628734' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='10516' width='200' height='200'%3E%3Cpath d='M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z' p-id='10517' fill='%23FC401D'%3E%3C/path%3E%3C/svg%3E"
			}
		],
		download: [
			{
				name: "海盗湾",
				url: "https://thepiratebay.org/search/%s",
				favicon: "data:image/jpeg;base64,AAABAAEAEBAAAAAAIAA2AgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgCAAAAkJFoNgAAAf1JREFUeJx9kj9r8nAQxy8xLQatGmPtIoiigoKCoAZHyeQutEtBHHRpl7yELq6+AP+8AIcWOxURQRzMIDhEyeLilIKDQYUg+eWeIT48VujzWe4Ovtzd9zgKEeEvl/kVFEXZCWMHVVUlSTIMg6bpK6ndpV6vPz4+nmtE7Pf7v/W2qVQqtvI8gWHOyc3NDSGE4zhCyH6/BwDLshDx9vbWFvxYIJ1Oz+fz5+fnXq8ny3KtVnt/f282m5f2mMtFWZblef50Or2+vjqdTtM0X15eFEWx5/zzhIjtdtsuvV7v5cy7uzuHwwEAhULhdDoh4vVNdF0Ph8MulwsAEomEYRiEEAA4Ho9nD8vlUpIk0zTtToIg5PN5n88HAMViURAEjuMAIBgMMgxDCKHG43GpVHp7e3O73Q8PDxzHHQ4H0zTtVVmWpWmapulcLjcYDKbTKTMcDgFgPB5blhWJRDKZjCiKqVTKPvRut1utVqqqdrvdVquVTqepr6+vz89PRVEajcZiseh0OtvtNhAIxONxTdMMw4jFYqFQ6Pv7W9M0QgiFiJqmJZNJn88XjUbv7+89Hk8ikbAsS5ZlVVV5ns9msx8fH6IoVqtVQMT9fu/3+yVJ0nUdf6Lr+mQyeXp6AoDZbIaIgIimaY5Go+12i7+w2WzK5fJ6vUZE6j8vfQki2h/+B8UpLqpv9VygAAAAAElFTkSuQmCC"
			},
			{
				name: "谷歌搜索",
				url: "https://cse.google.com/?q=%s&newwindow=1&cx=006100883259189159113%3Atwgohm0sz8q",
				favicon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A"
			},
			{
				name: "动漫花园",
				url: "https://share.dmhy.org/topics/list?keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1ElEQVR4nCXTyY7cRACA4b9c5a3tdi8z6e4JsygzTKJIcwJxyTPwfDwJnDjNBQgicCFESiRamSW9jt2r7barXBz43uETP02srSws04JD7tBUPv0RtHwAGC8tgxC+fyV4mMPNAMZryy9Lwd2TRu01VAeYTva8+e6YsoDbv1LiqMdun+HJkJeXHlHT8CJy+JxazjoOL2rBeC5QsxWkU8siaxjfafqx4OV1F7B0vA6ykdS1ZaYl/ZZhGCkeU83bj5pdblGzZcFwFHJ+McBRmnRnCbFIqSiNBXPAOIJ3D4ZAKk5VzqxUBL2Q/SJHbfca12wJByEEClNpssaQaUGaHohcwdmRywKXNKv48aHg8qsu89UWmgbneNgmLeHnX6fcTyzSkRS1x+0fcz5/qdkeJFFXIQr4+EmzLRLefdiQO22c0wRV19AKY6Ijh0KDdOH+3wkXF22+vW7DwfL7+wWLDBrj8eabFunGMF8tifMYB8ANBYd8QSM0xhquzk+oVw1uU+DFFiE6CNenn0ieJZrLkU9CyJFyUSjLdLzm9NmAr08UERWTnWCyXbOpz+j4lkHHkEQtzp9LTA1uy2KDkNqxqDKzXA18Li5CdjuN9jzu7kp6SUIImHXDsB3QTqB0DOVBMh8f2G+h7AWoOBBcn4ek2YFKeJCDFgIAzwKOZK/hyyMsVxnrrOLm9Qjh7OiXCnW/2PG87YGS1AZkY0iOFPapAqD2NL/9uSQXCa7oEokNw5Fks4tQyqB6wza3759wNLy+iYmkR7XLKfGQLpjG5eqqy9Oqpt2SXJ/3iY3huC/5NN6jAgkngx7T6YIo8FGqIokUs6xmU0CrbXl1EsDAASnAVJSVQgNRO8DphJZ+1wFASuh0PPbZmtNRl7d/PzDNGkoLbvh/z9z4PK5hNsnoJBLxwz/Wrraa+RPYpiA2UFiN348BeBznWEcTBz6HqqRxXOLQ5fTYJ+pI/gNDt17HeSMTvQAAAABJRU5ErkJggg=="
			}
		],
		shopping: [
			{
				name: "淘宝",
				url: "https://s.taobao.com/search?q=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666880201701' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='32068' width='32' height='32'%3E%3Cpath d='M228.96 172.16a76.64 76.64 0 1 0 75.84 76.64 76.32 76.32 0 0 0-75.84-76.64zM317.76 535.52C307.52 458.24 160 360.48 160 360.48l-57.6 82.24s123.84 61.92 134.08 112S66.56 753.28 66.56 753.28l128 94.4s133.28-235.04 123.2-312.16z' fill='%23FE5100' p-id='32069'%3E%3C/path%3E%3Cpath d='M957.44 380.96c0-66.88-66.4-152.32-174.72-171.52s-263.04 60-286.88 64-30.56-3.52-30.56-3.52l27.2-53.12L400 178.56A416 416 0 0 1 355.04 288a425.28 425.28 0 0 1-74.72 92.64L338.08 432l76.32-90.88 50.88 5.12L372 464s3.36 39.52 32 41.28 72.96-67.04 72.96-67.04l52.48 10.4 1.76 68.64H360.16v46.24l169.6 5.12v145.92s-48.96 7.36-70.56-23.2-12.96-78.72-12.96-78.72L336 609.28s-6.88 84.64 22.56 126.88 90.24 57.12 152 51.84 215.84-70.72 215.84-70.72l10.08 46.4 81.44-37.76-49.12-130.4-66.24 13.76 6.88 56.64-81.6 36v-130.4L800 564.64v-48H624.8V448h168v-54.88H517.92l40.8-80A562.88 562.88 0 0 1 679.2 272c48-6.88 69.44-10.24 113.6 17.12a108.48 108.48 0 0 1 50.88 67.04v381.76a96 96 0 0 1-60.96 53.12c-48 16-124-1.6-124-1.6l-6.72 53.12s128 25.76 210.4-8.48 95.04-132.16 95.04-132.16z' fill='%23FE5100' p-id='32070'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "京东",
				url: "https://search.jd.com/Search?keyword=%s&enc=utf-8",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACoElEQVQ4jZWTW0iTYRjHdxcUfrPZtq+cm25LxaQSQ4tO2IkKO1yEQVEERWJFYUQJQQUZUWQG0QGKIgoCS4pVBlKapH6fztNsW+zQZnOW5GGyxFkQvy4+LbUguvjxvu//efjxXDyvqmCaUFymFitKBf1/U6YWK1TlgljVMzsNt96qoLPi1lqUc/w+zng21tsjpqEqFfQVbr0VWWv+CykKsxSkhGQkjUl5a824ddYJglkpyDoLrRm5dK7Kx25dSEdOHq5NBQqbt9OxZA3Nxnm/hJMEUkIyTeJcfPuPEKmuwb11B+ErN4j5Aww73jHc6eRrcyufb96hMy8fSWPCNUmgMdE0O5Wuk2f51tODd08R/bYqYv4AwZLT+IqK6Xv0hNFQNwPPXvJu7RacmpQ/BcGSM8QCQTy7C+mrtBF5VUd71jIapou0ZuYSLr/G974+ui+U41Qb/y0YelOPY+k6GuMSaZwh4li5gahsZ8D2Ak/aov8QqA1IGhOtmbn0V9oYfFWLPydvikCcS/DE6b8LBANSvJH27BUMVFUz+LIa34KlYwKdhUbBgKyzEDp/mdGPITw799FfaWOo9i0dS9bQMF1PY9wcvHsPEgt00Xv7Hu7EdFSlgrbifVIGbVnL8OwuJCrbGXY4cW7cRv/T50Rlu7IDi1fjP3SMaEsbI14/nl37ccablAm6Vm/iy8PHjHj9jPj8dJ06R0t6NpHqGn6MfiPyuo6hunpGvH6iTS0Ejp3Ebp6PS2tRBMHl6wmXXeXT9dv4DhylJS0bSZPMh8PH6b37gM+37tF75z6hsxdx5RfQbMxA1pgmbKLWjKQ2IAkGpPgk5IRkZK0ZKT4JKS5RyQWD0jPT+Kvu1llRXRLEqrCYiktr+c3Yr5uUTam5dVbC+lR+AkXUXUZHV2HdAAAAAElFTkSuQmCC"
			},
			{
				name: "苏宁",
				url: "https://search.suning.com/%s/",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABMUlEQVQ4ja1TQU7CQBR9xNWwpUTJNF0A4VCEhVvjBRo5AAR2pjHxAO0C40JMqXgDTfQE0mqiB8CFganxuTBtaKdFYvzJ28x/7/2Z/+cDJWFU0fBtzHwbgVFFo4xXGE0DndBBxAnICRg6iJoGOltFgy6GaxcqEZVh7UINuhhqBspD/Js4gfIQawa7ihNkxK062ptJy7I0Qf6sVUcbACAFzMUpwkLy9ICc7hcahA4iKWDi5gS3+Worr0I+nZH8Iklycc6VW9FudW3D1w0u9sj7Q2px1/vJbXB9GzNIATN08Jwm3q5IkpZlZUCSfL1MxZGDFylg6k38/EiLZsQkGb/rTdTG+HBEqqX+BLUkH4+Lx/gvH2nUw3gXE+UhHvUw3roXf1qmfNQEZNDHPOhjXhOQZbxvFy/H102X8MIAAAAASUVORK5CYII="
			},
			{
				name: "亚马逊",
				url: "https://www.amazon.cn/s/ref=nb_sb_noss?field-keywords=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVQ4jY3QT0jTYRzH8a9d0m1M8rbMZklQbjRDOpSnHXSTjpFHvVgH0UODwShJWn8gGXXRi6Q1lIpfWYwCYZkQwWqHdhrYH/UwgxmzGU5sv7Hf3h3CJ3U5+sJzeL58ntfzfR4REbHZbPZgMHhL+8+ampp61Nvbe0lE9ondbj+SSqWW2VWRSIRAIED/wABjY2Osrq7ujhAOhyclFArd3d5cWFzE4XQiIjuWtbaWN3NzZYhMT08/39qUSiU6PB5EBLPFwp3hYYaGhqgxmRARvJ2d5YCmadrWxjAMfD4f7e3t3B8fVyG3242I4GppwTCMvYHtFYvFGBkd5bLPx2G7HRHhRHMzuq5XBpLJJGfb2tTbzRYLFqsVEaHZ4agM5PN5TrW2IiIcrK8nGo2ysbGB1+tFRHA4nZWBRCKhbvb7/Sp00uVSE1T8xA/xuAI6PB4ymQzjExOICFVVVVRXV/N6dnZvYD2X42hTk0JqzGZEhEMNDap3PXjzX0BJNeLxOG63mwN1dTQ2NnJ1cJB0Os2Fri4CgQCGnoO1edhcUcBT9Hn4dA8K6wrK/syhF4plb+b7W4hdhPc9CngGRfg8AjNnIHEF1j4Chb+HjCJsLsPSQ3h3HpK34cvoH6Cvr69fBX8kYO4cPDGBZoaXx+DVcXhRD5oVZk7DtwjoWeAX+XxeFxHZHw6HJ3fNCZnHsHQDFq7BygMwvu5IZLPZte7u7p7fLX31eStakCQAAAAASUVORK5CYII="
			},
			{
				name: "天猫",
				url: "https://list.tmall.com/search_product.htm?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAQElEQVQ4jWNgYGBg2MzA8J8czADTvIOB4f9+EvEOmCGbydAMwxgGEAtoZwA6RtdA0AujBgxLA4hOyhRlJkqzMwCOOAUjv7eE+gAAAABJRU5ErkJggg=="
			},
			{
				name: "值得买",
				url: "https://search.smzdm.com/?c=home&s=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVR4nG2ST0iUURTFf+d9g2V/NKSgRYSriLCZ0jLie+Gi3LWqoKCFEYG0tHBTREgQSLWQCIRoWVCbKKKC/oD0fVGG5Iy2KDCiRQTBUBJh+vluC2dkHDurxzvvnnvuuU/U4H1X17ooy16Y2QAAUgfwEedWyawH6MknyefaGlc9FON4CFiH1C7nHkjaXEjTi5Juy+wm4Amhpej9rWUCRe+v5NO0L8qyu4uMdB3AYHZtFDVKinHunaBY8v7ZUgdmW8e7uppcLre/ShgMAwh2T2fZDzNLK9RQMBsoen8EwI3v3dsm6eDOkZGfYX7+PmZfgIvAyep0SI8Nphe7Sq8E3QDORdFEzUgHkFqBAUEGQAinsxD6CknSXDs7Zm8n4vhQNcQ/1CGfJKtL3hvSnpw0Vs8bDJnU7xbyUnfJ+zMG56sPJuN4s8FVpBOSNtYLSFpj0OkW3Nh34FqUZcOYXV45O9scYFAhTLlyeYXB14rtl0tEwDmgAEwBtL15U0Y6t2V0dBrp2Bw8DC0tf4EblZrbdUYm3fYkmay3V/T+iEGIzDKDe4LBUhzPVbJRPkkEFAL0C6DkvVVquw0OyyyYtB44YHB8R5I8Le7bd4oQLlXzMLOZQpo2OgBXLq+oJNvuzO4ibSokyVGg18GTkvcms5s1YfZGudyGSg4L+NTZ2TTT0PArnySqcbR0dWa/JZ2dC+FRx+vX35YIVFHyfgJoq7u+Y/ABswuFNG2s28T/UfL+gZm1CrYBz2dnZg7vGhtb9uH+Affd7MpRvsLpAAAAAElFTkSuQmCC"
			},
			{
				name: "当当网",
				url: "https://search.dangdang.com/?key=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADzAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAbpJREFUeJylk0ssXGEUx39zZ+a2g1QX7DxjMwzKJF2IR0iEWIxlV6KZeGQaEhZWbHRTsVCPJq5IG48IiYiFErZNmngUCYmgqGBFMljWq2Nx6l7XXAvxT76c73z/c/7fOd/DBhDyuqcAH0/Dd9vqVrmiJ794CZ29Bp2TB/NrYgHiEqBLA5frLsIX8rqnFH3nji9QUATdfULn5oOqQkys+K2fIL/Q4P+LKPq0vgaWF6EhIL7TKVZVxVZXwMoS1L439WELed0h3XM64eoKJqYhOcWI2tyAto/we0v4e1BMXm0drGxK8p89aGmCo0NI9cDwuLTwAEYFJWXQ9hnOzyDgh51tI8qTCdo3iIyCdz7Y27UQcDjg+jpsBx2JSTA5C1oPfNUsBHLy5OQf4uYfHOzD5DjM/YCICCh4q9MOfdalSRVWmJsRgZNj8GSYKCOj8QNkZllUcAOnQVDsEBcPZ6ePCMz/lPEY0tIh+jV0tpuWjWssLoVfG7CwLmXePSCXC95kw8AYXF7CyKBJwDhEd5qM5law2+HiLwSD8pRVVZIDflhbDRMI/4mVVeCvgVfR0v9AP4wOWzU2ZIPnfedbccyGGmWXmM8AAAAASUVORK5CYII="
			},
			{
				name: "1688",
				url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s",
				favicon: "data:image/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEAAAAAAAAICBAAAIiMAABwiAAATEwABIz4AAx0+AAAyMwAGChIADBQiAAAnKwALEh4ACBYWAAAwMgANGjMACAwQAAwYKgABHyAAAwsLAAEzPgABKz4ADh47AAE7OwAMEBYABgwMAAYIDAAHIz4AACwsAAAkJgABFxcAASc+AAcfPgABNTcAAQ8RAA8XJwARGCQADhIWAAsbNwANDxQAEBwwAAA3OwABLz4ABis+AAU7PgAGJz4ABRYWAAYPEAAPHTcABTc+AAUvPgACBgYAACAiAAQjPgACID4AACouAAAqLAAKDhQAEBosAAAMDgAEMz4ACx0+AAE7PgAMEBoABgwOAAoKCgAALjAABCYoAAQnPgABNz4ABT4+AAQNDgAMID4AAT4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AQUREREQqQxIoKDApKysZGT5HR0dHRzw8QxIoExMdBBkUIEdHR0dHPDxDEigTEx0rOzsYBkdHR0dHPEMSEhMTKTs7HjgnR0dHR0c8QxISKCk7OzsNFUdHR0dHRzxDQxIwOzs7DTEAESA5MQM8PENDEjs7Ozs7RUdHR0dHIBwcPBIoOzs7OztFR0dHR0cDRzxDEyg7Ozs7DkdHR0dHR0dHPB0TKDs7Oz8BR0dHR0dHR0QdHRMoGTs7OyERG0dHR0dEBAQdEygTOzs7OzshGBwfRDQEBB0TKBIdOzs7OzseLggFNAQEHRMoKBITOzs7Ozs7BQU0BAQdExMoEkNDKTs7OwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA="
			}
		],
		translate: [
			{
				name: "百度翻译",
				url: "https://fanyi.baidu.com/#auto/zh/%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666877034366' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='29943' width='32' height='32'%3E%3Cpath d='M938.666667 981.333333c-17.066667 0-29.866667-8.533333-38.4-25.6l-59.733334-119.466666h-277.333333l-59.733333 119.466666c-8.533333 21.333333-34.133333 29.866667-55.466667 17.066667-25.6-8.533333-34.133333-34.133333-21.333333-51.2l72.533333-140.8 145.066667-290.133333c12.8-21.333333 34.133333-38.4 59.733333-38.4s46.933333 12.8 59.733333 38.4l145.066667 290.133333 72.533333 140.8c8.533333 21.333333 0 46.933333-17.066666 55.466667-12.8 4.266667-17.066667 4.266667-25.6 4.266666z m-332.8-226.133333h192l-98.133334-192-93.866666 192zM85.333333 844.8c-17.066667 0-29.866667-8.533333-38.4-25.6-8.533333-21.333333 0-46.933333 21.333334-55.466667 93.866667-46.933333 179.2-110.933333 247.466666-187.733333-46.933333-64-85.333333-128-110.933333-192-8.533333-21.333333 4.266667-46.933333 25.6-55.466667 21.333333-8.533333 46.933333 4.266667 55.466667 25.6 21.333333 51.2 46.933333 102.4 81.066666 149.333334 59.733333-85.333333 102.4-179.2 128-281.6H85.333333c-25.6 0-42.666667-17.066667-42.666666-42.666667s17.066667-42.666667 42.666666-42.666667h243.2V85.333333c0-25.6 17.066667-42.666667 42.666667-42.666666s42.666667 17.066667 42.666667 42.666666v51.2h238.933333c25.6 0 42.666667 17.066667 42.666667 42.666667s-17.066667 42.666667-42.666667 42.666667h-68.266667c-25.6 128-85.333333 247.466667-162.133333 349.866666l25.6 25.6c17.066667 17.066667 17.066667 42.666667 0 59.733334-17.066667 17.066667-42.666667 17.066667-59.733333 0l-17.066667-17.066667c-72.533333 81.066667-162.133333 149.333333-264.533333 200.533333-8.533333 0-17.066667 4.266667-21.333334 4.266667z' p-id='29944' fill='%231296db'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "谷歌翻译",
				url: "https://translate.google.com/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC/UlEQVQ4jYWTT0ybdRyH34MH4wVjovG2ZIl60IMXNTgoDtlG/wAy49bt4r+8XSFm2SZGox6WWNnal45SbKAbygKbShAT38yMNC9LMGyQsS5OdGtpOwqNvNkLLbwv76+KJns8lES9jG/yXJ98kidf6bGn6vY42tWEo/2SVutXtZotHEcT2o5q33vSdlfbpk68OQSH4uCNw8F+ONAPhwbhlQ9mbkuS9NADBY72S1e8cXg9ItgfEbR2bxH5k5aw+PuRJ5994YGCGr+qeePQ2i1whQRuReAMCZq6BC0992k6+nVCfuetE7J8pEOW5Q6fz/e+LMsdbW1tH7pcrgNSjV/V3uiD5rAgNr7BzB2TyzdM3u63aThVxjcgSGcKCNvCtm0sy8I0TWzbZm1tDellv6o1RSE2bpGcX+fjbzcIjG1w+AvBvqDApQhGxlMsZNOsrhgY9+6h6zq6rmNZFlL1EVVr7oXrKZOOCzbeXpvLSZPxpIl81sYR+IPPLi6RufMr0aERpm/ewiwV0fXlyoJqn6p5eiBx02RgwmJfUBBSLQr6Ov4vbeo7NzkYXiZ6foxPzvQRHvyGyPAo/SM/kM0vVQTNUfCds5lNrzM5ZzKT+lfmCpVxKwLl/E9cvXaNxORVOuNDpLM5VovFimB/DPaeFnh7BSe/2+D4sE1jsFLDrQj2hjY53jdHOP4VysAFrkxNoy//TqlUQnrRp2qtMfB0CRqDgvrPBQ2dW0lDNq5QpYbcV+IjJc6xUz2kUmmWFhcxDAOp2p+YqgjKeLrKuJXKZNcWzpCNMyioD6wTvTjFqPojp88NM/fbbVYMA+kZd6C7JQaeHvBEwNN9H/d/cHZt0qiUcXT+RXB0maVcmu/HNSanr7OyYiBJkvTwozt27a7aufvVqp21/+Pxp+uddd6xhYZ3b7Dr8BRnBn8ml02zcDdHLpdF13W2fbbnX2o/W/faBJ8GJpi79QvpdIr5+XkymQzF4ur2gqonnttzUkmSSmXJ5++Szy9SKBQwDIPZ2eTaP/p6Y/2tPjpQAAAAAElFTkSuQmCC"
			},
			{
				name: "有道词典",
				url: "https://dict.youdao.com/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA2ElEQVQ4jWNgGFQggps34Y2i2v83imr/78gpvZdgYFBgYGBg8OXkCUMWx2sITOEbRbX/MAMYGBgEkMVxahZiYJCBKTonLX+fkDgG0GNlNYIpnCQsOh8mbsjCYgkTXy8uvR+nAcgK0/gECmDifpw8oTDxMgGhBpwGOLKzu8MU7peSOW/BweFgyMJimc4rUAQT9+TiCiDKC7gwUsBiBezIzoUFGrKr8GnGBgSQDYjg5k3Aq7pFSKTfgoPDwYKDwyGNT6CAZNtx+RuqWYCgAXfklN6jayTo7AEHAIjTnaHLaQtfAAAAAElFTkSuQmCC"
			},
			{
				name: "必应词典",
				url: "https://cn.bing.com/dict/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB5ElEQVQ4jZ2Tv0sbYRyHX5Uzl8bLVNrSToUOHbr0T2gHqf1Baf8AvcUruNcpd5e75BK9H0Q9gptCogZKh6J2kWtDhkpxkmCwOIidijpYECoI5unQNo0QauwHnuUD78PL9/2+on9w0ItrWiSraiSNjER9w8NRTFUjuQvimhaJuKZ9ThaLJHyfGzMz3AxDRC6H7LooQYDi+50JApJhiJBVNVJ8nx7TZKhU4svhIYX1dW4XCsRsm4FstjOOg+K6fwXCMHiysMCfvKhUELp+OcHjcrkleL60hEil/l/wslKhxzAQuk6vaRLPZC5/g9dra5jVKvdnZ5FtG5FKIVkWSjeCB3NzvFpeBuD7yQnvd3YYW13lztQUsm1fLHhUKnE1n6e+v0973mxtIaXTJDKZLoY4Ps71yUneNhqt/uPuLrJlceUiwcP5ea5NTJCt1fh2fNzq321vI6XT/xacNZuUNzdpHBy0Dp41m1Tqde4Vi/RbVucZPG1bpPbU9vZ4triIlE7TZ5qdXyFmWdzyfYobG/w4PQXg69ERYysrKI6D0PXzu9Am+KAEAYrjELNthGEwVC5jVqvcDUOErv/6E45znlwOxfMQ8ujop2QYorguiueRcF16HQeRzSLl8wz87hXXPY/nkZye5icfi28JEi0cegAAAABJRU5ErkJggg=="
			},
			{
				name: "Forvo发音",
				url: "https://zh.forvo.com/search/%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAcdJREFUeJyFkk9rE1EUxX/3pZMJxtCRuim01k03IkKJCI0E9Bu4VgxxpZaKurf+ofEDqHUhFCKKuuwHUCiKBgRL24WloVZd1KIVTFprMQ2d6yKZzEsZ07u6575zzpw7XCGi+gula6AjIIMAKNO+7lz/djM7v5srNugbL10R4X6UaVB/67XUzzunNwNsgubog7k3oB3FAMmk99sbmRxoMxguLp7vTu3LHvCSqGrjRXVKIA3+GaAMEHMSVL7MQCz+tW2FTLGswaC6scXC1aG21QDSjz44S7Oz28ZxQRVFN9cn8imTKZbzNjFKDDBz8Xhd3K4hmgkF2Q9gVBkNafqi0/7r9y7M2dgbfZwzIqRbct8872TQZH1qdTBsVHUnGBjRw3vrORS0AltGkJeW4+09DUTiITBPjHFrZ8NHerJPF3r/p+2+PPnextWJ3Lx5e+5YJRjE410sf/612l8o5XaL+8ZLrxJe7wlVv5lW7zbXaNSpZ8u6uLRK3IkR3hI1EVwrP9t/KtQ21qg+zAtYp7z2/UePLW6sa4sb33VTB1vitgRh1HcfReRI1D9Q1bGVsZMFexZ5dQO3phO+415CGVShDrxeuZGZiuL+A2DYnV2Yre6zAAAAAElFTkSuQmCC"
			},
			{
				name: "CNKI翻译",
				url: "https://dict.cnki.net/dict_result.aspx?searchword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg==",
				disable: true
			},
			{
				name: "汉典",
				url: "https://www.zdic.net/sousuo/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJElEQVQ4jY2TMWrEMBBFdQYJuU23BsM2gbQBFSl0AEsEs+CzxClETpALpEwbttjGJ9hiwXLh1uf4W81EcpRNBgTfo9HTeDQjlnmCk7q4xrbP1joErEPIfGJsezipsbWPt5eiTo0BJfOqwjJPAAAnNevUorE54Hw6ZoCSzmN2ENFY3jifjlkNurpBNDbTFAcAl/0DRFc3DEhrkeptNgRwUkNQ4H8BTurfAV5V6OoGz4/3nHZXN3BSIxrL+ibgryIWAVQY+r9bOo1nwOvB/6j+Vqc+ryrWwqsdtrbME74+3/l7HUKxkZzUEJf9U+ZMe2Eb7O9UBnJSf/fBMk/cLOntqa1DgJOaZ4NrQJNXSrMEoUszAL01vXc0FusQ+BCNL+1FYzG2Pa51VtKhEx+TOgAAAABJRU5ErkJggg==",
				disable: true
			},
			{
				name: "海词",
				url: "https://dict.cn/%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAkdJREFUeJx1k81LbVUYxn9n7y1+g3qPWYMosaKyVBp07yDJwFuUUKOoaU0v0SwuTRravHF/QFA0CQoHJTQJvHDR6IMUvXCvYpkfR49Hj573eRrsvY9KtWCxWO96n2e9H89bAZhd2XoVuG08aXvIMna5hWVUnqE9W8uSPl16eXyhMruyddPwre2USyCVJFJ+j9IuLCE5JL2eGX9sO82d//fXS2CXJKmk25nl59ogm7epc+OhQY4ED/d1U+3qpNY44ZuNTb6sQ8MgqSDXRCKrKuXsUyc1br0wzlBPN+XK0pSx4Wt8+OIEn48/Qn80kQJFEBHVrMgHWzzdnQKQVip89fs6PR0d9HZkjA/0MjP6KE+NDPPJaJ0PVneKOgTZlbwSA5BU4KfOwTzvM/H1doPV3Z957YnHeOXJUR7/4wFrkWCJRKF2SK0Qp62g2cptEWWo4vvDJmQd/Lr9F890pvm7gkwReQoSh9Fku37MTqNBblf7LQGqPV1gk2BKXKZoV5TaWZP7h8fsHDWIKPudR/NmtZ+hrk4AlmonSBUkkYWi7Xhu2Nzb56TVYjpt4sSkmJdGhnhn8lkAfly7x0YLrEAuIigJxgb6eHcqd3yPf6/N/Rof3V29UGVOELuSrlkCZ/8Bg3qzyRfLv/HZ+g57RdcK4f1def67Oz9YmpFEn87pcSADhdNpmN0IWqaYC7d1Y3sxU8S8pGkr0gOZ/aI4V7TfnhNdmlKH7fnkl7nrC4rWnEKLCh2EotDFRQesizpZOrC0aOmNP99/a+EfiilTPoj1fYcAAAAASUVORK5CYII="
			},
			{
				name: "DeepL",
				url: "https://www.deepl.com/translator#zh/en/%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAACNwAAAjcB9wZEwgAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGZSURBVDiNjZKxaxRBFMZ/b2ZHbWITUxkRC4PnBUW0k1gkoFlMYmIR8R+w0UZBFAvtLAMS0ipC0guCd0GOa23EJGTPkBRCSCNHKiEgMzvPwmjCuiv3lft97zff7BuhQraWTouJLwE0mmf518a7spwUPxwZvlmLms8B4wWrLZhHPvuwUg44N9afGPcc4T5gK4pFgSUv/jHrre8HgKHJE4nzHWBgn/sZdBuYqQB1Q+5rbLR2DUBy1J89GIbEmNmQNW8DqxWAgcS5IQBT5vqYP3H1Gw9AHyosAKECVA4QuKfIPMhHVKygV4OVU8ByT4BDsiI6rWpusdbYUdgpBpLSMeGTRLYx2o5q9kT0ja2P3xU401ODQJz1neYdVRkT9C1gyob/Ngg/3VbifJf9TVg1L2Q43UC1eo3eb8KfB7O7uRf7T782Yo8hXBG4DFwvaRgFFoP4GTqt7u/bFuTOp5dU9BUw8u/BOhqy5fZ//4HvNL6ErHlNkSmFb4e9YM1WMV+5xjxrvM+P99VBngI/qnK96UI66OrpEhcnThatXx/tiqJJdDA6AAAAAElFTkSuQmCC",
				disable: true
			},
			{
				name: "金山词霸",
				url: "https://www.iciba.com/word?w=%s",
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGElEQVQ4y6WTzUuUURTGf+e87+v3BwxYToupoYVYgViLFiPtIrBNELZsIUIUFEXQqk1I/0JU24oWZRFFiyD7WhhBDWYfq4zCsRETdfwYHL33tHhtdLSF0IEH7r1cnnOe55wjPP1u/EeEYrLuaogpoJi4LREoBhiIQa3Btbb3DLZdQbwQIdSJIC7+8y+IPP5pAKnqEgMdz+lYusGvwm/uVo3Qu7OeOoXsbIkzw9OMLDiQDRLi7CED/gJ7x94R1o2RTF7naFBFz9AEuZLnVKqewcw2Ol/kyS0b601T84AJNbnPMD+BD3ZgzSc5/naKN7OOb4vGpS8FsjMlTqcbMGeYp4wQDyCUabWVeRcwWjS8xc9iytc5T7I6Qpxguq4C8UJMsuqKG6U5WOJgY4B4JTAlckImETAyvYQhiF+DmlfWKA21GdzkVR52tXAuXcuxlognXQn2J2oYmiwhpphfg+IVvJYlGDA+dZvzH4p0p5q43NnCx3ml/9MCDw4laK9VlAi8gFdCMQMzRFb7I5AYVnpeXWTWe+aAtEAARJkDDJ7o497NO5xt7QZzcRsBzMAESq+TRI+2c1iHN0/d/SzLE+Ps3nMEKXhMIMQLSOxs8VkT+rIBdIZNCyKCNTQx3Z6ht5Be9VwIzeIW/pAUxVwEDsz9dWMDQeMu+hb3kfflwhFu5S0+RIiyaVQrwhtmKxXUsQTAWMH8VvavMsMfIrbvQBU3VlgAAAAASUVORK5CYII="
			}
		],
		knowledge: [
			{
				name: "知乎",
				url: "https://www.zhihu.com/search?q=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666873123741' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='15646' width='32' height='32'%3E%3Cpath d='M539.101 769.844l-76.117 48.43-96.094-151.063c-19.842 63.221-52.85 120.174-96.455 172.482-18.128 21.78-36.977 41.396-58.667 62.004-6.99 6.629-34.947 32.332-39.592 36.976l-63.762-63.762c6.268-6.268 35.489-33.143 41.26-38.6 19.391-18.398 35.85-35.623 51.497-54.382 57.089-68.452 91.54-144.75 96.365-235.884H117.749V455.86h180.373V275.485h-39.14c-31.07 57.089-70.256 100.198-118.055 128.832l-46.356-77.29c62.905-37.788 109.351-117.423 136.993-241.7l88.023 19.57c-6.313 28.544-13.664 55.33-22.051 80.402h203.506v90.186H388.31V455.86h112.733v90.186h-104.39l142.45 223.799z m173.068-3.157l50.325-40.268h76.749V275.485H658.869V726.42h33.189l20.111 40.268zM568.682 185.3H929.43v631.307H794.15l-112.733 90.186-45.094-90.186h-67.64V185.299z' fill='%230E87EA' p-id='15647'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "维基",
				url: "https://zh.wikipedia.org/wiki/%s",
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACKklEQVR4nM2Xva3yMBSG3xPdBai8Ah0WS1iUiCYbeINITBAWyApImSAjuKOgSUYwFRv43ILryCR2IN8VN58lGr/E5zm/TgiR5Zzj2P5vV5ZlNNzrNz5l9BVMtoTx0Gb214aHa3EAWiL84Vo8AosDfAHAbrfD7XaDEAKr1aoXu64DAFwuF2y326R+PB5RluWTfr/fsdlscDqdRs92XYf1eo3z+fxoB/8rioIBMBExEbG1lkO9rmsWQvR6qDnnWErJRMRVVY20siyZiFgp9bT/BGCt5TzPkwZCSAAjzT87BA/h27ZNA3gIb6BpmiiEBxx6CoDruh7931rLSik2xoy0EYBzjoUQDICllFEAKSUDYCFE760xhpVSUe+bpolGLAlQVVXv5TBnzjlu27aHFEKwMSaZMh+xPM/fB7DW9l6myLXWPWSe5yyEmASIpSYJ4L1MdUOYcyKKFlcYzVhXvAQIi01rPamHtRCrp5T2EsD3NRFxWZaTaYgVrFJqMjUvAZqmYSJKdoQ3npobAJLRewvA5zBWjMaY/nCvh1Fq2zZZ+bMAvKfDIRP2fJgGX4xa62RhzgYY9rxS6iklfg54CD/33zn7LYBw/vvDw2hYa0cFmZqi/wQwvKRid0R4h0gpJ1tvNsAwzFO1krqOfw3g3KPai6JI6v4OmXPm15zXp6IosN/vk/rhcMD1ep1z5OPL6Me7P19ZltHiL6X/B0Dsq/Xjhn9sRg1/qiZijn4DhUA2yPD/DEEAAAAASUVORK5CYII="
			},
			{
				name: "百度百科",
				url: "https://baike.baidu.com/search/word?pic=1&sug=1&word=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E",
				disable: true
			},
			{
				name: "百度文库",
				url: "https://wenku.baidu.com/search?word=%s&ie=utf-8",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "豆丁文档",
				url: "https://www.docin.com/search.do?searchcat=2&searchType_banner=p&nkey=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACsklEQVQ4jZ3SWUgTcBwH8H+QeDCpLUXR2vKGyZzHFuq8ErMi1PBK01LSBKdplgeYCPWQZWFgGV2GQhbpQ4XNSs3l0XRTZ+pm6hRiTtnmXOKZZfv2EstSevD3/P18H778CNnmOfmYHSSE7NquJylVjq1O3pTQbWH3Y7YpZcNBhn1uFpz/5SzNdhOGOZXQTa2Ji60XJdgr3ibndBWjtXKSi7Ju33lCCHWTsnY28Uoud3tyo5Oruv/Jb/VO/4Hlsj7Pn8VSD5SM+KB83Ae3J5lIr2Z2bcLc41YZtYrAtc7FaPTqz6JPx4dkNg3CmRjUjnFRKHZFUgcb2SNchJ13ufUXZvJMj76a8YfmRwOWvg9ANlcE2VwhZPqLGNJloXM6ETWjQeB3s5Eg9Qcz1D5uozcpf+0+Il6IhELfhKn5z5BqL6BPm4ZeTSrE6kQIp6LwXBGJq4P+yO7mGWh0mrtRO3ma8xpVAeiYiYZcVwOFXoCB2TyoV5qhXHwG3eoHKBcFqFdE4NqwF3JbuF8pFIq1sSD0BDWzeS4EzcrD0K/JAAASdS4AYG19HdolFQCgS12BkgF7ZApYGkIIzVgQdoqW16jh4eUkD+plMdYNK2hTpQIAZLoGNCjifxfcQ26PHfhNbL2lJbH6M2CgRVTtBAvVI87QrkoAAIIvcQCAIV0d6sajAABC1SOc6WCAX++tIITs3Dgi7fJbx/kK+V50Td+FfFaIx6MHMarrxouJK7gpDYdcK8HDwUvg97ERUeBSuekHAk7uKbo+xkKByAH5H+koFrsgt8sBWe1uyGhlIaHRFSltbOQLgxaodub0rV53R2yp3dNSOReZIi5S33OQ9I6D2CYOYgTeSBP5oUh06Jt7kE3kVth4wcmMgrw3Icr8/iPI6Q9HVk8gzrUHGNIfhLTs97Dx/Tf/C0aUi3kge/guAAAAAElFTkSuQmCC",
				disable: true
			},
			{
				name: "爱问知识",
				url: "https://iask.sina.com.cn/search?searchWord=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACRElEQVQ4jY2SzUvTcRzHv5dunjqEHWJrzqVGPqxLeUkR/4PPd79Nk/QgFV6GWmhRoCAooWaSumUpiVD0DBVIUkqkl/UA5W/zYU0z0HBqkaZzk1d/gM56nz+f1+X1UmqXuYwKXFKCFhdaG7g9Hna727Hs7Gyn6DKczsbA7T4z9mzoY/jp8MRcXcODgEjVvyEilRQXt5Nmuc6pwkG6+r/iG1ikoPgRx080BUXOJoeIlGM/VB8+mt6J2rcfW0YP+YUvOFn0kvyCYWw2PwcPFvm0W3aHiFSSmV6NRwz+RHrxiMbiuIXD8RBLVhei3YgW3JIMoDWlWlgPPyFu3mBj1o/WgiEajwi/pvtILNxLDnBpIRr2EzebYLIDgq2shduJB30Q7gSzjVioA3ElARjiIREdgm8DEGwmMeljfbaD7Zl2CHYRMx9DdBwxkii1plqthgjxpS/E5rrhczeEOtkONcNEB6yEcGsh1Wq1JjWhlEoREe70XBr4NP586udyID4RGJzq7akb0FqjlErZ61kppZTdbs9yiUaLUCpChQjiLvm/EpVSSotws3WY2JEstmzHiOTk4a/xzYih94ZUVXm92lVOS0v/+shohLHRIAlbLuNvTMbemjRcu78ucm6vEktpbevn9Yi5NT2zycz3BVbTclic/0FkbpOh0RCNV+9GzkgSC2II7z68Z2p+kd8J2EhzQmYqK/ZcVteWmV2aZuKViXiSpix4vV5qay9QerqMhQOO6ELe4e1ZS0b04pVaLtecp766bkdIfwF25n38sMbXHQAAAABJRU5ErkJggg==",
				disable: true
			},
			{
				name: "萌娘百科",
				url: "https://zh.moegirl.org/%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABPAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAhZJREFUeJyN011ozXEcx/HXOc7mnON4mM0Wo7V5ahJtaTIkuSFFQnGjFrmRxIVy48KN5E7K0412Qx7WmodyQexCuSCxhRUlDzPLtrOj7cw5/n8XkzO2C5+736fv99Pv/ft9v/yr96bJSo7zIZQUioy1ouOKHjrpjjNCVX/57Za4oA9Txtqjabdt9kmdOrPVapKS8EOvK54KTDGEwByBapN1KJKS0m6XphjIalSsQajYiIRhxJWq1eexNnERk5yU1CLpnk++KvVtIsZlQve1uSV0aIwf0eyzZ3boVDIeYbQoqsU6GbMt0q7RR6026LdZaL6MTfKKRFHqgfW2mWdw9BGfWOiSTl+0yTvsuddarTRsqX4HRQ2qttERszSql7HMA9sKv9BlldB0m9TYq0G5i3qcFsgoMijmvrQZ7qrS4LmELgMmQ+w3QKWoPl1KVEuLa5HVpNiAwEzDDhuSMCjw3UZDipQJCwF94kK1XnmjV6cae+SFKuSkZe1TJyIAB3BepYieAkKAEjftNNVua/SbKSnvqx6BuHNuOOeqy84aUCanXEJ3ISAuLy9lru9iBqStENNhuVCIGV6a6q2cXt0q5MTU+lJAWOqRF4676pScb9KOqbTfW91CzHfdSh2g1WrF8hb7XLjBWu0qbJWxwIj1KhyyxTXbf6/OuzHLlTVH1AcRP8dP4kRqdtQT5X/Od9S77sT/Nf+HfgGu7K8KC1PzBgAAAABJRU5ErkJggg=="
			},
			{
				name: "知乎(搜狗)",
				url: "https://zhihu.sogou.com/zhihu?ie=utf8&query=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jY2SS0hUcRTGzyLcRI9Nm8BlbaqFm9xFi+hhm9EgrVZBUETOI3VsUGeiN/RGAqFyGmcRFCFUFJRFWCs1k3LunZnGbOb+73W0ssfo3HEG+7W4E4iBtPjg4xz48Z2PI7J+Z4Psj/ZJ/Z0+qQ//v/ZH+2TX+YjIvmi/nJtBQhNIu4UETMcHraUVyiKnvyPSEHkhQQtpjlN5JkXrw0mkSUcaNcSjI81xxKc7fqFaEkjQRKQ+3CdBC3FrnHv2hUS2wPauDDXditqoSeXZMTZeGWd3WOHqMXH1mGy7abD6ZAppM8qADotlLXGG0nmGzQL54jyTv0oMpPPsDRv0j82ifpR4a9iMKBuAmrCJNKfLgFbFnogipmwqWuI8iuXwPMgiR2KIT2fEtKmNmMjRGOLVGVY2e6LWAkC7SfW1cdaeSiGHPvAiOcPBuxZyaBRx67xTNq4e0+nleJy3yqZuMWBV6CM7bitc3QptskDn62lqbxlUXR5nIJOnLmoibg1pijP8D+CEwhU2GMjYDBo2dvE3+tQcA2mbM8+/8ObTLLU9SwGCFuJPIG6NFW1JdNNmw6Vx5PAo4nVOWDpB0EJaE4hHZ8uNDKXiPPeGfrI8kETcGu+UTU1YOSUe1RjM5BeV+Bfg1rg//JMnsRxPYzl63/+iwqujT87R9HiKNYEErrBiKldyEjQtBDRq7L5lAFDdmWZlIMn7TJ7N1z9z8eU3coV5UtkCI2aBV6lZqq6nEX+mDAiYbOlM8yNXorN/2nldn866C2NUnk0hxzQuvvyKpzfr7LzlV+5QiByI9kvHBJuufmZrl+Es/AnkRBJpXuD9CcQXR/xJpLWsUBaRXecjcnoaCRhOpHbDIS/W4nkoi7TEi38AwHibcZoJerYAAAAASUVORK5CYII=",
				disable: true
			},
			{
				name: "Quora",
				url: "https://www.quora.com/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADQUlEQVR4nO2WXYhUZRjHf8+ZzS0Jw9oUtMSa2V0TI1MJwqiETSzNWnFnxkzpoi5CSqKLCIwGL2Shqz4uFvoAtZCZYEet9GI1Ay+EDRQ1ktWZvNiIVNA+2V3dc/5eNDvunPPOeLS9Uv9X5zw8z/P/vec9vM8Lt3Szy+Im7kkx5W+PTnyWCRYYTBc0A2cMymb0kaCYHmBgQgEKj3OHzvGOxJvA1Ks0k6A4yWPTqlOc+N8AhRRzJfKCedUC4yjGF+bxEz5DwMxALDfjZYmmStMhYGOmzKfXDVBIMVdwUOLuarLHxzaft9Jf40fykywMoI9xX8kz3k2X6L5mgN453HNplKMSM8eFD2ZKPGWGGkCvDMSuGgOPlzKn2FGvxnMFL15iS8gcS7C5kTlAusRujCM1QfHhtw/X/3ciAMUUSYPXQuEL9ggHGplXQY1ijb+4959h3o4NcBEyim7NYde+OwECfowExZrYAIhnHXnlOOYVlRw9Hyy00x4PAGaFAwZ/xLY3/nSF5TM7HoAxPVJsDMf1b064c6VoXzeAOB9lojkuwIiY4oqbcSYegDHogLorLgDelYNrvG5r4rQr3hT14nvgsRBUcuwx38ZzCnjFoBW4U/ALRq/Xwrb0IYYsYFrExRjszFIi5+INEyWip5bgUeXwdrUzA5/diC6J+RIpxFICenSW/uIcZgcBixwmn1mOwPUFIgCrBzgG9IYIWgpf8cQLA/wmjw0Y3Ubt2BXMGxllD2JpzeKNc02T6XGZQ51ZsDPJ/SNwXFzZe4N9mTLPjL0feJrbz/7KdonVDZrLS7C86yR76+U4Z8GLZQa9BM9XxioAgo58im7l/qtZ8gPD0+5jHXCsjrlvxoZG5pW8+sq38qTEDsSMaoHRr8p9wIy/NMoKiS2Oxp2ZMjurC8jh8T4KD7Sr3oi+aaPlX58Pxl84Ysn4PFviVYB8Gx3y6QP2Z8t0XBPAmArtPCCf9cAyYIHEpEqD34GfMRZLtQeWwXdm9AewHpE0+ChTZuN1AYQ1NuNXHOcCQL6V9xSwuWGRsTBb4vCEAIRV6CKhI2yVWFvH/JNsiTei4QmUcnj5L1lj4nWMhxAJjBN49GROsnUivW7pxtFlNM8U1KJDSwUAAAAASUVORK5CYII="
			},
			{
				name: "S.O.",
				url: "https://stackoverflow.com/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACRklEQVR4nM3XXWjPURzH8dcfUVsekjuhZVa0mI3kIeUhzcMFkvJ0sSgXLpCSkljZhRQXKLlAUliJkodSyhXSPJQ8jF14KuXG04rR/i7Omf2a/2y/bf/9fet0zu90Ht7nez7fc84vk81mFdIGFHR2DOqqQXPthLxMXLz3Jf4DD/Q1wDTcRXkhAIbjJmbgEkb0N8BnbEIWpTiHgfkGGIhJie+L2B/L1ajLN8ARPMDmRN0+XI3lnVidL4BxWIEhOI4zKEIr1uEFMjiFyfkAeI2puB2/N+AeygQ9LI95ES5jVF8DwAcsxAFBfOW4j1V4HqGyKNGJKHsCsBbLEn1/YRdW4hOGoR6HcEPQhAh6sLcAw3EUV9CIbbGO4ObpeCTs/XbcwknhXPgmeKVXAKPxJJbH4zDeRqgyvMJMnI5t5qBBEGkFTvQW4CnmoipO8gNDsUVY3XXMw8aYvqMl9mvKNWBPRfgANRiDPXgvuL0a1/BMUP8iLMa7zgZKA7BEiO+J2tX8UTj5SrBGuIgI23EEs7VvWU7r8j2QsB2YH8vNeIyHgjceCsfweeFG3IoFONbVoGkAfuKLEGbFmBVTm7UIq23AHdTia48ATp2t/1NOHOTVwpaVCidgZcyrMBKDY11lbL9UiIr0ANHaXquZRF2rEP+NuJCoHxtBKmI+RdRD/fi6LKxu2p0cp1sAaexNTJfSdkwDkPb9nnPFHa3gj9I0HujWitJawT2QyfVrFsOwr//ZMjXr/36dFdwD/9JAXva8oxXcAzk10J/2Gw08e05AgXJ5AAAAAElFTkSuQmCC"
			}
		],
		sociality: [
			{
				name: "百度贴吧",
				url: "https://tieba.baidu.com/f?kw=%s&ie=utf-8",
				favicon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc1MC4zNTEgNTQxLjA1Nkg2MDAuODI3djIxNC40NjdoMTE1LjUyMmMzNS40NTYgMCAzNC4wMDItNDEuMTI0IDM0LjAwMi00MS4xMjRWNTQxLjA1NnoiIGZpbGw9IiMyNDgyRkQiLz48cGF0aCBkPSJNODQ5LjkyIDUxLjJIMTc0LjA4Yy02Ny44NjYgMC0xMjIuODggNTUuMDE0LTEyMi44OCAxMjIuODh2Njc1Ljg0YzAgNjcuODY2IDU1LjAxNCAxMjIuODggMTIyLjg4IDEyMi44OGg2NzUuODRjNjcuODY2IDAgMTIyLjg4LTU1LjAxNCAxMjIuODgtMTIyLjg4VjE3NC4wOGMwLTY3Ljg2Ni01NS4wMTQtMTIyLjg4LTEyMi44OC0xMjIuODh6bS0zNTguNzA3IDc2OGMtOTcuNTk4IDAtMTQxLjU5OS03My4yNTItMTQxLjU5OS03My4yNTItNTEuODUgODAuNDQtMTQxLjU5NCA3My4wNzMtMTQxLjU5NCA3My4wNzN2LTYzLjUwNGMxMDguNzI5IDAgMTA4Ljc4LTEwNy4yMjggMTA4Ljc4LTEwNy4yMjhWMzE3LjQ2Nmg2NS42MjN2MzMwLjgyM2MwIDEwMi45MDcgMTA4Ljc4NSAxMDcuMjI4IDEwOC43ODUgMTA3LjIyOFY4MTkuMnptMC02MDguNTg0VjY1OC4zNUg0MjUuNTlWMjczLjM4OEgzMTQuNDM1Yy00MS41MjkgMC00MC43ODEgMzMuMTM2LTQwLjc4MSAzMy4xMzZWNjU4LjM0aC02NS42MjhWMzA2LjUzYzAtOTguMDg1IDEwNi40MDMtOTYuNjQgMTA2LjQwMy05Ni42NGgxNzYuNzg0di43MjZ6bTMyNC43NjEgNTAzLjc3OGMwIDEwMy45MTUtOTkuNjI1IDEwNC42MzItOTkuNjI1IDEwNC42MzJINTM1LjIwNFY0NzcuNTU4aDYwLjUxOFYyMDQuOGg2NS42MjN2NjcuODU1aDE1NC41MzJ2NjcuNzM4SDY2MS4zNDV2MTM3LjE2aDE1NC42M3YyMzYuODR6IiBmaWxsPSIjMjQ4MkZEIi8+PC9zdmc+"
			},
			{
				name: "新浪微博",
				url: "https://s.weibo.com/weibo/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACpElEQVQ4jb2SXUiTcRTGH9CZNmeyvXO+2163tSWaFWmsMmtpSpC1EBNDJaiky0AEL6S0D4pKHVFpXmTaB5FdtIuEqBslBCMqKyNDUFKpLQ2rOb9y/s/pIlYUeBFBz+U55wfnBw/wHxO7zowNa4zIAKD6a3pPOkpG6zA+WoeJ50fwJi8VOxc91gLKzpjYwjUq1cbwLA7QbluJHVuSkespxsWpywi5HNj+JxtToZWOv7As980kp3G/1T4pAXJ42VCCpp5q9KZbkHmhFC091ej7JQgk3JLND4LJK3nckcJ+Rwr3W+yTOUuW5rvV6pIqrXRib6L6QI0bp7uq8NRlx7aRs/gc5uO9RqU76EjlUZOF3+llGjGYaECSZ/t0CV8+KTaeSU7jLr190GWM3N68H9d2rEaB34PZH6/pE9umbCt42GBmX3YezRytJXH9JoVaWjlQWcUfMjfzmKzwsySrzwDYAGCtAmdDEZqRGR2d609azr6UVRy40kJibo7eDg/Tw+5uGvT5SAhB8z4/TVRW0ZCshO4ZlccZkdFbfro36PVtAesKnrrrZSEEnfF4CAABIJ1OR16vl4QQtDA/Tx93FfC02cbdim1IA0gAgDvx0qPpfDcLIehJby9pNBoqKioit9tNKpWKnE4nCSFICEHjhyvIn2DkfqtjMqyCGrXG8y07j5mYOzo7aavLRYFAgLKysggAHSwvJyEEhfx+8m1y8YzFwU16QzuAiHBpzA+khFd88hQvBINcW1/P63NyOE6WqXDfPhqbnubQ4BB/LS7loMnC90yWHgkw/tYeCZDr1eqW97sLJ7ntBr++1MgDV1uZO+4zHzvBX9Od/FJv8FfrpHMA4hetsAVILYuIOOSREi+3GpX2xrhlt2tUMed3R0WVGYGkRcF/yXdyajYEKzT4iQAAAABJRU5ErkJggg=="
			},
			{
				name: "抖音搜索",
				url: "https://www.douyin.com/search/%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666873215809' class='icon' viewBox='0 0 1029 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='17442' width='32' height='32'%3E%3Cpath d='M259.3792 385.3312m-170.5984 0a170.5984 170.5984 0 1 0 341.1968 0 170.5984 170.5984 0 1 0-341.1968 0Z' fill='%2303F9AD' p-id='17443'%3E%3C/path%3E%3Cpath d='M403.968 568.4224m-170.5984 0a170.5984 170.5984 0 1 0 341.1968 0 170.5984 170.5984 0 1 0-341.1968 0Z' fill='%23F9F90B' p-id='17444'%3E%3C/path%3E%3Cpath d='M631.3984 622.2848m-88.6784 0a88.6784 88.6784 0 1 0 177.3568 0 88.6784 88.6784 0 1 0-177.3568 0Z' fill='%230FF420' p-id='17445'%3E%3C/path%3E%3Cpath d='M753.0496 565.248m-88.6784 0a88.6784 88.6784 0 1 0 177.3568 0 88.6784 88.6784 0 1 0-177.3568 0Z' fill='%23DA0DF7' p-id='17446'%3E%3C/path%3E%3Cpath d='M594.0224 369.3568m-223.0272 0a223.0272 223.0272 0 1 0 446.0544 0 223.0272 223.0272 0 1 0-446.0544 0Z' fill='%23FF0000' p-id='17447'%3E%3C/path%3E%3Cpath d='M901.12 1024h-778.24c-67.584 0-122.88-55.296-122.88-122.88V122.88c0-67.584 55.296-122.88 122.88-122.88h778.24c67.584 0 122.88 55.296 122.88 122.88v778.24c0 67.584-55.296 122.88-122.88 122.88z' fill='%23070103' p-id='17448'%3E%3C/path%3E%3Cpath d='M829.44 268.0832c-89.7024-0.1024-162.304-72.8064-162.304-162.4064 0-1.024 0.1024-2.048 0.1024-3.072h-72.4992v-19.456c-0.7168 7.3728-1.1264 14.9504-1.1264 22.528s0.4096 15.0528 1.1264 22.528v576.7168h-1.7408c0 89.7024-72.704 162.4064-162.4064 162.4064s-162.4064-72.704-162.4064-162.4064 72.704-162.4064 162.4064-162.4064c36.7616 0 70.5536 12.1856 97.792 32.768v-85.0944a234.496 234.496 0 0 0-97.792-21.1968c-130.3552 0-235.9296 105.6768-235.9296 235.9296 0 130.3552 105.6768 235.9296 235.9296 235.9296s235.9296-105.6768 235.9296-235.9296c0-0.7168 0-1.4336-0.1024-2.1504h0.1024V276.1728a235.4176 235.4176 0 0 0 162.9184 65.536v-73.6256z' fill='%23FFFFFF' p-id='17449'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "豆瓣",
				url: "https://www.douban.com/search?source=suggest&q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACOElEQVQ4jZXST0jTYRjA8UfQNd2w3DqERIQQBmFQNPFgHVwI2SHokKTQpaB/RJvZ/JPLhWWkCcq2lCIhFILyEHaoYEr9LE1/bXMzqYOYTmeUOT2olWjfDjYV+qcvfC4vL194eR6R7Zqjkqf3SK5ubfL0HslJuCeSr1ekciNSmoAUa1bPvh6pMCJyRNcmJVqqntehjvhXLa02EynSIpKr80iJlmrFSceHLtoHlP/qGfGxs3ZvNKD3yGUDYtWw5XoaJqeZzPoD7Gs4+JsMdzYmZxYxxQakUIfYjdFAEnI+lpa+VgCmv88QmZ1k6uvUkonZSaIn3WVGLLGI3bAiYInjYfARAObbh0i+ksLmyh1Lkh1bud/bAoDJmYVY4v4e2HQ1FTkhyNkVjgt1L+v/FYil9d1TANydd6hsu0mN4qZGcVGjuHA8u4Z3tBeADHf2H75QoKX0iYPP0+MADEaGCX7sp//TewJjb/k2PwdAz4iP1KrdSIF2ZcCAFCUhZwTr40sAHG46hpyLQQr1iC0R/1gfEzMREsqSEeu6xffLASNSEI+cFrZV72F+YZ5GtRk5JchJIeXGLhZ+LNDse7B4Z4lFLiZGx7i4SLe67qKGvPSO9S2NSw15UYd7GIqEABif/oI6rKKO+jG5zIhNsxxoeN2ILxzgzaif9oEOXgx24gsH8IWDdIe8tA8ovBrqxhcO4gsHSHft/xXI1ytSbkQuxCNWzerZEhGHEZEcXZNUGBF7ElK2BuUGxLZh7icJ8DyZ0CDAawAAAABJRU5ErkJggg=="
			},
			{
				name: "X",
				url: "https://x.com/search/%s",
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB7ElEQVR4Ae1XMZLCMAwUdw0ldJQ8ATpKnkBJByUd8ALyA/gBdJTQUtHS8QT4AaRM5ctmThmfogQ75CYNmhGTbGJr45Vk0yAiQzXaF9VsHwIZAofDgYwxqo9GI/K16/X6cqyxvdVqmdvtZh6PhwmCIHXcw7vdrpFj8ny9XhsYxhe8lwWHw2EycLFYpNh0Ok2w8/nsFHy1WrkE1wnAN5tNMkGv10ux3W6XIab5fD5P3ovldCGrP2Ap4LiW8uRJAcIwe1wpArYU0FJimhQgxaQ9cqX4BZYCgSVmS8HBfRP1JQEsY1xKGSmAcTC+l0QrIWDraicVMBBA4O1265ScpQnAMbkMwphjub1HAI7EkxoDK7n0/gQQGATsCmDMo+z++Hf8E5CjPZ9PiqKIZrMZhWFIl8slxcbjMTWbTTqdTuRrXoz5i2WXRIL+WxWw2+Uml13rnJUT4K9E9nMFaF3SxiojoO1u2rJzl4z3/+oIcHBMLiUp2rDe3ozg+BIYtNee87KjGzLGndPx7JD/0K7xog2Gl30ymaSY1jm9CPhsrXnnBK1zOhHgCWWtF7l2TtA6p3S1E+73exoMBrRcLul4PJKL3e93arfbSUeMA1O/36eYPHU6nWQu7pyaqRlfZnezV05anhSN34va7PPXrHYCP+VaTG3LBV1KAAAAAElFTkSuQmCC"
			},
			{
				name: "Facebook",
				url: "https://www.facebook.com/search/results.php?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAl0lEQVQ4jWNgoAbQtE48bOXX9J8UrGmdeBhugEvs7P8eSYtJwi6xs//DDcCnMCx31f9j5x79//X7z//3H7//v3H3NVyOKAP2n7j3Hx2QZMDXbz///////39+3RK4/0kyAAZcYmdhyOE1ABd4/PwjZQYsWXecOANg/oUBGN8hYhJ5YYBNbjgZYOJRdZhUA8w9a48QmVfxAwATIfnUl6gLIAAAAABJRU5ErkJggg=="
			},
			{
				name: "微信搜索",
				url: "https://weixin.sogou.com/weixin?ie=utf8&type=2&query=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF9ElEQVR4nL2XS2xdZxHHfzPn3CfXjxvHiWMntZvEaZ2mjWs1VIqqREjUooIFD4UdEiwrEAvEplIKK1iCQEKAoBDRVS3EIiJQkvRFUiTciCRYSWOH0NRNr4nt2r5++9xzvmFxjq+vH0mchjJXcxfffOeb/zw1I98dOkwNtQPHgF6gE2gF0jwYBUAJGALOAH3A8LLQr7n4LPBDoAfQB1RaS2mgI+HPEht4PAFTVdQLnACeWq3cMByGAwzBR0klEocRAXY/YBT4dKKrF2IPtAM/IHZ3jWqHT4566aSJg+RkGxm2oKRYZJyAMpN2lUm7whITCALIZoG0JjoHfYxjCD21Nnuk2C7PsEs+R1EeI0Xdho9HssSs3eRDe41b9ipLTCKbj14PxjHfsF5s+SsjQxOd+jV26XP45GtCsJ4UnwbZR73spdkOcdX9nLINbRaEAr1KnO2AkaaRx73v8LB+GY8siEMERNZbLyLxucQ50CyH6NYXaJSuOwLegDqVJPaCslu/Sos8gxErHiu9z7mTLzP4j/OYrTwqIpTeG+Tcyd9xY6AfzDAiGqST/fo8WZrYZHK2KkbaLKKRLh7SL1Qlzjn+ef5VLr71R945+wfmp8tVT0RhyKW/nuLiW6foP/175menERGMiCbppk2excxiDHfntBqGAdv0MBmKVeQiSnFbK/lCPVtbO0hlslWbVJXmto5E1k4qncESoaC06FF8Cjgi7B4/HzM8ydDII2u8Yzx+uJedex6jUGwincuzokXoPvJ52h/tpq7YTCqTAwxfwVfHDmmnTZ5gNLrCopshshBBk1JdTb5heJYlLY3r4uan0mx7aE8cY9tAtnMPglGXNhqyQj4FvoInBdrdC8y5Cf4TXOfawjn+tfB3AptfVyE+Bk4iHBU2qnVzG2e0AVnPsaMg1GcUT1bOAQpekYK3hZZ0J/vzn+HGYj9vTP2akeA6WgNCDQhtnnkrbajoTsrzPnQ0KsWsoAKiiqjW3DEQQxRSmqErd5QvNb1IW7prVW4oBs4qjEcXk95+b/IV2uqEvB+DcVHE5UsXGbx2tRoqEWFqcpK/vX2OiY/GMXHsyOyjt/gtCrq1WiUa14AwEp1n0l1D8O5pfTEr1GUEI66IkZESv/3VL3j5xEuUy1NJgxLefP0sv/zZT3nzjddABGcRHdlu9ueP4iz2gpoZZrBgo1yrvMSSfXTXVqpAXdqq2WJm1Nc3cPDJHrr2HyCbzS4LeHj3Hp44+CTt7R3VClLx2Jt7Gl8ymBny7YGnbDlmAuzyn+NA6nmyspWNupmKY+8WKKT8qlRECMMQEUF1NfgwDPH9lbFDUMYqN/lN6ZvMRGPLHojjYQbvV05xOfgRoc0hyB3rd1VYzPA8b51yYJXyZXIWxSEw8NfWt+EQUviSo2LzzNowGdlCRhpQ0ph5VCIjmUvum0SE6XCUxWgWLGlEqy7g06w93A77uV7pYyIaICNF8tpCXloAoTy3jyPZr9zTMxuRmXFj/h0Ct4CIrveAoLwXnGTa3SSwMiIeS65MOfp34iHj9lQTO3MddH7qaZxtrnQhTsAPFq5weeZ0kpNJH6hlZwHj4WUCm4lL0mJYgofgofjMhBP8aezH3Fp8F5W7l22tYePBMH8e+wkTwYex9wzUnLGaAVNwsF4Ws5hya+FdXim9yMD0WSKroOKtSdg4gVU8VDzGg2H6Rr7P9bl+xLT6lm9mAR9j9heUkcUhXil9j0cKh+kqHGFX7gB1fhO+pIgsZDacoByO0pKJh66JoJQML9WwB76ZlYhn9vsmQVmM5rhU/gsD069T8Io0pLaT1hyhCyiHt5mPpmnLPsqhxi+yPb2byaCEriRvyTezoY8LoBZIZCFlN8pU5TYk7X15VL8xd4EP5q/gawpMaj0w5DtzZ4g3lv/RNrSyH1j1XwhskcAtJicG4IAzitFnZheWO+L/kS9g9PlmNmzYcYwTrNmOPkEqIRwHhjVpRGcM+0biCfcJWu3MrN+wrwNnzCzZjuNgnTazQdas54Y90HouyLr1XESGl/PwvyqcdNFgnYiiAAAAAElFTkSuQmCC"
			},
			{
				name: "小红书",
				url: "https://www.xiaohongshu.com/search_result/?keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAXSSURBVGhD7ZprbBRVFMf/O1ta+qDQUh5CKS+hVQMVFBAiNjUBixJRUT4YE8UPPj5VjSlEjaIJiFWgpUaBgOURsFIVtNFQo5IoUouNBYq2gKVvoZXtA0rpdndbz+m5Q6ez27JEozvJ/pLp3HvuzOw99zzumUltMJAUGpH0YuyEl+6LHJkWHxIWbwf6jf/feICeerezvvCK49Cm5rqNFV0dFWqob6LpMfHp60dOyRxqt4cqUUDT6fF0rXacy8huqc/mPi26KJE1elpWiKb19q0AzzWNPKe1291a3Hmp2MbuVJpw5wmrWMIMW2ZWbUmyfe2oKevmhQ+fq+SWgy0TqmlhtuqpC2onhoRNUHJLUuN21tnciandgZadbhTOZhzdllaCYR001bY8QUUCjaAigUZQkUAjqEigYetJTO1R7YEJo8L4ptGkNuntaAHaLqsBH4wdBdx+q7QrKoHqemlfDzs9O3W+tBsdQNm1dya/8E+RGUlA/gfSztoBbNkrbV+sywAeSaPqhx679GmgsobuTwRiR9BCUDGhUUXkdsu1tX8CVXXA3GQZz3pD5CfKgW37gNZLwKnTgLNL5DwPpxM4UyV9A/4pMus24OMcaQ+mSFwM8H0eEDoEOHwUeP41kW99G0iZJ20jW+k5m+h5hbuBifFKaKK5FXjhTaCbprkni87dwMPPkDLn1AWCfzFi87OufPwhUYLZ/bmc/ylsqcxXgMQpNA/qs3uzq5uwr4mbvEa1+3jqMeDBRcD82cCREomP5Utk7OdSoKSMJr2MVoZcKOUu4Mdj9PAw4L1XgfChch27z4I7gI5Oca+T5C4L1ftb40UgJxcoPg5c+Au40kExQS7Ev8ecptVm14oeJjEXFQns+wIoPQXszAd+pbMJ3xZhH+eJLklVAh/MniHX8ME/+MC9QMxwNUg8ej+wYqkE+3c/Abs+UwNEC7kL90t/k/6BQrKgYZzjhvtHflECouGCKMML6QPfiugTaqNgG4jWNtUgRtD1Xa6+INYp+Ba42Kw6A5AwHrjlZjl0oqOkPyZOCYjJ9BIbEa463vhWZES0nJsNkzXTYhiLoet50jPJkrxqDGetnZ9KezDWvkwW2Ub3bVYCgl2SZWxVnRwK+KIDwMoVStAfb0WiIoAhIdI2rroZTo06bBGG7122WNrsAme906QXHLz+wkGe8SxZcZwS9OH9FH1STMsgrsVpUYctwiynFYxU5ucf27a+z7oDwZbc8QmlVkOWq6G4+mi/yPnIpQBvaJQxzqDTKYOZ8FZkkiGf19GGNRD151WD0PeARXfLmRk/lv6Qexkt54u8AuDdrcDG7UpAlFNFkLlF5Hy88yEpRgrp+NgOvBVpotSob5HHf5ezr22EU+RVSq0Mp1MmZ6fExd6DknU2U//fwkXJRIfjz4S3Irz9H6W943xTnyL63mCEsxSnVa67Dh4Cpk0C5syUsuMP2jc47fLum0x1l56mddh9ddn0yUo4AByvfMRS1aBj9/6yq6LaRC755zhyDdb8a1pVTn06RlfhEqOmQTa9556QvUSHN7u8L4H1q/rfz/Am93q6tN/K9lk79cKFZOEemssYJVCw15jwtgjDu3n+V6II+7Duk7wLF/4gbeZsNfD+LomHtBQlVHCQpi7wVuJG8FBdxW5q5Bv6fd1TDFy/aIwgt7qHCr5OqkBLTgLtV9SAAd7AuLAcRmf2ZRdtjIeLgKSppKRpNc1UkPtx4mB30ZMFL5g+2UhK6QvnyKLy7n7qjMhN+Ff9WgDfrmVBgooEGkFFAo2gIoFGUJFAQ3P3fiiyNqyDVuPqoprb2rAOGv+DiupbFtbBlhgakXgiYW5ZmN2mPhFaC6enx5Vce2yG3eFxOa7C07E4MlZ9/rAWqx2VqwraHQW974xFVy8Vtfd42lOGxqSGaDbv98gAhC3BSmxortvA/WuTZmXy25v2azabPdYeGhdt14Zrfn+9/m/g7FTlclbnXW7MW9lY/iRbQkaAvwEWveocTKmI8QAAAABJRU5ErkJggg=="
			}
		],
		scholar: [
			{
				name: "谷歌学术",
				url: "https://scholar.google.com/scholar?hl=zh-CN&q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACqklEQVQ4jYWT2UtUURzHL/QH1LMP9hKVNUKFWpP7TDrjU9uEo4WPWlERUbSoueSMaTWjTBCRGV3HiCsSWrTQApVSZBtZWEZSUWZkC3PPne3OzKeHK1NKy4Hfyzl8P+d3vt/fkSRJmpWSVbU9vbxbMZXJSnqZrMx3yErqmrN/r7V+Zf76jjNz5mYXSilZldtKfGBrA5sXcg7Dpg5wX/lzNV+FlmuwsRNy6r9HJFO5v9feBlaXILNWxenT+Pgtzr/W2Oc4azwalqMgLXZ29di9JMXj/xH3P4pybjDKhvYg1qMgpZfKyko3lPk0xr9PF7/4EOfTjwQAiQRcfqpjrlMZeBVjc2eI/FaQ5jlkZWs3qKHENPH7yTg5DYKKExp6DGJxcLRprHILAJr7w5hdIC1wyMquHmNj3/kQN57rALz9Eie/SZBRo/JwLAZAtRLC4jIA7r4pQHqprBS0QkaNysLdAXbKIQAiOjh9Gml7VOS7kaSooGkGwFQqKzYvWFyCgiZBbqPg3mvjRv9ABNPeANeHdSbVBOu8GvYWA9ByMcyKmQCLS5DToFLSKlDuR/kmEox+Moyt6w2TtidAUbPgyKUwZceDWI7MAFhdRgdL9quk7ghw8bGeNPXdZJzKjiCZNSpZtSp5jQKb9zeA1SUw16ms9WqcvBlhcDTG4KsYoxO/ohXhBFWng5jrVCwuQbHnN0B2vaDiRJCJqdzvvtRZfUyQ3SA4dSuCbtjC0JsY5npBYRLg9PfaPEYK14f15NA4fRpLD6jkHxKY9ga4PWKcvRyPk9toGF7sBWmR45S/pN0Y5a6BaLLdroEoGTUqy6oNc99NGk85dCHM8oMCqzuIvQ2k2XPzLAWNX9UiD9i90D0EE8Yo8GQc/A/g2QSMfIHaPsg9DMUe4/dmbrnz8CdxKwtDTtdexQAAAABJRU5ErkJggg=="
			},
			{
				name: "百度学术",
				url: "https://xueshu.baidu.com/s?wd=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "知网",
				url: "https://kns.cnki.net/kns8/defaultresult/index?code=SCDB&kw=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB3klEQVQ4jaXSMUhqURzH8YuBrSbiIIKIS4vo4ORQgyJCBg5Fuuqgsyh3tKFwUsjFycEIwq0lBMc7RLQFIl4RnLxXzqbe4Yp0v28I6vle+F70h99y4Hw45///S9SO+Ukkasf8XovFgkKhgCzLrFYrdtZXgBCCw8NDbDYbnU7n+4Cu67hcLlKpFEKI7wOPj4/Y7Xaen595eXmhUqmg6/r/AUIIQqEQBwcH5PN5HA4HTqcTVVW37mma9t6fP4GrqyskSfqIx+Oh1+sBsNlseHp6olwuE4lEuLy8/BsYj8fc3NwQCATw+/0Mh0NM0+Tu7o5Go0GhUKBerxMOh4nFYl/3wDAMms0mPp+P+/t7ptMpXq+XYrGIaZqs12vOzs5QFGUbGAwG9Pt9FEUhm80iSRJHR0dMJhNOTk6oVCoAtNttzs/P2Ww2n4CmabjdbhwOB7FYDL/fjyzLCCGwLItSqUQwGKRarbK3t0c6nWa5XH4Cs9mM09NTcrkco9GIWq3G7e0tlmUBMJ1OiUajxONxWq0Wqqry9va2/YXFYvExynQ6zfX1NZlMhvF4/HFuGMbuPdA0jWQySbVaRdd19vf3ubi4YL1e/3uRXl9fyefzJBIJ5vM5AN1ul4eHh/fn7gR+kF/ZQQ/WnEhepgAAAABJRU5ErkJggg=="
			},
			{
				name: "万方",
				url: "https://s.wanfangdata.com.cn/Paper?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVQ4jdWSvY4BURhAPwoS8TuTqESC3lN4DZGYVqGTaPQa4g1UYjqxdN5EoURI/CQ0M9/ZYnYya9fsRrHFFqe5Jzm5936ftEXatog9EZm+ii1iy1xkQbUKlgXNpodlQb0O8TjUao/O940GJJPIRGRKr4fCd0wTXa2eO4BK5SPQ6XiHqh6Ans+oYaCz2aPz/e0GpdJfBk4nL7BcPn+C60K5/MsNTBMdj9HDAd1uA3Y7dLOBYvGHwPWKFgqoSCiI/BC4XNB8HrUsdDRCB4OA4RDt98EwwgOcz2guFzpG/sEYXwp0uziuq59x73d1DEOdxUK/Osd11XUcDfag1UKPx2DO+z2s194nhuwB/h7MRd6IxSCbhXTaI5OBVAoiEUgkHp1PKgXRKO8NfBp7UCxd2QAAAABJRU5ErkJggg=="
			},
			{
				name: "EBSCO",
				url: "https://web.b.ebscohost.com/ehost/results?sid=8e76c941-084d-4b93-b05a-d5f182196017%40sessionmgr102&vid=1&hid=128&bquery=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACJ0lEQVQ4jZWT3UtTYRzHT+w4pzddeRFdBAbd1Z8giXtJz9mKvBDCxMqkrK57u6kEyx13zjHWIl8TEbMptaLpZMeMCgdBS8dSRC8WWAS9UJRS1j5d7AWnjuqB78UPHj58n+f7+wpFLp0il45Z1hBs7nVS0krPdoXM/YyEIpdOgaRSWt/JGZ9BvWeUOiXIUXWMxvZxGrQQTd4wTd4wrkv3sDh1LOsBYpVKaX0XPaEYmfPx6wqHlSAHLt/nlDdMZO4tyWSSHXUdmKrUXECxS0eUVIS9V3kYWQTAiCYQKlpT1itaESs9BKYWqHU/QrApuYDsYFMYnJwF4PH0G0RJxeLUKJQ1BKubbYdusvNIF2ZZzQOwKww9mcsCTJKKKKmU1PgoPzvElkoPBZK68RM3AxjRRMp++TWO6yFGns3nT2EzwIcvyzyILBB+mWD1128GJl7nvP2vgOjie6zn/Ow77+d5fInhp/P/BzCiCQSrG6GsBfsFP/1GHMHRhsX5j4BMCoWyxtaD19l1rBuzrGGWVYr3t+cH3Jmc2xijU8NU5UFwKFwZmGLPyb7sMmUBZllDKGvhbtrBxKv0ItmVlMpaqG4O8O7TN7bX3kKU1gDMskZJjY/G9nG+r/wEYPnHKg1aCMfFYaqbA6gjLwCYX/pMYdpVFmCq9LD7xG36jTg9oRgdwWm6x2L0heN0js7QOx5jcHKW3lCM0zcMxPVdyKmzdY3SFc6ptKMtJ4U/fkBXz/LD6BYAAAAASUVORK5CYII="
			},
			{
				name: "WOS",
				url: "https://apps.webofknowledge.com/UA_GeneralSearch.do?fieldCount=3&action=search&product=UA&search_mode=GeneralSearch&max_field_count=25&max_field_notice=Notice%3A+You+cannot+add+another+field.&input_invalid_notice=Search+Error%3A+Please+enter+a+search+term.&input_invalid_notice_limits=+%3Cbr%2F%3ENote%3A+Fields+displayed+in+scrolling+boxes+must+be+combined+with+at+least+one+other+search+field.&sa_img_alt=Select+terms+from+the+index&value(input1)=%s&value%28select1%29=TI&value%28hidInput1%29=initVoid&value%28hidShowIcon1%29=0&value%28bool_1_2%29=AND&value%28input2%29=&value%28select2%29=AU&value%28hidInput2%29=initAuthor&value%28hidShowIcon2%29=1&value%28bool_2_3%29=AND&value%28input3%29=&value%28select3%29=SO&value%28hidInput3%29=initSource&value%28hidShowIcon3%29=1&limitStatus=collapsed&expand_alt=Expand+these+settings&expand_title=Expand+these+settings&collapse_alt=Collapse+these+settings&collapse_title=Collapse+these+settings&SinceLastVisit_UTC=&SinceLastVisit_DATE=&timespanStatus=display%3A+block&timeSpanCollapsedListStatus=display%3A+none&period=Range+Selection&range=ALL&ssStatus=display%3Anone&ss_lemmatization=On&ss_query_language=&rsStatus=display%3Anone&rs_rec_per_page=10&rs_sort_by=PY.D%3BLD.D%3BVL.D%3BSO.A%3BPG.A%3BAU.A&rs_refinePanel=visibility%3Ashow",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABr0lEQVQ4jZ2TPYobQRCFvyNUMpGTjgQbGAqBEZs1i5AD4VWzBoNgF1cihB0NONyk1/mgEwxzgmFuMHMD6Sa7RxgHQ8uzI+HAFRXUT79+7xVMQjPUO/zxFyfv8ONcM3Tafw4nuHZPlxZM62lBu6dzgrsYNsWKNQcA/YAW9xyKew5xSSy/UhWfh1qx5mCKvVsS74ivz7wB2CcsrogAAiIgmqGmWP+bHuD1mbd4N/RgitVbGic4zdBwQxAQm2NxSSwfqI4/OYUZwRSrv9FohtZbGlOMckPVv9ALSP1IAxA+EsYQNUPTYPs08NS/0JcbKvIFeZgRNEM1Q53gwg1hSqIpZoqVG6roiWFGyBfk9JG+j/Te4cOMkN+SX5PLO3x+OzzmHT7NnRFETyw3VKZYviC/QDAfmE9IzwgSB+P/HXecxiic4GyOAdSPNAJy5mCsQvtEFz1RM/S451RvaeKSmIZtjnmHF5CzClMftN/pTDHN0OQDgLj6u+idD5JMyYkCUj5QFevBhcUXDnE1oBKQ5MQLop3g2h1dgnlNBZtj7e7KLYwjHVP7gy5dY8r/eY3/G38A1vO4VlociLQAAAAASUVORK5CYII="
			},
			{
				name: "JSTOR",
				url: "https://www.jstor.org/action/doAdvancedSearch?q0=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADl0lEQVQ4jS2RS0zbdQCA/3cvJh71ollMICN0FhpwbBlZx+Zg0NdC3/23pbQ8B91YGQOtCAOZJQrIaillLVDgJ6+BPMTJU91Bl7mwOBQQjEuGzJMHTbx8HvD+5Uu+fFLGSy/XlipVQlaohC1NKeT0TOFSZgm3MlvYUtOF+ViKMB9LEbbUdOFWZgk5TXnEKVRCTkkTkkeRMb/cEGS+sZb1T5r54sZVRpwuhq1ONsUU+6tr7C2v8jg5TtLh5uv2Bta7mllqaWDRX49kS1OKe9eqCBvP0u+8RNynI+rIp/nEcdqyT/HX4Qv+/fsfomYnd4xq4j4NAyWFDFboSJjsSLbjSjEbqKXPdpGBEi19lgJWoteZD1XRVZTD1uoyz59uM1hup18uoM9eSMSSz0CJjmGHG0lWqETCZKfPns9Mq5fuwrOETRfpNeQRNqp5srjEwdYO4zfKGasz06vPY/ZWGZ3nThHTWpBsqQqx8tF7DFYYmGnx0u8o5MPT2UwFS2jPUbI5t8Qf27vEnBbW4wG++tSPCNiZft9DTP+/YLUzyFCFHlHvYK6jgpD6FBFrAWHTeX76coXDnT169VrmbvuYD1VyS6Uk5iwiZrAiyYpMMSK7GHAXMtHkouN0FiN+MzOtpfTocvnt4fc839ohJpu569EwVFlM3GsgYslnrNSH5M7MEuELOlpU6QyU6Ih7DWwM3iTpNxPKO8mzzR85+GWXXq2GHl0uC53VDFYW06vPY+HdAJIt9S2xGAww21bK/fA1OvNOU/vKa/Ro1ISNeWx/84DD3T367UaGqi8T9+rp1qi5/urrDFqdSI40pZj2VzHR6GC2vYzlSB3JKya+TTYx0+Zh/4eHHGztcNdtZaJJRtTZWI3VE3UUEdWYkFxKlejXGmlVKYi5tEw0ygx4tIzV2bhzWc32xgN+f/yEhM9BxPIOwzUmQuocItZ8Rj1eJGuqQiwG61kIlSMCNrouFXA7921C5zL5rDifP/ee8WhqluYTGYiAlc8bZKKOIkZqTExUVx1tvN92kz7bBbo1ZxitvcLPa+tMNtSxtbzMi1/3GaupYbLJzr0PSrljOM90sIS4V0//UUKWGHN7SZQbGKoyErUU8V0iydOVNR7dmyPhKmPEb2Ej0cjoVTsfX8il48xJxhucDFncSNY33pxfvBJg1F3GbN11kg4Pw3Y3k9V+hK+SIYsT4a1gzFNBUi5lxFXGqLuMqepaplw+/gNcwmcGmhKGRAAAAABJRU5ErkJggg=="
			},
			{
				name: "Springer",
				url: "https://rd.springer.com/search?query=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAuElEQVQ4jbWRsQ2EMAxFMwjFzULHJvR0GeAaKL2GV4jEANmBiorqOipf5ejH+Dg46b5kRYLv5x8niKNl3SQSC6fs/a4UvOamG0pxyrKs231A24+H8xKg7cdi1ukKjcTngEhcjBobT72SC0ADmjA6pyxNN/gApHPKEoklElcAHYJLDRpdjXaJNrL9FjCaNnrTTwEK0RfAl7gMsCBPH3eAzfYaWN5eDgnuqgLs8ySv5+Nr7fP0J8AvegOhkGr6AYHSEgAAAABJRU5ErkJggg=="
			}
		],
		news: [
			{
				name: "谷歌中文",
				url: "https://news.google.com/search?q=%s&hl=zh-CN&gl=CN&ceid=CN:zh-Hans",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAERElEQVR4nO2WTWhcVRTHf/e++crko/kyX201jQitIOnGhcWqUBWLSGgRVNCVFqouXFQFa0XQXRRcWBpBURRBo9JWcZGWghhqbVOK1I8uLEksmKS2yTRt5iszc+9x8Wbmzbx5mca1OfB4vHvOPf//+bjnPliT/7uoesq7v9k3o6JOn1gBBAFE3HfpG+C6FZqR8krJRhSQK8z+8eSh9SthhOoRWLTZPklaRDxIEWFagIxlZF2KRzov09/4A/suPc3ocqSCZJGOVn31MOoS8Ms8ihsGDug0j982z2DLONgomFaeWfc3o1cG/ou7mxMoiDBt4VYD77Utsrt7HEwWpAEQsC24YQpbW39h7KtOpjbGGFrvgAY0dOu6Va5PYNpqRlqW2Nt7EgoLUGgE4lCufkkEbIT471e5f0a41tzCdE+M4YE4X0bzdQnU0JOLjw2xcG6U8GyUXN29NTwWTvejvu+CmHF1YsFaQloRijeTibf/5LS2j7cd/GR/IAGZGJwnfK3j6o3nQMxN0GsJ5JcUS0ciqGil3jWyOPRcOoLWYfJNzbO6oWGs/dPDzyoAObNRMDlAg55j18+p4PMpHqb4vyVoTco6C4weayIf2YYCxJortxw/060BMOnzKO2F5C/xKsBXmSRA0IBY+ytuyKC2LWzF2LwXRjGiygfvqQSvQvBFX0m4nFFRCNB14uxDZQKu5E+txFoAI7BcAGurwQVIG0gZ9502kCoIaQNWqEmqIFhjpkouysdQ3Zt4QE51SSn6kiwsw+ieGH2dHtc9IxlmkkJIw+UsTLweJ0iOTeR443iejoiXSRB0InGgZKOrdjgeWwESOXjqLqcKHODN3Q5zy6XuriMV5VRAQUCh6Dh38YuaDABQyP9FiP5SBj54IsKdm0K8+tF1TvwTptGBRB56ItARUYhAbxQ2v5UGwIigcMuFQJMDMe1xSRpoU9Xnq5qAXR5Ds7dksqXfVR+dDbO5EXYMaArWS93YpCVn4cOhMMbW9rtSiqWMcHDcnYY5Acd3vqsIqO3p5+VH7rHCoOvAXe9wwFh4aVesavPHb6cIA9sHwzXgJRER3h/Pg0DaQiHvNXttBgDyfA0ugflFQ2erw+m0sDOiUK8kQMAMt6G1IqagKwrq5UQRzY8OhBQPt0fKRzGZyZysCjqI9aPvpATg+HXL1IthNvREsRYmZwy3b3DQCs7/meW1bw2JHHz3QgMmYHIfPZXj898MjcXmfvdw09zgWar+D3TttuIQEeHBFsV9h5ZdQw13bHTBL0xm2PGZe1NlDXS1aXo7a5+BHk2m4PkNpznvxwrMwM7hZFUys8bt/qRxO7uveNmUjC6kBFsxBU1RuSmqaAp50/PE/qYavOD/AV8tY7oa1F/qLXHPb8UFGDyuV0Ogjr2r9xn4gfyXVD1/qyewghf/vbCi+Qr7AwkowogED1kJ+JCKhaASiIBSgf2+JmvCvyV4A+6kXQlFAAAAAElFTkSuQmCC"
			},
			{
				name: "百度新闻",
				url: "https://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E"
			},
			{
				name: "网易-百度",
				url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC"
			},
			{
				name: "网易-谷歌",
				url: "https://www.google.com.hk/search?q=site:news.163.com+%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC"
			},
			{
				name: "腾讯新闻",
				url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC50lEQVR4nG2TS2hcdRTGf/87c+/NHTOZR2ybtEoz7SILWyRqCmKCKeJrI2gJFRc2G4siRF0qglpRcaFFAoqgFkWxtkLdFNGWToSmEGo19EFN2hKSdGaatCb3ZmbuzH0eF7HoVA/84Cw+Pj4O31HcMtG0Nqu09p7otr2sJJ7noYnnsBA2mHnOuqWdc8OT4//WazcXmWZESsOipXf3OOkfqKVeJ6nnMRGuhy6mROzrfbb48I+7V/5jINOM0P35AcIZnMReku07MAwDy7L4dGA/XdY6phqLnKqcYnTrruye8VFpiS2NoyKLL0q0PCau64rn+xKGoURRJFEUyfTSZfli5pBs+35AXi2+ICfnf5HCd/1FAC26lJ0ldsE7TV2G0HUdPZnk3LzDiTmb7e8c4/ycwZ6tu/ig720aCYOJ0k8cHPx4CECJ85HgX4NgDr/zALquM7Wwyj1fnWlJufzyA2RSOldvlBn74316Owq8O3PwLQ2zF5q/QupBEokEAIcv2GCmWth/fBalFN25Ddzf/RgT1ybZnOp6Q8P9Hfwp0LeglALgy6UGtLW1MHZlFQClFI9u2slg4XF0CdFonoHIBu8sAEfOLVH2ANNqwU53rB0cQIS+7L3MezYazUlEAjD7iEV4cvt69nVpYJhgtP2NzvIzhTWDOCYW4Wp1AT8Ox7W6egRQuMsniKJorY2WSW/g8fRGg34zZlscsmB7BEFAve4SxzFeUCVWvEKF/MjipcuyYttSq9fF8zyJokjiOG7hz/GT0vz5uFSs9VK+8y554ujwP2Wq3L5xZfHrb8R2HKnVatJoNsX3fQmCQFZXq1L95DMpk18j0SnlZKdsPnJ3FkDdNCmTl/R7r8GmLrwLVzAG+uH0JI1jh5CwicqYqIyFMky8by/23YEz1WIAUNLzReOpLUMq047WkUbLZNGyObRsJ1p2He6Hh6kWf8sVcOxbv7hlSuTevH7foDijL8mNHUNSIleskOn5P+1fu3twDSB3ukoAAAAASUVORK5CYII="
			},
			{
				name: "凤凰新闻",
				url: "https://search.ifeng.com/sofeng/search.action?q=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACBAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAA0hJREFUeJxNk11MW3UAxX/39t/ellLAAgUyEBFwIAsOAkNkakxMNjcJ0S1u0ZGZGT+S+WD0wcQn49P0ZZJo0LkYI5i56RwjIzoS2ISEIAzHpxLsYBIKLR+Fln7cllv+PiDVk5zH80tOco7S5kACKOwos6qGrNrHWZ8aZysYIH3vo2hZ2cRWV1i98xuh+7P8X0r7vwCA0jNv4qyqYebCZxQ3n6Hw2EmC7hnWRoYwIhGEzUbYs8DspW+Jr/tRALEbzj/aREHTcQbeaObpy51YXTn0nTpOZHGB7PqD2HLz0FeXMcJhXPUH8f7aixEOQbsDecmVIr3Dg7KroUrOXb8qg54FeflBp+x5qVFu+rwyFoslHV5bldNffyl/KMmVbQ6kEA4HeYeOEl1ZQbFacT17mP4XD2PJzKLuq3YUITAM47/SVhsFJ04hTYKht19DZDxWTUZ1LRszf5J7pInArBvfQD/Vn36BISVS10noOsJuTzKi3iVyG18gr6sD1V5aBlYb24ZB6t5yVocGAcg4UI9/fJRbzz/DzSermDz3EYZhYGxtkUgkmO/4kYKXT6PaCovY2gyi5RciLRrxcAhtTwHbUnL/ynfkHGrEmrcHX18vK8ODBOfusa2qBOfuYcTjqNaCQvTlZVL3VaLabKSWV2DJzOLuu2cRaelszrrZ33IBQ9fx3x1hKxJh7c4Qluwcgn/NoMqEgf3hErZjMVKKikmrqCSz4SmCUxMsdl4l/9gJTCkpbM5MY9I0EnqU0KwbYbcTnv8b4fm+jf2t36B7lxBmMwBl731A8etnMWlWVE3D19O9s9KaOgKTYyhIZDxGZH4OdaW3G9+NDhyFDyGESNrmzMRityOEwN3aQnp5Bc59lSx2XSejtIzAxBjBiTFUgOlzH7J07QqqYWA2m5NWEwaj779D4I9JGi62ExgdIepZIL24BE/nT8Q31nemnIhEWPrlBv7fhxGONIQjjeiyD2//bUxmC8/1DGDSNG6/9Sq1n7TgvthKfGMdBVB23ygecFJ0shlbTi7xUAjFbCarupbs6hoWun9m6vPzlLxymqjPx+T5j9l9cBKwDUjA8UgZrgNPYHXloPvXWBsfRVEUXLV1+Kcm8PbdSoZR4B+hMGuvciFlvwAAAABJRU5ErkJggg=="
			},
			{
				name: "CNN",
				url: "https://edition.cnn.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF/ElEQVR4nI2XXWxURRTHf3Pv3W2loC2flggFET8KSRURo2h8MFFj+AokoAYffIIHHwwESRRfxAcxkVoSTMQnQsAYJaAPopbU2qqhCAJaTW1pawWjtNqy61J7d/fe48Pe2T17WdBJJmfuzNwz5/zPmZn/mPdBDOAAbiQ99W0iSdQ2qi1K6hpGMojJfDRmxx3Aswr1Arpao2y18+LFLky0kO63Y/b/UPV7ttOpUF3KkXCUjC+uFVfqM6pPO+Jp5YmonaA8FFbGDdBKoRzykBLkJuqzBqG+PavQKtde63YcCVt0DujixDzXxtp1QouAVW49TypENDIe5aGwxSq2nlvlJoaANsT2e9eLeyUEKiWjKOXxBa1RUA5/cRfoxdzIy4RCRCOjcyFuABRibrdbQOV8MWos0AhU2nLaMGvA9UJgvdRoWI9dhYaj/vvfCNgxbXA8BEHMOwuz9hwlhWgX2Kq9D1yXsQce4JIIbk0N9Pdzf38/f86aRV9TE9POn2fxwECZ171PPMGwMdzd2oqbzxMAeWPoe+wxvD/+YLy+Huerr5iZyZQOrjaQTpBvQE6DfOt58s/YmIiIDH39tZx9913pOXBAPluxQn565x0REbnY0SEiIicefVQmQDIg327fLn4mI0Pt7SIi8sX69XIBpMfzRETk+5YWERE5sHixdIK0g7SCOPpsDx2H7PPPU11bS8/hw/z28cekLl4k/ddf5EZGmLl8OUE2y+9vv83gkSMsbGnh99pafGOYtHQpQ4cOcXHfPgDu3b27PGFNKWv0mo6O6Yy2Nh5sbqZz2zbmP/44TS+8wPTZs0kPDmJ8n6obbuDv4WEa33wT47pMXbSIm/v7uUmkYNiZM9yzezentm6luq6O3jvvpCoI0CUebk8PNDzyCJcvXGDx5s1UTZ5M5y23sCCVot4mYjJJYAz58XHmrVrFL0ePMm/NGkaMIZtKYYBcOo1TU0PvwYM0vP46oxs2MBeuMsKW4qmaTyYB+GH/fuoWLOD4unUsTKWKO8AA6XS6kL1BgIgwPjTE9zt3Yk6eZO5DDxUSMgxZ8uqrOK7L/NWruW1wEBEpC4EupWPdKTTHR0cBqB4ZuWqyMQaMQYIAI8KCjc8SXrrE9KVLmdHYSGQBhCG3rl3L4LFPmFxfT5jLFfqvZ4Dj+wA0LFsGQN2WLVeTjMhzz/W4fP48E2OjNLW00LtvH4hAEOC6Lu3rNzDc3c3Y2XOcbW6GiQlQuaAPLqd4jotAkGf2svsY6+lh0Zo19E2bxpVEgpzjEBiDl0xiRDAI7qRJ9Lz2GsZ1yZw+zVh3d8HLIEC+bOfHl16m8bnnyPT24iYSSGSASPm96VmKFAIfNi5i3ZmznHnrLX76dYj7z52jauasEmsYv8LwwAAmDJlUV8c9+/fT2dfHg0c/onvnTggF8X3yNTUs6eygesoUlr+xi+6DB0lWVxcNCCmdmp5mMPN7ezn2zNM8eeg9fv7wA77b9QZVN07B9ycwGBzXJZ9KseyVV5BcnhBYeOIE7vRpzH3qKbr37KG6thZclxA419xM07YXGe7oBMfhdgRct5w7tIK0gXSAdIGcAvm0vl6Ob9okksmIXLkiks0Vai4v4vsy2nVC2hsaJA2SBml7+GHJDQ+L+FmRrC+DIBdABkCO3nWXiO+L+Fnp3LFDWo2RdpDjIJ+BmM9BPApbLUnhYEgWAGdgzhyq6meTqK4q3pZeIkGiq4uFmUzxig2AnjlzyK5ciZw6xR0nTxIAuWhscONGmDoVs3cvU4IAP+rPA+YYiL0JqygxImuIZkbX4wNx+q0NyF5DFnNA0yciaS20XEAzWn0daz4YqH91O4xVvb29QCnIUTr14vTpvzihdUQvmlPSOmSrnePZhTRh0BDHmfB/kVIbAs0HtdSGCrFz4FrKAirTck21tWJb80oGFSTWAE2VteJKsY4bAOUhiL8J4zmh5wng5WNKbcI5lAikRSDOBW1bo6ehzleQofoWol0Qhz0OLcqYa72M7Jx4KCqFRr8hi4QkfvM5sYn60RF/nMZ1xJ/lcei18f8CXzwtfnAJiVYAAAAASUVORK5CYII="
			},
			{
				name: "BBC",
				url: "https://www.bbc.co.uk/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAq0lEQVR4nO2USwrDMAwFn0vvZR1NvtnzydRN06iNf4FAoGg2NmIUy4oSIAiCILiZ5Pa26F/qPX4jJEESqjrMXPUAQFW7/qEDZoZSCkQEAD6r8095JOFXEfFuahaQ3mG/bxUw8/yhHdKzFd0Sa629xCUv54xSyvAZhxkA9jZt763HzJtdoFvAVZCEiHwN3mhoDYB5SNoWx/5ZnfJU1Uj23Pv/AwtOEARB8Oe8AEX8nWWaRvY7AAAAAElFTkSuQmCC"
			},
			{
				name: "Economis",
				url: "https://www.google.com/search?q=site:www.economist.com%20%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAALEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w=="
			},
			{
				name: "今日头条",
				url: "https://www.toutiao.com/search/?keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFN0lEQVR4nMWXTYhTVxTHf+/lJTHJzCTRDE61jiLFhWBBhJbSdiEoVHBTqFoFXVgoiNBNu9GN9mNTLbSF0lpKC1JcVK0iLkQobVEKghWsX6jggFO1MyVOzEsmMy8m79/FmZjJJFH7feBw3/2fc885755zv2CKJA1K+kzSTUl1/fNUl/SrpM8lLWI6SVolqfgvOO1GRUmrABxJg8BFoA/A933i8ThhGBKGIY7j4LoujuMA4HkelUqFyclJOlFfXx+Tk5NUq9U2WSqVIplMNro+sMwDdjScA7iuSxAERCIRwjDEdV1qtRqu6yIJ13WJxWK4rtsxgEgkQjwex/O8Nlk0Gm2JFdjhAWuno6VSiVqtBvDgr6fShOM45HI5KpUKlUqlYwC5XI5yudxxhtLp9MwgXvKAedORarVKNpulVqtRKBQeBJLNZhkbG0MSqVSKeDzeMYBoNEpPTw+JRKJNFovFQIJqFYpFuHfvSQ9om8tSqUQYhsRiMYIgIJPJkMlkKI+PQxBQGR1lYmQEfB98H9f3cUsl3FKJmEQ9n6deKDzAGhwpl21Mc3Y8R4cPi2KRBvu3b0OxiFsuk6pWqebzRMfHcX0fFYsQBDgzI/4b5Aj0D9rrTIkEDAzA8DDU6y2i9lLtRp4H/f2QTMKNG62ylSvhiy/g2DHL8RNPGA8MWJtOg+PAnDkwNtY6VjaklZ9/Xlq3Tlq5som99ZZtIT/91Krb3y/dvm2yUkm6elX67jtp/37po4+ku3dNNjQkJRJtvjoHsH27DQoC6YUXDNu507Dvv2/VfeMN6auvpN27pYULpWjU8Geeka5dszH790t9fe1+ugYA0r590vXr0pEjUiwmvfuuGTtxolXPcaQNG6TLl00+Oip9841Urdrfr1/f2f5DA0gkpAULpHS6ie3ZYw6OHetsLBKRDhxo3fF//93SsGJF1wDa91PPg2+/tYo9fdoKCGDWLGuDoL1AX3wRzpyBTZvgyhXYsgXefhtGRmDtWvjkE9izBwYH2921IbUarF8Pp07B009bdW/YAI2db+Yhs2yZ8d69MDpqq+Sdd2BoCDZvhlyuyUuX2o89chWAFVNPj6Vi+XLLvSSdOSPt2mUpcRzpvfdMdvasVfr4ePdDePXqNj+tM9DTAz/+2Iw4mbT1O52efdb4wAEz8dRTttEMD8P58zB/PqxZAxcuwJdfwnPP2fa7cyfcvduevpaIZs+WLl2SfvhBOnRI+vRT6ejR5h8EgbVvvimlUs1x778vFQrSq69Kr71mOidPms7Nm9bfuvVPLkOQBgak4WEz8PXX0rZt9v3bb1IuZzrz5kkTE9KdO5a2Dz4wnb17Tf7yy9bP523TemgA8+dL585ZLsfGpFrNBp89K82aJbmu9PPPhh0+bGM+/ND6u3dLmYx06pR0/Lg0d27T7saN0iuvWD3NCKD1MFq8GA4ehHv3jAsFaz/+GG7dMp3BQVi0yPJ68SJkMjAxAV0uKI+i/+Y0fAg9/mn4uOQ4hIkEYTKJGu3UdzSdxuvrg1TKVlgyGXosWWLAdE4m27FpeAnMSSKBkklrp5xl5s6lMjlJ0OFO2Nvbi5dKTYdCj2vXWpR83+94pX7kjwMRwHFdIq7b8Vbc6SbtASHT7oXRaLTrlftxyHXdrjYikchMKPSAO8CTDaRcLjMxMfGXA+jv7+9qI5vN2s24SSOOpM+B1xvI/fv3CcPwLwcQjUap1+sdbXieN3MW9jmyh+IvTL2O8vn8vzYDmUyG3t7eRtcHlgH/7+P0AUlaJHs6/6r/8Hn+B0w7zXRC+ZfTAAAAAElFTkSuQmCC"
			}
		],
		mine: [
			{
				name: "MDN",
				url: "https://developer.mozilla.org/zh-CN/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAABi0lEQVR4nJ2VsU4CQRRFzy66GCtLrWysjMbEyi+wNFHBmGDpH1jYWJtAq5WxpoFEorXxB6xs1CBBI4WJVhpNoPBayMAuuzOw3FcwvMe5eTOzy0OYIGCHMk3ayBJf3FMmTxCieotN6lZwMOpsRQzIUBwZNlEk0zdIjwtR7BqQGwsXIicg4HVsgxYBFGzlGS1pepjFHlSSCiUZ/ehQS9rVerJB1eOZeUKapINNXjz14jMbzdhxWImn5oi2dCa3FuObCH85HoJL0o3mIgYeMt0o3qBVbaZ659LlfpOOyCHza5/ewsPjKJXJv0L7ORjhDIwSDnGi+/kxAv6QfAsIvY+At5SxGSxbkEshtKqanpS1PwcmGgN4xfE6hZ4DowXqlitLkh9PlVJe42e8rYvIBr4dG6ANj0mF/ZBBw2Xw7HOX1NY5Hlfd9b2r/1ufmq22gcc18OYyqA39U53Smr3aIosg7zJwRt4MltJYeEn0R9tJavw0NNqEYDvVcM31uH6WgAJVmnSsYIcmVQrh8f4HufpcPqh3SFcAAAAASUVORK5CYII="
			},
			{
				name: "Can I Use",
				url: "https://caniuse.com/#search=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAADAFBMVEXRa1hIvVUBriaErG7//vzQx7e116nq4M2Dy4FmYktwx3Tt48/y6NQXsTH+7uK2fGBhwmhoxW7Wg3HEMxe8EAD78Nqn0plRvluZ0ZLKQizNs6qupZZ0zX/9/+3669vM5cUxt0QlszpQqV6HhoPP3L1YwWKYooEQujB9ynxWUTgly0Tp38yhlIhAkEAldSRdOC706tbw5dL/8ezInXD169iK1JO7u6n+9ODAJQSY2J+Wrc+z4bLluKpnkcWbyYz/++CMzYcAqQz25dd90Yn90/ll020qwEPk28j5/OjhueEstkDfoo7k2NP+68n/5+CmSj3i2MX85dI6ukzx+ufhqp7+8/r39er29uP77NU0kjgvvEQ4LBc8nEFOzVqQvY0evzvN+f/m+drt8uHpxbnb5s7s7dpwomfb0cA3p0Ti7tfB473n3bzc7dDe3szr//9SZH0Avij37tng1ssttT7dk4Xf4t6U4ZOm3Kh81ntaelrv6Os/WC6I3Ik+iDvuzr/z2M6AgICBgYGCgoKDg4OEhISFhYWGhoaHh4eIiIiJiYmKioqLi4uMjIyNjY2Ojo6Pj4+QkJCRkZGSkpKTk5OUlJSVlZWWlpaXl5eYmJiZmZmampqbm5ucnJydnZ2enp6fn5+goKChoaGioqKjo6OkpKSlpaWmpqanp6eoqKipqamqqqqrq6usrKytra2urq6vr6+wsLCxsbGysrKzs7O0tLS1tbW2tra3t7e4uLi5ubm6urq7u7u8vLy9vb2+vr6/v7/AwMDBwcHCwsLDw8PExMTFxcXGxsbHx8fIyMjJycnKysrLy8vMzMzNzc3Ozs7Pz8/Q0NDR0dHS0tLT09PU1NTV1dXW1tbX19fY2NjZ2dna2trb29vc3Nzd3d3e3t7f39/g4ODh4eHi4uLj4+Pk5OTl5eXm5ubn5+fo6Ojp6enq6urr6+vs7Ozt7e3u7u7v7+/w8PDx8fHy8vLz8/P09PT19fX29vb39/f4+Pj5+fn6+vr7+/v8/Pz9/f3+/v7////XnzsNAAAAmklEQVR4nF3KQQuCMADF8U2EQT1hklJCQSIhbIdCCtepRodgpxB26eKxj+ChL99mhOm7/OHHI8AdD+AFeZzXRXEhTLKKSuZyYD49xFM4T+E0hpttprAeQ2x5YAZYJEsb6KgHHweN3f6DSnL/iLTa/B5lWOq21SpMdZum5Cn4nguTi+ydCWMEAVZVR/mOAqAd8AWgBz8H12qGYR9XXh8E2WsxgQAAAABJRU5ErkJggg=="
			},
			{
				name: "GitHub",
				url: "https://github.com/search?utf8=✓&q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADLElEQVR4nM1Xz2sTQRT+dpNScqhJW7ZJ9mx706RJ0/SHbRHR/8Cz9ORBBBEUEfwjBJVePHhQFPUiIi09SNqkSbtJU70p6dH+IOChQmpNss9Ddqezu7NJmgT0LQPZN/O+75s3bzI7wD826QxjPURUawtUktrGbWfggK7rR3bnxWjc8v51p+AIlGVZBkAdC9B1nQXbCZuZXYwsy648bh1yvV6vA8D9Bw+xvLLSNrlFSPFUiMfjEXKJnJ5arVYDgMj4REfEdvtSzAMAvF6vg8/hqFWrBACRWKIn5EzEttYQ0ddn4bS8VE3yHs3cIaKYR6VSOfD7/WHTJ3P9YSJykCuKgp1tDTvGDNoxt/FEBJ/PF+J9LAMnJycEAFFb6s9CbDc7Fo/X398vAYDX8A+ACJH4pBOFmm7jpiaMtOHJAPD7+PiIiBqdthaJJUBEHbVmeKqqjjEBLMhQzbdifrNjAcX8phCTiLBbKn1jS0BEGJ9IOrJlkndlgngeUwbQ11AsylhnM+fbtpZzxTUF+BrpFzw9ECDCXrhyjQlgSyAq2a7TDyC1tu7AHvT7LQKO+ZT0WsCdu/ccvvdvX1uWoEq6LlyC8cQUSNe7a6LH6DMFgIhQyGUE+6W7QoxNzjTFtAhwK8RYcqYj8pu3botnbxR3YGjoPBMwODx8jhWi0fLZNPsdT84inpxti/jxk2eIJ2ehaQXh7PPZtDn7XYA7jH6WywQA8alLrFgKuTSm5y7jT7VqKaJCLi0sOD7WzczYIUWRWAYMh0oAVpc/WgA31j87QIR/ry2pgXwuDeLIgdPTEAD2iQgBbo8CjfrQsutWAS7bs9m2fffmJYgINxYXr/N+xydZ+fCQACAxPcd8dgFuxsfYzcRQgkH3TzLDPOWDgxoATMzMOzpfvXiOsdFRIYlo/OqnDxgMBBrkoZCDT7Y7ANSVUMhDRNAyKWiZlOUk+bG377oD7KeOlkmxJRWRuwkAAH0kHJbM4traWMPWxhoAYGF+rmURmuMJwNOlpUcj4fCZLya8DRzu7TmuZu1YUFVbXs3cMsDbr6CqSkFV9X4vlbJuszfbhWj0qjFeakX+X9hfKwNpwLLdyLQAAAAASUVORK5CYII="
			},
			{
				name: "w3c",
				url: "https://www.runoob.com/?s=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACHklEQVR4nIWTX0jTURTHP+fu59xUCJLGCgp0IIPSIvLPg9JTvZq+RBj5WJGySWVPKSH0ZCSWD/ZiFAQVqQUVBulbaQT2IkVEUhISPrTptE23e3pYm26t+sLlHrjnfL/3fM+9Qh4Gp5ubVOSmqlSLIACqGkUY8bp83acP3drYmi+ZYGSq3RP1RudFxJ9PmgOVU6GG0bs5BCNT7Z7lkuUVwPlncZaEi6GGsf4swcD0sUW14p954S6cryAoKoJ/j6VybxLEHAzVPZp1Bl63HBHB//2bYe6N2dLUJhqD68xKgANflpj7GCewL4m1qQnAJwPTLZ9ECJS7K2ja3gFogRuneRX4mYowsdSHIKRc7HJECAAYceEu2rRARECV6Ooa28pKUU0Tp0xRNseVpNXkqxljeDz5ig/zC0RiqywsLnGhf5jYWryQO00mv/j4+T6qqyoJVuzm3tNJaqoquN59ls6rN3j/+WtuubDgqJIQoRjAWsv9a5eZmnmHqiWyHAOgd+gOw71duIsc1lKRTUExE0aE51tZrbUcrq1h545yzp1oJmUtPWfacvzJoLN29KWzXhw76U6UxRJ2BSOu7GGZtyQnOTNdVft757YImn5IMy1XBHoKjfAP29JbPFw/7gUwAOH6sV5Fh9I6/1vEExvWl/UhE4TrxzvUchRl9a/qyoMfdftLLzU+WclvLQeDb1uDNqltiAZREgIPPY7vWf5XBvgFMS/Jw/yUPqwAAAAASUVORK5CYII="
			},
			{
				name: "GreasyFork",
				url: "https://greasyfork.org/scripts?q=%s&utf8=✓",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII="
			},
			{
				name: "人生05电影",
				url: "https://www.rs05.com/search.php?s=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACBAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAkhJREFUeJytk19IU2EYxp9z5s40ZzSRkWOQJIog0dzmH2aECFEIhiSCoN2oECJYYUI3QjqlQdqdF6bYRcwLUQhRxBBkXgQqKaKRjWFYMmnmyMN2FMzv6SI9FnXRvwe+m4f3+/G+L88rCSGIf1ACAEiS9NcA+VfmdjiMT1tbv0cQQpAkhRD8sL7OOxUVdAB0JyXx3doajxVaWWG1w8Eal4s1Lhdr3W7OTU9TB7ycmmKJ1UonwFKrlbfLy+ltbCRJxlWVFTk5zAPoPHqXLRZGIxEmAMBGMIj2hgbg8BCdfj8uejzY0zT0d3VhX9Nwt6oKqenpuNfTA0mWQQDnsrNxJi0NeLO4yCs2GwtMJr4KBPSWnw8O0tvUxIVAgBcMBo729fFxayuf+nyMqapeh/b6ejolif2dnbqpRqMssdk47vdzZmyMTlnWW88D2FJZeQK4npnJktRURiMR3ez3+VhgNvN9KMTPOzt82NzMF8PD/Li5ydDqKmuKini8O+QbjXzW3a1/nh0fZ57RyJ6WFr3oWEII9ra1sbaw8ARwKSWFb5eW+OXggKMDAyw2m3nT4+GepnF2YoJPOjoYU1W+np/n/epquo1G9nm9OlS6VVrKpORkaLEYFmZmcDYjA72Tk1ASE3EjNxfns7KgxePYDIUgGQwoLivDo5ERKIryLUjB5WVes9vpkmU+qKvjdjhMktwIBpmvKPryrtrtnBwa4r6m/TCWdDQL9jUNp8zm7xOKlbk5xHd3cdpiQbbDAcVk+inJkhCC//2Y/kRfASoRrtb2v2kbAAAAAElFTkSuQmCC"
			},
			{
				name: "射手网(伪)",
				url: "https://assrt.net/sub/?searchword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVR4nF2TQUxTdxzHv7//e319pH3QEi3MAYMpqWZj1c1lESIz0WwLXmZl7CAXjCYzuyCJJPVgPAy8zZglEuRA5sLJiIlm4ExmQtDilmVgQrDCsq2WuRRKoX20tO+9//vtglni9/z5fk7fLzEzXs+T8+f3rTx6VItSSV2fn4/qVVVjX25szACQ3xLt72Oee8XS64LfYrHe9bm5Do/P50mOjxvEHJZESx8MDKzv6O5mZ3bWHz9z5s8t0/wOzDPqq+JPx49/nJqY+CIYDkcPj46+wa6L5N27YNuGZD5gmyZ21dcjnUxCWtZHKJU+8er6VQEAP9TUtIZ7esbbR0a+lqZZLUslu6atzYlcvCgl4BLgCE2zXdd1lm7edMxcziKgOhCJfKMCQGFlJZpfWqp+LxYrldfXPc9u3IC+cyf9Oz0tBOBKQAURCyEgVBXBhgbFSqcdaVlCAAAB+7Nzcy67rvJWZyftO3eOVuNxpB4+ZAmQBFitqCAA3NLfT9GFBT4wOEiObbvqtmCjnMkQiLA0PMyKYUDVdaH7fNTU2cl1HR1Ue/Qou8xkNDZybnGRVuNx8vr9qjpFFCDAkYUC2ZubqNq7l6x8nkPt7fjs0CGEWlsZAJVzOSKAnw0N0e+XLrnlTEbUHjy4JjKVlbUuUOEyO7JUonI2i2AkQm6xiF/6+vDjkSN0a88e/DE6CiJCenqazUzGNUIhrj12bEj8VSjU6Iax693+flfRNKpsbqZQa6v458EDyHIZgXCYpGWBpQQAaJWVEIAiNG3r/StXBgRL+XbTiRM+f1OT/WtvL3kMg8vZLDd2deHT+/fRNjzMkQsXgO3BqYbBBJAsFh1zcdFW5xXlxZuTkykzkZAfXrv2TiGV4uWJCTR2dWFhbIzTjx9TLpFAJBYDtjUMsDcUyq/OzEB87zg/b62urjWfPbubhHCmTp8mUhTKJRLs5PMkPB6spdNgAMxMiqa5BEAJBmdnL1+WKgDYwJ2ng4OfF1MpKR2HG6JRpfjyJf6+d889PDJCu0+domBLC4iINb9fAlB9qhooAxAA8BXzLW8gcMeoq9MVXdde3L6tFJJJJZ9MiumeHlJ9PgQjEUjLEuVs1uvRdeuppl3VAoH/37g8OVllZbP9ievXA8l43OvXtJDrOHV6MLiDdL2+8eRJ2KYZ31xeTnoDgalCd/dw3fPn4j+2Ya+YXX1PBgAAAABJRU5ErkJggg=="
			},
			{
				name: "游戏-3dm",
				url: "https//so.3dmgame.com/?type=4&keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAALAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAtJJREFUeJydU0tIVGEU/v57r3dmdJzG0a6T6UyaM6GZYkJhBRZE9EJcCEVpVIuIyGhRi6hNBC5bBBJRqxgiopoWlVZoVvQgUsuaIZPyNabzuukd5zre199CMaMk6IPDgXP4vvNxDgdYBKET/GKt30D+Vrx8alu5JCn5Jl4Mfg9zwpoyy7j2JjV8qLXr3wLnfV4UBB2bSyqXt7gKM0vtdjMkSUU0nOzu7Qqfbjj3tGNRgRgFHl3YsnPL7iK/IJh4EIBQAkoMEINC/KFrT+8N7Nmf77yrHvb9KXC7qdxaVlfe7/EucRJQTM9oYBiCkYEEXEWZmJY1RKOK+OROYFVZrTDR91At4n7zn2evdzgtzgedI1BUQJI0yLKKowe8aO2IYGhEQoaVOIrLlx1LDbPipu2OSvK5dS9vzx5XfIEhVGulfq+k14VjMzDVuBAKxUAjERjTMsCxYCzpyF2aA9PzyLh130p71MB1LqkzXSSRb1ufln0rN8+01ZyYgduVicl0DY6cJdCyV0FTOBAiw2KKw11iQzzP6szyZmGsW4xwUJRXxZXOI6mUcsq92g4GAAWFyVyBZenrAMLO75tSBUbyLXjpLQwdCA2IPczHz+GW4cGplKdklgwQUL4YbMYGEMKBAQEDgAEFQ9LAWjdCT3Ojv18KMkZOGxPrSxpiVJbkpA5Np0ilVMCyBoQuPBEBQEDmMjWvfRVIjFUNVbfJJD4R53wndzmFwoymAo/tIM9DqNpxBoQxzRF+wQCgGxSBZ88bK3c2+QCAybJlofHivXFLw46zr9vHaghLBg2qzk4C5sMAoGoaPrx8eTN4tfnGvDdKKQcAycQM7sff4X3zJVt1he3KikJPvUVwgbAsdINO/fgaYEY7/Wb7asG99Xh7aKEAAwC6rmM0JqJv8hp6H6s297cXtZMOjyhDmKAZrGymiplXk+kjSfZLz6evMb/fL//xWf+Dnxs2M3yo2q6nAAAAAElFTkSuQmCC"
			},
			{
				name: "搜狗表情",
				url: "https://pic.sogou.com/pic/emo/searchList.jsp?statref=home_form&keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADiAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAqlJREFUeJxtk0+IVXUUxz/n/O67772rjdH1NVpRoeVo1sZavnI0S0vFhaOBpC4S/0AuCqE0aNGi3IS4kEkEF+EiyoVhxIyKNsxYGxERFEVI5w/WKE/GAe/YvHfPadEdkaGzPH8+fM/he4RpkdXTOvARwjKgvUiP4pwDjiYDjf7H++WxwVlAN0on0A2cBAaL8gvAWmAXRh+wMxlo3H8EyOrpk8BZlOsIO5K+xvh0ZQDZ0rQN5zBGB7A8GWiMTQF+RGkhbCbIAlHZRJBXUUkEHrj7EMZFz+00ud/BOIYRkoHGRsnqaSfKMYRXUFktQb6npJFECkEeAkbuVVom3jTz3L/C/ADOVYwPFdgGfJf0NcZFZQcljSQOSCX0SFmfkVjnEOsiIt1OpKckyMxixW5gmyJ0FgeDSP6USJFYkUp4W2fEB7UtfkOfiG9WTv51pNoz+h6Rflac5BeETgVqOMMABN1DkOMS1KSkJamGzVIOZyXIrclNz3/zz/pna9WeUSsAw0BNAQcUoPrr3/cqJ25vcPx14BDOMA64z8X43HO/NvF++/ICoIArMITQATDxTm3rxKr22eUfhi+Vjt782LLmfHvQXOmTdt1zg9yfouX7C8BCYDDC6UXYAJz33D+RwKGHa+YcJ2ivjU/eEJExYMRb1uFNg9ynVujCOSVZPV2M0I+wBGWdBN1NSedLJKCFUc3xlkPTRt28C/MRnIsYb04Z6WuUFQjvJn2NsWxFbbEEWYLIc0Ab7uOYX8E5XT1zdyJbmu7HsKS/sS8q5HyJMQ/lt+ytdEty5u5l4Mr/2RlA4jDkLfvj0S8UKhT4FGEvwu/Azzg3/pvgZeAlKYdvw9OVL7xpH9j9ybXV3jsXZDo9q6c1YCOwDOHFIn0LOIfyms6KUymHPeWfRgYB/gUGFwYmsuO+WAAAAABJRU5ErkJggg=="
			}
		]
	};
	var webRules = [
		{
			name: "google网页搜索",
			enabled: true,
			url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
			engineList: "web",
			class: "s6JM6d",
			wrapperClass: "YNk70c",
			fixedTop: 56,
			style: `
      z-index: 100;
      margin-top:15px;
      margin-bottom:5px;
      grid-column: 2 / -2;
    `,
			insertIntoDoc: {
				target: "css;#appbar",
				keyword: "css;[name=q]",
				where: "beforeBegin"
			},
			stylish: "#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset} #sej-container-wrapper{display:grid !important}"
		},
		{
			name: "google-hash-query",
			enabled: true,
			url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^#]*#(?:&?q=|.+?&q=).+/,
			engineList: "web",
			style: `
      left: 142px;
      z-index: 100;
      margin-top:5px;
    `,
			insertIntoDoc: {
				target: "css;#appbar",
				keyword: function() {
					var input = document.getElementById("lst-ib");
					if (input) return input.value;
				},
				where: "beforeBegin"
			},
			stylish: "body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}"
		},
		{
			name: "百度网页搜索",
			url: /^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,
			enabled: true,
			engineList: "web",
			fixedTop: 80,
			fixedTop2: 88,
			fixedTopTarget: "css;#wrapper_wrapper",
			fixedTopWhere: "beforeBegin",
			style: `
      margin-top:8px;
      z-index: 101;
      margin: 0 var(--container-left-gap);
    `,
			insertIntoDoc: {
				keyword: "css;input#kw",
				target: "css;#wrapper_wrapper",
				where: "afterBegin"
			},
			stylish: `.headBlock,.se_common_hint{
        display:none !important
      }
      #wrapper>.result-molecule{
        z-index:300 !important
      }
      `
		},
		{
			name: "必应网页搜索",
			url: /^https?:\/\/[^.]*\.bing\.com\/search/,
			enabled: true,
			fixedTop: 60,
			engineList: "web",
			style: `
      margin-top: 1em;
      left: 160px;
      top: 0.5em;
    `,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_content",
				where: "beforeBegin"
			}
		},
		{
			name: "DDG",
			url: /^https?:\/\/duckduckgo\.com\/*/i,
			enabled: true,
			engineList: "web",
			style: `
    margin-top:5px;
    margin-left: var(--gutter-xl);
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"q\"]",
				target: "css;.results--main",
				where: "beforeBegin"
			}
		},
		{
			name: "360",
			url: /^https?:\/\/www\.so\.com\/s\?/,
			enabled: true,
			engineList: "web",
			fixedTop: 50,
			style: "margin: 1em 0 0 135px;position:sticky;top:55px;z-index:3001;",
			insertIntoDoc: {
				keyword: "//input[@name='q']",
				target: "css;#tabs-wrap",
				where: "afterEnd"
			}
		},
		{
			name: "雅虎网页搜索",
			url: /^https?:\/\/search\.yahoo\.com\/search/i,
			engineList: "web",
			enabled: true,
			fixedTop: 72,
			style: `z-index:11;`,
			insertIntoDoc: {
				keyword: "css;#yschsp",
				target: "css;#horizontal-bar",
				where: "afterBegin"
			}
		},
		{
			name: "雅虎日本网页搜索",
			url: /^https?:\/\/search\.yahoo\.co\.jp\/search/i,
			engineList: "web",
			enabled: true,
			style: `
      left:0px;
      width:1050px;
      display:flex;
      -webkit-box-orient: vertical;
      -webkit-box-direction: normal;
      margin: auto;
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"p\"]",
				target: "css;.Header__inner",
				where: "afterEnd"
			}
		},
		{
			name: "台湾雅虎网页搜索",
			url: /^https?:\/\/tw\.search\.yahoo\.com\/search/i,
			engineList: "web",
			enabled: true,
			fixedTop: 52,
			style: `
      left:-10px;
      margin-bottom:10px;
    `,
			insertIntoDoc: {
				keyword: "css;#yschsp",
				target: "css;#results",
				where: "afterBegin"
			}
		},
		{
			name: "searx",
			url: /^https?:\/\/searx\.me\/\?q/i,
			engineList: "web",
			enabled: true,
			style: `
      left:-10px;
      margin-bottom:10px;
    `,
			insertIntoDoc: {
				keyword: "css;#q",
				target: "css;#categories",
				where: "beforeBegin"
			}
		},
		{
			name: "搜狗",
			url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
			enabled: true,
			engineList: "web",
			fixedTop: 60,
			style: `
      top:-46px;
      z-index:99;
      left:-5px;
    `,
			insertIntoDoc: {
				keyword: "css;#upquery",
				target: "css;#wrapper",
				where: "afterBegin"
			},
			stylish: "#float_uphint{display:none;}"
		},
		{
			name: "yandex",
			url: /^https?:\/\/yandex\.(?:com|ru)\/search/i,
			engineList: "web",
			enabled: true,
			fixedTop: 96,
			class: "main__center",
			style: `
    margin:1em 0;
    `,
			insertIntoDoc: {
				keyword: "css;.input__control",
				target: "css;.main__center",
				where: "afterBegin"
			},
			stylish: ".main .main__center{padding-top:0px}"
		},
		{
			name: "google网页分类搜索",
			enabled: true,
			url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?:tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$/,
			engineList: "web",
			style: `
      left: 142px;
      z-index: 100;
      margin-top:5px;
    `,
			insertIntoDoc: {
				target: "css;#appbar",
				keyword: "//input[@name=\"q\"]",
				where: "beforeBegin"
			},
			stylish: "body.vasq #hdtbMenus.hdtb-td-o{top:100px !important}"
		},
		{
			name: "startpage",
			enabled: true,
			url: /^https?:\/\/(www\.)?startpage\.com\/[a-zA-Z]{2,3}\/search/,
			engineList: "web",
			fixedTop: 103,
			style: `
    z-index: 100;
    `,
			insertIntoDoc: {
				target: "css;.layout-web__mainline",
				keyword: "//input[@name=\"query\"]",
				where: "afterBegin"
			}
		},
		{
			name: "infinitynewtab",
			enabled: true,
			url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/i,
			engineList: "web",
			style: `
      z-index: 100;
      margin-top: 20px;
    `,
			insertIntoDoc: {
				target: "css;.search-types",
				keyword: "//input[@name=\"search\"]",
				where: "afterBegin"
			}
		},
		{
			name: "ecosia",
			enabled: true,
			url: /^https?:\/\/www\.ecosia\.org\/search\?/i,
			engineList: "web",
			style: `
      left: -10px;
      margin-top: -20px;
      z-index:1;
      background-color:#fff;
    `,
			insertIntoDoc: {
				target: "css;.mainline",
				keyword: "//input[@name=\"q\"]",
				where: "afterBegin"
			}
		},
		{
			name: "f搜",
			enabled: true,
			url: /^https?:\/\/fsoufsou\.com\/search/,
			engineList: "web",
			fixedTop: 111,
			style: `
      left: 50px;
      z-index: -99999;
      margin-top:5px;
    `,
			insertIntoDoc: {
				target: "css;.input-with-suggestion",
				keyword: function() {
					var input = document.getElementById("search-input");
					if (input) return input.value;
				},
				where: "beforeEnd"
			},
			stylish: ".tabs-bottom-border{transform: translate(0, 32px); !important}"
		},
		{
			name: "brave",
			enabled: true,
			url: /^https?:\/\/search\.brave\.com\/search\?/i,
			engineList: "web",
			style: `
      top: 8px;
      left: 178px;
    `,
			insertIntoDoc: {
				target: "css;#filters-wrapper",
				keyword: "//*[@id=\"searchbox\"]",
				where: "beforeBegin"
			}
		},
		{
			name: "neeva",
			enabled: true,
			url: /^https?:\/\/neeva\.com\/search\?/i,
			engineList: "web",
			fixedTop: 80,
			style: `
      z-index:1;
    `,
			insertIntoDoc: {
				target: "css;#search header",
				keyword: "//input[@name=\"q\"]",
				where: "afterEnd"
			}
		},
		{
			name: "infinitynewtab",
			enabled: true,
			url: /^https?:\/\/google\.infinitynewtab\.com\/\?q/,
			engineList: "web",
			style: `
      text-align:center;
      position:fixed;
      z-index:99999;
      top:0;
    `,
			insertIntoDoc: {
				target: "css;.searchbox-results",
				keyword: "css;input.gsc-input",
				where: "beforeBegin"
			}
		},
		{
			name: "头条搜索",
			url: /^https?:\/\/so\.toutiao\.com\/search/,
			engineList: "web",
			enabled: true,
			fixedTop: 75,
			style: `
      left:146px;
      z-index:99999;
    `,
			insertIntoDoc: {
				target: "css;.result-content",
				keyword: "//input[@type=\"search\"]",
				where: "beforeEnd"
			}
		},
		{
			name: "抖音搜索",
			url: /^https?:\/\/www\.douyin\.com\/search/,
			engineList: "web",
			enabled: true,
			fixedTop: 192,
			fixedTopColor: "rgb(22,23,34)",
			style: `
      margin:-10px 0 0 -6px;
      z-index:99999;
      margin-top:8px;
    `,
			insertIntoDoc: {
				target: "css;.CHUUyANc",
				keyword: function() {
					var input = document.querySelector("input[type=\"text\"]");
					if (input) return input.value;
				},
				where: "beforeEnd"
			},
			stylish: `
      .J122YuOM{
        padding-top:14px
      }
      .IFYTLgyk.FMy9BImq {
        margin-top: 170px;
      }
      body {
        --font-color-qxin: #bdc1bc;
        --background-color-qxin: #202124f0;
        --background-avtive-color-qxin: #424242;
        --background-active-enable-qxin: #274144;
        --background-active-disable-qxin: #583535;
        --background-hover-color-qxin: #424242;
        --trigger-shown-qxin: #424242 !important;
        --background-btn-qxin: #292f36;
        --background-setting-qxin: #202124;
        --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);
        --border-color-sej: #3b4547;
      }
    `
		}
	];
	var knowledgeRules = [
		{
			name: "百度百科词条",
			url: /^https?:\/\/baike\.baidu\.com\/item/,
			engineList: "knowledge",
			fixedTop: 65,
			enabled: true,
			style: `
      text-align: center;
      background: #fff;
      margin: auto;
      width: 100% !important;
      position: sticky;
      top: 66px;
      z-index: 1001;
      border-top-right-radius: 0;
      border-top-left-radius: 0;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;.navbar-wrapper",
				where: "beforeBegin"
			}
		},
		{
			name: "百度百科搜索",
			url: /^https?:\/\/baike\.baidu\.com\/search/,
			engineList: "knowledge",
			enabled: true,
			fixedTop: 56,
			style: `
      padding-left: 120px;
      margin: 5px 0 -10px 0px;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;.header-wrapper",
				where: "afterEnd"
			}
		},
		{
			name: "百度文库",
			url: /^https?:\/\/wenku\.baidu\.com\/search/i,
			engineList: "knowledge",
			enabled: true,
			fixedTop: 104,
			style: `
      top:20px;
      margin-bottom:25px;
      left:145px;
      z-index:202;
    `,
			insertIntoDoc: {
				keyword: "css;#kw",
				target: "css;#app > div.base-layout-content",
				where: "afterBegin"
			}
		},
		{
			name: "百度知道",
			url: /^https?:\/\/zhidao\.baidu\.com\/search/i,
			engineList: "knowledge",
			enabled: true,
			style: `
      border-top: 1px solid #e5e5e5;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 1px;
      left:112px;
    `,
			insertIntoDoc: {
				keyword: "css;#kw",
				target: "css;#header",
				where: "afterEnd"
			}
		},
		{
			name: "维基百科",
			selectSearchPriority: true,
			url: /^https?:\/\/\D{2,5}\.wikipedia\.org\/wiki/i,
			engineList: "knowledge",
			enabled: true,
			style: `
      position: fixed;
      margin: 0.1em auto;
      left: 0;
      right: 0;
    `,
			insertIntoDoc: {
				keyword: function() {
					var url = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
					return decodeURIComponent(url);
				},
				target: "css;#mw-head",
				where: "afterBegin"
			}
		},
		{
			name: "萌娘百科",
			url: /^https?:\/\/.*\.?moegirl\.org\.cn/i,
			engineList: "knowledge",
			enabled: true,
			fixedTop: 52,
			style: `
      margin: -0.8em auto 0;
      z-index: 3;
      width: 1200px !important;
      top: 12px;
    `,
			insertIntoDoc: {
				keyword: "css;#firstHeading",
				target: "css;#moe-topbanner-container",
				where: "afterEnd"
			}
		},
		{
			name: "知乎",
			url: /^https?:\/\/www\.zhihu\.com\/search\?/i,
			engineList: "knowledge",
			enabled: true,
			fixedTop: 52,
			style: `
      margin: 10px auto 0px;
      width:1000px !important;
      z-index:19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);  
    `,
			style_ZhihuChenglinz: `
      margin: 10px auto 0px;
      width:654px;
      z-index:19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);  
    `,
			insertIntoDoc: {
				keyword: "css;.Input",
				target: "css;.Search-container",
				where: "beforeBegin"
			},
			stylish: ".TopSearch.Card{margin:30px auto;}"
		},
		{
			name: "互动百科搜索页",
			url: /^https?:\/\/so\.baike\.com\/doc/i,
			engineList: "knowledge",
			enabled: true,
			style: `
      border-top: 1px solid #e5e5e5;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 1px;
    `,
			insertIntoDoc: {
				keyword: "css;.ac_input",
				target: "css;.bk-head",
				where: "afterEnd"
			}
		},
		{
			name: "互动百科词条页",
			url: /^https?:\/\/www\.baike\.com\/wiki/i,
			engineList: "knowledge",
			enabled: true,
			style: `
      border-top: 1px solid #e5e5e5;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 1px;
    `,
			insertIntoDoc: {
				keyword: "css;.ac_input",
				target: "css;.bk-head",
				where: "afterEnd"
			}
		},
		{
			name: "豆丁文档",
			url: /^https?:\/\/www\.docin\.com\/search\.do/,
			engineList: "knowledge",
			enabled: true,
			style: `
      text-align: center;
      margin:0 auto;
      padding-top:1px;
      border-top:1px solid #00000;
      border-bottom:1px solid #D9E1F7;
    `,
			insertIntoDoc: {
				keyword: "css;#topsearch",
				target: "css;.doc_hd_mini",
				where: "afterEnd"
			}
		},
		{
			name: "Quora",
			url: /^https?:\/\/www\.quora\.com\/search\?/i,
			enabled: true,
			engineList: "knowledge",
			fixedTop: 53,
			style: `
      left:calc((100% - 1120px) / 2);
      margin-top: 30px;
    `,
			insertIntoDoc: {
				keyword: "css;#root > div > div.q-box > div > div.q-fixed.qu-fullX.qu-zIndex--header.qu-bg--raised.qu-borderBottom.qu-boxShadow--medium.qu-borderColor--raised > div > div:nth-child(2) > div > div.q-box.qu-flex--auto.qu-mx--small.qu-alignItems--center > div > div > form > div > div > div > div > div > input",
				target: "css;#root > div > div.q-box > div > div:nth-child(3) > div > div",
				where: "beforeBegin"
			}
		},
		{
			name: "StackOverflow",
			url: /^https?:\/\/stackoverflow\.com\/search\?/i,
			enabled: true,
			engineList: "knowledge",
			fixedTop: 50,
			style: "width: min(100%, 1264px) !important;position: sticky;top: 50px;z-index:1001;margin:auto",
			insertIntoDoc: {
				keyword: "css; #search > div > input",
				target: "css;body > div.container",
				where: "beforeBegin"
			}
		},
		{
			name: "知乎(搜狗)",
			url: /^https?:\/\/zhihu\.sogou\.com\/zhihu/,
			enabled: true,
			engineList: "knowledge",
			fixedTop: 55,
			style: `
      margin: auto;
      width: 1000px;
      z-index:99;
    `,
			insertIntoDoc: {
				keyword: "css;#upquery",
				target: "css;#header",
				where: "afterEnd"
			},
			stylish: ".header{ margin-bottom: 5px; }"
		}
	];
	var videoRules = [
		{
			name: "优酷",
			url: /^https?:\/\/www\.soku\.com\/search_video\//,
			engineList: "video",
			enabled: true,
			fixedTop: 54,
			style: `
      width:1190px;
      margin:0 auto;
      z-index:99999;
    `,
			insertIntoDoc: {
				keyword: "css;#headq",
				target: "css;.sk_container",
				where: "beforeBegin"
			}
		},
		{
			name: "土豆",
			url: /^https?:\/\/www\.soku\.com\/t\/nisearch\//,
			enabled: true,
			engineList: "video",
			style: `
      padding-left: 10px;
      border-top: 1px solid #FC6500;
      border-bottom: 1px solid #FC6500;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#headq",
				target: "css;body > .sk_container",
				where: "beforeBegin"
			}
		},
		{
			name: "哔哩哔哩",
			url: /^https?:\/\/search\.bilibili\.com\/*/,
			enabled: true,
			engineList: "video",
			fixedTop: 65,
			style: `
      width:980px;
      margin:10px auto 10px;
    `,
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
			}
		},
		{
			name: "AcFun",
			url: /^https?:\/\/www\.acfun\.cn\/search/,
			enabled: true,
			engineList: "video",
			fixedTop: 46,
			style: `
      width:980px;
      margin: -30px 0 10px 0;
      text-align:center;
      position:sticky;
      top: 65px;
    `,
			insertIntoDoc: {
				keyword: "css;#search-text--standalone",
				target: "css;.search__main__container",
				where: "afterEnd"
			}
		},
		{
			name: "YouTube",
			url: /^https?:\/\/www\.youtube\.com\/results/,
			enabled: true,
			engineList: "video",
			fixedTop: 58,
			style: `
      z-index:9;
      margin: 60px auto -60px;
      text-align: center;
      backgroud:#fff;
      position: relative;
    `,
			insertIntoDoc: {
				keyword: "css;input#search",
				target: "css;#page-manager",
				where: "beforeBegin"
			}
		},
		{
			name: "niconico",
			url: /^https?:\/\/www\.nicovideo\.jp\/search\//,
			enabled: true,
			engineList: "video",
			style: `
      border-top: 1px solid #E8E8E8;
      border-bottom: 1px solid #E8E8E8;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#search_united",
				target: "css;.tagListBox",
				where: "beforeBegin"
			}
		},
		{
			name: "Iqiyi",
			url: /^https?:\/\/so\.iqiyi\.com\/so\/q/,
			enabled: true,
			engineList: "video",
			fixedTop: 60,
			style: `
      margin:0 auto;
      width:1180px;
    `,
			insertIntoDoc: {
				keyword: "css;#data-widget-searchword",
				target: "css;.mod_search_header",
				where: "afterEnd"
			}
		},
		{
			name: "腾讯视频",
			url: /^https?:\/\/v\.qq\.com\/x\/search/i,
			engineList: "video",
			enabled: true,
			fixedTop: 60,
			style: "width:1140px;margin:1em auto;z-index: 11;position:sticky;top:70px;",
			insertIntoDoc: {
				keyword: "css;#keywords",
				target: "css;#search_container > div.wrapper > div.wrapper_main",
				where: "afterBegin"
			}
		},
		{
			name: "樱花动漫",
			url: /^https?:\/\/www\.imomoe\.ai\/search/,
			engineList: "video",
			enabled: true,
			style: `
      width:1140px;
      margin:-10px auto 10px;,
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"searchword\"]",
				target: "css;.head",
				where: "afterEnd"
			}
		}
	];
	var musicRules = [
		{
			name: "百度音乐",
			url: /^https?:\/\/music\.baidu\.com\/search/,
			enabled: true,
			engineList: "music",
			style: `
      border-top: 0px solid #0064C4;
      margin-bottom: 5px;
    `,
			insertIntoDoc: {
				keyword: "css;#ww",
				target: "css;.nav-wrapper",
				where: "beforeBegin"
			}
		},
		{
			name: "一听音乐",
			url: /^https?:\/\/so\.1ting\.com\/song/i,
			enabled: true,
			engineList: "music",
			style: `
      text-align: center;
      border-bottom: 1px solid #13B310;
      border-top: 1px solid #13B310;
      margin:auto;
    `,
			insertIntoDoc: {
				keyword: "css;#keyword",
				target: "css;.nav",
				where: "beforeBegin"
			}
		},
		{
			name: "xiami",
			url: /^https?:\/\/www\.xiami\.com\/search/,
			enabled: true,
			engineList: "music",
			style: `
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#search_text",
				target: "css;.search_result",
				where: "beforeBegin"
			}
		},
		{
			name: "QQ音乐",
			url: /^https?:\/\/y\.qq\.com\/n\/ryqq\/search/i,
			enabled: true,
			engineList: "music",
			style: `
      margin: 1em auto;
      position: sticky;
      top: 68px;
    `,
			insertIntoDoc: {
				keyword: "css;#app>div>div.mod_search>div.mod_search_input>input",
				target: "css;#app > div > div.main > div > div",
				where: "afterBegin"
			}
		},
		{
			name: "网易云音乐",
			url: /^https?:\/\/music\.163\.com\/.*?#\/search/i,
			enabled: true,
			engineList: "music",
			fixedTop: 0,
			style: `
      margin:auto;
      top:3px;
    `,
			insertIntoDoc: {
				keyword: function() {
					return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1]);
				},
				target: "css;.m-subnav.m-subnav-up.f-pr.j-tflag",
				where: "afterEnd"
			}
		},
		{
			name: "音悦台",
			url: /^https?:\/\/so\.yinyuetai\.com\/\?keyword/,
			enabled: true,
			engineList: "music",
			style: `
      border-bottom: 1px solid #2B6DAE;
      border-top: 1px solid #2B6DAE;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: function() {
					var url = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
					return decodeURIComponent(url);
				},
				target: "css;.content",
				where: "afterEnd"
			}
		}
	];
	var imageRules = [
		{
			name: "百度图片",
			url: /^https?:\/\/image\.baidu\.com\/search/i,
			enabled: true,
			engineList: "image",
			fixedTop: 72,
			style: `
      left:127px;
      z-index:1000;
      margin-top:10px;
    `,
			insertIntoDoc: {
				keyword: "css;input#kw",
				target: "css;.s_tab",
				where: "afterEnd"
			}
		},
		{
			name: "谷歌图片",
			url: /^https?:\/\/\w{2,10}\.google(?:\.\D{1,3}){1,2}\/[^?]+\?.*&tbm=isch/i,
			enabled: true,
			engineList: "image",
			fixedTop: 52,
			style: `
      left: 160px;
      margin: 10px 0;
    `,
			insertIntoDoc: {
				keyword: "css;input[name=q]",
				target: "css;#yDmH0d > div.T1diZc.KWE8qe > c-wiz > div.ndYZfc",
				where: "afterEnd"
			}
		},
		{
			name: "必应图片",
			url: /^https?:\/\/.*\.bing\.com\/images\/search/i,
			enabled: true,
			fixedTop: 88,
			engineList: "image",
			style: `
      left:160px;
      margin-top:15px;
    `,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_content",
				where: "afterBegin"
			}
		},
		{
			name: "flickr",
			url: /^https?:\/\/www\.flickr\.com\/search\//,
			engineList: "image",
			enabled: true,
			style: `
      z-index:1999;
      width:100%;
      border-top:1px solid #EBF1FF;
      border-bottom:0px solid #EBF1FF;
    `,
			insertIntoDoc: {
				keyword: function() {
					var input = document.getElementById("autosuggest-input");
					if (input) return input.value;
					else {
						var m = location.search.match(/q=([^&]+)/i);
						if (m) return decodeURIComponent(m[1]);
					}
				},
				target: "css;.using-slender-advanced-panel",
				where: "afterBegin"
			}
		},
		{
			name: "pixiv",
			url: /^https?:\/\/www\.pixiv\.net\/search\.php/i,
			engineList: "image",
			enabled: true,
			style: `
      margin: 0 auto;
      text-align: center;
      font-family: 微软雅黑;
    `,
			insertIntoDoc: {
				keyword: "css;input[name=word]",
				target: "css;body",
				where: "beforeBegin"
			}
		},
		{
			name: "花瓣",
			url: /^https?:\/\/huaban\.com\/search\/\?/,
			engineList: "image",
			enabled: true,
			style: `
      border-top:1px solid #EBF1FF;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;#search_switch",
				where: "afterEnd"
			}
		},
		{
			name: "Pinterest",
			url: /^https?:\/\/www\.pinterest\.com\/search\//,
			engineList: "image",
			enabled: true,
			style: `
      text-align: center;
      margin-top:-11px;
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"q\"]",
				target: "css;.headerContainer",
				where: "afterEnd"
			}
		}
	];
	var downloadRules = [
		{
			name: "海盗湾thepiratebay",
			url: /^https?:\/\/thepiratebay\.org\/search/i,
			engineList: "bittorrent",
			enabled: true,
			style: `
      text-align: center;
      z-index: 9999;
    `,
			insertIntoDoc: {
				keyword: "css;.inputbox",
				target: "css;#SearchResults",
				where: "beforeBegin"
			}
		},
		{
			name: "动漫花园",
			url: /^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword\=/i,
			engineList: "download",
			enabled: true,
			style: `
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#keyword",
				target: "css;.table.clear",
				where: "beforeBegin"
			}
		},
		{
			name: "ED2K",
			url: /^https?:\/\/www\.ed2000\.com\/filelist\.asp/i,
			engineList: "download",
			enabled: true,
			insertIntoDoc: {
				keyword: "css;.searchtxt",
				target: "css;.topsearch",
				where: "afterEnd"
			}
		},
		{
			name: "人人影视",
			url: /^https?:\/\/www\.zimuzu\.tv\/search\//,
			engineList: "download",
			enabled: true,
			style: `
      border-bottom: 1px solid #00AFFF;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"q\"]",
				target: "css;.Header",
				where: "afterEnd"
			}
		},
		{
			name: "subHD字幕",
			url: /^https?:\/\/subhd\.com\/search/i,
			engineList: "download",
			enabled: true,
			style: `
      border-bottom: 0px solid #CAD9EA;
      border-top: 0px solid #CAD9EA;
      text-align: center;
      top: -20px;
    `,
			insertIntoDoc: {
				keyword: "css;#sn",
				target: "css;.navbar.navbar-inverse",
				where: "afterEnd"
			}
		}
	];
	var translateRules = [
		{
			name: "谷歌翻译",
			url: /^https?:\/\/translate\.google(?:\.\D{1,4}){1,2}/i,
			enabled: true,
			engineList: "translate",
			style: `
      margin:10px 0px 0px 0px;
    `,
			insertIntoDoc: {
				keyword: "css;.D5aOJc ",
				target: "css;.MOkH4e ",
				where: "afterBegin"
			}
		},
		{
			name: "百度翻译",
			url: /^https?:\/\/fanyi\.baidu\.com/i,
			enabled: true,
			engineList: "translate",
			style: `
      margin: -20px 0 10px 0;
    `,
			insertIntoDoc: {
				keyword: function() {
					return document.querySelector("#baidu_translate_input").value;
				},
				target: "css;.inner",
				where: "afterBegin"
			}
		},
		{
			name: "必应词典",
			url: /^https?:\/\/.*\.bing\.com\/dict\/search\?q\=/i,
			enabled: true,
			engineList: "translate",
			style: `
      margin-top:6px;
      left: 148px;
    `,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_header",
				where: "beforeEnd"
			}
		},
		{
			name: "有道翻译",
			url: /^https?:\/\/dict\.youdao\.com\/search/i,
			enabled: true,
			engineList: "translate",
			fixedTop: 94,
			style: `
      margin:auto;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;#container",
				where: "beforeBegin"
			}
		},
		{
			name: "有道翻译2",
			url: /^https?:\/\/dict\.youdao\.com\/w/i,
			enabled: true,
			engineList: "translate",
			fixedTop: 64,
			style: `
      padding-left:0px;
      text-align:center;
      margin: 2px auto 0;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;.c-topbar-wrapper",
				where: "beforeEnd"
			}
		},
		{
			name: "海词",
			url: /^https?:\/\/dict\.cn\/./,
			enabled: true,
			engineList: "translate",
			style: `
      z-index: 99;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#q",
				target: "css;.main",
				where: "afterBegin"
			}
		},
		{
			name: "金山词霸",
			url: /^https?:\/\/www\.iciba\.com\/word/i,
			enabled: true,
			engineList: "translate",
			fixedTop: 122,
			style: `
      z-index: 0;
    `,
			insertIntoDoc: {
				keyword: "//input[@type=\"search\"]",
				target: "css;.Search_input__1qgiU",
				where: "afterEnd"
			}
		}
	];
	var shoppingRules = [
		{
			name: "淘宝搜索",
			url: /^https?:\/\/s\.taobao\.com\/search/,
			enabled: true,
			engineList: "shopping",
			fixedTop: 124,
			style: `
      margin:1em auto 0;
      justify-content: center;
      z-index: 99999;
    `,
			insertIntoDoc: {
				keyword: function() {
					var input = document.querySelector("#q");
					if (input) return input.value;
					else {
						var m = location.search.match(/q=([^&]+)/);
						if (m) return decodeURIComponent(m[1]);
					}
				},
				target: "css;div#pageContent",
				where: "beforeBegin"
			}
		},
		{
			name: "天猫超市搜索",
			url: /^https?:\/\/list\.tmall\.com\/search_product\.htm.*from=chaoshi/i,
			enabled: true,
			engineList: "shopping",
			fixedTop: 37,
			style: `
      z-index:9999;
      margin: 2px auto -10px;
      left:0;
      right:0;
      text-align:center;
      position:absolute;
    `,
			insertIntoDoc: {
				keyword: "css;#mq",
				target: "css;.headerCon",
				where: "beforeBegin"
			}
		},
		{
			name: "天猫搜索",
			url: /^https?:\/\/list\.tmall\.com\/search_product\.htm/i,
			enabled: true,
			engineList: "shopping",
			fixedTop: 34,
			style: `
      margin: 10px auto -10px;
      text-align:center;
    `,
			insertIntoDoc: {
				keyword: "css;#mq",
				target: "css;.headerCon",
				where: "beforeBegin"
			}
		},
		{
			name: "京东",
			url: /^https?:\/\/search\.jd\.com\/Search/,
			enabled: true,
			engineList: "shopping",
			fixedTop: 90,
			style: `
      text-align:center;
      margin: 1em auto -0.5em auto;
    `,
			insertIntoDoc: {
				keyword: "css;.jd_pc_search_bar_react_search_input",
				target: "css;#main_search_conter",
				where: "beforeBegin"
			}
		},
		{
			name: "苏宁",
			url: /^https?:\/\/search\.suning\.com/i,
			enabled: true,
			engineList: "shopping",
			style: `
      border-bottom: 1px solid #E5E5E5;
      border-top: 1px solid #E5E5E5;
      margin: 1em auto;
      width: 1390px !important;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#searchKeywordsHidden",
				target: "css;.ng-header",
				where: "afterEnd"
			}
		},
		{
			name: "1号店",
			url: /^https?:\/\/search\.yhd\.com\/c0-0\/k/i,
			enabled: true,
			engineList: "shopping",
			style: `
      border-bottom: 1px solid #E5E5E5;
      border-top: 1px solid #E5E5E5;
      text-align: center;
    `,
			insertIntoDoc: {
				keyword: "css;#keyword",
				target: "css;#global_top_bar",
				where: "afterEnd"
			}
		},
		{
			name: "什么值得买",
			url: /^https?:\/\/search\.smzdm\.com\/\?/i,
			enabled: true,
			engineList: "shopping",
			fixedTop: 40,
			style: `
      width: 100% !important;
      margin: 0 auto 1em auto;
      position: sticky;
      top: 42px;
      z-index: 100;
    `,
			insertIntoDoc: {
				keyword: "css;#J_search_input",
				target: "css;#content > div.content-inner",
				where: "afterBegin"
			}
		},
		{
			name: "亚马逊",
			url: /^https?:\/\/www\.amazon\.cn\/s\?k/i,
			enabled: true,
			engineList: "shopping",
			style: `
      margin:2px 0 -10px 0;
    `,
			insertIntoDoc: {
				keyword: "css;#twotabsearchtextbox",
				target: "css;.sg-row",
				where: "afterBegin"
			}
		},
		{
			name: "1688",
			url: /^https?:\/\/s\.1688\.com\/selloffer\/offer_search/i,
			enabled: true,
			engineList: "shopping",
			fixedTop: 88,
			style: `
      margin:-10px auto 5px;
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"keywords\"]",
				target: "css;.header-container",
				where: "afterEnd"
			}
		},
		{
			name: "慢慢买",
			url: /^https?:\/\/ss\.manmanbuy\.com\/Default\.aspx\?key/i,
			enabled: true,
			engineList: "shopping",
			style: `
      text-align:center;
    `,
			insertIntoDoc: {
				keyword: "//input[@name=\"key\"]",
				target: "css;#resultcomment",
				where: "beforeBegin"
			}
		}
	];
	var socialityRules = [
		{
			name: "新浪微博",
			url: /^https?:\/\/s\.weibo\.com\/weibo\//i,
			enabled: true,
			engineList: "sociality",
			fixedTop: 48,
			style: `
      width: auto !important;
      position: sticky;
      top:70px;
      margin: 1em 0 0.6em 15em;
      z-index: 10;
    `,
			insertIntoDoc: {
				keyword: "css;.woo-input-main",
				target: "css;.m-main .woo-box-flex",
				where: "beforeBegin"
			}
		},
		{
			name: "百度贴吧全吧搜索",
			url: /^https?:\/\/tieba\.baidu\.com\/f\/search/i,
			enabled: true,
			engineList: "sociality",
			fixedTop: 60,
			style: `
      left: 121px;
    `,
			insertIntoDoc: {
				keyword: "css;#wd1",
				target: "css;#head > div.search_main_wrap",
				where: "afterEnd"
			},
			stylish: `@media screen and (min-width: 1920px){#sej-container{left:424px !important;}}`
		},
		{
			name: "百度贴吧",
			url: /^https?:\/\/tieba\.baidu\.com\/f/i,
			enabled: true,
			engineList: "sociality",
			fixedTop: 60,
			style: `
      margin: 0 auto 1em;
      z-index: 10;
    `,
			insertIntoDoc: {
				keyword: "css;#wd1",
				target: "css;#head",
				where: "afterEnd"
			}
		},
		{
			name: "豆瓣1",
			url: /^https?:\/\/(movie|music|book)\.douban\.com\/subject_search?/,
			enabled: true,
			engineList: "sociality",
			style: `
      border-top: 1px solid #e5e5e5;
      text-align: center;
      border-bottom: 1px solid #e5e5e5;
      margin-bottom: 1px;
    `,
			insertIntoDoc: {
				keyword: "css;#inp-query",
				target: "css;.nav-secondary",
				where: "afterEnd"
			}
		},
		{
			name: "豆瓣2",
			url: /^https?:\/\/www\.douban\.com\/search/i,
			enabled: true,
			engineList: "sociality",
			style: `
      margin: -1em 0 1em 7em;
      position: sticky;
      top: 0.1em;
    `,
			insertIntoDoc: {
				keyword: "css;#content > div > div.article > div.mod-search > form > fieldset > div.inp > input",
				target: "css;#content > div > div.article > div.mod-search",
				where: "afterEnd"
			}
		},
		{
			name: "微信(搜狗)",
			url: /^https?:\/\/weixin\.sogou\.com\/weixin\?/,
			enabled: true,
			engineList: "sociality",
			fixedTop: 55,
			style: "width: 1000px !important;margin: 8px auto -5px;z-index:99;",
			insertIntoDoc: {
				keyword: "//input[@name='query']",
				target: "css;#main",
				where: "afterBegin"
			}
		},
		{
			name: "小红书",
			url: /^https?:\/\/www\.xiaohongshu\.com\/search_result/,
			enabled: true,
			engineList: "sociality",
			style: `
      margin: -1em auto 1em;
      position: sticky;
      top: -1em;
    `,
			insertIntoDoc: {
				keyword: "css;#app > div.layout > div.header-container.showSearchBoxOrHeaderFixed > header > div.input-box > input",
				target: "css;#app > div.layout > div.main-container > div.feeds-page > div.middle",
				where: "beforeBegin"
			}
		}
	];
	var scholarRules = [
		{
			name: "百度学术",
			url: /^https?:\/\/xueshu\.baidu\.com\/(?:s|baidu)/,
			enabled: true,
			engineList: "scholar",
			style: `
      text-align: center;
      position: sticky;
      top:62px;
      z-index:99999;
    `,
			insertIntoDoc: {
				keyword: "css;input#kw",
				target: "css;#container",
				where: "afterBegin"
			}
		},
		{
			name: "谷歌学术",
			enabled: true,
			url: /^https?:\/\/scholar\.google(?:\.\D{1,3}){1,2}\/scholar\?/,
			engineList: "scholar",
			style: `
      z-index:1001;
      position:relative;
      margin: 1em 0 0.5em 11em;
      position: sticky;
      top: 0.1em;
    `,
			insertIntoDoc: {
				target: "css;#gs_ab",
				keyword: "//input[@name=\"q\"]",
				where: "beforeBegin"
			}
		},
		{
			name: "cnki",
			url: /^https?:\/\/kns\.cnki\.net\/kns8\/defaultresult\/index/i,
			enabled: true,
			engineList: "scholar",
			style: `
      border-top:1px solid #D9E1F7;
      border-bottom:1px solid #D9E1F7;
      margin:0.6em 0 0.5em 465px;
      position: sticky;
      top: 0.1em;
    `,
			insertIntoDoc: {
				keyword: "css;#txt_search.search-input",
				target: "css;.search-box",
				where: "afterEnd"
			}
		},
		{
			name: "知网",
			enabled: true,
			url: /^https?:\/\/epub\.cnki\.net\/kns\/brief\/default_result\.aspx/i,
			engineList: "scholar",
			style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      z-index:999;
      position:relative;
    `,
			insertIntoDoc: {
				keyword: "css;#txt_1_value1",
				target: "css;#TopSearchBar",
				where: "afterEnd"
			}
		},
		{
			name: "万方",
			enabled: true,
			url: /^https?:\/\/s\.wanfangdata\.com\.cn\/Paper/i,
			engineList: "scholar",
			style: `
      z-index:999;
      width: 1200px !important;
      margin: 1em auto 1em;
      position:sticky;
      top: 0.1em;
      justify-content: center;
    `,
			insertIntoDoc: {
				keyword: "css;input.search-input",
				target: "css;.me-container.container-wrapper",
				where: "beforeBegin"
			}
		},
		{
			name: "EBSCO",
			enabled: true,
			url: /^https?:\/\/.*?ebscohost\.com\/.*?results/i,
			engineList: "scholar",
			style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      position:relative;
    `,
			insertIntoDoc: {
				keyword: "css;#SearchTerm1",
				target: "css;#findFieldOuter",
				where: "afterend"
			}
		},
		{
			name: "Springer",
			enabled: true,
			url: /^https?:\/\/link\.springer\.com\/search\?query=/i,
			engineList: "scholar",
			style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      position:relative;
    `,
			insertIntoDoc: {
				keyword: "css;#query",
				target: "css;#content",
				where: "beforeBegin"
			}
		},
		{
			name: "JSTOR",
			enabled: true,
			url: /^https?:.*?jstor.org\/action\/doAdvancedSearch/i,
			engineList: "scholar",
			style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      position:relative;
    `,
			insertIntoDoc: {
				keyword: "css;#searchBox",
				target: "css;.tabs-search-results",
				where: "beforeBegin"
			}
		}
	];
	var enterpriseRules = [{
		name: "企查查",
		url: /^https?:\/\/www\.qcc\.com\/(?:web|firm|)/,
		engineList: "enterprise",
		enabled: true,
		fixedTop: 56,
		style: `
      width:1250px;
      margin: 0 auto;
      padding-left: 15px;
    `,
		insertIntoDoc: {
			keyword: "css;#searchKey",
			target: "css;.app-nheader",
			where: "AfterEnd"
		},
		stylish: " .bigsearch-nav.fixed > .nav-wrap { position: static !important; }"
	}, {
		name: "天眼查",
		url: /^https?:\/\/www\.tianyancha\.com\/(?:search|company)/,
		engineList: "enterprise",
		enabled: true,
		fixedTop: 73,
		style: `
      top:80px;
      margin: 0 auto;
      width:1248px;
    `,
		insertIntoDoc: {
			keyword: "css;#header-company-search",
			target: "css;.tyc-header",
			where: "AfterEnd"
		},
		stylish: "#web-content.mt122{margin-top:90px !important} .search-bar{position:static !important}"
	}];
	var codingRules = [
		{
			name: "Runoob",
			enabled: true,
			url: /^https?:.*?runoob\.com\//i,
			engineList: "mine",
			style: `
      border-bottom:1px solid #E5E5E5;
      border-top:1px solid #E5E5E5;
      position:relative;
      text-align:center;
      margin: 0 auto 2em;
    `,
			insertIntoDoc: {
				keyword: function() {
					var url = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
					return decodeURIComponent(url);
				},
				target: "css;.main>.row",
				where: "afterBegin"
			}
		},
		{
			name: "GitHub",
			enabled: true,
			url: /^https?:\/\/github\.com\/search/i,
			engineList: "mine",
			fixedTop: 2,
			style: `
      margin: 1em auto;
    `,
			insertIntoDoc: {
				keyword: "css;span[data-target=\"search-input.inputButtonText\"]",
				target: "css;body > div.logged-in.env-production.page-responsive.full-width > div.application-main > main",
				where: "beforeBegin"
			}
		},
		{
			name: "MDN",
			enabled: true,
			url: /^https?:\/\/developer\.mozilla\.org\/.{2,5}\/search/,
			engineList: "mine",
			style: `
      position:relative;
      text-align:center;
    `,
			insertIntoDoc: {
				keyword: function() {
					var url = window.location.href.substring(window.location.href.lastIndexOf("=") + 1);
					return decodeURIComponent(url);
				},
				target: "css;.results-search-form",
				where: "afterEnd"
			}
		}
	];
	var searchEngineJumpPlusRules = [
		...webRules,
		...knowledgeRules,
		...videoRules,
		...musicRules,
		...imageRules,
		...downloadRules,
		...translateRules,
		...shoppingRules,
		...socialityRules,
		...scholarRules,
		...enterpriseRules,
		...codingRules
	];
	var memoryFallback = new Map();
	var asyncCache = new Map();
	var asyncLoaded = new Set();
	var lastKnown = new Map();
	var LOCAL_PREFIX = "sej:storage:";
	var TS_SUFFIX = ":updatedAt";
	var PROBE_KEY = "sej:probe:" + Date.now();
	var backend = "local";
	var readyPromise = null;
	var warned = false;
	function stableStringify(value) {
		if (value === null || typeof value !== "object") return JSON.stringify(value);
		if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
		return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(",")}}`;
	}
	function isSameValue(a, b) {
		try {
			return stableStringify(a) === stableStringify(b);
		} catch (e) {
			return false;
		}
	}
	function cloneValue(value) {
		try {
			return JSON.parse(JSON.stringify(value));
		} catch (e) {
			return value;
		}
	}
	function remember(key, value) {
		if (isPresent(value)) lastKnown.set(key, cloneValue(value));
	}
	function forget(key) {
		lastKnown.delete(key);
		asyncCache.delete(key);
		asyncLoaded.delete(key);
	}
	function gmNamespace() {
		return typeof globalThis !== "undefined" ? globalThis.GM : void 0;
	}
	function hasSyncGM() {
		return typeof _GM_getValue === "function" && typeof _GM_setValue === "function";
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
	function removeLocal(key) {
		try {
			localStorage.removeItem(LOCAL_PREFIX + key);
		} catch (e) {}
	}
	function isPresent(value) {
		return value !== void 0 && value !== null;
	}
	function warnOnce() {
		if (warned) return;
		warned = true;
		console.warn("[SEJ] 未检测到可用的脚本管理器存储（GM_getValue/GM.setValue），已改用 localStorage：配置仅在当前站点生效，跳转到其他网站会回到默认设置。");
	}
	async function probeSyncGM() {
		if (!hasSyncGM()) return false;
		try {
			const token = String(Math.random());
			_GM_setValue(PROBE_KEY, token);
			return _GM_getValue(PROBE_KEY) === token;
		} catch (e) {
			return false;
		} finally {
			try {
				if (typeof _GM_deleteValue === "function") _GM_deleteValue(PROBE_KEY);
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
			if (await probeSyncGM()) backend = "gm-sync";
			else if (await probeAsyncGM()) {
				backend = "gm-async";
				await preloadAsync(keys);
			} else {
				backend = "local";
				warnOnce();
			}
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
				remember(key, value);
				return cloneValue(value);
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
				stored = "gm";
			} catch (e) {
				console.warn("[SEJ] GM.setValue 失败", e);
			}
		}
		remember(key, plain);
		if (backend === "local" || stored === "memory") {
			if (writeLocal(key, plain)) {
				writeLocal(key + TS_SUFFIX, updatedAt);
				if (stored === "memory") stored = "local";
			} else if (stored === "memory") memoryFallback.set(key, plain);
		}
		return stored;
	}
	function deleteValue(key) {
		const gm = gmNamespace();
		if (typeof _GM_deleteValue === "function") try {
			_GM_deleteValue(key);
			_GM_deleteValue(key + TS_SUFFIX);
		} catch (e) {
			console.warn("[SEJ] GM_deleteValue 失败", e);
		}
		else if (gm && typeof gm["deleteValue"] === "function") try {
			Promise.resolve(gm["deleteValue"](key)).catch(() => {});
			Promise.resolve(gm["deleteValue"](key + TS_SUFFIX)).catch(() => {});
		} catch (e) {
			console.warn("[SEJ] GM.deleteValue 失败", e);
		}
		removeLocal(key);
		removeLocal(key + TS_SUFFIX);
		memoryFallback.delete(key);
		forget(key);
	}
	function watchValue(key, callback) {
		const cleanups = [];
		const gm = gmNamespace();
		const handleRemote = (newValue) => {
			if (!isPresent(newValue)) return;
			const plain = cloneValue(newValue);
			asyncCache.set(key, plain);
			asyncLoaded.add(key);
			remember(key, plain);
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
			if (backend === "gm-async") {
				value = await gm["getValue"](key);
				asyncLoaded.add(key);
			} else if (backend === "gm-sync") value = _GM_getValue(key);
			else return null;
			if (!isPresent(value)) return null;
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
	var STORAGE_KEY = "searchEngineJumpData";
	function createDefaultSettings() {
		return {
			fixedTop: true,
			fixedTopUpward: false,
			HideTheSameLink: true,
			center: 0,
			transtion: true,
			selectSearch: true,
			engineCategories: [
				[
					"网页",
					"web",
					true
				],
				[
					"翻译",
					"translate",
					true
				],
				[
					"知识",
					"knowledge",
					true
				],
				[
					"图片",
					"image",
					true
				],
				[
					"视频",
					"video",
					true
				],
				[
					"音乐",
					"music",
					true
				],
				[
					"学术",
					"scholar",
					false
				],
				[
					"社交",
					"sociality",
					true
				],
				[
					"购物",
					"shopping",
					true
				],
				[
					"下载",
					"download",
					false
				],
				[
					"新闻",
					"news",
					false
				],
				[
					"常用",
					"mine",
					false
				]
			],
			engineList: searchEngineJumpPlusEngines
		};
	}
	var OPTION_FLAGS = [
		"fixedTop",
		"fixedTopUpward",
		"HideTheSameLink",
		"transtion",
		"selectSearch"
	];
	var ENGINE_STRINGS = [
		"name",
		"url",
		"favicon",
		"faviconData"
	];
	var COMPAT_FIELDS = { engineCategories: ["engineDetails"] };
	function isObject(value) {
		return Boolean(value) && typeof value === "object" && !Array.isArray(value);
	}
	function normalizeEngine(raw) {
		if (!isObject(raw)) return null;
		const engine = {};
		for (const key of ENGINE_STRINGS) if (typeof raw[key] === "string") engine[key] = raw[key];
		if (!engine.url) return null;
		if (raw.target === "_self") engine.target = "_self";
		if (raw.disable === true) engine.disable = true;
		return engine;
	}
	function readCompat(data, key) {
		if (Array.isArray(data[key])) return data[key];
		for (const legacy of COMPAT_FIELDS[key] || []) if (Array.isArray(data[legacy])) return data[legacy];
		return null;
	}
	function normalizeCategories(data) {
		const raw = readCompat(data, "engineCategories");
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
	function normalizeSettings(raw, defaults) {
		const data = isObject(raw) ? raw : {};
		const settings = {};
		for (const key of OPTION_FLAGS) settings[key] = typeof data[key] === "boolean" ? data[key] : defaults[key];
		settings.center = data.center === 1 || data.center === "1" ? 1 : 0;
		const categories = normalizeCategories(data) || defaults.engineCategories.map((entry) => entry.slice());
		const rawList = isObject(data.engineList) ? data.engineList : null;
		const engineList = {};
		for (const [, key] of categories) engineList[key] = (rawList ? Array.isArray(rawList[key]) ? rawList[key] : [] : defaults.engineList[key] || []).map(normalizeEngine).filter(Boolean);
		settings.engineCategories = categories;
		settings.engineList = engineList;
		return settings;
	}
	var Settings = class {
		constructor() {
			this.storedSettingData = getValue(STORAGE_KEY, null);
			this.scriptSettingData = createDefaultSettings();
			this.settingData = null;
			this.initSettings();
		}
		initSettings() {
			if (this.storedSettingData) {
				this.settingData = normalizeSettings(this.storedSettingData, this.scriptSettingData);
				if (!isSameValue(this.settingData, this.storedSettingData)) setValue(STORAGE_KEY, this.settingData);
			} else this.settingData = normalizeSettings(this.scriptSettingData, this.scriptSettingData);
		}
		applyNormalized(normalized) {
			const plain = JSON.parse(JSON.stringify(normalized));
			for (const key of Object.keys(this.settingData)) if (!Object.prototype.hasOwnProperty.call(plain, key)) delete this.settingData[key];
			Object.assign(this.settingData, plain);
		}
		applySettings(next) {
			this.applyNormalized(normalizeSettings(next, this.scriptSettingData));
			this.storedSettingData = this.settingData;
			return setValue(STORAGE_KEY, this.settingData);
		}
		savePartial(partial) {
			if (!isObject(partial)) return "memory";
			const next = Object.assign({}, this.settingData, partial);
			return this.applySettings(next);
		}
		reload() {
			const stored = getValue(STORAGE_KEY, null);
			if (!isObject(stored)) return false;
			const normalized = normalizeSettings(stored, this.scriptSettingData);
			if (this.settingData && isSameValue(normalized, this.settingData)) return false;
			this.applyNormalized(normalized);
			this.storedSettingData = this.settingData;
			return true;
		}
		getMatchedRule() {
			for (const rule of [...searchEngineJumpPlusRules]) if (rule.url.test(location.href)) return rule;
			return null;
		}
	};
	var instance = null;
	function useSettings() {
		if (!instance) instance = reactive(new Settings());
		return instance;
	}
	var inlineStyleBlocked = null;
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
		const nonceElement = document.querySelector("style[nonce], script[nonce]");
		return nonceElement?.nonce || nonceElement?.getAttribute("nonce") || "";
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
	function getRoot() {
		if (!shadowRoot) initialize();
		return shadowRoot;
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
		if (!cssText) return;
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
		stackSheet = null;
		stackSheetText = "";
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
		if (settingData.center == 1) style += FORCE_CENTER_STYLE;
		addStyle(`#sej-container { ${style} }`);
		return style;
	}
	function applyStylish(rule) {
		if (!rule?.stylish) return;
		addPageStyle(rule.stylish);
		const scriptElementStyles = rule.stylish.match(/#sej-container(-wrapper)?\s*\{[^}]+\}/g);
		if (scriptElementStyles) scriptElementStyles.forEach((ruleText) => addStyle(ruleText));
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
		if (hideTheSameLink === false) kw = kw.replace(/site:[^\s]+/, "");
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
	function shouldOpenInNewTab(engine, isSelectSearch) {
		return Boolean(isSelectSearch || engine.target !== "_self");
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
		form.innerHTML = `<input type="hidden" name="${field}" value="${value}"/>`;
		if (targetName) form.target = targetName;
		document.body.appendChild(form);
		form.submit();
	}
	function performJump(engine, keyword, settingData, isSelectSearch) {
		const result = prepareJump(engine, keyword, { hideTheSameLink: settingData.HideTheSameLink });
		const newTab = shouldOpenInNewTab(engine, isSelectSearch);
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
			if (settingData?.HideTheSameLink && matchedRule?.url?.test(engine.url)) continue;
			performJump(engine, keyword, settingData || {}, true);
		}
	}
	var ICON_TIMEOUT = 4e3;
	var MAX_ICON_BYTES = 65536;
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
	function requestIcon(url) {
		return new Promise((resolve) => {
			if (typeof _GM_xmlhttpRequest !== "function") {
				resolve(null);
				return;
			}
			let settled = false;
			const finish = (response) => {
				if (settled) return;
				settled = true;
				resolve(response);
			};
			try {
				_GM_xmlhttpRequest({
					method: "GET",
					url,
					responseType: "arraybuffer",
					timeout: ICON_TIMEOUT,
					headers: { Accept: "image/*,*/*;q=0.8" },
					onload: finish,
					onerror: () => finish(null),
					ontimeout: () => finish(null),
					onabort: () => finish(null)
				});
			} catch (e) {
				finish(null);
			}
		});
	}
	function getFaviconSrc(engine) {
		return engine?.faviconData || engine?.favicon || "";
	}
	async function embedFavicon(url) {
		const source = typeof url === "string" ? url.trim() : "";
		if (!/^https?:\/\//i.test(source)) return source;
		const response = await requestIcon(source);
		if (!response || response.status < 200 || response.status >= 300) return source;
		const buffer = response.response;
		if (!buffer || buffer.byteLength === 0 || buffer.byteLength > MAX_ICON_BYTES) return source;
		let mime = getHeader(response.responseHeaders, "content-type").split(";")[0].trim().toLowerCase();
		if (!mime || mime === "application/octet-stream") mime = mimeFromUrl(source);
		if (!/^image\//.test(mime)) return source;
		try {
			return `data:${mime};base64,${arrayBufferToBase64(buffer)}`;
		} catch (e) {
			console.warn("[SEJ] 图标转换失败:", source, e);
			return source;
		}
	}
	var _hoisted_1$7 = ["src"];
	var _sfc_main$9 = {
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
			const emit = __emit;
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("a", {
					class: "sej-engine",
					onClick: _cache[0] || (_cache[0] = withModifiers(($event) => emit("jump", __props.engine), ["prevent", "stop"]))
				}, [__props.showIcon && unref(getFaviconSrc)(__props.engine) ? (openBlock(), createElementBlock("img", {
					key: 0,
					class: "sej-engine-icon",
					src: unref(getFaviconSrc)(__props.engine),
					alt: ""
				}, null, 8, _hoisted_1$7)) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(__props.engine.name), 1)]);
			};
		}
	};
	var _hoisted_1$6 = ["aria-expanded"];
	var _hoisted_2$5 = [
		"title",
		"aria-label",
		"onKeydown"
	];
	var _hoisted_3$3 = ["src"];
	var pinnedCategory = null;
	var openCategory = null;
	var _sfc_main$8 = {
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
			const emit = __emit;
			const dropRoot = getDropRoot();
			const triggerEl = ref(null);
			const listEl = ref(null);
			const shown = ref(false);
			const active = ref(false);
			const pinned = ref(false);
			const top = ref("-10000px");
			const left = ref("0px");
			const pointer = {
				x: -1,
				y: -1
			};
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
			function isPointerInside() {
				return hitTest(triggerEl.value) || hitTest(listEl.value) || hitTestBridge();
			}
			function isTriggerOnTop() {
				const trigger = triggerEl.value;
				if (!trigger || pointer.x < 0 || pointer.y < 0) return false;
				const top = (trigger.getRootNode?.())?.elementFromPoint?.(pointer.x, pointer.y);
				if (!top) return true;
				return top === trigger || trigger.contains(top);
			}
			function measureAndPosition() {
				if (!triggerEl.value || !listEl.value) return;
				const rect = triggerEl.value.getBoundingClientRect();
				const listRect = listEl.value.getBoundingClientRect();
				const listWidth = listRect.width;
				const listHeight = listRect.height;
				const GAP = 2;
				let posLeft = rect.left - (listWidth - rect.width) / 2;
				posLeft = Math.max(8, Math.min(posLeft, window.innerWidth - listWidth - 8));
				let posTop = rect.bottom + GAP;
				if (posTop + listHeight > window.innerHeight - 8 && rect.top - listHeight - GAP > 8) posTop = rect.top - listHeight - GAP;
				top.value = posTop + "px";
				left.value = posLeft + "px";
			}
			async function show() {
				if (shown.value) {
					active.value = true;
					return;
				}
				if (!triggerEl.value) return;
				if (openCategory && openCategory !== hide) openCategory();
				openCategory = hide;
				shown.value = true;
				await nextTick();
				if (!shown.value) return;
				measureAndPosition();
				active.value = true;
			}
			function scheduleHide() {
				if (pinned.value || isPointerInside()) return;
				hide();
			}
			function hide() {
				if (openCategory === hide) openCategory = null;
				active.value = false;
				shown.value = false;
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
				hide();
			}
			function onTriggerClick() {
				if (pinned.value) {
					unpin();
					return;
				}
				pin();
			}
			function onHoverShow(e) {
				if (pinnedCategory && pinnedCategory !== unpin) return;
				if (e) {
					pointer.x = e.clientX;
					pointer.y = e.clientY;
				}
				if (!isTriggerOnTop()) return;
				show();
			}
			function onTriggerAction() {
				unpin();
				emit("jumpAll");
			}
			function onEngineJump(engine) {
				unpin();
				emit("jump", engine);
			}
			function onDocMouseMove(e) {
				pointer.x = e.clientX;
				pointer.y = e.clientY;
				if (!shown.value) return;
				if (pinned.value || isPointerInside()) active.value = true;
				else scheduleHide();
			}
			function onDocPointerDown(e) {
				if (!pinned.value) return;
				const path = e.composedPath ? e.composedPath() : [];
				if (path.includes(triggerEl.value) || path.includes(listEl.value)) return;
				unpin();
			}
			onMounted(() => {
				document.addEventListener("mousemove", onDocMouseMove);
				document.addEventListener("pointerdown", onDocPointerDown);
			});
			onBeforeUnmount(() => {
				if (openCategory === hide) openCategory = null;
				document.removeEventListener("mousemove", onDocMouseMove);
				document.removeEventListener("pointerdown", onDocPointerDown);
				if (pinnedCategory === unpin) pinnedCategory = null;
			});
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("span", {
					class: "sej-category",
					onMouseenter: onHoverShow,
					onMouseleave: scheduleHide
				}, [createBaseVNode("a", {
					ref_key: "triggerEl",
					ref: triggerEl,
					class: normalizeClass(["sej-engine sej-drop-list-trigger", { "sej-drop-list-trigger-shown": active.value }]),
					"aria-haspopup": "true",
					"aria-expanded": shown.value,
					onClick: withModifiers(onTriggerClick, ["prevent", "stop"])
				}, [pinned.value ? (openBlock(), createElementBlock("span", {
					key: 0,
					class: "sej-category-search-icon",
					role: "button",
					tabindex: "0",
					title: `一键搜索全部：${__props.name}`,
					"aria-label": `一键搜索全部：${__props.name}`,
					onClick: withModifiers(onTriggerAction, ["stop", "prevent"]),
					onKeydown: [withKeys(withModifiers(onTriggerAction, ["stop", "prevent"]), ["enter"]), withKeys(withModifiers(onTriggerAction, ["stop", "prevent"]), ["space"])]
				}, [..._cache[0] || (_cache[0] = [createBaseVNode("svg", {
					viewBox: "0 0 16 16",
					"aria-hidden": "true"
				}, [
					createBaseVNode("path", { d: "M6.5 3H4.3A1.3 1.3 0 0 0 3 4.3v7.4A1.3 1.3 0 0 0 4.3 13h7.4a1.3 1.3 0 0 0 1.3-1.3V9.5" }),
					createBaseVNode("path", { d: "M9.6 2.6h3.8v3.8" }),
					createBaseVNode("path", { d: "M13.4 2.6 8.6 7.4" })
				], -1)])], 40, _hoisted_2$5)) : __props.showIcon && unref(getFaviconSrc)(__props.engines[0]) ? (openBlock(), createElementBlock("img", {
					key: 1,
					class: "sej-engine-icon",
					src: unref(getFaviconSrc)(__props.engines[0]),
					alt: ""
				}, null, 8, _hoisted_3$3)) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(__props.name), 1)], 10, _hoisted_1$6), (openBlock(), createBlock(Teleport, { to: unref(dropRoot) }, [createBaseVNode("div", {
					ref_key: "listEl",
					ref: listEl,
					class: "sej-drop-list",
					style: normalizeStyle({
						display: shown.value ? "block" : "none",
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
					return openBlock(), createBlock(_sfc_main$9, {
						key: engine.name + engine.url,
						engine,
						onJump: onEngineJump
					}, null, 8, ["engine"]);
				}), 128))], 36)], 8, ["to"]))], 32);
			};
		}
	};
	var SETTING = "<svg width=\"16\" height=\"16\" class=\"icon\" id=\"sej-setting-button\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z\" fill=\"none\" stroke=\"var(--font-color-qxin)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"42\"/></svg>";
	var EYE = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>";
	var EYE_OFF = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94\"/><path d=\"M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19\"/><path d=\"M14.12 14.12a3 3 0 1 1-4.24-4.24\"/><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/></svg>";
	var COPY = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>";
	var _hoisted_1$5 = ["innerHTML"];
	var _sfc_main$7 = {
		__name: "SettingButton",
		setup(__props) {
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("span", {
					id: "setBtn",
					role: "button",
					tabindex: "0",
					title: "设置菜单",
					"aria-label": "设置菜单",
					onClick: _cache[0] || (_cache[0] = (...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args)),
					onKeydown: [_cache[1] || (_cache[1] = withKeys(withModifiers((...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args), ["prevent"]), ["enter"])), _cache[2] || (_cache[2] = withKeys(withModifiers((...args) => unref(openSettingPanel) && unref(openSettingPanel)(...args), ["prevent"]), ["space"]))],
					innerHTML: unref(SETTING)
				}, null, 40, _hoisted_1$5);
			};
		}
	};
	var _hoisted_1$4 = ["aria-hidden"];
	var _hoisted_2$4 = {
		key: 0,
		class: "sej-category-title"
	};
	var FIXED_GAP = 8;
	var VIEWPORT_GAP = 8;
	var _sfc_main$6 = {
		__name: "JumpBar",
		setup(__props) {
			const settings = useSettings();
			const data = settings.settingData;
			const matchedRule = settings.getMatchedRule();
			const inlineStyleBlocked = isInlineStyleBlocked();
			const ready = ref(false);
			const isSelectSearch = ref(false);
			const selectionText = ref("");
			const barVisible = ref(false);
			const containerEl = ref(null);
			const containerClass = ref("rwl-exempt");
			let inputTarget = null;
			let insertTarget = null;
			let insertPosition = "beforeend";
			let resolvedStyle = "";
			let originalContainerDistanceTop = 0;
			const categories = computed(() => data.engineCategories.filter(([, , enabled]) => enabled).map(([name, key]) => ({
				name,
				key,
				engines: (data.engineList[key] || []).filter((engine) => {
					if (engine.disable) return false;
					if (data.HideTheSameLink && matchedRule?.url?.test(engine.url)) return false;
					return true;
				})
			})).filter((category) => category.engines.length));
			function getCurrentKeyword() {
				if (isSelectSearch.value) return selectionText.value;
				return extractKeyword(inputTarget);
			}
			function onJump(engine) {
				performJump(engine, getCurrentKeyword(), data, isSelectSearch.value);
			}
			function onJumpAll(engines) {
				openAllEngines(engines, getCurrentKeyword(), data, matchedRule);
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
			function constrainBarToViewport() {
				const el = containerEl.value;
				if (!el || isSelectSearch.value) return;
				if (getHost().style.position === "fixed") return;
				el.style.maxWidth = "";
				el.style.marginLeft = "";
				let rect = el.getBoundingClientRect();
				const vw = document.documentElement.clientWidth;
				if (rect.left >= VIEWPORT_GAP && rect.right <= vw - VIEWPORT_GAP) return;
				const available = Math.max(80, vw - 16);
				if (rect.width > available) el.style.maxWidth = `${available}px`;
				el.style.marginLeft = "0px";
				rect = el.getBoundingClientRect();
				const maxLeft = vw - VIEWPORT_GAP - rect.width;
				const desiredLeft = Math.max(VIEWPORT_GAP, Math.min(rect.left, maxLeft));
				el.style.marginLeft = `${desiredLeft - rect.left}px`;
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
				let el = insertTarget;
				while (el && el !== document.documentElement) {
					consider(el);
					el = el.parentElement;
				}
				return bottom;
			}
			function fixedToTop(fixedTopValue, color) {
				if (!containerEl.value || inlineStyleBlocked) return;
				if (resolvedStyle.includes("sticky") || resolvedStyle.includes("fixed")) return;
				const fixedTop = fixedTopValue ? fixedTopValue : 0;
				const host = getHost();
				const container = containerEl.value;
				if (originalContainerDistanceTop - window.scrollY <= fixedTop) {
					if (host.style.position !== "fixed") {
						const rect = container.getBoundingClientRect();
						host.dataset.originalLeft = rect.left;
						host.dataset.originalWidth = rect.width;
						scheduleFixedTopRefresh();
					}
					const left = Math.max(0, parseFloat(host.dataset.originalLeft) || 0);
					const width = parseFloat(host.dataset.originalWidth) || 0;
					const headerBottom = getFixedHeaderBottom(left, width);
					const top = (headerBottom > 0 ? headerBottom + FIXED_GAP : FIXED_GAP) + getStackOffset();
					host.style.display = "block";
					host.style.width = width > 0 ? `${Math.ceil(width)}px` : "max-content";
					host.style.maxWidth = `calc(100vw - ${left + 12}px)`;
					host.style.position = "fixed";
					host.style.top = `${Math.round(top)}px`;
					host.style.left = `${left}px`;
					host.style.zIndex = "100000";
					container.style.position = "static";
					container.style.left = "0";
					container.style.top = "0";
					container.style.gridColumn = "auto";
					container.style.margin = "0";
					container.style.backgroundColor = color;
				} else {
					const wasFixed = host.style.position === "fixed";
					host.style.position = "";
					host.style.top = "";
					host.style.left = "";
					host.style.zIndex = "";
					host.style.display = "";
					host.style.width = "";
					host.style.maxWidth = "";
					delete host.dataset.originalLeft;
					delete host.dataset.originalWidth;
					container.style.position = "";
					container.style.left = "";
					container.style.top = "";
					container.style.gridColumn = "";
					container.style.margin = "";
					container.style.backgroundColor = "";
					if (wasFixed) constrainBarToViewport();
				}
			}
			let scrollRaf = 0;
			let fixedTopTimers = [];
			function scheduleFixedTopRefresh() {
				fixedTopTimers.forEach(clearTimeout);
				fixedTopTimers = [
					80,
					250,
					600
				].map((delay) => setTimeout(() => {
					if (getHost().style.position === "fixed") fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
				}, delay));
			}
			function onScroll() {
				if (scrollRaf) return;
				scrollRaf = requestAnimationFrame(() => {
					scrollRaf = 0;
					fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
				});
			}
			function onWheel(e) {
				if (e.wheelDelta > 0) fixedToTop(matchedRule?.fixedTop, matchedRule?.fixedTopColor);
			}
			function onSelectionChange() {
				const selection = getSelection();
				if (selection.isCollapsed) barVisible.value = false;
				else {
					selectionText.value = selection.toString();
					barVisible.value = true;
				}
			}
			let stackTimer = 0;
			let stackTries = 0;
			function startStackSync() {
				refreshStackLayout();
				window.addEventListener("resize", refreshStackLayout);
				clearInterval(stackTimer);
				stackTries = 0;
				stackTimer = setInterval(() => {
					refreshStackLayout();
					if (++stackTries >= 20) stopStackSync();
				}, 500);
			}
			function stopStackSync() {
				clearInterval(stackTimer);
				stackTimer = 0;
				window.removeEventListener("resize", refreshStackLayout);
			}
			onMounted(async () => {
				if (!initTargets()) return;
				ready.value = true;
				if (matchedRule) {
					applyStylish(matchedRule);
					resolvedStyle = resolveRuleStyle(matchedRule, data) || "";
					if (matchedRule.class) containerClass.value = `rwl-exempt ${matchedRule.class}`;
				}
				await nextTick();
				injectHost();
				startStackSync();
				constrainBarToViewport();
				window.addEventListener("resize", constrainBarToViewport);
				if (isSelectSearch.value) {
					document.addEventListener("selectionchange", onSelectionChange);
					document.addEventListener("mouseup", onSelectionChange);
					document.addEventListener("keyup", onSelectionChange);
				}
				if (data.fixedTop && matchedRule && !inlineStyleBlocked && !isSelectSearch.value) {
					originalContainerDistanceTop = containerEl.value.getBoundingClientRect().top + window.scrollY;
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
				window.removeEventListener("resize", constrainBarToViewport);
				if (scrollRaf) cancelAnimationFrame(scrollRaf);
				fixedTopTimers.forEach(clearTimeout);
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
				}, [(openBlock(true), createElementBlock(Fragment, null, renderList(categories.value, (category) => {
					return openBlock(), createElementBlock(Fragment, { key: category.key }, [unref(inlineStyleBlocked) ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [unref(inlineStyleBlocked) ? (openBlock(), createElementBlock("span", _hoisted_2$4, toDisplayString(category.name), 1)) : createCommentVNode("", true), (openBlock(true), createElementBlock(Fragment, null, renderList(category.engines, (engine) => {
						return openBlock(), createBlock(_sfc_main$9, {
							key: engine.url + engine.name,
							engine,
							onJump
						}, null, 8, ["engine"]);
					}), 128))], 64)) : (openBlock(), createBlock(_sfc_main$8, {
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
				}), 128)), createVNode(_sfc_main$7)], 10, _hoisted_1$4)) : createCommentVNode("", true);
			};
		}
	};
	var restartHandler = null;
	function onRestartRequest(handler) {
		restartHandler = handler;
	}
	function requestRestart() {
		if (restartHandler) restartHandler();
	}
	var _hoisted_1$3 = { id: "newSearchBox" };
	var _hoisted_2$3 = { class: "sej-dialog-title" };
	var _hoisted_3$2 = { class: "sej-field" };
	var _hoisted_4$2 = ["disabled"];
	var _hoisted_5$2 = { class: "sej-field" };
	var _hoisted_6$2 = ["disabled"];
	var _hoisted_7$2 = { class: "sej-field" };
	var _hoisted_8$1 = { class: "sej-field-row" };
	var _hoisted_9$1 = ["disabled"];
	var _hoisted_10$1 = ["disabled"];
	var _hoisted_11$1 = { class: "sej-field" };
	var _hoisted_12$1 = { class: "sej-data-line" };
	var _hoisted_13$1 = ["disabled"];
	var _hoisted_14$1 = ["src"];
	var _hoisted_15$1 = {
		key: 0,
		class: "sej-field-value"
	};
	var _hoisted_16$1 = {
		key: 1,
		class: "sej-field-value"
	};
	var _hoisted_17$1 = { class: "sej-field" };
	var _hoisted_18$1 = ["disabled"];
	var _hoisted_19$1 = { class: "sej-dialog-actions" };
	var _hoisted_20$1 = ["disabled"];
	var _hoisted_21$1 = ["disabled"];
	var _hoisted_22$1 = ["disabled"];
	var _sfc_main$5 = {
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
			const props = __props;
			const emit = __emit;
			const form = reactive({
				name: props.initial.name || "",
				url: props.initial.url || "",
				favicon: props.initial.favicon || "",
				target: props.initial.target === "_self" ? "_self" : "_blank"
			});
			const urlInput = ref(null);
			const initialFavicon = (props.initial.favicon || "").trim();
			const secondLevelSuffixes = new Set([
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
			function titleFromUrl(raw) {
				const value = String(raw || "").trim();
				if (!value) return "";
				let host;
				try {
					host = new URL(value.includes("://") ? value : `https://${value}`).hostname;
				} catch {
					return "";
				}
				host = host.replace(/^www\./i, "");
				if (/^\d+(\.\d+){3}$/.test(host)) return host;
				if (!host || !host.includes(".")) return "";
				const parts = host.split(".").filter(Boolean);
				let suffixLength = 1;
				const last = parts[parts.length - 1] || "";
				const secondLast = (parts[parts.length - 2] || "").toLowerCase();
				if (last.length === 2 && secondLevelSuffixes.has(secondLast)) suffixLength = 2;
				const label = parts[parts.length - suffixLength - 1] || parts[0];
				return label ? label.charAt(0).toUpperCase() + label.slice(1) : "";
			}
			function faviconFromUrl(raw) {
				const value = String(raw || "").trim();
				if (!value) return "";
				try {
					const url = new URL(value.includes("://") ? value : `https://${value}`);
					if (!url.hostname.includes(".")) return "";
					return `${url.origin}/favicon.ico`;
				} catch {
					return "";
				}
			}
			const titleEdited = ref(Boolean((props.initial.name || "").trim()));
			const faviconEdited = ref(Boolean((props.initial.favicon || "").trim()));
			function markTitleEdited() {
				titleEdited.value = true;
			}
			function markFaviconEdited() {
				faviconEdited.value = true;
			}
			watch(() => form.url, () => {
				if (!titleEdited.value || !form.name.trim()) form.name = titleFromUrl(form.url);
				if (!faviconEdited.value || !form.favicon.trim()) form.favicon = faviconFromUrl(form.url);
			});
			const previewData = ref("");
			const previewLoading = ref(false);
			const previewFailed = ref(false);
			const previewCache = new Map();
			let previewToken = 0;
			const dataIconLink = computed(() => previewData.value.trim());
			const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
			const canPreview = computed(() => /^(https?:\/\/|data:)/i.test(form.favicon.trim()));
			const dataEdited = ref(false);
			function markDataEdited() {
				dataEdited.value = true;
			}
			function setPreviewData(value) {
				previewData.value = value;
				dataEdited.value = false;
			}
			watch(() => form.favicon, (value) => {
				previewToken++;
				const url = value.trim();
				previewLoading.value = false;
				previewFailed.value = false;
				if (dataEdited.value) return;
				if (/^data:/i.test(url)) {
					setPreviewData(url);
					return;
				}
				if (url === initialFavicon && props.initial.faviconData) {
					setPreviewData(props.initial.faviconData);
					return;
				}
				setPreviewData("");
			}, { immediate: true });
			async function previewIcon() {
				if (props.busy || previewLoading.value) return;
				const url = form.favicon.trim();
				if (/^data:/i.test(url)) {
					setPreviewData(url);
					previewFailed.value = false;
					return;
				}
				if (!/^https?:\/\//i.test(url)) return;
				if (url === initialFavicon && props.initial.faviconData) {
					setPreviewData(props.initial.faviconData);
					return;
				}
				if (previewCache.has(url)) {
					setPreviewData(previewCache.get(url));
					previewFailed.value = false;
					return;
				}
				const token = ++previewToken;
				const previous = previewData.value;
				previewData.value = "";
				previewFailed.value = false;
				previewLoading.value = true;
				const result = await embedFavicon(url);
				if (token !== previewToken) return;
				previewLoading.value = false;
				if (result !== url) {
					setPreviewData(result);
					previewCache.set(url, result);
				} else {
					previewData.value = previous;
					previewFailed.value = true;
				}
			}
			onMounted(() => urlInput.value?.focus());
			onBeforeUnmount(() => {
				previewToken++;
			});
			function submit() {
				if (props.busy) return;
				emit("submit", {
					name: form.name,
					url: form.url.indexOf("://") === -1 ? "https://" + form.url : form.url,
					favicon: form.favicon || props.resolveIcon(form.url),
					faviconData: previewLoading.value ? "" : previewData.value.trim(),
					target: form.target
				});
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$3, [
					createBaseVNode("div", _hoisted_2$3, toDisplayString(__props.mode === "edit" ? "编辑搜索引擎" : "添加搜索引擎"), 1),
					createBaseVNode("label", _hoisted_3$2, [_cache[7] || (_cache[7] = createBaseVNode("span", null, "链接", -1)), withDirectives(createBaseVNode("input", {
						ref_key: "urlInput",
						ref: urlInput,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.url = $event),
						placeholder: "必填",
						disabled: __props.busy
					}, null, 8, _hoisted_4$2), [[vModelText, form.url]])]),
					createBaseVNode("label", _hoisted_5$2, [_cache[8] || (_cache[8] = createBaseVNode("span", null, "标题", -1)), withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.name = $event),
						placeholder: "必填，留空自动取域名",
						disabled: __props.busy,
						onInput: markTitleEdited
					}, null, 40, _hoisted_6$2), [[vModelText, form.name]])]),
					createBaseVNode("div", _hoisted_7$2, [_cache[9] || (_cache[9] = createBaseVNode("span", null, "图标", -1)), createBaseVNode("div", _hoisted_8$1, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.favicon = $event),
						placeholder: "选填，默认 域名/favicon.ico",
						disabled: __props.busy,
						onInput: markFaviconEdited
					}, null, 40, _hoisted_9$1), [[vModelText, form.favicon]]), createBaseVNode("button", {
						type: "button",
						class: "sej-icon-preview-btn",
						disabled: __props.busy || previewLoading.value || !canPreview.value,
						onClick: previewIcon
					}, toDisplayString(previewLoading.value ? "转换中…" : "预览"), 9, _hoisted_10$1)])]),
					createBaseVNode("div", _hoisted_11$1, [
						_cache[10] || (_cache[10] = createBaseVNode("span", null, "图标缓存", -1)),
						createBaseVNode("div", _hoisted_12$1, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => previewData.value = $event),
							class: "sej-data-input",
							placeholder: "选填，可粘贴 data:image/... 链接",
							disabled: __props.busy,
							onInput: markDataEdited
						}, null, 40, _hoisted_13$1), [[vModelText, previewData.value]]), previewImage.value ? (openBlock(), createElementBlock("img", {
							key: 0,
							class: "sej-icon-preview",
							src: dataIconLink.value,
							alt: ""
						}, null, 8, _hoisted_14$1)) : createCommentVNode("", true)]),
						previewLoading.value ? (openBlock(), createElementBlock("span", _hoisted_15$1, "转换中…")) : previewFailed.value ? (openBlock(), createElementBlock("span", _hoisted_16$1, "转换失败（保存时会重试）")) : createCommentVNode("", true)
					]),
					createBaseVNode("label", _hoisted_17$1, [_cache[12] || (_cache[12] = createBaseVNode("span", null, "打开方式", -1)), withDirectives(createBaseVNode("select", {
						id: "iqxin-newTarget",
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.target = $event),
						disabled: __props.busy
					}, [..._cache[11] || (_cache[11] = [createBaseVNode("option", { value: "_blank" }, "新标签页打开", -1), createBaseVNode("option", { value: "_self" }, "当前页打开", -1)])], 8, _hoisted_18$1), [[vModelSelect, form.target]])]),
					createBaseVNode("div", _hoisted_19$1, [
						__props.mode === "edit" ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("delete"))
						}, " 删除 ", 8, _hoisted_20$1)) : createCommentVNode("", true),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("cancel"))
						}, " 取消 ", 8, _hoisted_21$1),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(__props.busy ? "获取图标中…" : "确定"), 9, _hoisted_22$1)
					])
				]);
			};
		}
	};
	var _hoisted_1$2 = {
		id: "sej-categoryBox",
		class: "sej-dialog-box"
	};
	var _hoisted_2$2 = { class: "sej-field" };
	var _hoisted_3$1 = ["disabled"];
	var _hoisted_4$1 = { class: "sej-dialog-actions" };
	var _hoisted_5$1 = ["disabled"];
	var _hoisted_6$1 = ["disabled"];
	var _hoisted_7$1 = ["disabled"];
	var _sfc_main$4 = {
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
			const input = ref(null);
			const value = ref(props.name);
			onMounted(() => {
				input.value?.focus();
				input.value?.select();
			});
			function submit() {
				if (props.busy) return;
				emit("submit", value.value.trim());
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$2, [
					_cache[4] || (_cache[4] = createBaseVNode("div", { class: "sej-dialog-title" }, "编辑分类", -1)),
					createBaseVNode("label", _hoisted_2$2, [_cache[3] || (_cache[3] = createBaseVNode("span", null, "名称", -1)), withDirectives(createBaseVNode("input", {
						ref_key: "input",
						ref: input,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
						placeholder: "必填",
						disabled: __props.busy,
						onKeydown: withKeys(submit, ["enter"])
					}, null, 40, _hoisted_3$1), [[vModelText, value.value]])]),
					createBaseVNode("div", _hoisted_4$1, [
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete"))
						}, " 删除分类 ", 8, _hoisted_5$1),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("cancel"))
						}, " 取消 ", 8, _hoisted_6$1),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, " 确定 ", 8, _hoisted_7$1)
					])
				]);
			};
		}
	};
	var _hoisted_1$1 = { id: "iqxin-editCodeBox" };
	var _hoisted_2$1 = { class: "sej-dialog-actions" };
	var _sfc_main$3 = {
		__name: "ConfigEditor",
		props: { initialText: {
			type: String,
			default: ""
		} },
		emits: [
			"save",
			"reset",
			"close",
			"copy",
			"notify"
		],
		setup(__props, { emit: __emit }) {
			const props = __props;
			const emit = __emit;
			const text = ref(props.initialText);
			const fileInput = ref(null);
			function copy() {
				_GM_setClipboard(text.value);
				emit("copy");
			}
			function pickFile() {
				fileInput.value?.click();
			}
			async function importFile(event) {
				const file = event.target.files?.[0];
				event.target.value = "";
				if (!file) return;
				try {
					const parsed = JSON.parse(await file.text());
					text.value = JSON.stringify(parsed, null, 4);
					emit("notify", `已导入 ${file.name}`);
				} catch (e) {
					alert("JSON 解析失败");
				}
			}
			function exportFile() {
				let parsed;
				try {
					parsed = JSON.parse(text.value);
				} catch (e) {
					alert("JSON 解析失败，无法导出");
					return;
				}
				const now = new Date();
				const pad = (n) => String(n).padStart(2, "0");
				const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}-${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
				const blob = new Blob([JSON.stringify(parsed, null, 4)], { type: "application/json;charset=utf-8" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `SearchEngineJump-settings-${stamp}.json`;
				document.body.appendChild(link);
				link.click();
				link.remove();
				setTimeout(() => URL.revokeObjectURL(url), 1e3);
				emit("notify", "配置已导出");
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$1, [
					_cache[4] || (_cache[4] = createBaseVNode("p", null, [
						createBaseVNode("span", { class: "iqxin-warning" }, "! ! !"),
						createBaseVNode("br"),
						createTextVNode(" 此处有更多的设置选项,自由度更高,"),
						createBaseVNode("br"),
						createTextVNode(" 但设置错误会导致脚本无法运行 ")
					], -1)),
					withDirectives(createBaseVNode("textarea", {
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => text.value = $event),
						wrap: "off",
						cols: "45",
						rows: "20"
					}, null, 512), [[vModelText, text.value]]),
					createBaseVNode("input", {
						ref_key: "fileInput",
						ref: fileInput,
						class: "sej-file-input",
						type: "file",
						accept: "application/json,.json",
						onChange: importFile
					}, null, 544),
					createBaseVNode("div", _hoisted_2$1, [
						createBaseVNode("button", { onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("reset")) }, "恢复默认"),
						createBaseVNode("button", { onClick: pickFile }, "导入"),
						createBaseVNode("button", { onClick: exportFile }, "导出"),
						createBaseVNode("button", { onClick: copy }, "复制"),
						createBaseVNode("button", {
							class: "iqxin-closeBtn",
							onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
						}, "关闭"),
						createBaseVNode("button", {
							class: "iqxin-enterBtn",
							onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("save", text.value))
						}, "保存")
					])
				]);
			};
		}
	};
	var _hoisted_1 = ["id", "data-sej-drag-el"];
	var _hoisted_2 = [
		"data-xin",
		"data-iqxintitle",
		"title",
		"onPointerdown",
		"onClick"
	];
	var _hoisted_3 = { class: "iqxin-pointer-events" };
	var _hoisted_4 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_5 = ["data-sej-drag-el"];
	var _hoisted_6 = [
		"data-sej-drag-el",
		"title",
		"onPointerdown",
		"onClick"
	];
	var _hoisted_7 = [
		"data-iqxintitle",
		"data-iqxinimg",
		"data-iqxinlink",
		"data-iqxintarget",
		"data-iqxindisabled"
	];
	var _hoisted_8 = ["src"];
	var _hoisted_9 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_10 = ["title", "onClick"];
	var _hoisted_11 = ["innerHTML"];
	var _hoisted_12 = {
		key: 2,
		class: "sej-copy-hint"
	};
	var _hoisted_13 = ["onKeydown"];
	var _hoisted_14 = { id: "btnEle" };
	var _hoisted_15 = { class: "btnEleLayer" };
	var _hoisted_16 = { class: "sej-footer-options" };
	var _hoisted_17 = {
		id: "xin-selectSearch",
		title: "划词搜索"
	};
	var _hoisted_18 = {
		id: "xin-transtion",
		title: "动画"
	};
	var _hoisted_19 = {
		id: "iqxin-fixedTopS",
		title: "固定到顶端"
	};
	var _hoisted_20 = {
		id: "iqxin-fixedTopUpward",
		title: "仅上拉显示"
	};
	var _hoisted_21 = {
		id: "xin-HideTheSameLink",
		title: "隐藏同站链接"
	};
	var _hoisted_22 = { class: "sej-footer-bar" };
	var _hoisted_23 = { class: "sej-footer-selects" };
	var _hoisted_24 = {
		id: "xin-centerDisplay",
		title: "居中显示"
	};
	var _hoisted_25 = { class: "sej-footer-actions" };
	var UNDO_DURATION = 5e3;
	var AUTOSAVE_DELAY = 500;
	var DRAG_ANIMATION_MS = 160;
	var DRAG_THRESHOLD = 4;
	var DRAG_EDGE = 40;
	var _sfc_main$2 = {
		__name: "SettingPanel",
		setup(__props) {
			const settings = useSettings();
			const source = computed(() => settings.settingData);
			const OPTION_KEYS = [
				"fixedTop",
				"fixedTopUpward",
				"HideTheSameLink",
				"center",
				"transtion",
				"selectSearch"
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
						_id: nextId()
					}))
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
					cat.enabled
				]);
				const engineList = {};
				for (const cat of draft.categories) engineList[cat.key] = cat.engines.map((engine) => {
					const item = {
						name: engine.name,
						url: engine.url
					};
					if (engine.favicon) item.favicon = engine.favicon;
					if (engine.faviconData) item.faviconData = engine.faviconData;
					if (engine.target === "_self") item.target = "_self";
					if (engine.disable) item.disable = true;
					return item;
				});
				return {
					engineCategories,
					engineList
				};
			}
			function buildResult() {
				const result = {};
				for (const key of OPTION_KEYS) result[key] = draft[key];
				Object.assign(result, buildEngineData());
				return result;
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
				if (backend === "memory") {
					showToast("自动保存失败：存储不可用，请用“配置文件”复制备份", 5e3);
					return;
				}
				settingsChanged = true;
				if (backend === "local" && !autosaveWarnedLocal) {
					autosaveWarnedLocal = true;
					showToast("已自动保存（当前仅本网站生效）", 3e3);
				}
			}
			function scheduleAutoSave() {
				if (saving.value) return;
				autosaveQueued = true;
				clearTimeout(autosaveTimer);
				autosaveTimer = setTimeout(flushAutoSave, AUTOSAVE_DELAY);
			}
			watch(() => OPTION_KEYS.map((key) => draft[key]), () => scheduleAutoSave());
			function refreshDraft() {
				const next = makeDraft();
				for (const key of OPTION_KEYS) draft[key] = next[key];
				draft.categories.splice(0, draft.categories.length, ...next.categories);
			}
			function trySyncFromRemote() {
				if (saving.value) return;
				const hasLocalChanges = !isSameValue(buildResult(), source.value);
				if (engineDialog.value || categoryDialog.value || configOpen.value || hasLocalChanges) {
					showToast("其他页面已更新设置，当前有未保存修改", 6e3, {
						label: "同步",
						onClick: forceSyncFromRemote
					});
					return;
				}
				if (!settings.reload()) return;
				refreshDraft();
				remoteSynced = true;
				showToast("已同步其他页面保存的设置", 3e3);
			}
			function forceSyncFromRemote() {
				engineDialog.value = null;
				categoryDialog.value = null;
				configOpen.value = false;
				cancelAutoSave();
				settings.reload();
				refreshDraft();
				remoteSynced = true;
				showToast("已同步其他页面保存的设置", 3e3);
			}
			watch(() => ui.settingsRevision, trySyncFromRemote);
			async function save() {
				if (saving.value) return;
				cancelAutoSave();
				saving.value = true;
				try {
					if (!isSameValue(buildResult(), source.value)) {
						const backend = settings.applySettings(buildResult());
						if (backend === "memory") {
							showToast("保存失败：存储不可用，请用“配置文件”复制备份", 5e3);
							return;
						}
						settingsChanged = true;
						if (backend === "local") showToast("已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）", 4e3);
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
					showToast("没有需要加载的图标");
					return;
				}
				loadingIcons.value = true;
				try {
					showToast(`正在内嵌 ${pending} 个图标…`, 6e4);
					const { converted, failed } = await embedRemoteFavicons();
					const parts = [];
					if (converted) parts.push(`已内嵌 ${converted} 个图标`);
					if (!converted && !failed) parts.push("没有可加载的图标");
					else if (failed) parts.push(`${failed} 个获取失败`);
					if (converted) {
						scheduleAutoSave();
						showToast(`${parts.join("，")}，已自动保存`, 4e3);
					} else showToast(parts.join("，"), 4e3);
				} finally {
					loadingIcons.value = false;
				}
			}
			function reset() {
				if (confirm("将会删除用户设置！")) {
					cancelAutoSave();
					remoteSynced = false;
					deleteValue(STORAGE_KEY);
					location.reload();
				}
			}
			let closeTimer = null;
			let closed = false;
			let remoteSynced = false;
			function finishClose() {
				if (closed) return;
				closed = true;
				clearTimeout(closeTimer);
				closeTimer = null;
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
				if (e.target !== maskEl.value || e.propertyName !== "opacity") return;
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
				showToast(category.enabled ? "启用" : "隐藏");
			}
			function toggleEngine(ci, ei) {
				const engine = draft.categories[ci].engines[ei];
				engine.disable = !engine.disable;
				scheduleAutoSave();
				showToast(engine.disable ? "隐藏" : "启用");
			}
			function pushUndo(entry) {
				undoStack.push(entry);
				if (undoStack.length > 20) undoStack.shift();
			}
			function undoDelete() {
				if (engineDialog.value || categoryDialog.value || configOpen.value) {
					showToast("请先关闭当前对话框");
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
						showToast("无法撤销：分类已不存在");
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
				pushUndo({
					...entry,
					label
				});
				showToast(`已删除${label}`, UNDO_DURATION, {
					label: "撤销",
					onClick: undoDelete
				});
			}
			function deleteCategory(index) {
				const category = draft.categories[index];
				if (!category) return;
				notifyDeleted({
					type: "category",
					index,
					item: JSON.parse(JSON.stringify(category))
				}, `分类「${category.name}」`);
				draft.categories.splice(index, 1);
				scheduleAutoSave();
			}
			function deleteEngine(ci, ei) {
				const category = draft.categories[ci];
				const engine = category?.engines?.[ei];
				if (!engine) return;
				notifyDeleted({
					type: "engine",
					categoryKey: category.key,
					index: ei,
					item: JSON.parse(JSON.stringify(engine))
				}, `「${engine.name}」`);
				category.engines.splice(ei, 1);
				scheduleAutoSave();
			}
			function onKeydown(e) {
				if (!(e.ctrlKey || e.metaKey) || e.shiftKey || e.altKey) return;
				if (e.key.toLowerCase() !== "z") return;
				if (!undoStack.length) return;
				const target = e.composedPath?.()[0] || e.target;
				if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA" || target?.isContentEditable) return;
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
					const nextName = name || "空";
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
			const copyTargetCi = ref(null);
			const dragAnimations = new WeakMap();
			let dragSnapshot = null;
			let dragDropped = false;
			let pressCtx = null;
			let ghostEl = null;
			let ghostOffset = {
				x: 0,
				y: 0
			};
			let suppressClick = false;
			let scrollFrame = 0;
			function dragElements() {
				const root = layerEl.value;
				return root ? Array.from(root.querySelectorAll("[data-sej-drag-el]")) : [];
			}
			function snapshotRects() {
				const rects = new Map();
				for (const el of dragElements()) rects.set(el.dataset.sejDragEl, el.getBoundingClientRect());
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
			async function animateReorder(mutate) {
				const reduceMotion = !draft.transtion || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
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
						duration: DRAG_ANIMATION_MS,
						easing: "cubic-bezier(0.2, 0, 0, 1)"
					});
					dragAnimations.set(el, animation);
					animation.addEventListener("finish", () => {
						if (dragAnimations.get(el) === animation) dragAnimations.delete(el);
					});
				}
			}
			function captureOrder() {
				return {
					categories: draft.categories.map((category) => category._id),
					engines: Object.fromEntries(draft.categories.map((category) => [category._id, category.engines.map((engine) => engine._id)]))
				};
			}
			function restoreOrder(snapshot) {
				const categories = new Map(draft.categories.map((category) => [category._id, category]));
				const engines = new Map();
				for (const category of draft.categories) for (const engine of category.engines) engines.set(engine._id, engine);
				animateReorder(() => {
					for (const category of draft.categories) {
						const ids = snapshot.engines[category._id] || [];
						category.engines.splice(0, category.engines.length, ...ids.map((id) => engines.get(id)).filter(Boolean));
					}
					const ordered = snapshot.categories.map((id) => categories.get(id)).filter(Boolean);
					draft.categories.splice(0, draft.categories.length, ...ordered);
				});
				dragCtx.value = null;
			}
			function sourceElement(type, ci, ei) {
				if (type === "category") return categoryCards()[ci] || null;
				const card = categoryCards()[ci];
				if (!card) return null;
				return card.querySelectorAll(":scope > .sejcon > .drag")[ei] || null;
			}
			function onDragPointerDown(e, type, ci, ei = null) {
				resetStaleDrag();
				suppressClick = false;
				if (e.button !== 0) return;
				if (e.target?.closest?.(".iqxin-set-toggle")) return;
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
					started: false
				};
				document.addEventListener("pointermove", onDragPointerMove);
				document.addEventListener("pointerup", onDragPointerUp);
				document.addEventListener("pointercancel", onDragPointerCancel);
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
				} else finishPress();
			}
			function detachDragListeners() {
				document.removeEventListener("pointermove", onDragPointerMove);
				document.removeEventListener("pointerup", onDragPointerUp);
				document.removeEventListener("pointercancel", onDragPointerCancel);
			}
			function beginDrag() {
				const p = pressCtx;
				const category = draft.categories[p.ci];
				if (!category) return false;
				const item = p.type === "category" ? category : category.engines[p.ei];
				if (!item) return false;
				const rect = p.sourceEl.getBoundingClientRect();
				ghostOffset = {
					x: p.x - rect.left,
					y: p.y - rect.top
				};
				dragSnapshot = captureOrder();
				dragDropped = false;
				copyTargetCi.value = null;
				const ghost = p.sourceEl.cloneNode(true);
				ghost.removeAttribute("id");
				ghost.removeAttribute("data-sej-drag-el");
				ghost.querySelectorAll("[data-sej-drag-el]").forEach((el) => {
					el.removeAttribute("data-sej-drag-el");
				});
				ghost.classList.remove("sej-drag-placeholder");
				ghost.classList.add("sej-drag-ghost", `sej-drag-ghost-${p.type}`);
				ghost.style.width = `${rect.width}px`;
				ghost.style.height = `${rect.height}px`;
				(layerEl.value || p.sourceEl.getRootNode()).appendChild(ghost);
				ghostEl = ghost;
				dragCtx.value = {
					type: p.type,
					ci: p.ci,
					ei: p.ei,
					key: p.type === "category" ? category.key : item._id
				};
				p.started = true;
				positionGhost(p.x, p.y);
				startAutoScroll();
				return true;
			}
			function positionGhost(x, y) {
				if (!ghostEl) return;
				ghostEl.style.transform = `translate3d(${x - ghostOffset.x}px, ${y - ghostOffset.y}px, 0)`;
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
					const add = cards[i].querySelector(":scope > .sejcon > .iqxin-additem");
					if (!add) continue;
					const rect = layoutRect(add);
					if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return i;
				}
				return -1;
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
					...JSON.parse(JSON.stringify(source)),
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
						showToast(`已复制「${source.name}」`);
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
				stopAutoScroll();
				if (ghostEl) {
					ghostEl.remove();
					ghostEl = null;
				}
				if (pressCtx?.sourceEl) pressCtx.sourceEl.classList.remove("sej-drag-placeholder");
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
							if (y < rect.top + DRAG_EDGE && y >= rect.top - DRAG_EDGE) dy = -Math.ceil((rect.top + DRAG_EDGE - y) / DRAG_EDGE * 14);
							else if (y > rect.bottom - DRAG_EDGE && y <= rect.bottom + DRAG_EDGE) dy = Math.ceil((y - rect.bottom + DRAG_EDGE) / DRAG_EDGE * 14);
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
				if (!ctx || ctx.type !== "category" || ctx.ci === index) return;
				const category = draft.categories[ctx.ci];
				if (!category) return;
				animateReorder(() => {
					draft.categories.splice(ctx.ci, 1);
					draft.categories.splice(index, 0, category);
					ctx.ci = index;
				});
			}
			function settingsBody() {
				return layerEl.value?.querySelector("#sej-settings-body") || null;
			}
			function categoryCards() {
				const body = settingsBody();
				return body ? Array.from(body.querySelectorAll(".iqxin-items[data-sej-drag-el^=\"category-\"]")) : [];
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
					bottom: top + height
				};
			}
			function categoryIndexAt(x, y) {
				const cards = categoryCards();
				for (let i = 0; i < cards.length; i++) {
					const rect = layoutRect(cards[i]);
					if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) return i;
				}
				return -1;
			}
			function engineInsertIndex(card, y) {
				const items = Array.from(card.querySelectorAll(":scope > .sejcon > .drag"));
				for (let i = 0; i < items.length; i++) {
					const rect = layoutRect(items[i]);
					if (y < rect.top + rect.height / 2) return i;
				}
				return items.length;
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
				animateReorder(() => {
					source.engines.splice(from, 1);
					target.engines.splice(insert, 0, engine);
					ctx.ci = ci;
					ctx.ei = insert;
				});
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
				if (!engine.name || !engine.url) {
					alert("标题和链接必填");
					return;
				}
				engineSaving.value = true;
				try {
					const list = draft.categories[ctx.ci].engines;
					const existing = ctx.mode === "edit" ? list[ctx.ei] : null;
					const original = engine.favicon;
					const embedded = /^data:/i.test(engine.faviconData || "") ? engine.faviconData : existing?.faviconData && existing.favicon === original ? existing.faviconData : await embedFavicon(original);
					const next = ctx.mode === "add" ? {
						...engine,
						_id: nextId()
					} : {
						...existing,
						...engine
					};
					next.favicon = original;
					if (embedded !== original) next.faviconData = embedded;
					else delete next.faviconData;
					if (ctx.mode === "add") list.push(next);
					else list[ctx.ei] = next;
					engineDialog.value = null;
					scheduleAutoSave();
				} finally {
					engineSaving.value = false;
				}
			}
			function createCategoryKey() {
				const base = "user" + Date.now();
				let key = base;
				let index = 1;
				while (draft.categories.some((category) => category.key === key)) key = `${base}-${index++}`;
				return key;
			}
			async function addCategory() {
				draft.categories.push({
					_id: nextId(),
					name: "新分类",
					key: createCategoryKey(),
					enabled: true,
					engines: []
				});
				scheduleAutoSave();
				await nextTick();
				const body = layerEl.value?.querySelector("#sej-settings-body");
				if (body) body.scrollTop = body.scrollHeight;
			}
			function isOnline() {
				if (online.value) return;
				const img = new Image();
				img.src = "https://www.google.com/s2/favicons?domain=www.baidu.com&" + Math.random();
				setTimeout(() => {
					if (img.width) online.value = true;
					else img.src = void 0;
				}, 2e3);
			}
			function getICON(olink) {
				const link = olink || "";
				let protocol;
				let host;
				if (link.indexOf("://") !== -1) {
					protocol = link.split("://")[0] || "https";
					host = link.split("://")[1].split("/")[0];
				} else {
					protocol = "https";
					host = link.split("/")[0];
				}
				const siteURL = protocol + "://" + host;
				const iconSetting = ui.iconSource;
				let ourl;
				if (isNaN(iconSetting)) ourl = iconSetting;
				else {
					const mark = parseInt(iconSetting);
					if (mark === 1) ourl = siteURL + "/favicon.ico";
					else if (mark === 2) ourl = "https://www.google.com/s2/favicons?domain=" + siteURL;
					else if (mark === 3) ourl = "https://statics.dnspod.cn/proxy_favicon/_/favicon?domain=" + host;
				}
				if (ourl) return ourl.replace("%s", siteURL);
				if (online.value) return "https://www.google.com/s2/favicons?domain=" + host;
				return protocol + "://" + host + "/favicon.ico";
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
						alert("JSON 解析失败");
						return;
					}
					cancelAutoSave();
					remoteSynced = false;
					settings.applySettings(parsed);
					setTimeout(requestRestart, 0);
				} else reset();
			}
			const dragging = ref(false);
			let dragOffset = {
				x: 0,
				y: 0
			};
			function onDragMove(e) {
				layerStyle.value = {
					left: e.clientX - dragOffset.x + "px",
					top: e.clientY - dragOffset.y + "px",
					margin: 0
				};
			}
			function stopDrag() {
				dragging.value = false;
				document.removeEventListener("mousemove", onDragMove);
				document.removeEventListener("mouseup", stopDrag);
			}
			function startDrag(e) {
				const el = layerEl.value;
				dragOffset = {
					x: e.clientX - el.offsetLeft,
					y: e.clientY - el.offsetTop
				};
				dragging.value = true;
				document.addEventListener("mousemove", onDragMove);
				document.addEventListener("mouseup", stopDrag);
			}
			onMounted(() => {
				document.body.style.overflow = "hidden";
				document.addEventListener("keydown", onKeydown);
				window.addEventListener("blur", onWindowBlur);
				isOnline();
				nextTick(() => {
					maskVisible.value = true;
				});
			});
			onBeforeUnmount(() => {
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
				document.body.style.overflow = "auto";
				document.removeEventListener("keydown", onKeydown);
				window.removeEventListener("blur", onWindowBlur);
				clearTimeout(closeTimer);
				document.removeEventListener("mousemove", onDragMove);
				document.removeEventListener("mouseup", stopDrag);
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
					style: normalizeStyle(layerStyle.value),
					onClick: _cache[10] || (_cache[10] = withModifiers(() => {}, ["stop"]))
				}, [
					createBaseVNode("div", {
						class: "sej-panel-header",
						onMousedown: startDrag
					}, [_cache[11] || (_cache[11] = createBaseVNode("span", { class: "sej-panel-title" }, "搜索跳转设置", -1)), createBaseVNode("button", {
						type: "button",
						class: "sej-panel-close",
						title: "关闭",
						"aria-label": "关闭",
						onClick: withModifiers(close, ["stop"]),
						onMousedown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, "✕", 32)], 32),
					createBaseVNode("div", {
						id: "sej-settings-body",
						onDragstart: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(draft.categories, (category, ci) => {
						return openBlock(), createElementBlock("div", {
							id: category.key,
							key: category._id,
							class: normalizeClass(["iqxin-items", {
								"sej-category-hidden": !category.enabled,
								"sej-drag-placeholder": dragCtx.value?.type === "category" && dragCtx.value.key === category.key
							}]),
							"data-sej-drag-el": "category-" + category._id
						}, [createBaseVNode("div", {
							class: "sejtitle drag",
							"data-xin": category.enabled ? 1 : -1,
							"data-iqxintitle": category.key,
							title: `编辑分类：${category.name}`,
							onPointerdown: ($event) => onDragPointerDown($event, "category", ci),
							onClick: withModifiers(($event) => openCategoryDialog(ci), ["stop"])
						}, [createBaseVNode("span", _hoisted_3, toDisplayString(category.name), 1), createBaseVNode("span", {
							class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": !category.enabled }]),
							title: category.enabled ? "隐藏" : "显示",
							onClick: withModifiers(($event) => toggleCategory(ci), ["stop"]),
							innerHTML: category.enabled ? unref(EYE) : unref(EYE_OFF)
						}, null, 10, _hoisted_4)], 40, _hoisted_2), createBaseVNode("div", {
							class: "sejcon",
							"data-sej-drag-el": "list-" + category._id
						}, [(openBlock(true), createElementBlock(Fragment, null, renderList(category.engines, (engine, ei) => {
							return openBlock(), createElementBlock("span", {
								key: engine._id,
								class: normalizeClass(["drag", { "sej-drag-placeholder": dragCtx.value?.type === "engine" && dragCtx.value.key === engine._id }]),
								"data-sej-drag-el": "engine-" + engine._id,
								title: `编辑：${engine.name}`,
								onPointerdown: ($event) => onDragPointerDown($event, "engine", ci, ei),
								onClick: withModifiers(($event) => editEngine(ci, ei), ["stop"])
							}, [createBaseVNode("span", {
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
							}, null, 8, _hoisted_8), createBaseVNode("span", null, toDisplayString(engine.name), 1)], 8, _hoisted_7), createBaseVNode("span", {
								class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": engine.disable }]),
								title: engine.disable ? "显示" : "隐藏",
								onClick: withModifiers(($event) => toggleEngine(ci, ei), ["stop"]),
								innerHTML: engine.disable ? unref(EYE_OFF) : unref(EYE)
							}, null, 10, _hoisted_9)], 42, _hoisted_6);
						}), 128)), createBaseVNode("span", {
							class: normalizeClass(["iqxin-additem", { "sej-copy-target": copyTargetCi.value === ci }]),
							title: copyTargetCi.value === ci ? "复制一份到此类别" : "添加搜索引擎",
							onClick: withModifiers(($event) => addEngine(ci), ["stop"])
						}, [copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: "sej-copy-icon",
							innerHTML: unref(COPY)
						}, null, 8, _hoisted_11)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode("+")], 64)), copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", _hoisted_12, "复制一份到此类别")) : createCommentVNode("", true)], 10, _hoisted_10)], 8, _hoisted_5)], 10, _hoisted_1);
					}), 128)), createBaseVNode("div", {
						class: "iqxin-items sej-add-category-card",
						role: "button",
						tabindex: "0",
						title: "添加列表",
						"aria-label": "添加列表",
						onClick: addCategory,
						onKeydown: [withKeys(addCategory, ["enter"]), withKeys(withModifiers(addCategory, ["prevent"]), ["space"])]
					}, [..._cache[12] || (_cache[12] = [createBaseVNode("span", { class: "sej-add-category-plus" }, "+", -1)])], 40, _hoisted_13)], 32),
					createBaseVNode("div", _hoisted_14, [createBaseVNode("div", _hoisted_15, [createBaseVNode("div", _hoisted_16, [
						createBaseVNode("span", {
							id: "xin-modification",
							title: "配置文件",
							onClick: openConfig
						}, "配置文件"),
						createBaseVNode("span", _hoisted_17, [createBaseVNode("label", null, [_cache[13] || (_cache[13] = createTextVNode("划词搜索", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => draft.selectSearch = $event)
						}, null, 512), [[vModelCheckbox, draft.selectSearch]])])]),
						createBaseVNode("span", _hoisted_18, [createBaseVNode("label", null, [_cache[14] || (_cache[14] = createTextVNode("动画", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => draft.transtion = $event)
						}, null, 512), [[vModelCheckbox, draft.transtion]])])]),
						createBaseVNode("span", _hoisted_19, [createBaseVNode("label", null, [_cache[15] || (_cache[15] = createTextVNode("固定到顶端", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => draft.fixedTop = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTop]])])]),
						withDirectives(createBaseVNode("span", _hoisted_20, [createBaseVNode("label", null, [_cache[16] || (_cache[16] = createTextVNode("仅上拉显示", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => draft.fixedTopUpward = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTopUpward]])])], 512), [[vShow, draft.fixedTop]]),
						createBaseVNode("span", _hoisted_21, [createBaseVNode("label", null, [_cache[17] || (_cache[17] = createTextVNode("隐藏同站链接", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => draft.HideTheSameLink = $event)
						}, null, 512), [[vModelCheckbox, draft.HideTheSameLink]])])])
					]), createBaseVNode("div", _hoisted_22, [
						createBaseVNode("div", _hoisted_23, [createBaseVNode("span", _hoisted_24, [_cache[19] || (_cache[19] = createTextVNode(" 居中： ", -1)), withDirectives(createBaseVNode("select", { "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => draft.center = $event) }, [..._cache[18] || (_cache[18] = [createBaseVNode("option", { value: 0 }, "默认", -1), createBaseVNode("option", { value: 1 }, "强制居中", -1)])], 512), [[
							vModelSelect,
							draft.center,
							void 0,
							{ number: true }
						]])]), createBaseVNode("span", {
							id: "xin-loadIcons",
							title: "把所有远程图标内嵌为 data 链接",
							class: normalizeClass({ "sej-loading": loadingIcons.value }),
							onClick: loadAllIcons
						}, toDisplayString(loadingIcons.value ? "加载中…" : "加载所有图标缓存"), 3)]),
						_cache[20] || (_cache[20] = createStaticVNode("<div class=\"sej-footer-links\"><span class=\"feedback\" title=\"在 GreasyFork 进行反馈\"><a target=\"_blank\" href=\"https://greasyfork.org/zh-CN/users/1238054\">Greasy Fork</a></span><span class=\"feedback\" title=\"在 Github 进行反馈\"><a target=\"_blank\" href=\"https://github.com/sherlocknieh/Monkey-Scripts\">GitHub</a></span></div>", 1)),
						createBaseVNode("div", _hoisted_25, [createBaseVNode("span", {
							id: "xin-save",
							title: "关闭",
							class: normalizeClass({ "sej-saving": saving.value }),
							onClick: save
						}, toDisplayString(saving.value ? "关闭中…" : "关闭"), 3)])
					])])]),
					engineDialog.value ? (openBlock(), createBlock(_sfc_main$5, {
						key: 0,
						mode: engineDialog.value.mode,
						initial: engineDialog.value.initial,
						busy: engineSaving.value,
						"resolve-icon": getICON,
						onSubmit: submitEngine,
						onDelete: deleteEngineFromDialog,
						onCancel: cancelEngineDialog
					}, null, 8, [
						"mode",
						"initial",
						"busy"
					])) : createCommentVNode("", true),
					categoryDialog.value ? (openBlock(), createBlock(_sfc_main$4, {
						key: 1,
						name: draft.categories[categoryDialog.value.index]?.name || "",
						onSubmit: submitCategory,
						onDelete: deleteCategoryFromDialog,
						onCancel: cancelCategoryDialog
					}, null, 8, ["name"])) : createCommentVNode("", true),
					configOpen.value ? (openBlock(), createBlock(_sfc_main$3, {
						key: 2,
						"initial-text": configText.value,
						onSave: saveConfig,
						onReset: reset,
						onClose: _cache[8] || (_cache[8] = ($event) => configOpen.value = false),
						onCopy: _cache[9] || (_cache[9] = ($event) => unref(showToast)("复制成功")),
						onNotify: unref(showToast)
					}, null, 8, ["initial-text", "onNotify"])) : createCommentVNode("", true)
				], 4)], 36);
			};
		}
	};
	var _sfc_main$1 = {
		__name: "Toast",
		setup(__props) {
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
					createVNode(_sfc_main$6),
					unref(ui).settingPanelOpen ? (openBlock(), createBlock(_sfc_main$2, { key: 0 })) : createCommentVNode("", true),
					createVNode(_sfc_main$1)
				], 64);
			};
		}
	};
	var global_default = "/* ==UserStyle==\n@name           SearchEngineJumpPlusGlobalStyle\n@description    Global style for SearchEngineJumpPlus\n@version        5.32.0\n@namespace      https://greasyfork.org/en/scripts/454280-searchenginejumpplus\n@license        MIT\n@author         MUTED64\n==/UserStyle== */\n\n#settingLayerMask {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  inset: 0;\n  background-color: rgba(16, 18, 22, 0.42);\n  backdrop-filter: blur(12px);\n  z-index: 200000000;\n  overflow: auto;\n  font-family: var(--sej-font-family);\n  min-height: 100%;\n  font-size: 14px;\n  transition: opacity 0.15s ease-out;\n  opacity: 0;\n  animation: sej-setting-mask-in 0.15s ease;\n  user-select: none;\n  -moz-user-select: none;\n  padding-bottom: 80px;\n  box-sizing: border-box;\n  color: var(--font-color-qxin);\n}\n#settingLayer {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  --sej-panel-pad-x: 20px;\n  --sej-panel-pad-top: 16px;\n  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;\n  background-color: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 16px;\n  box-shadow: var(--sej-panel-shadow);\n  position: absolute;\n  width: auto;\n  min-width: min(720px, calc(100vw - 32px));\n  max-width: min(960px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  margin: 0;\n  overflow: visible;\n  animation: sej-panel-in 0.16s ease-out;\n}\n@keyframes sej-panel-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px) scale(0.99);\n  }\n}\n.sej-panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex: 0 0 auto;\n  padding: 0 2px 12px;\n  cursor: move;\n}\n.sej-panel-title {\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n.sej-panel-close {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--sej-surface-hover);\n  color: transparent;\n  font-size: 0;\n  line-height: 0;\n  cursor: pointer;\n  opacity: 1;\n  transition: background-color 0.12s ease-out, opacity 0.12s ease-out;\n}\n.sej-panel-close::before,\n.sej-panel-close::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 12px;\n  height: 1.5px;\n  border-radius: 2px;\n  background: var(--font-color-qxin);\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n.sej-panel-close::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n.iqxin-items {\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 220px;\n  width: 220px;\n  min-width: 0;\n  max-width: 220px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 6px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color-sej);\n  background: var(--sej-surface-2);\n}\n.sej-add-category-card {\n  align-items: center;\n  justify-content: center;\n  min-height: 140px;\n  background: transparent;\n  border: 1px dashed var(--sej-checkbox-border);\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.sej-add-category-card:hover {\n  background: var(--sej-surface-hover);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-add-category-card:focus-visible {\n  background: var(--sej-surface-hover);\n  outline: 2px solid var(--sej-accent);\n  outline-offset: 2px;\n}\n.sej-add-category-plus {\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1;\n  opacity: 0.45;\n  transition: opacity 0.12s ease-out;\n}\n.sej-add-category-card:hover .sej-add-category-plus {\n  opacity: 1;\n}\n.sejcon {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n}\n.sejcon > .drag {\n  flex: 0 0 auto;\n}\n#settingLayer .drag {\n  display: block;\n  position: relative;\n}\n/* 拖动排序：源元素隐藏但保留占位，目标位置只空出空白 */\n#settingLayer .sej-drag-placeholder,\n#settingLayer .sej-drag-placeholder * {\n  visibility: hidden !important;\n}\n#settingLayer .sejtitle:active,\n#settingLayer .sejcon > .drag:active {\n  cursor: grabbing;\n}\n.sej-drag-ghost {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  margin: 0 !important;\n  z-index: 200000200;\n  opacity: 1 !important;\n  pointer-events: none;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: transform;\n}\n.sej-drag-ghost * {\n  pointer-events: none !important;\n}\n.sej-drag-ghost-engine {\n  border-radius: 8px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);\n}\n.sej-drag-ghost-category {\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);\n}\n#settingLayer .sej-engine {\n  padding: 0 36px 0 8px;\n  width: 100%;\n  height: 30px;\n  box-sizing: border-box;\n  border-radius: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n#settingLayer .sej-engine > span {\n  flex: 0 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.iqxin-pointer-events,\n.sej-engine-icon,\n#settingLayer .sej-engine * {\n  pointer-events: none;\n}\n.sejtitle {\n  text-align: left;\n  /* 左侧与引擎条目对齐，右侧避开显隐按钮 */\n  padding: 5px 36px 5px 8px;\n  margin-bottom: 2px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.5;\n  border-radius: 8px;\n}\n/* 标题下方的细分隔线，用于和引擎条目区分 */\n.sejtitle::after {\n  content: \"\";\n  position: absolute;\n  left: 8px;\n  right: 8px;\n  bottom: 0;\n  height: 1px;\n  background: var(--border-color-sej);\n  pointer-events: none;\n}\n#settingLayerMask [data-xin] {\n  margin: 1px 0;\n  border-radius: 8px;\n}\n.sejcon [data-xin] {\n  cursor: pointer;\n}\n/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */\n#settingLayerMask [data-iqxindisabled=\"true\"],\n[data-xin^=\"-\"] {\n  background-color: transparent;\n  color: var(--font-color-qxin);\n  transition: background-color 0.12s ease-out;\n}\n#settingLayerMask [data-iqxindisabled=\"true\"] > span,\n#settingLayerMask [data-iqxindisabled=\"true\"] .sej-engine-icon,\n[data-xin^=\"-\"] > .iqxin-pointer-events {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */\n.sej-category-hidden .sej-engine > span,\n.sej-category-hidden .sej-engine .sej-engine-icon,\n.sej-category-hidden .iqxin-additem {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n#settingLayerMask .sej-engine:hover {\n  background-color: var(--sej-surface-hover);\n}\n#settingLayerMask [data-iqxindisabled=\"true\"]:hover,\n[data-xin^=\"-\"]:hover {\n  background-color: transparent;\n}\n.sej-category-hidden .sej-engine:hover {\n  background-color: transparent;\n}\n#settingLayerMask label {\n  cursor: pointer;\n}\n#settingLayerMask .sej-engine-icon {\n  vertical-align: middle;\n}\n#btnEle {\n  position: relative;\n  width: 100%;\n  background: transparent;\n  border-radius: 0;\n  flex: 0 0 auto;\n}\n#btnEle {\n  margin-top: 10px;\n}\n#btnEle span {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  box-sizing: border-box;\n  min-height: 30px;\n  background: var(--sej-surface-2);\n  border: 1px solid transparent;\n  margin: 0;\n  color: var(--font-color-qxin);\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out, opacity 0.12s ease-out;\n}\n#btnEle label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: inherit;\n}\n#btnEle #xin-centerDisplay {\n  gap: 2px;\n  padding-right: 4px;\n}\n#btnEle span:hover {\n  background: var(--sej-surface-hover);\n  color: var(--font-color-qxin);\n}\n#btnEle a {\n  color: var(--font-color-qxin);\n  opacity: 0.7;\n  text-decoration: none;\n  font-family: inherit;\n  transition: opacity 0.12s ease-out, color 0.12s ease-out;\n}\n#btnEle a:hover {\n  opacity: 1;\n  color: var(--sej-accent);\n}\n#btnEle .feedback {\n  background: transparent;\n  border-color: transparent;\n  padding: 4px 6px;\n}\n#btnEle .feedback:hover {\n  background: transparent;\n  border-color: transparent;\n  color: var(--sej-accent);\n}\n#btnEle > div {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  box-sizing: border-box;\n}\n#btnEle > div.btnEleLayer {\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: stretch;\n  background: transparent;\n  border-radius: 0;\n  border-top: 1px solid var(--border-color-sej);\n  padding-top: 12px;\n  gap: 8px;\n}\n.sej-footer-options,\n.sej-footer-bar,\n.sej-footer-selects,\n.sej-footer-links,\n.sej-footer-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.sej-footer-options {\n  gap: 8px;\n}\n.sej-footer-bar {\n  gap: 8px 12px;\n}\n.sej-footer-selects {\n  gap: 8px;\n}\n.sej-footer-links {\n  gap: 0;\n  margin-left: auto;\n}\n.sej-footer-actions {\n  margin-left: 4px;\n}\n#btnEle #xin-save {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n#btnEle #xin-save:hover {\n  background: var(--sej-accent);\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n#btnEle #xin-save.sej-saving {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.sej-loading {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.iqxin-btn-active {\n  background: var(--sej-accent-weak);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"] {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: -3px;\n  margin: 0 !important;\n  padding: 0;\n  position: relative;\n  border: 1.5px solid var(--sej-checkbox-border);\n  border-radius: 5px;\n  background: var(--sej-input-bg);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out;\n}\n#settingLayerMask input[type=\"checkbox\"]:before {\n  content: none;\n}\n#settingLayerMask input[type=\"checkbox\"]:checked {\n  background: var(--sej-accent);\n  border-color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"]:checked:after {\n  content: \"\";\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  width: 4px;\n  height: 8px;\n  border: solid var(--sej-accent-contrast);\n  border-width: 0 2px 2px 0;\n  background: none;\n  transform: rotate(45deg);\n}\n.drop-over {\n  opacity: 0.6;\n}\n.iqxin-set-toggle {\n  opacity: 0.6;\n  position: absolute;\n  background: transparent;\n  /* 用上下外边距 auto 垂直居中，避免 transform 让按钮单独成为合成层 */\n  top: 0;\n  bottom: 0;\n  height: fit-content;\n  margin-top: auto;\n  margin-bottom: auto;\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: opacity 0.12s ease-out, background-color 0.12s ease-out,\n    color 0.12s ease-out;\n  right: 8px;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n}\n.iqxin-set-toggle svg {\n  display: block;\n}\n.iqxin-set-toggle.iqxin-set-hidden {\n  opacity: 0.35;\n}\n.iqxin-set-toggle:hover {\n  opacity: 1;\n  background: var(--sej-surface-hover);\n}\nspan.iqxin-additem {\n  display: inline-block;\n  position: relative;\n  text-align: center;\n  width: 100%;\n  box-sizing: border-box;\n  margin: auto 0 2px;\n  padding: 5px 0;\n  border: 1px dashed var(--sej-checkbox-border);\n  border-radius: 8px;\n  color: var(--font-color-qxin);\n  opacity: 0.55;\n  cursor: pointer;\n  visibility: visible;\n  transition: opacity 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\nspan.iqxin-additem:hover {\n  opacity: 1;\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\nspan.iqxin-additem.sej-copy-target {\n  opacity: 1;\n  border-style: solid;\n  border-color: var(--sej-accent);\n  background: var(--sej-accent-weak);\n  color: var(--sej-accent);\n}\n.sej-copy-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  line-height: 1;\n}\n.sej-copy-icon svg {\n  display: block;\n  width: 14px;\n  height: 14px;\n}\n.sej-copy-hint {\n  position: absolute;\n  left: 50%;\n  bottom: calc(100% + 6px);\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 3px 8px;\n  border-radius: 6px;\n  background: rgba(20, 22, 26, 0.82);\n  color: #fff;\n  font-size: 12px;\n  line-height: 1.5;\n  white-space: nowrap;\n  pointer-events: none;\n}\n#newSearchListBox,\n#newSearchBox,\n.sej-dialog-box {\n  position: fixed;\n  z-index: 200000100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: min(400px, calc(100vw - 32px));\n  box-sizing: border-box;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n  margin: 0;\n  transition: opacity 0.14s ease-out, transform 0.14s ease-out;\n}\n.sej-dialog-title {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.sej-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  font-size: 12px;\n}\n.sej-field > span {\n  opacity: 0.65;\n}\n.sej-field-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.sej-field-row input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-icon-preview-btn {\n  flex: 0 0 auto;\n  padding: 7px 12px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  background: var(--sej-btn-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  cursor: pointer;\n  transition: border-color 0.12s ease-out, color 0.12s ease-out;\n}\n.sej-icon-preview-btn:hover:not(:disabled) {\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-icon-preview-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sej-icon-preview {\n  flex: 0 0 auto;\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  border-radius: 4px;\n  background: var(--sej-surface-hover);\n}\n.sej-data-line {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n.sej-data-line input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-field-value {\n  color: var(--font-color-qxin);\n  opacity: 0.5;\n  font-size: 12px;\n}\n.sej-field-inline {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n.sej-dialog-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n#newSearchListBox input,\n#newSearchBox input,\n.sej-dialog-box input {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  border-radius: 8px;\n  outline: none;\n  color: var(--font-color-qxin);\n  background: var(--sej-input-bg);\n  font-family: inherit;\n  font-size: 13px;\n  transition: border-color 0.12s ease-out, box-shadow 0.12s ease-out;\n}\n#newSearchBox #iqxin-newTarget {\n  width: 100%;\n  border-radius: 8px;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  outline: none;\n}\n.iqxin-help-link {\n  color: var(--font-color-qxin);\n  opacity: 0.6;\n}\n#newSearchListBox input:focus,\n#newSearchBox input:focus,\n.sej-dialog-box input:focus {\n  background: var(--sej-input-bg);\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n.addItemBoxBtn {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.addItemBoxBtn:hover {\n  background: var(--sej-surface-hover);\n}\n.sej-dialog-danger {\n  margin-right: auto;\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n.sej-dialog-danger:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#xin-centerDisplay select {\n  height: 24px;\n  margin: -1px 0;\n  border: 1px solid transparent;\n  outline: none;\n  color: var(--font-color-qxin);\n  font-size: 13px;\n  font-family: inherit;\n  padding: 0 4px;\n  border-radius: 5px;\n  cursor: pointer;\n  text-decoration: none;\n  background: transparent;\n  transition: border-color 0.12s ease-out, background-color 0.12s ease-out;\n}\n#xin-centerDisplay select:hover {\n  background: var(--sej-surface-hover);\n}\n#xin-centerDisplay select:focus {\n  border-color: var(--sej-accent);\n  background: var(--sej-input-bg);\n}\n#xin-centerDisplay select option {\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n}\n.iqxin-closeBtn,\n.iqxin-enterBtn {\n  box-sizing: border-box;\n}\n.iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n.iqxin-enterBtn:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n.iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 200000100;\n  width: min(560px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n}\n#iqxin-editCodeBox p {\n  margin: 0;\n}\n#iqxin-editCodeBox button {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n#iqxin-editCodeBox button:hover {\n  background: var(--sej-surface-hover);\n}\n#iqxin-editCodeBox .iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n}\n#iqxin-editCodeBox .iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox textarea {\n  width: 100%;\n  box-sizing: border-box;\n  flex: 1 1 auto;\n  min-height: 240px;\n  padding: 10px;\n  overflow: auto;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 10px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 12px;\n  line-height: 1.5;\n  resize: vertical;\n  outline: none;\n}\n#iqxin-editCodeBox textarea:focus {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n#iqxin-editCodeBox .sej-file-input {\n  display: none;\n}\n.iqxin-warning {\n  color: var(--sej-danger);\n  font-size: 14px;\n  font-weight: 600;\n}\n#importingBox {\n  position: fixed;\n  width: min(350px, calc(100vw - 32px));\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding: 16px 24px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  color: var(--font-color-qxin);\n}\n#importingBox li {\n  margin: 5px;\n  border-bottom: 1px solid var(--border-color-sej);\n}\n#importingBox li p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.xin-importing-item {\n  cursor: pointer;\n}\n#setBtn {\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  width: 30px;\n  height: 30px;\n  flex: 0 0 auto;\n  padding: 0;\n  border-radius: 8px;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  display: flex;\n  opacity: 0.65;\n}\nspan#setBtn:hover {\n  opacity: 1;\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\nspan#setBtn:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#setBtn svg {\n  width: 16px;\n  height: 16px;\n  display: block;\n}\n#setBtn:focus-visible {\n  opacity: 1;\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n#sej-container {\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 2;\n  padding: 2px;\n  gap: 2px;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  transform-origin: top center;\n  animation: sejopen 0.14s ease-out;\n  color: var(--font-color-qxin);\n  background: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  width: max-content !important;\n  max-width: 100%;\n  box-sizing: border-box;\n  border-radius: var(--sej-radius-bar, 12px);\n  border: 1px solid var(--border-color-sej);\n  overflow: auto;\n  box-shadow: var(\n    --sej-shadow-bar,\n    0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)\n  );\n  height: fit-content;\n  flex-wrap: wrap;\n  justify-content: center;\n  user-select: none;\n}\n/* 给用户的提示 */\n#iqixn-global-tip {\n  box-sizing: content-box !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  opacity: 0;\n  height: 25px;\n  line-height: 25px;\n  letter-spacing: 1px;\n  font-size: 14px;\n  color: #fff;\n  padding: 5px 20px;\n  border-radius: 8px;\n  background-color: #666;\n  position: fixed;\n  z-index: 200000001;\n  left: 50%;\n  bottom: 5%;\n  transform: translate(-50%);\n  pointer-events: none;\n  transition: opacity 0.15s ease-out;\n}\n#iqixn-global-tip.sej-toast-visible {\n  pointer-events: auto;\n}\n#iqixn-global-tip .sej-toast-action {\n  pointer-events: auto;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 10px;\n  background: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  font: inherit;\n  letter-spacing: inherit;\n  line-height: 20px;\n  cursor: pointer;\n  transition: background-color 0.12s ease-out;\n}\n#iqixn-global-tip .sej-toast-action:hover {\n  background: rgba(255, 255, 255, 0.34);\n}\n/* 夜间模式 - 默认主题变量 */\n:root,\n:host,\nbody {\n  --font-color-qxin: #333;\n  --background-color-qxin: #fffffff0;\n  --background-avtive-color-qxin: #ccc;\n  --background-active-enable-qxin: #cff9ff;\n  --background-active-disable-qxin: #ffa2a2;\n  --background-hover-color-qxin: #eaeaea;\n  --trigger-shown-qxin: #f1f3f4 !important;\n  --background-btn-qxin: #eff4f8;\n  --background-setting-qxin: #fff;\n  --box-shadow-color-sej: hsla(0, 0%, 0%, 7%);\n  --border-color-sej: #e1e6ea;\n\n  /* 跳转条现代化外观 */\n  --sej-font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", sans-serif;\n  --sej-bar-bg: rgba(255, 255, 255, 0.88);\n  --sej-hover-bg: rgba(0, 0, 0, 0.055);\n  --sej-active-bg: rgba(0, 0, 0, 0.1);\n  --sej-accent: #4285f4;\n  --sej-accent-weak: rgba(66, 133, 244, 0.12);\n  --sej-radius-bar: 12px;\n  --sej-radius-item: 8px;\n  --sej-radius-menu: 12px;\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3);\n\n  /* 设置面板 */\n  --sej-surface-2: rgba(0, 0, 0, 0.025);\n  --sej-surface-hover: rgba(0, 0, 0, 0.06);\n  --sej-input-bg: #fff;\n  --sej-btn-bg: #fff;\n  --sej-checkbox-border: #cfd5dd;\n  --sej-focus-ring: rgba(66, 133, 244, 0.22);\n  --sej-accent-contrast: #fff;\n  --sej-danger: #d93025;\n  --sej-danger-weak: rgba(217, 48, 37, 0.1);\n  --sej-panel-shadow: 0 24px 64px -24px hsla(0, 0%, 0%, 0.45),\n    0 2px 8px hsla(0, 0%, 0%, 0.06);\n}\n/* 暗黑模式变量 - 当主文档是暗黑模式时 */\n:root[qxintheme=\"dark\"],\n:host[qxintheme=\"dark\"],\nbody[qxintheme=\"dark\"] {\n  --font-color-qxin: #bdc1bc;\n  --background-color-qxin: #202124f0;\n  --background-avtive-color-qxin: #424242;\n  --background-active-enable-qxin: #274144;\n  --background-active-disable-qxin: #583535;\n  --background-hover-color-qxin: #424242;\n  --trigger-shown-qxin: #3c4043 !important;\n  --background-btn-qxin: #292f36;\n  --background-setting-qxin: #202124;\n  --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);\n  --border-color-sej: #3b4547;\n\n  --sej-bar-bg: rgba(32, 33, 36, 0.9);\n  --sej-hover-bg: rgba(255, 255, 255, 0.09);\n  --sej-active-bg: rgba(255, 255, 255, 0.14);\n  --sej-accent: #8ab4f8;\n  --sej-accent-weak: rgba(138, 180, 248, 0.18);\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.8);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.85);\n\n  --sej-surface-2: rgba(255, 255, 255, 0.045);\n  --sej-surface-hover: rgba(255, 255, 255, 0.09);\n  --sej-input-bg: #17181a;\n  --sej-btn-bg: rgba(255, 255, 255, 0.04);\n  --sej-checkbox-border: #4a5459;\n  --sej-focus-ring: rgba(138, 180, 248, 0.3);\n  --sej-accent-contrast: #202124;\n  --sej-danger: #f28b82;\n  --sej-danger-weak: rgba(242, 139, 130, 0.14);\n  --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85),\n    0 2px 8px hsla(0, 0%, 0%, 0.5);\n}\n/* 滑词搜索样式 */\n#sej-container.selectSearch {\n  position: fixed;\n  top: 2px;\n  left: 0;\n  right: 0;\n  z-index: 99999999;\n  margin: 0 auto;\n  transform: translateY(calc(-100% - 10px));\n  visibility: hidden;\n  pointer-events: none;\n  transition: transform 0.3s, visibility 0s linear 0.3s;\n}\n#sej-container.selectSearch.sej-select-visible {\n  transform: none;\n  visibility: visible;\n  pointer-events: auto;\n  transition: transform 0.3s, visibility 0s linear 0s;\n}\n#sej-expanded-category {\n  font-weight: bold;\n}\n.sej-category {\n  display: inline-flex;\n  align-items: center;\n  position: relative;\n}\n.sej-category-search-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  border-radius: 4px;\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.08s ease-out, color 0.08s ease-out;\n}\n.sej-category-search-icon svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.sej-category-search-icon:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n  color: var(--sej-accent, #4285f4);\n}\n.sej-category-search-icon:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n.sej-category-search-icon:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-category-title {\n  font-weight: 600;\n  padding: 0 12px;\n  opacity: 0.8;\n}\n.sej-engine {\n  padding: 0 13px;\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  display: inline-flex;\n  gap: 8px;\n  align-items: center;\n  height: 2.6em;\n  box-sizing: border-box;\n  text-decoration: none !important;\n  color: var(--font-color-qxin) !important;\n  cursor: pointer;\n  white-space: nowrap;\n}\n#sej-container > .sej-engine,\n#sej-container .sej-category > .sej-engine {\n  height: 30px;\n  padding: 0 11px;\n  gap: 6px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 500;\n}\n.sej-drop-list a:visited,\n.sej-drop-list a:hover,\n.sej-engine a:visited,\n.sej-engine a:hover,\n#sej-container a:link,\n#sej-container a:visited,\n#sej-container a:hover {\n  color: var(--font-color-qxin);\n}\n.sej-engine:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\n.sej-engine:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#sej-container .sej-engine:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-engine.sej-drop-list-trigger-shown {\n  background-color: var(--trigger-shown-qxin);\n}\n.sej-drop-list > .sej-engine {\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  height: 30px;\n  padding: 0 10px;\n  gap: 8px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 400;\n}\n.sej-drop-list > .sej-engine + .sej-engine {\n  margin-top: 1px;\n}\n\n.sej-engine-icon {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  object-fit: cover;\n  display: inline-block;\n  margin: 0;\n}\n.sej-engine-icon:not([src]) {\n  display: none;\n}\n\n.sej-drop-list {\n  /* 使用 fixed 定位确保在 Shadow DOM 中位置正确 */\n  position: fixed;\n  display: none;\n  opacity: 0.2;\n  top: -10000px;\n  left: 0;\n  min-width: 128px;\n  padding: 6px;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  box-shadow: var(\n    --sej-shadow-menu,\n    0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)\n  );\n  background-color: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  transition: opacity 0.08s ease-out;\n  animation: sej-drop-menu-in 0.1s ease-out;\n  overflow: hidden;\n  border-radius: var(--sej-radius-menu, 12px);\n  border: 1px solid var(--border-color-sej);\n  user-select: none;\n}\n@keyframes sej-drop-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.98);\n  }\n}\n@keyframes sej-setting-mask-in {\n  from {\n    opacity: 0;\n  }\n}\n@keyframes sejopen {\n  0% {\n    transform: translateY(-4px) scale(0.98);\n    opacity: 0;\n  }\n  100% {\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes iqxinsejopen {\n  0% {\n    transform: scale(0.01, 0.01);\n    opacity: 0;\n  }\n  100% {\n    transform: scale(1, 1);\n    opacity: 1;\n  }\n}\n\n/* ---------- Vue 重构版设置面板布局优化 ---------- */\n#settingLayerMask {\n  padding: 20px;\n  box-sizing: border-box;\n}\n\n#sej-settings-body {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  gap: 10px;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */\n  margin-top: 0;\n  margin-right: calc(var(--sej-panel-pad-x) * -1);\n  padding-top: 2px;\n  padding-right: var(--sej-panel-pad-x);\n  padding-bottom: 4px;\n}\n#sej-settings-body::-webkit-scrollbar {\n  width: 8px;\n}\n#sej-settings-body::-webkit-scrollbar-thumb {\n  background: var(--sej-surface-hover);\n  border-radius: 4px;\n}\n#settingLayer #btnEle {\n  flex: 0 0 auto;\n}\n\n@media (max-width: 780px) {\n  #btnEle span {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  #settingLayer {\n    --sej-panel-pad-x: 12px;\n    min-width: calc(100vw - 16px);\n    max-width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n  }\n}\n\n@media (max-width: 560px) {\n  .iqxin-items {\n    flex: 1 1 160px;\n    width: auto;\n    max-width: none;\n  }\n}\n";
	var DARK_MODE_STYLE = `
  :root,
  :host {
    --font-color-qxin: #bdc1bc;
    --background-color-qxin: #202124f0;
    --background-avtive-color-qxin: #424242;
    --background-active-enable-qxin: #274144;
    --background-active-disable-qxin: #583535;
    --background-hover-color-qxin: #424242;
    --trigger-shown-qxin: #3c4043 !important;
    --background-btn-qxin: #292f36;
    --background-setting-qxin: #202124;
    --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);
    --border-color-sej: #3b4547;
    --sej-bar-bg: rgba(32, 33, 36, 0.9);
    --sej-hover-bg: rgba(255, 255, 255, 0.09);
    --sej-active-bg: rgba(255, 255, 255, 0.14);
    --sej-accent: #8ab4f8;
    --sej-accent-weak: rgba(138, 180, 248, 0.18);
    --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5),
      0 8px 24px -12px hsla(0, 0%, 0%, 0.8);
    --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5),
      0 16px 40px -12px hsla(0, 0%, 0%, 0.85);
    --sej-surface-2: rgba(255, 255, 255, 0.045);
    --sej-surface-hover: rgba(255, 255, 255, 0.09);
    --sej-input-bg: #17181a;
    --sej-btn-bg: rgba(255, 255, 255, 0.04);
    --sej-checkbox-border: #4a5459;
    --sej-focus-ring: rgba(138, 180, 248, 0.3);
    --sej-accent-contrast: #202124;
    --sej-danger: #f28b82;
    --sej-danger-weak: rgba(242, 139, 130, 0.14);
    --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85),
      0 2px 8px hsla(0, 0%, 0%, 0.5);
  }
`;
	function isBackgroundDark(bgColor) {
		try {
			const match = bgColor.match(/rgba?\(([^)]+)\)/);
			if (!match) return false;
			const [r, g, b, a] = match[1].split(/\s*,\s*/).map(Number);
			if (a !== void 0 && a < .5) return false;
			return (r * 299 + g * 587 + b * 114) / 1e3 < 128;
		} catch (e) {
			return false;
		}
	}
	function isDarkMode() {
		const html = document.documentElement;
		const body = document.body;
		const darkModeIndicators = [
			html.getAttribute("data-theme"),
			html.getAttribute("data-color-scheme"),
			html.getAttribute("data-color-mode"),
			html.getAttribute("theme"),
			body?.getAttribute("data-theme"),
			body?.getAttribute("data-color-scheme"),
			body?.getAttribute("data-color-mode"),
			body?.getAttribute("theme"),
			html.className,
			body?.className
		];
		for (const indicator of darkModeIndicators) if (indicator && typeof indicator === "string") {
			const lower = indicator.toLowerCase();
			if (lower.includes("dark") || lower.includes("night")) return true;
			if (lower.includes("light") && !lower.includes("dark")) return false;
		}
		const elementsToCheck = [
			document.body,
			document.documentElement,
			document.querySelector("main"),
			document.querySelector("#app"),
			document.querySelector(".app"),
			document.querySelector("[role=\"main\"]")
		];
		for (const element of elementsToCheck) if (element) try {
			const bgColor = getComputedStyle(element).backgroundColor;
			if (bgColor && bgColor !== "rgba(0, 0, 0, 0)" && bgColor !== "transparent") return isBackgroundDark(bgColor);
		} catch (e) {}
		if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) return true;
		return false;
	}
	function applyDarkModeIfNeeded() {
		if (isDarkMode()) addStyle(DARK_MODE_STYLE);
	}
	var darkModeWatched = false;
	function watchDarkModeChanges() {
		if (darkModeWatched || !window.matchMedia) return;
		darkModeWatched = true;
		const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
		let lastDarkModeState = darkModeQuery.matches;
		const handleChange = (e) => {
			if (e.matches !== lastDarkModeState) {
				lastDarkModeState = e.matches;
				if (isDarkMode()) addStyle(DARK_MODE_STYLE);
			}
		};
		if (darkModeQuery.addEventListener) darkModeQuery.addEventListener("change", handleChange);
		else if (darkModeQuery.addListener) darkModeQuery.addListener(handleChange);
	}
	var CSP_COMPAT_STYLE = `
  .sej-engine-icon { width: 16px; height: 16px; flex: 0 0 auto; object-fit: cover; display: inline-block; }
  .sej-engine-icon:not([src]) { display: none; }
  .sej-category-title { font-weight: 600; padding: 0 12px; opacity: 0.8; }
  #newSearchBox #iqxin-newTarget { border-radius: 8px; border: 1px solid var(--border-color-sej); padding: 7px 9px; }
  .iqxin-help-link { color: #999; }
  #iqxin-editCodeBox textarea { overflow: auto; border-radius: 10px; }
  .iqxin-warning { color: red; font-size: 1.2em; }
  #sej-drop-lists { display: contents; }
`;
	var NON_TRANSITION_STYLE = `
  .sej-engine, .sej-drop-list-trigger, .sej-drop-list { transition: none !important; animation: none !important; }
  #sej-container { animation: none !important; }
  .sej-drop-list { backdrop-filter: none !important; }
`;
	var SETTINGS_NON_TRANSITION_STYLE = `
  #settingLayer, #btnEle span, .iqxin-set-del,
  span.iqxin-additem, #newSearchBox, .addItemBoxBtn, #settingLayerMask {
    transition: none;
  }
  #settingLayerMask { animation: none; }
  #settingLayerMask { backdrop-filter: none; }
  #settingLayer { animation: none; }
  .sej-panel-close {
    transition: none;
  }
`;
	var DELAY_LIST = [
		/^https?:\/\/google\.infinitynewtab\.com\/\?q/,
		/^https?:\/\/www\.zhihu\.com\/search\?/,
		/^https?:\/\/www\.iciba\.com\/word\?/,
		/^https?:\/\/neeva\.com\/search\?/i,
		/^https?:\/\/s\.taobao\.com\/search/,
		/^https?:\/\/y\.qq\.com\/n\/ryqq\/search/i,
		/^https?:\/\/www\.quora\.com\/search\?/i,
		/^https?:\/\/search\.bilibili\.com\/*/,
		/^https?:\/\/github\.com/i,
		/^https?:\/\/(www\.)?baidu\.com/i
	];
	var app = null;
	var menuRegistered = false;
	function isRunning() {
		return Boolean(document.getElementById(HOST_ID));
	}
	function printBanner() {
		try {
			const name = _GM_info?.script?.name;
			const version = _GM_info?.script?.version;
			if (!name) return;
			console.info(`\n%c ${name} v${version} \n%c 问题反馈(GitHub):\t\thttps://github.com/MUTED64/SearchEngineJumpPlus/issues/new\t\t\t\t\t\t\t\n%c 问题反馈(GreasyFork):\thttps://greasyfork.org/scripts/454280-searchenginejumpplus-搜索引擎快捷跳转/feedback\t\n`, "color:#eee;background:#444;padding:6px 0;border-radius:6px 6px 0 0;", "color:#444;background:#eee;padding:6px 0;border-radius:0 6px 0 0", "color:#444;background:#eee;padding:6px 0;border-radius:0 0 6px 6px;");
		} catch (e) {}
	}
	function boot() {
		if (isRunning()) return;
		if (app) {
			try {
				app.unmount();
			} catch (e) {}
			app = null;
		}
		reset();
		initialize();
		addStyle(global_default);
		addStyle(CSP_COMPAT_STYLE);
		const { settingData } = useSettings();
		if (!settingData.transtion) {
			addStyle(NON_TRANSITION_STYLE);
			addStyle(SETTINGS_NON_TRANSITION_STYLE);
		}
		applyDarkModeIfNeeded();
		watchDarkModeChanges();
		document.body.appendChild(getHost());
		app = createApp(_sfc_main);
		app.mount(getRoot());
		if (!menuRegistered) {
			const gmNamespace = typeof globalThis !== "undefined" ? globalThis.GM : void 0;
			const gmMenu = gmNamespace && typeof gmNamespace["registerMenuCommand"] === "function" ? gmNamespace["registerMenuCommand"].bind(gmNamespace) : null;
			const registerMenu = typeof _GM_registerMenuCommand === "function" ? _GM_registerMenuCommand : gmMenu;
			if (registerMenu) try {
				registerMenu("设置菜单", openSettingPanel);
				menuRegistered = true;
			} catch (e) {
				console.warn("[SEJ] 注册菜单命令失败", e);
			}
			else {
				menuRegistered = true;
				console.info("[SEJ] 当前脚本管理器不支持菜单命令，可使用跳转条右侧的设置按钮");
			}
		}
	}
	async function startScript() {
		if (window.self != window.top) return;
		printBanner();
		await initStorage([STORAGE_KEY]);
		if (DELAY_LIST.some((re) => location.href.search(re) !== -1)) setTimeout(() => {
			if (!isRunning()) boot();
		}, 1e3);
		else boot();
	}
	function restart() {
		closeSettingPanel();
		if (app) {
			try {
				app.unmount();
			} catch (e) {}
			app = null;
		}
		reset();
		boot();
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
	function listenUrlChange() {
		if (window.onurlchange !== null) return;
		let lastURL = normalizeURL(decodeURI(location.href).replaceAll(" ", "+"));
		window.addEventListener("urlchange", (e) => {
			const newURL = normalizeURL(decodeURI(e.url).replaceAll(" ", "+"));
			if (lastURL === newURL) return;
			lastURL = newURL;
			if (app) {
				try {
					app.unmount();
				} catch (err) {}
				app = null;
			}
			reset();
			startScript();
		});
	}
	var settingsSyncStarted = false;
	var settingsSyncTimer = null;
	var pollTimer = null;
	function applyRemoteSettings() {
		if (ui.settingPanelOpen) {
			ui.settingsRevision++;
			return;
		}
		if (!useSettings().reload()) return;
		restart();
		showToast("SearchEngineJump++: 已从其他页面同步配置");
	}
	function setupSettingsSync() {
		if (settingsSyncStarted) return;
		settingsSyncStarted = true;
		watchValue(STORAGE_KEY, () => {
			clearTimeout(settingsSyncTimer);
			settingsSyncTimer = setTimeout(applyRemoteSettings, 200);
		});
		const poll = async () => {
			if (!app || ui.settingPanelOpen || document.hidden) return;
			if (await pullLatest("searchEngineJumpData")) applyRemoteSettings();
		};
		clearInterval(pollTimer);
		pollTimer = setInterval(poll, 2e3);
		document.addEventListener("visibilitychange", () => {
			if (!document.hidden) poll();
		});
		window.addEventListener("focus", poll);
	}
	onRestartRequest(restart);
	startScript();
	listenUrlChange();
	setupSettingsSync();
})();
