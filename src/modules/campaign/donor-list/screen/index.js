import { Grid } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 16,
    marginBottom: 56,
    padding: '8px 16px 16px 16px',
    '& > *': {
      margin: '8px 0',
    },
  },
  item: {
    margin: '8px 0',
    padding: 16,
    background: theme.palette.background.default,
  },
}));
const DonorList = () => {
  const classes = useStyles();
  const [sort, setSort] = useState('DESC');

  return (
    <Paper className={classes.root} elevation={0}>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body1" style={{ fontWeight: 500 }}>
          Donasi (1298)
        </Typography>
        <Select
          variant="outlined"
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          label="Sort"
          style={{ height: 40 }}
          // autoWidth={true}
        >
          <MenuItem value={'DESC'}>Terbaru</MenuItem>
          <MenuItem value={'ASC'}>Terlama</MenuItem>
        </Select>
      </Box>

      {[1, 2, 3, 4].map((value) => (
        <Grid key={value} container className={classes.item}>
          <Grid item>
            <Avatar
              style={{ width: 50, height: 50 }}
              src="https://material-ui.com/static/images/avatar/1.jpg"
            />
          </Grid>
          <Grid item xs style={{ marginLeft: 16 }}>
            <Typography variant="body1" style={{ fontWeight: 500 }}>
              Nayeon
            </Typography>
            <Typography variant="body2">
              Donasi <span style={{ fontWeight: 500 }}>Rp 57.000</span>
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              gutterBottom
              style={{ fontSize: 12 }}
            >
              2 jam yang lalu
            </Typography>
            <Typography variant="body2">
              Semoga berguna, walau hanya sedikit
            </Typography>
          </Grid>
        </Grid>
      ))}
    </Paper>
  );
};

export default DonorList;
