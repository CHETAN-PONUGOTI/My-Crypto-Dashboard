import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'All Coins' },
  { path: '/highlights', label: 'Highlights' },
  { path: '/categories', label: 'Categories' },
];

const Navigation = () => {
  const activeLinkStyle = {
    borderColor: '#8CC63F', // CoinGecko Green
    color: '#333',
    fontWeight: '600',
  };

  return (
    <nav className="border-b border-gray-200">
      <ul className="flex items-center space-x-6">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className="py-3 px-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700"
              style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;