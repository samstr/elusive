import { BaseError } from '../errors';
import { createModel, createService } from './';

const COLLECTION = 'passwordResetAttempts';

export const model = (data) => createModel(data);

export const {
  collection: passwordResetAttemptsCollection,
  getObjectByID: getPasswordResetAttemptByID,
  getObject: getPasswordResetAttempt,
  createObject: createPasswordResetAttempt,
  updateObject: updatePasswordResetAttempt,
  listObjects: listPasswordResetAttempts,
} = createService(model, COLLECTION);

export class PasswordResetAttemptNotFoundError extends BaseError {}
