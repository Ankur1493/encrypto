"use client"

import { useEffect, useState } from 'react';
import { formatCryptoData, CryptoDataPoint, FormattedDataPoint } from '@/lib/formatCryptoData';
import axios from 'axios';
import ReactApexChart from "react-apexcharts";
import { candleStickOptions } from "@/constants"

const CandleChart = ({ symbol }: { symbol: string }) => {
  const [formattedData, setFormattedData] = useState<FormattedDataPoint[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/historicalData?symbol=${symbol}`);
        const dataString: string = response.data;
        const dataArray: string[] = dataString.split(',');
        const cryptoData: CryptoDataPoint[] = [];

        for (let i = 0; i < dataArray.length; i += 11) {
          const dataPoint: CryptoDataPoint = {
            timestamp: parseInt(dataArray[i]),
            open: dataArray[i + 1],
            high: dataArray[i + 2],
            low: dataArray[i + 3],
            close: dataArray[i + 4],
            volume: dataArray[i + 5],
            closeTime: parseInt(dataArray[i + 6]),
            quoteAssetVolume: dataArray[i + 7],
            numberOfTrades: parseInt(dataArray[i + 8]),
            takerBuyBaseAssetVolume: dataArray[i + 9],
            takerBuyQuoteAssetVolume: dataArray[i + 10],
          };
          cryptoData.push(dataPoint);
        }

        const formattedData = formatCryptoData(cryptoData);
        setFormattedData(formattedData);
        console.log(formattedData)
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, [symbol]);


  return (
    <div className='w-full h-screen flex justify-center items-center'>
      {formattedData.length > 0 ? (
        <div className='w-[800px] bg-gray-500'>
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

