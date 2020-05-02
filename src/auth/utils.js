import bcrypt from 'bcryptjs';

import Elusive from '../';

export const hashPassword = (password) => {
  const { sessions: options } = Elusive.options;

  return bcrypt.hashSync(password, options.bcrypt.saltRounds);
};

export const comparePasswordHash = (password, hash) =>
  bcrypt.compareSync(password, hash);
