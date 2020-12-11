import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Loading from '@material-ui/core/CircularProgress';
import CampaignBox from 'components/CampaignBox';
import PropTypes from 'prop-types';
import CampaignBoxSkeleton from 'components/CampaignBoxSkeleton';
import useInfiniteScroll from 'libs/hooks/useInfiniteScroll';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const CategoryCampaignList = ({ category }) => {
  const classes = useStyles();
  const { data, isLoadingInitialData, isFetching, error } = useInfiniteScroll(
    '/campaigns',
    {
      _category_id: category.id,
      _published: true,
      _is_active: true,
    }
  );

  return (
    <Box className={classes.root}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        {category?.description}
      </Typography>

      {isLoadingInitialData ? (
        [1, 2, 3, 4].map((i) => <CampaignBoxSkeleton key={i} />)
      ) : data?.length ? (
        data.map((campaign) => (
          <CampaignBox key={campaign.id} campaign={campaign} />
        ))
      ) : error ? (
        <p style={{ color: 'red' }}>{error.message}</p>
      ) : (
        <p>Tidak ada campaign ditemukan.</p>
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
    </Box>
  );
};

CategoryCampaignList.propTypes = {
  category: PropTypes.object,
};

export default CategoryCampaignList;
