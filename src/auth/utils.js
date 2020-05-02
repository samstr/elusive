import bcrypt from 'bcryptjs';

import Elusive from '../';

export const hashPassword = (password) => {
  const { auth: options } = Elusive.options;

  return bcrypt.hashSync(password, options.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);
