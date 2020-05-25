//import Link from 'next/link';
//import { useRouter } from 'next/router';
//import React, { useEffect, useState } from 'react';

//import Elusive from '../';
//import { LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD, LOGIN_TYPES } from '../auth';
import { AuthBasePage } from '../components';
//import { homeRoute, loginRoute, resetRoute, signupRoute } from '../routes';

//import useSession from './useSession';

//console.log('AuthBasePage', AuthBasePage);

const LoginPage = () => {
  //const router = useRouter();
  //const session = useSession();
  //const [type, setType] = useState();
  //const [success, setSuccess] = useState();
  //const { site: siteOptions } = Elusive.options;

  /* const loginTypeRouteWithNext = (type) => {
    let url = `${loginRoute()}?type=${type}`;

    if (router.query.next) {
      url = `${url}&next=${encodeURIComponent(router.query.next)}`;
    }

    return url;
  };

  if (type === LOGIN_TYPE_PASSWORD) {
    return (
      <AuthBasePage>
        <h1>Login to {siteOptions.name}</h1>
        <div>
          <LoginWithPasswordForm onSuccess={onPasswordSuccess} />
        </div>
        <div>
          <Link href={resetRoute()}>
            <a>Forgot your password?</a>
          </Link>
          &nbsp;&nbsp;&bull;&nbsp;&nbsp;
          <Link href={loginTypeRouteWithNext(LOGIN_TYPE_LINK)}>
            <a>Email me a login link</a>
          </Link>
        </div>
      </AuthBasePage>
    );
  } else if (type === LOGIN_TYPE_LINK) {
    if (success) {
      return (
        <AuthBasePage>
          <h1>Check your inbox</h1>
          <div>
            <p>We have sent you an email with an automatic login link.</p>
            <p>
              You may need to check your spam folder or whitelist XXX@XXX.COM
            </p>
          </div>
        </AuthBasePage>
      );
    } else {
      return (
        <AuthBasePage>
          <h1>Login to {siteOptions.name}</h1>
          <div><LoginWithLinkForm onSuccess={onLinkSuccess} /></div>
          <div>
            <Link href={loginTypeRouteWithNext(LOGIN_TYPE_PASSWORD)}>
              <a>Use password</a>
            </Link>
          </div>
        </AuthBasePage>
      );
    }
  }

  return (
    <AuthBasePage>
      <h1>How do you want to login?</h1>
      <div>
        <Link href={loginTypeRouteWithNext(LOGIN_TYPE_PASSWORD)}>
          <a>
            <div>
              <img src="/img/icons/password-1a73e8.svg" width="38" />
            </div>
            <div>Login with my password</div>
          </a>
        </Link>
        <Link href={loginTypeRouteWithNext(LOGIN_TYPE_LINK)}>
          <a>
            <div>
              <img src="/img/icons/email-1a73e8.svg" width="38" />
            </div>
            <div>Email me a login link</div>
          </a>
        </Link>
      </div>
      <div>
        <Link href={signupRoute()}>
          <a>Create an account instead</a>
        </Link>
      </div>
    </AuthBasePage>
  );*/

  return <AuthBasePage>Login</AuthBasePage>;
};

export default LoginPage;
