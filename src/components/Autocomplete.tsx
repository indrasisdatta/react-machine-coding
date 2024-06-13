import { useState, useEffect, useDeferredValue } from "react";

export const Autocomplete = () => {
  const [searchItem, setSearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const deferredSearchtem = useDeferredValue(searchItem);

  useEffect(() => {
    if (!deferredSearchtem || deferredSearchtem?.length < 3) {
      setSuggestions([]);
      return;
    }
    fetchProductsApi();
  }, [deferredSearchtem]);

  const fetchProductsApi = async () => {
    const data = await fetch(
      "https://dummyjson.com/products/search?q=" + deferredSearchtem,
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
          value={deferredSearchtem}
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
      {deferredSearchtem?.length >= 3 && suggestions?.length === 0 && (
        <p>No items found</p>
      )}
      {deferredSearchtem?.length > 0 && deferredSearchtem?.length < 3 && (
        <p>Enter at least 3 characters to search</p>
      )}
    </>
  );
};
