import React, { useState, useEffect } from "react";
import axios from "axios";

import cloudImg from "./assets/cloud.png";
import rainImg from "./assets/rain.png";
import hazeImg from "./assets/haze.png";
import snowImg from "./assets/snow.png";
import sunImg from "./assets/sun.png";
import tornadoImg from "./assets/tornado.png";

function App() {
      const [data, setData] = useState({});
      const [location, setLocation] = useState('');
      const [imageUrl, setImageUrl] = useState('');

      const weatherIcon = (weather) => {
            switch (weather) {
                  case "Clouds":
                        return <img src={cloudImg} alt="Cloudy weather" />;
                  case "Clear":
                        return <img src={sunImg} alt="Clear weather" />;
                  case "Rain":
                        return <img src={rainImg} alt="Rainy weather" />;
                  case "Haze":
                        return <img src={hazeImg} alt="Hazey weather" />;
                  case "Snow":
                        return <img src={snowImg} alt="Snowfall" />;
                  case "Tornado":
                        return <img src={tornadoImg} alt="Tornado weather" />;
                  default:
                        return null;
            }
      };

      const unsplashAccessKey = 'JQFM3RGTfszkj0AN2v_l9GJx1hiFus8Kf0bVEqOMsPo';

      const fetchCityImage = async () => {
            try {
                  const response = await axios.get(`https://api.unsplash.com/search/photos?query=${location}&client_id=${unsplashAccessKey}`);
                  const imageData = response.data.results[0];

                  if (imageData) {
                        setImageUrl(imageData.urls.regular);
                  }
            } catch (error) {
                  console.error('Error fetching city image:', error);
            }
      };

      const searchLocation = (event) => {
            if (event.key === "Enter") {
                  axios.get(url).then((response) => {
                        setData(response.data);
                  });
                  fetchCityImage();
                  setLocation('');
            }
      };

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=c068fbeaba6aead8e6be96499e099230`;

      return (
            <div style={{ 
                  backgroundImage: `url(${imageUrl})`, 
                  backgroundSize: 'cover', 
                  backgroundRepeat: 'no-repeat', 
                  backgroundPosition: 'center', 
                  width: '100vw', 
                  height: '100vh',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center'
            }}>
            
                  <input type="text" placeholder="Enter location" className="location-input" 
                         value={location} 
                         onChange={event => setLocation(event.target.value)}
                         onKeyUp={searchLocation}>
                  </input>

                  <p className="city">{data.name}</p>
                  {data.main ? <h1 className="temp">{data.main.temp.toFixed()}°C</h1> : ""}
                  {data.weather && <div className="weather-icon">{weatherIcon(data.weather[0].main)}</div>}
                  {data.weather ? <p className="climate">{data.weather[0].main}</p> : ""}
                  {data.name !== undefined &&
                        <div className="info">
                              <div className="humidity">
                                    {data.main ? <p>{data.main.humidity}%</p> : ""}
                                    <p className="extra-info">HUMIDITY</p>
                              </div>
                              
                              <div className="wind">
                                    {data.wind ? <p>{data.wind.speed.toFixed()} KMPH</p> : ""}
                                    <p className="extra-info">WIND SPEED</p>
                              </div>
                        </div>
                  }
            </div>
      );
}

export default App;
