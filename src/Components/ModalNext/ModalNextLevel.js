import React from 'react';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ModalNextLevel = (level, setLevel, setStepCount) => {    

    return (
        <Space>
            {Modal.confirm(
                {
                    title: `${level} completed !!!`,
                    content: (
                        <div>  'Ваш score равен ?? из возможного ??'</div>
                    ),
                    okText: ` ${level < 2 ? "Перейти на следующий Уровень Сложности слов" : "Выйти в главное меню"} `,
                    cancelText: "Попробовать еще",

                    onOk() {                                          
                        level < 2 ? setLevel(Number(level) + 1) : setUser(null);
                    },
                    onCancel() {
                        setStepCount(0)                       
                    },
                    width: "70%",
                }
            )}
        </Space>
    )
}
export default ModalNextLevel;