import { useRouter } from 'next/router';
import Link from 'components/Link';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import RedeemIcon from '@material-ui/icons/Redeem';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    background: theme.palette.background.paper,
    minHeight: '100vh',
    paddingBottom: 32,
  },
  listText: {
    color: theme.palette.primary.main,
    // color: 'black',
    fontWeight: 600,
  },
  listIcon: {
    minWidth: 0,
    marginRight: 16,
  },
}));

const AboutScreen = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Box mb={2}>
        <Typography variant="h6" color="primary" gutterBottom>
          Kami Sahabat Terbaik Anda...
        </Typography>
        <Typography variant="body2" gutterBottom>
          Sahabatku, kebaikan adalah sesuatu yang sangat berharga. Tanpanya,
          dunia yang fana ini akan dipenuhi dengan keburukan dan kerusakan.
          Banyak tokoh-tokoh yang menginspirasi kita untuk terus berbuat baik,
          menciptakan kebaikan, hingga mengabadikan kebaikan. Salah satu yang
          paling berpengaruh di dunia sepanjang zaman, Ia adalah Muhammad
          Shallallaahu ‘alaihi wa sallam.{' '}
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Link href="/">SahabatKebaikan.org</Link> hadir dalam rangka menjadi
          bagian dari semangat berbuat baik, menciptakan kebaikan, dan
          mengabadikan kebaikan bersama-sama. Kami percaya, bahwa kebaikan yang
          dibangun dengan ruh kolaborasi, maka akan terjadi Quantum yang akan
          mempercepat tersebarnya kebaikan hingga ke pelosok negeri dan penjuru
          dunia.
        </Typography>
        <Typography variant="body2" gutterBottom>
          <Link href="/">SahabatKebaikan.org</Link> adalah platform donasi
          online yang mengajak siapa saja untuk berkolaborasi membangun
          kepedulian, persaudaraan, dan kemanusiaan secara profesional dan
          syar’i. Menyebarkan kebaikan untuk seluruh alam. Menjadi sahabat baik
          yang terbaik untuk anda dan kita semua.
        </Typography>
      </Box>
      <Box>
        <Typography variant="h6" color="primary" gutterBottom>
          Mengapa memilih SahabatKebaikan.org sebagai sahabat donasi anda?
        </Typography>
        <List dense>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Program/Proyek{' '}
                  <span className={classes.listText}>Terverifikasi</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Tim yang memiliki{' '}
                  <span className={classes.listText}>Integritas </span>
                  dan <span className={classes.listText}>Dedikasi Tinggi</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Mitra
                  <span className={classes.listText}> Profesional</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  <span className={classes.listText}>Partner Lapangan </span>
                  bagian dari Tim Kami
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Partner Lapangan{' '}
                  <span className={classes.listText}>Terlatih </span>
                  dan <span className={classes.listText}>Didampingi</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Anda bisa menjadi lagi{' '}
                  <span className={classes.listText}>Fundraiser </span>
                  dan membantu lebih banyak orang
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Sistem Donasi
                  <span className={classes.listText}> Lebih Mudah</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Data Tersimpan dengan
                  <span className={classes.listText}> Aman</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Dapat berdonasi atas nama sendiri, orang tua, atau sebagai
                  <span className={classes.listText}> Hamba Allah</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Update Program/Proyek dilakukan secara
                  <span className={classes.listText}> periodik</span>
                </Typography>
              }
            />
          </ListItem>
          <ListItem>
            <ListItemIcon className={classes.listIcon}>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography variant="body2">
                  Laporan Pertanggungjawaban dapat
                  <span className={classes.listText}> diunduh</span>
                </Typography>
              }
            />
          </ListItem>
        </List>
      </Box>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          startIcon={<RedeemIcon />}
          onClick={() => router.push('/')}
        >
          Mulai Berdonasi
        </Button>
      </Box>
    </Box>
    // </Box>
  );
};

export default AboutScreen;
