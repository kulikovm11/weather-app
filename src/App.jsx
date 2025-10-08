import { useCallback, useState } from 'react';

import { useWeatherStore } from "./store/weather-state";
import { SearchComponent } from './components/Search/SearchComponent'; 
import { MainCard } from './components/MainCard/MainCard';
import { Hourly_forecast } from './components/Hourly_forecast/Hourly_forecast';
import { ErrorPage } from './components/ErrorPage/ErrorPage';
import { AdditionalPart } from './components/AdditionalPart/AdditionalPart';
import { DailyForecast } from './components/DailyForecast/DailyForecast';
import './App.css'


function App() {
  const [city, setCity] = useState("");
  const [lastCity, setLastCity] = useState("");
  const { data, loading,hourly, error, fetchWeatherByCity } = useWeatherStore();

  const handleSearch = useCallback((searchCity) => {
  const query = searchCity.trim() || city.trim() || lastCity.trim();
  if (!query) return;

  fetchWeatherByCity(query);
  console.log("retrying for city:", query);
  setLastCity(query);

  setCity("")
}, [city, lastCity, fetchWeatherByCity]);
 
  
  return (

    
    <div className='main-container'>
      
       {!error && (
    <div className="top-section">
      <h2 style={{ color: 'hsl(0, 0%, 100%)' }}>How's the sky looking today?</h2>
      <SearchComponent 
      city={city}
        setCity={setCity} 
        handleSearch={handleSearch} 
      />
     
    </div>
  )}
      
      {error && <ErrorPage onRetry={() => handleSearch(data?.name)}/>}
      <div className='wrapper'>
        <div className='leftPart' >
              {data && (
          <MainCard
            city={data.name}
            country={data.country}
            temperature={data.temperature}
            condition={data.condition}
            loading={loading} 
            error={error} 
          />
        )}
         {data && (
    <div className='additional-daily-wrapper'>
      <AdditionalPart loading={loading} error={error} />
      <DailyForecast loading={loading} error={error} />
    </div>
  )}
        </div>
        
        {data && (<Hourly_forecast
          hourly={hourly}   
          loading={loading} 
          error={error}     
        />)}
    </div>
      
    </div>
  );
}

export default App;
