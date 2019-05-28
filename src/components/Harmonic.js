import React, { Component } from 'react'

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
                "hex":(color)=>{return color}, //import conlorConversion.js and change this
                "hsl":(color)=>{return color},
                "rgb":(color)=>{return color},
            }
        }
        this.state = {
            "Palette Mode": "Tetradic rectangle",
            "Saturation Steps": 5,
            "Luminosity Steps": 5,
            "Copied format": "hex"
        }
    }
    updateState = () => {

    }
    generatePalette = () => {
        // blocks with different base hues from harmonies //==length of paletteMode
        //     row with harmony.length through which luminosity changes
        //     columns through which saturation changes
        let palette = {};
        Object.values(this.settings["Palette Mode"][this.state["Palette Mode"]]).forEach((e,i)=>{
            palette[`hue${i}`] = {};
            for (let j=0;j<=this.state["Saturation Steps"];j++) {
                let saturation = 100*(this.state["Saturation Steps"]-j)/this.state["Saturation Steps"];
                palette[`hue${i}`][`saturation${j}`] = {};
                for (let k=0;k<=this.state["Luminosity Steps"];k++) {
                    let luminosity = 100*(this.state["Luminosity Steps"]-k)/this.state["Luminosity Steps"];
                    palette[`hue${i}`][`saturation${j}`][`luminosity${k}`] = [e,`${saturation}%`,`${luminosity}%`];
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
                <div>
                    {Object.values(this.generatePalette()).map((h,i)=>
                        <div key={`h${i}`}>
                        {Object.values(h).map((s,j)=>
                            <div key={`h${i}s${j}`}>
                                {Object.values(s).map((l,k)=>
                                    <div key={`h${i}s${j}l${k}`} style={{backgroundColor:`hsla(${l.join(",")},1)`}}>{`hsla(${l.join(",")},0)`}</div>
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
