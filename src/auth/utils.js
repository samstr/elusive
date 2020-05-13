import bcrypt from 'bcryptjs';

import Elusive from '../';

export const LOGIN_TYPE_LINK = 'link';
export const LOGIN_TYPE_PASSWORD = 'password';
export const LOGIN_TYPES = [LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD];

export const hashPassword = (password) => {
  const { auth: authOptions } = Elusive.options;

  return bcrypt.hashSync(password, authOptions.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);
