import { Card, CardContent, Typography } from "@mui/material";
import { useWeatherStore } from "../../store/weather-state";
import { weatherImages } from "../../tools/weather-images";
import Skeleton from '@mui/material/Skeleton';

import style from "./DailyForecast.module.css";


function getWeatherImage(code) {
  if ([0, 1].includes(code)) return weatherImages.sunny;
  if ([2].includes(code)) return weatherImages.party_cloudy;
  if ([3].includes(code)) return weatherImages.overcast;
  if ([45, 48].includes(code)) return weatherImages.fog;
  if ([51, 53, 55, 56, 57].includes(code)) return weatherImages.drizzle;
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return weatherImages.rain;
  if ([71, 73, 75, 77, 85, 86].includes(code)) return weatherImages.snow;
  if ([95, 96, 99].includes(code)) return weatherImages.storm;
  return weatherImages.sunny;
}


  

function DailyForecast({loading, error}) {

    const { daily } = useWeatherStore();

  if (!daily) return null;

  
    return (
    <div className={style.wrap}>
      {daily.slice(0, 7).map((day) => (
        <Card
          key={day.date}
          sx={{
            width: 120,
            minHeight: 150,
            backgroundColor: "hsl(243, 23%, 30%)",
            color: "white",
            borderRadius: "15px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 5px",
          }}
        >
          {loading || error?
          (<CardContent sx={{ textAlign: "center", p: 1 }}>
            <Skeleton variant="text" width={55} height={28} />
            <Skeleton variant="circular" width={50} height={50} />
            <Skeleton variant="text" width={55} height={28}/>
          </CardContent>)
          :
          (<CardContent sx={{ textAlign: "center", p: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              {day.weekday}
            </Typography>
            <img 
              src={getWeatherImage(day.code)} 
              alt={day.condition} 
              style={{ width: 50, height: 50, margin: '5px 0' }} 
            />
            <Typography variant="body1" sx={{ mt: 1 }}>
              {Math.round(day.maxTemp)}° / {Math.round(day.minTemp)}°
            </Typography>
          </CardContent>)}
        </Card>
      ))}
    </div>
  );
}


export {DailyForecast}