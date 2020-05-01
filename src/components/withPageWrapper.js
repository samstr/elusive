/*
import axios, { CancelToken } from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Elusive from '../';
import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import { useSession } from '../sessions';

const handleError = (err) => {
  const { routes } = Elusive.options;

  let data;
  let logout;
  let redirect;

  if (axios.isCancel(err)) return { data, logout, redirect };

  if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
    logout = true;

    const { pathname } = window.location;

    if (pathname !== routes.login()) {
      redirect = loginRouteWithNext();
    }
  }

  if (err.response && err.response.data) {
    data = err.response.data;
  }

  if (!data && !logout && !redirect) {
    console.log('Unknown error from session or data endpoints: ', err);
  }

  return {
    data,
    logout,
    redirect,
  };
};

    /* 

    useEffect(() => {
      let shouldSetPageProps = true;
      let cancelSessionRequest;
      let cancelGlobalsRequest;
      let cancelDataRequest;

      (async () => {
        props = {
          ...pageProps,
        };

        if (options.useSession) {
          // get session
          try {
            const response = await axios.get('/api/session', {
              cancelToken: new CancelToken((c) => {
                cancelSessionRequest = c;
              }),
            });
            cancelSessionRequest = null;
            const sessionResponse = response.data.session;

            sessionResponse._ready = true;
            props.session = sessionResponse;

            session.login(sessionResponse);

            if (options.requireAuth && !sessionResponse.isAuthenticated) {
              router.replace(loginRouteWithNext());
              return;
            }
          } catch (err) {
            const { data, logout, redirect } = handleError(err);

            if (!data && !logout && !redirect) {
              return;
            }

            if (data) {
              props.data = data;
            }

            if (logout) {
              session.logout();
            }

            if (redirect) {
              router.replace(redirect);
              return;
            }
          }
        }

        if (options.useGlobals) {
          // TODO
        }

        if (options.useData) {
          // get page data
          const { pathname, search } = window.location;
          const url = `/api/page${pathname}${search}`;

          try {
            const response = await axios.get(url, {
              cancelToken: new CancelToken((c) => {
                cancelDataRequest = c;
              }),
            });
            cancelDataRequest = null;
            props.data = response.data;
          } catch (err) {
            const { data, logout, redirect } = handleError(err);

            if (!data && !logout && !redirect) {
              return;
            }

            if (data) {
              props.data = data;
            }

            if (logout) {
              session.logout();
            }

            if (redirect) {
              router.replace(redirect);
              return;
            }
          }
        }

        if (shouldSetPageProps) {
          setPageProps(props);
        }
      })();

      return () => {
        shouldSetPageProps = false;

        if (options.useSession && typeof cancelSessionRequest === 'function') {
          cancelSessionRequest();
        }

        if (options.useData && typeof cancelDataRequest === 'function') {
          cancelDataRequest();
        }
      };
    }, []);

    return <WrappedComponent {...pageProps} />;
  };

  Component.propTypes = {
    router: PropTypes.object,
  };

  return Component;
};

export default withPageWrapper;
*/
