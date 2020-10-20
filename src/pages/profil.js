import Header from 'components/Header';
import Layout from 'components/Layout';
import ProfileInfo from 'modules/profile/info/screen';
import MenuItem from 'modules/profile/menu-item/screen';
import React from 'react';

export default function Index() {
  return (
    <>
      <Layout container="paper" menu={2} withBottomNav>
        <Header title="Profil Saya" />
        <ProfileInfo />
        <MenuItem />
      </Layout>
    </>
  );
}
