import { BaseError } from '../errors';

export class HttpError extends BaseError {}

export class HttpBadRequestError extends HttpError {}
export class HttpForbiddenError extends HttpError {}
export class HttpInternalServerError extends HttpError {}
export class HttpMethodNotAllowedError extends HttpError {}
export class HttpUnauthorizedError extends HttpError {}
