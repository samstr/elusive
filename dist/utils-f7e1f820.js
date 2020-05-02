'use strict';

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

exports.loginRouteWithNext = loginRouteWithNext;
