import React, { Component } from 'react'
import {rgb2hsl,hsl2rgb} from '../accessories/colorConversion';

export default class RgbSliders extends Component {
    constructor(props) {
        super(props);
        this.inputs = [["r",255],["g",255],["b",255]];
    }
    cChange = (e) => {
        e.persist();
        const colorVar = e.target.id.substr(0,1); 
        const key = e.nativeEvent.data;
        let value = e.target.value;
        let newColor = this.baseColorRGB.slice();    
        if (e.target.type === "text") {
            if (key === null || value === null) return;
            value = value.replace(/\./,"").replace(/[\D]/g,"");
            if (value >= 255) value = 255;
            e.target.value = value;
        }
        newColor["rgb".indexOf(colorVar)] = Number(e.target.value);
        this.props.updateBaseColor(rgb2hsl(...newColor));
    }

    setSliders = () => {
        this.baseColorRGB = hsl2rgb(...this.props.baseColor);
        ["r","g","b"].forEach((e,i)=>{
            document.querySelector("#"+e+"r").value = this.baseColorRGB[i];
            document.querySelector("#"+e+"t").value = this.baseColorRGB[i];
            }
        );
    }
    componentDidUpdate = () => {
        this.setSliders();
    }
    render() {
        return (
            <React.Fragment>
                {this.inputs.map(e=>
                        <div className="hslSlider" key={e[0]}>
                        <label htmlFor={`${e[0]}r}`}>{e[0]} </label>
                        <input name={`${e[0]}r`} id={`${e[0]}r`}  type="range" min="0" max={e[1]} onChange={this.cChange}/>
                        <input type="text" id={`${e[0]}t`} min="0" max={e[1]} onInput={this.cChange}/>
                        </div>
                    )
                }
            </React.Fragment>
        )
    }
    componentDidMount() {
        this.setSliders();
    }
}
