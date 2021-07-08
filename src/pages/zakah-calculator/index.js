import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import BackIcon from '@material-ui/icons/ChevronLeft';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import Layout from 'components/Layout';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    // marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
  zakahAmount: {
    width: '100%',
    background: '#EDEDED',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
}));

function NumberFormatCustom(props) {
  const { inputRef, onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={(values) => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        });
      }}
      thousandSeparator="."
      decimalSeparator=","
      isNumericString
      prefix="Rp"
    />
  );
}

NumberFormatCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const ZakahCalculator = () => {
  const classes = useStyles();
  const [values, setValues] = useState({
    savings: 0,
    gold: 0,
    credit: 0,
    stock: 0,
    zakah: 0,
  });

  const countZakah = () => {
    const zakah =
      (values.savings + values.credit + values.gold + values.stock) * 0.025;
    console.log(
      'zakah =>',
      values.savings + values.credit + values.gold + values.stock
    );
    setValues({
      ...values,
      zakah,
    });
  };

  const resetValue = () => {
    setValues({
      savings: 0,
      gold: 0,
      credit: 0,
      stock: 0,
      zakah: 0,
    });
  };

  const handleChange = (event) => {
    console.log('event', event);
    setValues({
      ...values,
      [event.target.name]: Number(event.target.value),
    });
  };

  useEffect(() => {
    console.log('values', values);
  }, [values]);

  return (
    <Layout
      container="paper"
      header={
        <Header
          title="Kalkulator Zakat"
          icon={<BackIcon />}
          backButton={true}
          TitleProps={{ align: 'left' }}
          color="inherit"
          elevation={0}
          classes={{
            root: classes.headerRoot,
          }}
        />
      }
    >
      <Box className={classes.root}>
        <FormControl margin="normal">
          <InputLabel htmlFor="savings" style={{ fontSize: 18 }}>
            Uang Tunai, Tabungan, Deposito
          </InputLabel>
          <Input
            value={values.savings}
            onChange={handleChange}
            name="savings"
            id="savings"
            inputComponent={NumberFormatCustom}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="gold" style={{ fontSize: 18 }}>
            Nilai Emas dan Perak
          </InputLabel>
          <Input
            value={values.gold}
            onChange={handleChange}
            name="gold"
            id="gold"
            inputComponent={NumberFormatCustom}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="credit" style={{ fontSize: 18 }}>
            Piutang
          </InputLabel>
          <Input
            value={values.credit}
            onChange={handleChange}
            name="credit"
            id="credit"
            inputComponent={NumberFormatCustom}
          />
        </FormControl>
        <FormControl margin="normal">
          <InputLabel htmlFor="stock" style={{ fontSize: 18 }}>
            Nilai Jual Saham, Saham, Obligasi, dll
          </InputLabel>
          <Input
            value={values.stock}
            onChange={handleChange}
            name="stock"
            id="stock"
            inputComponent={NumberFormatCustom}
          />
        </FormControl>
        <Box mt={4} mb={4} textAlign="center" className={classes.zakahAmount}>
          <Typography gutterBottom>
            Besar Zakat yang harus Anda keluarkan:
          </Typography>
          <Typography variant="h4">
            {values.zakah.toLocaleString('id-ID', {
              currency: 'IDR',
              style: 'currency',
            })}
          </Typography>
        </Box>
        <Box display="flex">
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ margin: 8 }}
            onClick={resetValue}
          >
            Reset
          </Button>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            style={{ margin: 8 }}
            onClick={countZakah}
          >
            Hitung
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default ZakahCalculator;
