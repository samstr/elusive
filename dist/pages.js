'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var routes = require('elusive/routes');
var sessions = require('elusive/sessions');
var router = require('next/router');

var useRequireAuth = function useRequireAuth() {
  var router$1 = router.useRouter();

  var _useSessionContext = sessions.useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(routes.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

exports.useRequireAuth = useRequireAuth;
