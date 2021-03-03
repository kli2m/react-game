import React, {  useEffect } from "react";
import { Progress  } from "antd";
import "./ProgressBox.scss";

const ProgressBox = ({
  soundSecond,
  percent,
  setPercent,
  difficultLevel,
  isCheck,
  onCheck,
  language
}) => {

  useEffect(() => {
    if (!isCheck) {
      if (percent > 1) {
        soundSecond.play();
        let timer = setInterval(() => progress(), 1000);
        return () => clearInterval(timer);
      } else onCheck([]);
    }
  }, [percent]);

  const progress = () => {
    setPercent(percent - 100 / difficultLevel);
  };

  return (
    <div className="context-progress_bar">
      <Progress
        className="context-progress_bar-cirle"
        type="circle"
        strokeColor
        percent={percent}
        format={(percent) =>
          percent > 1
            ? `${Math.ceil((percent / 100) * difficultLevel)} ${language.progress_page_seconds_text}`
            : `${language.progress_page_seconds_lose}`
        }
        strokeColor="#2A9C50"
        trailColor="red"
        strokeWidth="9"
        width="60"
        gapPosition="top"
      ></Progress>
    </div>
  );
};

export default ProgressBox;
