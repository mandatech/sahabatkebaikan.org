import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CampaignBasicInfo from 'modules/campaign/basic-info/screen';
import CampaignBasicInfoSkeleton from 'modules/campaign/basic-info/skeleton';
import DonateNowButton from 'modules/campaign/donate-now-button';
import DonorList from 'modules/campaign/donor-list/screen';
import CampaignStory from 'modules/campaign/story/screen';
import LatestNews from 'modules/campaign/latest-news';
import { getCampaignDetail } from 'services/campaign.service';
import DataNotFound from 'components/DataNotFound';
import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DetailCampaign = ({ slug }) => {
  const classes = useStyles();
  const router = useRouter();
  const { data, error, isFetching } = getCampaignDetail(slug);
  // const [isFetching] = useState(true);

  return (
    <Layout>
      <Header
        title="Detail Campaign"
        icon={<BackIcon />}
        IconButtonProps={{
          onClick: () => router.push('/'),
        }}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />

      {isFetching ? (
        <CampaignBasicInfoSkeleton />
      ) : data ? (
        <>
          <CampaignBasicInfo campaign={data} />
          <CampaignStory campaign={data} />
          <LatestNews campaign={data} />
          <DonorList campaign={data} />
          <DonateNowButton campaign={data} />
        </>
      ) : (
        error && (
          <Paper
            style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
            elevation={0}
            square
          >
            {/* <p>Tidak dapat menampilkan campaign</p> */}
            <DataNotFound />
          </Paper>
        )
      )}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      slug: params.slug,
    },
  };
}

DetailCampaign.propTypes = {
  slug: PropTypes.string,
};

export default DetailCampaign;
