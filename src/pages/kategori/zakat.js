import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import ZakatCampaignList from 'modules/category/zakat/zakat-campaign-list';
import ZakatMenu from 'modules/category/zakat/zakat-menu';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const ZakatPage = () => {
  const classes = useStyles();
  const [filter, setFilter] = useState('all');

  return (
    <Layout>
      <Header
        title="Zakat"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <ZakatMenu />
      <ZakatCampaignList
        filter={filter}
        setFilter={setFilter}
        campaigns={campaigns}
      />
    </Layout>
  );
};

export default ZakatPage;

const campaigns = [
  {
    id: 1,
    title: 'Bahagiakan Ribuan Mustahiq di Karawang Melalui Zakat Anda',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/zakatKu-1.jpg',
    ],
    target: 1000000,
    funded: 500000,
    daysLeft: 28,
    author: 'Baitul MaalKu',
  },
  {
    id: 2,
    title:
      'Yuk Ikut Distribusi 10.000 Wakaf Al-Qur’an untuk Santri dan Masyarakat Muslim di Pelosok Karawang dan Jawa Barat',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/wakaf-Al-Quran.png',
    ],
    target: 90000000,
    funded: 11200000,
    daysLeft: 77,
    author: 'Baitul MaalKu',
  },
  {
    id: 3,
    title:
      'Bantu Anak-anak Dhuafa di Karawang untuk Memenuhi Kebutuhan Biaya Pendidikan Mereka',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/07/Beasiswa-AmanahKu.jpg',
    ],
    target: 32100000,
    funded: 3400000,
    daysLeft: 120,
    author: 'Baitul MaalKu',
  },
  {
    id: 4,
    title:
      'INBox – Infaq Nasi Box untuk Jama’ah Shalat Jum’at di Masjid Pelosok dan Pesisir Karawang',
    images: [
      'https://sahabatkebaikan.org/wp-content/uploads/2020/10/20201008_152909.jpg',
    ],
    target: 5400000,
    funded: 5390000,
    daysLeft: 23,
    author: 'Baitul MaalKu',
  },
];
