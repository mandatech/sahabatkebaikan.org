import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import Switch from '@material-ui/core/Switch';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import formatCurrency from 'utils/formatCurrency';
// import { createDonation } from 'services/donation.service';
import { useDonation } from 'context/donation.context';
import { useFormik } from 'formik';
import * as fbq from 'libs/fbpixel';
import LogoOy from '../../../../public/images/logo-oy.png';
import LogoMoota from '../../../../public/images/logo-moota.png';
import LogoBI from '../../../../public/images/logo-bi.png';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '8px 16px 8px 16px',
    paddingBottom: 24,
    marginBottom: 56,
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
  acionButton: {
    position: 'fixed',
    padding: 8,
    bottom: 0,
    width: '100%',
    maxWidth: 446,
    background: theme.palette.background.default,
  },
}));

const DonationAmountScreen = ({ campaign }) => {
  const classes = useStyles();
  const router = useRouter();
  const { donationValue, setDonationValue } = useDonation();
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      full_name: '',
      email: '',
      phone: '',
      amount: 100000,
      is_anonymous: false,
      infaq: false,
      infaqPercent: 5,
      note: '',
    },
    // validationSchema: validationSchema,
    validate: (values) => {
      const errors = {};

      if (values.amount < 10000) {
        errors.amount = 'Nominal donasi paling sedikit Rp10.000';
      }

      if (!values.full_name) {
        errors.full_name = 'Nama tidak boleh kosong.';
      }

      if (!values.phone) {
        errors.phone = 'Nomor telepon tidak boleh kosong.';
      }

      if (values.phone && !/^\d+$/i.test(values.phone)) {
        errors.phone = 'Nomor telepon tidak valid.';
      }

      if (values.phone?.length < 8) {
        errors.phone = 'Nomor telepon tidak valid.';
      }

      if (!values.email) {
        errors.email = 'Email tidak boleh kosong.';
      } else if (
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
      ) {
        errors.email = 'Email tidak valid.';
      }

      return errors;
    },
    onSubmit: () => {
      // alert(JSON.stringify(values, null, 2));
      handleSetDonationValue();
    },
  });

  const [predefinedAmounts, setPredefinedAmounts] = useState([
    {
      value: 100000,
      selected: true,
    },
    {
      value: 200000,
      selected: false,
    },
    {
      value: 500000,
      selected: false,
    },
    {
      value: 1000000,
      selected: false,
    },
  ]);

  const { slug } = router.query;

  const changeSelected = (i) => {
    const newPredefinedAmounts = predefinedAmounts.map((amount) => ({
      value: amount.value,
      selected: false,
    }));
    if (i >= 0) {
      newPredefinedAmounts[i].selected = !newPredefinedAmounts[i].selected;
      formik.setFieldValue('amount', newPredefinedAmounts[i].value);
    }

    setPredefinedAmounts(newPredefinedAmounts);
  };

  const getTotal = () => {
    if (formik.values.infaq) {
      return (
        Number(formik.values.amount) +
        (Number(formik.values.amount) * Number(formik.values.infaqPercent)) /
          100
      );
    }
    return Number(formik.values.amount);
  };

  const handleSetDonationValue = () => {
    setIsLoading(true);
    setDonationValue({
      full_name: formik.values.full_name,
      email: formik.values.email,
      phone: formik.values.phone,
      campaign: campaign,
      campaign_id: campaign.id,
      donation_amount: Number(formik.values.amount),
      infaq_amount: formik.values.infaq
        ? (Number(formik.values.amount) * Number(formik.values.infaqPercent)) /
          100
        : 0,
      is_anonymous: formik.values.is_anonymous,
      note: formik.values.note,
    });

    if (campaign?.campaigner?.pixel_id) {
      fbq.event('InitiateCheckout', campaign.campaigner.pixel_id, {
        content_name: campaign.title,
        value: getTotal(),
        donation_value: Number(formik.values.amount),
        infaq_value: formik.values.infaq
          ? (Number(formik.values.amount) *
              Number(formik.values.infaqPercent)) /
            100
          : 0,
        currency: 'IDR',
        campaign_url: `${window.location.origin}/campaign/${campaign.slug}`,
        source: window.location.hostname,
      });
    }

    router.push(`/campaign/${slug}/donation-payment`);
  };

  React.useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      // handleValidateToken();
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));
      setProfile(dataLogin.user);

      if (dataLogin) {
        formik.setValues({
          full_name: dataLogin.user.full_name,
          email: dataLogin.user.email,
          phone: dataLogin.user.phone,
          amount: 100000,
          is_anonymous: false,
          infaq: false,
          infaqPercent: 5,
          note: '',
        });
      }
    }

    if (donationValue.campaign_id === campaign.id) {
      const values = {
        full_name: donationValue.full_name,
        email: donationValue.email,
        phone: donationValue.phone,
        amount: donationValue.donation_amount,
        infaq: donationValue.infaq_amount > 0 ? true : false,
        is_anonymous: donationValue.is_anonymous,
        note: donationValue.note,
        infaqPercent:
          (donationValue.infaq_amount / donationValue.donation_amount) * 100,
      };

      formik.setValues(values);

      const newPredefinedAmounts = predefinedAmounts.map((amount) => ({
        value: amount.value,
        selected: amount.value === donationValue.donation_amount ? true : false,
      }));

      setPredefinedAmounts(newPredefinedAmounts);
    }
  }, []);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box className={classes.root}>
        <Typography variant="caption">
          Pilih nominal donasi atau nominal lannya dengan memasukan pada kolom
        </Typography>
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
          label="Nominal Donasi"
          size="small"
          variant="filled"
          name="amount"
          type="number"
          value={formik.values.amount}
          onChange={(e) => {
            formik.handleChange(e);
            changeSelected();
          }}
          // onChange={handleAmountChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">Rp</InputAdornment>
            ),
          }}
          error={formik.touched.amount && Boolean(formik.errors.amount)}
          helperText={formik.touched.amount && formik.errors.amount}
        />

        <Divider />

        {profile ? (
          <Typography variant="subtitle1">
            {profile.full_name} <br />{' '}
            <Typography variant="body2" color="textSecondary">
              {profile.email} <br />
              {profile.phone}
            </Typography>
          </Typography>
        ) : (
          <>
            <TextField
              fullWidth
              label="Nama"
              size="small"
              variant="outlined"
              name="full_name"
              value={formik.values.full_name}
              onChange={formik.handleChange}
              error={
                formik.touched.full_name && Boolean(formik.errors.full_name)
              }
              helperText={formik.touched.full_name && formik.errors.full_name}
            />
            <TextField
              fullWidth
              label="Email"
              size="small"
              variant="outlined"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              label="Nomor Telepon"
              size="small"
              variant="outlined"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              error={formik.touched.phone && Boolean(formik.errors.phone)}
              helperText={formik.touched.phone && formik.errors.phone}
            />
          </>
        )}

        {/* <Typography variant="body2" color="textSecondary"></Typography> */}
        <Grid container justify="space-between" alignItems="center">
          <Grid item xs>
            <Typography variant="body2">
              Sembunyikan nama saya (Hamba Allah)
            </Typography>
          </Grid>

          <Grid item>
            <Switch
              checked={formik.values.is_anonymous}
              onChange={formik.handleChange}
              color="secondary"
              name="is_anonymous"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </Grid>
        </Grid>

        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs>
              <Typography variant="body2">
                Infaq untuk Sahabatkebaikan
              </Typography>
            </Grid>

            <Grid item>
              <Switch
                checked={formik.values.infaq}
                onChange={formik.handleChange}
                color="secondary"
                name="infaq"
                inputProps={{ 'aria-label': 'primary checkbox' }}
              />
            </Grid>
          </Grid>
          {formik.values.infaq && (
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
                    value={formik.values.infaqPercent}
                    onChange={formik.handleChange}
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
            placeholder="Tulis dukungan atau doa untuk penggalang ini"
            multiline
            rows={3}
            name="note"
            value={formik.values.note}
            onChange={formik.handleChange}
          />
        </Grid>

        <Divider />

        <Grid container direction="column">
          <Grid item container justify="space-between" alignItems="center">
            <Grid item xs>
              <Typography variant="body2">
                Donasi untuk pengalang dana
              </Typography>
            </Grid>

            <Grid item>
              <Typography variant="body2">
                Rp {formatCurrency.format(formik.values.amount)}
              </Typography>
            </Grid>
          </Grid>

          {formik.values.infaq && (
            <Grid item container justify="space-between" alignItems="center">
              <Grid item xs>
                <Typography variant="body2">
                  Infaq untuk pemeliharaan sistem
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant="body2">
                  +{formatCurrency.format(formik.values.infaqPercent)}%
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

        <Grid
          item
          justify="space-between"
          alignItems="center"
          style={{ marginTop: 16 }}
        >
          <Typography variant="body2">
            Pembayaran donasi didukung oleh:
          </Typography>
        </Grid>

        <Grid item container justify="space-evenly">
          <Grid item>
            <Image
              alt=""
              src={LogoOy}
              placeholder="blur"
              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAD0lEQVR42mMM9Q6tZ4ACAA8YAXYxKl3dAAAAAElFTkSuQmCC`}
              width={60}
              height={40}
            />
          </Grid>
          <Grid item>
            <Image
              alt=""
              src={LogoMoota}
              placeholder="blur"
              blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAD0lEQVR42mMM9Q6tZ4ACAA8YAXYxKl3dAAAAAElFTkSuQmCC`}
              width={120}
              height={40}
            />
          </Grid>
        </Grid>

        <Grid item style={{ marginTop: 16 }}>
          <Image
            alt=""
            src={LogoBI}
            placeholder="blur"
            blurDataURL={`data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAMAAAABCAYAAAAb4BS0AAAAD0lEQVR42mMM9Q6tZ4ACAA8YAXYxKl3dAAAAAElFTkSuQmCC`}
            width={90}
            height={30}
          />
          <Typography variant="body2">
            *Oy! Diawasi oleh Bank Indonesia
          </Typography>
        </Grid>
      </Box>
      <Box className={classes.acionButton}>
        <Button
          variant="contained"
          color="secondary"
          disabled={isLoading}
          fullWidth
          style={{ height: 50 }}
          onClick={formik.submitForm}
        >
          {isLoading && (
            <CircularProgress
              size={20}
              style={{ marginRight: 8 }}
              color="secondary"
            />
          )}
          Lanjut Pembayaran
        </Button>
      </Box>
    </form>
  );
};

DonationAmountScreen.propTypes = {
  campaign: PropTypes.object,
};

export default DonationAmountScreen;
