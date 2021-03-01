import React, { useState, useRef } from "react";
import { Tooltip, Switch, Button, Typography, Form, Select, Input, message } from "antd";
import "./WelcomForm.scss";

import PlayingField from "../PlayingField/PlayingField";

const WelcomForm = ({ language }) => {
  const [user, setUser] = useState(null);
  const [isSound, setIsSound] = useState(true);

  const { Text, Title } = Typography;

  const startGame = (values) => {

    const { user } = values

    if (Object.values(user).every((e) => e !== undefined)) {

      if (user.name.length > 2 && user.name.length < 15) {

        const getLocalSt = localStorage.getItem("statistics")
        ? localStorage.setItem("statistics")
        : null;

        setUser(values.user)
      } else {
        message.error('Количество символов в поле Ник должно быть от 3 до 15')
      }
    }
  };

  const onChangeIsSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <>
      <>
        {user ? (
          <PlayingField language={language} isSound={isSound} user={user} setUser={setUser} />
        ) : (
            <div className="letterSolver__settings">
              <Title level={3} className="letterSolver__start_game-title">
                <Text strong>{language.welcom_page_title}</Text>
              </Title>
              <Form onFinish={startGame}>
                <Form.Item
                  name={["user", "name"]}
                  label={language.welcom_page_label_name}
                >
                  <Input placeholder={language.welcom_page_placeholder_name} allowClear="true" />
                </Form.Item>
                <Form.Item
                  name={["user", "difficultLevel"]}
                  label={language.welcom_page_label_difficult_level}
                  initialValue="60"
                >
                  <Select
                    placeholder={language.welcom_page_placeholder_difficult_level}
                  >
                    <Select.Option value="60">
                      {language.welcom_page_placeholder_difficult_level_easy}
                    </Select.Option>
                    <Select.Option value="40">
                      {language.welcom_page_placeholder_difficult_level_normal}
                    </Select.Option>
                    <Select.Option value="20">
                      {language.welcom_page_placeholder_difficult_level_hard}
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  name={["user", "wordsLevel"]}
                  label={language.welcom_page_label_word_difficult_level}
                  initialValue="0"
                >
                  <Select
                    placeholder={
                      language.welcom_page_placeholder_word_difficult_level
                    }
                  >
                    <Select.Option value="0">
                      {
                        language.welcom_page_placeholder_word_difficult_level_first
                      }
                    </Select.Option>
                    <Select.Option value="1">
                      {
                        language.welcom_page_placeholder_word_difficult_level_second
                      }
                    </Select.Option>
                    <Select.Option value="2">
                      {
                        language.welcom_page_placeholder_word_difficult_level_third
                      }
                    </Select.Option>
                    <Select.Option value="3">
                      {
                        language.welcom_page_placeholder_word_difficult_level_fourth
                      }
                    </Select.Option>
                    <Select.Option value="4">
                      {
                        language.welcom_page_placeholder_word_difficult_level_fifth
                      }
                    </Select.Option>
                    <Select.Option value="5">
                      {
                        language.welcom_page_placeholder_word_difficult_level_sixth
                      }
                    </Select.Option>
                  </Select>
                </Form.Item>

                <Form.Item label={language.welcom_page_label_sound}>
                  <div className="letterSolver__autoplay_box">
                    <Tooltip
                      placement="bottom"
                      title={language.welcom_page_tooltip_label_sound}
                      color="magenta"
                    >
                      <Switch
                        onChange={onChangeIsSound}
                        checkedChildren={language.welcom_page_label_sound_on}
                        unCheckedChildren={language.welcom_page_label_sound_off}
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
                  {language.welcom_page_btn_next}
                </Button>
              </Form>
            </div>
          )}
      </>

      <div className="letterSolver__footer"></div>
    </>
  );
};
export default WelcomForm;
