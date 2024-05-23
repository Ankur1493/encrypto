import type { NextApiRequest } from 'next';
import axios from 'axios';

export async function GET(req: NextApiRequest,) {
  try {
    const { searchParams } = new URL(req.url || "");
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      throw new Error('Invalid symbol parameter');
    }
    const response = await axios.get('https://api.binance.com/api/v3/klines', {
      params: {
        symbol,
        interval: '1d', // Daily interval
        limit: 30, // 30 days
      },
    });
    return new Response(response.data)
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return new Response("Error fetching the data")
  }
}


