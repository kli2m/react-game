import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip, Switch, Button, Typography, Form, Image, Progress } from "antd";

import "./PlayingField.scss";
import getWordsApi from "../../utils/getWordsApi";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import ProgressBox from '../ProgressBox/ProgressBox'
import loading from "../../assets/img/loading.gif"
const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";


const PlayingField = ({ isSound, selectedLevel }) => {

 

  const [level, setLevel] = useState({ level: selectedLevel, page: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isCheck, setIsCheck] = useState(false);
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(0);
  const [percent, setPercent] = useState(100);

  const { Text, Title } = Typography;

  async function loadWords(currentLevel, page) {
    const res = await getWordsApi(currentLevel, page);

    let uppgradeRes = await res.map((word) => {
      word.letter = shuffle(word.word.split(""));
      word.image = RS_LANG_DATA + word.image;
      return word;
    });

    if (words === null) setWords(shuffle(uppgradeRes));
    else {
      setWords(words.concat(uppgradeRes))
      setCount(count + 1)
      setIsLoading(false)
    }

  }

  useEffect(() => {
    loadWords(level.level, level.page);
  }, [level]);



  const onCheck = (letters) => {
    setIsCheck(true);
    if (letters.join("") === currentWord.word) console.log(true)
    else {

      const contexImageEl =  document.querySelector(".context_image");
      contexImageEl.classList.add("noActive")
      
      const contexWordEl =  document.querySelector(".playingField ");
      contexWordEl.classList.add("noActive")

    }


    setTimeout(()=>{
      const contexImageEl =  document.querySelector(".context_image");
      contexImageEl.classList.remove("noActive")
      
      const contexWordEl =  document.querySelector(".playingField ");
      contexWordEl.classList.remove("noActive")
    },500)
   
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
          <ProgressBox percent={percent} setPercent={setPercent} />
          <div className="context-playing_field">
            <Image
              className="context_image context_child"
              alt="Loading"
              fallback={`Error loading file ${currentWord.image}`}
              width="300px"

              src={currentWord.image}
            ></Image>
            <div className="context_answer">

            </div>
            <Word          
              className="context_word context_child"
              wordSplit={currentWord.letter}
              onCheck={onCheck}
              isCheck={isCheck}
            />
            {isCheck ?

              <Button
                className="context_btn_next context_child"
                onClick={onHandleClickBtnNext}
              >
                Next
              </Button>
              :
              <>
              </>
            }
          </div>
        </div>
      ) : (
          <Title level={4} className="text_loading">
            <Text strong><img src={loading} /></Text>
          </Title>
        )}
    </>
  );
};

export default PlayingField;
