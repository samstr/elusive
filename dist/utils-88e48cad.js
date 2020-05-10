'use strict';

// Page routes
var indexRoute = function indexRoute() {
  return '/';
};
var registerRoute = function registerRoute() {
  return '/signup';
};
var loginRoute = function loginRoute() {
  return '/login';
};
var logoutRoute = function logoutRoute() {
  return '/logout';
};
var resetPasswordRequestRoute = function resetPasswordRequestRoute() {
  return '/reset';
};
var resetPasswordConfirmRoute = function resetPasswordConfirmRoute(id) {
  return {
    href: '/reset/[id]',
    asPath: "/reset/".concat(id)
  };
};
var onboardingRoute = function onboardingRoute() {
  return '/welcome';
};
var loginRouteWithNext = function loginRouteWithNext() {
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = loginRoute();

  if (pathname !== logoutRoute()) {
    var encodedNext = encodeURIComponent("".concat(pathname).concat(search));
    href = "".concat(href, "?next=").concat(encodedNext);
  }

  return href;
}; // API routes

var sessionAPIRoute = function sessionAPIRoute() {
  return '/api/session';
};
var registerAPIRoute = function registerAPIRoute() {
  return '/api/register';
};
var loginAPIRoute = function loginAPIRoute() {
  return '/api/login';
};
var logoutAPIRoute = function logoutAPIRoute() {
  return '/api/logout';
};
var resetPasswordRequestAPIRoute = function resetPasswordRequestAPIRoute() {
  return '/api/reset-password-request';
};
var resetPasswordConfirmAPIRoute = function resetPasswordConfirmAPIRoute() {
  return '/api/reset-password-confirm';
};

exports.indexRoute = indexRoute;
exports.loginAPIRoute = loginAPIRoute;
exports.loginRoute = loginRoute;
exports.loginRouteWithNext = loginRouteWithNext;
exports.logoutAPIRoute = logoutAPIRoute;
exports.logoutRoute = logoutRoute;
exports.onboardingRoute = onboardingRoute;
exports.registerAPIRoute = registerAPIRoute;
exports.registerRoute = registerRoute;
exports.resetPasswordConfirmAPIRoute = resetPasswordConfirmAPIRoute;
exports.resetPasswordConfirmRoute = resetPasswordConfirmRoute;
exports.resetPasswordRequestAPIRoute = resetPasswordRequestAPIRoute;
exports.resetPasswordRequestRoute = resetPasswordRequestRoute;
exports.sessionAPIRoute = sessionAPIRoute;
