import { CAMPAIGN_ID, CAMPAIGN_NAME, SPEND } from './constants';

export default function makeCampaigns(campaigns, alltimeMetrics): object[] {
  const dict = {};
  alltimeMetrics.forEach((row) => {
    const key = row[CAMPAIGN_ID];
    if (!dict[key]) {
      dict[key] = {
        budget: 0,
        remSpend: 0,
        googleId: key,
        googleName: row[CAMPAIGN_NAME],
        displayName: row[CAMPAIGN_NAME],
        spend: Number(row[SPEND]),
        weeklyReport: false,
        view: '',
      };
    } else {
      dict[key].spend += Number(row[SPEND]);
    }
  });
  campaigns.forEach((campaign) => {
    const {
      id, name, budget, weeklyReport,
    } = campaign;
    const budgetNumber = Number(budget);
    if (!dict[id]) return;
    dict[id].displayName = name;
    dict[id].budget = budgetNumber || 0;
    dict[id].weeklyReport = weeklyReport;
    dict[id].remSpend = budgetNumber - dict[id].spend || 0;
  });
  return Object.values(dict);
}
