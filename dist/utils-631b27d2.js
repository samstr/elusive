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
var verifyEmailRoute = function verifyEmailRoute(id) {
  return {
    href: '/verify/[id]',
    asPath: "/verify/".concat(id)
  };
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

var apiSessionRoute = function apiSessionRoute() {
  return '/api/session';
};
var apiRegisterRoute = function apiRegisterRoute() {
  return '/api/register';
};
var apiLoginRoute = function apiLoginRoute() {
  return '/api/login';
};
var apiLogoutRoute = function apiLogoutRoute() {
  return '/api/logout';
};
var apiResetPasswordRequestRoute = function apiResetPasswordRequestRoute() {
  return '/api/reset-password-request';
};
var apiResetPasswordConfirmRoute = function apiResetPasswordConfirmRoute() {
  return '/api/reset-password-confirm';
};

exports.apiLoginRoute = apiLoginRoute;
exports.apiLogoutRoute = apiLogoutRoute;
exports.apiRegisterRoute = apiRegisterRoute;
exports.apiResetPasswordConfirmRoute = apiResetPasswordConfirmRoute;
exports.apiResetPasswordRequestRoute = apiResetPasswordRequestRoute;
exports.apiSessionRoute = apiSessionRoute;
exports.indexRoute = indexRoute;
exports.loginRoute = loginRoute;
exports.loginRouteWithNext = loginRouteWithNext;
exports.logoutRoute = logoutRoute;
exports.registerRoute = registerRoute;
exports.resetPasswordConfirmRoute = resetPasswordConfirmRoute;
exports.resetPasswordRequestRoute = resetPasswordRequestRoute;
exports.verifyEmailRoute = verifyEmailRoute;
