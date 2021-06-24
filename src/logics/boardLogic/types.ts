import { boardActionTypes } from 'caDucks/board';
import { LogicAction, Tiles } from 'src/types';

export type CreateTilesLogic = LogicAction<typeof boardActionTypes.CREATE_TILES, { tiles: Tiles }>;
export type ChangeTilePositionLogic = LogicAction<typeof boardActionTypes.CHANGE_TILE_POSITION, { value: string }>;
export type CheckGameResultLogic = LogicAction<typeof boardActionTypes.CHECK_GAME_RESULT, { tiles: Tiles }>;
export type BoardLogic = CreateTilesLogic | ChangeTilePositionLogic | CheckGameResultLogic;
