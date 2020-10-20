import Header from 'components/Header';
import Layout from 'components/Layout';
import DonationList from 'modules/kebaikanku/donation-list/screen';
import React from 'react';

export default function Index() {
  return (
    <>
      <Layout menu={0} withBottomNav>
        <Header title="Kebaikanku" />
        <DonationList />
      </Layout>
    </>
  );
}
