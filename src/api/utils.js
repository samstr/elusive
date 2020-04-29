import * as Sentry from '@sentry/node';

import Elusive from '../';
import { BaseError } from '../errors';
import {
  GET,
  HttpError,
  HttpMethodNotAllowedError,
  httpBadRequestResponse,
  httpForbiddenResponse,
  httpInternalServerErrorResponse,
  httpMethodNotAllowedResponse,
  validateRequest,
} from '../http';
import {
  SessionError,
  deleteSessionCookies,
  validateSession,
} from '../sessions';

const errorMessage = (message) => ({
  errors: [
    {
      message,
    },
  ],
});

export const apiWrapper = async (req, res, fn, options) => {
  const { sentry } = Elusive.options;

  if (sentry && sentry.dsn) {
    Sentry.init({
      dsn: sentry.dsn,
    });
  }

  const defaultOptions = {
    allowedMethods: [GET],
    requireAuth: false,
    useSession: false,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  let props = { req, res };

  try {
    validateRequest(req, res, options);

    if (options.useSession) {
      props.session = await validateSession(req, res);
    }

    props = {
      ...props,
      ...(await fn(props)),
    };

    return res.json(props);
  } catch (err) {
    console.log('we caught an error', err);
    if (err instanceof HttpError) {
      if (err instanceof HttpMethodNotAllowedError) {
        return httpMethodNotAllowedResponse(res, errorMessage(err.message));
      }
    }

    if (err instanceof SessionError) {
      deleteSessionCookies(res);

      return httpForbiddenResponse(
        res,
        errorMessage(
          'There was a problem with your session. Please log in again.'
        )
      );
    }

    if (err instanceof BaseError) {
      return httpBadRequestResponse(res, errorMessage(err.message));
    }

    console.error('error in apiWrapper:', err);

    if (sentry && sentry.dsn) {
      console.log('sending to Sentry');
      Sentry.captureException(err);
    }

    return httpInternalServerErrorResponse(
      res,
      errorMessage('An unknown error occured.')
    );
  }
};
