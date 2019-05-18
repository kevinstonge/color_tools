class picker {
    constructor(width=200, height=200,baseColor,colorCanvas,colorCanvasUI,updateFunction) {
    this.baseColorHEX = baseColor;
    this.baseColorHSL = this.hex2hsl(baseColor);
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
    //calculate position of wheelSelector based on baseColorHSL
    //polar to cartesian, adjust for width/radii/thickness)
    this.wheelSelector = [0,0];
    this.calculateWheelSelectorPosition(this.baseColorHSL);
    
    this.boxSelector = [this.width/2,this.bottomY];
    this.activeSelector = "wheel";
    this.selectedColor = this.hex2rgb(baseColor); 
    this.selectorLineWidth = Math.ceil(this.outerWheelThickness/12);
    this.textX = this.width/2;
    this.textY = this.bottomY + this.outerWheelThickness*1.2;
    };
    calculateWheelSelectorPosition(color) {
        console.log('color:',color);
        console.log(this.wheelSelector);
        let r = this.wheelRadius;
        let theta = color[0]*Math.PI/180;
        let x = r*Math.cos(theta)+(this.width/2);
        let y = -r*Math.sin(theta)+(this.height/2);
        this.wheelSelector = [x,y];
        console.log(this.wheelSelector);
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

    mouseData = (e) => {
        this.x = e.offsetX;
        this.y = e.offsetY;
        this.xDist = this.x - this.width/2;
        this.yDist = this.y - this.height/2;
        this.dist = Math.sqrt(this.xDist**2 + this.yDist**2);
    }

    mouseDown = (e) => {
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
            this.drawSelectors();
            //having a problem here, wheelSelector contains unexpected values after adding calculateWheelSelectorPosition function
            console.log(this.wheelSelector);
            let imgData = this.ctx.getImageData(this.wheelSelector[0],this.wheelSelector[1],1,1).data.slice(0,3);    
            this.drawInnerBox(this.rgb2hsl(...imgData)[0]);
        }
        if (this.activeSelector === "box") { 
            this.getNearestPointInBox(this.x,this.y);
            this.drawSelectors();
        }
        if (this.activeSelector) {
            this.selectedColor = this.ctx.getImageData(this.boxSelector[0],this.boxSelector[1],1,1).data.slice(0,3);
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
        this.drawOutput(this.rgb2hex(...this.selectedColor));
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
    rgb2hsl = (r,g,b) => {
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
    rgb2hex = (r, g, b) => {
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
    hsl2rgb = (h,s,l) => {
        s=s/100;
        l=l/100;
        let c=(1-Math.abs((2*l)-1))*s;
        let x=c*(1-Math.abs(((h/60)%2)-1));
        let m=l-c/2;
        let r,g,b;
        if (h<60|h===360) {r=c;g=x;b=0;}
        else if (h<120)	{r=x;g=c;b=0}
        else if (h<180)	{r=0;g=c;b=x}
        else if (h<240) {r=0;g=x;b=c}
        else if (h<300) {r=x;g=0;b=c}
        else if (h<360)	{r=c;g=0;b=x}
        r=Math.round((r+m)*255);g=Math.round((g+m)*255);b=Math.round((b+m)*255);
        return [r,g,b];	
    }
    hex2rgb = (hex) => {
        let r = parseInt(hex.substring(1,3),16);
        let g = parseInt(hex.substring(3,5),16);
        let b = parseInt(hex.substring(5,7),16);
        return [r,g,b];
    }
    
    hex2hsl = (hex) => {
        return this.rgb2hsl(...this.hex2rgb(hex));
    }
    rgb2hsl = (r,g,b) => {
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
}
export default picker;