import { Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';

import Elusive from '../';
import { AuthPage, Link, SignupForm, useAuthPageStyles } from '../components';
import { useSession } from '../hooks';
import { homeRoute, loginRoute } from '../routes';

const LoginPage = () => {
  const session = useSession();
  const classes = useAuthPageStyles();
  const [success, setSuccess] = useState();
  const { mail: mailOptions, site: siteOptions } = Elusive.options;

  useEffect(() => {
    if (session._ready && session.isAuthenticated) {
      router.replace(homeRoute());
    }
  }, [session]);

  const onSuccess = () => setSuccess(true);

  return (
    <AuthPage>
      {success ? (
        <>
          <Typography variant="h4" className={classes.title}>
            Login to {siteOptions.name}
          </Typography>
          <div className={classes.intro}>
            <p>Please confirm your email address to get started.</p>
            <p>
              You may need to check your spam folder or whitelist{' '}
              {mailOptions.fromEmail}
            </p>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h4" className={classes.title}>
            Create an account
          </Typography>
          <div className={classes.form}>
            <SignupForm onSuccess={onSuccess} />
          </div>
          <div className={classes.footer}>
            <Link href={loginRoute()}>I already have an account</Link>
          </div>
        </>
      )}
    </AuthPage>
  );
};

export default LoginPage;
