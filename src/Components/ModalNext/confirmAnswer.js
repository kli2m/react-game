import React from "react";
import { Modal, Space } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;

const confirmMessage = (setUser, language) => {
  confirm({
    title: `${language.modal_exit_page_text}`,
    icon: <ExclamationCircleOutlined />,
    content: "",
    onOk() {
      setUser(null);
    },
    onCancel() {},
  });
};

export default confirmMessage;
