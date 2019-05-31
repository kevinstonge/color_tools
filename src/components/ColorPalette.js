import React, { Component } from 'react'
import Harmonic from './Harmonic';
import Shading from './Shading';
import './ColorPalette.css';

export default class ColorPalette extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            mode: Shading,
            modes: [Harmonic, Shading]
        }
    }

    render() {
        return (
            <React.Fragment>
                <Harmonic paletteState={this.state} globalState={this.props.state} updateBaseColor={this.props.updateBaseColor} />
                {/* {React.createElement(this.state.mode,{paletteState:this.state,globalState:this.props.state,updateBaseColor:this.props.updateBaseColor})} */}
            </React.Fragment>
        )
    }
}
