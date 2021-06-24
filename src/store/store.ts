import { createLogicMiddleware } from 'redux-logic';
import logics from '../logics';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from './rootReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory, History } from 'history';

export const history = process.env.TESTING ? ({} as History<{}>) : createBrowserHistory();

const logicMiddleware = createLogicMiddleware(logics);

export const Store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logicMiddleware)));
