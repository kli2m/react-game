import React, { useState, useEffect } from "react";
import { Button, Slider,Typography } from "antd";

import confirmAnswer from "../ModalNext/confirmAnswer";
import "./UserSetting.scss";

const UserSetting = ({user,setUser }) => {
    const { Text, Title } = Typography;

    return (
        <div className="user_setting">
            <Title level={5} >
                <Text strong>{user.name}</Text>
            </Title>
            <div>Score:</div>
            <Button  >Показать статистику</Button>
            <Button onClick={() => confirmAnswer(setUser)} >Выйти в главное меню</Button>
        </div>



    );
};

export default UserSetting;
