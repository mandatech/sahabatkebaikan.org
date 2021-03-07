import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CampaignBasicInfo from 'modules/campaign/basic-info/screen';
// import CampaignBasicInfoSkeleton from 'modules/campaign/basic-info/skeleton';
import DonateNowButton from 'modules/campaign/donate-now-button';
import DonorList from 'modules/campaign/donor-list/screen';
import CampaignStory from 'modules/campaign/story/screen';
import LatestNews from 'modules/campaign/latest-news';
// import { getCampaignDetail } from 'services/campaign.service';
import DataNotFound from 'components/DataNotFound';
import { Paper } from '@material-ui/core';
import { useRouter } from 'next/router';
import Head from 'next/head';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DetailCampaign = ({ campaign }) => {
  const classes = useStyles();
  const router = useRouter();
  // const { data, error, isFetching } = getCampaignDetail(slug);
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
      <Head>
        <title>{campaign.title}</title>
        <meta
          property="og:url"
          content={`${process.env.NEXT_PUBLIC_WEB_URL}/campaign/${campaign.slug}`}
        />
        <meta property="og:type" content="website" />
        <meta property="fb:app_id" content="889656065155240" />
        <meta property="og:title" content={campaign.title} />
        <meta name="twitter:card" content="summary" />
        <meta property="og:description" content={campaign.title} />
        <meta property="og:image" content={campaign.images[0]?.url} />
      </Head>

      {campaign ? (
        <>
          <CampaignBasicInfo campaign={campaign} />
          <CampaignStory campaign={campaign} />
          <LatestNews campaign={campaign} />
          <DonorList campaign={campaign} />
          <DonateNowButton campaign={campaign} />
        </>
      ) : (
        <Paper
          style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
          elevation={0}
          square
        >
          <DataNotFound />
        </Paper>
      )}

      {/* {isFetching ? (
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
            <DataNotFound />
          </Paper>
        )
      )} */}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/campaigns/${params.slug}`
  );
  const campaign = await res.json();

  return {
    props: {
      campaign,
    },
  };
}

DetailCampaign.propTypes = {
  slug: PropTypes.string,
  campaign: PropTypes.object,
};

export default DetailCampaign;
