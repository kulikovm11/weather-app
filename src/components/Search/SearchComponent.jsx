import React, { useState, useRef } from 'react';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

import { cities } from '../../tools/cities';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '50%',
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0.5),
}));

const SearchIconWrapper = styled(IconButton)(({ theme }) => ({
  padding: theme.spacing(1),
  color: 'inherit',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  flex: 1,
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    transition: theme.transitions.create('width'),
    width: '100%',
  },
}));

const SuggestionsBox = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  backgroundColor: theme.palette.background.paper,
  border: `1px solid ${alpha(theme.palette.common.white, 0.25)}`,
  borderRadius: theme.shape.borderRadius,
  zIndex: 10,
  maxHeight: 200,
  overflowY: 'auto',
}));

function SearchComponent({ city, setCity, handleSearch }) {
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [warning, setWarning] = useState('');
  const inputRef = useRef();

  
  const debounce = (func, delay = 200) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const updateSuggestions = debounce((value) => {
    if (!value) return setSuggestions([]);
    const filtered = cities.filter(c =>
      c.name.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filtered);
    setHighlightIndex(-1);
  }, 150);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s]*$/.test(value)) {
      setCity(value);
      setWarning('');
      updateSuggestions(value);
    } else {
      setWarning('Only English letters');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (highlightIndex >= 0 && suggestions[highlightIndex]) {
        selectCity(suggestions[highlightIndex].name);
      } else {
        handleSearch(city);
      }
      setSuggestions([]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const selectCity = (name) => {
    setCity(name);
    handleSearch(name);
    setSuggestions([]);
  };

  return (
    <>
      <Search>
        <StyledInputBase
          placeholder="Enter the city..."
          value={city}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          inputProps={{ 'aria-label': 'search' }}
          autoComplete="off"
          ref={inputRef}
        />
        <SearchIconWrapper onClick={() => handleSearch(city)}>
          <SearchIcon />
        </SearchIconWrapper>

        {suggestions.length > 0 && (
          <SuggestionsBox>
            {suggestions.map((c, index) => (
              <Box
                key={c.name}
                sx={{
                  padding: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  backgroundColor:
                    index === highlightIndex ? alpha('#000', 0.1) : 'transparent',
                  '&:hover': { backgroundColor: alpha('#000', 0.1) },
                }}
                onMouseEnter={() => setHighlightIndex(index)}
                onClick={() => selectCity(c.name)}
              >
                <img
                  src={`https://flagcdn.com/w20/${c.countryCode.toLowerCase()}.png`}
                  alt=""
                  width={20}
                />
                {c.name}
              </Box>
            ))}
          </SuggestionsBox>
        )}

        {warning && (
          <Alert
            icon={<CheckIcon fontSize="inherit" />}
            severity="error"
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 0.5,
              zIndex: 20,
            }}
          >
            {warning}
          </Alert>
        )}
      </Search>
    </>
  );
}

export { SearchComponent };
