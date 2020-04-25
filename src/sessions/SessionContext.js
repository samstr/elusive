import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const defaultValue = {
  isAuthenticated: false,
  claims: null,
};

export const SessionContext = createContext(defaultValue);

export const SessionProvider = ({ children }) => {
  const [session, setSession] = useState(defaultValue);
  session.setSession = setSession;

  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useSession = () => useContext(SessionContext);
