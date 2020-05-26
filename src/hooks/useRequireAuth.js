import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { loginRouteWithNext } from '../routes';

import useSessionContext from './useSessionContext';

const useRequireAuth = () => {
  const router = useRouter();
  const { sessionContext } = useSessionContext();

  useEffect(() => {
    if (sessionContext._ready && !sessionContext.isAuthenticated) {
      router.replace(loginRouteWithNext());
    }
  }, [sessionContext._ready]);
};

export default useRequireAuth;
