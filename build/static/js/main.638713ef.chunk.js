(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,,,,,,function(t,e,a){t.exports=a(20)},,,,,,function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){},function(t,e,a){"use strict";a.r(e);var o={};a.r(o),a.d(o,"rgb2hsl",function(){return m}),a.d(o,"rgb2hex",function(){return f}),a.d(o,"hsl2rgb",function(){return b}),a.d(o,"hex2rgb",function(){return v}),a.d(o,"hex2hsl",function(){return g}),a.d(o,"hsl2hex",function(){return x}),a.d(o,"hueReset",function(){return y});var n=a(0),r=a.n(n),i=a(8),s=a.n(i),c=a(1),l=a(2),u=a(4),h=a(3),d=a(5),p=a(6);function m(t,e,a){t/=255,e/=255,a/=255;var o,n,r,i,s,c;return i=(c=Math.max(t,e,a))-(s=Math.min(t,e,a)),r=c+s,c===t&&(o=(e-a)/i%6*60),c===e&&(o=60*((a-t)/i+2)),c===a&&(o=60*((t-e)/i+4)),0===i&&(o=0,n=0),o<0&&(o+=360),0!==i&&(n=i/(1-Math.abs(r-1))),[o=o.toFixed(2),n=(100*n).toFixed(2),r=(50*r).toFixed(2)]}function f(t,e,a){var o=[t,e,a];return o="#"+o.map(function(t){return t.toString(16)}).map(function(t){return 1===t.length?"0"+t:t}).join("").toUpperCase()}function b(t,e,a){e/=100,a/=100;var o,n,r,i=(1-Math.abs(2*a-1))*e,s=i*(1-Math.abs(t/60%2-1)),c=a-i/2;return t<60|360===t?(o=i,n=s,r=0):t<120?(o=s,n=i,r=0):t<180?(o=0,n=i,r=s):t<240?(o=0,n=s,r=i):t<300?(o=s,n=0,r=i):t<360&&(o=i,n=0,r=s),[o=Math.round(255*(o+c)),n=Math.round(255*(n+c)),r=Math.round(255*(r+c))]}function v(t){return t="#"===t[0]?t:"#".concat(t),[parseInt(t.substring(1,3),16),parseInt(t.substring(3,5),16),parseInt(t.substring(5,7),16)]}function g(t){return m.apply(void 0,Object(p.a)(v(t)))}function x(t,e,a){return f.apply(void 0,Object(p.a)(b(t,e,a)))}function y(t){for(;t>=360;)t-=360;return t}a(15);var C=function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).iChange=function(t){t.persist();var e=t.target.value,o=a.colorTest[t.target.id](e);o?(document.querySelector("#".concat(t.target.id,"Help")).innerText="\u2754",a.props.updateBaseColor(o)):document.querySelector("#".concat(t.target.id,"Help")).innerText="\u2753"},a.iFocus=function(t){t.target.select(),a.buffer=[t.target.id,t.target.value]},a.getData=function(t){return"function"===typeof a.colorData[t]?a.colorData[t]():"style"===t?{backgroundColor:x.apply(o,Object(p.a)(a.props.state.baseColor)),color:a.props.state.baseColor[2]>45?"black":"white"}:void 0},a.updateInputs=function(){Object.keys(a.colorData).forEach(function(t){a.buffer[0]!==t&&(document.querySelector("#".concat(t)).value=a.getData(t),document.querySelector("#".concat(t,"Help")).innerText="\u2754")})},a.copyColor=function(t){var e="#".concat(t.target.id.replace("Copy","")),a="#".concat(t.target.id);document.querySelector(e).select(),document.execCommand("copy"),document.querySelector(a).innerText="\u2714\ufe0f",setTimeout(function(){document.querySelector(a).innerText="\ud83d\udccb"},500)},a.buffer=[],a.colorData={hexInput:function(){return x.apply(o,Object(p.a)(a.props.state.baseColor))},hslInput:function(){return a.props.state.baseColor.join(", ")},rgbInput:function(){return b.apply(o,Object(p.a)(a.props.state.baseColor)).join(", ")}},a.colorTest={hexInput:function(t){return t.match(/^#{0,1}[0-9a-f]{6}$/i)?g(t):null},hslInput:function(t){var e=t.match(/(\d*\.{0,1}\d*)/g);if(3===(e=e?e.filter(Boolean):"").length&&e[0]<360&&e[1]<=100&&e[2]<=100)return[e[0],e[1],e[2]]},rgbInput:function(t){var e=t.match(/\d{1,3}/g);if(3===(e=e?e.filter(Boolean):"").length&&e[0]<=255&&e[1]<=255&&e[2]<=255)return m(e[0],e[1],e[2])}},a.colorHelp={hexInput:"enter six-digit hexidecimal values with no spaces, # prefix is optional",hslInput:"enter three values separated by spaces or commas, first value is hue and must be less than 360, second value is saturation and must be less than or equal to 100, third value is luminosity and must be less than or equal to 100. Decimals values can be used",rgbInput:"enter three values separated by spaces or commas, each value must be less than or equal to 255"},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",null,r.a.createElement("div",{id:"colorOutput",style:this.getData("style")},Object.keys(this.colorData).map(function(e){return r.a.createElement("p",{key:e},r.a.createElement("label",{htmlFor:e},e.replace("Input",":"),r.a.createElement("input",{id:e,type:"text",size:"16",onChange:t.iChange,onFocus:t.iFocus,onBlur:function(){t.buffer=[]},style:t.getData("style")}),r.a.createElement("span",{role:"img","arei-label":"help","aria-hidden":"true",id:"".concat(e,"Help"),title:t.colorHelp[e]},"\u2754"),r.a.createElement("span",{role:"img","arei-label":"copy","aria-hidden":"true",id:"".concat(e,"Copy"),title:"copy",onClick:t.copyColor},"\ud83d\udccb")))})))}},{key:"componentDidMount",value:function(){this.updateInputs()}},{key:"componentDidUpdate",value:function(){this.updateInputs()}}]),e}(n.Component),S=function(){function t(e,a,n,r,i){var s=this;Object(c.a)(this,t),this.drawInnerBox=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:s.baseColorHSL[0],e=s.topY;e<=s.bottomY;e++){for(var a=100*(e-s.topY)/(s.bottomY-s.topY),o=s.ctx.createLinearGradient(s.leftX,e,s.rightX,e),n=0;n<=3;n++)o.addColorStop(n/3,"hsla(".concat(t,",").concat(a,"%,").concat(100*n/3,"%,1)"));s.ctx.strokeStyle=o,s.ctx.lineWidth=2,s.ctx.beginPath(),s.ctx.moveTo(s.leftX,e),s.ctx.lineTo(s.rightX,e),s.ctx.stroke(),s.ctx.closePath()}},this.drawOuterWheel=function(){for(var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:12,e=0;e<t;e++){var a=360*e/t,o=360*(e+1)/t,n=a*Math.PI/180-.01,r=o*Math.PI/180,i=s.wheelRadius*Math.cos(n)+s.width/2,c=s.height-(s.wheelRadius*Math.sin(n)+s.height/2),l=s.wheelRadius*Math.cos(r)+s.width/2,u=s.height-(s.wheelRadius*Math.sin(r)+s.height/2),h=s.ctx.createLinearGradient(i,c,l,u);h.addColorStop(0,"hsla(".concat(a,",100%,50%,1)")),h.addColorStop(1,"hsla(".concat(o,",100%,50%,1)")),s.ctx.strokeStyle=h,s.ctx.beginPath(),s.ctx.arc(s.width/2,s.height/2,s.wheelRadius,2*Math.PI-n,2*Math.PI-r,!0),s.ctx.stroke(),s.ctx.closePath()}},this.drawOutput=function(t){t.forEach(function(t,e,a){return a[e]=Number(a[e]).toFixed(2)}),s.updateSelectedColor(t),s.baseColorHEX=x.apply(o,Object(p.a)(t)),s.ctxUI.textAlign="center",s.ctxUI.font="".concat(s.outerWheelThickness,"px monospace"),s.ctxUI.fillStyle="white",s.ctxUI.strokeStyle="black",s.ctxUI.lineWidth=s.selectorLineWidth+1,s.ctxUI.strokeText(s.baseColorHEX,s.textX,s.textY),s.ctxUI.fillText(s.baseColorHEX,s.textX,s.textY)},this.drawSelectors=function(){var t=[[s.wheelSelector[0],s.wheelSelector[1]],[s.boxSelector[0],s.boxSelector[1]]];s.ctxUI.clearRect(0,0,s.width,s.height),t.forEach(function(t){s.ctxUI.moveTo(t[0],t[1]),s.ctxUI.beginPath(),s.ctxUI.lineWidth=s.selectorLineWidth,s.ctxUI.strokeStyle="#252525",s.ctxUI.arc(t[0],t[1],s.width/30,0,2*Math.PI),s.ctxUI.stroke(),s.ctxUI.closePath(),s.ctxUI.beginPath(),s.ctxUI.lineWidth=s.selectorLineWidth,s.ctxUI.strokeStyle="white",s.ctxUI.arc(t[0],t[1],s.width/30-s.selectorLineWidth,0,2*Math.PI),s.ctxUI.stroke(),s.ctxUI.closePath()}),s.drawOutput(s.selectedColor)},this.externalInput=function(t){s.h=t[0],s.s=t[1],s.l=t[2],s.baseColorHSL=t,s.baseColorHEX=x(t),s.selectedColor=t,s.calculateWheelSelectorPosition(t),s.calculateBoxSelectorPosition(t),s.drawInnerBox(s.baseColorHSL[0]),s.drawSelectors()},this.getNearestPointInBox=function(t,e){t<s.leftX&&(s.x=s.leftX),t>s.rightX&&(s.x=s.rightX),e<s.topY&&(s.y=s.topY),e>s.bottomY&&(s.y=s.bottomY),s.s=100*(s.y-s.topY)/(s.bottomY-s.topY),s.l=100*(s.x-s.leftX)/(s.rightX-s.leftX),s.boxSelector=[s.x,s.y]},this.getNearestPointOnWheel=function(t,e,a){s.h=180/Math.PI*Math.atan(e/t),t<0&&(s.h=s.h+180),e<0&&(s.h=s.h+360),s.h=360-s.h,s.h<0&&(s.h=360+s.h),360===s.h&&(s.h=0),t=s.width/2+s.wheelRadius*t/a,e=s.width/2+s.wheelRadius*e/a,s.wheelSelector=[t,e]},this.mouseData=function(t){if(t.touches){var e=t.target.getBoundingClientRect();s.x=t.targetTouches[0].pageX-e.left,s.y=t.targetTouches[0].pageY-e.top}else s.x=t.offsetX,s.y=t.offsetY;s.xDist=s.x-s.width/2,s.yDist=s.y-s.height/2,s.dist=Math.sqrt(Math.pow(s.xDist,2)+Math.pow(s.yDist,2))},this.mouseDown=function(t){t.preventDefault(),document.querySelector("#colorCanvasUI").focus(),s.selfInvoked=!0,s.mouseData(t),s.dist>s.innerRadius&&s.dist<s.outerRadius?(s.activeSelector="wheel",s.mouseMove(t)):s.x>s.leftX&&s.x<s.rightX&&s.y>s.topY&&s.y<s.bottomY?(s.activeSelector="box",s.mouseMove(t)):s.activeSelector=null},this.mouseMove=function(t){0!==t.buttons&&"null"!==s.activeSelector&&(s.mouseData(t),"wheel"===s.activeSelector&&(s.getNearestPointOnWheel(s.xDist,s.yDist,s.dist),s.drawInnerBox(s.h)),"box"===s.activeSelector&&s.getNearestPointInBox(s.x,s.y),s.selectedColor=[s.h,s.s,s.l],s.drawSelectors())},this.mouseUp=function(){s.updateSelectedColor(s.selectedColor),s.activeSelector=null,s.selfInvoked=!1},this.baseColorHSL=a,this.h=a[0],this.s=a[1],this.l=a[2],this.baseColorHEX=x(a),this.updateSelectedColor=i,this.colorCanvas=n,this.colorCanvasUI=r,this.width=e,this.height=e,this.colorCanvas.width=this.width,this.colorCanvas.height=this.height,this.colorCanvasUI.width=this.width,this.colorCanvasUI.height=this.height,this.colorCanvasUI.style.position="relative",this.colorCanvasUI.style.marginLeft="-".concat(this.width,"px"),this.colorCanvas.style.zIndex="0",this.colorCanvasUI.style.zIndex="1",this.ctx=this.colorCanvas.getContext("2d"),this.ctxUI=this.colorCanvasUI.getContext("2d"),this.outerWheelThickness=this.width/15,this.ctx.lineWidth=this.outerWheelThickness,this.wheelRadius=this.width/2-this.outerWheelThickness/2,this.innerRadius=this.wheelRadius-this.outerWheelThickness/2,this.outerRadius=this.wheelRadius+this.outerWheelThickness/2,this.boxWidth=2*(this.wheelRadius-this.outerWheelThickness/2)/Math.sqrt(2)-2,this.boxHeight=this.boxWidth,this.leftX=this.width/2-this.boxWidth/2,this.topY=this.height/2-this.boxHeight/2,this.rightX=this.leftX+this.boxWidth,this.bottomY=this.height/2+this.boxHeight/2,this.calculateWheelSelectorPosition(this.baseColorHSL),this.calculateBoxSelectorPosition(this.baseColorHSL),this.activeSelector="wheel",this.selectedColor=this.baseColorHSL,this.selectorLineWidth=Math.ceil(this.outerWheelThickness/12),this.textX=this.width/2,this.textY=this.bottomY+1.2*this.outerWheelThickness,this.selfInvoked=!1,this.init=(s.drawOuterWheel(),s.drawInnerBox(),void s.drawSelectors())}return Object(l.a)(t,[{key:"calculateBoxSelectorPosition",value:function(t){var e=this.leftX+this.boxWidth*this.l/100,a=this.topY+this.boxHeight*this.s/100;this.boxSelector=[e,a]}},{key:"calculateWheelSelectorPosition",value:function(t){var e=this.wheelRadius,a=t[0]*Math.PI/180,o=e*Math.cos(a)+this.width/2,n=-e*Math.sin(a)+this.height/2;this.wheelSelector=[o,n]}}]),t}(),w=function(t){function e(){var t,a;Object(c.a)(this,e);for(var o=arguments.length,n=new Array(o),r=0;r<o;r++)n[r]=arguments[r];return(a=Object(u.a)(this,(t=Object(h.a)(e)).call.apply(t,[this].concat(n)))).updateSelectedColor=function(t){t!==a.props.state.baseColor&&a.props.updateBaseColor(t)},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"componentDidUpdate",value:function(){!1===this.colorWheel.selfInvoked&&this.colorWheel.externalInput(this.props.state.baseColor)}},{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{id:"canvasContainer"},r.a.createElement("canvas",{id:"colorCanvas"}),r.a.createElement("canvas",{id:"colorCanvasUI",tabIndex:"1",style:{outline:"none"}})))}},{key:"componentDidMount",value:function(){var t=document.querySelector("#colorCanvas"),e=document.querySelector("#colorCanvasUI");this.colorWheel=new S(this.props.state.width,this.props.state.baseColor,t,e,this.updateSelectedColor),e.addEventListener("mousedown",this.colorWheel.mouseDown),e.addEventListener("mousemove",this.colorWheel.mouseMove),e.addEventListener("mouseup",this.colorWheel.mouseUp),e.addEventListener("touchstart",this.colorWheel.mouseDown,{passive:!1}),e.addEventListener("touchmove",this.colorWheel.mouseMove,{passive:!1}),e.addEventListener("touchend",this.colorWheel.mouseUp)}}]),e}(n.Component),I=(a(16),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).cFocus=function(t){t.target.select();var e=t.target.id.substr(0,1);a.buffer=[e,t.target.value]},a.cChange=function(t){t.persist();var e=t.target.id.substr(0,1),o=t.nativeEvent.data,n=t.target.value,r=a.props.state.baseColor.slice();(null!==o&&null!==n||"delete"===t.nativeEvent.inputType.substr(0,6))&&("text"===t.target.type&&((n=n.replace(/\./,"[dec]").replace(/\./g,"").replace("[dec]",".").replace(/[^\d.]/g,""))>=a.inputs[e]&&(n=a.inputs[e]),a.buffer=[e,n],t.target.value=a.buffer[1]),n&&(r["hsl".indexOf(e)]=Number(n),a.props.updateBaseColor(r)))},a.setSliders=function(){["h","s","l"].forEach(function(t,e){var o=t===a.buffer[0]?a.buffer[1]:a.props.state.baseColor[e];document.querySelector("#".concat(t,"r")).value=Number(o),document.querySelector("#".concat(t,"t")).value=o})},a.componentDidUpdate=function(){a.setSliders()},a.inputs={h:359.99,s:100,l:100},a.buffer=[],a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"colorInputBox"},r.a.createElement("p",null,"hue, saturation, luminosity"),Object.keys(this.inputs).map(function(e){return r.a.createElement("div",{className:"colorInputRow",key:e[0]},r.a.createElement("label",{htmlFor:"".concat(e,"t")},e,r.a.createElement("input",{name:"".concat(e,"t"),id:"".concat(e,"r"),type:"range",min:"0",max:t.inputs[e],onChange:t.cChange}),r.a.createElement("input",{type:"text",id:"".concat(e,"t"),min:"0",max:t.inputs[e],size:"4",onChange:t.cChange,onFocus:t.cFocus,onBlur:function(){return t.buffer=[]}})))}))}},{key:"componentDidMount",value:function(){this.setSliders()}}]),e}(n.Component)),E=function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).updateState=function(t){t.persist();var e=a.state,o=t.target.value;o.match(/\d+/g)&&(o=Number(o)),e[t.target.name]=o,a.setState(e)},a.generatePalette=function(){var t={};return Object.values(a.settings["Palette Mode"][a.state["Palette Mode"]]).forEach(function(e,o){t["hue".concat(o)]={};for(var n=0;n<=a.state["Saturation Steps"]-1;n++){var r=100*(a.state["Saturation Steps"]-n)/a.state["Saturation Steps"];t["hue".concat(o)]["saturation".concat(n)]={};for(var i=1;i<=a.state["Luminosity Steps"];i++){var s=100*(1+a.state["Luminosity Steps"]-i)/(1+a.state["Luminosity Steps"]);t["hue".concat(o)]["saturation".concat(n)]["luminosity".concat(i)]=[y(Number(a.props.globalState.baseColor[0])+e).toFixed(2),"".concat(Number(r).toFixed(2),"%"),"".concat(Number(s).toFixed(2),"%")]}}}),t},a.settings={"Palette Mode":{type:"list",Complementary:[0,180],Analogous:[0,30,330],Triadic:[0,120,240],"Tetradic rectangle":[0,30,60,210,240],"Tetradic square":[0,90,180,270],"Complementary split":[0,150,210],"Complementary with split":[0,150,180,210]},"Saturation Steps":{type:"range",min:1,max:7},"Luminosity Steps":{type:"range",min:1,max:7},"Copied format":{type:"list",hex:function(t){return x(t)},hsl:function(t){return t},rgb:function(t){return b(t)}}},a.state={"Palette Mode":"Complementary with split","Saturation Steps":4,"Luminosity Steps":4,"Copied format":"hex"},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",null,r.a.createElement("h2",null,"harmonic color palettes"),r.a.createElement("div",{className:"paletteSettings"},Object.keys(this.state).map(function(e){return r.a.createElement("div",{key:"set".concat(e),className:"paletteSetting"},r.a.createElement("label",{htmlFor:e},e,"list"===t.settings[e].type?Object.keys(t.settings[e]).map(function(a,o){return 0===o?":":r.a.createElement("label",{key:a},r.a.createElement("input",{id:a,name:e,value:a,type:"radio",onChange:t.updateState}),a," ")}):r.a.createElement(r.a.Fragment,null," (",t.state[e],"): ",r.a.createElement("input",{type:"range",name:e,min:t.settings[e].min,max:t.settings[e].max,value:t.state[e],onChange:t.updateState}))))})),r.a.createElement("div",{className:"paletteContainer"},Object.values(this.generatePalette()).map(function(t,e){return r.a.createElement("div",{key:"h".concat(e),className:"paletteBlock"},Object.values(t).map(function(t,a){return r.a.createElement("div",{key:"h".concat(e,"s").concat(a),className:"paletteRow"},Object.values(t).map(function(t,o){return r.a.createElement("div",{key:"h".concat(e,"s").concat(a,"l").concat(o),className:"paletteBox",style:{backgroundColor:"hsl(".concat(t.join(","),")")},title:"click to copy:\n ".concat(t.join(", "))})}))}))})))}}]),e}(n.Component),k=(a(17),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).state={mode:E,modes:"Harmonic, Shading"},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(this.state.mode,{paletteState:this.state,globalState:this.props.state}))}}]),e}(n.Component)),O=(a(18),function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).cFocus=function(t){t.target.select();var e=t.target.id.substr(0,1);a.buffer=[e,t.target.value]},a.cChange=function(t){t.persist();var e=t.target.id.substr(0,1),o=t.nativeEvent.data,n=t.target.value,r=a.baseColorRGB.slice();(null!==o&&null!==n||"delete"===t.nativeEvent.inputType.substr(0,6))&&("text"===t.target.type&&((n=n.replace(/\./,"").replace(/[\D]/g,""))>=a.inputs[e]&&(n=a.inputs[e]),a.buffer=[e,n],t.target.value=a.buffer[1]),n&&(r["rgb".indexOf(e)]=Number(n),a.props.updateBaseColor(m.apply(void 0,Object(p.a)(r)))))},a.setSliders=function(){a.baseColorRGB=b.apply(void 0,Object(p.a)(a.props.state.baseColor)),["r","g","b"].forEach(function(t,e){document.querySelector("#"+t+"r").value=a.baseColorRGB[e],document.querySelector("#"+t+"t").value=a.baseColorRGB[e]})},a.componentDidUpdate=function(){a.setSliders()},a.inputs={r:255,g:255,b:255},a.buffer=[],a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){var t=this;return r.a.createElement("div",{className:"colorInputBox"},r.a.createElement("p",null,"red, green, blue"),Object.keys(this.inputs).map(function(e){return r.a.createElement("div",{className:"colorInputRow",key:e[0]},r.a.createElement("label",{htmlFor:"".concat(e,"t}")},e,r.a.createElement("input",{name:"".concat(e,"r"),id:"".concat(e,"r"),type:"range",min:"0",max:t.inputs[e],onChange:t.cChange}),r.a.createElement("input",{type:"text",id:"".concat(e,"t"),min:"0",max:t.inputs[e],size:"4",onInput:t.cChange,onFocus:t.cFocus,onBlur:function(){return t.buffer=[]}})))}))}},{key:"componentDidMount",value:function(){this.setSliders()}}]),e}(n.Component)),j=function(t){function e(t){var a;return Object(c.a)(this,e),(a=Object(u.a)(this,Object(h.a)(e).call(this,t))).updateBaseColor=function(t){t!==a.state.baseColor&&(t[0]>=360&&(t[0]=0),t[1]>=100&&(t[1]=100),t[2]>=100&&(t[2]=100),t.forEach(function(t,e,a){return a[e]=Number(t)}),a.textColor=t[2]>40?"black":"white",a.setState({baseColor:t}))},a.state={baseColor:[0,100,50],width:300},a}return Object(d.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return r.a.createElement("div",{id:"colorToolsFlexContainer"},r.a.createElement("div",{id:"colorPickers",style:{width:this.state.width}},r.a.createElement(C,{updateBaseColor:this.updateBaseColor,state:this.state}),r.a.createElement(w,{updateBaseColor:this.updateBaseColor,state:this.state}),r.a.createElement(I,{updateBaseColor:this.updateBaseColor,state:this.state}),r.a.createElement(O,{updateBaseColor:this.updateBaseColor,state:this.state})),r.a.createElement("div",{className:"colorPalette"},r.a.createElement(k,{state:this.state})))}}]),e}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(19);s.a.render(r.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}],[[9,1,2]]]);
//# sourceMappingURL=main.638713ef.chunk.js.map