import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: 446,
    width: '100%',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

const Layout = ({ container = 'div', ...props }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {container === 'paper' ? (
        <Paper className={classes.container}>{props.children}</Paper>
      ) : (
        <Box className={classes.container}>{props.children}</Box>
      )}
    </Box>
  );
};

Layout.propTypes = {
  container: PropTypes.oneOf(['div', 'paper']),
  children: PropTypes.any,
};

export default Layout;
