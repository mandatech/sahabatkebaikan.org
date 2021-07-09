import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan_icon_white.svg';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ActionButton from 'modules/home/action-button';
import CampaignList from 'modules/home/campaign-list/screen';
import CategoryList from 'modules/home/category/screen';
import Dompet from 'modules/home/dompet/screen';
import Slideshow from 'modules/home/slideshow/screen';
import { useRouter } from 'next/router';
import React from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 446,
    background: theme.palette.background.paper,
    paddingTop: 8,
    paddingBottom: 8,
  },
}));

const DompetContainer = () => {
  const classes = useStyles();

  return (
    <Box px={2} className={classes.root}>
      <Dompet />
    </Box>
  );
};

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Layout
        menu={1}
        withBottomNav
        header={
          <Header
            icon={<SahabatkebaikanIcon />}
            title="Cari yang ingin kamu bantu"
            searchbox
            SearchBoxProps={{
              onClick: () => router.push('/cari'),
            }}
          />
        }
      >
        <DompetContainer />
        <Slideshow />
        <CategoryList />
        <ActionButton />
        <CampaignList />
      </Layout>
    </>
  );
}
