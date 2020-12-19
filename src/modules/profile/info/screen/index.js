import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    // border: 'solid pink 2px',
  },
  avatarBackground: {
    // border: 'solid black 2px',

    background: 'linear-gradient(270deg, #1BBCC2 0%, #4156A5 100%)',
    opacity: 0.3,
    width: '100%',
    height: 130,
    position: 'absolute',
    overflow: 'hidden',
    '&:after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: '-3%',
      left: '-3%',
      height: 120,
      background: '#fff',
      '-webkit-clip-path': 'ellipse(50% 60% at 50% 100%)',
      'clip-path': 'ellipse(50% 60% at 50% 100%)',
    },
  },
  avatarContainer: {
    position: 'relative',
    top: 20,
  },
  avatar: {
    width: 115,
    height: 115,
  },
}));

const ProfileInfo = ({ profile }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box style={{ position: 'relative' }}>
        <Box className={classes.avatarBackground}></Box>
        <Button
          color="primary"
          size="small"
          startIcon={<EditIcon />}
          style={{ position: 'absolute', top: 16, right: 8, zIndex: 2 }}
          onClick={() => router.push('/profil/edit')}
        >
          Ubah
        </Button>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.avatarContainer}
        >
          <Avatar
            alt="Cindy Baker"
            src="images/avatar_1.jpg"
            className={classes.avatar}
          />
        </Box>
      </Box>
      <Box m={2} mt={4}>
        <Typography variant="body1" color="textSecondary">
          Nama Lengkap
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.full_name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Username
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.username}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          No Telepon
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.phone || '-'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Email
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.email}
        </Typography>
      </Box>
      <Divider variant="middle" />

      <List component="nav" aria-label="info">
        <ListItem>
          <ListItemIcon>
            <DompetIcon />
          </ListItemIcon>
          <ListItemText primary="Dompet Kebaikan" />
          <ListItemText style={{ textAlign: 'right', overflow: 'auto' }}>
            <span style={{ fontWeight: 600 }}>
              {new Intl.NumberFormat('id-ID', {
                style: 'currency',
                currency: 'IDR',
              }).format(120000)}
            </span>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object,
};

export default ProfileInfo;
