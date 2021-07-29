import { useState, useEffect } from 'react';
import { axiosInstance } from 'config/axios';

const defaultParams = {
  _page: 1,
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

  useEffect(() => {
    const newParams = { ...defaultParams, ...params };
    setQueryParams(newParams);

    fetchFromApi(newParams, true);
  }, [params]);

  const isLoadingInitialData = !dataState.data && !dataState.error;
  // const isEmpty = dataState.data?.[0]?.length === 0;
  const isReachingEnd =
    dataState.meta?.page === dataState.meta?.lastPage ||
    dataState.meta?.total === 0;

  const fetchFromApi = async (queryParams, reset = false) => {
    try {
      setDataState({ ...dataState, isFetching: true });
      const { data } = await axiosInstance({
        url,
        method: 'GET',
        params: queryParams,
      });

      const previousData = dataState.data ? [...dataState.data] : [];

      let meta = { ...data };
      delete meta.items;

      if (reset) {
        setDataState({
          ...dataState,
          data: [...data.items],
          meta,
          isFetching: false,
        });
      } else {
        setDataState({
          ...dataState,
          data: [...previousData, ...data.items],
          meta,
          isFetching: false,
        });
      }

      setQueryParams({
        ...queryParams,
        _page: queryParams._page + 1,
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
          error: {
            message: 'Network error',
          },
        });
      } else {
        setDataState({
          ...dataState,
          isFetching: false,
          error,
        });
      }
    }
  };

  const loadMore = () => {
    fetchFromApi(queryParams);
  };

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
