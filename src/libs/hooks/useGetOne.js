import { useState, useEffect } from 'react';
import { axiosInstance } from 'config/axios';

export const useGetOne = (url) => {
  const [dataState, setDataState] = useState({
    data: null,
    isFetching: false,
    error: null,
  });

  useEffect(() => {
    const fetchFromApi = async () => {
      try {
        setDataState({ ...dataState, isFetching: true });
        const { data } = await axiosInstance({
          url,
          method: 'GET',
        });

        setDataState({
          ...dataState,
          data: data,
          isFetching: false,
        });
      } catch (error) {
        if (error.response) {
          setDataState({
            ...dataState,
            isFetching: false,
            error: error.response.data,
          });
        } else if (error.request) {
          setDataState({
            ...dataState,
            isFetching: false,
            error: error.request,
          });
        } else {
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

export default useGetOne;
