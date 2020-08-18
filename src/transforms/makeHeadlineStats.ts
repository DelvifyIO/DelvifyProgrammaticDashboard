import parse from 'date-fns/parse';
import differenceInDays from 'date-fns/differenceInDays';
import {
  IMPRESSIONS, CLICK_RATE, CLICKS, SPEND, CAMPAIGN_ID, CPC, CPM, CPA, TOTAL_CONVERSIONS,
} from './constants';

export default function makeHeadlineStats(metrics, campaignId, dateRangeDays = 30) {
  const historical = {
    impressions: 0, clicks: 0, ctr: 0, spend: 0, cpm: 0, cpc: 0, conversions: 0, cpa: 0,
  };

  const recent = {
    impressions: { val: 0, change: 0 },
    clicks: { val: 0, change: 0 },
    ctr: { val: 0, change: 0 },
    spend: { val: 0, change: 0 },
    cpm: { val: 0, change: 0 },
    cpc: { val: 0, change: 0 },
    conversions: { val: 0, change: 0 },
    cpa: { val: 0, change: 0 },
  };

  function addToHistorical(row): void {
    historical.impressions += Number(row[IMPRESSIONS]);
    historical.clicks += Number(row[CLICKS]);
    historical.spend += Number(row[SPEND]);
    historical.conversions += Number(row[TOTAL_CONVERSIONS]);
  }

  function addToRecent(row): void {
    recent.impressions.val += Number(row[IMPRESSIONS]);
    recent.clicks.val += Number(row[CLICKS]);
    recent.spend.val += Number(row[SPEND]);
    recent.conversions.val += Number(row[TOTAL_CONVERSIONS]);
  }
  return new Promise((resolve, reject) => {
    metrics.forEach((row) => {
      if (campaignId !== row[CAMPAIGN_ID]) { return; }
      const date = parse(row.Date, 'yyyy/MM/dd', new Date());
      const difference = differenceInDays(new Date(), date);
      if (difference > (dateRangeDays * 2)) {
        return;
      }
      difference > dateRangeDays ? addToHistorical(row) : addToRecent(row);
    });
    historical.cpc = historical.clicks ? historical.spend / historical.clicks : 0;
    historical.ctr = historical.impressions ? historical.clicks / historical.impressions : 0;
    historical.cpm = (historical.impressions ? historical.spend / historical.impressions : 0) * 1000;
    historical.cpa = historical.conversions ? historical.spend / historical.conversions : 0;


    recent.cpc.val = recent.clicks.val ? recent.spend.val / recent.clicks.val : 0;
    recent.ctr.val = recent.impressions.val ? recent.clicks.val / recent.impressions.val : 0;
    recent.cpm.val = (recent.impressions.val ? recent.spend.val / recent.impressions.val : 0) * 1000;
    recent.cpa.val = recent.conversions.val ? recent.spend.val / recent.conversions.val : 0;

    recent.impressions.change = (recent.impressions.val - historical.impressions) / recent.impressions.val * 100;
    recent.clicks.change = (recent.clicks.val - historical.clicks) / recent.clicks.val * 100;
    recent.ctr.change = (recent.ctr.val - historical.ctr) / recent.ctr.val;
    recent.spend.change = (recent.spend.val - historical.spend) / recent.spend.val * 100;
    recent.conversions.change = (recent.conversions.val - historical.conversions) / recent.conversions.val * 100;
    recent.cpm.change = (recent.cpm.val - historical.cpm) / recent.cpm.val * 100;
    recent.cpc.change = (recent.cpc.val - historical.cpc) / recent.cpc.val * 100;
    recent.cpa.change = (recent.cpa.val - historical.cpa) / recent.cpa.val * 100;
    return resolve(recent);
  });
}
