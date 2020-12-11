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
    id: '85b38aa8-2e96-4ac6-8f19-6cd950765852',
    category_id: 'sosial',
    campaigner_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
    title: 'Campaign baru 2',
    slug: 'baru-2',
    description:
      "Kita bisa sangat mudah membaca Al Qur’an yang ada di sudut meja kita. Tapi masih banyak sekali daerah yang kesulitan menemukan Al-Qur'an, seperti daerah penyintas bencana. Bahkan bisa jadi menjadi barang yang langka karena semua barang-barang hilang ketika bencana terjadi.\n\nMelalui program Syiar Qur’an, Rumah Zakat akan mendistribusikan 10.000 paket Al Qur’an dan Iqro ke wilayah Desa Berdaya (binaan) dan Non Desa Berdaya serta daerah korban bencana diseluruh Indonesia.\n\nYuk, bersama wujudkan program tersebut untuk lebih banyak lagi kebaikan yang kita bagikan. Aamiin.",
    donation_target: 1000000,
    start_date: '2020-12-07 00:00:00',
    end_date: null,
    is_never_end: true,
    published: true,
    created_at: '2020-12-08 17:24:59',
    updated_at: '2020-12-08 17:24:59',
    deleted_at: null,
    category: {
      id: 'sosial',
      name: 'Sosial',
      parent_category: null,
    },
    campaigner: {
      id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
      full_name: 'Campaigner 01',
      email: 'campaigner.01@mail.com',
      username: 'campaigner01',
      phone: '085123456789',
      description: 'Akun campaigner 01',
      role: 'campaigner',
    },
    donation_funded: 0,
    days_left: 0,
    images: [
      {
        id: '689059d4-b7ec-4200-a1ca-287098dbc4fe',
        campaign_id: '85b38aa8-2e96-4ac6-8f19-6cd950765852',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607423099776.png',
        type: 'image',
        created_at: '2020-12-08 17:24:59',
        updated_at: '2020-12-08 17:24:59',
        deleted_at: null,
      },
      {
        id: '878c6195-19c4-4e9f-b2a3-6c35f341e56f',
        campaign_id: '85b38aa8-2e96-4ac6-8f19-6cd950765852',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607423099777.png',
        type: 'image',
        created_at: '2020-12-08 17:24:59',
        updated_at: '2020-12-08 17:24:59',
        deleted_at: null,
      },
    ],
    videos: [],
  },
  {
    id: 'aeecac63-da24-4f7b-a9ae-2099cc4c10b3',
    category_id: 'sosial',
    campaigner_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
    title: 'Campaign baru 1',
    slug: 'baru-1',
    description:
      "Kita bisa sangat mudah membaca Al Qur’an yang ada di sudut meja kita. Tapi masih banyak sekali daerah yang kesulitan menemukan Al-Qur'an, seperti daerah penyintas bencana. Bahkan bisa jadi menjadi barang yang langka karena semua barang-barang hilang ketika bencana terjadi.\n\nMelalui program Syiar Qur’an, Rumah Zakat akan mendistribusikan 10.000 paket Al Qur’an dan Iqro ke wilayah Desa Berdaya (binaan) dan Non Desa Berdaya serta daerah korban bencana diseluruh Indonesia.\n\nYuk, bersama wujudkan program tersebut untuk lebih banyak lagi kebaikan yang kita bagikan. Aamiin.",
    donation_target: 1000000,
    start_date: '2020-12-07 00:00:00',
    end_date: null,
    is_never_end: true,
    published: true,
    created_at: '2020-12-08 17:24:52',
    updated_at: '2020-12-08 17:24:52',
    deleted_at: null,
    category: {
      id: 'sosial',
      name: 'Sosial',
      parent_category: null,
    },
    campaigner: {
      id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
      full_name: 'Campaigner 01',
      email: 'campaigner.01@mail.com',
      username: 'campaigner01',
      phone: '085123456789',
      description: 'Akun campaigner 01',
      role: 'campaigner',
    },
    donation_funded: 0,
    days_left: 0,
    images: [
      {
        id: '9106c0ac-7e5f-42aa-ae0d-bd0a7707c6c3',
        campaign_id: 'aeecac63-da24-4f7b-a9ae-2099cc4c10b3',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607423092708.png',
        type: 'image',
        created_at: '2020-12-08 17:24:53',
        updated_at: '2020-12-08 17:24:53',
        deleted_at: null,
      },
      {
        id: 'ba0a47f1-725d-4911-9041-ee66790f92b3',
        campaign_id: 'aeecac63-da24-4f7b-a9ae-2099cc4c10b3',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607423092707.png',
        type: 'image',
        created_at: '2020-12-08 17:24:53',
        updated_at: '2020-12-08 17:24:53',
        deleted_at: null,
      },
    ],
    videos: [],
  },
  {
    id: 'bf3336fd-b019-41e7-99cd-503976840c06',
    category_id: 'sosial',
    campaigner_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
    title: 'aktif',
    slug: 'ktif',
    description:
      "Kita bisa sangat mudah membaca Al Qur’an yang ada di sudut meja kita. Tapi masih banyak sekali daerah yang kesulitan menemukan Al-Qur'an, seperti daerah penyintas bencana. Bahkan bisa jadi menjadi barang yang langka karena semua barang-barang hilang ketika bencana terjadi.\n\nMelalui program Syiar Qur’an, Rumah Zakat akan mendistribusikan 10.000 paket Al Qur’an dan Iqro ke wilayah Desa Berdaya (binaan) dan Non Desa Berdaya serta daerah korban bencana diseluruh Indonesia.\n\nYuk, bersama wujudkan program tersebut untuk lebih banyak lagi kebaikan yang kita bagikan. Aamiin.",
    donation_target: 1000000,
    start_date: '2020-12-04 00:00:00',
    end_date: null,
    is_never_end: true,
    published: true,
    created_at: '2020-12-04 16:34:44',
    updated_at: '2020-12-04 16:35:41',
    deleted_at: null,
    category: {
      id: 'sosial',
      name: 'Sosial',
      parent_category: null,
    },
    campaigner: {
      id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
      full_name: 'Campaigner 01',
      email: 'campaigner.01@mail.com',
      username: 'campaigner01',
      phone: '085123456789',
      description: 'Akun campaigner 01',
      role: 'campaigner',
    },
    donation_funded: 0,
    days_left: 0,
    images: [
      {
        id: '203fda4e-45f4-4fdb-aab0-e1695d700239',
        campaign_id: 'bf3336fd-b019-41e7-99cd-503976840c06',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607074484366.png',
        type: 'image',
        created_at: '2020-12-04 16:34:44',
        updated_at: '2020-12-04 16:34:44',
        deleted_at: null,
      },
      {
        id: '89aa0642-22c5-4aae-a582-3528c5e9d1d1',
        campaign_id: 'bf3336fd-b019-41e7-99cd-503976840c06',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607074484365.png',
        type: 'image',
        created_at: '2020-12-04 16:34:44',
        updated_at: '2020-12-04 16:34:44',
        deleted_at: null,
      },
    ],
    videos: [],
  },
  {
    id: '89a0646a-0f59-4004-8e26-1840dc5adf9d',
    category_id: 'sosial',
    campaigner_id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
    title: 'Belum aktif',
    slug: 'belum-aktif',
    description:
      "Kita bisa sangat mudah membaca Al Qur’an yang ada di sudut meja kita. Tapi masih banyak sekali daerah yang kesulitan menemukan Al-Qur'an, seperti daerah penyintas bencana. Bahkan bisa jadi menjadi barang yang langka karena semua barang-barang hilang ketika bencana terjadi.\n\nMelalui program Syiar Qur’an, Rumah Zakat akan mendistribusikan 10.000 paket Al Qur’an dan Iqro ke wilayah Desa Berdaya (binaan) dan Non Desa Berdaya serta daerah korban bencana diseluruh Indonesia.\n\nYuk, bersama wujudkan program tersebut untuk lebih banyak lagi kebaikan yang kita bagikan. Aamiin.",
    donation_target: 1000000,
    start_date: '2020-12-07 00:00:00',
    end_date: null,
    is_never_end: true,
    published: true,
    created_at: '2020-12-03 22:44:33',
    updated_at: '2020-12-03 22:44:33',
    deleted_at: null,
    category: {
      id: 'sosial',
      name: 'Sosial',
      parent_category: null,
    },
    campaigner: {
      id: 'e3018e5f-0bf7-4c18-b406-c517b77cd306',
      full_name: 'Campaigner 01',
      email: 'campaigner.01@mail.com',
      username: 'campaigner01',
      phone: '085123456789',
      description: 'Akun campaigner 01',
      role: 'campaigner',
    },
    donation_funded: 0,
    days_left: 0,
    images: [
      {
        id: '9812c0e1-a9d9-451f-a1d2-45029fc562eb',
        campaign_id: '89a0646a-0f59-4004-8e26-1840dc5adf9d',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607010273655.png',
        type: 'image',
        created_at: '2020-12-03 22:44:33',
        updated_at: '2020-12-03 22:44:33',
        deleted_at: null,
      },
      {
        id: 'f1041877-1b4d-4eb2-831c-c730533e9c65',
        campaign_id: '89a0646a-0f59-4004-8e26-1840dc5adf9d',
        url:
          'https://api-staging.sahabatkebaikan.org/media/images_1607010273654.png',
        type: 'image',
        created_at: '2020-12-03 22:44:33',
        updated_at: '2020-12-03 22:44:33',
        deleted_at: null,
      },
    ],
    videos: [],
  },
];
