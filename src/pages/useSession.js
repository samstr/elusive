import axios, { CancelToken } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import {
  loginRoute,
  loginRouteWithNext,
  onboardingRoute,
  onboardingPasswordRoute,
  sessionAPIRoute,
} from '../routes';
import { useSessionContext } from '../sessions';

const useSession = () => {
  const {
    sessionContext,
    resetSessionContext,
    setSessionContext,
  } = useSessionContext();
  const [session, setSession] = useState(sessionContext);
  const router = useRouter();

  const handleError = (err) => {
    if (axios.isCancel(err)) return;

    if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();

      const { pathname } = window.location;

      if (pathname !== loginRoute()) {
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
        const response = await axios(sessionAPIRoute(), {
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

        // if user still needs onboarding
        if (_session.isAuthenticated) {
          const { pathname } = window.location;

          if (
            _session.claims.user.onboarding?.needsPassword &&
            pathname !== onboardingRoute() &&
            pathname !== onboardingPasswordRoute()
          ) {
            router.replace(onboardingRoute());
          }
        }
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
