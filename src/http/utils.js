import { errorJson } from '../errors';

import {
  HttpBadRequestError,
  HttpForbiddenError,
  HttpInternalServerError,
  HttpMethodNotAllowedError,
  HttpUnauthorizedError,
} from './errors';

export const GET = 'GET';
export const POST = 'POST';

export const HTTP_STATUS_OK = 200;

export const HTTP_STATUS_BAD_REQUEST = 400;
export const HTTP_STATUS_UNAUTHORIZED = 401;
export const HTTP_STATUS_FORBIDDEN = 403;
export const HTTP_STATUS_METHOD_NOT_ALLOWED = 405;

export const HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;

export const validateRequest = (req, res, options) => {
  const { allowedMethods } = options;

  if (!allowedMethods.includes(req.method.toUpperCase())) {
    res.setHeader('Allow', allowedMethods.join(', '));
    throw new HttpMethodNotAllowedError('Method not allowed');
  }
};

export const httpResponse = (res, status, data) => {
  res.status(status).json(data);
  res.end();
};

// 200
export const httpOKResponse = (res, data) =>
  httpResponse(res, HTTP_STATUS_OK, data || {});

// 400
export const httpBadRequestResponse = (res, data) =>
  httpResponse(
    res,
    HTTP_STATUS_BAD_REQUEST,
    data || errorJson(new HttpBadRequestError('Bad request.'))
  );

// 401
export const httpUnauthorizedResponse = (res, data) =>
  httpResponse(
    res,
    HTTP_STATUS_UNAUTHORIZED,
    data || errorJson(new HttpUnauthorizedError('Unauthorized.'))
  );

// 403
export const httpForbiddenResponse = (res, data) =>
  httpResponse(
    res,
    HTTP_STATUS_FORBIDDEN,
    data || errorJson(new HttpForbiddenError('Forbidden.'))
  );

// 405
export const httpMethodNotAllowedResponse = (res, data) =>
  httpResponse(
    res,
    HTTP_STATUS_METHOD_NOT_ALLOWED,
    data || errorJson(new HttpMethodNotAllowedError('Method not allowed.'))
  );

// 500
export const httpInternalServerErrorResponse = (res, data) =>
  httpResponse(
    res,
    HTTP_STATUS_INTERNAL_SERVER_ERROR,
    data || errorJson(new HttpInternalServerError('An unknown error occured.'))
  );
