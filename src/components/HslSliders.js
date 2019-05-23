import React, { Component } from 'react'

export default class HslSliders extends Component {
    constructor(props) {
        super(props);
        this.inputs = [["h",359],["s",100],["l",100]];
    }
    cChange = (e) => {
        e.persist();
        const colorVar = e.target.id.substr(0,1); 
        const key = e.nativeEvent.data;
        let value = e.target.value;
        const newColor = this.props.baseColor.slice();    
        if (e.target.type === "text") {
            if (key === null || value === null) return;
            value = value.replace(/\./,"").replace(/[\D]/g,"");
            if (colorVar === "h" && value >= 359) value = 359;
            if ((colorVar === "s" || colorVar === "l") && value > 100) value = 100;
            e.target.value = value;
        }
        newColor["hsl".indexOf(colorVar)] = Number(e.target.value);
        this.props.updateBaseColor(newColor);
    }

    setSliders = () => {
        ["h","s","l"].forEach((e,i)=>{
            document.querySelector("#"+e+"r").value = this.props.baseColor[i];
            document.querySelector("#"+e+"t").value = this.props.baseColor[i];
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
                        <input type="text" id={`${e[0]}t`} min="0" max={e[1]} onChange={this.cChange}/>
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
