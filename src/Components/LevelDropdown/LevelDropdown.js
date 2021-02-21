import React from 'react';
import { Form, Select } from 'antd';

import './level-dropdown.css';

const LevelDropdown = ({ setLevel }) => {
  const changeLevel = (value) => {
    setLevel(value);
  };
  return (
    <Form.Item label="Уровень сложности">
      <Select
        defaultValue="0"
        className="level-dropdown"
        onChange={(value) => changeLevel(value)}
      >
        <Select.Option value="0">Первый</Select.Option>
        <Select.Option value="1">Второй</Select.Option>
        <Select.Option value="2">Третий</Select.Option>
        <Select.Option value="3">Четвёртый</Select.Option>
        <Select.Option value="4">Пятый</Select.Option>
        <Select.Option value="5">Шестой</Select.Option>
      </Select>
    </Form.Item>
  );
};

export default LevelDropdown;
