// Page routes
export const indexRoute = () => '/';
export const registerRoute = () => '/signup';
export const loginRoute = () => '/login';
export const logoutRoute = () => '/logout';
export const resetPasswordRequestRoute = () => '/reset';
export const resetPasswordConfirmRoute = (id) => ({
  href: '/reset/[id]',
  asPath: `/reset/${id}`,
});
export const onboardingRoute = () => '/welcome';

export const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = loginRoute();

  if (pathname !== logoutRoute()) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};

// API routes
export const sessionAPIRoute = () => '/api/session';
export const registerAPIRoute = () => '/api/register';
export const loginAPIRoute = () => '/api/login';
export const logoutAPIRoute = () => '/api/logout';
export const resetPasswordRequestAPIRoute = () => '/api/reset-password-request';
export const resetPasswordConfirmAPIRoute = () => '/api/reset-password-confirm';
