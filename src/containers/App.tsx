import React from 'react';
import { Layout, Row, Space } from 'antd';
import styles from '../styles/App.module.css';
import { Header } from '../components/Header';
import { EightyCells } from '../components/EightyCells';
import { Sider } from '../components/Sider';

const { Content } = Layout;

export const App = () => (
  <Content className={styles.contentCenter}>
    <Space direction='vertical' align='center'>
      <Header />
      <Row>
        <EightyCells />
        <Sider />
      </Row>
    </Space>
  </Content>

);
