import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
function App() {
  const apiId = import.meta.env.API_KEY;
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  // setInterval(setTime(new Date().toLocaleTimeString()), 1000);
  const [data, setData] = useState({
    coord: {
      lon: 72.8437,
      lat: 19.0177,
    },
    weather: [
      {
        id: 721,
        main: "Haze",
        description: "haze",
        icon: "50n",
      },
    ],
    base: "stations",
    main: {
      temp: 28.01,
      feels_like: 32.6,
      temp_min: 28.01,
      temp_max: 28.01,
      pressure: 1000,
      humidity: 83,
      sea_level: 1000,
      grnd_level: 999,
    },
    visibility: 2200,
    wind: {
      speed: 4.63,
      deg: 230,
      gust: 9.77,
    },
    clouds: {
      all: 100,
    },
    dt: 1720215053,
    sys: {
      type: 1,
      id: 9052,
      country: "IN",
      sunrise: 1720226175,
      sunset: 1720273810,
    },
    timezone: 19800,
    id: 1275339,
    name: "Mumbai",
    cod: 200,
  });
  useEffect(() => {
    setInterval(() => setTime(new Date().toLocaleTimeString(), 1000));
  });
  useEffect(() => {
    () => populate();
  });
  function populate() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${Enter_your_api_id}&units=metric`
          );
          const result = response.data;
          setData(result);
          console.log(result);
          console.log(apiId);
        } catch (error) {
          console.error(error.message);
        }
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="big-container">
      <div className="container">
        <div className="g-item grid-item-1">
          <div className="city-date">
            {data.main ? <p className="city">{data.name}</p> : null}
            <p>{new Date().toLocaleDateString()}</p>
          </div>

          <div className="big-panel">
            <div className="left-flex-top-gridcontainer">
              {data.main ? (
                <div className="left-flex-top-gridcontainer-i1">
                  {Math.floor(data.main.temp)}°
                </div>
              ) : null}
              {data.main ? (
                <div className="left-flex-top-gridcontainer-i2">
                  <img src="/wind.svg" alt="wind" />
                  {data.wind.speed.toFixed(1)} mph
                </div>
              ) : null}
              {data.main ? (
                <div className="left-flex-top-gridcontainer-i3">
                  <img src="/drop.svg" alt="humidity" />
                  {data.main.humidity}%
                </div>
              ) : null}
              {data.weather ? (
                <div className="left-flex-top-gridcontainer-i4">
                  {data.weather[0].description}
                </div>
              ) : null}
            </div>
          </div>

          <div className="day-forecast">
            <div className="days-grid-container">
              <div className="dgc-item hour-1">
                <p>Monday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
              <div className="dgc-item hour-2">
                <p>Tuesday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
              <div className="dgc-item hour-3">
                <p>Wednesday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
              <div className="dgc-item hour-4">
                <p>Thursday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
              <div className="dgc-item hour-5">
                <p>Friday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
              <div className="dgc-item hour-6">
                <p>Saturday</p>
                <p className="dgc-item-degree">20°</p>
                <p>Cloudy</p>
              </div>
            </div>
          </div>
        </div>

        <div className="g-item grid-item-2">
          <div className="right-flex-container">
            <div className="right-flex-top">
              <p className="right-flex-top-heading">
                {new Date().getHours() > 18
                  ? "Good Evening"
                  : new Date().getHours() > 11
                  ? "Good Afternoon"
                  : "Good Morning"}
              </p>

              {/* <p className="right-flex-top-heading">
                {new Date().toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p> */}
              <p className="right-flex-top-heading">{time}</p>

              <div className="right-flex-top-gridcontainer">
                {data.main ? (
                  <div className="right-flex-top-gridcontainer-i1">
                    {Math.floor(data.main.temp)}°
                  </div>
                ) : null}
                {data.main ? (
                  <div>
                    <img src="/wind.svg" alt="wind" />
                    {data.wind.speed.toFixed(1)} mph
                  </div>
                ) : null}
                {data.main ? (
                  <div>
                    <img src="/drop.svg" alt="wind" />
                    {data.main.humidity}%
                  </div>
                ) : null}

                {data.main ? (
                  <div className="right-flex-top-gridcontainer-i4">
                    Feels like {Math.floor(data.main.feels_like)}°
                  </div>
                ) : null}
                {data.weather ? (
                  <div className="right-flex-top-gridcontainer-i5">
                    {data.weather[0].description}
                  </div>
                ) : null}
              </div>
            </div>

            <div className="right-flex-bottom">
              <p className="hourly-heading">Hourly Forecast</p>
              <div className="hourly-grid-container">
                <div className="hgc-item hour-1">
                  <p>{new Date().getHours() + 1}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
                <div className="hgc-item hour-2">
                  <p>{new Date().getHours() + 2}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
                <div className="hgc-item hour-3">
                  <p>{new Date().getHours() + 3}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
                <div className="hgc-item hour-4">
                  <p>{new Date().getHours() + 4}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
                <div className="hgc-item hour-5">
                  <p>{new Date().getHours() + 5}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
                <div className="hgc-item hour-6">
                  <p>{new Date().getHours() + 6}:00</p>
                  <p className="hgc-item-degree">20°</p>
                  <p>Cloudy</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
