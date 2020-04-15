import { useState, useEffect } from 'react';
import { State, Dispatch } from '../context/types';
import { makeDevicePerformance, makeReduxData } from '../transforms';
import { fetchReport } from '../services/api';

async function setDailyMetrics(qid, dailyMetrics, dispatch) {
  if (dailyMetrics.length === 0) {
    const data = await fetchReport(qid);
    dispatch({
      type: 'SET_DAILY_METRICS_DATA',
      value: makeReduxData(data),
    });
  }
}

function setSelectedCampaignId(campaigns, selectedCampaignId, dispatch) {
  if (!selectedCampaignId) {
    dispatch({
      type: 'SET_SELECTED_CAMPAIGN_ID',
      value: campaigns[0].id,
    });
  }
}

export default function useInitOverview(state: State, dispatch: Dispatch) {
  const [isLoading, setIsLoading] = useState(true);
  /** @description get device performance in this function to
   * check if there are any conversions data */
  const [devicePerformanceData, setDevicePerformanceData] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    (async function initOverview() {
      await setDailyMetrics(
        state.queryIds.dailyMetrics,
        state.data.dailyMetrics,
        dispatch,
      );
      setSelectedCampaignId(
        state.data.campaigns,
        state.selectedCampaignId,
        dispatch,
      );
      const devicePerformanceReportData = await fetchReport(state.queryIds['30daysDevice']);
      setDevicePerformanceData(
        makeDevicePerformance(devicePerformanceReportData, state.selectedCampaignId || state.data.campaigns[0].id),
      );
      setIsLoading(false);
    }());
  }, []);
  return { isLoading, devicePerformanceData };
}
