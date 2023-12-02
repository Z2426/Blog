import React, { useState } from 'react';
import { TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useBlog } from '../middleware/contextHooks'
const SearchBar = () => {
  const [query, setQuery] = useState('');
  const { searchByTitle } = useBlog();
 
  const handleSearch = async () => {
    try {
      await searchByTitle(query);
    } catch (error) {
      console.error('Error searching:', error);
    }
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label="Search"
        variant="outlined"
        size="small"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <IconButton onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </div>
  );
};

export default SearchBar;
