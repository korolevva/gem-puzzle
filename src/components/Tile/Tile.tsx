import React from 'react';
import { useDispatch } from 'react-redux';
import * as style from './Tile.css';
import * as $$board from 'caDucks/board';

interface Props {
    tile: [string, { x: number; y: number }];
}

const Size = {
    TILE: 100,
    GAP: 10,
};

const Tile: React.FC<Props> = ({ tile }) => {
    const dispatch = useDispatch();
    const [value, position] = tile;
    const { x, y } = position;

    const handleTileClick = () => {
        dispatch($$board.actions.changeTilePosition(value));
    };

    return (
        <div
            className={`${style.tile} ${+value === 0 && style.emptyTile}`}
            style={{
                left: `${Size.GAP + x * (Size.TILE + Size.GAP)}px`,
                top: `${Size.GAP + y * (Size.TILE + Size.GAP)}px`,
            }}
            onClick={handleTileClick}
        >
            {+value !== 0 && value}
        </div>
    );
};

export default Tile;
