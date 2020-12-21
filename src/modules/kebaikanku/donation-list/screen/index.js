import { useState } from 'react';
import Box from '@material-ui/core/Box';
import ButtonBase from '@material-ui/core/ButtonBase';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '@material-ui/core/CircularProgress';
import { Button } from '@material-ui/core';
import CampaignStatus from '../components/CampaignStatus';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import useInfiniteLoadDonations from '../hooks/useInfiniteLoadDonations';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: theme.palette.background.paper,
    marginBottom: 100,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  groupHeader: {
    background: theme.palette.background.default,
  },
  image: {
    maxWidth: 190,
    marginRight: 8,
    // height: 90,
  },
  img: {
    objectFit: 'cover',
    width: '100%',
    borderRadius: 8,
    height: 90,
  },
  campaignTitle: {
    fontSize: 12,
    fontWeight: 600,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    '-webkit-line-clamp': 2,
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    cursor: 'pointer',
  },
  donationStatus: {
    borderRadius: 20,
    marginLeft: 4,
    height: 25,
    width: 80,
    fontSize: 9,
    fontWeight: 400,
    cursor: 'default',
  },
}));

const CampaignList = () => {
  const classes = useStyles();
  const [params] = useState({
    _page: 1,
    _pageSize: 2,
    _sort: 'created_at',
    _order: 'DESC',
    _q: '',
    _campaign_id: '',
    _status: null,
  });
  // const {
  //   data,
  //   isFetching,
  //   error,
  //   isLoadingInitialData,
  //   isReachingEnd,
  //   loadMore,
  // } = getDonationListGroupByMonth(params);
  const {
    data,
    isFetching,
    error,
    isLoadingInitialData,
    isReachingEnd,
    loadMore,
  } = useInfiniteLoadDonations('/donations/group-by-month', params);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" style={{ margin: 16 }}>
        Catatan Kebaikan
      </Typography>

      {isLoadingInitialData ? (
        [1, 2, 3, 4].map((i) => <CampaignBoxSkeleton key={i} />)
      ) : data?.length ? (
        data.map((group, i) => (
          <div key={i}>
            <Box
              display="flex"
              justifyContent="space-between"
              px={2}
              py={1}
              className={classes.groupHeader}
            >
              <Typography variant="caption">
                {group.month} ~{' '}
                {new Intl.NumberFormat('id-ID', {
                  style: 'currency',
                  currency: 'IDR',
                }).format(group.total_donation_amount)}
              </Typography>
              <Typography variant="caption">
                {group.total_donation} Donasi
              </Typography>
            </Box>
            {group.donations.map((donation, i) => (
              <Box key={i} m={2}>
                <Grid container style={{ margin: '16px 0' }}>
                  <Grid item xs={4}>
                    <ButtonBase className={classes.image}>
                      <img
                        className={classes.img}
                        alt=""
                        src={
                          donation.campaign.images[0].url ||
                          'https://via.placeholder.com/600x400?text=No%20Image'
                        }
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid item container xs>
                    <Grid item xs container direction="column">
                      <Grid item xs>
                        <Typography
                          gutterBottom
                          variant="subtitle1"
                          className={classes.campaignTitle}
                        >
                          {donation.campaign.title}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                          {new Intl.NumberFormat('id-ID', {
                            style: 'currency',
                            currency: 'IDR',
                          }).format(donation.donation_amount)}
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item>
                      <CampaignStatus status={donation.status} />
                    </Grid>
                  </Grid>
                </Grid>
                <Divider />
              </Box>
            ))}
          </div>
        ))
      ) : error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <p>Maaf, belum ada data.</p>
      )}

      {isFetching && !isLoadingInitialData && (
        <Box
          width="100%"
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Loading color="secondary" size={20} />
        </Box>
      )}

      {!isReachingEnd && (
        <Box
          width="100%"
          mt={2}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Button onClick={loadMore} disabled={isFetching} color="secondary">
            Muat lagi
          </Button>
        </Box>
      )}
    </div>
  );
};

export default CampaignList;

// const donations_grouped = [
//   {
//     id: 1,
//     month: 'September 2020',
//     total: 35000,
//     donations: [
//       {
//         id: 1,
//         total: 35000,
//         status: 'completed',
//         campaign: {
//           id: 2,
//           title:
//             'Yuk Ikut Distribusi 10.000 Wakaf Al-Qur’an untuk Santri dan Masyarakat Muslim di Pelosok Karawang dan Jawa Barat',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/07/wakaf-Al-Quran.png',
//           ],
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//     ],
//   },
//   {
//     id: 2,
//     month: 'Agustus 2020',
//     total: 120000,
//     donations: [
//       {
//         id: 2,
//         total: 105000,
//         status: 'pending',
//         campaign: {
//           id: 3,
//           title:
//             'Bantu Anak-anak Dhuafa di Karawang untuk Memenuhi Kebutuhan Biaya Pendidikan Mereka',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/07/Beasiswa-AmanahKu.jpg',
//           ],
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//       {
//         id: 3,
//         total: 15000,
//         status: 'cancelled',
//         campaign: {
//           id: 4,
//           title:
//             'INBox – Infaq Nasi Box untuk Jama’ah Shalat Jum’at di Masjid Pelosok dan Pesisir Karawang',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/10/20201008_152909.jpg',
//           ],
//           target: 5400000,
//           funded: 5390000,
//           daysLeft: 23,
//           author: 'Baitul MaalKu',
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//     ],
//   },
//   {
//     id: 3,
//     month: 'Juli 2020',
//     total: 250000,
//     donations: [
//       {
//         id: 2,
//         total: 105000,
//         status: 'pending',
//         campaign: {
//           id: 3,
//           title:
//             'Bantu Anak-anak Dhuafa di Karawang untuk Memenuhi Kebutuhan Biaya Pendidikan Mereka',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/07/Beasiswa-AmanahKu.jpg',
//           ],
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//       {
//         id: 3,
//         total: 15000,
//         status: 'cancelled',
//         campaign: {
//           id: 4,
//           title:
//             'INBox – Infaq Nasi Box untuk Jama’ah Shalat Jum’at di Masjid Pelosok dan Pesisir Karawang',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/10/20201008_152909.jpg',
//           ],
//           target: 5400000,
//           funded: 5390000,
//           daysLeft: 23,
//           author: 'Baitul MaalKu',
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//       {
//         id: 4,
//         total: 15000,
//         status: 'completed',
//         campaign: {
//           id: 1,
//           title: 'Bahagiakan Ribuan Mustahiq di Karawang Melalui Zakat Anda',
//           images: [
//             'https://sahabatkebaikan.org/wp-content/uploads/2020/07/zakatKu-1.jpg',
//           ],
//         },
//         created_at: '2020-10-20T07:14:15.338Z',
//       },
//     ],
//   },
// ];
