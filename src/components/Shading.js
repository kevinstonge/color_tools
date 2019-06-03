import React, { Component } from 'react'
import {hueReset} from '../accessories/colorConversion';
import * as cookies from '../accessories/cookies';


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
        let lContrast = this.state["luminosity contrast"][2];
        let sContrast = this.state["saturation contrast"][2];
        let paletteSize = this.state["palette size"][2];
        let midPalette = paletteSize/2;
        let hueShift = (i<midPalette) ? shadow : highlight;
        let h = baseHue + (hueShift*(i-midPalette)/midPalette);
        let s = baseSaturation;
        let l = baseLuminosity;
        if (i<midPalette) {
            //shading
            let lShift = (baseLuminosity/midPalette)*(midPalette-i-1);
            l = baseLuminosity - (lShift*(lContrast/this.state["luminosity contrast"][1])**.2);
            let sShift = (baseSaturation/midPalette)*(midPalette-i-1);
            s = baseSaturation - (sShift*(sContrast)/this.state["saturation contrast"][1]);
        }
        else {
            //highlighting
            let lShift = ((100-baseLuminosity)/midPalette)*(i-midPalette);
            l = baseLuminosity + (lShift*(lContrast/this.state["luminosity contrast"][1]));
            let sShift = ((100-baseSaturation)/midPalette)*(i-midPalette);
            s = baseSaturation + (sShift*(sContrast/this.state["saturation contrast"][1]));
        }
        /*luminosity:
            when i<midPalette divide baseLuminosity by lcontrast*i
        */

        // //shade
        //     //luminosity drops A LOT, hue moves SLIGHTLY, saturation drops a MEDIUM amount
        //     //hue and saturation drop linearly, luminosity drops exponentially (rate increases in darker areas)
       
        return [hueReset(h).toFixed(2),s.toFixed(2),l.toFixed(2)];
    }
    updateSettings = (e) => {
        e.persist();
        let newState = this.state;
        newState[e.target.name][2] = Number(e.target.value);
        this.setState(newState);
        this.updateCookie();
    }
    updateCookie = () => {
        cookies.setCookie("Shading",JSON.stringify(this.state),1);
    }

    applyCookie = () => {
        let cookie = cookies.getCookie("Shading");
        (cookie) ? this.setState(JSON.parse(cookie)) : this.updateCookie();
    }
    render() {
        let paletteSize = this.state["palette size"][2];
        let palette = new Array(paletteSize);
        palette = palette.fill("0").map((e,i,a)=>this.calculateColor(i));
        let shadingGradient = 
            `linear-gradient(to right, 
                ${palette.map(e=>`hsl(${e[0]},${e[1]}%,${e[2]}%)`)}
        )`;
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
                            {palette.map((e,i)=>{
                                let color = e;
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
                    <div className="paletteBlock">
                        <div style={{
                            background:shadingGradient,
                            width: "200px",
                            height: "200px"
                        }}>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
    componentDidMount () {
        this.applyCookie();
    }
}