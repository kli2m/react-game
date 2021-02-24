import React, { useState } from "react";
import { Tooltip, Switch, Button, Typography, Form, Progress } from "antd";
import "./App.scss";
import WelcomForm from './Components/WelcomeForm/WelcomForm'

const App = () => {
  const [isStart, setIsStart] = useState(false);   
  const { Text, Title } = Typography;

  const startGame = () => {
    setIsStart(true);
  };


  return (
    <div className="letterSolver__wrapper">    

     
        {isStart ? (
          <WelcomForm/>              
        ) : (
          <div className="letterSolver__wrapper-start_game">
            <Title level={1} className="letterSolver__start_game-title">
              <Text strong>Генератор букв</Text>
            </Title>
            <Title level={4} className="letterSolver__start_game-description">
              <Text strong>
                Тренировка улучшает восприятие английской речи на слух.
              </Text>
            </Title>           
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
