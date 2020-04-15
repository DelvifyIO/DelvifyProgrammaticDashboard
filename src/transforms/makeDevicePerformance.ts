import { CAMPAIGN_ID, TOTAL_CONVERSIONS, DEVICE_TYPE } from './constants';

const barColors = ['info', 'warning', 'success', 'danger', 'default'];

export default function makeDevicePerformance(responseData, campaignId) {
  const data = responseData.filter((row) => row[CAMPAIGN_ID] === campaignId);
  const totalConversions = data.reduce((acc, row) => acc + Number(row[TOTAL_CONVERSIONS]), 0);
  return data.map((row, index) => ({
    deviceType: row[DEVICE_TYPE],
    conversionPercentage: (Number(row[TOTAL_CONVERSIONS]) / totalConversions) * 100,
    barColor: barColors[index],
  }));
}
