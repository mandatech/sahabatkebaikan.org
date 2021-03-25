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

        setDataState({
          ...dataState,
          data: data.items,
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

export default useGetList;
