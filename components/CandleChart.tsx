"use client"

import { useEffect, useState } from 'react';
import { formatCryptoData, CryptoDataPoint, FormattedDataPoint } from '@/lib/formatCryptoData';
import axios from 'axios';
import { candleStickOptions } from "@/constants"
import dynamic from 'next/dynamic'; // Import dynamic
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
//import ReactApexChart from "react-apexcharts"
const CandleChart = ({ symbol }: { symbol: string }) => {
  const [formattedData, setFormattedData] = useState<FormattedDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Be sure to replace this URL with the actual endpoint where you fetch historical data
        const response = await axios.get(`/api/historicalData?symbol=${symbol}`);
        const responseData = response.data;
        const cryptoData: CryptoDataPoint[] = [];

        for (let i = 0; i < responseData.length; i++) {
          const dataPoint: CryptoDataPoint = {
            timestamp: responseData[i][0],
            open: responseData[i][1],
            high: responseData[i][2],
            low: responseData[i][3],
            close: responseData[i][4],
            volume: responseData[i][5],
            closeTime: responseData[i][6],
            quoteAssetVolume: responseData[i][7],
            numberOfTrades: responseData[i][8],
            takerBuyBaseAssetVolume: responseData[i][9],
            takerBuyQuoteAssetVolume: responseData[i][10],
          };
          cryptoData.push(dataPoint);
        }
        const formattedData = formatCryptoData(cryptoData);
        setFormattedData(formattedData);
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();

    // WebSocket connection for live updates
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${symbol.toLowerCase()}@kline_1m`);
    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);
      const { k: { t: timestamp, o: open, h: high, l: low, c: close } } = response;
      const newDataPoint: FormattedDataPoint = {
        x: new Date(timestamp),
        y: [
          parseFloat(open),
          parseFloat(high),
          parseFloat(low),
          parseFloat(close),
        ]
      };
      setFormattedData((prevData) => {
        if (prevData.length > 0) {
          const lastDataPoint = prevData[prevData.length - 1];
          const lastDataPointDateStr = lastDataPoint.x.toISOString().split('T')[0];
          const newDataPointDateStr = newDataPoint.x.toISOString().split('T')[0];

          if (lastDataPointDateStr === newDataPointDateStr) {
            return [...prevData.slice(0, prevData.length - 1), newDataPoint];
          }
        }
        return [...prevData, newDataPoint];
      });
    };

    return () => ws.close();
  }, [symbol]);

  return (
    <div className='w-screen h-fit flex flex-col justify-center items-center'>
      {formattedData.length > 0 ? (
        <div className='sm:w-2/4 bg-gray-200 rounded-lg p-3'>
          <div>
            <ReactApexChart
              series={[{ data: formattedData }]}
              type="candlestick"
              //@ts-ignore
              options={candleStickOptions}
            />
          </div>
          <div className='flex justify-between'>
            <p>Last updated at {formattedData[formattedData.length - 1].x.toLocaleString()}</p>
            <p>Current price - {formattedData[formattedData.length - 1].y[3]}</p>
            {formattedData.length > 1 && (
              <p>
                {formattedData[formattedData.length - 1].y[3] > formattedData[formattedData.length - 2].y[3]
                  ? 'Price is going up'
                  : 'Price is going down'}
                {' '}
              </p>
            )}
          </div>
        </div>
      ) : (<h1>Loading....</h1>)
      }
    </div>
  );
};

export default CandleChart;
