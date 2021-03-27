import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import DialogContent from '@material-ui/core/DialogContent';

const useStyles = makeStyles(() => ({
  top: {
    margin: '0 0 16px 0',
    padding: '0 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logoContainer: {
    width: '100%',
    padding: 8,
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: ' 0px 2px 6px rgba(0, 0, 0, 0.25)',
  },
  accounNumber: {
    width: '100%',
    background: '#EDEDED',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginTop: 16,
  },
  paymentLimit: {
    border: '1px solid #DEDEDE',
    borderRadius: 2,
    boxSizing: 'border-box',
    padding: 16,
    marginTop: 8,
  },
  totalDonation: {
    padding: 16,
  },
  paymentLink: {
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  zipayLogo: {
    width: 88,
    height: 32,
    objectFit: 'cover',
    borderRadius: 8,
    marginBottom: 8,
  },
  actionButton: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    // border: 'solid pink 1px',
  },
}));

const ThankyouPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [profile, setProfile] = useState();

  useEffect(() => {
    if (localStorage.getItem('token') && localStorage.getItem('data_login')) {
      const dataLogin = JSON.parse(localStorage.getItem('data_login'));
      setProfile(dataLogin.user);
    }
  }, []);

  return (
    <DialogContent dividers style={{ padding: '16px 0' }}>
      {profile && (
        <Box className={classes.totalDonation}>
          <Typography variant="body1" align="center">
            Terima kasih {profile.full_name} atas donasinya. Semoga Allah
            luaskan rejekinya dan mudahkan segala urusannya.
          </Typography>
        </Box>
      )}

      <Box className={classes.actionButton} px={2}>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          style={{ height: 50 }}
          onClick={() => {
            // handleClose();
            router.push('/');
          }}
        >
          Tutup
        </Button>
      </Box>
    </DialogContent>
  );
};

export default ThankyouPage;
