'use strict';

var apiSessionRoute = function apiSessionRoute() {
  return '/api/session';
};
var loginRoute = function loginRoute() {
  return '/login';
};
var logoutRoute = function logoutRoute() {
  return '/logout';
};

exports.apiSessionRoute = apiSessionRoute;
exports.loginRoute = loginRoute;
exports.logoutRoute = logoutRoute;
