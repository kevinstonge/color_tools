import React, { Component } from 'react';
import cWheel from './wheel';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorWheel extends Component {

    updateSelectedColor = (color) => { 
        if (color === this.props.baseColor) { return; }
        this.props.updateBaseColor(color);
    }
    componentDidUpdate() {
        if(this.colorWheel.selfInvoked === false) {
            this.colorWheel.externalInput(this.props.baseColor);
        }
    }
    render() {
        return (
            <React.Fragment>
            <div id="canvasContainer">
                <canvas id="colorCanvas"></canvas>
                <canvas id="colorCanvasUI"></canvas>
            </div>
            </React.Fragment>
        );
    };
    componentDidMount() {
        let colorCanvas = document.querySelector("#colorCanvas");
        let colorCanvasUI = document.querySelector("#colorCanvasUI");
        this.colorWheel = new cWheel(300,300,this.props.baseColor,colorCanvas,colorCanvasUI,this.updateSelectedColor);
        this.colorWheel.drawOuterWheel();this.colorWheel.drawInnerBox(); this.colorWheel.drawSelectors();
        colorCanvasUI.addEventListener("mousedown",this.colorWheel.mouseDown);
        colorCanvasUI.addEventListener("mousemove",this.colorWheel.mouseMove);
        colorCanvasUI.addEventListener("mouseup",this.colorWheel.mouseUp);
        //add touchevents!
    }
};

