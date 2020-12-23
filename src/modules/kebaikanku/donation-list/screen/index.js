import React from 'react';
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
    backgroundColor: theme.palette.background.paper,
    marginBottom: 100,
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
  const [value, setValue] = React.useState('one');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle2" style={{ margin: 16 }}>
        Catatan Kebaikan
      </Typography>
      <Paper square>
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
            value="one"
            label="Berhasil"
            {...a11yProps('one')}
            classes={{ root: classes.tabStyle }}
          />
          <Tab
            value="two"
            label="Tertunda"
            {...a11yProps('two')}
            classes={{ root: classes.tabStyle }}
          />
          <Tab
            value="three"
            label="Dibatalkan"
            {...a11yProps('three')}
            classes={{ root: classes.tabStyle }}
          />
          <Tab
            value="four"
            label="Gagal"
            {...a11yProps('three')}
            classes={{ root: classes.tabStyle }}
          />
        </Tabs>
      </Paper>
      <TabPanel value={value} index="one">
        <DonationList status="paid" />
      </TabPanel>
      <TabPanel value={value} index="two">
        <DonationList status="pending" />
      </TabPanel>
      <TabPanel value={value} index="three">
        <DonationList status="cancelled" />
      </TabPanel>
      <TabPanel value={value} index="four">
        <DonationList status="expired" />
      </TabPanel>
    </div>
  );
};

export default TabsMenu;
