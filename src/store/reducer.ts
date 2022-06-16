import uniqueRandomArray from 'unique-random-array';
import { Action, ActionType, GameState, EightyCell } from './types';
import { CellColor } from '../constants';

const getDefaultEightyCells = (): EightyCell[] =>
    Array.from({ length: 80 }, (_, i) => i + 1).map((index) => ({
        index,
        isSelected: false,
        isWin: false,
        color: CellColor.DEFAULT,
    }));

const switchCell = (eightyCells: EightyCell[], index: number): EightyCell[] => {
    const selectedCell: EightyCell = eightyCells[index - 1];

    eightyCells[index - 1] = {
        ...selectedCell,
        isSelected: !selectedCell.isSelected,
        color: selectedCell.isSelected ? CellColor.DEFAULT : CellColor.SELECTED,
    };

    return eightyCells;
};

const isSelectedLessFive = (cells: EightyCell[]): boolean =>
    cells.filter(({ isSelected }) => isSelected).length < 5;

const isDeSelect = (cells: EightyCell[], index: number): boolean =>
    cells[index - 1].isSelected;

const cellOnClick = (state: GameState, index: number): GameState => {
    const isLessFive = isSelectedLessFive(state.eightyCells);
    const isDeSel = isDeSelect(state.eightyCells, index);
    const { eightyCells, selectedCount } = state;

    if (isLessFive || isDeSel) {
        return {
            ...state,
            eightyCells: switchCell(eightyCells, index),
            selectedCount: isDeSel ? selectedCount - 1 : selectedCount + 1,
        };
    }

    return state;
};

const selectRandomFive = (): EightyCell[] => {
    const cells = getDefaultEightyCells();
    const random = uniqueRandomArray<EightyCell>(cells);
    const randomArr: number[] = [];

    while (randomArr.length < 5) {
        const randomIndex = random().index;
        if (randomArr.indexOf(randomIndex) === -1) {
            randomArr.push(randomIndex);
        }
    }

    return cells.map((cell) =>
        randomArr.indexOf(cell.index) !== -1
            ? {
                  ...cell,
                  isSelected: true,
                  color: CellColor.SELECTED,
              }
            : cell
    );
};

const getRandomTwenty = (cells: EightyCell[]): number[] => {
    const random = uniqueRandomArray<EightyCell>(cells);
    const randomArr: number[] = [];

    while (randomArr.length < 20) {
        const randomIndex = random().index;
        if (randomArr.indexOf(randomIndex) === -1) {
            randomArr.push(randomIndex);
        }
    }

    return randomArr;
};

const selectWinCells = (
    cells: EightyCell[],
    randomArr: number[]
): EightyCell[] =>
    cells.map((cell) => {
        if (randomArr.indexOf(cell.index) !== -1) {
            return cell.isSelected
                ? {
                      ...cell,
                      isWin: true,
                      color: CellColor.SELECTED_WINNIG,
                  }
                : {
                      ...cell,
                      color: CellColor.WINNIG,
                  };
        }

        return cell;
    });

const getBetResult = (state: GameState): GameState => {
    if (state.deposit <= state.bet) {
        return state;
    }
    // eslint-disable-next-line no-debugger
    const cells = state.eightyCells.map((cell) => ({
        ...cell,
        isWin: false,
        color: cell.isSelected ? CellColor.SELECTED : CellColor.DEFAULT,
    }));
    const randomArr = getRandomTwenty(cells);
    const eightyCells = selectWinCells(cells, randomArr);
    const coincidenceNumber = eightyCells.filter(({ isWin }) => isWin).length;
    const win: number = state.bet * coincidenceNumber * 1.5;
    const deposit = state.deposit - state.bet + win;

    return {
        ...state,
        eightyCells,
        deposit,
        bet: 0,
        win,
    };
};

const initialState: GameState = {
    eightyCells: getDefaultEightyCells(),
    selectedCount: 0,
    deposit: 10000,
    bet: 0,
    win: 0,
};

export const gameReducer = (
    // eslint-disable-next-line default-param-last
    state: GameState = initialState,
    action: Action
) => {
    switch (action.type) {
        case ActionType.CELL_ONCLICK:
            return cellOnClick(state, action.payload);
        case ActionType.CLEAR_SELECTION:
            return {
                ...state,
                eightyCells: getDefaultEightyCells(),
                selectedCount: 0,
            };
        case ActionType.LUCKY_PICK:
            return {
                ...state,
                eightyCells: selectRandomFive(),
                selectedCount: 5,
            };
        case ActionType.CHANGE_BET:
            return {
                ...state,
                bet: action.payload,
            };
        case ActionType.PLACE_BET:
            return getBetResult(state);
        default:
            return state;
    }
};
