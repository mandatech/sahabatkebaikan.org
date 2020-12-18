import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '@material-ui/core/CircularProgress';
import Button from '@material-ui/core/Button';
import CampaignBox from 'components/CampaignBox';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import PropTypes from 'prop-types';
import { useInfiniteLoad } from 'libs/hooks/useInfiniteLoad';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const SearchResult = ({ query }) => {
  const classes = useStyles();
  const [params, setParams] = useState({
    _page: 1,
    _pageSize: 10,
    _published: true,
    _is_active: true,
    _q: query,
  });
  // const { data, isLoadingInitialData, isFetching, error } = useInfiniteScroll(
  //   '/campaigns',
  //   params
  // );

  const {
    data,
    isFetching,
    error,
    isLoadingInitialData,
    isReachingEnd,
    loadMore,
  } = useInfiniteLoad('/campaigns', params);

  const updateParams = () => {
    // A search query api call.
    setParams({
      ...params,
      _q: query,
    });
  };

  const delayedQuery = useCallback(_.debounce(updateParams, 500), [query]);

  useEffect(() => {
    delayedQuery();

    // Cancel the debounce on useEffect cleanup.
    return delayedQuery.cancel;
  }, [query, delayedQuery]);

  return (
    <Box className={classes.root}>
      {isLoadingInitialData ? (
        [1, 2, 3, 4].map((i) => <CampaignBoxSkeleton key={i} />)
      ) : data?.length ? (
        data.map((campaign) => (
          <CampaignBox key={campaign.id} campaign={campaign} />
        ))
      ) : error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <p>Tidak ada campaign ditemukan.</p>
      )}

      {isFetching && !isLoadingInitialData && (
        <Box
          width="100%"
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loading color="secondary" size={20} />
        </Box>
      )}

      {!isReachingEnd && (
        <Box
          width="100%"
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={loadMore} disabled={isFetching} color="secondary">
            Muat lagi
          </Button>
        </Box>
      )}
    </Box>
  );
};

SearchResult.propTypes = {
  query: PropTypes.string,
};

export default SearchResult;
