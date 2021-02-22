import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { Tooltip, Switch, Button, Typography, Form ,Image} from "antd";
import Cell from "../Cell/Cell";

const Word = ({wordSplit})=>{


const[letters,setLetters]=useState(wordSplit)

useEffect(()=>{
  setLetters(wordSplit)
})

console.log(letters)

    function handleOnDragEnd(result) {
        if (!result.destination) return;
        const items = Array.from(letters);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setLetters(items);
      }


return   ( <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="playingField" direction="horizontal">
      {(provided) => (
        <div
          className="playingField"
          {...provided.droppableProps}
          ref={provided.innerRef}
        >
          {letters.map((e, i) => {

            let id = `el${i}`

            return (<Draggable key={id} draggableId={id} index={i}>
              {(provided) => (
                <Cell valueCell={e} provided={provided} />
              )}
            </Draggable>

            )
          })}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)
}

export default Word;