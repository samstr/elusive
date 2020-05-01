'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('./wrapNativeSuper-b3646a2a.js');
require('./index-4b16c673.js');
require('./defineProperty-ba7cd53d.js');
require('./index.js');
require('./runtime-23611726.js');
var React = require('react');
var React__default = _interopDefault(React);
require('prop-types');
require('react-bootstrap');
require('./FormErrors-9579dce8.js');
var SessionContext = require('./SessionContext-859ea7a9.js');
require('bcryptjs');
require('jsonwebtoken');
var utils = require('./utils-f7119ee5.js');
var router = require('next/router');

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

exports.useRequireAuth = useRequireAuth;
