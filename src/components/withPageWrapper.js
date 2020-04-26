import axios, { CancelToken, Cancel } from 'axios';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import { useSession } from '../sessions';

const defaultOptions = {
  useSession: false,
  useGlobals: false,
  useData: false,
  requireAuth: false,
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
            const sessionResponse = response.data;

            sessionResponse._ready = true;
            props.session = sessionResponse;

            if (options.requireAuth && !sessionResponse.isAuthenticated) {
              const { pathname, search } = window.location;
              let href = '/login';
              if (pathname !== '/logout') {
                const encodedNext = encodeURIComponent(`${pathname}${search}`);
                href = `${href}?next=${encodedNext}`;
              }
              router.replace(href);
              return;
            } else {
              session.setSession(sessionResponse);
            }
          } catch (err) {
            if (!(err instanceof Cancel)) {
              console.log('error getting /api/session', err);
            }
            return;
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
            if (!(err instanceof Cancel)) {
              console.log(`error getting ${url}`, err);
            }
            return;
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