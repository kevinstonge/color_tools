import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';
// import copyToClipboard from '../accessories/copyToClipboard';

export default class Shading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // "setting":[min,max,current/default]
            "highlight temp":[-50,50,20],
            "shadow temp":[-50,50,-20],
            "luminosity contrast": [1,10,9],
            "saturation contrast": [1,10,5],
            "palette size": [3,100,100],
        }
    }
    calculateColor = (i) => {
        let baseColor = this.props.globalState.baseColor;
        let baseHue = Number(baseColor[0]);
        let baseSaturation = Number(baseColor[1]);
        let baseLuminosity = Number(baseColor[2]);
        let highlight = this.state["highlight temp"][2] * ((baseHue >= 0 && baseHue < 180) ? -1 : 1);
        let shadow = this.state["shadow temp"][2] * ((baseHue >=0 && baseHue < 180) ? 1 : -1);
        let lcontrast = 0.1*this.state["luminosity contrast"][2];
        let scontrast = 0.1*this.state["saturation contrast"][2];
        let paletteSize = this.state["palette size"][2];
        let midPalette = paletteSize/2;
        let hueShift = (i<midPalette) ? shadow : highlight;
        let h = baseHue + (hueShift*(i-midPalette)/midPalette);
        let s = baseSaturation * (scontrast*(i+1)/midPalette);
        let l = baseLuminosity * ((i)**(lcontrast)/midPalette);
        // //shade
        //     //luminosity drops A LOT, hue moves SLIGHTLY, saturation drops a MEDIUM amount
        //     //hue and saturation drop linearly, luminosity drops exponentially (rate increases in darker areas)
       
        return [cConvert.hueReset(h).toFixed(2),s.toFixed(2),l.toFixed(2)];
    }
    updateSettings = (e) => {
        e.persist();
        let newState = this.state;
        newState[e.target.name][2] = Number(e.target.value);
        this.setState(newState);
        //this.props.updateCookie({"Shading":newState});
    }
    applyCookie = () => {
        let cookieObject = JSON.parse(document.cookie);
        if (cookieObject && cookieObject["Shading"]) { this.setState(cookieObject["Shading"]); }
    }
    render() {
        let paletteSize = this.state["palette size"][2];
        return (
            <React.Fragment>
                <h3>shading color palette</h3>
                <div className="paletteSettings">
                    {Object.keys(this.state).map(e=>{
                        return(
                            <div className="paletteSetting" key={e}>
                                <span className="paletteSettingLabel">{e}</span>
                                <input type="range" min={this.state[e][0]} max={this.state[e][1]} value={this.state[e][2]} onChange={this.updateSettings} name={e}></input>
                            </div>
                        );
                    })}
                </div>
                <div className="paletteContainer">
                    <div className="paletteBlock">
                        <div className="paletteRow" style={{display:'flex',flexWrap:'wrap',width:'21em'}}>
                            {new Array(paletteSize).fill(0).map((e,i)=>{
                                let color = this.calculateColor(i);
                                let clipBoardString = this.props.copiedFormats[this.props.paletteState["Copied format"]]([color[0],color[1],color[2]]);
                                let cssColor = `hsl(${color[0]},${color[1]}%,${color[2]}%)`;
                                return(
                                    <div 
                                        className="paletteBox"
                                        key={i}
                                        style={{backgroundColor:cssColor}}
                                        title={`click to copy:\n${clipBoardString}`}
                                        onClick={(e)=>{this.props.paletteBoxClick(e,clipBoardString,[color[0],color[1],color[2]])}}
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
    componentDidMount () {
        //this.applyCookie();
    }
}