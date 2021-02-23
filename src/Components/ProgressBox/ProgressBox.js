import React, { useState, useEffect } from "react";
import { Progress, Tooltip } from "antd"
import './ProgressBox.scss'


const ProgressBox = ({percent, setPercent}) => {
  

    useEffect(() => {
        if (percent > 0) {
            let timer = setInterval(() => progress(), 1000)
            return () => clearInterval(timer);
        }
    })

    const progress = () => {
        setPercent(percent - 10)
    }

    return (

        <div className="context-progress_bar">
              <Tooltip
            placement="left"
            title="Timer"
            color="magenta"
          >
            <Progress className="context-progress_bar-cirle" type="circle" percent={percent} format={(percent) =>(percent>1)?`${percent / 10} seconds`:`you lose!`} strokeColor="#1890ff" trailColor="red" strokeWidth="9" width="60" gapPosition="top"  ></Progress>
            </Tooltip>
        </div>

    )

}

export default ProgressBox;