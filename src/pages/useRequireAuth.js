import { useRouter } from 'next/router';
import { useEffect } from 'react';

import { useSessionContext } from '../contexts';
import { loginRouteWithNext } from '../routes';

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
