import React from "react";
const Country = ({ country, handleShow, weather}) => {
  if (country.length === 0 || country.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else if (country.length <= 10 && country.length > 1) {
    return (
      <>
        {country.map((c) => {
          return (
            <div key={c.name.common}>
              {c.name.common}
              <button onClick={() => handleShow(c.name.common)}>show</button>
            </div>
          );
        })}
      </>
    );
  } else {
      return (
        <>
          <h1>{country[0].name.common}</h1>
          <div>captial {country[0].capital}</div>
          <div>population {country[0].population}</div>
          <h2>language</h2>
          <ul>
            {Object.values(country[0].languages).map((c) => {
              return <li key={c}>{c}</li>;
            })}
          </ul>
          <img src={country[0].flags.png} alt=""></img>
          <h2>Weather in {country[0].capital}</h2>
          <div>
            <b>temperature:</b>
            {weather.main.temp} Kelvin
          </div>
          <img
            alt=""
            src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          ></img>
          <div>
            <b>wind:</b> {weather.wind.speed} m/s direction {weather.wind.deg} degrees
          </div>
        </>
      );
    }
};

export default Country;
