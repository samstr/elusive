import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const defaultValue = {
  isAuthenticated: false,
  claims: null,
};

export const SessionContext = createContext(defaultValue);

export const SessionContextProvider = ({ children }) => {
  const [sessionContext, setSessionContext] = useState(defaultValue);

  const resetSessionContext = () => {
    setSessionContext(defaultValue);
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
