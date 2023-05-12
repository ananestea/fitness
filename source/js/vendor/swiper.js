// const swiper = () => {
//   /**
//    * Swiper 7.4.1
//    * Most modern mobile touch slider and framework with hardware accelerated transitions
//    * https://swiperjs.com
//    *
//    * Copyright 2014-2021 Vladimir Kharlampidi
//    *
//    * Released under the MIT License
//    *
//    * Released on: December 24, 2021
//    */

//   (function (global, factory) {
//     typeof exports === 'object' && typeof module !== 'undefined'
//       ? (module.exports = factory())
//       : typeof define === 'function' && define.amd
//       ? define(factory)
//       : ((global = typeof globalThis !== 'undefined' ? globalThis : global || self), (global.Swiper = factory()));
//   })(this, function () {
//     'use strict';

//     /**
//      * SSR Window 4.0.2
//      * Better handling for window object in SSR environment
//      * https://github.com/nolimits4web/ssr-window
//      *
//      * Copyright 2021, Vladimir Kharlampidi
//      *
//      * Licensed under MIT
//      *
//      * Released on: December 13, 2021
//      */

//     /* eslint-disable no-param-reassign */
//     function isObject$1(obj) {
//       return obj !== null && typeof obj === 'object' && 'constructor' in obj && obj.constructor === Object;
//     }

//     function extend$1(target = {}, src = {}) {
//       Object.keys(src).forEach((key) => {
//         if (typeof target[key] === 'undefined') target[key] = src[key];
//         else if (isObject$1(src[key]) && isObject$1(target[key]) && Object.keys(src[key]).length > 0) {
//           extend$1(target[key], src[key]);
//         }
//       });
//     }

//     const ssrDocument = {
//       body: {},

//       addEventListener() {},

//       removeEventListener() {},

//       activeElement: {
//         blur() {},

//         nodeName: '',
//       },

//       querySelector() {
//         return null;
//       },

//       querySelectorAll() {
//         return [];
//       },

//       getElementById() {
//         return null;
//       },

//       createEvent() {
//         return {
//           initEvent() {},
//         };
//       },

//       createElement() {
//         return {
//           children: [],
//           childNodes: [],
//           style: {},

//           setAttribute() {},

//           getElementsByTagName() {
//             return [];
//           },
//         };
//       },

//       createElementNS() {
//         return {};
//       },

//       importNode() {
//         return null;
//       },

//       location: {
//         hash: '',
//         host: '',
//         hostname: '',
//         href: '',
//         origin: '',
//         pathname: '',
//         protocol: '',
//         search: '',
//       },
//     };

//     function getDocument() {
//       const doc = typeof document !== 'undefined' ? document : {};
//       extend$1(doc, ssrDocument);
//       return doc;
//     }

//     const ssrWindow = {
//       document: ssrDocument,
//       navigator: {
//         userAgent: '',
//       },
//       location: {
//         hash: '',
//         host: '',
//         hostname: '',
//         href: '',
//         origin: '',
//         pathname: '',
//         protocol: '',
//         search: '',
//       },
//       history: {
//         replaceState() {},

//         pushState() {},

//         go() {},

//         back() {},
//       },
//       CustomEvent: function CustomEvent() {
//         return this;
//       },

//       addEventListener() {},

//       removeEventListener() {},

//       getComputedStyle() {
//         return {
//           getPropertyValue() {
//             return '';
//           },
//         };
//       },

//       Image() {},

//       Date() {},

//       screen: {},

//       setTimeout() {},

//       clearTimeout() {},

//       matchMedia() {
//         return {};
//       },

//       requestAnimationFrame(callback) {
//         if (typeof setTimeout === 'undefined') {
//           callback();
//           return null;
//         }

//         return setTimeout(callback, 0);
//       },

//       cancelAnimationFrame(id) {
//         if (typeof setTimeout === 'undefined') {
//           return;
//         }

//         clearTimeout(id);
//       },
//     };

//     function getWindow() {
//       const win = typeof window !== 'undefined' ? window : {};
//       extend$1(win, ssrWindow);
//       return win;
//     }

//     /**
//      * Dom7 4.0.2
//      * Minimalistic JavaScript library for DOM manipulation, with a jQuery-compatible API
//      * https://framework7.io/docs/dom7.html
//      *
//      * Copyright 2021, Vladimir Kharlampidi
//      *
//      * Licensed under MIT
//      *
//      * Released on: December 13, 2021
//      */
//     /* eslint-disable no-proto */

//     function makeReactive(obj) {
//       const proto = obj.__proto__;
//       Object.defineProperty(obj, '__proto__', {
//         get() {
//           return proto;
//         },

//         set(value) {
//           proto.__proto__ = value;
//         },
//       });
//     }

//     class Dom7 extends Array {
//       constructor(items) {
//         super(...(items || []));
//         makeReactive(this);
//       }
//     }

//     function arrayFlat(arr = []) {
//       const res = [];
//       arr.forEach((el) => {
//         if (Array.isArray(el)) {
//           res.push(...arrayFlat(el));
//         } else {
//           res.push(el);
//         }
//       });
//       return res;
//     }

//     function arrayFilter(arr, callback) {
//       return Array.prototype.filter.call(arr, callback);
//     }

//     function arrayUnique(arr) {
//       const uniqueArray = [];

//       for (let i = 0; i < arr.length; i += 1) {
//         if (uniqueArray.indexOf(arr[i]) === -1) uniqueArray.push(arr[i]);
//       }

//       return uniqueArray;
//     }

//     function qsa(selector, context) {
//       if (typeof selector !== 'string') {
//         return [selector];
//       }

//       const a = [];
//       const res = context.querySelectorAll(selector);

//       for (let i = 0; i < res.length; i += 1) {
//         a.push(res[i]);
//       }

//       return a;
//     }

//     function $(selector, context) {
//       const window = getWindow();
//       const document = getDocument();
//       let arr = [];

//       if (!context && selector instanceof Dom7) {
//         return selector;
//       }

//       if (!selector) {
//         return new Dom7(arr);
//       }

//       if (typeof selector === 'string') {
//         const html = selector.trim();

//         if (html.indexOf('<') >= 0 && html.indexOf('>') >= 0) {
//           let toCreate = 'div';
//           if (html.indexOf('<li') === 0) toCreate = 'ul';
//           if (html.indexOf('<tr') === 0) toCreate = 'tbody';
//           if (html.indexOf('<td') === 0 || html.indexOf('<th') === 0) toCreate = 'tr';
//           if (html.indexOf('<tbody') === 0) toCreate = 'table';
//           if (html.indexOf('<option') === 0) toCreate = 'select';
//           const tempParent = document.createElement(toCreate);
//           tempParent.innerHTML = html;

//           for (let i = 0; i < tempParent.childNodes.length; i += 1) {
//             arr.push(tempParent.childNodes[i]);
//           }
//         } else {
//           arr = qsa(selector.trim(), context || document);
//         } // arr = qsa(selector, document);
//       } else if (selector.nodeType || selector === window || selector === document) {
//         arr.push(selector);
//       } else if (Array.isArray(selector)) {
//         if (selector instanceof Dom7) return selector;
//         arr = selector;
//       }

//       return new Dom7(arrayUnique(arr));
//     }

//     $.fn = Dom7.prototype; // eslint-disable-next-line

//     function addClass(...classes) {
//       const classNames = arrayFlat(classes.map((c) => c.split(' ')));
//       this.forEach((el) => {
//         el.classList.add(...classNames);
//       });
//       return this;
//     }

//     function removeClass(...classes) {
//       const classNames = arrayFlat(classes.map((c) => c.split(' ')));
//       this.forEach((el) => {
//         el.classList.remove(...classNames);
//       });
//       return this;
//     }

//     function toggleClass(...classes) {
//       const classNames = arrayFlat(classes.map((c) => c.split(' ')));
//       this.forEach((el) => {
//         classNames.forEach((className) => {
//           el.classList.toggle(className);
//         });
//       });
//     }

//     function hasClass(...classes) {
//       const classNames = arrayFlat(classes.map((c) => c.split(' ')));
//       return (
//         arrayFilter(this, (el) => {
//           return classNames.filter((className) => el.classList.contains(className)).length > 0;
//         }).length > 0
//       );
//     }

//     function attr(attrs, value) {
//       if (arguments.length === 1 && typeof attrs === 'string') {
//         // Get attr
//         if (this[0]) return this[0].getAttribute(attrs);
//         return undefined;
//       } // Set attrs

//       for (let i = 0; i < this.length; i += 1) {
//         if (arguments.length === 2) {
//           // String
//           this[i].setAttribute(attrs, value);
//         } else {
//           // Object
//           for (const attrName in attrs) {
//             this[i][attrName] = attrs[attrName];
//             this[i].setAttribute(attrName, attrs[attrName]);
//           }
//         }
//       }

//       return this;
//     }

//     function removeAttr(attr) {
//       for (let i = 0; i < this.length; i += 1) {
//         this[i].removeAttribute(attr);
//       }

//       return this;
//     }

//     function transform(transform) {
//       for (let i = 0; i < this.length; i += 1) {
//         this[i].style.transform = transform;
//       }

//       return this;
//     }

//     function transition$1(duration) {
//       for (let i = 0; i < this.length; i += 1) {
//         this[i].style.transitionDuration = typeof duration !== 'string' ? `${duration}ms` : duration;
//       }

//       return this;
//     }

//     function on(...args) {
//       let [eventType, targetSelector, listener, capture] = args;

//       if (typeof args[1] === 'function') {
//         [eventType, listener, capture] = args;
//         targetSelector = undefined;
//       }

//       if (!capture) capture = false;

//       function handleLiveEvent(e) {
//         const target = e.target;
//         if (!target) return;
//         const eventData = e.target.dom7EventData || [];

//         if (eventData.indexOf(e) < 0) {
//           eventData.unshift(e);
//         }

//         if ($(target).is(targetSelector)) listener.apply(target, eventData);
//         else {
//           const parents = $(target).parents(); // eslint-disable-line

//           for (let k = 0; k < parents.length; k += 1) {
//             if ($(parents[k]).is(targetSelector)) listener.apply(parents[k], eventData);
//           }
//         }
//       }

//       function handleEvent(e) {
//         const eventData = e && e.target ? e.target.dom7EventData || [] : [];

//         if (eventData.indexOf(e) < 0) {
//           eventData.unshift(e);
//         }

//         listener.apply(this, eventData);
//       }

//       const events = eventType.split(' ');
//       let j;

//       for (let i = 0; i < this.length; i += 1) {
//         const el = this[i];

//         if (!targetSelector) {
//           for (j = 0; j < events.length; j += 1) {
//             const event = events[j];
//             if (!el.dom7Listeners) el.dom7Listeners = {};
//             if (!el.dom7Listeners[event]) el.dom7Listeners[event] = [];
//             el.dom7Listeners[event].push({
//               listener,
//               proxyListener: handleEvent,
//             });
//             el.addEventListener(event, handleEvent, capture);
//           }
//         } else {
//           // Live events
//           for (j = 0; j < events.length; j += 1) {
//             const event = events[j];
//             if (!el.dom7LiveListeners) el.dom7LiveListeners = {};
//             if (!el.dom7LiveListeners[event]) el.dom7LiveListeners[event] = [];
//             el.dom7LiveListeners[event].push({
//               listener,
//               proxyListener: handleLiveEvent,
//             });
//             el.addEventListener(event, handleLiveEvent, capture);
//           }
//         }
//       }

//       return this;
//     }

//     function off(...args) {
//       let [eventType, targetSelector, listener, capture] = args;

//       if (typeof args[1] === 'function') {
//         [eventType, listener, capture] = args;
//         targetSelector = undefined;
//       }

//       if (!capture) capture = false;
//       const events = eventType.split(' ');

//       for (let i = 0; i < events.length; i += 1) {
//         const event = events[i];

//         for (let j = 0; j < this.length; j += 1) {
//           const el = this[j];
//           let handlers;

//           if (!targetSelector && el.dom7Listeners) {
//             handlers = el.dom7Listeners[event];
//           } else if (targetSelector && el.dom7LiveListeners) {
//             handlers = el.dom7LiveListeners[event];
//           }

//           if (handlers && handlers.length) {
//             for (let k = handlers.length - 1; k >= 0; k -= 1) {
//               const handler = handlers[k];

//               if (listener && handler.listener === listener) {
//                 el.removeEventListener(event, handler.proxyListener, capture);
//                 handlers.splice(k, 1);
//               } else if (
//                 listener &&
//                 handler.listener &&
//                 handler.listener.dom7proxy &&
//                 handler.listener.dom7proxy === listener
//               ) {
//                 el.removeEventListener(event, handler.proxyListener, capture);
//                 handlers.splice(k, 1);
//               } else if (!listener) {
//                 el.removeEventListener(event, handler.proxyListener, capture);
//                 handlers.splice(k, 1);
//               }
//             }
//           }
//         }
//       }

//       return this;
//     }

//     function trigger(...args) {
//       const window = getWindow();
//       const events = args[0].split(' ');
//       const eventData = args[1];

//       for (let i = 0; i < events.length; i += 1) {
//         const event = events[i];

//         for (let j = 0; j < this.length; j += 1) {
//           const el = this[j];

//           if (window.CustomEvent) {
//             const evt = new window.CustomEvent(event, {
//               detail: eventData,
//               bubbles: true,
//               cancelable: true,
//             });
//             el.dom7EventData = args.filter((data, dataIndex) => dataIndex > 0);
//             el.dispatchEvent(evt);
//             el.dom7EventData = [];
//             delete el.dom7EventData;
//           }
//         }
//       }

//       return this;
//     }

//     function transitionEnd$1(callback) {
//       const dom = this;

//       function fireCallBack(e) {
//         if (e.target !== this) return;
//         callback.call(this, e);
//         dom.off('transitionend', fireCallBack);
//       }

//       if (callback) {
//         dom.on('transitionend', fireCallBack);
//       }

//       return this;
//     }

//     function outerWidth(includeMargins) {
//       if (this.length > 0) {
//         if (includeMargins) {
//           const styles = this.styles();
//           return (
//             this[0].offsetWidth +
//             parseFloat(styles.getPropertyValue('margin-right')) +
//             parseFloat(styles.getPropertyValue('margin-left'))
//           );
//         }

//         return this[0].offsetWidth;
//       }

//       return null;
//     }

//     function outerHeight(includeMargins) {
//       if (this.length > 0) {
//         if (includeMargins) {
//           const styles = this.styles();
//           return (
//             this[0].offsetHeight +
//             parseFloat(styles.getPropertyValue('margin-top')) +
//             parseFloat(styles.getPropertyValue('margin-bottom'))
//           );
//         }

//         return this[0].offsetHeight;
//       }

//       return null;
//     }

//     function offset() {
//       if (this.length > 0) {
//         const window = getWindow();
//         const document = getDocument();
//         const el = this[0];
//         const box = el.getBoundingClientRect();
//         const body = document.body;
//         const clientTop = el.clientTop || body.clientTop || 0;
//         const clientLeft = el.clientLeft || body.clientLeft || 0;
//         const scrollTop = el === window ? window.scrollY : el.scrollTop;
//         const scrollLeft = el === window ? window.scrollX : el.scrollLeft;
//         return {
//           top: box.top + scrollTop - clientTop,
//           left: box.left + scrollLeft - clientLeft,
//         };
//       }

//       return null;
//     }

//     function styles() {
//       const window = getWindow();
//       if (this[0]) return window.getComputedStyle(this[0], null);
//       return {};
//     }

//     function css(props, value) {
//       const window = getWindow();
//       let i;

//       if (arguments.length === 1) {
//         if (typeof props === 'string') {
//           // .css('width')
//           if (this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
//         } else {
//           // .css({ width: '100px' })
//           for (i = 0; i < this.length; i += 1) {
//             for (const prop in props) {
//               this[i].style[prop] = props[prop];
//             }
//           }

//           return this;
//         }
//       }

//       if (arguments.length === 2 && typeof props === 'string') {
//         // .css('width', '100px')
//         for (i = 0; i < this.length; i += 1) {
//           this[i].style[props] = value;
//         }

//         return this;
//       }

//       return this;
//     }

//     function each(callback) {
//       if (!callback) return this;
//       this.forEach((el, index) => {
//         callback.apply(el, [el, index]);
//       });
//       return this;
//     }

//     function filter(callback) {
//       const result = arrayFilter(this, callback);
//       return $(result);
//     }

//     function html(html) {
//       if (typeof html === 'undefined') {
//         return this[0] ? this[0].innerHTML : null;
//       }

//       for (let i = 0; i < this.length; i += 1) {
//         this[i].innerHTML = html;
//       }

//       return this;
//     }

//     function text(text) {
//       if (typeof text === 'undefined') {
//         return this[0] ? this[0].textContent.trim() : null;
//       }

//       for (let i = 0; i < this.length; i += 1) {
//         this[i].textContent = text;
//       }

//       return this;
//     }

//     function is(selector) {
//       const window = getWindow();
//       const document = getDocument();
//       const el = this[0];
//       let compareWith;
//       let i;
//       if (!el || typeof selector === 'undefined') return false;

//       if (typeof selector === 'string') {
//         if (el.matches) return el.matches(selector);
//         if (el.webkitMatchesSelector) return el.webkitMatchesSelector(selector);
//         if (el.msMatchesSelector) return el.msMatchesSelector(selector);
//         compareWith = $(selector);

//         for (i = 0; i < compareWith.length; i += 1) {
//           if (compareWith[i] === el) return true;
//         }

//         return false;
//       }

//       if (selector === document) {
//         return el === document;
//       }

//       if (selector === window) {
//         return el === window;
//       }

//       if (selector.nodeType || selector instanceof Dom7) {
//         compareWith = selector.nodeType ? [selector] : selector;

//         for (i = 0; i < compareWith.length; i += 1) {
//           if (compareWith[i] === el) return true;
//         }

//         return false;
//       }

//       return false;
//     }

//     function index() {
//       let child = this[0];
//       let i;

//       if (child) {
//         i = 0; // eslint-disable-next-line

//         while ((child = child.previousSibling) !== null) {
//           if (child.nodeType === 1) i += 1;
//         }

//         return i;
//       }

//       return undefined;
//     }

//     function eq(index) {
//       if (typeof index === 'undefined') return this;
//       const length = this.length;

//       if (index > length - 1) {
//         return $([]);
//       }

//       if (index < 0) {
//         const returnIndex = length + index;
//         if (returnIndex < 0) return $([]);
//         return $([this[returnIndex]]);
//       }

//       return $([this[index]]);
//     }

//     function append(...els) {
//       let newChild;
//       const document = getDocument();

//       for (let k = 0; k < els.length; k += 1) {
//         newChild = els[k];

//         for (let i = 0; i < this.length; i += 1) {
//           if (typeof newChild === 'string') {
//             const tempDiv = document.createElement('div');
//             tempDiv.innerHTML = newChild;

//             while (tempDiv.firstChild) {
//               this[i].appendChild(tempDiv.firstChild);
//             }
//           } else if (newChild instanceof Dom7) {
//             for (let j = 0; j < newChild.length; j += 1) {
//               this[i].appendChild(newChild[j]);
//             }
//           } else {
//             this[i].appendChild(newChild);
//           }
//         }
//       }

//       return this;
//     }

//     function prepend(newChild) {
//       const document = getDocument();
//       let i;
//       let j;

//       for (i = 0; i < this.length; i += 1) {
//         if (typeof newChild === 'string') {
//           const tempDiv = document.createElement('div');
//           tempDiv.innerHTML = newChild;

//           for (j = tempDiv.childNodes.length - 1; j >= 0; j -= 1) {
//             this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
//           }
//         } else if (newChild instanceof Dom7) {
//           for (j = 0; j < newChild.length; j += 1) {
//             this[i].insertBefore(newChild[j], this[i].childNodes[0]);
//           }
//         } else {
//           this[i].insertBefore(newChild, this[i].childNodes[0]);
//         }
//       }

//       return this;
//     }

//     function next(selector) {
//       if (this.length > 0) {
//         if (selector) {
//           if (this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)) {
//             return $([this[0].nextElementSibling]);
//           }

//           return $([]);
//         }

//         if (this[0].nextElementSibling) return $([this[0].nextElementSibling]);
//         return $([]);
//       }

//       return $([]);
//     }

//     function nextAll(selector) {
//       const nextEls = [];
//       let el = this[0];
//       if (!el) return $([]);

//       while (el.nextElementSibling) {
//         const next = el.nextElementSibling; // eslint-disable-line

//         if (selector) {
//           if ($(next).is(selector)) nextEls.push(next);
//         } else nextEls.push(next);

//         el = next;
//       }

//       return $(nextEls);
//     }

//     function prev(selector) {
//       if (this.length > 0) {
//         const el = this[0];

//         if (selector) {
//           if (el.previousElementSibling && $(el.previousElementSibling).is(selector)) {
//             return $([el.previousElementSibling]);
//           }

//           return $([]);
//         }

//         if (el.previousElementSibling) return $([el.previousElementSibling]);
//         return $([]);
//       }

//       return $([]);
//     }

//     function prevAll(selector) {
//       const prevEls = [];
//       let el = this[0];
//       if (!el) return $([]);

//       while (el.previousElementSibling) {
//         const prev = el.previousElementSibling; // eslint-disable-line

//         if (selector) {
//           if ($(prev).is(selector)) prevEls.push(prev);
//         } else prevEls.push(prev);

//         el = prev;
//       }

//       return $(prevEls);
//     }

//     function parent(selector) {
//       const parents = []; // eslint-disable-line

//       for (let i = 0; i < this.length; i += 1) {
//         if (this[i].parentNode !== null) {
//           if (selector) {
//             if ($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
//           } else {
//             parents.push(this[i].parentNode);
//           }
//         }
//       }

//       return $(parents);
//     }

//     function parents(selector) {
//       const parents = []; // eslint-disable-line

//       for (let i = 0; i < this.length; i += 1) {
//         let parent = this[i].parentNode; // eslint-disable-line

//         while (parent) {
//           if (selector) {
//             if ($(parent).is(selector)) parents.push(parent);
//           } else {
//             parents.push(parent);
//           }

//           parent = parent.parentNode;
//         }
//       }

//       return $(parents);
//     }

//     function closest(selector) {
//       let closest = this; // eslint-disable-line

//       if (typeof selector === 'undefined') {
//         return $([]);
//       }

//       if (!closest.is(selector)) {
//         closest = closest.parents(selector).eq(0);
//       }

//       return closest;
//     }

//     function find(selector) {
//       const foundElements = [];

//       for (let i = 0; i < this.length; i += 1) {
//         const found = this[i].querySelectorAll(selector);

//         for (let j = 0; j < found.length; j += 1) {
//           foundElements.push(found[j]);
//         }
//       }

//       return $(foundElements);
//     }

//     function children(selector) {
//       const children = []; // eslint-disable-line

//       for (let i = 0; i < this.length; i += 1) {
//         const childNodes = this[i].children;

//         for (let j = 0; j < childNodes.length; j += 1) {
//           if (!selector || $(childNodes[j]).is(selector)) {
//             children.push(childNodes[j]);
//           }
//         }
//       }

//       return $(children);
//     }

//     function remove() {
//       for (let i = 0; i < this.length; i += 1) {
//         if (this[i].parentNode) this[i].parentNode.removeChild(this[i]);
//       }

//       return this;
//     }

//     const Methods = {
//       addClass,
//       removeClass,
//       hasClass,
//       toggleClass,
//       attr,
//       removeAttr,
//       transform,
//       transition: transition$1,
//       on,
//       off,
//       trigger,
//       transitionEnd: transitionEnd$1,
//       outerWidth,
//       outerHeight,
//       styles,
//       offset,
//       css,
//       each,
//       html,
//       text,
//       is,
//       index,
//       eq,
//       append,
//       prepend,
//       next,
//       nextAll,
//       prev,
//       prevAll,
//       parent,
//       parents,
//       closest,
//       find,
//       children,
//       filter,
//       remove,
//     };
//     Object.keys(Methods).forEach((methodName) => {
//       Object.defineProperty($.fn, methodName, {
//         value: Methods[methodName],
//         writable: true,
//       });
//     });

//     function deleteProps(obj) {
//       const object = obj;
//       Object.keys(object).forEach((key) => {
//         try {
//           object[key] = null;
//         } catch (e) {
//           // no getter for object
//         }

//         try {
//           delete object[key];
//         } catch (e) {
//           // something got wrong
//         }
//       });
//     }

//     function nextTick(callback, delay = 0) {
//       return setTimeout(callback, delay);
//     }

//     function now() {
//       return Date.now();
//     }

//     function getComputedStyle$1(el) {
//       const window = getWindow();
//       let style;

//       if (window.getComputedStyle) {
//         style = window.getComputedStyle(el, null);
//       }

//       if (!style && el.currentStyle) {
//         style = el.currentStyle;
//       }

//       if (!style) {
//         style = el.style;
//       }

//       return style;
//     }

//     function getTranslate(el, axis = 'x') {
//       const window = getWindow();
//       let matrix;
//       let curTransform;
//       let transformMatrix;
//       const curStyle = getComputedStyle$1(el);

//       if (window.WebKitCSSMatrix) {
//         curTransform = curStyle.transform || curStyle.webkitTransform;

//         if (curTransform.split(',').length > 6) {
//           curTransform = curTransform
//             .split(', ')
//             .map((a) => a.replace(',', '.'))
//             .join(', ');
//         } // Some old versions of Webkit choke when 'none' is passed; pass
//         // empty string instead in this case

//         transformMatrix = new window.WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
//       } else {
//         transformMatrix =
//           curStyle.MozTransform ||
//           curStyle.OTransform ||
//           curStyle.MsTransform ||
//           curStyle.msTransform ||
//           curStyle.transform ||
//           curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
//         matrix = transformMatrix.toString().split(',');
//       }

//       if (axis === 'x') {
//         // Latest Chrome and webkits Fix
//         if (window.WebKitCSSMatrix) curTransform = transformMatrix.m41; // Crazy IE10 Matrix
//         else if (matrix.length === 16) curTransform = parseFloat(matrix[12]); // Normal Browsers
//         else curTransform = parseFloat(matrix[4]);
//       }

//       if (axis === 'y') {
//         // Latest Chrome and webkits Fix
//         if (window.WebKitCSSMatrix) curTransform = transformMatrix.m42; // Crazy IE10 Matrix
//         else if (matrix.length === 16) curTransform = parseFloat(matrix[13]); // Normal Browsers
//         else curTransform = parseFloat(matrix[5]);
//       }

//       return curTransform || 0;
//     }

//     function isObject(o) {
//       return (
//         typeof o === 'object' &&
//         o !== null &&
//         o.constructor &&
//         Object.prototype.toString.call(o).slice(8, -1) === 'Object'
//       );
//     }

//     function isNode(node) {
//       // eslint-disable-next-line
//       if (typeof window !== 'undefined' && typeof window.HTMLElement !== 'undefined') {
//         return node instanceof HTMLElement;
//       }

//       return node && (node.nodeType === 1 || node.nodeType === 11);
//     }

//     function extend(...args) {
//       const to = Object(args[0]);
//       const noExtend = ['__proto__', 'constructor', 'prototype'];

//       for (let i = 1; i < args.length; i += 1) {
//         const nextSource = args[i];

//         if (nextSource !== undefined && nextSource !== null && !isNode(nextSource)) {
//           const keysArray = Object.keys(Object(nextSource)).filter((key) => noExtend.indexOf(key) < 0);

//           for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
//             const nextKey = keysArray[nextIndex];
//             const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

//             if (desc !== undefined && desc.enumerable) {
//               if (isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
//                 if (nextSource[nextKey].__swiper__) {
//                   to[nextKey] = nextSource[nextKey];
//                 } else {
//                   extend(to[nextKey], nextSource[nextKey]);
//                 }
//               } else if (!isObject(to[nextKey]) && isObject(nextSource[nextKey])) {
//                 to[nextKey] = {};

//                 if (nextSource[nextKey].__swiper__) {
//                   to[nextKey] = nextSource[nextKey];
//                 } else {
//                   extend(to[nextKey], nextSource[nextKey]);
//                 }
//               } else {
//                 to[nextKey] = nextSource[nextKey];
//               }
//             }
//           }
//         }
//       }

//       return to;
//     }

//     function setCSSProperty(el, varName, varValue) {
//       el.style.setProperty(varName, varValue);
//     }

//     function animateCSSModeScroll({swiper, targetPosition, side}) {
//       const window = getWindow();
//       const startPosition = -swiper.translate;
//       let startTime = null;
//       let time;
//       const duration = swiper.params.speed;
//       swiper.wrapperEl.style.scrollSnapType = 'none';
//       window.cancelAnimationFrame(swiper.cssModeFrameID);
//       const dir = targetPosition > startPosition ? 'next' : 'prev';

//       const isOutOfBound = (current, target) => {
//         return (dir === 'next' && current >= target) || (dir === 'prev' && current <= target);
//       };

//       const animate = () => {
//         time = new Date().getTime();

//         if (startTime === null) {
//           startTime = time;
//         }

//         const progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
//         const easeProgress = 0.5 - Math.cos(progress * Math.PI) / 2;
//         let currentPosition = startPosition + easeProgress * (targetPosition - startPosition);

//         if (isOutOfBound(currentPosition, targetPosition)) {
//           currentPosition = targetPosition;
//         }

//         swiper.wrapperEl.scrollTo({
//           [side]: currentPosition,
//         });

//         if (isOutOfBound(currentPosition, targetPosition)) {
//           swiper.wrapperEl.style.overflow = 'hidden';
//           swiper.wrapperEl.style.scrollSnapType = '';
//           setTimeout(() => {
//             swiper.wrapperEl.style.overflow = '';
//             swiper.wrapperEl.scrollTo({
//               [side]: currentPosition,
//             });
//           });
//           window.cancelAnimationFrame(swiper.cssModeFrameID);
//           return;
//         }

//         swiper.cssModeFrameID = window.requestAnimationFrame(animate);
//       };

//       animate();
//     }

//     let support;

//     function calcSupport() {
//       const window = getWindow();
//       const document = getDocument();
//       return {
//         smoothScroll: document.documentElement && 'scrollBehavior' in document.documentElement.style,
//         touch: !!('ontouchstart' in window || (window.DocumentTouch && document instanceof window.DocumentTouch)),
//         passiveListener: (function checkPassiveListener() {
//           let supportsPassive = false;

//           try {
//             const opts = Object.defineProperty({}, 'passive', {
//               // eslint-disable-next-line
//               get() {
//                 supportsPassive = true;
//               },
//             });
//             window.addEventListener('testPassiveListener', null, opts);
//           } catch (e) {
//             // No support
//           }

//           return supportsPassive;
//         })(),
//         gestures: (function checkGestures() {
//           return 'ongesturestart' in window;
//         })(),
//       };
//     }

//     function getSupport() {
//       if (!support) {
//         support = calcSupport();
//       }

//       return support;
//     }

//     let deviceCached;

//     function calcDevice({userAgent} = {}) {
//       const support = getSupport();
//       const window = getWindow();
//       const platform = window.navigator.platform;
//       const ua = userAgent || window.navigator.userAgent;
//       const device = {
//         ios: false,
//         android: false,
//       };
//       const screenWidth = window.screen.width;
//       const screenHeight = window.screen.height;
//       const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/); // eslint-disable-line

//       let ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
//       const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
//       const iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
//       const windows = platform === 'Win32';
//       let macos = platform === 'MacIntel'; // iPadOs 13 fix

//       const iPadScreens = [
//         '1024x1366',
//         '1366x1024',
//         '834x1194',
//         '1194x834',
//         '834x1112',
//         '1112x834',
//         '768x1024',
//         '1024x768',
//         '820x1180',
//         '1180x820',
//         '810x1080',
//         '1080x810',
//       ];

//       if (!ipad && macos && support.touch && iPadScreens.indexOf(`${screenWidth}x${screenHeight}`) >= 0) {
//         ipad = ua.match(/(Version)\/([\d.]+)/);
//         if (!ipad) ipad = [0, 1, '13_0_0'];
//         macos = false;
//       } // Android

//       if (android && !windows) {
//         device.os = 'android';
//         device.android = true;
//       }

//       if (ipad || iphone || ipod) {
//         device.os = 'ios';
//         device.ios = true;
//       } // Export object

//       return device;
//     }

//     function getDevice(overrides = {}) {
//       if (!deviceCached) {
//         deviceCached = calcDevice(overrides);
//       }

//       return deviceCached;
//     }

//     let browser;

//     function calcBrowser() {
//       const window = getWindow();

//       function isSafari() {
//         const ua = window.navigator.userAgent.toLowerCase();
//         return ua.indexOf('safari') >= 0 && ua.indexOf('chrome') < 0 && ua.indexOf('android') < 0;
//       }

//       return {
//         isSafari: isSafari(),
//         isWebView: /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(window.navigator.userAgent),
//       };
//     }

//     function getBrowser() {
//       if (!browser) {
//         browser = calcBrowser();
//       }

//       return browser;
//     }

//     function Resize({swiper, on, emit}) {
//       const window = getWindow();
//       let observer = null;

//       const resizeHandler = () => {
//         if (!swiper || swiper.destroyed || !swiper.initialized) return;
//         emit('beforeResize');
//         emit('resize');
//       };

//       const createObserver = () => {
//         if (!swiper || swiper.destroyed || !swiper.initialized) return;
//         observer = new ResizeObserver((entries) => {
//           const {width, height} = swiper;
//           let newWidth = width;
//           let newHeight = height;
//           entries.forEach(({contentBoxSize, contentRect, target}) => {
//             if (target && target !== swiper.el) return;
//             newWidth = contentRect ? contentRect.width : (contentBoxSize[0] || contentBoxSize).inlineSize;
//             newHeight = contentRect ? contentRect.height : (contentBoxSize[0] || contentBoxSize).blockSize;
//           });

//           if (newWidth !== width || newHeight !== height) {
//             resizeHandler();
//           }
//         });
//         observer.observe(swiper.el);
//       };

//       const removeObserver = () => {
//         if (observer && observer.unobserve && swiper.el) {
//           observer.unobserve(swiper.el);
//           observer = null;
//         }
//       };

//       const orientationChangeHandler = () => {
//         if (!swiper || swiper.destroyed || !swiper.initialized) return;
//         emit('orientationchange');
//       };

//       on('init', () => {
//         if (swiper.params.resizeObserver && typeof window.ResizeObserver !== 'undefined') {
//           createObserver();
//           return;
//         }

//         window.addEventListener('resize', resizeHandler);
//         window.addEventListener('orientationchange', orientationChangeHandler);
//       });
//       on('destroy', () => {
//         removeObserver();
//         window.removeEventListener('resize', resizeHandler);
//         window.removeEventListener('orientationchange', orientationChangeHandler);
//       });
//     }

//     function Observer({swiper, extendParams, on, emit}) {
//       const observers = [];
//       const window = getWindow();

//       const attach = (target, options = {}) => {
//         const ObserverFunc = window.MutationObserver || window.WebkitMutationObserver;
//         const observer = new ObserverFunc((mutations) => {
//           // The observerUpdate event should only be triggered
//           // once despite the number of mutations.  Additional
//           // triggers are redundant and are very costly
//           if (mutations.length === 1) {
//             emit('observerUpdate', mutations[0]);
//             return;
//           }

//           const observerUpdate = function observerUpdate() {
//             emit('observerUpdate', mutations[0]);
//           };

//           if (window.requestAnimationFrame) {
//             window.requestAnimationFrame(observerUpdate);
//           } else {
//             window.setTimeout(observerUpdate, 0);
//           }
//         });
//         observer.observe(target, {
//           attributes: typeof options.attributes === 'undefined' ? true : options.attributes,
//           childList: typeof options.childList === 'undefined' ? true : options.childList,
//           characterData: typeof options.characterData === 'undefined' ? true : options.characterData,
//         });
//         observers.push(observer);
//       };

//       const init = () => {
//         if (!swiper.params.observer) return;

//         if (swiper.params.observeParents) {
//           const containerParents = swiper.$el.parents();

//           for (let i = 0; i < containerParents.length; i += 1) {
//             attach(containerParents[i]);
//           }
//         } // Observe container

//         attach(swiper.$el[0], {
//           childList: swiper.params.observeSlideChildren,
//         }); // Observe wrapper

//         attach(swiper.$wrapperEl[0], {
//           attributes: false,
//         });
//       };

//       const destroy = () => {
//         observers.forEach((observer) => {
//           observer.disconnect();
//         });
//         observers.splice(0, observers.length);
//       };

//       extendParams({
//         observer: false,
//         observeParents: false,
//         observeSlideChildren: false,
//       });
//       on('init', init);
//       on('destroy', destroy);
//     }

//     /* eslint-disable no-underscore-dangle */
//     var eventsEmitter = {
//       on(events, handler, priority) {
//         const self = this;
//         if (typeof handler !== 'function') return self;
//         const method = priority ? 'unshift' : 'push';
//         events.split(' ').forEach((event) => {
//           if (!self.eventsListeners[event]) self.eventsListeners[event] = [];
//           self.eventsListeners[event][method](handler);
//         });
//         return self;
//       },

//       once(events, handler, priority) {
//         const self = this;
//         if (typeof handler !== 'function') return self;

//         function onceHandler(...args) {
//           self.off(events, onceHandler);

//           if (onceHandler.__emitterProxy) {
//             delete onceHandler.__emitterProxy;
//           }

//           handler.apply(self, args);
//         }

//         onceHandler.__emitterProxy = handler;
//         return self.on(events, onceHandler, priority);
//       },

//       onAny(handler, priority) {
//         const self = this;
//         if (typeof handler !== 'function') return self;
//         const method = priority ? 'unshift' : 'push';

//         if (self.eventsAnyListeners.indexOf(handler) < 0) {
//           self.eventsAnyListeners[method](handler);
//         }

//         return self;
//       },

//       offAny(handler) {
//         const self = this;
//         if (!self.eventsAnyListeners) return self;
//         const index = self.eventsAnyListeners.indexOf(handler);

//         if (index >= 0) {
//           self.eventsAnyListeners.splice(index, 1);
//         }

//         return self;
//       },

//       off(events, handler) {
//         const self = this;
//         if (!self.eventsListeners) return self;
//         events.split(' ').forEach((event) => {
//           if (typeof handler === 'undefined') {
//             self.eventsListeners[event] = [];
//           } else if (self.eventsListeners[event]) {
//             self.eventsListeners[event].forEach((eventHandler, index) => {
//               if (
//                 eventHandler === handler ||
//                 (eventHandler.__emitterProxy && eventHandler.__emitterProxy === handler)
//               ) {
//                 self.eventsListeners[event].splice(index, 1);
//               }
//             });
//           }
//         });
//         return self;
//       },

//       emit(...args) {
//         const self = this;
//         if (!self.eventsListeners) return self;
//         let events;
//         let data;
//         let context;

//         if (typeof args[0] === 'string' || Array.isArray(args[0])) {
//           events = args[0];
//           data = args.slice(1, args.length);
//           context = self;
//         } else {
//           events = args[0].events;
//           data = args[0].data;
//           context = args[0].context || self;
//         }

//         data.unshift(context);
//         const eventsArray = Array.isArray(events) ? events : events.split(' ');
//         eventsArray.forEach((event) => {
//           if (self.eventsAnyListeners && self.eventsAnyListeners.length) {
//             self.eventsAnyListeners.forEach((eventHandler) => {
//               eventHandler.apply(context, [event, ...data]);
//             });
//           }

//           if (self.eventsListeners && self.eventsListeners[event]) {
//             self.eventsListeners[event].forEach((eventHandler) => {
//               eventHandler.apply(context, data);
//             });
//           }
//         });
//         return self;
//       },
//     };

//     function updateSize() {
//       const swiper = this;
//       let width;
//       let height;
//       const $el = swiper.$el;

//       if (typeof swiper.params.width !== 'undefined' && swiper.params.width !== null) {
//         width = swiper.params.width;
//       } else {
//         width = $el[0].clientWidth;
//       }

//       if (typeof swiper.params.height !== 'undefined' && swiper.params.height !== null) {
//         height = swiper.params.height;
//       } else {
//         height = $el[0].clientHeight;
//       }

//       if ((width === 0 && swiper.isHorizontal()) || (height === 0 && swiper.isVertical())) {
//         return;
//       } // Subtract paddings

//       width = width - parseInt($el.css('padding-left') || 0, 10) - parseInt($el.css('padding-right') || 0, 10);
//       height = height - parseInt($el.css('padding-top') || 0, 10) - parseInt($el.css('padding-bottom') || 0, 10);
//       if (Number.isNaN(width)) width = 0;
//       if (Number.isNaN(height)) height = 0;
//       Object.assign(swiper, {
//         width,
//         height,
//         size: swiper.isHorizontal() ? width : height,
//       });
//     }

//     function updateSlides() {
//       const swiper = this;

//       function getDirectionLabel(property) {
//         if (swiper.isHorizontal()) {
//         return property;
//       } // prettier-ignore

//         return {
//           width: 'height',
//           'margin-top': 'margin-left',
//           'margin-bottom ': 'margin-right',
//           'margin-left': 'margin-top',
//           'margin-right': 'margin-bottom',
//           'padding-left': 'padding-top',
//           'padding-right': 'padding-bottom',
//           marginRight: 'marginBottom',
//         }[property];
//       }

//       function getDirectionPropertyValue(node, label) {
//         return parseFloat(node.getPropertyValue(getDirectionLabel(label)) || 0);
//       }

//       const params = swiper.params;
//       const {$wrapperEl, size: swiperSize, rtlTranslate: rtl, wrongRTL} = swiper;
//       const isVirtual = swiper.virtual && params.virtual.enabled;
//       const previousSlidesLength = isVirtual ? swiper.virtual.slides.length : swiper.slides.length;
//       const slides = $wrapperEl.children(`.${swiper.params.slideClass}`);
//       const slidesLength = isVirtual ? swiper.virtual.slides.length : slides.length;
//       let snapGrid = [];
//       const slidesGrid = [];
//       const slidesSizesGrid = [];
//       let offsetBefore = params.slidesOffsetBefore;

//       if (typeof offsetBefore === 'function') {
//         offsetBefore = params.slidesOffsetBefore.call(swiper);
//       }

//       let offsetAfter = params.slidesOffsetAfter;

//       if (typeof offsetAfter === 'function') {
//         offsetAfter = params.slidesOffsetAfter.call(swiper);
//       }

//       const previousSnapGridLength = swiper.snapGrid.length;
//       const previousSlidesGridLength = swiper.slidesGrid.length;
//       let spaceBetween = params.spaceBetween;
//       let slidePosition = -offsetBefore;
//       let prevSlideSize = 0;
//       let index = 0;

//       if (typeof swiperSize === 'undefined') {
//         return;
//       }

//       if (typeof spaceBetween === 'string' && spaceBetween.indexOf('%') >= 0) {
//         spaceBetween = (parseFloat(spaceBetween.replace('%', '')) / 100) * swiperSize;
//       }

//       swiper.virtualSize = -spaceBetween; // reset margins

//       if (rtl)
//         slides.css({
//           marginLeft: '',
//           marginBottom: '',
//           marginTop: '',
//         });
//       else
//         slides.css({
//           marginRight: '',
//           marginBottom: '',
//           marginTop: '',
//         }); // reset cssMode offsets

//       if (params.centeredSlides && params.cssMode) {
//         setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', '');
//         setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-after', '');
//       }

//       const gridEnabled = params.grid && params.grid.rows > 1 && swiper.grid;

//       if (gridEnabled) {
//         swiper.grid.initSlides(slidesLength);
//       } // Calc slides

//       let slideSize;
//       const shouldResetSlideSize =
//         params.slidesPerView === 'auto' &&
//         params.breakpoints &&
//         Object.keys(params.breakpoints).filter((key) => {
//           return typeof params.breakpoints[key].slidesPerView !== 'undefined';
//         }).length > 0;

//       for (let i = 0; i < slidesLength; i += 1) {
//         slideSize = 0;
//         const slide = slides.eq(i);

//         if (gridEnabled) {
//           swiper.grid.updateSlide(i, slide, slidesLength, getDirectionLabel);
//         }

//         if (slide.css('display') === 'none') continue; // eslint-disable-line

//         if (params.slidesPerView === 'auto') {
//           if (shouldResetSlideSize) {
//             slides[i].style[getDirectionLabel('width')] = ``;
//           }

//           const slideStyles = getComputedStyle(slide[0]);
//           const currentTransform = slide[0].style.transform;
//           const currentWebKitTransform = slide[0].style.webkitTransform;

//           if (currentTransform) {
//             slide[0].style.transform = 'none';
//           }

//           if (currentWebKitTransform) {
//             slide[0].style.webkitTransform = 'none';
//           }

//           if (params.roundLengths) {
//             slideSize = swiper.isHorizontal() ? slide.outerWidth(true) : slide.outerHeight(true);
//           } else {
//             // eslint-disable-next-line
//             const width = getDirectionPropertyValue(slideStyles, 'width');
//             const paddingLeft = getDirectionPropertyValue(slideStyles, 'padding-left');
//             const paddingRight = getDirectionPropertyValue(slideStyles, 'padding-right');
//             const marginLeft = getDirectionPropertyValue(slideStyles, 'margin-left');
//             const marginRight = getDirectionPropertyValue(slideStyles, 'margin-right');
//             const boxSizing = slideStyles.getPropertyValue('box-sizing');

//             if (boxSizing && boxSizing === 'border-box') {
//               slideSize = width + marginLeft + marginRight;
//             } else {
//               const {clientWidth, offsetWidth} = slide[0];
//               slideSize = width + paddingLeft + paddingRight + marginLeft + marginRight + (offsetWidth - clientWidth);
//             }
//           }

//           if (currentTransform) {
//             slide[0].style.transform = currentTransform;
//           }

//           if (currentWebKitTransform) {
//             slide[0].style.webkitTransform = currentWebKitTransform;
//           }

//           if (params.roundLengths) slideSize = Math.floor(slideSize);
//         } else {
//           slideSize = (swiperSize - (params.slidesPerView - 1) * spaceBetween) / params.slidesPerView;
//           if (params.roundLengths) slideSize = Math.floor(slideSize);

//           if (slides[i]) {
//             slides[i].style[getDirectionLabel('width')] = `${slideSize}px`;
//           }
//         }

//         if (slides[i]) {
//           slides[i].swiperSlideSize = slideSize;
//         }

//         slidesSizesGrid.push(slideSize);

//         if (params.centeredSlides) {
//           slidePosition = slidePosition + slideSize / 2 + prevSlideSize / 2 + spaceBetween;
//           if (prevSlideSize === 0 && i !== 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
//           if (i === 0) slidePosition = slidePosition - swiperSize / 2 - spaceBetween;
//           if (Math.abs(slidePosition) < 1 / 1000) slidePosition = 0;
//           if (params.roundLengths) slidePosition = Math.floor(slidePosition);
//           if (index % params.slidesPerGroup === 0) snapGrid.push(slidePosition);
//           slidesGrid.push(slidePosition);
//         } else {
//           if (params.roundLengths) slidePosition = Math.floor(slidePosition);
//           if ((index - Math.min(swiper.params.slidesPerGroupSkip, index)) % swiper.params.slidesPerGroup === 0)
//             snapGrid.push(slidePosition);
//           slidesGrid.push(slidePosition);
//           slidePosition = slidePosition + slideSize + spaceBetween;
//         }

//         swiper.virtualSize += slideSize + spaceBetween;
//         prevSlideSize = slideSize;
//         index += 1;
//       }

//       swiper.virtualSize = Math.max(swiper.virtualSize, swiperSize) + offsetAfter;

//       if (rtl && wrongRTL && (params.effect === 'slide' || params.effect === 'coverflow')) {
//         $wrapperEl.css({
//           width: `${swiper.virtualSize + params.spaceBetween}px`,
//         });
//       }

//       if (params.setWrapperSize) {
//         $wrapperEl.css({
//           [getDirectionLabel('width')]: `${swiper.virtualSize + params.spaceBetween}px`,
//         });
//       }

//       if (gridEnabled) {
//         swiper.grid.updateWrapperSize(slideSize, snapGrid, getDirectionLabel);
//       } // Remove last grid elements depending on width

//       if (!params.centeredSlides) {
//         const newSlidesGrid = [];

//         for (let i = 0; i < snapGrid.length; i += 1) {
//           let slidesGridItem = snapGrid[i];
//           if (params.roundLengths) slidesGridItem = Math.floor(slidesGridItem);

//           if (snapGrid[i] <= swiper.virtualSize - swiperSize) {
//             newSlidesGrid.push(slidesGridItem);
//           }
//         }

//         snapGrid = newSlidesGrid;

//         if (Math.floor(swiper.virtualSize - swiperSize) - Math.floor(snapGrid[snapGrid.length - 1]) > 1) {
//           snapGrid.push(swiper.virtualSize - swiperSize);
//         }
//       }

//       if (snapGrid.length === 0) snapGrid = [0];

//       if (params.spaceBetween !== 0) {
//         const key = swiper.isHorizontal() && rtl ? 'marginLeft' : getDirectionLabel('marginRight');
//         slides
//           .filter((_, slideIndex) => {
//             if (!params.cssMode) return true;

//             if (slideIndex === slides.length - 1) {
//               return false;
//             }

//             return true;
//           })
//           .css({
//             [key]: `${spaceBetween}px`,
//           });
//       }

//       if (params.centeredSlides && params.centeredSlidesBounds) {
//         let allSlidesSize = 0;
//         slidesSizesGrid.forEach((slideSizeValue) => {
//           allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
//         });
//         allSlidesSize -= params.spaceBetween;
//         const maxSnap = allSlidesSize - swiperSize;
//         snapGrid = snapGrid.map((snap) => {
//           if (snap < 0) return -offsetBefore;
//           if (snap > maxSnap) return maxSnap + offsetAfter;
//           return snap;
//         });
//       }

//       if (params.centerInsufficientSlides) {
//         let allSlidesSize = 0;
//         slidesSizesGrid.forEach((slideSizeValue) => {
//           allSlidesSize += slideSizeValue + (params.spaceBetween ? params.spaceBetween : 0);
//         });
//         allSlidesSize -= params.spaceBetween;

//         if (allSlidesSize < swiperSize) {
//           const allSlidesOffset = (swiperSize - allSlidesSize) / 2;
//           snapGrid.forEach((snap, snapIndex) => {
//             snapGrid[snapIndex] = snap - allSlidesOffset;
//           });
//           slidesGrid.forEach((snap, snapIndex) => {
//             slidesGrid[snapIndex] = snap + allSlidesOffset;
//           });
//         }
//       }

//       Object.assign(swiper, {
//         slides,
//         snapGrid,
//         slidesGrid,
//         slidesSizesGrid,
//       });

//       if (params.centeredSlides && params.cssMode && !params.centeredSlidesBounds) {
//         setCSSProperty(swiper.wrapperEl, '--swiper-centered-offset-before', `${-snapGrid[0]}px`);
//         setCSSProperty(
//           swiper.wrapperEl,
//           '--swiper-centered-offset-after',
//           `${swiper.size / 2 - slidesSizesGrid[slidesSizesGrid.length - 1] / 2}px`,
//         );
//         const addToSnapGrid = -swiper.snapGrid[0];
//         const addToSlidesGrid = -swiper.slidesGrid[0];
//         swiper.snapGrid = swiper.snapGrid.map((v) => v + addToSnapGrid);
//         swiper.slidesGrid = swiper.slidesGrid.map((v) => v + addToSlidesGrid);
//       }

//       if (slidesLength !== previousSlidesLength) {
//         swiper.emit('slidesLengthChange');
//       }

//       if (snapGrid.length !== previousSnapGridLength) {
//         if (swiper.params.watchOverflow) swiper.checkOverflow();
//         swiper.emit('snapGridLengthChange');
//       }

//       if (slidesGrid.length !== previousSlidesGridLength) {
//         swiper.emit('slidesGridLengthChange');
//       }

//       if (params.watchSlidesProgress) {
//         swiper.updateSlidesOffset();
//       }
//     }

//     function updateAutoHeight(speed) {
//       const swiper = this;
//       const activeSlides = [];
//       const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
//       let newHeight = 0;
//       let i;

//       if (typeof speed === 'number') {
//         swiper.setTransition(speed);
//       } else if (speed === true) {
//         swiper.setTransition(swiper.params.speed);
//       }

//       const getSlideByIndex = (index) => {
//         if (isVirtual) {
//           return swiper.slides.filter((el) => parseInt(el.getAttribute('data-swiper-slide-index'), 10) === index)[0];
//         }

//         return swiper.slides.eq(index)[0];
//       }; // Find slides currently in view

//       if (swiper.params.slidesPerView !== 'auto' && swiper.params.slidesPerView > 1) {
//         if (swiper.params.centeredSlides) {
//           swiper.visibleSlides.each((slide) => {
//             activeSlides.push(slide);
//           });
//         } else {
//           for (i = 0; i < Math.ceil(swiper.params.slidesPerView); i += 1) {
//             const index = swiper.activeIndex + i;
//             if (index > swiper.slides.length && !isVirtual) break;
//             activeSlides.push(getSlideByIndex(index));
//           }
//         }
//       } else {
//         activeSlides.push(getSlideByIndex(swiper.activeIndex));
//       } // Find new height from highest slide in view

//       for (i = 0; i < activeSlides.length; i += 1) {
//         if (typeof activeSlides[i] !== 'undefined') {
//           const height = activeSlides[i].offsetHeight;
//           newHeight = height > newHeight ? height : newHeight;
//         }
//       } // Update Height

//       if (newHeight || newHeight === 0) swiper.$wrapperEl.css('height', `${newHeight}px`);
//     }

//     function updateSlidesOffset() {
//       const swiper = this;
//       const slides = swiper.slides;

//       for (let i = 0; i < slides.length; i += 1) {
//         slides[i].swiperSlideOffset = swiper.isHorizontal() ? slides[i].offsetLeft : slides[i].offsetTop;
//       }
//     }

//     function updateSlidesProgress(translate = (this && this.translate) || 0) {
//       const swiper = this;
//       const params = swiper.params;
//       const {slides, rtlTranslate: rtl, snapGrid} = swiper;
//       if (slides.length === 0) return;
//       if (typeof slides[0].swiperSlideOffset === 'undefined') swiper.updateSlidesOffset();
//       let offsetCenter = -translate;
//       if (rtl) offsetCenter = translate; // Visible Slides

//       slides.removeClass(params.slideVisibleClass);
//       swiper.visibleSlidesIndexes = [];
//       swiper.visibleSlides = [];

//       for (let i = 0; i < slides.length; i += 1) {
//         const slide = slides[i];
//         let slideOffset = slide.swiperSlideOffset;

//         if (params.cssMode && params.centeredSlides) {
//           slideOffset -= slides[0].swiperSlideOffset;
//         }

//         const slideProgress =
//           (offsetCenter + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) /
//           (slide.swiperSlideSize + params.spaceBetween);
//         const originalSlideProgress =
//           (offsetCenter - snapGrid[0] + (params.centeredSlides ? swiper.minTranslate() : 0) - slideOffset) /
//           (slide.swiperSlideSize + params.spaceBetween);
//         const slideBefore = -(offsetCenter - slideOffset);
//         const slideAfter = slideBefore + swiper.slidesSizesGrid[i];
//         const isVisible =
//           (slideBefore >= 0 && slideBefore < swiper.size - 1) ||
//           (slideAfter > 1 && slideAfter <= swiper.size) ||
//           (slideBefore <= 0 && slideAfter >= swiper.size);

//         if (isVisible) {
//           swiper.visibleSlides.push(slide);
//           swiper.visibleSlidesIndexes.push(i);
//           slides.eq(i).addClass(params.slideVisibleClass);
//         }

//         slide.progress = rtl ? -slideProgress : slideProgress;
//         slide.originalProgress = rtl ? -originalSlideProgress : originalSlideProgress;
//       }

//       swiper.visibleSlides = $(swiper.visibleSlides);
//     }

//     function updateProgress(translate) {
//       const swiper = this;

//       if (typeof translate === 'undefined') {
//         const multiplier = swiper.rtlTranslate ? -1 : 1; // eslint-disable-next-line

//         translate = (swiper && swiper.translate && swiper.translate * multiplier) || 0;
//       }

//       const params = swiper.params;
//       const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();
//       let {progress, isBeginning, isEnd} = swiper;
//       const wasBeginning = isBeginning;
//       const wasEnd = isEnd;

//       if (translatesDiff === 0) {
//         progress = 0;
//         isBeginning = true;
//         isEnd = true;
//       } else {
//         progress = (translate - swiper.minTranslate()) / translatesDiff;
//         isBeginning = progress <= 0;
//         isEnd = progress >= 1;
//       }

//       Object.assign(swiper, {
//         progress,
//         isBeginning,
//         isEnd,
//       });
//       if (params.watchSlidesProgress || (params.centeredSlides && params.autoHeight))
//         swiper.updateSlidesProgress(translate);

//       if (isBeginning && !wasBeginning) {
//         swiper.emit('reachBeginning toEdge');
//       }

//       if (isEnd && !wasEnd) {
//         swiper.emit('reachEnd toEdge');
//       }

//       if ((wasBeginning && !isBeginning) || (wasEnd && !isEnd)) {
//         swiper.emit('fromEdge');
//       }

//       swiper.emit('progress', progress);
//     }

//     function updateSlidesClasses() {
//       const swiper = this;
//       const {slides, params, $wrapperEl, activeIndex, realIndex} = swiper;
//       const isVirtual = swiper.virtual && params.virtual.enabled;
//       slides.removeClass(
//         `${params.slideActiveClass} ${params.slideNextClass} ${params.slidePrevClass} ${params.slideDuplicateActiveClass} ${params.slideDuplicateNextClass} ${params.slideDuplicatePrevClass}`,
//       );
//       let activeSlide;

//       if (isVirtual) {
//         activeSlide = swiper.$wrapperEl.find(`.${params.slideClass}[data-swiper-slide-index="${activeIndex}"]`);
//       } else {
//         activeSlide = slides.eq(activeIndex);
//       } // Active classes

//       activeSlide.addClass(params.slideActiveClass);

//       if (params.loop) {
//         // Duplicate to all looped slides
//         if (activeSlide.hasClass(params.slideDuplicateClass)) {
//           $wrapperEl
//             .children(
//               `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${realIndex}"]`,
//             )
//             .addClass(params.slideDuplicateActiveClass);
//         } else {
//           $wrapperEl
//             .children(`.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${realIndex}"]`)
//             .addClass(params.slideDuplicateActiveClass);
//         }
//       } // Next Slide

//       let nextSlide = activeSlide.nextAll(`.${params.slideClass}`).eq(0).addClass(params.slideNextClass);

//       if (params.loop && nextSlide.length === 0) {
//         nextSlide = slides.eq(0);
//         nextSlide.addClass(params.slideNextClass);
//       } // Prev Slide

//       let prevSlide = activeSlide.prevAll(`.${params.slideClass}`).eq(0).addClass(params.slidePrevClass);

//       if (params.loop && prevSlide.length === 0) {
//         prevSlide = slides.eq(-1);
//         prevSlide.addClass(params.slidePrevClass);
//       }

//       if (params.loop) {
//         // Duplicate to all looped slides
//         if (nextSlide.hasClass(params.slideDuplicateClass)) {
//           $wrapperEl
//             .children(
//               `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${nextSlide.attr(
//                 'data-swiper-slide-index',
//               )}"]`,
//             )
//             .addClass(params.slideDuplicateNextClass);
//         } else {
//           $wrapperEl
//             .children(
//               `.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${nextSlide.attr(
//                 'data-swiper-slide-index',
//               )}"]`,
//             )
//             .addClass(params.slideDuplicateNextClass);
//         }

//         if (prevSlide.hasClass(params.slideDuplicateClass)) {
//           $wrapperEl
//             .children(
//               `.${params.slideClass}:not(.${params.slideDuplicateClass})[data-swiper-slide-index="${prevSlide.attr(
//                 'data-swiper-slide-index',
//               )}"]`,
//             )
//             .addClass(params.slideDuplicatePrevClass);
//         } else {
//           $wrapperEl
//             .children(
//               `.${params.slideClass}.${params.slideDuplicateClass}[data-swiper-slide-index="${prevSlide.attr(
//                 'data-swiper-slide-index',
//               )}"]`,
//             )
//             .addClass(params.slideDuplicatePrevClass);
//         }
//       }

//       swiper.emitSlidesClasses();
//     }

//     function updateActiveIndex(newActiveIndex) {
//       const swiper = this;
//       const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;
//       const {
//         slidesGrid,
//         snapGrid,
//         params,
//         activeIndex: previousIndex,
//         realIndex: previousRealIndex,
//         snapIndex: previousSnapIndex,
//       } = swiper;
//       let activeIndex = newActiveIndex;
//       let snapIndex;

//       if (typeof activeIndex === 'undefined') {
//         for (let i = 0; i < slidesGrid.length; i += 1) {
//           if (typeof slidesGrid[i + 1] !== 'undefined') {
//             if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1] - (slidesGrid[i + 1] - slidesGrid[i]) / 2) {
//               activeIndex = i;
//             } else if (translate >= slidesGrid[i] && translate < slidesGrid[i + 1]) {
//               activeIndex = i + 1;
//             }
//           } else if (translate >= slidesGrid[i]) {
//             activeIndex = i;
//           }
//         } // Normalize slideIndex

//         if (params.normalizeSlideIndex) {
//           if (activeIndex < 0 || typeof activeIndex === 'undefined') activeIndex = 0;
//         }
//       }

//       if (snapGrid.indexOf(translate) >= 0) {
//         snapIndex = snapGrid.indexOf(translate);
//       } else {
//         const skip = Math.min(params.slidesPerGroupSkip, activeIndex);
//         snapIndex = skip + Math.floor((activeIndex - skip) / params.slidesPerGroup);
//       }

//       if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

//       if (activeIndex === previousIndex) {
//         if (snapIndex !== previousSnapIndex) {
//           swiper.snapIndex = snapIndex;
//           swiper.emit('snapIndexChange');
//         }

//         return;
//       } // Get real index

//       const realIndex = parseInt(swiper.slides.eq(activeIndex).attr('data-swiper-slide-index') || activeIndex, 10);
//       Object.assign(swiper, {
//         snapIndex,
//         realIndex,
//         previousIndex,
//         activeIndex,
//       });
//       swiper.emit('activeIndexChange');
//       swiper.emit('snapIndexChange');

//       if (previousRealIndex !== realIndex) {
//         swiper.emit('realIndexChange');
//       }

//       if (swiper.initialized || swiper.params.runCallbacksOnInit) {
//         swiper.emit('slideChange');
//       }
//     }

//     function updateClickedSlide(e) {
//       const swiper = this;
//       const params = swiper.params;
//       const slide = $(e).closest(`.${params.slideClass}`)[0];
//       let slideFound = false;
//       let slideIndex;

//       if (slide) {
//         for (let i = 0; i < swiper.slides.length; i += 1) {
//           if (swiper.slides[i] === slide) {
//             slideFound = true;
//             slideIndex = i;
//             break;
//           }
//         }
//       }

//       if (slide && slideFound) {
//         swiper.clickedSlide = slide;

//         if (swiper.virtual && swiper.params.virtual.enabled) {
//           swiper.clickedIndex = parseInt($(slide).attr('data-swiper-slide-index'), 10);
//         } else {
//           swiper.clickedIndex = slideIndex;
//         }
//       } else {
//         swiper.clickedSlide = undefined;
//         swiper.clickedIndex = undefined;
//         return;
//       }

//       if (
//         params.slideToClickedSlide &&
//         swiper.clickedIndex !== undefined &&
//         swiper.clickedIndex !== swiper.activeIndex
//       ) {
//         swiper.slideToClickedSlide();
//       }
//     }

//     var update = {
//       updateSize,
//       updateSlides,
//       updateAutoHeight,
//       updateSlidesOffset,
//       updateSlidesProgress,
//       updateProgress,
//       updateSlidesClasses,
//       updateActiveIndex,
//       updateClickedSlide,
//     };

//     function getSwiperTranslate(axis = this.isHorizontal() ? 'x' : 'y') {
//       const swiper = this;
//       const {params, rtlTranslate: rtl, translate, $wrapperEl} = swiper;

//       if (params.virtualTranslate) {
//         return rtl ? -translate : translate;
//       }

//       if (params.cssMode) {
//         return translate;
//       }

//       let currentTranslate = getTranslate($wrapperEl[0], axis);
//       if (rtl) currentTranslate = -currentTranslate;
//       return currentTranslate || 0;
//     }

//     function setTranslate(translate, byController) {
//       const swiper = this;
//       const {rtlTranslate: rtl, params, $wrapperEl, wrapperEl, progress} = swiper;
//       let x = 0;
//       let y = 0;
//       const z = 0;

//       if (swiper.isHorizontal()) {
//         x = rtl ? -translate : translate;
//       } else {
//         y = translate;
//       }

//       if (params.roundLengths) {
//         x = Math.floor(x);
//         y = Math.floor(y);
//       }

//       if (params.cssMode) {
//         wrapperEl[swiper.isHorizontal() ? 'scrollLeft' : 'scrollTop'] = swiper.isHorizontal() ? -x : -y;
//       } else if (!params.virtualTranslate) {
//         $wrapperEl.transform(`translate3d(${x}px, ${y}px, ${z}px)`);
//       }

//       swiper.previousTranslate = swiper.translate;
//       swiper.translate = swiper.isHorizontal() ? x : y; // Check if we need to update progress

//       let newProgress;
//       const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

//       if (translatesDiff === 0) {
//         newProgress = 0;
//       } else {
//         newProgress = (translate - swiper.minTranslate()) / translatesDiff;
//       }

//       if (newProgress !== progress) {
//         swiper.updateProgress(translate);
//       }

//       swiper.emit('setTranslate', swiper.translate, byController);
//     }

//     function minTranslate() {
//       return -this.snapGrid[0];
//     }

//     function maxTranslate() {
//       return -this.snapGrid[this.snapGrid.length - 1];
//     }

//     function translateTo(
//       translate = 0,
//       speed = this.params.speed,
//       runCallbacks = true,
//       translateBounds = true,
//       internal,
//     ) {
//       const swiper = this;
//       const {params, wrapperEl} = swiper;

//       if (swiper.animating && params.preventInteractionOnTransition) {
//         return false;
//       }

//       const minTranslate = swiper.minTranslate();
//       const maxTranslate = swiper.maxTranslate();
//       let newTranslate;
//       if (translateBounds && translate > minTranslate) newTranslate = minTranslate;
//       else if (translateBounds && translate < maxTranslate) newTranslate = maxTranslate;
//       else newTranslate = translate; // Update progress

//       swiper.updateProgress(newTranslate);

//       if (params.cssMode) {
//         const isH = swiper.isHorizontal();

//         if (speed === 0) {
//           wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = -newTranslate;
//         } else {
//           if (!swiper.support.smoothScroll) {
//             animateCSSModeScroll({
//               swiper,
//               targetPosition: -newTranslate,
//               side: isH ? 'left' : 'top',
//             });
//             return true;
//           }

//           wrapperEl.scrollTo({
//             [isH ? 'left' : 'top']: -newTranslate,
//             behavior: 'smooth',
//           });
//         }

//         return true;
//       }

//       if (speed === 0) {
//         swiper.setTransition(0);
//         swiper.setTranslate(newTranslate);

//         if (runCallbacks) {
//           swiper.emit('beforeTransitionStart', speed, internal);
//           swiper.emit('transitionEnd');
//         }
//       } else {
//         swiper.setTransition(speed);
//         swiper.setTranslate(newTranslate);

//         if (runCallbacks) {
//           swiper.emit('beforeTransitionStart', speed, internal);
//           swiper.emit('transitionStart');
//         }

//         if (!swiper.animating) {
//           swiper.animating = true;

//           if (!swiper.onTranslateToWrapperTransitionEnd) {
//             swiper.onTranslateToWrapperTransitionEnd = function transitionEnd(e) {
//               if (!swiper || swiper.destroyed) return;
//               if (e.target !== this) return;
//               swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
//               swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
//               swiper.onTranslateToWrapperTransitionEnd = null;
//               delete swiper.onTranslateToWrapperTransitionEnd;

//               if (runCallbacks) {
//                 swiper.emit('transitionEnd');
//               }
//             };
//           }

//           swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onTranslateToWrapperTransitionEnd);
//           swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onTranslateToWrapperTransitionEnd);
//         }
//       }

//       return true;
//     }

//     var translate = {
//       getTranslate: getSwiperTranslate,
//       setTranslate,
//       minTranslate,
//       maxTranslate,
//       translateTo,
//     };

//     function setTransition(duration, byController) {
//       const swiper = this;

//       if (!swiper.params.cssMode) {
//         swiper.$wrapperEl.transition(duration);
//       }

//       swiper.emit('setTransition', duration, byController);
//     }

//     function transitionEmit({swiper, runCallbacks, direction, step}) {
//       const {activeIndex, previousIndex} = swiper;
//       let dir = direction;

//       if (!dir) {
//         if (activeIndex > previousIndex) dir = 'next';
//         else if (activeIndex < previousIndex) dir = 'prev';
//         else dir = 'reset';
//       }

//       swiper.emit(`transition${step}`);

//       if (runCallbacks && activeIndex !== previousIndex) {
//         if (dir === 'reset') {
//           swiper.emit(`slideResetTransition${step}`);
//           return;
//         }

//         swiper.emit(`slideChangeTransition${step}`);

//         if (dir === 'next') {
//           swiper.emit(`slideNextTransition${step}`);
//         } else {
//           swiper.emit(`slidePrevTransition${step}`);
//         }
//       }
//     }

//     function transitionStart(runCallbacks = true, direction) {
//       const swiper = this;
//       const {params} = swiper;
//       if (params.cssMode) return;

//       if (params.autoHeight) {
//         swiper.updateAutoHeight();
//       }

//       transitionEmit({
//         swiper,
//         runCallbacks,
//         direction,
//         step: 'Start',
//       });
//     }

//     function transitionEnd(runCallbacks = true, direction) {
//       const swiper = this;
//       const {params} = swiper;
//       swiper.animating = false;
//       if (params.cssMode) return;
//       swiper.setTransition(0);
//       transitionEmit({
//         swiper,
//         runCallbacks,
//         direction,
//         step: 'End',
//       });
//     }

//     var transition = {
//       setTransition,
//       transitionStart,
//       transitionEnd,
//     };

//     function slideTo(index = 0, speed = this.params.speed, runCallbacks = true, internal, initial) {
//       if (typeof index !== 'number' && typeof index !== 'string') {
//         throw new Error(
//           `The 'index' argument cannot have type other than 'number' or 'string'. [${typeof index}] given.`,
//         );
//       }

//       if (typeof index === 'string') {
//         /**
//          * The `index` argument converted from `string` to `number`.
//          * @type {number}
//          */
//         const indexAsNumber = parseInt(index, 10);
//         /**
//          * Determines whether the `index` argument is a valid `number`
//          * after being converted from the `string` type.
//          * @type {boolean}
//          */

//         const isValidNumber = isFinite(indexAsNumber);

//         if (!isValidNumber) {
//           throw new Error(`The passed-in 'index' (string) couldn't be converted to 'number'. [${index}] given.`);
//         } // Knowing that the converted `index` is a valid number,
//         // we can update the original argument's value.

//         index = indexAsNumber;
//       }

//       const swiper = this;
//       let slideIndex = index;
//       if (slideIndex < 0) slideIndex = 0;
//       const {params, snapGrid, slidesGrid, previousIndex, activeIndex, rtlTranslate: rtl, wrapperEl, enabled} = swiper;

//       if ((swiper.animating && params.preventInteractionOnTransition) || (!enabled && !internal && !initial)) {
//         return false;
//       }

//       const skip = Math.min(swiper.params.slidesPerGroupSkip, slideIndex);
//       let snapIndex = skip + Math.floor((slideIndex - skip) / swiper.params.slidesPerGroup);
//       if (snapIndex >= snapGrid.length) snapIndex = snapGrid.length - 1;

//       if ((activeIndex || params.initialSlide || 0) === (previousIndex || 0) && runCallbacks) {
//         swiper.emit('beforeSlideChangeStart');
//       }

//       const translate = -snapGrid[snapIndex]; // Update progress

//       swiper.updateProgress(translate); // Normalize slideIndex

//       if (params.normalizeSlideIndex) {
//         for (let i = 0; i < slidesGrid.length; i += 1) {
//           const normalizedTranslate = -Math.floor(translate * 100);
//           const normalizedGrid = Math.floor(slidesGrid[i] * 100);
//           const normalizedGridNext = Math.floor(slidesGrid[i + 1] * 100);

//           if (typeof slidesGrid[i + 1] !== 'undefined') {
//             if (
//               normalizedTranslate >= normalizedGrid &&
//               normalizedTranslate < normalizedGridNext - (normalizedGridNext - normalizedGrid) / 2
//             ) {
//               slideIndex = i;
//             } else if (normalizedTranslate >= normalizedGrid && normalizedTranslate < normalizedGridNext) {
//               slideIndex = i + 1;
//             }
//           } else if (normalizedTranslate >= normalizedGrid) {
//             slideIndex = i;
//           }
//         }
//       } // Directions locks

//       if (swiper.initialized && slideIndex !== activeIndex) {
//         if (!swiper.allowSlideNext && translate < swiper.translate && translate < swiper.minTranslate()) {
//           return false;
//         }

//         if (!swiper.allowSlidePrev && translate > swiper.translate && translate > swiper.maxTranslate()) {
//           if ((activeIndex || 0) !== slideIndex) return false;
//         }
//       }

//       let direction;
//       if (slideIndex > activeIndex) direction = 'next';
//       else if (slideIndex < activeIndex) direction = 'prev';
//       else direction = 'reset'; // Update Index

//       if ((rtl && -translate === swiper.translate) || (!rtl && translate === swiper.translate)) {
//         swiper.updateActiveIndex(slideIndex); // Update Height

//         if (params.autoHeight) {
//           swiper.updateAutoHeight();
//         }

//         swiper.updateSlidesClasses();

//         if (params.effect !== 'slide') {
//           swiper.setTranslate(translate);
//         }

//         if (direction !== 'reset') {
//           swiper.transitionStart(runCallbacks, direction);
//           swiper.transitionEnd(runCallbacks, direction);
//         }

//         return false;
//       }

//       if (params.cssMode) {
//         const isH = swiper.isHorizontal();
//         const t = rtl ? translate : -translate;

//         if (speed === 0) {
//           const isVirtual = swiper.virtual && swiper.params.virtual.enabled;

//           if (isVirtual) {
//             swiper.wrapperEl.style.scrollSnapType = 'none';
//             swiper._immediateVirtual = true;
//           }

//           wrapperEl[isH ? 'scrollLeft' : 'scrollTop'] = t;

//           if (isVirtual) {
//             requestAnimationFrame(() => {
//               swiper.wrapperEl.style.scrollSnapType = '';
//               swiper._swiperImmediateVirtual = false;
//             });
//           }
//         } else {
//           if (!swiper.support.smoothScroll) {
//             animateCSSModeScroll({
//               swiper,
//               targetPosition: t,
//               side: isH ? 'left' : 'top',
//             });
//             return true;
//           }

//           wrapperEl.scrollTo({
//             [isH ? 'left' : 'top']: t,
//             behavior: 'smooth',
//           });
//         }

//         return true;
//       }

//       swiper.setTransition(speed);
//       swiper.setTranslate(translate);
//       swiper.updateActiveIndex(slideIndex);
//       swiper.updateSlidesClasses();
//       swiper.emit('beforeTransitionStart', speed, internal);
//       swiper.transitionStart(runCallbacks, direction);

//       if (speed === 0) {
//         swiper.transitionEnd(runCallbacks, direction);
//       } else if (!swiper.animating) {
//         swiper.animating = true;

//         if (!swiper.onSlideToWrapperTransitionEnd) {
//           swiper.onSlideToWrapperTransitionEnd = function transitionEnd(e) {
//             if (!swiper || swiper.destroyed) return;
//             if (e.target !== this) return;
//             swiper.$wrapperEl[0].removeEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
//             swiper.$wrapperEl[0].removeEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
//             swiper.onSlideToWrapperTransitionEnd = null;
//             delete swiper.onSlideToWrapperTransitionEnd;
//             swiper.transitionEnd(runCallbacks, direction);
//           };
//         }

//         swiper.$wrapperEl[0].addEventListener('transitionend', swiper.onSlideToWrapperTransitionEnd);
//         swiper.$wrapperEl[0].addEventListener('webkitTransitionEnd', swiper.onSlideToWrapperTransitionEnd);
//       }

//       return true;
//     }

//     function slideToLoop(index = 0, speed = this.params.speed, runCallbacks = true, internal) {
//       const swiper = this;
//       let newIndex = index;

//       if (swiper.params.loop) {
//         newIndex += swiper.loopedSlides;
//       }

//       return swiper.slideTo(newIndex, speed, runCallbacks, internal);
//     }

//     /* eslint no-unused-vars: "off" */
//     function slideNext(speed = this.params.speed, runCallbacks = true, internal) {
//       const swiper = this;
//       const {animating, enabled, params} = swiper;
//       if (!enabled) return swiper;
//       let perGroup = params.slidesPerGroup;

//       if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
//         perGroup = Math.max(swiper.slidesPerViewDynamic('current', true), 1);
//       }

//       const increment = swiper.activeIndex < params.slidesPerGroupSkip ? 1 : perGroup;

//       if (params.loop) {
//         if (animating && params.loopPreventsSlide) return false;
//         swiper.loopFix(); // eslint-disable-next-line

//         swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
//       }

//       if (params.rewind && swiper.isEnd) {
//         return swiper.slideTo(0, speed, runCallbacks, internal);
//       }

//       return swiper.slideTo(swiper.activeIndex + increment, speed, runCallbacks, internal);
//     }

//     /* eslint no-unused-vars: "off" */
//     function slidePrev(speed = this.params.speed, runCallbacks = true, internal) {
//       const swiper = this;
//       const {params, animating, snapGrid, slidesGrid, rtlTranslate, enabled} = swiper;
//       if (!enabled) return swiper;

//       if (params.loop) {
//         if (animating && params.loopPreventsSlide) return false;
//         swiper.loopFix(); // eslint-disable-next-line

//         swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
//       }

//       const translate = rtlTranslate ? swiper.translate : -swiper.translate;

//       function normalize(val) {
//         if (val < 0) return -Math.floor(Math.abs(val));
//         return Math.floor(val);
//       }

//       const normalizedTranslate = normalize(translate);
//       const normalizedSnapGrid = snapGrid.map((val) => normalize(val));
//       let prevSnap = snapGrid[normalizedSnapGrid.indexOf(normalizedTranslate) - 1];

//       if (typeof prevSnap === 'undefined' && params.cssMode) {
//         let prevSnapIndex;
//         snapGrid.forEach((snap, snapIndex) => {
//           if (normalizedTranslate >= snap) {
//             // prevSnap = snap;
//             prevSnapIndex = snapIndex;
//           }
//         });

//         if (typeof prevSnapIndex !== 'undefined') {
//           prevSnap = snapGrid[prevSnapIndex > 0 ? prevSnapIndex - 1 : prevSnapIndex];
//         }
//       }

//       let prevIndex = 0;

//       if (typeof prevSnap !== 'undefined') {
//         prevIndex = slidesGrid.indexOf(prevSnap);
//         if (prevIndex < 0) prevIndex = swiper.activeIndex - 1;

//         if (params.slidesPerView === 'auto' && params.slidesPerGroup === 1 && params.slidesPerGroupAuto) {
//           prevIndex = prevIndex - swiper.slidesPerViewDynamic('previous', true) + 1;
//           prevIndex = Math.max(prevIndex, 0);
//         }
//       }

//       if (params.rewind && swiper.isBeginning) {
//         return swiper.slideTo(swiper.slides.length - 1, speed, runCallbacks, internal);
//       }

//       return swiper.slideTo(prevIndex, speed, runCallbacks, internal);
//     }

//     /* eslint no-unused-vars: "off" */
//     function slideReset(speed = this.params.speed, runCallbacks = true, internal) {
//       const swiper = this;
//       return swiper.slideTo(swiper.activeIndex, speed, runCallbacks, internal);
//     }

//     /* eslint no-unused-vars: "off" */
//     function slideToClosest(speed = this.params.speed, runCallbacks = true, internal, threshold = 0.5) {
//       const swiper = this;
//       let index = swiper.activeIndex;
//       const skip = Math.min(swiper.params.slidesPerGroupSkip, index);
//       const snapIndex = skip + Math.floor((index - skip) / swiper.params.slidesPerGroup);
//       const translate = swiper.rtlTranslate ? swiper.translate : -swiper.translate;

//       if (translate >= swiper.snapGrid[snapIndex]) {
//         // The current translate is on or after the current snap index, so the choice
//         // is between the current index and the one after it.
//         const currentSnap = swiper.snapGrid[snapIndex];
//         const nextSnap = swiper.snapGrid[snapIndex + 1];

//         if (translate - currentSnap > (nextSnap - currentSnap) * threshold) {
//           index += swiper.params.slidesPerGroup;
//         }
//       } else {
//         // The current translate is before the current snap index, so the choice
//         // is between the current index and the one before it.
//         const prevSnap = swiper.snapGrid[snapIndex - 1];
//         const currentSnap = swiper.snapGrid[snapIndex];

//         if (translate - prevSnap <= (currentSnap - prevSnap) * threshold) {
//           index -= swiper.params.slidesPerGroup;
//         }
//       }

//       index = Math.max(index, 0);
//       index = Math.min(index, swiper.slidesGrid.length - 1);
//       return swiper.slideTo(index, speed, runCallbacks, internal);
//     }

//     function slideToClickedSlide() {
//       const swiper = this;
//       const {params, $wrapperEl} = swiper;
//       const slidesPerView = params.slidesPerView === 'auto' ? swiper.slidesPerViewDynamic() : params.slidesPerView;
//       let slideToIndex = swiper.clickedIndex;
//       let realIndex;

//       if (params.loop) {
//         if (swiper.animating) return;
//         realIndex = parseInt($(swiper.clickedSlide).attr('data-swiper-slide-index'), 10);

//         if (params.centeredSlides) {
//           if (
//             slideToIndex < swiper.loopedSlides - slidesPerView / 2 ||
//             slideToIndex > swiper.slides.length - swiper.loopedSlides + slidesPerView / 2
//           ) {
//             swiper.loopFix();
//             slideToIndex = $wrapperEl
//               .children(
//                 `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
//               )
//               .eq(0)
//               .index();
//             nextTick(() => {
//               swiper.slideTo(slideToIndex);
//             });
//           } else {
//             swiper.slideTo(slideToIndex);
//           }
//         } else if (slideToIndex > swiper.slides.length - slidesPerView) {
//           swiper.loopFix();
//           slideToIndex = $wrapperEl
//             .children(
//               `.${params.slideClass}[data-swiper-slide-index="${realIndex}"]:not(.${params.slideDuplicateClass})`,
//             )
//             .eq(0)
//             .index();
//           nextTick(() => {
//             swiper.slideTo(slideToIndex);
//           });
//         } else {
//           swiper.slideTo(slideToIndex);
//         }
//       } else {
//         swiper.slideTo(slideToIndex);
//       }
//     }

//     var slide = {
//       slideTo,
//       slideToLoop,
//       slideNext,
//       slidePrev,
//       slideReset,
//       slideToClosest,
//       slideToClickedSlide,
//     };

//     function loopCreate() {
//       const swiper = this;
//       const document = getDocument();
//       const {params, $wrapperEl} = swiper; // Remove duplicated slides

//       const $selector = $wrapperEl.children().length > 0 ? $($wrapperEl.children()[0].parentNode) : $wrapperEl;
//       $selector.children(`.${params.slideClass}.${params.slideDuplicateClass}`).remove();
//       let slides = $selector.children(`.${params.slideClass}`);

//       if (params.loopFillGroupWithBlank) {
//         const blankSlidesNum = params.slidesPerGroup - (slides.length % params.slidesPerGroup);

//         if (blankSlidesNum !== params.slidesPerGroup) {
//           for (let i = 0; i < blankSlidesNum; i += 1) {
//             const blankNode = $(document.createElement('div')).addClass(
//               `${params.slideClass} ${params.slideBlankClass}`,
//             );
//             $selector.append(blankNode);
//           }

//           slides = $selector.children(`.${params.slideClass}`);
//         }
//       }

//       if (params.slidesPerView === 'auto' && !params.loopedSlides) params.loopedSlides = slides.length;
//       swiper.loopedSlides = Math.ceil(parseFloat(params.loopedSlides || params.slidesPerView, 10));
//       swiper.loopedSlides += params.loopAdditionalSlides;

//       if (swiper.loopedSlides > slides.length) {
//         swiper.loopedSlides = slides.length;
//       }

//       const prependSlides = [];
//       const appendSlides = [];
//       slides.each((el, index) => {
//         const slide = $(el);

//         if (index < swiper.loopedSlides) {
//           appendSlides.push(el);
//         }

//         if (index < slides.length && index >= slides.length - swiper.loopedSlides) {
//           prependSlides.push(el);
//         }

//         slide.attr('data-swiper-slide-index', index);
//       });

//       for (let i = 0; i < appendSlides.length; i += 1) {
//         $selector.append($(appendSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
//       }

//       for (let i = prependSlides.length - 1; i >= 0; i -= 1) {
//         $selector.prepend($(prependSlides[i].cloneNode(true)).addClass(params.slideDuplicateClass));
//       }
//     }

//     function loopFix() {
//       const swiper = this;
//       swiper.emit('beforeLoopFix');
//       const {activeIndex, slides, loopedSlides, allowSlidePrev, allowSlideNext, snapGrid, rtlTranslate: rtl} = swiper;
//       let newIndex;
//       swiper.allowSlidePrev = true;
//       swiper.allowSlideNext = true;
//       const snapTranslate = -snapGrid[activeIndex];
//       const diff = snapTranslate - swiper.getTranslate(); // Fix For Negative Oversliding

//       if (activeIndex < loopedSlides) {
//         newIndex = slides.length - loopedSlides * 3 + activeIndex;
//         newIndex += loopedSlides;
//         const slideChanged = swiper.slideTo(newIndex, 0, false, true);

//         if (slideChanged && diff !== 0) {
//           swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
//         }
//       } else if (activeIndex >= slides.length - loopedSlides) {
//         // Fix For Positive Oversliding
//         newIndex = -slides.length + activeIndex + loopedSlides;
//         newIndex += loopedSlides;
//         const slideChanged = swiper.slideTo(newIndex, 0, false, true);

//         if (slideChanged && diff !== 0) {
//           swiper.setTranslate((rtl ? -swiper.translate : swiper.translate) - diff);
//         }
//       }

//       swiper.allowSlidePrev = allowSlidePrev;
//       swiper.allowSlideNext = allowSlideNext;
//       swiper.emit('loopFix');
//     }

//     function loopDestroy() {
//       const swiper = this;
//       const {$wrapperEl, params, slides} = swiper;
//       $wrapperEl
//         .children(`.${params.slideClass}.${params.slideDuplicateClass},.${params.slideClass}.${params.slideBlankClass}`)
//         .remove();
//       slides.removeAttr('data-swiper-slide-index');
//     }

//     var loop = {
//       loopCreate,
//       loopFix,
//       loopDestroy,
//     };

//     function setGrabCursor(moving) {
//       const swiper = this;
//       if (
//         swiper.support.touch ||
//         !swiper.params.simulateTouch ||
//         (swiper.params.watchOverflow && swiper.isLocked) ||
//         swiper.params.cssMode
//       )
//         return;
//       const el = swiper.params.touchEventsTarget === 'container' ? swiper.el : swiper.wrapperEl;
//       el.style.cursor = 'move';
//       el.style.cursor = moving ? '-webkit-grabbing' : '-webkit-grab';
//       el.style.cursor = moving ? '-moz-grabbin' : '-moz-grab';
//       el.style.cursor = moving ? 'grabbing' : 'grab';
//     }

//     function unsetGrabCursor() {
//       const swiper = this;

//       if (swiper.support.touch || (swiper.params.watchOverflow && swiper.isLocked) || swiper.params.cssMode) {
//         return;
//       }

//       swiper[swiper.params.touchEventsTarget === 'container' ? 'el' : 'wrapperEl'].style.cursor = '';
//     }

//     var grabCursor = {
//       setGrabCursor,
//       unsetGrabCursor,
//     };

//     function closestElement(selector, base = this) {
//       function __closestFrom(el) {
//         if (!el || el === getDocument() || el === getWindow()) return null;
//         if (el.assignedSlot) el = el.assignedSlot;
//         const found = el.closest(selector);
//         return found || __closestFrom(el.getRootNode().host);
//       }

//       return __closestFrom(base);
//     }

//     function onTouchStart(event) {
//       const swiper = this;
//       const document = getDocument();
//       const window = getWindow();
//       const data = swiper.touchEventsData;
//       const {params, touches, enabled} = swiper;
//       if (!enabled) return;

//       if (swiper.animating && params.preventInteractionOnTransition) {
//         return;
//       }

//       if (!swiper.animating && params.cssMode && params.loop) {
//         swiper.loopFix();
//       }

//       let e = event;
//       if (e.originalEvent) e = e.originalEvent;
//       let $targetEl = $(e.target);

//       if (params.touchEventsTarget === 'wrapper') {
//         if (!$targetEl.closest(swiper.wrapperEl).length) return;
//       }

//       data.isTouchEvent = e.type === 'touchstart';
//       if (!data.isTouchEvent && 'which' in e && e.which === 3) return;
//       if (!data.isTouchEvent && 'button' in e && e.button > 0) return;
//       if (data.isTouched && data.isMoved) return; // change target el for shadow root component

//       const swipingClassHasValue = !!params.noSwipingClass && params.noSwipingClass !== '';

//       if (swipingClassHasValue && e.target && e.target.shadowRoot && event.path && event.path[0]) {
//         $targetEl = $(event.path[0]);
//       }

//       const noSwipingSelector = params.noSwipingSelector ? params.noSwipingSelector : `.${params.noSwipingClass}`;
//       const isTargetShadow = !!(e.target && e.target.shadowRoot); // use closestElement for shadow root element to get the actual closest for nested shadow root element

//       if (
//         params.noSwiping &&
//         (isTargetShadow ? closestElement(noSwipingSelector, e.target) : $targetEl.closest(noSwipingSelector)[0])
//       ) {
//         swiper.allowClick = true;
//         return;
//       }

//       if (params.swipeHandler) {
//         if (!$targetEl.closest(params.swipeHandler)[0]) return;
//       }

//       touches.currentX = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
//       touches.currentY = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
//       const startX = touches.currentX;
//       const startY = touches.currentY; // Do NOT start if iOS edge swipe is detected. Otherwise iOS app cannot swipe-to-go-back anymore

//       const edgeSwipeDetection = params.edgeSwipeDetection || params.iOSEdgeSwipeDetection;
//       const edgeSwipeThreshold = params.edgeSwipeThreshold || params.iOSEdgeSwipeThreshold;

//       if (edgeSwipeDetection && (startX <= edgeSwipeThreshold || startX >= window.innerWidth - edgeSwipeThreshold)) {
//         if (edgeSwipeDetection === 'prevent') {
//           event.preventDefault();
//         } else {
//           return;
//         }
//       }

//       Object.assign(data, {
//         isTouched: true,
//         isMoved: false,
//         allowTouchCallbacks: true,
//         isScrolling: undefined,
//         startMoving: undefined,
//       });
//       touches.startX = startX;
//       touches.startY = startY;
//       data.touchStartTime = now();
//       swiper.allowClick = true;
//       swiper.updateSize();
//       swiper.swipeDirection = undefined;
//       if (params.threshold > 0) data.allowThresholdMove = false;

//       if (e.type !== 'touchstart') {
//         let preventDefault = true;
//         if ($targetEl.is(data.focusableElements)) preventDefault = false;

//         if (
//           document.activeElement &&
//           $(document.activeElement).is(data.focusableElements) &&
//           document.activeElement !== $targetEl[0]
//         ) {
//           document.activeElement.blur();
//         }

//         const shouldPreventDefault = preventDefault && swiper.allowTouchMove && params.touchStartPreventDefault;

//         if ((params.touchStartForcePreventDefault || shouldPreventDefault) && !$targetEl[0].isContentEditable) {
//           e.preventDefault();
//         }
//       }

//       swiper.emit('touchStart', e);
//     }

//     function onTouchMove(event) {
//       const document = getDocument();
//       const swiper = this;
//       const data = swiper.touchEventsData;
//       const {params, touches, rtlTranslate: rtl, enabled} = swiper;
//       if (!enabled) return;
//       let e = event;
//       if (e.originalEvent) e = e.originalEvent;

//       if (!data.isTouched) {
//         if (data.startMoving && data.isScrolling) {
//           swiper.emit('touchMoveOpposite', e);
//         }

//         return;
//       }

//       if (data.isTouchEvent && e.type !== 'touchmove') return;
//       const targetTouch = e.type === 'touchmove' && e.targetTouches && (e.targetTouches[0] || e.changedTouches[0]);
//       const pageX = e.type === 'touchmove' ? targetTouch.pageX : e.pageX;
//       const pageY = e.type === 'touchmove' ? targetTouch.pageY : e.pageY;

//       if (e.preventedByNestedSwiper) {
//         touches.startX = pageX;
//         touches.startY = pageY;
//         return;
//       }

//       if (!swiper.allowTouchMove) {
//         // isMoved = true;
//         swiper.allowClick = false;

//         if (data.isTouched) {
//           Object.assign(touches, {
//             startX: pageX,
//             startY: pageY,
//             currentX: pageX,
//             currentY: pageY,
//           });
//           data.touchStartTime = now();
//         }

//         return;
//       }

//       if (data.isTouchEvent && params.touchReleaseOnEdges && !params.loop) {
//         if (swiper.isVertical()) {
//           // Vertical
//           if (
//             (pageY < touches.startY && swiper.translate <= swiper.maxTranslate()) ||
//             (pageY > touches.startY && swiper.translate >= swiper.minTranslate())
//           ) {
//             data.isTouched = false;
//             data.isMoved = false;
//             return;
//           }
//         } else if (
//           (pageX < touches.startX && swiper.translate <= swiper.maxTranslate()) ||
//           (pageX > touches.startX && swiper.translate >= swiper.minTranslate())
//         ) {
//           return;
//         }
//       }

//       if (data.isTouchEvent && document.activeElement) {
//         if (e.target === document.activeElement && $(e.target).is(data.focusableElements)) {
//           data.isMoved = true;
//           swiper.allowClick = false;
//           return;
//         }
//       }

//       if (data.allowTouchCallbacks) {
//         swiper.emit('touchMove', e);
//       }

//       if (e.targetTouches && e.targetTouches.length > 1) return;
//       touches.currentX = pageX;
//       touches.currentY = pageY;
//       const diffX = touches.currentX - touches.startX;
//       const diffY = touches.currentY - touches.startY;
//       if (swiper.params.threshold && Math.sqrt(diffX ** 2 + diffY ** 2) < swiper.params.threshold) return;

//       if (typeof data.isScrolling === 'undefined') {
//         let touchAngle;

//         if (
//           (swiper.isHorizontal() && touches.currentY === touches.startY) ||
//           (swiper.isVertical() && touches.currentX === touches.startX)
//         ) {
//           data.isScrolling = false;
//         } else {
//           // eslint-disable-next-line
//           if (diffX * diffX + diffY * diffY >= 25) {
//             touchAngle = (Math.atan2(Math.abs(diffY), Math.abs(diffX)) * 180) / Math.PI;
//             data.isScrolling = swiper.isHorizontal()
//               ? touchAngle > params.touchAngle
//               : 90 - touchAngle > params.touchAngle;
//           }
//         }
//       }

//       if (data.isScrolling) {
//         swiper.emit('touchMoveOpposite', e);
//       }

//       if (typeof data.startMoving === 'undefined') {
//         if (touches.currentX !== touches.startX || touches.currentY !== touches.startY) {
//           data.startMoving = true;
//         }
//       }

//       if (data.isScrolling) {
//         data.isTouched = false;
//         return;
//       }

//       if (!data.startMoving) {
//         return;
//       }

//       swiper.allowClick = false;

//       if (!params.cssMode && e.cancelable) {
//         e.preventDefault();
//       }

//       if (params.touchMoveStopPropagation && !params.nested) {
//         e.stopPropagation();
//       }

//       if (!data.isMoved) {
//         if (params.loop && !params.cssMode) {
//           swiper.loopFix();
//         }

//         data.startTranslate = swiper.getTranslate();
//         swiper.setTransition(0);

//         if (swiper.animating) {
//           swiper.$wrapperEl.trigger('webkitTransitionEnd transitionend');
//         }

//         data.allowMomentumBounce = false; // Grab Cursor

//         if (params.grabCursor && (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)) {
//           swiper.setGrabCursor(true);
//         }

//         swiper.emit('sliderFirstMove', e);
//       }

//       swiper.emit('sliderMove', e);
//       data.isMoved = true;
//       let diff = swiper.isHorizontal() ? diffX : diffY;
//       touches.diff = diff;
//       diff *= params.touchRatio;
//       if (rtl) diff = -diff;
//       swiper.swipeDirection = diff > 0 ? 'prev' : 'next';
//       data.currentTranslate = diff + data.startTranslate;
//       let disableParentSwiper = true;
//       let resistanceRatio = params.resistanceRatio;

//       if (params.touchReleaseOnEdges) {
//         resistanceRatio = 0;
//       }

//       if (diff > 0 && data.currentTranslate > swiper.minTranslate()) {
//         disableParentSwiper = false;
//         if (params.resistance)
//           data.currentTranslate =
//             swiper.minTranslate() - 1 + (-swiper.minTranslate() + data.startTranslate + diff) ** resistanceRatio;
//       } else if (diff < 0 && data.currentTranslate < swiper.maxTranslate()) {
//         disableParentSwiper = false;
//         if (params.resistance)
//           data.currentTranslate =
//             swiper.maxTranslate() + 1 - (swiper.maxTranslate() - data.startTranslate - diff) ** resistanceRatio;
//       }

//       if (disableParentSwiper) {
//         e.preventedByNestedSwiper = true;
//       } // Directions locks

//       if (!swiper.allowSlideNext && swiper.swipeDirection === 'next' && data.currentTranslate < data.startTranslate) {
//         data.currentTranslate = data.startTranslate;
//       }

//       if (!swiper.allowSlidePrev && swiper.swipeDirection === 'prev' && data.currentTranslate > data.startTranslate) {
//         data.currentTranslate = data.startTranslate;
//       }

//       if (!swiper.allowSlidePrev && !swiper.allowSlideNext) {
//         data.currentTranslate = data.startTranslate;
//       } // Threshold

//       if (params.threshold > 0) {
//         if (Math.abs(diff) > params.threshold || data.allowThresholdMove) {
//           if (!data.allowThresholdMove) {
//             data.allowThresholdMove = true;
//             touches.startX = touches.currentX;
//             touches.startY = touches.currentY;
//             data.currentTranslate = data.startTranslate;
//             touches.diff = swiper.isHorizontal()
//               ? touches.currentX - touches.startX
//               : touches.currentY - touches.startY;
//             return;
//           }
//         } else {
//           data.currentTranslate = data.startTranslate;
//           return;
//         }
//       }

//       if (!params.followFinger || params.cssMode) return; // Update active index in free mode

//       if ((params.freeMode && params.freeMode.enabled && swiper.freeMode) || params.watchSlidesProgress) {
//         swiper.updateActiveIndex();
//         swiper.updateSlidesClasses();
//       }

//       if (swiper.params.freeMode && params.freeMode.enabled && swiper.freeMode) {
//         swiper.freeMode.onTouchMove();
//       } // Update progress

//       swiper.updateProgress(data.currentTranslate); // Update translate

//       swiper.setTranslate(data.currentTranslate);
//     }

//     function onTouchEnd(event) {
//       const swiper = this;
//       const data = swiper.touchEventsData;
//       const {params, touches, rtlTranslate: rtl, slidesGrid, enabled} = swiper;
//       if (!enabled) return;
//       let e = event;
//       if (e.originalEvent) e = e.originalEvent;

//       if (data.allowTouchCallbacks) {
//         swiper.emit('touchEnd', e);
//       }

//       data.allowTouchCallbacks = false;

//       if (!data.isTouched) {
//         if (data.isMoved && params.grabCursor) {
//           swiper.setGrabCursor(false);
//         }

//         data.isMoved = false;
//         data.startMoving = false;
//         return;
//       } // Return Grab Cursor

//       if (
//         params.grabCursor &&
//         data.isMoved &&
//         data.isTouched &&
//         (swiper.allowSlideNext === true || swiper.allowSlidePrev === true)
//       ) {
//         swiper.setGrabCursor(false);
//       } // Time diff

//       const touchEndTime = now();
//       const timeDiff = touchEndTime - data.touchStartTime; // Tap, doubleTap, Click

//       if (swiper.allowClick) {
//         const pathTree = e.path || (e.composedPath && e.composedPath());
//         swiper.updateClickedSlide((pathTree && pathTree[0]) || e.target);
//         swiper.emit('tap click', e);

//         if (timeDiff < 300 && touchEndTime - data.lastClickTime < 300) {
//           swiper.emit('doubleTap doubleClick', e);
//         }
//       }

//       data.lastClickTime = now();
//       nextTick(() => {
//         if (!swiper.destroyed) swiper.allowClick = true;
//       });

//       if (
//         !data.isTouched ||
//         !data.isMoved ||
//         !swiper.swipeDirection ||
//         touches.diff === 0 ||
//         data.currentTranslate === data.startTranslate
//       ) {
//         data.isTouched = false;
//         data.isMoved = false;
//         data.startMoving = false;
//         return;
//       }

//       data.isTouched = false;
//       data.isMoved = false;
//       data.startMoving = false;
//       let currentPos;

//       if (params.followFinger) {
//         currentPos = rtl ? swiper.translate : -swiper.translate;
//       } else {
//         currentPos = -data.currentTranslate;
//       }

//       if (params.cssMode) {
//         return;
//       }

//       if (swiper.params.freeMode && params.freeMode.enabled) {
//         swiper.freeMode.onTouchEnd({
//           currentPos,
//         });
//         return;
//       } // Find current slide

//       let stopIndex = 0;
//       let groupSize = swiper.slidesSizesGrid[0];

//       for (let i = 0; i < slidesGrid.length; i += i < params.slidesPerGroupSkip ? 1 : params.slidesPerGroup) {
//         const increment = i < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

//         if (typeof slidesGrid[i + increment] !== 'undefined') {
//           if (currentPos >= slidesGrid[i] && currentPos < slidesGrid[i + increment]) {
//             stopIndex = i;
//             groupSize = slidesGrid[i + increment] - slidesGrid[i];
//           }
//         } else if (currentPos >= slidesGrid[i]) {
//           stopIndex = i;
//           groupSize = slidesGrid[slidesGrid.length - 1] - slidesGrid[slidesGrid.length - 2];
//         }
//       } // Find current slide size

//       const ratio = (currentPos - slidesGrid[stopIndex]) / groupSize;
//       const increment = stopIndex < params.slidesPerGroupSkip - 1 ? 1 : params.slidesPerGroup;

//       if (timeDiff > params.longSwipesMs) {
//         // Long touches
//         if (!params.longSwipes) {
//           swiper.slideTo(swiper.activeIndex);
//           return;
//         }

//         if (swiper.swipeDirection === 'next') {
//           if (ratio >= params.longSwipesRatio) swiper.slideTo(stopIndex + increment);
//           else swiper.slideTo(stopIndex);
//         }

//         if (swiper.swipeDirection === 'prev') {
//           if (ratio > 1 - params.longSwipesRatio) swiper.slideTo(stopIndex + increment);
//           else swiper.slideTo(stopIndex);
//         }
//       } else {
//         // Short swipes
//         if (!params.shortSwipes) {
//           swiper.slideTo(swiper.activeIndex);
//           return;
//         }

//         const isNavButtonTarget =
//           swiper.navigation && (e.target === swiper.navigation.nextEl || e.target === swiper.navigation.prevEl);

//         if (!isNavButtonTarget) {
//           if (swiper.swipeDirection === 'next') {
//             swiper.slideTo(stopIndex + increment);
//           }

//           if (swiper.swipeDirection === 'prev') {
//             swiper.slideTo(stopIndex);
//           }
//         } else if (e.target === swiper.navigation.nextEl) {
//           swiper.slideTo(stopIndex + increment);
//         } else {
//           swiper.slideTo(stopIndex);
//         }
//       }
//     }

//     function onResize() {
//       const swiper = this;
//       const {params, el} = swiper;
//       if (el && el.offsetWidth === 0) return; // Breakpoints

//       if (params.breakpoints) {
//         swiper.setBreakpoint();
//       } // Save locks

//       const {allowSlideNext, allowSlidePrev, snapGrid} = swiper; // Disable locks on resize

//       swiper.allowSlideNext = true;
//       swiper.allowSlidePrev = true;
//       swiper.updateSize();
//       swiper.updateSlides();
//       swiper.updateSlidesClasses();

//       if (
//         (params.slidesPerView === 'auto' || params.slidesPerView > 1) &&
//         swiper.isEnd &&
//         !swiper.isBeginning &&
//         !swiper.params.centeredSlides
//       ) {
//         swiper.slideTo(swiper.slides.length - 1, 0, false, true);
//       } else {
//         swiper.slideTo(swiper.activeIndex, 0, false, true);
//       }

//       if (swiper.autoplay && swiper.autoplay.running && swiper.autoplay.paused) {
//         swiper.autoplay.run();
//       } // Return locks after resize

//       swiper.allowSlidePrev = allowSlidePrev;
//       swiper.allowSlideNext = allowSlideNext;

//       if (swiper.params.watchOverflow && snapGrid !== swiper.snapGrid) {
//         swiper.checkOverflow();
//       }
//     }

//     function onClick(e) {
//       const swiper = this;
//       if (!swiper.enabled) return;

//       if (!swiper.allowClick) {
//         if (swiper.params.preventClicks) e.preventDefault();

//         if (swiper.params.preventClicksPropagation && swiper.animating) {
//           e.stopPropagation();
//           e.stopImmediatePropagation();
//         }
//       }
//     }

//     function onScroll() {
//       const swiper = this;
//       const {wrapperEl, rtlTranslate, enabled} = swiper;
//       if (!enabled) return;
//       swiper.previousTranslate = swiper.translate;

//       if (swiper.isHorizontal()) {
//         swiper.translate = -wrapperEl.scrollLeft;
//       } else {
//         swiper.translate = -wrapperEl.scrollTop;
//       } // eslint-disable-next-line

//       if (swiper.translate === -0) swiper.translate = 0;
//       swiper.updateActiveIndex();
//       swiper.updateSlidesClasses();
//       let newProgress;
//       const translatesDiff = swiper.maxTranslate() - swiper.minTranslate();

//       if (translatesDiff === 0) {
//         newProgress = 0;
//       } else {
//         newProgress = (swiper.translate - swiper.minTranslate()) / translatesDiff;
//       }

//       if (newProgress !== swiper.progress) {
//         swiper.updateProgress(rtlTranslate ? -swiper.translate : swiper.translate);
//       }

//       swiper.emit('setTranslate', swiper.translate, false);
//     }

//     let dummyEventAttached = false;

//     function dummyEventListener() {}

//     const events = (swiper, method) => {
//       const document = getDocument();
//       const {params, touchEvents, el, wrapperEl, device, support} = swiper;
//       const capture = !!params.nested;
//       const domMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';
//       const swiperMethod = method; // Touch Events

//       if (!support.touch) {
//         el[domMethod](touchEvents.start, swiper.onTouchStart, false);
//         document[domMethod](touchEvents.move, swiper.onTouchMove, capture);
//         document[domMethod](touchEvents.end, swiper.onTouchEnd, false);
//       } else {
//         const passiveListener =
//           touchEvents.start === 'touchstart' && support.passiveListener && params.passiveListeners
//             ? {
//                 passive: true,
//                 capture: false,
//               }
//             : false;
//         el[domMethod](touchEvents.start, swiper.onTouchStart, passiveListener);
//         el[domMethod](
//           touchEvents.move,
//           swiper.onTouchMove,
//           support.passiveListener
//             ? {
//                 passive: false,
//                 capture,
//               }
//             : capture,
//         );
//         el[domMethod](touchEvents.end, swiper.onTouchEnd, passiveListener);

//         if (touchEvents.cancel) {
//           el[domMethod](touchEvents.cancel, swiper.onTouchEnd, passiveListener);
//         }
//       } // Prevent Links Clicks

//       if (params.preventClicks || params.preventClicksPropagation) {
//         el[domMethod]('click', swiper.onClick, true);
//       }

//       if (params.cssMode) {
//         wrapperEl[domMethod]('scroll', swiper.onScroll);
//       } // Resize handler

//       if (params.updateOnWindowResize) {
//         swiper[swiperMethod](
//           device.ios || device.android ? 'resize orientationchange observerUpdate' : 'resize observerUpdate',
//           onResize,
//           true,
//         );
//       } else {
//         swiper[swiperMethod]('observerUpdate', onResize, true);
//       }
//     };

//     function attachEvents() {
//       const swiper = this;
//       const document = getDocument();
//       const {params, support} = swiper;
//       swiper.onTouchStart = onTouchStart.bind(swiper);
//       swiper.onTouchMove = onTouchMove.bind(swiper);
//       swiper.onTouchEnd = onTouchEnd.bind(swiper);

//       if (params.cssMode) {
//         swiper.onScroll = onScroll.bind(swiper);
//       }

//       swiper.onClick = onClick.bind(swiper);

//       if (support.touch && !dummyEventAttached) {
//         document.addEventListener('touchstart', dummyEventListener);
//         dummyEventAttached = true;
//       }

//       events(swiper, 'on');
//     }

//     function detachEvents() {
//       const swiper = this;
//       events(swiper, 'off');
//     }

//     var events$1 = {
//       attachEvents,
//       detachEvents,
//     };

//     const isGridEnabled = (swiper, params) => {
//       return swiper.grid && params.grid && params.grid.rows > 1;
//     };

//     function setBreakpoint() {
//       const swiper = this;
//       const {activeIndex, initialized, loopedSlides = 0, params, $el} = swiper;
//       const breakpoints = params.breakpoints;
//       if (!breakpoints || (breakpoints && Object.keys(breakpoints).length === 0)) return; // Get breakpoint for window width and update parameters

//       const breakpoint = swiper.getBreakpoint(breakpoints, swiper.params.breakpointsBase, swiper.el);
//       if (!breakpoint || swiper.currentBreakpoint === breakpoint) return;
//       const breakpointOnlyParams = breakpoint in breakpoints ? breakpoints[breakpoint] : undefined;
//       const breakpointParams = breakpointOnlyParams || swiper.originalParams;
//       const wasMultiRow = isGridEnabled(swiper, params);
//       const isMultiRow = isGridEnabled(swiper, breakpointParams);
//       const wasEnabled = params.enabled;

//       if (wasMultiRow && !isMultiRow) {
//         $el.removeClass(`${params.containerModifierClass}grid ${params.containerModifierClass}grid-column`);
//         swiper.emitContainerClasses();
//       } else if (!wasMultiRow && isMultiRow) {
//         $el.addClass(`${params.containerModifierClass}grid`);

//         if (
//           (breakpointParams.grid.fill && breakpointParams.grid.fill === 'column') ||
//           (!breakpointParams.grid.fill && params.grid.fill === 'column')
//         ) {
//           $el.addClass(`${params.containerModifierClass}grid-column`);
//         }

//         swiper.emitContainerClasses();
//       }

//       const directionChanged = breakpointParams.direction && breakpointParams.direction !== params.direction;
//       const needsReLoop = params.loop && (breakpointParams.slidesPerView !== params.slidesPerView || directionChanged);

//       if (directionChanged && initialized) {
//         swiper.changeDirection();
//       }

//       extend(swiper.params, breakpointParams);
//       const isEnabled = swiper.params.enabled;
//       Object.assign(swiper, {
//         allowTouchMove: swiper.params.allowTouchMove,
//         allowSlideNext: swiper.params.allowSlideNext,
//         allowSlidePrev: swiper.params.allowSlidePrev,
//       });

//       if (wasEnabled && !isEnabled) {
//         swiper.disable();
//       } else if (!wasEnabled && isEnabled) {
//         swiper.enable();
//       }

//       swiper.currentBreakpoint = breakpoint;
//       swiper.emit('_beforeBreakpoint', breakpointParams);

//       if (needsReLoop && initialized) {
//         swiper.loopDestroy();
//         swiper.loopCreate();
//         swiper.updateSlides();
//         swiper.slideTo(activeIndex - loopedSlides + swiper.loopedSlides, 0, false);
//       }

//       swiper.emit('breakpoint', breakpointParams);
//     }

//     function getBreakpoint(breakpoints, base = 'window', containerEl) {
//       if (!breakpoints || (base === 'container' && !containerEl)) return undefined;
//       let breakpoint = false;
//       const window = getWindow();
//       const currentHeight = base === 'window' ? window.innerHeight : containerEl.clientHeight;
//       const points = Object.keys(breakpoints).map((point) => {
//         if (typeof point === 'string' && point.indexOf('@') === 0) {
//           const minRatio = parseFloat(point.substr(1));
//           const value = currentHeight * minRatio;
//           return {
//             value,
//             point,
//           };
//         }

//         return {
//           value: point,
//           point,
//         };
//       });
//       points.sort((a, b) => parseInt(a.value, 10) - parseInt(b.value, 10));

//       for (let i = 0; i < points.length; i += 1) {
//         const {point, value} = points[i];

//         if (base === 'window') {
//           if (window.matchMedia(`(min-width: ${value}px)`).matches) {
//             breakpoint = point;
//           }
//         } else if (value <= containerEl.clientWidth) {
//           breakpoint = point;
//         }
//       }

//       return breakpoint || 'max';
//     }

//     var breakpoints = {
//       setBreakpoint,
//       getBreakpoint,
//     };

//     function prepareClasses(entries, prefix) {
//       const resultClasses = [];
//       entries.forEach((item) => {
//         if (typeof item === 'object') {
//           Object.keys(item).forEach((classNames) => {
//             if (item[classNames]) {
//               resultClasses.push(prefix + classNames);
//             }
//           });
//         } else if (typeof item === 'string') {
//           resultClasses.push(prefix + item);
//         }
//       });
//       return resultClasses;
//     }

//     function addClasses() {
//       const swiper = this;
//       const {
//       classNames,
//       params,
//       rtl,
//       $el,
//       device,
//       support
//     } = swiper; // prettier-ignore

//       const suffixes = prepareClasses(
//         [
//           'initialized',
//           params.direction,
//           {
//             'pointer-events': !support.touch,
//           },
//           {
//             'free-mode': swiper.params.freeMode && params.freeMode.enabled,
//           },
//           {
//             autoheight: params.autoHeight,
//           },
//           {
//             rtl: rtl,
//           },
//           {
//             grid: params.grid && params.grid.rows > 1,
//           },
//           {
//             'grid-column': params.grid && params.grid.rows > 1 && params.grid.fill === 'column',
//           },
//           {
//             android: device.android,
//           },
//           {
//             ios: device.ios,
//           },
//           {
//             'css-mode': params.cssMode,
//           },
//           {
//             centered: params.cssMode && params.centeredSlides,
//           },
//         ],
//         params.containerModifierClass,
//       );
//       classNames.push(...suffixes);
//       $el.addClass([...classNames].join(' '));
//       swiper.emitContainerClasses();
//     }

//     function removeClasses() {
//       const swiper = this;
//       const {$el, classNames} = swiper;
//       $el.removeClass(classNames.join(' '));
//       swiper.emitContainerClasses();
//     }

//     var classes = {
//       addClasses,
//       removeClasses,
//     };

//     function loadImage(imageEl, src, srcset, sizes, checkForComplete, callback) {
//       const window = getWindow();
//       let image;

//       function onReady() {
//         if (callback) callback();
//       }

//       const isPicture = $(imageEl).parent('picture')[0];

//       if (!isPicture && (!imageEl.complete || !checkForComplete)) {
//         if (src) {
//           image = new window.Image();
//           image.onload = onReady;
//           image.onerror = onReady;

//           if (sizes) {
//             image.sizes = sizes;
//           }

//           if (srcset) {
//             image.srcset = srcset;
//           }

//           if (src) {
//             image.src = src;
//           }
//         } else {
//           onReady();
//         }
//       } else {
//         // image already loaded...
//         onReady();
//       }
//     }

//     function preloadImages() {
//       const swiper = this;
//       swiper.imagesToLoad = swiper.$el.find('img');

//       function onReady() {
//         if (typeof swiper === 'undefined' || swiper === null || !swiper || swiper.destroyed) return;
//         if (swiper.imagesLoaded !== undefined) swiper.imagesLoaded += 1;

//         if (swiper.imagesLoaded === swiper.imagesToLoad.length) {
//           if (swiper.params.updateOnImagesReady) swiper.update();
//           swiper.emit('imagesReady');
//         }
//       }

//       for (let i = 0; i < swiper.imagesToLoad.length; i += 1) {
//         const imageEl = swiper.imagesToLoad[i];
//         swiper.loadImage(
//           imageEl,
//           imageEl.currentSrc || imageEl.getAttribute('src'),
//           imageEl.srcset || imageEl.getAttribute('srcset'),
//           imageEl.sizes || imageEl.getAttribute('sizes'),
//           true,
//           onReady,
//         );
//       }
//     }

//     var images = {
//       loadImage,
//       preloadImages,
//     };

//     function checkOverflow() {
//       const swiper = this;
//       const {isLocked: wasLocked, params} = swiper;
//       const {slidesOffsetBefore} = params;

//       if (slidesOffsetBefore) {
//         const lastSlideIndex = swiper.slides.length - 1;
//         const lastSlideRightEdge =
//           swiper.slidesGrid[lastSlideIndex] + swiper.slidesSizesGrid[lastSlideIndex] + slidesOffsetBefore * 2;
//         swiper.isLocked = swiper.size > lastSlideRightEdge;
//       } else {
//         swiper.isLocked = swiper.snapGrid.length === 1;
//       }

//       if (params.allowSlideNext === true) {
//         swiper.allowSlideNext = !swiper.isLocked;
//       }

//       if (params.allowSlidePrev === true) {
//         swiper.allowSlidePrev = !swiper.isLocked;
//       }

//       if (wasLocked && wasLocked !== swiper.isLocked) {
//         swiper.isEnd = false;
//       }

//       if (wasLocked !== swiper.isLocked) {
//         swiper.emit(swiper.isLocked ? 'lock' : 'unlock');
//       }
//     }

//     var checkOverflow$1 = {
//       checkOverflow,
//     };

//     var defaults = {
//       init: true,
//       direction: 'horizontal',
//       touchEventsTarget: 'wrapper',
//       initialSlide: 0,
//       speed: 300,
//       cssMode: false,
//       updateOnWindowResize: true,
//       resizeObserver: true,
//       nested: false,
//       createElements: false,
//       enabled: true,
//       focusableElements: 'input, select, option, textarea, button, video, label',
//       // Overrides
//       width: null,
//       height: null,
//       //
//       preventInteractionOnTransition: false,
//       // ssr
//       userAgent: null,
//       url: null,
//       // To support iOS's swipe-to-go-back gesture (when being used in-app).
//       edgeSwipeDetection: false,
//       edgeSwipeThreshold: 20,
//       // Autoheight
//       autoHeight: false,
//       // Set wrapper width
//       setWrapperSize: false,
//       // Virtual Translate
//       virtualTranslate: false,
//       // Effects
//       effect: 'slide',
//       // 'slide' or 'fade' or 'cube' or 'coverflow' or 'flip'
//       // Breakpoints
//       breakpoints: undefined,
//       breakpointsBase: 'window',
//       // Slides grid
//       spaceBetween: 0,
//       slidesPerView: 1,
//       slidesPerGroup: 1,
//       slidesPerGroupSkip: 0,
//       slidesPerGroupAuto: false,
//       centeredSlides: false,
//       centeredSlidesBounds: false,
//       slidesOffsetBefore: 0,
//       // in px
//       slidesOffsetAfter: 0,
//       // in px
//       normalizeSlideIndex: true,
//       centerInsufficientSlides: false,
//       // Disable swiper and hide navigation when container not overflow
//       watchOverflow: true,
//       // Round length
//       roundLengths: false,
//       // Touches
//       touchRatio: 1,
//       touchAngle: 45,
//       simulateTouch: true,
//       shortSwipes: true,
//       longSwipes: true,
//       longSwipesRatio: 0.5,
//       longSwipesMs: 300,
//       followFinger: true,
//       allowTouchMove: true,
//       threshold: 0,
//       touchMoveStopPropagation: false,
//       touchStartPreventDefault: true,
//       touchStartForcePreventDefault: false,
//       touchReleaseOnEdges: false,
//       // Unique Navigation Elements
//       uniqueNavElements: true,
//       // Resistance
//       resistance: true,
//       resistanceRatio: 0.85,
//       // Progress
//       watchSlidesProgress: false,
//       // Cursor
//       grabCursor: false,
//       // Clicks
//       preventClicks: true,
//       preventClicksPropagation: true,
//       slideToClickedSlide: false,
//       // Images
//       preloadImages: true,
//       updateOnImagesReady: true,
//       // loop
//       loop: false,
//       loopAdditionalSlides: 0,
//       loopedSlides: null,
//       loopFillGroupWithBlank: false,
//       loopPreventsSlide: true,
//       // rewind
//       rewind: false,
//       // Swiping/no swiping
//       allowSlidePrev: true,
//       allowSlideNext: true,
//       swipeHandler: null,
//       // '.swipe-handler',
//       noSwiping: true,
//       noSwipingClass: 'swiper-no-swiping',
//       noSwipingSelector: null,
//       // Passive Listeners
//       passiveListeners: true,
//       // NS
//       containerModifierClass: 'swiper-',
//       // NEW
//       slideClass: 'swiper-slide',
//       slideBlankClass: 'swiper-slide-invisible-blank',
//       slideActiveClass: 'swiper-slide-active',
//       slideDuplicateActiveClass: 'swiper-slide-duplicate-active',
//       slideVisibleClass: 'swiper-slide-visible',
//       slideDuplicateClass: 'swiper-slide-duplicate',
//       slideNextClass: 'swiper-slide-next',
//       slideDuplicateNextClass: 'swiper-slide-duplicate-next',
//       slidePrevClass: 'swiper-slide-prev',
//       slideDuplicatePrevClass: 'swiper-slide-duplicate-prev',
//       wrapperClass: 'swiper-wrapper',
//       // Callbacks
//       runCallbacksOnInit: true,
//       // Internals
//       _emitClasses: false,
//     };

//     function moduleExtendParams(params, allModulesParams) {
//       return function extendParams(obj = {}) {
//         const moduleParamName = Object.keys(obj)[0];
//         const moduleParams = obj[moduleParamName];

//         if (typeof moduleParams !== 'object' || moduleParams === null) {
//           extend(allModulesParams, obj);
//           return;
//         }

//         if (
//           ['navigation', 'pagination', 'scrollbar'].indexOf(moduleParamName) >= 0 &&
//           params[moduleParamName] === true
//         ) {
//           params[moduleParamName] = {
//             auto: true,
//           };
//         }

//         if (!(moduleParamName in params && 'enabled' in moduleParams)) {
//           extend(allModulesParams, obj);
//           return;
//         }

//         if (params[moduleParamName] === true) {
//           params[moduleParamName] = {
//             enabled: true,
//           };
//         }

//         if (typeof params[moduleParamName] === 'object' && !('enabled' in params[moduleParamName])) {
//           params[moduleParamName].enabled = true;
//         }

//         if (!params[moduleParamName])
//           params[moduleParamName] = {
//             enabled: false,
//           };
//         extend(allModulesParams, obj);
//       };
//     }

//     /* eslint no-param-reassign: "off" */
//     const prototypes = {
//       eventsEmitter,
//       update,
//       translate,
//       transition,
//       slide,
//       loop,
//       grabCursor,
//       events: events$1,
//       breakpoints,
//       checkOverflow: checkOverflow$1,
//       classes,
//       images,
//     };
//     const extendedDefaults = {};

//     class Swiper {
//       constructor(...args) {
//         let el;
//         let params;

//         if (
//           args.length === 1 &&
//           args[0].constructor &&
//           Object.prototype.toString.call(args[0]).slice(8, -1) === 'Object'
//         ) {
//           params = args[0];
//         } else {
//           [el, params] = args;
//         }

//         if (!params) params = {};
//         params = extend({}, params);
//         if (el && !params.el) params.el = el;

//         if (params.el && $(params.el).length > 1) {
//           const swipers = [];
//           $(params.el).each((containerEl) => {
//             const newParams = extend({}, params, {
//               el: containerEl,
//             });
//             swipers.push(new Swiper(newParams));
//           });
//           return swipers;
//         } // Swiper Instance

//         const swiper = this;
//         swiper.__swiper__ = true;
//         swiper.support = getSupport();
//         swiper.device = getDevice({
//           userAgent: params.userAgent,
//         });
//         swiper.browser = getBrowser();
//         swiper.eventsListeners = {};
//         swiper.eventsAnyListeners = [];
//         swiper.modules = [...swiper.__modules__];

//         if (params.modules && Array.isArray(params.modules)) {
//           swiper.modules.push(...params.modules);
//         }

//         const allModulesParams = {};
//         swiper.modules.forEach((mod) => {
//           mod({
//             swiper,
//             extendParams: moduleExtendParams(params, allModulesParams),
//             on: swiper.on.bind(swiper),
//             once: swiper.once.bind(swiper),
//             off: swiper.off.bind(swiper),
//             emit: swiper.emit.bind(swiper),
//           });
//         }); // Extend defaults with modules params

//         const swiperParams = extend({}, defaults, allModulesParams); // Extend defaults with passed params

//         swiper.params = extend({}, swiperParams, extendedDefaults, params);
//         swiper.originalParams = extend({}, swiper.params);
//         swiper.passedParams = extend({}, params); // add event listeners

//         if (swiper.params && swiper.params.on) {
//           Object.keys(swiper.params.on).forEach((eventName) => {
//             swiper.on(eventName, swiper.params.on[eventName]);
//           });
//         }

//         if (swiper.params && swiper.params.onAny) {
//           swiper.onAny(swiper.params.onAny);
//         } // Save Dom lib

//         swiper.$ = $; // Extend Swiper

//         Object.assign(swiper, {
//           enabled: swiper.params.enabled,
//           el,
//           // Classes
//           classNames: [],
//           // Slides
//           slides: $(),
//           slidesGrid: [],
//           snapGrid: [],
//           slidesSizesGrid: [],

//           // isDirection
//           isHorizontal() {
//             return swiper.params.direction === 'horizontal';
//           },

//           isVertical() {
//             return swiper.params.direction === 'vertical';
//           },

//           // Indexes
//           activeIndex: 0,
//           realIndex: 0,
//           //
//           isBeginning: true,
//           isEnd: false,
//           // Props
//           translate: 0,
//           previousTranslate: 0,
//           progress: 0,
//           velocity: 0,
//           animating: false,
//           // Locks
//           allowSlideNext: swiper.params.allowSlideNext,
//           allowSlidePrev: swiper.params.allowSlidePrev,
//           // Touch Events
//           touchEvents: (function touchEvents() {
//             const touch = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];
//             const desktop = ['pointerdown', 'pointermove', 'pointerup'];
//             swiper.touchEventsTouch = {
//               start: touch[0],
//               move: touch[1],
//               end: touch[2],
//               cancel: touch[3],
//             };
//             swiper.touchEventsDesktop = {
//               start: desktop[0],
//               move: desktop[1],
//               end: desktop[2],
//             };
//             return swiper.support.touch || !swiper.params.simulateTouch
//               ? swiper.touchEventsTouch
//               : swiper.touchEventsDesktop;
//           })(),
//           touchEventsData: {
//             isTouched: undefined,
//             isMoved: undefined,
//             allowTouchCallbacks: undefined,
//             touchStartTime: undefined,
//             isScrolling: undefined,
//             currentTranslate: undefined,
//             startTranslate: undefined,
//             allowThresholdMove: undefined,
//             // Form elements to match
//             focusableElements: swiper.params.focusableElements,
//             // Last click time
//             lastClickTime: now(),
//             clickTimeout: undefined,
//             // Velocities
//             velocities: [],
//             allowMomentumBounce: undefined,
//             isTouchEvent: undefined,
//             startMoving: undefined,
//           },
//           // Clicks
//           allowClick: true,
//           // Touches
//           allowTouchMove: swiper.params.allowTouchMove,
//           touches: {
//             startX: 0,
//             startY: 0,
//             currentX: 0,
//             currentY: 0,
//             diff: 0,
//           },
//           // Images
//           imagesToLoad: [],
//           imagesLoaded: 0,
//         });
//         swiper.emit('_swiper'); // Init

//         if (swiper.params.init) {
//           swiper.init();
//         } // Return app instance

//         return swiper;
//       }

//       enable() {
//         const swiper = this;
//         if (swiper.enabled) return;
//         swiper.enabled = true;

//         if (swiper.params.grabCursor) {
//           swiper.setGrabCursor();
//         }

//         swiper.emit('enable');
//       }

//       disable() {
//         const swiper = this;
//         if (!swiper.enabled) return;
//         swiper.enabled = false;

//         if (swiper.params.grabCursor) {
//           swiper.unsetGrabCursor();
//         }

//         swiper.emit('disable');
//       }

//       setProgress(progress, speed) {
//         const swiper = this;
//         progress = Math.min(Math.max(progress, 0), 1);
//         const min = swiper.minTranslate();
//         const max = swiper.maxTranslate();
//         const current = (max - min) * progress + min;
//         swiper.translateTo(current, typeof speed === 'undefined' ? 0 : speed);
//         swiper.updateActiveIndex();
//         swiper.updateSlidesClasses();
//       }

//       emitContainerClasses() {
//         const swiper = this;
//         if (!swiper.params._emitClasses || !swiper.el) return;
//         const cls = swiper.el.className.split(' ').filter((className) => {
//           return className.indexOf('swiper') === 0 || className.indexOf(swiper.params.containerModifierClass) === 0;
//         });
//         swiper.emit('_containerClasses', cls.join(' '));
//       }

//       getSlideClasses(slideEl) {
//         const swiper = this;
//         return slideEl.className
//           .split(' ')
//           .filter((className) => {
//             return className.indexOf('swiper-slide') === 0 || className.indexOf(swiper.params.slideClass) === 0;
//           })
//           .join(' ');
//       }

//       emitSlidesClasses() {
//         const swiper = this;
//         if (!swiper.params._emitClasses || !swiper.el) return;
//         const updates = [];
//         swiper.slides.each((slideEl) => {
//           const classNames = swiper.getSlideClasses(slideEl);
//           updates.push({
//             slideEl,
//             classNames,
//           });
//           swiper.emit('_slideClass', slideEl, classNames);
//         });
//         swiper.emit('_slideClasses', updates);
//       }

//       slidesPerViewDynamic(view = 'current', exact = false) {
//         const swiper = this;
//         const {params, slides, slidesGrid, slidesSizesGrid, size: swiperSize, activeIndex} = swiper;
//         let spv = 1;

//         if (params.centeredSlides) {
//           let slideSize = slides[activeIndex].swiperSlideSize;
//           let breakLoop;

//           for (let i = activeIndex + 1; i < slides.length; i += 1) {
//             if (slides[i] && !breakLoop) {
//               slideSize += slides[i].swiperSlideSize;
//               spv += 1;
//               if (slideSize > swiperSize) breakLoop = true;
//             }
//           }

//           for (let i = activeIndex - 1; i >= 0; i -= 1) {
//             if (slides[i] && !breakLoop) {
//               slideSize += slides[i].swiperSlideSize;
//               spv += 1;
//               if (slideSize > swiperSize) breakLoop = true;
//             }
//           }
//         } else {
//           // eslint-disable-next-line
//           if (view === 'current') {
//             for (let i = activeIndex + 1; i < slides.length; i += 1) {
//               const slideInView = exact
//                 ? slidesGrid[i] + slidesSizesGrid[i] - slidesGrid[activeIndex] < swiperSize
//                 : slidesGrid[i] - slidesGrid[activeIndex] < swiperSize;

//               if (slideInView) {
//                 spv += 1;
//               }
//             }
//           } else {
//             // previous
//             for (let i = activeIndex - 1; i >= 0; i -= 1) {
//               const slideInView = slidesGrid[activeIndex] - slidesGrid[i] < swiperSize;

//               if (slideInView) {
//                 spv += 1;
//               }
//             }
//           }
//         }

//         return spv;
//       }

//       update() {
//         const swiper = this;
//         if (!swiper || swiper.destroyed) return;
//         const {snapGrid, params} = swiper; // Breakpoints

//         if (params.breakpoints) {
//           swiper.setBreakpoint();
//         }

//         swiper.updateSize();
//         swiper.updateSlides();
//         swiper.updateProgress();
//         swiper.updateSlidesClasses();

//         function setTranslate() {
//           const translateValue = swiper.rtlTranslate ? swiper.translate * -1 : swiper.translate;
//           const newTranslate = Math.min(Math.max(translateValue, swiper.maxTranslate()), swiper.minTranslate());
//           swiper.setTranslate(newTranslate);
//           swiper.updateActiveIndex();
//           swiper.updateSlidesClasses();
//         }

//         let translated;

//         if (swiper.params.freeMode && swiper.params.freeMode.enabled) {
//           setTranslate();

//           if (swiper.params.autoHeight) {
//             swiper.updateAutoHeight();
//           }
//         } else {
//           if (
//             (swiper.params.slidesPerView === 'auto' || swiper.params.slidesPerView > 1) &&
//             swiper.isEnd &&
//             !swiper.params.centeredSlides
//           ) {
//             translated = swiper.slideTo(swiper.slides.length - 1, 0, false, true);
//           } else {
//             translated = swiper.slideTo(swiper.activeIndex, 0, false, true);
//           }

//           if (!translated) {
//             setTranslate();
//           }
//         }

//         if (params.watchOverflow && snapGrid !== swiper.snapGrid) {
//           swiper.checkOverflow();
//         }

//         swiper.emit('update');
//       }

//       changeDirection(newDirection, needUpdate = true) {
//         const swiper = this;
//         const currentDirection = swiper.params.direction;

//         if (!newDirection) {
//           // eslint-disable-next-line
//           newDirection = currentDirection === 'horizontal' ? 'vertical' : 'horizontal';
//         }

//         if (newDirection === currentDirection || (newDirection !== 'horizontal' && newDirection !== 'vertical')) {
//           return swiper;
//         }

//         swiper.$el
//           .removeClass(`${swiper.params.containerModifierClass}${currentDirection}`)
//           .addClass(`${swiper.params.containerModifierClass}${newDirection}`);
//         swiper.emitContainerClasses();
//         swiper.params.direction = newDirection;
//         swiper.slides.each((slideEl) => {
//           if (newDirection === 'vertical') {
//             slideEl.style.width = '';
//           } else {
//             slideEl.style.height = '';
//           }
//         });
//         swiper.emit('changeDirection');
//         if (needUpdate) swiper.update();
//         return swiper;
//       }

//       mount(el) {
//         const swiper = this;
//         if (swiper.mounted) return true; // Find el

//         const $el = $(el || swiper.params.el);
//         el = $el[0];

//         if (!el) {
//           return false;
//         }

//         el.swiper = swiper;

//         const getWrapperSelector = () => {
//           return `.${(swiper.params.wrapperClass || '').trim().split(' ').join('.')}`;
//         };

//         const getWrapper = () => {
//           if (el && el.shadowRoot && el.shadowRoot.querySelector) {
//             const res = $(el.shadowRoot.querySelector(getWrapperSelector())); // Children needs to return slot items

//             res.children = (options) => $el.children(options);

//             return res;
//           }

//           return $el.children(getWrapperSelector());
//         }; // Find Wrapper

//         let $wrapperEl = getWrapper();

//         if ($wrapperEl.length === 0 && swiper.params.createElements) {
//           const document = getDocument();
//           const wrapper = document.createElement('div');
//           $wrapperEl = $(wrapper);
//           wrapper.className = swiper.params.wrapperClass;
//           $el.append(wrapper);
//           $el.children(`.${swiper.params.slideClass}`).each((slideEl) => {
//             $wrapperEl.append(slideEl);
//           });
//         }

//         Object.assign(swiper, {
//           $el,
//           el,
//           $wrapperEl,
//           wrapperEl: $wrapperEl[0],
//           mounted: true,
//           // RTL
//           rtl: el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl',
//           rtlTranslate:
//             swiper.params.direction === 'horizontal' &&
//             (el.dir.toLowerCase() === 'rtl' || $el.css('direction') === 'rtl'),
//           wrongRTL: $wrapperEl.css('display') === '-webkit-box',
//         });
//         return true;
//       }

//       init(el) {
//         const swiper = this;
//         if (swiper.initialized) return swiper;
//         const mounted = swiper.mount(el);
//         if (mounted === false) return swiper;
//         swiper.emit('beforeInit'); // Set breakpoint

//         if (swiper.params.breakpoints) {
//           swiper.setBreakpoint();
//         } // Add Classes

//         swiper.addClasses(); // Create loop

//         if (swiper.params.loop) {
//           swiper.loopCreate();
//         } // Update size

//         swiper.updateSize(); // Update slides

//         swiper.updateSlides();

//         if (swiper.params.watchOverflow) {
//           swiper.checkOverflow();
//         } // Set Grab Cursor

//         if (swiper.params.grabCursor && swiper.enabled) {
//           swiper.setGrabCursor();
//         }

//         if (swiper.params.preloadImages) {
//           swiper.preloadImages();
//         } // Slide To Initial Slide

//         if (swiper.params.loop) {
//           swiper.slideTo(
//             swiper.params.initialSlide + swiper.loopedSlides,
//             0,
//             swiper.params.runCallbacksOnInit,
//             false,
//             true,
//           );
//         } else {
//           swiper.slideTo(swiper.params.initialSlide, 0, swiper.params.runCallbacksOnInit, false, true);
//         } // Attach events

//         swiper.attachEvents(); // Init Flag

//         swiper.initialized = true; // Emit

//         swiper.emit('init');
//         swiper.emit('afterInit');
//         return swiper;
//       }

//       destroy(deleteInstance = true, cleanStyles = true) {
//         const swiper = this;
//         const {params, $el, $wrapperEl, slides} = swiper;

//         if (typeof swiper.params === 'undefined' || swiper.destroyed) {
//           return null;
//         }

//         swiper.emit('beforeDestroy'); // Init Flag

//         swiper.initialized = false; // Detach events

//         swiper.detachEvents(); // Destroy loop

//         if (params.loop) {
//           swiper.loopDestroy();
//         } // Cleanup styles

//         if (cleanStyles) {
//           swiper.removeClasses();
//           $el.removeAttr('style');
//           $wrapperEl.removeAttr('style');

//           if (slides && slides.length) {
//             slides
//               .removeClass(
//                 [params.slideVisibleClass, params.slideActiveClass, params.slideNextClass, params.slidePrevClass].join(
//                   ' ',
//                 ),
//               )
//               .removeAttr('style')
//               .removeAttr('data-swiper-slide-index');
//           }
//         }

//         swiper.emit('destroy'); // Detach emitter events

//         Object.keys(swiper.eventsListeners).forEach((eventName) => {
//           swiper.off(eventName);
//         });

//         if (deleteInstance !== false) {
//           swiper.$el[0].swiper = null;
//           deleteProps(swiper);
//         }

//         swiper.destroyed = true;
//         return null;
//       }

//       static extendDefaults(newDefaults) {
//         extend(extendedDefaults, newDefaults);
//       }

//       static get extendedDefaults() {
//         return extendedDefaults;
//       }

//       static get defaults() {
//         return defaults;
//       }

//       static installModule(mod) {
//         if (!Swiper.prototype.__modules__) Swiper.prototype.__modules__ = [];
//         const modules = Swiper.prototype.__modules__;

//         if (typeof mod === 'function' && modules.indexOf(mod) < 0) {
//           modules.push(mod);
//         }
//       }

//       static use(module) {
//         if (Array.isArray(module)) {
//           module.forEach((m) => Swiper.installModule(m));
//           return Swiper;
//         }

//         Swiper.installModule(module);
//         return Swiper;
//       }
//     }

//     Object.keys(prototypes).forEach((prototypeGroup) => {
//       Object.keys(prototypes[prototypeGroup]).forEach((protoMethod) => {
//         Swiper.prototype[protoMethod] = prototypes[prototypeGroup][protoMethod];
//       });
//     });
//     Swiper.use([Resize, Observer]);

//     function Virtual({swiper, extendParams, on}) {
//       extendParams({
//         virtual: {
//           enabled: false,
//           slides: [],
//           cache: true,
//           renderSlide: null,
//           renderExternal: null,
//           renderExternalUpdate: true,
//           addSlidesBefore: 0,
//           addSlidesAfter: 0,
//         },
//       });
//       let cssModeTimeout;
//       swiper.virtual = {
//         cache: {},
//         from: undefined,
//         to: undefined,
//         slides: [],
//         offset: 0,
//         slidesGrid: [],
//       };

//       function renderSlide(slide, index) {
//         const params = swiper.params.virtual;

//         if (params.cache && swiper.virtual.cache[index]) {
//           return swiper.virtual.cache[index];
//         }

//         const $slideEl = params.renderSlide
//           ? $(params.renderSlide.call(swiper, slide, index))
//           : $(`<div class="${swiper.params.slideClass}" data-swiper-slide-index="${index}">${slide}</div>`);
//         if (!$slideEl.attr('data-swiper-slide-index')) $slideEl.attr('data-swiper-slide-index', index);
//         if (params.cache) swiper.virtual.cache[index] = $slideEl;
//         return $slideEl;
//       }

//       function update(force) {
//         const {slidesPerView, slidesPerGroup, centeredSlides} = swiper.params;
//         const {addSlidesBefore, addSlidesAfter} = swiper.params.virtual;
//         const {
//           from: previousFrom,
//           to: previousTo,
//           slides,
//           slidesGrid: previousSlidesGrid,
//           offset: previousOffset,
//         } = swiper.virtual;

//         if (!swiper.params.cssMode) {
//           swiper.updateActiveIndex();
//         }

//         const activeIndex = swiper.activeIndex || 0;
//         let offsetProp;
//         if (swiper.rtlTranslate) offsetProp = 'right';
//         else offsetProp = swiper.isHorizontal() ? 'left' : 'top';
//         let slidesAfter;
//         let slidesBefore;

//         if (centeredSlides) {
//           slidesAfter = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesAfter;
//           slidesBefore = Math.floor(slidesPerView / 2) + slidesPerGroup + addSlidesBefore;
//         } else {
//           slidesAfter = slidesPerView + (slidesPerGroup - 1) + addSlidesAfter;
//           slidesBefore = slidesPerGroup + addSlidesBefore;
//         }

//         const from = Math.max((activeIndex || 0) - slidesBefore, 0);
//         const to = Math.min((activeIndex || 0) + slidesAfter, slides.length - 1);
//         const offset = (swiper.slidesGrid[from] || 0) - (swiper.slidesGrid[0] || 0);
//         Object.assign(swiper.virtual, {
//           from,
//           to,
//           offset,
//           slidesGrid: swiper.slidesGrid,
//         });

//         function onRendered() {
//           swiper.updateSlides();
//           swiper.updateProgress();
//           swiper.updateSlidesClasses();

//           if (swiper.lazy && swiper.params.lazy.enabled) {
//             swiper.lazy.load();
//           }
//         }

//         if (previousFrom === from && previousTo === to && !force) {
//           if (swiper.slidesGrid !== previousSlidesGrid && offset !== previousOffset) {
//             swiper.slides.css(offsetProp, `${offset}px`);
//           }

//           swiper.updateProgress();
//           return;
//         }

//         if (swiper.params.virtual.renderExternal) {
//           swiper.params.virtual.renderExternal.call(swiper, {
//             offset,
//             from,
//             to,
//             slides: (function getSlides() {
//               const slidesToRender = [];

//               for (let i = from; i <= to; i += 1) {
//                 slidesToRender.push(slides[i]);
//               }

//               return slidesToRender;
//             })(),
//           });

//           if (swiper.params.virtual.renderExternalUpdate) {
//             onRendered();
//           }

//           return;
//         }

//         const prependIndexes = [];
//         const appendIndexes = [];

//         if (force) {
//           swiper.$wrapperEl.find(`.${swiper.params.slideClass}`).remove();
//         } else {
//           for (let i = previousFrom; i <= previousTo; i += 1) {
//             if (i < from || i > to) {
//               swiper.$wrapperEl.find(`.${swiper.params.slideClass}[data-swiper-slide-index="${i}"]`).remove();
//             }
//           }
//         }

//         for (let i = 0; i < slides.length; i += 1) {
//           if (i >= from && i <= to) {
//             if (typeof previousTo === 'undefined' || force) {
//               appendIndexes.push(i);
//             } else {
//               if (i > previousTo) appendIndexes.push(i);
//               if (i < previousFrom) prependIndexes.push(i);
//             }
//           }
//         }

//         appendIndexes.forEach((index) => {
//           swiper.$wrapperEl.append(renderSlide(slides[index], index));
//         });
//         prependIndexes
//           .sort((a, b) => b - a)
//           .forEach((index) => {
//             swiper.$wrapperEl.prepend(renderSlide(slides[index], index));
//           });
//         swiper.$wrapperEl.children('.swiper-slide').css(offsetProp, `${offset}px`);
//         onRendered();
//       }

//       function appendSlide(slides) {
//         if (typeof slides === 'object' && 'length' in slides) {
//           for (let i = 0; i < slides.length; i += 1) {
//             if (slides[i]) swiper.virtual.slides.push(slides[i]);
//           }
//         } else {
//           swiper.virtual.slides.push(slides);
//         }

//         update(true);
//       }

//       function prependSlide(slides) {
//         const activeIndex = swiper.activeIndex;
//         let newActiveIndex = activeIndex + 1;
//         let numberOfNewSlides = 1;

//         if (Array.isArray(slides)) {
//           for (let i = 0; i < slides.length; i += 1) {
//             if (slides[i]) swiper.virtual.slides.unshift(slides[i]);
//           }

//           newActiveIndex = activeIndex + slides.length;
//           numberOfNewSlides = slides.length;
//         } else {
//           swiper.virtual.slides.unshift(slides);
//         }

//         if (swiper.params.virtual.cache) {
//           const cache = swiper.virtual.cache;
//           const newCache = {};
//           Object.keys(cache).forEach((cachedIndex) => {
//             const $cachedEl = cache[cachedIndex];
//             const cachedElIndex = $cachedEl.attr('data-swiper-slide-index');

//             if (cachedElIndex) {
//               $cachedEl.attr('data-swiper-slide-index', parseInt(cachedElIndex, 10) + numberOfNewSlides);
//             }

//             newCache[parseInt(cachedIndex, 10) + numberOfNewSlides] = $cachedEl;
//           });
//           swiper.virtual.cache = newCache;
//         }

//         update(true);
//         swiper.slideTo(newActiveIndex, 0);
//       }

//       function removeSlide(slidesIndexes) {
//         if (typeof slidesIndexes === 'undefined' || slidesIndexes === null) return;
//         let activeIndex = swiper.activeIndex;

//         if (Array.isArray(slidesIndexes)) {
//           for (let i = slidesIndexes.length - 1; i >= 0; i -= 1) {
//             swiper.virtual.slides.splice(slidesIndexes[i], 1);

//             if (swiper.params.virtual.cache) {
//               delete swiper.virtual.cache[slidesIndexes[i]];
//             }

//             if (slidesIndexes[i] < activeIndex) activeIndex -= 1;
//             activeIndex = Math.max(activeIndex, 0);
//           }
//         } else {
//           swiper.virtual.slides.splice(slidesIndexes, 1);

//           if (swiper.params.virtual.cache) {
//             delete swiper.virtual.cache[slidesIndexes];
//           }

//           if (slidesIndexes < activeIndex) activeIndex -= 1;
//           activeIndex = Math.max(activeIndex, 0);
//         }

//         update(true);
//         swiper.slideTo(activeIndex, 0);
//       }

//       function removeAllSlides() {
//         swiper.virtual.slides = [];

//         if (swiper.params.virtual.cache) {
//           swiper.virtual.cache = {};
//         }

//         update(true);
//         swiper.slideTo(0, 0);
//       }

//       on('beforeInit', () => {
//         if (!swiper.params.virtual.enabled) return;
//         swiper.virtual.slides = swiper.params.virtual.slides;
//         swiper.classNames.push(`${swiper.params.containerModifierClass}virtual`);
//         swiper.params.watchSlidesProgress = true;
//         swiper.originalParams.watchSlidesProgress = true;

//         if (!swiper.params.initialSlide) {
//           update();
//         }
//       });
//       on('setTranslate', () => {
//         if (!swiper.params.virtual.enabled) return;

//         if (swiper.params.cssMode && !swiper._immediateVirtual) {
//           clearTimeout(cssModeTimeout);
//           cssModeTimeout = setTimeout(() => {
//             update();
//           }, 100);
//         } else {
//           update();
//         }
//       });
//       on('init update resize', () => {
//         if (!swiper.params.virtual.enabled) return;

//         if (swiper.params.cssMode) {
//           setCSSProperty(swiper.wrapperEl, '--swiper-virtual-size', `${swiper.virtualSize}px`);
//         }
//       });
//       Object.assign(swiper.virtual, {
//         appendSlide,
//         prependSlide,
//         removeSlide,
//         removeAllSlides,
//         update,
//       });
//     }

//     /* eslint-disable consistent-return */
//     function Keyboard({swiper, extendParams, on, emit}) {
//       const document = getDocument();
//       const window = getWindow();
//       swiper.keyboard = {
//         enabled: false,
//       };
//       extendParams({
//         keyboard: {
//           enabled: false,
//           onlyInViewport: true,
//           pageUpDown: true,
//         },
//       });

//       function handle(event) {
//         if (!swiper.enabled) return;
//         const {rtlTranslate: rtl} = swiper;
//         let e = event;
//         if (e.originalEvent) e = e.originalEvent; // jquery fix

//         const kc = e.keyCode || e.charCode;
//         const pageUpDown = swiper.params.keyboard.pageUpDown;
//         const isPageUp = pageUpDown && kc === 33;
//         const isPageDown = pageUpDown && kc === 34;
//         const isArrowLeft = kc === 37;
//         const isArrowRight = kc === 39;
//         const isArrowUp = kc === 38;
//         const isArrowDown = kc === 40; // Directions locks

//         if (
//           !swiper.allowSlideNext &&
//           ((swiper.isHorizontal() && isArrowRight) || (swiper.isVertical() && isArrowDown) || isPageDown)
//         ) {
//           return false;
//         }

//         if (
//           !swiper.allowSlidePrev &&
//           ((swiper.isHorizontal() && isArrowLeft) || (swiper.isVertical() && isArrowUp) || isPageUp)
//         ) {
//           return false;
//         }

//         if (e.shiftKey || e.altKey || e.ctrlKey || e.metaKey) {
//           return undefined;
//         }

//         if (
//           document.activeElement &&
//           document.activeElement.nodeName &&
//           (document.activeElement.nodeName.toLowerCase() === 'input' ||
//             document.activeElement.nodeName.toLowerCase() === 'textarea')
//         ) {
//           return undefined;
//         }

//         if (
//           swiper.params.keyboard.onlyInViewport &&
//           (isPageUp || isPageDown || isArrowLeft || isArrowRight || isArrowUp || isArrowDown)
//         ) {
//           let inView = false; // Check that swiper should be inside of visible area of window

//           if (
//             swiper.$el.parents(`.${swiper.params.slideClass}`).length > 0 &&
//             swiper.$el.parents(`.${swiper.params.slideActiveClass}`).length === 0
//           ) {
//             return undefined;
//           }

//           const $el = swiper.$el;
//           const swiperWidth = $el[0].clientWidth;
//           const swiperHeight = $el[0].clientHeight;
//           const windowWidth = window.innerWidth;
//           const windowHeight = window.innerHeight;
//           const swiperOffset = swiper.$el.offset();
//           if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
//           const swiperCoord = [
//             [swiperOffset.left, swiperOffset.top],
//             [swiperOffset.left + swiperWidth, swiperOffset.top],
//             [swiperOffset.left, swiperOffset.top + swiperHeight],
//             [swiperOffset.left + swiperWidth, swiperOffset.top + swiperHeight],
//           ];

//           for (let i = 0; i < swiperCoord.length; i += 1) {
//             const point = swiperCoord[i];

//             if (point[0] >= 0 && point[0] <= windowWidth && point[1] >= 0 && point[1] <= windowHeight) {
//               if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

//               inView = true;
//             }
//           }

//           if (!inView) return undefined;
//         }

//         if (swiper.isHorizontal()) {
//           if (isPageUp || isPageDown || isArrowLeft || isArrowRight) {
//             if (e.preventDefault) e.preventDefault();
//             else e.returnValue = false;
//           }

//           if (((isPageDown || isArrowRight) && !rtl) || ((isPageUp || isArrowLeft) && rtl)) swiper.slideNext();
//           if (((isPageUp || isArrowLeft) && !rtl) || ((isPageDown || isArrowRight) && rtl)) swiper.slidePrev();
//         } else {
//           if (isPageUp || isPageDown || isArrowUp || isArrowDown) {
//             if (e.preventDefault) e.preventDefault();
//             else e.returnValue = false;
//           }

//           if (isPageDown || isArrowDown) swiper.slideNext();
//           if (isPageUp || isArrowUp) swiper.slidePrev();
//         }

//         emit('keyPress', kc);
//         return undefined;
//       }

//       function enable() {
//         if (swiper.keyboard.enabled) return;
//         $(document).on('keydown', handle);
//         swiper.keyboard.enabled = true;
//       }

//       function disable() {
//         if (!swiper.keyboard.enabled) return;
//         $(document).off('keydown', handle);
//         swiper.keyboard.enabled = false;
//       }

//       on('init', () => {
//         if (swiper.params.keyboard.enabled) {
//           enable();
//         }
//       });
//       on('destroy', () => {
//         if (swiper.keyboard.enabled) {
//           disable();
//         }
//       });
//       Object.assign(swiper.keyboard, {
//         enable,
//         disable,
//       });
//     }

//     /* eslint-disable consistent-return */
//     function Mousewheel({swiper, extendParams, on, emit}) {
//       const window = getWindow();
//       extendParams({
//         mousewheel: {
//           enabled: false,
//           releaseOnEdges: false,
//           invert: false,
//           forceToAxis: false,
//           sensitivity: 1,
//           eventsTarget: 'container',
//           thresholdDelta: null,
//           thresholdTime: null,
//         },
//       });
//       swiper.mousewheel = {
//         enabled: false,
//       };
//       let timeout;
//       let lastScrollTime = now();
//       let lastEventBeforeSnap;
//       const recentWheelEvents = [];

//       function normalize(e) {
//         // Reasonable defaults
//         const PIXEL_STEP = 10;
//         const LINE_HEIGHT = 40;
//         const PAGE_HEIGHT = 800;
//         let sX = 0;
//         let sY = 0; // spinX, spinY

//         let pX = 0;
//         let pY = 0; // pixelX, pixelY
//         // Legacy

//         if ('detail' in e) {
//           sY = e.detail;
//         }

//         if ('wheelDelta' in e) {
//           sY = -e.wheelDelta / 120;
//         }

//         if ('wheelDeltaY' in e) {
//           sY = -e.wheelDeltaY / 120;
//         }

//         if ('wheelDeltaX' in e) {
//           sX = -e.wheelDeltaX / 120;
//         } // side scrolling on FF with DOMMouseScroll

//         if ('axis' in e && e.axis === e.HORIZONTAL_AXIS) {
//           sX = sY;
//           sY = 0;
//         }

//         pX = sX * PIXEL_STEP;
//         pY = sY * PIXEL_STEP;

//         if ('deltaY' in e) {
//           pY = e.deltaY;
//         }

//         if ('deltaX' in e) {
//           pX = e.deltaX;
//         }

//         if (e.shiftKey && !pX) {
//           // if user scrolls with shift he wants horizontal scroll
//           pX = pY;
//           pY = 0;
//         }

//         if ((pX || pY) && e.deltaMode) {
//           if (e.deltaMode === 1) {
//             // delta in LINE units
//             pX *= LINE_HEIGHT;
//             pY *= LINE_HEIGHT;
//           } else {
//             // delta in PAGE units
//             pX *= PAGE_HEIGHT;
//             pY *= PAGE_HEIGHT;
//           }
//         } // Fall-back if spin cannot be determined

//         if (pX && !sX) {
//           sX = pX < 1 ? -1 : 1;
//         }

//         if (pY && !sY) {
//           sY = pY < 1 ? -1 : 1;
//         }

//         return {
//           spinX: sX,
//           spinY: sY,
//           pixelX: pX,
//           pixelY: pY,
//         };
//       }

//       function handleMouseEnter() {
//         if (!swiper.enabled) return;
//         swiper.mouseEntered = true;
//       }

//       function handleMouseLeave() {
//         if (!swiper.enabled) return;
//         swiper.mouseEntered = false;
//       }

//       function animateSlider(newEvent) {
//         if (swiper.params.mousewheel.thresholdDelta && newEvent.delta < swiper.params.mousewheel.thresholdDelta) {
//           // Prevent if delta of wheel scroll delta is below configured threshold
//           return false;
//         }

//         if (swiper.params.mousewheel.thresholdTime && now() - lastScrollTime < swiper.params.mousewheel.thresholdTime) {
//           // Prevent if time between scrolls is below configured threshold
//           return false;
//         } // If the movement is NOT big enough and
//         // if the last time the user scrolled was too close to the current one (avoid continuously triggering the slider):
//         //   Don't go any further (avoid insignificant scroll movement).

//         if (newEvent.delta >= 6 && now() - lastScrollTime < 60) {
//           // Return false as a default
//           return true;
//         } // If user is scrolling towards the end:
//         //   If the slider hasn't hit the latest slide or
//         //   if the slider is a loop and
//         //   if the slider isn't moving right now:
//         //     Go to next slide and
//         //     emit a scroll event.
//         // Else (the user is scrolling towards the beginning) and
//         // if the slider hasn't hit the first slide or
//         // if the slider is a loop and
//         // if the slider isn't moving right now:
//         //   Go to prev slide and
//         //   emit a scroll event.

//         if (newEvent.direction < 0) {
//           if ((!swiper.isEnd || swiper.params.loop) && !swiper.animating) {
//             swiper.slideNext();
//             emit('scroll', newEvent.raw);
//           }
//         } else if ((!swiper.isBeginning || swiper.params.loop) && !swiper.animating) {
//           swiper.slidePrev();
//           emit('scroll', newEvent.raw);
//         } // If you got here is because an animation has been triggered so store the current time

//         lastScrollTime = new window.Date().getTime(); // Return false as a default

//         return false;
//       }

//       function releaseScroll(newEvent) {
//         const params = swiper.params.mousewheel;

//         if (newEvent.direction < 0) {
//           if (swiper.isEnd && !swiper.params.loop && params.releaseOnEdges) {
//             // Return true to animate scroll on edges
//             return true;
//           }
//         } else if (swiper.isBeginning && !swiper.params.loop && params.releaseOnEdges) {
//           // Return true to animate scroll on edges
//           return true;
//         }

//         return false;
//       }

//       function handle(event) {
//         let e = event;
//         let disableParentSwiper = true;
//         if (!swiper.enabled) return;
//         const params = swiper.params.mousewheel;

//         if (swiper.params.cssMode) {
//           e.preventDefault();
//         }

//         let target = swiper.$el;

//         if (swiper.params.mousewheel.eventsTarget !== 'container') {
//           target = $(swiper.params.mousewheel.eventsTarget);
//         }

//         if (!swiper.mouseEntered && !target[0].contains(e.target) && !params.releaseOnEdges) return true;
//         if (e.originalEvent) e = e.originalEvent; // jquery fix

//         let delta = 0;
//         const rtlFactor = swiper.rtlTranslate ? -1 : 1;
//         const data = normalize(e);

//         if (params.forceToAxis) {
//           if (swiper.isHorizontal()) {
//             if (Math.abs(data.pixelX) > Math.abs(data.pixelY)) delta = -data.pixelX * rtlFactor;
//             else return true;
//           } else if (Math.abs(data.pixelY) > Math.abs(data.pixelX)) delta = -data.pixelY;
//           else return true;
//         } else {
//           delta = Math.abs(data.pixelX) > Math.abs(data.pixelY) ? -data.pixelX * rtlFactor : -data.pixelY;
//         }

//         if (delta === 0) return true;
//         if (params.invert) delta = -delta; // Get the scroll positions

//         let positions = swiper.getTranslate() + delta * params.sensitivity;
//         if (positions >= swiper.minTranslate()) positions = swiper.minTranslate();
//         if (positions <= swiper.maxTranslate()) positions = swiper.maxTranslate(); // When loop is true:
//         //     the disableParentSwiper will be true.
//         // When loop is false:
//         //     if the scroll positions is not on edge,
//         //     then the disableParentSwiper will be true.
//         //     if the scroll on edge positions,
//         //     then the disableParentSwiper will be false.

//         disableParentSwiper = swiper.params.loop
//           ? true
//           : !(positions === swiper.minTranslate() || positions === swiper.maxTranslate());
//         if (disableParentSwiper && swiper.params.nested) e.stopPropagation();

//         if (!swiper.params.freeMode || !swiper.params.freeMode.enabled) {
//           // Register the new event in a variable which stores the relevant data
//           const newEvent = {
//             time: now(),
//             delta: Math.abs(delta),
//             direction: Math.sign(delta),
//             raw: event,
//           }; // Keep the most recent events

//           if (recentWheelEvents.length >= 2) {
//             recentWheelEvents.shift(); // only store the last N events
//           }

//           const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
//           recentWheelEvents.push(newEvent); // If there is at least one previous recorded event:
//           //   If direction has changed or
//           //   if the scroll is quicker than the previous one:
//           //     Animate the slider.
//           // Else (this is the first time the wheel is moved):
//           //     Animate the slider.

//           if (prevEvent) {
//             if (
//               newEvent.direction !== prevEvent.direction ||
//               newEvent.delta > prevEvent.delta ||
//               newEvent.time > prevEvent.time + 150
//             ) {
//               animateSlider(newEvent);
//             }
//           } else {
//             animateSlider(newEvent);
//           } // If it's time to release the scroll:
//           //   Return now so you don't hit the preventDefault.

//           if (releaseScroll(newEvent)) {
//             return true;
//           }
//         } else {
//           // Freemode or scrollContainer:
//           // If we recently snapped after a momentum scroll, then ignore wheel events
//           // to give time for the deceleration to finish. Stop ignoring after 500 msecs
//           // or if it's a new scroll (larger delta or inverse sign as last event before
//           // an end-of-momentum snap).
//           const newEvent = {
//             time: now(),
//             delta: Math.abs(delta),
//             direction: Math.sign(delta),
//           };
//           const ignoreWheelEvents =
//             lastEventBeforeSnap &&
//             newEvent.time < lastEventBeforeSnap.time + 500 &&
//             newEvent.delta <= lastEventBeforeSnap.delta &&
//             newEvent.direction === lastEventBeforeSnap.direction;

//           if (!ignoreWheelEvents) {
//             lastEventBeforeSnap = undefined;

//             if (swiper.params.loop) {
//               swiper.loopFix();
//             }

//             let position = swiper.getTranslate() + delta * params.sensitivity;
//             const wasBeginning = swiper.isBeginning;
//             const wasEnd = swiper.isEnd;
//             if (position >= swiper.minTranslate()) position = swiper.minTranslate();
//             if (position <= swiper.maxTranslate()) position = swiper.maxTranslate();
//             swiper.setTransition(0);
//             swiper.setTranslate(position);
//             swiper.updateProgress();
//             swiper.updateActiveIndex();
//             swiper.updateSlidesClasses();

//             if ((!wasBeginning && swiper.isBeginning) || (!wasEnd && swiper.isEnd)) {
//               swiper.updateSlidesClasses();
//             }

//             if (swiper.params.freeMode.sticky) {
//               // When wheel scrolling starts with sticky (aka snap) enabled, then detect
//               // the end of a momentum scroll by storing recent (N=15?) wheel events.
//               // 1. do all N events have decreasing or same (absolute value) delta?
//               // 2. did all N events arrive in the last M (M=500?) msecs?
//               // 3. does the earliest event have an (absolute value) delta that's
//               //    at least P (P=1?) larger than the most recent event's delta?
//               // 4. does the latest event have a delta that's smaller than Q (Q=6?) pixels?
//               // If 1-4 are "yes" then we're near the end of a momentum scroll deceleration.
//               // Snap immediately and ignore remaining wheel events in this scroll.
//               // See comment above for "remaining wheel events in this scroll" determination.
//               // If 1-4 aren't satisfied, then wait to snap until 500ms after the last event.
//               clearTimeout(timeout);
//               timeout = undefined;

//               if (recentWheelEvents.length >= 15) {
//                 recentWheelEvents.shift(); // only store the last N events
//               }

//               const prevEvent = recentWheelEvents.length ? recentWheelEvents[recentWheelEvents.length - 1] : undefined;
//               const firstEvent = recentWheelEvents[0];
//               recentWheelEvents.push(newEvent);

//               if (prevEvent && (newEvent.delta > prevEvent.delta || newEvent.direction !== prevEvent.direction)) {
//                 // Increasing or reverse-sign delta means the user started scrolling again. Clear the wheel event log.
//                 recentWheelEvents.splice(0);
//               } else if (
//                 recentWheelEvents.length >= 15 &&
//                 newEvent.time - firstEvent.time < 500 &&
//                 firstEvent.delta - newEvent.delta >= 1 &&
//                 newEvent.delta <= 6
//               ) {
//                 // We're at the end of the deceleration of a momentum scroll, so there's no need
//                 // to wait for more events. Snap ASAP on the next tick.
//                 // Also, because there's some remaining momentum we'll bias the snap in the
//                 // direction of the ongoing scroll because it's better UX for the scroll to snap
//                 // in the same direction as the scroll instead of reversing to snap.  Therefore,
//                 // if it's already scrolled more than 20% in the current direction, keep going.
//                 const snapToThreshold = delta > 0 ? 0.8 : 0.2;
//                 lastEventBeforeSnap = newEvent;
//                 recentWheelEvents.splice(0);
//                 timeout = nextTick(() => {
//                   swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
//                 }, 0); // no delay; move on next tick
//               }

//               if (!timeout) {
//                 // if we get here, then we haven't detected the end of a momentum scroll, so
//                 // we'll consider a scroll "complete" when there haven't been any wheel events
//                 // for 500ms.
//                 timeout = nextTick(() => {
//                   const snapToThreshold = 0.5;
//                   lastEventBeforeSnap = newEvent;
//                   recentWheelEvents.splice(0);
//                   swiper.slideToClosest(swiper.params.speed, true, undefined, snapToThreshold);
//                 }, 500);
//               }
//             } // Emit event

//             if (!ignoreWheelEvents) emit('scroll', e); // Stop autoplay

//             if (swiper.params.autoplay && swiper.params.autoplayDisableOnInteraction) swiper.autoplay.stop(); // Return page scroll on edge positions

//             if (position === swiper.minTranslate() || position === swiper.maxTranslate()) return true;
//           }
//         }

//         if (e.preventDefault) e.preventDefault();
//         else e.returnValue = false;
//         return false;
//       }

//       function events(method) {
//         let target = swiper.$el;

//         if (swiper.params.mousewheel.eventsTarget !== 'container') {
//           target = $(swiper.params.mousewheel.eventsTarget);
//         }

//         target[method]('mouseenter', handleMouseEnter);
//         target[method]('mouseleave', handleMouseLeave);
//         target[method]('wheel', handle);
//       }

//       function enable() {
//         if (swiper.params.cssMode) {
//           swiper.wrapperEl.removeEventListener('wheel', handle);
//           return true;
//         }

//         if (swiper.mousewheel.enabled) return false;
//         events('on');
//         swiper.mousewheel.enabled = true;
//         return true;
//       }

//       function disable() {
//         if (swiper.params.cssMode) {
//           swiper.wrapperEl.addEventListener(event, handle);
//           return true;
//         }

//         if (!swiper.mousewheel.enabled) return false;
//         events('off');
//         swiper.mousewheel.enabled = false;
//         return true;
//       }

//       on('init', () => {
//         if (!swiper.params.mousewheel.enabled && swiper.params.cssMode) {
//           disable();
//         }

//         if (swiper.params.mousewheel.enabled) enable();
//       });
//       on('destroy', () => {
//         if (swiper.params.cssMode) {
//           enable();
//         }

//         if (swiper.mousewheel.enabled) disable();
//       });
//       Object.assign(swiper.mousewheel, {
//         enable,
//         disable,
//       });
//     }

//     function createElementIfNotDefined(swiper, originalParams, params, checkProps) {
//       const document = getDocument();

//       if (swiper.params.createElements) {
//         Object.keys(checkProps).forEach((key) => {
//           if (!params[key] && params.auto === true) {
//             let element = swiper.$el.children(`.${checkProps[key]}`)[0];

//             if (!element) {
//               element = document.createElement('div');
//               element.className = checkProps[key];
//               swiper.$el.append(element);
//             }

//             params[key] = element;
//             originalParams[key] = element;
//           }
//         });
//       }

//       return params;
//     }

//     function Navigation({swiper, extendParams, on, emit}) {
//       extendParams({
//         navigation: {
//           nextEl: null,
//           prevEl: null,
//           hideOnClick: false,
//           disabledClass: 'swiper-button-disabled',
//           hiddenClass: 'swiper-button-hidden',
//           lockClass: 'swiper-button-lock',
//         },
//       });
//       swiper.navigation = {
//         nextEl: null,
//         $nextEl: null,
//         prevEl: null,
//         $prevEl: null,
//       };

//       function getEl(el) {
//         let $el;

//         if (el) {
//           $el = $(el);

//           if (
//             swiper.params.uniqueNavElements &&
//             typeof el === 'string' &&
//             $el.length > 1 &&
//             swiper.$el.find(el).length === 1
//           ) {
//             $el = swiper.$el.find(el);
//           }
//         }

//         return $el;
//       }

//       function toggleEl($el, disabled) {
//         const params = swiper.params.navigation;

//         if ($el && $el.length > 0) {
//           $el[disabled ? 'addClass' : 'removeClass'](params.disabledClass);
//           if ($el[0] && $el[0].tagName === 'BUTTON') $el[0].disabled = disabled;

//           if (swiper.params.watchOverflow && swiper.enabled) {
//             $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
//           }
//         }
//       }

//       function update() {
//         // Update Navigation Buttons
//         if (swiper.params.loop) return;
//         const {$nextEl, $prevEl} = swiper.navigation;
//         toggleEl($prevEl, swiper.isBeginning && !swiper.params.rewind);
//         toggleEl($nextEl, swiper.isEnd && !swiper.params.rewind);
//       }

//       function onPrevClick(e) {
//         e.preventDefault();
//         if (swiper.isBeginning && !swiper.params.loop && !swiper.params.rewind) return;
//         swiper.slidePrev();
//       }

//       function onNextClick(e) {
//         e.preventDefault();
//         if (swiper.isEnd && !swiper.params.loop && !swiper.params.rewind) return;
//         swiper.slideNext();
//       }

//       function init() {
//         const params = swiper.params.navigation;
//         swiper.params.navigation = createElementIfNotDefined(
//           swiper,
//           swiper.originalParams.navigation,
//           swiper.params.navigation,
//           {
//             nextEl: 'swiper-button-next',
//             prevEl: 'swiper-button-prev',
//           },
//         );
//         if (!(params.nextEl || params.prevEl)) return;
//         const $nextEl = getEl(params.nextEl);
//         const $prevEl = getEl(params.prevEl);

//         if ($nextEl && $nextEl.length > 0) {
//           $nextEl.on('click', onNextClick);
//         }

//         if ($prevEl && $prevEl.length > 0) {
//           $prevEl.on('click', onPrevClick);
//         }

//         Object.assign(swiper.navigation, {
//           $nextEl,
//           nextEl: $nextEl && $nextEl[0],
//           $prevEl,
//           prevEl: $prevEl && $prevEl[0],
//         });

//         if (!swiper.enabled) {
//           if ($nextEl) $nextEl.addClass(params.lockClass);
//           if ($prevEl) $prevEl.addClass(params.lockClass);
//         }
//       }

//       function destroy() {
//         const {$nextEl, $prevEl} = swiper.navigation;

//         if ($nextEl && $nextEl.length) {
//           $nextEl.off('click', onNextClick);
//           $nextEl.removeClass(swiper.params.navigation.disabledClass);
//         }

//         if ($prevEl && $prevEl.length) {
//           $prevEl.off('click', onPrevClick);
//           $prevEl.removeClass(swiper.params.navigation.disabledClass);
//         }
//       }

//       on('init', () => {
//         init();
//         update();
//       });
//       on('toEdge fromEdge lock unlock', () => {
//         update();
//       });
//       on('destroy', () => {
//         destroy();
//       });
//       on('enable disable', () => {
//         const {$nextEl, $prevEl} = swiper.navigation;

//         if ($nextEl) {
//           $nextEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
//         }

//         if ($prevEl) {
//           $prevEl[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.navigation.lockClass);
//         }
//       });
//       on('click', (_s, e) => {
//         const {$nextEl, $prevEl} = swiper.navigation;
//         const targetEl = e.target;

//         if (swiper.params.navigation.hideOnClick && !$(targetEl).is($prevEl) && !$(targetEl).is($nextEl)) {
//           if (
//             swiper.pagination &&
//             swiper.params.pagination &&
//             swiper.params.pagination.clickable &&
//             (swiper.pagination.el === targetEl || swiper.pagination.el.contains(targetEl))
//           )
//             return;
//           let isHidden;

//           if ($nextEl) {
//             isHidden = $nextEl.hasClass(swiper.params.navigation.hiddenClass);
//           } else if ($prevEl) {
//             isHidden = $prevEl.hasClass(swiper.params.navigation.hiddenClass);
//           }

//           if (isHidden === true) {
//             emit('navigationShow');
//           } else {
//             emit('navigationHide');
//           }

//           if ($nextEl) {
//             $nextEl.toggleClass(swiper.params.navigation.hiddenClass);
//           }

//           if ($prevEl) {
//             $prevEl.toggleClass(swiper.params.navigation.hiddenClass);
//           }
//         }
//       });
//       Object.assign(swiper.navigation, {
//         update,
//         init,
//         destroy,
//       });
//     }

//     function classesToSelector(classes = '') {
//       return `.${classes
//         .trim()
//         .replace(/([\.:!\/])/g, '\\$1') // eslint-disable-line
//         .replace(/ /g, '.')}`;
//     }

//     function Pagination({swiper, extendParams, on, emit}) {
//       const pfx = 'swiper-pagination';
//       extendParams({
//         pagination: {
//           el: null,
//           bulletElement: 'span',
//           clickable: false,
//           hideOnClick: false,
//           renderBullet: null,
//           renderProgressbar: null,
//           renderFraction: null,
//           renderCustom: null,
//           progressbarOpposite: false,
//           type: 'bullets',
//           // 'bullets' or 'progressbar' or 'fraction' or 'custom'
//           dynamicBullets: false,
//           dynamicMainBullets: 1,
//           formatFractionCurrent: (number) => number,
//           formatFractionTotal: (number) => number,
//           bulletClass: `${pfx}-bullet`,
//           bulletActiveClass: `${pfx}-bullet-active`,
//           modifierClass: `${pfx}-`,
//           currentClass: `${pfx}-current`,
//           totalClass: `${pfx}-total`,
//           hiddenClass: `${pfx}-hidden`,
//           progressbarFillClass: `${pfx}-progressbar-fill`,
//           progressbarOppositeClass: `${pfx}-progressbar-opposite`,
//           clickableClass: `${pfx}-clickable`,
//           lockClass: `${pfx}-lock`,
//           horizontalClass: `${pfx}-horizontal`,
//           verticalClass: `${pfx}-vertical`,
//         },
//       });
//       swiper.pagination = {
//         el: null,
//         $el: null,
//         bullets: [],
//       };
//       let bulletSize;
//       let dynamicBulletIndex = 0;

//       function isPaginationDisabled() {
//         return (
//           !swiper.params.pagination.el ||
//           !swiper.pagination.el ||
//           !swiper.pagination.$el ||
//           swiper.pagination.$el.length === 0
//         );
//       }

//       function setSideBullets($bulletEl, position) {
//         const {bulletActiveClass} = swiper.params.pagination;
//         $bulletEl[position]()
//           .addClass(`${bulletActiveClass}-${position}`)
//           [position]()
//           .addClass(`${bulletActiveClass}-${position}-${position}`);
//       }

//       function update() {
//         // Render || Update Pagination bullets/items
//         const rtl = swiper.rtl;
//         const params = swiper.params.pagination;
//         if (isPaginationDisabled()) return;
//         const slidesLength =
//           swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
//         const $el = swiper.pagination.$el; // Current/Total

//         let current;
//         const total = swiper.params.loop
//           ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup)
//           : swiper.snapGrid.length;

//         if (swiper.params.loop) {
//           current = Math.ceil((swiper.activeIndex - swiper.loopedSlides) / swiper.params.slidesPerGroup);

//           if (current > slidesLength - 1 - swiper.loopedSlides * 2) {
//             current -= slidesLength - swiper.loopedSlides * 2;
//           }

//           if (current > total - 1) current -= total;
//           if (current < 0 && swiper.params.paginationType !== 'bullets') current = total + current;
//         } else if (typeof swiper.snapIndex !== 'undefined') {
//           current = swiper.snapIndex;
//         } else {
//           current = swiper.activeIndex || 0;
//         } // Types

//         if (params.type === 'bullets' && swiper.pagination.bullets && swiper.pagination.bullets.length > 0) {
//           const bullets = swiper.pagination.bullets;
//           let firstIndex;
//           let lastIndex;
//           let midIndex;

//           if (params.dynamicBullets) {
//             bulletSize = bullets.eq(0)[swiper.isHorizontal() ? 'outerWidth' : 'outerHeight'](true);
//             $el.css(swiper.isHorizontal() ? 'width' : 'height', `${bulletSize * (params.dynamicMainBullets + 4)}px`);

//             if (params.dynamicMainBullets > 1 && swiper.previousIndex !== undefined) {
//               dynamicBulletIndex += current - (swiper.previousIndex - swiper.loopedSlides || 0);

//               if (dynamicBulletIndex > params.dynamicMainBullets - 1) {
//                 dynamicBulletIndex = params.dynamicMainBullets - 1;
//               } else if (dynamicBulletIndex < 0) {
//                 dynamicBulletIndex = 0;
//               }
//             }

//             firstIndex = Math.max(current - dynamicBulletIndex, 0);
//             lastIndex = firstIndex + (Math.min(bullets.length, params.dynamicMainBullets) - 1);
//             midIndex = (lastIndex + firstIndex) / 2;
//           }

//           bullets.removeClass(
//             ['', '-next', '-next-next', '-prev', '-prev-prev', '-main']
//               .map((suffix) => `${params.bulletActiveClass}${suffix}`)
//               .join(' '),
//           );

//           if ($el.length > 1) {
//             bullets.each((bullet) => {
//               const $bullet = $(bullet);
//               const bulletIndex = $bullet.index();

//               if (bulletIndex === current) {
//                 $bullet.addClass(params.bulletActiveClass);
//               }

//               if (params.dynamicBullets) {
//                 if (bulletIndex >= firstIndex && bulletIndex <= lastIndex) {
//                   $bullet.addClass(`${params.bulletActiveClass}-main`);
//                 }

//                 if (bulletIndex === firstIndex) {
//                   setSideBullets($bullet, 'prev');
//                 }

//                 if (bulletIndex === lastIndex) {
//                   setSideBullets($bullet, 'next');
//                 }
//               }
//             });
//           } else {
//             const $bullet = bullets.eq(current);
//             const bulletIndex = $bullet.index();
//             $bullet.addClass(params.bulletActiveClass);

//             if (params.dynamicBullets) {
//               const $firstDisplayedBullet = bullets.eq(firstIndex);
//               const $lastDisplayedBullet = bullets.eq(lastIndex);

//               for (let i = firstIndex; i <= lastIndex; i += 1) {
//                 bullets.eq(i).addClass(`${params.bulletActiveClass}-main`);
//               }

//               if (swiper.params.loop) {
//                 if (bulletIndex >= bullets.length) {
//                   for (let i = params.dynamicMainBullets; i >= 0; i -= 1) {
//                     bullets.eq(bullets.length - i).addClass(`${params.bulletActiveClass}-main`);
//                   }

//                   bullets
//                     .eq(bullets.length - params.dynamicMainBullets - 1)
//                     .addClass(`${params.bulletActiveClass}-prev`);
//                 } else {
//                   setSideBullets($firstDisplayedBullet, 'prev');
//                   setSideBullets($lastDisplayedBullet, 'next');
//                 }
//               } else {
//                 setSideBullets($firstDisplayedBullet, 'prev');
//                 setSideBullets($lastDisplayedBullet, 'next');
//               }
//             }
//           }

//           if (params.dynamicBullets) {
//             const dynamicBulletsLength = Math.min(bullets.length, params.dynamicMainBullets + 4);
//             const bulletsOffset = (bulletSize * dynamicBulletsLength - bulletSize) / 2 - midIndex * bulletSize;
//             const offsetProp = rtl ? 'right' : 'left';
//             bullets.css(swiper.isHorizontal() ? offsetProp : 'top', `${bulletsOffset}px`);
//           }
//         }

//         if (params.type === 'fraction') {
//           $el.find(classesToSelector(params.currentClass)).text(params.formatFractionCurrent(current + 1));
//           $el.find(classesToSelector(params.totalClass)).text(params.formatFractionTotal(total));
//         }

//         if (params.type === 'progressbar') {
//           let progressbarDirection;

//           if (params.progressbarOpposite) {
//             progressbarDirection = swiper.isHorizontal() ? 'vertical' : 'horizontal';
//           } else {
//             progressbarDirection = swiper.isHorizontal() ? 'horizontal' : 'vertical';
//           }

//           const scale = (current + 1) / total;
//           let scaleX = 1;
//           let scaleY = 1;

//           if (progressbarDirection === 'horizontal') {
//             scaleX = scale;
//           } else {
//             scaleY = scale;
//           }

//           $el
//             .find(classesToSelector(params.progressbarFillClass))
//             .transform(`translate3d(0,0,0) scaleX(${scaleX}) scaleY(${scaleY})`)
//             .transition(swiper.params.speed);
//         }

//         if (params.type === 'custom' && params.renderCustom) {
//           $el.html(params.renderCustom(swiper, current + 1, total));
//           emit('paginationRender', $el[0]);
//         } else {
//           emit('paginationUpdate', $el[0]);
//         }

//         if (swiper.params.watchOverflow && swiper.enabled) {
//           $el[swiper.isLocked ? 'addClass' : 'removeClass'](params.lockClass);
//         }
//       }

//       function render() {
//         // Render Container
//         const params = swiper.params.pagination;
//         if (isPaginationDisabled()) return;
//         const slidesLength =
//           swiper.virtual && swiper.params.virtual.enabled ? swiper.virtual.slides.length : swiper.slides.length;
//         const $el = swiper.pagination.$el;
//         let paginationHTML = '';

//         if (params.type === 'bullets') {
//           let numberOfBullets = swiper.params.loop
//             ? Math.ceil((slidesLength - swiper.loopedSlides * 2) / swiper.params.slidesPerGroup)
//             : swiper.snapGrid.length;

//           if (
//             swiper.params.freeMode &&
//             swiper.params.freeMode.enabled &&
//             !swiper.params.loop &&
//             numberOfBullets > slidesLength
//           ) {
//             numberOfBullets = slidesLength;
//           }

//           for (let i = 0; i < numberOfBullets; i += 1) {
//             if (params.renderBullet) {
//               paginationHTML += params.renderBullet.call(swiper, i, params.bulletClass);
//             } else {
//               paginationHTML += `<${params.bulletElement} class="${params.bulletClass}"></${params.bulletElement}>`;
//             }
//           }

//           $el.html(paginationHTML);
//           swiper.pagination.bullets = $el.find(classesToSelector(params.bulletClass));
//         }

//         if (params.type === 'fraction') {
//           if (params.renderFraction) {
//             paginationHTML = params.renderFraction.call(swiper, params.currentClass, params.totalClass);
//           } else {
//             paginationHTML =
//               `<span class="${params.currentClass}"></span>` + ' / ' + `<span class="${params.totalClass}"></span>`;
//           }

//           $el.html(paginationHTML);
//         }

//         if (params.type === 'progressbar') {
//           if (params.renderProgressbar) {
//             paginationHTML = params.renderProgressbar.call(swiper, params.progressbarFillClass);
//           } else {
//             paginationHTML = `<span class="${params.progressbarFillClass}"></span>`;
//           }

//           $el.html(paginationHTML);
//         }

//         if (params.type !== 'custom') {
//           emit('paginationRender', swiper.pagination.$el[0]);
//         }
//       }

//       function init() {
//         swiper.params.pagination = createElementIfNotDefined(
//           swiper,
//           swiper.originalParams.pagination,
//           swiper.params.pagination,
//           {
//             el: 'swiper-pagination',
//           },
//         );
//         const params = swiper.params.pagination;
//         if (!params.el) return;
//         let $el = $(params.el);
//         if ($el.length === 0) return;

//         if (swiper.params.uniqueNavElements && typeof params.el === 'string' && $el.length > 1) {
//           $el = swiper.$el.find(params.el); // check if it belongs to another nested Swiper

//           if ($el.length > 1) {
//             $el = $el.filter((el) => {
//               if ($(el).parents('.swiper')[0] !== swiper.el) return false;
//               return true;
//             });
//           }
//         }

//         if (params.type === 'bullets' && params.clickable) {
//           $el.addClass(params.clickableClass);
//         }

//         $el.addClass(params.modifierClass + params.type);
//         $el.addClass(params.modifierClass + swiper.params.direction);

//         if (params.type === 'bullets' && params.dynamicBullets) {
//           $el.addClass(`${params.modifierClass}${params.type}-dynamic`);
//           dynamicBulletIndex = 0;

//           if (params.dynamicMainBullets < 1) {
//             params.dynamicMainBullets = 1;
//           }
//         }

//         if (params.type === 'progressbar' && params.progressbarOpposite) {
//           $el.addClass(params.progressbarOppositeClass);
//         }

//         if (params.clickable) {
//           $el.on('click', classesToSelector(params.bulletClass), function onClick(e) {
//             e.preventDefault();
//             let index = $(this).index() * swiper.params.slidesPerGroup;
//             if (swiper.params.loop) index += swiper.loopedSlides;
//             swiper.slideTo(index);
//           });
//         }

//         Object.assign(swiper.pagination, {
//           $el,
//           el: $el[0],
//         });

//         if (!swiper.enabled) {
//           $el.addClass(params.lockClass);
//         }
//       }

//       function destroy() {
//         const params = swiper.params.pagination;
//         if (isPaginationDisabled()) return;
//         const $el = swiper.pagination.$el;
//         $el.removeClass(params.hiddenClass);
//         $el.removeClass(params.modifierClass + params.type);
//         $el.removeClass(params.modifierClass + swiper.params.direction);
//         if (swiper.pagination.bullets && swiper.pagination.bullets.removeClass)
//           swiper.pagination.bullets.removeClass(params.bulletActiveClass);

//         if (params.clickable) {
//           $el.off('click', classesToSelector(params.bulletClass));
//         }
//       }

//       on('init', () => {
//         init();
//         render();
//         update();
//       });
//       on('activeIndexChange', () => {
//         if (swiper.params.loop) {
//           update();
//         } else if (typeof swiper.snapIndex === 'undefined') {
//           update();
//         }
//       });
//       on('snapIndexChange', () => {
//         if (!swiper.params.loop) {
//           update();
//         }
//       });
//       on('slidesLengthChange', () => {
//         if (swiper.params.loop) {
//           render();
//           update();
//         }
//       });
//       on('snapGridLengthChange', () => {
//         if (!swiper.params.loop) {
//           render();
//           update();
//         }
//       });
//       on('destroy', () => {
//         destroy();
//       });
//       on('enable disable', () => {
//         const {$el} = swiper.pagination;

//         if ($el) {
//           $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.pagination.lockClass);
//         }
//       });
//       on('lock unlock', () => {
//         update();
//       });
//       on('click', (_s, e) => {
//         const targetEl = e.target;
//         const {$el} = swiper.pagination;

//         if (
//           swiper.params.pagination.el &&
//           swiper.params.pagination.hideOnClick &&
//           $el.length > 0 &&
//           !$(targetEl).hasClass(swiper.params.pagination.bulletClass)
//         ) {
//           if (
//             swiper.navigation &&
//             ((swiper.navigation.nextEl && targetEl === swiper.navigation.nextEl) ||
//               (swiper.navigation.prevEl && targetEl === swiper.navigation.prevEl))
//           )
//             return;
//           const isHidden = $el.hasClass(swiper.params.pagination.hiddenClass);

//           if (isHidden === true) {
//             emit('paginationShow');
//           } else {
//             emit('paginationHide');
//           }

//           $el.toggleClass(swiper.params.pagination.hiddenClass);
//         }
//       });
//       Object.assign(swiper.pagination, {
//         render,
//         update,
//         init,
//         destroy,
//       });
//     }

//     function Scrollbar({swiper, extendParams, on, emit}) {
//       const document = getDocument();
//       let isTouched = false;
//       let timeout = null;
//       let dragTimeout = null;
//       let dragStartPos;
//       let dragSize;
//       let trackSize;
//       let divider;
//       extendParams({
//         scrollbar: {
//           el: null,
//           dragSize: 'auto',
//           hide: false,
//           draggable: false,
//           snapOnRelease: true,
//           lockClass: 'swiper-scrollbar-lock',
//           dragClass: 'swiper-scrollbar-drag',
//         },
//       });
//       swiper.scrollbar = {
//         el: null,
//         dragEl: null,
//         $el: null,
//         $dragEl: null,
//       };

//       function setTranslate() {
//         if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
//         const {scrollbar, rtlTranslate: rtl, progress} = swiper;
//         const {$dragEl, $el} = scrollbar;
//         const params = swiper.params.scrollbar;
//         let newSize = dragSize;
//         let newPos = (trackSize - dragSize) * progress;

//         if (rtl) {
//           newPos = -newPos;

//           if (newPos > 0) {
//             newSize = dragSize - newPos;
//             newPos = 0;
//           } else if (-newPos + dragSize > trackSize) {
//             newSize = trackSize + newPos;
//           }
//         } else if (newPos < 0) {
//           newSize = dragSize + newPos;
//           newPos = 0;
//         } else if (newPos + dragSize > trackSize) {
//           newSize = trackSize - newPos;
//         }

//         if (swiper.isHorizontal()) {
//           $dragEl.transform(`translate3d(${newPos}px, 0, 0)`);
//           $dragEl[0].style.width = `${newSize}px`;
//         } else {
//           $dragEl.transform(`translate3d(0px, ${newPos}px, 0)`);
//           $dragEl[0].style.height = `${newSize}px`;
//         }

//         if (params.hide) {
//           clearTimeout(timeout);
//           $el[0].style.opacity = 1;
//           timeout = setTimeout(() => {
//             $el[0].style.opacity = 0;
//             $el.transition(400);
//           }, 1000);
//         }
//       }

//       function setTransition(duration) {
//         if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
//         swiper.scrollbar.$dragEl.transition(duration);
//       }

//       function updateSize() {
//         if (!swiper.params.scrollbar.el || !swiper.scrollbar.el) return;
//         const {scrollbar} = swiper;
//         const {$dragEl, $el} = scrollbar;
//         $dragEl[0].style.width = '';
//         $dragEl[0].style.height = '';
//         trackSize = swiper.isHorizontal() ? $el[0].offsetWidth : $el[0].offsetHeight;
//         divider =
//           swiper.size /
//           (swiper.virtualSize +
//             swiper.params.slidesOffsetBefore -
//             (swiper.params.centeredSlides ? swiper.snapGrid[0] : 0));

//         if (swiper.params.scrollbar.dragSize === 'auto') {
//           dragSize = trackSize * divider;
//         } else {
//           dragSize = parseInt(swiper.params.scrollbar.dragSize, 10);
//         }

//         if (swiper.isHorizontal()) {
//           $dragEl[0].style.width = `${dragSize}px`;
//         } else {
//           $dragEl[0].style.height = `${dragSize}px`;
//         }

//         if (divider >= 1) {
//           $el[0].style.display = 'none';
//         } else {
//           $el[0].style.display = '';
//         }

//         if (swiper.params.scrollbar.hide) {
//           $el[0].style.opacity = 0;
//         }

//         if (swiper.params.watchOverflow && swiper.enabled) {
//           scrollbar.$el[swiper.isLocked ? 'addClass' : 'removeClass'](swiper.params.scrollbar.lockClass);
//         }
//       }

//       function getPointerPosition(e) {
//         if (swiper.isHorizontal()) {
//           return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientX : e.clientX;
//         }

//         return e.type === 'touchstart' || e.type === 'touchmove' ? e.targetTouches[0].clientY : e.clientY;
//       }

//       function setDragPosition(e) {
//         const {scrollbar, rtlTranslate: rtl} = swiper;
//         const {$el} = scrollbar;
//         let positionRatio;
//         positionRatio =
//           (getPointerPosition(e) -
//             $el.offset()[swiper.isHorizontal() ? 'left' : 'top'] -
//             (dragStartPos !== null ? dragStartPos : dragSize / 2)) /
//           (trackSize - dragSize);
//         positionRatio = Math.max(Math.min(positionRatio, 1), 0);

//         if (rtl) {
//           positionRatio = 1 - positionRatio;
//         }

//         const position = swiper.minTranslate() + (swiper.maxTranslate() - swiper.minTranslate()) * positionRatio;
//         swiper.updateProgress(position);
//         swiper.setTranslate(position);
//         swiper.updateActiveIndex();
//         swiper.updateSlidesClasses();
//       }

//       function onDragStart(e) {
//         const params = swiper.params.scrollbar;
//         const {scrollbar, $wrapperEl} = swiper;
//         const {$el, $dragEl} = scrollbar;
//         isTouched = true;
//         dragStartPos =
//           e.target === $dragEl[0] || e.target === $dragEl
//             ? getPointerPosition(e) - e.target.getBoundingClientRect()[swiper.isHorizontal() ? 'left' : 'top']
//             : null;
//         e.preventDefault();
//         e.stopPropagation();
//         $wrapperEl.transition(100);
//         $dragEl.transition(100);
//         setDragPosition(e);
//         clearTimeout(dragTimeout);
//         $el.transition(0);

//         if (params.hide) {
//           $el.css('opacity', 1);
//         }

//         if (swiper.params.cssMode) {
//           swiper.$wrapperEl.css('scroll-snap-type', 'none');
//         }

//         emit('scrollbarDragStart', e);
//       }

//       function onDragMove(e) {
//         const {scrollbar, $wrapperEl} = swiper;
//         const {$el, $dragEl} = scrollbar;
//         if (!isTouched) return;
//         if (e.preventDefault) e.preventDefault();
//         else e.returnValue = false;
//         setDragPosition(e);
//         $wrapperEl.transition(0);
//         $el.transition(0);
//         $dragEl.transition(0);
//         emit('scrollbarDragMove', e);
//       }

//       function onDragEnd(e) {
//         const params = swiper.params.scrollbar;
//         const {scrollbar, $wrapperEl} = swiper;
//         const {$el} = scrollbar;
//         if (!isTouched) return;
//         isTouched = false;

//         if (swiper.params.cssMode) {
//           swiper.$wrapperEl.css('scroll-snap-type', '');
//           $wrapperEl.transition('');
//         }

//         if (params.hide) {
//           clearTimeout(dragTimeout);
//           dragTimeout = nextTick(() => {
//             $el.css('opacity', 0);
//             $el.transition(400);
//           }, 1000);
//         }

//         emit('scrollbarDragEnd', e);

//         if (params.snapOnRelease) {
//           swiper.slideToClosest();
//         }
//       }

//       function events(method) {
//         const {scrollbar, touchEventsTouch, touchEventsDesktop, params, support} = swiper;
//         const $el = scrollbar.$el;
//         const target = $el[0];
//         const activeListener =
//           support.passiveListener && params.passiveListeners
//             ? {
//                 passive: false,
//                 capture: false,
//               }
//             : false;
//         const passiveListener =
//           support.passiveListener && params.passiveListeners
//             ? {
//                 passive: true,
//                 capture: false,
//               }
//             : false;
//         if (!target) return;
//         const eventMethod = method === 'on' ? 'addEventListener' : 'removeEventListener';

//         if (!support.touch) {
//           target[eventMethod](touchEventsDesktop.start, onDragStart, activeListener);
//           document[eventMethod](touchEventsDesktop.move, onDragMove, activeListener);
//           document[eventMethod](touchEventsDesktop.end, onDragEnd, passiveListener);
//         } else {
//           target[eventMethod](touchEventsTouch.start, onDragStart, activeListener);
//           target[eventMethod](touchEventsTouch.move, onDragMove, activeListener);
//           target[eventMethod](touchEventsTouch.end, onDragEnd, passiveListener);
//         }
//       }

//       function enableDraggable() {
//         if (!swiper.params.scrollbar.el) return;
//         events('on');
//       }

//       function disableDraggable() {
//         if (!swiper.params.scrollbar.el) return;
//         events('off');
//       }

//       function init() {
//         const {scrollbar, $el: $swiperEl} = swiper;
//         swiper.params.scrollbar = createElementIfNotDefined(
//           swiper,
//           swiper.originalParams.scrollbar,
//           swiper.params.scrollbar,
//           {
//             el: 'swiper-scrollbar',
//           },
//         );
//         const params = swiper.params.scrollbar;
//         if (!params.el) return;
//         let $el = $(params.el);

//         if (
//           swiper.params.uniqueNavElements &&
//           typeof params.el === 'string' &&
//           $el.length > 1 &&
//           $swiperEl.find(params.el).length === 1
//         ) {
//           $el = $swiperEl.find(params.el);
//         }

//         let $dragEl = $el.find(`.${swiper.params.scrollbar.dragClass}`);

//         if ($dragEl.length === 0) {
//           $dragEl = $(`<div class="${swiper.params.scrollbar.dragClass}"></div>`);
//           $el.append($dragEl);
//         }

//         Object.assign(scrollbar, {
//           $el,
//           el: $el[0],
//           $dragEl,
//           dragEl: $dragEl[0],
//         });

//         if (params.draggable) {
//           enableDraggable();
//         }

//         if ($el) {
//           $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
//         }
//       }

//       function destroy() {
//         disableDraggable();
//       }

//       on('init', () => {
//         init();
//         updateSize();
//         setTranslate();
//       });
//       on('update resize observerUpdate lock unlock', () => {
//         updateSize();
//       });
//       on('setTranslate', () => {
//         setTranslate();
//       });
//       on('setTransition', (_s, duration) => {
//         setTransition(duration);
//       });
//       on('enable disable', () => {
//         const {$el} = swiper.scrollbar;

//         if ($el) {
//           $el[swiper.enabled ? 'removeClass' : 'addClass'](swiper.params.scrollbar.lockClass);
//         }
//       });
//       on('destroy', () => {
//         destroy();
//       });
//       Object.assign(swiper.scrollbar, {
//         updateSize,
//         setTranslate,
//         init,
//         destroy,
//       });
//     }

//     function Parallax({swiper, extendParams, on}) {
//       extendParams({
//         parallax: {
//           enabled: false,
//         },
//       });

//       const setTransform = (el, progress) => {
//         const {rtl} = swiper;
//         const $el = $(el);
//         const rtlFactor = rtl ? -1 : 1;
//         const p = $el.attr('data-swiper-parallax') || '0';
//         let x = $el.attr('data-swiper-parallax-x');
//         let y = $el.attr('data-swiper-parallax-y');
//         const scale = $el.attr('data-swiper-parallax-scale');
//         const opacity = $el.attr('data-swiper-parallax-opacity');

//         if (x || y) {
//           x = x || '0';
//           y = y || '0';
//         } else if (swiper.isHorizontal()) {
//           x = p;
//           y = '0';
//         } else {
//           y = p;
//           x = '0';
//         }

//         if (x.indexOf('%') >= 0) {
//           x = `${parseInt(x, 10) * progress * rtlFactor}%`;
//         } else {
//           x = `${x * progress * rtlFactor}px`;
//         }

//         if (y.indexOf('%') >= 0) {
//           y = `${parseInt(y, 10) * progress}%`;
//         } else {
//           y = `${y * progress}px`;
//         }

//         if (typeof opacity !== 'undefined' && opacity !== null) {
//           const currentOpacity = opacity - (opacity - 1) * (1 - Math.abs(progress));
//           $el[0].style.opacity = currentOpacity;
//         }

//         if (typeof scale === 'undefined' || scale === null) {
//           $el.transform(`translate3d(${x}, ${y}, 0px)`);
//         } else {
//           const currentScale = scale - (scale - 1) * (1 - Math.abs(progress));
//           $el.transform(`translate3d(${x}, ${y}, 0px) scale(${currentScale})`);
//         }
//       };

//       const setTranslate = () => {
//         const {$el, slides, progress, snapGrid} = swiper;
//         $el
//           .children(
//             '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
//           )
//           .each((el) => {
//             setTransform(el, progress);
//           });
//         slides.each((slideEl, slideIndex) => {
//           let slideProgress = slideEl.progress;

//           if (swiper.params.slidesPerGroup > 1 && swiper.params.slidesPerView !== 'auto') {
//             slideProgress += Math.ceil(slideIndex / 2) - progress * (snapGrid.length - 1);
//           }

//           slideProgress = Math.min(Math.max(slideProgress, -1), 1);
//           $(slideEl)
//             .find(
//               '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
//             )
//             .each((el) => {
//               setTransform(el, slideProgress);
//             });
//         });
//       };

//       const setTransition = (duration = swiper.params.speed) => {
//         const {$el} = swiper;
//         $el
//           .find(
//             '[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]',
//           )
//           .each((parallaxEl) => {
//             const $parallaxEl = $(parallaxEl);
//             let parallaxDuration = parseInt($parallaxEl.attr('data-swiper-parallax-duration'), 10) || duration;
//             if (duration === 0) parallaxDuration = 0;
//             $parallaxEl.transition(parallaxDuration);
//           });
//       };

//       on('beforeInit', () => {
//         if (!swiper.params.parallax.enabled) return;
//         swiper.params.watchSlidesProgress = true;
//         swiper.originalParams.watchSlidesProgress = true;
//       });
//       on('init', () => {
//         if (!swiper.params.parallax.enabled) return;
//         setTranslate();
//       });
//       on('setTranslate', () => {
//         if (!swiper.params.parallax.enabled) return;
//         setTranslate();
//       });
//       on('setTransition', (_swiper, duration) => {
//         if (!swiper.params.parallax.enabled) return;
//         setTransition(duration);
//       });
//     }

//     function Zoom({swiper, extendParams, on, emit}) {
//       const window = getWindow();
//       extendParams({
//         zoom: {
//           enabled: false,
//           maxRatio: 3,
//           minRatio: 1,
//           toggle: true,
//           containerClass: 'swiper-zoom-container',
//           zoomedSlideClass: 'swiper-slide-zoomed',
//         },
//       });
//       swiper.zoom = {
//         enabled: false,
//       };
//       let currentScale = 1;
//       let isScaling = false;
//       let gesturesEnabled;
//       let fakeGestureTouched;
//       let fakeGestureMoved;
//       const gesture = {
//         $slideEl: undefined,
//         slideWidth: undefined,
//         slideHeight: undefined,
//         $imageEl: undefined,
//         $imageWrapEl: undefined,
//         maxRatio: 3,
//       };
//       const image = {
//         isTouched: undefined,
//         isMoved: undefined,
//         currentX: undefined,
//         currentY: undefined,
//         minX: undefined,
//         minY: undefined,
//         maxX: undefined,
//         maxY: undefined,
//         width: undefined,
//         height: undefined,
//         startX: undefined,
//         startY: undefined,
//         touchesStart: {},
//         touchesCurrent: {},
//       };
//       const velocity = {
//         x: undefined,
//         y: undefined,
//         prevPositionX: undefined,
//         prevPositionY: undefined,
//         prevTime: undefined,
//       };
//       let scale = 1;
//       Object.defineProperty(swiper.zoom, 'scale', {
//         get() {
//           return scale;
//         },

//         set(value) {
//           if (scale !== value) {
//             const imageEl = gesture.$imageEl ? gesture.$imageEl[0] : undefined;
//             const slideEl = gesture.$slideEl ? gesture.$slideEl[0] : undefined;
//             emit('zoomChange', value, imageEl, slideEl);
//           }

//           scale = value;
//         },
//       });

//       function getDistanceBetweenTouches(e) {
//         if (e.targetTouches.length < 2) return 1;
//         const x1 = e.targetTouches[0].pageX;
//         const y1 = e.targetTouches[0].pageY;
//         const x2 = e.targetTouches[1].pageX;
//         const y2 = e.targetTouches[1].pageY;
//         const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
//         return distance;
//       } // Events

//       function onGestureStart(e) {
//         const support = swiper.support;
//         const params = swiper.params.zoom;
//         fakeGestureTouched = false;
//         fakeGestureMoved = false;

//         if (!support.gestures) {
//           if (e.type !== 'touchstart' || (e.type === 'touchstart' && e.targetTouches.length < 2)) {
//             return;
//           }

//           fakeGestureTouched = true;
//           gesture.scaleStart = getDistanceBetweenTouches(e);
//         }

//         if (!gesture.$slideEl || !gesture.$slideEl.length) {
//           gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
//           if (gesture.$slideEl.length === 0) gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
//           gesture.$imageEl = gesture.$slideEl
//             .find(`.${params.containerClass}`)
//             .eq(0)
//             .find('picture, img, svg, canvas, .swiper-zoom-target')
//             .eq(0);
//           gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
//           gesture.maxRatio = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

//           if (gesture.$imageWrapEl.length === 0) {
//             gesture.$imageEl = undefined;
//             return;
//           }
//         }

//         if (gesture.$imageEl) {
//           gesture.$imageEl.transition(0);
//         }

//         isScaling = true;
//       }

//       function onGestureChange(e) {
//         const support = swiper.support;
//         const params = swiper.params.zoom;
//         const zoom = swiper.zoom;

//         if (!support.gestures) {
//           if (e.type !== 'touchmove' || (e.type === 'touchmove' && e.targetTouches.length < 2)) {
//             return;
//           }

//           fakeGestureMoved = true;
//           gesture.scaleMove = getDistanceBetweenTouches(e);
//         }

//         if (!gesture.$imageEl || gesture.$imageEl.length === 0) {
//           if (e.type === 'gesturechange') onGestureStart(e);
//           return;
//         }

//         if (support.gestures) {
//           zoom.scale = e.scale * currentScale;
//         } else {
//           zoom.scale = (gesture.scaleMove / gesture.scaleStart) * currentScale;
//         }

//         if (zoom.scale > gesture.maxRatio) {
//           zoom.scale = gesture.maxRatio - 1 + (zoom.scale - gesture.maxRatio + 1) ** 0.5;
//         }

//         if (zoom.scale < params.minRatio) {
//           zoom.scale = params.minRatio + 1 - (params.minRatio - zoom.scale + 1) ** 0.5;
//         }

//         gesture.$imageEl.transform(`translate3d(0,0,0) scale(${zoom.scale})`);
//       }

//       function onGestureEnd(e) {
//         const device = swiper.device;
//         const support = swiper.support;
//         const params = swiper.params.zoom;
//         const zoom = swiper.zoom;

//         if (!support.gestures) {
//           if (!fakeGestureTouched || !fakeGestureMoved) {
//             return;
//           }

//           if (e.type !== 'touchend' || (e.type === 'touchend' && e.changedTouches.length < 2 && !device.android)) {
//             return;
//           }

//           fakeGestureTouched = false;
//           fakeGestureMoved = false;
//         }

//         if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
//         zoom.scale = Math.max(Math.min(zoom.scale, gesture.maxRatio), params.minRatio);
//         gesture.$imageEl.transition(swiper.params.speed).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
//         currentScale = zoom.scale;
//         isScaling = false;
//         if (zoom.scale === 1) gesture.$slideEl = undefined;
//       }

//       function onTouchStart(e) {
//         const device = swiper.device;
//         if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
//         if (image.isTouched) return;
//         if (device.android && e.cancelable) e.preventDefault();
//         image.isTouched = true;
//         image.touchesStart.x = e.type === 'touchstart' ? e.targetTouches[0].pageX : e.pageX;
//         image.touchesStart.y = e.type === 'touchstart' ? e.targetTouches[0].pageY : e.pageY;
//       }

//       function onTouchMove(e) {
//         const zoom = swiper.zoom;
//         if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;
//         swiper.allowClick = false;
//         if (!image.isTouched || !gesture.$slideEl) return;

//         if (!image.isMoved) {
//           image.width = gesture.$imageEl[0].offsetWidth;
//           image.height = gesture.$imageEl[0].offsetHeight;
//           image.startX = getTranslate(gesture.$imageWrapEl[0], 'x') || 0;
//           image.startY = getTranslate(gesture.$imageWrapEl[0], 'y') || 0;
//           gesture.slideWidth = gesture.$slideEl[0].offsetWidth;
//           gesture.slideHeight = gesture.$slideEl[0].offsetHeight;
//           gesture.$imageWrapEl.transition(0);
//         } // Define if we need image drag

//         const scaledWidth = image.width * zoom.scale;
//         const scaledHeight = image.height * zoom.scale;
//         if (scaledWidth < gesture.slideWidth && scaledHeight < gesture.slideHeight) return;
//         image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
//         image.maxX = -image.minX;
//         image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
//         image.maxY = -image.minY;
//         image.touchesCurrent.x = e.type === 'touchmove' ? e.targetTouches[0].pageX : e.pageX;
//         image.touchesCurrent.y = e.type === 'touchmove' ? e.targetTouches[0].pageY : e.pageY;

//         if (!image.isMoved && !isScaling) {
//           if (
//             swiper.isHorizontal() &&
//             ((Math.floor(image.minX) === Math.floor(image.startX) && image.touchesCurrent.x < image.touchesStart.x) ||
//               (Math.floor(image.maxX) === Math.floor(image.startX) && image.touchesCurrent.x > image.touchesStart.x))
//           ) {
//             image.isTouched = false;
//             return;
//           }

//           if (
//             !swiper.isHorizontal() &&
//             ((Math.floor(image.minY) === Math.floor(image.startY) && image.touchesCurrent.y < image.touchesStart.y) ||
//               (Math.floor(image.maxY) === Math.floor(image.startY) && image.touchesCurrent.y > image.touchesStart.y))
//           ) {
//             image.isTouched = false;
//             return;
//           }
//         }

//         if (e.cancelable) {
//           e.preventDefault();
//         }

//         e.stopPropagation();
//         image.isMoved = true;
//         image.currentX = image.touchesCurrent.x - image.touchesStart.x + image.startX;
//         image.currentY = image.touchesCurrent.y - image.touchesStart.y + image.startY;

//         if (image.currentX < image.minX) {
//           image.currentX = image.minX + 1 - (image.minX - image.currentX + 1) ** 0.8;
//         }

//         if (image.currentX > image.maxX) {
//           image.currentX = image.maxX - 1 + (image.currentX - image.maxX + 1) ** 0.8;
//         }

//         if (image.currentY < image.minY) {
//           image.currentY = image.minY + 1 - (image.minY - image.currentY + 1) ** 0.8;
//         }

//         if (image.currentY > image.maxY) {
//           image.currentY = image.maxY - 1 + (image.currentY - image.maxY + 1) ** 0.8;
//         } // Velocity

//         if (!velocity.prevPositionX) velocity.prevPositionX = image.touchesCurrent.x;
//         if (!velocity.prevPositionY) velocity.prevPositionY = image.touchesCurrent.y;
//         if (!velocity.prevTime) velocity.prevTime = Date.now();
//         velocity.x = (image.touchesCurrent.x - velocity.prevPositionX) / (Date.now() - velocity.prevTime) / 2;
//         velocity.y = (image.touchesCurrent.y - velocity.prevPositionY) / (Date.now() - velocity.prevTime) / 2;
//         if (Math.abs(image.touchesCurrent.x - velocity.prevPositionX) < 2) velocity.x = 0;
//         if (Math.abs(image.touchesCurrent.y - velocity.prevPositionY) < 2) velocity.y = 0;
//         velocity.prevPositionX = image.touchesCurrent.x;
//         velocity.prevPositionY = image.touchesCurrent.y;
//         velocity.prevTime = Date.now();
//         gesture.$imageWrapEl.transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
//       }

//       function onTouchEnd() {
//         const zoom = swiper.zoom;
//         if (!gesture.$imageEl || gesture.$imageEl.length === 0) return;

//         if (!image.isTouched || !image.isMoved) {
//           image.isTouched = false;
//           image.isMoved = false;
//           return;
//         }

//         image.isTouched = false;
//         image.isMoved = false;
//         let momentumDurationX = 300;
//         let momentumDurationY = 300;
//         const momentumDistanceX = velocity.x * momentumDurationX;
//         const newPositionX = image.currentX + momentumDistanceX;
//         const momentumDistanceY = velocity.y * momentumDurationY;
//         const newPositionY = image.currentY + momentumDistanceY; // Fix duration

//         if (velocity.x !== 0) momentumDurationX = Math.abs((newPositionX - image.currentX) / velocity.x);
//         if (velocity.y !== 0) momentumDurationY = Math.abs((newPositionY - image.currentY) / velocity.y);
//         const momentumDuration = Math.max(momentumDurationX, momentumDurationY);
//         image.currentX = newPositionX;
//         image.currentY = newPositionY; // Define if we need image drag

//         const scaledWidth = image.width * zoom.scale;
//         const scaledHeight = image.height * zoom.scale;
//         image.minX = Math.min(gesture.slideWidth / 2 - scaledWidth / 2, 0);
//         image.maxX = -image.minX;
//         image.minY = Math.min(gesture.slideHeight / 2 - scaledHeight / 2, 0);
//         image.maxY = -image.minY;
//         image.currentX = Math.max(Math.min(image.currentX, image.maxX), image.minX);
//         image.currentY = Math.max(Math.min(image.currentY, image.maxY), image.minY);
//         gesture.$imageWrapEl
//           .transition(momentumDuration)
//           .transform(`translate3d(${image.currentX}px, ${image.currentY}px,0)`);
//       }

//       function onTransitionEnd() {
//         const zoom = swiper.zoom;

//         if (gesture.$slideEl && swiper.previousIndex !== swiper.activeIndex) {
//           if (gesture.$imageEl) {
//             gesture.$imageEl.transform('translate3d(0,0,0) scale(1)');
//           }

//           if (gesture.$imageWrapEl) {
//             gesture.$imageWrapEl.transform('translate3d(0,0,0)');
//           }

//           zoom.scale = 1;
//           currentScale = 1;
//           gesture.$slideEl = undefined;
//           gesture.$imageEl = undefined;
//           gesture.$imageWrapEl = undefined;
//         }
//       }

//       function zoomIn(e) {
//         const zoom = swiper.zoom;
//         const params = swiper.params.zoom;

//         if (!gesture.$slideEl) {
//           if (e && e.target) {
//             gesture.$slideEl = $(e.target).closest(`.${swiper.params.slideClass}`);
//           }

//           if (!gesture.$slideEl) {
//             if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
//               gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
//             } else {
//               gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
//             }
//           }

//           gesture.$imageEl = gesture.$slideEl
//             .find(`.${params.containerClass}`)
//             .eq(0)
//             .find('picture, img, svg, canvas, .swiper-zoom-target')
//             .eq(0);
//           gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
//         }

//         if (
//           !gesture.$imageEl ||
//           gesture.$imageEl.length === 0 ||
//           !gesture.$imageWrapEl ||
//           gesture.$imageWrapEl.length === 0
//         )
//           return;

//         if (swiper.params.cssMode) {
//           swiper.wrapperEl.style.overflow = 'hidden';
//           swiper.wrapperEl.style.touchAction = 'none';
//         }

//         gesture.$slideEl.addClass(`${params.zoomedSlideClass}`);
//         let touchX;
//         let touchY;
//         let offsetX;
//         let offsetY;
//         let diffX;
//         let diffY;
//         let translateX;
//         let translateY;
//         let imageWidth;
//         let imageHeight;
//         let scaledWidth;
//         let scaledHeight;
//         let translateMinX;
//         let translateMinY;
//         let translateMaxX;
//         let translateMaxY;
//         let slideWidth;
//         let slideHeight;

//         if (typeof image.touchesStart.x === 'undefined' && e) {
//           touchX = e.type === 'touchend' ? e.changedTouches[0].pageX : e.pageX;
//           touchY = e.type === 'touchend' ? e.changedTouches[0].pageY : e.pageY;
//         } else {
//           touchX = image.touchesStart.x;
//           touchY = image.touchesStart.y;
//         }

//         zoom.scale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;
//         currentScale = gesture.$imageWrapEl.attr('data-swiper-zoom') || params.maxRatio;

//         if (e) {
//           slideWidth = gesture.$slideEl[0].offsetWidth;
//           slideHeight = gesture.$slideEl[0].offsetHeight;
//           offsetX = gesture.$slideEl.offset().left + window.scrollX;
//           offsetY = gesture.$slideEl.offset().top + window.scrollY;
//           diffX = offsetX + slideWidth / 2 - touchX;
//           diffY = offsetY + slideHeight / 2 - touchY;
//           imageWidth = gesture.$imageEl[0].offsetWidth;
//           imageHeight = gesture.$imageEl[0].offsetHeight;
//           scaledWidth = imageWidth * zoom.scale;
//           scaledHeight = imageHeight * zoom.scale;
//           translateMinX = Math.min(slideWidth / 2 - scaledWidth / 2, 0);
//           translateMinY = Math.min(slideHeight / 2 - scaledHeight / 2, 0);
//           translateMaxX = -translateMinX;
//           translateMaxY = -translateMinY;
//           translateX = diffX * zoom.scale;
//           translateY = diffY * zoom.scale;

//           if (translateX < translateMinX) {
//             translateX = translateMinX;
//           }

//           if (translateX > translateMaxX) {
//             translateX = translateMaxX;
//           }

//           if (translateY < translateMinY) {
//             translateY = translateMinY;
//           }

//           if (translateY > translateMaxY) {
//             translateY = translateMaxY;
//           }
//         } else {
//           translateX = 0;
//           translateY = 0;
//         }

//         gesture.$imageWrapEl.transition(300).transform(`translate3d(${translateX}px, ${translateY}px,0)`);
//         gesture.$imageEl.transition(300).transform(`translate3d(0,0,0) scale(${zoom.scale})`);
//       }

//       function zoomOut() {
//         const zoom = swiper.zoom;
//         const params = swiper.params.zoom;

//         if (!gesture.$slideEl) {
//           if (swiper.params.virtual && swiper.params.virtual.enabled && swiper.virtual) {
//             gesture.$slideEl = swiper.$wrapperEl.children(`.${swiper.params.slideActiveClass}`);
//           } else {
//             gesture.$slideEl = swiper.slides.eq(swiper.activeIndex);
//           }

//           gesture.$imageEl = gesture.$slideEl
//             .find(`.${params.containerClass}`)
//             .eq(0)
//             .find('picture, img, svg, canvas, .swiper-zoom-target')
//             .eq(0);
//           gesture.$imageWrapEl = gesture.$imageEl.parent(`.${params.containerClass}`);
//         }

//         if (
//           !gesture.$imageEl ||
//           gesture.$imageEl.length === 0 ||
//           !gesture.$imageWrapEl ||
//           gesture.$imageWrapEl.length === 0
//         )
//           return;

//         if (swiper.params.cssMode) {
//           swiper.wrapperEl.style.overflow = '';
//           swiper.wrapperEl.style.touchAction = '';
//         }

//         zoom.scale = 1;
//         currentScale = 1;
//         gesture.$imageWrapEl.transition(300).transform('translate3d(0,0,0)');
//         gesture.$imageEl.transition(300).transform('translate3d(0,0,0) scale(1)');
//         gesture.$slideEl.removeClass(`${params.zoomedSlideClass}`);
//         gesture.$slideEl = undefined;
//       } // Toggle Zoom

//       function zoomToggle(e) {
//         const zoom = swiper.zoom;

//         if (zoom.scale && zoom.scale !== 1) {
//           // Zoom Out
//           zoomOut();
//         } else {
//           // Zoom In
//           zoomIn(e);
//         }
//       }

//       function getListeners() {
//         const support = swiper.support;
//         const passiveListener =
//           swiper.touchEvents.start === 'touchstart' && support.passiveListener && swiper.params.passiveListeners
//             ? {
//                 passive: true,
//                 capture: false,
//               }
//             : false;
//         const activeListenerWithCapture = support.passiveListener
//           ? {
//               passive: false,
//               capture: true,
//             }
//           : true;
//         return {
//           passiveListener,
//           activeListenerWithCapture,
//         };
//       }

//       function getSlideSelector() {
//         return `.${swiper.params.slideClass}`;
//       }

//       function toggleGestures(method) {
//         const {passiveListener} = getListeners();
//         const slideSelector = getSlideSelector();
//         swiper.$wrapperEl[method]('gesturestart', slideSelector, onGestureStart, passiveListener);
//         swiper.$wrapperEl[method]('gesturechange', slideSelector, onGestureChange, passiveListener);
//         swiper.$wrapperEl[method]('gestureend', slideSelector, onGestureEnd, passiveListener);
//       }

//       function enableGestures() {
//         if (gesturesEnabled) return;
//         gesturesEnabled = true;
//         toggleGestures('on');
//       }

//       function disableGestures() {
//         if (!gesturesEnabled) return;
//         gesturesEnabled = false;
//         toggleGestures('off');
//       } // Attach/Detach Events

//       function enable() {
//         const zoom = swiper.zoom;
//         if (zoom.enabled) return;
//         zoom.enabled = true;
//         const support = swiper.support;
//         const {passiveListener, activeListenerWithCapture} = getListeners();
//         const slideSelector = getSlideSelector(); // Scale image

//         if (support.gestures) {
//           swiper.$wrapperEl.on(swiper.touchEvents.start, enableGestures, passiveListener);
//           swiper.$wrapperEl.on(swiper.touchEvents.end, disableGestures, passiveListener);
//         } else if (swiper.touchEvents.start === 'touchstart') {
//           swiper.$wrapperEl.on(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
//           swiper.$wrapperEl.on(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
//           swiper.$wrapperEl.on(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

//           if (swiper.touchEvents.cancel) {
//             swiper.$wrapperEl.on(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
//           }
//         } // Move image

//         swiper.$wrapperEl.on(
//           swiper.touchEvents.move,
//           `.${swiper.params.zoom.containerClass}`,
//           onTouchMove,
//           activeListenerWithCapture,
//         );
//       }

//       function disable() {
//         const zoom = swiper.zoom;
//         if (!zoom.enabled) return;
//         const support = swiper.support;
//         zoom.enabled = false;
//         const {passiveListener, activeListenerWithCapture} = getListeners();
//         const slideSelector = getSlideSelector(); // Scale image

//         if (support.gestures) {
//           swiper.$wrapperEl.off(swiper.touchEvents.start, enableGestures, passiveListener);
//           swiper.$wrapperEl.off(swiper.touchEvents.end, disableGestures, passiveListener);
//         } else if (swiper.touchEvents.start === 'touchstart') {
//           swiper.$wrapperEl.off(swiper.touchEvents.start, slideSelector, onGestureStart, passiveListener);
//           swiper.$wrapperEl.off(swiper.touchEvents.move, slideSelector, onGestureChange, activeListenerWithCapture);
//           swiper.$wrapperEl.off(swiper.touchEvents.end, slideSelector, onGestureEnd, passiveListener);

//           if (swiper.touchEvents.cancel) {
//             swiper.$wrapperEl.off(swiper.touchEvents.cancel, slideSelector, onGestureEnd, passiveListener);
//           }
//         } // Move image

//         swiper.$wrapperEl.off(
//           swiper.touchEvents.move,
//           `.${swiper.params.zoom.containerClass}`,
//           onTouchMove,
//           activeListenerWithCapture,
//         );
//       }

//       on('init', () => {
//         if (swiper.params.zoom.enabled) {
//           enable();
//         }
//       });
//       on('destroy', () => {
//         disable();
//       });
//       on('touchStart', (_s, e) => {
//         if (!swiper.zoom.enabled) return;
//         onTouchStart(e);
//       });
//       on('touchEnd', (_s, e) => {
//         if (!swiper.zoom.enabled) return;
//         onTouchEnd();
//       });
//       on('doubleTap', (_s, e) => {
//         if (!swiper.animating && swiper.params.zoom.enabled && swiper.zoom.enabled && swiper.params.zoom.toggle) {
//           zoomToggle(e);
//         }
//       });
//       on('transitionEnd', () => {
//         if (swiper.zoom.enabled && swiper.params.zoom.enabled) {
//           onTransitionEnd();
//         }
//       });
//       on('slideChange', () => {
//         if (swiper.zoom.enabled && swiper.params.zoom.enabled && swiper.params.cssMode) {
//           onTransitionEnd();
//         }
//       });
//       Object.assign(swiper.zoom, {
//         enable,
//         disable,
//         in: zoomIn,
//         out: zoomOut,
//         toggle: zoomToggle,
//       });
//     }

//     function Lazy({swiper, extendParams, on, emit}) {
//       extendParams({
//         lazy: {
//           checkInView: false,
//           enabled: false,
//           loadPrevNext: false,
//           loadPrevNextAmount: 1,
//           loadOnTransitionStart: false,
//           scrollingElement: '',
//           elementClass: 'swiper-lazy',
//           loadingClass: 'swiper-lazy-loading',
//           loadedClass: 'swiper-lazy-loaded',
//           preloaderClass: 'swiper-lazy-preloader',
//         },
//       });
//       swiper.lazy = {};
//       let scrollHandlerAttached = false;
//       let initialImageLoaded = false;

//       function loadInSlide(index, loadInDuplicate = true) {
//         const params = swiper.params.lazy;
//         if (typeof index === 'undefined') return;
//         if (swiper.slides.length === 0) return;
//         const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
//         const $slideEl = isVirtual
//           ? swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-swiper-slide-index="${index}"]`)
//           : swiper.slides.eq(index);
//         const $images = $slideEl.find(
//           `.${params.elementClass}:not(.${params.loadedClass}):not(.${params.loadingClass})`,
//         );

//         if (
//           $slideEl.hasClass(params.elementClass) &&
//           !$slideEl.hasClass(params.loadedClass) &&
//           !$slideEl.hasClass(params.loadingClass)
//         ) {
//           $images.push($slideEl[0]);
//         }

//         if ($images.length === 0) return;
//         $images.each((imageEl) => {
//           const $imageEl = $(imageEl);
//           $imageEl.addClass(params.loadingClass);
//           const background = $imageEl.attr('data-background');
//           const src = $imageEl.attr('data-src');
//           const srcset = $imageEl.attr('data-srcset');
//           const sizes = $imageEl.attr('data-sizes');
//           const $pictureEl = $imageEl.parent('picture');
//           swiper.loadImage($imageEl[0], src || background, srcset, sizes, false, () => {
//             if (
//               typeof swiper === 'undefined' ||
//               swiper === null ||
//               !swiper ||
//               (swiper && !swiper.params) ||
//               swiper.destroyed
//             )
//               return;

//             if (background) {
//               $imageEl.css('background-image', `url("${background}")`);
//               $imageEl.removeAttr('data-background');
//             } else {
//               if (srcset) {
//                 $imageEl.attr('srcset', srcset);
//                 $imageEl.removeAttr('data-srcset');
//               }

//               if (sizes) {
//                 $imageEl.attr('sizes', sizes);
//                 $imageEl.removeAttr('data-sizes');
//               }

//               if ($pictureEl.length) {
//                 $pictureEl.children('source').each((sourceEl) => {
//                   const $source = $(sourceEl);

//                   if ($source.attr('data-srcset')) {
//                     $source.attr('srcset', $source.attr('data-srcset'));
//                     $source.removeAttr('data-srcset');
//                   }
//                 });
//               }

//               if (src) {
//                 $imageEl.attr('src', src);
//                 $imageEl.removeAttr('data-src');
//               }
//             }

//             $imageEl.addClass(params.loadedClass).removeClass(params.loadingClass);
//             $slideEl.find(`.${params.preloaderClass}`).remove();

//             if (swiper.params.loop && loadInDuplicate) {
//               const slideOriginalIndex = $slideEl.attr('data-swiper-slide-index');

//               if ($slideEl.hasClass(swiper.params.slideDuplicateClass)) {
//                 const originalSlide = swiper.$wrapperEl.children(
//                   `[data-swiper-slide-index="${slideOriginalIndex}"]:not(.${swiper.params.slideDuplicateClass})`,
//                 );
//                 loadInSlide(originalSlide.index(), false);
//               } else {
//                 const duplicatedSlide = swiper.$wrapperEl.children(
//                   `.${swiper.params.slideDuplicateClass}[data-swiper-slide-index="${slideOriginalIndex}"]`,
//                 );
//                 loadInSlide(duplicatedSlide.index(), false);
//               }
//             }

//             emit('lazyImageReady', $slideEl[0], $imageEl[0]);

//             if (swiper.params.autoHeight) {
//               swiper.updateAutoHeight();
//             }
//           });
//           emit('lazyImageLoad', $slideEl[0], $imageEl[0]);
//         });
//       }

//       function load() {
//         const {$wrapperEl, params: swiperParams, slides, activeIndex} = swiper;
//         const isVirtual = swiper.virtual && swiperParams.virtual.enabled;
//         const params = swiperParams.lazy;
//         let slidesPerView = swiperParams.slidesPerView;

//         if (slidesPerView === 'auto') {
//           slidesPerView = 0;
//         }

//         function slideExist(index) {
//           if (isVirtual) {
//             if ($wrapperEl.children(`.${swiperParams.slideClass}[data-swiper-slide-index="${index}"]`).length) {
//               return true;
//             }
//           } else if (slides[index]) return true;

//           return false;
//         }

//         function slideIndex(slideEl) {
//           if (isVirtual) {
//             return $(slideEl).attr('data-swiper-slide-index');
//           }

//           return $(slideEl).index();
//         }

//         if (!initialImageLoaded) initialImageLoaded = true;

//         if (swiper.params.watchSlidesProgress) {
//           $wrapperEl.children(`.${swiperParams.slideVisibleClass}`).each((slideEl) => {
//             const index = isVirtual ? $(slideEl).attr('data-swiper-slide-index') : $(slideEl).index();
//             loadInSlide(index);
//           });
//         } else if (slidesPerView > 1) {
//           for (let i = activeIndex; i < activeIndex + slidesPerView; i += 1) {
//             if (slideExist(i)) loadInSlide(i);
//           }
//         } else {
//           loadInSlide(activeIndex);
//         }

//         if (params.loadPrevNext) {
//           if (slidesPerView > 1 || (params.loadPrevNextAmount && params.loadPrevNextAmount > 1)) {
//             const amount = params.loadPrevNextAmount;
//             const spv = slidesPerView;
//             const maxIndex = Math.min(activeIndex + spv + Math.max(amount, spv), slides.length);
//             const minIndex = Math.max(activeIndex - Math.max(spv, amount), 0); // Next Slides

//             for (let i = activeIndex + slidesPerView; i < maxIndex; i += 1) {
//               if (slideExist(i)) loadInSlide(i);
//             } // Prev Slides

//             for (let i = minIndex; i < activeIndex; i += 1) {
//               if (slideExist(i)) loadInSlide(i);
//             }
//           } else {
//             const nextSlide = $wrapperEl.children(`.${swiperParams.slideNextClass}`);
//             if (nextSlide.length > 0) loadInSlide(slideIndex(nextSlide));
//             const prevSlide = $wrapperEl.children(`.${swiperParams.slidePrevClass}`);
//             if (prevSlide.length > 0) loadInSlide(slideIndex(prevSlide));
//           }
//         }
//       }

//       function checkInViewOnLoad() {
//         const window = getWindow();
//         if (!swiper || swiper.destroyed) return;
//         const $scrollElement = swiper.params.lazy.scrollingElement ? $(swiper.params.lazy.scrollingElement) : $(window);
//         const isWindow = $scrollElement[0] === window;
//         const scrollElementWidth = isWindow ? window.innerWidth : $scrollElement[0].offsetWidth;
//         const scrollElementHeight = isWindow ? window.innerHeight : $scrollElement[0].offsetHeight;
//         const swiperOffset = swiper.$el.offset();
//         const {rtlTranslate: rtl} = swiper;
//         let inView = false;
//         if (rtl) swiperOffset.left -= swiper.$el[0].scrollLeft;
//         const swiperCoord = [
//           [swiperOffset.left, swiperOffset.top],
//           [swiperOffset.left + swiper.width, swiperOffset.top],
//           [swiperOffset.left, swiperOffset.top + swiper.height],
//           [swiperOffset.left + swiper.width, swiperOffset.top + swiper.height],
//         ];

//         for (let i = 0; i < swiperCoord.length; i += 1) {
//           const point = swiperCoord[i];

//           if (point[0] >= 0 && point[0] <= scrollElementWidth && point[1] >= 0 && point[1] <= scrollElementHeight) {
//             if (point[0] === 0 && point[1] === 0) continue; // eslint-disable-line

//             inView = true;
//           }
//         }

//         const passiveListener =
//           swiper.touchEvents.start === 'touchstart' && swiper.support.passiveListener && swiper.params.passiveListeners
//             ? {
//                 passive: true,
//                 capture: false,
//               }
//             : false;

//         if (inView) {
//           load();
//           $scrollElement.off('scroll', checkInViewOnLoad, passiveListener);
//         } else if (!scrollHandlerAttached) {
//           scrollHandlerAttached = true;
//           $scrollElement.on('scroll', checkInViewOnLoad, passiveListener);
//         }
//       }

//       on('beforeInit', () => {
//         if (swiper.params.lazy.enabled && swiper.params.preloadImages) {
//           swiper.params.preloadImages = false;
//         }
//       });
//       on('init', () => {
//         if (swiper.params.lazy.enabled) {
//           if (swiper.params.lazy.checkInView) {
//             checkInViewOnLoad();
//           } else {
//             load();
//           }
//         }
//       });
//       on('scroll', () => {
//         if (swiper.params.freeMode && swiper.params.freeMode.enabled && !swiper.params.freeMode.sticky) {
//           load();
//         }
//       });
//       on('scrollbarDragMove resize _freeModeNoMomentumRelease', () => {
//         if (swiper.params.lazy.enabled) {
//           if (swiper.params.lazy.checkInView) {
//             checkInViewOnLoad();
//           } else {
//             load();
//           }
//         }
//       });
//       on('transitionStart', () => {
//         if (swiper.params.lazy.enabled) {
//           if (
//             swiper.params.lazy.loadOnTransitionStart ||
//             (!swiper.params.lazy.loadOnTransitionStart && !initialImageLoaded)
//           ) {
//             if (swiper.params.lazy.checkInView) {
//               checkInViewOnLoad();
//             } else {
//               load();
//             }
//           }
//         }
//       });
//       on('transitionEnd', () => {
//         if (swiper.params.lazy.enabled && !swiper.params.lazy.loadOnTransitionStart) {
//           if (swiper.params.lazy.checkInView) {
//             checkInViewOnLoad();
//           } else {
//             load();
//           }
//         }
//       });
//       on('slideChange', () => {
//         const {lazy, cssMode, watchSlidesProgress, touchReleaseOnEdges, resistanceRatio} = swiper.params;

//         if (lazy.enabled && (cssMode || (watchSlidesProgress && (touchReleaseOnEdges || resistanceRatio === 0)))) {
//           load();
//         }
//       });
//       Object.assign(swiper.lazy, {
//         load,
//         loadInSlide,
//       });
//     }

//     /* eslint no-bitwise: ["error", { "allow": [">>"] }] */
//     function Controller({swiper, extendParams, on}) {
//       extendParams({
//         controller: {
//           control: undefined,
//           inverse: false,
//           by: 'slide', // or 'container'
//         },
//       });
//       swiper.controller = {
//         control: undefined,
//       };

//       function LinearSpline(x, y) {
//         const binarySearch = (function search() {
//           let maxIndex;
//           let minIndex;
//           let guess;
//           return (array, val) => {
//             minIndex = -1;
//             maxIndex = array.length;

//             while (maxIndex - minIndex > 1) {
//               guess = (maxIndex + minIndex) >> 1;

//               if (array[guess] <= val) {
//                 minIndex = guess;
//               } else {
//                 maxIndex = guess;
//               }
//             }

//             return maxIndex;
//           };
//         })();

//         this.x = x;
//         this.y = y;
//         this.lastIndex = x.length - 1; // Given an x value (x2), return the expected y2 value:
//         // (x1,y1) is the known point before given value,
//         // (x3,y3) is the known point after given value.

//         let i1;
//         let i3;

//         this.interpolate = function interpolate(x2) {
//           if (!x2) return 0; // Get the indexes of x1 and x3 (the array indexes before and after given x2):

//           i3 = binarySearch(this.x, x2);
//           i1 = i3 - 1; // We have our indexes i1 & i3, so we can calculate already:
//           // y2 := ((x2−x1) × (y3−y1)) ÷ (x3−x1) + y1

//           return ((x2 - this.x[i1]) * (this.y[i3] - this.y[i1])) / (this.x[i3] - this.x[i1]) + this.y[i1];
//         };

//         return this;
//       } // xxx: for now i will just save one spline function to to

//       function getInterpolateFunction(c) {
//         if (!swiper.controller.spline) {
//           swiper.controller.spline = swiper.params.loop
//             ? new LinearSpline(swiper.slidesGrid, c.slidesGrid)
//             : new LinearSpline(swiper.snapGrid, c.snapGrid);
//         }
//       }

//       function setTranslate(_t, byController) {
//         const controlled = swiper.controller.control;
//         let multiplier;
//         let controlledTranslate;
//         const Swiper = swiper.constructor;

//         function setControlledTranslate(c) {
//           // this will create an Interpolate function based on the snapGrids
//           // x is the Grid of the scrolled scroller and y will be the controlled scroller
//           // it makes sense to create this only once and recall it for the interpolation
//           // the function does a lot of value caching for performance
//           const translate = swiper.rtlTranslate ? -swiper.translate : swiper.translate;

//           if (swiper.params.controller.by === 'slide') {
//             getInterpolateFunction(c); // i am not sure why the values have to be multiplicated this way, tried to invert the snapGrid
//             // but it did not work out

//             controlledTranslate = -swiper.controller.spline.interpolate(-translate);
//           }

//           if (!controlledTranslate || swiper.params.controller.by === 'container') {
//             multiplier = (c.maxTranslate() - c.minTranslate()) / (swiper.maxTranslate() - swiper.minTranslate());
//             controlledTranslate = (translate - swiper.minTranslate()) * multiplier + c.minTranslate();
//           }

//           if (swiper.params.controller.inverse) {
//             controlledTranslate = c.maxTranslate() - controlledTranslate;
//           }

//           c.updateProgress(controlledTranslate);
//           c.setTranslate(controlledTranslate, swiper);
//           c.updateActiveIndex();
//           c.updateSlidesClasses();
//         }

//         if (Array.isArray(controlled)) {
//           for (let i = 0; i < controlled.length; i += 1) {
//             if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
//               setControlledTranslate(controlled[i]);
//             }
//           }
//         } else if (controlled instanceof Swiper && byController !== controlled) {
//           setControlledTranslate(controlled);
//         }
//       }

//       function setTransition(duration, byController) {
//         const Swiper = swiper.constructor;
//         const controlled = swiper.controller.control;
//         let i;

//         function setControlledTransition(c) {
//           c.setTransition(duration, swiper);

//           if (duration !== 0) {
//             c.transitionStart();

//             if (c.params.autoHeight) {
//               nextTick(() => {
//                 c.updateAutoHeight();
//               });
//             }

//             c.$wrapperEl.transitionEnd(() => {
//               if (!controlled) return;

//               if (c.params.loop && swiper.params.controller.by === 'slide') {
//                 c.loopFix();
//               }

//               c.transitionEnd();
//             });
//           }
//         }

//         if (Array.isArray(controlled)) {
//           for (i = 0; i < controlled.length; i += 1) {
//             if (controlled[i] !== byController && controlled[i] instanceof Swiper) {
//               setControlledTransition(controlled[i]);
//             }
//           }
//         } else if (controlled instanceof Swiper && byController !== controlled) {
//           setControlledTransition(controlled);
//         }
//       }

//       function removeSpline() {
//         if (!swiper.controller.control) return;

//         if (swiper.controller.spline) {
//           swiper.controller.spline = undefined;
//           delete swiper.controller.spline;
//         }
//       }

//       on('beforeInit', () => {
//         swiper.controller.control = swiper.params.controller.control;
//       });
//       on('update', () => {
//         removeSpline();
//       });
//       on('resize', () => {
//         removeSpline();
//       });
//       on('observerUpdate', () => {
//         removeSpline();
//       });
//       on('setTranslate', (_s, translate, byController) => {
//         if (!swiper.controller.control) return;
//         swiper.controller.setTranslate(translate, byController);
//       });
//       on('setTransition', (_s, duration, byController) => {
//         if (!swiper.controller.control) return;
//         swiper.controller.setTransition(duration, byController);
//       });
//       Object.assign(swiper.controller, {
//         setTranslate,
//         setTransition,
//       });
//     }

//     function A11y({swiper, extendParams, on}) {
//       extendParams({
//         a11y: {
//           enabled: true,
//           notificationClass: 'swiper-notification',
//           prevSlideMessage: 'Previous slide',
//           nextSlideMessage: 'Next slide',
//           firstSlideMessage: 'This is the first slide',
//           lastSlideMessage: 'This is the last slide',
//           paginationBulletMessage: 'Go to slide {{index}}',
//           slideLabelMessage: '{{index}} / {{slidesLength}}',
//           containerMessage: null,
//           containerRoleDescriptionMessage: null,
//           itemRoleDescriptionMessage: null,
//           slideRole: 'group',
//         },
//       });
//       let liveRegion = null;

//       function notify(message) {
//         const notification = liveRegion;
//         if (notification.length === 0) return;
//         notification.html('');
//         notification.html(message);
//       }

//       function getRandomNumber(size = 16) {
//         const randomChar = () => Math.round(16 * Math.random()).toString(16);

//         return 'x'.repeat(size).replace(/x/g, randomChar);
//       }

//       function makeElFocusable($el) {
//         $el.attr('tabIndex', '0');
//       }

//       function makeElNotFocusable($el) {
//         $el.attr('tabIndex', '-1');
//       }

//       function addElRole($el, role) {
//         $el.attr('role', role);
//       }

//       function addElRoleDescription($el, description) {
//         $el.attr('aria-roledescription', description);
//       }

//       function addElControls($el, controls) {
//         $el.attr('aria-controls', controls);
//       }

//       function addElLabel($el, label) {
//         $el.attr('aria-label', label);
//       }

//       function addElId($el, id) {
//         $el.attr('id', id);
//       }

//       function addElLive($el, live) {
//         $el.attr('aria-live', live);
//       }

//       function disableEl($el) {
//         $el.attr('aria-disabled', true);
//       }

//       function enableEl($el) {
//         $el.attr('aria-disabled', false);
//       }

//       function onEnterOrSpaceKey(e) {
//         if (e.keyCode !== 13 && e.keyCode !== 32) return;
//         const params = swiper.params.a11y;
//         const $targetEl = $(e.target);

//         if (swiper.navigation && swiper.navigation.$nextEl && $targetEl.is(swiper.navigation.$nextEl)) {
//           if (!(swiper.isEnd && !swiper.params.loop)) {
//             swiper.slideNext();
//           }

//           if (swiper.isEnd) {
//             notify(params.lastSlideMessage);
//           } else {
//             notify(params.nextSlideMessage);
//           }
//         }

//         if (swiper.navigation && swiper.navigation.$prevEl && $targetEl.is(swiper.navigation.$prevEl)) {
//           if (!(swiper.isBeginning && !swiper.params.loop)) {
//             swiper.slidePrev();
//           }

//           if (swiper.isBeginning) {
//             notify(params.firstSlideMessage);
//           } else {
//             notify(params.prevSlideMessage);
//           }
//         }

//         if (swiper.pagination && $targetEl.is(classesToSelector(swiper.params.pagination.bulletClass))) {
//           $targetEl[0].click();
//         }
//       }

//       function updateNavigation() {
//         if (swiper.params.loop || swiper.params.rewind || !swiper.navigation) return;
//         const {$nextEl, $prevEl} = swiper.navigation;

//         if ($prevEl && $prevEl.length > 0) {
//           if (swiper.isBeginning) {
//             disableEl($prevEl);
//             makeElNotFocusable($prevEl);
//           } else {
//             enableEl($prevEl);
//             makeElFocusable($prevEl);
//           }
//         }

//         if ($nextEl && $nextEl.length > 0) {
//           if (swiper.isEnd) {
//             disableEl($nextEl);
//             makeElNotFocusable($nextEl);
//           } else {
//             enableEl($nextEl);
//             makeElFocusable($nextEl);
//           }
//         }
//       }

//       function hasPagination() {
//         return swiper.pagination && swiper.pagination.bullets && swiper.pagination.bullets.length;
//       }

//       function hasClickablePagination() {
//         return hasPagination() && swiper.params.pagination.clickable;
//       }

//       function updatePagination() {
//         const params = swiper.params.a11y;
//         if (!hasPagination()) return;
//         swiper.pagination.bullets.each((bulletEl) => {
//           const $bulletEl = $(bulletEl);

//           if (swiper.params.pagination.clickable) {
//             makeElFocusable($bulletEl);

//             if (!swiper.params.pagination.renderBullet) {
//               addElRole($bulletEl, 'button');
//               addElLabel($bulletEl, params.paginationBulletMessage.replace(/\{\{index\}\}/, $bulletEl.index() + 1));
//             }
//           }

//           if ($bulletEl.is(`.${swiper.params.pagination.bulletActiveClass}`)) {
//             $bulletEl.attr('aria-current', 'true');
//           } else {
//             $bulletEl.removeAttr('aria-current');
//           }
//         });
//       }

//       const initNavEl = ($el, wrapperId, message) => {
//         makeElFocusable($el);

//         if ($el[0].tagName !== 'BUTTON') {
//           addElRole($el, 'button');
//           $el.on('keydown', onEnterOrSpaceKey);
//         }

//         addElLabel($el, message);
//         addElControls($el, wrapperId);
//       };

//       function init() {
//         const params = swiper.params.a11y;
//         swiper.$el.append(liveRegion); // Container

//         const $containerEl = swiper.$el;

//         if (params.containerRoleDescriptionMessage) {
//           addElRoleDescription($containerEl, params.containerRoleDescriptionMessage);
//         }

//         if (params.containerMessage) {
//           addElLabel($containerEl, params.containerMessage);
//         } // Wrapper

//         const $wrapperEl = swiper.$wrapperEl;
//         const wrapperId = $wrapperEl.attr('id') || `swiper-wrapper-${getRandomNumber(16)}`;
//         const live = swiper.params.autoplay && swiper.params.autoplay.enabled ? 'off' : 'polite';
//         addElId($wrapperEl, wrapperId);
//         addElLive($wrapperEl, live); // Slide

//         if (params.itemRoleDescriptionMessage) {
//           addElRoleDescription($(swiper.slides), params.itemRoleDescriptionMessage);
//         }

//         addElRole($(swiper.slides), params.slideRole);
//         const slidesLength = swiper.params.loop
//           ? swiper.slides.filter((el) => !el.classList.contains(swiper.params.slideDuplicateClass)).length
//           : swiper.slides.length;
//         swiper.slides.each((slideEl, index) => {
//           const $slideEl = $(slideEl);
//           const slideIndex = swiper.params.loop ? parseInt($slideEl.attr('data-swiper-slide-index'), 10) : index;
//           const ariaLabelMessage = params.slideLabelMessage
//             .replace(/\{\{index\}\}/, slideIndex + 1)
//             .replace(/\{\{slidesLength\}\}/, slidesLength);
//           addElLabel($slideEl, ariaLabelMessage);
//         }); // Navigation

//         let $nextEl;
//         let $prevEl;

//         if (swiper.navigation && swiper.navigation.$nextEl) {
//           $nextEl = swiper.navigation.$nextEl;
//         }

//         if (swiper.navigation && swiper.navigation.$prevEl) {
//           $prevEl = swiper.navigation.$prevEl;
//         }

//         if ($nextEl && $nextEl.length) {
//           initNavEl($nextEl, wrapperId, params.nextSlideMessage);
//         }

//         if ($prevEl && $prevEl.length) {
//           initNavEl($prevEl, wrapperId, params.prevSlideMessage);
//         } // Pagination

//         if (hasClickablePagination()) {
//           swiper.pagination.$el.on(
//             'keydown',
//             classesToSelector(swiper.params.pagination.bulletClass),
//             onEnterOrSpaceKey,
//           );
//         }
//       }

//       function destroy() {
//         if (liveRegion && liveRegion.length > 0) liveRegion.remove();
//         let $nextEl;
//         let $prevEl;

//         if (swiper.navigation && swiper.navigation.$nextEl) {
//           $nextEl = swiper.navigation.$nextEl;
//         }

//         if (swiper.navigation && swiper.navigation.$prevEl) {
//           $prevEl = swiper.navigation.$prevEl;
//         }

//         if ($nextEl) {
//           $nextEl.off('keydown', onEnterOrSpaceKey);
//         }

//         if ($prevEl) {
//           $prevEl.off('keydown', onEnterOrSpaceKey);
//         } // Pagination

//         if (hasClickablePagination()) {
//           swiper.pagination.$el.off(
//             'keydown',
//             classesToSelector(swiper.params.pagination.bulletClass),
//             onEnterOrSpaceKey,
//           );
//         }
//       }

//       on('beforeInit', () => {
//         liveRegion = $(
//           `<span class="${swiper.params.a11y.notificationClass}" aria-live="assertive" aria-atomic="true"></span>`,
//         );
//       });
//       on('afterInit', () => {
//         if (!swiper.params.a11y.enabled) return;
//         init();
//         updateNavigation();
//       });
//       on('toEdge', () => {
//         if (!swiper.params.a11y.enabled) return;
//         updateNavigation();
//       });
//       on('fromEdge', () => {
//         if (!swiper.params.a11y.enabled) return;
//         updateNavigation();
//       });
//       on('paginationUpdate', () => {
//         if (!swiper.params.a11y.enabled) return;
//         updatePagination();
//       });
//       on('destroy', () => {
//         if (!swiper.params.a11y.enabled) return;
//         destroy();
//       });
//     }

//     function History({swiper, extendParams, on}) {
//       extendParams({
//         history: {
//           enabled: false,
//           root: '',
//           replaceState: false,
//           key: 'slides',
//         },
//       });
//       let initialized = false;
//       let paths = {};

//       const slugify = (text) => {
//         return text
//           .toString()
//           .replace(/\s+/g, '-')
//           .replace(/[^\w-]+/g, '')
//           .replace(/--+/g, '-')
//           .replace(/^-+/, '')
//           .replace(/-+$/, '');
//       };

//       const getPathValues = (urlOverride) => {
//         const window = getWindow();
//         let location;

//         if (urlOverride) {
//           location = new URL(urlOverride);
//         } else {
//           location = window.location;
//         }

//         const pathArray = location.pathname
//           .slice(1)
//           .split('/')
//           .filter((part) => part !== '');
//         const total = pathArray.length;
//         const key = pathArray[total - 2];
//         const value = pathArray[total - 1];
//         return {
//           key,
//           value,
//         };
//       };

//       const setHistory = (key, index) => {
//         const window = getWindow();
//         if (!initialized || !swiper.params.history.enabled) return;
//         let location;

//         if (swiper.params.url) {
//           location = new URL(swiper.params.url);
//         } else {
//           location = window.location;
//         }

//         const slide = swiper.slides.eq(index);
//         let value = slugify(slide.attr('data-history'));

//         if (swiper.params.history.root.length > 0) {
//           let root = swiper.params.history.root;
//           if (root[root.length - 1] === '/') root = root.slice(0, root.length - 1);
//           value = `${root}/${key}/${value}`;
//         } else if (!location.pathname.includes(key)) {
//           value = `${key}/${value}`;
//         }

//         const currentState = window.history.state;

//         if (currentState && currentState.value === value) {
//           return;
//         }

//         if (swiper.params.history.replaceState) {
//           window.history.replaceState(
//             {
//               value,
//             },
//             null,
//             value,
//           );
//         } else {
//           window.history.pushState(
//             {
//               value,
//             },
//             null,
//             value,
//           );
//         }
//       };

//       const scrollToSlide = (speed, value, runCallbacks) => {
//         if (value) {
//           for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
//             const slide = swiper.slides.eq(i);
//             const slideHistory = slugify(slide.attr('data-history'));

//             if (slideHistory === value && !slide.hasClass(swiper.params.slideDuplicateClass)) {
//               const index = slide.index();
//               swiper.slideTo(index, speed, runCallbacks);
//             }
//           }
//         } else {
//           swiper.slideTo(0, speed, runCallbacks);
//         }
//       };

//       const setHistoryPopState = () => {
//         paths = getPathValues(swiper.params.url);
//         scrollToSlide(swiper.params.speed, swiper.paths.value, false);
//       };

//       const init = () => {
//         const window = getWindow();
//         if (!swiper.params.history) return;

//         if (!window.history || !window.history.pushState) {
//           swiper.params.history.enabled = false;
//           swiper.params.hashNavigation.enabled = true;
//           return;
//         }

//         initialized = true;
//         paths = getPathValues(swiper.params.url);
//         if (!paths.key && !paths.value) return;
//         scrollToSlide(0, paths.value, swiper.params.runCallbacksOnInit);

//         if (!swiper.params.history.replaceState) {
//           window.addEventListener('popstate', setHistoryPopState);
//         }
//       };

//       const destroy = () => {
//         const window = getWindow();

//         if (!swiper.params.history.replaceState) {
//           window.removeEventListener('popstate', setHistoryPopState);
//         }
//       };

//       on('init', () => {
//         if (swiper.params.history.enabled) {
//           init();
//         }
//       });
//       on('destroy', () => {
//         if (swiper.params.history.enabled) {
//           destroy();
//         }
//       });
//       on('transitionEnd _freeModeNoMomentumRelease', () => {
//         if (initialized) {
//           setHistory(swiper.params.history.key, swiper.activeIndex);
//         }
//       });
//       on('slideChange', () => {
//         if (initialized && swiper.params.cssMode) {
//           setHistory(swiper.params.history.key, swiper.activeIndex);
//         }
//       });
//     }

//     function HashNavigation({swiper, extendParams, emit, on}) {
//       let initialized = false;
//       const document = getDocument();
//       const window = getWindow();
//       extendParams({
//         hashNavigation: {
//           enabled: false,
//           replaceState: false,
//           watchState: false,
//         },
//       });

//       const onHashChange = () => {
//         emit('hashChange');
//         const newHash = document.location.hash.replace('#', '');
//         const activeSlideHash = swiper.slides.eq(swiper.activeIndex).attr('data-hash');

//         if (newHash !== activeSlideHash) {
//           const newIndex = swiper.$wrapperEl.children(`.${swiper.params.slideClass}[data-hash="${newHash}"]`).index();
//           if (typeof newIndex === 'undefined') return;
//           swiper.slideTo(newIndex);
//         }
//       };

//       const setHash = () => {
//         if (!initialized || !swiper.params.hashNavigation.enabled) return;

//         if (swiper.params.hashNavigation.replaceState && window.history && window.history.replaceState) {
//           window.history.replaceState(null, null, `#${swiper.slides.eq(swiper.activeIndex).attr('data-hash')}` || '');
//           emit('hashSet');
//         } else {
//           const slide = swiper.slides.eq(swiper.activeIndex);
//           const hash = slide.attr('data-hash') || slide.attr('data-history');
//           document.location.hash = hash || '';
//           emit('hashSet');
//         }
//       };

//       const init = () => {
//         if (!swiper.params.hashNavigation.enabled || (swiper.params.history && swiper.params.history.enabled)) return;
//         initialized = true;
//         const hash = document.location.hash.replace('#', '');

//         if (hash) {
//           const speed = 0;

//           for (let i = 0, length = swiper.slides.length; i < length; i += 1) {
//             const slide = swiper.slides.eq(i);
//             const slideHash = slide.attr('data-hash') || slide.attr('data-history');

//             if (slideHash === hash && !slide.hasClass(swiper.params.slideDuplicateClass)) {
//               const index = slide.index();
//               swiper.slideTo(index, speed, swiper.params.runCallbacksOnInit, true);
//             }
//           }
//         }

//         if (swiper.params.hashNavigation.watchState) {
//           $(window).on('hashchange', onHashChange);
//         }
//       };

//       const destroy = () => {
//         if (swiper.params.hashNavigation.watchState) {
//           $(window).off('hashchange', onHashChange);
//         }
//       };

//       on('init', () => {
//         if (swiper.params.hashNavigation.enabled) {
//           init();
//         }
//       });
//       on('destroy', () => {
//         if (swiper.params.hashNavigation.enabled) {
//           destroy();
//         }
//       });
//       on('transitionEnd _freeModeNoMomentumRelease', () => {
//         if (initialized) {
//           setHash();
//         }
//       });
//       on('slideChange', () => {
//         if (initialized && swiper.params.cssMode) {
//           setHash();
//         }
//       });
//     }

//     /* eslint no-underscore-dangle: "off" */
//     function Autoplay({swiper, extendParams, on, emit}) {
//       let timeout;
//       swiper.autoplay = {
//         running: false,
//         paused: false,
//       };
//       extendParams({
//         autoplay: {
//           enabled: false,
//           delay: 3000,
//           waitForTransition: true,
//           disableOnInteraction: true,
//           stopOnLastSlide: false,
//           reverseDirection: false,
//           pauseOnMouseEnter: false,
//         },
//       });

//       function run() {
//         const $activeSlideEl = swiper.slides.eq(swiper.activeIndex);
//         let delay = swiper.params.autoplay.delay;

//         if ($activeSlideEl.attr('data-swiper-autoplay')) {
//           delay = $activeSlideEl.attr('data-swiper-autoplay') || swiper.params.autoplay.delay;
//         }

//         clearTimeout(timeout);
//         timeout = nextTick(() => {
//           let autoplayResult;

//           if (swiper.params.autoplay.reverseDirection) {
//             if (swiper.params.loop) {
//               swiper.loopFix();
//               autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
//               emit('autoplay');
//             } else if (!swiper.isBeginning) {
//               autoplayResult = swiper.slidePrev(swiper.params.speed, true, true);
//               emit('autoplay');
//             } else if (!swiper.params.autoplay.stopOnLastSlide) {
//               autoplayResult = swiper.slideTo(swiper.slides.length - 1, swiper.params.speed, true, true);
//               emit('autoplay');
//             } else {
//               stop();
//             }
//           } else if (swiper.params.loop) {
//             swiper.loopFix();
//             autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
//             emit('autoplay');
//           } else if (!swiper.isEnd) {
//             autoplayResult = swiper.slideNext(swiper.params.speed, true, true);
//             emit('autoplay');
//           } else if (!swiper.params.autoplay.stopOnLastSlide) {
//             autoplayResult = swiper.slideTo(0, swiper.params.speed, true, true);
//             emit('autoplay');
//           } else {
//             stop();
//           }

//           if (swiper.params.cssMode && swiper.autoplay.running) run();
//           else if (autoplayResult === false) {
//             run();
//           }
//         }, delay);
//       }

//       function start() {
//         if (typeof timeout !== 'undefined') return false;
//         if (swiper.autoplay.running) return false;
//         swiper.autoplay.running = true;
//         emit('autoplayStart');
//         run();
//         return true;
//       }

//       function stop() {
//         if (!swiper.autoplay.running) return false;
//         if (typeof timeout === 'undefined') return false;

//         if (timeout) {
//           clearTimeout(timeout);
//           timeout = undefined;
//         }

//         swiper.autoplay.running = false;
//         emit('autoplayStop');
//         return true;
//       }

//       function pause(speed) {
//         if (!swiper.autoplay.running) return;
//         if (swiper.autoplay.paused) return;
//         if (timeout) clearTimeout(timeout);
//         swiper.autoplay.paused = true;

//         if (speed === 0 || !swiper.params.autoplay.waitForTransition) {
//           swiper.autoplay.paused = false;
//           run();
//         } else {
//           ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
//             swiper.$wrapperEl[0].addEventListener(event, onTransitionEnd);
//           });
//         }
//       }

//       function onVisibilityChange() {
//         const document = getDocument();

//         if (document.visibilityState === 'hidden' && swiper.autoplay.running) {
//           pause();
//         }

//         if (document.visibilityState === 'visible' && swiper.autoplay.paused) {
//           run();
//           swiper.autoplay.paused = false;
//         }
//       }

//       function onTransitionEnd(e) {
//         if (!swiper || swiper.destroyed || !swiper.$wrapperEl) return;
//         if (e.target !== swiper.$wrapperEl[0]) return;
//         ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
//           swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
//         });
//         swiper.autoplay.paused = false;

//         if (!swiper.autoplay.running) {
//           stop();
//         } else {
//           run();
//         }
//       }

//       function onMouseEnter() {
//         if (swiper.params.autoplay.disableOnInteraction) {
//           stop();
//         } else {
//           pause();
//         }

//         ['transitionend', 'webkitTransitionEnd'].forEach((event) => {
//           swiper.$wrapperEl[0].removeEventListener(event, onTransitionEnd);
//         });
//       }

//       function onMouseLeave() {
//         if (swiper.params.autoplay.disableOnInteraction) {
//           return;
//         }

//         swiper.autoplay.paused = false;
//         run();
//       }

//       function attachMouseEvents() {
//         if (swiper.params.autoplay.pauseOnMouseEnter) {
//           swiper.$el.on('mouseenter', onMouseEnter);
//           swiper.$el.on('mouseleave', onMouseLeave);
//         }
//       }

//       function detachMouseEvents() {
//         swiper.$el.off('mouseenter', onMouseEnter);
//         swiper.$el.off('mouseleave', onMouseLeave);
//       }

//       on('init', () => {
//         if (swiper.params.autoplay.enabled) {
//           start();
//           const document = getDocument();
//           document.addEventListener('visibilitychange', onVisibilityChange);
//           attachMouseEvents();
//         }
//       });
//       on('beforeTransitionStart', (_s, speed, internal) => {
//         if (swiper.autoplay.running) {
//           if (internal || !swiper.params.autoplay.disableOnInteraction) {
//             swiper.autoplay.pause(speed);
//           } else {
//             stop();
//           }
//         }
//       });
//       on('sliderFirstMove', () => {
//         if (swiper.autoplay.running) {
//           if (swiper.params.autoplay.disableOnInteraction) {
//             stop();
//           } else {
//             pause();
//           }
//         }
//       });
//       on('touchEnd', () => {
//         if (swiper.params.cssMode && swiper.autoplay.paused && !swiper.params.autoplay.disableOnInteraction) {
//           run();
//         }
//       });
//       on('destroy', () => {
//         detachMouseEvents();

//         if (swiper.autoplay.running) {
//           stop();
//         }

//         const document = getDocument();
//         document.removeEventListener('visibilitychange', onVisibilityChange);
//       });
//       Object.assign(swiper.autoplay, {
//         pause,
//         run,
//         start,
//         stop,
//       });
//     }

//     function Thumb({swiper, extendParams, on}) {
//       extendParams({
//         thumbs: {
//           swiper: null,
//           multipleActiveThumbs: true,
//           autoScrollOffset: 0,
//           slideThumbActiveClass: 'swiper-slide-thumb-active',
//           thumbsContainerClass: 'swiper-thumbs',
//         },
//       });
//       let initialized = false;
//       let swiperCreated = false;
//       swiper.thumbs = {
//         swiper: null,
//       };

//       function onThumbClick() {
//         const thumbsSwiper = swiper.thumbs.swiper;
//         if (!thumbsSwiper) return;
//         const clickedIndex = thumbsSwiper.clickedIndex;
//         const clickedSlide = thumbsSwiper.clickedSlide;
//         if (clickedSlide && $(clickedSlide).hasClass(swiper.params.thumbs.slideThumbActiveClass)) return;
//         if (typeof clickedIndex === 'undefined' || clickedIndex === null) return;
//         let slideToIndex;

//         if (thumbsSwiper.params.loop) {
//           slideToIndex = parseInt($(thumbsSwiper.clickedSlide).attr('data-swiper-slide-index'), 10);
//         } else {
//           slideToIndex = clickedIndex;
//         }

//         if (swiper.params.loop) {
//           let currentIndex = swiper.activeIndex;

//           if (swiper.slides.eq(currentIndex).hasClass(swiper.params.slideDuplicateClass)) {
//             swiper.loopFix(); // eslint-disable-next-line

//             swiper._clientLeft = swiper.$wrapperEl[0].clientLeft;
//             currentIndex = swiper.activeIndex;
//           }

//           const prevIndex = swiper.slides
//             .eq(currentIndex)
//             .prevAll(`[data-swiper-slide-index="${slideToIndex}"]`)
//             .eq(0)
//             .index();
//           const nextIndex = swiper.slides
//             .eq(currentIndex)
//             .nextAll(`[data-swiper-slide-index="${slideToIndex}"]`)
//             .eq(0)
//             .index();
//           if (typeof prevIndex === 'undefined') slideToIndex = nextIndex;
//           else if (typeof nextIndex === 'undefined') slideToIndex = prevIndex;
//           else if (nextIndex - currentIndex < currentIndex - prevIndex) slideToIndex = nextIndex;
//           else slideToIndex = prevIndex;
//         }

//         swiper.slideTo(slideToIndex);
//       }

//       function init() {
//         const {thumbs: thumbsParams} = swiper.params;
//         if (initialized) return false;
//         initialized = true;
//         const SwiperClass = swiper.constructor;

//         if (thumbsParams.swiper instanceof SwiperClass) {
//           swiper.thumbs.swiper = thumbsParams.swiper;
//           Object.assign(swiper.thumbs.swiper.originalParams, {
//             watchSlidesProgress: true,
//             slideToClickedSlide: false,
//           });
//           Object.assign(swiper.thumbs.swiper.params, {
//             watchSlidesProgress: true,
//             slideToClickedSlide: false,
//           });
//         } else if (isObject(thumbsParams.swiper)) {
//           const thumbsSwiperParams = Object.assign({}, thumbsParams.swiper);
//           Object.assign(thumbsSwiperParams, {
//             watchSlidesProgress: true,
//             slideToClickedSlide: false,
//           });
//           swiper.thumbs.swiper = new SwiperClass(thumbsSwiperParams);
//           swiperCreated = true;
//         }

//         swiper.thumbs.swiper.$el.addClass(swiper.params.thumbs.thumbsContainerClass);
//         swiper.thumbs.swiper.on('tap', onThumbClick);
//         return true;
//       }

//       function update(initial) {
//         const thumbsSwiper = swiper.thumbs.swiper;
//         if (!thumbsSwiper) return;
//         const slidesPerView =
//           thumbsSwiper.params.slidesPerView === 'auto'
//             ? thumbsSwiper.slidesPerViewDynamic()
//             : thumbsSwiper.params.slidesPerView;
//         const autoScrollOffset = swiper.params.thumbs.autoScrollOffset;
//         const useOffset = autoScrollOffset && !thumbsSwiper.params.loop;

//         if (swiper.realIndex !== thumbsSwiper.realIndex || useOffset) {
//           let currentThumbsIndex = thumbsSwiper.activeIndex;
//           let newThumbsIndex;
//           let direction;

//           if (thumbsSwiper.params.loop) {
//             if (thumbsSwiper.slides.eq(currentThumbsIndex).hasClass(thumbsSwiper.params.slideDuplicateClass)) {
//               thumbsSwiper.loopFix(); // eslint-disable-next-line

//               thumbsSwiper._clientLeft = thumbsSwiper.$wrapperEl[0].clientLeft;
//               currentThumbsIndex = thumbsSwiper.activeIndex;
//             } // Find actual thumbs index to slide to

//             const prevThumbsIndex = thumbsSwiper.slides
//               .eq(currentThumbsIndex)
//               .prevAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
//               .eq(0)
//               .index();
//             const nextThumbsIndex = thumbsSwiper.slides
//               .eq(currentThumbsIndex)
//               .nextAll(`[data-swiper-slide-index="${swiper.realIndex}"]`)
//               .eq(0)
//               .index();

//             if (typeof prevThumbsIndex === 'undefined') {
//               newThumbsIndex = nextThumbsIndex;
//             } else if (typeof nextThumbsIndex === 'undefined') {
//               newThumbsIndex = prevThumbsIndex;
//             } else if (nextThumbsIndex - currentThumbsIndex === currentThumbsIndex - prevThumbsIndex) {
//               newThumbsIndex = thumbsSwiper.params.slidesPerGroup > 1 ? nextThumbsIndex : currentThumbsIndex;
//             } else if (nextThumbsIndex - currentThumbsIndex < currentThumbsIndex - prevThumbsIndex) {
//               newThumbsIndex = nextThumbsIndex;
//             } else {
//               newThumbsIndex = prevThumbsIndex;
//             }

//             direction = swiper.activeIndex > swiper.previousIndex ? 'next' : 'prev';
//           } else {
//             newThumbsIndex = swiper.realIndex;
//             direction = newThumbsIndex > swiper.previousIndex ? 'next' : 'prev';
//           }

//           if (useOffset) {
//             newThumbsIndex += direction === 'next' ? autoScrollOffset : -1 * autoScrollOffset;
//           }

//           if (thumbsSwiper.visibleSlidesIndexes && thumbsSwiper.visibleSlidesIndexes.indexOf(newThumbsIndex) < 0) {
//             if (thumbsSwiper.params.centeredSlides) {
//               if (newThumbsIndex > currentThumbsIndex) {
//                 newThumbsIndex = newThumbsIndex - Math.floor(slidesPerView / 2) + 1;
//               } else {
//                 newThumbsIndex = newThumbsIndex + Math.floor(slidesPerView / 2) - 1;
//               }
//             } else if (newThumbsIndex > currentThumbsIndex && thumbsSwiper.params.slidesPerGroup === 1);

//             thumbsSwiper.slideTo(newThumbsIndex, initial ? 0 : undefined);
//           }
//         } // Activate thumbs

//         let thumbsToActivate = 1;
//         const thumbActiveClass = swiper.params.thumbs.slideThumbActiveClass;

//         if (swiper.params.slidesPerView > 1 && !swiper.params.centeredSlides) {
//           thumbsToActivate = swiper.params.slidesPerView;
//         }

//         if (!swiper.params.thumbs.multipleActiveThumbs) {
//           thumbsToActivate = 1;
//         }

//         thumbsToActivate = Math.floor(thumbsToActivate);
//         thumbsSwiper.slides.removeClass(thumbActiveClass);

//         if (thumbsSwiper.params.loop || (thumbsSwiper.params.virtual && thumbsSwiper.params.virtual.enabled)) {
//           for (let i = 0; i < thumbsToActivate; i += 1) {
//             thumbsSwiper.$wrapperEl
//               .children(`[data-swiper-slide-index="${swiper.realIndex + i}"]`)
//               .addClass(thumbActiveClass);
//           }
//         } else {
//           for (let i = 0; i < thumbsToActivate; i += 1) {
//             thumbsSwiper.slides.eq(swiper.realIndex + i).addClass(thumbActiveClass);
//           }
//         }
//       }

//       on('beforeInit', () => {
//         const {thumbs} = swiper.params;
//         if (!thumbs || !thumbs.swiper) return;
//         init();
//         update(true);
//       });
//       on('slideChange update resize observerUpdate', () => {
//         if (!swiper.thumbs.swiper) return;
//         update();
//       });
//       on('setTransition', (_s, duration) => {
//         const thumbsSwiper = swiper.thumbs.swiper;
//         if (!thumbsSwiper) return;
//         thumbsSwiper.setTransition(duration);
//       });
//       on('beforeDestroy', () => {
//         const thumbsSwiper = swiper.thumbs.swiper;
//         if (!thumbsSwiper) return;

//         if (swiperCreated && thumbsSwiper) {
//           thumbsSwiper.destroy();
//         }
//       });
//       Object.assign(swiper.thumbs, {
//         init,
//         update,
//       });
//     }

//     function freeMode({swiper, extendParams, emit, once}) {
//       extendParams({
//         freeMode: {
//           enabled: false,
//           momentum: true,
//           momentumRatio: 1,
//           momentumBounce: true,
//           momentumBounceRatio: 1,
//           momentumVelocityRatio: 1,
//           sticky: false,
//           minimumVelocity: 0.02,
//         },
//       });

//       function onTouchMove() {
//         const {touchEventsData: data, touches} = swiper; // Velocity

//         if (data.velocities.length === 0) {
//           data.velocities.push({
//             position: touches[swiper.isHorizontal() ? 'startX' : 'startY'],
//             time: data.touchStartTime,
//           });
//         }

//         data.velocities.push({
//           position: touches[swiper.isHorizontal() ? 'currentX' : 'currentY'],
//           time: now(),
//         });
//       }

//       function onTouchEnd({currentPos}) {
//         const {params, $wrapperEl, rtlTranslate: rtl, snapGrid, touchEventsData: data} = swiper; // Time diff

//         const touchEndTime = now();
//         const timeDiff = touchEndTime - data.touchStartTime;

//         if (currentPos < -swiper.minTranslate()) {
//           swiper.slideTo(swiper.activeIndex);
//           return;
//         }

//         if (currentPos > -swiper.maxTranslate()) {
//           if (swiper.slides.length < snapGrid.length) {
//             swiper.slideTo(snapGrid.length - 1);
//           } else {
//             swiper.slideTo(swiper.slides.length - 1);
//           }

//           return;
//         }

//         if (params.freeMode.momentum) {
//           if (data.velocities.length > 1) {
//             const lastMoveEvent = data.velocities.pop();
//             const velocityEvent = data.velocities.pop();
//             const distance = lastMoveEvent.position - velocityEvent.position;
//             const time = lastMoveEvent.time - velocityEvent.time;
//             swiper.velocity = distance / time;
//             swiper.velocity /= 2;

//             if (Math.abs(swiper.velocity) < params.freeMode.minimumVelocity) {
//               swiper.velocity = 0;
//             } // this implies that the user stopped moving a finger then released.
//             // There would be no events with distance zero, so the last event is stale.

//             if (time > 150 || now() - lastMoveEvent.time > 300) {
//               swiper.velocity = 0;
//             }
//           } else {
//             swiper.velocity = 0;
//           }

//           swiper.velocity *= params.freeMode.momentumVelocityRatio;
//           data.velocities.length = 0;
//           let momentumDuration = 1000 * params.freeMode.momentumRatio;
//           const momentumDistance = swiper.velocity * momentumDuration;
//           let newPosition = swiper.translate + momentumDistance;
//           if (rtl) newPosition = -newPosition;
//           let doBounce = false;
//           let afterBouncePosition;
//           const bounceAmount = Math.abs(swiper.velocity) * 20 * params.freeMode.momentumBounceRatio;
//           let needsLoopFix;

//           if (newPosition < swiper.maxTranslate()) {
//             if (params.freeMode.momentumBounce) {
//               if (newPosition + swiper.maxTranslate() < -bounceAmount) {
//                 newPosition = swiper.maxTranslate() - bounceAmount;
//               }

//               afterBouncePosition = swiper.maxTranslate();
//               doBounce = true;
//               data.allowMomentumBounce = true;
//             } else {
//               newPosition = swiper.maxTranslate();
//             }

//             if (params.loop && params.centeredSlides) needsLoopFix = true;
//           } else if (newPosition > swiper.minTranslate()) {
//             if (params.freeMode.momentumBounce) {
//               if (newPosition - swiper.minTranslate() > bounceAmount) {
//                 newPosition = swiper.minTranslate() + bounceAmount;
//               }

//               afterBouncePosition = swiper.minTranslate();
//               doBounce = true;
//               data.allowMomentumBounce = true;
//             } else {
//               newPosition = swiper.minTranslate();
//             }

//             if (params.loop && params.centeredSlides) needsLoopFix = true;
//           } else if (params.freeMode.sticky) {
//             let nextSlide;

//             for (let j = 0; j < snapGrid.length; j += 1) {
//               if (snapGrid[j] > -newPosition) {
//                 nextSlide = j;
//                 break;
//               }
//             }

//             if (
//               Math.abs(snapGrid[nextSlide] - newPosition) < Math.abs(snapGrid[nextSlide - 1] - newPosition) ||
//               swiper.swipeDirection === 'next'
//             ) {
//               newPosition = snapGrid[nextSlide];
//             } else {
//               newPosition = snapGrid[nextSlide - 1];
//             }

//             newPosition = -newPosition;
//           }

//           if (needsLoopFix) {
//             once('transitionEnd', () => {
//               swiper.loopFix();
//             });
//           } // Fix duration

//           if (swiper.velocity !== 0) {
//             if (rtl) {
//               momentumDuration = Math.abs((-newPosition - swiper.translate) / swiper.velocity);
//             } else {
//               momentumDuration = Math.abs((newPosition - swiper.translate) / swiper.velocity);
//             }

//             if (params.freeMode.sticky) {
//               // If freeMode.sticky is active and the user ends a swipe with a slow-velocity
//               // event, then durations can be 20+ seconds to slide one (or zero!) slides.
//               // It's easy to see this when simulating touch with mouse events. To fix this,
//               // limit single-slide swipes to the default slide duration. This also has the
//               // nice side effect of matching slide speed if the user stopped moving before
//               // lifting finger or mouse vs. moving slowly before lifting the finger/mouse.
//               // For faster swipes, also apply limits (albeit higher ones).
//               const moveDistance = Math.abs((rtl ? -newPosition : newPosition) - swiper.translate);
//               const currentSlideSize = swiper.slidesSizesGrid[swiper.activeIndex];

//               if (moveDistance < currentSlideSize) {
//                 momentumDuration = params.speed;
//               } else if (moveDistance < 2 * currentSlideSize) {
//                 momentumDuration = params.speed * 1.5;
//               } else {
//                 momentumDuration = params.speed * 2.5;
//               }
//             }
//           } else if (params.freeMode.sticky) {
//             swiper.slideToClosest();
//             return;
//           }

//           if (params.freeMode.momentumBounce && doBounce) {
//             swiper.updateProgress(afterBouncePosition);
//             swiper.setTransition(momentumDuration);
//             swiper.setTranslate(newPosition);
//             swiper.transitionStart(true, swiper.swipeDirection);
//             swiper.animating = true;
//             $wrapperEl.transitionEnd(() => {
//               if (!swiper || swiper.destroyed || !data.allowMomentumBounce) return;
//               emit('momentumBounce');
//               swiper.setTransition(params.speed);
//               setTimeout(() => {
//                 swiper.setTranslate(afterBouncePosition);
//                 $wrapperEl.transitionEnd(() => {
//                   if (!swiper || swiper.destroyed) return;
//                   swiper.transitionEnd();
//                 });
//               }, 0);
//             });
//           } else if (swiper.velocity) {
//             emit('_freeModeNoMomentumRelease');
//             swiper.updateProgress(newPosition);
//             swiper.setTransition(momentumDuration);
//             swiper.setTranslate(newPosition);
//             swiper.transitionStart(true, swiper.swipeDirection);

//             if (!swiper.animating) {
//               swiper.animating = true;
//               $wrapperEl.transitionEnd(() => {
//                 if (!swiper || swiper.destroyed) return;
//                 swiper.transitionEnd();
//               });
//             }
//           } else {
//             swiper.updateProgress(newPosition);
//           }

//           swiper.updateActiveIndex();
//           swiper.updateSlidesClasses();
//         } else if (params.freeMode.sticky) {
//           swiper.slideToClosest();
//           return;
//         } else if (params.freeMode) {
//           emit('_freeModeNoMomentumRelease');
//         }

//         if (!params.freeMode.momentum || timeDiff >= params.longSwipesMs) {
//           swiper.updateProgress();
//           swiper.updateActiveIndex();
//           swiper.updateSlidesClasses();
//         }
//       }

//       Object.assign(swiper, {
//         freeMode: {
//           onTouchMove,
//           onTouchEnd,
//         },
//       });
//     }

//     function Grid({swiper, extendParams}) {
//       extendParams({
//         grid: {
//           rows: 1,
//           fill: 'column',
//         },
//       });
//       let slidesNumberEvenToRows;
//       let slidesPerRow;
//       let numFullColumns;

//       const initSlides = (slidesLength) => {
//         const {slidesPerView} = swiper.params;
//         const {rows, fill} = swiper.params.grid;
//         slidesPerRow = slidesNumberEvenToRows / rows;
//         numFullColumns = Math.floor(slidesLength / rows);

//         if (Math.floor(slidesLength / rows) === slidesLength / rows) {
//           slidesNumberEvenToRows = slidesLength;
//         } else {
//           slidesNumberEvenToRows = Math.ceil(slidesLength / rows) * rows;
//         }

//         if (slidesPerView !== 'auto' && fill === 'row') {
//           slidesNumberEvenToRows = Math.max(slidesNumberEvenToRows, slidesPerView * rows);
//         }
//       };

//       const updateSlide = (i, slide, slidesLength, getDirectionLabel) => {
//         const {slidesPerGroup, spaceBetween} = swiper.params;
//         const {rows, fill} = swiper.params.grid; // Set slides order

//         let newSlideOrderIndex;
//         let column;
//         let row;

//         if (fill === 'row' && slidesPerGroup > 1) {
//           const groupIndex = Math.floor(i / (slidesPerGroup * rows));
//           const slideIndexInGroup = i - rows * slidesPerGroup * groupIndex;
//           const columnsInGroup =
//             groupIndex === 0
//               ? slidesPerGroup
//               : Math.min(Math.ceil((slidesLength - groupIndex * rows * slidesPerGroup) / rows), slidesPerGroup);
//           row = Math.floor(slideIndexInGroup / columnsInGroup);
//           column = slideIndexInGroup - row * columnsInGroup + groupIndex * slidesPerGroup;
//           newSlideOrderIndex = column + (row * slidesNumberEvenToRows) / rows;
//           slide.css({
//             '-webkit-order': newSlideOrderIndex,
//             order: newSlideOrderIndex,
//           });
//         } else if (fill === 'column') {
//           column = Math.floor(i / rows);
//           row = i - column * rows;

//           if (column > numFullColumns || (column === numFullColumns && row === rows - 1)) {
//             row += 1;

//             if (row >= rows) {
//               row = 0;
//               column += 1;
//             }
//           }
//         } else {
//           row = Math.floor(i / slidesPerRow);
//           column = i - row * slidesPerRow;
//         }

//         slide.css(getDirectionLabel('margin-top'), row !== 0 ? spaceBetween && `${spaceBetween}px` : '');
//       };

//       const updateWrapperSize = (slideSize, snapGrid, getDirectionLabel) => {
//         const {spaceBetween, centeredSlides, roundLengths} = swiper.params;
//         const {rows} = swiper.params.grid;
//         swiper.virtualSize = (slideSize + spaceBetween) * slidesNumberEvenToRows;
//         swiper.virtualSize = Math.ceil(swiper.virtualSize / rows) - spaceBetween;
//         swiper.$wrapperEl.css({
//           [getDirectionLabel('width')]: `${swiper.virtualSize + spaceBetween}px`,
//         });

//         if (centeredSlides) {
//           snapGrid.splice(0, snapGrid.length);
//           const newSlidesGrid = [];

//           for (let i = 0; i < snapGrid.length; i += 1) {
//             let slidesGridItem = snapGrid[i];
//             if (roundLengths) slidesGridItem = Math.floor(slidesGridItem);
//             if (snapGrid[i] < swiper.virtualSize + snapGrid[0]) newSlidesGrid.push(slidesGridItem);
//           }

//           snapGrid.push(...newSlidesGrid);
//         }
//       };

//       swiper.grid = {
//         initSlides,
//         updateSlide,
//         updateWrapperSize,
//       };
//     }

//     function appendSlide(slides) {
//       const swiper = this;
//       const {$wrapperEl, params} = swiper;

//       if (params.loop) {
//         swiper.loopDestroy();
//       }

//       if (typeof slides === 'object' && 'length' in slides) {
//         for (let i = 0; i < slides.length; i += 1) {
//           if (slides[i]) $wrapperEl.append(slides[i]);
//         }
//       } else {
//         $wrapperEl.append(slides);
//       }

//       if (params.loop) {
//         swiper.loopCreate();
//       }

//       if (!params.observer) {
//         swiper.update();
//       }
//     }

//     function prependSlide(slides) {
//       const swiper = this;
//       const {params, $wrapperEl, activeIndex} = swiper;

//       if (params.loop) {
//         swiper.loopDestroy();
//       }

//       let newActiveIndex = activeIndex + 1;

//       if (typeof slides === 'object' && 'length' in slides) {
//         for (let i = 0; i < slides.length; i += 1) {
//           if (slides[i]) $wrapperEl.prepend(slides[i]);
//         }

//         newActiveIndex = activeIndex + slides.length;
//       } else {
//         $wrapperEl.prepend(slides);
//       }

//       if (params.loop) {
//         swiper.loopCreate();
//       }

//       if (!params.observer) {
//         swiper.update();
//       }

//       swiper.slideTo(newActiveIndex, 0, false);
//     }

//     function addSlide(index, slides) {
//       const swiper = this;
//       const {$wrapperEl, params, activeIndex} = swiper;
//       let activeIndexBuffer = activeIndex;

//       if (params.loop) {
//         activeIndexBuffer -= swiper.loopedSlides;
//         swiper.loopDestroy();
//         swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
//       }

//       const baseLength = swiper.slides.length;

//       if (index <= 0) {
//         swiper.prependSlide(slides);
//         return;
//       }

//       if (index >= baseLength) {
//         swiper.appendSlide(slides);
//         return;
//       }

//       let newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + 1 : activeIndexBuffer;
//       const slidesBuffer = [];

//       for (let i = baseLength - 1; i >= index; i -= 1) {
//         const currentSlide = swiper.slides.eq(i);
//         currentSlide.remove();
//         slidesBuffer.unshift(currentSlide);
//       }

//       if (typeof slides === 'object' && 'length' in slides) {
//         for (let i = 0; i < slides.length; i += 1) {
//           if (slides[i]) $wrapperEl.append(slides[i]);
//         }

//         newActiveIndex = activeIndexBuffer > index ? activeIndexBuffer + slides.length : activeIndexBuffer;
//       } else {
//         $wrapperEl.append(slides);
//       }

//       for (let i = 0; i < slidesBuffer.length; i += 1) {
//         $wrapperEl.append(slidesBuffer[i]);
//       }

//       if (params.loop) {
//         swiper.loopCreate();
//       }

//       if (!params.observer) {
//         swiper.update();
//       }

//       if (params.loop) {
//         swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
//       } else {
//         swiper.slideTo(newActiveIndex, 0, false);
//       }
//     }

//     function removeSlide(slidesIndexes) {
//       const swiper = this;
//       const {params, $wrapperEl, activeIndex} = swiper;
//       let activeIndexBuffer = activeIndex;

//       if (params.loop) {
//         activeIndexBuffer -= swiper.loopedSlides;
//         swiper.loopDestroy();
//         swiper.slides = $wrapperEl.children(`.${params.slideClass}`);
//       }

//       let newActiveIndex = activeIndexBuffer;
//       let indexToRemove;

//       if (typeof slidesIndexes === 'object' && 'length' in slidesIndexes) {
//         for (let i = 0; i < slidesIndexes.length; i += 1) {
//           indexToRemove = slidesIndexes[i];
//           if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
//           if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
//         }

//         newActiveIndex = Math.max(newActiveIndex, 0);
//       } else {
//         indexToRemove = slidesIndexes;
//         if (swiper.slides[indexToRemove]) swiper.slides.eq(indexToRemove).remove();
//         if (indexToRemove < newActiveIndex) newActiveIndex -= 1;
//         newActiveIndex = Math.max(newActiveIndex, 0);
//       }

//       if (params.loop) {
//         swiper.loopCreate();
//       }

//       if (!params.observer) {
//         swiper.update();
//       }

//       if (params.loop) {
//         swiper.slideTo(newActiveIndex + swiper.loopedSlides, 0, false);
//       } else {
//         swiper.slideTo(newActiveIndex, 0, false);
//       }
//     }

//     function removeAllSlides() {
//       const swiper = this;
//       const slidesIndexes = [];

//       for (let i = 0; i < swiper.slides.length; i += 1) {
//         slidesIndexes.push(i);
//       }

//       swiper.removeSlide(slidesIndexes);
//     }

//     function Manipulation({swiper}) {
//       Object.assign(swiper, {
//         appendSlide: appendSlide.bind(swiper),
//         prependSlide: prependSlide.bind(swiper),
//         addSlide: addSlide.bind(swiper),
//         removeSlide: removeSlide.bind(swiper),
//         removeAllSlides: removeAllSlides.bind(swiper),
//       });
//     }

//     function effectInit(params) {
//       const {effect, swiper, on, setTranslate, setTransition, overwriteParams, perspective} = params;
//       on('beforeInit', () => {
//         if (swiper.params.effect !== effect) return;
//         swiper.classNames.push(`${swiper.params.containerModifierClass}${effect}`);

//         if (perspective && perspective()) {
//           swiper.classNames.push(`${swiper.params.containerModifierClass}3d`);
//         }

//         const overwriteParamsResult = overwriteParams ? overwriteParams() : {};
//         Object.assign(swiper.params, overwriteParamsResult);
//         Object.assign(swiper.originalParams, overwriteParamsResult);
//       });
//       on('setTranslate', () => {
//         if (swiper.params.effect !== effect) return;
//         setTranslate();
//       });
//       on('setTransition', (_s, duration) => {
//         if (swiper.params.effect !== effect) return;
//         setTransition(duration);
//       });
//     }

//     function effectTarget(effectParams, $slideEl) {
//       if (effectParams.transformEl) {
//         return $slideEl.find(effectParams.transformEl).css({
//           'backface-visibility': 'hidden',
//           '-webkit-backface-visibility': 'hidden',
//         });
//       }

//       return $slideEl;
//     }

//     function effectVirtualTransitionEnd({swiper, duration, transformEl, allSlides}) {
//       const {slides, activeIndex, $wrapperEl} = swiper;

//       if (swiper.params.virtualTranslate && duration !== 0) {
//         let eventTriggered = false;
//         let $transitionEndTarget;

//         if (allSlides) {
//           $transitionEndTarget = transformEl ? slides.find(transformEl) : slides;
//         } else {
//           $transitionEndTarget = transformEl ? slides.eq(activeIndex).find(transformEl) : slides.eq(activeIndex);
//         }

//         $transitionEndTarget.transitionEnd(() => {
//           if (eventTriggered) return;
//           if (!swiper || swiper.destroyed) return;
//           eventTriggered = true;
//           swiper.animating = false;
//           const triggerEvents = ['webkitTransitionEnd', 'transitionend'];

//           for (let i = 0; i < triggerEvents.length; i += 1) {
//             $wrapperEl.trigger(triggerEvents[i]);
//           }
//         });
//       }
//     }

//     function EffectFade({swiper, extendParams, on}) {
//       extendParams({
//         fadeEffect: {
//           crossFade: false,
//           transformEl: null,
//         },
//       });

//       const setTranslate = () => {
//         const {slides} = swiper;
//         const params = swiper.params.fadeEffect;

//         for (let i = 0; i < slides.length; i += 1) {
//           const $slideEl = swiper.slides.eq(i);
//           const offset = $slideEl[0].swiperSlideOffset;
//           let tx = -offset;
//           if (!swiper.params.virtualTranslate) tx -= swiper.translate;
//           let ty = 0;

//           if (!swiper.isHorizontal()) {
//             ty = tx;
//             tx = 0;
//           }

//           const slideOpacity = swiper.params.fadeEffect.crossFade
//             ? Math.max(1 - Math.abs($slideEl[0].progress), 0)
//             : 1 + Math.min(Math.max($slideEl[0].progress, -1), 0);
//           const $targetEl = effectTarget(params, $slideEl);
//           $targetEl
//             .css({
//               opacity: slideOpacity,
//             })
//             .transform(`translate3d(${tx}px, ${ty}px, 0px)`);
//         }
//       };

//       const setTransition = (duration) => {
//         const {transformEl} = swiper.params.fadeEffect;
//         const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
//         $transitionElements.transition(duration);
//         effectVirtualTransitionEnd({
//           swiper,
//           duration,
//           transformEl,
//           allSlides: true,
//         });
//       };

//       effectInit({
//         effect: 'fade',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         overwriteParams: () => ({
//           slidesPerView: 1,
//           slidesPerGroup: 1,
//           watchSlidesProgress: true,
//           spaceBetween: 0,
//           virtualTranslate: !swiper.params.cssMode,
//         }),
//       });
//     }

//     function EffectCube({swiper, extendParams, on}) {
//       extendParams({
//         cubeEffect: {
//           slideShadows: true,
//           shadow: true,
//           shadowOffset: 20,
//           shadowScale: 0.94,
//         },
//       });

//       const setTranslate = () => {
//         const {
//           $el,
//           $wrapperEl,
//           slides,
//           width: swiperWidth,
//           height: swiperHeight,
//           rtlTranslate: rtl,
//           size: swiperSize,
//           browser,
//         } = swiper;
//         const params = swiper.params.cubeEffect;
//         const isHorizontal = swiper.isHorizontal();
//         const isVirtual = swiper.virtual && swiper.params.virtual.enabled;
//         let wrapperRotate = 0;
//         let $cubeShadowEl;

//         if (params.shadow) {
//           if (isHorizontal) {
//             $cubeShadowEl = $wrapperEl.find('.swiper-cube-shadow');

//             if ($cubeShadowEl.length === 0) {
//               $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
//               $wrapperEl.append($cubeShadowEl);
//             }

//             $cubeShadowEl.css({
//               height: `${swiperWidth}px`,
//             });
//           } else {
//             $cubeShadowEl = $el.find('.swiper-cube-shadow');

//             if ($cubeShadowEl.length === 0) {
//               $cubeShadowEl = $('<div class="swiper-cube-shadow"></div>');
//               $el.append($cubeShadowEl);
//             }
//           }
//         }

//         for (let i = 0; i < slides.length; i += 1) {
//           const $slideEl = slides.eq(i);
//           let slideIndex = i;

//           if (isVirtual) {
//             slideIndex = parseInt($slideEl.attr('data-swiper-slide-index'), 10);
//           }

//           let slideAngle = slideIndex * 90;
//           let round = Math.floor(slideAngle / 360);

//           if (rtl) {
//             slideAngle = -slideAngle;
//             round = Math.floor(-slideAngle / 360);
//           }

//           const progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
//           let tx = 0;
//           let ty = 0;
//           let tz = 0;

//           if (slideIndex % 4 === 0) {
//             tx = -round * 4 * swiperSize;
//             tz = 0;
//           } else if ((slideIndex - 1) % 4 === 0) {
//             tx = 0;
//             tz = -round * 4 * swiperSize;
//           } else if ((slideIndex - 2) % 4 === 0) {
//             tx = swiperSize + round * 4 * swiperSize;
//             tz = swiperSize;
//           } else if ((slideIndex - 3) % 4 === 0) {
//             tx = -swiperSize;
//             tz = 3 * swiperSize + swiperSize * 4 * round;
//           }

//           if (rtl) {
//             tx = -tx;
//           }

//           if (!isHorizontal) {
//             ty = tx;
//             tx = 0;
//           }

//           const transform = `rotateX(${isHorizontal ? 0 : -slideAngle}deg) rotateY(${
//             isHorizontal ? slideAngle : 0
//           }deg) translate3d(${tx}px, ${ty}px, ${tz}px)`;

//           if (progress <= 1 && progress > -1) {
//             wrapperRotate = slideIndex * 90 + progress * 90;
//             if (rtl) wrapperRotate = -slideIndex * 90 - progress * 90;
//           }

//           $slideEl.transform(transform);

//           if (params.slideShadows) {
//             // Set shadows
//             let shadowBefore = isHorizontal
//               ? $slideEl.find('.swiper-slide-shadow-left')
//               : $slideEl.find('.swiper-slide-shadow-top');
//             let shadowAfter = isHorizontal
//               ? $slideEl.find('.swiper-slide-shadow-right')
//               : $slideEl.find('.swiper-slide-shadow-bottom');

//             if (shadowBefore.length === 0) {
//               shadowBefore = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'left' : 'top'}"></div>`);
//               $slideEl.append(shadowBefore);
//             }

//             if (shadowAfter.length === 0) {
//               shadowAfter = $(`<div class="swiper-slide-shadow-${isHorizontal ? 'right' : 'bottom'}"></div>`);
//               $slideEl.append(shadowAfter);
//             }

//             if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
//             if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
//           }
//         }

//         $wrapperEl.css({
//           '-webkit-transform-origin': `50% 50% -${swiperSize / 2}px`,
//           'transform-origin': `50% 50% -${swiperSize / 2}px`,
//         });

//         if (params.shadow) {
//           if (isHorizontal) {
//             $cubeShadowEl.transform(
//               `translate3d(0px, ${swiperWidth / 2 + params.shadowOffset}px, ${
//                 -swiperWidth / 2
//               }px) rotateX(90deg) rotateZ(0deg) scale(${params.shadowScale})`,
//             );
//           } else {
//             const shadowAngle = Math.abs(wrapperRotate) - Math.floor(Math.abs(wrapperRotate) / 90) * 90;
//             const multiplier =
//               1.5 - (Math.sin((shadowAngle * 2 * Math.PI) / 360) / 2 + Math.cos((shadowAngle * 2 * Math.PI) / 360) / 2);
//             const scale1 = params.shadowScale;
//             const scale2 = params.shadowScale / multiplier;
//             const offset = params.shadowOffset;
//             $cubeShadowEl.transform(
//               `scale3d(${scale1}, 1, ${scale2}) translate3d(0px, ${swiperHeight / 2 + offset}px, ${
//                 -swiperHeight / 2 / scale2
//               }px) rotateX(-90deg)`,
//             );
//           }
//         }

//         const zFactor = browser.isSafari || browser.isWebView ? -swiperSize / 2 : 0;
//         $wrapperEl.transform(
//           `translate3d(0px,0,${zFactor}px) rotateX(${swiper.isHorizontal() ? 0 : wrapperRotate}deg) rotateY(${
//             swiper.isHorizontal() ? -wrapperRotate : 0
//           }deg)`,
//         );
//       };

//       const setTransition = (duration) => {
//         const {$el, slides} = swiper;
//         slides
//           .transition(duration)
//           .find(
//             '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
//           )
//           .transition(duration);

//         if (swiper.params.cubeEffect.shadow && !swiper.isHorizontal()) {
//           $el.find('.swiper-cube-shadow').transition(duration);
//         }
//       };

//       effectInit({
//         effect: 'cube',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         perspective: () => true,
//         overwriteParams: () => ({
//           slidesPerView: 1,
//           slidesPerGroup: 1,
//           watchSlidesProgress: true,
//           resistanceRatio: 0,
//           spaceBetween: 0,
//           centeredSlides: false,
//           virtualTranslate: true,
//         }),
//       });
//     }

//     function createShadow(params, $slideEl, side) {
//       const shadowClass = `swiper-slide-shadow${side ? `-${side}` : ''}`;
//       const $shadowContainer = params.transformEl ? $slideEl.find(params.transformEl) : $slideEl;
//       let $shadowEl = $shadowContainer.children(`.${shadowClass}`);

//       if (!$shadowEl.length) {
//         $shadowEl = $(`<div class="swiper-slide-shadow${side ? `-${side}` : ''}"></div>`);
//         $shadowContainer.append($shadowEl);
//       }

//       return $shadowEl;
//     }

//     function EffectFlip({swiper, extendParams, on}) {
//       extendParams({
//         flipEffect: {
//           slideShadows: true,
//           limitRotation: true,
//           transformEl: null,
//         },
//       });

//       const setTranslate = () => {
//         const {slides, rtlTranslate: rtl} = swiper;
//         const params = swiper.params.flipEffect;

//         for (let i = 0; i < slides.length; i += 1) {
//           const $slideEl = slides.eq(i);
//           let progress = $slideEl[0].progress;

//           if (swiper.params.flipEffect.limitRotation) {
//             progress = Math.max(Math.min($slideEl[0].progress, 1), -1);
//           }

//           const offset = $slideEl[0].swiperSlideOffset;
//           const rotate = -180 * progress;
//           let rotateY = rotate;
//           let rotateX = 0;
//           let tx = swiper.params.cssMode ? -offset - swiper.translate : -offset;
//           let ty = 0;

//           if (!swiper.isHorizontal()) {
//             ty = tx;
//             tx = 0;
//             rotateX = -rotateY;
//             rotateY = 0;
//           } else if (rtl) {
//             rotateY = -rotateY;
//           }

//           $slideEl[0].style.zIndex = -Math.abs(Math.round(progress)) + slides.length;

//           if (params.slideShadows) {
//             // Set shadows
//             let shadowBefore = swiper.isHorizontal()
//               ? $slideEl.find('.swiper-slide-shadow-left')
//               : $slideEl.find('.swiper-slide-shadow-top');
//             let shadowAfter = swiper.isHorizontal()
//               ? $slideEl.find('.swiper-slide-shadow-right')
//               : $slideEl.find('.swiper-slide-shadow-bottom');

//             if (shadowBefore.length === 0) {
//               shadowBefore = createShadow(params, $slideEl, swiper.isHorizontal() ? 'left' : 'top');
//             }

//             if (shadowAfter.length === 0) {
//               shadowAfter = createShadow(params, $slideEl, swiper.isHorizontal() ? 'right' : 'bottom');
//             }

//             if (shadowBefore.length) shadowBefore[0].style.opacity = Math.max(-progress, 0);
//             if (shadowAfter.length) shadowAfter[0].style.opacity = Math.max(progress, 0);
//           }

//           const transform = `translate3d(${tx}px, ${ty}px, 0px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
//           const $targetEl = effectTarget(params, $slideEl);
//           $targetEl.transform(transform);
//         }
//       };

//       const setTransition = (duration) => {
//         const {transformEl} = swiper.params.flipEffect;
//         const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
//         $transitionElements
//           .transition(duration)
//           .find(
//             '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
//           )
//           .transition(duration);
//         effectVirtualTransitionEnd({
//           swiper,
//           duration,
//           transformEl,
//         });
//       };

//       effectInit({
//         effect: 'flip',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         perspective: () => true,
//         overwriteParams: () => ({
//           slidesPerView: 1,
//           slidesPerGroup: 1,
//           watchSlidesProgress: true,
//           spaceBetween: 0,
//           virtualTranslate: !swiper.params.cssMode,
//         }),
//       });
//     }

//     function EffectCoverflow({swiper, extendParams, on}) {
//       extendParams({
//         coverflowEffect: {
//           rotate: 50,
//           stretch: 0,
//           depth: 100,
//           scale: 1,
//           modifier: 1,
//           slideShadows: true,
//           transformEl: null,
//         },
//       });

//       const setTranslate = () => {
//         const {width: swiperWidth, height: swiperHeight, slides, slidesSizesGrid} = swiper;
//         const params = swiper.params.coverflowEffect;
//         const isHorizontal = swiper.isHorizontal();
//         const transform = swiper.translate;
//         const center = isHorizontal ? -transform + swiperWidth / 2 : -transform + swiperHeight / 2;
//         const rotate = isHorizontal ? params.rotate : -params.rotate;
//         const translate = params.depth; // Each slide offset from center

//         for (let i = 0, length = slides.length; i < length; i += 1) {
//           const $slideEl = slides.eq(i);
//           const slideSize = slidesSizesGrid[i];
//           const slideOffset = $slideEl[0].swiperSlideOffset;
//           const offsetMultiplier = ((center - slideOffset - slideSize / 2) / slideSize) * params.modifier;
//           let rotateY = isHorizontal ? rotate * offsetMultiplier : 0;
//           let rotateX = isHorizontal ? 0 : rotate * offsetMultiplier; // var rotateZ = 0

//           let translateZ = -translate * Math.abs(offsetMultiplier);
//           let stretch = params.stretch; // Allow percentage to make a relative stretch for responsive sliders

//           if (typeof stretch === 'string' && stretch.indexOf('%') !== -1) {
//             stretch = (parseFloat(params.stretch) / 100) * slideSize;
//           }

//           let translateY = isHorizontal ? 0 : stretch * offsetMultiplier;
//           let translateX = isHorizontal ? stretch * offsetMultiplier : 0;
//           let scale = 1 - (1 - params.scale) * Math.abs(offsetMultiplier); // Fix for ultra small values

//           if (Math.abs(translateX) < 0.001) translateX = 0;
//           if (Math.abs(translateY) < 0.001) translateY = 0;
//           if (Math.abs(translateZ) < 0.001) translateZ = 0;
//           if (Math.abs(rotateY) < 0.001) rotateY = 0;
//           if (Math.abs(rotateX) < 0.001) rotateX = 0;
//           if (Math.abs(scale) < 0.001) scale = 0;
//           const slideTransform = `translate3d(${translateX}px,${translateY}px,${translateZ}px)  rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
//           const $targetEl = effectTarget(params, $slideEl);
//           $targetEl.transform(slideTransform);
//           $slideEl[0].style.zIndex = -Math.abs(Math.round(offsetMultiplier)) + 1;

//           if (params.slideShadows) {
//             // Set shadows
//             let $shadowBeforeEl = isHorizontal
//               ? $slideEl.find('.swiper-slide-shadow-left')
//               : $slideEl.find('.swiper-slide-shadow-top');
//             let $shadowAfterEl = isHorizontal
//               ? $slideEl.find('.swiper-slide-shadow-right')
//               : $slideEl.find('.swiper-slide-shadow-bottom');

//             if ($shadowBeforeEl.length === 0) {
//               $shadowBeforeEl = createShadow(params, $slideEl, isHorizontal ? 'left' : 'top');
//             }

//             if ($shadowAfterEl.length === 0) {
//               $shadowAfterEl = createShadow(params, $slideEl, isHorizontal ? 'right' : 'bottom');
//             }

//             if ($shadowBeforeEl.length) $shadowBeforeEl[0].style.opacity = offsetMultiplier > 0 ? offsetMultiplier : 0;
//             if ($shadowAfterEl.length) $shadowAfterEl[0].style.opacity = -offsetMultiplier > 0 ? -offsetMultiplier : 0;
//           }
//         }
//       };

//       const setTransition = (duration) => {
//         const {transformEl} = swiper.params.coverflowEffect;
//         const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
//         $transitionElements
//           .transition(duration)
//           .find(
//             '.swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left',
//           )
//           .transition(duration);
//       };

//       effectInit({
//         effect: 'coverflow',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         perspective: () => true,
//         overwriteParams: () => ({
//           watchSlidesProgress: true,
//         }),
//       });
//     }

//     function EffectCreative({swiper, extendParams, on}) {
//       extendParams({
//         creativeEffect: {
//           transformEl: null,
//           limitProgress: 1,
//           shadowPerProgress: false,
//           progressMultiplier: 1,
//           perspective: true,
//           prev: {
//             translate: [0, 0, 0],
//             rotate: [0, 0, 0],
//             opacity: 1,
//             scale: 1,
//           },
//           next: {
//             translate: [0, 0, 0],
//             rotate: [0, 0, 0],
//             opacity: 1,
//             scale: 1,
//           },
//         },
//       });

//       const getTranslateValue = (value) => {
//         if (typeof value === 'string') return value;
//         return `${value}px`;
//       };

//       const setTranslate = () => {
//         const {slides, $wrapperEl, slidesSizesGrid} = swiper;
//         const params = swiper.params.creativeEffect;
//         const {progressMultiplier: multiplier} = params;
//         const isCenteredSlides = swiper.params.centeredSlides;

//         if (isCenteredSlides) {
//           const margin = slidesSizesGrid[0] / 2 - swiper.params.slidesOffsetBefore || 0;
//           $wrapperEl.transform(`translateX(calc(50% - ${margin}px))`);
//         }

//         for (let i = 0; i < slides.length; i += 1) {
//           const $slideEl = slides.eq(i);
//           const slideProgress = $slideEl[0].progress;
//           const progress = Math.min(Math.max($slideEl[0].progress, -params.limitProgress), params.limitProgress);
//           let originalProgress = progress;

//           if (!isCenteredSlides) {
//             originalProgress = Math.min(
//               Math.max($slideEl[0].originalProgress, -params.limitProgress),
//               params.limitProgress,
//             );
//           }

//           const offset = $slideEl[0].swiperSlideOffset;
//           const t = [swiper.params.cssMode ? -offset - swiper.translate : -offset, 0, 0];
//           const r = [0, 0, 0];
//           let custom = false;

//           if (!swiper.isHorizontal()) {
//             t[1] = t[0];
//             t[0] = 0;
//           }

//           let data = {
//             translate: [0, 0, 0],
//             rotate: [0, 0, 0],
//             scale: 1,
//             opacity: 1,
//           };

//           if (progress < 0) {
//             data = params.next;
//             custom = true;
//           } else if (progress > 0) {
//             data = params.prev;
//             custom = true;
//           } // set translate

//           t.forEach((value, index) => {
//             t[index] = `calc(${value}px + (${getTranslateValue(data.translate[index])} * ${Math.abs(
//               progress * multiplier,
//             )}))`;
//           }); // set rotates

//           r.forEach((value, index) => {
//             r[index] = data.rotate[index] * Math.abs(progress * multiplier);
//           });
//           $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
//           const translateString = t.join(', ');
//           const rotateString = `rotateX(${r[0]}deg) rotateY(${r[1]}deg) rotateZ(${r[2]}deg)`;
//           const scaleString =
//             originalProgress < 0
//               ? `scale(${1 + (1 - data.scale) * originalProgress * multiplier})`
//               : `scale(${1 - (1 - data.scale) * originalProgress * multiplier})`;
//           const opacityString =
//             originalProgress < 0
//               ? 1 + (1 - data.opacity) * originalProgress * multiplier
//               : 1 - (1 - data.opacity) * originalProgress * multiplier;
//           const transform = `translate3d(${translateString}) ${rotateString} ${scaleString}`; // Set shadows

//           if ((custom && data.shadow) || !custom) {
//             let $shadowEl = $slideEl.children('.swiper-slide-shadow');

//             if ($shadowEl.length === 0 && data.shadow) {
//               $shadowEl = createShadow(params, $slideEl);
//             }

//             if ($shadowEl.length) {
//               const shadowOpacity = params.shadowPerProgress ? progress * (1 / params.limitProgress) : progress;
//               $shadowEl[0].style.opacity = Math.min(Math.max(Math.abs(shadowOpacity), 0), 1);
//             }
//           }

//           const $targetEl = effectTarget(params, $slideEl);
//           $targetEl.transform(transform).css({
//             opacity: opacityString,
//           });

//           if (data.origin) {
//             $targetEl.css('transform-origin', data.origin);
//           }
//         }
//       };

//       const setTransition = (duration) => {
//         const {transformEl} = swiper.params.creativeEffect;
//         const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
//         $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
//         effectVirtualTransitionEnd({
//           swiper,
//           duration,
//           transformEl,
//           allSlides: true,
//         });
//       };

//       effectInit({
//         effect: 'creative',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         perspective: () => swiper.params.creativeEffect.perspective,
//         overwriteParams: () => ({
//           watchSlidesProgress: true,
//           virtualTranslate: !swiper.params.cssMode,
//         }),
//       });
//     }

//     function EffectCards({swiper, extendParams, on}) {
//       extendParams({
//         cardsEffect: {
//           slideShadows: true,
//           transformEl: null,
//         },
//       });

//       const setTranslate = () => {
//         const {slides, activeIndex} = swiper;
//         const params = swiper.params.cardsEffect;
//         const {startTranslate, isTouched} = swiper.touchEventsData;
//         const currentTranslate = swiper.translate;

//         for (let i = 0; i < slides.length; i += 1) {
//           const $slideEl = slides.eq(i);
//           const slideProgress = $slideEl[0].progress;
//           const progress = Math.min(Math.max(slideProgress, -4), 4);
//           let offset = $slideEl[0].swiperSlideOffset;

//           if (swiper.params.centeredSlides && !swiper.params.cssMode) {
//             swiper.$wrapperEl.transform(`translateX(${swiper.minTranslate()}px)`);
//           }

//           if (swiper.params.centeredSlides && swiper.params.cssMode) {
//             offset -= slides[0].swiperSlideOffset;
//           }

//           let tX = swiper.params.cssMode ? -offset - swiper.translate : -offset;
//           let tY = 0;
//           const tZ = -100 * Math.abs(progress);
//           let scale = 1;
//           let rotate = -2 * progress;
//           let tXAdd = 8 - Math.abs(progress) * 0.75;
//           const isSwipeToNext =
//             (i === activeIndex || i === activeIndex - 1) &&
//             progress > 0 &&
//             progress < 1 &&
//             (isTouched || swiper.params.cssMode) &&
//             currentTranslate < startTranslate;
//           const isSwipeToPrev =
//             (i === activeIndex || i === activeIndex + 1) &&
//             progress < 0 &&
//             progress > -1 &&
//             (isTouched || swiper.params.cssMode) &&
//             currentTranslate > startTranslate;

//           if (isSwipeToNext || isSwipeToPrev) {
//             const subProgress = (1 - Math.abs((Math.abs(progress) - 0.5) / 0.5)) ** 0.5;
//             rotate += -28 * progress * subProgress;
//             scale += -0.5 * subProgress;
//             tXAdd += 96 * subProgress;
//             tY = `${-25 * subProgress * Math.abs(progress)}%`;
//           }

//           if (progress < 0) {
//             // next
//             tX = `calc(${tX}px + (${tXAdd * Math.abs(progress)}%))`;
//           } else if (progress > 0) {
//             // prev
//             tX = `calc(${tX}px + (-${tXAdd * Math.abs(progress)}%))`;
//           } else {
//             tX = `${tX}px`;
//           }

//           if (!swiper.isHorizontal()) {
//             const prevY = tY;
//             tY = tX;
//             tX = prevY;
//           }

//           const scaleString = progress < 0 ? `${1 + (1 - scale) * progress}` : `${1 - (1 - scale) * progress}`;
//           const transform = `
//       translate3d(${tX}, ${tY}, ${tZ}px)
//       rotateZ(${rotate}deg)
//       scale(${scaleString})
//     `;

//           if (params.slideShadows) {
//             // Set shadows
//             let $shadowEl = $slideEl.find('.swiper-slide-shadow');

//             if ($shadowEl.length === 0) {
//               $shadowEl = createShadow(params, $slideEl);
//             }

//             if ($shadowEl.length)
//               $shadowEl[0].style.opacity = Math.min(Math.max((Math.abs(progress) - 0.5) / 0.5, 0), 1);
//           }

//           $slideEl[0].style.zIndex = -Math.abs(Math.round(slideProgress)) + slides.length;
//           const $targetEl = effectTarget(params, $slideEl);
//           $targetEl.transform(transform);
//         }
//       };

//       const setTransition = (duration) => {
//         const {transformEl} = swiper.params.cardsEffect;
//         const $transitionElements = transformEl ? swiper.slides.find(transformEl) : swiper.slides;
//         $transitionElements.transition(duration).find('.swiper-slide-shadow').transition(duration);
//         effectVirtualTransitionEnd({
//           swiper,
//           duration,
//           transformEl,
//         });
//       };

//       effectInit({
//         effect: 'cards',
//         swiper,
//         on,
//         setTranslate,
//         setTransition,
//         perspective: () => true,
//         overwriteParams: () => ({
//           watchSlidesProgress: true,
//           virtualTranslate: !swiper.params.cssMode,
//         }),
//       });
//     }

//     // Swiper Class
//     const modules = [
//       Virtual,
//       Keyboard,
//       Mousewheel,
//       Navigation,
//       Pagination,
//       Scrollbar,
//       Parallax,
//       Zoom,
//       Lazy,
//       Controller,
//       A11y,
//       History,
//       HashNavigation,
//       Autoplay,
//       Thumb,
//       freeMode,
//       Grid,
//       Manipulation,
//       EffectFade,
//       EffectCube,
//       EffectFlip,
//       EffectCoverflow,
//       EffectCreative,
//       EffectCards,
//     ];
//     Swiper.use(modules);

//     return Swiper;
//   });
//   //# sourceMappingURL=swiper-bundle.js.map
// };

// export default swiper();

/**
 * Swiper 9.1.1
 * Most modern mobile touch slider and framework with hardware accelerated transitions
 * https://swiperjs.com
 *
 * Copyright 2014-2023 Vladimir Kharlampidi
 *
 * Released under the MIT License
 *
 * Released on: March 16, 2023
 */

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e="undefined"!=typeof globalThis?globalThis:e||self).Swiper=t()}(this,(function(){"use strict";function e(e){return null!==e&&"object"==typeof e&&"constructor"in e&&e.constructor===Object}function t(s,a){void 0===s&&(s={}),void 0===a&&(a={}),Object.keys(a).forEach((i=>{void 0===s[i]?s[i]=a[i]:e(a[i])&&e(s[i])&&Object.keys(a[i]).length>0&&t(s[i],a[i])}))}const s={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector:()=>null,querySelectorAll:()=>[],getElementById:()=>null,createEvent:()=>({initEvent(){}}),createElement:()=>({children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName:()=>[]}),createElementNS:()=>({}),importNode:()=>null,location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function a(){const e="undefined"!=typeof document?document:{};return t(e,s),e}const i={document:s,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle:()=>({getPropertyValue:()=>""}),Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia:()=>({}),requestAnimationFrame:e=>"undefined"==typeof setTimeout?(e(),null):setTimeout(e,0),cancelAnimationFrame(e){"undefined"!=typeof setTimeout&&clearTimeout(e)}};function r(){const e="undefined"!=typeof window?window:{};return t(e,i),e}function n(e,t){return void 0===t&&(t=0),setTimeout(e,t)}function l(){return Date.now()}function o(e,t){void 0===t&&(t="x");const s=r();let a,i,n;const l=function(e){const t=r();let s;return t.getComputedStyle&&(s=t.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}(e);return s.WebKitCSSMatrix?(i=l.transform||l.webkitTransform,i.split(",").length>6&&(i=i.split(", ").map((e=>e.replace(",","."))).join(", ")),n=new s.WebKitCSSMatrix("none"===i?"":i)):(n=l.MozTransform||l.OTransform||l.MsTransform||l.msTransform||l.transform||l.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=n.toString().split(",")),"x"===t&&(i=s.WebKitCSSMatrix?n.m41:16===a.length?parseFloat(a[12]):parseFloat(a[4])),"y"===t&&(i=s.WebKitCSSMatrix?n.m42:16===a.length?parseFloat(a[13]):parseFloat(a[5])),i||0}function d(e){return"object"==typeof e&&null!==e&&e.constructor&&"Object"===Object.prototype.toString.call(e).slice(8,-1)}function c(e){return"undefined"!=typeof window&&void 0!==window.HTMLElement?e instanceof HTMLElement:e&&(1===e.nodeType||11===e.nodeType)}function p(){const e=Object(arguments.length<=0?void 0:arguments[0]),t=["__proto__","constructor","prototype"];for(let s=1;s<arguments.length;s+=1){const a=s<0||arguments.length<=s?void 0:arguments[s];if(null!=a&&!c(a)){const s=Object.keys(Object(a)).filter((e=>t.indexOf(e)<0));for(let t=0,i=s.length;t<i;t+=1){const i=s[t],r=Object.getOwnPropertyDescriptor(a,i);void 0!==r&&r.enumerable&&(d(e[i])&&d(a[i])?a[i].__swiper__?e[i]=a[i]:p(e[i],a[i]):!d(e[i])&&d(a[i])?(e[i]={},a[i].__swiper__?e[i]=a[i]:p(e[i],a[i])):e[i]=a[i])}}}return e}function u(e,t,s){e.style.setProperty(t,s)}function m(e){let{swiper:t,targetPosition:s,side:a}=e;const i=r(),n=-t.translate;let l,o=null;const d=t.params.speed;t.wrapperEl.style.scrollSnapType="none",i.cancelAnimationFrame(t.cssModeFrameID);const c=s>n?"next":"prev",p=(e,t)=>"next"===c&&e>=t||"prev"===c&&e<=t,u=()=>{l=(new Date).getTime(),null===o&&(o=l);const e=Math.max(Math.min((l-o)/d,1),0),r=.5-Math.cos(e*Math.PI)/2;let c=n+r*(s-n);if(p(c,s)&&(c=s),t.wrapperEl.scrollTo({[a]:c}),p(c,s))return t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.scrollSnapType="",setTimeout((()=>{t.wrapperEl.style.overflow="",t.wrapperEl.scrollTo({[a]:c})})),void i.cancelAnimationFrame(t.cssModeFrameID);t.cssModeFrameID=i.requestAnimationFrame(u)};u()}function h(e){return e.querySelector(".swiper-slide-transform")||e.shadowEl&&e.shadowEl.querySelector(".swiper-slide-transform")||e}function f(e,t){return void 0===t&&(t=""),[...e.children].filter((e=>e.matches(t)))}function g(e,t){void 0===t&&(t=[]);const s=document.createElement(e);return s.classList.add(...Array.isArray(t)?t:[t]),s}function v(e){const t=r(),s=a(),i=e.getBoundingClientRect(),n=s.body,l=e.clientTop||n.clientTop||0,o=e.clientLeft||n.clientLeft||0,d=e===t?t.scrollY:e.scrollTop,c=e===t?t.scrollX:e.scrollLeft;return{top:i.top+d-l,left:i.left+c-o}}function w(e,t){return r().getComputedStyle(e,null).getPropertyValue(t)}function b(e){let t,s=e;if(s){for(t=0;null!==(s=s.previousSibling);)1===s.nodeType&&(t+=1);return t}}function y(e,t){const s=[];let a=e.parentElement;for(;a;)t?a.matches(t)&&s.push(a):s.push(a),a=a.parentElement;return s}function E(e,t){t&&e.addEventListener("transitionend",(function s(a){a.target===e&&(t.call(e,a),e.removeEventListener("transitionend",s))}))}function x(e,t,s){const a=r();return s?e["width"===t?"offsetWidth":"offsetHeight"]+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-right":"margin-top"))+parseFloat(a.getComputedStyle(e,null).getPropertyValue("width"===t?"margin-left":"margin-bottom")):e.offsetWidth}let S,T,M;function C(){return S||(S=function(){const e=r(),t=a();return{smoothScroll:t.documentElement&&"scrollBehavior"in t.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&t instanceof e.DocumentTouch)}}()),S}function P(e){return void 0===e&&(e={}),T||(T=function(e){let{userAgent:t}=void 0===e?{}:e;const s=C(),a=r(),i=a.navigator.platform,n=t||a.navigator.userAgent,l={ios:!1,android:!1},o=a.screen.width,d=a.screen.height,c=n.match(/(Android);?[\s\/]+([\d.]+)?/);let p=n.match(/(iPad).*OS\s([\d_]+)/);const u=n.match(/(iPod)(.*OS\s([\d_]+))?/),m=!p&&n.match(/(iPhone\sOS|iOS)\s([\d_]+)/),h="Win32"===i;let f="MacIntel"===i;return!p&&f&&s.touch&&["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"].indexOf(`${o}x${d}`)>=0&&(p=n.match(/(Version)\/([\d.]+)/),p||(p=[0,1,"13_0_0"]),f=!1),c&&!h&&(l.os="android",l.android=!0),(p||m||u)&&(l.os="ios",l.ios=!0),l}(e)),T}function L(){return M||(M=function(){const e=r();let t=!1;function s(){const t=e.navigator.userAgent.toLowerCase();return t.indexOf("safari")>=0&&t.indexOf("chrome")<0&&t.indexOf("android")<0}if(s()){const s=String(e.navigator.userAgent);if(s.includes("Version/")){const[e,a]=s.split("Version/")[1].split(" ")[0].split(".").map((e=>Number(e)));t=e<16||16===e&&a<2}}return{isSafari:t||s(),needPerspectiveFix:t,isWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent)}}()),M}var A={on(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;const i=s?"unshift":"push";return e.split(" ").forEach((e=>{a.eventsListeners[e]||(a.eventsListeners[e]=[]),a.eventsListeners[e][i](t)})),a},once(e,t,s){const a=this;if(!a.eventsListeners||a.destroyed)return a;if("function"!=typeof t)return a;function i(){a.off(e,i),i.__emitterProxy&&delete i.__emitterProxy;for(var s=arguments.length,r=new Array(s),n=0;n<s;n++)r[n]=arguments[n];t.apply(a,r)}return i.__emitterProxy=t,a.on(e,i,s)},onAny(e,t){const s=this;if(!s.eventsListeners||s.destroyed)return s;if("function"!=typeof e)return s;const a=t?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const t=this;if(!t.eventsListeners||t.destroyed)return t;if(!t.eventsAnyListeners)return t;const s=t.eventsAnyListeners.indexOf(e);return s>=0&&t.eventsAnyListeners.splice(s,1),t},off(e,t){const s=this;return!s.eventsListeners||s.destroyed?s:s.eventsListeners?(e.split(" ").forEach((e=>{void 0===t?s.eventsListeners[e]=[]:s.eventsListeners[e]&&s.eventsListeners[e].forEach(((a,i)=>{(a===t||a.__emitterProxy&&a.__emitterProxy===t)&&s.eventsListeners[e].splice(i,1)}))})),s):s},emit(){const e=this;if(!e.eventsListeners||e.destroyed)return e;if(!e.eventsListeners)return e;let t,s,a;for(var i=arguments.length,r=new Array(i),n=0;n<i;n++)r[n]=arguments[n];"string"==typeof r[0]||Array.isArray(r[0])?(t=r[0],s=r.slice(1,r.length),a=e):(t=r[0].events,s=r[0].data,a=r[0].context||e),s.unshift(a);return(Array.isArray(t)?t:t.split(" ")).forEach((t=>{e.eventsAnyListeners&&e.eventsAnyListeners.length&&e.eventsAnyListeners.forEach((e=>{e.apply(a,[t,...s])})),e.eventsListeners&&e.eventsListeners[t]&&e.eventsListeners[t].forEach((e=>{e.apply(a,s)}))})),e}};var z={updateSize:function(){const e=this;let t,s;const a=e.el;t=void 0!==e.params.width&&null!==e.params.width?e.params.width:a.clientWidth,s=void 0!==e.params.height&&null!==e.params.height?e.params.height:a.clientHeight,0===t&&e.isHorizontal()||0===s&&e.isVertical()||(t=t-parseInt(w(a,"padding-left")||0,10)-parseInt(w(a,"padding-right")||0,10),s=s-parseInt(w(a,"padding-top")||0,10)-parseInt(w(a,"padding-bottom")||0,10),Number.isNaN(t)&&(t=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:t,height:s,size:e.isHorizontal()?t:s}))},updateSlides:function(){const e=this;function t(t){return e.isHorizontal()?t:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[t]}function s(e,s){return parseFloat(e.getPropertyValue(t(s))||0)}const a=e.params,{wrapperEl:i,slidesEl:r,size:n,rtlTranslate:l,wrongRTL:o}=e,d=e.virtual&&a.virtual.enabled,c=d?e.virtual.slides.length:e.slides.length,p=f(r,`.${e.params.slideClass}, swiper-slide`),m=d?e.virtual.slides.length:p.length;let h=[];const g=[],v=[];let b=a.slidesOffsetBefore;"function"==typeof b&&(b=a.slidesOffsetBefore.call(e));let y=a.slidesOffsetAfter;"function"==typeof y&&(y=a.slidesOffsetAfter.call(e));const E=e.snapGrid.length,S=e.slidesGrid.length;let T=a.spaceBetween,M=-b,C=0,P=0;if(void 0===n)return;"string"==typeof T&&T.indexOf("%")>=0&&(T=parseFloat(T.replace("%",""))/100*n),e.virtualSize=-T,p.forEach((e=>{l?e.style.marginLeft="":e.style.marginRight="",e.style.marginBottom="",e.style.marginTop=""})),a.centeredSlides&&a.cssMode&&(u(i,"--swiper-centered-offset-before",""),u(i,"--swiper-centered-offset-after",""));const L=a.grid&&a.grid.rows>1&&e.grid;let A;L&&e.grid.initSlides(m);const z="auto"===a.slidesPerView&&a.breakpoints&&Object.keys(a.breakpoints).filter((e=>void 0!==a.breakpoints[e].slidesPerView)).length>0;for(let i=0;i<m;i+=1){let r;if(A=0,p[i]&&(r=p[i]),L&&e.grid.updateSlide(i,r,m,t),!p[i]||"none"!==w(r,"display")){if("auto"===a.slidesPerView){z&&(p[i].style[t("width")]="");const n=getComputedStyle(r),l=r.style.transform,o=r.style.webkitTransform;if(l&&(r.style.transform="none"),o&&(r.style.webkitTransform="none"),a.roundLengths)A=e.isHorizontal()?x(r,"width",!0):x(r,"height",!0);else{const e=s(n,"width"),t=s(n,"padding-left"),a=s(n,"padding-right"),i=s(n,"margin-left"),l=s(n,"margin-right"),o=n.getPropertyValue("box-sizing");if(o&&"border-box"===o)A=e+i+l;else{const{clientWidth:s,offsetWidth:n}=r;A=e+t+a+i+l+(n-s)}}l&&(r.style.transform=l),o&&(r.style.webkitTransform=o),a.roundLengths&&(A=Math.floor(A))}else A=(n-(a.slidesPerView-1)*T)/a.slidesPerView,a.roundLengths&&(A=Math.floor(A)),p[i]&&(p[i].style[t("width")]=`${A}px`);p[i]&&(p[i].swiperSlideSize=A),v.push(A),a.centeredSlides?(M=M+A/2+C/2+T,0===C&&0!==i&&(M=M-n/2-T),0===i&&(M=M-n/2-T),Math.abs(M)<.001&&(M=0),a.roundLengths&&(M=Math.floor(M)),P%a.slidesPerGroup==0&&h.push(M),g.push(M)):(a.roundLengths&&(M=Math.floor(M)),(P-Math.min(e.params.slidesPerGroupSkip,P))%e.params.slidesPerGroup==0&&h.push(M),g.push(M),M=M+A+T),e.virtualSize+=A+T,C=A,P+=1}}if(e.virtualSize=Math.max(e.virtualSize,n)+y,l&&o&&("slide"===a.effect||"coverflow"===a.effect)&&(i.style.width=`${e.virtualSize+a.spaceBetween}px`),a.setWrapperSize&&(i.style[t("width")]=`${e.virtualSize+a.spaceBetween}px`),L&&e.grid.updateWrapperSize(A,h,t),!a.centeredSlides){const t=[];for(let s=0;s<h.length;s+=1){let i=h[s];a.roundLengths&&(i=Math.floor(i)),h[s]<=e.virtualSize-n&&t.push(i)}h=t,Math.floor(e.virtualSize-n)-Math.floor(h[h.length-1])>1&&h.push(e.virtualSize-n)}if(d&&a.loop){const t=v[0]+T;if(a.slidesPerGroup>1){const s=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/a.slidesPerGroup),i=t*a.slidesPerGroup;for(let e=0;e<s;e+=1)h.push(h[h.length-1]+i)}for(let s=0;s<e.virtual.slidesBefore+e.virtual.slidesAfter;s+=1)1===a.slidesPerGroup&&h.push(h[h.length-1]+t),g.push(g[g.length-1]+t),e.virtualSize+=t}if(0===h.length&&(h=[0]),0!==a.spaceBetween){const s=e.isHorizontal()&&l?"marginLeft":t("marginRight");p.filter(((e,t)=>!(a.cssMode&&!a.loop)||t!==p.length-1)).forEach((e=>{e.style[s]=`${T}px`}))}if(a.centeredSlides&&a.centeredSlidesBounds){let e=0;v.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween;const t=e-n;h=h.map((e=>e<0?-b:e>t?t+y:e))}if(a.centerInsufficientSlides){let e=0;if(v.forEach((t=>{e+=t+(a.spaceBetween?a.spaceBetween:0)})),e-=a.spaceBetween,e<n){const t=(n-e)/2;h.forEach(((e,s)=>{h[s]=e-t})),g.forEach(((e,s)=>{g[s]=e+t}))}}if(Object.assign(e,{slides:p,snapGrid:h,slidesGrid:g,slidesSizesGrid:v}),a.centeredSlides&&a.cssMode&&!a.centeredSlidesBounds){u(i,"--swiper-centered-offset-before",-h[0]+"px"),u(i,"--swiper-centered-offset-after",e.size/2-v[v.length-1]/2+"px");const t=-e.snapGrid[0],s=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map((e=>e+t)),e.slidesGrid=e.slidesGrid.map((e=>e+s))}if(m!==c&&e.emit("slidesLengthChange"),h.length!==E&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),g.length!==S&&e.emit("slidesGridLengthChange"),a.watchSlidesProgress&&e.updateSlidesOffset(),!(d||a.cssMode||"slide"!==a.effect&&"fade"!==a.effect)){const t=`${a.containerModifierClass}backface-hidden`,s=e.el.classList.contains(t);m<=a.maxBackfaceHiddenSlides?s||e.el.classList.add(t):s&&e.el.classList.remove(t)}},updateAutoHeight:function(e){const t=this,s=[],a=t.virtual&&t.params.virtual.enabled;let i,r=0;"number"==typeof e?t.setTransition(e):!0===e&&t.setTransition(t.params.speed);const n=e=>a?t.getSlideIndexByData(e):t.slides[e];if("auto"!==t.params.slidesPerView&&t.params.slidesPerView>1)if(t.params.centeredSlides)(t.visibleSlides||[]).forEach((e=>{s.push(e)}));else for(i=0;i<Math.ceil(t.params.slidesPerView);i+=1){const e=t.activeIndex+i;if(e>t.slides.length&&!a)break;s.push(n(e))}else s.push(n(t.activeIndex));for(i=0;i<s.length;i+=1)if(void 0!==s[i]){const e=s[i].offsetHeight;r=e>r?e:r}(r||0===r)&&(t.wrapperEl.style.height=`${r}px`)},updateSlidesOffset:function(){const e=this,t=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let a=0;a<t.length;a+=1)t[a].swiperSlideOffset=(e.isHorizontal()?t[a].offsetLeft:t[a].offsetTop)-s},updateSlidesProgress:function(e){void 0===e&&(e=this&&this.translate||0);const t=this,s=t.params,{slides:a,rtlTranslate:i,snapGrid:r}=t;if(0===a.length)return;void 0===a[0].swiperSlideOffset&&t.updateSlidesOffset();let n=-e;i&&(n=e),a.forEach((e=>{e.classList.remove(s.slideVisibleClass)})),t.visibleSlidesIndexes=[],t.visibleSlides=[];for(let e=0;e<a.length;e+=1){const l=a[e];let o=l.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(o-=a[0].swiperSlideOffset);const d=(n+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),c=(n-r[0]+(s.centeredSlides?t.minTranslate():0)-o)/(l.swiperSlideSize+s.spaceBetween),p=-(n-o),u=p+t.slidesSizesGrid[e];(p>=0&&p<t.size-1||u>1&&u<=t.size||p<=0&&u>=t.size)&&(t.visibleSlides.push(l),t.visibleSlidesIndexes.push(e),a[e].classList.add(s.slideVisibleClass)),l.progress=i?-d:d,l.originalProgress=i?-c:c}},updateProgress:function(e){const t=this;if(void 0===e){const s=t.rtlTranslate?-1:1;e=t&&t.translate&&t.translate*s||0}const s=t.params,a=t.maxTranslate()-t.minTranslate();let{progress:i,isBeginning:r,isEnd:n,progressLoop:l}=t;const o=r,d=n;if(0===a)i=0,r=!0,n=!0;else{i=(e-t.minTranslate())/a;const s=Math.abs(e-t.minTranslate())<1,l=Math.abs(e-t.maxTranslate())<1;r=s||i<=0,n=l||i>=1,s&&(i=0),l&&(i=1)}if(s.loop){const s=t.getSlideIndexByData(0),a=t.getSlideIndexByData(t.slides.length-1),i=t.slidesGrid[s],r=t.slidesGrid[a],n=t.slidesGrid[t.slidesGrid.length-1],o=Math.abs(e);l=o>=i?(o-i)/n:(o+n-r)/n,l>1&&(l-=1)}Object.assign(t,{progress:i,progressLoop:l,isBeginning:r,isEnd:n}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&t.updateSlidesProgress(e),r&&!o&&t.emit("reachBeginning toEdge"),n&&!d&&t.emit("reachEnd toEdge"),(o&&!r||d&&!n)&&t.emit("fromEdge"),t.emit("progress",i)},updateSlidesClasses:function(){const e=this,{slides:t,params:s,slidesEl:a,activeIndex:i}=e,r=e.virtual&&s.virtual.enabled,n=e=>f(a,`.${s.slideClass}${e}, swiper-slide${e}`)[0];let l;if(t.forEach((e=>{e.classList.remove(s.slideActiveClass,s.slideNextClass,s.slidePrevClass)})),r)if(s.loop){let t=i-e.virtual.slidesBefore;t<0&&(t=e.virtual.slides.length+t),t>=e.virtual.slides.length&&(t-=e.virtual.slides.length),l=n(`[data-swiper-slide-index="${t}"]`)}else l=n(`[data-swiper-slide-index="${i}"]`);else l=t[i];if(l){l.classList.add(s.slideActiveClass);let e=function(e,t){const s=[];for(;e.nextElementSibling;){const a=e.nextElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&!e&&(e=t[0]),e&&e.classList.add(s.slideNextClass);let a=function(e,t){const s=[];for(;e.previousElementSibling;){const a=e.previousElementSibling;t?a.matches(t)&&s.push(a):s.push(a),e=a}return s}(l,`.${s.slideClass}, swiper-slide`)[0];s.loop&&0===!a&&(a=t[t.length-1]),a&&a.classList.add(s.slidePrevClass)}e.emitSlidesClasses()},updateActiveIndex:function(e){const t=this,s=t.rtlTranslate?t.translate:-t.translate,{snapGrid:a,params:i,activeIndex:r,realIndex:n,snapIndex:l}=t;let o,d=e;const c=e=>{let s=e-t.virtual.slidesBefore;return s<0&&(s=t.virtual.slides.length+s),s>=t.virtual.slides.length&&(s-=t.virtual.slides.length),s};if(void 0===d&&(d=function(e){const{slidesGrid:t,params:s}=e,a=e.rtlTranslate?e.translate:-e.translate;let i;for(let e=0;e<t.length;e+=1)void 0!==t[e+1]?a>=t[e]&&a<t[e+1]-(t[e+1]-t[e])/2?i=e:a>=t[e]&&a<t[e+1]&&(i=e+1):a>=t[e]&&(i=e);return s.normalizeSlideIndex&&(i<0||void 0===i)&&(i=0),i}(t)),a.indexOf(s)>=0)o=a.indexOf(s);else{const e=Math.min(i.slidesPerGroupSkip,d);o=e+Math.floor((d-e)/i.slidesPerGroup)}if(o>=a.length&&(o=a.length-1),d===r)return o!==l&&(t.snapIndex=o,t.emit("snapIndexChange")),void(t.params.loop&&t.virtual&&t.params.virtual.enabled&&(t.realIndex=c(d)));let p;p=t.virtual&&i.virtual.enabled&&i.loop?c(d):t.slides[d]?parseInt(t.slides[d].getAttribute("data-swiper-slide-index")||d,10):d,Object.assign(t,{snapIndex:o,realIndex:p,previousIndex:r,activeIndex:d}),t.emit("activeIndexChange"),t.emit("snapIndexChange"),n!==p&&t.emit("realIndexChange"),(t.initialized||t.params.runCallbacksOnInit)&&t.emit("slideChange")},updateClickedSlide:function(e){const t=this,s=t.params,a=e.closest(`.${s.slideClass}, swiper-slide`);let i,r=!1;if(a)for(let e=0;e<t.slides.length;e+=1)if(t.slides[e]===a){r=!0,i=e;break}if(!a||!r)return t.clickedSlide=void 0,void(t.clickedIndex=void 0);t.clickedSlide=a,t.virtual&&t.params.virtual.enabled?t.clickedIndex=parseInt(a.getAttribute("data-swiper-slide-index"),10):t.clickedIndex=i,s.slideToClickedSlide&&void 0!==t.clickedIndex&&t.clickedIndex!==t.activeIndex&&t.slideToClickedSlide()}};var $={getTranslate:function(e){void 0===e&&(e=this.isHorizontal()?"x":"y");const{params:t,rtlTranslate:s,translate:a,wrapperEl:i}=this;if(t.virtualTranslate)return s?-a:a;if(t.cssMode)return a;let r=o(i,e);return s&&(r=-r),r||0},setTranslate:function(e,t){const s=this,{rtlTranslate:a,params:i,wrapperEl:r,progress:n}=s;let l,o=0,d=0;s.isHorizontal()?o=a?-e:e:d=e,i.roundLengths&&(o=Math.floor(o),d=Math.floor(d)),i.cssMode?r[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-o:-d:i.virtualTranslate||(r.style.transform=`translate3d(${o}px, ${d}px, 0px)`),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?o:d;const c=s.maxTranslate()-s.minTranslate();l=0===c?0:(e-s.minTranslate())/c,l!==n&&s.updateProgress(e),s.emit("setTranslate",s.translate,t)},minTranslate:function(){return-this.snapGrid[0]},maxTranslate:function(){return-this.snapGrid[this.snapGrid.length-1]},translateTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),void 0===a&&(a=!0);const r=this,{params:n,wrapperEl:l}=r;if(r.animating&&n.preventInteractionOnTransition)return!1;const o=r.minTranslate(),d=r.maxTranslate();let c;if(c=a&&e>o?o:a&&e<d?d:e,r.updateProgress(c),n.cssMode){const e=r.isHorizontal();if(0===t)l[e?"scrollLeft":"scrollTop"]=-c;else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:-c,side:e?"left":"top"}),!0;l.scrollTo({[e?"left":"top"]:-c,behavior:"smooth"})}return!0}return 0===t?(r.setTransition(0),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionEnd"))):(r.setTransition(t),r.setTranslate(c),s&&(r.emit("beforeTransitionStart",t,i),r.emit("transitionStart")),r.animating||(r.animating=!0,r.onTranslateToWrapperTransitionEnd||(r.onTranslateToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onTranslateToWrapperTransitionEnd),r.onTranslateToWrapperTransitionEnd=null,delete r.onTranslateToWrapperTransitionEnd,s&&r.emit("transitionEnd"))}),r.wrapperEl.addEventListener("transitionend",r.onTranslateToWrapperTransitionEnd))),!0}};function k(e){let{swiper:t,runCallbacks:s,direction:a,step:i}=e;const{activeIndex:r,previousIndex:n}=t;let l=a;if(l||(l=r>n?"next":r<n?"prev":"reset"),t.emit(`transition${i}`),s&&r!==n){if("reset"===l)return void t.emit(`slideResetTransition${i}`);t.emit(`slideChangeTransition${i}`),"next"===l?t.emit(`slideNextTransition${i}`):t.emit(`slidePrevTransition${i}`)}}var I={slideTo:function(e,t,s,a,i){void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e&&(e=parseInt(e,10));const r=this;let n=e;n<0&&(n=0);const{params:l,snapGrid:o,slidesGrid:d,previousIndex:c,activeIndex:p,rtlTranslate:u,wrapperEl:h,enabled:f}=r;if(r.animating&&l.preventInteractionOnTransition||!f&&!a&&!i)return!1;const g=Math.min(r.params.slidesPerGroupSkip,n);let v=g+Math.floor((n-g)/r.params.slidesPerGroup);v>=o.length&&(v=o.length-1);const w=-o[v];if(l.normalizeSlideIndex)for(let e=0;e<d.length;e+=1){const t=-Math.floor(100*w),s=Math.floor(100*d[e]),a=Math.floor(100*d[e+1]);void 0!==d[e+1]?t>=s&&t<a-(a-s)/2?n=e:t>=s&&t<a&&(n=e+1):t>=s&&(n=e)}if(r.initialized&&n!==p){if(!r.allowSlideNext&&w<r.translate&&w<r.minTranslate())return!1;if(!r.allowSlidePrev&&w>r.translate&&w>r.maxTranslate()&&(p||0)!==n)return!1}let b;if(n!==(c||0)&&s&&r.emit("beforeSlideChangeStart"),r.updateProgress(w),b=n>p?"next":n<p?"prev":"reset",u&&-w===r.translate||!u&&w===r.translate)return r.updateActiveIndex(n),l.autoHeight&&r.updateAutoHeight(),r.updateSlidesClasses(),"slide"!==l.effect&&r.setTranslate(w),"reset"!==b&&(r.transitionStart(s,b),r.transitionEnd(s,b)),!1;if(l.cssMode){const e=r.isHorizontal(),s=u?w:-w;if(0===t){const t=r.virtual&&r.params.virtual.enabled;t&&(r.wrapperEl.style.scrollSnapType="none",r._immediateVirtual=!0),t&&!r._cssModeVirtualInitialSet&&r.params.initialSlide>0?(r._cssModeVirtualInitialSet=!0,requestAnimationFrame((()=>{h[e?"scrollLeft":"scrollTop"]=s}))):h[e?"scrollLeft":"scrollTop"]=s,t&&requestAnimationFrame((()=>{r.wrapperEl.style.scrollSnapType="",r._immediateVirtual=!1}))}else{if(!r.support.smoothScroll)return m({swiper:r,targetPosition:s,side:e?"left":"top"}),!0;h.scrollTo({[e?"left":"top"]:s,behavior:"smooth"})}return!0}return r.setTransition(t),r.setTranslate(w),r.updateActiveIndex(n),r.updateSlidesClasses(),r.emit("beforeTransitionStart",t,a),r.transitionStart(s,b),0===t?r.transitionEnd(s,b):r.animating||(r.animating=!0,r.onSlideToWrapperTransitionEnd||(r.onSlideToWrapperTransitionEnd=function(e){r&&!r.destroyed&&e.target===this&&(r.wrapperEl.removeEventListener("transitionend",r.onSlideToWrapperTransitionEnd),r.onSlideToWrapperTransitionEnd=null,delete r.onSlideToWrapperTransitionEnd,r.transitionEnd(s,b))}),r.wrapperEl.addEventListener("transitionend",r.onSlideToWrapperTransitionEnd)),!0},slideToLoop:function(e,t,s,a){if(void 0===e&&(e=0),void 0===t&&(t=this.params.speed),void 0===s&&(s=!0),"string"==typeof e){e=parseInt(e,10)}const i=this;let r=e;return i.params.loop&&(i.virtual&&i.params.virtual.enabled?r+=i.virtual.slidesBefore:r=i.getSlideIndexByData(r)),i.slideTo(r,t,s,a)},slideNext:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{enabled:i,params:r,animating:n}=a;if(!i)return a;let l=r.slidesPerGroup;"auto"===r.slidesPerView&&1===r.slidesPerGroup&&r.slidesPerGroupAuto&&(l=Math.max(a.slidesPerViewDynamic("current",!0),1));const o=a.activeIndex<r.slidesPerGroupSkip?1:l,d=a.virtual&&r.virtual.enabled;if(r.loop){if(n&&!d&&r.loopPreventsSliding)return!1;a.loopFix({direction:"next"}),a._clientLeft=a.wrapperEl.clientLeft}return r.rewind&&a.isEnd?a.slideTo(0,e,t,s):a.slideTo(a.activeIndex+o,e,t,s)},slidePrev:function(e,t,s){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0);const a=this,{params:i,snapGrid:r,slidesGrid:n,rtlTranslate:l,enabled:o,animating:d}=a;if(!o)return a;const c=a.virtual&&i.virtual.enabled;if(i.loop){if(d&&!c&&i.loopPreventsSliding)return!1;a.loopFix({direction:"prev"}),a._clientLeft=a.wrapperEl.clientLeft}function p(e){return e<0?-Math.floor(Math.abs(e)):Math.floor(e)}const u=p(l?a.translate:-a.translate),m=r.map((e=>p(e)));let h=r[m.indexOf(u)-1];if(void 0===h&&i.cssMode){let e;r.forEach(((t,s)=>{u>=t&&(e=s)})),void 0!==e&&(h=r[e>0?e-1:e])}let f=0;if(void 0!==h&&(f=n.indexOf(h),f<0&&(f=a.activeIndex-1),"auto"===i.slidesPerView&&1===i.slidesPerGroup&&i.slidesPerGroupAuto&&(f=f-a.slidesPerViewDynamic("previous",!0)+1,f=Math.max(f,0))),i.rewind&&a.isBeginning){const i=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(i,e,t,s)}return a.slideTo(f,e,t,s)},slideReset:function(e,t,s){return void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),this.slideTo(this.activeIndex,e,t,s)},slideToClosest:function(e,t,s,a){void 0===e&&(e=this.params.speed),void 0===t&&(t=!0),void 0===a&&(a=.5);const i=this;let r=i.activeIndex;const n=Math.min(i.params.slidesPerGroupSkip,r),l=n+Math.floor((r-n)/i.params.slidesPerGroup),o=i.rtlTranslate?i.translate:-i.translate;if(o>=i.snapGrid[l]){const e=i.snapGrid[l];o-e>(i.snapGrid[l+1]-e)*a&&(r+=i.params.slidesPerGroup)}else{const e=i.snapGrid[l-1];o-e<=(i.snapGrid[l]-e)*a&&(r-=i.params.slidesPerGroup)}return r=Math.max(r,0),r=Math.min(r,i.slidesGrid.length-1),i.slideTo(r,e,t,s)},slideToClickedSlide:function(){const e=this,{params:t,slidesEl:s}=e,a="auto"===t.slidesPerView?e.slidesPerViewDynamic():t.slidesPerView;let i,r=e.clickedIndex;const l=e.isElement?"swiper-slide":`.${t.slideClass}`;if(t.loop){if(e.animating)return;i=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),t.centeredSlides?r<e.loopedSlides-a/2||r>e.slides.length-e.loopedSlides+a/2?(e.loopFix(),r=e.getSlideIndex(f(s,`${l}[data-swiper-slide-index="${i}"]`)[0]),n((()=>{e.slideTo(r)}))):e.slideTo(r):r>e.slides.length-a?(e.loopFix(),r=e.getSlideIndex(f(s,`${l}[data-swiper-slide-index="${i}"]`)[0]),n((()=>{e.slideTo(r)}))):e.slideTo(r)}else e.slideTo(r)}};var O={loopCreate:function(e){const t=this,{params:s,slidesEl:a}=t;if(!s.loop||t.virtual&&t.params.virtual.enabled)return;f(a,`.${s.slideClass}, swiper-slide`).forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t)})),t.loopFix({slideRealIndex:e,direction:s.centeredSlides?void 0:"next"})},loopFix:function(e){let{slideRealIndex:t,slideTo:s=!0,direction:a,setTranslate:i,activeSlideIndex:r,byController:n,byMousewheel:l}=void 0===e?{}:e;const o=this;if(!o.params.loop)return;o.emit("beforeLoopFix");const{slides:d,allowSlidePrev:c,allowSlideNext:p,slidesEl:u,params:m}=o;if(o.allowSlidePrev=!0,o.allowSlideNext=!0,o.virtual&&m.virtual.enabled)return s&&(m.centeredSlides||0!==o.snapIndex?m.centeredSlides&&o.snapIndex<m.slidesPerView?o.slideTo(o.virtual.slides.length+o.snapIndex,0,!1,!0):o.snapIndex===o.snapGrid.length-1&&o.slideTo(o.virtual.slidesBefore,0,!1,!0):o.slideTo(o.virtual.slides.length,0,!1,!0)),o.allowSlidePrev=c,o.allowSlideNext=p,void o.emit("loopFix");const h="auto"===m.slidesPerView?o.slidesPerViewDynamic():Math.ceil(parseFloat(m.slidesPerView,10));let f=m.loopedSlides||h;f%m.slidesPerGroup!=0&&(f+=m.slidesPerGroup-f%m.slidesPerGroup),o.loopedSlides=f;const g=[],v=[];let w=o.activeIndex;void 0===r?r=o.getSlideIndex(o.slides.filter((e=>e.classList.contains(m.slideActiveClass)))[0]):w=r;const b="next"===a||!a,y="prev"===a||!a;let E=0,x=0;if(r<f){E=Math.max(f-r,m.slidesPerGroup);for(let e=0;e<f-r;e+=1){const t=e-Math.floor(e/d.length)*d.length;g.push(d.length-t-1)}}else if(r>o.slides.length-2*f){x=Math.max(r-(o.slides.length-2*f),m.slidesPerGroup);for(let e=0;e<x;e+=1){const t=e-Math.floor(e/d.length)*d.length;v.push(t)}}if(y&&g.forEach((e=>{u.prepend(o.slides[e])})),b&&v.forEach((e=>{u.append(o.slides[e])})),o.recalcSlides(),m.watchSlidesProgress&&o.updateSlidesOffset(),s)if(g.length>0&&y)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w+E]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w+E,0,!1,!0),i&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t))}else i&&o.slideToLoop(t,0,!1,!0);else if(v.length>0&&b)if(void 0===t){const e=o.slidesGrid[w],t=o.slidesGrid[w-x]-e;l?o.setTranslate(o.translate-t):(o.slideTo(w-x,0,!1,!0),i&&(o.touches[o.isHorizontal()?"startX":"startY"]+=t))}else o.slideToLoop(t,0,!1,!0);if(o.allowSlidePrev=c,o.allowSlideNext=p,o.controller&&o.controller.control&&!n){const e={slideRealIndex:t,slideTo:!1,direction:a,setTranslate:i,activeSlideIndex:r,byController:!0};Array.isArray(o.controller.control)?o.controller.control.forEach((t=>{!t.destroyed&&t.params.loop&&t.loopFix(e)})):o.controller.control instanceof o.constructor&&o.controller.control.params.loop&&o.controller.control.loopFix(e)}o.emit("loopFix")},loopDestroy:function(){const e=this,{params:t,slidesEl:s}=e;if(!t.loop||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const a=[];e.slides.forEach((e=>{const t=void 0===e.swiperSlideIndex?1*e.getAttribute("data-swiper-slide-index"):e.swiperSlideIndex;a[t]=e})),e.slides.forEach((e=>{e.removeAttribute("data-swiper-slide-index")})),a.forEach((e=>{s.append(e)})),e.recalcSlides(),e.slideTo(e.realIndex,0)}};function D(e){const t=this,s=a(),i=r(),n=t.touchEventsData;n.evCache.push(e);const{params:o,touches:d,enabled:c}=t;if(!c)return;if(!o.simulateTouch&&"mouse"===e.pointerType)return;if(t.animating&&o.preventInteractionOnTransition)return;!t.animating&&o.cssMode&&o.loop&&t.loopFix();let p=e;p.originalEvent&&(p=p.originalEvent);let u=p.target;if("wrapper"===o.touchEventsTarget&&!t.wrapperEl.contains(u))return;if("which"in p&&3===p.which)return;if("button"in p&&p.button>0)return;if(n.isTouched&&n.isMoved)return;const m=!!o.noSwipingClass&&""!==o.noSwipingClass,h=e.composedPath?e.composedPath():e.path;m&&p.target&&p.target.shadowRoot&&h&&(u=h[0]);const f=o.noSwipingSelector?o.noSwipingSelector:`.${o.noSwipingClass}`,g=!(!p.target||!p.target.shadowRoot);if(o.noSwiping&&(g?function(e,t){return void 0===t&&(t=this),function t(s){if(!s||s===a()||s===r())return null;s.assignedSlot&&(s=s.assignedSlot);const i=s.closest(e);return i||s.getRootNode?i||t(s.getRootNode().host):null}(t)}(f,u):u.closest(f)))return void(t.allowClick=!0);if(o.swipeHandler&&!u.closest(o.swipeHandler))return;d.currentX=p.pageX,d.currentY=p.pageY;const v=d.currentX,w=d.currentY,b=o.edgeSwipeDetection||o.iOSEdgeSwipeDetection,y=o.edgeSwipeThreshold||o.iOSEdgeSwipeThreshold;if(b&&(v<=y||v>=i.innerWidth-y)){if("prevent"!==b)return;e.preventDefault()}Object.assign(n,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),d.startX=v,d.startY=w,n.touchStartTime=l(),t.allowClick=!0,t.updateSize(),t.swipeDirection=void 0,o.threshold>0&&(n.allowThresholdMove=!1);let E=!0;u.matches(n.focusableElements)&&(E=!1,"SELECT"===u.nodeName&&(n.isTouched=!1)),s.activeElement&&s.activeElement.matches(n.focusableElements)&&s.activeElement!==u&&s.activeElement.blur();const x=E&&t.allowTouchMove&&o.touchStartPreventDefault;!o.touchStartForcePreventDefault&&!x||u.isContentEditable||p.preventDefault(),t.params.freeMode&&t.params.freeMode.enabled&&t.freeMode&&t.animating&&!o.cssMode&&t.freeMode.onTouchStart(),t.emit("touchStart",p)}function G(e){const t=a(),s=this,i=s.touchEventsData,{params:r,touches:n,rtlTranslate:o,enabled:d}=s;if(!d)return;if(!r.simulateTouch&&"mouse"===e.pointerType)return;let c=e;if(c.originalEvent&&(c=c.originalEvent),!i.isTouched)return void(i.startMoving&&i.isScrolling&&s.emit("touchMoveOpposite",c));const p=i.evCache.findIndex((e=>e.pointerId===c.pointerId));p>=0&&(i.evCache[p]=c);const u=i.evCache.length>1?i.evCache[0]:c,m=u.pageX,h=u.pageY;if(c.preventedByNestedSwiper)return n.startX=m,void(n.startY=h);if(!s.allowTouchMove)return c.target.matches(i.focusableElements)||(s.allowClick=!1),void(i.isTouched&&(Object.assign(n,{startX:m,startY:h,prevX:s.touches.currentX,prevY:s.touches.currentY,currentX:m,currentY:h}),i.touchStartTime=l()));if(r.touchReleaseOnEdges&&!r.loop)if(s.isVertical()){if(h<n.startY&&s.translate<=s.maxTranslate()||h>n.startY&&s.translate>=s.minTranslate())return i.isTouched=!1,void(i.isMoved=!1)}else if(m<n.startX&&s.translate<=s.maxTranslate()||m>n.startX&&s.translate>=s.minTranslate())return;if(t.activeElement&&c.target===t.activeElement&&c.target.matches(i.focusableElements))return i.isMoved=!0,void(s.allowClick=!1);if(i.allowTouchCallbacks&&s.emit("touchMove",c),c.targetTouches&&c.targetTouches.length>1)return;n.currentX=m,n.currentY=h;const f=n.currentX-n.startX,g=n.currentY-n.startY;if(s.params.threshold&&Math.sqrt(f**2+g**2)<s.params.threshold)return;if(void 0===i.isScrolling){let e;s.isHorizontal()&&n.currentY===n.startY||s.isVertical()&&n.currentX===n.startX?i.isScrolling=!1:f*f+g*g>=25&&(e=180*Math.atan2(Math.abs(g),Math.abs(f))/Math.PI,i.isScrolling=s.isHorizontal()?e>r.touchAngle:90-e>r.touchAngle)}if(i.isScrolling&&s.emit("touchMoveOpposite",c),void 0===i.startMoving&&(n.currentX===n.startX&&n.currentY===n.startY||(i.startMoving=!0)),i.isScrolling||s.zoom&&s.params.zoom&&s.params.zoom.enabled&&i.evCache.length>1)return void(i.isTouched=!1);if(!i.startMoving)return;s.allowClick=!1,!r.cssMode&&c.cancelable&&c.preventDefault(),r.touchMoveStopPropagation&&!r.nested&&c.stopPropagation();let v=s.isHorizontal()?f:g,w=s.isHorizontal()?n.currentX-n.previousX:n.currentY-n.previousY;r.oneWayMovement&&(v=Math.abs(v)*(o?1:-1),w=Math.abs(w)*(o?1:-1)),n.diff=v,v*=r.touchRatio,o&&(v=-v,w=-w);const b=s.touchesDirection;s.swipeDirection=v>0?"prev":"next",s.touchesDirection=w>0?"prev":"next";const y=s.params.loop&&!r.cssMode;if(!i.isMoved){if(y&&s.loopFix({direction:s.swipeDirection}),i.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});s.wrapperEl.dispatchEvent(e)}i.allowMomentumBounce=!1,!r.grabCursor||!0!==s.allowSlideNext&&!0!==s.allowSlidePrev||s.setGrabCursor(!0),s.emit("sliderFirstMove",c)}let E;i.isMoved&&b!==s.touchesDirection&&y&&Math.abs(v)>=1&&(s.loopFix({direction:s.swipeDirection,setTranslate:!0}),E=!0),s.emit("sliderMove",c),i.isMoved=!0,i.currentTranslate=v+i.startTranslate;let x=!0,S=r.resistanceRatio;if(r.touchReleaseOnEdges&&(S=0),v>0?(y&&!E&&i.currentTranslate>(r.centeredSlides?s.minTranslate()-s.size/2:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),i.currentTranslate>s.minTranslate()&&(x=!1,r.resistance&&(i.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+i.startTranslate+v)**S))):v<0&&(y&&!E&&i.currentTranslate<(r.centeredSlides?s.maxTranslate()+s.size/2:s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-("auto"===r.slidesPerView?s.slidesPerViewDynamic():Math.ceil(parseFloat(r.slidesPerView,10)))}),i.currentTranslate<s.maxTranslate()&&(x=!1,r.resistance&&(i.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-i.startTranslate-v)**S))),x&&(c.preventedByNestedSwiper=!0),!s.allowSlideNext&&"next"===s.swipeDirection&&i.currentTranslate<i.startTranslate&&(i.currentTranslate=i.startTranslate),!s.allowSlidePrev&&"prev"===s.swipeDirection&&i.currentTranslate>i.startTranslate&&(i.currentTranslate=i.startTranslate),s.allowSlidePrev||s.allowSlideNext||(i.currentTranslate=i.startTranslate),r.threshold>0){if(!(Math.abs(v)>r.threshold||i.allowThresholdMove))return void(i.currentTranslate=i.startTranslate);if(!i.allowThresholdMove)return i.allowThresholdMove=!0,n.startX=n.currentX,n.startY=n.currentY,i.currentTranslate=i.startTranslate,void(n.diff=s.isHorizontal()?n.currentX-n.startX:n.currentY-n.startY)}r.followFinger&&!r.cssMode&&((r.freeMode&&r.freeMode.enabled&&s.freeMode||r.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),s.params.freeMode&&r.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(i.currentTranslate),s.setTranslate(i.currentTranslate))}function B(e){const t=this,s=t.touchEventsData,a=s.evCache.findIndex((t=>t.pointerId===e.pointerId));if(a>=0&&s.evCache.splice(a,1),["pointercancel","pointerout","pointerleave"].includes(e.type)){if(!("pointercancel"===e.type&&(t.browser.isSafari||t.browser.isWebView)))return}const{params:i,touches:r,rtlTranslate:o,slidesGrid:d,enabled:c}=t;if(!c)return;if(!i.simulateTouch&&"mouse"===e.pointerType)return;let p=e;if(p.originalEvent&&(p=p.originalEvent),s.allowTouchCallbacks&&t.emit("touchEnd",p),s.allowTouchCallbacks=!1,!s.isTouched)return s.isMoved&&i.grabCursor&&t.setGrabCursor(!1),s.isMoved=!1,void(s.startMoving=!1);i.grabCursor&&s.isMoved&&s.isTouched&&(!0===t.allowSlideNext||!0===t.allowSlidePrev)&&t.setGrabCursor(!1);const u=l(),m=u-s.touchStartTime;if(t.allowClick){const e=p.path||p.composedPath&&p.composedPath();t.updateClickedSlide(e&&e[0]||p.target),t.emit("tap click",p),m<300&&u-s.lastClickTime<300&&t.emit("doubleTap doubleClick",p)}if(s.lastClickTime=l(),n((()=>{t.destroyed||(t.allowClick=!0)})),!s.isTouched||!s.isMoved||!t.swipeDirection||0===r.diff||s.currentTranslate===s.startTranslate)return s.isTouched=!1,s.isMoved=!1,void(s.startMoving=!1);let h;if(s.isTouched=!1,s.isMoved=!1,s.startMoving=!1,h=i.followFinger?o?t.translate:-t.translate:-s.currentTranslate,i.cssMode)return;if(t.params.freeMode&&i.freeMode.enabled)return void t.freeMode.onTouchEnd({currentPos:h});let f=0,g=t.slidesSizesGrid[0];for(let e=0;e<d.length;e+=e<i.slidesPerGroupSkip?1:i.slidesPerGroup){const t=e<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;void 0!==d[e+t]?h>=d[e]&&h<d[e+t]&&(f=e,g=d[e+t]-d[e]):h>=d[e]&&(f=e,g=d[d.length-1]-d[d.length-2])}let v=null,w=null;i.rewind&&(t.isBeginning?w=t.params.virtual&&t.params.virtual.enabled&&t.virtual?t.virtual.slides.length-1:t.slides.length-1:t.isEnd&&(v=0));const b=(h-d[f])/g,y=f<i.slidesPerGroupSkip-1?1:i.slidesPerGroup;if(m>i.longSwipesMs){if(!i.longSwipes)return void t.slideTo(t.activeIndex);"next"===t.swipeDirection&&(b>=i.longSwipesRatio?t.slideTo(i.rewind&&t.isEnd?v:f+y):t.slideTo(f)),"prev"===t.swipeDirection&&(b>1-i.longSwipesRatio?t.slideTo(f+y):null!==w&&b<0&&Math.abs(b)>i.longSwipesRatio?t.slideTo(w):t.slideTo(f))}else{if(!i.shortSwipes)return void t.slideTo(t.activeIndex);t.navigation&&(p.target===t.navigation.nextEl||p.target===t.navigation.prevEl)?p.target===t.navigation.nextEl?t.slideTo(f+y):t.slideTo(f):("next"===t.swipeDirection&&t.slideTo(null!==v?v:f+y),"prev"===t.swipeDirection&&t.slideTo(null!==w?w:f))}}let H;function X(){const e=this,{params:t,el:s}=e;if(s&&0===s.offsetWidth)return;t.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:i,snapGrid:r}=e,n=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const l=n&&t.loop;!("auto"===t.slidesPerView||t.slidesPerView>1)||!e.isEnd||e.isBeginning||e.params.centeredSlides||l?e.params.loop&&!n?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0):e.slideTo(e.slides.length-1,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(H),H=setTimeout((()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()}),500)),e.allowSlidePrev=i,e.allowSlideNext=a,e.params.watchOverflow&&r!==e.snapGrid&&e.checkOverflow()}function Y(e){const t=this;t.enabled&&(t.allowClick||(t.params.preventClicks&&e.preventDefault(),t.params.preventClicksPropagation&&t.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function q(){const e=this,{wrapperEl:t,rtlTranslate:s,enabled:a}=e;if(!a)return;let i;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-t.scrollLeft:e.translate=-t.scrollTop,0===e.translate&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();const r=e.maxTranslate()-e.minTranslate();i=0===r?0:(e.translate-e.minTranslate())/r,i!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}const N=(e,t)=>{if(!e||e.destroyed||!e.params)return;const s=t.closest(e.isElement?"swiper-slide":`.${e.params.slideClass}`);if(s){const t=s.querySelector(`.${e.params.lazyPreloaderClass}`);t&&t.remove()}};function R(e){N(this,e.target),this.update()}let _=!1;function F(){}const V=(e,t)=>{const s=a(),{params:i,el:r,wrapperEl:n,device:l}=e,o=!!i.nested,d="on"===t?"addEventListener":"removeEventListener",c=t;r[d]("pointerdown",e.onTouchStart,{passive:!1}),s[d]("pointermove",e.onTouchMove,{passive:!1,capture:o}),s[d]("pointerup",e.onTouchEnd,{passive:!0}),s[d]("pointercancel",e.onTouchEnd,{passive:!0}),s[d]("pointerout",e.onTouchEnd,{passive:!0}),s[d]("pointerleave",e.onTouchEnd,{passive:!0}),(i.preventClicks||i.preventClicksPropagation)&&r[d]("click",e.onClick,!0),i.cssMode&&n[d]("scroll",e.onScroll),i.updateOnWindowResize?e[c](l.ios||l.android?"resize orientationchange observerUpdate":"resize observerUpdate",X,!0):e[c]("observerUpdate",X,!0),r[d]("load",e.onLoad,{capture:!0})};const W=(e,t)=>e.grid&&t.grid&&t.grid.rows>1;var j={init:!0,direction:"horizontal",oneWayMovement:!1,touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopedSlides:null,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",runCallbacksOnInit:!0,_emitClasses:!1};function U(e,t){return function(s){void 0===s&&(s={});const a=Object.keys(s)[0],i=s[a];"object"==typeof i&&null!==i?(["navigation","pagination","scrollbar"].indexOf(a)>=0&&!0===e[a]&&(e[a]={auto:!0}),a in e&&"enabled"in i?(!0===e[a]&&(e[a]={enabled:!0}),"object"!=typeof e[a]||"enabled"in e[a]||(e[a].enabled=!0),e[a]||(e[a]={enabled:!1}),p(t,s)):p(t,s)):p(t,s)}}const K={eventsEmitter:A,update:z,translate:$,transition:{setTransition:function(e,t){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`),s.emit("setTransition",e,t)},transitionStart:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),k({swiper:s,runCallbacks:e,direction:t,step:"Start"}))},transitionEnd:function(e,t){void 0===e&&(e=!0);const s=this,{params:a}=s;s.animating=!1,a.cssMode||(s.setTransition(0),k({swiper:s,runCallbacks:e,direction:t,step:"End"}))}},slide:I,loop:O,grabCursor:{setGrabCursor:function(e){const t=this;if(!t.params.simulateTouch||t.params.watchOverflow&&t.isLocked||t.params.cssMode)return;const s="container"===t.params.touchEventsTarget?t.el:t.wrapperEl;t.isElement&&(t.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",t.isElement&&requestAnimationFrame((()=>{t.__preventObserver__=!1}))},unsetGrabCursor:function(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e["container"===e.params.touchEventsTarget?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame((()=>{e.__preventObserver__=!1})))}},events:{attachEvents:function(){const e=this,t=a(),{params:s}=e;e.onTouchStart=D.bind(e),e.onTouchMove=G.bind(e),e.onTouchEnd=B.bind(e),s.cssMode&&(e.onScroll=q.bind(e)),e.onClick=Y.bind(e),e.onLoad=R.bind(e),_||(t.addEventListener("touchstart",F),_=!0),V(e,"on")},detachEvents:function(){V(this,"off")}},breakpoints:{setBreakpoint:function(){const e=this,{realIndex:t,initialized:s,params:a,el:i}=e,r=a.breakpoints;if(!r||r&&0===Object.keys(r).length)return;const n=e.getBreakpoint(r,e.params.breakpointsBase,e.el);if(!n||e.currentBreakpoint===n)return;const l=(n in r?r[n]:void 0)||e.originalParams,o=W(e,a),d=W(e,l),c=a.enabled;o&&!d?(i.classList.remove(`${a.containerModifierClass}grid`,`${a.containerModifierClass}grid-column`),e.emitContainerClasses()):!o&&d&&(i.classList.add(`${a.containerModifierClass}grid`),(l.grid.fill&&"column"===l.grid.fill||!l.grid.fill&&"column"===a.grid.fill)&&i.classList.add(`${a.containerModifierClass}grid-column`),e.emitContainerClasses()),["navigation","pagination","scrollbar"].forEach((t=>{const s=a[t]&&a[t].enabled,i=l[t]&&l[t].enabled;s&&!i&&e[t].disable(),!s&&i&&e[t].enable()}));const u=l.direction&&l.direction!==a.direction,m=a.loop&&(l.slidesPerView!==a.slidesPerView||u);u&&s&&e.changeDirection(),p(e.params,l);const h=e.params.enabled;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),c&&!h?e.disable():!c&&h&&e.enable(),e.currentBreakpoint=n,e.emit("_beforeBreakpoint",l),m&&s&&(e.loopDestroy(),e.loopCreate(t),e.updateSlides()),e.emit("breakpoint",l)},getBreakpoint:function(e,t,s){if(void 0===t&&(t="window"),!e||"container"===t&&!s)return;let a=!1;const i=r(),n="window"===t?i.innerHeight:s.clientHeight,l=Object.keys(e).map((e=>{if("string"==typeof e&&0===e.indexOf("@")){const t=parseFloat(e.substr(1));return{value:n*t,point:e}}return{value:e,point:e}}));l.sort(((e,t)=>parseInt(e.value,10)-parseInt(t.value,10)));for(let e=0;e<l.length;e+=1){const{point:r,value:n}=l[e];"window"===t?i.matchMedia(`(min-width: ${n}px)`).matches&&(a=r):n<=s.clientWidth&&(a=r)}return a||"max"}},checkOverflow:{checkOverflow:function(){const e=this,{isLocked:t,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const t=e.slides.length-1,s=e.slidesGrid[t]+e.slidesSizesGrid[t]+2*a;e.isLocked=e.size>s}else e.isLocked=1===e.snapGrid.length;!0===s.allowSlideNext&&(e.allowSlideNext=!e.isLocked),!0===s.allowSlidePrev&&(e.allowSlidePrev=!e.isLocked),t&&t!==e.isLocked&&(e.isEnd=!1),t!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}},classes:{addClasses:function(){const e=this,{classNames:t,params:s,rtl:a,el:i,device:r}=e,n=function(e,t){const s=[];return e.forEach((e=>{"object"==typeof e?Object.keys(e).forEach((a=>{e[a]&&s.push(t+a)})):"string"==typeof e&&s.push(t+e)})),s}(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&"column"===s.grid.fill},{android:r.android},{ios:r.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);t.push(...n),i.classList.add(...t),e.emitContainerClasses()},removeClasses:function(){const{el:e,classNames:t}=this;e.classList.remove(...t),this.emitContainerClasses()}}},Z={};class Q{constructor(){let e,t;for(var s=arguments.length,i=new Array(s),r=0;r<s;r++)i[r]=arguments[r];1===i.length&&i[0].constructor&&"Object"===Object.prototype.toString.call(i[0]).slice(8,-1)?t=i[0]:[e,t]=i,t||(t={}),t=p({},t),e&&!t.el&&(t.el=e);const n=a();if(t.el&&"string"==typeof t.el&&n.querySelectorAll(t.el).length>1){const e=[];return n.querySelectorAll(t.el).forEach((s=>{const a=p({},t,{el:s});e.push(new Q(a))})),e}const o=this;o.__swiper__=!0,o.support=C(),o.device=P({userAgent:t.userAgent}),o.browser=L(),o.eventsListeners={},o.eventsAnyListeners=[],o.modules=[...o.__modules__],t.modules&&Array.isArray(t.modules)&&o.modules.push(...t.modules);const d={};o.modules.forEach((e=>{e({params:t,swiper:o,extendParams:U(t,d),on:o.on.bind(o),once:o.once.bind(o),off:o.off.bind(o),emit:o.emit.bind(o)})}));const c=p({},j,d);return o.params=p({},c,Z,t),o.originalParams=p({},o.params),o.passedParams=p({},t),o.params&&o.params.on&&Object.keys(o.params.on).forEach((e=>{o.on(e,o.params.on[e])})),o.params&&o.params.onAny&&o.onAny(o.params.onAny),Object.assign(o,{enabled:o.params.enabled,el:e,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal:()=>"horizontal"===o.params.direction,isVertical:()=>"vertical"===o.params.direction,activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,allowSlideNext:o.params.allowSlideNext,allowSlidePrev:o.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:o.params.focusableElements,lastClickTime:l(),clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,evCache:[]},allowClick:!0,allowTouchMove:o.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),o.emit("_swiper"),o.params.init&&o.init(),o}getSlideIndex(e){const{slidesEl:t,params:s}=this,a=b(f(t,`.${s.slideClass}, swiper-slide`)[0]);return b(e)-a}getSlideIndexByData(e){return this.getSlideIndex(this.slides.filter((t=>1*t.getAttribute("data-swiper-slide-index")===e))[0])}recalcSlides(){const{slidesEl:e,params:t}=this;this.slides=f(e,`.${t.slideClass}, swiper-slide`)}enable(){const e=this;e.enabled||(e.enabled=!0,e.params.grabCursor&&e.setGrabCursor(),e.emit("enable"))}disable(){const e=this;e.enabled&&(e.enabled=!1,e.params.grabCursor&&e.unsetGrabCursor(),e.emit("disable"))}setProgress(e,t){const s=this;e=Math.min(Math.max(e,0),1);const a=s.minTranslate(),i=(s.maxTranslate()-a)*e+a;s.translateTo(i,void 0===t?0:t),s.updateActiveIndex(),s.updateSlidesClasses()}emitContainerClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=e.el.className.split(" ").filter((t=>0===t.indexOf("swiper")||0===t.indexOf(e.params.containerModifierClass)));e.emit("_containerClasses",t.join(" "))}getSlideClasses(e){const t=this;return t.destroyed?"":e.className.split(" ").filter((e=>0===e.indexOf("swiper-slide")||0===e.indexOf(t.params.slideClass))).join(" ")}emitSlidesClasses(){const e=this;if(!e.params._emitClasses||!e.el)return;const t=[];e.slides.forEach((s=>{const a=e.getSlideClasses(s);t.push({slideEl:s,classNames:a}),e.emit("_slideClass",s,a)})),e.emit("_slideClasses",t)}slidesPerViewDynamic(e,t){void 0===e&&(e="current"),void 0===t&&(t=!1);const{params:s,slides:a,slidesGrid:i,slidesSizesGrid:r,size:n,activeIndex:l}=this;let o=1;if(s.centeredSlides){let e,t=a[l].swiperSlideSize;for(let s=l+1;s<a.length;s+=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0));for(let s=l-1;s>=0;s-=1)a[s]&&!e&&(t+=a[s].swiperSlideSize,o+=1,t>n&&(e=!0))}else if("current"===e)for(let e=l+1;e<a.length;e+=1){(t?i[e]+r[e]-i[l]<n:i[e]-i[l]<n)&&(o+=1)}else for(let e=l-1;e>=0;e-=1){i[l]-i[e]<n&&(o+=1)}return o}update(){const e=this;if(!e||e.destroyed)return;const{snapGrid:t,params:s}=e;function a(){const t=e.rtlTranslate?-1*e.translate:e.translate,s=Math.min(Math.max(t,e.maxTranslate()),e.minTranslate());e.setTranslate(s),e.updateActiveIndex(),e.updateSlidesClasses()}let i;s.breakpoints&&e.setBreakpoint(),[...e.el.querySelectorAll('[loading="lazy"]')].forEach((t=>{t.complete&&N(e,t)})),e.updateSize(),e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.params.freeMode&&e.params.freeMode.enabled?(a(),e.params.autoHeight&&e.updateAutoHeight()):(i=("auto"===e.params.slidesPerView||e.params.slidesPerView>1)&&e.isEnd&&!e.params.centeredSlides?e.slideTo(e.slides.length-1,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),i||a()),s.watchOverflow&&t!==e.snapGrid&&e.checkOverflow(),e.emit("update")}changeDirection(e,t){void 0===t&&(t=!0);const s=this,a=s.params.direction;return e||(e="horizontal"===a?"vertical":"horizontal"),e===a||"horizontal"!==e&&"vertical"!==e||(s.el.classList.remove(`${s.params.containerModifierClass}${a}`),s.el.classList.add(`${s.params.containerModifierClass}${e}`),s.emitContainerClasses(),s.params.direction=e,s.slides.forEach((t=>{"vertical"===e?t.style.width="":t.style.height=""})),s.emit("changeDirection"),t&&s.update()),s}changeLanguageDirection(e){const t=this;t.rtl&&"rtl"===e||!t.rtl&&"ltr"===e||(t.rtl="rtl"===e,t.rtlTranslate="horizontal"===t.params.direction&&t.rtl,t.rtl?(t.el.classList.add(`${t.params.containerModifierClass}rtl`),t.el.dir="rtl"):(t.el.classList.remove(`${t.params.containerModifierClass}rtl`),t.el.dir="ltr"),t.update())}mount(e){const t=this;if(t.mounted)return!0;let s=e||t.params.el;if("string"==typeof s&&(s=document.querySelector(s)),!s)return!1;s.swiper=t,s.shadowEl&&(t.isElement=!0);const a=()=>`.${(t.params.wrapperClass||"").trim().split(" ").join(".")}`;let i=(()=>{if(s&&s.shadowRoot&&s.shadowRoot.querySelector){return s.shadowRoot.querySelector(a())}return f(s,a())[0]})();return!i&&t.params.createElements&&(i=g("div",t.params.wrapperClass),s.append(i),f(s,`.${t.params.slideClass}`).forEach((e=>{i.append(e)}))),Object.assign(t,{el:s,wrapperEl:i,slidesEl:t.isElement?s:i,mounted:!0,rtl:"rtl"===s.dir.toLowerCase()||"rtl"===w(s,"direction"),rtlTranslate:"horizontal"===t.params.direction&&("rtl"===s.dir.toLowerCase()||"rtl"===w(s,"direction")),wrongRTL:"-webkit-box"===w(i,"display")}),!0}init(e){const t=this;if(t.initialized)return t;return!1===t.mount(e)||(t.emit("beforeInit"),t.params.breakpoints&&t.setBreakpoint(),t.addClasses(),t.updateSize(),t.updateSlides(),t.params.watchOverflow&&t.checkOverflow(),t.params.grabCursor&&t.enabled&&t.setGrabCursor(),t.params.loop&&t.virtual&&t.params.virtual.enabled?t.slideTo(t.params.initialSlide+t.virtual.slidesBefore,0,t.params.runCallbacksOnInit,!1,!0):t.slideTo(t.params.initialSlide,0,t.params.runCallbacksOnInit,!1,!0),t.params.loop&&t.loopCreate(),t.attachEvents(),[...t.el.querySelectorAll('[loading="lazy"]')].forEach((e=>{e.complete?N(t,e):e.addEventListener("load",(e=>{N(t,e.target)}))})),t.initialized=!0,t.emit("init"),t.emit("afterInit")),t}destroy(e,t){void 0===e&&(e=!0),void 0===t&&(t=!0);const s=this,{params:a,el:i,wrapperEl:r,slides:n}=s;return void 0===s.params||s.destroyed||(s.emit("beforeDestroy"),s.initialized=!1,s.detachEvents(),a.loop&&s.loopDestroy(),t&&(s.removeClasses(),i.removeAttribute("style"),r.removeAttribute("style"),n&&n.length&&n.forEach((e=>{e.classList.remove(a.slideVisibleClass,a.slideActiveClass,a.slideNextClass,a.slidePrevClass),e.removeAttribute("style"),e.removeAttribute("data-swiper-slide-index")}))),s.emit("destroy"),Object.keys(s.eventsListeners).forEach((e=>{s.off(e)})),!1!==e&&(s.el.swiper=null,function(e){const t=e;Object.keys(t).forEach((e=>{try{t[e]=null}catch(e){}try{delete t[e]}catch(e){}}))}(s)),s.destroyed=!0),null}static extendDefaults(e){p(Z,e)}static get extendedDefaults(){return Z}static get defaults(){return j}static installModule(e){Q.prototype.__modules__||(Q.prototype.__modules__=[]);const t=Q.prototype.__modules__;"function"==typeof e&&t.indexOf(e)<0&&t.push(e)}static use(e){return Array.isArray(e)?(e.forEach((e=>Q.installModule(e))),Q):(Q.installModule(e),Q)}}function J(e,t,s,a){return e.params.createElements&&Object.keys(a).forEach((i=>{if(!s[i]&&!0===s.auto){let r=f(e.el,`.${a[i]}`)[0];r||(r=g("div",a[i]),r.className=a[i],e.el.append(r)),s[i]=r,t[i]=r}})),s}function ee(e){return void 0===e&&(e=""),`.${e.trim().replace(/([\.:!+\/])/g,"\\$1").replace(/ /g,".")}`}function te(e){const t=this,{params:s,slidesEl:a}=t;s.loop&&t.loopDestroy();const i=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,a.append(t.children[0]),t.innerHTML=""}else a.append(e)};if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&i(e[t]);else i(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update()}function se(e){const t=this,{params:s,activeIndex:a,slidesEl:i}=t;s.loop&&t.loopDestroy();let r=a+1;const n=e=>{if("string"==typeof e){const t=document.createElement("div");t.innerHTML=e,i.prepend(t.children[0]),t.innerHTML=""}else i.prepend(e)};if("object"==typeof e&&"length"in e){for(let t=0;t<e.length;t+=1)e[t]&&n(e[t]);r=a+e.length}else n(e);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),t.slideTo(r,0,!1)}function ae(e,t){const s=this,{params:a,activeIndex:i,slidesEl:r}=s;let n=i;a.loop&&(n-=s.loopedSlides,s.loopDestroy(),s.recalcSlides());const l=s.slides.length;if(e<=0)return void s.prependSlide(t);if(e>=l)return void s.appendSlide(t);let o=n>e?n+1:n;const d=[];for(let t=l-1;t>=e;t-=1){const e=s.slides[t];e.remove(),d.unshift(e)}if("object"==typeof t&&"length"in t){for(let e=0;e<t.length;e+=1)t[e]&&r.append(t[e]);o=n>e?n+t.length:n}else r.append(t);for(let e=0;e<d.length;e+=1)r.append(d[e]);s.recalcSlides(),a.loop&&s.loopCreate(),a.observer&&!s.isElement||s.update(),a.loop?s.slideTo(o+s.loopedSlides,0,!1):s.slideTo(o,0,!1)}function ie(e){const t=this,{params:s,activeIndex:a}=t;let i=a;s.loop&&(i-=t.loopedSlides,t.loopDestroy());let r,n=i;if("object"==typeof e&&"length"in e){for(let s=0;s<e.length;s+=1)r=e[s],t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1);n=Math.max(n,0)}else r=e,t.slides[r]&&t.slides[r].remove(),r<n&&(n-=1),n=Math.max(n,0);t.recalcSlides(),s.loop&&t.loopCreate(),s.observer&&!t.isElement||t.update(),s.loop?t.slideTo(n+t.loopedSlides,0,!1):t.slideTo(n,0,!1)}function re(){const e=this,t=[];for(let s=0;s<e.slides.length;s+=1)t.push(s);e.removeSlide(t)}function ne(e){const{effect:t,swiper:s,on:a,setTranslate:i,setTransition:r,overwriteParams:n,perspective:l,recreateShadows:o,getEffectParams:d}=e;let c;a("beforeInit",(()=>{if(s.params.effect!==t)return;s.classNames.push(`${s.params.containerModifierClass}${t}`),l&&l()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const e=n?n():{};Object.assign(s.params,e),Object.assign(s.originalParams,e)})),a("setTranslate",(()=>{s.params.effect===t&&i()})),a("setTransition",((e,a)=>{s.params.effect===t&&r(a)})),a("transitionEnd",(()=>{if(s.params.effect===t&&o){if(!d||!d().slideShadows)return;s.slides.forEach((e=>{e.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((e=>e.remove()))})),o()}})),a("virtualUpdate",(()=>{s.params.effect===t&&(s.slides.length||(c=!0),requestAnimationFrame((()=>{c&&s.slides&&s.slides.length&&(i(),c=!1)})))}))}function le(e,t){const s=h(t);return s!==t&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s}function oe(e){let{swiper:t,duration:s,transformElements:a,allSlides:i}=e;const{activeIndex:r}=t;if(t.params.virtualTranslate&&0!==s){let e,s=!1;e=i?a:a.filter((e=>{const s=e.classList.contains("swiper-slide-transform")?(e=>{if(!e.parentElement)return t.slides.filter((t=>t.shadowEl&&t.shadowEl===e.parentNode))[0];return e.parentElement})(e):e;return t.getSlideIndex(s)===r})),e.forEach((e=>{E(e,(()=>{if(s)return;if(!t||t.destroyed)return;s=!0,t.animating=!1;const e=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});t.wrapperEl.dispatchEvent(e)}))}))}}function de(e,t,s){const a="swiper-slide-shadow"+(s?`-${s}`:""),i=h(t);let r=i.querySelector(`.${a}`);return r||(r=g("div","swiper-slide-shadow"+(s?`-${s}`:"")),i.append(r)),r}Object.keys(K).forEach((e=>{Object.keys(K[e]).forEach((t=>{Q.prototype[t]=K[e][t]}))})),Q.use([function(e){let{swiper:t,on:s,emit:a}=e;const i=r();let n=null,l=null;const o=()=>{t&&!t.destroyed&&t.initialized&&(a("beforeResize"),a("resize"))},d=()=>{t&&!t.destroyed&&t.initialized&&a("orientationchange")};s("init",(()=>{t.params.resizeObserver&&void 0!==i.ResizeObserver?t&&!t.destroyed&&t.initialized&&(n=new ResizeObserver((e=>{l=i.requestAnimationFrame((()=>{const{width:s,height:a}=t;let i=s,r=a;e.forEach((e=>{let{contentBoxSize:s,contentRect:a,target:n}=e;n&&n!==t.el||(i=a?a.width:(s[0]||s).inlineSize,r=a?a.height:(s[0]||s).blockSize)})),i===s&&r===a||o()}))})),n.observe(t.el)):(i.addEventListener("resize",o),i.addEventListener("orientationchange",d))})),s("destroy",(()=>{l&&i.cancelAnimationFrame(l),n&&n.unobserve&&t.el&&(n.unobserve(t.el),n=null),i.removeEventListener("resize",o),i.removeEventListener("orientationchange",d)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=[],l=r(),o=function(e,s){void 0===s&&(s={});const a=new(l.MutationObserver||l.WebkitMutationObserver)((e=>{if(t.__preventObserver__)return;if(1===e.length)return void i("observerUpdate",e[0]);const s=function(){i("observerUpdate",e[0])};l.requestAnimationFrame?l.requestAnimationFrame(s):l.setTimeout(s,0)}));a.observe(e,{attributes:void 0===s.attributes||s.attributes,childList:void 0===s.childList||s.childList,characterData:void 0===s.characterData||s.characterData}),n.push(a)};s({observer:!1,observeParents:!1,observeSlideChildren:!1}),a("init",(()=>{if(t.params.observer){if(t.params.observeParents){const e=y(t.el);for(let t=0;t<e.length;t+=1)o(e[t])}o(t.el,{childList:t.params.observeSlideChildren}),o(t.wrapperEl,{attributes:!1})}})),a("destroy",(()=>{n.forEach((e=>{e.disconnect()})),n.splice(0,n.length)}))}]);const ce=[function(e){let t,{swiper:s,extendParams:i,on:r,emit:n}=e;i({virtual:{enabled:!1,slides:[],cache:!0,renderSlide:null,renderExternal:null,renderExternalUpdate:!0,addSlidesBefore:0,addSlidesAfter:0}});const l=a();s.virtual={cache:{},from:void 0,to:void 0,slides:[],offset:0,slidesGrid:[]};const o=l.createElement("div");function d(e,t){const a=s.params.virtual;if(a.cache&&s.virtual.cache[t])return s.virtual.cache[t];let i;return a.renderSlide?(i=a.renderSlide.call(s,e,t),"string"==typeof i&&(o.innerHTML=i,i=o.children[0])):i=s.isElement?g("swiper-slide"):g("div",s.params.slideClass),i.setAttribute("data-swiper-slide-index",t),a.renderSlide||(i.innerHTML=e),a.cache&&(s.virtual.cache[t]=i),i}function c(e){const{slidesPerView:t,slidesPerGroup:a,centeredSlides:i,loop:r}=s.params,{addSlidesBefore:l,addSlidesAfter:o}=s.params.virtual,{from:c,to:p,slides:u,slidesGrid:m,offset:h}=s.virtual;s.params.cssMode||s.updateActiveIndex();const g=s.activeIndex||0;let v,w,b;v=s.rtlTranslate?"right":s.isHorizontal()?"left":"top",i?(w=Math.floor(t/2)+a+o,b=Math.floor(t/2)+a+l):(w=t+(a-1)+o,b=(r?t:a)+l);let y=g-b,E=g+w;r||(y=Math.max(y,0),E=Math.min(E,u.length-1));let x=(s.slidesGrid[y]||0)-(s.slidesGrid[0]||0);function S(){s.updateSlides(),s.updateProgress(),s.updateSlidesClasses(),n("virtualUpdate")}if(r&&g>=b?(y-=b,i||(x+=s.slidesGrid[0])):r&&g<b&&(y=-b,i&&(x+=s.slidesGrid[0])),Object.assign(s.virtual,{from:y,to:E,offset:x,slidesGrid:s.slidesGrid,slidesBefore:b,slidesAfter:w}),c===y&&p===E&&!e)return s.slidesGrid!==m&&x!==h&&s.slides.forEach((e=>{e.style[v]=`${x}px`})),s.updateProgress(),void n("virtualUpdate");if(s.params.virtual.renderExternal)return s.params.virtual.renderExternal.call(s,{offset:x,from:y,to:E,slides:function(){const e=[];for(let t=y;t<=E;t+=1)e.push(u[t]);return e}()}),void(s.params.virtual.renderExternalUpdate?S():n("virtualUpdate"));const T=[],M=[],C=e=>{let t=e;return e<0?t=u.length+e:t>=u.length&&(t-=u.length),t};if(e)s.slidesEl.querySelectorAll(`.${s.params.slideClass}, swiper-slide`).forEach((e=>{e.remove()}));else for(let e=c;e<=p;e+=1)if(e<y||e>E){const t=C(e);s.slidesEl.querySelectorAll(`.${s.params.slideClass}[data-swiper-slide-index="${t}"], swiper-slide[data-swiper-slide-index="${t}"]`).forEach((e=>{e.remove()}))}const P=r?-u.length:0,L=r?2*u.length:u.length;for(let t=P;t<L;t+=1)if(t>=y&&t<=E){const s=C(t);void 0===p||e?M.push(s):(t>p&&M.push(s),t<c&&T.push(s))}if(M.forEach((e=>{s.slidesEl.append(d(u[e],e))})),r)for(let e=T.length-1;e>=0;e-=1){const t=T[e];s.slidesEl.prepend(d(u[t],t))}else T.sort(((e,t)=>t-e)),T.forEach((e=>{s.slidesEl.prepend(d(u[e],e))}));f(s.slidesEl,".swiper-slide, swiper-slide").forEach((e=>{e.style[v]=`${x}px`})),S()}r("beforeInit",(()=>{if(!s.params.virtual.enabled)return;let e;if(void 0===s.passedParams.virtual.slides){const t=[...s.slidesEl.children].filter((e=>e.matches(`.${s.params.slideClass}, swiper-slide`)));t&&t.length&&(s.virtual.slides=[...t],e=!0,t.forEach(((e,t)=>{e.setAttribute("data-swiper-slide-index",t),s.virtual.cache[t]=e,e.remove()})))}e||(s.virtual.slides=s.params.virtual.slides),s.classNames.push(`${s.params.containerModifierClass}virtual`),s.params.watchSlidesProgress=!0,s.originalParams.watchSlidesProgress=!0,s.params.initialSlide||c()})),r("setTranslate",(()=>{s.params.virtual.enabled&&(s.params.cssMode&&!s._immediateVirtual?(clearTimeout(t),t=setTimeout((()=>{c()}),100)):c())})),r("init update resize",(()=>{s.params.virtual.enabled&&s.params.cssMode&&u(s.wrapperEl,"--swiper-virtual-size",`${s.virtualSize}px`)})),Object.assign(s.virtual,{appendSlide:function(e){if("object"==typeof e&&"length"in e)for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.push(e[t]);else s.virtual.slides.push(e);c(!0)},prependSlide:function(e){const t=s.activeIndex;let a=t+1,i=1;if(Array.isArray(e)){for(let t=0;t<e.length;t+=1)e[t]&&s.virtual.slides.unshift(e[t]);a=t+e.length,i=e.length}else s.virtual.slides.unshift(e);if(s.params.virtual.cache){const e=s.virtual.cache,t={};Object.keys(e).forEach((s=>{const a=e[s],r=a.getAttribute("data-swiper-slide-index");r&&a.setAttribute("data-swiper-slide-index",parseInt(r,10)+i),t[parseInt(s,10)+i]=a})),s.virtual.cache=t}c(!0),s.slideTo(a,0)},removeSlide:function(e){if(null==e)return;let t=s.activeIndex;if(Array.isArray(e))for(let a=e.length-1;a>=0;a-=1)s.virtual.slides.splice(e[a],1),s.params.virtual.cache&&delete s.virtual.cache[e[a]],e[a]<t&&(t-=1),t=Math.max(t,0);else s.virtual.slides.splice(e,1),s.params.virtual.cache&&delete s.virtual.cache[e],e<t&&(t-=1),t=Math.max(t,0);c(!0),s.slideTo(t,0)},removeAllSlides:function(){s.virtual.slides=[],s.params.virtual.cache&&(s.virtual.cache={}),c(!0),s.slideTo(0,0)},update:c})},function(e){let{swiper:t,extendParams:s,on:i,emit:n}=e;const l=a(),o=r();function d(e){if(!t.enabled)return;const{rtlTranslate:s}=t;let a=e;a.originalEvent&&(a=a.originalEvent);const i=a.keyCode||a.charCode,r=t.params.keyboard.pageUpDown,d=r&&33===i,c=r&&34===i,p=37===i,u=39===i,m=38===i,h=40===i;if(!t.allowSlideNext&&(t.isHorizontal()&&u||t.isVertical()&&h||c))return!1;if(!t.allowSlidePrev&&(t.isHorizontal()&&p||t.isVertical()&&m||d))return!1;if(!(a.shiftKey||a.altKey||a.ctrlKey||a.metaKey||l.activeElement&&l.activeElement.nodeName&&("input"===l.activeElement.nodeName.toLowerCase()||"textarea"===l.activeElement.nodeName.toLowerCase()))){if(t.params.keyboard.onlyInViewport&&(d||c||p||u||m||h)){let e=!1;if(y(t.el,`.${t.params.slideClass}, swiper-slide`).length>0&&0===y(t.el,`.${t.params.slideActiveClass}`).length)return;const a=t.el,i=a.clientWidth,r=a.clientHeight,n=o.innerWidth,l=o.innerHeight,d=v(a);s&&(d.left-=a.scrollLeft);const c=[[d.left,d.top],[d.left+i,d.top],[d.left,d.top+r],[d.left+i,d.top+r]];for(let t=0;t<c.length;t+=1){const s=c[t];if(s[0]>=0&&s[0]<=n&&s[1]>=0&&s[1]<=l){if(0===s[0]&&0===s[1])continue;e=!0}}if(!e)return}t.isHorizontal()?((d||c||p||u)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),((c||u)&&!s||(d||p)&&s)&&t.slideNext(),((d||p)&&!s||(c||u)&&s)&&t.slidePrev()):((d||c||m||h)&&(a.preventDefault?a.preventDefault():a.returnValue=!1),(c||h)&&t.slideNext(),(d||m)&&t.slidePrev()),n("keyPress",i)}}function c(){t.keyboard.enabled||(l.addEventListener("keydown",d),t.keyboard.enabled=!0)}function p(){t.keyboard.enabled&&(l.removeEventListener("keydown",d),t.keyboard.enabled=!1)}t.keyboard={enabled:!1},s({keyboard:{enabled:!1,onlyInViewport:!0,pageUpDown:!0}}),i("init",(()=>{t.params.keyboard.enabled&&c()})),i("destroy",(()=>{t.keyboard.enabled&&p()})),Object.assign(t.keyboard,{enable:c,disable:p})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const o=r();let d;s({mousewheel:{enabled:!1,releaseOnEdges:!1,invert:!1,forceToAxis:!1,sensitivity:1,eventsTarget:"container",thresholdDelta:null,thresholdTime:null}}),t.mousewheel={enabled:!1};let c,p=l();const u=[];function m(){t.enabled&&(t.mouseEntered=!0)}function h(){t.enabled&&(t.mouseEntered=!1)}function f(e){return!(t.params.mousewheel.thresholdDelta&&e.delta<t.params.mousewheel.thresholdDelta)&&(!(t.params.mousewheel.thresholdTime&&l()-p<t.params.mousewheel.thresholdTime)&&(e.delta>=6&&l()-p<60||(e.direction<0?t.isEnd&&!t.params.loop||t.animating||(t.slideNext(),i("scroll",e.raw)):t.isBeginning&&!t.params.loop||t.animating||(t.slidePrev(),i("scroll",e.raw)),p=(new o.Date).getTime(),!1)))}function g(e){let s=e,a=!0;if(!t.enabled)return;const r=t.params.mousewheel;t.params.cssMode&&s.preventDefault();let o=t.el;"container"!==t.params.mousewheel.eventsTarget&&(o=document.querySelector(t.params.mousewheel.eventsTarget));const p=o&&o.contains(s.target);if(!t.mouseEntered&&!p&&!r.releaseOnEdges)return!0;s.originalEvent&&(s=s.originalEvent);let m=0;const h=t.rtlTranslate?-1:1,g=function(e){let t=0,s=0,a=0,i=0;return"detail"in e&&(s=e.detail),"wheelDelta"in e&&(s=-e.wheelDelta/120),"wheelDeltaY"in e&&(s=-e.wheelDeltaY/120),"wheelDeltaX"in e&&(t=-e.wheelDeltaX/120),"axis"in e&&e.axis===e.HORIZONTAL_AXIS&&(t=s,s=0),a=10*t,i=10*s,"deltaY"in e&&(i=e.deltaY),"deltaX"in e&&(a=e.deltaX),e.shiftKey&&!a&&(a=i,i=0),(a||i)&&e.deltaMode&&(1===e.deltaMode?(a*=40,i*=40):(a*=800,i*=800)),a&&!t&&(t=a<1?-1:1),i&&!s&&(s=i<1?-1:1),{spinX:t,spinY:s,pixelX:a,pixelY:i}}(s);if(r.forceToAxis)if(t.isHorizontal()){if(!(Math.abs(g.pixelX)>Math.abs(g.pixelY)))return!0;m=-g.pixelX*h}else{if(!(Math.abs(g.pixelY)>Math.abs(g.pixelX)))return!0;m=-g.pixelY}else m=Math.abs(g.pixelX)>Math.abs(g.pixelY)?-g.pixelX*h:-g.pixelY;if(0===m)return!0;r.invert&&(m=-m);let v=t.getTranslate()+m*r.sensitivity;if(v>=t.minTranslate()&&(v=t.minTranslate()),v<=t.maxTranslate()&&(v=t.maxTranslate()),a=!!t.params.loop||!(v===t.minTranslate()||v===t.maxTranslate()),a&&t.params.nested&&s.stopPropagation(),t.params.freeMode&&t.params.freeMode.enabled){const e={time:l(),delta:Math.abs(m),direction:Math.sign(m)},a=c&&e.time<c.time+500&&e.delta<=c.delta&&e.direction===c.direction;if(!a){c=void 0;let l=t.getTranslate()+m*r.sensitivity;const o=t.isBeginning,p=t.isEnd;if(l>=t.minTranslate()&&(l=t.minTranslate()),l<=t.maxTranslate()&&(l=t.maxTranslate()),t.setTransition(0),t.setTranslate(l),t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses(),(!o&&t.isBeginning||!p&&t.isEnd)&&t.updateSlidesClasses(),t.params.loop&&t.loopFix({direction:e.direction<0?"next":"prev",byMousewheel:!0}),t.params.freeMode.sticky){clearTimeout(d),d=void 0,u.length>=15&&u.shift();const s=u.length?u[u.length-1]:void 0,a=u[0];if(u.push(e),s&&(e.delta>s.delta||e.direction!==s.direction))u.splice(0);else if(u.length>=15&&e.time-a.time<500&&a.delta-e.delta>=1&&e.delta<=6){const s=m>0?.8:.2;c=e,u.splice(0),d=n((()=>{t.slideToClosest(t.params.speed,!0,void 0,s)}),0)}d||(d=n((()=>{c=e,u.splice(0),t.slideToClosest(t.params.speed,!0,void 0,.5)}),500))}if(a||i("scroll",s),t.params.autoplay&&t.params.autoplayDisableOnInteraction&&t.autoplay.stop(),l===t.minTranslate()||l===t.maxTranslate())return!0}}else{const s={time:l(),delta:Math.abs(m),direction:Math.sign(m),raw:e};u.length>=2&&u.shift();const a=u.length?u[u.length-1]:void 0;if(u.push(s),a?(s.direction!==a.direction||s.delta>a.delta||s.time>a.time+150)&&f(s):f(s),function(e){const s=t.params.mousewheel;if(e.direction<0){if(t.isEnd&&!t.params.loop&&s.releaseOnEdges)return!0}else if(t.isBeginning&&!t.params.loop&&s.releaseOnEdges)return!0;return!1}(s))return!0}return s.preventDefault?s.preventDefault():s.returnValue=!1,!1}function v(e){let s=t.el;"container"!==t.params.mousewheel.eventsTarget&&(s=document.querySelector(t.params.mousewheel.eventsTarget)),s[e]("mouseenter",m),s[e]("mouseleave",h),s[e]("wheel",g)}function w(){return t.params.cssMode?(t.wrapperEl.removeEventListener("wheel",g),!0):!t.mousewheel.enabled&&(v("addEventListener"),t.mousewheel.enabled=!0,!0)}function b(){return t.params.cssMode?(t.wrapperEl.addEventListener(event,g),!0):!!t.mousewheel.enabled&&(v("removeEventListener"),t.mousewheel.enabled=!1,!0)}a("init",(()=>{!t.params.mousewheel.enabled&&t.params.cssMode&&b(),t.params.mousewheel.enabled&&w()})),a("destroy",(()=>{t.params.cssMode&&w(),t.mousewheel.enabled&&b()})),Object.assign(t.mousewheel,{enable:w,disable:b})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;s({navigation:{nextEl:null,prevEl:null,hideOnClick:!1,disabledClass:"swiper-button-disabled",hiddenClass:"swiper-button-hidden",lockClass:"swiper-button-lock",navigationDisabledClass:"swiper-navigation-disabled"}}),t.navigation={nextEl:null,prevEl:null};const r=e=>(Array.isArray(e)||(e=[e].filter((e=>!!e))),e);function n(e){let s;return e&&"string"==typeof e&&t.isElement&&(s=t.el.shadowRoot.querySelector(e),s)?s:(e&&("string"==typeof e&&(s=[...document.querySelectorAll(e)]),t.params.uniqueNavElements&&"string"==typeof e&&s.length>1&&1===t.el.querySelectorAll(e).length&&(s=t.el.querySelector(e))),e&&!s?e:s)}function l(e,s){const a=t.params.navigation;(e=r(e)).forEach((e=>{e&&(e.classList[s?"add":"remove"](...a.disabledClass.split(" ")),"BUTTON"===e.tagName&&(e.disabled=s),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](a.lockClass))}))}function o(){const{nextEl:e,prevEl:s}=t.navigation;if(t.params.loop)return l(s,!1),void l(e,!1);l(s,t.isBeginning&&!t.params.rewind),l(e,t.isEnd&&!t.params.rewind)}function d(e){e.preventDefault(),(!t.isBeginning||t.params.loop||t.params.rewind)&&(t.slidePrev(),i("navigationPrev"))}function c(e){e.preventDefault(),(!t.isEnd||t.params.loop||t.params.rewind)&&(t.slideNext(),i("navigationNext"))}function p(){const e=t.params.navigation;if(t.params.navigation=J(t,t.originalParams.navigation,t.params.navigation,{nextEl:"swiper-button-next",prevEl:"swiper-button-prev"}),!e.nextEl&&!e.prevEl)return;let s=n(e.nextEl),a=n(e.prevEl);Object.assign(t.navigation,{nextEl:s,prevEl:a}),s=r(s),a=r(a);const i=(s,a)=>{s&&s.addEventListener("click","next"===a?c:d),!t.enabled&&s&&s.classList.add(...e.lockClass.split(" "))};s.forEach((e=>i(e,"next"))),a.forEach((e=>i(e,"prev")))}function u(){let{nextEl:e,prevEl:s}=t.navigation;e=r(e),s=r(s);const a=(e,s)=>{e.removeEventListener("click","next"===s?c:d),e.classList.remove(...t.params.navigation.disabledClass.split(" "))};e.forEach((e=>a(e,"next"))),s.forEach((e=>a(e,"prev")))}a("init",(()=>{!1===t.params.navigation.enabled?m():(p(),o())})),a("toEdge fromEdge lock unlock",(()=>{o()})),a("destroy",(()=>{u()})),a("enable disable",(()=>{let{nextEl:e,prevEl:s}=t.navigation;e=r(e),s=r(s),[...e,...s].filter((e=>!!e)).forEach((e=>e.classList[t.enabled?"remove":"add"](t.params.navigation.lockClass)))})),a("click",((e,s)=>{let{nextEl:a,prevEl:n}=t.navigation;a=r(a),n=r(n);const l=s.target;if(t.params.navigation.hideOnClick&&!n.includes(l)&&!a.includes(l)){if(t.pagination&&t.params.pagination&&t.params.pagination.clickable&&(t.pagination.el===l||t.pagination.el.contains(l)))return;let e;a.length?e=a[0].classList.contains(t.params.navigation.hiddenClass):n.length&&(e=n[0].classList.contains(t.params.navigation.hiddenClass)),i(!0===e?"navigationShow":"navigationHide"),[...a,...n].filter((e=>!!e)).forEach((e=>e.classList.toggle(t.params.navigation.hiddenClass)))}}));const m=()=>{t.el.classList.add(...t.params.navigation.navigationDisabledClass.split(" ")),u()};Object.assign(t.navigation,{enable:()=>{t.el.classList.remove(...t.params.navigation.navigationDisabledClass.split(" ")),p(),o()},disable:m,update:o,init:p,destroy:u})},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const r="swiper-pagination";let n;s({pagination:{el:null,bulletElement:"span",clickable:!1,hideOnClick:!1,renderBullet:null,renderProgressbar:null,renderFraction:null,renderCustom:null,progressbarOpposite:!1,type:"bullets",dynamicBullets:!1,dynamicMainBullets:1,formatFractionCurrent:e=>e,formatFractionTotal:e=>e,bulletClass:`${r}-bullet`,bulletActiveClass:`${r}-bullet-active`,modifierClass:`${r}-`,currentClass:`${r}-current`,totalClass:`${r}-total`,hiddenClass:`${r}-hidden`,progressbarFillClass:`${r}-progressbar-fill`,progressbarOppositeClass:`${r}-progressbar-opposite`,clickableClass:`${r}-clickable`,lockClass:`${r}-lock`,horizontalClass:`${r}-horizontal`,verticalClass:`${r}-vertical`,paginationDisabledClass:`${r}-disabled`}}),t.pagination={el:null,bullets:[]};let l=0;const o=e=>(Array.isArray(e)||(e=[e].filter((e=>!!e))),e);function d(){return!t.params.pagination.el||!t.pagination.el||Array.isArray(t.pagination.el)&&0===t.pagination.el.length}function c(e,s){const{bulletActiveClass:a}=t.params.pagination;e&&(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&(e.classList.add(`${a}-${s}`),(e=e[("prev"===s?"previous":"next")+"ElementSibling"])&&e.classList.add(`${a}-${s}-${s}`))}function p(e){const s=e.target.closest(ee(t.params.pagination.bulletClass));if(!s)return;e.preventDefault();const a=b(s)*t.params.slidesPerGroup;if(t.params.loop){if(t.realIndex===a)return;(a<t.loopedSlides||a>t.slides.length-t.loopedSlides)&&t.loopFix({direction:a<t.loopedSlides?"prev":"next",activeSlideIndex:a,slideTo:!1}),t.slideToLoop(a)}else t.slideTo(a)}function u(){const e=t.rtl,s=t.params.pagination;if(d())return;let a,r=t.pagination.el;r=o(r);const p=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length,u=t.params.loop?Math.ceil(p/t.params.slidesPerGroup):t.snapGrid.length;if(a=t.params.loop?t.params.slidesPerGroup>1?Math.floor(t.realIndex/t.params.slidesPerGroup):t.realIndex:void 0!==t.snapIndex?t.snapIndex:t.activeIndex||0,"bullets"===s.type&&t.pagination.bullets&&t.pagination.bullets.length>0){const i=t.pagination.bullets;let o,d,p;if(s.dynamicBullets&&(n=x(i[0],t.isHorizontal()?"width":"height",!0),r.forEach((e=>{e.style[t.isHorizontal()?"width":"height"]=n*(s.dynamicMainBullets+4)+"px"})),s.dynamicMainBullets>1&&void 0!==t.previousIndex&&(l+=a-(t.previousIndex||0),l>s.dynamicMainBullets-1?l=s.dynamicMainBullets-1:l<0&&(l=0)),o=Math.max(a-l,0),d=o+(Math.min(i.length,s.dynamicMainBullets)-1),p=(d+o)/2),i.forEach((e=>{const t=[...["","-next","-next-next","-prev","-prev-prev","-main"].map((e=>`${s.bulletActiveClass}${e}`))].map((e=>"string"==typeof e&&e.includes(" ")?e.split(" "):e)).flat();e.classList.remove(...t)})),r.length>1)i.forEach((e=>{const t=b(e);t===a&&e.classList.add(...s.bulletActiveClass.split(" ")),s.dynamicBullets&&(t>=o&&t<=d&&e.classList.add(...`${s.bulletActiveClass}-main`.split(" ")),t===o&&c(e,"prev"),t===d&&c(e,"next"))}));else{const e=i[a];if(e&&e.classList.add(...s.bulletActiveClass.split(" ")),s.dynamicBullets){const e=i[o],t=i[d];for(let e=o;e<=d;e+=1)i[e]&&i[e].classList.add(...`${s.bulletActiveClass}-main`.split(" "));c(e,"prev"),c(t,"next")}}if(s.dynamicBullets){const a=Math.min(i.length,s.dynamicMainBullets+4),r=(n*a-n)/2-p*n,l=e?"right":"left";i.forEach((e=>{e.style[t.isHorizontal()?l:"top"]=`${r}px`}))}}r.forEach(((e,r)=>{if("fraction"===s.type&&(e.querySelectorAll(ee(s.currentClass)).forEach((e=>{e.textContent=s.formatFractionCurrent(a+1)})),e.querySelectorAll(ee(s.totalClass)).forEach((e=>{e.textContent=s.formatFractionTotal(u)}))),"progressbar"===s.type){let i;i=s.progressbarOpposite?t.isHorizontal()?"vertical":"horizontal":t.isHorizontal()?"horizontal":"vertical";const r=(a+1)/u;let n=1,l=1;"horizontal"===i?n=r:l=r,e.querySelectorAll(ee(s.progressbarFillClass)).forEach((e=>{e.style.transform=`translate3d(0,0,0) scaleX(${n}) scaleY(${l})`,e.style.transitionDuration=`${t.params.speed}ms`}))}"custom"===s.type&&s.renderCustom?(e.innerHTML=s.renderCustom(t,a+1,u),0===r&&i("paginationRender",e)):(0===r&&i("paginationRender",e),i("paginationUpdate",e)),t.params.watchOverflow&&t.enabled&&e.classList[t.isLocked?"add":"remove"](s.lockClass)}))}function m(){const e=t.params.pagination;if(d())return;const s=t.virtual&&t.params.virtual.enabled?t.virtual.slides.length:t.slides.length;let a=t.pagination.el;a=o(a);let r="";if("bullets"===e.type){let a=t.params.loop?Math.ceil(s/t.params.slidesPerGroup):t.snapGrid.length;t.params.freeMode&&t.params.freeMode.enabled&&a>s&&(a=s);for(let s=0;s<a;s+=1)e.renderBullet?r+=e.renderBullet.call(t,s,e.bulletClass):r+=`<${e.bulletElement} class="${e.bulletClass}"></${e.bulletElement}>`}"fraction"===e.type&&(r=e.renderFraction?e.renderFraction.call(t,e.currentClass,e.totalClass):`<span class="${e.currentClass}"></span> / <span class="${e.totalClass}"></span>`),"progressbar"===e.type&&(r=e.renderProgressbar?e.renderProgressbar.call(t,e.progressbarFillClass):`<span class="${e.progressbarFillClass}"></span>`),t.pagination.bullets=[],a.forEach((s=>{"custom"!==e.type&&(s.innerHTML=r||""),"bullets"===e.type&&t.pagination.bullets.push(...s.querySelectorAll(ee(e.bulletClass)))})),"custom"!==e.type&&i("paginationRender",a[0])}function h(){t.params.pagination=J(t,t.originalParams.pagination,t.params.pagination,{el:"swiper-pagination"});const e=t.params.pagination;if(!e.el)return;let s;"string"==typeof e.el&&t.isElement&&(s=t.el.shadowRoot.querySelector(e.el)),s||"string"!=typeof e.el||(s=[...document.querySelectorAll(e.el)]),s||(s=e.el),s&&0!==s.length&&(t.params.uniqueNavElements&&"string"==typeof e.el&&Array.isArray(s)&&s.length>1&&(s=[...t.el.querySelectorAll(e.el)],s.length>1&&(s=s.filter((e=>y(e,".swiper")[0]===t.el))[0])),Array.isArray(s)&&1===s.length&&(s=s[0]),Object.assign(t.pagination,{el:s}),s=o(s),s.forEach((s=>{"bullets"===e.type&&e.clickable&&s.classList.add(e.clickableClass),s.classList.add(e.modifierClass+e.type),s.classList.add(t.isHorizontal()?e.horizontalClass:e.verticalClass),"bullets"===e.type&&e.dynamicBullets&&(s.classList.add(`${e.modifierClass}${e.type}-dynamic`),l=0,e.dynamicMainBullets<1&&(e.dynamicMainBullets=1)),"progressbar"===e.type&&e.progressbarOpposite&&s.classList.add(e.progressbarOppositeClass),e.clickable&&s.addEventListener("click",p),t.enabled||s.classList.add(e.lockClass)})))}function f(){const e=t.params.pagination;if(d())return;let s=t.pagination.el;s&&(s=o(s),s.forEach((s=>{s.classList.remove(e.hiddenClass),s.classList.remove(e.modifierClass+e.type),s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),e.clickable&&s.removeEventListener("click",p)}))),t.pagination.bullets&&t.pagination.bullets.forEach((t=>t.classList.remove(...e.bulletActiveClass.split(" "))))}a("init",(()=>{!1===t.params.pagination.enabled?g():(h(),m(),u())})),a("activeIndexChange",(()=>{void 0===t.snapIndex&&u()})),a("snapIndexChange",(()=>{u()})),a("snapGridLengthChange",(()=>{m(),u()})),a("destroy",(()=>{f()})),a("enable disable",(()=>{let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList[t.enabled?"remove":"add"](t.params.pagination.lockClass))))})),a("lock unlock",(()=>{u()})),a("click",((e,s)=>{const a=s.target;let{el:r}=t.pagination;if(Array.isArray(r)||(r=[r].filter((e=>!!e))),t.params.pagination.el&&t.params.pagination.hideOnClick&&r&&r.length>0&&!a.classList.contains(t.params.pagination.bulletClass)){if(t.navigation&&(t.navigation.nextEl&&a===t.navigation.nextEl||t.navigation.prevEl&&a===t.navigation.prevEl))return;const e=r[0].classList.contains(t.params.pagination.hiddenClass);i(!0===e?"paginationShow":"paginationHide"),r.forEach((e=>e.classList.toggle(t.params.pagination.hiddenClass)))}}));const g=()=>{t.el.classList.add(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList.add(t.params.pagination.paginationDisabledClass)))),f()};Object.assign(t.pagination,{enable:()=>{t.el.classList.remove(t.params.pagination.paginationDisabledClass);let{el:e}=t.pagination;e&&(e=o(e),e.forEach((e=>e.classList.remove(t.params.pagination.paginationDisabledClass)))),h(),m(),u()},disable:g,render:m,update:u,init:h,destroy:f})},function(e){let{swiper:t,extendParams:s,on:i,emit:r}=e;const l=a();let o,d,c,p,u=!1,m=null,h=null;function f(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e,rtlTranslate:s}=t,{dragEl:a,el:i}=e,r=t.params.scrollbar,n=t.params.loop?t.progressLoop:t.progress;let l=d,o=(c-d)*n;s?(o=-o,o>0?(l=d-o,o=0):-o+d>c&&(l=c+o)):o<0?(l=d+o,o=0):o+d>c&&(l=c-o),t.isHorizontal()?(a.style.transform=`translate3d(${o}px, 0, 0)`,a.style.width=`${l}px`):(a.style.transform=`translate3d(0px, ${o}px, 0)`,a.style.height=`${l}px`),r.hide&&(clearTimeout(m),i.style.opacity=1,m=setTimeout((()=>{i.style.opacity=0,i.style.transitionDuration="400ms"}),1e3))}function w(){if(!t.params.scrollbar.el||!t.scrollbar.el)return;const{scrollbar:e}=t,{dragEl:s,el:a}=e;s.style.width="",s.style.height="",c=t.isHorizontal()?a.offsetWidth:a.offsetHeight,p=t.size/(t.virtualSize+t.params.slidesOffsetBefore-(t.params.centeredSlides?t.snapGrid[0]:0)),d="auto"===t.params.scrollbar.dragSize?c*p:parseInt(t.params.scrollbar.dragSize,10),t.isHorizontal()?s.style.width=`${d}px`:s.style.height=`${d}px`,a.style.display=p>=1?"none":"",t.params.scrollbar.hide&&(a.style.opacity=0),t.params.watchOverflow&&t.enabled&&e.el.classList[t.isLocked?"add":"remove"](t.params.scrollbar.lockClass)}function b(e){return t.isHorizontal()?e.clientX:e.clientY}function y(e){const{scrollbar:s,rtlTranslate:a}=t,{el:i}=s;let r;r=(b(e)-v(i)[t.isHorizontal()?"left":"top"]-(null!==o?o:d/2))/(c-d),r=Math.max(Math.min(r,1),0),a&&(r=1-r);const n=t.minTranslate()+(t.maxTranslate()-t.minTranslate())*r;t.updateProgress(n),t.setTranslate(n),t.updateActiveIndex(),t.updateSlidesClasses()}function E(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:n,dragEl:l}=a;u=!0,o=e.target===l?b(e)-e.target.getBoundingClientRect()[t.isHorizontal()?"left":"top"]:null,e.preventDefault(),e.stopPropagation(),i.style.transitionDuration="100ms",l.style.transitionDuration="100ms",y(e),clearTimeout(h),n.style.transitionDuration="0ms",s.hide&&(n.style.opacity=1),t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="none"),r("scrollbarDragStart",e)}function x(e){const{scrollbar:s,wrapperEl:a}=t,{el:i,dragEl:n}=s;u&&(e.preventDefault?e.preventDefault():e.returnValue=!1,y(e),a.style.transitionDuration="0ms",i.style.transitionDuration="0ms",n.style.transitionDuration="0ms",r("scrollbarDragMove",e))}function S(e){const s=t.params.scrollbar,{scrollbar:a,wrapperEl:i}=t,{el:l}=a;u&&(u=!1,t.params.cssMode&&(t.wrapperEl.style["scroll-snap-type"]="",i.style.transitionDuration=""),s.hide&&(clearTimeout(h),h=n((()=>{l.style.opacity=0,l.style.transitionDuration="400ms"}),1e3)),r("scrollbarDragEnd",e),s.snapOnRelease&&t.slideToClosest())}function T(e){const{scrollbar:s,params:a}=t,i=s.el;if(!i)return;const r=i,n=!!a.passiveListeners&&{passive:!1,capture:!1},o=!!a.passiveListeners&&{passive:!0,capture:!1};if(!r)return;const d="on"===e?"addEventListener":"removeEventListener";r[d]("pointerdown",E,n),l[d]("pointermove",x,n),l[d]("pointerup",S,o)}function M(){const{scrollbar:e,el:s}=t;t.params.scrollbar=J(t,t.originalParams.scrollbar,t.params.scrollbar,{el:"swiper-scrollbar"});const a=t.params.scrollbar;if(!a.el)return;let i,r;"string"==typeof a.el&&t.isElement&&(i=t.el.shadowRoot.querySelector(a.el)),i||"string"!=typeof a.el?i||(i=a.el):i=l.querySelectorAll(a.el),t.params.uniqueNavElements&&"string"==typeof a.el&&i.length>1&&1===s.querySelectorAll(a.el).length&&(i=s.querySelector(a.el)),i.length>0&&(i=i[0]),i.classList.add(t.isHorizontal()?a.horizontalClass:a.verticalClass),i&&(r=i.querySelector(`.${t.params.scrollbar.dragClass}`),r||(r=g("div",t.params.scrollbar.dragClass),i.append(r))),Object.assign(e,{el:i,dragEl:r}),a.draggable&&t.params.scrollbar.el&&t.scrollbar.el&&T("on"),i&&i.classList[t.enabled?"remove":"add"](t.params.scrollbar.lockClass)}function C(){const e=t.params.scrollbar,s=t.scrollbar.el;s&&s.classList.remove(t.isHorizontal()?e.horizontalClass:e.verticalClass),t.params.scrollbar.el&&t.scrollbar.el&&T("off")}s({scrollbar:{el:null,dragSize:"auto",hide:!1,draggable:!1,snapOnRelease:!0,lockClass:"swiper-scrollbar-lock",dragClass:"swiper-scrollbar-drag",scrollbarDisabledClass:"swiper-scrollbar-disabled",horizontalClass:"swiper-scrollbar-horizontal",verticalClass:"swiper-scrollbar-vertical"}}),t.scrollbar={el:null,dragEl:null},i("init",(()=>{!1===t.params.scrollbar.enabled?P():(M(),w(),f())})),i("update resize observerUpdate lock unlock",(()=>{w()})),i("setTranslate",(()=>{f()})),i("setTransition",((e,s)=>{!function(e){t.params.scrollbar.el&&t.scrollbar.el&&(t.scrollbar.dragEl.style.transitionDuration=`${e}ms`)}(s)})),i("enable disable",(()=>{const{el:e}=t.scrollbar;e&&e.classList[t.enabled?"remove":"add"](t.params.scrollbar.lockClass)})),i("destroy",(()=>{C()}));const P=()=>{t.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.el&&t.scrollbar.el.classList.add(t.params.scrollbar.scrollbarDisabledClass),C()};Object.assign(t.scrollbar,{enable:()=>{t.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),t.scrollbar.el&&t.scrollbar.el.classList.remove(t.params.scrollbar.scrollbarDisabledClass),M(),w(),f()},disable:P,updateSize:w,setTranslate:f,init:M,destroy:C})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({parallax:{enabled:!1}});const i=(e,s)=>{const{rtl:a}=t,i=a?-1:1,r=e.getAttribute("data-swiper-parallax")||"0";let n=e.getAttribute("data-swiper-parallax-x"),l=e.getAttribute("data-swiper-parallax-y");const o=e.getAttribute("data-swiper-parallax-scale"),d=e.getAttribute("data-swiper-parallax-opacity"),c=e.getAttribute("data-swiper-parallax-rotate");if(n||l?(n=n||"0",l=l||"0"):t.isHorizontal()?(n=r,l="0"):(l=r,n="0"),n=n.indexOf("%")>=0?parseInt(n,10)*s*i+"%":n*s*i+"px",l=l.indexOf("%")>=0?parseInt(l,10)*s+"%":l*s+"px",null!=d){const t=d-(d-1)*(1-Math.abs(s));e.style.opacity=t}let p=`translate3d(${n}, ${l}, 0px)`;if(null!=o){p+=` scale(${o-(o-1)*(1-Math.abs(s))})`}if(c&&null!=c){p+=` rotate(${c*s*-1}deg)`}e.style.transform=p},r=()=>{const{el:e,slides:s,progress:a,snapGrid:r}=t;f(e,"[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((e=>{i(e,a)})),s.forEach(((e,s)=>{let n=e.progress;t.params.slidesPerGroup>1&&"auto"!==t.params.slidesPerView&&(n+=Math.ceil(s/2)-a*(r.length-1)),n=Math.min(Math.max(n,-1),1),e.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale], [data-swiper-parallax-rotate]").forEach((e=>{i(e,n)}))}))};a("beforeInit",(()=>{t.params.parallax.enabled&&(t.params.watchSlidesProgress=!0,t.originalParams.watchSlidesProgress=!0)})),a("init",(()=>{t.params.parallax.enabled&&r()})),a("setTranslate",(()=>{t.params.parallax.enabled&&r()})),a("setTransition",((e,s)=>{t.params.parallax.enabled&&function(e){void 0===e&&(e=t.params.speed);const{el:s}=t;s.querySelectorAll("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y], [data-swiper-parallax-opacity], [data-swiper-parallax-scale]").forEach((t=>{let s=parseInt(t.getAttribute("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),t.style.transitionDuration=`${s}ms`}))}(s)}))},function(e){let{swiper:t,extendParams:s,on:a,emit:i}=e;const n=r();s({zoom:{enabled:!1,maxRatio:3,minRatio:1,toggle:!0,containerClass:"swiper-zoom-container",zoomedSlideClass:"swiper-slide-zoomed"}}),t.zoom={enabled:!1};let l,d,c=1,p=!1;const u=[],m={slideEl:void 0,slideWidth:void 0,slideHeight:void 0,imageEl:void 0,imageWrapEl:void 0,maxRatio:3},h={isTouched:void 0,isMoved:void 0,currentX:void 0,currentY:void 0,minX:void 0,minY:void 0,maxX:void 0,maxY:void 0,width:void 0,height:void 0,startX:void 0,startY:void 0,touchesStart:{},touchesCurrent:{}},g={x:void 0,y:void 0,prevPositionX:void 0,prevPositionY:void 0,prevTime:void 0};let w=1;function b(){if(u.length<2)return 1;const e=u[0].pageX,t=u[0].pageY,s=u[1].pageX,a=u[1].pageY;return Math.sqrt((s-e)**2+(a-t)**2)}function E(e){const s=t.isElement?"swiper-slide":`.${t.params.slideClass}`;return!!e.target.matches(s)||t.slides.filter((t=>t.contains(e.target))).length>0}function x(e){if("mouse"===e.pointerType&&u.splice(0,u.length),!E(e))return;const s=t.params.zoom;if(l=!1,d=!1,u.push(e),!(u.length<2)){if(l=!0,m.scaleStart=b(),!m.slideEl){m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`),m.slideEl||(m.slideEl=t.slides[t.activeIndex]);let a=m.slideEl.querySelector(`.${s.containerClass}`);if(a&&(a=a.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=a,m.imageWrapEl=a?y(m.imageEl,`.${s.containerClass}`)[0]:void 0,!m.imageWrapEl)return void(m.imageEl=void 0);m.maxRatio=m.imageWrapEl.getAttribute("data-swiper-zoom")||s.maxRatio}if(m.imageEl){const[e,t]=function(){if(u.length<2)return{x:null,y:null};const e=m.imageEl.getBoundingClientRect();return[(u[0].pageX+(u[1].pageX-u[0].pageX)/2-e.x)/c,(u[0].pageY+(u[1].pageY-u[0].pageY)/2-e.y)/c]}();m.imageEl.style.transformOrigin=`${e}px ${t}px`,m.imageEl.style.transitionDuration="0ms"}p=!0}}function S(e){if(!E(e))return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&(u[i]=e),u.length<2||(d=!0,m.scaleMove=b(),m.imageEl&&(a.scale=m.scaleMove/m.scaleStart*c,a.scale>m.maxRatio&&(a.scale=m.maxRatio-1+(a.scale-m.maxRatio+1)**.5),a.scale<s.minRatio&&(a.scale=s.minRatio+1-(s.minRatio-a.scale+1)**.5),m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`))}function T(e){if(!E(e))return;if("mouse"===e.pointerType&&"pointerout"===e.type)return;const s=t.params.zoom,a=t.zoom,i=u.findIndex((t=>t.pointerId===e.pointerId));i>=0&&u.splice(i,1),l&&d&&(l=!1,d=!1,m.imageEl&&(a.scale=Math.max(Math.min(a.scale,m.maxRatio),s.minRatio),m.imageEl.style.transitionDuration=`${t.params.speed}ms`,m.imageEl.style.transform=`translate3d(0,0,0) scale(${a.scale})`,c=a.scale,p=!1,1===a.scale&&(m.slideEl=void 0)))}function M(e){if(!E(e)||!function(e){const s=`.${t.params.zoom.containerClass}`;return!!e.target.matches(s)||[...t.el.querySelectorAll(s)].filter((t=>t.contains(e.target))).length>0}(e))return;const s=t.zoom;if(!m.imageEl)return;if(t.allowClick=!1,!h.isTouched||!m.slideEl)return;h.isMoved||(h.width=m.imageEl.offsetWidth,h.height=m.imageEl.offsetHeight,h.startX=o(m.imageWrapEl,"x")||0,h.startY=o(m.imageWrapEl,"y")||0,m.slideWidth=m.slideEl.offsetWidth,m.slideHeight=m.slideEl.offsetHeight,m.imageWrapEl.style.transitionDuration="0ms");const a=h.width*s.scale,i=h.height*s.scale;if(!(a<m.slideWidth&&i<m.slideHeight)){if(h.minX=Math.min(m.slideWidth/2-a/2,0),h.maxX=-h.minX,h.minY=Math.min(m.slideHeight/2-i/2,0),h.maxY=-h.minY,h.touchesCurrent.x=u.length>0?u[0].pageX:e.pageX,h.touchesCurrent.y=u.length>0?u[0].pageY:e.pageY,!h.isMoved&&!p){if(t.isHorizontal()&&(Math.floor(h.minX)===Math.floor(h.startX)&&h.touchesCurrent.x<h.touchesStart.x||Math.floor(h.maxX)===Math.floor(h.startX)&&h.touchesCurrent.x>h.touchesStart.x))return void(h.isTouched=!1);if(!t.isHorizontal()&&(Math.floor(h.minY)===Math.floor(h.startY)&&h.touchesCurrent.y<h.touchesStart.y||Math.floor(h.maxY)===Math.floor(h.startY)&&h.touchesCurrent.y>h.touchesStart.y))return void(h.isTouched=!1)}e.cancelable&&e.preventDefault(),e.stopPropagation(),h.isMoved=!0,h.currentX=h.touchesCurrent.x-h.touchesStart.x+h.startX,h.currentY=h.touchesCurrent.y-h.touchesStart.y+h.startY,h.currentX<h.minX&&(h.currentX=h.minX+1-(h.minX-h.currentX+1)**.8),h.currentX>h.maxX&&(h.currentX=h.maxX-1+(h.currentX-h.maxX+1)**.8),h.currentY<h.minY&&(h.currentY=h.minY+1-(h.minY-h.currentY+1)**.8),h.currentY>h.maxY&&(h.currentY=h.maxY-1+(h.currentY-h.maxY+1)**.8),g.prevPositionX||(g.prevPositionX=h.touchesCurrent.x),g.prevPositionY||(g.prevPositionY=h.touchesCurrent.y),g.prevTime||(g.prevTime=Date.now()),g.x=(h.touchesCurrent.x-g.prevPositionX)/(Date.now()-g.prevTime)/2,g.y=(h.touchesCurrent.y-g.prevPositionY)/(Date.now()-g.prevTime)/2,Math.abs(h.touchesCurrent.x-g.prevPositionX)<2&&(g.x=0),Math.abs(h.touchesCurrent.y-g.prevPositionY)<2&&(g.y=0),g.prevPositionX=h.touchesCurrent.x,g.prevPositionY=h.touchesCurrent.y,g.prevTime=Date.now(),m.imageWrapEl.style.transform=`translate3d(${h.currentX}px, ${h.currentY}px,0)`}}function C(){const e=t.zoom;m.slideEl&&t.previousIndex!==t.activeIndex&&(m.imageEl&&(m.imageEl.style.transform="translate3d(0,0,0) scale(1)"),m.imageWrapEl&&(m.imageWrapEl.style.transform="translate3d(0,0,0)"),e.scale=1,c=1,m.slideEl=void 0,m.imageEl=void 0,m.imageWrapEl=void 0)}function P(e){const s=t.zoom,a=t.params.zoom;if(!m.slideEl){e&&e.target&&(m.slideEl=e.target.closest(`.${t.params.slideClass}, swiper-slide`)),m.slideEl||(t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex]);let s=m.slideEl.querySelector(`.${a.containerClass}`);s&&(s=s.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=s,m.imageWrapEl=s?y(m.imageEl,`.${a.containerClass}`)[0]:void 0}if(!m.imageEl||!m.imageWrapEl)return;let i,r,l,o,d,p,u,g,w,b,E,x,S,T,M,C,P,L;t.params.cssMode&&(t.wrapperEl.style.overflow="hidden",t.wrapperEl.style.touchAction="none"),m.slideEl.classList.add(`${a.zoomedSlideClass}`),void 0===h.touchesStart.x&&e?(i=e.pageX,r=e.pageY):(i=h.touchesStart.x,r=h.touchesStart.y);const A="number"==typeof e?e:null;1===c&&A&&(i=void 0,r=void 0),s.scale=A||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,c=A||m.imageWrapEl.getAttribute("data-swiper-zoom")||a.maxRatio,!e||1===c&&A?(u=0,g=0):(P=m.slideEl.offsetWidth,L=m.slideEl.offsetHeight,l=v(m.slideEl).left+n.scrollX,o=v(m.slideEl).top+n.scrollY,d=l+P/2-i,p=o+L/2-r,w=m.imageEl.offsetWidth,b=m.imageEl.offsetHeight,E=w*s.scale,x=b*s.scale,S=Math.min(P/2-E/2,0),T=Math.min(L/2-x/2,0),M=-S,C=-T,u=d*s.scale,g=p*s.scale,u<S&&(u=S),u>M&&(u=M),g<T&&(g=T),g>C&&(g=C)),m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform=`translate3d(${u}px, ${g}px,0)`,m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform=`translate3d(0,0,0) scale(${s.scale})`}function L(){const e=t.zoom,s=t.params.zoom;if(!m.slideEl){t.params.virtual&&t.params.virtual.enabled&&t.virtual?m.slideEl=f(t.slidesEl,`.${t.params.slideActiveClass}`)[0]:m.slideEl=t.slides[t.activeIndex];let e=m.slideEl.querySelector(`.${s.containerClass}`);e&&(e=e.querySelectorAll("picture, img, svg, canvas, .swiper-zoom-target")[0]),m.imageEl=e,m.imageWrapEl=e?y(m.imageEl,`.${s.containerClass}`)[0]:void 0}m.imageEl&&m.imageWrapEl&&(t.params.cssMode&&(t.wrapperEl.style.overflow="",t.wrapperEl.style.touchAction=""),e.scale=1,c=1,m.imageWrapEl.style.transitionDuration="300ms",m.imageWrapEl.style.transform="translate3d(0,0,0)",m.imageEl.style.transitionDuration="300ms",m.imageEl.style.transform="translate3d(0,0,0) scale(1)",m.slideEl.classList.remove(`${s.zoomedSlideClass}`),m.slideEl=void 0)}function A(e){const s=t.zoom;s.scale&&1!==s.scale?L():P(e)}function z(){return{passiveListener:!!t.params.passiveListeners&&{passive:!0,capture:!1},activeListenerWithCapture:!t.params.passiveListeners||{passive:!1,capture:!0}}}function $(){const e=t.zoom;if(e.enabled)return;e.enabled=!0;const{passiveListener:s,activeListenerWithCapture:a}=z();t.wrapperEl.addEventListener("pointerdown",x,s),t.wrapperEl.addEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.addEventListener(e,T,s)})),t.wrapperEl.addEventListener("pointermove",M,a)}function k(){const e=t.zoom;if(!e.enabled)return;e.enabled=!1;const{passiveListener:s,activeListenerWithCapture:a}=z();t.wrapperEl.removeEventListener("pointerdown",x,s),t.wrapperEl.removeEventListener("pointermove",S,a),["pointerup","pointercancel","pointerout"].forEach((e=>{t.wrapperEl.removeEventListener(e,T,s)})),t.wrapperEl.removeEventListener("pointermove",M,a)}Object.defineProperty(t.zoom,"scale",{get:()=>w,set(e){if(w!==e){const t=m.imageEl,s=m.slideEl;i("zoomChange",e,t,s)}w=e}}),a("init",(()=>{t.params.zoom.enabled&&$()})),a("destroy",(()=>{k()})),a("touchStart",((e,s)=>{t.zoom.enabled&&function(e){const s=t.device;m.imageEl&&(h.isTouched||(s.android&&e.cancelable&&e.preventDefault(),h.isTouched=!0,h.touchesStart.x=e.pageX,h.touchesStart.y=e.pageY))}(s)})),a("touchEnd",((e,s)=>{t.zoom.enabled&&function(){const e=t.zoom;if(!m.imageEl)return;if(!h.isTouched||!h.isMoved)return h.isTouched=!1,void(h.isMoved=!1);h.isTouched=!1,h.isMoved=!1;let s=300,a=300;const i=g.x*s,r=h.currentX+i,n=g.y*a,l=h.currentY+n;0!==g.x&&(s=Math.abs((r-h.currentX)/g.x)),0!==g.y&&(a=Math.abs((l-h.currentY)/g.y));const o=Math.max(s,a);h.currentX=r,h.currentY=l;const d=h.width*e.scale,c=h.height*e.scale;h.minX=Math.min(m.slideWidth/2-d/2,0),h.maxX=-h.minX,h.minY=Math.min(m.slideHeight/2-c/2,0),h.maxY=-h.minY,h.currentX=Math.max(Math.min(h.currentX,h.maxX),h.minX),h.currentY=Math.max(Math.min(h.currentY,h.maxY),h.minY),m.imageWrapEl.style.transitionDuration=`${o}ms`,m.imageWrapEl.style.transform=`translate3d(${h.currentX}px, ${h.currentY}px,0)`}()})),a("doubleTap",((e,s)=>{!t.animating&&t.params.zoom.enabled&&t.zoom.enabled&&t.params.zoom.toggle&&A(s)})),a("transitionEnd",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&C()})),a("slideChange",(()=>{t.zoom.enabled&&t.params.zoom.enabled&&t.params.cssMode&&C()})),Object.assign(t.zoom,{enable:$,disable:k,in:P,out:L,toggle:A})},function(e){let{swiper:t,extendParams:s,on:a}=e;function i(e,t){const s=function(){let e,t,s;return(a,i)=>{for(t=-1,e=a.length;e-t>1;)s=e+t>>1,a[s]<=i?t=s:e=s;return e}}();let a,i;return this.x=e,this.y=t,this.lastIndex=e.length-1,this.interpolate=function(e){return e?(i=s(this.x,e),a=i-1,(e-this.x[a])*(this.y[i]-this.y[a])/(this.x[i]-this.x[a])+this.y[a]):0},this}function r(){t.controller.control&&t.controller.spline&&(t.controller.spline=void 0,delete t.controller.spline)}s({controller:{control:void 0,inverse:!1,by:"slide"}}),t.controller={control:void 0},a("beforeInit",(()=>{if("undefined"!=typeof window&&("string"==typeof t.params.controller.control||t.params.controller.control instanceof HTMLElement)){const e=document.querySelector(t.params.controller.control);if(e&&e.swiper)t.controller.control=e.swiper;else if(e){const s=a=>{t.controller.control=a.detail[0],t.update(),e.removeEventListener("init",s)};e.addEventListener("init",s)}}else t.controller.control=t.params.controller.control})),a("update",(()=>{r()})),a("resize",(()=>{r()})),a("observerUpdate",(()=>{r()})),a("setTranslate",((e,s,a)=>{t.controller.control&&t.controller.setTranslate(s,a)})),a("setTransition",((e,s,a)=>{t.controller.control&&t.controller.setTransition(s,a)})),Object.assign(t.controller,{setTranslate:function(e,s){const a=t.controller.control;let r,n;const l=t.constructor;function o(e){const s=t.rtlTranslate?-t.translate:t.translate;"slide"===t.params.controller.by&&(!function(e){t.controller.spline||(t.controller.spline=t.params.loop?new i(t.slidesGrid,e.slidesGrid):new i(t.snapGrid,e.snapGrid))}(e),n=-t.controller.spline.interpolate(-s)),n&&"container"!==t.params.controller.by||(r=(e.maxTranslate()-e.minTranslate())/(t.maxTranslate()-t.minTranslate()),n=(s-t.minTranslate())*r+e.minTranslate()),t.params.controller.inverse&&(n=e.maxTranslate()-n),e.updateProgress(n),e.setTranslate(n,t),e.updateActiveIndex(),e.updateSlidesClasses()}if(Array.isArray(a))for(let e=0;e<a.length;e+=1)a[e]!==s&&a[e]instanceof l&&o(a[e]);else a instanceof l&&s!==a&&o(a)},setTransition:function(e,s){const a=t.constructor,i=t.controller.control;let r;function l(s){s.setTransition(e,t),0!==e&&(s.transitionStart(),s.params.autoHeight&&n((()=>{s.updateAutoHeight()})),E(s.wrapperEl,(()=>{i&&s.transitionEnd()})))}if(Array.isArray(i))for(r=0;r<i.length;r+=1)i[r]!==s&&i[r]instanceof a&&l(i[r]);else i instanceof a&&s!==i&&l(i)}})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({a11y:{enabled:!0,notificationClass:"swiper-notification",prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",paginationBulletMessage:"Go to slide {{index}}",slideLabelMessage:"{{index}} / {{slidesLength}}",containerMessage:null,containerRoleDescriptionMessage:null,itemRoleDescriptionMessage:null,slideRole:"group",id:null}}),t.a11y={clicked:!1};let i=null;function r(e){const t=i;0!==t.length&&(t.innerHTML="",t.innerHTML=e)}const n=e=>(Array.isArray(e)||(e=[e].filter((e=>!!e))),e);function l(e){(e=n(e)).forEach((e=>{e.setAttribute("tabIndex","0")}))}function o(e){(e=n(e)).forEach((e=>{e.setAttribute("tabIndex","-1")}))}function d(e,t){(e=n(e)).forEach((e=>{e.setAttribute("role",t)}))}function c(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-roledescription",t)}))}function p(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-label",t)}))}function u(e){(e=n(e)).forEach((e=>{e.setAttribute("aria-disabled",!0)}))}function m(e){(e=n(e)).forEach((e=>{e.setAttribute("aria-disabled",!1)}))}function h(e){if(13!==e.keyCode&&32!==e.keyCode)return;const s=t.params.a11y,a=e.target;t.pagination&&t.pagination.el&&(a===t.pagination.el||t.pagination.el.contains(e.target))&&!e.target.matches(ee(t.params.pagination.bulletClass))||(t.navigation&&t.navigation.nextEl&&a===t.navigation.nextEl&&(t.isEnd&&!t.params.loop||t.slideNext(),t.isEnd?r(s.lastSlideMessage):r(s.nextSlideMessage)),t.navigation&&t.navigation.prevEl&&a===t.navigation.prevEl&&(t.isBeginning&&!t.params.loop||t.slidePrev(),t.isBeginning?r(s.firstSlideMessage):r(s.prevSlideMessage)),t.pagination&&a.matches(ee(t.params.pagination.bulletClass))&&a.click())}function f(){return t.pagination&&t.pagination.bullets&&t.pagination.bullets.length}function v(){return f()&&t.params.pagination.clickable}const w=(e,t,s)=>{l(e),"BUTTON"!==e.tagName&&(d(e,"button"),e.addEventListener("keydown",h)),p(e,s),function(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-controls",t)}))}(e,t)},y=()=>{t.a11y.clicked=!0},E=()=>{requestAnimationFrame((()=>{requestAnimationFrame((()=>{t.destroyed||(t.a11y.clicked=!1)}))}))},x=e=>{if(t.a11y.clicked)return;const s=e.target.closest(`.${t.params.slideClass}, swiper-slide`);if(!s||!t.slides.includes(s))return;const a=t.slides.indexOf(s)===t.activeIndex,i=t.params.watchSlidesProgress&&t.visibleSlides&&t.visibleSlides.includes(s);a||i||e.sourceCapabilities&&e.sourceCapabilities.firesTouchEvents||(t.isHorizontal()?t.el.scrollLeft=0:t.el.scrollTop=0,t.slideTo(t.slides.indexOf(s),0))},S=()=>{const e=t.params.a11y;e.itemRoleDescriptionMessage&&c(t.slides,e.itemRoleDescriptionMessage),e.slideRole&&d(t.slides,e.slideRole);const s=t.slides.length;e.slideLabelMessage&&t.slides.forEach(((a,i)=>{const r=t.params.loop?parseInt(a.getAttribute("data-swiper-slide-index"),10):i;p(a,e.slideLabelMessage.replace(/\{\{index\}\}/,r+1).replace(/\{\{slidesLength\}\}/,s))}))},T=()=>{const e=t.params.a11y;t.el.append(i);const s=t.el;e.containerRoleDescriptionMessage&&c(s,e.containerRoleDescriptionMessage),e.containerMessage&&p(s,e.containerMessage);const a=t.wrapperEl,r=e.id||a.getAttribute("id")||`swiper-wrapper-${l=16,void 0===l&&(l=16),"x".repeat(l).replace(/x/g,(()=>Math.round(16*Math.random()).toString(16)))}`;var l;const o=t.params.autoplay&&t.params.autoplay.enabled?"off":"polite";var d;d=r,n(a).forEach((e=>{e.setAttribute("id",d)})),function(e,t){(e=n(e)).forEach((e=>{e.setAttribute("aria-live",t)}))}(a,o),S();let{nextEl:u,prevEl:m}=t.navigation?t.navigation:{};if(u=n(u),m=n(m),u&&u.forEach((t=>w(t,r,e.nextSlideMessage))),m&&m.forEach((t=>w(t,r,e.prevSlideMessage))),v()){(Array.isArray(t.pagination.el)?t.pagination.el:[t.pagination.el]).forEach((e=>{e.addEventListener("keydown",h)}))}t.el.addEventListener("focus",x,!0),t.el.addEventListener("pointerdown",y,!0),t.el.addEventListener("pointerup",E,!0)};a("beforeInit",(()=>{i=g("span",t.params.a11y.notificationClass),i.setAttribute("aria-live","assertive"),i.setAttribute("aria-atomic","true"),t.isElement&&i.setAttribute("slot","container-end")})),a("afterInit",(()=>{t.params.a11y.enabled&&T()})),a("slidesLengthChange snapGridLengthChange slidesGridLengthChange",(()=>{t.params.a11y.enabled&&S()})),a("fromEdge toEdge afterInit lock unlock",(()=>{t.params.a11y.enabled&&function(){if(t.params.loop||t.params.rewind||!t.navigation)return;const{nextEl:e,prevEl:s}=t.navigation;s&&(t.isBeginning?(u(s),o(s)):(m(s),l(s))),e&&(t.isEnd?(u(e),o(e)):(m(e),l(e)))}()})),a("paginationUpdate",(()=>{t.params.a11y.enabled&&function(){const e=t.params.a11y;f()&&t.pagination.bullets.forEach((s=>{t.params.pagination.clickable&&(l(s),t.params.pagination.renderBullet||(d(s,"button"),p(s,e.paginationBulletMessage.replace(/\{\{index\}\}/,b(s)+1)))),s.matches(ee(t.params.pagination.bulletActiveClass))?s.setAttribute("aria-current","true"):s.removeAttribute("aria-current")}))}()})),a("destroy",(()=>{t.params.a11y.enabled&&function(){i&&i.length>0&&i.remove();let{nextEl:e,prevEl:s}=t.navigation?t.navigation:{};e=n(e),s=n(s),e&&e.forEach((e=>e.removeEventListener("keydown",h))),s&&s.forEach((e=>e.removeEventListener("keydown",h))),v()&&(Array.isArray(t.pagination.el)?t.pagination.el:[t.pagination.el]).forEach((e=>{e.removeEventListener("keydown",h)}));t.el.removeEventListener("focus",x,!0),t.el.removeEventListener("pointerdown",y,!0),t.el.removeEventListener("pointerup",E,!0)}()}))},function(e){let{swiper:t,extendParams:s,on:a}=e;s({history:{enabled:!1,root:"",replaceState:!1,key:"slides",keepQuery:!1}});let i=!1,n={};const l=e=>e.toString().replace(/\s+/g,"-").replace(/[^\w-]+/g,"").replace(/--+/g,"-").replace(/^-+/,"").replace(/-+$/,""),o=e=>{const t=r();let s;s=e?new URL(e):t.location;const a=s.pathname.slice(1).split("/").filter((e=>""!==e)),i=a.length;return{key:a[i-2],value:a[i-1]}},d=(e,s)=>{const a=r();if(!i||!t.params.history.enabled)return;let n;n=t.params.url?new URL(t.params.url):a.location;const o=t.slides[s];let d=l(o.getAttribute("data-history"));if(t.params.history.root.length>0){let s=t.params.history.root;"/"===s[s.length-1]&&(s=s.slice(0,s.length-1)),d=`${s}/${e?`${e}/`:""}${d}`}else n.pathname.includes(e)||(d=`${e?`${e}/`:""}${d}`);t.params.history.keepQuery&&(d+=n.search);const c=a.history.state;c&&c.value===d||(t.params.history.replaceState?a.history.replaceState({value:d},null,d):a.history.pushState({value:d},null,d))},c=(e,s,a)=>{if(s)for(let i=0,r=t.slides.length;i<r;i+=1){const r=t.slides[i];if(l(r.getAttribute("data-history"))===s){const s=t.getSlideIndex(r);t.slideTo(s,e,a)}}else t.slideTo(0,e,a)},p=()=>{n=o(t.params.url),c(t.params.speed,n.value,!1)};a("init",(()=>{t.params.history.enabled&&(()=>{const e=r();if(t.params.history){if(!e.history||!e.history.pushState)return t.params.history.enabled=!1,void(t.params.hashNavigation.enabled=!0);i=!0,n=o(t.params.url),n.key||n.value?(c(0,n.value,t.params.runCallbacksOnInit),t.params.history.replaceState||e.addEventListener("popstate",p)):t.params.history.replaceState||e.addEventListener("popstate",p)}})()})),a("destroy",(()=>{t.params.history.enabled&&(()=>{const e=r();t.params.history.replaceState||e.removeEventListener("popstate",p)})()})),a("transitionEnd _freeModeNoMomentumRelease",(()=>{i&&d(t.params.history.key,t.activeIndex)})),a("slideChange",(()=>{i&&t.params.cssMode&&d(t.params.history.key,t.activeIndex)}))},function(e){let{swiper:t,extendParams:s,emit:i,on:n}=e,l=!1;const o=a(),d=r();s({hashNavigation:{enabled:!1,replaceState:!1,watchState:!1}});const c=()=>{i("hashChange");const e=o.location.hash.replace("#","");if(e!==t.slides[t.activeIndex].getAttribute("data-hash")){const s=t.getSlideIndex(f(t.slidesEl,`.${t.params.slideClass}[data-hash="${e}"], swiper-slide[data-hash="${e}"]`)[0]);if(void 0===s)return;t.slideTo(s)}},p=()=>{if(l&&t.params.hashNavigation.enabled)if(t.params.hashNavigation.replaceState&&d.history&&d.history.replaceState)d.history.replaceState(null,null,`#${t.slides[t.activeIndex].getAttribute("data-hash")}`||""),i("hashSet");else{const e=t.slides[t.activeIndex],s=e.getAttribute("data-hash")||e.getAttribute("data-history");o.location.hash=s||"",i("hashSet")}};n("init",(()=>{t.params.hashNavigation.enabled&&(()=>{if(!t.params.hashNavigation.enabled||t.params.history&&t.params.history.enabled)return;l=!0;const e=o.location.hash.replace("#","");if(e){const s=0;for(let a=0,i=t.slides.length;a<i;a+=1){const i=t.slides[a];if((i.getAttribute("data-hash")||i.getAttribute("data-history"))===e){const e=t.getSlideIndex(i);t.slideTo(e,s,t.params.runCallbacksOnInit,!0)}}}t.params.hashNavigation.watchState&&d.addEventListener("hashchange",c)})()})),n("destroy",(()=>{t.params.hashNavigation.enabled&&t.params.hashNavigation.watchState&&d.removeEventListener("hashchange",c)})),n("transitionEnd _freeModeNoMomentumRelease",(()=>{l&&p()})),n("slideChange",(()=>{l&&t.params.cssMode&&p()}))},function(e){let t,s,{swiper:i,extendParams:r,on:n,emit:l,params:o}=e;i.autoplay={running:!1,paused:!1,timeLeft:0},r({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!0,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let d,c,p,u,m,h,f,g=o&&o.autoplay?o.autoplay.delay:3e3,v=o&&o.autoplay?o.autoplay.delay:3e3,w=(new Date).getTime;function b(e){i&&!i.destroyed&&i.wrapperEl&&e.target===i.wrapperEl&&(i.wrapperEl.removeEventListener("transitionend",b),M())}const y=()=>{if(i.destroyed||!i.autoplay.running)return;i.autoplay.paused?c=!0:c&&(v=d,c=!1);const e=i.autoplay.paused?d:w+v-(new Date).getTime();i.autoplay.timeLeft=e,l("autoplayTimeLeft",e,e/g),s=requestAnimationFrame((()=>{y()}))},E=e=>{if(i.destroyed||!i.autoplay.running)return;cancelAnimationFrame(s),y();let a=void 0===e?i.params.autoplay.delay:e;g=i.params.autoplay.delay,v=i.params.autoplay.delay;const r=(()=>{let e;if(e=i.virtual&&i.params.virtual.enabled?i.slides.filter((e=>e.classList.contains("swiper-slide-active")))[0]:i.slides[i.activeIndex],!e)return;return parseInt(e.getAttribute("data-swiper-autoplay"),10)})();!Number.isNaN(r)&&r>0&&void 0===e&&(a=r,g=r,v=r),d=a;const n=i.params.speed,o=()=>{i&&!i.destroyed&&(i.params.autoplay.reverseDirection?!i.isBeginning||i.params.loop||i.params.rewind?(i.slidePrev(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(i.slides.length-1,n,!0,!0),l("autoplay")):!i.isEnd||i.params.loop||i.params.rewind?(i.slideNext(n,!0,!0),l("autoplay")):i.params.autoplay.stopOnLastSlide||(i.slideTo(0,n,!0,!0),l("autoplay")),i.params.cssMode&&(w=(new Date).getTime(),requestAnimationFrame((()=>{E()}))))};return a>0?(clearTimeout(t),t=setTimeout((()=>{o()}),a)):requestAnimationFrame((()=>{o()})),a},x=()=>{i.autoplay.running=!0,E(),l("autoplayStart")},S=()=>{i.autoplay.running=!1,clearTimeout(t),cancelAnimationFrame(s),l("autoplayStop")},T=(e,s)=>{if(i.destroyed||!i.autoplay.running)return;clearTimeout(t),e||(f=!0);const a=()=>{l("autoplayPause"),i.params.autoplay.waitForTransition?i.wrapperEl.addEventListener("transitionend",b):M()};if(i.autoplay.paused=!0,s)return h&&(d=i.params.autoplay.delay),h=!1,void a();const r=d||i.params.autoplay.delay;d=r-((new Date).getTime()-w),i.isEnd&&d<0&&!i.params.loop||(d<0&&(d=0),a())},M=()=>{i.isEnd&&d<0&&!i.params.loop||i.destroyed||!i.autoplay.running||(w=(new Date).getTime(),f?(f=!1,E(d)):E(),i.autoplay.paused=!1,l("autoplayResume"))},C=()=>{if(i.destroyed||!i.autoplay.running)return;const e=a();"hidden"===e.visibilityState&&(f=!0,T(!0)),"visible"===e.visibilityState&&M()},P=e=>{"mouse"===e.pointerType&&(f=!0,T(!0))},L=e=>{"mouse"===e.pointerType&&i.autoplay.paused&&M()};n("init",(()=>{i.params.autoplay.enabled&&(i.params.autoplay.pauseOnMouseEnter&&(i.el.addEventListener("pointerenter",P),i.el.addEventListener("pointerleave",L)),a().addEventListener("visibilitychange",C),w=(new Date).getTime(),x())})),n("destroy",(()=>{i.el.removeEventListener("pointerenter",P),i.el.removeEventListener("pointerleave",L),a().removeEventListener("visibilitychange",C),i.autoplay.running&&S()})),n("beforeTransitionStart",((e,t,s)=>{!i.destroyed&&i.autoplay.running&&(s||!i.params.autoplay.disableOnInteraction?T(!0,!0):S())})),n("sliderFirstMove",(()=>{!i.destroyed&&i.autoplay.running&&(i.params.autoplay.disableOnInteraction?S():(p=!0,u=!1,f=!1,m=setTimeout((()=>{f=!0,u=!0,T(!0)}),200)))})),n("touchEnd",(()=>{if(!i.destroyed&&i.autoplay.running&&p){if(clearTimeout(m),clearTimeout(t),i.params.autoplay.disableOnInteraction)return u=!1,void(p=!1);u&&i.params.cssMode&&M(),u=!1,p=!1}})),n("slideChange",(()=>{!i.destroyed&&i.autoplay.running&&(h=!0)})),Object.assign(i.autoplay,{start:x,stop:S,pause:T,resume:M})},function(e){let{swiper:t,extendParams:s,on:i}=e;s({thumbs:{swiper:null,multipleActiveThumbs:!0,autoScrollOffset:0,slideThumbActiveClass:"swiper-slide-thumb-active",thumbsContainerClass:"swiper-thumbs"}});let r=!1,n=!1;function l(){const e=t.thumbs.swiper;if(!e||e.destroyed)return;const s=e.clickedIndex,a=e.clickedSlide;if(a&&a.classList.contains(t.params.thumbs.slideThumbActiveClass))return;if(null==s)return;let i;i=e.params.loop?parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10):s,t.params.loop?t.slideToLoop(i):t.slideTo(i)}function o(){const{thumbs:e}=t.params;if(r)return!1;r=!0;const s=t.constructor;if(e.swiper instanceof s)t.thumbs.swiper=e.swiper,Object.assign(t.thumbs.swiper.originalParams,{watchSlidesProgress:!0,slideToClickedSlide:!1}),Object.assign(t.thumbs.swiper.params,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper.update();else if(d(e.swiper)){const a=Object.assign({},e.swiper);Object.assign(a,{watchSlidesProgress:!0,slideToClickedSlide:!1}),t.thumbs.swiper=new s(a),n=!0}return t.thumbs.swiper.el.classList.add(t.params.thumbs.thumbsContainerClass),t.thumbs.swiper.on("tap",l),!0}function c(e){const s=t.thumbs.swiper;if(!s||s.destroyed)return;const a="auto"===s.params.slidesPerView?s.slidesPerViewDynamic():s.params.slidesPerView;let i=1;const r=t.params.thumbs.slideThumbActiveClass;if(t.params.slidesPerView>1&&!t.params.centeredSlides&&(i=t.params.slidesPerView),t.params.thumbs.multipleActiveThumbs||(i=1),i=Math.floor(i),s.slides.forEach((e=>e.classList.remove(r))),s.params.loop||s.params.virtual&&s.params.virtual.enabled)for(let e=0;e<i;e+=1)f(s.slidesEl,`[data-swiper-slide-index="${t.realIndex+e}"]`).forEach((e=>{e.classList.add(r)}));else for(let e=0;e<i;e+=1)s.slides[t.realIndex+e]&&s.slides[t.realIndex+e].classList.add(r);const n=t.params.thumbs.autoScrollOffset,l=n&&!s.params.loop;if(t.realIndex!==s.realIndex||l){const i=s.activeIndex;let r,o;if(s.params.loop){const e=s.slides.filter((e=>e.getAttribute("data-swiper-slide-index")===`${t.realIndex}`))[0];r=s.slides.indexOf(e),o=t.activeIndex>t.previousIndex?"next":"prev"}else r=t.realIndex,o=r>t.previousIndex?"next":"prev";l&&(r+="next"===o?n:-1*n),s.visibleSlidesIndexes&&s.visibleSlidesIndexes.indexOf(r)<0&&(s.params.centeredSlides?r=r>i?r-Math.floor(a/2)+1:r+Math.floor(a/2)-1:r>i&&s.params.slidesPerGroup,s.slideTo(r,e?0:void 0))}}t.thumbs={swiper:null},i("beforeInit",(()=>{const{thumbs:e}=t.params;if(e&&e.swiper)if("string"==typeof e.swiper||e.swiper instanceof HTMLElement){const s=a(),i=()=>{const a="string"==typeof e.swiper?s.querySelector(e.swiper):e.swiper;if(a&&a.swiper)e.swiper=a.swiper,o(),c(!0);else if(a){const s=i=>{e.swiper=i.detail[0],a.removeEventListener("init",s),o(),c(!0),e.swiper.update(),t.update()};a.addEventListener("init",s)}return a},r=()=>{if(t.destroyed)return;i()||requestAnimationFrame(r)};requestAnimationFrame(r)}else o(),c(!0)})),i("slideChange update resize observerUpdate",(()=>{c()})),i("setTransition",((e,s)=>{const a=t.thumbs.swiper;a&&!a.destroyed&&a.setTransition(s)})),i("beforeDestroy",(()=>{const e=t.thumbs.swiper;e&&!e.destroyed&&n&&e.destroy()})),Object.assign(t.thumbs,{init:o,update:c})},function(e){let{swiper:t,extendParams:s,emit:a,once:i}=e;s({freeMode:{enabled:!1,momentum:!0,momentumRatio:1,momentumBounce:!0,momentumBounceRatio:1,momentumVelocityRatio:1,sticky:!1,minimumVelocity:.02}}),Object.assign(t,{freeMode:{onTouchStart:function(){const e=t.getTranslate();t.setTranslate(e),t.setTransition(0),t.touchEventsData.velocities.length=0,t.freeMode.onTouchEnd({currentPos:t.rtl?t.translate:-t.translate})},onTouchMove:function(){const{touchEventsData:e,touches:s}=t;0===e.velocities.length&&e.velocities.push({position:s[t.isHorizontal()?"startX":"startY"],time:e.touchStartTime}),e.velocities.push({position:s[t.isHorizontal()?"currentX":"currentY"],time:l()})},onTouchEnd:function(e){let{currentPos:s}=e;const{params:r,wrapperEl:n,rtlTranslate:o,snapGrid:d,touchEventsData:c}=t,p=l()-c.touchStartTime;if(s<-t.minTranslate())t.slideTo(t.activeIndex);else if(s>-t.maxTranslate())t.slides.length<d.length?t.slideTo(d.length-1):t.slideTo(t.slides.length-1);else{if(r.freeMode.momentum){if(c.velocities.length>1){const e=c.velocities.pop(),s=c.velocities.pop(),a=e.position-s.position,i=e.time-s.time;t.velocity=a/i,t.velocity/=2,Math.abs(t.velocity)<r.freeMode.minimumVelocity&&(t.velocity=0),(i>150||l()-e.time>300)&&(t.velocity=0)}else t.velocity=0;t.velocity*=r.freeMode.momentumVelocityRatio,c.velocities.length=0;let e=1e3*r.freeMode.momentumRatio;const s=t.velocity*e;let p=t.translate+s;o&&(p=-p);let u,m=!1;const h=20*Math.abs(t.velocity)*r.freeMode.momentumBounceRatio;let f;if(p<t.maxTranslate())r.freeMode.momentumBounce?(p+t.maxTranslate()<-h&&(p=t.maxTranslate()-h),u=t.maxTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.maxTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(p>t.minTranslate())r.freeMode.momentumBounce?(p-t.minTranslate()>h&&(p=t.minTranslate()+h),u=t.minTranslate(),m=!0,c.allowMomentumBounce=!0):p=t.minTranslate(),r.loop&&r.centeredSlides&&(f=!0);else if(r.freeMode.sticky){let e;for(let t=0;t<d.length;t+=1)if(d[t]>-p){e=t;break}p=Math.abs(d[e]-p)<Math.abs(d[e-1]-p)||"next"===t.swipeDirection?d[e]:d[e-1],p=-p}if(f&&i("transitionEnd",(()=>{t.loopFix()})),0!==t.velocity){if(e=o?Math.abs((-p-t.translate)/t.velocity):Math.abs((p-t.translate)/t.velocity),r.freeMode.sticky){const s=Math.abs((o?-p:p)-t.translate),a=t.slidesSizesGrid[t.activeIndex];e=s<a?r.speed:s<2*a?1.5*r.speed:2.5*r.speed}}else if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode.momentumBounce&&m?(t.updateProgress(u),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating=!0,E(n,(()=>{t&&!t.destroyed&&c.allowMomentumBounce&&(a("momentumBounce"),t.setTransition(r.speed),setTimeout((()=>{t.setTranslate(u),E(n,(()=>{t&&!t.destroyed&&t.transitionEnd()}))}),0))}))):t.velocity?(a("_freeModeNoMomentumRelease"),t.updateProgress(p),t.setTransition(e),t.setTranslate(p),t.transitionStart(!0,t.swipeDirection),t.animating||(t.animating=!0,E(n,(()=>{t&&!t.destroyed&&t.transitionEnd()})))):t.updateProgress(p),t.updateActiveIndex(),t.updateSlidesClasses()}else{if(r.freeMode.sticky)return void t.slideToClosest();r.freeMode&&a("_freeModeNoMomentumRelease")}(!r.freeMode.momentum||p>=r.longSwipesMs)&&(t.updateProgress(),t.updateActiveIndex(),t.updateSlidesClasses())}}}})},function(e){let t,s,a,{swiper:i,extendParams:r}=e;r({grid:{rows:1,fill:"column"}}),i.grid={initSlides:e=>{const{slidesPerView:r}=i.params,{rows:n,fill:l}=i.params.grid;s=t/n,a=Math.floor(e/n),t=Math.floor(e/n)===e/n?e:Math.ceil(e/n)*n,"auto"!==r&&"row"===l&&(t=Math.max(t,r*n))},updateSlide:(e,r,n,l)=>{const{slidesPerGroup:o,spaceBetween:d}=i.params,{rows:c,fill:p}=i.params.grid;let u,m,h;if("row"===p&&o>1){const s=Math.floor(e/(o*c)),a=e-c*o*s,i=0===s?o:Math.min(Math.ceil((n-s*c*o)/c),o);h=Math.floor(a/i),m=a-h*i+s*o,u=m+h*t/c,r.style.order=u}else"column"===p?(m=Math.floor(e/c),h=e-m*c,(m>a||m===a&&h===c-1)&&(h+=1,h>=c&&(h=0,m+=1))):(h=Math.floor(e/s),m=e-h*s);r.style[l("margin-top")]=0!==h?d&&`${d}px`:""},updateWrapperSize:(e,s,a)=>{const{spaceBetween:r,centeredSlides:n,roundLengths:l}=i.params,{rows:o}=i.params.grid;if(i.virtualSize=(e+r)*t,i.virtualSize=Math.ceil(i.virtualSize/o)-r,i.wrapperEl.style[a("width")]=`${i.virtualSize+r}px`,n){const e=[];for(let t=0;t<s.length;t+=1){let a=s[t];l&&(a=Math.floor(a)),s[t]<i.virtualSize+s[0]&&e.push(a)}s.splice(0,s.length),s.push(...e)}}}},function(e){let{swiper:t}=e;Object.assign(t,{appendSlide:te.bind(t),prependSlide:se.bind(t),addSlide:ae.bind(t),removeSlide:ie.bind(t),removeAllSlides:re.bind(t)})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({fadeEffect:{crossFade:!1}}),ne({effect:"fade",swiper:t,on:a,setTranslate:()=>{const{slides:e}=t;t.params.fadeEffect;for(let s=0;s<e.length;s+=1){const e=t.slides[s];let a=-e.swiperSlideOffset;t.params.virtualTranslate||(a-=t.translate);let i=0;t.isHorizontal()||(i=a,a=0);const r=t.params.fadeEffect.crossFade?Math.max(1-Math.abs(e.progress),0):1+Math.min(Math.max(e.progress,-1),0),n=le(0,e);n.style.opacity=r,n.style.transform=`translate3d(${a}px, ${i}px, 0px)`}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`})),oe({swiper:t,duration:e,transformElements:s,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cubeEffect:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94}});const i=(e,t,s)=>{let a=s?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),i=s?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");a||(a=g("div","swiper-slide-shadow-"+(s?"left":"top")),e.append(a)),i||(i=g("div","swiper-slide-shadow-"+(s?"right":"bottom")),e.append(i)),a&&(a.style.opacity=Math.max(-t,0)),i&&(i.style.opacity=Math.max(t,0))};ne({effect:"cube",swiper:t,on:a,setTranslate:()=>{const{el:e,wrapperEl:s,slides:a,width:r,height:n,rtlTranslate:l,size:o,browser:d}=t,c=t.params.cubeEffect,p=t.isHorizontal(),u=t.virtual&&t.params.virtual.enabled;let m,h=0;c.shadow&&(p?(m=t.slidesEl.querySelector(".swiper-cube-shadow"),m||(m=g("div","swiper-cube-shadow"),t.slidesEl.append(m)),m.style.height=`${r}px`):(m=e.querySelector(".swiper-cube-shadow"),m||(m=g("div","swiper-cube-shadow"),e.append(m))));for(let e=0;e<a.length;e+=1){const t=a[e];let s=e;u&&(s=parseInt(t.getAttribute("data-swiper-slide-index"),10));let r=90*s,n=Math.floor(r/360);l&&(r=-r,n=Math.floor(-r/360));const d=Math.max(Math.min(t.progress,1),-1);let m=0,f=0,g=0;s%4==0?(m=4*-n*o,g=0):(s-1)%4==0?(m=0,g=4*-n*o):(s-2)%4==0?(m=o+4*n*o,g=o):(s-3)%4==0&&(m=-o,g=3*o+4*o*n),l&&(m=-m),p||(f=m,m=0);const v=`rotateX(${p?0:-r}deg) rotateY(${p?r:0}deg) translate3d(${m}px, ${f}px, ${g}px)`;d<=1&&d>-1&&(h=90*s+90*d,l&&(h=90*-s-90*d)),t.style.transform=v,c.slideShadows&&i(t,d,p)}if(s.style.transformOrigin=`50% 50% -${o/2}px`,s.style["-webkit-transform-origin"]=`50% 50% -${o/2}px`,c.shadow)if(p)m.style.transform=`translate3d(0px, ${r/2+c.shadowOffset}px, ${-r/2}px) rotateX(90deg) rotateZ(0deg) scale(${c.shadowScale})`;else{const e=Math.abs(h)-90*Math.floor(Math.abs(h)/90),t=1.5-(Math.sin(2*e*Math.PI/360)/2+Math.cos(2*e*Math.PI/360)/2),s=c.shadowScale,a=c.shadowScale/t,i=c.shadowOffset;m.style.transform=`scale3d(${s}, 1, ${a}) translate3d(0px, ${n/2+i}px, ${-n/2/a}px) rotateX(-90deg)`}const f=(d.isSafari||d.isWebView)&&d.needPerspectiveFix?-o/2:0;s.style.transform=`translate3d(0px,0,${f}px) rotateX(${t.isHorizontal()?0:h}deg) rotateY(${t.isHorizontal()?-h:0}deg)`,s.style.setProperty("--swiper-cube-translate-z",`${f}px`)},setTransition:e=>{const{el:s,slides:a}=t;if(a.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),t.params.cubeEffect.shadow&&!t.isHorizontal()){const t=s.querySelector(".swiper-cube-shadow");t&&(t.style.transitionDuration=`${e}ms`)}},recreateShadows:()=>{const e=t.isHorizontal();t.slides.forEach((t=>{const s=Math.max(Math.min(t.progress,1),-1);i(t,s,e)}))},getEffectParams:()=>t.params.cubeEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,resistanceRatio:0,spaceBetween:0,centeredSlides:!1,virtualTranslate:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({flipEffect:{slideShadows:!0,limitRotation:!0}});const i=(e,s,a)=>{let i=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-left"):e.querySelector(".swiper-slide-shadow-top"),r=t.isHorizontal()?e.querySelector(".swiper-slide-shadow-right"):e.querySelector(".swiper-slide-shadow-bottom");i||(i=de(0,e,t.isHorizontal()?"left":"top")),r||(r=de(0,e,t.isHorizontal()?"right":"bottom")),i&&(i.style.opacity=Math.max(-s,0)),r&&(r.style.opacity=Math.max(s,0))};ne({effect:"flip",swiper:t,on:a,setTranslate:()=>{const{slides:e,rtlTranslate:s}=t,a=t.params.flipEffect;for(let r=0;r<e.length;r+=1){const n=e[r];let l=n.progress;t.params.flipEffect.limitRotation&&(l=Math.max(Math.min(n.progress,1),-1));const o=n.swiperSlideOffset;let d=-180*l,c=0,p=t.params.cssMode?-o-t.translate:-o,u=0;t.isHorizontal()?s&&(d=-d):(u=p,p=0,c=-d,d=0),n.style.zIndex=-Math.abs(Math.round(l))+e.length,a.slideShadows&&i(n,l);const m=`translate3d(${p}px, ${u}px, 0px) rotateX(${c}deg) rotateY(${d}deg)`;le(0,n).style.transform=m}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),oe({swiper:t,duration:e,transformElements:s})},recreateShadows:()=>{t.params.flipEffect;t.slides.forEach((e=>{let s=e.progress;t.params.flipEffect.limitRotation&&(s=Math.max(Math.min(e.progress,1),-1)),i(e,s)}))},getEffectParams:()=>t.params.flipEffect,perspective:()=>!0,overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({coverflowEffect:{rotate:50,stretch:0,depth:100,scale:1,modifier:1,slideShadows:!0}}),ne({effect:"coverflow",swiper:t,on:a,setTranslate:()=>{const{width:e,height:s,slides:a,slidesSizesGrid:i}=t,r=t.params.coverflowEffect,n=t.isHorizontal(),l=t.translate,o=n?e/2-l:s/2-l,d=n?r.rotate:-r.rotate,c=r.depth;for(let e=0,t=a.length;e<t;e+=1){const t=a[e],s=i[e],l=(o-t.swiperSlideOffset-s/2)/s,p="function"==typeof r.modifier?r.modifier(l):l*r.modifier;let u=n?d*p:0,m=n?0:d*p,h=-c*Math.abs(p),f=r.stretch;"string"==typeof f&&-1!==f.indexOf("%")&&(f=parseFloat(r.stretch)/100*s);let g=n?0:f*p,v=n?f*p:0,w=1-(1-r.scale)*Math.abs(p);Math.abs(v)<.001&&(v=0),Math.abs(g)<.001&&(g=0),Math.abs(h)<.001&&(h=0),Math.abs(u)<.001&&(u=0),Math.abs(m)<.001&&(m=0),Math.abs(w)<.001&&(w=0);const b=`translate3d(${v}px,${g}px,${h}px)  rotateX(${m}deg) rotateY(${u}deg) scale(${w})`;if(le(0,t).style.transform=b,t.style.zIndex=1-Math.abs(Math.round(p)),r.slideShadows){let e=n?t.querySelector(".swiper-slide-shadow-left"):t.querySelector(".swiper-slide-shadow-top"),s=n?t.querySelector(".swiper-slide-shadow-right"):t.querySelector(".swiper-slide-shadow-bottom");e||(e=de(0,t,n?"left":"top")),s||(s=de(0,t,n?"right":"bottom")),e&&(e.style.opacity=p>0?p:0),s&&(s.style.opacity=-p>0?-p:0)}}},setTransition:e=>{t.slides.map((e=>h(e))).forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach((t=>{t.style.transitionDuration=`${e}ms`}))}))},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({creativeEffect:{limitProgress:1,shadowPerProgress:!1,progressMultiplier:1,perspective:!0,prev:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1},next:{translate:[0,0,0],rotate:[0,0,0],opacity:1,scale:1}}});const i=e=>"string"==typeof e?e:`${e}px`;ne({effect:"creative",swiper:t,on:a,setTranslate:()=>{const{slides:e,wrapperEl:s,slidesSizesGrid:a}=t,r=t.params.creativeEffect,{progressMultiplier:n}=r,l=t.params.centeredSlides;if(l){const e=a[0]/2-t.params.slidesOffsetBefore||0;s.style.transform=`translateX(calc(50% - ${e}px))`}for(let s=0;s<e.length;s+=1){const a=e[s],o=a.progress,d=Math.min(Math.max(a.progress,-r.limitProgress),r.limitProgress);let c=d;l||(c=Math.min(Math.max(a.originalProgress,-r.limitProgress),r.limitProgress));const p=a.swiperSlideOffset,u=[t.params.cssMode?-p-t.translate:-p,0,0],m=[0,0,0];let h=!1;t.isHorizontal()||(u[1]=u[0],u[0]=0);let f={translate:[0,0,0],rotate:[0,0,0],scale:1,opacity:1};d<0?(f=r.next,h=!0):d>0&&(f=r.prev,h=!0),u.forEach(((e,t)=>{u[t]=`calc(${e}px + (${i(f.translate[t])} * ${Math.abs(d*n)}))`})),m.forEach(((e,t)=>{m[t]=f.rotate[t]*Math.abs(d*n)})),a.style.zIndex=-Math.abs(Math.round(o))+e.length;const g=u.join(", "),v=`rotateX(${m[0]}deg) rotateY(${m[1]}deg) rotateZ(${m[2]}deg)`,w=c<0?`scale(${1+(1-f.scale)*c*n})`:`scale(${1-(1-f.scale)*c*n})`,b=c<0?1+(1-f.opacity)*c*n:1-(1-f.opacity)*c*n,y=`translate3d(${g}) ${v} ${w}`;if(h&&f.shadow||!h){let e=a.querySelector(".swiper-slide-shadow");if(!e&&f.shadow&&(e=de(0,a)),e){const t=r.shadowPerProgress?d*(1/r.limitProgress):d;e.style.opacity=Math.min(Math.max(Math.abs(t),0),1)}}const E=le(0,a);E.style.transform=y,E.style.opacity=b,f.origin&&(E.style.transformOrigin=f.origin)}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),oe({swiper:t,duration:e,transformElements:s,allSlides:!0})},perspective:()=>t.params.creativeEffect.perspective,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})},function(e){let{swiper:t,extendParams:s,on:a}=e;s({cardsEffect:{slideShadows:!0,rotate:!0,perSlideRotate:2,perSlideOffset:8}}),ne({effect:"cards",swiper:t,on:a,setTranslate:()=>{const{slides:e,activeIndex:s}=t,a=t.params.cardsEffect,{startTranslate:i,isTouched:r}=t.touchEventsData,n=t.translate;for(let l=0;l<e.length;l+=1){const o=e[l],d=o.progress,c=Math.min(Math.max(d,-4),4);let p=o.swiperSlideOffset;t.params.centeredSlides&&!t.params.cssMode&&(t.wrapperEl.style.transform=`translateX(${t.minTranslate()}px)`),t.params.centeredSlides&&t.params.cssMode&&(p-=e[0].swiperSlideOffset);let u=t.params.cssMode?-p-t.translate:-p,m=0;const h=-100*Math.abs(c);let f=1,g=-a.perSlideRotate*c,v=a.perSlideOffset-.75*Math.abs(c);const w=t.virtual&&t.params.virtual.enabled?t.virtual.from+l:l,b=(w===s||w===s-1)&&c>0&&c<1&&(r||t.params.cssMode)&&n<i,y=(w===s||w===s+1)&&c<0&&c>-1&&(r||t.params.cssMode)&&n>i;if(b||y){const e=(1-Math.abs((Math.abs(c)-.5)/.5))**.5;g+=-28*c*e,f+=-.5*e,v+=96*e,m=-25*e*Math.abs(c)+"%"}if(u=c<0?`calc(${u}px + (${v*Math.abs(c)}%))`:c>0?`calc(${u}px + (-${v*Math.abs(c)}%))`:`${u}px`,!t.isHorizontal()){const e=m;m=u,u=e}const E=c<0?""+(1+(1-f)*c):""+(1-(1-f)*c),x=`\n        translate3d(${u}, ${m}, ${h}px)\n        rotateZ(${a.rotate?g:0}deg)\n        scale(${E})\n      `;if(a.slideShadows){let e=o.querySelector(".swiper-slide-shadow");e||(e=de(0,o)),e&&(e.style.opacity=Math.min(Math.max((Math.abs(c)-.5)/.5,0),1))}o.style.zIndex=-Math.abs(Math.round(d))+e.length;le(0,o).style.transform=x}},setTransition:e=>{const s=t.slides.map((e=>h(e)));s.forEach((t=>{t.style.transitionDuration=`${e}ms`,t.querySelectorAll(".swiper-slide-shadow").forEach((t=>{t.style.transitionDuration=`${e}ms`}))})),oe({swiper:t,duration:e,transformElements:s})},perspective:()=>!0,overwriteParams:()=>({watchSlidesProgress:!0,virtualTranslate:!t.params.cssMode})})}];return Q.use(ce),Q}));
//# sourceMappingURL=swiper-bundle.min.js.map
