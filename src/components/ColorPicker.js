import React, { Component } from 'react';

//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { baseColor: '#ff0000' };
    };
    updateSelectedColor = (color) => { 
        this.setState({baseColor:color});
    }
    render() {
        return (
            <React.Fragment>
            <p>current color: {this.state.baseColor}</p>
            <div id="canvasContainer">
            <canvas id="colorCanvas"></canvas>
            <canvas id="colorCanvasUI"></canvas>
            </div>
            </React.Fragment>
        );
    };
    componentDidMount() {
        this.colorCanvas = document.querySelector('#colorCanvas');
        this.colorCanvasUI = document.querySelector('#colorCanvasUI');
        this.x = 0;
        this.y = 0;
        this.xDist = 0;
        this.yDist = 0;
        this.dist = 0;
        this.width = 300;
        this.height = this.width;
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
        this.wheelSelector = [this.width-(this.outerWheelThickness/2),this.height/2];
        this.boxSelector = [this.width/2,this.bottomY];
        this.selectedColor = "#FF0000"; //
        this.activeSelector = "wheel";
        this.selectorLineWidth = Math.ceil(this.outerWheelThickness/12);
        this.textX = this.width/2;
        this.textY = this.bottomY + this.outerWheelThickness;

    this.drawOuterWheel = (segments=12) => { 
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
    
    this.drawInnerBox = (baseColor=0) => {
        for (let row = this.topY; row <= this.bottomY; row++) { 
            let rowPercent = 100*(row-this.topY)/(this.bottomY-this.topY);
            let boxGradient = this.ctx.createLinearGradient(this.leftX,row,this.rightX,row);
            let steps = 12;
            for (let i=0; i<=steps; i++) { //ten gradient steps produces acceptable results
                boxGradient.addColorStop(i/steps,`hsla(${baseColor},${rowPercent}%,${i*steps}%,1)`);
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
    
    this.mouseData = (e) => {
        this.x = e.layerX;
        this.y = e.layerY;
        this.xDist = this.x - this.width/2;
        this.yDist = this.y - this.height/2;
        this.dist = Math.sqrt(this.xDist**2 + this.yDist**2);
    }
    
    this.mouseDown = (e) => {
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
    
    this.mouseMove = (e) => {
        if (e.buttons === 0) { return; }
        this.mouseData(e);
        if (this.activeSelector === "wheel") {
            this.getNearestPointOnWheel(this.xDist,this.yDist,this.dist);
            this.drawSelectors();
            let imgData = this.ctx.getImageData(this.wheelSelector[0],this.wheelSelector[1],1,1).data.slice(0,3);    
            this.drawInnerBox(this.rgb2hsl(...imgData)[0]);
        }
        if (this.activeSelector === "box") { 
            this.getNearestPointInBox(this.x,this.y);
            this.drawSelectors();
        }
        if (this.activeSelector) {
            this.selectedColor = this.ctx.getImageData(this.boxSelector[0],this.boxSelector[1],1,1).data.slice(0,3);
            //do something with selectedColor?
            this.updateSelectedColor(...this.selectedColor);
            console.log('hi',...this.selectedColor);
        }
    }
    
    this.drawSelectors = () => {
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
    }
    
    this.drawOuterWheel = (segments=12) => { 
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

    this.drawInnerBox = (baseColor=0) => {
        for (let row = this.topY; row <= this.bottomY; row++) { 
            let rowPercent = 100*(row-this.topY)/(this.bottomY-this.topY);
            let boxGradient = this.ctx.createLinearGradient(this.leftX,row,this.rightX,row);
            for (let i=0; i<=10; i++) { //ten gradient steps produces acceptable results
                boxGradient.addColorStop(i/10,`hsla(${baseColor},${rowPercent}%,${i*10}%,1)`);
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

    this.mouseData = (e) => {
        this.x = e.layerX;
        this.y = e.layerY;
        this.xDist = this.x - this.width/2;
        this.yDist = this.y - this.height/2;
        this.dist = Math.sqrt(this.xDist**2 + this.yDist**2);
    }

    this.mouseDown = (e) => {
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

    this.mouseMove = (e) => {
        if (e.buttons === 0) { return; }
        this.mouseData(e);
        if (this.activeSelector === "wheel") {
            this.getNearestPointOnWheel(this.xDist,this.yDist,this.dist);
            this.drawSelectors();
            let imgData = this.ctx.getImageData(this.wheelSelector[0],this.wheelSelector[1],1,1).data.slice(0,3);    
            this.drawInnerBox(this.rgb2hsl(...imgData)[0]);
        }
        if (this.activeSelector === "box") { 
            this.getNearestPointInBox(this.x,this.y);
            this.drawSelectors();
        }
        if (this.activeSelector) {
            this.selectedColor = this.ctx.getImageData(this.boxSelector[0],this.boxSelector[1],1,1).data.slice(0,3);
            this.drawOutput(this.rgb2hex(...this.selectedColor));
        }
    }

    this.drawOutput = (output) => {
        this.updateSelectedColor(output);
        this.ctxUI.textAlign = 'center';
        this.ctxUI.font = `${this.outerWheelThickness}px monospace`;
        this.ctxUI.fillStyle = 'white';
        this.ctxUI.strokeStyle = 'black';
        this.ctxUI.lineWidth = this.selectorLineWidth+1;
        this.ctxUI.strokeText(output, this.textX, this.textY);
        this.ctxUI.fillText(output, this.textX, this.textY);
    }

    this.drawSelectors = () => {
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
    }

    this.getNearestPointInBox = (x,y) => {
        if (this.x<this.leftX) { this.x = this.leftX };
        if (this.x>this.rightX) { this.x = this.rightX };
        if (this.y<this.topY) { this.y = this.topY };
        if (this.y>this.bottomY) { this.y = this.bottomY };
        this.boxSelector = [this.x,this.y];
    }

    this.getNearestPointOnWheel = (x,y,d) => {
        this.x = (this.width/2) + this.wheelRadius*x/d;
        this.y = (this.width/2) + this.wheelRadius*y/d;
        this.wheelSelector = [this.x,this.y];
    }

    this.rgb2hsl = (r,g,b) => {
        r=r/255; g=g/255; b=b/255;
        let h,s,l,d,min,max = null;
        max=Math.max(r,g,b);
        min=Math.min(r,g,b);
        d=max-min;
        l=(max+min);
        if (max===r) { h = 60*(((g-b)/d)%6); }
        if (max===g) { h = 60*(((b-r)/d)+2); }
        if (max===b) { h = 60*(((r-g)/d)+4); }
        if (d===0) { h=0; s=0; }
        if (h<0) { h=h+360; }
        if (d!==0) { s=d/(1-Math.abs(l-1)); }
        h = Math.round(h,2);
        s = Math.round(s*100,2);
        l = Math.round(l*50,2);
        return [h,s,l];
    }
    
    this.rgb2hex = (r, g, b) => {
        let c = [r,g,b];
        c = "#" + c.map(
            function(item){
                return item.toString(16);
            }).map(
            function(item){
                if(item.length===1){return "0" + item;}
                else {return(item);}
            }).join("").toUpperCase();
        return c;
    }
    
    this.getNearestPointInBox = (x,y) => {
        if (x<this.leftX) { this.x = this.leftX };
        if (x>this.rightX) { this.x = this.rightX };
        if (y<this.topY) { this.y = this.topY };
        if (y>this.bottomY) { this.y = this.bottomY };
        this.boxSelector = [this.x,this.y];
    }
    
    this.getNearestPointOnWheel = (x,y,d) => {
        this.x = (this.width/2) + this.wheelRadius*x/d;
        this.y = (this.width/2) + this.wheelRadius*y/d;
        this.wheelSelector = [this.x,this.y];
    }
    
    this.rgb2hsl = (r,g,b) => {
        r=r/255; g=g/255; b=b/255;
        let h = null;
        let s = null;
        let max=Math.max(r,g,b);
        let min=Math.min(r,g,b);
        let d=max-min;
        let l=(max+min);
        if (max===r) { h = 60*(((g-b)/d)%6); }
        if (max===g) { h = 60*(((b-r)/d)+2); }
        if (max===b) { h = 60*(((r-g)/d)+4); }
        if (d===0) { h=0; s=0; }
        if (h<0) { h=h+360; }
        if (d!==0) { s=d/(1-Math.abs(l-1)); }
        h = Math.round(h,2);
        s = Math.round(s*100,2);
        l = Math.round(l*50,2);
        return [h,s,l];
    }
        window.addEventListener("load",()=>{this.drawOuterWheel();this.drawInnerBox(); this.drawSelectors();});
        window.addEventListener("mousedown",this.mouseDown);
        window.addEventListener("mousemove",this.mouseMove);
        //add touchevents!
    }
};

