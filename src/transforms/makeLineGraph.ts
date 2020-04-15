import { CAMPAIGN_ID } from './constants';

interface LineGraphData {
  datasets: {label: string[]; data: {x: string; y: string }[]}[];
}

export default function makeLineGraph(dailyMetrics, campaignId, dailyMetricsKey): LineGraphData {
  const campaignData = dailyMetrics
    .filter((row) => row[CAMPAIGN_ID] === campaignId);

  const metrics = campaignData.map((row) => ({
    x: row.Date,
    y: row[dailyMetricsKey],
  }));

  return {
    datasets: [{
      label: dailyMetricsKey, data: metrics,
    }],
  };
}
