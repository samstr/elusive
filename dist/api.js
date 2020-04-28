'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./wrapNativeSuper-b3646a2a.js');
require('./index-7bceb5aa.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
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
  var sentry, defaultOptions, props;
  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sentry = index.options.sentry;
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
          _context.prev = 4;
          utils.validateRequest(req, res, options);

          if (!options.useSession) {
            _context.next = 10;
            break;
          }

          _context.next = 9;
          return index$1._regeneratorRuntime.awrap(utils$1.validateSession(req, res));

        case 9:
          props.session = _context.sent;

        case 10:
          _context.next = 12;
          return index$1._regeneratorRuntime.awrap(fn(props));

        case 12:
          return _context.abrupt("return", _context.sent);

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](4);
          console.log('we caught an error', _context.t0);

          if (!(_context.t0 instanceof utils.HttpError)) {
            _context.next = 21;
            break;
          }

          if (!(_context.t0 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 21;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, errorMessage(_context.t0.message)));

        case 21:
          if (!(_context.t0 instanceof utils$1.SessionError)) {
            _context.next = 24;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpForbiddenResponse(res, errorMessage('There was a problem with your session. Please log in again.')));

        case 24:
          if (!(_context.t0 instanceof errors.BaseError)) {
            _context.next = 26;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, errorMessage(_context.t0.message)));

        case 26:
          console.error('error in apiWrapper:', _context.t0);
          console.log('sentry is', sentry);

          if (sentry) {
            console.log('capturing it in sentry');
            sentry.captureException(_context.t0);
            console.log('done!');
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, errorMessage('An unknown error occured.')));

        case 30:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 15]], Promise);
};

exports.apiWrapper = apiWrapper;
