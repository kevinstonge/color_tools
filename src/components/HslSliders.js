import React, { Component } from 'react'

export default class HslSliders extends Component {
    constructor(props) {
        super(props);
        this.inputs = [["h",359],["s",100],["l",100]];
        this.buffer = [];
    }
    cFocus = (e) => {
        e.target.select();
        const colorVar = e.target.id.substr(0,1);
        this.buffer = [colorVar,e.target.value];
    }
    cChange = (e) => {
        e.persist();
        const colorVar = e.target.id.substr(0,1); 
        const key = e.nativeEvent.data;
        let value = e.target.value;
        const newColor = this.props.baseColor.slice();    
        if ((key === null || value === null) && e.nativeEvent.inputType.substr(0,6)!=="delete") return;
        if (e.target.type === "text") {
            value = value.replace(/\./,"[dec]").replace(/\./g,"").replace("[dec]",".").replace(/[^\d.]/g,"");
            if (colorVar === "h" && value >= 359.99) value = 359.99;
            if ((colorVar === "s" || colorVar === "l") && value > 100) value = 100;
            this.buffer=[colorVar,value];
            e.target.value = this.buffer[1];
        }
        if (value) {
            newColor["hsl".indexOf(colorVar)] = Number(value);
            this.props.updateBaseColor(newColor);
        }
    }

    setSliders = () => {
        ["h","s","l"].forEach((e,i)=>{
            const value = (e===this.buffer[0]) ? this.buffer[1] : this.props.baseColor[i];
            document.querySelector("#"+e+"r").value = Number(value);
            document.querySelector("#"+e+"t").value = value;
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
                        <input type="text" id={`${e[0]}t`} min="0" max={e[1]} onChange={this.cChange} onFocus={this.cFocus} onBlur={()=>this.buffer=[]}/>
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
