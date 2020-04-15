import { useEffect, useState } from 'react';
import { fetchReport } from '../services/api';
import { makeMap, makeRegionTable } from '../transforms';

export default function ({ qid, selectedCampaignId }) {
  const [isLoading, setIsLoading] = useState(false);
  const [mapData, setMapData] = useState({ Conversions: { HK: 100 } });
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    (async function setRegionalData() {
      setIsLoading(true);
      const data = await fetchReport(qid);
      setMapData(makeMap(data, selectedCampaignId));
      setTableData(makeRegionTable(data, selectedCampaignId));
      setIsLoading(false);
    }());
  }, []);

  return { isLoading, mapData, tableData };
}
