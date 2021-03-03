import React, { useState, useEffect } from "react";
import { Steps, Slider, Typography } from "antd";
import { FireOutlined } from "@ant-design/icons";
const { Step } = Steps;
import "./StepsField.scss";

const StepsField = ({ media, arrWords, count, statistics, stepCount }) => {

  const [inputValue, setInputValue] = useState(70);
  const { Text, Title } = Typography;
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
      <div className="steps__field-title">
        <Title level={4} >
          <Text strong>Steps:</Text>
        </Title>

      </div>
      <div className="steps__field-context">
        <Steps direction="vertical" current={stepCount} >
          {arrWords.map((el, i, arr) => {
            if (i < stepCount) return <Step key={arr.length + i} title={`Step ${i + 1}`} description={` Right : ${statistics[i].filter(e=>e.answer===true).length} Wrong: ${statistics[i].filter(e=>e.answer===false).length}`} />
            else if (i === stepCount) return <Step key={arr.length + i} title={`Step ${i + 1}`} description={`${count}/20`} />
            else return <Step key={arr.length + i} title={`Step ${i + 1}`} description={`0/20`} />
          })}

        </Steps>
      </div>
      <div className="steps__field-sounds_settings">
        <Title level={5} >
          <Text strong>Volume control  &#129321;</Text>
        </Title>

        <Slider value={inputValue} onChange={onChange}></Slider>
      </div>
    </div>
  );
};

export default StepsField;
