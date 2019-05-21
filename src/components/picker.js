import * as cConvert from '../accessories/colorConversion';
export default class picker {
    constructor(width,height,baseColor,colorCanvas,colorCanvasUI,updateFunction) {
    this.baseColorHEX = baseColor;
    this.baseColorHSL = cConvert.hex2hsl(baseColor);
    this.updateSelectedColor = updateFunction;
    this.colorCanvas = colorCanvas;
    this.colorCanvasUI = colorCanvasUI;
    this.width = width;
    this.height = height;
    this.colorCanvas.width = this.width;
    this.colorCanvas.height = this.height;
    this.colorCanvasUI.width = this.width;
    this.colorCanvasUI.height = this.height;
    this.colorCanvasUI.style.position = 'relative';
    this.colorCanvasUI.style.marginLeft = `-${this.width}px`;
    this.colorCanvasUI.style.zIndex = '1';
    this.ctx = this.colorCanvas.getContext("2d");
    this.ctxUI = this.colorCanvasUI.getContext("2d");
    this.outerWheelThickness = this.width/15;
    this.ctx.lineWidth = this.outerWheelThickness;
    this.wheelRadius = (this.width/2)-this.outerWheelThickness/2;
    this.innerRadius = this.wheelRadius - this.outerWheelThickness/2;
    this.outerRadius = this.wheelRadius + this.outerWheelThickness/2;
    this.boxWidth = 2*(this.wheelRadius-(this.outerWheelThickness/2))/Math.sqrt(2)-2;
    this.boxHeight = this.boxWidth;
    this.leftX = (this.width/2)-(this.boxWidth/2);
    this.topY = (this.height/2)-(this.boxHeight/2);
    this.rightX = this.leftX+this.boxWidth;
    this.bottomY = (this.height/2)+(this.boxHeight/2);
    this.calculateWheelSelectorPosition(this.baseColorHSL);
    this.calculateBoxSelectorPosition(this.baseColorHEX);
    this.activeSelector = "wheel";
    this.selectedColor = cConvert.hex2rgb(baseColor); 
    this.selectorLineWidth = Math.ceil(this.outerWheelThickness/12);
    this.textX = this.width/2;
    this.textY = this.bottomY + this.outerWheelThickness*1.2;
    this.selfInvoked = false;
    };
    calculateBoxSelectorPosition(color) {
        color = cConvert.hex2hsl(color);
        let s = color[1];
        let l = color[2];
        let x = this.leftX + this.boxWidth * l/100;
        let y = this.topY + this.boxHeight * s/100;
        this.boxSelector = [x,y];
    }
    calculateWheelSelectorPosition(color) {
        let hexRegex = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
        if (color.toString().match(hexRegex)) { color = cConvert.hex2hsl(color) };
        let r = this.wheelRadius;
        let theta = color[0]*Math.PI/180;
        let x = r*Math.cos(theta)+(this.width/2);
        let y = -r*Math.sin(theta)+(this.height/2);
        this.wheelSelector = [x,y];
    }
    drawInnerBox = (baseColor=0) => {
        for (let row = this.topY; row <= this.bottomY; row++) { 
            let rowPercent = 100*(row-this.topY)/(this.bottomY-this.topY);
            let boxGradient = this.ctx.createLinearGradient(this.leftX,row,this.rightX,row);
            let steps = 10; //ten gradient steps produces good balance of performance and accuracy
            for (let i=0; i<=steps; i++) { 
                boxGradient.addColorStop(i/steps,`hsla(${baseColor},${rowPercent}%,${100*i/steps}%,1)`);
            }
            this.ctx.strokeStyle = boxGradient;
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.moveTo(this.leftX,row);
            this.ctx.lineTo(this.rightX,row);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
    drawOuterWheel = (segments=12) => { 
        for (let i=0; i<segments; i++) {
            let theta0 = i*360/segments;
            let theta1 = (i+1)*360/segments;
            let rad0 = theta0*Math.PI/180 - .01; // - .01 hides the gaps
            let rad1 = theta1*Math.PI/180;
            let x1 = this.wheelRadius*Math.cos(rad0)+(this.width/2); 
            let y1 = this.height - (this.wheelRadius*Math.sin(rad0)+(this.height/2)); 
            let x2 = this.wheelRadius*Math.cos(rad1)+(this.width/2);
            let y2 = this.height - (this.wheelRadius*Math.sin(rad1)+(this.height/2));
            let gradient = this.ctx.createLinearGradient(x1,y1,x2,y2); 
            gradient.addColorStop(0,`hsla(${theta0},100%,50%,1)`);
            gradient.addColorStop(1,`hsla(${theta1},100%,50%,1)`);
            this.ctx.strokeStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(this.width/2,this.height/2,this.wheelRadius,2*Math.PI-(rad0),2*Math.PI-(rad1),true);
            this.ctx.stroke();
            this.ctx.closePath();
        }
    }
    drawOutput = (output) => {
        this.updateSelectedColor(output);
        this.ctxUI.textAlign = 'center';
        this.ctxUI.font = `${this.outerWheelThickness}px monospace`;
        this.ctxUI.fillStyle = 'white';
        this.ctxUI.strokeStyle = 'black';
        this.ctxUI.lineWidth = this.selectorLineWidth+1;
        this.ctxUI.strokeText(output, this.textX, this.textY);
        this.ctxUI.fillText(output, this.textX, this.textY);
    }
    drawSelectors = () => {
        let selectors = [[this.wheelSelector[0],this.wheelSelector[1]],[this.boxSelector[0],this.boxSelector[1]]];
        this.ctxUI.clearRect(0,0,this.width,this.height);
        selectors.forEach(e=> {
            this.ctxUI.moveTo(e[0],e[1]);
            this.ctxUI.beginPath();
            this.ctxUI.lineWidth = this.selectorLineWidth;
            this.ctxUI.strokeStyle = "#252525";
            this.ctxUI.arc(e[0],e[1],this.width/30,0,2*Math.PI);
            this.ctxUI.stroke();
            this.ctxUI.closePath();
            this.ctxUI.beginPath();
            this.ctxUI.lineWidth = this.selectorLineWidth;
            this.ctxUI.strokeStyle = "white";
            this.ctxUI.arc(e[0],e[1],this.width/30-this.selectorLineWidth,0,2*Math.PI);
            this.ctxUI.stroke();
            this.ctxUI.closePath();
        });
        this.drawOutput(cConvert.rgb2hex(...this.selectedColor));
    }
    externalInput = (color) => {
        console.log(this.selfInvoked);
        //add color format detection: hex/hsl
        this.baseColorHEX = color;
        this.baseColorHSL = cConvert.hex2hsl(color);
        this.selectedColor = cConvert.hex2rgb(color);
        this.calculateWheelSelectorPosition(color);
        this.calculateBoxSelectorPosition(color);
        this.drawInnerBox(this.baseColorHSL[0]);
        this.drawSelectors();
    }
    getNearestPointInBox = (x,y) => {
        if (x<this.leftX) { this.x = this.leftX };
        if (x>this.rightX) { this.x = this.rightX };
        if (y<this.topY) { this.y = this.topY };
        if (y>this.bottomY) { this.y = this.bottomY };
        this.boxSelector = [this.x,this.y];
    }
    getNearestPointOnWheel = (x,y,d) => {
        this.x = (this.width/2) + this.wheelRadius*x/d;
        this.y = (this.width/2) + this.wheelRadius*y/d;
        this.wheelSelector = [this.x,this.y];
    }
    mouseData = (e) => {
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.xDist = this.x - this.width/2;
        this.yDist = this.y - this.height/2;
        this.dist = Math.sqrt(this.xDist**2 + this.yDist**2);
    }
    mouseDown = (e) => {
        e.preventDefault();
        this.selfInvoked = true;
        this.mouseData(e);
        if (this.dist > this.innerRadius && this.dist < this.outerRadius) { 
            this.activeSelector = "wheel";
            this.mouseMove(e);
        }
        else if (this.x>this.leftX && this.x<this.rightX && this.y>this.topY && this.y<this.bottomY) { 
            this.activeSelector = "box";
            this.mouseMove(e);
        }
        else { this.activeSelector = null; }
    }
    mouseMove = (e) => {
        if (e.buttons === 0) { return; }
        this.mouseData(e);
        if (this.activeSelector === "wheel") {
            this.getNearestPointOnWheel(this.xDist,this.yDist,this.dist);
            let imgData = this.ctx.getImageData(this.wheelSelector[0],this.wheelSelector[1],1,1).data.slice(0,3);    
            this.drawInnerBox(cConvert.rgb2hsl(...imgData)[0]);
            this.selectedColor = this.ctx.getImageData(this.boxSelector[0],this.boxSelector[1],1,1).data.slice(0,3);
            this.drawSelectors();
        }
        if (this.activeSelector === "box") { 
            this.getNearestPointInBox(this.x,this.y);
            this.selectedColor = this.ctx.getImageData(this.boxSelector[0],this.boxSelector[1],1,1).data.slice(0,3);
            this.drawSelectors();
        }
    }
    mouseUp = () => {
        this.updateSelectedColor(cConvert.rgb2hex(...this.selectedColor));
        this.selfInvoked = false;
    }
}