import React from 'react';

import './Cell.scss'

const Cell = ({valueCell}) => {

  return (
    <div className="cell" >
        {valueCell}
    </div>
  );
};

export default Cell;
