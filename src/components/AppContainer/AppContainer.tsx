import { Board } from 'caComponents/Board/Board';
import React from 'react';
import style from './AppContainer.css';

const AppContainer = () => {
    return (
        <div className={style.container}>
            <Board />
        </div>
    );
};

export default AppContainer;
