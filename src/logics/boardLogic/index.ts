import { createLogic } from 'redux-logic';
import * as $$board from 'caDucks/board';
import { Process } from '../types';
import { boardActionTypes } from 'caDucks/board';
import { Tiles } from 'src/types';
import {
    checkGameIsSolvable,
    compareObjects,
    generateRange,
    generateWinCombination,
    isTileAdjacentToEmpty,
    shuffle,
} from '../../utils';

const createTilesLogic = createLogic({
    type: boardActionTypes.CREATE_TILES,

    process({}, dispatch, done) {
        const tiles: Tiles = {};
        const numbers: number[] = shuffle(generateRange(0, 15));
        for (let y = 0; y < 4; y++) {
            for (let x = 0; x < 4; x++) {
                const number = numbers.length && numbers.pop();
                tiles[number as number] = { x, y };
            }
        }

        const isSolvable = checkGameIsSolvable(tiles);
        if (!isSolvable) {
            dispatch($$board.actions.createTiles());
        } else {
            dispatch({
                type: boardActionTypes.SET_TILES,
                payload: { tiles },
            });
            dispatch($$board.actions.checkGameResult(tiles));
        }

        done();
    },
});

const changeTilePositionLogic = createLogic({
    type: boardActionTypes.CHANGE_TILE_POSITION,

    process({ action, getState }: Process<ReturnType<typeof $$board.actions.changeTilePosition>>, dispatch, done) {
        const { value } = action;
        const { tiles } = getState().board;
        const selectedTilePosition = tiles[Number(value)];
        const emptyTilePosition = tiles[0];

        if (isTileAdjacentToEmpty(emptyTilePosition, selectedTilePosition)) {
            const newTiles = { ...tiles, 0: selectedTilePosition, [value]: emptyTilePosition };
            dispatch({
                type: boardActionTypes.SET_TILES,
                payload: { tiles: newTiles },
            });
            dispatch($$board.actions.checkGameResult(newTiles));
        }
        done();
    },
});

const checkGameResultLogic = createLogic({
    type: boardActionTypes.CHECK_GAME_RESULT,

    process({ action }: Process<ReturnType<typeof $$board.actions.checkGameResult>>, dispatch, done) {
        const currentCombination = action.tiles;
        const winCombination = generateWinCombination();

        const isWin = compareObjects(currentCombination, winCombination);
        if (isWin) {
            dispatch({
                type: boardActionTypes.SET_GAME_RESULT,
                payload: { isWin },
            });
        }

        done();
    },
});

export default [createTilesLogic, changeTilePositionLogic, checkGameResultLogic];
