'use strict';

// Page routes
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
var onboardingPasswordRoute = function onboardingPasswordRoute() {
  return '/onboarding/password';
};
var onboardingNameRoute = function onboardingNameRoute() {
  return '/onboarding/name';
};
var onboardingProfilePictureRoute = function onboardingProfilePictureRoute() {
  return '/onboarding/profile-picture';
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
};
var loginRouteWithNext = function loginRouteWithNext() {
  var _window$location = window.location,
      pathname = _window$location.pathname,
      search = _window$location.search;
  var href = loginRoute();
  var excludedNextRoutes = [logoutRoute(), onboardingRoute(), onboardingProfilePictureRoute(), onboardingNameRoute(), onboardingPasswordRoute()];

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
var onboardingPasswordAPIRoute = function onboardingPasswordAPIRoute() {
  return '/api/onboarding/password';
};
var onboardingNameAPIRoute = function onboardingNameAPIRoute() {
  return '/api/onboarding/name';
};
var onboardingProfilePictureAPIRoute = function onboardingProfilePictureAPIRoute() {
  return '/api/onboarding/profile-picture';
};
var registerAPIRoute = function registerAPIRoute() {
  return '/api/register';
};
var resetPasswordConfirmAPIRoute = function resetPasswordConfirmAPIRoute() {
  return '/api/reset/confirm';
};
var resetPasswordRequestAPIRoute = function resetPasswordRequestAPIRoute() {
  return '/api/reset/request';
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
exports.onboardingNameAPIRoute = onboardingNameAPIRoute;
exports.onboardingNameRoute = onboardingNameRoute;
exports.onboardingPasswordAPIRoute = onboardingPasswordAPIRoute;
exports.onboardingPasswordRoute = onboardingPasswordRoute;
exports.onboardingProfilePictureAPIRoute = onboardingProfilePictureAPIRoute;
exports.onboardingProfilePictureRoute = onboardingProfilePictureRoute;
exports.onboardingRoute = onboardingRoute;
exports.registerAPIRoute = registerAPIRoute;
exports.registerRoute = registerRoute;
exports.resetPasswordConfirmAPIRoute = resetPasswordConfirmAPIRoute;
exports.resetPasswordConfirmRoute = resetPasswordConfirmRoute;
exports.resetPasswordRequestAPIRoute = resetPasswordRequestAPIRoute;
exports.resetPasswordRequestRoute = resetPasswordRequestRoute;
exports.sessionAPIRoute = sessionAPIRoute;
exports.termsRoute = termsRoute;
