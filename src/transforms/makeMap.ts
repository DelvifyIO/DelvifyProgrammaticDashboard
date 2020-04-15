import {
  IMPRESSIONS, CLICKS, TOTAL_CONVERSIONS, SPEND, CAMPAIGN_ID,
} from './constants';

export default function makeMap(regionalMetrics, campaignId) {
  const mapData = {
    Impressions: {},
    Clicks: {},
    Spend: {},
    Conversions: {},
  };
  regionalMetrics.forEach((row) => {
    if (row[CAMPAIGN_ID] !== campaignId) {
      return;
    }
    mapData.Impressions[row.Country] = Number(row[IMPRESSIONS]);
    mapData.Clicks[row.Country] = Number(row[CLICKS]);
    mapData.Spend[row.Country] = Number(row[SPEND]);
    mapData.Conversions[row.Country] = Number(row[TOTAL_CONVERSIONS]);
  });
  return mapData;
}
