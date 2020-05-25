import axios, { CancelToken } from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { useSessionContext } from '../contexts';
import { HTTP_STATUS_UNAUTHORIZED } from '../http';
import { loginRoute } from '../routes';

const useData = () => {
  const { resetSessionContext } = useSessionContext();
  const [data, setData] = useState();
  const router = useRouter();

  const handleError = (err) => {
    if (axios.isCancel(err)) return;

    if (err.response && err.response.status === HTTP_STATUS_UNAUTHORIZED) {
      resetSessionContext();

      const { pathname } = window.location;

      if (pathname !== loginRoute()) {
        router.replace(loginRoute());
      }
      return;
    }

    if (err.response && err.response.data) {
      setData(err.response.data);
      return;
    }

    console.log('Unknown error in useData: ', err);
  };

  useEffect(() => {
    let cancelRequest;

    const fetch = async () => {
      try {
        const { pathname, search } = window.location;
        const url = `/api/data${pathname}${search}`;

        const response = await axios(url, {
          cancelToken: new CancelToken((c) => {
            cancelRequest = c;
          }),
        });
        cancelRequest = null;

        setData(response.data);
      } catch (err) {
        return handleError(err);
      }
    };

    fetch();

    return () => {
      if (typeof cancelRequest === 'function') {
        cancelRequest();
      }
    };
  }, []);

  return data;
};

export default useData;
