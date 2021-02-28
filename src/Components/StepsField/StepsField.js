import React, { useState, useEffect } from "react";
import { Steps, Slider } from "antd";
import { FireOutlined } from "@ant-design/icons";
const { Step } = Steps;
import "./StepsField.scss";

const StepsField = ({ media,arrWords,count }) => {
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
      <Steps direction="vertical">
        {arrWords.map((el, i) =>                       
          <Step key={arrWords.length+i} title={`Step ${i+1}`} description={`${count}/${el.length}`} />
        )}
        
         </Steps>
      </div>
      <div className="steps__field-sounds_settings">
        <Slider value={inputValue} onChange={onChange}></Slider>
      </div>
    </div>
  );
};

export default StepsField;
