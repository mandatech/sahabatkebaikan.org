import Box from '@material-ui/core/Box';
import Divider from '@material-ui/core/Divider';
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
      <Layout menu={1}>
        <Header
          icon={<SahabatkebaikanIcon />}
          title="Cari yang ingin kamu bantu"
          dompet={<DompetContainer />}
          searchbox
        />
        <Box mx={2} mt={5}>
          <Slideshow />
        </Box>
        <Box mx={2} mt={1} mb={2}>
          <CategoryList />
        </Box>
        <Divider style={{ height: 10, background: '#F7F7F7' }} />
        <Box m={2} style={{ marginBottom: 100 }}>
          <CampaignList />
        </Box>
      </Layout>
    </>
  );
}
