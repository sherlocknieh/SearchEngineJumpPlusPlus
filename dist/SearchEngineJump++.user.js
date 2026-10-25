// ==UserScript==
// @name               SearchEngineJump++
// @namespace          https://github.com/sherlocknieh/
// @version            2026.10.26.44
// @author             sherlocknieh & MUTED64 & iqxin & 锐经 & NLF(初始作者)
// @description        Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。
// @description:zh-CN  Fork 自 MUTED64 的 SearchEngineJumpPLus, 用 Vue3 重构, 修复诸多问题, 并进行了大幅简化,美化和优化。
// @description:en     Fork of MUTED64's SearchEngineJumpPlus, rebuilt with Vue 3 with numerous fixes and a cleaner, faster UI.
// @license            MIT
// @icon               data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAFSElEQVR4nMWXX4hdVxXGf2vfe89kJg61ia0DYzMTMWnoQ0FJtKmtJsFixT8DBSmYtGMLgq0PCqMEKwmxYzSGyUPBB7XRNi0FC6JtwYovgcS0klJD8SHakoExYhLQFkwn9/aeOfv7fDi3SStJ5o4muN4O7L32b33rz94H/s8WS10cvR3yVQaY++wnkESkwDK2sMy1EwXDtzRRziBhu+dGDG48smSA5kUP//wmAFIkrNwiGMOsBzYAQwTzEEeBY8BJO1fYtF+4laGPv/i/Afz1C1sAYwngZiKmsDcDI0DrHUtL4DRwMGAmUnVcCtpHPsrQbS/1DZDe+VFHblKziIjYBjwD3Iu5ARBwBjgJnAkwMAa+z+ZZqXEX8VZg0T784aUDzH3uk0DtVQvlVsMjwGpMB3gauAu8ieB2YDPwxR5gF/gQ+MeoNUFzACI4d+imvgDOp0BVRWo2AW62eRi8wvY/wNtrgGhDL+7a/gIcBLYBu4HrsPdSzr8K/JlcLk2BaCQstSxN2VptuYO93an7WES0UyORGg1Wfu0QKivyQhfb56yhn4B3Ynew1kD1oDTfJF20vi8NYBvjMVubbWHrOdtPhwaAYPVvfs8Hf1u32bJbDtXVbgFvAj4AOgTGzhPhGMdV/wCvbtmAJSyttzRiuWv7CdttAlY/f/iimwdvfQGiAfmtczg/jnOJ8/txtRbnvgAu6FSPtg1AC3wGPAvgWGRYqiSowLwC1Ru4GoFyFPc3ZM8DfGPLB1jZXlhe74sS6AAc+O6vL+tg6LaX2LP/SSA6tkpcYeee36/0D/C7Ve9BwZs97iLMEMDAE5N07z1wSQebvl/y3KkAGDIUsrHpRp8ACeDGw38kZdPMPtrILhvZ1yZ5TZJxvnwuW40GzSSaDa1vJq1oJXVbKZ9qpv5qoO6Cqr5ULB+zfNrygOX7LS+PlCgeu+eimz/1w0yWaTTScIqYTEERcDoiXovFauddAAA22CeRDyKD/Bnkbd32PNgUj09S/GwrUMt+x14hiWVFI1LEVyPidggi4hfOnuv3nr8AEGC5sj1j+4TtAcu7i4HlDwLLqRawMmtmnidn6JYLGIa7C/mbwHeAgYATQexPjVCVxcZd7SUACDCEfRyznXoMr8Sawf4lcDdwI7AKWAdss/0r2dOyr6kFpCn7hiyPRlDY5mM7z10W4F1KFT+/p6ZwDkgT2HuN19Tz3yXWG+NnJ8uR9h0FSStSRAFBwAmbpu3xbP/T9rzkp2zvtt2RzcvfG15EAaC8/8m6FkgmpWdsTyD/COtv9esnj1haZXvEtiXP2d5jc6es+3qHv8/2uO1v2d4hedA2H/n2vxZX4LwS+78E1PcDqprAOPZao9Gxs5PNkc6dXUKnIuI1Z8+lRijLo8AR2+OWqeeBS8n7bE8bd2x4Zc97FwcAaP307vqyiXi7QzBi7OyXGel8GkJEBAFUWUREIXlnL/LCvgBheZ9h2lLHyvxp5rrFAZZiG3e16zliBm3vsD0lu6i5ja0awppWrjrKmeOPjAL/UQP/rf1h11BPJHckT/dkL+vDjeXC0pRy3qGcB22x9oHZKwcAcPTh5UimzrWnexGXlrCFlAvlakq5eiiX3eLtSXnFAABe3j1c/0PgTp1z77NUKmesjHMulKuttq9X/eq+sgAAx35wTZ0OqWNrWqr2KVelqoqcF3DOL1r5dStfHQCoW03K9ApuWrnam/PCnHN+StZDRHSK1jLgCnXBpeymr/8dS+SFbmH7eiu/TkQnNRrkqmL20XVXFwBg7QOzRASSsDJFaxndssPso+uu9tH92b8BowSyPc/iZtEAAAAASUVORK5CYII=
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
// @grant              GM_setClipboard
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              window.onurlchange
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
		else if (isObject$1(val) && !isArray(val) && !isPlainObject$1(val)) return String(val);
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
	var engines_default = {
		version: "2026-10-24 08:47:49",
		fixedTop: false,
		fixedTopUpward: false,
		HideTheSameLink: true,
		transtion: true,
		selectSearch: true,
		center: false,
		engineCategories: [
			[
				"搜索",
				"web",
				true
			],
			[
				"AI",
				"user1792793062676",
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
				"user1792802683546",
				false
			],
			[
				"国产AI",
				"user1792793110006",
				false
			]
		],
		engineList: JSON.parse("{\"web\":[{\"name\":\"Google\",\"url\":\"https://www.google.com/search?q=%s\",\"favicon\":\"https://www.google.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAIAEBAAAAEAIABoBAAAJgAAACAgAAABACAAqBAAAI4EAAAoAAAAEAAAACAAAAABACAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///zD9/f2W/f392P39/fn9/f35/f391/39/ZT+/v4uAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Cf39/Zn///////////////////////////////////////////39/ZX///8IAAAAAAAAAAAAAAAA/v7+Cf39/cH/////+v35/7TZp/92ul3/WKs6/1iqOv9yuFn/rNWd//j79v///////f39v////wgAAAAAAAAAAP39/Zn/////7PXp/3G3WP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP+Or1j//vDo///////9/f2VAAAAAP///zD/////+vz5/3G3V/9TqDT/WKo6/6LQkf/U6cz/1urO/6rUm/+Zo0r/8IZB//adZ////v7///////7+/i79/f2Y/////4nWzf9Lqkj/Vqo4/9Xqzv///////////////////////ebY//SHRv/0hUL//NjD///////9/f2U/f392v////8sxPH/Ebzt/43RsP/////////////////////////////////4roL/9IVC//i1jf///////f391/39/fr/////Cr37/wW8+/+16/7/////////////////9IVC//SFQv/0hUL/9IVC//SFQv/3pnX///////39/fn9/f36/////wu++/8FvPv/tuz+//////////////////SFQv/0hUL/9IVC//SFQv/0hUL/96p7///////9/f35/f392/////81yfz/CrL5/2uk9v///////////////////////////////////////////////////////f392P39/Zn/////ks/7/zdS7P84Rur/0NT6///////////////////////9/f////////////////////////39/Zb+/v4y//////n5/v9WYu3/NUPq/ztJ6/+VnPT/z9L6/9HU+v+WnfT/Ul7t/+Hj/P////////////////////8wAAAAAP39/Z3/////6Or9/1hj7v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9sdvD////////////9/f2YAAAAAAAAAAD///8K/f39w//////5+f7/paz2/11p7v88Suv/Okfq/1pm7v+iqfX/+fn+///////9/f3B/v7+CQAAAAAAAAAAAAAAAP///wr9/f2d///////////////////////////////////////////9/f2Z/v7+CQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f2Z/f392/39/fr9/f36/f392v39/Zj///8wAAAAAAAAAAAAAAAAAAAAAPAPAADAAwAAgAEAAIABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIABAACAAQAAwAMAAPAPAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/g3+/v5X/f39mf39/cj9/f3q/f39+f39/fn9/f3q/f39yP39/Zn+/v5W////DAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f2c/f399f/////////////////////////////////////////////////////9/f31/f39mv7+/iMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/gn9/f2K/f39+////////////////////////////////////////////////////////////////////////////f39+v39/Yf///8IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4k/f390v////////////////////////////////////////////////////////////////////////////////////////////////39/dD///8iAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////MP39/er//////////////////////////+r05v+v16H/gsBs/2WxSf9Wqjj/Vqk3/2OwRv99vWX/pdKV/97u2P////////////////////////////39/ej+/v4vAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/iT9/f3q/////////////////////+v15/+Pxnv/VKk2/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/36+Z//d7tf///////////////////////39/ej///8iAAAAAAAAAAAAAAAAAAAAAAAAAAD///8K/f390//////////////////////E4bn/XKw+/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1apN/+x0pv///////////////////////39/dD///8IAAAAAAAAAAAAAAAAAAAAAP39/Yv/////////////////////sdij/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9TqDT/YKU1/8qOPv/5wZ////////////////////////39/YcAAAAAAAAAAAAAAAD+/v4l/f39+////////////////8Lgt/9TqDT/U6g0/1OoNP9TqDT/U6g0/1OoNP9utlT/n86N/7faqv+426v/pdKV/3u8ZP9UqDX/U6g0/3egN//jiUH/9IVC//SFQv/82MP//////////////////f39+v7+/iMAAAAAAAAAAP39/Z3////////////////q9Ob/W6w+/1OoNP9TqDT/U6g0/1OoNP9nskz/zOXC/////////////////////////////////+Dv2v+osWP/8YVC//SFQv/0hUL/9IVC//WQVP/++fb//////////////////f39mgAAAAD+/v4O/f399v///////////////4LHj/9TqDT/U6g0/1OoNP9TqDT/dblc//L58P/////////////////////////////////////////////8+v/3p3f/9IVC//SFQv/0hUL/9IVC//rIqf/////////////////9/f31////DP7+/ln////////////////f9v7/Cbz2/zOwhv9TqDT/U6g0/2KwRv/v9+z///////////////////////////////////////////////////////738//1kFT/9IVC//SFQv/0hUL/9plg///////////////////////+/v5W/f39nP///////////////4jf/f8FvPv/Bbz7/yG1s/9QqDz/vN2w//////////////////////////////////////////////////////////////////rHqP/0hUL/9IVC//SFQv/0hUL//vDn//////////////////39/Zn9/f3L////////////////R878/wW8+/8FvPv/Bbz7/y7C5P/7/fr//////////////////////////////////////////////////////////////////ere//SFQv/0hUL/9IVC//SFQv/718H//////////////////f39yP39/ez///////////////8cwvv/Bbz7/wW8+/8FvPv/WNL8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//rIqv/////////////////9/f3q/f39+v///////////////we9+/8FvPv/Bbz7/wW8+/993P3///////////////////////////////////////SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/+cGf//////////////////39/fn9/f36////////////////B737/wW8+/8FvPv/Bbz7/33c/f//////////////////////////////////////9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/6xaX//////////////////f39+f39/e3///////////////8cwvv/Bbz7/wW8+/8FvPv/WdP8///////////////////////////////////////0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//SFQv/0hUL/9IVC//vVv//////////////////9/f3q/f39y////////////////0bN/P8FvPv/Bbz7/wW8+/8hrvn/+/v///////////////////////////////////////////////////////////////////////////////////////////////////////////////////39/cj9/f2c////////////////ht/9/wW8+/8FvPv/FZP1/zRJ6/+zuPf//////////////////////////////////////////////////////////////////////////////////////////////////////////////////f39mf7+/lr////////////////d9v7/B7n7/yB38f81Q+r/NUPq/0hV7P/u8P3////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v5X////D/39/ff///////////////9tkPT/NUPq/zVD6v81Q+r/NUPq/2Fs7//y8v7////////////////////////////////////////////09f7//////////////////////////////////////////////////f399f7+/g0AAAAA/f39n////////////////+Tm/P89Suv/NUPq/zVD6v81Q+r/NUPq/1Bc7f/IzPn/////////////////////////////////x8v5/0xY7P+MlPP////////////////////////////////////////////9/f2cAAAAAAAAAAD+/v4n/f39/P///////////////7W69/81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v9ZZe7/k5v0/6609/+vtff/lJv0/1pm7v81Q+r/NUPq/zVD6v+GjvL//v7//////////////////////////////f39+/7+/iQAAAAAAAAAAAAAAAD9/f2N/////////////////////6Cn9f81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v+BivL////////////////////////////9/f2KAAAAAAAAAAAAAAAAAAAAAP7+/gv9/f3V/////////////////////7W69/8+S+v/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/P0zr/7q/+P///////////////////////f390v7+/gkAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3r/////////////////////+Xn/P94gfH/NkTq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NUPq/zVD6v81Q+r/NkTq/3Z/8f/l5/z///////////////////////39/er+/v4kAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/jL9/f3r///////////////////////////k5vz/nqX1/2p08P9IVez/OEbq/zdF6v9GU+z/aHLv/5qh9f/i5Pz////////////////////////////9/f3q////MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP7+/ib9/f3V/////////////////////////////////////////////////////////////////////////////////////////////////f390v7+/iQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wr9/f2N/f39/P///////////////////////////////////////////////////////////////////////////f39+/39/Yv+/v4JAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD+/v4n/f39n/39/ff//////////////////////////////////////////////////////f399v39/Z3+/v4lAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/v7+Dv7+/lr9/f2c/f39y/39/e39/f36/f39+v39/ez9/f3L/f39nP7+/ln+/v4OAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/AA///AAD//AAAP/gAAB/wAAAP4AAAB8AAAAPAAAADgAAAAYAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAcAAAAPAAAAD4AAAB/AAAA/4AAAf/AAAP/8AAP//wAP/\"},{\"name\":\"Bing\",\"url\":\"https://www.bing.com/search?q=%s\",\"favicon\":\"https://www.bing.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABILAAASCwAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD+0k4S/NFTevzNUtb6yFL/98JQ//W8Tv/ytEz/76tIuO6hREf///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A/tVSNv7UVeT80VX/+81T//rIUv/3wlD/9bxO//K0TP/vq0n/76JG/++YQrjwijcS////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/WUzb+1lby/tRW//zRVf/7zVP/+shS//fCUP/1vE7/8rRM/++rSf/uokb/75hD//COP/Lxgzp6////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD/108S/9dX8v7WVv/+1Fb//NFV//vNU//6yFL/98JQ//S8Tv/ytEz/7qtJ/+6hRf/umEP/8I4///CEO//xezfH8HEyJP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP/YVInrk0Tz310u6dxTKffjcDbn8adK9vrIUv/3wlD/9LxO//K0TP/uq0n/7qFF/+6XQv/vjT7/74M7/+96N//ucDLy7mYsWP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A64RB7N9PI//fTiH/304h/99OIf/fUCT/5XE67vfCUP/0vE7/8bNL/+6qSf/toUX/7ZZB/+6MPf/ugjn/7ng1/+xuMP/qZSz/4381vf///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APerRWHkWiz/41Qk/+NUJP/jVCT/41Qk/+NUJP/jVCT/98JPR/S7TOTxs0v/7apI/+ygRP/slkH/7Ys8/+yAN//rdjP/6Wwt/+dhKP/jWyT31NxgQP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A6nAwUudbJ//nWyf/51sn/+dbJ//nWyf/51sn/+dbJ/////8A////APGySInsqUfy7J9D/+uUP//riTr/6n41/+lzMP/maCr/410k/95THv/V212w////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDqYStF6mEr/+phK//qYSv/6mEr/+phK//qYSv/6mEr/////wD///8A////AOynRCTqnUC46ZI9/+mHOP/nezP/5XAt/+JkJv/eWB//2FAZ99bbWv/V3F8Q////AP///wD///8A////AP///wD///8A////AP///wD///8A////AO1oLUXtaC3/7Wgt/+1oLf/taC3/7Wgt/+1oLf/taC3/////AP///wD///8A////AP///wDnkDpH5oQ01uR4L//hbCn/3V8h/9hTGv/VbyHq19pV/9XbXED///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A724vRe9uL//vbi//724v/+9uL//vbi//724v/+9uL/////8A////AP///wD///8A////AP///wD///8A4HMqetxnJPLXWRv/1GMZ7dvOQv/Z2k//1ttYQP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wDyczFF8nMx//JzMf/yczH/8nMx//JzMf/yczH/8nMx/////wD///8A////AP///wD///8A////AO3NGxDp0BRg5MYctt2wIv/f1jT/3NhA/9rZSv/Y2lNA////AP///wD///8A////AP///wD///8A////AP///wD///8A////APR6MkX0ejL/9Hoy//R6Mv/0ejL/9Hoy//R6Mv/0ejL/////AP///wD///8A////APbEKhDzxyWQ78of/+vOGP/n0RT/5NMh/+HVLf/e1zn/29hF/9naTjD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A9YAzRfWAM//1gDP/9YAz//WAM//1gDP/9YAz//WAM/////8A////AP///wD///8A+MMswPXFKP/xyCL/7cwc/+nQFf/l0hr/49Qm/+DWMv/d1z/g////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD3hzRF94c0//eHNP/3hzT/94c0//eHNP/3hzT/94c0/////wD///8A////APzAMiD5wi7/98Qq//TGJv/wyiD/7M4Z/+fREv/k0h//4dQr/97WN4D///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APiNNUX4jTX/+I01//iNNf/4jTX/+I01//iNNf/4jTX/////AP///wD///8A/b8zkPvBMP/4wyz/9sUp//LII//uyx3/6s8W/+bSGP/j0yTQ4NUwEP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+pI2RfqSNv/6kjb/+pI2//qSNv/6kjb/+pI2//qSNv////8A////AP///wD9vzTw/L8y//rBL//3wyv/9MYn//DJIP/szRr/6NET8OXSHTD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD7mDdF+5g3//uYN//7mDf/+5g3//uYN//7mDf/+5g3/////wD///8A/r42UP6+Nf/9vzP/+8Ax//nCLf/2xCn/88ck/+/LHsDrzxcQ////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APudN0X7nTf/+503//udN//7nTf/+503//udN//7nTf/////AP///wD/vTew/r41//6+NP/9vzP/+sEv//jDLMD1xShA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+qA4RfqgOP/6oDj/+qA4//qgOP/6oDj/+qA4//qgOP////8A////AP+9N/D/vTb//r41//2/NOD8wDFQ////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD5ozhF+aM4//mjOP/5ozj/+aM4//mjOP/5ozj/+aM4/////wD///8A/703MP+9N8D+vjZg////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APmnOUX5pzn/+ac5//mnOf/5pzn/+ac5//mnOf/5pzn/////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A+ao5RfmqOf/5qjn/+ao5//mqOf/5qjn/+ao5//mqOf////8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD5rTlF+a05//mtOf/5rTn/+a05//mtOf/5rTn/+a05/////wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APixOkX4sTr/+LE6//ixOv/4sTr/+LE6//ixOv/4sTr/////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A97M6RfezOv/3szr/97M6//ezOv/3szr/97M6//ezOfH///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD3tztF97c7//e3O//3tzv/97c7//e3O//3tzv/97c6hv///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////APa6O0X2ujv/9ro7//a6O//2ujv/9ro7//a6Oob///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A9b08RfW9PP/1vTz/9b08//W9O9T1vTs0////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD1wD4S9b871PW/O/H1vzp2////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A///////AH///gAf//wAD//4AAP/+AAB//gAAP/wAAB/8AwAf/AOAD/wD4A/8A/gP/APwD/wDwA/8A8Af/AOAH/wDgB/8A4A//AMAf/wDAf/8Awf//AMf//wD///8A////AP///wD///8A////AP///wH///8D////D////////8=\"}],\"user1792793062676\":[{\"name\":\"DeepSeek\",\"url\":\"https://chat.deepseek.com/?q=%s&autosend=1\",\"favicon\":\"https://www.deepseek.com/favicon.ico\"},{\"name\":\"ChatGPT\",\"url\":\"https://chatgpt.com/?q=%s \",\"favicon\":\"https://chatgpt.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAQAEBAAAAEAIABoBAAARgAAACAgAAABACAAqBAAAK4EAAAwMAAAAQAgAKglAABWFQAAQEAAAAEAIAAoQgAA/joAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAACqxAAAqsQAAAAAAAAAAAAD///8A////P////77////3///////////////////////////////////////////////3////vv///z////8A////P////9n///////////////////////////v7+//y8vL/+vr6///////////////////////////Z////P////73////////////////6+vr/6+vr/87Ozv98fHz/aWlp/3Fxcf/FxcX//////////////////////////73////2///////////e3t7/enp6/2hoaP9HR0f/XFxc/9TU1P/ExMT/YGBg/9HR0f/////////////////////2///////////z8/P/bm5u/6mpqf/l5eX/y8vL/5CQkP9oaGj/xMTE/6SkpP9GRkb/ra2t//v7+///////////////////////zMzM/25ubv/Gxsb/cnJy/3t7e/+srKz/ubm5/39/f/+ysrL/aGho/2xsbP+zs7P//////////////////////8jIyP88PDz/bGxs/7e3t/+rq6v/aWlp/4ODg/95eXn/sbGx/4iIiP/Jycn/c3Nz//z8/P////////////////+YmJj/gICA/8zMzP+Kior/bGxs/+zs7P/j4+P/hYWF/5+fn/+MjIz/0dHR/3BwcP/7+/v////////////4+Pj/a2tr/9jY2P+Dg4P/paWl/4WFhf/o6Oj/5+fn/2hoaP+Ojo7/zs7O/3l5ef+ioqL/////////////////+fn5/21tbf/R0dH/f39//7e3t/92dnb/hISE/2lpaf+wsLD/s7Oz/2lpaf89PT3/0tLS//////////////////////+qqqr/cHBw/2RkZP+5ubn/fX19/729vf+oqKj/eXl5/3Z2dv/Hx8f/aWlp/9XV1f//////////////////////+fn5/6ampv9ERET/rq6u/729vf9nZ2f/lZWV/8zMzP/l5eX/oaGh/3R0dP/39/f////////////////2////////////////ycnJ/2JiYv/Jycn/0NDQ/1VVVf9KSkr/aGho/35+fv/j4+P////////////////2////vf////////////////7+/v+/v7//b29v/2lpaf+AgID/0tLS/+zs7P/7+/v/////////////////////vf///z/////Z//////////////////////n5+f/y8vL//Pz8////////////////////////////////2f///z////8A////P////77////3///////////////////////////////////////////////3////vv///z////8AgAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAEAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAACqxAAAqsQAAAAAAAAAAAAAAAAAAAAAAAP///wD///8H////Sf///6j////j////+//////////////////////////////////////////////////////////////////////////////////////////7////5P///6j///9I////B////wAAAAAAAAAAAP///wD///8A////Gf///5L////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+7///+S////GP///wD///8A////AP///xn///+x//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+x////Gf///wD///8G////kv///////////////////////////////////////////////////////////////////////////f39//39/f////////////////////////////////////////////////////////////////////+S////Bv///0n////t///////////////////////////////////////////////////////////9/f3/1NTU/42Njf9hYWH/W1tb/3p6ev+8vLz/9vb2/////////////////////////////////////////////////////+3///9K////p/////////////////////////////////////////////////f39//x8fH/8PDw/5WVlf8mJib/GRkZ/zc3N/88PDz/IiIi/xcXF/9mZmb/5OTk/////////////////////////////////////////////////////6f////j/////////////////////////////////////9nZ2f+FhYX/S0tL/zo6Ov88PDz/ERER/z8/P//ExMT/8PDw//Ly8v/a2tr/gYGB/xcXF/9YWFj/7u7u////////////////////////////////////////////////4v////v///////////////////////////7+/v+tra3/LCws/xkZGf9HR0f/X19f/0tLS/8eHh7/IiIi/4iIiP/l5eX////////////8/Pz/k5OT/xMTE/+Xl5f////////////////////////////////////////////////7////////////////////////////////vr6+/yAgIP9CQkL/wcHB//b29v/+/v7/+fn5/8rKyv9hYWH/FhYW/zc3N/+jo6P/8vLy///////w8PD/R0dH/ysrK/+Wlpb/4ODg//////////////////////////////////////////////////////////////////Ly8v9LS0v/MDAw/9jY2P////////////b29v/i4uL/+/v7//j4+P+zs7P/RERE/xQUFP9RUVH/0tLS//////+AgID/CgoK/xEREf8yMjL/sbGx//7+/v//////////////////////////////////////////////////////x8fH/xgYGP+Pj4////////39/f/Nzc3/YGBg/ykpKf91dXX/3Nzc///////t7e3/lpaW/yQkJP9+fn7//////4+Pj/8cHBz/k5OT/0BAQP8gICD/urq6//////////////////////////////////////////////////////+lpaX/FxcX/8LCwv/l5eX/f39//yEhIf8kJCT/e3t7/2VlZf9AQED/lpaW/+3t7f//////d3d3/3h4eP//////j4+P/x8fH//Y2Nj/29vb/zQ0NP9ERET/7u7u/////////////////////////////////////////////////6SkpP8XFxf/cHBw/zY2Nv8XFxf/ZWVl/9HR0f//////7Ozs/2JiYv8SEhL/SUlJ/7S0tP90dHT/eXl5//////+Pj4//Hx8f/9fX1///////m5ub/xUVFf+6urr/////////////////////////////////////////////////vb29/xQUFP8ODg7/SUlJ/7i4uP/5+fn//Pz8/8LCwv9YWFj/RkZG/6Ojo/+Xl5f/Pz8//yAgIP97e3v//////4+Pj/8fHx//19fX///////R0dH/HBwc/5GRkf////////////////////////////////////////////z8/P96enr/FRUV/4aGhv/v7+///////9nZ2f9xcXH/HR0d/2RkZP/n5+f////////////f39//UVFR/3l5ef//////j4+P/x8fH//W1tb//////9fX1/8fHx//ioqK////////////////////////////////////////////zs7O/x4eHv9sbGz/+fn5//X19f+UlJT/Ozs7/2hoaP9GRkb/mJiY//////////////////////9/f3//eXl5//r6+v9zc3P/IiIi/9vb2///////tLS0/xUVFf+pqan///////////////////////////////////////////+RkZH/GRkZ/8jIyP//////yMjI/xgYGP+Li4v/+/v7/2RkZP+Wlpb//////////////////////4GBgf9QUFD/YGBg/z8/P/+ioqL/+vr6//Pz8/9XV1f/Kysr/97e3v///////////////////////////////////////////3BwcP8sLCz/5ubm///////BwcH/FxcX/6qqqv//////Y2Nj/2JiYv/n5+f////////////f39//U1NT/yIiIv99fX3/4eHh///////p6en/dXV1/xQUFP+QkJD/////////////////////////////////////////////////d3d3/ycnJ//h4eH//////8LCwv8XFxf/qqqq//////9lZWX/JCQk/0VFRf+hoaH/mpqa/0BAQP9iYmL/zc3N//7+/v/29vb/rKys/z4+Pv8MDAz/Hh4e/9HR0f////////////////////////////////////////////////+jo6P/FRUV/7Kysv//////wsLC/xcXF/+qqqr//////2RkZP+Kior/qKio/0BAQP8RERH/dXV1//Pz8//9/f3/x8fH/1lZWf8UFBT/QEBA/2lpaf8XFxf/vLy8/////////////////////////////////////////////////+Li4v8yMjL/RkZG/+jo6P/Dw8P/GBgY/6qqqv//////Y2Nj/5GRkf//////5ubm/4iIiP89PT3/b29v/3Nzc/8eHh7/Jycn/4yMjP/s7Oz/rKys/xYWFv+8vLz//////////////////////////////////////////////////////6enp/8YGBj/T09P/4uLi/8XFxf/qamp//////9nZ2f/LS0t/6Ojo//z8/P//////9LS0v9oaGj/KCgo/2xsbP/W1tb//v7+//////91dXX/IiIi/9nZ2f//////////////////////////////////////////////////////+/v7/6Ghof8qKir/EBAQ/wwMDP+ampr//////8TExP9FRUX/FBQU/1BQUP+/v7//+/v7//n5+f/i4uL/+fn5////////////yMjI/yMjI/9iYmL/+vr6/////////////////////////////////////////////////////////////v7+/9nZ2f+Li4v/ICAg/11dXf/5+fn//////+3t7f+Wlpb/Li4u/xkZGf9ubm7/09PT//v7+//+/v7/8/Pz/7W1tf80NDT/Kysr/8/Pz//////////////////////////////////////7//////////////////////////////////////////9/f3//FxcX/6mpqf/////////////////e3t7/enp6/xwcHP8jIyP/T09P/19fX/9BQUH/FhYW/zY2Nv+9vb3/////////////////////////////////////+////+L//////////////////////////////////////////+Pj4/9GRkb/Hh4e/4+Pj//f39//8/Pz/+7u7v+5ubn/MTEx/xYWFv8+Pj7/Ojo6/09PT/+Ojo7/4eHh///////////////////////////////////////////j////p////////////////////////////////////////////////9nZ2f9YWFj/FRUV/ycnJ/8+Pj7/NDQ0/xcXF/8uLi7/paWl//Pz8//x8fH/+Pj4/////////////////////////////////////////////////////6f///9K////7f////////////////////////////////////////////////Ly8v+0tLT/dXV1/1paWv9kZGT/lJSU/9zc3P/+/v7////////////////////////////////////////////////////////////////t////Sf///wb///+S/////////////////////////////////////////////////////////////////f39//7+/v///////////////////////////////////////////////////////////////////////////////5L///8G////AP///xn///+x//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+x////Gf///wD///8A////AP///xj///+S////7v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v////kv///xj///8A////AAAAAAAAAAAA////AP///wf///9I////qP///+T////7//////////////////////////////////////////////////////////////////////////////////////////v////j////qP///0n///8H////AAAAAAAAAAAA4AAAB8AAAAOAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABwAAAA+AAAAcoAAAAMAAAAGAAAAABACAAAAAAAAAkAAAqsQAAKrEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////B////zv///+K////yf///+3////8/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////P///+3////K////iv///zv///8H////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wH///8y////of///+r////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v///+n///+e////Mv///wH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////Bv///2X////h////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4v///2X///8G////AAAAAAAAAAAAAAAAAP///wD///8G////ef////T///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T///95////Bv///wAAAAAA////AP///wD///9l////9P/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0////Zf///wD///8A////AP///zL////h////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4f///zL///8A////Bv///57//////////////////////////////////////////////////////////////////////////////////////////////////////v7+/+Xl5f+0tLT/jIyM/3t7e/+BgYH/np6e/87Ozv/29vb//////////////////////////////////////////////////////////////////////////////////////////6D///8H////PP///+j////////////////////////////////////////////////////////////////////////////////////////////////p6en/ioqK/zQ0NP8RERH/BwcH/wYGBv8GBgb/CwsL/x4eHv9YWFj/wMDA//z8/P///////////////////////////////////////////////////////////////////////////////+n///88////iv///////////////////////////////////////////////////////////////////////////v7+//j4+P/29vb/+/v7/9LS0v9MTEz/DAwM/wgICP8dHR3/Pz8//1NTU/9MTEz/Li4u/w8PD/8HBwf/Hh4e/5GRkf/4+Pj///////////////////////////////////////////////////////////////////////////////+K////yv///////////////////////////////////////////////////////////////+Tk5P+lpaX/bGxs/09PT/9ISEj/V1dX/zQ0NP8JCQn/Ghoa/3Nzc//Ly8v/8PDw//n5+f/39/f/4uLi/6SkpP89PT3/CgoK/xMTE/+Pj4///Pz8///////////////////////////////////////////////////////////////////////////J////7f/////////////////////////////////////////////////////09PT/nJyc/zY2Nv8ODg7/BQUF/wYGBv8GBgb/BQUF/wgICP8LCwv/Li4u/7u7u//8/Pz////////////////////////////g4OD/V1dX/woKCv8cHBz/u7u7///////////////////////////////////////////////////////////////////////////t/////P///////////////////////////////////////////////+3t7f9ubm7/ERER/wgICP8fHx//U1NT/3x8fP+Hh4f/cHBw/z8/P/8TExP/CQkJ/x0dHf9xcXH/19fX//7+/v//////////////////////4ODg/z8/P/8HBwf/VVVV//X19f/////////////////////////////////////////////////////////////////////8////////////////////////////////////////////////+Pj4/3V1df8MDAz/Dw8P/11dXf/Kysr/+Pj4/////////////v7+/+7u7v+pqan/QUFB/wwMDP8ICAj/LCws/46Ojv/p6en//////////////////////6ioqP8RERH/GBgY/5CQkP/a2tr/+/v7////////////////////////////////////////////////////////////////////////////////////////////////////////////rKys/xUVFf8ODg7/d3d3//Ly8v//////////////////////////////////////6Ojo/46Ojv8sLCz/CAgI/w0NDf9BQUH/rKys//X19f///////////+fn5/80NDT/CgoK/w4ODv8nJyf/cnJy/9ra2v/////////////////////////////////////////////////////////////////////////////////////////////////w8PD/SEhI/wcHB/9QUFD/7e3t///////////////////////39/f/2NjY//Dw8P////////////7+/v/X19f/b29v/xwcHP8HBwf/FBQU/2FhYf/m5ub///////r6+v9WVlb/CQkJ/xEREf8MDAz/CAgI/zY2Nv+9vb3////////////////////////////////////////////////////////////////////////////////////////////Dw8P/GBgY/xQUFP+0tLT//////////////////f39/8/Pz/9lZWX/IiIi/09PT/+8vLz/+fn5////////////+vr6/7+/v/9TU1P/EhIS/w4ODv+wsLD///////39/f9hYWH/BgYG/1dXV/+Kior/JCQk/wgICP8rKyv/xcXF//////////////////////////////////////////////////////////////////////////////////////+UlJT/CQkJ/zU1Nf/o6Oj////////////j4+P/g4OD/yUlJf8ICAj/Dw8P/xkZGf8YGBj/a2tr/9TU1P/+/v7////////////z8/P/g4OD/xAQEP+rq6v///////39/f9hYWH/BQUF/25ubv//////v7+//zAwMP8HBwf/SEhI/+rq6v////////////////////////////////////////////////////////////////////////////////96enr/BQUF/1BQUP/4+Pj/8fHx/6Ghof85OTn/CwsL/wkJCf8zMzP/mpqa/8rKyv9qamr/GRkZ/ykpKf+Kior/5+fn////////////sbGx/xISEv+rq6v///////39/f9hYWH/BQUF/21tbf///////////7Kysv8aGhr/DQ0N/5qamv////////////////////////////////////////////////////////////////////////////////95eXn/BgYG/05OTv+3t7f/UVFR/xAQEP8HBwf/ISEh/3t7e//e3t7////////////7+/v/pqam/x0dHf8JCQn/Ozs7/6enp//39/f/sbGx/xISEv+rq6v///////39/f9hYWH/BQUF/21tbf////////////n5+f9jY2P/BgYG/0xMTP/09PT///////////////////////////////////////////////////////////////////////////+RkZH/CwsL/xgYGP8ZGRn/BwcH/xUVFf9dXV3/yMjI//z8/P////////////b29v+ysrL/RkZG/xMTE/9AQED/NDQ0/xISEv9ZWVn/e3t7/xMTE/+rq6v///////39/f9hYWH/BQUF/21tbf////////////////+srKz/Dw8P/yQkJP/Z2dn///////////////////////////////////////////////////////////////////////////+zs7P/EhIS/wsLC/8NDQ3/Q0ND/66urv/29vb////////////9/f3/y8vL/2BgYP8VFRX/LS0t/5SUlP/s7Oz/4uLi/4CAgP8iIiL/Dg4O/xAQEP+rq6v///////39/f9hYWH/BQUF/21tbf/////////////////Q0ND/HR0d/xUVFf/CwsL///////////////////////////////////////////////////////////////////////X19f9mZmb/CwsL/xcXF/+BgYH/6urq/////////////////+Dg4P99fX3/ISEh/w4ODv9tbW3/3Nzc//////////////////39/f/Ozs7/V1dX/w8PD/+rq6v///////39/f9hYWH/BQUF/21tbf/////////////////W1tb/ISEh/xMTE/+9vb3//////////////////////////////////////////////////////////////////////6mpqf8TExP/EBAQ/4uLi//7+/v////////////v7+//nJyc/zIyMv8UFBT/ICAg/x4eHv/R0dH/////////////////////////////////tLS0/xMTE/+rq6v///////39/f9hYWH/BQUF/21tbf/////////////////Dw8P/FhYW/xsbG//MzMz/////////////////////////////////////////////////////////////////9PT0/05OTv8GBgb/U1NT//Hx8f///////////8XFxf9MTEz/EhIS/z09Pf+tra3/fn5+/xwcHP/S0tL/////////////////////////////////tbW1/xMTE/+rq6v//////9vb2/9DQ0P/BAQE/3h4eP////////////////+MjIz/CQkJ/zQ0NP/n5+f/////////////////////////////////////////////////////////////////0NDQ/x4eHv8RERH/ra2t////////////+Pj4/1NTU/8EBAT/YGBg/+jo6P//////iIiI/xsbG//S0tL/////////////////////////////////tbW1/xQUFP+ZmZn/m5ub/y8vL/8VFRX/Xl5e/9jY2P///////////+Li4v85OTn/BwcH/29vb//+/v7/////////////////////////////////////////////////////////////////rKys/w4ODv8oKCj/3d3d////////////9fX1/0hISP8HBwf/iIiI////////////iIiI/xsbG//R0dH/////////////////////////////////tLS0/xISEv8iIiL/EhIS/0FBQf+urq7/9vb2////////////8/Pz/25ubv8LCwv/ICAg/8fHx///////////////////////////////////////////////////////////////////////mpqa/wkJCf83Nzf/6+vr////////////9fX1/0lJSf8HBwf/iIiI////////////iYmJ/w4ODv9ubm7/3Nzc//////////////////39/f/Ozs7/V1dX/wsLC/8sLCz/kZGR/+rq6v/////////////////f39//a2tr/xAQEP8PDw//hYWF//39/f//////////////////////////////////////////////////////////////////////oKCg/wsLC/8yMjL/5+fn////////////9fX1/0lJSf8HBwf/iIiI////////////iYmJ/wsLC/8ODg7/LS0t/5WVlf/s7Oz/4uLi/4GBgf8hISH/Gxsb/3Nzc//Z2dn//v7+////////////7+/v/52dnf81NTX/CwsL/wsLC/8gICD/0tLS////////////////////////////////////////////////////////////////////////////vLy8/xMTE/8cHBz/y8vL////////////9fX1/0lJSf8HBwf/iIiI////////////iYmJ/xkZGf+IiIj/RkZG/xEREf8+Pj7/NjY2/xQUFP9XV1f/wsLC//v7+/////////////n5+f+5ubn/TU1N/w8PD/8ICAj/HR0d/xMTE/8SEhL/tbW1////////////////////////////////////////////////////////////////////////////4+Pj/zExMf8JCQn/hYWF////////////9fX1/0lJSf8HBwf/iIiI////////////iIiI/xsbG//S0tL/7u7u/5OTk/8tLS3/BwcH/y0tLf+/v7///v7+///////9/f3/0dHR/2lpaf8ZGRn/BwcH/xYWFv9jY2P/uLi4/zMzM/8KCgr/n5+f/////////////////////////////////////////////////////////////////////////////v7+/3l5ef8ICAj/Kioq/83Nzf//////9fX1/0lJSf8HBwf/iIiI////////////iIiI/xsbG//S0tL///////7+/v/b29v/dXV1/x8fH/8hISH/f39//87Ozv+Hh4f/Jycn/wgICP8ODg7/R0dH/7Kysv/4+Pj/6enp/zMzM/8KCgr/oKCg/////////////////////////////////////////////////////////////////////////////////9fX1/8vLy//CAgI/0VFRf/V1dX/9vb2/0lJSf8HBwf/iIiI////////////iYmJ/xMTE/+ioqL/+fn5////////////+/v7/8TExP9XV1f/FBQU/xsbG/8MDAz/CQkJ/zExMf+Wlpb/7Ozs////////////0NDQ/x8fH/8SEhL/uLi4//////////////////////////////////////////////////////////////////////////////////////+qqqr/HBwc/wgICP8yMjL/lJSU/z09Pf8HBwf/h4eH////////////jY2N/wcHB/8YGBj/ZmZm/8/Pz//9/f3////////////09PT/qamp/z8/P/8mJib/d3d3/9zc3P//////////////////////kZGR/wsLC/8qKir/3t7e///////////////////////////////////////////////////////////////////////////////////////9/f3/paWl/ycnJ/8HBwf/Dg4O/xAQEP8JCQn/e3t7////////////1NTU/0xMTP8ODg7/CAgI/yYmJv+Dg4P/4+Pj/////////////////+rq6v/a2tr/+vr6///////////////////////c3Nz/NTU1/wcHB/9qamr//Pz8/////////////////////////////////////////////////////////////////////////////////////////////v7+/8vLy/9hYWH/Hx8f/w0NDf8JCQn/U1NT//f39////////////+7u7v+ZmZn/MzMz/woKCv8LCwv/OTk5/6Ghof/x8fH//////////////////////////////////////+fn5/9bW1v/CQkJ/yMjI//Kysr////////////////////////////////////////////////////////////////////////////////////////////////////////////4+Pj/0dHR/3l5ef8PDw//Hx8f/8jIyP//////////////////////3t7e/3t7e/8hISH/BwcH/xEREf9RUVH/urq6//T09P/////////////////09PT/vLy8/0pKSv8LCwv/EhIS/5SUlP/+/v7//////////////////////////////////////////////////////P///////////////////////////////////////////////////////////////+Xl5f83Nzf/CAgI/1xcXP/w8PD///////////////////////z8/P/Jycn/XV1d/xYWFv8JCQn/GRkZ/0lJSf93d3f/iIiI/3d3d/9KSkr/GRkZ/wcHB/8YGBj/iIiI//f39//////////////////////////////////////////////////////8////7f////////////////////////////////////////////////////////////////////+dnZ3/ERER/w4ODv9zc3P/7e3t////////////////////////////+Pj4/6SkpP8fHx//CwsL/wcHB/8FBQX/BgYG/wYGBv8GBgb/ERER/0NDQ/+wsLD/+vr6///////////////////////////////////////////////////////////t////yf/////////////////////////////////////////////////////////////////////19fX/cXFx/w0NDf8NDQ3/Tk5O/7S0tP/o6Oj/+Pj4//n5+f/t7e3/v7+//2FhYf8TExP/CwsL/0BAQP9UVFT/R0dH/1FRUf90dHT/sLCw/+zs7P/////////////////////////////////////////////////////////////////////K////iv//////////////////////////////////////////////////////////////////////////7+/v/3Z2dv8VFRX/BwcH/xQUFP80NDT/T09P/1FRUf86Ojr/GBgY/wcHB/8QEBD/Y2Nj/+Pj4//6+vr/9vb2//n5+f/+/v7///////////////////////////////////////////////////////////////////////////////+K////PP///+n///////////////////////////////////////////////////////////////////////////j4+P+urq7/S0tL/xkZGf8JCQn/BgYG/wYGBv8ICAj/FRUV/0BAQP+enp7/8vLy/////////////////////////////////////////////////////////////////////////////////////////////////////+j///88////B////6D/////////////////////////////////////////////////////////////////////////////////////8vLy/8XFxf+Xl5f/fn5+/3x8fP+RkZH/vb29/+zs7P///////////////////////////////////////////////////////////////////////////////////////////////////////////////57///8G////AP///zL////h////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4f///zL///8A////AP///wD///9l////9P/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////0////Zf///wD///8AAAAAAP///wD///8G////ef////T///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////T///95////Bv///wAAAAAAAAAAAAAAAAD///8A////Bv///2X////i////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4f///2X///8G////AAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wH///8y////nv///+n////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v///+r///+h////Mv///wH///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////B////zv///+K////yv///+3////8/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////P///+3////J////iv///zv///8H////AP///wAAAAAAAAAAAAAAAAAAAAAA/AAAAAA/AADwAAAAAA8AAOAAAAAABwAAwAAAAAADAADAAAAAAAMAAIAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAAABAADAAAAAAAMAAMAAAAAAAwAA4AAAAAAHAADwAAAAAA8AAPwAAAAAPwAAKAAAAEAAAACAAAAAAQAgAAAAAAAAQAAAKrEAACqxAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wT///8q////bP///6v////Y////8P////3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3////w////2P///63///9t////Kf///wT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////BP///zr///+Z////3/////v/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+////9////+X////Nv///wT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////Gv///4n////q/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+n///+J////G////wD///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////N////8L////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v///8L///82////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////Q////9r/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////2f///0P///8A////AAAAAAAAAAAAAAAAAP///wD///8A////N////9n////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////Z////N////wD///8AAAAAAAAAAAD///8A////G////8H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8H///8b////AAAAAAD///8A////A////4n/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////if///wL///8A////AP///zf////o////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9fX1/9XV1f+0tLT/np6e/5qamv+kpKT/v7+//+Li4v/7+/v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+n///86////AP///wP///+X///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////o6Oj/m5ub/09PT/8jIyP/EhIS/w0NDf8MDAz/Dg4O/xYWFv8uLi7/ZWVl/7i4uP/29vb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////mP///wP///8q////3v////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v7+/+1tbX/QUFB/w4ODv8JCQn/CgoK/woKCv8JCQn/CQkJ/wkJCf8KCgr/CgoK/wkJCf8XFxf/Y2Nj/9fX1////////////////////////////////////////////////////////////////////////////////////////////////////////////////97///8q////bP////v//////////////////////////////////////////////////////////////////////////////////////////////////////v7+//v7+//7+/v//v7+//f39/+Ojo7/HBwc/woKCv8LCwv/CwsL/x8fH/9DQ0P/Xl5e/2VlZf9WVlb/NjY2/xUVFf8KCgr/CwsL/woKCv81NTX/v7+////////////////////////////////////////////////////////////////////////////////////////////////////////////7////bP///63///////////////////////////////////////////////////////////////////////////////////////////Dw8P/CwsL/jY2N/2hoaP9VVVX/VFRU/2ZmZv9iYmL/FRUV/wsLC/8NDQ3/Jycn/35+fv/Nzc3/8fHx//z8/P/9/f3/+vr6/+np6f+3t7f/Xl5e/xUVFf8LCwv/CgoK/ywsLP/CwsL//////////////////////////////////////////////////////////////////////////////////////////////////////////6v////Y////////////////////////////////////////////////////////////////////////////////8fHx/6Wlpf9ISEj/GRkZ/wsLC/8JCQn/CQkJ/wkJCf8JCQn/CgoK/wwMDP8MDAz/ICAg/7Kysv/+/v7///////////////////////////////////////b29v+hoaH/JCQk/wsLC/8KCgr/PDw8/97e3v/////////////////////////////////////////////////////////////////////////////////////////////////////Y////8P//////////////////////////////////////////////////////////////////////////1dXV/1lZWf8SEhL/CgoK/wsLC/8JCQn/CwsL/w8PD/8PDw//DAwM/wkJCf8LCwv/DQ0N/xAQEP9FRUX/ra2t//X19f///////////////////////////////////////////7Gxsf8iIiL/CwsL/woKCv92dnb//f39////////////////////////////////////////////////////////////////////////////////////////////////8P////3/////////////////////////////////////////////////////////////////////xsbG/zc3N/8KCgr/DAwM/wsLC/8jIyP/W1tb/42Njf+np6f/qqqq/5OTk/9lZWX/LCws/wwMDP8LCwv/CgoK/xUVFf9dXV3/x8fH//z8/P//////////////////////////////////////lJSU/xEREf8LCwv/JCQk/9HR0f////////////////////////////////////////////////////////////////////////////////////////////////3/////////////////////////////////////////////////////////////////////1dXV/zg4OP8KCgr/CwsL/xgYGP9ubm7/0NDQ//r6+v///////////////////////Pz8/9zc3P+Dg4P/Jycn/woKCv8LCwv/CgoK/yEhIf95eXn/3d3d/////////////////////////////////+3t7f9GRkb/CgoK/wwMDP9ycnL/4ODg//r6+v//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8fHx/1lZWf8KCgr/CwsL/yIiIv+jo6P/+fn5/////////////////////////////////////////////f39/9DQ0P9nZ2f/GRkZ/woKCv8LCwv/CwsL/zIyMv+Xl5f/7e3t////////////////////////////mZmZ/w4ODv8NDQ3/ERER/ysrK/9kZGT/ubm5//f39////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6Ghof8RERH/DAwM/xgYGP+jo6P/////////////////////////////////////////////////////////////////+Pj4/7e3t/9MTEz/EBAQ/woKCv8LCwv/EBAQ/0lJSf+1tbX/+Pj4/////////////////8/Pz/8eHh7/DAwM/w0NDf8LCwv/CQkJ/xgYGP9paWn/3Nzc/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/9FRUX/CgoK/wsLC/9wcHD/+fn5//////////////////////////////////f39//S0tL/4ODg//7+/v//////////////////////7u7u/5ubm/81NTX/DAwM/wsLC/8KCgr/FxcX/3l5ef/39/f////////////n5+f/MTEx/wsLC/8ODg7/ERER/wsLC/8LCwv/CgoK/z4+Pv/Kysr///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7//FxcX/wsLC/8lJSX/0tLS/////////////////////////////f39/9HR0f9nZ2f/ICAg/zIyMv+Tk5P/6+vr////////////////////////////39/f/319ff8jIyP/CgoK/woKCv8iIiL/2NjY////////////6+vr/zk5Of8KCgr/GRkZ/4yMjP9eXl7/ExMT/wsLC/8KCgr/ODg4/9HR0f//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ioqK/wsLC/8JCQn/XFxc//r6+v//////////////////////5OTk/4WFhf8nJyf/CgoK/wsLC/8HBwf/DQ0N/0VFRf+xsbH/9vb2///////////////////////8/Pz/ysrK/1xcXP8PDw//ICAg/9PT0////////////+vr6/85OTn/CQkJ/xsbG//Kysr/9/f3/5eXl/8fHx//CwsL/woKCv9QUFD/7e3t/////////////////////////////////////////////////////////////////////////////////////////////////////////////f39/2RkZP8JCQn/CwsL/4+Pj//////////////////y8vL/o6Oj/zo6Ov8NDQ3/CwsL/woKCv8WFhb/S0tL/y0tLf8ICAj/FRUV/2BgYP/Kysr//Pz8///////////////////////U1NT/ISEh/x8fH//T09P////////////r6+v/OTk5/wkJCf8bGxv/ycnJ///////+/v7/pKSk/xoaGv8MDAz/Dg4O/5KSkv////////////////////////////////////////////////////////////////////////////////////////////////////////////n5+f9RUVH/CQkJ/w8PD/+oqKj///////r6+v+/v7//U1NT/xISEv8KCgr/CwsL/w4ODv9CQkL/rKys//T09P/X19f/b29v/xwcHP8ICAj/IyMj/319ff/f39//////////////////2dnZ/yIiIv8fHx//09PT////////////6+vr/zk5Of8JCQn/Gxsb/8nJyf////////////v7+/99fX3/DAwM/woKCv81NTX/5OTk///////////////////////////////////////////////////////////////////////////////////////////////////////5+fn/UVFR/wkJCf8PDw//qqqq/9ra2v9wcHD/HBwc/woKCv8LCwv/CwsL/y0tLf+Pj4//6enp//////////////////v7+//AwMD/QUFB/woKCv8LCwv/NTU1/5ubm//u7u7//////9jY2P8iIiL/Hx8f/9PT0////////////+vr6/85OTn/CQkJ/xsbG//Jycn/////////////////39/f/zMzM/8KCgr/EBAQ/6ampv///////////////////////////////////////////////////////////////////////////////////////////////////////f39/2JiYv8JCQn/Dg4O/0hISP8vLy//CwsL/wsLC/8KCgr/HR0d/3Fxcf/X19f//v7+///////////////////////w8PD/oqKi/zIyMv8KCgr/Dg4O/woKCv8ODg7/TExM/7q6uv/S0tL/IyMj/x8fH//T09P////////////r6+v/OTk5/wkJCf8bGxv/ycnJ//////////////////////94eHj/CgoK/wkJCf9qamr//v7+//////////////////////////////////////////////////////////////////////////////////////////////////////+FhYX/CgoK/w0NDf8LCwv/CwsL/woKCv8SEhL/VFRU/8DAwP/6+vr///////////////////////n5+f+7u7v/T09P/xAQEP8KCgr/ODg4/5qamv+Ghob/Jycn/wcHB/8aGhr/T09P/xgYGP8gICD/09PT////////////6+vr/zk5Of8JCQn/Gxsb/8nJyf//////////////////////sbGx/xISEv8JCQn/RERE//Ly8v//////////////////////////////////////////////////////////////////////////////////////////////////////qamp/xAQEP8NDQ3/DAwM/w0NDf87Ozv/pKSk//Ly8v///////////////////////f39/9PT0/9ra2v/Ghoa/wcHB/8lJSX/gYGB/+Li4v///////f39/9HR0f9oaGj/GBgY/wcHB/8LCwv/ISEh/9PT0////////////+vr6/85OTn/CQkJ/xsbG//Jycn//////////////////////8zMzP8cHBz/CgoK/zExMf/n5+f/////////////////////////////////////////////////////////////////////////////////////////////////7e3t/1VVVf8MDAz/DAwM/xcXF/96enr/5OTk////////////////////////////5ubm/4qKiv8pKSn/CgoK/xQUFP9jY2P/zs7O//39/f//////////////////////+Pj4/7e3t/9LS0v/Dg4O/yAgIP/T09P////////////r6+v/OTk5/wkJCf8bGxv/ycnJ///////////////////////T09P/ICAg/woKCv8tLS3/5OTk/////////////////////////////////////////////////////////////////////////////////////////////////4yMjP8ODg7/DAwM/xcXF/+Xl5f/+fn5///////////////////////z8/P/p6en/z09Pf8LCwv/CgoK/woKCv9CQkL/7e3t////////////////////////////////////////////1NTU/yIiIv8fHx//09PT////////////6+vr/zk5Of8JCQn/Gxsb/8nJyf//////////////////////x8fH/xkZGf8KCgr/NjY2/+rq6v///////////////////////////////////////////////////////////////////////////////////////////9ra2v8sLCz/CwsL/w0NDf97e3v/+vr6//////////////////v7+//CwsL/V1dX/xISEv8ICAj/NTU1/1hYWP8MDAz/SEhI//X19f///////////////////////////////////////////97e3v8lJSX/Hx8f/9PT0////////////+vr6/85OTn/CQkJ/xoaGv/Jycn//////////////////////6Kiov8ODg7/CQkJ/05OTv/39/f///////////////////////////////////////////////////////////////////////////////////////////+Pj4//DAwM/woKCv86Ojr/5OTk/////////////////+3t7f94eHj/Hh4e/wkJCf8gICD/eXl5/+Dg4P+tra3/DAwM/0hISP/09PT////////////////////////////////////////////d3d3/JSUl/x8fH//T09P///////f39/+pqan/ISEh/wkJCf8hISH/1NTU//////////////////r6+v9hYWH/CQkJ/woKCv98fHz////////////////////////////////////////////////////////////////////////////////////////////19fX/Tk5O/wkJCf8MDAz/jo6O//////////////////////+pqan/Dg4O/wkJCf86Ojr/xcXF//z8/P//////ra2t/wwMDP9ISEj/9PT0////////////////////////////////////////////3d3d/yUlJf8fHx//0dHR/83Nzf9gYGD/FhYW/wkJCf8qKir/l5eX//r6+v/////////////////Hx8f/ISEh/wsLC/8XFxf/vb29////////////////////////////////////////////////////////////////////////////////////////////39/f/yoqKv8KCgr/HR0d/8vLy///////////////////////mZmZ/wwMDP8JCQn/ZWVl//39/f///////////62trf8MDAz/SEhI//X19f///////////////////////////////////////////97e3v8mJib/GBgY/11dXf8kJCT/BwcH/xsbG/9ubm7/1dXV//7+/v/////////////////t7e3/VFRU/woKCv8KCgr/Tk5O//Ly8v///////////////////////////////////////////////////////////////////////////////////////////8nJyf8aGhr/CgoK/zIyMv/n5+f//////////////////////5qamv8MDAz/CQkJ/2ZmZv/9/f3///////////+tra3/DQ0N/0JCQv/u7u7////////////////////////////////////////////U1NT/IyMj/wsLC/8ICAj/ERER/1JSUv++vr7/+fn5///////////////////////w8PD/cXFx/w4ODv8LCwv/GRkZ/7W1tf////////////////////////////////////////////////////////////////////////////////////////////////+/v7//FRUV/woKCv89PT3/7u7u//////////////////////+ampr/DAwM/wkJCf9mZmb//f39////////////ra2t/w8PD/8VFRX/Y2Nj/87Ozv/9/f3///////////////////////j4+P+5ubn/S0tL/w0NDf8MDAz/Ojo6/6Kiov/x8fH///////////////////////7+/v/U1NT/Xl5e/w8PD/8MDAz/Dw8P/319ff/6+vr/////////////////////////////////////////////////////////////////////////////////////////////////xcXF/xgYGP8KCgr/ODg4/+vr6///////////////////////mpqa/wwMDP8JCQn/ZmZm//39/f///////////62trf8QEBD/CwsL/wcHB/8lJSX/goKC/+Li4v///////f39/9HR0f9oaGj/GRkZ/wcHB/8mJib/hISE/+Pj4////////////////////////////+fn5/+NjY3/Kysr/wsLC/8NDQ3/DAwM/yIiIv/T09P//////////////////////////////////////////////////////////////////////////////////////////////////////9fX1/8jIyP/CgoK/yQkJP/Y2Nj//////////////////////5qamv8MDAz/CQkJ/2ZmZv/9/f3///////////+tra3/Dg4O/yoqKv9JSUn/EBAQ/woKCv84ODj/mpqa/4aGhv8oKCj/BwcH/xgYGP9mZmb/0NDQ//39/f//////////////////////9PT0/6mpqf9AQED/Dg4O/wsLC/8LCwv/CwsL/w0NDf8TExP/tLS0///////////////////////////////////////////////////////////////////////////////////////////////////////v7+//Pz8//woKCv8QEBD/qKio//////////////////////+ampr/DAwM/wkJCf9mZmb//f39////////////ra2t/wwMDP9JSUn/5eXl/5+fn/83Nzf/CgoK/w0NDf8NDQ3/DAwM/0hISP+5ubn/+Pj4///////////////////////7+/v/xcXF/1lZWf8UFBT/CgoK/wsLC/8NDQ3/Pj4+/zk5Of8LCwv/CwsL/5KSkv///////////////////////////////////////////////////////////////////////////////////////////////////////////3h4eP8KCgr/CgoK/1hYWP/19fX/////////////////mpqa/wwMDP8JCQn/ZmZm//39/f///////////62trf8MDAz/SEhI//T09P//////4eHh/4GBgf8kJCT/CgoK/w4ODv9fX1//19fX//7+/v/////////////////a2tr/dnZ2/x8fH/8KCgr/CwsL/woKCv8pKSn/iYmJ/+jo6P97e3v/CQkJ/wkJCf+BgYH////////////////////////////////////////////////////////////////////////////////////////////////////////////ExMT/HBwc/wsLC/8WFhb/qKio/////////////////5qamv8MDAz/CQkJ/2ZmZv/9/f3///////////+tra3/DAwM/0hISP/09PT////////////9/f3/zc3N/2NjY/8XFxf/CAgI/yoqKv+Kior/5+fn/+zs7P+UlJT/MDAw/wsLC/8LCwv/CgoK/xoaGv9qamr/0tLS//39/f//////eHh4/wkJCf8JCQn/goKC////////////////////////////////////////////////////////////////////////////////////////////////////////////+Pj4/2ZmZv8KCgr/CwsL/y4uLv/IyMj///////////+ampr/DAwM/wkJCf9mZmb//f39////////////ra2t/wwMDP9ERET/8fHx///////////////////////39/f/s7Oz/0hISP8NDQ3/CwsL/zw8PP9BQUH/Dw8P/wsLC/8KCgr/ERER/05OTv+6urr/+fn5////////////+/v7/15eXv8JCQn/DAwM/5aWlv/////////////////////////////////////////////////////////////////////////////////////////////////////////////////U1NT/Ly8v/woKCv8LCwv/NDQ0/7a2tv//////mpqa/w0NDf8JCQn/ZmZm//39/f///////////62trf8PDw//GRkZ/3h4eP/d3d3////////////////////////////s7Oz/lpaW/zExMf8JCQn/CAgI/wsLC/8MDAz/Nzc3/56env/w8PD//////////////////////+bm5v80NDT/CgoK/xQUFP+5ubn//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7CwsP8hISH/CgoK/wsLC/8dHR3/dnZ2/3Fxcf8NDQ3/CQkJ/2VlZf/9/f3///////////+ysrL/Dw8P/wsLC/8LCwv/MjIy/5eXl//t7e3////////////////////////////c3Nz/eHh4/yUlJf8oKCj/f39//+Hh4f////////////////////////////////+oqKj/EhIS/woKCv8wMDD/4+Pj///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/q6ur/ycnJ/8KCgr/CwsL/wsLC/8RERH/DQ0N/wkJCf9bW1v/+/v7////////////5ubm/1dXV/8QEBD/CgoK/wsLC/8PDw//SUlJ/7S0tP/39/f///////////////////////v7+//W1tb/2NjY//z8/P/////////////////////////////////p6en/R0dH/woKCv8KCgr/cnJy//39/f////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////7+/v/Hx8f/UFBQ/xEREf8JCQn/CwsL/w0NDf8KCgr/Pj4+/+7u7v/////////////////v7+//nJyc/zU1Nf8MDAz/CwsL/woKCv8YGBj/ZGRk/83Nzf/9/f3////////////////////////////////////////////////////////////39/f/e3t7/w4ODv8LCwv/IyMj/8vLy////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+/v7/+lpaX/UlJS/yIiIv8ODg7/DAwM/xwcHP/Gxsb////////////////////////////g4OD/fn5+/yMjI/8KCgr/CwsL/woKCv8lJSX/gYGB/+Hh4f/////////////////////////////////////////////////w8PD/gYGB/xQUFP8MDAz/DQ0N/4ODg//9/f3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////b29v/T09P/TU1N/woKCv8LCwv/c3Nz//39/f////////////////////////////z8/P/Ly8v/YGBg/xYWFv8KCgr/CwsL/wwMDP84ODj/nZ2d/+jo6P/+/v7///////////////////////X19f+/v7//VlZW/xAQEP8MDAz/CgoK/1lZWf/s7Oz///////////////////////////////////////////////////////////////////////////3//////////////////////////////////////////////////////////////////////////////////////////6enp/8RERH/CwsL/yAgIP++vr7///////////////////////////////////////b29v+wsLD/RUVF/w8PD/8LCwv/CgoK/xAQEP85OTn/cXFx/5ubm/+srKz/pKSk/4ODg/9OTk7/Ghoa/woKCv8LCwv/DAwM/1NTU//f39////////////////////////////////////////////////////////////////////////////3////w///////////////////////////////////////////////////////////////////////////////////////////u7u7/TExM/woKCv8LCwv/PDw8/9LS0v///////////////////////////////////////////+vr6/+UlJT/MjIy/w4ODv8NDQ3/CgoK/wkJCf8NDQ3/Dw8P/w4ODv8KCgr/CgoK/wsLC/8JCQn/Ghoa/3V1df/o6Oj////////////////////////////////////////////////////////////////////////////////w////2P///////////////////////////////////////////////////////////////////////////////////////////////8DAwP8iIiL/CwsL/wsLC/87Ozv/v7+///z8/P//////////////////////////////////////+fn5/42Njf8SEhL/DQ0N/wwMDP8JCQn/CQkJ/wkJCf8JCQn/CQkJ/wwMDP8fHx//WVlZ/7u7u//5+fn/////////////////////////////////////////////////////////////////////////////////////2P///6v////////////////////////////////////////////////////////////////////////////////////////////////+/v7/nZ2d/xoaGv8LCwv/CwsL/yAgIP92dnb/yMjI/+/v7//8/Pz//f39//v7+//s7Oz/v7+//2dnZ/8cHBz/DAwM/woKCv8kJCT/bW1t/19fX/9SUlL/WFhY/25ubv+ZmZn/zs7O//f39////////////////////////////////////////////////////////////////////////////////////////////////63///9s////+/////////////////////////////////////////////////////////////////////////////////////////////////v7+/+dnZ3/ISEh/woKCv8LCwv/CwsL/xwcHP8/Pz//XFxc/2VlZf9ZWVn/Ojo6/xgYGP8KCgr/CwsL/woKCv8tLS3/sbGx//7+/v/8/Pz/+vr6//v7+//+/v7///////////////////////////////////////////////////////////////////////////////////////////////////////////v///9s////Kv///97//////////////////////////////////////////////////////////////////////////////////////////////////////f39/7+/v/9LS0v/EBAQ/wkJCf8KCgr/CgoK/wkJCf8JCQn/CQkJ/woKCv8KCgr/CQkJ/xQUFP9ZWVn/zs7O///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////e////Kv///wP///+Y////////////////////////////////////////////////////////////////////////////////////////////////////////////////7e3t/6Wlpf9WVlb/JiYm/xMTE/8NDQ3/DAwM/w4ODv8UFBT/Kioq/11dXf+xsbH/8/Pz////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////l////wP///8A////Ov///+n/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/f3/9ra2v+4uLj/oKCg/5mZmf+ioqL/u7u7/97e3v/5+fn/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6P///zf///8A////AP///wL///+J/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4n///8D////AAAAAAD///8A////G////8H//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8H///8b////AAAAAAAAAAAA////AP///wD///83////2f///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9n///83////AP///wAAAAAAAAAAAAAAAAD///8A////AP///0P////Z/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9r///9D////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////Nv///8L////+/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v///8L///83////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wD///8b////if///+n/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////6v///4n///8a////AP///wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wT///82////l////97////7//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////v////f////mf///zr///8E////AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA////AP///wT///8p////bP///63////Y////8P////3///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////3////w////2P///6v///9s////Kv///wT///8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/gAAAAAAB//4AAAAAAAB//AAAAAAAAD/4AAAAAAAAH/AAAAAAAAAP4AAAAAAAAAfAAAAAAAAAA4AAAAAAAAABgAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAAABgAAAAAAAAAHAAAAAAAAAA+AAAAAAAAAH8AAAAAAAAA/4AAAAAAAAH/wAAAAAAAA//gAAAAAAAH//gAAAAAAB/w==\"},{\"name\":\"Gemini\",\"url\":\"https://gemini.google.com/app?q=%s\",\"favicon\":\"https://a.favicon.im/gemini.google.com\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAMAAAD04JH5AAABiVBMVEVHcEyPl5iTkKTatS6Pv1/pZFjocVDxpyGS0Vyw0Uk/i/BLlOjmvSTZxS43iP3ubEf3bDzewi82iP83iP0xhv8vvmPjxSjyUE31SkoluXXTyzVIvnX1SksRuWYbtIA0v2b2mCJyy2PwfzSKfs03o8msc6tph+kxhv8yh/82h/89h/01if07ke44i/k4jfVHifk7leVViPE7mdo7nc5nh+X2vhgUuWc6ocPdW2zrUlrwTVF3hNlGqaz4RUQlsoUdtnR9yWfnWF5QspX0sxuFgs2SfMHqxyNdvIBEpbn0SUvTYHliwXUwqaisdKdWt4pHjfLKZoQ0u3Jwxm3Ba480pbWgeLQrrpeh0VOLy162b5w+tYdCrp5xwXJTraDXzTFLwHDC0D7rmSxdj+Spwkt2jtHaaW5NmduohKNRn8jkfUu/eo3rijbDwzrTd3HXpzl1p5t1m7p2uHezmXNkl9LGh3VfpLO9tUXQmE6UhrnXiVWjsGCtj4+Kkbhpsoq6pViSpIeMsHSUmZ5HcEz0t47pAAAAg3RSTlMACQP9/v7+/P7+Q/79+qZEH2YfbN4gpWykbzBJ2aHa4uatrbGwYN//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ADoltewAAAh5SURBVHic7Zv5VxJrGMeHAbeUgFvulrdu97IobhiaFpiYS6lImSnuoqgEYm64ov7n93neZWZYVFRm5tx7+pKnc/rl83m/z/vOjECC8Du/85+OaK2rs+opYP0A0dFArEOBOv0EBOR/GNOPb6UC+s2glvDHanUTaCL8sSa9+AZawFifQSeBWsbv02sGdAJ9fX06zcDKC3j3Tp9zUCfx3+lzLZL5H3v14NeyDYD8Xj224ZiigN7P2vMtEr8X+J8tmgs0KdYPAlNa8y1jfAN8JPwprStoYnw6gKmpb3Pa8i3yAaD8b3N/ayrA188EgD83oSW/Vp4/G8DcxISGFYjy+j8z/tzE9++iZgJ10v7jGwD53//Sim/J6p/xP316opFAHv4E8oeGNMGLdWT8uXwQ0GQIlpv5/f0aDMFA6r+B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\"},{\"name\":\"Grok\",\"url\":\"https://grok.com/?q=%s\",\"favicon\":\"https://a.favicon.im/grok.com\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zMDRfMTExKSI+Cjxmb3JlaWduT2JqZWN0IHg9Ii0yNCIgeT0iLTIyIiB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImJhY2tkcm9wLWZpbHRlcjpibHVyKDE2cHgpO2NsaXAtcGF0aDp1cmwoI2JnYmx1cl8xXzMwNF8xMTFfY2xpcF9wYXRoKTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlIj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8zMDRfMTExKSIgZGF0YS1maWdtYS1iZy1ibHVyLXJhZGl1cz0iMzIiPgo8cGF0aCBkPSJNMCAyNTZDMCAxNjYuMzkyIDAgMTIxLjU4NyAxNy40MzkgODcuMzYxNUMzMi43Nzg3IDU3LjI1NTYgNTcuMjU1NiAzMi43Nzg3IDg3LjM2MTUgMTcuNDM5QzEyMS41ODcgMCAxNjYuMzkyIDAgMjU2IDBDMzQ1LjYwOCAwIDM5MC40MTMgMCA0MjQuNjM4IDE3LjQzOUM0NTQuNzQ0IDMyLjc3ODcgNDc5LjIyMSA1Ny4yNTU2IDQ5NC41NjEgODcuMzYxNUM1MTIgMTIxLjU4NyA1MTIgMTY2LjM5MiA1MTIgMjU2QzUxMiAzNDUuNjA4IDUxMiAzOTAuNDEzIDQ5NC41NjEgNDI0LjYzOEM0NzkuMjIxIDQ1NC43NDQgNDU0Ljc0NCA0NzkuMjIxIDQyNC42MzggNDk0LjU2MUMzOTAuNDEzIDUxMiAzNDUuNjA4IDUxMiAyNTYgNTEyQzE2Ni4zOTIgNTEyIDEyMS41ODcgNTEyIDg3LjM2MTUgNDk0LjU2MUM1Ny4yNTU2IDQ3OS4yMjEgMzIuNzc4NyA0NTQuNzQ0IDE3LjQzOSA0MjQuNjM4QzAgMzkwLjQxMyAwIDM0NS42MDggMCAyNTZaIiBmaWxsPSIjMDUwNTA1Ii8+CjxwYXRoIGQ9Ik0yNTYgMi41QzMwMC44NDUgMi41IDMzNC4zMjkgMi41MDIyOCAzNjAuODg0IDQuNjcxODhDMzg3LjQxIDYuODM5MTEgNDA2LjgwMiAxMS4xNTYgNDIzLjUwNCAxOS42NjZDNDUzLjEzOSAzNC43NjYxIDQ3Ny4yMzQgNTguODYwNyA0OTIuMzM0IDg4LjQ5NjFDNTAwLjg0NCAxMDUuMTk4IDUwNS4xNjEgMTI0LjU5IDUwNy4zMjggMTUxLjExNkM1MDkuNDk4IDE3Ny42NzEgNTA5LjUgMjExLjE1NSA1MDkuNSAyNTZDNTA5LjUgMzAwLjg0NSA1MDkuNDk4IDMzNC4zMjkgNTA3LjMyOCAzNjAuODg0QzUwNS4xNjEgMzg3LjQxIDUwMC44NDQgNDA2LjgwMiA0OTIuMzM0IDQyMy41MDRDNDc3LjIzNCA0NTMuMTM5IDQ1My4xMzkgNDc3LjIzNCA0MjMuNTA0IDQ5Mi4zMzRDNDA2LjgwMiA1MDAuODQ0IDM4Ny40MSA1MDUuMTYxIDM2MC44ODQgNTA3LjMyOEMzMzQuMzI5IDUwOS40OTggMzAwLjg0NSA1MDkuNSAyNTYgNTA5LjVDMjExLjE1NSA1MDkuNSAxNzcuNjcxIDUwOS40OTggMTUxLjExNiA1MDcuMzI4QzEyNC41OSA1MDUuMTYxIDEwNS4xOTggNTAwLjg0NCA4OC40OTYxIDQ5Mi4zMzRDNTguODYwNyA0NzcuMjM0IDM0Ljc2NjEgNDUzLjEzOSAxOS42NjYgNDIzLjUwNEMxMS4xNTYgNDA2LjgwMiA2LjgzOTExIDM4Ny40MSA0LjY3MTg4IDM2MC44ODRDMi41MDIyOCAzMzQuMzI5IDIuNSAzMDAuODQ1IDIuNSAyNTZDMi41IDIxMS4xNTUgMi41MDIyOCAxNzcuNjcxIDQuNjcxODggMTUxLjExNkM2LjgzOTExIDEyNC41OSAxMS4xNTYgMTA1LjE5OCAxOS42NjYgODguNDk2MUMzNC43NjYxIDU4Ljg2MDcgNTguODYwNyAzNC43NjYxIDg4LjQ5NjEgMTkuNjY2QzEwNS4xOTggMTEuMTU2IDEyNC41OSA2LjgzOTExIDE1MS4xMTYgNC42NzE4OEMxNzcuNjcxIDIuNTAyMjggMjExLjE1NSAyLjUgMjU2IDIuNVoiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjUiLz4KPC9nPgo8L2c+CjxtYXNrIGlkPSJwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjEwLjQ4NCAzMTIuNzU5TDM0My40NjUgMjEwLjM4M0MzNDkuOTg0IDIwNS4zNjQgMzU5LjMwMiAyMDcuMzIyIDM2Mi40MDggMjE1LjExN0MzNzguNzU4IDI1Ni4yMzEgMzcxLjQ1NCAzMDUuNjQgMzM4LjkyNSAzMzkuNTYzQzMwNi4zOTcgMzczLjQ4NyAyNjEuMTM3IDM4MC45MjcgMjE5Ljc2OCAzNjMuOTgzTDE3NC41NzcgMzg1LjgwM0MyMzkuMzk0IDQzMi4wMDggMzE4LjEwNCA0MjAuNTgxIDM2Ny4yODkgMzY5LjI1MUM0MDYuMzAzIDMyOC41NjQgNDE4LjM4NiAyNzMuMTA0IDQwNy4wODggMjIzLjA5MUw0MDcuMTkgMjIzLjE5OEMzOTAuODA3IDE0OS43MjYgNDExLjIxOCAxMjAuMzU5IDQ1My4wMyA2MC4zMDcyQzQ1NC4wMiA1OC44ODMzIDQ1NS4wMSA1Ny40NTk1IDQ1NiA1Nkw0MDAuOTc4IDExMy4zODJWMTEzLjIwNEwyMTAuNDUgMzEyLjc5NCIvPgo8cGF0aCBkPSJNMTgzLjA0MiAzMzcuNjQxQzEzNi41MTkgMjkxLjI5NCAxNDQuNTQgMjE5LjU2NyAxODQuMjM2IDE3OC4yMDNDMjEzLjU5IDE0Ny41OSAyNjEuNjgzIDEzNS4wOTYgMzAzLjY2NiAxNTMuNDY0TDM0OC43NTUgMTMxLjc1QzM0MC42MzIgMTI1LjYyNyAzMzAuMjIxIDExOS4wNDIgMzE4LjI3NSAxMTQuNDE0QzI2NC4yNzcgOTEuMjQwNyAxOTkuNjMgMTAyLjc3NCAxNTUuNzM1IDE0OC41MTZDMTEzLjUxMyAxOTIuNTQ5IDEwMC4yMzYgMjYwLjI1NCAxMjMuMDM2IDMxOC4wMjdDMTQwLjA2OSAzNjEuMjA2IDExMi4xNDggMzkxLjc0OCA4NC4wMjI5IDQyMi41NzVDNzQuMDU2MSA0MzMuNTAzIDY0LjA1NTMgNDQ0LjQzMSA1NiA0NTZMMTgzLjAwNyAzMzcuNjc3Ii8+CjwvbWFzaz4KPHBhdGggZD0iTTIxMC40ODQgMzEyLjc1OUwzNDMuNDY1IDIxMC4zODNDMzQ5Ljk4NCAyMDUuMzY0IDM1OS4zMDIgMjA3LjMyMiAzNjIuNDA4IDIxNS4xMTdDMzc4Ljc1OCAyNTYuMjMxIDM3MS40NTQgMzA1LjY0IDMzOC45MjUgMzM5LjU2M0MzMDYuMzk3IDM3My40ODcgMjYxLjEzNyAzODAuOTI3IDIxOS43NjggMzYzLjk4M0wxNzQuNTc3IDM4NS44MDNDMjM5LjM5NCA0MzIuMDA4IDMxOC4xMDQgNDIwLjU4MSAzNjcuMjg5IDM2OS4yNTFDNDA2LjMwMyAzMjguNTY0IDQxOC4zODYgMjczLjEwNCA0MDcuMDg4IDIyMy4wOTFMNDA3LjE5IDIyMy4xOThDMzkwLjgwNyAxNDkuNzI2IDQxMS4yMTggMTIwLjM1OSA0NTMuMDMgNjAuMzA3MkM0NTQuMDIgNTguODgzMyA0NTUuMDEgNTcuNDU5NSA0NTYgNTZMNDAwLjk3OCAxMTMuMzgyVjExMy4yMDRMMjEwLjQ1IDMxMi43OTQiIGZpbGw9IiNGQ0ZDRkMiLz4KPHBhdGggZD0iTTE4My4wNDIgMzM3LjY0MUMxMzYuNTE5IDI5MS4yOTQgMTQ0LjU0IDIxOS41NjcgMTg0LjIzNiAxNzguMjAzQzIxMy41OSAxNDcuNTkgMjYxLjY4MyAxMzUuMDk2IDMwMy42NjYgMTUzLjQ2NEwzNDguNzU1IDEzMS43NUMzNDAuNjMyIDEyNS42MjcgMzMwLjIyMSAxMTkuMDQyIDMxOC4yNzUgMTE0LjQxNEMyNjQuMjc3IDkxLjI0MDcgMTk5LjYzIDEwMi43NzQgMTU1LjczNSAxNDguNTE2QzExMy41MTMgMTkyLjU0OSAxMDAuMjM2IDI2MC4yNTQgMTIzLjAzNiAzMTguMDI3QzE0MC4wNjkgMzYxLjIwNiAxMTIuMTQ4IDM5MS43NDggODQuMDIyOSA0MjIuNTc1Qzc0LjA1NjEgNDMzLjUwMyA2NC4wNTUzIDQ0NC40MzEgNTYgNDU2TDE4My4wMDcgMzM3LjY3NyIgZmlsbD0iI0ZDRkNGQyIvPgo8cGF0aCBkPSJNMzQzLjQ2NSAyMTAuMzgzTDM0NC4zOCAyMTEuNTcxTDM0NC4zOCAyMTEuNTcxTDM0My40NjUgMjEwLjM4M1pNMzYyLjQwOCAyMTUuMTE3TDM2My44MDIgMjE0LjU2M0wzNjMuODAyIDIxNC41NjJMMzYyLjQwOCAyMTUuMTE3Wk0yMTkuNzY4IDM2My45ODNMMjIwLjMzNyAzNjIuNTk0TDIxOS43MTggMzYyLjM0MUwyMTkuMTE2IDM2Mi42MzJMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjkyNCAzODQuNDUzTDE3MS42NDMgMzg1LjU1NEwxNzMuNzA2IDM4Ny4wMjVMMTc0LjU3NyAzODUuODAzWk0zNjcuMjg5IDM2OS4yNTFMMzY2LjIwNyAzNjguMjEzTDM2Ni4yMDYgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDguMTcxIDIyMi4wNTNMNDA0LjQzNiAyMTguMTU3TDQwNS42MjUgMjIzLjQyMUw0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwNi4xMDggMjI0LjIzNkw0MDkuODIzIDIyOC4xMTFMNDA4LjY1NCAyMjIuODcxTDQwNy4xOSAyMjMuMTk4Wk00NTMuMDMgNjAuMzA3Mkw0NTQuMjYyIDYxLjE2NDNMNDU0LjI2MiA2MS4xNjM0TDQ1My4wMyA2MC4zMDcyWk00NTYgNTZMNDU3LjI0MSA1Ni44NDJMNDU0LjkxNyA1NC45NjE4TDQ1NiA1NlpNNDAwLjk3OCAxMTMuMzgySDM5OS40NzhWMTE3LjExM0w0MDIuMDYxIDExNC40Mkw0MDAuOTc4IDExMy4zODJaTTQwMC45NzggMTEzLjIwNEg0MDIuNDc4VjEwOS40NkwzOTkuODkzIDExMi4xNjhMNDAwLjk3OCAxMTMuMjA0Wk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOCAxNzkuMjQyTDE4NS4zMTkgMTc5LjI0MkwxODQuMjM2IDE3OC4yMDNaTTMwMy42NjYgMTUzLjQ2NEwzMDMuMDY1IDE1NC44MzhMMzAzLjY5NiAxNTUuMTE0TDMwNC4zMTcgMTU0LjgxNUwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS40MDYgMTMzLjEwMUwzNTEuNjI0IDEzMi4wMzNMMzQ5LjY1OCAxMzAuNTUyTDM0OC43NTUgMTMxLjc1Wk0zMTguMjc1IDExNC40MTRMMzE3LjY4MyAxMTUuNzkzTDMxNy43MDggMTE1LjgwM0wzMTcuNzMzIDExNS44MTNMMzE4LjI3NSAxMTQuNDE0Wk0xNTUuNzM1IDE0OC41MTZMMTU0LjY1MyAxNDcuNDc3TDE1NC42NTMgMTQ3LjQ3OEwxNTUuNzM1IDE0OC41MTZaTTEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdMMTI0LjQzMiAzMTcuNDc3TDEyMy4wMzYgMzE4LjAyN1pNODQuMDIyOSA0MjIuNTc1TDgyLjkxNDggNDIxLjU2NEw4Mi45MTQ2IDQyMS41NjRMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTQuNzY5IDQ1NS4xNDNMNTcuMDIyNSA0NTcuMDk4TDU2IDQ1NlpNMjEwLjQ4NCAzMTIuNzU5TDIxMS4zOTkgMzEzLjk0OEwzNDQuMzggMjExLjU3MUwzNDMuNDY1IDIxMC4zODNMMzQyLjU1IDIwOS4xOTRMMjA5LjU2OSAzMTEuNTdMMjEwLjQ4NCAzMTIuNzU5Wk0zNDMuNDY1IDIxMC4zODNMMzQ0LjM4IDIxMS41NzFDMzUwLjIwNCAyMDcuMDg3IDM1OC4zMiAyMDguOTA5IDM2MS4wMTUgMjE1LjY3MkwzNjIuNDA4IDIxNS4xMTdMMzYzLjgwMiAyMTQuNTYyQzM2MC4yODUgMjA1LjczNCAzNDkuNzY0IDIwMy42NCAzNDIuNTUgMjA5LjE5NEwzNDMuNDY1IDIxMC4zODNaTTM2Mi40MDggMjE1LjExN0wzNjEuMDE1IDIxNS42NzFDMzc3LjE2MyAyNTYuMjc5IDM2OS45MzYgMzA1LjA1NSAzMzcuODQyIDMzOC41MjVMMzM4LjkyNSAzMzkuNTYzTDM0MC4wMDggMzQwLjYwMUMzNzIuOTcyIDMwNi4yMjQgMzgwLjM1MyAyNTYuMTgzIDM2My44MDIgMjE0LjU2M0wzNjIuNDA4IDIxNS4xMTdaTTMzOC45MjUgMzM5LjU2M0wzMzcuODQyIDMzOC41MjVDMzA1Ljc2OSAzNzEuOTc0IDI2MS4xNzUgMzc5LjMyMSAyMjAuMzM3IDM2Mi41OTRMMjE5Ljc2OCAzNjMuOTgzTDIxOS4yIDM2NS4zNzFDMjYxLjA5OSAzODIuNTMyIDMwNy4wMjQgMzc1IDM0MC4wMDggMzQwLjYwMUwzMzguOTI1IDMzOS41NjNaTTIxOS43NjggMzYzLjk4M0wyMTkuMTE2IDM2Mi42MzJMMTczLjkyNCAzODQuNDUzTDE3NC41NzcgMzg1LjgwM0wxNzUuMjI5IDM4Ny4xNTRMMjIwLjQyIDM2NS4zMzNMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjcwNiAzODcuMDI1QzIzOS4xNSA0MzMuNjc1IDMxOC42ODkgNDIyLjE0IDM2OC4zNzIgMzcwLjI4OUwzNjcuMjg5IDM2OS4yNTFMMzY2LjIwNiAzNjguMjEzQzMxNy41MiA0MTkuMDIzIDIzOS42MzkgNDMwLjM0IDE3NS40NDcgMzg0LjU4MkwxNzQuNTc3IDM4NS44MDNaTTM2Ny4yODkgMzY5LjI1MUwzNjguMzcyIDM3MC4yODlDNDA3Ljc2NCAzMjkuMjA4IDQxOS45NSAyNzMuMjIxIDQwOC41NTEgMjIyLjc2TDQwNy4wODggMjIzLjA5MUw0MDUuNjI1IDIyMy40MjFDNDE2LjgyMiAyNzIuOTg3IDQwNC44NDIgMzI3LjkyIDM2Ni4yMDcgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDYuMDA1IDIyNC4xMjlMNDA2LjEwOCAyMjQuMjM2TDQwNy4xOSAyMjMuMTk4TDQwOC4yNzMgMjIyLjE2TDQwOC4xNzEgMjIyLjA1M0w0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwOC42NTQgMjIyLjg3MUM0MDAuNTA1IDE4Ni4zMjUgNDAxLjUzOCAxNjAuOTEgNDA5LjcwNSAxMzcuMjA5QzQxNy45MDUgMTEzLjQxNCA0MzMuMzE5IDkxLjI0MjEgNDU0LjI2MiA2MS4xNjQzTDQ1My4wMyA2MC4zMDcyTDQ1MS43OTkgNTkuNDUwMUM0MzAuOTI5IDg5LjQyMzkgNDE1LjIzMiAxMTEuOTYxIDQwNi44NjkgMTM2LjIzMUMzOTguNDczIDE2MC41OTQgMzk3LjQ5MiAxODYuNTk5IDQwNS43MjYgMjIzLjUyNEw0MDcuMTkgMjIzLjE5OFpNNDUzLjAzIDYwLjMwNzJMNDU0LjI2MiA2MS4xNjM0QzQ1NS4yNTEgNTkuNzQwNiA0NTYuMjQ2IDU4LjMwOTcgNDU3LjI0MSA1Ni44NDJMNDU2IDU2TDQ1NC43NTkgNTUuMTU4QzQ1My43NzQgNTYuNjA5MiA0NTIuNzg5IDU4LjAyNjEgNDUxLjc5OSA1OS40NTFMNDUzLjAzIDYwLjMwNzJaTTQ1NiA1Nkw0NTQuOTE3IDU0Ljk2MThMMzk5Ljg5NiAxMTIuMzQ0TDQwMC45NzggMTEzLjM4Mkw0MDIuMDYxIDExNC40Mkw0NTcuMDgzIDU3LjAzODJMNDU2IDU2Wk00MDAuOTc4IDExMy4zODJINDAyLjQ3OFYxMTMuMjA0SDQwMC45NzhIMzk5LjQ3OFYxMTMuMzgySDQwMC45NzhaTTE4My4wNDIgMzM3LjY0MUwxODQuMSAzMzYuNTc4QzEzOC4yNTUgMjkwLjkwNyAxNDYuMDg3IDIyMC4xMjEgMTg1LjMxOCAxNzkuMjQyTDE4NC4yMzYgMTc4LjIwM0wxODMuMTU0IDE3Ny4xNjVDMTQyLjk5MyAyMTkuMDEyIDEzNC43ODIgMjkxLjY4MSAxODEuOTgzIDMzOC43MDRMMTgzLjA0MiAzMzcuNjQxWk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOSAxNzkuMjQyQzIxNC4yNzUgMTQ5LjA0NCAyNjEuNzA2IDEzNi43NDMgMzAzLjA2NSAxNTQuODM4TDMwMy42NjYgMTUzLjQ2NEwzMDQuMjY3IDE1Mi4wOUMyNjEuNjYgMTMzLjQ0OSAyMTIuOTA2IDE0Ni4xMzcgMTgzLjE1NCAxNzcuMTY1TDE4NC4yMzYgMTc4LjIwM1pNMzAzLjY2NiAxNTMuNDY0TDMwNC4zMTcgMTU0LjgxNUwzNDkuNDA2IDEzMy4xMDFMMzQ4Ljc1NSAxMzEuNzVMMzQ4LjEwNSAxMzAuMzk4TDMwMy4wMTUgMTUyLjExMkwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS42NTggMTMwLjU1MkMzNDEuNDYyIDEyNC4zNzQgMzMwLjkzIDExNy43MDggMzE4LjgxNyAxMTMuMDE1TDMxOC4yNzUgMTE0LjQxNEwzMTcuNzMzIDExNS44MTNDMzI5LjUxMyAxMjAuMzc2IDMzOS44MDIgMTI2Ljg4IDM0Ny44NTMgMTMyLjk0OEwzNDguNzU1IDEzMS43NVpNMzE4LjI3NSAxMTQuNDE0TDMxOC44NjcgMTEzLjAzNkMyNjQuMjk5IDg5LjYxNzggMTk4Ljk4NCAxMDEuMjgxIDE1NC42NTMgMTQ3LjQ3N0wxNTUuNzM1IDE0OC41MTZMMTU2LjgxOCAxNDkuNTU0QzIwMC4yNzYgMTA0LjI2NyAyNjQuMjU1IDkyLjg2MzYgMzE3LjY4MyAxMTUuNzkzTDMxOC4yNzUgMTE0LjQxNFpNMTU1LjczNSAxNDguNTE2TDE1NC42NTMgMTQ3LjQ3OEMxMTIuMDIgMTkxLjkzOSA5OC42Mjc5IDI2MC4yNjUgMTIxLjY0MSAzMTguNTc4TDEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdDMTAxLjg0NCAyNjAuMjQyIDExNS4wMDYgMTkzLjE1OSAxNTYuODE4IDE0OS41NTRMMTU1LjczNSAxNDguNTE2Wk0xMjMuMDM2IDMxOC4wMjdMMTIxLjY0MSAzMTguNTc4QzEyOS45OCAzMzkuNzE3IDEyNy4zMjYgMzU3LjcwNCAxMTkuMTIgMzc0LjI2N0MxMTAuODY1IDM5MC45MjggOTcuMDEzNCA0MDYuMTExIDgyLjkxNDggNDIxLjU2NEw4NC4wMjI5IDQyMi41NzVMODUuMTMxIDQyMy41ODZDOTkuMTU3NiA0MDguMjEyIDExMy4zMjkgMzkyLjcxMSAxMjEuODA4IDM3NS41OTlDMTMwLjMzNSAzNTguMzg5IDEzMy4xMjUgMzM5LjUxNiAxMjQuNDMyIDMxNy40NzdMMTIzLjAzNiAzMTguMDI3Wk04NC4wMjI5IDQyMi41NzVMODIuOTE0NiA0MjEuNTY0QzcyLjk2MzMgNDMyLjQ3NSA2Mi44OTExIDQ0My40NzggNTQuNzY5IDQ1NS4xNDNMNTYgNDU2TDU3LjIzMSA0NTYuODU3QzY1LjIxOTUgNDQ1LjM4NCA3NS4xNDkgNDM0LjUzMSA4NS4xMzEyIDQyMy41ODZMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTcuMDIyNSA0NTcuMDk4TDE4NC4wMyAzMzguNzc0TDE4My4wMDcgMzM3LjY3N0wxODEuOTg1IDMzNi41NzlMNTQuOTc3NSA0NTQuOTAyTDU2IDQ1NlpNNDAwLjk3OCAxMTMuMjA0TDM5OS44OTMgMTEyLjE2OEwyMDkuMzY1IDMxMS43NTlMMjEwLjQ1IDMxMi43OTRMMjExLjUzNSAzMTMuODNMNDAyLjA2MyAxMTQuMjRMNDAwLjk3OCAxMTMuMjA0WiIgZmlsbD0iI0ZDRkNGQyIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSkiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8zMDRfMTExIiB4PSItMjQiIHk9Ii0yMiIgd2lkdGg9IjU2MCIgaGVpZ2h0PSI1NjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTYgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18zMDRfMTExIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzMwNF8xMTEiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iYmdibHVyXzFfMzA0XzExMV9jbGlwX3BhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDIyKSI+PHBhdGggZD0iTTAgMjU2QzAgMTY2LjM5MiAwIDEyMS41ODcgMTcuNDM5IDg3LjM2MTVDMzIuNzc4NyA1Ny4yNTU2IDU3LjI1NTYgMzIuNzc4NyA4Ny4zNjE1IDE3LjQzOUMxMjEuNTg3IDAgMTY2LjM5MiAwIDI1NiAwQzM0NS42MDggMCAzOTAuNDEzIDAgNDI0LjYzOCAxNy40MzlDNDU0Ljc0NCAzMi43Nzg3IDQ3OS4yMjEgNTcuMjU1NiA0OTQuNTYxIDg3LjM2MTVDNTEyIDEyMS41ODcgNTEyIDE2Ni4zOTIgNTEyIDI1NkM1MTIgMzQ1LjYwOCA1MTIgMzkwLjQxMyA0OTQuNTYxIDQyNC42MzhDNDc5LjIyMSA0NTQuNzQ0IDQ1NC43NDQgNDc5LjIyMSA0MjQuNjM4IDQ5NC41NjFDMzkwLjQxMyA1MTIgMzQ1LjYwOCA1MTIgMjU2IDUxMkMxNjYuMzkyIDUxMiAxMjEuNTg3IDUxMiA4Ny4zNjE1IDQ5NC41NjFDNTcuMjU1NiA0NzkuMjIxIDMyLjc3ODcgNDU0Ljc0NCAxNy40MzkgNDI0LjYzOEMwIDM5MC40MTMgMCAzNDUuNjA4IDAgMjU2WiIvPgo8L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcDBfMzA0XzExMSI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg==\"}],\"video\":[{\"name\":\"B站\",\"url\":\"https://search.bilibili.com/all?keyword=%s\",\"favicon\":\"https://www.bilibili.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAAD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A1qEAANahAADWoQAG1qEAb9ahAMvWoQD01qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD01qEAy9ahAG/WoQAG1qEAANahAADWoQAA1qEAG9ahAM/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahANDWoQAb1qEAANahAAfWoQDQ1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahANHWoQAH1qEAbtahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAG7WoQDH1qEA/9ahAP/WoQD/1qEAtdahABjWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahABvWoQC11qEA/9ahAP/WoQD/1qEAx9ahAPnWoQD/1qEA/9ahAP/WoQAZ1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahABjWoQD/1qEA/9ahAP/WoQDz1qEA/9ahAP/WoQD/1qEA/9ahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAErWoQDn1qEA5NahAErWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAErWoQDn1qEA5NahAErWoQAA1qEAANahAADWoQAA1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEA5tahAP/WoQD/1qEA59ahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEA5tahAP/WoQD/1qEA59ahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEA5tahAP/WoQD/1qEA5tahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEA5tahAP/WoQD/1qEA5tahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAADWoQAA1qEAANahAADWoQBJ1qEA5tahAObWoQBJ1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQBJ1qEA5tahAObWoQBJ1qEAANahAADWoQAA1qEAANahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQD/1qEA/9ahAP/WoQD/1qEA+dahAP/WoQD/1qEA/9ahABnWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAGdahAP/WoQD/1qEA/9ahAPjWoQDH1qEA/9ahAP/WoQD/1qEAttahABnWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahABnWoQC21qEA/9ahAP/WoQD/1qEAx9ahAG3WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQBt1qEABtahAM/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA0NahAAfWoQAA1qEAG9ahAM/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAM/WoQAb1qEAANahAADWoQAA1qEABtahAG7WoQDH1qEA89ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA/9ahAP/WoQD/1qEA89ahAMfWoQBu1qEABtahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEADtahAMXWoQD/1qEA/9ahAP/WoQD/1qEAxdahAA/WoQAA1qEAANahAADWoQAA1qEADtahAMXWoQD/1qEA/9ahAP/WoQD/1qEAxdahAA/WoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAAbWoQDF1qEA/9ahAP/WoQD/1qEA/9ahAMXWoQAP1qEAANahAADWoQAA1qEAANahAADWoQAA1qEADtahAMXWoQD/1qEA/9ahAP/WoQD/1qEAxdahAAbWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAYtahAP/WoQD/1qEA/9ahAP/WoQDF1qEADtahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEADtahAMXWoQD/1qEA/9ahAP/WoQD/1qEAY9ahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQBf1qEA/9ahAP/WoQD/1qEAxdahAA7WoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEADtahAMXWoQD/1qEA/9ahAP/WoQBf1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAATWoQCg1qEA6tahAKjWoQAO1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEAANahAADWoQAA1qEADtahAKjWoQDr1qEAoNahAATWoQAA1qEAANahAADWoQAA1qEAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A///////////AAAADgAAAAQAAAAAAAAAAA///wAf//+AP///wD///8A////AP///wDw/w8A8P8PAPD/DwDw/w8A8P8PAPD/DwD///8A////AH///gA///wAAAAAAAAAAAgAAAAcAAAAP8A8A/+AfgH/gP8B/4H/gf+D/8H/////8=\"},{\"name\":\"Trakt\",\"url\":\"https://app.trakt.tv/search?m=media&q=%s\",\"favicon\":\"https://app.trakt.tv/favicon.svg\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMC44MCIgZmlsbD0iIzY0MzhEMCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMjQwIDYuMjQwKSBzY2FsZSgwLjU4MjMwKSI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjcuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNTYuMDAgMzguOTVBMjcuNSAyNy41IDAgMSAxIDM2LjE5IDMuMjAiLz48cGF0aCBkPSJNMTYuOTMgMjcuMTFMMzUuODIgNDIuOTZNMjkuOTIgMzQuNzVMNTMuODkgNi4xN001Ni42OSAxOC4zMUw0Mi40OSAzNS4yNE0yNi44OCAyMi40MUwyMy4zNiAxOS40NSIvPjwvZz48L2c+PC9zdmc+\"},{\"name\":\"SubHD\",\"url\":\"https://subhd.tv/search/%s\",\"favicon\":\"https://subhd.tv/public/images/favicon.ico\",\"faviconData\":\"data:image/vnd.microsoft.icon;base64,AAABAAMAEBAAAAEAIABoBAAANgAAACAgAAABACAAKBEAAJ4EAAAwMAAAAQAgAGgmAADGFQAAKAAAABAAAAAgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA64kADeyJAG7uiQCz7IgA1+2JAOfuiQD67okA+u2JAOfsiADX7IkAs+yJAG7riQANAAAAAAAAAAAAAAAA6ooAMO2JAOPuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA4+qFADAAAAAA64kADe2JAOPuiQD/7okA/+6JAP/uiQD/8Jki//OtTv/0r1H/8Z0s/+6JAP/uiQD/7okA/+6JAP/uiQDj64kADeyIAG3uiQD/7okA/+6JAP/vkRH/+t21///////////////////////75MT/8JQY/+6JAP/uiQD/7okA/+yIAG3siQCz7okA/+6JAP/uiQD/+dSi///////748L/9LNc//SxV//62Kn///////rbsP/uiQD/7okA/+6JAP/sigCy7YkA1u6JAP/uiQD/7okA//zq0v/+8+T/75MV/+6JAP/uiQD/7osG///+/P/++vT/7okA/+6JAP/uiQD/7YgA1u2JAOfuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/vjw3/86lE//nWpf///////fDf/+6JAP/uiQD/7okA/+2JAObtiQHy7okA/+6JAP/uiQD/7ooB//W5aP/85sn///78//////////////v3//SwU//uiQD/7okA/+6JAP/siADx7YkB8u6JAP/uiQD/7okA//bAdv////////////7z4//51qX/9bln//CUGP/uiQD/7okA/+6JAP/uiQD/7YgA8e2JAObuiQD/7okA/+6JAP/748P///////SwVP/uiQD/7okA//CUFv/0rEz/8qAx/+6JAP/uiQD/7okA/+2JAObtiADV7okA/+6JAP/uiQD/+t22///////zqUT/7okA/+6KAv/4zpb///////fJiv/uiQD/7okA/+6JAP/tiADV7IgAsu6JAP/uiQD/7okA//OqSP///v3///79//3s1//+9Ob///////737P/wmCH/7okA/+6JAP/uiQD/7IgAsuyJAGzuiQD/7okA/+6JAP/uiQD/86dC//rasP/97dj//OvT//jQmP/wmCD/7okA/+6JAP/uiQD/7okA/+yJAGzqlQAM7okA4e6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAOHqlQAMAAAAAO6IAC3uigDg7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2JAOHoiAAtAAAAAAAAAAAAAAAA1IAADOyIAGvsiQCx7YgA1e2JAOfuiQD77YgA++2JAOftiQDW7okAseyIAGvqgAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKAAAACAAAABAAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADhhwAR64kDTu2JAoDriQKk7IgBueyJAcvsiQHU7okB6+6JAP/uiQD/7okB6+yJAdTsiQHL7IgBueyIAqPrhwKA64gDTeGHABEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADshwU17YoBru6JAPnuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA+eyIAa7nhwU1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/mQAF7IgCkO2JAP7uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2JAP7siQKR/5kABQAAAAAAAAAAAAAAAAAAAAAAAAAA1IAABuuJAbXuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiAG0/5kABQAAAAAAAAAAAAAAAAAAAADsiAKQ7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/siQKRAAAAAAAAAAAAAAAA64kFNO6JAP3uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/wmSL/9blm//jMkf/51qb/+tip//nRm//2wHf/8qM4/+6JAf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP3riQU0AAAAAAAAAADsiAGs7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/xnCn/+963/////v///////////////////////////////////////OvT//KnQf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2JAasAAAAA34AAEO6JAPjuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/86hD//769P////////////////////////////////////////////////////////78//W0Xv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA+N+AABDoiANN7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//CUGP/+9+7///////////////////79//zmyf/51aX/+dSi//vfu//++fL///////////////////z4//GdKv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64oDTOuHAn/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/98WD//////////////////3w3v/xni3/7okA/+6JAP/uiQD/7okA/++PDv/616f/////////////////+dKe/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/riAJ+7IgCo+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/85sj/////////////////86xM/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/++QEP///vz////////////98N//7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+yIAqPriQG37okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//rdtf/858v//OfL//zmyP/ujAj/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7owG///89/////////////758v/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7YgBtuuJAcvuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/++PDP/4z5f//////////////////fDf/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/siQHJ7YgB0u6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiwT/8p8w//W6af/516n//vny///////////////////////50p3/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+yIAdLsiAHf7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//CUGP/2vG7/+t63//758v///////////////////////////////////////vnx//GaJP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64gB3e2JAuvuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6MBv/4y4////z5//////////////////////////////////////////////////3w3v/yozj/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/siQHn7YkC7O6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/+dak/////////////////////////////////////////////vft//rZrf/0s1r/7owG/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+yJAefriQHe7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//KhNP////////////////////////////716P/616j/9bpq//GeLf/uigL/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7YkB3eyIAdLuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/9sJ7//////////////////zr1P/ypj//7ooC/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQHS7IkBye6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/4zZT/////////////////8qU8/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//SzWf/5z5f/+c+X//nPl//xny7/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+yJAcntiQG17okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//fIiP/////////////////ypDr/7okA/+6JAP/uiQD/7okA/+6JAP/uiQH//OjO//////////////////KhNf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64kBte6KAqHuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/9K5R//////////////////vjwf/wkxX/7okA/+6JAP/uiQD/7owH//fIif/////////////////+9+3/7owG/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/siQKi64kCfe6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/ujAf//e/e///////////////////79f/737r/+dSj//rcsv/+9ur///////////////////////fDfv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+uIAn7riANL7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/ypDr///r1///////////////////////////////////////////////////////63bX/7osF/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64gDS9uSAA7tiAD37okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/yoTX//OrS///////////////////////////////////////++fP/9sJ8/+6LBP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2JAPftkgAOAAAAAO2JAqnuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uigL/86ZA//fFg//616n/+964//rdtP/40Jj/9bVf/++R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AP/uiQD/7okA/+6JAP/uiQD/7okA//CZI//2wHf/+9+6//3t2P/98N7//fHi//3y4//98eD//e/c//zozv/5z5n/86pH/+6KA//uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/uyKAnoAAAAAAAAAAAAAAADtiQkc7IkA3O6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6MBv/yozf/+tiq///+/P////////////////////////////////////////////////////////////zs1v/0slf/748N/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JANvtiQkcAAAAAAAAAADpiANe7okA8+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/744M//fDfv/98+T////////////////////////////////////////////////////////////////////////////++vT/+dKe//CWHf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAPPsiQNdAAAAAP+fAAjsigKW7ooA/u6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/vjQn/+dKe///8+f////////////////////////////////////////////////////////////////////////////////////////79//vgvP/wlBj/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6KAP7sigKW/58ACOmFABftiQHC7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6KA//1u2v//vv1//////////////////////////////7+//748P/98+X//fHg//3w3//98uP//vXq///8+P/////////////////////////////9+//3yYn/7owH/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQHC6IsAFumKACPtiAHo7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//CVGv/858z////////////////////////////+9Ob/+M2S//SwVP/yoDL/8Zki//GYIf/xnSv/86dC//a9b//74r////37///////////////////////98uL/8Z0q/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQHn6YoAI+SEBTjuiQD87okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//SuUP///fz///////////////////////737f/0sVb/740I/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6KAf/wlRr/+922//////////////////////////7/9sB3/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQD854kFNuqJBWHuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//nPl/////////////////////////////nRm//uiQH/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/8Zwp///+/f//////////////////////++G+/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6okFYemJBHPuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//vjwf////////////////////////////KhNP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7ooC//747v///////////////////////fHh/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6YcEc+qIBI/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//fJi//516j/+deo//nXqP/516j/+dSi/+6LBf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/75EQ///8+P///////////////////////fXp/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6YgEjumJA6buiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6KAf/vkxX/+M+Y/////////////////////////////OvU/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6YcDouqIA67uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/vjwz/8qI1//a8bv/737r///z5////////////////////////////+dKe/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6ogDrOuIA7buiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6KAv/xmSL/9bZg//nTn//86tH//fTm///8+P///////////////////////////////////fv/86pH/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6okDt+uJA8PuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQH/748M//CZIv/zrlD/+dCa//3v3P///v3////////////////////////////////////////////////////////+/f/63LP/75IT/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64gDweuJA+DuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/++ODP/0slj/+dWj//3w3v///v3///////////////////////////////////////////////////////////////////////zpz//ypDn/7okB/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64kC1uyJBNPuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/75ER//rbsf/++fH////+/////////////////////////////////////////////////////////////////////////fv/+dan//CYIf/uigL/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6okC0euIBNnuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/vkxb/++LA///////////////////////////////////////////////////////////////////+/P/++O///fHg//rar//zp0H/7osD/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7IkC0+qJA97uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6LBf/2wHf///z4//////////////////////////////////////////////////758v/858v/+dSj//bBev/0rlD/8Jki/+6JAf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64kC1uuJA8HuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//CUF//75MT///////////////////////////////////////726v/51aP/9bRc//GcKv/wlRn/744M/+6KAf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7YkDweuJA7fuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//GcKf/++fL////////////////////////9+v/74Lv/861N/++MBv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/64oDt+qJA63uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//OnQf////7///////////////////////rasP/wkxX/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uigH/8JIU//CUGP/wlBj/8JQY//CUGP/wkhP/7ooC/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6okDreuJA6LuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//OuTv////////////////////////////SvUf/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/wkxX/++G+//3v3P/979z//e/c//3v3P/627H/75MX/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6YgDo+mIBI3uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//KoQ/////////////////////////////SuUP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/ypj7//vXp///////////////////////74Lz/75IU/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6YgEjeiHBXHuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//GcKf/++PD///////////////////////nWpf/vjgr/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/++OC//4zpb///37///////////////////////50Jn/740J/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/6IcFcemKBV7uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//CUF//748T///////////////////////769P/3yIf/744M/+6JAP/uiQD/7okA/+6JAP/uiQD/75ET//jPmP/++vX///////////////////////779f/1t2X/7okB/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/54kFX+aJCjTuiQH77okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6LBP/3wnz///36/////////////////////////////vPk//nPmP/1vHD/9bhk//a/df/51qf//vjw//////////////////////////////////zr0//wlx7/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQH84ocKNemDACPtiAHm7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/wmSP//ObJ/////////////////////////////////////////////////////////////////////////////////////////////vjw//SvUv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQHn6YoAI+iLABbuiQHA7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQH/8Z4t//7y4//////////////////////////////////////////////////////////////////////////////////++O//9LNb/+6KA//uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/tiQHB6IsAFt+AAAjsiQKT7okA/u6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA//GcKP/74sH//vv3//////////////////////////////////////////////////////////////z4//zq0v/zrU3/7ooC/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP7siAKU34AACAAAAADriANa7okA8u6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/wlRr/9bpq//rbsf/+8+T///79//////////////////////////////////716v/63bb/9r1w//CXHv/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2IAPPriQNbAAAAAAAAAADriQoa7YkA2u6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7ooB/++REf/wmSP/8qdB//W5af/3xIH/+MmL//fHh//2vnH/86pJ//CaJf/vkRL/7ooC/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+2JANnriQoaAAAAAAAAAAAAAAAA64gCdO6JAP7uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7YkA/uuIAnQAAAAAAAAAAAAAAAAAAAAA25IADu2IAcHuiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7okA/+6JAP/uiQD/7YgBweuJAA0AAAAAAAAAAAAAAAAAAAAAAAAAAOaH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\"},{\"name\":\"豆瓣电影\",\"url\":\"https://www.douban.com/search?cat=1002&q=%s\",\"favicon\":\"https://www.douban.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,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AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP+RwIn////////////4+/j/GnwK/xF3AP8RdwD/EXcA/xF3AP8afAr/+Pv4////////////kcCJ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Xn0v///////////77auf8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP++2rn////////////V59L/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8rhhz/////////////////erNw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/3qzcP////////////////8rhhz/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/26sZP////////////////81jCf/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/NYwn/////////////////26sZP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/vdm4////////////5PDi/y+IIP8viCD/L4gg/y+IIP8viCD/L4gg/y+IIP8viCD/5PDi////////////vdm4/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ/////////////////////////////////////////////////////////////////////////////////////////////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD/////////////////////////////////////////////////////////////////////////////////////////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P///////////9vq2P+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP/b6tj////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ////////////tdWw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/7XVsP///////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD///////////+11bD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/tdWw////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P///////////7XVsP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP+11bD////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ////////////tdWw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/7XVsP///////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD////////////b6tj/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/2+rY////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P/////////////////////////////////////////////////////////////////////////////////////////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ/////////////////////////////////////////////////////////////////////////////////////////////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/+Lu4P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4u7g/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/4u7g///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////i7uD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/i7uD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Lu4P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AOYRdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwDmEXcASRF3AOYRdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA5hF3AEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\"},{\"name\":\"YouTube\",\"url\":\"https://www.youtube.com/results?search_query=%s\",\"favicon\":\"https://www.youtube.com/s/desktop/f51d9955/img/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAIAICAAAAEAIACoEAAAJgAAADAwAAABACAAqCUAAM4QAAAoAAAAIAAAAEAAAAABACAAAAAAAAAQAAATCwAAEwsAAAAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAMwD/BzMA/1YzAP+HMwD/pzMA/7wzAP/KMwD/1TMA/+AzAP/vMwD/8DMA//IzAP//MwD//zMA//8zAP//MwD//zMA//8zAP/xMwD/8DMA/+8zAP/gMwD/1DMA/8ozAP+8MwD/pjMA/4czAP9WMwD/CAAAAAAAAAAAAAAAADMA/y8zAP/fMwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/hMwD/LwAAAAAzAP8JMwD/4jMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/hMwD/CDMA/1szAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP9XMwD/jjMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA/4kzAP+4MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/tTMA/9MzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//0UW//+CY///NQL//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/QMwD/5zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//TSD////////Yzv//ZT7//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA/+YzAP/zMwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//9NIP//////////////////vKv//00h//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8jMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//00g////////////////////////+fj//5+H//89Df//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//TSD//////////////////////////////////+3o//+BYv//NQL//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//9NIP//////////////////////////////////7ej//4Fi//81Av//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//00g////////////////////////+fj//5+H//89Df//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//TSD//////////////////7yr//9NIf//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//IzAP/nMwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//9NIP///////9jO//9lPv//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/5jMA/9MzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//0UW//+CY///NQL//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/QMwD/uDMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA/7czAP+OMwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/kjMA/1kzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP9WMwD/CTMA/+MzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/4TMA/wgAAAAAMwD/LzMA/98zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA/+AzAP8vAAAAAAAAAAAAAAAAMwD/BzMA/1MzAP+FMwD/pTMA/7szAP/IMwD/0zMA/+AzAP/vMwD/8DMA//EzAP//MwD//zMA//8zAP//MwD//zMA//8zAP/xMwD/8DMA/+4zAP/gMwD/0zMA/8gzAP+7MwD/pTMA/4UzAP9TMwD/BwAAAAAAAAAA////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP//////////////////////////wAAAA4AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABwAAAA///////////////////////////KAAAADAAAABgAAAAAQAgAAAAAAAAJAAAEwsAABMLAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AAAAAAAAAAAAAAAAAAAAAAAAAAAAMwD/DDMA/zgzAP9dMwD/dzMA/4wzAP+gMwD/qzMA/7YzAP/BMwD/0DMA/90zAP/gMwD/5zMA//AzAP/wMwD/8DMA//gzAP//MwD//zMA//8zAP//MwD/+DMA//AzAP/wMwD/8DMA/+YzAP/gMwD/3DMA/9AzAP/BMwD/tjMA/6ozAP+fMwD/jDMA/3YzAP9cMwD/NzMA/wwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADMA/y8zAP+1MwD//TMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//0zAP+5MwD/MgAAAAAAAAAAAAAAAAAAAAAAAAAAMwD/VzMA//ozAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/+jMA/1oAAAAAAAAAAAAAAAAzAP8wMwD/+jMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//ozAP8vAAAAAAAAAAAzAP+7MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP+zAAAAADMA/xQzAP/+MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/7MwD/DTMA/0gzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/QTMA/3IzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/bTMA/5QzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/kTMA/6szAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//9AEP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/qDMA/78zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+xnv//r5v//0UW//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/vDMA/9QzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP////////Lv//+Lbv//NgT//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/0jMA/+czAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP//////////////////3NP//2ZA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/5TMA//AzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP////////////////////////////+6qf//Sh3//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8DMA//QzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP//////////////////////////////////9/X//5V7//85CP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8jMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP/////////////////////////////////////////////k3f//cU3//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP///////////////////////////////////////////////////////8W3//9RJv//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP///////////////////////////////////////////////////////8W3//9RJf//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP/////////////////////////////////////////////k3f//cU3//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//QzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP//////////////////////////////////9/X//5V7//85CP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8zMA//AzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP////////////////////////////+6qf//Sh3//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/8DMA/+gzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP//////////////////3NP//2ZA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/5TMA/9QzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+zoP////////Lv//+Lbv//NgT//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/0zMA/78zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//+xnv//r5v//0UW//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/vDMA/6szAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//9AEP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/qDMA/5UzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/kTMA/3IzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/bTMA/0gzAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/QDMA/xIzAP/+MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP/7MwD/DAAAAAAzAP+7MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP+zAAAAAAAAAAAzAP80MwD/+jMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//ozAP8vAAAAAAAAAAAAAAAAMwD/WTMA//ozAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD/+jMA/1oAAAAAAAAAAAAAAAAAAAAAAAAAADMA/y8zAP+zMwD/+zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//8zAP//MwD//zMA//szAP+zMwD/MAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMwD/CTMA/zQzAP9aMwD/dDMA/4szAP+dMwD/qTMA/7QzAP/AMwD/0DMA/9wzAP/gMwD/5TMA//AzAP/wMwD/8DMA//gzAP//MwD//zMA//8zAP//MwD/9zMA//AzAP/wMwD/8DMA/+UzAP/gMwD/2zMA/9AzAP/AMwD/tDMA/6gzAP+dMwD/izMA/3QzAP9ZMwD/NDMA/wkAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///wD///8A////AP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAP///////wAA+AAAAAAfAADgAAAAAAcAAMAAAAAAAwAAgAAAAAABAACAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAAAAQAAgAAAAAABAADAAAAAAAMAAOAAAAAABwAA+AAAAAAfAAD///////8AAP///////wAA////////AAD///////8AAP///////wAA////////AAD///////8AAA==\"}],\"books\":[{\"name\":\"Z-Library\",\"url\":\"https://zh.z-lib.sk/s/%s?\",\"favicon\":\"https://getzlib.com/logo.svg\",\"faviconData\":\"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzYyMDQ3MjkyODU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTEuMTUyMjM0IDEuMTUyMjM0aDEwMjEuNjg1OTN2MTAyMS42ODU5M0gxLjE1MjIzNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE2MDEiPjwvcGF0aD48cGF0aCBkPSJNMzcyLjM3MzIzOCAxNzIuNjA0NjZsMTE5LjIyNzQxOCAzNjIuMDEyNzM0IDAuMDQ4MDEtMC4wMTkyMDQgMS41MDc1MDYgNC4zNzg0OWM1LjcwMzU1OS0yLjM2MjA4IDExLjkwNjQxOC0zLjc4MzE2OCAxOC40NTQ5NDktMy44NzkxODggNy4wMTkwMjYtMC4xMTUyMjMgMTMuNzg4NDAxIDEuMjY3NDU3IDIwLjA0ODg3MiAzLjgyMTU3NmwxLjQ0MDI5My0zLjk4NDgwOSAwLjIzMDQ0NyAwLjA3NjgxNSAxMTQuOTczNzU0LTM2Mi4zOTY4MTJoLTcuMDU3NDM0TDUyOC42MDY1NzMgNTI3LjI0MzA5Nmw3MC4xOTk4Ni0zNTQuNjM4NDM2aC02Ljg0NjE5MWwtNjguNzQwMzYzIDM0Ni4zMDM5NDMgMzIuOTE1NDg2LTM0Ni4zMDM5NDNoLTYuNzU5NzczbC0zMy41OTcyMjUgMzU2LjEwNzUzNWMtMC40ODk2OTktMC4wMjg4MDYtMC45NTA1OTMtMC4xMDU2MjEtMS40NDAyOTItMC4xMjQ4MjZsMC43MjAxNDYtMC4wMDk2MDIgMi4xMjIwMzEtMzU1Ljk2MzUwNWgtNi43NjkzNzVsLTIuMTAyODI3IDM1Ni4wNzg3MjloMC4xNjMyMzNjLTAuMjg4MDU5IDAuMDE5MjA0LTAuNTc2MTE3IDAuMDY3MjE0LTAuODczNzc3IDAuMDk2MDE5bC0yOS40NTg3ODQtMzU2LjE3NDc0OGgtNi43Nzg5NzdsMjguNzM4NjM3IDM0OS42MTY2MTYtNzUuMzg0OTEyLTM0OS42MjYyMThoLTYuODk0Mmw3My40NDUzMTggMzQwLjU0Mjc3My0xMTEuNzg1OTA2LTM0MC41NDI3NzNoLTcuMTA1NDQ0eiIgZmlsbD0iI0M4QzZDNyIgcC1pZD0iMTYwMiI+PC9wYXRoPjxwYXRoIGQ9Ik01NDguMzY3Mzg3IDg3NS4yNzUzOVY2NjAuOTExODQ4aC03NS45ODAyMzN2MjE0LjM2MzU0MmwzNy45NzU3MTMtMzkuMDk5MTQyIDM4LjAwNDUyIDM5LjA5OTE0MnoiIGZpbGw9IiM3MUE3QzUiIHAtaWQ9IjE2MDMiPjwvcGF0aD48cGF0aCBkPSJNNzU2LjA1NzU3NCAxNDguNzI0NjFsLTkwLjQwMjM2MyAyMy44ODAwNS0xMzUuMDUxNDMyIDM2NS45NTkxMzZoLTM3LjIwNzU1OEwzNTguOTExMzA0IDE3MC42NTU0NjRsLTkwLjk3ODQ4LTIxLjkzMDg1NCAxNzQuMzMzMDExIDQ3My44NDY2NSAxNDEuMjI1NDg3IDAuMTM0NDI3eiIgZmlsbD0iIzYyNjA2MiIgcC1pZD0iMTYwNCI+PC9wYXRoPjwvc3ZnPg==\"},{\"name\":\"豆瓣读书\",\"url\":\"https://www.douban.com/search?cat=1001&q=%s\",\"favicon\":\"https://www.douban.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,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AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP+RwIn////////////4+/j/GnwK/xF3AP8RdwD/EXcA/xF3AP8afAr/+Pv4////////////kcCJ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Xn0v///////////77auf8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP++2rn////////////V59L/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8rhhz/////////////////erNw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/3qzcP////////////////8rhhz/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/26sZP////////////////81jCf/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/NYwn/////////////////26sZP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/vdm4////////////5PDi/y+IIP8viCD/L4gg/y+IIP8viCD/L4gg/y+IIP8viCD/5PDi////////////vdm4/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ/////////////////////////////////////////////////////////////////////////////////////////////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD/////////////////////////////////////////////////////////////////////////////////////////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P///////////9vq2P+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP/b6tj////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ////////////tdWw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/7XVsP///////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD///////////+11bD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/tdWw////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P///////////7XVsP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP+11bD////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ////////////tdWw/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/7XVsP///////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/T5tD////////////b6tj/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/iLuA/4i7gP+Iu4D/2+rY////////////0+bQ/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/9Pm0P/////////////////////////////////////////////////////////////////////////////////////////////////T5tD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/0+bQ/////////////////////////////////////////////////////////////////////////////////////////////////9Pm0P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/+Lu4P//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////4u7g/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/4u7g///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////i7uD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP/i7uD//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////+Lu4P8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AOYRdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwDmEXcASRF3AOYRdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA/xF3AP8RdwD/EXcA5hF3AEkAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==\"},{\"name\":\"孔夫子旧书\",\"url\":\"https://search.kongfz.com/product_result/?key=%s&order=100\",\"favicon\":\"https://www.kongfz.com/img/pclogo.jpg\",\"faviconData\":\"data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAABkKADAAQAAAABAAABkAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgBkAGQAwERAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/bAEMBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAf/dAAQAMv/aAAwDAQACEQMRAD8A/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9D8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/0fwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//S/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9P8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1PwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//V/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9b8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1/wXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//Q/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9H8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/0vwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//T/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9T8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1fwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//W/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9f8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAL9lpWqakl1Jp2m39/HYw/aL17KzuLpLO3zjz7poIpBbw5BHmylEyPvcGmot3sm7auybt69jOpWpUnBVatOm6kuWmqk4wc5fywUmuaXlFNlCkaBQAUAFABQAUAFABQB//9D8F6/Fz/aAKACgAoAKACgAoAKACgAoAKAP2l/4Jnf8EX/jf+3m9j8SvGV1qHwW/ZqjuSD8Qb/S/P8AEvxBNtKY7vTvhfod75MN/bpIj2V7401Mjw3pl150VhF4l1LT9R0aD3cqyLEZjarUvQwt/wCI4+/Ut0oxdr9nUfuR2XO1JH4V4qeOmQeHiqZXgYU894pcf+RbTq2wuW88U4Vc2xFPmlTm01OGApL61VhaVSWFpVaVeX9A/iT/AINk/wBhjUNFa08NfFD9pbw3riQBLbWbvxZ8PNftHuAir52paO/wy037SjEF2g0/UNI+diEmRAEr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FPxE0j4kfFa3t7hdG+C/w01fTvEXjC71NUb7Nb+J7qxlu9K+H+nNNsN1qHii4t7z7J50+jaNrtzEmny+pj85wOAi+erGrWt7tClJSm3052rqmvOdtNYqVrS/KuBPBrjfjzEUXg8sr5Xk8pR9vnua0KuGwUKV/elhIVOStmNXluoUsJCcOeyr16EH7Q/z+/2y/wBrX4l/tt/tA+NP2gfikbW11jxK9rp2heG9MknfRPBXg/R0a38PeEtF+0EytaabbvJPeXbrFLq+tXuq63cQw3OpXCV+cY7G1cfiamJrWUp2UYRvy04R0jCN7OyWrdtZNt2uf6OcD8G5VwFw3geG8o550MKp1cRiqqiq+Pxtd82Jxlfl0U6slGMIJtUaEKNCLcKUT5arkPrgoAKACgAoAKAP/9D8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/0fwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//S/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9P8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1PwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//V/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9b8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1/wXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//Q/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9H8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/0vwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//T/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9T8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/1fwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//W/Bevxc/2gCgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgD/9f8F6/Fz/aAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKAP/0PwXr8XP9oAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoAKACgAoA//Z\"}],\"tools\":[{\"name\":\"金山词霸\",\"url\":\"https://www.iciba.com/word?w=%s\",\"favicon\":\"https://www.iciba.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADqkQEm6pEAvOqRAOrqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOzqkQDs6pEA7OqRAOrqkQC86pEBJuqSAcDqkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgH/6pIB/+qSAf/qkgHA65MC7uuTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAv/rkwL/65MC/+uTAu7rlAPu65QD/+uUA//qlAP/85IA//iPAP/4kgD/85wA//OcAP/znAD/85wA//ScAP/0nAD/9JwA//ScAP/0nAD/9JwA//ScAP/0nAD/9JwA//ScAP/0nAD/9JwA//ScAP/slQH/65QD/+uUA//rlAP/65QD/+uUA//rlAP/65QD7uuVBOzrlQT/65UE//KTAf+hqlT/ZsGS/2yokv+JRZP/ikOU/4pDlP+JQ5T/jEKR/5FBjP+RQYz/kUGM/5FBjP+RQYz/kUGM/5FBjP+RQYz/kUGM/5FBjP+OQJD/n054/+yVA//tlwL/65UE/+uVBP/rlQT/65UE/+uVBP/rlQTs7JYF7OyWBf/slgX/+ZEA/1+9mv8A6P//ALj//0AA//9DAP//QgD//0IA//9CAP//QQD//0EA//9BAP//QQD//0EA//9BAP//QQD//0EA//9BAP//QQD//0EA//8+AP//mEeD//WfAP/slwT/65YF/+yWBf/slgX/7JYF/+yWBezslwfs7JcH/+yXB//5kwD/Z7yS/wDj//8Luv3/SgH1/00A9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0oA9/9EAP7/r15h//ehAP/slwb/7JcH/+yXB//slwf/7JcH7OyYCOzsmAj/7JgI//mUAP9nvJP/AN3//wHd//8jdvv/TgD1/00A9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0gA+v9MBfT/xXNC//WhAP/smAj/7JgI/+yYCP/smAjs7ZkJ7O2ZCf/tmQn/+pUA/2i9lP8A3P//ANr//wDm//8eg/z/TQL1/00A9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9KAPP/QgDx/zsA+/9XDeH/14Qr//KeBP/tmQn/7ZkJ/+2ZCeztmwrs7ZsK/+2bCv/6lwD/aL2V/wDc//8A2P//ANn//wDn//8Zkfz/Swf1/04A9f9KAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SwD1/0sA9f9LAPX/SADy/0IA7/+Zb/b/r475/0UG//+gUHf/96QA/+2bCv/tmwr/7ZsK7O6cDOzunAz/7pwM//uZAP9ovpX/ANz//wDY//8A2P//ANj//wDn//8Vnvz/RQ/5/0UA//9EAP//RAD//0QA/v9EAP7/RAD//0QA//9EAP//RAD//0IA+/9AAO7/pIH2////////////YCX//5pIef/4pQD/7pwM/+6cDP/unAzs7p0O7O6dDv/unQ7//JoA/2i+lf8A3P//ANj//wDY//8A2P//ANj//wDl//8/p8v/v2dT/7ZmVP+0Ykz/tGNN/7RjT/+0Ykz/tWRO/7ZnV/+2Z1f/sWJP/8iixP////////////PVqf+5alf/1YQw//GgCf/unQ7/7p0O/+6dDuzung/s7p4P/+6eD//8mwH/aL+W/wDb//8A2P//ANj//wDY//8A2P//ANr//0zKrf/8nAD/86wY//nKYv/+4JX//+Wj//7cjP/4w1D/8qUI/++cAP/81Xz////6///////42qT/7ZwI//alAP/yogr/7p4Q/+6eD//ung//7p4P7O+gEezvoBH/76AR//2dA/9owJf/ANv//wDY//8A2P//ANj//wDY//8A2P//QsGv//rDbP/99un////////////////////////////669D/9tii////////////+Nqk/+2dC//vngz/76AR/++gEf/voBH/76AR/++gEf/voBHs76IS7O+iEv/vohL//Z8F/2jBmP8A2///ANj//wDY//8A2P//ANb9/wDS+v+Y6fP////////////++vP/+uS9//jdq//66cn////+///////////////+//jYn//ung3/76AN/++iE//vohL/76IS/++iEv/vohL/76IS/++iEuzwoxTs8KMU//CjFP/+oAf/acGY/wDb//8A2P//ANj//wDX/v8A0vr/YeP6////////////+eCx//CsLv/unQr/7ZwH/+2eDf/wtEX/++3T/////////Pn/8LA7/+6eB//woxT/8KMU//CjFP/woxT/8KMU//CjFP/woxT/8KMU7PCkFezwpBX/8KQV//6hCP9pwZn/ANv//wDY//8A2P//ANb9/wvV+f/f+f7///////rlvP/uoQ//76AM//CkFf/wpBX/8KQU/+2dB//tqSn//PPj///////5363/7p8L//CkFf/wpBX/8KQV//CkFf/wpBX/8KQV//CkFf/wpBXs8aYX7PGmF//xphf//6MK/2nCmv8A2///ANj//wDY//8A0/z/Rd/6/////////fv/8rZD//ChC//xphf/8aYX//GmF//xphf/8aYY/+ydBv/zyHf///////768v/wrCz/8KQS//GmF//xphf/8aYX//GmF//xphf/8aYX//GmF+zxpxns8acZ//GnGf//pAz/acOb/wDb//8A2P//ANj//wDS+/9x5vv///////3y3f/wpxz/8aYW//GnGf/xpxn/8acZ//GnGf/xpxn/7qIR/+6yPf/+/vz///////O7Tv/wow//8acZ//GnGf/xpxn/8acZ//GnGf/xpxn/8acZ7PKpGuzyqRr/8qka//+mDf9qxJv/ANv//wDY//8A2P//ANL7/3jn+////////O/V//CnGv/yqBj/8qka//KpGv/yqRr/8qka//KpGv/vpRP/7bA4//79+f//////9L5W//GkD//yqRr/8qka//KpGv/yqRr/8qka//KpGv/yqRrs8qoc7PKqHP/yqhz//6cP/2rEnP8A2///ANj//wDY//8A0/z/WeP7///////++vH/8bAw//GnFv/yqhz/8qoc//KqHP/yqhz/8aoc/+2iDv/wvlz////////+/f/zuEP/8acU//KqHP/yqhz/8qoc//KqHP/yqhz/8qoc//KqHOzzrB3s86wd//OsHf//qRD/asSd/wDb//8A2P//ANj//wDV/f8d2fv/9f3////////304z/76MK//KrHP/yqx3/8qsd//KrHv/vqBn/66MS//nmvv///////fHX//GrHv/zqxz/86wd//OsHf/zrB3/86wd//OsHf/zrB3/86wd7POtH+zzrR//860f//+rEf9kxqP/ANv//wDY//8A2P//ANj//wDT+/+X7fz////////9+f/0x23/7qUR/++mEf/vpxT/7aQQ/+ynGf/215f////////////3y3T/8qgT//OtH//zrR//860f//OtH//zrR//860f//OtH//zrR/s864g7POuIP/zriD//qwW/4/Aff8A2///ANn//wDY//8A2P//ANb+/xPX+//R+P/////////////55Lf/88hw//HBXf/0zXz/+uzN////////////+uKw//KrGv/zrh//864g//OuIP/zriD/864g//OuIP/zriD/864g//OuIOz0ryLs9K8i//SvIv/1ryH//K4a/5i/dv8K2Pf/ANr//wDY//8A2P//ANf//2jMs///6L3///////////////////////////////////////repf/zryL/9K4d//SvIv/0ryL/9K8i//SvIv/0ryL/9K8i//SvIv/0ryL/9K8i7PSwI+z0sCP/9LAj//SxI//1sCL//64U/7+6U/8g1OL/ANr//wDY//8A2v//aMOY//+sFf/2zHT/++nD//736f/++vH//fTi//rjs//2xFz/860Z//SvH//0sSP/9LAj//SwI//0sCP/9LAj//SwI//0sCP/9LAj//SwI//0sCPs9bIk7PWyJP/1siT/9bIk//SyJP/0siT//68Y/9+1N/9CzsX/ANv//wDc//9jyKj//64V//OsGP/yrh7/87Uw//S3Nf/zsyv/860b//SuGv/1sSP/9bIk//WyJP/1siT/9bIk//WyJP/1siT/9bIk//WyJP/1siT/9bIk//WyJOz1syXs9bMl//WzJf/1syX/9bMl//WzJf/1syb//rEd//KzKf+DxYv/acqi/6a/bP/7sh7/9bMl//WyJP/1sSL/9bEh//WxIv/1siX/9bMl//WzJf/1syX/9bMl//WzJf/1syX/9bMl//WzJf/1syX/9bMl//WzJf/1syX/9bMl7PW0Ju71tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCf/+LMk//+xGv//sRr//bIf//S0J//1tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCb/9bQm//W0Jv/1tCbu9bQn7vW0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J//1tCf/9bQn//W0J+72tSi69rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUo//a1KP/2tSj/9rUouva2KCL2tim49rYp6va2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp7Pa2Kez2tins9rYp6va2Kbj2tigigAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAAE=\"},{\"name\":\"Github\",\"url\":\"https://github.com/search?q=%s\",\"favicon\":\"https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg\",\"faviconData\":\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0iYiIgY3g9IjY0IiBjeT0iNjQiIHI9IjU2Ii8+CiAgICAgICAgPGZpbHRlciB4PSItNy4xJSIgeT0iLTUuNCUiIHdpZHRoPSIxMTQuMyUiIGhlaWdodD0iMTE0LjMlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJhIj4KICAgICAgICAgICAgPGZlTW9ycGhvbG9neSByYWRpdXM9IjEiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0ic2hhZG93U3ByZWFkT3V0ZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI0MDk0MjAyOSAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0iYyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRUZFRkUiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0UwRTBFMCIgb2Zmc2V0PSIxMDAlIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8Y2lyY2xlIGlkPSJkIiBjeD0iNjQiIGN5PSI2MyIgcj0iNTIiLz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjEwMCUiIHgyPSI1MCUiIHkyPSIwJSIgaWQ9ImciPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNDkyNzc5IiBvZmZzZXQ9IjAlIi8+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM4OTI3OTMiIG9mZnNldD0iMTAwJSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdGggZD0iTTEyIDY0LjAzNGMwIDIzLjAyNSAxNC44ODUgNDIuNDcyIDM1LjU1NSA0OS4zNjcgMi42LjQ1NiAzLjU3NS0xLjEwNSAzLjU3NS0yLjQ3IDAtMS4yMzctLjA2NS01LjMzNC0uMDY1LTkuNjkyQzM4IDEwMy42NDQgMzQuNjIgOTguMDUgMzMuNTggOTUuMTI0Yy0uNTg1LTEuNDk2LTMuMTItNi4xMTQtNS4zMy03LjM1LTEuODItLjk3Ni00LjQyLTMuMzgyLS4wNjUtMy40NDcgNC4wOTUtLjA2NSA3LjAyIDMuNzcyIDcuOTk1IDUuMzMzIDQuNjggNy44NyAxMi4xNTUgNS42NiAxNS4xNDUgNC4yOTMuNDU1LTMuMzgyIDEuODItNS42NiAzLjMxNS02Ljk2LTExLjU3LTEuMy0yMy42Ni01Ljc4OC0yMy42Ni0yNS42OSAwLTUuNjYgMi4wMTUtMTAuMzQzIDUuMzMtMTMuOTg1LS41Mi0xLjMtMi4zNC02LjYzNC41Mi0xMy43OSAwIDAgNC4zNTUtMS4zNjUgMTQuMyA1LjMzNCA0LjE2LTEuMTcgOC41OC0xLjc1NiAxMy0xLjc1NnM4Ljg0LjU4NiAxMyAxLjc1NmM5Ljk0NS02Ljc2NCAxNC4zLTUuMzMzIDE0LjMtNS4zMzMgMi44NiA3LjE1NCAxLjA0IDEyLjQ4Ny41MiAxMy43ODggMy4zMTUgMy42NDIgNS4zMyA4LjI2IDUuMzMgMTMuOTg0IDAgMTkuOTY4LTEyLjE1NSAyNC4zOS0yMy43MjUgMjUuNjkyIDEuODg1IDEuNjI2IDMuNTEgNC43NDggMy41MSA5LjYyNiAwIDYuOTYtLjA2NSAxMi41NTMtLjA2NSAxNC4zMSAwIDEuMzY1Ljk3NSAyLjk5IDMuNTc1IDIuNDdDMTAxLjExNSAxMDYuNTA3IDExNiA4Ni45OTUgMTE2IDY0LjAzNSAxMTYgMzUuMjg0IDkyLjczIDEyIDY0IDEyUzEyIDM1LjI4NSAxMiA2NC4wMzR6IiBpZD0iZSIvPgogICAgICAgIDxmaWx0ZXIgeD0iLS41JSIgeT0iLS41JSIgd2lkdGg9IjEwMSUiIGhlaWdodD0iMTAyJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAuNTI5Mjk2ODc1IDAiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZmlsdGVyIHg9Ii0xJSIgeT0iLTElIiB3aWR0aD0iMTAxLjklIiBoZWlnaHQ9IjEwMyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImgiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93Qmx1cklubmVyMSIvPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49InNoYWRvd0JsdXJJbm5lcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0SW5uZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC4yNTg4MjM1MjkgMCAwIDAgMCAwLjEzNzI1NDkwMiAwIDAgMCAwIDAuNDMxMzcyNTQ5IDAgMCAwIDAuNzAzNTQ5NTkyIDAiIGluPSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8dXNlIHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjQkFCQUJBIiBzdHJva2Utd2lkdGg9IjIiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8Y2lyY2xlIGZpbGw9InVybCgjYykiIGN4PSI2NCIgY3k9IjY0IiByPSI1NiIvPgogICAgICAgIDxnPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNmKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICAgICAgPHVzZSBmaWxsPSJ1cmwoI2cpIiB4bGluazpocmVmPSIjZSIvPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNoKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==\"},{\"name\":\"知乎\",\"url\":\"https://www.zhihu.com/search?type=content&q=%ss\",\"favicon\":\"https://www.zhihu.com/favicon.ico\",\"faviconData\":\"data:image/vnd.microsoft.icon;base64,AAABAAEAICAAAAEAIACoEAAAFgAAACgAAAAgAAAAQAAAAAEAIAAAAAAAABAAABMLAAATCwAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/ZQBg/2cAv/9lAP7/ZgD//2YA//9mAf//ZgD//2YA//9mAP//ZgD//2YA//9mAP//ZgD//2YA//9mAf7/ZgH//2YB//9lAP//ZgD//2YB/v9nAP7/agH//2sA//9sAe7/bwC//3EAXwAAAAAAAAAAAAAAAAAAAAD/YAAQ/2YAz/9lAP7/ZgD//2YA//9lAP7/ZgD//2YA//9mAP//ZgD//2YB/v9lAf7/ZgH//2UA//9mAf7/ZgH//2YA//9mAP//ZgH//2YA//9nAf//aAD//2kA//9rAP//bAD//24A//9wAP//cQD+/3QAv/9wABAAAAAAAAAAAP9lAb//ZQH+/2YA//9mAP//ZgH//2YA//9mAP//ZgD//2YA//9mAP//ZgD//2YA//9mAP//ZwH//2YA//9mAf7/ZgD//2YA//9mAP//ZwD//2gA/v9qAP//bAD//2wB/v9uAP//cAD//3IA//9zAP//dQD//3cAzwAAAAD/ZgBf/2YA//9mAP//ZgH+/2YA//9mAP//ZgH//2YA//9lAP7/ZgH//2YB/v9lAP7/ZgD//2UB/v9lAP7/ZgH+/2UB/v9mAP//ZgH//2cA//9pAP//agD//2wA//9uAP//bwD//3AA//9xAf7/dAD//3UA//92AP//eAH//3kAX/9nAL//ZQD//2YB//9mAP//ZgD//2YA//9mAP//ZgD//2UA/v9lAP7/ZgD//2YA//9mAf//ZgD//2YA//9mAP//ZgH//2cB//9nAP//aQD//2sA//9sAP//bgH//28B/v9wAP7/cgH//3MA//91AP7/dgD//3gA//95AP7/ewC//2YB7v9mAf//ZgD//2UA/v9mAf//jUD//59g//+MQP//ZgD//2UA/v9lAf7/ZgH//2YA//9lAP7/ZgD//2UA/v9mAf7/aAD//2kA//9rAP//bAH+/20A/v9vAP//cQH+/3MA//9zAf7/dQD+/3YA//95AP//egD//3sB/v99Af//ZgD//2YB/v9lAP//ZgD//2UA/v+gYP//9e/////////Yv///eSD+/2YA//9mAP//ZgH//2UA/v9mAf//xaD//2gA//9qAf//awD//2wB/v/JoP//lED//3EA//9zAP//dAD//3YB//93AP//eAD+/3oA//97AP//fQH+/38A//9lAP7/ZgH//2YA//9mAP//ZgD//2YA//+CMP//9e/////////s3///ZgD//2YB/v9lAP7/ZgD//6lw////////cxD//2wA//9tAP//bgD///bv////////wpD//30R//91Af7/eAD//3kA//96AP7/fAH//30B/v+AAf//gAD//2YA//9mAP7/ZgD//2YA//9mAP//ZgD//2YA//+fYP////////////+zgP7/ZQH+/2YA//96If//9e////////9+IP//pGD//////////////////////////////////////////////////3wA/v9+Af//gAD//4AA/v+CAP7/ZQD+/2YA//9mAf//ZgH//2UA//9mAf//ZgH+/2YA///FoP///////+zf//95IP//ZwD//9m/////////2r///20B//+lYP//////////////////l0D//9Wv////////////////////////fgD//4AB//+AAf7/ggD+/4QB//9mAP//ZgD//2YA//9mAP//ZgD//2YA//9mAf//ZgH+/3gh/v///////////6Fg//+scP7///////bv//+AIP7/bwD+/6Zg////////3L///3UA//92Af7/eAD//3oA//+LIP////////////+AAP//gQH+/4IB/v+EAP//hQD//2YA//9mAP//ZQD+/2YB//9nAf//ZgD//2UB/v9mAP//ZgD//8ag////////2r///+zf////////rnD//3AA//9xAP//p2D////////dv///dwD+/3kA//95Af7/fAD//40h/v///////////4IA//+DAP//hQD//4YA//+IAP//ZgH+/2YA//9mAP//ZgD//2YA//9mAf//ZQD+/2YA//9nAP//jkD+///////27///fyD//8CQ//9wAP//cQH+/3MA//+oYP///////96///95AP//egD+/3wB//9+Af//jyD/////////////gwD//4UA//+HAf//iAH//4kA//9mAf7/ZgD//2YA//9mAP//ZgH//2YA//9mAP//ZgD+/2gB/v9qAP//9u////////+JMf7/cAH//3EA//9zAP//dAH+/6lg////////3r///3sB//99Af//fQD+/38A//+RIf7///////////+FAf//hwH//4gB/v+KAP//igH+/2YB//9mAf7/ZgH+/2YA//9mAf//cBD//3oh/v97IP7/fSD//34g///kz////////51Q//9xAf7/cwD//3UA//92AP//q2H+///////ev///fQD//34A//9/AP//gAH+/5Ig/////////////4cA//+JAf//iQD+/4sA/v+NAf7/ZgD//2YB//9mAf7/ZgD//2YB/v+9kP///////////////////////////////////////////////////////+7f//+tYP7//////9+///9+Af//gAH+/4EA//+DAP//lCD/////////////iQH//4oB//+MAf//jgH//48A//9mAP//ZgH//2YB/v9mAP//aAD//3wg///av///7N///+3f///t3///9u/////////37///7t///+7f///v3///zp///61g////////37///4AB//+BAP//gwD//4QA/v+VIP////////////+LAf//jAD//44B//+PAP//kQD+/2YB//9mAP//ZwD//2kA//9pAP//awD//20B//9uAP7/cAD//3EA//+5gP///////8uf//93AP//eQH//3oA/v97AP//rmD////////gv///ggD//4MB/v+FAP//hgH+/5ch/v///////////4wA/v+OAP//jwD//5EA//+TAf7/ZgD//2cA//9pAf//agD//2wA//9tAP//bwD//3AA//9yAP//cwD//7mA////////zJ///3kA//97Af//fAD//34A//+vYP///////+C///+EAP//hQD//4cA//+HAf7/mCD/////////////jwD//5AA/v+RAf//kwH+/5QA//9nAP//aQH//2oB/v9sAf7/bQD//5tQ//+vcP7/ehH+/3QB//91AP//uoD////////Nn///ewD//3wB/v9+AP//gAD//7Bh////////4L///4UA//+HAP7/iAD//4oB/v+aIP////////////+QAP//kgD//5MA//+UAP//lwD+/2kA//9qAP//bAD//20A//9vAP//lED////////u3///hyD//3cB//+8gP///////86f//98AP//fgD//4AA//+BAP//sWD////////gv///iAH//4kA//+KAP//jAH//5sg/////////////5IB//+TAf//lQD//5cB/v+YAP//agD+/20B//9uAf//cAH//3EA//9yAP//3L/////////DkP//eAH+/7yA////////z5///34A//+AAf//gQD//4MB/v+yYP///////+G///+JAf//igD//4wA//+OAP//nSD/////////////lAH//5UA//+XAf7/mAD//5oA//9sAf7/bgH+/3AA//9xAP//cwD//3QA/v+pYP////////fv///ev///79/////////37///37///9+////fv///s2D//7Nh////////9+///+G////jv///47///+O////jv/////////////+VAP//lwD+/5gA//+aAP//mwD//24A//9wAP//cQD//3MA/v91AP//dgD//4gg//////////////////////////////////////////////////+0YP//tGD//////////////////////////////////////////////////5gA/v+ZAf//mgD//5wA//+eAf//cQD//3EB/v9zAP//dQD//3YA//94AP//eQH+/9av////////x5D//6BA/v+hQP//oUD//6NA/v+kQP//pUD//4kB//+REf//qUD//6pA//+rQP//rED//61A//+uQP//r0D//7BA//+yQP//mQD//5sA/v+cAf//ngD+/58A//9yAP//dAH//3UA//92AP//eAH+/3kA/v97Af//rWD////////nz///gQD//4IA//+FAf//hgH//4cA/v+JAP//igD+/4wA//+NAP//jwD//5AA//+SAf7/kwD//5YB/v+WAP//mAD//5oA/v+bAP//nQH//54A/v+fAP//oQD//3QA//91Af//dwD//3gA//96Af//ewD//30A//9/AP//t3D///fv//+TIP7/hAD//4UA//+HAP//iAD+/4sA//+MAf//jQD//48A//+RAf//kgH//5QA//+VAP//lwH+/5gB/v+aAP//mwH//50B//+eAP//oAD+/6EA//+jAO//dwG//3cA//95AP//egH+/3sA//99AP//fwD//4AA//+CAf//hAD//4UA//+GAP7/hwH+/4kA//+LAf7/jAD//44B/v+PAP//kQH+/5MA//+VAf7/lQD//5cA//+YAP//mgD//5wB//+dAP//nwH//6AA//+iAf//owH//6QAv/94AGD/eQH//3oA//98Af//fgH//4AA//+AAP//ggH//4MA//+FAP7/hgH//4gA//+KAP//iwH//40A//+OAP//kAD//5EA//+TAP//lQD//5YB/v+XAP//mQD//5sA/v+cAf7/nQH//58A//+gAP//ogH//6MA//+lAP//pgBfAAAAAP96Ac//fAD//34B/v+AAf//gQD//4IB//+DAf7/hgH//4YA/v+IAf7/igH+/4sB/v+NAP//jgD+/5AA/v+RAP//kwD+/5UA//+XAP7/lwD//5kA//+aAP//nAD//54B/v+fAP//oQD//6IB//+kAf7/pQD//6cAvwAAAAAAAAAA/4AAEP99AL//gAH+/4EA//+DAP//hAH+/4UA//+HAf//iQH//4oA//+LAP//jQH+/44A//+QAP//kgH+/5QA/v+UAP//lgD//5gA//+ZAP//mwD//5wA//+dAP//nwH//6EB//+iAf//owD//6UA//+nAM//nwAQAAAAAAAAAAAAAAAAAAAAAP+BAF//gwC//4QA7/+FAP7/hwD//4kB/v+KAP//jAD//40A//+QAf7/kAD//5IB//+UAf//lQD//5cA//+YAP//mgH+/5sA//+dAf7/ngD//58A//+hAP//owH//6QA//+lAL//pgBfAAAAAAAAAAAAAAAA4AAAB4AAAAGAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAABgAAAAeAAAAc=\"},{\"name\":\"Wikipedia\",\"url\":\"https://zh.wikipedia.org/wiki/%s\",\"favicon\":\"https://zh.wikipedia.org/favicon.ico\",\"faviconData\":\"data:image/vnd.microsoft.icon;base64,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\"},{\"name\":\"类义词典\",\"url\":\"https://www.powerthesaurus.org/%s\",\"favicon\":\"https://www.powerthesaurus.org/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAMAMDAAAAEAIACoJQAANgAAACAgAAABACAAqBAAAN4lAAAQEAAAAQAgAGgEAACGNgAAKAAAADAAAABgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixaA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/8FxDP8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/wXEM/5lWAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/BcQz/mVYB/5lWAf8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/61jBv+ZVgH/mVYB/5lWAf8AAAAAAAAAAAAAAADnixaA54sWgOiLF7/oixe/6IsW/+iLFv/oixe/6IsXv+iLF7/nixhA54sYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/rWMG/5lWAf+ZVgH/mVYB/5lWAf/nixaA6IsXv+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLF7/oixe/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv+tYwb/mVYB/5lWAf+ZVgH/wXEM/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/8FxDP+ZVgH/mVYB/8FxDP/UfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/1H4R/5lWAf+ZVgH/wXEM/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/rWMG/5lWAf/BcQz/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/BcQz/mVYB/8FxDP/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv+ZVgH/wXEM/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/8FxDP+tYwb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/5lWAf/UfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/1H4R/61jBv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/rWMG/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/wXEM/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/wXEM/+eLFoC/cAyAAAAAAAAAAADnixhA54sWgOiLF7/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUfhH/1H4R/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixaA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLF78AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/1H4R/5lWAoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA54sWgOiLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADUfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/v3AMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeLFoDoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/BcQz/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv+aVwG/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixaA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixe/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/9R+Ef+XWABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixhA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixe/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/9R+Ef+XWABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/8FxDP+XWABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixhA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/8FxDP+XWABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixhA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixe/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/8FxDP+ZVgKAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixaA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixe/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/8FxDP+ZVgH/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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AAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/5lWAf/BcQz/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/5lWAf/UfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/5lWAf/UfhH/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/5lWAf/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/61jBv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/61jBv/oixb/6IsW/+iLFv/oixb/6IsW/+iLF7/nixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/wXEM/9R+Ef/oixe/6IsXv+eLFoDnixaAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADnixaA6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/6IsW/+eLFoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPAA/////wAA8AD/////AADwAP////8AAPAA/////wAA8ADgA///AADwAAAA//8AAPAAAAA//wAA8AAAAA//AADwAAAAB/8AAPAAAAAD/wAA8AAAAAH/AADwAAAAAP8AAPAAAAAAfwAA8AAAAAB/AADwAAAAAD8AAPAAAAAAPwAA8AABgAAfAADwAA/wAB8AAPAAH/gAHwAA8AA//AAPAADwAH/+AA8AAPAAf/4ADwAA8AB//gAPAADwAH//AA8AAPAAf/4ADwAA8AB//gAPAADwAH/+AA8AAPAAf/4ADwAA8AA//AAPAADwAB/4AA8AAPAAD/AAHwAA8AAAgAAfAADwAAAAAD8AAPAAAAAAPwAA8AAAAAB/AADwAAAAAH8AAPAAAAAA/wAA8AAAAAH/AADwAAAAA/8AAPAAAAAH/wAA8AAAAA//AADwAAAAP/8AAPAAAAD//wAA8AAAB///AADwAP////8AAPAA/////wAA8AD/////AADwAP////8AACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOeLGEDoixb/6IsW/+iLFv/oixb/6IsW/+iLFv/oixb/54sWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA54sYQOiLFv/oixb/6IsW/+iLFv/oixb/6IsW/9R+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\"}],\"download\":[{\"name\":\"人人影视\",\"url\":\"https://yyets.click/search?keyword=%s\",\"favicon\":\"https://yyets.click/favicon.ico\",\"faviconData\":\"data:image/vnd.microsoft.icon;base64,AAABAAEAQEAAAAEAIAAoQgAAFgAAACgAAABAAAAAgAAAAAEAIAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAADpowj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aEE/+ytJP/ttTj/7rU5/+yvKP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6qYR/+ywLf/ttDX/7LAr/+qlD//poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poQT/66wh/+2yMf/tsS3/66gY/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+qnE//yyXD/+efA//789////////////////////////v37//rszP/0z4D/66wh/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAB/++6Rv/225///PTi/////////////////////////v7//PLd//bZmf/utz//6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/66od//PNe//66cb//vz4///////////////////////9+O3/+OKx//HDX//ppAr/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6qQN//TSiP/++/T///////////////////////////////////////////////////////79/P/33aP/66oc/+mgAP/poAD/6aAA/+mgAP/poAD/77xM//vv1P////////////////////////////////////////////////////////////rszf/uuUT/6aAA/+mgAP/poAD/6aAA/+mgAP/rqhr/9tuf//79+////////////////////////////////////////////////////////fjs//PMd//pogb/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/7bQ4//zz3/////////////////////////////////////////////////////////////////////////////358f/wwVr/6aAA/+mgAP/qpAv/992k//////////////////////////////////////////////////////////////////////////////7+//bZm//powj/6aAA/+mgAP/wwVn//fnw////////////////////////////////////////////////////////////////////////////++/T/+ywK//poAD/6aMI/+mjCP/poAD/8L5R//789/////////////////////////////////////////////////////////////////////////////////////////7+//PPfv/qpxX/+uzN////////////////////////////////////////////////////////////////////////////////////////////+unG/+qmEf/0z3////7+///////////////////////////////////////////////////////////////////////////////////////9+fH/7rhB/+mjCP/powj/7rlD//78+f///////////////////////////////////////////////////////////////////////////////////////////////////////fbn///////////////////////////////////////////////////////////////////////////////////////////////////////89OT///////////////////////////////////////////////////////////////////////////////////////////////////////769P/utj3/7Kwi//336////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////PXm//jjtP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9+e///ffq///+/v////////////////////////////////////////////////////////////////////////////////////////////79+//99+v//v78//////////////////////////////////////////////////////////////////////////////////////////////////769P/+/Pj///////////////////////////////////////////////////////////////////////////////////////////////////////jkt//tsjH/6aAA/+mgAP/rqx//9tiW//7+/v///////////////////////////////////////////////////////////////////////fbp//HEYP/qpAv/6aAA/+qkDf/xxmf//fjt///////////////////////////////////////////////////////////////////////+/v7/9tmb/+yuJv/poAD/6aED/+64Qf/66sf///////////////////////////////////////////////////////////////////////////////////////fdpf/poAH/6aAA/+mgAP/poAD/6aAA/+mgAP/zynL//////////////////////////////////////////////////////////////////ffp/+usIf/poAD/6aAA/+mgAP/poAD/6aAA/+yvKP/9+O7/////////////////////////////////////////////////////////////////8slw/+mgAP/poAD/6aAA/+mgAP/poAD/6aIF//jktv////////////////////////////////////////////////////////////////////////////358P/qpQ//6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rqx/////////////////////////////////////////////////////////////HFY//poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/8shs////////////////////////////////////////////////////////////+enE/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/rqRn//vrz///////////////////////////////////////////////////////////////////////336r/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vu0j///////////////////////////////////////////////////////7+/f/qpQ3/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+miB//89OP///////////////////////////////////////////////////////LIa//poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//DBWv/+/fv///////////////////////7+/f//////////////////////////////////////9daQ/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rqyP/////////////////////////////////////////////////9+fD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/8shr///////////////////////////////////////////////////////vvU//6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/7rY7//jkt//9+fH//frx//jkuP/uuUT///////////////////////////////////////jhsP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vu0n//////////////////////////////////////////////////v79/+qmEP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+miB//89OP/////////////////////////////////////////////////8sht/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI///////////////////////////////////////++/b/6qcV/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rqyP/////////////////////////////////////////////////yx2v/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/8sht//////////////////////////////////////////////////rqxv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP////////////////////////////////////////////HFZP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vu0n//////////////////////////////////////////////////PTi/+miBv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/89eT/////////////////////////////////////////////////66wh/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj////////////////////////////////////////////00IH/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rqyP/////////////////////////////////////////////////yx2n/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/8sht/////////////////////////////////////////////////+64QP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI////////////////////////////////////////////8cVk/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vvEv//////////////////////////////////////////////////PTi/+miBv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/89eT////////////////////////////////////////////srib/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/+/v3//////////////////////////////////vr0/+qoFf/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rryv/////////////////////////////////////////////////xxmf/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/8shs///////////////////////////////////////67c//6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/9NCB/////////////////////////////v79//HEYf/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vvEv//////////////////////////////////////////////////PPg/+miBv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mhBP/5577////////////////////////////++vP/7bM0/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/wwFf/++7R//7+/v/+/v3/+urI/++6R//poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rryv/////////////////////////////////////////////////xxmf/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMJ//TTif/9+O7///////7+/P/55br/7bEu/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/pown/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vvEv//////////////////////////////////////////////////PPg/+miBv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aEC/+upGf/qpAv/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rry//////////////////////////////////////////////////xxmb/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vvU3/////////////////////////////////////////////////+uvJ/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rszP////////////////////////////////////////////358P/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/vvU3////////////////////////////////////////////88t3/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA//rszP//////////////////////////////////////9dWQ/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/ttDf//vz3/////////////////////////////PPg/+qnFP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+61Ov/77tL////////////+/v7/+OS2/+urHv/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+yuJf/utjz/66ka/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powj/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/powj/6aMI/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aMI/+mjCP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mgAP/poAD/6aAA/+mjCP/powjv6aAA7+mgAO/poADv6aAA7+mgAO/poADv6aAA7+mgAO/poADv6aAA7+mgAfHpowj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aMI/+mjCP/powj/6aAB8emgAO/poADv6aAA7+mgAO/poADv6aAA7+mgAO/poADv6aAA7+mgAO/powjvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\"},{\"name\":\"动漫花园\",\"url\":\"https://share.dmhy.org/topics/list?keyword=%s\",\"favicon\":\"https://share.dmhy.org/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,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\"},{\"name\":\"RARBG\",\"url\":\"https://rargb.to/search/?search=%s\",\"favicon\":\"https://a.favicon.im/rargb.to\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB+UlEQVQ4jYXTP2hcRxDH8c8JJZjbYNy8V7gIr0qhg5AiFnETX+PmVAtSmKDaUhUiFyGxjXFlp0hhHy5cqFd9lSGcU55cBU6EEMIj5dsmMewSjNGmOJ3852wysMyww37n94OdXimlh49xDR/hxGr8hZ/xx0qnlHK5lPKk/H/8U0r5oZTyQSmltzzr+AKfT+ed8UFLeHNAH1UVbA2r88NBfQcX8O2yv74sUqKNWT+T01sy2+zpUbS/w/awvo7H+O0NQEA/LPKlQWXrSgUmR9HxcZQwmbZGw/pc4MsVAIT+IjcNw80aTjaaem1vPCNlGakj1C6uWFiqeDtyTvoyqAKhBn++E7CkxC6Zzjop57XpUSenpIuMhpXAc/zyHkAicRSjw6fHZ1ewPdqwszWAB2hXACln8+NWSlld9zX9YN7GhajQXz5+joPXR66deU1J27Zi7FzaqE0OdmwNGzF2Ymzt3j+E8/gJH64AFlozKS4+Be7tjwyaIKVsOpnavX0II9x8ByDLKco5SwvjL0MI/z64tyOcwsfjQw8PJvAdvsb6GSBlxI7UyTnD37i7OWhe3NrflvOit3djbDKdwR181SulXMXdrkubbdvKaOpK09S/4jP8iG9m8zmJjCoEg0HzO77vna7zp7ju1TqfYIyZxT7dwCd4eWr7BR7h2X8S6gShJlbKYQAAAABJRU5ErkJggg==\"},{\"name\":\"1337x\",\"url\":\"https://www.1337x.to/search/%s/1/\",\"favicon\":\"https://favicon.im/1337x.to?larger=true\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB8UlEQVQ4jcWTsWsUYRDF38z37WbvAkJEBIVDREEEETsbG1GwMJXapLSxUEvTRSxEUsVeFALaWIighZg/QRBMEEFEBEE9Qkji5e72dm935lmEmMilS+E0M8384M17IySxl9I9bQOIW8PPqZNX030TdylKB5Kq25lnOZijRmg6dj47eHgWIWZQzer29xeHni7O/AOoB/kHaAyh0TxFUYR07JZX5fParR0b4zdF9SxEwKr0apC/H5HgZt+qvDstdVUqHSFJjyLEK6J6TrPG5Natqu7v+1B9PSIhxAgBFqwsXoroFElo1pxWDesQySCKKu99qnsbjyDiIwDZbKyL/mwI8RKSdH9MsxZDbEmI8HJQD398nbNy0IZs3/7vRDPQDDD7aEX+OIQIiEBjgHfXUXxZelcs/3pW93uouxujLtR5DyChjXFNsmYLIrC8By6vwTqr8Gp4QEQmUFUru9oIcFOHVRe837lmq22wyAEzaJIgJOkJjbxd1/W9nYBtMcMCGJZjWvbv2NpyyrwLd1t0kTc70nqdwDHuBnAzkH6ZxEXRAIrCzB+62Yy59+kOiLQA3CAZRgHkcYg8AKAkQfIzybcUWXLnAkTgZlDVaQEmR3MQwukQQkFyEUDi7k9EZGXTYs67+xGSIcaYDd3PAHgFAPLfv/EPJs4IQHNr/+kAAAAASUVORK5CYII=\"},{\"name\":\"海盗湾\",\"url\":\"https://thepiratebay.org/search/%s\",\"favicon\":\"https://thepiratebay.org/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,Qk04AwAAAAAAADYAAAAoAAAAEAAAABAAAAABABgAAAAAAAAAAADgTAAA4EwAAAAAAAAAAAAA/////////////////////////////////////////////////////v7+/////////////Pz8vb297Ozs////////////////////////////////4uLiSUlJ3d3d////////8/PzEhIScnJy8fHx////////////////////8fHxwsLCWFhYAAAAyMjI////////5+fnEBAQICAgQkJCV1dXZWVli4uLiYmJUlJSKioqPT09bm5uHh4eYWFhwcHBubm5bGxsQEBAp6end3d3FBQUAAAAFBQUOTk5ISEhGRkZPT09WVlZQkJCKioqJycnenp6AAAAQUFBPz8/YGBgjo6O0dHR+/v7////////7+/vxcXFnZ2dg4ODExMTQEBAv7+/AAAAgoKCjo6OpaWltra2qqqqpqampaWlpKSkra2tr6+vsbGx5eXll5eXW1tb1NTUcXFxmJiYAwMDAAAANzc3VFRUGxsbAAAAX19fPDw8ERERAAAAQUFB/v7+/Pz8////////nJycAAAAAAAAAAAAHx8fCwsLAAAAJiYmBQUFAAAAAAAAKysr+vr6////////////nJycAAAAAAAADw8PAAAAAAAAAAAAAAAADQ0NAwMDAAAANjY2+vr6////////////rq6uAAAANjY25eXlWVlZHx8fJycnIyMj0dHRhoaGAAAAV1dX////////////////r6+vAAAALS0t0tLSX19fsrKy2dnZZWVlsrKyiIiIAAAAWVlZ////////////////r6+vAAAAAAAABQUFAgICExMTEBAQAwMDAwMDAQEBAAAAWlpa////////////////q6urAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAVFRU////////////////19fXSUlJQUFBQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQkJCQkJCqKio/////////////////////////v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+/v7+////////////AAA=\"}],\"user1792802683546\":[{\"name\":\"BTSearch\",\"url\":\"https://www.btsearch.love/search?keyword=%s\",\"favicon\":\"https://btsearch.love/logo.png\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABIFBMVEUUPEz////tUlHl5eXk5OTm5ubj4+Pu7u74+PgUMT319fXx8fHr6+v7+/sAO0zz8/MAKT3tR0XxwL/P0tTzU1EitMoALzwAMUMAr8f3U1EANUYALUAAJjoUNkQAJzsAIjcAHTMzPkznUVGsSk/ZT1C5S08tX22hqq4gPUyaSE7JTVCNRk5OQE11RE1cQU20S0+z3eWb0t1gvs/X7PDW3d+UnaJGXmjAxshWbHUeSFaCkpittrppd3+ERU5lQk3ETU87V2KnzdV2w9Le7/OJzdq919zs9/lowtOFzNlIuMu31dvV1NUsfY6jxMwAWWoPHy8BnbOSqrEgipwspbkLbn+Asr1QjJqli4/WREYvSld0g4pCP02FkpgAEy1RQE0zNT+ugBmWAAAWuUlEQVR4nOVdfX/aOLbGsYWpLQO74NqxSaBtZkmTdpoXCCTQbZo2ael0d7ud2Xtvstnp9/8WV34D20hHkm2Se3f1D+H8HKHHOjrn0SNZrimK0lCR2iCfGlJ18qGrSEtZVUGrwbQipGKm1YSs1tKKilq12n8GQk3VQoRq3D61XtCqqjGWpdXIWLV1qxlZrdiKKrNqsbXWaDQMXdcN8kk+TPJhks+Hs7aqtLYo1hq5AWFnaNFtr6v1oDPqElZys7CANbzBWatVT7pTi28734pkrBqx1hB1mG14SIKDr4IhqaWsD9yH6iP04f/TcUgbcYxx+O8fSx9u8D1mPqxr0TDT6mH7yKeIFfOsVmzVNC1nNZhWNbKaxa0oZ62RH4qiR66pUtaoi0ZpqwwsbdUooxpYKWuF2QK9R6IOy3RNdN1IuVtV2aJseEms+AopguGFGXTUD0dVB51adcnA/HRaPnF8+GRVnDiiSFMoza9ZP35Ea8mfS9Vy1pFbOvlrWWuV2eLYxqWzRd291gsOPjBbVNOHR+4ISdPtnBW5V3rJPsxZqxyHR+6xVZaqWbZrVTwOq4ul6Mhd0KKmHIGz3VNUnqqlY2mF+fDadRulZ08L9yOuNh9qlVE1jSA8KstplBPbxpUSuCwvladqSytx2BvXXqCsNQNLo4LNWvGJ7X4I3I0KQKNSNdhaWbYYhQjdOn3GIZgtbhT8yXaPKU4o4LAakC0qmB+ikf3BIgjfx9Y4kKgC4QWtgsPJsXll24tKZ40l5/h4aW0t3M+2bZ8YmWuRQL0YJ1bri7sgCF09kyKMx9Ta1NHNMqEf20FxDS2l09x8MAUI3BFOknTdDes4Rqk033qP5KladVqbcbW0fohad41S2eJKSFU7HiVWfRHepgVOXXv9/lG1NuvqNOkXM2rdFU4GqqafXglpbR8WOO4BdBzdplHq2sWouNamltfaWl9sM7Y2Ajc9dl1jeW3D/mKK0K+We5pYdYLw6sQ9NpJrzaOF9bhaW919n1hPSSgdIdKpybVHbj0XSykEjsQ89HmxjITEEa6U60+tZXwMcoc8VatQa8ML10qsQR9ic3mt5S6w0OyJENojJbYSN3VTAwpfBfn/UbU2MnKOE+tHkizQipR9JDFREyFwqkIIbWwdEYQ3K/pFvlpKSa1NKtJoOaum3ty47ijuouvg/ifXqiPXvbm5yWcLLRdpAuupuXCvkjixIKwBJQDMT+5n4zp97YrAZaxr2aI6rc0+CYJ7YDUIrSFTn8RZMBlRCzt1LQpqwDh04xZxpZXDkllXREZVjA1CGz4lzo2+uPaJ+wUicAyqVqHWRsJLRNVOF27w53Ey4N8H3z4ECAMsChpNJpPZbEzKcDibzSad8DbgEDe5GcHU0kRXdpAtXBSHDBzUQfA+qtamfCLh5YR8tcJ06B414mtPSPL4TG6D3pmN52dOv7fbbvu+ExSflPbuoHc5vR9OgoaR2/T505Flmu9DgJ9w9Gvmx6vPtotZSSZn1amJQy+vtdVd9zQkcEFvnmC0HGZHrt0Zzi97Pd/xvBq1eI7fHtSm41+u7IWOg6ET9ObpakCRGf/HaMVHkqpVqbXhY+JggdUKiDeOp/u6rtn2177DgJbD2fNs9y9Yt0Lq516vBhQZoejRtTakL0h4IRc1LHL/6+FwMCZ3+3+13b8JwItK+6v9bTCfkQaS23S86gECFz+61nZKpqxXRqy1udeWReB5bc/5Ztvf/iqK8Cvp/nPP353OCLs9acW/ZpL0s3hvro0tmKoZVWttZPgt9NhhF+6ROa71nKDRf/vVtkUR7pNr/7QTOKzvfyXTw2UsPbbdz4WoWqVa26kbydQ6wh+Irzlxq/8UN1qoPPnV/v4k+nP3V/vvSG+EA4oMgM//F7S2a/ckyOIGHu5/t5Ox9+SbBMBabedX+zz+89z+bfdCDQffNQFYkdYmFWm0TKQh1lOXeCge1vzaztIxz6UABr34Pb5+5/v3HWdwNyItPgmyfelIw3VNAYc9vWoNfT9o3W9fo3Y63+QAkn+1V2CJw3qDuXlzwqNqIgSuvNYW1POPcz9uZ4zw/DdJgKR8TTrxt/3gwxv8l6VsTGvDElZdGV3urroi9ynTi/k/HH9omMWoWqX72qz5QIS5FCrt21ExqlblvraJ7/BbWrwM7sj84+G0trVlUaxP+5vER4rjTXRNOoBWpbUpMyFqXbL074wWm5RxrSViqanMww70/Da1SIFn1BGOAGe/o0tStUq0Nr1zHv6+d9ahl6kMxAm1il8uoizUH5sPr7W1hvEIHAT1UYs4wvaEVUd8m9rTllKR1hY7YZ1qXUUaTblPQkyT1TjlnA0pV3Z/YdUxjiO1czvCBSNNsWyBpzGJIU7KRNgWRugz+3C2/B1/ohcicIXmh0jbX3qgd8dq3M1AHOGQVckvveVF/ZmilNPa0qQMQ1TNGKWkJYfZuJF4qnQuWJW0UrdpMFTSpCxsGc4TuMRaRmvDnTSLYQeJjriXenNWJUr6t/p35kNobfqkl25cb8Rq23IICSBkD+azdERu3wVz7Q1rbXiSdb4Bs21DcYQ1j1nLXYb2tueKLIGT1doak5zv3Qq2DS7/Er1P7TtLksBJxlKcB+hNmW2bS3Cagc6qJf+DxFE3qbXhTj4+OvdMhLfiAGt95mjW8r+4ex80fkNam1pfG1r+jIlwIIGQnfKVXv7afpCfJLU2Yap2vuZ4vU41CNk3at0VBhOcc80Q1prDRlYZrc2crseOQYvVsjX3goozZiKkTFEGHSRO4CTmh+YdJfw7zJZJJHyI+yn3tJCMJLU2rGMKVctZjRmlU4BULZHwwZBMq8c7s2hUDdMInLBOY9VpXgfQLZmETwrbF3YpV/sXplax1oYM6mwPGD8XUhqcz6wHU8dzn0QbpVKtTZ9TG8zm3VIJn7T4hlWPRfcFr64qYjNgw4hJmRGRHCOiajmrRRuENShTK5cyAGt9xKyIzhxIBDCj9oZUzYip2hLF0ioYS3XGoOoxk4WEShOUNjuvMpyhN9Or1NqYuhmzXYqcVAyk/DFjQLdHlWltWmvCaC6QLHQ5hM7fmTWx0o53ZgpqbQJzC1bgd9iJerTGJ2GETB1D6bBq6s0qm1swZ3pskWZt1sMpQGI1mN7gN3hamyqgtZH/GA1YPwEkCylKQxBeMmtSmP9EXEhIa8MhKcM5qrayKpfMsNjXmM1ixQdmYSNk//5gpGep2gqFhNaGhjTaFJVeg9ksGQ0jKGxSA7CjkM6W1tp0oFlskYadXxilZzKrAhhuv1NOawuH5JhdPzAjkKQ0pK11ZlVQ0LoV1NoSqmZEj+GkCJzZArwN4N2K7DAEghade0dld9ZqGTmqFqJYWnmxFEMRw/vvPzKLLEKnYF3nerl8iHSo9ua7P7DK/zQlETYPmXX9YR/4v/asQRl8IlpbNCQROI9tPt9ilO6BNMLXXVZl278DlUWJVFBry+5ziqyw6Mlq01b3hTTCn7eZlb2FKut1EKzTUFxz5bDWmgKcKf9kN+qlLMLafsHKvKlZQGtL+hDOas0/F7zt9ML00u5PYGVkFiWotVk4T+B0eILQPGQ36rU0wuYeq7KtPbAyZ9zKaG0YZwgcrNPA5LL5gh0cXlWJ8Dlc2XkJrQ3eTdF8x0Yoi4/U9hO7tmfgfxLqJqW1pZYw4DgDJAveXafWBnjEn8HqvDuO1pahauTTTKhPgzc/YDaJM3LoCIFRzYlbvrmiakHzg69LApdde8oSOMwB+IwdSqUTPpjyedk1lLEKaG2II0RATXpTACGQ8jk3LJzjiGltWprA4Tt4itd8WfimUwvbJbhO71uA1raMpXGaR6vkz2lR803hgUMt++xh3eVU156gbJqPuxOeW5i8PU1AAiuQ8MHQvP1PuD7nQhfR2lZ0O+zDFm95rESLZOvj3rFbk621BU/mhlQNYysgOTgicBg3eEoLmyrzUjQDIZtAcIl8ILqFVC08RqQRowgInMXWaRirWqsGsWPf1lYBgBCp4XDvcC+HvNbGHYZv2ZGhAKUBYzM3mDoXQqddZ/uQJ1oDLKsIpQFJzdYWp0Iy0we1tjRVSz4anGwIDpt3hRCyGQSfyQ+yVC1F4Jham87btAUliyIJv9b8HQhdvNlYe6IrklobGvAaBCRoeQ0jKACp4VIIZ6iztTbqYWVowl6tKN8eRmFWyL9nXri3lq21UWIpN9CwRRrefI5Z5XM2Ql668M6UNFXLx1JatqButko3B0gWBTSMsEr2yOZHZ19RJbU23nYYKFkUojRgyuemi9rgRoW0tiVVM62GFRI47tpR86DihA9OVra2IWU/KL2RnqJqDWtJ4FhaG7heETYHcKmiCAFSwx3a4dqVhNamIt5mkSYQSgtoGGGVwNDuHvKY6VBQa4uHpMrc4pG0hq3o8wMfq06Ay3NJRLjhnK21mXr8EVEfU29wEQLJohilqcEplucXzgUhaSFVW6EAtTbedhhozHA9iokQiKW8se3NdTmtbcJL+EBkL6RhhJU+ZyPc5iGcmuJaW0DguJQGCKUFEz4HIadSb9riaW2ZWAou34eNARyqkEoTVgrkWK5jXLKUqIIIAZGmDEJ2pVzufS6ntfEQQqG0KPGGvZQro3uQ1pZQtRWBM3kIIcWh6OQJRMjl3p6SomoEhcXR2ngIgWRRdAIM5kM+wiamH6HIyhal+rCQTBMINWUQnutyWhsnW0Cq0UaYN5/UXGKG1maaZsB1WuaSuQUfBkfSByNN4fkhkCz4K2xnShqFGRE4k6m1oSHHSyHBu2ioARaf+LE0s9VUQGtDPNYGTC2KTp9gz+eFr3CjuITWpnKZN4Rwq1vxyswWn85HCFlaGyWWUp9USzfnOYiwSL6AZhZ8GuGMMf0pfRZC3qEWYFTY4gtHlBoBlWaLH72cIf3FH2ytjSMIQ1JbsU4E0z1/odufYabWZhkxyclobZzDZSBNJSw8bWytQnAU8hN+r6OnqFpC4CxAazvjbMQAg6m8VgOnHwFlJHxOUOa0a523HwqaIAZFcoIBRy6B6eEuc2WGcYoSfwrMCTXETyUggnJ3eMN4Xn/egLS2gNxEHzGBM421Ez7W2gSRyPCuSywEN1/CPioiRFlmiqrFKIKvzH1t0EMOYaNe8RolzmzgSUVYF1cuHecf8uKfqcB79qzJaZT4LIoPUEjUl9jXFhE43nYaTkaMe1EAY/MtF6DA0hNW2PvaUPRkRW7dAnMXEDnxPYT4/Bmvac3mC4F6uLmnmRzKFz7Dnu5O5jo+5j4iyQvwUds4Ub75bI/rCgJO6k116X1tiL/6xIumUeMOgKzRbB5ui1TCFQ0I7wb3tSVUzUoTuAb70c24eRwmGZfu9ot9+nBsNl8/F8EnwHIJZ1tSNcsS0toUgadAuWl6hfH3Zh4k+X64J3SLBNJ9IJayXlfCzhbWjPc0tkisSTDuvfy5mS7PDg+6YvdHZE91MP2V39fWWD8Uag0isDyzDrK79+bl66Acvjh4vi2ML5gacjdizIBnSNNULUvg+I/ywoobBeWySP0Xnzj0Rq0sVeNrbeFkmP9IPZ9+V1C63C70Lk32oVjQU0H8oy2gzXaVAeQ/2eAPdfAZUvarOTmz4Jp4OC1T+GpBH0PvVs9QtYTAqaEVCxz1BAtkFZRt/qYA71LPUzUCFsUEDnyGVOB8EkJKNotQYJbpDHGeqok+Q6oLHIyw4WAjsp7ci46MYj1DuqRqVqS1WSkCp3M3mdY27KcCPkrSvbGiaiEKnXwsCRz8DGmDD1Bk/lq4CMkEwdkYhd8sZ4icwcIRq0sVgTscblGQeIY0R+DqImchNUWmeEWK0MaccMse7xlSitaWMDfeMwlR2RBAoWVIn0bVRLS22MqdBwel+WojAIU2APrjRsnzS4UOB5Sl4EIAxdYF2o2WzHltFAJXH4j8TvUBVRCgc889rw3lqFqewBliJzxWDVEQYK2PEI2qpazc89oQ/pfQT8Gr8JsC6Nzr3PPacgjTzwHHVp5wmkD8fasyjGJBhpQeRlmqliDMa21WVmvLEriWWCfWms/ElDMBgKJbcP2hSadqKavAufo6cNpXFmLzXRWDsbslvAM3t6QmqbWl3pkj/DqVKuZS2wc1UYC9SXpZVF5rW1oR63BPCsRXJT21uy2+x8GbmiyqJqa1rawK/RBhKsTmCyGdntWBexJ7xNs6k6oJam0ra13i9LXmK1Epe70Du4ciy3Fx6c3YVE363Qh4JnHearP5tlDe6HbfcHXDVAnPvxV7NwJba1tZGYdd08uOt/NSGmO3+9MrT+atiT5E1fJaG4pefJ7T2jLWBlfT2yHlSVKePiUYJUCS/vvx9Gny30FVPLD9CUTVRLW2tJV9olIa2ZMUxrcHgjGnu/385Y+nlDqesHH6d3LvRoipGkTgGveUpSgqthXGHy/3uCC73e6710+p+ACY3i1M1dIIIa0tYzXyb7eA0C1BvgpAsvy1S3rvDYEH4YtR5n20roBUTVhry1r3JfFFGJ8+ef3iIF52CuNP8BGU7b03hz9E4EUl/eODiQFTNWGtLWtNbyISBJigfPrj59cvX7w7ONjb2zs4OHjz4vB1AE4UXQ7i7rjEe0hBAjcZrH5Fpm0JzEyRrWDlqP5c6u2AWZKT19qyVmVWsBcrKCuA3mWDS9UktLYVgQtvzzjNbcBIuiF4QRhtqFyqJvWuoOyb5fJv09k4ynyu8HasMu8h5RM4ZU6ZDtNzfnlstETombLvIUVUqgZY58AmlJ3yWGHC5nkjnCFliErVkIzWFtOblMPSepEFlws5uUisSs/BWOo9pIDWBhE4qBc3WrwdU5CqyWltGWtAiJSLTb+Mm16c25aStCFuGYuqyWlt2rp1OHgMgGc6EqVqklobxTp7eIi9uQKvwZTQ2mjWzkO8VT1dBkMZqsbW2lqiBK5hXsq9ZqVc8foTi9Oyglpb/mWPaeud3NuAyhTnFrEeNqhIa6MOSWXmP5Cn9u5kB5+81ka14tHlQ2RGL9yLIEfVGFqbKIEzVtZxb+Pd2J+aKVKGsm1IWdcJXGQFsgXtnLocgVOMzoYDjheeZC33ynhprQ1cQkXmuL3BbuxP65YCkrJqtDYdspr6fLAhjP75xKC0oUFtmazWRqFqLKtqTi43kTic9pCyAKoKUbWCWhudwAWyf2NyXnVUdfoXKubnhYq1Ng2wTm4FdmqK4+vdN3QkQsqEtDY6VZOxkq+GNbmtKnX4/r3aaMmogICVprVBVA20dqZ92RdZrRevdzskKU+UlFWutbGtQe3m6N7bLdORnt+eTgoOvoq0tpQVU6wIm5N5ryhfdXqX45Ee7q8QeTm8tNaWEKIsVcvRJL4Vm9ps6kj3pOcPLu87psIiZTJWUGsToWo8K7IUq3NX6wtPkj2n7UxnqIELkLKKtTaqVVXz1qB2bI5md+f9tuOBOD3H7zvTcWbrjxQp24jWJmptEdiT4d2Z32/7PkG6gkr+dhzf7/cv5+NZXQkOT5ckZWyqlrdWG2m0nFWN3vM56sxm47v5Ze286Q0IwWuezecX4+EkOKzDQIgWPTRqTNGoMQW2Vpst6FYy4IMIYphG+BbvYJNV4MYYpVxzda1aNC9UrLUxCRzOWkPcar6/U9Yc0aJbpamarNZWCa17LCuDeUtQNYo16gyV2p1pq5W1FiJlm9Taig3J9DCTsT6K1iYRVpNAB1orpGpcra0kgVunVOWthQkcqERJETiKa66seN2ac81qqVoVWpsEgUvCC9W6GapWqdYmay1BygoRuAoiTZ6qyUcaGaomTeD+F7sywJu/yhfGAAAAAElFTkSuQmCC\"},{\"name\":\"SkrBT\",\"url\":\"https://skrbtso.top/search?keyword=%s\",\"favicon\":\"https://a.favicon.im/skrbtso.top\",\"faviconData\":\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAB20lEQVQ4jaWTP2gTcRTHP7+LphBusIoFCy0eNmqjKR20Ihr/1MqhiPFqpYviIA6SYpEOmkixlKKg6OZQLC5tFQcNySJp/YcgOCtoqJLgQY60Xq/pJZSahpxD1SwOIf1Ob/l83/fx3hPLy7+c23ceEo0lKBSWqEay7EELqkTCIVySa+PQ+GSUYnGlKhigWFzh0+ck9mIe4W9XnWo7/y+JVCsMUCgsIdVM/9G6v8WF890cPrSPZPI7Y4+fEQmHuHtvlK5jB3C712OaC+zd4ycWn6K+fgNv330EWE3ga/Vya7Cf5y9eYs4vANDTfYLjXQGu9V/i1esP7N61ncYtDUg4XO27SMPmTRWDjJHFMLLcuH6Fujr3v3iDN/tITL3HMGYB6Ohox9/WSiaTpVwuV0bI5WxOa5c5emQ/I8MDzM1ZAMTi02iayvhkFIDsrEln50F03eCnaSGEqIzwZvoJ2hmVUqlEKq0DMProKRMTUUaGBxCSRDqlc//BGD1nT6JsbQJAKC0Bx3EcmpsaUZRmvnz9hmXl8Pm8zMykEELg9SrYdh4c+KFn2LljG5aVW02htASctaxxzXcgybKnZliWPUhaUK3ZQAuquBKJ+JC9mCeV1qv+SFn20HvuFJFwiN8NQrCalRG1XAAAAABJRU5ErkJggg==\"},{\"name\":\"EZTV\",\"url\":\"https://eztvx.to/search/%s\",\"favicon\":\"https://eztvx.to/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAEAEBAAAAEAGABoAwAAFgAAACgAAAAQAAAAIAAAAAEAGAAAAAAAAAMAAAAAAAAAAAAAAAAAAAAAAAD////////////////1qojwf0z5zLf////////85dvwf0z4w6v////////////////////////////////wf0z4w6v4w6v////////4w6v0oXz0oXz////////////////////////////////wf0z5zLf////////////ykGT5zLf2spT97uf////////////////////////////wf0z5zLf////////73c/xiFj+9vP73c/4w6v////////////////////////////wf0z5zLf////////3u6D2spT////////1qoj////////////////////////////wf0z5zLf////97ufxiFj5zLf////////2spT73c/////////////////////zmXDwf0zwf0zykGTwf0zwf0zwf0z97uf5zLfwf0zwf0z////////////////////+9vPykGT5zLf////////////////////////////////////////////////73b/zmT/wfx/wfyf3u3/////zmT/wfw/wfw/wfw/wfw/wfw/ykC/////////97t/xiB/zmT/85c/////73b/5zJ/85c/xiB/zmT/////////////0oU/////////4w4/wfw/97t/////////////73b/////61K/wfw/1ql/////////////////////4w4/ykC/////////////////////////////4w4/wfw/4w4/////////////////4w4/wfw/wfw/wfw/wfw/wfw/1ql/////////////2sm/wfw/61K/////////////+9u/ykC/73b/////5zJ/wfw/4w4/61K/5zJ/////////zmT/xiB/85c/////////////85c/zmT/wfw/wfw/2sm/////73b/wfw/wfw/wfw/wfw/wfw/ykC////////////////////////////////////////////////////////////////////8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA\"},{\"name\":\"TorrentGalaxy\",\"url\":\"https://torrentgalaxy.hair/torrents.php?search=%s#results\",\"favicon\":\"https://torrentgalaxy.hair/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAACMuAAAjLgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQECAxERBgUdHQ0FJCISBSckEwUnJRMFJSISBR8eDgMUFAgBAwMCAAAAAAAAAAAAAAAAAQMDAAAAAAAHIyMDCj47EApPSiYSYmI/GG1yThlwdVIZcHVSGW5zUBRmZ0MLU04sCUA9FAgqKgUAAAAAAg4OAA9VVAAILS0CDFFOEhdxcz42ka+MRZ3Lx0mh0ttKodPdSqHT3Uqh09xHns3OOpW3nB55gk0MV1MZCzo6BCjf3AAAAAAADlZUChd5eTY/m8KnUaXe+VOm4f9TpuH/U6bh/1Om4f9TpuH/U6bh/1Km3/1Gn83EIYONTA1eWREGIyMBDUZFAg5xaRs2mLV+UKXd9VKm4P9Rp9/0Tard0kyr3sZMq97FTKvdzE+o3upSpuD/Uqbg/kCexaUUe3cqD1dVBg9nYwgei485SKPTyVKm4f9Qp9/wQLLVgyrIzjUoys0oKMrNJyjLzi45uNFkTqjd3FKm4P9OpdrmKpSlVw1vZw8NfHAQMZuyY0+l3fFSpuD/RavVoh23sScScm8SDVBMFwxPShgQYF4SFrCkGz2uz3pRpt/3Uqbg/j2gw4wPhHkcD46BGD6ixolSpuD/T6fd6jGrv1gTg30hF399Px6UnGgflqBuGYWGSxR5dSUkqa88S6jazlKm4f9HpNK1GJWRKhOdkRxDpc+bUqbg/0qn18gfoqI9HpyfTy221LQ0wOvrNcHs8DC63coio65mF5uUM0On0J9SpuD/SqbXxh+gojIUqp0YRKjRlFKm4P9FptGwGqOcQy261Z03xPP8N8T1/zfE9P83xPT/Mb7hwhunpEk6psWDUqbg/0qn2MIgqaotE7uoDj2szWxRpt/6RKXPrh2tqVAywufHN8T0/zfE9P83xPT/N8T0/zXD7+YitrtfOKXBgFGm3/xGqdWeGrWsHBzLwAYst8IzTajczUmm1cMfsK5TMsTnuTfE9P83xPT/N8T0/zfE9P80xO7aIbm6Wj+lypVQp97sOrDMWRfFtQwp398BG8u/ED+w02RNp9vSMay/YirF1XI1xfHlN8T0/zfE9P82xfL0L8bhkiOytExKp9e+SKvZmSPCwR4j084DGpWTACXY1QMhysUXRa7Ybkeq144qvcQ9LM3eYTLK66AzyeyoLszjdCXGxztCq9J2Savaji3Ayicg1swHLvP0ACnm5AAu9vYAJNzWBCPPyhFDstg/RK/XPSrPzhUk39UaJd/WHCTazxRBstUvRq/ZSi7Dzhoe3NAHLOTlASfb2QAAAAAAKunnAC3u7wAm5N8CFezRBTLI1Qk3ydQEJfLsASny7wEx0tYCN8TVCRrj0QYg59sDLOfoASjh3wAu/PsAwAMAAIABAACAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIAAAACAAQAAwAMAAA==\"}],\"user1792793110006\":[{\"name\":\"Kimi\",\"url\":\"https://www.kimi.com/?q=%s\",\"favicon\":\"https://www.kimi.com/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,AAABAAMAMDAAAAEAIACoJQAANgAAACAgAAABACAAqBAAAN4lAAAQEAAAAQAgAGgEAACGNgAAKAAAADAAAABgAAAAAQAgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP///wD///8A////AP///wAAAAABAAAABAAAABUAAABKAAAAhQAAAMIAAADoAAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPwAAADoAAAAwAAAAIgAAABIAAAAFQAAAAQAAAAB////AP///wD///8A////AP///wD///8A////AAAAAAMAAAAPAAAALgAAAL0AAAD3AAAA+wAAAP0AAAD+AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/QAAAPsAAAD3AAAAugAAAC4AAAAPAAAAA////wD///8A////AP///wD///8AAAAABQAAABUAAABzAAAA5wAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/QAAAOcAAABzAAAAFQAAAAX///8A////AP///wAAAAADAAAAFQAAAIMAAAD5AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD5AAAAgwAAABUAAAAD////AAAAAAEAAAAPAAAAcwAAAPkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAAHMAAAAPAAAAAQAAAAQAAAAuAAAA5wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOcAAAAuAAAABAAAABUAAAC6AAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAAC9AAAAFQAAAEgAAAD3AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD3AAAASgAAAIgAAAD7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD7AAAAhQAAAMAAAAD9AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD9AAAAwgAAAOgAAAD+AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/BQUF/wsLC/8MDAz/DAwM/wgICP8DAwP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8DAwP/BgYG/wgICP8GBgb/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA6AAAAPwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8EBAT/LCws/7W1tf+4uLj/uLi4/6mpqf8SEhL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/wYGBv8QEBD/RkZG/4uLi/86Ojr/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/R0dH//n5+f/9/f3//f39/+np6f8fHx//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8FBQX/IyMj/5WVlf/e3t7/+vr6//X19f9bW1v/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/wwMDP9WVlb/4ODg//n5+f/9/f3///////f39/9cXFz/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8FBQX/FxcX/5iYmP/w8PD//f39//////////////////f39/9cXFz/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+vr6/8iIiL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wkJCf86Ojr/vr6+//b29v/+/v7////////////+/v7/+/v7//Hx8f9VVVX/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+/////////////Hx8f9KSkr/BAQE/wAAAP8AAAD/AAAA/wEBAf8DAwP/Dw8P/15eXv/h4eH/+/v7//////////////////z8/P/z8/P/y8vL/5KSkv8pKSn/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+/////////////z8/P/e3t7/IiIi/wMDA/8AAAD/AQEB/wQEBP8WFhb/nZ2d//n5+f/+/v7////////////+/v7//Pz8/+7u7v9jY2P/DQ0N/wMDA/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+//////////////////7+/v/4eHh/zc3N/8FBQX/BwcH/z4+Pv/Ly8v/+/v7//7+/v////////////7+/v/4+Pj/v7+//y4uLv8GBgb/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+//////////////////+/v7/+/v7/9ra2v9PT0//cXFx/+bm5v/7+/v//////////////////Pz8/+7u7v+Hh4f/FBQU/wQEBP8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+/////////////////////////////z8/P/z8/P/9/f3//39/f/////////////////4+Pj/2NjY/0BAQP8LCwv/AQEB/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////////////////////////////////////////////////f39//T09P+mpqb/KCgo/wYGBv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+/////////////7+/v/8/Pz//v7+///////////////////////8/Pz/6Ojo/3Z2dv8SEhL/AgIC/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+/////////////n5+f/Pz8//+vr6//7+/v/////////////////29vb/SUlJ/wYGBv8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+3t7f8zMzP/lZWV//r6+v/+/v7////////////6+vr/wsLC/xUVFf8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+vr6/8jIyP/Dw8P/5aWlv/39/f//v7+///////+/v7/+Pj4/7Kysv8fHx//AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AgIC/w8PD/+Wlpb/9fX1//7+/v///////v7+//j4+P+urq7/HR0d/wQEBP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wEBAf8UFBT/lZWV//X19f/+/v7////////////39/f/vb29/xkZGf8EBAT/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8BAQH/ExMT/4+Pj//29vb//v7+////////////+Pj4/76+vv8mJib/AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AQEB/w4ODv+Pj4//+vr6//7+/v////////////n5+f+7u7v/Hx8f/wICAv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AAAA/wICAv8ODg7/ioqK//r6+v/+/v7///////7+/v/5+fn/ycnJ/xEREf8DAwP/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AAAA/wAAAP8DAwP/ERER/46Ojv/29vb//v7+///////+/v7/+fn5/8TExP8kJCT/BAQE/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8HBwf/SEhI//v7+////////////+rq6v8gICD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgIC/w4ODv+MjIz/8/Pz//7+/v///////v7+//n5+f+7u7v/KSkp/wUFBf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8GBgb/R0dH//j4+P/8/Pz//Pz8/+jo6P8fHx//AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8PDw//enp6//Ly8v/8/Pz//Pz8//z8/P/29vb/w8PD/xQUFP8CAgL/AQEA/wYDAf8HBAH/BwQB/wUDAP8CAQD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8FBQX/LCws/7W1tf+5ubn/ubm5/6mpqf8UFBT/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/EhIS/3V1df+4uLj/ubm5/7m5uf+5ubn/srKy/2ZmZv8FBAT/IhED/51RDv+iUw//oFIO/3Y8C/8UCwL/AgEA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/BAQE/woKCv8KCgr/CgoK/wcHB/8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AQEB/wQEBP8JCQn/CgoK/woKCv8KCgr/CgoK/wYGBv8EAgH/OBwF//J9Fv/9ghf//oMX//h/Fv+0XBD/EgkC/wEBAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAf8BAQH/AQEB/wEBAf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/AQEB/wEBAf8BAQH/AQEB/wEBAf8DAQD/OB0F//N9Fv/9ghf//4MX//6DF//0fRb/TigH/wMBAP8AAAD/AAAA/wAAAP8AAAD/AAAA/AAAAOgAAAD+AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8CAQD/MBgE//F7Fv/8ghf//4MX//+DF//2fhb/ViwI/wMCAP8AAAD/AAAA/wAAAP8AAAD+AAAA6AAAAMIAAAD9AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAAD/DgcB/71hEf/3fxb//oIX//yBF//WbhP/IBAD/wIBAP8AAAD/AAAA/wAAAP8AAAD9AAAAwAAAAIUAAAD7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AgEA/xoNAv+pVg//0mwT/7pgEf8wGAT/BwMA/wEAAP8AAAD/AAAA/wAAAP8AAAD7AAAAiAAAAEoAAAD3AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wEBAP8KBQH/FQsC/w4HAf8FAwH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD3AAAASAAAABUAAAC9AAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAAC6AAAAFQAAAAQAAAAuAAAA5wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOcAAAAuAAAABAAAAAEAAAAPAAAAcwAAAPkAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAAHMAAAAPAAAAAf///wAAAAADAAAAFQAAAIMAAAD5AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD5AAAAgwAAABUAAAAD////AP///wD///8AAAAABQAAABUAAABzAAAA5wAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/QAAAOcAAABzAAAAFQAAAAX///8A////AP///wD///8A////AAAAAAMAAAAPAAAALgAAALoAAAD3AAAA+wAAAP0AAAD+AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD+AAAA/QAAAPsAAAD3AAAAvQAAAC4AAAAPAAAAA////wD///8A////AP///wD///8A////AP///wAAAAABAAAABAAAABUAAABIAAAAhwAAAMAAAADoAAAA/AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAADoAAAAwgAAAIUAAABKAAAAFQAAAAQAAAAB////AP///wD///8A////APAAAAAADwAA4AAAAAAHAADAAAAAAAMAAIAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACAAAAAAAEAAMAAAAAAAwAA4AAAAAAHAADwAAAAAA8AACgAAAAgAAAAQAAAAAEAIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD///8A////AAAAAAMAAAAWAAAAXQAAAMEAAADsAAAA/AAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD8AAAA6wAAAMEAAABcAAAAFgAAAAP///8A////AP///wAAAAAHAAAAPgAAALgAAAD7AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPoAAAC4AAAAPgAAAAf///8AAAAAAwAAAD4AAADPAAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAADPAAAAPgAAAAMAAAAWAAAAuAAAAP0AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAAC4AAAAFgAAAFwAAAD6AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPsAAABdAAAAwQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAMEAAADrAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA7AAAAPwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8pKSn/jIyM/4yMjP9TU1P/BQUF/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/CwsL/z09Pf9hYWH/CwsL/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD8AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP///////////52dnf8JCQn/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAQH/CgoK/0NDQ//Kysr/+Pj4/9zc3P8VFRX/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM////////////nZ2d/wkJCf8AAAD/AAAA/wAAAP8AAAD/AgIC/yAgIP+Dg4P/7Ozs////////////3Nzc/xUVFf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9MTEz///////////+lpaX/CgoK/wAAAP8AAAD/AAAA/wICAv83Nzf/t7e3//T09P///////v7+//Pz8/+5ubn/EBAQ/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP///////////+bm5v9MTEz/AAAA/wAAAP8ICAj/YmJi/+Pj4//8/Pz///////7+/v/T09P/U1NT/xUVFf8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM/////////////////+rq6v9JSUn/ICAg/5CQkP/19fX///////7+/v/y8vL/p6en/xsbG/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9MTEz//////////////////////+fn5//Kysr/+Pj4///////8/Pz/2dnZ/2tra/8ODg7/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP//////////////////////////////////////+vr6/7m5uf88PDz/CAgI/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM////////////6enp//X19f////////////////+bm5v/FBQU/wICAv8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9MTEz///////////+hoaH/ZmZm/+3t7f/+/v7//////9bW1v8tLS3/AgIC/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP///////////52dnf8MDAz/Wlpa/+Hh4f/+/v7//v7+/8/Pz/86Ojr/BQUF/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM////////////nZ2d/wkJCf8ICAj/W1tb/+Dg4P/+/v7//Pz8/8zMzP8/Pz//AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9MTEz///////////+dnZ3/CQkJ/wAAAP8HBwf/VlZW/+zs7P///////f39/9XV1f8yMjL/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0xMTP///////////52dnf8JCQn/AAAA/wAAAP8DAwP/WFhY/+zs7P/+/v7//////9zc3P80NDT/AwMD/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/TExM////////////nZ2d/wkJCf8AAAD/AAAA/wAAAP8DAwP/VlZW/97e3v/9/f3//////9XV1f9AQED/BgYG/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP9HR0f/8fHx//Ly8v+VlZX/CAgI/wAAAP8AAAD/AAAA/wAAAP8HBwf/UlJS/9XV1f/x8fH/8PDw/8TExP81NTX/BQMB/x8QA/8iEQP/EwoC/wEBAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xAQEP83Nzf/Nzc3/x8fH/8CAgL/AAAA/wAAAP8AAAD/AAAA/wAAAP8GBgb/JSUl/zc3N/83Nzf/NDQ0/xYWFv8ZDQP/1m4T/+h3Ff/JZxL/KxYE/wAAAP8AAAD/AAAA/wAAAP8AAAD8AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/xoNAv/pdxX//4MX//6CF/+NSAz/AAAA/wAAAP8AAAD/AAAA/AAAAOwAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/DQcB/8ZmEv/9ghf/9n4W/2w3Cf8AAAD/AAAA/wAAAP8AAADrAAAAwQAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8BAAD/OBwF/4hGDP9yOgr/GAwC/wAAAP8AAAD/AAAA/wAAAMEAAABdAAAA+wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8CAQD/CAQB/wYDAf8AAAD/AAAA/wAAAP8AAAD6AAAAXAAAABYAAAC4AAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/QAAALgAAAAWAAAAAwAAAD4AAADPAAAA/QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP0AAADPAAAAPgAAAAP///8AAAAABwAAAD4AAAC4AAAA+gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD7AAAAuAAAAD4AAAAH////AP///wD///8AAAAAAwAAABYAAABcAAAAwQAAAOsAAAD8AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAPwAAADsAAAAwQAAAF0AAAAWAAAAA////wD///8AwAAAA4AAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAgAAAAcAAAAMoAAAAEAAAACAAAAABACAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAEUAAADGAAAA+QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAAMYAAABFAAAABAAAAEUAAADmAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA5gAAAEUAAADGAAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAADGAAAA+QAAAP8AAAD/CgoK/0JCQv8bGxv/AAAA/wAAAP8AAAD/AQEB/xYWFv8ZGRn/AAAA/wAAAP8AAAD/AAAA+QAAAP8AAAD/AAAA/ycnJ//19fX/Y2Nj/wAAAP8AAAD/Dg4O/21tbf/n5+f/dHR0/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8nJyf/+fn5/4WFhf8NDQ3/LCws/6Ojo//s7Oz/vLy8/z8/P/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/Jycn///////n5+f/mJiY/9HR0f/t7e3/fX19/xsbG/8BAQH/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ycnJ//+/v7/9/f3//v7+//m5ub/PT09/wcHB/8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8nJyf/9vb2/4mJif/Dw8P/8vLy/0tLS/8FBQX/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/Jycn//X19f9jY2P/LCws/8HBwf/p6en/Wlpa/wkJCf8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/ycnJ//19fX/Y2Nj/wAAAP8lJSX/urq6/+Li4v9cXFz/BQUF/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8XFxf/lJSU/zo6Ov8AAAD/AAAA/xkZGf+FhYX/h4eH/xoWE/9+QAv/SCQG/wMBAP8AAAD/AAAA+QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8LBQH/43QU/7JbD/8SCQH/AAAA+QAAAMYAAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/0IiBf82GwT/AgEA/wAAAMYAAABFAAAA5gAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAOYAAABFAAAABAAAAEUAAADGAAAA+QAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA/wAAAP8AAAD/AAAA+QAAAMYAAABFAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=\"},{\"name\":\"豆包\",\"url\":\"https://www.doubao.com/?q=%s\",\"favicon\":\"https://a.favicon.im/doubao.com\",\"faviconData\":\"data:image/png;base64,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\"},{\"name\":\"智谱GLM\",\"url\":\"https://chatglm.cn/?q=%s \",\"favicon\":\"https://chatglm.cn/favicon.ico\",\"faviconData\":\"data:image/x-icon;base64,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\"},{\"name\":\"阿里千问\",\"url\":\"https://www.qianwen.com/?q=%s\",\"favicon\":\"https://a.favicon.im/qianwen.com\",\"faviconData\":\"data:image/png;base64,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\"},{\"name\":\"Minimax\",\"url\":\"https://agent.minimax.cn/?q=%s\",\"favicon\":\"https://agent.minimax.cn/assets/logo/favicon-192_v2.png?v=5\",\"faviconData\":\"data:image/png;base64,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\"},{\"name\":\"知乎直答\",\"url\":\"https://zhida.zhihu.com/?q=%s\",\"favicon\":\"https://pic1.zhimg.com/v2-7e3856b1a6d415224ca95814132a3612.png\",\"faviconData\":\"data:image/png;base64,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\"}]}")
	};
	var rules_default = [
		{
			name: "Google",
			enabled: true,
			url: /^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,
			engineList: "web",
			class: "s6JM6d",
			wrapperClass: "YNk70c",
			fixedTop: 56,
			style: `
      z-index: 100;
      margin:2px 0 2px;
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
			name: "必应",
			url: /^https?:\/\/[^.]*\.bing\.com\/search/,
			enabled: true,
			fixedTop: 60,
			engineList: "web",
			style: `
      margin:2px 0 2px;
      left: 160px;
    `,
			insertIntoDoc: {
				keyword: "css;#sb_form_q",
				target: "css;#b_content",
				where: "beforeBegin"
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
			name: "百度",
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
			name: "搜狗",
			url: /^https?:\/\/www\.sogou\.com\/(?:web|s)/,
			enabled: true,
			engineList: "web",
			fixedTop: 60,
			style: `
      top:-40px;
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
			name: "豆瓣",
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
			name: "菜鸟教程",
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
		}
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
	function isPlainObject(value) {
		return Boolean(value) && typeof value === "object" && !Array.isArray(value);
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
		if (!engine.url) return null;
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
	var messages = {
		"zh-CN": {
			"common.cancel": "取消",
			"common.confirm": "确定",
			"common.close": "关闭",
			"common.save": "保存",
			"common.delete": "删除",
			"common.copy": "复制",
			"common.name": "名称",
			"common.required": "必填",
			"common.optional": "选填",
			"common.enabled": "启用",
			"common.hidden": "隐藏",
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
			"settings.transition": "过渡动画",
			"settings.center": "强制居中",
			"settings.centerTip": "搜索条始终居中显示",
			"settings.fixedTop": "固顶显示",
			"settings.fixedTopTip": "页面下滑时搜索条固定在顶部显示",
			"settings.fixedTopUpward": "下滑不显示",
			"settings.fixedTopUpwardTip": "仅在向上滚动页面时显示",
			"settings.editConfig": "编辑配置文件",
			"settings.loadIcons": "加载所有图标缓存",
			"settings.loadIconsTip": "把所有远程图标内嵌为 data 链接",
			"settings.loading": "加载中…",
			"settings.feedbackGreasyFork": "在 GreasyFork 进行反馈",
			"settings.feedbackGitHub": "在 Github 进行反馈",
			"settings.saving": "关闭中…",
			"settings.language": "语言",
			"settings.languageAuto": "跟随浏览器",
			"toast.autoSaveFailed": "自动保存失败：存储不可用，请用“配置文件”复制备份",
			"toast.autoSavedLocal": "已自动保存（当前仅本网站生效）",
			"toast.remoteConflict": "其他页面已更新设置，当前有未保存修改",
			"toast.syncAction": "同步",
			"toast.synced": "已同步其他页面保存的设置",
			"toast.saveFailed": "保存失败：存储不可用，请用“配置文件”复制备份",
			"toast.savedLocal": "已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）",
			"toast.noIcons": "没有需要加载的图标",
			"toast.embeddingIcons": "正在内嵌 {count} 个图标…",
			"toast.embeddedIcons": "已内嵌 {count} 个图标",
			"toast.noLoadableIcons": "没有可加载的图标",
			"toast.iconsFailed": "{count} 个获取失败",
			"toast.autoSavedSuffix": "，已自动保存",
			"toast.listSeparator": "，",
			"toast.dialogOpen": "请先关闭当前对话框",
			"toast.categoryMissing": "无法撤销：分类已不存在",
			"toast.undoDelete": "已撤销删除{label}",
			"toast.deleted": "已删除{label}",
			"toast.copied": "已复制「{name}」",
			"toast.copySuccess": "复制成功",
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
			"engine.icon": "图标",
			"engine.iconData": "图标数据",
			"engine.iconDataPlaceholder": "选填，可粘贴 data:image/... 链接",
			"engine.fetchIcon": "获取图标",
			"engine.refetch": "重新获取",
			"engine.cancelFetch": "取消",
			"engine.fetching": "获取图标中…",
			"engine.stepPending": "等待",
			"engine.stepLoading": "获取中…",
			"engine.stepOk": "已获取",
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
			"config.warningLine1": "此处有更多的设置选项，自由度更高，",
			"config.warningLine2": "但设置错误会导致脚本无法运行",
			"config.imported": "已导入 {name}",
			"config.parseFailed": "JSON 解析失败",
			"config.mergeUnrecognized": "无法识别的配置文件：没有找到引擎数据",
			"config.parseFailedExport": "JSON 解析失败，无法导出",
			"config.exported": "配置已导出",
			"config.reset": "恢复默认",
			"config.import": "导入",
			"config.mergeImport": "合并导入",
			"config.mergeTip": "把文本框中配置的引擎追加到现有列表（先“导入”或粘贴配置），保留当前设置",
			"config.export": "导出",
			"reset.confirmExported": "当前配置已导出为备份文件，确定要恢复默认设置吗？",
			"reset.confirm": "将会删除用户设置！",
			"jump.searchAll": "一键搜索全部：{name}",
			"favicon.noRequestApi": "缺少 GM 请求接口",
			"favicon.networkError": "网络错误",
			"favicon.timeout": "请求超时",
			"favicon.aborted": "请求已取消",
			"favicon.requestError": "请求异常：{message}",
			"favicon.requestFailed": "请求失败",
			"favicon.emptyResponse": "响应为空",
			"favicon.tooLarge": "超过 {size}KB",
			"favicon.notImage": "不是图片（{type}）",
			"favicon.unknownType": "未知类型",
			"favicon.convertFailed": "转换失败",
			"favicon.backgroundFailed": "未知原因"
		},
		en: {
			"common.cancel": "Cancel",
			"common.confirm": "Confirm",
			"common.close": "Close",
			"common.save": "Save",
			"common.delete": "Delete",
			"common.copy": "Copy",
			"common.name": "Name",
			"common.required": "Required",
			"common.optional": "Optional",
			"common.enabled": "Enabled",
			"common.hidden": "Hidden",
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
			"settings.transition": "Animations",
			"settings.center": "Force center",
			"settings.centerTip": "Always center the jump bar",
			"settings.fixedTop": "Pin to top",
			"settings.fixedTopTip": "Keep the jump bar at the top while scrolling",
			"settings.fixedTopUpward": "Hide on scroll down",
			"settings.fixedTopUpwardTip": "Show only while scrolling up",
			"settings.editConfig": "Edit config file",
			"settings.loadIcons": "Cache all icons",
			"settings.loadIconsTip": "Embed all remote icons as data URLs",
			"settings.loading": "Loading…",
			"settings.feedbackGreasyFork": "Feedback on GreasyFork",
			"settings.feedbackGitHub": "Feedback on GitHub",
			"settings.saving": "Closing…",
			"settings.language": "Language",
			"settings.languageAuto": "Auto (browser)",
			"toast.autoSaveFailed": "Auto-save failed: storage unavailable. Use “Config file” to copy a backup.",
			"toast.autoSavedLocal": "Saved automatically (this site only)",
			"toast.remoteConflict": "Settings were updated in another page and you have unsaved changes",
			"toast.syncAction": "Sync",
			"toast.synced": "Synced settings saved in another page",
			"toast.saveFailed": "Save failed: storage unavailable. Use “Config file” to copy a backup.",
			"toast.savedLocal": "Saved (this site only: your userscript manager does not provide cross-site storage)",
			"toast.noIcons": "No icons to load",
			"toast.embeddingIcons": "Embedding {count} icons…",
			"toast.embeddedIcons": "Embedded {count} icons",
			"toast.noLoadableIcons": "No loadable icons",
			"toast.iconsFailed": "{count} failed",
			"toast.autoSavedSuffix": ", saved automatically",
			"toast.listSeparator": ", ",
			"toast.dialogOpen": "Close the current dialog first",
			"toast.categoryMissing": "Cannot undo: the category no longer exists",
			"toast.undoDelete": "Undid deletion of {label}",
			"toast.deleted": "Deleted {label}",
			"toast.copied": "Copied “{name}”",
			"toast.copySuccess": "Copied",
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
			"engine.icon": "Icon",
			"engine.iconData": "Icon data",
			"engine.iconDataPlaceholder": "Optional; paste a data:image/... URL",
			"engine.fetchIcon": "Fetch icon",
			"engine.refetch": "Fetch again",
			"engine.cancelFetch": "Cancel",
			"engine.fetching": "Fetching icon…",
			"engine.stepPending": "Waiting",
			"engine.stepLoading": "Fetching…",
			"engine.stepOk": "Fetched",
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
			"config.warningLine1": "More advanced options are available here,",
			"config.warningLine2": "but invalid settings can break the script.",
			"config.imported": "Imported {name}",
			"config.parseFailed": "Failed to parse JSON",
			"config.mergeUnrecognized": "Unrecognized config file: no engine data found",
			"config.parseFailedExport": "Failed to parse JSON; cannot export",
			"config.exported": "Configuration exported",
			"config.reset": "Restore defaults",
			"config.import": "Import",
			"config.mergeImport": "Merge import",
			"config.mergeTip": "Append engines from the text above to the current list (import or paste first), keeping current settings",
			"config.export": "Export",
			"reset.confirmExported": "The current configuration has been exported as a backup. Restore default settings?",
			"reset.confirm": "This will delete your settings!",
			"jump.searchAll": "Search all: {name}",
			"favicon.noRequestApi": "GM request API unavailable",
			"favicon.networkError": "Network error",
			"favicon.timeout": "Request timed out",
			"favicon.aborted": "Request canceled",
			"favicon.requestError": "Request error: {message}",
			"favicon.requestFailed": "Request failed",
			"favicon.emptyResponse": "Empty response",
			"favicon.tooLarge": "Exceeds {size}KB",
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
		"B站": "Bilibili",
		"豆瓣电影": "Douban Movies",
		"豆瓣读书": "Douban Books",
		"孔夫子旧书": "Kongfuzi Used Books",
		"金山词霸": "Kingsoft PowerWord",
		"知乎": "Zhihu",
		"类义词典": "Thesaurus",
		"人人影视": "RRTV",
		"动漫花园": "DMHY",
		"海盗湾": "The Pirate Bay",
		"豆包": "Doubao",
		"智谱GLM": "Zhipu GLM",
		"阿里千问": "Qwen",
		"知乎直答": "Zhihu Zhida"
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
	var STORAGE_KEY = "searchEngineJumpData";
	function nowText() {
		const now = new Date();
		const pad = (n) => String(n).padStart(2, "0");
		return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
	}
	function createDefaultSettings() {
		return {
			HideTheSameLink: true,
			fixedTop: false,
			fixedTopUpward: false,
			transtion: true,
			selectSearch: true,
			center: false,
			language: "auto",
			engineCategories: engines_default.engineCategories.map((entry) => entry.slice()),
			engineList: engines_default.engineList
		};
	}
	var isObject = isPlainObject;
	function normalizeSettings(raw, defaults) {
		const data = isObject(raw) ? raw : {};
		const settings = {};
		const OPTION_FLAGS = [
			"fixedTop",
			"fixedTopUpward",
			"HideTheSameLink",
			"transtion",
			"selectSearch"
		];
		settings.version = typeof data.version === "string" ? data.version : "";
		for (const key of OPTION_FLAGS) settings[key] = typeof data[key] === "boolean" ? data[key] : defaults[key];
		settings.center = data.center === true || data.center === 1 || data.center === "1";
		settings.language = normalizeLanguage(data.language ?? defaults.language);
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
			setLanguagePreference(this.settingData.language);
		}
		initSettings() {
			if (this.storedSettingData) {
				this.settingData = normalizeSettings(this.storedSettingData, this.scriptSettingData);
				if (!isSameValue(this.settingData, this.storedSettingData)) {
					this.settingData.version = nowText();
					setValue(STORAGE_KEY, this.settingData);
				}
			} else this.settingData = normalizeSettings(this.scriptSettingData, this.scriptSettingData);
		}
		applyNormalized(normalized) {
			const plain = JSON.parse(JSON.stringify(normalized));
			for (const key of Object.keys(this.settingData)) if (!Object.prototype.hasOwnProperty.call(plain, key)) delete this.settingData[key];
			Object.assign(this.settingData, plain);
			setLanguagePreference(this.settingData.language);
		}
		applySettings(next) {
			this.applyNormalized(normalizeSettings(next, this.scriptSettingData));
			this.settingData.version = nowText();
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
			for (const rule of [...rules_default]) if (rule.url.test(location.href)) return rule;
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
		form.innerHTML = `<input type="hidden" name="${field}" value="${value}"/>`;
		if (targetName) form.target = targetName;
		document.body.appendChild(form);
		form.submit();
	}
	function performJump(engine, keyword, settingData, forceNewTab = false) {
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
	function getFaviconSrc(engine) {
		return engine?.faviconData || engine?.favicon || "";
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
		if (buffer.byteLength > MAX_ICON_BYTES) return {
			data: "",
			reason: t("favicon.tooLarge", { size: MAX_ICON_BYTES / 1024 })
		};
		let mime = getHeader(response.responseHeaders, "content-type").split(";")[0].trim().toLowerCase();
		if (!mime || mime === "application/octet-stream") mime = mimeFromUrl(source);
		if (!/^image\//.test(mime)) return {
			data: "",
			reason: t("favicon.notImage", { type: mime || t("favicon.unknownType") })
		};
		try {
			return {
				data: `data:${mime};base64,${arrayBufferToBase64(buffer)}`,
				reason: ""
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
				}, null, 8, _hoisted_1$7)) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(unref(localizeEngineName)(__props.engine.name)), 1)]);
			};
		}
	};
	var _hoisted_1$6 = ["aria-expanded"];
	var _hoisted_2$5 = [
		"title",
		"aria-label",
		"onKeydown"
	];
	var _hoisted_3$4 = ["src"];
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
			function isPointerInside() {
				return hitTest(triggerEl.value) || hitTest(listEl.value) || hitTestBridge();
			}
			function isPointerOverTrigger(e) {
				const trigger = triggerEl.value;
				if (!trigger || !hitTest(trigger)) return false;
				const path = e?.composedPath?.();
				if (!path) return true;
				return path.includes(trigger);
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
				hoverSuppressed = true;
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
			function onEngineJump(engine) {
				unpin();
				emit("jump", engine);
			}
			function onDocMouseMove(e) {
				pointer.x = e.clientX;
				pointer.y = e.clientY;
				const overTrigger = isPointerOverTrigger(e);
				if (!overTrigger) hoverSuppressed = false;
				if (!shown.value) {
					if (!overTrigger || hoverSuppressed) return;
					if (pinnedCategory && pinnedCategory !== unpin) return;
					show();
					return;
				}
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
					onMouseleave: onHoverLeave
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
					title: unref(t)("jump.searchAll", { name: __props.name }),
					"aria-label": unref(t)("jump.searchAll", { name: __props.name }),
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
				}, null, 8, _hoisted_3$4)) : createCommentVNode("", true), createBaseVNode("span", null, toDisplayString(__props.name), 1)], 10, _hoisted_1$6), (openBlock(), createBlock(Teleport, { to: unref(dropRoot) }, [createBaseVNode("div", {
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
	var _hoisted_1$5 = ["title", "aria-label"];
	var SETTING = "<svg width=\"16\" height=\"16\" class=\"icon\" id=\"sej-setting-button\" viewBox=\"0 0 512 512\" aria-hidden=\"true\" focusable=\"false\"><path d=\"M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z\" fill=\"none\" stroke=\"var(--font-color-qxin)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"42\"/></svg>";
	var _sfc_main$7 = {
		__name: "SettingButton",
		setup(__props) {
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
				name: localizeCategoryName(name, key),
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
				performJump(engine, getCurrentKeyword(), data);
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
	function engineUrlKey(url) {
		const value = typeof url === "string" ? url.trim() : "";
		if (!value) return "";
		return value.replace(/^([a-z][a-z\d+.-]*:\/\/)?([^/?#]+)/i, (match, scheme = "", host) => scheme.toLowerCase() + host.toLowerCase()).replace(/\/+$/, "");
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
			const seen = new Set((target ? target.engines : []).map((engine) => engineUrlKey(engine.url)).filter(Boolean));
			const additions = [];
			for (const engine of engines) {
				const urlKey = engineUrlKey(engine.url);
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
	var restartHandler = null;
	function onRestartRequest(handler) {
		restartHandler = handler;
	}
	function requestRestart() {
		if (restartHandler) restartHandler();
	}
	var _hoisted_1$3 = { id: "newSearchBox" };
	var _hoisted_2$3 = { class: "sej-dialog-title" };
	var _hoisted_3$3 = { class: "sej-field" };
	var _hoisted_4$2 = ["placeholder", "disabled"];
	var _hoisted_5$2 = { class: "sej-field" };
	var _hoisted_6$2 = ["placeholder", "disabled"];
	var _hoisted_7$2 = { class: "sej-field" };
	var _hoisted_8$2 = { class: "sej-field-row" };
	var _hoisted_9$1 = ["placeholder", "disabled"];
	var _hoisted_10$1 = ["disabled"];
	var _hoisted_11$1 = {
		key: 0,
		class: "sej-preview-steps"
	};
	var _hoisted_12$1 = ["title"];
	var _hoisted_13$1 = { class: "sej-preview-url" };
	var _hoisted_14$1 = { class: "sej-preview-state" };
	var _hoisted_15$1 = ["href"];
	var _hoisted_16$1 = { class: "sej-field" };
	var _hoisted_17$1 = { class: "sej-data-line" };
	var _hoisted_18$1 = ["placeholder", "disabled"];
	var _hoisted_19$1 = ["disabled", "title"];
	var _hoisted_20$1 = ["src"];
	var _hoisted_21$1 = { class: "sej-field" };
	var _hoisted_22$1 = ["disabled"];
	var _hoisted_23$1 = { value: "_blank" };
	var _hoisted_24$1 = { value: "_self" };
	var _hoisted_25$1 = { class: "sej-dialog-actions" };
	var _hoisted_26$1 = ["disabled"];
	var _hoisted_27$1 = ["disabled"];
	var _hoisted_28$1 = ["disabled"];
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
			function hostFromUrl(raw) {
				const value = String(raw || "").trim();
				if (!value) return "";
				try {
					return new URL(value.includes("://") ? value : `https://${value}`).hostname.toLowerCase().replace(/\.$/, "").replace(/^www\./, "");
				} catch {
					return "";
				}
			}
			const siteHost = computed(() => hostFromUrl(form.url) || hostFromUrl(form.favicon));
			const titleEdited = ref(Boolean((props.initial.name || "").trim()));
			const faviconEdited = ref(Boolean((props.initial.favicon || "").trim()));
			function markTitleEdited() {
				titleEdited.value = true;
			}
			function markFaviconEdited() {
				faviconEdited.value = true;
				previewSteps.value = [];
			}
			watch(() => form.url, () => {
				if (!titleEdited.value || !form.name.trim()) form.name = titleFromUrl(form.url);
				if (!faviconEdited.value || !form.favicon.trim()) form.favicon = faviconFromUrl(form.url);
				previewSteps.value = [];
			});
			const previewData = ref("");
			const previewUrl = ref("");
			const previewLoading = ref(false);
			const previewFailed = ref(false);
			const previewSteps = ref([]);
			const previewCache = new Map();
			let previewToken = 0;
			const dataIconLink = computed(() => previewData.value.trim());
			const previewImage = computed(() => /^data:image\//i.test(dataIconLink.value));
			const canPreview = computed(() => Boolean(siteHost.value) || /^(https?:\/\/|data:)/i.test(form.favicon.trim()));
			const previewLabel = computed(() => {
				if (previewLoading.value) return t("engine.cancelFetch");
				if (previewFailed.value || previewImage.value) return t("engine.refetch");
				return t("engine.fetchIcon");
			});
			const extractorUrl = computed(() => {
				const host = siteHost.value;
				if (!host) return "";
				return "https://convertico.com/favicon-extractor/?url=" + encodeURIComponent(host);
			});
			const STEP_STATUS_TEXT = {
				pending: "engine.stepPending",
				loading: "engine.stepLoading",
				ok: "engine.stepOk",
				failed: "engine.stepFailed",
				canceled: "engine.stepCanceled"
			};
			const dataEdited = ref(false);
			function markDataEdited() {
				dataEdited.value = true;
				previewUrl.value = previewData.value.trim() ? "manual" : "";
			}
			function setPreviewData(value, sourceUrl) {
				previewData.value = value;
				previewUrl.value = value ? sourceUrl || "" : "";
				dataEdited.value = false;
			}
			function setManualPreviewData(value) {
				previewData.value = value;
				previewUrl.value = value ? "manual" : "";
				dataEdited.value = Boolean(value);
			}
			watch(() => form.favicon, (value) => {
				previewToken++;
				const url = value.trim();
				previewLoading.value = false;
				previewFailed.value = false;
				if (dataEdited.value) return;
				if (/^data:/i.test(url)) {
					setPreviewData(url, url);
					return;
				}
				if (previewCache.has(url)) {
					setPreviewData(previewCache.get(url), url);
					return;
				}
				if (url === initialFavicon && props.initial.faviconData) setPreviewData(props.initial.faviconData, url);
			}, { immediate: true });
			function cancelPreview() {
				previewToken++;
				previewLoading.value = false;
				previewFailed.value = true;
				const current = previewSteps.value.find((step) => step.status === "loading");
				if (current) current.status = "canceled";
			}
			async function applyPreview(step, data) {
				step.status = "ok";
				previewLoading.value = false;
				previewFailed.value = false;
				previewCache.set(step.url, data);
				if (form.favicon.trim() !== step.url) {
					form.favicon = step.url;
					await nextTick();
				}
				setPreviewData(data, step.url);
			}
			async function previewIcon() {
				if (props.busy) return;
				if (previewLoading.value) {
					cancelPreview();
					return;
				}
				const url = form.favicon.trim();
				if (/^data:/i.test(url)) {
					setPreviewData(url, url);
					previewFailed.value = false;
					previewSteps.value = [];
					return;
				}
				const candidates = [];
				if (/^https?:\/\//i.test(url)) candidates.push({ url });
				const host = siteHost.value;
				if (host) {
					const serviceUrl = `https://a.favicon.im/${host}`;
					if (!candidates.some((item) => item.url === serviceUrl)) candidates.push({ url: serviceUrl });
				}
				if (!candidates.length) return;
				const token = ++previewToken;
				previewFailed.value = false;
				previewLoading.value = true;
				previewSteps.value = candidates.map((item) => ({
					...item,
					status: "pending"
				}));
				for (const step of previewSteps.value) {
					if (previewCache.has(step.url)) {
						await applyPreview(step, previewCache.get(step.url));
						return;
					}
					step.status = "loading";
					const { data, reason } = await resolveFavicon(step.url);
					if (token !== previewToken) return;
					if (data) {
						await applyPreview(step, data);
						return;
					}
					step.reason = reason;
					step.status = "failed";
				}
				previewLoading.value = false;
				previewFailed.value = true;
			}
			onMounted(() => urlInput.value?.focus());
			const faviconFileInput = ref(null);
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
					previewSteps.value = [];
					setManualPreviewData(String(reader.result || ""));
				};
				reader.onerror = () => alert(t("engine.readImageFailed"));
				reader.readAsDataURL(file);
			}
			onBeforeUnmount(() => {
				previewToken++;
			});
			function submit() {
				if (props.busy) return;
				const url = form.url.indexOf("://") === -1 ? "https://" + form.url : form.url;
				const favicon = form.favicon.trim() || props.resolveIcon(form.url);
				const data = previewData.value.trim();
				const matched = Boolean(data) && (dataEdited.value || previewUrl.value === favicon || /^data:/i.test(favicon));
				emit("submit", {
					name: form.name,
					url,
					favicon,
					faviconData: matched ? data : "",
					target: form.target
				});
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$3, [
					createBaseVNode("div", _hoisted_2$3, toDisplayString(__props.mode === "edit" ? unref(t)("engine.editTitle") : unref(t)("engine.addTitle")), 1),
					createBaseVNode("label", _hoisted_3$3, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.url")), 1), withDirectives(createBaseVNode("input", {
						ref_key: "urlInput",
						ref: urlInput,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => form.url = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy
					}, null, 8, _hoisted_4$2), [[vModelText, form.url]])]),
					createBaseVNode("label", _hoisted_5$2, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.name")), 1), withDirectives(createBaseVNode("input", {
						"onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => form.name = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy,
						onInput: markTitleEdited
					}, null, 40, _hoisted_6$2), [[vModelText, form.name]])]),
					createBaseVNode("div", _hoisted_7$2, [
						createBaseVNode("span", null, toDisplayString(unref(t)("engine.icon")), 1),
						createBaseVNode("div", _hoisted_8$2, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => form.favicon = $event),
							placeholder: unref(t)("common.optional"),
							disabled: __props.busy,
							onInput: markFaviconEdited
						}, null, 40, _hoisted_9$1), [[vModelText, form.favicon]]), createBaseVNode("button", {
							type: "button",
							class: "sej-icon-preview-btn",
							disabled: __props.busy || !previewLoading.value && !canPreview.value,
							onClick: previewIcon
						}, toDisplayString(previewLabel.value), 9, _hoisted_10$1)]),
						previewSteps.value.length ? (openBlock(), createElementBlock("div", _hoisted_11$1, [(openBlock(true), createElementBlock(Fragment, null, renderList(previewSteps.value, (step) => {
							return openBlock(), createElementBlock("div", {
								key: step.url,
								title: step.url,
								class: normalizeClass(["sej-preview-step", "is-" + step.status])
							}, [
								_cache[7] || (_cache[7] = createBaseVNode("span", { class: "sej-preview-dot" }, null, -1)),
								createBaseVNode("span", _hoisted_13$1, toDisplayString(step.url), 1),
								createBaseVNode("span", _hoisted_14$1, toDisplayString(step.status === "failed" && step.reason ? step.reason : unref(t)(STEP_STATUS_TEXT[step.status])), 1)
							], 10, _hoisted_12$1);
						}), 128)), extractorUrl.value ? (openBlock(), createElementBlock("a", {
							key: 0,
							class: "sej-preview-extractor",
							href: extractorUrl.value,
							target: "_blank",
							rel: "noopener"
						}, toDisplayString(unref(t)("engine.tryExtractor")), 9, _hoisted_15$1)) : createCommentVNode("", true)])) : createCommentVNode("", true)
					]),
					createBaseVNode("div", _hoisted_16$1, [
						createBaseVNode("span", null, toDisplayString(unref(t)("engine.iconData")), 1),
						createBaseVNode("div", _hoisted_17$1, [withDirectives(createBaseVNode("input", {
							"onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => previewData.value = $event),
							class: "sej-data-input",
							placeholder: unref(t)("engine.iconDataPlaceholder"),
							disabled: __props.busy,
							onInput: markDataEdited
						}, null, 40, _hoisted_18$1), [[vModelText, previewData.value]]), createBaseVNode("button", {
							type: "button",
							class: normalizeClass(["sej-icon-preview-btn", { "sej-has-icon": previewImage.value }]),
							disabled: __props.busy,
							title: previewImage.value ? unref(t)("engine.uploadReplace") : unref(t)("engine.upload"),
							onClick: pickFaviconFile
						}, [previewImage.value ? (openBlock(), createElementBlock("img", {
							key: 0,
							class: "sej-icon-preview",
							src: dataIconLink.value,
							alt: ""
						}, null, 8, _hoisted_20$1)) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode(toDisplayString(unref(t)("engine.upload")), 1)], 64))], 10, _hoisted_19$1)]),
						createBaseVNode("input", {
							ref_key: "faviconFileInput",
							ref: faviconFileInput,
							class: "sej-file-input",
							type: "file",
							accept: "image/*,.ico",
							onChange: uploadFavicon
						}, null, 544)
					]),
					createBaseVNode("label", _hoisted_21$1, [createBaseVNode("span", null, toDisplayString(unref(t)("engine.target")), 1), withDirectives(createBaseVNode("select", {
						id: "iqxin-newTarget",
						"onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => form.target = $event),
						disabled: __props.busy
					}, [createBaseVNode("option", _hoisted_23$1, toDisplayString(unref(t)("engine.targetBlank")), 1), createBaseVNode("option", _hoisted_24$1, toDisplayString(unref(t)("engine.targetSelf")), 1)], 8, _hoisted_22$1), [[vModelSelect, form.target]])]),
					createBaseVNode("div", _hoisted_25$1, [
						__props.mode === "edit" ? (openBlock(), createElementBlock("button", {
							key: 0,
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[5] || (_cache[5] = ($event) => _ctx.$emit("delete"))
						}, toDisplayString(unref(t)("common.delete")), 9, _hoisted_26$1)) : createCommentVNode("", true),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[6] || (_cache[6] = ($event) => _ctx.$emit("cancel"))
						}, toDisplayString(unref(t)("common.cancel")), 9, _hoisted_27$1),
						createBaseVNode("button", {
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(__props.busy ? unref(t)("engine.fetching") : unref(t)("common.confirm")), 9, _hoisted_28$1)
					])
				]);
			};
		}
	};
	var _hoisted_1$2 = {
		id: "sej-categoryBox",
		class: "sej-dialog-box"
	};
	var _hoisted_2$2 = { class: "sej-dialog-title" };
	var _hoisted_3$2 = { class: "sej-field" };
	var _hoisted_4$1 = ["placeholder", "disabled"];
	var _hoisted_5$1 = { class: "sej-dialog-actions" };
	var _hoisted_6$1 = ["disabled"];
	var _hoisted_7$1 = ["disabled"];
	var _hoisted_8$1 = ["disabled"];
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
					createBaseVNode("div", _hoisted_2$2, toDisplayString(unref(t)("category.title")), 1),
					createBaseVNode("label", _hoisted_3$2, [createBaseVNode("span", null, toDisplayString(unref(t)("common.name")), 1), withDirectives(createBaseVNode("input", {
						ref_key: "input",
						ref: input,
						"onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => value.value = $event),
						placeholder: unref(t)("common.required"),
						disabled: __props.busy,
						onKeydown: withKeys(submit, ["enter"])
					}, null, 40, _hoisted_4$1), [[vModelText, value.value]])]),
					createBaseVNode("div", _hoisted_5$1, [
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn sej-dialog-danger",
							disabled: __props.busy,
							onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("delete"))
						}, toDisplayString(unref(t)("category.delete")), 9, _hoisted_6$1),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-closeBtn",
							disabled: __props.busy,
							onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("cancel"))
						}, toDisplayString(unref(t)("common.cancel")), 9, _hoisted_7$1),
						createBaseVNode("button", {
							type: "button",
							class: "addItemBoxBtn iqxin-enterBtn",
							disabled: __props.busy,
							onClick: submit
						}, toDisplayString(unref(t)("common.confirm")), 9, _hoisted_8$1)
					])
				]);
			};
		}
	};
	var _hoisted_1$1 = { id: "iqxin-editCodeBox" };
	var _hoisted_2$1 = { class: "sej-dialog-actions" };
	var _hoisted_3$1 = ["title"];
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
			"notify",
			"merge"
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
					emit("notify", t("config.imported", { name: file.name }));
				} catch (e) {
					alert(t("config.parseFailed"));
				}
			}
			function exportFile() {
				let parsed;
				try {
					parsed = JSON.parse(text.value);
				} catch (e) {
					alert(t("config.parseFailedExport"));
					return false;
				}
				const blob = new Blob([JSON.stringify(parsed, null, 4)], { type: "application/json;charset=utf-8" });
				const url = URL.createObjectURL(blob);
				const link = document.createElement("a");
				link.href = url;
				link.download = `SearchEngineJump.json`;
				document.body.appendChild(link);
				link.click();
				link.remove();
				setTimeout(() => URL.revokeObjectURL(url), 1e3);
				emit("notify", t("config.exported"));
				return true;
			}
			function reset() {
				if (!exportFile()) return;
				emit("reset");
			}
			return (_ctx, _cache) => {
				return openBlock(), createElementBlock("div", _hoisted_1$1, [
					createBaseVNode("p", null, [
						_cache[4] || (_cache[4] = createBaseVNode("span", { class: "iqxin-warning" }, "! ! !", -1)),
						_cache[5] || (_cache[5] = createBaseVNode("br", null, null, -1)),
						createTextVNode(" " + toDisplayString(unref(t)("config.warningLine1")), 1),
						_cache[6] || (_cache[6] = createBaseVNode("br", null, null, -1)),
						createTextVNode(" " + toDisplayString(unref(t)("config.warningLine2")), 1)
					]),
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
						createBaseVNode("button", { onClick: reset }, toDisplayString(unref(t)("config.reset")), 1),
						createBaseVNode("button", { onClick: pickFile }, toDisplayString(unref(t)("config.import")), 1),
						createBaseVNode("button", {
							title: unref(t)("config.mergeTip"),
							onClick: _cache[1] || (_cache[1] = ($event) => _ctx.$emit("merge", text.value))
						}, toDisplayString(unref(t)("config.mergeImport")), 9, _hoisted_3$1),
						createBaseVNode("button", { onClick: exportFile }, toDisplayString(unref(t)("config.export")), 1),
						createBaseVNode("button", { onClick: copy }, toDisplayString(unref(t)("common.copy")), 1),
						createBaseVNode("button", {
							class: "iqxin-closeBtn",
							onClick: _cache[2] || (_cache[2] = ($event) => _ctx.$emit("close"))
						}, toDisplayString(unref(t)("common.close")), 1),
						createBaseVNode("button", {
							class: "iqxin-enterBtn",
							onClick: _cache[3] || (_cache[3] = ($event) => _ctx.$emit("save", text.value))
						}, toDisplayString(unref(t)("common.save")), 1)
					])
				]);
			};
		}
	};
	var _hoisted_1 = { class: "sej-panel-title" };
	var _hoisted_2 = ["title", "aria-label"];
	var _hoisted_3 = ["id", "data-sej-drag-el"];
	var _hoisted_4 = [
		"data-xin",
		"data-iqxintitle",
		"title",
		"onPointerdown",
		"onClick"
	];
	var _hoisted_5 = { class: "iqxin-pointer-events" };
	var _hoisted_6 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_7 = ["title", "onClick"];
	var _hoisted_8 = ["data-sej-drag-el"];
	var _hoisted_9 = [
		"data-sej-drag-el",
		"title",
		"onPointerdown",
		"onClick"
	];
	var _hoisted_10 = [
		"data-iqxintitle",
		"data-iqxinimg",
		"data-iqxinlink",
		"data-iqxintarget",
		"data-iqxindisabled"
	];
	var _hoisted_11 = ["src"];
	var _hoisted_12 = [
		"title",
		"onClick",
		"innerHTML"
	];
	var _hoisted_13 = ["title", "onClick"];
	var _hoisted_14 = ["onClick"];
	var _hoisted_15 = {
		key: 2,
		class: "sej-copy-hint"
	};
	var _hoisted_16 = [
		"title",
		"aria-label",
		"onKeydown"
	];
	var _hoisted_17 = { id: "btnEle" };
	var _hoisted_18 = { class: "btnEleLayer" };
	var _hoisted_19 = { class: "sej-footer-options" };
	var _hoisted_20 = ["title"];
	var _hoisted_21 = { id: "xin-selectSearch" };
	var _hoisted_22 = { id: "xin-transtion" };
	var _hoisted_23 = ["title"];
	var _hoisted_24 = ["title"];
	var _hoisted_25 = ["title"];
	var _hoisted_26 = { id: "xin-language" };
	var _hoisted_27 = { value: "auto" };
	var _hoisted_28 = { class: "sej-footer-bar" };
	var _hoisted_29 = { class: "sej-footer-selects" };
	var _hoisted_30 = ["title"];
	var _hoisted_31 = { class: "sej-footer-links" };
	var _hoisted_32 = ["title"];
	var _hoisted_33 = ["title"];
	var _hoisted_34 = { class: "sej-footer-actions" };
	var _hoisted_35 = ["title"];
	var COPY = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><rect x=\"9\" y=\"9\" width=\"12\" height=\"12\" rx=\"2\"/><path d=\"M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1\"/></svg>";
	var EYE = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z\"/><circle cx=\"12\" cy=\"12\" r=\"3\"/></svg>";
	var EYE_OFF = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94\"/><path d=\"M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19\"/><path d=\"M14.12 14.12a3 3 0 1 1-4.24-4.24\"/><line x1=\"1\" y1=\"1\" x2=\"23\" y2=\"23\"/></svg>";
	var PENCIL = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M12 20h9\"/><path d=\"M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z\"/></svg>";
	var TRASH = "<svg width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" aria-hidden=\"true\"><path d=\"M3 6h18\"/><path d=\"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2\"/><path d=\"M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6\"/><line x1=\"10\" y1=\"11\" x2=\"10\" y2=\"17\"/><line x1=\"14\" y1=\"11\" x2=\"14\" y2=\"17\"/></svg>";
	var UNDO_DURATION = 5e3;
	var AUTOSAVE_DELAY = 500;
	var DRAG_ANIMATION_MS = 160;
	var DRAG_THRESHOLD = 4;
	var DRAG_EDGE = 40;
	var TOUCH_LONG_PRESS_MS = 280;
	var TOUCH_MOVE_SLOP = 10;
	var _sfc_main$2 = {
		__name: "SettingPanel",
		setup(__props) {
			const settings = useSettings();
			const source = computed(() => settings.settingData);
			function displayCategoryName(category) {
				if (!category) return "";
				return localizeCategoryName(category.name, category.key);
			}
			const OPTION_KEYS = [
				"fixedTop",
				"fixedTopUpward",
				"HideTheSameLink",
				"center",
				"transtion",
				"selectSearch",
				"language"
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
				result.version = source.value.version;
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
					showToast(t("toast.autoSaveFailed"), 5e3);
					return;
				}
				settingsChanged = true;
				if (backend === "local" && !autosaveWarnedLocal) {
					autosaveWarnedLocal = true;
					showToast(t("toast.autoSavedLocal"), 3e3);
				}
			}
			function scheduleAutoSave() {
				if (saving.value) return;
				autosaveQueued = true;
				clearTimeout(autosaveTimer);
				autosaveTimer = setTimeout(flushAutoSave, AUTOSAVE_DELAY);
			}
			watch(() => OPTION_KEYS.map((key) => draft[key]), () => scheduleAutoSave());
			watch(() => draft.language, (value) => setLanguagePreference(value));
			function refreshDraft() {
				const next = makeDraft();
				for (const key of OPTION_KEYS) draft[key] = next[key];
				draft.categories.splice(0, draft.categories.length, ...next.categories);
			}
			function trySyncFromRemote() {
				if (saving.value) return;
				const hasLocalChanges = !isSameValue(buildResult(), source.value);
				if (engineDialog.value || categoryDialog.value || configOpen.value || hasLocalChanges) {
					showToast(t("toast.remoteConflict"), 6e3, {
						label: t("toast.syncAction"),
						onClick: forceSyncFromRemote
					});
					return;
				}
				if (!settings.reload()) return;
				refreshDraft();
				remoteSynced = true;
				showToast(t("toast.synced"), 3e3);
			}
			function forceSyncFromRemote() {
				engineDialog.value = null;
				categoryDialog.value = null;
				configOpen.value = false;
				cancelAutoSave();
				settings.reload();
				refreshDraft();
				remoteSynced = true;
				showToast(t("toast.synced"), 3e3);
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
							showToast(t("toast.saveFailed"), 5e3);
							return;
						}
						settingsChanged = true;
						if (backend === "local") showToast(t("toast.savedLocal"), 4e3);
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
					showToast(t("toast.noIcons"));
					return;
				}
				loadingIcons.value = true;
				try {
					showToast(t("toast.embeddingIcons", { count: pending }), 6e4);
					const { converted, failed } = await embedRemoteFavicons();
					const parts = [];
					if (converted) parts.push(t("toast.embeddedIcons", { count: converted }));
					if (!converted && !failed) parts.push(t("toast.noLoadableIcons"));
					else if (failed) parts.push(t("toast.iconsFailed", { count: failed }));
					const separator = t("toast.listSeparator");
					if (converted) {
						scheduleAutoSave();
						showToast(`${parts.join(separator)}${t("toast.autoSavedSuffix")}`, 4e3);
					} else showToast(parts.join(separator), 4e3);
				} finally {
					loadingIcons.value = false;
				}
			}
			function reset(exported = false) {
				const message = exported ? t("reset.confirmExported") : t("reset.confirm");
				if (confirm(message)) {
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
				showToast(category.enabled ? t("common.enabled") : t("common.hidden"));
			}
			function toggleEngine(ci, ei) {
				const engine = draft.categories[ci].engines[ei];
				engine.disable = !engine.disable;
				scheduleAutoSave();
				showToast(engine.disable ? t("common.hidden") : t("common.enabled"));
			}
			function pushUndo(entry) {
				undoStack.push(entry);
				if (undoStack.length > 20) undoStack.shift();
			}
			function undoDelete() {
				if (engineDialog.value || categoryDialog.value || configOpen.value) {
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
				categoryDialog.value = null;
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
				if (!category) return;
				notifyDeleted({
					type: "category",
					index,
					item: JSON.parse(JSON.stringify(category))
				}, t("category.label", { name: displayCategoryName(category) }));
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
				}, t("engine.label", { name: localizeEngineName(engine.name) }));
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
			const dragCtx = ref(null);
			const copyTargetCi = ref(null);
			const dragAnimations = new WeakMap();
			let dragSnapshot = null;
			let dragDropped = false;
			let pressCtx = null;
			let pressTimer = 0;
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
				document.addEventListener("pointermove", onDragPointerMove);
				document.addEventListener("pointerup", onDragPointerUp);
				document.addEventListener("pointercancel", onDragPointerCancel);
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
				document.removeEventListener("touchmove", onBlockTouchMove);
				if (block) document.addEventListener("touchmove", onBlockTouchMove, { passive: false });
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
				blockTouchScroll(false);
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
				if (p.touch) try {
					navigator.vibrate?.(12);
				} catch (e) {}
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
					alert(t("engine.required"));
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
				if (!engine || engine.favicon !== url) return;
				if (!data) {
					console.warn("[SEJ] 后台获取图标失败:", url, reason || t("favicon.backgroundFailed"));
					return;
				}
				engine.faviconData = data;
				scheduleAutoSave();
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
					name: t("category.newName"),
					key: createCategoryKey(),
					enabled: true,
					engines: []
				});
				scheduleAutoSave();
				await nextTick();
				const body = layerEl.value?.querySelector("#sej-settings-body");
				if (body) body.scrollTop = body.scrollHeight;
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
				return ((isNaN(iconSetting) ? iconSetting : "") || siteURL + "/favicon.ico").replace("%s", siteURL);
			}
			function openConfig() {
				configOpen.value = true;
			}
			function mergeConfig(rawText) {
				let parsed;
				try {
					parsed = JSON.parse(rawText);
				} catch (e) {
					alert(t("config.parseFailed"));
					return;
				}
				const stats = mergeIntoCategories(draft.categories, parsed, nextId);
				if (!stats) {
					alert(t("config.mergeUnrecognized"));
					return;
				}
				if (!stats.engines) {
					showToast(t("toast.mergeNothing"), 3e3);
					return;
				}
				settingsChanged = true;
				configOpen.value = false;
				scheduleAutoSave();
				const parts = [t("toast.mergedEngines", { count: stats.engines })];
				if (stats.categories) parts.push(t("toast.mergedCategories", { count: stats.categories }));
				if (stats.skipped) parts.push(t("toast.mergedSkipped", { count: stats.skipped }));
				showToast(t("toast.mergeImported", { summary: parts.join(t("toast.listSeparator")) }), 4e3);
			}
			function saveConfig(text) {
				if (text) {
					let parsed;
					try {
						parsed = JSON.parse(text);
					} catch (e) {
						alert(t("config.parseFailed"));
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
			let dragPointerId = null;
			function onDragMove(e) {
				if (dragPointerId != null && e.pointerId !== dragPointerId) return;
				const el = layerEl.value;
				if (!el) return;
				const mask = maskEl.value;
				const scrollLeft = mask ? mask.scrollLeft : 0;
				const scrollTop = mask ? mask.scrollTop : 0;
				const maxLeft = scrollLeft + Math.max(0, window.innerWidth - el.offsetWidth);
				const maxTop = scrollTop + Math.max(0, window.innerHeight - el.offsetHeight);
				layerStyle.value = {
					left: Math.min(Math.max(e.clientX - dragOffset.x + scrollLeft, scrollLeft), maxLeft) + "px",
					top: Math.min(Math.max(e.clientY - dragOffset.y + scrollTop, scrollTop), maxTop) + "px",
					margin: 0
				};
				if (e.cancelable) e.preventDefault();
			}
			function stopDrag(e) {
				if (dragPointerId != null && e?.pointerId !== dragPointerId) return;
				dragging.value = false;
				dragPointerId = null;
				document.removeEventListener("pointermove", onDragMove);
				document.removeEventListener("pointerup", stopDrag);
				document.removeEventListener("pointercancel", stopDrag);
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
				dragging.value = true;
				document.addEventListener("pointermove", onDragMove);
				document.addEventListener("pointerup", stopDrag);
				document.addEventListener("pointercancel", stopDrag);
			}
			onMounted(() => {
				document.body.style.overflow = "hidden";
				document.addEventListener("keydown", onKeydown);
				window.addEventListener("blur", onWindowBlur);
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
				clearPressTimer();
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
				document.removeEventListener("pointermove", onDragMove);
				document.removeEventListener("pointerup", stopDrag);
				document.removeEventListener("pointercancel", stopDrag);
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
					style: normalizeStyle(layerStyle.value),
					onClick: _cache[16] || (_cache[16] = withModifiers(() => {}, ["stop"]))
				}, [
					createBaseVNode("div", {
						class: "sej-panel-header",
						onPointerdown: startDrag,
						onContextmenu: _cache[1] || (_cache[1] = withModifiers(() => {}, ["prevent"]))
					}, [createBaseVNode("span", _hoisted_1, toDisplayString(unref(t)("settings.title")), 1), createBaseVNode("button", {
						type: "button",
						class: "sej-panel-close",
						title: unref(t)("settings.close"),
						"aria-label": unref(t)("settings.close"),
						onClick: withModifiers(close, ["stop"]),
						onPointerdown: _cache[0] || (_cache[0] = withModifiers(() => {}, ["stop"]))
					}, "✕", 40, _hoisted_2)], 32),
					createBaseVNode("div", {
						id: "sej-settings-body",
						onDragstart: _cache[4] || (_cache[4] = withModifiers(() => {}, ["prevent"])),
						onContextmenu: _cache[5] || (_cache[5] = withModifiers(() => {}, ["prevent"]))
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
							title: unref(t)("settings.editCategory", { name: displayCategoryName(category) }),
							onPointerdown: ($event) => onDragPointerDown($event, "category", ci),
							onClick: withModifiers(($event) => openCategoryDialog(ci), ["stop"])
						}, [
							createBaseVNode("span", _hoisted_5, toDisplayString(displayCategoryName(category)), 1),
							createBaseVNode("span", {
								class: "sej-hover-edit",
								innerHTML: PENCIL
							}),
							createBaseVNode("span", {
								class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": !category.enabled }]),
								title: category.enabled ? unref(t)("common.hide") : unref(t)("common.show"),
								onClick: withModifiers(($event) => toggleCategory(ci), ["stop"]),
								innerHTML: category.enabled ? EYE : EYE_OFF
							}, null, 10, _hoisted_6),
							createBaseVNode("span", {
								class: "sej-hover-delete",
								title: unref(t)("settings.deleteCategory"),
								onPointerdown: _cache[2] || (_cache[2] = withModifiers(() => {}, ["stop"])),
								onClick: withModifiers(($event) => deleteCategory(ci), ["stop"]),
								innerHTML: TRASH
							}, null, 40, _hoisted_7)
						], 40, _hoisted_4), createBaseVNode("div", {
							class: "sejcon",
							"data-sej-drag-el": "list-" + category._id
						}, [(openBlock(true), createElementBlock(Fragment, null, renderList(category.engines, (engine, ei) => {
							return openBlock(), createElementBlock("span", {
								key: engine._id,
								class: normalizeClass(["drag", { "sej-drag-placeholder": dragCtx.value?.type === "engine" && dragCtx.value.key === engine._id }]),
								"data-sej-drag-el": "engine-" + engine._id,
								title: unref(t)("settings.editEngine", { name: unref(localizeEngineName)(engine.name) }),
								onPointerdown: ($event) => onDragPointerDown($event, "engine", ci, ei),
								onClick: withModifiers(($event) => editEngine(ci, ei), ["stop"])
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
								}, null, 8, _hoisted_11), createBaseVNode("span", null, toDisplayString(unref(localizeEngineName)(engine.name)), 1)], 8, _hoisted_10),
								createBaseVNode("span", {
									class: "sej-hover-edit",
									innerHTML: PENCIL
								}),
								createBaseVNode("span", {
									class: normalizeClass(["iqxin-set-toggle", { "iqxin-set-hidden": engine.disable }]),
									title: engine.disable ? unref(t)("common.show") : unref(t)("common.hide"),
									onClick: withModifiers(($event) => toggleEngine(ci, ei), ["stop"]),
									innerHTML: engine.disable ? EYE_OFF : EYE
								}, null, 10, _hoisted_12),
								createBaseVNode("span", {
									class: "sej-hover-delete",
									title: unref(t)("settings.deleteEngine"),
									onPointerdown: _cache[3] || (_cache[3] = withModifiers(() => {}, ["stop"])),
									onClick: withModifiers(($event) => deleteEngine(ci, ei), ["stop"]),
									innerHTML: TRASH
								}, null, 40, _hoisted_13)
							], 42, _hoisted_9);
						}), 128)), createBaseVNode("span", {
							class: normalizeClass(["iqxin-additem", { "sej-copy-target": copyTargetCi.value === ci }]),
							onClick: withModifiers(($event) => addEngine(ci), ["stop"])
						}, [copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", {
							key: 0,
							class: "sej-copy-icon",
							innerHTML: COPY
						})) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode("+")], 64)), copyTargetCi.value === ci ? (openBlock(), createElementBlock("span", _hoisted_15, toDisplayString(unref(t)("settings.copyHere")), 1)) : createCommentVNode("", true)], 10, _hoisted_14)], 8, _hoisted_8)], 10, _hoisted_3);
					}), 128)), createBaseVNode("div", {
						class: "iqxin-items sej-add-category-card",
						role: "button",
						tabindex: "0",
						title: unref(t)("settings.addCategory"),
						"aria-label": unref(t)("settings.addCategory"),
						onClick: addCategory,
						onKeydown: [withKeys(addCategory, ["enter"]), withKeys(withModifiers(addCategory, ["prevent"]), ["space"])]
					}, [..._cache[17] || (_cache[17] = [createBaseVNode("span", { class: "sej-add-category-plus" }, "+", -1)])], 40, _hoisted_16)], 32),
					createBaseVNode("div", _hoisted_17, [createBaseVNode("div", _hoisted_18, [createBaseVNode("div", _hoisted_19, [
						createBaseVNode("span", {
							id: "xin-HideTheSameLink",
							title: unref(t)("settings.hideSameLinkTip")
						}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.hideSameLink")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[6] || (_cache[6] = ($event) => draft.HideTheSameLink = $event)
						}, null, 512), [[vModelCheckbox, draft.HideTheSameLink]])])], 8, _hoisted_20),
						createBaseVNode("span", _hoisted_21, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.selectSearch")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[7] || (_cache[7] = ($event) => draft.selectSearch = $event)
						}, null, 512), [[vModelCheckbox, draft.selectSearch]])])]),
						createBaseVNode("span", _hoisted_22, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.transition")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[8] || (_cache[8] = ($event) => draft.transtion = $event)
						}, null, 512), [[vModelCheckbox, draft.transtion]])])]),
						createBaseVNode("span", {
							id: "xin-centerDisplay",
							title: unref(t)("settings.centerTip")
						}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.center")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[9] || (_cache[9] = ($event) => draft.center = $event)
						}, null, 512), [[vModelCheckbox, draft.center]])])], 8, _hoisted_23),
						createBaseVNode("span", {
							id: "iqxin-fixedTopS",
							title: unref(t)("settings.fixedTopTip")
						}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.fixedTop")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[10] || (_cache[10] = ($event) => draft.fixedTop = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTop]])])], 8, _hoisted_24),
						withDirectives(createBaseVNode("span", {
							id: "iqxin-fixedTopUpward",
							title: unref(t)("settings.fixedTopUpwardTip")
						}, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.fixedTopUpward")), 1), withDirectives(createBaseVNode("input", {
							type: "checkbox",
							"onUpdate:modelValue": _cache[11] || (_cache[11] = ($event) => draft.fixedTopUpward = $event)
						}, null, 512), [[vModelCheckbox, draft.fixedTopUpward]])])], 8, _hoisted_25), [[vShow, draft.fixedTop]]),
						createBaseVNode("span", _hoisted_26, [createBaseVNode("label", null, [createTextVNode(toDisplayString(unref(t)("settings.language")) + " ", 1), withDirectives(createBaseVNode("select", {
							"onUpdate:modelValue": _cache[12] || (_cache[12] = ($event) => draft.language = $event),
							class: "sej-language-select"
						}, [
							createBaseVNode("option", _hoisted_27, toDisplayString(unref(t)("settings.languageAuto")), 1),
							_cache[18] || (_cache[18] = createBaseVNode("option", { value: "zh-CN" }, "简体中文", -1)),
							_cache[19] || (_cache[19] = createBaseVNode("option", { value: "en" }, "English", -1))
						], 512), [[vModelSelect, draft.language]])])])
					]), createBaseVNode("div", _hoisted_28, [
						createBaseVNode("div", _hoisted_29, [createBaseVNode("span", {
							id: "xin-modification",
							onClick: openConfig
						}, toDisplayString(unref(t)("settings.editConfig")), 1), createBaseVNode("span", {
							id: "xin-loadIcons",
							title: unref(t)("settings.loadIconsTip"),
							class: normalizeClass({ "sej-loading": loadingIcons.value }),
							onClick: loadAllIcons
						}, toDisplayString(loadingIcons.value ? unref(t)("settings.loading") : unref(t)("settings.loadIcons")), 11, _hoisted_30)]),
						createBaseVNode("div", _hoisted_31, [createBaseVNode("span", {
							class: "feedback",
							title: unref(t)("settings.feedbackGreasyFork")
						}, [..._cache[20] || (_cache[20] = [createBaseVNode("a", {
							target: "_blank",
							href: "https://greasyfork.org/zh-CN/users/1238054"
						}, "Greasy Fork", -1)])], 8, _hoisted_32), createBaseVNode("span", {
							class: "feedback",
							title: unref(t)("settings.feedbackGitHub")
						}, [..._cache[21] || (_cache[21] = [createBaseVNode("a", {
							target: "_blank",
							href: "https://github.com/sherlocknieh/Monkey-Scripts"
						}, "GitHub", -1)])], 8, _hoisted_33)]),
						createBaseVNode("div", _hoisted_34, [createBaseVNode("span", {
							id: "xin-save",
							title: unref(t)("settings.close"),
							class: normalizeClass({ "sej-saving": saving.value }),
							onClick: save
						}, toDisplayString(saving.value ? unref(t)("settings.saving") : unref(t)("settings.close")), 11, _hoisted_35)])
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
						name: displayCategoryName(draft.categories[categoryDialog.value.index]) || "",
						onSubmit: submitCategory,
						onDelete: deleteCategoryFromDialog,
						onCancel: cancelCategoryDialog
					}, null, 8, ["name"])) : createCommentVNode("", true),
					configOpen.value ? (openBlock(), createBlock(_sfc_main$3, {
						key: 2,
						"initial-text": configText.value,
						onSave: saveConfig,
						onReset: _cache[13] || (_cache[13] = ($event) => reset(true)),
						onClose: _cache[14] || (_cache[14] = ($event) => configOpen.value = false),
						onCopy: _cache[15] || (_cache[15] = ($event) => unref(showToast)(unref(t)("toast.copySuccess"))),
						onNotify: unref(showToast),
						onMerge: mergeConfig
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
	var global_default = "/* ==UserStyle==\n@name           SearchEngineJumpPlusGlobalStyle\n@description    Global style for SearchEngineJumpPlus\n@version        5.32.0\n@namespace      https://greasyfork.org/en/scripts/454280-searchenginejumpplus\n@license        MIT\n@author         MUTED64\n==/UserStyle== */\n\n#settingLayerMask {\n  display: none;\n  justify-content: center;\n  align-items: center;\n  position: fixed;\n  inset: 0;\n  background-color: rgba(16, 18, 22, 0.42);\n  backdrop-filter: blur(12px);\n  z-index: 200000000;\n  overflow: auto;\n  font-family: var(--sej-font-family);\n  min-height: 100%;\n  font-size: 14px;\n  transition: opacity 0.15s ease-out;\n  opacity: 0;\n  animation: sej-setting-mask-in 0.15s ease;\n  user-select: none;\n  -moz-user-select: none;\n  touch-action: manipulation;\n  padding-bottom: 80px;\n  box-sizing: border-box;\n  color: var(--font-color-qxin);\n}\n#settingLayer {\n  display: flex;\n  flex-direction: column;\n  box-sizing: border-box;\n  --sej-panel-pad-x: 20px;\n  --sej-panel-pad-top: 16px;\n  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;\n  background-color: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 16px;\n  box-shadow: var(--sej-panel-shadow);\n  position: absolute;\n  width: auto;\n  min-width: min(720px, calc(100vw - 32px));\n  max-width: min(960px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  margin: 0;\n  overflow: visible;\n  animation: sej-panel-in 0.16s ease-out;\n}\n@keyframes sej-panel-in {\n  from {\n    opacity: 0;\n    transform: translateY(6px) scale(0.99);\n  }\n}\n.sej-panel-header {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n  flex: 0 0 auto;\n  padding: 0 2px 12px;\n  cursor: move;\n  /* 触屏拖动标题栏时不要触发页面滚动/长按菜单 */\n  touch-action: none;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n.sej-panel-title {\n  font-size: 15px;\n  font-weight: 600;\n  letter-spacing: 0.01em;\n}\n.sej-panel-close {\n  position: relative;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 28px;\n  height: 28px;\n  padding: 0;\n  border: none;\n  border-radius: 50%;\n  background: var(--sej-surface-hover);\n  color: transparent;\n  font-size: 0;\n  line-height: 0;\n  cursor: pointer;\n  opacity: 1;\n  transition: background-color 0.12s ease-out, opacity 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n.sej-panel-close::before,\n.sej-panel-close::after {\n  content: \"\";\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  width: 12px;\n  height: 1.5px;\n  border-radius: 2px;\n  background: var(--font-color-qxin);\n  transform: translate(-50%, -50%) rotate(45deg);\n}\n.sej-panel-close::after {\n  transform: translate(-50%, -50%) rotate(-45deg);\n}\n.sej-panel-close:hover {\n  background: var(--sej-active-bg);\n}\n.sej-panel-close:active {\n  transform: scale(0.92);\n  opacity: 0.75;\n}\n.iqxin-items {\n  display: flex;\n  flex-direction: column;\n  flex: 0 0 220px;\n  width: 220px;\n  min-width: 0;\n  max-width: 220px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 6px;\n  border-radius: 12px;\n  border: 1px solid var(--border-color-sej);\n  background: var(--sej-surface-2);\n}\n.sej-add-category-card {\n  align-items: center;\n  justify-content: center;\n  min-height: 140px;\n  background: transparent;\n  border: 1px dashed var(--sej-checkbox-border);\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.sej-add-category-card:hover {\n  background: var(--sej-surface-hover);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-add-category-card:focus-visible {\n  background: var(--sej-surface-hover);\n  outline: 2px solid var(--sej-accent);\n  outline-offset: 2px;\n}\n.sej-add-category-plus {\n  font-size: 42px;\n  font-weight: 300;\n  line-height: 1;\n  opacity: 0.45;\n  transition: opacity 0.12s ease-out;\n}\n.sej-add-category-card:hover .sej-add-category-plus {\n  opacity: 1;\n}\n.sejcon {\n  display: flex;\n  flex-direction: column;\n  flex: 1 1 auto;\n}\n.sejcon > .drag {\n  flex: 0 0 auto;\n}\n#settingLayer .drag {\n  display: block;\n  position: relative;\n  /* 触屏：tap 立即响应；长按由脚本接管拖动，禁用原生长按菜单 */\n  touch-action: manipulation;\n  -webkit-touch-callout: none;\n  -webkit-user-select: none;\n  user-select: none;\n}\n/* 拖动排序：源元素隐藏但保留占位，目标位置只空出空白 */\n#settingLayer .sej-drag-placeholder,\n#settingLayer .sej-drag-placeholder * {\n  visibility: hidden !important;\n}\n#settingLayer .sejtitle:active,\n#settingLayer .sejcon > .drag:active {\n  cursor: grabbing;\n}\n.sej-drag-ghost {\n  position: fixed !important;\n  left: 0 !important;\n  top: 0 !important;\n  margin: 0 !important;\n  z-index: 200000200;\n  opacity: 1 !important;\n  pointer-events: none;\n  box-sizing: border-box;\n  overflow: hidden;\n  will-change: transform;\n}\n.sej-drag-ghost * {\n  pointer-events: none !important;\n}\n.sej-drag-ghost-engine {\n  border-radius: 8px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);\n}\n.sej-drag-ghost-category {\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);\n}\n#settingLayer .sej-engine {\n  padding: 0 82px 0 8px;\n  width: 100%;\n  height: 30px;\n  box-sizing: border-box;\n  border-radius: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n#settingLayer .sej-engine > span {\n  flex: 0 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.iqxin-pointer-events,\n.sej-engine-icon,\n#settingLayer .sej-engine * {\n  pointer-events: none;\n}\n.sejtitle {\n  text-align: left;\n  /* 左侧与引擎条目对齐，右侧避开编辑/删除/显隐按钮 */\n  padding: 5px 82px 5px 8px;\n  margin-bottom: 2px;\n  overflow: hidden;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  cursor: pointer;\n  position: relative;\n  font-size: 13px;\n  font-weight: 600;\n  line-height: 1.5;\n  border-radius: 8px;\n}\n/* 标题下方的细分隔线，用于和引擎条目区分 */\n.sejtitle::after {\n  content: \"\";\n  position: absolute;\n  left: 8px;\n  right: 8px;\n  bottom: 0;\n  height: 1px;\n  background: var(--border-color-sej);\n  pointer-events: none;\n}\n#settingLayerMask [data-xin] {\n  margin: 1px 0;\n  border-radius: 8px;\n}\n.sejcon [data-xin] {\n  cursor: pointer;\n}\n/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */\n#settingLayerMask [data-iqxindisabled=\"true\"],\n[data-xin^=\"-\"] {\n  background-color: transparent;\n  color: var(--font-color-qxin);\n  transition: background-color 0.12s ease-out;\n}\n#settingLayerMask [data-iqxindisabled=\"true\"] > span,\n#settingLayerMask [data-iqxindisabled=\"true\"] .sej-engine-icon,\n[data-xin^=\"-\"] > .iqxin-pointer-events {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */\n.sej-category-hidden .sej-engine > span,\n.sej-category-hidden .sej-engine .sej-engine-icon,\n.sej-category-hidden .iqxin-additem {\n  opacity: 0.4;\n  filter: grayscale(1);\n}\n#settingLayerMask .sej-engine:hover {\n  background-color: var(--sej-surface-hover);\n}\n#settingLayerMask [data-iqxindisabled=\"true\"]:hover,\n[data-xin^=\"-\"]:hover {\n  background-color: transparent;\n}\n.sej-category-hidden .sej-engine:hover {\n  background-color: transparent;\n}\n#settingLayerMask label {\n  cursor: pointer;\n}\n#settingLayerMask .sej-engine-icon {\n  vertical-align: middle;\n}\n#btnEle {\n  position: relative;\n  width: 100%;\n  background: transparent;\n  border-radius: 0;\n  flex: 0 0 auto;\n}\n#btnEle {\n  margin-top: 10px;\n}\n#btnEle span {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: 6px;\n  box-sizing: border-box;\n  min-height: 30px;\n  background: var(--sej-surface-2);\n  border: 1px solid transparent;\n  margin: 0;\n  color: var(--font-color-qxin);\n  padding: 4px 10px;\n  border-radius: 8px;\n  font-size: 13px;\n  line-height: 1.3;\n  white-space: nowrap;\n  cursor: pointer;\n  outline: none;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out, opacity 0.12s ease-out, transform 0.1s ease-out;\n}\n#btnEle label {\n  display: inline-flex;\n  align-items: center;\n  gap: 6px;\n  color: inherit;\n}\n#btnEle .sej-language-select {\n  appearance: none;\n  -webkit-appearance: none;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 6px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  padding: 2px 4px;\n  margin-left: 2px;\n  cursor: pointer;\n  outline: none;\n}\n#btnEle .sej-language-select:focus-visible {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n#btnEle span:hover {\n  background: var(--sej-surface-hover);\n  color: var(--font-color-qxin);\n}\n#btnEle a {\n  color: var(--font-color-qxin);\n  opacity: 0.7;\n  text-decoration: none;\n  font-family: inherit;\n  transition: opacity 0.12s ease-out, color 0.12s ease-out,\n    transform 0.1s ease-out;\n}\n#btnEle a:hover {\n  opacity: 1;\n  color: var(--sej-accent);\n}\n#btnEle span:active,\n#btnEle a:active {\n  transform: scale(0.96);\n  opacity: 0.8;\n}\n#btnEle .feedback {\n  background: transparent;\n  border-color: transparent;\n  padding: 4px 6px;\n}\n#btnEle .feedback:hover {\n  background: transparent;\n  border-color: transparent;\n  color: var(--sej-accent);\n}\n#btnEle > div {\n  width: 100%;\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-start;\n  align-items: center;\n  gap: 8px;\n  box-sizing: border-box;\n}\n#btnEle > div.btnEleLayer {\n  flex-direction: column;\n  flex-wrap: nowrap;\n  align-items: stretch;\n  background: transparent;\n  border-radius: 0;\n  border-top: 1px solid var(--border-color-sej);\n  padding-top: 12px;\n  gap: 8px;\n}\n.sej-footer-options,\n.sej-footer-bar,\n.sej-footer-selects,\n.sej-footer-links,\n.sej-footer-actions {\n  display: flex;\n  align-items: center;\n  flex-wrap: wrap;\n  min-width: 0;\n}\n.sej-footer-options {\n  gap: 8px;\n}\n.sej-footer-bar {\n  gap: 8px 12px;\n}\n.sej-footer-selects {\n  gap: 8px;\n}\n.sej-footer-links {\n  gap: 0;\n  margin-left: auto;\n}\n.sej-footer-actions {\n  margin-left: 4px;\n}\n#btnEle #xin-save {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n#btnEle #xin-save:hover {\n  background: var(--sej-accent);\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n#btnEle #xin-save.sej-saving {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.sej-loading {\n  cursor: progress;\n  opacity: 0.6;\n  pointer-events: none;\n}\n#btnEle span.iqxin-btn-active {\n  background: var(--sej-accent-weak);\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"] {\n  appearance: none;\n  -webkit-appearance: none;\n  width: 16px;\n  height: 16px;\n  display: inline-block;\n  box-sizing: border-box;\n  vertical-align: -3px;\n  margin: 0 !important;\n  padding: 0;\n  position: relative;\n  border: 1.5px solid var(--sej-checkbox-border);\n  border-radius: 5px;\n  background: var(--sej-input-bg);\n  cursor: pointer;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out;\n}\n#settingLayerMask input[type=\"checkbox\"]:before {\n  content: none;\n}\n#settingLayerMask input[type=\"checkbox\"]:checked {\n  background: var(--sej-accent);\n  border-color: var(--sej-accent);\n}\n#settingLayerMask input[type=\"checkbox\"]:checked:after {\n  content: \"\";\n  position: absolute;\n  left: 4px;\n  top: 1px;\n  width: 4px;\n  height: 8px;\n  border: solid var(--sej-accent-contrast);\n  border-width: 0 2px 2px 0;\n  background: none;\n  transform: rotate(45deg);\n}\n.drop-over {\n  opacity: 0.6;\n}\n.iqxin-set-toggle {\n  opacity: 0.6;\n  position: absolute;\n  background: transparent;\n  /* 用上下外边距 auto 垂直居中，避免 transform 让按钮单独成为合成层 */\n  top: 0;\n  bottom: 0;\n  height: fit-content;\n  margin-top: auto;\n  margin-bottom: auto;\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n  transition: opacity 0.12s ease-out, background-color 0.12s ease-out,\n    color 0.12s ease-out;\n  right: 6px;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n}\n.iqxin-set-toggle svg {\n  display: block;\n}\n.iqxin-set-toggle.iqxin-set-hidden {\n  opacity: 0.35;\n}\n.iqxin-set-toggle:hover {\n  opacity: 1;\n  background: var(--sej-surface-hover);\n}\n/* 悬浮操作：右侧依次为编辑、删除、显隐按钮 */\n.sej-hover-edit,\n.sej-hover-delete {\n  position: absolute;\n  display: inline-flex;\n  align-items: center;\n  color: var(--font-color-qxin);\n  opacity: 0;\n  pointer-events: none;\n  transition: opacity 0.12s ease-out, background-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.sej-hover-edit {\n  top: 0;\n  bottom: 0;\n  right: 54px;\n  height: fit-content;\n  margin: auto 0;\n  padding: 3px;\n  border-radius: 6px;\n}\n.sej-hover-delete {\n  top: 0;\n  bottom: 0;\n  right: 30px;\n  height: fit-content;\n  margin: auto 0;\n  padding: 3px;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.sej-hover-edit svg,\n.sej-hover-delete svg {\n  display: block;\n}\n.sejtitle:hover .sej-hover-edit,\n#settingLayer .sejcon > .drag:hover > .sej-hover-edit {\n  opacity: 0.4;\n}\n.sejtitle:hover .sej-hover-delete,\n#settingLayer .sejcon > .drag:hover > .sej-hover-delete {\n  opacity: 0.8;\n  pointer-events: auto;\n}\n.sej-hover-delete:hover {\n  opacity: 1;\n  background: var(--sej-danger-weak, rgba(220, 53, 69, 0.12));\n  color: var(--sej-danger, #dc3545);\n}\nspan.iqxin-additem {\n  display: inline-block;\n  position: relative;\n  text-align: center;\n  width: 100%;\n  box-sizing: border-box;\n  margin: auto 0 2px;\n  padding: 5px 0;\n  border: 1px dashed currentColor;\n  border-radius: 8px;\n  color: var(--font-color-qxin);\n  opacity: 0.55;\n  cursor: pointer;\n  visibility: visible;\n  transition: opacity 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\nspan.iqxin-additem:hover {\n  opacity: 1;\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\nspan.iqxin-additem.sej-copy-target {\n  opacity: 1;\n  border-style: solid;\n  border-color: var(--sej-accent);\n  background: var(--sej-accent-weak);\n  color: var(--sej-accent);\n}\n.sej-copy-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  vertical-align: middle;\n  line-height: 1;\n}\n.sej-copy-icon svg {\n  display: block;\n  width: 14px;\n  height: 14px;\n}\n.sej-copy-hint {\n  position: absolute;\n  left: 50%;\n  bottom: calc(100% + 6px);\n  transform: translateX(-50%);\n  z-index: 5;\n  padding: 3px 8px;\n  border-radius: 6px;\n  background: rgba(20, 22, 26, 0.82);\n  color: #fff;\n  font-size: 12px;\n  line-height: 1.5;\n  white-space: nowrap;\n  pointer-events: none;\n}\n#newSearchListBox,\n#newSearchBox,\n.sej-dialog-box {\n  position: fixed;\n  z-index: 200000100;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  width: min(400px, calc(100vw - 32px));\n  box-sizing: border-box;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n  margin: 0;\n  transition: opacity 0.14s ease-out, transform 0.14s ease-out;\n}\n.sej-dialog-title {\n  font-size: 15px;\n  font-weight: 600;\n  margin-bottom: 16px;\n}\n.sej-field {\n  display: flex;\n  flex-direction: column;\n  gap: 6px;\n  margin-bottom: 12px;\n  font-size: 12px;\n}\n.sej-field > span {\n  opacity: 0.65;\n}\n.sej-field-row {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n}\n.sej-field-row input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-icon-preview-btn {\n  flex: 0 0 auto;\n  padding: 7px 12px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  background: var(--sej-btn-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 12px;\n  line-height: 1.4;\n  cursor: pointer;\n  transition: border-color 0.12s ease-out, color 0.12s ease-out;\n}\n.sej-icon-preview-btn:hover:not(:disabled) {\n  border-color: var(--sej-accent);\n  color: var(--sej-accent);\n}\n.sej-icon-preview-btn:disabled {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n/* 已有图标时按钮只显示缩略图 */\n.sej-icon-preview-btn.sej-has-icon {\n  box-sizing: border-box;\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 32px;\n  height: 32px;\n  padding: 0;\n}\n.sej-icon-preview {\n  flex: 0 0 auto;\n  width: 20px;\n  height: 20px;\n  object-fit: contain;\n  border-radius: 4px;\n  background: var(--sej-surface-hover);\n}\n.sej-data-line {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  min-width: 0;\n}\n.sej-data-line input {\n  flex: 1 1 0;\n  width: auto;\n  min-width: 0;\n}\n.sej-file-input {\n  display: none;\n}\n/* 图标获取来源列表 */\n.sej-preview-steps {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n  padding: 6px 8px;\n  border-radius: 8px;\n  background: var(--sej-surface-2);\n  font-size: 12px;\n}\n.sej-preview-step {\n  display: flex;\n  align-items: center;\n  gap: 6px;\n  line-height: 18px;\n  color: var(--font-color-qxin);\n}\n.sej-preview-dot {\n  flex: 0 0 auto;\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: var(--sej-checkbox-border);\n}\n.sej-preview-step.is-loading .sej-preview-dot {\n  background: var(--sej-accent);\n}\n.sej-preview-step.is-ok .sej-preview-dot {\n  background: #34a853;\n}\n.sej-preview-step.is-failed .sej-preview-dot {\n  background: var(--sej-danger);\n}\n.sej-preview-step.is-failed,\n.sej-preview-step.is-pending,\n.sej-preview-step.is-canceled {\n  opacity: 0.6;\n}\n.sej-preview-url {\n  flex: 1 1 auto;\n  min-width: 0;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.sej-preview-state {\n  flex: 0 0 auto;\n  opacity: 0.7;\n}\n.sej-preview-extractor {\n  align-self: flex-start;\n  margin-top: 2px;\n  color: var(--sej-accent);\n  font-size: 12px;\n  text-decoration: none;\n}\n.sej-preview-extractor:hover {\n  text-decoration: underline;\n}\n.sej-field-inline {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 13px;\n  cursor: pointer;\n}\n.sej-dialog-actions {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: flex-end;\n  gap: 8px;\n  margin-top: 16px;\n}\n#newSearchListBox input,\n#newSearchBox input,\n.sej-dialog-box input {\n  width: 100%;\n  box-sizing: border-box;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  border-radius: 8px;\n  outline: none;\n  color: var(--font-color-qxin);\n  background: var(--sej-input-bg);\n  font-family: inherit;\n  font-size: 13px;\n  transition: border-color 0.12s ease-out, box-shadow 0.12s ease-out;\n}\n#newSearchBox #iqxin-newTarget {\n  width: 100%;\n  border-radius: 8px;\n  border: 1px solid var(--border-color-sej);\n  padding: 7px 9px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  outline: none;\n}\n.iqxin-help-link {\n  color: var(--font-color-qxin);\n  opacity: 0.6;\n}\n#newSearchListBox input:focus,\n#newSearchBox input:focus,\n.sej-dialog-box input:focus {\n  background: var(--sej-input-bg);\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n.addItemBoxBtn {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n.addItemBoxBtn:hover {\n  background: var(--sej-surface-hover);\n}\n.sej-dialog-danger {\n  margin-right: auto;\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n.sej-dialog-danger:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n.iqxin-closeBtn,\n.iqxin-enterBtn {\n  box-sizing: border-box;\n}\n.iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  font-weight: 600;\n}\n.iqxin-enterBtn:hover {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n  opacity: 0.85;\n}\n.iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  z-index: 200000100;\n  width: min(560px, calc(100vw - 32px));\n  max-height: calc(100vh - 48px);\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n  padding: 20px;\n  background: var(--background-setting-qxin);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 14px;\n  box-shadow: var(--sej-shadow-menu);\n  color: var(--font-color-qxin);\n}\n#iqxin-editCodeBox p {\n  margin: 0;\n}\n#iqxin-editCodeBox button {\n  cursor: pointer;\n  background: var(--sej-btn-bg);\n  border: 1px solid var(--border-color-sej);\n  border-radius: 8px;\n  padding: 6px 14px;\n  color: var(--font-color-qxin);\n  font-family: inherit;\n  font-size: 13px;\n  transition: background-color 0.12s ease-out, border-color 0.12s ease-out,\n    color 0.12s ease-out;\n}\n#iqxin-editCodeBox button:hover {\n  background: var(--sej-surface-hover);\n}\n#iqxin-editCodeBox .iqxin-enterBtn {\n  background: var(--sej-accent);\n  border-color: transparent;\n  color: var(--sej-accent-contrast);\n}\n#iqxin-editCodeBox .iqxin-closeBtn:hover {\n  background: var(--sej-danger-weak);\n  border-color: var(--sej-danger);\n  color: var(--sej-danger);\n}\n#iqxin-editCodeBox textarea {\n  width: 100%;\n  box-sizing: border-box;\n  flex: 1 1 auto;\n  min-height: 240px;\n  padding: 10px;\n  overflow: auto;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 10px;\n  background: var(--sej-input-bg);\n  color: var(--font-color-qxin);\n  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;\n  font-size: 12px;\n  line-height: 1.5;\n  resize: vertical;\n  outline: none;\n}\n#iqxin-editCodeBox textarea:focus {\n  border-color: var(--sej-accent);\n  box-shadow: 0 0 0 3px var(--sej-focus-ring);\n}\n.iqxin-warning {\n  color: var(--sej-danger);\n  font-size: 14px;\n  font-weight: 600;\n}\n#importingBox {\n  position: fixed;\n  width: min(350px, calc(100vw - 32px));\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n  padding: 16px 24px;\n  border: 1px solid var(--border-color-sej);\n  border-radius: 12px;\n  background: var(--background-setting-qxin);\n  color: var(--font-color-qxin);\n}\n#importingBox li {\n  margin: 5px;\n  border-bottom: 1px solid var(--border-color-sej);\n}\n#importingBox li p {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  margin-top: 0;\n  margin-bottom: 0;\n}\n.xin-importing-item {\n  cursor: pointer;\n}\n#setBtn {\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  width: 30px;\n  height: 30px;\n  flex: 0 0 auto;\n  padding: 0;\n  border-radius: 8px;\n  align-items: center;\n  justify-content: center;\n  cursor: pointer;\n  display: flex;\n  opacity: 0.65;\n}\nspan#setBtn:hover {\n  opacity: 1;\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\nspan#setBtn:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#setBtn svg {\n  width: 16px;\n  height: 16px;\n  display: block;\n}\n#setBtn:focus-visible {\n  opacity: 1;\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n#sej-container {\n  display: flex;\n  align-items: center;\n  position: relative;\n  z-index: 2;\n  padding: 2px;\n  gap: 2px;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  transform-origin: top center;\n  animation: sejopen 0.14s ease-out;\n  color: var(--font-color-qxin);\n  background: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  width: max-content !important;\n  max-width: 100%;\n  box-sizing: border-box;\n  border-radius: var(--sej-radius-bar, 12px);\n  border: 1px solid var(--border-color-sej);\n  overflow: auto;\n  box-shadow: var(\n    --sej-shadow-bar,\n    0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)\n  );\n  height: fit-content;\n  flex-wrap: wrap;\n  justify-content: center;\n  user-select: none;\n}\n/* 给用户的提示 */\n#iqixn-global-tip {\n  box-sizing: content-box !important;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  opacity: 0;\n  height: 25px;\n  line-height: 25px;\n  letter-spacing: 1px;\n  font-size: 14px;\n  color: #fff;\n  padding: 5px 20px;\n  border-radius: 8px;\n  background-color: #666;\n  position: fixed;\n  z-index: 200000001;\n  left: 50%;\n  bottom: 5%;\n  transform: translate(-50%);\n  pointer-events: none;\n  transition: opacity 0.15s ease-out;\n}\n#iqixn-global-tip.sej-toast-visible {\n  pointer-events: auto;\n}\n#iqixn-global-tip .sej-toast-action {\n  pointer-events: auto;\n  border: none;\n  border-radius: 6px;\n  padding: 2px 10px;\n  background: rgba(255, 255, 255, 0.2);\n  color: #fff;\n  font: inherit;\n  letter-spacing: inherit;\n  line-height: 20px;\n  cursor: pointer;\n  transition: background-color 0.12s ease-out;\n}\n#iqixn-global-tip .sej-toast-action:hover {\n  background: rgba(255, 255, 255, 0.34);\n}\n/* 夜间模式 - 默认主题变量 */\n:root,\n:host,\nbody {\n  --font-color-qxin: #333;\n  --background-color-qxin: #fffffff0;\n  --background-avtive-color-qxin: #ccc;\n  --background-active-enable-qxin: #cff9ff;\n  --background-active-disable-qxin: #ffa2a2;\n  --background-hover-color-qxin: #eaeaea;\n  --trigger-shown-qxin: #f1f3f4 !important;\n  --background-btn-qxin: #eff4f8;\n  --background-setting-qxin: #fff;\n  --box-shadow-color-sej: hsla(0, 0%, 0%, 7%);\n  --border-color-sej: #e1e6ea;\n\n  /* 跳转条现代化外观 */\n  --sej-font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\",\n    \"PingFang SC\", \"Hiragino Sans GB\", \"Microsoft YaHei\", sans-serif;\n  --sej-bar-bg: rgba(255, 255, 255, 0.88);\n  --sej-hover-bg: rgba(0, 0, 0, 0.055);\n  --sej-active-bg: rgba(0, 0, 0, 0.1);\n  --sej-accent: #4285f4;\n  --sej-accent-weak: rgba(66, 133, 244, 0.12);\n  --sej-radius-bar: 12px;\n  --sej-radius-item: 8px;\n  --sej-radius-menu: 12px;\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.06),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.35);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3);\n\n  /* 设置面板 */\n  --sej-surface-2: rgba(0, 0, 0, 0.025);\n  --sej-surface-hover: rgba(0, 0, 0, 0.06);\n  --sej-input-bg: #fff;\n  --sej-btn-bg: #fff;\n  --sej-checkbox-border: #cfd5dd;\n  --sej-focus-ring: rgba(66, 133, 244, 0.22);\n  --sej-accent-contrast: #fff;\n  --sej-danger: #d93025;\n  --sej-danger-weak: rgba(217, 48, 37, 0.1);\n  --sej-panel-shadow: 0 24px 64px -24px hsla(0, 0%, 0%, 0.45),\n    0 2px 8px hsla(0, 0%, 0%, 0.06);\n}\n/* 暗黑模式变量 - 当主文档是暗黑模式时 */\n:root[qxintheme=\"dark\"],\n:host[qxintheme=\"dark\"],\nbody[qxintheme=\"dark\"] {\n  --font-color-qxin: #bdc1bc;\n  --background-color-qxin: #202124f0;\n  --background-avtive-color-qxin: #424242;\n  --background-active-enable-qxin: #274144;\n  --background-active-disable-qxin: #583535;\n  --background-hover-color-qxin: #424242;\n  --trigger-shown-qxin: #3c4043 !important;\n  --background-btn-qxin: #292f36;\n  --background-setting-qxin: #202124;\n  --box-shadow-color-sej: hsla(0, 0%, 70%, 10%);\n  --border-color-sej: #3b4547;\n\n  --sej-bar-bg: rgba(32, 33, 36, 0.9);\n  --sej-hover-bg: rgba(255, 255, 255, 0.09);\n  --sej-active-bg: rgba(255, 255, 255, 0.14);\n  --sej-accent: #8ab4f8;\n  --sej-accent-weak: rgba(138, 180, 248, 0.18);\n  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5),\n    0 8px 24px -12px hsla(0, 0%, 0%, 0.8);\n  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.85);\n\n  --sej-surface-2: rgba(255, 255, 255, 0.045);\n  --sej-surface-hover: rgba(255, 255, 255, 0.09);\n  --sej-input-bg: #17181a;\n  --sej-btn-bg: rgba(255, 255, 255, 0.04);\n  --sej-checkbox-border: #4a5459;\n  --sej-focus-ring: rgba(138, 180, 248, 0.3);\n  --sej-accent-contrast: #202124;\n  --sej-danger: #f28b82;\n  --sej-danger-weak: rgba(242, 139, 130, 0.14);\n  --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85),\n    0 2px 8px hsla(0, 0%, 0%, 0.5);\n}\n/* 滑词搜索样式 */\n#sej-container.selectSearch {\n  position: fixed;\n  top: 2px;\n  left: 0;\n  right: 0;\n  z-index: 99999999;\n  margin: 0 auto;\n  transform: translateY(calc(-100% - 10px));\n  visibility: hidden;\n  pointer-events: none;\n  transition: transform 0.3s, visibility 0s linear 0.3s;\n}\n#sej-container.selectSearch.sej-select-visible {\n  transform: none;\n  visibility: visible;\n  pointer-events: auto;\n  transition: transform 0.3s, visibility 0s linear 0s;\n}\n#sej-expanded-category {\n  font-weight: bold;\n}\n.sej-category {\n  display: inline-flex;\n  align-items: center;\n  position: relative;\n}\n.sej-category-search-icon {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  border-radius: 4px;\n  color: var(--font-color-qxin);\n  cursor: pointer;\n  transition: background-color 0.08s ease-out, color 0.08s ease-out;\n}\n.sej-category-search-icon svg {\n  width: 14px;\n  height: 14px;\n  fill: none;\n  stroke: currentColor;\n  stroke-width: 1.8;\n  stroke-linecap: round;\n  stroke-linejoin: round;\n}\n.sej-category-search-icon:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n  color: var(--sej-accent, #4285f4);\n}\n.sej-category-search-icon:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n.sej-category-search-icon:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-category-title {\n  font-weight: 600;\n  padding: 0 12px;\n  opacity: 0.8;\n}\n.sej-engine {\n  padding: 0 13px;\n  transition: background-color 0.08s ease-out, opacity 0.08s ease-out;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  display: inline-flex;\n  gap: 8px;\n  align-items: center;\n  height: 2.6em;\n  box-sizing: border-box;\n  text-decoration: none !important;\n  color: var(--font-color-qxin) !important;\n  cursor: pointer;\n  white-space: nowrap;\n}\n#sej-container > .sej-engine,\n#sej-container .sej-category > .sej-engine {\n  height: 30px;\n  padding: 0 11px;\n  gap: 6px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 500;\n}\n.sej-drop-list a:visited,\n.sej-drop-list a:hover,\n.sej-engine a:visited,\n.sej-engine a:hover,\n#sej-container a:link,\n#sej-container a:visited,\n#sej-container a:hover {\n  color: var(--font-color-qxin);\n}\n.sej-engine:hover {\n  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));\n}\n.sej-engine:active {\n  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));\n}\n#sej-container .sej-engine:focus-visible {\n  outline: 2px solid var(--sej-accent, #4285f4);\n  outline-offset: -2px;\n}\n.sej-engine.sej-drop-list-trigger-shown {\n  background-color: var(--trigger-shown-qxin);\n}\n.sej-drop-list > .sej-engine {\n  display: flex;\n  justify-content: flex-start;\n  width: 100%;\n  height: 30px;\n  padding: 0 10px;\n  gap: 8px;\n  border-radius: var(--sej-radius-item, 8px);\n  font-weight: 400;\n}\n.sej-drop-list > .sej-engine + .sej-engine {\n  margin-top: 1px;\n}\n\n.sej-engine-icon {\n  width: 16px;\n  height: 16px;\n  flex: 0 0 auto;\n  object-fit: cover;\n  display: inline-block;\n  margin: 0;\n}\n.sej-engine-icon:not([src]) {\n  display: none;\n}\n\n.sej-drop-list {\n  /* 使用 fixed 定位确保在 Shadow DOM 中位置正确 */\n  position: fixed;\n  display: none;\n  opacity: 0.2;\n  top: -10000px;\n  left: 0;\n  min-width: 128px;\n  padding: 6px;\n  box-sizing: border-box;\n  text-align: left;\n  font-size: 13px;\n  font-family: var(--sej-font-family);\n  -webkit-font-smoothing: antialiased;\n  box-shadow: var(\n    --sej-shadow-menu,\n    0 2px 6px hsla(0, 0%, 0%, 0.06),\n    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)\n  );\n  background-color: var(--sej-bar-bg, var(--background-color-qxin));\n  backdrop-filter: blur(20px) saturate(180%);\n  transition: opacity 0.08s ease-out;\n  animation: sej-drop-menu-in 0.1s ease-out;\n  overflow: hidden;\n  border-radius: var(--sej-radius-menu, 12px);\n  border: 1px solid var(--border-color-sej);\n  user-select: none;\n}\n@keyframes sej-drop-menu-in {\n  from {\n    opacity: 0;\n    transform: translateY(-4px) scale(0.98);\n  }\n}\n@keyframes sej-setting-mask-in {\n  from {\n    opacity: 0;\n  }\n}\n@keyframes sejopen {\n  0% {\n    transform: translateY(-4px) scale(0.98);\n    opacity: 0;\n  }\n  100% {\n    transform: none;\n    opacity: 1;\n  }\n}\n@keyframes iqxinsejopen {\n  0% {\n    transform: scale(0.01, 0.01);\n    opacity: 0;\n  }\n  100% {\n    transform: scale(1, 1);\n    opacity: 1;\n  }\n}\n\n/* ---------- Vue 重构版设置面板布局优化 ---------- */\n#settingLayerMask {\n  padding: 20px;\n  box-sizing: border-box;\n}\n\n#sej-settings-body {\n  display: flex;\n  flex: 1 1 auto;\n  flex-wrap: wrap;\n  align-content: flex-start;\n  gap: 10px;\n  min-height: 0;\n  overflow-y: auto;\n  overflow-x: hidden;\n  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */\n  margin-top: 0;\n  margin-right: calc(var(--sej-panel-pad-x) * -1);\n  padding-top: 2px;\n  padding-right: var(--sej-panel-pad-x);\n  padding-bottom: 4px;\n}\n#sej-settings-body::-webkit-scrollbar {\n  width: 8px;\n}\n#sej-settings-body::-webkit-scrollbar-thumb {\n  background: var(--sej-surface-hover);\n  border-radius: 4px;\n}\n#settingLayer #btnEle {\n  flex: 0 0 auto;\n}\n\n@media (max-width: 780px) {\n  #btnEle span {\n    font-size: 12px;\n    padding: 5px 8px;\n  }\n  #settingLayer {\n    --sej-panel-pad-x: 12px;\n    min-width: calc(100vw - 16px);\n    max-width: calc(100vw - 16px);\n    max-height: calc(100vh - 16px);\n  }\n}\n\n@media (max-width: 560px) {\n  .iqxin-items {\n    flex: 1 1 160px;\n    width: auto;\n    max-width: none;\n  }\n}\n";
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
		try {
			if ((getComputedStyle(html).colorScheme || "").split(/\s+/).includes("dark")) return true;
		} catch (e) {}
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
	var darkStyleSheet = null;
	var darkStyleEl = null;
	var darkStyleRoot = null;
	var darkStyleState = null;
	function ensureStyleNode() {
		const root = getRoot();
		if (root === darkStyleRoot && (darkStyleSheet || darkStyleEl)) return;
		darkStyleRoot = root;
		darkStyleSheet = null;
		darkStyleEl = null;
		if (typeof CSSStyleSheet !== "undefined" && typeof ShadowRoot !== "undefined" && "replaceSync" in CSSStyleSheet.prototype && "adoptedStyleSheets" in ShadowRoot.prototype) try {
			darkStyleSheet = new CSSStyleSheet();
			darkStyleSheet.replaceSync("");
			root.adoptedStyleSheets = [...root.adoptedStyleSheets, darkStyleSheet];
			return;
		} catch (e) {
			darkStyleSheet = null;
		}
		darkStyleEl = document.createElement("style");
		darkStyleEl.id = "sej-dark-mode-style";
		const nonce = getCSPNonce();
		if (nonce) darkStyleEl.setAttribute("nonce", nonce);
		root.appendChild(darkStyleEl);
	}
	function setDarkStyle(enabled) {
		if (!(getRoot() !== darkStyleRoot || !darkStyleSheet && !darkStyleEl) && darkStyleState === enabled) return;
		ensureStyleNode();
		const cssText = enabled ? DARK_MODE_STYLE : "";
		if (darkStyleSheet) darkStyleSheet.replaceSync(cssText);
		else if (darkStyleEl) darkStyleEl.textContent = cssText;
		darkStyleState = enabled;
	}
	function applyDarkModeIfNeeded() {
		setDarkStyle(isDarkMode());
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
			const observe = (el) => {
				if (el) observer.observe(el, {
					attributes: true,
					attributeFilter: [
						"class",
						"style",
						"theme",
						"data-theme",
						"data-color-scheme",
						"data-color-mode"
					]
				});
			};
			observe(document.documentElement);
			observe(document.body);
			document.addEventListener("DOMContentLoaded", () => {
				observe(document.body);
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
				registerMenu(t("menu.settings"), openSettingPanel);
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
		showToast(t("toast.syncedFromOtherPages"));
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
