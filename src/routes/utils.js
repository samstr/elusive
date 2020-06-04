// Page routes
export const loginRoute = () => '/login';
export const autoLoginRoute = (id) => ({
  href: `${loginRoute()}/[id]`,
  asPath: `${loginRoute()}/${id}`,
});
export const helpRoute = () => '/help';
export const homeRoute = () => '/home';
export const indexRoute = () => '/';
export const logoutRoute = () => '/logout';
export const messagesRoute = () => '/messages';
export const notificationsRoute = () => '/notifications';
export const onboardingRoute = () => '/onboarding';
export const privacyRoute = () => '/privacy';
export const profileRoute = (username) => ({
  href: `/[username]`,
  asPath: `/${username}`,
});
export const resetRoute = () => '/reset';
export const settingsRoute = () => '/settings';
export const settingsProfileRoute = () => '/settings/profile';
export const settingsAccountRoute = () => '/settings/account';
export const signupRoute = () => '/signup';
export const termsRoute = () => '/terms';

// Route utils
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
