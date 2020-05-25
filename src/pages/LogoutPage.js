import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AuthBasePage, LogoutForm } from '../components';
import { indexRoute, loginRoute } from '../routes';

import useSession from './useSession';

const LogoutPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session._ready && !session.isAuthenticated) {
      router.replace(loginRoute());
    }
  }, [session]);

  const onSuccess = () => {
    window.location = indexRoute();
  };

  return (
    <AuthBasePage>
      <h1>Logout</h1>
      <div className="intro">Are sure you want to logout?</div>
      <div className="form">
        <LogoutForm onSuccess={onSuccess} />
      </div>
    </AuthBasePage>
  );
};

export default LogoutPage;
