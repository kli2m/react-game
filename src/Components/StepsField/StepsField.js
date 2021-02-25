import React,{useState, useEffect } from 'react'
import {Rate,Slider } from 'antd';
import { FrownOutlined, SmileOutlined } from '@ant-design/icons';

import './StepsField.scss'


let arrSteps =  [1,2,3,4,5]

const StepsField = ({arrAudio})=>{

const [inputValue,setInputValue]=useState(100)

const onChange=(value)=>{

  setInputValue(value)
  
}

useEffect(()=>{
  arrAudio.forEach(audio=>{
    audio.volume=inputValue/100
  })
},[inputValue])


    return (
        <div className="steps__field">

<div className="steps__field-title">Steps:</div>
<div className="steps__field-context">
  {  arrSteps.map((el,i)=>
  <span key={arrSteps.length+i}>
  <Rate defaultValue="3"  />
  <div className="ant-rate-text">{i}</div>
  </span>
  )}
</div>
<div className="steps__field-audio_settings">
<Slider value={typeof inputValue === 'number' ? inputValue : 0} tooltipVisible onChange={onChange}/>
<FrownOutlined  />
<div>{inputValue}</div>
</div>
        </div>
    )


}

export default StepsField