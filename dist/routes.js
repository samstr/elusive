'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

require('./wrapNativeSuper-b3646a2a.js');
require('./index-4b16c673.js');
require('./defineProperty-ba7cd53d.js');
var index = require('./index.js');

var loginRouteWithNext = function loginRouteWithNext() {
  var routes = index.options.routes;
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = routes.login();

  if (pathname !== routes.logout()) {
    var encodedNext = encodeURIComponent("".concat(pathname).concat(search));
    href = "".concat(href, "?next=").concat(encodedNext);
  }

  return href;
};

exports.loginRouteWithNext = loginRouteWithNext;
