import { BaseError } from '../errors';
import { createModel, createService } from './';

const COLLECTION = 'users';

export const model = (data) => createModel(data);

export const {
  collection: usersCollection,
  getObjectByID: getUserByID,
  getObject: getUser,
  createObject: createUser,
  updateObject: updateUser,
  listObjects: listUsers,
} = createService(model, COLLECTION);

export class UserNotEnabledError extends BaseError {}
export class UserNotFoundError extends BaseError {}
