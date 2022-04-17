import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Country from "./componets/Country";
const api_key = process.env.REACT_APP_API_KEY;
const App = () => {
  const [countries, setCountries] = useState([]);
  const [newFilter, setFilter] = useState("");
  const [weather ,setWeather] = useState([])

  const selected = countries.filter((c) => {
    return c.name.common.toLowerCase().includes(newFilter.toLowerCase());
  });

  const hook = () => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${"Beijing"}&appid=${api_key}`
      )
      .then((response) => {
        setWeather(response.data);
      });
  };
  useEffect(hook, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };


  const handleShow = (name) => {
    const country = selected.find((c) => c.name.common === name);
    setFilter(country.name.common);
  };
  return (
    <div>
      find countries
      <input value={newFilter} onChange={handleFilterChange}></input>
      <Country country={selected} handleShow={handleShow} weather={weather}/>
    </div>
  );
};

export default App;
