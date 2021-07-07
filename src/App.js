import React, { useState, useEffect } from "react";
import { Input, FirstPage, SecondPage, Button } from "./components";
import Cards from "./Cards";

import "./App.css";
import axios from "axios";

function App() {
  const API_KEY = "5b28acdebf394d5f8e2235338212906";
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState();
  const [url, setUrl] = useState();
  const [time, setTime] = useState(
    "https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
  );
  const [temperature, setTemperature] = useState("Celsius");
  const [more, setMore] = useState({ message: "Show More", state: false });

  const removeAccents = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };

  useEffect(() => {
    const getLocation = () => {
      navigator.geolocation.watchPosition((position) => {
        setLocation(`${position.coords.latitude},${position.coords.longitude}`);
      });
    };
    getLocation();
    if (location) {
      setUrl(
        `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location}&days=7`
      );
    }
  }, [location]);

  useEffect(() => {
    if (location) {
      axios
        .get(url)
        .then(({ data: { location, current, forecast } }) =>
          setData({
            country: location.country,
            city: removeAccents(location.name.toLowerCase()).includes(location)
              ? removeAccents(location.region)
              : removeAccents(location.name),
            windKph: current.wind_kph,
            actualDay: location.localtime.split(" ")[0],
            actualTime: location.localtime.split(" ")[1],
            lastUpdate: current.last_updated.split(" ")[1],
            isDay: current.is_day,
            cloud: current.cloud,
            tempC: current.temp_c,
            tempF: current.temp_f,
            maxTempC: forecast.forecastday[0].day.maxtemp_c,
            maxTempF: forecast.forecastday[0].day.maxtemp_f,
            minTempC: forecast.forecastday[0].day.mintemp_c,
            minTempF: forecast.forecastday[0].day.mintemp_f,
            humidity: current.humidity,
            pressure: current.pressure_mb / 1000,
            code: current.condition,
            latitude: location.lat,
            longitude: location.lon,
            forecast: forecast.forecastday,
          })
        )
        .then(() => {
          if (data.actualTime.split(":")[0] < 12) {
            setTime(
              "https://images.pexels.com/photos/531767/pexels-photo-531767.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            );
          } else if (
            data.actualTime.split(":")[0] >= 12 &&
            data.actualTime.split(":")[0] < 18
          ) {
            setTime(
              "https://images.pexels.com/photos/2386144/pexels-photo-2386144.jpeg?cs=srgb&dl=pexels-anderson-martins-2386144.jpg&fm=jpg"
            );
          } else {
            setTime(
              "https://images.pexels.com/photos/1624360/pexels-photo-1624360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            );
          }
        })
        .catch((err) => console.error(err));
      setIsLoading(false);
    }
  }, [url, location, data.actualTime]);

  if (isLoading || !data.code) {
    return <h1>wait</h1>;
  } else {
    return (
      <div className="App">
        <FirstPage back={time} >
          <Input
            type="text"
            placeholder="Search City"
            onChange={(e) =>
              setLocation(removeAccents(e.target.value).toLowerCase())
            }
          />
          <div style={{ position: "fixed", top: "0", left: "0" }}>
            <Button onClick={() => setTemperature("Celsius")}>ºC</Button>
            <Button onClick={() => setTemperature("Fahrenheit")}>ºF</Button>
          </div>
          <h1>
            {data.city}, {data.country}
          </h1>
          <h2>
            {parseInt(data.actualDay.split("-")[2])} /{" "}
            {parseInt(data.actualDay.split("-")[1])} /
            {data.actualDay.split("-")[0]}
          </h2>
          <p>actual time: {data.actualTime}</p>
          <p>last update: {data.lastUpdate}</p>
          <p>{data.code.text}</p>
          {temperature === "Celsius" ? (
            <>
              <p>temp: {data.tempC} °C</p>
              <p>
                Low: {data.minTempC}°C - High: {data.maxTempC}°C
              </p>
            </>
          ) : (
            <>
              <p>Temp: {data.tempF} °F</p>
              <p>
                Low: {data.minTempF}°F High: {data.maxTempF}°F
              </p>
            </>
          )}
          <img src={data.code.icon} alt={data.code.text} />

          {more.state && (
            <>
              {" "}
              <p>
                Cloud: {data.cloud} % / Humidity: {data.humidity} % / Pressure:{" "}
                {data.pressure} bar / Wind velocity: {data.windKph} kph
              </p>
              <p>
                Latitude: {data.latitude}° - Longitude: {data.longitude}°
              </p>
            </>
          )}
          <Button
            onClick={() =>
              setMore({
                ...more,
                state: !more.state,
                message: more.state ? "Show More" : "Show Less",
              })
            }
          >
            {more.message}
          </Button>
          <Cards data={data.forecast[0].hour} temperature={temperature} />
        </FirstPage>
        <SecondPage>
          {console.log(data.forecast.slice(1, data.forecast.length))}
          {data.forecast
            .slice(1, data.forecast.length)
            .map(({ date, day, hour }, index) => (
              <div
                key={index}
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <h2>
                  {parseInt(date.split("-")[2])} /{" "}
                  {parseInt(date.split("-")[1])} /{date.split("-")[0]}
                </h2>
                {temperature === "Celsius" ? (
                  <p>
                    Low: {day.mintemp_c}°C - High: {day.maxtemp_c}°C
                  </p>
                ) : (
                  <p>
                    Low: {day.mintemp_f}°F - High: {day.maxtemp_f}°F
                  </p>
                )}
                <p>will it rain?: {day.daily_will_it_rain ? "Yes" : "No"}</p>
                <Cards data={hour} temperature={temperature} />
              </div>
            ))}
        </SecondPage>
      </div>
    );
  }
}

export default App;
