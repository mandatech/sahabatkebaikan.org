import { useEffect, useState } from 'react';
import useInfiniteScroll from 'react-infinite-scroll-hook';
import { axiosInstance } from 'config/axios';

const defaultParams = {
  _page: 1,
  _pageSize: 10,
  _sort: 'created_at',
  _order: 'DESC',
  _q: '',
};

export const useInfiniteScroller = (url, params) => {
  const [queryParams, setQueryParams] = useState({
    ...defaultParams,
    ...params,
  });
  const [isFetching, setIsFetching] = useState(false);
  const [listItems, setListItems] = useState(null);
  const [meta, setMeta] = useState();
  const [error, setError] = useState();

  const isLoadingInitialData = !listItems && !error;
  // const isEmpty = dataState.data?.[0]?.length === 0;
  const isReachingEnd = meta?.page >= meta?.lastPage || meta?.total === 0;

  useEffect(() => {
    const newParams = { ...defaultParams, ...params };
    setQueryParams(newParams);

    handleLoadMore(newParams, true);
  }, [params]);

  const handleLoadMore = async (params = queryParams, reset = false) => {
    try {
      setIsFetching(true);
      const { data } = await axiosInstance({
        url,
        method: 'GET',
        params,
      });

      const previousData = listItems ? [...listItems] : [];
      let meta = { ...data };
      delete meta.items;

      if (reset) {
        setListItems(() => {
          return [...data.items];
        });
      } else {
        setListItems(() => {
          return [...previousData, ...data.items];
        });
      }

      setMeta(meta);
      setQueryParams({
        ...queryParams,
        _page: params._page + 1,
      });
      setIsFetching(false);
    } catch (error) {
      if (error.response) {
        console.log(error.response.data);
        setError(error.response.data);
      } else if (error.request) {
        console.log(error.request);
        setError(error.request);
      } else {
        console.log('Error', error.message);
        setError(error.message);
      }
      setError(error);
      setIsFetching(false);
    }
  };

  const infiniteRef = useInfiniteScroll({
    loading: isFetching,
    // This value is set to "true" for this demo only. You will need to
    // get this value from the API when you request your items.
    hasNextPage: !isReachingEnd,
    onLoadMore: handleLoadMore,
    scrollContainer: 'window',
  });

  return {
    ref: infiniteRef,
    data: listItems,
    isFetching,
    setIsFetching,
    error,
    meta,
    isReachingEnd,
    isLoadingInitialData,
  };
};

export default useInfiniteScroller;
