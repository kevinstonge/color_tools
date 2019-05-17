import React, { Component } from 'react';
import picker from './picker';
//todo: "copy"/"OK"/"close" buttons
//todo: preview box in top left
export default class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.state = { baseColor: '#FF0000' };
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
        let colorCanvas = document.querySelector("#colorCanvas");
        let colorCanvasUI = document.querySelector("#colorCanvasUI");
        this.colorPicker = new picker(300,300,colorCanvas,colorCanvasUI,this.updateSelectedColor);
        window.addEventListener("load",()=>{this.colorPicker.drawOuterWheel();this.colorPicker.drawInnerBox(); this.colorPicker.drawSelectors();});
        window.addEventListener("mousedown",this.colorPicker.mouseDown);
        window.addEventListener("mousemove",this.colorPicker.mouseMove);
        //add touchevents!
    }
};

