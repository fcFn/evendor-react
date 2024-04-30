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
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [maxRating, setMaxRating] = useState(5);

  // Function to fetch vendors from the API
  const fetchVendors = async () => {
    if (!reachedEnd) {
      setLoading(true);
      try {
        let url = `http://localhost:8080/vendors?page=${pageNumber}`;
        // Add filters to the URL if they are set
        if (selectedCategory !== "" && selectedCategory !== "All") {
          url += `&category=${selectedCategory}`;
        }
        if (minPrice !== 0) {
          url += `&minPrice=${minPrice}`;
        }
        if (maxPrice !== 1000) {
          url += `&maxPrice=${maxPrice}`;
        }
        if (minRating !== 0) {
          url += `&minRating=${minRating}`;
        }
        if (maxRating !== 5) {
          url += `&maxRating=${maxRating}`;
        }

        console.log("Fetch URL:", url); // Log the fetch URL

        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        console.log("Fetched Data:", data); // Log the fetched data

        // Ensure data is an array
        if (!Array.isArray(data)) {
          console.error("Vendors data is not an array:", data);
          setReachedEnd(true); // Set reachedEnd to true to stop fetching more data
          setLoading(false);
          return;
        }

        if (data.length === 0) {
          setReachedEnd(true); // If no more vendors to load, set reachedEnd to true
        } else {
          setVendors(data); // Update vendors state with fetched data (replace existing data)
          setPageNumber(pageNumber + 1); // Increment page number by 1
        }
        setLoading(false);
      } catch (error) {
        console.error("Fetch request failed:", error);
        setLoading(false);
      }
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
  useEffect(
    () => fetchVendors(),
    [selectedCategory, minPrice, maxPrice, minRating, maxRating]
  );
  // useEffect for infinite scrolling
  useEffect(() => {
    // Add event listener for scroll
    document.addEventListener("scroll", handleScroll, { passive: true });

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]); // Include handleScroll in the dependency array

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

  // Function to handle category change
  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // Function to handle min price change
  const handleMinPriceChange = (event) => {
    setMinPrice(Number(event.target.value));
  };

  // Function to handle max price change
  const handleMaxPriceChange = (event) => {
    setMaxPrice(Number(event.target.value));
  };

  // Function to handle min rating change
  const handleMinRatingChange = (event) => {
    setMinRating(Number(event.target.value));
  };

  // Function to handle max rating change
  const handleMaxRatingChange = (event) => {
    setMaxRating(Number(event.target.value));
  };

  return (
    <div>
      <div>
        <h2>Available Vendors</h2>
        {/* Filter controls */}
        <div>
          <label htmlFor="category">Category:</label>
          <select id="category" onChange={handleCategoryChange}>
            <option value="All">All</option>
            <option value="Photographer">Photographer</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Musician">Musician</option>
            <option value="Catering">Catering</option>
          </select>
          <label htmlFor="minPrice">Min Price:</label>
          <input
            type="number"
            id="minPrice"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <label htmlFor="maxPrice">Max Price:</label>
          <input
            type="number"
            id="maxPrice"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <label htmlFor="minRating">Min Rating:</label>
          <input
            type="number"
            id="minRating"
            value={minRating}
            onChange={handleMinRatingChange}
          />
          <label htmlFor="maxRating">Max Rating:</label>
          <input
            type="number"
            id="maxRating"
            value={maxRating}
            onChange={handleMaxRatingChange}
          />
        </div>
        <VendorListContainer>
          {vendors.map((vendor) => (
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
