import React, { Component } from 'react';
import ColorPicker from './components/ColorPicker';
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
      <ColorPicker updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
      <button onClick={() => { this.updateBaseColor("#549388") } }>button</button>
    </div>
  );
  };
}
