import React from 'react';
import useSWR from 'swr';
import HighlightCard from '../components/highlights/HighlightCard';
import { getCoinMarkets, getTrendingCoins } from '../lib/api';

const HighlightsPage = () => {
  // Fetch all necessary data directly on this page
  const { data: marketsData, error: marketsError, isLoading: marketsLoading } = useSWR('/coins/markets', () => getCoinMarkets(1, 100));
  const { data: trendingData, error: trendingError, isLoading: trendingLoading } = useSWR('/search/trending', getTrendingCoins);

  // Process data for each card
  const topGainers = marketsData
    ?.slice()
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .map(c => ({ id: c.id, name: c.name, symbol: c.symbol, image: c.image, price: c.current_price, change: c.price_change_percentage_24h }));

  const topLosers = marketsData
    ?.slice()
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .map(c => ({ id: c.id, name: c.name, symbol: c.symbol, image: c.image, price: c.current_price, change: c.price_change_percentage_24h }));

  const trendingCoins = trendingData?.coins.map(c => {
    const marketData = marketsData?.find(m => m.id === c.item.id);
    return { id: c.item.id, name: c.item.name, symbol: c.item.symbol, image: c.item.large, price: marketData?.current_price || 0, change: marketData?.price_change_percentage_24h || 0 };
  });

  const isLoading = marketsLoading || trendingLoading;

  return (
    <div>
      <h1 className="text-4xl font-extrabold tracking-tight mb-4">Crypto Highlights</h1>
      <p className="text-gray-500 mb-8">Discover the most interesting cryptocurrencies and market trends.</p>

      {/* This grid will now correctly lay out each card */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <HighlightCard title="🔥 Trending" coins={trendingCoins} isLoading={isLoading} error={trendingError} />
        <HighlightCard title="🚀 Top Gainers (24h)" coins={topGainers} isLoading={isLoading} error={marketsError} />
        <HighlightCard title="📉 Top Losers (24h)" coins={topLosers} isLoading={isLoading} error={marketsError} />
      </div>
    </div>
  );
};

export default HighlightsPage;