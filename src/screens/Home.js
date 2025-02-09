import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Card from "../components/Card";
import Carousel from "../components/Carousel";



export default function App() {
  const [search, setSearch] = useState(''); // State for search input
  const [Cat, setCat] = useState([]); // Categories array
  const [items, setItem] = useState([]); // Items array

  const loadData = async () => {
    try {
      // Fetch the items and categories from the API
      let response = await fetch("http://localhost:5000/api/data", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data); // Log the response to see the structure
      setItem(data.items || []); // Set items from the response
      setCat(data.itemCategory || []); // Set categories from the response
    } catch (error) {
      console.error("Failed to load data:", error);
      setItem([]); // In case of an error, set items to an empty array
      setCat([]); // In case of an error, set categories to an empty array
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const categories = ["Exclusive", "Item/Product", "Waste"];

  const handleSearch = (event) => {
    setSearch(event.target.value); // Update search input state
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase()) // Filter items by search input
  );

  return (
    <div>
      <Navbar />
      <Carousel Cat={Cat} search={search} handleSearch={handleSearch} />
      <div>
        {/* Render Categories */}
        {categories.map((category) => (
          <div key={category} className="category-container">
            <div className="category-header">{category}</div>
            <hr />
            {filteredItems && filteredItems.length > 0 ? (
              <div className="card-container">
                {filteredItems
                  .filter((item) => item.CategoryName === category)
                  .map((filteredItem) => (
                    <div key={filteredItem._id} className="card-item">
                      <Card item={filteredItem} /> {/* Pass item to Card component */}
                    </div>
                  ))}
              </div>
            ) : (
              <div className="no-items">No Items Available</div>
            )}
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}
