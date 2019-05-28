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
                "Custom": []
            },
            "Saturation Steps": {
                type: "range",
                min: 0,
                max: 10
            },
            "Luminosity Steps": {
                type: "range",
                min: 0,
                max: 10
            },
            "Copied format": {
                type: "list",
                "hex":(color)=>{return cConvert.hsl2hex(color)},
                "hsl":(color)=>{return color},
                "rgb":(color)=>{return cConvert.hsl2rgb(color)},
            }
        }
        this.state = {
            "Palette Mode": "Triadic",
            "Saturation Steps": 3,
            "Luminosity Steps": 3,
            "Copied format": "hex"
        }
    }
    updateState = () => {

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
                    palette[`hue${i}`][`saturation${j}`][`luminosity${k}`] = [cConvert.hueReset(this.props.globalState.baseColor[0]+e).toFixed(2),`${saturation.toFixed(2)}%`,`${luminosity.toFixed(2)}%`];
                }
            }
        });
        return palette;
    }

    render() {
        return (
            <div>
                <h2>harmonic palette</h2>
                <p>mode: {this.state["Palette Mode"]} ({this.settings["Palette Mode"][this.state["Palette Mode"]].join(", ")})</p>
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
