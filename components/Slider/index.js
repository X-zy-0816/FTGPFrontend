import { useState } from 'react';
import { Slider, InputNumber } from 'antd';
import styles from './slider.module.css';

const PercentageSlider = ({ value, onChange }) => {
    const [sliderValue, setSliderValue] = useState(value);

    const handleSliderChange = (newValue) => {
        setSliderValue(newValue);
        onChange(newValue);
    };

    const handleInputChange = (newValue) => {
        if (isNaN(newValue)) {
            return;
        }
        setSliderValue(newValue);
        onChange(newValue);
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <Slider
                min={0}
                max={100}
                value={sliderValue}
                onChange={handleSliderChange}
                style={{ marginRight: 16, width: '80%' }}
            />
            <InputNumber
                min={0}
                max={100}
                value={sliderValue}
                onChange={handleInputChange}
                formatter={(value) => `${value}%`}
                parser={(value) => value.replace('%', '')}
            />
        </div>

    );
};

export default PercentageSlider;
