import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CalculatorIcon from 'assets/icons/calculator.svg';
import QuestionMarkIcon from 'assets/icons/question_mark.svg';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const ZakatMenu = () => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <Box className={classes.root}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        Ingin menghitung zakat yang harus Anda keluarkan?
      </Typography>
      <Grid container justify="space-between" spacing={2} alignItems="center">
        <Grid item xs>
          <Button
            style={{ height: 48 }}
            variant="outlined"
            startIcon={<CalculatorIcon />}
            fullWidth
            onClick={() => router.push('/zakah-calculator')}
          >
            Kalkulator
          </Button>
        </Grid>
        <Grid item xs>
          <Button
            style={{ height: 48 }}
            variant="outlined"
            startIcon={<QuestionMarkIcon />}
            fullWidth
          >
            Konsultasi
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ZakatMenu;
