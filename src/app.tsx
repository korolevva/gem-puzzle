import AppContainer from 'caComponents/AppContainer/AppContainer';
import { Store } from 'caStore/store';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './app.css';

ReactDOM.render(
    <Provider store={Store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root'),
);
