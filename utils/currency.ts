import axios from 'axios';

export async function getGbpToBdtRate() {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_RATE_API_KEY}/latest/GBP`);
    return response.data.conversion_rates.BDT;
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
    throw new Error('Failed to fetch exchange rate');
  }
}

export function convertGbpToBdt(gbpAmount: number, exchangeRate: number) {
  return Math.ceil(gbpAmount * exchangeRate);
}