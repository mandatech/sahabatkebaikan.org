import { useState, useEffect } from 'react';
import { axiosInstance } from 'config/axios';

const defaultParams = {
  _page: 1,
  _pageSize: 10,
  _sort: 'created_at',
  _order: 'DESC',
  _q: '',
};

export const useGetList = (url, params = defaultParams) => {
  const [dataState, setDataState] = useState({
    data: [],
    isFetching: false,
    error: null,
  });
  const [endpointUrl] = useState(url);

  useEffect(() => {
    const fetchFromApi = async () => {
      try {
        setDataState({ ...dataState, isFetching: true });
        const { data } = await axiosInstance({
          url: endpointUrl,
          method: 'GET',
          params,
        });

        setTimeout(() => {
          setDataState({
            ...dataState,
            data: data.items,
            isFetching: false,
          });
        }, 1500);
      } catch (error) {
        if (error.response) {
          console.log(error.response.data);
          setDataState({
            ...dataState,
            isFetching: false,
            error: error.response.data,
          });
        } else if (error.request) {
          console.log(error.request);
          setDataState({
            ...dataState,
            isFetching: false,
            error: error.request,
          });
        } else {
          console.log('Error', error.message);
          setDataState({
            ...dataState,
            isFetching: false,
            error: error.message,
          });
        }
        setDataState({ ...dataState, isFetching: false, error });
      }
    };
    fetchFromApi();
  }, []);

  return {
    data: dataState.data,
    isFetching: dataState.isFetching,
    error: dataState.error,
  };
};
