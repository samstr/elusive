import { loginRouteWithNext } from '../routes';
import { useSessionContext } from '../sessions';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

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
