import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import DompetScreen from 'modules/home/dompet/screen';

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  dompetContainer: {
    padding: 16,
    background: theme.palette.background.paper,
  },
  transactionList: {
    flex: 1,
    padding: 16,
    marginTop: 8,
    background: theme.palette.background.paper,
  },
  transactionItem: {
    margin: '16px 0',
  },
}));

const ZipayHome = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.dompetContainer}>
        <DompetScreen />
      </Box>

      <Box className={classes.transactionList}>
        <Typography
          variant="body1"
          gutterBottom
          style={{ fontWeight: 500, fontSize: 16 }}
        >
          Riwayat Transaksi
        </Typography>
        {[1, 2, 3, 4].map((i) => (
          <div key={i}>
            <Grid container className={classes.transactionItem}>
              <Grid item container direction="column" xs>
                <Typography variant="body1">Isi Saldo</Typography>
                <Typography variant="caption" color="textSecondary">
                  15 Februari 2021
                </Typography>
              </Grid>
              <Grid item container xs justify="flex-end" direction="column">
                <Typography variant="body1" color="textSecondary" align="right">
                  + Rp50.000
                </Typography>
                <Typography
                  variant="caption"
                  color="textSecondary"
                  align="right"
                >
                  dibatalkan
                </Typography>
              </Grid>
            </Grid>
            <Divider />
          </div>
        ))}
      </Box>
    </Box>
  );
};

export default ZipayHome;
