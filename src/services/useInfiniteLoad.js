import { useState, useEffect } from 'react';
import { axiosInstance } from 'config/axios';

const defaultParams = {
  page: 1,
  _pageSize: 3,
  _sort: 'created_at',
  _order: 'DESC',
  _q: '',
};

export const useInfiniteLoad = (url, params = defaultParams) => {
  const [queryParams, setQueryParams] = useState(params);

  // const { data, isFetching } = getCampaignList(queryParams);
  const [dataState, setDataState] = useState({
    data: null,
    meta: null,
    isFetching: false,
    error: null,
  });

  const fetchFromApi = async (queryParams) => {
    try {
      setDataState({ ...dataState, isFetching: true });
      const { data } = await axiosInstance({
        url,
        method: 'GET',
        params: queryParams,
      });

      const previousData = dataState.data ? [...dataState.data] : [];

      setTimeout(() => {
        let meta = { ...data };
        delete meta.items;

        setDataState({
          ...dataState,
          data: [...previousData, ...data.items],
          meta,
          isFetching: false,
        });
        setQueryParams({
          ...queryParams,
          _page: queryParams._page + 1,
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

  useEffect(() => {
    fetchFromApi(queryParams);
  }, []);

  const loadMore = () => {
    fetchFromApi(queryParams);
  };

  const isLoadingInitialData = !dataState.data && !dataState.error;
  // const isEmpty = dataState.data?.[0]?.length === 0;
  const isReachingEnd = dataState.meta?.page === dataState.meta?.lastPage;

  return {
    data: dataState.data,
    isFetching: dataState.isFetching,
    error: dataState.error,
    loadMore,
    isLoadingInitialData,
    isReachingEnd,
  };
};

export default useInfiniteLoad;
