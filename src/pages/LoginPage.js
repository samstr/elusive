import React, { useEffect } from 'react';

import Elusive from '../';
import { AuthPage, Link, LoginForm, useAuthPageStyles } from '../components';
import { useSession } from '../hooks';
import { homeRoute, resetRoute } from '../routes';

const LoginPage = () => {
  const session = useSession();
  const classes = useAuthPageStyles();
  const { site: siteOptions } = Elusive.options;

  useEffect(() => {
    if (session._ready && session.isAuthenticated) {
      router.replace(homeRoute());
    }
  }, [session]);

  const onSuccess = () => {
    let next = homeRoute();
    if (router.query.next) {
      next = decodeURIComponent(router.query.next);
    }
    window.location = next;
  };

  return (
    <AuthPage title={`Login to ${siteOptions.name}`}>
      <div className={classes.form}>
        <LoginForm onSuccess={onSuccess} />
      </div>
      <div className={classes.footer}>
        <Link href={resetRoute()}>Forgot your password?</Link>
      </div>
    </AuthPage>
  );
};

export default LoginPage;
