import axios, { CancelToken } from 'axios';
import { useEffect, useState } from 'react';

import Elusive from '../';
import { useSessionContext } from '../sessions';

const useSession = () => {
  const { sessionContext, setSessionContext } = useSessionContext();
  const [session, setSession] = useState(sessionContext);
  const { routes: routeOptions } = Elusive.options;

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
          ...response.data,
          _ready: true,
        };

        setSession(_session);
        setSessionContext(_session);
      } catch (err) {
        console.log('err', err);
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
