import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Loading from '@material-ui/core/CircularProgress';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
// import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import formatCurrency from 'utils/formatCurrency';

import TimeAgo from 'react-timeago';
import id from 'react-timeago/lib/language-strings/id';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
// import { useInfiniteScroll } from 'libs/hooks/useInfiniteScroll';
import { useInfiniteScroller } from 'libs/hooks/useInfiniteScroller';
import DataNotFound from 'components/DataNotFound';

const formatter = buildFormatter(id);

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    marginBottom: 56,
    padding: '8px 16px 16px 16px',
    '& > *': {
      margin: '8px 0',
    },
  },
  item: {
    margin: '8px 0',
    padding: 16,
    background: theme.palette.background.default,
  },
}));

const DonorList = ({ campaign }) => {
  const classes = useStyles();
  const [params] = useState({
    _page: 1,
    _pageSize: 2,
    _sort: 'created_at',
    _order: 'DESC',
    _q: '',
    _campaign_id: campaign.id,
    _status: 'paid',
  });

  const { ref, data, error, isFetching } = useInfiniteScroller(
    '/donations',
    params
  );

  return (
    <Paper className={classes.root} elevation={0} ref={ref}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          Donasi ({campaign.donors_count})
        </Typography>
        {/* <Select
          variant="outlined"
          value={params._order}
          onChange={handleChangeOrder}
          label="Sort"
          style={{ height: 40 }}
          // autoWidth={true}
        >
          <MenuItem value={'DESC'}>Terbaru</MenuItem>
          <MenuItem value={'ASC'}>Terlama</MenuItem>
        </Select> */}
      </Box>

      {data?.length ? (
        data.map((donation, i) => (
          <Grid key={donation.id + i} container className={classes.item}>
            <Grid item>
              <Avatar
                style={{ width: 50, height: 50 }}
                // src="https://material-ui.com/static/images/avatar/1.jpg"
                src={
                  !donation.is_anonymous ? donation.donor.profile_photo : null
                }
              />
            </Grid>
            <Grid item xs style={{ marginLeft: 16 }}>
              <Typography variant="body1" style={{ fontWeight: 500 }}>
                {donation.is_anonymous
                  ? 'Hamba Allah'
                  : donation.donor.full_name}
              </Typography>
              <Typography variant="body2">
                Donasi{' '}
                <span style={{ fontWeight: 500 }}>
                  Rp {formatCurrency.format(donation.donation_amount)}
                </span>
              </Typography>
              <Typography
                variant="body2"
                color="textSecondary"
                gutterBottom
                style={{ fontSize: 12 }}
              >
                <TimeAgo
                  date={donation.payment_confirmed_time}
                  formatter={formatter}
                />
              </Typography>
              <Typography variant="body2">{donation.note}</Typography>
            </Grid>
          </Grid>
        ))
      ) : error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <DataNotFound message="Belum ada donasi untuk campaign ini." />
      )}

      {isFetching && (
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

DonorList.propTypes = {
  campaign: PropTypes.object,
};

export default DonorList;
