import { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Layout from 'components/Layout';
import CreateNewCampaign from 'modules/campaign/create/screen';
import Header from 'components/Header';
import BackIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles(() => ({
  headerRoot: {
    borderBottom: 'solid 1px lightgrey',
  },
}));

const CreateCampaign = () => {
  const classes = useStyles();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <Layout>
      <Header
        title="Buat Campagin Baru"
        icon={<BackIcon />}
        backButton={true}
        TitleProps={{ align: 'left' }}
        color="inherit"
        elevation={0}
        classes={{
          root: classes.headerRoot,
        }}
      />
      <CreateNewCampaign />
    </Layout>
  );
};

export default CreateCampaign;
