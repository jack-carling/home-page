import React, { useState, useEffect, useRef } from 'react';

import css from './Weather.module.scss';

const API_KEY = '8c0a9368d0e58ec72c711ab169b8b109';

interface Weather {
  location: string | null;
  temperature: number | null;
  min: number | null;
  max: number | null;
  description: string | null;
  icon: string | undefined;
}

function Weather() {
  const [weather, updateWeather] = useState<Weather>({
    location: null,
    temperature: null,
    min: null,
    max: null,
    description: null,
    icon: undefined,
  });

  useEffect(() => {
    getPosition();
  }, []);

  const sectionElement = useRef<HTMLElement>(null);

  function getPosition() {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition((location) => {
      const lat = location.coords.latitude;
      const lon = location.coords.longitude;

      getWeather(lat, lon);
    });
  }

  async function getWeather(lat: number, lon: number) {
    const res: Response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    updateWeather({
      ...weather,
      location: data.name,
      temperature: Math.round(data.main.temp),
      min: Math.round(data.main.temp_min),
      max: Math.round(data.main.temp_max),
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    });

    if (sectionElement.current) sectionElement.current.style.opacity = '1';
  }

  return (
    <section className={css.weather} ref={sectionElement}>
      <span className={css.location}>{weather.location}</span>
      <span className={css.temperature}>{weather.temperature}°</span>
      <span>{weather.description}</span>
      <span>
        H: {weather.max}° L: {weather.min}°
      </span>
      <img src={weather.icon} alt="" />
    </section>
  );
}

export default Weather;
