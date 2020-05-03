import axios, { CancelToken } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Elusive from '../';
import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import { loginRouteWithNext } from '../routes';
import { useSessionContext } from '../sessions';

const useSession = () => {
  const {
    sessionContext,
    resetSessionContext,
    setSessionContext,
  } = useSessionContext();
  const [session, setSession] = useState(sessionContext);
  const router = useRouter();
  const { routes: routeOptions } = Elusive.options;

  const handleError = (err) => {
    if (axios.isCancel(err)) return;

    if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();

      const { pathname } = window.location;

      if (pathname !== routeOptions.login()) {
        router.replace(loginRouteWithNext());
      }
      return;
    }

    console.log('Unknown error in useSession: ', err);
  };

  useEffect(() => {
    let cancelRequest;

    const fetch = async () => {
      try {
        const response = await axios(routeOptions.apiSession(), {
          cancelToken: new CancelToken((c) => {
            cancelRequest = c;
          }),
        });
        cancelRequest = null;

        const _session = {
          ...response.data.session,
          _ready: true,
        };

        setSession(_session);
        setSessionContext(_session);
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

  return session;
};

export default useSession;
