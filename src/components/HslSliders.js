import React, { Component } from 'react'

export default class HslSliders extends Component {
    //      <HslSliders updateBaseColor={this.updateBaseColor} baseColor={this.state.baseColor} />
    constructor(props) {
        super(props);
        this.sliders = ['h','s','l'];
    }
    rChange = () => {
        this.props.updateBaseColor([this.hr.value,this.sr.value,this.lr.value]);
    }
    iChange = (e) => {
        let target = this[e.target.id];
        if (!Number.isInteger(parseFloat(e.target.value))) { return; }
        if (e.target.value < 0 || !e.target.value) { return; }
        if (e.target.id === "hi" && e.target.value > 359) { e.target.value = 359; }
        if ((e.target.id === "si" || e.target.id === "li") && e.target.value > 100) { e.target.value = 100; }
        this.props.updateBaseColor([parseFloat(this.hi.value),parseFloat(this.si.value),parseFloat(this.li.value)]);
    }
    setSliders = () => {
        this.baseColorHSL = this.props.baseColor;
        this.hr.value = this.baseColorHSL[0];
        this.hi.value = this.baseColorHSL[0];
        this.sr.value = this.baseColorHSL[1];
        this.si.value = this.baseColorHSL[1];
        this.lr.value = this.baseColorHSL[2];
        this.li.value = this.baseColorHSL[2];
    }
    componentDidUpdate = () => {
        this.setSliders();
    }
    render() {
        return (
            <React.Fragment>
                <div className="hslSlider" key="h">
                    <label htmlFor="hr">h: </label>
                    <input name="hr" id="hr"  type="range" min="0" max="359" onChange={this.rChange}/>
                    <input type="text" id="hi" onChange={this.iChange}/>
                </div>
                <div className="hslSlider" key="s">
                    <label htmlFor="sr">s: </label>
                    <input name="sr" id="sr" type="range" min="0" max="100" onChange={this.rChange}/>
                    <input type="text" id="si" onChange={this.iChange}/>
                </div>
                <div className="hslSlider" key="lr">
                    <label htmlFor="lr">l: </label>
                    <input name="lr" id="lr" type="range" min="0" max="100" onChange={this.rChange}/>
                    <input type="text" id="li" onChange={this.iChange}/>
                </div>
            </React.Fragment>
        )
    }
    componentDidMount() {
        this.hr = document.querySelector("#hr");
        this.sr = document.querySelector("#sr");
        this.lr = document.querySelector("#lr");
        this.hi = document.querySelector("#hi");
        this.si = document.querySelector("#si");
        this.li = document.querySelector("#li");
        this.setSliders();
    }
}
