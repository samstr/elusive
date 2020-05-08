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
export const verifyEmailRoute = (id) => ({
  href: '/verify/[id]',
  asPath: `/verify/${id}`,
});

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
export const apiSessionRoute = () => '/api/session';
export const apiRegisterRoute = () => '/api/register';
export const apiLoginRoute = () => '/api/login';
export const apiLogoutRoute = () => '/api/logout';
export const apiResetPasswordRequestRoute = () => '/api/reset-password-request';
export const apiResetPasswordConfirmRoute = () => '/api/reset-password-confirm';
