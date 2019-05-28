import React, { Component } from 'react'
import Harmonic from './Harmonic';
import './ColorPalette.css';

export default class ColorPalette extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            mode: Harmonic,
            modes: "Harmonic, Shading"
        }
    }

    render() {
        return (
            <React.Fragment>
                {React.createElement(this.state.mode,{paletteState:this.state,globalState:this.props.state})}
            </React.Fragment>
        )
    }
}
