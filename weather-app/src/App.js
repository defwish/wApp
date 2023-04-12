import React, { useState } from 'react';
import Weather from './Weather';

const App = () => {
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <label htmlFor="city">Enter city: </label>
      <input
        type="text"
        name="city"
        value={city}
        onChange={handleCityChange}
      />
      {city && <Weather city={city} />}
    </div>
  );
};

export default App;
