import { useState, useEffect, useCallback } from 'react';
import _ from 'lodash';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Loading from '@material-ui/core/CircularProgress';
import CampaignBox from 'components/CampaignBox';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import DataNotFound from 'components/DataNotFound';
import PropTypes from 'prop-types';
import useInfiniteScroller from 'libs/hooks/useInfiniteScroller';
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: 16,
    background: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'column',
  },
}));

const SearchResult = ({ query }) => {
  const classes = useStyles();
  const [params, setParams] = useState({
    _page: 1,
    _pageSize: 3,
    _published: true,
    _is_active: true,
    _q: query,
  });

  const {
    ref,
    data,
    isFetching,
    error,
    isLoadingInitialData,
  } = useInfiniteScroller('/campaigns', params);

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
    <Paper className={classes.root} ref={ref}>
      {isLoadingInitialData ? (
        [1, 2, 3, 4].map((i) => <CampaignBoxSkeleton key={i} />)
      ) : data?.length ? (
        data.map((campaign) => (
          <CampaignBox key={campaign.id} campaign={campaign} />
        ))
      ) : error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <DataNotFound />
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

      {/* {!isReachingEnd && (
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
      )} */}
    </Paper>
  );
};

SearchResult.propTypes = {
  query: PropTypes.string,
};

export default SearchResult;
