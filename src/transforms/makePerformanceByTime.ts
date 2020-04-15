import {
  CAMPAIGN_ID, TOTAL_CONVERSIONS, TIME_OF_DAY, DAY_OF_WEEK,
} from './constants';

export default (responseData, campaignId) => {
  const mapDayToIndex = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const formatted = [];
  let rangeCap = 0;
  for (let i = 0; i < 24; i++) {
    const innerArr = [];
    for (let j = 0; j < 7; j++) {
      innerArr.push(j);
    }
    formatted.push(innerArr);
  }

  responseData
    .filter((row) => row[CAMPAIGN_ID] === campaignId)
    .forEach((row) => {
      const totalConversions = Number(row[TOTAL_CONVERSIONS]);
      formatted[Number(row[TIME_OF_DAY])][mapDayToIndex[row[DAY_OF_WEEK]]] = totalConversions;
      rangeCap = Math.max(rangeCap, totalConversions);
    });

  return { formatted, rangeCap };
};
