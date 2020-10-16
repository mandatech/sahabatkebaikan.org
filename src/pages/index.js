import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Copyright from '../components/Copyright';
import Layout from '../components/Layout';
import Link from '../components/Link';
import ProTip from '../components/ProTip';

export default function Index() {
  return (
    <Layout container="paper">
      <Box m={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Link href="/about" color="secondary">
          Go to the about page
        </Link>
        <ProTip />
        <Copyright />
      </Box>
    </Layout>
  );
}
