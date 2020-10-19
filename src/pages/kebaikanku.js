import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Copyright from 'components/Copyright';
import Header from 'components/Header';
import Layout from 'components/Layout';
import Link from 'components/Link';
import ProTip from 'components/ProTip';
import React from 'react';

export default function Index() {
  return (
    <>
      <Layout container="paper" menu={0}>
        <Header title="Kebaikanku" />
        <Box m={4}>
          <Typography variant="h4" component="h1" gutterBottom>
            Kebaikanku
          </Typography>
          <Link href="/" color="secondary">
            Ke halaman Donasi
          </Link>
          <ProTip />
          <Copyright />
        </Box>
      </Layout>
    </>
  );
}
