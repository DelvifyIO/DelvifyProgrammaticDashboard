import { useEffect, useState } from 'react';
import { fetchReport } from '../services/api';
import makeHeadlineStats from '../transforms/makeHeadlineStats';

const last30Days = {
  impressions: { val: 0, change: 0 },
  clicks: { val: 0, change: 0 },
  ctr: { val: 0, change: 0 },
  spend: { val: 0, change: 0 },
  cpm: { val: 0, change: 0 },
  cpc: { val: 0, change: 0 },
  conversions: { val: 0, change: 0 },
  cpa: { val: 0, change: 0 },
};

export default function ({
  qid, dailyMetrics, selectedCampaignId, headlineDateRange,
}) {
  const [stats, setStats] = useState(last30Days);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async function useHeadlineStats() {
      setIsLoading(true);
      let data = dailyMetrics;
      if (data.length === 0) {
        data = await fetchReport(qid);
      }
      setStats(await makeHeadlineStats(data, selectedCampaignId, headlineDateRange));
      setIsLoading(false);
    }());
  }, [headlineDateRange]);

  return { stats, isLoading };
}
