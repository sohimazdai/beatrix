import { logger } from '../app/Logger';

export const loggerMiddleware = store => next => action => {
    logger("DISPATCHING", action.type);
    const result = next(action);
    return result;
}
