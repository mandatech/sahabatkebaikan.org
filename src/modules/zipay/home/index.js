import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';
import { makeStyles } from '@material-ui/core/styles';
import DompetScreen from 'modules/home/dompet/screen';
import { getTransactionHistory } from 'services/zipay.service';
import DataNotFound from 'components/DataNotFound';
import moment from 'moment';
import formatCurrency from 'utils/formatCurrency';

moment.locale('id');

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

const renderTransactionType = (type) => {
  if (type === 'topup') {
    return 'Isi Saldo';
  } else if (type === 'donation_payment') {
    return 'Pembayaran Donasi';
  } else {
    return type;
  }
};

const renderAmount = (type, amount) => {
  if (type === 'topup') {
    return '+ Rp' + formatCurrency.format(amount);
  } else if (type === 'donation_payment') {
    return '- Rp' + formatCurrency.format(amount);
  } else {
    return '-';
  }
};

const ZipayHome = () => {
  const classes = useStyles();
  const { data, error, isFetching } = getTransactionHistory();

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
        {isFetching ? (
          [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <Skeleton
              key={i}
              variant="rect"
              width="100%"
              height={40}
              style={{ marginTop: 8 }}
            />
          ))
        ) : data?.length ? (
          data.map((campaign, i) => (
            <div key={i}>
              <Grid container className={classes.transactionItem}>
                <Grid item container direction="column" xs>
                  <Typography variant="body1">
                    {renderTransactionType(campaign.type)}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {moment(campaign.date).format('DD MMMM YYYY')}
                  </Typography>
                </Grid>
                <Grid item container xs justify="flex-end" direction="column">
                  <Typography
                    variant="body1"
                    color="textSecondary"
                    align="right"
                  >
                    {renderAmount(campaign.type, campaign.amount)}
                  </Typography>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    align="right"
                  >
                    {campaign.status}
                  </Typography>
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))
        ) : error ? (
          <p style={{ color: 'red' }}>{error.message}</p>
        ) : (
          <div style={{ marginTop: 16 }}>
            <DataNotFound message="Belum ada riwayat transaksi" />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default ZipayHome;
