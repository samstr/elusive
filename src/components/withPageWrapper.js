import axios, { CancelToken, Cancel } from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { HTTP_STATUS_FORBIDDEN } from '../http';
import { useSession } from '../sessions';

const defaultOptions = {
  useSession: false,
  useGlobals: false,
  useData: false,
  requireAuth: false,
};

const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = '/login';

  if (pathname !== '/logout') {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};

const handleError = (response, err) => {
  if (err instanceof Cancel) return;
  console.log(response);
  console.log(response.status);
  console.log(HTTP_STATUS_FORBIDDEN);
  if (response.status === HTTP_STATUS_FORBIDDEN) {
    router.replace(loginRouteWithNext());
  } else {
    // If it's an unknown error
    // NOTE we need to let some errors get passed into props
    console.log('Unknown error from session or data endpoints: ', err);
  }
};

const withPageWrapper = (WrappedComponent, options) => {
  options = {
    ...defaultOptions,
    ...options,
  };

  const Component = (props) => {
    const { router } = props;
    const session = useSession();
    const [pageProps, setPageProps] = useState(props);

    useEffect(() => {
      if (options.redirect) {
        const { href, asPath } = options.redirect;
        router.replace(href, asPath);
      }
    }, []);

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

            if (options.requireAuth && !sessionResponse.isAuthenticated) {
              router.replace(loginRouteWithNext());
              return;
            } else {
              session.setSession(sessionResponse);
            }
          } catch (err) {
            return handleError(response, err);
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
            return handleError(response, err);
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
