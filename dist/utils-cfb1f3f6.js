'use strict';

// Page routes
var indexRoute = function indexRoute() {
  return '/';
};
var loginRoute = function loginRoute() {
  return '/login';
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
};
var logoutRoute = function logoutRoute() {
  return '/logout';
};
var magicLoginRoute = function magicLoginRoute(id) {
  return {
    href: '/login/[id]',
    asPath: "/login/".concat(id)
  };
};
var onboardingRoute = function onboardingRoute() {
  return '/onboarding';
};
var registerRoute = function registerRoute() {
  return '/signup';
};
var resetPasswordConfirmRoute = function resetPasswordConfirmRoute(id) {
  return {
    href: '/reset/[id]',
    asPath: "/reset/".concat(id)
  };
};
var resetPasswordRequestRoute = function resetPasswordRequestRoute() {
  return '/reset';
};
var termsRoute = function termsRoute() {
  return '/terms';
}; // API routes

var loginAPIRoute = function loginAPIRoute() {
  return '/api/login';
};
var logoutAPIRoute = function logoutAPIRoute() {
  return '/api/logout';
};
var registerAPIRoute = function registerAPIRoute() {
  return '/api/register';
};
var resetPasswordConfirmAPIRoute = function resetPasswordConfirmAPIRoute() {
  return '/api/reset-password-confirm';
};
var resetPasswordRequestAPIRoute = function resetPasswordRequestAPIRoute() {
  return '/api/reset-password-request';
};
var sessionAPIRoute = function sessionAPIRoute() {
  return '/api/session';
};

exports.indexRoute = indexRoute;
exports.loginAPIRoute = loginAPIRoute;
exports.loginRoute = loginRoute;
exports.loginRouteWithNext = loginRouteWithNext;
exports.logoutAPIRoute = logoutAPIRoute;
exports.logoutRoute = logoutRoute;
exports.magicLoginRoute = magicLoginRoute;
exports.onboardingRoute = onboardingRoute;
exports.registerAPIRoute = registerAPIRoute;
exports.registerRoute = registerRoute;
exports.resetPasswordConfirmAPIRoute = resetPasswordConfirmAPIRoute;
exports.resetPasswordConfirmRoute = resetPasswordConfirmRoute;
exports.resetPasswordRequestAPIRoute = resetPasswordRequestAPIRoute;
exports.resetPasswordRequestRoute = resetPasswordRequestRoute;
exports.sessionAPIRoute = sessionAPIRoute;
exports.termsRoute = termsRoute;
