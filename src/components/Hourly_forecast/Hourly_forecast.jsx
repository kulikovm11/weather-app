import * as React from 'react';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import { SelectComponent } from './SelectComponent';
import { useWeatherStore } from '../../store/weather-state';
import { Loader } from '../Loader';
import {weatherImages} from '../../tools/weather-images'



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


function Hourly_forecast({ hourly, loading, error}) {

  const currentDay = new Date()
  .toLocaleString('en-US', {weekday: 'long'})
  .toLowerCase()
  
  const [selectedDay, setSelectedDay] = React.useState(currentDay);

  const filteredHourly = hourly?.filter(item => {
  const localDate = new Date(item.time + 'Z'); 
  const localDay = localDate.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  return localDay === selectedDay;
}) || [];

  const skeletons = Array.from({ length: 12 });

  return (
    <Box
      sx={{
          width: '100%',
          minWidth: 360,
          maxWidth: 500,           
          height: 600,             
          bgcolor: 'hsl(243, 23%, 30%)',
          color: 'hsl(250, 6%, 84%)',
          borderRadius: '25px',
          overflow: 'hidden',  
          display:'flex',
          flexDirection:'column'    
        }}
    >
     
      {loading || error? <Skeleton animation="wave"/> : <ListSubheader
        component="div"
        id="nested-list-subheader"
        sx={{
          bgcolor: 'hsl(243, 23%, 30%)',
          color: 'hsl(250, 6%, 84%)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          pt:3
        }}
      >
        Hourly forecast
        <SelectComponent selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
      </ListSubheader>}

      
      <Box
       sx={{
          flexGrow:1,
          overflowY: 'auto',
          px: 0,

          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'hsl(250, 6%, 60%)',
            borderRadius: '3px',
            minHeight: '30px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'hsl(250, 6%, 70%)',
          },
        }}
      >
      <List>
          {loading || error
            ? skeletons.map((_, idx) => (
                <ListItemButton key={idx}>
                  <Skeleton variant="text" width={120} />
                  <Skeleton variant="circular" width={40} height={40} />
                </ListItemButton>
              ))
            :filteredHourly.map((item, idx) => {
                const localDate = new Date(item.time + 'Z');
                let hours = localDate.getHours();
                const ampm = hours >= 12 ? 'PM' : 'AM';
                hours = hours % 12 || 12;
                const formattedTime = `${hours} ${ampm}`;
                const imgSrc = getWeatherImage(item.code);
                return (
                  <ListItemButton key={idx} sx={{border:'1px solid hsl(243, 27%, 20%)', mx:2, my:2, borderRadius:'10px'}}>
                    <ListItemText primary={`${formattedTime}`} />
                    <ListItemText primary={`${item.temp}°C`} primaryTypographyProps={{ fontWeight: 800 }} />
                    <img src={imgSrc} alt={item.condition} style={{ width: 40, height: 40 }} />
                  </ListItemButton>
                );
              })}
        </List>
      </Box>
    </Box>
  );
}

export { Hourly_forecast };
