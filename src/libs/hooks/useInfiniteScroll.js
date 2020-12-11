import { useState, useEffect } from 'react';
import { axiosInstance } from 'config/axios';

const defaultParams = {
  page: 1,
  _pageSize: 3,
  _sort: 'created_at',
  _order: 'DESC',
  _q: '',
};

export const useInfiniteScroll = (url, params = defaultParams) => {
  const [queryParams, setQueryParams] = useState(params);
  const [listItems, setListItems] = useState([]);
  const [meta, setMeta] = useState(null);
  const [error, setError] = useState(null);
  const [isFetching, setIsFetching] = useState(false);

  const isLoadingInitialData = !listItems.length && !error;
  // const isEmpty = dataState.data?.[0]?.length === 0;
  const isReachingEnd = meta?.page === meta?.lastPage;

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
  }, []);

  const handleScroll = () => {
    if (
      Math.ceil(window.innerHeight + document.documentElement.scrollTop) !==
        document.documentElement.offsetHeight ||
      isFetching
    )
      return;

    setIsFetching(true);
  };

  const fetchData = async (params = queryParams) => {
    try {
      const { data } = await axiosInstance({
        url,
        method: 'GET',
        params,
      });

      const previousData = listItems.length ? [...listItems] : [];
      let meta = { ...data };
      delete meta.items;

      setListItems(() => {
        return [...previousData, ...data.items];
      });
      setMeta(meta);
      setQueryParams({
        ...queryParams,
        _page: queryParams._page + 1,
      });
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
    }
  };

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreListItems();
  }, [isFetching]);

  const fetchMoreListItems = () => {
    if (!isReachingEnd) {
      fetchData();
    }
    setIsFetching(false);
  };

  return {
    data: listItems,
    isFetching,
    setIsFetching,
    error,
    meta,
    isReachingEnd,
    isLoadingInitialData,
  };
};
