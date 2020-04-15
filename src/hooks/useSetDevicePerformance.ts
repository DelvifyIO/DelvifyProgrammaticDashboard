import { useState, useEffect } from 'react';
import { fetchReport } from '../services/api';
import { makeDevicePerformance } from '../transforms';

export default function (qid, selectedCampaignId) {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    (async function setDevicePerformance() {
      setIsLoading(true);
      const reportData = await fetchReport(qid);
      setData(makeDevicePerformance(reportData, selectedCampaignId));
      setIsLoading(false);
    }());
  }, []);

  return { isLoading, data };
}
