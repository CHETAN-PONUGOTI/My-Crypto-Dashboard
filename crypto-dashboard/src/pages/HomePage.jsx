import React, { useState } from 'react';
import AllCoinsTable from '../components/AllCoinsTable';
import SearchInput from '../components/SearchInput';
import { useDebounce } from '../hooks/useDebounce';

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  return (
    <>
      <SearchInput value={searchTerm} onChange={setSearchTerm} />
      <AllCoinsTable searchQuery={debouncedSearchTerm} />
    </>
  );
};

export default HomePage;