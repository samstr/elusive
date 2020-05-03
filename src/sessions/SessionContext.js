import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const defaultValue = {
  isAuthenticated: false,
  claims: null,
  _ready: false,
};

export const SessionContext = createContext(defaultValue);

export const SessionContextProvider = ({ children }) => {
  const [sessionContext, setSessionContext] = useState(defaultValue);

  const resetSessionContext = (_ready) => {
    setSessionContext({
      ...defaultValue,
      _ready,
    });
  };

  const context = {
    sessionContext,
    setSessionContext,
    resetSessionContext,
  };

  return (
    <SessionContext.Provider value={context}>
      {children}
    </SessionContext.Provider>
  );
};

SessionContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSessionContext = () => useContext(SessionContext);
