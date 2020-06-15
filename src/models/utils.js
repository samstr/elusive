import { v4 as uuidv4 } from 'uuid';

import Elusive from '../';

export const createModel = (data) => {
  const iterate = (obj, stack) => {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == 'object' && obj[property] !== null) {
          // It's a firestore Timestamp just return the timestamp (seconds)
          if (obj[property].seconds && obj[property].nanoseconds) {
            obj[property] = obj[property].seconds;
          } else if (obj[property]._seconds && obj[property]._nanoseconds) {
            obj[property] = obj[property]._seconds;
          } else {
            iterate(obj[property], stack + '.' + property);
          }
        }
      }
    }
  };

  iterate(data, '');

  return data;
};

export const createService = (model, collectionName) => ({
  collection: () => collection(collectionName),
  getObjectByID: async (id) => getObjectByID(model, collectionName, id),
  getObject: async (query) => getObject(model, query),
  createObject: async (createProps) =>
    createObject(model, collectionName, createProps),
  updateObject: async (doc, updateProps) =>
    updateObject(model, collectionName, doc, updateProps),
  listObjects: async (query) => listObjects(model, query),
});

export const collection = (collectionName) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  return firestore.collection(collectionName);
};

export const createObject = async (model, collectionName, createProps) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();
  const id = uuidv4();

  const dateNow = firebase.firestore.Timestamp.now();
  const doc = {
    ...createProps,
    dateCreated: dateNow,
    dateUpdated: dateNow,
  };

  await firestore.collection(collectionName).doc(id).set(doc);

  return model({
    ...doc,
    id,
  });
};

export const getObjectByID = async (model, collectionName, id) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();
  const doc = await firestore.collection(collectionName).doc(id).get();

  if (doc.exists) {
    return model({
      id: doc.id,
      ...doc.data(),
    });
  } else {
    return null;
  }
};

export const getObject = async (model, query) => {
  query = query.limit(1);

  const docs = await query.get();

  let object;

  docs.forEach((doc) => {
    object = model({
      id: doc.id,
      ...doc.data(),
    });
  });

  return object;
};

export const updateObject = async (model, collectionName, doc, updateProps) => {
  const { firebase } = Elusive.services;
  const firestore = firebase.firestore();

  updateProps.dateUpdated = firebase.firestore.Timestamp.now();

  const newDoc = {
    ...doc,
    ...updateProps,
  };

  await firestore.collection(collectionName).doc(doc.id).update(updateProps);

  return model(newDoc);
};

export const listObjects = async (model, query) => {
  const docs = await query.get();

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
