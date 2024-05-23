export interface CryptoDataPoint {
  timestamp: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  closeTime: number;
  quoteAssetVolume: string;
  numberOfTrades: number;
  takerBuyBaseAssetVolume: string;
  takerBuyQuoteAssetVolume: string;
}
export interface FormattedDataPoint {
  x: Date;
  y: number[];
}


export const formatCryptoData = (cryptoData: CryptoDataPoint[]): FormattedDataPoint[] => {
  const formattedData: FormattedDataPoint[] = [];

  if (!Array.isArray(cryptoData)) {
    console.error('Crypto data is not an array');
    return formattedData;
  }

  if (cryptoData.length === 0) {
    console.error('Crypto data is empty');
    return formattedData;
  }

  cryptoData.forEach((dataPoint: CryptoDataPoint) => {
    formattedData.push({
      x: new Date(dataPoint.timestamp),
      y: [
        parseFloat(dataPoint.open),
        parseFloat(dataPoint.high),
        parseFloat(dataPoint.low),
        parseFloat(dataPoint.close)
      ]
    });
  });

  return formattedData;
};

