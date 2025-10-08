import { Card, CardContent, Typography, Grid } from "@mui/material";
import { useWeatherStore } from '../../store/weather-state';
import Skeleton from '@mui/material/Skeleton';

import style from '../AdditionalPart/AddPart.module.css'


function AdditionalPart({loading, error}) {

    const { data } = useWeatherStore();

    if (!data) return null;
    console.log(data);
    

   const weatherParams = [
  { label: 'Feels like', value: `${Math.round(data.feels_like)}°C` },
  { label: 'Humidity', value: `${data.humidity}%` },
  { label: 'Wind', value: `${data.windspeed} km/h` },
  { label: 'Precipitation', value: `${data.precipitation} mm` },
];

    return (
    <div className={style.wrap}>
      {weatherParams.map((param) => (
        <Card
          key={param.label}
          sx={{
            flex: '1 1 calc(25% - 15px)', 
            minWidth: 150, 
            height: 120,
            margin: '5px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'hsl(243, 23%, 30%)',
            color: 'hsl(240, 6%, 70%)',
            borderRadius: '15px',
          }}
        >
         {loading || error? ( <CardContent sx={{ textAlign: 'center' }}>
            <Skeleton variant="text" width={75} />
            <Skeleton variant="rounded" width={75} height={32} />
          </CardContent>)
          :
          ( <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {param.label}
            </Typography>
            <Typography variant="h5" sx={{ fontWeight: 700 }}>
              {param.value}
            </Typography>
          </CardContent>)}
        </Card>
      ))}
    </div>
  );
}


export {AdditionalPart}