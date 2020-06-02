'use strict';

// Page routes
var loginRoute = function loginRoute() {
  return '/login';
};
var autoLoginRoute = function autoLoginRoute(id) {
  return {
    href: "".concat(loginRoute(), "/[id]"),
    asPath: "".concat(loginRoute(), "/").concat(id)
  };
};
var helpRoute = function helpRoute() {
  return '/help';
};
var homeRoute = function homeRoute() {
  return '/home';
};
var indexRoute = function indexRoute() {
  return '/';
};
var logoutRoute = function logoutRoute() {
  return '/logout';
};
var messagesRoute = function messagesRoute() {
  return '/messages';
};
var notificationsRoute = function notificationsRoute() {
  return '/notifications';
};
var onboardingRoute = function onboardingRoute() {
  return '/onboarding';
};
var resetRoute = function resetRoute() {
  return '/reset';
};
var settingsRoute = function settingsRoute() {
  return '/settings';
};
var settingsProfileRoute = function settingsProfileRoute() {
  return '/settings/profile';
};
var settingsAccountRoute = function settingsAccountRoute() {
  return '/settings/account';
};
var termsRoute = function termsRoute() {
  return '/terms';
};
var privacyRoute = function privacyRoute() {
  return '/privacy';
}; // Route utils

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
var userAPIRoute = function userAPIRoute() {
  return '/api/user';
};

exports.autoLoginRoute = autoLoginRoute;
exports.helpRoute = helpRoute;
exports.homeRoute = homeRoute;
exports.indexRoute = indexRoute;
exports.loginAPIRoute = loginAPIRoute;
exports.loginRoute = loginRoute;
exports.loginRouteWithNext = loginRouteWithNext;
exports.logoutAPIRoute = logoutAPIRoute;
exports.logoutRoute = logoutRoute;
exports.messagesRoute = messagesRoute;
exports.notificationsRoute = notificationsRoute;
exports.onboardingAPIRoute = onboardingAPIRoute;
exports.onboardingRoute = onboardingRoute;
exports.privacyRoute = privacyRoute;
exports.resetAPIRoute = resetAPIRoute;
exports.resetRoute = resetRoute;
exports.sessionAPIRoute = sessionAPIRoute;
exports.settingsAccountRoute = settingsAccountRoute;
exports.settingsProfileRoute = settingsProfileRoute;
exports.settingsRoute = settingsRoute;
exports.signupAPIRoute = signupAPIRoute;
exports.termsRoute = termsRoute;
exports.userAPIRoute = userAPIRoute;
