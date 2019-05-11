parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A8+V":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var i,s=1,e=arguments.length;s<e;s++)for(var a in i=arguments[s])Object.prototype.hasOwnProperty.call(i,a)&&(t[a]=i[a]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var i=function(){function i(i){var s,e=this;this.canvas=i,this.tool="start",this.marks=[],this.padding={t:40,r:40,b:50,l:100},this.scale=1,this.offset=this.padding.l,this.ctx=this.canvas.getContext("2d"),this.canvas.onwheel=function(t){t.preventDefault();var i=e.scale*e.canvas.width,s=-1*t.deltaY/100;e.scale=Math.max(1,e.scale+s);var a=e.getMousePosition(t),n=e.scale*e.canvas.width,h=(-1*e.offset+a.x)/i;e.offset=-1*(h*n-a.x),e.offset=Math.min(e.offset,e.canvas.width/2),e.offset=Math.max(e.offset,-1*e.scale*e.canvas.width+e.canvas.width/2),e.render()},this.canvas.onmousedown=function(i){if("move"===e.tool||i.ctrlKey)s=e.getMousePosition(i);else if(void 0!==e.selectionIndex){var a=e.data.values[e.selectionIndex],n="start"===e.tool?"start":"end",h=e.marks.findIndex(function(t){return t.index===e.selectionIndex&&t.type===n});h>-1?e.marks.splice(h,1):e.marks.push(t({type:n,index:e.selectionIndex},a)),e.marks.sort(function(t,i){return t.index>i.index?1:t.index===i.index&&"end"===t.type?-1:t.index===i.index&&"start"===t.type?1:-1}),e.render(),e.onMarksUpdated&&e.onMarksUpdated(e.marks)}},this.canvas.onmouseup=function(){s=void 0},this.canvas.onmouseout=function(){s=void 0},this.canvas.onmousemove=function(t){if(s){var i=e.getMousePosition(t);e.offset+=i.x-s.x,e.offset=Math.min(e.offset,e.canvas.width/2),e.offset=Math.max(e.offset,-1*e.scale*e.canvas.width+e.canvas.width/2),s=i,e.render()}else{var a=e.getMousePosition(t),n=(-1*e.offset+a.x)/(e.scale*(e.canvas.width-e.padding.l-e.padding.r));if(e.timeRange){e.selectionTime=e.min.time+e.timeRange*n,e.selectionIndex=void 0;for(var h=0;h<e.data.values.length&&e.data.values[h].time<e.selectionTime;h++)e.selectionIndex=h}e.render()}}}return i.prototype.setData=function(t){this.data=t,this.minTime=this.data.values[0].time,this.maxTime=this.data.values[this.data.values.length-1].time,this.timeRange=this.maxTime-this.minTime;for(var i=0,s=this.data.values;i<s.length;i++){var e=s[i];(!this.min||this.min.signal>e.signal)&&(this.min=e),(!this.max||this.max.signal<e.signal)&&(this.max=e)}this.range=this.max.signal-this.min.signal,this.render()},i.prototype.setTool=function(t){this.tool=t,this.selectionIndex=void 0,this.selectionTime=void 0},i.prototype.render=function(){this.clear(),this.data&&(this.renderData(),this.renderAxis())},i.prototype.renderData=function(){var t,i,s,e,a=this.scale*(this.canvas.width-this.padding.l-this.padding.r),n=this.canvas.height-this.padding.b-this.padding.t,h=a/this.timeRange,o=n/this.range;this.ctx.strokeStyle="#000",this.ctx.lineWidth=.8,this.ctx.beginPath();for(var d=0;d<this.data.values.length;d++){var c=this.data.values[d],l=this.offset+(c.time-this.minTime)*h,r=this.padding.t+n-(c.signal-this.min.signal)*o;l>0&&(t?this.ctx.lineTo(l,r):this.ctx.moveTo(l,r),t=c.time,d===this.selectionIndex&&(i=l,s=r))}this.ctx.stroke(),"move"!==this.tool&&(this.ctx.lineWidth=1.2,this.ctx.beginPath(),this.ctx.moveTo(i,s),"start"===this.tool?this.ctx.lineTo(i,s+15):"end"===this.tool&&this.ctx.lineTo(i,s-15),this.ctx.stroke());for(var x=0,g=this.marks;x<g.length;x++){var v=g[x];l=this.offset+(v.time-this.minTime)*h,r=this.padding.t+n-(v.signal-this.min.signal)*o;this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(l,r),"start"===v.type?(this.ctx.strokeStyle="#0fbe05",this.ctx.lineTo(l,r+10)):"end"===v.type&&(this.ctx.strokeStyle="#d00",this.ctx.lineTo(l,r-10)),this.ctx.stroke()}for(d=0;d<this.marks.length;d++){v=this.marks[d],l=this.offset+(v.time-this.minTime)*h,r=this.padding.t+n-(v.signal-this.min.signal)*o;"start"!==v.type||e?"end"===v.type&&e&&(this.ctx.lineWidth=1,this.ctx.strokeStyle="#777",this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(l,r),this.ctx.stroke(),e=void 0):e={x:l,y:r}}this.ctx.fillStyle="rgba(255,255,255,1)",this.ctx.fillRect(0,0,this.padding.l,this.canvas.height)},i.prototype.renderAxis=function(){var t=this.scale*(this.canvas.width-this.padding.l-this.padding.r),i=this.canvas.height-this.padding.b-this.padding.t,s=t/this.timeRange,e=i/this.range;this.ctx.font="12px sans-serif",this.ctx.fillStyle="#000",this.ctx.strokeStyle="#777",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(this.padding.l-.5,this.padding.t),this.ctx.lineTo(this.padding.l-.5,this.canvas.height-this.padding.b+.5),this.ctx.lineTo(this.canvas.width-this.padding.r,this.canvas.height-this.padding.b+.5),this.ctx.stroke(),this.ctx.textAlign="right",this.ctx.textBaseline="bottom",this.ctx.fillText(this.data.headers.signal.trim(),this.padding.l,this.padding.t-5),this.ctx.textAlign="right",this.ctx.textBaseline="top",this.ctx.fillText(this.data.headers.time.trim(),this.canvas.width-this.padding.r,this.canvas.height-this.padding.b+25),this.ctx.textAlign="center",this.ctx.textBaseline="top";for(var a=0;a<this.maxTime;a++){var n=this.offset+(a-this.minTime)*s;n>=this.padding.l&&n<=this.canvas.width-this.padding.r&&(n=Math.floor(n)+.5,this.ctx.beginPath(),this.ctx.moveTo(n,this.canvas.height-this.padding.b),this.ctx.lineTo(n,this.canvas.height-this.padding.b+5),this.ctx.stroke(),this.ctx.fillText(a.toString(),n,this.canvas.height-this.padding.b+10))}this.ctx.textAlign="right",this.ctx.textBaseline="middle";for(var h=Math.floor(this.min.signal);h<this.max.signal;h+=.5){var o=this.padding.t+i-(h-this.min.signal)*e;o<=this.canvas.height-this.padding.b&&(o=Math.floor(o)+.5,this.ctx.beginPath(),this.ctx.moveTo(this.padding.l,o),this.ctx.lineTo(this.padding.l-5,o),this.ctx.stroke(),this.ctx.fillText(h.toFixed(1),this.padding.l-10,o))}},i.prototype.clear=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},i.prototype.getMousePosition=function(t){var i=this.canvas.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}},i}();exports.Chart=i;
},{}],"kZnd":[function(require,module,exports) {
module.exports="19_05_10_01.4d9db43c.txt";
},{}],"t+Fr":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(a,i){function o(t){try{l(r.next(t))}catch(e){i(e)}}function u(t){try{l(r.throw(t))}catch(e){i(e)}}function l(t){t.done?a(t.value):new n(function(e){e(t.value)}).then(o,u)}l((r=r.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function u(i){return function(u){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return o.label++,{value:i[1],done:!1};case 5:o.label++,r=i[1],i=[0];continue;case 7:i=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){o=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){o.label=i[1];break}if(6===i[0]&&o.label<a[1]){o.label=a[1],a=i;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(i);break}a[2]&&o.ops.pop(),o.trys.pop();continue}i=e.call(t,o)}catch(u){i=[6,u],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,u])}}},n=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var r=n(require("../data/19_05_10_01.txt"));function a(){return t(this,void 0,Promise,function(){return e(this,function(t){switch(t.label){case 0:return[4,fetch(r.default)];case 1:return[4,t.sent().text()];case 2:return[2,i(t.sent())]}})})}function i(t){for(var e=t.split("\n"),n=0;!e[n].includes("# data plots");)n++;var r=e[++n].split(";"),a={headers:{time:r[0].trim(),signal:r[1].trim()},values:[]};for(n++;!e[n].includes("#");)a.values.push(o(e[n])),n++;return a}function o(t){var e=t.replace(/,/g,".").split(";");return{time:parseFloat(e[0]),signal:parseFloat(e[1])}}exports.getData=a;
},{"../data/19_05_10_01.txt":"kZnd"}],"432T":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=function(){function e(e){this.target=e}return e.prototype.update=function(e){console.log(e)},e}();exports.Table=e;
},{}],"8UFg":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(a,s){function o(t){try{c(r.next(t))}catch(e){s(e)}}function i(t){try{c(r.throw(t))}catch(e){s(e)}}function c(t){t.done?a(t.value):new n(function(e){e(t.value)}).then(o,i)}c((r=r.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,r,a,s,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return s={next:i(0),throw:i(1),return:i(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function i(s){return function(i){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!(a=(a=o.trys).length>0&&a[a.length-1])&&(6===s[0]||2===s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=e.call(t,o)}catch(i){s=[6,i],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,i])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./Chart"),r=require("./Data"),a=require("./Table"),s=function(){function s(){var t=this;this.marks=[],this.createUI(),this.chart=new n.Chart(this.canvas),this.table=new a.Table(this.tableWrapper),this.chart.onMarksUpdated=function(e){t.marks=e,t.table.update(t.marks)},window.onresize=function(){t.resize(),t.chart.render()},this.resize(),this.run()}return s.prototype.updateTable=function(){console.log(this.marks)},s.prototype.createUI=function(){var t=this;document.body.insertAdjacentHTML("afterbegin",'\n            <canvas id="chart"></canvas>\n            <div id="table"></div>\n            <div id="controls">\n                <button id="start" class="selected">Start</button>\n                <button id="end">End</button>\n                <button id="move">Move (or hold Ctrl)</button>\n            </div>\n        '),this.canvas=document.getElementById("chart"),this.tableWrapper=document.getElementById("table"),this.controlsWrapper=document.getElementById("controls");var e=document.getElementById("start"),n=document.getElementById("end"),r=document.getElementById("move");e.onclick=function(){e.classList.add("selected"),n.classList.remove("selected"),r.classList.remove("selected"),t.chart.setTool("start")},n.onclick=function(){n.classList.add("selected"),e.classList.remove("selected"),r.classList.remove("selected"),t.chart.setTool("end")},r.onclick=function(){r.classList.add("selected"),e.classList.remove("selected"),n.classList.remove("selected"),t.chart.setTool("move")}},s.prototype.run=function(){return t(this,void 0,void 0,function(){var t;return e(this,function(e){switch(e.label){case 0:return[4,r.getData()];case 1:return t=e.sent(),this.chart.setData(t),[2]}})})},s.prototype.resize=function(){var t=window.innerWidth,e=window.innerHeight;this.canvas.width=t,this.canvas.height=Math.floor(e*(2/3)),this.tableWrapper.style.height=e-this.canvas.height+1+"px",this.controlsWrapper.style.height=e-this.canvas.height+1+"px"},s}();exports.App=s;
},{"./Chart":"A8+V","./Data":"t+Fr","./Table":"432T"}],"W+dL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./App"),o=document.body.querySelector("canvas");o&&o.parentNode.removeChild(o),(o=document.body.querySelector("div"))&&o.parentNode.removeChild(o),window.cancelAnimationFrame(window.anim),window.clearInterval(window.interval),window.clearTimeout(window.timeout),console.clear(),console.log(new Date),new e.App;
},{"./App":"8UFg"}]},{},["W+dL"], null)
//# sourceMappingURL=run.4c2f0ecc.js.map