<style>
    /*<!--src="bootstrap-toggle/css/bootstrap-toggle.css" -->*/
</style>

<template>
    <input type="checkbox"/>
</template>

<script>
    console.log("bootstrap-toggle script");
	var merge=function(r){var e={};function t(n){if(e[n])return e[n].exports;var o=e[n]={i:n,l:!1,exports:{}};return r[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=r,t.c=e,t.d=function(r,e,n){t.o(r,e)||Object.defineProperty(r,e,{enumerable:!0,get:n})},t.r=function(r){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(r,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(r,"__esModule",{value:!0})},t.t=function(r,e){if(1&e&&(r=t(r)),8&e)return r;if(4&e&&"object"==typeof r&&r&&r.__esModule)return r;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:r}),2&e&&"string"!=typeof r)for(var o in r)t.d(n,o,function(e){return r[e]}.bind(null,o));return n},t.n=function(r){var e=r&&r.__esModule?function(){return r.default}:function(){return r};return t.d(e,"a",e),e},t.o=function(r,e){return Object.prototype.hasOwnProperty.call(r,e)},t.p="",t(t.s=0)}([function(r,e,t){"use strict";function n(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return o.apply(void 0,r)}function o(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return c(!0===r[0],!1,r)}function u(){for(var r=[],e=0;e<arguments.length;e++)r[e]=arguments[e];return c(!0===r[0],!0,r)}function i(r){if(Array.isArray(r)){for(var e=[],t=0;t<r.length;++t)e.push(i(r[t]));return e}if(f(r)){e={};for(var t in r)e[t]=i(r[t]);return e}return r}function f(r){return r&&"object"==typeof r&&!Array.isArray(r)}function a(r,e){if(!f(r))return e;for(var t in e)r[t]=f(r[t])&&f(e[t])?a(r[t],e[t]):e[t];return r}function c(r,e,t){var n;!r&&f(n=t.shift())||(n={});for(var o=0;o<t.length;++o){var u=t[o];if(f(u))for(var c in u)if("__proto__"!==c){var l=r?i(u[c]):u[c];n[c]=e?a(n[c],l):l}}return n}Object.defineProperty(e,"__esModule",{value:!0}),r.exports=e=n,e.default=n,e.main=n,n.clone=i,n.isPlainObject=f,n.recursive=u,e.merge=o,e.recursive=u,e.clone=i,e.isPlainObject=f}]).default;
	// if (!jQuery().bootstrapToggle) {
	// 	require('bootstrap-toggle')
	// }
	const defaults = {};
	export default {
		defaults,
		props: {
			value: Boolean,
			options: {
				type: Object,
				default: () => ({})
			},
			disabled: {
				type: Boolean,
				default: false,
			},
		},
		data() {
			return { updating: false, };
		},
		computed: {
			$$el() {
				console.log("bootstrap-toggle, this.$el", this.$el);
				return jQuery(this.$el)
			}
		},
		watch: {
			value(newValue) {
				if(this.updating) {
					return;
				}
				this.$$el.bootstrapToggle(newValue ? 'on' : 'off');
			},
			disabled(newValue) {
				this.$$el.bootstrapToggle(newValue ? 'disable' : 'enable');
			}
		},
		mounted() {
			console.log("bootstrap-toggle, mounted()");
			if (this.value) {
				this.$el.checked = true
			}
			console.log("bootstrap-toggle, mounted()");
			this.$$el.bootstrapToggle(merge.recursive(true, defaults, this.options));
			if (this.disabled) { this.$$el.bootstrapToggle('disable') }
			this.$$el.change(() => {
				this.updating = true;
				this.$emit('input', this.$$el.prop('checked'));
				this.$nextTick( () => this.updating = false );
			})
		},
		beforeDestroy() {
			this.$$el.bootstrapToggle('destroy');
			this.$$el.off('change')
		}
	}
</script>