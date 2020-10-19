import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import LinearProgress from '@material-ui/core/LinearProgress';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const donations = [
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

const useStyles = makeStyles(() => ({
  root: {},
  donationImage: {
    objectFit: 'fill',
    width: 140,
    height: 90,
    borderRadius: 6,
    cursor: 'pointer',
  },
  donationTitle: {
    fontSize: 12,
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    cursor: 'pointer',
  },
  buttonDonasi: {
    borderRadius: 5,
    marginLeft: 'auto',
    height: 33,
    // width: 100,
    fontSize: 12,
    fontWeight: 400,
  },
  author: {
    fontSize: 10,
    fontWeight: 400,
  },
  fundedTitle: {
    fontSize: 10,
    fontWeight: 400,
  },
  fundedValue: {
    fontSize: 11,
    fontWeight: 600,
  },
}));

// get value of linear progress
// max value is 100
function getValue(funded, target) {
  return (funded * 100) / target;
}

const DonationList = () => {
  const classes = useStyles();

  return (
    <Box>
      <Typography variant="subtitle2" style={{ marginBottom: 16 }}>
        Ayo lakukan kebaikan sekarang juga!
      </Typography>
      {donations.map((donation) => (
        <div key={donation.id}>
          <Box display="flex" my={1} alignItems="center">
            <img
              src={donation.images[0]}
              className={classes.donationImage}
              alt=""
            />
            <Box ml={1}>
              <Box display="flex" alignItems="flex-start">
                <span className={classes.donationTitle}>{donation.title}</span>
                <Button
                  color="secondary"
                  variant="contained"
                  className={classes.buttonDonasi}
                >
                  Donasi
                </Button>
              </Box>
              <span className={classes.author}>{donation.author}</span>

              <LinearProgress
                value={getValue(donation.funded, donation.target)}
                variant="determinate"
                style={{ margin: '4px 0' }}
              />

              <Box display="flex" justifyContent="space-between">
                <Box display="flex" flexDirection="column">
                  <span className={classes.fundedTitle}>Terkumpul</span>
                  <span className={classes.fundedValue}>
                    {new Intl.NumberFormat('id-ID', {
                      style: 'currency',
                      currency: 'IDR',
                    }).format(donation.funded)}
                  </span>
                </Box>
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="flex-end"
                >
                  <span className={classes.fundedTitle}>Sisa Hari</span>
                  <span className={classes.fundedValue}>
                    {donation.daysLeft}
                  </span>
                </Box>
              </Box>
            </Box>
          </Box>
          <Divider />
        </div>
      ))}
    </Box>
  );
};

export default DonationList;
