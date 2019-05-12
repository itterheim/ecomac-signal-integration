parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"A8+V":[function(require,module,exports) {
"use strict";var t=this&&this.__assign||function(){return(t=Object.assign||function(t){for(var i,s=1,e=arguments.length;s<e;s++)for(var n in i=arguments[s])Object.prototype.hasOwnProperty.call(i,n)&&(t[n]=i[n]);return t}).apply(this,arguments)};Object.defineProperty(exports,"__esModule",{value:!0});var i=function(){function i(i){var s,e=this;this.canvas=i,this.tool="start",this.marks=[],this.padding={t:40,r:40,b:50,l:100},this.scale=1,this.offset=this.padding.l,this.ctx=this.canvas.getContext("2d"),this.canvas.onwheel=function(t){t.preventDefault();var i=e.scale*e.canvas.width,s=-1*t.deltaY/100;e.scale=Math.max(1,e.scale+s);var n=e.getMousePosition(t),a=e.scale*e.canvas.width,h=(-1*e.offset+n.x)/i;e.offset=-1*(h*a-n.x),e.offset=Math.min(e.offset,e.canvas.width/2),e.offset=Math.max(e.offset,-1*e.scale*e.canvas.width+e.canvas.width/2),e.render()},this.canvas.onmousedown=function(i){if("move"===e.tool||i.ctrlKey)s=e.getMousePosition(i);else if(void 0!==e.selectionIndex){var n=e.data.values[e.selectionIndex],a="start"===e.tool?"start":"end",h=e.marks.findIndex(function(t){return t.index===e.selectionIndex&&t.type===a});h>-1?e.marks.splice(h,1):e.marks.push(t({type:a,index:e.selectionIndex},n)),e.marks.sort(function(t,i){return t.index>i.index?1:t.index===i.index&&"end"===t.type?-1:t.index===i.index&&"start"===t.type?1:-1}),e.render(),e.onMarksUpdated&&e.onMarksUpdated(e.marks)}},this.canvas.onmouseup=function(){s=void 0},this.canvas.onmouseout=function(){s=void 0},this.canvas.onmousemove=function(t){if(s){var i=e.getMousePosition(t);e.offset+=i.x-s.x,e.offset=Math.min(e.offset,e.canvas.width/2),e.offset=Math.max(e.offset,-1*e.scale*e.canvas.width+e.canvas.width/2),s=i,e.render()}else{var n=e.getMousePosition(t),a=(-1*e.offset+n.x)/(e.scale*(e.canvas.width-e.padding.l-e.padding.r));if(e.timeRange){e.selectionTime=e.min.time+e.timeRange*a,e.selectionIndex=void 0;for(var h=0;h<e.data.values.length&&e.data.values[h].time<e.selectionTime;h++)e.selectionIndex=h}e.render()}},document.onkeyup=function(t){console.log(t),"KeyS"===t.code&&(e.tool="start"),"KeyE"===t.code&&(e.tool="end"),"KeyM"===t.code&&(e.tool="move"),e.render()}}return i.prototype.setData=function(t){this.data=t,this.minTime=this.data.values[0].time,this.maxTime=this.data.values[this.data.values.length-1].time,this.timeRange=this.maxTime-this.minTime;for(var i=0,s=this.data.values;i<s.length;i++){var e=s[i];(!this.min||this.min.signal>e.signal)&&(this.min=e),(!this.max||this.max.signal<e.signal)&&(this.max=e)}this.range=this.max.signal-this.min.signal,this.render()},i.prototype.setTool=function(t){this.tool=t,this.selectionIndex=void 0,this.selectionTime=void 0},i.prototype.render=function(){this.clear(),this.data&&(this.renderData(),this.renderAxis())},i.prototype.renderData=function(){var t,i,s,e,n=this.scale*(this.canvas.width-this.padding.l-this.padding.r),a=this.canvas.height-this.padding.b-this.padding.t,h=n/this.timeRange,o=a/this.range;this.ctx.strokeStyle="#000",this.ctx.lineWidth=.8,this.ctx.beginPath();for(var d=0;d<this.data.values.length;d++){var c=this.data.values[d],l=this.offset+(c.time-this.minTime)*h,r=this.padding.t+a-(c.signal-this.min.signal)*o;l>0&&(t?this.ctx.lineTo(l,r):this.ctx.moveTo(l,r),t=c.time,d===this.selectionIndex&&(i=l,s=r))}this.ctx.stroke(),"move"!==this.tool&&(this.ctx.lineWidth=1.2,this.ctx.beginPath(),this.ctx.moveTo(i,s),"start"===this.tool?this.ctx.lineTo(i,s+15):"end"===this.tool&&this.ctx.lineTo(i,s-15),this.ctx.stroke());for(var x=0,g=this.marks;x<g.length;x++){var v=g[x];l=this.offset+(v.time-this.minTime)*h,r=this.padding.t+a-(v.signal-this.min.signal)*o;this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(l,r),"start"===v.type?(this.ctx.strokeStyle="#0fbe05",this.ctx.lineTo(l,r+10)):"end"===v.type&&(this.ctx.strokeStyle="#d00",this.ctx.lineTo(l,r-10)),this.ctx.stroke()}for(d=0;d<this.marks.length;d++){v=this.marks[d],l=this.offset+(v.time-this.minTime)*h,r=this.padding.t+a-(v.signal-this.min.signal)*o;"start"!==v.type||e?"end"===v.type&&e&&(this.ctx.lineWidth=1,this.ctx.strokeStyle="#777",this.ctx.beginPath(),this.ctx.moveTo(e.x,e.y),this.ctx.lineTo(l,r),this.ctx.stroke(),e=void 0):e={x:l,y:r}}this.ctx.fillStyle="rgba(255,255,255,1)",this.ctx.fillRect(0,0,this.padding.l,this.canvas.height)},i.prototype.renderAxis=function(){var t=this.scale*(this.canvas.width-this.padding.l-this.padding.r),i=this.canvas.height-this.padding.b-this.padding.t,s=t/this.timeRange,e=i/this.range;this.ctx.font="12px sans-serif",this.ctx.fillStyle="#000",this.ctx.strokeStyle="#777",this.ctx.lineWidth=1,this.ctx.beginPath(),this.ctx.moveTo(this.padding.l-.5,this.padding.t),this.ctx.lineTo(this.padding.l-.5,this.canvas.height-this.padding.b+.5),this.ctx.lineTo(this.canvas.width-this.padding.r,this.canvas.height-this.padding.b+.5),this.ctx.stroke(),this.ctx.textAlign="right",this.ctx.textBaseline="bottom",this.ctx.fillText(this.data.headers.signal.trim(),this.padding.l,this.padding.t-5),this.ctx.textAlign="right",this.ctx.textBaseline="top",this.ctx.fillText(this.data.headers.time.trim(),this.canvas.width-this.padding.r,this.canvas.height-this.padding.b+25),this.ctx.textAlign="center",this.ctx.textBaseline="top";for(var n=0;n<this.maxTime;n++){var a=this.offset+(n-this.minTime)*s;a>=this.padding.l&&a<=this.canvas.width-this.padding.r&&(a=Math.floor(a)+.5,this.ctx.beginPath(),this.ctx.moveTo(a,this.canvas.height-this.padding.b),this.ctx.lineTo(a,this.canvas.height-this.padding.b+5),this.ctx.stroke(),this.ctx.fillText(n.toString(),a,this.canvas.height-this.padding.b+10))}this.ctx.textAlign="right",this.ctx.textBaseline="middle";for(var h=Math.floor(this.min.signal);h<this.max.signal;h+=.5){var o=this.padding.t+i-(h-this.min.signal)*e;o<=this.canvas.height-this.padding.b&&(o=Math.floor(o)+.5,this.ctx.beginPath(),this.ctx.moveTo(this.padding.l,o),this.ctx.lineTo(this.padding.l-5,o),this.ctx.stroke(),this.ctx.fillText(h.toFixed(1),this.padding.l-10,o))}},i.prototype.clear=function(){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height)},i.prototype.getMousePosition=function(t){var i=this.canvas.getBoundingClientRect();return{x:t.clientX-i.left,y:t.clientY-i.top}},i}();exports.Chart=i;
},{}],"t+Fr":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(o,i){function u(t){try{l(r.next(t))}catch(e){i(e)}}function a(t){try{l(r.throw(t))}catch(e){i(e)}}function l(t){t.done?o(t.value):new n(function(e){e(t.value)}).then(u,a)}l((r=r.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,r,o,i,u={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return i={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function a(i){return function(a){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;u;)try{if(n=1,r&&(o=2&i[0]?r.return:i[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,i[1])).done)return o;switch(r=0,o&&(i=[2&i[0],o.value]),i[0]){case 0:case 1:o=i;break;case 4:return u.label++,{value:i[1],done:!1};case 5:u.label++,r=i[1],i=[0];continue;case 7:i=u.ops.pop(),u.trys.pop();continue;default:if(!(o=(o=u.trys).length>0&&o[o.length-1])&&(6===i[0]||2===i[0])){u=0;continue}if(3===i[0]&&(!o||i[1]>o[0]&&i[1]<o[3])){u.label=i[1];break}if(6===i[0]&&u.label<o[1]){u.label=o[1],o=i;break}if(o&&u.label<o[2]){u.label=o[2],u.ops.push(i);break}o[2]&&u.ops.pop(),u.trys.pop();continue}i=e.call(t,u)}catch(a){i=[6,a],r=0}finally{n=o=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,a])}}};function n(n){return t(this,void 0,Promise,function(){return e(this,function(t){switch(t.label){case 0:return[4,r(n)];case 1:return[2,o(t.sent())]}})})}function r(n){return t(this,void 0,Promise,function(){return e(this,function(t){return[2,new Promise(function(t,e){var r=new FileReader;r.readAsText(n),r.onload=function(){t(r.result.toString())},r.onerror=function(t){e(t)}})]})})}function o(t){for(var e=t.split("\n"),n=0;!e[n].includes("# data plots");)n++;var r=e[++n].split(";"),o={headers:{time:r[0].trim(),signal:r[1].trim()},values:[]};for(n++;!e[n].includes("#");)o.values.push(i(e[n])),n++;return o}function i(t){var e=t.replace(/,/g,".").split(";");return{time:parseFloat(e[0]),signal:parseFloat(e[1])}}Object.defineProperty(exports,"__esModule",{value:!0}),exports.getData=n;
},{}],"432T":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var t=function(){function t(t){this.target=t,this.marks=[],this.values=[],this.maxSignal=0,this.decimals=6,this.update()}return t.prototype.update=function(t,e){void 0===t&&(t=[]),void 0===e&&(e=[]),this.marks=t,this.values=e,this.maxSignal=Math.max.apply(null,e.map(function(t){return t.signal})),this.target.innerHTML="";for(var i="",n=0,s=this.getPeaks(t);n<s.length;n++){var a=s[n];i+="<tr>\n                <td>"+a.start.toFixed(this.decimals)+"</td>\n                <td>"+a.end.toFixed(this.decimals)+"</td>\n                <td>"+(60*a.response).toFixed(this.decimals)+"</td>\n            </tr>"}var r="\n            <table>\n                <thead>\n                    <tr>\n                        <th>Start [min]</th>\n                        <th>End [min]</th>\n                        <th>Response [mV/s]</th>\n                    </tr>\n                </thead>\n                <tbody>\n                    "+i+"\n                </tbody>\n            </table>\n        ";this.target.innerHTML=r},t.prototype.getPeaks=function(t){for(var e=[],i=[],n=0;n<t.length;n++){var s=t[n];if("start"===s.type)i.push(s);else if("end"===s.type&&i.length>0){for(var a=0;a<i.length;a++)e.push({start:i[a].time,end:s.time,previous:a>0?i[0]:void 0,values:this.getValues(i[a],s),response:0});i=[]}}for(var r=0,l=e;r<l.length;r++){var o=l[r];o.response=this.getResponse(o.values,this.values[o.previous?o.previous.index:void 0])}return e},t.prototype.getValues=function(t,e){return this.values.slice(t.index,e.index+1).slice()},t.prototype.getResponse=function(t,e){for(var i=e?{time:e.time,signal:e.signal}:{time:t[0].time,signal:t[0].signal},n={time:t[t.length-1].time,signal:t[t.length-1].signal},s=0,a=0;a<t.length-1;a++){var r=t[a+1].time-t[a].time,l=this.getIntersection(i,n,{time:t[a].time,signal:this.maxSignal},{time:t[a].time,signal:0}),o=this.getIntersection(i,n,{time:t[a+1].time,signal:this.maxSignal},{time:t[a+1].time,signal:0});s+=(t[a].signal-l.signal+(t[a+1].signal-o.signal))/2*r}return s},t.prototype.getIntersection=function(t,e,i,n){var s=t.time,a=t.signal,r=e.time,l=e.signal,o=i.time,g=i.signal,h=r-s,m=l-a,u=n.time-o,d=n.signal-g,p=(-m*(s-o)+h*(a-g))/(-u*m+h*d),v=(u*(a-g)-d*(s-o))/(-u*m+h*d);return p>=0&&p<=1&&v>=0&&v<=1?{time:s+v*h,signal:a+v*m}:null},t}();exports.Table=t;
},{}],"8UFg":[function(require,module,exports) {
"use strict";var t=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))(function(a,i){function s(t){try{c(r.next(t))}catch(e){i(e)}}function o(t){try{c(r.throw(t))}catch(e){i(e)}}function c(t){t.done?a(t.value):new n(function(e){e(t.value)}).then(s,o)}c((r=r.apply(t,e||[])).next())})},e=this&&this.__generator||function(t,e){var n,r,a,i,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:o(0),throw:o(1),return:o(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function o(i){return function(o){return function(i){if(n)throw new TypeError("Generator is already executing.");for(;s;)try{if(n=1,r&&(a=2&i[0]?r.return:i[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,i[1])).done)return a;switch(r=0,a&&(i=[2&i[0],a.value]),i[0]){case 0:case 1:a=i;break;case 4:return s.label++,{value:i[1],done:!1};case 5:s.label++,r=i[1],i=[0];continue;case 7:i=s.ops.pop(),s.trys.pop();continue;default:if(!(a=(a=s.trys).length>0&&a[a.length-1])&&(6===i[0]||2===i[0])){s=0;continue}if(3===i[0]&&(!a||i[1]>a[0]&&i[1]<a[3])){s.label=i[1];break}if(6===i[0]&&s.label<a[1]){s.label=a[1],a=i;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(i);break}a[2]&&s.ops.pop(),s.trys.pop();continue}i=e.call(t,s)}catch(o){i=[6,o],r=0}finally{n=a=0}if(5&i[0])throw i[1];return{value:i[0]?i[1]:void 0,done:!0}}([i,o])}}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./Chart"),r=require("./Data"),a=require("./Table"),i=function(){function i(){var t=this;this.marks=[],this.createUI(),this.chart=new n.Chart(this.canvas),this.table=new a.Table(this.tableWrapper),this.chart.onMarksUpdated=function(e){t.marks=e,t.table.update(t.marks,t.data?t.data.values:void 0)},window.onresize=function(){t.resize(),t.chart.render()},this.resize(),this.run()}return i.prototype.createUI=function(){var n=this;document.body.insertAdjacentHTML("afterbegin",'\n            <canvas id="chart"></canvas>\n            <div id="table"></div>\n            <div id="controls">\n                <button id="start" class="selected">Start</button>\n                <button id="end">End</button>\n                <button id="move">Move</button>\n                <br/><br/>\n                <input type="file" name="datafile" id="datafile" accept="text/plain" />\n                <br/><br/>\n                <div class="shortcuts">\n                    Shortcuts:<br/>\n                    <b>s</b> - Start<br/>\n                    <b>e</b> - End<br/>\n                    <b>m</b> or hold <b>Ctrl</b> - Move<br/>\n                    <b>mouse wheel</b> - Zoom<br/>\n                </div>\n            </div>\n        '),this.canvas=document.getElementById("chart"),this.tableWrapper=document.getElementById("table"),this.controlsWrapper=document.getElementById("controls");var a=document.getElementById("start"),i=document.getElementById("end"),s=document.getElementById("move"),o=document.getElementById("datafile");a.onclick=function(){a.classList.add("selected"),i.classList.remove("selected"),s.classList.remove("selected"),n.chart.setTool("start")},i.onclick=function(){i.classList.add("selected"),a.classList.remove("selected"),s.classList.remove("selected"),n.chart.setTool("end")},s.onclick=function(){s.classList.add("selected"),a.classList.remove("selected"),i.classList.remove("selected"),n.chart.setTool("move")},o.onchange=function(a){return t(n,void 0,void 0,function(){var t;return e(this,function(e){switch(e.label){case 0:return t=this,[4,r.getData(o.files[0])];case 1:return t.data=e.sent(),this.data&&this.chart.setData(this.data),[2]}})})}},i.prototype.run=function(){return t(this,void 0,void 0,function(){return e(this,function(t){return[2]})})},i.prototype.resize=function(){var t=window.innerWidth,e=window.innerHeight;this.canvas.width=t,this.canvas.height=Math.floor(e*(2/3)),this.tableWrapper.style.height=e-this.canvas.height+1+"px",this.controlsWrapper.style.height=e-this.canvas.height+1+"px"},i}();exports.App=i;
},{"./Chart":"A8+V","./Data":"t+Fr","./Table":"432T"}],"W+dL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./App"),o=document.body.querySelector("canvas");o&&o.parentNode.removeChild(o),(o=document.body.querySelector("div"))&&o.parentNode.removeChild(o),window.cancelAnimationFrame(window.anim),window.clearInterval(window.interval),window.clearTimeout(window.timeout),console.clear(),console.log(new Date),new e.App;
},{"./App":"8UFg"}]},{},["W+dL"], null)
//# sourceMappingURL=run.c952063a.js.map