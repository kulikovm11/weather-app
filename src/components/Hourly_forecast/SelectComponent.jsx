import {useState} from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


 function SelectComponent({selectedDay, setSelectedDay}) {
  

  const handleChange = (event) => {
    setSelectedDay(event.target.value);
  };

  

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="demo-simple-select-label" sx={{color:'hsl(250, 6%, 84%)'}}>Day</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedDay}
          label="Age"
          onChange={handleChange}
          sx={{color:'hsl(250, 6%, 84%)'}}
        >

          <MenuItem value={'sunday'}>Sunday</MenuItem>
          <MenuItem value={'monday'}>Monday</MenuItem>
          <MenuItem value={'tuesday'}>Tuesday</MenuItem>
           <MenuItem value={'wednesday'}>Wednesday</MenuItem>
          <MenuItem value={'thursday'}>Thursday</MenuItem>
          <MenuItem value={'friday'}>Friday</MenuItem>
          <MenuItem value={'saturday'}>Saturday</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export {SelectComponent}
