import { useState } from "react";

const AddressInput = (initialValue) => {
    
  const [value, setValue] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);

  const handleChange = async (event) => {
    setValue(event.target.value);

    try {
      const endpoint = `https://api.mapbox.com/geocoding/v5/mapbox.places/${event.target.value}.json?access_token=pk.eyJ1IjoiZWRlbWRvdHNleSIsImEiOiJjbGFsN24zejIwMmN2M251cnFyY29naG51In0.NneTwwXscVduGn7xu1tTfA`;
      const response = await fetch(endpoint);
      const results = await response.json();
      setSuggestions(results?.features);
      // console.log(results, response )
    } catch (error) {
      console.log("Error fetching data, ", error);
    }
  };

  return {
    value,
    onChange: handleChange,
    setValue,
    suggestions,
    setSuggestions
  };
};

export default AddressInput;
