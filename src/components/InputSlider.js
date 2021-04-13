import React from 'react';
import RangeSlider from 'react-bootstrap-range-slider';

const InputSlider = (props) => {

    const {setValue, value, min, max, isDisabled} = props;

    return (
        <RangeSlider
            value={value}
            onChange={e => setValue(e.target.value)}
            min={min}
            max={max}
            disabled={isDisabled}
        />
    );
};

export default InputSlider;
