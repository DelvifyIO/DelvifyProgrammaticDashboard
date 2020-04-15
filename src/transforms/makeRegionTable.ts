import {
  TOTAL_CONVERSIONS, CAMPAIGN_ID,
} from './constants';

export default function makeRegionTable(regionalMetrics, campaignId) {
  const countries = [];
  regionalMetrics.forEach((row) => {
    if (row[CAMPAIGN_ID] !== campaignId || countries.length > 5) {
      return;
    }
    const src = require(`../assets/img/flags/${row.Country.toLowerCase()}.png`);
    countries.push({ country: row.Country, conversions: Number(row[TOTAL_CONVERSIONS]), src });
  });
  return countries;
}
