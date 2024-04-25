// VendorList.jsx
import React, { useState, useEffect } from "react";
import VendorCard from "./VendorCard";
import styled from "styled-components";

// const VendorListContainer = styled.div`
//   display: grid;
//   grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
//   gap: 20px;
// `;

// const Loader = styled.div`
//   text-align: center;
//   margin: 20px;
// `;

const VendorListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(300px, 1fr));
  gap: 20px;
  grid-auto-rows: 2fr;
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

  const [pageNumber, setPageNumber] = useState(1);



  const fetchVendors = async () => {
    fetch(`http://localhost:8080/vendors?page=${pageNumber}`)
      .then((response) => {
        console.log(`fetch Number ${pageNumber}` )
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setVendors(data.rows);
        setLoading(false);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      })
      .catch((error) => {
        console.error("Fetch request failed:", error);
      });
  };


  useEffect(() => {
    fetchVendors()
      
    return () => {
      fetchVendors()
    };
  }, []);

  useEffect(() => {
    // Fetch vendors from API
    
    const handleScroll = () => {
      if (
        document.documentElement.scrollHeight - 
        (window.innerHeight + document.documentElement.scrollTop) < 10
      ) {
        fetchVendors();
      }
    };
    document.addEventListener("scroll", handleScroll);
  
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
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
