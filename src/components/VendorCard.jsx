// VendorCard.jsx
import React from 'react';
import styled from 'styled-components';

const CardContainer = styled.div`
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
`;

const VendorCard = ({ vendor }) => {
  return (
    <CardContainer>
      <h3>{vendor.vendor_name}</h3>
      <p>Type: {vendor.vendor_type}</p>
      <p>Price: ${vendor.vendor_price}</p>
      <p>Rating: {vendor.vendor_rating}</p>
    </CardContainer>
  );
};

export default VendorCard;
