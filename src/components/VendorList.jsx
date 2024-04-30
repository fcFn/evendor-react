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
  const [reachedEnd, setReachedEnd] = useState(false);

  // Function to fetch vendors from the API
  const fetchVendors = async () => {
    if (!reachedEnd) {
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:8080/vendors?page=${pageNumber}`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        if (data.rows.length === 0) {
          setReachedEnd(true); // If no more vendors to load, set reachedEnd to true
        } else {
          setVendors(prevVendors => [...prevVendors, ...data.rows]); // Update vendors state with fetched data
          setPageNumber(pageNumber + 1); // Increment page number by 1
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch request failed:", error);
        setLoading(false);
      }
    }
  };

  // Function to handle scroll event
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight &&
      !loading &&
      !reachedEnd
    ) {
      fetchVendors(); // Fetch more vendors if scroll reaches the bottom
    }
  };

  // useEffect to fetch vendors on initial render
  useEffect(() => {
    fetchVendors();

    // Cleanup function to prevent memory leaks
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run once on mount

  // useEffect for infinite scrolling
  useEffect(() => {
    // Add event listener for scroll
    document.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Include handleScroll in the dependency array

  return (
    <div>
      <div>
        <h2>Available Vendors</h2>
        <VendorListContainer>
          {vendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </VendorListContainer>
        {!reachedEnd && (
          <Loader style={{ visibility: loading ? "visible" : "hidden" }}>
            Loading...
          </Loader>
        )}
      </div>
    </div>
  );
};

export default VendorList;
