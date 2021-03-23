/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const defaultValue = {
  donationValue: {
    full_name: null,
    email: null,
    phone: null,
    campaign: null,
    campaign_id: null,
    donation_amount: 0,
    infaq_amount: 0,
    is_anonymous: false,
    note: null,
    payment_method: null,
    payment_method_id: null,
    donation_created: null,
  },
  setDonationValue: ({
    full_name,
    email,
    phone,
    campaign,
    campaign_id,
    donation_amount,
    infaq_amount,
    is_anonymous,
    note,
    payment_method,
    payment_method_id,
    donation_created,
  }) => {},
};

export const DonationContext = React.createContext(defaultValue);

export const DonationProvider = ({ children }) => {
  const [donationValue, setDonationValue] = useState({
    full_name: null,
    email: null,
    phone: null,
    campaign: null,
    campaign_id: null,
    donation_amount: 0,
    infaq_amount: 0,
    is_anonymous: null,
    note: null,
    payment_method: null,
    payment_method_id: null,
    donation_created: null,
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
