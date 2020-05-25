'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var PropTypes = _interopDefault(require('prop-types'));
var React = require('react');
var React__default = _interopDefault(React);

var __jsx = React__default.createElement;
var defaultValue = {
  isAuthenticated: false,
  claims: null,
  _ready: false
};
var SessionContext = React.createContext(defaultValue);
var SessionContextProvider = function SessionContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      sessionContext = _useState[0],
      setSessionContext = _useState[1];

  var resetSessionContext = function resetSessionContext() {
    return setSessionContext(defaultValue);
  };

  var context = {
    sessionContext: sessionContext,
    setSessionContext: setSessionContext,
    resetSessionContext: resetSessionContext
  };
  return __jsx(SessionContext.Provider, {
    value: context
  }, children);
};
SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useSessionContext = function useSessionContext() {
  return React.useContext(SessionContext);
};

var __jsx$1 = React__default.createElement;
var defaultValue$1 = null;
var UserContext = React.createContext(defaultValue$1);
var UserContextProvider = function UserContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue$1),
      userContext = _useState[0],
      setUserContext = _useState[1];

  var resetUserContext = function resetUserContext() {
    return setUserContext(defaultValue$1);
  };

  var context = {
    userContext: userContext,
    setUserContext: setUserContext,
    resetUserContext: resetUserContext
  };
  return __jsx$1(UserContext.Provider, {
    value: context
  }, children);
};
UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired
};
var useUserContext = function useUserContext() {
  return React.useContext(UserContext);
};

exports.SessionContext = SessionContext;
exports.SessionContextProvider = SessionContextProvider;
exports.UserContext = UserContext;
exports.UserContextProvider = UserContextProvider;
exports.useSessionContext = useSessionContext;
exports.useUserContext = useUserContext;
