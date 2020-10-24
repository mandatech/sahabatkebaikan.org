import { makeStyles } from '@material-ui/core/styles';
import BackIcon from '@material-ui/icons/ChevronLeft';
import Header from 'components/Header';
import Layout from 'components/Layout';
import CampaignBasicInfo from 'modules/campaign/basic-info/screen';
import DonateNowButton from 'modules/campaign/donate-now-button';
import DonorList from 'modules/campaign/donor-list/screen';
import CampaignStory from 'modules/campaign/story/screen';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
    // borderBottomColor: theme.palette.background.default,
    // boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DetailCampaign = () => {
  const classes = useStyles();
  return (
    <Layout>
      <Header
        title="Detail Campaign"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <CampaignBasicInfo />
      <CampaignStory />
      <DonorList />
      <DonateNowButton />
    </Layout>
  );
};

export default DetailCampaign;
