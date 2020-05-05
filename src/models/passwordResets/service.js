import { createService } from '../';
import { COLLECTION } from './config';
import model from './model';

export const {
  getObject: getPasswordReset,
  createObject: createPasswordReset,
  updateObject: updatePasswordReset,
  listObjects: listPasswordResets,
} = createService(model, COLLECTION);
