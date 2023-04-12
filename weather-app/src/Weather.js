import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";

const Weather = ({ city }) => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}&units=metric`
      );
      const data = await response.json();
      setWeatherData(data);
    };

    fetchWeatherData();
  }, [city]);

  useEffect(() => {
    if (weatherData) {
      const ctx = document.getElementById("myChart").getContext("2d");
      const chart = new Chart(ctx, {
        type: "line",
        data: {
          labels: ["Now", "+3 hours", "+6 hours", "+9 hours", "+12 hours"],
          datasets: [
            {
              label: "Temperature",
              data: [
                weatherData.main.temp,
                weatherData.main.temp + 3,
                weatherData.main.temp + 6,
                weatherData.main.temp + 9,
                weatherData.main.temp + 12,
              ],
              fill: false,
              borderColor: "rgb(75, 192, 192)",
              tension: 0.1,
            },
          ],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [weatherData]);

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>
        Weather in {weatherData.name}, {weatherData.sys.country}
      </h2>
      <div>Temperature: {weatherData.main.temp} °C</div>
      <div>Description: {weatherData.weather[0].description}</div>
      <canvas id="myChart" width="400" height="400"></canvas>
    </div>
  );
};

export default Weather;
