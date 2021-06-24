import React, { useEffect } from 'react';
import * as style from './Board.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'caStore/rootReducer';
import { Tiles } from 'src/types';
import * as $$board from 'caDucks/board';
import TileComponent from 'caComponents/Tile/Tile';

export const Board = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch($$board.actions.createTiles());
    }, []);

    const tiles = useSelector<RootState, Tiles>((state) => state.board.tiles);
    const isWin = useSelector<RootState, boolean>((state) => state.board.isWin);

    const handleStartButtonClick = () => {
        dispatch($$board.actions.createTiles());
    };

    return (
        <>
            <button onClick={handleStartButtonClick} className={style.button}>
                Начать заново
            </button>
            <div className={style.board}>
                {tiles &&
                    Object.entries(tiles).map((tile, i) => {
                        return <TileComponent key={i} tile={tile} />;
                    })}
            </div>
            {isWin && (
                <div>
                    <p className={style.win}>Победа!</p>
                </div>
            )}
        </>
    );
};
