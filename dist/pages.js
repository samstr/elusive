'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./classCallCheck-d2bb402f.js');
require('./index-6c0d18da.js');
require('./defineProperty-ba7cd53d.js');
require('./index.js');
require('./runtime-23611726.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('react-bootstrap');
require('./FormErrors-9579dce8.js');
var SessionContext = require('./SessionContext-859ea7a9.js');
require('jsonwebtoken');
var router = require('next/router');
var utils = require('./utils-f7e1f820.js');

var useRedirect = function useRedirect(href, asPath) {
  var router$1 = router.useRouter();
  React.useEffect(function () {
    router$1.replace(href, asPath);
  }, []);
};

var useRequireAuth = function useRequireAuth() {
  var router$1 = router.useRouter();

  var _useSessionContext = SessionContext.useSessionContext(),
      sessionContext = _useSessionContext.sessionContext;

  React.useEffect(function () {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router$1.replace(utils.loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

exports.useRedirect = useRedirect;
exports.useRequireAuth = useRequireAuth;
