import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Layout from 'components/Layout';
import Header from 'components/Header';
import Loading from 'components/Loading';
import { useToast } from 'libs/toast';

import { verifyEmail } from 'services/auth.service';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    padding: 24,
  },
  form: {
    '& > *': {
      margin: '8px 0',
    },
  },
}));

const VerifyEmailPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState();

  const { token } = router.query;

  const handleVerifyEmail = async (token) => {
    try {
      setLoading(true);
      const data = await verifyEmail(token);

      setTimeout(() => {
        setMessage(
          `Sahabat ${data.user.full_name}, terima kasih telah memverifikasi emailnya.`
        );
        setLoading(false);
      }, [300]);
    } catch (error) {
      if (error.response) {
        if (error.response.status === 400) {
          setMessage(
            'Oh, link sudah tidak valid. Silakan lakukan permintaan verifikasi ulang di halaman profil'
          );
        } else {
          setMessage(error.response.data.message);
          toast.showMessage(error.response.data.message, 'error');
        }
      } else if (error.request) {
        setMessage('Network Error');
        toast.showMessage('Network Error', 'error');
      } else {
        setMessage(error.message);
        toast.showMessage(error.message, 'error');
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      handleVerifyEmail(token);
    }
  }, [token]);

  return (
    <Layout
      header={
        <Header
          title="Verifikasi Email"
          backButton={true}
          color="inherit"
          elevation={0}
          classes={{
            root: classes.headerRoot,
          }}
        />
      }
    >
      <Box className={classes.root}>
        {loading ? (
          <Loading open={loading} hideBackdrop />
        ) : (
          message && (
            <div>
              <Typography
                style={{ marginBottom: 24 }}
                color="primary"
                align="center"
                variant="body1"
              >
                {message}
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => router.push('/')}
              >
                Kembali ke Home
              </Button>
            </div>
          )
        )}
      </Box>
    </Layout>
  );
};

export default VerifyEmailPage;
