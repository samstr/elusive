'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./wrapNativeSuper-b3646a2a.js');
require('./index-4b16c673.js');
var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');
var Sentry = require('@sentry/node');
var FormErrors = require('./FormErrors-a91e4b79.js');
require('react');
require('prop-types');
require('react-bootstrap');
var utils = require('./utils-6d62d4cd.js');
var utils$1 = require('./utils-81a30b6c.js');
require('./SessionContext-af7ae771.js');
require('bcryptjs');
require('jsonwebtoken');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var apiWrapper = function apiWrapper(req, res, fn, options) {
  var sentry, defaultOptions, props;
  return index$1._regeneratorRuntime.async(function apiWrapper$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          sentry = index.options.sentry;

          if (sentry && sentry.dsn) {
            Sentry.init({
              dsn: sentry.dsn,
              enabled: sentry.enabled
            });
          }

          defaultOptions = {
            allowedMethods: [utils.GET],
            requireAuth: false,
            useSession: false
          };
          options = _objectSpread({}, defaultOptions, {}, options);
          _context.prev = 4;
          utils.validateRequest(req, res, options);
          props = {};

          if (!options.useSession) {
            _context.next = 13;
            break;
          }

          _context.next = 10;
          return index$1._regeneratorRuntime.awrap(utils$1.validateSession(req, res));

        case 10:
          props.session = _context.sent;

          if (!(options.requireAuth && !props.session.isAuthenticated)) {
            _context.next = 13;
            break;
          }

          return _context.abrupt("return", utils.httpForbiddenResponse(res, FormErrors.errorJson(new Error('You do not have access to view this page.'))));

        case 13:
          _context.t0 = _objectSpread;
          _context.t1 = {};
          _context.t2 = props;
          _context.t3 = {};
          _context.next = 19;
          return index$1._regeneratorRuntime.awrap(fn(_objectSpread({}, props, {
            req: req,
            res: res
          })));

        case 19:
          _context.t4 = _context.sent;
          props = (0, _context.t0)(_context.t1, _context.t2, _context.t3, _context.t4);

          if (!(props.errors && props.errors.length)) {
            _context.next = 23;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(props.errors)));

        case 23:
          return _context.abrupt("return", res.json(props));

        case 26:
          _context.prev = 26;
          _context.t5 = _context["catch"](4);

          if (!(_context.t5 instanceof utils.HttpError)) {
            _context.next = 31;
            break;
          }

          if (!(_context.t5 instanceof utils.HttpMethodNotAllowedError)) {
            _context.next = 31;
            break;
          }

          return _context.abrupt("return", utils.httpMethodNotAllowedResponse(res, FormErrors.errorJson(_context.t5)));

        case 31:
          if (!(_context.t5 instanceof utils$1.SessionError)) {
            _context.next = 34;
            break;
          }

          utils$1.deleteSessionCookies(res);
          return _context.abrupt("return", utils.httpUnauthorizedResponse(res, FormErrors.errorJson(_context.t5)));

        case 34:
          if (!(_context.t5 instanceof FormErrors.BaseError)) {
            _context.next = 36;
            break;
          }

          return _context.abrupt("return", utils.httpBadRequestResponse(res, FormErrors.errorJson(_context.t5)));

        case 36:
          console.error('error in apiWrapper:', _context.t5);

          if (sentry && sentry.dsn) {
            console.log('sending to Sentry');
            Sentry.captureException(_context.t5);
          }

          return _context.abrupt("return", utils.httpInternalServerErrorResponse(res, FormErrors.errorJson(new Error('An unknown error occured.'))));

        case 39:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[4, 26]], Promise);
};

exports.apiWrapper = apiWrapper;
