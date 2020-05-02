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
  httpOKResponse,
  httpUnauthorizedResponse,
  validateRequest,
} from '../http';
import { SessionError, deleteSessionCookies } from '../sessions';

export const apiWrapper = async (req, res, fn, options) => {
  const { sentry, jwt, sessions } = Elusive.options;

  if (sentry && sentry.dsn) {
    Sentry.init({
      dsn: sentry.dsn,
      enabled: sentry.enabled,
    });
  }

  const defaultOptions = {
    allowedMethods: [GET],
    requireAuth: false,
    setTokens: false,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  try {
    validateRequest(req, res, options);

    const accessToken = req.cookies[sessions.cookies.accessTokenName];
    const refreshToken = req.cookies[sessions.cookies.refreshTokenName];
    const userId = req.cookies[sessions.cookies.userIdName];

    const { session, newTokens } = await getSession(accessToken, refreshToken);

    if (session.isAuthenticated && newTokens && options.setTokens) {
      createSessionCookies(res, signTokens(session.claims, jwt.secret), userId);
    }

    if (options.requireAuth && !session.isAuthenticated) {
      return httpForbiddenResponse(
        res,
        errorJson(new Error('You do not have access to view this page.'))
      );
    }

    let data = {};

    data = {
      ...data,
      ...(await fn({ session })),
    };

    if (data.errors && data.errors.length) {
      return httpBadRequestResponse(res, errorJson(data.errors));
    }

    return httpOKResponse(res, data);
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
