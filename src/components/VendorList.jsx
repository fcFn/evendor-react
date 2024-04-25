// VendorList.jsx
import React, { useState, useEffect } from "react";
import VendorCard from "./VendorCard";
import styled from "styled-components";

// Styled components for VendorListContainer and Loader
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
  // State for vendors, loading status, and page number
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);

  // Function to fetch vendors from the API
  const fetchVendors = async () => {
    fetch(`http://localhost:8080/vendors?page=${pageNumber}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        // Update vendors state with fetched data
        setVendors((prevVendors) => [...prevVendors, ...data.rows]);
        setLoading(false);
        setPageNumber((prevPageNumber) => prevPageNumber + 1);
      })
      .catch((error) => {
        console.error("Fetch request failed:", error);
      });
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (
      document.documentElement.scrollHeight -
        (window.innerHeight + document.documentElement.scrollTop) <
      10
    ) {
      fetchVendors();
    }
  };

  // useEffect to fetch vendors on initial render
  useEffect(() => {
    fetchVendors();

    return () => {
      // Cleanup function to prevent memory leaks
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect for infinite scrolling
  useEffect(() => {
    // Add event listener for scroll
    document.addEventListener("scroll", handleScroll);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [vendors]); // Run effect when vendors state changes

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
