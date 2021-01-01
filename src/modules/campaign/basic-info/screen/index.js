import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import formatCurrency from 'utils/formatCurrency';
import getValueOfLinearProgress from 'utils/getValueOfLinearProgress';
import SlideShow from './SlideShow';

const useStyles = makeStyles(() => ({
  root: {
    padding: '8px 16px 16px 16px',
    '& > *': {
      margin: '8px 0',
    },
  },
  author: {
    display: 'flex',
    marginTop: 16,
    padding: 16,
    boxShadow: '0px 1px 6px 1px rgba(0, 0, 0, 0.1)',
  },
  authorAvatar: {
    width: 45,
    height: 45,
  },
}));

// get value of linear progress
// max value is 100
// function getValue(funded, target) {
//   return (funded * 100) / target;
// }

const CampaignBasicInfo = ({ campaign }) => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <SlideShow images={campaign.images} />
      <Typography variant="h6" style={{ lineHeight: 1.4 }}>
        {campaign.title}
      </Typography>
      <Grid container>
        <Grid item>
          <Typography
            variant="body1"
            color="primary"
            style={{ fontWeight: 500 }}
          >
            Rp {formatCurrency.format(campaign.donation_funded)}
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="body2"
            color="textSecondary"
            style={{ marginLeft: 8 }}
          >
            terkumpul dari Rp {formatCurrency.format(campaign.donation_target)}
          </Typography>
        </Grid>
      </Grid>
      <LinearProgress
        value={getValueOfLinearProgress(
          campaign.donation_funded,
          campaign.donation_target
        )}
        variant="determinate"
        style={{ margin: '4px 0' }}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>{campaign.donors_count}</span>{' '}
          Donatur
        </Typography>
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>
            {campaign.is_never_end ? (
              <span style={{ fontSize: 18 }}>∞</span>
            ) : (
              campaign.days_left
            )}
          </span>{' '}
          Hari lagi
        </Typography>
      </Box>

      <Paper className={classes.author} elevation={0}>
        <Avatar
          className={classes.authorAvatar}
          src={campaign.campaigner.profile_photo}
        />
        <Box ml={2}>
          <Typography>{campaign.campaigner.full_name}</Typography>
          <Typography variant="body2" color="textSecondary">
            {campaign.campaigner.description}
          </Typography>
        </Box>
      </Paper>
    </Paper>
  );
};

CampaignBasicInfo.propTypes = {
  campaign: PropTypes.object,
};

export default CampaignBasicInfo;
