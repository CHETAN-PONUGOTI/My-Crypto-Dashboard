import React, { useState, useMemo } from 'react';
import useSWR from 'swr';
import { getCoinMarkets } from '../lib/api';
import { formatCurrency, formatLargeNumber, formatPercentage } from '../lib/formatters';
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Skeleton } from './ui/Skeleton';
import { LineChart, Line, ResponsiveContainer } from 'recharts'; // Import chart components

// ... (TableHeader helper component remains the same)
const TableHeader = ({ label, sortKey, currentSortKey, sortOrder, onSort }) => (
    <th
      className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none"
      onClick={() => onSort(sortKey)}
    >
      <div className="flex items-center">
        {label}
        {currentSortKey === sortKey && (
          <span className="ml-1">{sortOrder === 'asc' ? <ArrowUp size={12} /> : <ArrowDown size={12} />}</span>
        )}
      </div>
    </th>
  );


const AllCoinsTable = ({ searchQuery = '', preloadedData, isLoading: isLoadingProp }) => {
  // ... (All existing state and data fetching logic remains the same)
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState('market_cap_rank');
  const [sortOrder, setSortOrder] = useState('asc');
  const { data, error, isLoading: isLoadingSWR } = useSWR(
    !preloadedData ? `/coins/markets?page=${page}` : null,
    () => getCoinMarkets(page, 50)
  );
  const tableData = preloadedData || data;
  const isLoading = isLoadingProp || isLoadingSWR;
  const handleSort = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };
  const filteredAndSortedData = useMemo(() => {
    if (!tableData) return [];
    const filtered = tableData.filter(
      (coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return [...filtered].sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];
      if (valA === null) return 1;
      if (valB === null) return -1;
      if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
      if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [tableData, searchQuery, sortKey, sortOrder]);


  const renderTableContent = () => {
    // ... (Loading, Error, and Empty states remain the same)
    if (isLoading) {
        return Array.from({ length: 15 }).map((_, i) => (
          <tr key={i} className="border-b border-gray-200">
            <td className="p-4"><Skeleton className="h-4 w-6" /></td>
            <td className="p-4">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1"><Skeleton className="h-4 w-24" /><Skeleton className="h-3 w-8" /></div>
              </div>
            </td>
            <td className="p-4"><Skeleton className="h-4 w-20" /></td>
            <td className="p-4"><Skeleton className="h-4 w-12" /></td>
            <td className="p-4"><Skeleton className="h-4 w-24" /></td>
            <td className="p-4"><Skeleton className="h-4 w-24" /></td>
            <td className="p-4"><Skeleton className="h-8 w-32" /></td>
            <td className="p-4"><Skeleton className="h-8 w-16" /></td>
          </tr>
        ));
      }
  
      if (error) {
          return (<tr><td colSpan={8} className="text-center py-10 text-red-500">Failed to load data. Please try again.</td></tr>);
      }
  
      if (filteredAndSortedData.length === 0) {
        return (<tr><td colSpan={8} className="text-center py-10">No results found.</td></tr>);
      }

    return filteredAndSortedData.map((coin) => {
      const priceData = coin.sparkline_in_7d?.price.map((price, index) => ({
        name: index,
        price: price,
      }));
      const sevenDayChange = coin.price_change_percentage_7d_in_currency || 0;

      return (
        <tr key={coin.id} className="border-b border-gray-200 hover:bg-gray-50 cursor-pointer">
          <td className="p-4 text-sm text-gray-500">{coin.market_cap_rank}</td>
          <td className="p-4">
            <div className="flex items-center space-x-3">
              <img src={coin.image} alt={coin.name} width={32} height={32} className="rounded-full" />
              <div>
                <p className="font-bold">{coin.name}</p>
                <p className="text-gray-500 text-xs">{coin.symbol.toUpperCase()}</p>
              </div>
            </div>
          </td>
          <td className="p-4 font-mono text-sm">{formatCurrency(coin.current_price, 4)}</td>
          <td className={`p-4 text-sm font-semibold ${coin.price_change_percentage_24h > 0 ? 'text-green-500' : 'text-red-500'}`}>
            {formatPercentage(coin.price_change_percentage_24h)}
          </td>
          <td className="p-4 font-mono text-sm">{formatLargeNumber(coin.market_cap)}</td>
          <td className="p-4 font-mono text-sm">{formatLargeNumber(coin.total_volume)}</td>
          {/* New Sparkline Chart Cell */}
          <td className="p-4 w-36">
            {priceData && (
              <ResponsiveContainer width="100%" height={40}>
                <LineChart data={priceData}>
                  <Line type="monotone" dataKey="price" stroke={sevenDayChange >= 0 ? '#10B981' : '#EF4444'} strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </td>
          <td className="p-4">
             <button className="bg-green-100 text-green-700 font-semibold text-xs py-1 px-3 rounded-md hover:bg-green-200">
                Buy
             </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <TableHeader label="#" sortKey="market_cap_rank" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
            <TableHeader label="Price" sortKey="current_price" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <TableHeader label="24h %" sortKey="price_change_percentage_24h" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <TableHeader label="Market Cap" sortKey="market_cap" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            <TableHeader label="Volume (24h)" sortKey="total_volume" currentSortKey={sortKey} sortOrder={sortOrder} onSort={handleSort} />
            {/* New Header for Sparkline */}
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last 7 Days</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"> </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {renderTableContent()}
        </tbody>
      </table>
      {/* ... (Pagination logic remains the same) */}
      {!preloadedData && (
        <div className="p-4 flex justify-center items-center space-x-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1 || isLoading} className="px-4 py-2 text-sm font-medium bg-gray-200 rounded disabled:opacity-50">Previous</button>
          <span className="text-sm">Page {page}</span>
          <button onClick={() => setPage(p => p + 1)} disabled={isLoading} className="px-4 py-2 text-sm font-medium bg-gray-200 rounded disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
};

export default AllCoinsTable;