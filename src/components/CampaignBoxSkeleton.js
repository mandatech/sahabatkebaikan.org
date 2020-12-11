import Skeleton from '@material-ui/lab/Skeleton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    padding: '16px',
  },
  campaignImage: {
    borderRadius: 8,
    objectFit: 'cover',
    width: '100%',
    maxWidth: 140,
    height: 105,
    cursor: 'pointer',
  },
  campaignTitle: {
    fontSize: 12,
    fontWeight: 500,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 3,
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    cursor: 'pointer',
  },
  buttonDonasi: {
    borderRadius: 5,
    // margin: 4,
    height: 33,
    // width: 100,
    fontSize: 12,
    fontWeight: 400,
  },
  author: {
    fontSize: 10,
    fontWeight: 400,
  },
  fundedDaysLeftTitle: {
    fontSize: 10,
    fontWeight: 400,
  },
  fundedDaysLeftValue: {
    fontSize: 11,
    fontWeight: 600,
  },
}));

const CampaignBoxSkeleton = () => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Grid item>
        <Skeleton variant="rect" width={160} height={90} animation="pulse" />
      </Grid>
      <Grid item container xs direction="column" style={{ marginLeft: 8 }}>
        <Skeleton width="100%" animation="pulse">
          <Typography>.</Typography>
        </Skeleton>
        <Skeleton variant="text" animation="pulse" />
        <Skeleton variant="text" width="60%" animation="pulse" />
        <Skeleton variant="text" width="50%" animation="pulse" />
      </Grid>
    </Grid>
  );
};

export default CampaignBoxSkeleton;
