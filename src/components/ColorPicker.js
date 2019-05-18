import React, { Component } from 'react';
import picker from './picker';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { baseColor: '#0000FF' };
    };
    updateSelectedColor = (color) => { 
        if (color === this.state.baseColor) { return; }
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
            <button onClick={this.test}>button</button>
            </React.Fragment>
        );
    };
    componentDidMount() {
        let colorCanvas = document.querySelector("#colorCanvas");
        let colorCanvasUI = document.querySelector("#colorCanvasUI");
        this.colorPicker = new picker(300,300,this.state.baseColor,colorCanvas,colorCanvasUI,this.updateSelectedColor);
        window.addEventListener("load",()=>{this.colorPicker.drawOuterWheel();this.colorPicker.drawInnerBox(); this.colorPicker.drawSelectors();});
        window.addEventListener("mousedown",this.colorPicker.mouseDown);
        window.addEventListener("mousemove",this.colorPicker.mouseMove);
        //add touchevents!
    }
    componentDidUpdate() {
        this.colorPicker.calculateWheelSelectorPosition(this.state.baseColor);
        this.colorPicker.drawSelectors();
        //need to set position of wheelSelector & boxSelector, then call drawSelectors!
        //but the math to calculate the selector position doesn't exist yet. 
    }
};

