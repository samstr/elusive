import moment from 'moment';

import Elusive from '../';
import { BaseError } from '../errors';
import { createModel, createService } from './';
import { getUserByID } from './users';

const COLLECTION = 'autoLogins';

export const model = (data) => {
  const model = createModel(data);

  model.hasExpired = () => autoLoginExpired(model);
  model.getUser = async (_) => {
    model.user = await getUserByID(model.userId);
  };

  return model;
};

export const {
  collection: autoLoginsCollection,
  getObjectByID: getAutoLoginByID,
  getObject: getAutoLogin,
  createObject: createAutoLogin,
  updateObject: updateAutoLogin,
  listObjects: listAutoLogins,
} = createService(model, COLLECTION);

export class AutoLoginAlreadyUsedError extends BaseError {}
export class AutoLoginNotFoundError extends BaseError {}
export class AutoLoginExpiredError extends BaseError {}

export const autoLoginExpired = (autoLogin) => {
  const { auth: authOptions } = Elusive.options;

  const dateNow = moment();
  const dateCreated = moment.unix(autoLogin.dateCreated);
  const dateExpires = moment(dateCreated).add(
    authOptions.autoLoginExpiryHours,
    'hours'
  );

  return dateNow.isAfter(dateExpires);
};
