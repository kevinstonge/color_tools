import React, { Component } from 'react';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import * as cConvert from './accessories/colorConversion';
import './ColorTools.css';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    //baseColor needs to be an HSL array so that h doesn't rest to 0 when s or l reach their extremes.
    //the rest of the code will need to be revised to account for this change
    this.state = { baseColor:[0,100,50] };
  }
  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    this.setState({baseColor:color});
  }
  render() {
  return (
    <div>
      <p>current color: {cConvert.hsl2hex(...this.state.baseColor)}</p>
      <ColorWheel updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
      <HslSliders updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
    </div>
  );
  };
}
