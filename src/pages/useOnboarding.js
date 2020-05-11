import { useRouter } from 'next/router';
import { useEffect } from 'react';

import {
  onboardingPasswordRoute,
  onboardingNameRoute,
  onboardingProfilePictureRoute,
  homeRoute,
} from '../routes';
import { useSessionContext } from '../sessions';

const useOnboarding = () => {
  const router = useRouter();
  const { sessionContext } = useSessionContext();

  useEffect(() => {
    if (sessionContext._ready && sessionContext.isAuthenticated) {
      const { user } = sessionContext.claims;

      if (user.needsOnboarding) {
        router.replace(onboardingPasswordRoute());
      } else if (!user.name) {
        router.replace(onboardingNameRoute());
      } else if (!user.profilePictureURL) {
        router.replace(onboardingProfilePictureRoute());
      } else {
        router.replace(homeRoute());
      }
    }
  }, [sessionContext._ready]);
};

export default useOnboarding;
