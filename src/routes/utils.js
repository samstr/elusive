// Page routes
export const indexRoute = () => '/';
export const loginRoute = () => '/login';
export const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = loginRoute();

  if (pathname !== logoutRoute()) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};
export const logoutRoute = () => '/logout';
export const magicLoginRoute = (id) => ({
  href: '/login/[id]',
  asPath: `/login/${id}`,
});
export const onboardingRoute = () => '/onboarding';
export const onboardingPasswordRoute = () => '/onboarding/password';
export const onboardingNameRoute = () => '/onboarding/name';
export const onboardingPictureRoute = () => '/onboarding/picture';

export const registerRoute = () => '/signup';
export const resetPasswordConfirmRoute = (id) => ({
  href: '/reset/[id]',
  asPath: `/reset/${id}`,
});
export const resetPasswordRequestRoute = () => '/reset';
export const termsRoute = () => '/terms';

// API routes
export const loginAPIRoute = () => '/api/login';
export const logoutAPIRoute = () => '/api/logout';
export const registerAPIRoute = () => '/api/register';
export const resetPasswordConfirmAPIRoute = () => '/api/reset-password-confirm';
export const resetPasswordRequestAPIRoute = () => '/api/reset-password-request';
export const sessionAPIRoute = () => '/api/session';
