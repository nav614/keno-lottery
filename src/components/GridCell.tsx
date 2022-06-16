import React, { FC } from 'react';
import { Button } from 'antd';
import { EightyCell } from "../store/types";
import styles from '../styles/GridCell.module.css';

type propTypes = {
    cell: EightyCell,
    onClick: (index: number) => void
}

export const GridCell: FC<propTypes> = ({ cell, onClick }) => (
    <Button
        className={styles.gridCell}
        onClick={() => onClick(cell.index)}
        style={{ backgroundColor: cell.color }}
    >{cell.index}</Button>
);
