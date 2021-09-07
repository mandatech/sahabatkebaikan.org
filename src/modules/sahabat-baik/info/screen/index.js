import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
  },
  avatarBackground: {
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

  return (
    <Box className={classes.root}>
      <Box style={{ position: 'relative' }}>
        <Box className={classes.avatarBackground}></Box>
        <Box
          display="flex"
          justifyContent="center"
          className={classes.avatarContainer}
        >
          <Avatar
            alt="Cindy Baker"
            src={profile?.profile_photo}
            className={classes.avatar}
          />
        </Box>
      </Box>
      <Box m={2} mt={4}>
        <Typography variant="body1" color="textSecondary">
          Nama Lengkap
        </Typography>

        <Box display="flex" flexDirection="rows" alignItems="center" mb={1}>
          <Typography variant="body1">{profile?.full_name}</Typography>
          <CheckCircleIcon
            fontSize="small"
            color="primary"
            style={{ marginLeft: 4 }}
          />
        </Box>
        <Typography variant="body1" color="textSecondary">
          Deskripsi Penggalang
        </Typography>
        <Typography variant="body1" gutterBottom>
          {profile?.description}
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
        <Typography variant="body1" color="textSecondary">
          Kontak
        </Typography>
        {!profile?.contacts.length ? (
          <Typography variant="body1" gutterBottom>
            -
          </Typography>
        ) : (
          profile?.contacts.map((contact) => (
            <Grid key={contact.id} container>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  {contact.contact_name}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom>
                  : {contact.contact_value}
                </Typography>
              </Grid>
            </Grid>
          ))
        )}

        <Typography variant="body1" color="textSecondary">
          Link Sosial
        </Typography>
        {!profile?.social_links.length ? (
          <Typography variant="body1" gutterBottom>
            -
          </Typography>
        ) : (
          profile?.social_links.map((social) => (
            <Grid key={social.id} container>
              <Grid item xs={3}>
                <Typography variant="body1" gutterBottom>
                  {social.social_media_name}
                </Typography>
              </Grid>
              <Grid item xs={9}>
                <Typography variant="body1" gutterBottom>
                  : {social.social_media_links}
                </Typography>
              </Grid>
            </Grid>
          ))
        )}
      </Box>
    </Box>
  );
};

ProfileInfo.propTypes = {
  profile: PropTypes.object,
};

export default ProfileInfo;
