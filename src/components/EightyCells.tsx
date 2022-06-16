import React, { FC } from 'react';
import { Col, Row } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { GridCell } from './GridCell';
import styles from '../styles/EightyCells.module.css';
import { actionCreators, Reducers } from '../store';


export const EightyCells: FC = () => {
    const dispatch = useDispatch();
    const { cellOnClick } = bindActionCreators(actionCreators, dispatch);
    const state = useSelector(({ game }: Reducers) => game);

    const getOffset = (x: number) => x % 10 === 0 ? 2 : undefined;

    return (
        <Row
            gutter={[8, 8]}
            className={styles.gridRow}
        >
            {
                state.eightyCells.map(cell =>
                (
                    <Col
                        span={2}
                        offset={getOffset(cell.index - 1)}
                        key={cell.index}
                    >
                        <GridCell cell={cell} onClick={(index) => cellOnClick(index)} />
                    </Col>
                ))
            }
        </Row >
    );
};
