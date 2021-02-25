import React, { useState, useEffect } from "react";
import { Progress, Tooltip } from "antd"
import './ProgressBox.scss'
import seconds from '../../assets/audio/seconds.mp3';

const ProgressBox = ({ percent, setPercent, difficultLevel, isCheck, onCheck }) => {


    const listenAudio = new Audio(seconds)

    useEffect(() => {
        if (!isCheck && percent > 1) {           
            listenAudio.play()
            let timer = setInterval(() => progress(), 1000)
            return () => clearInterval(timer);
        } else onCheck([])
    })

    const progress = () => {
        setPercent(percent - (100 / difficultLevel))
    }

    return (

        <div className="context-progress_bar">

            <Progress className="context-progress_bar-cirle" type="circle" percent={percent} format={(percent) => (percent > 1) ? `${Math.ceil(percent / 100 * difficultLevel)} seconds` : `you lose!`} strokeColor="#1890ff" trailColor="red" strokeWidth="9" width="60" gapPosition="top"  ></Progress>

        </div>

    )

}

export default ProgressBox;