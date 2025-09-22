import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from './pages/MainLayout';
import HomePage from './pages/HomePage';
import HighlightsPage from './pages/HighlightsPage';
import CategoriesPage from './pages/CategoriesPage';
import CategoryDetailPage from './pages/CategoryDetailPage';

function App() {
  return (
    <div className="container mx-auto p-4 md:p-8 bg-white">
      <main>
        <Routes>
          {/* Main Layout Route */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="highlights" element={<HighlightsPage />} />
            <Route path="categories" element={<CategoriesPage />} />
          </Route>
          
          {/* Category Detail Page has its own layout */}
          <Route path="/categories/:categoryId" element={<CategoryDetailPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;