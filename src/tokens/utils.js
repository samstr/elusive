import jwt, { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

import Elusive from '../';

export const signToken = (claims, secret, expiryMins) =>
  jwt.sign(claims, secret, {
    expiresIn: expiryMins * 60,
  });

export const signTokens = (claims, secret) => {
  const { tokens: tokenOptions } = Elusive.options;

  // delete these if they exist. not needed
  delete claims.iat;
  delete claims.exp;

  return {
    access: signToken(claims, secret, tokenOptions.accessTokenExpiryMins),
    refresh: signToken(claims, secret, tokenOptions.refreshTokenExpiryMins),
  };
};

export const getClaims = (token, secret) => {
  try {
    const claims = jwt.verify(token, secret);
    return { claims };
  } catch (err) {
    if (err instanceof TokenExpiredError) {
      return { expired: true };
    } else if (err instanceof JsonWebTokenError) {
      return { invalid: true };
    }

    throw err;
  }
};
