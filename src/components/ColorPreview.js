import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';

export default class ColorPreview extends Component {
    constructor(props) {
        super(props);
        this.buffer="";
        this.updateColorData();
        this.updateCSS();
    }
    updateColorData() {
        let color = this.props.state.baseColor;
        this.colorData = {
            "hex":cConvert.hsl2hex(...color),
            "hsl":color,
            "rgb":cConvert.hsl2rgb(...color)
        }
    }
    updateCSS = () => {
        let contrastColor = (this.colorData.hsl[2]>45) ? "black" : "white";
        this.cStyle = {
            backgroundColor:this.colorData.hex,
            color:contrastColor,
            border:`1px solid ${contrastColor}`,
            fontWeight:"bold",
            margin:"0.1em 0.5em"
        }
    }
    iChange = (e) => {
        e.persist();
    }

    iFocus = (e) => {
        e.target.select();
        this.buffer = e.target.value;
    }

    updatePreview = () => {
        this.updateColorData();
        this.updateCSS();
        Object.keys(this.colorData).forEach((e,i,a)=>{
                console.log(this.colorData[e]);
                document.querySelector(`#${e}Input`).value = this.colorData[e];
            }
        );
    }
    render() {
        return (
            <div id="colorOutput" style={this.cStyle}>
                {Object.keys(this.colorData).map(e=>
                    <p key={e}>
                    <label htmlFor={e}>{e}: </label>
                    <input id={`${e}Input`} type="text" size="16" onChange={this.iChange} onFocus={this.iFocus} onBlur={()=>{this.buffer=""}} style={this.cStyle}/>
                    </p>
                )}
          </div>
        )
    }
    componentDidMount() {
        this.updatePreview();
    }
    componentWillUpdate = () => {
        this.updatePreview();
    }
}