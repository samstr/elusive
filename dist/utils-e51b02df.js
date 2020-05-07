'use strict';

var client = require('./index-7c1a0ac8.js');
var index = require('./index.js');
var index$1 = require('./index-2340470f.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { client._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultDynamicTemplateData = function defaultDynamicTemplateData(req) {
  var baseURL = "".concat(process.env.NODE_ENV === 'production' ? 'https' : 'http', "://").concat(req.headers.host);
  return {
    baseURL: baseURL
  };
};
var sendMail = function sendMail(message) {
  var _Elusive$services, sendgrid, sentry, mailOptions;

  return index$1._regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$services = index.services, sendgrid = _Elusive$services.sendgrid, sentry = _Elusive$services.sentry;
          mailOptions = index.options.mail;
          message = _objectSpread({}, message, {
            from: {
              email: mailOptions.fromEmail,
              name: mailOptions.fromName
            }
          });

          if (!(process.env.NODE_ENV !== 'production')) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          _context.prev = 5;
          _context.next = 8;
          return index$1._regeneratorRuntime.awrap(sendgrid.send(message));

        case 8:
          return _context.abrupt("return", _context.sent);

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](5);
          sentry.captureException(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[5, 11]], Promise);
};

exports.defaultDynamicTemplateData = defaultDynamicTemplateData;
exports.sendMail = sendMail;
