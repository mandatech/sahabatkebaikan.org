import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Loading from '@material-ui/core/CircularProgress';
// import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
// import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import React, { useState } from 'react';

import TimeAgo from 'react-timeago';
import id from 'react-timeago/lib/language-strings/id';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import useInfiniteLoad from 'libs/hooks/useInfiniteLoad';
import DataNotFound from 'components/DataNotFound';

const formatter = buildFormatter(id);

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 16,
    padding: '8px 16px 16px 16px',
    '& > *': {
      margin: '8px 0',
    },
  },
  latestNews: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 200,
    '&$uncropped': {
      maxHeight: 'none',
    },
  },
  uncropped: {},
  readAll: {},
  item: {
    // margin: '8px 0',
    marginBottom: 16,
    padding: 16,
    width: '100%',
    // position: 'relative',
    // top: -16,
  },
  buttonReadAllContainer: {
    marginTop: 8,
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    background:
      'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.78) 100%)',
    position: 'absolute',
    bottom: 0,
    height: 40,
    '&$readAll': {
      position: 'initial',
    },
  },
  buttonReadAll: {
    width: 200,
    textTransform: 'capitalize',
    borderRadius: 20,
    fontSize: 12,
    height: 24,
  },
  missingOppositeContent: {
    '&:before': {
      display: 'none',
    },
  },
}));

const DonorList = ({ campaign }) => {
  const classes = useStyles();
  const [readAll, setReadAll] = useState(false);
  const [params] = useState({
    _page: 1,
    _pageSize: 2,
    _sort: 'created_at',
    _order: 'DESC',
    _q: '',
    // _campaign_id: campaign.id,
    // _status: 'paid',
  });

  const {
    ref,
    data,
    error,
    isFetching,
    isReachingEnd,
    loadMore,
  } = useInfiniteLoad(`/campaigns/${campaign.slug}/latest-news`, params);

  return (
    <Paper className={classes.root} elevation={0} ref={ref}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          Kabar Terbaru
        </Typography>
      </Box>

      {data?.length ? (
        <Box
          className={clsx(classes.latestNews, { [classes.uncropped]: readAll })}
        >
          <Timeline align="left" style={{ padding: 0 }}>
            {data.map((latestNews, i) => (
              <TimelineItem
                key={i}
                classes={{
                  missingOppositeContent: classes.missingOppositeContent,
                }}
              >
                <TimelineSeparator>
                  <TimelineConnector
                    style={{ flexGrow: 0, height: 24, width: 1 }}
                  />
                  <TimelineDot color="secondary" />
                  <TimelineConnector style={{ width: 1 }} />
                </TimelineSeparator>
                <TimelineContent style={{ padding: '0 0 0 8px' }}>
                  <Paper
                    // key={latestNews.id + i}
                    className={classes.item}
                    variant="outlined"
                  >
                    <Grid container>
                      <Grid item>
                        <Avatar
                          style={{ width: 50, height: 50 }}
                          src={campaign.campaigner.profile_photo}
                        />
                      </Grid>
                      <Grid item xs style={{ marginLeft: 16 }}>
                        <Typography variant="body1" style={{ fontWeight: 500 }}>
                          {latestNews.campaign.campaigner.full_name}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          gutterBottom
                          style={{ fontSize: 12 }}
                        >
                          <TimeAgo
                            date={latestNews.created_at}
                            formatter={formatter}
                          />
                        </Typography>
                      </Grid>
                    </Grid>
                    <Typography
                      variant="body1"
                      style={{ fontWeight: 500, marginTop: 16 }}
                    >
                      {latestNews.title}
                    </Typography>
                    <div
                      className="ck-content"
                      style={{ marginTop: 8 }}
                      dangerouslySetInnerHTML={{
                        __html: latestNews.content,
                      }}
                    />
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
          {isFetching && (
            <Box
              width="100%"
              mt={1}
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
              mt={1}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Button
                onClick={loadMore}
                disabled={isFetching}
                color="secondary"
                style={{ fontSize: 12 }}
              >
                Muat lagi
              </Button>
            </Box>
          )}

          <Box
            className={clsx(classes.buttonReadAllContainer, {
              [classes.readAll]: readAll,
            })}
          >
            <Button
              className={classes.buttonReadAll}
              variant="contained"
              color="secondary"
              endIcon={!readAll ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              onClick={() => setReadAll(!readAll)}
            >
              {!readAll ? 'Baca selengkapnya' : 'Tutup'}
            </Button>
          </Box>
        </Box>
      ) : error ? (
        <DataNotFound message={error.message} />
      ) : (
        <DataNotFound message="Maaf, belum ada kabar terbaru untuk campaign ini" />
      )}
    </Paper>
  );
};

DonorList.propTypes = {
  campaign: PropTypes.object,
};

export default DonorList;
