export const candleStickOptions = {
  chart: {
    type: 'candlestick',
    height: 350,
    toolbar: {
      show: true,
    }
  },
  title: {
    text: 'CandleStick Chart',
    align: 'left'
  },
  xaxis: {
    type: 'datetime',
    labels: {
      format: 'dd MMM',
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
};

