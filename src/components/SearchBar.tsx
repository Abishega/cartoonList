import React, { useState } from 'react';
import InputField from '@/widgets/InputField';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  
  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  return (
    <div className=" ">
      <InputField
        placeholder="Search Cartoons..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyPress}  

      />

    </div>
  );
};

export default SearchBar;

