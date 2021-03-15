import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
} from "antd";
import "./AnswerBox.scss";

const AnswerBox = ({ currentWord, isCheck }) => {
  const { Text, Title } = Typography;
  return (
    <div className="context_answer">
      {isCheck ? (
        <Title level={4} className="text_loading">
          <Text type="secondary">
            {" "}
            <div className="context_answer-translate">
              {currentWord.wordTranslate}
            </div>{" "}
          </Text>
          <Text type="warning">
            {" "}
            <div className="context_answer-transcription">
              {currentWord.transcription}
            </div>{" "}
          </Text>
        </Title>
      ) : (
        <></>
      )}
    </div>
  );
};

export default AnswerBox;
