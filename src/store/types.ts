import { CellColor } from '../constants';

export interface EightyCell {
    index: number;
    isSelected: boolean;
    isWin: boolean;
    color: CellColor;
}

export interface GameState {
    eightyCells: EightyCell[];
    selectedCount: number;
    deposit: number;
    bet: number;
    win: number;
}

export enum ActionType {
    CELL_ONCLICK = 'CELL_ONCLICK',
    CLEAR_SELECTION = 'CLEAR_SELECTION',
    CHANGE_BET = 'CHANGE_BET',
    LUCKY_PICK = 'LUCKY_PICK',
    PLACE_BET = 'PLACE_BET',
}

interface CellOnClickAction {
    type: ActionType.CELL_ONCLICK;
    payload: number;
}

interface CleatSelectionAction {
    type: ActionType.CLEAR_SELECTION;
}

interface ChangeBetAction {
    type: ActionType.CHANGE_BET;
    payload: number;
}

interface LuckyPick {
    type: ActionType.LUCKY_PICK;
}

interface PlaceBet {
    type: ActionType.PLACE_BET;
}

export type Action =
    | CellOnClickAction
    | CleatSelectionAction
    | ChangeBetAction
    | LuckyPick
    | PlaceBet;
