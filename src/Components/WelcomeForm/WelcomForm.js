import React, { useState } from "react";
import { Tooltip, Switch, Button, Typography, Form, Select, Input } from "antd";
import "./WelcomForm.scss";

import PlayingField from "../PlayingField/PlayingField";

const WelcomForm = () => {
    const [user, setUser] = useState(null);
    const [isSound, setIsSound] = useState(true);

    const { Text, Title } = Typography;


    const startGame = (values) => {
        if (Object.values(values.user).every(e => e !== undefined)) setUser(values.user);
    };

    const onChangeIsSound = () => {
        setIsSound((prev) => !prev);
    };


    return (
        <>
            <>
                {user ? (

                    <PlayingField isSound={isSound} user={user} />

                ) : (
                        <div className="letterSolver__settings">
                            <Title level={3} className="letterSolver__start_game-title">
                                <Text strong>Установите начальные значения</Text>
                            </Title>
                            <Form onFinish={startGame} >
                                <Form.Item name={['user', 'name']} label="NickName" rules={[{ type: "string", min: 3, max: 25, required: true, message: "Enter correct Nick" }]}>
                                    <Input placeholder="Enter nick" />
                                </Form.Item>
                                <Form.Item name={['user', 'difficultLevel']} label="Difficult Level" initialValue="60">
                                    <Select placeholder="Change Difficult Level"  >
                                        <Select.Option value="60">Easy</Select.Option>
                                        <Select.Option value="40">Normal</Select.Option>
                                        <Select.Option value="20">Hard</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item name={['user', 'wordsLevel']} label="Level difficult words" initialValue="0">
                                    <Select placeholder="Change Level difficult words"  >
                                        <Select.Option value="0">Первый</Select.Option>
                                        <Select.Option value="1">Второй</Select.Option>
                                        <Select.Option value="2">Третий</Select.Option>
                                        <Select.Option value="3">Четвёртый</Select.Option>
                                        <Select.Option value="4">Пятый</Select.Option>
                                        <Select.Option value="5">Шестой</Select.Option>
                                    </Select>
                                </Form.Item>

                                <Form.Item label="Playing sound: ">
                                    <div className="letterSolver__autoplay_box">
                                        <Tooltip
                                            placement="bottom"
                                            title="Click to on/off autoplay sound"
                                            color="magenta"
                                        >
                                            <Switch
                                                onChange={onChangeIsSound}
                                                checkedChildren="ON"
                                                unCheckedChildren="OFF"
                                                checked={isSound}
                                            />
                                        </Tooltip>
                                    </div>
                                </Form.Item>

                                <Button
                                    className="letterSolver__start_game-btn"
                                    autoFocus
                                    htmlType="submit"
                                >
                                    Продолжить
                             </Button>
                            </Form>

                        </div>
                    )}
            </>

            <div className="letterSolver__footer"></div>
        </>
    );

}
export default WelcomForm