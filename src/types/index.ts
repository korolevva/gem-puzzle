import { Action, AnyAction } from 'redux';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ActionCreator = (...args: any[]) => AnyAction;

export type ActionType<TActionCreator extends ActionCreator> = ReturnType<TActionCreator>;

export type ActionTypes<ActionCreators> = ActionCreators extends ActionCreator
    ? ReturnType<ActionCreators>
    : {
          [K in keyof ActionCreators]: ActionTypes<ActionCreators[K]>;
      }[keyof ActionCreators];

export type LogicAction<Type = never, Payload = never, Error = never> = Action<Type> &
    ([Payload] extends [never] ? {} : { payload: Payload }) &
    ([Error] extends [never] ? {} : { error: Error });

export interface Position {
    x: number;
    y: number;
}

export interface Tiles {
    [K: number]: Position;
}
