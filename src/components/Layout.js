import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Head from 'next/head';
import PropTypes from 'prop-types';

import BottomNavigation from './BottomNavigation';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
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
  menu = 1,
  withBottomNav = false,
  title,
  header,
  ...props
}) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Head>{title && <title>{title}</title>}</Head>
      {header && header}
      <Box className={classes.container}>{props.children}</Box>
      {withBottomNav && <BottomNavigation value={menu} />}
    </Box>
  );
};

Layout.propTypes = {
  children: PropTypes.any,
  menu: PropTypes.number,
  withBottomNav: PropTypes.bool,
  title: PropTypes.string,
  header: PropTypes.any,
};

export default Layout;
