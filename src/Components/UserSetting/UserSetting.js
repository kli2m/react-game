import React, { useState, useEffect } from "react";
import { Button, Slider,Typography } from "antd";

import confirmAnswer from "../ModalNext/confirmAnswer";
import Statistics from '../Statistics/Statistics'

import "./UserSetting.scss";

const UserSetting = ({user,setUser }) => {
    const { Text, Title } = Typography;

    const getStatisticsLocal = JSON.parse(localStorage.getItem("statistics"))

    const userLocal = getStatisticsLocal[user.name]  

    return (
        <div className="user_setting">
            <Title level={5} >
                <Text strong>{user.name}</Text>
            </Title>
            <div>Score: {userLocal["score"]?userLocal["score"]:"0"}</div>
            <Button onClick={Statistics } >Показать статистику</Button>
            <Button onClick={() => confirmAnswer(setUser)} >Выйти в главное меню</Button>
        </div>



    );
};

export default UserSetting;
