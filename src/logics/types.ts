import { RootState } from 'caStore/rootReducer';
import { History } from 'history';

export interface Process<T> {
    getState: () => RootState;
    action: T;
    history: History;
}
