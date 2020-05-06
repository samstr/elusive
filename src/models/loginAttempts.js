import Elusive from '../';
import { BaseError } from '../errors';
import { createModel, createService } from './';

export const COLLECTION = 'loginAttempts';

export const model = (data) => createModel(data);

export const {
  getObject: getLoginAttempt,
  createObject: createLoginAttempt,
  updateObject: updateLoginAttempt,
  listObjects: listLoginAttempts,
} = createService(model, COLLECTION);

export class LoginAttemptNotFoundError extends BaseError {}

export const getLoginAttemptsByIPSinceDate = async (ip, date) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('ip', '==', ip)
    .where('dateCreated', '>', date)
    .get();

  const objects = [];

  docs.forEach((doc) => {
    objects.push(
      model({
        id: doc.id,
        ...doc.data(),
      })
    );
  });

  return objects;
};

export const getLoginAttemptsByAccountSinceDate = async (ip, email, date) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('ip', '==', ip)
    .where('email', '==', email)
    .where('dateCreated', '>', date)
    .get();

  const objects = [];

  docs.forEach((doc) => {
    objects.push(
      model({
        id: doc.id,
        ...doc.data(),
      })
    );
  });

  return objects;
};
