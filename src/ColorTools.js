import React, { Component } from 'react';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import * as cConvert from './accessories/colorConversion';
import './ColorTools.css';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    this.state = { baseColor:[0,100,50] };
    this.textColor = (this.state.baseColor[2]>40) ? "black" : "white";
  }
  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    this.setState({baseColor:color});
    this.textColor = (this.state.baseColor[2]>40) ? "black" : "white";
  }
  render() {
  return (
    <div>
      <div style={{backgroundColor:cConvert.hsl2hex(...this.state.baseColor),color:this.textColor}}>
        <p>hex: {cConvert.hsl2hex(...this.state.baseColor)}</p>
        <p>hsl: {this.state.baseColor.join(",")}</p>
        <p>rgb: {cConvert.hsl2rgb(...this.state.baseColor).join(",")}</p>
      </div>
      <ColorWheel updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
      <HslSliders updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
    </div>
  );
  };
}
