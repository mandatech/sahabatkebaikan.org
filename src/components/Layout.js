import { Paper } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import BottomNavigation from './BottomNavigation';

const useStyles = makeStyles((theme) => ({
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
    background: theme.palette.background.default,
  },
}));

const Layout = ({
  container = 'div',
  menu = 1,
  withBottomNav = false,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {container === 'paper' ? (
        <Paper className={classes.container} elevation={0}>
          {props.children}
        </Paper>
      ) : (
        <Box className={classes.container}>{props.children}</Box>
      )}
      {withBottomNav && <BottomNavigation value={menu} />}
    </Box>
  );
};

Layout.propTypes = {
  container: PropTypes.oneOf(['div', 'paper']),
  children: PropTypes.any,
  menu: PropTypes.number,
  withBottomNav: PropTypes.bool,
};

export default Layout;
