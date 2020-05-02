'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./classCallCheck-d2bb402f.js');
var client = require('./index-6c0d18da.js');
require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');

var loginRouteWithNext = function loginRouteWithNext() {
  var routeOptions = index.options.routes;
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = routeOptions.login();

  if (pathname !== routeOptions.logout()) {
    var encodedNext = encodeURIComponent("".concat(pathname).concat(search));
    href = "".concat(href, "?next=").concat(encodedNext);
  }

  return href;
};

exports.apiSessionRoute = client.apiSessionRoute;
exports.loginRoute = client.loginRoute;
exports.logoutRoute = client.logoutRoute;
exports.loginRouteWithNext = loginRouteWithNext;
