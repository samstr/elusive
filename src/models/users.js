import { hasRole } from '../auth';
import { BaseError } from '../errors';
import { createModel, createService } from './';

const COLLECTION = 'users';

export const model = (data) => {
  const model = createModel(data);

  model.hasRole = (role) => hasRole(role, model.roles);

  return model;
};

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
