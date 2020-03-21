import { IStorage } from '../model/IStorage';
import { Action, Dispatch } from 'redux';

export const loggerMiddleware = store => next => action => {
    console.log("DISPATCHING", action.type);
    const result = next(action);
    return result;
}
