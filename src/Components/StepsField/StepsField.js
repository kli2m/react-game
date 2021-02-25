import React,{useState } from 'react'
import {Rate} from 'antd';

import './StepsField.scss'


let arrSteps =  [1,2,3,4,5]

const StepsField = ()=>{



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

        </div>
    )


}

export default StepsField