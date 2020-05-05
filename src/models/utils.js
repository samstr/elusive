import { v4 as uuidv4 } from 'uuid';

import Elusive from '../';

export const createModel = (data) => {
  const model = {};

  Object.keys(data).forEach((key) => {
    // It's a firestore Timestamp just return the timestamp (seconds)
    if (data[key].seconds) {
      model[key] = data[key].seconds;
    } else {
      model[key] = data[key];
    }
  });

  return model;
};

export const createService = (model, collection) => ({
  getObject: async (id) => getObject(model, collection, id),
  createObject: async (createProps) =>
    createObject(model, collection, createProps),
  updateObject: async (doc, updateProps) =>
    updateObject(model, collection, doc, updateProps),
  listObjects: async () => listObjects(model, collection),
});

export const createObject = async (model, collection, createProps) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();
  const id = uuidv4();

  const dateNow = firebase.firestore.Timestamp.now();
  const doc = {
    ...createProps,
    dateCreated: dateNow,
    dateUpdated: dateNow,
  };

  await firestore.collection(collection).doc(id).set(doc);

  return model({
    ...doc,
    id,
  });
};

export const getObject = async (model, collection, id) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();
  const doc = await firestore.collection(collection).doc(id).get();

  if (doc.exists) {
    return model({
      id: doc.id,
      ...doc.data(),
    });
  } else {
    return null;
  }
};

export const updateObject = async (model, collection, doc, updateProps) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  updateProps.dateUpdated = firebase.firestore.Timestamp.now();

  const newDoc = {
    ...doc,
    ...updateProps,
  };

  await firestore.collection(collection).doc(doc.id).update(updateProps);

  return model(newDoc);
};

export const listObjects = async (model, collection) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  const docs = await firestore.collection(collection).get();

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
