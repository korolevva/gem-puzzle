import { combineReducers } from 'redux';
import { boardReducer } from 'caDucks/board';

export const rootReducer = combineReducers({
    board: boardReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
