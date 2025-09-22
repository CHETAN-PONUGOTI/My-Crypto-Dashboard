export const formatCurrency = (amount, maximumFractionDigits = 2) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits,
  }).format(amount);
};

export const formatLargeNumber = (num) => {
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    compactDisplay: 'short',
  }).format(num);
};

export const formatPercentage = (percent) => {
  // Check if the percent value is null or undefined
  if (percent === null || typeof percent === 'undefined') {
    return '—'; // Return a simple dash for missing data
  }
  // If we have a valid number, format it
  return `${percent.toFixed(2)}%`;
};