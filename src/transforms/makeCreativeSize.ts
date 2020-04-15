import { CAMPAIGN_ID, TOTAL_CONVERSIONS, CREATIVE_SIZE } from './constants';

const allBackgroundColors = ['#2dce89', '#f5365c', '#5e72e4', '#fb6340', '#172b4d', '#11cdef', '#f4f5f7'];

export default function makeCreativeSize(creativeSizes, campaignId) {
  const countsPerDevice = {};
  creativeSizes.forEach((row) => {
    if (row[CAMPAIGN_ID] !== campaignId) {
      return;
    }
    const creativeSize = row[CREATIVE_SIZE];
    countsPerDevice[creativeSize] = Number(row[TOTAL_CONVERSIONS]);
  });

  const data = Object.values(countsPerDevice);
  const backgroundColorList = allBackgroundColors.slice(0, data.length);

  return {
    datasets: [{
      data, backgroundColor: backgroundColorList, hoverBackgroundColor: backgroundColorList,
    }],
    labels: Object.keys(countsPerDevice),
  };
}
