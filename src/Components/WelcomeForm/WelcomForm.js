import React, { useState, useRef } from "react";
import {
  Tooltip,
  Switch,
  Button,
  Typography,
  Form,
  Select,
  Input,
  message,
} from "antd";
import "./WelcomForm.scss";

import PlayingField from "../PlayingField/PlayingField";

const WelcomForm = ({ language }) => {
  const valueLocalStorage = useRef(localStorage.getItem("statistics"));

  if (!valueLocalStorage.current)
    localStorage.setItem("statistics", JSON.stringify({}));

  const [user, setUser] = useState(null);
  const [statistics, setStatistics] = useState(
    localStorage.getItem("statistics")
  );
  const [isSound, setIsSound] = useState(true);

  const { Text, Title } = Typography;

  const startGame = (values) => {
    const { user } = values;

    if (Object.values(user).every((e) => e !== undefined)) {
      const findUserLocal = JSON.parse(valueLocalStorage.current);

      if (!findUserLocal[user.name]) {
        const getStatisticsLocal = JSON.parse(
          localStorage.getItem("statistics")
        );

        getStatisticsLocal[user.name] = {
          score: 0,
          [user.difficultLevel]: {
            [user.wordsLevel]: [],
          },
        };

        localStorage.setItem("statistics", JSON.stringify(getStatisticsLocal));

        setStatistics(localStorage.getItem("statistics"));
      } else {
        const getStatisticsLocal = JSON.parse(
          localStorage.getItem("statistics")
        );

        const userLocal = getStatisticsLocal[user.name];

        if (!userLocal[user.difficultLevel])
          userLocal[user.difficultLevel] = { [user.wordsLevel]: [] };
        else {
          const diffLevel = userLocal[user.difficultLevel];

          if (!diffLevel[user.wordsLevel]) diffLevel[user.wordsLevel] = [];
        }

        localStorage.setItem("statistics", JSON.stringify(getStatisticsLocal));

        setStatistics(Object.assign(getStatisticsLocal));
      }

      setUser(values.user);
    }
  };

  const onChangeIsSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <>
      <>
        {user && statistics ? (
          <PlayingField
            language={language}
            isSound={isSound}
            user={user}
            setUser={setUser}
            statistics={statistics}
          />
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
                <Input
                  placeholder={language.welcom_page_placeholder_name}
                  allowClear="true"
                />
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

              {/* <Form.Item label={language.welcom_page_label_sound}>
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
                </Form.Item> */}

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
