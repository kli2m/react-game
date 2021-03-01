import React from 'react';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const ModalNext = (setStepCount,stepCount,setCount) => {

    return (
        <Space>
            {Modal.confirm (
                {
                    title: `${stepCount} completed !!!`,
                    content: (
                    <div>  'Some descriptions'</div>
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