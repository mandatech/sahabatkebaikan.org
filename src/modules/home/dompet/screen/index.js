import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import DompetIcon from 'assets/icons/dompet.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: '8px 16px',
  },
  dompetIcon: {
    marginRight: theme.spacing(2),
  },
  isiSaldo: {
    borderRadius: 8,
    marginLeft: 'auto',
    height: 33,
    width: 90,
  },
}));

const Dompet = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <DompetIcon className={classes.dompetIcon} />
      <Box display="flex" flexDirection="column">
        <span style={{ fontWeight: 600 }}>Rp 120.000</span>
        <span style={{ fontSize: 12, color: '#7D7D7D' }}>Dompet Kebaikan</span>
      </Box>
      <Button
        className={classes.isiSaldo}
        variant="outlined"
        color="primary"
        size="small"
      >
        Isi Saldo
      </Button>
    </Paper>
  );
};

export default Dompet;
