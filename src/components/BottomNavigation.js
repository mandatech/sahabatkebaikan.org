import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import RestoreIcon from '@material-ui/icons/Restore';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan_icon_white.svg';
import Router from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

import FabNavigationAction from './FabNavigationAction';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 446,
    width: '100%',
    position: 'fixed',
    bottom: 0,
    boxShadow: theme.shadows[6],
    // boxShadow: '0px 0px 8px 2px rgba(0, 0, 0, 0.25)',
    // background: 'transparent',
  },
  circle: {
    width: 105,
    height: 105,
    border: 'solid rgba(196, 196, 196, 0.2) 15px',
    borderRadius: '50%',
    borderBottomColor: 'transparent',
    borderLeftColor: 'transparent',
    transform: 'rotate(135deg)',
    top: -2.7,
    left: -7.4,
    right: 0,
    margin: '0 auto',
    position: 'absolute',
    zIndex: 1,
    // boxShadow: 'inset 1px -13px 33px -2px rgba(0,0,0,0.48)',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -50,
    left: 0,
    right: 0,
    margin: '0 auto',
    width: 90,
    height: 90,
  },
  bottomNavActionRoot: {
    maxWidth: 300,
    '&$bottomNavActionSelected': {
      color: '#1BBCC2',
    },
  },
  bottomNavActionSelected: {},
}));

const Circle = () => {
  const classes = useStyles();

  return <div className={classes.circle} />;
};

const SimpleBottomNavigation = ({ value }) => {
  const classes = useStyles();

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        Router.push('/kebaikanku');
        break;
      case 1:
        Router.push('/');
        break;
      case 2:
        Router.push('/profil');
        break;
      default:
        break;
    }
  };

  return (
    <BottomNavigation
      value={value}
      onChange={handleTabChange}
      showLabels
      className={classes.root}
    >
      <BottomNavigationAction
        classes={{
          root: classes.bottomNavActionRoot,
          selected: classes.bottomNavActionSelected,
        }}
        label="Kebaikanku"
        icon={<RestoreIcon />}
      />

      <FabNavigationAction
        label="Donasi"
        className={classes.fabButton}
        aria-label="donasi"
      >
        <Circle />
        <SahabatkebaikanIcon />
      </FabNavigationAction>

      <BottomNavigationAction
        classes={{
          root: classes.bottomNavActionRoot,
          selected: classes.bottomNavActionSelected,
        }}
        label="Profil Saya"
        icon={<LocationOnIcon />}
      />
    </BottomNavigation>
  );
};

SimpleBottomNavigation.propTypes = {
  value: PropTypes.number,
};

export default SimpleBottomNavigation;
