import React from "react";
import { Modal, Space, Typography } from "antd";

import "./Statistics.scss";

const { info } = Modal;
const { Text, Title } = Typography;

const Statistics = () => {

  const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"));

   const arrSortScore=[]

    Object.keys(getStatisticsLocal).map((e,i)=> arrSortScore.push([e,getStatisticsLocal[e].score])  )

    function compareNumeric(a, b) {
      if (a[1] < b[1]) return 1;
      if (a[1] == b[1]) return 0;
      if (a[1] > b[1]) return -1;
    }

    arrSortScore.sort(compareNumeric)

  return (
    <Space>
      {info({
        title: `Statistics`,
        content: (
          <div className="statistics__modal-content" >

            <table  align="center" width="100%"  >
              <thead>
            <tr  bgcolor="#99b097" cellPadding="7px">
             <th>№</th>
             <th>Name</th>             
             <th>Score</th>
           </tr>
           </thead>
           <tbody>
              {arrSortScore.map((e, i) => {
                return (
                 
                  <tr className="statistics_item" key={i} bgcolor="#b0eeba">
                    <td>{i}</td>
                   <td className="statistics__modal-content-name">
                    <Text strong>{e[0]}</Text> 
                    </td>                   
                    <td className="statistics__modal-content-score">        
                    <Text>{e[1]}</Text>
                    </td>
                  </tr>
                );
              })}
           </tbody>
            </table>
          </div>
        ),
        okText: "Ok",
        onOk() {},
        width: "70%",
      })}
    </Space>
  );
};
export default Statistics;
