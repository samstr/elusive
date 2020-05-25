import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import Elusive from '../';
import { LOGIN_TYPE_LINK, LOGIN_TYPE_PASSWORD, LOGIN_TYPES } from '../auth';
import {
  AuthBasePage,
  LoginWithLinkForm,
  LoginWithPasswordForm,
} from '../components';
import { homeRoute, loginRoute, resetRoute, signupRoute } from '../routes';

import useSession from './useSession';

const LoginPage = () => {
  const router = useRouter();
  const session = useSession();
  const [type, setType] = useState();
  const [success, setSuccess] = useState();
  const { mail: mailOptions, site: siteOptions } = Elusive.options;

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

  return (
    <AuthBasePage>
      {type === LOGIN_TYPE_PASSWORD && (
        <>
          <h1>Login to {siteOptions.name}</h1>
          <div className="form">
            <LoginWithPasswordForm onSuccess={onPasswordSuccess} />
          </div>
          <div className="footer">
            <Link href={resetRoute()}>
              <a>Forgot your password?</a>
            </Link>
            &nbsp;&nbsp;&bull;&nbsp;&nbsp;
            <Link href={loginTypeRouteWithNext(LOGIN_TYPE_LINK)}>
              <a>Email me a login link</a>
            </Link>
          </div>
        </>
      )}
      {type === LOGIN_TYPE_LINK && (
        <>
          {success ? (
            <>
              <h1>Check your inbox</h1>
              <div className="intro">
                <p>We have sent you an email with an automatic login link.</p>
                <p>
                  You may need to check your spam folder or whitelist{' '}
                  {mailOptions.fromEmail}
                </p>
              </div>
            </>
          ) : (
            <>
              <h1>Login to {siteOptions.name}</h1>
              <div className="form">
                <LoginWithLinkForm onSuccess={onLinkSuccess} />
              </div>
              <div className="footer">
                <Link href={loginTypeRouteWithNext(LOGIN_TYPE_PASSWORD)}>
                  <a>Use password</a>
                </Link>
              </div>
            </>
          )}
        </>
      )}
      {!type && (
        <>
          <h1>How do you want to login?</h1>
          <div className="options">
            <Link href={loginTypeRouteWithNext(LOGIN_TYPE_PASSWORD)}>
              <a className="option">
                <div className="icon">
                  <img src="/img/icons/password-1a73e8.svg" width="38" />
                </div>
                <div className="text">Login with my password</div>
              </a>
            </Link>
            <Link href={loginTypeRouteWithNext(LOGIN_TYPE_LINK)}>
              <a className="option">
                <div className="icon">
                  <img src="/img/icons/email-1a73e8.svg" width="38" />
                </div>
                <div className="text">Email me a login link</div>
              </a>
            </Link>
          </div>
          <div className="footer">
            <Link href={signupRoute()}>
              <a>Create an account instead</a>
            </Link>
          </div>
        </>
      )}

      <style jsx>{`
        .options {
          text-align: center;
        }

        a.option {
          display: inline-flex;
          flex-direction: column;
          vertical-align: top;
          align-items: center;
          justify-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          border: 2px solid #78a7e6;
          border-radius: 3px;
          margin: 0 12px;
          padding: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: 0.15s ease-in-out transform,
            0.15s ease-in-out border-color;
          background-color: #fff;
          font-size: 16px;
        }

        a.option:hover {
          border-color: #f90;
          text-decoration: none;
          transform: scale(1.025);
          text-decoration: none !important;
        }

        .icon {
          flex: 1;
          display: flex;
        }

        .text {
          margin-top: 10px;
        }
      `}</style>
    </AuthBasePage>
  );
};

export default LoginPage;
