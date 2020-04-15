import { useEffect } from 'react';
import Chart from 'chart.js';

import { chartOptions, parseOptions } from '../utils/charts';
import { makeLineGraph } from '../transforms';

export default ({
  dailyMetrics, campaignId, setData, setIsLoading,
}) => useEffect(() => {
  (async function () {
    setIsLoading(true);
    parseOptions(Chart, chartOptions());
    const data = makeLineGraph(dailyMetrics, campaignId, 'Impressions');
    setData(data);
    setIsLoading(false);
  }());
}, []);
