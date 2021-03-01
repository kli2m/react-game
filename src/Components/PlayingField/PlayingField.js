import React, { useState, useEffect, useRef, useCallback } from "react";
import {

  Typography,

  Image,

} from "antd";

import "./PlayingField.scss";
import getWordsApi2 from "../../utils/getWordsApi2";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import ProgressBox from "../ProgressBox/ProgressBox";
import AnswerBox from "../AnswerBox/AnswerBox";
import StepsField from "../StepsField/StepsField";
import ModalNext from "../ModalNext/ModalNext";
import ModalNextLevel from "../ModalNext/ModalNextLevel";
import UserSetting from "../UserSetting/UserSetting";

const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";
import soundRight from "../../assets/audio/right_answer.mp3";
import soundWrong from "../../assets/audio//wrong-answer.mp3";
import soundSeconds from "../../assets/audio/seconds.mp3";
import imgLoading from "../../assets/img/loading.gif";

const PlayingField = ({ isSound, user, setUser }) => {



  const [level, setLevel] = useState(user.wordsLevel);
  const [arrWords, setArrWords] = useState(null);
  const [stepCount, setStepCount] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isAnswer, setIsAnswer] = useState(null);

  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(100);
  //const [statistics, setStatistics] = useState(getLocalSt);
  const [media, setMedia] = useState([
    new Audio(soundRight),
    new Audio(soundWrong),
    new Audio(soundSeconds),
  ]);

  const imageRef = useRef(null);
  const wordRef = useRef(null);

  const { Text, Title } = Typography;

  async function loadWords(currentLevel) {
    setIsLoading(true)

    const res = await getWordsApi2(currentLevel);

    const stepWordShuffle = res.map((step) => shuffle(step));

    const shuffleLetters = stepWordShuffle.map((words) => {
      return words.map((word) => {
        word.letter = shuffle(word.word.split(""));
        word.image = RS_LANG_DATA + word.image;
        return word;
      });
    });
    console.log('await loaded')
    setArrWords(shuffleLetters);
  }

  useEffect(() => {
    setIsLoading(true)
    if (arrWords !== null) setWords(arrWords[stepCount]);
  }, [arrWords]);

  useEffect(() => {
    setIsLoading(true);
    setCurrentWord(null)
    setCount(0);
    setStepCount(0);
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
    console.log(`currentWord`);
    console.log(currentWord);
    if (currentWord !== null) setIsLoading(false)  
  }, [currentWord]);

  useEffect(() => {
    console.log(`words`);
    console.log(words);
    if (words !== null) {    
      setCurrentWord(words[count]);
    }
  }, [words]);


  useEffect(() => {
    console.log(`stepCount`);
    console.log(stepCount);
    if (stepCount !== null && arrWords !== null) {
      setWords(arrWords[stepCount]);
      setCount(0);
    }
  }, [stepCount]);

  useEffect(() => {
    console.log(`count`);
    console.log(count);
    if (words === null) return;
    setPercent(100);
    setIsCheck(false);
    setCurrentWord(words[count]);
    setIsAnswer(false);
    imageRef.current ? imageRef.current.classList.remove("noActive") : null;
    wordRef.current ? wordRef.current.classList.remove("noActive") : null;
    imageRef.current ? imageRef.current.classList.remove("allRight") : null;
    wordRef.current ? wordRef.current.classList.remove("allRight") : null;  
  }, [count]);

  const onHandleClickBtnNext = () => {
    // if (count < words.length - 1) setCount(count + 1);
    if (count < 2) setCount(count + 1);
    else {
      setIsLoading(true);
      //  if (stepCount < arrWords.length) {
      if (stepCount < 2) {
        setIsLoading(true);
        ModalNext(setStepCount, stepCount, setCount);
      } else {
        setIsLoading(true);
        ModalNextLevel(level, setLevel, setStepCount);
      }
    }
  };

  return (
    <>
      {!isLoading ? (
        <>

          <UserSetting user={user} setUser={setUser} />
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
              />
            </div>
          </div>
          <StepsField media={media} arrWords={arrWords} count={count} />
          <div className="footer"></div>
        </>
      ) : (
          <img src={imgLoading}></img>
        )}
    </>
  );
};

export default PlayingField;
