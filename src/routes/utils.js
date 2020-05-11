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
export const onboardingPasswordRoute = () => '/onboarding/password';
export const onboardingNameRoute = () => '/onboarding/name';
export const onboardingProfilePictureRoute = () =>
  '/onboarding/profile-picture';

export const registerRoute = () => '/signup';
export const resetPasswordConfirmRoute = (id) => ({
  href: '/reset/[id]',
  asPath: `/reset/${id}`,
});
export const resetPasswordRequestRoute = () => '/reset';
export const termsRoute = () => '/terms';

export const loginRouteWithNext = () => {
  const { pathname, search } = window.location;
  let href = loginRoute();

  const excludedNextRoutes = [
    logoutRoute(),
    onboardingRoute(),
    onboardingProfilePictureRoute(),
    onboardingNameRoute(),
    onboardingPasswordRoute(),
  ];

  if (!excludedNextRoutes.includes(pathname)) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};

// API routes
export const loginAPIRoute = () => '/api/login';
export const logoutAPIRoute = () => '/api/logout';
export const onboardingPasswordAPIRoute = () => '/api/onboarding/password';
export const onboardingNameAPIRoute = () => '/api/onboarding/name';
export const onboardingProfilePictureAPIRoute = () =>
  '/api/onboarding/profile-picture';
export const registerAPIRoute = () => '/api/register';
export const resetPasswordConfirmAPIRoute = () => '/api/reset/confirm';
export const resetPasswordRequestAPIRoute = () => '/api/reset/request';
export const sessionAPIRoute = () => '/api/session';
