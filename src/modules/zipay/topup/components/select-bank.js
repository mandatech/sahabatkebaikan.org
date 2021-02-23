/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { TextField as FormikTextField } from 'formik-material-ui';
import { useGetList } from 'libs/hooks/useGetList';
import Loading from 'components/Loading';

const SelectBank = ({ handleNext = () => {}, setState = () => {} }) => {
  const [params] = useState({
    _page: 1,
    _pageSize: 100,
  });
  const { data, isFetching, error } = useGetList(
    '/zipay/virtual-accounts',
    params
  );

  console.log('isFetching', isFetching);
  console.log('data', data);

  return (
    <DialogContent dividers style={{ padding: '16px 0' }}>
      <DialogContentText style={{ marginTop: 8, padding: '0 16px' }}>
        <Typography gutterBottom variant="h6" color="textPrimary">
          Pilih Bank
        </Typography>
      </DialogContentText>
      <List component="nav" aria-label="transfer-payment">
        {isFetching ? (
          <Loading open hideBackdrop />
        ) : data?.length ? (
          data.map((paymentMethod, i) => (
            <ListItem
              key={i}
              button
              divider
              onClick={() => {
                setState({
                  bank_name: paymentMethod.bank_name,
                  va_number: paymentMethod.va_number,
                });
                handleNext();
              }}
            >
              <ListItemIcon style={{ marginRight: 4 }}>
                <img
                  alt="bank=icon"
                  src={paymentMethod.image}
                  width={48}
                  height={32}
                />
              </ListItemIcon>
              <ListItemText primary={paymentMethod.bank_name} />
              <ChevronRightIcon />
            </ListItem>
          ))
        ) : error ? (
          <p style={{ color: 'red' }}>{error.message}</p>
        ) : (
          <p>Maaf, belum ada metode pembayaran tersedia.</p>
        )}
      </List>
    </DialogContent>
  );
};

export default SelectBank;
