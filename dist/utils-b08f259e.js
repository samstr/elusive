'use strict';

var classCallCheck = require('./classCallCheck-d2bb402f.js');
var FormErrors = require('./FormErrors-1539c4dc.js');

function _createSuper(Derived) { return function () { var Super = FormErrors._getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = FormErrors._getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return FormErrors._possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }
var HttpError = /*#__PURE__*/function (_BaseError) {
  FormErrors._inherits(HttpError, _BaseError);

  var _super = _createSuper(HttpError);

  function HttpError() {
    classCallCheck._classCallCheck(this, HttpError);

    return _super.apply(this, arguments);
  }

  return HttpError;
}(FormErrors.BaseError);
var HttpMethodNotAllowedError = /*#__PURE__*/function (_HttpError) {
  FormErrors._inherits(HttpMethodNotAllowedError, _HttpError);

  var _super2 = _createSuper(HttpMethodNotAllowedError);

  function HttpMethodNotAllowedError() {
    classCallCheck._classCallCheck(this, HttpMethodNotAllowedError);

    return _super2.apply(this, arguments);
  }

  return HttpMethodNotAllowedError;
}(HttpError);

var GET = 'GET';
var POST = 'POST';
var HTTP_STATUS_OK = 200;
var HTTP_STATUS_BAD_REQUEST = 400;
var HTTP_STATUS_UNAUTHORIZED = 401;
var HTTP_STATUS_FORBIDDEN = 403;
var HTTP_STATUS_METHOD_NOT_ALLOWED = 405;
var HTTP_STATUS_INTERNAL_SERVER_ERROR = 500;
var validateRequest = function validateRequest(req, res, options) {
  var allowedMethods = options.allowedMethods;

  if (!allowedMethods.includes(req.method.toUpperCase())) {
    res.setHeader('Allow', allowedMethods.join(', '));
    throw new HttpMethodNotAllowedError('Method not allowed');
  }
};
var httpResponse = function httpResponse(res, status, data) {
  res.status(status).json(data);
  res.end();
}; // 200

var httpOKResponse = function httpOKResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_OK, data);
}; // 400

var httpBadRequestResponse = function httpBadRequestResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_BAD_REQUEST, data);
}; // 401

var httpUnauthorizedResponse = function httpUnauthorizedResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_UNAUTHORIZED, data);
}; // 403

var httpForbiddenResponse = function httpForbiddenResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_FORBIDDEN, data);
}; // 405

var httpMethodNotAllowedResponse = function httpMethodNotAllowedResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_METHOD_NOT_ALLOWED, data);
}; // 500

var httpInternalServerErrorResponse = function httpInternalServerErrorResponse(res, data) {
  return httpResponse(res, HTTP_STATUS_INTERNAL_SERVER_ERROR, data);
};

exports.GET = GET;
exports.HTTP_STATUS_BAD_REQUEST = HTTP_STATUS_BAD_REQUEST;
exports.HTTP_STATUS_FORBIDDEN = HTTP_STATUS_FORBIDDEN;
exports.HTTP_STATUS_INTERNAL_SERVER_ERROR = HTTP_STATUS_INTERNAL_SERVER_ERROR;
exports.HTTP_STATUS_METHOD_NOT_ALLOWED = HTTP_STATUS_METHOD_NOT_ALLOWED;
exports.HTTP_STATUS_OK = HTTP_STATUS_OK;
exports.HTTP_STATUS_UNAUTHORIZED = HTTP_STATUS_UNAUTHORIZED;
exports.HttpError = HttpError;
exports.HttpMethodNotAllowedError = HttpMethodNotAllowedError;
exports.POST = POST;
exports.httpBadRequestResponse = httpBadRequestResponse;
exports.httpForbiddenResponse = httpForbiddenResponse;
exports.httpInternalServerErrorResponse = httpInternalServerErrorResponse;
exports.httpMethodNotAllowedResponse = httpMethodNotAllowedResponse;
exports.httpOKResponse = httpOKResponse;
exports.httpResponse = httpResponse;
exports.httpUnauthorizedResponse = httpUnauthorizedResponse;
exports.validateRequest = validateRequest;
