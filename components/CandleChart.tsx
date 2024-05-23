"use client"

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic
import { formatCryptoData, CryptoDataPoint, FormattedDataPoint } from '@/lib/formatCryptoData';
import axios from 'axios';
const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { candleStickOptions } from "@/constants"

const CandleChart = ({ symbol }: { symbol: string }) => {
  const [formattedData, setFormattedData] = useState<FormattedDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
  }, [symbol]);


  return (
    <div className='w-screen h-fit flex flex-col justify-center items-center'>
      {formattedData.length > 0 ? (
        <div className='w-2/4 bg-gray-200 rounded-lg p-3'>
          <ReactApexChart
            series={
              [
                {
                  data: formattedData
                }
              ]
            }
            type="candlestick"
            //@ts-ignore
            options={candleStickOptions}
          />
        </div>
      ) : (<h1>Loading....</h1>)
      }
    </div>
  );
};

export default CandleChart;

