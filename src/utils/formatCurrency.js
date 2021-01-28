const formatCurrency = new Intl.NumberFormat('id-ID', {
  style: 'decimal',
  maximumFractionDigits: 0,
  minimumFractionDigits: 0,
});

export default formatCurrency;
