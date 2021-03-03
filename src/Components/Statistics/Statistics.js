import React from "react";
import { Modal, Space, Typography } from "antd";

import "./Statistics.scss";

const { info } = Modal;
const { Text, Title } = Typography;

const Statistics = () => {
  const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"));

  console.log(Object.keys(getStatisticsLocal));
  return (
    <Space>
      {Modal.info({
        title: `Statistics`,
        content: (
          <div>
            <ul>
              {Object.keys(getStatisticsLocal).map((e, i) => {
                return (
                  <li className="statistics_item" key={i}>
                    {" "}
                    <Text strong>{e}</Text> -{" "}
                    <Text>{getStatisticsLocal[e].score}</Text>{" "}
                  </li>
                );
              })}
            </ul>
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
