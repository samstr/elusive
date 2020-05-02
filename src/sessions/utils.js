import Elusive from '../';

export const buildSessionCookieString = (name, value, expiryDate) =>
  [
    `${name}=${value}`,
    'path=/',
    'SameSite=Lax',
    `expires=${expiryDate}`,
    'HttpOnly',
    process.env.NODE_ENV === 'production' ? 'Secure;' : null,
  ].join(';');

export const createSessionCookieStrings = (tokens, userId) => {
  const { sessions: options } = Elusive.options;
  const dateFuture = Date.now() + 60000 * options.cookies.expiryMins;
  const expiryDate = new Date(dateFuture).toUTCString();

  return [
    buildSessionCookieString(
      options.cookies.accessTokenName,
      tokens.access,
      expiryDate
    ),
    buildSessionCookieString(
      options.cookies.refreshTokenName,
      tokens.refresh,
      expiryDate
    ),
    buildSessionCookieString(options.cookies.userIdName, userId, expiryDate),
  ];
};

export const createSessionCookies = (res, tokens, userId) => {
  res.setHeader('Set-Cookie', createSessionCookieStrings(tokens, userId));
};

export const deleteSessionCookieStrings = () => {
  const { sessions: options } = Elusive.options;
  const expiryDate = new Date(0).toUTCString(); // set it in the past

  return [
    buildSessionCookieString(options.cookies.accessTokenName, '', expiryDate),
    buildSessionCookieString(options.cookies.refreshTokenName, '', expiryDate),
    buildSessionCookieString(options.cookies.userIdName, '', expiryDate),
  ];
};

export const deleteSessionCookies = (res) => {
  res.setHeader('Set-Cookie', deleteSessionCookieStrings());
};

export const getSession = (accessToken, refreshToken, userId) => {
  return {
    isAuthenticated: false,
    claims: null,
    fromElusive: 'hi',
  };
};
