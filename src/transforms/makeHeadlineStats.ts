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
    historical.ctr += Number(row[CLICK_RATE].slice(0, -1));
    historical.spend += Number(row[SPEND]);
    historical.conversions += Number(row[TOTAL_CONVERSIONS]);
    historical.cpc += Number(row[CPC]);
    historical.cpm += Number(row[CPM]);
    historical.cpa += Number(row[CPA]);
  }

  function addToRecent(row): void {
    recent.impressions.val += Number(row[IMPRESSIONS]);
    recent.clicks.val += Number(row[CLICKS]);
    recent.ctr.val += Number(row[CLICK_RATE].slice(0, -1));
    recent.spend.val += Number(row[SPEND]);
    recent.conversions.val += Number(row[TOTAL_CONVERSIONS]);
    recent.cpc.val += Number(row[CPC]);
    recent.cpm.val += Number(row[CPM]);
    recent.cpa.val += Number(row[CPA]);
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

    recent.ctr.val = recent.ctr.val / dateRangeDays;
    historical.ctr /= dateRangeDays;

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
