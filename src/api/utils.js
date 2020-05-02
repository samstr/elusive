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
import {
  SessionError,
  createSessionCookies,
  deleteSessionCookies,
  getSession,
} from '../sessions';
import { signTokens } from '../tokens';

export const apiWrapper = async (req, res, fn, options) => {
  const {
    sentry: sentryOptions,
    sessions: sessionOptions,
    tokens: tokenOptions,
  } = Elusive.options;

  if (sentryOptions && sentryOptions.dsn) {
    Sentry.init({
      dsn: sentryOptions.dsn,
      enabled: sentryOptions.enabled,
    });
  }

  const defaultOptions = {
    allowedMethods: [GET],
    requireAuth: false,
    setSessionCookies: false,
    reloadSessionUser: false,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  try {
    validateRequest(req, res, options);

    const accessToken = req.cookies[sessionOptions.accessTokenCookieName];
    const refreshToken = req.cookies[sessionOptions.refreshTokenCookieName];
    const userId = req.cookies[sessionOptions.userIdCookieName];

    const { session, tokens } = await getSession(
      accessToken,
      refreshToken,
      userId,
      options.reloadSessionUser
    );

    if (options.setSessionCookies && session.isAuthenticated && tokens) {
      createSessionCookies(
        res,
        signTokens(session.claims, tokenOptions.secret),
        userId
      );
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

    if (sentryOptions && sentryOptions.dsn) {
      console.log('sending to Sentry');
      Sentry.captureException(err);
    }

    return httpInternalServerErrorResponse(
      res,
      errorJson(new Error('An unknown error occured.'))
    );
  }
};
