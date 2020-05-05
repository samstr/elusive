'use strict';

var index = require('./index.js');
var index$1 = require('./index-072a3fc5.js');

var defaultDynamicTemplateData = function defaultDynamicTemplateData(req) {
  var baseUrl = "".concat(process.env.NODE_ENV === 'production' ? 'https' : 'http', "://").concat(req.headers.host);
  return {
    baseUrl: baseUrl
  };
};
var sendMail = function sendMail(message) {
  var _Elusive$services, sendgrid, sentry;

  return index$1._regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _Elusive$services = index.services, sendgrid = _Elusive$services.sendgrid, sentry = _Elusive$services.sentry; // XXX if (process.env.NODE_ENV !== 'production') return;

          _context.prev = 1;
          _context.next = 4;
          return index$1._regeneratorRuntime.awrap(sendgrid.send(message));

        case 4:
          return _context.abrupt("return", _context.sent);

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          sentry.captureException(_context.t0);

        case 10:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7]], Promise);
};

exports.defaultDynamicTemplateData = defaultDynamicTemplateData;
exports.sendMail = sendMail;
