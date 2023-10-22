import React from 'react';
import styles from './WeatherSummary.module.scss';

const WeatherSummary = ({ selectedCity, weatherData }) => {
  return (
    <section className={styles.weatherSummary}>
      <img
        className={styles.weatherIcon}
        alt={weatherData ? weatherData.description : ''} 
        src={`${process.env.PUBLIC_URL}/images/weather-icons/${weatherData ? weatherData.icon : '13d'}.png`} 
      />
      <div className={styles.weatherInfo}>
        <h2>{selectedCity || 'Select a city'}</h2>
        <p>
          <strong>Temp:</strong> {weatherData ? `${weatherData.temp}°C` : ''}
        </p>
      </div>
    </section>
  );
};

export default WeatherSummary;
