import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';
// import copyToClipboard from '../accessories/copyToClipboard';

export default class Shading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // "setting":[min,max,current/default]
            "relative hue of highlight":[0,359,50],
            "relative hue of shadow":[-50,50,20],
            "luminosity contrast": [1,100,1],
            "saturation contrast": [1,100,20],
            "palette size": [1,10,10],
        }
    }
    calculateColor = (i) => {
        let baseColor = this.props.globalState.baseColor;
        let highlight = this.state["relative hue of highlight"][2];
        //highlight should trend towards warmer hues (h=0)
        let shadow = this.state["relative hue of shadow"][2];
        //shadow should trend towards cooler hues (h=180)
        let lcontrast = this.state["luminosity contrast"][2];
        let scontrast = this.state["saturation contrast"][2];
        let paletteSize = this.state["palette size"][2];
        let midPalette = paletteSize/2;
        let hueShift = (i<midPalette) ? shadow : highlight;
        let h = baseColor[0] + (hueShift*(i-midPalette)/midPalette);
        let s = baseColor[1] + scontrast*i;
        let l = baseColor[2] + lcontrast*i;
        // //shade
        //     //luminosity drops A LOT, hue moves SLIGHTLY, saturation drops a MEDIUM amount
        //     //hue and saturation drop linearly, luminosity drops exponentially (rate increases in darker areas)
       
        return `hsl(${cConvert.hueReset(h)},${s}%,${l}%)`;
    }
    updateSettings = (e) => {
        e.persist();
        let newState = this.state;
        newState[e.target.name][2] = Number(e.target.value);
        this.setState(newState);
        this.forceUpdate();
    }
    render() {
        let paletteSize = this.state["palette size"][2];
        return (
            <React.Fragment>
                <h3>shading color palette</h3>
                <div className="paletteSettings">
                    <input type="range" min={this.state["relative hue of shadow"][0]} max={this.state["relative hue of shadow"][1]} value={this.state["relative hue of shadow"][2]} onChange={this.updateSettings} name="relative hue of shadow"></input>
                </div>
                <div className="paletteContainer">
                    <div className="paletteBlock">
                        <div className="paletteRow">
                            {new Array(paletteSize).fill(0).map((e,i)=>{
                                let color = this.calculateColor(i);
                                return(
                                    <div 
                                        className="paletteBox"
                                        key={i}
                                        style={{backgroundColor:color}}
                                        title={color}
                                    >
                                    </div>
                                );
                            }) }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}