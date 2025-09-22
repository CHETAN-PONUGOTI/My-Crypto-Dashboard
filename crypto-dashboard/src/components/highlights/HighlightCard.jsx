import React from 'react';
import { Skeleton } from '../ui/Skeleton';
import { formatCurrency, formatPercentage } from '../../lib/formatters';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const HighlightCard = ({ title, coins, isLoading, error }) => {
  if (error) {
    return <div className="text-red-500">Failed to load {title}.</div>;
  }

  return (
    // Added h-full, p-6, border, shadow-lg for better styling
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 h-full">
      <h3 className="font-bold text-lg mb-4">{title}</h3>

      {/* Increased spacing between list items with space-y-4 */}
      <div className="space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-1">
                  <Skeleton className="h-4 w-20" />
                   <Skeleton className="h-3 w-8" />
                </div>
              </div>
              <Skeleton className="h-4 w-16" />
            </div>
          ))
        ) : (
          coins?.slice(0, 5).map((coin) => ( // Show 5 items per card
            <div key={coin.id} className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-3">
                <img src={coin.image} alt={coin.name} width={32} height={32} className="rounded-full" />
                <div>
                  <p className="font-semibold">{coin.name}</p>
                  <p className="text-xs text-gray-500">{coin.symbol.toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <p>{formatCurrency(coin.price, 4)}</p>
                <p className={`flex items-center justify-end text-xs ${coin.change > 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {coin.change > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                  {formatPercentage(coin.change)}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HighlightCard;