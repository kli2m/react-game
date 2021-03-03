import React from "react";

import "./Cell.scss";

const Cell = ({ valueCell, provided }) => {
  return (
    <div
      className="cell"
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      {valueCell}
    </div>
  );
};

export default Cell;
