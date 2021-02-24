import React, { useState, useEffect, useRef } from "react";
import { Tooltip, Switch, Button, Typography, Form, Image, Progress } from "antd";

import "./PlayingField.scss";
import getWordsApi from "../../utils/getWordsApi";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import ProgressBox from '../ProgressBox/ProgressBox'
import AnswerBox from '../AnswerBox/AnswerBox'
import loading from "../../assets/img/loading.gif"
const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";


const PlayingField = ({ isSound, user }) => {

  const getLocalSt =  localStorage.getItem("statistics")?localStorage.setItem("statistics"):null

  const [level, setLevel] = useState({ level: user.wordsLevel, page: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [isAnswer, setIsAnswer] = useState(null);
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(100);
  const [statistics,setStatistics]=useState(getLocalSt)

  const imageRef=useRef(null)
  const wordRef=useRef(null)

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
      setWords(words.concat(upgradeRes))
      setCount(count + 1)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    loadWords(level.level, level.page);
  }, [level]);


const addStatisticsUser = (user)=>{
let userStat 
for (const key in statistics) {
if(key[name]===user.name) userStat= Object.create(key[name])
}

if(!userStat) userStat={name:user,statistics:{}}

}

  // useEffect(() => {
  // if(isAnswer) {


  //   setStatistics(statistics)
  // }
  // }, [isAnswer]);

  const onCheck = (letters) => {
    setIsCheck(true);
    if (letters.join("") === currentWord.word) {     
      setIsAnswer(true)
    }else {
      setIsAnswer(false)
      imageRef.current.classList.add("noActive")     
      wordRef.current.classList.add("noActive")
    }
   
  }

  useEffect(() => {
    if (currentWord !== null) setIsLoading(false);
    setPercent(100)
  }, [currentWord]);

  useEffect(() => {
    if (words !== null) setCurrentWord(words[count]);
  }, [words]);

  useEffect(() => {
    if (words !== null) setCurrentWord(words[count]);
    setIsAnswer(false)
    imageRef.current? imageRef.current.classList.remove("noActive"):null
    wordRef.current? wordRef.current.classList.remove("noActive"):null
  }, [count]);

  const onHandleClickBtnNext = () => {
    if (count < words.length - 1) setCount(count + 1);
    else {
      setIsLoading(true);
      setLevel({ level: level.level, page: level.page + 1 })
    }

    setIsCheck(false)
  };



  return (
    <>
      {!isLoading ? (
        <div className="context">
          <ProgressBox percent={percent} setPercent={setPercent} difficultLevel={user.difficultLevel}/>
          <div className="context-playing_field">
            <div ref ={imageRef}>
            <Image
              className="context_image"
              alt="Loading"
              fallback={`Error loading file ${currentWord.image}`}
              width="300px"             
              src={currentWord.image}
            ></Image>
            </div>
            <AnswerBox 
            currentWord={currentWord} 
            isCheck={isCheck}
            />           
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
      ) : (
        <div className="context">
          <Title level={4} className="text_loading">
            <Text strong><img src={loading} /></Text>
          </Title>
          </div>
        )}
    </>
  );
};

export default PlayingField;
