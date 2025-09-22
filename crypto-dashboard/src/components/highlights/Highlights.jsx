import React from 'react';
import useSWR from 'swr';
import HighlightCard from './HighlightCard';
import { getCoinMarkets, getTrendingCoins } from '../../lib/api';

const Highlights = () => {
  const { data: marketsData, error: marketsError, isLoading: marketsLoading } = useSWR('/coins/markets', () => getCoinMarkets(1, 100));
  const { data: trendingData, error: trendingError, isLoading: trendingLoading } = useSWR('/search/trending', getTrendingCoins);

  const topGainers = marketsData
    ?.slice()
    .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
    .map(c => ({
      id: c.id, name: c.name, symbol: c.symbol, image: c.image, price: c.current_price, change: c.price_change_percentage_24h,
    }));

  const topLosers = marketsData
    ?.slice()
    .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h)
    .map(c => ({
      id: c.id, name: c.name, symbol: c.symbol, image: c.image, price: c.current_price, change: c.price_change_percentage_24h,
    }));

  const trendingCoins = trendingData?.coins.map(c => {
    const marketData = marketsData?.find(m => m.id === c.item.id);
    return {
      id: c.item.id, name: c.item.name, symbol: c.item.symbol, image: c.item.large, price: marketData?.current_price || 0, change: marketData?.price_change_percentage_24h || 0,
    };
  });

  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Market Highlights</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <HighlightCard title="🔥 Trending" coins={trendingCoins} isLoading={trendingLoading || marketsLoading} error={trendingError} />
        <HighlightCard title="🚀 Top Gainers (24h)" coins={topGainers} isLoading={marketsLoading} error={marketsError} />
        <HighlightCard title="📉 Top Losers (24h)" coins={topLosers} isLoading={marketsLoading} error={marketsError} />
      </div>
    </section>
  );
};

export default Highlights;