import React, { useState, useEffect, useRef, useCallback } from "react";
import { Typography, Image } from "antd";

import "./PlayingField.scss";
import getWordsApi2 from "../../utils/getWordsApi2";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import ProgressBox from "../ProgressBox/ProgressBox";
import AnswerBox from "../AnswerBox/AnswerBox";
import StepsField from "../StepsField/StepsField";
import ModalNext from "../ModalNext/modalNext";
import ModalNextLevel from "../ModalNext/ModalNextLevel";
import UserSetting from "../UserSetting/UserSetting";

const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";
import soundRight from "../../assets/audio/right_answer.mp3";
import soundWrong from "../../assets/audio//wrong-answer.mp3";
import soundSeconds from "../../assets/audio/seconds.mp3";
import imgLoading from "../../assets/img/loading.gif";

const PlayingField = ({ isSound, user, setUser, statistics, language }) => {
  const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"));

  const userLocal = getStatisticsLocal[user.name];

  const userScore = userLocal[score];

  const diffLevelLocal = userLocal[user.difficultLevel];

  const wordsLevelLocal = diffLevelLocal[user.wordsLevel];

  const [level, setLevel] = useState(Number(user.wordsLevel));
  const [arrWords, setArrWords] = useState(null);
  const [stepCount, setStepCount] = useState(wordsLevelLocal.length);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isAnswer, setIsAnswer] = useState(null);
  const [score, setScore] = useState(userScore);
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(null);
  const [percent, setPercent] = useState(100);
  const [media, setMedia] = useState([
    new Audio(soundRight),
    new Audio(soundWrong),
    new Audio(soundSeconds),
  ]);

  const imageRef = useRef(null);
  const wordRef = useRef(null);

  async function loadWords(currentLevel) {
    const res = await getWordsApi2(currentLevel);

    const stepWordShuffle = res.map((step) => shuffle(step));

    const shuffleLetters = stepWordShuffle.map((words) => {
      return words.map((word) => {
        word.letter = shuffle(word.word.split(""));
        word.image = RS_LANG_DATA + word.image;
        return word;
      });
    });
    setArrWords(shuffleLetters);
  }

  useEffect(() => {
    if (arrWords !== null) {
      setWords(arrWords[stepCount]);
      setStepCount(0);
    }
  }, [arrWords]);

  useEffect(() => {
    if (isAnswer !== null) {
      let answerAndWord = { word: currentWord, answer: isAnswer };

      const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"));

      const userLocal = getStatisticsLocal[user.name];

      const diffLevelLocal = userLocal[user.difficultLevel];

      const wordsLevelLocal = diffLevelLocal[user.wordsLevel];

      if (!wordsLevelLocal[stepCount]) wordsLevelLocal[stepCount] = [];

      const stepConstLocal = wordsLevelLocal[stepCount];

      stepConstLocal.push(answerAndWord);

      let scoreTemp = 0;

      for (const key in userLocal) {
        if (key === "60") {
          for (const key2 in userLocal[key]) {
            console.log(`60`);
            userLocal[key][key2].forEach((el) => {
              console.log(el.filter((el) => el.answer).length);
              scoreTemp += el.filter((el) => el.answer).length;
            });
          }
        }
        if (key === "40") {
          for (const key2 in userLocal[key]) {
            console.log(`40`);
            userLocal[key][key2].forEach((el) => {
              console.log(el.filter((el) => el.answer).length * 2);
              scoreTemp += el.filter((el) => el.answer).length * 2;
            });
          }
        }
        if (key === "20") {
          for (const key2 in userLocal[key]) {
            console.log(`20`);
            userLocal[key][key2].forEach((el) => {
              console.log(el.filter((el) => el.answer).length * 3);
              scoreTemp += el.filter((el) => el.answer).length * 3;
            });
          }
        }
      }

      userLocal["score"] = scoreTemp;

      localStorage.setItem("statistics", JSON.stringify(getStatisticsLocal));
    }
    setIsAnswer(null);
  }, [isAnswer]);

  useEffect(() => {
    setIsLoading(true);
    loadWords(level);
  }, [level]);

  const onCheck = useCallback(
    (letters) => {
      if (letters.join("") === currentWord.word) {
        media[0].play();
        setIsAnswer(true);
        imageRef.current.classList.add("allRight");
        wordRef.current.classList.add("allRight");
      } else {
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
    if (words !== null) {
      setCount(0);
    }
  }, [words]);

  useEffect(() => {
    if (stepCount !== null && arrWords !== null) {
      setWords(arrWords[stepCount]);
      setCount(0);
    }
  }, [stepCount]);

  useEffect(() => {
    if (count === null) return;
    if (words === null) return;
    setPercent(100);
    setIsCheck(false);
    setCurrentWord(words[count]);
    imageRef.current ? imageRef.current.classList.remove("noActive") : null;
    wordRef.current ? wordRef.current.classList.remove("noActive") : null;
    imageRef.current ? imageRef.current.classList.remove("allRight") : null;
    wordRef.current ? wordRef.current.classList.remove("allRight") : null;
  }, [count]);

  const onHandleClickBtnNext = () => {
     if (count < words.length - 1) setCount(count + 1);
   
    else {
      setIsLoading(true);
        if (Number(stepCount) < arrWords.length) {      
        setIsLoading(true);
        ModalNext(setStepCount, stepCount, setCount, wordsLevelLocal, language);
      } else {
        setIsLoading(true);
        ModalNextLevel(level, setLevel, setStepCount, setUser, wordsLevelLocal,language);
      }
    }
  };

  return (
    <>
      <UserSetting
        user={user}
        setUser={setUser}
        language={language}
        score={score}
      />

      {!isLoading ? (
        <div className="context">
          <ProgressBox
            language={language}
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
                height="200px"
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
              language={language}
            />
          </div>
        </div>
      ) : (
        <img src={imgLoading}></img>
      )}

      {arrWords ? (
        <StepsField
          media={media}
          language={language}
          arrWords={arrWords}
          count={count}
          stepCount={stepCount}
          statistics={wordsLevelLocal}
        />
      ) : (
        <></>
      )}
      <div className="footer"></div>
    </>
  );
};

export default PlayingField;
