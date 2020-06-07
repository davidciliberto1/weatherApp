import React, {useEffect, useState, useCallback} from 'react';
import axios from 'axios'

const api = {
  key: "f5ef63462f0730e80c115487e5826ada",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {
  const [styleWeather, setStyleWeather] = useState('');
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = useCallback((e) =>  {
    if (e.key === "Enter") {
      axios.get(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(result => {
          setWeather(result.data);
          setQuery('');
        });
    }
  });

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`
  }

  useEffect(() => {
    setStyleWeather('app')

    if (weather.main !== undefined) {

      if (weather.main.temp > 20) {
        setStyleWeather('app warm')
      }
      if (weather.main.temp < 20) {
        setStyleWeather('app clouds')
      }
      if (weather.weather[0].main === "Rain") {
        setStyleWeather('app rain')
      }
    }
  }, [weather]);

  return (
    <div
      className={styleWeather}
    >
      <main>
        <div className="search-box">
          <input
            type="text"
            value={query}
            onKeyPress={search}
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
          />
        </div>
        {(typeof weather.main != 'undefined') ? (
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country} </div>
              <div className="date1">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">{Math.round(weather.main.temp)}°c</div>
              <div className="weather">{weather.weather[0].description}</div>
            </div>
          </div>
        ) : <div className="message">{dateBuilder(new Date())}</div>}
      </main>
    </div>
  );
}

export default App;
