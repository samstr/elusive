import moment from 'moment';

import Elusive from '../';
import { BaseError } from '../errors';
import { createModel, createService } from './';
import { getUserByID } from './users';

const COLLECTION = 'magicLogins';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => magicLoginExpired(model);
  model.getUser = async (_) => {
    model.user = await getUserByID(model.userId);
  };

  return model;
};

export const {
  collection: magicLoginsCollection,
  getObjectByID: getMagicLoginByID,
  getObject: getMagicLogin,
  createObject: createMagicLogin,
  updateObject: updateMagicLogin,
  listObjects: listMagicLogins,
} = createService(model, COLLECTION);

export class MagicLoginAlreadyUsedError extends BaseError {}
export class MagicLoginNotFoundError extends BaseError {}
export class MagicLoginExpiredError extends BaseError {}

export const magicLoginExpired = (magicLogin) => {
  const { auth: authOptions } = Elusive.options;

  const dateNow = moment();
  const dateCreated = moment.unix(magicLogin.dateCreated);
  const dateExpires = moment(dateCreated).add(
    authOptions.magicLoginExpiryHours,
    'hours'
  );

  return dateNow.isAfter(dateExpires);
};
