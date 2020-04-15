import { useState, useEffect } from 'react';
import { fetchReport } from '../services/api';
import { makePerformanceByTime } from '../transforms';

export default function useSetPerformanceByTime(qid, selectedCampaignId) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [rangeCap, setRangeCap] = useState(1);

  useEffect(() => {
    (async function setPerformanceByTime() {
      setIsLoading(true);
      const reportData = await fetchReport(qid);
      const { formatted, rangeCap: rangeMax } = makePerformanceByTime(
        reportData, selectedCampaignId,
      );
      setRangeCap(rangeMax);
      setData(formatted);
      setIsLoading(false);
    }());
  }, []);


  return { data, rangeCap, isLoading };
}
