import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const InputSlider = (props) => {

    const {setValue, value, min, max} = props;

    return (
        <RangeSlider
            value={value}
            onChange={e => setValue(e.target.value)}
            min={min}
            max={max}
        />
    );
};

export default InputSlider;
