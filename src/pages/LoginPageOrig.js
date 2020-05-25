import Elusive from 'elusive';
import { LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD, LOGIN_TYPES } from '../auth';
import { homeRoute, loginRoute, resetRoute, signupRoute } from 'elusive/routes';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import LoginWithLinkForm from 'components/LoginWithLinkForm';
import LoginWithPasswordForm from 'components/LoginWithPasswordForm';
import { SENDGRID_FROM_EMAIL } from 'config';

import { useSession } from './';

import styles from 'components/OLDLoginPage/styles.module.scss';

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  const [type, setType] = useState();
  const [success, setSuccess] = useState();
  const { site: siteOptions } = Elusive.options;

  useEffect(() => {
    if (router.query.type) {
      if (LOGIN_TYPES.includes(router.query.type)) {
        setType(router.query.type);
      } else {
        router.replace(loginRoute());
      }
    } else {
      setType();
      setSuccess();
    }
  }, [router.query]);

  useEffect(() => {
    if (session._ready && session.isAuthenticated) {
      router.replace(homeRoute());
    }
  }, [session]);

  const loginTypeRouteWithNext = (type) => {
    let url = `${loginRoute()}?type=${type}`;

    if (router.query.next) {
      url = `${url}&next=${encodeURIComponent(router.query.next)}`;
    }

    return url;
  };

  const onPasswordSuccess = () => {
    let next = homeRoute();
    if (router.query.next) {
      next = decodeURIComponent(router.query.next);
    }
    window.location = next;
  };

  const onLinkSuccess = () => setSuccess(true);

  if (type === LOGIN_TYPE_PASSWORD) {
    return (
      <AuthBasePage>
        <h1>Login to {siteOptions.name}</h1>
        <div className={baseStyles.form}>
          <LoginWithPasswordForm onSuccess={onPasswordSuccess} />
        </div>
        <div className={baseStyles.footer}>
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
          <div className={baseStyles.intro}>
            <p>We have sent you an email with an automatic login link.</p>
            <p>
              You may need to check your spam folder or whitelist{' '}
              {SENDGRID_FROM_EMAIL}
            </p>
          </div>
        </AuthBasePage>
      );
    } else {
      return (
        <AuthBasePage>
          <h1>Login to {siteOptions.name}</h1>
          <div className={baseStyles.form}>
            <LoginWithLinkForm onSuccess={onLinkSuccess} />
          </div>
          <div className={baseStyles.footer}>
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
      <div className={styles.options}>
        <Link href={loginTypeRouteWithNext(LOGIN_TYPE_PASSWORD)}>
          <a className={styles.option}>
            <div className={styles.icon}>
              <img src="/img/icons/password-1a73e8.svg" width="38" />
            </div>
            <div className={styles.text}>Login with my password</div>
          </a>
        </Link>
        <Link href={loginTypeRouteWithNext(LOGIN_TYPE_LINK)}>
          <a className={styles.option}>
            <div className={styles.icon}>
              <img src="/img/icons/email-1a73e8.svg" width="38" />
            </div>
            <div className={styles.text}>Email me a login link</div>
          </a>
        </Link>
      </div>
      <div className={baseStyles.footer}>
        <Link href={signupRoute()}>
          <a>Create an account instead</a>
        </Link>
      </div>
    </AuthBasePage>
  );
};

export default LoginPage;
