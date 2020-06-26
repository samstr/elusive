import Elusive from '../../../';

const modelData = (data) => {
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

export const createDocument = async (collectionRef, createProps) => {
  const { firebase } = Elusive.services;

  const id = collectionRef.doc().id;
  const docRef = collectionRef.doc(id);

  const dateNow = firebase.firestore.Timestamp.now();
  const doc = {
    ...createProps,
    dateCreated: dateNow,
    dateUpdated: dateNow,
  };

  await docRef.set(doc);

  return modelData({
    ...doc,
    id,
  });
};

export const getDocument = async (docRefOrQuery) => {
  const { firebase } = Elusive.services;

  if (docRefOrQuery instanceof firebase.firestore.DocumentReference) {
    const docRef = docRefOrQuery;
    const doc = await docRef.get();

    if (doc.exists) {
      return modelData({
        id: doc.id,
        ...doc.data(),
      });
    } else {
      return null;
    }
  } else if (docRefOrQuery instanceof firebase.firestore.Query) {
    const query = docRefOrQuery.limit(1);

    const results = await query.get();

    let doc;

    results.forEach((result) => {
      doc = modelData({
        id: result.id,
        ...result.data(),
      });
    });

    return doc || null;
  }
};

export const updateDocument = async (docRef, data, originalDoc) => {
  const { firebase } = Elusive.services;

  data.dateUpdated = firebase.firestore.Timestamp.now();

  const updatedDoc = {
    ...originalDoc,
    ...data,
  };

  await docRef.update(data);

  if (originalDoc) {
    return modelData(updatedDoc);
  } else {
    return true;
  }
};

export const listDocuments = async (query) => {
  const results = await query.get();

  const docs = [];

  results.forEach((result) => {
    docs.push(
      modelData({
        id: result.id,
        ...result.data(),
      })
    );
  });

  return docs;
};

// TODO: delete
