import React, { FC } from 'react';
import { Button, InputNumber, Space, Statistic } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { DollarTwoTone, DollarCircleOutlined } from '@ant-design/icons';
import { actionCreators, Reducers } from '../store';
import styles from "../styles/Sider.module.css";


export const Sider: FC = () => {
    const dispatch = useDispatch();
    const { changeBet } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector(({ game }: Reducers) => game);


    return (
        <Space direction='vertical' className={styles.sider}>
            <Statistic title="Deposit" value={state.deposit} prefix={<DollarTwoTone />} />
            <Statistic title="Bet" value={state.bet} prefix={<DollarCircleOutlined />} />
            <Statistic title="Win" value={state.win} prefix={<DollarCircleOutlined />} />
            <Button onClick={() => changeBet(100)}>$100</Button>
            <Button onClick={() => changeBet(500)}>$500</Button>
            <Button onClick={() => changeBet(1000)}>$1000</Button>
            <InputNumber
                addonBefore='$'
                className={styles.inputNumber}
                min={0}
                max={state.deposit}
                value={state.bet}
                step={50}
                onChange={changeBet}
                placeholder='Bet'
            />
        </Space>
    );
};
