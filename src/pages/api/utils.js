/*import Elusive from '../../';
import { BaseError, errorJson } from '../../errors';
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
} from '../../http';
import {
  RELOAD_USER_SOURCE_REFRESH_TOKEN,
  SessionError,
  deleteSessionCookies,
  getSession,
} from '../../sessions';
import { TokenError } from '../../tokens';

export const apiWrapper = async (req, res, api) => {
  const { sentry } = Elusive.services;

  const options = {
    allowedMethods: [GET],
    requireAuth: false,
    reloadUserSource: RELOAD_USER_SOURCE_REFRESH_TOKEN,
    ...api.options,
  };

  try {
    validateRequest(req, res, options);

    const { session, tokens } = await getSession(req, options.reloadUserSource);

    if (options.requireAuth && !session.isAuthenticated) {
      return httpForbiddenResponse(
        res,
        errorJson(new Error('You do not have access to view this page.'))
      );
    }

    let data = {};

    data = {
      ...data,
      ...(await api({ req, res, session, tokens })),
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
*/
