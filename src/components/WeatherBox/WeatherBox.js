import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import ErrorBox from '../ErrorBox/ErrorBox';
import { useCallback, useState } from 'react';

const WeatherBox = props => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState('');
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null); 

  const handleCityChange = useCallback((cityName) => {
    setSelectedCity(cityName);
    setPending(true);
    setError(null);

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=0ab6b4e7ea54f326e7a8573d0927b968&units=metric`)
      .then(res => {
        if (res.status === 200) {
          return res.json()
            .then(data => {
              const weatherData = {
                city: data.name,
                temp: data.main.temp,
                icon: data.weather[0].icon,
                description: data.weather[0].main
              };
              setWeatherData(weatherData);
              setPending(false);
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
              setPending(false);
              setError('Error');
            });
        } else {
          console.error('Error in request:', res.status);
          setPending(false);
          setError('Error.');
        }
      })
      .catch(error => {
        console.error('Fetch error:', error);
        setPending(false);
        setError('Error.');
      });
  }, []);

  return (
    <section>
      <PickCity onCitySubmit={handleCityChange} />
      {pending ? (
        <Loader />
      ) : error ? (
        <ErrorBox message={error} /> 
      ) : weatherData ? (
        <WeatherSummary selectedCity={selectedCity} weatherData={weatherData} />
      ) : null}
    </section>
  );
};

export default WeatherBox;
