function getValue(funded, target) {
  if (funded > target) return 100;
  return (funded * 100) / target;
}

export default getValue;
