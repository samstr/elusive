import { useRouter } from 'next/router';
import { useEffect } from 'react';

const useRedirect = (href, asPath) => {
  const router = useRouter();

  useEffect(() => {
    router.replace(href, asPath);
  }, []);
};

export default useRedirect;
