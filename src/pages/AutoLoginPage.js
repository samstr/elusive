import { CircularProgress } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { AuthPage, ErrorAlert } from '../components';
import { useData, useSessionContext } from '../hooks';
import { homeRoute, onboardingRoute } from '../routes';

const AutoLoginPage = () => {
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
    <AuthPage>
      <>
        {data && errors ? <ErrorAlert errors={errors} /> : <CircularProgress />}
      </>
    </AuthPage>
  );
};

export default AutoLoginPage;
