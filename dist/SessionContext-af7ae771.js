'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var PropTypes = _interopDefault(require('prop-types'));

var __jsx = React__default.createElement;
var defaultValue = {
  isAuthenticated: false,
  claims: null
};
var SessionContext = React.createContext(defaultValue);
var SessionProvider = function SessionProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      session = _useState[0],
      setSession = _useState[1];

  session.login = setSession;

  session.logout = function () {
    setSession(defaultValue);
  };

  return __jsx(SessionContext.Provider, {
    value: session
  }, children);
};
SessionProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useSession = function useSession() {
  return React.useContext(SessionContext);
};

exports.SessionContext = SessionContext;
exports.SessionProvider = SessionProvider;
exports.useSession = useSession;
