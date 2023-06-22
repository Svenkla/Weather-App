import { useQuery, useQueryClient, refe } from "@tanstack/react-query";
import { useState } from "react";
import { Search } from "../components/Search";

export const Home = function () {
  const [searchValue, setSearchValue] = useState("");
  const [show, setShow] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["weather", searchValue],
    queryFn: () =>
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=ffca60bdd6b3d4721511f208d15df769`
      ).then((res) => {
        return res.json();
      }),
    enabled: true,
  });

  const searchCountry = function (e) {
    setShow(true);
  };

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      setShow(true);
    }
  }

  const searchNewCountry = function () {
    setShow(false);
    setSearchValue("");
    refetch();
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
          onKeyDown={handleKeyDown}
        />
        <button onClick={searchCountry}>POTRDI</button>
        <button onClick={searchNewCountry}>Vpiši drugo Državo</button>
      </div>

      {show && (
        <div className="data-container">
          <div className="weatherImage">
            <img
              src={`https://openweathermap.org/img/wn/${data?.weather[0].icon}.png`}
            />
            {data?.weather[0].description}
          </div>

          <div className="All-data">
            <p className="data">Temperature: {data?.main.temp} Celzius</p>
            <p className="data">Feels like: {data?.main.feels_like} Celzius</p>
            <p className="data">Humidity: {data?.main.humidity}%</p>
            <p className="data">Wind speed: {data?.wind.speed} km/h</p>
          </div>
        </div>
      )}
    </div>
  );
};
