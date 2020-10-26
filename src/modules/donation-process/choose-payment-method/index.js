import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BNIIcon from 'assets/icons/bni_icon.svg';
import DompetIcon from 'assets/icons/dompet_without_circle.svg';
import MandiriIcon from 'assets/icons/mandiri_icon.svg';
import OtherBank from 'assets/icons/other_bank.svg';
import PermataIcon from 'assets/icons/permata_icon.svg';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    background: theme.palette.background.paper,
    '& > *': {
      margin: '8px 0',
    },
  },
}));

const PaymentMethod = () => {
  const classes = useStyles();
  const router = useRouter();
  const { slug } = router.query;

  return (
    <Box className={classes.root}>
      <Grid container style={{ background: '#DEDEDE', padding: 16, margin: 0 }}>
        <Typography variant="body2">Pembayaran Instan</Typography>
      </Grid>
      <List component="nav" aria-label="instant-payment">
        <ListItem button>
          <ListItemIcon>
            <DompetIcon />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Dompet Kebaikan</Typography>
            <Typography variant="caption" color="textSecondary">
              Bayar dengan saldo Dompet Kebaikan Anda
            </Typography>
          </Box>
        </ListItem>
      </List>
      <Grid container style={{ background: '#DEDEDE', padding: 16 }}>
        <Typography variant="body2">Pembayaran Transfer</Typography>
      </Grid>
      <List component="nav" aria-label="transfer-payment">
        <ListItem
          button
          onClick={() => router.push(`/campaign/${slug}/summary`)}
        >
          <ListItemIcon>
            <MandiriIcon />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Mandiri</Typography>
            <Typography variant="caption" color="textSecondary">
              Bayar dengan Mandiri ATM atau Internet Banking
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          button
          onClick={() => router.push(`/campaign/${slug}/summary`)}
        >
          <ListItemIcon>
            <BNIIcon />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">BNI</Typography>
            <Typography variant="caption" color="textSecondary">
              Bayar dengan BNI ATM atau Internet Banking
            </Typography>
          </Box>
        </ListItem>
        <ListItem
          button
          onClick={() => router.push(`/campaign/${slug}/summary`)}
        >
          <ListItemIcon>
            <PermataIcon />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">Permata</Typography>
            <Typography variant="caption" color="textSecondary">
              Bayar dengan Permata ATM atau Internet Banking
            </Typography>
          </Box>
        </ListItem>
        <ListItem button>
          <ListItemIcon>
            <OtherBank />
          </ListItemIcon>
          <Box>
            <Typography variant="body2">ATM Network</Typography>
            <Typography variant="caption" color="textSecondary">
              Bayar dengan Bank Lainnya
            </Typography>
          </Box>
        </ListItem>
      </List>
    </Box>
  );
};

export default PaymentMethod;
