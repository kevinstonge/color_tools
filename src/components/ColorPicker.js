import React, { Component } from 'react';
import picker from './picker';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorPicker extends Component {

    updateSelectedColor = (color) => { 
        if (color === this.props.baseColor) { return; }
        this.props.updateBaseColor(color);
    }
    componentDidUpdate() {
        if(this.colorPicker.selfInvoked === false) {
            this.colorPicker.externalInput(this.props.baseColor);
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
        this.colorPicker = new picker(300,300,this.props.baseColor,colorCanvas,colorCanvasUI,this.updateSelectedColor);
        window.addEventListener("load",()=>{this.colorPicker.drawOuterWheel();this.colorPicker.drawInnerBox(); this.colorPicker.drawSelectors();});
        window.addEventListener("mousedown",this.colorPicker.mouseDown);
        window.addEventListener("mousemove",this.colorPicker.mouseMove);
        window.addEventListener("mouseup",this.colorPicker.mouseUp);
        //add touchevents!
    }
};

