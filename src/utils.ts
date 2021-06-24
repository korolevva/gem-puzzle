import { Position, Tiles } from './types';

export const generateRange = (start: number, end: number) => {
    return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
};

export const shuffle = (array: number[]) => {
    let j;

    for (let i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        [array[j], array[i]] = [array[i], array[j]];
    }

    return array;
};

export const isTileAdjacentToEmpty = (emptyTilePosition: Position, selectedTilePosition: Position) => {
    return (
        (Math.abs(emptyTilePosition['x'] - selectedTilePosition['x']) === 1 &&
            emptyTilePosition['y'] === selectedTilePosition['y']) ||
        (Math.abs(emptyTilePosition['y'] - selectedTilePosition['y']) === 1 &&
            emptyTilePosition['x'] === selectedTilePosition['x'])
    );
};

export const compareObjects = (obj1: Tiles, obj2: Tiles) => {
    if (obj1 === obj2) return true;

    if (typeof obj1 !== 'object' || typeof obj2 !== 'object' || obj1 == null || obj2 == null) {
        return false;
    }

    const keysA = Object.keys(obj1);
    const keysB = Object.keys(obj2);

    if (keysA.length !== keysB.length) {
        return false;
    }

    let result = true;

    keysA.forEach((key) => {
        if (!keysB.includes(key)) {
            result = false;
        }

        if (
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            (typeof obj1[key] === 'function' || typeof obj2[key] === 'function') &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
            // @ts-ignore
            obj1[key].toString() !== obj2[key].toString()
        ) {
            result = false;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
        // @ts-ignore
        if (!compareObjects(obj1[key], obj2[key])) {
            result = false;
        }
    });

    return result;
};

export function generateWinCombination() {
    const tiles: Tiles = {};
    for (let i = 0; i < 15; i += 1) {
        tiles[i + 1] = { x: i % 4, y: Math.floor(i / 4) };
    }
    tiles[0] = { x: 3, y: 3 };

    return tiles;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
export const checkGameIsSolvable = (tiles: Tiles) => {
    const puzzle: (number | number[])[] = [];
    Object.entries(tiles).forEach(([value, position]) => {
        if (!puzzle[position['y']]) {
            puzzle[position['y']] = [];
        }
        puzzle[position['y'] * 4 + position['x']] = Number(value);
    });
    console.log(puzzle);

    let parity = 0;
    const gridWidth = Math.sqrt(puzzle.length);

    let row = 0;
    let blankRow = 0;

    for (let i = 0; i < puzzle.length; i += 1) {
        if (i % gridWidth === 0) {
            row += 1;
        }
        if (puzzle[i] === 0) {
            blankRow = row;
            continue;
        }
        for (let j = i + 1; j < puzzle.length; j += 1) {
            if (puzzle[i] > puzzle[j] && puzzle[j] !== 0) {
                parity += 1;
            }
        }
    }

    if (gridWidth % 2 === 0) {
        if (blankRow % 2 === 0) {
            return parity % 2 === 0;
        }

        return parity % 2 !== 0;
    }

    return parity % 2 === 0;
};
