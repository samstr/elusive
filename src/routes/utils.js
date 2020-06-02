// Page routes
export const authRoute = () => '/auth';
export const homeRoute = () => '/home';
export const indexRoute = () => '/';
export const loginRoute = () => '/login';
export const logoutRoute = () => '/logout';
export const magicLoginRoute = (id) => ({
  href: '/login/[id]',
  asPath: `/login/${id}`,
});
export const messagesRoute = () => '/messages';
export const notificationsRoute = () => '/notifications';
export const onboardingRoute = () => '/onboarding';
export const privacyRoute = () => '/privacy';
export const profileRoute = (username) => ({
  href: '/[username]',
  asPath: `/${username}`,
});
export const signupRoute = () => '/signup';
export const resetRoute = () => '/reset';
export const settingsRoute = () => '/settings';
export const settingsAccountRoute = () => '/settings/account';
export const settingsEmailsRoute = () => '/settings/emails';
export const settingsNotificationsRoute = () => '/settings/notifications';
export const settingsProfileRoute = () => '/settings/profile';
export const termsRoute = () => '/terms';

export const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = loginRoute();

  const excludedNextRoutes = [logoutRoute()];

  if (!excludedNextRoutes.includes(pathname)) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};

// API routes
export const loginAPIRoute = () => '/api/login';
export const logoutAPIRoute = () => '/api/logout';
export const onboardingAPIRoute = () => '/api/onboarding';
export const resetAPIRoute = () => '/api/reset';
export const sessionAPIRoute = () => '/api/session';
export const signupAPIRoute = () => '/api/signup';
export const userAPIRoute = () => '/api/user';
