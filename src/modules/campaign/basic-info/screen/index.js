import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import LinearProgress from '@material-ui/core/LinearProgress';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Image from 'material-ui-image';

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

const CampaignBasicInfo = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={0}>
      <Image
        src={`https://sahabatkebaikan.org/wp-content/uploads/2020/07/zakatKu-1.jpg`}
        onClick={() => console.log('onClick')}
        aspectRatio={16 / 9}
        imageStyle={{
          borderRadius: 8,
          objectFit: 'cover',
          objectPosition: '50% 20%',
        }}
        disableSpinner
      />
      <Typography variant="h6" style={{ lineHeight: 1.4 }}>
        Bahagiakan Ribuan Mustahiq di Karawang Melalui Zakat Anda
      </Typography>
      <Box display="flex" alignItems="center">
        <Typography variant="body1" color="primary" style={{ fontWeight: 500 }}>
          Rp 54.000.000
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          style={{ marginLeft: 8 }}
        >
          terkumpul dari Rp 190.000.000
        </Typography>
      </Box>
      <LinearProgress
        value={40}
        variant="determinate"
        style={{ margin: '4px 0' }}
      />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>1298</span> Donatur
        </Typography>
        <Typography variant="body2">
          <span style={{ fontWeight: 600 }}>128</span> Hari lagi
        </Typography>
      </Box>

      <Paper className={classes.author} elevation={0}>
        <Avatar
          className={classes.authorAvatar}
          src="https://sahabatkebaikan.org/wp-content/uploads/2020/07/FB_IMG_1595683988942.jpg"
        />
        <Box ml={2}>
          <Typography>Baitul Maalku</Typography>
          <Typography variant="body2" color="textSecondary">
            Akun sudah terverifikasi
          </Typography>
        </Box>
      </Paper>
    </Paper>
  );
};

export default CampaignBasicInfo;
