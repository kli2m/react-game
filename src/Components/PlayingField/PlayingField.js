import React, { useState, useEffect, useRef, useCallback } from "react";
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
import soundSeconds from "../../assets/audio/seconds.mp3";
import imgLoading from '../../assets/img/loading.gif'

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
  const [media, setMedia] = useState([
    new Audio(soundRight),
    new Audio(soundWrong),
    new Audio(soundSeconds),
  ]);

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

  const addStatisticsUser = (user) => {
    let userStat;
    for (const key in statistics) {
      if (key[name] === user.name) userStat = Object.create(key[name]);
    }

    if (!userStat) userStat = { name: user, statistics: {} };
  };

  // useEffect(() => {
  // if(isAnswer) {

  //   setStatistics(statistics)
  // }
  // }, [isAnswer]);

  const onCheck = useCallback(
    (letters) => {
      if (letters.join("") === currentWord.word) {
        console.log(`Right`);
        media[0].play();
        setIsAnswer(true);
        imageRef.current.classList.add("allRight");
        wordRef.current.classList.add("allRight");
      } else {
        console.log(`wrong`);
        media[1].play();
        setIsAnswer(false);
        imageRef.current.classList.add("noActive");
        wordRef.current.classList.add("noActive");
      }
      setIsCheck(true);
    },
    [currentWord]
  );

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
    imageRef.current ? imageRef.current.classList.remove("noActive") : null;
    wordRef.current ? wordRef.current.classList.remove("noActive") : null;
    imageRef.current ? imageRef.current.classList.remove("allRight") : null;
    wordRef.current ? wordRef.current.classList.remove("allRight") : null;
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
              soundSecond={media[2]}
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
          <StepsField media={media} />
          <div className="footer"></div>
        </>
      ) : (
        <Image src={imgLoading}></Image>
      )}
    </>
  );
};

export default PlayingField;
