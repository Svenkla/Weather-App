import { useState, useEffect } from "react";
import { Search } from "../components/Search";

export const Home = function () {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);
  const [data, setData] = useState(null);

  const fetchUserData = () => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ffca60bdd6b3d4721511f208d15df769`
    )
      .then((response) => response.json())
      .then((info) => {
        setData(info);
      })
      .catch((error) => {
        console.error("Napaka pri pridobivanju podatkov:", error);
      });
  };

  const searchCountry = function () {
    fetchUserData();
    setShow(true);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      fetchUserData();
      setShow(true);
    }
  };

  return (
    <div>
      <div className="header">
        <h1>WEATHER APP</h1>
      </div>

      <div className="iskanje">
        <Search
          setSearchValue={setSearchValue}
          searchValue={searchValue}
          handleKeyDown={handleKeyDown}
        />
        <button onClick={searchCountry}>POTRDI</button>
      </div>

      {show && data && (
        <div className="data-container">
          <div className="weatherImage">
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
              alt={data.weather[0].description}
            />
            {data.weather[0].description}
          </div>

          <div className="All-data">
            <p className="data">
              <span>Temperature:</span> {data.main.temp.toFixed(1)} Celzius
            </p>
            <p className="data">
              <span>Feels like:</span> {data.main.feels_like.toFixed(1)} Celzius
            </p>
            <p className="data">
              <span>Humidity:</span> {data.main.humidity}%
            </p>
            <p className="data">
              <span>Wind speed:</span> {data.wind.speed} km/h
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
