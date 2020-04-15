import * as React from 'react';

interface QueryIds {
  alltimeMetrics: string | null;
  dailyMetrics: string | null;
  '30daysRegion': string | null;
  '30daysDevice': string | null;
  '30daysTimeofday': string | null;
  '30daysCreative': string | null;
}

interface Data {
  alltimeMetrics: object[] | null;
  dailyMetrics: object[] | null;
  '30daysRegion': object[] | null;
  '30daysDevice': object[] | null;
  '30daysTimeofday': object[] | null;
  '30daysCreative': object[] | null;
  campaigns: object[] | null;
}

export interface Action {
  type: string;
  value?: any;
}

export interface State {
  headlineDateRange: number;
  isLoading: boolean;
  email: string;
  name: string;
  selectedCampaignId: string;
  campaigns: object[];
  queryIds: QueryIds;
  data: Data;
  alltimeMetrics: object | null;
}

export type Dispatch = React.Dispatch<Action>
