import bcrypt from 'bcryptjs';

import Elusive from '../';

export const hashPassword = (password) => {
  const { auth: authOptions } = Elusive.options;

  return bcrypt.hashSync(password, authOptions.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);
