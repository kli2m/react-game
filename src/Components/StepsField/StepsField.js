import React, { useState, useEffect } from "react";
import { Rate, Slider } from "antd";

import "./StepsField.scss";

let arrSteps = [1, 2, 3, 4, 5];

const StepsField = ({ media }) => {
  const [inputValue, setInputValue] = useState(70);

  useEffect(() => {
    media.forEach((audio) => {
      audio.volume = inputValue / 100;
    });
  }, [inputValue]);

  const onChange = (value) => {
    setInputValue(value);
  };

  return (
    <div className="steps__field">
      <div className="steps__field-title">Steps:</div>
      <div className="steps__field-context">
        {arrSteps.map((el, i) => (
          <span key={arrSteps.length + i}>
            <Rate defaultValue="3" />
            <div className="ant-rate-text">{i}</div>
          </span>
        ))}
      </div>
      <div className="steps__field-sounds_settings">
        <Slider value={inputValue} onChange={onChange}></Slider>
      </div>
    </div>
  );
};

export default StepsField;
