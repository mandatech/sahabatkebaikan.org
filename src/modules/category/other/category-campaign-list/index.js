import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CampaignBox from 'components/CampaignBox';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const CategoryCampaignList = ({ campaigns, category }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        {category?.description}
      </Typography>

      {campaigns.map((campaign) => (
        <CampaignBox key={campaign.id} campaign={campaign} />
      ))}
    </Box>
  );
};

CategoryCampaignList.propTypes = {
  campaigns: PropTypes.array,
  category: PropTypes.object,
};

export default CategoryCampaignList;
