/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
  donationValue: {
    campaign: null,
    campaign_id: null,
    donation_amount: 0,
    infaq_amount: 0,
    is_anonymous: false,
    note: null,
    paymentMethod: null,
    payment_method_id: null,
  },
  setDonationValue: ({
    campaign,
    campaign_id,
    donation_amount,
    infaq_amount,
    is_anonymous,
    note,
    paymentMethod,
    payment_method_id,
  }) => {},
};

export const DonationContext = React.createContext(defaultValue);

export const DonationProvider = ({ children }) => {
  const [donationValue, setDonationValue] = useState({
    campaign: null,
    campaign_id: null,
    donation_amount: 0,
    infaq_amount: 0,
    is_anonymous: null,
    note: null,
    paymentMethod: null,
    payment_method_id: null,
  });

  const handleSetDonationValue = (value) => {
    setDonationValue(value);
  };

  return (
    <DonationContext.Provider
      value={{ donationValue, setDonationValue: handleSetDonationValue }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonation = () => useContext(DonationContext);

DonationProvider.propTypes = {
  children: PropTypes.node,
};
