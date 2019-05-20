import React, { Component } from 'react';
import picker from './picker';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { baseColor: '#FF0000' };
    };
    updateSelectedColor = (color,selfInvoked) => { 
        //add color format detection: hex? hsl?
        if (color === this.state.baseColor) { return; }
        this.setState({baseColor:color});
        if (selfInvoked!==true) {
            //selfInvoked should be passed as true from within picker.js because drawOutput calls updateSelectedColor (infinite loop)
            this.colorPicker.baseColorHEX = color;
            this.colorPicker.baseColorHSL = this.colorPicker.hex2hsl(color);
            this.colorPicker.selectedColor = this.colorPicker.hex2rgb(color);
            this.colorPicker.calculateWheelSelectorPosition(color);
            //need calculateBoxSelectorPosition
            this.colorPicker.drawOutput(color);
            this.colorPicker.drawSelectors();
        }
    }
    test = () => { this.updateSelectedColor("#00FF00"); };
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
};

