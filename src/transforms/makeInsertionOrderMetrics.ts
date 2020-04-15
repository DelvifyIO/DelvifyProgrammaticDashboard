import {
  CLICK_RATE, CAMPAIGN_ID, TOTAL_CONVERSIONS, SPEND, CLICKS, IMPRESSIONS,
  INSERTION_ORDER_ID, INSERTION_ORDER_NAME, CPA, CPM, CPC,
} from './constants';

export default function makeInsertionOrderMetrics(alltimeMetrics, campaignId) {
  return alltimeMetrics
    .filter((row) => row[CAMPAIGN_ID] === campaignId)
    .map((row) => ({
      insertionOrderId: row[INSERTION_ORDER_ID],
      insertionOrderName: row[INSERTION_ORDER_NAME],
      impressions: row[IMPRESSIONS],
      clicks: row[CLICKS],
      clickRate: row[CLICK_RATE],
      spend: row[SPEND],
      conversions: row[TOTAL_CONVERSIONS],
      cpa: row[CPA],
      cpm: row[CPM],
      cpc: row[CPC],
    }));
}
