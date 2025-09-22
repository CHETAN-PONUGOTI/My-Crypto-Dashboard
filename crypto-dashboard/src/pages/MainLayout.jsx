import React from 'react';
import useSWR from 'swr';
import { Outlet } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import Navigation from '../components/Navigation';
import Highlights from '../components/highlights/Highlights';
import { getGlobalStats } from '../lib/api';

const MainLayout = () => {
  const { data: globalStats, isLoading: statsLoading } = useSWR('globalStats', getGlobalStats);

  const headerStats = {
    marketCap: globalStats?.total_market_cap?.usd,
    volume: globalStats?.total_volume?.usd,
  };

  // This chart data can be improved with a dedicated timeseries endpoint
  const chartData = globalStats?.market_cap_percentage && Object.entries(globalStats.market_cap_percentage)
    .slice(0, 10)
    .map(([key, value]) => ({ name: key, value }));

  return (
    <>
      <PageHeader
        title="Cryptocurrency Prices by Market Cap"
        stats={headerStats}
        chartData={chartData}
        isLoading={statsLoading}
      />

      <div className="my-8">
        <Highlights />
      </div>

      <Navigation />
      
      <div className="mt-6">
        {/* The Outlet is where the child routes (All Coins, Highlights, etc.) will be rendered */}
        <Outlet />
      </div>
    </>
  );
};

export default MainLayout;