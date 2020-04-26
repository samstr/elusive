import { BaseError } from '../errors';

export class HttpError extends BaseError {}

export class HttpMethodNotAllowedError extends HttpError {}
