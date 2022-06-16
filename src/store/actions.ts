import { Dispatch } from 'redux';
import { Action, ActionType } from './types';

export const cellOnClick = (index: number) => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.CELL_ONCLICK,
        payload: index,
    });
};

export const clearSelection = () => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.CLEAR_SELECTION,
    });
};

export const changeBet = (bet: number) => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.CHANGE_BET,
        payload: bet || 0,
    });
};

export const luckyPick = () => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.LUCKY_PICK,
    });
};

export const placeBet = () => (dispatch: Dispatch<Action>) => {
    dispatch({
        type: ActionType.PLACE_BET,
    });
};
