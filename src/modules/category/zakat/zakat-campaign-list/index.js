import { useState } from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '@material-ui/core/CircularProgress';
import CampaignBox from 'components/CampaignBox';
import PropTypes from 'prop-types';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import { useInfiniteScroller } from 'libs/hooks/useInfiniteScroller';
import { Paper } from '@material-ui/core';
import DataNotFound from 'components/DataNotFound';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const ZakatScreen = ({ category }) => {
  const classes = useStyles();
  const [params, setParams] = useState({
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
  // const [didMount, setDidMount] = useState(false);

  // useEffect(() => {
  //   setDidMount(true);
  //   return () => setDidMount(false);
  // }, []);

  // if (!didMount) {
  //   return null;
  // }

  return (
    <Paper className={classes.root} ref={ref}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        Salurkan Zakat Anda
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            Salurkan zakat Anda kepada golongan yang berhak menerima zakat
          </Typography>
        </Grid>
        <Grid item>
          <Select
            variant="outlined"
            value={params._category_id}
            onChange={(e) =>
              setParams({
                ...params,
                _category_id: e.target.value,
              })
            }
            label="Sort"
            style={{ height: 40, fontSize: 12 }}
            autoWidth={true}
          >
            <MenuItem value={'zakat'}>Semua</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>

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

      {/* {campaigns.map((campaign) => (
        <CampaignBox key={campaign.id} campaign={campaign} />
      ))} */}
    </Paper>
  );
};

ZakatScreen.propTypes = {
  category: PropTypes.object,
  filter: PropTypes.any,
  setFilter: PropTypes.func,
};

export default ZakatScreen;

const categories = [
  {
    id: 'amil',
    category_id: 'zakat',
    name: 'Amil',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'fakir',
    category_id: 'zakat',
    name: 'Fakir',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'fi-sabilillah',
    category_id: 'zakat',
    name: 'Fi Sabilillah',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'gharim',
    category_id: 'zakat',
    name: 'Gharim',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'ibnu-sabil',
    category_id: 'zakat',
    name: 'Ibnu Sabil',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'miskin',
    category_id: 'zakat',
    name: 'Miskin',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'muallaf',
    category_id: 'zakat',
    name: 'Muallaf',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
  {
    id: 'riqab',
    category_id: 'zakat',
    name: 'Riqab',
    created_at: '2020-12-03 15:41:45',
    updated_at: '2020-12-03 15:41:45',
    deleted_at: null,
  },
];
