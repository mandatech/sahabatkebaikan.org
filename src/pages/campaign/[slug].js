import Header from 'components/Header';
import Layout from 'components/Layout';
import CampaignBasicInfo from 'modules/campaign/basic-info/screen';
import DonateNowButton from 'modules/campaign/donate-now-button';
import DonorList from 'modules/campaign/donor-list/screen';
import CampaignStory from 'modules/campaign/story/screen';

const DetailCampaign = () => {
  return (
    <Layout>
      <Header title="Detail Campaign" />
      <CampaignBasicInfo />
      <CampaignStory />
      <DonorList />
      <DonateNowButton />
    </Layout>
  );
};

export default DetailCampaign;
