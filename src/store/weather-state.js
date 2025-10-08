
import { create } from "zustand";

const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Drizzle: Light',
  53: 'Drizzle: Moderate',
  55: 'Drizzle: Dense',
  56: 'Freezing Drizzle: Light',
  57: 'Freezing Drizzle: Dense',
  61: 'Rain: Slight',
  63: 'Rain: Moderate',
  65: 'Rain: Heavy',
  66: 'Freezing Rain: Light',
  67: 'Freezing Rain: Heavy',
  71: 'Snow fall: Slight',
  73: 'Snow fall: Moderate',
  75: 'Snow fall: Heavy',
  77: 'Snow grains',
  80: 'Rain showers: Slight',
  81: 'Rain showers: Moderate',
  82: 'Rain showers: Violent',
  85: 'Snow showers slight',
  86: 'Snow showers heavy',
  95: 'Thunderstorm: Slight or moderate',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

export const useWeatherStore = create((set) => ({
  data: null,
  hourly:null,
  loading: false,
  error: null,

  fetchWeather: async (lat, lon) => {
    set({ loading: true, error: null });

    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=temperature_2m,weathercode`
      );
      if (!res.ok) throw new Error("Ошибка запроса");

      const json = await res.json();
      
      const hourlyData = json.hourly.time.map((time, idx)=>({
        time,
        temp: json.hourly.temperature_2m[idx],
        code: json.hourly.weathercode[idx],
        condition: weatherCodes[json.hourly.weathercode[idx]] || "Unknown",
      }))


      set({ data: json, hourly:hourlyData, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchWeatherByCity: async (city) => {
    set({ loading: true, error: null });

    try {
      // throw new Error("Simulated API failure");
      
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=en&format=json`
      );
      if (!geoRes.ok) throw new Error("Ошибка геокодинга");

      const geoJson = await geoRes.json();
      if (!geoJson.results || geoJson.results.length === 0) {
        throw new Error("Город не найден");
      }

      const { latitude, longitude, name, country } = geoJson.results[0];

      console.log(geoJson.results[0]);
      
      const weatherRes = await fetch(
  `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&hourly=temperature_2m,weathercode,apparent_temperature,relativehumidity_2m,precipitation&windspeed_unit=kmh&daily=temperature_2m_max,temperature_2m_min,weathercode`
);
    if (!weatherRes.ok) throw new Error("Ошибка погоды");


      const weatherJson = await weatherRes.json();

      const { temperature, windspeed, weathercode } = weatherJson.current_weather;

      const currentTime = new Date(weatherJson.current_weather.time);
      const closestIndex = weatherJson.hourly.time.reduce((closest, time, idx) => {
        const t = new Date(time);
        return Math.abs(t - currentTime) < Math.abs(new Date(weatherJson.hourly.time[closest]) - currentTime) ? idx : closest;
      }, 0);

      const feels_like = weatherJson.hourly.apparent_temperature[closestIndex];
      const humidity = weatherJson.hourly.relativehumidity_2m[closestIndex];
      const precipitation = weatherJson.hourly.precipitation[closestIndex];


       const hourlyData = weatherJson.hourly.time.map((time, idx) => ({
        time,
        temp: weatherJson.hourly.temperature_2m[idx],
        code: weatherJson.hourly.weathercode[idx],
        condition: weatherCodes[weatherJson.hourly.weathercode[idx]] || "Unknown",
      }));

      const dailyData = weatherJson.daily.time.map((date, idx) => ({
        date,
        weekday: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }), // Mon, Tue...
        maxTemp: weatherJson.daily.temperature_2m_max[idx],
        minTemp: weatherJson.daily.temperature_2m_min[idx],
        code: weatherJson.daily.weathercode[idx],
        condition: weatherCodes[weatherJson.daily.weathercode[idx]] || 'Unknown',
      }));



      
      
      
      set({ 
        data:  {
        name,
        country,
        windspeed,
        weathercode,
        temperature,
        feels_like,
        humidity,
        precipitation,
        condition: weatherCodes[weathercode] || 'Unknown',
      }, 
          hourly:hourlyData,
          daily: dailyData,
          loading: false 
        });
    } catch (err) {
      set({ error: err.message, loading: false });
    }

    
  },
}));
