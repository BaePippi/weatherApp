import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "502c6236cb77f41edd4be739de30ed18";

function Location() {
  const [location, setLocation] = useState(null);

  const [weatherData, setWeatherData] = useState({});
  const [clothes, setClothes] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");
  const [windDeg, setWindDeg] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude });
    });
  }, []);

  useEffect(() => {
    if (location === null) {
      return;
    }
    const lat = location.lat;
    const lon = location.lon;


    axios
      .get("https://api.openweathermap.org/data/2.5/weather", {
        params: {
          lat: lat,
          lon: lon,
          lang: "kr",
          units: "metric",
          appid: API_KEY,
        }
      })
      .then((res) => {
        setWeatherData(res.data);
      });
  }, [location]);

  useEffect(() => {
    if (weatherData.main) {
      if (weatherData.main.temp >= 28) {
        setClothes("민소매, 반팔, 반바지, 짧은 치마, 린넨 옷");
      } else if (weatherData.main.temp <= 27 && weatherData.main.temp >= 23) {
        setClothes("반팔, 얇은 셔츠, 반바지, 면바지");
      } else if (weatherData.main.temp <= 22 && weatherData.main.temp >= 20) {
        setClothes("블라우스, 긴팔 티, 면바지, 슬랙스, 얇은 가디건, 청바지");
      } else if (weatherData.main.temp <= 19 && weatherData.main.temp >= 17) {
        setClothes("얇은 가디건, 니트, 맨투맨, 후드, 긴 바지");
      } else if (weatherData.main.temp <= 16 && weatherData.main.temp >= 12) {
        setClothes("자켓, 가디건, 청자켓, 니트, 스타킹, 청바지, 면바지");
      } else if (weatherData.main.temp <= 11 && weatherData.main.temp >= 9) {
        setClothes(
          "트렌치 코트, 야상점퍼, 자켓, 니트, 스타킹, 청바지, 기모바지"
        );
      } else if (weatherData.main.temp <= 8 && weatherData.main.temp >= 5) {
        setClothes("울코트, 히트텍, 가죽옷, 기모, 니트, 레깅스");
      } else {
        setClothes("패딩, 두꺼운 코트, 누빔 옷, 기모, 목도리");
      }
    }
    if (weatherData.weather) {
      const iconCode = weatherData.weather[0].icon;
      setWeatherIcon(`http://openweathermap.org/img/wn/${iconCode}@2x.png`);
    }
    const WindType = {
      N0: [0, "북"],
      NNE: [1, "북북동"],
      NE: [2, "북동"],
      ENE: [3, "동북동"],
      E: [4, "동"],
      ESE: [5, "동남동"],
      SE: [6, "남동"],
      SSE: [7, "남남동"],
      S: [8, "남"],
      SSW: [9, "남남서"],
      SW: [10, "남서"],
      WSW: [11, "서남서"],
      W: [12, "서"],
      WNW: [13, "서북서"],
      NW: [14, "북서"],
      NNW: [15, "북북서"],
      N16: [16, "북"],

      value: function (value) {
        for (const type in this) {
          if (this[type][0] === value) {
            return this[type];
          }
        }
        return null;
      },
    };

    function getWindDirection(degree) {
      const result = Math.floor((degree + 22.5 * 0.5) / 22.5);
      const windType = WindType.value(result);
      return windType[1];
    }
    if(weatherData.wind){
      const wd = getWindDirection(weatherData.wind.deg);
      setWindDeg(wd);
    }
    

  }, [weatherData]);
  const fetchWeatherData = async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&lang=kr&units=metric`;
    const response = await axios.get(url);
    setWeatherData(response.data);
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
          onChange={(e) => {
            setLocation(e.target.value)
          }}
        />
        <button type="submit">Get Weather</button>
      </form>
      {weatherData.main && (
        <div>
          <h2>{weatherData.name}날씨</h2>
          <p>
            {weatherData.weather[0].description}
            <img src={weatherIcon}></img>
          </p>
          <p>기온: {weatherData.main.temp}°C</p>
          <p>체감기온: {weatherData.main.feels_like}°C</p>
          <p>습도: {weatherData.main.humidity}%</p>
          <p>최저기온: {weatherData.main.temp_min}°C</p>
          <p>
            바람: {windDeg} {weatherData.wind.speed}m/s
          </p>
          {/* <p>강수량: {weatherData.rain}</p> */}
        </div>
      )}
      {clothes[0] && <p>기온별 옷차림: {clothes}</p>}
    </div>
  );
}

export default Location;
