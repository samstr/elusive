import * as Sentry from '@sentry/node';

import Elusive from '../';
import { BaseError, errorJson } from '../errors';
import {
  GET,
  HttpError,
  HttpMethodNotAllowedError,
  httpBadRequestResponse,
  httpForbiddenResponse,
  httpInternalServerErrorResponse,
  httpMethodNotAllowedResponse,
  httpUnauthorizedResponse,
  validateRequest,
} from '../http';
import {
  SessionError,
  deleteSessionCookies,
  validateSession,
} from '../sessions';

export const apiWrapper = async (req, res, fn, options) => {
  const { sentry } = Elusive.options;

  if (sentry && sentry.dsn) {
    Sentry.init({
      dsn: sentry.dsn,
      enabled: sentry.enabled,
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

  try {
    validateRequest(req, res, options);

    let session;

    if (options.useSession) {
      session = await validateSession(req, res);

      if (options.requireAuth && !session.isAuthenticated) {
        return httpForbiddenResponse(
          res,
          errorJson(new Error('You do not have access to view this page.'))
        );
      }
    }

    const props = await fn({ req, res, session });

    if (props.errors && props.errors.length) {
      return httpBadRequestResponse(res, errorJson(props.errors));
    }

    return res.json(props);
  } catch (err) {
    if (err instanceof HttpError) {
      if (err instanceof HttpMethodNotAllowedError) {
        return httpMethodNotAllowedResponse(res, errorJson(err));
      }
    }

    if (err instanceof SessionError) {
      deleteSessionCookies(res);

      return httpUnauthorizedResponse(res, errorJson(err));
    }

    if (err instanceof BaseError) {
      return httpBadRequestResponse(res, errorJson(err));
    }

    console.error('error in apiWrapper:', err);

    if (sentry && sentry.dsn) {
      console.log('sending to Sentry');
      Sentry.captureException(err);
    }

    return httpInternalServerErrorResponse(
      res,
      errorJson(new Error('An unknown error occured.'))
    );
  }
};
