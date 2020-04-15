import { SetStateAction, useEffect } from 'react';
import { State, Dispatch } from '../context/types';

export default (
  state: State,
  dispatch: Dispatch,
  setIsLoading: React.Dispatch<SetStateAction<boolean>>,
): void => useEffect(() => {
  if (state.selectedCampaignId) return;
  setIsLoading(true);
  dispatch({
    type: 'SET_SELECTED_CAMPAIGN_ID',
    value: state.data.campaigns[0].id,
  });
  setIsLoading(false);
}, []);
