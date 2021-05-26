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
import { useEffect } from 'react';
import * as fbq from 'libs/fbpixel';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DetailCampaign = ({ campaign, campaigner }) => {
  const classes = useStyles();
  const router = useRouter();
  // const { data, error, isFetching } = getCampaignDetail(slug);
  // const [isFetching] = useState(true);

  useEffect(() => {
    fbq.event('ViewContent');

    if (campaigner?.pixel_id) {
      fbq.init(campaigner.pixel_id);
      fbq.pageview(campaigner.pixel_id);
      fbq.event('ViewContent', campaigner.pixel_id);
    }
  }, []);

  return (
    <Layout title={campaign.title}>
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
        {/* <title>{campaign.title}</title> */}
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
      {/* <footer>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', ${campaigner.pixel_id});
              fbq('track', 'PageView');
              `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            alt=""
            src={`https://www.facebook.com/tr?id=${campaigner.pixel_id}&ev=PageView&noscript=1`}
          />
        </noscript>
      </footer> */}
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  const campaignRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/campaigns/${params.slug}`
  );
  const campaign = await campaignRes.json();

  const campaignerRes = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/v1/users/${campaign.campaigner.username}`
  );

  const campaigner = await campaignerRes.json();

  return {
    props: {
      campaign,
      campaigner,
    },
  };
}

DetailCampaign.propTypes = {
  slug: PropTypes.string,
  campaign: PropTypes.object,
  campaigner: PropTypes.object,
};

export default DetailCampaign;
