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
import { TokenError, signTokens } from '../tokens';

export const apiWrapper = async (req, res, api) => {
  const { sentry } = Elusive.services;
  const { tokens: tokenOptions } = Elusive.options;

  const options = {
    allowedMethods: [GET],
    requireAuth: false,
    setSessionCookies: false,
    reloadSessionUser: false,
    ...api.options,
  };

  try {
    validateRequest(req, res, options);

    const { session, tokens } = await getSession(
      req,
      options.reloadSessionUser
    );

    if (options.setSessionCookies && session.isAuthenticated && tokens) {
      createSessionCookies(
        res,
        signTokens(session.claims, tokenOptions.secret),
        session.claims.user.id
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
      ...(await api({ req, res, session })),
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

    if (err instanceof SessionError || err instanceof TokenError) {
      deleteSessionCookies(res);

      return httpUnauthorizedResponse(res, errorJson(err));
    }

    if (err instanceof BaseError) {
      return httpBadRequestResponse(res, errorJson(err));
    }

    console.error('error in apiWrapper:', err);

    if (sentry) {
      sentry.captureException(err);
    }

    return httpInternalServerErrorResponse(
      res,
      errorJson(new Error('An unknown error occured.'))
    );
  }
};
