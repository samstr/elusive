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

  const defaultOptions = {
    allowedMethods: [GET],
    requireAuth: false,
    useSession: false,
  };

  options = {
    ...defaultOptions,
    ...options,
  };

  const props = { req, res };

  try {
    validateRequest(req, res, options);

    if (options.useSession) {
      props.session = await validateSession(req, res);
    }

    return await fn(props);
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
    console.log('sentry is', sentry);

    if (sentry) {
      console.log('capturing it in sentry');
      sentry.captureException(err);
      console.log('done!');
    }

    return httpInternalServerErrorResponse(
      res,
      errorMessage('An unknown error occured.')
    );
  }
};
