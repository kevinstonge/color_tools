import React, { Component } from 'react';
import ColorPreview from './components/ColorPreview';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import ColorPalette from './components/ColorPalette';
import './ColorTools.css';
import RgbSliders from './components/RgbSliders';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    this.state = { 
      baseColor:[0,100,50],
      width:300,
    };
  }
  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    if (color[0] >= 360) { color[0] = 0 }
    if (color[1] >= 100) { color[1] = 100 }
    if (color[2] >= 100) { color[2] = 100 }
    color.forEach((e,i,a)=>a[i]=Number(e));
    this.textColor = (color[2]>40) ? "black" : "white";
    this.setState({baseColor:color});
  }
  render() {
  return (
    <div id="colorToolsFlexContainer">
      <div id="colorPickers" style={{width:this.state.width}}>
        <ColorPreview updateBaseColor={this.updateBaseColor} state={this.state} />
        <ColorWheel updateBaseColor={this.updateBaseColor} state={this.state} />
        <HslSliders updateBaseColor={this.updateBaseColor} state={this.state} />
        <RgbSliders updateBaseColor={this.updateBaseColor} state={this.state} />
      </div>
      <div className="colorPalette">
        <ColorPalette state={this.state}/>
      </div>
    </div>
  );
  };
}
