import React from 'react';
import { Modal, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

const confirmMessage=(setUser)=>{
        confirm({
          title: 'Вы действительно хотите выйти!',
          icon: <ExclamationCircleOutlined />,
          content: 'Some descriptions',         
          onOk() {
            setUser(null)
          },
          onCancel() {
           
          },
        });
      
}

export default confirmMessage;