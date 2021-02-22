import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip, Switch, Button, Typography, Form, Image } from "antd";

import "./PlayingField.scss";
import getWordsApi from "../../utils/getWordsApi";
import shuffle from "../../utils/shuffle";
import Word from "../Word/Word";
import loading from "../../assets/img/loading.gif"
const RS_LANG_DATA =
  "https://raw.githubusercontent.com/kli2m/rslang-data/master/";
 

const PlayingField = ({ isSound, selectedLevel }) => {
  const [level, setLevel] = useState({ level: selectedLevel, page: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [words, setWords] = useState(null);
  const [currentWord, setCurrentWord] = useState(null);
  const [count, setCount] = useState(0);

  const { Text, Title } = Typography;

  async function loadWords(currentLevel, page) {
    const res = await getWordsApi(currentLevel, page);

    let uppgradeRes = res.map((word) => {
      word.letter = shuffle(word.word.split(""));
      word.image = RS_LANG_DATA + word.image;
      return word;
    });
    console.log("level");
  if(words===null) setWords(shuffle(uppgradeRes));
  else{ setWords(words.concat(uppgradeRes))
    setIsLoading(false)
  }
  
  }

  useEffect(() => {
    loadWords(level.level, level.page);
  }, []);

  useEffect(() => {
    if (currentWord !== null)   setIsLoading(false);
  }, [currentWord]);

  useEffect(() => {
    if (words !== null) setCurrentWord(words[count]);
  }, [words]);

  useEffect(() => {
    if (words !== null) setCurrentWord(words[count]);
  }, [count]);

const nullify=()=>{
  setCount(0);
  setCurrentWord(null)
  setWords(null);
  loadWords(level.level, level.page++);
}

  const onHandleClickBtnNext = () => {
    if (count < words.length-1) setCount(count + 1);
    else {

      setIsLoading(true)
      loadWords(level.level, level.page++);
     
      // nullify();
    }
  };

  return (
    <>
      {!isLoading ? (
        <div className="context">
          <Image
            className="context_image context_child"
            alt="Loading"
            fallback={`Error loading file ${currentWord.image}`}
            width="max-content"
            src={currentWord.image}
          ></Image>

          <Word
            className="context_word context_child"
            wordSplit={currentWord.letter}
          />

          <Button
            className="context_btn_next context_child"
            onClick={onHandleClickBtnNext}
          >
            Next
          </Button>
        </div>
      ) : (
        <Title level={4} className="text_loading">
          <Text strong><Image src={loading}></Image> </Text>
        </Title>
      )}
    </>
  );
};

export default PlayingField;
