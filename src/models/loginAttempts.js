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

/*export const getRateLimitableActionsByTypeAndIPSinceDate = async (
  type,
  ip,
  date
) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('type', '==', type)
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
};*/
/*
export const getRateLimitableActionsByTypeAndIPAndFormDataSinceData = async (
  ip,
  email,
  date,
  fields = {}
) => {
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
};*/
