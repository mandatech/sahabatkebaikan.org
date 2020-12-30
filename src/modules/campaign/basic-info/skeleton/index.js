import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
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

import Skeleton from '@material-ui/lab/Skeleton';

const BasicInfoSkeleton = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Skeleton variant="rect" width="100%" height={200} animation="pulse" />
      <Skeleton width="100%" animation="pulse">
        <Typography>.</Typography>
      </Skeleton>
      <Skeleton variant="text" animation="pulse" width="75%" height={16} />
      <Skeleton variant="text" animation="pulse" width="75%" height={16} />
      <Skeleton variant="rect" width="100%" height={90} animation="pulse" />

      <Box style={{ marginTop: 16 }}>
        {/* <Skeleton variant="rect" width="100%" height={120} animation="pulse" /> */}
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
      </Box>
      <Box style={{ marginTop: 16 }}>
        {/* <Skeleton variant="rect" width="100%" height={120} animation="pulse" /> */}
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
        <Skeleton variant="text" animation="pulse" width="100%" height={16} />
      </Box>
      <Skeleton variant="rect" width="100%" height={100} animation="pulse" />
    </Paper>
  );
};

export default BasicInfoSkeleton;
