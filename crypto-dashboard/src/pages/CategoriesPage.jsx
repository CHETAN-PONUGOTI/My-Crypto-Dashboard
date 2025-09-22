import React from 'react';
import useSWR from 'swr';
import { Link } from 'react-router-dom';
import { getCategoriesList } from '../lib/api';
import { Skeleton } from '../components/ui/Skeleton';
import { formatLargeNumber } from '../lib/formatters';

const CategoriesPage = () => {
  const { data: categories, error, isLoading } = useSWR('categoriesListWithData', () => getCategoriesList({ order: 'market_cap_desc' }));

  if (error) return <div className="text-red-500 py-10">Failed to load categories.</div>;

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Top Coins</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Market Cap</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            Array.from({ length: 15 }).map((_, i) => (
              <tr key={i}>
                <td className="px-6 py-4"><Skeleton className="h-4 w-6" /></td>
                <td className="px-6 py-4"><Skeleton className="h-5 w-32" /></td>
                <td className="px-6 py-4"><Skeleton className="h-6 w-24" /></td>
                <td className="px-6 py-4"><Skeleton className="h-5 w-24" /></td>
              </tr>
            ))
          ) : (
            categories?.map((category, index) => (
              <tr key={category.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm text-gray-500">{index + 1}</td>
                <td className="px-6 py-4">
                  <Link to={`/categories/${category.id}`} className="text-sm font-semibold text-gray-800 hover:text-green-600">
                    {category.name}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <div className="flex -space-x-2">
                    {category.top_3_coins?.map((coin_image_url) => (
                      <img key={coin_image_url} src={coin_image_url} alt="" className="h-6 w-6 rounded-full border-2 border-white" />
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-mono">{formatLargeNumber(category.market_cap || 0)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesPage;