(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{15:function(t,e,o){},16:function(t,e,o){},17:function(t,e,o){"use strict";o.r(e);var a={};o.r(a),o.d(a,"rgb2hsl",function(){return b}),o.d(a,"rgb2hex",function(){return f}),o.d(a,"hsl2rgb",function(){return x}),o.d(a,"hex2rgb",function(){return v}),o.d(a,"hex2hsl",function(){return m}),o.d(a,"hsl2hex",function(){return g});var i=o(0),n=o.n(i),s=o(8),r=o.n(s),c=o(1),l=o(2),h=o(3),u=o(5),d=o(4),p=o(6);function b(t,e,o){t/=255,e/=255,o/=255;var a,i,n,s,r,c;return s=(c=Math.max(t,e,o))-(r=Math.min(t,e,o)),n=c+r,c===t&&(a=(e-o)/s%6*60),c===e&&(a=60*((o-t)/s+2)),c===o&&(a=60*((t-e)/s+4)),0===s&&(a=0,i=0),a<0&&(a+=360),0!==s&&(i=s/(1-Math.abs(n-1))),[a=a.toFixed(2),i=(100*i).toFixed(2),n=(50*n).toFixed(2)]}function f(t,e,o){var a=[t,e,o];return a="#"+a.map(function(t){return t.toString(16)}).map(function(t){return 1===t.length?"0"+t:t}).join("").toUpperCase()}function x(t,e,o){e/=100,o/=100;var a,i,n,s=(1-Math.abs(2*o-1))*e,r=s*(1-Math.abs(t/60%2-1)),c=o-s/2;return t<60|360===t?(a=s,i=r,n=0):t<120?(a=r,i=s,n=0):t<180?(a=0,i=s,n=r):t<240?(a=0,i=r,n=s):t<300?(a=r,i=0,n=s):t<360&&(a=s,i=0,n=r),[a=Math.round(255*(a+c)),i=Math.round(255*(i+c)),n=Math.round(255*(n+c))]}function v(t){return[parseInt(t.substring(1,3),16),parseInt(t.substring(3,5),16),parseInt(t.substring(5,7),16)]}function m(t){return this.rgb2hsl.apply(this,Object(c.a)(this.hex2rgb(t)))}function g(t,e,o){return f.apply(void 0,Object(c.a)(x(t,e,o)))}var C=function(){function t(e,o,i,n,s){var r=this;Object(l.a)(this,t),this.drawInnerBox=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:r.baseColorHSL[0],e=r.topY;e<=r.bottomY;e++){for(var o=100*(e-r.topY)/(r.bottomY-r.topY),a=r.ctx.createLinearGradient(r.leftX,e,r.rightX,e),i=0;i<=10;i++)a.addColorStop(i/10,"hsla(".concat(t,",").concat(o,"%,").concat(100*i/10,"%,1)"));r.ctx.strokeStyle=a,r.ctx.lineWidth=2,r.ctx.beginPath(),r.ctx.moveTo(r.leftX,e),r.ctx.lineTo(r.rightX,e),r.ctx.stroke(),r.ctx.closePath()}},this.drawOuterWheel=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:12,e=0;e<t;e++){var o=360*e/t,a=360*(e+1)/t,i=o*Math.PI/180-.01,n=a*Math.PI/180,s=r.wheelRadius*Math.cos(i)+r.width/2,c=r.height-(r.wheelRadius*Math.sin(i)+r.height/2),l=r.wheelRadius*Math.cos(n)+r.width/2,h=r.height-(r.wheelRadius*Math.sin(n)+r.height/2),u=r.ctx.createLinearGradient(s,c,l,h);u.addColorStop(0,"hsla(".concat(o,",100%,50%,1)")),u.addColorStop(1,"hsla(".concat(a,",100%,50%,1)")),r.ctx.strokeStyle=u,r.ctx.beginPath(),r.ctx.arc(r.width/2,r.height/2,r.wheelRadius,2*Math.PI-i,2*Math.PI-n,!0),r.ctx.stroke(),r.ctx.closePath()}},this.drawOutput=function(t){t.forEach(function(t,e,o){return o[e]=Number(o[e]).toFixed(2)}),r.updateSelectedColor(t),r.baseColorHEX=g.apply(a,Object(c.a)(t)),r.ctxUI.textAlign="center",r.ctxUI.font="".concat(r.outerWheelThickness,"px monospace"),r.ctxUI.fillStyle="white",r.ctxUI.strokeStyle="black",r.ctxUI.lineWidth=r.selectorLineWidth+1,r.ctxUI.strokeText(r.baseColorHEX,r.textX,r.textY),r.ctxUI.fillText(r.baseColorHEX,r.textX,r.textY)},this.drawSelectors=function(){var t=[[r.wheelSelector[0],r.wheelSelector[1]],[r.boxSelector[0],r.boxSelector[1]]];r.ctxUI.clearRect(0,0,r.width,r.height),t.forEach(function(t){r.ctxUI.moveTo(t[0],t[1]),r.ctxUI.beginPath(),r.ctxUI.lineWidth=r.selectorLineWidth,r.ctxUI.strokeStyle="#252525",r.ctxUI.arc(t[0],t[1],r.width/30,0,2*Math.PI),r.ctxUI.stroke(),r.ctxUI.closePath(),r.ctxUI.beginPath(),r.ctxUI.lineWidth=r.selectorLineWidth,r.ctxUI.strokeStyle="white",r.ctxUI.arc(t[0],t[1],r.width/30-r.selectorLineWidth,0,2*Math.PI),r.ctxUI.stroke(),r.ctxUI.closePath()}),r.drawOutput(r.selectedColor)},this.externalInput=function(t){r.h=t[0],r.s=t[1],r.l=t[2],r.baseColorHSL=t,r.baseColorHEX=g(t),r.selectedColor=t,r.calculateWheelSelectorPosition(t),r.calculateBoxSelectorPosition(t),r.drawInnerBox(r.baseColorHSL[0]),r.drawSelectors()},this.getNearestPointInBox=function(t,e){t<r.leftX&&(r.x=r.leftX),t>r.rightX&&(r.x=r.rightX),e<r.topY&&(r.y=r.topY),e>r.bottomY&&(r.y=r.bottomY),r.s=100*(r.y-r.topY)/(r.bottomY-r.topY),r.l=100*(r.x-r.leftX)/(r.rightX-r.leftX),r.boxSelector=[r.x,r.y]},this.getNearestPointOnWheel=function(t,e,o){r.h=180/Math.PI*Math.atan(e/t),t<0&&(r.h=r.h+180),e<0&&(r.h=r.h+360),r.h=360-r.h,r.h<0&&(r.h=360+r.h),360===r.h&&(r.h=0),t=r.width/2+r.wheelRadius*t/o,e=r.width/2+r.wheelRadius*e/o,r.wheelSelector=[t,e]},this.mouseData=function(t){r.x=t.offsetX,r.y=t.offsetY,r.xDist=r.x-r.width/2,r.yDist=r.y-r.height/2,r.dist=Math.sqrt(Math.pow(r.xDist,2)+Math.pow(r.yDist,2))},this.mouseDown=function(t){t.preventDefault(),r.selfInvoked=!0,r.mouseData(t),r.dist>r.innerRadius&&r.dist<r.outerRadius?(r.activeSelector="wheel",r.mouseMove(t)):r.x>r.leftX&&r.x<r.rightX&&r.y>r.topY&&r.y<r.bottomY?(r.activeSelector="box",r.mouseMove(t)):r.activeSelector=null},this.mouseMove=function(t){0!==t.buttons&&(r.mouseData(t),"wheel"===r.activeSelector&&(r.getNearestPointOnWheel(r.xDist,r.yDist,r.dist),r.drawInnerBox(r.h),r.selectedColor=[r.h,r.s,r.l],r.drawSelectors()),"box"===r.activeSelector&&(r.getNearestPointInBox(r.x,r.y),r.selectedColor=[r.h,r.s,r.l],r.drawSelectors()))},this.mouseUp=function(){r.updateSelectedColor(r.selectedColor),r.selfInvoked=!1},this.baseColorHSL=o,this.h=o[0],this.s=o[1],this.l=o[2],this.baseColorHEX=g(o),this.updateSelectedColor=s,this.colorCanvas=i,this.colorCanvasUI=n,this.width=e,this.height=e,this.colorCanvas.width=this.width,this.colorCanvas.height=this.height,this.colorCanvasUI.width=this.width,this.colorCanvasUI.height=this.height,this.colorCanvasUI.style.position="relative",this.colorCanvasUI.style.marginLeft="-".concat(this.width,"px"),this.colorCanvas.style.zIndex="0",this.colorCanvasUI.style.zIndex="1",this.ctx=this.colorCanvas.getContext("2d"),this.ctxUI=this.colorCanvasUI.getContext("2d"),this.outerWheelThickness=this.width/15,this.ctx.lineWidth=this.outerWheelThickness,this.wheelRadius=this.width/2-this.outerWheelThickness/2,this.innerRadius=this.wheelRadius-this.outerWheelThickness/2,this.outerRadius=this.wheelRadius+this.outerWheelThickness/2,this.boxWidth=2*(this.wheelRadius-this.outerWheelThickness/2)/Math.sqrt(2)-2,this.boxHeight=this.boxWidth,this.leftX=this.width/2-this.boxWidth/2,this.topY=this.height/2-this.boxHeight/2,this.rightX=this.leftX+this.boxWidth,this.bottomY=this.height/2+this.boxHeight/2,this.calculateWheelSelectorPosition(this.baseColorHSL),this.calculateBoxSelectorPosition(this.baseColorHSL),this.activeSelector="wheel",this.selectedColor=this.baseColorHSL,this.selectorLineWidth=Math.ceil(this.outerWheelThickness/12),this.textX=this.width/2,this.textY=this.bottomY+1.2*this.outerWheelThickness,this.selfInvoked=!1,this.init=(r.drawOuterWheel(),r.drawInnerBox(),void r.drawSelectors())}return Object(h.a)(t,[{key:"calculateBoxSelectorPosition",value:function(t){var e=this.leftX+this.boxWidth*this.l/100,o=this.topY+this.boxHeight*this.s/100;this.boxSelector=[e,o]}},{key:"calculateWheelSelectorPosition",value:function(t){var e=this.wheelRadius,o=t[0]*Math.PI/180,a=e*Math.cos(o)+this.width/2,i=-e*Math.sin(o)+this.height/2;this.wheelSelector=[a,i]}}]),t}(),w=function(t){function e(){var t,o;Object(l.a)(this,e);for(var a=arguments.length,i=new Array(a),n=0;n<a;n++)i[n]=arguments[n];return(o=Object(u.a)(this,(t=Object(d.a)(e)).call.apply(t,[this].concat(i)))).updateSelectedColor=function(t){t!==o.props.state.baseColor&&o.props.updateBaseColor(t)},o}return Object(p.a)(e,t),Object(h.a)(e,[{key:"componentDidUpdate",value:function(){!1===this.colorWheel.selfInvoked&&this.colorWheel.externalInput(this.props.state.baseColor)}},{key:"render",value:function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement("div",{id:"canvasContainer"},n.a.createElement("canvas",{id:"colorCanvas"}),n.a.createElement("canvas",{id:"colorCanvasUI"})))}},{key:"componentDidMount",value:function(){var t=document.querySelector("#colorCanvas"),e=document.querySelector("#colorCanvasUI");this.colorWheel=new C(this.props.state.width,this.props.state.baseColor,t,e,this.updateSelectedColor),e.addEventListener("mousedown",this.colorWheel.mouseDown),e.addEventListener("mousemove",this.colorWheel.mouseMove),e.addEventListener("mouseup",this.colorWheel.mouseUp)}}]),e}(i.Component),y=function(t){function e(t){var o;return Object(l.a)(this,e),(o=Object(u.a)(this,Object(d.a)(e).call(this,t))).cFocus=function(t){t.target.select();var e=t.target.id.substr(0,1);o.buffer=[e,t.target.value]},o.cChange=function(t){t.persist();var e=t.target.id.substr(0,1),a=t.nativeEvent.data,i=t.target.value,n=o.props.state.baseColor.slice();(null!==a&&null!==i||"delete"===t.nativeEvent.inputType.substr(0,6))&&("text"===t.target.type&&((i=i.replace(/\./,"[dec]").replace(/\./g,"").replace("[dec]",".").replace(/[^\d.]/g,""))>=o.inputs[e]&&(i=o.inputs[e]),o.buffer=[e,i],t.target.value=o.buffer[1]),i&&(n["hsl".indexOf(e)]=Number(i),o.props.updateBaseColor(n)))},o.setSliders=function(){["h","s","l"].forEach(function(t,e){var a=t===o.buffer[0]?o.buffer[1]:o.props.state.baseColor[e];document.querySelector("#"+t+"r").value=Number(a),document.querySelector("#"+t+"t").value=a})},o.componentDidUpdate=function(){o.setSliders()},o.inputs={h:359.99,s:100,l:100},o.buffer=[],o}return Object(p.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){var t=this;return n.a.createElement(n.a.Fragment,null,Object.keys(this.inputs).map(function(e){return n.a.createElement("div",{className:"colorInputRow",key:e[0]},n.a.createElement("label",{htmlFor:"".concat(e,"r}")},e," "),n.a.createElement("input",{name:"".concat(e,"r"),id:"".concat(e,"r"),type:"range",min:"0",max:t.inputs[e],onChange:t.cChange}),n.a.createElement("input",{type:"text",id:"".concat(e,"t"),min:"0",max:t.inputs[e],size:"6",onChange:t.cChange,onFocus:t.cFocus,onBlur:function(){return t.buffer=[]}}))}))}},{key:"componentDidMount",value:function(){this.setSliders()}}]),e}(i.Component),I=(o(15),function(t){function e(t){var o;return Object(l.a)(this,e),(o=Object(u.a)(this,Object(d.a)(e).call(this,t))).cFocus=function(t){t.target.select();var e=t.target.id.substr(0,1);o.buffer=[e,t.target.value]},o.cChange=function(t){t.persist();var e=t.target.id.substr(0,1),a=t.nativeEvent.data,i=t.target.value,n=o.baseColorRGB.slice();(null!==a&&null!==i||"delete"===t.nativeEvent.inputType.substr(0,6))&&("text"===t.target.type&&((i=i.replace(/\./,"").replace(/[\D]/g,""))>=o.inputs[e]&&(i=o.inputs[e]),o.buffer=[e,i],t.target.value=o.buffer[1]),i&&(n["rgb".indexOf(e)]=Number(i),o.props.updateBaseColor(b.apply(void 0,Object(c.a)(n)))))},o.setSliders=function(){o.baseColorRGB=x.apply(void 0,Object(c.a)(o.props.state.baseColor)),["r","g","b"].forEach(function(t,e){document.querySelector("#"+t+"r").value=o.baseColorRGB[e],document.querySelector("#"+t+"t").value=o.baseColorRGB[e]})},o.componentDidUpdate=function(){o.setSliders()},o.inputs={r:255,g:255,b:255},o.buffer=[],o}return Object(p.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){var t=this;return n.a.createElement(n.a.Fragment,null,Object.keys(this.inputs).map(function(e){return n.a.createElement("div",{className:"colorInputRow",key:e[0]},n.a.createElement("label",{htmlFor:"".concat(e,"r}")},e," "),n.a.createElement("input",{name:"".concat(e,"r"),id:"".concat(e,"r"),type:"range",min:"0",max:t.inputs[e],onChange:t.cChange}),n.a.createElement("input",{type:"text",id:"".concat(e,"t"),min:"0",max:t.inputs[e],size:"6",onInput:t.cChange,onFocus:t.cFocus,onBlur:function(){return t.buffer=[]}}))}))}},{key:"componentDidMount",value:function(){this.setSliders()}}]),e}(i.Component)),S=function(t){function e(t){var o;return Object(l.a)(this,e),(o=Object(u.a)(this,Object(d.a)(e).call(this,t))).updateBaseColor=function(t){t!==o.state.baseColor&&(t[0]>=360&&(t[0]=0),t[1]>=100&&(t[1]=100),t[2]>=100&&(t[2]=100),o.textColor=t[2]>40?"black":"white",o.setState({baseColor:t}))},o.state={baseColor:[0,100,50],width:300},o.textColor=o.state.baseColor[2]>40?"black":"white",o}return Object(p.a)(e,t),Object(h.a)(e,[{key:"render",value:function(){return n.a.createElement("div",{id:"colorToolsFlexContainer"},n.a.createElement("div",{id:"colorPickers",style:{width:this.state.width}},n.a.createElement("div",{id:"colorOutput",style:{backgroundColor:g.apply(a,Object(c.a)(this.state.baseColor)),color:this.textColor}},n.a.createElement("p",null,"hex: ",g.apply(a,Object(c.a)(this.state.baseColor))),n.a.createElement("p",null,"hsl: ",this.state.baseColor.join(", ")),n.a.createElement("p",null,"rgb: ",x.apply(a,Object(c.a)(this.state.baseColor)).join(", "))),n.a.createElement(w,{updateBaseColor:this.updateBaseColor,state:this.state}),n.a.createElement(y,{updateBaseColor:this.updateBaseColor,state:this.state}),n.a.createElement(I,{updateBaseColor:this.updateBaseColor,state:this.state})))}}]),e}(i.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o(16);r.a.render(n.a.createElement(S,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})},9:function(t,e,o){t.exports=o(17)}},[[9,1,2]]]);
//# sourceMappingURL=main.755e95cb.chunk.js.map