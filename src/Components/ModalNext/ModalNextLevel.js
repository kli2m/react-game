import React from "react";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const ModalNextLevel = (
  level,
  setLevel,
  setStepCount,
  setUser,
  wordsLevelLocal
) => {
  return (
    <Space>
      {Modal.confirm({
        title: `${level + 1} completed !!!`,
        content: <div> Finish </div>,
        okText: ` ${
          level < 2
            ? "Перейти на следующий Уровень cложности слов"
            : "Выйти в главное меню"
        } `,
        cancelText: ` ${
          level < 2 ? "Попробовать еще" : "Начать уровень заново"
        } `,

        onOk() {
          level < 2 ? setLevel(Number(level) + 1) : setUser(null);
        },
        onCancel() {
          setStepCount(0);
        },
        width: "70%",
      })}
    </Space>
  );
};
export default ModalNextLevel;
