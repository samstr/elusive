import { getUser } from '../users';
import { createModel } from '../';
import { passwordResetExpired } from './utils';

export default (data) => {
  const model = createModel(data);

  model.hasExpired = () => passwordResetExpired(model);
  model.getUser = async () => {
    model.user = await getUser(model.userId);
  };

  return model;
};
