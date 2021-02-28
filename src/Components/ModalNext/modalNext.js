import React from "react";
import { Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import WelcomeForm from '../WelcomeForm/WelcomForm'

const { confirm } = Modal;

function modalNext(setStepCount,stepCount) {
    confirm({
      title: 'Do you Want to delete these items?',
      icon: <ExclamationCircleOutlined />,
      content: 'Some descriptions',
      okText:"Следующий Уровень",
      cancelText:"Выйти в главное меню",
      onOk() {
        setStepCount(stepCount+1)
      },
      onCancel() {
        setCount(6)
      },
    });
  }

  export default modalNext