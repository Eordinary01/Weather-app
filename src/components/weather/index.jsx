import React, { useEffect, useState } from "react";
import Search from "../search";

export default function Weather() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState(null);

  async function fetchWeatherData(param) {
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=f219354b8392840b38a13f775d5e6ead`
      );

      const data = await response.json();

      if (data.cod === 200) {
        setWeatherData(data);
        setLoading(false);
      } else {
        setLoading(false);
        setWeatherData(null);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  }

  useEffect(() => {
    fetchWeatherData("bangalore");
  }, []);

  useEffect(() => {
    if (search) {
      fetchWeatherData(search);
    }
  }, [search]);

  function getCurrentDate() {
    return new Date().toLocaleDateString("en-us", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div>
      <Search
        search={search}
        setSearch={setSearch}
      />
      {loading ? (
        <div className="loading">loading...</div>
      ) : (
        weatherData && weatherData.cod === 200 && (
          <div>
            <div className="city-name">
              <h2>
                {weatherData.name}, <span>{weatherData.sys.country}</span>
              </h2>
            </div>
            <div className="date">
              <span>{getCurrentDate()}</span>
            </div>
            <div className="temp">{weatherData.main.temp}<span>K</span></div>
            <p className="description">
              {weatherData.weather[0].description}
            </p>

            <div className="weather-info">
              <div className="column">
                <div>
                  <p className="wind">{weatherData.wind.speed}</p>
                  <p>Wind Speed</p>
                </div>
              </div>
              <div className="column">
                <div>
                  <p className="humidity">{weatherData.main.humidity}%</p>
                  <p>Humidity</p>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
