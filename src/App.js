import React, { useState } from "react";
import { Tooltip, Switch, Button, Typography, Form, Progress, Collapse } from "antd";
import "./App.scss";
import WelcomForm from './Components/WelcomeForm/WelcomForm';
import Ru from './language/Ru.json';
import En from './language/En.json';


const App = () => {
  const [isStart, setIsStart] = useState(false);
  const [language,setLanguage] = useState(Ru);

  const { Text, Title } = Typography;
  const { Panel } = Collapse;
  const startGame = () => {
    setIsStart(true);
  };


  return (
    <div className="letterSolver__wrapper">
      <div className="letterSolver__wrapper-header">

        <Tooltip
          placement="bottom"
          title={language.main_page_tooltip_title}
          color="magenta"
        >
          <Switch 
            onChange={(isVal)=>isVal?setLanguage(En):setLanguage(Ru)}
            checkedChildren="En"
            unCheckedChildren="Ru"          
          />
        </Tooltip>

      </div>

      {isStart ? (
        <WelcomForm language={language} />
      ) : (
          <div className="letterSolver__wrapper-start_game">
            <Title level={1} className="letterSolver__start_game-title">
              <Text strong>{language.main_page_title}</Text>
            </Title>
            <Title level={4} className="letterSolver__start_game-description">
              <Text strong>
                {language.main_page_phrase}
              </Text>
            </Title>
            <Collapse accordion bordered={false}>
              <Panel header={language.main_page_collapse_panel_header}>
                <p>{language.main_page_collapse_panel_text}</p>
              </Panel>
            </Collapse>
            <Button
              className="letterSolver__start_game-btn"
              onClick={startGame}
              autoFocus
            >
              {language.main_page_btn_start}
            </Button>
          </div>
        )}
      <div className="letterSolver__wrapper-footer">
        <div className="letterSolver__wrapper-footer-copyright">
          <Title level={5} className="letterSolver__start_game-description">
            <Text strong >
              &copy; kli2m
              </Text>
          </Title>
        </div>
        <div></div>
      </div>
    </div>

  );

};

export default App;
