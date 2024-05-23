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

        const responseData = response.data;
        const cryptoData: CryptoDataPoint[] = [];

        for (let i = 0; i < responseData.length; i++) {
          const dataPoint: CryptoDataPoint = {
            timestamp: responseData[i][0], // Extracting timestamp
            open: responseData[i][1], // Extracting open price
            high: responseData[i][2], // Extracting high price
            low: responseData[i][3], // Extracting low price
            close: responseData[i][4], // Extracting close price
            volume: responseData[i][5], // Extracting volume
            closeTime: responseData[i][6], // Extracting close time
            quoteAssetVolume: responseData[i][7], // Extracting quote asset volume
            numberOfTrades: responseData[i][8], // Extracting number of trades
            takerBuyBaseAssetVolume: responseData[i][9], // Extracting taker buy base asset volume
            takerBuyQuoteAssetVolume: responseData[i][10], // Extracting taker buy quote asset volume
          };
          cryptoData.push(dataPoint); // Pushing the data point to the cryptoData array
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

