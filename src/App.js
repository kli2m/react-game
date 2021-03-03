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
import Ru from "./language/Ru.json";
import En from "./language/En.json";
import imgGit from "./assets/img/github.png";

const App = () => {
  localStorage.getItem("statistics")
    ? {}
    : localStorage.setItem("statistics", JSON.stringify({}));

  const [isStart, setIsStart] = useState(false);
  const [language, setLanguage] = useState(Ru);

  const { Text, Title } = Typography;
  const { Panel } = Collapse;
  const startGame = () => {
    setIsStart(true);
  };

  const fullScrenn = () => {
    const elem = elem || document.documentElement;

    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.msRequestFullscreen) {
        elem.msRequestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
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
            onChange={(isVal) => (isVal ? setLanguage(En) : setLanguage(Ru))}
            checkedChildren="En"
            unCheckedChildren="Ru"
          />
        </Tooltip>
        <div
          className="letterSolver__wrapper-header-btn_full_screen"
          onClick={fullScrenn}
        >
          F11
        </div>
      </div>

      {isStart ? (
        <WelcomForm language={language} />
      ) : (
        <div className="letterSolver__wrapper-start_game">
          <Title level={1} className="letterSolver__start_game-title">
            <Text strong>{language.main_page_title}</Text>
          </Title>
          <Title level={4} className="letterSolver__start_game-description">
            <Text strong>{language.main_page_phrase}</Text>
          </Title>
          <Collapse accordion bordered={false} ghost="true" forceRender="true">
            <Panel header={language.main_page_collapse_panel_header}>
              <p>{language.main_page_collapse_panel_text}</p>
              <div>{language.main_page_collapse_panel_text_context}</div>
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
        <div className="letterSolver__wrapper-footer-copyright footer_item">
          <Title level={5} className="letterSolver__start_game-description">
            <Text strong>&copy; kli2m 2021</Text>
          </Title>
        </div>
        <div className="footer_item">
          <a href="https://github.com/kli2m">
            {" "}
            <img
              className="letterSolver__wrapper-footer-img_github"
              src={imgGit}
            ></img>
          </a>
        </div>
        <div className="footer_item">
          <a href="https://rs.school/js/">
            {" "}
            <img
              className="letterSolver__wrapper-footer-img_rsschool"
              src="https://rs.school/images/rs_school_js.svg"
            ></img>
          </a>
        </div>
      </div>
    </div>
  );
};

export default App;
