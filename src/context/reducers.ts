import { State, Action } from './types';

export const initialState = {
  isLoading: true,
  user: null,
  tempUser: null,
  selectedCampaignId: '',
  headlineDateRange: 30,
  queryIds: {
    alltimeMetrics: null,
    dailyMetrics: null,
    '30daysRegion': null,
    '30daysDevice': null,
    '30daysTimeofday': null,
    '30daysCreative': null,
  },
  data: {
    alltimeMetrics: [],
    dailyMetrics: [],
    '30daysRegion': [],
    '30daysDevice': [],
    '30daysTimeofday': [],
    '30daysCreative': [],
    campaigns: [],
  },
};

export default function reducers(state: State, action: Action): State {
  const merge = (obj: object) => ({ ...state, ...obj });
  switch (action.type) {
    case 'SET_IS_LOADING': {
      return merge({ isLoading: action.value });
    }

    case 'SET_TEMP_USER': {
      const user = action.value;
      return merge({ tempUser: user });
    }

    case 'SET_USER': {
      const user = action.value;
      return merge({ user });
    }

    case 'SET_USER_INFO': {
      const { queryIds, email, name } = action.value;
      return merge({ queryIds, email, name, tempUser: null });
    }

    case 'REMOVE_USER_INFO': {
      const { email, name } = initialState;
      return merge({ email, name });
    }

    case 'SET_CAMPAIGNS': {
      return merge({
        data: {
          ...state.data,
          campaigns: action.value,
        },
      });
    }

    case 'SET_SELECTED_CAMPAIGN_ID': {
      return merge({ selectedCampaignId: action.value });
    }

    case 'SET_ALLTIME_METRICS_DATA': {
      return merge({
        data: {
          ...state.data,
          alltimeMetrics: action.value,
        },
      });
    }

    case 'SET_DAILY_METRICS_DATA': {
      return merge({
        data: {
          ...state.data,
          dailyMetrics: action.value,
        },
      });
    }

    case 'SET_HEADLINE_DATE_RANGE': {
      return merge({ headlineDateRange: action.value });
    }

    case 'LOGOUT': {
      return initialState;
    }

    default:
      throw new Error('Bad Action Type');
  }
}
