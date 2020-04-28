'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./wrapNativeSuper-b3646a2a.js');
require('./index-7bceb5aa.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
require('./index.js');
var index$1 = require('./index-2340470f.js');
var errors = require('./errors-a41e2d55.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('./FormErrors-0bc42a8b.js');
var utils = require('./utils-6b1b613c.js');
var utils$1 = require('./utils-c94c8815.js');
require('./SessionContext-2a34dac4.js');
require('bcryptjs');
require('nookies');
require('jsonwebtoken');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var errorMessage = function errorMessage(message) {
  return {
    errors: [{
      message: message
    }]
  };
};

var apiWrapper = function apiWrapper(req, res, fn, options) {
  var defaultOptions, props;
  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          defaultOptions = {
            allowedMethods: [utils.GET],
            requireAuth: false,
            useSession: false
          };
          options = _objectSpread({}, defaultOptions, {}, options);
          props = {
            req: req,
            res: res
          };
          _context.prev = 3;
          utils.validateRequest(req, res, options);

          if (!options.useSession) {
            _context.next = 9;
            break;
          }

          _context.next = 8;
          return index$1._regeneratorRuntime.awrap(utils$1.validateSession(req, res));

        case 8:
          props.session = _context.sent;

        case 9:
          _context.next = 11;
          return index$1._regeneratorRuntime.awrap(fn(props));

        case 11:
          return _context.abrupt("return", _context.sent);

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);

          if (!(_context.t0 instanceof utils.HttpError)) {
            _context.next = 19;
            break;
          }

          if (!(_context.t0 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 19;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, errorMessage(_context.t0.message)));

        case 19:
          if (!(_context.t0 instanceof utils$1.SessionError)) {
            _context.next = 22;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpForbiddenResponse(res, errorMessage('There was a problem with your session. Please log in again.')));

        case 22:
          if (!(_context.t0 instanceof errors.BaseError)) {
            _context.next = 24;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, errorMessage(_context.t0.message)));

        case 24:
          throw _context.t0;

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 14]], Promise);
};

exports.apiWrapper = apiWrapper;
