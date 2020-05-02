import Elusive from '../';

export const loginRouteWithNext = () => {
  const { routes: routeOptions } = Elusive.options;

  const { pathname, search } = window.location;
  let href = routeOptions.login();

  if (pathname !== routeOptions.logout()) {
    const encodedNext = encodeURIComponent(`${pathname}${search}`);
    href = `${href}?next=${encodedNext}`;
  }

  return href;
};
