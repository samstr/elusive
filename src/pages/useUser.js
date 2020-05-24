import axios, { CancelToken } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import { loginRoute, userAPIRoute } from '../routes';
import { useUserContext } from './UserContext';

const useUser = () => {
  const { resetUserContext, setUserContext } = useUserContext();
  const [user, setUser] = useState();
  const router = useRouter();

  const handleError = (err) => {
    if (axios.isCancel(err)) return;

    if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
      resetUserContext();

      const { pathname } = window.location;

      if (pathname !== loginRoute()) {
        router.replace(loginRoute());
      }
      return;
    }

    console.log('Unknown error in useUser: ', err);
  };

  useEffect(() => {
    let cancelRequest;

    const fetch = async () => {
      try {
        const response = await axios(userAPIRoute(), {
          cancelToken: new CancelToken((c) => {
            cancelRequest = c;
          }),
        });
        cancelRequest = null;

        const _user = {
          ...response.data.user,
          _ready: true,
        };

        setUser(_user);
        setUserContext(_user);
      } catch (err) {
        return handleError(err);
      }
    };

    fetch();

    return () => {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);

  return user;
};

export default useUser;
