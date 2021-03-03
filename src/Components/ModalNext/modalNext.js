import React from 'react';
import { Modal, Space } from 'antd';

const { confirm } = Modal;

const ModalNext = (setStepCount,stepCount,setCount,wordsLevelLocal,language) => {

    return (
        <Space>
            {Modal.confirm (
                {
                    title: `${language.modal_next_page_title_step} ${stepCount+1} ${language.modal_next_page_title_completed} !!!`,
                    content: (
                        <div>                   
                    <div>{language.modal_next_page_content_right} : {wordsLevelLocal[stepCount].filter(e=>e.answer===true).length} {language.modal_next_page_content_wrong} {wordsLevelLocal[stepCount].filter(e=>e.answer===false).length}</div>
                    </div>
                    ),
                    okText:`${language.modal_next_page_btn_next}`,
                    cancelText:`${language.modal_next_page_btn_repeat}`,
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