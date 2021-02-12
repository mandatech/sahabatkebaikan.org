import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import LocationOnIcon from '@material-ui/icons/LocationOn';
import MailIcon from '@material-ui/icons/Mail';
import PhoneEnabledIcon from '@material-ui/icons/PhoneEnabled';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding: '16px 32px',
    background: theme.palette.background.paper,
    paddingBottom: 32,
  },
  title: {
    fontWeight: 500,
    textTransform: 'uppercase',
  },
  card: {
    padding: 16,
    margin: '16px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));

const AboutScreen = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        mt={2}
        mb={4}
      >
        <SahabatkebaikanIcon />
      </Box>
      <Paper className={classes.card} variant="outlined">
        <PhoneEnabledIcon fontSize="large" style={{ marginBottom: 8 }} />
        <Typography>+62 81 1160 0660</Typography>
        <Typography>+62 26 4833 3912</Typography>
      </Paper>
      <Paper className={classes.card} variant="outlined">
        <MailIcon fontSize="large" style={{ marginBottom: 8 }} />
        <Typography>baitulmaalku@gmail.com</Typography>
      </Paper>
      <Paper className={classes.card} variant="outlined">
        <LocationOnIcon fontSize="large" style={{ marginBottom: 8 }} />
        <Typography className={classes.title} align="center">
          Yayasan BaitulMaalKu
        </Typography>
        <Typography align="center">
          Jl. Jendral A Yani No.427 Ruko Claster Primadona No.B1 Cikampek
          Selatan-Karawang
        </Typography>
      </Paper>
    </Box>
  );
};

export default AboutScreen;
