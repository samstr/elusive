'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var errorResponse = function errorResponse(msg, code) {
  return {
    body: msg || 'Error',
    statusCode: code || 500
  };
};
var successResponse = function successResponse(msg, code) {
  return {
    body: msg || 'Success',
    statusCode: code || 200
  };
};

exports.errorResponse = errorResponse;
exports.successResponse = successResponse;
