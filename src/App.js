import React, { useState } from "react";
import {
  Tooltip,
  Switch,
  Button,
  Typography,
  Form,
  Progress,
  Collapse,
} from "antd";
import "./App.scss";
import WelcomForm from "./Components/WelcomeForm/WelcomForm";

const App = () => {
  const [isStart, setIsStart] = useState(false);
  const { Text, Title } = Typography;
  const { Panel } = Collapse;
  const startGame = () => {
    setIsStart(true);
  };

  return (
    <div className="letterSolver__wrapper">
      <div className="header">
        <Tooltip
          placement="bottom"
          title="Click to change language"
          color="magenta"
        >
          <Switch
            // onChange={}
            checkedChildren="En"
            unCheckedChildren="Ru"
            //  checked={}
          />
        </Tooltip>
      </div>

      {isStart ? (
        <WelcomForm />
      ) : (
        <div className="letterSolver__wrapper-start_game">
          <Title level={1} className="letterSolver__start_game-title" >
            <Text strong>Генератор букв</Text>
          </Title>
          <Title level={4} className="letterSolver__start_game-description">
            <Text strong>
              Тренировка улучшает восприятие английской речи на слух.
            </Text>
          </Title>
          <Collapse accordion bordered={false}>
            <Panel header="Click to read instruction...">
              <p>Instruction...</p>
            </Panel>
          </Collapse>
          <Button
            className="letterSolver__start_game-btn"
            onClick={startGame}
            autoFocus
          >
            СТАРТ
          </Button>
        </div>
      )}
    </div>
  );
};

export default App;
