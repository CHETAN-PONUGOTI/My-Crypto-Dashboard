import React from 'react';
import { LineChart, Line, ResponsiveContainer, YAxis } from 'recharts';
import { formatCurrency } from '../lib/formatters';
import { Skeleton } from './ui/Skeleton';

const PageHeader = ({ title, stats, chartData, isLoading }) => {
  if (isLoading) {
    return (
      <header className="mb-6">
        <Skeleton className="h-10 w-3/4 mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </header>
    );
  }

  return (
    <header className="mb-6">
      <h1 className="text-3xl font-bold tracking-tight mb-4">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">Market Cap</p>
          <p className="text-2xl font-bold">{formatCurrency(stats?.marketCap || 0, 0)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <p className="text-sm text-gray-500">24h Trading Volume</p>
          <p className="text-2xl font-bold">{formatCurrency(stats?.volume || 0, 0)}</p>
        </div>
        {chartData && (
          <div className="bg-white p-4 rounded-lg border border-gray-200 h-24">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData} margin={{ top: 5, right: 5, left: -30, bottom: 5 }}>
                <YAxis hide={true} domain={['dataMin', 'dataMax']} />
                <Line type="monotone" dataKey="value" stroke="#8CC63F" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;