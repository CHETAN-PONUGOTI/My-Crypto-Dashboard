import axios from 'axios';

const apiKey = process.env.REACT_APP_COINGECKO_API_KEY;
const baseURL = process.env.REACT_APP_COINGECKO_API_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'x-cg-demo-api-key': apiKey,
  },
});

export const getCoinMarkets = async (page = 1, perPage = 50, category = null) => {
  try {
    const response = await api.get('/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: perPage,
        page: page,
        sparkline: true,
        price_change_percentage: '24h,7d',
        category: category,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching coin markets:', error);
    throw error;
  }
};

export const getTrendingCoins = async () => {
  try {
    const response = await api.get('/search/trending');
    return response.data;
  } catch (error) {
    console.error('Error fetching trending coins:', error);
    throw error;
  }
};

export const getGlobalStats = async () => {
  try {
    const response = await api.get('/global');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching global stats:', error);
    throw error;
  }
};

export const getCategoriesList = async () => {
  try {
    // We now fetch the full categories endpoint, not just the list
    const response = await api.get('/coins/categories'); 
    return response.data;
  } catch (error) {
    console.error('Error fetching categories list:', error);
    throw error;
  }
};