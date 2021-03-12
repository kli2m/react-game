import React, { useState, useEffect } from "react";
import { Button, Slider, Typography } from "antd";

import confirmAnswer from "../ModalNext/confirmAnswer";
import Statistics from "../Statistics/Statistics";

import "./UserSetting.scss";

const UserSetting = ({ user, setUser, language }) => {
  const { Text, Title } = Typography;

  const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"));

  const userLocal = getStatisticsLocal[user.name];

  return (
    <div className="user_setting">
      <div className="user_setting-block_view">
      <Title level={5}>
        <Text strong>{language.user_settings_page_player}{user.name}</Text>
      </Title>
      <div>
        {language.user_settings_page_score}{" "}
        {userLocal["score"] ? userLocal["score"] : "0"}
      </div>
      </div>
      <div className="user_setting-block_btn">
      <Button className="user_setting-btn_statistics" onClick={Statistics}>
        {language.user_settings_page_show_statistics}
      </Button>
      <Button className="user_setting-btn_exit" onClick={() => confirmAnswer(setUser, language)}>
        {language.user_settings_page_exit}
      </Button>
      </div>
    </div>
  );
};

export default UserSetting;
