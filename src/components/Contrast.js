import React, { Component } from 'react'
import {hueReset} from '../accessories/colorConversion';


export default class Contrast extends Component {
    calculateColor = (baseHue,baseSaturation,baseLuminosity) => {
        let hueAdjust = (baseHue > 18 && baseHue <= 200) ? 240 : 60;
        let h = hueReset(hueAdjust);
        let s = 100  - baseSaturation;
        let l;
        if (baseLuminosity < 40) { l = 80 }
        if (baseLuminosity >= 40) { l = 20 }
        if (baseHue > 18 && baseHue <=200 && l === 80) { l = 90 }
        return `hsl(${h},${s}%,${l}%)`
    }
    render() {
        let baseColor = this.props.globalState.baseColor;
        let baseHue = Number(baseColor[0]);
        let baseSaturation = Number(baseColor[1]);
        let baseLuminosity = Number(baseColor[2]);
        let contrastColor = this.calculateColor(baseHue,baseSaturation,baseLuminosity);
        let baseColorCSS = `hsl(${baseColor[0]},${baseColor[1]}%,${baseColor[2]}%)`;
        return (
            <div>
                <div className="contrastColorRow">
                    <p className="contrastColorLabel">Color with high contrast to selected color:
                    <span 
                        className="contrastColorBox"
                        style={{backgroundColor:contrastColor}}
                    >
                        &nbsp;&nbsp;
                    </span>
                    </p>
                </div>
                <div className="contrastColorSample" style={{backgroundColor:baseColorCSS}}>
                    <p className="contrastColorSampleText" style={{color:contrastColor}}>
                        <span style={{fontWeight:"normal"}}>Normal </span>
                        <span style={{fontWeight:"bold"}}>Bold </span>
                        <span style={{fontStyle:"italic"}}>Italic </span>
                    </p>
                    <p>{contrastColor}</p>
                </div>
                {/* this code was used to look for the most contrasting hues */}
                {/* <table>
                    {new Array(60).fill("0").map((e,i)=>
                        <tr key={`tr${i}`}>
                            <td>{i*6}</td>
                            {new Array(60).fill("0").map((e,j)=>
                                <td style={{backgroundColor:`hsl(${i*6},100%,50%)`}}>
                                    <span style={{color:`hsl(${hueReset((i*6)+(j*6))},100%,50%)`}}>
                                        {((j*6))}
                                    </span>
                                </td>
                            )}
                        </tr>
                    )}
                </table> */}
            </div>
        )
    }
}
