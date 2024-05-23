// Opt out of caching for all data requests in the route segment
export const dynamic = 'force-dynamic'

import axios from 'axios';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url || "");
    const symbol = searchParams.get("symbol");

    if (!symbol) {
      throw new Error('Invalid symbol parameter');
    }

    const endTime = new Date().getTime();
    const startTime = endTime - 30 * 24 * 60 * 60 * 1000;
    console.log(`endTime -- ${endTime}`)
    console.log(`startTime -- ${startTime}`)

    const response = await axios.get('https://api.binance.com/api/v3/uiKlines', {
      params: {
        symbol,
        interval: '1d',
        limit: 30,
        startTime,
        endTime
      },
    });
    return new Response(JSON.stringify(response.data), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching historical data:', error);
    return new Response("Error fetching the data")
  }
}
