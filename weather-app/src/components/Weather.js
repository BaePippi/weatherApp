import React, { useState } from "react";
import axios from "axios";

const API_KEY = "502c6236cb77f41edd4be739de30ed18";

function WeatherApp() {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [clothes, setClothes] = useState("");

  const fetchWeatherData = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
    console.log(response.data.main);
    if (response.data.main.temp >= 28) {
      setClothes("민소매, 반팔, 반바지, 짧은 치마, 린넨 옷");
    } else if (response.data.main.temp <= 27 && response.data.main.temp >=23) {
      setClothes("반팔, 얇은 셔츠, 반바지, 면바지");
    } else if (response.data.main.temp <= 22 && response.data.main.temp >= 20) {
      setClothes("블라우스, 긴팔 티, 면바지, 슬랙스, 얇은 가디건, 청바지");
    } else if (response.data.main.temp <= 19 && response.data.main.temp >= 17) {
      setClothes("얇은 가디건, 니트, 맨투맨, 후드, 긴 바지");
    } else if (response.data.main.temp <= 16 && response.data.main.temp >= 12) {
      setClothes("자켓, 가디건, 청자켓, 니트, 스타킹, 청바지, 면바지");
    } else if (response.data.main.temp <= 11 && response.data.main.temp >= 9) {
      setClothes("트렌치 코트, 야상점퍼, 자켓, 니트, 스타킹, 청바지, 기모바지");
    } else if (response.data.main.temp <= 8 && response.data.main.temp >= 5) {
      setClothes("울코트, 히트텍, 가죽옷, 기모, 니트, 레깅스");
    } else {
      setClothes("패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData && (
        <div>
          <h2>{weatherData.name}날씨</h2>
          <p>{weatherData.weather[0].description}</p>
          <p>온도: {weatherData.main.temp}°C</p>
          <p>체감기온: {weatherData.main.feels_like}°C</p>
          <p>기온별 옷차림: {clothes}</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
