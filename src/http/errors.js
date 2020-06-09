import { BaseError } from '../errors';

export class HttpError extends BaseError {}

export class HttpInternalServerError extends HttpError {}
export class HttpMethodNotAllowedError extends HttpError {}
