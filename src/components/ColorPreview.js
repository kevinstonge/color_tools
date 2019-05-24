import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';

export default class ColorPreview extends Component {
    constructor(props) {
        super(props);
        this.buffer="";
        this.colorData={
            "hex":()=>cConvert.hsl2hex(...this.props.state.baseColor),
            "hsl":()=>this.props.state.baseColor.join(", "),
            "rgb":()=>cConvert.hsl2rgb(...this.props.state.baseColor).join(", ")
        };
    } 
    iChange = (e) => {
        e.persist();
        let newColor = null;
        let input = e.target.value;
        if (input === "") { return; }
        if (e.nativeEvent.data === ".") {
            let charAfterCarat = input[e.target.selectionStart];
            if (charAfterCarat === undefined) { return; }
            else if (charAfterCarat.match(/^[0-9]/)===null) { return; }
        }
        if (e.target.id === "hexInput") {
            if (input.match(/^#{0,1}[0-9a-f]{6}$/i)) { 
                document.querySelector("#hexhelp").innerText = "❔";
                newColor = cConvert.hex2hsl(input);
            }
            else { 
                document.querySelector("#hexhelp").innerText = "❓";
            }
        }
        if (e.target.id === "hslInput") {
            let tempColor = input.match(/(\d*\.{0,1}\d*)/g);
            if (tempColor) { 
                tempColor = tempColor.filter(Boolean); 
                if (tempColor[0]<360 && tempColor[1]<=100 && tempColor[2]<=100) {
                    document.querySelector("#hslhelp").innerText = "❔";
                    newColor = tempColor.slice(0,3);
                }
                else {
                    document.querySelector("#hslhelp").innerText = "❓";
                }
            }
        }
        if (e.target.id === "rgbInput") {
            let tempColor = input.match(/\d{1,3}/g);
            if (tempColor) { 
                tempColor = tempColor.filter(Boolean); 
                if (tempColor[0]<=255 && tempColor[1]<=255 && tempColor[2]<=255) {
                    document.querySelector("#rgblhelp").innerText = "❔";
                    newColor = cConvert.rgb2hsl(...tempColor.slice(0,3));
                }
                else {
                    document.querySelector("#rgbhelp").innerText = "❓";
                }
            }
        }
        if (newColor) { this.props.updateBaseColor(newColor); }
    }

    iFocus = (e) => {
        e.target.select();
        this.buffer = e.target.value;
    }

    getData = (type) => { 
        if (typeof this.colorData[type] === "function") { return this.colorData[type]() }
        if (type === "style") {
            return ({
                backgroundColor:cConvert.hsl2hex(...this.props.state.baseColor),
                color:(this.props.state.baseColor[2]>45)?"black":"white",
            });
        }
    }
    updateInputs = () => {
        Object.keys(this.colorData).forEach(e=>{
            document.querySelector(`#${e}Input`).value = this.getData(e)
        })
    }
    copyColor = (e) => {
        document.querySelector(`#${e.target.id.slice(4)}`).select();
        document.execCommand("copy");
        //briefly show the ✔️ emoji in place of the clipboard emoji
    }
    render() {
        return (
            <div>
            <div id="colorOutput" style={this.getData("style")}>
                {Object.keys(this.colorData).map(e=>
                    <p key={e}>
                    <label htmlFor={`${e}Input`}>{e}: 
                    <input id={`${e}Input`} type="text" size="16" onChange={this.iChange} onFocus={this.iFocus} onBlur={()=>{this.buffer=""}} style={this.getData("style")} />
                    {/* ❓ ❔ */}
                    <span role="img" arei-label="help" aria-hidden="true" id={`${e}help`} title="">❔</span>
                    <span role="img" arei-label="copy" aria-hidden="true" id={`copy${e}Input`} title="copy" onClick={this.copyColor}>📋</span>
                    </label>
                    </p>
                )}
          </div>
          </div>
        )
    }
    componentDidMount() {
         this.updateInputs();
    }
    componentDidUpdate() {
        this.updateInputs();
    }
}