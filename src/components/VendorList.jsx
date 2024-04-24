// VendorList.jsx
import React, { useState, useEffect } from "react";
import VendorCard from "./VendorCard";
import styled from "styled-components";

const VendorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
`;

const Loader = styled.div`
  text-align: center;
  margin: 20px;
`;

const VendorList = () => {
  const [vendors, setVendors] = useState([
    {
      vendor_name: "DJ FunkyKong",
      vendor_type: "Musician",
      vendor_price: 40,
      vendor_rating: 5,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch vendors from API
    const fetchVendors = async () => {
      //   try {
      //     const response = await fetch('/api/vendors');
      //     const data = await response.json();
      //     setVendors(data);
      //     setLoading(false);
      //   } catch (error) {
      //     console.error('Error fetching vendors:', error);
      //   }

      fetch("http://localhost:5432/vendors")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setVendors(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Fetch request failed:", error);
        });
    };

    fetchVendors();
  }, []);

  return (
    <div>
      <h2>Available Vendors</h2>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <VendorListContainer>
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </VendorListContainer>
      )}
    </div>
  );
};

export default VendorList;
