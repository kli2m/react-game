import React from "react";
import { Modal, Space, Typography } from "antd";



const { info } = Modal;
const { Text, Title } = Typography;

const ModalInstruction = (language) => {
 
  return (
    <Space>
      {info({
        title: `${language.main_page_collapse_panel_text}`,
        content: (
          <div>          
              <div>{language.main_page_collapse_panel_text_context}</div>  
          </div>
        ),           
        onOk() {         
        },       
        width: "90%",
      })}
    </Space>
  );
};
export default ModalInstruction;
