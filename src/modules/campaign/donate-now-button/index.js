import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    maxWidth: 446,
    padding: 8,
    background: theme.palette.background.default,
    // border: 'solid pink 1px',
  },
  button: {
    height: 50,
  },
}));

const DonateNowButton = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Button
        className={classes.button}
        variant="contained"
        color="secondary"
        fullWidth
      >
        Donasi
      </Button>
    </Box>
  );
};

export default DonateNowButton;
