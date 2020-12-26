import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import SvgIcon from '@material-ui/core/SvgIcon';
import Layout from 'components/Layout';
import Loading from 'components/Loading';
import DonationSummaryScreen from 'modules/donation-process/donation-summary';
import { getDonationDetail } from 'services/donation.service';
import SahabatkebaikanIcon from 'assets/icons/sahabatkebaikan.svg';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  logoContainer: {
    width: '100%',
    padding: 8,
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    boxShadow: ' 0px 2px 6px rgba(0, 0, 0, 0.25)',
  },
}));

const DonationSummary = ({ donation_id }) => {
  const classes = useStyles();
  const { data, error, isFetching } = getDonationDetail(donation_id);

  return (
    <Layout>
      <Paper className={classes.logoContainer}>
        <SvgIcon
          component={SahabatkebaikanIcon}
          viewBox="0 0 217 72"
          style={{ width: 135, height: 44 }}
        />
      </Paper>
      {data ? (
        <DonationSummaryScreen donation={data} />
      ) : (
        error && (
          <div>
            <p>Tidak dapat menampilkan donasi</p>
          </div>
        )
      )}
      <Loading open={isFetching} hideBackdrop />
    </Layout>
  );
};

export async function getServerSideProps({ params }) {
  return {
    props: {
      donation_id: params.donation_id,
    },
  };
}

DonationSummary.propTypes = {
  donation_id: PropTypes.string,
};

export default DonationSummary;
