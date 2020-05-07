import { BaseError } from '../errors';
import { createModel, createService } from './';

const COLLECTION = 'loginAttempts';

export const model = (data) => createModel(data);

export const {
  collection: loginAttemptsCollection,
  getObjectByID: getLoginAttemptByID,
  getObject: getLoginAttempt,
  createObject: createLoginAttempt,
  updateObject: updateLoginAttempt,
  listObjects: listLoginAttempts,
} = createService(model, COLLECTION);

export class LoginAttemptNotFoundError extends BaseError {}
