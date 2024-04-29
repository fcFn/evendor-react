// // VendorCard.jsx
import React from "react";
// import styled from "styled-components";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

//Inline CSS (will eventually be moved to a proper CSS file)
// const CardContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 20px;
// `;

//Vendor card data fields
// const VendorCard = ({ vendor }) => {
//   return (
//     <CardContainer>
//       <img src={vendor.image_url} alt="" height="50px" />
//       <h3>{vendor.vendor_name}</h3>
//       <p>Type: {vendor.vendor_type}</p>
//       <p>Price: ${vendor.vendor_price}</p>
//       <p>Rating: {vendor.vendor_rating}</p>
//     </CardContainer>
//   );
// };

// export default VendorCard;




const VendorCard = ({ vendor }) => {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={vendor.image_url} height="150px"/>
      <Card.Body>
        <Card.Title>{vendor.vendor_name}</Card.Title>
        <Card.Text>
        <p>Type: {vendor.vendor_type}</p>
        <p>Price: ${vendor.vendor_price}</p>
        <p>Rating: {vendor.vendor_rating}</p>
        </Card.Text>
        <Button variant="primary">Book Vendor</Button>
      </Card.Body>
    </Card>
  );
}

export default VendorCard;

///FAKER VERSION

// // VendorCard.jsx
// import React from "react";
// import styled from "styled-components";
// import { faker } from "@faker-js/faker/locale/en";
// const CardContainer = styled.div`
//   border: 1px solid #ccc;
//   border-radius: 8px;
//   padding: 20px;
// `;
// const VendorCard = React.memo(({ vendor }) => {
//   return (
//     <CardContainer>
//       <img
//         src={faker.image.urlLoremFlickr({ category: "business" })}
//         alt=""
//         height="50px"
//       />
//       <h3>{faker.company.name()}</h3>
//       <p>Type: {faker.company.buzzNoun()}</p>
//       <p>Price: ${Math.ceil(Math.random() * 1000)}</p>
//       <p>Rating: {Math.ceil(Math.random() * 5)}</p>
//     </CardContainer>
//   );
// });
// export default VendorCard;
