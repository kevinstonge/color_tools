import React, { Component } from 'react'
import * as cConvert from '../accessories/colorConversion';

export default class HslSliders extends Component {
    //      <HslSliders updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
    constructor(props) {
        super(props);
        this.sliders = ['h','s','l'];
    }
    hChange = () => {
        this.props.updateBaseColor([this.h.value,this.s.value,this.l.value]);
    }
    setSliders = () => {
        this.baseColorHSL = this.props.baseColor;
        this.h.value = this.baseColorHSL[0];
        this.s.value = this.baseColorHSL[1];
        this.l.value = this.baseColorHSL[2];
    }
    componentDidUpdate = () => {
        this.setSliders();
    }
    render() {
        return (
            <React.Fragment>
                <div className="hslSlider" key="h"><label htmlFor="h">h: </label><input name="h" id="h" type="range" min="0" max="359" onChange={this.hChange}/></div>
                <div className="hslSlider" key="s"><label htmlFor="s">s: </label><input name="s" id="s" type="range" min="0" max="100" onChange={this.hChange}/></div>
                <div className="hslSlider" key="l"><label htmlFor="l">l: </label><input name="l" id="l" type="range" min="0" max="100" onChange={this.hChange}/></div>
            </React.Fragment>
        )
    }
    componentDidMount() {
        this.h = document.querySelector("#h");
        this.s = document.querySelector("#s");
        this.l = document.querySelector("#l");
        this.setSliders();
    }
}
