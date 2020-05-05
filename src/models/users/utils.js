import Elusive from '../../';
import { COLLECTION } from './config';
import model from './model';

export const getUserByEmail = async (email) => {
  const firestore = Elusive.options.firebase.instance.firestore();

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
