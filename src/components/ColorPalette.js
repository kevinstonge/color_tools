import React, { Component } from 'react'
import Harmonic from './Harmonic';
import Shading from './Shading';
import './ColorPalette.css';

export default class ColorPalette extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            mode: 1
        }
        this.modes = [Harmonic, Shading]
    }
    changeMode = (e) => {
        e.persist();
        let newState = {mode: Number(e.target.id.replace("paletteMode",""))};
        this.setState(newState);
    }
    render() {
        return (
            <React.Fragment>
            <div id="colorPaletteModeButtons">
                {this.modes.map((e,i)=>{
                    let mode = e.name;
                    let checked = (i===this.state.mode) ? true : false;
                    let id = `paletteMode${i}`;
                    return (
                        <span key={mode} className="colorPaletteModeButton">
                            <input type="radio" name="paletteMode" id={id} checked={checked} onChange={this.changeMode}></input>
                            <label htmlFor={id}>{mode}</label>
                        </span>
                    );
                })}
            </div>
            {React.createElement(this.modes[this.state.mode],{paletteState:this.state,globalState:this.props.state,updateBaseColor:this.props.updateBaseColor})}
            </React.Fragment>
        )
    }
}
