import { useState, useEffect } from 'react';
import Chart from 'chart.js';
import { chartOptions, parseOptions } from '../utils/charts';
import { fetchReport } from '../services/api';
import { makeCreativeSize } from '../transforms';

export default function ({ qid, selectedCampaignId }) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({ Impressions: { HK: 100 } });

  useEffect(() => {
    (async function setCreativeSize() {
      setIsLoading(true);
      parseOptions(Chart, chartOptions());
      const reportData = await fetchReport(qid);
      setData(makeCreativeSize(reportData, selectedCampaignId));
      setIsLoading(false);
    }());
  }, []);

  return { data, isLoading };
}
