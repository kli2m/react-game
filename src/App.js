import React, { useState } from "react";
import { Tooltip, Switch, Button, Typography, Form } from "antd";
import "./App.scss";
import PlayingField from "./Components/PlayingField/PlayingField";
import LevelDropdown from "./Components/LevelDropdown/LevelDropdown";

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [isSound, setIsSound] = useState(true);
  const [level, setLevel] = useState("0");
  const { Text, Title } = Typography;

  const startGame = () => {
    setIsStart(true);
  };

  const onChangeIsSound = () => {
    setIsSound((prev) => !prev);
  };

  return (
    <div className="letterSolver__wrapper">
      <header className="letterSolver__header">
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
      </header>

      <main className="letterSolver__main">
        {isStart ? (
          <PlayingField isSound={isSound} selectedLevel={level} />
        ) : (
          <div className="letterSolver__start_game">
            <Title level={1} className="letterSolver__start_game-title">
              <Text strong>Генератор букв</Text>
            </Title>
            <Title level={4} className="letterSolver__start_game-description">
              <Text strong>
                Тренировка улучшает восприятие английской речи на слух.
              </Text>
            </Title>
            <div className="letterSolver__main-select_level">
              <Form>
                <LevelDropdown setLevel={setLevel} />
              </Form>
            </div>
            <Button
              className="letterSolver__start_game-btn"
              onClick={startGame}
              autoFocus
            >
              СТАРТ
            </Button>
          </div>
        )}
      </main>
      <footer className="letterSolver__footer"></footer>
    </div>
  );
};

export default App;
