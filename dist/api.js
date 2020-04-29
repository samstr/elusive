'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./wrapNativeSuper-b3646a2a.js');
require('./index-7bceb5aa.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var Sentry = require('@sentry/node');
var errors = require('./errors-a41e2d55.js');
require('react');
require('prop-types');
require('react-bootstrap');
require('./FormErrors-8aabc0ca.js');
var utils = require('./utils-f44fe69c.js');
var utils$1 = require('./utils-4c2c466b.js');
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

          if (sentry && sentry.dsn) {
            Sentry.init({
              dsn: sentry.dsn
            });
          }

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
          _context.prev = 5;
          utils.validateRequest(req, res, options);

          if (!options.useSession) {
            _context.next = 11;
            break;
          }

          _context.next = 10;
          return index$1._regeneratorRuntime.awrap(utils$1.validateSession(req, res));

        case 10:
          props.session = _context.sent;

        case 11:
          _context.t0 = _objectSpread;
          _context.t1 = {};
          _context.t2 = props;
          _context.t3 = {};
          _context.next = 17;
          return index$1._regeneratorRuntime.awrap(fn(props));

        case 17:
          _context.t4 = _context.sent;
          props = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);
          return _context.abrupt("return", res.json(props));

        case 22:
          _context.prev = 22;
          _context.t5 = _context["catch"](5);
          console.log('we caught an error', _context.t5);

          if (!(_context.t5 instanceof utils.HttpError)) {
            _context.next = 28;
            break;
          }

          if (!(_context.t5 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 28;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, errorMessage(_context.t5.message)));

        case 28:
          if (!(_context.t5 instanceof utils$1.SessionError)) {
            _context.next = 31;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpForbiddenResponse(res, errorMessage('There was a problem with your session. Please log in again.')));

        case 31:
          if (!(_context.t5 instanceof errors.BaseError)) {
            _context.next = 33;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, errorMessage(_context.t5.message)));

        case 33:
          console.error('error in apiWrapper:', _context.t5);

          if (sentry && sentry.dsn) {
            console.log('sending to Sentry');
            Sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, errorMessage('An unknown error occured.')));

        case 36:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 22]], Promise);
};

exports.apiWrapper = apiWrapper;
