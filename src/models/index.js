import admin from 'firebase-admin';
import { v4 as uuidv4 } from 'uuid';

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

export const createService = (firestore, model, collection) => {
  return {
    getObject: async (id) => getObject(firestore, model, collection, id),
    createObject: async (createProps) =>
      createObject(firestore, model, collection, createProps),
    updateObject: async (doc, updateProps) =>
      updateObject(firestore, model, collection, doc, updateProps),
    listObjects: async () => listObjects(firestore, model, collection),
  };
};

export const createObject = async (
  firestore,
  model,
  collection,
  createProps
) => {
  const id = uuidv4();

  const dateNow = admin.firestore.Timestamp.now();
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

export const getObject = async (firestore, model, collection, id) => {
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

export const updateObject = async (
  firestore,
  model,
  collection,
  doc,
  updateProps
) => {
  updateProps.dateUpdated = admin.firestore.Timestamp.now();

  const newDoc = {
    ...doc,
    ...updateProps,
  };

  await firestore.collection(collection).doc(doc.id).update(updateProps);

  return model(newDoc);
};

export const listObjects = async (firestore, model, collection) => {
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
