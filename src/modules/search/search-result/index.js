import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import CampaignBox from 'components/CampaignBox';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const SearchResult = ({ campaigns }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      {campaigns.map((campaign) => (
        <CampaignBox key={campaign.id} campaign={campaign} />
      ))}
    </Box>
  );
};

SearchResult.propTypes = {
  campaigns: PropTypes.array,
};

export default SearchResult;
