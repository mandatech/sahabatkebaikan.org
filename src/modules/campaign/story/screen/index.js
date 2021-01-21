import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import clsx from 'clsx';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  root: {
    marginTop: 16,
    padding: '8px 16px 8px 16px',
    '& > *': {
      margin: '8px 0',
    },
  },
  story: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',
    position: 'relative',
    maxHeight: 120,
    '&$storyUncropped': {
      maxHeight: 'none',
    },
  },
  storyUncropped: {},
  readAll: {},
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
      position: 'inherit',
    },
  },
  buttonReadAll: {
    width: 200,
    textTransform: 'capitalize',
    borderRadius: 20,
    fontSize: 12,
    height: 24,
  },
}));

const CampaignStory = ({ campaign }) => {
  const classes = useStyles();
  const [readAll, setReadAll] = useState(false);

  return (
    <Paper className={classes.root} elevation={0}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          Cerita
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {new Date(campaign.start_date).toLocaleDateString()}
        </Typography>
      </Box>

      <Box
        className={clsx(classes.story, { [classes.storyUncropped]: readAll })}
      >
        <Box
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            dangerouslySetInnerHTML={{
              __html: campaign.description,
            }}
          />
        </Box>
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
            {!readAll ? 'Baca selengkapnya' : 'Baca lebih ringkas'}
          </Button>
        </Box>
      </Box>
    </Paper>
  );
};

CampaignStory.propTypes = {
  campaign: PropTypes.object,
};

export default CampaignStory;
