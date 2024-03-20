import { useState } from 'react';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchEnter = (event) => {
    if(event.key === 'Enter') {
        onSearch(event.target.value); // Call onSearch prop with search term
    }
    else if(event.target.value == "") 
            onSearch("");
  };
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    if(event.target.value === ""){
        handleSearchEnter(event)
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearchChange}
        onKeyDown={handleSearchEnter}
      />
    </div>
  );
};

export default SearchBar;