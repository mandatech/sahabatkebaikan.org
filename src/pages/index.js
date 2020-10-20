import Box from '@material-ui/core/Box';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan_icon_white.svg';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CampaignList from 'modules/home/campaign-list/screen';
import CategoryList from 'modules/home/category/screen';
import Dompet from 'modules/home/dompet/screen';
import Slideshow from 'modules/home/slideshow/screen';
import React from 'react';

const DompetContainer = () => (
  <Box px={2} style={{ position: 'absolute', bottom: -28, width: '100%' }}>
    <Dompet />
  </Box>
);

export default function Index() {
  return (
    <>
      <Layout menu={1} withBottomNav>
        <Header
          icon={<SahabatkebaikanIcon />}
          title="Cari yang ingin kamu bantu"
          dompet={<DompetContainer />}
          searchbox
        />
        {/* <Box mx={2} mt={5}> */}
        <Slideshow />
        <CategoryList />
        {/* <Divider style={{ height: 10, background: '#F7F7F7' }} /> */}
        <CampaignList />
      </Layout>
    </>
  );
}
