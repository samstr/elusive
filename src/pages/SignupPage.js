import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Elusive from '../';
import { homeRoute, loginRoute } from '../routes';
import { AuthBasePage, SignupForm } from '../components';

import useSession from './useSession';

const SignupPage = () => {
  const router = useRouter();
  const session = useSession();
  const { mail: mailOptions } = Elusive.options;

  useEffect(() => {
    if (session._ready && session.isAuthenticated) {
      router.replace(homeRoute());
    }
  }, [session]);

  const [success, setSuccess] = useState();

  const onSuccess = () => setSuccess(true);

  return (
    <AuthBasePage>
      {success ? (
        <>
          <h1>Check your inbox</h1>
          <div className="intro">
            <p>Please confirm your email address to get started.</p>
            <p>
              You may need to check your spam folder or whitelist{' '}
              {mailOptions.fromEmail}
            </p>
          </div>
        </>
      ) : (
        <>
          <h1>Create an account</h1>
          <div className="form">
            <SignupForm onSuccess={onSuccess} />
          </div>
          <div className="footer">
            <Link href={loginRoute()}>
              <a>I already have an account</a>
            </Link>
          </div>
        </>
      )}
    </AuthBasePage>
  );
};

export default SignupPage;
