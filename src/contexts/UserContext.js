import PropTypes from 'prop-types';
import React, { createContext, useState } from 'react';

const defaultValue = null;

export const UserContext = createContext(defaultValue);

export const UserContextProvider = ({ children }) => {
  const [userContext, setUserContext] = useState(defaultValue);

  const resetUserContext = () => setUserContext(defaultValue);

  const context = {
    userContext,
    setUserContext,
    resetUserContext,
  };

  return (
    <UserContext.Provider value={context}>{children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
