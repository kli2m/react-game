import React, { useState, useEffect, useRef } from "react";
import {
  Tooltip,
  Switch,
  Button,
  Typography,
  Form,
  Image,
  Progress,
  Spin,
} from "antd";

import "./PlayingField.scss";
import getWordsApi from "../../utils/getWordsApi";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import ProgressBox from "../ProgressBox/ProgressBox";
import AnswerBox from "../AnswerBox/AnswerBox";
import StepsField from "../StepsField/StepsField";
const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";
import soundRight from "../../assets/audio/right_answer.mp3";
import soundWrong from "../../assets/audio//wrong-answer.mp3";
import seconds from '../../assets/audio/seconds.mp3';


const PlayingField = ({ isSound, user }) => {
  const getLocalSt = localStorage.getItem("statistics")
    ? localStorage.setItem("statistics")
    : null;

  const [level, setLevel] = useState({ level: user.wordsLevel, page: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isAnswer, setIsAnswer] = useState(null);
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(100);
  const [statistics, setStatistics] = useState(getLocalSt);
  const [arrAudio,setArrAudio]=useState([new Audio(seconds),new Audio(soundRight),new Audio(soundWrong)])

  const imageRef = useRef(null);
  const wordRef = useRef(null);

  const { Text, Title } = Typography;

  async function loadWords(currentLevel, page) {
    const res = await getWordsApi(currentLevel, page);
    let upgradeRes = await res.map((word) => {
      word.letter = shuffle(word.word.split(""));
      word.image = RS_LANG_DATA + word.image;
      return word;
    });

    if (words === null) setWords(shuffle(upgradeRes));
    else {
      setWords(words.concat(upgradeRes));
      setCount(count + 1);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    loadWords(level.level, level.page);
  }, [level]);

  const effectRightAnswer = () => {
    arrAudio[1].play()
    setIsAnswer(true);
    imageRef.current.classList.add("allRight");
    wordRef.current.classList.add("allRight");
  };

  const effectWrongAnswer = () => {
    arrAudio[2].play()
    setIsAnswer(false);
    imageRef.current.classList.add("noActive");
    wordRef.current.classList.add("noActive");
  };

  const delEffectsAnswer = () => {
    imageRef.current ? imageRef.current.classList.remove("noActive") : null;
    wordRef.current ? wordRef.current.classList.remove("noActive") : null;
    imageRef.current ? imageRef.current.classList.remove("allRight") : null;
    wordRef.current ? wordRef.current.classList.remove("allRight") : null;
  };

  const onCheck = (letters) => {
    if (letters.join("") === currentWord.word) {
      effectRightAnswer();
    } else {
      effectWrongAnswer();
    }
    setIsCheck(true);
  };

  useEffect(() => {
    if (currentWord !== null) setIsLoading(false);
  }, [currentWord]);

  useEffect(() => {
    if (words !== null) setCurrentWord(words[count]);
  }, [words]);

  useEffect(() => {
    setPercent(100);
    setIsCheck(false);
    if (words !== null) setCurrentWord(words[count]);
    setIsAnswer(false);
    delEffectsAnswer();
  }, [count]);

  const onHandleClickBtnNext = () => {
    if (count < words.length - 1) setCount(count + 1);
    else {
      setIsLoading(true);
      setLevel({ level: level.level, page: level.page + 1 });
    }
  };

  return (
    <>
      {!isLoading ? (
        <>
          <div className="header"></div>

          <div className="context">
            <ProgressBox
              audioSeconds={arrAudio[0]}
              percent={percent}
              setPercent={setPercent}
              difficultLevel={user.difficultLevel}
              isCheck={isCheck}
              onCheck={onCheck}
            />
            <div className="context-playing_field">
              <div ref={imageRef}>
                <Image
                  className="context_image"
                  alt="Loading"
                  fallback={`Error loading file ${currentWord.image}`}
                  width="300px"
                  src={currentWord.image}
                ></Image>
              </div>
              <AnswerBox currentWord={currentWord} isCheck={isCheck} />
              <Word
                className="context_word"
                wordSplit={currentWord.letter}
                onCheck={onCheck}
                isCheck={isCheck}
                onHandleClickBtnNext={onHandleClickBtnNext}
                wordRef={wordRef}
              />
            </div>
          </div>
          <StepsField arrAudio={arrAudio} />
          <div className="footer"></div>
        </>
      ) : (
        <Spin tip="Loading..." size="large"></Spin>
      )}
    </>
  );
};

export default PlayingField;
