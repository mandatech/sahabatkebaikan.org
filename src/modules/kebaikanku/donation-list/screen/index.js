import React from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DonationList from '../components/DonationList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      style={{
        flexGrow: 1,
        // display: 'flex',
        // flexDirection: 'column',
      }}
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    paddingBottom: 100,
  },
  tabStyle: {
    fontSize: 12,
    textTransform: 'capitalize',
    [theme.breakpoints.up('sm')]: {
      minWidth: 80,
    },
  },
}));

const TabsMenu = () => {
  const classes = useStyles();
  const router = useRouter();
  const [value, setValue] = React.useState('pending');

  const handleChange = (event, newValue) => {
    router.push(`${router.pathname}?status=${newValue}`);
    setValue(newValue);
  };

  React.useEffect(() => {
    if (router.query.status) {
      if (router.query.status === 'paid') {
        setValue('paid');
      } else if (router.query.status === 'expired') {
        setValue('expired');
      } else if (router.query.status === 'pending') {
        setValue('pending');
      } else {
        router.push(`${router.pathname}?status=pending`);
      }
    }
  }, [router.query]);

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" style={{ margin: 16 }}>
        Catatan Kebaikan
      </Typography>
      <Paper elevation={0}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          scrollButtons="auto"
          aria-label="wrapped label tabs example"
        >
          <Tab
            value="pending"
            label="Tertunda"
            {...a11yProps('pending')}
            classes={{ root: classes.tabStyle }}
          />
          <Tab
            value="paid"
            label="Berhasil"
            {...a11yProps('paid')}
            classes={{ root: classes.tabStyle }}
          />
          {/* <Tab
            value="three"
            label="Dibatalkan"
            {...a11yProps('three')}
            classes={{ root: classes.tabStyle }}
          /> */}
          <Tab
            value="expired"
            label="Gagal"
            {...a11yProps('three')}
            classes={{ root: classes.tabStyle }}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="pending">
        <DonationList status="pending" />
      </TabPanel>
      <TabPanel value={value} index="paid">
        <DonationList status="paid" />
      </TabPanel>
      {/* <TabPanel value={value} index="three">
        <DonationList status="cancelled" />
      </TabPanel> */}
      <TabPanel value={value} index="expired">
        <DonationList status="expired" />
      </TabPanel>
    </div>
  );
};

export default TabsMenu;
