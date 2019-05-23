import React, { Component } from 'react';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import * as cConvert from './accessories/colorConversion';
import './ColorTools.css';
import RgbSliders from './components/RgbSliders';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      baseColor:[0,100,50],
      width:300,
    };
    this.textColor = (this.state.baseColor[2]>40) ? "black" : "white";
  }
  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    if (color[0] >= 360) { color[0] = 0 }
    if (color[1] >= 100) { color[1] = 100 }
    if (color[2] >= 100) { color[2] = 100 }
    this.textColor = (color[2]>40) ? "black" : "white";
    this.setState({baseColor:color});
  }
  render() {
  return (
    <div id="colorToolsFlexContainer">
      <div id="colorPickers" style={{width:this.state.width}}>
        <div id="colorOutput" style={{backgroundColor:cConvert.hsl2hex(...this.state.baseColor),color:this.textColor}}>
          <p>hex: {cConvert.hsl2hex(...this.state.baseColor)}</p>
          <p>hsl: {this.state.baseColor.join(", ")}</p>
          <p>rgb: {cConvert.hsl2rgb(...this.state.baseColor).join(", ")}</p>
        </div>
        <ColorWheel updateBaseColor={this.updateBaseColor} state={this.state} />
        <HslSliders updateBaseColor={this.updateBaseColor} state={this.state} />
        <RgbSliders updateBaseColor={this.updateBaseColor} state={this.state} />
      </div>
    </div>
  );
  };
}
