import { BaseError } from '../errors';
import { createModel, createService } from './';

const COLLECTION = 'resetAttempts';

export const model = (data) => createModel(data);

export const {
  collection: resetAttemptsCollection,
  getObjectByID: getResetAttemptByID,
  getObject: getResetAttempt,
  createObject: createResetAttempt,
  updateObject: updateResetAttempt,
  listObjects: listResetAttempts,
} = createService(model, COLLECTION);

export class ResetAttemptNotFoundError extends BaseError {}
