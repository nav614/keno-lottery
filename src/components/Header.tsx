import React, { FC } from 'react';
import { Typography, Image, Space, Button, Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import styles from '../styles/Header.module.css';
import { actionCreators, Reducers } from '../store';
// import 

export const Header: FC = () => {
    const dispatch = useDispatch();
    const { clearSelection, luckyPick, placeBet } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector(({ game }: Reducers) => game);

    return (
        <Row className={styles.header}>
            <Col span={11}>
                <Space direction='horizontal'>
                    <Image width={40} src="/logo512.png" />
                    <Typography.Title className={styles.title} >Keno Lottery</Typography.Title>
                </Space>
            </Col>
            <Col span={8} offset={1} style={{ padding: '20px' }}>
                <Space direction='horizontal'>
                    <Button size='large' shape='round' onClick={clearSelection}>Clear</Button>
                    <Button size='large' shape='round' onClick={luckyPick}>Lucky Pick</Button>
                    <Button size='large' type='primary' shape='round' onClick={placeBet} disabled={!(state.selectedCount === 5 && state.bet !== 0)}>Place Bet</Button>
                </Space>
            </Col>
        </Row>
    );
};