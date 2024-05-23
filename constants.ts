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
      datetimeUTC: true,  // Ensure dates are shown in UTC
      format: 'dd MMM HH:mm'
    }
  },
  yaxis: {
    tooltip: {
      enabled: true
    }
  }
};

