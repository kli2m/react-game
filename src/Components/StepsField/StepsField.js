import React, { useState, useEffect } from "react";
import { Steps, Slider, Typography } from "antd";
import { FireOutlined } from "@ant-design/icons";
const { Step } = Steps;
import "./StepsField.scss";

const StepsField = ({language, media, arrWords, count, statistics, stepCount }) => {

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
  <Text strong>{language.steps_page_title}</Text>
        </Title>

      </div>
      <div className="steps__field-context">
        <Steps direction="vertical" current={stepCount} >
          {arrWords.map((el, i, arr) => {
            if (i < stepCount) return <Step key={arr.length + i} title={`${language.steps_page_item_title} ${i + 1}`} description={` ${language.steps_page_item_right} ${statistics[i].filter(e=>e.answer===true).length} ${language.steps_page_item_wrong} ${statistics[i].filter(e=>e.answer===false).length}`} />
            else if (i === stepCount) return <Step key={arr.length + i} title={`${language.steps_page_item_title} ${i + 1}`} description={`${count}/20`} />
            else return <Step key={arr.length + i} title={`${language.steps_page_item_title} ${i + 1}`} description={`0/20`} />
          })}

        </Steps>
      </div>
      <div className="steps__field-sounds_settings">
        <Title level={5} >
        <Text strong>{language.steps_page_volume_title}</Text>
        </Title>

        <Slider value={inputValue} onChange={onChange}></Slider>
      </div>
    </div>
  );
};

export default StepsField;
