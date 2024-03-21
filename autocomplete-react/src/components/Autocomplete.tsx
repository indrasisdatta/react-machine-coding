import { useState, useEffect } from "react";

export const Autocomplete = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (!searchItem || searchItem?.length < 3) {
      setSuggestions([]);
      return;
    }
    fetchProductsApi();
  }, [searchItem]);

  const fetchProductsApi = async () => {
    const data = await fetch(
      "https://dummyjson.com/products/search?q=" + searchItem,
    );
    const json = await data.json();
    console.log("Product api data", json);
    setSuggestions(json.products);
  };

  const handleInputChange = (e) => {
    setSearchItem(e.target.value);
  };

  return (
    <>
      <div>
        <label>Search item </label>
        <input
          type="text"
          placeholder="Search item"
          onChange={handleInputChange}
          value={searchItem}
        />
      </div>
      {suggestions && suggestions.length > 0 && (
        <div className="suggestions">
          <ul>
            {suggestions &&
              suggestions.map((prod) => <li key={prod.id}>{prod.title}</li>)}
          </ul>
        </div>
      )}
      {searchItem?.length >= 3 && suggestions?.length === 0 && (
        <p>No items found</p>
      )}
      {searchItem?.length > 0 && searchItem?.length < 3 && (
        <p>Enter at least 3 characters to search</p>
      )}
    </>
  );
};
