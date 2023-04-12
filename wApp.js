import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        `https://api.openweathermap.org/data/2.5/forecast?q=Bucharest,ro&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
      );
      setWeatherData(result.data);
    };

    fetchData();
  }, []);

  const data = {
    labels: weatherData?.list?.map((data) => data.dt_txt),
    datasets: [
      {
        label: "Temperature",
        data: weatherData?.list?.map((data) => data.main.temp),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <>
      {weatherData ? (
        <>
          <h2>{weatherData.city.name}</h2>
          <Line data={data} />
        </>
      ) : (
        <p>Loading weather data...</p>
      )}
    </>
  );
};

export default Weather;