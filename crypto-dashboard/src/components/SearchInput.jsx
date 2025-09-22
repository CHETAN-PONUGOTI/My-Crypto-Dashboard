import { Search } from 'lucide-react';
import React from 'react';

const SearchInput = ({ value, onChange, placeholder = "Search for a coin..." }) => {
  return (
    <div className="relative w-full md:w-1/3 mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default SearchInput;