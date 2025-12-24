import React, { useState } from "react";
import useFetch from "./fetch";
import "./index.css";

function Home() {
  const [city, setCity] = useState("");
  const [query, setQuery] = useState(null); // triggers fetch when set
  const apiKey = import.meta.env.VITE_WEATHER_KEY;
  const { data, error, loading } = useFetch(
    query
      ? `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${query}`
      : null
  );

  return (
    
    
    <div className={`container  ${data?.current.is_day === 0 ? 'night' : 'day'}`}>
      <div className="weather-card">

      <input id="inp"
        type="text"
        placeholder="Enter City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={() => setQuery(city)}>Get Weather</button>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      {data && (
        <div className="weather-details">
          <h3 className="weather-text temp">Temperature in {query} is {data.current.temp_c}°C</h3>
          <h3 className="weather-text humidity">Humidity in {query} is {data.current.humidity}%</h3>
          <h3 className="weather-text wind">Wind Speed in {query} is {data.current.wind_kph} kph</h3>
          <img src={`https:${data.current.condition.icon}`} alt="Weather-icon" className="weather-icon" />
        </div>
      )}
      </div>
    </div>
  );
}

export default Home;
