import React from 'react';

import './index.css';

const Switch = ({ name, val, setter, text }) => {
    const handleChange = _ => val
        ? setter(false)
        : setter(true);

    return (
        <div className="switch flex flex-column start mrb-16 relative">
            <label className="field__label">{name}</label>
            <div className="flex center">
                <input
                    className="mr-none"
                    name={name}
                    type="checkbox"
                    id="switch"
                    value={val}
                    onChange={handleChange}
                    checked={val}
                />
                <label 
                    className="switch__label" 
                    htmlFor="switch">
                    Toggle
                </label>
                <span className="sub-title mrl-16">
                    {text} {val && `yes!`}
                </span>
            </div>
        </div>
    )
};

export default Switch;