import Elusive from '../';

export const model = (data) => {
  const iterate = (obj) => {
    for (const property in obj) {
      if (obj.hasOwnProperty(property)) {
        if (typeof obj[property] == 'object' && obj[property] !== null) {
          // It's a firestore Timestamp just return the timestamp (seconds)
          if (
            typeof obj[property].seconds === 'number' &&
            typeof obj[property].nanoseconds === 'number' &&
            obj[property].seconds
          ) {
            obj[property] = obj[property].seconds;
          } else if (
            typeof obj[property]._seconds === 'number' &&
            typeof obj[property]._nanoseconds === 'number' &&
            obj[property]._seconds
          ) {
            obj[property] = obj[property]._seconds;
          } else {
            iterate(obj[property]);
          }
        }
      }
    }
  };

  iterate(data);

  return data;
};

export const id = async (collectionRef) => {
  const ref = collectionRef.doc();

  return ref.id;
};

export const create = async (docRef, createProps) => {
  const { firebase } = Elusive.services;

  const dateNow = firebase.firestore.Timestamp.now();
  const doc = {
    ...createProps,
    dateCreated: dateNow,
    dateUpdated: dateNow,
  };

  await docRef.set(doc);

  return model({
    ...doc,
    id,
  });
};

export const get = async (query) => {
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

export const update = async (docRef, data) => {
  const { firebase } = Elusive.services;

  data.dateUpdated = firebase.firestore.Timestamp.now();

  const newDoc = {
    ...doc,
    ...updateProps,
  };

  await docRef.update(data);

  return model(newDoc);
};

export const list = async (query) => {
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

// TODO: delete
