import React, { Component } from 'react';
import ColorWheel from './components/ColorWheel';
import HslSliders from './components/HslSliders';
import './ColorTools.css';
export default class ColorTools extends Component {
  constructor(props) {
    super (props);
    this.state = { baseColor: '#FF0000' };
  }
  updateBaseColor = (color) => { 
    if (color === this.state.baseColor) { return; }
    this.setState({baseColor:color});
  }
  render() {
  return (
    <div>
      <p>current color: {this.state.baseColor}</p>
      <ColorWheel updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
      <HslSliders updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
    </div>
  );
  };
}
