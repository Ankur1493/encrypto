"use client"

import { useEffect, useState } from 'react';
import { formatCryptoData, CryptoDataPoint, FormattedDataPoint } from '@/lib/formatCryptoData';
import axios from 'axios';

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
      } catch (error) {
        console.error('Error fetching crypto data:', error);
      }
    };

    fetchData();
  }, [symbol]);

  return (
    <div>
      <div>Historical Data: {JSON.stringify(formattedData)}</div>
    </div>
  );
};

export default CandleChart;

