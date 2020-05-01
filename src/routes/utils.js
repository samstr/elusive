import Elusive from '../';

export const loginRouteWithNext = () => {
  const { routes } = Elusive.options;
  const { pathname, search } = window.location;
  let href = routes.login();

  if (pathname !== routes.logout()) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};
