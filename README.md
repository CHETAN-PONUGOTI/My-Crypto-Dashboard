### Crypto Dashboard
  . A responsive and feature-rich cryptocurrency dashboard built with React.js. It fetches and displays live market data from the CoinGecko API, allowing users to track, sort, and filter thousands of cryptocurrencies in a clean and intuitive interface.
  . This project was developed as a comprehensive solution to a company assignment, focusing on clean code, modern design patterns, and a production-quality user experience.


### Features
  Shared Layout & Routing: A persistent header and navigation system built with React Router DOM, providing a seamless multi-page experience.
  Comprehensive Coin Data: A detailed, interactive table for all cryptocurrencies, featuring:
   . Client-side searching and filtering.
   . Multi-column sorting (by rank, price, market cap, etc.).
   . Pagination to handle large datasets.
  Live Sparkline Charts: In-table mini charts from Recharts to visualize the last 7 days of price action for each coin.
  Dynamic Pages:
   . Highlights Page: A grid view of top market performers, including Trending Coins, Top Gainers, and Top Losers.
   . Categories Page: A professionally styled overview of all cryptocurrency categories, with links to detailed views.
  Efficient Data Fetching: Uses SWR for robust data fetching, caching, and automatic revalidation.
  Responsive Design: A clean, mobile-first UI built with Tailwind CSS.
  Resilience: Graceful handling of loading, error, and empty states.


### Tech Stack
  . Framework: React.js (via Create React App)
  . Styling: Tailwind CSS
  . Data Fetching & Caching: SWR & Axios
  . Routing: React Router DOM v6
  . Charting: Recharts
  . Language: JavaScript (ES6+)
  . Icons: Lucide React


### Getting Started
 Follow these instructions to set up and run the project on your local machine.

 Prerequisites
  . Node.js (v18 or later)
  . npm or yarn
  . A free API Key from CoinGecko

  
 Commands to run before getting start
  . npx create-react-app crypto-dashboard
  . cd crypto-dashboard
  . npm install swr axios lucide-react react-router-dom recharts

Run
 . npm start


### File Structure

  crypto-dashboard/
  ├── .env                # Ignored by Git, contains secret API keys
  ├── .gitignore          # Specifies files for Git to ignore
  ├── package.json        # Project metadata and dependencies
  ├── public/
  │   └── index.html      # Main HTML template for the app
  └── src/
      ├── components/     # Reusable UI components shared across pages
      │   ├── highlights/ # Components for the homepage highlights section
      │   ├── ui/         # Generic UI primitives (e.g., Skeleton)
      │   ├── AllCoinsTable.jsx
      │   ├── Navigation.jsx
      │   ├── PageHeader.jsx
      │   └── SearchInput.jsx
      │
      ├── hooks/          # Custom React hooks (e.g., useDebounce)
      │   └── useDebounce.js
      │
      ├── lib/            # API services and utility functions
      │   ├── api.js      # Centralized module for all CoinGecko API calls
      │   └── formatters.js # Utility functions for formatting numbers, currency, etc.
      │
      ├── pages/          # Top-level components that correspond to a page/route
      │   ├── CategoriesPage.jsx
      │   ├── CategoryDetailPage.jsx
      │   ├── HighlightsPage.jsx
      │   ├── HomePage.jsx
      │   └── MainLayout.jsx # Shared layout with header, nav, and Outlet
      │
      ├── App.jsx         # Main component for handling application routing
      ├── index.css       # Global styles and Tailwind CSS directives
      └── index.js        # Entry point for the React application
