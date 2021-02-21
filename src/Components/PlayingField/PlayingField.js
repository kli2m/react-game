import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

import "./PlayingField.scss";
import Cell from "../Cell/Cell";
import createArr from '../../utils/createArr'

let arr = createArr(3)

const PlayingField = () => {

  const [cells, setCells] = useState(arr);


  function handleOnDragEnd(result) {
    if(!result.destination) return
    const items = Array.from(cells);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setCells(items);
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="playingField">
        {(provided) => (
          <div
            className="playingField"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {cells.map((e, i) => (
              <Draggable key={e.id} draggableId={e.id} index={i}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Cell valueCell={e.index} />
                  </div>
                )}
              </Draggable>
            ))}

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default PlayingField;
