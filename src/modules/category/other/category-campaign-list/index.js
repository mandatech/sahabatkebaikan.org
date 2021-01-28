import { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import { useInfiniteScroller } from 'libs/hooks/useInfiniteScroller';
import CampaignBox from 'components/CampaignBox';
import DataNotFound from 'components/DataNotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const CategoryCampaignList = ({ category }) => {
  const classes = useStyles();
  const [params] = useState({
    _page: 1,
    _pageSize: 10,
    _category_id: category.id,
    _published: true,
    _is_active: true,
  });

  const {
    ref,
    data,
    isLoadingInitialData,
    isFetching,
    error,
  } = useInfiniteScroller('/campaigns', params);

  // fix Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function
  const [didMount, setDidMount] = useState(false);

  useEffect(() => {
    setDidMount(true);
    return () => setDidMount(false);
  }, []);

  if (!didMount) {
    return null;
  }

  return (
    <Paper className={classes.root} ref={ref} elevation={0}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        {category?.description}
      </Typography>

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
    </Paper>
  );
};

CategoryCampaignList.propTypes = {
  category: PropTypes.object,
};

export default CategoryCampaignList;
