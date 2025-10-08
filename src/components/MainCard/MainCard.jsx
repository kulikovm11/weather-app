import { Card, CardContent, Typography, Stack } from "@mui/material";
import Skeleton from '@mui/material/Skeleton';

import { weatherImages } from '../../tools/weather-images'
import { conditionMap } from "../../tools/condition_map";



function MainCard({ city, country, temperature, condition, loading, error }) {


  const iconKey = conditionMap[condition] || 'sunny'; 
  const icon = weatherImages[iconKey];

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <Card
      sx={{
          minWidth: '700px',
          maxWidth: '700px', 
          height: '250px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: 'hsl(233, 67%, 56%)',
          borderRadius: '25px',
          color: 'hsl(0, 0%, 100%)',
          padding: 2,
          marginLeft: '5px',
          backgroundImage: `url('src/assets/images/bg-today-large.svg')`,
          backgroundSize: 'fill',    
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
    >
      {loading || error ?(<CardContent sx={{width:'100%'}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          <div>
            <Skeleton variant="text" width={195} height={50} />
            <Skeleton variant="text" width={195} />
          </div>
             <Skeleton variant="circular" width={100} height={100} />
              <Skeleton variant="rounded" width={243} height={112} />
        </Stack>
      </CardContent>) 
      : 
      (<CardContent sx={{width:'100%'}}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" >
          <div>
            <Typography variant="h5" sx={{fontWeight:'600'}}>{city}, {country}</Typography>
            <Typography sx={{ mb: 1.5, color: 'hsl(250, 6%, 84%)', fontWeight:'600'}}>{formattedDate}</Typography>
          </div>
          <div style={{display:'flex'}}>
              <img style={{width:'100px', height:'100px'}} src={icon} alt={condition} />
              <Typography variant="h1" sx={{fontWeight:'600', paddingLeft:'30px'}}>{temperature}°</Typography>
          </div>        
        </Stack>
      </CardContent>)}
    </Card>
  );
}

export { MainCard };
