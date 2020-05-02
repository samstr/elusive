import axios, { CancelToken } from 'axios';
import { useEffect, useState } from 'react';

const useData = () => {
  const [data, setData] = useState();

  useEffect(() => {
    let cancelRequest;

    const fetch = async () => {
      try {
        const { pathname, search } = window.location;
        const url = `/api/page${pathname}${search}`;

        const response = await axios(url, {
          cancelToken: new CancelToken((c) => {
            cancelRequest = c;
          }),
        });
        cancelRequest = null;

        setData(response.data);
      } catch (err) {
        console.log('err', err);
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
