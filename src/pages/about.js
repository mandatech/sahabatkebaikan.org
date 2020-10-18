import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Copyright from 'components/Copyright';
import Layout from 'components/Layout';
import Link from 'components/Link';
import ProTip from 'components/ProTip';
import React from 'react';

export default function About() {
  return (
    <Layout container="paper">
      <Box m={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          naked
          href="/"
        >
          Go to the main page
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Layout>
  );
}
