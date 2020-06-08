import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AuthPage, LogoutForm, useAuthPageStyles } from '../components';
import { useSession } from '../hooks';
import { indexRoute, loginRoute } from '../routes';

const LogoutPage = () => {
  const session = useSession();
  const router = useRouter();
  const classes = useAuthPageStyles();

  useEffect(() => {
    if (session._ready && !session.isAuthenticated) {
      router.replace(loginRoute());
    }
  }, [session]);

  const onSuccess = () => {
    window.location = indexRoute();
  };

  return (
    <AuthPage title="Logout">
      <div className={classes.intro}>Are you sure you want to logout?</div>
      <div className={classes.form}>
        <LogoutForm onSuccess={onSuccess} />
      </div>
    </AuthPage>
  );
};

export default LogoutPage;
