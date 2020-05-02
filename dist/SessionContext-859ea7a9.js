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
var SessionContextProvider = function SessionContextProvider(_ref) {
  var children = _ref.children;

  var _useState = React.useState(defaultValue),
      sessionContext = _useState[0],
      setSessionContext = _useState[1];

  var resetSessionContext = function resetSessionContext() {
    setSessionContext(defaultValue);
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

exports.SessionContext = SessionContext;
exports.SessionContextProvider = SessionContextProvider;
exports.useSessionContext = useSessionContext;
