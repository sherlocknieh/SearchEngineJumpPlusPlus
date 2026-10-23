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
	var isObject = (val) => val !== null && typeof val === "object";
	var isPromise = (val) => {
		return (isObject(val) || isFunction(val)) && isFunction(val.then) && isFunction(val.catch);
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
		else if (isObject(val) && !isArray(val) && !isPlainObject(val)) return String(val);
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
				favicon: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 15.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='48px' height='48px' viewBox='0 0 48 48' enable-background='new 0 0 48 48' xml:space='preserve'%3E%3Cpath fill='%23FFC107' d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24 c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3Cpath fill='%23FF3D00' d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'/%3E%3Cpath fill='%234CAF50' d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36 c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'/%3E%3Cpath fill='%231976D2' d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571 c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'/%3E%3C/svg%3E%0A",
				gbk: false
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACk0lEQVQ4jW2SXUhTYRjHf2furH1vns0tc+p01YbSaRRGFGmElRWhRVR0VzeBCUkRKRQUURFBUYtMsAsvwqSLboqKii76oOjLLsKwLBLOjsM+iBEiEk8XOtCDD7zwwvv//57/+7wvWEpX1WUXqud33U1XPn+2cuHgm4bk9xeNqc+Xl1f0eiFi1c8s+wHNd6gzWpxZ7XXtrHBQMx/itR413RYPdbysXzQ80qxPnFkay8zp3jXP1V7ncPS74BbQD6ywavbGQm25lrTcXJN4OOtgS5G6L4oyDogNRYDfpdCUBN0KaYp4t+da0nJcX3AeAB+EU9gmAFGnzH8B2xlcmTElJBk8N6yQW8vjT7Lblv7zQZj1FHUVzNOAdoBruHsNRRMzlJCPkUVja7E3FQBxB6nRzbqc0MsuosKwfdpcBJOAE+Aq7l4DTQybJmY0KWagUnpw3wb8AN8aUuMvG2uGscFPUMSOIgrkC10yBQCaGASksL+Cqw/gQ13C/LKhJo8Xfi7DLo6p+JOAfVaCGesxvo/VsBhgKJ3IDzWk/rAV9XMvPtmPUw7gEmC3FfCV4EQrjo5CuhgsNPWEPK2rHqQFNWOiyQBBGUOTbjw5gIu4rxtocg//W+sPvBMKvzKXJKSzouQsXoiMEJzMKSEx0OQXmjzA/zoJej32DdYnvGLz9GVLy2SktmoSCALQifOsYQtL1rlg+r5B+UQwfw53dzOOPZso2nEC16UBAjljXolkY+VysCR4bBa5B/dtMxCX0Qpdst6YGPinp188a5BZX1S6wlq/NRkAR3Ce+l6amvixrlnGVm2U0bIayXrLxVAjYqDJsFI83urwdMxpnlH+o3bv6UclVR8GwlXmO2fUvE/g/WGcJwG3VfwfeW39pYdUeeAAAAAASUVORK5CYII=",
				blank: true
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
				gbk: "true",
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC+klEQVR4nIWTX2hbZRiHn++ck3OapMu2oG3WCm2XUJm4zihK/TN0rQ6ZcxsIq0w6hG0XE/FC2BgqInhR6o0yN8U/IBYVp2PMC91VsReheFFdt27FaknDTE66Lmt7mpwkPfnO+byoE4SpD7zwXvze5+blB7fHiIRI73iw5dt3j6VVsi06BMRvFxS3FguSsfbkwY6e3hMnDwVmulOCUiA0KtLk/E8uJ89dreSn7ONLS5XPgSqACMGRF0798LEZshBizahpgtL8NOXJT7lu6Ow48DC6JlBK8fuSjVSSX94fr9gTpVbx/ScDas4J8dFsN4mOu0ktXGAwUuCeWAiEABTvTBYYv78ZLR7FX3SIZRyG97Wz642f3zKK+TyHn01xcKdL11NH2PV4C6m4jywBmgaGzqHWEOZUmWq1yNCJJ2FwMyISJf/iKEbY0nNApykX6dqzjYmnU5z5epL9hkvLepOzWZ/hvRt4rfcBRDRG/dI4ZGeIPDNAADnt1zknACDwUIDrChK772PE02lrD3Hm9UfZ5DvUM6P4dhb5h00jW8DPfQEgtc/OZ69lphbXXqEU0pfkl4uUPAcME2FZEAQoT1IbG0cWlolslyjnKgIKxvbWcD294LHz5QzFVsFN2wPF2ug6wrLwb7oE5TrBimTd/m6EkUcYHehctjXpB/PeDZcvewRqxiC4VEYFCsVfAl3SmHNpXLHw7WacD4vI5W0IazMCPO3OqJlrVMuslivITX2Et5ymacyiMl2G1d9QCyMEhSj4ArP7DpSrWDk1hQgnWYWc8cGEPXRvk/tqX3s45q9cp27PQ/Io4doIhjmLaEoAywBsONyDMjeCFuWr72ZXAAzAeynjrO9vq42qhOpTgYQgIGhK4AcFhNVFaKuNqjYQVhcT06Xgkd1vvyLh9C0BAKO216/b556LpB47q4XXrfVAb0ZYncSPprk2X2NLeuibG05t4F8K+DfN8YeeX2p5YlCNvdevnItvqt6td80A5v8d/gMdhg340YLUf+X+BAnLRacR4gVKAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "5sing",
				url: "https://search.5sing.kugou.com/?keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAByAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAjlJREFUeJytkz9oU1EUxn8v7zW5xNekhSL+QxoUmmBxUozRxcUOgg2pgkJxrWBBqh0cdROqg5BBBaeKgkIIIkLawUFsaoUsUtLaDKUNVklKQhrb25j3rkNfYqx2EDxwl3PP9333fPccjW0RTZhngT4gAoScdBaYAlLJWHWitV5rAXYDw8CQEMI0dB2XSwfAti3qloWUsgo8AuLJWHWxVbU7mjDHL73pUlcm96lsKa1sZau6XWsey64rW9lq5utrFU2Y444ghsMxLIQY9Lg97NkVoMd/AltZfC7PUJR5iht5ANatCvOlaYQQg1LKb8Co4fQ85G5zA3B893k0TWMsc5m5Unq7RQC429xIKYeiCXPCBfQJIUxN27Kju72XwsbyjmAATdMQQphAnwFEDF1vXgY7IqzXK/QHRpq5oswzX0pTlPlmzsFEDCDUcBvAa/jwGj6igRt/KM+XP3A3cwGg8UMhY3vRs9xtVjfyFGWepbVZvIaPYOdJ+gMjBDvDnNp7kfcrL3+9BMjathXW9S2uyaUnvxGu1ytkCimW1mYZi6TpEgeArdkAsi5gqm5ZOxrWiKu9caeNaQAczJQLSEkpq0qpvwIHDt3i8Zkch/3HeLX4gLlSGqVUYypTGkA0Yd4TQtz0uD0cbD9CT0eY/sB1vIYfl6bz5XuO5wt3+LT6FoDN2iZSyvvJWHW0YWL82tGH507vHwg2lJercyyUP/Ju5QWZQgoApRS1HzWklE+BOPyHZWoStBD90zr/BDWFAshUlB4uAAAAAElFTkSuQmCC",
				blank: true
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACaElEQVQ4jY2TS0iUYRSGjwupXYsIAqFdDl13tclNd6WgZVQULZrB6ddsbhA1FwkyNQOjCMz805nxMiM6ajq/OkjZxQElLS0sK6NQI7QkCCrTnhbfmBMatXj54PDxfO97zvlERERM245IlqbLXut/StNlj7VM0kzbRdZlHBVfJ+LtQDzGgtwGci6KuKN/1ueVH0Nc9bMi+3KD4u1AnGHEHkK0IHIyiNhDLD/TQIozrGpaEHGE1D1nGHGGEF8nIpnZt8QdRaxBUh0hDvl70HtHaR4ao/XZBLHn72kcHONwoAc5XYucqkFcCYjHQGSHRRdXC8eCcQbHp3kwOsnxQBxTQRurPBHSL7Ria3jE568zdL/6wGp3REHmASv3a3rkxRTfZ+cAWHsxipyoVK/Z69RpriK9oI0fcz/pH/vEMkdIxfUYSHlFhd40Mo29aQCATZc6kNyapKxhZdlchaPlMQCW+j7EGkg0s+SqnlZ8F0u4D4DNJUsAnGEkt4b1RQYAxvAEolWrCaVmaXqKsxlngv5XQF4taedvA9D39iOSV6sAssuiiy2C618ArZqtpTEA6p+8U2N1RxHZa9XF3vQbsKG4fTHAFkLMVfj73gCQVd6tIniMxYAtpTE1BWtAKduP5FTjbR8C4Nr9l0hOddIeJAD2ZjWFh6OTlPe8xmcMYWse4HLXMIPj00x9+YYt0q/c2euSAJnZlckOdl6/w4GybrztT7lyb4TCrmEO+uOsONuoHCWvswJoleJsxZFwYCoyEHPVQgRrQOW11S1ubH4MkTUbd4tWM1MYnwAg42Yv4mpZ+gcmyxdDrDcmfgF4QGAxnLBCrgAAAABJRU5ErkJggg==",
				blank: true
			},
			{
				name: "flickr",
				url: "https://www.flickr.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAA+klEQVQ4jWNgGAUIIKBqwKCfUMSgGZXJwCklhy6twSCoW8BpUZTFaZIjz8CviCprXtbFkHX3PxynXPrGoBIQC5Ou57Fv/C/Z+B+Gf4jV/szgMs6EyMq7BqJoRjaEQ1zRmUXRFVkzsiEaDIK6DAwuE1ZgNSDr7n8Gvbj8Wfy+c7AZ8F+y8X8tl30dA4PrlNU4DdBPKFrCH7QUlwGNPE4tDAzqoclYNaff+MMgoGoQwaYdhcsAGxY5G0g4eExZh2GAUVY1LBCX8wevQNfcyevShRoTim4hDHZNMxls6yczSJjao0ejP5ta4Axe35mT+DwnO7MoupKfXoYfAABPvsL2GuU3QwAAAABJRU5ErkJggg==",
				blank: true
			},
			{
				name: "花瓣",
				url: "https://huaban.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC1klEQVQ4jYXOyU+TeQDG8Z//gIkxXogxXky8TTIeRhMzcSEdoKW0SIFibYuJLFbZVGyxlLbQFoqoBEhEBSlbA4xxNwq9zMXMeTLO0b4vWOhGoSKBUfHrAZdEEZ/kOT6fPMJtNLVPelpD92yNobv1ttCd2vNTI5aqhx0lxpv6/ftNO3fs2LN7+/a95Qd/r75VZBgPGsyTE0ZzaMJ4MvTQXBYSU772v/nrOdx/zIeJe6wF/+Td4CjvAqOsdl/n3xNlqf+Kjellh4dVfycrrVdY8XWw2noFOnoQD5yuEE8mWQyOsxAYJdU3SKovQMJ/lZmSUiK5OiI5Bcg5BUQqqom7fcScXuJOL288lzcAAsMkr/UwXVyKpMxHyitEUuqQFBrCmbnMmMqIubzEXb4NgMEgqdtDRMqr10d5RV+BrHwkhYaXh3OYKa0g0dxG2uNHjDU0PvoCjIwT93Uga/TIGv33wB9awpkqXh5Rkqi5iORoeSM6LZbedWCCheExIpZzSOpiZE3JxoBCTfhwNvPHDIwbzCGhP3TItPb4GYtjd0jdHGDGVI6k0W8OZOaSVORxYd9vzSJj27Zd8sDwwsrdB8z33GBaX4qsPf7zBwUGBtX5j4QQQnRVWvp5OkWy6zrTRSbk/E2AI0qkbC3Js+d5cbomKYQQYndGxt7ZoZH0cm8/8o8AhYbwURWyupDZs+eIXbATr7UiPqcsW3Xmfd8QEZ0RSV2EpCokrDy23iwtsqqQV+YK5i46mLM6iNbZWKyzfQWEEMKr03WtNraQqKonUlnDq/IqIqdrma21ErO7ibl8RC+5mau3E62zkf4WEEJsadLrfcuBEd4ODJPq7iVxtZuE/xrxFj8xRwvRBuemgBBCiKxfftU+t7v++b+3n7c9N0i3dzLf3Ea8yUOswUm03k6szsbrHwGfsrX4wMGTwVOVT144XHPznnaWmttYcnp5bXezZG1izdrER/CEaFr9QFrRAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "Pinterest",
				url: "https://www.pinterest.com/search/pins/?q=%s&rs=typed&term_meta",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACD0lEQVR4nO1WsW4UMRB9sxsECAmlpbrbRKwpKE4nk0i0/AQSogGlSInID/ABKegoEimioCC/kJYiySKCkE7aC8rtUdKgSClQyHlSBN95N/batyQVN5U9nnnvzazXNjCz/92oSVKWiPcAnlfcR3KQL16rgCwRHBKn1Ki7NPz+5coEhBJXTQ5yL350XeShubUKnQDMZ7Lo3zBdH4F4IRFntvC6TjgXsnb6B0Rz04CNcy3CXXluARWQW7fjmw97vVPXesSq0y0OvzpFUNySR70fVR7rHthPxK+qT5NnbbFhq1BRdGD6L1XMo6GNyyqAgHlzrsE+L6RPQHhpy9GWJWL8+7HCal2sU0DJmD9MhrRzMcCxHOTk+K4dPXg0zN+VxLXFrldAlqRb5lwW/WcAkLXSBxNfPj8OUPzKV8PYCEteAcz01Joc4a0dlN4EC7DCVvGA39ZIxje7ANy9UgEAts3Jbut+BwBk0V/7F6JgAbLIV8x5HEWTXQ1+7QM0N+Z+kp6UFhl7XgE20/83gdZNv+6Oywh0pySuyJeDBDDjp0vESMX3tG95eHgwyeFTs/rQSyz4KNYWchfsLYrHkcKnMtMURzFwUVEdietIzhLBl8gB2MiBBtex7sA074S6rtVuwmqiryvTknsFWADWnYENyIMEaCA5yIn+/h2+9is16oaQA02f5e10E0QvKu5Gz/KZzewcjEjYbJKZwQoAAAAASUVORK5CYII=",
				blank: true
			},
			{
				name: "Yandex",
				url: "https://yandex.com/images/search?from=tabbar&text=%s",
				favicon: "data:image/svg+xml,%3Csvg t='1666872628734' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='10516' width='200' height='200'%3E%3Cpath d='M451 1024V691.8L229 96h111.6l163.6 459.4L692.4 0h102.6L553.6 695.6V1024h-102.6z' p-id='10517' fill='%23FC401D'%3E%3C/path%3E%3C/svg%3E",
				blank: true
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
				blank: true,
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACQElEQVR4nG2ST0iUURTFf+d9g2V/NKSgRYSriLCZ0jLie+Gi3LWqoKCFEYG0tHBTREgQSLWQCIRoWVCbKKKC/oD0fVGG5Iy2KDCiRQTBUBJh+vluC2dkHDurxzvvnnvuuU/U4H1X17ooy16Y2QAAUgfwEedWyawH6MknyefaGlc9FON4CFiH1C7nHkjaXEjTi5Juy+wm4Amhpej9rWUCRe+v5NO0L8qyu4uMdB3AYHZtFDVKinHunaBY8v7ZUgdmW8e7uppcLre/ShgMAwh2T2fZDzNLK9RQMBsoen8EwI3v3dsm6eDOkZGfYX7+PmZfgIvAyep0SI8Nphe7Sq8E3QDORdFEzUgHkFqBAUEGQAinsxD6CknSXDs7Zm8n4vhQNcQ/1CGfJKtL3hvSnpw0Vs8bDJnU7xbyUnfJ+zMG56sPJuN4s8FVpBOSNtYLSFpj0OkW3Nh34FqUZcOYXV45O9scYFAhTLlyeYXB14rtl0tEwDmgAEwBtL15U0Y6t2V0dBrp2Bw8DC0tf4EblZrbdUYm3fYkmay3V/T+iEGIzDKDe4LBUhzPVbJRPkkEFAL0C6DkvVVquw0OyyyYtB44YHB8R5I8Le7bd4oQLlXzMLOZQpo2OgBXLq+oJNvuzO4ibSokyVGg18GTkvcms5s1YfZGudyGSg4L+NTZ2TTT0PArnySqcbR0dWa/JZ2dC+FRx+vX35YIVFHyfgJoq7u+Y/ABswuFNG2s28T/UfL+gZm1CrYBz2dnZg7vGhtb9uH+Affd7MpRvsLpAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "当当网",
				url: "https://search.dangdang.com/?key=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADzAQAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAbpJREFUeJylk0ssXGEUx39zZ+a2g1QX7DxjMwzKJF2IR0iEWIxlV6KZeGQaEhZWbHRTsVCPJq5IG48IiYiFErZNmngUCYmgqGBFMljWq2Nx6l7XXAvxT76c73z/c/7fOd/DBhDyuqcAH0/Dd9vqVrmiJ794CZ29Bp2TB/NrYgHiEqBLA5frLsIX8rqnFH3nji9QUATdfULn5oOqQkys+K2fIL/Q4P+LKPq0vgaWF6EhIL7TKVZVxVZXwMoS1L439WELed0h3XM64eoKJqYhOcWI2tyAto/we0v4e1BMXm0drGxK8p89aGmCo0NI9cDwuLTwAEYFJWXQ9hnOzyDgh51tI8qTCdo3iIyCdz7Y27UQcDjg+jpsBx2JSTA5C1oPfNUsBHLy5OQf4uYfHOzD5DjM/YCICCh4q9MOfdalSRVWmJsRgZNj8GSYKCOj8QNkZllUcAOnQVDsEBcPZ6ePCMz/lPEY0tIh+jV0tpuWjWssLoVfG7CwLmXePSCXC95kw8AYXF7CyKBJwDhEd5qM5law2+HiLwSD8pRVVZIDflhbDRMI/4mVVeCvgVfR0v9AP4wOWzU2ZIPnfedbccyGGmWXmM8AAAAASUVORK5CYII=",
				blank: true
			},
			{
				name: "1688",
				url: "https://s.1688.com/selloffer/offer_search.htm?keywords=%s",
				favicon: "data:image/ico;base64,AAABAAEAEBAAAAEACABoBQAAFgAAACgAAAAQAAAAIAAAAAEACAAAAAAAQAEAAAAAAAAAAAAAAAEAAAAAAAAICBAAAIiMAABwiAAATEwABIz4AAx0+AAAyMwAGChIADBQiAAAnKwALEh4ACBYWAAAwMgANGjMACAwQAAwYKgABHyAAAwsLAAEzPgABKz4ADh47AAE7OwAMEBYABgwMAAYIDAAHIz4AACwsAAAkJgABFxcAASc+AAcfPgABNTcAAQ8RAA8XJwARGCQADhIWAAsbNwANDxQAEBwwAAA3OwABLz4ABis+AAU7PgAGJz4ABRYWAAYPEAAPHTcABTc+AAUvPgACBgYAACAiAAQjPgACID4AACouAAAqLAAKDhQAEBosAAAMDgAEMz4ACx0+AAE7PgAMEBoABgwOAAoKCgAALjAABCYoAAQnPgABNz4ABT4+AAQNDgAMID4AAT4+AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8AQUREREQqQxIoKDApKysZGT5HR0dHRzw8QxIoExMdBBkUIEdHR0dHPDxDEigTEx0rOzsYBkdHR0dHPEMSEhMTKTs7HjgnR0dHR0c8QxISKCk7OzsNFUdHR0dHRzxDQxIwOzs7DTEAESA5MQM8PENDEjs7Ozs7RUdHR0dHIBwcPBIoOzs7OztFR0dHR0cDRzxDEyg7Ozs7DkdHR0dHR0dHPB0TKDs7Oz8BR0dHR0dHR0QdHRMoGTs7OyERG0dHR0dEBAQdEygTOzs7OzshGBwfRDQEBB0TKBIdOzs7OzseLggFNAQEHRMoKBITOzs7Ozs7BQU0BAQdExMoEkNDKTs7OwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=",
				blank: true,
				gbk: true
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
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAAAAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAcdJREFUeJyFkk9rE1EUxX/3pZMJxtCRuim01k03IkKJCI0E9Bu4VgxxpZaKurf+ofEDqHUhFCKKuuwHUCiKBgRL24WloVZd1KIVTFprMQ2d6yKZzEsZ07u6575zzpw7XCGi+gula6AjIIMAKNO+7lz/djM7v5srNugbL10R4X6UaVB/67XUzzunNwNsgubog7k3oB3FAMmk99sbmRxoMxguLp7vTu3LHvCSqGrjRXVKIA3+GaAMEHMSVL7MQCz+tW2FTLGswaC6scXC1aG21QDSjz44S7Oz28ZxQRVFN9cn8imTKZbzNjFKDDBz8Xhd3K4hmgkF2Q9gVBkNafqi0/7r9y7M2dgbfZwzIqRbct8872TQZH1qdTBsVHUnGBjRw3vrORS0AltGkJeW4+09DUTiITBPjHFrZ8NHerJPF3r/p+2+PPnextWJ3Lx5e+5YJRjE410sf/612l8o5XaL+8ZLrxJe7wlVv5lW7zbXaNSpZ8u6uLRK3IkR3hI1EVwrP9t/KtQ21qg+zAtYp7z2/UePLW6sa4sb33VTB1vitgRh1HcfReRI1D9Q1bGVsZMFexZ5dQO3phO+415CGVShDrxeuZGZiuL+A2DYnV2Yre6zAAAAAElFTkSuQmCC",
				blank: true
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
				favicon: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAACGElEQVQ4y6WTzUuUURTGf+e87+v3BwxYToupoYVYgViLFiPtIrBNELZsIUIUFEXQqk1I/0JU24oWZRFFiyD7WhhBDWYfq4zCsRETdfwYHL33tHhtdLSF0IEH7r1cnnOe55wjPP1u/EeEYrLuaogpoJi4LREoBhiIQa3Btbb3DLZdQbwQIdSJIC7+8y+IPP5pAKnqEgMdz+lYusGvwm/uVo3Qu7OeOoXsbIkzw9OMLDiQDRLi7CED/gJ7x94R1o2RTF7naFBFz9AEuZLnVKqewcw2Ol/kyS0b601T84AJNbnPMD+BD3ZgzSc5/naKN7OOb4vGpS8FsjMlTqcbMGeYp4wQDyCUabWVeRcwWjS8xc9iytc5T7I6Qpxguq4C8UJMsuqKG6U5WOJgY4B4JTAlckImETAyvYQhiF+DmlfWKA21GdzkVR52tXAuXcuxlognXQn2J2oYmiwhpphfg+IVvJYlGDA+dZvzH4p0p5q43NnCx3ml/9MCDw4laK9VlAi8gFdCMQMzRFb7I5AYVnpeXWTWe+aAtEAARJkDDJ7o497NO5xt7QZzcRsBzMAESq+TRI+2c1iHN0/d/SzLE+Ps3nMEKXhMIMQLSOxs8VkT+rIBdIZNCyKCNTQx3Z6ht5Be9VwIzeIW/pAUxVwEDsz9dWMDQeMu+hb3kfflwhFu5S0+RIiyaVQrwhtmKxXUsQTAWMH8VvavMsMfIrbvQBU3VlgAAAAASUVORK5CYII=",
				blank: true
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAERElEQVR4nO2WTWhcVRTHf/e++crko/kyX201jQitIOnGhcWqUBWLSGgRVNCVFqouXFQFa0XQXRRcWBpBURRBo9JWcZGWghhqbVOK1I8uLEksmKS2yTRt5iszc+9x8Wbmzbx5mca1OfB4vHvOPf//+bjnPliT/7uoesq7v9k3o6JOn1gBBAFE3HfpG+C6FZqR8krJRhSQK8z+8eSh9SthhOoRWLTZPklaRDxIEWFagIxlZF2KRzov09/4A/suPc3ocqSCZJGOVn31MOoS8Ms8ihsGDug0j982z2DLONgomFaeWfc3o1cG/ou7mxMoiDBt4VYD77Utsrt7HEwWpAEQsC24YQpbW39h7KtOpjbGGFrvgAY0dOu6Va5PYNpqRlqW2Nt7EgoLUGgE4lCufkkEbIT471e5f0a41tzCdE+M4YE4X0bzdQnU0JOLjw2xcG6U8GyUXN29NTwWTvejvu+CmHF1YsFaQloRijeTibf/5LS2j7cd/GR/IAGZGJwnfK3j6o3nQMxN0GsJ5JcUS0ciqGil3jWyOPRcOoLWYfJNzbO6oWGs/dPDzyoAObNRMDlAg55j18+p4PMpHqb4vyVoTco6C4weayIf2YYCxJortxw/060BMOnzKO2F5C/xKsBXmSRA0IBY+ytuyKC2LWzF2LwXRjGiygfvqQSvQvBFX0m4nFFRCNB14uxDZQKu5E+txFoAI7BcAGurwQVIG0gZ9502kCoIaQNWqEmqIFhjpkouysdQ3Zt4QE51SSn6kiwsw+ieGH2dHtc9IxlmkkJIw+UsTLweJ0iOTeR443iejoiXSRB0InGgZKOrdjgeWwESOXjqLqcKHODN3Q5zy6XuriMV5VRAQUCh6Dh38YuaDABQyP9FiP5SBj54IsKdm0K8+tF1TvwTptGBRB56ItARUYhAbxQ2v5UGwIigcMuFQJMDMe1xSRpoU9Xnq5qAXR5Ds7dksqXfVR+dDbO5EXYMaArWS93YpCVn4cOhMMbW9rtSiqWMcHDcnYY5Acd3vqsIqO3p5+VH7rHCoOvAXe9wwFh4aVesavPHb6cIA9sHwzXgJRER3h/Pg0DaQiHvNXttBgDyfA0ugflFQ2erw+m0sDOiUK8kQMAMt6G1IqagKwrq5UQRzY8OhBQPt0fKRzGZyZysCjqI9aPvpATg+HXL1IthNvREsRYmZwy3b3DQCs7/meW1bw2JHHz3QgMmYHIfPZXj898MjcXmfvdw09zgWar+D3TttuIQEeHBFsV9h5ZdQw13bHTBL0xm2PGZe1NlDXS1aXo7a5+BHk2m4PkNpznvxwrMwM7hZFUys8bt/qRxO7uveNmUjC6kBFsxBU1RuSmqaAp50/PE/qYavOD/AV8tY7oa1F/qLXHPb8UFGDyuV0Ogjr2r9xn4gfyXVD1/qyewghf/vbCi+Qr7AwkowogED1kJ+JCKhaASiIBSgf2+JmvCvyV4A+6kXQlFAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "百度新闻",
				url: "https://news.baidu.com/ns?word=%s&tn=news&from=news&cl=2&rn=20&ct=1",
				favicon: "data:image/svg+xml,%3Csvg t='1666880462710' class='icon' viewBox='0 0 1024 1024' version='1.1' xmlns='http://www.w3.org/2000/svg' p-id='36406' width='32' height='32'%3E%3Cpath d='M226.522 536.053c96.993-20.839 83.792-136.761 80.878-162.089-4.758-39.065-50.691-107.346-113.075-101.952-78.499 7.036-89.957 120.445-89.957 120.445C93.748 444.857 129.764 556.857 226.522 536.053zM329.512 737.61c-2.848 8.175-9.18 29.014-3.686 47.173 10.822 40.707 46.168 42.55 46.168 42.55l50.792 0L422.786 703.169 368.41 703.169C343.952 710.473 332.159 729.468 329.512 737.61zM406.537 341.666c53.572 0 96.859-61.646 96.859-137.9 0-76.12-43.287-137.767-96.859-137.767-53.472 0-96.892 61.646-96.892 137.767C309.645 280.019 353.065 341.666 406.537 341.666zM637.241 350.779c71.598 9.281 117.632-67.141 126.777-125.035 9.349-57.827-36.854-125.036-87.544-136.561-50.791-11.659-114.213 69.688-119.976 122.757C549.597 276.803 565.779 341.566 637.241 350.779zM812.666 691.174c0 0-110.761-85.701-175.425-178.305-87.645-136.593-212.177-81.011-253.822-11.558-41.478 69.452-106.106 113.375-115.286 125-9.314 11.458-133.813 78.666-106.173 201.423 27.64 122.69 124.7 120.345 124.7 120.345s71.53 7.036 154.519-11.524c83.021-18.428 154.484 4.59 154.484 4.59s193.919 64.929 246.988-60.072C895.655 756.037 812.666 691.174 812.666 691.174zM480.881 877.253 354.807 877.253c-54.443-10.855-76.12-48.044-78.867-54.343-2.68-6.433-18.125-36.317-9.951-87.109 23.52-76.12 90.627-81.614 90.627-81.614l67.107 0 0-82.485 57.157 0.871L480.88 877.253zM715.674 876.382l-145.07 0c-56.219-14.508-58.866-54.444-58.866-54.444L511.738 661.49l58.866-0.938 0 144.199c3.586 15.345 22.682 18.159 22.682 18.159l59.771 0L653.057 661.49l62.618 0L715.675 876.382zM921.051 448.006c0-27.708-23.018-111.13-108.385-111.13-85.501 0-96.925 78.732-96.925 134.382 0 53.136 4.489 127.313 110.695 124.935C932.677 593.846 921.051 475.881 921.051 448.006z' p-id='36407' fill='%23008bdd'%3E%3C/path%3E%3C/svg%3E",
				blank: true
			},
			{
				name: "网易-百度",
				url: "https://www.baidu.com/s?wd=%s%20site%3Anews.163.com",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "网易-谷歌",
				url: "https://www.google.com.hk/search?q=site:news.163.com+%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACtAAAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAHRJREFUeJytUUEOwDAIokv//2V3cnFUaJONUyWIaIGPGB0ZQAjxor9c8wBGbeqMXwbcHEAEEM5kdlFdZIY1ULc4MthFTywRd1N5reUXqqC7AQ9oI2Zjclwrczup1vU9lUilYDwGndBx2/gp5OjyiGoFx/+CG9j1PAn7jkYoAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "腾讯新闻",
				url: "https://www.sogou.com/sogou?site=news.qq.com&query=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAC50lEQVR4nG2TS2hcdRTGf/87c+/NHTOZR2ybtEoz7SILWyRqCmKCKeJrI2gJFRc2G4siRF0qglpRcaFFAoqgFkWxtkLdFNGWToSmEGo19EFN2hKSdGaatCb3ZmbuzH0eF7HoVA/84Cw+Pj4O31HcMtG0Nqu09p7otr2sJJ7noYnnsBA2mHnOuqWdc8OT4//WazcXmWZESsOipXf3OOkfqKVeJ6nnMRGuhy6mROzrfbb48I+7V/5jINOM0P35AcIZnMReku07MAwDy7L4dGA/XdY6phqLnKqcYnTrruye8VFpiS2NoyKLL0q0PCau64rn+xKGoURRJFEUyfTSZfli5pBs+35AXi2+ICfnf5HCd/1FAC26lJ0ldsE7TV2G0HUdPZnk3LzDiTmb7e8c4/ycwZ6tu/ig720aCYOJ0k8cHPx4CECJ85HgX4NgDr/zALquM7Wwyj1fnWlJufzyA2RSOldvlBn74316Owq8O3PwLQ2zF5q/QupBEokEAIcv2GCmWth/fBalFN25Ddzf/RgT1ybZnOp6Q8P9Hfwp0LeglALgy6UGtLW1MHZlFQClFI9u2slg4XF0CdFonoHIBu8sAEfOLVH2ANNqwU53rB0cQIS+7L3MezYazUlEAjD7iEV4cvt69nVpYJhgtP2NzvIzhTWDOCYW4Wp1AT8Ox7W6egRQuMsniKJorY2WSW/g8fRGg34zZlscsmB7BEFAve4SxzFeUCVWvEKF/MjipcuyYttSq9fF8zyJokjiOG7hz/GT0vz5uFSs9VK+8y554ujwP2Wq3L5xZfHrb8R2HKnVatJoNsX3fQmCQFZXq1L95DMpk18j0SnlZKdsPnJ3FkDdNCmTl/R7r8GmLrwLVzAG+uH0JI1jh5CwicqYqIyFMky8by/23YEz1WIAUNLzReOpLUMq047WkUbLZNGyObRsJ1p2He6Hh6kWf8sVcOxbv7hlSuTevH7foDijL8mNHUNSIleskOn5P+1fu3twDSB3ukoAAAAASUVORK5CYII=",
				blank: true
			},
			{
				name: "凤凰新闻",
				url: "https://search.ifeng.com/sofeng/search.action?q=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACBAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAA0hJREFUeJxNk11MW3UAxX/39t/ellLAAgUyEBFwIAsOAkNkakxMNjcJ0S1u0ZGZGT+S+WD0wcQn49P0ZZJo0LkYI5i56RwjIzoS2ISEIAzHpxLsYBIKLR+Fln7cllv+PiDVk5zH80tOco7S5kACKOwos6qGrNrHWZ8aZysYIH3vo2hZ2cRWV1i98xuh+7P8X0r7vwCA0jNv4qyqYebCZxQ3n6Hw2EmC7hnWRoYwIhGEzUbYs8DspW+Jr/tRALEbzj/aREHTcQbeaObpy51YXTn0nTpOZHGB7PqD2HLz0FeXMcJhXPUH8f7aixEOQbsDecmVIr3Dg7KroUrOXb8qg54FeflBp+x5qVFu+rwyFoslHV5bldNffyl/KMmVbQ6kEA4HeYeOEl1ZQbFacT17mP4XD2PJzKLuq3YUITAM47/SVhsFJ04hTYKht19DZDxWTUZ1LRszf5J7pInArBvfQD/Vn36BISVS10noOsJuTzKi3iVyG18gr6sD1V5aBlYb24ZB6t5yVocGAcg4UI9/fJRbzz/DzSermDz3EYZhYGxtkUgkmO/4kYKXT6PaCovY2gyi5RciLRrxcAhtTwHbUnL/ynfkHGrEmrcHX18vK8ODBOfusa2qBOfuYcTjqNaCQvTlZVL3VaLabKSWV2DJzOLuu2cRaelszrrZ33IBQ9fx3x1hKxJh7c4Qluwcgn/NoMqEgf3hErZjMVKKikmrqCSz4SmCUxMsdl4l/9gJTCkpbM5MY9I0EnqU0KwbYbcTnv8b4fm+jf2t36B7lxBmMwBl731A8etnMWlWVE3D19O9s9KaOgKTYyhIZDxGZH4OdaW3G9+NDhyFDyGESNrmzMRityOEwN3aQnp5Bc59lSx2XSejtIzAxBjBiTFUgOlzH7J07QqqYWA2m5NWEwaj779D4I9JGi62ExgdIepZIL24BE/nT8Q31nemnIhEWPrlBv7fhxGONIQjjeiyD2//bUxmC8/1DGDSNG6/9Sq1n7TgvthKfGMdBVB23ygecFJ0shlbTi7xUAjFbCarupbs6hoWun9m6vPzlLxymqjPx+T5j9l9cBKwDUjA8UgZrgNPYHXloPvXWBsfRVEUXLV1+Kcm8PbdSoZR4B+hMGuvciFlvwAAAABJRU5ErkJggg==",
				blank: true
			},
			{
				name: "CNN",
				url: "https://edition.cnn.com/search/?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAF/ElEQVR4nI2XXWxURRTHf3Pv3W2loC2flggFET8KSRURo2h8MFFj+AokoAYffIIHHwwESRRfxAcxkVoSTMQnQsAYJaAPopbU2qqhCAJaTW1pawWjtNqy61J7d/fe48Pe2T17WdBJJmfuzNwz5/zPmZn/mPdBDOAAbiQ99W0iSdQ2qi1K6hpGMojJfDRmxx3Aswr1Arpao2y18+LFLky0kO63Y/b/UPV7ttOpUF3KkXCUjC+uFVfqM6pPO+Jp5YmonaA8FFbGDdBKoRzykBLkJuqzBqG+PavQKtde63YcCVt0DujixDzXxtp1QouAVW49TypENDIe5aGwxSq2nlvlJoaANsT2e9eLeyUEKiWjKOXxBa1RUA5/cRfoxdzIy4RCRCOjcyFuABRibrdbQOV8MWos0AhU2nLaMGvA9UJgvdRoWI9dhYaj/vvfCNgxbXA8BEHMOwuz9hwlhWgX2Kq9D1yXsQce4JIIbk0N9Pdzf38/f86aRV9TE9POn2fxwECZ171PPMGwMdzd2oqbzxMAeWPoe+wxvD/+YLy+Huerr5iZyZQOrjaQTpBvQE6DfOt58s/YmIiIDH39tZx9913pOXBAPluxQn565x0REbnY0SEiIicefVQmQDIg327fLn4mI0Pt7SIi8sX69XIBpMfzRETk+5YWERE5sHixdIK0g7SCOPpsDx2H7PPPU11bS8/hw/z28cekLl4k/ddf5EZGmLl8OUE2y+9vv83gkSMsbGnh99pafGOYtHQpQ4cOcXHfPgDu3b27PGFNKWv0mo6O6Yy2Nh5sbqZz2zbmP/44TS+8wPTZs0kPDmJ8n6obbuDv4WEa33wT47pMXbSIm/v7uUmkYNiZM9yzezentm6luq6O3jvvpCoI0CUebk8PNDzyCJcvXGDx5s1UTZ5M5y23sCCVot4mYjJJYAz58XHmrVrFL0ePMm/NGkaMIZtKYYBcOo1TU0PvwYM0vP46oxs2MBeuMsKW4qmaTyYB+GH/fuoWLOD4unUsTKWKO8AA6XS6kL1BgIgwPjTE9zt3Yk6eZO5DDxUSMgxZ8uqrOK7L/NWruW1wEBEpC4EupWPdKTTHR0cBqB4ZuWqyMQaMQYIAI8KCjc8SXrrE9KVLmdHYSGQBhCG3rl3L4LFPmFxfT5jLFfqvZ4Dj+wA0LFsGQN2WLVeTjMhzz/W4fP48E2OjNLW00LtvH4hAEOC6Lu3rNzDc3c3Y2XOcbW6GiQlQuaAPLqd4jotAkGf2svsY6+lh0Zo19E2bxpVEgpzjEBiDl0xiRDAI7qRJ9Lz2GsZ1yZw+zVh3d8HLIEC+bOfHl16m8bnnyPT24iYSSGSASPm96VmKFAIfNi5i3ZmznHnrLX76dYj7z52jauasEmsYv8LwwAAmDJlUV8c9+/fT2dfHg0c/onvnTggF8X3yNTUs6eygesoUlr+xi+6DB0lWVxcNCCmdmp5mMPN7ezn2zNM8eeg9fv7wA77b9QZVN07B9ycwGBzXJZ9KseyVV5BcnhBYeOIE7vRpzH3qKbr37KG6thZclxA419xM07YXGe7oBMfhdgRct5w7tIK0gXSAdIGcAvm0vl6Ob9okksmIXLkiks0Vai4v4vsy2nVC2hsaJA2SBml7+GHJDQ+L+FmRrC+DIBdABkCO3nWXiO+L+Fnp3LFDWo2RdpDjIJ+BmM9BPApbLUnhYEgWAGdgzhyq6meTqK4q3pZeIkGiq4uFmUzxig2AnjlzyK5ciZw6xR0nTxIAuWhscONGmDoVs3cvU4IAP+rPA+YYiL0JqygxImuIZkbX4wNx+q0NyF5DFnNA0yciaS20XEAzWn0daz4YqH91O4xVvb29QCnIUTr14vTpvzihdUQvmlPSOmSrnePZhTRh0BDHmfB/kVIbAs0HtdSGCrFz4FrKAirTck21tWJb80oGFSTWAE2VteJKsY4bAOUhiL8J4zmh5wng5WNKbcI5lAikRSDOBW1bo6ehzleQofoWol0Qhz0OLcqYa72M7Jx4KCqFRr8hi4QkfvM5sYn60RF/nMZ1xJ/lcei18f8CXzwtfnAJiVYAAAAASUVORK5CYII=",
				blank: true
			},
			{
				name: "BBC",
				url: "https://www.bbc.co.uk/search?q=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAq0lEQVR4nO2USwrDMAwFn0vvZR1NvtnzydRN06iNf4FAoGg2NmIUy4oSIAiCILiZ5Pa26F/qPX4jJEESqjrMXPUAQFW7/qEDZoZSCkQEAD6r8095JOFXEfFuahaQ3mG/bxUw8/yhHdKzFd0Sa629xCUv54xSyvAZhxkA9jZt763HzJtdoFvAVZCEiHwN3mhoDYB5SNoWx/5ZnfJU1Uj23Pv/AwtOEARB8Oe8AEX8nWWaRvY7AAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "Economis",
				url: "https://www.google.com/search?q=site:www.economist.com%20%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAQAQAAAAAAAAAAAAAAAAAAAAAAAALEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/CxLj/wsS4/8LEuP/AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//wAA//8AAP//AAD//w==",
				blank: true
			},
			{
				name: "今日头条",
				url: "https://www.toutiao.com/search/?keyword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFN0lEQVR4nMWXTYhTVxTHf+/lJTHJzCTRDE61jiLFhWBBhJbSdiEoVHBTqFoFXVgoiNBNu9GN9mNTLbSF0lpKC1JcVK0iLkQobVEKghWsX6jggFO1MyVOzEsmMy8m79/FmZjJJFH7feBw3/2fc885755zv2CKJA1K+kzSTUl1/fNUl/SrpM8lLWI6SVolqfgvOO1GRUmrABxJg8BFoA/A933i8ThhGBKGIY7j4LoujuMA4HkelUqFyclJOlFfXx+Tk5NUq9U2WSqVIplMNro+sMwDdjScA7iuSxAERCIRwjDEdV1qtRqu6yIJ13WJxWK4rtsxgEgkQjwex/O8Nlk0Gm2JFdjhAWuno6VSiVqtBvDgr6fShOM45HI5KpUKlUqlYwC5XI5yudxxhtLp9MwgXvKAedORarVKNpulVqtRKBQeBJLNZhkbG0MSqVSKeDzeMYBoNEpPTw+JRKJNFovFQIJqFYpFuHfvSQ9om8tSqUQYhsRiMYIgIJPJkMlkKI+PQxBQGR1lYmQEfB98H9f3cUsl3FKJmEQ9n6deKDzAGhwpl21Mc3Y8R4cPi2KRBvu3b0OxiFsuk6pWqebzRMfHcX0fFYsQBDgzI/4b5Aj0D9rrTIkEDAzA8DDU6y2i9lLtRp4H/f2QTMKNG62ylSvhiy/g2DHL8RNPGA8MWJtOg+PAnDkwNtY6VjaklZ9/Xlq3Tlq5som99ZZtIT/91Krb3y/dvm2yUkm6elX67jtp/37po4+ku3dNNjQkJRJtvjoHsH27DQoC6YUXDNu507Dvv2/VfeMN6auvpN27pYULpWjU8Geeka5dszH790t9fe1+ugYA0r590vXr0pEjUiwmvfuuGTtxolXPcaQNG6TLl00+Oip9841Urdrfr1/f2f5DA0gkpAULpHS6ie3ZYw6OHetsLBKRDhxo3fF//93SsGJF1wDa91PPg2+/tYo9fdoKCGDWLGuDoL1AX3wRzpyBTZvgyhXYsgXefhtGRmDtWvjkE9izBwYH2921IbUarF8Pp07B009bdW/YAI2db+Yhs2yZ8d69MDpqq+Sdd2BoCDZvhlyuyUuX2o89chWAFVNPj6Vi+XLLvSSdOSPt2mUpcRzpvfdMdvasVfr4ePdDePXqNj+tM9DTAz/+2Iw4mbT1O52efdb4wAEz8dRTttEMD8P58zB/PqxZAxcuwJdfwnPP2fa7cyfcvduevpaIZs+WLl2SfvhBOnRI+vRT6ejR5h8EgbVvvimlUs1x778vFQrSq69Kr71mOidPms7Nm9bfuvVPLkOQBgak4WEz8PXX0rZt9v3bb1IuZzrz5kkTE9KdO5a2Dz4wnb17Tf7yy9bP523TemgA8+dL585ZLsfGpFrNBp89K82aJbmu9PPPhh0+bGM+/ND6u3dLmYx06pR0/Lg0d27T7saN0iuvWD3NCKD1MFq8GA4ehHv3jAsFaz/+GG7dMp3BQVi0yPJ68SJkMjAxAV0uKI+i/+Y0fAg9/mn4uOQ4hIkEYTKJGu3UdzSdxuvrg1TKVlgyGXosWWLAdE4m27FpeAnMSSKBkklrp5xl5s6lMjlJ0OFO2Nvbi5dKTYdCj2vXWpR83+94pX7kjwMRwHFdIq7b8Vbc6SbtASHT7oXRaLTrlftxyHXdrjYikchMKPSAO8CTDaRcLjMxMfGXA+jv7+9qI5vN2s24SSOOpM+B1xvI/fv3CcPwLwcQjUap1+sdbXieN3MW9jmyh+IvTL2O8vn8vzYDmUyG3t7eRtcHlgH/7+P0AUlaJHs6/6r/8Hn+B0w7zXRC+ZfTAAAAAElFTkSuQmCC",
				blank: true
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
				blank: true,
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
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH3ggEBCQHM3fXsAAAAVdJREFUOMudkz2qwkAUhc/goBaGJBgUtBCZyj0ILkpwAW7Bws4yO3AHLiCtEFD8KVREkoiFxZzX5A2KGfN4F04zMN+ce+5c4LMUgDmANYBnrnV+plBSi+FwyHq9TgA2LQpvCiEiABwMBtzv95RSfoNEHy8DYBzHrNVqVEr9BWKcqNFoxF6vx3a7zc1mYyC73a4MogBg7vs+z+czO50OW60Wt9stK5UKp9Mpj8cjq9WqDTBHnjAdxzGQZrPJw+HA31oulzbAWgLoA0CWZVBKIY5jzGYzdLtdE9DlcrFNrY98zobqOA6TJKHW2jg4nU5sNBpFDp6mhVe5rsvVasUwDHm9Xqm15u12o+/7Hy0gD8KatOd5vN/v1FozTVN6nkchxFuI6hsAAIMg4OPxMJCXdtTbR7JJCMEgCJhlGUlyPB4XfumozInrupxMJpRSRtZlKoNYl+m/6/wDuWAjtPfsQuwAAAAASUVORK5CYII=",
				blank: true
			},
			{
				name: "人生05电影",
				url: "https://www.rs05.com/search.php?s=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIACBAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAkhJREFUeJytk19IU2EYxp9z5s40ZzSRkWOQJIog0dzmH2aECFEIhiSCoN2oECJYYUI3QjqlQdqdF6bYRcwLUQhRxBBkXgQqKaKRjWFYMmnmyMN2FMzv6SI9FnXRvwe+m4f3+/G+L88rCSGIf1ACAEiS9NcA+VfmdjiMT1tbv0cQQpAkhRD8sL7OOxUVdAB0JyXx3doajxVaWWG1w8Eal4s1Lhdr3W7OTU9TB7ycmmKJ1UonwFKrlbfLy+ltbCRJxlWVFTk5zAPoPHqXLRZGIxEmAMBGMIj2hgbg8BCdfj8uejzY0zT0d3VhX9Nwt6oKqenpuNfTA0mWQQDnsrNxJi0NeLO4yCs2GwtMJr4KBPSWnw8O0tvUxIVAgBcMBo729fFxayuf+nyMqapeh/b6ejolif2dnbqpRqMssdk47vdzZmyMTlnWW88D2FJZeQK4npnJktRURiMR3ez3+VhgNvN9KMTPOzt82NzMF8PD/Li5ydDqKmuKini8O+QbjXzW3a1/nh0fZ57RyJ6WFr3oWEII9ra1sbaw8ARwKSWFb5eW+OXggKMDAyw2m3nT4+GepnF2YoJPOjoYU1W+np/n/epquo1G9nm9OlS6VVrKpORkaLEYFmZmcDYjA72Tk1ASE3EjNxfns7KgxePYDIUgGQwoLivDo5ERKIryLUjB5WVes9vpkmU+qKvjdjhMktwIBpmvKPryrtrtnBwa4r6m/TCWdDQL9jUNp8zm7xOKlbk5xHd3cdpiQbbDAcVk+inJkhCC//2Y/kRfASoRrtb2v2kbAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "射手网(伪)",
				url: "https://assrt.net/sub/?searchword=%s",
				favicon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAADfElEQVR4nF2TQUxTdxzHv7//e319pH3QEi3MAYMpqWZj1c1lESIz0WwLXmZl7CAXjCYzuyCJJPVgPAy8zZglEuRA5sLJiIlm4ExmQtDilmVgQrDCsq2WuRRKoX20tO+9//vtglni9/z5fk7fLzEzXs+T8+f3rTx6VItSSV2fn4/qVVVjX25szACQ3xLt72Oee8XS64LfYrHe9bm5Do/P50mOjxvEHJZESx8MDKzv6O5mZ3bWHz9z5s8t0/wOzDPqq+JPx49/nJqY+CIYDkcPj46+wa6L5N27YNuGZD5gmyZ21dcjnUxCWtZHKJU+8er6VQEAP9TUtIZ7esbbR0a+lqZZLUslu6atzYlcvCgl4BLgCE2zXdd1lm7edMxcziKgOhCJfKMCQGFlJZpfWqp+LxYrldfXPc9u3IC+cyf9Oz0tBOBKQAURCyEgVBXBhgbFSqcdaVlCAAAB+7Nzcy67rvJWZyftO3eOVuNxpB4+ZAmQBFitqCAA3NLfT9GFBT4wOEiObbvqtmCjnMkQiLA0PMyKYUDVdaH7fNTU2cl1HR1Ue/Qou8xkNDZybnGRVuNx8vr9qjpFFCDAkYUC2ZubqNq7l6x8nkPt7fjs0CGEWlsZAJVzOSKAnw0N0e+XLrnlTEbUHjy4JjKVlbUuUOEyO7JUonI2i2AkQm6xiF/6+vDjkSN0a88e/DE6CiJCenqazUzGNUIhrj12bEj8VSjU6Iax693+flfRNKpsbqZQa6v458EDyHIZgXCYpGWBpQQAaJWVEIAiNG3r/StXBgRL+XbTiRM+f1OT/WtvL3kMg8vZLDd2deHT+/fRNjzMkQsXgO3BqYbBBJAsFh1zcdFW5xXlxZuTkykzkZAfXrv2TiGV4uWJCTR2dWFhbIzTjx9TLpFAJBYDtjUMsDcUyq/OzEB87zg/b62urjWfPbubhHCmTp8mUhTKJRLs5PMkPB6spdNgAMxMiqa5BEAJBmdnL1+WKgDYwJ2ng4OfF1MpKR2HG6JRpfjyJf6+d889PDJCu0+domBLC4iINb9fAlB9qhooAxAA8BXzLW8gcMeoq9MVXdde3L6tFJJJJZ9MiumeHlJ9PgQjEUjLEuVs1uvRdeuppl3VAoH/37g8OVllZbP9ievXA8l43OvXtJDrOHV6MLiDdL2+8eRJ2KYZ31xeTnoDgalCd/dw3fPn4j+2Ya+YXX1PBgAAAABJRU5ErkJggg==",
				blank: true
			},
			{
				name: "游戏-3dm",
				url: "https//so.3dmgame.com/?type=4&keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIAALAwAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAtJJREFUeJydU0tIVGEU/v57r3dmdJzG0a6T6UyaM6GZYkJhBRZE9EJcCEVpVIuIyGhRi6hNBC5bBBJRqxgiopoWlVZoVvQgUsuaIZPyNabzuukd5zre199CMaMk6IPDgXP4vvNxDgdYBKET/GKt30D+Vrx8alu5JCn5Jl4Mfg9zwpoyy7j2JjV8qLXr3wLnfV4UBB2bSyqXt7gKM0vtdjMkSUU0nOzu7Qqfbjj3tGNRgRgFHl3YsnPL7iK/IJh4EIBQAkoMEINC/KFrT+8N7Nmf77yrHvb9KXC7qdxaVlfe7/EucRJQTM9oYBiCkYEEXEWZmJY1RKOK+OROYFVZrTDR91At4n7zn2evdzgtzgedI1BUQJI0yLKKowe8aO2IYGhEQoaVOIrLlx1LDbPipu2OSvK5dS9vzx5XfIEhVGulfq+k14VjMzDVuBAKxUAjERjTMsCxYCzpyF2aA9PzyLh130p71MB1LqkzXSSRb1ufln0rN8+01ZyYgduVicl0DY6cJdCyV0FTOBAiw2KKw11iQzzP6szyZmGsW4xwUJRXxZXOI6mUcsq92g4GAAWFyVyBZenrAMLO75tSBUbyLXjpLQwdCA2IPczHz+GW4cGplKdklgwQUL4YbMYGEMKBAQEDgAEFQ9LAWjdCT3Ojv18KMkZOGxPrSxpiVJbkpA5Np0ilVMCyBoQuPBEBQEDmMjWvfRVIjFUNVbfJJD4R53wndzmFwoymAo/tIM9DqNpxBoQxzRF+wQCgGxSBZ88bK3c2+QCAybJlofHivXFLw46zr9vHaghLBg2qzk4C5sMAoGoaPrx8eTN4tfnGvDdKKQcAycQM7sff4X3zJVt1he3KikJPvUVwgbAsdINO/fgaYEY7/Wb7asG99Xh7aKEAAwC6rmM0JqJv8hp6H6s297cXtZMOjyhDmKAZrGymiplXk+kjSfZLz6evMb/fL//xWf+Dnxs2M3yo2q6nAAAAAElFTkSuQmCC",
				blank: true
			},
			{
				name: "搜狗表情",
				url: "https://pic.sogou.com/pic/emo/searchList.jsp?statref=home_form&keyword=%s",
				favicon: "data:image/x-icon;base64,AAABAAEAEBAAAAAAIADiAgAAFgAAAIlQTkcNChoKAAAADUlIRFIAAAAQAAAAEAgGAAAAH/P/YQAAAqlJREFUeJxtk0+IVXUUxz/n/O67772rjdH1NVpRoeVo1sZavnI0S0vFhaOBpC4S/0AuCqE0aNGi3IS4kEkEF+EiyoVhxIyKNsxYGxERFEVI5w/WKE/GAe/YvHfPadEdkaGzPH8+fM/he4RpkdXTOvARwjKgvUiP4pwDjiYDjf7H++WxwVlAN0on0A2cBAaL8gvAWmAXRh+wMxlo3H8EyOrpk8BZlOsIO5K+xvh0ZQDZ0rQN5zBGB7A8GWiMTQF+RGkhbCbIAlHZRJBXUUkEHrj7EMZFz+00ud/BOIYRkoHGRsnqaSfKMYRXUFktQb6npJFECkEeAkbuVVom3jTz3L/C/ADOVYwPFdgGfJf0NcZFZQcljSQOSCX0SFmfkVjnEOsiIt1OpKckyMxixW5gmyJ0FgeDSP6USJFYkUp4W2fEB7UtfkOfiG9WTv51pNoz+h6Rflac5BeETgVqOMMABN1DkOMS1KSkJamGzVIOZyXIrclNz3/zz/pna9WeUSsAw0BNAQcUoPrr3/cqJ25vcPx14BDOMA64z8X43HO/NvF++/ICoIArMITQATDxTm3rxKr22eUfhi+Vjt782LLmfHvQXOmTdt1zg9yfouX7C8BCYDDC6UXYAJz33D+RwKGHa+YcJ2ivjU/eEJExYMRb1uFNg9ynVujCOSVZPV2M0I+wBGWdBN1NSedLJKCFUc3xlkPTRt28C/MRnIsYb04Z6WuUFQjvJn2NsWxFbbEEWYLIc0Ab7uOYX8E5XT1zdyJbmu7HsKS/sS8q5HyJMQ/lt+ytdEty5u5l4Mr/2RlA4jDkLfvj0S8UKhT4FGEvwu/Azzg3/pvgZeAlKYdvw9OVL7xpH9j9ybXV3jsXZDo9q6c1YCOwDOHFIn0LOIfyms6KUymHPeWfRgYB/gUGFwYmsuO+WAAAAABJRU5ErkJggg==",
				blank: true
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
      margin: 1px auto;
      grid-column: 2 / -2;
    `,
			style_ACBaidu: `
      text-align: center;
      z-index: 100;
      margin: 1px auto;
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
      margin: 1px auto;
    `,
			style_ACBaidu: `
      text-align: center;
      z-index: 100;
      margin:5px auto 0;
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
			style_ACBaidu: `
      margin: 8px auto -5px;
      z-index: 99;
      text-align: center;
      padding-left:0px !important;
      background: rgba(248,248,248,0.4);
      backdrop-filter: blur(10px);
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
      margin: 1px auto;
    `,
			style_ACBaidu: `
      text-align: center;
      margin: 0 auto -10px;
      position: sticky;
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
			style_ACBaidu: `
      top:-46px;
      z-index:99;
      margin: auto;
      padding-left: 0px !important;
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
			style_ACBaidu: `
      text-align: center;
      z-index: -99999;
      margin:5px auto 0;
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
	var XIAOHONGSHU = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAXSSURBVGhD7ZprbBRVFMf/O1ta+qDQUh5CKS+hVQMVFBAiNjUBixJRUT4YE8UPPj5VjSlEjaIJiFWgpUaBgOURsFIVtNFQo5IoUouNBYq2gKVvoZXtA0rpdndbz+m5Q6ez27JEozvJ/pLp3HvuzOw99zzumUltMJAUGpH0YuyEl+6LHJkWHxIWbwf6jf/feICeerezvvCK49Cm5rqNFV0dFWqob6LpMfHp60dOyRxqt4cqUUDT6fF0rXacy8huqc/mPi26KJE1elpWiKb19q0AzzWNPKe1291a3Hmp2MbuVJpw5wmrWMIMW2ZWbUmyfe2oKevmhQ+fq+SWgy0TqmlhtuqpC2onhoRNUHJLUuN21tnciandgZadbhTOZhzdllaCYR001bY8QUUCjaAigUZQkUAjqEigYetJTO1R7YEJo8L4ptGkNuntaAHaLqsBH4wdBdx+q7QrKoHqemlfDzs9O3W+tBsdQNm1dya/8E+RGUlA/gfSztoBbNkrbV+sywAeSaPqhx679GmgsobuTwRiR9BCUDGhUUXkdsu1tX8CVXXA3GQZz3pD5CfKgW37gNZLwKnTgLNL5DwPpxM4UyV9A/4pMus24OMcaQ+mSFwM8H0eEDoEOHwUeP41kW99G0iZJ20jW+k5m+h5hbuBifFKaKK5FXjhTaCbprkni87dwMPPkDLn1AWCfzFi87OufPwhUYLZ/bmc/ylsqcxXgMQpNA/qs3uzq5uwr4mbvEa1+3jqMeDBRcD82cCREomP5Utk7OdSoKSMJr2MVoZcKOUu4Mdj9PAw4L1XgfChch27z4I7gI5Oca+T5C4L1ftb40UgJxcoPg5c+Au40kExQS7Ev8ecptVm14oeJjEXFQns+wIoPQXszAd+pbMJ3xZhH+eJLklVAh/MniHX8ME/+MC9QMxwNUg8ej+wYqkE+3c/Abs+UwNEC7kL90t/k/6BQrKgYZzjhvtHflECouGCKMML6QPfiugTaqNgG4jWNtUgRtD1Xa6+INYp+Ba42Kw6A5AwHrjlZjl0oqOkPyZOCYjJ9BIbEa463vhWZES0nJsNkzXTYhiLoet50jPJkrxqDGetnZ9KezDWvkwW2Ub3bVYCgl2SZWxVnRwK+KIDwMoVStAfb0WiIoAhIdI2rroZTo06bBGG7122WNrsAme906QXHLz+wkGe8SxZcZwS9OH9FH1STMsgrsVpUYctwiynFYxU5ucf27a+z7oDwZbc8QmlVkOWq6G4+mi/yPnIpQBvaJQxzqDTKYOZ8FZkkiGf19GGNRD151WD0PeARXfLmRk/lv6Qexkt54u8AuDdrcDG7UpAlFNFkLlF5Hy88yEpRgrp+NgOvBVpotSob5HHf5ezr22EU+RVSq0Mp1MmZ6fExd6DknU2U//fwkXJRIfjz4S3Irz9H6W943xTnyL63mCEsxSnVa67Dh4Cpk0C5syUsuMP2jc47fLum0x1l56mddh9ddn0yUo4AByvfMRS1aBj9/6yq6LaRC755zhyDdb8a1pVTn06RlfhEqOmQTa9556QvUSHN7u8L4H1q/rfz/Am93q6tN/K9lk79cKFZOEemssYJVCw15jwtgjDu3n+V6II+7Duk7wLF/4gbeZsNfD+LomHtBQlVHCQpi7wVuJG8FBdxW5q5Bv6fd1TDFy/aIwgt7qHCr5OqkBLTgLtV9SAAd7AuLAcRmf2ZRdtjIeLgKSppKRpNc1UkPtx4mB30ZMFL5g+2UhK6QvnyKLy7n7qjMhN+Ff9WgDfrmVBgooEGkFFAo2gIoFGUJFAQ3P3fiiyNqyDVuPqoprb2rAOGv+DiupbFtbBlhgakXgiYW5ZmN2mPhFaC6enx5Vce2yG3eFxOa7C07E4MlZ9/rAWqx2VqwraHQW974xFVy8Vtfd42lOGxqSGaDbv98gAhC3BSmxortvA/WuTZmXy25v2azabPdYeGhdt14Zrfn+9/m/g7FTlclbnXW7MW9lY/iRbQkaAvwEWveocTKmI8QAAAABJRU5ErkJggg==";
	var X_ICON = "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAB7ElEQVR4Ae1XMZLCMAwUdw0ldJQ8ATpKnkBJByUd8ALyA/gBdJTQUtHS8QT4AaRM5ctmThmfogQ75CYNmhGTbGJr45Vk0yAiQzXaF9VsHwIZAofDgYwxqo9GI/K16/X6cqyxvdVqmdvtZh6PhwmCIHXcw7vdrpFj8ny9XhsYxhe8lwWHw2EycLFYpNh0Ok2w8/nsFHy1WrkE1wnAN5tNMkGv10ux3W6XIab5fD5P3ovldCGrP2Ap4LiW8uRJAcIwe1wpArYU0FJimhQgxaQ9cqX4BZYCgSVmS8HBfRP1JQEsY1xKGSmAcTC+l0QrIWDraicVMBBA4O1265ScpQnAMbkMwphjub1HAI7EkxoDK7n0/gQQGATsCmDMo+z++Hf8E5CjPZ9PiqKIZrMZhWFIl8slxcbjMTWbTTqdTuRrXoz5i2WXRIL+WxWw2+Uml13rnJUT4K9E9nMFaF3SxiojoO1u2rJzl4z3/+oIcHBMLiUp2rDe3ozg+BIYtNee87KjGzLGndPx7JD/0K7xog2Gl30ymaSY1jm9CPhsrXnnBK1zOhHgCWWtF7l2TtA6p3S1E+73exoMBrRcLul4PJKL3e93arfbSUeMA1O/36eYPHU6nWQu7pyaqRlfZnezV05anhSN34va7PPXrHYCP+VaTG3LBV1KAAAAAElFTkSuQmCC";
	var TIEBA = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTc1MC4zNTEgNTQxLjA1Nkg2MDAuODI3djIxNC40NjdoMTE1LjUyMmMzNS40NTYgMCAzNC4wMDItNDEuMTI0IDM0LjAwMi00MS4xMjRWNTQxLjA1NnoiIGZpbGw9IiMyNDgyRkQiLz48cGF0aCBkPSJNODQ5LjkyIDUxLjJIMTc0LjA4Yy02Ny44NjYgMC0xMjIuODggNTUuMDE0LTEyMi44OCAxMjIuODh2Njc1Ljg0YzAgNjcuODY2IDU1LjAxNCAxMjIuODggMTIyLjg4IDEyMi44OGg2NzUuODRjNjcuODY2IDAgMTIyLjg4LTU1LjAxNCAxMjIuODgtMTIyLjg4VjE3NC4wOGMwLTY3Ljg2Ni01NS4wMTQtMTIyLjg4LTEyMi44OC0xMjIuODh6bS0zNTguNzA3IDc2OGMtOTcuNTk4IDAtMTQxLjU5OS03My4yNTItMTQxLjU5OS03My4yNTItNTEuODUgODAuNDQtMTQxLjU5NCA3My4wNzMtMTQxLjU5NCA3My4wNzN2LTYzLjUwNGMxMDguNzI5IDAgMTA4Ljc4LTEwNy4yMjggMTA4Ljc4LTEwNy4yMjhWMzE3LjQ2Nmg2NS42MjN2MzMwLjgyM2MwIDEwMi45MDcgMTA4Ljc4NSAxMDcuMjI4IDEwOC43ODUgMTA3LjIyOFY4MTkuMnptMC02MDguNTg0VjY1OC4zNUg0MjUuNTlWMjczLjM4OEgzMTQuNDM1Yy00MS41MjkgMC00MC43ODEgMzMuMTM2LTQwLjc4MSAzMy4xMzZWNjU4LjM0aC02NS42MjhWMzA2LjUzYzAtOTguMDg1IDEwNi40MDMtOTYuNjQgMTA2LjQwMy05Ni42NGgxNzYuNzg0di43MjZ6bTMyNC43NjEgNTAzLjc3OGMwIDEwMy45MTUtOTkuNjI1IDEwNC42MzItOTkuNjI1IDEwNC42MzJINTM1LjIwNFY0NzcuNTU4aDYwLjUxOFYyMDQuOGg2NS42MjN2NjcuODU1aDE1NC41MzJ2NjcuNzM4SDY2MS4zNDV2MTM3LjE2aDE1NC42M3YyMzYuODR6IiBmaWxsPSIjMjQ4MkZEIi8+PC9zdmc+";
	var STORAGE_KEY = "searchEngineJumpData";
	var SCRIPT_VERSION = "5.32.7";
	function createDefaultSettings() {
		return {
			status: 1,
			version: SCRIPT_VERSION,
			addSearchItems: true,
			modifySearchItems: true,
			newtab: 0,
			debug: false,
			fixedTop: true,
			fixedTopUpward: false,
			baiduOffset: -120,
			getIcon: 0,
			HideTheSameLink: true,
			center: 2,
			icon: 1,
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
	function migrateLegacyKeys(data) {
		if (!data || typeof data !== "object") return false;
		const has = (key) => Object.prototype.hasOwnProperty.call(data, key);
		let changed = false;
		if (!has("engineCategories") && has("engineDetails")) {
			data.engineCategories = data.engineDetails;
			changed = true;
		}
		if (has("engineDetails")) {
			delete data.engineDetails;
			changed = true;
		}
		if (data.engineList && Object.prototype.hasOwnProperty.call(data.engineList, "engineCategories")) {
			delete data.engineList.engineCategories;
			changed = true;
		}
		return changed;
	}
	function pruneUnknownKeys(data, defaults) {
		let changed = false;
		for (const key of Object.keys(data)) if (!Object.prototype.hasOwnProperty.call(defaults, key)) {
			delete data[key];
			changed = true;
		}
		return changed;
	}
	function isVersionOutdated(storedVersion, currentVersion) {
		const arr1 = storedVersion.toString().split(".");
		const arr2 = currentVersion.toString().split(".");
		const minlength = Math.min(arr1.length, arr2.length);
		let i = 0;
		for (; i < minlength; i++) {
			const a = parseInt(arr1[i]);
			const b = parseInt(arr2[i]);
			if (a > b) return false;
			if (a < b) return true;
		}
		if (arr1.length > arr2.length) {
			for (let j = i; j < arr1.length; j++) if (parseInt(arr1[j]) != 0) return false;
			return false;
		} else if (arr1.length < arr2.length) {
			for (let j = i; j < arr2.length; j++) if (parseInt(arr2[j]) != 0) return true;
			return false;
		}
		return false;
	}
	var Settings = class {
		constructor() {
			this.storedSettingData = getValue(STORAGE_KEY, null);
			this.scriptSettingData = createDefaultSettings();
			this.settingData = null;
			this.initSettings();
		}
		checkSettingDataIntegrity() {
			let changed = migrateLegacyKeys(this.settingData);
			changed = pruneUnknownKeys(this.settingData, this.scriptSettingData) || changed;
			for (const value in this.scriptSettingData) if (!Object.prototype.hasOwnProperty.call(this.settingData, value)) {
				console.warn(`[SEJ] 属性不存在：${value}`);
				this.settingData[value] = this.scriptSettingData[value];
				changed = true;
			}
			if (changed) setValue(STORAGE_KEY, this.settingData);
		}
		checkUpdate() {
			if (!isVersionOutdated(this.storedSettingData.version, this.scriptSettingData.version)) return;
			this.settingData.version = this.scriptSettingData.version;
			if (isVersionOutdated(this.storedSettingData.version, "5.30.2")) {
				this.deleteOutdatedSearchItems(["https://so.letv.com/s?wd=%s"]);
				this.modifyOutdatedSearchItems("https://s.weibo.com/weibo/%s", "https://s.weibo.com/weibo/?q=%s");
			}
			if (isVersionOutdated(this.storedSettingData.version, "5.30.4")) this.modifyOutdatedSearchItems("https://www.startpage.com/do/asearch$post$query", "https://www.startpage.com/sp/search$post$query");
			if (isVersionOutdated(this.storedSettingData.version, "5.31.1")) {
				this.modifyOutdatedSearchItemsTarget("https://zh.moegirl.org/%s");
				this.modifyOutdatedSearchItemsTarget("https://tieba.baidu.com/f?kw=%s&ie=utf-8");
				this.modifyOutdatedSearchItemsTarget("https://github.com/search?utf8=✓&q=%s");
			}
			if (isVersionOutdated(this.storedSettingData.version, "5.31.8")) this.modifyOutdatedSearchItems("https://cn.bing.com/search?q=%s", "https://www.bing.com/search?q=%s");
			if (isVersionOutdated(this.storedSettingData.version, "5.31.11")) this.addSearchItem({
				name: "小红书",
				url: "https://www.xiaohongshu.com/search_result/?keyword=%s",
				favicon: XIAOHONGSHU
			}, "sociality");
			if (isVersionOutdated(this.storedSettingData.version, "5.31.16")) {
				this.deleteOutdatedSearchItems(["https://twitter.com/search/%s"]);
				this.addSearchItem({
					name: "X",
					url: "https://x.com/search?q=%s",
					favicon: X_ICON
				}, "sociality");
			}
			if (isVersionOutdated(this.storedSettingData.version, "5.31.17")) this.modifyOutdatedSearchItemsIcon("https://tieba.baidu.com/f?kw=%s&ie=utf-8", TIEBA);
			setValue(STORAGE_KEY, this.settingData);
		}
		initSettings() {
			if (this.storedSettingData) {
				this.settingData = Object.assign({}, this.storedSettingData);
				this.checkSettingDataIntegrity();
				this.checkUpdate();
			} else this.settingData = this.scriptSettingData;
		}
		applySettings(next) {
			const source = Object.assign({}, next);
			migrateLegacyKeys(source);
			const merged = Object.assign({}, this.scriptSettingData, source);
			pruneUnknownKeys(merged, this.scriptSettingData);
			const plain = JSON.parse(JSON.stringify(merged));
			pruneUnknownKeys(this.settingData, this.scriptSettingData);
			Object.assign(this.settingData, plain);
			this.storedSettingData = this.settingData;
			return setValue(STORAGE_KEY, this.settingData);
		}
		savePartial(partial) {
			if (!partial || typeof partial !== "object") return "memory";
			const next = Object.assign({}, this.settingData, partial);
			return this.applySettings(next);
		}
		reload() {
			const stored = getValue(STORAGE_KEY, null);
			if (!stored || typeof stored !== "object") return false;
			migrateLegacyKeys(stored);
			if (this.settingData && isSameValue(stored, this.settingData)) return false;
			this.storedSettingData = stored;
			this.settingData = Object.assign({}, stored);
			this.checkSettingDataIntegrity();
			return true;
		}
		getMatchedRule() {
			for (const rule of [...searchEngineJumpPlusRules]) if (rule.url.test(location.href)) return rule;
			return null;
		}
		addSearchItem(newItem, category) {
			this.settingData.engineList[category].push(newItem);
		}
		modifyOutdatedSearchItems(oldURL, newURL) {
			for (const value in this.settingData.engineList) {
				const item = this.settingData.engineList[value];
				for (let i = 0; i < item.length; i++) if (item[i].url === oldURL) item[i].url = newURL;
			}
		}
		modifyOutdatedSearchItemsTarget(url) {
			for (const value in this.settingData.engineList) {
				const item = this.settingData.engineList[value];
				for (let i = 0; i < item.length; i++) if (item[i].url === url) delete item[i].blank;
			}
		}
		deleteOutdatedSearchItems(urlList) {
			for (const value in this.settingData.engineList) {
				const item = this.settingData.engineList[value];
				for (let i = 0; i < item.length; i++) if (urlList.includes(item[i].url)) {
					console.warn("[SEJ] 删除搜索引擎：" + item[i].name);
					item.splice(i, 1);
				}
			}
		}
		modifyOutdatedSearchItemsIcon(url, newIcon) {
			for (const value in this.settingData.engineList) {
				const item = this.settingData.engineList[value];
				for (let i = 0; i < item.length; i++) if (item[i].url === url) item[i].favicon = newIcon;
			}
		}
		modifyOutdatedSearchItemsRule(name, value) {
			const oldRule = this.settingData.rules;
			for (const item in oldRule) if (oldRule[item].name == name) oldRule[item] = value;
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
	function resolveRuleStyle(rule, settingData) {
		if (!rule?.style) return "";
		let style = rule.style;
		if (settingData.center == 2) {
			if (document.querySelector(".AC-style-logo") && rule.style_ACBaidu) style = rule.style_ACBaidu;
		} else if (settingData.center == 1) style = rule.style_ACBaidu ? rule.style_ACBaidu : rule.style;
		const searchMain = document.getElementById("SearchMain");
		if (searchMain && searchMain.style.marginLeft == "150px") style = rule.style_ZhihuChenglinz;
		addStyle(`#sej-container { ${style} }`);
		return style;
	}
	function applyStylish(rule) {
		if (!rule?.stylish) return;
		addPageStyle(rule.stylish);
		const scriptElementStyles = rule.stylish.match(/#sej-container(-wrapper)?\s*\{[^}]+\}/g);
		if (scriptElementStyles) scriptElementStyles.forEach((ruleText) => addStyle(ruleText));
	}
	function toGBK(str) {
		var map = {
			12288: "A1A1",
			12289: "A1A2",
			12290: "A1A3",
			183: "A1A4",
			713: "A1A5",
			711: "A1A6",
			168: "A1A7",
			12291: "A1A8",
			12293: "A1A9",
			8212: "A1AA",
			65374: "A1AB",
			8214: "A1AC",
			8230: "A1AD",
			8216: "A1AE",
			8217: "A1AF",
			8220: "A1B0",
			8221: "A1B1",
			12308: "A1B2",
			12309: "A1B3",
			12296: "A1B4",
			12297: "A1B5",
			12298: "A1B6",
			12299: "A1B7",
			12300: "A1B8",
			12301: "A1B9",
			12302: "A1BA",
			12303: "A1BB",
			12310: "A1BC",
			12311: "A1BD",
			12304: "A1BE",
			12305: "A1BF",
			177: "A1C0",
			215: "A1C1",
			247: "A1C2",
			8758: "A1C3",
			8743: "A1C4",
			8744: "A1C5",
			8721: "A1C6",
			8719: "A1C7",
			8746: "A1C8",
			8745: "A1C9",
			8712: "A1CA",
			8759: "A1CB",
			8730: "A1CC",
			8869: "A1CD",
			8741: "A1CE",
			8736: "A1CF",
			8978: "A1D0",
			8857: "A1D1",
			8747: "A1D2",
			8750: "A1D3",
			8801: "A1D4",
			8780: "A1D5",
			8776: "A1D6",
			8765: "A1D7",
			8733: "A1D8",
			8800: "A1D9",
			8814: "A1DA",
			8815: "A1DB",
			8804: "A1DC",
			8805: "A1DD",
			8734: "A1DE",
			8757: "A1DF",
			8756: "A1E0",
			9794: "A1E1",
			9792: "A1E2",
			176: "A1E3",
			8242: "A1E4",
			8243: "A1E5",
			8451: "A1E6",
			65284: "A1E7",
			164: "A1E8",
			65504: "A1E9",
			65505: "A1EA",
			8240: "A1EB",
			167: "A1EC",
			8470: "A1ED",
			9734: "A1EE",
			9733: "A1EF",
			9675: "A1F0",
			9679: "A1F1",
			9678: "A1F2",
			9671: "A1F3",
			9670: "A1F4",
			9633: "A1F5",
			9632: "A1F6",
			9651: "A1F7",
			9650: "A1F8",
			8251: "A1F9",
			8594: "A1FA",
			8592: "A1FB",
			8593: "A1FC",
			8595: "A1FD",
			12307: "A1FE",
			8560: "A2A1",
			8561: "A2A2",
			8562: "A2A3",
			8563: "A2A4",
			8564: "A2A5",
			8565: "A2A6",
			8566: "A2A7",
			8567: "A2A8",
			8568: "A2A9",
			8569: "A2AA",
			9352: "A2B1",
			9353: "A2B2",
			9354: "A2B3",
			9355: "A2B4",
			9356: "A2B5",
			9357: "A2B6",
			9358: "A2B7",
			9359: "A2B8",
			9360: "A2B9",
			9361: "A2BA",
			9362: "A2BB",
			9363: "A2BC",
			9364: "A2BD",
			9365: "A2BE",
			9366: "A2BF",
			9367: "A2C0",
			9368: "A2C1",
			9369: "A2C2",
			9370: "A2C3",
			9371: "A2C4",
			9332: "A2C5",
			9333: "A2C6",
			9334: "A2C7",
			9335: "A2C8",
			9336: "A2C9",
			9337: "A2CA",
			9338: "A2CB",
			9339: "A2CC",
			9340: "A2CD",
			9341: "A2CE",
			9342: "A2CF",
			9343: "A2D0",
			9344: "A2D1",
			9345: "A2D2",
			9346: "A2D3",
			9347: "A2D4",
			9348: "A2D5",
			9349: "A2D6",
			9350: "A2D7",
			9351: "A2D8",
			9312: "A2D9",
			9313: "A2DA",
			9314: "A2DB",
			9315: "A2DC",
			9316: "A2DD",
			9317: "A2DE",
			9318: "A2DF",
			9319: "A2E0",
			9320: "A2E1",
			9321: "A2E2",
			12832: "A2E5",
			12833: "A2E6",
			12834: "A2E7",
			12835: "A2E8",
			12836: "A2E9",
			12837: "A2EA",
			12838: "A2EB",
			12839: "A2EC",
			12840: "A2ED",
			12841: "A2EE",
			8544: "A2F1",
			8545: "A2F2",
			8546: "A2F3",
			8547: "A2F4",
			8548: "A2F5",
			8549: "A2F6",
			8550: "A2F7",
			8551: "A2F8",
			8552: "A2F9",
			8553: "A2FA",
			8554: "A2FB",
			8555: "A2FC",
			65281: "A3A1",
			65282: "A3A2",
			65283: "A3A3",
			65509: "A3A4",
			65285: "A3A5",
			65286: "A3A6",
			65287: "A3A7",
			65288: "A3A8",
			65289: "A3A9",
			65290: "A3AA",
			65291: "A3AB",
			65292: "A3AC",
			65293: "A3AD",
			65294: "A3AE",
			65295: "A3AF",
			65296: "A3B0",
			65297: "A3B1",
			65298: "A3B2",
			65299: "A3B3",
			65300: "A3B4",
			65301: "A3B5",
			65302: "A3B6",
			65303: "A3B7",
			65304: "A3B8",
			65305: "A3B9",
			65306: "A3BA",
			65307: "A3BB",
			65308: "A3BC",
			65309: "A3BD",
			65310: "A3BE",
			65311: "A3BF",
			65312: "A3C0",
			65313: "A3C1",
			65314: "A3C2",
			65315: "A3C3",
			65316: "A3C4",
			65317: "A3C5",
			65318: "A3C6",
			65319: "A3C7",
			65320: "A3C8",
			65321: "A3C9",
			65322: "A3CA",
			65323: "A3CB",
			65324: "A3CC",
			65325: "A3CD",
			65326: "A3CE",
			65327: "A3CF",
			65328: "A3D0",
			65329: "A3D1",
			65330: "A3D2",
			65331: "A3D3",
			65332: "A3D4",
			65333: "A3D5",
			65334: "A3D6",
			65335: "A3D7",
			65336: "A3D8",
			65337: "A3D9",
			65338: "A3DA",
			65339: "A3DB",
			65340: "A3DC",
			65341: "A3DD",
			65342: "A3DE",
			65343: "A3DF",
			65344: "A3E0",
			65345: "A3E1",
			65346: "A3E2",
			65347: "A3E3",
			65348: "A3E4",
			65349: "A3E5",
			65350: "A3E6",
			65351: "A3E7",
			65352: "A3E8",
			65353: "A3E9",
			65354: "A3EA",
			65355: "A3EB",
			65356: "A3EC",
			65357: "A3ED",
			65358: "A3EE",
			65359: "A3EF",
			65360: "A3F0",
			65361: "A3F1",
			65362: "A3F2",
			65363: "A3F3",
			65364: "A3F4",
			65365: "A3F5",
			65366: "A3F6",
			65367: "A3F7",
			65368: "A3F8",
			65369: "A3F9",
			65370: "A3FA",
			65371: "A3FB",
			65372: "A3FC",
			65373: "A3FD",
			65507: "A3FE",
			12353: "A4A1",
			12354: "A4A2",
			12355: "A4A3",
			12356: "A4A4",
			12357: "A4A5",
			12358: "A4A6",
			12359: "A4A7",
			12360: "A4A8",
			12361: "A4A9",
			12362: "A4AA",
			12363: "A4AB",
			12364: "A4AC",
			12365: "A4AD",
			12366: "A4AE",
			12367: "A4AF",
			12368: "A4B0",
			12369: "A4B1",
			12370: "A4B2",
			12371: "A4B3",
			12372: "A4B4",
			12373: "A4B5",
			12374: "A4B6",
			12375: "A4B7",
			12376: "A4B8",
			12377: "A4B9",
			12378: "A4BA",
			12379: "A4BB",
			12380: "A4BC",
			12381: "A4BD",
			12382: "A4BE",
			12383: "A4BF",
			12384: "A4C0",
			12385: "A4C1",
			12386: "A4C2",
			12387: "A4C3",
			12388: "A4C4",
			12389: "A4C5",
			12390: "A4C6",
			12391: "A4C7",
			12392: "A4C8",
			12393: "A4C9",
			12394: "A4CA",
			12395: "A4CB",
			12396: "A4CC",
			12397: "A4CD",
			12398: "A4CE",
			12399: "A4CF",
			12400: "A4D0",
			12401: "A4D1",
			12402: "A4D2",
			12403: "A4D3",
			12404: "A4D4",
			12405: "A4D5",
			12406: "A4D6",
			12407: "A4D7",
			12408: "A4D8",
			12409: "A4D9",
			12410: "A4DA",
			12411: "A4DB",
			12412: "A4DC",
			12413: "A4DD",
			12414: "A4DE",
			12415: "A4DF",
			12416: "A4E0",
			12417: "A4E1",
			12418: "A4E2",
			12419: "A4E3",
			12420: "A4E4",
			12421: "A4E5",
			12422: "A4E6",
			12423: "A4E7",
			12424: "A4E8",
			12425: "A4E9",
			12426: "A4EA",
			12427: "A4EB",
			12428: "A4EC",
			12429: "A4ED",
			12430: "A4EE",
			12431: "A4EF",
			12432: "A4F0",
			12433: "A4F1",
			12434: "A4F2",
			12435: "A4F3",
			12449: "A5A1",
			12450: "A5A2",
			12451: "A5A3",
			12452: "A5A4",
			12453: "A5A5",
			12454: "A5A6",
			12455: "A5A7",
			12456: "A5A8",
			12457: "A5A9",
			12458: "A5AA",
			12459: "A5AB",
			12460: "A5AC",
			12461: "A5AD",
			12462: "A5AE",
			12463: "A5AF",
			12464: "A5B0",
			12465: "A5B1",
			12466: "A5B2",
			12467: "A5B3",
			12468: "A5B4",
			12469: "A5B5",
			12470: "A5B6",
			12471: "A5B7",
			12472: "A5B8",
			12473: "A5B9",
			12474: "A5BA",
			12475: "A5BB",
			12476: "A5BC",
			12477: "A5BD",
			12478: "A5BE",
			12479: "A5BF",
			12480: "A5C0",
			12481: "A5C1",
			12482: "A5C2",
			12483: "A5C3",
			12484: "A5C4",
			12485: "A5C5",
			12486: "A5C6",
			12487: "A5C7",
			12488: "A5C8",
			12489: "A5C9",
			12490: "A5CA",
			12491: "A5CB",
			12492: "A5CC",
			12493: "A5CD",
			12494: "A5CE",
			12495: "A5CF",
			12496: "A5D0",
			12497: "A5D1",
			12498: "A5D2",
			12499: "A5D3",
			12500: "A5D4",
			12501: "A5D5",
			12502: "A5D6",
			12503: "A5D7",
			12504: "A5D8",
			12505: "A5D9",
			12506: "A5DA",
			12507: "A5DB",
			12508: "A5DC",
			12509: "A5DD",
			12510: "A5DE",
			12511: "A5DF",
			12512: "A5E0",
			12513: "A5E1",
			12514: "A5E2",
			12515: "A5E3",
			12516: "A5E4",
			12517: "A5E5",
			12518: "A5E6",
			12519: "A5E7",
			12520: "A5E8",
			12521: "A5E9",
			12522: "A5EA",
			12523: "A5EB",
			12524: "A5EC",
			12525: "A5ED",
			12526: "A5EE",
			12527: "A5EF",
			12528: "A5F0",
			12529: "A5F1",
			12530: "A5F2",
			12531: "A5F3",
			12532: "A5F4",
			12533: "A5F5",
			12534: "A5F6",
			913: "A6A1",
			914: "A6A2",
			915: "A6A3",
			916: "A6A4",
			917: "A6A5",
			918: "A6A6",
			919: "A6A7",
			920: "A6A8",
			921: "A6A9",
			922: "A6AA",
			923: "A6AB",
			924: "A6AC",
			925: "A6AD",
			926: "A6AE",
			927: "A6AF",
			928: "A6B0",
			929: "A6B1",
			931: "A6B2",
			932: "A6B3",
			933: "A6B4",
			934: "A6B5",
			935: "A6B6",
			936: "A6B7",
			937: "A6B8",
			945: "A6C1",
			946: "A6C2",
			947: "A6C3",
			948: "A6C4",
			949: "A6C5",
			950: "A6C6",
			951: "A6C7",
			952: "A6C8",
			953: "A6C9",
			954: "A6CA",
			955: "A6CB",
			956: "A6CC",
			957: "A6CD",
			958: "A6CE",
			959: "A6CF",
			960: "A6D0",
			961: "A6D1",
			963: "A6D2",
			964: "A6D3",
			965: "A6D4",
			966: "A6D5",
			967: "A6D6",
			968: "A6D7",
			969: "A6D8",
			65077: "A6E0",
			65078: "A6E1",
			65081: "A6E2",
			65082: "A6E3",
			65087: "A6E4",
			65088: "A6E5",
			65085: "A6E6",
			65086: "A6E7",
			65089: "A6E8",
			65090: "A6E9",
			65091: "A6EA",
			65092: "A6EB",
			65083: "A6EE",
			65084: "A6EF",
			65079: "A6F0",
			65080: "A6F1",
			65073: "A6F2",
			65075: "A6F4",
			65076: "A6F5",
			1040: "A7A1",
			1041: "A7A2",
			1042: "A7A3",
			1043: "A7A4",
			1044: "A7A5",
			1045: "A7A6",
			1025: "A7A7",
			1046: "A7A8",
			1047: "A7A9",
			1048: "A7AA",
			1049: "A7AB",
			1050: "A7AC",
			1051: "A7AD",
			1052: "A7AE",
			1053: "A7AF",
			1054: "A7B0",
			1055: "A7B1",
			1056: "A7B2",
			1057: "A7B3",
			1058: "A7B4",
			1059: "A7B5",
			1060: "A7B6",
			1061: "A7B7",
			1062: "A7B8",
			1063: "A7B9",
			1064: "A7BA",
			1065: "A7BB",
			1066: "A7BC",
			1067: "A7BD",
			1068: "A7BE",
			1069: "A7BF",
			1070: "A7C0",
			1071: "A7C1",
			1072: "A7D1",
			1073: "A7D2",
			1074: "A7D3",
			1075: "A7D4",
			1076: "A7D5",
			1077: "A7D6",
			1105: "A7D7",
			1078: "A7D8",
			1079: "A7D9",
			1080: "A7DA",
			1081: "A7DB",
			1082: "A7DC",
			1083: "A7DD",
			1084: "A7DE",
			1085: "A7DF",
			1086: "A7E0",
			1087: "A7E1",
			1088: "A7E2",
			1089: "A7E3",
			1090: "A7E4",
			1091: "A7E5",
			1092: "A7E6",
			1093: "A7E7",
			1094: "A7E8",
			1095: "A7E9",
			1096: "A7EA",
			1097: "A7EB",
			1098: "A7EC",
			1099: "A7ED",
			1100: "A7EE",
			1101: "A7EF",
			1102: "A7F0",
			1103: "A7F1",
			257: "A8A1",
			225: "A8A2",
			462: "A8A3",
			224: "A8A4",
			275: "A8A5",
			233: "A8A6",
			283: "A8A7",
			232: "A8A8",
			299: "A8A9",
			237: "A8AA",
			464: "A8AB",
			236: "A8AC",
			333: "A8AD",
			243: "A8AE",
			466: "A8AF",
			242: "A8B0",
			363: "A8B1",
			250: "A8B2",
			468: "A8B3",
			249: "A8B4",
			470: "A8B5",
			472: "A8B6",
			474: "A8B7",
			476: "A8B8",
			252: "A8B9",
			234: "A8BA",
			593: "A8BB",
			324: "A8BD",
			328: "A8BE",
			609: "A8C0",
			12549: "A8C5",
			12550: "A8C6",
			12551: "A8C7",
			12552: "A8C8",
			12553: "A8C9",
			12554: "A8CA",
			12555: "A8CB",
			12556: "A8CC",
			12557: "A8CD",
			12558: "A8CE",
			12559: "A8CF",
			12560: "A8D0",
			12561: "A8D1",
			12562: "A8D2",
			12563: "A8D3",
			12564: "A8D4",
			12565: "A8D5",
			12566: "A8D6",
			12567: "A8D7",
			12568: "A8D8",
			12569: "A8D9",
			12570: "A8DA",
			12571: "A8DB",
			12572: "A8DC",
			12573: "A8DD",
			12574: "A8DE",
			12575: "A8DF",
			12576: "A8E0",
			12577: "A8E1",
			12578: "A8E2",
			12579: "A8E3",
			12580: "A8E4",
			12581: "A8E5",
			12582: "A8E6",
			12583: "A8E7",
			12584: "A8E8",
			12585: "A8E9",
			9472: "A9A4",
			9473: "A9A5",
			9474: "A9A6",
			9475: "A9A7",
			9476: "A9A8",
			9477: "A9A9",
			9478: "A9AA",
			9479: "A9AB",
			9480: "A9AC",
			9481: "A9AD",
			9482: "A9AE",
			9483: "A9AF",
			9484: "A9B0",
			9485: "A9B1",
			9486: "A9B2",
			9487: "A9B3",
			9488: "A9B4",
			9489: "A9B5",
			9490: "A9B6",
			9491: "A9B7",
			9492: "A9B8",
			9493: "A9B9",
			9494: "A9BA",
			9495: "A9BB",
			9496: "A9BC",
			9497: "A9BD",
			9498: "A9BE",
			9499: "A9BF",
			9500: "A9C0",
			9501: "A9C1",
			9502: "A9C2",
			9503: "A9C3",
			9504: "A9C4",
			9505: "A9C5",
			9506: "A9C6",
			9507: "A9C7",
			9508: "A9C8",
			9509: "A9C9",
			9510: "A9CA",
			9511: "A9CB",
			9512: "A9CC",
			9513: "A9CD",
			9514: "A9CE",
			9515: "A9CF",
			9516: "A9D0",
			9517: "A9D1",
			9518: "A9D2",
			9519: "A9D3",
			9520: "A9D4",
			9521: "A9D5",
			9522: "A9D6",
			9523: "A9D7",
			9524: "A9D8",
			9525: "A9D9",
			9526: "A9DA",
			9527: "A9DB",
			9528: "A9DC",
			9529: "A9DD",
			9530: "A9DE",
			9531: "A9DF",
			9532: "A9E0",
			9533: "A9E1",
			9534: "A9E2",
			9535: "A9E3",
			9536: "A9E4",
			9537: "A9E5",
			9538: "A9E6",
			9539: "A9E7",
			9540: "A9E8",
			9541: "A9E9",
			9542: "A9EA",
			9543: "A9EB",
			9544: "A9EC",
			9545: "A9ED",
			9546: "A9EE",
			9547: "A9EF",
			30403: "B0A0",
			21834: "B0A1",
			38463: "B0A2",
			22467: "B0A3",
			25384: "B0A4",
			21710: "B0A5",
			21769: "B0A6",
			21696: "B0A7",
			30353: "B0A8",
			30284: "B0A9",
			34108: "B0AA",
			30702: "B0AB",
			33406: "B0AC",
			30861: "B0AD",
			29233: "B0AE",
			38552: "B0AF",
			38797: "B0B0",
			27688: "B0B1",
			23433: "B0B2",
			20474: "B0B3",
			25353: "B0B4",
			26263: "B0B5",
			23736: "B0B6",
			33018: "B0B7",
			26696: "B0B8",
			32942: "B0B9",
			26114: "B0BA",
			30414: "B0BB",
			20985: "B0BC",
			25942: "B0BD",
			29100: "B0BE",
			32753: "B0BF",
			34948: "B0C0",
			20658: "B0C1",
			22885: "B0C2",
			25034: "B0C3",
			28595: "B0C4",
			33453: "B0C5",
			25420: "B0C6",
			25170: "B0C7",
			21485: "B0C8",
			21543: "B0C9",
			31494: "B0CA",
			20843: "B0CB",
			30116: "B0CC",
			24052: "B0CD",
			25300: "B0CE",
			36299: "B0CF",
			38774: "B0D0",
			25226: "B0D1",
			32793: "B0D2",
			22365: "B0D3",
			38712: "B0D4",
			32610: "B0D5",
			29240: "B0D6",
			30333: "B0D7",
			26575: "B0D8",
			30334: "B0D9",
			25670: "B0DA",
			20336: "B0DB",
			36133: "B0DC",
			25308: "B0DD",
			31255: "B0DE",
			26001: "B0DF",
			29677: "B0E0",
			25644: "B0E1",
			25203: "B0E2",
			33324: "B0E3",
			39041: "B0E4",
			26495: "B0E5",
			29256: "B0E6",
			25198: "B0E7",
			25292: "B0E8",
			20276: "B0E9",
			29923: "B0EA",
			21322: "B0EB",
			21150: "B0EC",
			32458: "B0ED",
			37030: "B0EE",
			24110: "B0EF",
			26758: "B0F0",
			27036: "B0F1",
			33152: "B0F2",
			32465: "B0F3",
			26834: "B0F4",
			30917: "B0F5",
			34444: "B0F6",
			38225: "B0F7",
			20621: "B0F8",
			35876: "B0F9",
			33502: "B0FA",
			32990: "B0FB",
			21253: "B0FC",
			35090: "B0FD",
			21093: "B0FE",
			34180: "B1A1",
			38649: "B1A2",
			20445: "B1A3",
			22561: "B1A4",
			39281: "B1A5",
			23453: "B1A6",
			25265: "B1A7",
			25253: "B1A8",
			26292: "B1A9",
			35961: "B1AA",
			40077: "B1AB",
			29190: "B1AC",
			26479: "B1AD",
			30865: "B1AE",
			24754: "B1AF",
			21329: "B1B0",
			21271: "B1B1",
			36744: "B1B2",
			32972: "B1B3",
			36125: "B1B4",
			38049: "B1B5",
			20493: "B1B6",
			29384: "B1B7",
			22791: "B1B8",
			24811: "B1B9",
			28953: "B1BA",
			34987: "B1BB",
			22868: "B1BC",
			33519: "B1BD",
			26412: "B1BE",
			31528: "B1BF",
			23849: "B1C0",
			32503: "B1C1",
			29997: "B1C2",
			27893: "B1C3",
			36454: "B1C4",
			36856: "B1C5",
			36924: "B1C6",
			40763: "B1C7",
			27604: "B1C8",
			37145: "B1C9",
			31508: "B1CA",
			24444: "B1CB",
			30887: "B1CC",
			34006: "B1CD",
			34109: "B1CE",
			27605: "B1CF",
			27609: "B1D0",
			27606: "B1D1",
			24065: "B1D2",
			24199: "B1D3",
			30201: "B1D4",
			38381: "B1D5",
			25949: "B1D6",
			24330: "B1D7",
			24517: "B1D8",
			36767: "B1D9",
			22721: "B1DA",
			33218: "B1DB",
			36991: "B1DC",
			38491: "B1DD",
			38829: "B1DE",
			36793: "B1DF",
			32534: "B1E0",
			36140: "B1E1",
			25153: "B1E2",
			20415: "B1E3",
			21464: "B1E4",
			21342: "B1E5",
			36776: "B1E6",
			36777: "B1E7",
			36779: "B1E8",
			36941: "B1E9",
			26631: "B1EA",
			24426: "B1EB",
			33176: "B1EC",
			34920: "B1ED",
			40150: "B1EE",
			24971: "B1EF",
			21035: "B1F0",
			30250: "B1F1",
			24428: "B1F2",
			25996: "B1F3",
			28626: "B1F4",
			28392: "B1F5",
			23486: "B1F6",
			25672: "B1F7",
			20853: "B1F8",
			20912: "B1F9",
			26564: "B1FA",
			19993: "B1FB",
			31177: "B1FC",
			39292: "B1FD",
			28851: "B1FE",
			30149: "B2A1",
			24182: "B2A2",
			29627: "B2A3",
			33760: "B2A4",
			25773: "B2A5",
			25320: "B2A6",
			38069: "B2A7",
			27874: "B2A8",
			21338: "B2A9",
			21187: "B2AA",
			25615: "B2AB",
			38082: "B2AC",
			31636: "B2AD",
			20271: "B2AE",
			24091: "B2AF",
			33334: "B2B0",
			33046: "B2B1",
			33162: "B2B2",
			28196: "B2B3",
			27850: "B2B4",
			39539: "B2B5",
			25429: "B2B6",
			21340: "B2B7",
			21754: "B2B8",
			34917: "B2B9",
			22496: "B2BA",
			19981: "B2BB",
			24067: "B2BC",
			27493: "B2BD",
			31807: "B2BE",
			37096: "B2BF",
			24598: "B2C0",
			25830: "B2C1",
			29468: "B2C2",
			35009: "B2C3",
			26448: "B2C4",
			25165: "B2C5",
			36130: "B2C6",
			30572: "B2C7",
			36393: "B2C8",
			37319: "B2C9",
			24425: "B2CA",
			33756: "B2CB",
			34081: "B2CC",
			39184: "B2CD",
			21442: "B2CE",
			34453: "B2CF",
			27531: "B2D0",
			24813: "B2D1",
			24808: "B2D2",
			28799: "B2D3",
			33485: "B2D4",
			33329: "B2D5",
			20179: "B2D6",
			27815: "B2D7",
			34255: "B2D8",
			25805: "B2D9",
			31961: "B2DA",
			27133: "B2DB",
			26361: "B2DC",
			33609: "B2DD",
			21397: "B2DE",
			31574: "B2DF",
			20391: "B2E0",
			20876: "B2E1",
			27979: "B2E2",
			23618: "B2E3",
			36461: "B2E4",
			25554: "B2E5",
			21449: "B2E6",
			33580: "B2E7",
			33590: "B2E8",
			26597: "B2E9",
			30900: "B2EA",
			25661: "B2EB",
			23519: "B2EC",
			23700: "B2ED",
			24046: "B2EE",
			35815: "B2EF",
			25286: "B2F0",
			26612: "B2F1",
			35962: "B2F2",
			25600: "B2F3",
			25530: "B2F4",
			34633: "B2F5",
			39307: "B2F6",
			35863: "B2F7",
			32544: "B2F8",
			38130: "B2F9",
			20135: "B2FA",
			38416: "B2FB",
			39076: "B2FC",
			26124: "B2FD",
			29462: "B2FE",
			22330: "B3A1",
			23581: "B3A2",
			24120: "B3A3",
			38271: "B3A4",
			20607: "B3A5",
			32928: "B3A6",
			21378: "B3A7",
			25950: "B3A8",
			30021: "B3A9",
			21809: "B3AA",
			20513: "B3AB",
			36229: "B3AC",
			25220: "B3AD",
			38046: "B3AE",
			26397: "B3AF",
			22066: "B3B0",
			28526: "B3B1",
			24034: "B3B2",
			21557: "B3B3",
			28818: "B3B4",
			36710: "B3B5",
			25199: "B3B6",
			25764: "B3B7",
			25507: "B3B8",
			24443: "B3B9",
			28552: "B3BA",
			37108: "B3BB",
			33251: "B3BC",
			36784: "B3BD",
			23576: "B3BE",
			26216: "B3BF",
			24561: "B3C0",
			27785: "B3C1",
			38472: "B3C2",
			36225: "B3C3",
			34924: "B3C4",
			25745: "B3C5",
			31216: "B3C6",
			22478: "B3C7",
			27225: "B3C8",
			25104: "B3C9",
			21576: "B3CA",
			20056: "B3CB",
			31243: "B3CC",
			24809: "B3CD",
			28548: "B3CE",
			35802: "B3CF",
			25215: "B3D0",
			36894: "B3D1",
			39563: "B3D2",
			31204: "B3D3",
			21507: "B3D4",
			30196: "B3D5",
			25345: "B3D6",
			21273: "B3D7",
			27744: "B3D8",
			36831: "B3D9",
			24347: "B3DA",
			39536: "B3DB",
			32827: "B3DC",
			40831: "B3DD",
			20360: "B3DE",
			23610: "B3DF",
			36196: "B3E0",
			32709: "B3E1",
			26021: "B3E2",
			28861: "B3E3",
			20805: "B3E4",
			20914: "B3E5",
			34411: "B3E6",
			23815: "B3E7",
			23456: "B3E8",
			25277: "B3E9",
			37228: "B3EA",
			30068: "B3EB",
			36364: "B3EC",
			31264: "B3ED",
			24833: "B3EE",
			31609: "B3EF",
			20167: "B3F0",
			32504: "B3F1",
			30597: "B3F2",
			19985: "B3F3",
			33261: "B3F4",
			21021: "B3F5",
			20986: "B3F6",
			27249: "B3F7",
			21416: "B3F8",
			36487: "B3F9",
			38148: "B3FA",
			38607: "B3FB",
			28353: "B3FC",
			38500: "B3FD",
			26970: "B3FE",
			30784: "B4A1",
			20648: "B4A2",
			30679: "B4A3",
			25616: "B4A4",
			35302: "B4A5",
			22788: "B4A6",
			25571: "B4A7",
			24029: "B4A8",
			31359: "B4A9",
			26941: "B4AA",
			20256: "B4AB",
			33337: "B4AC",
			21912: "B4AD",
			20018: "B4AE",
			30126: "B4AF",
			31383: "B4B0",
			24162: "B4B1",
			24202: "B4B2",
			38383: "B4B3",
			21019: "B4B4",
			21561: "B4B5",
			28810: "B4B6",
			25462: "B4B7",
			38180: "B4B8",
			22402: "B4B9",
			26149: "B4BA",
			26943: "B4BB",
			37255: "B4BC",
			21767: "B4BD",
			28147: "B4BE",
			32431: "B4BF",
			34850: "B4C0",
			25139: "B4C1",
			32496: "B4C2",
			30133: "B4C3",
			33576: "B4C4",
			30913: "B4C5",
			38604: "B4C6",
			36766: "B4C7",
			24904: "B4C8",
			29943: "B4C9",
			35789: "B4CA",
			27492: "B4CB",
			21050: "B4CC",
			36176: "B4CD",
			27425: "B4CE",
			32874: "B4CF",
			33905: "B4D0",
			22257: "B4D1",
			21254: "B4D2",
			20174: "B4D3",
			19995: "B4D4",
			20945: "B4D5",
			31895: "B4D6",
			37259: "B4D7",
			31751: "B4D8",
			20419: "B4D9",
			36479: "B4DA",
			31713: "B4DB",
			31388: "B4DC",
			25703: "B4DD",
			23828: "B4DE",
			20652: "B4DF",
			33030: "B4E0",
			30209: "B4E1",
			31929: "B4E2",
			28140: "B4E3",
			32736: "B4E4",
			26449: "B4E5",
			23384: "B4E6",
			23544: "B4E7",
			30923: "B4E8",
			25774: "B4E9",
			25619: "B4EA",
			25514: "B4EB",
			25387: "B4EC",
			38169: "B4ED",
			25645: "B4EE",
			36798: "B4EF",
			31572: "B4F0",
			30249: "B4F1",
			25171: "B4F2",
			22823: "B4F3",
			21574: "B4F4",
			27513: "B4F5",
			20643: "B4F6",
			25140: "B4F7",
			24102: "B4F8",
			27526: "B4F9",
			20195: "B4FA",
			36151: "B4FB",
			34955: "B4FC",
			24453: "B4FD",
			36910: "B4FE",
			24608: "B5A1",
			32829: "B5A2",
			25285: "B5A3",
			20025: "B5A4",
			21333: "B5A5",
			37112: "B5A6",
			25528: "B5A7",
			32966: "B5A8",
			26086: "B5A9",
			27694: "B5AA",
			20294: "B5AB",
			24814: "B5AC",
			28129: "B5AD",
			35806: "B5AE",
			24377: "B5AF",
			34507: "B5B0",
			24403: "B5B1",
			25377: "B5B2",
			20826: "B5B3",
			33633: "B5B4",
			26723: "B5B5",
			20992: "B5B6",
			25443: "B5B7",
			36424: "B5B8",
			20498: "B5B9",
			23707: "B5BA",
			31095: "B5BB",
			23548: "B5BC",
			21040: "B5BD",
			31291: "B5BE",
			24764: "B5BF",
			36947: "B5C0",
			30423: "B5C1",
			24503: "B5C2",
			24471: "B5C3",
			30340: "B5C4",
			36460: "B5C5",
			28783: "B5C6",
			30331: "B5C7",
			31561: "B5C8",
			30634: "B5C9",
			20979: "B5CA",
			37011: "B5CB",
			22564: "B5CC",
			20302: "B5CD",
			28404: "B5CE",
			36842: "B5CF",
			25932: "B5D0",
			31515: "B5D1",
			29380: "B5D2",
			28068: "B5D3",
			32735: "B5D4",
			23265: "B5D5",
			25269: "B5D6",
			24213: "B5D7",
			22320: "B5D8",
			33922: "B5D9",
			31532: "B5DA",
			24093: "B5DB",
			24351: "B5DC",
			36882: "B5DD",
			32532: "B5DE",
			39072: "B5DF",
			25474: "B5E0",
			28359: "B5E1",
			30872: "B5E2",
			28857: "B5E3",
			20856: "B5E4",
			38747: "B5E5",
			22443: "B5E6",
			30005: "B5E7",
			20291: "B5E8",
			30008: "B5E9",
			24215: "B5EA",
			24806: "B5EB",
			22880: "B5EC",
			28096: "B5ED",
			27583: "B5EE",
			30857: "B5EF",
			21500: "B5F0",
			38613: "B5F1",
			20939: "B5F2",
			20993: "B5F3",
			25481: "B5F4",
			21514: "B5F5",
			38035: "B5F6",
			35843: "B5F7",
			36300: "B5F8",
			29241: "B5F9",
			30879: "B5FA",
			34678: "B5FB",
			36845: "B5FC",
			35853: "B5FD",
			21472: "B5FE",
			19969: "B6A1",
			30447: "B6A2",
			21486: "B6A3",
			38025: "B6A4",
			39030: "B6A5",
			40718: "B6A6",
			38189: "B6A7",
			23450: "B6A8",
			35746: "B6A9",
			20002: "B6AA",
			19996: "B6AB",
			20908: "B6AC",
			33891: "B6AD",
			25026: "B6AE",
			21160: "B6AF",
			26635: "B6B0",
			20375: "B6B1",
			24683: "B6B2",
			20923: "B6B3",
			27934: "B6B4",
			20828: "B6B5",
			25238: "B6B6",
			26007: "B6B7",
			38497: "B6B8",
			35910: "B6B9",
			36887: "B6BA",
			30168: "B6BB",
			37117: "B6BC",
			30563: "B6BD",
			27602: "B6BE",
			29322: "B6BF",
			29420: "B6C0",
			35835: "B6C1",
			22581: "B6C2",
			30585: "B6C3",
			36172: "B6C4",
			26460: "B6C5",
			38208: "B6C6",
			32922: "B6C7",
			24230: "B6C8",
			28193: "B6C9",
			22930: "B6CA",
			31471: "B6CB",
			30701: "B6CC",
			38203: "B6CD",
			27573: "B6CE",
			26029: "B6CF",
			32526: "B6D0",
			22534: "B6D1",
			20817: "B6D2",
			38431: "B6D3",
			23545: "B6D4",
			22697: "B6D5",
			21544: "B6D6",
			36466: "B6D7",
			25958: "B6D8",
			39039: "B6D9",
			22244: "B6DA",
			38045: "B6DB",
			30462: "B6DC",
			36929: "B6DD",
			25479: "B6DE",
			21702: "B6DF",
			22810: "B6E0",
			22842: "B6E1",
			22427: "B6E2",
			36530: "B6E3",
			26421: "B6E4",
			36346: "B6E5",
			33333: "B6E6",
			21057: "B6E7",
			24816: "B6E8",
			22549: "B6E9",
			34558: "B6EA",
			23784: "B6EB",
			40517: "B6EC",
			20420: "B6ED",
			39069: "B6EE",
			35769: "B6EF",
			23077: "B6F0",
			24694: "B6F1",
			21380: "B6F2",
			25212: "B6F3",
			36943: "B6F4",
			37122: "B6F5",
			39295: "B6F6",
			24681: "B6F7",
			32780: "B6F8",
			20799: "B6F9",
			32819: "B6FA",
			23572: "B6FB",
			39285: "B6FC",
			27953: "B6FD",
			20108: "B6FE",
			36144: "B7A1",
			21457: "B7A2",
			32602: "B7A3",
			31567: "B7A4",
			20240: "B7A5",
			20047: "B7A6",
			38400: "B7A7",
			27861: "B7A8",
			29648: "B7A9",
			34281: "B7AA",
			24070: "B7AB",
			30058: "B7AC",
			32763: "B7AD",
			27146: "B7AE",
			30718: "B7AF",
			38034: "B7B0",
			32321: "B7B1",
			20961: "B7B2",
			28902: "B7B3",
			21453: "B7B4",
			36820: "B7B5",
			33539: "B7B6",
			36137: "B7B7",
			29359: "B7B8",
			39277: "B7B9",
			27867: "B7BA",
			22346: "B7BB",
			33459: "B7BC",
			26041: "B7BD",
			32938: "B7BE",
			25151: "B7BF",
			38450: "B7C0",
			22952: "B7C1",
			20223: "B7C2",
			35775: "B7C3",
			32442: "B7C4",
			25918: "B7C5",
			33778: "B7C6",
			38750: "B7C7",
			21857: "B7C8",
			39134: "B7C9",
			32933: "B7CA",
			21290: "B7CB",
			35837: "B7CC",
			21536: "B7CD",
			32954: "B7CE",
			24223: "B7CF",
			27832: "B7D0",
			36153: "B7D1",
			33452: "B7D2",
			37210: "B7D3",
			21545: "B7D4",
			27675: "B7D5",
			20998: "B7D6",
			32439: "B7D7",
			22367: "B7D8",
			28954: "B7D9",
			27774: "B7DA",
			31881: "B7DB",
			22859: "B7DC",
			20221: "B7DD",
			24575: "B7DE",
			24868: "B7DF",
			31914: "B7E0",
			20016: "B7E1",
			23553: "B7E2",
			26539: "B7E3",
			34562: "B7E4",
			23792: "B7E5",
			38155: "B7E6",
			39118: "B7E7",
			30127: "B7E8",
			28925: "B7E9",
			36898: "B7EA",
			20911: "B7EB",
			32541: "B7EC",
			35773: "B7ED",
			22857: "B7EE",
			20964: "B7EF",
			20315: "B7F0",
			21542: "B7F1",
			22827: "B7F2",
			25975: "B7F3",
			32932: "B7F4",
			23413: "B7F5",
			25206: "B7F6",
			25282: "B7F7",
			36752: "B7F8",
			24133: "B7F9",
			27679: "B7FA",
			31526: "B7FB",
			20239: "B7FC",
			20440: "B7FD",
			26381: "B7FE",
			28014: "B8A1",
			28074: "B8A2",
			31119: "B8A3",
			34993: "B8A4",
			24343: "B8A5",
			29995: "B8A6",
			25242: "B8A7",
			36741: "B8A8",
			20463: "B8A9",
			37340: "B8AA",
			26023: "B8AB",
			33071: "B8AC",
			33105: "B8AD",
			24220: "B8AE",
			33104: "B8AF",
			36212: "B8B0",
			21103: "B8B1",
			35206: "B8B2",
			36171: "B8B3",
			22797: "B8B4",
			20613: "B8B5",
			20184: "B8B6",
			38428: "B8B7",
			29238: "B8B8",
			33145: "B8B9",
			36127: "B8BA",
			23500: "B8BB",
			35747: "B8BC",
			38468: "B8BD",
			22919: "B8BE",
			32538: "B8BF",
			21648: "B8C0",
			22134: "B8C1",
			22030: "B8C2",
			35813: "B8C3",
			25913: "B8C4",
			27010: "B8C5",
			38041: "B8C6",
			30422: "B8C7",
			28297: "B8C8",
			24178: "B8C9",
			29976: "B8CA",
			26438: "B8CB",
			26577: "B8CC",
			31487: "B8CD",
			32925: "B8CE",
			36214: "B8CF",
			24863: "B8D0",
			31174: "B8D1",
			25954: "B8D2",
			36195: "B8D3",
			20872: "B8D4",
			21018: "B8D5",
			38050: "B8D6",
			32568: "B8D7",
			32923: "B8D8",
			32434: "B8D9",
			23703: "B8DA",
			28207: "B8DB",
			26464: "B8DC",
			31705: "B8DD",
			30347: "B8DE",
			39640: "B8DF",
			33167: "B8E0",
			32660: "B8E1",
			31957: "B8E2",
			25630: "B8E3",
			38224: "B8E4",
			31295: "B8E5",
			21578: "B8E6",
			21733: "B8E7",
			27468: "B8E8",
			25601: "B8E9",
			25096: "B8EA",
			40509: "B8EB",
			33011: "B8EC",
			30105: "B8ED",
			21106: "B8EE",
			38761: "B8EF",
			33883: "B8F0",
			26684: "B8F1",
			34532: "B8F2",
			38401: "B8F3",
			38548: "B8F4",
			38124: "B8F5",
			20010: "B8F6",
			21508: "B8F7",
			32473: "B8F8",
			26681: "B8F9",
			36319: "B8FA",
			32789: "B8FB",
			26356: "B8FC",
			24218: "B8FD",
			32697: "B8FE",
			22466: "B9A1",
			32831: "B9A2",
			26775: "B9A3",
			24037: "B9A4",
			25915: "B9A5",
			21151: "B9A6",
			24685: "B9A7",
			40858: "B9A8",
			20379: "B9A9",
			36524: "B9AA",
			20844: "B9AB",
			23467: "B9AC",
			24339: "B9AD",
			24041: "B9AE",
			27742: "B9AF",
			25329: "B9B0",
			36129: "B9B1",
			20849: "B9B2",
			38057: "B9B3",
			21246: "B9B4",
			27807: "B9B5",
			33503: "B9B6",
			29399: "B9B7",
			22434: "B9B8",
			26500: "B9B9",
			36141: "B9BA",
			22815: "B9BB",
			36764: "B9BC",
			33735: "B9BD",
			21653: "B9BE",
			31629: "B9BF",
			20272: "B9C0",
			27837: "B9C1",
			23396: "B9C2",
			22993: "B9C3",
			40723: "B9C4",
			21476: "B9C5",
			34506: "B9C6",
			39592: "B9C7",
			35895: "B9C8",
			32929: "B9C9",
			25925: "B9CA",
			39038: "B9CB",
			22266: "B9CC",
			38599: "B9CD",
			21038: "B9CE",
			29916: "B9CF",
			21072: "B9D0",
			23521: "B9D1",
			25346: "B9D2",
			35074: "B9D3",
			20054: "B9D4",
			25296: "B9D5",
			24618: "B9D6",
			26874: "B9D7",
			20851: "B9D8",
			23448: "B9D9",
			20896: "B9DA",
			35266: "B9DB",
			31649: "B9DC",
			39302: "B9DD",
			32592: "B9DE",
			24815: "B9DF",
			28748: "B9E0",
			36143: "B9E1",
			20809: "B9E2",
			24191: "B9E3",
			36891: "B9E4",
			29808: "B9E5",
			35268: "B9E6",
			22317: "B9E7",
			30789: "B9E8",
			24402: "B9E9",
			40863: "B9EA",
			38394: "B9EB",
			36712: "B9EC",
			39740: "B9ED",
			35809: "B9EE",
			30328: "B9EF",
			26690: "B9F0",
			26588: "B9F1",
			36330: "B9F2",
			36149: "B9F3",
			21053: "B9F4",
			36746: "B9F5",
			28378: "B9F6",
			26829: "B9F7",
			38149: "B9F8",
			37101: "B9F9",
			22269: "B9FA",
			26524: "B9FB",
			35065: "B9FC",
			36807: "B9FD",
			21704: "B9FE",
			39608: "BAA1",
			23401: "BAA2",
			28023: "BAA3",
			27686: "BAA4",
			20133: "BAA5",
			23475: "BAA6",
			39559: "BAA7",
			37219: "BAA8",
			25e3: "BAA9",
			37039: "BAAA",
			38889: "BAAB",
			21547: "BAAC",
			28085: "BAAD",
			23506: "BAAE",
			20989: "BAAF",
			21898: "BAB0",
			32597: "BAB1",
			32752: "BAB2",
			25788: "BAB3",
			25421: "BAB4",
			26097: "BAB5",
			25022: "BAB6",
			24717: "BAB7",
			28938: "BAB8",
			27735: "BAB9",
			27721: "BABA",
			22831: "BABB",
			26477: "BABC",
			33322: "BABD",
			22741: "BABE",
			22158: "BABF",
			35946: "BAC0",
			27627: "BAC1",
			37085: "BAC2",
			22909: "BAC3",
			32791: "BAC4",
			21495: "BAC5",
			28009: "BAC6",
			21621: "BAC7",
			21917: "BAC8",
			33655: "BAC9",
			33743: "BACA",
			26680: "BACB",
			31166: "BACC",
			21644: "BACD",
			20309: "BACE",
			21512: "BACF",
			30418: "BAD0",
			35977: "BAD1",
			38402: "BAD2",
			27827: "BAD3",
			28088: "BAD4",
			36203: "BAD5",
			35088: "BAD6",
			40548: "BAD7",
			36154: "BAD8",
			22079: "BAD9",
			40657: "BADA",
			30165: "BADB",
			24456: "BADC",
			29408: "BADD",
			24680: "BADE",
			21756: "BADF",
			20136: "BAE0",
			27178: "BAE1",
			34913: "BAE2",
			24658: "BAE3",
			36720: "BAE4",
			21700: "BAE5",
			28888: "BAE6",
			34425: "BAE7",
			40511: "BAE8",
			27946: "BAE9",
			23439: "BAEA",
			24344: "BAEB",
			32418: "BAEC",
			21897: "BAED",
			20399: "BAEE",
			29492: "BAEF",
			21564: "BAF0",
			21402: "BAF1",
			20505: "BAF2",
			21518: "BAF3",
			21628: "BAF4",
			20046: "BAF5",
			24573: "BAF6",
			29786: "BAF7",
			22774: "BAF8",
			33899: "BAF9",
			32993: "BAFA",
			34676: "BAFB",
			29392: "BAFC",
			31946: "BAFD",
			28246: "BAFE",
			24359: "BBA1",
			34382: "BBA2",
			21804: "BBA3",
			25252: "BBA4",
			20114: "BBA5",
			27818: "BBA6",
			25143: "BBA7",
			33457: "BBA8",
			21719: "BBA9",
			21326: "BBAA",
			29502: "BBAB",
			28369: "BBAC",
			30011: "BBAD",
			21010: "BBAE",
			21270: "BBAF",
			35805: "BBB0",
			27088: "BBB1",
			24458: "BBB2",
			24576: "BBB3",
			28142: "BBB4",
			22351: "BBB5",
			27426: "BBB6",
			29615: "BBB7",
			26707: "BBB8",
			36824: "BBB9",
			32531: "BBBA",
			25442: "BBBB",
			24739: "BBBC",
			21796: "BBBD",
			30186: "BBBE",
			35938: "BBBF",
			28949: "BBC0",
			28067: "BBC1",
			23462: "BBC2",
			24187: "BBC3",
			33618: "BBC4",
			24908: "BBC5",
			40644: "BBC6",
			30970: "BBC7",
			34647: "BBC8",
			31783: "BBC9",
			30343: "BBCA",
			20976: "BBCB",
			24822: "BBCC",
			29004: "BBCD",
			26179: "BBCE",
			24140: "BBCF",
			24653: "BBD0",
			35854: "BBD1",
			28784: "BBD2",
			25381: "BBD3",
			36745: "BBD4",
			24509: "BBD5",
			24674: "BBD6",
			34516: "BBD7",
			22238: "BBD8",
			27585: "BBD9",
			24724: "BBDA",
			24935: "BBDB",
			21321: "BBDC",
			24800: "BBDD",
			26214: "BBDE",
			36159: "BBDF",
			31229: "BBE0",
			20250: "BBE1",
			28905: "BBE2",
			27719: "BBE3",
			35763: "BBE4",
			35826: "BBE5",
			32472: "BBE6",
			33636: "BBE7",
			26127: "BBE8",
			23130: "BBE9",
			39746: "BBEA",
			27985: "BBEB",
			28151: "BBEC",
			35905: "BBED",
			27963: "BBEE",
			20249: "BBEF",
			28779: "BBF0",
			33719: "BBF1",
			25110: "BBF2",
			24785: "BBF3",
			38669: "BBF4",
			36135: "BBF5",
			31096: "BBF6",
			20987: "BBF7",
			22334: "BBF8",
			22522: "BBF9",
			26426: "BBFA",
			30072: "BBFB",
			31293: "BBFC",
			31215: "BBFD",
			31637: "BBFE",
			32908: "BCA1",
			39269: "BCA2",
			36857: "BCA3",
			28608: "BCA4",
			35749: "BCA5",
			40481: "BCA6",
			23020: "BCA7",
			32489: "BCA8",
			32521: "BCA9",
			21513: "BCAA",
			26497: "BCAB",
			26840: "BCAC",
			36753: "BCAD",
			31821: "BCAE",
			38598: "BCAF",
			21450: "BCB0",
			24613: "BCB1",
			30142: "BCB2",
			27762: "BCB3",
			21363: "BCB4",
			23241: "BCB5",
			32423: "BCB6",
			25380: "BCB7",
			20960: "BCB8",
			33034: "BCB9",
			24049: "BCBA",
			34015: "BCBB",
			25216: "BCBC",
			20864: "BCBD",
			23395: "BCBE",
			20238: "BCBF",
			31085: "BCC0",
			21058: "BCC1",
			24760: "BCC2",
			27982: "BCC3",
			23492: "BCC4",
			23490: "BCC5",
			35745: "BCC6",
			35760: "BCC7",
			26082: "BCC8",
			24524: "BCC9",
			38469: "BCCA",
			22931: "BCCB",
			32487: "BCCC",
			32426: "BCCD",
			22025: "BCCE",
			26551: "BCCF",
			22841: "BCD0",
			20339: "BCD1",
			23478: "BCD2",
			21152: "BCD3",
			33626: "BCD4",
			39050: "BCD5",
			36158: "BCD6",
			30002: "BCD7",
			38078: "BCD8",
			20551: "BCD9",
			31292: "BCDA",
			20215: "BCDB",
			26550: "BCDC",
			39550: "BCDD",
			23233: "BCDE",
			27516: "BCDF",
			30417: "BCE0",
			22362: "BCE1",
			23574: "BCE2",
			31546: "BCE3",
			38388: "BCE4",
			29006: "BCE5",
			20860: "BCE6",
			32937: "BCE7",
			33392: "BCE8",
			22904: "BCE9",
			32516: "BCEA",
			33575: "BCEB",
			26816: "BCEC",
			26604: "BCED",
			30897: "BCEE",
			30839: "BCEF",
			25315: "BCF0",
			25441: "BCF1",
			31616: "BCF2",
			20461: "BCF3",
			21098: "BCF4",
			20943: "BCF5",
			33616: "BCF6",
			27099: "BCF7",
			37492: "BCF8",
			36341: "BCF9",
			36145: "BCFA",
			35265: "BCFB",
			38190: "BCFC",
			31661: "BCFD",
			20214: "BCFE",
			20581: "BDA1",
			33328: "BDA2",
			21073: "BDA3",
			39279: "BDA4",
			28176: "BDA5",
			28293: "BDA6",
			28071: "BDA7",
			24314: "BDA8",
			20725: "BDA9",
			23004: "BDAA",
			23558: "BDAB",
			27974: "BDAC",
			27743: "BDAD",
			30086: "BDAE",
			33931: "BDAF",
			26728: "BDB0",
			22870: "BDB1",
			35762: "BDB2",
			21280: "BDB3",
			37233: "BDB4",
			38477: "BDB5",
			34121: "BDB6",
			26898: "BDB7",
			30977: "BDB8",
			28966: "BDB9",
			33014: "BDBA",
			20132: "BDBB",
			37066: "BDBC",
			27975: "BDBD",
			39556: "BDBE",
			23047: "BDBF",
			22204: "BDC0",
			25605: "BDC1",
			38128: "BDC2",
			30699: "BDC3",
			20389: "BDC4",
			33050: "BDC5",
			29409: "BDC6",
			35282: "BDC7",
			39290: "BDC8",
			32564: "BDC9",
			32478: "BDCA",
			21119: "BDCB",
			25945: "BDCC",
			37237: "BDCD",
			36735: "BDCE",
			36739: "BDCF",
			21483: "BDD0",
			31382: "BDD1",
			25581: "BDD2",
			25509: "BDD3",
			30342: "BDD4",
			31224: "BDD5",
			34903: "BDD6",
			38454: "BDD7",
			25130: "BDD8",
			21163: "BDD9",
			33410: "BDDA",
			26708: "BDDB",
			26480: "BDDC",
			25463: "BDDD",
			30571: "BDDE",
			31469: "BDDF",
			27905: "BDE0",
			32467: "BDE1",
			35299: "BDE2",
			22992: "BDE3",
			25106: "BDE4",
			34249: "BDE5",
			33445: "BDE6",
			30028: "BDE7",
			20511: "BDE8",
			20171: "BDE9",
			30117: "BDEA",
			35819: "BDEB",
			23626: "BDEC",
			24062: "BDED",
			31563: "BDEE",
			26020: "BDEF",
			37329: "BDF0",
			20170: "BDF1",
			27941: "BDF2",
			35167: "BDF3",
			32039: "BDF4",
			38182: "BDF5",
			20165: "BDF6",
			35880: "BDF7",
			36827: "BDF8",
			38771: "BDF9",
			26187: "BDFA",
			31105: "BDFB",
			36817: "BDFC",
			28908: "BDFD",
			28024: "BDFE",
			23613: "BEA1",
			21170: "BEA2",
			33606: "BEA3",
			20834: "BEA4",
			33550: "BEA5",
			30555: "BEA6",
			26230: "BEA7",
			40120: "BEA8",
			20140: "BEA9",
			24778: "BEAA",
			31934: "BEAB",
			31923: "BEAC",
			32463: "BEAD",
			20117: "BEAE",
			35686: "BEAF",
			26223: "BEB0",
			39048: "BEB1",
			38745: "BEB2",
			22659: "BEB3",
			25964: "BEB4",
			38236: "BEB5",
			24452: "BEB6",
			30153: "BEB7",
			38742: "BEB8",
			31455: "BEB9",
			31454: "BEBA",
			20928: "BEBB",
			28847: "BEBC",
			31384: "BEBD",
			25578: "BEBE",
			31350: "BEBF",
			32416: "BEC0",
			29590: "BEC1",
			38893: "BEC2",
			20037: "BEC3",
			28792: "BEC4",
			20061: "BEC5",
			37202: "BEC6",
			21417: "BEC7",
			25937: "BEC8",
			26087: "BEC9",
			33276: "BECA",
			33285: "BECB",
			21646: "BECC",
			23601: "BECD",
			30106: "BECE",
			38816: "BECF",
			25304: "BED0",
			29401: "BED1",
			30141: "BED2",
			23621: "BED3",
			39545: "BED4",
			33738: "BED5",
			23616: "BED6",
			21632: "BED7",
			30697: "BED8",
			20030: "BED9",
			27822: "BEDA",
			32858: "BEDB",
			25298: "BEDC",
			25454: "BEDD",
			24040: "BEDE",
			20855: "BEDF",
			36317: "BEE0",
			36382: "BEE1",
			38191: "BEE2",
			20465: "BEE3",
			21477: "BEE4",
			24807: "BEE5",
			28844: "BEE6",
			21095: "BEE7",
			25424: "BEE8",
			40515: "BEE9",
			23071: "BEEA",
			20518: "BEEB",
			30519: "BEEC",
			21367: "BEED",
			32482: "BEEE",
			25733: "BEEF",
			25899: "BEF0",
			25225: "BEF1",
			25496: "BEF2",
			20500: "BEF3",
			29237: "BEF4",
			35273: "BEF5",
			20915: "BEF6",
			35776: "BEF7",
			32477: "BEF8",
			22343: "BEF9",
			33740: "BEFA",
			38055: "BEFB",
			20891: "BEFC",
			21531: "BEFD",
			23803: "BEFE",
			20426: "BFA1",
			31459: "BFA2",
			27994: "BFA3",
			37089: "BFA4",
			39567: "BFA5",
			21888: "BFA6",
			21654: "BFA7",
			21345: "BFA8",
			21679: "BFA9",
			24320: "BFAA",
			25577: "BFAB",
			26999: "BFAC",
			20975: "BFAD",
			24936: "BFAE",
			21002: "BFAF",
			22570: "BFB0",
			21208: "BFB1",
			22350: "BFB2",
			30733: "BFB3",
			30475: "BFB4",
			24247: "BFB5",
			24951: "BFB6",
			31968: "BFB7",
			25179: "BFB8",
			25239: "BFB9",
			20130: "BFBA",
			28821: "BFBB",
			32771: "BFBC",
			25335: "BFBD",
			28900: "BFBE",
			38752: "BFBF",
			22391: "BFC0",
			33499: "BFC1",
			26607: "BFC2",
			26869: "BFC3",
			30933: "BFC4",
			39063: "BFC5",
			31185: "BFC6",
			22771: "BFC7",
			21683: "BFC8",
			21487: "BFC9",
			28212: "BFCA",
			20811: "BFCB",
			21051: "BFCC",
			23458: "BFCD",
			35838: "BFCE",
			32943: "BFCF",
			21827: "BFD0",
			22438: "BFD1",
			24691: "BFD2",
			22353: "BFD3",
			21549: "BFD4",
			31354: "BFD5",
			24656: "BFD6",
			23380: "BFD7",
			25511: "BFD8",
			25248: "BFD9",
			21475: "BFDA",
			25187: "BFDB",
			23495: "BFDC",
			26543: "BFDD",
			21741: "BFDE",
			31391: "BFDF",
			33510: "BFE0",
			37239: "BFE1",
			24211: "BFE2",
			35044: "BFE3",
			22840: "BFE4",
			22446: "BFE5",
			25358: "BFE6",
			36328: "BFE7",
			33007: "BFE8",
			22359: "BFE9",
			31607: "BFEA",
			20393: "BFEB",
			24555: "BFEC",
			23485: "BFED",
			27454: "BFEE",
			21281: "BFEF",
			31568: "BFF0",
			29378: "BFF1",
			26694: "BFF2",
			30719: "BFF3",
			30518: "BFF4",
			26103: "BFF5",
			20917: "BFF6",
			20111: "BFF7",
			30420: "BFF8",
			23743: "BFF9",
			31397: "BFFA",
			33909: "BFFB",
			22862: "BFFC",
			39745: "BFFD",
			20608: "BFFE",
			39304: "C0A1",
			24871: "C0A2",
			28291: "C0A3",
			22372: "C0A4",
			26118: "C0A5",
			25414: "C0A6",
			22256: "C0A7",
			25324: "C0A8",
			25193: "C0A9",
			24275: "C0AA",
			38420: "C0AB",
			22403: "C0AC",
			25289: "C0AD",
			21895: "C0AE",
			34593: "C0AF",
			33098: "C0B0",
			36771: "C0B1",
			21862: "C0B2",
			33713: "C0B3",
			26469: "C0B4",
			36182: "C0B5",
			34013: "C0B6",
			23146: "C0B7",
			26639: "C0B8",
			25318: "C0B9",
			31726: "C0BA",
			38417: "C0BB",
			20848: "C0BC",
			28572: "C0BD",
			35888: "C0BE",
			25597: "C0BF",
			35272: "C0C0",
			25042: "C0C1",
			32518: "C0C2",
			28866: "C0C3",
			28389: "C0C4",
			29701: "C0C5",
			27028: "C0C6",
			29436: "C0C7",
			24266: "C0C8",
			37070: "C0C9",
			26391: "C0CA",
			28010: "C0CB",
			25438: "C0CC",
			21171: "C0CD",
			29282: "C0CE",
			32769: "C0CF",
			20332: "C0D0",
			23013: "C0D1",
			37226: "C0D2",
			28889: "C0D3",
			28061: "C0D4",
			21202: "C0D5",
			20048: "C0D6",
			38647: "C0D7",
			38253: "C0D8",
			34174: "C0D9",
			30922: "C0DA",
			32047: "C0DB",
			20769: "C0DC",
			22418: "C0DD",
			25794: "C0DE",
			32907: "C0DF",
			31867: "C0E0",
			27882: "C0E1",
			26865: "C0E2",
			26974: "C0E3",
			20919: "C0E4",
			21400: "C0E5",
			26792: "C0E6",
			29313: "C0E7",
			40654: "C0E8",
			31729: "C0E9",
			29432: "C0EA",
			31163: "C0EB",
			28435: "C0EC",
			29702: "C0ED",
			26446: "C0EE",
			37324: "C0EF",
			40100: "C0F0",
			31036: "C0F1",
			33673: "C0F2",
			33620: "C0F3",
			21519: "C0F4",
			26647: "C0F5",
			20029: "C0F6",
			21385: "C0F7",
			21169: "C0F8",
			30782: "C0F9",
			21382: "C0FA",
			21033: "C0FB",
			20616: "C0FC",
			20363: "C0FD",
			20432: "C0FE",
			30178: "C1A1",
			31435: "C1A2",
			31890: "C1A3",
			27813: "C1A4",
			38582: "C1A5",
			21147: "C1A6",
			29827: "C1A7",
			21737: "C1A8",
			20457: "C1A9",
			32852: "C1AA",
			33714: "C1AB",
			36830: "C1AC",
			38256: "C1AD",
			24265: "C1AE",
			24604: "C1AF",
			28063: "C1B0",
			24088: "C1B1",
			25947: "C1B2",
			33080: "C1B3",
			38142: "C1B4",
			24651: "C1B5",
			28860: "C1B6",
			32451: "C1B7",
			31918: "C1B8",
			20937: "C1B9",
			26753: "C1BA",
			31921: "C1BB",
			33391: "C1BC",
			20004: "C1BD",
			36742: "C1BE",
			37327: "C1BF",
			26238: "C1C0",
			20142: "C1C1",
			35845: "C1C2",
			25769: "C1C3",
			32842: "C1C4",
			20698: "C1C5",
			30103: "C1C6",
			29134: "C1C7",
			23525: "C1C8",
			36797: "C1C9",
			28518: "C1CA",
			20102: "C1CB",
			25730: "C1CC",
			38243: "C1CD",
			24278: "C1CE",
			26009: "C1CF",
			21015: "C1D0",
			35010: "C1D1",
			28872: "C1D2",
			21155: "C1D3",
			29454: "C1D4",
			29747: "C1D5",
			26519: "C1D6",
			30967: "C1D7",
			38678: "C1D8",
			20020: "C1D9",
			37051: "C1DA",
			40158: "C1DB",
			28107: "C1DC",
			20955: "C1DD",
			36161: "C1DE",
			21533: "C1DF",
			25294: "C1E0",
			29618: "C1E1",
			33777: "C1E2",
			38646: "C1E3",
			40836: "C1E4",
			38083: "C1E5",
			20278: "C1E6",
			32666: "C1E7",
			20940: "C1E8",
			28789: "C1E9",
			38517: "C1EA",
			23725: "C1EB",
			39046: "C1EC",
			21478: "C1ED",
			20196: "C1EE",
			28316: "C1EF",
			29705: "C1F0",
			27060: "C1F1",
			30827: "C1F2",
			39311: "C1F3",
			30041: "C1F4",
			21016: "C1F5",
			30244: "C1F6",
			27969: "C1F7",
			26611: "C1F8",
			20845: "C1F9",
			40857: "C1FA",
			32843: "C1FB",
			21657: "C1FC",
			31548: "C1FD",
			31423: "C1FE",
			38534: "C2A1",
			22404: "C2A2",
			25314: "C2A3",
			38471: "C2A4",
			27004: "C2A5",
			23044: "C2A6",
			25602: "C2A7",
			31699: "C2A8",
			28431: "C2A9",
			38475: "C2AA",
			33446: "C2AB",
			21346: "C2AC",
			39045: "C2AD",
			24208: "C2AE",
			28809: "C2AF",
			25523: "C2B0",
			21348: "C2B1",
			34383: "C2B2",
			40065: "C2B3",
			40595: "C2B4",
			30860: "C2B5",
			38706: "C2B6",
			36335: "C2B7",
			36162: "C2B8",
			40575: "C2B9",
			28510: "C2BA",
			31108: "C2BB",
			24405: "C2BC",
			38470: "C2BD",
			25134: "C2BE",
			39540: "C2BF",
			21525: "C2C0",
			38109: "C2C1",
			20387: "C2C2",
			26053: "C2C3",
			23653: "C2C4",
			23649: "C2C5",
			32533: "C2C6",
			34385: "C2C7",
			27695: "C2C8",
			24459: "C2C9",
			29575: "C2CA",
			28388: "C2CB",
			32511: "C2CC",
			23782: "C2CD",
			25371: "C2CE",
			23402: "C2CF",
			28390: "C2D0",
			21365: "C2D1",
			20081: "C2D2",
			25504: "C2D3",
			30053: "C2D4",
			25249: "C2D5",
			36718: "C2D6",
			20262: "C2D7",
			20177: "C2D8",
			27814: "C2D9",
			32438: "C2DA",
			35770: "C2DB",
			33821: "C2DC",
			34746: "C2DD",
			32599: "C2DE",
			36923: "C2DF",
			38179: "C2E0",
			31657: "C2E1",
			39585: "C2E2",
			35064: "C2E3",
			33853: "C2E4",
			27931: "C2E5",
			39558: "C2E6",
			32476: "C2E7",
			22920: "C2E8",
			40635: "C2E9",
			29595: "C2EA",
			30721: "C2EB",
			34434: "C2EC",
			39532: "C2ED",
			39554: "C2EE",
			22043: "C2EF",
			21527: "C2F0",
			22475: "C2F1",
			20080: "C2F2",
			40614: "C2F3",
			21334: "C2F4",
			36808: "C2F5",
			33033: "C2F6",
			30610: "C2F7",
			39314: "C2F8",
			34542: "C2F9",
			28385: "C2FA",
			34067: "C2FB",
			26364: "C2FC",
			24930: "C2FD",
			28459: "C2FE",
			35881: "C3A1",
			33426: "C3A2",
			33579: "C3A3",
			30450: "C3A4",
			27667: "C3A5",
			24537: "C3A6",
			33725: "C3A7",
			29483: "C3A8",
			33541: "C3A9",
			38170: "C3AA",
			27611: "C3AB",
			30683: "C3AC",
			38086: "C3AD",
			21359: "C3AE",
			33538: "C3AF",
			20882: "C3B0",
			24125: "C3B1",
			35980: "C3B2",
			36152: "C3B3",
			20040: "C3B4",
			29611: "C3B5",
			26522: "C3B6",
			26757: "C3B7",
			37238: "C3B8",
			38665: "C3B9",
			29028: "C3BA",
			27809: "C3BB",
			30473: "C3BC",
			23186: "C3BD",
			38209: "C3BE",
			27599: "C3BF",
			32654: "C3C0",
			26151: "C3C1",
			23504: "C3C2",
			22969: "C3C3",
			23194: "C3C4",
			38376: "C3C5",
			38391: "C3C6",
			20204: "C3C7",
			33804: "C3C8",
			33945: "C3C9",
			27308: "C3CA",
			30431: "C3CB",
			38192: "C3CC",
			29467: "C3CD",
			26790: "C3CE",
			23391: "C3CF",
			30511: "C3D0",
			37274: "C3D1",
			38753: "C3D2",
			31964: "C3D3",
			36855: "C3D4",
			35868: "C3D5",
			24357: "C3D6",
			31859: "C3D7",
			31192: "C3D8",
			35269: "C3D9",
			27852: "C3DA",
			34588: "C3DB",
			23494: "C3DC",
			24130: "C3DD",
			26825: "C3DE",
			30496: "C3DF",
			32501: "C3E0",
			20885: "C3E1",
			20813: "C3E2",
			21193: "C3E3",
			23081: "C3E4",
			32517: "C3E5",
			38754: "C3E6",
			33495: "C3E7",
			25551: "C3E8",
			30596: "C3E9",
			34256: "C3EA",
			31186: "C3EB",
			28218: "C3EC",
			24217: "C3ED",
			22937: "C3EE",
			34065: "C3EF",
			28781: "C3F0",
			27665: "C3F1",
			25279: "C3F2",
			30399: "C3F3",
			25935: "C3F4",
			24751: "C3F5",
			38397: "C3F6",
			26126: "C3F7",
			34719: "C3F8",
			40483: "C3F9",
			38125: "C3FA",
			21517: "C3FB",
			21629: "C3FC",
			35884: "C3FD",
			25720: "C3FE",
			25721: "C4A1",
			34321: "C4A2",
			27169: "C4A3",
			33180: "C4A4",
			30952: "C4A5",
			25705: "C4A6",
			39764: "C4A7",
			25273: "C4A8",
			26411: "C4A9",
			33707: "C4AA",
			22696: "C4AB",
			40664: "C4AC",
			27819: "C4AD",
			28448: "C4AE",
			23518: "C4AF",
			38476: "C4B0",
			35851: "C4B1",
			29279: "C4B2",
			26576: "C4B3",
			25287: "C4B4",
			29281: "C4B5",
			20137: "C4B6",
			22982: "C4B7",
			27597: "C4B8",
			22675: "C4B9",
			26286: "C4BA",
			24149: "C4BB",
			21215: "C4BC",
			24917: "C4BD",
			26408: "C4BE",
			30446: "C4BF",
			30566: "C4C0",
			29287: "C4C1",
			31302: "C4C2",
			25343: "C4C3",
			21738: "C4C4",
			21584: "C4C5",
			38048: "C4C6",
			37027: "C4C7",
			23068: "C4C8",
			32435: "C4C9",
			27670: "C4CA",
			20035: "C4CB",
			22902: "C4CC",
			32784: "C4CD",
			22856: "C4CE",
			21335: "C4CF",
			30007: "C4D0",
			38590: "C4D1",
			22218: "C4D2",
			25376: "C4D3",
			33041: "C4D4",
			24700: "C4D5",
			38393: "C4D6",
			28118: "C4D7",
			21602: "C4D8",
			39297: "C4D9",
			20869: "C4DA",
			23273: "C4DB",
			33021: "C4DC",
			22958: "C4DD",
			38675: "C4DE",
			20522: "C4DF",
			27877: "C4E0",
			23612: "C4E1",
			25311: "C4E2",
			20320: "C4E3",
			21311: "C4E4",
			33147: "C4E5",
			36870: "C4E6",
			28346: "C4E7",
			34091: "C4E8",
			25288: "C4E9",
			24180: "C4EA",
			30910: "C4EB",
			25781: "C4EC",
			25467: "C4ED",
			24565: "C4EE",
			23064: "C4EF",
			37247: "C4F0",
			40479: "C4F1",
			23615: "C4F2",
			25423: "C4F3",
			32834: "C4F4",
			23421: "C4F5",
			21870: "C4F6",
			38218: "C4F7",
			38221: "C4F8",
			28037: "C4F9",
			24744: "C4FA",
			26592: "C4FB",
			29406: "C4FC",
			20957: "C4FD",
			23425: "C4FE",
			25319: "C5A1",
			27870: "C5A2",
			29275: "C5A3",
			25197: "C5A4",
			38062: "C5A5",
			32445: "C5A6",
			33043: "C5A7",
			27987: "C5A8",
			20892: "C5A9",
			24324: "C5AA",
			22900: "C5AB",
			21162: "C5AC",
			24594: "C5AD",
			22899: "C5AE",
			26262: "C5AF",
			34384: "C5B0",
			30111: "C5B1",
			25386: "C5B2",
			25062: "C5B3",
			31983: "C5B4",
			35834: "C5B5",
			21734: "C5B6",
			27431: "C5B7",
			40485: "C5B8",
			27572: "C5B9",
			34261: "C5BA",
			21589: "C5BB",
			20598: "C5BC",
			27812: "C5BD",
			21866: "C5BE",
			36276: "C5BF",
			29228: "C5C0",
			24085: "C5C1",
			24597: "C5C2",
			29750: "C5C3",
			25293: "C5C4",
			25490: "C5C5",
			29260: "C5C6",
			24472: "C5C7",
			28227: "C5C8",
			27966: "C5C9",
			25856: "C5CA",
			28504: "C5CB",
			30424: "C5CC",
			30928: "C5CD",
			30460: "C5CE",
			30036: "C5CF",
			21028: "C5D0",
			21467: "C5D1",
			20051: "C5D2",
			24222: "C5D3",
			26049: "C5D4",
			32810: "C5D5",
			32982: "C5D6",
			25243: "C5D7",
			21638: "C5D8",
			21032: "C5D9",
			28846: "C5DA",
			34957: "C5DB",
			36305: "C5DC",
			27873: "C5DD",
			21624: "C5DE",
			32986: "C5DF",
			22521: "C5E0",
			35060: "C5E1",
			36180: "C5E2",
			38506: "C5E3",
			37197: "C5E4",
			20329: "C5E5",
			27803: "C5E6",
			21943: "C5E7",
			30406: "C5E8",
			30768: "C5E9",
			25256: "C5EA",
			28921: "C5EB",
			28558: "C5EC",
			24429: "C5ED",
			34028: "C5EE",
			26842: "C5EF",
			30844: "C5F0",
			31735: "C5F1",
			33192: "C5F2",
			26379: "C5F3",
			40527: "C5F4",
			25447: "C5F5",
			30896: "C5F6",
			22383: "C5F7",
			30738: "C5F8",
			38713: "C5F9",
			25209: "C5FA",
			25259: "C5FB",
			21128: "C5FC",
			29749: "C5FD",
			27607: "C5FE",
			21860: "C6A1",
			33086: "C6A2",
			30130: "C6A3",
			30382: "C6A4",
			21305: "C6A5",
			30174: "C6A6",
			20731: "C6A7",
			23617: "C6A8",
			35692: "C6A9",
			31687: "C6AA",
			20559: "C6AB",
			29255: "C6AC",
			39575: "C6AD",
			39128: "C6AE",
			28418: "C6AF",
			29922: "C6B0",
			31080: "C6B1",
			25735: "C6B2",
			30629: "C6B3",
			25340: "C6B4",
			39057: "C6B5",
			36139: "C6B6",
			21697: "C6B7",
			32856: "C6B8",
			20050: "C6B9",
			22378: "C6BA",
			33529: "C6BB",
			33805: "C6BC",
			24179: "C6BD",
			20973: "C6BE",
			29942: "C6BF",
			35780: "C6C0",
			23631: "C6C1",
			22369: "C6C2",
			27900: "C6C3",
			39047: "C6C4",
			23110: "C6C5",
			30772: "C6C6",
			39748: "C6C7",
			36843: "C6C8",
			31893: "C6C9",
			21078: "C6CA",
			25169: "C6CB",
			38138: "C6CC",
			20166: "C6CD",
			33670: "C6CE",
			33889: "C6CF",
			33769: "C6D0",
			33970: "C6D1",
			22484: "C6D2",
			26420: "C6D3",
			22275: "C6D4",
			26222: "C6D5",
			28006: "C6D6",
			35889: "C6D7",
			26333: "C6D8",
			28689: "C6D9",
			26399: "C6DA",
			27450: "C6DB",
			26646: "C6DC",
			25114: "C6DD",
			22971: "C6DE",
			19971: "C6DF",
			20932: "C6E0",
			28422: "C6E1",
			26578: "C6E2",
			27791: "C6E3",
			20854: "C6E4",
			26827: "C6E5",
			22855: "C6E6",
			27495: "C6E7",
			30054: "C6E8",
			23822: "C6E9",
			33040: "C6EA",
			40784: "C6EB",
			26071: "C6EC",
			31048: "C6ED",
			31041: "C6EE",
			39569: "C6EF",
			36215: "C6F0",
			23682: "C6F1",
			20062: "C6F2",
			20225: "C6F3",
			21551: "C6F4",
			22865: "C6F5",
			30732: "C6F6",
			22120: "C6F7",
			27668: "C6F8",
			36804: "C6F9",
			24323: "C6FA",
			27773: "C6FB",
			27875: "C6FC",
			35755: "C6FD",
			25488: "C6FE",
			24688: "C7A1",
			27965: "C7A2",
			29301: "C7A3",
			25190: "C7A4",
			38030: "C7A5",
			38085: "C7A6",
			21315: "C7A7",
			36801: "C7A8",
			31614: "C7A9",
			20191: "C7AA",
			35878: "C7AB",
			20094: "C7AC",
			40660: "C7AD",
			38065: "C7AE",
			38067: "C7AF",
			21069: "C7B0",
			28508: "C7B1",
			36963: "C7B2",
			27973: "C7B3",
			35892: "C7B4",
			22545: "C7B5",
			23884: "C7B6",
			27424: "C7B7",
			27465: "C7B8",
			26538: "C7B9",
			21595: "C7BA",
			33108: "C7BB",
			32652: "C7BC",
			22681: "C7BD",
			34103: "C7BE",
			24378: "C7BF",
			25250: "C7C0",
			27207: "C7C1",
			38201: "C7C2",
			25970: "C7C3",
			24708: "C7C4",
			26725: "C7C5",
			30631: "C7C6",
			20052: "C7C7",
			20392: "C7C8",
			24039: "C7C9",
			38808: "C7CA",
			25772: "C7CB",
			32728: "C7CC",
			23789: "C7CD",
			20431: "C7CE",
			31373: "C7CF",
			20999: "C7D0",
			33540: "C7D1",
			19988: "C7D2",
			24623: "C7D3",
			31363: "C7D4",
			38054: "C7D5",
			20405: "C7D6",
			20146: "C7D7",
			31206: "C7D8",
			29748: "C7D9",
			21220: "C7DA",
			33465: "C7DB",
			25810: "C7DC",
			31165: "C7DD",
			23517: "C7DE",
			27777: "C7DF",
			38738: "C7E0",
			36731: "C7E1",
			27682: "C7E2",
			20542: "C7E3",
			21375: "C7E4",
			28165: "C7E5",
			25806: "C7E6",
			26228: "C7E7",
			27696: "C7E8",
			24773: "C7E9",
			39031: "C7EA",
			35831: "C7EB",
			24198: "C7EC",
			29756: "C7ED",
			31351: "C7EE",
			31179: "C7EF",
			19992: "C7F0",
			37041: "C7F1",
			29699: "C7F2",
			27714: "C7F3",
			22234: "C7F4",
			37195: "C7F5",
			27845: "C7F6",
			36235: "C7F7",
			21306: "C7F8",
			34502: "C7F9",
			26354: "C7FA",
			36527: "C7FB",
			23624: "C7FC",
			39537: "C7FD",
			28192: "C7FE",
			21462: "C8A1",
			23094: "C8A2",
			40843: "C8A3",
			36259: "C8A4",
			21435: "C8A5",
			22280: "C8A6",
			39079: "C8A7",
			26435: "C8A8",
			37275: "C8A9",
			27849: "C8AA",
			20840: "C8AB",
			30154: "C8AC",
			25331: "C8AD",
			29356: "C8AE",
			21048: "C8AF",
			21149: "C8B0",
			32570: "C8B1",
			28820: "C8B2",
			30264: "C8B3",
			21364: "C8B4",
			40522: "C8B5",
			27063: "C8B6",
			30830: "C8B7",
			38592: "C8B8",
			35033: "C8B9",
			32676: "C8BA",
			28982: "C8BB",
			29123: "C8BC",
			20873: "C8BD",
			26579: "C8BE",
			29924: "C8BF",
			22756: "C8C0",
			25880: "C8C1",
			22199: "C8C2",
			35753: "C8C3",
			39286: "C8C4",
			25200: "C8C5",
			32469: "C8C6",
			24825: "C8C7",
			28909: "C8C8",
			22764: "C8C9",
			20161: "C8CA",
			20154: "C8CB",
			24525: "C8CC",
			38887: "C8CD",
			20219: "C8CE",
			35748: "C8CF",
			20995: "C8D0",
			22922: "C8D1",
			32427: "C8D2",
			25172: "C8D3",
			20173: "C8D4",
			26085: "C8D5",
			25102: "C8D6",
			33592: "C8D7",
			33993: "C8D8",
			33635: "C8D9",
			34701: "C8DA",
			29076: "C8DB",
			28342: "C8DC",
			23481: "C8DD",
			32466: "C8DE",
			20887: "C8DF",
			25545: "C8E0",
			26580: "C8E1",
			32905: "C8E2",
			33593: "C8E3",
			34837: "C8E4",
			20754: "C8E5",
			23418: "C8E6",
			22914: "C8E7",
			36785: "C8E8",
			20083: "C8E9",
			27741: "C8EA",
			20837: "C8EB",
			35109: "C8EC",
			36719: "C8ED",
			38446: "C8EE",
			34122: "C8EF",
			29790: "C8F0",
			38160: "C8F1",
			38384: "C8F2",
			28070: "C8F3",
			33509: "C8F4",
			24369: "C8F5",
			25746: "C8F6",
			27922: "C8F7",
			33832: "C8F8",
			33134: "C8F9",
			40131: "C8FA",
			22622: "C8FB",
			36187: "C8FC",
			19977: "C8FD",
			21441: "C8FE",
			20254: "C9A1",
			25955: "C9A2",
			26705: "C9A3",
			21971: "C9A4",
			20007: "C9A5",
			25620: "C9A6",
			39578: "C9A7",
			25195: "C9A8",
			23234: "C9A9",
			29791: "C9AA",
			33394: "C9AB",
			28073: "C9AC",
			26862: "C9AD",
			20711: "C9AE",
			33678: "C9AF",
			30722: "C9B0",
			26432: "C9B1",
			21049: "C9B2",
			27801: "C9B3",
			32433: "C9B4",
			20667: "C9B5",
			21861: "C9B6",
			29022: "C9B7",
			31579: "C9B8",
			26194: "C9B9",
			29642: "C9BA",
			33515: "C9BB",
			26441: "C9BC",
			23665: "C9BD",
			21024: "C9BE",
			29053: "C9BF",
			34923: "C9C0",
			38378: "C9C1",
			38485: "C9C2",
			25797: "C9C3",
			36193: "C9C4",
			33203: "C9C5",
			21892: "C9C6",
			27733: "C9C7",
			25159: "C9C8",
			32558: "C9C9",
			22674: "C9CA",
			20260: "C9CB",
			21830: "C9CC",
			36175: "C9CD",
			26188: "C9CE",
			19978: "C9CF",
			23578: "C9D0",
			35059: "C9D1",
			26786: "C9D2",
			25422: "C9D3",
			31245: "C9D4",
			28903: "C9D5",
			33421: "C9D6",
			21242: "C9D7",
			38902: "C9D8",
			23569: "C9D9",
			21736: "C9DA",
			37045: "C9DB",
			32461: "C9DC",
			22882: "C9DD",
			36170: "C9DE",
			34503: "C9DF",
			33292: "C9E0",
			33293: "C9E1",
			36198: "C9E2",
			25668: "C9E3",
			23556: "C9E4",
			24913: "C9E5",
			28041: "C9E6",
			31038: "C9E7",
			35774: "C9E8",
			30775: "C9E9",
			30003: "C9EA",
			21627: "C9EB",
			20280: "C9EC",
			36523: "C9ED",
			28145: "C9EE",
			23072: "C9EF",
			32453: "C9F0",
			31070: "C9F1",
			27784: "C9F2",
			23457: "C9F3",
			23158: "C9F4",
			29978: "C9F5",
			32958: "C9F6",
			24910: "C9F7",
			28183: "C9F8",
			22768: "C9F9",
			29983: "C9FA",
			29989: "C9FB",
			29298: "C9FC",
			21319: "C9FD",
			32499: "C9FE",
			30465: "CAA1",
			30427: "CAA2",
			21097: "CAA3",
			32988: "CAA4",
			22307: "CAA5",
			24072: "CAA6",
			22833: "CAA7",
			29422: "CAA8",
			26045: "CAA9",
			28287: "CAAA",
			35799: "CAAB",
			23608: "CAAC",
			34417: "CAAD",
			21313: "CAAE",
			30707: "CAAF",
			25342: "CAB0",
			26102: "CAB1",
			20160: "CAB2",
			39135: "CAB3",
			34432: "CAB4",
			23454: "CAB5",
			35782: "CAB6",
			21490: "CAB7",
			30690: "CAB8",
			20351: "CAB9",
			23630: "CABA",
			39542: "CABB",
			22987: "CABC",
			24335: "CABD",
			31034: "CABE",
			22763: "CABF",
			19990: "CAC0",
			26623: "CAC1",
			20107: "CAC2",
			25325: "CAC3",
			35475: "CAC4",
			36893: "CAC5",
			21183: "CAC6",
			26159: "CAC7",
			21980: "CAC8",
			22124: "CAC9",
			36866: "CACA",
			20181: "CACB",
			20365: "CACC",
			37322: "CACD",
			39280: "CACE",
			27663: "CACF",
			24066: "CAD0",
			24643: "CAD1",
			23460: "CAD2",
			35270: "CAD3",
			35797: "CAD4",
			25910: "CAD5",
			25163: "CAD6",
			39318: "CAD7",
			23432: "CAD8",
			23551: "CAD9",
			25480: "CADA",
			21806: "CADB",
			21463: "CADC",
			30246: "CADD",
			20861: "CADE",
			34092: "CADF",
			26530: "CAE0",
			26803: "CAE1",
			27530: "CAE2",
			25234: "CAE3",
			36755: "CAE4",
			21460: "CAE5",
			33298: "CAE6",
			28113: "CAE7",
			30095: "CAE8",
			20070: "CAE9",
			36174: "CAEA",
			23408: "CAEB",
			29087: "CAEC",
			34223: "CAED",
			26257: "CAEE",
			26329: "CAEF",
			32626: "CAF0",
			34560: "CAF1",
			40653: "CAF2",
			40736: "CAF3",
			23646: "CAF4",
			26415: "CAF5",
			36848: "CAF6",
			26641: "CAF7",
			26463: "CAF8",
			25101: "CAF9",
			31446: "CAFA",
			22661: "CAFB",
			24246: "CAFC",
			25968: "CAFD",
			28465: "CAFE",
			24661: "CBA1",
			21047: "CBA2",
			32781: "CBA3",
			25684: "CBA4",
			34928: "CBA5",
			29993: "CBA6",
			24069: "CBA7",
			26643: "CBA8",
			25332: "CBA9",
			38684: "CBAA",
			21452: "CBAB",
			29245: "CBAC",
			35841: "CBAD",
			27700: "CBAE",
			30561: "CBAF",
			31246: "CBB0",
			21550: "CBB1",
			30636: "CBB2",
			39034: "CBB3",
			33308: "CBB4",
			35828: "CBB5",
			30805: "CBB6",
			26388: "CBB7",
			28865: "CBB8",
			26031: "CBB9",
			25749: "CBBA",
			22070: "CBBB",
			24605: "CBBC",
			31169: "CBBD",
			21496: "CBBE",
			19997: "CBBF",
			27515: "CBC0",
			32902: "CBC1",
			23546: "CBC2",
			21987: "CBC3",
			22235: "CBC4",
			20282: "CBC5",
			20284: "CBC6",
			39282: "CBC7",
			24051: "CBC8",
			26494: "CBC9",
			32824: "CBCA",
			24578: "CBCB",
			39042: "CBCC",
			36865: "CBCD",
			23435: "CBCE",
			35772: "CBCF",
			35829: "CBD0",
			25628: "CBD1",
			33368: "CBD2",
			25822: "CBD3",
			22013: "CBD4",
			33487: "CBD5",
			37221: "CBD6",
			20439: "CBD7",
			32032: "CBD8",
			36895: "CBD9",
			31903: "CBDA",
			20723: "CBDB",
			22609: "CBDC",
			28335: "CBDD",
			23487: "CBDE",
			35785: "CBDF",
			32899: "CBE0",
			37240: "CBE1",
			33948: "CBE2",
			31639: "CBE3",
			34429: "CBE4",
			38539: "CBE5",
			38543: "CBE6",
			32485: "CBE7",
			39635: "CBE8",
			30862: "CBE9",
			23681: "CBEA",
			31319: "CBEB",
			36930: "CBEC",
			38567: "CBED",
			31071: "CBEE",
			23385: "CBEF",
			25439: "CBF0",
			31499: "CBF1",
			34001: "CBF2",
			26797: "CBF3",
			21766: "CBF4",
			32553: "CBF5",
			29712: "CBF6",
			32034: "CBF7",
			38145: "CBF8",
			25152: "CBF9",
			22604: "CBFA",
			20182: "CBFB",
			23427: "CBFC",
			22905: "CBFD",
			22612: "CBFE",
			29549: "CCA1",
			25374: "CCA2",
			36427: "CCA3",
			36367: "CCA4",
			32974: "CCA5",
			33492: "CCA6",
			25260: "CCA7",
			21488: "CCA8",
			27888: "CCA9",
			37214: "CCAA",
			22826: "CCAB",
			24577: "CCAC",
			27760: "CCAD",
			22349: "CCAE",
			25674: "CCAF",
			36138: "CCB0",
			30251: "CCB1",
			28393: "CCB2",
			22363: "CCB3",
			27264: "CCB4",
			30192: "CCB5",
			28525: "CCB6",
			35885: "CCB7",
			35848: "CCB8",
			22374: "CCB9",
			27631: "CCBA",
			34962: "CCBB",
			30899: "CCBC",
			25506: "CCBD",
			21497: "CCBE",
			28845: "CCBF",
			27748: "CCC0",
			22616: "CCC1",
			25642: "CCC2",
			22530: "CCC3",
			26848: "CCC4",
			33179: "CCC5",
			21776: "CCC6",
			31958: "CCC7",
			20504: "CCC8",
			36538: "CCC9",
			28108: "CCCA",
			36255: "CCCB",
			28907: "CCCC",
			25487: "CCCD",
			28059: "CCCE",
			28372: "CCCF",
			32486: "CCD0",
			33796: "CCD1",
			26691: "CCD2",
			36867: "CCD3",
			28120: "CCD4",
			38518: "CCD5",
			35752: "CCD6",
			22871: "CCD7",
			29305: "CCD8",
			34276: "CCD9",
			33150: "CCDA",
			30140: "CCDB",
			35466: "CCDC",
			26799: "CCDD",
			21076: "CCDE",
			36386: "CCDF",
			38161: "CCE0",
			25552: "CCE1",
			39064: "CCE2",
			36420: "CCE3",
			21884: "CCE4",
			20307: "CCE5",
			26367: "CCE6",
			22159: "CCE7",
			24789: "CCE8",
			28053: "CCE9",
			21059: "CCEA",
			23625: "CCEB",
			22825: "CCEC",
			28155: "CCED",
			22635: "CCEE",
			3e4: "CCEF",
			29980: "CCF0",
			24684: "CCF1",
			33300: "CCF2",
			33094: "CCF3",
			25361: "CCF4",
			26465: "CCF5",
			36834: "CCF6",
			30522: "CCF7",
			36339: "CCF8",
			36148: "CCF9",
			38081: "CCFA",
			24086: "CCFB",
			21381: "CCFC",
			21548: "CCFD",
			28867: "CCFE",
			27712: "CDA1",
			24311: "CDA2",
			20572: "CDA3",
			20141: "CDA4",
			24237: "CDA5",
			25402: "CDA6",
			33351: "CDA7",
			36890: "CDA8",
			26704: "CDA9",
			37230: "CDAA",
			30643: "CDAB",
			21516: "CDAC",
			38108: "CDAD",
			24420: "CDAE",
			31461: "CDAF",
			26742: "CDB0",
			25413: "CDB1",
			31570: "CDB2",
			32479: "CDB3",
			30171: "CDB4",
			20599: "CDB5",
			25237: "CDB6",
			22836: "CDB7",
			36879: "CDB8",
			20984: "CDB9",
			31171: "CDBA",
			31361: "CDBB",
			22270: "CDBC",
			24466: "CDBD",
			36884: "CDBE",
			28034: "CDBF",
			23648: "CDC0",
			22303: "CDC1",
			21520: "CDC2",
			20820: "CDC3",
			28237: "CDC4",
			22242: "CDC5",
			25512: "CDC6",
			39059: "CDC7",
			33151: "CDC8",
			34581: "CDC9",
			35114: "CDCA",
			36864: "CDCB",
			21534: "CDCC",
			23663: "CDCD",
			33216: "CDCE",
			25302: "CDCF",
			25176: "CDD0",
			33073: "CDD1",
			40501: "CDD2",
			38464: "CDD3",
			39534: "CDD4",
			39548: "CDD5",
			26925: "CDD6",
			22949: "CDD7",
			25299: "CDD8",
			21822: "CDD9",
			25366: "CDDA",
			21703: "CDDB",
			34521: "CDDC",
			27964: "CDDD",
			23043: "CDDE",
			29926: "CDDF",
			34972: "CDE0",
			27498: "CDE1",
			22806: "CDE2",
			35916: "CDE3",
			24367: "CDE4",
			28286: "CDE5",
			29609: "CDE6",
			39037: "CDE7",
			20024: "CDE8",
			28919: "CDE9",
			23436: "CDEA",
			30871: "CDEB",
			25405: "CDEC",
			26202: "CDED",
			30358: "CDEE",
			24779: "CDEF",
			23451: "CDF0",
			23113: "CDF1",
			19975: "CDF2",
			33109: "CDF3",
			27754: "CDF4",
			29579: "CDF5",
			20129: "CDF6",
			26505: "CDF7",
			32593: "CDF8",
			24448: "CDF9",
			26106: "CDFA",
			26395: "CDFB",
			24536: "CDFC",
			22916: "CDFD",
			23041: "CDFE",
			24013: "CEA1",
			24494: "CEA2",
			21361: "CEA3",
			38886: "CEA4",
			36829: "CEA5",
			26693: "CEA6",
			22260: "CEA7",
			21807: "CEA8",
			24799: "CEA9",
			20026: "CEAA",
			28493: "CEAB",
			32500: "CEAC",
			33479: "CEAD",
			33806: "CEAE",
			22996: "CEAF",
			20255: "CEB0",
			20266: "CEB1",
			23614: "CEB2",
			32428: "CEB3",
			26410: "CEB4",
			34074: "CEB5",
			21619: "CEB6",
			30031: "CEB7",
			32963: "CEB8",
			21890: "CEB9",
			39759: "CEBA",
			20301: "CEBB",
			28205: "CEBC",
			35859: "CEBD",
			23561: "CEBE",
			24944: "CEBF",
			21355: "CEC0",
			30239: "CEC1",
			28201: "CEC2",
			34442: "CEC3",
			25991: "CEC4",
			38395: "CEC5",
			32441: "CEC6",
			21563: "CEC7",
			31283: "CEC8",
			32010: "CEC9",
			38382: "CECA",
			21985: "CECB",
			32705: "CECC",
			29934: "CECD",
			25373: "CECE",
			34583: "CECF",
			28065: "CED0",
			31389: "CED1",
			25105: "CED2",
			26017: "CED3",
			21351: "CED4",
			25569: "CED5",
			27779: "CED6",
			24043: "CED7",
			21596: "CED8",
			38056: "CED9",
			20044: "CEDA",
			27745: "CEDB",
			35820: "CEDC",
			23627: "CEDD",
			26080: "CEDE",
			33436: "CEDF",
			26791: "CEE0",
			21566: "CEE1",
			21556: "CEE2",
			27595: "CEE3",
			27494: "CEE4",
			20116: "CEE5",
			25410: "CEE6",
			21320: "CEE7",
			33310: "CEE8",
			20237: "CEE9",
			20398: "CEEA",
			22366: "CEEB",
			25098: "CEEC",
			38654: "CEED",
			26212: "CEEE",
			29289: "CEEF",
			21247: "CEF0",
			21153: "CEF1",
			24735: "CEF2",
			35823: "CEF3",
			26132: "CEF4",
			29081: "CEF5",
			26512: "CEF6",
			35199: "CEF7",
			30802: "CEF8",
			30717: "CEF9",
			26224: "CEFA",
			22075: "CEFB",
			21560: "CEFC",
			38177: "CEFD",
			29306: "CEFE",
			31232: "CFA1",
			24687: "CFA2",
			24076: "CFA3",
			24713: "CFA4",
			33181: "CFA5",
			22805: "CFA6",
			24796: "CFA7",
			29060: "CFA8",
			28911: "CFA9",
			28330: "CFAA",
			27728: "CFAB",
			29312: "CFAC",
			27268: "CFAD",
			34989: "CFAE",
			24109: "CFAF",
			20064: "CFB0",
			23219: "CFB1",
			21916: "CFB2",
			38115: "CFB3",
			27927: "CFB4",
			31995: "CFB5",
			38553: "CFB6",
			25103: "CFB7",
			32454: "CFB8",
			30606: "CFB9",
			34430: "CFBA",
			21283: "CFBB",
			38686: "CFBC",
			36758: "CFBD",
			26247: "CFBE",
			23777: "CFBF",
			20384: "CFC0",
			29421: "CFC1",
			19979: "CFC2",
			21414: "CFC3",
			22799: "CFC4",
			21523: "CFC5",
			25472: "CFC6",
			38184: "CFC7",
			20808: "CFC8",
			20185: "CFC9",
			40092: "CFCA",
			32420: "CFCB",
			21688: "CFCC",
			36132: "CFCD",
			34900: "CFCE",
			33335: "CFCF",
			38386: "CFD0",
			28046: "CFD1",
			24358: "CFD2",
			23244: "CFD3",
			26174: "CFD4",
			38505: "CFD5",
			29616: "CFD6",
			29486: "CFD7",
			21439: "CFD8",
			33146: "CFD9",
			39301: "CFDA",
			32673: "CFDB",
			23466: "CFDC",
			38519: "CFDD",
			38480: "CFDE",
			32447: "CFDF",
			30456: "CFE0",
			21410: "CFE1",
			38262: "CFE2",
			39321: "CFE3",
			31665: "CFE4",
			35140: "CFE5",
			28248: "CFE6",
			20065: "CFE7",
			32724: "CFE8",
			31077: "CFE9",
			35814: "CFEA",
			24819: "CFEB",
			21709: "CFEC",
			20139: "CFED",
			39033: "CFEE",
			24055: "CFEF",
			27233: "CFF0",
			20687: "CFF1",
			21521: "CFF2",
			35937: "CFF3",
			33831: "CFF4",
			30813: "CFF5",
			38660: "CFF6",
			21066: "CFF7",
			21742: "CFF8",
			22179: "CFF9",
			38144: "CFFA",
			28040: "CFFB",
			23477: "CFFC",
			28102: "CFFD",
			26195: "CFFE",
			23567: "D0A1",
			23389: "D0A2",
			26657: "D0A3",
			32918: "D0A4",
			21880: "D0A5",
			31505: "D0A6",
			25928: "D0A7",
			26964: "D0A8",
			20123: "D0A9",
			27463: "D0AA",
			34638: "D0AB",
			38795: "D0AC",
			21327: "D0AD",
			25375: "D0AE",
			25658: "D0AF",
			37034: "D0B0",
			26012: "D0B1",
			32961: "D0B2",
			35856: "D0B3",
			20889: "D0B4",
			26800: "D0B5",
			21368: "D0B6",
			34809: "D0B7",
			25032: "D0B8",
			27844: "D0B9",
			27899: "D0BA",
			35874: "D0BB",
			23633: "D0BC",
			34218: "D0BD",
			33455: "D0BE",
			38156: "D0BF",
			27427: "D0C0",
			36763: "D0C1",
			26032: "D0C2",
			24571: "D0C3",
			24515: "D0C4",
			20449: "D0C5",
			34885: "D0C6",
			26143: "D0C7",
			33125: "D0C8",
			29481: "D0C9",
			24826: "D0CA",
			20852: "D0CB",
			21009: "D0CC",
			22411: "D0CD",
			24418: "D0CE",
			37026: "D0CF",
			34892: "D0D0",
			37266: "D0D1",
			24184: "D0D2",
			26447: "D0D3",
			24615: "D0D4",
			22995: "D0D5",
			20804: "D0D6",
			20982: "D0D7",
			33016: "D0D8",
			21256: "D0D9",
			27769: "D0DA",
			38596: "D0DB",
			29066: "D0DC",
			20241: "D0DD",
			20462: "D0DE",
			32670: "D0DF",
			26429: "D0E0",
			21957: "D0E1",
			38152: "D0E2",
			31168: "D0E3",
			34966: "D0E4",
			32483: "D0E5",
			22687: "D0E6",
			25100: "D0E7",
			38656: "D0E8",
			34394: "D0E9",
			22040: "D0EA",
			39035: "D0EB",
			24464: "D0EC",
			35768: "D0ED",
			33988: "D0EE",
			37207: "D0EF",
			21465: "D0F0",
			26093: "D0F1",
			24207: "D0F2",
			30044: "D0F3",
			24676: "D0F4",
			32110: "D0F5",
			23167: "D0F6",
			32490: "D0F7",
			32493: "D0F8",
			36713: "D0F9",
			21927: "D0FA",
			23459: "D0FB",
			24748: "D0FC",
			26059: "D0FD",
			29572: "D0FE",
			36873: "D1A1",
			30307: "D1A2",
			30505: "D1A3",
			32474: "D1A4",
			38772: "D1A5",
			34203: "D1A6",
			23398: "D1A7",
			31348: "D1A8",
			38634: "D1A9",
			34880: "D1AA",
			21195: "D1AB",
			29071: "D1AC",
			24490: "D1AD",
			26092: "D1AE",
			35810: "D1AF",
			23547: "D1B0",
			39535: "D1B1",
			24033: "D1B2",
			27529: "D1B3",
			27739: "D1B4",
			35757: "D1B5",
			35759: "D1B6",
			36874: "D1B7",
			36805: "D1B8",
			21387: "D1B9",
			25276: "D1BA",
			40486: "D1BB",
			40493: "D1BC",
			21568: "D1BD",
			20011: "D1BE",
			33469: "D1BF",
			29273: "D1C0",
			34460: "D1C1",
			23830: "D1C2",
			34905: "D1C3",
			28079: "D1C4",
			38597: "D1C5",
			21713: "D1C6",
			20122: "D1C7",
			35766: "D1C8",
			28937: "D1C9",
			21693: "D1CA",
			38409: "D1CB",
			28895: "D1CC",
			28153: "D1CD",
			30416: "D1CE",
			20005: "D1CF",
			30740: "D1D0",
			34578: "D1D1",
			23721: "D1D2",
			24310: "D1D3",
			35328: "D1D4",
			39068: "D1D5",
			38414: "D1D6",
			28814: "D1D7",
			27839: "D1D8",
			22852: "D1D9",
			25513: "D1DA",
			30524: "D1DB",
			34893: "D1DC",
			28436: "D1DD",
			33395: "D1DE",
			22576: "D1DF",
			29141: "D1E0",
			21388: "D1E1",
			30746: "D1E2",
			38593: "D1E3",
			21761: "D1E4",
			24422: "D1E5",
			28976: "D1E6",
			23476: "D1E7",
			35866: "D1E8",
			39564: "D1E9",
			27523: "D1EA",
			22830: "D1EB",
			40495: "D1EC",
			31207: "D1ED",
			26472: "D1EE",
			25196: "D1EF",
			20335: "D1F0",
			30113: "D1F1",
			32650: "D1F2",
			27915: "D1F3",
			38451: "D1F4",
			27687: "D1F5",
			20208: "D1F6",
			30162: "D1F7",
			20859: "D1F8",
			26679: "D1F9",
			28478: "D1FA",
			36992: "D1FB",
			33136: "D1FC",
			22934: "D1FD",
			29814: "D1FE",
			25671: "D2A1",
			23591: "D2A2",
			36965: "D2A3",
			31377: "D2A4",
			35875: "D2A5",
			23002: "D2A6",
			21676: "D2A7",
			33280: "D2A8",
			33647: "D2A9",
			35201: "D2AA",
			32768: "D2AB",
			26928: "D2AC",
			22094: "D2AD",
			32822: "D2AE",
			29239: "D2AF",
			37326: "D2B0",
			20918: "D2B1",
			20063: "D2B2",
			39029: "D2B3",
			25494: "D2B4",
			19994: "D2B5",
			21494: "D2B6",
			26355: "D2B7",
			33099: "D2B8",
			22812: "D2B9",
			28082: "D2BA",
			19968: "D2BB",
			22777: "D2BC",
			21307: "D2BD",
			25558: "D2BE",
			38129: "D2BF",
			20381: "D2C0",
			20234: "D2C1",
			34915: "D2C2",
			39056: "D2C3",
			22839: "D2C4",
			36951: "D2C5",
			31227: "D2C6",
			20202: "D2C7",
			33008: "D2C8",
			30097: "D2C9",
			27778: "D2CA",
			23452: "D2CB",
			23016: "D2CC",
			24413: "D2CD",
			26885: "D2CE",
			34433: "D2CF",
			20506: "D2D0",
			24050: "D2D1",
			20057: "D2D2",
			30691: "D2D3",
			20197: "D2D4",
			33402: "D2D5",
			25233: "D2D6",
			26131: "D2D7",
			37009: "D2D8",
			23673: "D2D9",
			20159: "D2DA",
			24441: "D2DB",
			33222: "D2DC",
			36920: "D2DD",
			32900: "D2DE",
			30123: "D2DF",
			20134: "D2E0",
			35028: "D2E1",
			24847: "D2E2",
			27589: "D2E3",
			24518: "D2E4",
			20041: "D2E5",
			30410: "D2E6",
			28322: "D2E7",
			35811: "D2E8",
			35758: "D2E9",
			35850: "D2EA",
			35793: "D2EB",
			24322: "D2EC",
			32764: "D2ED",
			32716: "D2EE",
			32462: "D2EF",
			33589: "D2F0",
			33643: "D2F1",
			22240: "D2F2",
			27575: "D2F3",
			38899: "D2F4",
			38452: "D2F5",
			23035: "D2F6",
			21535: "D2F7",
			38134: "D2F8",
			28139: "D2F9",
			23493: "D2FA",
			39278: "D2FB",
			23609: "D2FC",
			24341: "D2FD",
			38544: "D2FE",
			21360: "D3A1",
			33521: "D3A2",
			27185: "D3A3",
			23156: "D3A4",
			40560: "D3A5",
			24212: "D3A6",
			32552: "D3A7",
			33721: "D3A8",
			33828: "D3A9",
			33829: "D3AA",
			33639: "D3AB",
			34631: "D3AC",
			36814: "D3AD",
			36194: "D3AE",
			30408: "D3AF",
			24433: "D3B0",
			39062: "D3B1",
			30828: "D3B2",
			26144: "D3B3",
			21727: "D3B4",
			25317: "D3B5",
			20323: "D3B6",
			33219: "D3B7",
			30152: "D3B8",
			24248: "D3B9",
			38605: "D3BA",
			36362: "D3BB",
			34553: "D3BC",
			21647: "D3BD",
			27891: "D3BE",
			28044: "D3BF",
			27704: "D3C0",
			24703: "D3C1",
			21191: "D3C2",
			29992: "D3C3",
			24189: "D3C4",
			20248: "D3C5",
			24736: "D3C6",
			24551: "D3C7",
			23588: "D3C8",
			30001: "D3C9",
			37038: "D3CA",
			38080: "D3CB",
			29369: "D3CC",
			27833: "D3CD",
			28216: "D3CE",
			37193: "D3CF",
			26377: "D3D0",
			21451: "D3D1",
			21491: "D3D2",
			20305: "D3D3",
			37321: "D3D4",
			35825: "D3D5",
			21448: "D3D6",
			24188: "D3D7",
			36802: "D3D8",
			28132: "D3D9",
			20110: "D3DA",
			30402: "D3DB",
			27014: "D3DC",
			34398: "D3DD",
			24858: "D3DE",
			33286: "D3DF",
			20313: "D3E0",
			20446: "D3E1",
			36926: "D3E2",
			40060: "D3E3",
			24841: "D3E4",
			28189: "D3E5",
			28180: "D3E6",
			38533: "D3E7",
			20104: "D3E8",
			23089: "D3E9",
			38632: "D3EA",
			19982: "D3EB",
			23679: "D3EC",
			31161: "D3ED",
			23431: "D3EE",
			35821: "D3EF",
			32701: "D3F0",
			29577: "D3F1",
			22495: "D3F2",
			33419: "D3F3",
			37057: "D3F4",
			21505: "D3F5",
			36935: "D3F6",
			21947: "D3F7",
			23786: "D3F8",
			24481: "D3F9",
			24840: "D3FA",
			27442: "D3FB",
			29425: "D3FC",
			32946: "D3FD",
			35465: "D3FE",
			28020: "D4A1",
			23507: "D4A2",
			35029: "D4A3",
			39044: "D4A4",
			35947: "D4A5",
			39533: "D4A6",
			40499: "D4A7",
			28170: "D4A8",
			20900: "D4A9",
			20803: "D4AA",
			22435: "D4AB",
			34945: "D4AC",
			21407: "D4AD",
			25588: "D4AE",
			36757: "D4AF",
			22253: "D4B0",
			21592: "D4B1",
			22278: "D4B2",
			29503: "D4B3",
			28304: "D4B4",
			32536: "D4B5",
			36828: "D4B6",
			33489: "D4B7",
			24895: "D4B8",
			24616: "D4B9",
			38498: "D4BA",
			26352: "D4BB",
			32422: "D4BC",
			36234: "D4BD",
			36291: "D4BE",
			38053: "D4BF",
			23731: "D4C0",
			31908: "D4C1",
			26376: "D4C2",
			24742: "D4C3",
			38405: "D4C4",
			32792: "D4C5",
			20113: "D4C6",
			37095: "D4C7",
			21248: "D4C8",
			38504: "D4C9",
			20801: "D4CA",
			36816: "D4CB",
			34164: "D4CC",
			37213: "D4CD",
			26197: "D4CE",
			38901: "D4CF",
			23381: "D4D0",
			21277: "D4D1",
			30776: "D4D2",
			26434: "D4D3",
			26685: "D4D4",
			21705: "D4D5",
			28798: "D4D6",
			23472: "D4D7",
			36733: "D4D8",
			20877: "D4D9",
			22312: "D4DA",
			21681: "D4DB",
			25874: "D4DC",
			26242: "D4DD",
			36190: "D4DE",
			36163: "D4DF",
			33039: "D4E0",
			33900: "D4E1",
			36973: "D4E2",
			31967: "D4E3",
			20991: "D4E4",
			34299: "D4E5",
			26531: "D4E6",
			26089: "D4E7",
			28577: "D4E8",
			34468: "D4E9",
			36481: "D4EA",
			22122: "D4EB",
			36896: "D4EC",
			30338: "D4ED",
			28790: "D4EE",
			29157: "D4EF",
			36131: "D4F0",
			25321: "D4F1",
			21017: "D4F2",
			27901: "D4F3",
			36156: "D4F4",
			24590: "D4F5",
			22686: "D4F6",
			24974: "D4F7",
			26366: "D4F8",
			36192: "D4F9",
			25166: "D4FA",
			21939: "D4FB",
			28195: "D4FC",
			26413: "D4FD",
			36711: "D4FE",
			38113: "D5A1",
			38392: "D5A2",
			30504: "D5A3",
			26629: "D5A4",
			27048: "D5A5",
			21643: "D5A6",
			20045: "D5A7",
			28856: "D5A8",
			35784: "D5A9",
			25688: "D5AA",
			25995: "D5AB",
			23429: "D5AC",
			31364: "D5AD",
			20538: "D5AE",
			23528: "D5AF",
			30651: "D5B0",
			27617: "D5B1",
			35449: "D5B2",
			31896: "D5B3",
			27838: "D5B4",
			30415: "D5B5",
			26025: "D5B6",
			36759: "D5B7",
			23853: "D5B8",
			23637: "D5B9",
			34360: "D5BA",
			26632: "D5BB",
			21344: "D5BC",
			25112: "D5BD",
			31449: "D5BE",
			28251: "D5BF",
			32509: "D5C0",
			27167: "D5C1",
			31456: "D5C2",
			24432: "D5C3",
			28467: "D5C4",
			24352: "D5C5",
			25484: "D5C6",
			28072: "D5C7",
			26454: "D5C8",
			19976: "D5C9",
			24080: "D5CA",
			36134: "D5CB",
			20183: "D5CC",
			32960: "D5CD",
			30260: "D5CE",
			38556: "D5CF",
			25307: "D5D0",
			26157: "D5D1",
			25214: "D5D2",
			27836: "D5D3",
			36213: "D5D4",
			29031: "D5D5",
			32617: "D5D6",
			20806: "D5D7",
			32903: "D5D8",
			21484: "D5D9",
			36974: "D5DA",
			25240: "D5DB",
			21746: "D5DC",
			34544: "D5DD",
			36761: "D5DE",
			32773: "D5DF",
			38167: "D5E0",
			34071: "D5E1",
			36825: "D5E2",
			27993: "D5E3",
			29645: "D5E4",
			26015: "D5E5",
			30495: "D5E6",
			29956: "D5E7",
			30759: "D5E8",
			33275: "D5E9",
			36126: "D5EA",
			38024: "D5EB",
			20390: "D5EC",
			26517: "D5ED",
			30137: "D5EE",
			35786: "D5EF",
			38663: "D5F0",
			25391: "D5F1",
			38215: "D5F2",
			38453: "D5F3",
			33976: "D5F4",
			25379: "D5F5",
			30529: "D5F6",
			24449: "D5F7",
			29424: "D5F8",
			20105: "D5F9",
			24596: "D5FA",
			25972: "D5FB",
			25327: "D5FC",
			27491: "D5FD",
			25919: "D5FE",
			24103: "D6A1",
			30151: "D6A2",
			37073: "D6A3",
			35777: "D6A4",
			33437: "D6A5",
			26525: "D6A6",
			25903: "D6A7",
			21553: "D6A8",
			34584: "D6A9",
			30693: "D6AA",
			32930: "D6AB",
			33026: "D6AC",
			27713: "D6AD",
			20043: "D6AE",
			32455: "D6AF",
			32844: "D6B0",
			30452: "D6B1",
			26893: "D6B2",
			27542: "D6B3",
			25191: "D6B4",
			20540: "D6B5",
			20356: "D6B6",
			22336: "D6B7",
			25351: "D6B8",
			27490: "D6B9",
			36286: "D6BA",
			21482: "D6BB",
			26088: "D6BC",
			32440: "D6BD",
			24535: "D6BE",
			25370: "D6BF",
			25527: "D6C0",
			33267: "D6C1",
			33268: "D6C2",
			32622: "D6C3",
			24092: "D6C4",
			23769: "D6C5",
			21046: "D6C6",
			26234: "D6C7",
			31209: "D6C8",
			31258: "D6C9",
			36136: "D6CA",
			28825: "D6CB",
			30164: "D6CC",
			28382: "D6CD",
			27835: "D6CE",
			31378: "D6CF",
			20013: "D6D0",
			30405: "D6D1",
			24544: "D6D2",
			38047: "D6D3",
			34935: "D6D4",
			32456: "D6D5",
			31181: "D6D6",
			32959: "D6D7",
			37325: "D6D8",
			20210: "D6D9",
			20247: "D6DA",
			33311: "D6DB",
			21608: "D6DC",
			24030: "D6DD",
			27954: "D6DE",
			35788: "D6DF",
			31909: "D6E0",
			36724: "D6E1",
			32920: "D6E2",
			24090: "D6E3",
			21650: "D6E4",
			30385: "D6E5",
			23449: "D6E6",
			26172: "D6E7",
			39588: "D6E8",
			29664: "D6E9",
			26666: "D6EA",
			34523: "D6EB",
			26417: "D6EC",
			29482: "D6ED",
			35832: "D6EE",
			35803: "D6EF",
			36880: "D6F0",
			31481: "D6F1",
			28891: "D6F2",
			29038: "D6F3",
			25284: "D6F4",
			30633: "D6F5",
			22065: "D6F6",
			20027: "D6F7",
			33879: "D6F8",
			26609: "D6F9",
			21161: "D6FA",
			34496: "D6FB",
			36142: "D6FC",
			38136: "D6FD",
			31569: "D6FE",
			20303: "D7A1",
			27880: "D7A2",
			31069: "D7A3",
			39547: "D7A4",
			25235: "D7A5",
			29226: "D7A6",
			25341: "D7A7",
			19987: "D7A8",
			30742: "D7A9",
			36716: "D7AA",
			25776: "D7AB",
			36186: "D7AC",
			31686: "D7AD",
			26729: "D7AE",
			24196: "D7AF",
			35013: "D7B0",
			22918: "D7B1",
			25758: "D7B2",
			22766: "D7B3",
			29366: "D7B4",
			26894: "D7B5",
			38181: "D7B6",
			36861: "D7B7",
			36184: "D7B8",
			22368: "D7B9",
			32512: "D7BA",
			35846: "D7BB",
			20934: "D7BC",
			25417: "D7BD",
			25305: "D7BE",
			21331: "D7BF",
			26700: "D7C0",
			29730: "D7C1",
			33537: "D7C2",
			37196: "D7C3",
			21828: "D7C4",
			30528: "D7C5",
			28796: "D7C6",
			27978: "D7C7",
			20857: "D7C8",
			21672: "D7C9",
			36164: "D7CA",
			23039: "D7CB",
			28363: "D7CC",
			28100: "D7CD",
			23388: "D7CE",
			32043: "D7CF",
			20180: "D7D0",
			31869: "D7D1",
			28371: "D7D2",
			23376: "D7D3",
			33258: "D7D4",
			28173: "D7D5",
			23383: "D7D6",
			39683: "D7D7",
			26837: "D7D8",
			36394: "D7D9",
			23447: "D7DA",
			32508: "D7DB",
			24635: "D7DC",
			32437: "D7DD",
			37049: "D7DE",
			36208: "D7DF",
			22863: "D7E0",
			25549: "D7E1",
			31199: "D7E2",
			36275: "D7E3",
			21330: "D7E4",
			26063: "D7E5",
			31062: "D7E6",
			35781: "D7E7",
			38459: "D7E8",
			32452: "D7E9",
			38075: "D7EA",
			32386: "D7EB",
			22068: "D7EC",
			37257: "D7ED",
			26368: "D7EE",
			32618: "D7EF",
			23562: "D7F0",
			36981: "D7F1",
			26152: "D7F2",
			24038: "D7F3",
			20304: "D7F4",
			26590: "D7F5",
			20570: "D7F6",
			20316: "D7F7",
			22352: "D7F8",
			24231: "D7F9",
			20109: "D8A1",
			19980: "D8A2",
			20800: "D8A3",
			19984: "D8A4",
			24319: "D8A5",
			21317: "D8A6",
			19989: "D8A7",
			20120: "D8A8",
			19998: "D8A9",
			39730: "D8AA",
			23404: "D8AB",
			22121: "D8AC",
			20008: "D8AD",
			31162: "D8AE",
			20031: "D8AF",
			21269: "D8B0",
			20039: "D8B1",
			22829: "D8B2",
			29243: "D8B3",
			21358: "D8B4",
			27664: "D8B5",
			22239: "D8B6",
			32996: "D8B7",
			39319: "D8B8",
			27603: "D8B9",
			30590: "D8BA",
			40727: "D8BB",
			20022: "D8BC",
			20127: "D8BD",
			40720: "D8BE",
			20060: "D8BF",
			20073: "D8C0",
			20115: "D8C1",
			33416: "D8C2",
			23387: "D8C3",
			21868: "D8C4",
			22031: "D8C5",
			20164: "D8C6",
			21389: "D8C7",
			21405: "D8C8",
			21411: "D8C9",
			21413: "D8CA",
			21422: "D8CB",
			38757: "D8CC",
			36189: "D8CD",
			21274: "D8CE",
			21493: "D8CF",
			21286: "D8D0",
			21294: "D8D1",
			21310: "D8D2",
			36188: "D8D3",
			21350: "D8D4",
			21347: "D8D5",
			20994: "D8D6",
			21e3: "D8D7",
			21006: "D8D8",
			21037: "D8D9",
			21043: "D8DA",
			21055: "D8DB",
			21056: "D8DC",
			21068: "D8DD",
			21086: "D8DE",
			21089: "D8DF",
			21084: "D8E0",
			33967: "D8E1",
			21117: "D8E2",
			21122: "D8E3",
			21121: "D8E4",
			21136: "D8E5",
			21139: "D8E6",
			20866: "D8E7",
			32596: "D8E8",
			20155: "D8E9",
			20163: "D8EA",
			20169: "D8EB",
			20162: "D8EC",
			20200: "D8ED",
			20193: "D8EE",
			20203: "D8EF",
			20190: "D8F0",
			20251: "D8F1",
			20211: "D8F2",
			20258: "D8F3",
			20324: "D8F4",
			20213: "D8F5",
			20261: "D8F6",
			20263: "D8F7",
			20233: "D8F8",
			20267: "D8F9",
			20318: "D8FA",
			20327: "D8FB",
			25912: "D8FC",
			20314: "D8FD",
			20317: "D8FE",
			20319: "D9A1",
			20311: "D9A2",
			20274: "D9A3",
			20285: "D9A4",
			20342: "D9A5",
			20340: "D9A6",
			20369: "D9A7",
			20361: "D9A8",
			20355: "D9A9",
			20367: "D9AA",
			20350: "D9AB",
			20347: "D9AC",
			20394: "D9AD",
			20348: "D9AE",
			20396: "D9AF",
			20372: "D9B0",
			20454: "D9B1",
			20456: "D9B2",
			20458: "D9B3",
			20421: "D9B4",
			20442: "D9B5",
			20451: "D9B6",
			20444: "D9B7",
			20433: "D9B8",
			20447: "D9B9",
			20472: "D9BA",
			20521: "D9BB",
			20556: "D9BC",
			20467: "D9BD",
			20524: "D9BE",
			20495: "D9BF",
			20526: "D9C0",
			20525: "D9C1",
			20478: "D9C2",
			20508: "D9C3",
			20492: "D9C4",
			20517: "D9C5",
			20520: "D9C6",
			20606: "D9C7",
			20547: "D9C8",
			20565: "D9C9",
			20552: "D9CA",
			20558: "D9CB",
			20588: "D9CC",
			20603: "D9CD",
			20645: "D9CE",
			20647: "D9CF",
			20649: "D9D0",
			20666: "D9D1",
			20694: "D9D2",
			20742: "D9D3",
			20717: "D9D4",
			20716: "D9D5",
			20710: "D9D6",
			20718: "D9D7",
			20743: "D9D8",
			20747: "D9D9",
			20189: "D9DA",
			27709: "D9DB",
			20312: "D9DC",
			20325: "D9DD",
			20430: "D9DE",
			40864: "D9DF",
			27718: "D9E0",
			31860: "D9E1",
			20846: "D9E2",
			24061: "D9E3",
			40649: "D9E4",
			39320: "D9E5",
			20865: "D9E6",
			22804: "D9E7",
			21241: "D9E8",
			21261: "D9E9",
			35335: "D9EA",
			21264: "D9EB",
			20971: "D9EC",
			22809: "D9ED",
			20821: "D9EE",
			20128: "D9EF",
			20822: "D9F0",
			20147: "D9F1",
			34926: "D9F2",
			34980: "D9F3",
			20149: "D9F4",
			33044: "D9F5",
			35026: "D9F6",
			31104: "D9F7",
			23348: "D9F8",
			34819: "D9F9",
			32696: "D9FA",
			20907: "D9FB",
			20913: "D9FC",
			20925: "D9FD",
			20924: "D9FE",
			20935: "DAA1",
			20886: "DAA2",
			20898: "DAA3",
			20901: "DAA4",
			35744: "DAA5",
			35750: "DAA6",
			35751: "DAA7",
			35754: "DAA8",
			35764: "DAA9",
			35765: "DAAA",
			35767: "DAAB",
			35778: "DAAC",
			35779: "DAAD",
			35787: "DAAE",
			35791: "DAAF",
			35790: "DAB0",
			35794: "DAB1",
			35795: "DAB2",
			35796: "DAB3",
			35798: "DAB4",
			35800: "DAB5",
			35801: "DAB6",
			35804: "DAB7",
			35807: "DAB8",
			35808: "DAB9",
			35812: "DABA",
			35816: "DABB",
			35817: "DABC",
			35822: "DABD",
			35824: "DABE",
			35827: "DABF",
			35830: "DAC0",
			35833: "DAC1",
			35836: "DAC2",
			35839: "DAC3",
			35840: "DAC4",
			35842: "DAC5",
			35844: "DAC6",
			35847: "DAC7",
			35852: "DAC8",
			35855: "DAC9",
			35857: "DACA",
			35858: "DACB",
			35860: "DACC",
			35861: "DACD",
			35862: "DACE",
			35865: "DACF",
			35867: "DAD0",
			35864: "DAD1",
			35869: "DAD2",
			35871: "DAD3",
			35872: "DAD4",
			35873: "DAD5",
			35877: "DAD6",
			35879: "DAD7",
			35882: "DAD8",
			35883: "DAD9",
			35886: "DADA",
			35887: "DADB",
			35890: "DADC",
			35891: "DADD",
			35893: "DADE",
			35894: "DADF",
			21353: "DAE0",
			21370: "DAE1",
			38429: "DAE2",
			38434: "DAE3",
			38433: "DAE4",
			38449: "DAE5",
			38442: "DAE6",
			38461: "DAE7",
			38460: "DAE8",
			38466: "DAE9",
			38473: "DAEA",
			38484: "DAEB",
			38495: "DAEC",
			38503: "DAED",
			38508: "DAEE",
			38514: "DAEF",
			38516: "DAF0",
			38536: "DAF1",
			38541: "DAF2",
			38551: "DAF3",
			38576: "DAF4",
			37015: "DAF5",
			37019: "DAF6",
			37021: "DAF7",
			37017: "DAF8",
			37036: "DAF9",
			37025: "DAFA",
			37044: "DAFB",
			37043: "DAFC",
			37046: "DAFD",
			37050: "DAFE",
			37048: "DBA1",
			37040: "DBA2",
			37071: "DBA3",
			37061: "DBA4",
			37054: "DBA5",
			37072: "DBA6",
			37060: "DBA7",
			37063: "DBA8",
			37075: "DBA9",
			37094: "DBAA",
			37090: "DBAB",
			37084: "DBAC",
			37079: "DBAD",
			37083: "DBAE",
			37099: "DBAF",
			37103: "DBB0",
			37118: "DBB1",
			37124: "DBB2",
			37154: "DBB3",
			37150: "DBB4",
			37155: "DBB5",
			37169: "DBB6",
			37167: "DBB7",
			37177: "DBB8",
			37187: "DBB9",
			37190: "DBBA",
			21005: "DBBB",
			22850: "DBBC",
			21154: "DBBD",
			21164: "DBBE",
			21165: "DBBF",
			21182: "DBC0",
			21759: "DBC1",
			21200: "DBC2",
			21206: "DBC3",
			21232: "DBC4",
			21471: "DBC5",
			29166: "DBC6",
			30669: "DBC7",
			24308: "DBC8",
			20981: "DBC9",
			20988: "DBCA",
			39727: "DBCB",
			21430: "DBCC",
			24321: "DBCD",
			30042: "DBCE",
			24047: "DBCF",
			22348: "DBD0",
			22441: "DBD1",
			22433: "DBD2",
			22654: "DBD3",
			22716: "DBD4",
			22725: "DBD5",
			22737: "DBD6",
			22313: "DBD7",
			22316: "DBD8",
			22314: "DBD9",
			22323: "DBDA",
			22329: "DBDB",
			22318: "DBDC",
			22319: "DBDD",
			22364: "DBDE",
			22331: "DBDF",
			22338: "DBE0",
			22377: "DBE1",
			22405: "DBE2",
			22379: "DBE3",
			22406: "DBE4",
			22396: "DBE5",
			22395: "DBE6",
			22376: "DBE7",
			22381: "DBE8",
			22390: "DBE9",
			22387: "DBEA",
			22445: "DBEB",
			22436: "DBEC",
			22412: "DBED",
			22450: "DBEE",
			22479: "DBEF",
			22439: "DBF0",
			22452: "DBF1",
			22419: "DBF2",
			22432: "DBF3",
			22485: "DBF4",
			22488: "DBF5",
			22490: "DBF6",
			22489: "DBF7",
			22482: "DBF8",
			22456: "DBF9",
			22516: "DBFA",
			22511: "DBFB",
			22520: "DBFC",
			22500: "DBFD",
			22493: "DBFE",
			22539: "DCA1",
			22541: "DCA2",
			22525: "DCA3",
			22509: "DCA4",
			22528: "DCA5",
			22558: "DCA6",
			22553: "DCA7",
			22596: "DCA8",
			22560: "DCA9",
			22629: "DCAA",
			22636: "DCAB",
			22657: "DCAC",
			22665: "DCAD",
			22682: "DCAE",
			22656: "DCAF",
			39336: "DCB0",
			40729: "DCB1",
			25087: "DCB2",
			33401: "DCB3",
			33405: "DCB4",
			33407: "DCB5",
			33423: "DCB6",
			33418: "DCB7",
			33448: "DCB8",
			33412: "DCB9",
			33422: "DCBA",
			33425: "DCBB",
			33431: "DCBC",
			33433: "DCBD",
			33451: "DCBE",
			33464: "DCBF",
			33470: "DCC0",
			33456: "DCC1",
			33480: "DCC2",
			33482: "DCC3",
			33507: "DCC4",
			33432: "DCC5",
			33463: "DCC6",
			33454: "DCC7",
			33483: "DCC8",
			33484: "DCC9",
			33473: "DCCA",
			33449: "DCCB",
			33460: "DCCC",
			33441: "DCCD",
			33450: "DCCE",
			33439: "DCCF",
			33476: "DCD0",
			33486: "DCD1",
			33444: "DCD2",
			33505: "DCD3",
			33545: "DCD4",
			33527: "DCD5",
			33508: "DCD6",
			33551: "DCD7",
			33543: "DCD8",
			33500: "DCD9",
			33524: "DCDA",
			33490: "DCDB",
			33496: "DCDC",
			33548: "DCDD",
			33531: "DCDE",
			33491: "DCDF",
			33553: "DCE0",
			33562: "DCE1",
			33542: "DCE2",
			33556: "DCE3",
			33557: "DCE4",
			33504: "DCE5",
			33493: "DCE6",
			33564: "DCE7",
			33617: "DCE8",
			33627: "DCE9",
			33628: "DCEA",
			33544: "DCEB",
			33682: "DCEC",
			33596: "DCED",
			33588: "DCEE",
			33585: "DCEF",
			33691: "DCF0",
			33630: "DCF1",
			33583: "DCF2",
			33615: "DCF3",
			33607: "DCF4",
			33603: "DCF5",
			33631: "DCF6",
			33600: "DCF7",
			33559: "DCF8",
			33632: "DCF9",
			33581: "DCFA",
			33594: "DCFB",
			33587: "DCFC",
			33638: "DCFD",
			33637: "DCFE",
			33640: "DDA1",
			33563: "DDA2",
			33641: "DDA3",
			33644: "DDA4",
			33642: "DDA5",
			33645: "DDA6",
			33646: "DDA7",
			33712: "DDA8",
			33656: "DDA9",
			33715: "DDAA",
			33716: "DDAB",
			33696: "DDAC",
			33706: "DDAD",
			33683: "DDAE",
			33692: "DDAF",
			33669: "DDB0",
			33660: "DDB1",
			33718: "DDB2",
			33705: "DDB3",
			33661: "DDB4",
			33720: "DDB5",
			33659: "DDB6",
			33688: "DDB7",
			33694: "DDB8",
			33704: "DDB9",
			33722: "DDBA",
			33724: "DDBB",
			33729: "DDBC",
			33793: "DDBD",
			33765: "DDBE",
			33752: "DDBF",
			22535: "DDC0",
			33816: "DDC1",
			33803: "DDC2",
			33757: "DDC3",
			33789: "DDC4",
			33750: "DDC5",
			33820: "DDC6",
			33848: "DDC7",
			33809: "DDC8",
			33798: "DDC9",
			33748: "DDCA",
			33759: "DDCB",
			33807: "DDCC",
			33795: "DDCD",
			33784: "DDCE",
			33785: "DDCF",
			33770: "DDD0",
			33733: "DDD1",
			33728: "DDD2",
			33830: "DDD3",
			33776: "DDD4",
			33761: "DDD5",
			33884: "DDD6",
			33873: "DDD7",
			33882: "DDD8",
			33881: "DDD9",
			33907: "DDDA",
			33927: "DDDB",
			33928: "DDDC",
			33914: "DDDD",
			33929: "DDDE",
			33912: "DDDF",
			33852: "DDE0",
			33862: "DDE1",
			33897: "DDE2",
			33910: "DDE3",
			33932: "DDE4",
			33934: "DDE5",
			33841: "DDE6",
			33901: "DDE7",
			33985: "DDE8",
			33997: "DDE9",
			34e3: "DDEA",
			34022: "DDEB",
			33981: "DDEC",
			34003: "DDED",
			33994: "DDEE",
			33983: "DDEF",
			33978: "DDF0",
			34016: "DDF1",
			33953: "DDF2",
			33977: "DDF3",
			33972: "DDF4",
			33943: "DDF5",
			34021: "DDF6",
			34019: "DDF7",
			34060: "DDF8",
			29965: "DDF9",
			34104: "DDFA",
			34032: "DDFB",
			34105: "DDFC",
			34079: "DDFD",
			34106: "DDFE",
			34134: "DEA1",
			34107: "DEA2",
			34047: "DEA3",
			34044: "DEA4",
			34137: "DEA5",
			34120: "DEA6",
			34152: "DEA7",
			34148: "DEA8",
			34142: "DEA9",
			34170: "DEAA",
			30626: "DEAB",
			34115: "DEAC",
			34162: "DEAD",
			34171: "DEAE",
			34212: "DEAF",
			34216: "DEB0",
			34183: "DEB1",
			34191: "DEB2",
			34169: "DEB3",
			34222: "DEB4",
			34204: "DEB5",
			34181: "DEB6",
			34233: "DEB7",
			34231: "DEB8",
			34224: "DEB9",
			34259: "DEBA",
			34241: "DEBB",
			34268: "DEBC",
			34303: "DEBD",
			34343: "DEBE",
			34309: "DEBF",
			34345: "DEC0",
			34326: "DEC1",
			34364: "DEC2",
			24318: "DEC3",
			24328: "DEC4",
			22844: "DEC5",
			22849: "DEC6",
			32823: "DEC7",
			22869: "DEC8",
			22874: "DEC9",
			22872: "DECA",
			21263: "DECB",
			23586: "DECC",
			23589: "DECD",
			23596: "DECE",
			23604: "DECF",
			25164: "DED0",
			25194: "DED1",
			25247: "DED2",
			25275: "DED3",
			25290: "DED4",
			25306: "DED5",
			25303: "DED6",
			25326: "DED7",
			25378: "DED8",
			25334: "DED9",
			25401: "DEDA",
			25419: "DEDB",
			25411: "DEDC",
			25517: "DEDD",
			25590: "DEDE",
			25457: "DEDF",
			25466: "DEE0",
			25486: "DEE1",
			25524: "DEE2",
			25453: "DEE3",
			25516: "DEE4",
			25482: "DEE5",
			25449: "DEE6",
			25518: "DEE7",
			25532: "DEE8",
			25586: "DEE9",
			25592: "DEEA",
			25568: "DEEB",
			25599: "DEEC",
			25540: "DEED",
			25566: "DEEE",
			25550: "DEEF",
			25682: "DEF0",
			25542: "DEF1",
			25534: "DEF2",
			25669: "DEF3",
			25665: "DEF4",
			25611: "DEF5",
			25627: "DEF6",
			25632: "DEF7",
			25612: "DEF8",
			25638: "DEF9",
			25633: "DEFA",
			25694: "DEFB",
			25732: "DEFC",
			25709: "DEFD",
			25750: "DEFE",
			25722: "DFA1",
			25783: "DFA2",
			25784: "DFA3",
			25753: "DFA4",
			25786: "DFA5",
			25792: "DFA6",
			25808: "DFA7",
			25815: "DFA8",
			25828: "DFA9",
			25826: "DFAA",
			25865: "DFAB",
			25893: "DFAC",
			25902: "DFAD",
			24331: "DFAE",
			24530: "DFAF",
			29977: "DFB0",
			24337: "DFB1",
			21343: "DFB2",
			21489: "DFB3",
			21501: "DFB4",
			21481: "DFB5",
			21480: "DFB6",
			21499: "DFB7",
			21522: "DFB8",
			21526: "DFB9",
			21510: "DFBA",
			21579: "DFBB",
			21586: "DFBC",
			21587: "DFBD",
			21588: "DFBE",
			21590: "DFBF",
			21571: "DFC0",
			21537: "DFC1",
			21591: "DFC2",
			21593: "DFC3",
			21539: "DFC4",
			21554: "DFC5",
			21634: "DFC6",
			21652: "DFC7",
			21623: "DFC8",
			21617: "DFC9",
			21604: "DFCA",
			21658: "DFCB",
			21659: "DFCC",
			21636: "DFCD",
			21622: "DFCE",
			21606: "DFCF",
			21661: "DFD0",
			21712: "DFD1",
			21677: "DFD2",
			21698: "DFD3",
			21684: "DFD4",
			21714: "DFD5",
			21671: "DFD6",
			21670: "DFD7",
			21715: "DFD8",
			21716: "DFD9",
			21618: "DFDA",
			21667: "DFDB",
			21717: "DFDC",
			21691: "DFDD",
			21695: "DFDE",
			21708: "DFDF",
			21721: "DFE0",
			21722: "DFE1",
			21724: "DFE2",
			21673: "DFE3",
			21674: "DFE4",
			21668: "DFE5",
			21725: "DFE6",
			21711: "DFE7",
			21726: "DFE8",
			21787: "DFE9",
			21735: "DFEA",
			21792: "DFEB",
			21757: "DFEC",
			21780: "DFED",
			21747: "DFEE",
			21794: "DFEF",
			21795: "DFF0",
			21775: "DFF1",
			21777: "DFF2",
			21799: "DFF3",
			21802: "DFF4",
			21863: "DFF5",
			21903: "DFF6",
			21941: "DFF7",
			21833: "DFF8",
			21869: "DFF9",
			21825: "DFFA",
			21845: "DFFB",
			21823: "DFFC",
			21840: "DFFD",
			21820: "DFFE",
			21815: "E0A1",
			21846: "E0A2",
			21877: "E0A3",
			21878: "E0A4",
			21879: "E0A5",
			21811: "E0A6",
			21808: "E0A7",
			21852: "E0A8",
			21899: "E0A9",
			21970: "E0AA",
			21891: "E0AB",
			21937: "E0AC",
			21945: "E0AD",
			21896: "E0AE",
			21889: "E0AF",
			21919: "E0B0",
			21886: "E0B1",
			21974: "E0B2",
			21905: "E0B3",
			21883: "E0B4",
			21983: "E0B5",
			21949: "E0B6",
			21950: "E0B7",
			21908: "E0B8",
			21913: "E0B9",
			21994: "E0BA",
			22007: "E0BB",
			21961: "E0BC",
			22047: "E0BD",
			21969: "E0BE",
			21995: "E0BF",
			21996: "E0C0",
			21972: "E0C1",
			21990: "E0C2",
			21981: "E0C3",
			21956: "E0C4",
			21999: "E0C5",
			21989: "E0C6",
			22002: "E0C7",
			22003: "E0C8",
			21964: "E0C9",
			21965: "E0CA",
			21992: "E0CB",
			22005: "E0CC",
			21988: "E0CD",
			36756: "E0CE",
			22046: "E0CF",
			22024: "E0D0",
			22028: "E0D1",
			22017: "E0D2",
			22052: "E0D3",
			22051: "E0D4",
			22014: "E0D5",
			22016: "E0D6",
			22055: "E0D7",
			22061: "E0D8",
			22104: "E0D9",
			22073: "E0DA",
			22103: "E0DB",
			22060: "E0DC",
			22093: "E0DD",
			22114: "E0DE",
			22105: "E0DF",
			22108: "E0E0",
			22092: "E0E1",
			22100: "E0E2",
			22150: "E0E3",
			22116: "E0E4",
			22129: "E0E5",
			22123: "E0E6",
			22139: "E0E7",
			22140: "E0E8",
			22149: "E0E9",
			22163: "E0EA",
			22191: "E0EB",
			22228: "E0EC",
			22231: "E0ED",
			22237: "E0EE",
			22241: "E0EF",
			22261: "E0F0",
			22251: "E0F1",
			22265: "E0F2",
			22271: "E0F3",
			22276: "E0F4",
			22282: "E0F5",
			22281: "E0F6",
			22300: "E0F7",
			24079: "E0F8",
			24089: "E0F9",
			24084: "E0FA",
			24081: "E0FB",
			24113: "E0FC",
			24123: "E0FD",
			24124: "E0FE",
			24119: "E1A1",
			24132: "E1A2",
			24148: "E1A3",
			24155: "E1A4",
			24158: "E1A5",
			24161: "E1A6",
			23692: "E1A7",
			23674: "E1A8",
			23693: "E1A9",
			23696: "E1AA",
			23702: "E1AB",
			23688: "E1AC",
			23704: "E1AD",
			23705: "E1AE",
			23697: "E1AF",
			23706: "E1B0",
			23708: "E1B1",
			23733: "E1B2",
			23714: "E1B3",
			23741: "E1B4",
			23724: "E1B5",
			23723: "E1B6",
			23729: "E1B7",
			23715: "E1B8",
			23745: "E1B9",
			23735: "E1BA",
			23748: "E1BB",
			23762: "E1BC",
			23780: "E1BD",
			23755: "E1BE",
			23781: "E1BF",
			23810: "E1C0",
			23811: "E1C1",
			23847: "E1C2",
			23846: "E1C3",
			23854: "E1C4",
			23844: "E1C5",
			23838: "E1C6",
			23814: "E1C7",
			23835: "E1C8",
			23896: "E1C9",
			23870: "E1CA",
			23860: "E1CB",
			23869: "E1CC",
			23916: "E1CD",
			23899: "E1CE",
			23919: "E1CF",
			23901: "E1D0",
			23915: "E1D1",
			23883: "E1D2",
			23882: "E1D3",
			23913: "E1D4",
			23924: "E1D5",
			23938: "E1D6",
			23961: "E1D7",
			23965: "E1D8",
			35955: "E1D9",
			23991: "E1DA",
			24005: "E1DB",
			24435: "E1DC",
			24439: "E1DD",
			24450: "E1DE",
			24455: "E1DF",
			24457: "E1E0",
			24460: "E1E1",
			24469: "E1E2",
			24473: "E1E3",
			24476: "E1E4",
			24488: "E1E5",
			24493: "E1E6",
			24501: "E1E7",
			24508: "E1E8",
			34914: "E1E9",
			24417: "E1EA",
			29357: "E1EB",
			29360: "E1EC",
			29364: "E1ED",
			29367: "E1EE",
			29368: "E1EF",
			29379: "E1F0",
			29377: "E1F1",
			29390: "E1F2",
			29389: "E1F3",
			29394: "E1F4",
			29416: "E1F5",
			29423: "E1F6",
			29417: "E1F7",
			29426: "E1F8",
			29428: "E1F9",
			29431: "E1FA",
			29441: "E1FB",
			29427: "E1FC",
			29443: "E1FD",
			29434: "E1FE",
			29435: "E2A1",
			29463: "E2A2",
			29459: "E2A3",
			29473: "E2A4",
			29450: "E2A5",
			29470: "E2A6",
			29469: "E2A7",
			29461: "E2A8",
			29474: "E2A9",
			29497: "E2AA",
			29477: "E2AB",
			29484: "E2AC",
			29496: "E2AD",
			29489: "E2AE",
			29520: "E2AF",
			29517: "E2B0",
			29527: "E2B1",
			29536: "E2B2",
			29548: "E2B3",
			29551: "E2B4",
			29566: "E2B5",
			33307: "E2B6",
			22821: "E2B7",
			39143: "E2B8",
			22820: "E2B9",
			22786: "E2BA",
			39267: "E2BB",
			39271: "E2BC",
			39272: "E2BD",
			39273: "E2BE",
			39274: "E2BF",
			39275: "E2C0",
			39276: "E2C1",
			39284: "E2C2",
			39287: "E2C3",
			39293: "E2C4",
			39296: "E2C5",
			39300: "E2C6",
			39303: "E2C7",
			39306: "E2C8",
			39309: "E2C9",
			39312: "E2CA",
			39313: "E2CB",
			39315: "E2CC",
			39316: "E2CD",
			39317: "E2CE",
			24192: "E2CF",
			24209: "E2D0",
			24203: "E2D1",
			24214: "E2D2",
			24229: "E2D3",
			24224: "E2D4",
			24249: "E2D5",
			24245: "E2D6",
			24254: "E2D7",
			24243: "E2D8",
			36179: "E2D9",
			24274: "E2DA",
			24273: "E2DB",
			24283: "E2DC",
			24296: "E2DD",
			24298: "E2DE",
			33210: "E2DF",
			24516: "E2E0",
			24521: "E2E1",
			24534: "E2E2",
			24527: "E2E3",
			24579: "E2E4",
			24558: "E2E5",
			24580: "E2E6",
			24545: "E2E7",
			24548: "E2E8",
			24574: "E2E9",
			24581: "E2EA",
			24582: "E2EB",
			24554: "E2EC",
			24557: "E2ED",
			24568: "E2EE",
			24601: "E2EF",
			24629: "E2F0",
			24614: "E2F1",
			24603: "E2F2",
			24591: "E2F3",
			24589: "E2F4",
			24617: "E2F5",
			24619: "E2F6",
			24586: "E2F7",
			24639: "E2F8",
			24609: "E2F9",
			24696: "E2FA",
			24697: "E2FB",
			24699: "E2FC",
			24698: "E2FD",
			24642: "E2FE",
			24682: "E3A1",
			24701: "E3A2",
			24726: "E3A3",
			24730: "E3A4",
			24749: "E3A5",
			24733: "E3A6",
			24707: "E3A7",
			24722: "E3A8",
			24716: "E3A9",
			24731: "E3AA",
			24812: "E3AB",
			24763: "E3AC",
			24753: "E3AD",
			24797: "E3AE",
			24792: "E3AF",
			24774: "E3B0",
			24794: "E3B1",
			24756: "E3B2",
			24864: "E3B3",
			24870: "E3B4",
			24853: "E3B5",
			24867: "E3B6",
			24820: "E3B7",
			24832: "E3B8",
			24846: "E3B9",
			24875: "E3BA",
			24906: "E3BB",
			24949: "E3BC",
			25004: "E3BD",
			24980: "E3BE",
			24999: "E3BF",
			25015: "E3C0",
			25044: "E3C1",
			25077: "E3C2",
			24541: "E3C3",
			38579: "E3C4",
			38377: "E3C5",
			38379: "E3C6",
			38385: "E3C7",
			38387: "E3C8",
			38389: "E3C9",
			38390: "E3CA",
			38396: "E3CB",
			38398: "E3CC",
			38403: "E3CD",
			38404: "E3CE",
			38406: "E3CF",
			38408: "E3D0",
			38410: "E3D1",
			38411: "E3D2",
			38412: "E3D3",
			38413: "E3D4",
			38415: "E3D5",
			38418: "E3D6",
			38421: "E3D7",
			38422: "E3D8",
			38423: "E3D9",
			38425: "E3DA",
			38426: "E3DB",
			20012: "E3DC",
			29247: "E3DD",
			25109: "E3DE",
			27701: "E3DF",
			27732: "E3E0",
			27740: "E3E1",
			27722: "E3E2",
			27811: "E3E3",
			27781: "E3E4",
			27792: "E3E5",
			27796: "E3E6",
			27788: "E3E7",
			27752: "E3E8",
			27753: "E3E9",
			27764: "E3EA",
			27766: "E3EB",
			27782: "E3EC",
			27817: "E3ED",
			27856: "E3EE",
			27860: "E3EF",
			27821: "E3F0",
			27895: "E3F1",
			27896: "E3F2",
			27889: "E3F3",
			27863: "E3F4",
			27826: "E3F5",
			27872: "E3F6",
			27862: "E3F7",
			27898: "E3F8",
			27883: "E3F9",
			27886: "E3FA",
			27825: "E3FB",
			27859: "E3FC",
			27887: "E3FD",
			27902: "E3FE",
			27961: "E4A1",
			27943: "E4A2",
			27916: "E4A3",
			27971: "E4A4",
			27976: "E4A5",
			27911: "E4A6",
			27908: "E4A7",
			27929: "E4A8",
			27918: "E4A9",
			27947: "E4AA",
			27981: "E4AB",
			27950: "E4AC",
			27957: "E4AD",
			27930: "E4AE",
			27983: "E4AF",
			27986: "E4B0",
			27988: "E4B1",
			27955: "E4B2",
			28049: "E4B3",
			28015: "E4B4",
			28062: "E4B5",
			28064: "E4B6",
			27998: "E4B7",
			28051: "E4B8",
			28052: "E4B9",
			27996: "E4BA",
			28e3: "E4BB",
			28028: "E4BC",
			28003: "E4BD",
			28186: "E4BE",
			28103: "E4BF",
			28101: "E4C0",
			28126: "E4C1",
			28174: "E4C2",
			28095: "E4C3",
			28128: "E4C4",
			28177: "E4C5",
			28134: "E4C6",
			28125: "E4C7",
			28121: "E4C8",
			28182: "E4C9",
			28075: "E4CA",
			28172: "E4CB",
			28078: "E4CC",
			28203: "E4CD",
			28270: "E4CE",
			28238: "E4CF",
			28267: "E4D0",
			28338: "E4D1",
			28255: "E4D2",
			28294: "E4D3",
			28243: "E4D4",
			28244: "E4D5",
			28210: "E4D6",
			28197: "E4D7",
			28228: "E4D8",
			28383: "E4D9",
			28337: "E4DA",
			28312: "E4DB",
			28384: "E4DC",
			28461: "E4DD",
			28386: "E4DE",
			28325: "E4DF",
			28327: "E4E0",
			28349: "E4E1",
			28347: "E4E2",
			28343: "E4E3",
			28375: "E4E4",
			28340: "E4E5",
			28367: "E4E6",
			28303: "E4E7",
			28354: "E4E8",
			28319: "E4E9",
			28514: "E4EA",
			28486: "E4EB",
			28487: "E4EC",
			28452: "E4ED",
			28437: "E4EE",
			28409: "E4EF",
			28463: "E4F0",
			28470: "E4F1",
			28491: "E4F2",
			28532: "E4F3",
			28458: "E4F4",
			28425: "E4F5",
			28457: "E4F6",
			28553: "E4F7",
			28557: "E4F8",
			28556: "E4F9",
			28536: "E4FA",
			28530: "E4FB",
			28540: "E4FC",
			28538: "E4FD",
			28625: "E4FE",
			28617: "E5A1",
			28583: "E5A2",
			28601: "E5A3",
			28598: "E5A4",
			28610: "E5A5",
			28641: "E5A6",
			28654: "E5A7",
			28638: "E5A8",
			28640: "E5A9",
			28655: "E5AA",
			28698: "E5AB",
			28707: "E5AC",
			28699: "E5AD",
			28729: "E5AE",
			28725: "E5AF",
			28751: "E5B0",
			28766: "E5B1",
			23424: "E5B2",
			23428: "E5B3",
			23445: "E5B4",
			23443: "E5B5",
			23461: "E5B6",
			23480: "E5B7",
			29999: "E5B8",
			39582: "E5B9",
			25652: "E5BA",
			23524: "E5BB",
			23534: "E5BC",
			35120: "E5BD",
			23536: "E5BE",
			36423: "E5BF",
			35591: "E5C0",
			36790: "E5C1",
			36819: "E5C2",
			36821: "E5C3",
			36837: "E5C4",
			36846: "E5C5",
			36836: "E5C6",
			36841: "E5C7",
			36838: "E5C8",
			36851: "E5C9",
			36840: "E5CA",
			36869: "E5CB",
			36868: "E5CC",
			36875: "E5CD",
			36902: "E5CE",
			36881: "E5CF",
			36877: "E5D0",
			36886: "E5D1",
			36897: "E5D2",
			36917: "E5D3",
			36918: "E5D4",
			36909: "E5D5",
			36911: "E5D6",
			36932: "E5D7",
			36945: "E5D8",
			36946: "E5D9",
			36944: "E5DA",
			36968: "E5DB",
			36952: "E5DC",
			36962: "E5DD",
			36955: "E5DE",
			26297: "E5DF",
			36980: "E5E0",
			36989: "E5E1",
			36994: "E5E2",
			37e3: "E5E3",
			36995: "E5E4",
			37003: "E5E5",
			24400: "E5E6",
			24407: "E5E7",
			24406: "E5E8",
			24408: "E5E9",
			23611: "E5EA",
			21675: "E5EB",
			23632: "E5EC",
			23641: "E5ED",
			23409: "E5EE",
			23651: "E5EF",
			23654: "E5F0",
			32700: "E5F1",
			24362: "E5F2",
			24361: "E5F3",
			24365: "E5F4",
			33396: "E5F5",
			24380: "E5F6",
			39739: "E5F7",
			23662: "E5F8",
			22913: "E5F9",
			22915: "E5FA",
			22925: "E5FB",
			22953: "E5FC",
			22954: "E5FD",
			22947: "E5FE",
			22935: "E6A1",
			22986: "E6A2",
			22955: "E6A3",
			22942: "E6A4",
			22948: "E6A5",
			22994: "E6A6",
			22962: "E6A7",
			22959: "E6A8",
			22999: "E6A9",
			22974: "E6AA",
			23045: "E6AB",
			23046: "E6AC",
			23005: "E6AD",
			23048: "E6AE",
			23011: "E6AF",
			23e3: "E6B0",
			23033: "E6B1",
			23052: "E6B2",
			23049: "E6B3",
			23090: "E6B4",
			23092: "E6B5",
			23057: "E6B6",
			23075: "E6B7",
			23059: "E6B8",
			23104: "E6B9",
			23143: "E6BA",
			23114: "E6BB",
			23125: "E6BC",
			23100: "E6BD",
			23138: "E6BE",
			23157: "E6BF",
			33004: "E6C0",
			23210: "E6C1",
			23195: "E6C2",
			23159: "E6C3",
			23162: "E6C4",
			23230: "E6C5",
			23275: "E6C6",
			23218: "E6C7",
			23250: "E6C8",
			23252: "E6C9",
			23224: "E6CA",
			23264: "E6CB",
			23267: "E6CC",
			23281: "E6CD",
			23254: "E6CE",
			23270: "E6CF",
			23256: "E6D0",
			23260: "E6D1",
			23305: "E6D2",
			23319: "E6D3",
			23318: "E6D4",
			23346: "E6D5",
			23351: "E6D6",
			23360: "E6D7",
			23573: "E6D8",
			23580: "E6D9",
			23386: "E6DA",
			23397: "E6DB",
			23411: "E6DC",
			23377: "E6DD",
			23379: "E6DE",
			23394: "E6DF",
			39541: "E6E0",
			39543: "E6E1",
			39544: "E6E2",
			39546: "E6E3",
			39551: "E6E4",
			39549: "E6E5",
			39552: "E6E6",
			39553: "E6E7",
			39557: "E6E8",
			39560: "E6E9",
			39562: "E6EA",
			39568: "E6EB",
			39570: "E6EC",
			39571: "E6ED",
			39574: "E6EE",
			39576: "E6EF",
			39579: "E6F0",
			39580: "E6F1",
			39581: "E6F2",
			39583: "E6F3",
			39584: "E6F4",
			39586: "E6F5",
			39587: "E6F6",
			39589: "E6F7",
			39591: "E6F8",
			32415: "E6F9",
			32417: "E6FA",
			32419: "E6FB",
			32421: "E6FC",
			32424: "E6FD",
			32425: "E6FE",
			32429: "E7A1",
			32432: "E7A2",
			32446: "E7A3",
			32448: "E7A4",
			32449: "E7A5",
			32450: "E7A6",
			32457: "E7A7",
			32459: "E7A8",
			32460: "E7A9",
			32464: "E7AA",
			32468: "E7AB",
			32471: "E7AC",
			32475: "E7AD",
			32480: "E7AE",
			32481: "E7AF",
			32488: "E7B0",
			32491: "E7B1",
			32494: "E7B2",
			32495: "E7B3",
			32497: "E7B4",
			32498: "E7B5",
			32525: "E7B6",
			32502: "E7B7",
			32506: "E7B8",
			32507: "E7B9",
			32510: "E7BA",
			32513: "E7BB",
			32514: "E7BC",
			32515: "E7BD",
			32519: "E7BE",
			32520: "E7BF",
			32523: "E7C0",
			32524: "E7C1",
			32527: "E7C2",
			32529: "E7C3",
			32530: "E7C4",
			32535: "E7C5",
			32537: "E7C6",
			32540: "E7C7",
			32539: "E7C8",
			32543: "E7C9",
			32545: "E7CA",
			32546: "E7CB",
			32547: "E7CC",
			32548: "E7CD",
			32549: "E7CE",
			32550: "E7CF",
			32551: "E7D0",
			32554: "E7D1",
			32555: "E7D2",
			32556: "E7D3",
			32557: "E7D4",
			32559: "E7D5",
			32560: "E7D6",
			32561: "E7D7",
			32562: "E7D8",
			32563: "E7D9",
			32565: "E7DA",
			24186: "E7DB",
			30079: "E7DC",
			24027: "E7DD",
			30014: "E7DE",
			37013: "E7DF",
			29582: "E7E0",
			29585: "E7E1",
			29614: "E7E2",
			29602: "E7E3",
			29599: "E7E4",
			29647: "E7E5",
			29634: "E7E6",
			29649: "E7E7",
			29623: "E7E8",
			29619: "E7E9",
			29632: "E7EA",
			29641: "E7EB",
			29640: "E7EC",
			29669: "E7ED",
			29657: "E7EE",
			39036: "E7EF",
			29706: "E7F0",
			29673: "E7F1",
			29671: "E7F2",
			29662: "E7F3",
			29626: "E7F4",
			29682: "E7F5",
			29711: "E7F6",
			29738: "E7F7",
			29787: "E7F8",
			29734: "E7F9",
			29733: "E7FA",
			29736: "E7FB",
			29744: "E7FC",
			29742: "E7FD",
			29740: "E7FE",
			29723: "E8A1",
			29722: "E8A2",
			29761: "E8A3",
			29788: "E8A4",
			29783: "E8A5",
			29781: "E8A6",
			29785: "E8A7",
			29815: "E8A8",
			29805: "E8A9",
			29822: "E8AA",
			29852: "E8AB",
			29838: "E8AC",
			29824: "E8AD",
			29825: "E8AE",
			29831: "E8AF",
			29835: "E8B0",
			29854: "E8B1",
			29864: "E8B2",
			29865: "E8B3",
			29840: "E8B4",
			29863: "E8B5",
			29906: "E8B6",
			29882: "E8B7",
			38890: "E8B8",
			38891: "E8B9",
			38892: "E8BA",
			26444: "E8BB",
			26451: "E8BC",
			26462: "E8BD",
			26440: "E8BE",
			26473: "E8BF",
			26533: "E8C0",
			26503: "E8C1",
			26474: "E8C2",
			26483: "E8C3",
			26520: "E8C4",
			26535: "E8C5",
			26485: "E8C6",
			26536: "E8C7",
			26526: "E8C8",
			26541: "E8C9",
			26507: "E8CA",
			26487: "E8CB",
			26492: "E8CC",
			26608: "E8CD",
			26633: "E8CE",
			26584: "E8CF",
			26634: "E8D0",
			26601: "E8D1",
			26544: "E8D2",
			26636: "E8D3",
			26585: "E8D4",
			26549: "E8D5",
			26586: "E8D6",
			26547: "E8D7",
			26589: "E8D8",
			26624: "E8D9",
			26563: "E8DA",
			26552: "E8DB",
			26594: "E8DC",
			26638: "E8DD",
			26561: "E8DE",
			26621: "E8DF",
			26674: "E8E0",
			26675: "E8E1",
			26720: "E8E2",
			26721: "E8E3",
			26702: "E8E4",
			26722: "E8E5",
			26692: "E8E6",
			26724: "E8E7",
			26755: "E8E8",
			26653: "E8E9",
			26709: "E8EA",
			26726: "E8EB",
			26689: "E8EC",
			26727: "E8ED",
			26688: "E8EE",
			26686: "E8EF",
			26698: "E8F0",
			26697: "E8F1",
			26665: "E8F2",
			26805: "E8F3",
			26767: "E8F4",
			26740: "E8F5",
			26743: "E8F6",
			26771: "E8F7",
			26731: "E8F8",
			26818: "E8F9",
			26990: "E8FA",
			26876: "E8FB",
			26911: "E8FC",
			26912: "E8FD",
			26873: "E8FE",
			26916: "E9A1",
			26864: "E9A2",
			26891: "E9A3",
			26881: "E9A4",
			26967: "E9A5",
			26851: "E9A6",
			26896: "E9A7",
			26993: "E9A8",
			26937: "E9A9",
			26976: "E9AA",
			26946: "E9AB",
			26973: "E9AC",
			27012: "E9AD",
			26987: "E9AE",
			27008: "E9AF",
			27032: "E9B0",
			27e3: "E9B1",
			26932: "E9B2",
			27084: "E9B3",
			27015: "E9B4",
			27016: "E9B5",
			27086: "E9B6",
			27017: "E9B7",
			26982: "E9B8",
			26979: "E9B9",
			27001: "E9BA",
			27035: "E9BB",
			27047: "E9BC",
			27067: "E9BD",
			27051: "E9BE",
			27053: "E9BF",
			27092: "E9C0",
			27057: "E9C1",
			27073: "E9C2",
			27082: "E9C3",
			27103: "E9C4",
			27029: "E9C5",
			27104: "E9C6",
			27021: "E9C7",
			27135: "E9C8",
			27183: "E9C9",
			27117: "E9CA",
			27159: "E9CB",
			27160: "E9CC",
			27237: "E9CD",
			27122: "E9CE",
			27204: "E9CF",
			27198: "E9D0",
			27296: "E9D1",
			27216: "E9D2",
			27227: "E9D3",
			27189: "E9D4",
			27278: "E9D5",
			27257: "E9D6",
			27197: "E9D7",
			27176: "E9D8",
			27224: "E9D9",
			27260: "E9DA",
			27281: "E9DB",
			27280: "E9DC",
			27305: "E9DD",
			27287: "E9DE",
			27307: "E9DF",
			29495: "E9E0",
			29522: "E9E1",
			27521: "E9E2",
			27522: "E9E3",
			27527: "E9E4",
			27524: "E9E5",
			27538: "E9E6",
			27539: "E9E7",
			27533: "E9E8",
			27546: "E9E9",
			27547: "E9EA",
			27553: "E9EB",
			27562: "E9EC",
			36715: "E9ED",
			36717: "E9EE",
			36721: "E9EF",
			36722: "E9F0",
			36723: "E9F1",
			36725: "E9F2",
			36726: "E9F3",
			36728: "E9F4",
			36727: "E9F5",
			36729: "E9F6",
			36730: "E9F7",
			36732: "E9F8",
			36734: "E9F9",
			36737: "E9FA",
			36738: "E9FB",
			36740: "E9FC",
			36743: "E9FD",
			36747: "E9FE",
			36749: "EAA1",
			36750: "EAA2",
			36751: "EAA3",
			36760: "EAA4",
			36762: "EAA5",
			36558: "EAA6",
			25099: "EAA7",
			25111: "EAA8",
			25115: "EAA9",
			25119: "EAAA",
			25122: "EAAB",
			25121: "EAAC",
			25125: "EAAD",
			25124: "EAAE",
			25132: "EAAF",
			33255: "EAB0",
			29935: "EAB1",
			29940: "EAB2",
			29951: "EAB3",
			29967: "EAB4",
			29969: "EAB5",
			29971: "EAB6",
			25908: "EAB7",
			26094: "EAB8",
			26095: "EAB9",
			26096: "EABA",
			26122: "EABB",
			26137: "EABC",
			26482: "EABD",
			26115: "EABE",
			26133: "EABF",
			26112: "EAC0",
			28805: "EAC1",
			26359: "EAC2",
			26141: "EAC3",
			26164: "EAC4",
			26161: "EAC5",
			26166: "EAC6",
			26165: "EAC7",
			32774: "EAC8",
			26207: "EAC9",
			26196: "EACA",
			26177: "EACB",
			26191: "EACC",
			26198: "EACD",
			26209: "EACE",
			26199: "EACF",
			26231: "EAD0",
			26244: "EAD1",
			26252: "EAD2",
			26279: "EAD3",
			26269: "EAD4",
			26302: "EAD5",
			26331: "EAD6",
			26332: "EAD7",
			26342: "EAD8",
			26345: "EAD9",
			36146: "EADA",
			36147: "EADB",
			36150: "EADC",
			36155: "EADD",
			36157: "EADE",
			36160: "EADF",
			36165: "EAE0",
			36166: "EAE1",
			36168: "EAE2",
			36169: "EAE3",
			36167: "EAE4",
			36173: "EAE5",
			36181: "EAE6",
			36185: "EAE7",
			35271: "EAE8",
			35274: "EAE9",
			35275: "EAEA",
			35276: "EAEB",
			35278: "EAEC",
			35279: "EAED",
			35280: "EAEE",
			35281: "EAEF",
			29294: "EAF0",
			29343: "EAF1",
			29277: "EAF2",
			29286: "EAF3",
			29295: "EAF4",
			29310: "EAF5",
			29311: "EAF6",
			29316: "EAF7",
			29323: "EAF8",
			29325: "EAF9",
			29327: "EAFA",
			29330: "EAFB",
			25352: "EAFC",
			25394: "EAFD",
			25520: "EAFE",
			25663: "EBA1",
			25816: "EBA2",
			32772: "EBA3",
			27626: "EBA4",
			27635: "EBA5",
			27645: "EBA6",
			27637: "EBA7",
			27641: "EBA8",
			27653: "EBA9",
			27655: "EBAA",
			27654: "EBAB",
			27661: "EBAC",
			27669: "EBAD",
			27672: "EBAE",
			27673: "EBAF",
			27674: "EBB0",
			27681: "EBB1",
			27689: "EBB2",
			27684: "EBB3",
			27690: "EBB4",
			27698: "EBB5",
			25909: "EBB6",
			25941: "EBB7",
			25963: "EBB8",
			29261: "EBB9",
			29266: "EBBA",
			29270: "EBBB",
			29232: "EBBC",
			34402: "EBBD",
			21014: "EBBE",
			32927: "EBBF",
			32924: "EBC0",
			32915: "EBC1",
			32956: "EBC2",
			26378: "EBC3",
			32957: "EBC4",
			32945: "EBC5",
			32939: "EBC6",
			32941: "EBC7",
			32948: "EBC8",
			32951: "EBC9",
			32999: "EBCA",
			33e3: "EBCB",
			33001: "EBCC",
			33002: "EBCD",
			32987: "EBCE",
			32962: "EBCF",
			32964: "EBD0",
			32985: "EBD1",
			32973: "EBD2",
			32983: "EBD3",
			26384: "EBD4",
			32989: "EBD5",
			33003: "EBD6",
			33009: "EBD7",
			33012: "EBD8",
			33005: "EBD9",
			33037: "EBDA",
			33038: "EBDB",
			33010: "EBDC",
			33020: "EBDD",
			26389: "EBDE",
			33042: "EBDF",
			35930: "EBE0",
			33078: "EBE1",
			33054: "EBE2",
			33068: "EBE3",
			33048: "EBE4",
			33074: "EBE5",
			33096: "EBE6",
			33100: "EBE7",
			33107: "EBE8",
			33140: "EBE9",
			33113: "EBEA",
			33114: "EBEB",
			33137: "EBEC",
			33120: "EBED",
			33129: "EBEE",
			33148: "EBEF",
			33149: "EBF0",
			33133: "EBF1",
			33127: "EBF2",
			22605: "EBF3",
			23221: "EBF4",
			33160: "EBF5",
			33154: "EBF6",
			33169: "EBF7",
			28373: "EBF8",
			33187: "EBF9",
			33194: "EBFA",
			33228: "EBFB",
			26406: "EBFC",
			33226: "EBFD",
			33211: "EBFE",
			33217: "ECA1",
			33190: "ECA2",
			27428: "ECA3",
			27447: "ECA4",
			27449: "ECA5",
			27459: "ECA6",
			27462: "ECA7",
			27481: "ECA8",
			39121: "ECA9",
			39122: "ECAA",
			39123: "ECAB",
			39125: "ECAC",
			39129: "ECAD",
			39130: "ECAE",
			27571: "ECAF",
			24384: "ECB0",
			27586: "ECB1",
			35315: "ECB2",
			26e3: "ECB3",
			40785: "ECB4",
			26003: "ECB5",
			26044: "ECB6",
			26054: "ECB7",
			26052: "ECB8",
			26051: "ECB9",
			26060: "ECBA",
			26062: "ECBB",
			26066: "ECBC",
			26070: "ECBD",
			28800: "ECBE",
			28828: "ECBF",
			28822: "ECC0",
			28829: "ECC1",
			28859: "ECC2",
			28864: "ECC3",
			28855: "ECC4",
			28843: "ECC5",
			28849: "ECC6",
			28904: "ECC7",
			28874: "ECC8",
			28944: "ECC9",
			28947: "ECCA",
			28950: "ECCB",
			28975: "ECCC",
			28977: "ECCD",
			29043: "ECCE",
			29020: "ECCF",
			29032: "ECD0",
			28997: "ECD1",
			29042: "ECD2",
			29002: "ECD3",
			29048: "ECD4",
			29050: "ECD5",
			29080: "ECD6",
			29107: "ECD7",
			29109: "ECD8",
			29096: "ECD9",
			29088: "ECDA",
			29152: "ECDB",
			29140: "ECDC",
			29159: "ECDD",
			29177: "ECDE",
			29213: "ECDF",
			29224: "ECE0",
			28780: "ECE1",
			28952: "ECE2",
			29030: "ECE3",
			29113: "ECE4",
			25150: "ECE5",
			25149: "ECE6",
			25155: "ECE7",
			25160: "ECE8",
			25161: "ECE9",
			31035: "ECEA",
			31040: "ECEB",
			31046: "ECEC",
			31049: "ECED",
			31067: "ECEE",
			31068: "ECEF",
			31059: "ECF0",
			31066: "ECF1",
			31074: "ECF2",
			31063: "ECF3",
			31072: "ECF4",
			31087: "ECF5",
			31079: "ECF6",
			31098: "ECF7",
			31109: "ECF8",
			31114: "ECF9",
			31130: "ECFA",
			31143: "ECFB",
			31155: "ECFC",
			24529: "ECFD",
			24528: "ECFE",
			24636: "EDA1",
			24669: "EDA2",
			24666: "EDA3",
			24679: "EDA4",
			24641: "EDA5",
			24665: "EDA6",
			24675: "EDA7",
			24747: "EDA8",
			24838: "EDA9",
			24845: "EDAA",
			24925: "EDAB",
			25001: "EDAC",
			24989: "EDAD",
			25035: "EDAE",
			25041: "EDAF",
			25094: "EDB0",
			32896: "EDB1",
			32895: "EDB2",
			27795: "EDB3",
			27894: "EDB4",
			28156: "EDB5",
			30710: "EDB6",
			30712: "EDB7",
			30720: "EDB8",
			30729: "EDB9",
			30743: "EDBA",
			30744: "EDBB",
			30737: "EDBC",
			26027: "EDBD",
			30765: "EDBE",
			30748: "EDBF",
			30749: "EDC0",
			30777: "EDC1",
			30778: "EDC2",
			30779: "EDC3",
			30751: "EDC4",
			30780: "EDC5",
			30757: "EDC6",
			30764: "EDC7",
			30755: "EDC8",
			30761: "EDC9",
			30798: "EDCA",
			30829: "EDCB",
			30806: "EDCC",
			30807: "EDCD",
			30758: "EDCE",
			30800: "EDCF",
			30791: "EDD0",
			30796: "EDD1",
			30826: "EDD2",
			30875: "EDD3",
			30867: "EDD4",
			30874: "EDD5",
			30855: "EDD6",
			30876: "EDD7",
			30881: "EDD8",
			30883: "EDD9",
			30898: "EDDA",
			30905: "EDDB",
			30885: "EDDC",
			30932: "EDDD",
			30937: "EDDE",
			30921: "EDDF",
			30956: "EDE0",
			30962: "EDE1",
			30981: "EDE2",
			30964: "EDE3",
			30995: "EDE4",
			31012: "EDE5",
			31006: "EDE6",
			31028: "EDE7",
			40859: "EDE8",
			40697: "EDE9",
			40699: "EDEA",
			40700: "EDEB",
			30449: "EDEC",
			30468: "EDED",
			30477: "EDEE",
			30457: "EDEF",
			30471: "EDF0",
			30472: "EDF1",
			30490: "EDF2",
			30498: "EDF3",
			30489: "EDF4",
			30509: "EDF5",
			30502: "EDF6",
			30517: "EDF7",
			30520: "EDF8",
			30544: "EDF9",
			30545: "EDFA",
			30535: "EDFB",
			30531: "EDFC",
			30554: "EDFD",
			30568: "EDFE",
			30562: "EEA1",
			30565: "EEA2",
			30591: "EEA3",
			30605: "EEA4",
			30589: "EEA5",
			30592: "EEA6",
			30604: "EEA7",
			30609: "EEA8",
			30623: "EEA9",
			30624: "EEAA",
			30640: "EEAB",
			30645: "EEAC",
			30653: "EEAD",
			30010: "EEAE",
			30016: "EEAF",
			30030: "EEB0",
			30027: "EEB1",
			30024: "EEB2",
			30043: "EEB3",
			30066: "EEB4",
			30073: "EEB5",
			30083: "EEB6",
			32600: "EEB7",
			32609: "EEB8",
			32607: "EEB9",
			35400: "EEBA",
			32616: "EEBB",
			32628: "EEBC",
			32625: "EEBD",
			32633: "EEBE",
			32641: "EEBF",
			32638: "EEC0",
			30413: "EEC1",
			30437: "EEC2",
			34866: "EEC3",
			38021: "EEC4",
			38022: "EEC5",
			38023: "EEC6",
			38027: "EEC7",
			38026: "EEC8",
			38028: "EEC9",
			38029: "EECA",
			38031: "EECB",
			38032: "EECC",
			38036: "EECD",
			38039: "EECE",
			38037: "EECF",
			38042: "EED0",
			38043: "EED1",
			38044: "EED2",
			38051: "EED3",
			38052: "EED4",
			38059: "EED5",
			38058: "EED6",
			38061: "EED7",
			38060: "EED8",
			38063: "EED9",
			38064: "EEDA",
			38066: "EEDB",
			38068: "EEDC",
			38070: "EEDD",
			38071: "EEDE",
			38072: "EEDF",
			38073: "EEE0",
			38074: "EEE1",
			38076: "EEE2",
			38077: "EEE3",
			38079: "EEE4",
			38084: "EEE5",
			38088: "EEE6",
			38089: "EEE7",
			38090: "EEE8",
			38091: "EEE9",
			38092: "EEEA",
			38093: "EEEB",
			38094: "EEEC",
			38096: "EEED",
			38097: "EEEE",
			38098: "EEEF",
			38101: "EEF0",
			38102: "EEF1",
			38103: "EEF2",
			38105: "EEF3",
			38104: "EEF4",
			38107: "EEF5",
			38110: "EEF6",
			38111: "EEF7",
			38112: "EEF8",
			38114: "EEF9",
			38116: "EEFA",
			38117: "EEFB",
			38119: "EEFC",
			38120: "EEFD",
			38122: "EEFE",
			38121: "EFA1",
			38123: "EFA2",
			38126: "EFA3",
			38127: "EFA4",
			38131: "EFA5",
			38132: "EFA6",
			38133: "EFA7",
			38135: "EFA8",
			38137: "EFA9",
			38140: "EFAA",
			38141: "EFAB",
			38143: "EFAC",
			38147: "EFAD",
			38146: "EFAE",
			38150: "EFAF",
			38151: "EFB0",
			38153: "EFB1",
			38154: "EFB2",
			38157: "EFB3",
			38158: "EFB4",
			38159: "EFB5",
			38162: "EFB6",
			38163: "EFB7",
			38164: "EFB8",
			38165: "EFB9",
			38166: "EFBA",
			38168: "EFBB",
			38171: "EFBC",
			38173: "EFBD",
			38174: "EFBE",
			38175: "EFBF",
			38178: "EFC0",
			38186: "EFC1",
			38187: "EFC2",
			38185: "EFC3",
			38188: "EFC4",
			38193: "EFC5",
			38194: "EFC6",
			38196: "EFC7",
			38198: "EFC8",
			38199: "EFC9",
			38200: "EFCA",
			38204: "EFCB",
			38206: "EFCC",
			38207: "EFCD",
			38210: "EFCE",
			38197: "EFCF",
			38212: "EFD0",
			38213: "EFD1",
			38214: "EFD2",
			38217: "EFD3",
			38220: "EFD4",
			38222: "EFD5",
			38223: "EFD6",
			38226: "EFD7",
			38227: "EFD8",
			38228: "EFD9",
			38230: "EFDA",
			38231: "EFDB",
			38232: "EFDC",
			38233: "EFDD",
			38235: "EFDE",
			38238: "EFDF",
			38239: "EFE0",
			38237: "EFE1",
			38241: "EFE2",
			38242: "EFE3",
			38244: "EFE4",
			38245: "EFE5",
			38246: "EFE6",
			38247: "EFE7",
			38248: "EFE8",
			38249: "EFE9",
			38250: "EFEA",
			38251: "EFEB",
			38252: "EFEC",
			38255: "EFED",
			38257: "EFEE",
			38258: "EFEF",
			38259: "EFF0",
			38202: "EFF1",
			30695: "EFF2",
			30700: "EFF3",
			38601: "EFF4",
			31189: "EFF5",
			31213: "EFF6",
			31203: "EFF7",
			31211: "EFF8",
			31238: "EFF9",
			23879: "EFFA",
			31235: "EFFB",
			31234: "EFFC",
			31262: "EFFD",
			31252: "EFFE",
			31289: "F0A1",
			31287: "F0A2",
			31313: "F0A3",
			40655: "F0A4",
			39333: "F0A5",
			31344: "F0A6",
			30344: "F0A7",
			30350: "F0A8",
			30355: "F0A9",
			30361: "F0AA",
			30372: "F0AB",
			29918: "F0AC",
			29920: "F0AD",
			29996: "F0AE",
			40480: "F0AF",
			40482: "F0B0",
			40488: "F0B1",
			40489: "F0B2",
			40490: "F0B3",
			40491: "F0B4",
			40492: "F0B5",
			40498: "F0B6",
			40497: "F0B7",
			40502: "F0B8",
			40504: "F0B9",
			40503: "F0BA",
			40505: "F0BB",
			40506: "F0BC",
			40510: "F0BD",
			40513: "F0BE",
			40514: "F0BF",
			40516: "F0C0",
			40518: "F0C1",
			40519: "F0C2",
			40520: "F0C3",
			40521: "F0C4",
			40523: "F0C5",
			40524: "F0C6",
			40526: "F0C7",
			40529: "F0C8",
			40533: "F0C9",
			40535: "F0CA",
			40538: "F0CB",
			40539: "F0CC",
			40540: "F0CD",
			40542: "F0CE",
			40547: "F0CF",
			40550: "F0D0",
			40551: "F0D1",
			40552: "F0D2",
			40553: "F0D3",
			40554: "F0D4",
			40555: "F0D5",
			40556: "F0D6",
			40561: "F0D7",
			40557: "F0D8",
			40563: "F0D9",
			30098: "F0DA",
			30100: "F0DB",
			30102: "F0DC",
			30112: "F0DD",
			30109: "F0DE",
			30124: "F0DF",
			30115: "F0E0",
			30131: "F0E1",
			30132: "F0E2",
			30136: "F0E3",
			30148: "F0E4",
			30129: "F0E5",
			30128: "F0E6",
			30147: "F0E7",
			30146: "F0E8",
			30166: "F0E9",
			30157: "F0EA",
			30179: "F0EB",
			30184: "F0EC",
			30182: "F0ED",
			30180: "F0EE",
			30187: "F0EF",
			30183: "F0F0",
			30211: "F0F1",
			30193: "F0F2",
			30204: "F0F3",
			30207: "F0F4",
			30224: "F0F5",
			30208: "F0F6",
			30213: "F0F7",
			30220: "F0F8",
			30231: "F0F9",
			30218: "F0FA",
			30245: "F0FB",
			30232: "F0FC",
			30229: "F0FD",
			30233: "F0FE",
			30235: "F1A1",
			30268: "F1A2",
			30242: "F1A3",
			30240: "F1A4",
			30272: "F1A5",
			30253: "F1A6",
			30256: "F1A7",
			30271: "F1A8",
			30261: "F1A9",
			30275: "F1AA",
			30270: "F1AB",
			30259: "F1AC",
			30285: "F1AD",
			30302: "F1AE",
			30292: "F1AF",
			30300: "F1B0",
			30294: "F1B1",
			30315: "F1B2",
			30319: "F1B3",
			32714: "F1B4",
			31462: "F1B5",
			31352: "F1B6",
			31353: "F1B7",
			31360: "F1B8",
			31366: "F1B9",
			31368: "F1BA",
			31381: "F1BB",
			31398: "F1BC",
			31392: "F1BD",
			31404: "F1BE",
			31400: "F1BF",
			31405: "F1C0",
			31411: "F1C1",
			34916: "F1C2",
			34921: "F1C3",
			34930: "F1C4",
			34941: "F1C5",
			34943: "F1C6",
			34946: "F1C7",
			34978: "F1C8",
			35014: "F1C9",
			34999: "F1CA",
			35004: "F1CB",
			35017: "F1CC",
			35042: "F1CD",
			35022: "F1CE",
			35043: "F1CF",
			35045: "F1D0",
			35057: "F1D1",
			35098: "F1D2",
			35068: "F1D3",
			35048: "F1D4",
			35070: "F1D5",
			35056: "F1D6",
			35105: "F1D7",
			35097: "F1D8",
			35091: "F1D9",
			35099: "F1DA",
			35082: "F1DB",
			35124: "F1DC",
			35115: "F1DD",
			35126: "F1DE",
			35137: "F1DF",
			35174: "F1E0",
			35195: "F1E1",
			30091: "F1E2",
			32997: "F1E3",
			30386: "F1E4",
			30388: "F1E5",
			30684: "F1E6",
			32786: "F1E7",
			32788: "F1E8",
			32790: "F1E9",
			32796: "F1EA",
			32800: "F1EB",
			32802: "F1EC",
			32805: "F1ED",
			32806: "F1EE",
			32807: "F1EF",
			32809: "F1F0",
			32808: "F1F1",
			32817: "F1F2",
			32779: "F1F3",
			32821: "F1F4",
			32835: "F1F5",
			32838: "F1F6",
			32845: "F1F7",
			32850: "F1F8",
			32873: "F1F9",
			32881: "F1FA",
			35203: "F1FB",
			39032: "F1FC",
			39040: "F1FD",
			39043: "F1FE",
			39049: "F2A1",
			39052: "F2A2",
			39053: "F2A3",
			39055: "F2A4",
			39060: "F2A5",
			39066: "F2A6",
			39067: "F2A7",
			39070: "F2A8",
			39071: "F2A9",
			39073: "F2AA",
			39074: "F2AB",
			39077: "F2AC",
			39078: "F2AD",
			34381: "F2AE",
			34388: "F2AF",
			34412: "F2B0",
			34414: "F2B1",
			34431: "F2B2",
			34426: "F2B3",
			34428: "F2B4",
			34427: "F2B5",
			34472: "F2B6",
			34445: "F2B7",
			34443: "F2B8",
			34476: "F2B9",
			34461: "F2BA",
			34471: "F2BB",
			34467: "F2BC",
			34474: "F2BD",
			34451: "F2BE",
			34473: "F2BF",
			34486: "F2C0",
			34500: "F2C1",
			34485: "F2C2",
			34510: "F2C3",
			34480: "F2C4",
			34490: "F2C5",
			34481: "F2C6",
			34479: "F2C7",
			34505: "F2C8",
			34511: "F2C9",
			34484: "F2CA",
			34537: "F2CB",
			34545: "F2CC",
			34546: "F2CD",
			34541: "F2CE",
			34547: "F2CF",
			34512: "F2D0",
			34579: "F2D1",
			34526: "F2D2",
			34548: "F2D3",
			34527: "F2D4",
			34520: "F2D5",
			34513: "F2D6",
			34563: "F2D7",
			34567: "F2D8",
			34552: "F2D9",
			34568: "F2DA",
			34570: "F2DB",
			34573: "F2DC",
			34569: "F2DD",
			34595: "F2DE",
			34619: "F2DF",
			34590: "F2E0",
			34597: "F2E1",
			34606: "F2E2",
			34586: "F2E3",
			34622: "F2E4",
			34632: "F2E5",
			34612: "F2E6",
			34609: "F2E7",
			34601: "F2E8",
			34615: "F2E9",
			34623: "F2EA",
			34690: "F2EB",
			34594: "F2EC",
			34685: "F2ED",
			34686: "F2EE",
			34683: "F2EF",
			34656: "F2F0",
			34672: "F2F1",
			34636: "F2F2",
			34670: "F2F3",
			34699: "F2F4",
			34643: "F2F5",
			34659: "F2F6",
			34684: "F2F7",
			34660: "F2F8",
			34649: "F2F9",
			34661: "F2FA",
			34707: "F2FB",
			34735: "F2FC",
			34728: "F2FD",
			34770: "F2FE",
			34758: "F3A1",
			34696: "F3A2",
			34693: "F3A3",
			34733: "F3A4",
			34711: "F3A5",
			34691: "F3A6",
			34731: "F3A7",
			34789: "F3A8",
			34732: "F3A9",
			34741: "F3AA",
			34739: "F3AB",
			34763: "F3AC",
			34771: "F3AD",
			34749: "F3AE",
			34769: "F3AF",
			34752: "F3B0",
			34762: "F3B1",
			34779: "F3B2",
			34794: "F3B3",
			34784: "F3B4",
			34798: "F3B5",
			34838: "F3B6",
			34835: "F3B7",
			34814: "F3B8",
			34826: "F3B9",
			34843: "F3BA",
			34849: "F3BB",
			34873: "F3BC",
			34876: "F3BD",
			32566: "F3BE",
			32578: "F3BF",
			32580: "F3C0",
			32581: "F3C1",
			33296: "F3C2",
			31482: "F3C3",
			31485: "F3C4",
			31496: "F3C5",
			31491: "F3C6",
			31492: "F3C7",
			31509: "F3C8",
			31498: "F3C9",
			31531: "F3CA",
			31503: "F3CB",
			31559: "F3CC",
			31544: "F3CD",
			31530: "F3CE",
			31513: "F3CF",
			31534: "F3D0",
			31537: "F3D1",
			31520: "F3D2",
			31525: "F3D3",
			31524: "F3D4",
			31539: "F3D5",
			31550: "F3D6",
			31518: "F3D7",
			31576: "F3D8",
			31578: "F3D9",
			31557: "F3DA",
			31605: "F3DB",
			31564: "F3DC",
			31581: "F3DD",
			31584: "F3DE",
			31598: "F3DF",
			31611: "F3E0",
			31586: "F3E1",
			31602: "F3E2",
			31601: "F3E3",
			31632: "F3E4",
			31654: "F3E5",
			31655: "F3E6",
			31672: "F3E7",
			31660: "F3E8",
			31645: "F3E9",
			31656: "F3EA",
			31621: "F3EB",
			31658: "F3EC",
			31644: "F3ED",
			31650: "F3EE",
			31659: "F3EF",
			31668: "F3F0",
			31697: "F3F1",
			31681: "F3F2",
			31692: "F3F3",
			31709: "F3F4",
			31706: "F3F5",
			31717: "F3F6",
			31718: "F3F7",
			31722: "F3F8",
			31756: "F3F9",
			31742: "F3FA",
			31740: "F3FB",
			31759: "F3FC",
			31766: "F3FD",
			31755: "F3FE",
			31775: "F4A1",
			31786: "F4A2",
			31782: "F4A3",
			31800: "F4A4",
			31809: "F4A5",
			31808: "F4A6",
			33278: "F4A7",
			33281: "F4A8",
			33282: "F4A9",
			33284: "F4AA",
			33260: "F4AB",
			34884: "F4AC",
			33313: "F4AD",
			33314: "F4AE",
			33315: "F4AF",
			33325: "F4B0",
			33327: "F4B1",
			33320: "F4B2",
			33323: "F4B3",
			33336: "F4B4",
			33339: "F4B5",
			33331: "F4B6",
			33332: "F4B7",
			33342: "F4B8",
			33348: "F4B9",
			33353: "F4BA",
			33355: "F4BB",
			33359: "F4BC",
			33370: "F4BD",
			33375: "F4BE",
			33384: "F4BF",
			34942: "F4C0",
			34949: "F4C1",
			34952: "F4C2",
			35032: "F4C3",
			35039: "F4C4",
			35166: "F4C5",
			32669: "F4C6",
			32671: "F4C7",
			32679: "F4C8",
			32687: "F4C9",
			32688: "F4CA",
			32690: "F4CB",
			31868: "F4CC",
			25929: "F4CD",
			31889: "F4CE",
			31901: "F4CF",
			31900: "F4D0",
			31902: "F4D1",
			31906: "F4D2",
			31922: "F4D3",
			31932: "F4D4",
			31933: "F4D5",
			31937: "F4D6",
			31943: "F4D7",
			31948: "F4D8",
			31949: "F4D9",
			31944: "F4DA",
			31941: "F4DB",
			31959: "F4DC",
			31976: "F4DD",
			33390: "F4DE",
			26280: "F4DF",
			32703: "F4E0",
			32718: "F4E1",
			32725: "F4E2",
			32741: "F4E3",
			32737: "F4E4",
			32742: "F4E5",
			32745: "F4E6",
			32750: "F4E7",
			32755: "F4E8",
			31992: "F4E9",
			32119: "F4EA",
			32166: "F4EB",
			32174: "F4EC",
			32327: "F4ED",
			32411: "F4EE",
			40632: "F4EF",
			40628: "F4F0",
			36211: "F4F1",
			36228: "F4F2",
			36244: "F4F3",
			36241: "F4F4",
			36273: "F4F5",
			36199: "F4F6",
			36205: "F4F7",
			35911: "F4F8",
			35913: "F4F9",
			37194: "F4FA",
			37200: "F4FB",
			37198: "F4FC",
			37199: "F4FD",
			37220: "F4FE",
			37218: "F5A1",
			37217: "F5A2",
			37232: "F5A3",
			37225: "F5A4",
			37231: "F5A5",
			37245: "F5A6",
			37246: "F5A7",
			37234: "F5A8",
			37236: "F5A9",
			37241: "F5AA",
			37260: "F5AB",
			37253: "F5AC",
			37264: "F5AD",
			37261: "F5AE",
			37265: "F5AF",
			37282: "F5B0",
			37283: "F5B1",
			37290: "F5B2",
			37293: "F5B3",
			37294: "F5B4",
			37295: "F5B5",
			37301: "F5B6",
			37300: "F5B7",
			37306: "F5B8",
			35925: "F5B9",
			40574: "F5BA",
			36280: "F5BB",
			36331: "F5BC",
			36357: "F5BD",
			36441: "F5BE",
			36457: "F5BF",
			36277: "F5C0",
			36287: "F5C1",
			36284: "F5C2",
			36282: "F5C3",
			36292: "F5C4",
			36310: "F5C5",
			36311: "F5C6",
			36314: "F5C7",
			36318: "F5C8",
			36302: "F5C9",
			36303: "F5CA",
			36315: "F5CB",
			36294: "F5CC",
			36332: "F5CD",
			36343: "F5CE",
			36344: "F5CF",
			36323: "F5D0",
			36345: "F5D1",
			36347: "F5D2",
			36324: "F5D3",
			36361: "F5D4",
			36349: "F5D5",
			36372: "F5D6",
			36381: "F5D7",
			36383: "F5D8",
			36396: "F5D9",
			36398: "F5DA",
			36387: "F5DB",
			36399: "F5DC",
			36410: "F5DD",
			36416: "F5DE",
			36409: "F5DF",
			36405: "F5E0",
			36413: "F5E1",
			36401: "F5E2",
			36425: "F5E3",
			36417: "F5E4",
			36418: "F5E5",
			36433: "F5E6",
			36434: "F5E7",
			36426: "F5E8",
			36464: "F5E9",
			36470: "F5EA",
			36476: "F5EB",
			36463: "F5EC",
			36468: "F5ED",
			36485: "F5EE",
			36495: "F5EF",
			36500: "F5F0",
			36496: "F5F1",
			36508: "F5F2",
			36510: "F5F3",
			35960: "F5F4",
			35970: "F5F5",
			35978: "F5F6",
			35973: "F5F7",
			35992: "F5F8",
			35988: "F5F9",
			26011: "F5FA",
			35286: "F5FB",
			35294: "F5FC",
			35290: "F5FD",
			35292: "F5FE",
			35301: "F6A1",
			35307: "F6A2",
			35311: "F6A3",
			35390: "F6A4",
			35622: "F6A5",
			38739: "F6A6",
			38633: "F6A7",
			38643: "F6A8",
			38639: "F6A9",
			38662: "F6AA",
			38657: "F6AB",
			38664: "F6AC",
			38671: "F6AD",
			38670: "F6AE",
			38698: "F6AF",
			38701: "F6B0",
			38704: "F6B1",
			38718: "F6B2",
			40832: "F6B3",
			40835: "F6B4",
			40837: "F6B5",
			40838: "F6B6",
			40839: "F6B7",
			40840: "F6B8",
			40841: "F6B9",
			40842: "F6BA",
			40844: "F6BB",
			40702: "F6BC",
			40715: "F6BD",
			40717: "F6BE",
			38585: "F6BF",
			38588: "F6C0",
			38589: "F6C1",
			38606: "F6C2",
			38610: "F6C3",
			30655: "F6C4",
			38624: "F6C5",
			37518: "F6C6",
			37550: "F6C7",
			37576: "F6C8",
			37694: "F6C9",
			37738: "F6CA",
			37834: "F6CB",
			37775: "F6CC",
			37950: "F6CD",
			37995: "F6CE",
			40063: "F6CF",
			40066: "F6D0",
			40069: "F6D1",
			40070: "F6D2",
			40071: "F6D3",
			40072: "F6D4",
			31267: "F6D5",
			40075: "F6D6",
			40078: "F6D7",
			40080: "F6D8",
			40081: "F6D9",
			40082: "F6DA",
			40084: "F6DB",
			40085: "F6DC",
			40090: "F6DD",
			40091: "F6DE",
			40094: "F6DF",
			40095: "F6E0",
			40096: "F6E1",
			40097: "F6E2",
			40098: "F6E3",
			40099: "F6E4",
			40101: "F6E5",
			40102: "F6E6",
			40103: "F6E7",
			40104: "F6E8",
			40105: "F6E9",
			40107: "F6EA",
			40109: "F6EB",
			40110: "F6EC",
			40112: "F6ED",
			40113: "F6EE",
			40114: "F6EF",
			40115: "F6F0",
			40116: "F6F1",
			40117: "F6F2",
			40118: "F6F3",
			40119: "F6F4",
			40122: "F6F5",
			40123: "F6F6",
			40124: "F6F7",
			40125: "F6F8",
			40132: "F6F9",
			40133: "F6FA",
			40134: "F6FB",
			40135: "F6FC",
			40138: "F6FD",
			40139: "F6FE",
			40140: "F7A1",
			40141: "F7A2",
			40142: "F7A3",
			40143: "F7A4",
			40144: "F7A5",
			40147: "F7A6",
			40148: "F7A7",
			40149: "F7A8",
			40151: "F7A9",
			40152: "F7AA",
			40153: "F7AB",
			40156: "F7AC",
			40157: "F7AD",
			40159: "F7AE",
			40162: "F7AF",
			38780: "F7B0",
			38789: "F7B1",
			38801: "F7B2",
			38802: "F7B3",
			38804: "F7B4",
			38831: "F7B5",
			38827: "F7B6",
			38819: "F7B7",
			38834: "F7B8",
			38836: "F7B9",
			39601: "F7BA",
			39600: "F7BB",
			39607: "F7BC",
			40536: "F7BD",
			39606: "F7BE",
			39610: "F7BF",
			39612: "F7C0",
			39617: "F7C1",
			39616: "F7C2",
			39621: "F7C3",
			39618: "F7C4",
			39627: "F7C5",
			39628: "F7C6",
			39633: "F7C7",
			39749: "F7C8",
			39747: "F7C9",
			39751: "F7CA",
			39753: "F7CB",
			39752: "F7CC",
			39757: "F7CD",
			39761: "F7CE",
			39144: "F7CF",
			39181: "F7D0",
			39214: "F7D1",
			39253: "F7D2",
			39252: "F7D3",
			39647: "F7D4",
			39649: "F7D5",
			39654: "F7D6",
			39663: "F7D7",
			39659: "F7D8",
			39675: "F7D9",
			39661: "F7DA",
			39673: "F7DB",
			39688: "F7DC",
			39695: "F7DD",
			39699: "F7DE",
			39711: "F7DF",
			39715: "F7E0",
			40637: "F7E1",
			40638: "F7E2",
			32315: "F7E3",
			40578: "F7E4",
			40583: "F7E5",
			40584: "F7E6",
			40587: "F7E7",
			40594: "F7E8",
			37846: "F7E9",
			40605: "F7EA",
			40607: "F7EB",
			40667: "F7EC",
			40668: "F7ED",
			40669: "F7EE",
			40672: "F7EF",
			40671: "F7F0",
			40674: "F7F1",
			40681: "F7F2",
			40679: "F7F3",
			40677: "F7F4",
			40682: "F7F5",
			40687: "F7F6",
			40738: "F7F7",
			40748: "F7F8",
			40751: "F7F9",
			40761: "F7FA",
			40759: "F7FB",
			40765: "F7FC",
			40766: "F7FD",
			40772: "F7FE"
		};
		var i = 0;
		var l = str.length;
		var ret = [];
		var charCode;
		var gCode;
		for (i = 0; i < l; i++) {
			charCode = str.charCodeAt(i);
			if (charCode <= 127) ret.push("%" + charCode.toString(16));
			else {
				gCode = map.hasOwnProperty(charCode) && map[charCode];
				if (gCode) {
					while (gCode.length < 4) gCode = "0" + gCode;
					ret.push("%" + gCode.slice(0, 2) + "%" + gCode.slice(2, 4));
				}
			}
		}
		return ret.join("");
	}
	function extractKeyword(inputTarget) {
		if (typeof inputTarget === "function") return inputTarget();
		if (!inputTarget) return "";
		if (inputTarget.nodeName === "INPUT") return inputTarget.value;
		return inputTarget.textContent || "";
	}
	function encodeKeyword(keyword, gbk) {
		return gbk ? toGBK(keyword) : encodeURIComponent(keyword);
	}
	function prepareJump(engine, keyword, { hideTheSameLink }) {
		let kw = keyword;
		if (hideTheSameLink === false) kw = kw.replace(/site:[^\s]+/, "");
		const encoded = encodeKeyword(kw, engine.gbk);
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
	function shouldOpenInNewTab(engine, settingData, isSelectSearch) {
		return Boolean(isSelectSearch || settingData.newtab || engine.blank);
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
		const newTab = shouldOpenInNewTab(engine, settingData, isSelectSearch);
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
	function openAllEngines(engines, encodedKeyword, matchedRule) {
		for (const engine of engines) {
			if (engine.disable) continue;
			if (engine.url.indexOf("site:") < 0 && matchedRule?.url?.test(engine.url)) continue;
			openInNewTab((engine.url || "").replaceAll("%s", encodedKeyword));
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
			iconMode: {
				type: Number,
				default: 1
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
			function measureAndPosition() {
				if (!triggerEl.value || !listEl.value) return;
				const rect = triggerEl.value.getBoundingClientRect();
				const listRect = listEl.value.getBoundingClientRect();
				const listWidth = listRect.width;
				const listHeight = listRect.height;
				const GAP = 6;
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
				shown.value = true;
				await nextTick();
				if (!shown.value) return;
				measureAndPosition();
				active.value = true;
			}
			function scheduleHide() {
				if (pinned.value || isPointerInside()) return;
				active.value = false;
				shown.value = false;
			}
			function hide() {
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
			function onHoverShow() {
				if (pinnedCategory && pinnedCategory !== unpin) return;
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
				], -1)])], 40, _hoisted_2$5)) : __props.iconMode && unref(getFaviconSrc)(__props.engines[0]) ? (openBlock(), createElementBlock("img", {
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
						transition: "opacity 0.06s ease-out",
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
				openAllEngines(engines, encodeKeyword(getCurrentKeyword(), engines[0]?.gbk), matchedRule);
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
						"icon-mode": unref(data).icon,
						onJump,
						onJumpAll: ($event) => onJumpAll(category.engines)
					}, null, 8, [
						"name",
						"engines",
						"icon-mode",
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
	var _hoisted_19$1 = {
		key: 0,
		class: "sej-field-inline"
	};
	var _hoisted_20$1 = ["disabled"];
	var _hoisted_21$1 = { class: "sej-dialog-actions" };
	var _hoisted_22$1 = ["disabled"];
	var _hoisted_23$1 = ["disabled"];
	var _hoisted_24$1 = ["disabled"];
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
				blank: Boolean(props.initial.blank),
				gbk: Boolean(props.initial.gbk)
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
					blank: form.blank,
					gbk: form.gbk
				});
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$3, [
					createBaseVNode("div", _hoisted_2$3, toDisplayString(__props.mode === "edit" ? "编辑搜索引擎" : "添加搜索引擎"), 1),
					createBaseVNode("label", _hoisted_3$2, [_cache[8] || (_cache[8] = createBaseVNode("span", null, "链接", -1)), withDirectives(createBaseVNode("input", {
						ref_key: "urlInput",
						ref: urlInput,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.url = $event),
						placeholder: "必填",
						disabled: __props.busy
					}, null, 8, _hoisted_4$2), [[vModelText, form.url]])]),
					createBaseVNode("label", _hoisted_5$2, [_cache[9] || (_cache[9] = createBaseVNode("span", null, "标题", -1)), withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.name = $event),
						placeholder: "必填，留空自动取域名",
						disabled: __props.busy,
						onInput: markTitleEdited
					}, null, 40, _hoisted_6$2), [[vModelText, form.name]])]),
					createBaseVNode("div", _hoisted_7$2, [_cache[10] || (_cache[10] = createBaseVNode("span", null, "图标", -1)), createBaseVNode("div", _hoisted_8$1, [withDirectives(createBaseVNode("input", {
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
						_cache[11] || (_cache[11] = createBaseVNode("span", null, "图标缓存", -1)),
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
					createBaseVNode("label", _hoisted_17$1, [_cache[13] || (_cache[13] = createBaseVNode("span", null, "打开方式", -1)), withDirectives(createBaseVNode("select", {
						id: "iqxin-newTarget",
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.blank = $event),
						disabled: __props.busy
					}, [..._cache[12] || (_cache[12] = [createBaseVNode("option", { value: true }, "新标签页打开", -1), createBaseVNode("option", { value: false }, "当前页打开", -1)])], 8, _hoisted_18$1), [[vModelSelect, form.blank]])]),
					__props.mode === "edit" ? (openBlock(), createElementBlock("label", _hoisted_19$1, [withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => form.gbk = $event),
						type: "checkbox",
						disabled: __props.busy
					}, null, 8, _hoisted_20$1), [[vModelCheckbox, form.gbk]]), _cache[14] || (_cache[14] = createBaseVNode("span", null, "GBK 编码", -1))])) : createCommentVNode("", true),
					createBaseVNode("div", _hoisted_21$1, [
						__props.mode === "edit" ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("delete"))
						}, " 删除 ", 8, _hoisted_22$1)) : createCommentVNode("", true),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[7] || (_cache[7] = ($event) => _ctx.$emit("cancel"))
						}, " 取消 ", 8, _hoisted_23$1),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(__props.busy ? "获取图标中…" : "确定"), 9, _hoisted_24$1)
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
		"onDragstart",
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
		"onDragstart",
		"onClick"
	];
	var _hoisted_7 = [
		"data-iqxintitle",
		"data-iqxinimg",
		"data-iqxinlink",
		"data-iqxintarget",
		"data-iqxindisabled",
		"data-iqxingbk"
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
	var _hoisted_25 = {
		id: "xin-newtab",
		title: "是否采用新标签页打开"
	};
	var _hoisted_26 = { class: "sej-footer-actions" };
	var UNDO_DURATION = 5e3;
	var AUTOSAVE_DELAY = 500;
	var DRAG_ANIMATION_MS = 160;
	var _sfc_main$2 = {
		__name: "SettingPanel",
		setup(__props) {
			const settings = useSettings();
			const source = computed(() => settings.settingData);
			const OPTION_KEYS = [
				"status",
				"version",
				"addSearchItems",
				"modifySearchItems",
				"newtab",
				"debug",
				"fixedTop",
				"fixedTopUpward",
				"baiduOffset",
				"getIcon",
				"HideTheSameLink",
				"center",
				"icon",
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
						url: engine.url,
						favicon: engine.favicon
					};
					if (engine.faviconData) item.faviconData = engine.faviconData;
					if (engine.blank) item.blank = "_blank";
					if (engine.disable) item.disable = true;
					if (engine.gbk) item.gbk = true;
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
			function onDragStart(e, type, ci, ei = null) {
				const category = draft.categories[ci];
				if (!category) return;
				const item = type === "category" ? category : category.engines[ei];
				if (!item) return;
				dragSnapshot = captureOrder();
				dragDropped = false;
				copyTargetCi.value = null;
				dragCtx.value = {
					type,
					ci,
					ei: type === "engine" ? ei : null,
					key: type === "category" ? category.key : item._id
				};
				e.dataTransfer.effectAllowed = "copyMove";
				e.dataTransfer.setData("text/plain", "");
			}
			function onDragEnd() {
				const snapshot = dragSnapshot;
				dragSnapshot = null;
				if (!dragDropped && snapshot) restoreOrder(snapshot);
				else if (dragDropped) scheduleAutoSave();
				dragDropped = false;
				dragCtx.value = null;
				copyTargetCi.value = null;
			}
			function onDrop(e) {
				const ctx = dragCtx.value;
				if (!ctx) return;
				e.preventDefault();
				e.stopPropagation();
				const targetCi = copyTargetCi.value;
				copyTargetCi.value = null;
				if (ctx.type === "engine" && targetCi != null) {
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
					dragDropped = true;
					dragCtx.value = null;
					return;
				}
				dragDropped = true;
				dragCtx.value = null;
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
			function addItemFromEvent(e) {
				const path = e.composedPath ? e.composedPath() : [];
				for (const el of path) if (el?.classList?.contains("iqxin-additem")) return el;
				return null;
			}
			function onSettingsDragOver(e) {
				const ctx = dragCtx.value;
				if (!ctx) return;
				e.preventDefault();
				if (ctx.type === "engine" && addItemFromEvent(e)) {
					const copyCi = categoryIndexAt(e.clientX, e.clientY);
					if (copyCi >= 0) {
						copyTargetCi.value = copyCi;
						if (e.dataTransfer) e.dataTransfer.dropEffect = "copy";
						return;
					}
				}
				copyTargetCi.value = null;
				if (e.dataTransfer) e.dataTransfer.dropEffect = "move";
				const ci = categoryIndexAt(e.clientX, e.clientY);
				if (ci < 0) return;
				if (ctx.type === "category") {
					moveCategoryTo(ci);
					return;
				}
				const card = categoryCards()[ci];
				if (!card) return;
				moveEngineTo(ci, engineInsertIndex(card, e.clientY));
			}
			function addEngine(ci) {
				engineDialog.value = {
					mode: "add",
					ci,
					initial: {}
				};
			}
			function editEngine(ci, ei) {
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
				const iconSetting = settings.settingData.getIcon;
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
				document.body.style.overflow = "auto";
				document.removeEventListener("keydown", onKeydown);
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
						onDragover: onSettingsDragOver,
						onDrop
					}, [(openBlock(true), createElementBlock(Fragment, null, renderList(draft.categories, (category, ci) => {
						return openBlock(), createElementBlock("div", {
							id: category.key,
							key: category._id,
							class: normalizeClass(["iqxin-items", { "sej-category-hidden": !category.enabled }]),
							"data-sej-drag-el": "category-" + category._id
						}, [createBaseVNode("div", {
							class: normalizeClass(["sejtitle drag", { "sej-dragging": dragCtx.value?.type === "category" && dragCtx.value.ci === ci }]),
							draggable: "true",
							"data-xin": category.enabled ? 1 : -1,
							"data-iqxintitle": category.key,
							title: `编辑分类：${category.name}`,
							onDragstart: ($event) => onDragStart($event, "category", ci),
							onDragend: onDragEnd,
							onClick: withModifiers(($event) => openCategoryDialog(ci), ["stop"])
						}, [createBaseVNode("span", _hoisted_3, toDisplayString(category.name), 1), createBaseVNode("span", {
							class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": !category.enabled }]),
							title: category.enabled ? "隐藏" : "显示",
							onClick: withModifiers(($event) => toggleCategory(ci), ["stop"]),
							innerHTML: category.enabled ? unref(EYE) : unref(EYE_OFF)
						}, null, 10, _hoisted_4)], 42, _hoisted_2), createBaseVNode("div", {
							class: "sejcon",
							"data-sej-drag-el": "list-" + category._id
						}, [(openBlock(true), createElementBlock(Fragment, null, renderList(category.engines, (engine, ei) => {
							return openBlock(), createElementBlock("span", {
								key: engine._id,
								class: normalizeClass(["drag", { "sej-dragging": dragCtx.value?.type === "engine" && dragCtx.value.key === engine._id }]),
								draggable: "true",
								"data-sej-drag-el": "engine-" + engine._id,
								title: `编辑：${engine.name}`,
								onDragstart: ($event) => onDragStart($event, "engine", ci, ei),
								onDragend: onDragEnd,
								onClick: withModifiers(($event) => editEngine(ci, ei), ["stop"])
							}, [createBaseVNode("span", {
								class: "sej-engine",
								"data-iqxintitle": engine.name,
								"data-iqxinimg": engine.favicon,
								"data-iqxinlink": engine.url,
								"data-iqxintarget": engine.blank ? "_blank" : null,
								"data-iqxindisabled": engine.disable ? "true" : null,
								"data-iqxingbk": engine.gbk ? "true" : null
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
							title: copyTargetCi.value === ci ? "复制到此类别" : "添加搜索引擎",
							onClick: withModifiers(($event) => addEngine(ci), ["stop"])
						}, [copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: "sej-copy-icon",
							innerHTML: unref(COPY)
						}, null, 8, _hoisted_11)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode("+")], 64)), copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", _hoisted_12, "复制到此类别")) : createCommentVNode("", true)], 10, _hoisted_10)], 8, _hoisted_5)], 10, _hoisted_1);
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
							"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => draft.selectSearch = $event)
						}, null, 512), [[vModelCheckbox, draft.selectSearch]])])]),
						createBaseVNode("span", _hoisted_18, [createBaseVNode("label", null, [_cache[14] || (_cache[14] = createTextVNode("动画", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => draft.transtion = $event)
						}, null, 512), [[vModelCheckbox, draft.transtion]])])]),
						createBaseVNode("span", _hoisted_19, [createBaseVNode("label", null, [_cache[15] || (_cache[15] = createTextVNode("固定到顶端", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => draft.fixedTop = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTop]])])]),
						withDirectives(createBaseVNode("span", _hoisted_20, [createBaseVNode("label", null, [_cache[16] || (_cache[16] = createTextVNode("仅上拉显示", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => draft.fixedTopUpward = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTopUpward]])])], 512), [[vShow, draft.fixedTop]]),
						createBaseVNode("span", _hoisted_21, [createBaseVNode("label", null, [_cache[17] || (_cache[17] = createTextVNode("隐藏同站链接", -1)), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[5] || (_cache[5] = ($event) => draft.HideTheSameLink = $event)
						}, null, 512), [[vModelCheckbox, draft.HideTheSameLink]])])])
					]), createBaseVNode("div", _hoisted_22, [
						createBaseVNode("div", _hoisted_23, [
							createBaseVNode("span", _hoisted_24, [_cache[19] || (_cache[19] = createTextVNode(" 居中： ", -1)), withDirectives(createBaseVNode("select", { "onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => draft.center = $event) }, [..._cache[18] || (_cache[18] = [
								createBaseVNode("option", { value: 0 }, "默认", -1),
								createBaseVNode("option", { value: 1 }, "强制", -1),
								createBaseVNode("option", { value: 2 }, "自动", -1)
							])], 512), [[
								vModelSelect,
								draft.center,
								void 0,
								{ number: true }
							]])]),
							createBaseVNode("span", _hoisted_25, [_cache[21] || (_cache[21] = createTextVNode(" 打开方式： ", -1)), withDirectives(createBaseVNode("select", { "onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => draft.newtab = $event) }, [..._cache[20] || (_cache[20] = [createBaseVNode("option", { value: 0 }, "默认页面", -1), createBaseVNode("option", { value: 1 }, "新标签页", -1)])], 512), [[
								vModelSelect,
								draft.newtab,
								void 0,
								{ number: true }
							]])]),
							createBaseVNode("span", {
								id: "xin-loadIcons",
								title: "把所有远程图标内嵌为 data 链接",
								class: normalizeClass({ "sej-loading": loadingIcons.value }),
								onClick: loadAllIcons
							}, toDisplayString(loadingIcons.value ? "加载中…" : "加载所有图标缓存"), 3)
						]),
						_cache[22] || (_cache[22] = createStaticVNode("<div class=\"sej-footer-links\"><span class=\"feedback\" title=\"在 GreasyFork 进行反馈\"><a target=\"_blank\" href=\"https://greasyfork.org/zh-CN/users/1238054\">Greasy Fork</a></span><span class=\"feedback\" title=\"在 Github 进行反馈\"><a target=\"_blank\" href=\"https://github.com/sherlocknieh/Monkey-Scripts\">GitHub</a></span></div>", 1)),
						createBaseVNode("div", _hoisted_26, [createBaseVNode("span", {
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
	var global_default = "/* ==UserStyle==\n@name           SearchEngineJumpPlusGlobalStyle\n@description    Global style for SearchEngineJumpPlus\n@version        5.32.0\n@namespace      https://greasyfork.org/en/scripts/454280-searchenginejumpplus\n@license        MIT\n@author         MUTED64\n==/UserStyle== */\n\n#settingLayerMask {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  inset: 0;\n  background-color: rgba(16, 18, 22, 0.42);\n  backdrop-filter: blur(12px);\n  z-index: 200000000;\n  overflow: auto;\n  font-family: var(--sej-font-family);\n  min-height: 100%;\n  font-size: 14px;\n  transition: opacity 0.15s ease-out;\n  opacity: 0;\n  animation: sej-setting-mask-in 0.15s ease;\n  user-select: none;\n  -moz-user-select: none;\n  padding-bottom: 80px;\n  box-sizing: border-box;\n  color: var(--font-color-qxin);\n}\n#settingLayer {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  --sej-panel-pad-x: 20px;\n  --sej-panel-pad-top: 16px;\n  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;\n  background-color: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 16px;\n  box-shadow: var(--sej-panel-shadow);\n  position: absolute;\n  width: auto;\n  min-width: min(720px, calc(100vw - 32px));\n  max-width: min(960px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  margin: 0;\n  overflow: visible;\n  animation: sej-panel-in 0.16s ease-out;\n}\n@keyframes sej-panel-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px) scale(0.99);\n  }\n}\n.sej-panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex: 0 0 auto;\n  padding: 0 2px 12px;\n  cursor: move;\n}\n.sej-panel-title {\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n.sej-panel-close {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--sej-surface-hover);\n  color: transparent;\n  font-size: 0;\n  line-height: 0;\n  cursor: pointer;\n  opacity: 1;\n  transition: background-color 0.12s ease-out, opacity 0.12s ease-out;\n}\n.sej-panel-close::before,\n.sej-panel-close::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 12px;\n  height: 1.5px;\n  border-radius: 2px;\n  background: var(--font-color-qxin);\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n.sej-panel-close::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n.iqxin-items {\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 220px;\n  width: 220px;\n  min-width: 0;\n  max-width: 220px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 6px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color-sej);\n  background: var(--sej-surface-2);\n}\n.sej-add-category-card {\n  align-items: center;\n  justify-content: center;\n  min-height: 140px;\n  background: transparent;\n  border: 1px dashed var(--sej-checkbox-border);\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.sej-add-category-card:hover {\n  background: var(--sej-surface-hover);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-add-category-card:focus-visible {\n  background: var(--sej-surface-hover);\n  outline: 2px solid var(--sej-accent);\n  outline-offset: 2px;\n}\n.sej-add-category-plus {\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1;\n  opacity: 0.45;\n  transition: opacity 0.12s ease-out;\n}\n.sej-add-category-card:hover .sej-add-category-plus {\n  opacity: 1;\n}\n.sejcon {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n}\n.sejcon > .drag {\n  flex: 0 0 auto;\n}\n#settingLayer .drag {\n  display: block;\n  position: relative;\n}\n/* 拖动排序：源元素淡出，被挤开的元素由 FLIP 动画平滑过渡 */\n#settingLayer .drag.sej-dragging {\n  opacity: 0.45;\n  cursor: grabbing;\n}\n#settingLayer .drag[draggable=\"true\"]:active {\n  cursor: grabbing;\n}\n#settingLayer .sej-engine {\n  padding: 0 36px 0 8px;\n  width: 100%;\n  height: 30px;\n  box-sizing: border-box;\n  border-radius: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n#settingLayer .sej-engine > span {\n  flex: 0 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.iqxin-pointer-events,\n.sej-engine-icon,\n#settingLayer .sej-engine * {\n  pointer-events: none;\n}\n.sejtitle {\n  text-align: center;\n  /* 左右留出等宽空间，让标题相对卡片居中，同时避开右侧的显隐按钮 */\n  padding: 5px 36px;\n  margin-bottom: 2px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.5;\n  border-radius: 8px;\n  transition: background-color 0.12s ease-out;\n}\n#settingLayerMask [data-xin] {\n  margin: 1px 0;\n  border-radius: 8px;\n}\n.sejcon [data-xin] {\n  cursor: pointer;\n}\n/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */\n#settingLayerMask [data-iqxindisabled=\"true\"],\n[data-xin^=\"-\"] {\n  background-color: transparent;\n  color: var(--font-color-qxin);\n  transition: background-color 0.12s ease-out;\n}\n#settingLayerMask [data-iqxindisabled=\"true\"] > span,\n#settingLayerMask [data-iqxindisabled=\"true\"] .sej-engine-icon,\n[data-xin^=\"-\"] > .iqxin-pointer-events {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */\n.sej-category-hidden .sej-engine > span,\n.sej-category-hidden .sej-engine .sej-engine-icon,\n.sej-category-hidden .iqxin-additem {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n.sejtitle:not([data-xin^=\"-\"]):hover {\n  background: var(--sej-surface-hover);\n}\n#settingLayerMask .sej-engine:hover {\n  background-color: var(--sej-surface-hover);\n}\n#settingLayerMask [data-iqxindisabled=\"true\"]:hover,\n[data-xin^=\"-\"]:hover {\n  background-color: transparent;\n}\n.sej-category-hidden .sej-engine:hover {\n  background-color: transparent;\n}\n#settingLayerMask label {\n  cursor: pointer;\n}\n#settingLayerMask .sej-engine-icon {\n  vertical-align: middle;\n}\n#btnEle {\n  position: relative;\n  width: 100%;\n  background: transparent;\n  border-radius: 0;\n  flex: 0 0 auto;\n}\n#btnEle {\n  margin-top: 10px;\n}\n#btnEle span {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  box-sizing: border-box;\n  min-height: 30px;\n  background: var(--sej-surface-2);\n  border: 1px solid transparent;\n  margin: 0;\n  color: var(--font-color-qxin);\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out, opacity 0.12s ease-out;\n}\n#btnEle label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: inherit;\n}\n#btnEle #xin-centerDisplay,\n#btnEle #xin-newtab {\n  gap: 2px;\n  padding-right: 4px;\n}\n#btnEle span:hover {\n  background: var(--sej-surface-hover);\n  color: var(--font-color-qxin);\n}\n#btnEle a {\n  color: var(--font-color-qxin);\n  opacity: 0.7;\n  text-decoration: none;\n  font-family: inherit;\n  transition: opacity 0.12s ease-out, color 0.12s ease-out;\n}\n#btnEle a:hover {\n  opacity: 1;\n  color: var(--sej-accent);\n}\n#btnEle .feedback {\n  background: transparent;\n  border-color: transparent;\n  padding: 4px 6px;\n}\n#btnEle .feedback:hover {\n  background: transparent;\n  border-color: transparent;\n  color: var(--sej-accent);\n}\n#btnEle > div {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  box-sizing: border-box;\n}\n#btnEle > div.btnEleLayer {\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: stretch;\n  background: transparent;\n  border-radius: 0;\n  border-top: 1px solid var(--border-color-sej);\n  padding-top: 12px;\n  gap: 8px;\n}\n.sej-footer-options,\n.sej-footer-bar,\n.sej-footer-selects,\n.sej-footer-links,\n.sej-footer-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.sej-footer-options {\n  gap: 8px;\n}\n.sej-footer-bar {\n  gap: 8px 12px;\n}\n.sej-footer-selects {\n  gap: 8px;\n}\n.sej-footer-links {\n  gap: 0;\n  margin-left: auto;\n}\n.sej-footer-actions {\n  margin-left: 4px;\n}\n#btnEle #xin-save {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n#btnEle #xin-save:hover {\n  background: var(--sej-accent);\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n#btnEle #xin-save.sej-saving {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.sej-loading {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.iqxin-btn-active {\n  background: var(--sej-accent-weak);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"] {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: -3px;\n  margin: 0 !important;\n  padding: 0;\n  position: relative;\n  border: 1.5px solid var(--sej-checkbox-border);\n  border-radius: 5px;\n  background: var(--sej-input-bg);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out;\n}\n#settingLayerMask input[type=\"checkbox\"]:before {\n  content: none;\n}\n#settingLayerMask input[type=\"checkbox\"]:checked {\n  background: var(--sej-accent);\n  border-color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"]:checked:after {\n  content: \"\";\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  width: 4px;\n  height: 8px;\n  border: solid var(--sej-accent-contrast);\n  border-width: 0 2px 2px 0;\n  background: none;\n  transform: rotate(45deg);\n}\n.drop-over {\n  opacity: 0.6;\n}\n.iqxin-set-toggle {\n  visibility: visible;\n  opacity: 0.6;\n  position: absolute;\n  background: transparent;\n  top: 50%;\n  transform: translate(0, -50%);\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: opacity 0.12s ease-out, background-color 0.12s ease-out,\n    color 0.12s ease-out;\n  right: 8px;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n}\n.iqxin-set-toggle svg {\n  display: block;\n}\n.iqxin-set-toggle.iqxin-set-hidden {\n  opacity: 0.35;\n}\n.iqxin-set-toggle:hover {\n  opacity: 1;\n  background: var(--sej-surface-hover);\n}\nspan.iqxin-additem {\n  display: inline-block;\n  position: relative;\n  text-align: center;\n  width: 100%;\n  box-sizing: border-box;\n  margin: auto 0 2px;\n  padding: 5px 0;\n  border: 1px dashed var(--sej-checkbox-border);\n  border-radius: 8px;\n  color: var(--font-color-qxin);\n  opacity: 0.55;\n  cursor: pointer;\n  visibility: visible;\n  transition: opacity 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\nspan.iqxin-additem:hover {\n  opacity: 1;\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\nspan.iqxin-additem.sej-copy-target {\n  opacity: 1;\n  border-style: solid;\n  border-color: var(--sej-accent);\n  background: var(--sej-accent-weak);\n  color: var(--sej-accent);\n}\n.sej-copy-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  line-height: 1;\n}\n.sej-copy-icon svg {\n  display: block;\n  width: 14px;\n  height: 14px;\n}\n.sej-copy-hint {\n  position: absolute;\n  left: 50%;\n  bottom: calc(100% + 6px);\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 3px 8px;\n  border-radius: 6px;\n  background: rgba(20, 22, 26, 0.82);\n  color: #fff;\n  font-size: 12px;\n  line-height: 1.5;\n  white-space: nowrap;\n  pointer-events: none;\n}\n#newSearchListBox,\n#newSearchBox,\n.sej-dialog-box {\n  position: fixed;\n  z-index: 200000100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: min(400px, calc(100vw - 32px));\n  box-sizing: border-box;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n  margin: 0;\n  transition: opacity 0.14s ease-out, transform 0.14s ease-out;\n}\n.sej-dialog-title {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.sej-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  font-size: 12px;\n}\n.sej-field > span {\n  opacity: 0.65;\n}\n.sej-field-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.sej-field-row input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-icon-preview-btn {\n  flex: 0 0 auto;\n  padding: 7px 12px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  background: var(--sej-btn-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  cursor: pointer;\n  transition: border-color 0.12s ease-out, color 0.12s ease-out;\n}\n.sej-icon-preview-btn:hover:not(:disabled) {\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-icon-preview-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.sej-icon-preview {\n  flex: 0 0 auto;\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  border-radius: 4px;\n  background: var(--sej-surface-hover);\n}\n.sej-data-line {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n.sej-data-line input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-field-value {\n  color: var(--font-color-qxin);\n  opacity: 0.5;\n  font-size: 12px;\n}\n.sej-field-inline {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n.sej-dialog-actions {\n  display: flex;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n#newSearchListBox input,\n#newSearchBox input,\n.sej-dialog-box input {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  border-radius: 8px;\n  outline: none;\n  color: var(--font-color-qxin);\n  background: var(--sej-input-bg);\n  font-family: inherit;\n  font-size: 13px;\n  transition: border-color 0.12s ease-out, box-shadow 0.12s ease-out;\n}\n#newSearchBox #iqxin-newTarget {\n  width: 100%;\n  border-radius: 8px;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  outline: none;\n}\n.iqxin-help-link {\n  color: var(--font-color-qxin);\n  opacity: 0.6;\n}\n#newSearchListBox input:focus,\n#newSearchBox input:focus,\n.sej-dialog-box input:focus {\n  background: var(--sej-input-bg);\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n.addItemBoxBtn {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.addItemBoxBtn:hover {\n  background: var(--sej-surface-hover);\n}\n.sej-dialog-danger {\n  margin-right: auto;\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n.sej-dialog-danger:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#xin-centerDisplay select,\n#xin-newtab select {\n  height: 24px;\n  margin: -1px 0;\n  border: 1px solid transparent;\n  outline: none;\n  color: var(--font-color-qxin);\n  font-size: 13px;\n  font-family: inherit;\n  padding: 0 4px;\n  border-radius: 5px;\n  cursor: pointer;\n  text-decoration: none;\n  background: transparent;\n  transition: border-color 0.12s ease-out, background-color 0.12s ease-out;\n}\n#xin-centerDisplay select:hover,\n#xin-newtab select:hover {\n  background: var(--sej-surface-hover);\n}\n#xin-centerDisplay select:focus,\n#xin-newtab select:focus {\n  border-color: var(--sej-accent);\n  background: var(--sej-input-bg);\n}\n#xin-centerDisplay select option,\n#xin-newtab select option {\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n}\n.iqxin-closeBtn,\n.iqxin-enterBtn {\n  box-sizing: border-box;\n}\n.iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n.iqxin-enterBtn:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n.iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 200000100;\n  width: min(560px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n}\n#iqxin-editCodeBox p {\n  margin: 0;\n}\n#iqxin-editCodeBox button {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n#iqxin-editCodeBox button:hover {\n  background: var(--sej-surface-hover);\n}\n#iqxin-editCodeBox .iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n}\n#iqxin-editCodeBox .iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox textarea {\n  width: 100%;\n  box-sizing: border-box;\n  flex: 1 1 auto;\n  min-height: 240px;\n  padding: 10px;\n  overflow: auto;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 10px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 12px;\n  line-height: 1.5;\n  resize: vertical;\n  outline: none;\n}\n#iqxin-editCodeBox textarea:focus {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n#iqxin-editCodeBox .sej-file-input {\n  display: none;\n}\n.iqxin-warning {\n  color: var(--sej-danger);\n  font-size: 14px;\n  font-weight: 600;\n}\n#importingBox {\n  position: fixed;\n  width: min(350px, calc(100vw - 32px));\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding: 16px 24px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  color: var(--font-color-qxin);\n}\n#importingBox li {\n  margin: 5px;\n  border-bottom: 1px solid var(--border-color-sej);\n}\n#importingBox li p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.xin-importing-item {\n  cursor: pointer;\n}\n#setBtn {\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  width: 30px;\n  height: 30px;\n  flex: 0 0 auto;\n  padding: 0;\n  border-radius: 8px;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  display: flex;\n  opacity: 0.65;\n}\nspan#setBtn:hover {\n  opacity: 1;\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\nspan#setBtn:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#setBtn svg {\n  width: 16px;\n  height: 16px;\n  display: block;\n}\n/* 跳转条换行时，把设置按钮推到最右侧，避免停在行中间 */\n#sej-container > #setBtn {\n  margin-left: auto;\n}\n#setBtn:focus-visible {\n  opacity: 1;\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n#sej-container {\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 2;\n  padding: 2px;\n  gap: 2px;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  transform-origin: top center;\n  animation: sejopen 0.14s ease-out;\n  color: var(--font-color-qxin);\n  background: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  width: max-content !important;\n  max-width: 100%;\n  box-sizing: border-box;\n  border-radius: var(--sej-radius-bar, 12px);\n  border: 1px solid var(--border-color-sej);\n  overflow: auto;\n  box-shadow: var(\n    --sej-shadow-bar,\n    0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)\n  );\n  height: fit-content;\n  flex-wrap: wrap;\n  justify-content: center;\n  user-select: none;\n}\n/* 给用户的提示 */\n#iqixn-global-tip {\n  box-sizing: content-box !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  opacity: 0;\n  height: 25px;\n  line-height: 25px;\n  letter-spacing: 1px;\n  font-size: 14px;\n  color: #fff;\n  padding: 5px 20px;\n  border-radius: 8px;\n  background-color: #666;\n  position: fixed;\n  z-index: 200000001;\n  left: 50%;\n  bottom: 5%;\n  transform: translate(-50%);\n  pointer-events: none;\n  transition: opacity 0.15s ease-out;\n}\n#iqixn-global-tip.sej-toast-visible {\n  pointer-events: auto;\n}\n#iqixn-global-tip .sej-toast-action {\n  pointer-events: auto;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 10px;\n  background: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  font: inherit;\n  letter-spacing: inherit;\n  line-height: 20px;\n  cursor: pointer;\n  transition: background-color 0.12s ease-out;\n}\n#iqixn-global-tip .sej-toast-action:hover {\n  background: rgba(255, 255, 255, 0.34);\n}\n/* 夜间模式 - 默认主题变量 */\n:root,\n:host,\nbody {\n  --font-color-qxin: #333;\n  --background-color-qxin: #fffffff0;\n  --background-avtive-color-qxin: #ccc;\n  --background-active-enable-qxin: #cff9ff;\n  --background-active-disable-qxin: #ffa2a2;\n  --background-hover-color-qxin: #eaeaea;\n  --trigger-shown-qxin: #f1f3f4 !important;\n  --background-btn-qxin: #eff4f8;\n  --background-setting-qxin: #fff;\n  --box-shadow-color-sej: hsla(0, 0%, 0%, 7%);\n  --border-color-sej: #e1e6ea;\n\n  /* 跳转条现代化外观 */\n  --sej-font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", sans-serif;\n  --sej-bar-bg: rgba(255, 255, 255, 0.88);\n  --sej-hover-bg: rgba(0, 0, 0, 0.055);\n  --sej-active-bg: rgba(0, 0, 0, 0.1);\n  --sej-accent: #4285f4;\n  --sej-accent-weak: rgba(66, 133, 244, 0.12);\n  --sej-radius-bar: 12px;\n  --sej-radius-item: 8px;\n  --sej-radius-menu: 12px;\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3);\n\n  /* 设置面板 */\n  --sej-surface-2: rgba(0, 0, 0, 0.025);\n  --sej-surface-hover: rgba(0, 0, 0, 0.06);\n  --sej-input-bg: #fff;\n  --sej-btn-bg: #fff;\n  --sej-checkbox-border: #cfd5dd;\n  --sej-focus-ring: rgba(66, 133, 244, 0.22);\n  --sej-accent-contrast: #fff;\n  --sej-danger: #d93025;\n  --sej-danger-weak: rgba(217, 48, 37, 0.1);\n  --sej-panel-shadow: 0 24px 64px -24px hsla(0, 0%, 0%, 0.45),\n    0 2px 8px hsla(0, 0%, 0%, 0.06);\n}\n/* 暗黑模式变量 - 当主文档是暗黑模式时 */\n:root[qxintheme=\"dark\"],\n:host[qxintheme=\"dark\"],\nbody[qxintheme=\"dark\"] {\n  --font-color-qxin: #bdc1bc;\n  --background-color-qxin: #202124f0;\n  --background-avtive-color-qxin: #424242;\n  --background-active-enable-qxin: #274144;\n  --background-active-disable-qxin: #583535;\n  --background-hover-color-qxin: #424242;\n  --trigger-shown-qxin: #3c4043 !important;\n  --background-btn-qxin: #292f36;\n  --background-setting-qxin: #202124;\n  --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);\n  --border-color-sej: #3b4547;\n\n  --sej-bar-bg: rgba(32, 33, 36, 0.9);\n  --sej-hover-bg: rgba(255, 255, 255, 0.09);\n  --sej-active-bg: rgba(255, 255, 255, 0.14);\n  --sej-accent: #8ab4f8;\n  --sej-accent-weak: rgba(138, 180, 248, 0.18);\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.8);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.85);\n\n  --sej-surface-2: rgba(255, 255, 255, 0.045);\n  --sej-surface-hover: rgba(255, 255, 255, 0.09);\n  --sej-input-bg: #17181a;\n  --sej-btn-bg: rgba(255, 255, 255, 0.04);\n  --sej-checkbox-border: #4a5459;\n  --sej-focus-ring: rgba(138, 180, 248, 0.3);\n  --sej-accent-contrast: #202124;\n  --sej-danger: #f28b82;\n  --sej-danger-weak: rgba(242, 139, 130, 0.14);\n  --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85),\n    0 2px 8px hsla(0, 0%, 0%, 0.5);\n}\n/* 滑词搜索样式 */\n#sej-container.selectSearch {\n  position: fixed;\n  top: 2px;\n  left: 0;\n  right: 0;\n  z-index: 99999999;\n  margin: 0 auto;\n  transform: translateY(calc(-100% - 10px));\n  visibility: hidden;\n  pointer-events: none;\n  transition: transform 0.3s, visibility 0s linear 0.3s;\n}\n#sej-container.selectSearch.sej-select-visible {\n  transform: none;\n  visibility: visible;\n  pointer-events: auto;\n  transition: transform 0.3s, visibility 0s linear 0s;\n}\n#sej-expanded-category {\n  font-weight: bold;\n}\n.sej-category {\n  display: inline-flex;\n  align-items: center;\n  position: relative;\n}\n.sej-category-search-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  border-radius: 4px;\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.08s ease-out, color 0.08s ease-out;\n}\n.sej-category-search-icon svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.sej-category-search-icon:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n  color: var(--sej-accent, #4285f4);\n}\n.sej-category-search-icon:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n.sej-category-search-icon:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-category-title {\n  font-weight: 600;\n  padding: 0 12px;\n  opacity: 0.8;\n}\n.sej-engine {\n  padding: 0 13px;\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  display: inline-flex;\n  gap: 8px;\n  align-items: center;\n  height: 2.6em;\n  box-sizing: border-box;\n  text-decoration: none !important;\n  color: var(--font-color-qxin) !important;\n  cursor: pointer;\n  white-space: nowrap;\n}\n#sej-container > .sej-engine,\n#sej-container .sej-category > .sej-engine {\n  height: 30px;\n  padding: 0 11px;\n  gap: 6px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 500;\n}\n.sej-drop-list a:visited,\n.sej-drop-list a:hover,\n.sej-engine a:visited,\n.sej-engine a:hover,\n#sej-container a:link,\n#sej-container a:visited,\n#sej-container a:hover {\n  color: var(--font-color-qxin);\n}\n.sej-engine:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\n.sej-engine:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#sej-container .sej-engine:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-engine.sej-drop-list-trigger-shown {\n  background-color: var(--trigger-shown-qxin);\n}\n.sej-drop-list > .sej-engine {\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  height: 30px;\n  padding: 0 10px;\n  gap: 8px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 400;\n}\n.sej-drop-list > .sej-engine + .sej-engine {\n  margin-top: 1px;\n}\n\n.sej-engine-icon {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  object-fit: cover;\n  display: inline-block;\n  margin: 0;\n}\n.sej-engine-icon:not([src]) {\n  display: none;\n}\n\n.sej-drop-list {\n  /* 使用 fixed 定位确保在 Shadow DOM 中位置正确 */\n  position: fixed;\n  display: none;\n  opacity: 0.2;\n  top: -10000px;\n  left: 0;\n  min-width: 128px;\n  padding: 6px;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  box-shadow: var(\n    --sej-shadow-menu,\n    0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)\n  );\n  background-color: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  transition: opacity 0.08s ease-out;\n  animation: sej-drop-menu-in 0.1s ease-out;\n  overflow: hidden;\n  border-radius: var(--sej-radius-menu, 12px);\n  border: 1px solid var(--border-color-sej);\n  user-select: none;\n}\n@keyframes sej-drop-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.98);\n  }\n}\n@keyframes sej-setting-mask-in {\n  from {\n    opacity: 0;\n  }\n}\n@keyframes sejopen {\n  0% {\n    transform: translateY(-4px) scale(0.98);\n    opacity: 0;\n  }\n  100% {\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes iqxinsejopen {\n  0% {\n    transform: scale(0.01, 0.01);\n    opacity: 0;\n  }\n  100% {\n    transform: scale(1, 1);\n    opacity: 1;\n  }\n}\n\n/* ---------- Vue 重构版设置面板布局优化 ---------- */\n#settingLayerMask {\n  padding: 20px;\n  box-sizing: border-box;\n}\n\n#sej-settings-body {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  gap: 10px;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */\n  margin-top: 0;\n  margin-right: calc(var(--sej-panel-pad-x) * -1);\n  padding-top: 2px;\n  padding-right: var(--sej-panel-pad-x);\n  padding-bottom: 4px;\n}\n#sej-settings-body::-webkit-scrollbar {\n  width: 8px;\n}\n#sej-settings-body::-webkit-scrollbar-thumb {\n  background: var(--sej-surface-hover);\n  border-radius: 4px;\n}\n#settingLayer #btnEle {\n  flex: 0 0 auto;\n}\n\n@media (max-width: 780px) {\n  #btnEle span {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  #settingLayer {\n    --sej-panel-pad-x: 12px;\n    min-width: calc(100vw - 16px);\n    max-width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n  }\n}\n\n@media (max-width: 560px) {\n  .iqxin-items {\n    flex: 1 1 160px;\n    width: auto;\n    max-width: none;\n  }\n}\n";
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
