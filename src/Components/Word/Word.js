import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip, Switch, Button, Typography, Form, Image } from "antd";
import Cell from "../Cell/Cell";

const Word = ({
  wordSplit,
  onCheck,
  isCheck,
  onHandleClickBtnNext,
  wordRef,
}) => {
  const [letters, setLetters] = useState(wordSplit);

  useEffect(() => {
    setLetters(wordSplit);
  }, [wordSplit]);

  function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(letters);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setLetters(items);
  }

  return (
    <>
      <div ref={wordRef}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="playingField" direction="horizontal ">
            {(provided, snapshot) => (
              <div
                className="playingField"
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  backgroundColor: snapshot.isDraggingOver
                    ? "#2A9C50"
                    : "#A7EABD",
                }}
              >
                {letters.map((e, i) => {
                  let id = `el${i}`;

                  return (
                    <Draggable key={id} draggableId={id} index={i}>
                      {(provided) => <Cell valueCell={e} provided={provided} />}
                    </Draggable>
                  );
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {isCheck ? (
        <Button className="context_btn_next" onClick={onHandleClickBtnNext}>
          Next
        </Button>
      ) : (
        <Button className="context_btn_check" onClick={() => onCheck(letters)}>
          Check
        </Button>
      )}
    </>
  );
};

export default Word;
