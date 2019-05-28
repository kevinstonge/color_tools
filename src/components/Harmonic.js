import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';

export default class Harmonic extends Component {
    constructor(props) {
        super(props)
        this.settings = {
            "Palette Mode": {
                type: "list",
                "Complementary": [0,180],
                "Analogous": [0,30,330],
                "Triadic": [0,120,240],
                "Tetradic rectangle": [0,30,60,210,240],
                "Tetradic square": [0,90,180,270],
                "Complementary split": [0,150,210],
                "Complementary with split": [0,150,180,210],
                // "Custom": []
            },
            "Saturation Steps": {
                type: "range",
                min: 1,
                max: 7
            },
            "Luminosity Steps": {
                type: "range",
                min: 1,
                max: 7
            },
            "Copied format": {
                type: "list",
                "hex":(color)=>{return cConvert.hsl2hex(color)},
                "hsl":(color)=>{return color},
                "rgb":(color)=>{return cConvert.hsl2rgb(color)},
            }
        }
        this.state = {
            "Palette Mode": "Complementary with split",
            "Saturation Steps": 4,
            "Luminosity Steps": 4,
            "Copied format": "hex"
        }
    }
    updateState = (e) => {
        e.persist();
        let newState = this.state;
        let value = e.target.value;
        if (value.match(/\d+/g)) { value = Number(value) }
        newState[e.target.name] = value;
        this.setState(newState);
    }
    generatePalette = () => {
        let palette = {};
        Object.values(this.settings["Palette Mode"][this.state["Palette Mode"]]).forEach((e,i)=>{
            palette[`hue${i}`] = {};
            for (let j=0;j<=this.state["Saturation Steps"]-1;j++) {
                let saturation = 100*(this.state["Saturation Steps"]-j)/this.state["Saturation Steps"];
                palette[`hue${i}`][`saturation${j}`] = {};
                for (let k=1;k<=this.state["Luminosity Steps"];k++) {
                    let luminosity = 100*(1+this.state["Luminosity Steps"]-k)/(1+this.state["Luminosity Steps"]);
                    palette[`hue${i}`][`saturation${j}`][`luminosity${k}`] = [cConvert.hueReset(Number(this.props.globalState.baseColor[0])+e).toFixed(2),`${Number(saturation).toFixed(2)}%`,`${Number(luminosity).toFixed(2)}%`];
                }
            }
        });
        return palette;
    }

    render() {
        return (
            <div>
                <h2>harmonic color palettes</h2>
                <div className="paletteSettings">
                    {Object.keys(this.state).map(e=>
                        <div key={`set${e}`} className={`paletteSetting`}>
                        <label htmlFor={e}>{e}
                            {(this.settings[e].type === "list") ? 
                                Object.keys(this.settings[e]).map((f,i)=>{
                                    if (i===0) { return `:` }
                                    else { 
                                        return <label key={f}><input id={f} name={e} value={f} type="radio" onChange={this.updateState}/>{f} </label> 
                                    }
                                })
                                : 
                                <React.Fragment> ({this.state[e]}): <input type="range" name={e} min={this.settings[e]["min"]} max={this.settings[e]["max"]} value={this.state[e]} onChange={this.updateState}/></React.Fragment>
                            }
                        </label>
                        </div>
                    )}
                </div>
                <div className="paletteContainer">
                    {Object.values(this.generatePalette()).map((h,i)=>
                        <div key={`h${i}`} className="paletteBlock">
                        {Object.values(h).map((s,j)=>
                            <div key={`h${i}s${j}`} className="paletteRow">
                                {Object.values(s).map((l,k)=>
                                    <div 
                                        key={`h${i}s${j}l${k}`} 
                                        className="paletteBox" 
                                        style={{backgroundColor:`hsl(${l.join(",")})`}}
                                        title={`click to copy:\n ${l.join(", ")}`}
                                    ></div>
                                )}
                            </div>
                        )}
                        </div>
                    )}
                </div>
            </div>
        )
    }

}
