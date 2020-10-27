import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CampaignBox from 'components/CampaignBox';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 8,
    padding: 16,
    background: theme.palette.background.paper,
  },
}));

const ZakatScreen = ({ campaigns, filter, setFilter }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography
        variant="body1"
        gutterBottom
        style={{ fontWeight: 500, fontSize: 16 }}
      >
        Salurkan Zakat Anda
      </Typography>
      <Grid container spacing={2} style={{ marginBottom: 16 }}>
        <Grid item xs>
          <Typography variant="caption" color="textSecondary" gutterBottom>
            Salurkan zakat Anda kepada golongan yang berhak menerima zakat
          </Typography>
        </Grid>
        <Grid item>
          <Select
            variant="outlined"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            label="Sort"
            style={{ height: 40, fontSize: 12 }}
            autoWidth={true}
          >
            <MenuItem value={'all'}>Semua</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category.id} value={category.id}>
                {category.name}
              </MenuItem>
            ))}
          </Select>
        </Grid>
      </Grid>
      {campaigns.map((campaign) => (
        <CampaignBox key={campaign.id} campaign={campaign} />
      ))}
    </Box>
  );
};

ZakatScreen.propTypes = {
  campaigns: PropTypes.array,
  filter: PropTypes.any,
  setFilter: PropTypes.func,
};

export default ZakatScreen;

const categories = [
  {
    id: 1,
    name: 'Fakir',
  },
  {
    id: 2,
    name: 'Miskin',
  },
  {
    id: 3,
    name: 'Amil',
  },
  {
    id: 4,
    name: 'Riqab',
  },
  {
    id: 5,
    name: 'Gharim',
  },
  {
    id: 6,
    name: 'Fi Sabilillah',
  },
  {
    id: 7,
    name: 'Ibnu Sabil',
  },
  {
    id: 8,
    name: 'Muallaf',
  },
];
