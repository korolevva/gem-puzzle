import { BoardLogic } from 'src/logics/boardLogic/types';
import { ActionTypes, Tiles } from 'src/types';

export const boardActionTypes = {
    CREATE_TILES: 'board/CREATE_TILES',
    SET_TILES: 'board/SET_TILES',
    SHUFFLE_TILES: 'board/SHUFFLE_TILES',
    CHANGE_TILE_POSITION: 'board/CHANGE_TILE_POSITION',
    CHECK_GAME_RESULT: 'board/CHECK_GAME_RESULT',
    SET_GAME_RESULT: 'board/SET_GAME_RESULT',
} as const;

export const actions = {
    createTiles: () => ({ type: boardActionTypes.CREATE_TILES }),
    changeTilePosition: (value: string) => ({ type: boardActionTypes.CHANGE_TILE_POSITION, value }),
    checkGameResult: (tiles: Tiles) => ({ type: boardActionTypes.CHECK_GAME_RESULT, tiles }),
};

interface SetTilesAction {
    type: string;
    payload: {
        tiles: Tiles;
        isWin: boolean;
    };
}

type BoardAction = ActionTypes<typeof actions> | BoardLogic | SetTilesAction;

interface State {
    tiles: Tiles;
    isWin: boolean;
}

const initialState: State = {
    tiles: {},
    isWin: false,
};

export const boardReducer = (state = initialState, action: BoardAction): State => {
    switch (action.type) {
        case boardActionTypes.SET_TILES:
            const { tiles } = action.payload;
            return { tiles, isWin: false };
        case boardActionTypes.SET_GAME_RESULT:
            const { isWin } = action.payload;
            return { ...state, isWin };

        default:
            return state;
    }
};
