import React, { useState, useEffect } from "react";
import { Progress, Tooltip } from "antd"
import './ProgressBox.scss'


const ProgressBox = ({ percent, setPercent,difficultLevel }) => {


    useEffect(() => {
        if (percent > 0) {
            let timer = setInterval(() => progress(), 1000)
            return () => clearInterval(timer);
        }
    })

    const progress = () => {
      
        setPercent(percent-(100/difficultLevel))       
    }

    return (

        <div className="context-progress_bar">

            <Progress className="context-progress_bar-cirle" type="circle" percent={percent} format={(percent) => (percent > 1) ? `${Math.floor( percent/100*difficultLevel)} seconds` : `you lose!`}  strokeColor="#1890ff" trailColor="red" strokeWidth="9" width="60" gapPosition="top"  ></Progress>

        </div>

    )

}

export default ProgressBox;