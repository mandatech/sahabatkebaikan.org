import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    padding: '16px 16px',
    marginTop: 8,
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '4px 0',
    },
  },
}));

const ActionButton = () => {
  const classes = useStyles();
  const campaignerSiteUrl =
    process.env.NEXT_PUBLIC_CAMPAIGNER_SITE_URL ||
    'https://campaigner.sahabatkebaikan.org';

  const affiliateSiteUrl =
    process.env.NEXT_PUBLIC_AFFILIATE_SITE_URL ||
    'https://relawan.sahabatkebaikan.org';

  return (
    <Box className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        href={campaignerSiteUrl}
        target="_blank"
      >
        Ingin menggalang dana?
      </Button>
      <Button
        variant="outlined"
        color="primary"
        href={affiliateSiteUrl}
        target="_blank"
      >
        Ingin menyebarkan kebaikan?
      </Button>
    </Box>
  );
};

export default ActionButton;
