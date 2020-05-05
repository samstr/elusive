import { createService } from '../';
import { COLLECTION } from './config';
import model from './model';

export const {
  getObject: getUser,
  createObject: createUser,
  updateObject: updateUser,
  listObjects: listUsers,
} = createService(model, COLLECTION);
