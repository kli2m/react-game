import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./PlayingField.scss";
import Cell from "../Cell/Cell";
import createArr from "../../utils/createArr";
import getWordsApi from "../../utils/getWordsApi";

const PlayingField = ({ isSound, selectedLevel }) => {
  const [level, setLevel] = useState({ level: selectedLevel, page: 0 });
  const [words, setWords] = useState([]);
  const [cells, setCells] = useState(createArr(3));

  useEffect(() => {
    async function loadWords(currentLevel, page) {
      const res = await getWordsApi(currentLevel, page);
      res.sort(() => Math.random() - 0.5);
      setWords(res);
    }
    loadWords(level.level, level.page);
  }, [level]);

  console.log(words);
  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(words);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setWords(items);
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playingField" direction="horizontal">
          {(provided) => (
            <div
              className="playingField"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {words.map((e, i) => (
                <Draggable key={e.id} draggableId={e.id} index={i}>
                  {(provided) => (
                    <Cell valueCell={e.word} provided={provided} />
                  )}
                </Draggable>
              ))}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default PlayingField;
