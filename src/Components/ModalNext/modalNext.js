import React from 'react';
import { Modal, Space } from 'antd';

const { confirm } = Modal;

const ModalNext = (setStepCount,stepCount,setCount,wordsLevelLocal) => {

    return (
        <Space>
            {Modal.confirm (
                {
                    title: `Step ${stepCount+1} completed !!!`,
                    content: (
                        <div>                   
                    <div>Right : {wordsLevelLocal[stepCount].filter(e=>e.answer===true).length} Wrong: {wordsLevelLocal[stepCount].filter(e=>e.answer===false).length}</div>
                    </div>
                    ),
                    okText:"Следующий Шаг",
                    cancelText:"Попробовать еще",
                    onOk() {
                      setStepCount(stepCount+1)
                    },
                    onCancel() {
                        setCount(0)                
                            },
                    width: "70%",
                }
            )}
        </Space>
    )
}
export default ModalNext;