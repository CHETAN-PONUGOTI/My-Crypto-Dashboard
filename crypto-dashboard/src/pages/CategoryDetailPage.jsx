import React from 'react';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import { getCoinMarkets } from '../lib/api';
import AllCoinsTable from '../components/AllCoinsTable';
import PageHeader from '../components/PageHeader';

const CategoryDetailPage = () => {
  const { categoryId } = useParams();

  // We need to fetch all coins for the category to calculate stats.
  // In a real-world scenario, a dedicated API endpoint for category stats would be better.
  const { data: coins, error, isLoading } = useSWR(['categoryCoins', categoryId], () => getCoinMarkets(1, 250, categoryId));

  if (error) return <div className="text-red-500">Failed to load category data.</div>;
  
  // Calculate stats from the fetched coins
  const stats = coins?.reduce((acc, coin) => {
    acc.marketCap += coin.market_cap || 0;
    acc.volume += coin.total_volume || 0;
    return acc;
  }, { marketCap: 0, volume: 0 });

  const chartData = coins?.slice(0, 10).map(c => ({ name: c.symbol, value: c.market_cap }));

  const categoryName = categoryId.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  return (
    <>
      <PageHeader title={categoryName} stats={stats} chartData={chartData} isLoading={isLoading} />
      {/* We pass the fetched data directly to the table to avoid re-fetching */}
      <AllCoinsTable preloadedData={coins} isLoading={isLoading} />
    </>
  );
};

export default CategoryDetailPage;