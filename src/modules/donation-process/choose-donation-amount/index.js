import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import formatCurrency from 'utils/formatCurrency';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px 16px 8px 16px',
    background: theme.palette.background.paper,
    '& > *': {
      margin: '8px 0',
    },
  },
  predefinedAmounts: {
    width: '100%',
    height: '100%',
    minHeight: 40,
    maxWidth: 100,
    fontSize: 11,
    textTransform: 'capitalize',
  },
}));

const DonationAmountScreen = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;
  const [values, setValues] = useState({
    amount: 0,
    anonim: false,
    infaq: false,
    infaqPercent: 5,
    note: '',
  });
  const [predefinedAmounts, setPredefinedAmounts] = useState([
    {
      value: 10000,
      selected: false,
    },
    {
      value: 50000,
      selected: false,
    },
    {
      value: 100000,
      selected: false,
    },
    {
      value: 200000,
      selected: false,
    },
  ]);

  const changeSelected = (i) => {
    console.log('i', i);
    const newPredefinedAmounts = predefinedAmounts.map((amount) => ({
      value: amount.value,
      selected: false,
    }));
    if (i >= 0) {
      newPredefinedAmounts[i].selected = !newPredefinedAmounts[i].selected;
      setValues({ ...values, amount: newPredefinedAmounts[i].value });
    }

    setPredefinedAmounts(newPredefinedAmounts);
    // setAmount(newPredefinedAmounts[i].value);
  };

  const handleChangeValue = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleChangeChecked = (e) => {
    setValues({ ...values, [e.target.name]: e.target.checked });
  };

  const getTotal = () => {
    if (values.infaq) {
      return (
        Number(values.amount) +
        (Number(values.amount) * Number(values.infaqPercent)) / 100
      );
    }
    return Number(values.amount);
  };

  const handleAmountChange = (e) => {
    handleChangeValue(e);
    changeSelected();
  };

  return (
    <Box className={classes.root}>
      <Grid container style={{}}>
        {predefinedAmounts.map((amount, i) => (
          <Grid item xs style={{ padding: 4 }} key={i}>
            <Button
              className={classes.predefinedAmounts}
              variant={amount.selected ? 'contained' : 'outlined'}
              color={amount.selected ? 'secondary' : 'default'}
              onClick={() => changeSelected(i)}
            >
              Rp {formatCurrency.format(amount.value)}
            </Button>
          </Grid>
        ))}
      </Grid>
      <TextField
        fullWidth
        label="Jumlah"
        size="small"
        variant="filled"
        name="amount"
        type="number"
        value={values.amount}
        onChange={handleAmountChange}
        InputProps={{
          startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
        }}
      />

      <Typography variant="caption">
        Pilih nominal donasi atau nominal lannya dengan memasukan pada kolom
      </Typography>

      <Divider />

      <Grid container justify="space-between" alignItems="center">
        <Grid item xs>
          <Typography variant="body2">
            Sembunyikan nama saya (Hamba Allah)
          </Typography>
        </Grid>

        <Grid item>
          <Switch
            checked={values.anonim}
            onChange={handleChangeChecked}
            color="secondary"
            name="anonim"
            inputProps={{ 'aria-label': 'primary checkbox' }}
          />
        </Grid>
      </Grid>

      <Grid container direction="column">
        <Grid item container justify="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="body2">Infaq untuk Sahabatkebaikan</Typography>
          </Grid>

          <Grid item>
            <Switch
              checked={values.infaq}
              onChange={handleChangeChecked}
              color="secondary"
              name="infaq"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
        </Grid>
        {values.infaq && (
          <Grid item container justify="space-between" alignItems="center">
            <Grid item style={{ marginLeft: 16 }} xs>
              <Typography variant="body2" color="textSecondary">
                Infaq untuk pemeliharaan sistem
              </Typography>
            </Grid>

            <Grid item>
              <FormControl variant="filled" size="small" hiddenLabel>
                <Select
                  defaultValue={5}
                  name="infaqPercent"
                  value={values.infaqPercent}
                  onChange={handleChangeValue}
                  input={<FilledInput />}
                >
                  <MenuItem value={5}>5%</MenuItem>
                  <MenuItem value={15}>15%</MenuItem>
                  <MenuItem value={25}>25%</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        )}
      </Grid>

      <Grid container direction="column">
        <Typography variant="body2" gutterBottom>
          Dukungan (opsional)
        </Typography>

        <TextField
          variant="outlined"
          color="secondary"
          placeholder="Tulis dukungan atau doa untuk penggalang ini"
          multiline
          rows={3}
          name="note"
          value={values.note}
          onChange={handleChangeValue}
        />
      </Grid>

      <Divider />

      <Grid container direction="column">
        <Grid item container justify="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="body2">Donasi untuk pengalang dana</Typography>
          </Grid>

          <Grid item>
            <Typography variant="body2">
              Rp {formatCurrency.format(values.amount)}
            </Typography>
          </Grid>
        </Grid>

        {values.infaq && (
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs>
              <Typography variant="body2">
                Infaq untuk pemeliharaan sistem
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2">
                +{formatCurrency.format(values.infaqPercent)}%
              </Typography>
            </Grid>
          </Grid>
        )}

        <Grid
          item
          container
          justify="space-between"
          alignItems="center"
          style={{ marginTop: 16 }}
        >
          <Grid item xs>
            <Typography variant="h6">Total</Typography>
          </Grid>

          <Grid item>
            <Typography variant="h6">
              Rp {formatCurrency.format(getTotal())}
            </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Button
        variant="contained"
        color="secondary"
        disabled={!values.amount}
        fullWidth
        style={{ height: 50 }}
        onClick={() => router.push(`/campaign/${slug}/donation-payment`)}
      >
        Lanjut
      </Button>
    </Box>
  );
};

export default DonationAmountScreen;
