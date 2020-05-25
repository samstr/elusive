import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { AuthBasePage, OnboardingForm } from '../components';
import { settingsProfileRoute } from '../routes';

import useRequireAuth from './useRequireAuth';
import useSession from './useSession';
import { useSessionContext } from './SessionContext';

const OnboardingPage = () => {
  useRequireAuth();
  const session = useSession();
  const [success, setSuccess] = useState();
  const { setSessionContext } = useSessionContext();

  useEffect(() => {
    if (session._ready && session.isAuthenticated) {
      const { user } = session.claims;

      if (!user.needsOnboarding) {
        setSuccess(true);
      }
    }
  }, [session._ready]);

  const onSuccess = (data) => {
    setSessionContext({
      ...data.session,
      _ready: true,
    });

    setSuccess(true);
  };

  return (
    <AuthBasePage>
      {session._ready ? (
        <>
          {success ? (
            <>
              <h1>What next?</h1>
              <div className="options">
                <Link href={settingsProfileRoute()}>
                  <a className="option">
                    <div className="icon">
                      <img src="/img/icons/user-1a73e8.svg" width="38" />
                    </div>
                    <div className="details">
                      <div className="heading">Setup your profile</div>
                      <div className="description">
                        Whether you&apos;re a creator or a fan, the next step is
                        to set your name and picture. Click here to edit your
                        profile.
                      </div>
                    </div>
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <>
              <h1>Create a password</h1>
              <div className="intro">
                Let&apos;s create a password for you to use when you login
              </div>
              <div className="form">
                <OnboardingForm
                  email={session?.claims?.user?.email || ''}
                  onSuccess={onSuccess}
                />
              </div>
            </>
          )}
        </>
      ) : (
        <Spinner animation="border" role="status" variant="primary" />
      )}
    </AuthBasePage>
  );
};

export default OnboardingPage;
