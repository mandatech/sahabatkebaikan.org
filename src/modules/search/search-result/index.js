import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import ButtonBase from '@material-ui/core/ButtonBase';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import formatCurrency from 'utils/formatCurrency';
import getValue from 'utils/getValueOfLinearProgress';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    background: theme.palette.background.paper,
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

const SearchResult = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {campaigns.map((campaign) => (
        <Grid key={campaign.id} container style={{ margin: '16px 0' }}>
          <Grid item style={{}}>
            <ButtonBase>
              <img
                src={campaign.images[0]}
                onClick={() => console.log('onClick')}
                className={classes.campaignImage}
                alt=""
                aria-hidden="true"
              />
            </ButtonBase>
          </Grid>
          <Grid item container xs direction="column" style={{ marginLeft: 8 }}>
            <Grid item container style={{ padding: 0 }}>
              <Grid item xs>
                <Typography
                  variant="body2"
                  gutterBottom
                  className={classes.campaignTitle}
                >
                  {campaign.title}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.buttonDonasi}
                >
                  Donasi
                </Button>
              </Grid>
            </Grid>
            <Typography className={classes.author} gutterBottom>
              {campaign.author}
            </Typography>
            <LinearProgress
              value={getValue(campaign.funded, campaign.target)}
              variant="determinate"
              style={{ margin: '4px 0' }}
            />

            <Grid item container>
              <Grid item xs container direction="column">
                <Typography
                  className={classes.fundedDaysLeftTitle}
                  gutterBottom
                >
                  Terkumpul
                </Typography>
                <Typography
                  className={classes.fundedDaysLeftValue}
                  gutterBottom
                >
                  Rp {formatCurrency.format(campaign.funded)}
                </Typography>
              </Grid>
              <Grid item xs container direction="column">
                <Typography
                  className={classes.fundedDaysLeftTitle}
                  align="right"
                  gutterBottom
                >
                  Sisa hari
                </Typography>
                <Typography
                  className={classes.fundedDaysLeftValue}
                  align="right"
                  gutterBottom
                >
                  {campaign.daysLeft}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Box>
  );
};

export default SearchResult;

const campaigns = [
  {
    id: 1,
    title: 'Bahagiakan Ribuan Mustahiq di Karawang Melalui Zakat Anda',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/zakatKu-1.jpg',
    ],
    target: 1000000,
    funded: 500000,
    daysLeft: 28,
    author: 'Baitul MaalKu',
  },
  {
    id: 2,
    title:
      'Yuk Ikut Distribusi 10.000 Wakaf Al-Qur’an untuk Santri dan Masyarakat Muslim di Pelosok Karawang dan Jawa Barat',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/wakaf-Al-Quran.png',
    ],
    target: 90000000,
    funded: 11200000,
    daysLeft: 77,
    author: 'Baitul MaalKu',
  },
  {
    id: 3,
    title:
      'Bantu Anak-anak Dhuafa di Karawang untuk Memenuhi Kebutuhan Biaya Pendidikan Mereka',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/Beasiswa-AmanahKu.jpg',
    ],
    target: 32100000,
    funded: 3400000,
    daysLeft: 120,
    author: 'Baitul MaalKu',
  },
  {
    id: 4,
    title:
      'INBox – Infaq Nasi Box untuk Jama’ah Shalat Jum’at di Masjid Pelosok dan Pesisir Karawang',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/10/20201008_152909.jpg',
    ],
    target: 5400000,
    funded: 5390000,
    daysLeft: 23,
    author: 'Baitul MaalKu',
  },
];
