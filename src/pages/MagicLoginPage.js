import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';

import { AuthBasePage, GenericErrors } from '../components';
import { homeRoute, onboardingRoute } from '../routes';

import useData from './useData';
import { useSessionContext } from './SessionContext';

const MagicLoginPage = () => {
  const data = useData();
  const router = useRouter();
  const { setSessionContext } = useSessionContext();
  const errors = data?.errors;

  useEffect(() => {
    if (data?.session) {
      setSessionContext({
        ...data.session,
        _ready: true,
      });

      if (data.session.claims?.user?.needsOnboarding) {
        router.replace(onboardingRoute());
      } else if (router.query.next) {
        window.location = decodeURIComponent(router.query.next);
      } else {
        router.replace(homeRoute());
      }
    }
  }, [data]);

  return (
    <AuthBasePage>
      {data && errors ? (
        <>
          <h1>There was a problem</h1>
          <GenericErrors errors={errors} />
        </>
      ) : (
        <Spinner animation="border" role="status" variant="primary" />
      )}
    </AuthBasePage>
  );
};

export default MagicLoginPage;
