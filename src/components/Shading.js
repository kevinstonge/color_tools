import React, { Component } from 'react'
// import * as cConvert from '../accessories/colorConversion';
// import copyToClipboard from '../accessories/copyToClipboard';

export class Shading extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // "setting":[min,max,current/default]
            "relative hue of highlight":[0,359,10],
            "relative hue of shadow":[0,359,10],
            "luminosity contrast": [1,100,1],
            "saturation contrast": [1,100,1],
            "palette size": [1,10,10],
        }
    }
    calculateColor = (i) => {
        let baseColor = this.props.globalState.baseColor;
        let highlight = this.state["relative hue of highlight"][2];
        let shadow = this.state["relative hue of shadow"][2];
        let lcontrast = this.state["luminosity contrast"][2];
        let scontrast = this.state["saturation contrast"][2];
        let paletteSize = this.state["palette size"][2];
        // //shade
        //     //luminosity drops A LOT, hue moves SLIGHTLY, saturation drops a MEDIUM amount
        //     //hue and saturation drop linearly, luminosity drops exponentially (rate increases in darker areas)
        //     //add luminosity contrast and temperature contrast sliders
        //     h = Math.floor(h + hCurve*((180-h)/f2)*(f1/f2));
        //     s = Math.floor(s - s*Math.pow(f1/f2,sCurve)); 
        //     l = Math.floor(l - l*Math.pow(f1/f2,lCurve)); 
        //     return [h,s,l];

        let h = Math.floor(baseColor[0]+(shadow)*((180-baseColor[0])/paletteSize)*(i/paletteSize));
        // //highlight
        
        //     if (h<=180) { hGap=h; r=-1; } 
        //     if (h>180) { hGap=360-h; r=1; } 
        //     h=Math.floor(h+((hCurve*hGap*r)*Math.pow((f1/f2),2)));
        //     sGap=s; lGap=100-l;
        //     s = Math.floor(s-sCurve*sGap*(f1/f2));
        //     l = Math.floor(l+sCurve*lGap*(f1/f2));
        //     return [h,s,l];

        console.log(h);
        return `hsl(${h},100%,50%)`;
    }
    render() {
        let paletteSize = this.state["palette size"][2];
        return (
            <React.Fragment>
                <h3>shading color palette</h3>
                <div className="paletteSettings">
                    <p>settings</p>
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

export default Shading
