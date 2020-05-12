// Page routes
export const homeRoute = () => '/home';
export const indexRoute = () => '/';
export const loginRoute = () => '/login';
export const logoutRoute = () => '/logout';
export const magicLoginRoute = (id) => ({
  href: '/login/[id]',
  asPath: `/login/${id}`,
});
export const onboardingRoute = () => '/onboarding';
export const signupRoute = () => '/signup';
export const resetRoute = () => '/reset';
export const termsRoute = () => '/terms';

export const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = loginRoute();

  const excludedNextRoutes = [logoutRoute(), onboardingRoute()];

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
