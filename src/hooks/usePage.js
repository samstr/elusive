import axios, { CancelToken } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Elusive from '../';
import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import { useSessionContext } from '../sessions';

const usePage = (options) => {
  const router = useRouter();
  const [session, setSession] = useState();
  const [data, setData] = useState();
  const { resetSessionContext, setSessionContext } = useSessionContext();
  const { routes } = Elusive.options;

  const defaultOptions = {
    data: false,
    requireAuth: false,
    session: true,
    redirect: null,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  const loginRouteWithNext = () => {
    const { pathname, search } = window.location;
    let href = routes.login();

    if (pathname !== routes.logout()) {
      const encodedNext = encodeURIComponent(`${pathname}${search}`);
      href = `${href}?next=${encodedNext}`;
    }

    return href;
  };

  const handleError = (err) => {
    if (axios.isCancel(err)) return;

    if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();

      const { pathname } = window.location;

      if (pathname !== routes.login()) {
        router.replace(loginRouteWithNext());
      }
      return;
    }

    if (err.response && err.response.data) {
      setData(err.response.data);
      return;
    }

    console.log('Unknown error in usePage: ', err);
  };

  useEffect(() => {
    let cancelSessionRequest;
    let cancelDataRequest;

    if (options.redirect) {
      const { href, asPath } = options.redirect;
      router.replace(href, asPath);
      return;
    }

    (async () => {
      if (options.session) {
        try {
          const response = await axios(routes.apiSession(), {
            cancelToken: new CancelToken((c) => {
              cancelSessionRequest = c;
            }),
          });
          cancelSessionRequest = null;

          setSession(response.data);

          setSessionContext({
            ...response.data.session,
            _ready: true,
          });

          if (options.requireAuth && !response.data.session.isAuthenticated) {
            router.replace(loginRouteWithNext());
            return;
          }
        } catch (err) {
          return handleError(err);
        }
      }

      if (options.data) {
        const { pathname, search } = window.location;
        const url = `/api/page${pathname}${search}`;

        try {
          const response = await axios(url, {
            cancelToken: new CancelToken((c) => {
              cancelDataRequest = c;
            }),
          });
          cancelDataRequest = null;

          setData(response.data);
        } catch (err) {
          return handleError(err);
        }
      }
    })();

    return () => {
      if (typeof cancelSessionRequest === 'function') {
        cancelSessionRequest();
      }

      if (typeof cancelDataRequest === 'function') {
        cancelDataRequest();
      }
    };
  }, []);

  return { session, data };
};

export default usePage;
