'use strict';

var defineProperty = require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');
var asyncToGenerator = require('./asyncToGenerator-7a28bf2e.js');

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { defineProperty._defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var defaultDynamicTemplateData = function defaultDynamicTemplateData(req) {
  var siteOptions = index.options.site;
  var baseURL = "".concat(process.env.NODE_ENV === 'production' ? 'https' : 'http', "://").concat(req.headers.host);
  return {
    baseURL: baseURL,
    siteName: siteOptions.name
  };
};
var sendMail = /*#__PURE__*/function () {
  var _ref = asyncToGenerator._asyncToGenerator( /*#__PURE__*/asyncToGenerator.regenerator.mark(function _callee(message) {
    var _Elusive$services, sendgrid, sentry, mailOptions, _err$response, _err$response$body, _err$response2, _err$response2$body;

    return asyncToGenerator.regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _Elusive$services = index.services, sendgrid = _Elusive$services.sendgrid, sentry = _Elusive$services.sentry;
            mailOptions = index.options.mail;
            message = _objectSpread(_objectSpread({}, message), {}, {
              from: {
                email: mailOptions.fromEmail,
                name: mailOptions.fromName
              }
            });

            if (!(process.env.NODE_ENV === 'production' || mailOptions.sendMailOnDevServer)) {
              _context.next = 15;
              break;
            }

            _context.prev = 4;
            _context.next = 7;
            return sendgrid.send(message);

          case 7:
            return _context.abrupt("return", _context.sent);

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](4);
            console.log(_context.t0);

            if ((_err$response = _context.t0.response) === null || _err$response === void 0 ? void 0 : (_err$response$body = _err$response.body) === null || _err$response$body === void 0 ? void 0 : _err$response$body.errors) {
              console.log((_err$response2 = _context.t0.response) === null || _err$response2 === void 0 ? void 0 : (_err$response2$body = _err$response2.body) === null || _err$response2$body === void 0 ? void 0 : _err$response2$body.errors);
            }

            sentry.captureException(_context.t0);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[4, 10]]);
  }));

  return function sendMail(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.defaultDynamicTemplateData = defaultDynamicTemplateData;
exports.sendMail = sendMail;
