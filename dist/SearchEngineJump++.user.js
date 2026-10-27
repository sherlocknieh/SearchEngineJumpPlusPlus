// ==UserScript==
// @name               SearchEngineJump++
// @namespace          https://github.com/sherlocknieh/
// @version            2026.10.27.71
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
// @grant              GM_setValue
// @grant              GM_xmlhttpRequest
// @grant              window.onurlchange
// @noframes
// ==/UserScript==

(function(){"use strict";var e=Object.defineProperty,t=(t,n)=>{let r={};for(var i in t)e(r,i,{get:t[i],enumerable:!0});return n||e(r,Symbol.toStringTag,{value:`Module`}),r},n=null;function r(e){n=e}function i(){n&&n()}function a(e){let t=Object.create(null);for(let n of e.split(`,`))t[n]=1;return e=>e in t}var o={},s=[],c=()=>{},l=()=>!1,u=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&(e.charCodeAt(2)>122||e.charCodeAt(2)<97),d=e=>e.startsWith(`onUpdate:`),f=Object.assign,p=(e,t)=>{let n=e.indexOf(t);n>-1&&e.splice(n,1)},m=Object.prototype.hasOwnProperty,h=(e,t)=>m.call(e,t),g=Array.isArray,_=e=>E(e)===`[object Map]`,v=e=>E(e)===`[object Set]`,y=e=>E(e)===`[object Date]`,b=e=>typeof e==`function`,x=e=>typeof e==`string`,S=e=>typeof e==`symbol`,C=e=>typeof e==`object`&&!!e,w=e=>(C(e)||b(e))&&b(e.then)&&b(e.catch),T=Object.prototype.toString,E=e=>T.call(e),D=e=>E(e).slice(8,-1),O=e=>E(e)===`[object Object]`,k=e=>x(e)&&e!==`NaN`&&e[0]!==`-`&&``+parseInt(e,10)===e,A=a(`,key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted`),j=e=>{let t=Object.create(null);return(n=>t[n]||(t[n]=e(n)))},ee=/-\w/g,M=j(e=>e.replace(ee,e=>e.slice(1).toUpperCase())),te=/\B([A-Z])/g,N=j(e=>e.replace(te,`-$1`).toLowerCase()),ne=j(e=>e.charAt(0).toUpperCase()+e.slice(1)),re=j(e=>e?`on${ne(e)}`:``),P=(e,t)=>!Object.is(e,t),ie=(e,...t)=>{for(let n=0;n<e.length;n++)e[n](...t)},ae=(e,t,n,r=!1)=>{Object.defineProperty(e,t,{configurable:!0,enumerable:!1,writable:r,value:n})},oe=e=>{let t=parseFloat(e);return isNaN(t)?e:t},se,ce=()=>se||=typeof globalThis<`u`?globalThis:typeof self<`u`?self:typeof window<`u`?window:typeof global<`u`?global:{};function F(e){if(g(e)){let t={};for(let n=0;n<e.length;n++){let r=e[n],i=x(r)?fe(r):F(r);if(i)for(let e in i)t[e]=i[e]}return t}if(x(e)||C(e))return e}var le=/;(?![^(]*\))/g,ue=/:([^]+)/,de=/"(?:[^"\\]|\\[^])*"|'(?:[^'\\]|\\[^])*'|\\[^]|\/\*[^]*?\*\//g;function fe(e){let t={};return e.replace(de,e=>e.startsWith(`/*`)?``:e).split(le).forEach(e=>{if(e){let n=e.split(ue);n.length>1&&(t[n[0].trim()]=n[1].trim())}}),t}function I(e){let t=``;if(x(e))t=e;else if(g(e))for(let n=0;n<e.length;n++){let r=I(e[n]);r&&(t+=r+` `)}else if(C(e))for(let n in e)e[n]&&(t+=n+` `);return t.trim()}var pe=a(`itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,playsinline,readonly`);function me(e){return!!e||e===``}function he(e,t,n){if(e.length!==t.length)return!1;let r=!0;for(let i=0;r&&i<e.length;i++)r=ye(e[i],t[i],n);return r}function ge(e,t,n){if(e.size!==t.size)return!1;let r=Array.from(t),i=new Uint8Array(r.length);for(let t of e){let e=-1;for(let a=0;a<r.length;a++)if(!i[a]&&ye(t,r[a],n)){e=a;break}if(e<0)return!1;i[e]=1}return!0}function _e(e,t,n){let r=_(e),i=_(t);if(r||i||(r=v(e),i=v(t),r||i))return r&&i?ge(e,t,n):!1;if(Object.keys(e).length!==Object.keys(t).length)return!1;for(let r in e){let i=e.hasOwnProperty(r),a=t.hasOwnProperty(r);if(i&&!a||!i&&a||!ye(e[r],t[r],n))return!1}return String(e)===String(t)}function ve(e,t,n,r){n||=[new Map,new Map];let[i,a]=n;if(i.has(e)||a.has(t))return i.get(e)===t&&a.get(t)===e;i.set(e,t),a.set(t,e);let o=r(e,t,n);return i.delete(e),a.delete(t),o}function ye(e,t,n){if(e===t)return!0;let r=y(e),i=y(t);return r||i?r&&i?e.getTime()===t.getTime():!1:(r=S(e),i=S(t),r||i?e===t:(r=g(e),i=g(t),r||i?r&&i?ve(e,t,n,he):!1:(r=C(e),i=C(t),r||i?!r||!i?!1:ve(e,t,n,_e):String(e)===String(t))))}function be(e,t){return e.findIndex(e=>ye(e,t))}var xe=e=>!!(e&&e.__v_isRef===!0),L=e=>x(e)?e:e==null?``:g(e)||C(e)&&(e.toString===T||!b(e.toString))?xe(e)?L(e.value):JSON.stringify(e,Se,2):String(e),Se=(e,t)=>xe(t)?Se(e,t.value):_(t)?{[`Map(${t.size})`]:[...t.entries()].reduce((e,[t,n],r)=>(e[Ce(t,r)+` =>`]=n,e),{})}:v(t)?{[`Set(${t.size})`]:[...t.values()].map(e=>Ce(e))}:S(t)?Ce(t):C(t)&&!g(t)&&!O(t)?String(t):t,Ce=(e,t=``)=>S(e)?`Symbol(${e.description??t})`:e,R,we=class{constructor(e=!1){this.detached=e,this._active=!0,this._on=0,this.effects=[],this.cleanups=[],this._isPaused=!1,this._warnOnRun=!0,this.__v_skip=!0,!e&&R&&(R.active?(this.parent=R,this.index=(R.scopes||(R.scopes=[])).push(this)-1):(this._active=!1,this._warnOnRun=!1))}get active(){return this._active}pause(){if(this._active){this._isPaused=!0;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].pause()}for(e=0,t=this.effects.length;e<t;e++)this.effects[e].pause()}}resume(){if(this._active&&this._isPaused){this._isPaused=!1;let e,t;if(this.scopes){let n=this.scopes.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}let n=this.effects.slice();for(e=0,t=n.length;e<t;e++)n[e].resume()}}run(e){if(this._active){let t=R;try{return R=this,e()}finally{R=t}}}on(){++this._on===1&&(this.prevScope=R,R=this)}off(){if(this._on>0&&--this._on===0){if(R===this)R=this.prevScope;else{let e=R;for(;e;){if(e.prevScope===this){e.prevScope=this.prevScope;break}e=e.prevScope}}this.prevScope=void 0}}stop(e){if(this._active){this._active=!1;let t,n;for(t=0,n=this.effects.length;t<n;t++)this.effects[t].stop();for(this.effects.length=0,t=0,n=this.cleanups.length;t<n;t++)this.cleanups[t]();if(this.cleanups.length=0,this.scopes){let e=this.scopes.slice();for(t=0,n=e.length;t<n;t++)e[t].stop(!0);this.scopes.length=0}if(!this.detached&&this.parent&&!e){let e=this.parent.scopes.pop();e&&e!==this&&(this.parent.scopes[this.index]=e,e.index=this.index)}this.parent=void 0}}};function Te(){return R}var z,Ee=new WeakSet,De=class{constructor(e){this.fn=e,this.deps=void 0,this.depsTail=void 0,this.flags=5,this.next=void 0,this.cleanup=void 0,this.scheduler=void 0,R&&(R.active?R.effects.push(this):this.flags&=-2)}pause(){this.flags|=64}resume(){this.flags&64&&(this.flags&=-65,Ee.has(this)&&(Ee.delete(this),this.trigger()))}notify(){this.flags&2&&!(this.flags&32)||this.flags&8||je(this)}run(){if(!(this.flags&1))return this.fn();this.flags|=2,We(this),Pe(this);let e=z,t=Be;z=this,Be=!0;try{return this.fn()}finally{Fe(this),z=e,Be=t,this.flags&=-3}}stop(){if(this.flags&1){for(let e=this.deps;e;e=e.nextDep)Re(e);this.deps=this.depsTail=void 0,We(this),this.onStop&&this.onStop(),this.flags&=-2}}trigger(){this.flags&64?Ee.add(this):this.scheduler?this.scheduler():this.runIfDirty()}runIfDirty(){Ie(this)&&this.run()}get dirty(){return Ie(this)}},Oe=0,ke,Ae;function je(e,t=!1){e.flags|=8,t?(e.next=Ae,Ae=e):(e.next=ke,ke=e)}function Me(){Oe++}function Ne(){if(--Oe>0)return;if(Ae){let e=Ae;for(Ae=void 0;e;){let t=e.next;e.next=void 0,e.flags&=-9,e=t}}let e;for(;ke;){let t=ke;for(ke=void 0;t;){let n=t.next;if(t.next=void 0,t.flags&=-9,t.flags&1)try{t.trigger()}catch(t){e||=t}t=n}}if(e)throw e}function Pe(e){for(let t=e.deps;t;t=t.nextDep)t.version=-1,t.prevActiveLink=t.dep.activeLink,t.dep.activeLink=t}function Fe(e){let t,n=e.depsTail,r=n;for(;r;){let e=r.prevDep;r.version===-1?(r===n&&(n=e),Re(r),ze(r)):t=r,r.dep.activeLink=r.prevActiveLink,r.prevActiveLink=void 0,r=e}e.deps=t,e.depsTail=n}function Ie(e){for(let t=e.deps;t;t=t.nextDep)if(t.dep.version!==t.version||t.dep.computed&&(Le(t.dep.computed)||t.dep.version!==t.version))return!0;return!!e._dirty}function Le(e){if(e.flags&4&&!(e.flags&16)||(e.flags&=-17,e.globalVersion===Ge)||(e.globalVersion=Ge,!e.isSSR&&e.flags&128&&(!e.deps&&!e._dirty||!Ie(e))))return;e.flags|=2;let t=e.dep,n=z,r=Be;z=e,Be=!0;try{Pe(e);let n=e.fn(e._value);(t.version===0||P(n,e._value))&&(e.flags|=128,e._value=n,t.version++)}catch(e){throw t.version++,e}finally{z=n,Be=r,Fe(e),e.flags&=-3}}function Re(e,t=!1){let{dep:n,prevSub:r,nextSub:i}=e;if(r&&(r.nextSub=i,e.prevSub=void 0),i&&(i.prevSub=r,e.nextSub=void 0),n.subs===e&&(n.subs=r,!r&&n.computed)){n.computed.flags&=-5;for(let e=n.computed.deps;e;e=e.nextDep)Re(e,!0)}!t&&!--n.sc&&n.map&&n.map.delete(n.key)}function ze(e){let{prevDep:t,nextDep:n}=e;t&&(t.nextDep=n,e.prevDep=void 0),n&&(n.prevDep=t,e.nextDep=void 0)}var Be=!0,Ve=[];function He(){Ve.push(Be),Be=!1}function Ue(){let e=Ve.pop();Be=e===void 0||e}function We(e){let{cleanup:t}=e;if(e.cleanup=void 0,t){let e=z;z=void 0;try{t()}finally{z=e}}}var Ge=0,Ke=class{constructor(e,t){this.sub=e,this.dep=t,this.version=t.version,this.nextDep=this.prevDep=this.nextSub=this.prevSub=this.prevActiveLink=void 0}},qe=class{constructor(e){this.computed=e,this.version=0,this.activeLink=void 0,this.subs=void 0,this.map=void 0,this.key=void 0,this.sc=0,this.__v_skip=!0}track(e){if(!z||!Be||z===this.computed)return;let t=this.activeLink;if(t===void 0||t.sub!==z)t=this.activeLink=new Ke(z,this),z.deps?(t.prevDep=z.depsTail,z.depsTail.nextDep=t,z.depsTail=t):z.deps=z.depsTail=t,Je(t);else if(t.version===-1&&(t.version=this.version,t.nextDep)){let e=t.nextDep;e.prevDep=t.prevDep,t.prevDep&&(t.prevDep.nextDep=e),t.prevDep=z.depsTail,t.nextDep=void 0,z.depsTail.nextDep=t,z.depsTail=t,z.deps===t&&(z.deps=e)}return t}trigger(e){this.version++,Ge++,this.notify(e)}notify(e){Me();try{for(let e=this.subs;e;e=e.prevSub)e.sub.notify()&&e.sub.dep.notify()}finally{Ne()}}};function Je(e){if(e.dep.sc++,e.sub.flags&4){let t=e.dep.computed;if(t&&!e.dep.subs){t.flags|=20;for(let e=t.deps;e;e=e.nextDep)Je(e)}let n=e.dep.subs;n!==e&&(e.prevSub=n,n&&(n.nextSub=e)),e.dep.subs=e}}var Ye=new WeakMap,Xe=Symbol(``),Ze=Symbol(``),Qe=Symbol(``);function $e(e,t,n){if(Be&&z){let t=Ye.get(e);t||Ye.set(e,t=new Map);let r=t.get(n);r||(t.set(n,r=new qe),r.map=t,r.key=n),r.track()}}function et(e,t,n,r,i,a){let o=Ye.get(e);if(!o){Ge++;return}let s=e=>{e&&e.trigger()};if(Me(),t===`clear`)o.forEach(s);else{let i=g(e),a=i&&k(n);if(i&&n===`length`){let e=Number(r);o.forEach((t,n)=>{(n===`length`||n===Qe||!S(n)&&n>=e)&&s(t)})}else switch((n!==void 0||o.has(void 0))&&s(o.get(n)),a&&s(o.get(Qe)),t){case`add`:i?a&&s(o.get(`length`)):(s(o.get(Xe)),_(e)&&s(o.get(Ze)));break;case`delete`:i||(s(o.get(Xe)),_(e)&&s(o.get(Ze)));break;case`set`:_(e)&&s(o.get(Xe))}}Ne()}function tt(e){let t=B(e);return t===e||($e(t,`iterate`,Qe),Vt(e))?t:Bt(e)?zt(e)?t.map(e=>Gt(Wt(e))):t.map(Gt):t.map(Wt)}function nt(e){return $e(e=B(e),`iterate`,Qe),e}function rt(e,t){return Bt(e)?Gt(zt(e)?Wt(t):t):Wt(t)}var it={__proto__:null,[Symbol.iterator](){return at(this,Symbol.iterator,e=>rt(this,e))},concat(...e){return tt(this).concat(...e.map(e=>g(e)?tt(e):e))},entries(){return at(this,`entries`,e=>(e[1]=rt(this,e[1]),e))},every(e,t){return ct(this,`every`,e,t,void 0,arguments)},filter(e,t){return ct(this,`filter`,e,t,e=>e.map(e=>rt(this,e)),arguments)},find(e,t){return ct(this,`find`,e,t,e=>rt(this,e),arguments)},findIndex(e,t){return ct(this,`findIndex`,e,t,void 0,arguments)},findLast(e,t){return ct(this,`findLast`,e,t,e=>rt(this,e),arguments)},findLastIndex(e,t){return ct(this,`findLastIndex`,e,t,void 0,arguments)},forEach(e,t){return ct(this,`forEach`,e,t,void 0,arguments)},includes(...e){return ut(this,`includes`,e)},indexOf(...e){return ut(this,`indexOf`,e)},join(e){return tt(this).join(e)},lastIndexOf(...e){return ut(this,`lastIndexOf`,e)},map(e,t){return ct(this,`map`,e,t,void 0,arguments)},pop(){return dt(this,`pop`)},push(...e){return dt(this,`push`,e)},reduce(e,...t){return lt(this,`reduce`,e,t)},reduceRight(e,...t){return lt(this,`reduceRight`,e,t)},shift(){return dt(this,`shift`)},some(e,t){return ct(this,`some`,e,t,void 0,arguments)},splice(...e){return dt(this,`splice`,e)},toReversed(){return tt(this).toReversed()},toSorted(e){return tt(this).toSorted(e)},toSpliced(...e){return tt(this).toSpliced(...e)},unshift(...e){return dt(this,`unshift`,e)},values(){return at(this,`values`,e=>rt(this,e))}};function at(e,t,n){let r=nt(e),i=r[t],a=i.call(r);if(r!==e&&!Vt(e)){if(a[Symbol.toStringTag]===`Array Iterator`){let e=Object.create(Object.getPrototypeOf(a));return e.next=()=>ot(a.next(),n),i!==st[t]&&Object.defineProperties(e,{return:{get(){let e=a.return;return typeof e==`function`?e.bind(a):e}},throw:{get(){let e=a.throw;return typeof e==`function`?e.bind(a):e}}}),e}a._next=a.next,a.next=()=>ot(a._next(),n)}return a}function ot(e,t){return e.done||(e.value=t(e.value)),e}var st=Array.prototype;function ct(e,t,n,r,i,a){let o=nt(e),s=o!==e&&!Vt(e),c=o[t];if(c!==st[t]){let t=c.apply(e,a);return s?Wt(t):t}let l=n;o!==e&&(s?l=function(t,r){return n.call(this,rt(e,t),r,e)}:n.length>2&&(l=function(t,r){return n.call(this,t,r,e)}));let u=c.call(o,l,r);return s&&i?i(u):u}function lt(e,t,n,r){let i=nt(e),a=i!==e&&!Vt(e),o=n,s=!1;i!==e&&(a?(s=r.length===0,o=function(t,r,i){return s&&(s=!1,t=rt(e,t)),n.call(this,t,rt(e,r),i,e)}):n.length>3&&(o=function(t,r,i){return n.call(this,t,r,i,e)}));let c=i[t](o,...r);return s?rt(e,c):c}function ut(e,t,n){let r=B(e);$e(r,`iterate`,Qe);let i=r[t](...n);return(i===-1||i===!1)&&Ht(n[0])?(n[0]=B(n[0]),r[t](...n)):i}function dt(e,t,n=[]){He(),Me();let r=B(e)[t].apply(e,n);return Ne(),Ue(),r}var ft=a(`__proto__,__v_isRef,__isVue`),pt=new Set(Object.getOwnPropertyNames(Symbol).filter(e=>e!==`arguments`&&e!==`caller`).map(e=>Symbol[e]).filter(S));function mt(e){S(e)||(e=String(e));let t=B(this);return $e(t,`has`,e),t.hasOwnProperty(e)}var ht=class{constructor(e=!1,t=!1){this._isReadonly=e,this._isShallow=t}get(e,t,n){if(t===`__v_skip`)return e.__v_skip;let r=this._isReadonly,i=this._isShallow;if(t===`__v_isReactive`)return!r;if(t===`__v_isReadonly`)return r;if(t===`__v_isShallow`)return i;if(t===`__v_raw`)return n===(r?i?Nt:Mt:i?jt:At).get(e)||Object.getPrototypeOf(e)===Object.getPrototypeOf(n)?e:void 0;let a=g(e);if(!r){let e;if(a&&(e=it[t]))return e;if(t===`hasOwnProperty`)return mt}let o=Reflect.get(e,t,V(e)?e:n);if((S(t)?pt.has(t):ft(t))||(r||$e(e,`get`,t),i))return o;if(V(o)){let e=a&&k(t)?o:o.value;return r&&C(e)?Lt(e):e}return C(o)?r?Lt(o):Ft(o):o}},gt=class extends ht{constructor(e=!1){super(!1,e)}set(e,t,n,r){let i=e[t],a=g(e)&&k(t);if(!this._isShallow){let e=Bt(i);if(!Vt(n)&&!Bt(n)&&(i=B(i),n=B(n)),!a&&V(i)&&!V(n))return e||(i.value=n),!0}let o=a?Number(t)<e.length:h(e,t),s=Reflect.set(e,t,n,V(e)?e:r);return e===B(r)&&s&&(o?P(n,i)&&et(e,`set`,t,n,i):et(e,`add`,t,n)),s}deleteProperty(e,t){let n=h(e,t),r=e[t],i=Reflect.deleteProperty(e,t);return i&&n&&et(e,`delete`,t,void 0,r),i}has(e,t){let n=Reflect.has(e,t);return S(t)&&pt.has(t)||$e(e,`has`,t),n}ownKeys(e){return $e(e,`iterate`,g(e)?`length`:Xe),Reflect.ownKeys(e)}},_t=class extends ht{constructor(e=!1){super(!0,e)}set(e,t){return!0}deleteProperty(e,t){return!0}},vt=new gt,yt=new _t,bt=new gt(!0),xt=e=>e,St=e=>Reflect.getPrototypeOf(e);function Ct(e,t,n){return function(...r){let i=this.__v_raw,a=B(i),o=_(a),s=e===`entries`||e===Symbol.iterator&&o,c=e===`keys`&&o,l=i[e](...r),u=n?xt:t?Gt:Wt;return!t&&$e(a,`iterate`,c?Ze:Xe),f(Object.create(l),{next(){let{value:e,done:t}=l.next();return t?{value:e,done:t}:{value:s?[u(e[0]),u(e[1])]:u(e),done:t}}})}}function wt(e){return function(...t){return e===`delete`?!1:e===`clear`?void 0:this}}function Tt(e,t){let n={get(n){let r=this.__v_raw,i=B(r),a=B(n);e||(P(n,a)&&$e(i,`get`,n),$e(i,`get`,a));let{has:o}=St(i),s=t?xt:e?Gt:Wt;if(o.call(i,n))return s(r.get(n));if(o.call(i,a))return s(r.get(a));r!==i&&r.get(n)},get size(){let t=this.__v_raw;return!e&&$e(B(t),`iterate`,Xe),t.size},has(t){let n=this.__v_raw,r=B(n),i=B(t);return e||(P(t,i)&&$e(r,`has`,t),$e(r,`has`,i)),t===i?n.has(t):n.has(t)||n.has(i)},forEach(n,r){let i=this,a=i.__v_raw,o=B(a),s=t?xt:e?Gt:Wt;return!e&&$e(o,`iterate`,Xe),a.forEach((e,t)=>n.call(r,s(e),s(t),i))}};return f(n,e?{add:wt(`add`),set:wt(`set`),delete:wt(`delete`),clear:wt(`clear`)}:{add(e){let n=B(this),r=St(n),i=B(e),a=!t&&!Vt(e)&&!Bt(e)?i:e;return r.has.call(n,a)||P(e,a)&&r.has.call(n,e)||P(i,a)&&r.has.call(n,i)||(n.add(a),et(n,`add`,a,a)),this},set(e,n){t||Vt(n)||Bt(n)||(n=B(n));let r=B(this),{has:i,get:a}=St(r),o=i.call(r,e);o||=(e=B(e),i.call(r,e));let s=a.call(r,e);return r.set(e,n),o?P(n,s)&&et(r,`set`,e,n,s):et(r,`add`,e,n),this},delete(e){let t=B(this),{has:n,get:r}=St(t),i=n.call(t,e);i||=(e=B(e),n.call(t,e));let a=r?r.call(t,e):void 0,o=t.delete(e);return i&&et(t,`delete`,e,void 0,a),o},clear(){let e=B(this),t=e.size!==0,n=e.clear();return t&&et(e,`clear`,void 0,void 0,void 0),n}}),[`keys`,`values`,`entries`,Symbol.iterator].forEach(r=>{n[r]=Ct(r,e,t)}),n}function Et(e,t){let n=Tt(e,t);return(r,i,a)=>i===`__v_isReactive`?!e:i===`__v_isReadonly`?e:i===`__v_isShallow`?t:i===`__v_raw`?r:Reflect.get(h(n,i)&&i in r?n:r,i,a)}var Dt={get:Et(!1,!1)},Ot={get:Et(!1,!0)},kt={get:Et(!0,!1)},At=new WeakMap,jt=new WeakMap,Mt=new WeakMap,Nt=new WeakMap;function Pt(e){switch(e){case`Object`:case`Array`:return 1;case`Map`:case`Set`:case`WeakMap`:case`WeakSet`:return 2;default:return 0}}function Ft(e){return Bt(e)?e:Rt(e,!1,vt,Dt,At)}function It(e){return Rt(e,!1,bt,Ot,jt)}function Lt(e){return Rt(e,!0,yt,kt,Mt)}function Rt(e,t,n,r,i){if(!C(e)||e.__v_raw&&!(t&&e.__v_isReactive)||e.__v_skip||!Object.isExtensible(e))return e;let a=i.get(e);if(a)return a;let o=Pt(D(e));if(o===0)return e;let s=new Proxy(e,o===2?r:n);return i.set(e,s),s}function zt(e){return Bt(e)?zt(e.__v_raw):!!(e&&e.__v_isReactive)}function Bt(e){return!!(e&&e.__v_isReadonly)}function Vt(e){return!!(e&&e.__v_isShallow)}function Ht(e){return e?!!e.__v_raw:!1}function B(e){let t=e&&e.__v_raw;return t?B(t):e}function Ut(e){return!h(e,`__v_skip`)&&Object.isExtensible(e)&&ae(e,`__v_skip`,!0),e}var Wt=e=>C(e)?Ft(e):e,Gt=e=>C(e)?Lt(e):e;function V(e){return e?e.__v_isRef===!0:!1}function H(e){return Kt(e,!1)}function Kt(e,t){return V(e)?e:new qt(e,t)}var qt=class{constructor(e,t){this.dep=new qe,this.__v_isRef=!0,this.__v_isShallow=!1,this._rawValue=t?e:B(e),this._value=t?e:Wt(e),this.__v_isShallow=t}get value(){return this.dep.track(),this._value}set value(e){let t=this._rawValue,n=this.__v_isShallow||Vt(e)||Bt(e);e=n?e:B(e),P(e,t)&&(this._rawValue=e,this._value=n?e:Wt(e),this.dep.trigger())}};function U(e){return V(e)?e.value:e}var Jt={get:(e,t,n)=>t===`__v_raw`?e:U(Reflect.get(e,t,n)),set:(e,t,n,r)=>{let i=e[t];return V(i)&&!V(n)?(i.value=n,!0):Reflect.set(e,t,n,r)}};function Yt(e){return zt(e)?e:new Proxy(e,Jt)}var Xt=class{constructor(e,t,n){this.fn=e,this.setter=t,this._value=void 0,this.dep=new qe(this),this.__v_isRef=!0,this.deps=void 0,this.depsTail=void 0,this.flags=16,this.globalVersion=Ge-1,this.next=void 0,this.effect=this,this.__v_isReadonly=!t,this.isSSR=n}notify(){if(this.flags|=16,!(this.flags&8)&&z!==this)return je(this,!0),!0}get value(){let e=this.dep.track();return Le(this),e&&(e.version=this.dep.version),this._value}set value(e){this.setter&&this.setter(e)}};function Zt(e,t,n=!1){let r,i;return b(e)?r=e:(r=e.get,i=e.set),new Xt(r,i,n)}var Qt={},$t=new WeakMap,en=void 0;function tn(e,t=!1,n=en){if(n){let t=$t.get(n);t||$t.set(n,t=[]),t.push(e)}}function nn(e,t,n=o){let{immediate:r,deep:i,once:a,scheduler:s,augmentJob:l,call:u}=n,d=e=>i?e:Vt(e)||i===!1||i===0?rn(e,1):rn(e),f,m,h,_,v=!1,y=!1;if(V(e)?(m=()=>e.value,v=Vt(e)):zt(e)?(m=()=>d(e),v=!0):g(e)?(y=!0,v=e.some(e=>zt(e)||Vt(e)),m=()=>e.map(e=>{if(V(e))return e.value;if(zt(e))return d(e);if(b(e))return u?u(e,2):e()})):m=b(e)?t?u?()=>u(e,2):e:()=>{if(h){He();try{h()}finally{Ue()}}let t=en;en=f;try{return u?u(e,3,[_]):e(_)}finally{en=t}}:c,t&&i){let e=m,t=i===!0?1/0:i;m=()=>rn(e(),t)}let x=Te(),S=()=>{f.stop(),x&&x.active&&p(x.effects,f)};if(a&&t){let e=t;t=(...t)=>{try{return e(...t)}finally{S()}}}let C=y?Array(e.length).fill(Qt):Qt,w=e=>{if(f.flags&1&&(f.dirty||e)){if(t){let n=f.run();if(e||i||v||(y?n.some((e,t)=>P(e,C[t])):P(n,C))){let e=en;He();try{h&&h(),en=f;let e=[n,C===Qt?void 0:y&&C[0]===Qt?[]:C,_];C=n,u?u(t,3,e):t(...e)}finally{en=e,Ue()}}}else f.run()}};return l&&l(w),f=new De(m),f.scheduler=s?()=>s(w,!1):w,_=e=>tn(e,!1,f),h=f.onStop=()=>{let e=$t.get(f);if(e){if(u)u(e,4);else for(let t of e)t();$t.delete(f)}},t?r?w(!0):C=f.run():s?s(w.bind(null,!0),!0):f.run(),S.pause=f.pause.bind(f),S.resume=f.resume.bind(f),S.stop=S,S}function rn(e,t=1/0,n){if(t<=0||!C(e)||e.__v_skip||(n||=new Map,(n.get(e)||0)>=t))return e;if(n.set(e,t),t--,V(e))rn(e.value,t,n);else if(g(e))for(let r=0;r<e.length;r++)rn(e[r],t,n);else if(v(e)||_(e))e.forEach(e=>{rn(e,t,n)});else if(O(e)){for(let r in e)rn(e[r],t,n);for(let r of Object.getOwnPropertySymbols(e))Object.prototype.propertyIsEnumerable.call(e,r)&&rn(e[r],t,n)}return e}function an(e,t,n,r){try{return r?e(...r):e()}catch(e){sn(e,t,n)}}function on(e,t,n,r){if(b(e)){let i=an(e,t,n,r);return i&&w(i)&&i.catch(e=>{sn(e,t,n)}),i}if(g(e)){let i=[];for(let a=0;a<e.length;a++)i.push(on(e[a],t,n,r));return i}}function sn(e,t,n,r=!0){let i=t?t.vnode:null,{errorHandler:a,throwUnhandledErrorInProduction:s}=t&&t.appContext.config||o;if(t){let r=t.parent,i=t.proxy,o=`https://vuejs.org/error-reference/#runtime-${n}`;for(;r;){let t=r.ec;if(t){for(let n=0;n<t.length;n++)if(t[n](e,i,o)===!1)return}r=r.parent}if(a){He(),an(a,null,10,[e,i,o]),Ue();return}}cn(e,n,i,r,s)}function cn(e,t,n,r=!0,i=!1){if(i)throw e;console.error(e)}var ln=[],un=-1,dn=[],fn=null,pn=0,mn=Promise.resolve(),hn=null;function gn(e){let t=hn||mn;return e?t.then(this?e.bind(this):e):t}function _n(e){let t=un+1,n=ln.length;for(;t<n;){let r=t+n>>>1,i=ln[r],a=Tn(i);a<e||a===e&&i.flags&2?t=r+1:n=r}return t}function vn(e){if(!(e.flags&1)){let t=Tn(e),n=ln[ln.length-1];!n||!(e.flags&2)&&t>=Tn(n)?ln.push(e):ln.splice(_n(t),0,e),e.flags|=1,yn()}}function yn(){hn||=mn.then(En)}function bn(e){if(!g(e))fn&&e.id===-1?fn.splice(pn+1,0,e):e.flags&1||(dn.push(e),e.flags|=1);else for(let t=0;t<e.length;t++)dn.push(e[t]);yn()}function xn(e,t,n,r=un+1){for(;r<ln.length;r++){let n=ln[r];if(n&&n.flags&2){if(e&&n.id!==e.uid||t!==void 0&&!(n.id>=t))continue;ln.splice(r,1),r=e?r-1:un,n.flags&4&&(n.flags&=-2),n(),n.flags&4||(n.flags&=-2)}}}function Sn(e,t,n=0){if(dn.length){let e=dn,r=0;if(t){e=[];for(let i=0;i<dn.length;i++){let a=dn[i];(a.i===void 0?t.has(a):!a.i||a.i.uid<n)?dn[r++]=a:e.push(a)}}let i=[...new Set(e)].sort((e,t)=>Tn(e)-Tn(t));if(dn.length=r,fn){for(let e=0;e<i.length;e++)fn.push(i[e]);return}for(fn=i,pn=0;pn<fn.length;pn++){let e=fn[pn];e.flags&4&&(e.flags&=-2),e.flags&8||e(),e.flags&=-2}fn=null,pn=0}}var Cn=!1;function wn(e,t){if(Cn){e();return}let n=t===void 0?void 0:new Set(dn);e(),Cn=!0;try{xn(void 0,t),Sn(void 0,n,t)}finally{Cn=!1}}var Tn=e=>e.id==null?e.flags&2?-1:1/0:e.id;function En(e){try{for(un=0;un<ln.length;un++){let e=ln[un];e&&!(e.flags&8)&&(e.flags&4&&(e.flags&=-2),an(e,e.i,e.i?15:14),e.flags&4||(e.flags&=-2))}}finally{for(;un<ln.length;un++){let e=ln[un];e&&(e.flags&=-2)}un=-1,ln.length=0,Sn(e),hn=null,(ln.length||dn.length)&&En(e)}}var Dn=null,On=null;function kn(e){let t=Dn;return Dn=e,On=e&&e.type.__scopeId||null,t}function An(e,t=Dn,n){if(!t||e._n)return e;let r=(...n)=>{r._d&&Qi(-1);let i=kn(t),a=Ji.length,o;try{o=e(...n)}finally{for(let e=Ji.length;e>a;e--)Xi();kn(i),r._d&&Qi(1)}return o};return r._n=!0,r._c=!0,r._d=!0,r}function jn(e,t){if(Dn===null)return e;let n=Na(Dn),r=e.dirs||=[];for(let e=0;e<t.length;e++){let[i,a,s,c=o]=t[e];i&&(b(i)&&(i={mounted:i,updated:i}),i.deep&&rn(a),r.push({dir:i,instance:n,value:a,oldValue:void 0,arg:s,modifiers:c}))}return e}function Mn(e,t,n,r){let i=e.dirs,a=t&&t.dirs;for(let o=0;o<i.length;o++){let s=i[o];a&&(s.oldValue=a[o].value);let c=s.dir[r];c&&(He(),on(c,n,8,[e.el,s,e,t]),Ue())}}function Nn(e,t){if(ya){let n=ya.provides,r=ya.parent&&ya.parent.provides;r===n&&(n=ya.provides=Object.create(r)),n[e]=t}}function Pn(e,t,n=!1){let r=ba();if(r||ei){let i=ei?ei._context.provides:r?r.parent==null||r.ce?r.vnode.appContext&&r.vnode.appContext.provides:r.parent.provides:void 0;if(i&&e in i)return i[e];if(arguments.length>1)return n&&b(t)?t.call(r&&r.proxy):t}}var Fn=Symbol.for(`v-scx`),In=()=>Pn(Fn);function Ln(e,t,n){return Rn(e,t,n)}function Rn(e,t,n=o){let{immediate:r,deep:i,flush:a,once:s}=n,l=f({},n),u=t&&r||!t&&a!==`post`,d;if(Ea){if(a===`sync`){let e=In();d=e.__watcherHandles||=[]}else if(!u){let e=()=>{};return e.stop=c,e.resume=c,e.pause=c,e}}let p=ya;l.call=(e,t,n)=>on(e,p,t,n);let m=!1;a===`post`?l.scheduler=e=>{e.i=p,Mi(e,p&&p.suspense)}:a!==`sync`&&(m=!0,l.scheduler=(e,t)=>{t?e():vn(e)}),l.augmentJob=e=>{t&&(e.flags|=4),m&&(e.flags|=2,p&&(e.id=p.uid,e.i=p))};let h=nn(e,t,l);return Ea&&(d?d.push(h):u&&h()),h}function zn(e,t,n){let r=this.proxy,i=x(e)?e.includes(`.`)?Bn(r,e):()=>r[e]:e.bind(r,r),a;b(t)?a=t:(a=t.handler,n=t);let o=Ca(this),s=Rn(i,a.bind(r),n);return o(),s}function Bn(e,t){let n=t.split(`.`);return()=>{let t=e;for(let e=0;e<n.length&&t;e++)t=t[n[e]];return t}}var Vn=new WeakMap,Hn=Symbol(`_vte`),Un=e=>e.__isTeleport,Wn=e=>e&&(e.disabled||e.disabled===``),Gn=e=>e&&(e.defer||e.defer===``),Kn=e=>typeof SVGElement<`u`&&e instanceof SVGElement,qn=e=>typeof MathMLElement==`function`&&e instanceof MathMLElement,Jn=(e,t)=>{let n=e&&e.to;return x(n)?t?t(n):null:n},Yn={name:`Teleport`,__isTeleport:!0,process(e,t,n,r,i,a,o,s,c,l){let{mc:u,pc:d,pbc:f,o:{insert:p,querySelector:m,createText:h,createComment:g,parentNode:_}}=l,v=Wn(t.props),{dynamicChildren:y}=t,b=(e,t,n)=>{e.shapeFlag&16&&u(e.children,t,n,i,a,o,s,c)},x=(e=t)=>{let n=Wn(e.props),r=e.target=Jn(e.props,m),a=er(r,e,h,p);r&&(o!==`svg`&&Kn(r)?o=`svg`:o!==`mathml`&&qn(r)&&(o=`mathml`),i&&i.isCE&&(i.ce._teleportTargets||(i.ce._teleportTargets=new Set)).add(r),n||(b(e,r,a),$n(e,!1)))},S=e=>{let t=()=>{if(Vn.get(e)===t){if(Vn.delete(e),Wn(e.props)){let t=_(e.el)||n;b(e,t,e.anchor),$n(e,!0)}x(e)}};Vn.set(e,t),Mi(t,a)};if(e==null){let e=t.el=h(``),i=t.anchor=h(``);if(p(e,n,r),p(i,n,r),Gn(t.props)||a&&a.pendingBranch){S(t);return}v&&(b(t,n,i),$n(t,!0)),x()}else{t.el=e.el;let r=t.anchor=e.anchor,u=Vn.get(e);if(u){u.flags|=8,Vn.delete(e),S(t);return}t.targetStart=e.targetStart;let p=t.target=e.target,h=t.targetAnchor=e.targetAnchor,g=Wn(e.props),_=g?n:p,b=g?r:h;if(o===`svg`||Kn(p)?o=`svg`:(o===`mathml`||qn(p))&&(o=`mathml`),y?(f(e.dynamicChildren,y,_,i,a,o,s),Ri(e,t,!0)):c||d(e,t,_,b,i,a,o,s,!1),v)g?t.props&&e.props&&t.props.to!==e.props.to&&(t.props.to=e.props.to):Xn(t,n,r,l,1);else if((t.props&&t.props.to)!==(e.props&&e.props.to)){let e=Jn(t.props,m);e&&(t.target=e,Xn(t,e,null,l,0))}else g&&Xn(t,p,h,l,1);$n(t,v)}},remove(e,t,n,{um:r,o:{remove:i}},a){let{shapeFlag:o,children:s,anchor:c,targetStart:l,targetAnchor:u,target:d,props:f}=e,p=Wn(f),m=a||!p,h=Vn.get(e);if(h&&(h.flags|=8,Vn.delete(e)),d&&(i(l),i(u)),a&&i(c),!h&&(p||d)&&o&16)for(let e=0;e<s.length;e++){let i=s[e];r(i,t,n,m,!!i.dynamicChildren)}},move:Xn,hydrate:Zn};function Xn(e,t,n,{o:{insert:r},m:i},a=2){a===0&&(e.targetStart&&r(e.targetStart,t,n),r(e.targetAnchor,t,n),n=e.targetAnchor);let{el:o,anchor:s,shapeFlag:c,children:l,props:u}=e,d=a===2;if(d&&r(o,t,n),!Vn.has(e)&&(!d||Wn(u))&&c&16)for(let e=0;e<l.length;e++)i(l[e],t,n,2);d&&r(s,t,n)}function Zn(e,t,n,r,i,a,{o:{nextSibling:o,parentNode:s,querySelector:c,insert:l,createText:u}},d){function f(e,n){let r=n;for(;r;){if(r&&r.nodeType===8){if(r.data===`teleport start anchor`)t.targetStart=r;else if(r.data===`teleport anchor`){t.targetAnchor=r,e._lpa=t.targetAnchor&&o(t.targetAnchor);break}}r=o(r)}}function p(e,t){t.anchor=d(o(e),t,s(e),n,r,i,a)}let m=t.target=Jn(t.props,c),h=Wn(t.props);if(m){let c=m._lpa||m.firstChild;t.shapeFlag&16&&(h?(p(e,t),f(m,c),t.targetAnchor||er(m,t,u,l,s(e)===m?e:null)):(t.anchor=o(e),f(m,c),t.targetAnchor||er(m,t,u,l),d(c&&o(c),t,m,n,r,i,a))),$n(t,h)}else h&&t.shapeFlag&16&&(p(e,t),t.targetStart=e,t.targetAnchor=o(e));return t.anchor&&o(t.anchor)}var Qn=Yn;function $n(e,t){let n=e.ctx;if(n&&n.ut){let r,i;for(t?(r=e.el,i=e.anchor):(r=e.targetStart,i=e.targetAnchor);r&&r!==i;)r.nodeType===1&&r.setAttribute(`data-v-owner`,n.uid),r=r.nextSibling;n.ut()}}function er(e,t,n,r,i=null){let a=t.targetStart=n(``),o=t.targetAnchor=n(``);return a[Hn]=o,e&&(r(a,e,i),r(o,e,i)),o}var tr=Symbol(`_leaveCb`);function nr(e){let t=e[0];if(e.length>1){for(let n of e)if(n.type!==Ki){t=n;break}}return t}function rr(e){if(!fr(e))return Un(e.type)&&e.children?nr(e.children):e;if(e.component)return e.component.subTree;let{shapeFlag:t,children:n}=e;if(n){if(t&16)return n[0];if(t&32&&b(n.default))return n.default()}}function ir(e,t){if(e.shapeFlag&6&&e.component){e.transition=t;let n=e.component.subTree;ir(Un(n.type)&&rr(n)||n,t)}else if(e.shapeFlag&128)e.ssContent.transition=t.clone(e.ssContent),e.ssFallback.transition=t.clone(e.ssFallback);else if(e.transition=t,e.type===W&&g(e.children)){let n=si(e.children,!1);n&&ir(n,t)}}function ar(e){if(e.component)return ar(e.component.subTree);if(e.type===W){let t=g(e.children)&&si(e.children,!1);return t?ar(t):void 0}if(e.type!==Ki)return e}function or(e){e.ids=[e.ids[0]+e.ids[2]+++`-`,0,0]}function sr(e,t){let n;return!!((n=Object.getOwnPropertyDescriptor(e,t))&&!n.configurable)}var cr=new WeakMap;function lr(e,t,n,r,i=!1){if(g(e)){e.forEach((e,a)=>lr(e,t&&(g(t)?t[a]:t),n,r,i));return}if(dr(r)&&!i){r.shapeFlag&512&&r.type.__asyncResolved&&r.component.subTree.component&&lr(e,t,n,r.component.subTree);return}let a=r.shapeFlag&4?Na(r.component):r.el,s=i?null:a,{i:c,r:u}=e,d=t&&t.r,f=c.refs===o?c.refs={}:c.refs,m=c.setupState,_=B(m),v=m===o?l:e=>!sr(f,e)&&h(_,e),y=(e,t)=>!(t&&sr(f,t));if(d!=null&&d!==u){if(ur(t),x(d))f[d]=null,v(d)&&(m[d]=null);else if(V(d)){let e=t;y(d,e.k)&&(d.value=null),e.k&&(f[e.k]=null)}}if(b(u))an(u,c,12,[s,f]);else{let t=x(u),r=V(u);if(t||r){let o=()=>{if(e.f){let n=t?v(u)?m[u]:f[u]:y(u)||!e.k?u.value:f[e.k];if(i)g(n)&&p(n,a);else if(g(n))n.includes(a)||n.push(a);else if(t)f[u]=[a],v(u)&&(m[u]=f[u]);else{let t=[a];y(u,e.k)&&(u.value=t),e.k&&(f[e.k]=t)}}else t?(f[u]=s,v(u)&&(m[u]=s)):r&&(y(u,e.k)&&(u.value=s),e.k&&(f[e.k]=s))};if(s){let t=()=>{o(),cr.delete(e)};t.id=-1,cr.set(e,t),Mi(t,n)}else ur(e),o()}}}function ur(e){let t=cr.get(e);t&&(t.flags|=8,cr.delete(e))}ce().requestIdleCallback,ce().cancelIdleCallback;var dr=e=>!!e.type.__asyncLoader,fr=e=>e.type.__isKeepAlive;function pr(e,t){hr(e,`a`,t)}function mr(e,t){hr(e,`da`,t)}function hr(e,t,n=ya){let r=e.__wdc||=()=>{let t=n;for(;t;){if(t.isDeactivated)return;t=t.parent}return e()};if(_r(t,r,n),n){let e=n.parent;for(;e&&e.parent;)fr(e.parent.vnode)&&gr(r,t,n,e),e=e.parent}}function gr(e,t,n,r){let i=_r(t,e,r,!0);wr(()=>{p(r[t],i)},n)}function _r(e,t,n=ya,r=!1){if(n){let i=n[e]||(n[e]=[]),a=t.__weh||=(...r)=>{He();let i=Ca(n),a=on(t,n,e,r);return i(),Ue(),a};return r?i.unshift(a):i.push(a),a}}var vr=e=>(t,n=ya)=>{Ea&&e!==`sp`||_r(e,(...e)=>t(...e),n)},yr=vr(`bm`),br=vr(`m`),xr=vr(`bu`),Sr=vr(`u`),Cr=vr(`bum`),wr=vr(`um`),Tr=vr(`sp`),Er=vr(`rtg`),Dr=vr(`rtc`);function Or(e,t=ya){_r(`ec`,e,t)}var kr=Symbol.for(`v-ndc`);function Ar(e,t,n,r){let i,a=n&&n[r],o=g(e);if(o||x(e)){let n=o&&zt(e),r=!1,s=!1;n&&(r=!Vt(e),s=Bt(e),e=nt(e)),i=Array(e.length);for(let n=0,o=e.length;n<o;n++)i[n]=t(r?s?Gt(Wt(e[n])):Wt(e[n]):e[n],n,void 0,a&&a[n])}else if(typeof e==`number`){if(!Number.isInteger(e)||e<0)i=[];else{i=Array(e);for(let n=0;n<e;n++)i[n]=t(n+1,n,void 0,a&&a[n])}}else if(C(e)){if(e[Symbol.iterator])i=Array.from(e,(e,n)=>t(e,n,void 0,a&&a[n]));else{let n=Object.keys(e);i=Array(n.length);for(let r=0,o=n.length;r<o;r++){let o=n[r];i[r]=t(e[o],o,r,a&&a[r])}}}else i=[];return n&&(n[r]=i),i}var jr=e=>e?Ta(e)?Na(e):jr(e.parent):null,Mr=f(Object.create(null),{$:e=>e,$el:e=>e.vnode.el,$data:e=>e.data,$props:e=>e.props,$attrs:e=>e.attrs,$slots:e=>e.slots,$refs:e=>e.refs,$parent:e=>jr(e.parent),$root:e=>jr(e.root),$host:e=>e.ce,$emit:e=>e.emit,$options:e=>Vr(e),$forceUpdate:e=>e.f||=()=>{vn(e.update)},$nextTick:e=>e.n||=gn.bind(e.proxy),$watch:e=>zn.bind(e)}),Nr=(e,t)=>e!==o&&!e.__isScriptSetup&&h(e,t),Pr={get({_:e},t){if(t===`__v_skip`)return!0;let{ctx:n,setupState:r,data:i,props:a,accessCache:s,type:c,appContext:l}=e;if(t[0]!==`$`){let e=s[t];if(e!==void 0)switch(e){case 1:return r[t];case 2:return i[t];case 4:return n[t];case 3:return a[t]}else if(Nr(r,t))return s[t]=1,r[t];else if(i!==o&&h(i,t))return s[t]=2,i[t];else if(h(a,t))return s[t]=3,a[t];else if(n!==o&&h(n,t))return s[t]=4,n[t];else Ir&&(s[t]=0)}let u=Mr[t],d,f;if(u)return t===`$attrs`&&$e(e.attrs,`get`,``),u(e);if((d=c.__cssModules)&&(d=d[t]))return d;if(n!==o&&h(n,t))return s[t]=4,n[t];if(f=l.config.globalProperties,h(f,t))return f[t]},set({_:e},t,n){let{data:r,setupState:i,ctx:a}=e;return Nr(i,t)?(i[t]=n,!0):r!==o&&h(r,t)?(r[t]=n,!0):h(e.props,t)||t[0]===`$`&&t.slice(1)in e?!1:(a[t]=n,!0)},has({_:{data:e,setupState:t,accessCache:n,ctx:r,appContext:i,props:a,type:s}},c){let l;return!!(n[c]||e!==o&&c[0]!==`$`&&h(e,c)||Nr(t,c)||h(a,c)||h(r,c)||h(Mr,c)||h(i.config.globalProperties,c)||(l=s.__cssModules)&&l[c])},defineProperty(e,t,n){return n.get==null?h(n,`value`)&&this.set(e,t,n.value,null):e._.accessCache[t]=0,Reflect.defineProperty(e,t,n)}};function Fr(e){return g(e)?e.reduce((e,t)=>(e[t]=null,e),{}):e}var Ir=!0;function Lr(e){let t=Vr(e),n=e.proxy,r=e.ctx;Ir=!1,t.beforeCreate&&zr(t.beforeCreate,e,`bc`);let{data:i,computed:a,methods:o,watch:s,provide:l,inject:u,created:d,beforeMount:f,mounted:p,beforeUpdate:m,updated:h,activated:_,deactivated:v,beforeDestroy:y,beforeUnmount:x,destroyed:S,unmounted:w,render:T,renderTracked:E,renderTriggered:D,errorCaptured:O,serverPrefetch:k,expose:A,inheritAttrs:j,components:ee,directives:M,filters:te}=t;if(u&&Rr(u,r,null),o)for(let e in o){let t=o[e];b(t)&&(r[e]=t.bind(n))}if(i){let t=i.call(n,n);C(t)&&(e.data=Ft(t))}if(Ir=!0,a)for(let e in a){let t=a[e],i=Fa({get:b(t)?t.bind(n,n):b(t.get)?t.get.bind(n,n):c,set:!b(t)&&b(t.set)?t.set.bind(n):c});Object.defineProperty(r,e,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e})}if(s)for(let e in s)Br(s[e],r,n,e);if(l){let e=b(l)?l.call(n):l;Reflect.ownKeys(e).forEach(t=>{Nn(t,e[t])})}d&&zr(d,e,`c`);function N(e,t){g(t)?t.forEach(t=>e(t.bind(n))):t&&e(t.bind(n))}if(N(yr,f),N(br,p),N(xr,m),N(Sr,h),N(pr,_),N(mr,v),N(Or,O),N(Dr,E),N(Er,D),N(Cr,x),N(wr,w),N(Tr,k),g(A)){if(A.length){let t=e.exposed||={};A.forEach(e=>{Object.defineProperty(t,e,{get:()=>n[e],set:t=>n[e]=t,enumerable:!0})})}else e.exposed||={}}T&&e.render===c&&(e.render=T),j!=null&&(e.inheritAttrs=j),ee&&(e.components=ee),M&&(e.directives=M),k&&or(e)}function Rr(e,t,n=c){g(e)&&(e=Kr(e));for(let n in e){let r=e[n],i;i=C(r)?`default`in r?Pn(r.from||n,r.default,!0):Pn(r.from||n):Pn(r),V(i)?Object.defineProperty(t,n,{enumerable:!0,configurable:!0,get:()=>i.value,set:e=>i.value=e}):t[n]=i}}function zr(e,t,n){on(g(e)?e.map(e=>e.bind(t.proxy)):e.bind(t.proxy),t,n)}function Br(e,t,n,r){let i=r.includes(`.`)?Bn(n,r):()=>n[r];if(x(e)){let n=t[e];b(n)&&Ln(i,n)}else if(b(e))Ln(i,e.bind(n));else if(C(e)){if(g(e))e.forEach(e=>Br(e,t,n,r));else{let r=b(e.handler)?e.handler.bind(n):t[e.handler];b(r)&&Ln(i,r,e)}}}function Vr(e){let t=e.type,{mixins:n,extends:r}=t,{mixins:i,optionsCache:a,config:{optionMergeStrategies:o}}=e.appContext,s=a.get(t),c;return s?c=s:!i.length&&!n&&!r?c=t:(c={},i.length&&i.forEach(e=>Hr(c,e,o,!0)),Hr(c,t,o)),C(t)&&a.set(t,c),c}function Hr(e,t,n,r=!1){let{mixins:i,extends:a}=t;a&&Hr(e,a,n,!0),i&&i.forEach(t=>Hr(e,t,n,!0));for(let i in t)if(!(r&&i===`expose`)){let r=Ur[i]||n&&n[i];e[i]=r?r(e[i],t[i]):t[i]}return e}var Ur={data:Wr,props:Yr,emits:Yr,methods:Jr,computed:Jr,beforeCreate:qr,created:qr,beforeMount:qr,mounted:qr,beforeUpdate:qr,updated:qr,beforeDestroy:qr,beforeUnmount:qr,destroyed:qr,unmounted:qr,activated:qr,deactivated:qr,errorCaptured:qr,serverPrefetch:qr,components:Jr,directives:Jr,watch:Xr,provide:Wr,inject:Gr};function Wr(e,t){return t?e?function(){return f(b(e)?e.call(this,this):e,b(t)?t.call(this,this):t)}:t:e}function Gr(e,t){return Jr(Kr(e),Kr(t))}function Kr(e){if(g(e)){let t={};for(let n=0;n<e.length;n++)t[e[n]]=e[n];return t}return e}function qr(e,t){return e?[...new Set([].concat(e,t))]:t}function Jr(e,t){return e?f(Object.create(null),e,t):t}function Yr(e,t){return e?g(e)&&g(t)?[...new Set([...e,...t])]:f(Object.create(null),Fr(e),Fr(t??{})):t}function Xr(e,t){if(!e)return t;if(!t)return e;let n=f(Object.create(null),e);for(let r in t)n[r]=qr(e[r],t[r]);return n}function Zr(){return{app:null,config:{isNativeTag:l,performance:!1,globalProperties:{},optionMergeStrategies:{},errorHandler:void 0,warnHandler:void 0,compilerOptions:{}},mixins:[],components:{},directives:{},provides:Object.create(null),optionsCache:new WeakMap,propsCache:new WeakMap,emitsCache:new WeakMap}}var Qr=0;function $r(e,t){return function(n,r=null){b(n)||(n=f({},n)),r!=null&&!C(r)&&(r=null);let i=Zr(),a=new WeakSet,o=[],s=!1,c=i.app={_uid:Qr++,_component:n,_props:r,_container:null,_context:i,_instance:null,version:Ia,get config(){return i.config},set config(e){},use(e,...t){return a.has(e)||(e&&b(e.install)?(a.add(e),e.install(c,...t)):b(e)&&(a.add(e),e(c,...t))),c},mixin(e){return i.mixins.includes(e)||i.mixins.push(e),c},component(e,t){return t?(i.components[e]=t,c):i.components[e]},directive(e,t){return t?(i.directives[e]=t,c):i.directives[e]},mount(a,o,l){if(!s){let u=c._ceVNode||aa(n,r);return u.appContext=i,l===!0?l=`svg`:l===!1&&(l=void 0),o&&t?t(u,a):e(u,a,l),s=!0,c._container=a,a.__vue_app__=c,Na(u.component)}},onUnmount(e){o.push(e)},unmount(){s&&(on(o,c._instance,16),e(null,c._container),delete c._container.__vue_app__)},provide(e,t){return i.provides[e]=t,c},runWithContext(e){let t=ei;ei=c;try{return e()}finally{ei=t}}};return c}}var ei=null,ti=(e,t)=>t===`modelValue`||t===`model-value`?e.modelModifiers:e[`${t}Modifiers`]||e[`${M(t)}Modifiers`]||e[`${N(t)}Modifiers`];function ni(e,t,...n){if(e.isUnmounted)return;let r=e.vnode.props||o,i=n,a=t.startsWith(`update:`),s=a&&ti(r,t.slice(7));s&&(s.trim&&(i=n.map(e=>x(e)?e.trim():e)),s.number&&(i=i.map(oe)));let c,l=r[c=re(t)]||r[c=re(M(t))];!l&&a&&(l=r[c=re(N(t))]),l&&on(l,e,6,i);let u=r[c+`Once`];if(u){if(!e.emitted)e.emitted={};else if(e.emitted[c])return;e.emitted[c]=!0,on(u,e,6,i)}}var ri=new WeakMap;function ii(e,t,n=!1){let r=n?ri:t.emitsCache,i=r.get(e);if(i!==void 0)return i;let a=e.emits,o={},s=!1;if(!b(e)){let r=e=>{let n=ii(e,t,!0);n&&(s=!0,f(o,n))};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}return!a&&!s?(C(e)&&r.set(e,null),null):(g(a)?a.forEach(e=>o[e]=null):f(o,a),C(e)&&r.set(e,o),o)}function ai(e,t){return!e||!u(t)?!1:(t=t.slice(2),t=t===`Once`?t:t.replace(/Once$/,``),h(e,t[0].toLowerCase()+t.slice(1))||h(e,N(t))||h(e,t))}function oi(e){let{type:t,vnode:n,proxy:r,withProxy:i,propsOptions:[a],slots:o,attrs:s,emit:c,render:l,renderCache:u,props:f,data:p,setupState:m,ctx:h,inheritAttrs:g}=e,_=kn(e),v,y;try{if(n.shapeFlag&4){let e=i||r,t=e;v=ua(l.call(t,e,u,f,m,p,h)),y=s}else{let e=t;v=ua(e.length>1?e(f,{attrs:s,slots:o,emit:c}):e(f,null)),y=t.props?s:ci(s)}}catch(t){Ji.length=0,sn(t,e,1),v=aa(Ki)}let b=v;if(y&&g!==!1){let e=Object.keys(y),{shapeFlag:t}=b;e.length&&t&7&&(a&&e.some(d)&&(y=li(y,a)),b=ca(b,y,!1,!0))}return n.dirs&&(b=ca(b,null,!1,!0),b.dirs=b.dirs?b.dirs.concat(n.dirs):n.dirs),n.transition&&ir(Un(b.type)&&rr(b)||b,n.transition),v=b,kn(_),v}function si(e,t=!0){let n;for(let t=0;t<e.length;t++){let r=e[t];if(ta(r)){if(r.type!==Ki||r.children===`v-if`){if(n)return;n=r}}else return}return n}var ci=e=>{let t;for(let n in e)(n===`class`||n===`style`||u(n))&&((t||={})[n]=e[n]);return t},li=(e,t)=>{let n={};for(let r in e)d(r)&&r.slice(9)in t||(n[r]=e[r]);return n};function ui(e,t,n){let{props:r,children:i,component:a}=e,{props:o,children:s,patchFlag:c}=t,l=a.emitsOptions;if(t.dirs||t.transition)return!0;if(n&&c>=0){if(c&1024)return!0;if(c&16)return r?di(r,o,l):!!o;if(c&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let n=e[t];if(fi(o,r,n)&&!ai(l,n))return!0}}}else return(i||s)&&(!s||!s.$stable)?!0:r===o?!1:r?!o||di(r,o,l):!!o;return!1}function di(e,t,n){let r=Object.keys(t);if(r.length!==Object.keys(e).length)return!0;for(let i=0;i<r.length;i++){let a=r[i];if(!h(e,a)||fi(t,e,a)&&!ai(n,a))return!0}return!1}function fi(e,t,n){let r=e[n],i=t[n];return n===`style`&&C(r)&&C(i)?!ye(r,i):r!==i}function pi({vnode:e,parent:t,suspense:n},r){for(;t;){let n=t.subTree;if(n.suspense&&n.suspense.activeBranch===e&&(n.suspense.vnode.el=n.el=r,e=n),n===e)(e=t.vnode).el=r,t=t.parent;else break}n&&n.activeBranch===e&&(n.vnode.el=r)}var mi={},hi=()=>Object.create(mi),gi=e=>Object.getPrototypeOf(e)===mi;function _i(e,t,n,r=!1){let i={},a=hi();e.propsDefaults=Object.create(null),yi(e,t,i,a);for(let t in e.propsOptions[0])t in i||(i[t]=void 0);e.props=n?r?i:It(i):e.type.props?i:a,e.attrs=a}function vi(e,t,n,r){let{props:i,attrs:a,vnode:{patchFlag:o}}=e,s=B(i),[c]=e.propsOptions,l=!1;if((r||o>0)&&!(o&16)){if(o&8){let n=e.vnode.dynamicProps;for(let r=0;r<n.length;r++){let o=n[r];if(ai(e.emitsOptions,o))continue;let u=t[o];if(c){if(h(a,o))u!==a[o]&&(a[o]=u,l=!0);else{let t=M(o);i[t]=bi(c,s,t,u,e,!1)}}else u!==a[o]&&(a[o]=u,l=!0)}}}else{yi(e,t,i,a)&&(l=!0);let r;for(let a in s)t&&(h(t,a)||(r=N(a))!==a&&h(t,r))||(c?n&&(n[a]!==void 0||n[r]!==void 0)&&(i[a]=bi(c,s,a,void 0,e,!0)):delete i[a]);if(a!==s)for(let e in a)t&&h(t,e)||(delete a[e],l=!0)}l&&et(e.attrs,`set`,``)}function yi(e,t,n,r){let[i,a]=e.propsOptions,s=!1,c;if(t)for(let o in t){if(A(o))continue;let l=t[o],u;i&&h(i,u=M(o))?!a||!a.includes(u)?n[u]=l:(c||={})[u]=l:ai(e.emitsOptions,o)||o in r&&l===r[o]||(r[o]=l,s=!0)}if(a){let t=B(n),r=c||o;for(let o=0;o<a.length;o++){let s=a[o];n[s]=bi(i,t,s,r[s],e,!h(r,s))}}return s}function bi(e,t,n,r,i,a){let o=e[n];if(o!=null){let e=h(o,`default`);if(e&&r===void 0){let e=o.default;if(o.type!==Function&&!o.skipFactory&&b(e)){let{propsDefaults:a}=i;if(n in a)r=a[n];else{let o=Ca(i);r=a[n]=e.call(null,t),o()}}else r=e;i.ce&&i.ce._setProp(n,r)}o[0]&&(a&&!e?r=!1:o[1]&&(r===``||r===N(n))&&(r=!0))}return r}var xi=new WeakMap;function Si(e,t,n=!1){let r=n?xi:t.propsCache,i=r.get(e);if(i)return i;let a=e.props,c={},l=[],u=!1;if(!b(e)){let r=e=>{u=!0;let[n,r]=Si(e,t,!0);f(c,n),r&&l.push(...r)};!n&&t.mixins.length&&t.mixins.forEach(r),e.extends&&r(e.extends),e.mixins&&e.mixins.forEach(r)}if(!a&&!u)return C(e)&&r.set(e,s),s;if(g(a))for(let e=0;e<a.length;e++){let t=M(a[e]);Ci(t)&&(c[t]=o)}else if(a)for(let e in a){let t=M(e);if(Ci(t)){let n=a[e],r=c[t]=g(n)||b(n)?{type:n}:f({},n),i=r.type,o=!1,s=!0;if(g(i))for(let e=0;e<i.length;++e){let t=i[e],n=b(t)&&t.name;if(n===`Boolean`){o=!0;break}n===`String`&&(s=!1)}else o=b(i)&&i.name===`Boolean`;r[0]=o,r[1]=s,(o||h(r,`default`))&&l.push(t)}}let d=[c,l];return C(e)&&r.set(e,d),d}function Ci(e){return e[0]!==`$`&&!A(e)}var wi=e=>e===`_`||e===`_ctx`||e===`$stable`,Ti=e=>g(e)?e.map(ua):[ua(e)],Ei=(e,t,n)=>{if(t._n)return t;let r=An((...e)=>Ti(t(...e)),n);return r._c=!1,r},Di=(e,t,n)=>{let r=e._ctx;for(let n in e){if(wi(n))continue;let i=e[n];if(b(i))t[n]=Ei(n,i,r);else if(i!=null){let e=Ti(i);t[n]=()=>e}}},Oi=(e,t)=>{let n=Ti(t);e.slots.default=()=>n},ki=(e,t,n)=>{for(let r in t)(n||!wi(r))&&(e[r]=t[r])},Ai=(e,t,n)=>{let r=e.slots=hi();if(e.vnode.shapeFlag&32){let e=t._;e?(ki(r,t,n),n&&ae(r,`_`,e,!0)):Di(t,r)}else t&&Oi(e,t)},ji=(e,t,n)=>{let{vnode:r,slots:i}=e,a=!0,s=o;if(r.shapeFlag&32){let e=t._;e?n&&e===1?a=!1:ki(i,t,n):(a=!t.$stable,Di(t,i)),s=t}else t&&(Oi(e,t),s={default:1});if(a)for(let e in i)!wi(e)&&s[e]==null&&delete i[e]},Mi=Wi;function Ni(e){return Pi(e)}function Pi(e,t){let n=ce();n.__VUE__=!0;let{insert:r,remove:i,patchProp:a,createElement:l,createText:u,createComment:d,setText:f,setElementText:p,parentNode:m,nextSibling:h,setScopeId:g=c,insertStaticContent:_}=e,v=(e,t,n,r=null,i=null,a=null,o=void 0,c=null,l=!!t.dynamicChildren)=>{if(e===t)return;e&&!na(e,t)&&(r=I(e),F(e,i,a,!0),e=null),t.patchFlag===-2&&(l=!1,t.dynamicChildren=null),t.dynamicChildren&&e&&e.dynamicChildren&&e.dynamicChildren.hasOnce&&(t.dynamicChildren===s&&(t.dynamicChildren=[]),t.dynamicChildren.hasOnce=!0);let{type:u,ref:d,shapeFlag:f}=t;switch(u){case Gi:y(e,t,n,r);break;case Ki:b(e,t,n,r);break;case qi:e??x(t,n,r,o);break;case W:ee(e,t,n,r,i,a,o,c,l);break;default:f&1?w(e,t,n,r,i,a,o,c,l):f&6?M(e,t,n,r,i,a,o,c,l):(f&64||f&128)&&u.process(e,t,n,r,i,a,o,c,l,me)}d!=null&&i?lr(d,e&&e.ref,a,t||e,!t):d==null&&e&&e.ref!=null&&lr(e.ref,null,a,e,!0)},y=(e,t,n,i)=>{if(e==null)r(t.el=u(t.children),n,i);else{let n=t.el=e.el;t.children!==e.children&&f(n,t.children)}},b=(e,t,n,i)=>{e==null?r(t.el=d(t.children||``),n,i):t.el=e.el},x=(e,t,n,r)=>{[e.el,e.anchor]=_(e.children,t,n,r,e.el,e.anchor)},S=({el:e,anchor:t},n,i)=>{let a;for(;e&&e!==t;)a=h(e),r(e,n,i),e=a;r(t,n,i)},C=({el:e,anchor:t})=>{let n;for(;e&&e!==t;)n=h(e),i(e),e=n;i(t)},w=(e,t,n,r,i,a,o,s,c)=>{if(t.type===`svg`?o=`svg`:t.type===`math`&&(o=`mathml`),e==null)T(t,n,r,i,a,o,s,c);else{let n=e.el&&e.el._isVueCE?e.el:null;try{n&&n._beginPatch(),O(e,t,i,a,o,s,c)}finally{n&&n._endPatch()}}},T=(e,t,n,i,o,s,c,u)=>{let d,f,{props:m,shapeFlag:h,transition:g,dirs:_}=e;if(d=e.el=l(e.type,s,m&&m.is,m),h&8?p(d,e.children):h&16&&D(e.children,d,null,i,o,Fi(e,s),c,u),_&&Mn(e,null,i,`created`),E(d,e,e.scopeId,c,i),m){for(let e in m)e!==`value`&&!A(e)&&a(d,e,null,m[e],s,i);`value`in m&&a(d,`value`,null,m.value,s),(f=m.onVnodeBeforeMount)&&ma(f,i,e)}_&&Mn(e,null,i,`beforeMount`);let v=Li(o,g);v&&g.beforeEnter(d),r(d,t,n),((f=m&&m.onVnodeMounted)||v||_)&&Mi(()=>{try{f&&ma(f,i,e),v&&g.enter(d),_&&Mn(e,null,i,`mounted`)}finally{}},o)},E=(e,t,n,r,i)=>{if(n&&g(e,n),r)for(let t=0;t<r.length;t++)g(e,r[t]);if(i){let n=i.subTree;if(t===n||Ui(n.type)&&(n.ssContent===t||n.ssFallback===t)){let t=i.vnode;E(e,t,t.scopeId,t.slotScopeIds,i.parent)}}},D=(e,t,n,r,i,a,o,s,c=0)=>{for(let l=c;l<e.length;l++){let c=e[l]=s?da(e[l]):ua(e[l]);v(null,c,t,n,r,i,a,o,s)}},O=(e,t,n,r,i,s,c)=>{let l=t.el=e.el,{patchFlag:u,dynamicChildren:d,dirs:f}=t;u|=e.patchFlag&16;let m=e.props||o,h=t.props||o,g;if(n&&Ii(n,!1),(g=h.onVnodeBeforeUpdate)&&ma(g,n,t,e),f&&Mn(t,e,n,`beforeUpdate`),n&&Ii(n,!0),d&&(!e.dynamicChildren||e.dynamicChildren.length!==d.length)&&(u=0,c=!1,d=null),(m.innerHTML&&h.innerHTML==null||m.textContent&&h.textContent==null)&&p(l,``),d?k(e.dynamicChildren,d,l,n,r,Fi(t,i),s):c||P(e,t,l,null,n,r,Fi(t,i),s,!1),u>0){if(u&16)j(l,m,h,n,i);else if(u&2&&m.class!==h.class&&a(l,`class`,null,h.class,i),u&4&&a(l,`style`,m.style,h.style,i),u&8){let e=t.dynamicProps;for(let t=0;t<e.length;t++){let r=e[t],o=m[r],s=h[r];(s!==o||r===`value`)&&a(l,r,o,s,i,n)}}u&1&&e.children!==t.children&&p(l,t.children)}else!c&&d==null&&j(l,m,h,n,i);((g=h.onVnodeUpdated)||f)&&Mi(()=>{g&&ma(g,n,t,e),f&&Mn(t,e,n,`updated`)},r)},k=(e,t,n,r,i,a,o)=>{for(let s=0;s<t.length;s++){let c=e[s],l=t[s],u=c.el||Hi(c),d=u&&(c.type===W||!na(c,l)||c.shapeFlag&198)?m(u):n;v(c,l,d,null,r,i,a,o,!0)}},j=(e,t,n,r,i)=>{if(t!==n){if(t!==o)for(let o in t)!A(o)&&!(o in n)&&a(e,o,t[o],null,i,r);for(let o in n){if(A(o))continue;let s=n[o],c=t[o];s!==c&&o!==`value`&&a(e,o,c,s,i,r)}`value`in n&&a(e,`value`,t.value,n.value,i)}},ee=(e,t,n,i,a,o,s,c,l)=>{let d=t.el=e?e.el:u(``),f=t.anchor=e?e.anchor:u(``),{patchFlag:p,dynamicChildren:m,slotScopeIds:h}=t;h&&(c=c?c.concat(h):h),e==null?(r(d,n,i),r(f,n,i),D(t.children||[],n,f,a,o,s,c,l)):p>0&&p&64&&m&&e.dynamicChildren&&e.dynamicChildren.length===m.length?(k(e.dynamicChildren,m,n,a,o,s,c),(t.key!=null||a&&t===a.subTree)&&Ri(e,t,!0)):P(e,t,n,f,a,o,s,c,l)},M=(e,t,n,r,i,a,o,s,c)=>{t.slotScopeIds=s,e==null?t.shapeFlag&512?i.ctx.activate(t,n,r,o,c):te(t,n,r,i,a,o,c):N(e,t,c)},te=(e,t,n,r,i,a,o)=>{let s=e.component=va(e,r,i);if(fr(e)&&(s.ctx.renderer=me),Da(s,!1,o),s.asyncDep){if(i&&i.registerDep(s,ne,o,a),!e.el){let r=s.subTree=aa(Ki);b(null,r,t,n),e.placeholder=r.el}}else ne(s,e,t,n,i,a,o)},N=(e,t,n)=>{let r=t.component=e.component;if(ui(e,t,n)){if(r.asyncDep&&!r.asyncResolved){t.el=e.el,t.placeholder=e.placeholder,re(r,t,n);return}r.next=t,r.update()}else t.el=e.el,t.placeholder=e.placeholder,r.vnode=t},ne=(e,t,n,r,i,a,o)=>{let s=()=>{if(e.isMounted){let{next:t,bu:n,u:r,parent:s,vnode:c}=e;{let n=Bi(e);if(n){t&&(t.el=c.el,re(e,t,o)),n.asyncDep.then(()=>{Mi(()=>{e.isUnmounted||l()},i)});return}}let u=t,d;Ii(e,!1),t?(t.el=c.el,re(e,t,o)):t=c,n&&ie(n),(d=t.props&&t.props.onVnodeBeforeUpdate)&&ma(d,s,t,c),Ii(e,!0);let f=oi(e),p=e.subTree;e.subTree=f,v(p,f,m(p.el),I(p),e,i,a),t.el=f.el,u===null&&pi(e,f.el),r&&Mi(r,i),(d=t.props&&t.props.onVnodeUpdated)&&Mi(()=>ma(d,s,t,c),i)}else{let o,{el:s,props:c}=t,{bm:l,m:u,parent:d,root:f,type:p}=e,m=dr(t);if(Ii(e,!1),l&&ie(l),!m&&(o=c&&c.onVnodeBeforeMount)&&ma(o,d,t),Ii(e,!0),s&&ge){let t=()=>{e.subTree=oi(e),ge(s,e.subTree,e,i,null)};m&&p.__asyncHydrate?p.__asyncHydrate(s,e,t):t()}else{f.ce&&f.ce._hasShadowRoot()&&f.ce._injectChildStyle(p,e.parent?e.parent.type:void 0);let o=e.subTree=oi(e);v(null,o,n,r,e,i,a),t.el=o.el}if(u&&Mi(u,i),!m&&(o=c&&c.onVnodeMounted)){let e=t;Mi(()=>ma(o,d,e),i)}(t.shapeFlag&256||d&&dr(d.vnode)&&d.vnode.shapeFlag&256)&&e.a&&Mi(e.a,i),e.isMounted=!0,t=n=r=null}};e.scope.on();let c=e.effect=new De(s);e.scope.off();let l=e.update=c.run.bind(c),u=e.job=c.runIfDirty.bind(c);u.i=e,u.id=e.uid,c.scheduler=()=>vn(u),Ii(e,!0),l()},re=(e,t,n)=>{t.component=e;let r=e.vnode.props;e.vnode=t,e.next=null,vi(e,t.props,r,n),ji(e,t.children,n),He(),xn(e),Ue()},P=(e,t,n,r,i,a,o,s,c=!1)=>{let l=e&&e.children,u=e?e.shapeFlag:0,d=t.children,{patchFlag:f,shapeFlag:m}=t;if(f>0){if(f&128){oe(l,d,n,r,i,a,o,s,c);return}if(f&256){ae(l,d,n,r,i,a,o,s,c);return}}m&8?(u&16&&fe(l,i,a),d!==l&&p(n,d)):u&16?m&16?oe(l,d,n,r,i,a,o,s,c):fe(l,i,a,!0):(u&8&&p(n,``),m&16&&D(d,n,r,i,a,o,s,c))},ae=(e,t,n,r,i,a,o,c,l)=>{e||=s,t||=s;let u=e.length,d=t.length,f=Math.min(u,d),p=0;for(;p<f;p++){let r=t[p]=l?da(t[p]):ua(t[p]);v(e[p],r,n,null,i,a,o,c,l)}u>d?fe(e,i,a,!0,!1,f):D(t,n,r,i,a,o,c,l,f)},oe=(e,t,n,r,i,a,o,c,l)=>{let u=0,d=t.length,f=e.length-1,p=d-1;for(;u<=f&&u<=p;){let r=e[u],s=t[u]=l?da(t[u]):ua(t[u]);if(na(r,s))v(r,s,n,null,i,a,o,c,l);else break;u++}for(;u<=f&&u<=p;){let r=e[f],s=t[p]=l?da(t[p]):ua(t[p]);if(na(r,s))v(r,s,n,null,i,a,o,c,l);else break;f--,p--}if(u>f){if(u<=p){let e=p+1,s=e<d?t[e].el:r;for(;u<=p;)v(null,t[u]=l?da(t[u]):ua(t[u]),n,s,i,a,o,c,l),u++}}else if(u>p)for(;u<=f;)F(e[u],i,a,!0),u++;else{let m=u,h=u,g=new Map;for(u=h;u<=p;u++){let e=t[u]=l?da(t[u]):ua(t[u]);e.key!=null&&g.set(e.key,u)}let _,y=0,b=p-h+1,x=!1,S=0,C=Array(b);for(u=0;u<b;u++)C[u]=0;for(u=m;u<=f;u++){let r=e[u];if(y>=b){F(r,i,a,!0);continue}let s;if(r.key!=null)s=g.get(r.key);else for(_=h;_<=p;_++)if(C[_-h]===0&&na(r,t[_])){s=_;break}s===void 0?F(r,i,a,!0):(C[s-h]=u+1,s>=S?S=s:x=!0,v(r,t[s],n,null,i,a,o,c,l),y++)}let w=x?zi(C):s;for(_=w.length-1,u=b-1;u>=0;u--){let e=h+u,s=t[e],f=t[e+1],p=e+1<d?f.el||Hi(f):r;C[u]===0?v(null,s,n,p,i,a,o,c,l):x&&(_<0||u!==w[_]?se(s,n,p,2):_--)}}},se=(e,t,n,a,o=null)=>{let{el:s,type:c,transition:l,children:u,shapeFlag:d}=e;if(d&6)se(e.component.subTree,t,n,a);else if(d&128)e.suspense.move(t,n,a);else if(d&64)c.move(e,t,n,me);else if(c===W){r(s,t,n);for(let e=0;e<u.length;e++)se(u[e],t,n,a);r(e.anchor,t,n)}else if(c===qi)S(e,t,n);else if(a!==2&&d&1&&l){if(a===0)l.persisted&&!s[tr]?r(s,t,n):(l.beforeEnter(s),r(s,t,n),Mi(()=>l.enter(s),o));else{let{leave:a,delayLeave:o,afterLeave:c}=l,u=()=>{e.ctx.isUnmounted?i(s):r(s,t,n)},d=()=>{let e=s._isLeaving||!!s[tr];s._isLeaving&&s[tr](!0),l.persisted&&!e?u():a(s,()=>{u(),c&&c()})};o?o(s,u,d):d()}}else r(s,t,n)},F=(e,t,n,r=!1,i=!1)=>{let{type:a,props:o,ref:s,children:c,dynamicChildren:l,shapeFlag:u,patchFlag:d,dirs:f,cacheIndex:p,memo:m}=e;if((d===-2||l&&l.hasOnce)&&(i=!1),s!=null&&(He(),lr(s,null,n,e,!0),Ue()),p==null||e.ctx&&e.ctx!==t||(t.renderCache[p]=void 0),u&256){t.ctx.deactivate(e);return}let h=u&1&&f,g=!dr(e),_;if(g&&(_=o&&o.onVnodeBeforeUnmount)&&ma(_,t,e),u&6)de(e.component,n,r);else{if(u&128){e.suspense.unmount(n,r);return}h&&Mn(e,null,t,`beforeUnmount`),u&64?e.type.remove(e,t,n,me,r):l&&!l.hasOnce&&(a!==W||d>0&&d&64)?fe(l,t,n,!1,!0):(a===W&&d&384||!i&&u&16)&&fe(c,t,n),r&&le(e)}let v=m!=null&&p==null;(g&&(_=o&&o.onVnodeUnmounted)||h||v)&&Mi(()=>{_&&ma(_,t,e),h&&Mn(e,null,t,`unmounted`),v&&(e.el=null)},n)},le=e=>{let{type:t,el:n,anchor:r,transition:a}=e,o=t===W;if(o&&!a){ue(n,r);return}if(t===qi){C(e),a&&!a.persisted&&a.afterLeave&&a.afterLeave();return}let s=o?ar(e):e,c=()=>{o?m(n)&&ue(n,r):i(n),a&&!a.persisted&&a.afterLeave&&a.afterLeave()};if(s&&s.shapeFlag&1&&a&&!a.persisted){let{leave:e,delayLeave:t}=a,n=s.el,r=()=>e(n,c);t?t(n,c,r):r()}else c()},ue=(e,t)=>{let n;for(;e!==t;)n=h(e),i(e),e=n;i(t)},de=(e,t,n)=>{let{bum:r,scope:i,job:a,subTree:o,um:s,m:c,a:l}=e;Vi(c),Vi(l),r&&ie(r),i.stop(),a?(a.flags|=8,F(o,e,t,n)):e.vnode.el&&o&&(o.transition=e.vnode.transition,F(o,e,t,n)),s&&Mi(s,t),Mi(()=>{e.isUnmounted=!0},t)},fe=(e,t,n,r=!1,i=!1,a=0)=>{for(let o=a;o<e.length;o++)F(e[o],t,n,r,i)},I=e=>{if(e.shapeFlag&6)return I(e.component.subTree);if(e.shapeFlag&128)return e.suspense.next();let t=h(e.anchor||e.el),n=t&&t[Hn];return n?h(n):t},pe=(e,t,n)=>{wn(()=>{e==null?t._vnode&&F(t._vnode,null,null,!0):v(t._vnode||null,e,t,null,null,null,n),t._vnode=e},e&&t._vnode?void 0:e&&e.component?e.component.uid:_a())},me={p:v,um:F,m:se,r:le,mt:te,mc:D,pc:P,pbc:k,n:I,o:e},he,ge;return t&&([he,ge]=t(me)),{render:pe,hydrate:he,createApp:$r(pe,he)}}function Fi({type:e,props:t},n){return n===`svg`&&e===`foreignObject`||n===`mathml`&&e===`annotation-xml`&&t&&t.encoding&&t.encoding.includes(`html`)?void 0:n}function Ii({effect:e,job:t},n){n?(e.flags|=32,t.flags|=4):(e.flags&=-33,t.flags&=-5)}function Li(e,t){return(!e||e&&!e.pendingBranch)&&t&&!t.persisted}function Ri(e,t,n=!1){let r=e.children,i=t.children;if(g(r)&&g(i))for(let e=0;e<r.length;e++){let t=r[e],a=i[e];a.shapeFlag&1&&!a.dynamicChildren&&((a.patchFlag<=0||a.patchFlag===32)&&(a=i[e]=da(i[e]),a.el=t.el),!n&&a.patchFlag!==-2&&Ri(t,a)),a.type===Gi&&(a.patchFlag===-1&&(a=i[e]=da(a)),a.el=t.el),a.type===Ki&&!a.el&&(a.el=t.el)}}function zi(e){let t=e.slice(),n=[0],r,i,a,o,s,c=e.length;for(r=0;r<c;r++){let c=e[r];if(c!==0){if(i=n[n.length-1],e[i]<c){t[r]=i,n.push(r);continue}for(a=0,o=n.length-1;a<o;)s=a+o>>1,e[n[s]]<c?a=s+1:o=s;c<e[n[a]]&&(a>0&&(t[r]=n[a-1]),n[a]=r)}}for(a=n.length,o=n[a-1];a-->0;)n[a]=o,o=t[o];return n}function Bi(e){let t=e.subTree.component;if(t)return t.asyncDep&&!t.asyncResolved?t:Bi(t)}function Vi(e){if(e)for(let t=0;t<e.length;t++)e[t].flags|=8}function Hi(e){if(e.placeholder)return e.placeholder;let t=e.component;return t?Hi(t.subTree):null}var Ui=e=>e.__isSuspense;function Wi(e,t){t&&t.pendingBranch?g(e)?t.effects.push(...e):t.effects.push(e):bn(e)}var W=Symbol.for(`v-fgt`),Gi=Symbol.for(`v-txt`),Ki=Symbol.for(`v-cmt`),qi=Symbol.for(`v-stc`),Ji=[],Yi=null;function G(e=!1){Ji.push(Yi=e?null:[])}function Xi(){Ji.pop(),Yi=Ji[Ji.length-1]||null}var Zi=1;function Qi(e,t=!1){Zi+=e,e<0&&Yi&&t&&(Yi.hasOnce=!0)}function $i(e){return e.dynamicChildren=Zi>0?Yi||s:null,Xi(),Zi>0&&Yi&&Yi.push(e),e}function K(e,t,n,r,i,a){return $i(q(e,t,n,r,i,a,!0))}function ea(e,t,n,r,i){return $i(aa(e,t,n,r,i,!0))}function ta(e){return e?e.__v_isVNode===!0:!1}function na(e,t){return e.type===t.type&&e.key===t.key}var ra=({key:e})=>e??null,ia=({ref:e,ref_key:t,ref_for:n})=>(typeof e==`number`&&(e=``+e),e==null?null:x(e)||V(e)||b(e)?{i:Dn,r:e,k:t,f:!!n}:e);function q(e,t=null,n=null,r=0,i=null,a=e===W?0:1,o=!1,s=!1){let c={__v_isVNode:!0,__v_skip:!0,type:e,props:t,key:t&&ra(t),ref:t&&ia(t),scopeId:On,slotScopeIds:null,children:n,component:null,suspense:null,ssContent:null,ssFallback:null,dirs:null,transition:null,el:null,anchor:null,target:null,targetStart:null,targetAnchor:null,staticCount:0,shapeFlag:a,patchFlag:r,dynamicProps:i,dynamicChildren:null,appContext:null,ctx:Dn};return s?(fa(c,n),a&128&&e.normalize(c)):n&&(c.shapeFlag|=x(n)?8:16),Zi>0&&!o&&Yi&&(c.patchFlag>0||a&6)&&c.patchFlag!==32&&Yi.push(c),c}var aa=oa;function oa(e,t=null,n=null,r=0,i=null,a=!1){if(e&&e!==kr||(e=Ki),ta(e)){let r=ca(e,t,!0);return n&&fa(r,n),Zi>0&&!a&&Yi&&(r.shapeFlag&6?Yi[Yi.indexOf(e)]=r:Yi.push(r)),r.patchFlag=-2,r}if(Pa(e)&&(e=e.__vccOpts),t){t=sa(t);let{class:e,style:n}=t;e&&!x(e)&&(t.class=I(e)),C(n)&&(Ht(n)&&!g(n)&&(n=f({},n)),t.style=F(n))}let o=x(e)?1:Ui(e)?128:Un(e)?64:C(e)?4:b(e)?2:0;return q(e,t,n,r,i,o,a,!0)}function sa(e){return e?Ht(e)||gi(e)?f({},e):e:null}function ca(e,t,n=!1,r=!1){let{props:i,ref:a,patchFlag:o,children:s,transition:c}=e,l=t?pa(i||{},t):i,u={__v_isVNode:!0,__v_skip:!0,type:e.type,props:l,key:l&&ra(l),ref:t&&t.ref?n&&a?g(a)?a.concat(ia(t)):[a,ia(t)]:ia(t):a,scopeId:e.scopeId,slotScopeIds:e.slotScopeIds,children:s,target:e.target,targetStart:e.targetStart,targetAnchor:e.targetAnchor,staticCount:e.staticCount,shapeFlag:e.shapeFlag,patchFlag:t&&e.type!==W?o===-1?16:o|16:o,dynamicProps:e.dynamicProps,dynamicChildren:e.dynamicChildren,appContext:e.appContext,dirs:e.dirs,transition:c,component:e.component,suspense:e.suspense,ssContent:e.ssContent&&ca(e.ssContent),ssFallback:e.ssFallback&&ca(e.ssFallback),placeholder:e.placeholder,el:e.el,anchor:e.anchor,ctx:e.ctx,ce:e.ce,cacheIndex:e.cacheIndex};return c&&r&&ir(u,c.clone(u)),u}function J(e=` `,t=0){return aa(Gi,null,e,t)}function la(e=``,t=!1){return t?(G(),ea(Ki,null,e)):aa(Ki,null,e)}function ua(e){return e==null||typeof e==`boolean`?aa(Ki):g(e)?aa(W,null,e.slice()):ta(e)?da(e):aa(Gi,null,String(e))}function da(e){return e.el===null&&e.patchFlag!==-1||e.memo?e:ca(e)}function fa(e,t){let n=0,{shapeFlag:r}=e;if(t==null)t=null;else if(g(t))n=16;else if(typeof t==`object`){if(r&65){let n=t.default;n&&(n._c&&(n._d=!1),fa(e,n()),n._c&&(n._d=!0));return}{n=32;let r=t._;!r&&!gi(t)?t._ctx=Dn:r===3&&Dn&&(Dn.slots._===1?t._=1:(t._=2,e.patchFlag|=1024))}}else if(b(t)){if(r&65){fa(e,{default:t});return}t={default:t,_ctx:Dn},n=32}else t=String(t),r&64?(n=16,t=[J(t)]):n=8;e.children=t,e.shapeFlag|=n}function pa(...e){let t={};for(let n=0;n<e.length;n++){let r=e[n];for(let e in r)if(e===`class`)t.class!==r.class&&(t.class=I([t.class,r.class]));else if(e===`style`)t.style=F([t.style,r.style]);else if(u(e)){let n=t[e],i=r[e];i&&n!==i&&!(g(n)&&n.includes(i))?t[e]=n?[].concat(n,i):i:i==null&&n==null&&!d(e)&&(t[e]=i)}else e!==``&&(t[e]=r[e])}return t}function ma(e,t,n,r=null){on(e,t,7,[n,r])}var ha=Zr(),ga=0;function _a(){return ga}function va(e,t,n){let r=e.type,i=(t?t.appContext:e.appContext)||ha,a={uid:ga++,vnode:e,type:r,parent:t,appContext:i,root:null,next:null,subTree:null,effect:null,update:null,job:null,scope:new we(!0),render:null,proxy:null,exposed:null,exposeProxy:null,withProxy:null,provides:t?t.provides:Object.create(i.provides),ids:t?t.ids:[``,0,0],accessCache:null,renderCache:[],components:null,directives:null,propsOptions:Si(r,i),emitsOptions:ii(r,i),emit:null,emitted:null,propsDefaults:o,inheritAttrs:r.inheritAttrs,ctx:o,data:o,props:o,attrs:o,slots:o,refs:o,setupState:o,setupContext:null,suspense:n,suspenseId:n?n.pendingId:0,asyncDep:null,asyncResolved:!1,isMounted:!1,isUnmounted:!1,isDeactivated:!1,bc:null,c:null,bm:null,m:null,bu:null,u:null,um:null,bum:null,da:null,a:null,rtg:null,rtc:null,ec:null,sp:null};return a.ctx={_:a},a.root=t?t.root:a,a.emit=ni.bind(null,a),e.ce&&e.ce(a),a}var ya=null,ba=()=>ya||Dn,xa,Sa;{let e=ce(),t=(t,n)=>{let r;return(r=e[t])||(r=e[t]=[]),r.push(n),e=>{r.length>1?r.forEach(t=>t(e)):r[0](e)}};xa=t(`__VUE_INSTANCE_SETTERS__`,e=>ya=e),Sa=t(`__VUE_SSR_SETTERS__`,e=>Ea=e)}var Ca=e=>{let t=ya;return xa(e),e.scope.on(),()=>{e.scope.off(),xa(t)}},wa=()=>{ya&&ya.scope.off(),xa(null)};function Ta(e){return e.vnode.shapeFlag&4}var Ea=!1;function Da(e,t=!1,n=!1){t&&Sa(t);let{props:r,children:i}=e.vnode,a=Ta(e);_i(e,r,a,t),Ai(e,i,n||t);let o=a?Oa(e,t):void 0;return t&&Sa(!1),o}function Oa(e,t){let n=e.type;e.accessCache=Object.create(null),e.proxy=new Proxy(e.ctx,Pr);let{setup:r}=n;if(r){He();let n=e.setupContext=r.length>1?Ma(e):null,i=Ca(e),a=an(r,e,0,[e.props,n]),o=w(a);if(Ue(),i(),(o||e.sp)&&!dr(e)&&or(e),o){if(a.then(wa,wa),t)return a.then(n=>{Sa(!0);try{ka(e,n,t)}finally{Sa(!1)}}).catch(t=>{sn(t,e,0)});e.asyncDep=a}else ka(e,a,t)}else Aa(e,t)}function ka(e,t,n){b(t)?e.type.__ssrInlineRender?e.ssrRender=t:e.render=t:C(t)&&(e.setupState=Yt(t)),Aa(e,n)}function Aa(e,t,n){let r=e.type;e.render||=r.render||c;{let t=Ca(e);He();try{Lr(e)}finally{Ue(),t()}}}var ja={get(e,t){return $e(e,`get`,``),e[t]}};function Ma(e){return{attrs:new Proxy(e.attrs,ja),slots:e.slots,emit:e.emit,expose:t=>{e.exposed=t||{}}}}function Na(e){return e.exposed?e.exposeProxy||=new Proxy(Yt(Ut(e.exposed)),{get(t,n){if(n in t)return t[n];if(n in Mr)return Mr[n](e)},has(e,t){return t in e||t in Mr}}):e.proxy}function Pa(e){return b(e)&&`__vccOpts`in e}var Fa=(e,t)=>Zt(e,t,Ea),Ia=`3.5.44`,La=void 0,Ra=typeof window<`u`&&window.trustedTypes;if(Ra)try{La=Ra.createPolicy(`vue`,{createHTML:e=>e})}catch{}var za=La?e=>La.createHTML(e):e=>e,Ba=`http://www.w3.org/2000/svg`,Va=`http://www.w3.org/1998/Math/MathML`,Ha=typeof document<`u`?document:null,Ua=Ha&&Ha.createElement(`template`),Wa={insert:(e,t,n)=>{t.insertBefore(e,n||null)},remove:e=>{let t=e.parentNode;t&&t.removeChild(e)},createElement:(e,t,n,r)=>{let i=t===`svg`?Ha.createElementNS(Ba,e):t===`mathml`?Ha.createElementNS(Va,e):n?Ha.createElement(e,{is:n}):Ha.createElement(e);return e===`select`&&r&&r.multiple!=null&&i.setAttribute(`multiple`,r.multiple),i},createText:e=>Ha.createTextNode(e),createComment:e=>Ha.createComment(e),setText:(e,t)=>{e.nodeValue=t},setElementText:(e,t)=>{e.textContent=t},parentNode:e=>e.parentNode,nextSibling:e=>e.nextSibling,querySelector:e=>Ha.querySelector(e),setScopeId(e,t){e.setAttribute(t,``)},insertStaticContent(e,t,n,r,i,a){let o=n?n.previousSibling:t.lastChild;if(i&&(i===a||i.nextSibling))for(;t.insertBefore(i.cloneNode(!0),n),i!==a&&(i=i.nextSibling););else{Ua.innerHTML=za(r===`svg`?`<svg>${e}</svg>`:r===`mathml`?`<math>${e}</math>`:e);let i=Ua.content;if(r===`svg`||r===`mathml`){let e=i.firstChild;for(;e.firstChild;)i.appendChild(e.firstChild);i.removeChild(e)}t.insertBefore(i,n)}return[o?o.nextSibling:t.firstChild,n?n.previousSibling:t.lastChild]}},Ga=Symbol(`_vtc`);function Ka(e,t,n){let r=e[Ga];r&&(t=(t?[t,...r]:[...r]).join(` `)),t==null?e.removeAttribute(`class`):n?e.setAttribute(`class`,t):e.className=t}var qa=Symbol(`_vod`),Ja=Symbol(`_vsh`),Ya={name:`show`,beforeMount(e,{value:t},{transition:n}){e[qa]=e.style.display===`none`?``:e.style.display,n&&t?n.beforeEnter(e):Xa(e,t)},mounted(e,{value:t},{transition:n}){n&&t&&n.enter(e)},updated(e,{value:t,oldValue:n},{transition:r}){!t!=!n&&(r?t?(r.beforeEnter(e),Xa(e,!0),r.enter(e)):r.leave(e,()=>{Xa(e,!1)}):Xa(e,t))},beforeUnmount(e,{value:t}){Xa(e,t)}};function Xa(e,t){e.style.display=t?e[qa]:`none`,e[Ja]=!t}var Za=Symbol(``),Qa=/(?:^|;)\s*display\s*:/;function $a(e,t,n){let r=e.style,i=x(n),a=!1;if(n&&!i){if(t){if(x(t))for(let e of t.split(`;`)){let t=e.slice(0,e.indexOf(`:`)).trim();n[t]??to(r,t,``)}else for(let e in t)n[e]??to(r,e,``)}for(let i in n){i===`display`&&(a=!0);let o=n[i];o==null?to(r,i,``):ao(e,i,!x(t)&&t?t[i]:void 0,o)||to(r,i,o)}}else if(i){if(t!==n){let e=r[Za];e&&(n+=`;`+e),r.cssText=n,a=Qa.test(n)}}else t&&e.removeAttribute(`style`);qa in e&&(i&&t===n||(e[qa]=a?r.display:``),e[Ja]&&(r.display=`none`))}var eo=/\s*!important$/;function to(e,t,n){if(g(n))n.forEach(n=>to(e,t,n));else if(n??=``,t.startsWith(`--`))eo.test(n)?e.setProperty(t,n.replace(eo,``),`important`):e.setProperty(t,n);else{let r=io(e,t);eo.test(n)?e.setProperty(N(r),n.replace(eo,``),`important`):e[r]=n}}var no=[`Webkit`,`Moz`,`ms`],ro={};function io(e,t){let n=ro[t];if(n)return n;let r=M(t);if(r!==`filter`&&r in e)return ro[t]=r;r=ne(r);for(let n=0;n<no.length;n++){let i=no[n]+r;if(i in e)return ro[t]=i}return t}function ao(e,t,n,r){return e.tagName===`TEXTAREA`&&(t===`width`||t===`height`)&&x(r)&&n===r}var oo=`http://www.w3.org/1999/xlink`;function so(e,t,n,r,i,a=pe(t)){r&&t.startsWith(`xlink:`)?n==null?e.removeAttributeNS(oo,t.slice(6,t.length)):e.setAttributeNS(oo,t,n):n==null||a&&!me(n)?e.removeAttribute(t):e.setAttribute(t,a?``:S(n)?String(n):n)}function co(e,t,n,r,i){if(t===`innerHTML`||t===`textContent`){n!=null&&(e[t]=t===`innerHTML`?za(n):n);return}let a=e.tagName;if(t===`value`&&a!==`PROGRESS`&&!a.includes(`-`)){let r=a===`OPTION`?e.getAttribute(`value`)||``:e.value,i=n==null?e.type===`checkbox`?`on`:``:String(n);r===i&&`_value`in e||(e.value=i),n??e.removeAttribute(t),e._value=n;return}let o=!1;if(n===``||n==null){let r=typeof e[t];r===`boolean`?n=me(n):n==null&&r===`string`?(n=``,o=!0):r===`number`&&(n=0,o=!0)}try{e[t]=n}catch{}o&&e.removeAttribute(i||t)}function lo(e,t,n,r){e.addEventListener(t,n,r)}function uo(e,t,n,r){e.removeEventListener(t,n,r)}var fo=Symbol(`_vei`);function po(e,t,n,r,i=null){let a=e[fo]||(e[fo]={}),o=a[t];if(r&&o)o.value=r;else{let[n,s]=go(t);r?lo(e,n,a[t]=bo(r,i),s):o&&(uo(e,n,o,s),a[t]=void 0)}}var mo=/(Once|Passive|Capture)$/,ho=/^on:?(?:Once|Passive|Capture)$/;function go(e){let t,n;for(;(n=e.match(mo))&&!ho.test(e);)t||={},e=e.slice(0,e.length-n[1].length),t[n[1].toLowerCase()]=!0;return[e[2]===`:`?e.slice(3):N(e.slice(2)),t]}var _o=0,vo=Promise.resolve(),yo=()=>_o||=(vo.then(()=>_o=0),Date.now());function bo(e,t){let n=e=>{if(!e._vts)e._vts=Date.now();else if(e._vts<=n.attached)return;let r=n.value;if(g(r)){let n=e.stopImmediatePropagation;e.stopImmediatePropagation=()=>{n.call(e),e._stopped=!0};let i=r.slice(),a=[e];for(let n=0;n<i.length&&!e._stopped;n++){let e=i[n];e&&on(e,t,5,a)}}else on(r,t,5,[e])};return n.value=e,n.attached=yo(),n}var xo=e=>e.charCodeAt(0)===111&&e.charCodeAt(1)===110&&e.charCodeAt(2)>96&&e.charCodeAt(2)<123,So=(e,t,n,r,i,a)=>{let o=i===`svg`;t===`class`?Ka(e,r,o):t===`style`?$a(e,n,r):u(t)?d(t)||po(e,t,n,r,a):(t[0]===`.`?(t=t.slice(1),1):t[0]===`^`?(t=t.slice(1),0):Co(e,t,r,o))?(co(e,t,r),e.tagName.includes(`-`)||t!==`value`&&t!==`checked`&&t!==`selected`||so(e,t,r,o,a,t!==`value`)):e._isVueCE&&(wo(e,t)||e._def.__asyncLoader&&(/[A-Z]/.test(t)||!x(r)))?co(e,M(t),r,a,t):(t===`true-value`?e._trueValue=r:t===`false-value`&&(e._falseValue=r),so(e,t,r,o))};function Co(e,t,n,r){if(r)return!!(t===`innerHTML`||t===`textContent`||t in e&&xo(t)&&b(n));if(t===`spellcheck`||t===`draggable`||t===`translate`||t===`autocorrect`||t===`sandbox`&&e.tagName===`IFRAME`||t===`form`||t===`list`&&e.tagName===`INPUT`||t===`type`&&e.tagName===`TEXTAREA`)return!1;if(t===`width`||t===`height`){let t=e.tagName;if(t===`IMG`||t===`VIDEO`||t===`CANVAS`||t===`SOURCE`)return!1}return xo(t)&&x(n)?!1:t in e}function wo(e,t){let n=e._def.props;if(!n)return!1;let r=M(t);return Array.isArray(n)?n.some(e=>M(e)===r):Object.keys(n).some(e=>M(e)===r)}var To=e=>{let t=e.props[`onUpdate:modelValue`]||!1;return g(t)?e=>ie(t,e):t};function Eo(e){e.target.composing=!0}function Do(e){let t=e.target;t.composing&&(t.composing=!1,t.dispatchEvent(new Event(`input`)))}var Oo=Symbol(`_assign`),ko=Symbol(`_initialValue`);function Ao(e,t,n){return t&&(e=e.trim()),n&&(e=oe(e)),e}var jo={created(e,{modifiers:{lazy:t,trim:n,number:r}},i){e.parentNode&&(e.type===`text`?e[ko]=e.defaultValue.replace(/[\r\n]/g,``):e.type===`textarea`&&(e[ko]=e.defaultValue.replace(/\r\n?/g,`
`))),e[Oo]=To(i);let a=r||i.props&&i.props.type===`number`;lo(e,t?`change`:`input`,t=>{t.target.composing||e[Oo](Ao(e.value,n,a))}),(n||a)&&lo(e,`change`,()=>{e.value=Ao(e.value,n,a)}),t||(lo(e,`compositionstart`,Eo),lo(e,`compositionend`,Do),lo(e,`change`,Do))},mounted(e,{value:t,modifiers:{trim:n,number:r}}){let i=t??``,a=e[ko];delete e[ko],a!==void 0&&(e.type===`text`||e.type===`textarea`)&&e.value!==a?e[Oo](Ao(e.value,n,r)):e.value=i},beforeUpdate(e,{value:t,oldValue:n,modifiers:{lazy:r,trim:i,number:a}},o){if(e[Oo]=To(o),e.composing)return;let s=(a||e.type===`number`)&&!/^0\d/.test(e.value)?oe(e.value):e.value,c=t??``;if(s===c)return;let l=e.getRootNode();(l instanceof Document||l instanceof ShadowRoot)&&l.activeElement===e&&e.type!==`range`&&(r&&t===n||i&&e.value.trim()===c)||(e.value=c)}},Mo={created(e,{value:t},n){e.checked=ye(t,n.props.value),e[Oo]=To(n),lo(e,`change`,()=>{e[Oo](Io(e))})},beforeUpdate(e,{value:t,oldValue:n},r){e[Oo]=To(r),t!==n&&(e.checked=ye(t,r.props.value))}},No={deep:!0,created(e,{value:t,modifiers:{number:n}},r){e._modelValue=t,lo(e,`change`,()=>{let t=Array.prototype.filter.call(e.options,e=>e.selected).map(e=>n?oe(Io(e)):Io(e)),r=e.multiple,i=r?v(e._modelValue)?new Set(t):t:t[0],a=e._pendingValue=[r,r?g(i)?t.slice():t:i];try{e[Oo](i)}finally{gn(()=>{e._pendingValue===a&&(e._pendingValue=void 0)})}}),e[Oo]=To(r)},mounted(e,{value:t}){Fo(e,t)},beforeUpdate(e,{value:t},n){e._modelValue=t,e[Oo]=To(n)},updated(e,{value:t}){let n=e._pendingValue;e._pendingValue=void 0,n&&n[0]===e.multiple&&Po(t,n[1],n[0])||Fo(e,t)}};function Po(e,t,n){if(!n||g(e))return ye(e,t);if(v(e)){if(e.size!==t.length)return!1;for(let n of t)if(!e.has(n))return!1;return!0}return!1}function Fo(e,t){let n=e.multiple,r=g(t);if(!n||r||v(t)){for(let i=0,a=e.options.length;i<a;i++){let a=e.options[i],o=Io(a);if(n){if(r){let e=typeof o;a.selected=e===`string`||e===`number`?t.some(e=>String(e)===String(o)):be(t,o)>-1}else a.selected=t.has(o)}else if(ye(Io(a),t)){e.selectedIndex!==i&&(e.selectedIndex=i);return}}!n&&e.selectedIndex!==-1&&(e.selectedIndex=-1)}}function Io(e){return`_value`in e?e._value:e.value}var Lo=[`ctrl`,`shift`,`alt`,`meta`],Ro={stop:e=>e.stopPropagation(),prevent:e=>e.preventDefault(),self:e=>e.target!==e.currentTarget,ctrl:e=>!e.ctrlKey,shift:e=>!e.shiftKey,alt:e=>!e.altKey,meta:e=>!e.metaKey,left:e=>`button`in e&&e.button!==0,middle:e=>`button`in e&&e.button!==1,right:e=>`button`in e&&e.button!==2,exact:(e,t)=>Lo.some(n=>e[`${n}Key`]&&!t.includes(n))},Y=(e,t)=>{if(!e)return e;let n=e._withMods||={},r=t.join(`.`);return n[r]||(n[r]=((n,...r)=>{for(let e=0;e<t.length;e++){let r=Ro[t[e]];if(r&&r(n,t))return}return e(n,...r)}))},zo={esc:`escape`,space:` `,up:`arrow-up`,left:`arrow-left`,right:`arrow-right`,down:`arrow-down`,delete:`backspace`},Bo=(e,t)=>{let n=e._withKeys||={},r=t.join(`.`);return n[r]||(n[r]=(n=>{if(!(`key`in n))return;let r=N(n.key);if(t.some(e=>e===r||zo[e]===r))return e(n)}))},Vo=f({patchProp:So},Wa),Ho;function Uo(){return Ho||=Ni(Vo)}var Wo=((...e)=>{let t=Uo().createApp(...e),{mount:n}=t;return t.mount=e=>{let r=Ko(e);if(!r)return;let i=t._component;b(i)||i.render||i.template||(i.template=r.innerHTML),r.nodeType===1&&(r.textContent=``);let a=n(r,!1,Go(r));return r instanceof Element&&(r.removeAttribute(`v-cloak`),r.setAttribute(`data-v-app`,``)),a},t});function Go(e){if(e instanceof SVGElement)return`svg`;if(typeof MathMLElement==`function`&&e instanceof MathMLElement)return`mathml`}function Ko(e){return x(e)?document.querySelector(e):e}var X=Ft({categoryIcon:!0,iconSource:0,settingPanelOpen:!1,settingsRevision:0,toastText:``,toastVisible:!1,toastActionLabel:``}),qo=null,Jo=null,Yo=0;function Xo(){X.toastVisible=!1,X.toastActionLabel=``,Jo=null,Yo=0}function Z(e,t=1500,n=null,{priority:r}={}){let i=r??+!!n;X.toastVisible&&i<Yo||(X.toastText=e,X.toastVisible=!0,X.toastActionLabel=n?.label||``,Jo=n?.onClick||null,Yo=i,clearTimeout(qo),qo=setTimeout(Xo,t))}function Zo(){let e=Jo;e&&(clearTimeout(qo),Xo(),e())}function Qo(){X.settingPanelOpen=!0}function $o(){X.settingPanelOpen=!1}var es=null,ts=null;function ns(){if(es!==null)return es;try{let e=document.createElement(`div`);document.documentElement.appendChild(e),e.style.setProperty(`position`,`fixed`),es=!e.getAttribute(`style`),e.remove()}catch{es=!1}return es}function rs(){if(ts)return ts;let e=document.querySelector(`style[nonce], script[nonce]`),t=e?.nonce||e?.getAttribute(`nonce`)||``;return t&&(ts=t),t}function is(){ts=null}var as=`prod`,os=`sej-shadow-host`,ss=`#sej-shadow-host, #sej-shadow-host-dev`,cs={prod:0,dev:1},ls=8,us=43,Q=null,ds=null,fs=[],ps=new Set;function ms(){return typeof CSSStyleSheet<`u`&&typeof ShadowRoot<`u`&&`replaceSync`in CSSStyleSheet.prototype&&`adoptedStyleSheets`in ShadowRoot.prototype}function hs(){return Q||(Q=document.createElement(`div`),Q.id=os,Q.dataset.sejInstance=as,ds=Q.attachShadow({mode:`open`})),ds}function gs(){return Q||hs(),Q}var _s=null;function vs(){return ds||hs(),_s||(_s=document.createElement(`div`),_s.id=`sej-drop-lists`,ds.appendChild(_s)),_s}function ys(e,t=`beforeend`){return Q||hs(),Q.parentNode&&Q.parentNode.removeChild(Q),t===`beforebegin`?e.parentNode.insertBefore(Q,e):t===`afterbegin`?e.firstChild?e.insertBefore(Q,e.firstChild):e.appendChild(Q):t===`beforeend`?e.appendChild(Q):t===`afterend`?e.nextSibling?e.parentNode.insertBefore(Q,e.nextSibling):e.parentNode.appendChild(Q):document.body.appendChild(Q),Q}function bs(e){if(!e||ps.has(e))return;if(ps.add(e),ds||hs(),ms())try{let t=new CSSStyleSheet;t.replaceSync(e),fs.push(t),ds.adoptedStyleSheets=[...ds.adoptedStyleSheets,t];return}catch(e){console.warn(`Constructable stylesheet 注入失败，回退到 <style> 注入`,e)}let t=document.createElement(`style`),n=rs();n&&t.setAttribute(`nonce`,n),t.textContent=e,ds.appendChild(t)}function xs(){Q?.parentNode&&Q.parentNode.removeChild(Q),Q=null,ds=null,_s=null,fs.length=0,ps.clear(),Ds=null,Os=``,is()}function Ss(){return Array.from(document.querySelectorAll(ss))}function Cs(e){return e.shadowRoot?.querySelector(`#sej-container`)||null}function ws(e){if(e.style.position===`fixed`)return!0;let t=Cs(e);return!!t&&getComputedStyle(t).position===`fixed`}function Ts(e){let t=e.getBoundingClientRect();if(t.height>.5)return t.height;let n=Cs(e);return n?n.getBoundingClientRect().height:0}function Es(){if(!Q)return 0;let e=cs.prod??0,t=0;for(let n of Ss())n!==Q&&((cs[n.dataset.sejInstance]??0)>=e||!ws(n)||(t+=Ts(n)+ls));return Math.round(t)}var Ds=null,Os=``;function ks(e){if(e!==Os){if(ds||hs(),!Ds){if(ms())try{Ds=new CSSStyleSheet,Ds.replaceSync(``),ds.adoptedStyleSheets=[...ds.adoptedStyleSheets,Ds]}catch{Ds=null}if(!Ds){Ds=document.createElement(`style`);let e=rs();e&&Ds.setAttribute(`nonce`,e),ds.appendChild(Ds)}}typeof Ds.replaceSync==`function`?Ds.replaceSync(e):Ds.textContent=e,Os=e}}function As(){if(!ds)return;let e=Es(),t=Ss().length>1?us:0,n=[];e>0&&n.push(`#sej-container.selectSearch { top: calc(2px + ${e}px); }`),t>0&&n.push(`#iqixn-global-tip { bottom: calc(5% + ${t}px); }`),ks(n.join(`
`))}var js=t({default:()=>Ms}),Ms=[{enabled:!0,url:/^https?:\/\/music\.163\.com\/.*?#\/search/i,hosts:[`music.163.com`],fixedTop:0,insertIntoDoc:{keyword:function(){return decodeURI(document.URL.match(/s=(.+?)(&|$)/)[1])},target:`css;.m-subnav.m-subnav-up.f-pr.j-tflag`,where:`afterEnd`},style:`
      margin: auto;
      top: 3px;
    `}],Ns=t({default:()=>Ps}),Ps=[{enabled:!0,url:/^https?:\/\/www\.baidu\.com\/(?:s|baidu)/,hosts:[`www.baidu.com`],fixedTop:80,insertIntoDoc:{keyword:`css;input#kw`,target:`css;#wrapper_wrapper`,where:`afterBegin`},style:`
      margin-top: 8px;
      z-index: 101;
      margin: 0 var(--container-left-gap);
    `,stylish:`
      .headBlock,
      .se_common_hint {
        display: none !important;
      }
      #wrapper > .result-molecule {
        z-index: 300 !important;
      }
    `}],Fs=t({default:()=>Is}),Is=[{enabled:!0,url:/^https?:\/\/search\.bilibili\.com\/*/,hosts:[`search.bilibili.com`],fixedTop:65,insertIntoDoc:{keyword:function(){return document.querySelector(`#search-keyword`)?document.querySelector(`#search-keyword`).value:document.querySelector(`.search-input-el`).value},target:function(){return document.querySelector(`.head-contain`)?document.querySelector(`.head-contain`):document.querySelector(`.search-input`)},where:`afterEnd`},style:`
      width: 980px;
      margin: 10px auto 10px;
    `}],Ls=t({default:()=>Rs}),Rs=[{enabled:!0,url:/^https?:\/\/[^.]*\.bing\.com\/search/,hostSuffixes:[`bing.com`],fixedTop:60,insertIntoDoc:{keyword:`css;#sb_form_q`,target:`css;#b_content`,where:`beforeBegin`},style:`
      margin: 2px 0 2px;
      left: 160px;
    `,patches:{narrowFullWidth:!0,constrainToViewport:!0}},{enabled:!0,url:/^https?:\/\/.*\.bing\.com\/images\/search/i,hostSuffixes:[`bing.com`],fixedTop:88,insertIntoDoc:{keyword:`css;#sb_form_q`,target:`css;#b_content`,where:`afterBegin`},style:`
      left: 160px;
      margin-top: 15px;
    `},{enabled:!0,url:/^https?:\/\/.*\.bing\.com\/dict\/search\?q=/i,hostSuffixes:[`bing.com`],insertIntoDoc:{keyword:`css;#sb_form_q`,target:`css;#b_header`,where:`beforeEnd`},style:`
      margin-top: 6px;
      left: 148px;
    `}],zs=t({default:()=>Bs}),Bs=[{enabled:!0,url:/^https?:\/\/dict\.cn\/./,hosts:[`dict.cn`],insertIntoDoc:{keyword:`css;#q`,target:`css;.main`,where:`afterBegin`},style:`
      z-index: 99;
      text-align: center;
    `}],Vs=t({default:()=>Hs}),Hs=[{enabled:!0,url:/^https?:\/\/share\.dmhy\.org\/topics\/list\?keyword=/i,hosts:[`share.dmhy.org`],insertIntoDoc:{keyword:`css;#keyword`,target:`css;.table.clear`,where:`beforeBegin`},style:`
      text-align: center;
    `}],Us=t({default:()=>Ws}),Ws=[{enabled:!0,url:/^https?:\/\/www\.douban\.com\/search/i,hosts:[`www.douban.com`],insertIntoDoc:{keyword:`css;#content > div > div.article > div.mod-search > form > fieldset > div.inp > input`,target:`css;#content > div > div.article > div.mod-search`,where:`afterEnd`},style:`
      margin: -1em 0 1em 7em;
      position: sticky;
      top: 0.1em;
    `}],Gs=t({default:()=>Ks}),Ks=[{enabled:!0,url:/^https?:\/\/www\.google(?:\.[A-z]{2,3}){1,2}\/[^?]+\?(?!tbm=)(?:&?q=|(?:[^#](?!&tbm=))+?&q=)(?:.(?!&tbm=))*$|(^https?:\/\/xn--flw351e\.ml\/search\?q=)/,hosts:[`xn--flw351e.ml`],hostPattern:/^www\.google(?:\.[a-z]{2,3}){1,2}$/i,fixedTop:56,insertIntoDoc:{target:`css;#appbar`,keyword:`css;[name=q]`,where:`beforeBegin`},class:`s6JM6d`,wrapperClass:`YNk70c`,style:`
      z-index: 100;
      margin: 2px 0 2px;
      grid-column: 2 / -2;
    `,stylish:`#appbar.hdtb-ab-o{height:0px !important;} #hdtbMenus{position:unset} #sej-container-wrapper{display:grid !important}`,patches:{narrowFullWidth:!0,constrainToViewport:!0,narrowMaxWidthInPixels:!0,getFixedHeaderBottom({bottom:e,barLeft:t,barWidth:n,inputTarget:r}){let i=typeof r==`function`?r():r,a=i instanceof Element?i.closest(`form`)||i:null;if(!a)return e;let o=!1;for(let e=a;e&&e!==document.documentElement;e=e.parentElement){let t=getComputedStyle(e).position;if(t===`fixed`||t===`sticky`){o=!0;break}}let s=a.getBoundingClientRect(),c=s.right>t&&s.left<t+n;return o&&c&&s.top<window.innerHeight*.5&&s.bottom>e&&s.bottom<window.innerHeight*.5?s.bottom:e}}}],qs=t({default:()=>Js}),Js=[{enabled:!0,url:/^https?:\/\/.*\.?moegirl\.org\.cn/i,hostSuffixes:[`moegirl.org.cn`],fixedTop:52,insertIntoDoc:{keyword:`css;#firstHeading`,target:`css;#moe-topbanner-container`,where:`afterEnd`},style:`
      margin: -0.8em auto 0;
      z-index: 3;
      width: 1200px !important;
      top: 12px;
    `}],Ys=t({default:()=>Xs}),Xs=[{enabled:!0,url:/^https?:.*?runoob\.com\//i,hostSuffixes:[`runoob.com`],insertIntoDoc:{keyword:function(){var e=window.location.href.substring(window.location.href.lastIndexOf(`=`)+1);return decodeURIComponent(e)},target:`css;.main>.row`,where:`afterBegin`},style:`
      border-bottom: 1px solid #E5E5E5;
      border-top: 1px solid #E5E5E5;
      position: relative;
      text-align: center;
      margin: 0 auto 2em;
    `}],Zs=t({default:()=>Qs}),Qs=[{enabled:!0,url:/^https?:\/\/www\.sogou\.com\/(?:web|s)/,hosts:[`www.sogou.com`],fixedTop:60,insertIntoDoc:{keyword:`css;#upquery`,target:`css;#wrapper`,where:`afterBegin`},style:`
      top: -40px;
      z-index: 99;
      left: -5px;
    `,stylish:`#float_uphint{display:none;}`}],$s=t({default:()=>ec}),ec=[{enabled:!0,url:/^https?:\/\/stackoverflow\.com\/search\?/i,hosts:[`stackoverflow.com`],fixedTop:50,insertIntoDoc:{keyword:`css; #search > div > input`,target:`css;body > div.container`,where:`beforeBegin`},style:`width: min(100%, 1264px) !important;position: sticky;top: 50px;z-index:1001;margin:auto`}],tc=t({default:()=>nc}),nc=[{enabled:!0,url:/^https?:\/\/dict\.youdao\.com\/search/i,hosts:[`dict.youdao.com`],fixedTop:94,insertIntoDoc:{keyword:`css;#query`,target:`css;#container`,where:`beforeBegin`},style:`
      margin: auto;
    `}],rc=t({default:()=>ic}),ic=[{enabled:!0,url:/^https?:\/\/www\.zhihu\.com\/search\?/i,hosts:[`www.zhihu.com`],fixedTop:52,insertIntoDoc:{keyword:`css;.Input`,target:`css;.Search-container`,where:`beforeBegin`},style:`
      margin: 10px auto 0px;
      width: 1000px !important;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,style_ZhihuChenglinz:`
      margin: 10px auto 0px;
      width: 654px;
      z-index: 19;
      background: #fff;
      box-shadow: 0 1px 3px 0 rgba(0,34,77,.05);
    `,stylish:`.TopSearch.Card{margin:30px auto;}`}];function ac(e){let t=new Map,n=[],r=[],i=[];for(let a of e){let e=a.hosts||[],o=a.hostSuffixes||[];for(let n of e){let e=n.toLowerCase(),r=t.get(e);r?r.push(a):t.set(e,[a])}for(let e of o)n.push({suffix:e.toLowerCase(),rule:a});a.hostPattern instanceof RegExp&&r.push({pattern:a.hostPattern,rule:a}),e.length||o.length||a.hostPattern instanceof RegExp||i.push(a)}return n.sort((e,t)=>t.suffix.length-e.suffix.length),function(e){let a;try{a=new URL(e).hostname.toLowerCase()}catch{return null}let o=[],s=e=>{e&&o.push(...e)};s(t.get(a));for(let{suffix:e,rule:t}of n)(a===e||a.endsWith(`.${e}`))&&o.push(t);for(let{pattern:e,rule:t}of r)e.lastIndex=0,e.test(a)&&o.push(t);s(i);let c=new Set;for(let t of o)if(!c.has(t)&&(c.add(t),t.url.lastIndex=0,t.url.test(e)))return t;return null}}var oc=ac(Object.entries(Object.assign({"./sites/163.js":js,"./sites/baidu.js":Ns,"./sites/bilibili.js":Fs,"./sites/bing.js":Ls,"./sites/dict.js":zs,"./sites/dmhy.org.js":Vs,"./sites/douban.js":Us,"./sites/google.js":Gs,"./sites/moegirl.js":qs,"./sites/runoob.js":Ys,"./sites/sogou.js":Zs,"./sites/stackoverflow.js":$s,"./sites/youdao.js":tc,"./sites/zhihu.js":rc})).sort(([e],[t])=>e.localeCompare(t)).flatMap(([,e])=>Array.isArray(e.default)?e.default:[e.default]).filter(Boolean)),sc=typeof GM_addStyle<`u`?GM_addStyle:void 0,cc=typeof GM_getValue<`u`?GM_getValue:void 0,lc=typeof GM_info<`u`?GM_info:void 0,uc=typeof GM_openInTab<`u`?GM_openInTab:void 0,dc=typeof GM_registerMenuCommand<`u`?GM_registerMenuCommand:void 0,fc=typeof GM_setValue<`u`?GM_setValue:void 0,pc=typeof GM_xmlhttpRequest<`u`?GM_xmlhttpRequest:void 0,mc=`sej:storage:`,hc=`:updatedAt`,gc=`sej:probe:`+Date.now(),_c=!1;function vc(e){return e!=null}function yc(e){try{return JSON.parse(JSON.stringify(e))}catch{return e}}function bc(){return typeof globalThis<`u`?globalThis.GM:void 0}function xc(){return typeof GM_getValue==`function`&&typeof GM_setValue==`function`}function Sc(){let e=bc();return!!(e&&typeof e.getValue==`function`&&typeof e.setValue==`function`)}function Cc(e){try{let t=localStorage.getItem(mc+e);return t===null?void 0:JSON.parse(t)}catch{return}}function wc(e,t){try{return localStorage.setItem(mc+e,JSON.stringify(t)),!0}catch(e){return console.warn(`[SEJ] localStorage 写入失败，回退内存存储`,e),!1}}function Tc(){_c||(_c=!0,console.warn(`[SEJ] 未检测到可用的脚本管理器存储（GM_getValue/GM.setValue），已改用 localStorage：配置仅在当前站点生效，跳转到其他网站会回到默认设置。`))}async function Ec(){if(!xc())return!1;try{let e=String(Math.random());return GM_setValue(gc,e),GM_getValue(gc)===e}catch{return!1}finally{try{typeof GM_deleteValue==`function`&&GM_deleteValue(gc)}catch{}}}async function Dc(){if(!Sc())return!1;let e=bc();try{let t=String(Math.random());return await e.setValue(gc,t),await e.getValue(gc)===t}catch{return!1}finally{try{await e.deleteValue?.(gc)}catch{}}}async function Oc(){return await Ec()?`gm-sync`:await Dc()?`gm-async`:(Tc(),`local`)}var kc=new Map,Ac=new Map,jc=new Set,Mc=new Map,Nc=new Map,Pc=`local`,Fc=null;function Ic(e,t,n=!1){vc(t)&&Mc.set(e,n?t:yc(t))}function Lc(e,t){try{return Rc(e,t)}catch{return!1}}function Rc(e,t){if(e===t)return!0;if(typeof e!=`object`||typeof t!=`object`||!e||!t)return!1;let n=Array.isArray(e);if(n!==Array.isArray(t))return!1;if(n){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!Rc(e[n],t[n]))return!1;return!0}let r=Object.keys(e);if(r.length!==Object.keys(t).length)return!1;for(let n of r)if(!Object.prototype.hasOwnProperty.call(t,n)||!Rc(e[n],t[n]))return!1;return!0}async function zc(e){let t=bc();await Promise.all(e.map(async e=>{try{let n=await t.getValue(e);if(jc.add(e),vc(n)){Ac.set(e,n),Ic(e,n);return}let r=Cc(e);vc(r)&&(Ac.set(e,r),Ic(e,r),await t.setValue(e,yc(r)))}catch(t){console.warn(`[SEJ] 读取 GM 存储失败`,e,t)}}))}function Bc(e=[]){return Fc||=(async()=>{if(Pc=await Oc(),Pc===`gm-async`&&await zc(e),Pc===`gm-sync`)for(let t of e)try{let e=cc(t);vc(e)&&Ic(t,e)}catch(e){console.warn(`[SEJ] 读取 GM 存储失败`,t,e)}return console.info(`[SEJ] 设置存储后端：${Pc}`),Pc})(),Fc}function Vc(e,t){if(Pc===`gm-sync`)try{let n=cc(e);if(vc(n)){let t=yc(n);return Ic(e,t,!0),t}return t}catch(n){return Mc.delete(e),console.warn(`[SEJ] GM_getValue 失败，使用默认值`,n),t}if(Pc===`gm-async`){if(Ac.has(e))return yc(Ac.get(e));if(jc.has(e))return t}if(Pc===`local`){let t=Cc(e);if(vc(t))return t;if(kc.has(e))return yc(kc.get(e))}return t}function Hc(e,t){let n=Date.now(),r=yc(t),i=`memory`;if(Pc===`gm-sync`)try{fc(e,r),fc(e+hc,n),i=`gm`}catch(e){console.warn(`[SEJ] GM_setValue 失败，尝试 localStorage`,e)}else if(Pc===`gm-async`){Ac.set(e,r),jc.add(e);let t=bc();try{Promise.resolve(t.setValue(e,r)).catch(t=>{console.warn(`[SEJ] GM.setValue 失败，退回 localStorage`,t),wc(e,r),wc(e+hc,n)}),Promise.resolve(t.setValue(e+hc,n)).catch(()=>{}),i=`gm`}catch(e){console.warn(`[SEJ] GM.setValue 失败`,e)}}return i===`gm`&&Nc.set(e,n),Ic(e,r,!0),(Pc===`local`||i===`memory`)&&(wc(e,r)?(wc(e+hc,n),i===`memory`&&(i=`local`)):i===`memory`&&kc.set(e,r)),i}function Uc(e,t){let n=[],r=bc(),i=n=>{if(!vc(n))return;let r=yc(n);Ac.set(e,r),jc.add(e),Ic(e,r,!0),Nc.delete(e),t(r)},a=typeof GM_addValueChangeListener==`function`?GM_addValueChangeListener:r&&typeof r.addValueChangeListener==`function`?r.addValueChangeListener.bind(r):null;if(a)try{let t=a(e,(e,t,n,r)=>{r&&i(n)});Promise.resolve(t).then(e=>{if(e==null)return;let t=typeof GM_removeValueChangeListener==`function`?GM_removeValueChangeListener:r&&typeof r.removeValueChangeListener==`function`?r.removeValueChangeListener.bind(r):null;t&&n.push(()=>{try{t(e)}catch{}})}).catch(()=>{})}catch(e){console.warn(`[SEJ] GM 变更监听注册失败`,e)}let o=mc+e,s=e=>{if(Pc===`local`&&e.key===o&&e.newValue!==null)try{t(JSON.parse(e.newValue))}catch{}};return window.addEventListener(`storage`,s),n.push(()=>window.removeEventListener(`storage`,s)),()=>{for(;n.length;)n.pop()()}}async function Wc(e){let t=bc();try{let n,r;if(Pc===`gm-async`){if(r=await t.getValue(e+hc),vc(r)&&Nc.get(e)===r)return null;n=await t.getValue(e),jc.add(e)}else if(Pc===`gm-sync`){if(typeof cc==`function`&&(r=cc(e+hc)),vc(r)&&Nc.get(e)===r)return null;n=cc(e)}else return null;if(!vc(n))return null;vc(r)&&Nc.set(e,r);let i=Mc.get(e);if(vc(i)&&Lc(n,i))return null;let a=yc(n);return Mc.set(e,a),Ac.set(e,a),jc.add(e),a}catch(e){console.warn(`[SEJ] 拉取最新设置失败`,e)}return null}var Gc={version:`2026-10-24 08:47:49`,fixedTop:!1,fixedTopUpward:!1,HideTheSameLink:!0,selectSearch:!0,selectSearchInInput:!1,center:!1,engineCategories:[[`搜索`,`web`,!0],[`AI`,`user1792793062676`,!0],[`影视`,`video`,!0],[`书籍`,`books`,!0],[`工具`,`tools`,!0],[`资源`,`download`,!0],[`资源+`,`user1792802683546`,!1],[`国产AI`,`user1792793110006`,!1]],engineList:JSON.parse(`{"web":[{"name":"Google","url":"https://www.google.com/search?q=%s","favicon":"https://www.google.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRmADAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSMcAAAABgBzbtqroDHFy+DpEgtGEnACcdNy7c6C+DHG39+/JICImAIqJUnfin8/epFtMQNAeHB6K+54ZJNK8PgJe6mEl6/8huDYUsu5D1En/sNyHsGN8if4/xNfhj+aDWANgXxkXAxg8qF0kD5xdvPQg57us1oQ19FnOmXXieSxnwhp2Wa0iK5fYc3Yx9DhtwLwwzjqAOqMMAJGN3DL0AcOR2mr4nnZktin8NtYSSw2q4dolyLkcQkCju1PZtXUIxvOtoXM6OcNWLgZFAFZQOCByAgAAMA8AnQEqIAAgAD4xFIhCoiEhGAwGACADBLYATplCQWfIPwl/FXpVdpzErqk/M/bNvFv9J3QH7Afrd2APNm/wHWAegB5ZP63fBD+2/7AezJngsUN8B2K3AGLWf6nlZ+bPYF/WDfFv2MTnS9lnHcMmol0tvH9UbqnJH+gsvv5DRRJNwAD+//kpGtbWHrB48pshMsH5gS9a8WOn7hs8RiKXnaqK43DQR58c+f9ZcWdQa5kpTqB/zIf1P7Ss/y42X1opLu6idfpLpfoE+2Mwmm3VY79nwrugs4/Q6FP4bTumE+Jdh3nznvV/c3SarOHJxQ7NNyIl3RsDmZ3WM5DH3nTdfA1WJMJR9X8XnZg40CuJxX/12GxEIOoYYy2hhH9VM1q14YXYmRP78tvs3x+dHrY874KR+BFbeilNWOQ49pYSkw/6qX//0YGP6HvoWJaeJS+Ibyd9+4ra8cX+zeDn6X03if/Ir5WGvxudsQo8pbE1jKq0FfzE8DMFzt0df/w7yUfeEwRBuQUt1nPJysblRNdzf4Pw5HTs9XjajiF2k/pjudBVDNxiKhf10TWe6tCPKL1JjfUDMrUL/ecypPJ4OvjXnuREBPHjwmAJwNfAuFPBQA6VMGzMDmFPVQpraiHxR5lgLidCmXG3v+Ez5LS4twa775m+7XimETVBCU/7//2pdL8AJ4/W6vf97kPdoD45roTltGo8bT+h70W/eo5zNy2CZLJOCL6vGJ3OazAFwi4MIOuXAzQhMe57j26/8xYoyKP1j8N+LzVMKv2G5zLRr8Le//+b823DoeaXOYd4Wx/jN/+9T8A6G/bo8ysL8fnHXUAAAAA="},{"name":"Bing","url":"https://www.bing.com/search?q=%s","favicon":"https://www.bing.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRo4CAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSL8AAAABgGJt27LoXcJ3/hVgC3CyQ+WQiLAJTSRrLIXkjLSpPtnd0fiMfN/Li+aImABaUev8O7+cOIBz/7KA6tJQXdr30rALuA+zS/oCrlJLaQHAYWgJqX/AoRKjLw2+3GJNHY6VlM2AihQdGq7EVFMHtxSRyrb/heSoPML7MpKXAPAi5upCO4fipBmNEYwt4uYMyTuY5yEWvWk+wN0jfmP8PH+cgTnK0ILWCPwjFy0cHHFGZZIM3pm6Fsla5ct/3SStNgBWUDggqAEAABALAJ0BKiAAIAA+MRaIQyIhIRQFVCADBLYATplCQWfQPxV5M/VzmAygTgr+9/ZRkAPMB+wH6zey7/SesA/UDgAP1a9Jj9nfgP/Yj9hvaApUtSsd1KfokgirJLOS2D9mZhAA/vHdxmo11qFWedw8Jr8wqIlmzCnyf+n05SnYaumGtcapII/+Uhf6TKgnrFpef/m4Ipm38ePbs+2azZixVBZP4+TiGAV4/1mML//0FW4E0reWhN29bz/kAncjub92w2g5+rUS9IVYL/8dvmJikQD6p2+Rxf5htZa1wGzEj/vANqsQbQQ6VSVwTt063WPvC5Zpftw+c0ELpcOYeyOIaKn6jWVZZi4ghl6BTH5DCe9LB/xkUnw6B5u/PKnjFNf//6jr+2rYd+LXu5KunOtp4et+I20AOrn7+h+asxWej9Ko6s1gMPJmmbFUu9EhYQ27hS/1CCOZ9Hs3I4cfMU2cSA5RAKiOlzHPUtAY7CwyhgdtPW9l8LEBnVVyKu4OySQAB3/X5NsfSgQBXSxxu/dZyMYzxhn/7UMfP3u2BVZ3VCoCHvypJkmgAAA="}],"user1792793062676":[{"name":"DeepSeek","url":"https://chat.deepseek.com/?q=%s&autosend=1","favicon":"https://www.deepseek.com/favicon.ico"},{"name":"ChatGPT","url":"https://chatgpt.com/?q=%s ","favicon":"https://chatgpt.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRswFAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSN0AAAABcFPbthM9ggpQAAJii50/Qr4CQAMLEaAiQxsq+gyT/5121ooINW7bRlJ6bF3tPoGeVQ2W5NO6f+065TEzVXqragXtvAtz7iLv3UXnwy7YkWsvsbJtF+6W2S/wix1i6T9hFzvI4vGqpzvMVL+Q+Q6UK0TegKS3SQl3qIFitlhak81YZhbvYJMcTT6hmVY06/737wpf+NyEz20JmhifW/G5WQmwhArZPZLBI1KwvUWG96bf6G1EfglaPj1rY3qrRa/U+Cj8Ia6/6+1e1Ant7YH1SfM3WSzq3yC5GS9uBABWUDggyAQAAPAYAJ0BKkAAQAA+MRaHQyIhCgNUEAGCWkAFteqn+Bfe87f+un7h+wF+3dFbmT+tf0n8lfy99jPwB9OnoE/xX+jfkX+UPsA2gL1K+Tf5b8pf7NrF/+Q/KrmvKAH5V/3nsbftn/C+8D2WfMv+4/t343/YF/Jf6D/lf71+6v+B///1geyr0Xv2db+ECbkdam7XynrZJBy58SW7tMq36va2w9xwIDM5GuffhRQVpKmorm/6iiMV7pMVQ0GqDB1973/No7YcacdasKGukTB1Y5UXMgAA/v89hf/wNVjb75Vil57ZBun60CrHPnzF5Rha9gQuI0/H2sPCEBdNE+/zquvPZOxBqOdyNbu57n2QVER4hLk8Krcsp8HY6+HKGZGl7wx4S+oY9iHySQQL4Rr//7ezSFcjqYBZZZR34meeHTwtqjwOz/j7tH2u6KVZavyaOsYHZVxm5PQNGGev/+kxm9QJ0ocPycfjZMLf7VUv2naMtiLqsVWZ1PLI8sl5XNTvDnh4kCDJ///6yeP4xkM0xGbCHgNQpbFx07oh03M8P02vEMQm0SY2ycTXH1zl6Q6hGhWSw8C9TH1vGD4tJYmyHxGvySHdKf6Bn/8SL0YzlymlEwXYWK9BI8ewDU/JBUwRCPXaOKCG8pq0KzejeOMcSs8+RXJUVP/q9Kdh8CUM9Awtltfjg6zBPGGrAEnn+Gooy23uBAar54Am/f2OOw9nOBVCz4Gs/MsocaBDV86dj+KqHYO2bv8T7tWf/UIAn27RdNvlt4J24lg6m3l6LYPxd1qk3s16XZxf0Yu+M9oG3sINqfwAM+MVej3OXK9U/g4BaHxnNl4j/6MEyHWUjDgZz6OyS6mtZGcawn5grn7yGVgZN/iwq/oSQby2S16XP/jtJe/EXkl+zhZI6W1DrG4/zwqP+f0PzvC9Jm6R81JmEaDGSfcmJc6G1r4NAE/np2CHOENzEUL9fj3NqpnVdt/6LrFlCcIRpK8HQWERarvgQdR6gPqGHWPY8FbDJw7HBVgkbmhgZz2XFSJku7tE1Lh1PlYivGPuZPf9uNSzQQoZHQ/r+ZrBhV1z5DIj/Wi3qF+9ICniwxsIFtD1p0ncMAVl/g4wnPLRJm0tyqjYZOatzHjStu6IWSZ/X6aS4YpEyXoGxxkCH4YN/Lj3z2uOm71LddlZ9Le1tARzmx6od9outMQvcAhX+ioUDyft1wZDARHCgx9iJGmI4ECmLfR02FakR6On1HQ8nlD7YD0tzb2tG40Tuiyo648OZmtpmfHRV70Axr4ZUQcJbqfIckE7+1wAA4xnzESb9NZkIGfyNf/IXQJ7nc8uUsCoZSJYIq6vTm6/duhTl2WYlXNhTddZ7Ha3Iqjl7PaKWxXWTXV/IemhFiUq/uL6LAbpVOwX2/o14+z/pwxdiDw/b+/6uT1jbVSGTwrrkIn7cNQW7hYFH0XGGNUG22kZ2Px1JxVj/jjXvHfD4Q+LmlWHEoyZGzY55trJLGDU/L1VjsAzvEeZ4glLUNFkPn6PfPuHdEkE6Sby6LCxvMf5lHGKm1u/FrM57fWAZj/1sKv4h2qrtHwMAxAkvqtP13PiLYC0lr0BrPTR1fX71sH+Scz+c6fxxXRLhlKREcHftoUbXlEBQAAAAA=="},{"name":"Gemini","url":"https://gemini.google.com/app?q=%s","favicon":"https://a.favicon.im/gemini.google.com","faviconData":"data:image/webp;base64,UklGRmoHAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSI8CAAABkGNte+I6v6Sxc7swb4CZOSUzM2yEYSO4Ad8yzMzMWDOM9Os7x5LHI/0nfUQ4cBtJkRpU27UM13BPoFQ1hmRVtSNhnz9f1DTNZp5NWk4KOgYco0IwVle9v6qUYDzKAW4Uabl4H6zFPrFQUfM1mPG6qZQUbkEIsFkKtL4Uyy0js8LQYjAQbI0IKF3cgovEPxSBgnYGj2E7GYGNBn1ijoX562Ct8+OJgJ1wmorsvhkWqLItmc3QhO/MVeL558Ss22ga+LTNVSrj6UDS+Vw1zsZcNXW2oXQ2Ny2U6KoWvSaTGWq28A81tESrSSbLiYacDcv17OyQ9PMoQ9MewaKmWjyaTEYlsrT9Lxxqq8O3LZRCGkUjTyJ4iuHESCJT9zhEO96BPZLUM97uVNT9MEqHh7H6PGCRrBa4vDI8Yl1BmMD0bDsHWO5+nzVJnN3YExGdtbUYc+QFYK3rKt7XI9kDL/ePbi+puLYeul0CzIBn9jkkvsby2uHZbcbQIo/oOJ45eC5lC8AtIFMpnm10Cp9XQnD07j+AXYd4X2npQccmo468BLzzNZ528iaVB9p6HmDfPUg9UJfvVq26AljflmzfbY3fjdr5BpZz/W5qZiwaehzgHL/bpLyx9y9sct5IzlsPUGbJWynkgDNpeTNX3i7reW+TTKa6UbRga9WNImPhaZyBE6xbRJr6PgEL1k0iQ1PL6hTiuWyfKHPfsL2actgm0HicgqvyU1Tk75uGfKnqm75EfVN22F3Vt+2iQqRvvA0X+61CK5G+dRmikLGYjFDffBku4MVoIxFYDw64VghJqeYrMONVH1Jic8sB2bmFNI0O9GjSgnPbNe+vKfX/zo2aZjmeRVp0bl6wQHzwTnfx/w0IAFZQOCC0BAAAsBkAnQEqQABAAD4xEodCoiEM/s4AEAGCWwAxnNyA3eo/jH+MHylVf+Wfcv90v8Bl1PGf+d6T3mAfpZ/seod5m/2R9arpAP2N6wr0AP2x9MH/Z+4j+1H7s/AB/HP7d/97y//AfTcyx355xAd4Dhb5jn8n/13py5qnpz9b/gB/i381/4X9z9ozqJv1ZahS/UYYUUf7sieLnASD+p0fyGDONQFyapbnUHQX9ldro4qzt1o481kZzG/y6ylRydfQRtJWxRE5K9iXY/3Fd5tIlI0jWWxV+1Y7gAD+/4+85nCr8bYnCHKguNKQOyeAMWEH/1gJexUW7uf//RuvoGPMU5DaGX9PrOIhT6eeA52hdscEIt8b+j3z17i/ua58yqk15EJC+Frc8v6dlYDUh+iSbT6tdCypAbCHaXPTpNtsxarRoNLHxk5VZGr+gVtJ6+F1ULDP4fc5ukZCdZm+dMVVoYzj7kMvfqynCru6HMBa5Q0MsDvgoVK6dvJ9ud7+maFqRsuW7SG/EMsh///ZGa5Z0VZ//sVooFpLWALDpoc7E/tfSxZq28KmVtX6bf5S8thkk2BL084nOvzvbel3ZFfDSB4YwklLLoztQGdw5NSXW6FK9q4e4fKwq92PgeIQdAsnoOwpZQjvx0XJoFaO9Z9N+8kEP3lsllHeBGc1qahiA80IdZHrN6VIVSZ5NUCWgXcm79gPGWygY6ouqz6QhxQ4zH/2SKhYSAIiC/M7Dof4SmSXBIF3ImfoAczrmNXofzztfchBJHWhrAC6oRoV9BbfesLPO8Dso9bhdsL1KcM6LghsNaUJhdm61dClfQ1OF5XIc52zWCChPq+Y6avfum53P5WpOUBpSjHcQV7cV4t7FVPhVnWOC/Ri/XldGzOUu7q8immUPs7CkSM3jem4P8pz1PNdH6ghdZ9kDNTLxil/ZZoGHCht09Fb43QV3QjOo1o66ycnRPauF8UjeU3OT3sx+0DfEYD4vDC77+UBXHqb3HTRvq0bRUwuKT4/aNCPgfkblao0+TAeRoGeXlGwyt6LIoeUzBDmoY/yQWBBKWUGbbz/C1I7t8JoeWHmOWcNKNO9pKvS5LTFBknZ0Z/JLBrRdFA9NQhLwkBZWv/udLXUV4j18yIwXFpx58n8u/ZGcND5vbv6x2J4IYRXxwyKKi3ttDRg87gxSzR4XOqwO/57bDon//Dzm512bf2tDFR5A8FJRG7WUWJlDL5bjmo5QtSv4xJkjiF4lVdRwzclrYkB9ytNpWe9kAOdXnPaBJtZD3P/p3bWu+r1DZgq20cO/+d2muNayLc4YSY5Bn7Q8nboc4j9NbV01uelgC4q4rtRgl7p3IXHT//oPS4qw9Xif0zBXf56yahm5khWXJ6btcW7EzSWe/9VFBqyxG2JgEbqqOZkB4S9sEv+Z+F+vqzf6ngLzBzaGWb1OaW0TOtLxfIaPyUvZIt51qXzG4H6wbD9cQsYsBd+F4AJbD5fwJP3c+Zhrcjlw/6E2+8X9+UF0LOZb6JEcXFeMf+gRXi/7bFl8f7KGkxROiCkF6ZkSstv+5os70ZFTvzfCxz+homH66k9Hcv7pwZ7SgaRVON+P1+R//zMFX6zcAAAAA=="},{"name":"Grok","url":"https://grok.com/?q=%s","favicon":"https://a.favicon.im/grok.com","faviconData":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgdmlld0JveD0iMCAwIDUxMiA1MTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxnIGNsaXAtcGF0aD0idXJsKCNjbGlwMF8zMDRfMTExKSI+Cjxmb3JlaWduT2JqZWN0IHg9Ii0yNCIgeT0iLTIyIiB3aWR0aD0iNTYwIiBoZWlnaHQ9IjU2MCI+PGRpdiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94aHRtbCIgc3R5bGU9ImJhY2tkcm9wLWZpbHRlcjpibHVyKDE2cHgpO2NsaXAtcGF0aDp1cmwoI2JnYmx1cl8xXzMwNF8xMTFfY2xpcF9wYXRoKTtoZWlnaHQ6MTAwJTt3aWR0aDoxMDAlIj48L2Rpdj48L2ZvcmVpZ25PYmplY3Q+PGcgZmlsdGVyPSJ1cmwoI2ZpbHRlcjBfZF8zMDRfMTExKSIgZGF0YS1maWdtYS1iZy1ibHVyLXJhZGl1cz0iMzIiPgo8cGF0aCBkPSJNMCAyNTZDMCAxNjYuMzkyIDAgMTIxLjU4NyAxNy40MzkgODcuMzYxNUMzMi43Nzg3IDU3LjI1NTYgNTcuMjU1NiAzMi43Nzg3IDg3LjM2MTUgMTcuNDM5QzEyMS41ODcgMCAxNjYuMzkyIDAgMjU2IDBDMzQ1LjYwOCAwIDM5MC40MTMgMCA0MjQuNjM4IDE3LjQzOUM0NTQuNzQ0IDMyLjc3ODcgNDc5LjIyMSA1Ny4yNTU2IDQ5NC41NjEgODcuMzYxNUM1MTIgMTIxLjU4NyA1MTIgMTY2LjM5MiA1MTIgMjU2QzUxMiAzNDUuNjA4IDUxMiAzOTAuNDEzIDQ5NC41NjEgNDI0LjYzOEM0NzkuMjIxIDQ1NC43NDQgNDU0Ljc0NCA0NzkuMjIxIDQyNC42MzggNDk0LjU2MUMzOTAuNDEzIDUxMiAzNDUuNjA4IDUxMiAyNTYgNTEyQzE2Ni4zOTIgNTEyIDEyMS41ODcgNTEyIDg3LjM2MTUgNDk0LjU2MUM1Ny4yNTU2IDQ3OS4yMjEgMzIuNzc4NyA0NTQuNzQ0IDE3LjQzOSA0MjQuNjM4QzAgMzkwLjQxMyAwIDM0NS42MDggMCAyNTZaIiBmaWxsPSIjMDUwNTA1Ii8+CjxwYXRoIGQ9Ik0yNTYgMi41QzMwMC44NDUgMi41IDMzNC4zMjkgMi41MDIyOCAzNjAuODg0IDQuNjcxODhDMzg3LjQxIDYuODM5MTEgNDA2LjgwMiAxMS4xNTYgNDIzLjUwNCAxOS42NjZDNDUzLjEzOSAzNC43NjYxIDQ3Ny4yMzQgNTguODYwNyA0OTIuMzM0IDg4LjQ5NjFDNTAwLjg0NCAxMDUuMTk4IDUwNS4xNjEgMTI0LjU5IDUwNy4zMjggMTUxLjExNkM1MDkuNDk4IDE3Ny42NzEgNTA5LjUgMjExLjE1NSA1MDkuNSAyNTZDNTA5LjUgMzAwLjg0NSA1MDkuNDk4IDMzNC4zMjkgNTA3LjMyOCAzNjAuODg0QzUwNS4xNjEgMzg3LjQxIDUwMC44NDQgNDA2LjgwMiA0OTIuMzM0IDQyMy41MDRDNDc3LjIzNCA0NTMuMTM5IDQ1My4xMzkgNDc3LjIzNCA0MjMuNTA0IDQ5Mi4zMzRDNDA2LjgwMiA1MDAuODQ0IDM4Ny40MSA1MDUuMTYxIDM2MC44ODQgNTA3LjMyOEMzMzQuMzI5IDUwOS40OTggMzAwLjg0NSA1MDkuNSAyNTYgNTA5LjVDMjExLjE1NSA1MDkuNSAxNzcuNjcxIDUwOS40OTggMTUxLjExNiA1MDcuMzI4QzEyNC41OSA1MDUuMTYxIDEwNS4xOTggNTAwLjg0NCA4OC40OTYxIDQ5Mi4zMzRDNTguODYwNyA0NzcuMjM0IDM0Ljc2NjEgNDUzLjEzOSAxOS42NjYgNDIzLjUwNEMxMS4xNTYgNDA2LjgwMiA2LjgzOTExIDM4Ny40MSA0LjY3MTg4IDM2MC44ODRDMi41MDIyOCAzMzQuMzI5IDIuNSAzMDAuODQ1IDIuNSAyNTZDMi41IDIxMS4xNTUgMi41MDIyOCAxNzcuNjcxIDQuNjcxODggMTUxLjExNkM2LjgzOTExIDEyNC41OSAxMS4xNTYgMTA1LjE5OCAxOS42NjYgODguNDk2MUMzNC43NjYxIDU4Ljg2MDcgNTguODYwNyAzNC43NjYxIDg4LjQ5NjEgMTkuNjY2QzEwNS4xOTggMTEuMTU2IDEyNC41OSA2LjgzOTExIDE1MS4xMTYgNC42NzE4OEMxNzcuNjcxIDIuNTAyMjggMjExLjE1NSAyLjUgMjU2IDIuNVoiIHN0cm9rZT0iYmxhY2siIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjUiLz4KPC9nPgo8L2c+CjxtYXNrIGlkPSJwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSIgZmlsbD0id2hpdGUiPgo8cGF0aCBkPSJNMjEwLjQ4NCAzMTIuNzU5TDM0My40NjUgMjEwLjM4M0MzNDkuOTg0IDIwNS4zNjQgMzU5LjMwMiAyMDcuMzIyIDM2Mi40MDggMjE1LjExN0MzNzguNzU4IDI1Ni4yMzEgMzcxLjQ1NCAzMDUuNjQgMzM4LjkyNSAzMzkuNTYzQzMwNi4zOTcgMzczLjQ4NyAyNjEuMTM3IDM4MC45MjcgMjE5Ljc2OCAzNjMuOTgzTDE3NC41NzcgMzg1LjgwM0MyMzkuMzk0IDQzMi4wMDggMzE4LjEwNCA0MjAuNTgxIDM2Ny4yODkgMzY5LjI1MUM0MDYuMzAzIDMyOC41NjQgNDE4LjM4NiAyNzMuMTA0IDQwNy4wODggMjIzLjA5MUw0MDcuMTkgMjIzLjE5OEMzOTAuODA3IDE0OS43MjYgNDExLjIxOCAxMjAuMzU5IDQ1My4wMyA2MC4zMDcyQzQ1NC4wMiA1OC44ODMzIDQ1NS4wMSA1Ny40NTk1IDQ1NiA1Nkw0MDAuOTc4IDExMy4zODJWMTEzLjIwNEwyMTAuNDUgMzEyLjc5NCIvPgo8cGF0aCBkPSJNMTgzLjA0MiAzMzcuNjQxQzEzNi41MTkgMjkxLjI5NCAxNDQuNTQgMjE5LjU2NyAxODQuMjM2IDE3OC4yMDNDMjEzLjU5IDE0Ny41OSAyNjEuNjgzIDEzNS4wOTYgMzAzLjY2NiAxNTMuNDY0TDM0OC43NTUgMTMxLjc1QzM0MC42MzIgMTI1LjYyNyAzMzAuMjIxIDExOS4wNDIgMzE4LjI3NSAxMTQuNDE0QzI2NC4yNzcgOTEuMjQwNyAxOTkuNjMgMTAyLjc3NCAxNTUuNzM1IDE0OC41MTZDMTEzLjUxMyAxOTIuNTQ5IDEwMC4yMzYgMjYwLjI1NCAxMjMuMDM2IDMxOC4wMjdDMTQwLjA2OSAzNjEuMjA2IDExMi4xNDggMzkxLjc0OCA4NC4wMjI5IDQyMi41NzVDNzQuMDU2MSA0MzMuNTAzIDY0LjA1NTMgNDQ0LjQzMSA1NiA0NTZMMTgzLjAwNyAzMzcuNjc3Ii8+CjwvbWFzaz4KPHBhdGggZD0iTTIxMC40ODQgMzEyLjc1OUwzNDMuNDY1IDIxMC4zODNDMzQ5Ljk4NCAyMDUuMzY0IDM1OS4zMDIgMjA3LjMyMiAzNjIuNDA4IDIxNS4xMTdDMzc4Ljc1OCAyNTYuMjMxIDM3MS40NTQgMzA1LjY0IDMzOC45MjUgMzM5LjU2M0MzMDYuMzk3IDM3My40ODcgMjYxLjEzNyAzODAuOTI3IDIxOS43NjggMzYzLjk4M0wxNzQuNTc3IDM4NS44MDNDMjM5LjM5NCA0MzIuMDA4IDMxOC4xMDQgNDIwLjU4MSAzNjcuMjg5IDM2OS4yNTFDNDA2LjMwMyAzMjguNTY0IDQxOC4zODYgMjczLjEwNCA0MDcuMDg4IDIyMy4wOTFMNDA3LjE5IDIyMy4xOThDMzkwLjgwNyAxNDkuNzI2IDQxMS4yMTggMTIwLjM1OSA0NTMuMDMgNjAuMzA3MkM0NTQuMDIgNTguODgzMyA0NTUuMDEgNTcuNDU5NSA0NTYgNTZMNDAwLjk3OCAxMTMuMzgyVjExMy4yMDRMMjEwLjQ1IDMxMi43OTQiIGZpbGw9IiNGQ0ZDRkMiLz4KPHBhdGggZD0iTTE4My4wNDIgMzM3LjY0MUMxMzYuNTE5IDI5MS4yOTQgMTQ0LjU0IDIxOS41NjcgMTg0LjIzNiAxNzguMjAzQzIxMy41OSAxNDcuNTkgMjYxLjY4MyAxMzUuMDk2IDMwMy42NjYgMTUzLjQ2NEwzNDguNzU1IDEzMS43NUMzNDAuNjMyIDEyNS42MjcgMzMwLjIyMSAxMTkuMDQyIDMxOC4yNzUgMTE0LjQxNEMyNjQuMjc3IDkxLjI0MDcgMTk5LjYzIDEwMi43NzQgMTU1LjczNSAxNDguNTE2QzExMy41MTMgMTkyLjU0OSAxMDAuMjM2IDI2MC4yNTQgMTIzLjAzNiAzMTguMDI3QzE0MC4wNjkgMzYxLjIwNiAxMTIuMTQ4IDM5MS43NDggODQuMDIyOSA0MjIuNTc1Qzc0LjA1NjEgNDMzLjUwMyA2NC4wNTUzIDQ0NC40MzEgNTYgNDU2TDE4My4wMDcgMzM3LjY3NyIgZmlsbD0iI0ZDRkNGQyIvPgo8cGF0aCBkPSJNMzQzLjQ2NSAyMTAuMzgzTDM0NC4zOCAyMTEuNTcxTDM0NC4zOCAyMTEuNTcxTDM0My40NjUgMjEwLjM4M1pNMzYyLjQwOCAyMTUuMTE3TDM2My44MDIgMjE0LjU2M0wzNjMuODAyIDIxNC41NjJMMzYyLjQwOCAyMTUuMTE3Wk0yMTkuNzY4IDM2My45ODNMMjIwLjMzNyAzNjIuNTk0TDIxOS43MTggMzYyLjM0MUwyMTkuMTE2IDM2Mi42MzJMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjkyNCAzODQuNDUzTDE3MS42NDMgMzg1LjU1NEwxNzMuNzA2IDM4Ny4wMjVMMTc0LjU3NyAzODUuODAzWk0zNjcuMjg5IDM2OS4yNTFMMzY2LjIwNyAzNjguMjEzTDM2Ni4yMDYgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDguMTcxIDIyMi4wNTNMNDA0LjQzNiAyMTguMTU3TDQwNS42MjUgMjIzLjQyMUw0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwNi4xMDggMjI0LjIzNkw0MDkuODIzIDIyOC4xMTFMNDA4LjY1NCAyMjIuODcxTDQwNy4xOSAyMjMuMTk4Wk00NTMuMDMgNjAuMzA3Mkw0NTQuMjYyIDYxLjE2NDNMNDU0LjI2MiA2MS4xNjM0TDQ1My4wMyA2MC4zMDcyWk00NTYgNTZMNDU3LjI0MSA1Ni44NDJMNDU0LjkxNyA1NC45NjE4TDQ1NiA1NlpNNDAwLjk3OCAxMTMuMzgySDM5OS40NzhWMTE3LjExM0w0MDIuMDYxIDExNC40Mkw0MDAuOTc4IDExMy4zODJaTTQwMC45NzggMTEzLjIwNEg0MDIuNDc4VjEwOS40NkwzOTkuODkzIDExMi4xNjhMNDAwLjk3OCAxMTMuMjA0Wk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOCAxNzkuMjQyTDE4NS4zMTkgMTc5LjI0MkwxODQuMjM2IDE3OC4yMDNaTTMwMy42NjYgMTUzLjQ2NEwzMDMuMDY1IDE1NC44MzhMMzAzLjY5NiAxNTUuMTE0TDMwNC4zMTcgMTU0LjgxNUwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS40MDYgMTMzLjEwMUwzNTEuNjI0IDEzMi4wMzNMMzQ5LjY1OCAxMzAuNTUyTDM0OC43NTUgMTMxLjc1Wk0zMTguMjc1IDExNC40MTRMMzE3LjY4MyAxMTUuNzkzTDMxNy43MDggMTE1LjgwM0wzMTcuNzMzIDExNS44MTNMMzE4LjI3NSAxMTQuNDE0Wk0xNTUuNzM1IDE0OC41MTZMMTU0LjY1MyAxNDcuNDc3TDE1NC42NTMgMTQ3LjQ3OEwxNTUuNzM1IDE0OC41MTZaTTEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdMMTI0LjQzMiAzMTcuNDc3TDEyMy4wMzYgMzE4LjAyN1pNODQuMDIyOSA0MjIuNTc1TDgyLjkxNDggNDIxLjU2NEw4Mi45MTQ2IDQyMS41NjRMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTQuNzY5IDQ1NS4xNDNMNTcuMDIyNSA0NTcuMDk4TDU2IDQ1NlpNMjEwLjQ4NCAzMTIuNzU5TDIxMS4zOTkgMzEzLjk0OEwzNDQuMzggMjExLjU3MUwzNDMuNDY1IDIxMC4zODNMMzQyLjU1IDIwOS4xOTRMMjA5LjU2OSAzMTEuNTdMMjEwLjQ4NCAzMTIuNzU5Wk0zNDMuNDY1IDIxMC4zODNMMzQ0LjM4IDIxMS41NzFDMzUwLjIwNCAyMDcuMDg3IDM1OC4zMiAyMDguOTA5IDM2MS4wMTUgMjE1LjY3MkwzNjIuNDA4IDIxNS4xMTdMMzYzLjgwMiAyMTQuNTYyQzM2MC4yODUgMjA1LjczNCAzNDkuNzY0IDIwMy42NCAzNDIuNTUgMjA5LjE5NEwzNDMuNDY1IDIxMC4zODNaTTM2Mi40MDggMjE1LjExN0wzNjEuMDE1IDIxNS42NzFDMzc3LjE2MyAyNTYuMjc5IDM2OS45MzYgMzA1LjA1NSAzMzcuODQyIDMzOC41MjVMMzM4LjkyNSAzMzkuNTYzTDM0MC4wMDggMzQwLjYwMUMzNzIuOTcyIDMwNi4yMjQgMzgwLjM1MyAyNTYuMTgzIDM2My44MDIgMjE0LjU2M0wzNjIuNDA4IDIxNS4xMTdaTTMzOC45MjUgMzM5LjU2M0wzMzcuODQyIDMzOC41MjVDMzA1Ljc2OSAzNzEuOTc0IDI2MS4xNzUgMzc5LjMyMSAyMjAuMzM3IDM2Mi41OTRMMjE5Ljc2OCAzNjMuOTgzTDIxOS4yIDM2NS4zNzFDMjYxLjA5OSAzODIuNTMyIDMwNy4wMjQgMzc1IDM0MC4wMDggMzQwLjYwMUwzMzguOTI1IDMzOS41NjNaTTIxOS43NjggMzYzLjk4M0wyMTkuMTE2IDM2Mi42MzJMMTczLjkyNCAzODQuNDUzTDE3NC41NzcgMzg1LjgwM0wxNzUuMjI5IDM4Ny4xNTRMMjIwLjQyIDM2NS4zMzNMMjE5Ljc2OCAzNjMuOTgzWk0xNzQuNTc3IDM4NS44MDNMMTczLjcwNiAzODcuMDI1QzIzOS4xNSA0MzMuNjc1IDMxOC42ODkgNDIyLjE0IDM2OC4zNzIgMzcwLjI4OUwzNjcuMjg5IDM2OS4yNTFMMzY2LjIwNiAzNjguMjEzQzMxNy41MiA0MTkuMDIzIDIzOS42MzkgNDMwLjM0IDE3NS40NDcgMzg0LjU4MkwxNzQuNTc3IDM4NS44MDNaTTM2Ny4yODkgMzY5LjI1MUwzNjguMzcyIDM3MC4yODlDNDA3Ljc2NCAzMjkuMjA4IDQxOS45NSAyNzMuMjIxIDQwOC41NTEgMjIyLjc2TDQwNy4wODggMjIzLjA5MUw0MDUuNjI1IDIyMy40MjFDNDE2LjgyMiAyNzIuOTg3IDQwNC44NDIgMzI3LjkyIDM2Ni4yMDcgMzY4LjIxM0wzNjcuMjg5IDM2OS4yNTFaTTQwNy4wODggMjIzLjA5MUw0MDYuMDA1IDIyNC4xMjlMNDA2LjEwOCAyMjQuMjM2TDQwNy4xOSAyMjMuMTk4TDQwOC4yNzMgMjIyLjE2TDQwOC4xNzEgMjIyLjA1M0w0MDcuMDg4IDIyMy4wOTFaTTQwNy4xOSAyMjMuMTk4TDQwOC42NTQgMjIyLjg3MUM0MDAuNTA1IDE4Ni4zMjUgNDAxLjUzOCAxNjAuOTEgNDA5LjcwNSAxMzcuMjA5QzQxNy45MDUgMTEzLjQxNCA0MzMuMzE5IDkxLjI0MjEgNDU0LjI2MiA2MS4xNjQzTDQ1My4wMyA2MC4zMDcyTDQ1MS43OTkgNTkuNDUwMUM0MzAuOTI5IDg5LjQyMzkgNDE1LjIzMiAxMTEuOTYxIDQwNi44NjkgMTM2LjIzMUMzOTguNDczIDE2MC41OTQgMzk3LjQ5MiAxODYuNTk5IDQwNS43MjYgMjIzLjUyNEw0MDcuMTkgMjIzLjE5OFpNNDUzLjAzIDYwLjMwNzJMNDU0LjI2MiA2MS4xNjM0QzQ1NS4yNTEgNTkuNzQwNiA0NTYuMjQ2IDU4LjMwOTcgNDU3LjI0MSA1Ni44NDJMNDU2IDU2TDQ1NC43NTkgNTUuMTU4QzQ1My43NzQgNTYuNjA5MiA0NTIuNzg5IDU4LjAyNjEgNDUxLjc5OSA1OS40NTFMNDUzLjAzIDYwLjMwNzJaTTQ1NiA1Nkw0NTQuOTE3IDU0Ljk2MThMMzk5Ljg5NiAxMTIuMzQ0TDQwMC45NzggMTEzLjM4Mkw0MDIuMDYxIDExNC40Mkw0NTcuMDgzIDU3LjAzODJMNDU2IDU2Wk00MDAuOTc4IDExMy4zODJINDAyLjQ3OFYxMTMuMjA0SDQwMC45NzhIMzk5LjQ3OFYxMTMuMzgySDQwMC45NzhaTTE4My4wNDIgMzM3LjY0MUwxODQuMSAzMzYuNTc4QzEzOC4yNTUgMjkwLjkwNyAxNDYuMDg3IDIyMC4xMjEgMTg1LjMxOCAxNzkuMjQyTDE4NC4yMzYgMTc4LjIwM0wxODMuMTU0IDE3Ny4xNjVDMTQyLjk5MyAyMTkuMDEyIDEzNC43ODIgMjkxLjY4MSAxODEuOTgzIDMzOC43MDRMMTgzLjA0MiAzMzcuNjQxWk0xODQuMjM2IDE3OC4yMDNMMTg1LjMxOSAxNzkuMjQyQzIxNC4yNzUgMTQ5LjA0NCAyNjEuNzA2IDEzNi43NDMgMzAzLjA2NSAxNTQuODM4TDMwMy42NjYgMTUzLjQ2NEwzMDQuMjY3IDE1Mi4wOUMyNjEuNjYgMTMzLjQ0OSAyMTIuOTA2IDE0Ni4xMzcgMTgzLjE1NCAxNzcuMTY1TDE4NC4yMzYgMTc4LjIwM1pNMzAzLjY2NiAxNTMuNDY0TDMwNC4zMTcgMTU0LjgxNUwzNDkuNDA2IDEzMy4xMDFMMzQ4Ljc1NSAxMzEuNzVMMzQ4LjEwNSAxMzAuMzk4TDMwMy4wMTUgMTUyLjExMkwzMDMuNjY2IDE1My40NjRaTTM0OC43NTUgMTMxLjc1TDM0OS42NTggMTMwLjU1MkMzNDEuNDYyIDEyNC4zNzQgMzMwLjkzIDExNy43MDggMzE4LjgxNyAxMTMuMDE1TDMxOC4yNzUgMTE0LjQxNEwzMTcuNzMzIDExNS44MTNDMzI5LjUxMyAxMjAuMzc2IDMzOS44MDIgMTI2Ljg4IDM0Ny44NTMgMTMyLjk0OEwzNDguNzU1IDEzMS43NVpNMzE4LjI3NSAxMTQuNDE0TDMxOC44NjcgMTEzLjAzNkMyNjQuMjk5IDg5LjYxNzggMTk4Ljk4NCAxMDEuMjgxIDE1NC42NTMgMTQ3LjQ3N0wxNTUuNzM1IDE0OC41MTZMMTU2LjgxOCAxNDkuNTU0QzIwMC4yNzYgMTA0LjI2NyAyNjQuMjU1IDkyLjg2MzYgMzE3LjY4MyAxMTUuNzkzTDMxOC4yNzUgMTE0LjQxNFpNMTU1LjczNSAxNDguNTE2TDE1NC42NTMgMTQ3LjQ3OEMxMTIuMDIgMTkxLjkzOSA5OC42Mjc5IDI2MC4yNjUgMTIxLjY0MSAzMTguNTc4TDEyMy4wMzYgMzE4LjAyN0wxMjQuNDMyIDMxNy40NzdDMTAxLjg0NCAyNjAuMjQyIDExNS4wMDYgMTkzLjE1OSAxNTYuODE4IDE0OS41NTRMMTU1LjczNSAxNDguNTE2Wk0xMjMuMDM2IDMxOC4wMjdMMTIxLjY0MSAzMTguNTc4QzEyOS45OCAzMzkuNzE3IDEyNy4zMjYgMzU3LjcwNCAxMTkuMTIgMzc0LjI2N0MxMTAuODY1IDM5MC45MjggOTcuMDEzNCA0MDYuMTExIDgyLjkxNDggNDIxLjU2NEw4NC4wMjI5IDQyMi41NzVMODUuMTMxIDQyMy41ODZDOTkuMTU3NiA0MDguMjEyIDExMy4zMjkgMzkyLjcxMSAxMjEuODA4IDM3NS41OTlDMTMwLjMzNSAzNTguMzg5IDEzMy4xMjUgMzM5LjUxNiAxMjQuNDMyIDMxNy40NzdMMTIzLjAzNiAzMTguMDI3Wk04NC4wMjI5IDQyMi41NzVMODIuOTE0NiA0MjEuNTY0QzcyLjk2MzMgNDMyLjQ3NSA2Mi44OTExIDQ0My40NzggNTQuNzY5IDQ1NS4xNDNMNTYgNDU2TDU3LjIzMSA0NTYuODU3QzY1LjIxOTUgNDQ1LjM4NCA3NS4xNDkgNDM0LjUzMSA4NS4xMzEyIDQyMy41ODZMODQuMDIyOSA0MjIuNTc1Wk01NiA0NTZMNTcuMDIyNSA0NTcuMDk4TDE4NC4wMyAzMzguNzc0TDE4My4wMDcgMzM3LjY3N0wxODEuOTg1IDMzNi41NzlMNTQuOTc3NSA0NTQuOTAyTDU2IDQ1NlpNNDAwLjk3OCAxMTMuMjA0TDM5OS44OTMgMTEyLjE2OEwyMDkuMzY1IDMxMS43NTlMMjEwLjQ1IDMxMi43OTRMMjExLjUzNSAzMTMuODNMNDAyLjA2MyAxMTQuMjRMNDAwLjk3OCAxMTMuMjA0WiIgZmlsbD0iI0ZDRkNGQyIgbWFzaz0idXJsKCNwYXRoLTMtaW5zaWRlLTFfMzA0XzExMSkiLz4KPGRlZnM+CjxmaWx0ZXIgaWQ9ImZpbHRlcjBfZF8zMDRfMTExIiB4PSItMjQiIHk9Ii0yMiIgd2lkdGg9IjU2MCIgaGVpZ2h0PSI1NjAiIGZpbHRlclVuaXRzPSJ1c2VyU3BhY2VPblVzZSIgY29sb3ItaW50ZXJwb2xhdGlvbi1maWx0ZXJzPSJzUkdCIj4KPGZlRmxvb2QgZmxvb2Qtb3BhY2l0eT0iMCIgcmVzdWx0PSJCYWNrZ3JvdW5kSW1hZ2VGaXgiLz4KPGZlQ29sb3JNYXRyaXggaW49IlNvdXJjZUFscGhhIiB0eXBlPSJtYXRyaXgiIHZhbHVlcz0iMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMTI3IDAiIHJlc3VsdD0iaGFyZEFscGhhIi8+CjxmZU9mZnNldCBkeT0iMiIvPgo8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxMiIvPgo8ZmVDb21wb3NpdGUgaW4yPSJoYXJkQWxwaGEiIG9wZXJhdG9yPSJvdXQiLz4KPGZlQ29sb3JNYXRyaXggdHlwZT0ibWF0cml4IiB2YWx1ZXM9IjAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAuMTYgMCIvPgo8ZmVCbGVuZCBtb2RlPSJub3JtYWwiIGluMj0iQmFja2dyb3VuZEltYWdlRml4IiByZXN1bHQ9ImVmZmVjdDFfZHJvcFNoYWRvd18zMDRfMTExIi8+CjxmZUJsZW5kIG1vZGU9Im5vcm1hbCIgaW49IlNvdXJjZUdyYXBoaWMiIGluMj0iZWZmZWN0MV9kcm9wU2hhZG93XzMwNF8xMTEiIHJlc3VsdD0ic2hhcGUiLz4KPC9maWx0ZXI+CjxjbGlwUGF0aCBpZD0iYmdibHVyXzFfMzA0XzExMV9jbGlwX3BhdGgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDI0IDIyKSI+PHBhdGggZD0iTTAgMjU2QzAgMTY2LjM5MiAwIDEyMS41ODcgMTcuNDM5IDg3LjM2MTVDMzIuNzc4NyA1Ny4yNTU2IDU3LjI1NTYgMzIuNzc4NyA4Ny4zNjE1IDE3LjQzOUMxMjEuNTg3IDAgMTY2LjM5MiAwIDI1NiAwQzM0NS42MDggMCAzOTAuNDEzIDAgNDI0LjYzOCAxNy40MzlDNDU0Ljc0NCAzMi43Nzg3IDQ3OS4yMjEgNTcuMjU1NiA0OTQuNTYxIDg3LjM2MTVDNTEyIDEyMS41ODcgNTEyIDE2Ni4zOTIgNTEyIDI1NkM1MTIgMzQ1LjYwOCA1MTIgMzkwLjQxMyA0OTQuNTYxIDQyNC42MzhDNDc5LjIyMSA0NTQuNzQ0IDQ1NC43NDQgNDc5LjIyMSA0MjQuNjM4IDQ5NC41NjFDMzkwLjQxMyA1MTIgMzQ1LjYwOCA1MTIgMjU2IDUxMkMxNjYuMzkyIDUxMiAxMjEuNTg3IDUxMiA4Ny4zNjE1IDQ5NC41NjFDNTcuMjU1NiA0NzkuMjIxIDMyLjc3ODcgNDU0Ljc0NCAxNy40MzkgNDI0LjYzOEMwIDM5MC40MTMgMCAzNDUuNjA4IDAgMjU2WiIvPgo8L2NsaXBQYXRoPjxjbGlwUGF0aCBpZD0iY2xpcDBfMzA0XzExMSI+CjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiBmaWxsPSJ3aGl0ZSIvPgo8L2NsaXBQYXRoPgo8L2RlZnM+Cjwvc3ZnPg=="}],"video":[{"name":"B站","url":"https://search.bilibili.com/all?keyword=%s","favicon":"https://www.bilibili.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRo4BAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSM4AAAABgBvZttvmUeYj+0gNKwKakIsJtsSQDZAdvJF3PXA+ZEKv6Mh9h5HyiJgAGefO4mFpw+zycbETsgeoDbEK7IUcAqj1WQU4CjEKoOVvVgHUhIhVAC1/WAXQUrymP34i6dNxb0Rkek3G66mYa7LeFDMyz46BdS1J6zVw/AHUkrgG3gEkOd5xtM61vta5Ns6B8zlwcQA+gPE5GHwOhrhu2HS+bth0cWn/hw+gTlUBT8fAqkozXQHHPZn74ibPbSHT6xw3UxEx8/PnNM/ncyN/IFZQOCCaAAAAkAYAnQEqIAAgAD4xFohDIiEhFAaoIAMEswBdnMb/APxA1Qrqv4VywD+AewDMOf7d7f/RgaVn7F4EOHRHAAD+5QWfa3eOfvWuTk9JPs4H8cRcdGuAwui+d+VLQtu9fSVv/SGl2fnx3F+ggcT/iq0eknNHR9KWLEXn+d1F0Yp6D8pLcF17FziXgT44yJ6nPi+VLkT1OfE8V4AAAA=="},{"name":"Trakt","url":"https://app.trakt.tv/search?m=media&q=%s","favicon":"https://app.trakt.tv/favicon.svg","faviconData":"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0OCIgaGVpZ2h0PSI0OCIgdmlld0JveD0iMCAwIDQ4IDQ4Ij48cmVjdCB3aWR0aD0iNDgiIGhlaWdodD0iNDgiIHJ4PSIxMC44MCIgZmlsbD0iIzY0MzhEMCIvPjxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMjQwIDYuMjQwKSBzY2FsZSgwLjU4MjMwKSI+PGcgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjRkZGRkZGIiBzdHJva2Utd2lkdGg9IjcuMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48cGF0aCBkPSJNNTYuMDAgMzguOTVBMjcuNSAyNy41IDAgMSAxIDM2LjE5IDMuMjAiLz48cGF0aCBkPSJNMTYuOTMgMjcuMTFMMzUuODIgNDIuOTZNMjkuOTIgMzQuNzVMNTMuODkgNi4xN001Ni42OSAxOC4zMUw0Mi40OSAzNS4yNE0yNi44OCAyMi40MUwyMy4zNiAxOS40NSIvPjwvZz48L2c+PC9zdmc+"},{"name":"SubHD","url":"https://subhd.tv/search/%s","favicon":"https://subhd.tv/public/images/favicon.ico","faviconData":"data:image/webp;base64,UklGRgAFAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSG0BAAABgGRt2/HmTVLb9t8NWDux27HdLsHu1LbtdmbbNmbJ/31l8KwgIiaAlNW1FnwiUgqbe4dWRc7FlaHelsLUSF/BWpfUahdSMnUl52pUXE+XhtqrZpS088642tn7bpKRclKvSZFrmE15SZXQiTzhgCeROv9Iox445EOk9C+fUw566vOHyQyHnTH+lcZwWBoROexz4D0HotB3pI8w0itjSKxcz2aaQ8/YCNdYN4KvHEvhF8nBo5LRkgvQCmrR6jrQOobQhmbQZo7RtvfQNjbQ1k7RtufQZgbRhjrR2hvRaovQClPRUmPQYgIVWAp/4RbrRrCdxZq10atkSKxSjyI/kD4iiJwOkQ6ciCiX4bAcIiKzJZwls18UcIlyFUB/yhKfMZ4TZX+RXuIlwnWiHv0vC1himmJLgTJS2jz/8JOpj30e5puTyq7RNfN3ojrE27nqaBdSq76tZ3BcekVT1+iynHP58mhXU3l6bKCnrT4pCwBWUDggbAMAAPAVAJ0BKjAAMAA+MRiKQ6IhoRHEgCADBLYAVhygvwD8K+pojzwD8MP2x6Dvenurhmv1j7UfdX/M+cQ/qv8A/FDhAfxz+2/5T+jcIB+l/WAegB+1Xqh/439gP//8in68fq78Bn8r/vn/Zup/1AdoF40Pd/wHCDoZvyA47nhH8y/wts1mTeOj6D9gT9Wf+FwJqStGAWBMnO552kONf7uhM3vryFxE7eFJPhtQ4C6/ShLBcc5q7+DUbQAA/vVtuo0tb2S77Dyg/98l2Ncd/xJfZd4tGMiYlXSTuB5PlDp623ax8dMUw0BMiBmNXkG0wXICz9BrpUFRwigIhjlFqWP27/t0dCquqqOgY8ngCuYKqEW1z3P7CikNQae3VnyHqavueKso+fGwtgMYnbrgtHD/3UhxJvIT4sLu2UlKs+f+0CwQPM+oEF9F+jHqH7utat/6VBTS76upbmSsGiXUU+i5ZkuBhlYkjs3aI+3yMWWrXEeFVVf/0dQlHXp3bAf3Y11P3f9RwVnQx9Sv8bguO/h/QasqdPzushv2c8TF7Q6fpOkI0fw+2eePfIbdxjU3PlM5EIjf0Eq46aN2sMdHcOue0EFDqYa+OzJV3Pjxr5OBQPURGuaesR9PD3Zdb/+1LmW1+o3oaeBn+MUK5Yph+fZLE7i3gkIoJU+asA4YtEOYh1tNKp8BMG+w+XxYejw3Bh1O4hhBWv0rPXgK7MAZbzCLvUD//+TOiy6+36eYVTFQ/v/k8ABzGmyZ/VyZp/3bzn//8Swf1l08dfzWhI6iT/dT7/NgAff985Ui1tZCUQ5NMdsBjNDtGTX6QKtBjYvVV0GEqEONKCM94i9DmLe/TqTnL4vaj8nUvszgwZ4Emu/I8sz/FwWr72Oq2vfORmkKezRd4jdlegu5utECiT/CR7Ukfg7qyZPqYxkmU/YT//yXo8bwuj5sJ7xrmntIO3hPWLGiOdJgDWsOKmmgFDBB7HdK/Qre62iMzL+1b35VdIVmDMisn1YZzCQtgnXunxicnwUjsdNjFHQm+NtLR1hEMnQXJAWTzZghvIStfIDegDP0tjpG8o65nuDGBM4gZf9bbtI8JH0rvgiPwEo7ugkBr0GbtGyMRspyoLgBPxygkxHYWAxoDN0tTPzWO6Qo8IBxoK/guOK9Xt5tlZoy3OfAAA=="},{"name":"豆瓣电影","url":"https://www.douban.com/search?cat=1002&q=%s","favicon":"https://www.douban.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRkwCAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSB0AAAABUBIADZMP+kc4i4FGz0TEBCCdBuk4fb9ZHW8jAgBWUDggCAIAABAPAJ0BKiAAIAA+MRSIQqIhIRgMBgAgAwS2AE6ZQjpL1XiA9szALpoYKekB5gP2Q9f/0AegB/lf7N1gHoAfsd6Xvsfftz+0ftAXKXkp/V3Hk+MH8l/FWoIfyL8iqox/TfRS/VfxV9bPyr6Iv+NDMquHVbbGcHLyseTpjq9sFqSCgAD+/ESz/9U+P+mNwwMKnr9dvAQcrv6v/SgJ8GTmcb+8bLbn0ATlqjX0J5KSJ4K9wpmYUqv/4/fBTe9SW0njg3hEmf8WIxef//XwW0ma8YmeS8/ykvgh/mmszmInmjcaxnBF8qfrvkNjz6tO3z6lQ6f9IOrQrceTmu9vEDEql9TZ/2I7XpX7+P+UevwNiUtAhgsbbqf7RXexQzWpRvlnWoNqacHYRMYV/96qmhkxBByYZ3nSZh6/bPchHGm1e0Ce/1s/7synGiYDX1Q9e5+YbP5GHBkp6gQ5AoKjZKyw+H0MyIHhlSBrPt7uX/jF5ZedENxLuwl3lmfhEB4S//+m8d+T1TxhqTnQra8xPeKnpr2iS1SUykTmp3s666fZZ3PeAxWUg0VJMXwhLuF6gqyuQr+ocIM7eFq9Sww6+Ru3dxp+Lsr+OS50/59NsFq3ZlBNpuTwCWn0Yj/4aHKlipxPHEyLaIk7++/YHiZ6aFoTHBt2hQaGKpDVB/Re1Q71kPVIg/yQt7HMAAA="},{"name":"YouTube","url":"https://www.youtube.com/results?search_query=%s","favicon":"https://www.youtube.com/s/desktop/f51d9955/img/favicon.ico","faviconData":"data:image/webp;base64,UklGRpoCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSOIAAAABgFtt2/LkbeO6h1uZdNnAM4LrEAkOpZWREnfYINbhTvni8P0nwe1By4iYAPqfltlD2eJoZWqtvrl7xMy39/f39zfMfLS7UV+bKo8Ws0G77DXTpHQPKU2aXwiKe1gRIiK7uAcWJqLFe+hJ0nexJKXvHtyTRouNoA3U0MqraEtttNYp2hGj8SXaxf2v/xLtnNH4BO2ojdZcRVuqoZWH0QbSaDEfmtfYxZJUtIg1SWQWSMJERH6BI0L03DTdwejMW+lVpTtaKE3UZtbrW7snzHz77JaZj3c36+sz1fFSPuJS0v80VlA4IJIBAABwDACdASowADAAPjEUiEMiIQnOA2wQAYJbACzs9p/T7Z+Lv43dFSNXzAeoDxAP6r9gHcA8wH6If5n+O+//0gH+A/gHoAdYB+lfpP/5L+gfC19oHwD/o0U4Z/AeKbMwFCrWBClY9SVJ11RHQcAA/vgEIlNVKXtvStxLxv/HL7V0XisLr/Owv8qmkvRv8ivfcT1P8bX7OsFXf/NQGlBpJEatn90OLRPf1/+Gtu0zkhbt6zXs6L9mXeIo/op0xtPhobb9zPOaJk3mX5aHfsidkZN33PvCVn3/1RVMJ7BL9G8G9lXUqDxawPzJk1XFew0iOR5uPIbok3nemSiZuiM1M8OzVAkHeUTU/URRxkfr/+mvZu3BUSYSLQQVVF6dOvn3+COpBScdjJMSH/74KrW7WTsF/BP8E7walD7KDoU+zffDBSGcgFgCeTJnDUmOSUSumK3cstIf8oAH1PzFC6s/LQXT4Oo6ahS6P9+O380H8qcAeikCmgEt+klr4R7XmMt++T8KD5Wf/JDUm6iYTQuQiiFCAAA="}],"books":[{"name":"Z-Library","url":"https://zh.z-lib.sk/s/%s?","favicon":"https://getzlib.com/logo.svg","faviconData":"data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNzYyMDQ3MjkyODU1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjE2MDAiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCI+PHBhdGggZD0iTTEuMTUyMjM0IDEuMTUyMjM0aDEwMjEuNjg1OTN2MTAyMS42ODU5M0gxLjE1MjIzNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjE2MDEiPjwvcGF0aD48cGF0aCBkPSJNMzcyLjM3MzIzOCAxNzIuNjA0NjZsMTE5LjIyNzQxOCAzNjIuMDEyNzM0IDAuMDQ4MDEtMC4wMTkyMDQgMS41MDc1MDYgNC4zNzg0OWM1LjcwMzU1OS0yLjM2MjA4IDExLjkwNjQxOC0zLjc4MzE2OCAxOC40NTQ5NDktMy44NzkxODggNy4wMTkwMjYtMC4xMTUyMjMgMTMuNzg4NDAxIDEuMjY3NDU3IDIwLjA0ODg3MiAzLjgyMTU3NmwxLjQ0MDI5My0zLjk4NDgwOSAwLjIzMDQ0NyAwLjA3NjgxNSAxMTQuOTczNzU0LTM2Mi4zOTY4MTJoLTcuMDU3NDM0TDUyOC42MDY1NzMgNTI3LjI0MzA5Nmw3MC4xOTk4Ni0zNTQuNjM4NDM2aC02Ljg0NjE5MWwtNjguNzQwMzYzIDM0Ni4zMDM5NDMgMzIuOTE1NDg2LTM0Ni4zMDM5NDNoLTYuNzU5NzczbC0zMy41OTcyMjUgMzU2LjEwNzUzNWMtMC40ODk2OTktMC4wMjg4MDYtMC45NTA1OTMtMC4xMDU2MjEtMS40NDAyOTItMC4xMjQ4MjZsMC43MjAxNDYtMC4wMDk2MDIgMi4xMjIwMzEtMzU1Ljk2MzUwNWgtNi43NjkzNzVsLTIuMTAyODI3IDM1Ni4wNzg3MjloMC4xNjMyMzNjLTAuMjg4MDU5IDAuMDE5MjA0LTAuNTc2MTE3IDAuMDY3MjE0LTAuODczNzc3IDAuMDk2MDE5bC0yOS40NTg3ODQtMzU2LjE3NDc0OGgtNi43Nzg5NzdsMjguNzM4NjM3IDM0OS42MTY2MTYtNzUuMzg0OTEyLTM0OS42MjYyMThoLTYuODk0Mmw3My40NDUzMTggMzQwLjU0Mjc3My0xMTEuNzg1OTA2LTM0MC41NDI3NzNoLTcuMTA1NDQ0eiIgZmlsbD0iI0M4QzZDNyIgcC1pZD0iMTYwMiI+PC9wYXRoPjxwYXRoIGQ9Ik01NDguMzY3Mzg3IDg3NS4yNzUzOVY2NjAuOTExODQ4aC03NS45ODAyMzN2MjE0LjM2MzU0MmwzNy45NzU3MTMtMzkuMDk5MTQyIDM4LjAwNDUyIDM5LjA5OTE0MnoiIGZpbGw9IiM3MUE3QzUiIHAtaWQ9IjE2MDMiPjwvcGF0aD48cGF0aCBkPSJNNzU2LjA1NzU3NCAxNDguNzI0NjFsLTkwLjQwMjM2MyAyMy44ODAwNS0xMzUuMDUxNDMyIDM2NS45NTkxMzZoLTM3LjIwNzU1OEwzNTguOTExMzA0IDE3MC42NTU0NjRsLTkwLjk3ODQ4LTIxLjkzMDg1NCAxNzQuMzMzMDExIDQ3My44NDY2NSAxNDEuMjI1NDg3IDAuMTM0NDI3eiIgZmlsbD0iIzYyNjA2MiIgcC1pZD0iMTYwNCI+PC9wYXRoPjwvc3ZnPg=="},{"name":"豆瓣读书","url":"https://www.douban.com/search?cat=1001&q=%s","favicon":"https://www.douban.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRkwCAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSB0AAAABUBIADZMP+kc4i4FGz0TEBCCdBuk4fb9ZHW8jAgBWUDggCAIAABAPAJ0BKiAAIAA+MRSIQqIhIRgMBgAgAwS2AE6ZQjpL1XiA9szALpoYKekB5gP2Q9f/0AegB/lf7N1gHoAfsd6Xvsfftz+0ftAXKXkp/V3Hk+MH8l/FWoIfyL8iqox/TfRS/VfxV9bPyr6Iv+NDMquHVbbGcHLyseTpjq9sFqSCgAD+/ESz/9U+P+mNwwMKnr9dvAQcrv6v/SgJ8GTmcb+8bLbn0ATlqjX0J5KSJ4K9wpmYUqv/4/fBTe9SW0njg3hEmf8WIxef//XwW0ma8YmeS8/ykvgh/mmszmInmjcaxnBF8qfrvkNjz6tO3z6lQ6f9IOrQrceTmu9vEDEql9TZ/2I7XpX7+P+UevwNiUtAhgsbbqf7RXexQzWpRvlnWoNqacHYRMYV/96qmhkxBByYZ3nSZh6/bPchHGm1e0Ce/1s/7synGiYDX1Q9e5+YbP5GHBkp6gQ5AoKjZKyw+H0MyIHhlSBrPt7uX/jF5ZedENxLuwl3lmfhEB4S//+m8d+T1TxhqTnQra8xPeKnpr2iS1SUykTmp3s666fZZ3PeAxWUg0VJMXwhLuF6gqyuQr+ocIM7eFq9Sww6+Ru3dxp+Lsr+OS50/59NsFq3ZlBNpuTwCWn0Yj/4aHKlipxPHEyLaIk7++/YHiZ6aFoTHBt2hQaGKpDVB/Re1Q71kPVIg/yQt7HMAAA="},{"name":"孔夫子旧书","url":"https://search.kongfz.com/product_result/?key=%s&order=100","favicon":"https://www.kongfz.com/img/pclogo.jpg","faviconData":"data:image/webp;base64,UklGRtoDAABXRUJQVlA4IM4DAADwFQCdASpAAEAAPjEWiUKiISEYDfyAIAMEsQBllO0eh/dOUoAC8htk/MB+p/UT3kD0AP0r9Mz2Nf3I/ar2qLmT0UfZv1wzh31r+zfj3+W+oS/sH44/wDMMvkX+Z3TP0G/8B+WnMDRd/477gPip/x/Kt85/6z3A/41/PP9B/Zv3S/wnageyT+zKF+qlMTcgo4QRnRU24DfqGtyFvEaPmwYHrYXZneb3rO8pj1BohCaAwmCdWFNKZuSAAP774XvrY788AH/iQv+JC/4kL/hAgCdmwa9c8tgd4O2wnQ2u03UHD//If+7Nei2m4p/7x3hRV1dklt2CD1zrdT7DKgPZ+5uhfwz8G3ZKHxQvumn4/44jd38jVsBit6vFANpu1PjMx5XtdRyTyAPbeyCEUvviLZiRlGvvDhWXeqgmN57zrirsEe/0lU32zWRxJVRiT3UV6gRIbc8UZc5yJoRHXOHNbR4ShSnh6P04rxGC4r2OwaXyw78HPkqyZlDehvwMw6IL2A+typZIM3/z+2XeSbsX/krFjZ61q9//+S3FfYahksMj1v4zujhRV/+3qX6v5/6bwv+AlqY6bIPTcZNMNVhZhGOq3VzCm4186d0d/4Ovyf6Y5jVDNh7cMENw81HioZGn6gjSsZX0I5dGtmf/C0H8ed/8afH97fKtNB/wHx0spFtp3LanTOvfUb1wCG1jsXsBYaQpEbTJgBe/M8MDQdR6OWnLChTkgFkNIF0QI6NmVA/zLNADpHMGr/2jXu4LpNrG/hITh+T9tekgG5wqtI/74gt8Tt17sUVuGfpXztBFApITtsWYx74WX3hKzjaS36fN6B/rxQEVlCwfuS16cfr1I+Wka+GZfnsE6binSKWGG8QbMxPtvqTwm2UjnJXb9Wv//y8d8etpHjcllINn7LW7olojqO5WatHuVvkal1v+FIvC4fCS7zrEnTonfdaP0Rw8NIBdFaKowb2P3P3txQriCa29JUDpWBRcIvQrOnkho36bGuIWrOoQ3dq3Cgvyp4e5svt3aKQXoOpHlOvXOXw27m/Ol6YT+JQ1yMymKihubh5UCQi9Jz4R81h8ED0ngLueNA1ZT+K/QoZP/tpbHtwB2C3eXq6Zqq8QBe64uV2pxucjz7jzfzpYUgKFQ2IwJsTDyIv+M11hQH7pEYK7FDVxzPiPc2TYuEyws8LizurRGtKmhbpz9HgQscY/KjPEPmWUak/WkpznWtwmiOW6WRFF95y6aAqC3zYlHZB89wNi06INnR4Z/4Sv+unIreNYu3kE5BUntpN9Hx34xVN0AAAAAA=="}],"tools":[{"name":"金山词霸","url":"https://www.iciba.com/word?w=%s","favicon":"https://www.iciba.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRpICAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSC0AAAABUBrJVtMLqX+ZQz3/f2gBfRYVERPgshgo2dUH10tdzij73y51uU3t1MVA6QkAVlA4ID4CAACwDgCdASogACAAPjESh0KiIQwDABABglsAJ0yhH43gH45cm5s32WyaPkp+m/jd/Vd4O/sn4u8AD9QP1d9ivqAP2A6wD9gPYA/VX0a/2I+Bf9k/1k9mOgQMd2ubjOumlf6f8tBoJHPP10UgWGiICBgRjb8oaX32QuEO+QRVFhwA/q6hk02NOIy3v2wq/8xui3+B5x/FOBLeUX2ndfCXNtR3bE8qfp7LtApTPsIKdN0uDre/zCfeCTxp0//2ViHweVAutGDJFx7QqMlkQOOJ8jZ+/PFL6PdPTtLcLX/8jWEIm2RzL7XZwxRwjTl73WptuL+WVQ40zZMUfCUqYrwf9mar0xmV3ctWRFQx3HvfYvCHG65i07vn8Cpg5/4VZ4XBfDxyJEvGmZ6WG4UcI/5kq8Txyef5dgqK2lkz5JdexvYGgGsTYGfl0x8tM1K9lXeepH/QnqDcIxhSNJiz6jlzrCzLbLv//w0jfiBX8EU/n3jCjyQ7F/hvUPj4WT/3u7D/8drK36RdlCQb+fuT7wKZLXOqB9fOWS/te5+ux3FkkstxUtPxGgKY/OSd2FsgTvVf3zfNa59x1ftjH8IVQN9b+ZR7Tg1UxVTmNoyf/whlLt/JifJpcrFJH+D8QV8/X6buv9SqMdTLWeVy8ntA6wB4aJOpVU7W1nMRvYT7M7m+imfzP/0fqAeG0ID7E1Hi1W9Hdm6uxGSXEl0rNEAlipc9N9hbCXbfkE8kB4Rp9xCxkQCfCpSoOBY5gdJpCyE9gwAA"},{"name":"Github","url":"https://github.com/search?q=%s","favicon":"https://upload.wikimedia.org/wikipedia/commons/a/ae/Github-desktop-logo-symbol.svg","faviconData":"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPgogICAgPGRlZnM+CiAgICAgICAgPGNpcmNsZSBpZD0iYiIgY3g9IjY0IiBjeT0iNjQiIHI9IjU2Ii8+CiAgICAgICAgPGZpbHRlciB4PSItNy4xJSIgeT0iLTUuNCUiIHdpZHRoPSIxMTQuMyUiIGhlaWdodD0iMTE0LjMlIiBmaWx0ZXJVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIGlkPSJhIj4KICAgICAgICAgICAgPGZlTW9ycGhvbG9neSByYWRpdXM9IjEiIG9wZXJhdG9yPSJkaWxhdGUiIGluPSJTb3VyY2VBbHBoYSIgcmVzdWx0PSJzaGFkb3dTcHJlYWRPdXRlcjEiLz4KICAgICAgICAgICAgPGZlT2Zmc2V0IGR5PSIyIiBpbj0ic2hhZG93U3ByZWFkT3V0ZXIxIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIyIiBpbj0ic2hhZG93T2Zmc2V0T3V0ZXIxIiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29tcG9zaXRlIGluPSJzaGFkb3dCbHVyT3V0ZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0ib3V0IiByZXN1bHQ9InNoYWRvd0JsdXJPdXRlcjEiLz4KICAgICAgICAgICAgPGZlQ29sb3JNYXRyaXggdmFsdWVzPSIwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwIDAgMCAwLjI0MDk0MjAyOSAwIiBpbj0ic2hhZG93Qmx1ck91dGVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iNTAlIiB5MT0iMCUiIHgyPSI1MCUiIHkyPSIxMDAlIiBpZD0iYyI+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiNGRUZFRkUiIG9mZnNldD0iMCUiLz4KICAgICAgICAgICAgPHN0b3Agc3RvcC1jb2xvcj0iI0UwRTBFMCIgb2Zmc2V0PSIxMDAlIi8+CiAgICAgICAgPC9saW5lYXJHcmFkaWVudD4KICAgICAgICA8Y2lyY2xlIGlkPSJkIiBjeD0iNjQiIGN5PSI2MyIgcj0iNTIiLz4KICAgICAgICA8bGluZWFyR3JhZGllbnQgeDE9IjUwJSIgeTE9IjEwMCUiIHgyPSI1MCUiIHkyPSIwJSIgaWQ9ImciPgogICAgICAgICAgICA8c3RvcCBzdG9wLWNvbG9yPSIjNDkyNzc5IiBvZmZzZXQ9IjAlIi8+CiAgICAgICAgICAgIDxzdG9wIHN0b3AtY29sb3I9IiM4OTI3OTMiIG9mZnNldD0iMTAwJSIvPgogICAgICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICAgICAgPHBhdGggZD0iTTEyIDY0LjAzNGMwIDIzLjAyNSAxNC44ODUgNDIuNDcyIDM1LjU1NSA0OS4zNjcgMi42LjQ1NiAzLjU3NS0xLjEwNSAzLjU3NS0yLjQ3IDAtMS4yMzctLjA2NS01LjMzNC0uMDY1LTkuNjkyQzM4IDEwMy42NDQgMzQuNjIgOTguMDUgMzMuNTggOTUuMTI0Yy0uNTg1LTEuNDk2LTMuMTItNi4xMTQtNS4zMy03LjM1LTEuODItLjk3Ni00LjQyLTMuMzgyLS4wNjUtMy40NDcgNC4wOTUtLjA2NSA3LjAyIDMuNzcyIDcuOTk1IDUuMzMzIDQuNjggNy44NyAxMi4xNTUgNS42NiAxNS4xNDUgNC4yOTMuNDU1LTMuMzgyIDEuODItNS42NiAzLjMxNS02Ljk2LTExLjU3LTEuMy0yMy42Ni01Ljc4OC0yMy42Ni0yNS42OSAwLTUuNjYgMi4wMTUtMTAuMzQzIDUuMzMtMTMuOTg1LS41Mi0xLjMtMi4zNC02LjYzNC41Mi0xMy43OSAwIDAgNC4zNTUtMS4zNjUgMTQuMyA1LjMzNCA0LjE2LTEuMTcgOC41OC0xLjc1NiAxMy0xLjc1NnM4Ljg0LjU4NiAxMyAxLjc1NmM5Ljk0NS02Ljc2NCAxNC4zLTUuMzMzIDE0LjMtNS4zMzMgMi44NiA3LjE1NCAxLjA0IDEyLjQ4Ny41MiAxMy43ODggMy4zMTUgMy42NDIgNS4zMyA4LjI2IDUuMzMgMTMuOTg0IDAgMTkuOTY4LTEyLjE1NSAyNC4zOS0yMy43MjUgMjUuNjkyIDEuODg1IDEuNjI2IDMuNTEgNC43NDggMy41MSA5LjYyNiAwIDYuOTYtLjA2NSAxMi41NTMtLjA2NSAxNC4zMSAwIDEuMzY1Ljk3NSAyLjk5IDMuNTc1IDIuNDdDMTAxLjExNSAxMDYuNTA3IDExNiA4Ni45OTUgMTE2IDY0LjAzNSAxMTYgMzUuMjg0IDkyLjczIDEyIDY0IDEyUzEyIDM1LjI4NSAxMiA2NC4wMzR6IiBpZD0iZSIvPgogICAgICAgIDxmaWx0ZXIgeD0iLS41JSIgeT0iLS41JSIgd2lkdGg9IjEwMSUiIGhlaWdodD0iMTAyJSIgZmlsdGVyVW5pdHM9Im9iamVjdEJvdW5kaW5nQm94IiBpZD0iZiI+CiAgICAgICAgICAgIDxmZU9mZnNldCBkeT0iMSIgaW49IlNvdXJjZUFscGhhIiByZXN1bHQ9InNoYWRvd09mZnNldE91dGVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMSAwIDAgMCAwIDEgMCAwIDAgMCAxIDAgMCAwIDAuNTI5Mjk2ODc1IDAiIGluPSJzaGFkb3dPZmZzZXRPdXRlcjEiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgICAgICA8ZmlsdGVyIHg9Ii0xJSIgeT0iLTElIiB3aWR0aD0iMTAxLjklIiBoZWlnaHQ9IjEwMyUiIGZpbHRlclVuaXRzPSJvYmplY3RCb3VuZGluZ0JveCIgaWQ9ImgiPgogICAgICAgICAgICA8ZmVHYXVzc2lhbkJsdXIgc3RkRGV2aWF0aW9uPSIxIiBpbj0iU291cmNlQWxwaGEiIHJlc3VsdD0ic2hhZG93Qmx1cklubmVyMSIvPgogICAgICAgICAgICA8ZmVPZmZzZXQgaW49InNoYWRvd0JsdXJJbm5lcjEiIHJlc3VsdD0ic2hhZG93T2Zmc2V0SW5uZXIxIi8+CiAgICAgICAgICAgIDxmZUNvbXBvc2l0ZSBpbj0ic2hhZG93T2Zmc2V0SW5uZXIxIiBpbjI9IlNvdXJjZUFscGhhIiBvcGVyYXRvcj0iYXJpdGhtZXRpYyIgazI9Ii0xIiBrMz0iMSIgcmVzdWx0PSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgICAgICA8ZmVDb2xvck1hdHJpeCB2YWx1ZXM9IjAgMCAwIDAgMC4yNTg4MjM1MjkgMCAwIDAgMCAwLjEzNzI1NDkwMiAwIDAgMCAwIDAuNDMxMzcyNTQ5IDAgMCAwIDAuNzAzNTQ5NTkyIDAiIGluPSJzaGFkb3dJbm5lcklubmVyMSIvPgogICAgICAgIDwvZmlsdGVyPgogICAgPC9kZWZzPgogICAgPGcgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8cGF0aCBkPSJNMCAwaDEyOHYxMjhIMHoiLz4KICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNhKSIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8dXNlIHN0cm9rZS1vcGFjaXR5PSIuNSIgc3Ryb2tlPSIjQkFCQUJBIiBzdHJva2Utd2lkdGg9IjIiIGZpbGwtb3BhY2l0eT0iMCIgZmlsbD0iI0ZGRiIgeGxpbms6aHJlZj0iI2IiLz4KICAgICAgICA8Y2lyY2xlIGZpbGw9InVybCgjYykiIGN4PSI2NCIgY3k9IjY0IiByPSI1NiIvPgogICAgICAgIDxnPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNmKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICAgICAgPHVzZSBmaWxsPSJ1cmwoI2cpIiB4bGluazpocmVmPSIjZSIvPgogICAgICAgICAgICA8dXNlIGZpbGw9IiMwMDAiIGZpbHRlcj0idXJsKCNoKSIgeGxpbms6aHJlZj0iI2UiLz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg=="},{"name":"知乎","url":"https://www.zhihu.com/search?type=content&q=%ss","favicon":"https://www.zhihu.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRowDAABXRUJQVlA4WAoAAAAQAAAAHwAAHwAAQUxQSMAAAAABT0AgQJnUAh6YZIKICGU8xQBqbVvTkyQLfErA4igBNTksfcx++q5lvLve7yO0ENH/Cdic3LVKwvVus39RmppvtzeRjI6E6tEnYm7K6VeQznBtriKVZwa0Eo1QjXUrDg1DDlFF0EX8u4aBkiAODS2CkDSi/g5TFxFzahAhZJRUlVZSGkIsq5ZtJ1JNBUOpA9PA+CNGp3TRRFSEIPoT0qRGUv3CsEzj6iN0ZBTq9LyWFeV4/6rSWF5tN2cv5jBc7DZWUDggpgIAAPARAJ0BKiAAIAA+MRKIQqIhIRgMBgAgAwS2AE6ZQjqDy/8Vf1V5s/Ykwd61OUDtAbaL9gPUB+p/9y4AD9SesA9AD9UPUq/0XsUft17An7GUs17X+MmTheh/jxoi/6X+NOSi/wH5M6jlpwHpNf3f8v88vzX/uPcE/iP8o/1/AZ/sqW5zL6KIwfU8/AnbD+/3p2AuDuhdDO2AAP70RBvh20zhDyYlxikmjhRo6k5MVf/wvCwLP4hKU8o04T68QJqz9HFSPEpfExvbiFZZ2S9v//4Vw/ynnKqc1oIC+uLSg4uE9lZUIbqB+ae7zp8iVbgnL6D087+f/3PCZiGtYa5vR8JYMmWdo4i2rJ6ND4b/4eHG0xn/+sSdqtbIrm90fFTCFbdQqgLbrn7P7xt0z/tT/1OpytHmg5IDv9uoJxNQczWtF/hORJfUHdW7cv3/waLFgPQ8QP/9MB3y/EzfwTzjt47fys/xcSfTv+wdIsieEf/91drWQQdCzeg3GLKYMS/qrMNZ6UJsD1/iklOih1S5NtHFgi0+JYSfPjVHiIdvJJ9ZffozNRtbkLzvI/gNS1GiZHaAbbtb7MQDD/HOwP3Erkbep7vGxrumJJUKJY+3GXK8OhK62ytfGRSIfBocWXPRdNJFYPRIpHPcSiK9tQCbk8bfyd663SQXqy5aV50TXVPxTqHgigvcxbyH8znkm8IzEW3xw83s7kz470zQ4XTu3rVHH7Uw8cDXYa1wUEr0oox8ntGoBOWqEW0J71j89Znm+i7c/y0nOb89Tjtzf5iD8dj2A4n1nXgZ/f94H+5m9ahrPJexU1yI82B8ceRGC0CAWhopJnFPaXF8Hts///ZqYymx23zZOrPN3Esqd6z7QQkXtVNLJmgxtbUnSrA20glsmB0DzAAAAA=="},{"name":"Wikipedia","url":"https://zh.wikipedia.org/wiki/%s","favicon":"https://zh.wikipedia.org/favicon.ico","faviconData":"data:image/webp;base64,UklGRugCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSC0AAAABUOS2baP/f7p72cmxQERMAPMiyG6RXRThSZEGingC5XuJGgmgxajEXIddBeYAVlA4IJQCAADwEACdASowADAAPjEYiUOiIYjiwBABglpABbarI/7J+F/7Hdmx5nPXPpX45fkzpQ/xA/JnjCbedIJ/r348+wHEKfxz/hf2b1Q/8jycfPf+59wL+P/zD/C/mV/i/mA9bn7Hewz+tiwv4JA2Gqbmp/vEc89UqLuotwbwpIh7QAox8ypCzllbWbwFgwaEa6ojIAAA/v//0oa3P/9H/39ImtuLfoR/Lh3s8rbOlYgdbLRHzms7D/ubAd1k2ccnZWD7N1uXXPXpkP68jM+9FdkBdD4XpWCZitfB/pLo6fH95Q+S7he9EOXpMXEFJVX36VG7arMB82raf/90z80Fv4q+cDw0sMvgcbczQ+gRdjOXouV73+nwLX7eSdVMilgpRGWh40lIQHxTcc6dBy6pOVoihTxEjQ2+YOQtDL4nkP+r+Iu7WOiu2eMJS5I+G1RvRXXkv2PcS2c5S+S1oSoYCUZENdwVw3JLk+YmmV+CBe8gcu610P1RmHa9KUp7cKcwJol1J9/BPBg2ldAUKXQcCQ20pw4ixqbaM4m4r2xk2XKWfE3/oInyITzbRdieNCAqs0NnaS51m/3j//pz9Tr8x0k6ITUoWNtpsFDUTYWh2Qt9uqh1wzl+9sfvsvjqP1Oj9/RJ/4oHTUlT/fFe4E9a8m+khKytZRUWUXe77Yn8hQLoeiFne7B2JqVRAWiNSeik9oWK+IWDdHf3kOS+H5Fib8lPbWcxBsuWWXmAyxGZ+oweKEAJfGQu5Wn+qN8837ZGukjm5/C/qo50gvNhLON6YH+ax/V+zFMoPKPjy45krccRRBcjvM5ZgoXAb82diLPnw9scz1digmG983pFn4ajxDBqOqgyRkUj9ytkwr/h3oYVxZoFlNgAAAA="},{"name":"类义词典","url":"https://www.powerthesaurus.org/%s","favicon":"https://www.powerthesaurus.org/favicon.ico","faviconData":"data:image/webp;base64,UklGRtQCAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSJEAAAABgBRJkiMpoRW0YFbQcmV1dZ54R8QESBIeokiP/x/Dbsj62KTZJs4mzsSZOBNn4lxxziPOV6gSHPVe6yshaMjMtYTGJOiwR73DCffqpH6UIxRXo97pE+75xGOWmJFgJniuLfMNz3vPBqloH3JjWWnEKY00FIbCUBgKK2WhxRk969bqTBJ0291dpeWjwN+PCfcAAFZQOCAcAgAA0A4AnQEqMAAwAD4xFIhDIiEKrVcAEAGCWwAnTLoQQ+S/hX+M3RP7AdmeKtNh0lfovxG9mf8A/ADqGNwB+oH6q+/r5EvsAf0n+zeq//h+sA8oL/d/6P4Ff3O9Hr//lQh8nXgpDdYHBAQSQQlTAHz5+zp4lwUQcOTaO684hjB7QAD+7tPf/ufS9q09vDGHug49vD//uq5Ftg9wSMupia9wRZ3d9/YJDbnA/3UpDQeXMspHXVVlZwQ4mKthce3fmzVXkRoDjTI3gRYS7tU0czqBbV9sQXcbssNvI/2Ov//Jwf/5Qe//8lDzlqz/NDtnfnk2UxTjjNFYB6B/ix08aGXo5QObwiP83XI9jLr7IS1wm1BkPcNkym4b49gSXLRkblMDAjiUMqrCL2vB0TXja5X1i/iTTOLqNhg5f15WHe79eOWEqjn6MlDQgkwZIMHz4N97v/t2JYs52xFxO3lilUlS4AmUoOcHB1fQtTb0vv47djehB41GatOTfmEcFS/kkKb2WATvikhjY/0gB6H45mzKfg1eKAdOpdxkrbMLEqLGq/9Gg13ydyrj63JvKQppmKSOjDLSi+9HkZlYo6teQUbVD8mZ02UelnlJCxGmeQz+B31d3oFwI6XyW2n7LAZvbeFysoBBQ//OSuPBu24Z4pZ4YLJ3nHD//aOjz6Zbo20ft4pT2Poz+ERGPXl+YJ2WFR1iL820nQAwTRUgAAAA"}],"download":[{"name":"人人影视","url":"https://yyets.click/search?keyword=%s","favicon":"https://yyets.click/favicon.ico","faviconData":"data:image/webp;base64,UklGRt4DAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSBcAAAABUNS2DcQfbVUE/V0jsIhIOOqMcHrfAQBWUDggoAMAAPAWAJ0BKkAAQAA+MRaHQqIhCwVXZhABglsAMgcQDYIuO/gh+zP+q6W/Zjuhqpeyw5gPcB/YPEA9SH+mfar3APMB/G/61/uv6B7MHqP9AD9d+sM9ADzVf9X+53wQ/td+3PtZZon/O+0atC4yBxhPALS5MY8YPzj7AX8m/pH/N4HP9dEhc07vJcX9KTisZsEMwNRfgUfTqDQMNbXypzzgzVqFtq2DF3+o+yhLeUKANS+1R5ThpTdbdqCiTldDMhPdQADs+kav3+/yDHnqdP+C9TrjbeD81+x1iBh5FHeHzU65+1vUzzn/iLSlfUOcxf/cTXFop5/hcQsQJ7CBncK/K/ZodHQQJLeCrdW5KD+eXlPa2d2+WK/5yqE1IpMVTgw3D4ysuWSCJ0F8yqjkn9Eq/oNcyK2h7UhFao+dKCQFe4zgDSIeeRP/og6o4cv3lH3Zyh1gnwdhj5WAjMR5kNO9G1Y+OyzAhev5bKy1EyHgFoq/wtNodO4mh+NWynl58uHCOQ7nadlqNN2wy6OU2w+Mk4pNV9FeTdpxwLsDTFw2OdZjRAcR0LbBmJyMEAvgeDSCL2GNzpTi8PBjGzV9P90KfZDIkaEjMB8LIZ0rbqxPpwyyQ1/SaIRzyJCtIrS35RMWL5ur0mIEZFvsE3Y7GGJYB56pzd+b0k+zz7FZneQm1PjomSzzt8Me2Xq64oMw9d6GBYuEQ5e5yQ63QDUMjDRMJAhukc0O8/7fat0mWHWyQrfwXgT0DXVytQagR/6FdSr4IuwO0uP1oJwEPp59/NKCXp1Bt09bUlVIafa4tQ7tuez/tZ8g8nCxEYpEori0Pl0mPOs0sFIRM630fPv9GT+24wyBVQo0v+qYC9HhynJeX5P1hfP1MWcZEJmkeyu/2I0NHQ/0ufLy/iZ/5z8d91f7XWk6UMXMRmNXB+Z9weJlL4oVuQvngnBOtWZSnK0H6XXmRbEIuH5a2rzoBkBLluLawzxLn4hD/+qmP/P7AcY7x+m/TwQnA/TKhxryM0f/qBAK/ygwM28supkGpM9D75PD3rjFCLmPPkCqt9XBf7BtqvhQ3nkTgN/qBUbfb5B5PeS34QcI+SgF5M4SQVxPopSXOfPcJhYHOyPf72R0KR7lwHpP5N83DPwwgnnKcY+4pbOSUiWt70MruIoZSV7tIBvju+OfwstBLrhVS4pFz7MnDo+NE0m5wLdtxy4f9Z37vPUunAr3+uGYwvw9lAAFkqAAAAA="},{"name":"动漫花园","url":"https://share.dmhy.org/topics/list?keyword=%s","favicon":"https://share.dmhy.org/favicon.ico","faviconData":"data:image/webp;base64,UklGRiICAABXRUJQVlA4IBYCAADwCgCdASogACAAPjESiEKiISEYDAYAIAMEsgBOmUI8z8a/FW6DtBBgNsBuJ94A3mSzBNnf2PwB76CMe/O6BZNWkgv+A2Iq1JsTPvuhewYLGP81h/xuBPc3k677o7qJzgAA/v6V1sNYli4B1uRdbdVxwSB1JF5sVn2EI8+kxqHas4JWXKn2TGtLrDkIt4TPgS282jpM2OO6HK79m3JtbeKkgf/zJHxBiBJuxx7BO5+PVpEPw//OcKnpejDDJBj/MKlyeARRH+vB1PxKa3pY67k6QjS0EauZ687k7NjE//1gd0wOhFHpIgyN/358Kjr9gP1NLzxlR3w8w9tlqpk2FjGexT4Yn0IcFivcBDQR35bFPuEhab7HhpeHMl/vyEWH4QuA5ti+1NDrsEoMfY+pHk9ue33kiv/EI2Eu8Hlw7ofJw1sZujuS53CrqfjiX/nA0VwcJmHeb5RfnZLf53DqukktNE+w+UvL88lRHzIQs/bG3ZEGd7cQGFwVmb54Wg/an22gFFPnLKgQXi4pXiEJAc+oRSs4n/jHeRrZlk7sOQzMJHzD17Pca5rpXJK3uWXzlx9ewD7OaeXvfLhX84f817cjt8A9D8VQH554yHLFV74ZAwLvOku40MUIU2zeX6FzSC/lcDjKyS14OKZtHHYBn9z8Lz/A8GsnhmJXqMM+e7HFb/6f8yhjBIoPYLQCrdn3f7Q7ammAAAA="},{"name":"RARBG","url":"https://rargb.to/search/?search=%s","favicon":"https://a.favicon.im/rargb.to","faviconData":"data:image/webp;base64,UklGRqYBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSHgAAAABX8GwbSTFMZ2P8TEiIiD9UirNups2hpSUVeCU01obSQEwjCTZ1H7btnn5R/iUQkT/JwBWXlds6oANFhLehQ4gu0REjdLjqlAq8XNKpUSCe9sqFRRuR4VmQ4Uq0fdwKNF5Z/5yjjhcmQ0NZ4/gtePQ+zDLaRg7XwNWUDggCAEAABAFAJ0BKhAAEAAAwBIlsAJ0ugCTAOk28m53ufxJXZF/Ad7B7gH6O/3IzYwehorSUSAA/v/BvO3NP5V+X2GMimYuDDSjtJVGYJ14n9sXn/+MEkinL2X/IY9HJ/dv0OxDZ2eFE/l/OWWlBQwPFR/N5FiD9rjUU+ukJTtmT/+99XqNNN2YmOguB9P+f/Xv9c+580ykscWmVf5Oth/ag9/3P+lQMDo9qtM4p49LtW1LswNxQjyf1d9APsJ3ryz8VMF34X+Lz/5XXH3oufCr//HaLf4L7wC8l814HsQeAh/8zg4CicCJjfzV7WxtM1IBJRwUNUF+mUXNFYQM88VEcKXUKp9g+IL5iFYAAA=="},{"name":"1337x","url":"https://www.1337x.to/search/%s/1/","favicon":"https://favicon.im/1337x.to?larger=true","faviconData":"data:image/webp;base64,UklGRmIBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSI8AAAABgFvbtqntfq7AX4aUDdhWzAL8FWD9hRghc/Mzol/5n5k7uO/9qiAiJoD8w3i/Ny4TYj3uz5uUagRcKbnrwGeEIp4XIGt6BqpcBs4ScDcAxnLCrL0HgPcMYe9S+3w27iI1F7M5XynUWER7QG8LuFMzxT6BhPEBWOBRmhkwE3M3ga8wFev1xgVCAue9WYX6awBWUDggrAAAALAFAJ0BKhAAEAAAwBIlsAJ0ugH4AfiBTgP6BtAG0AfoBvgHAAfoB1hPmAf03//gwR1TSxr0AAD6S5WGNGNrYBN6SexNld9zk8mniaFvwp9Dz+qnclRxcP979TV1E3/8/ldDgdQQgx/ib52jiX2yuT979an/aKHR+sLFl5WcuCv/uId5x5GVI2nA1I6NXMobzBVXduXNHc+LlgCzM4N/8V9ANI89WkoMP9+SAAA="},{"name":"海盗湾","url":"https://thepiratebay.org/search/%s","favicon":"https://thepiratebay.org/favicon.ico","faviconData":"data:image/webp;base64,UklGRgIBAABXRUJQVlA4IPYAAADwBQCdASoQABAAAMASJaQAM4E8a+WaeJc4A1zX9V/FXmQP8r7gH8V/kn9s/Nn+0miLk2t/7fncAAD+/sye/fci+/8fTBLAQjuf5lazKFFgL/+xg/pzRJNIlF2XQRRQ20QehZmA/rl1/rYX7DPGKi4Ntn//P5/Hj8LKgvPFQ9/s/qiX94v/+Ykwp//eGDcJ9v8soxi6IVkd6avPHWhh+YC//wY71Hs4z/J28nRv/4F/MmBEJ0qE3Pery/CzoJu2BB/8oBzH/Vhf/1ddSp83lYY8P0tv7rC+WhCQI49ZA5qx5qHuyNv87m+KG/bqvkTFkVP/MLWqBAA="}],"user1792802683546":[{"name":"BTSearch","url":"https://www.btsearch.love/search?keyword=%s","favicon":"https://btsearch.love/logo.png","faviconData":"data:image/webp;base64,UklGRs4FAABXRUJQVlA4IMIFAABQHQCdASpAAEAAPjESh0KiIQz9m1QQAYJajxNJ9c/XgX/rzQAg3Mq0T8GbeDv7zRJSuu+cV4pPSM8wH7G+q56Lf836gH9J/zPWS+gx0p/7d/tp7Udzr5Pj2Ozh31i/Dflb8mOxXas/zHy3cindRxgezN7k3+G5BCgB/Iv5v/n/6H+QHyf/7Pll+f/+r7hv8t/qH+b/OD4j+or/Xd13PXvUrHJCVHXuWpt1jJ4BjfUeEyJSGIFmC44GvV8RxVne8xXa7Dc40K8qx6qxsINTvS+jhGZDLohev8hLkxMKikhN0Y6AD3UoTTWgbby9gXfs3cBQ/mAA/v89vOsg9hs/ivnwPhMEPeaW5AMn2gK0cHwJAXIL+U188WuS2XHVAJWPF8LRWDEoudtZsmhSdMWZ2PW0yS0pjtDSCNesfVKfphrA9rsjIWur8lb/E2SGinFxfSdbK/jMtfdGp1fHeaW3p9DLPxG7GGAHtLPrcozoKajP+5jcFc/ZIH4iMJU4KoG5yXYAQKprFnfg3Ijeke+tg383ZSXYje19FEIDueYdlStosZaTtxJXrxGSVq4bYvojss+BIe0sjaNhv/8AchJSiUJE9q+r/pT1cpBps1QnrGcV1nJVP//GkqyJBLSpyd7hBf6c3bJpXehv6USPpHaKv5iPwV6POLyesoZ4jhmc+h70f2s0fiebZEU7k9b+Z1TB+7sjp6PwWiuvp0vkdgu0sHv1tFWQ2FyxwDNdWA3JEqHV683II7mOuL/fLlnu5BbTIr59U4h++sLpqOX2cJKdBeqs/aPwzr3SDZxw7tAbYKVutwlQR8mzFZ6Gf3/8YXpNXdBIVVKiPNHCfSA/9zafMRW8UPCdIPTJ/vfFZhoDIrLJ1tSZdUZkRqpMe9tmTN/NXE7PMtu5PJaws1O3P/2NoH64lm382I25ssjGjqcUj91pYGS2ZtYwESCLimejT07C4pfta3uRZFq+1cP2rMO+yXt6PTRx8kUlu3Ero6Quez7tEB3e1oye49CTy8WduzUPvvAv52XcE5Kg6WS8N0cnUb1ymjIiV3fRUdFM4sw4PC+YCj4Jy14XgRd557hsqvJzPuvRi3rUoyx7DXujiWF6vjZI3a6iMQT9Wd+8jI7jYEMPu8tY8M7oTz5ipx/xY2Hh0ZdgtfLKykMysPOr7mkXGHhmiBn/hq2WjM/L9brWbnAkGi3GJL/8Kul/cYvglk335i/WnnujE8V96ajav4Z13sznckWazj7L/KQOhhm/G8viZYJgHvVFrmheJVFnfPYROpjFthM5kMo6IQ06YnJylWl7DytKUzKU2Pj0pgpM7cV1N7ct/V+Nvmp1Ist/NCq1gNOxVjCIguOIIK8I2/5YbdfkZvOu/xFjxFrMZR/5cjUEpxX+NsAXnGvjPfSrrMoFYEg/KdBX5dSMk/hFiQdfcZyuToQyApj7ezS6th/4lXmPU/DAjsI5xXZjz9H2dMyZfjSHVkpOuaXNEz+ceS7YGXPUBH7ry70j6l/8axZ18inJmZNwCz2YqvO1BYnx5AAnyGlH59vRw8HSm9hVfGBhcsPL0xTNqICieQXOWwEch4dqyVizkR/ksPLgN9jPCZcdezIlqcm7q1RJsDbZ9ifOEWar4IymneOhn33orxmofjCFSfDv+rTA7LXlDwrg/isjpsaTw593lvDQchoHjECvkANRNlkWcAHabiYLvdRND5gIZ0MfYGpGhdlfwGKwUgSVeD/GcKrCFWSnP08fO/TWuEQ74+fHzX9Z/LdIjOXQVL7mJnH/yIxMdigHZyZeDIKZpOZ7MtLktggOo5UyaugQ7NJngBr9qvCbfnHf0ptYB84fn5GXB+6id2BAZN2fclnoZAerNgYd1Lk3+WNiijIkOM3sK7yAnP22fyGCPL4Xcl6mIbBd6x80iZ6CuzTAe6/76pjrqSbGKZPqZ2rtWeeZT+ocYAiaw4NMpB8mIvOCnYc/yAAA"},{"name":"SkrBT","url":"https://skrbtso.top/search?keyword=%s","favicon":"https://a.favicon.im/skrbtso.top","faviconData":"data:image/webp;base64,UklGRv4AAABXRUJQVlA4IPIAAAAwBQCdASoQABAAAMASJYwCdAtQH9AjwP0l/wHuAfxL+U/3r8zv6xyAH6gHaQpe2DYK6AD+/sH/N/mzXqex5HZ2OdnX18CmyZdkVVdiLtkL/48Ynlx//wEDBfJIjQKux/hbSnH/6st488k8XP/q/gX/U9J/y5P/0rFSL30y667v9Pm5IPmf/4sm5fBNkV//h+/NWO8OZGFZNjGszPd+YwH/wIal//SJ+OkM9vX+qtr/+408H8T//dsbf//3jfPK79y1G3Ug6tWC3G4V+3PESSgkKgoCT25445IGhqoLftlmZZ+QfnysXwPfsKmK+ct2vcAAAA=="},{"name":"EZTV","url":"https://eztvx.to/search/%s","favicon":"https://eztvx.to/favicon.ico","faviconData":"data:image/webp;base64,UklGRlIBAABXRUJQVlA4IEYBAAAQCACdASoQABAAAMASJbACdLoAukDYAP0A6yb9nK4BwleSCeUfi7MgGqAaa//Hedbmd+SfYA/iH8k/x35q8Zf+qp0ejeI6+XRQAP7/SA59R/6NDq3TP4WPMvlBufmuPK/3cSkzv9f91FS64b/z+yH6byfPOKCUvq6toH6f4vF6sdV+rd9kujWHix8F8L5uTBzuRUxFI3K6Bn3hwaR8dFc6gVqugqaUGiQwXpUF9sj91c/zhhbqAIswkWgxj7oj+73zt8fhPmbQX4vPnQ//FHijdXsKzLX8Hr6qdUSbaSmAsovgV/b8E06Q/f55fLKM5hHGUK88LkHZ0/u1dF//0rF2X02jf/ThW5/8jCOf0/3e3bcP5f8f6o8CfeGXUH6PRnkMqTWT//m0yf3L3P6/5sEZ/13n9wyfSLNVAmvF1Xkpk3nJ5gAAAA=="},{"name":"TorrentGalaxy","url":"https://torrentgalaxy.hair/torrents.php?search=%s#results","favicon":"https://torrentgalaxy.hair/favicon.ico","faviconData":"data:image/webp;base64,UklGRvoBAABXRUJQVlA4WAoAAAAQAAAADwAADwAAQUxQSPUAAAANgGTbtmlnX73Ytm3bdo21pAVpgFqTmku2bdu2k6duREQAoIzLKoiBqmo6AG4S8n9kSH9s3TdeZB3Msvi9uzRZ2mzzLGy7/iemmQ4NdRVA0E5LbXbro3DPn0QlAJO06bnG22XDKHnY2goATP+u/eIWjN2hvl0EMODQ3AleT5zB8bxXihX7ezHR4ER5t/b+6+l7J8wv1R8vRr/njj5xg0uHsrVL4a++6/J7TAPLzWeeNbMwJ9xcWPzfbmQ51YcS4AH6qK2kvc39F1p5mxJAmz2zIvi9HFDibCn099V7Jw5oH2ezxzKFTlxsBQCoX8/P3yqIkSEFAABWUDgg3gAAABAEAJ0BKhAAEAAAwBIlsAJ0ugH4AKEA3iXygCmMeOjJmM0WCE9koYxgAP79NOCrWSxWoEX2XjcfTQD4DNsgIJuRyrBBuvkziaw+y43NdMlcmRsDAW/M3hDR+JpPxKS06/Z8RvbMKCZbT2YtHhw9G7kQMVFfk31D6Y/cGBjG2xgo4RQTSd/1cfDmu4kukmNfNhzx+luw/+TPUOkv/fgTX9Ln/6z1s41YhYXt9dSzkHs/W9U/3jJ3/eN1vv/G3Q/iTc9P/5oYPaOLoJdaK2DUD4QchG/xajwxrjhwyfIAAA=="}],"user1792793110006":[{"name":"Kimi","url":"https://www.kimi.com/?q=%s","favicon":"https://www.kimi.com/favicon.ico","faviconData":"data:image/webp;base64,UklGRsICAABXRUJQVlA4WAoAAAAQAAAALwAALwAAQUxQSLsAAAABcFtbe9NIhFrVv4bm4LAOI+SZsu1l0AbEn985fLWLiFDQtg2TfQJrMah76ICi8uR2+TrYXfKYAq2ewze2njY+5Ic4eJs6a/wnQkpGFkDwmFD42CldBBRLSr7SJlkEFktidGBHAcZoA+oYCdcUTwKNKco3LFt1YSx8cgeWw7GAY5e/n9jRMP4Pnxg8LxVaR/IIrVMx1Qy9O8LrLF7H4T4B7kNefU6H8Dm1Nb56Dh1QnF9+kdDdnaro2UcpAFZQOCDgAQAAcAsAnQEqMAAwAD4xGIpDoiGhEcSAIAMEs4AO0A/ar0iqBGygys54Am2OcGf7zy6fRv/E9wP+Q/0f/Lerd1DX6qpPrNuBJlojesQZ+MeJJ7flcFH3znIuwmjgI1MskUx34GPQAAD+//61mgeqeNYRjguTXHGd//S3D/Fy/9MXzD0GSMahcozyX93/m2/8ID8d+Xrntt7Ta8U/m+dvW7/9aHe2xWhbVKe0zY6bfzQDZlWkxZ4hYzobZc9xh/9bgf4sP/PybVNn5shqay/2/7VPhhqZmkbWGEuoEMH/uX/zGfHn+rK3v/tRuFuIya0aQHcDp/+MuCcfD6Af4p/8TGT/xGSn/1xW7GxlWgSrr/YK4zQXyN9+85JS6KII6ntMMmPUKfxwt8Qd58nqSH5PgmmbbuRo8cjGCkQ+e0oTgEMvuTVImR0TzwSrKFnO9bmUQmEQ6bzHyjwHzFibYwpnUqP8E7/2If2e4OHYdYB9W/8X19ZtKg6ljO5ttMvff1zRZ9fT53/Bn3F0y7YJ2ew+QNRbt9Ibo2lAojtmREgzfJe3/+xD/6rDhp+GwJNZTHs+ia2BdIfztqOtzWXF8StCRLfj+XmVR/xXq/GD/30ad/8iv/73c7PvMPFxryz7q7B0AAAA"},{"name":"豆包","url":"https://www.doubao.com/?q=%s","favicon":"https://a.favicon.im/doubao.com","faviconData":"data:image/webp;base64,UklGRt4JAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSGUCAAABkKRtkyJFf0RmcwKHAzg3aDiJs2Jshyynt93oJaBvMO7u2vQJcHerygy8JGb2EeEwANq2AVvImd2FFxCDZAFwU9f4o9LykcjRaunJVFczAbCMSMbtOFv4diARPPha6CDAUGIYoHb0j1zQhc75S3jnQicX/D3SAJhkYKDm/pKID5yPKt4FXmQ9XwskOcmCbi2IBE5i0gUi8/cINvY1DdrfXHReEtBfNM9a416SCAM7EnpJSB/KzgCI4kzQpEgoKTAUmSJED6ZMMeKshCfNVBBH7rUP5FRS46k8sBE7yfKsBJIiAymyvXFYTF3t02ynbrypQd/VPt2274avAKNp3/m04d1+8/VhzGsJJXWG8pH52kF3JBAFBjJ4RYiqVpzTgPOrlUSAQf5SdSQHA0bNtvciOrJWBbYYulQtGYElWxYnoiXlDKFTb4o4yQLjl2u95QTMD93yg5uOxOvBy2Fj16VqSve0hJoIZfyJdnlUEq8JL3Or2lg+FmUey39P/cWK9iGrc9ooPdL+3D4Z1/7eTHdrl67GQ93fjaMm1v7dMpjQ/d0cB7K6pROUKXunN8uWLEY0/7eGYBlVa1ri/XYNGAY5CbQ0DwMQVa7qiHMrVUQADAa1fMuda9aN+aOOb3ptDIAr0qzj25rA6r5R3bdG+OZi2r55li39S74dYKqYSTM3FDPEcXLLVHq5ZZJA6rkpbm5rfZ5GbnvTniC9WtC9+aS5ceEWwSbLrbX59SS5dSlXA3Di3Nww8jtubv4zWhuZm+NeEtxR+Bqd278VsgxYQgpkC4Cau6aelFaPRI6WS4/Gu5oYMTsAAFZQOCBSBwAAsCIAnQEqQABAAD4xFIlCoiEhGAoFgCADBLEATploPo/c/Mip/9v/nH6e5BY53aT+t6QG2d8wHm5+hL/LeoB/Sf8z1mHoAdJx+6f7ke1VjgHj5/cugl8k+vWci+0P6D8ueVHeKfyf/B/lF+XfJhAA/Lv5x/bPy5/tXOP9cfRN/TP9NxyVAT85f777gPjf+iPPv+Xf3v/of5X+5fIJ/Hf5//oP7X/g/+7/lP//9WHsK/ar2Uv1VZ8i6QRfqsk/mfd9nHLbmyB5VfCKQ68Qv75T0fxVdqNcdhDUNA2TrS9rNmzA8FVaqFg0AaSB7olbs60Cyaa4zcvv3eHIhY+LAblYQC8pVUzLXAmUAfL5XOzxSOcdIkDn4CkMeXF+581GgAD+/+6MF//j7z1oLP200Cq4lmW6V21W2CqlR/Lj2ILtdUdf+vNz5cHdATA6Pt+zcn//KsiL0ed5TtbOsRMUw1/Xgr71NkQx95BZXVKMBDLuS5COlMTDjwNg9q6f4uYo1Fg/e/hYn9sHjQRPRAxiy/bh8cxryBWq5rWBxS5Xxwlu9o/iX+EkwLRg8x+t/qY9daCQNbNbgdOa7zsLAj7xiivWXXnFj4/QVd83PvwAoM96NPUzbR2cx4jaGo589ESWXlDLYg/G/G89rlNQ9PFYBw4Iu3uvjtHur1NfxSGszpIKZPJFbKfd0fjLeoyep2844Nky+E5QfoBu2aolyMJSapf5r2iQUxYdrj6VUrJPf765VcJnpi3D3IfeaIDEJ1kG2rH20yyl1XVOWvFbPbFtfF1fgNUpF7+PpdLa/ZvA8TEp2f7sDeqcEQsyg2LS5OE4TAKcWig8Kh//XbZHb+yB/+p22mQD1m19jMKu+uZGv/b0cX+dptzp0aVcPQNQchmWKPEDdkoyXt3QZMMeqg6q61X2AFw8VTWYH0rJ+yBGEGT5KvwbxXkynxwn/cq4Z8Ws2X1Kvt5tTrS+uET5DM1TipdFKC65TEjIED86v8f8U+Tws5Kr9g5iy4+Q+zC6pRPvRYAyzYkpKvv6UC5famprEhSvJw5SBxw0/wJoWcC7W83TCr1/dT+erMFfFoipgH1JYbVB06335bby7RAmohdqRsRHZWsYbi/Hbp7cxUAiUi5jiSvgQFytYXjMqlCKU4mrYp+9b/I2MPKpdXg44dQM9YeeZT7DOkHXMyPY9bJN9Nwm9rlk51p7Id7u2oW3wT9AsqEQe74SpAYA+wKai5cONkWUSjhpM0gyzx3C+Hn4wahAsae+vXXecmlxqQ6z1MRyS5nDDoAEluPY8aRhh/nMQ7VZ+i8qBD1Bf/K6TDdvgvgvTI7iNhc6dMfTzEJKFXU11T3a0UZ8yDjhfIliT0JKbLgwyGsDAS2yrpNPjZvAe/qcWcLtU1etkP0AiKWO72ZyuX7Mb4+vXXTVfzwcRyW0nQGfP+OxnzQhSIorV4gwrMvwd0X+Tw2LXA82pGrjSpmge9Y4taa8UeZf5AolpYN+kqJfz4ev3UVBbxSBY2XzsHUXl/x5uP9VdC1j54P7qRkMj/fN2ZSL/PfYsXLAqdncB34YRucoFPAR45JVvhPrZ+5/cSyaK9r6w1o+lvklk0otkiOSyCCAx7KOj3Uxl424MhwLepNdLOAWUgb7Ke687oSv51HVvs79tJPI8wKdYutw/3/EDpX066YQUlT6M+0HhNFPMmi0mEZz//qJjF/VfC5nUd2cc4ewoQ7DByHxcaz548xZr96XZMs9J8RwcXm822XU+f0/3lTAa54oc261ORFidF9HOLOZVbCqe6f/nMfPfyDbhwMUYGue12+kpDXy0c0kX3J1dHJbmg4dG7U2LULwR5OuojGDTNHE90C3oBOfI8t/FD8k/Ss8pmY0nHWtdMyPAFIrDWZRhP0yiHGzmdnwhJk7fs9bH5nAp6tCa9PcS2LILbBIRL6bZXzH1E8OV5KcO+vPN3byUlrJvXqF+ar0siIGINTsp0A64vxwWLGH/vMk9FhoFgTh13zBlyZPRC23+SENDX2PXoPM/aLqgd2lf+qiHdUzlx+gg0JFpusaLOSuk4H+mN4HGhN9wPLo2P+DNqlbZwJLaxrRxJJufd3pUHc56j8AfBHIojsB2roowKx5m57eq4ok7uJAdvkQGFcn6Mt0QdsWX1tCt3+hYKYES9lQupRVGLSVrDoUZvKt1L+t2yssubQGeow0w2pS1ukxUUYSecXZVKKzkd2pEn8yKR4bqYBAH0SisZRascOQ9KGQZn9+uB40xCkBZrHutvwJobP07Pjv+NBoSPb7Ozwl6t8WY9pS+YFkXKcHlQzg/j8d9WQzMhRRAbR0ihdNEa6lsCmY5MIiyf5VSej+NNYufLszTxeI7/GB5WFwsuqj057HYR6lkSaqCxWXRkj0yNGJxMEncld7m4l6jCFU/OIBoVTg8s+MKSHbynVCs81RmJ/+DCrT597WOpfwFsHUVBwgwiE3Hp8UaR/EDRe8db8GWCff/5zXR+uF8x8krRwgNvgHwAA="},{"name":"智谱GLM","url":"https://chatglm.cn/?q=%s ","favicon":"https://chatglm.cn/favicon.ico","faviconData":"data:image/webp;base64,UklGRgoHAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSIMAAAABcBXbbtw8KIIiCGYQMYoZGYIgCMKDkH3r++9ExATg2ufk8qMcs+Nx1PLjFfcsF8GyGxMXSbaLtshOJ0Yd2qEW4QQQi3QApVXwRdy7Wh9qSTUuf79Sjak2ulp3NUdpFRBaASCVCgCMOrQDQqfhvFGDgWsrhTTcjvq1Cjz2PvgrzO64BgBWUDggYAYAADAgAJ0BKkAAQAA+MRSHQqIhDAWDPhABglsALsyhIU3xHmY07+ZfdT90sqk5D/yP3X++D1AeYB+jP99/MrtbeYT9ZP9v/pve39BX+u9QD/Af4zrGvQA8rn9nvgy/YT9t/gL/Yn/y5pL2X/2v8cvEH89/XPx9zhf2k/G8L+8E/jf98/Iv8wOOC5D/Qv8Pxn6TKdK/nf+R/d/yV9pX5L/jP95/ivgK/jX9R/1X2+fMd7Lv2O9lX9Wm+2svlgtcPBzwMB7ZJuYmkywQgkPj05M+pzB6AP3xxiUJcUccyHjoOraQoCbDloOfX4l28ki9uiWR4XZAN0OwVAxmvkQxP8201BXA/3yaflqRdYQAAP7/7OAVdAaB/mM3gcN7sNu/+OrXVqJzty3tgm8vsGRC/r35PSpghuNhePnf95deyPktMV/8NX2Wq9MTYtQ7q4uKze8o2+jzuP6h/udyPUDZrYWxVyY11zWinCkJDeCwmu0k5qvcknHnOLuFA240DMYuLRpHXfFGaoi7ZXpo+sXMXbJ+/HBF9gCtA4rdUrGq4IE7KsoTXNpf/yoQyFF77uWFVto26FMbDeCa77zrHVlQhcCQwTic1mOg2ZTfDq0hMSwQRbRQd/Qyn3fJfypDHoPs56MCdtGVIXUjdckZO3o1Gi/G9Qizf2bIjSNPbTrTOZ/09A1+T4Wq4DtOUnTf/I17Uw8LG45KBD/Jo/N45HEvO4tLlBdSjurzTr53wC8W1ncCMRUD1QlG8nXlGOXGs1uzInO0E/CF+13oXqBcZaAuoI/SvbtiYGoYsXX1/qovRo4gUoNOw0N+alvI6O4VxfweeLOmNWNyvDYPH8N+XKgyRvw+6d6JlNcdFduDEvoE7oaUOP/WmYh//kadV+QtYannlhxDDelgiUQwA0+pbKh4R6QoMrAZqwip3/yp/pwEpm4uc/eO8FH7zaLXHzZ5+lwLKeYZopwVVYb5xBm+7KWZvTJA4K9juB+CJgCob5QXk86eZpPa13glFEILS0g6A6ojw7EHXbtHC/DXcLCrO5NpSG0nsBqTDbb6zBB5nxLnVytGVrCBPB1/bFesK+mCyWIunoeGmLtc/H5/xrpnLD2Fa77LlIVw9zc5bqqmZdQyE2hcev/z/kGPoAtoBDev+wQ6VFvaWqqOc2ZeePTsiRUA153u4PKahtU3FOkApBUAglq2wgp29z+4caCX/66WcGO4Nzweory//lyM3gzN+h0lZOAOMYi1GC13Xw4UHI0eAk9BPwMjo447LSS6H7J8YP85I+NS5KvrQLx0abIY+qSLdNjJYdahNfOpTADH8AocdAy4j757+OREqurudsxp0gMFdSnsOYerZ0JLmvsA4odUvtKz/nnZyP5M0tVweQ3sVWJ/WpPcRhzaukXehH0rB4aEnmN95PB2UkDSvfyCX0KWpxK97KZhzeiTCIapQDzMWeD4+GvF2lWisIJqcgz7WrA90HXQMu8oQB88FCvuNscJj67zKPcz/8qnf8JmKRFEy2IlqgZAIN15ecyf51obFd25/zq6klG0OpJf6gdJI/Hg62uj6uy2UH/BHXIBLH5B/lLQdmuLsrfqRXkAefYc7OnvZpj5nOMpEYWPHQ6BW0YawEXVVQHVzRg6uqvnJX7wwkyRDUgIZu18JX4k5jiSZgFdcO1tCiQK9Mgn80qo6Pghp/aDkBHL18O7+kANKHth3euyaApuRtAZpbbtW3KORGv1BLWNvsLmhc8HEXZ1hdnlAnU1W+eaMvR+cxJ+KICD7zufct5MJDX09J3OvpwkMuf8O4JdW4OL3NaG3esBaNswIFDAit/vg6gb0cA/rq/ioQkwKN2APdL/n9NJgu8dwXEDHHqKKQ8+Uw5w1Q6hHy3iihapAD0XY+r3OxlJgxe/ro/oP3ils/CHdX0Yg8HOYhNlBT/zzjx6Xla2v2F3ylC7QopUYiK0+P6C2VBTbs9aRqf4Sg3G9hv6++XoL+om8D3a/TfyRvRVooQF3gOwk41Np1P8zb2g6BO/5UC5PLXjpZXr64ANCUi0uV6fKh7gmlPFrhkA8WR+wVWqjcvWf/ereAnKHSnjx1JS0DWY/UCCyy8T2Mvz8LX3gaKPIaoBSUZ+SJV2srHWLtsna56jYhRLkeY+aLZr4C1Q3ELAwJ//6VkjB80mXP4tMpK3f/o+xwKdvjgAAA=="},{"name":"阿里千问","url":"https://www.qianwen.com/?q=%s","favicon":"https://a.favicon.im/qianwen.com","faviconData":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAGDklEQVR4nO2czXXbRhDH/wNYIRJfkA7gs00G6oDqQKlAVAWSK7BUQaQKJFVgd2CmAuOZ8lnsQLjYQl4Mjg+hYopcgLOLWQB6j7/3dCGXi9FgsfO5AHbs2PGMoa4FiFOOC+AQCySm74MA2beMPrQslphOFRiN+IgZFwTEW4bOEeKgyGjehlw2dKbAKOUEJe4sfjKPQuznGeXehHIg6OzKJT5a/iJ5KPHOiywN6ESB0ZAngHnPq4OA05evOVUXqAGtKzBOOQbcV1IZ4C9FcRrTugKLBU7gsPpWGEdveKwjTXNaNSIOhsMIM7J/bmlfQ6amtLsClYwAEdIo5URjrqa0tgKjlMcOlrcawlxtKkbGId66+JntKXDId2i29/mHMCk+043NT1p5hF3dlrYhxsXSSxDjXYHLvap3DrAJBuKitHOTvCuQmrstbTOxcZO87oFabksHTIsZHUgG+l2BPYxdhYyX+/ZWvClwufeJhOgpR5JBPldg4nHuNkgkg7wpMAR6lbezhUkm/wvphFWhUwTkpiTn14yyaMRz8PNcicECf4vGbRswGPHJYMj3KHFn+itK3EdDvjPl6QLGWxfhO4cw5xe4kA2tIRrxOzDOxBdmHBS3NH0yx5A/AhiL5+gHx8WMriUDKxXo6MPNixm9ejLPGx6DFJMIviHMi89P/4c6Kh9htgxpliS/jvh09YPilqbEuHSYqxsWOLYZblyBSyfyyuX6BOSDEK9WDUucclws8KnvBoUYlw+3dLp95E+qVqBzBMFAvF49yzPKEeAAwNR1Xp8wIQfj3FZ5gGEFNll9q4QL7H/9QtnG/Ckn+N6flVgy8pd7mLvWm00K1LKa4oD8ObP5CJPa6uhV9cwXmwpkvVoDCFe2Gd7nhimUu4Ge45sUC5wCFs64B+o6wBjIKUBWZE8DAClVboxa9GBya9pkMOITMM62dYAR8GEQ4thWTrMbwzi3maQOlzqDFtGQJyRrnwMDh0WJ97bXMCpwGc9alfe2YFVn0MCxmCXORD9SGcpFIU5ZM6dHLaf3FziCW1L3nY3hq1RgnlFOpBrDWt9dV6KUE6ss0lMeDZ+I2nxgFOBCs4UClnfXmYbFLGKcSHtvahWYZ5TbZie2YHV3Xfgt5UM0LGYxEJPQ8InqwtpuDYfY99UwrtqDY0gQryMqKpULvdS8zd21Rb0HR2D4RAr89wtlmklRBg613RpPPTjj9QTxOuKy5uAFznrt1vxnOBLVOQGA6w2fWIF5RnlAehEKBHdXis8uCAbiOsNn3VwUjfhOKzWvFScPhvyegEMNmSoJ8cpk+Ow7ExTdmm13V0I05Il35QFAac7SO7W3qdd6K+6uUJb2WocNbo31CoxTjom3ZzesqLi724hG7MdwVEC0+bRYK/ChxBUTtI9bWaf/l/HuRFmOWhj4Y/0zKwV63W/IchX6cltqMHVs2a5Anympja6GKrpq3gwMOVKxAlvZb7Y4rf+jeWBHCmHOATZOzosUGKWcMPvNogDmroYNWbo6c8I4N3kK0mzMFVp8ZKIQv1c5152ceKrp2BKtQNK3urUUpdlQte22PBKW+LPqO5ECWVDV0oRo83oN0/TusjAuTT0+j8iMiGa3guRyC2wKrH3mRFCqkLS7yfbANrtMDfvNXsppWOKT4lWuixkdL/+vZP3LAMh/CTGVJDnEsXBbvc6mtjhVw0GYI9B7B43ckQ5xrJpQNXNtUN4EioaDSlxq1mOssjHRiM/AHqORtazMstH9IxRXn00DuQS7WFi/TvwTg6OqflRWsefnEet84N5rTsMQ75Ubxm+KGU1WP/BwVPa6mJFmjRuAa0I15YS+45RpM71jAwN5CNx8m22+nU09+mmQtK2j89ffmXiZcloqui0uxxekiA8btklZKoaOhDmHsnNvLnT39ra2qMiiaNHLRzhOOS5K3DeeyIPbsk4vV2CeUa7RSlKXRdGilwoEVFpJNqIaH/RWgY07ZEN9p9lEL/fAVZxaSRjnxS2deRFojf4r0DaV1oLhWKW3j/AjxS1NiYQNnstUlWeR1i75TFjGxsYEKABggem2dtwdO3bsWOMHqspioR45xrAAAAAASUVORK5CYII="},{"name":"Minimax","url":"https://agent.minimax.cn/?q=%s","favicon":"https://agent.minimax.cn/assets/logo/favicon-192_v2.png?v=5","faviconData":"data:image/webp;base64,UklGRlwEAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSAUBAAABgBzbdtvmITg2Ia00LIBqh2VwxQac20od5CryJ/B2CB9ytmcigpHbNo6kbN9js7+Ar4bG+kqtqcM6KOhsxR0O2O2HcapwHPpdwJnSs0B3cs1qr487wBYu+wePJGepcib5eLBfNBbLc1JCZKUxCHm+KBiLxQ0lUsUovMmPsXtXFKopvNrLPUAOB3yjom88gMucW72EqEkML6v0KY8zClUVnsGnrmPvgUGXwIc9mNT1dYxUNsYeLnU8cNZm5gCfYqRoIxzTTC2Y/n+wCf/NzflvO/QtcsMarn1uaZ6b2ue25rmxfW7dgNycH83cvoRt3huKe8uxRm856QDbvDe17m3Ne+MXQwAAVlA4IDADAAAQEwCdASpAAEAAPjEUiEMiISEXCSaoIAMEtgBl5+J3fW8HfbJJ+bb9V51fVL4qX2zdrbzTfs9+qvsk+sb0AP7N/VesA9AD9gPS4/cP4PP3M9JfVq/AHTwQQHKE6AWYA5E8glpdMMgtZtYlzwwSMYkurI9Xl4f8LOxhtWuj5yyXJ0bOTHPqyL7stU1ksx1/IHVq2LXOVMuu1Dul4uZQoCClwAD+/NQv//k7v//ycY///lC6E75eH7beo/4aT82/Bfl6POj92Eh+UNOS80SypP04Uo3F+ZrOxS6/8Ky6qy7DuSJqwd90tHeyb4R7d9pUJO/xrlmfn85TcNcnc6bjnXDsnO0fhtpxZbiDidsx3Pj1CO7wTY47COWyP/+mNkF/N//5GjT/Cd15h9KzMCfpr1uXGCNSCtBR3jq+qg6Vf/aM0FrSHtFue/bx8Oof/hJFlD51/8bnQ4vdvaVpxBv4gd391O76FM6Sv+voOzTaHisi6wQqR25cZhiSdZZYKebJSv01vxuDfs581ShepihQHerSdfiVFoZ4WOlV/EqB6A1ynwtS64zvXqMpaBE2LoANGCrAWfbx9C+TXCK6weQYD/zWflJW6Gko+TFsmBf3V7VtNCXklauH984Um07cFD0ggQt6kjfQ/+8avK3cfF8HofpoT27dhzgth4Hrn8+Rr9+WmCtLSX8V11+ezbJWbZ9kO96zTrsX5iCd+1uvfuAxuhK9fKjaOfO/kj0ILRrmlPw+8XAT8K70JRz1EonalPphSM9K3aDc99rNyWyXViNYLrWn6W4ljas4shyWPC3TU6Dw2HtG/pSK5jYOgQFcMMKvn8+NHmpvsDphmup928PRnNBC6w9+oAy2gJb+deU5r1XRo5kSALd3IRoR4n9I8GtvrpJR1Ai6SBrS+se3tyvP7egZaGbPTj/Dc+c72yl9N6YeXy6CR4964H+uSn4nsnyLGsqQRZnlLPxaPqX3KKKXTwKJOChGo//9PVilSpwgX7OTQ1UyImqnTHEuVJzXVlO1GsWK++GMIW7H3kwDkj28lLB2lEG2e4zBqaWOftWV+HyGYf5jhelNP//w9Ww2ESUAAAA="},{"name":"知乎直答","url":"https://zhida.zhihu.com/?q=%s","favicon":"https://pic1.zhimg.com/v2-7e3856b1a6d415224ca95814132a3612.png","faviconData":"data:image/webp;base64,UklGRt4EAABXRUJQVlA4WAoAAAAQAAAAPwAAPwAAQUxQSAEBAAABgB1JkmKnY8eDF29lEYMHD6xAGSCZwf6gAQ8E/4x70y2Gm39FREwAPhqQ29uHV1QdqYfT3W4DMHxtaPYnqvl0M8O+SFgdS16xPqwoTdZhnxg2XMVVcy8qfSQACX3RFdCpERIMS3QqJF3zsJRncgV1jXPClorCFvXQuKTHcU5z111xSbUOVAVSpd1TMRJ1dB/tStEZ7h+YDHclRqLuj6Kd7qqKVOmgJTKQezdP6XGcFw30VOIUbSHlsTyKazaXDPNyxqBzCYaEDdEjODWAAUgYFBWvmxf5BgwfDesTiRXrw8ql8SoSPjfkzZlqPhk0YfjagEZ39/RBrAWvDrfbGTB8BABWUDggtgMAAHATAJ0BKkAAQAA+LRCHQqGhDX3TmAwBYloAM2xwDoQ+H+5eTn8tf4f7K94l/x26A/XLqAegB+sfWAegB+2/pWfsh8FP7Vfs97O1y35OP2A/arMTvgJlv/LHmA9kDbCS7P935UPm3/o+4P+sq0lOYU98JyHzdMa56EB48a7meFH77F3315y4Fb71NAiLOFACg6VQJjlvFkRd/oV5CDGSZb8bn1sAAP7/PVjR9iaf8vV8Mxpmwiuk5/PZ/r8F/twT4dRe/fHd5/z/oUagouUTs4aAtXcybySUBKAEYUTLqyrJsAX1oj9kTr6RlPd+7G/+2WvIB3ygUZKj97vfkABGhp7XzYjmfbY56OaO2G7zV8+H/gkDhUiXCGyQbX/BrOWM5A/G7g8mpNQgvXb59l6FHOXOqfb4kBbzeiq63SqgivzP/5K2H1YQE6nyRD4l7ypgL+i/B5DYJz//q9OMCDl4z//Z45kChZ4gr+eRZ8n+WFy+PUktlwVu9X4wd7McTSu+75fW7ctETYxRfymczLYSStjAxDjE17hIYrZTEKuEmlYLj7CQ7jdZmH1vL6P3s5R//wvNfPByqEx5jG9heIo+1Yat/R5nTFXv8dpFT/IpZRWbvetG1uK4QEKdpKy4TzihGo/EjCjFSMOg7PutFWo8W1Itwu+i45WPkYWf4XPd7h/b67xpMVWQMVj3cuOwN4Bo2Fs/kpmqwGTihT+qTHpCN+4t06MXvuwQtS0acnHnXpzl9cycA4IeY2TbE+o8Fzaf5saK/dHWXUM+XUcN/wNKZMlFHtridInjeCyvU/+dA9KfvheB0dPYX/XQRP+CSHSMgrZDk4ipS+Ctv4ni7o9bmjYZ4RIZ2qX2RR4jHhI63fdGPngPEFh/5Hq1t4xBAW8M22DUw8LhP5+J/3c0aO8XrtU9R1ydUuPwDQXx4jUv/UvkfDEvVZJMZ4zYpWGBiqroYqAxRh4kisGgu8py//PHdSVWJKoMSHuxDkFp0EuX37sOIjNaoqolBmXasKRX10Oblfg16NYv1HmWt47Cm+0d+uUCVHrnCaBgfWbJ+2gxTSyNIPyzEZwVUVvO5/0r/XqygHG0WQQ4LRyVvhlwbip0CoFPJ/JLo9Oq22FxJH86ZvFfH77HmfrZQ4HRCQfvABxiCMI9M7goPv//vkmM6k6yxbRjZvzsORIn8ga2WBdOw1Hp78cDYiix9LNqzA8qWl2pPYoxECJv//avhMQk8g4oYR+NSOC5NAwdgL+c4/6DGXgJD4s6AAAA"}]}`)},Kc={"zh-CN":{"common.cancel":`取消`,"common.confirm":`确定`,"common.apply":`应用`,"common.delete":`删除`,"common.name":`名称`,"common.required":`必填`,"common.optional":`选填`,"common.show":`显示`,"common.hide":`隐藏`,"common.undo":`撤销`,"menu.settings":`设置菜单`,"menu.settingsDev":`设置菜单（开发版）`,"settings.title":`搜索跳转设置`,"settings.close":`关闭`,"settings.editCategory":`编辑分类：{name}`,"settings.editEngine":`编辑：{name}`,"settings.deleteCategory":`删除分类`,"settings.deleteEngine":`删除引擎`,"settings.copyHere":`复制一份到此栏目`,"settings.addCategory":`添加列表`,"settings.hideSameLink":`防止原地跳转`,"settings.hideSameLinkTip":`比如处于谷歌搜索页时，引擎列表中不再显示谷歌搜索`,"settings.selectSearch":`划词搜索`,"settings.selectSearchInInput":`输入框内划词`,"settings.selectSearchInInputTip":`在输入框内选中文字时也弹出划词条`,"settings.center":`强制居中`,"settings.centerTip":`搜索条始终居中显示`,"settings.fixedTop":`固顶显示`,"settings.fixedTopTip":`页面下滑时搜索条固定在顶部显示`,"settings.fixedTopUpward":`下滑不显示`,"settings.fixedTopUpwardTip":`仅在向上滚动页面时显示`,"settings.editConfig":`配置文件`,"settings.feedbackGreasyFork":`在 GreasyFork 进行反馈`,"settings.feedbackGitHub":`在 Github 进行反馈`,"settings.saving":`关闭中…`,"settings.language":`语言`,"settings.languageAuto":`跟随浏览器`,"toast.autoSaveFailed":`自动保存失败：存储不可用，请用“配置文件”复制备份`,"toast.autoSaved":`已保存`,"toast.autoSavedLocal":`已自动保存（当前仅本网站生效）`,"toast.remoteConflict":`其他页面已更新设置，当前有未保存修改`,"toast.syncAction":`同步`,"toast.synced":`已同步其他页面保存的设置`,"toast.saveFailed":`保存失败：存储不可用，请用“配置文件”复制备份`,"toast.savedLocal":`已保存（当前仅本网站生效：脚本管理器未提供跨站点存储）`,"toast.embeddedIcons":`已加载 {count} 个图标`,"toast.iconsFailed":`{count} 个获取失败`,"toast.autoSavedSuffix":`，已自动保存`,"toast.listSeparator":`，`,"toast.dialogOpen":`请先关闭当前对话框`,"toast.categoryMissing":`无法撤销：分类已不存在`,"toast.undoDelete":`已撤销删除{label}`,"toast.deleted":`已删除{label}`,"toast.copied":`已复制「{name}」`,"toast.mergeImported":`已合并导入：{summary}`,"toast.mergedEngines":`新增 {count} 个引擎`,"toast.mergedCategories":`新增 {count} 个分类`,"toast.mergedSkipped":`跳过 {count} 个重复项`,"toast.mergeNothing":`导入内容中没有可合并的新引擎`,"toast.syncedFromOtherPages":`SearchEngineJump: 已从其他页面同步配置`,"category.title":`编辑分类`,"category.delete":`删除分类`,"category.emptyName":`空`,"category.newName":`新分类`,"category.label":`分类「{name}」`,"engine.label":`「{name}」`,"engine.addTitle":`添加搜索引擎`,"engine.editTitle":`编辑搜索引擎`,"engine.url":`链接`,"engine.name":`标题`,"engine.iconSrc":`图标来源`,"engine.iconData":`图标数据`,"engine.iconDataPlaceholder":`选填，可粘贴 data:image/... 链接`,"engine.fetchIcon":`获取图标`,"engine.refetch":`重新获取`,"engine.cancelFetch":`取消`,"engine.fetching":`获取图标中…`,"engine.stepPending":`等待`,"engine.stepLoading":`获取中…`,"engine.stepOk":`已选择`,"engine.stepUse":`选择此图标`,"engine.stepFailed":`不可用`,"engine.stepCanceled":`已取消`,"engine.tryExtractor":`↗试试在线提取工具`,"engine.upload":`本地上传`,"engine.uploadReplace":`本地上传（替换当前图标）`,"engine.target":`打开方式`,"engine.targetBlank":`新标签页打开`,"engine.targetSelf":`当前页打开`,"engine.selectImage":`请选择图片文件`,"engine.readImageFailed":`读取图片失败`,"engine.required":`标题和链接必填`,"config.warningLine1":`此处有更多的设置选项，自由度更高，`,"config.warningLine2":`但设置错误会导致脚本无法运行`,"config.parseFailed":`JSON 解析失败`,"config.mergeUnrecognized":`无法识别的配置文件：没有找到引擎数据`,"config.exported":`配置已导出`,"config.reset":`恢复默认`,"config.import":`导入`,"config.overwriteImport":`覆盖导入`,"config.mergeImport":`合并导入`,"config.mergeTip":`把导入文件或文本框中配置的引擎追加到现有列表，保留当前设置`,"config.export":`导出`,"jump.searchAll":`一键搜索全部：{name}`,"bar.scrollLeft":`向左滚动`,"bar.scrollRight":`向右滚动`,"favicon.noRequestApi":`缺少 GM 请求接口`,"favicon.networkError":`网络错误`,"favicon.timeout":`请求超时`,"favicon.aborted":`请求已取消`,"favicon.requestError":`请求异常：{message}`,"favicon.requestFailed":`请求失败`,"favicon.emptyResponse":`响应为空`,"favicon.compressFailed":`图标过大，压缩失败`,"favicon.notImage":`不是图片（{type}）`,"favicon.unknownType":`未知类型`,"favicon.convertFailed":`转换失败`,"favicon.backgroundFailed":`未知原因`},en:{"common.cancel":`Cancel`,"common.confirm":`Confirm`,"common.apply":`Apply`,"common.delete":`Delete`,"common.name":`Name`,"common.required":`Required`,"common.optional":`Optional`,"common.show":`Show`,"common.hide":`Hide`,"common.undo":`Undo`,"menu.settings":`Settings`,"menu.settingsDev":`Settings (dev)`,"settings.title":`Search Jump Settings`,"settings.close":`Close`,"settings.editCategory":`Edit category: {name}`,"settings.editEngine":`Edit: {name}`,"settings.deleteCategory":`Delete category`,"settings.deleteEngine":`Delete engine`,"settings.copyHere":`Copy here`,"settings.addCategory":`Add category`,"settings.hideSameLink":`Prevent same-site jumps`,"settings.hideSameLinkTip":`For example, Google is hidden from the engine list on a Google results page`,"settings.selectSearch":`Selection search`,"settings.selectSearchInInput":`Selection in inputs`,"settings.selectSearchInInputTip":`Show the selection bar when text is selected inside an input`,"settings.center":`Force center`,"settings.centerTip":`Always center the jump bar`,"settings.fixedTop":`Pin to top`,"settings.fixedTopTip":`Keep the jump bar at the top while scrolling`,"settings.fixedTopUpward":`Hide on scroll down`,"settings.fixedTopUpwardTip":`Show only while scrolling up`,"settings.editConfig":`Config file`,"settings.feedbackGreasyFork":`Feedback on GreasyFork`,"settings.feedbackGitHub":`Feedback on GitHub`,"settings.saving":`Closing…`,"settings.language":`Language`,"settings.languageAuto":`Auto (browser)`,"toast.autoSaveFailed":`Auto-save failed: storage unavailable. Use “Config file” to copy a backup.`,"toast.autoSaved":`Saved`,"toast.autoSavedLocal":`Saved automatically (this site only)`,"toast.remoteConflict":`Settings were updated in another page and you have unsaved changes`,"toast.syncAction":`Sync`,"toast.synced":`Synced settings saved in another page`,"toast.saveFailed":`Save failed: storage unavailable. Use “Config file” to copy a backup.`,"toast.savedLocal":`Saved (this site only: your userscript manager does not provide cross-site storage)`,"toast.embeddedIcons":`Embedded {count} icons`,"toast.iconsFailed":`{count} failed`,"toast.autoSavedSuffix":`, saved automatically`,"toast.listSeparator":`, `,"toast.dialogOpen":`Close the current dialog first`,"toast.categoryMissing":`Cannot undo: the category no longer exists`,"toast.undoDelete":`Undid deletion of {label}`,"toast.deleted":`Deleted {label}`,"toast.copied":`Copied “{name}”`,"toast.mergeImported":`Merged: {summary}`,"toast.mergedEngines":`{count} engines added`,"toast.mergedCategories":`{count} categories added`,"toast.mergedSkipped":`{count} duplicates skipped`,"toast.mergeNothing":`No new engines found in the imported config`,"toast.syncedFromOtherPages":`SearchEngineJump: Settings synced from another page`,"category.title":`Edit category`,"category.delete":`Delete category`,"category.emptyName":`Untitled`,"category.newName":`New category`,"category.label":`category “{name}”`,"engine.label":`“{name}”`,"engine.addTitle":`Add search engine`,"engine.editTitle":`Edit search engine`,"engine.url":`URL`,"engine.name":`Title`,"engine.iconSrc":`Icon source`,"engine.iconData":`Icon data`,"engine.iconDataPlaceholder":`Optional; paste a data:image/... URL`,"engine.fetchIcon":`Fetch icon`,"engine.refetch":`Fetch again`,"engine.cancelFetch":`Cancel`,"engine.fetching":`Fetching icon…`,"engine.stepPending":`Waiting`,"engine.stepLoading":`Fetching…`,"engine.stepOk":`Fetched`,"engine.stepUse":`Use this`,"engine.stepFailed":`Unavailable`,"engine.stepCanceled":`Canceled`,"engine.tryExtractor":`↗ Try an online extractor`,"engine.upload":`Upload`,"engine.uploadReplace":`Upload (replace current icon)`,"engine.target":`Open in`,"engine.targetBlank":`New tab`,"engine.targetSelf":`Current tab`,"engine.selectImage":`Please select an image file`,"engine.readImageFailed":`Failed to read the image`,"engine.required":`Title and URL are required`,"config.warningLine1":`More advanced options are available here,`,"config.warningLine2":`but invalid settings can break the script.`,"config.parseFailed":`Failed to parse JSON`,"config.mergeUnrecognized":`Unrecognized config file: no engine data found`,"config.exported":`Configuration exported`,"config.reset":`Restore defaults`,"config.import":`Import`,"config.overwriteImport":`Overwrite import`,"config.mergeImport":`Merge import`,"config.mergeTip":`Append engines from the imported file or the text above to the current list, keeping current settings`,"config.export":`Export`,"jump.searchAll":`Search all: {name}`,"bar.scrollLeft":`Scroll left`,"bar.scrollRight":`Scroll right`,"favicon.noRequestApi":`GM request API unavailable`,"favicon.networkError":`Network error`,"favicon.timeout":`Request timed out`,"favicon.aborted":`Request canceled`,"favicon.requestError":`Request error: {message}`,"favicon.requestFailed":`Request failed`,"favicon.emptyResponse":`Empty response`,"favicon.compressFailed":`Icon too large and compression failed`,"favicon.notImage":`Not an image ({type})`,"favicon.unknownType":`unknown type`,"favicon.convertFailed":`Conversion failed`,"favicon.backgroundFailed":`unknown reason`}},qc={web:{"zh-CN":`搜索`,en:`Search`},user1792793062676:{"zh-CN":`AI`,en:`AI`},video:{"zh-CN":`影视`,en:`Video`},books:{"zh-CN":`书籍`,en:`Books`},tools:{"zh-CN":`工具`,en:`Tools`},download:{"zh-CN":`资源`,en:`Resources`},user1792802683546:{"zh-CN":`资源+`,en:`Resources+`},user1792793110006:{"zh-CN":`国产AI`,en:`Chinese AI`}},Jc={B站:`Bilibili`,豆瓣电影:`Douban Movies`,豆瓣读书:`Douban Books`,孔夫子旧书:`Kongfuzi Used Books`,金山词霸:`Kingsoft PowerWord`,知乎:`Zhihu`,类义词典:`Thesaurus`,人人影视:`RRTV`,动漫花园:`DMHY`,海盗湾:`The Pirate Bay`,豆包:`Doubao`,智谱GLM:`Zhipu GLM`,阿里千问:`Qwen`,知乎直答:`Zhihu Zhida`},Yc=[`auto`,`zh-CN`,`en`],Xc=`zh-CN`,Zc=H(`auto`);function Qc(){return typeof navigator>`u`?Xc:String(navigator.languages?.[0]||navigator.language||``).toLowerCase().startsWith(`zh`)?`zh-CN`:`en`}var $c=Fa(()=>Zc.value===`auto`?Qc():Zc.value);function el(e){return Yc.includes(e)?e:`auto`}function tl(e){Zc.value=el(e)}function $(e,t){let n=(Kc[$c.value]||Kc[`zh-CN`])[e];return n??=Kc[Xc][e],n==null?e:t?n.replace(/\{(\w+)\}/g,(e,n)=>t[n]==null?e:String(t[n])):n}function nl(e,t){let n=qc[t];return!n||e!==n[`zh-CN`]&&e!==n.en?e:n[$c.value]||e}function rl(e){return $c.value===`en`&&Jc[e]||e}function il(e){return!!e&&typeof e==`object`&&!Array.isArray(e)}function al(e){if(!il(e))return null;let t={};for(let n of[`name`,`url`,`favicon`,`faviconData`])typeof e[n]==`string`&&(t[n]=e[n]);return t.url?(e.target===`_self`&&(t.target=`_self`),e.disable===!0&&(t.disable=!0),t):null}function ol(e){let t=Array.isArray(e.engineCategories)?e.engineCategories:Array.isArray(e.engineDetails)?e.engineDetails:null;if(!t)return null;let n=new Set,r=[];for(let e of t){if(!Array.isArray(e))continue;let[t,i,a]=e;typeof i==`string`&&i&&!n.has(i)&&(n.add(i),r.push([typeof t==`string`?t:i,i,typeof a!=`boolean`||a]))}return r}var sl=[`fixedTop`,`fixedTopUpward`,`HideTheSameLink`,`center`,`selectSearch`,`selectSearchInInput`,`language`];function cl(){return{HideTheSameLink:!0,fixedTop:!1,fixedTopUpward:!1,selectSearch:!0,selectSearchInInput:!1,center:!1,language:`auto`,engineCategories:Gc.engineCategories.map(e=>e.slice()),engineList:Object.fromEntries(Object.entries(Gc.engineList).map(([e,t])=>[e,t.map(e=>({...e}))]))}}function ll(e,t){let n=il(e)?e:{},r={};r.version=typeof n.version==`string`?n.version:``;for(let e of sl)e!==`language`&&(r[e]=typeof n[e]==`boolean`?n[e]:t[e]);r.language=el(n.language??t.language);let i=ol(n)||t.engineCategories.map(e=>e.slice()),a=il(n.engineList)?n.engineList:null,o={};for(let[,e]of i)o[e]=(a?Array.isArray(a[e])?a[e]:[]:t.engineList[e]||[]).map(al).filter(Boolean);return r.engineCategories=i,r.engineList=o,r}function ul(e){if(!il(e))return null;let t={name:e.name,url:e.url};return typeof e.favicon==`string`&&(t.favicon=e.favicon),typeof e.faviconData==`string`&&(t.faviconData=e.faviconData),e.target===`_self`&&(t.target=`_self`),e.disable===!0&&(t.disable=!0),t}function dl({options:e,categories:t,version:n=``}){let r=t.map(e=>[e.name,e.key,e.enabled]),i={};for(let e of t)i[e.key]=(e.engines||[]).map(ul).filter(Boolean);let a={};for(let t of sl)a[t]=e[t];return a.version=typeof n==`string`?n:``,a.engineCategories=r,a.engineList=i,a}function fl(e){let t=JSON.parse(JSON.stringify(e));return t.engineList&&delete t.engineList.engineCategories,JSON.stringify(t,null,4)}function pl(e){if(!il(e))return null;let t=il(e.engineList)?e.engineList:{},n=ol(e)||[];if(!n.length){let e=Object.keys(t).filter(e=>Array.isArray(t[e]));if(!e.length)return null;n=e.map(e=>[e,e,!0])}let r={};for(let[,e]of n)r[e]=(Array.isArray(t[e])?t[e]:[]).map(al).filter(Boolean);return{engineCategories:n,engineList:r}}var ml=`searchEngineJumpData`;function hl(){let e=new Date,t=e=>String(e).padStart(2,`0`);return`${e.getFullYear()}-${t(e.getMonth()+1)}-${t(e.getDate())} ${t(e.getHours())}:${t(e.getMinutes())}:${t(e.getSeconds())}`}var gl=class{constructor(){this.storedSettingData=Vc(ml,null),this.scriptSettingData=cl(),this.settingData=null,this.activeRule=null,this.barMounted=!1,this.initSettings(),tl(this.settingData.language)}initSettings(){this.storedSettingData?(this.settingData=ll(this.storedSettingData,this.scriptSettingData),Lc(this.settingData,this.storedSettingData)||(this.settingData.version=hl(),Hc(ml,this.settingData))):this.settingData=ll(this.scriptSettingData,this.scriptSettingData)}applyNormalized(e){let t=yc(e);for(let e of Object.keys(this.settingData))Object.prototype.hasOwnProperty.call(t,e)||delete this.settingData[e];Object.assign(this.settingData,t),tl(this.settingData.language)}applySettings(e){return this.applyNormalized(ll(e,this.scriptSettingData)),this.settingData.version=hl(),this.storedSettingData=this.settingData,Hc(ml,this.settingData)}savePartial(e){if(!il(e))return`memory`;let t=Object.assign({},this.settingData,e);return this.applySettings(t)}reload(){let e=Vc(ml,null);if(!il(e))return!1;let t=ll(e,this.scriptSettingData);return this.settingData&&Lc(t,this.settingData)?!1:(this.applyNormalized(t),this.storedSettingData=this.settingData,!0)}getMatchedRule(){return oc(location.href)}},_l=null;function vl(){return _l||=Ft(new gl),_l}var yl=null;function bl(e){if(e){if(typeof sc==`function`)try{sc(e);return}catch(e){console.warn(`[SEJ] GM_addStyle 注入失败，回退到 <style>`,e)}if(!yl||!yl.isConnected){yl=document.createElement(`style`),yl.id=`sej-page-style`;let e=rs();e&&yl.setAttribute(`nonce`,e),(document.head||document.documentElement).appendChild(yl)}yl.textContent+=`\n${e}`}}function xl(e){return e?e.startsWith(`css;`)?document.querySelector(e.slice(4)):document.evaluate(e,document,null,9,null).singleNodeValue:null}function Sl(e){let t=e?.insertIntoDoc?.keyword;return typeof t==`function`?t:xl(t)}function Cl(e){let t=e?.insertIntoDoc?.target;return typeof t==`function`?t():xl(t)}function wl(e){return e?.insertIntoDoc?.where?.toLowerCase()}var Tl=`
  grid-column: 1 / -1;
  justify-self: center;
  left: auto;
  right: auto;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
`;function El(e,t){if(!e?.style)return``;let n=e.style,r=document.getElementById(`SearchMain`);return r&&r.style.marginLeft==`150px`&&(n=e.style_ZhihuChenglinz||n),t.center&&(n+=Tl),bs(`#sej-container { ${n} }`),n}function Dl(e){if(!e?.stylish)return;bl(e.stylish);let t=e.stylish.match(/#sej-container(-wrapper)?\s*\{[^}]+\}/g);t&&t.forEach(e=>bs(e))}function Ol(e){return typeof e==`function`?e():e?e.nodeName===`INPUT`?e.value:e.textContent||``:``}function kl(e){return encodeURIComponent(e)}function Al(e,t,{hideTheSameLink:n}){let r=t;n===!1&&(r=r.replace(/\bsite:[^\s]+\s*/g,``).trim());let i=kl(r),a=e.url,o=a?a.indexOf(`$post$`):-1;return o===-1?{type:`get`,url:a&&a.replaceAll(`%s`,i)}:{type:`post`,action:a.substring(0,o),field:a.substring(o+6),value:decodeURIComponent(i)}}function jl(e,t=!1){return!!(t||e.target!==`_self`)}function Ml(e){if(!e)return!1;try{return uc(e,{active:!0,insert:!0,setParent:!0}),!0}catch{try{return uc(e),!0}catch(e){return console.warn(`[SEJ] GM_openInTab 打开失败，回退到页面内跳转`,e),!1}}}function Nl(e,t,n,r){let i=document.createElement(`form`);i.method=`post`,i.action=e,i.style.cssText=`display:none;`;let a=document.createElement(`input`);a.type=`hidden`,a.name=t,a.value=n,i.appendChild(a),r&&(i.target=r),document.body.appendChild(i),i.submit()}function Pl(e,t,n,r=!1){let i=Al(e,t,{hideTheSameLink:n.HideTheSameLink}),a=jl(e,r);return i.type===`post`?(Nl(i.action,i.field,i.value,a?`_blank`:`_top`),!0):a?(Ml(i.url)||window.open(i.url,`_blank`),!0):(window.location.href=i.url,!0)}function Fl(e,t,n,r){for(let i of e)i.disable||n?.HideTheSameLink&&r?.url?.test(i.url)||Pl(i,t,n||{},!0)}function Il(e){return!e||e.nodeType!==1?!1:e.isContentEditable||e.tagName===`TEXTAREA`?!0:e.tagName===`INPUT`&&typeof e.selectionStart==`number`}function Ll(e){return!e||!Il(e)||typeof e.selectionStart!=`number`||typeof e.selectionEnd!=`number`?``:String(e.value??``).slice(e.selectionStart,e.selectionEnd)}function Rl({includeInput:e=!1,doc:t=document}={}){let n=t.activeElement;if(Il(n)){if(!e)return``;let t=Ll(n);if(t)return t}let r=typeof t.getSelection==`function`?t.getSelection():null;return!r||r.isCollapsed?``:r.toString()}var zl=8,Bl=4,Vl=640,Hl=120;function Ul({containerEl:e,isSelectSearch:t,inlineStyleBlocked:n,sitePatches:r,matchedRule:i,getResolvedStyle:a,getHost:o,getStackOffset:s,updateScrollHints:c,getInsertTarget:l,getInputTarget:u}){let d=0,f={key:``,bottom:0,at:0},p=0,m=[],h=[];function g(){let n=e.value;if(!n||t.value||!r.constrainToViewport&&!r.narrowFullWidth||o().style.position===`fixed`)return;n.style.maxWidth=``,n.style.marginLeft=``,n.style.removeProperty(`width`),n.dataset.sejLeftConstrained&&(n.style.left=``,delete n.dataset.sejLeftConstrained);let i=document.documentElement.clientWidth,a=Bl,s=Math.max(120,i-8);i<=Vl&&r.narrowFullWidth&&(n.style.setProperty(`width`,`${s}px`,`important`),r.narrowMaxWidthInPixels&&(n.style.maxWidth=`${s}px`));let c=n.getBoundingClientRect();if(c.width>s&&(n.style.maxWidth=`${s}px`,c=n.getBoundingClientRect()),!r.constrainToViewport||c.left>=a&&c.right<=i-a)return;n.dataset.sejLeftConstrained=`1`,n.style.left=`auto`,c=n.getBoundingClientRect();let l=Math.max(a,i-a-c.width),u=Math.min(Math.max(c.left,a),l);n.style.marginLeft=`${Math.round(u-c.left)}px`}function _(e,t){let n=0,i=r=>{if(!r||r===o()||r.dataset?.sejInstance)return;let i=getComputedStyle(r);if(i.position!==`fixed`&&i.position!==`sticky`)return;let a=r.getBoundingClientRect();!(a.right>e&&a.left<e+t)&&a.width<window.innerWidth*.3||a.top<=zl&&a.bottom>n&&a.bottom<window.innerHeight*.5&&(n=a.bottom)};if(document.elementsFromPoint){let n=[e+t/2,e-8,e+t+8,window.innerWidth/2,window.innerWidth-8];for(let e of n)e<0||e>window.innerWidth-1||document.elementsFromPoint(e,zl).forEach(i)}let a=l();for(;a&&a!==document.documentElement;)i(a),a=a.parentElement;let s=r.getFixedHeaderBottom;return typeof s==`function`?s({bottom:n,barLeft:e,barWidth:t,inputTarget:u()}):n}function v(){f={key:``,bottom:0,at:0}}function y(e,t){let n=performance.now(),r=`${Math.round(e)}:${Math.round(t)}`,i=f;if(i.key===r&&n-i.at<Hl)return i.bottom;let a=_(e,t);return f={key:r,bottom:a,at:n},a}function b(){m.forEach(clearTimeout),m=[80,250,600].map(e=>setTimeout(()=>{o().style.position===`fixed`&&x(i?.fixedTop,i?.fixedTopColor)},e))}function x(t,i){if(!e.value||n)return;let l=a();if(l.includes(`sticky`)||l.includes(`fixed`))return;let u=t||0,f=o(),p=e.value,m=document.documentElement.clientWidth,h=m<=Vl&&!!r.narrowFullWidth,_=Bl,v=p.getBoundingClientRect(),x=h?_:Math.max(0,parseFloat(f.dataset.originalLeft)||v.left),S=h?Math.max(120,m-8):parseFloat(f.dataset.originalWidth)||v.width,C=y(x,S),w=C>0?C+zl:zl,T=Math.max(u,C>0?w:0);if(d-window.scrollY<=T){f.style.position!==`fixed`&&(f.dataset.originalLeft=h?_:v.left,f.dataset.originalWidth=h?S:v.width,b());let e=w+s();f.style.display=`block`,f.style.width=S>0?`${Math.ceil(S)}px`:`max-content`,f.style.maxWidth=h?`${Math.ceil(S)}px`:`calc(100vw - ${x+12}px)`,f.style.position=`fixed`,f.style.top=`${Math.round(e)}px`,f.style.left=`${x}px`,f.style.zIndex=`100000`,p.style.position=`static`,p.style.left=`0`,p.style.top=`0`,p.style.gridColumn=`auto`,p.style.margin=`0`,h&&p.style.setProperty(`width`,`${Math.ceil(S)}px`,`important`),p.style.backgroundColor=i,c()}else{if(f.style.position!==`fixed`)return;f.style.position=``,f.style.top=``,f.style.left=``,f.style.zIndex=``,f.style.display=``,f.style.width=``,f.style.maxWidth=``,delete f.dataset.originalLeft,delete f.dataset.originalWidth,p.style.position=``,p.style.left=``,p.style.top=``,p.style.gridColumn=``,p.style.margin=``,p.style.backgroundColor=``,g()}}function S(){p||=requestAnimationFrame(()=>{p=0,x(i?.fixedTop,i?.fixedTopColor)})}function C(e){e.wheelDelta>0&&x(i?.fixedTop,i?.fixedTopColor)}function w(){v(),o().style.position===`fixed`?x(i?.fixedTop,i?.fixedTopColor):g(),c()}function T(){e.value&&(d=e.value.getBoundingClientRect().top+window.scrollY)}function E(e=[180,400]){h=e.map(e=>setTimeout(()=>{g(),c()},e))}function D(){m.forEach(clearTimeout),h.forEach(clearTimeout),m=[],h=[],p&&cancelAnimationFrame(p),p=0}return{constrainBarToViewport:g,fixedToTop:x,onScroll:S,onWheel:C,onViewportResize:w,captureOriginTop:T,scheduleConstrainCheck:E,dispose:D}}function Wl({scrollEl:e,threshold:t=6}){let n=null,r=0,i=0;function a(){let t=e.value;if(!t)return;let n=t.scrollWidth-t.clientWidth;t.classList.toggle(`sej-scroll-more-left`,t.scrollLeft>1),t.classList.toggle(`sej-scroll-more-right`,t.scrollLeft<n-1)}function o(){i||=requestAnimationFrame(()=>{i=0,a()})}function s(t){if(t.pointerType!==`mouse`||t.button!==0)return;r=0;let i=e.value;!i||i.scrollWidth<=i.clientWidth||(i.classList.remove(`sej-scroll-dragging`),n={pointerId:t.pointerId,startX:t.clientX,startY:t.clientY,startLeft:i.scrollLeft,moved:!1})}function c(r){let i=n;if(!i||r.pointerId!==i.pointerId)return;if(r.pointerType!==`touch`&&r.buttons===0){l(r);return}let a=e.value;if(!a)return;let s=r.clientX-i.startX,c=r.clientY-i.startY;if(!i.moved){if(Math.abs(s)<t||Math.abs(s)<=Math.abs(c))return;i.moved=!0,a.classList.add(`sej-scroll-dragging`)}a.scrollLeft=i.startLeft-s,o()}function l(t){let i=n;!i||t&&t.pointerId!==i.pointerId||(i.moved&&(r=performance.now()+400,e.value?.classList.remove(`sej-scroll-dragging`)),n=null)}function u(e){performance.now()>=r||(r=0,e.preventDefault(),e.stopPropagation())}function d(){n=null,e.value?.classList.remove(`sej-scroll-dragging`),i&&cancelAnimationFrame(i),i=0}return{updateScrollHints:a,onScrollPointerDown:s,onWindowPointerMove:c,endScrollDrag:l,onScrollClickCapture:u,dispose:d}}var Gl=[0,250,750,1500,3e3,6e3];function Kl({delays:e=Gl,refresh:t=As}={}){let n=[];function r(){n.forEach(clearTimeout),n=[],window.removeEventListener(`resize`,t)}function i(){r(),window.addEventListener(`resize`,t),n=e.map((n,r)=>setTimeout(()=>{t(),r===e.length-1&&window.removeEventListener(`resize`,t)},n))}return{start:i,stop:r}}var ql=4e3,Jl=65536,Yl=64,Xl=16,Zl={".ico":`image/x-icon`,".png":`image/png`,".jpg":`image/jpeg`,".jpeg":`image/jpeg`,".gif":`image/gif`,".webp":`image/webp`,".svg":`image/svg+xml`,".bmp":`image/bmp`,".avif":`image/avif`};function Ql(e,t){if(!e)return``;let n=e.match(RegExp(`^${t}:\\s*(.+)$`,`im`));return n?n[1].trim():``}function $l(e){let t=e.split(/[?#]/)[0].toLowerCase(),n=t.lastIndexOf(`.`);return n===-1?``:Zl[t.slice(n)]||``}function eu(e){let t=new Uint8Array(e),n=32768,r=``;for(let e=0;e<t.length;e+=n)r+=String.fromCharCode.apply(null,t.subarray(e,e+n));return btoa(r)}function tu(e){let t=e.indexOf(`,`);if(t===-1)return 1/0;let n=e.slice(t+1),r=n.endsWith(`==`)?2:+!!n.endsWith(`=`);return Math.floor(n.length*3/4)-r}function nu(e){return new Promise(t=>{let n=URL.createObjectURL(e),r=new Image;r.onload=()=>t({image:r,release:()=>URL.revokeObjectURL(n)}),r.onerror=()=>{URL.revokeObjectURL(n),t(null)},r.src=n})}async function ru(e,t){let n=new Blob([e],{type:t||`application/octet-stream`});if(typeof createImageBitmap==`function`)try{let e=await createImageBitmap(n);return{image:e,release:()=>e.close?.()}}catch{}return nu(n)}function iu(){try{let e=document.createElement(`canvas`);return e.width=1,e.height=1,e.toDataURL(`image/webp`).startsWith(`data:image/webp`)}catch{return!1}}async function au(e,t){let n=await ru(e,t);if(!n)return``;let{image:r,release:i}=n;try{let e=r.naturalWidth||r.width||0,t=r.naturalHeight||r.height||0,n=e>0&&t>0,i=n?Math.max(e,t):Yl,a=Math.min(Yl,i),o=iu();for(;a>=Xl;){let s=a/i,c=n?Math.max(1,Math.round(e*s)):a,l=n?Math.max(1,Math.round(t*s)):a,u=document.createElement(`canvas`);u.width=c,u.height=l;let d=u.getContext(`2d`);if(!d)return``;d.drawImage(r,0,0,c,l);let f=o?[[`image/webp`,.9],[`image/webp`,.7],[`image/png`,void 0]]:[[`image/png`,void 0]];for(let[e,t]of f){let n=u.toDataURL(e,t);if(tu(n)<=Jl)return n}a=Math.floor(a*.75)}return``}catch(e){return console.warn(`[SEJ] 图标压缩失败:`,e),``}finally{i?.()}}function ou(){if(typeof pc==`function`)return pc;let e=typeof globalThis<`u`?globalThis.GM:void 0;return e&&typeof e.xmlHttpRequest==`function`?e.xmlHttpRequest.bind(e):null}function su(e){return new Promise(t=>{let n=ou();if(!n){t({response:null,reason:$(`favicon.noRequestApi`)});return}let r=!1,i=e=>{r||(r=!0,t(e))};try{n({method:`GET`,url:e,responseType:`arraybuffer`,timeout:ql,headers:{Accept:`image/*,*/*;q=0.8`},onload:e=>i({response:e}),onerror:()=>i({response:null,reason:$(`favicon.networkError`)}),ontimeout:()=>i({response:null,reason:$(`favicon.timeout`)}),onabort:()=>i({response:null,reason:$(`favicon.aborted`)})})}catch(e){i({response:null,reason:$(`favicon.requestError`,{message:e?.message||e})})}})}function cu(e){return e?.faviconData||e?.favicon||``}async function lu(e){let t=typeof e==`string`?e.trim():``;if(!/^https?:\/\//i.test(t))return{data:``,reason:``};let{response:n,reason:r}=await su(t);if(!n)return{data:``,reason:r||$(`favicon.requestFailed`)};if(n.status<200||n.status>=300)return{data:``,reason:`HTTP ${n.status||0}`};let i=n.response;if(!i||i.byteLength===0)return{data:``,reason:$(`favicon.emptyResponse`)};let a=Ql(n.responseHeaders,`content-type`).split(`;`)[0].trim().toLowerCase();if(a&&a!==`application/octet-stream`||(a=$l(t)),!/^image\//.test(a))return{data:``,reason:$(`favicon.notImage`,{type:a||$(`favicon.unknownType`)})};try{if(i.byteLength>Jl){let e=await au(i,a);return e?{data:e,reason:``}:{data:``,reason:$(`favicon.compressFailed`)}}return{data:`data:${a};base64,${eu(i)}`,reason:``}}catch(e){return console.warn(`[SEJ] 图标转换失败:`,t,e),{data:``,reason:$(`favicon.convertFailed`)}}}async function uu(e){let t=typeof e==`string`?e.trim():``,{data:n}=await lu(t);return n||t}var du=[`src`],fu={__name:`EngineItem`,props:{engine:{type:Object,required:!0},showIcon:{type:Boolean,default:!0}},emits:[`jump`],setup(e,{emit:t}){bs(`
.sej-engine {
  padding: 0 13px;
  transition:
    background-color 0.08s ease-out,
    opacity 0.08s ease-out;
  font-size: 13px;
  font-family: var(--sej-font-family);
  display: inline-flex;
  gap: 8px;
  align-items: center;
  height: 2.6em;
  box-sizing: border-box;
  text-decoration: none !important;
  color: var(--font-color-qxin) !important;
  cursor: pointer;
  white-space: nowrap;
}

#sej-container > .sej-engine,
#sej-container .sej-category > .sej-engine {
  height: 30px;
  padding: 0 11px;
  gap: 6px;
  border-radius: var(--sej-radius-item, 8px);
  font-weight: 500;
}

.sej-drop-list a:visited,
.sej-drop-list a:hover,
.sej-engine a:visited,
.sej-engine a:hover,
#sej-container a:link,
#sej-container a:visited,
#sej-container a:hover {
  color: var(--font-color-qxin);
}

.sej-engine:hover {
  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));
}

.sej-engine:active {
  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));
}

#sej-container .sej-engine:focus-visible {
  outline: 2px solid var(--sej-accent, #4285f4);
  outline-offset: -2px;
}

.sej-engine-icon {
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  object-fit: cover;
  display: inline-block;
  margin: 0;
}

.sej-engine-icon:not([src]) {
  display: none;
}

.sej-engine-icon {
  pointer-events: none;
}
`);let n=e,r=Fa(()=>n.showIcon?cu(n.engine):``),i=t;return(t,n)=>(G(),K(`a`,{class:`sej-engine`,onClick:n[0]||=Y(t=>i(`jump`,e.engine),[`prevent`,`stop`])},[r.value?(G(),K(`img`,{key:0,class:`sej-engine-icon`,src:r.value,alt:``},null,8,du)):la(``,!0),q(`span`,null,L(U(rl)(e.engine.name)),1)]))}},pu=new Set,mu=new Set,hu=null,gu=0;function _u(){gu=0;let e=hu;if(hu=null,e)for(let t of pu)t(e.event,e.path)}function vu(e){hu={event:e,path:typeof e.composedPath==`function`?e.composedPath():null},!gu&&(gu=requestAnimationFrame(_u))}function yu(e){for(let t of mu)t(e)}function bu({onMove:e,onPointerDown:t}={}){e&&(pu.add(e),pu.size===1&&document.addEventListener(`mousemove`,vu,{passive:!0})),t&&(mu.add(t),mu.size===1&&document.addEventListener(`pointerdown`,yu));let n=!0;return()=>{n&&(n=!1,e&&(pu.delete(e),pu.size||(document.removeEventListener(`mousemove`,vu),hu=null,gu&&cancelAnimationFrame(gu),gu=0)),t&&(mu.delete(t),mu.size||document.removeEventListener(`pointerdown`,yu)))}}var xu=[`aria-expanded`],Su=[`title`,`aria-label`,`onKeydown`],Cu=[`src`],wu=null,Tu=null,Eu={__name:`EngineCategory`,props:{name:{type:String,required:!0},engines:{type:Array,required:!0},showIcon:{type:Boolean,default:!0}},emits:[`jump`,`jumpAll`],setup(e,{emit:t}){bs(`
.sej-category {
  display: inline-flex;
  align-items: center;
  position: relative;
}

.sej-category-search-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  flex: 0 0 auto;
  border-radius: 4px;
  color: var(--font-color-qxin);
  cursor: pointer;
  transition:
    background-color 0.08s ease-out,
    color 0.08s ease-out;
}

.sej-category-search-icon svg {
  width: 14px;
  height: 14px;
  fill: none;
  stroke: currentColor;
  stroke-width: 1.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.sej-category-search-icon:hover {
  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));
  color: var(--sej-accent, #4285f4);
}

.sej-category-search-icon:active {
  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));
}

.sej-category-search-icon:focus-visible {
  outline: 2px solid var(--sej-accent, #4285f4);
  outline-offset: -2px;
}

.sej-engine.sej-drop-list-trigger-shown {
  background-color: var(--trigger-shown-qxin);
}

.sej-drop-list > .sej-engine {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  height: 30px;
  padding: 0 10px;
  gap: 8px;
  border-radius: var(--sej-radius-item, 8px);
  font-weight: 400;
}

.sej-drop-list > .sej-engine + .sej-engine {
  margin-top: 1px;
}

.sej-drop-list {
  /* 使用 fixed 定位确保在 Shadow DOM 中位置正确 */
  position: fixed;
  display: none;
  opacity: 0.2;
  top: -10000px;
  left: 0;
  min-width: 128px;
  padding: 4px;
  box-sizing: border-box;
  text-align: left;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  box-shadow: var(
    --sej-shadow-menu,
    0 2px 6px hsla(0, 0%, 0%, 0.06),
    0 16px 40px -12px hsla(0, 0%, 0%, 0.3)
  );
  background-color: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  transition: opacity 0.08s ease-out;
  animation: sej-drop-menu-in 0.1s ease-out;
  overflow: hidden;
  border-radius: var(--sej-radius-menu, 12px);
  border: 1px solid var(--border-color-sej);
  user-select: none;
}

@keyframes sej-drop-menu-in {
  from {
    opacity: 0;
    transform: translateY(-4px) scale(0.98);
  }
}
`);let n=e,r=t,i=Fa(()=>n.showIcon&&n.engines[0]?cu(n.engines[0]):``),a=vs(),o=H(null),s=H(null),c=H(!1),l=H(!1),u=H(!1),d=H(`-10000px`),f=H(`0px`),p={x:-1,y:-1},m=!1;function h(e){if(!e)return!1;let t=e.getBoundingClientRect();return t.width>0&&t.height>0&&p.x>=t.left&&p.x<=t.right&&p.y>=t.top&&p.y<=t.bottom}function g(){let e=o.value,t=s.value;if(!e||!t)return!1;let n=e.getBoundingClientRect(),r=t.getBoundingClientRect();if(!r.width||!r.height)return!1;let i=Math.min(n.bottom,r.top),a=Math.max(n.bottom,r.top);return p.x>=Math.min(n.left,r.left)&&p.x<=Math.max(n.right,r.right)&&p.y>=i&&p.y<=a}function _(e){let t=o.value,n=s.value,r=h(t)&&(!e||e.includes(t)),i=h(n)&&(!e||e.includes(n));return r||i||g()}function v(e){let t=o.value;return!t||!h(t)?!1:!e||e.includes(t)}function y(){if(!o.value||!s.value)return;let e=o.value.getBoundingClientRect(),t=s.value.getBoundingClientRect(),n=t.width,r=t.height,i=e.left-(n-e.width)/2;i=Math.max(8,Math.min(i,window.innerWidth-n-8));let a=e.bottom+2;a+r>window.innerHeight-8&&e.top-r-2>8&&(a=e.top-r-2),d.value=a+`px`,f.value=i+`px`}let b=null;function x(){c.value&&y()}function S(){return!!b?.classList.contains(`sej-scroll-dragging`)}async function C(){S()||(c.value?l.value=!0:o.value&&(Tu&&Tu!==T&&Tu(),Tu=T,c.value=!0,await gn(),c.value&&(y(),l.value=!0)))}function w(e){u.value||_(e)||T()}function T(){Tu===T&&(Tu=null),l.value=!1,c.value=!1}function E(){wu&&wu!==D&&wu(),wu=D,u.value=!0,C()}function D(){wu===D&&(wu=null),u.value=!1,m=!0,T()}function O(){u.value?D():E()}function k(){wu&&wu!==D||m||C()}function A(){m=!1,w()}function j(){D(),r(`jumpAll`)}function ee(e){D(),r(`jump`,e)}function M(e,t){if(p.x=e.clientX,p.y=e.clientY,S()){c.value&&T();return}let n=v(t);if(n||(m=!1),!c.value){if(!n||m||wu&&wu!==D)return;C()}else u.value||_(t)?l.value=!0:w(t)}function te(e){if(!u.value)return;let t=e.composedPath?e.composedPath():[];t.includes(o.value)||t.includes(s.value)||D()}let N=null;return br(()=>{N=bu({onMove:M,onPointerDown:te}),b=o.value?.closest(`.sej-scroll`)||null,b?.addEventListener(`scroll`,x,{passive:!0})}),Cr(()=>{Tu===T&&(Tu=null),N?.(),N=null,b?.removeEventListener(`scroll`,x),b=null,wu===D&&(wu=null)}),(t,n)=>(G(),K(`span`,{class:`sej-category`,onMouseenter:k,onMouseleave:A},[q(`a`,{ref_key:`triggerEl`,ref:o,class:I([`sej-engine sej-drop-list-trigger`,{"sej-drop-list-trigger-shown":l.value}]),"aria-haspopup":`true`,"aria-expanded":c.value,onClick:Y(O,[`prevent`,`stop`])},[u.value?(G(),K(`span`,{key:0,class:`sej-category-search-icon`,role:`button`,tabindex:`0`,title:U($)(`jump.searchAll`,{name:e.name}),"aria-label":U($)(`jump.searchAll`,{name:e.name}),onClick:Y(j,[`stop`,`prevent`]),onKeydown:[Bo(Y(j,[`stop`,`prevent`]),[`enter`]),Bo(Y(j,[`stop`,`prevent`]),[`space`])]},[...n[0]||=[q(`svg`,{viewBox:`0 0 16 16`,"aria-hidden":`true`},[q(`path`,{d:`M6.5 3H4.3A1.3 1.3 0 0 0 3 4.3v7.4A1.3 1.3 0 0 0 4.3 13h7.4a1.3 1.3 0 0 0 1.3-1.3V9.5`}),q(`path`,{d:`M9.6 2.6h3.8v3.8`}),q(`path`,{d:`M13.4 2.6 8.6 7.4`})],-1)]],40,Su)):i.value?(G(),K(`img`,{key:1,class:`sej-engine-icon`,src:i.value,alt:``},null,8,Cu)):la(``,!0),q(`span`,null,L(e.name),1)],10,xu),(G(),ea(Qn,{to:U(a)},[q(`div`,{ref_key:`listEl`,ref:s,class:`sej-drop-list`,style:F({display:c.value?`block`:`none`,top:d.value,left:f.value,opacity:l.value?1:.2,pointerEvents:c.value?`auto`:`none`,transition:`opacity 0s`,animation:`none`,zIndex:1e8}),onMouseenter:C,onMouseleave:w},[(G(!0),K(W,null,Ar(e.engines,e=>(G(),ea(fu,{key:e.name+e.url,engine:e,onJump:ee},null,8,[`engine`]))),128))],36)],8,[`to`]))],32))}},Du=[`title`,`aria-label`],Ou=`<svg width="16" height="16" class="icon" id="sej-setting-button" viewBox="0 0 512 512" aria-hidden="true" focusable="false"><path d="M262.29 192.31a64 64 0 1057.4 57.4 64.13 64.13 0 00-57.4-57.4zM416.39 256a154.34 154.34 0 01-1.53 20.79l45.21 35.46a10.81 10.81 0 012.45 13.75l-42.77 74a10.81 10.81 0 01-13.14 4.59l-44.9-18.08a16.11 16.11 0 00-15.17 1.75A164.48 164.48 0 01325 400.8a15.94 15.94 0 00-8.82 12.14l-6.73 47.89a11.08 11.08 0 01-10.68 9.17h-85.54a11.11 11.11 0 01-10.69-8.87l-6.72-47.82a16.07 16.07 0 00-9-12.22 155.3 155.3 0 01-21.46-12.57 16 16 0 00-15.11-1.71l-44.89 18.07a10.81 10.81 0 01-13.14-4.58l-42.77-74a10.8 10.8 0 012.45-13.75l38.21-30a16.05 16.05 0 006-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 00-6.07-13.94l-38.19-30A10.81 10.81 0 0149.48 186l42.77-74a10.81 10.81 0 0113.14-4.59l44.9 18.08a16.11 16.11 0 0015.17-1.75A164.48 164.48 0 01187 111.2a15.94 15.94 0 008.82-12.14l6.73-47.89A11.08 11.08 0 01213.23 42h85.54a11.11 11.11 0 0110.69 8.87l6.72 47.82a16.07 16.07 0 009 12.22 155.3 155.3 0 0121.46 12.57 16 16 0 0015.11 1.71l44.89-18.07a10.81 10.81 0 0113.14 4.58l42.77 74a10.8 10.8 0 01-2.45 13.75l-38.21 30a16.05 16.05 0 00-6.05 14.08c.33 4.14.55 8.3.55 12.47z" fill="none" stroke="var(--font-color-qxin)" stroke-linecap="round" stroke-linejoin="round" stroke-width="42"/></svg>`,ku={__name:`SettingButton`,setup(e){return bs(`
#setBtn {
  transition:
    background-color 0.08s ease-out,
    opacity 0.08s ease-out;
  width: 30px;
  height: 30px;
  flex: 0 0 auto;
  padding: 0;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  display: flex;
  opacity: 0.65;
}

span#setBtn:hover {
  opacity: 1;
  background-color: var(--sej-hover-bg, var(--background-hover-color-qxin));
}

span#setBtn:active {
  background-color: var(--sej-active-bg, rgba(0, 0, 0, 0.1));
}

#setBtn svg {
  width: 16px;
  height: 16px;
  display: block;
}

#setBtn:focus-visible {
  opacity: 1;
  outline: 2px solid var(--sej-accent, #4285f4);
  outline-offset: -2px;
}
`),(e,t)=>(G(),K(`span`,{id:`setBtn`,role:`button`,tabindex:`0`,title:U($)(`menu.settings`),"aria-label":U($)(`menu.settings`),onClick:t[0]||=(...e)=>U(Qo)&&U(Qo)(...e),onKeydown:[t[1]||=Bo(Y((...e)=>U(Qo)&&U(Qo)(...e),[`prevent`]),[`enter`]),t[2]||=Bo(Y((...e)=>U(Qo)&&U(Qo)(...e),[`prevent`]),[`space`])],innerHTML:Ou},null,40,Du))}},Au=[`aria-hidden`],ju={class:`sej-scroll-viewport`},Mu={class:`sej-category-title`},Nu=[`title`,`aria-label`],Pu=[`title`,`aria-label`],Fu=.875,Iu=150,Lu={__name:`JumpBar`,setup(e){bs(`
#sej-container {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
  padding: 2px;
  gap: 2px;
  font-size: 13px;
  font-family: var(--sej-font-family);
  -webkit-font-smoothing: antialiased;
  transform-origin: top center;
  animation: sejopen 0.14s ease-out;
  color: var(--font-color-qxin);
  background: var(--sej-bar-bg, var(--background-color-qxin));
  backdrop-filter: blur(20px) saturate(180%);
  width: max-content !important;
  max-width: min(100%, calc(100vw - 8px));
  box-sizing: border-box;
  border-radius: var(--sej-radius-bar, 12px);
  border: 1px solid var(--border-color-sej);
  overflow: hidden;
  box-shadow: var(
    --sej-shadow-bar,
    0 1px 2px hsla(0, 0%, 0%, 0.06),
    0 8px 24px -12px hsla(0, 0%, 0%, 0.35)
  );
  height: fit-content;
  flex-wrap: nowrap;
  justify-content: center;
  user-select: none;
}

/* 滚动区容器：内容不足时让类别和设置按钮作为整体居中，溢出时再收缩滚动 */
#sej-container > .sej-scroll-viewport {
  position: relative;
  display: flex;
  flex: 0 1 auto;
  min-width: 0;
}

/* 类别区单行显示，超出可用宽度时横向滚动；设置按钮固定在右侧 */
#sej-container > .sej-scroll-viewport > .sej-scroll {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  gap: 2px;
  flex: 0 1 auto;
  min-width: 0;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior-x: contain;
  -webkit-overflow-scrolling: touch;
  /*
   * 不显示滚动条：桌面端用鼠标拖动，触屏不拦截手势，
   * 让浏览器原生处理横向滚动，保留松手后的惯性滑动。
   */
  scrollbar-width: none;
  -ms-overflow-style: none;
  touch-action: auto;
  cursor: grab;
}

#sej-container > .sej-scroll-viewport > .sej-scroll::-webkit-scrollbar {
  display: none;
  width: 0;
  height: 0;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-dragging * {
  cursor: grabbing;
}

/* 左右仍有隐藏内容时，用渐隐边缘 + 圆形箭头提示可以继续拖动 */
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left {
  -webkit-mask-image: linear-gradient(to right, transparent, #000 28px);
  mask-image: linear-gradient(to right, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(to left, transparent, #000 28px);
  mask-image: linear-gradient(to left, transparent, #000 28px);
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left.sej-scroll-more-right {
  -webkit-mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
  mask-image: linear-gradient(
    to right,
    transparent,
    #000 28px,
    #000 calc(100% - 28px),
    transparent
  );
}

/*
 * 圆形箭头按钮：点击滚动一屏。
 * 按钮本身铺满滚动区高度并加宽为透明命中区，鼠标从边缘移到箭头上时
 * 不会先掠过底下的分类/引擎条目；可见的圆形与箭头由伪元素绘制。
 */
#sej-container .sej-scroll-hint {
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  appearance: none;
  color: var(--sej-accent);
  background: none;
  border: 0;
  font: inherit;
  line-height: 0;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.16s ease-out;
}

/* 可见的圆形底 */
#sej-container .sej-scroll-hint::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 22px;
  height: 22px;
  margin: auto;
  box-sizing: border-box;
  border-radius: 50%;
  background: var(--sej-bar-bg, var(--background-color-qxin));
  border: 1px solid var(--border-color-sej);
  box-shadow: 0 2px 6px hsla(0, 0%, 0%, 0.22);
  transition:
    box-shadow 0.08s ease-out,
    transform 0.08s ease-out;
}

#sej-container .sej-scroll-hint::after {
  content: '';
  position: relative;
  z-index: 1;
  width: 6px;
  height: 6px;
  border-top: 2px solid currentColor;
  border-right: 2px solid currentColor;
  border-radius: 1px;
}

#sej-container .sej-scroll-hint-left {
  left: 0;
}

#sej-container .sej-scroll-hint-left::after {
  margin-left: 2px;
  transform: rotate(-135deg);
}

#sej-container .sej-scroll-hint-right {
  right: 0;
}

#sej-container .sej-scroll-hint-right::after {
  margin-right: 2px;
  transform: rotate(45deg);
}

#sej-container .sej-scroll-hint:hover::before {
  box-shadow: 0 2px 10px hsla(0, 0%, 0%, 0.32);
}

#sej-container .sej-scroll-hint:active::before {
  transform: scale(0.92);
}

#sej-container .sej-scroll-hint:focus-visible {
  outline: none;
}

#sej-container .sej-scroll-hint:focus-visible::before {
  outline: 2px solid var(--sej-accent);
  outline-offset: 1px;
}

#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-left ~ .sej-scroll-hint-left,
#sej-container > .sej-scroll-viewport > .sej-scroll.sej-scroll-more-right ~ .sej-scroll-hint-right {
  opacity: 1;
  visibility: visible;
  pointer-events: auto;
}

#sej-container > #setBtn {
  flex: 0 0 auto;
  margin-left: 2px;
}

/* 滑词搜索样式 */
#sej-container.selectSearch {
  position: fixed;
  top: 2px;
  left: 0;
  right: 0;
  z-index: 99999999;
  margin: 0 auto;
  transform: translateY(calc(-100% - 10px));
  visibility: hidden;
  pointer-events: none;
  transition:
    transform 0.3s,
    visibility 0s linear 0.3s;
}

#sej-container.selectSearch.sej-select-visible {
  transform: none;
  visibility: visible;
  pointer-events: auto;
  transition:
    transform 0.3s,
    visibility 0s linear 0s;
}

.sej-category-title {
  font-weight: 600;
  padding: 0 12px;
  opacity: 0.8;
}

@keyframes sejopen {
  0% {
    transform: translateY(-4px) scale(0.98);
    opacity: 0;
  }
  100% {
    transform: none;
    opacity: 1;
  }
}
`);let t=vl(),n=t.settingData,r=t.getMatchedRule();t.activeRule=r,t.barMounted=!1;let i=r?.patches??{},a=ns(),o=H(!1),s=H(!1),c=H(``),l=H(!1),u=H(null),d=H(null),f=H(`rwl-exempt`),{updateScrollHints:p,onScrollPointerDown:m,onWindowPointerMove:h,endScrollDrag:g,onScrollClickCapture:_,dispose:v}=Wl({scrollEl:d}),{start:y,stop:b}=Kl(),{constrainBarToViewport:x,onScroll:S,onWheel:C,onViewportResize:w,captureOriginTop:T,scheduleConstrainCheck:E,dispose:D}=Ul({containerEl:u,isSelectSearch:s,inlineStyleBlocked:a,sitePatches:i,matchedRule:r,getResolvedStyle:()=>j,getHost:gs,getStackOffset:Es,updateScrollHints:p,getInsertTarget:()=>k,getInputTarget:()=>O}),O=null,k=null,A=`beforeend`,j=``,ee=Fa(()=>n.engineCategories.filter(([,,e])=>e).map(([e,t])=>({name:nl(e,t),key:t,engines:(n.engineList[t]||[]).filter(e=>!(e.disable||n.HideTheSameLink&&r?.url?.test(e.url)))})).filter(e=>e.engines.length));function M(){return s.value?c.value:Ol(O)}function te(e){Pl(e,M(),n)}function N(e){Fl(e,M(),n,r)}let ne=0;function re(e){return e<.5?2*e*e:1-(-2*e+2)**2/2}function P(){ne&&=(cancelAnimationFrame(ne),0)}function ie(e,t){P();let n=e.scrollLeft,r=t-n;if(!r)return;let i=performance.now(),a=t=>{let o=Math.min(1,(t-i)/Iu);e.scrollLeft=n+r*re(o),ne=o<1?requestAnimationFrame(a):0};ne=requestAnimationFrame(a)}function ae(e){let t=d.value;if(!t)return;let n=t.scrollWidth-t.clientWidth;if(n<=0)return;let r=e*t.clientWidth*Fu,i=Math.min(n,Math.max(0,t.scrollLeft+r));window.matchMedia?.(`(prefers-reduced-motion: reduce)`)?.matches?(P(),t.scrollLeft=i):ie(t,i)}function oe(e){P(),m(e)}function se(){return a&&console.warn(`[SEJ] 检测到 CSP 阻止内联样式，划词条仍会尝试显示`),s.value=!0,O=()=>c.value,k=document.body,A=`beforeend`,!0}function ce(){return n.selectSearch&&r?.enabled&&r.selectSearchPriority?se():r?.enabled?(O=Sl(r),k=Cl(r),A=wl(r)||`beforeend`,!O||!k?(console.warn(`[SEJ] 未找到输入框或插入位置：\n输入框：${O}\n插入位置：${k}`),n.selectSearch?se():!1):!0):n.selectSearch?se():(console.info(`[SEJ] 未启用搜索跳转，跳过初始化`),!1)}function F(){s.value?ys(document.body,`beforeend`):(ys(k,A),!j.includes(`sticky`)&&!j.includes(`fixed`)&&r?.wrapperClass&&(gs().className+=` ${r.wrapperClass}`))}function le(){let e=Rl({includeInput:n.selectSearchInInput});e?(c.value=e,l.value=!0):l.value=!1}return br(async()=>{ce()&&(t.barMounted=!0,o.value=!0,s.value&&le(),r&&(Dl(r),j=El(r,n)||``,r.class&&(f.value=`rwl-exempt ${r.class}`)),await gn(),F(),y(),x(),p(),E(),window.addEventListener(`resize`,w),window.addEventListener(`pointermove`,h,{passive:!0}),window.addEventListener(`pointerup`,g),window.addEventListener(`pointercancel`,g),s.value&&(document.addEventListener(`selectionchange`,le),document.addEventListener(`mouseup`,le),document.addEventListener(`keyup`,le)),n.fixedTop&&r&&!a&&!s.value&&(T(),n.fixedTopUpward?window.addEventListener(`wheel`,C):window.addEventListener(`scroll`,S)))}),Cr(()=>{document.removeEventListener(`selectionchange`,le),document.removeEventListener(`mouseup`,le),document.removeEventListener(`keyup`,le),window.removeEventListener(`scroll`,S),window.removeEventListener(`wheel`,C),window.removeEventListener(`resize`,w),window.removeEventListener(`pointermove`,h),window.removeEventListener(`pointerup`,g),window.removeEventListener(`pointercancel`,g),P(),v(),D(),b()}),(e,t)=>o.value?(G(),K(`div`,{key:0,ref_key:`containerEl`,ref:u,id:`sej-container`,class:I([f.value,{selectSearch:s.value,"sej-select-visible":l.value}]),"aria-hidden":s.value&&!l.value?`true`:void 0},[q(`div`,ju,[q(`div`,{ref_key:`scrollEl`,ref:d,class:`sej-scroll`,onPointerdown:oe,onClickCapture:t[0]||=(...e)=>U(_)&&U(_)(...e),onDragstart:t[1]||=Y(()=>{},[`prevent`]),onWheelPassive:P,onScrollPassive:t[2]||=(...e)=>U(p)&&U(p)(...e)},[(G(!0),K(W,null,Ar(ee.value,e=>(G(),K(W,{key:e.key},[U(a)?(G(),K(W,{key:0},[q(`span`,Mu,L(e.name),1),(G(!0),K(W,null,Ar(e.engines,e=>(G(),ea(fu,{key:e.url+e.name,engine:e,onJump:te},null,8,[`engine`]))),128))],64)):(G(),ea(Eu,{key:1,name:e.name,engines:e.engines,"show-icon":U(X).categoryIcon,onJump:te,onJumpAll:t=>N(e.engines)},null,8,[`name`,`engines`,`show-icon`,`onJumpAll`]))],64))),128))],544),q(`button`,{type:`button`,class:`sej-scroll-hint sej-scroll-hint-left`,title:U($)(`bar.scrollLeft`),"aria-label":U($)(`bar.scrollLeft`),onClick:t[3]||=Y(e=>ae(-1),[`stop`])},null,8,Nu),q(`button`,{type:`button`,class:`sej-scroll-hint sej-scroll-hint-right`,title:U($)(`bar.scrollRight`),"aria-label":U($)(`bar.scrollRight`),onClick:t[4]||=Y(e=>ae(1),[`stop`])},null,8,Pu)]),aa(ku)],10,Au)):la(``,!0)}};function Ru({buildResult:e,getCurrent:t,settings:n,delay:r=500}){let i=H(!1),a=null,o=!1,s=!1,c=!1;function l(){Z($(`toast.autoSaved`),1500,null,{priority:-1})}function u(){o=!1,clearTimeout(a),a=null}function d(){if(a=null,!o||i.value)return;o=!1;let r=e();if(Lc(r,t()))return;let u=n.savePartial(r);u===`memory`?Z($(`toast.autoSaveFailed`),5e3):(c=!0,u===`local`&&!s?(s=!0,Z($(`toast.autoSavedLocal`),3e3)):l())}function f(){i.value||(o=!0,clearTimeout(a),a=setTimeout(d,r))}function p(){o&&(clearTimeout(a),d())}function m(){if(i.value)return!1;u(),i.value=!0;try{if(!Lc(e(),t())){let t=n.applySettings(e());if(t===`memory`)return Z($(`toast.saveFailed`),5e3),!1;c=!0,t===`local`&&Z($(`toast.savedLocal`),4e3)}return!0}finally{i.value=!1}}function h(){c=!0}function g(){let e=c;return c=!1,e}function _(){u()}return{saving:i,cancelAutoSave:u,flushAutoSave:d,scheduleAutoSave:f,flushPending:p,saveNow:m,notifySaved:l,markSettingsChanged:h,takeSettingsChanged:g,dispose:_}}function zu({layerEl:e,maskEl:t,layerStyle:n}){let r={x:0,y:0},i=null;function a(a){if(i!=null&&a.pointerId!==i)return;let o=e.value;if(!o)return;let s=t.value,c=s?s.scrollLeft:0,l=s?s.scrollTop:0,u=c+Math.max(0,window.innerWidth-o.offsetWidth),d=l+Math.max(0,window.innerHeight-o.offsetHeight);n.value={left:Math.min(Math.max(a.clientX-r.x+c,c),u)+`px`,top:Math.min(Math.max(a.clientY-r.y+l,l),d)+`px`,margin:0},a.cancelable&&a.preventDefault()}function o(e){e&&i!=null&&e.pointerId!==i||(i=null,document.removeEventListener(`pointermove`,a),document.removeEventListener(`pointerup`,o),document.removeEventListener(`pointercancel`,o))}function s(t){if(t.pointerType!==`touch`&&t.button!==0||t.pointerType===`touch`&&t.isPrimary===!1||t.target?.closest?.(`.sej-panel-close`))return;let n=e.value;if(!n)return;let s=n.getBoundingClientRect();r={x:t.clientX-s.left,y:t.clientY-s.top},i=t.pointerId,document.addEventListener(`pointermove`,a),document.addEventListener(`pointerup`,o),document.addEventListener(`pointercancel`,o)}function c(){o()}return{startDrag:s,stopDrag:o,dispose:c}}var Bu=160;function Vu({dragElements:e}){let t=new WeakMap;function n(){let t=new Map;for(let n of e())t.set(n.dataset.sejDragEl,n.getBoundingClientRect());return t}function r(){for(let n of e()){let e=t.get(n);e&&(e.cancel(),t.delete(n))}}async function i(i){let a=!!window.matchMedia?.(`(prefers-reduced-motion: reduce)`)?.matches,o=a?null:n();if(i(),a)return;await gn(),r();let s=n();for(let n of e()){let e=n.dataset.sejDragEl,r=o.get(e),i=s.get(e);if(!r||!i)continue;let a=r.left-i.left,c=r.top-i.top;if(!a&&!c)continue;let l=n.parentElement?.closest(`[data-sej-drag-el]`);if(l){let e=o.get(l.dataset.sejDragEl),t=s.get(l.dataset.sejDragEl);e&&t&&(a-=e.left-t.left,c-=e.top-t.top)}let u=n.animate([{transform:`translate(${a}px, ${c}px)`},{transform:`translate(0, 0)`}],{duration:Bu,easing:`cubic-bezier(0.2, 0, 0, 1)`});t.set(n,u),u.addEventListener(`finish`,()=>{t.get(n)===u&&t.delete(n)})}}return{snapshotRects:n,cancel:r,animateReorder:i}}var Hu=40,Uu=14;function Wu({getBody:e,getPoint:t,isDragging:n,onScroll:r}){let i=0;function a(){if(i=0,!n())return;let o=e(),s=t();if(o&&s){let e=o.getBoundingClientRect(),{x:t,y:n}=s,i=0;t>=e.left&&t<=e.right&&(n<e.top+Hu&&n>=e.top-Hu?i=-Math.ceil((e.top+Hu-n)/Hu*Uu):n>e.bottom-Hu&&n<=e.bottom+Hu&&(i=Math.ceil((n-e.bottom+Hu)/Hu*Uu))),i&&(o.scrollTop+=i,r(t,n))}n()&&(i=requestAnimationFrame(a))}function o(){i||=requestAnimationFrame(a)}function s(){i&&cancelAnimationFrame(i),i=0}return{start:o,stop:s}}function Gu(e){let t=0,n=0,r=e;for(;r;)t+=r.offsetLeft,n+=r.offsetTop,r=r.offsetParent;return{x:t,y:n}}function Ku(e,t){if(!e||!e.contains(t))return t.getBoundingClientRect();let n=e.getBoundingClientRect(),r=Gu(e),i=Gu(t),a=t.offsetWidth,o=t.offsetHeight,s=n.left+i.x-r.x-e.scrollLeft,c=n.top+i.y-r.y-e.scrollTop;return{left:s,top:c,width:a,height:o,right:s+a,bottom:c+o}}function qu(e){function t(){return e()?.querySelector(`#sej-settings-body`)||null}function n(){let t=e();return t?Array.from(t.querySelectorAll(`[data-sej-drag-el]`)):[]}function r(){let e=t();return e?Array.from(e.querySelectorAll(`.iqxin-items[data-sej-drag-el^="category-"]`)):[]}function i(e,t,n){if(e===`category`)return r()[t]||null;let i=r()[t];return i&&i.querySelectorAll(`:scope > .sejcon > .drag`)[n]||null}function a(e,n){let i=r();for(let r=0;r<i.length;r++){let a=i[r].querySelector(`:scope > .sejcon > .iqxin-additem`);if(!a)continue;let o=Ku(t(),a);if(e>=o.left&&e<=o.right&&n>=o.top&&n<=o.bottom)return r}return-1}function o(e,n){let i=r();for(let r=0;r<i.length;r++){let a=Ku(t(),i[r]);if(e>=a.left&&e<=a.right&&n>=a.top&&n<=a.bottom)return r}return-1}function s(e,n){let r=Array.from(e.querySelectorAll(`:scope > .sejcon > .drag`));for(let e=0;e<r.length;e++){let i=Ku(t(),r[e]);if(n<i.top+i.height/2)return e}return r.length}return{settingsBody:t,dragElements:n,categoryCards:r,sourceElement:i,addItemIndexAt:a,categoryIndexAt:o,engineInsertIndex:s}}function Ju({layerEl:e}){let t=null,n={x:0,y:0};function r(e,r){t&&(t.style.transform=`translate3d(${e-n.x}px, ${r-n.y}px, 0)`)}function i(i,a,o,s,c){n={x:o-a.left,y:s-a.top};let l=i.cloneNode(!0);l.removeAttribute(`id`),l.removeAttribute(`data-sej-drag-el`),l.querySelectorAll(`[data-sej-drag-el]`).forEach(e=>{e.removeAttribute(`data-sej-drag-el`)}),l.classList.remove(`sej-drag-placeholder`),l.classList.add(`sej-drag-ghost`,`sej-drag-ghost-${c}`),l.style.width=`${a.width}px`,l.style.height=`${a.height}px`,(e.value||i.getRootNode()).appendChild(l),t=l,r(o,s)}function a(){t&&=(t.remove(),null)}function o(){return!!t}return{show:i,position:r,remove:a,hasGhost:o}}function Yu(e){return{categories:e.map(e=>e._id),engines:Object.fromEntries(e.map(e=>[e._id,e.engines.map(e=>e._id)]))}}function Xu(e,t){let n=new Map(e.map(e=>[e._id,e])),r=new Map;for(let t of e)for(let e of t.engines)r.set(e._id,e);for(let n of e){let e=t.engines[n._id]||[];n.engines.splice(0,n.engines.length,...e.map(e=>r.get(e)).filter(Boolean))}let i=t.categories.map(e=>n.get(e)).filter(Boolean);e.splice(0,e.length,...i)}var Zu=4,Qu=280,$u=10;function ed({draft:e,layerEl:t,nextId:n,scheduleAutoSave:r}){let i=H(null),a=H(null),o=null,s=!1,c=null,l=0,u=!1,{settingsBody:d,sourceElement:f,categoryCards:p,categoryIndexAt:m,addItemIndexAt:h,engineInsertIndex:g,dragElements:_}=qu(()=>t.value),v=Vu({dragElements:_}),y=Ju({layerEl:t}),b=Wu({getBody:d,getPoint:()=>c,isDragging:()=>!!(i.value&&c),onScroll:(e,t)=>j(e,t)});function x(t){v.animateReorder(()=>Xu(e.categories,t)),i.value=null}function S(e,t,n,r=null){E(),u=!1;let i=e.pointerType===`touch`;if(i&&e.isPrimary===!1||!i&&e.button!==0||e.target?.closest?.(`.iqxin-set-toggle, .sej-hover-delete`))return;let a=f(t,n,r);a&&(c={type:t,ci:n,ei:t===`engine`?r:null,sourceEl:a,pointerId:e.pointerId,startX:e.clientX,startY:e.clientY,x:e.clientX,y:e.clientY,touch:i,activated:!i,started:!1},document.addEventListener(`pointermove`,A),document.addEventListener(`pointerup`,ne),document.addEventListener(`pointercancel`,re),i&&(l=setTimeout(()=>{l=0;let e=c;e&&!e.started&&(e.activated=!0,k()?T(!0):N())},Qu)))}function C(){l&&=(clearTimeout(l),0)}function w(e){i.value&&e.preventDefault()}function T(e){document.removeEventListener(`touchmove`,w),e&&document.addEventListener(`touchmove`,w,{passive:!1})}function E(){(c||y.hasGhost())&&(o&&=(x(o),null),s=!1,te(),N())}function D(){c&&(c.started?(E(),u=!0):N())}function O(){document.removeEventListener(`pointermove`,A),document.removeEventListener(`pointerup`,ne),document.removeEventListener(`pointercancel`,re),T(!1)}function k(){let t=c,n=e.categories[t.ci];if(!n)return!1;let r=t.type===`category`?n:n.engines[t.ei];if(!r)return!1;let l=t.sourceEl.getBoundingClientRect();if(o=Yu(e.categories),s=!1,a.value=null,y.show(t.sourceEl,l,t.x,t.y,t.type),i.value={type:t.type,ci:t.ci,ei:t.ei,key:t.type===`category`?n.key:r._id},t.started=!0,t.touch)try{navigator.vibrate?.(12)}catch{}return b.start(),!0}function A(e){let t=c;if(t&&e.pointerId===t.pointerId){if(t.x=e.clientX,t.y=e.clientY,!t.started){let e=Math.hypot(t.x-t.startX,t.y-t.startY);if(t.touch){!t.activated&&e>$u&&N();return}if(e<Zu)return;if(!k()){N();return}}e.cancelable&&e.preventDefault(),y.position(t.x,t.y),j(t.x,t.y)}}function j(e,t){let n=i.value;if(!n)return;let r=d();if(!r)return;let o=r.getBoundingClientRect(),c=e>=o.left&&e<=o.right&&t>=o.top&&t<=o.bottom;if(s=c,!c){a.value=null;return}if(n.type===`engine`){let n=h(e,t);if(n>=0){a.value=n;return}}a.value=null;let l=m(e,t);if(l<0)return;if(n.type===`category`){ie(l);return}let u=p()[l];u&&ae(l,g(u,t))}function ee(){let t=i.value;if(!t||t.type!==`engine`)return;let s=a.value,c=e.categories[t.ci]?.engines?.[t.ei],l=e.categories[s]?.key,u=c?{...yc(c),_id:n()}:null;if(o&&=(x(o),null),u){let t=e.categories.find(e=>e.key===l);t&&(t.engines.push(u),r(),Z($(`toast.copied`,{name:rl(c.name)})))}}function M(){let e=o;i.value?.type===`engine`&&a.value!=null?ee():s?r():e&&x(e),o=null,s=!1,te(),u=!0,N()}function te(){b.stop(),y.remove(),c?.sourceEl&&c.sourceEl.classList.remove(`sej-drag-placeholder`),i.value=null,a.value=null}function N(){C(),O(),c=null}function ne(e){let t=c;t&&e.pointerId===t.pointerId&&(t.started?M():N())}function re(e){let t=c;t&&e.pointerId===t.pointerId&&(t.started&&(o&&x(o),o=null,s=!1,te(),u=!0),N())}function P(){return u?(u=!1,!0):!1}function ie(t){let n=i.value;if(!n||n.type!==`category`||n.ci===t)return;let r=e.categories[n.ci];r&&v.animateReorder(()=>{e.categories.splice(n.ci,1),e.categories.splice(t,0,r),n.ci=t})}function ae(t,n){let r=i.value;if(!r||r.type!==`engine`)return;let a=e.categories[r.ci],o=e.categories[t],s=a?.engines?.[r.ei];if(!s||!o)return;let c=r.ei,l=Math.max(0,Math.min(n,o.engines.length));if(a===o){if(l===c||l===c+1)return;c<l&&--l}v.animateReorder(()=>{a.engines.splice(c,1),o.engines.splice(l,0,s),r.ci=t,r.ei=l})}function oe(){O(),C(),b.stop(),y.remove(),i.value=null,a.value=null}return{dragCtx:i,copyTargetCi:a,onDragPointerDown:S,onWindowBlur:D,consumeClickSuppression:P,dispose:oe}}var td=`a[href],button:not([disabled]),input:not([disabled]):not([type="hidden"]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])`;function nd(e){if(e.hidden||e.getAttribute(`aria-hidden`)===`true`)return!1;let t=getComputedStyle(e);return t.display!==`none`&&t.visibility!==`hidden`}function rd({containerEl:e,onClose:t,initialFocus:n}){let r=null,i=null;function a(){return r?Array.from(r.querySelectorAll(td)).filter(nd):[]}function o(e){if(e.key===`Escape`){if(e.defaultPrevented)return;e.preventDefault(),e.stopPropagation(),t?.();return}if(e.key!==`Tab`)return;let n=a();if(!n.length){e.preventDefault(),r?.focus();return}let i=n[0],o=n[n.length-1],s=document.activeElement,c=r?.contains(s);e.shiftKey?c&&s!==i||(e.preventDefault(),o.focus()):c&&s!==o||(e.preventDefault(),i.focus())}br(async()=>{r=e.value,i=document.activeElement,r&&(r.hasAttribute(`tabindex`)||r.setAttribute(`tabindex`,`-1`),r.addEventListener(`keydown`,o),await gn(),(n?.value||a()[0]||r)?.focus?.())}),Cr(()=>{r?.removeEventListener(`keydown`,o),i?.isConnected&&typeof i.focus==`function`&&i.focus()})}function id(e){let t=typeof e==`string`?e.trim():``;return t?t.replace(/^([a-z][a-z\d+.-]*:\/\/)?([^/?#]+)/i,(e,t=``,n)=>t.toLowerCase()+n.toLowerCase()).replace(/\/+$/,``):``}function ad(e){return typeof e==`string`?e.trim().toLowerCase():``}function od(e,t){let n=typeof e==`string`&&e?e:`imported`;if(!t.has(n))return n;let r=2;for(;t.has(`${n}-${r}`);)r+=1;return`${n}-${r}`}function sd(e,t,n){let r=pl(t);if(!r)return null;let i={engines:0,categories:0,skipped:0},a=new Set(e.map(e=>e.key));for(let[t,o,s]of r.engineCategories){let c=r.engineList[o]||[],l=e.find(e=>e.key===o)||e.find(e=>ad(e.name)===ad(t)),u=new Set((l?l.engines:[]).map(e=>id(e.url)).filter(Boolean)),d=[];for(let e of c){let t=id(e.url);!t||u.has(t)?i.skipped+=1:(u.add(t),d.push({...e,_id:n()}))}if(d.length){if(l)l.engines.push(...d);else{let r=od(o,a);a.add(r),e.push({_id:n(),name:t,key:r,enabled:!!s,engines:d}),i.categories+=1}i.engines+=d.length}}return i}function cd({draft:e,nextId:t,buildResult:n,getCurrent:r,getSettings:i,refreshDraft:a,cancelAutoSave:o,markSettingsChanged:s,notifySaved:c,resetRemoteSynced:l}){let u=H(!1),d=H(null),f=H(null),p=Fa(()=>fl(r())),m=Fa(()=>fl(i().scriptSettingData));function h(){d.value=null,u.value=!0}function g(){f.value?.click()}async function _(e){let t=e.target.files?.[0];if(e.target.value=``,t)try{d.value=JSON.parse(await t.text()),u.value=!0}catch{alert($(`config.parseFailed`))}}function v(){let e=new Blob([p.value],{type:`application/json;charset=utf-8`}),t=URL.createObjectURL(e),n=document.createElement(`a`);n.href=t,n.download=`SearchEngineJump.json`,document.body.appendChild(n),n.click(),n.remove(),setTimeout(()=>URL.revokeObjectURL(t),1e3),Z($(`config.exported`))}function y(e){if(typeof e!=`string`)return e;try{return JSON.parse(e)}catch{return alert($(`config.parseFailed`)),null}}function b(r,i=!1){let a=y(r);if(!a)return``;let o=e.categories.map(e=>({...e,engines:e.engines.map(e=>({...e}))})),s=sd(o,a,t);if(!s)return i||alert($(`config.mergeUnrecognized`)),``;if(!s.engines)i||Z($(`toast.mergeNothing`),3e3);else{let e=[$(`toast.mergedEngines`,{count:s.engines})];s.categories&&e.push($(`toast.mergedCategories`,{count:s.categories})),s.skipped&&e.push($(`toast.mergedSkipped`,{count:s.skipped})),i||Z($(`toast.mergeImported`,{summary:e.join($(`toast.listSeparator`))}),4e3)}return fl(n(o))}function x(e){let t=y(e);if(!t)return;o(),l();let n=i().applySettings(t);d.value=null,a(),n===`memory`?Z($(`toast.saveFailed`),5e3):(s(),c()),u.value=!1}function S(){d.value=null,u.value=!1}return{configOpen:u,pendingImport:d,configFileInput:f,configText:p,defaultConfigText:m,openConfig:h,pickConfigFile:g,importConfigFile:_,exportConfig:v,mergePreview:b,applyConfig:x,cancelConfig:S}}var ld=new Set([`com`,`net`,`org`,`gov`,`edu`,`co`,`ac`,`or`,`ne`,`go`,`adm`]);function ud(e){let t=String(e??``).trim();return t?t.includes(`://`)?t:`https://${t}`:``}function dd(e){let t=ud(e);if(!t)return``;try{return new URL(t).hostname.toLowerCase()}catch{return``}}function fd(e){let t=ud(e);if(!t)return``;try{return new URL(t).origin}catch{return``}}function pd(e){let t=e[e.length-1]||``,n=(e[e.length-2]||``).toLowerCase();return t.length===2&&ld.has(n)?2:1}function md(e){let t=dd(e).replace(/^www\./,``);if(!t)return``;if(/^\d+(\.\d+){3}$/.test(t))return t;if(!t.includes(`.`))return``;let n=t.split(`.`).filter(Boolean),r=n[n.length-pd(n)-1]||n[0];return r?r.charAt(0).toUpperCase()+r.slice(1):``}function hd(e){let t=fd(e);if(!t)return``;try{if(!new URL(t).hostname.includes(`.`))return``}catch{return``}return`${t}/favicon.ico`}function gd(e){let t=String(e||``).trim().toLowerCase().replace(/\.$/,``);if(!t||!t.includes(`.`)||/^\d+(\.\d+){3}$/.test(t))return t;let n=t.split(`.`).filter(Boolean);return n.length<=2?n.join(`.`):n.slice(-(pd(n)+1)).join(`.`)}function _d(e){return dd(e).replace(/\.$/,``).replace(/^www\./,``)}function vd({draft:e,scheduleAutoSave:t,isDisposed:n}){let r=H(!1),i=new Map;function a(t){for(let n of e.categories){let e=n.engines.find(e=>e._id===t);if(e)return e}return null}function o(e){let t=(i.get(e)||0)+1;return i.set(e,t),t}async function s(e,n,r){if(!/^https?:\/\//i.test(n))return;let{data:o,reason:s}=await lu(n);if(i.get(e)!==r)return;let c=a(e);c&&c.favicon===n&&(o?(c.faviconData=o,t()):console.warn(`[SEJ] 后台获取图标失败:`,n,s||$(`favicon.backgroundFailed`)))}function c(e,t){let n=o(e._id);e.faviconData||s(e._id,t,n)}function l(e){let t=fd(e),n=X.iconSource,r=isNaN(n)?n:``;return!r&&!t?``:(r||t+`/favicon.ico`).replace(`%s`,t)}function u(){let t=[];for(let n of e.categories)for(let e of n.engines)!e.faviconData&&/^https?:\/\//i.test(e.favicon||``)&&t.push(e);return t}async function d(){let e=u(),t=0,n=0,r=async()=>{for(;e.length;){let r=e.shift(),i=r.favicon,a=await uu(i);a===i?n++:(r.faviconData=a,t++)}},i=Array.from({length:Math.min(6,e.length)},()=>r());return await Promise.all(i),{converted:t,failed:n}}async function f(){if(!r.value&&u().length){r.value=!0;try{let{converted:e,failed:r}=await d();if(n()||!e)return;t();let i=[$(`toast.embeddedIcons`,{count:e})];r&&i.push($(`toast.iconsFailed`,{count:r})),Z(`${i.join($(`toast.listSeparator`))}${$(`toast.autoSavedSuffix`)}`,4e3)}finally{r.value=!1}}}return{loadingIcons:r,getICON:l,refreshIconInBackground:c,loadAllIcons:f}}var yd=5e3;function bd({draft:e,scheduleAutoSave:t,isDialogOpen:n,closeCategoryDialog:r}){let i=[];function a(e){return e?nl(e.name,e.key):``}function o(e){i.push(e),i.length>20&&i.shift()}function s(){return i.length>0}function c(){if(n()){Z($(`toast.dialogOpen`));return}let a=i.pop();if(a){if(a.type===`category`){let t=Math.min(a.index,e.categories.length);e.categories.splice(t,0,a.item)}else{let t=e.categories.find(e=>e.key===a.categoryKey);if(!t){i.push(a),Z($(`toast.categoryMissing`));return}let n=Math.min(a.index,t.engines.length);t.engines.splice(n,0,a.item)}r(),t(),Z($(`toast.undoDelete`,{label:a.label}))}}function l(e,t){o({...e,label:t}),Z($(`toast.deleted`,{label:t}),yd,{label:$(`common.undo`),onClick:c})}function u(n){let r=e.categories[n];r&&(l({type:`category`,index:n,item:yc(r)},$(`category.label`,{name:a(r)})),e.categories.splice(n,1),t())}function d(n,r){let i=e.categories[n],a=i?.engines?.[r];a&&(l({type:`engine`,categoryKey:i.key,index:r,item:yc(a)},$(`engine.label`,{name:rl(a.name)})),i.engines.splice(r,1),t())}return{deleteCategory:u,deleteEngine:d,undoDelete:c,canUndo:s}}function xd({draft:e,nextId:t,categoryDialog:n,engineDialog:r,engineSaving:i,scheduleAutoSave:a,deleteCategory:o,deleteEngine:s,refreshIconInBackground:c,consumeClickSuppression:l}){function u(e){l()||(n.value={index:e})}function d(t){let r=n.value;if(!r)return;let i=e.categories[r.index];if(i){let e=t||$(`category.emptyName`);i.name!==e&&(i.name=e,a())}n.value=null}function f(){n.value=null}function p(){let e=n.value;e&&(n.value=null,o(e.index))}function m(e){r.value={mode:`add`,ci:e,initial:{}}}function h(t,n){l()||(r.value={mode:`edit`,ci:t,ei:n,initial:{...e.categories[t].engines[n]}})}function g(){i.value||(r.value=null)}function _(){let e=r.value;e&&e.mode===`edit`&&(r.value=null,s(e.ci,e.ei))}async function v(n){let o=r.value;if(o&&!i.value){if(!n.name||!n.url)alert($(`engine.required`));else{i.value=!0;try{let i=e.categories[o.ci].engines,s=o.mode===`edit`?i[o.ei]:null,l=n.favicon,u=/^data:/i.test(n.faviconData||``)?n.faviconData:s?.faviconData&&s.favicon===l?s.faviconData:``,d=o.mode===`add`?{...n,_id:t()}:{...s,...n};d.favicon=l,u&&u!==l?d.faviconData=u:delete d.faviconData,o.mode===`add`?i.push(d):i[o.ei]=d,r.value=null,a(),c(d,l)}finally{i.value=!1}}}}return{openCategoryDialog:u,submitCategory:d,cancelCategoryDialog:f,deleteCategoryFromDialog:p,addEngine:m,editEngine:h,cancelEngineDialog:g,deleteEngineFromDialog:_,submitEngine:v}}function Sd({settings:e}){let t=Fa(()=>e.settingData),n=1,r=()=>n++;function i(){let e=yc(t.value),n={};for(let t of sl)n[t]=e[t];return n.categories=e.engineCategories.map(([t,n,i])=>({_id:r(),name:t,key:n,enabled:!!i,engines:(e.engineList[n]||[]).map(e=>({...e,_id:r()}))})),n}let a=Ft(i());function o(e=a.categories){return dl({options:a,categories:e,version:t.value.version})}function s(){let e=i();for(let t of sl)a[t]=e[t];a.categories.splice(0,a.categories.length,...e.categories)}function c(e){return e?nl(e.name,e.key):``}function l(e){let t=a.categories[e];return t.enabled=!t.enabled,t.enabled}function u(e,t){let n=a.categories[e].engines[t];return n.disable=!n.disable,!n.disable}function d(){let e=`user`+Date.now(),t=e,n=1;for(;a.categories.some(e=>e.key===t);)t=`${e}-${n++}`;return t}function f(e){let t={_id:r(),name:e,key:d(),enabled:!0,engines:[]};return a.categories.push(t),t}return{source:t,draft:a,nextId:r,buildResult:o,refreshDraft:s,displayCategoryName:c,toggleCategory:l,toggleEngine:u,appendCategory:f}}function Cd({settings:e,source:t,buildResult:n,refreshDraft:r,saving:i,remoteSynced:a,isOverlayOpen:o,cancelAutoSave:s,closeOverlays:c}){function l(){if(i.value)return;let s=!Lc(n(),t.value);o()||s?Z($(`toast.remoteConflict`),6e3,{label:$(`toast.syncAction`),onClick:u}):e.reload()&&(r(),a.value=!0,Z($(`toast.synced`),3e3))}function u(){c(),s(),e.reload(),r(),a.value=!0,Z($(`toast.synced`),3e3)}return Ln(()=>X.settingsRevision,l),{trySyncFromRemote:l,forceSyncFromRemote:u}}var wd=`#settingLayerMask {
  display: none;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0;
  background-color: rgba(16, 18, 22, 0.42);
  backdrop-filter: blur(12px);
  z-index: 200000000;
  overflow: auto;
  font-family: var(--sej-font-family);
  min-height: 100%;
  font-size: 14px;
  transition: opacity 0.15s ease-out;
  opacity: 0;
  animation: sej-setting-mask-in 0.15s ease;
  user-select: none;
  -moz-user-select: none;
  touch-action: manipulation;
  padding: 20px;
  box-sizing: border-box;
  color: var(--font-color-qxin);
}

#settingLayer {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  --sej-panel-pad-x: 20px;
  --sej-panel-pad-top: 16px;
  padding: var(--sej-panel-pad-top) var(--sej-panel-pad-x) 16px;
  background-color: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 16px;
  box-shadow: var(--sej-panel-shadow);
  position: absolute;
  width: auto;
  min-width: min(720px, calc(100vw - 32px));
  max-width: min(960px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  margin: 0;
  overflow: visible;
  animation: sej-panel-in 0.16s ease-out;
}

@keyframes sej-panel-in {
  from {
    opacity: 0;
    transform: translateY(6px) scale(0.99);
  }
}

.sej-panel-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex: 0 0 auto;
  padding: 0 2px 12px;
  cursor: move;
  /* 触屏拖动标题栏时不要触发页面滚动/长按菜单 */
  touch-action: none;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}

.sej-panel-title {
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.sej-panel-close {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: var(--sej-surface-hover);
  color: transparent;
  font-size: 0;
  line-height: 0;
  cursor: pointer;
  opacity: 1;
  transition:
    background-color 0.12s ease-out,
    opacity 0.12s ease-out,
    transform 0.1s ease-out;
}

.sej-panel-close::before,
.sej-panel-close::after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  width: 12px;
  height: 1.5px;
  border-radius: 2px;
  background: var(--font-color-qxin);
  transform: translate(-50%, -50%) rotate(45deg);
}

.sej-panel-close::after {
  transform: translate(-50%, -50%) rotate(-45deg);
}

.sej-panel-close:hover {
  background: var(--sej-active-bg);
}

.sej-panel-close:active {
  transform: scale(0.92);
  opacity: 0.75;
}

.iqxin-items {
  display: flex;
  flex-direction: column;
  flex: 0 0 220px;
  width: 220px;
  min-width: 0;
  max-width: 220px;
  box-sizing: border-box;
  margin: 0;
  padding: 6px;
  border-radius: 12px;
  border: 1px solid var(--border-color-sej);
  background: var(--sej-surface-2);
}

.sej-add-category-card {
  align-items: center;
  justify-content: center;
  min-height: 140px;
  background: transparent;
  border: 1px dashed var(--sej-checkbox-border);
  color: var(--font-color-qxin);
  cursor: pointer;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-add-category-card:hover {
  background: var(--sej-surface-hover);
  border-color: var(--sej-accent);
  color: var(--sej-accent);
}

.sej-add-category-card:focus-visible {
  background: var(--sej-surface-hover);
  outline: 2px solid var(--sej-accent);
  outline-offset: 2px;
}

.sej-add-category-plus {
  font-size: 42px;
  font-weight: 300;
  line-height: 1;
  opacity: 0.45;
  transition: opacity 0.12s ease-out;
}

.sej-add-category-card:hover .sej-add-category-plus {
  opacity: 1;
}

.sejcon {
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
}

.sejcon > .drag {
  flex: 0 0 auto;
}

#settingLayer .drag {
  display: block;
  position: relative;
  /* 触屏：tap 立即响应；长按由脚本接管拖动，禁用原生长按菜单 */
  touch-action: manipulation;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  user-select: none;
}
/* 列表滚动容器：内容可能很长，滚动条贴住面板内边缘 */
#sej-settings-body {
  display: flex;
  flex: 1 1 auto;
  flex-wrap: wrap;
  align-content: flex-start;
  gap: 10px;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  /* 让滚动条贴住面板内边缘，而不是停在内容区的内边距处 */
  margin-top: 0;
  margin-right: calc(var(--sej-panel-pad-x) * -1);
  padding-top: 2px;
  padding-right: var(--sej-panel-pad-x);
  padding-bottom: 4px;
}

#sej-settings-body::-webkit-scrollbar {
  width: 8px;
}

#sej-settings-body::-webkit-scrollbar-thumb {
  background: var(--sej-surface-hover);
  border-radius: 4px;
}

/* 拖动排序：源元素隐藏但保留占位，目标位置只空出空白 */
#settingLayer .sej-drag-placeholder,
#settingLayer .sej-drag-placeholder * {
  visibility: hidden !important;
}

#settingLayer .sejtitle:active,
#settingLayer .sejcon > .drag:active {
  cursor: grabbing;
}

.sej-drag-ghost {
  position: fixed !important;
  left: 0 !important;
  top: 0 !important;
  margin: 0 !important;
  z-index: 200000200;
  opacity: 1 !important;
  pointer-events: none;
  box-sizing: border-box;
  overflow: hidden;
  will-change: transform;
}

.sej-drag-ghost * {
  pointer-events: none !important;
}

.sej-drag-ghost-engine {
  border-radius: 8px;
  background: var(--background-setting-qxin);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.28);
}

.sej-drag-ghost-category {
  border: 1px solid var(--border-color-sej);
  border-radius: 12px;
  background: var(--background-setting-qxin);
  box-shadow: 0 16px 40px rgba(0, 0, 0, 0.3);
}

#settingLayer .sej-engine {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 0 82px 0 8px;
  width: 100%;
  height: 30px;
  box-sizing: border-box;
  border-radius: 8px;
  font-family: var(--sej-font-family);
  font-size: 13px;
  color: var(--font-color-qxin);
  text-decoration: none;
  white-space: nowrap;
  transition:
    background-color 0.08s ease-out,
    opacity 0.08s ease-out;
  cursor: pointer;
}

#settingLayer .sej-engine > span {
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sejtitle {
  text-align: left;
  /* 左侧与引擎条目对齐，右侧避开编辑/删除/显隐按钮 */
  padding: 5px 82px 5px 8px;
  margin-bottom: 2px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  cursor: pointer;
  position: relative;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.5;
  border-radius: 8px;
}

/* 标题下方的细分隔线，用于和引擎条目区分 */
.sejtitle::after {
  content: '';
  position: absolute;
  left: 8px;
  right: 8px;
  bottom: 0;
  height: 1px;
  background: var(--border-color-sej);
  pointer-events: none;
}

#settingLayerMask [data-xin] {
  margin: 1px 0;
  border-radius: 8px;
}

.sejcon [data-xin] {
  cursor: pointer;
}

/* 隐藏的条目：灰暗弱化，不抢眼，也不使用删除线 */
#settingLayerMask [data-iqxindisabled='true'],
[data-xin^='-'] {
  background-color: transparent;
  color: var(--font-color-qxin);
  transition: background-color 0.12s ease-out;
}

#settingLayerMask [data-iqxindisabled='true'] > span,
#settingLayerMask [data-iqxindisabled='true'] .sej-engine-icon,
[data-xin^='-'] > .iqxin-pointer-events {
  opacity: 0.4;
  filter: grayscale(1);
}

/* 隐藏的分类：分类标题下的所有引擎一并灰暗，操作按钮保持可辨识 */
.sej-category-hidden .sej-engine > span,
.sej-category-hidden .sej-engine .sej-engine-icon,
.sej-category-hidden .iqxin-additem {
  opacity: 0.4;
  filter: grayscale(1);
}

#settingLayerMask .sej-engine:hover {
  background-color: var(--sej-surface-hover);
}

#settingLayerMask [data-iqxindisabled='true']:hover,
[data-xin^='-']:hover {
  background-color: transparent;
}

.sej-category-hidden .sej-engine:hover {
  background-color: transparent;
}

#settingLayerMask label {
  cursor: pointer;
}

#settingLayerMask .sej-engine-icon {
  vertical-align: middle;
}

/* 窄屏下类别卡片占满可用宽度 */
@media (max-width: 560px) {
  .iqxin-items {
    flex: 1 1 160px;
    width: auto;
    max-width: none;
  }
}

.iqxin-pointer-events,
#settingLayer .sej-engine * {
  pointer-events: none;
}
#btnEle {
  position: relative;
  width: 100%;
  margin-top: 10px;
  background: transparent;
  border-radius: 0;
  flex: 0 0 auto;
}

#btnEle span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  box-sizing: border-box;
  min-height: 30px;
  background: var(--sej-surface-2);
  border: 1px solid transparent;
  margin: 0;
  color: var(--font-color-qxin);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out,
    opacity 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle label {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: inherit;
}

#btnEle .sej-language-select {
  appearance: none;
  -webkit-appearance: none;
  border: 1px solid var(--border-color-sej);
  border-radius: 6px;
  background: var(--sej-input-bg);
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
  padding: 2px 4px;
  margin-left: 2px;
  cursor: pointer;
  outline: none;
}

#btnEle .sej-language-select:focus-visible {
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

#btnEle span:hover {
  background: var(--sej-surface-hover);
  color: var(--font-color-qxin);
}

#btnEle a {
  color: var(--font-color-qxin);
  opacity: 0.7;
  text-decoration: none;
  font-family: inherit;
  transition:
    opacity 0.12s ease-out,
    color 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle a:hover {
  opacity: 1;
  color: var(--sej-accent);
}

#btnEle span:active,
#btnEle a:active {
  transform: scale(0.96);
  opacity: 0.8;
}

#btnEle .feedback {
  background: transparent;
  border-color: transparent;
  padding: 4px 6px;
}

#btnEle .feedback:hover {
  background: transparent;
  border-color: transparent;
  color: var(--sej-accent);
}

#btnEle > div {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;
  box-sizing: border-box;
}

#btnEle > div.btnEleLayer {
  flex-direction: column;
  flex-wrap: nowrap;
  align-items: stretch;
  background: transparent;
  border-radius: 0;
  border-top: 1px solid var(--border-color-sej);
  padding-top: 12px;
  gap: 8px;
}

.sej-footer-options,
.sej-footer-bar,
.sej-footer-selects,
.sej-footer-links,
.sej-footer-actions {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  min-width: 0;
}

.sej-footer-options {
  gap: 8px;
}

.sej-footer-bar {
  gap: 8px 12px;
}

.sej-footer-selects {
  gap: 8px;
}

/* 配置文件：齿轮入口与导入/导出合并为同一个容器 */
#btnEle .sej-config-box {
  display: inline-flex;
  align-items: center;
  min-height: 30px;
  background: var(--sej-surface-2);
  border: 1px solid transparent;
  border-radius: 8px;
  overflow: hidden;
}

#btnEle .sej-config-box button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 30px;
  margin: 0;
  padding: 4px 9px;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  line-height: 1.3;
  white-space: nowrap;
  cursor: pointer;
  outline: none;
  transition:
    background-color 0.12s ease-out,
    color 0.12s ease-out,
    transform 0.1s ease-out;
}

#btnEle .sej-config-box .sej-config-open {
  padding-left: 10px;
}

#btnEle .sej-config-box button:hover {
  background: var(--sej-surface-hover);
  color: var(--font-color-qxin);
}

#btnEle .sej-config-box button:active {
  transform: scale(0.96);
}

#btnEle .sej-config-box button:focus-visible {
  outline: 2px solid var(--sej-accent);
  outline-offset: -2px;
}

#btnEle .sej-config-box svg {
  flex: 0 0 auto;
}

#btnEle span.sej-config-sep {
  flex: 0 0 auto;
  width: 1px;
  height: 16px;
  min-height: 16px;
  margin: 0;
  padding: 0;
  border: 0;
  border-radius: 0;
  background: var(--border-color-sej);
  pointer-events: none;
}

.sej-footer-links {
  gap: 0;
  margin-left: auto;
}

.sej-footer-actions {
  margin-left: 4px;
}

/* 底栏不参与内容区伸缩，并在窄屏下收紧 */
#settingLayer #btnEle {
  flex: 0 0 auto;
}

@media (max-width: 780px) {
  #btnEle span {
    font-size: 12px;
    padding: 5px 8px;
  }
  #btnEle .sej-config-box button {
    font-size: 12px;
    padding: 5px 7px;
  }
  #btnEle .sej-config-box .sej-config-open {
    padding-left: 8px;
  }
  #settingLayer {
    --sej-panel-pad-x: 12px;
    min-width: calc(100vw - 16px);
    max-width: calc(100vw - 16px);
    max-height: calc(100vh - 16px);
  }
}
#btnEle #xin-save {
  position: relative;
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  font-weight: 600;
}

#btnEle #xin-save:hover {
  background: var(--sej-accent);
  color: var(--sej-accent-contrast);
  opacity: 0.85;
}

#btnEle #xin-save.sej-saving {
  cursor: progress;
  opacity: 0.6;
  pointer-events: none;
}

#settingLayerMask input[type='checkbox'],
#settingLayerMask input[type='radio'] {
  appearance: none;
  -webkit-appearance: none;
  width: 16px;
  height: 16px;
  display: inline-block;
  box-sizing: border-box;
  vertical-align: -3px;
  margin: 0 !important;
  padding: 0;
  position: relative;
  border: 1.5px solid var(--sej-checkbox-border);
  border-radius: 5px;
  background: var(--sej-input-bg);
  cursor: pointer;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out;
}

#settingLayerMask input[type='checkbox']:before,
#settingLayerMask input[type='radio']:before {
  content: none;
}

#settingLayerMask input[type='checkbox']:checked,
#settingLayerMask input[type='radio']:checked {
  background: var(--sej-accent);
  border-color: var(--sej-accent);
}

#settingLayerMask input[type='checkbox']:checked:after,
#settingLayerMask input[type='radio']:checked:after {
  content: '';
  position: absolute;
  left: 4px;
  top: 1px;
  width: 4px;
  height: 8px;
  border: solid var(--sej-accent-contrast);
  border-width: 0 2px 2px 0;
  background: none;
  transform: rotate(45deg);
}

.iqxin-set-toggle {
  opacity: 0.6;
  position: absolute;
  background: transparent;
  /* 用上下外边距 auto 垂直居中，避免 transform 让按钮单独成为合成层 */
  top: 0;
  bottom: 0;
  height: fit-content;
  margin-top: auto;
  margin-bottom: auto;
  padding: 3px;
  border-radius: 6px;
  cursor: pointer;
  transition:
    opacity 0.12s ease-out,
    background-color 0.12s ease-out,
    color 0.12s ease-out;
  right: 6px;
  display: inline-flex;
  align-items: center;
  color: var(--font-color-qxin);
}

.iqxin-set-toggle svg {
  display: block;
}

.iqxin-set-toggle.iqxin-set-hidden {
  opacity: 0.35;
}

.iqxin-set-toggle:hover {
  opacity: 1;
  background: var(--sej-surface-hover);
}

/* 悬浮操作：右侧依次为编辑、删除、显隐按钮 */
.sej-hover-edit,
.sej-hover-delete {
  position: absolute;
  display: inline-flex;
  align-items: center;
  color: var(--font-color-qxin);
  opacity: 0;
  pointer-events: none;
  transition:
    opacity 0.12s ease-out,
    background-color 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-hover-edit {
  top: 0;
  bottom: 0;
  right: 54px;
  height: fit-content;
  margin: auto 0;
  padding: 3px;
  border-radius: 6px;
}

.sej-hover-delete {
  top: 0;
  bottom: 0;
  right: 30px;
  height: fit-content;
  margin: auto 0;
  padding: 3px;
  border-radius: 6px;
  cursor: pointer;
}

.sej-hover-edit svg,
.sej-hover-delete svg {
  display: block;
}

.sejtitle:hover .sej-hover-edit,
#settingLayer .sejcon > .drag:hover > .sej-hover-edit {
  opacity: 0.6;
}

.sejtitle:hover .sej-hover-delete,
#settingLayer .sejcon > .drag:hover > .sej-hover-delete {
  opacity: 0.6;
  pointer-events: auto;
}

.sejtitle:hover .sej-hover-edit:hover,
#settingLayer .sejcon > .drag:hover > .sej-hover-edit:hover {
  opacity: 1;
  background: var(--sej-surface-hover);
}

.sej-hover-delete:hover {
  opacity: 1;
  background: var(--sej-danger-weak, rgba(220, 53, 69, 0.12));
  color: var(--sej-danger, #dc3545);
}

span.iqxin-additem {
  display: inline-block;
  position: relative;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  margin: auto 0 2px;
  padding: 5px 0;
  border: 1px dashed currentColor;
  border-radius: 8px;
  color: var(--font-color-qxin);
  opacity: 0.55;
  cursor: pointer;
  visibility: visible;
  transition:
    opacity 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

span.iqxin-additem:hover {
  opacity: 1;
  border-color: var(--sej-accent);
  color: var(--sej-accent);
}

span.iqxin-additem.sej-copy-target {
  opacity: 1;
  border-style: solid;
  border-color: var(--sej-accent);
  background: var(--sej-accent-weak);
  color: var(--sej-accent);
}

.sej-copy-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  vertical-align: middle;
  line-height: 1;
}

.sej-copy-icon svg {
  display: block;
  width: 14px;
  height: 14px;
}

.sej-copy-hint {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 6px);
  transform: translateX(-50%);
  z-index: 5;
  padding: 3px 8px;
  border-radius: 6px;
  background: rgba(20, 22, 26, 0.82);
  color: #fff;
  font-size: 12px;
  line-height: 1.5;
  white-space: nowrap;
  pointer-events: none;
}

@keyframes sej-setting-mask-in {
  from {
    opacity: 0;
  }
}
/* ---------- 弹窗：引擎/分类编辑、配置编辑器 ---------- */

#newSearchBox,
.sej-dialog-box {
  position: fixed;
  z-index: 200000100;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(400px, calc(100vw - 32px));
  box-sizing: border-box;
  padding: 20px;
  background: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 14px;
  box-shadow: var(--sej-shadow-menu);
  color: var(--font-color-qxin);
  margin: 0;
  transition:
    opacity 0.14s ease-out,
    transform 0.14s ease-out;
}

.sej-dialog-title {
  font-size: 15px;
  font-weight: 600;
  margin-bottom: 16px;
}

.sej-field {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 12px;
  font-size: 12px;
}

.sej-field > span {
  opacity: 0.65;
}

.sej-field-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

.sej-field-row input {
  flex: 1 1 0;
  width: auto;
  min-width: 0;
}

.sej-file-input {
  display: none;
}

.sej-dialog-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 8px;
  margin-top: 16px;
}

#newSearchBox input,
.sej-dialog-box input {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border-color-sej);
  padding: 7px 9px;
  border-radius: 8px;
  outline: none;
  color: var(--font-color-qxin);
  background: var(--sej-input-bg);
  font-family: inherit;
  font-size: 13px;
  transition:
    border-color 0.12s ease-out,
    box-shadow 0.12s ease-out;
}

#newSearchBox input:focus,
.sej-dialog-box input:focus {
  background: var(--sej-input-bg);
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

.addItemBoxBtn {
  cursor: pointer;
  background: var(--sej-btn-bg);
  border: 1px solid var(--border-color-sej);
  border-radius: 8px;
  padding: 6px 14px;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

.addItemBoxBtn:hover {
  background: var(--sej-surface-hover);
}

.sej-dialog-danger {
  margin-right: auto;
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

/* 单独占据操作栏左侧，其余按钮保持右对齐 */
.sej-dialog-left {
  margin-right: auto;
}

.sej-dialog-danger:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

.iqxin-closeBtn,
.iqxin-enterBtn {
  box-sizing: border-box;
}

.iqxin-enterBtn {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  font-weight: 600;
}

.iqxin-enterBtn:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.85;
}

.iqxin-closeBtn:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}
`,Td={pending:`engine.stepPending`,loading:`engine.stepLoading`,ok:`engine.stepOk`,failed:`engine.stepFailed`,canceled:`engine.stepCanceled`};function Ed({form:e,siteHost:t,initialFavicon:n,initialFaviconData:r,isBusy:i}){let a=H(``),o=H(``),s=H(!1),c=H(!1),l=H([]),u=new Map,d=0,f=H(!1),p=0,m=H(null),h=Fa(()=>a.value.trim()),g=Fa(()=>/^data:image\//i.test(h.value)),_=Fa(()=>!!t.value||/^(https?:\/\/|data:)/i.test(e.favicon.trim())),v=Fa(()=>s.value?$(`engine.cancelFetch`):c.value||g.value?$(`engine.refetch`):$(`engine.fetchIcon`)),y=Fa(()=>{let e=t.value;return e?`https://convertico.com/favicon-extractor/?url=`+encodeURIComponent(e):``});function b(){l.value=[]}function x(e,t){a.value=e,o.value=e&&t||``,f.value=!1}function S(e){a.value=e,o.value=e?`manual`:``,f.value=!!e}function C(){f.value=!0,o.value=a.value.trim()?`manual`:``}Ln(()=>e.favicon,e=>{if(p>0)return;d++;let t=e.trim();s.value=!1,c.value=!1,!f.value&&(/^data:/i.test(t)?x(t,t):u.has(t)?x(u.get(t),t):t===n&&r&&x(r,t))},{immediate:!0});function w(){d++,s.value=!1,c.value=!0,l.value.forEach(e=>{(e.status===`loading`||e.status===`pending`)&&(e.status=`canceled`)})}async function T(t,n){t.status=`ok`,u.set(t.url,n),e.favicon.trim()!==t.url&&(p++,e.favicon=t.url,await gn(),p--),x(n,t.url)}async function E(e){!i()&&e.status===`ok`&&e.data&&e.url!==o.value&&await T(e,e.data)}async function D(){if(i())return;if(s.value){w();return}let n=e.favicon.trim();if(/^data:/i.test(n)){x(n,n),c.value=!1,b();return}let r=[],a=e=>{e&&!r.some(t=>t.url===e)&&r.push({url:e})};/^https?:\/\//i.test(n)&&a(n);let o=t.value;if(o){let e=gd(o);e!==o&&a(hd(e)),a(`https://a.favicon.im/${o}`),e!==o&&a(`https://a.favicon.im/${e}`)}if(!r.length)return;let f=++d;c.value=!1,s.value=!0,l.value=r.map(e=>({...e,status:`pending`,data:``}));let p=!1;await Promise.all(l.value.map(async e=>{if(u.has(e.url))e.data=u.get(e.url),e.status=`ok`;else{e.status=`loading`;let{data:t,reason:n}=await lu(e.url);if(f!==d)return;if(t)e.data=t,e.status=`ok`,u.set(e.url,t);else{e.reason=n,e.status=`failed`;return}}p||(p=!0,await T(e,e.data))})),f===d&&(s.value=!1,c.value=!l.value.some(e=>e.status===`ok`))}function O(){m.value?.click()}function k(e){let t=e.target.files?.[0];if(e.target.value=``,!t)return;if(!(t.type.startsWith(`image/`)||/\.(ico|png|jpe?g|gif|webp|svg|bmp|avif)$/i.test(t.name))){alert($(`engine.selectImage`));return}let n=new FileReader;n.onload=()=>{d++,s.value=!1,c.value=!1,b(),S(String(n.result||``))},n.onerror=()=>alert($(`engine.readImageFailed`)),n.readAsDataURL(t)}function A(e){let t=a.value.trim();return t&&(f.value||o.value===e||/^data:/i.test(e))?t:``}return Cr(()=>{d++}),{faviconFileInput:m,previewData:a,previewUrl:o,previewLoading:s,previewFailed:c,previewSteps:l,dataIconLink:h,previewImage:g,canPreview:_,previewLabel:v,extractorUrl:y,STEP_STATUS_TEXT:Td,clearSteps:b,markDataEdited:C,chooseStep:E,previewIcon:D,pickFaviconFile:O,uploadFavicon:k,resolveFaviconData:A}}var Dd=`.sej-icon-preview-btn {
  flex: 0 0 auto;
  padding: 7px 12px;
  border: 1px solid var(--border-color-sej);
  border-radius: 8px;
  background: var(--sej-btn-bg);
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 12px;
  line-height: 1.4;
  cursor: pointer;
  transition:
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-icon-preview-btn:hover:not(:disabled) {
  border-color: var(--sej-accent);
  color: var(--sej-accent);
}

.sej-icon-preview-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 已有图标时按钮只显示缩略图 */
.sej-icon-preview-btn.sej-has-icon {
  box-sizing: border-box;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
}

.sej-icon-preview {
  flex: 0 0 auto;
  width: 20px;
  height: 20px;
  object-fit: contain;
  background: var(--sej-surface-hover);
}

.sej-data-line {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.sej-data-line input {
  flex: 1 1 0;
  width: auto;
  min-width: 0;
}

/* 图标获取来源列表 */
.sej-preview-steps {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 6px 8px;
  border-radius: 8px;
  background: var(--sej-surface-2);
  font-size: 12px;
}

.sej-preview-step {
  display: flex;
  align-items: center;
  gap: 6px;
  line-height: 18px;
  color: var(--font-color-qxin);
  border-radius: 4px;
}

/* 有多条成功来源时整行可点击切换，当前采用的来源高亮 */
.sej-preview-step.is-selectable {
  cursor: pointer;
}

.sej-preview-step.is-selectable:hover,
.sej-preview-step.is-active {
  background: var(--sej-surface-hover);
}

.sej-preview-step.is-selectable:focus-visible {
  outline: 2px solid var(--sej-accent);
  outline-offset: -2px;
}

/* 成功来源显示实际图标缩略图，替换默认的状态圆点 */
.sej-preview-thumb {
  flex: 0 0 auto;
  width: 16px;
  height: 16px;
  object-fit: contain;
}

.sej-preview-dot {
  flex: 0 0 auto;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--sej-checkbox-border);
}

.sej-preview-step.is-loading .sej-preview-dot {
  background: var(--sej-accent);
}

.sej-preview-step.is-ok .sej-preview-dot {
  background: #34a853;
}

.sej-preview-step.is-failed .sej-preview-dot {
  background: var(--sej-danger);
}

.sej-preview-step.is-failed,
.sej-preview-step.is-pending,
.sej-preview-step.is-canceled {
  opacity: 0.6;
}

.sej-preview-url {
  flex: 1 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.sej-preview-state {
  flex: 0 0 auto;
  opacity: 0.7;
}

.sej-preview-state.sej-preview-icon {
  display: inline-flex;
  align-items: center;
  opacity: 0.45;
  transition:
    opacity 0.12s ease-out,
    color 0.12s ease-out;
}

.sej-preview-icon svg {
  display: block;
}

/* 未选用：空心圆勾，悬停时提示可点击 */
.sej-preview-step.is-selectable:hover .sej-preview-icon {
  color: var(--sej-accent);
  opacity: 1;
}

/* 已选用：实心圆勾，与未选用状态区分明显 */
.sej-preview-icon.is-selected {
  color: var(--sej-accent);
  opacity: 1;
}

.sej-preview-icon.is-selected svg circle {
  fill: currentColor;
}

.sej-preview-icon.is-selected svg path {
  stroke: var(--sej-accent-contrast);
}

.sej-preview-extractor {
  align-self: flex-start;
  margin-top: 2px;
  color: var(--sej-accent);
  font-size: 12px;
  text-decoration: none;
}

.sej-preview-extractor:hover {
  text-decoration: underline;
}

#newSearchBox #iqxin-newTarget {
  width: 100%;
  border-radius: 8px;
  border: 1px solid var(--border-color-sej);
  padding: 7px 9px;
  background: var(--sej-input-bg);
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  outline: none;
}
`,Od={id:`sej-engine-title`,class:`sej-dialog-title`},kd={class:`sej-field`},Ad=[`placeholder`,`disabled`],jd={class:`sej-field`},Md=[`placeholder`,`disabled`],Nd={class:`sej-field`},Pd={class:`sej-field-row`},Fd=[`placeholder`,`disabled`],Id=[`disabled`],Ld={key:0,class:`sej-preview-steps`},Rd=[`title`,`role`,`tabindex`,`onClick`,`onKeydown`],zd=[`src`],Bd={key:1,class:`sej-preview-dot`},Vd={class:`sej-preview-url`},Hd={key:2,class:`sej-preview-state`},Ud=[`title`],Wd={key:4,class:`sej-preview-state`},Gd=[`href`],Kd={class:`sej-field`},qd={class:`sej-data-line`},Jd=[`placeholder`,`disabled`],Yd=[`disabled`,`title`],Xd=[`src`],Zd={class:`sej-field`},Qd=[`disabled`],$d={value:`_blank`},ef={value:`_self`},tf={class:`sej-dialog-actions`},nf=[`disabled`],rf=[`disabled`],af=[`disabled`],of=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="m8 12 3 3 5-6"/></svg>`,sf={__name:`EngineEditDialog`,props:{mode:{type:String,default:`add`},initial:{type:Object,default:()=>({})},resolveIcon:{type:Function,required:!0},busy:{type:Boolean,default:!1}},emits:[`submit`,`cancel`,`delete`],setup(e,{emit:t}){bs(Dd);let n=e,r=t,i=Ft({name:n.initial.name||``,url:n.initial.url||``,favicon:n.initial.favicon||``,target:n.initial.target===`_self`?`_self`:`_blank`}),a=H(null),o=H(null);rd({containerEl:o,initialFocus:a,onClose:()=>{n.busy||r(`cancel`)}});let s=(n.initial.favicon||``).trim(),{faviconFileInput:c,previewData:l,previewUrl:u,previewLoading:d,previewSteps:f,dataIconLink:p,previewImage:m,canPreview:h,previewLabel:g,extractorUrl:_,STEP_STATUS_TEXT:v,clearSteps:y,markDataEdited:b,chooseStep:x,previewIcon:S,pickFaviconFile:C,uploadFavicon:w,resolveFaviconData:T}=Ed({form:i,siteHost:Fa(()=>_d(i.url)||_d(i.favicon)),initialFavicon:s,initialFaviconData:n.initial.faviconData,isBusy:()=>n.busy}),E=H(!!(n.initial.name||``).trim()),D=H(!!(n.initial.favicon||``).trim());function O(){E.value=!0}function k(){D.value=!0,y()}Ln(()=>i.url,()=>{E.value&&i.name.trim()||(i.name=md(i.url)),D.value&&i.favicon.trim()||(i.favicon=hd(i.url)),y()}),br(()=>a.value?.focus());function A(){if(n.busy)return;let e=ud(i.url),t=i.favicon.trim()||n.resolveIcon(i.url);r(`submit`,{name:i.name,url:e,favicon:t,faviconData:T(t),target:i.target})}return(t,n)=>(G(),K(`div`,{id:`newSearchBox`,ref_key:`rootEl`,ref:o,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`sej-engine-title`},[q(`div`,Od,L(e.mode===`edit`?U($)(`engine.editTitle`):U($)(`engine.addTitle`)),1),q(`label`,kd,[q(`span`,null,L(U($)(`engine.url`)),1),jn(q(`input`,{ref_key:`urlInput`,ref:a,"onUpdate:modelValue":n[0]||=e=>i.url=e,placeholder:U($)(`common.required`),disabled:e.busy},null,8,Ad),[[jo,i.url]])]),q(`label`,jd,[q(`span`,null,L(U($)(`engine.name`)),1),jn(q(`input`,{"onUpdate:modelValue":n[1]||=e=>i.name=e,placeholder:U($)(`common.required`),disabled:e.busy,onInput:O},null,40,Md),[[jo,i.name]])]),q(`div`,Nd,[q(`span`,null,L(U($)(`engine.iconSrc`)),1),q(`div`,Pd,[jn(q(`input`,{"onUpdate:modelValue":n[2]||=e=>i.favicon=e,placeholder:U($)(`common.optional`),disabled:e.busy,onInput:k},null,40,Fd),[[jo,i.favicon]]),q(`button`,{type:`button`,class:`sej-icon-preview-btn`,disabled:e.busy||!U(d)&&!U(h),onClick:n[3]||=(...e)=>U(S)&&U(S)(...e)},L(U(g)),9,Id)]),U(f).length?(G(),K(`div`,Ld,[(G(!0),K(W,null,Ar(U(f),e=>(G(),K(`div`,{key:e.url,title:e.url,class:I([`sej-preview-step`,[`is-`+e.status,{"is-selectable":e.status===`ok`,"is-active":e.status===`ok`&&e.url===U(u)}]]),role:e.status===`ok`?`button`:void 0,tabindex:e.status===`ok`?0:void 0,onClick:t=>U(x)(e),onKeydown:[Bo(Y(t=>U(x)(e),[`prevent`]),[`enter`]),Bo(Y(t=>U(x)(e),[`prevent`]),[`space`])]},[e.status===`ok`&&e.data?(G(),K(`img`,{key:0,class:`sej-preview-thumb`,src:e.data,alt:``},null,8,zd)):(G(),K(`span`,Bd)),q(`span`,Vd,L(e.url),1),e.status===`failed`&&e.reason?(G(),K(`span`,Hd,L(e.reason),1)):e.status===`ok`?(G(),K(`span`,{key:3,class:I([`sej-preview-state sej-preview-icon`,{"is-selected":e.url===U(u)}]),title:e.url===U(u)?U($)(`engine.stepOk`):U($)(`engine.stepUse`),innerHTML:of},null,10,Ud)):(G(),K(`span`,Wd,L(U($)(U(v)[e.status])),1))],42,Rd))),128)),U(_)?(G(),K(`a`,{key:0,class:`sej-preview-extractor`,href:U(_),target:`_blank`,rel:`noopener`},L(U($)(`engine.tryExtractor`)),9,Gd)):la(``,!0)])):la(``,!0)]),q(`div`,Kd,[q(`span`,null,L(U($)(`engine.iconData`)),1),q(`div`,qd,[jn(q(`input`,{"onUpdate:modelValue":n[4]||=e=>V(l)?l.value=e:null,class:`sej-data-input`,placeholder:U($)(`engine.iconDataPlaceholder`),disabled:e.busy,onInput:n[5]||=(...e)=>U(b)&&U(b)(...e)},null,40,Jd),[[jo,U(l)]]),q(`button`,{type:`button`,class:I([`sej-icon-preview-btn`,{"sej-has-icon":U(m)}]),disabled:e.busy,title:U(m)?U($)(`engine.uploadReplace`):U($)(`engine.upload`),onClick:n[6]||=(...e)=>U(C)&&U(C)(...e)},[U(m)?(G(),K(`img`,{key:0,class:`sej-icon-preview`,src:U(p),alt:``},null,8,Xd)):(G(),K(W,{key:1},[J(L(U($)(`engine.upload`)),1)],64))],10,Yd)]),q(`input`,{ref_key:`faviconFileInput`,ref:c,class:`sej-file-input`,type:`file`,accept:`image/*,.ico`,onChange:n[7]||=(...e)=>U(w)&&U(w)(...e)},null,544)]),q(`label`,Zd,[q(`span`,null,L(U($)(`engine.target`)),1),jn(q(`select`,{id:`iqxin-newTarget`,"onUpdate:modelValue":n[8]||=e=>i.target=e,disabled:e.busy},[q(`option`,$d,L(U($)(`engine.targetBlank`)),1),q(`option`,ef,L(U($)(`engine.targetSelf`)),1)],8,Qd),[[No,i.target]])]),q(`div`,tf,[e.mode===`edit`?(G(),K(`button`,{key:0,type:`button`,class:`addItemBoxBtn sej-dialog-danger`,disabled:e.busy,onClick:n[9]||=e=>t.$emit(`delete`)},L(U($)(`common.delete`)),9,nf)):la(``,!0),q(`button`,{class:`addItemBoxBtn iqxin-closeBtn`,disabled:e.busy,onClick:n[10]||=e=>t.$emit(`cancel`)},L(U($)(`common.cancel`)),9,rf),q(`button`,{class:`addItemBoxBtn iqxin-enterBtn`,disabled:e.busy,onClick:A},L(e.busy?U($)(`engine.fetching`):U($)(`common.confirm`)),9,af)])],512))}},cf={id:`sej-category-title`,class:`sej-dialog-title`},lf={class:`sej-field`},uf=[`placeholder`,`disabled`],df={class:`sej-dialog-actions`},ff=[`disabled`],pf=[`disabled`],mf=[`disabled`],hf={__name:`CategoryEditDialog`,props:{name:{type:String,default:``},busy:{type:Boolean,default:!1}},emits:[`submit`,`delete`,`cancel`],setup(e,{emit:t}){let n=e,r=t,i=H(null),a=H(null),o=H(n.name);rd({containerEl:i,initialFocus:a,onClose:()=>{n.busy||r(`cancel`)}}),br(()=>{a.value?.focus(),a.value?.select()});function s(){n.busy||r(`submit`,o.value.trim())}return(t,n)=>(G(),K(`div`,{id:`sej-categoryBox`,ref_key:`rootEl`,ref:i,class:`sej-dialog-box`,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`sej-category-title`},[q(`div`,cf,L(U($)(`category.title`)),1),q(`label`,lf,[q(`span`,null,L(U($)(`common.name`)),1),jn(q(`input`,{ref_key:`input`,ref:a,"onUpdate:modelValue":n[0]||=e=>o.value=e,placeholder:U($)(`common.required`),disabled:e.busy,onKeydown:Bo(s,[`enter`])},null,40,uf),[[jo,o.value]])]),q(`div`,df,[q(`button`,{type:`button`,class:`addItemBoxBtn sej-dialog-danger`,disabled:e.busy,onClick:n[1]||=e=>t.$emit(`delete`)},L(U($)(`category.delete`)),9,ff),q(`button`,{type:`button`,class:`addItemBoxBtn iqxin-closeBtn`,disabled:e.busy,onClick:n[2]||=e=>t.$emit(`cancel`)},L(U($)(`common.cancel`)),9,pf),q(`button`,{type:`button`,class:`addItemBoxBtn iqxin-enterBtn`,disabled:e.busy,onClick:s},L(U($)(`common.confirm`)),9,mf)])],512))}},gf=[`aria-label`],_f={class:`sej-config-textarea`},vf={class:`sej-dialog-actions`},yf=[`title`],bf={key:1,class:`sej-import-mode`},xf=[`disabled`],Sf={__name:`ConfigEditor`,props:{initialText:{type:String,default:``},defaultText:{type:String,default:``},imported:{type:Object,default:null},mergePreview:{type:Function,default:null}},emits:[`apply`,`cancel`],setup(e,{emit:t}){bs(`
#iqxin-editCodeBox {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 200000100;
  width: min(560px, calc(100vw - 32px));
  max-height: calc(100vh - 48px);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  background: var(--background-setting-qxin);
  border: 1px solid var(--border-color-sej);
  border-radius: 14px;
  box-shadow: var(--sej-shadow-menu);
  color: var(--font-color-qxin);
}

#iqxin-editCodeBox p {
  margin: 0;
}

#iqxin-editCodeBox button {
  cursor: pointer;
  background: var(--sej-btn-bg);
  border: 1px solid var(--border-color-sej);
  border-radius: 8px;
  padding: 6px 14px;
  color: var(--font-color-qxin);
  font-family: inherit;
  font-size: 13px;
  transition:
    background-color 0.12s ease-out,
    border-color 0.12s ease-out,
    color 0.12s ease-out;
}

#iqxin-editCodeBox button:hover {
  background: var(--sej-surface-hover);
}

#iqxin-editCodeBox button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

#iqxin-editCodeBox .iqxin-enterBtn {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
}

#iqxin-editCodeBox .iqxin-enterBtn:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.92;
}

#iqxin-editCodeBox .iqxin-enterBtn:disabled,
#iqxin-editCodeBox .iqxin-enterBtn:disabled:hover {
  background: var(--sej-accent);
  border-color: transparent;
  color: var(--sej-accent-contrast);
  opacity: 0.5;
}

#iqxin-editCodeBox .iqxin-closeBtn:hover {
  background: var(--sej-danger-weak);
  border-color: var(--sej-danger);
  color: var(--sej-danger);
}

/* 导入方式互斥勾选 */
#iqxin-editCodeBox .sej-import-mode {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--font-color-qxin);
  cursor: pointer;
  user-select: none;
}

/* 圆角裁剪滚动条，避免滚动条方角突出到圆角外 */
#iqxin-editCodeBox .sej-config-textarea {
  display: flex;
  flex: 1 1 auto;
  min-height: 240px;
  overflow: hidden;
  border: 1px solid var(--border-color-sej);
  border-radius: 10px;
  background: var(--sej-input-bg);
  transition:
    border-color 0.12s ease-out,
    box-shadow 0.12s ease-out;
}

#iqxin-editCodeBox .sej-config-textarea:focus-within {
  border-color: var(--sej-accent);
  box-shadow: 0 0 0 3px var(--sej-focus-ring);
}

#iqxin-editCodeBox textarea {
  width: 100%;
  box-sizing: border-box;
  flex: 1 1 auto;
  min-height: 0;
  padding: 10px;
  overflow: auto;
  border: 0;
  border-radius: 0;
  background: transparent;
  color: var(--font-color-qxin);
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  font-size: 12px;
  line-height: 1.5;
  resize: none;
  outline: none;
}

#iqxin-editCodeBox textarea::-webkit-resizer,
#iqxin-editCodeBox textarea::-webkit-scrollbar-corner {
  background: transparent;
}

.iqxin-warning {
  color: var(--sej-danger);
  font-size: 14px;
  font-weight: 600;
}
`);let n=e,r=t,i=H(n.initialText),a=H(null),o=H(null);rd({containerEl:a,initialFocus:o,onClose:()=>r(`cancel`)});let s=H(!1),c=H(`merge`);Ln(()=>n.initialText,e=>{s.value||document.activeElement===o.value||(i.value=e)});function l(e=!1){let t=n.mergePreview?.(n.imported,e);return t?(i.value=t,s.value=!0,!0):!1}function u(){i.value=JSON.stringify(n.imported,null,4),s.value=!0}Ln(c,e=>{n.imported&&(e===`merge`?l():u())}),n.imported&&l(!0);function d(){i.value=n.defaultText,s.value=!0}function f(){r(`apply`,i.value)}function p(){r(`cancel`)}return(t,n)=>(G(),K(`div`,{id:`iqxin-editCodeBox`,ref_key:`rootEl`,ref:a,role:`dialog`,"aria-modal":`true`,"aria-label":U($)(`settings.editConfig`)},[q(`p`,null,[n[4]||=q(`span`,{class:`iqxin-warning`},`! ! !`,-1),n[5]||=q(`br`,null,null,-1),J(` `+L(U($)(`config.warningLine1`)),1),n[6]||=q(`br`,null,null,-1),J(` `+L(U($)(`config.warningLine2`)),1)]),q(`div`,_f,[jn(q(`textarea`,{ref_key:`textareaEl`,ref:o,"onUpdate:modelValue":n[0]||=e=>i.value=e,wrap:`off`,cols:`45`,rows:`20`,onInput:n[1]||=e=>s.value=!0},null,544),[[jo,i.value]])]),q(`div`,vf,[q(`button`,{class:`sej-dialog-left`,onClick:d},L(U($)(`config.reset`)),1),e.imported?(G(),K(`label`,{key:0,class:`sej-import-mode`,title:U($)(`config.mergeTip`)},[jn(q(`input`,{type:`radio`,name:`sej-import-mode`,value:`merge`,"onUpdate:modelValue":n[2]||=e=>c.value=e},null,512),[[Mo,c.value]]),J(` `+L(U($)(`config.mergeImport`)),1)],8,yf)):la(``,!0),e.imported?(G(),K(`label`,bf,[jn(q(`input`,{type:`radio`,name:`sej-import-mode`,value:`overwrite`,"onUpdate:modelValue":n[3]||=e=>c.value=e},null,512),[[Mo,c.value]]),J(` `+L(U($)(`config.overwriteImport`)),1)])):la(``,!0),q(`button`,{class:`iqxin-enterBtn`,disabled:!s.value,onClick:f},L(U($)(`common.apply`)),9,xf),q(`button`,{onClick:p},L(U($)(`common.cancel`)),1)])],8,gf))}},Cf=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,wf=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>`,Tf=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/><path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/><path d="M14.12 14.12a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`,Ef=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`,Df=`<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>`,Of=[`id`,`data-sej-drag-el`],kf=[`data-xin`,`data-iqxintitle`,`title`],Af={class:`iqxin-pointer-events`},jf=[`innerHTML`],Mf=[`title`,`innerHTML`],Nf=[`title`,`innerHTML`],Pf=[`data-sej-drag-el`],Ff=[`data-sej-drag-el`,`title`,`onPointerdown`,`onClick`],If=[`data-iqxintitle`,`data-iqxinimg`,`data-iqxinlink`,`data-iqxintarget`,`data-iqxindisabled`],Lf=[`src`],Rf=[`innerHTML`],zf=[`title`,`onClick`,`innerHTML`],Bf=[`title`,`onClick`,`innerHTML`],Vf=[`innerHTML`],Hf={key:2,class:`sej-copy-hint`},Uf={__name:`SettingsCategoryCard`,props:{category:{type:Object,required:!0},ci:{type:Number,required:!0},dragCtx:{type:Object,default:null},copyTargetCi:{type:Number,default:null},displayName:{type:String,required:!0}},emits:[`toggle-category`,`open-category`,`delete-category`,`add-engine`,`edit-engine`,`toggle-engine`,`delete-engine`,`drag-start`],setup(e,{emit:t}){let n=t;return(t,r)=>(G(),K(`div`,{id:e.category.key,class:I([`iqxin-items`,{"sej-category-hidden":!e.category.enabled,"sej-drag-placeholder":e.dragCtx?.type===`category`&&e.dragCtx.key===e.category.key}]),"data-sej-drag-el":`category-`+e.category._id},[q(`div`,{class:`sejtitle drag`,"data-xin":e.category.enabled?1:-1,"data-iqxintitle":e.category.key,title:U($)(`settings.editCategory`,{name:e.displayName}),onPointerdown:r[3]||=t=>n(`drag-start`,t,`category`,e.ci),onClick:r[4]||=Y(t=>n(`open-category`,e.ci),[`stop`])},[q(`span`,Af,L(e.displayName),1),q(`span`,{class:`sej-hover-edit`,innerHTML:U(Ef)},null,8,jf),q(`span`,{class:I([`iqxin-set-toggle`,{"iqxin-set-hidden":!e.category.enabled}]),title:e.category.enabled?U($)(`common.hide`):U($)(`common.show`),onClick:r[0]||=Y(t=>n(`toggle-category`,e.ci),[`stop`]),innerHTML:e.category.enabled?U(wf):U(Tf)},null,10,Mf),q(`span`,{class:`sej-hover-delete`,title:U($)(`settings.deleteCategory`),onPointerdown:r[1]||=Y(()=>{},[`stop`]),onClick:r[2]||=Y(t=>n(`delete-category`,e.ci),[`stop`]),innerHTML:U(Df)},null,40,Nf)],40,kf),q(`div`,{class:`sejcon`,"data-sej-drag-el":`list-`+e.category._id},[(G(!0),K(W,null,Ar(e.category.engines,(t,i)=>(G(),K(`span`,{key:t._id,class:I([`drag`,{"sej-drag-placeholder":e.dragCtx?.type===`engine`&&e.dragCtx.key===t._id}]),"data-sej-drag-el":`engine-`+t._id,title:U($)(`settings.editEngine`,{name:U(rl)(t.name)}),onPointerdown:t=>n(`drag-start`,t,`engine`,e.ci,i),onClick:Y(t=>n(`edit-engine`,e.ci,i),[`stop`])},[q(`span`,{class:`sej-engine`,"data-iqxintitle":t.name,"data-iqxinimg":t.favicon,"data-iqxinlink":t.url,"data-iqxintarget":t.target===`_self`?`_self`:null,"data-iqxindisabled":t.disable?`true`:null},[q(`img`,{class:`sej-engine-icon`,src:U(cu)(t),alt:``},null,8,Lf),q(`span`,null,L(U(rl)(t.name)),1)],8,If),q(`span`,{class:`sej-hover-edit`,innerHTML:U(Ef)},null,8,Rf),q(`span`,{class:I([`iqxin-set-toggle`,{"iqxin-set-hidden":t.disable}]),title:t.disable?U($)(`common.show`):U($)(`common.hide`),onClick:Y(t=>n(`toggle-engine`,e.ci,i),[`stop`]),innerHTML:t.disable?U(Tf):U(wf)},null,10,zf),q(`span`,{class:`sej-hover-delete`,title:U($)(`settings.deleteEngine`),onPointerdown:r[5]||=Y(()=>{},[`stop`]),onClick:Y(t=>n(`delete-engine`,e.ci,i),[`stop`]),innerHTML:U(Df)},null,40,Bf)],42,Ff))),128)),q(`span`,{class:I([`iqxin-additem`,{"sej-copy-target":e.copyTargetCi===e.ci}]),onClick:r[6]||=Y(t=>n(`add-engine`,e.ci),[`stop`])},[e.copyTargetCi===e.ci?(G(),K(`span`,{key:0,class:`sej-copy-icon`,innerHTML:U(Cf)},null,8,Vf)):(G(),K(W,{key:1},[J(`+`)],64)),e.copyTargetCi===e.ci?(G(),K(`span`,Hf,L(U($)(`settings.copyHere`)),1)):la(``,!0)],2)],8,Pf)],10,Of))}},Wf={class:`sej-footer-bar`},Gf={class:`sej-footer-selects`},Kf={id:`xin-modification`,class:`sej-config-box`},qf=[`title`],Jf=[`title`],Yf=[`title`],Xf={class:`sej-footer-links`},Zf=[`title`],Qf=[`title`],$f={class:`sej-footer-actions`},ep=[`title`],tp={__name:`SettingsFooter`,props:{saving:{type:Boolean,default:!1}},emits:[`open-config`,`pick-config-file`,`export-config`,`save`],setup(e,{emit:t}){let n=t;return(t,r)=>(G(),K(`div`,Wf,[q(`div`,Gf,[q(`div`,Kf,[q(`button`,{type:`button`,class:`sej-config-open`,title:U($)(`settings.editConfig`),onClick:r[0]||=e=>n(`open-config`)},[r[4]||=q(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},[q(`circle`,{cx:`12`,cy:`12`,r:`3`}),q(`path`,{d:`M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z`})],-1),J(` `+L(U($)(`settings.editConfig`)),1)],8,qf),r[7]||=q(`span`,{class:`sej-config-sep`,"aria-hidden":`true`},null,-1),q(`button`,{type:`button`,class:`sej-config-action`,title:U($)(`config.import`),onClick:r[1]||=e=>n(`pick-config-file`)},[r[5]||=q(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},[q(`path`,{d:`M12 21V9`}),q(`path`,{d:`m7 14 5-5 5 5`}),q(`path`,{d:`M5 3h14`})],-1),J(` `+L(U($)(`config.import`)),1)],8,Jf),r[8]||=q(`span`,{class:`sej-config-sep`,"aria-hidden":`true`},null,-1),q(`button`,{type:`button`,class:`sej-config-action`,title:U($)(`config.export`),onClick:r[2]||=e=>n(`export-config`)},[r[6]||=q(`svg`,{width:`16`,height:`16`,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,"stroke-width":`2`,"stroke-linecap":`round`,"stroke-linejoin":`round`,"aria-hidden":`true`},[q(`path`,{d:`M12 3v12`}),q(`path`,{d:`m7 10 5 5 5-5`}),q(`path`,{d:`M5 21h14`})],-1),J(` `+L(U($)(`config.export`)),1)],8,Yf)])]),q(`div`,Xf,[q(`span`,{class:`feedback`,title:U($)(`settings.feedbackGreasyFork`)},[...r[9]||=[q(`a`,{target:`_blank`,href:`https://greasyfork.org/zh-CN/users/1238054`},`Greasy Fork`,-1)]],8,Zf),q(`span`,{class:`feedback`,title:U($)(`settings.feedbackGitHub`)},[...r[10]||=[q(`a`,{target:`_blank`,href:`https://github.com/sherlocknieh/Monkey-Scripts`},`GitHub`,-1)]],8,Qf)]),q(`div`,$f,[q(`span`,{id:`xin-save`,title:U($)(`settings.close`),class:I({"sej-saving":e.saving}),onClick:r[3]||=e=>n(`save`)},L(e.saving?U($)(`settings.saving`):U($)(`settings.close`)),11,ep)])]))}},np={class:`sej-footer-options`},rp=[`title`],ip=[`checked`],ap={id:`xin-selectSearch`},op=[`checked`],sp=[`title`],cp=[`checked`],lp=[`title`],up=[`checked`],dp=[`title`],fp=[`checked`],pp=[`title`],mp=[`checked`],hp={id:`xin-language`},gp=[`value`],_p={value:`auto`},vp={__name:`SettingsOptions`,props:{options:{type:Object,required:!0}},emits:[`update-option`],setup(e,{emit:t}){let n=t;return(t,r)=>(G(),K(`div`,np,[q(`span`,{id:`xin-HideTheSameLink`,title:U($)(`settings.hideSameLinkTip`)},[q(`label`,null,[J(L(U($)(`settings.hideSameLink`)),1),q(`input`,{type:`checkbox`,checked:e.options.HideTheSameLink,onChange:r[0]||=e=>n(`update-option`,`HideTheSameLink`,e.target.checked)},null,40,ip)])],8,rp),q(`span`,ap,[q(`label`,null,[J(L(U($)(`settings.selectSearch`)),1),q(`input`,{type:`checkbox`,checked:e.options.selectSearch,onChange:r[1]||=e=>n(`update-option`,`selectSearch`,e.target.checked)},null,40,op)])]),jn(q(`span`,{id:`xin-selectSearchInInput`,title:U($)(`settings.selectSearchInInputTip`)},[q(`label`,null,[J(L(U($)(`settings.selectSearchInInput`)),1),q(`input`,{type:`checkbox`,checked:e.options.selectSearchInInput,onChange:r[2]||=e=>n(`update-option`,`selectSearchInInput`,e.target.checked)},null,40,cp)])],8,sp),[[Ya,e.options.selectSearch]]),q(`span`,{id:`xin-centerDisplay`,title:U($)(`settings.centerTip`)},[q(`label`,null,[J(L(U($)(`settings.center`)),1),q(`input`,{type:`checkbox`,checked:e.options.center,onChange:r[3]||=e=>n(`update-option`,`center`,e.target.checked)},null,40,up)])],8,lp),q(`span`,{id:`iqxin-fixedTopS`,title:U($)(`settings.fixedTopTip`)},[q(`label`,null,[J(L(U($)(`settings.fixedTop`)),1),q(`input`,{type:`checkbox`,checked:e.options.fixedTop,onChange:r[4]||=e=>n(`update-option`,`fixedTop`,e.target.checked)},null,40,fp)])],8,dp),jn(q(`span`,{id:`iqxin-fixedTopUpward`,title:U($)(`settings.fixedTopUpwardTip`)},[q(`label`,null,[J(L(U($)(`settings.fixedTopUpward`)),1),q(`input`,{type:`checkbox`,checked:e.options.fixedTopUpward,onChange:r[5]||=e=>n(`update-option`,`fixedTopUpward`,e.target.checked)},null,40,mp)])],8,pp),[[Ya,e.options.fixedTop]]),q(`span`,hp,[q(`label`,null,[J(L(U($)(`settings.language`))+` `,1),q(`select`,{class:`sej-language-select`,value:e.options.language,onChange:r[6]||=e=>n(`update-option`,`language`,e.target.value)},[q(`option`,_p,L(U($)(`settings.languageAuto`)),1),r[7]||=q(`option`,{value:`zh-CN`},`简体中文`,-1),r[8]||=q(`option`,{value:`en`},`English`,-1)],40,gp)])])]))}},yp={id:`sej-settings-title`,class:`sej-panel-title`},bp=[`title`,`aria-label`],xp=[`title`,`aria-label`,`onKeydown`],Sp={id:`btnEle`},Cp={class:`btnEleLayer`},wp={__name:`SettingPanel`,setup(e){bs(wd);let t=vl(),{source:n,draft:r,nextId:a,buildResult:o,refreshDraft:s,displayCategoryName:c,toggleCategory:l,toggleEngine:u,appendCategory:d}=Sd({settings:t}),f=H(null),p=H(null),m=H(!1),h=H({}),g=H(null),_=H(null),v=H(!1),y=H(!1),b=null,x=!1,S=!1,{saving:C,cancelAutoSave:w,scheduleAutoSave:T,flushPending:E,saveNow:D,notifySaved:O,markSettingsChanged:k,takeSettingsChanged:A,dispose:j}=Ru({buildResult:o,getCurrent:()=>n.value,settings:t}),{configOpen:ee,pendingImport:M,configFileInput:te,configText:N,defaultConfigText:ne,openConfig:re,pickConfigFile:P,importConfigFile:ie,exportConfig:ae,mergePreview:oe,applyConfig:se,cancelConfig:ce}=cd({draft:r,nextId:a,buildResult:o,getCurrent:()=>n.value,getSettings:()=>t,refreshDraft:s,cancelAutoSave:w,markSettingsChanged:k,notifySaved:O,resetRemoteSynced:()=>{y.value=!1}}),{deleteCategory:le,deleteEngine:ue,undoDelete:de,canUndo:fe}=bd({draft:r,scheduleAutoSave:T,isDialogOpen:()=>!!(_.value||g.value||ee.value),closeCategoryDialog:()=>{g.value=null}}),{getICON:I,refreshIconInBackground:pe,loadAllIcons:me}=vd({draft:r,scheduleAutoSave:T,isDisposed:()=>S});Ln(()=>sl.map(e=>r[e]),()=>T()),Ln(()=>r.language,e=>tl(e)),Cd({settings:t,source:n,buildResult:o,refreshDraft:s,saving:C,remoteSynced:y,isOverlayOpen:()=>!!(_.value||g.value||ee.value),cancelAutoSave:w,closeOverlays:()=>{_.value=null,g.value=null,ee.value=!1}});let{dragCtx:he,copyTargetCi:ge,onDragPointerDown:_e,onWindowBlur:ve,consumeClickSuppression:ye,dispose:be}=ed({draft:r,layerEl:f,nextId:a,scheduleAutoSave:T}),{openCategoryDialog:xe,submitCategory:Se,cancelCategoryDialog:Ce,deleteCategoryFromDialog:R,addEngine:we,editEngine:Te,cancelEngineDialog:z,deleteEngineFromDialog:Ee,submitEngine:De}=xd({draft:r,nextId:a,categoryDialog:g,engineDialog:_,engineSaving:v,scheduleAutoSave:T,deleteCategory:le,deleteEngine:ue,refreshIconInBackground:pe,consumeClickSuppression:ye});function Oe(e){l(e),T()}function ke(e,t){u(e,t),T()}function Ae(e,t){r[e]=t}async function je(){d($(`category.newName`)),T(),await gn();let e=f.value?.querySelector(`#sej-settings-body`);e&&(e.scrollTop=e.scrollHeight)}function Me(){D()&&Fe()}function Ne(){x||(x=!0,clearTimeout(b),b=null,E(),$o(),(y.value||A())&&(y.value=!1,setTimeout(i,0)))}function Pe(e){e.target===p.value&&e.propertyName===`opacity`&&(m.value||Ne())}function Fe(){m.value&&(m.value=!1,b=setTimeout(Ne,400))}function Ie(e){if(!(e.ctrlKey||e.metaKey)||e.shiftKey||e.altKey||e.key.toLowerCase()!==`z`||!fe())return;let t=e.composedPath?.()[0]||e.target;t?.tagName===`INPUT`||t?.tagName===`TEXTAREA`||t?.isContentEditable||(e.preventDefault(),de())}rd({containerEl:f,onClose:Fe});let{startDrag:Le,dispose:Re}=zu({layerEl:f,maskEl:p,layerStyle:h});return br(()=>{document.body.style.overflow=`hidden`,document.addEventListener(`keydown`,Ie),window.addEventListener(`blur`,ve),gn(()=>{m.value=!0,me()})}),Cr(()=>{S=!0,E(),j(),be(),document.body.style.overflow=`auto`,document.removeEventListener(`keydown`,Ie),window.removeEventListener(`blur`,ve),clearTimeout(b),Re(),tl(t.settingData.language)}),(e,t)=>(G(),K(`div`,{id:`settingLayerMask`,ref_key:`maskEl`,ref:p,style:F({display:`flex`,opacity:+!!m.value}),onClick:Y(Fe,[`self`]),onTransitionend:Pe},[q(`div`,{id:`settingLayer`,ref_key:`layerEl`,ref:f,role:`dialog`,"aria-modal":`true`,"aria-labelledby":`sej-settings-title`,style:F(h.value),onClick:t[6]||=Y(()=>{},[`stop`])},[q(`div`,{class:`sej-panel-header`,onPointerdown:t[1]||=(...e)=>U(Le)&&U(Le)(...e),onContextmenu:t[2]||=Y(()=>{},[`prevent`])},[q(`span`,yp,L(U($)(`settings.title`)),1),q(`button`,{type:`button`,class:`sej-panel-close`,title:U($)(`settings.close`),"aria-label":U($)(`settings.close`),onClick:Y(Fe,[`stop`]),onPointerdown:t[0]||=Y(()=>{},[`stop`])},` ✕ `,40,bp)],32),q(`div`,{id:`sej-settings-body`,onDragstart:t[3]||=Y(()=>{},[`prevent`]),onContextmenu:t[4]||=Y(()=>{},[`prevent`])},[(G(!0),K(W,null,Ar(U(r).categories,(e,t)=>(G(),ea(Uf,{key:e._id,category:e,ci:t,"drag-ctx":U(he),"copy-target-ci":U(ge),"display-name":U(c)(e),onToggleCategory:Oe,onOpenCategory:U(xe),onDeleteCategory:U(le),onAddEngine:U(we),onEditEngine:U(Te),onToggleEngine:ke,onDeleteEngine:U(ue),onDragStart:U(_e)},null,8,[`category`,`ci`,`drag-ctx`,`copy-target-ci`,`display-name`,`onOpenCategory`,`onDeleteCategory`,`onAddEngine`,`onEditEngine`,`onDeleteEngine`,`onDragStart`]))),128)),q(`div`,{class:`iqxin-items sej-add-category-card`,role:`button`,tabindex:`0`,title:U($)(`settings.addCategory`),"aria-label":U($)(`settings.addCategory`),onClick:je,onKeydown:[Bo(je,[`enter`]),Bo(Y(je,[`prevent`]),[`space`])]},[...t[7]||=[q(`span`,{class:`sej-add-category-plus`},`+`,-1)]],40,xp)],32),q(`div`,Sp,[q(`div`,Cp,[aa(vp,{options:U(r),onUpdateOption:Ae},null,8,[`options`]),aa(tp,{saving:U(C),onOpenConfig:U(re),onPickConfigFile:U(P),onExportConfig:U(ae),onSave:Me},null,8,[`saving`,`onOpenConfig`,`onPickConfigFile`,`onExportConfig`])]),q(`input`,{ref_key:`configFileInput`,ref:te,class:`sej-file-input`,type:`file`,accept:`application/json,.json`,onChange:t[5]||=(...e)=>U(ie)&&U(ie)(...e)},null,544)]),_.value?(G(),ea(sf,{key:0,mode:_.value.mode,initial:_.value.initial,busy:v.value,"resolve-icon":U(I),onSubmit:U(De),onDelete:U(Ee),onCancel:U(z)},null,8,[`mode`,`initial`,`busy`,`resolve-icon`,`onSubmit`,`onDelete`,`onCancel`])):la(``,!0),g.value?(G(),ea(hf,{key:1,name:U(c)(U(r).categories[g.value.index])||``,onSubmit:U(Se),onDelete:U(R),onCancel:U(Ce)},null,8,[`name`,`onSubmit`,`onDelete`,`onCancel`])):la(``,!0),U(ee)?(G(),ea(Sf,{key:2,"initial-text":U(N),"default-text":U(ne),imported:U(M),"merge-preview":U(oe),onApply:U(se),onCancel:U(ce)},null,8,[`initial-text`,`default-text`,`imported`,`merge-preview`,`onApply`,`onCancel`])):la(``,!0)],4)],36))}},Tp={__name:`Toast`,setup(e){return bs(`
/* 给用户的提示 */
#iqixn-global-tip {
  box-sizing: content-box !important;
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: 0;
  height: 25px;
  line-height: 25px;
  letter-spacing: 1px;
  font-size: 14px;
  color: #fff;
  padding: 5px 20px;
  border-radius: 8px;
  background-color: #666;
  position: fixed;
  z-index: 200000001;
  left: 50%;
  bottom: 5%;
  transform: translate(-50%);
  pointer-events: none;
  transition: opacity 0.15s ease-out;
}

#iqixn-global-tip.sej-toast-visible {
  pointer-events: auto;
}

#iqixn-global-tip .sej-toast-action {
  pointer-events: auto;
  border: none;
  border-radius: 6px;
  padding: 2px 10px;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  font: inherit;
  letter-spacing: inherit;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.12s ease-out;
}

#iqixn-global-tip .sej-toast-action:hover {
  background: rgba(255, 255, 255, 0.34);
}
`),(e,t)=>(G(),K(`div`,{id:`iqixn-global-tip`,class:I({"sej-toast-visible":U(X).toastVisible}),style:F({opacity:+!!U(X).toastVisible})},[q(`span`,null,L(U(X).toastText),1),U(X).toastActionLabel?(G(),K(`button`,{key:0,type:`button`,class:`sej-toast-action`,onClick:t[0]||=(...e)=>U(Zo)&&U(Zo)(...e)},L(U(X).toastActionLabel),1)):la(``,!0)],6))}},Ep={__name:`App`,setup(e){return(e,t)=>(G(),K(W,null,[aa(Lu),U(X).settingPanelOpen?(G(),ea(wp,{key:0})):la(``,!0),aa(Tp)],64))}},Dp=`/* ==UserStyle==
@name           SearchEngineJumpPlusGlobalStyle
@description    Global style for SearchEngineJumpPlus
@version        5.32.0
@namespace      https://greasyfork.org/en/scripts/454280-searchenginejumpplus
@license        MIT
@author         MUTED64
==/UserStyle== */

/* 夜间模式 - 默认主题变量 */
:host {
  --font-color-qxin: #333;
  --background-color-qxin: #fffffff0;
  --background-hover-color-qxin: #eaeaea;
  --trigger-shown-qxin: #f1f3f4 !important;
  --background-setting-qxin: #fff;
  --border-color-sej: #e1e6ea;

  /* 跳转条现代化外观 */
  --sej-font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', sans-serif;
  --sej-bar-bg: rgba(255, 255, 255, 0.88);
  --sej-hover-bg: rgba(0, 0, 0, 0.055);
  --sej-active-bg: rgba(0, 0, 0, 0.1);
  --sej-accent: #4285f4;
  --sej-accent-weak: rgba(66, 133, 244, 0.12);
  --sej-radius-bar: 12px;
  --sej-radius-item: 8px;
  --sej-radius-menu: 12px;
  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.06), 0 8px 24px -12px hsla(0, 0%, 0%, 0.35);
  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.06), 0 16px 40px -12px hsla(0, 0%, 0%, 0.3);

  /* 设置面板 */
  --sej-surface-2: rgba(0, 0, 0, 0.025);
  --sej-surface-hover: rgba(0, 0, 0, 0.06);
  --sej-input-bg: #fff;
  --sej-btn-bg: #fff;
  --sej-checkbox-border: #cfd5dd;
  --sej-focus-ring: rgba(66, 133, 244, 0.22);
  --sej-accent-contrast: #fff;
  --sej-danger: #d93025;
  --sej-danger-weak: rgba(217, 48, 37, 0.1);
  --sej-success: #188038;
  --sej-success-weak: rgba(24, 128, 56, 0.14);
  --sej-panel-shadow: 0 24px 64px -24px hsla(0, 0%, 0%, 0.45), 0 2px 8px hsla(0, 0%, 0%, 0.06);
}

/* 暗黑模式变量 - 当主文档是暗黑模式时 */
:host([qxintheme='dark']) {
  --font-color-qxin: #bdc1bc;
  --background-color-qxin: #202124f0;
  --background-hover-color-qxin: #424242;
  --trigger-shown-qxin: #3c4043 !important;
  --background-setting-qxin: #202124;
  --border-color-sej: #3b4547;

  --sej-bar-bg: rgba(32, 33, 36, 0.9);
  --sej-hover-bg: rgba(255, 255, 255, 0.09);
  --sej-active-bg: rgba(255, 255, 255, 0.14);
  --sej-accent: #8ab4f8;
  --sej-accent-weak: rgba(138, 180, 248, 0.18);
  --sej-shadow-bar: 0 1px 2px hsla(0, 0%, 0%, 0.5), 0 8px 24px -12px hsla(0, 0%, 0%, 0.8);
  --sej-shadow-menu: 0 2px 6px hsla(0, 0%, 0%, 0.5), 0 16px 40px -12px hsla(0, 0%, 0%, 0.85);

  --sej-surface-2: rgba(255, 255, 255, 0.045);
  --sej-surface-hover: rgba(255, 255, 255, 0.09);
  --sej-input-bg: #17181a;
  --sej-btn-bg: rgba(255, 255, 255, 0.04);
  --sej-checkbox-border: #4a5459;
  --sej-focus-ring: rgba(138, 180, 248, 0.3);
  --sej-accent-contrast: #202124;
  --sej-danger: #f28b82;
  --sej-danger-weak: rgba(242, 139, 130, 0.14);
  --sej-success: #81c995;
  --sej-success-weak: rgba(129, 201, 149, 0.16);
  --sej-panel-shadow: 0 24px 64px -20px hsla(0, 0%, 0%, 0.85), 0 2px 8px hsla(0, 0%, 0%, 0.5);
}

/* 分类下拉菜单挂载容器本身不参与布局 */
#sej-drop-lists {
  display: contents;
}
`,Op=[`data-theme`,`data-color-scheme`,`data-color-mode`,`theme`],kp=/dark|night/,Ap=/light/;function jp(e){if(!e)return null;let t=e.toLowerCase();return kp.test(t)?!0:!Ap.test(t)&&null}function Mp(){let e=[document.documentElement,document.body].filter(Boolean);for(let t of e)for(let e of Op){let n=jp(t.getAttribute(e));if(n!==null)return n}for(let t of e){let e=jp(typeof t.className==`string`?t.className:``);if(e!==null)return e}return null}function Np(e){let t=/^rgba?\(([^)]+)\)/.exec(e||``);if(!t)return null;let[n,r,i,a=1]=t[1].split(/[\s,/]+/).map(Number);return![n,r,i].every(Number.isFinite)||a<.5?null:(n*299+r*587+i*114)/1e3<128}function Pp(){let e=Mp();if(e!==null)return e;try{let e=getComputedStyle(document.documentElement).colorScheme;if(e&&e.split(/\s+/).includes(`dark`))return!0}catch{}let t=document.querySelector(`#app, main, [role="main"], .app`)||document.body;for(let e=t;e;e=e.parentElement){let t=Np(getComputedStyle(e).backgroundColor);if(t!==null)return t}return!!(window.matchMedia&&window.matchMedia(`(prefers-color-scheme: dark)`).matches)}function Fp(){let e=gs(),t=Pp();t!==e.hasAttribute(`qxintheme`)&&(t?e.setAttribute(`qxintheme`,`dark`):e.removeAttribute(`qxintheme`))}var Ip=!1,Lp=null;function Rp(){Lp||=setTimeout(()=>{Lp=null,Fp()},50)}function zp(){if(!Ip){if(Ip=!0,window.matchMedia){let e=window.matchMedia(`(prefers-color-scheme: dark)`);e.addEventListener?e.addEventListener(`change`,Rp):e.addListener&&e.addListener(Rp)}if(typeof MutationObserver==`function`){let e=new MutationObserver(Rp),t=(t,n)=>{t&&e.observe(t,{attributes:!0,attributeFilter:n})};t(document.documentElement,[`class`,`style`,...Op]),t(document.body,[`class`,...Op]),document.addEventListener(`DOMContentLoaded`,()=>{t(document.body,[`class`,...Op]),Rp()})}[200,800,2e3].forEach(e=>{setTimeout(Fp,e)})}}var Bp=!1;function Vp(e){if(Bp)return;let t=globalThis.GM,n=typeof t?.registerMenuCommand==`function`?t.registerMenuCommand.bind(t):null,r=typeof dc==`function`?dc:n;if(!r)Bp=!0,console.info(`[SEJ] 当前脚本管理器不支持菜单命令，可使用跳转条右侧的设置按钮`);else try{r($(`menu.settings`),()=>{e?.(),Qo()}),Bp=!0}catch(e){console.warn(`[SEJ] 注册菜单命令失败`,e)}}var Hp=null;function Up(){return!!document.getElementById(os)}function Wp(){if(Hp){try{Hp.unmount()}catch{}Hp=null}xs()}function Gp({force:e=!1}={}){if(!e&&Up())return;Wp();let t=hs();bs(Dp),Fp(),zp(),document.body.appendChild(gs()),Hp=Wo(Ep),Hp.mount(t),Vp()}function Kp(){$o(),Gp({force:!0})}function qp(){try{let e=lc?.script?.name,t=lc?.script?.version;if(!e)return;console.info(`\n%c ${e} v${t} \n%c 问题反馈(GitHub):\t\thttps://github.com/MUTED64/SearchEngineJumpPlus/issues/new\t\t\t\t\t\t\t\n%c 问题反馈(GreasyFork):\thttps://greasyfork.org/scripts/454280-searchenginejumpplus-搜索引擎快捷跳转/feedback\t\n`,`color:#eee;background:#444;padding:6px 0;border-radius:6px 6px 0 0;`,`color:#444;background:#eee;padding:6px 0;border-radius:0 6px 0 0`,`color:#444;background:#eee;padding:6px 0;border-radius:0 0 6px 6px;`)}catch{}}var Jp=[/^https?:\/\/www\.zhihu\.com\/search\?/,/^https?:\/\/www\.iciba\.com\/word\?/,/^https?:\/\/search\.bilibili\.com\//,/^https?:\/\/(www\.)?baidu\.com/i],Yp=1e3;function Xp(e=location.href){return Jp.some(t=>t.test(e))}var Zp=0,Qp=null;async function $p(){window.self===window.top&&(qp(),await Bc([ml]),Vp(nm),em())}function em(){im();let e=vl();e.getMatchedRule()?tm():e.settingData.selectSearch&&rm(e.settingData.selectSearchInInput)}function tm(){Zp||(Xp()?Zp=setTimeout(()=>{Zp=0,Gp()},Yp):Gp())}function nm(){im(),Zp&&=(clearTimeout(Zp),0),Gp()}function rm(e){let t=()=>{Rl({includeInput:e}).trim()&&nm()};document.addEventListener(`selectionchange`,t),document.addEventListener(`mouseup`,t),document.addEventListener(`keyup`,t),Qp=()=>{document.removeEventListener(`selectionchange`,t),document.removeEventListener(`mouseup`,t),document.removeEventListener(`keyup`,t)}}function im(){Qp&&=(Qp(),null)}function am(e){try{let t=new URL(e);return t.hostname.includes(`bilibili.com`)&&t.searchParams.delete(`vt`),t.toString()}catch{return e}}function om(e){return am(decodeURI(e).replaceAll(` `,`+`))}function sm(e,t){return e===t?!0:!e||!t?!1:e.url?.source===t.url?.source&&e.url?.flags===t.url?.flags}function cm(e){return!e.barMounted||!sm(e.getMatchedRule(),e.activeRule)}function lm(e){if(window.onurlchange!==null)return()=>{};let t=om(location.href),n=0,r=r=>{let i=om(r.url);t!==i&&(t=i,clearTimeout(n),n=setTimeout(()=>{if(n=0,!Up()){Wp(),e();return}let t=vl();cm(t)?(Wp(),e()):t.activeRule=t.getMatchedRule()},100))};return window.addEventListener(`urlchange`,r),()=>{clearTimeout(n),n=0,window.removeEventListener(`urlchange`,r)}}var um=200,dm=5e3,fm=!1,pm=null;function mm(){X.settingPanelOpen?X.settingsRevision++:vl().reload()&&Up()&&(Kp(),Z($(`toast.syncedFromOtherPages`)))}function hm(){if(fm)return;fm=!0,Uc(ml,()=>{clearTimeout(pm),pm=setTimeout(mm,um)});let e=async()=>{!Up()||X.settingPanelOpen||document.hidden||await Wc(`searchEngineJumpData`)&&mm()};setInterval(e,dm),document.addEventListener(`visibilitychange`,()=>{document.hidden||e()}),window.addEventListener(`focus`,e)}r(Kp),$p(),lm($p),hm()})();
