'use strict';

// Page routes
var homeRoute = function homeRoute() {
  return '/home';
};
var indexRoute = function indexRoute() {
  return '/';
};
var loginRoute = function loginRoute() {
  return '/login';
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
var privacyRoute = function privacyRoute() {
  return '/privacy';
};
var signupRoute = function signupRoute() {
  return '/signup';
};
var resetRoute = function resetRoute() {
  return '/reset';
};
var settingsRoute = function settingsRoute() {
  return '/settings';
};
var settingsSecurityRoute = function settingsSecurityRoute() {
  return '/settings/security';
};
var termsRoute = function termsRoute() {
  return '/terms';
};
var loginRouteWithNext = function loginRouteWithNext() {
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = loginRoute();
  var excludedNextRoutes = [logoutRoute()];

  if (!excludedNextRoutes.includes(pathname)) {
    var encodedNext = encodeURIComponent("".concat(pathname).concat(search));
    href = "".concat(href, "?next=").concat(encodedNext);
  }

  return href;
}; // API routes

var loginAPIRoute = function loginAPIRoute() {
  return '/api/login';
};
var logoutAPIRoute = function logoutAPIRoute() {
  return '/api/logout';
};
var onboardingAPIRoute = function onboardingAPIRoute() {
  return '/api/onboarding';
};
var resetAPIRoute = function resetAPIRoute() {
  return '/api/reset';
};
var sessionAPIRoute = function sessionAPIRoute() {
  return '/api/session';
};
var signupAPIRoute = function signupAPIRoute() {
  return '/api/signup';
};

exports.homeRoute = homeRoute;
exports.indexRoute = indexRoute;
exports.loginAPIRoute = loginAPIRoute;
exports.loginRoute = loginRoute;
exports.loginRouteWithNext = loginRouteWithNext;
exports.logoutAPIRoute = logoutAPIRoute;
exports.logoutRoute = logoutRoute;
exports.magicLoginRoute = magicLoginRoute;
exports.onboardingAPIRoute = onboardingAPIRoute;
exports.onboardingRoute = onboardingRoute;
exports.privacyRoute = privacyRoute;
exports.resetAPIRoute = resetAPIRoute;
exports.resetRoute = resetRoute;
exports.sessionAPIRoute = sessionAPIRoute;
exports.settingsRoute = settingsRoute;
exports.settingsSecurityRoute = settingsSecurityRoute;
exports.signupAPIRoute = signupAPIRoute;
exports.signupRoute = signupRoute;
exports.termsRoute = termsRoute;
