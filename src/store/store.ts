import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { gameReducer } from './reducer';

const combinedReducers = combineReducers({
    game: gameReducer,
});

export const store = configureStore({
    reducer: combinedReducers,
});

export type Reducers = ReturnType<typeof combinedReducers>;
