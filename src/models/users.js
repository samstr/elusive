import Elusive from '../';
import { BaseError } from '../errors';
import { createModel, createService } from './';

export const COLLECTION = 'users';

export const model = (data) => createModel(data);

export const {
  getObject: getUser,
  createObject: createUser,
  updateObject: updateUser,
  listObjects: listUsers,
} = createService(model, COLLECTION);

export const getUserByEmail = async (email) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('email', '==', email)
    .get();

  if (docs.size === 0) {
    return null;
  }

  let user;

  docs.forEach((doc) => {
    user = model({
      id: doc.id,
      ...doc.data(),
    });
  });

  return user;
};

export const getUserByUsername = async (username) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore
    .collection(COLLECTION)
    .where('username', '==', username)
    .get();

  if (docs.size === 0) {
    return null;
  }

  let user;

  docs.forEach((doc) => {
    user = model({
      id: doc.id,
      ...doc.data(),
    });
  });

  return user;
};

export const getUsersByIPSinceDate = async (ip, date) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  console.log(`getting where ip is ${ip} and dateCreated > ${date}`);

  const docs = await firestore
    .collection(COLLECTION)
    .where('registrationIP', '==', ip)
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

  console.log(`found ${objects.length} users with IP`);

  return objects;
};

export class UserNotEnabledError extends BaseError {}
export class UserNotFoundError extends BaseError {}
