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

const DompetContainer = () => (
  <Box px={2} style={{ position: 'absolute', bottom: -28, width: '100%' }}>
    <Dompet />
  </Box>
);

export default function Index() {
  const router = useRouter();

  return (
    <>
      <Layout menu={1} withBottomNav>
        <Header
          icon={<SahabatkebaikanIcon />}
          title="Cari yang ingin kamu bantu"
          dompet={<DompetContainer />}
          searchbox
          SearchBoxProps={{
            onClick: () => router.push('/cari'),
          }}
        />
        <Slideshow />
        <CategoryList />
        <ActionButton />
        <CampaignList />
      </Layout>
    </>
  );
}
